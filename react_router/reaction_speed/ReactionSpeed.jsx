import React, { useState, useRef } from 'react';

const ReactionSpeed = () => {
  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);

  // 렌더링에 영향을 주지 않아야 하지만 값이 변하는 것들은 useRef를 사용한다.
  const timeOutId = useRef(null);
  const start = useRef(null);

  const onClickScreen = (e) => {
    if(status === 'waiting') {
      // ready 상태로 변경함
      setStatus('ready');
      setMessage('빨간색으로 바뀌면 클릭하세요');
      // 0.5~4.5초 사이에 now 상태로 변경함
      timeOutId.current = setTimeout(() => {
        start.current = new Date();
        setStatus('now');
        setMessage('클릭!');
      }, Math.ceil(Math.random() * 4000) + 500);
    } else if(status === 'now') {
      // 기록 추가
      setResult((prevResult) => [...prevResult, new Date() - start.current]);
      // state 초기화
      setStatus('waiting');
      setMessage('클릭해서 시작하세요');
    } else if(status == 'ready') {
      // timeout 이벤트 제거
      clearTimeout(timeOutId.current);

      // state 초기화
      setStatus('waiting');
      setMessage('성급했다. 클릭해서 시작하세요');
    }
  };

  const onClickReset = () => {
    setResult([]);
  }

  const getAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>avg : {result.reduce((acc, curr) => acc + curr, 0) / result.length}ms</div>
        <button onClick={onClickReset}>reset</button>
      </>
  }

  return (
    <>
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
      {getAverage()}
    </>
  );
};

export default ReactionSpeed;