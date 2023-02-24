class Character extends MovableObject {

    width = 250;
    height = 250;
    y = 110;
    x = 120;
    x_side_gap = 120;
    y_side_gap = 100;
    overlap = 10;
    speed = 6;
    world;
    IMAGES_FLOATING = [];
    IMAGES_SWIMMING = [];
    IMAGES_HURT_POISON = [];
    IMAGES_HURT_ELECTRIC = [];
    IMAGES_DEAD_POISON = [];
    IMAGES_DEAD_ELECTRIC = [];


    mirror = false;
    diving_sound = new Audio('../audio/diving.mp3');

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.pushImages();
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC);
        this.animate()
    }

    pushImages() {
        for (let x = 1; x < 19; x++) {
            this.IMAGES_FLOATING.push(`../img/1.Sharkie/1.IDLE/${x}.png`)
        };
        for (let x = 1; x < 7; x++) {
            this.IMAGES_SWIMMING.push(`../img/1.Sharkie/3.Swim/${x}.png`)
        }
        for (let x = 1; x < 4; x++) {
            this.IMAGES_HURT_ELECTRIC.push(`../img/1.Sharkie/5.Hurt/2.Electric shock/${x}.png`)
        }
        for (let x = 1; x < 5; x++) {
            this.IMAGES_HURT_POISON.push(`../img/1.Sharkie/5.Hurt/1.Poisoned/${x}.png`)
        }
        for (let x = 1; x < 13; x++) {
            this.IMAGES_DEAD_POISON.push(`../img/1.Sharkie/6.dead/1.Poisoned/${x}.png`)
        }
        for (let x = 1; x < 11; x++) {
            this.IMAGES_DEAD_ELECTRIC.push(`../img/1.Sharkie/6.dead/2.Electro_shock/${x}.png`)
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

    float() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_FLOATING);
        }, 300);
    }

    move() {
        setInterval(() => {
            this.diving_sound.pause();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.diving_sound.play();
            }
        }, 130);
    }

    moveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x > - this.overlap && this.x < this.x_side_gap) {
                this.x += this.speed;
                this.world.camera_x = 0;
                this.mirror = false;
            };

            if (this.world.keyboard.RIGHT && this.x >= this.x_side_gap && this.x <= this.world.level.level_end_x - 720 + this.x_side_gap) {
                this.x += this.speed;
                this.world.camera_x = -this.x + this.x_side_gap;
                this.mirror = false;
            };

            if (this.world.keyboard.RIGHT && this.x > this.world.level.level_end_x - 720 + this.x_side_gap && this.x < this.world.level.level_end_x - this.width) {
                this.x += this.speed;
                this.world.camera_x = -this.world.level.level_end_x + 720;
                this.mirror = false;
            };
        }, 1000 / 60)
    }

    moveLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0 && this.x <= this.x_side_gap) {
                this.x -= this.speed;
                this.world.camera_x = 0;
                this.mirror = true;
            };

            if (this.world.keyboard.LEFT && this.x >= this.x_side_gap && this.x <= this.world.level.level_end_x - this.x_side_gap) {
                this.x -= this.speed;
                this.world.camera_x = -this.x + this.x_side_gap;
                this.mirror = true;
            };

            if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_x - 720 + this.x_side_gap && this.x < this.world.level.level_end_x - this.width) {
                this.x -= this.speed;
                this.world.camera_x = -this.world.level.level_end_x + 720;
                this.mirror = true;
            };
        }, 1000 / 60)
    }

    moveUp() {
        setInterval(() => {
            if (this.world.keyboard.UP && this.y > this.world.level.level_end_y - this.overlap - 60 && this.y < this.world.level.level_end_y + this.y_side_gap) {
                this.y -= this.speed;
                this.world.camera_y = -this.world.level.level_end_y;
            };

            if (this.world.keyboard.UP && this.y >= this.world.level.level_end_y + this.y_side_gap && this.y <= this.y_side_gap) {
                this.y -= this.speed;
                this.world.camera_y = -this.y + this.y_side_gap;
            };

            if (this.world.keyboard.UP && this.y < this.world.level.level_start_y + this.overlap + 20 && this.y > this.y_side_gap) {
                this.y -= this.speed;
                this.world.camera_y = 0;
            };
        }, 1000 / 60)
    }

    moveDown() {
        setInterval(() => {
            if (this.world.keyboard.DOWN && this.y > this.world.level.level_end_y - this.overlap - 70 && this.y < this.world.level.level_end_y + this.y_side_gap) {
                this.y += this.speed;
                this.world.camera_y = 320;
            };

            if (this.world.keyboard.DOWN && this.y >= this.world.level.level_end_y + this.y_side_gap && this.y <= this.y_side_gap) {
                this.y += this.speed;
                this.world.camera_y = -this.y + this.y_side_gap;
            };

            if (this.world.keyboard.DOWN && this.y < this.world.level.level_start_y + this.overlap + 10 && this.y > this.y_side_gap) {
                this.y += this.speed;
                this.world.camera_y = 0;
            };
        }, 1000 / 60)
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height)
        // obj.onCollisionCourse; xy// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    poisoned() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_HURT_POISON);
        }, 130);
    }

    electrified() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_HURT_ELECTRIC);
        }, 130);
    }

    dead() {
        if (this.isDead()) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD_ELECTRIC);
            }, 130);
        }

    }



}