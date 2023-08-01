import './App.css';

import {Route, Routes, useLocation} from 'react-router-dom';

import {Detail, Home, Landing, NavBar, Form} from './views/routes/routes';


function App() {
  
  const location = useLocation();
  
  return (
  
      <div>
        
        {location.pathname !== "/" && location.pathname !== "/form" && <NavBar/>}

        <Routes>

            <Route path = '/' element = {<Landing/>}/>
            {/* <Route path = '/home' element = {<NavBar/>}/> */}
            <Route path = '/home' element = {<Home/>}/>
            <Route path = '/detail/:id' element = {<Detail/>}/>
            <Route path = 'activities/form' element = {<Form/>}/>
        </Routes>
      </div>
    
  )
}

export default App;





