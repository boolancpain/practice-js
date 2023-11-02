/*
const React = require('react');
const ReactDOM = require('react-dom');

const WordRelay = require('./WordRelay');

ReactDOM.render(<WordRelay />, document.querySelector('#root'));
*/

/*
const React = require('react');
const dom = require('react-dom/client');
const BaseBall = require('./BaseBall');
*/
'use strict';

import React from 'react';
import Root from 'react-dom/client';
import BaseBall from './BaseBall';

Root.createRoot(document.querySelector('#root')).render(<BaseBall />);