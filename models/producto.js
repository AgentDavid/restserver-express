const { Schema, model } = require('mongoose')

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    }, 
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String,
    },
    img: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    }
})

productoSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', productoSchema)