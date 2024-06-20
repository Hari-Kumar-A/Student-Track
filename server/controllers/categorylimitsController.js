const categorylimitmodel = require('../models/categorylimitmodel');
const mongoose=require('mongoose')


//adding categorylimit get
module.exports.addcategorylimit=async (req, res)=>{
    
    try {
        res.render('addcategorylimit')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}   

//adding categoryimit post
module.exports.postcategorylimit=async (req, res)=>{
    
    try {
        console.log(req.body)
    const data={
        category:req.body.category,
        categorylimit:req.body.categorylimit,
        studentId:req.session.studentId,
    }
    
    const newCategory=new categorylimitmodel(data)
    await newCategory.save()
    res.redirect('/expenses/categorylimits')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}   

//viewing all categorylimits
module.exports.categorylimitspage=async (req, res)=>{
    
    try {
        const categorylimitsdata=await categorylimitmodel.find({studentId:req.session.studentId}) 
    // console.log(expensessdata)
    res.render('categorylimits',{categorylimitsdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//editing an categorylimit
module.exports.editpage=async (req, res)=>{
    
    try {
        const categorylimitdata=await categorylimitmodel.findOne({ _id: req.params.id })
        res.render('editcategorylimit',{categorylimitdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}
module.exports.posteditpage=async (req, res)=>{
    
     try {
        const editedcategorylimit=await categorylimitmodel.findByIdAndUpdate(req.params.id,{ 
            category:req.body.category,
            categorylimit:req.body.categorylimit,
            studentId:req.session.studentId
         })
         await editedcategorylimit.save()
         res.redirect('/expenses/categorylimits')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//deleting an categorylimit
module.exports.deletepage=async (req, res)=>{
    
    try {
        const categorylimitdata=await categorylimitmodel.findOne({ _id: req.params.id })
    res.render('deletecategorylimit',{categorylimitdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}
module.exports.postdeletepage=async (req, res)=>{
    
     try {
        await categorylimitmodel.deleteOne({ _id: req.params.id}) 
     res.redirect('/expenses/categorylimits')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}