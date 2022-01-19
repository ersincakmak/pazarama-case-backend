/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import { DataResponse, MessageResponse } from '../model/Response'
import UserService from '../service/UserService'
import passwordToHash from '../utils/helper'

class AdminController {
  public async register(req: Request, res: Response) {
    const payload = {
      ...req.body,
      password: passwordToHash(req.body.password),
    }

    try {
      const userExist = await UserService.findOne({
        username: payload.username,
      })

      if (userExist)
        return res
          .status(403)
          .json(new MessageResponse('An user exist with this username'))

      await UserService.create(payload)
      const data = await UserService.findOne(payload)
      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return res
        .status(500)
        .json(new MessageResponse('There is an error with register process.'))
    }
  }
}

export default new AdminController()
