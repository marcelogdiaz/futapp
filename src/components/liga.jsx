import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 * 
 */
class Liga extends React.Component {    

    state = {
        formAdd :[]
    }
    /**
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);

        //esto anda bien para actualizar el INPUT
        //inicializamos el estado con lo que viene del padre
        this.state.formAdd["Nombre De La Liga"]=this.props.nombre;
        this.state.formAdd["Identificador"]=this.props.idl;
        this.state.formAdd["Logo de la Liga"]=this.props.logo;        
        //console.log("CONSTRUCTOR: "+this.state.formAdd);
    }

    /**
     * 
     * @param {*} event 
     */
    actualizarInput(value) {
        //ok
        //console.log("Valor liga: "+value);
        this.setState({
            formAdd:{
              ...this.state.formAdd,
              //
              ["Nombre De La Liga"]: value
            }
          });
    }

    render() {         
        return  (           
            <tr key={this.props.idl}>
                <td ><input  type="hidden" name="Identificador"   readOnly   value={this.props.idl} />
                <input  type="text" name="Nombre De La Liga"  value={this.props.nombre}  onChange={e =>  {this.actualizarInput(e.target.value);}}/></td>               
                <td ><img  src={this.props.logo} width="50" height="50"/></td>                
                <td ><Button onClick={()=>this.props.onEditarLiga(this.state.formAdd)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onBorrarLiga(this.props.idl)} className="btn btn-danger">Borrar</Button>                           
                </td>
            </tr>
        )
        ;
    }
}
 
export default Liga;