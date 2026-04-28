class NervousScene extends Scene {
    constructor() {
        super();
        
        // 1. Nút Back để quay lại bản đồ cơ thể (BodyMap)
        this.backBtn = new Button(100, 50, 150, 40, "Back", "SWITCH_SCENE", "BodyMap");
        this.objects.push(this.backBtn);

        // 2. Thêm Hình ảnh Hệ Thần Kinh (Dữ liệu từ assets.json: "brain")
        // Đặt ở vị trí trung tâm bên trái như trong Figma
        this.nervousDisplay = new ImageEntity(450, 400, 500, 500, "brain", true);
        this.objects.push(this.nervousDisplay);

        // 3. Thêm Giáo viên (Dữ liệu từ assets.json: "teach_point_talk")
        // Đặt ở bên phải, đang chỉ tay vào nội dung
        this.teacher = new ImageEntity(1000, 500, 400, 600, "teach_point_talk", true);
        this.objects.push(this.teacher);

        // 4. Ví dụ thêm một ImageButton để tương tác (Ví dụ: Nút Xem chi tiết Neuron)
        // Sử dụng một asset có sẵn làm nút, giả sử dùng "teach_normal" làm placeholder
        this.detailBtn = new ImageButton(1000, 700, 200, 80, "teach_normal", true, "SHOW_DETAIL", "neuron_info");
        this.objects.push(this.detailBtn);
    }

    draw() {
        // Màu nền xám trung tính giống trong Figma
        background(220); 
        
        // Vẽ tiêu đề bài học
        push();
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text("HỆ THẦN KINH - NERVOUS SYSTEM", width / 2, 60);
        
        // Vẽ bong bóng thoại giả định cho giáo viên (như trong Figma)
        fill(255);
        rect(800, 150, 300, 100, 20); // Khung lời thoại
        fill(0);
        textSize(18);
        text("Đây là bộ não, cơ quan\nđiều khiển mọi hoạt động!", 950, 195);
        pop();

        // Gọi hàm draw của lớp cha để vẽ tất cả objects (Entity, Button, ImageEntity...)
        super.draw();
    }
}