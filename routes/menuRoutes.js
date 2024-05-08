// Routes för menyn

const express = require("express"); // Inkludera express
const router = express.Router(); // Router-objekt
const Menu = require("../models/Menu"); // Inkludera menu-model
const { authenticateToken } = require("../function/validateAuth"); // Inkludera autentiseringsfunktion

// GET-route för att hämta menyn
router.get("/", async (req, res) => {
    try {
        // Hämta alla maträtter från MongoDB
        const meals = await Menu.find({});
        // Kontroll om det finns något att hämta
        if (meals.length === 0) {
            // Felmeddelande om inga rätter finns
            return res.status(404).json({message: "Det finns inga maträtter att hämta" });
        } else {
            // Om det finns maträtter, returnera dessa
            return res.json(meals);
        }
    } catch (error) {
        console.error("Något gick fel vid hämtning av menyn: ", error);
        // Returnera felkod och fel
        return res.status(500).json(error);
    }
});

// POST-route för att lägga till ny maträtt
router.post("/", authenticateToken, async (req, res) => {
    try {
        // Skapa ny maträtt med data från body
        const newMeal = new Menu(req.body);
        // Spara maträtt i databasen
        await newMeal.save();
        // Meddelande om maträtt lyckats sparas
        res.status(201).json({ message: "Maträtt tillagd" });
        // Om eventuella fel
    } catch (error) {
        console.error("Något gick fel vid tillägg av maträtt ", error);
        res.status(500).json(error);
    }
})

module.exports = router; // Exporta Router-objekt