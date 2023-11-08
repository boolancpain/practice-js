import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './Minesweeper';

const Tr = memo(({ row }) => {
  //console.log('tr render');

  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {Array(tableData[0] && Array(tableData[0].length).fill().map((v, i) => <Td key={row + '' + i}row={row} col={i} />))}
    </tr>
  )
});

export default Tr;