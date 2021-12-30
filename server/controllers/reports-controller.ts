import { Report, User, Pet } from "../models";
import { sgMail } from "../lib/sendgrid";

export async function sendReport(body) {
  const { petName, nameReporter, tel, petInfo, emailUser } = body;
  console.log(body);
  const message = {
    to: emailUser,
    from: "giulierro07@hotmail.com",
    subject: `Tenemos información acerca de ${petName}`,
    text: `
    Una persona tiene información acerca de tu mascota, ${petName}:

    ${petInfo}
      

  Para comunicarte con ${nameReporter} podes hacerlo mediante el número de telefono:  ${tel}`,
  };
  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return true;
}
