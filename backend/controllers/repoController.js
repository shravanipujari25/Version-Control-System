const createRepository=(req,res)=>{
    res.send("Repository Created !");
 };
const getAllRepositories=(req,res)=>{
    res.send("All respositories fetched !");
 };

const fetchRepositoryById=(req,res)=>{
    res.send("Repository Details Fetched !");
 };

const fetchRepositoryName=(req,res)=>{
    res.send("All respositories fetched !");
 }; 

 const fetchRepositoriesForCurrentUser=(req,res)=>{
    res.send("Respositories for logged in user fetched !");
 } ;

 const updateRepositoryById=(req,res)=>{
    res.send("Respository updated !");
 };

 const toggleVisibilityById=(req,res)=>{
    res.send("Visibility toggled !");
 };
 
 
 const deleteRepositoryById=(req,res)=>{
    res.send("Respository deleted !");
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