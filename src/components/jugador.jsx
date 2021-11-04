import { Button} from "bootstrap-react";
import React,{Component} from "react";

/**
 * 
 */
class Jugador extends React.Component {

  state = {
    formAdd :[]
}
  /**
   * 
   * @param {*} props 
   */
  constructor(props){        
      super(props);
      this.state.formAdd["Nombre del Jugador"]=this.props.nombre;
      this.state.formAdd["id"]=this.props.idj;
      this.state.formAdd["Avatar"]=this.props.foto;        
      this.state.formAdd["teamId"]=this.props.equipo;        
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
                <input  type="text" name="Nombre del Jugador"  value={this.props.nombre}   onChange={e =>  {this.changeText(e);}}/></td>
                <td><img  src={this.props.foto} width="50" height="50"/></td>
                {/* <input className="col-3" type="text" name="Avatar"    value={this.props.foto}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/> */}
                <td><input type="text" name="teamId"  value= {this.props.equipo}  onChange={e =>  {this.changeText(e);}}/></td>
                <td><Button onClick={()=>this.props.onUpdate(this.state.formAdd)} className=" btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.idj)} className=" btn btn-danger">Borrar</Button></td>
            </tr>
        )
        ;
    }
}
 
export default Jugador;