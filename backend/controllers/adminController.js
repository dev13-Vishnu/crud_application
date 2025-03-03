import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const addUser = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("User created successfully:", newUser);


        res.status(201).json({message:"User created successfully", user: newUser})
    } catch (error) {
        console.error("Server error:" ,error.message);
        res.status(500).json({message: "Server Error", error: error.message})
    }
}