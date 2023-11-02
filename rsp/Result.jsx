import React, { memo } from 'react';

const Result = memo(({result}) => {
  return (
    <div>{result}</div>
  );
});

export default Result;