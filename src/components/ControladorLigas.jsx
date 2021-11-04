import React, { Component } from "react";
import Liga from "./liga";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap-react";
import {
  Navbar,
  Form,
  Container,
  Row,
  Col,
  NavDropdown,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

/**
 *
 */
class ControladorLigas extends React.Component {

  state = {
    data: "",
    ligas: [], //,
    formAdd: [],
    modalInsertar:false
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
    this.state.formAdd["Identificador"]="";
    this.state.formAdd["Logo de la Liga"]="";     
  }

  /**
   * Permite eliminar la liga cuyo Identificador es @ligaId
   * @param {*} ligaId
   */
  handleBorrarLiga = (ligaId) => {
    var contador = 0;
    var arreglo = this.state.ligas;
    arreglo.map((registro) => {
      if (ligaId == registro["Identificador"]) {
        arreglo.splice(contador, 1);
      }
      contador++;
    });
    this.setState({ ligas: arreglo});    
  };

  /**
   * Agregamos una nueva LIGA al listado de LIGAS con los valores que tiene la PROP @formAdd
   */
  handleNuevaLiga = (e) => {
    var localcounters = [...this.state.ligas]; //clonamos el objeto
    localcounters = localcounters.concat(this.state.formAdd);
    this.setState({ ligas: localcounters });

    //inicializar los controles del form
    this.inputNuevoNombreRef.current.value = "";
    this.inputNuevoLogoRef.current.value = "";
  };

  /**
   * Permite actualizar la PROP @formAdd con el valor que cambió del INPUT
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

  mostrarEditarLiga=(datosLiga)=>{s
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

    var contador = 0;
    var arreglo = this.state.ligas;
    arreglo.map((registro) => {
      if (dato["Identificador"] == registro["Identificador"]) {
        arreglo[contador]["Nombre De La Liga"] = dato["Nombre De La Liga"];
        arreglo[contador]["Logo de la Liga"] = dato["Logo de la Liga"];

        // console.log(dato["Identificador"]);
        // console.log(arreglo[contador]["Nombre De La Liga"]);
        // console.log(arreglo[contador]["Logo de la Liga"]);
      }
      contador++;
    });
    this.setState({ ligas: arreglo, modalInsertar: false });
  };

  /**
   *
   */
  async componentDidMount() {
    const apiurl = "https://footbal-api.herokuapp.com/leagues";
    await fetch(apiurl)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          ligas: json,
        });
      });
  }

  render() {
    return (
      <div className="App container">
        {/* FORMULARIO PARA AGREGAR UN JUGADOR */}
        <Form className="alert alert-warning">
          <Row>
            <Form.Control
              type="hidden"
              placeholder=""
              name="Identificador"
              value={this.state.ligas.length + 1}
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

        {/* FORMULARIO PARA BUSCAR UN JUGADOR */}
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
      </div>
    );
  }
}

export default ControladorLigas;
