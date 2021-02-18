import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
/* just for notes: particularly how properties are passed.
class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
          {/*this is how parameters are passed to components.
          every component has a property called props through which things are passed.
          Notice that Board class passes in value.
          }
          {this.props.value}
        </button>
      );
    }
  }
  */

  /*
  example of function component. Components that don't have their own state.
  */
  function Square(props) {
      return (
        //button sets up event listener that handles clicks with onClick function passed from board.
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
      )
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      /*value property being passed to Square component. Look above for better description.*/
      /* onclick is a function that is passed to Square component. This function is called in the Square component
      but updates the state of the board.*/
      return <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
              />;
    }
    /* this function is called when a square is clicked. */
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
          /* sets initial value of history. Can be passed properties.
    super(props) calls parent class constructor. */
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      }
    };
    
    render() {
      
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);

      //provides functionality to go to previous moves
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      })

      //update status depending on whose turn is next or the winner.
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }

    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1]
      const squares = current.squares.slice();
      //if there is a winner or the square is already clicked, don't update state
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        //if just placed an x, then x is not next. ect.
        xIsNext:!this.state.xIsNext
        });
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  //helper function for determining if there is winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  