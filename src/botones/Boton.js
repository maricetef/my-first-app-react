
import "./MyBoton.css";

export default function Boton(props) {
 
 
 
  return(

   <button value={props.name} onClick= {props.myOnClick}>
    {props.name}
   </button>
  )

   
}