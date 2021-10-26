import { ValidationError } from 'express-validator';

export const serializeError = (errors: ValidationError[]) => {
  return errors.map((err) => {
    return { message: err.msg, field: err.param };
  });
};
