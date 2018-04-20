'use strict';

const Boom = require('boom');
const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/riddle/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: {
                id: Joi.number().integer()
            }
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
