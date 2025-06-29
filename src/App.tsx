import './App.css'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import routes from './routes';

function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

function App() {

    useEffect(() =>{
      document.documentElement.classList.remove("light", "dark");
      const theme = localStorage.getItem('theme');
      if (theme ) {
        document.documentElement.classList.add(theme);
      }
    },[]);

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
