import { User } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      userid?: string;
      details?: User;
    }
  }
}