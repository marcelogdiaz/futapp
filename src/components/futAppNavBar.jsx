import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Form, Container, Row, Col,NavDropdown, Nav} from 'react-bootstrap';

/**
 * Clase para graficar la Barra de Navegacion
 */
class FutAppNavBar extends React.Component {
    state ={
            url:'Ligas'
    }

    constructor(props){
        super(props);
    }

    changeUrl(url){
        this.state.url = url;
    }

    render() { 
        return (
            <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">FutApp</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link onClick={() =>  {this.changeUrl("Ligas")}} href="/Ligas">Ligas</Nav.Link>
                  <Nav.Link onClick={() =>  {this.changeUrl("Equipos")}} href="/Equipos">Equipos</Nav.Link>
                  <Nav.Link onClick={() =>  {this.changeUrl("Jugadores")}} href="/Jugadores">Jugadores</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
    }
}
 
export default FutAppNavBar;