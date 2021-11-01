import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 *Clase que representa un EQUIPO - Muestra un ROW con informacion del mismo
 */ 
class Equipo extends React.Component {

  /** 
   * Constructor de clase para inicializar  propiedades
   * @formAdd se utiliza para enviar informacion al hacer un UPDATE
   */
    constructor(props){
        super(props);
        this.state ={            
            formAdd: {
              "Nombre del equipo":this.props["Nombre del equipo"],
              "id":this.props["id"],
              "Logo del Equipo":this.props["Logo del Equipo"],
              "Liga":this.props["Liga"]
            }
          };
    }

    /**
     * Evento que sirve para almacenar en @formAdd el valor actualizado
     */
    changeText(event) {
        //this.setState({mievento: event});
        this.setState({
            formAdd:{
              ...this.state.formAdd,
              [event.target.name]: event.target.value
            }
          });
    }

    render() { 
        return  (           
            <tr >
                <td><input type="text" name="id"   readOnly   value={this.props.ide}       onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><input  type="text" name="Nombre del equipo"  value={this.props.nombre}   onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><img  src={this.props.logo} width="50" height="50"/></td>
                {/* <input className="col-3" type="text" name="Logo del Equipo"    value={this.props.logo}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/> */}
                <td><input  type="text" name="Liga"  value= {this.props.liga}  onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><Button onClick={()=>this.props.onUpdate(this)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.ide)} className=" btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Equipo;