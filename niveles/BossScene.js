class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Boss' });
    }

    preload() {
        // Load background image
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
        this.load.spritesheet('bowser_vencido', 'assets/bowser_vencido.png', { frameWidth: 128, frameHeight: 121 });
        this.load.spritesheet('fuego', 'assets/fuego.png', { frameWidth: 320, frameHeight: 150 });
        this.load.spritesheet('setas', 'assets/setas.png', { frameWidth: 267, frameHeight: 235 });
        this.load.audio('seta', 'assets/seta.mp3');
        this.load.audio('nivel_ganado', 'assets/nivel_ganado.mp3');
    }

    create() {
        // Add background image
        this.add.image(950, 540, 'BossBackground').setScale(2, 1.4);

        // Define cursors for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Player
        this.player = this.physics.add.sprite(16, 800, 'toad_quieto');
        this.player.setBounce(0.2);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);

        // Create platforms (assuming 'plataformas' is a static group)
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(950, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(300, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(1600, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(600, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(1200, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(1800, 1050, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        //plataformas para que bowser no se caiga
        this.plataformas.create(1920, 600, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        this.plataformas.create(0, 600, 'plataformaBowser').setScale(1.5, 1.5).refreshBody();
        

        this.physics.add.collider(this.player, this.plataformas);
        this.player.setSize(100, 150);
        this.player.setOffset(40, 20); // Adjust player size
        this.player.lives = 3; // Variable saved in game.js

        // Player animation
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

        // Bullet animation
        this.anims.create({
            key: 'disparo',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        // Create bullet group
        this.bullets = this.physics.add.group({
            defaultKey: 'disparo',
            maxSize: 30
        });

        // Initialize ammunition
        this.municion = 10;
        this.municionText = this.add.text(16, 16, 'Municion: ' + this.municion, { fontSize: '32px', fill: '#FFF' });

        // disparo
        this.input.on('pointerdown', function (pointer) {
            if (this.municion > 0) {
                const bullet = this.bullets.get(this.player.x, this.player.y, 'disparo');
                if (bullet) {
                    bullet.enableBody(true, this.player.x, this.player.y, true, true);

                    // Calculate the direction of the shot towards the mouse pointer
                    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
                    const velocityX = Math.cos(angle) * 800;
                    const velocityY = Math.sin(angle) * 800;

                    bullet.setVelocity(velocityX, velocityY);
                    this.municion -= 1;
                    // actualizar la municion darle color y sombra
                    this.municionText.setText('Municion: ' + this.municion);
                    this.municionText.setStroke('#000', 8);
                    this.municionText.setShadow(2, 2, '#333333', 2, true, true);


                    this.player.anims.play('disparando', true);

                    // Flip the player based on the direction of the shot
                    this.player.flipX = (pointer.x < this.player.x);

                    // Play shooting sound
                    this.sound.add('shoot').play();
                }
            }
        }, this);

        //crear una seta cada 10 segundos que aumenta la municion

        this.setas = this.physics.add.group({
            defaultKey: 'setas',
            maxSize: 10
        });

        this.time.addEvent({
            delay: 10000,
            callback: () => {
                const seta = this.setas.get(Phaser.Math.Between(0, 1920), 0, 'setas').setScale(0.3);
                if (seta) {
                    seta.enableBody(true, Phaser.Math.Between(0, 1920), 0, true, true).setCollideWorldBounds(true);
                    seta.setVelocity(0, 100);
                }
            },
            loop: true
        });


        
         //marcador del nivel con la funcion marcador_nivel
         this.marcador_nivel = marcador_nivel(this.scene.key);
         this.marcador_nivelText = this.add.text(1670, 16, this.marcador_nivel, { fontSize: '48px', fill: '#ffffff' });  
         this.marcador_nivelText.setStroke('#086b53', 8);
         this.marcador_nivelText.setShadow(2, 2, '#333333', 2, true, true);
 
      
         //marcador de vidas
            this.vidasText = this.add.text(16, 50, 'Vidas: ' + this.player.lives, { fontSize: '32px', fill: '#FFF' });
            this.vidasText.setStroke('#000', 8);
            this.vidasText.setShadow(2, 2, '#333333', 2, true, true);
       



 
   


        // Recoger seta
        // Correct collision handling for 'setas'
        this.physics.add.overlap(this.player, this.setas, (player, seta) => {
            this.municion += 5;
            this.municionText.setText('Municion: ' + this.municion);
            seta.disableBody(true, true);
            this.sound.add('seta').play();
        });
        

        // Create Bowser
        this.createBowser();
        this.createBowserAnimations();
        this.createCollisions();
        this.moveBowser(); // mover a bowser
        this.createFireballs(); // crear bolas de fuego

            // Añadir colisiones
            this.physics.add.collider(this.bullets, this.bowser, this.hitBowser, null, this);
            this.physics.add.overlap(this.player, this.fireballs, this.playerHit, null, this);
            this.physics.add.collider(this.player, this.bowser, this.bowserHitPlayer, null, this);
            //setas colisiones con las plataformas
            this.physics.add.collider(this.setas, this.plataformas);
            // Remove duplicate collision handling for 'setas'
            

        }
    update() {
        //controles del jugador
        const cursors = this.cursors;

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
            this.player.setVelocityY(-1500);
            this.player.anims.play('toad_saltando', true);
        }
    }

    createBowser() {
        this.bowser = this.physics.add.sprite(1920 - 16, 800, 'bowser'); // Position Bowser at the far right
        this.bowser.setBounce(0.2);
        this.bowser.setScale(3);
        this.bowser.setCollideWorldBounds(true);
        this.bowser.setSize(100, 90);
        this.bowser.setOffset(8, 25);
        this.bowser.lives = 150; // Bowser can withstand 50 hits
        this.physics.add.collider(this.bowser, this.plataformas);
        this.physics.add.collider(this.bowser, this.player);
        this.bowser.anims.play('bowser', true);
        this.bowser.isInvencible = false;
        this.bowser.flipX = true; // Make Bowser face the opposite direction
    }
    
    // Bowser animation
    createBowserAnimations() {
        this.anims.create({
            key: 'bowser',
            frames: this.anims.generateFrameNumbers('bowser', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'fuego',
            frames: this.anims.generateFrameNumbers('fuego', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        });


        this.anims.create({
            key: 'bowser_vencido',
            frames: this.anims.generateFrameNumbers('bowser_vencido', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
    }
    moveBowser() {
        const moveDuration = 1000; // Duration for each movement phase
        const jumpHeight = -1900; // Height of Bowser's jump
        // tardar menos en caer
        this.bowser.body.gravity.y = 1000;
    
        // Move Bowser in random directions
        this.time.addEvent({
            delay: moveDuration,
            callback: () => {
                // 80% chance to move towards the player, 20% chance to move randomly
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
    
                // Flip Bowser based on the direction of movement
                if (this.bowser.body.velocity.x > 0) {
                    this.bowser.flipX = true; // Face right
                } else if (this.bowser.body.velocity.x < 0) {
                    this.bowser.flipX = false; // Face left
                }
    
                // Play Bowser's movement animation
                this.bowser.anims.play('bowser', true);
            },
            loop: true
        });
    
        // Make Bowser jump frequently
        this.time.addEvent({
            delay: moveDuration, // Adjust the delay as needed
            callback: () => {
                if (this.bowser.body.touching.down) {
                    this.bowser.setVelocityY(jumpHeight);
                    // Play Bowser's jump animation
                    this.bowser.anims.play('bowser', true);
                }
            },
            loop: true
        });
    }
    

    // Crear grupo de bolas de fuego
    createFireballs() {
        this.fireballs = this.physics.add.group({
            defaultKey: 'fuego',
            maxSize: 10
        });

        // Disparar bola de fuego cada 5 segundos
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                const fireball = this.fireballs.get(this.bowser.x, this.bowser.y, 'fuego');
                if (fireball) {
                    fireball.body.allowGravity = false;
                    fireball.enableBody(true, this.bowser.x, this.bowser.y, true, true);
                    // Reproducir la animación de la bola de fuego una vez y despues se queda en el sprite 4
                    fireball.anims.play('fuego', true);
                    fireball.on('animationcomplete', () => {
                        fireball.anims.stop();
                        fireball.setFrame(4);
                    });



                    // Calcular la dirección del disparo
                    let velocityX;
                    if (this.bowser.x > 960) { // Bowser está en el lado derecho
                        velocityX = -300; // Disparar a la izquierda
                        fireball.flipX = true; // Cambiar la animación hacia la izquierda
                    } else { // Bowser está en el lado izquierdo
                        velocityX = 300; // Disparar a la derecha
                        fireball.flipX = false; // Cambiar la animación hacia la derecha
                    }

                    fireball.setVelocity(velocityX, 0);

                    // Deshabilitar la bola de fuego cuando salga de la pantalla
                    fireball.setCollideWorldBounds(true);
                    fireball.body.onWorldBounds = true;
                    fireball.body.world.on('worldbounds', (body) => {
                        if (body.gameObject === fireball) {
                            fireball.disableBody(true, true);
                        }
                    });
                }
            },
            loop: true
        });
    }
    createCollisions() {
        this.physics.add.collider(this.player, this.plataformas);
        this.physics.add.collider(this.bullets, this.plataformas, (bullet) => bullet.disableBody(true, true));
        this.physics.add.collider(this.bullets, this.bowser, this.hitBowser, null, this);
        this.physics.add.collider(this.player, this.fireballs, this.playerHit, null, this);
    }

    // daño al jugador
    // daño al jugador
    playerHit(player, fireball) {
        if (!player.isInvencible) {
            player.lives -= 1;
            player.isInvencible = true;
            player.setTint(0xff0000); // Optional: Add a visual effect to indicate damage
            this.time.delayedCall(100, () => {
                player.clearTint();
            });
            if (player.lives <= 0) {
                player.disableBody(true, true);
                this.scene.start('GameOver');
            }
            this.sound.add('hit').play();
            this.time.delayedCall(1000, () => {
                player.isInvencible = false;
            });
        }
        fireball.disableBody(true, true); // Make the fireball disappear
    }

    // Bowser hits player
    bowserHitPlayer(player, bowser) {
        if (!player.isInvencible) {
            player.lives -= 1;
            player.isInvencible = true;
            player.setTint(0xff0000); // Optional: Add a visual effect to indicate damage
            this.time.delayedCall(100, () => {
                player.clearTint();
            });
            if (player.lives <= 0) {
                player.disableBody(true, true); 
                this.scene.start('GameOver');
                
            }
            this.sound.add('hit').play();
            this.time.delayedCall(1000, () => {
                player.isInvencible = false;
            });
        }
    }

    

    // daño a bowser
    hitBowser(bowser) {
        bowser.lives -= 1;
        if (bowser.lives <= 0) {
            // Reproducir sonido de nivel ganado
            this.sound.add('nivel_ganado').play();
            bowser.disableBody(true, true);
            bowser.anims.play('bowser_vencido', true);
            //desaparecer jugador
             this.player.disableBody(true, true);
             this.player.image = this.add.image(960, 900, 'toad_celebrar');
            ;
            this.time.delayedCall(7000, () => {
                this.scene.start('Victoria');
            });
        } else {
            bowser.setTint(0xff0000); // Optional: Add a visual effect to indicate damage
            this.time.delayedCall(100, () => {
                bowser.clearTint();
            });
        }
    }
    // actualizar el movimiento de bowser según hacia donde se mueve
    updateBowserMovement() {
        if (this.bowser.body.velocity.x > 0) {
            this.bowser.flipX = true; // Flip to face left
            this.bowser.anims.play('bowser', true);
        } else if (this.bowser.body.velocity.x < 0) {
            this.bowser.flipX = false; // Flip to face right
            this.bowser.anims.play('bowser', true);
        }
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

    
}


