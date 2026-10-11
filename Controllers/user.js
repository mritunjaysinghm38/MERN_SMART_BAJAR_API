import { User, adminUser } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


//user resister 
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ message: "user already exist", success: false });

        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashPass });
        res.json({ massage: "User register successfully2 ..!", user, success: true })
        console.log("User register successfully2 ..!", user)
    } catch (error) {
        res.json({ message: error.massage });
    }
};


//user login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.json({ message: "user not found", success: false });
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.json({message:"Invalid Credential",success:false});
        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{expiresIn:'365d'})

        res.json({ message: `wellcome ${user.name}`,token, success: true})
    } catch (error) {
        res.json({ message: error.message })
    }
}; 




// get all user
export const users = async (req, res )=>{
    try {
        let users = await User.find().sort({createdAt:-1})
        res.json(users)
    } catch (error)
     {
        res.json(error.message);
    }
}





//get user profile
export const profile =async(req,res)=>{
    res.json({user:req.user})
}


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await adminUser.findOne({ email });
        if (!user) return res.json({ message: "user not found", success: false });
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.json({message:"Invalid Credential",success:false});
        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{expiresIn:'365d'})

        res.json({ message: `wellcome ${user.name}`,token, success: true})
    } catch (error) {
        res.json({ message: error.message })
    }
}; 



//delete user by id
export const deleteUserXById = async (req, res) => {
  const id = req.params.id;
  let user = await User.findByIdAndDelete(id)
  if (!user) return res.json({ message: 'invalid id xxx' })
  res.json({ message: "User has been Deleted", user })

}