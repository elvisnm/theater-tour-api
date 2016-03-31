import theaterSchema from '../validation-schemas/theater';
import Joi from 'joi';

export default function getTheatersRoutes(server) {
    const theatersHandlers = server.app.handlers.theaters;

    return [
        {
            method: 'GET',
            path: '/theaters',
            config: {
                handler: theatersHandlers.findAll,
                description: 'Retorna todos os teatros',
                tags: ['api', 'theaters']
            }
        },
        {
            method: 'GET',
            path: '/theaters/{id}',
            config: {
                handler: theatersHandlers.findOne,
                description: 'Retorna uma peça de teatro específica',
                tags: ['api', 'theaters'],
                validate: {
                    params: {
                        id: Joi.string()
                                .required()
                                .description('id do teatro')
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/theaters',
            config: {
                handler: theatersHandlers.createOrUpdate,
                description: 'Cria um teatro',
                tags: ['api', 'theaters'],
                validate: {
                    payload: theaterSchema
                }
            }
        },
        {
            method: 'PUT',
            path: '/theaters/{id}',
            config: {
                handler: theatersHandlers.createOrUpdate,
                description: 'Edita um teatro',
                tags: ['api', 'theaters'],
                validate: {
                    payload: theaterSchema
                }
            }
        },
        {
            method: 'DELETE',
            path: '/theaters/{id}',
            config: {
                handler: theatersHandlers.remove,
                description: 'Publica um teatro',
                tags: ['api', 'theaters'],
                validate: {
                    params: {
                        id: Joi.string()
                                .required()
                                .description('id do teatro')
                    }
                }
            }
        }
    ];
}
