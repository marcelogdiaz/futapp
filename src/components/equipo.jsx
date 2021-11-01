import { Button} from "bootstrap-react";
import React,{Component} from "react";

class Equipo extends React.Component {
    
    // state ={
    //     formAdd:{
    //         ide:'',
    //         nombre:'',
    //         logo:'',
    //         liga:''
    //       }
    // }

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
            <div className="row">
                <input className="col-1" type="text" name="id"      value={this.props.ide}       onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="Nombre del equipo"  value={this.props.nombre}   onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="Logo del Equipo"    value={this.props.logo}     onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <input className="col-3" type="text" name="Liga"  value= {this.props.liga}  onChange={() =>  {this.changeText(window.event);this.props.onCambio(this)}}/>
                <Button onClick={()=>this.props.onUpdate(this)} className="col-1 btn btn-secondary">Editar</Button>{"  "}
                <Button onClick={()=>this.props.onDelete(this.props.ide)} className="col-1 btn btn-danger">Borrar</Button>
            </div>
        )
        ;
    }
}
 
export default Equipo;