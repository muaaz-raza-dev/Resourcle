declare namespace NodeJS {
    interface ProcessEnv {
      DB: string;
      JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      SESSION_COOKIE_KEY: string;
    }
  }