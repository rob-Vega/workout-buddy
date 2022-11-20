const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Todos los campos deben ser llenados");
  }

  if (!validator.isEmail(email)) {
    throw Error("El email no es válido");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("La contraseña no es lo suficientemente segura");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("El email ya se encuentra en uso");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Todos los campos deben ser llenados");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email incorrecto");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Contraseña incorrecta");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
