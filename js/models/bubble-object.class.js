class BubbleObject extends MovableObject {

    IMAGE_BUBBLE = '../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png'

    constructor(x, y) {
        super().loadImage(this.IMAGE_BUBBLE);
        this.y = y + 140;
        this.x = x + 150;
        this.width = 40;
        this.height = 40;
        this.attack()
    }

    attack() {
            // this.x = x;
            // this.y = y;
            this.moveRight();
            this.speed = 1.5;
    }
}