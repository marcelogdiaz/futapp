import React,{Component} from 'react';
import './App.css';
import Jugadores from './components/jugadores';
import FutAppNavBar from './components/futAppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Equipos from './components/equipos';
import Ligas from './components/ligas';

class App extends React.Component {

  render() {
    if(window.location.href.includes("Ligas")){
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1>HOME Ligas</h1>
        <Ligas/>
        </div>
      );
    }else if(window.location.href.includes("Equipos")){
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1> HOME Equipos</h1>
        <Equipos/>
        </div>
      );
    }else{
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1> HOME Jugadores</h1>
        <Jugadores/>
        </div>
      );
    }
  }
}

export default App;
