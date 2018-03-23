import { authenticate, Context } from '../utils';

export default {
  viewer(parent, args, ctx: Context, info) {
    const { id } = authenticate(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  products(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.products({}, info);
  },

  orders(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.orders({}, info);
  },

  receipts(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.receipts({}, info);
  },
};
