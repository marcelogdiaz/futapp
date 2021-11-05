import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 *Clase que representa un EQUIPO - Muestra un ROW con informacion del mismo
 */ 
class Equipo extends React.Component {

  state = {
    formAdd:[]
  }
  /** 
   * Constructor de clase para inicializar  propiedades
   * @formAdd se utiliza para enviar informacion al hacer un UPDATE
   */
    constructor(props){
        super(props);

        this.inputNuevoNombreRef = React.createRef();

        this.state.formAdd["Nombre del equipo"]=this.props.nombre;
        this.state.formAdd["id"]=this.props.ide;
        this.state.formAdd["Logo del Equipo"]=this.props.logo; 
        this.state.formAdd["Liga"]=this.props.liga; 
    }

    /**
     * Evento que sirve para almacenar en @formAdd el valor actualizado
     */
    changeText(event) {
        this.setState({
            formAdd:{
              ...this.state.formAdd,
              [event.target.name]: event.target.value
            }
          });
    }

    cargarValor(eq) {

        this.inputNuevoNombreRef.current.value = (this.props.lasLigas.filter(l => l["Identificador"] === eq.formAdd["Liga"]))["Nombre De La Liga"];      
        this.inputNuevoNombreRef.current.value = eq.formAdd["Liga"]

        console.log(eq.formAdd["Liga"])
  }

    render() { 
      console.log(this.props.liga);
      console.log(this.props.lasLigas);
        return  (           
            <tr key={this.props.ide}>
                <td><input type="hidden" name="id"   readOnly   value={this.props.ide} />
                <input  type="text" name="Nombre del equipo" readOnly  value={this.props.nombre} /></td>
                <td><img  src={this.props.logo} width="50" height="50"/></td>                
                {/* <td><input  type="text" name="Liga" readOnly value= {this.props.liga}/></td> */}
                {/* <td><input type="text" name="Liga" ref={this.inputNuevoNombreRef} readOnly value="a" onLoad={e => {this.cargarValor(this.state.formAdd)}} /></td>                 */}
                <td><input type="text" name="Liga"  readOnly value= { (this.props.lasLigas.filter(l => l["Identificador"] === this.props.liga))[0]["Nombre De La Liga"]} /></td>                
                <td><Button onClick={()=>this.props.onUpdate(this.state.formAdd)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.ide)} className=" btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Equipo;