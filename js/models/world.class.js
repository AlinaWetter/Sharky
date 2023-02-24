class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    camera_y = 0;
    level = level1;
    character = new Character();
    movableObject = new MovableObject();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    setInterval(() => {
                        if (this.character.isColliding(enemy)) {
                            this.character.hit(enemy);
                        }
                    }, 1000 / 60);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(0, this.camera_y)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.barrierObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.translate(0, -this.camera_y)

        // draw() wird immer wieder aufgerufen.
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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