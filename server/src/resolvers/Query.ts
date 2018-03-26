import { authenticate, Context } from '../utils';

export default {
  viewer(parent, args, ctx: Context, info) {
    const { id } = authenticate(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  products(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.products({ orderBy: 'updatedAt_DESC' }, info);
  },

  orders(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.orders({ orderBy: 'updatedAt_DESC' }, info);
  },

  receipts(parent, args, ctx: Context, info) {
    authenticate(ctx);
    return ctx.db.query.receipts({ orderBy: 'updatedAt_DESC' }, info);
  },
};
