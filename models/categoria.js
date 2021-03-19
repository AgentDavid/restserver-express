const { Schema, model } = require('mongoose')

const categoriaSchema = Schema({
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
    }
})

categoriaSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', categoriaSchema)