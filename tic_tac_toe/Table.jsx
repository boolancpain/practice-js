import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, end, dispatch }) => {
  console.log('table render');

  return (
    <>
      <table className="tic_tac_toe">
        <tbody>
          {Array(tableData.length).fill().map((v, i) => <Tr key={i} row={i} rowData={tableData[i]} end={end} dispatch={dispatch} />)}
        </tbody>
      </table>
    </>
  )
};

export default Table;