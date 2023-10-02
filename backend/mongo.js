// Mongoose es un object modeling que incluye los drivers de MongoDB
const mongoose = require('mongoose');

//saco las variables de entorno para la conexion
const connectionString = process.env.MONGO_DB_URI;

// Conexión a mongodb
mongoose
  .connect(connectionString)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

process.on('uncaughtException', (error) => {
  console.error(error);
  mongoose.disconnect();
});
