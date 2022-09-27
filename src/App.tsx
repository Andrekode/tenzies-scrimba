import './App.css';
import React, { useState, useEffect } from 'react';
import Die from './components/Die';
import Dice from './types/dice.type';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
    const [dice, setDice] = useState<Dice[]>(allNewDice());
    const [tenzies, setTenzies] = useState<boolean>(false);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstDie = dice[0].value;
        const allDieSameValue = dice.every((die) => firstDie === die.value);
        if (allHeld && allDieSameValue) {
            setTenzies(true);
        }
    }, [dice]);

    function generateNewDie(): Dice {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice(): Dice[] {
        const dice: Dice[] = [];
        for (let i = 0; i < 10; i++) {
            dice.push(generateNewDie());
        }
        return dice;
    }

    function holdDice(id: string) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            }),
        );
    }

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice());
            setTenzies(false);
        }
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.isHeld ? die : generateNewDie();
            }),
        );
    }

    const dices = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            id={die.id}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <div className='dice-container'>{dices}</div>
            <div className='button-container'>
                <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
            </div>
        </main>
    );
}

export default App;
