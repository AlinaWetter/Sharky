class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    camera_y = 0;
    level = level1;
    character = new Character();
    movableObject = new MovableObject();
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
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkAttack();
            this.checkBarrierCollision();
        }, 100);
    }

    checkAttack() {
        if (this.character.isAttacking()) {
            this.character.attack();
        }
        if (this.keyboard.ATTACK) {
            this.character.lastAttack = new Date().getTime()
            let bubble = new BubbleObject(this.character.x, this.character.y);
            setTimeout(() => {
                this.bubbleObjects.push(bubble);
            }, 700);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                console.log('enemie Collide')
                this.character.hit(enemy);
                this.lifeStatusBar.setPercentage(this.character.energy)
            }
        });
    }

    

    checkBarrierCollision() {
        this.level.barriers.forEach(barrier => {
            if(this.character.isColliding(barrier)) {
                console.log('barrier Collide')
                this.character.barrierCollide();
            } else {
                this.character.stopLeft = false;
                this.character.stopRight = false;
                this.character.stopUp = false;
                this.character.stopDown = false;
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

        // draw() wird immer wieder aufgerufen.
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.barrierObjects);
        this.addBarriersToMap(this.level.barriers)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bubbleObjects);
        this.addToMap(this.character);
    }

    // drawMovingObjects() {
        
    // }

    drawStatusBars() {
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bombStatusBar);
    }

    addBarriersToMap(objects) {
        objects.forEach(o => {
            this.addBarrier(o)
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addBarrier(mo) {
        // mo.drawBarrier(this.ctx);
        mo.drawFrame(this.ctx)
    }

    addToMap(mo) {
        if (mo.mirror) {
            mo.flipImage(this.ctx);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo == this.character) {
            mo.getSmallerCharacterSize(this.ctx);
        }
        if (mo.mirror) {
            mo.flipImageBack(this.ctx);
        }
    }
}