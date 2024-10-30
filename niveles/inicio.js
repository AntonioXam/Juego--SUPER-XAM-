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
        // Cargar imágenes para el selector de dificultad
        this.load.image('easy', 'assets/easy.png');
        this.load.image('medium', 'assets/medium.png');
        this.load.image('hard', 'assets/hard.png');
        this.load.image('extreme', 'assets/extreme.png');
        this.load.audio('oh_yeah', 'assets/oh_yeah.mp3');
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

        // Agregar el selector de dificultad
        this.add.text(950, 650, 'Selecciona la dificultad:', { fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
        const easy = this.add.image(650, 750, 'easy').setInteractive().setScale(0.5);
        const medium = this.add.image(850, 750, 'medium').setInteractive().setScale(0.5);
        const hard = this.add.image(1050, 750, 'hard').setInteractive().setScale(0.5);
        const extreme = this.add.image(1250, 750, 'extreme').setInteractive().setScale(0.5);

        // Evento para cambiar la dificultad al hacer clic en el botón
        easy.on('pointerdown', () => {
            this.registry.set('dificultad', 'easy');
            this.registry.set('vidas', 5);
            this.registry.set('enemigos_destruir', 1);
            this.sound.add('oh_yeah').play();
        });
        medium.on('pointerdown', () => {
            this.registry.set('dificultad', 'medium');
            this.registry.set('vidas', 3);
            this.registry.set('enemigos_destruir', 3);
            this.sound.add('oh_yeah').play();
        });
        hard.on('pointerdown', () => {
            this.registry.set('dificultad', 'hard');
            this.registry.set('vidas', 1);
            this.registry.set('enemigos_destruir', 5);
            this.sound.add('oh_yeah').play();
        });
        extreme.on('pointerdown', () => {
            this.registry.set('dificultad', 'extreme');
            this.registry.set('vidas', 1);
            this.registry.set('enemigos_destruir', 10);
            this.sound.add('oh_yeah').play();
        });
    }
}
