import { ErrorBuilder } from "./types";

export type NetworkError = ErrorBuilder<{
  type: "NetworkError";
  data: { error: unknown; input: RequestInfo | URL };
}>;
