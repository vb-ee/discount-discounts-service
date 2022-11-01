import { IJwtPayload } from '../middlewares';

declare global {
  namespace Express {
    interface Request {
      payload: IJwtPayload;
    }
  }
}
