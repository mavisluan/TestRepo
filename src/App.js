import React, { Component } from 'react';
import Board from './Board'
import calculateWinner from './helper'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      coordinates: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
      xIsNext: true,
      stepNumber: 0,
      location: []
    }
  }

  goTo(step) {
    const history = this.state.history.slice(0, step + 1)
    const location = this.state.location.slice(0, step)
    this.setState({
      history: history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
      location: location
    })
  }

  handleClick(i) {
    const history = this.state.history.slice()
    const current = history[this.state.stepNumber]
    const squares = current.squares.slice()
    const [r, c] = this.state.coordinates.slice(i)[0]

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = (this.state.xIsNext) ? 'X' : 'O'
    this.setState({
      history: history.concat({ squares: squares }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      location: this.state.location.concat([`row: ${r} column: ${c}`])
    })
  }

  render() {
    const history = this.state.history
    const squares = history[this.state.stepNumber].squares
    const nextPlayer = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
    const winner = calculateWinner(squares)
    const status = winner ? `Winner: ${winner}` : nextPlayer

    const moves = history.map((move, step) => {
      const navi = step ? `Go to move# ${step}` : `Go to game start`
      const location = (navi !== `Go to game start`) ? this.state.location.slice(0, step) : ''
      const className = (step === this.state.stepNumber) ? 'moves' : null
      return (
        <li key={step}>
          <button
            className={className}
            onClick={() => this.goTo(step)}
          >
            {navi}
          </button>
          {location[location.length - 1]}
        </li>
      )
    })

    return (
      <div className='board'>
        <div className='game-board'>
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='board-info'>
          <h3>{status}</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}


export default App;
