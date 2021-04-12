'use strict';

const Schwifty = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Riddles extends Schwifty.Model {

    static tableName = 'Riddles';

    static joiSchema = Joi.object({
        id: Joi.number().integer(),
        slug: Joi.string(),
        question: Joi.string(),
        answer: Joi.string()
    });
};
