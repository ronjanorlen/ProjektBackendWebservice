const mongoose = require("mongoose"); // Inkludera mongoose

// Review-schema
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ange ditt namn"]
    },
    comment: {
        type: String,
        required: [true, "Lämna en kommentar"]
    },
    rating: {
        type: Number,
        required: [true, "Välj en rating"],
        min: 1, // Minsta rating
        max: 5 // Högsta rating
    },
    date: {
        type: Date,
        default: Date.now // Sätt default som aktuellt datum
    }
});

const Review = mongoose.model("Review", reviewSchema, "reviews"); // Skapa mongoose-model av schema, lägg i collection reviews
module.exports = Review; // Exportera Review