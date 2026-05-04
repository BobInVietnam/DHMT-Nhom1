class EndocrineScene extends ZoomableScene {
    constructor() {
        super();

        this.isActive = false;
        this.currentStep = 0;
        this.targetCamera = { x: 0, y: 0, zoom: 1.0 };

        this.btnExit = new Button(80, 50, 100, 40, "X ĐÓNG", "SWITCH_SCENE", "BodyMap");
        this.btnNext = new Button(width - 150, height - 80, 160, 50, "NEXT >>>", "ENDOCRINE_NEXT", null);
        
        this.objects.push(this.btnExit, this.btnNext);

        this.bg = new ImageEntity(width / 2, height / 2, 0, height, "endocrine_bg", true); 
        this.zoomableObjects.push(this.bg);

        let uiBoxX = width - 440;    
        let uiBoxY = 80;             
        let uiCharX = width / 2 + 50;
        let uiCharY = height / 2 + 150; 
        this.tourSteps = [
            {
                name: "Tổng quan",
                worldX: width / 2, worldY: height / 2, targetZoom: 1.0, 
                content: {
                    text: [
                        "Hệ nội tiết là một mạng lưới các tuyến đặc biệt, làm nhiệm vụ sản xuất và giải phóng hormone trực tiếp vào máu.",
                        "Hormone đóng vai trò như những 'người đưa thư' hóa học, truyền tín hiệu đi khắp cơ thể để điều khiển các cơ quan.",
                        "Chúng kiểm soát hầu hết mọi chức năng quan trọng: từ sự phát triển, quá trình trao đổi chất, đến cảm xúc và giấc ngủ của chúng ta."
                    ],
                    sprite: ["teach_normal", "teach_explain", "teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến yên",
                worldX: width / 2, worldY: height / 2 - 320, targetZoom: 2.8, 
                content: {
                    text: [
                        "Đầu tiên là Tuyến yên, một tuyến chỉ nhỏ cỡ hạt đậu nằm ẩn sâu dưới nền sọ.",
                        "Dù nhỏ bé, nó được mệnh danh là 'tuyến chủ' của toàn bộ hệ thống nội tiết.",
                        "Lý do là vì Tuyến yên tiết ra hormone tăng trưởng, đồng thời phát tín hiệu chỉ huy hoạt động của hầu hết các tuyến nội tiết khác."
                    ],
                    sprite: ["teach_point_normal", "teach_point_explain", "teach_point_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến giáp",
                worldX: width / 2, worldY: height / 2 - 180, targetZoom: 2.5, 
                content: {
                    text: [
                        "Di chuyển xuống vùng cổ, chúng ta có Tuyến giáp với hình dáng giống như một con bướm.",
                        "Tuyến này sản xuất hormone thyroxine, đóng vai trò then chốt trong việc điều hòa quá trình trao đổi chất.",
                        "Nó quyết định việc cơ thể bạn đốt cháy calo nhanh hay chậm, ảnh hưởng trực tiếp đến mức năng lượng và nhiệt độ cơ thể."
                    ],
                    sprite: ["teach_point_normal", "teach_talk", "teach_point_explain"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến thượng thận",
                worldX: width / 2, worldY: height / 2 - 20, targetZoom: 2.5, 
                content: {
                    text: [
                        "Nằm vắt ngang trên đỉnh của hai quả thận chính là Tuyến thượng thận.",
                        "Đây là 'nhà máy' chuyên sản xuất adrenaline - hay còn gọi là hormone chiến đấu hoặc bỏ chạy.",
                        "Khi bạn gặp nguy hiểm hay căng thẳng, adrenaline lập tức làm tăng nhịp tim và bơm máu đến cơ bắp để bạn phản ứng kịp thời."
                    ],
                    sprite: ["teach_point_normal", "teach_point_talk", "teach_explain"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            },
            {
                name: "Tuyến tụy",
                worldX: width / 2, worldY: height / 2 + 60, targetZoom: 2.2, 
                content: {
                    text: [
                        "Cuối cùng là Tuyến tụy, một cơ quan đặc biệt nằm khuất lấp ngay phía sau dạ dày.",
                        "Tuyến tụy đóng vai trò 'kép': vừa tiết dịch tiêu hóa thức ăn, vừa sản xuất hormone nội tiết vào máu.",
                        "Nhiệm vụ sống còn của nó là tiết ra Insulin và Glucagon để giữ cho lượng đường trong máu luôn ở mức ổn định, ngăn ngừa bệnh tiểu đường."
                    ],
                    sprite: ["teach_point_normal", "teach_explain", "teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            }
        ];

        bus.on("ENDOCRINE_NEXT", () => {
            if (this.isActive) this.handleNextStep();
        });

        bus.on("FINISH_NARRATION", () => {
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

        background(200); 
        
        super.draw(); 
    }

    checkClick() {
        this.btnExit.checkClick(mouseX, mouseY);
        this.btnNext.checkClick(mouseX, mouseY);
    }
}