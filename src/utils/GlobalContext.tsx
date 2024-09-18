import { createContext, useContext, useState } from "react";

interface IGlobalContext {
  isLogin: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<IGlobalContext>({
  isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),
  setLogin: () => {}
})

// 创建 Provider 组件

interface GlobalProviderProps {
  children: JSX.Element;
}
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogin, setLogin] = useState<boolean>(() => {
    const storeValue = localStorage.getItem("isLogin");
    return storeValue ? JSON.parse(storeValue) : false;
  });

  return <GlobalContext.Provider value={{ isLogin, setLogin }}>{children}</GlobalContext.Provider>;
};

// 创建自定义 hook，便于使用
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};