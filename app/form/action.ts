"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { redirect } from "next/navigation";
import { serverSchema } from "./shared-code";

const serverValidate = createServerValidate({
  validatorAdapter: zodValidator(),
  // https://github.com/TanStack/form/blob/v0.25.1/packages/react-form/src/nextjs/createServerValidate.ts#L34-L36
  onServerValidate: serverSchema as any,
});

export default async function someAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!
  console.log(formData.get("firstName"));

  redirect("/");
}
