class JellyFish extends MovableObject {
    width = 100;
    height = 100;
    y = 150;
    x = 120;
    IMAGES_SWIMMING = [];
    IMAGES_DEAD = [];
    dead = false;

    constructor(x, y) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png')
        this.x = x;
        this.y = y;
        this.pushImages();
        this.load();
        this.animate();
    }

    pushImages() {
        this.imagesSwimming();
        this.imagesDead();

    }

    load() {
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SWIMMING);
    }

    imagesSwimming() {
        for(let x = 1; x < 5; x++) {
            this.IMAGES_SWIMMING.push(`img/2.Enemy/2 Jelly fish/Regular damage/Yellow ${x}.png`)
        }
    }

    imagesDead() {
        for(let x = 1; x < 5; x++) {
            this.IMAGES_DEAD.push(`img/2.Enemy/2 Jelly fish/Dead/Yellow/y${x}.png`)
        }
    }

    animate() {

        
        setInterval(() => {
            switch (true) {
                case this.dead:
                    this.playAnimation(this.IMAGES_DEAD)
                    this.speed = 0.5;
                    this.moveUp();
                    break;
            
                default:
                    this.playAnimation(this.IMAGES_SWIMMING)
            }
            
        }, 230);
    }

}