const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

connectDB();

app.use('/useradmin',require('./routes/useradmin/index'));
app.use('/instructor',require('./routes/instructor/index'));
app.use('/course',require('./routes/Course/index'));

app.listen(6000,() => console.log("Server is running on port 6000"));