const createRepository=(req,res)=>{
    console.log("Repository Created !");
 };
const getAllRepositories=(req,res)=>{
    console.log("All respositories fetched !");
 };

const fetchRepositoryById=(req,res)=>{
    console.log("Repository Details Fetched !");
 };

const fetchRepositoryName=(req,res)=>{
    console.log("All respositories fetched !");
 }; 

 const fetchRepositoriesForCurrentUser=(req,res)=>{
    console.log("Respositories for logged in user fetched !");
 } ;

 const updateRepositoryById=(req,res)=>{
    console.log("Respository updated !");
 };

 const toggleVisibilityById=(req,res)=>{
    console.log("Visibility toggled !");
 };
 
 
 const deleteRepositoryById=(req,res)=>{
    console.log("Respository deleted !");
 };
 
 
export default{
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById};