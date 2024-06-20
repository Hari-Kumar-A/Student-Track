const coursemodel = require('../models/coursemodel');
 
const moment=require('moment')
const mongoose=require('mongoose')


//adding course get
module.exports.addcourse=async (req, res)=>{
    
    try {
        res.render('addcourse')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}   

//adding course post
module.exports.postcourse=async (req, res)=>{
    
    try {
        console.log(req.body)
        const data={
        course:req.body.course,
        credit:req.body.credit,
        grade:req.body.grade,
        studentId:req.session.studentId,
    }
    
    const newCourse=new coursemodel(data)
    await newCourse.save()
    res.redirect('/courses')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}   

//viewing all categorylimits
module.exports.coursespage=async (req, res)=>{
    
    try {
        const coursesdata=await coursemodel.find({studentId:req.session.studentId}) 
    // console.log(expensessdata)
    res.render('courses',{coursesdata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//editing an credit
module.exports.editpage=async (req, res)=>{
    
    try {
        const coursedata=await coursemodel.findOne({ _id: req.params.id })
        res.render('editcourse',{coursedata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}
module.exports.posteditpage=async (req, res)=>{
    
     try {
        const editedcourse=await coursemodel.findByIdAndUpdate(req.params.id,{ 
            course:req.body.course,
            credit:req.body.credit,
            grade:req.body.grade,
            studentId:req.session.studentId
         })
         await editedcourse.save()
         res.redirect('/courses')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

//deleting a course
module.exports.deletepage=async (req, res)=>{
    
    try {
        const coursedata=await coursemodel.findOne({ _id: req.params.id })
    res.render('deletecourse',{coursedata})
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}
module.exports.postdeletepage=async (req, res)=>{
    
     try {
        await coursemodel.deleteOne({ _id: req.params.id}) 
     res.redirect('/courses')
      } catch (error) {
        // Handle the error here
        console.error("Error occurred while fetching assignment data:", error);
        res.status(500).send("An error occurred while fetching assignment data.");
      }
}

// //adding timetable
// module.exports.timetable=async (req, res)=>{
    
//     try {
//         const coursesdata=await coursemodel.find({studentId:req.session.studentId}) 
//     // console.log(expensessdata)
//     res.render('timetable',{coursesdata})
//       } catch (error) {
//         // Handle the error here
//         console.error("Error occurred while fetching assignment data:", error);
//         res.status(500).send("An error occurred while fetching assignment data.");
//       }
// }

 

// module.exports.posttimetable = async (req, res) => {
//   try {
//     const studentId = req.session.studentId;

//     for (let period = 1; period <= 5; period++) {
//       const periodData = {
//         periodstart: moment(req.body[`start_time_${period}`], 'HH:mm').toISOString(),
//         periodend: moment(req.body[`end_time_${period}`], 'HH:mm').toISOString(),
//         courses: {
//           monday: req.body[`course_${period}_monday`],
//           tuesday: req.body[`course_${period}_tuesday`],
//           wednesday: req.body[`course_${period}_wednesday`],
//           thursday: req.body[`course_${period}_thursday`],
//           friday: req.body[`course_${period}_friday`],
//         },
//       };

//       // Find the existing timetable document for the current period and studentId
//       const existingTimetable = await timetablemodel.findOne({ studentId, period });

//       // If the timetable exists, update it; otherwise, create a new timetable
//       if (existingTimetable) {
//         await timetablemodel.findOneAndUpdate({ studentId, period }, periodData);
//       } else {
//         periodData.studentId = studentId;
//         periodData.period = period;
//         const newTimetable = new timetablemodel(periodData);
//         await newTimetable.save();
//       }
//     }

//     res.redirect('/courses');
//   } catch (error) {
//     // Handle the error here
//     console.error("Error occurred while saving timetable data:", error);
//     res.status(500).send("An error occurred while saving timetable data.");
//   }
// };

  
  
