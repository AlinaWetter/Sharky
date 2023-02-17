class BarrierObject {

    width = 100;
    height =  300;
    constructor(imagePath, x, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = height; 
        this.y = 480 - this.height;
        
    }
}