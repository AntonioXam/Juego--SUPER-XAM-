
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
            debug:true // debug
        }
    },

    // escenas que se van a utilizar
    scene : [ BossScene,inicio ,scene1, scene2, , GameOver, Victoria ]
 


}

var game = new Phaser.Game(config) 



// valores parar guardado de datos
var vidas = 2;
var enemigos_destruir = 1;
var municion = 30;



//funcion marcador de nivel que coge la key de la escena y la pone en el marcador
function marcador_nivel(key){
    var marcador = key;
    return marcador;
}
