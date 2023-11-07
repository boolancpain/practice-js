import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  OPENED: 0,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: true
});

const initState = {
  tableData: [],
  timer: 0,
  result: '',
  opened: 0,
  data: {
    row: 0,
    col: 0,
    mine: 0
  },
  halted: true
}

const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: setMines(action.row, action.col, action.mine),
        data: {
          row: Number(action.row),
          col: Number(action.col),
          mine: Number(action.mine)
        },
        opened: 0,
        halted: false,
        result: '',
        timer: 0
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      
      // 모든 row 얕은 복사
      tableData.forEach((v, i) => tableData[i] = [...state.tableData[i]]);
      
      // 재귀 방문 여부
      const checked = Array(state.data.row).fill(false).map(() => Array(state.data.col).fill(false));
      
      const aroundPositions = [
        [-1, -1], [-1, 0], [-1, 1], // 윗줄
        [0, -1], [0, 1], // 옆칸
        [1, -1], [1, 0], [1, 1] // 아랫줄
      ];
      
      const checkAround = (row, col) => {
        // 유효한 주변 셀의 위치
        const aroundCells = aroundPositions.map((pos) => {
          let x = row + pos[0];
          let y = col + pos[1];
          if(x >= 0 && x < state.data.row && y >= 0 && y < state.data.col) {
            return [x, y];
          }
        }).filter(v => v);
        
        const mines = aroundCells.map((pos) => tableData[pos[0]][pos[1]]).filter((v) => v === CODE.MINE || v === CODE.FLAG_MINE || v === CODE.QUESTION_MINE);

        // 지뢰 개수 기록
        tableData[row][col] = mines.length;
        // 방문 기록
        checked[row][col] = true;

        // 해당 셀 주변에 지뢰가 없는 경우
        if(mines.length === 0) {
          aroundCells.forEach(v => {
            // 주변 셀 중에서 방문하지 않은 곳도 지뢰 개수를 체크한다.
            if(!checked[v[0]][v[1]] && tableData[v[0]][v[1]] === CODE.NORMAL) {
              checkAround(v[0], v[1]);
            }
          });
        }
      }

      // 해당 셀 체크
      checkAround(action.row, action.col);

      // opened 체크
      const opened = checked.reduce((acc, curr) => acc.concat(curr), []).filter(tf => tf).length;
      console.log(`${state.opened} + ${opened}`);

      if(state.data.row * state.data.col - state.data.mine === state.opened + opened) {
        return {
          ...state,
          tableData,
          opened: opened + state.opened,
          halted: true,
          result: `${state.timer}초 만에 승리!`
        }
      }

      return {
        ...state,
        tableData,
        opened: opened + state.opened
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      //tableData[action.row][action.col] = CODE.CLICKED_MINE;
      tableData.forEach((v, i) => {
        v.forEach((vv, ii) => {
          if(vv === CODE.MINE || vv === CODE.FLAG_MINE || vv === CODE.QUESTION_MINE) {
            tableData[i][ii] = CODE.CLICKED_MINE;
          }
        }) 
      });

      return {
        ...state,
        tableData,
        halted: true,
        result: '실패!'
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = tableData[action.row][action.col] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
      return {
        ...state,
        tableData
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = tableData[action.row][action.col] === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
      return {
        ...state,
        tableData
      }
    }
    case NORMAL_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = tableData[action.row][action.col] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;
      return {
        ...state,
        tableData
      }
    }
    case INCREASE_TIMER:
      return {
        ...state,
        timer: state.timer + 1
      }
    default:
      return state;
  }
}

export const START_GAME = 'START_GAME';
export const CLICK_CELL = 'CLICK_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMAL_CELL = 'NORMAL_CELL';
export const INCREASE_TIMER = 'INCREASE_TIMER';

const setMines = (row, col, mine) => {
  let arr = Array(row * col).fill().map((v, i) => mine > i ? -7 : -1);
  for(let i = arr.length - 1;i > 0;i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  let result = [];
  for(let i = 0;i < col;i++) {
    result.push(arr.splice(0, row));
  }

  return result;
}

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { halted } = state;

  const value = useMemo(() => ({
    tableData: state.tableData, halted: state.halted, dispatch
  }), [state.tableData, state.halted]);

  useEffect(() => {
    let timerId;
    if(halted === false) {
      timerId = setInterval(() => {
        // timer 1초 작동
        dispatch({ type: INCREASE_TIMER });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    }
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div className="timer">time : {state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
}

export default Minesweeper;