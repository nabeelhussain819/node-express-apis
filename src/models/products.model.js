const moongoose = require('mongoose');

const productSchema = new moongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    status:{
        type: String,
        default: 'active',
        required: false
    },
    boosted:{
        type: Boolean,
        default: false,
        required: false
    },
    createdBy: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = moongoose.model('Product', productSchema);