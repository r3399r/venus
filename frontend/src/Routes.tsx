import { Route, Routes } from 'react-router-dom';
import Album from './page/Album';
import Treasure from './page/Treasure';
import TreasureStage1 from './page/TreasureStage1';

const AppRoutes = () => (
  <Routes>
    <Route path={'album'} element={<Album />} />
    <Route path={'treasure'} element={<Treasure />} />
    <Route path={'treasure/stage1'} element={<TreasureStage1 />} />
  </Routes>
);

export default AppRoutes;
