class Level {
    enemies;
    backgroundObjects;
    barrierObjects;
    barriers;
    level_end_x = 720 * 5;
    level_end_y = -320;
    level_start_x = 0;
    level_start_y = 230;

    constructor(enemies, backgroundObjects, barrierObjects, barriers) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.barrierObjects = barrierObjects;
        this.barriers = barriers;
    }
}