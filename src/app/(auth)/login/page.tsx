"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, startTransition } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { LoginFormSchema } from "@/lib/rules";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      id_number: "",
      password: "",
      remember_me: true,
    },
  });

  const [state, formAction, isPending] = useActionState(login, null);

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    const formData = new FormData();
    formData.append("id_number", values.id_number);
    formData.append("password", values.password);

    startTransition(() => {
      formAction(formData);
    });
  };
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
      toast.success(state.success);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 p-3"
      >
        <FormField
          control={form.control}
          name="id_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Number ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember_me"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked
                />
              </FormControl>
              <FormLabel>Remember Me</FormLabel>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold hover:bg-primary hover:opacity-50"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
