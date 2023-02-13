class PufferFish extends MovableObject {

    width = 60;
    height = 60;
    y = 150;
    x = 120;

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png')
        this.x = 200 + Math.random() * 500;
        this.y = 0 + Math.random() * 400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.75;
        },  1000 / 60);
    }

}