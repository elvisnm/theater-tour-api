import showSchema from '../validation-schemas/show';
import Joi from 'joi';

export default function getShowsRoutes(server) {
    const showsHandlers = server.app.handlers.shows;

    return [
        {
            method: 'GET',
            path: '/shows',
            config: {
                handler: showsHandlers.getAll,
                description: 'Retorna todas as peças de teatro',
                tags: ['api', 'shows']
            }
        },
        {
            method: 'GET',
            path: '/shows/{category}/{slug}',
            config: {
                handler: showsHandlers.getOne,
                description: 'Retorna uma peça de teatro específica',
                tags: ['api', 'shows'],
                validate: {
                    params: {
                        category: Joi.string()
                                .required()
                                .description('categoria da peça de teatro'),
                        slug: Joi.string()
                                .required()
                                .description('slug da peça de teatro')
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/shows',
            config: {
                handler: showsHandlers.createOrUpdate,
                description: 'Cria uma peça de teatro',
                tags: ['api', 'shows'],
                validate: {
                    payload: showSchema
                }
            }
        },
        {
            method: 'PUT',
            path: '/shows/{category}/{slug}',
            config: {
                handler: showsHandlers.createOrUpdate,
                description: 'Edita uma peça de teatro',
                tags: ['api', 'shows'],
                validate: {
                    payload: showSchema
                }
            }
        },
        {
            method: 'DELETE',
            path: '/shows/{category}/{slug}',
            config: {
                handler: showsHandlers.remove,
                description: 'Remove uma peça de teatro específica',
                tags: ['api', 'shows'],
                validate: {
                    params: {
                        category: Joi.string()
                                .required()
                                .description('categoria da peça de teatro'),
                        slug: Joi.string()
                                .required()
                                .description('slug da peça de teatro')
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/shows/{category}/{slug}/publish',
            config: {
                handler: showsHandlers.publish,
                description: 'Publica uma peça de teatro específica',
                tags: ['api', 'shows'],
                validate: {
                    params: {
                        category: Joi.string()
                                .required()
                                .description('categoria da peça de teatro'),
                        slug: Joi.string()
                                .required()
                                .description('slug da peça de teatro')
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/shows/{category}/{slug}/unpublish',
            config: {
                handler: showsHandlers.unpublish,
                description: 'Despublica uma peça de teatro específica',
                tags: ['api', 'shows'],
                validate: {
                    params: {
                        category: Joi.string()
                                .required()
                                .description('categoria da peça de teatro'),
                        slug: Joi.string()
                                .required()
                                .description('slug da peça de teatro')
                    }
                }
            }
        }
    ];
}
