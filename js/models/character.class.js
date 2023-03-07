class Character extends MovableObject {
    IMAGES_FLOATING = [];
    IMAGES_SWIMMING = [];
    IMAGES_HURT_POISON = [];
    IMAGES_HURT_ELECTRIC = [];
    IMAGES_DEAD_POISON = [];
    IMAGES_DEAD_ELECTRIC = [];
    IMAGES_ATTACK_BUBBLE_NORMAL = [];
    bubble = new BubbleObject();
    x_side_gap = 120;
    y_side_gap = 100;
    overlap = 10;
    speed = 6;
    world;
    lastAttack;
    stopLeft = false;
    stopRight = false;
    stopUp = false;
    stopDown = false;

    mirror = false;
    diving_sound = new Audio('../audio/diving.mp3');

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.pushImages();
        this.width = 250;
        this.height = 250;
        this.y = 110;
        this.x = 120;
        this.load();
        this.animate();
    }

    load() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_NORMAL);
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
        for (let x = 1; x < 9; x++) {
            this.IMAGES_ATTACK_BUBBLE_NORMAL.push(`../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/${x}.png`)
        }
    }

    animate() {
        this.float();
        this.swim();
    }

    attack() {
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE_NORMAL);
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
            if (!this.isHurt() && !this.isAttacking() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_FLOATING);
            }
        }, 300);
    }

    move() {
        setInterval(() => {
            this.diving_sound.pause();
            if (!this.isHurt() && !this.isAttacking()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_SWIMMING);
                    this.diving_sound.play();
                }
            }
        }, 130);
    }

    moveRight() {
        setInterval(() => {
            if (!this.stopRight) {
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
            }

        }, 1000 / 60)
    }

    moveLeft() {
        setInterval(() => {
            if (!this.stopLeft) {
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
            }

        }, 1000 / 60)
    }

    moveUp() {
        setInterval(() => {
            if (!this.stopUp) {
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
            }

        }, 1000 / 60)
    }

    moveDown() {
        setInterval(() => {
            if (!this.stopDown) {
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
            }

        }, 1000 / 60)
    }

    isColliding(obj) {
        let smallerX = this.x + 45;
        let smallerY = this.y + 100;
        let smallerWidth = this.width - 65;
        let smallerHeight = this.height - 130;

        return (smallerX + smallerWidth) >= obj.x && smallerX <= (obj.x + obj.width) &&
            (smallerY + smallerHeight) >= obj.y &&
            (smallerY) <= (obj.y + obj.height)
        // obj.onCollisionCourse; xy// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    // barrierCollide(x, y, width, height) {
    //     if (x + width == this.x) {
    //         console.log('left')
    //     };
    //     if (this.world.keyboard.UP) {
    //         this.stopMovingUp();
    //     };
    //     if (this.world.keyboard.RIGHT) {
    //         this.stopMovingRight();
    //     };
    //     if (this.world.keyboard.DOWN) {
    //         this.stopMovingDown();
    //     };
    // }

    barrierCollideLeft(x, y, width, height) {
        if(x + width == this.x) {
            this.stopLeft == true;
        }
    }
    barrierCollideTop(x, y, width, height) {
        if(y + height == this.y) {
            this.stopUp == true;
        }
    }
    barrierCollideRight(x, y, width, height) {
        if(x == this.x + this.width) {
            this.stopRight == true;
        }
    }
    barrierCollideBottom(x, y, width, height) {
        if(y == this.y + this.height) {
            this.stopDown == true;
        }
    }

    // stopMovingLeft() {

    // }

    // stopMovingRight() {

    // }

    // stopMovingUp() {

    // }

    // stopMovingDown() {

    // }

    // barrierCollide() {
    //     if (this.barrierCollideSide() == 'left') {
    //         this.stopMovingLeft();
    //     };
    //     if (this.barrierCollideSide() == 'top') {
    //         this.stopMovingUp();
    //     };
    //     if (this.barrierCollideSide() == 'right') {
    //         this.stopMovingRight();
    //     };
    //     if (this.barrierCollideSide() == 'bottom') {
    //         this.stopMovingDown();
    //     }
    // }

    // barrierCollideSide() {
    //     let smallerX = this.x + 45;
    //     let smallerY = this.y + 100;
    //     let smallerWidth = this.width - 65;
    //     let smallerHeight = this.height - 130;

    //     if
    // }

    isAttacking() {
        let timepassed = new Date().getTime() - this.lastAttack;
        timepassed = timepassed / 1000;
        if (timepassed < 0.795) {
            return true;
        }
    }

    poisoned() {
        this.playAnimation(this.IMAGES_HURT_POISON);
    }

    electrified() {
        this.playAnimation(this.IMAGES_HURT_ELECTRIC);
    }

    deadPoison() {
        this.playAnimation(this.IMAGES_DEAD_POISON);
    }

    deadElectric() {
        this.playAnimation(this.IMAGES_DEAD_ELECTRIC);
    }





}