const assignmentmodel=require('../models/assignmentmodel')
const mongoose=require('mongoose')
 

 


module.exports.homepage=async (req, res)=>{
    res.render('index', { fullname: req.session.fullname })
}

//adding assignment get-------------------------
module.exports.addAssignment=async (req, res)=>{
    res.render('Assignment')
}   

//adding assignment post-------------------------
module.exports.postAssignment=async (req, res)=>{
    console.log(req.body)

    const data={
        course:req.body.course,
        assignment:req.body.assignment,
        duedate:req.body.duedate,   
        studentId:req.session.studentId,
        pdf: req.file ? req.file.path : null
    }
    
    const newAssignment=new assignmentmodel(data)
    await newAssignment.save()
    res.redirect('/assignments')
}  