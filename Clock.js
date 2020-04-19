

class Clock extends Draggable {
    constructor() {
        super(surfaces[4], 45, {x: 0, y: -170});

        this.rect = {
            x: 0, y: 0,
            w: 170,
            h: 170
        }

    }

    update(dt) {
        super.update(dt);
    }

    draw() {
        drawImage(this.rect.x, this.rect.y, "clock");
        ctx.save();
        ctx.translate(this.rect.x + 85, this.rect.y + 85);
        let currenttime = new Date();
        ctx.rotate(2 * Math.PI * ((currenttime.getHours() % 12) * 60 + currenttime.getMinutes()) / 720);
        drawImage(-85, -85, "shorthand");
        ctx.restore();

        ctx.save();
        ctx.translate(this.rect.x + 85, this.rect.y + 85);
        ctx.rotate(2 * Math.PI * (currenttime.getMinutes() / 60));
        drawImage(-85, -85, "longhand");
        ctx.restore();

        ctx.save();
        ctx.translate(this.rect.x + 85, this.rect.y + 85);
        ctx.rotate(2 * Math.PI * (currenttime.getSeconds() / 60));
        drawImage(-85, -85, "secondhand");
        ctx.restore();
    }
}
