<header class="w-full bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] shadow-sm ">
    <div class="flex items-center justify-between py-10 px-6 relative">

      <!-- LOGO/GRAPHIC overlay -->
      <img 
        src="<?php echo get_stylesheet_directory_uri().'/assets/images/New_pack_hoz.png' ?>" 
        alt="logo"
        class="lg:h-[100px] h-14 absolute z-10 lg:top-3 top-2 lg:left-10 left-6"
      />


      <!-- Nút 3 gạch chỉ hiển thị trên mobile -->
      <button
        id="menuToggle"
        class="md:hidden absolute top-5 right-4 z-50 text-gray-800"
      >
        <!-- icon 3 gạch -->
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

      <!-- MENU DESKTOP -->
      <nav class="hidden md:flex gap-10 text-[18px] font-bold text-gray-700 ml-auto space-x-6 mr-10">
        <div class="relative inline-block">
          <a href="/" class="text-[#2E3690] font-bold hover:text-[#2E3690]">TRANG CHỦ</a>
          <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_1.png' ?>"
            class="absolute top-[-18px] right-[-14px] w-[16px]">
          <img src="<?php echo get_stylesheet_directory_uri().'/assets/images/Vector_2.png' ?>"
            class="absolute bottom-[-12px] right-[-10px] w-[12px]">
        </div>

        <a href="/" class="hover:text-[#2E3690]">Duo<span class="font-normal">men</span> BỤNG YÊN RUỘT ỔN</a>
        <a href="/" class="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
        <a href="/" class="hover:text-[#2E3690]">LIÊN HỆ</a>
      </nav>


      <!-- MENU MOBILE -->
      <nav
        id="mobileMenu"
        class="fixed top-0 right-0 h-full w-full bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] px-6 pt-24 transform translate-x-full transition-transform duration-300 md:hidden flex flex-col space-y-8 text-[18px] font-bold z-40"
      >
        <!-- Logo Mobile -->
        <img 
          src="<?php echo get_stylesheet_directory_uri().'/assets/images/New_pack_hoz.png' ?>" 
          class="h-12 w-24 mb-6 absolute top-4"
          alt="logo"
        />

        <a href="/" class="hover:text-[#2E3690]">TRANG CHỦ</a>
        <a href="/" class="hover:text-[#2E3690]">Duo<span class="font-normal">men</span> BỤNG YÊN RUỘT ỔN</a>
        <a href="/" class="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
        <a href="/" class="hover:text-[#2E3690]">LIÊN HỆ</a>
      </nav>

      <script>
        const menuToggle = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const iconOpen = document.getElementById("iconOpen");
        const iconClose = document.getElementById("iconClose");

        menuToggle.addEventListener("click", function () {
          const isOpen = mobileMenu.classList.contains("translate-x-0");

          if (isOpen) {
            // đóng menu
            mobileMenu.classList.add("translate-x-full");
            mobileMenu.classList.remove("translate-x-0");
          } else {
            // mở menu
            mobileMenu.classList.remove("translate-x-full");
            mobileMenu.classList.add("translate-x-0");
          }

          iconOpen.classList.toggle("hidden");
          iconClose.classList.toggle("hidden");
        });
      </script>

    </div>

<?php if ( is_front_page() ) : ?>
  <!-- SECTION HIỂN THỊ CHỈ Ở TRANG CHỦ -->
  <section class="relative w-full overflow-hidden">
    <img 
      src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 1.png' ?>" 
      class="w-full object-cover lg:block hidden"  
      alt="banner"
    />

    <img 
      src="<?php echo get_stylesheet_directory_uri().'/assets/images/banner_mb.png' ?>" 
      class="w-full object-cover lg:hidden"  
      alt="banner"
    />
  </section>
<?php endif; ?>


</header>