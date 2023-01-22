import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "181123031612-3f7rcbbg6cn7ed63je4bi0uidmroo6b6.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04TOD5ytTMmH_CgYIARAAGAQSNwF-L9IrsVNb74J0hkIUpKYQXsqqfMcevOU3e-ytLXjipMLe_Al_2J06K2BQreqszP6c6lwyo0k";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

export const recieveOrder = async (email: string, username: string) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "tribinnov.talent@gmail.com",
        refreshToken: accessToken,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const buildfile = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildfile, {
      username: username,
    });

    const mainOptions = {
      from: "Earthe Saloon.<tribinnov.talent@gmail.com>",
      to: email,
      subject: "Your Order Has Been Recived 🤝🤝🤝",
      html: data,
    };

    transporter.sendMail(mainOptions, () => {
      console.log(`Mail Sent Successfully`);
    });
  } catch (error) {
    return error;
  }
};
