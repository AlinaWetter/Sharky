class LifeStatusBar extends DrawableObject {
    LIFE_STATUS_IMAGES = [
        '../img/4. Marcadores/Purple/0_ .png',
        '../img/4. Marcadores/Purple/20__1.png',
        '../img/4. Marcadores/Purple/40_ .png',
        '../img/4. Marcadores/Purple/60_ .png',
        '../img/4. Marcadores/Purple/80_ .png',
        '../img/4. Marcadores/Purple/100_ .png'
    ];
    percentage;

    constructor() {
        super();
        this.loadImages(this.LIFE_STATUS_IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.LIFE_STATUS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex() {
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
}