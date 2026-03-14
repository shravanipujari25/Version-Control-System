const createIssue=(req,res)=>{
    res.send("Issue created !");
};

const updateIssueById=(req,res)=>{
    res.send("Issue Updated !");
};

const deleteIssueById=(req,res)=>{
    res.send("Issue deleted !");
};

const getAllIssues=(req,res)=>{
    res.send("All Issues fetched !");
};

const getIssueById=(req,res)=>{
    res.send("Issue details fetched !");
};

export default {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}