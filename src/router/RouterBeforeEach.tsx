import { useContext } from 'react';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { globalContext } from '../App';
import { rotuesMap } from '.';

type RouterBeforeEachProps = {
  children: JSX.Element;
};

const RouterBeforeEach: React.FC<RouterBeforeEachProps> = ({ children }) => {
  const { isLogin } = useContext(globalContext);
  const location = useLocation();

  const to = rotuesMap.get(location.pathname);
  console.log('to: ', to);

  // 如果未登录，且去的页面不是登录页，则重定向到登录页
  if (!isLogin && to?.path !== '/login') {
    return <Navigate to='/login' />;
  }

  // 如果已登录，不可直接去登录页，应通过logout退出登录来跳转登录页
  if (to?.path === '/login' && isLogin) {
    return <Navigate to='/' />;
  }
  // 需要鉴权的页面
  if (to?.meta?.requireAuth && !isLogin) {
    // 判断有没有这个页面的权限
    // ...
    // 没有则跳转至指定页
    return <Navigate to='/unpermission' />;
  }
  if (to?.redirect) {
    // 这里需要判断redirect是绝对路径，还是相对路径
    if (to.redirect.startsWith('/')) {
      return <Navigate to={to.redirect} />;
    } else {
      const redirect = `${to.fullPath}/${to.redirect}`.replace(/\/+/, '/');
      return <Navigate to={redirect} />;
    }
  }
  return children;
};
export default RouterBeforeEach;
