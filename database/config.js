const mongoose = require('mongoose')

const dbConection = async() => {
    try {
        
        await mongoose.connect("mongodb+srv://restserver_cafecito_uno:Ed53j0kGS6ZnVSPw@cluster0.sf0he.mongodb.net/cafeDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');
        
    } catch (error) {
        throw new Error('Error en el inicio de la base de datos')
    }
}

module.exports = {
    dbConection
}