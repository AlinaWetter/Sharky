class JellyFish extends MovableObject {

    width = 100;
    height = 100;
    y = 150;
    x = 120;


    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png')
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.y -= 0.75;
        },  1000 / 60);
    }

}