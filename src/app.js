const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine, views and partials location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Davide"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Davide"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        helpMessage: "I hope this can help you.",
        name: "Davide"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send(({
            error: "You must provide an address"
        }))
    }
    const { address } = req.query
    geocode(address, (error, { longitude: long, latitude: lat, location } = {}) => {
        if (error) {
            return res.send(({
                error: "There was an error contacting geolocation service.",
                description: error
            }))
        }
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send(({
                    error: "There was an error contacting weather service.",
                    description: error
                }))
            }
            return res.send({
                address,
                location,
                forecast: forecastData
            })
        })
    })


})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send(({
            error: "You must provide a search term"
        }))
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error_404_page", {
        title: "Error page",
        name: "Davide",
        errorMessage: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("error_404_page", {
        title: "Error page",
        name: "Davide",
        errorMessage: "Page not found."
    })
})

const port = 3000
app.listen(port, () => {
    console.log("Server is up on port " + port)
})