class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('gameoverBackground', 'assets/fondoGameOver.jpg');
        this.load.image('restartButton', 'assets/restart_boton.png');
        this.load.audio('gameoverMusic', 'assets/gameover.mp3');
        this.load.audio('risa_bowser', 'assets/risaBowser.mp3');
        this.load.audio('ouYeah', 'assets/oh_yeah.mp3');
    }

    create() {
        // Reproducir la música de fondo nada más empezar
        this.sound.add('gameoverMusic', { loop: false }).play();

        // a los 5 segundos se reproduce la risa de bowser
        this.time.delayedCall(2000, () => {
            this.sound.add('risa_bowser').play();
        });

        this.add.image(950, 500, 'gameoverBackground').setScale(0.8,0.7);

        let restartButton = this.add.image(300, 400, 'restartButton').setInteractive();

        restartButton.on('pointerdown', () => {
            this.sound.add('ouYeah').play();
            this.time.delayedCall(2000, () => {
                this.scene.start('nivel1');
            });
        });

       
    }
}

