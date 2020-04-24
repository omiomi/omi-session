import Session from '../index'
import express from 'express'

const app = express()
const session = new Session()

function random () {
  return Math.random().toString().slice(1, 9)
}

app.use(session.expressMiddleware())

app.use((req, res, next) => {
  session.set('userId', random())
  next()
})

app.use((req, res, next) => {
  const userId = session.get('userId')
  res.send(userId)
})

app.listen(8080, () => {
  console.log('Listen 8080')
})

setInterval(() => {
  console.log('size', session.size)
}, 3000)