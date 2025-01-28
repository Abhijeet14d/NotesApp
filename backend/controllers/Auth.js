import UserModel from '../models/Auth.js';
import bcrypt from 'bcryptjs';

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

export { Register };