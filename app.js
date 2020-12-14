var matrix = []
var sudokuDB = []

var sudokuApp = new Vue({

    el: '#app-sudoku',

    data: {

        sudokuMatrix: [],
        initializeGameText: "Get Sudoku",
        evaluateGameText: "Verify!",
        answerImage: "",
        isGameStarted: false,
        showAnswer: false
    },

    methods: {

        sendProgress(row, col, val) {
            // console.log(row, col, val);
            tmpSendMyProgress()
        },

        joinGame() {
            this.sudokuMatrix = matrix
            console.log(matrix);
            this.isGameStarted = true;
        },

        prepareGame() {
            var mySudokuMatrix = []
            // this.sudokuMatrix = defaultSudokuMatrix;
            sudoku_array = db_sudoku[0].Sud_game_ex
            // console.log(sudoku_array);
            var row = []
            for (var i = 0; i < sudoku_array.length + 1; i++) {

                if (i % 9 == 0 && i != 0) {
                    mySudokuMatrix.push(row)
                    row = []
                }
                row.push({num: sudoku_array[i]})
            }

            for (var i = 0; i < mySudokuMatrix.length; ++i) {
                for (var j = 0; j < mySudokuMatrix[0].length; j++) {
                    if (mySudokuMatrix[i][j].num == 0) {
                        mySudokuMatrix[i][j].num = ""
                    }
                }
            }
            matrix = mySudokuMatrix
            // console.log(matrix);
            // console.log(mySudokuMatrix);
            this.sudokuMatrix = mySudokuMatrix
            this.initializeGameText = "Ready!";
            this.isGameStarted = true;
        },

        initializeMyGame() {

            var defaultSudokuMatrix = [
                [{ num: 5 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 1 }, { num: 2 }],
                [{ num: 6 }, { num: 7 }, { num: 2 }, { num: 1 }, { num: 9 }, { num: 5 }, { num: 3 }, { num: 4 }, { num: 8 }],
                [{ num: 1 }, { num: 9 }, { num: 8 }, { num: 3 }, { num: 4 }, { num: 2 }, { num: 5 }, { num: 6 }, { num: 7 }],
                [{ num: 8 }, { num: 5 }, { num: 9 }, { num: 7 }, { num: 6 }, { num: 1 }, { num: 4 }, { num: 2 }, { num: 3 }],
                [{ num: 4 }, { num: 2 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 9 }, { num: 1 }],
                [{ num: 7 }, { num: 1 }, { num: 3 }, { num: 9 }, { num: 2 }, { num: 4 }, { num: 8 }, { num: 5 }, { num: 6 }],
                [{ num: 9 }, { num: 6 }, { num: 1 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 2 }, { num: 8 }, { num: 4 }],
                [{ num: 2 }, { num: 8 }, { num: 7 }, { num: 4 }, { num: 1 }, { num: 9 }, { num: 6 }, { num: 3 }, { num: 5 }],
                [{ num: 3 }, { num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 9 }]
            ];

            askForSudoku()

            setTimeout(function() {
                  if (db_sudoku != "") {
                      // console.log(db_sudoku);
                      // sudokuDB = db_sudoku
                      sudokuApp.prepareGame()
                  }
                  else {
                      console.log("Error");
                  }


            }, 2500);
        },



        initializeGame() {

            var defaultSudokuMatrix = [
                [{ num: 5 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 1 }, { num: 2 }],
                [{ num: 6 }, { num: 7 }, { num: 2 }, { num: 1 }, { num: 9 }, { num: 5 }, { num: 3 }, { num: 4 }, { num: 8 }],
                [{ num: 1 }, { num: 9 }, { num: 8 }, { num: 3 }, { num: 4 }, { num: 2 }, { num: 5 }, { num: 6 }, { num: 7 }],
                [{ num: 8 }, { num: 5 }, { num: 9 }, { num: 7 }, { num: 6 }, { num: 1 }, { num: 4 }, { num: 2 }, { num: 3 }],
                [{ num: 4 }, { num: 2 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 9 }, { num: 1 }],
                [{ num: 7 }, { num: 1 }, { num: 3 }, { num: 9 }, { num: 2 }, { num: 4 }, { num: 8 }, { num: 5 }, { num: 6 }],
                [{ num: 9 }, { num: 6 }, { num: 1 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 2 }, { num: 8 }, { num: 4 }],
                [{ num: 2 }, { num: 8 }, { num: 7 }, { num: 4 }, { num: 1 }, { num: 9 }, { num: 6 }, { num: 3 }, { num: 5 }],
                [{ num: 3 }, { num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 9 }]
            ];

            // Empty two random cells per row
            // for (var i = 0; i < defaultSudokuMatrix.length; ++i) {
            //     for (var k = 0; k < 2; ++k) {
            //         var randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
            //         defaultSudokuMatrix[i][randomColumnIndex].num = "";
            //     }
            // }

            this.sudokuMatrix = defaultSudokuMatrix;
            this.initializeGameText = "Restart";
            this.isGameStarted = true;
        },

        evaluateGame() {

            var copyOfSudokuMatrix = [];
            for (var i = 0; i < this.sudokuMatrix.length; ++i) {

                if (!copyOfSudokuMatrix[i])
                    copyOfSudokuMatrix[i] = [];

                for (var k = 0; k < this.sudokuMatrix[i].length; ++k) {
                    copyOfSudokuMatrix[i][k] = this.sudokuMatrix[i][k].num;
                }

            }

            // console.log(copyOfSudokuMatrix);

            var sudokuSolver = Sudoku.init(copyOfSudokuMatrix);

            if (sudokuSolver.isValid()) {

                this.answerImage = "success.gif";
                this.showAnswer = true;
                this.isGameStarted = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000);

            }
            else {

                this.answerImage = "fail.gif";
                this.showAnswer = true;
                this.isGameStarted = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000);

            }

        }

    }
});
