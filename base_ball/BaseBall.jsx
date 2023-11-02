import React, { useState, useRef } from 'react';
import Try from './Try';

const getNumbers = () => {
  return ['0','1','2','3','4','5','6','7','8','9'].sort(() => Math.random() - 0.5).splice(0, 4).join('');
}

const BaseBall = () => {
  const [result, setResult] = useState('');
  const [solution, setSolution] = useState(getNumbers); // lazy init
  const [input, setInput] = useState('');
  const [tries, setTries] = useState([]);

  const inputRef = useRef(null);
  
  const onChangeInput = (e) => {
    setInput(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    // add tries
    let tmp = {
      key: input
    };
    
    let s = 0, b = 0;
    for(let i = 0;i < 4;i++) {
      if(solution[i] === input[i]) {
        s++;
      } else if(solution.indexOf(input[i]) !== -1) {
        b++;
      }
    }
    
    setTries((prevTries) => [...prevTries, {...tmp, strike: s, ball:b}]);

    if(s === 4) {
      setResult('정답! ' + input);
      alert('정답! 게임을 다시 시작합니다');
      setSolution(getNumbers());
      setTries([]);
    } else {
      if(tries.length >= 9) {
        setResult(`10번 실패! 정답은 ${solution.split('').join(',')}`)
        // restart
        alert('게임을 다시 시작합니다');
        setSolution(getNumbers());
        setTries([]);
      } else if(s === 0 && b === 0) {
        setResult('out!')
      } else {
        setResult(`${s} strike, ${b} ball!`);
      }
    }

    // input init
    setInput('');
    inputRef.current.focus();
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength="4" ref={inputRef} value={input} onChange={onChangeInput} />
      </form>
      <div>시도:{tries.length}</div>
      <ul>
        {tries.map((element, i) => <Try key={element.key + i} tryInfo={element}/>)}
      </ul>
    </>
  );
};

export default BaseBall;