class MovableObject extends DrawableObject {
    speed = 0.75;
    energy = 100;
    lastHit;
    IMAGE_BUBBLE = '../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png'

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
            console.log(this.energy)
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
}