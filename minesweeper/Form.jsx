import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext, START_GAME } from './Minesweeper';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(10);

  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, [row]);
  const onChangeCol = useCallback((e) => {
    setCol(e.target.value);
  }, [col]);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, [mine]);

  const onClickBtn = useCallback((e) => {
    console.log('click btn');
    dispatch({ type: START_GAME, row, col, mine });
  });

  return (
    <>
      <div>
        <input type="number" className="input" onChange={onChangeCol} value={col} maxLength="3"/>
        <input type="number" className="input" onChange={onChangeRow} value={row} maxLength="3"/>
        <input type="number" className="input" onChange={onChangeMine} value={mine} maxLength="3"/>
        <button onClick={onClickBtn}>생성</button>
      </div>
    </>
  );
});

export default Form;