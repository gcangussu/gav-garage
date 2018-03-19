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
      const oldProduct: Pick<
        Product,
        'quantity'
      > | null = await ctx.db.query.product(
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
};
