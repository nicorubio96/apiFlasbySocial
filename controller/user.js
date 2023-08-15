const models = require('../database/models')



const getUsers =async(req,res)=>{

    const users = await models.User.findAll()

    res.status(200).json({
        users:users
    })



}

const getUser= async(req,res)=>{
    try{
        const id = req.params.id;

        const userVerified= await models.User.findByPk(id)

        if(!userVerified){
            return res.status(404).json({msg:'user not found'})
        }
    
        res.status(200).json({
            user:userVerified
        })

    }
    catch(err){
        console.log(err)
    }






}
const deleteUser = async(req,res)=>{

    try{
        const id = req.params.id

        const userVerified = await models.User.findByPk(id)
    
        if(!userVerified){
            return res.status(404).json({msg:'user is not found'})

        }

        await userVerified.destroy()

        res.status(200).json({msg:'deleted user'})
    

    }
    catch(err){
        console.log(err)

    }


}

const putUser = async(req,res)=>{

    try{
        const id = req.params.id
        const {username,firstName,lastName,email,password}= req.body

        const userVerified= await models.User.findByPk(id)

        if(!userVerified){
            return res.status(404).json({msg:' user is not found'})

        }

        const userUpdated = await userVerified.update({username,firstName,lastName,email,password})

        res.status(200).json({
            user: userUpdated,
            msg:'updated user'
        })

    }
    catch(err){
        console.log(err)
    }

}

module.exports={
 
    getUsers,
    getUser,
    deleteUser,
    putUser

}