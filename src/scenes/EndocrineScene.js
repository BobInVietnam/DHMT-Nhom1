class EndocrineScene extends ZoomableScene {
    constructor() {
        super();

        this.isActive = false;
        this.currentStep = 0;
        this.targetCamera = { x: 0, y: 0, zoom: 1.0 };

        this.btnExit = new Button(80, 50, 100, 40, "X ĐÓNG", "SWITCH_SCENE", "BodyMap");
        this.btnNext = new Button(width - 150, height - 80, 160, 50, "SKIP >>>", "ENDOCRINE_NEXT", null);
        
        this.objects.push(this.btnExit, this.btnNext);

        this.bg = new ImageEntity(width / 2, height / 2, 0, height, "endocrine_bg", true); 
        this.zoomableObjects.push(this.bg);

        let uiBoxX = width - 400;   
        let uiBoxY = 200;            
        let uiCharX = width - 150;   
        let uiCharY = height - 300;  

        this.tourSteps = [
            {
                name: "Tổng quan",
                worldX: width / 2, worldY: height / 2, targetZoom: 1.0, 
                content: {
                    text: [
                        "Hệ nội tiết bao gồm các tuyến sản xuất hormone.",
                        "Chúng ta sẽ cùng tìm hiểu vị trí và chức năng của từng bộ phận nhé."
                    ],
                    sprite: ["teach_normal", "teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến yên",
                worldX: width / 2, worldY: height / 2 - 320, targetZoom: 2.8, 
                content: {
                    text: [
                        "Đầu tiên là Tuyến yên, nằm ở nền sọ.",
                        "Được coi là 'tuyến chủ' vì nó điều khiển các tuyến nội tiết khác."
                    ],
                    sprite: ["teach_point_normal", "teach_point_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến giáp",
                worldX: width / 2, worldY: height / 2 - 180, targetZoom: 2.5, 
                content: {
                    text: [
                        "Tiếp theo là Tuyến giáp nằm ở vùng cổ.",
                        "Nó đóng vai trò điều hòa quá trình trao đổi chất của cơ thể."
                    ],
                    sprite: ["teach_point_normal", "teach_point_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến thượng thận",
                worldX: width / 2, worldY: height / 2 - 20, targetZoom: 2.5, 
                content: {
                    text: [
                        "Đây là Tuyến thượng thận, nằm trên hai quả thận.",
                        "Nó tiết ra adrenaline giúp cơ thể phản ứng nhanh trong các tình huống căng thẳng."
                    ],
                    sprite: ["teach_point_explain", "teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến tụy",
                worldX: width / 2, worldY: height / 2 + 60, targetZoom: 2.2, 
                content: {
                    text: [
                        "Cuối cùng là Tuyến tụy, nằm sau dạ dày.",
                        "Tuyến này tiết ra insulin để điều hòa lượng đường huyết."
                    ],
                    sprite: ["teach_point_normal", "teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            }
        ];

        bus.on("ENDOCRINE_NEXT", () => {
            if (this.isActive) {
                this.handleNextStep();
            }
        });
    }

    enter() {
        this.isActive = true;
        this.camera = { x: 0, y: 0, zoom: 1.0, minZoom: 0.2, maxZoom: 5.0 };
        this.currentStep = 0;
        
        setTimeout(() => {
            this.playCurrentStep();
        }, 100);
    }

    exit() {
        this.isActive = false;
        bus.emit("HIDE_INFO"); 
    }

    playCurrentStep() {
        let step = this.tourSteps[this.currentStep];

        this.targetCamera.zoom = step.targetZoom;
        
        this.targetCamera.x = (width / 2 - 250) - step.worldX * step.targetZoom;
        this.targetCamera.y = height / 2 - step.worldY * step.targetZoom;

        bus.emit("UPDATE_UI_POSITION", {
            boxX: step.boxX,
            boxY: step.boxY,
            charX: step.charX,
            charY: step.charY
        });

        bus.emit("SHOW_NARRATION", step.content);
    }

    handleNextStep() {
        if (this.currentStep < this.tourSteps.length - 1) {
            this.currentStep++;
            this.playCurrentStep();
        } else {
            bus.emit("HIDE_INFO");
            bus.emit("SWITCH_SCENE", "BodyMap");
        }
    }

    draw() {
        this.camera.x = lerp(this.camera.x, this.targetCamera.x, 0.05);
        this.camera.y = lerp(this.camera.y, this.targetCamera.y, 0.05);
        this.camera.zoom = lerp(this.camera.zoom, this.targetCamera.zoom, 0.05);

        background(30, 35, 40); 
        
        super.draw(); 
    }

    checkClick() {
        this.btnExit.checkClick(mouseX, mouseY);
        this.btnNext.checkClick(mouseX, mouseY);
    }
}