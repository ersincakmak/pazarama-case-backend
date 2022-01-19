import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'
import { IUser } from '../types/User'

export const passwordToHash = (password: string) =>
  crypto.HmacSHA256(password, process.env.PASSWORD_HASH as string).toString()

export const generateAccessToken = (user: IUser) =>
  jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '1w',
  })
