import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='app_layout'>
      <div className='nav'>
        <Link to='/'>/</Link>
        <Link to='login'>login</Link>
        <Link to='/about'>about</Link>
        <Link to='/about1'>about1</Link>
        <Link to='/test'>test</Link>
        <Link to='/layout'>layout</Link>
        <Link to='/layout/1'>layout-1</Link>
        <Link to='/layout/2'>layout-2</Link>
        <Link to='/layout/3/1'>layout-3-1</Link>
        <Link to='/layout/3/2'>layout-3-2</Link>
      </div>
        <Outlet />
    </div>
  );
};

export default AppLayout;
