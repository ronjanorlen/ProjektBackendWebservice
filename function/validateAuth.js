const jwt = require("jsonwebtoken"); // Inkludera jsonwebtoken

/* Validera token */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Hämta token
    // Om besökare inte har tillgång till sidan
    if(token == null) res.status(401).json({ message: "Ej berättigad åtkomst - token saknas" });
    // Verifiera token med secret key från env-fil
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        // Om token är ogiltig, returnera felmeddelande
        if(err) return res.status(403).json({ message: "Ogiltig JWT" });
        // Om token är giltig, lägg till användarnamn
        req.username = username; 
        // Gå vidare till skyddad route
        next();
    });
}

module.exports = { authenticateToken }; // Exportera funktion