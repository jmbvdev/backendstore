const path= require("path")
const { catchAsync } = require("../utils/catchAsync")


const renderIndex= catchAsync(async(req,res)=>{
 


res.status(200).render("emails/baseEmail",{title:"Title comming from controller"})
})

module.exports={renderIndex}