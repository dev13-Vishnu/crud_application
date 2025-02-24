import express from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import upload from '../middleware/uploadMiddleware.js';
import {protect, admin} from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();

//Get all users
router.get('/users',protect, async(req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
//Get a single user by ID

router.get('/user/:id', protect, async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Register User

router.post('/register', upload.single('profilePic'),async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const profilePic = req.file? req.file.path: '';

        const user = new User({name,email, password: hashedPassword, profilePic});
        await user.save();
        res.status(201).json({message:'User Registered',user});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//Login User
router.post('/login', async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials'});


        const token = jwt.sign({id: user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET,{expiresIn:'1h'});

        res.json({token,user});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
// Update user details
router.put('/users/:id', protect, async(req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Delelte a User
router.delete('/user/:id', protect, admin, async(req,res)=> {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: "User not found"});
        
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
export default router;
 