import React,{Component} from 'react';
import Jugador from './jugador';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Navbar,Form, Container, Row, Col,NavDropdown, Nav} from 'react-bootstrap';

/**
 * 
 */
class Jugadores extends React.Component {

  /**
   * 
   * @param {*} props 
   */
    constructor(props){
      super(props);
  
      this.state ={
        jugadores:[],
        formAdd: {
          "Nombre del Jugador":this.props["Nombre del Jugador"],
          "id":this.props["id"],
          "Avatar":this.props["Avatar"],
          "teamId":this.props["teamId"]
        }
      };
  }
    
  /**
   * 
   * @param {*} playerId 
   */
      handleDelete = (playerId) =>{
        // borrar por ID, no por NOMBRE
        const localPlayers = this.state.jugadores.filter(p => p["id"] !== playerId);
        this.setState({jugadores : localPlayers});
      }
    
      /**
       * 
       */
      handleAgregar = () =>{
        var localcounters  = [...this.state.jugadores];    //clonamos el objeto
        localcounters = localcounters.concat(
          this.state.formAdd
        )
        
        //console.log(localcounters);
        this.setState({jugadores:localcounters});    
      }
    
      /**
       * 
       * @param {*} e 
       */
      handleChange = e =>{
        //console.log(e);    
        //en formAdd se copia el mismo valor previo, pero se actualiza unicamente 
        ///el valor del campo modificado por el evento
        this.setState({
          formAdd:{
            ...this.state.formAdd,
            [e.target.name]: e.target.value
          }
        });
      }
    
      /**
       * 
       * @param {*} j 
       */
      handleJugadorChange = j =>{
        //console.log(j);    
        //copiamos el estado modificado por el evento changes
        this.setState({
          formAdd:{...j.state.formAdd}
        });    
    
      }
    
      /**
       * 
       * @param {*} player 
       */
      handleUpdate = (player) =>{
        // //agregamos si coincide con el ID 
        // var localcounters  = [...this.state.jugadores];    //clonamos el objeto
        // //buscamos el jusgador con ID=playerId y lo modificamos con los valores de formAdd
        // const localPlayers = this.state.jugadores.filter(p => (p.idj == playerId));
    
        // //actualizamos el listado gral de jugadores
        // this.setState({jugadores:localcounters});    
    
        var contador =0;
        var lista = this.state.jugadores;
        lista.map((registro)=>{
          if(player["id"]==registro["id"]){
              lista[contador]["Nombre del Jugador"] = this.formAdd["Nombre del Jugador"];
              lista[contador]["Avatar"] = this.formAdd["Avatar"];
              lista[contador]["teamId"] = this.formAdd["teamId"];
          }
          contador++;
        }
        );
        this.setState({jugadores:lista});
      }
    
      /**
       * 
       */
      handleBuscar = () =>{
        //deberia FILTRATR 
        if((this.state.formAdd["Nombre del Jugador"] =="") & (this.state.formAdd["teamId"] =="")){
          //mostramos todos los jugadores
                       
        }else{
          const localPlayers = this.state.jugadores.filter(p => (p["Nombre del Jugador"] == this.state.formAdd["Nombre del Jugador"]) ||
          (p["teamId"] == this.state.formAdd["teamId"]));
          if(localPlayers.length > 0){
            this.setState({jugadores : localPlayers});
          }    
        }
      }

      /**
       * 
       */
      componentDidMount(){
        const apiurl="https://footbal-api.herokuapp.com/players";
        fetch(apiurl)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                jugadores: json                    
            });
        })          
    }

    render() { 
        return (
            <div className="App">

            {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
            <Form>  
              <Row>Nuevo Jugador</Row>
            <Row>
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.jugadores.length+1}/>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del Jugador"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese URL Foto" name="Avatar"    onChange={this.handleChange}/>
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Ingrese Equipo" name="teamId"  onChange={this.handleChange}/>
              </Col>
              <Button onClick={this.handleAgregar} variant="primary" type="button" className="col-1 btn success">
                NUEVO
              </Button>
              </Row>
            </Form>
    
            {/* FORMULARIO PARA BUSCAR UN JUGADOR */}
            <Form>  
              <Row>BUSCAR Jugador</Row>
            <Row>
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.jugadores.length+1}/>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del Jugador"  onChange={this.handleChange} />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Ingrese Equipo" name="teamId"  onChange={this.handleChange}/>
              </Col>
              <Button onClick={this.handleBuscar} variant="primary" type="button" className="col-1 btn success">
                BUSCAR
              </Button>
              </Row>
            </Form>
    
    
            <div className="row">                
              <div className="col-1">ID</div>
              <div className="col-3">Nombre</div>
              <div className="col-1">Foto</div>
              <div className="col-3">Equipo</div>
              {/* <div className="col-1">Editar</div> */}
              <div className="col-1">Acciones</div>
            </div>
    
            {this.state.jugadores.map(jugador => 
                    <Jugador 
                        idj={jugador["id"]} 
                        nombre = {jugador["Nombre del Jugador"]}
                        foto = {jugador["Avatar"]}
                        equipo = {jugador["teamId"]}                    
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.handleUpdate} 
                        onCambio = {this.handleJugadorChange}                   
                    >    
                    </Jugador>
                    )}
          </div>            
        );
    }
}
 
export default Jugadores;