

class Draggable {
    static taken = false;
    constructor(surface, xoffset, offset) {

        this.surface = surface;
        this.xoffset = xoffset;
        this.offset = offset;

        this.movestate = mvstate.STANDING;
        this.rect = {
            x: 0,
            y: 0,
            w: 166,
            h: 331
        }


        // DRAGGING vars
        this.relativeDragPos = {x: 0, y: 0};

        // FALLING vars
        this.fallingspeed = 0;
    }

    update(dt) {
        switch (this.movestate) {
            case mvstate.STANDING:
                this.rect.x = this.surface.pos.x + this.xoffset + this.offset.x;
                this.rect.y = this.surface.pos.y + this.offset.y;
                break;
            case mvstate.DRAGGING:
                break; // event call handles this
            case mvstate.FALLING:
                this.fallingspeed += 981 * dt;

                if (this.rect.y + this.rect.h + dt*this.fallingspeed > this.surface.pos.y) {
                    this.movestate = mvstate.STANDING;
                    this.fallingspeed = 0;
                }

                this.rect.y += dt * this.fallingspeed;
                break;
        }
    }

    click(pos) {
        if (pointInRect(pos, this.rect)) {
            switch(this.movestate) {
                case mvstate.STANDING:
                    if (!Draggable.taken) {
                        this.pickup(pos);
                        Draggable.taken = true;
                    }
                    break;
                case mvstate.DRAGGING:
                    if (Draggable.taken) {
                        this.putdown();
                        Draggable.taken = false;
                    }
            }
        }
        return false;
    }

    pickup(pos) {
        this.movestate = mvstate.DRAGGING;
        this.relativeDragPos = {
            x: pos.x - this.rect.x,
            y: pos.y - this.rect.y
        }
    }

    putdown() {
        if (this.movestate == mvstate.DRAGGING) {
            this.movestate = mvstate.FALLING;
            let applicableSurfaces = [];
            for (const surface of surfaces) {
                if (this.rect.x + this.rect.w >= surface.pos.x &&
                    this.rect.x < surface.pos.x + surface.width &&
                    this.rect.y + this.rect.h < surface.pos.y) {
                    applicableSurfaces.push(surface);
                }
            }

            let finalSurface = applicableSurfaces[0];

            for (const surface of applicableSurfaces) {
                if (surface.pos.y < finalSurface.pos.y) {
                    finalSurface = surface;
                }
            }

            this.surface = finalSurface;

            if (!this.surface) {
                this.surface = surfaces[0];
            }

            this.xoffset = this.rect.x - this.surface.pos.x - this.offset.x;
            console.log(this.surface);
        }
    }

    mousemove(pos) {
        if (this.movestate == mvstate.DRAGGING) {
            this.rect.x = pos.x - this.relativeDragPos.x;
            this.rect.y = Math.min(
                1080 - this.rect.h - 20,
                pos.y - this.relativeDragPos.y);
        }
    }



}
