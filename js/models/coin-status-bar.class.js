class CoinStatusBar extends DrawableObject {
    COIN_STATUS_IMAGES = [
        '../img/4. Marcadores/Purple/0_ _1.png',
        '../img/4. Marcadores/Purple/20_ .png',
        '../img/4. Marcadores/Purple/40_ _1.png',
        '../img/4. Marcadores/Purple/60_ _1.png',
        '../img/4. Marcadores/Purple/80_ _1.png',
        '../img/4. Marcadores/Purple/100_ _1.png'
    ];
    coins;

    constructor() {
        super();
        this.loadImages(this.COIN_STATUS_IMAGES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    setCoins(coins) {
        this.coins = coins;
        let imagePath = this.COIN_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex() {
        if (this.coins == 5) {
            return 5
        } else if (this.coins >= 4) {
            return 4
        } else if (this.coins >= 3) {
            return 3
        } else if (this.coins >= 2) {
            return 2
        } else if (this.coins >= 1) {
            return 1
        } else {
            return 0
        }
    }
}