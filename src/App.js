
import React, { useState } from 'react';
import './App.css';
import Boton from './botones/Boton';
import operacionAritmetica from './helpers/OperacionAritmetica'

function App() {
  let panelBotonesNum = [];
  let panelBotonesSimb = [];
  let panelBotonesLim = [];
  const nombreBtnOperacion = ["+", "-", "*", "/", "="];
  const nombreBtnLimpiar = ["CE", "C", "<-"];
  /*{nombreBtnOperacion.map(el=>{<Boton key={el} name= {el}/>})} no me funciona*/
  let [datos, setDatos] = useState({
    datosArriba: "",
    datosAbajo: "0"
  });
  let todosDatos = "";



  const handleClick = (evt) => {
    evt.preventDefault();
    //Operadores especiales
    if (evt.target.value === "C") {

      setDatos({
        datosArriba: "",
        datosAbajo: "0"
      });
    } else if (evt.target.value === "CE") {

      setDatos({
        ...datos,
        datosAbajo: "0"
      });

    } else if (evt.target.value === "<-") {

      todosDatos = datos.datosAbajo.substring(0, datos.datosAbajo.length - 1);
      if (todosDatos.length === 0)
        todosDatos = "0";
      setDatos({
        ...datos,
        datosAbajo: todosDatos
      });

    }
    else if (evt.target.value === "=") {
      todosDatos = operacionAritmetica(datos.datosAbajo, datos.datosArriba);
      setDatos({
        datosArriba: "",
        datosAbajo: todosDatos
      });

    }//Caso inicial solo permite escribir abajo cualquier numero
    else if (datos.datosAbajo === "0" && datos.datosArriba === "") {
      if (evt.target.value !== "+" && evt.target.value !== "-" && evt.target.value !== "*" && evt.target.value !== "/") {
        todosDatos = evt.target.value
        setDatos({
          ...datos,
          datosAbajo: todosDatos
        });
      }
      //Cuando abajo hay numero y arriba esta vacio
    } else if (datos.datosAbajo !== "0" && datos.datosArriba === "") {
      todosDatos = datos.datosAbajo + evt.target.value;
      //Se presiona algun operador matematico
      if (evt.target.value === "+" || evt.target.value === "-" || evt.target.value === "*" || evt.target.value === "/") {

        setDatos({
          datosArriba: todosDatos,
          datosAbajo: "0"
        });
        //Se presiona algun numero
      } else {

        setDatos({
          ...datos,
          datosAbajo: todosDatos
        });
      }
      //Cuando arriba ya hay algun valor
    } else if (datos.datosArriba !== "") {
      //Se preciona algun operador aritmetico
      if (evt.target.value === "+" || evt.target.value === "-" || evt.target.value === "*" || evt.target.value === "/") {
        todosDatos = datos.datosArriba + datos.datosAbajo + evt.target.value;
        setDatos({
          datosArriba: todosDatos,
          datosAbajo: "0"
        });
        //Se presiona algun numero
      } else {
        //Si abajo es cero no se copia el cero
        if (datos.datosAbajo === "0") {
          todosDatos = evt.target.value;
        } else {
          todosDatos = datos.datosAbajo + evt.target.value;
        }
        setDatos({
          ...datos,
          datosAbajo: todosDatos
        });
      }
    }

   

  }



  for (let i = 0; i < 10; i++) {
    panelBotonesNum.push(<Boton key={i + 'bt'} myOnClick={(e) => handleClick(e)} name={i} />);
  }
  for (let j = 0; j < nombreBtnOperacion.length; j++) {
    panelBotonesSimb.push(<Boton key={j + 'btS'} myOnClick={(e) => handleClick(e)} name={nombreBtnOperacion[j]} />);
  }
  for (let k = 0; k < nombreBtnLimpiar.length; k++) {
    panelBotonesLim.push(<Boton key={k + 'btL'} myOnClick={(e) => handleClick(e)} name={nombreBtnLimpiar[k]} />);
  }
  panelBotonesNum.reverse();


  return (
    <div className="App">
      <h1>Mi calculadora</h1>
      <section className="contenedor">
        <form>
          <section className="contenedorVisual">
            <div className='operacionesArriba'>{datos.datosArriba} </div>
            <div className='operacionesPrincipal'>{datos.datosAbajo} </div>
          </section>
          {panelBotonesLim}
          {panelBotonesNum}
          {panelBotonesSimb}

        </form>
      </section>
    </div>
  );
}

export default App;
