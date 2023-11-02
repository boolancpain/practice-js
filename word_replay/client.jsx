/*
const React = require('react');
const ReactDOM = require('react-dom');

const WordRelay = require('./WordRelay');

ReactDOM.render(<WordRelay />, document.querySelector('#root'));
*/
const React = require('react');
const dom = require('react-dom/client');

const WordRelay = require('./WordRelay');

dom.createRoot(document.querySelector('#root')).render(<WordRelay />);