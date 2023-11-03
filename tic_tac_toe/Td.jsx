import React, { memo, useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ row, col, cellData, end, dispatch }) => {
  console.log('td render');

  // cell click event
  const onClickCell = useCallback(() => {
    console.log(`clicked ${row},${col} cell, end is ${end}`);
    if(end || cellData) {
      return ;
    } else {
      dispatch({ type: CLICK_CELL, row: row, col: col });
    }
  }, [cellData, end]);

  return (
    <td onClick={onClickCell}>{cellData}</td>
  )
});

export default Td;