import React from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router';
import WordRelay from './word_relay/WordRelay';
import BaseBall from './base_ball/BaseBall';
import ReactionSpeed from './reaction_speed/ReactionSpeed';
import Rsp from './rsp/Rsp';
import Lotto from './lotto/Lotto';
import Minesweeper from './minesweeper/Minesweeper';
import TicTacToe from './tic_tac_toe/TicTacToe';

const GameMatcher = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  console.log(navigate);

  return (
    <Routes>
      <Route path="word_relay" element={<WordRelay />} />
      <Route path="base_ball" element={<BaseBall />} />
      <Route path="reaction_speed" element={<ReactionSpeed />} />
      <Route path="rsp" element={<Rsp />} />
      <Route path="lotto" element={<Lotto />} />
      <Route path="tic_tac_toe" element={<TicTacToe />} />
      <Route path="minesweeper" element={<Minesweeper />} />
      <Route path="*" element={<div>일치하는 게임이 없습니다.</div>} />
    </Routes>
  );
};

export default GameMatcher;