import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
// import fs from "fs";
// import path from "path";

// Create a debug log function
// const debugLog = (message: string) => {
//   const timestamp = new Date().toISOString();
//   const logMessage = `${timestamp}: ${message}\n`;

//   // Log to console
//   console.log(logMessage);

//   // Log to file
//   const logPath = path.join(process.cwd(), "auth-debug.log");
//   fs.appendFileSync(logPath, logMessage);
// };

export async function GET(request: Request) {
  // debugLog("GET /auth/callback");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";
  console.log("code...", code);
  console.log("next...", next);
  console.log("origin...", origin);
  // debugLog(`code: ${code}`);
  // debugLog(`next: ${next}`);
  // debugLog(`origin: ${origin}`);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        // debugLog(`Local Env: Redirecting to ${origin}${next}`);
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // debugLog(`Forwarded Host: Redirecting to https://${forwardedHost}${next}`);
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
