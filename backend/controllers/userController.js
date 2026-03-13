const getAllUsers=(req,res)=>{
    console.log("All users fetched !");
};

const signUp=(req,res)=>{
    console.log("Signing Up !");
};

const login=(req,res)=>{
    console.log("Logging in!");
};

const getUserProfile=(req,res)=>{
    console.log("Profile fetched ! ");
};

const UpdateUserProfile=(req,res)=>{
    console.log("Profile Updated !");
};

const DeleteUserProfile=(req,res)=>{
    console.log("Profile Deleted !");
};

export default{
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    UpdateUserProfile,
    DeleteUserProfile};