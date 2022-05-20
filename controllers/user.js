import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import nodemailer from "nodemailer";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Mot de passe incorrect" });
    if (user.freez)
      return res.status(400).json({
        message: "Utilisateur bloqué! Veuillez contacter l'administrateur",
      });
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "24h",
    });
    const result = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
    };
    res.status(200).json({ result: result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, phone, password, firstName, lastName, role } = req.body;


  try {
    const isUserExist = await UserModal.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModal({
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      password: hashedPassword,
      role: role,
    });
    await user.save();
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "24h",
    });
    const result = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
    };
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    // Token generation
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "24h",
    });
    // Send Email to user
    var transporter = nodemailer.createTransport({
      pool: true,
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@iber-conseils.com",
        pass: "Grissa1906",
      },
    });

    var mailOptions = {
      from: "contact@iber-conseils.com",
      to: user.email,
      subject: "Iber Conseils - Récupération de mot de passe",
      text:
        "Bonjour,\n\n" +
        user.name +
        "\n\nVous avez demandé la récupération de votre mot de passe.\n\n" +
        "Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe:\n\n" +
        "https://iber-conseils.com/reset?token=" +
        token +
        "\n\nSi vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer ce message.\n\nCordialement,\n\nL'équipe Iber Conseils",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModal.findOne({ email: decoded.email });
    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Mot de passe réinitialisé" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.json({ data: users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModal.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.json({ message: "User Added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const editUser = async (req, res) => {
  let hashedPassword = null;
  const { id } = req.params;
  const { name, email, phone, password, role } = req.body;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 12);
  }

  const updatedUser = { name, email, phone, hashedPassword, role, _id: id };

  await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json({ message: "User updated successfully." });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await UserModal.findByIdAndRemove(id);

  res.status(201).send(`User Deleted`);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModal.findById(id, { password: 0 });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editProfile = async (req, res) => {
  let hashedPassword = null;
  const { id } = req.params;
  const { name, email, phone, avatar, password } = req.body;
  const currentUser = await UserModal.findById(id);
  if (password) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (isPasswordCorrect) {
      hashedPassword = await bcrypt.hash(password, 12);
    }
  }
  const updatedUser = { name, email, phone, avatar, hashedPassword, _id: id };
  try {
    const user = await UserModal.findByIdAndUpdate(id, updatedUser, {
      new: true,
      password: 0,
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
