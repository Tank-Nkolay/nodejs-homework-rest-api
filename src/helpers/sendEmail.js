const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "tank-nikolay1@ukr.net" };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = { sendEmail };
