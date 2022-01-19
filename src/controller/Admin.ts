/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import { DataResponse, MessageResponse } from '../model/Response'
import FormService from '../service/FormService'
import UserService from '../service/UserService'
import { generateAccessToken, passwordToHash } from '../utils/helper'

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

  public async login(req: Request, res: Response) {
    const payload = {
      username: req.body.username,
      password: passwordToHash(req.body.password),
    }

    try {
      const data = await UserService.findOne(payload)
      if (!data)
        return res.status(404).json(new MessageResponse('Wrong credentials.'))

      const response = {
        ...data.toObject(),
        accessToken: generateAccessToken({ ...data.toObject() }),
      }

      return res.status(200).json(new DataResponse(response))
    } catch (error) {
      return res
        .status(500)
        .json(new MessageResponse('There is an error with login process.'))
    }
  }

  public async getApplications(_req: Request, res: Response) {
    try {
      const data = await FormService.list()

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return res
        .status(500)
        .json(
          new MessageResponse('There is an error with getting applications.')
        )
    }
  }

  public async createAnswer(req: Request, res: Response) {
    const { id } = req.params
    const { message } = req.body

    const payload = {
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      author: req.user._id,
      message,
    }

    try {
      const data = await FormService.modify(id as any, {
        $push: { answers: payload },
      })

      if (!data)
        return res
          .status(404)
          .json(new MessageResponse('There is no application with this id.'))

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return res
        .status(500)
        .json(
          new MessageResponse('There is an error with getting applications.')
        )
    }
  }

  public async updateStatus(req: Request, res: Response) {
    const { id } = req.params
    const { status } = req.body

    try {
      const data = await FormService.modify(id as any, { status })

      if (!data)
        return res
          .status(404)
          .json(new MessageResponse('There is no application with this id.'))

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return res
        .status(500)
        .json(
          new MessageResponse('There is an error with getting applications.')
        )
    }
  }
}

export default new AdminController()
