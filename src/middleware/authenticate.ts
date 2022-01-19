import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { MessageResponse } from '../model/Response'
import { IUser } from '../types/User'

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json(new MessageResponse('Please login first.'))
  }

  try {
    const response = await jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = response as IUser
    return next()
  } catch (error) {
    return res.status(403).json(new MessageResponse('Invalid token.'))
  }
}

export default authenticate
