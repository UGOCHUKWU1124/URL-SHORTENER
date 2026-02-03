import Joi from 'joi';

export const createShortUrlSchema = Joi.object({
    body: Joi.object({
        originalUrl: Joi.string().uri().required()
    }).required()
});

export const updateShortUrlSchema = Joi.object({
    params: Joi.object({
        shortCode: Joi.string().required()
    }).required(),
    body: Joi.object({
        originalUrl: Joi.string().uri().required()
    }).required()
});

export const shortCodeParamSchema = Joi.object({
    params: Joi.object({
        shortCode: Joi.string().required()
    }).required()
});
