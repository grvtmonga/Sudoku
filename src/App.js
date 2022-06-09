import React, { Component } from 'react';
import './App.css';
import produce from 'immer';
import SudokuBoard from './components/SudokuBoard';
import CreateValidSudoku from './libs/sudoku';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: CreateValidSudoku()
    }));
  }

  handleChange = (e) => {
    this.setState(
      produce((state) => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
      })
    );
  };

  solveSudoku = () => {
    const board = this.state.sudoku.rows.map(({ cols }) => cols.map((col) => col.value));

    
    const isValid = (board, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
        if (board[i][col] === num) return false;
        if (
          board[3 * ((row / 3) | 0) + ((i / 3) | 0)][3 * ((col / 3) | 0) + (i % 3)] ===
          num
        )
          return false;
      }
      return true;
    };

    const dfs = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === null) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (dfs(board)) return true;
                board[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    dfs(board);

    this.setState(
      produce((state) => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            state.sudoku.rows[row].cols[col].value = board[row][col];
          }
        }
      })
    );
  }
   

    


  render() {
    return (
      <div className="App">
        <header className="App-header static space">
          <h1>Sudoku Game</h1>
        </header>
        <div ref={this.bgRef} className="main">
          <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
          <button  onClick={this.solveSudoku} className=" solve">
            solve
          </button>
        </div>
      </div>
    );
  }
}

export default App;
