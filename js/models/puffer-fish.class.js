class PufferFish extends MovableObject {
    width;
    height;
    y;
    x;
    mirror = false;
    IMAGES_SWIMMING = []
    IMAGES_TRANSITION = []
    IMAGES_BUBBLESWIM = []
    pufferFishTransition = false;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png')
        this.x = 500 + Math.random() * (720 * 5);
        this.y = -320 + Math.random() * 800;
        this.width = 50;
        this.height = 50;
        this.speed = 0.4 + Math.random() * 1;
        this.imagesSwimming();
        this.load();
        this.animate();
        this.moveLeft();
        this.pufferFishTransition = false;

    }

    load() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
    }

    animate() {

        setInterval(() => {

            switch (true) {
                case this.pufferFishTransition:

                    this.playAnimation(this.IMAGES_BUBBLESWIM);

                break;

                // case value:

                //     break;

                // case value:

                //     break;

                default:
                    this.playAnimation(this.IMAGES_SWIMMING);
                    // this.playAnimation(this.IMAGES_BUBBLESWIM);

                    break;
            }
            
        }, 130);

    }

    imagesSwimming() {
        for (let x = 1; x < 6; x++) {
            this.IMAGES_SWIMMING.push(`img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim${x}.png`)
        };
        for (let x = 1; x < 6; x++) {
            this.IMAGES_TRANSITION.push(`img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition${x}.png`)
        };
        for (let x = 1; x < 6; x++) {
            this.IMAGES_BUBBLESWIM.push(`img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim${x}.png`)
        };
    }

    // animate() {
    //     this.moveLeft();
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_SWIMMING);
    //     }, 180);
    // }
}