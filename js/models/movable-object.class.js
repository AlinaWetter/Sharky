class MovableObject {
    img;
    imageCache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    moveUp() {
        console.log('moving right')
    }

    moveDown() {

    }

    moveRight() {

    }

    moveLeft() {

    }
}