const GameState = {
    PLAYING: 0,
    PAUSED: 1,
    WON: 2,
    LOST: 3
};

const MOVING_SPEED = 400
const SPAWN_INTERVAL = 120 
const WIN_DISTANCE = 10000; // Define your goal distance

class GameScene extends ZoomableScene {
    constructor() {
        super();
        this.gameState = GameState.PLAYING;
        this.spawnTimer = 0;

        // 1. Separate Lists
        this.player = new Sperm(100, 400, MOVING_SPEED);
        this.solids = [];
        this.hazards = [];
        this.boosters = [];
        this.uiObjects = [];

        this.bg = new ImageEntity(width/2, height/2, width, height, "game_bg")

        // 2. State Buttons (Menu)
        this.resetBtn = new Button(width/2, height/2 + 30, 200, 40, "Reset Game", "RESET_GAME", null);
        this.menuBtn = new Button(width/2, height/2 + 90, 200, 40, "Main Menu", "SWITCH_SCENE", "Main");

        // HUD Buttons
        this.uiObjects.push(new Button(width - 80, 40, 100, 40, "Pause", "TOGGLE_PAUSE", null));
        
        // 3. Event Listeners
        bus.on("TOGGLE_PAUSE", () => { 
            if (this.gameState === GameState.PLAYING) this.gameState = GameState.PAUSED;
            else if (this.gameState === GameState.PAUSED) this.gameState = GameState.PLAYING;
        });

        bus.on("RESET_GAME", () => { this.resetGame(); });

        bus.on("PLAYER_DOWN", () => { this.gameState = GameState.LOST; });

        bus.on("SWITCH_SCENE", (_) => { this.resetGame(); })
    }

    resetGame() {
        this.gameState = GameState.PLAYING;
        this.player = new Sperm(100, 400, MOVING_SPEED);
        this.solids = [];
        this.hazards = [];
        this.boosters = [];
        this.camera.x = 0;
    }

    update() {
        // Stop all movement and logic if not in PLAYING state
        if (this.gameState !== GameState.PLAYING) return;

        let dt = 0.016; 

        // 1. Player Movement & Input
        this.player.handleInput();
        
        // X-Axis Resolution
        this.player.x += this.player.velocity.x * dt;
        this.resolveCollisions(this.player, 'x');

        // Y-Axis Resolution
        this.player.y += this.player.velocity.y * dt;
        this.resolveCollisions(this.player, 'y');

        // 2. Camera Logic
        this.camera.x -= MOVING_SPEED * dt;

        // 3. Screen Boundary Logic
        // Convert camera X (negative) to world coordinate for the left edge
        let screenLeft = -this.camera.x;
        let screenRight = screenLeft + width;
        let screenTop = 0;
        let screenBottom = height;

        // --- LEFT SIDE: Damage ---
        // If player falls behind the left edge of the scrolling screen
        if (this.player.x < screenLeft) {
            this.player.takeDamage();
        }

        // --- RIGHT SIDE: Block ---
        // Prevent player from moving ahead of the screen view
        if (this.player.x + this.player.w > screenRight) {
            this.player.x = screenRight - this.player.w;
        }

        // --- TOP & BOTTOM: Block ---
        if (this.player.y < screenTop) {
            this.player.y = screenTop;
        }
        if (this.player.y + this.player.h > screenBottom) {
            this.player.y = screenBottom - this.player.h;
        }

        // 4. State Triggers
        if (this.player.health <= 0) {
            this.gameState = GameState.LOST;
        }
        if (this.player.x >= WIN_DISTANCE) {
            this.gameState = GameState.WON;
        }

        // 4. Spawning and Cleanup
        this.spawnObstacles();
        this.cleanup();
    }

    resolveCollisions(p, axis) {
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
        let currentInterval = max(30, SPAWN_INTERVAL - floor(frameCount / 100));

        if (!this.internalSpawnTimer) this.internalSpawnTimer = 0;
        this.internalSpawnTimer++;

        if (this.internalSpawnTimer >= currentInterval) {
            this.internalSpawnTimer = 0; // Reset bộ đếm

            let spawnX = this.player.x + width + 200;
            let spawnY = random(100, height - 100);
            let r = random(1);

            if (r < 0.4) {
                this.solids.push(new Wall(spawnX, spawnY, 40, 200));
            } else {
                this.hazards.push(new HarmingObject(spawnX, spawnY, 60, 60));
            }
        }

        let boosterInterval = currentInterval * 2.5; 
        
        if (!this.boosterTimer) this.boosterTimer = 0;
        this.boosterTimer++;

        if (this.boosterTimer >= boosterInterval) {
            this.boosterTimer = 0;
            let spawnX = this.player.x + width + 200;
            let spawnY = random(100, height - 100);
            
            // Tỷ lệ xuất hiện ngẫu nhiên cho Booster
            if (random(1) < 0.6) {
                this.boosters.push(new Booster(spawnX, spawnY));
            }
        }
    }


    /**
    * Removes objects that are far behind the player to save memory
    */

    cleanup() {
        // Only run every 60 frames to save CPU
        if (frameCount % 120 !== 0) return; 

        const killX = this.player.x - width;
        this.solids = this.solids.filter(obj => obj.x > killX);
        this.hazards = this.hazards.filter(obj => obj.x > killX);
        this.boosters = this.boosters.filter(obj => obj.x > killX);
    } 

    draw() {
        
        push();
        translate(floor(this.camera.x), floor(this.camera.y));
        scale(this.camera.zoom);

        // Physics still called here but checked via gameState internally
        this.update(); 
        this.drawBackground()
        for (let w of this.solids) w.display();
        for (let h of this.hazards) h.display();
        for (let b of this.boosters) b.display();
        this.player.display();
        pop();

        this.drawUI();
    }

    drawBackground() {
        const bgWidth = this.bg.w;
        
        // We use floor to maintain consistency with the camera's jitter fix
        let startX = floor((-this.camera.x + width/2) / bgWidth) * bgWidth;
        
        // Draw enough tiles to cover the screen width plus one extra buffer tile
        for (let x = startX; x < startX + width + bgWidth; x += bgWidth) {
            this.bg.x = x; 
            this.bg.display();
        }
    }

    drawUI() {
        let barWidth = 150;
        let barHeight = 15;
        let margin = 20;

        // --- HEALTH BAR ---
        // Label
        push()
        fill(255);
        noStroke();
        textSize(28);
        text("Sinh Lực", margin, 32);

        // Bar Background (Gray outline/slot)
        fill(50, 50, 50, 200);
        rect(margin + 200, 20, barWidth, barHeight);

        // Bar Fill (Red)
        fill(255, 70, 70);
        // Map current health (0-100) to the bar's width (0-150)
        let healthFill = map(this.player.health, 0, MAX_HEALTH, 0, barWidth, true);
        rect(margin + 200, 20, healthFill, barHeight);

        // --- ENERGY BAR ---
        // Label
        fill(255);
        text("Năng Lượng", margin, 72);

        // Bar Background
        fill(50, 50, 50, 200);
        rect(margin + 200, 60, barWidth, barHeight);

        // Bar Fill (Blue/Cyan)
        fill(70, 200, 255);
        // Map current energy
        let energyFill = map(this.player.energy, 0, MAX_ENERGY, 0, barWidth, true);
        rect(margin + 200, 60, energyFill, barHeight);

        // --- PROGRESS TEXT ---
        fill(255);
        text(`Quãng đường: ${floor((this.player.x / WIN_DISTANCE) * 100)}%`, margin + 400, 32);

        // Standard UI (Pause Button)
        for (let ui of this.uiObjects) {
            if (typeof ui.checkHovered === 'function') ui.checkHovered(mouseX, mouseY);
            ui.display();
        }

        // State Overlays
        if (this.gameState !== GameState.PLAYING) {
            this.drawOverlay();
        }
        pop()
    }

    drawOverlay() {
        push();
        // Darken the background
        fill(0, 180);
        rect(0, 0, width, height);

        // Dialog Text
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(50);

        let title = "PAUSED";
        let tip = "";

        if (this.gameState === GameState.LOST) {
            title = "YOU LOST";
            tip = "Tip: Watch your energy bar and dodge red hazards!";
        } else if (this.gameState === GameState.WON) {
            title = "YOU WON!";
            tip = "The journey to life is complete!";
        }

        text(title, width / 2, height / 2 - 80);
        
        if (tip !== "") {
            textSize(18);
            fill(200);
            text(tip, width / 2, height / 2 - 30);
        }

        // Draw Menu Buttons
        this.resetBtn.checkHovered(mouseX, mouseY);
        this.menuBtn.checkHovered(mouseX, mouseY);
        this.resetBtn.display();
        this.menuBtn.display();
        pop();
    }

    checkClick() {
        // 1. If paused/lost/won, only check menu buttons
        if (this.gameState !== GameState.PLAYING) {
            if (this.resetBtn.checkClick(mouseX, mouseY)) return;
            if (this.menuBtn.checkClick(mouseX, mouseY)) return;
            return;
        }

        // 2. Check HUD (Pause Button)
        for (let i = this.uiObjects.length - 1; i >= 0; i--) {
            if (this.uiObjects[i].checkClick(mouseX, mouseY)) return;
        }
    }
}