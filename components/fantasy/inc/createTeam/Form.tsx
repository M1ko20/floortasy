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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { createFantasyTeam } from "@/actions/fantasy";
import { createFantasyTeamSchema } from "./Schema";

interface CreateFantasyTeamFormProps {
  league: string;
}

export function CreateFantasyTeamForm({ league }: CreateFantasyTeamFormProps) {
  const router = useRouter();
  const [submiting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createFantasyTeamSchema>>({
    resolver: zodResolver(createFantasyTeamSchema),
    defaultValues: {
      name: "",
      league: league,
      season: "2024/2025",
    },
  });

  async function onSubmit(values: z.infer<typeof createFantasyTeamSchema>) {
    setSubmitting(true);

    const result = await createFantasyTeam({ values });
    if (result.error) toast.error(result.message);
    else {
      toast.success(result.message);
      router.push(`/fantasy/${league}/overview`);
    }

    setSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center pb-2 pt-4">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Create fantasy team</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Fantasy team name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={submiting} />
                  </FormControl>
                  <FormMessage className="px-2 pt-2 text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="league"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="czo">CZECH OPEN 2024</SelectItem>
                      {/*  <SelectItem value="lsl">
                        Livesport Superliga 24/25
                      </SelectItem>
                      <SelectItem value="ssl">
                        Svenska Superligan 24/25
                      </SelectItem>
                      <SelectItem value="lupl">
                        Lidl Unihockey Prime League 24/25
                      </SelectItem>
                      */}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" disabled={submiting}>
              {submiting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
