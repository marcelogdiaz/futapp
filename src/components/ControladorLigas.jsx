import React, { Component } from "react";
import Liga from "./liga";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap-react";
import {
  Card,
  Form,
  Badge,
  Row,
  Col,
  CardGroup,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from 'axios';

/**
 *
 */
class ControladorLigas extends React.Component {

   //apiLeaguesUrl = "https://footbal-api.herokuapp.com/leagues";  
   //apiTeamUrl = "https://footbal-api.herokuapp.com/teams";
   //apiPlayerUrl="https://footbal-api.herokuapp.com/players";  

   //json-server --id Identificador --watch ligasDB.json --p 3001

  apiLeaguesUrl = "http://localhost:3001/localLigas"//"https://footbal-api.herokuapp.com/leagues";
  apiTeamUrl = "http://localhost:3002/localEquipos"//"https://footbal-api.herokuapp.com/teams";  
  apiPlayerUrl="http://localhost:3003/localJugadores"//"https://footbal-api.herokuapp.com/players";  

  state = {
    data: "",
    ligas: [],
    equipos:[],
    formAdd: [],
    modalInsertar:false,
    modalVer:false,
    cargandoLigas:true,
    cargandoEquipos:true
  };

  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    //creamos una referencia al INPUT HTML
    this.inputNuevoNombreRef = React.createRef();
    this.inputNuevoLogoRef = React.createRef();

    this.state.formAdd["Nombre De La Liga"]="";
    this.state.formAdd["Identificador"]=(this.state.ligas.length) + 1;
    this.state.formAdd["Logo de la Liga"]="";     
  }

  /**
   * Permite eliminar la liga cuyo Identificador es @ligaId
   * @param {*} ligaId
   */
  handleBorrarLiga = (ligaId) => {

    //alert("BORRO: "+ligaId);

    // var contador = 0;
    // var arreglo = this.state.ligas;
    // arreglo.map((registro) => {
    //   if (ligaId == registro["Identificador"]) {
    //     arreglo.splice(contador, 1);
    //   }
    //   contador++;
    // });
    // this.setState({ ligas: arreglo});  

    axios.delete(this.apiLeaguesUrl+'/'+ligaId).then(response=>{
      //console.log(response);
      //upate 
      this.getLigas();      
      this.forceUpdate();   

      //realizar un DELETE ON CASCADE
    }).catch(error=>{
      console.log(error.message);
    })        
  };

  /**
   * Agregamos una nueva LIGA al listado de LIGAS con los valores que tiene la PROP @formAdd
   */
  handleNuevaLiga = (e) => {

    this.setState({
      formAdd: {
        ...this.state.formAdd,
        ["Identificador"]: (this.state.ligas.length) + 1,
      }
    });

    // var localcounters = [...this.state.ligas]; //clonamos el objeto
    // localcounters = localcounters.concat(this.state.formAdd);
    // this.setState({ ligas: localcounters });

    axios.post(this.apiLeaguesUrl,this.state.formAdd).then(response=>{
      //inicializar los controles del form
      this.inputNuevoNombreRef.current.value = "";
      this.inputNuevoLogoRef.current.value = "";

      //upate 
      this.getLigas();      
      this.forceUpdate();   
    }).catch(error=>{
      console.log(error.message);
    })
  };

  /**
   * Permite actualizar la PROP @formAdd con el valor que cambi?? del INPUT
   * @param {*} e
   */
  handleChange = (e) => {
    //console.log(e);
    //en formAdd se copia el mismo valor previo, pero se actualiza unicamente
    ///el valor del campo modificado por el evento
    this.setState({
      formAdd: {
        ...this.state.formAdd,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarVerLiga=(datosLiga)=>{
    this.setState({formAdd:datosLiga});
    this.setState({modalVer:true});    
  }

  ocultarVerLiga=()=>{
    this.setState({modalVer:false});    
  }

  mostrarEditarLiga=(datosLiga)=>{
    this.setState({formAdd:datosLiga});
    this.setState({modalInsertar:true});    
  }

  ocultarEditarLiga=()=>{
    this.setState({modalInsertar:false});    
  }

  /**
   *
   */
  handleBuscarLiga = () => {
    //deberia FILTRATR
    if (this.state.formAdd["Nombre De La Liga"] == "") {
      //if((this.state.formAdd.nombre =="")){
      //mostramos todos los ligas
      this.componentDidMount();
    } else {
      const localPlayers = this.state.ligas.filter((p) =>
        p["Nombre De La Liga"].includes(this.state.formAdd["Nombre De La Liga"])
      );
      if (localPlayers.length > 0) {
        this.setState({ ligas: localPlayers });
      }
    }
  };

  editar = (dato) => {

    // var contador = 0;
    // var arreglo = this.state.ligas;
    // arreglo.map((registro) => {
    //   if (dato["Identificador"] == registro["Identificador"]) {
    //     arreglo[contador]["Nombre De La Liga"] = dato["Nombre De La Liga"];
    //     arreglo[contador]["Logo de la Liga"] = dato["Logo de la Liga"];

    //     // console.log(dato["Identificador"]);
    //     // console.log(arreglo[contador]["Nombre De La Liga"]);
    //     // console.log(arreglo[contador]["Logo de la Liga"]);
    //   }
    //   contador++;
    // });
    // this.setState({ ligas: arreglo, modalInsertar: false });

    axios.patch(this.apiLeaguesUrl+"/"+dato["Identificador"],dato).then(response=>{
      this.setState({ modalInsertar: false });
      //upate 
      this.getLigas();      
      this.forceUpdate();        
    }).catch(error=>{
      console.log(error.message);
    })
  };

  async getLigas(){
    await fetch(this.apiLeaguesUrl)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          ligas: json,cargandoLigas:false
        });
      });    
  }

  async  getPLayers(){
    //const apiEquipourl = "https://footbal-api.herokuapp.com/teams";
    await fetch(this.apiTeamUrl)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          equipos: json,cargandoEquipos:false
        });
      });
  }
  /**
   *
   */
   componentDidMount() {
    //const apiLeaguesUrl = "https://footbal-api.herokuapp.com/leagues";
    this.getLigas();
    this.getPLayers();
  }

  render() {
    if((this.state.cargandoEquipos)||(this.state.cargandoLigas)){
      return "Cargando..."
    }
    return (
      <div className="App container">
        {/* FORMULARIO PARA AGREGAR UNA LIGA */}
        <Form className="alert alert-warning">
          <Row>
            <Form.Control
              type="hidden"
              placeholder=""
              name="Identificador"
              value={(this.state.ligas.length) + 1}
            />
            <Col>
              <Form.Control
                ref={this.inputNuevoNombreRef}
                type="text"
                placeholder="Ingrese Nombre"
                name="Nombre De La Liga"
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                ref={this.inputNuevoLogoRef}
                type="text"
                placeholder="Ingrese URL logo"
                name="Logo de la Liga"
                onChange={this.handleChange}
              />
            </Col>
            <Button
              onClick={this.handleNuevaLiga}
              variant="warning"
              type="button"
              className="col-1  "
            >
              NUEVO
            </Button>
          </Row>
        </Form>

        {/* FORMULARIO PARA BUSCAR UNA LIGA */}
        <Form className="alert alert-success">
          <Row>
            <Form.Control
              type="hidden"
              placeholder=""
              name="Identificador"
              value={this.state.ligas.length + 1}
            />
            <Col>
              <Form.Control
                type="text"
                placeholder="Ingrese Nombre"
                name="Nombre De La Liga"
                onChange={this.handleChange}
              />
            </Col>
            <Button
              onClick={this.handleBuscarLiga}
              variant="success"
              type="button"
              className="col-1 "
            >
              BUSCAR
            </Button>
          </Row>
        </Form>

        <table className="table table-striped custab">
          <thead>
            <tr>
              {/* <td>ID</td> */}
              <td>Nombre</td>
              <td>Logo</td>
              {/* <div className="col-1">Editar</div> */}
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {this.state.ligas.map((liga) => (
              //especificamos las PROPS que va a usar LIGA
              <Liga
                idl={liga["Identificador"]}
                nombre={liga["Nombre De La Liga"]}
                logo={liga["Logo de la Liga"]}
                onBorrarLiga={this.handleBorrarLiga}
                onEditarLiga={this.mostrarEditarLiga}              
                onVerLiga={this.mostrarVerLiga}        
              ></Liga>
            ))}
          </tbody>
        </table>

        <Modal show={this.state.modalInsertar} fade={false} >
          <ModalHeader>
            <div>
              <h3>Editar Liga</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form className="alert alert-warning">
              <Row>
                <Form.Control
                  type="hidden"                  
                  name="Identificador"
                  value={this.state.ligas.length + 1}
                />
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Nombre De La Liga"
                    value={this.state.formAdd["Nombre De La Liga"]}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control                    
                    type="text"                    
                    name="Logo de la Liga"
                    value={this.state.formAdd["Logo de la Liga"]}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => this.editar(this.state.formAdd)}>Actualizar</button>
            <button className="btn btn-danger" onClick={()=>this.ocultarEditarLiga()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal show={this.state.modalVer} fade={false} >
          <ModalHeader>
            <div>
              <h3>{this.state.formAdd["Nombre De La Liga"]}</h3>
            </div>
            <Button variant="primary">Equipos 
                  <Badge pill bg="secondary">{                  
                    this.state.equipos.filter((p) =>p["Liga"]==this.state.formAdd["Identificador"]).length
                  }</Badge>                  
            </Button>
            <Button className="btn btn-danger" onClick={()=>this.ocultarVerLiga()}>Cerrar</Button>                        
          </ModalHeader>
          <ModalBody>
            <Card>              
              <Card.Body>
                <Card.Img variant="top" src={this.state.formAdd["Logo de la Liga"]} data-src="holder.js/100px160s"/>
                {/* <table>
            <tbody>
            {this.state.equipos.map(equipo => 
                    <Equipo 
                        ide={equipo["id"]} 
                        nombre = {equipo["Nombre del equipo"]}
                        logo = {equipo["Logo del Equipo"]}
                        liga = {equipo["Liga"]}  
                        lasLigas ={this.state.equipos.ligas}
                        onDelete = {this.handleDelete}     
                        onUpdate = {this.mostrarEditarEquipo} 
                        //onCambio = {this.handleJugadorChange}                   
                    >    
                    </Equipo>
                  )}
            </tbody>
            </table>                         */}
              </Card.Body>
            </Card>                       
          </ModalBody>
        </Modal>        
      </div>
    );
  }
}

export default ControladorLigas;
