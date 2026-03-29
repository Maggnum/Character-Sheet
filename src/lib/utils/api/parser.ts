import { err, ResultAsync } from "neverthrow";
import { ZodObject } from "zod";
import { ParsingError } from "../error/parsing-errors";
import { hasMessage, parser } from "@/lib/utils";

export async function jsonParser(schema: ZodObject, data: Request | Response) {
  const result = await ResultAsync.fromPromise(
    data.json(),
    (error) =>
      ({
        type: "JsonParsingError",
        message: hasMessage(error)
          ? error.message
          : "Couldn't parse object to JSON",
        data: { error },
      }) satisfies ParsingError,
  );
  if (result.isErr()) return err(result.error);
  return parser(schema, result.value);
}
