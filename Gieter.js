

class Gieter extends Draggable {
    constructor(surface, offset) {
        super(surface, offset, {x: 0, y: -172});

        this.rect = {
            x: 0, y: 0,
            w: 237,
            h: 172
        }

        this.waterlevel = 1;

        this.waterring = false;
    }

    update(dt) {
        super.update(dt);

        if (this.waterring) {
            this.waterlevel -= dt * 0.1;
        }

        if (this.waterlevel < 0) {
            this.waterlevel = 1;
        }
    }

    draw() {
        drawLine(
            this.rect.x + 100,
            this.rect.y + 40 + (1 - this.waterlevel) * 120,
            this.rect.x + 100,
            this.rect.y + 160,
            "#366ceb", 30);
        drawImage(this.rect.x, this.rect.y, "gieter");
        if (this.waterring) {
            this.drawWater();
        }
    }

    drawWater() {
        drawImage(this.rect.x + 200, this.rect.y - 83, "water");
    }

    keydown(e) {
        if (this.movestate == mvstate.DRAGGING) {
            if (e.code == "Space") {
                // this.waterring = true;
            }
        }
    }

    keyup(e) {
        if (e.code == "Space") {
            // this.waterring = false;
        }
    }

}
