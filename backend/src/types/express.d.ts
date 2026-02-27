import { IJwtUserPayload } from "./index.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtUserPayload;
    }
  }
}

export {};
