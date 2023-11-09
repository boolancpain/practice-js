import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return (
    <>
      <li>{tryInfo.key} : {tryInfo.strike}s {tryInfo.ball}b</li>
    </>
  );
});

export default Try;