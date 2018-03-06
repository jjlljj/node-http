const http = require('http')
const url = require('url')

const server = http.createServer()

server.listen(3000, () => {
  console.log('server listing at port 3000')
})

server.on('request', (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain' })
  response.write('hello world')
  response.end()
})
