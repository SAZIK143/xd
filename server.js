var WebSocketServer = require('websocket').server;
var http = require('http');

var data = 0;
var clients = [];
var loggedIN = [];
var users_progress = [];
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(2137, function() {
    console.log("llama");
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)

  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;

  console.log((new Date()) + ' Connection accepted.');
  // data = data + 1;
  //
  // var json = JSON.stringify({ type:'message', data: data });
  // for (var i=0; i < clients.length; i++) {
  //   clients[i].sendUTF(json);
  // }
  var userID = -1
  var user2dArray = []

  // user sent some message
  connection.on('message', function(message) {
        userID = userID + 1
        message_str = message.utf8Data
        if (message_str == "get") {
            db_get_sudoku(function(err, data) {
                if (!err) {
                    var json = JSON.stringify({ type:'sudoku', data: data});
                    var jsonREADY = JSON.stringify({ type:'readyUp', data: data});
                    // clients[index].sendUTF(json)
                    loggedIN[index].sendUTF(json)
                    for (var i = 0; i < loggedIN.length; i++) {
                        if (i == index) {
                            continue
                        }
                        loggedIN[i].sendUTF(jsonREADY)
                    }

                } else {
                    console.log(err);
                }
            })
        } else if (message_str == "prog") {
            users_progress[index].prog = users_progress[index].prog + 2
            var tmpProg = String(users_progress[index].prog)
            var log = String(loggedIN[index])
            var dataStr = log + ": " + tmpProg
            var jsonProg = JSON.stringify({ type:'sbProg', data: dataStr});
            for (var i = 0; i < loggedIN.length; i++) {
                if (i == index) {
                    continue
                }
                loggedIN[i].sendUTF(jsonProg)
            }
        } else {
            var login = null
            if (message_str.split(" ").length == 2) {
                player_email = null
                player_nick = message_str.split(" ")[0]
                player_password = message_str.split(" ")[1]
                console.log("Nick: " + player_nick);
                console.log("Password: " + player_password);
                login = true
                loggedIN.push(connection)
                users_progress.push({usr: connection, prog: 0})

            } else if (message_str.split(" ").length == 3) {
                player_email = message_str.split(" ")[0]
                player_nick = message_str.split(" ")[1]
                player_password = message_str.split(" ")[2]
                console.log("Nick: " + player_nick);
                console.log("Password: " + player_password);
                login = false
                loggedIN.push(player_nick)
            }

            db_con_query(player_email, player_nick, player_password, login, function(err, data){
                if (!err) {
                        if (data.length == 0) {
                            var json = JSON.stringify({ type:'denied', data: "User with this nick and password does not exist"});
                            clients[index].sendUTF(json)
                        } else {
                            var json = JSON.stringify({ type:'accepted', data: "ok"});
                            clients[index].sendUTF(json)
                        }
                        console.log(data);
                } else {
                    console.log(err);
                }
            })
        }




        // var names = []

        // for (var i = 0; i < loggedIN.length; i++) {
        //     names.push(loggedIN[i][0])
        // }

        // broadcast logged in usernames to all connected clients
        // var json = JSON.stringify({ type:'message', data: loggedIN });
        // for (var i=0; i < clients.length; i++) {
        //   clients[i].sendUTF(json);
        // }


  });



  connection.on('close', function(connection) {
    // close user connection
    console.log("do widzenia " + connection);
    // remove user from the list of connected clients
    clients.splice(index, 1);
    loggedIN.splice(index, 1)

  });
});

function db_get_sudoku(cbac) {
    var mysql = require('mysql');

    //wazne zeby zmienic dane do logowania!!!
    var pool  = mysql.createPool({
        host     : 'ip bazy',
        port : 'na lokalu chyba domyslnie 3306 ??',
        user     : 'user',
        password : 'password',
        database : 'mydb'
    });

    pool.getConnection(function(err, connection){
        if(err){
            return cb(err);
        }
        connection.query("SELECT `Sud_game_ex` FROM `Sud_game_exp` WHERE `idSud_game_exp`=1", function(err, data){
                connection.release();
                cbac(err, data);
        });
    })

}

function db_con_query(email, nick, pass, login, cb) {

    var mysql = require('mysql');
    //wazne zeby zmienic dane do logowania!!!
    var pool  = mysql.createPool({
        host     : 'ip bazy',
        port : 'na lokalu chyba domyslnie 3306 ??',
        user     : 'user',
        password : 'password',
        database : 'mydb'
    });

    pool.getConnection(function(err, connection){
        if(err){
            return cb(err);
        }
        if (login) {
            connection.query("SELECT * from `pleyars` where binary `Player_nick`='" + nick + "' and binary `password`='" + pass + "'", function(err, data){
                connection.release();
                cb(err, data);
            });
        }  else {
            cb("Error")
        }

    });


}
