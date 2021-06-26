import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

import {AuthContextProvider} from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom';
import {Connection} from './pages/Connection';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {  
  return ( 
    <BrowserRouter>  
    <ThemeContextProvider>
      <AuthContextProvider >
        <Switch>
        <Route path="/" exact component= {Connection} /> 
          <Route path="/home" exact component= {Home} /> 
          <Route path="/rooms/new"  component= {NewRoom} /> 
          <Route path="/rooms/:id" component= {Room} /> 

          <Route path="/admin/rooms/:id" component= {AdminRoom} /> 

          </Switch>
        </AuthContextProvider>    
        </ThemeContextProvider>
      </BrowserRouter>
  );
}

export default App;
