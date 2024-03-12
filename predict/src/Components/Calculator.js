import React, { useState } from 'react';

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(undefined);

  const clear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  };

  const deleteLast = () => {
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(currentOperand + number.toString());
  };

  const chooseOperation = (operation) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
      compute();
    }
    setOperation(operation);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(computation);
    setOperation(undefined);
    setPreviousOperand('');
  };

  const getDisplayNumber = (number) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  };

  const updateDisplay = () => {
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');

    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
      previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
      previousOperandTextElement.innerText = '';
    }
  };

  return (
    <>
      <div>
        <h2>Calculator</h2>
        <div>
          <button onClick={() => clear()}>AC</button>
          <button onClick={() => deleteLast()}>DEL</button>
          <button onClick={() => chooseOperation('/')}>÷</button>
          <button onClick={() => appendNumber(7)}>7</button>
          <button onClick={() => appendNumber(8)}>8</button>
          <button onClick={() => appendNumber(9)}>9</button>
          <button onClick={() => chooseOperation('*')}>x</button>
          <button onClick={() => appendNumber(4)}>4</button>
          <button onClick={() => appendNumber(5)}>5</button>
          <button onClick={() => appendNumber(6)}>6</button>
          <button onClick={() => chooseOperation('-')}>-</button>
          <button onClick={() => appendNumber(1)}>1</button>
          <button onClick={() => appendNumber(2)}>2</button>
          <button onClick={() => appendNumber(3)}>3</button>
          <button onClick={() => chooseOperation('+')}>+</button>
          <button onClick={() => appendNumber(0)}>0</button>
          <button onClick={() => appendNumber('.')}>.</button>
          <button onClick={() => compute()}>=</button>
        </div>
        <div>
          <span data-previous-operand></span>
          <span data-current-operand></span>
        </div>
      </div>
    </>
  );
};

export default Calculator;
