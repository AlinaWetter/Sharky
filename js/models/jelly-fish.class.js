class JellyFish extends MovableObject {
    width = 100;
    height = 100;
    y = 150;
    x = 120;
    IMAGES_SWIMMING = [];

    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png')
        this.x = 200 + Math.random() * 500;
        this.speed = 0.4 + Math.random() * 0.8;
        this.imagesSwimming();
        this.loadImages(this.IMAGES_SWIMMING)
        this.animate();
    }

    imagesSwimming() {
        for(let x = 1; x < 5; x++) {
            this.IMAGES_SWIMMING.push(`../img/2.Enemy/2 Jelly fish/Regular damage/Yellow ${x}.png`)
        }
    }

    animate() {
        this.moveUp();
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING)
        }, 230);
    }

}