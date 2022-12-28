import { Route, Routes } from 'react-router-dom';
import Stage1 from './page/Stage1';
import Status from './page/Status';

const AppRoutes = () => (
  <Routes>
    <Route path={'treasure/stage1'} element={<Stage1 />} />
    <Route path={'treasure'} element={<Status />} />
  </Routes>
);

export default AppRoutes;
