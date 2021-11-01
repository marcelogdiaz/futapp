import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 * 
 */
class Liga extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.state ={
        formAdd: {
            "Nombre De La Liga":this.props["Nombre De La Liga"],
            "Identificador":this.props["Identificador"],
            "Logo de la Liga":this.props["Logo de la Liga"]
          }
        }
    }

    /**
     * 
     * @param {*} event 
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
                <td ><input  type="text" name="Identificador"   readOnly   value={this.props.idl}       onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td ><input  type="text" name="Nombre De La Liga"  value={this.props.nombre}   onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td ><img  src={this.props.logo} width="50" height="50"/></td>
                {/* <input className="col-3" type="text" name="Logo de la Liga"    value={this.props.logo}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>                 */}
                <td ><Button onClick={()=>this.props.onUpdate(this)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.idl)} className="btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Liga;