import { clsx, type ClassValue } from "clsx";
import { err, ok } from "neverthrow";
import { twMerge } from "tailwind-merge";
import { ZodObject } from "zod";
import { ParsingError } from "./utils/error/parsing-errors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasMessage(data: unknown): data is { message: string } {
  return (
    !!data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  );
}

export function parser(schema: ZodObject, object: unknown) {
  const { success, data, error } = schema.safeParse(object);
  if (success) return ok(data);
  return err({
    type: "ZodParsingError",
    message: hasMessage(error)
      ? error.message
      : "Couldn't parse object to zod schema",
    data: { error },
  } satisfies ParsingError);
}
