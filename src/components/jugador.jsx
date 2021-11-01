import { Button} from "bootstrap-react";
import React,{Component} from "react";
import Equipos from "./equipos";

class Jugador extends React.Component {
    
    // state ={
    //     formAdd:{
    //         idj:'',
    //         nombre:'',
    //         foto:'',
    //         equipo:''
    //       }
    // }

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
            <div className="row">
                <input className="col-1" type="text" name="id"     value={this.props.idj}      onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="Nombre del Jugador"  value={this.props.nombre}   onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="Avatar"    value={this.props.foto}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="teamId"  value= {this.props.equipo}  onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <Button onClick={()=>this.props.onUpdate(this)} className="col-1 btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.idj)} className="col-1 btn btn-danger">Borrar</Button>
            </div>
        )
        ;
    }
}
 
export default Jugador;