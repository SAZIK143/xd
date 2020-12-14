var connection = null
var db_sudoku = ""

function askForSudoku() {
    connection.send("get")
}

function joinSudokuRequest() {
    connection.send("join")
}

// function sendProgress(num) {
//     console.log(num);
// }

function tmpSendMyProgress() {
    connection.send("prog")
}

function signIN() {
    var name = document.getElementById("nick").value;
    var pass = document.getElementById("pass").value;
    connection.send(name + " " + pass)
}

function signUp() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("nick").value;
    var pass = document.getElementById("pass").value;
    connection.send(email + " " + name + " " + pass)
}

$(function () {
    // var status = document.getElementById("status");
    // open connection
    connection = new WebSocket('ws://127.0.0.1:2137');

    connection.onopen = function () {
        // first we want users to enter their names


    };

    connection.onerror = function (error) {
        // just in there were some problems with connection...
        content.html($('<p>', {
          text: 'Sorry, but there\'s some problem with your '
             + 'connection or the server is down.'
        }));
    };
    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server
        // always returns JSON this should work without any problem but
        // we should make sure that the massage is not chunked or
        // otherwise damaged.
        try {
          var json = JSON.parse(message.data);
        } catch (e) {
          console.log('Invalid JSON: ', message.data);
          return;
        }
        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        // first response from the server with user's color
        if (json.type === 'message') { // it's a single message
          // let the user write another message
          document.getElementById("status").innerHTML = json.data;
      } else if (json.type === 'denied') {
          document.getElementById("status").innerHTML = json.data;
      } else if (json.type === 'accepted') {
          document.getElementById("status").innerHTML = json.data;
          document.getElementById("LoginRegisterScreen").style.display = "none"
          document.getElementById("Game").style.display = "block"
      } else if (json.type === 'sudoku') {
          // console.log(json.data);
          // document.getElementById("getSudokuBtn").style.display = "none"
          // document.getElementById("sudokuGrid").style.display = "block"
          db_sudoku = json.data
      } else if (json.type === 'readyUp') {
          document.getElementById("getSudokuBtn").style.display = "none"
          document.getElementById("readyUpBtn").style.display = "block"
          db_sudoku = json.data
      }
      else if (json.type === 'sbProg') {
          console.log(json.data);
      }
      else {
          console.log('Hmm..., I\'ve never seen JSON like this:', json);
        }
    };
});
