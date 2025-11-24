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
        <div class="relative w-full ">

            <!-- ẢNH DESKTOP 1 -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt=""
                class="absolute hidden lg:block 
                    top-[10%] xl:left-[19%] left-[11%] 
                    w-[570px] h-[430px] 
                    "
                data-aos="fade-left"
            >   

            <!-- ẢNH MOBILE / TABLET -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt=""
                class="absolute lg:hidden 
                    top-[12%] left-[6%] ip:left-[9%] md:left-[22%] lg:left-[20%] -translate-x-1/2
                    w-[230px] h-auto md:w-[300px]
                    "
                data-aos="fade-left"
            >

            <!-- ẢNH DESKTOP 2 -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Layer 2 2.png' ?>" 
                alt=""
                class="absolute
                    top-[-10px]
                    right-[10%]  md:right-[28%] ip:right-[13%] lg:right-[16.5%] xl:right-[22.5%] 2xl:right-[31%]
                    w-[123px] h-[100px] lg:w-[239px] lg:h-[231px]
                    animate-pulse-pill-header"
                data-aos="fade-left"
            >
        </div>

    
        <!-- TEXT -->
        <div class="container mx-auto lg:w-[710px] w-full text-left lg:pt-[500px] pt-[220px] md:pt-[260px]  text-[#333] leading-[1.7] space-y-6  mx-auto px-4 lg:px-0 ">

            <p class=" lg:text-[22px] text-[13px] font-normal" data-aos="fade-down">
                <span class="font-bold">Duo</span>Men được nghiên cứu và phát triển bởi Aora Health <span class="font-bold">(Tây Ban Nha)</span> & được <span class="font-bold">MHD Pharma phân phối</span> độc quyền tại Việt Nam.
            </p>

            <p class="lg:text-[22px] text-[13px] font-normal" data-aos="fade-down">
                <span class="font-bold">Duo</span>Men với công nghệ<span class="font-bold"> Viên nang kép</span> - cung cấp đồng thời 02 hệ Men trong cùng 1 viên: Men tiêu hóa cho Dạ dày và Men vi sinh cho Ruột.
            </p>
        </div>
    </div>
    <div ></div>
    <div id="duomen" class="relative w-full lg:max-w-[1200px]   mx-auto lg:py-20 py-10 lg:block hidden">
        <!-- Hình nền lớn -->

        <!-- TEXT TRÁI -->
        <div class="absolute xl:top-[300px] top-[240px] xl:left-[-10px] left-0 w-[280px] xl:w-[330px] text-right text-[#333] leading-[1.6] lg:block hidden "data-aos="fade-down">
            <div class="relative mb-[75px]">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 27.png' ?>" 
                    alt=""
                    class="xl:w-[120px] w-[100px] lg:h-[125px] h-[105px] absolute right-[-48px] top-[-30px]">
                <a class="font-bold px-1 text-[28px] xl:text-[32px] mb-2 bg-[#E02230] w-80% text-center text-white absolute left-[75px] top-[10px]">Men vi sinh</a>
            </div>
            <p class="text-[18px] font-bold mb-3 text-[#E02230] ">
                Viên nang trong bổ sung Men vi sinh cho Ruột: 05 tỷ lợi khuẩn sống và thức ăn cho lợi khuẩn
            </p>
            <p class="text-[17px] font-Regular text-[#E02230]">Giúp xử lý <span class="font-bold"> Tiêu chảy </span> nhờ cân bằng </br> hệ vi sinh đường ruột
            </p>
        </div>

        <!-- TEXT PHẢI -->
        <div id="duomen" class="absolute xl:top-[-40px] lg:top-[-40px] xl:right-0 lg:right-0 w-[330px] text-left text-[#333] leading-[1.6] lg:block hidden "data-aos="fade-down">
            <div class="relative">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 28.png' ?>" 
                    alt=""
                    class="w-[42px] h-[75px]  absolute left-0 top-0">
                <a class="font-bold px-1 text-[28px] xl:text-[32px] mb-2 bg-[#2E368F] w-80% text-center text-white absolute left-[55px] top-[20px]">Men tiêu hóa</a>
            </div>
            <p class="text-[18px] font-bold text-[#2E368F] mt-[85px]">
                Viên nang ngoài bổ sung cho Dạ dày: 05 loại Men tiêu hóa từ Nấm
            </p>
            <p class="text-[17px] font-Regular text-[#2E368F] mt-3"> Giúp xử lý tình trạng <span class="font-bold"> Đầy bụng khó tiêu </span> trong vòng 15 phút
            </p>
            <p class="text-[17px] font-Regular text-[#2E368F] "> Đồng thời, tạo dưỡng chất tốt mịn, giúp giảm áp lực tiêu hóa cho ruột
            </p>
        </div>
        <div class="relative" data-aos="fade-up" data-aos-delay="100">
                        <!-- KHUNG PILL + RIPPLE -->
            <div class="absolute xl:top-[4%] top-[1.4%] xl:left-[62.3%] left-[59.9%] z-10">
                <!-- KHUNG CẮT VÒNG TRÒN -->
                <div
                    class="pill-container relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden "
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
                class="w-full  relative z-20 mt-[50px]">
            <!-- Hình trái (Group 16) -->
            <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 16.png' ?>" 
                alt="" 
                class="absolute lg:top-[69%] top-[67%] lg:left-[24%] left-[21%] lg:w-[180px] w-[70px] z-30" data-aos="fade-left">

            <!-- Hình giữa (Duo men graphic) -->
            <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 15.png' ?>" 
                alt="" 
                class="absolute lg:top-[62%] top-[62%]  2xl:right-[8%] right-[9%]  transform -translate-x-1/2 xl:w-[320px] lg:w-[280px] z-30" data-aos="fade-right">

            <!-- Hình text phải (image 23) -->
            <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 23.png' ?>" 
                alt="" 
                class="absolute xl:top-[50%] top-[53%] right-[33%] xl:right-[31%] xl:w-[384px] w-[300px] z-30">
        </div>

    </div>

    <div id="duomen_mb" class="relative  mx-auto lg:py-20 py-10 lg:hidden">

        <div class="absolute top-[10px] right-0 w-[230px] text-right text-[#333] leading-[1.6] "data-aos="fade-down">
            <div class="relative">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 28.png' ?>" 
                    alt=""
                    class="w-[36px] h-[56px]  absolute left-[45px] top-[5px]">
                <a class="font-bold px-1 text-[20px] mb-2 bg-[#2E368F] w-80% text-center text-white absolute right-[10px] top-[20px]">Men tiêu hóa</a>
            </div>
            <p class="text-[12px] font-bold text-[#2E368F] mt-[69px] mr-[10px]">
                Viên nang ngoài bổ sung cho </br> Dạ dày: 05 loại Men tiêu hóa từ Nấm
            </p>
            <p class="text-[12px] font-Regular text-[#2E368F] mt-3 mr-[10px]"> Giúp xử lý tình trạng <span class="font-bold"> Đầy bụng khó tiêu </span> trong vòng 15 phút
            </p>
            <p class="text-[12px] font-Regular text-[#2E368F] mr-[10px]"> Đồng thời, tạo dưỡng chất tốt mịn, giúp giảm áp lực tiêu hóa cho ruột
            </p>
        </div>
        
        <div class="relative w-full lg:max-w-[1200px]  mx-auto lg:hidden overflow-hidden mt-[150px] z-10">
            <div class="relative z-20">
                 <div class=" glow-bottom">
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Duoman.png' ?>" 
                        alt=""
                        class="w-full   z-20 ">
                    </div>
                    <!-- Hình trái (Group 16) -->
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 16.png' ?>" 
                        alt="" 
                        class="absolute  top-[75%] left-[4%] h-[70px] w-[70px] z-30" data-aos="fade-left">

                    <!-- Hình giữa (Duo men graphic) -->
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 15.png' ?>" 
                        alt="" 
                        class="absolute  top-[68%]  2xl:right-[8%] right-[8%]  transform -translate-x-1/2 h-[104px] w-[140px] z-30" data-aos="fade-right">

                    <!-- Hình text phải (image 23) -->
                    <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 23.png' ?>" 
                        alt="" 
                        class="absolute  top-[50%] ip:right-[34%] right-[36%]  ip:h-[325px] h-[300px] ip:w-[220px] w-[190px] z-30">
            </div>

            <!-- KHUNG PILL + RIPPLE -->
            <div class="absolute top-[1.4%] md:top-[8%] left-[52.5%]  ip:left-[55%] md:left-[61.3%] z-10 ">
                <!-- KHUNG CẮT VÒNG TRÒN -->
                <div
                    class="pill-container relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
                >
                    <!-- Ripple -->
                    <div class="ripple-ring ripple-1"></div>
                    <div class="ripple-ring ripple-2"></div>
                    <div class="ripple-ring ripple-3"></div>
                    <div class="ripple-ring ripple-4"></div>
                    <div class="ripple-ring ripple-5"></div>

                    <!-- Nếu có hình viên thuốc thì để ở đây -->
                    <!--
                    <div class="pill-image absolute inset-0 flex items-center justify-center z-10">
                        <img src="..." class="w-[80px] h-[80px] object-contain" alt="">
                    </div>
                    -->
                </div>
            </div>

        </div>


        <div class="absolute bottom-[-100px] left-0 w-[230px] text-left text-[#333] leading-[1.6] z-10"data-aos="fade-down">
            <div class="relative">
                <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/image 27.png' ?>" 
                    alt=""
                    class="w-[68px] h-[68px]  absolute right-[50px] top-[3px]">
                <a class="font-bold px-1 text-[20px] mb-2 bg-[#E02230] w-80% text-center text-white absolute left-[10px] top-[20px]">Men vi sinh</a>
            </div>
            <p class="text-[12px] font-bold text-[#E02230] mt-[69px] ml-[10px]">
                Viên nang trong bổ sung Men vi sinh cho Ruột: 05 tỷ Lợi khuẩn sống và thức ăn cho lợi khuẩn
            </p>
            <p class="text-[12px] font-Regular text-[#E02230] mt-3 ml-[10px]"> Giúp xử lý  <span class="font-bold"> Tiêu chảy </span> nhờ cân bằng hệ vi sinh đường ruột
            </p>
        </div>

    </div>

    <div id="faq"class="relative w-full max-w-[1200px] mx-auto pt-10 lg:pb-20 pb-24 px-4 md:px-8 lg:mt-0 mt-[200px]">
        <!-- BACKGROUND VÒNG TRÒN -->
        <div class="absolute lg:top-[20%] top-[-180px] md:top-[-290px] lg:left-[-24%] left-[22%] inset-0 max-h-[600px] pointer-events-none ">
            <div class="pill-container relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] mt-10">

                <div class="ripple-ring ripple-1"></div>
                <div class="ripple-ring ripple-2"></div>
                <div class="ripple-ring ripple-3"></div>
                <div class="ripple-ring ripple-4"></div>
                <div class="ripple-ring ripple-5"></div>

                <!-- Viên thuốc -->
                <div class="pill-image flex items-center justify-center absolute inset-0">
                    <div class="animate-pulse-pill w-[100px] h-[140px] sm:w-[150px] sm:h-[230px] md:w-[180px] md:h-[260px] lg:w-[220px] lg:h-[320px]">
                        <img
                        src="<?php echo get_stylesheet_directory_uri().'/assets/images/image8.png' ?>"
                        class="w-full h-full object-contain"
                        alt="viên thuốc"
                        data-aos="fade-out"
                        >
                    </div>
                </div>
            </div>

        </div>

        <!-- FAQ CONTENT -->
        <div class="relative z-20 w-full max-w-[850px] mx-auto lg:mt-0 mt-[70px]"   >
            
            <div class="flex justify-center  items-center mb-10 mx-auto  space-x-2" data-aos="fade-up">
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
                            <li>Men tiêu hóa từ Nấm và Lợi khuẩn <span class="italic">Lactobacillus plantarum</span> được chứng nhận an toàn theo tiêu chuẩn GRAS của FDA. </li>
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

            <div class="mt-10 mb-[100px] text-center" data-aos="fade-up" data-aos-delay="200">
                <h2 class="text-[20px] sm:text-[30px] md:text-[32px] font-bold text-[#2E3690] mb-6">
                    Tìm mua Duo<span class="font-normal">Men</span> ở đâu
                </h2>
                <p class="font-bold text-[14px] md:text-[20px] container">
                    Sản phẩm đã có mặt tại các Bệnh viện và Nhà thuốc uy tín trên toàn quốc
                </p>
            </div>

        </div>

        <div class="relative z-40 absolute top-[150px]">
            <!-- HÌNH ĐẦU TIÊN (Chớp nhẹ) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt="logo"
                class="lg:h-[260px] lg:w-[340px] absolute  
                    lg:bottom-[-50px] xl:left-[-7.5%] 2xl:left-[-5%] lg:left-[5%] lg:block hidden
                    "
            />

            <!-- Hình 2-1 (Chớp + fade-in) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo 1.png' ?>" 
                alt=""
                class="absolute   bottom-[-8%] left-[-1%] ip:left-[6%] md:left-[21%] 
                    w-auto h-[212px]  lg:hidden
                    "
            >

            <!-- Hình 2-2 (Chớp + fade-in-delayed) -->
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group 15.png' ?>" 
                alt=""
                class="absolute   
                    top-[-230px] ip:top-[-230px] md:top-[-230px] lg:top-[-230px] 2xl:top-[-230px]
                    left-[68%] ip:left-[68.5%] md:left-[56.5%] lg:left-[36.5%] xl:left-[19.5%]  2xl:left-[22%]
                    lg:w-[140px] md:w-[123px] w-[123px] lg:h-[140px] h-[120px] 
                    animate-pulse-pill-header"
            >
        </div>

    </div>

</div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {

            const fadeTargets = document.querySelectorAll(".fade-target");
            const fadeDelayed = document.querySelectorAll(".fade-delayed");


            const bounceItems = document.querySelectorAll(".fade-bounce");
            const bounceItems1 = document.querySelectorAll(".fade-bounce-1");

            function triggerAnim() {
                if (window.scrollY > 700) {
                    fadeTargets.forEach(el => {
                        el.classList.remove("opacity-0");
                        el.classList.add("animate-slide-left");
                    });

                    fadeDelayed.forEach(el => {
                        el.classList.remove("opacity-0");
                        el.classList.add("animate-slide-left-delayed");
                        el.classList.add("animate-pulse-pill");
                    });
                    
                    window.removeEventListener("scroll", triggerAnim);
                }
            }


            function triggerBounce() {

                if (window.scrollY > 1800) {
                    bounceItems.forEach(el => {
                        el.classList.remove("opacity-0");
                        el.classList.add("animate-bounceIn");
                    });

                    window.removeEventListener("scroll", triggerBounce);
                }

                if (window.scrollY > 1800) {
                    bounceItems1.forEach(el => {
                        el.classList.remove("opacity-0");
                        el.classList.add("animate-bounceIn-1");
                    });

                    window.removeEventListener("scroll", triggerBounce);
                }
            }


            window.addEventListener("scroll", triggerBounce);
            window.addEventListener("scroll", triggerAnim);
            window.addEventListener("scroll", triggerAnimRight);
            window.addEventListener("scroll", triggerAnimUpDown);
        });
    </script>



<?php get_footer(); ?>
