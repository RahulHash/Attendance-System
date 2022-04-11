// prod-deps:
// npm i express mongoose

const express = require("express");
// const mongoose= require("mongoose");

// init: mongoose, needs the mongo server running
// mongoose.connect('mongodb://localhost:27017/college')
// const StudentSchema = new mongoose.Schema({
//   name: String,
//   collegeId: Number,
//   class: String,
//   section: String
//   // img:?
// });
// const Student = mongoose.model("Student", StudentSchema);

// init: express
const app = express()
app.use((req,res, next)=>{
  console.log(`${req.method} : ${req.url}`)
  next()
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("./public/Homepage"))

app.listen(3000,()=>{
  console.log("server started listening on port 3000")
})

const register = express.Router()
const attendance = express.Router()

// todo: verify url-params in 
register.post("/", (req,res)=>{
  console.log("hit register")
  const stud = {
    name: req.body.name,
    collegeId: Number(req.body.collegeId),
    img: req.body.img,
    class: req.body.class,
    section: req.body.section
  }
  // const student = new Student(stud);
  
  // todo: add student-data to db
  // student.save()
  // todo: train model on current db
  
  res.status(200).json(stud);
})

attendance.post("/",(req,res)=>{
  console.log("hit attendance")
  const attendantsVideo = req.body.attendantsVideo;
  // todo: use model here
  // todo: get attendance list, from separate process(model)
  const attendanceList=[
    {name: 'sname', id: 1, class: 'sclass', section: 'ssectiion'},
    {name: 'sname', id: 2, class: 'sclass', section: 'ssectiion'},
    {name: 'sname', id: 3, class: 'sclass', section: 'ssectiion'},
    {name: 'sname', id: 4, class: 'sclass', section: 'ssectiion'},
    {name: 'sname', id: 5, class: 'sclass', section: 'ssectiion'}
  ]
  
  res.status(200).json(attendanceList);
})
attendance.use("/", express.static("./public/Mark_attendance/"))

app.use('/register', register)
app.use('/attendance', attendance)
app.use('/video', (req, res)=>{
  console.log({FileUploaded: req.body})
  res.status(200).redirect("/attendance")
})