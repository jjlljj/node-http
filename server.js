const http = require('http')
const url = require('url')

const server = http.createServer()
let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
]

server.listen(3000, () => {
  console.log('server listing at port 3000')
})

server.on('request', (request, response) => {
  if ( request.method === 'GET' ) {
    getAllMessages(response)
  }

  else if ( request.method === 'POST' ) {
    let newMessage = { 'id': new Date() }
    request.on('data', data => {
      newMessage = Object.assign( newMessage, JSON.parse(data))
    })

    request.on('end', () => {
      addMessage(newMessage, response)
    })
  }
})

function getAllMessages(response) {
  response.writeHead(200, {'Content-Type':'text/json'})
  response.write(JSON.stringify(messages))
  response.end()
}

function addMessage(newMessage, response) {
  messages = [...messages, newMessage ]
  response.writeHead(201, {'Content-type': 'text/plain'})
  response.write('message successfully added')
  response.end()
}
