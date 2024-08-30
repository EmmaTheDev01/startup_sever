import express from 'express';
import { deleteUser, findAllUsers, findUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


const router = express.Router()

//create a new Users 

//update a Users 

router.put("/:id",verifyUser, updateUser);
//delete a Users

router.delete("/:id",verifyUser, deleteUser);
//find a Users

router.get("/:id", findUser);
//find  all Users

router.get("/", verifyAdmin, findAllUsers);


export default router;