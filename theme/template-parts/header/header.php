<header id="mainHeader" class=" w-full z-50 bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] shadow-sm">

  <div class="flex items-center justify-between py-10 px-6 relative">

    <!-- LOGO -->
    <a href="/">
      <img 
        src="<?php echo get_stylesheet_directory_uri().'/assets/images/New_pack_hoz.png' ?>" 
        alt="logo"
        class="lg:h-[100px] h-14 absolute z-10 lg:top-6 top-2 lg:left-10 left-6"
      />
    </a>

    <!-- Nút Mobile -->
    <button
      id="menuToggle"
      class="lg:hidden absolute top-5 right-4 z-50 text-gray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        stroke="#2E3690"
        stroke-width="2"
        stroke-linecap="round"
      >
      <line x1="4" y1="10" x2="28" y2="10"></line>
      <line x1="4" y1="16" x2="28" y2="16"></line>
      <line x1="4" y1="22" x2="28" y2="22"></line>
      </svg>
    </button>

    <!-- Menu Desktop -->
    <nav class="hidden lg:flex gap-10 xl:text-[18px] text-[14px] font-bold text-gray-700 ml-auto space-x-6 mr-10">
      <div class="relative inline-block">
        <a href="/" class="text-[#2E3690] font-bold hover:text-[#2E3690]">TRANG CHỦ</a>
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_1.png' ?>"
          class="absolute top-[-18px] right-[-14px] w-[16px]">
        <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_2.png' ?>"
          class="absolute bottom-[-12px] right-[-10px] w-[12px]">
      </div>

      <a href="#duomen" class="hover:text-[#2E3690]">Duo<span class="font-normal">Men</span> BỤNG YÊN RUỘT ỔN</a>
      <a href="#faq" class="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
      <a href="/contact" class="hover:text-[#2E3690]">LIÊN HỆ</a>
    </nav>

    <!-- MOBILE MENU -->
      <nav
        id="mobileMenu"
        class="fixed top-0 right-0 h-full w-full bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8]
              px-6 pt-24 transform translate-x-full transition-transform duration-300
              lg:hidden flex flex-col space-y-8 text-[18px] font-bold z-[999]"
      >

        <!-- NÚT ĐÓNG -->
        <button
          id="closeMenu"
          class="absolute top-[34px] right-[25px] text-[#2E3690] text-[44px] font-bold z-[1000]"
        >
          &times;
        </button>

        <img 
          src="<?php echo get_stylesheet_directory_uri().'/assets/images/New_pack_hoz.png' ?>" 
          class="h-12 w-24 mb-6 absolute top-4 left-4"
          alt="logo"
        />

        <a href="/" class="hover:text-[#2E3690]">TRANG CHỦ</a>
        <a href="#duomen_mb" class="hover:text-[#2E3690]">Duo<span class="font-normal">Men</span> BỤNG YÊN RUỘT ỔN</a>
        <a href="#faq" class="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
        <a href="/contact" class="hover:text-[#2E3690]">LIÊN HỆ</a>
      </nav>


<script>
  document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeMenu");
    const header = document.getElementById("mainHeader");

    function openMenu() {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
      document.body.classList.add("overflow-hidden");
    }

    function closeMenu() {
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      document.body.classList.remove("overflow-hidden");
    }

    if(menuToggle && mobileMenu){
      menuToggle.addEventListener("click", function () {
        const isOpen = mobileMenu.classList.contains("translate-x-0");
        isOpen ? closeMenu() : openMenu();
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
      }

      document.querySelectorAll("#mobileMenu a").forEach(link => {
        link.addEventListener("click", closeMenu);
      });
    }

    // Sticky header
    if(header){
      const stickyPoint = header.offsetTop + 120;
      window.addEventListener("scroll", function () {
        if (window.pageYOffset > stickyPoint) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }
      });
    }

  });
</script>

  </div>

</header>

  <?php if ( is_front_page() ) : ?>
      <!-- SECTION HIỂN THỊ CHỈ Ở TRANG CHỦ -->
    <div class="relative w-full overflow-visible ">
        <div class="relative w-full  ">

          <div class="relative w-full lg:block hidden">
            <img 
              src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 1.png' ?>" 
              class="w-full object-cover "  
              alt="banner"
            />
                  <img 
                      src="<?php echo get_stylesheet_directory_uri().'/assets/images/bio.png' ?>" 
                      class="absolute z-20 xl:left-[49%] left-[50%] -translate-x-1/2 top-[15.6%] w-[112px] h-[25px] animate-pulse-pill-header "
                      alt="hop-duo"
                    />
                  <p class="w-[200px] absolute z-20 xl:left-[52.5%] 2xl:left-[51.5%] left-[55.5%] -translate-x-1/2 top-[-4%] xl:top-[2%] 2xl:top-[4%] italic text-[84px] font-black animate-pulse-pill-header color-change" >Duo</p>
                  <img 
                    src="<?php echo get_stylesheet_directory_uri().'/assets/images/duo.png' ?>" 
                    class="absolute z-20 left-[46.3%] -translate-x-1/2 top-[5.6%] xl:top-[7.6%] 2xl:top-[7.6%] w-[175px] h-[65px] animate-pulse-pill-header hidden"
                    alt="hop-duo"
                  />
                  <div class="absolute z-20 left-[24%] 2xl:left-[20.6%] -translate-x-1/2 top-[15.6%] flex flex-col space-y-4 text-[16px]  font-bold">
                      <!-- <p> <span class="font-black text-[20px] uppercase">viên kép</span> 02 Men </p>
                      <p class="ml-4"> Bụng <span class="font-black text-[20px] uppercase">viên kép</span> - Ruột <span class="font-black text-[20px] uppercase">Ổn</span> </p> -->
                      <?php render_rocket_block('text-block'); ?>
                  </div>
          </div>

          <div class="w-full lg:hidden">
              <div class="relative w-full">

                <!-- ẢNH NỀN -->
                <img 
                  src="<?php echo get_stylesheet_directory_uri().'/assets/images/shutterstock_1128129434_huge_0002_Hue_Saturation-2.png' ?>" 
                  class="w-full h-auto object-cover"
                  alt="banner"
                />

                <!-- ẢNH HỘP DUO ĐÈ LÊN TRÊN CÙNG -->

              

                <img 
                    src="<?php echo get_stylesheet_directory_uri().'/assets/images/Group.png' ?>" 
                    class="absolute z-20 left-[49%] md:left-[47%] -translate-x-1/2 top-[40px] md:top-[74px] w-[50px] h-[11px] animate-pulse-pill-header"
                    alt="hop-duo"
                  />
                <p class="absolute z-20 left-[53.8%] md:left-[50.1%] -translate-x-1/2 top-[-2px] md:top-[30px]
                  italic text-[34px] font-black leading-[1.3] pt-[2px] w-[72px]
                  animate-pulse-pill-header color-change">
                    Duo
                  </p>


                <div class="absolute z-20 left-[24.9%] ip:left-[23.2%] md:left-[15.2%] -translate-x-1/2 md:top-[100px] ip:top-[50px] top-[50px] flex flex-col space-y-4 text-[16px]  text-[#2E368F] font-bold">
                    <!-- <p> <span class="font-black text-[20px] uppercase">viên kép</span> 02 Men </p>
                    <p class="ml-4"> Bụng <span class="font-black text-[20px] uppercase">viên kép</span> - Ruột <span class="font-black text-[20px] uppercase">Ổn</span> </p> -->
                    <?php render_rocket_block('text-block'); ?>
                </div>
                
                <!-- ⭐ GRADIENT KHÔNG CÒN absolute — đã fix -->
                <div class="-mt-[150px] md:mt-[-280px] pt-[55px] pl-3 pr-3 pb-4 relative
                            bg-gradient-to-r from-[#2E3690] to-[#1067B2] text-white">

                    <div class="absolute z-30 ml-[110px] -translate-x-1/2 ip:top-[-120px] top-[-100px]">
                      <img 
                      src="<?php echo get_stylesheet_directory_uri().'/assets/images/hop DUO 2 mat OLD_it nghien 1.png' ?>" 
                      class=" ip:w-[250px] w-[220px] ip:h-[191px] h-[161px]"
                      alt="hop-duo"
                    />
                    </div>
                    <!-- <img 
                      src="<?php echo get_stylesheet_directory_uri().'/assets/images/shutterstock_1128129434_huge_0000_Layer-1.png' ?>" 
                      class="absolute z-20 ml-[183px] -translate-x-1/2 top-[-350px] w-[509px] h-[351px]"
                      alt="hop-duo"
                    /> -->
                    <p class="absolute z-30 text-right ml-[170px] -translate-x-1/2 top-3 w-full text-white text-[13px]"> Xuất xứ: <span class="font-bold"> TÂY BAN NHA</span></p>
                    <!-- NỘI DUNG CHÍNH -->
                    <p class="text-[11px] font-regular "> ĐỐI TƯỢNG SỬ DỤNG: <span class="text-[11px]">Người bị rối loạn tiêu hoá với biểu hiện:</span> </p> 
                    <p class="text-[11px] font-normal"> 
                      <span class="font-bold text-[14px]">đầy bụng, khó tiêu, tiêu chảy.</span> 
                      <span class="text-[11px]">Người cần phục hồi hệ vi sinh đường ruột</span> 
                      <span class="font-bold text-[14px]">sau khi</span> <span class="text-[11px]">sử dụng kháng sinh hay</span> 
                      <span class="font-bold text-[14px]">uống rượu bia.</span> <span class="text-[11px]"> Người có sự bài tiết enzyme tiêu hóa không đầy đủ hay bị phẫu thuật đường tiêu hóa trên. </span> 
                    </p>

                    <p id="certificateLine" class="font-normal text-[11px] mt-1">
                      Số giấy xác nhận nội dung quảng cáo: Số 497/2025/XNQC-ATTP
                    </p>


                      <!-- NÚT XEM THÊM -->
                      <button onclick="toggleMore()" id="moreBtn"
                              class="text-[9px] pb-[8px] underline">
                          + Xem Thêm
                      </button>

                      <!-- ⭐ NỘI DUNG ẨN -->
                    <div id="moreContent" class="hidden text-[10px] leading-[14px] pr-3 pb-4"> 
                      <p class="font-normal mt-2"> HƯỚNG DẪN SỬ DỤNG: Uống 1 đến 2 viên/ngày, mỗi lần 1 viên và uống vào đầu bữa ăn chính. CHÚ Ý: Để xa tầm tay trẻ em. Đọc kỹ hướng dẫn trước khi dùng. Không dùng cho phụ nữ có thai và cho con bú. Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm. THỰC PHẨM NÀY KHÔNG PHẢI LÀ THUỐC VÀ KHÔNG CÓ TÁC DỤNG THAY THẾ THUỐC CHỮA BỆNH. HƯỚNG DẪN BẢO QUẢN: Bảo quản ở nơi khô ráo, thoáng mát. NSX & HSD: Xem trên bao bì sản phẩm. QUY CÁCH ĐÓNG GÓI: 20 viên/ hộp (2 vỉ x 10 viên). Số giấy tiếp nhận đăng ký bản công bố sản phẩm: 8071/2019/ĐKSP. Số giấy xác nhận nội dung quảng cáo: Số 497/2025/XNQC-ATTP.</p>  
                      <p class="text-[11px] font-regular mt-1">THÀNH PHẦN CHÍNH: Trong viên nang: Vi sinh vật có lợi synbiotic (lactobacillus plantarum 5x109, fos: 140 mg), enzym (amylase 21,5 mg, glucoamylase
                      13,8 mg, lipase 13,3 mg, protease 3.0 7,5 mg, protease 4.5 3,9 mg), chất chống đông vón: magnesium stearate, dầu hướng dương.</p>
                      <p class="text-[11px] font-regular  mt-1">CÔNG DỤNG: Hỗ trợ bổ sung lợi khuẩn và enzyme tiêu hóa cho cơ thể. Hỗ trợ tăng cường tiêu hóa, hỗ trợ giảm chứng đầy bụng khó tiêu do thiếu hụt
                      enzyme chuyển hóa thức ăn. Hỗ trợ giảm rối loạn tiêu hóa do loạn khuẩn đường ruột.</p>
                      <p class="font-bold mt-1"> Công ty nhập khẩu và chịu trách nhiệm về chất lượng sản phẩm: CÔNG TY CỔ PHẦN MHD PHARMA | <span class="font-normal">Số 9B8-C9 Đường Số 10, Khu dân cư Dương Hồng Garden House, Xã Bình Hưng, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam. | Điện thoại: (028) 6680 8366.</span> </p> 
                      <p class="font-normal text-[11px] mt-2">Số giấy xác nhận nội dung quảng cáo: Số 497/2025/XNQC-ATTP</span> </p>
                    </div>
                </div>


          <script>
          function toggleMore() {
            const moreContent = document.getElementById('moreContent');
            const btn = document.getElementById('moreBtn');
            const certLine = document.getElementById('certificateLine');

            if (moreContent.classList.contains('hidden')) {
              // Mở xem thêm
              moreContent.classList.remove('hidden');
              btn.innerText = '- Thu gọn';

              // ẨN dòng số giấy bên trên
              certLine.classList.add('hidden');
            } else {
              // Thu gọn
              moreContent.classList.add('hidden');
              btn.innerText = '+ Xem Thêm';

              // HIỆN lại dòng số giấy
              certLine.classList.remove('hidden');
            }
          }
          </script>



            </div>
          </div>


        </div>
    </div>
  <?php endif; ?>
<!-- AOS CSS -->
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">

<!-- AOS init -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 900,
        once: true,
        offset: 60
    });
});
</script>