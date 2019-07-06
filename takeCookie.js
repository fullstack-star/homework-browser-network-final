const http = require('http')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    response.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:8888',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Max-Age': '1000',
        'Access-Control-Allow-Credentials': "true"
    })
    response.end('123456')
}).listen(8887)

console.log('serve listening on 8887')