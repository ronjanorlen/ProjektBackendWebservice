# DT207G - Backend-baserad webbutveckling, Moment 5 Projektuppgift

Detta repository innehåller kod för en webbtjänst som är byggd med NodeJs och Express. 
Webbtjänsten hanterar menyn, recensioner och skapande av nya användarkonton. Data lagras i 
en MongoDB databas och använder JWT-baserad autentisering för skyddade routes. 

## Installation

Detta projekt kräver att Node.js och npm är installerat på din dator, samt en MongoDB-databas 
som är tillgänglig lokalt eller via en molntjänst, som exempelvis MongoDB Atlas. 
Klona sedan ner källkodsfilerna med kommando git clone och kör därefter kommando npm install 
för att installera nödvändiga npm-paket.  
Projektet innehåller en .env.sample-fil med exempel på de miljövariabler som ska användas.
Skapa en egen .env-fil och lägg till de variabler som ska användas för eget bruk. 

## Schemastruktur
För denna webbtjänst används Mongoose-scheman för att definiera strukturen för de olika modellerna som Meny, Recensioner och Användarkonton. Exempel på struktur för Användarkonton är: 

| Fält | Typ  | Beskrivning 
|--|--|--|
|username|String|Användarnamn, obligatoriskt, måste vara unikt.|
|password|String|Lösenord, obligatoriskt. Hashas innan det sparas.|
|created|Date|Datum och tid för när konto skapas. Skapas automatiskt av MongoDB.|

## Användning

Denna webbtjänst använder flera endpoints för att hantera menyn, användarkonton och recensioner. Nedan finns beskriver hur dessa används:

| Metod | Ändpunkt  | Beskrivning 
|--|--|--|
|POST|/api/register|Skapa ny användare. Kräver att en användare är inloggad.|
|POST|/api/login|Logga in användare, returnerar en JWT.|
|GET|/api/meals|Hämtar meny.|
|POST|/api/meals|Lägger till ny maträtt i menyn. Kräver att användaren är inloggad.|
|PUT|/api/meals/:id|Uppdaterar befintlig maträtt i menyn. Kräver att användaren är inloggad.|
|DELETE|/api/meals/:id|Tar bort befintlig maträtt i menyn. Kräver att användaren är inloggad.|
|GET|/api/reviews|Hämtar recensioner.|
|POST|/api/reviews|Lägger till ny recension.|

För att skapa ett konto eller logga in behöver användarnamn och lösenord anges i POST-anropet.
Detta görs i följande json-format: 
```json
{
    "username": "användarnamn",
    "password": "lösenord"
}
```
OBS: För att få åtkomst till den skyddade datan vid GET-anrop måste den JWT som returneras vid inloggning inkluderas. Vid användning av ThunderClient klistras denna in i Bearer Token-fältet under fliken Auth. 

Vid lyckat anrop för att skapa konto kommer meddelande om detta att visas och vid lyckat anrop för att logga in kommer data från databasen att synas.

## Skapad:
Av: Ronja Norlén  
Kurs: DT207G Backend-baserad webbutveckling  
Program: Webbutveckling  
Skola: Mittuniversitetet  
År: 2024

