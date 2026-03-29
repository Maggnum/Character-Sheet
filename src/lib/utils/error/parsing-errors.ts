import { ErrorBuilder } from "./types";

export type ParsingError = ErrorBuilder<{
  type: "ZodParsingError" | "JsonParsingError";
  data: {
    error: unknown;
  };
}>;
