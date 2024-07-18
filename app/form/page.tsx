"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import someAction from "./action";
import { schema } from "./shared-code";

export default function Form() {
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);

  const [state, action] = useActionState(someAction, initialFormState);

  const form = useForm({
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    defaultValues: {
      hidden: uuid,
    },
  });

  const formErrors = form.useStore((formState) => formState.errors);

  return (
    <div className="w-full flex items-center justify-center px-4 theme-zinc pt-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form action={action as never} onSubmit={() => form.handleSubmit()}>
          <CardContent className="grid gap-4">
            {/* Text */}
            <form.Field
              name="username"
              validatorAdapter={zodValidator()}
              validators={{
                onChangeAsync: schema.shape.username,
              }}
              asyncDebounceMs={500}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
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

            {/* Number */}
            <form.Field
              name="age"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.age,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
                      type="number"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* File */}
            <form.Field
              name="picture"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.picture,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
                      type="file"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Checkbox */}
            <form.Field
              name="mobile"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.mobile,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        name={field.name}
                        checked={field.state.value ?? ""}
                        onCheckedChange={(value) => field.handleChange(value)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Use different settings for my mobile devices
                      </FormLabel>
                      <FormDescription>
                        You can manage your mobile notifications in the mobile
                        settings page.
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Date */}
            <form.Field
              name="dob"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.dob,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.state.value && "text-muted-foreground",
                          )}
                        >
                          {field.state.value ? (
                            format(field.state.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.state.value ?? ""}
                        onSelect={field.handleChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <input
                    type="hidden"
                    name={field.name}
                    value={field.state.value ?? ""}
                  ></input>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Radio */}
            <form.Field
              name="type"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.type,
              }}
            >
              {(field) => (
                <FormItem error={field.state.meta.errors} className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value ?? ""}
                      onValueChange={(value) => field.handleChange(value)}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem
                        error={field.state.meta.errors}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          All new messages
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        error={field.state.meta.errors}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Direct messages and mentions
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        error={field.state.meta.errors}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">Nothing</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Select */}
            <form.Field
              name="email"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.email,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Email</FormLabel>
                  <Select
                    name={field.name}
                    value={field.state.value ?? ""}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Textarea */}
            <form.Field
              name="bio"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.bio,
              }}
            >
              {(field) => (
                <FormItem
                  error={field.state.meta.errors}
                  className="grid gap-2"
                >
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            {/* Hidden */}
            <form.Field
              name="hidden"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: schema.shape.hidden,
              }}
            >
              {(field) => (
                <input
                  type="hidden"
                  name={field.name}
                  value={field.state.value ?? ""}
                />
              )}
            </form.Field>

            <pre className="overflow-scroll">
              <form.Subscribe>
                {(formState) => JSON.stringify(formState.values, null, 2)}
              </form.Subscribe>
            </pre>

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
