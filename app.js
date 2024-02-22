const express = require ('express');
conts = require ('axios');
const caminho = require('path');
const cors = require('cors');
const config = require('./config.json')
const apikey = config.apikey;

const app = express();
app.listen(3000)

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

const traducaoClima = {
    "Few cloud": "Poucas núvens",
    "Scattered clouds": "Núvens dispersas",

}

app.get('/climatempo/:cidade', async (req, res)=> {
    const city = req;params.cidade;

    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)

        if(response.status === 200){
            const clima = traucaoClima[response.data.weather[0].description] 
            || response.data.weather[0].description

            const weatherData = {
                Temperatura: response.data.main.temp,
                Unidade: response.data.main.umidity,
                VelocidadeDoVento: response.data.main.speed,
                Clima: clima
            };
            res.send(weatherData);
        } else{
            res.status(response.status).send({erro: 'Erro ao obter dados meteorológicos'})
        }
    } catch(error){
        res.status(500).send({erro: "Erro ao obter dados meteorológicos"})
    }
})