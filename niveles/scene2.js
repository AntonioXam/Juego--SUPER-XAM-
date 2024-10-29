class scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'nivel2' });
    }

    preload() {
        this.load.image('fondo', 'assets/fondoChampiñon.png');

    }

    create() {
        this.add.image(960, 540, 'fondo');
       
    }

    update() {
    }
}
