import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado correctamente a la BD");
  } catch (error) {
    console.log(error);
    console.log("Error al conectar a la base de datos");
  }
};
