"use server";

import supabase from "@/lib/supabase/server";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface SignInData {
  name: string;
  password: string;
}

export async function signUp({ values }: { values: SignUpData }) {
  const { data: duplicateData } = await supabase
    .from("users")
    .select()
    .eq("email", values.email)
    .or(`username.eq.${values.username}`);

  if (duplicateData && duplicateData?.length > 0) {
    return {
      error: true,
      message: "Sign up failed. Email or username is already in use.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.username,
      },
    },
  });

  if (data.user) {
    const { error: userInsertError } = await supabase.from("users").insert({
      UID: data.user.id,
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
      email: values.email,
    });

    if (userInsertError)
      return {
        error: true,
        message: "Sign up failed. Please try again later.",
      };
    else
      return {
        error: false,
        message: "Sign up successful!",
      };
  }

  return {
    error: true,
    message: "Sign up failed. Please try again later.",
  };
}

export async function signIn({ values }: { values: SignInData }) {
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
