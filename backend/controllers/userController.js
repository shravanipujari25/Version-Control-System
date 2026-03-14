import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {MongoClient, ReturnDocument} from "mongodb";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const uri=process.env.MONGODB_URI;

let client;
async function connectClient() {
    if(!client){
        client=new MongoClient(uri);
        await client.connect();    
    }
}


 const signUp = async (req,res)=>{
    const {username,password,email}=req.body;
    try{
        await connectClient();
        const db=client.db("githubclone");
        const userCollection=db.collection("users");

        const user=await userCollection.findOne({username});
        if (user){
            return res.status(400).json({message:"User Already Exists! "});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser={
            username,
            password:hashedPassword,
            email,
            repositories:[],
            followedUsers:[],
            starRepos:[]
        }
        const result=await userCollection.insertOne(newUser);

        const token=jwt.sign({id:result.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json(token);
    } 
    catch(error){
        console.error("Error during signup :",error.message);
        res.status(500).send("Server error");
    };
    
    
};

const login= async(req,res)=>{
    const {email,password}=req.body;
    try{
       await connectClient();
       const db=client.db("githubclone");
       const userCollection=db.collection("users");

       const user=await userCollection.findOne({email});
        if (!user){
            return res.status(400).json({message:"Invalid Credentials! "});
        }

       const isMatch= await bcrypt.compare(password,user.password);
       if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials! "});
       } 
       const token=jwt.sign({id:user._id.insertedId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
       res.json({token, userId :user._id});
       }
       catch(error){
        console.error("Error during login :",error.message);
        res.status(500).send("Server error"); 
       }
};

const getAllUsers=async (req,res)=>{
    try{
       await connectClient();
       const db=client.db("githubclone");
       const userCollection=db.collection("users");

       const user=await userCollection.find({}).toArray();
       res.json(user);
    }
    catch(error){
        console.error("Error during fetching users :",error.message);
        res.status(500).send("Server error"); 
       }
};

const getUserProfile=async (req,res)=>{
    const currentId=req.params.id;
    try{
       await connectClient();
       const db=client.db("githubclone");
       const userCollection=db.collection("users");

       const user=await userCollection.findOne({
        _id: new ObjectId(currentId),
       });
       if (!user){
            return res.status(400).json({message:"User Not Found "});
        }
        res.send(user,{message:"Profile Fetched !"});
    }
    catch(error){
        console.error("Error during getting user profile :",error.message);
        res.status(500).send("Server error"); 
       }
};

const UpdateUserProfile=async (req,res)=>{
    const currentId=req.params.id;
    const {email,password}=req.body;
    try{
       let updateFields={email};
       await connectClient();
       const db=client.db("githubclone");
       const userCollection=db.collection("users");

       if(password){
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        updateFields.password=hashedPassword;
        };

        const result = await userCollection.findOneAndUpdate(
         { _id: new ObjectId(currentId) },
         { $set: updateFields },
         { returnDocument: "after" }
        );

       if(!result){
        return res.status(404).json({message:"User Not Found"});
       }
       res.send(result);
    }
    catch(error){
        console.error("Error during updating :",error.message);
        res.status(500).send("Server error"); 
       }
};

const DeleteUserProfile=async (req,res)=>{
    const currentId = req.params.id;
    try{
       await connectClient();
       const db=client.db("githubclone");
       const userCollection=db.collection("users");

       const result=await userCollection.deleteOne({_id: new ObjectId(currentId)});

       if (result.deleteCount==0){
         return res.status(404).json({message:"User Not Found !"});
       }
       res.json({message:"User Profile Deleted"});
    }
    catch(error){
        console.error("Error during delete :",error.message);
        res.status(500).send("Server error"); 
       }
};

export default{
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    UpdateUserProfile,
    DeleteUserProfile};