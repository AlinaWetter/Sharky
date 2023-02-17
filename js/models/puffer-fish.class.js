class PufferFish extends MovableObject {

    width = 60;
    height = 60;
    y = 150;
    x = 120;
    IMAGES_SWIMMING = []

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png')
        this.x = 200 + Math.random() * 500;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.4 + Math.random() * 1;
        this.imagesSwimming();
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    imagesSwimming() {
        for(let x = 1; x < 6; x++) {
            this.IMAGES_SWIMMING.push(`../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim${x}.png`)
        }
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}