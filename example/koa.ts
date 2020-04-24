import Session from '../index'
import Koa from 'koa'

const app = new Koa()
const session = new Session()

function random () {
  return Math.random().toString().slice(1, 9)
}

app.use(session.middleware())

app.use(async (ctx, next) => {
  session.set('userId', random())
  await next()
})

app.use((ctx) => {
  const userId = session.get('userId')
  ctx.body = userId
})

app.listen(8080, () => {
  console.log('Listen 8080')
})

setInterval(() => {
  console.log('size', session.size)
}, 3000)