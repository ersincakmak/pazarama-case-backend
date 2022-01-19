/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 } from 'uuid'
import { DataResponse, MessageResponse } from '../model/Response'
import FormService from '../service/FormService'

class FormController {
  public async create(req: Request, res: Response) {
    const { answers, ...payload } = req.body

    const promises: Promise<void>[] = []
    const fileNames: String[] = []

    if (req.files && req.files.files) {
      const files = req.files.files as UploadedFile[]
      if (files.length > 1) {
        files.forEach((item) => {
          const fileName = `${v4()}_${item.name}`
          const filePath = path.join(
            __dirname,
            '../',
            'uploads',
            'users',
            fileName
          )
          promises.push(item.mv(filePath))
          fileNames.push(fileName)
        })
      } else {
        const file = req.files.files as UploadedFile
        const fileName = `${v4()}_${file.name}`
        const filePath = path.join(
          __dirname,
          '../',
          'uploads',
          'users',
          fileName
        )
        promises.push(file.mv(filePath))
        fileNames.push(fileName)
      }
    }

    try {
      await Promise.all(promises)
      const data = await FormService.create({
        ...payload,
        files: fileNames,
      })
      res.status(200).json(new DataResponse(data))
    } catch (error) {
      res
        .status(500)
        .json(
          new MessageResponse('There is an error with creatign application.')
        )
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await FormService.findOne({ _id: id })

      if (!data)
        return res
          .status(404)
          .json(new MessageResponse('There is no application with this id.'))

      return res.status(200).json(new DataResponse(data))
    } catch (error) {
      return res
        .status(500)
        .json(
          new MessageResponse('There is an error with finding application.')
        )
    }
  }
}

export default new FormController()
