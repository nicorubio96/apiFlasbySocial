const models = require('../database/models/')

const createPost=async(req,res,next)=>{
    let photo = req.file ? req.file.path : null;
    const {comment,UserId}= req.body


    const userVerified = await models.User.findByPk(UserId)
    if(!userVerified){
        return res.status(404).json({msg:'user not found'})
    }


    const postSave = await models.Post.create({comment,photo,UserId})
    res.status(200).json({msg:'ok',postSave})

}

const getPosts =async(req,res)=>{

    try{
       let posts =await models.Post.findAll()

       res.status(200).json({posts})
    }catch(err){
        console.log(err)

    }
    

}

const getPost= async(req,res)=>{

}
const deletePost = async(req,res)=>{

}

const putPost = async(req,res)=>{

}

module.exports={
    createPost,
    getPosts,
    getPost,
    deletePost,
    putPost

}