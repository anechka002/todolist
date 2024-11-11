export type FieldError = {
  error: string
  field: string
}

export type ResponseType<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsError: FieldError[]
}