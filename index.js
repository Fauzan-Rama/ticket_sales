/**Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process */
/** load library express */
const express = require(`express`)
const auth = require(`./routes/auth.route`)

/** create object that instances of express */
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** define port of server */
const PORT = 8000

/** load library cors */
const cors = require(`cors`)

/** open CORS policy */
app.use(cors())

/** define all routes */
const userRoute = require(`./routes/user.route`)
const seatRoute = require(`./routes/seat.routes`)
const eventRoute = require(`./routes/event.routes`)
const ticketRoute = require(`./routes/ticket.route`)
const diskonRoute = require('./routes/diskon.routes')
const ongkirRoute = require('./routes/ongkirRoute') // 1. Load route ongkir


/** define prefix for each route */
app.use(`/auth`, auth)
app.use(`/user`, userRoute)
app.use("/diskon", diskonRoute)
app.use(`/event`, eventRoute)
app.use(`/ticket`, ticketRoute)
app.use('/ongkir', ongkirRoute) // 2. Tambahkan prefix /ongkir di sini

/** route to access uploaded file */
app.use(express.static(__dirname))

// Set prefix endpoint untuk seat
app.use(`/seat`, seatRoute)

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales runs on port ${PORT}`)
})