var config = {
    type:Phaser.AUTO,
    scale: {
        mode:Phaser.Scale.FIT, // scala automaticamente
        autoCenter:Phaser.Scale.CENTER_BOTH, // centra automaticamente
        width:1920, // ancho de pantalla
        height:1080,// alto de pantalla
    },
    physics : {
        default:"arcade", // tipo de fisica que va a utilizar 
        arcade: {
            gravity: { y :1800},// la gravedad del juego
            debug: false // debug
           
        }
    },

    // escenas que se van a utilizar
    scene : [ inicio ,scene1, scene2, GameOver, Victoria, BossScene ]
}

var game = new Phaser.Game(config) 

// valores para guardado de datos
var vidas = 3; // Ajustar las vidas a 5
var enemigos_destruir = 15; // Ajustar los enemigos a destruir a 15
var municion = 30;

// función para ajustar la dificultad
function ajustarDificultad(dificultad) {
    vidas = 3;
    enemigos_destruir = 15;
}

// función marcador de nivel que coge la key de la escena y la pone en el marcador
function marcador_nivel(key) {
    var marcador = key;
    return marcador;
}
