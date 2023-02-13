class Character extends MovableObject {

    width = 300;
    height = 270;
    y = 150;
    x = 120;

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        for(let x = 1; x < 19; x++) {
            this.loadImages([
            `../img/1.Sharkie/1.IDLE/${x}.png`
        ])
        }
        
    }

}