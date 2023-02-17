class Character extends MovableObject {

    width = 300;
    height = 270;
    y = 150;
    x = 120;
    speed = 4;
    world;
    IMAGES_FLOATING = [];
    IMAGES_SWIMMING = [];
    mirror = false;

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.pushImages();
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FLOATING);
        this.animate()
    }

    pushImages() {
        for (let x = 1; x < 19; x++) {
            this.IMAGES_FLOATING.push(`../img/1.Sharkie/1.IDLE/${x}.png`)
        };
        for (let x = 1; x < 7; x++) {
            this.IMAGES_SWIMMING.push(`../img/1.Sharkie/3.Swim/${x}.png`)
        }
    }

    animate() {
        this.float();
        this.swim();
    }

    swim() {
        this.move();
        this.moveRight();
        this.moveLeft();
        this.moveUp();
        this.moveDown();
    }

    move() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                let i = this.currentImage % this.IMAGES_SWIMMING.length;
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 130);
    }

    moveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.mirror = false;
                this.world.camera_x = -this.x;
            }
        }, 1000 / 60)
    }

    moveLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.mirror = true;
                this.world.camera_x = -this.x;
            }
        }, 1000 / 60)
    }

    moveUp() {
        setInterval(() => {
            if (this.world.keyboard.UP) {
                this.y -= this.speed;
                this.world.camera_y = -this.y;

            }
        }, 1000 / 60)
    }

    moveDown() {
        setInterval(() => {
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
                this.world.camera_y = -this.y;

            }
        }, 1000 / 60)
    }

    float() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_FLOATING.length;
            let path = this.IMAGES_FLOATING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 130);

    }


}