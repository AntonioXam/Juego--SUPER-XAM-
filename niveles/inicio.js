class inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'inicio' });
    }

    preload() {
        // Cargar las imágenes necesarias
        this.load.image('intro', 'assets/intro.png');
        this.load.spritesheet('botonStart', 'assets/start.png' , { frameWidth: 1316, frameHeight: 563 });
        this.load.audio('introMusic', 'assets/introMusic.mp3');
        this.load.audio('pressStart', 'assets/pressStart.ogg');
        this.load.audio('Accept', 'assets/Accept.mp3');
    }

    create() {
        // Reproducir la música de fondo nada más empezar
        this.sound.add('introMusic', { loop: true }).play();

        
        // Agregar el fondo
        this.add.image(950, 400, 'intro').setScale(0.9, 0.8);

        // Agregar el botón de inicio
        const botonStart = this.add.sprite(950, 950, 'botonStart', 0).setInteractive().setScale(0.5);

        // Cambiar el frame del botón cuando el ratón está encima
        botonStart.on('pointerover', () => {
            botonStart.setFrame(1);
            // Reproducir el sonido de clic
            this.sound.add('pressStart').play();

        });

        // Cambiar el frame del botón cuando el ratón sale
        botonStart.on('pointerout', () => {
            botonStart.setFrame(0);
        });

        // Evento para cambiar a la escena 'Nivel1' al hacer clic en el botón
        botonStart.on('pointerdown', () => {
            //esperar 3 segundos antes de cambiar de escena
            this.time.delayedCall(3000, () => {
                this.scene.start('nivel1');  
                
            });
            // Reproducir el sonido de aceptart
            this.sound.stopAll();
            this.sound.add('Accept').play();
          
        });
    }
}

