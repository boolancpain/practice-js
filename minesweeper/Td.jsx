import React, { useCallback, useContext, memo, useMemo } from 'react';
import { TableContext, CODE, CLICK_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMAL_CELL } from './Minesweeper';

const getCellStyle = (data) => {
  console.log('get cell style by render');
  switch(data) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        backgroundColor: 'gainsboro'
      }
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        backgroundColor: 'seagreen',
        color: 'white'
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        backgroundColor: 'dimgrey',
        color: 'white'
      }
    case CODE.CLICKED_MINE:
      return {
        backgroundColor: 'red'
      }
    default:
      let color = 'gray';
      switch(data) {
        case 1:
          color = '#1593ff';
          break;
        case 2:
          color = '#00ca6d';
          break;
        case 3:
          color = '#ff475e';
          break;
        case 4:
          color = '#ff8c41';
          break;
        case 5:
          color = '#985545';
          break;
        case 6:
          color = '#8a2be2';
          break;
        case 7:
          color = '#228b22';
          break;
        default:
          color = '#dda0dd';
          break;
      }

      return {
        backgroundColor: 'white',
        color: color
      }
  }
}

const getCellText = (data) => {
  console.log('get cell text by render');
  switch(data) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return ''
    case CODE.CLICKED_MINE:
      return 'X'
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!'
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?'
    default:
      return data || ''
  }
}

const Td = memo(({ row, col }) => {
  console.log('td render');

  const { tableData, halted, dispatch } = useContext(TableContext);

  const onClickCell = useCallback(() => {
    if(halted) {
      // 게임 종료되었을 땐 리턴
      return;
    }
    switch(tableData[row][col]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: CLICK_CELL, row: row, col: col });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: row, col: col });
        return;
      default:
        return;
    }
  }, [tableData[row][col], halted]);

  const onRightClickCell = useCallback((e) => {
    // 우클릭 이벤트, 메뉴 삭제
    e.preventDefault();

    if(halted) {
      // 게임 종료되었을 땐 리턴
      return;
    }

    switch(tableData[row][col]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: row, col: col });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: QUESTION_CELL, row: row, col: col });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: NORMAL_CELL, row: row, col: col });
        return;
      default:
        return;
    }
  }, [tableData[row][col], halted])

  return useMemo(() => (
    <td onClick={onClickCell} onContextMenu={onRightClickCell} style={getCellStyle(tableData[row][col])}>{getCellText(tableData[row][col])}</td>
  ), [tableData[row][col]]);
});

export default Td;