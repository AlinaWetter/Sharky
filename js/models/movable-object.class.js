class MovableObject {
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.75;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        },  1000 / 60);
    }

    moveDown() {

    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}