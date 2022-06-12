export default function operacionAritmetica(datosAbajo, datosArriba) {
  // 3+1-444/2-5*9
  //Multiplicacion y division en el orden que aparezca
  //Suma y resta en el orde0n que aparezca

  let total = 0, valor1='';
  valor1 = datosArriba + datosAbajo;
 //no utilizar eval() porque puede provocar que se ejecute codigo malicioso en el navegador
 total = eval(valor1);
 if(total === Infinity){
     total=0
  }
   return total.toString();
}

