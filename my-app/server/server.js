const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect("connection string")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const gradeSchema = new mongoose.Schema({
    name: String,
    lab: Number,
    midterm:Number,
    final:Number,
    total:Number
});


const Grade = mongoose.model('Grade', gradeSchema)

// Routes
app.post('/grades', async(req,res) => {
    const {name, lab , midterm ,final} = req.body;
    const total = lab *0.1 + midterm *0.4 + final *0.5;
    const grade = new Grade ({name ,lab , midterm, final, total});
    try{
        await grade.save();
        res.status(201).send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
    console.log("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
