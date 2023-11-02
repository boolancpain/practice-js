const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('강아지');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if(word[word.length - 1] === value[0]) {
      setWord(value);
      setResult('딩동댕');
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
    // focus
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="zzz">입력 : </label>
        <input id="zz" className="zzz" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
}

// export
module.exports = WordRelay;