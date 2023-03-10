class MovableObject extends DrawableObject {
    speed = 4;
    energy = 100;
    lastHit;
    x_side_gap = 120;
    y_side_gap = 100;
    overlap = 10;
    mirror;
    world;
    


    playAnimation(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60);
    }

    moveDown() {
        setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60);
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    moveLeft() {

        setInterval(() => {
            if (this.x < 0) {
                this.x = 720 * 5;
                this.y = -320 + Math.random() * 800;
            }
            this.x -= this.speed;
        }, 1000 / 60);
    }

    hit(enemy) {

        if (this.energy > 0) {
            this.energy -= 1;
            this.lastHit = new Date().getTime();

            if (enemy instanceof PufferFish && this.isHurt()) {
                this.hurt('poisoned');
            }
            if (enemy instanceof JellyFish && this.isHurt()) {
                this.hurt('electrified');

            }
        }

        if (this.energy <= 0) {
            this.energy = 0;

            if (enemy instanceof PufferFish) {
                this.hurt('deadPoison');

            }
            if (enemy instanceof JellyFish) {
                this.hurt('deadElectric');

            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4
    }

    isColliding(obj) {
        let smallerX = this.x + 60;
        let smallerY = this.y + 120;
        let smallerWidth = this.width - 120;
        let smallerHeight = this.height - 180;

        return (smallerX + smallerWidth) >= obj.x && smallerX <= (obj.x + obj.width) &&
            (smallerY + smallerHeight) >= obj.y &&
            (smallerY) <= (obj.y + obj.height)
    }

    isNear(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height)
    }
}