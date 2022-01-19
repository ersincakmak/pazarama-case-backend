import crypto from 'crypto-js'

const passwordToHash = (password: string) =>
  crypto.HmacSHA256(password, process.env.PASSWORD_HASH as string).toString()

export default passwordToHash
