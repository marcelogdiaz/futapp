import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 * 
 */
class Jugador extends React.Component {

  /**
   * 
   * @param {*} props 
   */
  constructor(props){        
      super(props);
      this.state ={            
          formAdd: {
            "Nombre del Jugador":this.props["Nombre del Jugador"],
            "id":this.props["id"],
            "Avatar":this.props["Avatar"],
            "teamId":this.props["teamId"]
          }
        };
  }

  /**
   * 
   */
  changeText(event) {
      this.setState({
          formAdd:{
            ...this.state.formAdd,
            [event.target.name]: event.target.value
          }
        });
  }

    render() { 
        return  (           
            <tr>
                <td><input type="hidden" name="id"  readOnly   value={this.props.idj} />
                  <input  type="text" name="Nombre del Jugador"  value={this.props.nombre}   onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><img  src={this.props.foto} width="50" height="50"/></td>
                {/* <input className="col-3" type="text" name="Avatar"    value={this.props.foto}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/> */}
                <td><input type="text" name="teamId"  value= {this.props.equipo}  onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/></td>
                <td><Button onClick={()=>this.props.onUpdate(this)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.idj)} className=" btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Jugador;