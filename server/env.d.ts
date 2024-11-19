declare namespace NodeJS {
    interface ProcessEnv {
      DB: string;
      JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      SESSION_COOKIE_KEY: string;
      REQUESTED_OTP_COOKIE_KEY: string;
      NEXT_PUBLIC_RESOURCE_LIMIT: string;
      APP_NAME: string;
      APP_URL: string;
    }
  }