import React,{Component} from 'react';
import Equipo from './equipo';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "bootstrap-react";
import {Modal,Form, ModalBody, Row, Col,ModalFooter} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/esm/ModalHeader";

/**
 *Clase que representa un ADMINISTRADOR DE EQUIPO
 *Muestra FORM de busqueda, FORM de nuevo y listado
 */
class ControladorEquipos extends React.Component {

  state ={
    equipos:[],
    ligas:[],
    formAdd: [],
    modalInsertar:false,
    cargandoEquipos: true,
    cargandoLigas:true
  };

    /** 
   * Constructor de clase para inicializar  propiedades
   * @equipos se utiliza para almacenar los datos de la API
   * @formAdd se utiliza para enviar informacion al hacer un UPDATE
   */
  constructor(props){
    super(props);

        //creamos una referencia al INPUT HTML
        this.inputNuevoNombreRef = React.createRef();
        this.inputNuevoLogoRef = React.createRef();
    
        this.state.formAdd["Nombre del equipo"]="";
        this.state.formAdd["id"]=(this.state.equipos.length) + 1;
        this.state.formAdd["Logo del Equipo"]="";  
        //inicializamos con el ID de la primer LIGA
        this.state.formAdd["Liga"]=""
  }

  /**
   * Evento que borra el Equipo con ID @playerId del listado de Equipos
   * @param {String} playerId 
   */
    handleDelete = (equipoId) =>{

      var contador = 0;
      var arreglo = this.state.equipos;
      arreglo.map((registro) => {
        if (equipoId == registro["id"]) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ equipos: arreglo});         
    }
    
    /**
     * Evento que agrega el Equipo cuya información está almacenada en @formAdd al listado de Equipos
     */
    handleAgregar = () =>{
      var cantidad = (this.state.equipos.length) + 1

      this.setState({
        formAdd: {
          ...this.state.formAdd,
          ["id"]: cantidad,
        }
      });

      var localcounters  = [...this.state.equipos];    //clonamos el objeto
      localcounters = localcounters.concat(
        this.state.formAdd
      )

      console.log(this.state.formAdd);
      this.setState({equipos:localcounters});    
      //inicializar los controles del form
      this.inputNuevoNombreRef.current.value = "";
      this.inputNuevoLogoRef.current.value = "";      
    }
    
    /**
     * 
     * @param {Event} e
     */
    handleChange = e =>{      
      //en formAdd se copia el mismo valor previo, pero se actualiza unicamente 
      ///el valor del campo modificado por el evento
      this.setState({
        formAdd:{
          ...this.state.formAdd,
          [e.target.name]: e.target.value
        }
      });
    }
    
    mostrarEditarEquipo=(datosEquipo)=>{
      this.setState({formAdd:datosEquipo});
      this.setState({modalInsertar:true});    
    }
  
    ocultarEditarEquipo=()=>{
      this.setState({modalInsertar:false});    
    }
    
    /**
     * 
     */
    handleBuscar = () =>{
      //deberia FILTRATR 
      if((this.state.formAdd["Nombre del equipo"] =="") & (this.state.formAdd["Liga"] =="")){
        //mostramos todos los equipos
        this.componentDidMount();
      }else{
        const localPlayers = this.state.equipos.filter(p => (p["Nombre del equipo"].includes(this.state.formAdd["Nombre del equipo"])) ||
        (p["Liga"] == this.state.formAdd["Liga"]));
        if(localPlayers.length > 0){
          this.setState({equipos : localPlayers});
        }    
      }
    }

    editar = (dato) => {

      var contador = 0;
      var arreglo = this.state.equipos;
      arreglo.map((registro) => {
        if (dato["id"] == registro["id"]) {
          arreglo[contador]["Nombre del equipo"] = dato["Nombre del equipo"];
          arreglo[contador]["Logo del Equipo"] = dato["Logo del Equipo"];
          arreglo[contador]["Liga"] = dato["Liga"];
  
          // console.log(dato["Identificador"]);
          // console.log(arreglo[contador]["Nombre De La Liga"]);
          // console.log(arreglo[contador]["Logo de la Liga"]);
        }
        contador++;
      });
      this.setState({ equipos: arreglo, modalInsertar: false });
    };

    /**
     * Evento que realiza el GET Api e inicializa el listado de Equipos
     */
    componentDidMount(){
      const apiurl="https://footbal-api.herokuapp.com/teams";
      fetch(apiurl)
      .then((res) => res.json())
      .then((json) => {
          this.setState({
              equipos: json , cargandoEquipos:false                  
          });          
      })         

      //pedimos las ligas para armar los SELECT
      const apiurligas="https://footbal-api.herokuapp.com/leagues";
      fetch(apiurligas)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ligas: json, cargandoLigas: false               
            });
            this.state.formAdd["Liga"]=this.state.ligas[0]["Identificador"]
        })  
    }

    render() { 
        if((this.state.cargandoEquipos)||(this.state.cargandoLigas)){
          return "Cargando...";
        }

        return (
            <div className="App container">

            {/* FORMULARIO PARA AGREGAR UN EQUIPO */}
            <Form className="alert alert-warning">                
            <Row>              
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.equipos.length+1}/>
              <Col>            
                <Form.Control ref={this.inputNuevoNombreRef} type="text" placeholder="Ingrese Nombre" name="Nombre del equipo"  onChange={this.handleChange} />
              </Col>
              <Col>            
                <Form.Control ref={this.inputNuevoLogoRef} type="text" placeholder="Ingrese URL logo" name="Logo del Equipo"    onChange={this.handleChange}/>
              </Col>
              <Col>
                {/* <Form.Control type="text" placeholder="Ingrese Liga" name="Liga"  onChange={this.handleChange}/> */}
                <select name="Liga" id="Liga" onChange={this.handleChange}>
                {this.state.ligas.map(lig => 
                    <option value={lig["Identificador"]}>{lig["Nombre De La Liga"]}</option>
                    )}         
                </select>           
              </Col>
              <Button onClick={this.handleAgregar} variant="warning" type="button" className="col-1 ">
                NUEVO
              </Button>
              </Row>
            </Form>
    
            {/* FORMULARIO PARA BUSCAR UN EQUIPO */}
            <Form className="alert alert-success">                
            <Row>              
                <Form.Control type="hidden" placeholder="" name="id" value={this.state.equipos.length+1}/>              
              <Col>            
                <Form.Control type="text" placeholder="Ingrese Nombre" name="Nombre del equipo"  onChange={this.handleChange} />
              </Col>
              <Col>
                {/* <Form.Control type="text" placeholder="Ingrese Liga" name="Liga"  onChange={this.handleChange}/> */}
                <select name="Liga" id="Liga" onChange={this.handleChange}>
                {this.state.ligas.map(lig => 
                    <option value={lig["Identificador"]}>{lig["Nombre De La Liga"]}</option>
                    )}         
                </select>                 
              </Col>
              <Button onClick={this.handleBuscar} variant="success" type="button" className="col-1 ">
                BUSCAR
              </Button>
              </Row>
            </Form>
    
            <table class="table table-striped custab">
            <thead >    
            <tr>              
              {/* <td >ID</td> */}
              <td >Nombre</td>
              <td >Logo</td>
              <td >Liga</td>
              {/* <div className="col-1">Editar</div> */}
              <td>Acciones</td>
            </tr>
            </thead>
            <tbody>
            {this.state.equipos.map(equipo => 
                    <Equipo 
                        ide={equipo["id"]} 
                        nombre = {equipo["Nombre del equipo"]}
                        logo = {equipo["Logo del Equipo"]}
                        liga = {equipo["Liga"]}  
                        lasLigas ={this.state.ligas}
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.mostrarEditarEquipo} 
                        //onCambio = {this.handleJugadorChange}                   
                    >    
                    </Equipo>
                    )}
            </tbody>
            </table>

          <Modal show={this.state.modalInsertar} fade={false} >
          <ModalHeader>
            <div>
              <h3>Editar Equipo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form className="alert alert-warning">
              <Row>
                <Form.Control
                  type="hidden"                  
                  name="id"
                  value={this.state.ligas.length + 1}
                />
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Nombre del equipo"
                    value={this.state.formAdd["Nombre del equipo"]}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Logo del Equipo"
                    value={this.state.formAdd["Logo del Equipo"]}
                    onChange={this.handleChange}
                  />
                </Col>
                {/* AGREGAR <SELECT></SELECT> */}

              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => this.editar(this.state.formAdd)}>Actualizar</button>
            <button className="btn btn-danger" onClick={()=>this.ocultarEditarEquipo()}>Cancelar</button>
          </ModalFooter>
        </Modal>            
          </div>            
        );
    }
}
 
export default ControladorEquipos;