class World {
    ctx;
    canvas;
    backgroundObjects = [
        new BackgroundObject('../img/3. Background/Layers/5. Water/L1.png', 0, 600),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/L1.png', 0, 480),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L1.png', 0, 480),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/L1.png', 0, 480),
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

    constructor() {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.jellyFishes);
        this.addObjectsToMap(this.pufferFishes);
        this.addToMap(this.character);

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    }
}