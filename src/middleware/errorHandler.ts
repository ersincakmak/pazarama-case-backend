import { NextFunction, Request, Response } from 'express'

import { MessageResponse } from '../model/Response'
import { IApiError } from '../types/Error'

export default (
  error: IApiError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    res
      .status(error.status || 500)
      .json(new MessageResponse(error.message || 'Internal Server Error'))
  }

  next()
}
