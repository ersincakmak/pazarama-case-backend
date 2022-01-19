/* eslint-disable max-classes-per-file */
export class DataResponse {
  data: any

  message = 'Data fetched successfully'

  constructor(data: any) {
    this.data = data
  }
}

export class MessageResponse {
  message: string

  constructor(message: string) {
    this.message = message
  }
}
