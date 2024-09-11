'use client'
import React, { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

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

const isBoardFull = (squares) => !squares.includes(null);

const getAvailableMoves = (squares) => {
    return squares.reduce((acc, val, idx) => {
        if (val === null) acc.push(idx);
        return acc;
    }, []);
};

const minimax = (squares, isMaximizing) => {
    // console.log(isBoardFull)
    const winner = calculateWinner(squares);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (isBoardFull(squares)) return { score: 0 };

    const moves = getAvailableMoves(squares);
    let bestMove = null;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let move of moves) {
            squares[move] = 'O';
            const { score } = minimax(squares, false);
            squares[move] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        for (let move of moves) {
            squares[move] = 'X';
            const { score } = minimax(squares, true);
            squares[move] = null;
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return { score: bestScore, move: bestMove };
    }
};

const TicTacToe = () => {
    const [squares, setSquares] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(squares);

    const handleClick = (i) => {
        const squaresCopy = squares.slice();
        if (squaresCopy[i] || winner) return;
        squaresCopy[i] = xIsNext ? 'X' : 'O';
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    };

    useEffect(() => {
        if (!xIsNext && !winner) {
            const { move } = minimax(squares, true);
            if (move !== null) {
                setTimeout(() => {
                    const squaresCopy = squares.slice();
                    squaresCopy[move] = 'O';
                    setSquares(squaresCopy);
                    setXIsNext(true);
                }, 500);
            }
        }
    }, [xIsNext, squares, winner]);

    const renderSquare = (i) => (
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => handleClick(i)}>
            {squares[i]}
        </button>
    );

    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <main className="flex min-h-screen flex-col  items-center  p-24">
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
                <style jsx>{`
        .board-row {
          display: flex;
        }
        .status {
          margin-bottom: 10px;
        }
      `}</style>
            </div>
        </main>
    );
};

export default TicTacToe;
