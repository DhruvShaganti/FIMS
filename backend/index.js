const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require("jsonwebtoken");
const models = require('./models/models')
require('dotenv').config()


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/"
const JWT_KEY = process.env.JWT_KEY || "secret_key_123"

const roleRoute = require('./routes/role')
const positionRoute = require('./routes/position')
const departmentRoutes = require('./routes/department')
const adminPortalRoutes = require('./routes/adminPortal')
const leaveApplicationEmpRoutes = require('./routes/leaveApplicationEmp')
const leaveApplicationHRRoutes = require('./routes/leaveApplicationHR')
const workExperienceRoutes = require('./routes/workExperience')
const familyInfoRoutes = require('./routes/familyInfo')
const educationRoutes = require('./routes/education')
const personalInfoRoutes = require('./routes/personalInfo')
const salaryRoutes = require('./routes/salary')
const employeeRoutes = require('./routes/employee')
const companyRoutes = require('./routes/company')
const cityRoutes = require('./routes/city')
const stateRoutes = require('./routes/state')
const countryRoutes = require('./routes/country')
const adminProjectRoutes = require('./routes/adminProject')

app.use('/api/role', roleRoute)
app.use('/api/position', positionRoute)
app.use('/api/department', departmentRoutes)
app.use('/api/admin/portal', adminPortalRoutes)
app.use('/api/leave-application-emp', leaveApplicationEmpRoutes)
app.use('/api/leave-application-hr', leaveApplicationHRRoutes)
app.use('/api/work-experience', workExperienceRoutes)
app.use('/api/family-info', familyInfoRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/personal-info', personalInfoRoutes)
app.use('/api/salary', salaryRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/city', cityRoutes)
app.use('/api/state',stateRoutes)
app.use('/api/country', countryRoutes)
app.use('/api/admin/project-bid', adminProjectRoutes)


app.post("/api/login", async (req, res) => {
    const user = await models.Employee.findOne({ Email: req.body.email })
    if (!user) {
        const body = req.body
        // console.log(body)
        if(body.email === 'admin@gmail.com' && body.password  === 'admin')
        {
            emp = {
                _id: 'admin',
                Account: 1,
                FirstName: 'admin',
                LastName: 'admin'
            };
            var token = jwt.sign(emp, JWT_KEY);
            return res.json(token)
        }
        else if(body.email === 'hr@gmail.com' && body.password  === 'hr')
        {
            emp = {
                _id: 'hr',
                Account: 2,
                FirstName: 'hr',
                LastName: 'hr'
            };
            var token = jwt.sign(emp, JWT_KEY);
            return res.json(token)
        }
        else if (body.email === 'emp@gmail.com' && body.password  === 'emp')
        {
            emp = {
                _id: 'emp',
                Account: 3,
                FirstName: 'emp',
                LastName: 'emp'
            };
            var token = jwt.sign(emp, JWT_KEY);
            return res.json(token)
        }

        return res.send("false");
    } else {
        if (user.Password == req.body.password) {
            emp = {
                _id: user._id,
                Account: user.Account,
                FirstName: user.FirstName,
                LastName: user.LastName
            };
            var token = jwt.sign(emp, JWT_KEY);
            res.send(token);
        } else {
            res.sendStatus(400);
        }
    }
});

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/abc', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected: '))
    .catch(error => console.log('Error: ', error))
    console.log('server running on http://localhost:4000')
});