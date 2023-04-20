class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    camera_y = 0;
    level = level1;
    character = new Character();
    pufferFish = new PufferFish();
    bubbleObjects = [];
    lifeStatusBar = new LifeStatusBar();
    coinStatusBar = new CoinStatusBar();
    bombStatusBar = new BombStatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        console.log(this.level)
    }

    setWorld() {
        this.character.world = this;
        this.pufferFish.world = this;
    }

    run() {
        setInterval(() => {
            this.setMovement();
            this.checkBarrierCollision();
        }, 1000 / 60);
        setInterval(() => {
            if (!this.character.isHurt()) {
                this.character.setInstancesFalse();
            }

            this.checkCollisions();
            this.checkAttack();
            this.checkBubbleCollision();
        }, 100);
    }

    setMovement() {
        this.character.stopDown = false;
        this.character.stopUp = false;
        this.character.stopLeft = false;
        this.character.stopRight = false;
    }

    checkAttack() {
        if (this.keyboard.ATTACK && !this.character.attack) {
            this.character.attack = true;
            this.character.isAttacking();
            let bubble = new BubbleObject(this.character.x, this.character.y, this.character.mirror);
            setTimeout(() => {
                this.bubbleObjects.push(bubble);
                this.character.attack = false;
            }, 950);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.enemyCollision(enemy);
            }
            if (this.character.isNear(enemy) && enemy instanceof PufferFish && !enemy.pufferFishTransition && !enemy.isInflating) {
                this.nearPufferfish(enemy)
            } 
            if (!this.character.isNear(enemy)) {
                enemy.pufferFishTransition = false;
            }   

        });
    }

    enemyCollision(enemy) {
        this.character.hit(enemy);
        this.lifeStatusBar.setPercentage(this.character.energy)
    }

    nearPufferfish(enemy) {
        enemy.inflatingTransition();
    }

    checkBarrierCollision() {
        this.level.barriers.forEach(barrier => {
            if (this.character.isColliding(barrier) && this.character instanceof Character) {
                this.getCollisionDirection(this.character, barrier)
            };
        });
    }

    getCollisionDirection(character, barrier) {
        const dx = ((character.x + 45) + (character.width - 65) / 2) - (barrier.x + barrier.width / 2);
        const dy = ((character.y + 100) + (character.height - 130) / 2) - (barrier.y + barrier.height / 2);
        const width = ((character.width - 65) + barrier.width) / 2;
        const height = ((character.height - 130) + barrier.height) / 2;
        const crossWidth = height * dx;
        const crossHeight = width * dy;

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                return (crossWidth > -crossHeight) ? 'right' : 'top';
            } else {
                return (crossWidth > -crossHeight) ? 'bottom' : 'left';
            }
        }

        return null;
    }

    checkBarrierCollision() {
        this.level.barriers.forEach(barrier => {
            const collisionDirection = this.getCollisionDirection(this.character, barrier);
            if (collisionDirection == 'right') {
                this.character.stopLeft = true;
            };
            if (collisionDirection == 'top') {
                this.character.stopDown = true;
            };
            if (collisionDirection == 'bottom') {
                this.character.stopUp = true;
            };
            if (collisionDirection == 'left') {
                this.character.stopRight = true;
            }
        });
    }

    checkBubbleCollision() {
        this.level.enemies.forEach(enemie => {
            for (let i = 0; i < this.bubbleObjects.length; i++) {
                if (enemie instanceof JellyFish && enemie.isColliding(this.bubbleObjects[i])) {
                    enemie.dead = true;
                    this.bubbleObjects.splice(i, 1)
                }
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(0, this.camera_y)

        this.drawObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(0, -this.camera_y);

        this.drawStatusBars();

        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.barrierObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bubbleObjects);
        this.addToMap(this.character);
    }

    drawStatusBars() {
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bombStatusBar);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.mirror) {
            mo.flipImage(this.ctx);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.mirror) {
            mo.flipImageBack(this.ctx);
        }
    }
}