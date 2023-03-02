class StatusBar extends DrawableObject {

    // [
    //     new StatusBar(LIFE_STATUS_IMAGES, 50, 20),
    //     new StatusBar(COIN_STATUS_IMAGES, 50, 50),
    //     new StatusBar(BOMB_STATUS_IMAGES, 50, 80)
    // ]

    LIFE_STATUS_IMAGES = [
        '../img/4. Marcadores/Purple/0_ .png',
        '../img/4. Marcadores/Purple/20__1.png',
        '../img/4. Marcadores/Purple/40_ .png',
        '../img/4. Marcadores/Purple/60_ .png',
        '../img/4. Marcadores/Purple/80_ .png',
        '../img/4. Marcadores/Purple/100_ .png'
    ];
    COIN_STATUS_IMAGES = [
        '../img/4. Marcadores/Purple/0_ _1.png',
        '../img/4. Marcadores/Purple/20_ .png',
        '../img/4. Marcadores/Purple/40_ _1.png',
        '../img/4. Marcadores/Purple/60_ _1.png',
        '../img/4. Marcadores/Purple/80_ _1.png',
        '../img/4. Marcadores/Purple/100_ _1.png'
    ];
    BOMB_STATUS_IMAGES = [
        '../img/4. Marcadores/Purple/0_.png',
        '../img/4. Marcadores/Purple/20_.png',
        '../img/4. Marcadores/Purple/40_.png',
        '../img/4. Marcadores/Purple/60_.png',
        '../img/4. Marcadores/Purple/80_.png',
        '../img/4. Marcadores/Purple/100_.png'
    ];
    percentage;
    coins;
    bombs;


    constructor(img, x, y) {
        super();
        this.loadImages(img);
        // this.loadImages(this.COIN_STATUS_IMAGES);
        // this.loadImages(this.BOMB_STATUS_IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setStatus();
    }

    setStatus() {
        this.setLifeStatus();
        this.setCoinStatus();
        this.setBombStatus();
    }

    setLifeStatus() {
        this.setPercentage(100)
    }

    setCoinStatus() {
        this.setCoins(0)
    }

    setBombStatus() {
        this.setBombs(0)
    }

    setBombs(bombs) {
        this.bombs = bombs;
        let imagePath = this.BOMB_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    setCoins(coins) {
        this.coins = coins;
        let imagePath = this.COIN_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.LIFE_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex() {
        this.lifeIndex();
        this.coinIndex();
        this.bombIndex();
    }

    lifeIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }

    coinIndex() {
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

    bombIndex() {
        if (this.bombs == 5) {
            return 5
        } else if (this.bombs >= 4) {
            return 4
        } else if (this.bombs >= 3) {
            return 3
        } else if (this.bombs >= 2) {
            return 2
        } else if (this.bombs >= 1) {
            return 1
        } else {
            return 0
        }
    }
}