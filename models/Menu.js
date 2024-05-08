const mongoose = require("mongoose"); // Inkludera mongoose

// Meny-schema
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ange namn på maträtten"]
    },
    description: {
        type: String,
        required: [true, "Ange en beskrivning"]
    },
    category: {
        type: String,
        required: [true, "Ange vilken kategori maträtten tillhör"],
        enum: ["mainmenu", "kidsmenu", "dessert"]
    },
    price: {
        type: Number,
        required: [true, "Ange maträttens pris"]
    }
});

const Menu = mongoose.model("Menu", menuSchema, "menu"); // Skapa mongoose-model av schema, lägg till i collection menu
module.exports = Menu; // Exportera Menu