const assignmentmodel=require('../models/assignmentmodel')
const mongoose=require('mongoose')
const path=require('path')
const express=require('express')
const router=express.Router()
const multer = require('multer');
const addPathModule = require('../middleware/pathware');
const fs=require('fs')

 


//viewing all assignments
module.exports.assignmentspage=async (req, res)=>{
    
    try {
        const assignmentsdata=await assignmentmodel.find({studentId:req.session.studentId}) 
    // console.log(assignmentsdata)
    res.render('assignments',{assignmentsdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//viewing assignment
module.exports.viewpage=async (req, res)=>{
    
    try {
        const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
    res.render('viewassignment',{assignmentdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//editing assignments
module.exports.editpage=async (req, res)=>{
    
    try {
        const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
        res.render('editassignment',{assignmentdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

module.exports.posteditpage=async (req, res)=>{
    const editedassignment=await assignmentmodel.findByIdAndUpdate(req.params.id,{ 
        course:req.body.course,
        assignment:req.body.assignment,
        duedate:req.body.duedate
     })
     await editedassignment.save()
     res.redirect('/assignments')
}

//delete assignment
module.exports.deletepage=async (req, res)=>{
    
    try {
        const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
        res.render('deleteassignment',{assignmentdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

module.exports.postdeletepage=async (req, res)=>{
     
    
     try {
        const assignmentdata=await assignmentmodel.findOne({ _id: req.params.id })
    const pdfPath=assignmentdata.pdf
    fs.unlink(pdfPath, (err) => {
        if (err) {
            console.error('Error deleting PDF file:', err);
        } else {
            console.log('PDF file deleted successfully.');
        }
    });
    await assignmentmodel.deleteOne({ _id: req.params.id}) 
     res.redirect('/assignments')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//search
module.exports.searchpage=async (req, res)=>{
   
   try {
    const searchassignment=req.body.searchassignment
//    const regexserachassignment=searchassignment.replace(/[^a-zA-Z0-9]/g,"");

   const searchassignmentdata=await assignmentmodel.find({
    studentId:req.session.studentId,
    $or:[
        {course:{ $regex: new RegExp(searchassignment,"i")}},
        {assignment:{ $regex: new RegExp(searchassignment,"i")}}
    ]
   }) 
   res.render('searchassignment',{searchassignmentdata})
  } catch (error) {
    // Handle the error here
    console.error("Error occurred while fetching assignment data:", error);
    res.status(500).send("An error occurred while fetching assignment data.");
  }
}

//calendar view of assignments directing
module.exports.calendarpage=async (req, res)=>{
    const assignmentsdata=await assignmentmodel.find({studentId:req.session.studentId})
    const events=[]
    assignmentsdata.forEach(element => {
        events.push({
          title: element.assignment,
          url: `/assignments/view/${element._id}`,
          start: element.duedate.toISOString().split('T')[0]
        });
      });
    //   console.log(events)
    // const data="Inspection"
    res.render('calendarassignment',{layout:false,eventsJSON: JSON.stringify(events)})
}
