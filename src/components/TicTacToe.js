'use client';
import React, { useState, useEffect } from 'react';
import StatusModal from '../modal/modalStatus'

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
    const [winner, setWinner] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [playerConsecutiveWins, setPlayerConsecutiveWins] = useState(0);
    const [aiConsecutiveWins, setAiConsecutiveWins] = useState(0);
    const [popupMessage, setPopupMessage] = useState(null);

    useEffect(() => {
        const newWinner = calculateWinner(squares);
        if (newWinner || isBoardFull(squares)) {
            setWinner(newWinner);
            if (newWinner === 'X') {
                setPlayerScore((prevScore) => prevScore + 1);
                setPlayerConsecutiveWins((prevCount) => prevCount + 1);
                setAiConsecutiveWins(0); // Reset AI consecutive wins
                // Check for special bonus
                if (playerConsecutiveWins === 2) { // Previous count was 2, now 3
                    setPlayerScore((prevScore) => prevScore + 1);
                    setPopupMessage('Special Bonus! Player wins three times in a row!');
                    setPlayerConsecutiveWins(0); // Reset count after awarding bonus
                    setTimeout(() => setPopupMessage(null), 3000); // Hide popup after 3 seconds
                }
            } else if (newWinner === 'O') {
                setAiScore((prevScore) => prevScore + 1);
                setAiConsecutiveWins((prevCount) => prevCount + 1);
                setPlayerConsecutiveWins(0); // Reset player consecutive wins
                // Check for special bonus
                if (aiConsecutiveWins === 2) { // Previous count was 2, now 3
                    setAiScore((prevScore) => prevScore + 1);
                    setPopupMessage('Special Bonus! AI wins three times in a row!');
                    setAiConsecutiveWins(0); // Reset count after awarding bonus
                    setTimeout(() => setPopupMessage(null), 3000); // Hide popup after 3 seconds
                }
            } else if (isBoardFull(squares)){
                setAiConsecutiveWins(0);
                setPlayerConsecutiveWins(0);
            }
        }
    }, [squares]);


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

    const handleClick = (i) => {
        if (squares[i] || winner) return;
        const squaresCopy = squares.slice();
        squaresCopy[i] = xIsNext ? 'X' : 'O';
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    };

    const handleRestart = () => {
        setSquares(initialBoard);
        setWinner(null);
        setXIsNext(true);
    };

    const renderSquare = (i) => (
        <button className="w-16 h-16 text-4xl font-bold border border-gray-500" onClick={() => handleClick(i)}>
            {squares[i]}
        </button>
    );

    const status = winner ? `Winner: ${winner}` : isBoardFull(squares) ? 'Draw' : `${xIsNext ? 'You Turn' : 'AI Turn'}`

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div>
                <div className='flex justify-center items-center mb-4'>
                    <div className='flex flex-col items-center font-extrabold text-2xl mr-[20px]'>
                        <div>You</div>
                        <div>{playerScore}</div>
                    </div>
                    <div className='flex flex-col items-center ml-2 font-extrabold text-2xl'>
                        <div>AI</div>
                        <div>{aiScore}</div>
                    </div>
                </div>
                <div className='mb-2.5'>{status}</div>
                <div className="grid grid-cols-3 gap-3 text-black select-none">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
                {(winner || isBoardFull(squares)) && (
                    document.getElementById('my_modal_1').showModal()
                )}
                {popupMessage && (
                    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-yellow-500 text-white p-4 rounded shadow-lg z-50">
                        {popupMessage}
                    </div>
                )}
            </div>
            <StatusModal winner={status} handleRestart={handleRestart} />
        </main>
    );
};

export default TicTacToe;