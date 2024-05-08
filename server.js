const express = require("express"); // Inkludera express
const mongoose = require("mongoose"); // Inkludera mongoose
const cors = require("cors"); // Inkludera cors
require("dotenv").config(); // Inkludera env-fil

const app = express(); // Använd express
app.use(express.json()); // Middleware för konvertering av json-data
const port = process.env.PORT || 3000; // Kör på port från env-fil eller port 3000

app.use(cors()); // Använd cors för att tillåta alla domäner

// Inkludera routes
const authRoutes = require("./routes/authRoutes"); // Användare
const menuRoutes = require("./routes/menuRoutes"); // Meny

// Exporterade routes
app.use("/api", authRoutes); // Användare
app.use("/api/meals", menuRoutes); // Meny

// Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Fel vid anslutning till databas");
});

// Starta applikationen
app.listen(port, () => {
    console.log("Servern körs på port: " + port);
});

