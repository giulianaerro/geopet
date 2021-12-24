import { sequelize } from "./models/conn";
import { User, Auth } from "./models";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});

// sequelize.sync({ alter: true }).then((res) => {
//   console.log(res);
// });
