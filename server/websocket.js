const websocket = require('ws')
const jwt = require("jsonwebtoken")
const Character = require('./model/character')
const User = require('./model/user')
const dotenv = require('dotenv')
const Message = require('../shared/classes/data/Message')
const { update } = require('./model/user')
dotenv.config()
var wss = {}
var connections = new Map()
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
                switch(msg.type) {
                    case "character":
                        con.character = await Character.findById(msg.data)
                        addConnection(msg.data,con)
                        break;
                    case "update":
                        let character = await Character.findById(con.character)
                        for(var i = 0; i < msg.data.keys.length; i++) {
                            character[msg.data.keys[i]] = msg.data.values[i]
                        }
                        updateConnections(''+con.character._id+'',message,con)
                        character.save()
                        break;
                    default: 
                        console.log("message type not recognized")
                        break;
                }
            } catch(err) {
                console.log(err)
            }
        })

        con.on('close',async function closing(code) {
            console.log("close!")
            console.log('saving character')
            removeConnection(con.character._id,con)
             try{
                 await con.character.save()
             } catch(err) {
                console.log('error saving character')
             }
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

function addConnection(id,con) {
    console.log(typeof id)
    var conn = connections.get(id)
    if(typeof conn != 'undefined') {
        conn.push(con)
    }else {
        connections.set(id,new Array())
        connections.get(id).push(con)
    } 
}
function updateConnections(id,msg,con) {
    var cons = connections.get(id)
    for(let i = 0; i < cons.length; i++) {
        cons[i].send(msg)
    }
}
function removeConnection(id,con) {
    id = '' + id
    var conn = connections.get(id)
    if(typeof conn != 'undefined') {
        var index = conn.indexOf(con)
        if(index >= 0) {
            conn.splice(index,1)
            console.log('removing connection')
        }
        if(conn.length == 0) {
            console.log('clearing log')
            connections.delete(id)
        }
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
    try{
        const decoded = await jwt.verify(token,process.env.SECRET)
        const secondsSinceEpoch = Math.round(Date.now() / 1000)  
        if(secondsSinceEpoch - decoded.iat >= process.env.TOKEN_TIMEOUT) {
            await User.removeToken(decoded.email, req.headers.token)
            return false;
        }
        return true
    } catch(err) {
        return false
    }

}