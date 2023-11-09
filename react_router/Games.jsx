import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes, Link } from 'react-router-dom';
// BrowserRouter를 많이 씀
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <p>공통인 부분</p>
        <Link to="/games/word_relay">1. 끝말잇기</Link>
        <br />
        <Link to="/games/base_ball">2. 숫자야구</Link>
        <br />
        <Link to="/games/reaction_speed">3. 반응속도체크</Link>
        <br />
        <Link to="/games/rsp">4. 가위바위보</Link>
        <br />
        <Link to="/games/lotto">5. 로또</Link>
        <br />
        <Link to="/games/tic_tac_toe">6. 틱택토</Link>
        <br />
        <Link to="/games/minesweeper">7. 지뢰찾기</Link>
      </div>
      <div>
        <Routes>
          <Route path="/games/*" element={<GameMatcher />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;