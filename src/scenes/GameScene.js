const MOVING_SPEED = 400
const SPAWN_INTERVAL = 120

class GameScene extends ZoomableScene {
    constructor() {
        super();
        this.isPaused = false;
        this.spawnTimer = 0;

        // 1. Separate Lists
        this.player = new Sperm(100, 400, MOVING_SPEED);
        this.solids = [];   // Walls
        this.hazards = [];  // HarmingObjects
        this.boosters = []; // Health/Energy kits
        this.uiObjects = []; // Buttons, Health bars, etc.

        // Initialize UI
        this.backButton = new Button(width/2, height/2 + 100, 200, 40, "Back to Scene", "SWITCH_SCENE", "Main")
        this.uiObjects.push(new Button(width - 80, 40, 100, 40, "Pause", "TOGGLE_PAUSE", null));
        
        // Listen for pause event from EventBus
        bus.on("TOGGLE_PAUSE", () => { this.isPaused = !this.isPaused; });
        bus.on("PLAYER_DOWN", () => {
            this.isPaused = true

        })
    }

    update() {
        if (this.isPaused) return;

        let dt = deltaTime / 1000; // Convert to seconds for frame-rate independence

        // 1. Player Movement & Input
        this.player.handleInput();
        
        // X-Axis Resolution
        this.player.x += this.player.velocity.x * dt;
        this.resolveCollisions(this.player, 'x');

        // Y-Axis Resolution
        this.player.y += this.player.velocity.y * dt;
        this.resolveCollisions(this.player, 'y');

        // 2. Camera Logic: Move at MOVING_SPEED regardless of player input

        this.camera.x -= MOVING_SPEED * dt;

        // 3. Spawning and Cleanup
        this.spawnObstacles();
        this.cleanup();
    }

    resolveCollisions(p, axis) {
        // Wall Collisions (Solid)
        for (let wall of this.solids) {
            if (p.getCollision(wall)) {
                if (axis === 'x') {
                    p.x = (p.velocity.x > 0) ? wall.x - p.w : wall.x + wall.w;
                } else {
                    p.y = (p.velocity.y > 0) ? wall.y - p.h : wall.y + wall.h;
                }
            }
        }

        // Damage & Pickups (Only check once per update)
        if (axis === 'y') {
            for (let h of this.hazards) {
                if (p.getCollision(h)) p.takeDamage()
            }
            for (let i = this.boosters.length - 1; i >= 0; i--) {
                if (p.getCollision(this.boosters[i])) {
                    p.heal()
                    this.boosters.splice(i, 1);
                }
            }
        }
    }

    spawnObstacles() {
        if (frameCount % SPAWN_INTERVAL === 0) {
            let spawnX = this.player.x + width + 200;
            let spawnY = random(100, height - 100);
            let r = random(1);

            if (r < 0.4) {
                this.solids.push(new Wall(spawnX, spawnY, 40, 200));
            } else if (r < 0.8) {
                this.hazards.push(new HarmingObject(spawnX, spawnY, 60, 60));
            } else {
                this.boosters.push(new Booster(spawnX, spawnY));
            }
        }
    }

    /**
     * Removes objects that are far behind the player to save memory
     */
    cleanup() {
        const killX = this.player.x - width;
        this.solids = this.solids.filter(obj => obj.x > killX);
        this.hazards = this.hazards.filter(obj => obj.x > killX);
        this.boosters = this.boosters.filter(obj => obj.x > killX);
    }

    draw() {
        background(20);
        // --- WORLD SPACE (Camera Affected) ---
        push();
        translate(floor(this.camera.x), floor(this.camera.y));
        scale(this.camera.zoom);

        // Draw Game Objects
        this.update()
        for (let w of this.solids) w.display();
        for (let h of this.hazards) h.display();
        for (let b of this.boosters) b.display();
        this.player.display();
        pop();

        // --- UI SPACE (Screen Fixed) ---
        this.drawUI();
    }

    drawUI() {
        // Draw Pause Menu Overlay
        if (this.isPaused) {
            push()
            fill(0, 150);
            rect(0, 0, width, height);
            fill(255);
            textAlign(CENTER);
            textSize(40);
            text("PAUSED", width / 2, height / 2);
            pop()
        }

        // HUD: Health & Energy
        fill(255);
        noStroke();
        text(`Health: ${floor(this.player.health)}`, 20, 30);
        text(`Energy: ${floor(this.player.energy)}`, 100, 30);
        
        for (let ui of this.uiObjects) {
            if (typeof ui.checkHovered === 'function') ui.checkHovered(mouseX, mouseY)
            ui.display();
        }
    }

    checkClick() {
        // Check UI first
        const worldMouse = this.getWorldMouse();
        for (let i = this.uiObjects.length - 1; i >= 0; i--) {
            let object = this.uiObjects[i];
            if (typeof object.checkClick === 'function') {
                if (object.checkClick(mouseX, mouseY)) return;
            }
        }
    }
}