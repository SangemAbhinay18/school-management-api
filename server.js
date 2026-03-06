import express from "express"
import cors from "cors"

import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"

const app = express()
app.use(express.json())
app.use(cors())

const adapter = new JSONFile("db.json")
const db = new Low(adapter, { schools: [] })

await db.read()
await db.write()

function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371

  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the School Locator API" })
});

app.post("/addSchool", async (req, res) => {

  const { name, address, latitude, longitude } = req.body

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ message: "All fields required" })
  }

  const school = {
    id: Date.now(),
    name,
    address,
    latitude,
    longitude
  }

  db.data.schools.push(school)

  await db.write()

  res.json({
    message: "School added successfully",
    school
  })
})

app.get("/listSchools", async (req, res) => {

  const { latitude, longitude } = req.query

  if (!latitude || !longitude) {
    return res.status(400).json({
      message: "latitude and longitude required"
    })
  }

  const lat = parseFloat(latitude)
  const lon = parseFloat(longitude)

  const schools = db.data.schools.map(s => ({
    ...s,
    distance: calculateDistance(lat, lon, s.latitude, s.longitude)
  }))

  schools.sort((a, b) => a.distance - b.distance)

  res.json(schools)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})