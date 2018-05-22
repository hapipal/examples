'use strict';

const Boom = require('boom');

module.exports = {
    method: 'get',
    path: '/riddle/random',
    options: {
        tags: ['api'],
        handler: async (request) => {

            const { Riddles } = request.models();
            const count = await Riddles.query().resultSize();

            if (count === 0) {
                throw Boom.notFound('Looks like we don\'t have any riddles. Sorry!');
            }

            const randomOffset = Math.floor(Math.random() * count);
            const randomRiddle = await Riddles.query().offset(randomOffset).first();

            return randomRiddle;
        }
    }
};
