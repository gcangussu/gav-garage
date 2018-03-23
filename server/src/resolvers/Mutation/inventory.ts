import { Context, authenticate } from '../../utils';
import { Product } from '../../generated/prisma';

export default {
  async receive(parent, args, ctx: Context, info) {
    const { id: userId, role } = authenticate(ctx);
    if (role !== 'INVENTORY_MANAGER') {
      throw new Error(`Forbidden access for users with role '${role}'.`);
    }

    const { product, quantity, unitCost } = args;
    const receiptToBeCreated = {
      receivedBy: { connect: { id: userId } },
      quantity,
      unitCost,
    };
    const lastReceiptIdQuery = '{ receipts(last: 1) { id } }';
    let productWithReceipt: Product;

    if (product.id) {
      const oldProduct = await ctx.db.query.product(
        {
          where: { id: product.id },
        },
        '{ quantity }',
      );
      if (!oldProduct) {
        throw new Error('Provided product is invalid.');
      }

      const updatedProduct = await ctx.db.mutation.updateProduct(
        {
          where: { id: product.id },
          data: {
            quantity: oldProduct.quantity + quantity,
            receipts: { create: receiptToBeCreated },
          },
        },
        lastReceiptIdQuery,
      );
      if (!updatedProduct) {
        throw new Error('Unexpected `null` from Prisma.');
      }
      productWithReceipt = updatedProduct;
    } else {
      const { create: { description, picture, unitPrice } } = product;
      productWithReceipt = await ctx.db.mutation.createProduct(
        {
          data: {
            description,
            picture,
            unitPrice,
            quantity,
            createdBy: { connect: { id: userId } },
            receipts: { create: receiptToBeCreated },
          },
        },
        lastReceiptIdQuery,
      );
    }

    if (
      productWithReceipt.receipts == null ||
      productWithReceipt.receipts.length === 0
    ) {
      throw new Error('Unexpected product.receipts received from Prisma.');
    }

    return { receipt: productWithReceipt.receipts[0] };
  },

  async sell(parent, args, ctx: Context, info) {
    const { id: userId, role } = authenticate(ctx);
    if (role !== 'SELLER') {
      throw new Error(`Forbidden access for users with role '${role}'.`);
    }

    const { order } = args as {
      order: {
        productId: string;
        unitPrice: number;
        quantity: number;
      }[];
    };
    if (order.length === 0) {
      throw new Error('You must sell at least one product.');
    }

    const saleMap = order.reduce(
      (map, sale) => {
        map[sale.productId] = sale;
        return map;
      },
      {} as { [id: string]: typeof order[0] },
    );

    const productsQuery = order.map(sale => ({
      id: sale.productId,
      quantity_gte: sale.quantity,
    }));
    const products = await ctx.db.query.products({
      where: { OR: productsQuery },
    });

    if (products.length !== productsQuery.length) {
      const outOfStock = products.filter(p => saleMap[p.id]);
      throw new Error(
        `OutOfStock: ${JSON.stringify(outOfStock.map(p => p.id))}`,
      );
    }

    const updatedProducts = await Promise.all(
      products.map(product => {
        const { id, quantity } = product;
        return ctx.db.mutation.updateProduct({
          where: { id },
          data: {
            quantity: quantity - saleMap[id].quantity,
          },
        });
      }),
    );

    const salesToCreate = updatedProducts.map(product => {
      if (!product) {
        throw new Error('Fatal: product not found while updating products.');
      }
      const { id } = product;
      const { quantity, unitPrice } = saleMap[id];
      return {
        product: { connect: { id } },
        quantity,
        unitPrice,
      };
    });

    return {
      order: await ctx.db.mutation.createOrder({
        data: {
          sales: { create: salesToCreate },
          seller: { connect: { id: userId } },
        },
      }),
    };
  },
};
