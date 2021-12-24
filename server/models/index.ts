import { User } from "./users";
import { Auth } from "./auth";
import { Report } from "./report-info";
import { Pet } from "./pets";

//User tiene un solo usuario de ingreso
User.hasOne(Auth);
Auth.belongsTo(User);

//User puede tener varias mascotas perdidas publicadas
User.hasMany(Pet);
Pet.belongsTo(User);

//User puede realizar varios reportes de avistamiento de mascota perida
User.hasMany(Report);
Report.belongsTo(User);

//Pet puede tener varios reportes de avistamiento
Pet.hasMany(Report);
Report.belongsTo(Pet);

export { User, Auth, Pet, Report };
