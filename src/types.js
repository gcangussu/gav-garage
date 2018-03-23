// @flow
export type ActionPayload = { [key: string]: any };
export interface Action<P = ActionPayload> {
  type: string;
  payload: P;
  toString(): string;
}

export type ReducerHandler<S> = (state: S, payload: ActionPayload) => S;
export type HandlesMap<S> = { [type: string]: ReducerHandler<S> };
