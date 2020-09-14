const websocket = require('ws')
const jwt = require("jsonwebtoken")
const Character = require('./model/character')
const User = require('./model/user')
const dotenv = require('dotenv')
const { request } = require('express')
const Message = require('../shared/classes/data/Message')
dotenv.config()
var websockets = {}
var wss = {}
console.log(process.env.CLIENT_IP)
module.exports.createSocket = () => {
    console.log()
    wss = new websocket.Server({noServer:true})
    wss.on('connection',function(ws,request) {
        console.log("connection!")
        let con = ws
        con.character = {}
        con.on('message',async function incoming(message){
            try{
                var msg = Message.from(JSON.parse(message))
                console.log(msg)
                switch(msg.type) {
                    case "character":
                        con.character = await Character.findById(msg.data)
                        break;
                    case "update":
                        for(var i = 0; i < msg.data.keys.length; i++) {
                            con.character[msg.data.keys[i]] = msg.data.values[i]
                        }
                        con.character.save()
                        break;
                    default: 
                        console.log("message type not recognized")
                        break;
                }
            } catch(err) {
                console.log(err)
            }
        })

        con.on('close',function closing(code) {
            console.log("close!")
            con.character.save()
        })
    })
}
module.exports.handleUpgrade = async (request, socket, head) => {
    if(typeof wss == 'undefined') {
        throw new Error('create a Websocket Server first!')
    }
    if(request.headers.origin != process.env.CLIENT_IP) {
        console.log("ERROR UPGRADING ORIGIN")
        console.log(request.headers.origin + ',' + process.env.CLIENT_IP)
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
    }
    if(await authenticate(request)) {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection',ws,request)
        })

    } else {
        console.log("ERROR UPGRADING")
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
    }
}


async function authenticate(request) {
    const protocol = request.headers['sec-websocket-protocol'].split(', ')
    if(protocol[0] !='access_token') {
        return false
    }
    
    const token = protocol[1]
    if(!token) {
        return false
    }
    const decoded = await jwt.verify(token,process.env.SECRET)
    const secondsSinceEpoch = Math.round(Date.now() / 1000)  
    if(secondsSinceEpoch - decoded.iat >= process.env.TOKEN_TIMEOUT) {
        await User.removeToken(decoded.email, req.headers.token)
        return false;
    }
    return true

}