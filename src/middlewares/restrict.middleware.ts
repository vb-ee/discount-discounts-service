import { Request, Response, NextFunction } from 'express';

export function restrictToAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { isAdmin } = req.payload;

  if (!isAdmin)
    return res
      .status(403)
      .send({ errors: 'You have no permission to this route' });
  next();
}