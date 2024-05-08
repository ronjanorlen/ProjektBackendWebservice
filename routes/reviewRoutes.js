// Routes för recensioner

const express = require("express"); // Inkludera express
const router = express.Router(); // Router-objekt
const Review = require("../models/Reviews"); // Inkludera review-model

// GET-anrop för att visa recensioner
router.get("/", async (req, res) => {
    try {
        // Hämta alla recensioner från MongoDB
        const reviews = await Review.find({});
        // Kontroll om det finns något att hämta
        if (reviews.length === 0) {
            // Felmeddelande om inga recensioner finns
            return res.status(404).json({ message: "Det finns inga recensioner att hämta" });
        } else {
            // Om det finns recensioner, returnera dessa
            return res.json(reviews);
        }
    } catch (error) {
        console.error("Något gick fel vid hämtning av recensioner: ", error);
        // Returnera felkod och fel
        return res. status(500).json(error);
    }
});

// POST-anrop för att lägga till recension
router.post("/", async (req, res) => {
    try {
        // Skapa ny recension med data från body
        const newReview = await Review.create(req.body);
        // Meddelande om recension lyckats lagts till
        res.status(201).json({ message: "Din recension har lagts till" });
        // Om eventuella fel
    } catch (error) {
        console.error("Något gick fel vid tillägg av recension: ", error);
        return res. status(500).json(error);
    }
});

module.exports = router; // Exportera Router-objekt