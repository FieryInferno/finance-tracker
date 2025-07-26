import { describe, expect, test } from '@jest/globals'
import Validator from '.';

describe('test new Validator()', () => {
  test('valid email passes validation', () => {
    const LoginFormSchema = new Validator().object({ email: new Validator().string().email() })
    const validatedFields = LoginFormSchema.safeParse({ email: 'test@example.com' })

    expect(validatedFields.success).toBe(true);
    expect(validatedFields.error).toEqual({});
  });

  test('invalid email returns error message', () => {
    const LoginFormSchema = new Validator().object({ email: new Validator().string().email({ message: 'Custom error' }) })
    const validatedFields = LoginFormSchema.safeParse({ email: 'invalid-email' })

    expect(validatedFields.success).toBe(false);
    expect(validatedFields.error.fieldErrors?.email).toContain('Custom error');
  });

  it('non-string email returns string error', () => {
    const LoginFormSchema = new Validator().object({ email: new Validator().string().email() })
    const validatedFields = LoginFormSchema.safeParse({ email: 123 })

    expect(validatedFields.success).toBe(false);
    expect(validatedFields.error.fieldErrors?.email).toContain('Invalid string');
  });

  test('multiple fields with errors', () => {
    const Schema = new Validator().object({
      email: new Validator().string().email(),
      name: new Validator().string()
    })
    const validatedFields = Schema.safeParse({ email: 'bad', name: 42 })

    expect(validatedFields.success).toBe(false);
    expect(validatedFields.error.fieldErrors?.email).toContain('Invalid email');
    expect(validatedFields.error.fieldErrors?.name).toContain('Invalid string');
  });

  test('valid multiple fields', () => {
    const Schema = new Validator().object({
      email: new Validator().string().email(),
      name: new Validator().string()
    })
    const validatedFields = Schema.safeParse({ email: 'good@email.com', name: 'Bagas' })

    expect(validatedFields.success).toBe(true);
    expect(validatedFields.error).toEqual({});
  });
});