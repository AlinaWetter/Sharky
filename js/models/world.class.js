class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    camera_y = 0;
    level = level1;
    character = new Character();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        // this.ctx.beginPath();
        // this.ctx.lineWidth = '5';
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        // this.ctx.stroke();
        if (mo.mirror) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}