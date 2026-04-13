class BodyMapScene extends Scene {
    constructor() {
        super();
        this.hitboxes = [
            new Hitbox("Nervous", [
                {x: 380, y: 60}, {x: 420, y: 60}, {x: 450, y: 100},
                {x: 420, y: 140}, {x: 380, y: 140}, {x: 350, y: 100}
            ]),
            new Hitbox("Endocrine", [
                {x: 350, y: 150}, {x: 450, y: 150}, {x: 480, y: 250}, {x: 320, y: 250}
            ]),
            new Hitbox("Reproductive", [
                {x: 350, y: 300}, {x: 450, y: 300}, {x: 470, y: 420}, {x: 330, y: 420}
            ]),
            new Hitbox("Skin", [
                {x: 300, y: 60}, {x: 500, y: 60}, {x: 520, y: 500}, {x: 280, y: 500}
            ])
        ];
    }

    draw() {
        background(200);
        fill(180);
        rect(350, 80, 100, 400); // Vẽ thân người cơ bản

        for (let hb of this.hitboxes) {
            if (hb.contains(mouseX, mouseY)) {
                fill(255, 0, 0, 80);
                beginShape();
                for (let p of hb.points) { vertex(p.x, p.y); }
                endShape(CLOSE);
            }
            hb.drawDebug();
        }
    }

    checkClick() {
        // Kiểm tra ngược từ dưới lên để ưu tiên bộ phận nhỏ
        for (let i = this.hitboxes.length - 1; i >= 0; i--) {
            let hb = this.hitboxes[i];
            if (hb.contains(mouseX, mouseY)) {
                bus.emit("SWITCH_SCENE", hb.name);
                return;
            }
        }
    }
}