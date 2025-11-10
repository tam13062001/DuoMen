<?php /* Template Name: Landing page */ ?>

<?php get_header(); ?>


<div class="bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8]">
    
    <div class="container text-center py-[100px] mx-auto relative">

            <!-- Nút thu gọn -->
            <button onclick="toggleButtons()" 
                id="btnToggle" 
                class="fixed top-[400px] right-0 transform -translate-y-1/2  text-white p-3 bg-[#E41E25] rounded-l-full z-50 flex flex-col space-y-3">
                <i data-lucide="video" class="w-8 h-8 bg-[#E41E25]"></i>
            </button>

            <button onclick="toggleButtons()" 
                id="btnToggle" 
                class="fixed top-[460px]  right-0 transform -translate-y-1/2  text-white p-3 bg-[#E41E25] rounded-l-full z-50 flex flex-col space-y-3">
                <i data-lucide="phone-call" class="w-8 h-8 bg-[#E41E25]"></i>

                
            </button>

            <button onclick="toggleButtons()" 
                id="btnToggle" 
                class="fixed top-[520px]  right-0 transform -translate-y-1/2  text-white p-3 bg-[#E41E25] rounded-l-full z-50 flex flex-col space-y-3">
                <i data-lucide="message-circle" class="w-8 h-8 bg-[#E41E25]"></i>               
            </button>

            <script>
            lucide.createIcons();
            </script>


        <!-- HÌNH -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 3.png' ?>" 
             alt="" 
             class="mx-auto mb-8 ">
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_4.png' ?>" alt="" class="absolute top-[200px] right-[-160px]">
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_3.png' ?>" alt="" class="absolute bottom-[300px] left-[-160px]">
        <!-- TEXT -->
        <div class="lg:w-[540px] text-center  mx-auto text-[#333] leading-[1.7] space-y-6">

            <p class="text-[18px] font-bold">
                DuoMen với công nghệ Viên nang kép – cung cấp đồng thời 02 hệ Men trong cùng 1 viên: 
                Men tiêu hóa cho Dạ dày và Men vi sinh cho Ruột.
            </p>

            <p class="text-[18px] font-bold">
                DuoMen được nghiên cứu và phát triển bởi Aora Health (Tây Ban Nha) 
                & được MHD Pharma phân phối độc quyền tại Việt Nam.
            </p>
        </div>
    </div>

    <div class="relative w-full max-w-[1200px] mx-auto py-20">

        <!-- Hình nền lớn -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 25.png' ?>" 
            alt=""
            class="w-full">
        <!-- TEXT TRÁI -->
        <div class="absolute top-[330px] top-[100px] left-[40px] max-w-[330px] text-left text-[#333] leading-[1.6]">
            <h3 class="font-bold text-[40px] mb-2">Men vi sinh</h3>
            <p class="text-[18px] font-bold mb-2">
                Viên nang trong bổ sung Men vi sinh cho Ruột: có 5 lợi khuẩn sống và thức ăn cho lợi khuẩn
            </p>
            <p class="text-[18px]">
                Giúp xử lý Tiêu chảy/Táo bón nhờ cân bằng hệ vi sinh đường ruột
            </p>
        </div>

        <!-- TEXT PHẢI -->
        <div class="absolute top-[-50px] right-[40px] max-w-[330px] text-left text-[#333] leading-[1.6]">
            <h3 class="font-bold text-[40px] mb-2 text-[#E02230]">Men tiêu hóa</h3>
            <p class="text-[18px] font-bold ">
                Viên nang ngoài bổ sung cho Dạ dày: 05 loại Men tiêu hóa từ Nấm
            </p>
            <p class="text-[18px] font-Regular ">
                Giúp xử lý tình trạng Đầy bụng khó tiêu trong vòng 15 phút
            </p>
            <p class="text-[18px] font-Regular">
                Đồng thời, bổ sung dưỡng chất tốt cho ruột, giúp giảm áp lực tiêu hóa cho ruột
            </p>
        </div>

        <!-- Hình trái (Group 16) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 16.png' ?>" 
            alt="" 
            class="absolute top-[720px] left-[300px] w-[180px]">

        <!-- Hình giữa (Duo men graphic) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 15.png' ?>" 
            alt="" 
            class="absolute top-[650px] right-[-70px] transform -translate-x-1/2 w-[320px]">

        <!-- Hình text phải (image 23) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 23.png' ?>" 
            alt="" 
            class="absolute top-[570px] right-[410px] w-[300px]">
    </div>

    <div class="relative w-full max-w-[1200px] mx-auto py-20">

        <!-- BACKGROUND VÒNG TRÒN -->
        <div class="absolute z-0">
            <div class="pill-container top-[200px] left-[-100px] relative w-[600px] h-[600px] ">
                <!-- Các vòng sóng -->
                <div class="ripple-ring ripple-1"></div>
                <div class="ripple-ring ripple-2"></div>
                <div class="ripple-ring ripple-3"></div>
                <div class="ripple-ring ripple-4"></div>
                <div class="ripple-ring ripple-5"></div>

                <!-- Viên thuốc (placeholder với gradient) -->
                <div class="pill-image flex items-center justify-center">
                    <div class="w-[200px] h-[280px]">
                        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 8.png' ?>" alt="">
                    </div>
                </div>
            </div>
        </div>


        <!-- FAQ -->
        <div class="mt-10 relative z-10 w-[850px] container mx-auto">
            <h2 class="text-center text-[32px] font-bold text-[#2E3690] mb-12 top-[-400px]">Câu hỏi thường gặp</h2>

            <div class="space-y-4 text-[#333] text-[20px] mb-12 ">
                <div class="flex justify-between border-b pb-3">
                    <span class="font-bold">DuoMen có xuất xứ từ đâu?</span>
                    <span>+</span>
                </div>
                <div class="flex justify-between border-b pb-3">
                    <span class="font-bold">Khi nào nên sử dụng DuoMen?</span>
                    <span>+</span>
                </div>
                <div class="flex justify-between border-b pb-3">
                    <span class="font-bold">DuoMen có an toàn không?</span>
                    <span>+</span>
                </div>
                <div class="flex justify-between border-b pb-3">
                    <span class="font-bold">DuoMen nên dùng như thế nào để đạt hiệu quả tốt nhất?</span>
                    <span>+</span>
                </div>
                <div class="flex justify-between border-b pb-3">
                    <span class="font-bold">DuoMen có tương tác với các thuốc tôi đang dùng không?</span>
                    <span>+</span>
                </div>
            </div>

            <div>
                <h2 class="text-center text-[32px] font-bold text-[#2E3690] mb-12 top-[-400px]">Tìm mua Duo<span class="font-Regular">Men</span> ở đâu</h2>
                <span class="font-bold text-[20px]">Sản phẩm đã có mặt tại các Bệnh viện và Nhà thuốc uy tín trên toàn quốc</span>
            </div>
        </div>

        <div>
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 16.png' ?>" 
                alt="logo"
                class="h-[400px] w-[700px] absolute z-10 bottom-[-260px] right-[-10px]"
            />
        </div>


    </div>
    <div class="bg-[#30B4F6] h-[400px] relative w-full overflow-hidden">
        <div class="max-w-[1200px] mx-auto px-6 flex  items-start">

            <!-- LEFT CONTENT -->
            <div class="text-white pt-[80px] ">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 10.png' ?>" 
                    alt="MHD Logo"
                    class="w-[120px] mb-[50px]">

                <p class="text-[14px] leading-[1.6] max-w-[480px]">
                    CÔNG TY CỔ PHẦN MHD PHARMA<br>
                    Giấy chứng nhận ĐKKD số 0311203203 do Phòng Đăng Ký Kinh Doanh<br>
                    – Sở Kế hoạch Đầu tư TP. Hồ Chí Minh cấp ngày 03/10/2011
                </p>

                <p class="text-[14px] mt-4 opacity-90">
                    Bản Quyền © 2025 MHDPharma
                </p>
            </div>

            <!-- RIGHT CONTENT -->
            <div class="flex flex-col items-end justify-center mt-[200px] ml-[250px]">
                <a href="#" 
                class="bg-[#2E3690] text-white px-6 py-3 rounded-full text-[14px] font-semibold shadow-lg hover:opacity-90 transition">
                    Facebook Vũ Trụ Duo Men
                </a>
            </div>

        </div>
    </div>

</div>



<?php get_footer(); ?>
