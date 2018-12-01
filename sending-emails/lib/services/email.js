'use strict';

const Util = require('util');
const Schmervice = require('schmervice');
const Nodemailer = require('nodemailer');
const { htmlToText: HtmlToText } = require('nodemailer-html-to-text');

module.exports = class EmailService extends Schmervice.Service {

    constructor(server, options) {

        super(server, options);

        this.transporter = Nodemailer.createTransport(options.email);
        this.transporter.use('compile', Util.callbackify(this.templatePlugin.bind(this)));
        this.transporter.use('compile', HtmlToText());
    }

    async templatePlugin({ data }) {

        data.html = data.html || await this.server.render(data.template, data.context);
    }

    async sendMail(data) {

        return await this.transporter.sendMail(data);
    }

    async createTestAccount() {

        return await Nodemailer.createTestAccount();
    }
};
