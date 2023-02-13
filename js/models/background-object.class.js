class BackgroundObject extends MovableObject {

    width = 720;
    height =  480;
    constructor(imagePath, x, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = height; 
        this.y = 480 - this.height;
        
    }


}