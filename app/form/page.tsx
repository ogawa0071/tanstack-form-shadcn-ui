"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AlertCircle } from "lucide-react";
import { useActionState } from "react";
import someAction from "./action";
import { schema } from "./shared-code";

export default function Form() {
  const [state, action] = useActionState(someAction, initialFormState);

  const form = useForm({
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = form.useStore((formState) => formState.errors);

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 theme-zinc">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form action={action as never} onSubmit={() => form.handleSubmit()}>
          <CardContent className="grid gap-4">
            <form.Field
              name="firstName"
              validatorAdapter={zodValidator()}
              validators={{
                onChangeAsync: schema.shape.firstName,
              }}
              asyncDebounceMs={500}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      name="firstName"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="shadcn"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>
            {formErrors.length !== 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                {formErrors.map((error) => (
                  <AlertDescription key={error as string}>
                    {error}
                  </AlertDescription>
                ))}
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <form.Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} className="w-full">
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
