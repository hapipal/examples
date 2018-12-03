'use strict';

module.exports = {
    value: {
        welcome: async (server, [name, to]) => {

            const { emailService } = server.services();

            await emailService.sendMail({
                to,
                from: 'no-reply@example.com',
                subject: 'Welcome!',
                template: 'welcome',
                context: { name }
            });

            console.log(`Email sent to ${to}.`);
        },
        createTestAccount: async (server) => {

            const { emailService } = server.services();

            const { user, pass } = await emailService.createTestAccount();

            console.log(`User: ${user}`);
            console.log(`Password: ${pass}`);
            console.log();
            console.log('After copying server/.env-keep to server/.env, fill-in the missing EMAIL_USER and EMAIL_PASS configuration in server/.env.');
        }
    }
};
