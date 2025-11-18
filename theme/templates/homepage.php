<?php /* Template Name: Landing page */ ?>

<?php get_header(); ?>


<div id="customCursor" class="bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] relative ">

    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_4.png' ?>" alt="" class="lg:block hidden absolute top-[200px] right-0">
    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_3.png' ?>" alt="" class="lg:block hidden absolute top-[500px] left-0">

    <div class="">
        <?php render_rocket_block('floating-contact'); ?>
    </div>


    <div class="lg:container text-center lg:py-[100px] py-[30px] mx-auto relative">
        <!-- HÌNH -->
    <div class="relative w-full">

        <!-- ẢNH DESKTOP 1 -->
        <img 
            src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
            alt=""
            class="absolute hidden lg:block 
                top-[10%] left-[20%] 
                w-[570px] h-[430px] 
                opacity-0 fade-target"
        >   

        <!-- ẢNH MOBILE / TABLET -->
        <img 
            src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
            alt=""
            class="absolute lg:hidden 
                top-[12%] left-[15%] md:left-[22%] lg:left-[20%] -translate-x-1/2
                w-[200px] h-auto md:w-[300px]
                opacity-0 fade-target"
        >

        <!-- ẢNH DESKTOP 2 -->
        <img 
            src="<?php echo get_stylesheet_directory_uri().'/assets/images/Layer 2 2.png' ?>" 
            alt=""
            class="absolute 
                top-[-10px]
                right-[13%]  md:right-[28%] ip:right-[20%] lg:right-[1%] xl:right-[16%] 2xl:right-[26%]
                w-[103px] h-[100px] lg:w-[239px] lg:h-[231px]
                opacity-0 fade-delayed"
        >

    </div>

        

        <!-- TEXT -->
        <div class="container mx-auto lg:w-[600px] w-full text-center lg:pt-[500px] pt-[180px] md:pt-[260px]  text-[#333] leading-[1.7] space-y-6  mx-auto px-4 lg:px-0 ">

            <p class=" lg:text-[18px] text-[10px] font-normal">
                <span class="font-bold">Duo</span>Men với công nghệ <span class="font-bold">Viên nang kép</span> – cung cấp đồng thời <span class="font-bold">02 hệ Men trong cùng 1 viên:</span> 
                Men tiêu hóa cho Dạ dày và Men vi sinh cho Ruột.
            </p>

            <p class="lg:text-[18px] text-[10px] font-normal">
                <span class="font-bold">Duo</span>Men được nghiên cứu và phát triển bởi <span class="font-bold">Aora Health (Tây Ban Nha)</span> 
                & được <span class="font-bold">MHD Pharma phân phối độc quyền tại Việt Nam.</span>
            </p>
        </div>
    </div>

    <div id="duomen" class="relative w-full lg:max-w-[1200px] mx-auto lg:py-20 py-10 lg:block hidden">
        <!-- Hình nền lớn -->

        <!-- TEXT TRÁI -->
        <div class="absolute top-[330px] left-[30px] w-[330px] text-center text-[#333] leading-[1.6] lg:block hidden">
            <h3 class="font-bold text-[40px] mb-2 bg-[#E02230] text-white">Men vi sinh</h3>
            <p class="text-[18px] font-bold mb-2 text-[#E02230] ">
                Viên nang trong bổ sung Men vi sinh cho Ruột: có 5 tỷ lợi khuẩn sống và thức ăn cho lợi khuẩn
            </p>
            <p class="text-[17px] font-Regular text-[#E02230] flex">
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                    alt=""
                    class="w-4 h-4 mt-2 ">Giúp xử lý Tiêu chảy/Táo bón nhờ cân bằng hệ vi sinh đường ruột
            </p>
        </div>

        <!-- TEXT PHẢI -->
        <div class="absolute top-[-40px] right-[40px] w-[330px] text-center text-[#333] leading-[1.6] lg:block hidden">
            <h3 class="font-bold text-[40px] mb-2 bg-[#2E368F] text-white">Men tiêu hóa</h3>
            <p class="text-[18px] font-bold text-[#2E368F]">
                Viên nang ngoài bổ sung cho Dạ dày: 05 loại Men tiêu hóa từ Nấm
            </p>
            <p class="text-[17px] font-Regular text-[#2E368F] flex">
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                    alt=""
                    class="w-4 h-4 mt-2"> Giúp xử lý tình trạng Đầy bụng khó tiêu trong vòng 15 phút
            </p>
            <p class="text-[17px] font-Regular text-[#2E368F] flex">
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                    alt=""
                    class="w-4 h-4 mt-2"> Đồng thời, bổ sung dưỡng chất tốt cho ruột, giúp giảm áp lực tiêu hóa cho ruột
            </p>
        </div>
        <div class="relative">
                        <!-- KHUNG PILL + RIPPLE -->
            <div class="absolute xl:top-[4%] top-[1.4%] xl:left-[62.3%] left-[59.9%] ">
                <!-- KHUNG CẮT VÒNG TRÒN -->
                <div
                    class="pill-container relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
                >
                    <!-- Ripple -->
                    <div class="ripple-ring ripple-1"></div>
                    <div class="ripple-ring ripple-2"></div>
                    <div class="ripple-ring ripple-3"></div>

                    <!-- Nếu có hình viên thuốc thì để ở đây -->
                    <!--
                    <div class="pill-image absolute inset-0 flex items-center justify-center z-10">
                        <img src="..." class="w-[80px] h-[80px] object-contain" alt="">
                    </div>
                    -->
                </div>
            </div>
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

    <div id="duomen_mb" class="relative w-full lg:max-w-[1200px] mx-auto lg:py-20 py-10 lg:hidden">
        <div class="relative w-full lg:max-w-[1200px] mx-auto lg:hidden overflow-hidden">
            <div class="">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 35.png' ?>" 
                    alt=""
                    class="w-full z-0">
            </div>

            <!-- KHUNG PILL + RIPPLE -->
            <div class="absolute top-[3%] md:top-[8%] left-[52.5%]  ip:left-[55%] md:left-[61.3%]">
                <!-- KHUNG CẮT VÒNG TRÒN -->
                <div
                    class="pill-container relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
                >
                    <!-- Ripple -->
                    <div class="ripple-ring ripple-1"></div>
                    <div class="ripple-ring ripple-2"></div>
                    <div class="ripple-ring ripple-3"></div>

                    <!-- Nếu có hình viên thuốc thì để ở đây -->
                    <!--
                    <div class="pill-image absolute inset-0 flex items-center justify-center z-10">
                        <img src="..." class="w-[80px] h-[80px] object-contain" alt="">
                    </div>
                    -->
                </div>
            </div>

        </div>


        <div class="relative mt-8 px-5  space-y-10 ">

                        <!-- TEXT PHẢI -->
            <div class=" items-start gap-10 space-y-10 mt-10">

                <!-- BLOCK 1 -->
                <div class="lg:max-w-[330px] text-[#333] leading-[1.6] text-center mx-auto  flex flex-col">

                    <p class="font-bold text-[20px] mb-2 bg-[#2E368F] text-white w-[59%] mx-auto ">
                        Men tiêu hóa
                    </p>

                    <p class="text-[14px] font-bold text-[#2E368F] mb-3">
                        Viên nang ngoài bổ sung cho Dạ dày: 05 loại Men tiêu hóa từ Nấm
                    </p>

                    <p class=" text-[14px] font-Regular text-[#2E368F] flex justify-between items-start mx-auto mb-2">
                        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                            alt=""
                            class="w-3 h-4 mt-1">
                        <span class="text-center ml-3">Giúp xử lý tình trạng Đầy bụng khó tiêu trong vòng 15 phút</span>
                    </p>

                    <p class=" text-[14px] font-Regular text-[#2E368F] flex justify-between items-start mx-auto">
                        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                            alt=""
                            class="w-3 h-4 mt-1">
                        <span class="text-center ml-3">Đồng thời, bổ sung dưỡng chất tốt cho ruột, giúp giảm áp lực tiêu hóa cho ruột</span>
                    </p>

                </div>


                <!-- BLOCK 2 -->
                <div class="lg:max-w-[330px] text-[#333] leading-[1.6] text-center mx-auto  flex flex-col">

                    <p class="font-bold text-[20px] mb-2 bg-[#E02230] text-white w-[59%] mx-auto ">
                        Men vi sinh
                    </p>

                    <p class="text-[14px] font-bold text-[#E02230] mb-3">
                        Viên nang trong bổ sung Men vi sinh cho Ruột: có 5 tỷ lợi khuẩn sống và thức ăn cho lợi khuẩn
                    </p>
                
                    <p class=" text-[14px] font-Regular text-[#E02230] flex justify-between  items-start mx-auto mb-2">
                        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>" 
                            alt=""
                            class="w-3 h-4 mt-1 ml-1">
                        <span class="text-center ml-3">Giúp xử lý Tiêu chảy/Táo bón nhờ cân bằng hệ vi sinh đường ruột</span>
                    </p>

                </div>

            </div>
        </div>

    </div>

    <div id="faq" class="relative w-full max-w-[1200px] mx-auto pt-10 lg:pb-20 pb-24 px-4 md:px-8">
        <!-- BACKGROUND VÒNG TRÒN -->
        <div class="absolute lg:top-[20%] lg:left-[-24%] left-[25%] inset-0 max-h-[600px] pointer-events-none lg:block hidden">
            <div class="pill-container relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] mt-10">
                
                <!-- Các vòng ripple -->
                <div class="ripple-ring ripple-1"></div>
                <div class="ripple-ring ripple-2"></div>
                <div class="ripple-ring ripple-3"></div>
                <div class="ripple-ring ripple-4"></div>
                <div class="ripple-ring ripple-5"></div>

                <!-- Hình viên thuốc -->
                <div class="pill-image flex items-center justify-center absolute inset-0">
                    <div
                        class="animate-pulse-pill w-[120px] h-[180px] sm:w-[150px] sm:h-[230px] md:w-[180px] md:h-[260px] lg:w-[220px] lg:h-[320px]"
                    >
                        <img
                        src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>"
                        class="w-full h-full object-contain"
                        alt="viên thuốc"
                        >
                    </div>
                </div>

            </div>
        </div>

        <!-- FAQ CONTENT -->
        <div class="relative z-20 w-full max-w-[850px] mx-auto ">
            
            <div class="flex justify-center  items-center mb-10 mx-auto  space-x-2">
                <img
                    src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>"
                    class="w-[35px] h-[35px]  object-contain mb-8 md:mb-12"
                    alt="viên thuốc"
                >
                <h2 class="text-center text-[16px] sm:text-[30px] md:text-[32px] font-bold text-[#2E3690] mb-8 md:mb-12">
                Câu hỏi thường gặp
                </h2>

            </div>

            <?php get_template_part('template-parts/content/frequently-asked-questions', null, array(

                
                'items' => array(
                    array(
                    'title' => 'Duo<span class="font-normal">Men</span> có xuất xứ từ đâu?',
                    'content' => '
                        <ul>
                            <li><span class="font-bold">Duo</span><span class="font-normal">Men</span> được nghiên cứu và phát triển bởi Aora Health (Tây Ban Nha) và được MHD Pharma phân phối độc quyền tại Việt Nam.</li>
                            <li><span class="font-bold">Duo</span><span class="font-normal">Men</span> hiện đang được lưu hành tại hơn 40 quốc gia trên toàn thế giới. </li>
                        </ul>',
                    ),

                    array(
                        'title' => 'Khi nào nên sử dụng Duo<span class="font-normal">Men</span>?',
                        'content' => '                        
                        <ul>
                            <li><span class="font-bold">Duo</span><span class="font-normal">Men</span> phù hợp cho người bị rối loạn tiêu hóa với các biểu hiện: đầy bụng, khó tiêu, tiêu chảy; người cần phục hồi hệ vi sinh đường ruột sau khi sử dụng kháng sinh hay uống rượu bia; người có sự bài tiết enzyme tiêu hóa không đầy đủ hay bị phẫu thuật đường tiêu hóa trên.  </li>
                            <li>Không dùng cho phụ nữ mang thai, cho con bú hoặc người mẫn cảm với thành phần sản phẩm.</li>
                        </ul>',
                    ),
                    array(
                        'title' => 'Duo<span class="font-normal">Men</span> có an toàn không?',
                        'content' => '                        
                        <ul>
                            <li>Men tiêu hóa từ Nấm và Lợi khuẩn Lactobacillus plantarum được chứng nhận an toàn theo tiêu chuẩn GRAS của FDA. </li>
                            <li><span class="font-bold">Duo</span><span class="font-normal">Men</span> không chứa bất kì thành phần từ động vật, phù hợp cho người ăn chay (Vegan).</li>
                        </ul>',
                    ),
                    array(
                        'title' => 'Duo<span class="font-normal">Men</span> nên dùng như thế nào để đạt hiệu quả tốt nhất?',
                        'content' => '                    
                         Uống 1 đến 2 viên/ngày, mỗi lần 1 viên, uống ngay đầu bữa ăn chính.
                        <ul>
                            <li class="ml-3">Dùng ít nhất 1–2 tuần để cải thiện triệu chứng rõ rệt.</li>
                            <li class="ml-3">Để ổn định hệ vi sinh đường ruột và tiêu hoá bền vững, nên duy trì 1–3 tháng.</li>
                        </ul>',
                    ),
                    array(
                        'title' => '<span class="font-bold">Duo</span><span class="font-normal">Men</span> có tương tác với các thuốc tôi đang dùng không?',
                        'content' => '
                            <ul>
                                
                                <li><span class="font-bold">Duo</span><span class="font-normal">Men</span> chứa Men tiêu hóa và Men vi sinh, chỉ hoạt động cục bộ ngay tại đường tiêu hóa. Hiện chưa ghi nhận tương tác bất lợi giữa Duo<span class="font-normal">Men</span> với các thuốc điều trị. Tuy nhiên, nếu như bạn đang sử dụng thuốc hoặc có tiền sử dị ứng thuốc, hãy tham khảo ý kiến chuyên gia trước khi dùng.  </li>
                            </ul>',
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
            <!-- HÌNH ĐẦU TIÊN (Chớp nhẹ) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt="logo"
                class="lg:h-[260px] lg:w-[340px] absolute z-10 
                    lg:bottom-[-190px] xl:right-[15%] lg:right-[20%] lg:block hidden
                    opacity-0 fade-target"
            />

            <!-- Hình 2-1 (Chớp + fade-in) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt=""
                class="absolute z-10 bottom-[-18%] left-[2%] ip:left-[5%] md:left-[21%] 
                    w-auto h-[212px] opacity-0 fade-target lg:hidden
                    "
            >

            <!-- Hình 2-2 (Chớp + fade-in-delayed) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Layer 2 2.png' ?>" 
                alt=""
                class="absolute z-10 bottom-[-4%] lg:bottom-[-10%] xl:bottom-[-10%] right-[9%] ip:right-[13%] md:right-[27%] lg:right-[1%] xl:right-[1%]
                    lg:w-[180px] md:w-[123px] w-[103px] lg:h-[180px] h-[120px] opacity-0 
                    animate-fade-in-delayed 
                    opacity-0 fade-delayed"
            >
        </div>


    </div>

</div>

<script>
document.addEventListener("DOMContentLoaded", () => {

    const fadeTargets = document.querySelectorAll(".fade-target");
    const fadeDelayed = document.querySelectorAll(".fade-delayed");

    function triggerAnim() {
        if (window.scrollY > 700) {
            fadeTargets.forEach(el => {
                el.classList.remove("opacity-0");
                el.classList.add("animate-fade-in");

            });

            fadeDelayed.forEach(el => {
                el.classList.remove("opacity-0");
                el.classList.add("animate-fade-in-delayed");
                el.classList.add("animate-pulse-pill");
            });
            
            // OPTIONAL: Disable trigger after the first time
            window.removeEventListener("scroll", triggerAnim);
        }
    }

    window.addEventListener("scroll", triggerAnim);
});
</script>


<?php get_footer(); ?>
