import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initailState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''],
    ['','',''],
    ['','','']],
  recentCell: [],
  end: false
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET = 'RESET';
export const DRAW = 'DRAW';

// dispatch할 때마다 reducer가 실행
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        // state.winner = action.winner 이렇게 직접 변경하면 안된다.
        ...state,
        winner: action.winner,
        end: true
      }
    case CLICK_CELL:
      // 얕은 복사
      const tableData = [...state.tableData]; // 나중에 immer라는 라이브러리로 가독성을 해결함
      tableData[action.row][action.col] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.col]
      }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    case RESET:
      return {
        ...state,
        turn: 'O',
        tableData: [['','',''], ['','',''], ['','','']],
        recentCell: [],
        winner: '',
        end: false
      }
    case DRAW:
      return {
        ...state,
        end: true
      }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initailState);
  const { turn, tableData, recentCell } = state;

  useEffect(() => {
    // 초기값이면 winner 체크하지 않음
    if(recentCell.length < 2) {
      return;
    }

    let [row, col] = recentCell;
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    } else if(tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn) {
      win = true;
    } else if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    } else if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if(win) {
      // 승리
      dispatch({type: SET_WINNER, winner: turn });
    } else {
      // 빈 셀
      const emptyCells = tableData.reduce((acc, cur) => acc.concat(cur)).filter(v => v === '');
      if(emptyCells.length === 0) {
        // 무승부
        dispatch({ type: DRAW });
      }
      // 턴 바꿈
      dispatch({ type: CHANGE_TURN })
    }
  }, [recentCell]);

  const onClickTable = useCallback(() => {
    // dispatch : action을 실행
    dispatch({ type: SET_WINNER, winner: 'O' })
  }, []);

  const onClickReset = useCallback(() => {
    // 게임 리셋
    dispatch({ type: RESET });
  }, []);
  return (
    <>
      <Table tableData={state.tableData} end={state.end} dispatch={dispatch} />
      {state.winner && <div className="result">{state.winner}의 승리! <button onClick={onClickReset}>다시하기</button></div>}
      {(!state.winner && state.end) && <div className="result">무승부 <button onClick={onClickReset}>다시하기</button></div>}
    </>
  );
}

export default TicTacToe;