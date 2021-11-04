import React,{Component} from 'react';
import Jugador from './jugador';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Navbar,Form, Container, Row, Col,NavDropdown, Nav} from 'react-bootstrap';

/**
 * 
 */
class ControladorJugadores extends React.Component {

  /**
   * 
   * @param {*} props 
   */
    constructor(props){
      super(props);
  
      this.state ={
        jugadores:[],
        equipos:[],
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
          this.getPLayers();
        }else{
          const localPlayers = this.state.jugadores.filter(p => (p["Nombre del Jugador"].includes(this.state.formAdd["Nombre del Jugador"])) ||
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
    
        this.getPLayers();
        this.getTeams();

      }

      async getTeams(){
        const apiurlequipos="https://footbal-api.herokuapp.com/teams";
        await fetch(apiurlequipos)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                equipos: json                    
            });
        })        
      }

      async getPLayers(){
          const apiurl="https://footbal-api.herokuapp.com/players";
          await fetch(apiurl)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  jugadores: json                    
              });
          })      
        }
    

    render() { 
        return (
            <div className="App container">

            {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
            <Form className="alert alert-warning">               
            <Row>
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.jugadores.length+1}/>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del Jugador"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese URL Foto" name="Avatar"    onChange={this.handleChange}/>
              </Col>
              <Col>
                {/* <Form.Control type="text" placeholder="Ingrese Equipo" name="teamId"  onChange={this.handleChange}/> */}

                <select name="teamId" id="teamId" onChange={this.handleChange}>
                {this.state.equipos.map(eq => 
                    <option value={eq["id"]}>{eq["Nombre del equipo"]}</option>
                    )}
              </select>
              </Col>
              <Button onClick={this.handleAgregar} variant="warning" type="button" className="col-1">
                NUEVO
              </Button>
              </Row>
            </Form>
    
            {/* FORMULARIO PARA BUSCAR UN JUGADOR */}
            <Form className="alert alert-success">                
            <Row>
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.jugadores.length+1}/>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del Jugador"  onChange={this.handleChange} />
              </Col>
              <Col>
                {/* <Form.Control type="text" placeholder="Ingrese Equipo" name="teamId"  onChange={this.handleChange}/> */}
                <select name="teamId" id="teamId" onChange={this.handleChange}>
                {this.state.equipos.map(eq => 
                    <option value={eq["id"]}>{eq["Nombre del equipo"]}</option>
                    )}
              </select>                
              </Col>
              <Button onClick={this.handleBuscar} variant="success" type="button" className="col-1">
                BUSCAR
              </Button>
              </Row>
            </Form>
    
            <table class="table table-striped custab">
            <thead>
            <tr >                
              {/* <td >ID</td> */}
              <td >Nombre</td>
              <td >Foto</td>
              <td >Equipo</td>
              {/* <div className="col-1">Editar</div> */}
              <td >Acciones</td>
            </tr>
            </thead>
            <tbody>
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
              </tbody>
            </table>                    
          </div>            
        );
    }
}
 
export default ControladorJugadores;