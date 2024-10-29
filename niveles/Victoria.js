class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: 'Victoria' });
    }

    preload() {
        //cargar la imagen de fondo
        this.load.image('VictoriaBackground', 'assets/pantalla_victoria.png');
        this.load.image('enhorabuena', 'assets/enhorabuena.png');
    }

    create() {
        // añadir la imagen de fondo
        this.add.image(950,500, 'VictoriaBackground').setScale(0.6, 0.6);

        // añadir la imagen de enhorabuena
        this.add.image(950, 80, 'enhorabuena').setScale(2.0 ,1.7);



       
      
    }
}

