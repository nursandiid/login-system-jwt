import web from './applications/web.js'

const port = process.env.PORT || 3000

web.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})
