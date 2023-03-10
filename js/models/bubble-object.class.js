class BubbleObject extends MovableObject {

    IMAGE_BUBBLE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png'

    constructor(x, y, mirror) {
        super().loadImage(this.IMAGE_BUBBLE);
        if (mirror) {
            this.y = y + 140;
            this.x = x + 90;
            this.width = 40;
            this.height = 40;
            this.mirror = mirror
            this.attack()
        } else {
            this.y = y + 140;
            this.x = x + 110;
            this.width = 40;
            this.height = 40;
            this.mirror = mirror
            this.attack()
        }

    }

    attack() {
        if (this.mirror) {
            // this.x - 200;
            this.moveLeft();
            this.speed = 1.5;
        } else {
            this.moveRight();
            this.speed = 1.5;
        }

    }
}