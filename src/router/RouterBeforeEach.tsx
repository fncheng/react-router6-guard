import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { globalContext } from '../App';
import { routes } from '.';

const RouterBeforeEach = ({ children }) => {
  const { isLogin } = useContext(globalContext);
  const location = useLocation();
  console.log('to: ', location);
  const to = routes.find((route) => route.path === location.pathname);

  // 如果未登录，且去的页面不是登录页，则重定向到登录页
  if (!isLogin && to?.path !== '/login') {
    return <Navigate to='/login' />;
  }

  // 如果已登录，不可直接去登录页，应通过logout退出登录来跳转登录页
  if (to?.path === '/login' && isLogin) {
    return <Navigate to='/' />;
  }
  // 需要鉴权的页面
  if (to?.meta?.requireAuth) {
    // 判断有没有这个页面的权限
    // ...
    // 没有则跳转至指定页
    return <Navigate to='/unpermission' />;
  }

  return children;
};
export default RouterBeforeEach;