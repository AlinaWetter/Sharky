class BarrierObject extends MovableObject{
    constructor(imagePath, x, y, width, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        // this.y = 480 - this.height;
    }
}