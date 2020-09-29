const ip = process.env.VUE_APP_WSS_IP;
var socket = {}
var frontview = {}
async function prepareSocket() {
    socket.onmessage = function(message) {
        var data = JSON.parse(message.data)
        switch(data.type) {
            case "update":
                update(data.data)
                break
            case "remove":
                remove(data.data)
                break
            default:
                console.log(data)
                break
        }
    }
    socket.onclose = () => {
        frontview.connected = false
    }
    socket.onopen = () => {
        frontview.start()
    }
}

module.exports.send = async (type,data) => {
    if(socket.readyState == WebSocket.OPEN) {
        await socket.send(JSON.stringify({type:type,data:data}))
        return true
    } else {
        frontview.connected = false
        return false
    }
}
module.exports.link = async (object) => {
    frontview = object
    try{
        socket =  new WebSocket(ip,['access_token', localStorage.getItem('token')])
        await prepareSocket()
    } catch(err) {
        console.log('hm')
    }
}
module.exports.disconnect = () => {
    socket.close()
}
function update(data) {
    frontview.updateCharacter(data)
}
function remove(data) {
    frontview.removeCharacter(data)
}
