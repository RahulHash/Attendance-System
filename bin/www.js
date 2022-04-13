const express = require("express");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    filename = `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`;
    console.log("Save File Name: " + filename);
    cb(null, filename);
  }
});
const upload = multer({storage});

// init: express
const app = express()
app.use((req,res, next)=>{
  console.log(`${req.method} : ${req.url}`)
  next()
})
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
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
  
  res.status(200).json(stud);
})

attendance.post("/",(req,res)=>{
  console.log("hit attendance")

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
app.use('/video',upload.single('video'), (req, res)=>{
  console.log(req.file);
  console.log(req.body);
  return res.status(200).redirect("/attendance");
})