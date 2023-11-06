'use strict';

import React from 'react';
import Root from 'react-dom/client';
import Minesweeper from './Minesweeper';

Root.createRoot(document.querySelector('#root')).render(<Minesweeper />);