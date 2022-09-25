
require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose'); 

const Routes = require('./routes/routes');
const PORT = process.env.PORT || 3030; 
const app = express(); 


// cors: 
const cors = require('cors');
app.use(cors({
    origin: [`${process.env.HOST}`]
}))

// json: 
app.use(express.json());


// api routes: 
app.use('/api/client', Routes.clientRoutes); 
app.use('/api/benefit', Routes.ratioRoutes); 
app.use('/api/admin', Routes.adminRoutes); 

// database connection
mongoose.connect(`mongodb+srv://gotaxiadmin:${process.env.PASSWORD}@cluster0.ftakbwy.mongodb.net/?retryWrites=true&w=majority`, { dbName: 'go-taxi-dev' })
    .then(()=> console.log('connected to database successfully'))
    .catch((e)=> console.log('error: ', e)); 

app.listen(PORT, 
    ()=> console.log('server listening on PORT: ', PORT));