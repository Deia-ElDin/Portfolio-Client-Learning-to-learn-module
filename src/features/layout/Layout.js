import { Outlet } from 'react-router-dom';
import Controls from '../controls/Controls';

const Layout = () => {
  return (
    <div className="App">
      <Controls />
      <Outlet />
    </div>
  );
};

export default Layout;
