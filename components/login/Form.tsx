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
import { signInSchema } from "./Schema";
import Link from "next/link";
import { signIn, signUp } from "@/actions/user";
import { useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/supabase/client";

interface SignInData {
  name: string;
  password: string;
}

export function SignInForm() {
  const router = useRouter();
  const [submiting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setSubmitting(true);

    async function signIn({ values }: { values: SignInData }) {
      const { data: userExist } = await supabase
        .from("users")
        .select()
        .or(`username.eq.${values.name},email.eq.${values.name}`)
        .single();

      if (userExist) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userExist.email,
          password: values.password,
        });

        if (error) {
          if (error?.message == "Email not confirmed") {
            return {
              error: true,
              message: "Login failed. Email not confirmed.",
            };
          }

          if (error?.message == "Invalid login credentials") {
            return {
              error: true,
              message: "Login failed. Invalid login credentials.",
            };
          }

          return {
            error: true,
            message: "Login failed. Please try again.",
          };
        }

        return {
          error: false,
          message: "Login successful!",
        };
      }

      return {
        error: true,
        message: "Login failed. User not found.",
      };
    }

    const result = await signIn({ values });

    if (result.error) toast.error(result.message);
    else {
      toast.success(result.message);
      router.push(`/fantasy`);
    }

    setSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login to Floortasy</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email or username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={submiting} />
                  </FormControl>
                  <FormMessage className="px-2 pt-2 text-[10px]" />
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
                  <FormMessage className="px-2 pt-2 text-[10px]" />
                </FormItem>
              )}
            />

            <div className="flex items-center">
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="submit" className="mt-4" disabled={submiting}>
              {submiting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
