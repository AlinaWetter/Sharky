class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    camera_y = 0;

    backgroundObjects = [
        new BackgroundObject('../img/3. Background/Layers/5. Water/L1.png', 0, 600),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/L1.png', 0, 480),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L1.png', 0, 480),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/L1.png', 0, 480),
        // new BackgroundObject('../img/3. Background/Barrier/3.png', 720, 0),
        new BackgroundObject('../img/3. Background/Layers/5. Water/L1.png', 720, 600),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/L1.png', 720, 480),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L1.png', 720, 480),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/L1.png', 720, 480),
    ];
    character = new Character();
    jellyFishes = [
        new JellyFish(),
        new JellyFish(),

    ];
    pufferFishes = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ]

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
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.jellyFishes);
        this.addObjectsToMap(this.pufferFishes);
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
        if(mo.mirror) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        } 
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.mirror) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}