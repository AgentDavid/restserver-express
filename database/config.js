const mongoose = require('mongoose')

const dbConection = async() => {
    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS, {
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