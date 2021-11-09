import React,{Component} from 'react';
import Jugador from './jugador';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Modal,Form, ModalBody, Row, Col,ModalFooter, Nav} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from 'axios';

/**
 * 
 */
class ControladorJugadores extends React.Component {
  // apiLeaguesUrl = "https://footbal-api.herokuapp.com/leagues";
   apiTeamUrl = "https://footbal-api.herokuapp.com/teams";  
   apiPlayerUrl="https://footbal-api.herokuapp.com/players";

  apiLeaguesUrl = "http://localhost:3001/localLigas"//"https://footbal-api.herokuapp.com/leagues";
  //apiTeamUrl = "http://localhost:3002/localEquipos"//"https://footbal-api.herokuapp.com/teams";  
  //apiPlayerUrl="http://localhost:3003/localJugadores"//"https://footbal-api.herokuapp.com/players";  


  state ={
    jugadores:[],
    equipos:[],
    formAdd: [],
    modalInsertar:false,
    cargandoEquipos:true,
    cargandoJugadores:true
  }

  /**
   * 
   * @param {*} props 
   */
    constructor(props){
      super(props);
  
         //creamos una referencia al INPUT HTML
    this.inputNuevoNombreRef = React.createRef();
    this.inputNuevoLogoRef = React.createRef();

    this.state.formAdd["Nombre del Jugador"]="";
    this.state.formAdd["id"]=this.state.jugadores.length+1;
    this.state.formAdd["Avatar"]=""; 
    this.state.formAdd["teamId"]="";
  }
    
  /**
   * 
   * @param {*} playerId 
   */
      handleDelete = (playerId) =>{
        // var contador = 0;
        // var arreglo = this.state.jugadores;
        // arreglo.map((registro) => {
        //   if (playerId == registro["id"]) {
        //     arreglo.splice(contador, 1);
        //   }
        //   contador++;
        // });
        // this.setState({ jugadores: arreglo});       
        axios.delete(this.apiPlayerUrl+'/'+playerId)
        //upate 
        this.getPLayers();
        this.forceUpdate();           
      }
    
      /**
       * 
       */
      handleAgregar = () =>{
        this.setState({
          formAdd: {
            ...this.state.formAdd,
            ["id"]: (this.state.jugadores.length) + 1,
          }
        });

        var localcounters  = [...this.state.jugadores];    //clonamos el objeto
        localcounters = localcounters.concat(
          this.state.formAdd
        )
        
        //console.log(localcounters);
        this.setState({jugadores:localcounters});   

        //inicializar los controles del form
        this.inputNuevoNombreRef.current.value = "";
        this.inputNuevoLogoRef.current.value = "";         
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
    
      mostrarEditarJugador=(datosJugador)=>{
        this.setState({formAdd:datosJugador});
        this.setState({modalInsertar:true});    
      }
    
      ocultarEditarJugador=()=>{
        this.setState({modalInsertar:false});    
      }  
    
      // }
    
      /**
       * 
       * @param {*} player 
       */
      handleUpdate = (player) =>{     
        var contador =0;
        var lista = this.state.jugadores;
        lista.map((registro)=>{
          if(player["id"]==registro["id"]){
              lista[contador]["Nombre del Jugador"] = player["Nombre del Jugador"];
              lista[contador]["Avatar"] = player["Avatar"];
              lista[contador]["teamId"] = player["teamId"];
          }
          contador++;
        }
        );
        this.setState({jugadores:lista, modalInsertar: false });
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
        //const apiurlequipos="https://footbal-api.herokuapp.com/teams";
        await fetch(this.apiTeamUrl)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                equipos: json, cargandoEquipos:false    
            });
            
            this.state.formAdd["teamId"]=this.state.equipos[0]["id"]; 
        })        
      }

      async getPLayers(){
          //const apiurl="https://footbal-api.herokuapp.com/players";
          await fetch(this.apiPlayerUrl)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  jugadores: json, cargandoJugadores:false            
              });
          })      
        }
    

    render() { 
      if((this.state.cargandoJugadores)||(this.state.cargandoEquipos)){
        return "Cargando..."
      }
        return (
            <div className="App container">

            {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
            <Form className="alert alert-warning">               
            <Row>
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.jugadores.length+1}/>
              <Col>            
                <Form.Control ref={this.inputNuevoNombreRef} type="text" placeholder="Ingrese Nombre" name="Nombre del Jugador"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control ref={this.inputNuevoLogoRef} type="text" placeholder="Ingrese URL Foto" name="Avatar"    onChange={this.handleChange}/>
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
                        losEquipos ={this.state.equipos}              
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.mostrarEditarJugador} 
                        //onCambio = {this.handleJugadorChange}                   
                    >    
                    </Jugador>
                    )}
              </tbody>
            </table>       

        <Modal show={this.state.modalInsertar} fade={false} >
          <ModalHeader>
            <div>
              <h3>Editar Jugador</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form className="alert alert-warning">
              <Row>
                <Form.Control
                  type="hidden"                  
                  name="id"
                  value={this.state.jugadores.length + 1}
                />
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Nombre del Jugador"
                    value={this.state.formAdd["Nombre del Jugador"]}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Avatar"
                    value={this.state.formAdd["Avatar"]}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                {/* <Form.Control type="text" placeholder="Ingrese Equipo" name="teamId"  onChange={this.handleChange}/> */}

                <select name="teamId" id="teamId" onChange={this.handleChange}>
                {this.state.equipos.map(eq => 
                    <option value={eq["id"]}>{eq["Nombre del equipo"]}</option>
                    )}
              </select>
              </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => this.handleUpdate(this.state.formAdd)}>Actualizar</button>
            <button className="btn btn-danger" onClick={()=>this.ocultarEditarJugador()}>Cancelar</button>
          </ModalFooter>
        </Modal>                         
          </div>            
        );
    }
}
 
export default ControladorJugadores;