class MovableObject extends DrawableObject {
    speed = 0.75;
    energy = 100;
    lastHit;
    world;
    x_side_gap = 120;
    y_side_gap = 100;
    overlap = 10;
    speed = 6;

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
            this.x -= this.speed;
        }, 1000 / 60);
    }

    hit(enemy) {

        if (this.energy > 0) {
            this.energy -= 1;
            this.lastHit = new Date().getTime();

            if (enemy instanceof PufferFish && this.isHurt()) {
                this.poisoned();
            }
            if (enemy instanceof JellyFish && this.isHurt()) {
                this.electrified();
            }
        }

        if (this.energy <= 0) {
            this.energy = 0;

            if (enemy instanceof PufferFish) {
                this.deadPoison();
            }
            if (enemy instanceof JellyFish) {
                this.deadElectric();
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5
    }

    isColliding(obj) {
        let smallerX = this.x + 45;
        let smallerY = this.y + 100;
        let smallerWidth = this.width - 65;
        let smallerHeight = this.height - 130;

        return (smallerX + smallerWidth) >= obj.x && smallerX <= (obj.x + obj.width) &&
            (smallerY + smallerHeight) >= obj.y &&
            (smallerY) <= (obj.y + obj.height)
    }
}