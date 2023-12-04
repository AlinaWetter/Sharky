class BombStatusBar extends DrawableObject {
    BOMB_STATUS_IMAGES = [
        'img/4.Marcadores/Purple/0_.png',
        'img/4.Marcadores/Purple/20_.png',
        'img/4.Marcadores/Purple/40_.png',
        'img/4.Marcadores/Purple/60_.png',
        'img/4.Marcadores/Purple/80_.png',
        'img/4.Marcadores/Purple/100_.png'
    ];
    bombs;

    constructor() {
        super();
        this.loadImages(this.BOMB_STATUS_IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBombs(0);
    }

    setBombs(bombs) {
        this.bombs = bombs;
        let imagePath = this.BOMB_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex() {
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