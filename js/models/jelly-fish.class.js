class JellyFish extends MovableObject {
    width = 100;
    height = 100;
    y = 150;
    x = 120;
    IMAGES_SWIMMING = [];

    constructor(x, y) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png')
        this.x = x;
        this.y = y;
        this.imagesSwimming();
        this.loadImages(this.IMAGES_SWIMMING)
        this.animate();
    }

    imagesSwimming() {
        for(let x = 1; x < 5; x++) {
            this.IMAGES_SWIMMING.push(`img/2.Enemy/2 Jelly fish/Regular damage/Yellow ${x}.png`)
        }
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING)
        }, 230);
    }

}