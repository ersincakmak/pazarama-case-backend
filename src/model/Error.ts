class ApiError {
  status: number

  message: string

  constructor(message: string, status: number = 500) {
    this.status = status
    this.message = message
  }
}

export default ApiError
