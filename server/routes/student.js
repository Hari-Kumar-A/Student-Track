const express=require('express')
const router=express.Router()
const authMiddleware = require('../middleware/middleware');
const studentController=require('../controllers/studentController')
const assignmentsController=require('../controllers/assignmentsController')
const eventsController=require('../controllers/eventsController')
const expensesController=require('../controllers/expensesController')
const categorylimitsController=require('../controllers/categorylimitsController')
const coursesController=require('../controllers/coursesController') 
const dashboardController=require('../controllers/dashboardController')
const multer = require('multer');
const path = require('path');
 
const addPathModule = require('../middleware/pathware');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
 
// router.get('/',authMiddleware.isAuthenticated, studentController.homepage)

//DashboardPage
router.get('/',authMiddleware.isAuthenticated,dashboardController.homepage)

// Set up file upload storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads')); // This folder will store the uploaded files
    },
    filename: function (req, file, cb) {// Generate a unique name for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });

//adding new assignment
router.get('/assignments/assignment',authMiddleware.isAuthenticated,upload.single('pdf'), studentController.addAssignment)
router.post('/assignments/assignment',authMiddleware.isAuthenticated,upload.single('pdf'), studentController.postAssignment)

//showing all assignments
router.get('/assignments',authMiddleware.isAuthenticated, assignmentsController.assignmentspage)

//view assignment
router.get('/assignments/view/:id',authMiddleware.isAuthenticated,addPathModule, assignmentsController.viewpage)

//edit assignments
router.get('/assignments/edit/:id',authMiddleware.isAuthenticated, assignmentsController.editpage)
router.put('/assignments/edit/:id',authMiddleware.isAuthenticated, assignmentsController.posteditpage)

//delete assignments
router.get('/assignments/delete/:id',authMiddleware.isAuthenticated, assignmentsController.deletepage)
router.delete('/assignments/delete/:id',authMiddleware.isAuthenticated, assignmentsController.postdeletepage)

//search assignments
router.post('/assignments/search',authMiddleware.isAuthenticated, assignmentsController.searchpage)

//calendar view of assignments
router.get('/assignments/calendarassignment',authMiddleware.isAuthenticated, assignmentsController.calendarpage)


//showing all events and classes
router.get('/events',authMiddleware.isAuthenticated, eventsController.eventspage)

//adding events and classes
router.get('/events/addevent',authMiddleware.isAuthenticated, eventsController.addEvent)
router.post('/events/addevent',authMiddleware.isAuthenticated, eventsController.postEvent)

 

////view event
router.get('/events/view/:id',authMiddleware.isAuthenticated, eventsController.viewpage)

//edit event
router.get('/events/edit/:id',authMiddleware.isAuthenticated, eventsController.editpage)
router.put('/events/edit/:id',authMiddleware.isAuthenticated, eventsController.posteditpage)

//Delete event
router.get('/events/delete/:id',authMiddleware.isAuthenticated, eventsController.deletepage)
router.delete('/events/delete/:id',authMiddleware.isAuthenticated, eventsController.postdeletepage)

//calendar view of events
router.get('/events/calendarevent',authMiddleware.isAuthenticated, eventsController.calendarpage)

//search events
router.post('/events/search',authMiddleware.isAuthenticated, eventsController.searchpage)

//showing common calendar (Events+Assignments)
router.get('/commoncalendar',authMiddleware.isAuthenticated, eventsController.commoncalendarpage)



//expenses-------------------------------------------------------------------------------------------

//showing all expenses  
router.get('/expenses',authMiddleware.isAuthenticated, expensesController.expensespage)

//adding expense
router.get('/expenses/addexpense',authMiddleware.isAuthenticated, expensesController.addExpense)
router.post('/expenses/addexpense',authMiddleware.isAuthenticated, expensesController.postExpense)

////view expense
router.get('/expenses/view/:id',authMiddleware.isAuthenticated, expensesController.viewpage)

//edit expense
router.get('/expenses/edit/:id',authMiddleware.isAuthenticated, expensesController.editpage)
router.put('/expenses/edit/:id',authMiddleware.isAuthenticated, expensesController.posteditpage)

//Delete expense
router.get('/expenses/delete/:id',authMiddleware.isAuthenticated, expensesController.deletepage)
router.delete('/expenses/delete/:id',authMiddleware.isAuthenticated, expensesController.postdeletepage)

//calendar view of expenses
router.get('/expenses/calendarexpense',authMiddleware.isAuthenticated, expensesController.calendarpage)

//search expenses by category
router.post('/expenses/search',authMiddleware.isAuthenticated, expensesController.searchpage)

//expenses/categorylimits-------------------------------------------------------------------------------------------

//showing all expenses/categorylimits  
router.get('/expenses/categorylimits',authMiddleware.isAuthenticated, categorylimitsController.categorylimitspage)

//adding category & limit
router.get('/expenses/categorylimits/addcategorylimit',authMiddleware.isAuthenticated, categorylimitsController.addcategorylimit)
router.post('/expenses/categorylimits/addcategorylimit',authMiddleware.isAuthenticated, categorylimitsController.postcategorylimit)

//edit category & limit
router.get('/expenses/categorylimits/edit/:id',authMiddleware.isAuthenticated, categorylimitsController.editpage)
router.put('/expenses/categorylimits/edit/:id',authMiddleware.isAuthenticated, categorylimitsController.posteditpage)

//Delete category & limit
router.get('/expenses/categorylimits/delete/:id',authMiddleware.isAuthenticated, categorylimitsController.deletepage)
router.delete('/expenses/categorylimits/delete/:id',authMiddleware.isAuthenticated, categorylimitsController.postdeletepage)

//coureses & credits---------------------------------------------------------------------------------------------
//showing all courses & credits  
router.get('/courses',authMiddleware.isAuthenticated, coursesController.coursespage)

//adding course & credit
router.get('/courses/addcourse',authMiddleware.isAuthenticated, coursesController.addcourse)
router.post('/courses/addcourse',authMiddleware.isAuthenticated, coursesController.postcourse)

//edit course & credit
router.get('/courses/edit/:id',authMiddleware.isAuthenticated, coursesController.editpage)
router.put('/courses/edit/:id',authMiddleware.isAuthenticated, coursesController.posteditpage)

//Delete course & credit
router.get('/courses/delete/:id',authMiddleware.isAuthenticated, coursesController.deletepage)
router.delete('/courses/delete/:id',authMiddleware.isAuthenticated, coursesController.postdeletepage)

 

 


module.exports=router
