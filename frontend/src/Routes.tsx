import { Route, Routes } from 'react-router-dom';
import Album from './page/Album';
import Treasure from './page/Treasure';
import TreasureStage1 from './page/TreasureStage1';
import TreasureStage2 from './page/TreasureStage2';
import TreasureStage3 from './page/TreasureStage3';
import TreasureStage4 from './page/TreasureStage4';

const AppRoutes = () => (
  <Routes>
    <Route path={'album'} element={<Album />} />
    <Route path={'treasure'} element={<Treasure />} />
    <Route path={'treasure/stage1'} element={<TreasureStage1 />} />
    <Route path={'treasure/stage2'} element={<TreasureStage2 />} />
    <Route path={'treasure/stage3'} element={<TreasureStage3 />} />
    <Route path={'treasure/stage4'} element={<TreasureStage4 />} />
  </Routes>
);

export default AppRoutes;
