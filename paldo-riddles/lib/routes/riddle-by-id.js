'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/riddle/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer()
            })
        },
        handler: async (request) => {

            const { Riddles } = request.models();
            const { id } = request.params;

            const riddle = await Riddles.query().findById(id);

            if (!riddle) {
                throw Boom.notFound('Sorry, that riddle doesn\'t exist (yet)');
            }

            return riddle;
        }
    }
};
