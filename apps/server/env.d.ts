// env.d.ts

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      db: string;
      JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      SESSION_COOKIE_KEY: string;
      REQUESTED_OTP_COOKIE_KEY: string;
      NEXT_PUBLIC_RESOURCE_LIMIT: string;
      APP_NAME: string;
      APP_URL: string;
      NodeMailer_ID: string;
      NodeMailer_pass: string;
      Collection_links_limit: string;
      Collection_limit: string;
    }
  }
}

// Ensure the file is treated as a module
export {};
