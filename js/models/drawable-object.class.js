class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x;
    y;
    width;
    height;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof JellyFish || this instanceof PufferFish || this instanceof Barrier) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character ) {
            this.getSmallerCharacterSize(ctx);
        }
    }

    getSmallerCharacterSize(ctx) {
        let x = this.x + 60;
        let y = this.y + 120;
        let width = this.width - 120;
        let height = this.height - 180;
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'red';
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    flipImageBack(ctx) {
        this.x = this.x * -1;
        ctx.restore();
    }
}