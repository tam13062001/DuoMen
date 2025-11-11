<?php /* Template Name: Landing page */ ?>

<?php get_header(); ?>


<div class="bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] relative">

    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_4.png' ?>" alt="" class="lg:block hidden absolute top-[200px] right-0">
    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_3.png' ?>" alt="" class="lg:block hidden absolute top-[500px] left-0">

    <div class="">
        <?php render_rocket_block('floating-contact'); ?>
    </div>


    <div class="container text-center lg:py-[100px] py-[60px] mx-auto relative">
        <!-- HÌNH -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 3.png' ?>" 
             alt="" 
             class="mx-auto mb-8 lg:block hidden">

        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 3 mb.png' ?>" 
             alt="" 
             class=" lg:mt-0 mt-[-50px] lg:hidden">

        <!-- TEXT -->
        <div class="lg:w-[600px] w-full text-center  text-[#333] leading-[1.7] space-y-6 lg:mt-0 mt-[-50px] mx-auto">

            <p class="lg:text-[18px] text-[13px] font-bold">
                DuoMen với công nghệ Viên nang kép – cung cấp đồng thời 02 hệ Men trong cùng 1 viên: 
                Men tiêu hóa cho Dạ dày và Men vi sinh cho Ruột.
            </p>

            <p class="lg:text-[18px] text-[13px] font-bold">
                DuoMen được nghiên cứu và phát triển bởi Aora Health (Tây Ban Nha) 
                & được MHD Pharma phân phối độc quyền tại Việt Nam.
            </p>
        </div>
    </div>

    <div class="relative w-full lg:max-w-[1200px] mx-auto lg:py-20 py-10">
        <div class="container mx-auto  mb-6 lg:hidden">

            <div class=" lg:max-w-[330px] text-center text-[#333] leading-[1.6] mb-6">
                <h3 class="font-bold text-[20px] mb-2 text-[#E02230]">Men tiêu hóa</h3>
                <p class="text-[14px] font-bold ">
                    Viên nang ngoài bổ sung cho Dạ dày: 05 loại Men tiêu hóa từ Nấm
                </p>
                <p class="text-[14px] font-Regular ">
                    Giúp xử lý tình trạng Đầy bụng khó tiêu trong vòng 15 phút
                </p>
                <p class="text-[14px] font-Regular">
                    Đồng thời, bổ sung dưỡng chất tốt cho ruột, giúp giảm áp lực tiêu hóa cho ruột
                </p>
            </div>

            <div class=" lg:max-w-[330px] text-center text-[#333] leading-[1.6]">
                <h3 class="font-bold text-[20px] mb-2">Men vi sinh</h3>
                <p class="text-[14px] font-bold mb-2">
                    Viên nang trong bổ sung Men vi sinh cho Ruột: có 5 lợi khuẩn sống và thức ăn cho lợi khuẩn
                </p>
                <p class="text-[14px]">
                    Giúp xử lý Tiêu chảy/Táo bón nhờ cân bằng hệ vi sinh đường ruột
                </p>
            </div>


        </div>
        <!-- Hình nền lớn -->

        <!-- TEXT TRÁI -->
        <div class="absolute top-[330px] left-[30px] lg:max-w-[330px] text-left text-[#333] leading-[1.6] lg:block hidden">
            <h3 class="font-bold text-[40px] mb-2">Men vi sinh</h3>
            <p class="text-[18px] font-bold mb-2">
                Viên nang trong bổ sung Men vi sinh cho Ruột: có 5 lợi khuẩn sống và thức ăn cho lợi khuẩn
            </p>
            <p class="text-[18px]">
                Giúp xử lý Tiêu chảy/Táo bón nhờ cân bằng hệ vi sinh đường ruột
            </p>
        </div>

        <!-- TEXT PHẢI -->
        <div class="absolute top-[-40px] right-[40px] lg:max-w-[330px] text-left text-[#333] leading-[1.6] lg:block hidden">
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
        <div class="relative">
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 25.png' ?>" 
            alt=""
            class="w-full  z-0">
        <!-- Hình trái (Group 16) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 16.png' ?>" 
            alt="" 
            class="absolute lg:top-[67%] top-[67%] lg:left-[25%] left-[21%] lg:w-[180px] w-[70px]">

        <!-- Hình giữa (Duo men graphic) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 15.png' ?>" 
            alt="" 
            class="absolute lg:top-[62%] top-[62%]  lg:right-[-6%] right-[-6%]  transform -translate-x-1/2 lg:w-[320px] w-[100px]">

        <!-- Hình text phải (image 23) -->
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 23.png' ?>" 
            alt="" 
            class="absolute lg:top-[50%] top-[45%] lg:right-[34%] right-[31%] lg:w-[300px] w-[110px] ">
        </div>

    </div>

    <div class="relative w-full max-w-[1200px] mx-auto py-20 px-4 md:px-8">
        <!-- BACKGROUND VÒNG TRÒN -->
        <div class="absolute lg:top-[20%] lg:left-[-24%] left-[25%] inset-0 max-h-[600px] pointer-events-none">
            <div class="pill-container relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] mt-10">
                
                <!-- Các vòng ripple -->
                <div class="ripple-ring ripple-1"></div>
                <div class="ripple-ring ripple-2"></div>
                <div class="ripple-ring ripple-3"></div>
                <div class="ripple-ring ripple-4"></div>
                <div class="ripple-ring ripple-5"></div>

                <!-- Hình viên thuốc -->
                <div class="pill-image flex items-center justify-center absolute inset-0">
                    <div class="w-[120px] h-[180px] sm:w-[150px] sm:h-[230px] md:w-[180px] md:h-[260px] lg:w-[220px] lg:h-[320px]">
                        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 8.png' ?>" 
                            class="w-full h-full object-contain" alt="">
                    </div>
                </div>

            </div>
        </div>

        <!-- FAQ CONTENT -->
        <div class="relative z-10 w-full max-w-[850px] mx-auto lg:mt-0 mt-[200px]">
            
            <h2 class="text-center text-[16px] sm:text-[30px] md:text-[32px] font-bold text-[#2E3690] mb-8 md:mb-12">
                Câu hỏi thường gặp
            </h2>

            <?php get_template_part('template-parts/content/frequently-asked-questions', null, array(
                'items' => array(
                    array(
                        'title' => 'DuoMen có xuất xứ từ đâu?',
                        'content' => 'content',
                    ),
                    array(
                        'title' => 'Khi nào nên sử dụng DuoMen?',
                        'content' => 'content',
                    ),
                    array(
                        'title' => 'DuoMen có an toàn không?',
                        'content' => 'content',
                    ),
                    array(
                        'title' => 'DuoMen nên dùng như thế nào để đạt hiệu quả tốt nhất?',
                        'content' => 'content',
                    ),
                    array(
                        'title' => 'DuoMen có tương tác với các thuốc tôi đang dùng không?',
                        'content' => 'content',
                    ),
                ),
            )); ?>

            <div class="mt-10 text-center">
                <h2 class="text-[20px] sm:text-[30px] md:text-[32px] font-bold text-[#2E3690] mb-6">
                    Tìm mua Duo<span class="font-normal">Men</span> ở đâu
                </h2>
                <p class="font-bold text-[14px] md:text-[20px] container">
                    Sản phẩm đã có mặt tại các Bệnh viện và Nhà thuốc uy tín trên toàn quốc
                </p>
            </div>

        </div>

        <div>
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 16.png' ?>" 
                alt="logo"
                class="lg:h-[400px] lg:w-[700px]  absolute z-10 lg:bottom-[-260px] lg:right-[-10px] lg:block hidden"
            />

            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 3 mb.png' ?>" 
                alt="logo"
                class="h-auto w-[320px]  absolute z-10 lg:bottom-[-260px] left-[40px] lg:hidden"
            />
        </div>
    </div>

</div>



<?php get_footer(); ?>
