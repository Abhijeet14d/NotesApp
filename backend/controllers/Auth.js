import UserModel from '../models/Auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Register = async (req, res) => {
  try{
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(400).json({ message: "All fields are required" });
    const oldUser = await UserModel.findOne({ email });
    if(oldUser) return res.status(400).json({ message: "User already exists" });

    const hasedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await UserModel({ username, email, password: hasedPassword });
    newUser.save();
    res.status(201).json({ success: true, message: "User created successfully", User:newUser  });
  }catch(error){
    console.log(`Error: ${error.message}`);
  }
}

const Login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ message: "All fields are required" });

        const findUser = await UserModel.findOne({ email });
        if(!findUser) return res.status(400).json({ message: "User does not exist" });
        const comparePassword = await bcrypt.compare(password, findUser.password);
        if(!comparePassword) return res.status(400).json({ message: "Invalid credentials" });
        const token = await jwt.sign({ userId: findUser._id}, process.env.JWT_SECRET, { expiresIn: "2d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 2*24*3600*1000
        })
        res.status(200).json({ success: true, message: "User logged in successfully", token, User: findUser });
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}

export { Register, Login };