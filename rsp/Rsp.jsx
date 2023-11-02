import React, { useState, useRef, useEffect } from 'react';
import useInterval  from './useInterval';

const victories = {
  'rock': 'scissors',
  'scissors': 'paper',
  'paper': 'rock'
};

const changeInterval = 100;

const Rsp = () => {
  const [status, setStatus] = useState('rock');
  const [result, setResult] = useState('');
 
  const [isRunning, setIsRunning] = useState(true);

  // 이미지 바꾸기
  const changeImage = () => {
    if(status === 'rock') {
      setStatus('scissors');
    } else if(status === 'paper') {
      setStatus('rock');
    } else {
      setStatus('paper');
    }
  };

  // 가위바위보 버튼 눌렀을 때
  const onClickBtn = (choice) => (e) => {
    // interval stop
    setIsRunning(false);

    console.log(`나 : ${choice}, com : ${status}`);
    if(choice === status) {
      setResult('비겼다');
    } else if(victories[choice] === status) {
      setResult('이겼다!');
    } else {
      setResult('졌다..');
    }

    // 2초 후에 다시 실행
    setTimeout(() => {
      // 다시 실행
      setIsRunning(true);
    }, 2000);
  };
  
  const getResult = () => {
    return (
        result === '' ? null : <div>{result}</div>
    );
  }

  // custom interval hook 실행
  useInterval(changeImage, isRunning ? changeInterval : null);

  return (
    <>
      <div id="computer" className={status}></div>
      <div className="btns">
        <button onClick={onClickBtn('scissors')}>가위</button> 
        <button onClick={onClickBtn('rock')}>바위</button>
        <button onClick={onClickBtn('paper')}>보</button>
      </div>
      {getResult()}
    </>
  );
}

export default Rsp;