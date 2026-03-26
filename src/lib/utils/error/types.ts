export type GenericError = {
  readonly type: string;
  message?: string;
  data?: Record<string, unknown>;
};

export type ErrorBuilder<E extends GenericError> = {
  type: E["type"];
  message: string;
  data: E["data"];
};

export type SpecificError<
  E extends ErrorBuilder<GenericError>,
  T extends E["type"],
> = Extract<
  E extends { type: infer U; data: infer D extends GenericError["data"] }
    ? U extends T
      ? ErrorBuilder<{ type: U; data: D }>
      : never
    : never,
  { type: T }
>;
