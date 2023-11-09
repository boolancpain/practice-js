import React, { useState, useEffect, useRef } from 'react';
import Ball from './Ball';

// 1-45
const lottoNumbers = Array(45).fill().map((v, i) => i + 1);

// 랜덤 번호 추출(7개)
const getNumbers = () => {
  console.log('get numbers!');
  return lottoNumbers.sort(() => Math.random() - 0.5).splice(0, 7);
}

const Lotto = () => {
  const [numbers, setNumbers] = useState(getNumbers);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState();
  const [ableReset, setAbleReset] = useState(false);

  const timeOuts = useRef([]);

  useEffect(() => {
    console.log('로또 숫자를 새로 생성합니다.');
    // 추첨 공 추가
    for(let i = 0;i < numbers.length - 1 ;i++) {
      // timeOuts가 바뀌는게 아님
      timeOuts.current[i] = setTimeout(() => {
        setWinningNumbers((prevWinningNumbers) => [...prevWinningNumbers, numbers[i]]);
      }, (i + 1) * 1000);
    }

    timeOuts.current[6] = setTimeout(() => {
      // 보너스 공 추가
      setBonusNumber(numbers[numbers.length - 1]);
      // 리셋 가능여부 true
      setAbleReset(true);
    }, 7000);

    return () => {
      console.log('did unmount');
      timeOuts.current.forEach((t) => {
        clearTimeout(t);
        console.log(`timeOutId(${t}) is killed`);
      });
      timeOuts.current = [];
    };
  }, [numbers]);
  // timeOuts.current가 빈 배열이면 didMount, 요소가 있으면 didMount, didUpdate 모두 수행
  
  // 재시작. state 초기화
  const onClickRestart = () => {
    setNumbers(getNumbers);
    setWinningNumbers([]);
    setBonusNumber();
    setAbleReset(false);
  }

  return (
    <>
      <h3>당첨 숫자</h3>
      <div className="numbers">
        {winningNumbers.map((element) => <Ball key={element} number={element}/>)}
      </div>
      <h3>보너스</h3>
      <div className="numbers">
        {bonusNumber && <Ball key={bonusNumber} number={bonusNumber} />}
      </div>
      {ableReset ? <button onClick={onClickRestart}>다시 추첨</button> : null}
    </>
  );
}

export default Lotto;