// --- NARRATION CONTENT ---
const NerveOverviewContent = {
    text: [
        "Chào mừng bạn đến với bài học về Hệ thần kinh và Cơ quan cảm giác!",
        "Hệ thần kinh ở người có chức năng điều khiển, điều hòa và phối hợp hoạt động của các cơ quan thành một thể thống nhất.",
        "Cấu tạo của hệ thống này có dạng hình ống và được chia thành hai bộ phận chính là bộ phận trung ương và bộ phận ngoại biên.",
        "Bộ phận trung ương bao gồm não và tủy sống, đóng vai trò chủ đạo trong việc xử lý thông tin.",
        "Bộ phận ngoại biên gồm các dây thần kinh và hạch thần kinh nằm khắp cơ thể.",
        "Hệ thần kinh kết nối chặt chẽ với các giác quan để thu nhận và phản hồi lại các kích thích từ môi trường.",
        "Hãy nhấn vào biểu tượng 'Mắt' hoặc 'Tai' trên sơ đồ để bắt đầu tìm hiểu chuyên sâu về các cơ quan này."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.NORM, CharacterSprite.EXPL, CharacterSprite.NORM, CharacterSprite.EXPL, CharacterSprite.P_NORM, CharacterSprite.P_EXPL]
};

const EarContent2D = {
    text: [
        "Tai là cơ quan thính giác, có chức năng quan trọng là thu nhận âm thanh và giúp cơ thể giữ thăng bằng.",
        "Cấu tạo của tai được chia làm ba phần: tai ngoài, tai giữa và tai trong.",
        "Tai ngoài gồm vành tai để hứng sóng âm và ống tai dẫn âm thanh vào bên trong.",
        "Tai giữa chứa màng nhĩ và chuỗi xương tai, kết nối với khoang miệng thông qua vòi tai.",
        "Tai trong có ốc tai chứa các cơ quan thụ cảm âm thanh cực kỳ nhạy cảm.",
        "Âm thanh truyền qua ống tai làm rung màng nhĩ, tác động vào chuỗi xương tai làm rung dịch trong ốc tai.",
        "Những rung động này tạo ra xung thần kinh truyền theo dây thần kinh thính giác về não để xử lý."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL, CharacterSprite.P_EXPL, CharacterSprite.EXPL, CharacterSprite.P_TALK, CharacterSprite.TALK]
};

const EyeContent2D = {
    text: [
        "Mắt là cơ quan thị giác, cho phép chúng ta quan sát hình ảnh và màu sắc của sự vật.",
        "Cầu mắt nằm trong hốc mắt, được bảo vệ phía ngoài bởi mí mắt và lông mi.",
        "Các bộ phận quan trọng bên trong bao gồm giác mạc, mống mắt, thể thủy tinh và võng mạc.",
        "Ánh sáng phản chiếu từ vật đi qua giác mạc và thể thủy tinh để hội tụ trên võng mạc.",
        "Tại võng mạc, ánh sáng tác động lên tế bào thụ cảm thị giác tạo ra các luồng xung thần kinh.",
        "Tín hiệu này theo dây thần kinh thị giác truyền tới vùng thị giác ở não để cho ta cảm nhận về hình ảnh.",
        "Khả năng nhìn có thể bị suy giảm do các bệnh như đau mắt đỏ hoặc các tật như cận thị và viễn thị."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.NORM, CharacterSprite.EXPL, CharacterSprite.P_EXPL, CharacterSprite.EXPL, CharacterSprite.P_TALK, CharacterSprite.P_EXPL]
};

const Sense3DContent = {
    text: [
        "Đây là mô hình 3D chi tiết giúp bạn quan sát rõ hơn cấu tạo bên trong của cơ quan cảm giác.",
        "Bạn có thể kéo chuột trái để xoay mô hình 360 độ, giúp nhìn rõ các chi tiết khuất sau hình ảnh 2D.",
        "Sử dụng nút cuộn chuột để phóng to hoặc thu nhỏ, quan sát kỹ các bộ phận nhỏ như chuỗi xương tai hay võng mạc.",
        "Nhấn giữ chuột phải để di chuyển vị trí mô hình trên khung hình theo ý muốn.",
        "Hãy thử tương tác để hiểu rõ cách các bộ phận này sắp xếp và kết nối với nhau trong không gian thực tế."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.P_EXPL, CharacterSprite.NORM, CharacterSprite.P_TALK]
};

class NervousScene extends Scene {
    constructor() {
        super();
        this.isActive = false
        this.step = 0; // 0: Main, 1: Ear 2D, 2: Ear 3D, 3: Eye 2D, 4: Eye 3D
        this._glbLoaded = ""; // Theo dõi model nào đã load

        // UI chung
        this.backBtn = new Button(100, 50, 150, 40, "X Đóng", "SWITCH_SCENE", "BodyMap");
        this.nextStepBtn = new Button(width - 150, height - 80, 160, 50, "TIẾP THEO →", "NERVE_NEXT", null);
        this.closeLessonBtn = new Button(width - 150, 50, 150, 40, "Quay lại", "NERVE_RESET", null);
        
        // Nút chọn cơ quan (Bước 0)
        this.eyeBtn = new CircleButton(width / 2 - 25, height / 2 - 220, 25, "NEXT_NERVE_STEP", 3, "Mắt");
        this.earBtn = new CircleButton(width / 2 + 50, height / 2 - 220, 25, "NEXT_NERVE_STEP", 1, "Tai");

        // Entities 2D
        this.nervousMap = new ImageEntity(width / 2, height / 2 + 50, 0, height - 100, "male_nerve", true);
        this.ear2D = new ImageEntity(width / 2 - 150, height / 2, 600, 450, "ear", true);
        this.eye2D = new ImageEntity(width / 2 - 150, height / 2, 600, 450, "eye", true);

        // Narrator
        this.narrator = new Narrator(950, 480, NerveOverviewContent);
        this.narration = new Narration(this.narrator.x, this.narrator.y - 250);
        this.narration.setSize(500, 180);

        this.objects.push(this.nervousMap, this.backBtn, this.eyeBtn, this.earBtn, this.narration, this.narrator);

        // Sự kiện
        bus.on("NEXT_NERVE_STEP", (targetStep) => {
            this.step = targetStep;
            this._syncState();
        });

        bus.on("NERVE_NEXT", () => {
            if (this.step === 1 || this.step === 3) {
                this.step++; // Chuyển từ 2D sang 3D
                this._syncState();
            }
        });

        bus.on("NERVE_RESET", () => {
            this.step = 0;
            this._syncState();
        });

        bus.on("FINISH_NARRATION", () => {
            if ((this.step === 2 || this.step === 4) && this.isActive) {
                // Hiển thị 3D sau khi thoại xong để không bị đè click
                const modelPath = this.step === 2 ? './assets/ear.glb' : './assets/eye.glb';
                model3DViewer.load(modelPath);
                model3DViewer.show(50, 120, 800, 550);
            }
        });
    }

    _syncState() {
        model3DViewer.hide();
        this.objects = [this.backBtn];
        
        // Reset hiển thị nút
        this.eyeBtn.hide(); this.earBtn.hide();
        this.nextStepBtn.hide(); this.closeLessonBtn.hide();

        if (this.step === 0) {
            this.objects.push(this.nervousMap, this.eyeBtn, this.earBtn, this.narration, this.narrator);
            this.eyeBtn.show(); this.earBtn.show();
            bus.emit("SHOW_NARRATION", NerveOverviewContent);
        } 
        else if (this.step === 1) { // Ear 2D
            this.objects.push(this.ear2D, this.nextStepBtn, this.closeLessonBtn, this.narration, this.narrator);
            this.nextStepBtn.show(); this.closeLessonBtn.show();
            bus.emit("SHOW_NARRATION", EarContent2D);
        }
        else if (this.step === 2) { // Ear 3D
            this.objects.push(this.closeLessonBtn, this.narration, this.narrator);
            this.closeLessonBtn.show();
            bus.emit("SHOW_NARRATION", Sense3DContent);
        }
        else if (this.step === 3) { // Eye 2D
            this.objects.push(this.eye2D, this.nextStepBtn, this.closeLessonBtn, this.narration, this.narrator);
            this.nextStepBtn.show(); this.closeLessonBtn.show();
            bus.emit("SHOW_NARRATION", EyeContent2D);
        }
        else if (this.step === 4) { // Eye 3D
            this.objects.push(this.closeLessonBtn, this.narration, this.narrator);
            this.closeLessonBtn.show();
            bus.emit("SHOW_NARRATION", Sense3DContent);
        }
    }

    enter() {
        this.step = 0;
        this.isActive = true
        this._syncState();
        this.narrator.show();
        bus.emit('SCENE_ENTER');
    }

    exit() {
        this.isActive = false
        bus.emit('SCENE_EXIT');
        model3DViewer.hide();
    }

    draw() {
        background(204, 234, 252);
        
        // Vẽ tiêu đề
        push();
        applyVietFont();
        fill(30, 50, 100); textSize(32); textStyle(BOLD); textAlign(CENTER);
        let title = "HỆ THẦN KINH & GIÁC QUAN";
        if (this.step === 1 || this.step === 2) title = "CƠ QUAN THÍNH GIÁC (TAI)";
        if (this.step === 3 || this.step === 4) title = "CƠ QUAN THỊ GIÁC (MẮT)";
        text(title, width / 2, 60);
        pop();

        // Vẽ khung viewport cho 3D nếu đang ở bước 3D
        if (this.step === 2 || this.step === 4) {
            push();
            fill(255); stroke(100, 150, 255); strokeWeight(2);
            rectMode(CORNER);
            rect(50, 120, 800, 550, 10);
            noStroke()
            textSize(18)
            fill(0)
            text("Hoàn thành đoạn thuyết mình để bắt đầu", 350, 400)
            if (model3DViewer.isLoading) {
                fill(100); textAlign(CENTER); text("Đang tải mô hình 3D...", 450, 400);
            }
            pop();
        }

        super.draw();
    }

    checkClick() {
        // Kiểm tra click các nút trong objects
        if (this.nextStepBtn.checkClick(mouseX, mouseY)) return;
        if (this.closeLessonBtn.checkClick(mouseX, mouseY)) return;
        super.checkClick();
    }
}