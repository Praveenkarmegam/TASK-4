require('dotenv').config()

const cors = require('cors');
const express =  require('express')
const mongoose =  require('mongoose')
const routes =  require('./router')

const app  = express();

app.use(express.json())
app.use("/api",routes)


//connect to mongodb 
mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const database = mongoose.connection

database.on('error',(err) => console.log(err))

database.on('connected', () =>  console.log('Database Connected'))


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));


app.listen(3000, () => {
    console.log("Server started on localhost:3000");
    
})