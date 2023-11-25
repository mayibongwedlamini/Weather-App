import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

// create an express app and set the port number.
const app = express();
const port = 3000;

// use body parser middleware to get data from form
app.use(bodyParser.urlencoded({ extended: true }));
// use the public folder for static files.
app.use(express.static("public"));



// render ejs file when loading homepage
app.get("/", (req, res) => {
    res.render("index.ejs", {weatherData: null});
  });

// post request to get weather information from openweather map api and render it on ejs 
  app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = ' '; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.render('index.ejs', { weatherData });
        
    } catch (error) {
      console.error("Failed to make request:"); 
      res.render( "index.ejs", { weatherData: null });
    }
});


//Listen on predefined port and start the server.
app.listen(3000,()=>{
 console.log(`Server running on port ${port}`);
});