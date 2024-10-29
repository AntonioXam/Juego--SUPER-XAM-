class scene1 extends Phaser.Scene {

    constructor () {
        super({ key: 'nivel1' }); // nombre de la escena
    }

  

    preload() { 
        // carga de recursos
        this.load.image('background', 'assets/fondoArboles.png');
        this.load.image('plataforma_Grande', 'assets/plataforma.png');
        this.load.image('plataforma_mediana', 'assets/plataforma_mediana.png');
        this.load.image('plataforma_pequeña', 'assets/plataforma_pequeña.png');
        this.load.spritesheet('toad_quieto', 'assets/toad_quieto.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_moviendose', 'assets/toad_moviendose.png', { frameWidth: 186, frameHeight: 183 });
        this.load.spritesheet('toad_saltando', 'assets/toad_saltando.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_daño', 'assets/toad_daño.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_disparando', 'assets/toad_dispararando.png', { frameWidth: 170, frameHeight: 183 });
        this.load.image('toad_celebrar', 'assets/toad_celebrar.png');
        this.load.spritesheet('setas', 'assets/setas.png', { frameWidth: 267, frameHeight: 235 });
        this.load.spritesheet('disparo', 'assets/disparo.png', { frameWidth: 114.6, frameHeight: 101 });
        this.load.spritesheet('enemigo', 'assets/goomba.png', { frameWidth: 130, frameHeight: 180 });
        this.load.image('explosion', 'assets/explosion.png');
        this.load.audio('nivel1Music', 'assets/nivel1Music.mp3');
        this.load.audio('shoot', 'assets/shoot.mp3');
        this.load.audio('defeat', 'assets/defeat.mp3');
        this.load.audio('hit', 'assets/hit.mp3');
        this.load.audio('salto', 'assets/salto.mp3');
        this.load.audio('seta', 'assets/seta.mp3');
        this.load.audio('nivel_ganado', 'assets/nivel_ganado.mp3');
    }

    create() { 

        // Reproducir la música de fondo nada más empezar
        this.sound.add('nivel1Music', { loop: true }).play();

        // creacion de objetos
        // fondo
        var fondo = this.add.image(960, 550, 'background');
        fondo.setScale(0.9);
        //estirar el fondo
        fondo.displayWidth = 1920;

        // Plataformas
        const plataformas = this.physics.add.staticGroup();
        //una plataforma grande en la base y estirarla
        plataformas.create(320, 1040, 'plataforma_Grande').setScale(0.5).refreshBody();
        plataformas.create(960, 1040, 'plataforma_Grande').setScale(0.5).refreshBody();
        plataformas.create(1600, 1040, 'plataforma_Grande').setScale(0.5).refreshBody();
        plataformas.create(900, 600, 'plataforma_mediana').setScale(0.5).refreshBody();
        plataformas.create(300, 700, 'plataforma_pequeña').setScale(0.5).refreshBody();
        plataformas.create(1600, 800, 'plataforma_pequeña').setScale(0.5).refreshBody();
        plataformas.create(300, 400, 'plataforma_pequeña').setScale(0.5).refreshBody();
        plataformas.create(1600, 400, 'plataforma_pequeña').setScale(0.5).refreshBody();
        plataformas.create(900, 200, 'plataforma_pequeña').setScale(0.5).refreshBody();
        plataformas.create(600, 200, 'plataforma_pequeña').setScale(0.2).refreshBody();
        plataformas.create(1200, 200, 'plataforma_pequeña').setScale(0.2).refreshBody();
        plataformas.create(700, 400, 'plataforma_pequeña').setScale(0.1).refreshBody();
        plataformas.create(1400, 400, 'plataforma_pequeña').setScale(0.1).refreshBody();
        plataformas.create(1300, 700, 'plataforma_pequeña').setScale(0.05).refreshBody();

        // jugador
        this.player = this.physics.add.sprite(16, 800, 'toad');
        this.player.setBounce(0.2);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, plataformas);
        this.player.setSize(100, 150);
        this.player.setOffset(40, 20); // ajustar el tamaño del jugador 
        this.player.lives = vidas; // variable guardada en game.js

        //animacion del jugador
        this.anims.create({
            key: 'toad_quieto',
            frames: this.anims.generateFrameNumbers('toad_quieto', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'toad_moviendose',
            frames: this.anims.generateFrameNumbers('toad_moviendose', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'toad_saltando',
            frames: this.anims.generateFrameNumbers('toad_saltando', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'toad_daño',
            frames: this.anims.generateFrameNumbers('toad_daño', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'toad_disparando',
            frames: this.anims.generateFrameNumbers('toad_disparando', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

    


        //animacion de las setas
        this.anims.create({
            key:'setas',
            frames: this.anims.generateFrameNumbers('setas', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        // animacion del disparo
        this.anims.create({
            key: 'disparo',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

    
        // enemigo
        this.anims.create({
            key: 'enemigo',
            frames: this.anims.generateFrameNumbers('enemigo', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        // setas
        this.setas = this.physics.add.group({
            key: 'setas',
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 300 }
        });
        // Generar setas en lugares aleatorios por encima de la mitad de la pantalla hacia arriba
        this.setas.children.iterate(function (child) {
            const x = Phaser.Math.Between(0, 1920);
            const y = Phaser.Math.Between(0, 540); // La mitad de la pantalla es 1080 / 2 = 540
            child.setPosition(x, y);
        });
        this.setas.children.iterate(function (child) {
            const randomFrame = Phaser.Math.Between(0, 2);
            child.setFrame(randomFrame);
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setCollideWorldBounds(true);
            child.setScale(0.3);
            child.setSize(150, 150);
        });

        // Generar una nueva seta cada 20 segundos
        this.time.addEvent({
            delay: 20000,
            callback: () => {
            const x = Phaser.Math.Between(0, 1920);
            const y = Phaser.Math.Between(0, 540);
            const newSeta = this.physics.add.sprite(x, y, 'setas');
            const randomFrame = Phaser.Math.Between(0, 2);
            newSeta.setFrame(randomFrame);
            newSeta.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            newSeta.setCollideWorldBounds(true);
            newSeta.setScale(0.3);
            newSeta.setSize(150, 150);
            this.physics.add.collider(newSeta, plataformas);
            this.physics.add.overlap(this.player, newSeta, (player, seta) => {
                this.collectSetas(player, seta);
                this.municion += 5; // Añadir munición al recoger una seta
                this.municionText.setText('Municion: ' + this.municion);
            }, null, this);
            },
            loop: true
        });

        //colisiones
        this.physics.add.collider(this.setas, plataformas);
        this.physics.add.overlap(this.player, this.setas, this.collectSetas, null, this);

        // Add bullets group
        this.bullets = this.physics.add.group({
            defaultKey: 'disparo',
            maxSize: 30,

        });
        // marcador de enemigos matados
                
       this.enemyKillCount = enemigos_destruir; // variable guardada en game.js
    this.enemyKillCountText = this.add.text(1016, 16, 'Enemigos restantes: ' + enemigos_destruir, { fontSize: '48px', fill: '#ffff00' }); // Cambiar color a amarillo

                this.enemyKillCountText.setStroke('#086b53', 8);
                this.enemyKillCountText.setShadow(2, 2, '#333333', 2, true, true);

         //marcador del nivel con la funcion marcador_nivel
        this.marcador_nivel = marcador_nivel(this.scene.key);
        this.marcador_nivelText = this.add.text(1670, 16, this.marcador_nivel, { fontSize: '48px', fill: '#ffffff' });  
        this.marcador_nivelText.setStroke('#086b53', 8);
        this.marcador_nivelText.setShadow(2, 2, '#333333', 2, true, true);

        //marcador con la munición que tiene
        this.municion = municion; // variable guardada en game.js
        this.municionText = this.add.text(316, 16, 'Municion: ' + municion, { fontSize: '48px', fill: '#0000ff' }); // Cambiar color a azul
        this.municionText.setStroke('#086b53', 8);
        this.municionText.setShadow(2, 2, '#333333', 2, true, true);

        //cuando se queda sin municion no puede disparar
        this.physics.add.overlap(this.player, this.bullets, this.collectBullets, null, this);

        //funcion de recoleccion de setas
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '48px', fill: '#00ff00' }); // Cambiar color a verde
        this.scoreText.setStroke('#086b53', 8);
        this.scoreText.setShadow(2, 2, '#333333', 2, true, true);

        // marcador de vidas
        this.livesText = this.add.text(716, 16, 'Vidas: ' + vidas, { fontSize: '48px', fill: '#ff0000' }); // Cambiar color a rojo
        this.livesText.setStroke('#086b53', 8);
        this.livesText.setShadow(2, 2, '#333333', 2, true, true);

        //que los marcadores se vean en la camera
        this.cameras.main.startFollow(this.player);
        
        



        // velocidad inicial del jugador
        this.playerSpeed = 160;

        //mostrar un "`1 de velocidad encima del jugador cuando recoge una seta
        this.physics.add.overlap(this.player, this.setas, this.collectSetas, null, this);

        // disparo
        this.input.on('pointerdown', function (pointer) {
            if (this.municion > 0) {
                const bullet = this.bullets.get(this.player.x, this.player.y, 'disparo');
                if (bullet) {
                    bullet.enableBody(true, this.player.x, this.player.y, true, true);
                    
                    // Calcular la dirección del disparo hacia el puntero del ratón
                    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
                    const velocityX = Math.cos(angle) * 800;
                    const velocityY = Math.sin(angle) * 800;

                    
                    bullet.setVelocity(velocityX, velocityY);
                    this.municion -= 1;
                    this.municionText.setText('Municion: ' + this.municion);
                    this.player.anims.play('disparando', true);
                    
                    // Flip the player based on the direction of the shot
                    this.player.flipX = (pointer.x < this.player.x);

                    // Reproducir el sonido de disparo
                    this.sound.add('shoot').play();
                }
            }
        }, this);

        //enemigos
        this.enemigos = this.physics.add.group();
        for (let i = 0; i < 7; i++) {
            const x = Phaser.Math.Between(1500, 1920);
            const y = Phaser.Math.Between(0, 1080);
            const enemigo = this.physics.add.sprite(x, y, 'enemigo');
            enemigo.anims.play('enemigo', true);
            this.enemigos.add(enemigo);
        }
        this.enemigos.children.iterate(function (child) {
            child.setBounce(1);
            child.setCollideWorldBounds(true);
            child.setScale(0.5);
            child.setSize(100, 150);
        });
        this.physics.add.collider(this.enemigos, plataformas);
        this.physics.add.collider(this.enemigos, this.player, this.hitPlayer, null, this);
        this.physics.add.collider(this.bullets, this.enemigos, this.hitEnemy, null, this);

        // Mover los enemigos en direcciones aleatorias
        this.moveEnemies();
        this.time.addEvent({
            delay: 3000,
            callback: this.moveEnemies,
            callbackScope: this,
            loop: true
        });
        //cada 10 segundos se añade 1 enemigo que es más grande que el anterior
        this.time.addEvent({
            delay: 5000,
            callback: () => {
            const x = Phaser.Math.Between(0, 1920);
            const y = Phaser.Math.Between(0, 540);
            // Obtener el tamaño del último enemigo añadido
            const lastEnemy = this.enemigos.getChildren().slice(-1)[0];
            const newScale = lastEnemy ? lastEnemy.scale + 0.1 : 0.5;

            // Añadir un enemigo más grande
            const newEnemigo = this.physics.add.sprite(x, y, 'enemigo');
            newEnemigo.anims.play('enemigo', true);
            
            newEnemigo.setBounce(1);
            newEnemigo.setCollideWorldBounds(true);
            newEnemigo.setScale(newScale);
            newEnemigo.setSize(100 * newScale, 150 * newScale);
            this.physics.add.collider(newEnemigo, plataformas);
            this.physics.add.collider(newEnemigo, this.player, this.hitPlayer, null, this);
            this.physics.add.collider(this.bullets, newEnemigo, this.hitEnemy, null, this);
            this.enemigos.add(newEnemigo);
            },
            loop: true
        });


      

    }   

    createCamera() {
        // Camera
        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.cameras.main.startFollow(this.player);
      
    }

    cameraShake() {
        this.cameras.main.shake(100);
    }


    update() { 

        //camera
        this.createCamera();
      
       


        //controles del jugador
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
            this.player.anims.play('toad_moviendose', true);
            this.player.flipX = true;
        
        } else if (cursors.right.isDown) {
      
        
            this.player.setVelocityX(this.playerSpeed);
            this.player.anims.play('toad_moviendose', true);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('toad_quieto', true);
        }
        if (cursors.up.isDown && this.player.body.touching.down) {
            //sonido de salto
            this.sound.add('salto').play();
            this.player.setVelocityY(-1000);
            this.player.anims.play('toad_saltando', true);
        }
    }

    collectSetas(_, setas) {
        setas.disableBody(true, true);
        //sonido de recoger seta
        this.sound.add('seta').play();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        this.playerSpeed += 30;

        // Mostrar el texto de velocidad o munición dependiendo del tiempo de partida
        const tiempoPartida = this.time.now;
        let texto;
        if (tiempoPartida >= 20000) {
            texto = '+5 DE MUNICION!!';
        } else {
            texto = '+1 VELOCIDAD!!';
        }
        const velocidadText = this.add.text(this.player.x, this.player.y, texto, { fontSize: '48px', fill: 'c3f9ab' });
        velocidadText.setStroke('#086b53', 8);
        velocidadText.setShadow(2, 2, '#333333', 2, true, true);
        this.tweens.add({
            targets: velocidadText,
            y: this.player.y - 100,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
            velocidadText.destroy();
            }
        });

    }

    hitEnemy(bullet, enemigo) {
        //sonido de derrota al matar a un enemigo
        this.sound.add('defeat').play();
        bullet.disableBody(true, true);
        enemigo.disableBody(true, true);
        //imagen de explosion al matar a un enemigo 1 segundo
        const explosion = this.add.sprite(enemigo.x, enemigo.y, 'explosion');
        
        explosion.setScale(0.5);
        this.time.addEvent({
            delay: 300,
            callback: () => {
            explosion.destroy();
            
            
            },
            loop: false
        });

        this.enemyKillCount -= 1;
        this.enemyKillCountText.setText('Enemigos : ' + this.enemyKillCount);

        if (this.enemyKillCount <= 0) {
            this.win();
            this.physics.pause();
            this.enemyKillCountText.destroy();
            this.enemyKillCount = 0;
        
        }
    }

    hitPlayer(player, enemigo) {
        enemigo.disableBody(true, true);
        //imagen de daño al jugador coger solo el primer sprite
        player.anims.play('toad_daño', true);
        //sonido de daño al jugador
        this.sound.add('hit').play();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
            player.anims.play('toad_quieto', true);
            }
        });
        player.lives -= 1;
        this.livesText.setText('Vidas: ' + player.lives);
        if (player.lives <= 0) {
            //esperar 1 segundos antes de cambiar de escena
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOver');
            });
            // Detener la música de fondo
            this.sound.stopAll();
        }
        this.cameraShake();
    }

    moveEnemies() {
        this.enemigos.children.iterate(function (child) {
            const randomX = Phaser.Math.Between(0, 1920);
            const randomY = Phaser.Math.Between(0, 1080);
            this.physics.moveToObject(child, this.player, 100);
        }, this);

        //animacion de los enemigos
        this.enemigos.children.iterate(function (child) {
            child.anims.play('enemigo', true);
        });

        //que se gire el enemigo dependiendo de la direccion
        this.enemigos.children.iterate(function (child) {
            child.flipX = (child.body.velocity.x < 0);
        });


    }

    //al matar a todos los enemigos mensaje de victoria , toad celebra y se continua al siguiente nivel
    win() {
        this.sound.stopAll();
        this.physics.pause();
        //audio de nivel ganado
        this.sound.add('nivel_ganado').play();

        //desaparecer jugador
        this.player.disableBody(true, true);
        this.player.image = this.add.image(960, 900, 'toad_celebrar');
        var winText = this.add.text(600, 400, 'Todos eliminados!!', { fontSize: '72px', fill: '#ffffff' });
        winText.setStroke('#000000', 8);
        winText.setShadow(2, 2, '#000000', 2, true, true);

        var button = this.add.text(600, 700, 'Siguiente nivel', { fontSize: '72px', fill: '#ffffff' });

        button.setStroke('#000000', 8);
        button.setShadow(2, 2, '#000000', 2, true, true);

        button.setStroke('#000000', 8);
        button.setShadow(2, 2, '#333333', 2, true, true);
        button.setPadding(10);
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start('nivel2');
            // Detener la música de fondo
            
        });
        }

        }
