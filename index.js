import express from "express"
import bodyParser from "body-parser";
import axios from "axios"
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));


const port =3000
const app= express()
const api_URL ="http://api.weatherapi.com/v1"
const api_key = "9cd97607bdb541388ab133855231809"
let location = ""
let type = "forecast.json"
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  
  res.render("index.ejs")

})

app.post("/", async (req, res) => {
location = req.body.q
// const bgLocation = document.body.style.backgroundImage =
// "url('https://source.unsplash.com/1600x900/?" + location + "')";

    try {
      const result = await axios.get(api_URL + `/${type}?key=${api_key}&q=${location}`) 
      // const result = await axios.get(api_URL + `/current.json?key=${api_key}&q=hyderabad`) 
       const contentData = result.data
       const contentDataCurrent = contentData.current
       const contentDataForecast = contentData.forecast
      
      res.render("index.ejs", { 
        content :  result.data,
        name : contentData.location.name,
        country : contentData.location.country,
        local_time:contentData.location.localtime,
        
        condition : contentDataCurrent.condition.text,
        icon : contentDataCurrent.condition.icon,
        wind_kph : contentDataCurrent.wind_kph,
        wind_dir : contentDataCurrent.wind_dir,
        precipitation : contentDataCurrent.precip_mm,
        humidity:contentDataCurrent.humidity,
        clouds : contentDataCurrent.cloud,
        uv : contentDataCurrent.uv,
        day_rain : contentDataForecast.forecastday[0].day.daily_chance_of_rain,

        temp_celsius : contentDataCurrent.temp_c,
        feel_celsius : contentDataCurrent.feelslike_c,
        max_temp_c : contentDataForecast.forecastday[0].day.maxtemp_c,
        min_temp_c : contentDataForecast.forecastday[0].day.mintemp_c,
        avg_temp_c : contentDataForecast.forecastday[0].day.avgtemp_c,

        sunrise : contentDataForecast.forecastday[0].astro.sunrise,
        sunset : contentDataForecast.forecastday[0].astro.sunset,
        moonrise:contentDataForecast.forecastday[0].astro.moonrise,
        moonset:contentDataForecast.forecastday[0].astro.moonset,

       });
      // console.log(JSON.stringify(result.data))
    } catch (error) {
      res.render("index.ejs");
      // , { content: JSON.stringify(error.response.data) }
      // res.status(404).send(error.message);
    }
    // res.redirect("/")
  });

  
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})
