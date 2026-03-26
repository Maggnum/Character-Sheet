import { err, ok, Result, ResultAsync } from "neverthrow";
import { HttpStatusCode } from "axios";
import { ErrorBuilder, GenericError, SpecificError } from "../error/types";
import { NetworkError } from "../error/network-errors";
import { hasMessage } from "@/lib/utils";

type HttpsStatusNames = keyof typeof HttpStatusCode;
type ErrorMap<E extends ErrorBuilder<GenericError>> = { default: E } & Partial<
  Record<HttpsStatusNames, E>
>;

export async function fetcher<E extends ErrorBuilder<GenericError>>(
  input: RequestInfo | URL,
  init: RequestInit = {},
  successStatuses: Array<HttpStatusCode> = [HttpStatusCode.Ok],
  errorMap: ErrorMap<E>,
): Promise<Result<Response, E | SpecificError<NetworkError, "NetworkError">>> {
  const result = await ResultAsync.fromPromise(
    fetch(input, init),
    (error) =>
      ({
        type: "NetworkError",
        message: hasMessage(error)
          ? error.message
          : "A network error has occurred",
        data: { error, input },
      }) satisfies NetworkError,
  );
  if (result.isErr()) return err(result.error);
  const response = result.value;

  const status: HttpStatusCode = response.status;
  if (successStatuses.includes(status)) return ok(response);

  const statusName = HttpStatusCode[status] as HttpsStatusNames;
  return err(errorMap[statusName] ?? errorMap["default"]);
}
