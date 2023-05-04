/*const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if(!err){
            console.log('**** Conexión Correcta ****')
        }else{
            console.log('**** error de Conexión ****')
        }     
    }
  );
};*/

const mongoose = require("mongoose");


const DB_URI = process.env.DB_URI;
const dbConnectNoSql = () => {
    
    console.log("Connection NOSQL SUCCESS")


};

mongoose.connect(DB_URI);
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - '));

module.exports = dbConnectNoSql