import { Route, Routes } from 'react-router-dom';
import Stage1 from './page/Stage1';

const AppRoutes = () => (
  <Routes>
    <Route path={'treasure/stage1'} element={<Stage1 />} />
  </Routes>
);

export default AppRoutes;
