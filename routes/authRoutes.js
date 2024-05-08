// Routes för registrering och inloggning

const express = require("express"); // Inkludera express
const router = express.Router(); // Nytt Router-objekt
const jwt = require("jsonwebtoken"); // Inkludera jsonwebtoken
require("dotenv").config(); // Inkludera dotenv
const User = require("../models/User"); // Inkludera användar-model
const { authenticateToken } = require("../function/validateAuth"); // Inkludera autentiseringsfuntion

// Registrera ny användare
router.post("/register", authenticateToken, async (req, res) => {
    try {
        // Hämta användarnamn och lösen från body
        const { username, password } = req.body;
        // Validera input
        if(!username || !password) {
            // om fel
            return res.status(400).json({ error: "Ogiltig input, vänligen ange användarnamn och lösenord "});
        }
        // Kontrollera om användare redan finns
        const userExist = await User.findOne({ username: username });
        if (userExist) {
            // Om användare redan finns
            return res.status(409).json({ error: "Användarnamnet är upptaget" });
        }
        // Om korrekt - spara användare
        const user = new User({ username, password });
        // Spara användare i databasen
        await user.save();
        // Meddelande om lyckad registrering
        res.status(201).json({ message: "Användare skapad" });
        // Om eventuella fel
    } catch {
        res.status(500).json({ error: "Server error" });
    }
});

// Logga in användare
router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Ogiltig input, vänligen ange användarnamn och lösenord" });
        }
        /* Kontrollera angivna uppgifter */
        // Finns användare redan?
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktiga användaruppgifter "});

        }
        // Kontrollera lösenord 
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktiga användaruppgifter "});
        } else {
            // Skapa JWT
            const payload = { username: username }; // Kontrollera vilken användare som loggar in
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Ge token livslängd 1h
            const response = {
                message: "Användare inloggad", // Skicka svar om lyckad inloggning
                token: token // Skicka med token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        res.status(500).json({ error: "server error " });
    }
});

module.exports = router; // Exportera Router-objekt