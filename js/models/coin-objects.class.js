class CoinObject extends DrawableObject{

    // IMAGES_COIN = [];

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30; 
        // this.loadImages(this.IMAGES_COIN)
        // this.pushImages();
        // this.animate();
    }

    // pushImages() {
    //     for (let x = 0; x < 5; x++) {
    //         this.IMAGES_COIN.push(`img/4. Marcadores/1. Coins/${x}.png`)
    //     }
    // }

    // animate() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_COIN)
    //     }, 130);
    // }
}
