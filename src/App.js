import { Outlet } from 'react-router-dom'
import ContextProvider from './context/index'
import AppContextProvider from './context/AppProvider';

function App() {
  return (
    <ContextProvider>
      <AppContextProvider>
        <Outlet />
      </AppContextProvider>
    </ContextProvider>
  );
}


export default App;
