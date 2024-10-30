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
    scene : [ inicio ,scene1, scene2, , GameOver, Victoria, BossScene ]
 


}

var game = new Phaser.Game(config) 



// valores parar guardado de datos
var vidas = 3;
var enemigos_destruir = 15;
var municion = 30;

// función para ajustar la dificultad
function ajustarDificultad(dificultad) {
    switch(dificultad) {
        case 'easy':
            vidas = 5;
            enemigos_destruir = 3;
            break;
        case 'medium':
            vidas = 3;
            enemigos_destruir = 5;
            break;
        case 'hard':
            vidas = 2;
            enemigos_destruir = 10;
            break;
        case 'extreme':
            vidas = 1;
            enemigos_destruir = 15;
            break;
        default:
            vidas = 5;
            enemigos_destruir = 15;
    }
}

// Obtener la dificultad del registro de Phaser
var dificultad = game.registry.get('dificultad') || 'medium';
ajustarDificultad(dificultad);

//funcion marcador de nivel que coge la key de la escena y la pone en el marcador
function marcador_nivel(key){
    var marcador = key;
    return marcador;
}
