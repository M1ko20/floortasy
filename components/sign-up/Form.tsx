"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "./Schema";
import Link from "next/link";
import { signUp } from "@/actions/user";
import { useState } from "react";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();
  const [submiting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setSubmitting(true);

    const result = await signUp({ values });
    if (result.error) toast.error(result.message);
    else {
      toast.success(result.message);
      router.push(`/my-team`);
    }

    setSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Join Floortasy</h1>
          <p className="text-balanced text-sm text-muted-foreground">
            Build a best team to dominate your rivals
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={submiting} />
                    </FormControl>
                    <FormMessage className="pt-2 text-[10px] px-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={submiting} />
                    </FormControl>
                    <FormMessage className="pt-2 text-[10px] px-2" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={submiting} type="email" />
                  </FormControl>
                  <FormMessage className="pt-2 text-[10px] px-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={submiting} />
                  </FormControl>
                  <FormMessage className="pt-2 text-[10px] px-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={submiting} type="password" />
                  </FormControl>
                  <FormMessage className="pt-2 text-[10px] px-2" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" disabled={submiting}>
              {submiting ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
