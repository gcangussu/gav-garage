import { Context } from '../utils';

export default {
  AuthPayload: {
    async user({ user: { id } }, args, ctx: Context, info) {
      return ctx.db.query.user({ where: { id } }, info);
    },
  },

  ReceiveResponse: {
    async receipt({ receipt: { id } }, args, ctx: Context, info) {
      return ctx.db.query.receipt({ where: { id } }, info);
    },
  },

  SellResponse: {
    async order({ order: { id } }, args, ctx: Context, info) {
      return ctx.db.query.order({ where: { id } }, info);
    },
  },
};
