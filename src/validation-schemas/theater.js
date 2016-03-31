import Joi from 'joi';

export default {
    id: Joi.string(),
    slug: Joi.string(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    website: Joi.string(),
    updatedAt: Joi.date(),
    createdAt: Joi.date()
};
