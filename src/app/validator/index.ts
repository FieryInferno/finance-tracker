interface ValidatorInterface {
  rules: Array<(value: any) => string | null>
  object(param: Record<string, ValidatorInterface>): this
  string(): this
  email(param?: { message: string }): this
  safeParse(data: {}):
    | { success: true; error: {} }
    | { success: false; error: { fieldErrors: Record<string, string[]> } }
}
class Validator implements ValidatorInterface {
  rules: Array<(value: any) => string | null> = []
  private schemas: Record<string, ValidatorInterface> = {}

  object(param: Record<string, ValidatorInterface>) {
    this.schemas = { ...this.schemas, ...param }

    return this
  }
  string() {
    this.rules.push((value) =>
      typeof value !== 'string' ? 'Invalid string' : null
    )

    return this
  }
  email(param?: { message: string }) {
    this.rules.push((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(value)) return param?.message || 'Invalid email'

      return null
    })

    return this
  }
  safeParse(data: Record<string, any>) {
    const fieldErrors: Record<string, string[]> = {}

    for (const [key, value] of Object.entries(data)) {
      if (this.schemas[key]) {
        for (const rule of this.schemas[key].rules) {
          const error = rule(value)

          if (error) {
            if (fieldErrors[key]) fieldErrors[key].push(error)
            else fieldErrors[key] = [error]
          }
        }
      }
    }

    if (Object.keys(fieldErrors).length === 0)
      return { success: true as const, error: {} }

    return { success: false as const, error: { fieldErrors } }
  }
}

export default Validator
