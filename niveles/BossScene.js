class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Boss' });
    }

    preload() {
        //cargar la imagen de fondo
        this.load.image('BossBackground', 'assets/fondoBoss.png');
        this.load.image('plataformaBowser', 'assets/plataformaBowser.png');
        this.load.spritesheet('toad_quieto', 'assets/toad_quieto.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_moviendose', 'assets/toad_moviendose.png', { frameWidth: 186, frameHeight: 183 });
        this.load.spritesheet('toad_saltando', 'assets/toad_saltando.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_daño', 'assets/toad_daño.png', { frameWidth: 170, frameHeight: 183 });
        this.load.spritesheet('toad_disparando', 'assets/toad_disparando.png', { frameWidth: 170, frameHeight: 183 });
        this.load.image('toad_celebrar', 'assets/toad_celebrar.png');
        this.load.spritesheet('disparo', 'assets/disparo.png', { frameWidth: 114.6, frameHeight: 101 });
        this.load.audio('shoot', 'assets/shoot.mp3');
        this.load.audio('hit', 'assets/hit.mp3');
        this.load.audio('salto', 'assets/salto.mp3');
        this.load.spritesheet('bowser', 'assets/bowser.png', { frameWidth: 112, frameHeight: 141 });
    }

    create() {
        // añadir la imagen de fondo
        this.add.image(950, 540, 'BossBackground').setScale(2,1.4);

        // jugador
        this.player = this.physics.add.sprite(16, 800, 'toad_quieto');
        this.player.setBounce(0.2);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);
        
        // Crear plataformas (suponiendo que 'plataformas' es un grupo de estáticos)
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(950, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(300, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(1600, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();

        this.physics.add.collider(this.player, this.plataformas);
        this.player.setSize(100, 150);
        this.player.setOffset(40, 20); // ajustar el tamaño del jugador 
        this.player.lives = 3; // variable guardada en game.js

        //velocidad del jugador
        this.playerSpeed = 250;

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

        // animacion del disparo
        this.anims.create({
            key: 'disparo',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        // Crear grupo de balas
        this.bullets = this.physics.add.group({
            defaultKey: 'disparo',
            maxSize: 30
        });

        // Inicializar munición
        this.municion = 10;
        this.municionText = this.add.text(16, 16, 'Municion: ' + this.municion, { fontSize: '32px', fill: '#FFF' });

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

        // Crear a Bowser
        this.createBowser();
        this.createBowserAnimations();
        this.createCollisions();
    }

    // create Bowser
    createBowser() {
        this.bowser = this.physics.add.sprite(1920 - 16, 800, 'bowser'); // Position Bowser at the far right
        this.bowser.setBounce(0.2);
        this.bowser.setScale(3);
        this.bowser.setCollideWorldBounds(true);
        this.bowser.setSize(100, 90);
        this.bowser.setOffset(8, 25);
        this.bowser.lives = 3;
        this.physics.add.collider(this.bowser, this.plataformas);
        this.physics.add.collider(this.bowser, this.player);
        this.bowser.anims.play('bowser', true);
    }

    // Bowser animation
    createBowserAnimations() {
        this.anims.create({
            key: 'bowser',
            frames: this.anims.generateFrameNumbers('bowser', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
    }

    //movimiento de bowser
    moveBowser() {
        const moveDuration = 1000; // Duration for each movement phase
        const jumpHeight = -1900; // Height of Bowser's jump
        // tardar menos en caer
        this.bowser.body.gravity.y = 1000;
        

        // Move Bowser in random directions
        this.time.addEvent({
            delay: moveDuration,
            callback: () => {
            // 80% chance to move towards the player, 80% chance to move randomly
            if (Math.random() < 0.8) {
                const angle = Phaser.Math.Angle.Between(this.bowser.x, this.bowser.y, this.player.x, this.player.y);
                const velocityX = Math.cos(angle) * 200;
                const velocityY = Math.sin(angle) * 200;
                this.bowser.setVelocity(velocityX, velocityY);
            } else {
                const randomAngle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
                const randomVelocityX = Math.cos(randomAngle) * 200;
                const randomVelocityY = Math.sin(randomAngle) * 200;
                this.bowser.setVelocity(randomVelocityX, randomVelocityY);
            }
            },
            loop: true
        });

        // Make Bowser jump frequently
        this.time.addEvent({
            delay: moveDuration, // Adjust the delay as needed
            callback: () => {
            if (this.bowser.body.touching.down) {
                this.bowser.setVelocityY(jumpHeight);

            }
            },
            loop: true
        });
    }



    // colisiones
    createCollisions() {
        this.physics.add.collider(this.bullets, this.bowser, this.hitBowser, null, this);
    }

    // daño a bowser
    hitBowser(bullet, bowser) {
        bullet.disableBody(true, true);
        bowser.lives -= 1;
        if (bowser.lives <= 0) {
            bowser.disableBody(true, true);
            this.player.anims.play('toad_celebrar', true);
            this.time.delayedCall(2000, () => {
                this.scene.start('Victoria');
            });
        }
        this.sound.add('hit').play();
    }

    // crear la cámara
    createCamera() {
        // Camera
        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.cameras.main.startFollow(this.player);
    }

    cameraShake() {
        this.cameras.main.shake(100);
    }

    create() {
        // añadir la imagen de fondo
        this.add.image(950, 540, 'BossBackground').setScale(2,1.4);

        // jugador
        this.player = this.physics.add.sprite(16, 800, 'toad_quieto');
        this.player.setBounce(0.2);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);
        
        // Crear plataformas (suponiendo que 'plataformas' es un grupo de estáticos)
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(950, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(300, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(1600, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();

        this.physics.add.collider(this.player, this.plataformas);
        this.player.setSize(100, 150);
        this.player.setOffset(40, 20); // ajustar el tamaño del jugador 
        this.player.lives = 3; // variable guardada en game.js

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

        // animacion del disparo
        this.anims.create({
            key: 'disparo',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        // Crear grupo de balas
        this.bullets = this.physics.add.group({
            defaultKey: 'disparo',
            maxSize: 30
        });

        // Inicializar munición
        this.municion = 10;
        this.municionText = this.add.text(16, 16, 'Municion: ' + this.municion, { fontSize: '32px', fill: '#FFF' });

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

        // Crear a Bowser
        this.createBowser();
        this.createBowserAnimations();
        this.createCollisions();
        this.moveBowser(); // Move Bowser initialization here
    }

    update() {
        //controles del jugador
        const cursors = this.input.keyboard.createCursorKeys();
        this.playerSpeed = 200; // Add player speed
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

        // Actualizar la posición de las balas
        this.bullets.children.iterate((bullet) => {
            if (bullet.active) {
                if (bullet.x < 0 || bullet.x > 1920 || bullet.y < 0 || bullet.y > 1080) {
                    bullet.disableBody(true, true);
                }
            }
        });

        // Update Bowser's flip based on velocity
        if (this.bowser.body.velocity.x < 0) {
            this.bowser.flipX = false; // Flip to the left
            //animacion de bowser
            this.bowser.anims.play('bowser', true);
        } else if (this.bowser.body.velocity.x > 0) {
            this.bowser.flipX = true; // Flip to the right
            //animacion de bowser
            this.bowser.anims.play('bowser', true);
        }
    }
}
