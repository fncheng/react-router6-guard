import './styles.css'
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { Suspense, createContext, useEffect, useState } from 'react'
import router from './router'
import AppLayout from './pages/AppLayout'
import { Loading } from './utils/Loading'

interface IGlobalContext {
  isLogin: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const globalContext = createContext<IGlobalContext>({
  isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),
  setLogin: () => {}
})



export function App() {
  const [isLogin, setLogin] = useState<boolean>(() => {
    const storeValue = localStorage.getItem('isLogin')
    return storeValue ? JSON.parse(storeValue) : false
  })

  const location = useLocation()
  const navigate = useNavigate()

  

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
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </globalContext.Provider>
    </div>
  )
}

export function App1() {
    const [isLogin, setLogin] = useState<boolean>(() => {
        const storeValue = localStorage.getItem("isLogin");
        return storeValue ? JSON.parse(storeValue) : false;
    });

    const location = useLocation();
    const navigate = useNavigate();
    console.log('location: ', location);

    const handleRouteChange = () => {
        console.log("------全局路由守卫------", isLogin);
        if (!isLogin && location.pathname !== "/login") {
            navigate("/login");
        }
    };

    useEffect(() => {
        handleRouteChange();
    }, [location.pathname]);

    return <AppLayout />;
}