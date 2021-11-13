import joi from "joi";

export const userRegisterSchema = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).required(),
  }),
};

export const userLoginSchema = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
};

export const emailVerificationSchema = {
  querystring: joi.object().keys({ token: joi.string().required() }),
};

export const emailVerificationRequestSchema = {
  querystring: joi.object().keys({ email: joi.string().email().required() }),
};

export const changepasswordRequestSchema = {
  querystring: joi.object().keys({ email: joi.string().email().required() }),
};

export const changepasswordSchema = {
  body: joi.object().keys({
    token: joi.string().required(),
    password: joi.string().min(6).required(),
  }),
};
