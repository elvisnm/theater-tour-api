import Joi from 'joi';

export default {
    id: Joi.string(),
    slug: Joi.string(),
    name: Joi.string().required(),
    url: Joi.string(),
    category: Joi.string().required(),
    description: Joi.string(),
    cast_actors: Joi.string(),
    duration: Joi.string(),
    photo: Joi.string(),
    website: Joi.string(),
    age_group: Joi.string(),
    theaters: Joi.array().items(),
    published: Joi.boolean(),
    lastPublished: Joi.alternatives().try(
        Joi.date(),
        Joi.any().empty()
    ),
    lastModified: Joi.date(),
    updatedAt: Joi.date(),
    createdAt: Joi.date(),
    publishedAt: Joi.alternatives().try(
        Joi.date(),
        Joi.any().empty()
    )
};
