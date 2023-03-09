class PufferFish extends MovableObject {
    width = 60;
    height = 60;
    y = 150;
    x;
    IMAGES_SWIMMING = []

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png')
        this.x = 450 + Math.random() * 500;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.4 + Math.random() * 1;
        this.imagesSwimming();
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    imagesSwimming() {
        for(let x = 1; x < 6; x++) {
            this.IMAGES_SWIMMING.push(`img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim${x}.png`)
        }
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 180);
    }
}