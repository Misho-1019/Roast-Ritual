import express from 'express'

const app = express()
const PORT = process.env.PORT || 4000

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Roast & Ritual API' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
