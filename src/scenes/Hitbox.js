class Hitbox {
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }

    drawDebug() {
        noFill();
        stroke(255, 0, 0);

        beginShape();
        for (let p of this.points) {
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
    }

    contains(px, py) {
        let inside = false;

        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            let xi = this.points[i].x, yi = this.points[i].y;
            let xj = this.points[j].x, yj = this.points[j].y;

            let intersect =
                ((yi > py) !== (yj > py)) &&
                (px < (xj - xi) * (py - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }

        return inside;
    }
}