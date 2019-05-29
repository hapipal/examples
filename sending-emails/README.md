# sending-emails

A command-line application built with [hapi pal](https://hapipal.com) that sends templated emails using [nodemailer](https://github.com/nodemailer/nodemailer), [vision](https://github.com/hapijs/vision), and [schmervice](https://github.com/hapipal/schmervice).

## Usage
Before sending any emails, you need some test account credentials with [ethereal.email](https://ethereal.email).  This app exposes a CLI command to generate these credentials for you and another command to send a templated "welcome" email (see [`lib/expose/commands.js`](lib/expose/commands.js)).  Simply follow the directions below to get started!

```sh
$ npm install
$ npm install -g hpal # For running your app's CLI commands and more
$ cp server/.env-keep server/.env
$ hpal run sending-emails:create-test-account
# Place test account credentials in server/.env
$ hpal run sending-emails:welcome Paldo paldo@hapipal.com
# Go to https://ethereal.email, login with your test account credentials,
# and see that your templated welcome email was sent to Paldo.
```

### How it works

This project was scaffolded using the [pal boilerplate](https://github.com/hapipal/boilerplate) and the [hpal CLI](https://github.com/hapipal/hpal), so everything in `lib/` constitutes a hapi plugin and `server/` contains the code to configure and deploy that plugin as a hapi server.

One curiosity of this application is that it actually does not have any routes/endpoints!  Instead, we opted to expose a command-line interface that can be invoked using [hpal](https://github.com/hapipal/hpal), as you may have noticed at the top of [Usage](#usage) section.  Because all the code for sending emails is placed inside [an email service](lib/services/email.js), it is straightforward to share code for sending emails across route handlers, the REPL (`hpal run debug:repl`), or a CLI command as we do in this project.  That is made possible by the [schmervice](https://github.com/hapipal/schmervice) plugin, which endows your hapi application with a "service layer."

We have a single [`EmailService`](lib/services/email.js) in this project, which is a class that configures [nodemailer](https://github.com/nodemailer/nodemailer) and integrates it with hapi's plugin for template rendering, [vision](https://github.com/hapijs/vision).  In this way, we can send [handlebars](https://github.com/wycats/handlebars.js)-templated HTML emails (with a plaintext fallback) in a consistent way as long as you have access to your hapi `server` or a `request` object.  The service is configured via plugin options originating in [`server/manifest.js`](server/manifest.js), and can work without any implementation changes to support Amazon's SES, Mandrill, sendmail, and other email transports.  By default, we send mail over SMTP using a free email mocking service called [Ethereal](https://ethereal.email), which does not deliver mail, but instead captures it into a faux inbox for testing purposes.  The project comes with a command `hpal run sending-emails:create-test-account` to generate Ethereal test credentials for you.

Finally, all of this is wired together using pal's file-based plugin composer, [haute-couture](https://github.com/hapipal/haute-couture), and the CLI commands exposed in [`lib/expose/commands.js`](lib/expose/commands.js) for generating credentials and sending emails can be invoked using [`hpal run`](https://github.com/hapipal/hpal#hpal-run).  We hope you find it to all be _very snazzy_, and are open to ideas for improvement.
