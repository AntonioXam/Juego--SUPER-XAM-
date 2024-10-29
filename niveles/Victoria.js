class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: 'Victoria' });
    }

    preload() {
        //cargar la imagen de fondo
        this.load.image('VictoriaBackground', 'assets/pantalla_victoria.png');
        this.load.image('enhorabuena', 'assets/enhorabuena.png');
        this.load.audio('creditos', 'assets/creditos.mp3');

    }

    create() {
        // añadir la música de fondo nada más empezar
        this.sound.add('creditos').play({ loop: true });
       
        // añadir la imagen de fondo
        this.add.image(950,500, 'VictoriaBackground').setScale(0.6, 0.6);

        // añadir la imagen de enhorabuena
        this.add.image(950, 80, 'enhorabuena').setScale(2.0 ,1.7);


       
   

      
    }

    update() {
        // añadir los creditos y que vayan subiendo poco a poco
        if (!this.credits) {
            this.credits = this.add.text(950, 2400, 'Créditos:\n\nDesarrollador: Antonio Ibáñez\nArtista: Antonio Ibáñez\nMúsica: Antonio Ibáñez\nDiseño de Niveles: Antonio Ibáñez\nPruebas: Antonio Ibáñez\nProductor: Antonio Ibáñez\nGuión: Antonio Ibáñez\nMarketing: Antonio Ibáñez\nSoporte Técnico: Antonio Ibáñez\nTraducción: Antonio Ibáñez\nQA: Antonio Ibáñez\nAnimación: Antonio Ibáñez\nNarrativa: Antonio Ibáñez\nUI/UX: Antonio Ibáñez\nGestión de Proyectos: Antonio Ibáñez\nConsultoría: Antonio Ibáñez\nDocumentación: Antonio Ibáñez\nInvestigación: Antonio Ibáñez\nDesarrollo de Herramientas: Antonio Ibáñez\nCreador de Chistes: Antonio Ibáñez\nMaestro del Café: Antonio Ibáñez\nGuardían del Teclado: Antonio Ibáñez\nRey del Debugging: Antonio Ibáñez\nConquistador de Bugs: Antonio Ibáñez\nSeñor de los Commits: Antonio Ibáñez\nArquitecto de Sueños: Antonio Ibáñez\nMago del Código: Antonio Ibáñez\nExplorador de APIs: Antonio Ibáñez\nDomador de Variables: Antonio Ibáñez\nAlquimista de Algoritmos: Antonio Ibáñez\nPiloto de Drones: Antonio Ibáñez\nEmbajador de GitHub: Antonio Ibáñez\nIngeniero de Software: Antonio Ibáñez\nDiseñador de Sonido: Antonio Ibáñez\nTester de Juegos: Antonio Ibáñez\nAdministrador de Sistemas: Antonio Ibáñez\nAnalista de Datos: Antonio Ibáñez\n\n\n\n\n\n\n\n\n\nGracias por jugar', {
                //interlineado
                lineSpacing: 13,
              fill: '#ffffff',
              fontSize: '50px',
              align: 'center',
              shadow: {
            offsetX: 2,
            offsetY: 2,
            color: '#000000',
            blur: 2,
            stroke: true,
            fill: true
              }
            }).setOrigin(0.5, 0.5);
        }

        this.credits.y -= 0.5; // Ajusta la velocidad de subida aquí

        //cuando acaben los creditos volver a la pantalla de inicio
        if (this.credits.y < -5000) {
            this.scene.start('Inicio');
        }
  

    }

}

