import LoggingService from "./loggingService";
const path = require("path");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
const handlebars = require("handlebars");

const {
  FORGOT_MAIL,
  MAIL_SERVER_HOST,
  MAIL_SERVER_USER,
  MAIL_SERVER_PASS,
  MAIL_SERVER_PORT,
  MAIL_SERVER_FROM
} = process.env;

class EmailService {
  private transporter: any;

  constructor(private logging: LoggingService) {
    const port: string = MAIL_SERVER_PORT || "25";
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: "SMTP",
        host: MAIL_SERVER_HOST,
        port: parseInt(port),
        auth: {
          user: MAIL_SERVER_USER,
          pass: MAIL_SERVER_PASS,
        },
        debug: true,
      })
    );
  }

  async sendEmailWithTemplate(template: string, replacements: any, email: string, subject: string): Promise<void> {
    let mailtempconf: any = fs.readFileSync(template, "utf8");
    let templateCompiled: any = handlebars.compile(mailtempconf);
    if (replacements) {
      let htmlToSend: any = templateCompiled(replacements);
      return this.sendEmail(email, subject, htmlToSend);
    }
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    await this.transporter
      .sendMail({
        from: MAIL_SERVER_FROM,
        to: email,
        subject: subject,
        html: body,
      })
      .catch((ex: any) => {
        this.logging.logError(ex.message, EmailService.name);
      });
  }

  async sendForgetPasswordEmail(url: string, email: string): Promise<void> {
    let replacements: { url: string } = { url };
    return this.sendEmailWithTemplate(path.join(__dirname, FORGOT_MAIL), replacements, email, "Password Reset Request");
  }

}

export default EmailService;
