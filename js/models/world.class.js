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
    statusBar = new StatusBar();

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
        }, 100);
    }

    checkAttack() {
        if(this.character.isAttacking()) {
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
                this.character.hit(enemy);
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(0, this.camera_y)

        this.drawMovingObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(0, -this.camera_y);


        this.addToMap(this.statusBar);

        // draw() wird immer wieder aufgerufen.
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawMovingObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.barrierObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(new StatusBar(this.LIFE_STATUS_IMAGES, 50, 20));
        this.addToMap(new StatusBar(this.COIN_STATUS_IMAGES, 50, 50));
        this.addToMap(new StatusBar(this.BOMB_STATUS_IMAGES, 50, 80))
        this.addObjectsToMap(this.bubbleObjects);
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
        mo.drawFrame(this.ctx)
        if (mo.mirror) {
            mo.flipImageBack(this.ctx);
        }
    }
}