//Definimos variables pero no las asignamos.
var area_de_dibujo, lienzo, teclas, x, y, colorDefault, borradorSwitch;

//Objeto teclas con el "keycode" de la flechas direccionales.
var teclas = { ARRIBA: 38, IZQUIERDA: 37, ABAJO: 40, DERECHA: 39 };

//Objeto con los limites del lienzo almacenados.
var limitesLienzo = {
  LIENZO_ARRIBA: 1,
  LIENZO_ABAJO: 299,
  LIENZO_IZQ: 1,
  LIENZO_DER: 299,
};

//Objeto de boleeanos que sera true cuando se presione una tecla en especifico.
var borradorSwitch = false;

//Posicion inicial del dibujo
var x = 150;
var y = 150;

//Color default del pincel
var colorDefault = "black";

//Grosor default del pincel
var grosorDefault = 1;

//Movimiento default en pixeles
var movimiento = 1;

//Con este metodo obtenemos el objeto canvas de HTML por ID.
var area_de_dibujo = document.getElementById("dibujo");

//Nos traemos los objetos HTML, formularios para cambiar propiedades del pincel.
var color_pincel = document.getElementById("text_colorPincel");
var boton_cambiar_color = document.getElementById("button_cambiar_color");
var botonLimpiar = document.getElementById("button_limpiar");
var grosor_pincel = document.getElementById("text_grosorPincel");
var boton_cambiar_grosor = document.getElementById("button_cambiar_grosor");
var boton_borrador = document.getElementById("button_borrador");

//Le damos el contexto "2d" al canvas.
var lienzo = area_de_dibujo.getContext("2d");

//Evento que escucha las teclas presionadas en el teclado.
document.addEventListener("mousemove", dibujarMouse);

//Evento que al presionar el boton, cambiar el valor de color default(Hecho con una funcion flecha)
boton_cambiar_color.addEventListener(
  "click",
  (cambiarColorPincel = () => {
    colorDefault = color_pincel.value;
  })
);

//Evento que al presionar el boton, cambiar el grosor del pincel default(Hecho con una funcion flecha)
boton_cambiar_grosor.addEventListener(
  "click",
  (cambiarGrosorPincel = () => {
    grosorDefault = parseInt(grosor_pincel.value);
  })
);

//Para limpiar el dibujo refresco la pagina con el metodo reload().
botonLimpiar.addEventListener(
  "click",
  (limpiarDibujo = () => {
    window.location.reload();
  })
);

//Activar borrador.
boton_borrador.addEventListener(
  "click",
  (activarBorrador = () => {
    if (borradorSwitch === true) {
      document.getElementById("button_borrador").value = "Borrador desactivado";
      borradorSwitch = false;
      colorDefault = "black";
      grosorDefault = 1;
    } else if (borradorSwitch === false) {
      document.getElementById("button_borrador").value = "Borrador activado";
      borradorSwitch = true;
      colorDefault = "white";
      grosorDefault = 10;
    }
  })
);
//Dibujar punto inicial.
dibujarLinea(x - 1, y - 1, x + 1, y + 1, colorDefault);

//Dibujar limites.
dibujarLinea(0, 0, 299, 0, colorDefault); //arriba
dibujarLinea(0, 0, 0, 299, colorDefault); //izquierda
dibujarLinea(0, 299, 299, 299, colorDefault); //abajo
dibujarLinea(299, 299, 299, 0, colorDefault); //derecha

//Funcion que permite dibujar linea en el canvas
function dibujarLinea(inicioX, inicioY, finX, finY, colorTrazo) {
  lienzo.beginPath(); //Arrancar un trazo o baja el lapiz.
  lienzo.strokeStyle = colorTrazo; // Color del trazo.
  lienzo.lineWidth = grosorDefault; //Grosor de la linea.
  lienzo.moveTo(inicioX, inicioY); //Desde donde empieza el trazo.(X,Y)
  lienzo.lineTo(finX, finY); //Trazar una linea.(X,Y)
  lienzo.stroke(); //Dibuja la linea.
  lienzo.closePath(); //Levanta el lapiz y cierra el trazo.
}

//Funcion que permite dibujar con el mouse
function dibujarMouse(evento) {
  /* console.log("Tecla oprimida");*/
  var posInicialX, posInicialY;

  //console.log(evento);

  //Si el click izquierdo del mouse esta presionado y el mismo esta dentro de los limites, del lienzo.
  if (
    evento.buttons == 1 &&
    evento.offsetX < 299 &&
    evento.offsetX > 1 &&
    evento.offsetY < 299 &&
    evento.offsetY > 1
  ) {
    posInicialX = evento.offsetX;
    posInicialY = evento.offsetY;
    dibujarLinea(
      posInicialX,
      posInicialY,
      posInicialX + evento.movementX,
      posInicialY + evento.movementY,
      colorDefault
    );
    posInicialX = evento.offsetX;
    posInicialY = evento.offsetY;
    console.log("X: " + posInicialX + " Y: " + posInicialY);
  }
}
