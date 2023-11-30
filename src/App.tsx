import './styles.css';
import { RouterProvider } from 'react-router-dom';
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
  console.log('localStorage.getItem( ', localStorage.getItem('isLogin'));

  return (
    <div className='App'>
      <globalContext.Provider value={{ isLogin, setLogin }}>
        <Suspense fallback={<div>loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </globalContext.Provider>
    </div>
  );
}
