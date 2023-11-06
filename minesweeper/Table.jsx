import React, { useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './Minesweeper';

const Table = () => {
  console.log('table render');

  const { tableData } = useContext(TableContext);

  return (
    <>
      <table id="board">
        <tbody>
          {Array(tableData.length).fill().map((v, i) => <Tr key={'r' + i} row={i} />)}
        </tbody>
      </table>
    </>
  )
};

export default Table;