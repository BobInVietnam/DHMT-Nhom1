const ENDOCRINE_QUIZ = [
    {
        situation: 'Một bệnh nhân có các triệu chứng: ăn nhiều, uống nhiều nước, đi tiểu thường xuyên và bị sụt cân nhanh chóng. Kết quả xét nghiệm cho thấy lượng đường trong máu rất cao.',
        context: 'Đái tháo đường là bệnh rối loạn chuyển hóa glucose do thiếu hormone Insulin hoặc Insulin giảm tác dụng điều hòa.',
        options: [
            { text: 'Do cơ thể thiếu Iodine dẫn đến rối loạn', correct: false, 
              feedback: 'Chưa chính xác. Thiếu Iodine là nguyên nhân gây ra bệnh bướu cổ, không phải đái tháo đường.' },
            { text: 'Do thiếu Insulin hoặc Insulin giảm tác dụng khiến tế bào không hấp thụ được glucose', correct: true, 
              feedback: 'Chính xác! Khi thiếu Insulin, glucose không thể đi vào tế bào làm năng lượng, dẫn đến tích tụ trong máu và thải qua nước tiểu.' },
            { text: 'Do tuyến tụy tiết quá nhiều dịch tiêu hóa vào máu', correct: false, 
              feedback: 'Chưa đúng. Tuyến tụy tiết Insulin vào máu, còn dịch tiêu hóa được tiết vào ống tiêu hóa.' }
        ]
    },
    {
        situation: 'Bệnh đái tháo đường nếu không được điều trị kịp thời có thể dẫn đến những biến chứng nguy hiểm nào cho cơ thể?',
        context: 'Lượng đường trong máu cao kéo dài gây tổn thương nghiêm trọng đến các cơ quan và hệ mạch máu.',
        options: [
            { text: 'Gây mù lòa, tổn thương dây thần kinh và hoại tử da', correct: true, 
              feedback: 'Đúng! Đây là những biến chứng điển hình của bệnh tiểu đường do mạch máu và dây thần kinh bị tổn thương.' },
            { text: 'Làm cơ thể run rẩy và dựng lông chân lông', correct: false, 
              feedback: 'Chưa đúng. Đây là phản ứng của cơ thể khi điều hòa thân nhiệt trong môi trường lạnh.' },
            { text: 'Gây phì đại tuyến giáp và chậm lớn', correct: false, 
              feedback: 'Sai. Đây là triệu chứng của bệnh bướu cổ.' }
        ]
    },
    {
        situation: 'Tại sao việc thiếu hụt Iodine trong chế độ ăn uống hằng ngày lại dẫn đến tình trạng cổ bị sưng to (phì đại tuyến giáp)?',
        context: 'Khi cơ thể thiếu Iodine, tuyến giáp không thể sản xuất đủ hormone TH, kích thích tuyến yên phản ứng.',
        options: [
            { text: 'Do Iodine làm tăng lượng đường trong máu', correct: false, 
              feedback: 'Sai. Iodine không liên quan trực tiếp đến cơ chế điều hòa đường huyết.' },
            { text: 'Do tuyến yên tiết hormone TSH để tăng cường hoạt động của tuyến giáp, gây phì đại tuyến', correct: true, 
              feedback: 'Chính xác! Tuyến yên nỗ lực bù đắp sự thiếu hụt TH bằng cách tiết TSH, làm tuyến giáp phải hoạt động quá mức và phình to.' },
            { text: 'Do các tế bào mỡ tích tụ quá nhiều ở vùng cổ', correct: false, 
              feedback: 'Chưa đúng. Bướu cổ là sự phì đại của các mô tuyến, không phải mô mỡ.' }
        ]
    },
    {
        situation: 'Bệnh bướu cổ gây ra những hậu quả nghiêm trọng nào đối với sự phát triển của trẻ em?',
        context: 'Hormone tuyến giáp đóng vai trò cực kỳ quan trọng trong sự phát triển thể chất và trí tuệ ở giai đoạn đầu đời.',
        options: [
            { text: 'Làm trẻ ăn nhiều và sụt cân nhanh', correct: false, 
              feedback: 'Chưa chính xác. Đây là triệu chứng của đái tháo đường.' },
            { text: 'Gây ra các cơn đau dây thần kinh và mù lòa', correct: false, 
              feedback: 'Sai. Đây là biến chứng của bệnh đái tháo đường.' },
            { text: 'Làm trẻ chậm lớn, trí tuệ chậm phát triển', correct: true, 
              feedback: 'Đúng! Thiếu hormone tuyến giáp khiến các quá trình trao đổi chất và phát triển hệ thần kinh bị đình trệ.' }
        ]
    }
];

class EndocrineScene extends ZoomableScene {
    constructor() {
        super();
        this.step = 0; // 0: Tour, 1: Pop Quiz
        this.isActive = false;
        this.currentTourStep = 0;
        this.targetCamera = { x: 0, y: 0, zoom: 1.0 };

        // Quiz State
        this._quizIdx = 0;
        this._quizAnswers = new Array(ENDOCRINE_QUIZ.length).fill(undefined);

        this.btnExit = new Button(80, 50, 100, 40, "X ĐÓNG", "SWITCH_SCENE", "BodyMap");
        this.btnNext = new Button(width - 150, height - 80, 160, 50, "TIẾP THEO", "ENDOCRINE_NEXT", null);
        
        this.bg = new ImageEntity(width / 2, height / 2, 0, height, "endocrine_bg", true); 
        this.zoomableObjects.push(this.bg);

        let uiCharX = width / 2 + 100;    
        let uiCharY = height / 2 + 150;   
        let uiBoxX = uiCharX + 50;       
        let uiBoxY = uiCharY - 280;       

        this.narratorEntity = new Narrator(uiCharX, uiCharY, null);
        this.narrationEntity = new Narration(uiBoxX, uiBoxY);

        this.objects.push(this.btnExit, this.btnNext, this.narratorEntity, this.narrationEntity);

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
            },
            {
                name: "Quiz",
                worldX: width / 2, worldY: height / 2 + 60, targetZoom: 2.2, 
                content: {
                    text: [
                        "Hãy chọn câu trả lời đúng nhé!"
                    ],
                    sprite: ["teach_talk"]
                },
                boxX: uiBoxX, boxY: uiBoxY, charX: uiCharX, charY: uiCharY
            }
        ];

        bus.on("ENDOCRINE_NEXT", () => {
            if (this.isActive) this.handleNextStep();
        });

        bus.on("FINISH_NARRATION", () => {
            if (this.isActive && this.currentTourStep < this.tourSteps.length - 1) this.handleNextStep();
        });
    }

    enter() {
        this.isActive = true;
        
        this.camera = { x: 0, y: 0, zoom: 1.0, minZoom: 0.2, maxZoom: 5.0 };
        this.targetCamera = { x: 0, y: 0, zoom: 1.0 };
        
        this.step = 0; 
        this.currentTourStep = 0;
        
        this._quizIdx = 0; 
        this._quizAnswers = new Array(ENDOCRINE_QUIZ.length).fill(undefined); 
        
        this.btnNext.show();

        setTimeout(() => {
            this.playCurrentStep();
        }, 100);
    }

    exit() {
        this.isActive = false;
        this.narratorEntity.isVisible = false;
        this.narrationEntity.isVisible = false;
    }

    playCurrentStep() {
        let step = this.tourSteps[this.currentTourStep];

        this.targetCamera.zoom = step.targetZoom;
        this.targetCamera.x = (width / 2 - 250) - step.worldX * step.targetZoom;
        this.targetCamera.y = height / 2 - step.worldY * step.targetZoom;

        this.narrationEntity.x = step.boxX;
        this.narrationEntity.y = step.boxY;
        this.narratorEntity.x = step.charX;
        this.narratorEntity.y = step.charY;

        bus.emit("SHOW_NARRATION", step.content);
        this.narratorEntity.isVisible = true; 
    }

    handleNextStep() {
        if (this.step === 0) {
            // Đang ở phần Tour
            if (this.currentTourStep < this.tourSteps.length - 2) {
                this.currentTourStep++;
                this.playCurrentStep();
            } else {
                // Chuyển sang phần Quiz
                this.step = 1;
                this.currentTourStep++;
                this.targetCamera = { x: 0, y: 0, zoom: 1.0 };
                this.narrationEntity.hide();
                this.narratorEntity.x = width / 2 + 300;
                this.narratorEntity.y = height / 2 + 150;
                this.narratorEntity.show();
                this.btnNext.hide(); // Ẩn nút cho đến khi trả lời xong quiz
            }
        } else {
            // Đang ở phần Quiz - kết thúc bài học
            bus.emit("SWITCH_SCENE", "BodyMap");
        }
    }

    draw() {
        // Smooth camera
        this.camera.x = lerp(this.camera.x, this.targetCamera.x, 0.05);
        this.camera.y = lerp(this.camera.y, this.targetCamera.y, 0.05);
        this.camera.zoom = lerp(this.camera.zoom, this.targetCamera.zoom, 0.05);

        background(240); 

        if (this.step === 0) {
            super.draw(); // Vẽ tour bình thường
        } else {
            this._drawQuiz(); // Vẽ giao diện câu hỏi
            // Vẽ các UI cơ bản (nút thoát, narrator...)
            this.btnExit.display();
            if (this._quizAnswers.every(a => a !== undefined)) this.btnNext.show();
            this.btnNext.display();
            this.narratorEntity.display();
        }
    }

    _drawQuiz() {
        const q = ENDOCRINE_QUIZ[this._quizIdx];
        const answered = this._quizAnswers[this._quizIdx];
        const px = 100, py = 100, pw = 700;

        push();
        rectMode(CORNER);
        applyVietFont();

        // 1. Tiêu đề câu hỏi
        fill(40, 60, 120); noStroke(); textSize(24); textStyle(BOLD);
        text(`Kiểm tra kiến thức: Câu ${this._quizIdx + 1}/${ENDOCRINE_QUIZ.length}`, px + 50, py - 30);

        // 2. Hộp tình huống
        fill(255); stroke(40, 60, 120); strokeWeight(2);
        rect(px, py, pw, 120, 10);
        fill(30); noStroke(); textSize(16); textStyle(NORMAL);
        text(q.situation, px + 15, py + 20, pw - 30, 90);

        // 3. Các phương án trả lời
        const optY0 = py + 140, optH = 70, optGap = 15;
        for (let i = 0; i < q.options.length; i++) {
            const opt = q.options[i];
            const oy = optY0 + i * (optH + optGap);
            const isSelected = (answered === i);
            const isRevealed = (answered !== undefined);

            // Màu sắc dựa trên trạng thái trả lời
            if (isRevealed) {
                if (opt.correct) { fill(210, 245, 215); stroke(40, 150, 70); }
                else if (isSelected) { fill(250, 210, 210); stroke(200, 50, 50); }
                else { fill(245); stroke(200); }
            } else {
                fill(255); stroke(100);
                if (mouseX > px && mouseX < px + pw && mouseY > oy && mouseY < oy + optH) fill(235, 245, 255);
            }

            rect(px, oy, pw, optH, 8);
            fill(isSelected && isRevealed ? (opt.correct ? color(20, 100, 40) : color(150, 30, 30)) : 30);
            noStroke(); textSize(15);
            text(`${String.fromCharCode(65 + i)}. ${opt.text}`, px + 20, oy + 25, pw - 40, optH - 20);
        }

        // 4. Feedback sau khi trả lời
        if (answered !== undefined) {
            const isCorrect = q.options[answered].correct;
            const fbY = optY0 + 3 * (optH + optGap);
            fill(isCorrect ? color(230, 255, 230) : color(255, 240, 240));
            stroke(isCorrect ? color(40, 150, 70) : color(200, 50, 50));
            rect(px, fbY, pw, 80, 10);
            fill(0); noStroke(); textSize(14); textStyle(ITALIC);
            text(q.options[answered].feedback, px + 15, fbY + 20, pw - 30, 60);

            // Nút chuyển câu hỏi
            if (this._quizIdx < ENDOCRINE_QUIZ.length - 1) {
                fill(40, 60, 120); rect(px + pw - 150, fbY + 90, 150, 40, 5);
                fill(255); textAlign(CENTER); textStyle(BOLD);
                text("CÂU TIẾP THEO", px + pw - 75, fbY + 115);
            }
        }
        pop();
    }

    checkClick() {

        if (this.step === 0) {
            super.checkClick(); // Logic tour cũ
        } else {
            // Logic Quiz Click
            const px = 50, py = 100, pw = 700;
            const optY0 = py + 140, optH = 70, optGap = 15;
            const answered = this._quizAnswers[this._quizIdx];

            if (answered === undefined) {
                for (let i = 0; i < 3; i++) {
                    const oy = optY0 + i * (optH + optGap);
                    if (mouseX > px && mouseX < px + pw && mouseY > oy && mouseY < oy + optH) {
                        this._quizAnswers[this._quizIdx] = i;
                        return;
                    }
                }
            } else if (this._quizIdx < ENDOCRINE_QUIZ.length - 1) {
                // Click nút "Câu tiếp theo"
                if (mouseX > px + pw - 150 && mouseX < px + pw && mouseY > py + 140 + 3 * (70 + 15) + 90) {
                    this._quizIdx++;
                }
            }
            super.checkClick();
        }
    }
}