import React,{Component} from 'react';
import Equipo from './equipo';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Navbar,Form, Container, Row, Col,NavDropdown, Nav} from 'react-bootstrap';

class Equipos extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      equipos:[],
      formAdd: {
        "Nombre del equipo":this.props["Nombre del equipo"],
        "id":this.props["id"],
        "Logo del Equipo":this.props["Logo del Equipo"],
        "Liga":this.props["Liga"]
      }
    };
}
    
      handleDelete = (playerId) =>{
        // borrar por ID, no por NOMBRE
        const localPlayers = this.state.equipos.filter(p => p["id"] !== playerId);
        this.setState({equipos : localPlayers});
      }
    
      handleAgregar = () =>{
        var localcounters  = [...this.state.equipos];    //clonamos el objeto
        localcounters = localcounters.concat(
          this.state.formAdd
        )
        
        console.log(localcounters);
        this.setState({equipos:localcounters});    
      }
    
      handleChange = e =>{
        console.log(e);    
        //en formAdd se copia el mismo valor previo, pero se actualiza unicamente 
        ///el valor del campo modificado por el evento
        this.setState({
          formAdd:{
            ...this.state.formAdd,
            [e.target.name]: e.target.value
          }
        });
      }
    
      handleJugadorChange = j =>{
        console.log(j);    
        //copiamos el estado modificado por el evento changes
        this.setState({
          formAdd:{...j.state.formAdd}
        });    
    
      }
    
      handleUpdate = (player) =>{
        // //agregamos si coincide con el ID 
        // var localcounters  = [...this.state.equipos];    //clonamos el objeto
        // //buscamos el jusgador con ID=playerId y lo modificamos con los valores de formAdd
        // const localPlayers = this.state.equipos.filter(p => (p.ide == playerId));
    
        // //actualizamos el listado gral de equipos
        // this.setState({equipos:localcounters});    
    
        var contador =0;
        var lista = this.state.equipos;
        lista.map((registro)=>{
          if(player["id"]==registro.ide){
              lista[contador]["Nombre del equipo"] = this.formAdd["Nombre del equipo"];
              lista[contador]["Logo del Equipo"] = this.formAdd["Logo del Equipo"];
              lista[contador]["Liga"] = this.formAdd["Liga"];
          }
          contador++;
        }
        );
        this.setState({equipos:lista});
      }
    
      handleBuscar = () =>{
        //deberia FILTRATR 
        if((this.state.formAdd["Nombre del equipo"] =="") & (this.state.formAdd["Liga"] =="")){
          //mostramos todos los equipos
                       
        }else{
          const localPlayers = this.state.equipos.filter(p => (p["Nombre del equipo"] == this.state.formAdd["Nombre del equipo"]) ||
          (p["Liga"] == this.state.formAdd["Liga"]));
          if(localPlayers.length > 0){
            this.setState({equipos : localPlayers});
          }    
        }
      }

      componentDidMount(){
        const apiurl="https://footbal-api.herokuapp.com/teams";
        fetch(apiurl)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                equipos: json                    
            });
        })         
    }

    render() { 
        return (
            <div className="App">

            {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
            <Form>  
              <Row>Nuevo Equipo</Row>
            <Row>
              <Col>    
                <Form.Control type="text" placeholder="" name="id" value={this.state.equipos.length+1}/>
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del equipo"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese logo" name="Logo del Equipo"    onChange={this.handleChange}/>
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Ingrese Liga" name="Liga"  onChange={this.handleChange}/>
              </Col>
              <Button onClick={this.handleAgregar} variant="primary" type="button" className="col-1 btn success">
                NUEVO
              </Button>
              </Row>
            </Form>
    
            {/* FORMULARIO PARA BUSCAR UN JUGADOR */}
            <Form>  
              <Row>BUSCAR Equipo</Row>
            <Row>
              <Col>    
                <Form.Control type="text" placeholder="" name="id" value={this.state.equipos.length+1}/>
              </Col>
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del equipo"  onChange={this.handleChange} />
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Ingrese Liga" name="Liga"  onChange={this.handleChange}/>
              </Col>
              <Button onClick={this.handleBuscar} variant="primary" type="button" className="col-1 btn success">
                BUSCAR
              </Button>
              </Row>
            </Form>
    
    
            <div className="row">                
              <div className="col-1">ID</div>
              <div className="col-3">Nombre</div>
              <div className="col-3">logo</div>
              <div className="col-3">Liga</div>
              {/* <div className="col-1">Editar</div> */}
              <div className="col-1">Acciones</div>
            </div>
    
            {this.state.equipos.map(equipo => 
                    <Equipo 
                        ide={equipo["id"]} 
                        nombre = {equipo["Nombre del equipo"]}
                        logo = {equipo["Logo del Equipo"]}
                        liga = {equipo["Liga"]}  
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.handleUpdate} 
                        onCambio = {this.handleJugadorChange}                   
                    >    
                    </Equipo>
                    )}
          </div>            
        );
    }
}
 
export default Equipos;