const ip = process.env.VUE_APP_WSS_IP;
var socket = {}
var frontview = {}
async function prepareSocket() {
    socket.onmessage = function(message) {
        console.log("message received2")
        var data = JSON.parse(message.data)
        switch(data.type) {
            case "update":
                update(data)
                break
            default:
                console.log(data)
                break
        }
    }
    socket.onclose = (code) => {
        console.log(code)
        frontview.connected = false
    }
    socket.onopen = () => {
        frontview.start()
        console.log('opened socket')
    }
}

module.exports.send = (type,data) => {
    if(socket.readyState == WebSocket.OPEN) {
        console.log('sending message!')
        socket.send(JSON.stringify({type:type,data:data}))
    } else {
        console.log('socket not open')
    }
}
module.exports.link = async (object) => {
    frontview = object
    socket =  new WebSocket(ip,['access_token', localStorage.getItem('token')])
    await prepareSocket()
}
module.exports.disconnect = () => {
    socket.close()
}
function update(data) {
    console.log('updating')
    frontview.character[data.key] = data.value
}
