// Al inicio tenemos un arreglo de las posibles entradas del usuario (trigger) y las respuestas
// asociadas (reply). Para la todas las entradas fila [0] (arreglo trigger) le corresponde cualquiera de las
// respuestas de la fila [0] (arreglo reply), la cual se selecciona de manera aleatoria en la función
// encargada de responder. También hay dos arreglos más, uno para capturar si la entrada tiene la
// palabra "coronavirus", y otra en caso de que no coincida con ninguna de las entradas programadas

const exact = [
/*1*/["tiene comida", "tienen comida", "tienes comida", "ofreces comida", "ofrecen comida", "ofrece comida", "incluye comida", "incluyen comida",
    "hay algo de comer", "quiero comida", "quiero comer", "queremos comer", "que tienes de comer", "que tiene para comer", "que tienes para comer",
    "que tiene comer", "que mas ofrecen", "que mas ofreces", "que me puedes ofrecer aparte de la pelicula", "que me puede ofrecer aparte de la pelicula",
    "que mas ofreces", "que hay aparte de la pelicula", "que mas me puede ofrecer", "que mas me puedes ofrecer", "que me quieres ofrecer",
    "que hay adicional"],
/*2*/["no gracias", "no", "no quiero", "no necesito", "no quiero ver peliculas", "no quiero ver ninguna pelicula", "no voy a ver peliculas",
    "no veo peliculas", "no me gustan las peliculas", "no quiero una pelicula", "no soy de pelicula", "no soy de peliculas"]
]

const replyExact = [
/*1*/["Por ahora únicamente rentamos películas. Quizá más adelante integremos otros servicios"],
/*2*/["Bueno, no te preocupes, continuaré atento a cualquier cosa. Hasta una próxima película. ¡Adiós!"]
]

const trigger = [
/*1*/["hola que tal", "holi", "buenas", "hola", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "que mas",
    "que tal", "hola que tal", "hola que mas", "que hubo", "que puedo pedir", "quiero ver una pelicula", "quiero una peli",
    "quiero tener una pelicula", "quiero ver peliculas", "quiero unas peliculas", "quiero ver una película", "que tiene",
    "quiero pedir una peli", "quiero alguna pelicula", "que tipo de pelicula tiene", "que genero maneja", "deseo ver cualquier pelicula",
    "deseo ver una película", "deseo ver una pelicula", "queremos peliculaa", "queremos ver una pelicula"],
/*2*/["como estas", "que tal", "como has estado", "como ha estado", "como se encuentra", "como esta", "como estas",],
/*3*/["que estas haciendo", "que ha pasado", "que pasa"],
/*4*/["cuantos años tienes", "que edad tienes",],
/*5*/["quien eres", "con quien hablo", "quien es usted", "es humano", "quien me contesta", "eres humana", "eres un robot",
    "eres humano o robot", "eres inteligente", "eres un chat inteligente", "eres un bot", "puedes pensar", "para que sirves", "para que funcionas"],
/*6*/["quién te creo", "quién te hizo", "quien te creo", "quien te hizo", "quien te creo", "de donde saliste", "fuiste creada",
    "alguien te creo", "alguien te creo", "de donde saliste"],
/*7*/["su nombre por favor", "tu nombre", "cual es su nombre", "cual es tu nombre", "como te llamas", "como se llama usted",
    "como se llama", "me regala su nombre"],
/*8*/["horror", "terror", "miedo", "suspenso", "terrorifica", "malefica"],
/*9*/["duque la duquesa", "el tirano de la esquina", "la tumba de su abuela ii"],
/*10*/["romance", "amor", "romanse", "pareja", "novios", "drama", "novia"],
/*11*/["titanic colombiano", "lo que el viento se llevo", "el viento", "la rosa de guadalupe", "guadalupe"],
/*12*/["ciencia ficcion", "ficcion", "ciencia", "adrenalina", "misterio", "fantasia"],
/*13*/["los descuentos de la pandemia la pelicula", "el supuesto mercado del gobierno"],
/*14*/["accion", "pelos de punta", "reir", "comedia", "chistes", "chistosa", "graciosa", "graciosas"],
/*15*/["francy recargado", "juana en parciales finales", "francy", "juana"],
/*16*/["familiar", "infantiles", "niñas", "niños", "adolescentes"],
/*17*/["los perros de facundo", "el gigantesco hoyo fantastico"],
/*18*/["dinero efectivo plata billetes monedas dolares euros"],
/*19*/["gracias adios", "hasta pronto", "hasta luego", "nos vemos luego", "feliz dia", "chao"],
/*20*/["4", "cuatro"],
/*21*/["3", "tres"],
/*22*/["2", "dos"],
  ["1", "uno", "una"],
/*23*/["cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "5", "6", "7", "8", "9", "10", "11", "12", "1314"],
/*24*/["tarjeta blackcard mastercard visa dinnersclub bancolombia itau davivienda pichincha"],
/*25*/["tarjeta credito ahorros cuenta corriente tarjeta debito"],
/*26*/["@"],
/*27*/["perfecto"],
/*28*/["mejorar"],
/*29*/["jajajajajajajajajajajejejejejejejejejijijijijijijijijijijojojojojojojojojojo que risa"],
];

const reply = [
/*1*/["Bienvenido a peliculas PandoraBot. Soy tu ChatBot inteligente. Tenemos disponibles los siguientes géneros: \n\n \
■ Acción \n ■ Terror \n ■ Drama \n ■ Ciencia Ficción \n ■ Comedia \n ■ Infantil\n ■ Romance\n\n Por favor escribe el género que te gustaría ver"],
/*2*/["Bien, gracias", "Muy bien", "Fantástico"],
/*3*/["no mucho", "hablando contigo", "Soy un robot, no siento", "solo soy un chatbot"],
/*4*/["quiero creer que soy joven"],
/*5*/["Soy HAJED tu bot inteligente. Fui diseñado para ayudar a los humanos a reservar películas en PandoraBot", "Soy un bot inteligente y me encanta hablar con humanos"],
/*6*/["Soy un bot desarrollado por humanos exageradamente inteligentes", "Fui creada por un humano y mi padre, JavaScript", "¿sabes la historia de la abeja y la cigüeña? ........ pues yo no nací así, me crearon con javascript"],
/*7*/["Mi nombre es HAJED"],
/*8*/["Ok. Nos queda por el momento: \n\n ■ La Tumba de su Abuela II \n ■ Duque la Duquesa \n ■ El Tirano de la Esquina \n\n Escribe el nombre de la película que quieres ver"],
/*9*/["Recuerda que este tipo de películas es para mayores de edad ya que pueden contener escenas fuertes. ¿Para cuántas personas es la película? (Máximo 14 boletas)"],
/*10*/["¡Qué bien! Tenemos: \n\n ■ Titanic Colombiano \n ■ Lo que el viento se llevó \n ■ La Rosa de Guadalupe Recargada \n\n Escribe el nombre de la película que quieres ver"],
/*11*/["Esa es muy linda, buena elección ¿Para cuántas personas es la película? (Máximo 14 boletas)"],
/*12*/["¡Buena elección! Nos queda por el momento: \n\n ■ Los Descuentos de la Pandemia: La Película \n ■ El Supesto Mercado del Gobierno \n\n Escribe el nombre de la película que quieres ver"],
/*13*/["Esas es muy linda, buena elección. ¿Para cuántas personas es la película? (Máximo 14 boletas)"],
/*14*/["¡Qué bien! Por el momento tengo: \n\n ■ Francy Recargado \n ■ Juana en Parciales Finales \n\n Escribe el nombre de la película que quieres ver"],
/*15*/["Esa es genial, buena elección. ¿Para cuántas personas es la película? (Máximo 14 boletas)"],
/*16*/["¡Qué bien! Tenemos disponibles en cartelera: \n\n ■ Los Perros de Facundo \n ■ El Gigantesco Hoyo Fantástico \n\n Escribe el nombre de la película que quieres ver"],
/*17*/["Esa es muy buena, buena elección. ¿Para cuántas personas es la película? (Máximo 14 boletas)"],
/*18*/["Bueno, puedes hacer la transferencia o pago en un punto Efecty, Servientrega, Balotto, Banco de Bogotá, o Banco Davivienda \
 utilizando la siguiente información \n\n ■ Número de cuenta: 500.986.876-1 \n ■ Enviar a nombre de: Pandora Películas S.A.S. \n ■ Número \
 de Reserva: 300 \n\n Cuando recibamos tu pago, te llegará una notificación a tu correo y se realizará la reserva automática. Tienes 6 horas \
 a partir de este momento para realizar el pago de la película. \n\n Por favor escríbenos tu correo electrónico para confirmar la reserva."],
/*19*/["Hasta la próxima película. Adiós", "Hasta pronto", "Luego nos vemos", "Hasta luego"],
/*20*/["Bueno, la reservo para cuatro. Serían 20.000 pesos. Recibimos tarjeta y efectivo. ¿Con qué pagas?"],
/*21*/["Bueno, la reservo para tres. Serían 15.000 pesos. Recibimos tarjeta y efectivo. ¿Con qué pagas?"],
/*22*/["Bueno, la reservo para dos. Serían 10.000 pesos. Recibimos tarjeta y efectivo. ¿Con qué pagas?"],
  ["Bueno, la reservo para uno. Serían 5.000 pesos. Recibimos tarjeta y efectivo. ¿Con qué pagas?"],
/*23*/["Bueno, eres el usuario número 300 por lo cual tenemos una súper oferta exclusivamente para ti en la compra de las boletas, lo cual será un total de 25.000 pesos. Recibimos tarjeta y efectivo. ¿Con qué método vas a pagar?"],
/*24*/["¿Tarjeta crédito o débito?"],
/*25*/["Bueno, puedes hacer la transferencia o pago desde cualquier banco \
 utilizando la siguiente información \n\n ■ Número de cuenta: 500.986.876-1 \n ■ Enviar a nombre de: Pandora Películas S.A.S. \n ■ Número \
 de Reserva: 300 \n\n Cuando recibamos tu pago, te llegará una notificación a tu correo y se realizará la reserva automática. Tienes 6 horas \
 a partir de este momento para realizar el pago de la película. \n\n Por favor escríbenos tu correo electrónico para confirmar la reserva."],
 /*26*/["Ya registramos tu correo al pedido \n\n Si fue útil la información por favor escribe 'Perfecto' de lo contrario escribe 'Mejorar'"],
 /*27*/["Nos alegra oirlo. Fue un gusto atenderte. ¡Hasta luego! ☻"],
 /*28*/["Si quieres ayudarnos a mejorar el servicio, encríbenos en PQRSF al correo pandoraPQRSF@chatbot.com y atenderemos a lo que sugieras. Fue un gusto atenderte. Adiós ☻"],
 /*29*/["Jajajajaja. Continuemos."],
];

// Este es un pequeño conjunto de 'capturar todo' básicamente al azar para cualquier cosa que el usuario ingrese fuera de las posibles frases desencadenantes

const alternative = ["Lo siento, no te comprendí", "Lo siento, mi inteligencia aún se está mejorando. No entendí lo que me acabas de escribir"];

const coronavirus = ["¡Quédate en casa!"]



// Esta función se encarga de activar todo el mecanismo del ChatBot cuando se pulsa Enter

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input")
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});



function output(input) {

  // Esta función es basicamente el ChatBot. En ella se llaman todas las funciones necesarias 
  // para que el ChatBot funcione correctamente

  let product;
  var text;

  // Primero determinamos si nos están enviando un número o una cadena de caracteres

  if (isNaN(input)) {

    // Está el caso especial de indentificar el correo, así que determinamos si la cadena contiene @

    if (input.includes("@")) {

      text = "@";

    }

    // Si no, entonces se procede a depurar el mensaje como una entrada estándar

    else {

      // Transforma lo que el usuario ingresa en minúsculas y elimina todos los caracteres, 
      // excepto los caracteres de letras (incluyendo tildes), el espacio, y los dígitos

      text = input.toLowerCase().replace(/^[a-zA-Z\u00C0-\u017F]+,\s[a-zA-Z\u00C0-\u017F]+$/gi, "");

      // Esta función cambia cualquier tilde que tenga el texto a un caracter sin tilde

      text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Esta función elimina los caracteres especiales que ingrese el usuario

      text = text.replace(/[^a-zA-Z ]/g, "");

    }

  }

  // En caso de ser un número no es necesario realizarle modificaciones a la entrada del usuario

  else {

    text = input;

  }

  // Busca una coincidencia exacta entre lo que el usuario ingresó y las respuestas almacenadas
  // priorizando el arreglo exact el cual contiene entradas para coincidencias exactas las cuales
  // se enlazan con respuestas en el arreglo replyExact, luego de no encontrar buscará
  // en el arreglo trigger y le asignará una respuesta del arreglo reply, si no encuentra 
  // coincidencias entonces verificará si el mensaje contiene 'coronavirus' el cual tiene
  // la respuesta programada de "¡Quédaate en casa!", y si no, escogerá una alternativa aleatoria
  // del arreglo alternative que se usa cuando no existen coincidencias para lo que el usuario ingresó

  if (compareExact(exact, replyExact, text)) {
    product = compareExact(exact, replyExact, text);
  }
  else if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  }
  else if (text.match(/coronavirus/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  }
  else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Función que actualiza el DOM

  addChat(input, product);
}

function compareExact(triggerArray, replyArray, string) {

  let item;
  let found = false;

  // Recorremos la matriz de las entradas que puede hacer el usuario para buscar una coincidencia
  // Luego, en la matriz de respuesta asociada sacamos al azar una de las respuestas
  // El found evita que se siga buscando coincidencias después de haber hallado una

  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (triggerArray[x][y] === string && !found) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
        found = true;
        console.log(items);
      }
    }
  }
  return item;
}

function compare(triggerArray, replyArray, string) {

  let item;
  let found = false;

  // Recorremos la matriz de las entradas que puede hacer el usuario para buscar una coincidencia
  // Luego, en la matriz de respuesta asociada sacamos al azar una de las respuestas
  // El found evita que se siga buscando coincidencias después de haber hallado una

  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (triggerArray[x][y].includes(string) && !found) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
        found = true;
        console.log(items);
      }
    }
  }
  return item;
}



function addChat(input, product) {

  // Estas función basicamente añade al DOM lo que dice el humano y lo que dice el ChatBot
  // Es decir, actualiza la página con el diálogo

  const mainDiv = document.getElementById("chat");

  // Esta parte añade lo que escribió el usuario

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  // Esta parte añade lo que renpondió el ChatBot

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.innerHTML = `<pre id="bot-response">ChatBot: ${product}</pre>`;
  mainDiv.appendChild(botDiv);

  // Esta parte hace que el ChatBot hable lo que acaba de responder

  speak(product);
}



const synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "es-ES";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  synth.speak(u);

}



//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//ARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO

(function () {
  'use strict';
  window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
      Var
    ********************/

    var ctx = canvas.getContext('2d');
    var X = canvas.width = window.innerWidth;
    var Y = canvas.height = window.innerHeight;
    var mouseX = X / 2;
    var mouseY = Y / 2;
    var shapes = [];
    var shapeNum = 360;
    var shapeMax = 70;
    var xRatio = 2;
    var yRatio = 4;
    var zRatio = 1.5;

    if (X < 768) {
      shapeMax = 35;
      xRatio = 3;
      yRatio = 1;
      zRatio = 2;
    }

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };

    /********************
      Shape
    ********************/

    function Shape(ctx, x, y, i) {
      this.ctx = ctx;
      this.init(x, y, i);
    }

    Shape.prototype.init = function (x, y, i) {
      this.x = x;
      this.y = y;
      this.r = rand(5, shapeMax);
      this.ir = this.r / 2;
      this.i = i;
      this.v = {
        x: 0,
        y: 0
      };
      this.a = i;
      this.rad = this.a * Math.PI / 180;
      this.rx = rand(Y / 15, Y / xRatio);
      this.ry = rand(X / yRatio, X / zRatio);
      this.ga = Math.random() * Math.random();
    };

    Shape.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.globalAlpha = this.ga;
      ctx.translate(this.x, this.y);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.translate(-this.x, -this.y);
      ctx.beginPath();
      ctx.arc(
        Math.cos(this.rad) * this.rx + this.x,
        Math.sin(this.rad) * this.ry + this.y,
        Math.sin(this.rad / 2) < 0 ? -Math.sin(this.rad / 2) * this.r + this.ir : Math.sin(this.rad / 2) * this.r + this.ir,
        0,
        Math.PI * 2,
        false
      );
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.updateParams = function () {
      this.a += 0.4;
      this.rad = this.a * Math.PI / 180;
    };

    Shape.prototype.resize = function () {
      this.x = X / 2;
      this.y = Y / 2;
    };

    Shape.prototype.render = function (i) {
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(ctx, X / 2, Y / 2, i);
      shapes.push(s);
    }

    /********************
      Render
    ********************/

    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Change Color
    ********************/

    var colors = ['#FE7F7E', '#FED57F', '#B5E2B4', '#ACE8FE', '#BAB3EB'];

    function changeColor() {
      var time = rand(1000, 5000);
      canvas.style.background = colors[rand(0, colors.length - 1)];
      setTimeout(changeColor, time);
    }

    changeColor();

    /********************
      Event
    ********************/

    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].resize();
      }
    }

    window.addEventListener('resize', function () {
      onResize();
    });

    canvas.addEventListener('wheel', function (e) {
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].rx -= e.deltaY / 10;
        shapes[i].a += e.deltaX / 100;
      }
    }, false);

    var touchStartY;
    var touchMoveY;
    var touchEndY;
    var touchStartX;
    var touchMoveX;
    var touchEndX;

    canvas.addEventListener('touchstart', function (e) {
      var touch = e.targetTouches[0];
      touchStartY = touch.pageY;
      touchStartX = touch.pageX;
    }, false);

    canvas.addEventListener('touchmove', function (e) {
      var touch = e.targetTouches[0];
      touchMoveY = touch.pageY;
      touchMoveX = touch.pageX;
      touchEndY = touchStartY - touchMoveY;
      touchEndX = touchStartX - touchMoveX;
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].rx -= touchEndY / 100;
        shapes[i].a += touchEndX / 100;
      }
    }, false);

    canvas.addEventListener('touchend', function (e) {
      touchStartY = null;
      touchMoveY = null;
      touchEndY = null;
      touchStartX = null;
      touchMoveX = null;
      touchEndX = null;
    }, false);

  });
  // Author
  console.log('File Name / eyesight.js\nCreated Date / Jun 18, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo');
})();

//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
//jARREGLOS DE JUANA NO TOCAR NI POR EL CHIRAS ÉSTE CÓDIGO
