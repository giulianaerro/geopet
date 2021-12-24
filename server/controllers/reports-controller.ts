import { Report, User, Pet } from "../models";
import { sgMail } from "../lib/sendgrid";

export async function sendReport(body) {
  const message = {
    to: body.emailUser,
    from: "giulierro07@hotmail.com",
    subject: `Tenemos información acerca de ${body.petName}`,
    text: `
    Una persona tiene información acerca de tu mascota, ${body.petName}:

    ${body.petInfo}
      

  Para comunicarte con ${body.nameReporter} podes hacerlo mediante el número de telefono:  ${body.tel}`,
  };
  sgMail
    .send(message)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
  return true;
}
