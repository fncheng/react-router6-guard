import './styles.css';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes
} from 'react-router-dom';
import { Suspense, createContext, useState } from 'react';
import router from './router';

interface IGlobalContext {
  isLogin: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const globalContext = createContext<IGlobalContext>({
  isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),
  setLogin: () => {}
});

export default function App() {
  const [isLogin, setLogin] = useState<boolean>(() => {
    const storeValue = localStorage.getItem('isLogin');
    return storeValue ? JSON.parse(storeValue) : false;
  });

  return (
    <div className='App'>
      <globalContext.Provider value={{ isLogin, setLogin }}>
        {false && (
          <Router>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path='/' element={<Navigate to='/dashboard' />}></Route>
                <Route path='/dashboard' element={'dashboard'} />
                <Route path='/about' element={'about'} />
                <Route
                  path='/settings'
                  element={
                    <div>
                      settings <Outlet />
                    </div>
                  }
                >
                  {/* 这里为了解决重定向需要新增一条带index的路由 */}
                  <Route index element={<Navigate to='profile' />} />
                  <Route
                    path='profile'
                    element={
                      <div>
                        profile <Outlet />
                      </div>
                    }
                  >
                    <Route path='a' element={'aaa'}></Route>
                    <Route path='b' element={'bbb'}></Route>
                  </Route>
                  <Route path='profile2' element={'profile2'} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        )}
        <Suspense fallback={<div>loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </globalContext.Provider>
    </div>
  );
}
