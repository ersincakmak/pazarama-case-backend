/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express'
import ApiError from '../model/Error'
import { DataResponse } from '../model/Response'
import FormService from '../service/FormService'
import UserService from '../service/UserService'
import { generateAccessToken, passwordToHash } from '../utils/helper'

class AdminController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const payload = {
      ...req.body,
      password: passwordToHash(req.body.password),
    }

    try {
      const userExist = await UserService.findOne({
        username: payload.username,
      })

      if (userExist)
        return next(new ApiError('An user exist with this username', 403))

      await UserService.create(payload)
      const data = await UserService.findOne(payload)
      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return next(new ApiError('There is an error with registiration.'))
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const payload = {
      username: req.body.username,
      password: passwordToHash(req.body.password),
    }

    try {
      const data = await UserService.findOne(payload)
      if (!data) return next(new ApiError('Wrong credentials.', 404))

      const response = {
        ...data.toObject(),
        accessToken: generateAccessToken({ ...data.toObject() }),
      }

      return res.status(200).json(new DataResponse(response))
    } catch (error) {
      return next('There is an error with login process.')
    }
  }

  public async getApplications(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await FormService.list()

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return next(new ApiError('There is an error with getting applications.'))
    }
  }

  public async createAnswer(req: Request, res: Response, next: NextFunction) {
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
        return next(new ApiError('There is no application with this id.', 404))

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return next(new ApiError('There is an error with creating answer.'))
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { status } = req.body

    try {
      const data = await FormService.modify(id as any, { status })

      if (!data)
        return next(new ApiError('There is no application with this id.', 404))

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return next(new ApiError('There is an error with updating status'))
    }
  }

  public async getMe(req: Request, res: Response) {
    console.log('get me')
    res.status(200).json(new DataResponse(req.user))
  }
}

export default new AdminController()
