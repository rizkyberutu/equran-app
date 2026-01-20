// app/api/auth/callback/route.ts
import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  console.log("Auth callback received, code:", code ? "present" : "missing");

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code:", error);
        return NextResponse.redirect(`${origin}/id?error=auth_error`);
      }

      console.log("Auth successful, redirecting to home");
      return NextResponse.redirect(`${origin}/id`);
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(`${origin}/id?error=server_error`);
    }
  }

  // No code present, redirect to home
  console.log("No code in callback, redirecting to home");
  return NextResponse.redirect(`${origin}/id`);
}
