import express from "express";
import { Authenticated } from "../Middlewares/auth.js";
import { login, profile, register, users, adminLogin, deleteUserXById } from "../Controllers/user.js";
const router = express.Router();

router.post('/register', register) 

//login user
router.post('/login',login)

//get all users
router.get('/all', users)

//get user profile
router.get('/profile', Authenticated ,profile)


// adminLogin
router.post('/adminLogin',adminLogin)
//delete user
router.delete('/:id',deleteUserXById)

export default router;        //4th line wala router hai. 
