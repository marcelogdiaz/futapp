import React,{Component} from 'react';
import Liga from './liga';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Navbar,Form, Container, Row, Col,NavDropdown, Nav} from 'react-bootstrap';

/**
 * 
 */
class Ligas extends React.Component {

  /**
   * 
   * @param {*} props 
   */
    constructor(props){
      super(props);

      this.state ={
        ligas:[],
        formAdd: {
          "Nombre De La Liga":this.props["Nombre De La Liga"],
          "Identificador":this.props["Identificador"],
          "Logo de la Liga":this.props["Logo de la Liga"]
        }
      };
  }
    
  /**
   * 
   * @param {*} playerId 
   */
      handleDelete = (playerId) =>{
        // borrar por ID, no por NOMBRE
        //const localPlayers = this.state.ligas.filter(p => p.idl !== playerId);
        const localPlayers = this.state.ligas.filter(p => p["Identificador"] !== playerId);
        this.setState({ligas : localPlayers});
      }
    
      /**
       * 
       */
      handleAgregar = () =>{
        var localcounters  = [...this.state.ligas];    //clonamos el objeto
        localcounters = localcounters.concat(
          this.state.formAdd
        )
        
        //console.log(localcounters);
        this.setState({ligas:localcounters});    
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
        // var localcounters  = [...this.state.ligas];    //clonamos el objeto
        // //buscamos el jusgador con ID=playerId y lo modificamos con los valores de formAdd
        // const localPlayers = this.state.ligas.filter(p => (p.idl == playerId));
    
        // //actualizamos el listado gral de ligas
        // this.setState({ligas:localcounters});    
    
        var contador =0;
        var lista = this.state.ligas;
        lista.map((registro)=>{
          // if(player.idl==registro.idl){
          //     lista[contador].nombre = this.formAdd.nombre;
          //     lista[contador].logo = this.formAdd.logo;              
          // }
          if(player["Identificador"]==registro["Identificador"]){
            lista[contador]["Nombre De La Liga"] = this.formAdd["Nombre De La Liga"];
            lista[contador]["Logo de la Liga"] = this.formAdd["Logo de la Liga"];              
        }
          contador++;
        }
        );
        this.setState({ligas:lista});
      }
    
      /**
       * 
       */
      handleBuscar = () =>{
        //deberia FILTRATR 
        if((this.state.formAdd["Nombre De La Liga"] =="")){//if((this.state.formAdd.nombre =="")){
          //mostramos todos los ligas
                       
        }else{
          const localPlayers = this.state.ligas.filter(p => (p["Nombre De La Liga"] == this.state.formAdd["Nombre De La Liga"]));
          if(localPlayers.length > 0){
            this.setState({ligas : localPlayers});
          }    
        }
      }

      /**
       * 
       */
      componentDidMount(){
        const apiurl="https://footbal-api.herokuapp.com/leagues";

          fetch(apiurl)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    ligas: json                    
                });
            })          
    }

    render() { 
        return (
            <div className="App">

            {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
            <Form>  
              <Row>Nueva Liga</Row>
            <Row>              
                <Form.Control type="hidden" placeholder="" name="Identificador" value={this.state.ligas.length+1}/>              
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre De La Liga"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese URL logo" name="Logo de la Liga"   onChange={this.handleChange}/>
              </Col>
              <Button onClick={this.handleAgregar} variant="primary" type="button" className="col-1 btn success">
                NUEVO
              </Button>
              </Row>
            </Form>
    
            {/* FORMULARIO PARA BUSCAR UN JUGADOR */}
            <Form>  
              <Row>BUSCAR Liga</Row>
            <Row>                
                <Form.Control type="hidden" placeholder="" name="Identificador" value={this.state.ligas.length+1}/>              
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre De La Liga"  onChange={this.handleChange} />
              </Col>
              <Button onClick={this.handleBuscar} variant="primary" type="button" className="col-1 btn success">
                BUSCAR
              </Button>
              </Row>
            </Form>
    
    
            <div className="row">                
              <div className="col-1">ID</div>
              <div className="col-3">Nombre</div>
              <div className="col-1">logo</div>
              {/* <div className="col-1">Editar</div> */}
              <div className="col-1">Acciones</div>
            </div>
    
            {this.state.ligas.map(liga => 
                    <Liga 
                        idl={liga["Identificador"]} 
                        nombre = {liga["Nombre De La Liga"]}
                        logo = {liga["Logo de la Liga"]}                                         
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.handleUpdate} 
                        onCambio = {this.handleJugadorChange}                   
                    >    
                    </Liga>
                    )}
          </div>            
        );
    }
}
 
export default Ligas;