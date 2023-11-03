import React from 'react';
import Td from './Td';

const Tr = ({ row, rowData, end, dispatch }) => {
  console.log('tr render');

  return (
    <tr>
      {Array(rowData.length).fill().map((v, i) => <Td key={row + '' + i} row={row} col={i} cellData={rowData[i]} end={end} dispatch={dispatch} />)}
    </tr>
  )
};

export default Tr;