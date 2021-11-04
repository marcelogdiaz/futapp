import React,{Component} from 'react';
import './App.css';
import ControladorJugadores from './components/ControladorJugadores';
import FutAppNavBar from './components/futAppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import ControladorEquipos from './components/ControladorEquipos';
import ControladorLiga from './components/ControladorLigas';

class App extends React.Component {

  render() {
    //De acuerdo a la URL donde estemos, mostramos el contenido correspondiente
    if(window.location.href.includes("Ligas")){
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1>HOME Liga</h1>
        <ControladorLiga/>
        </div>
      );
    }else if(window.location.href.includes("Equipos")){
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1> HOME Equipos</h1>
        <ControladorEquipos/>
        </div>
      );
    }else{
      return(
        <div className="App">
        {/*BARRA DE NAVEGACION*/}
        <FutAppNavBar/>
        <h1> HOME Jugadores</h1>
        <ControladorJugadores/>
        </div>
      );
    }
  }
}

export default App;
