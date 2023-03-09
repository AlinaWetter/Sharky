class Endboss extends MovableObject {
    width = 350;
    height = 350;
    y = 0;
    x = 720 * 5 - this.width;
    IMAGES_SWIMMING = []

    constructor() {
        super().loadImage('img/2.Enemy/3 Final Enemy/2.floating/1.png')
        // this.x = 1300 + Math.random() * 500;
        // this.y = 0 + Math.random() * 400;
        this.speed = 0.4 + Math.random() * 1;
        this.imagesSwimming();
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    imagesSwimming() {
        for(let x = 1; x < 13; x++) {
            this.IMAGES_SWIMMING.push(`img/2.Enemy/3 Final Enemy/2.floating/${x}.png`)
        }
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}