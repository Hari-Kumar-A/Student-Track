const coursemodel = require('../models/coursemodel'); 
const eventsmodel=require('../models/eventsmodel')
const assignmentmodel=require('../models/assignmentmodel')
const expensesmodel=require('../models/expensesmodel')
 
const mongoose=require('mongoose')


//adding course get
module.exports.homepage=async (req, res)=>{
    const assignmentsCount=await assignmentmodel.countDocuments({studentId:req.session.studentId})
    const eventsCount=await eventsmodel.countDocuments({studentId:req.session.studentId})
    const expensesCount=await expensesmodel.countDocuments({studentId:req.session.studentId})
    const coursesCount=await coursemodel.countDocuments({studentId:req.session.studentId})
    const studentname=req.session.fullname
    try {
        res.render('dashboard',{assignmentsCount,eventsCount,expensesCount,coursesCount,studentname})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}   
