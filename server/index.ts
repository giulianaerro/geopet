import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import * as path from "path";

import { authToken, authUser, editMyData } from "./controllers/auth-controller";
import {
  createPetLost,
  petsAround,
  myLostPets,
  editMyPet,
  deletedLostPet,
} from "./controllers/pets-controller";
import { findByEmail, findUser } from "./controllers/user-controller";
import { authMiddleware, reqBody } from "./controllers/middleware";
import { sendReport } from "./controllers/reports-controller";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

//users-auth//
app.get("/user/exist", async (req, res) => {
  const { email } = req.query;
  const emailExist = await findByEmail(email);
  res.json(emailExist);
});

//signup
app.post("/auth", reqBody, async (req, res) => {
  const { email, fullName, password } = req.body;
  const auth = await authUser(email, fullName, password);
  res.json(auth);
});

//signin
app.post("/auth/token", reqBody, async (req, res) => {
  const { email, password } = req.body;
  const authT = await authToken(email, password);
  res.json(authT);
});

//mis datos
app.get("/me", authMiddleware, async (req, res) => {
  const userId = req._user.id;

  const user = await findUser(userId);
  res.json(user);
});

//edito mis datos
app.put("/me/edit", authMiddleware, reqBody, async (req, res) => {
  const userId = req._user.id;

  const user = await editMyData(userId, req.body);
  res.json(user);
});

//pets//

//create lost pet
app.post("/pet/lost", authMiddleware, reqBody, async (req, res) => {
  const userId = req._user.id;
  const createLostPet = await createPetLost(userId, req.body);
  res.json(createLostPet);
});

//obtengo todas las mascotas cerca de una ubicación
app.get("/pets", async (req, res) => {
  const { userLat, userLng } = req.query;
  const lostPets = await petsAround(userLat, userLng);
  res.json(lostPets);
});

//obtengo mis mascotas publicadas
app.get("/me/pets", authMiddleware, async (req, res) => {
  try {
    const lostPets = await myLostPets(req._user.id);
    res.json(lostPets);
  } catch (error) {
    res.send(error);
  }
});

//editar mascota publicada
app.put("/pets/edit/:id", authMiddleware, reqBody, async (req, res) => {
  const { id } = req.params;
  try {
    const editPetReportRes = await editMyPet(id, req.body);

    res.send(editPetReportRes);
  } catch (err) {
    res.send({ err });
    console.log(err);
  }
});

//borrar mascota publicada
app.delete("/pet/delete", authMiddleware, reqBody, async (req, res) => {
  const { id } = req.body;
  const petDeleted = await deletedLostPet(id);
  res.json(petDeleted);
});

//enviar reporte
app.post("/pet/report", reqBody, async (req, res) => {
  const sendNotificationRes = await sendReport(req.body);
  res.json(sendNotificationRes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`\nServer listen on port: \x1b[32m${PORT}\x1b[0m`);
});
