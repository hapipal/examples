'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class Riddles extends Schwifty.Model {

    static get tableName() {

        return 'Riddles';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            slug: Joi.string(),
            question: Joi.string(),
            answer: Joi.string()
        });
    }
};
