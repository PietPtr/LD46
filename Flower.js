
const floweroffset = {x: -45, y: -330};
const headoffset = {x: 30, y: 5};
//                  0       1          2             3      4      5        6
const emotions = ["angry", "asleep", "delighted", "happy", "sad", "sick", "surprised"]

const mvstate = {
    STANDING: "standing",
    DRAGGING: "dragging",
    FALLING: "falling"
};

class Flower extends Draggable {
    constructor(surface, xoffset) {
        super(surface, xoffset, floweroffset);

        this.beingwaterred = false;
        this.insun = false;

        this.waternecessary = 1;
        this.lightnecessary = 1;
    }

    update(dt) {
        super.update(dt);

        if (length({x: gieter.rect.x - this.rect.x, y: gieter.rect.y - this.rect.y}) < 350 &&
            gieter.rect.x < this.rect.x - 100 &&
            gieter.rect.y > this.rect.y - 100) {
            gieter.waterring = true;
            this.beingwaterred = true;
        } else {
            gieter.waterring = false;
            this.beingwaterred = false;
        }

        this.insun = (this.rect.x > 706 && this.rect.x < 1237);


        if (this.beingwaterred) {
            this.waternecessary = Math.max(0, this.waternecessary - 0.1 * dt);
        }

        if (this.insun) {
            this.lightnecessary = Math.max(0, this.lightnecessary - 0.08 * dt);
            this.waternecessary = Math.min(1, this.waternecessary + 0.004 * dt);
        }
        this.waternecessary = Math.min(1, this.waternecessary + 0.001 * dt);

    }

    draw() {
        switch (this.movestate) {
            case mvstate.STANDING:
                let base = 0;
                this.drawFlower(this.rect.x, this.rect.y, "bloembase" + base, this.emotion());
                break;
            case mvstate.DRAGGING:
                let part = 3 + Math.floor(now / 230) % 3
                this.drawFlower(this.rect.x, this.rect.y, "bloembase" + part, 2);
                break;
            case mvstate.FALLING:
                this.drawFlower(this.rect.x, this.rect.y, "bloembase6", 6);
                break;
        }
    }

    emotion() {
        if (this.beingwaterred) {
            if (this.waternecessary > 0.5) {
                return 2;
            } else if (this.waternecessary > 0.2 ){
                return 3;
            } else {
                return 5;
            }
        }
        if (this.waternecessary > 0.8 && this.lightnecessary > 0.8) {
            return 1;
        }

        if (this.waternecessary > 0.8) {
            return 5;
        }

        if (this.lightnecessary > 0.8) {
            return 0;
        }



        return 3;
    }

    drawFlower(x, y, base, emotion=3) {
        let headpos = {x: x + headoffset.x, y: y + headoffset.y};
        drawImage(headpos.x, headpos.y, "bloemkleur");
        drawImage(headpos.x, headpos.y, "bloemkop");
        drawImage(x, y, base);

        drawImage(headpos.x, headpos.y, emotions[emotion]);
    }
}
