'use strict';

import React from 'react';
import Root from 'react-dom/client';
import TicTacToe from './TicTacToe';

Root.createRoot(document.querySelector('#root')).render(<TicTacToe />);