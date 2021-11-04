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

        this.state.formAdd["Nombre del equipo"]=this.props.nombre;
        this.state.formAdd["id"]=this.props.ide;
        this.state.formAdd["Logo del Equipo"]=this.props.logo; 
        this.state.formAdd["Liga"]=this.props.liga; 
        // this.state ={            
        //     formAdd: {
        //       "Nombre del equipo":this.props["Nombre del equipo"],
        //       "id":this.props["id"],
        //       "Logo del Equipo":this.props["Logo del Equipo"],
        //       "Liga":this.props["Liga"]
        //     }
        //   };
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
            <tr key={this.props.ide}>
                <td><input type="hidden" name="id"   readOnly   value={this.props.ide} />
                <input  type="text" name="Nombre del equipo"  value={this.props.nombre}   onChange={e =>  {this.changeText(e);}}/></td>
                <td><img  src={this.props.logo} width="50" height="50"/></td>
                {/* <input className="col-3" type="text" name="Logo del Equipo"    value={this.props.logo}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/> */}
                <td><input  type="text" name="Liga"  value= {(typeof this.props.lasLigas !== 'undefined') ? this.props.lasLigas.filter(l => l["Identificador"] === this.props.liga): this.props.liga}  onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><Button onClick={()=>this.props.onUpdate(this.state.formAdd)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.ide)} className=" btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Equipo;