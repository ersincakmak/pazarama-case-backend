import { NextFunction, Request, Response } from 'express'
import { AnyObjectSchema } from 'yup'
import { MessageResponse } from '../model/Response'

const validate =
  (schema: AnyObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req.body)
      .then(() => next())
      .catch((err) => {
        res.status(400).json(new MessageResponse(err.message))
      })
  }

export default validate
