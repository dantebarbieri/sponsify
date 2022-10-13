const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    name: String,
    fundName: String,
    address: {
        streetAddress: String,
        zip: Number,
        city: String,
        state: String,
        country: String
    },
    eventCode: String,
    validAdmins: [String],
    FAQ: [{
        question: String,
        answer: String
    }],
    levels: [{
        minAmount: Number,
        maxAmount: Number,
        name: String,
        color: String,
        description: String
    }],
    events: [mongoose.SchemaTypes.ObjectId],
    exampleInvoice: String
})

module.exports = mongoose.model('organizations', orgSchema);