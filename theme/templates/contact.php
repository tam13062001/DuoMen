<?php /* Template Name: Contact page */ ?>

<?php get_header(); ?>


<div class="bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] relative">
        
    <div class="">
        <?php render_rocket_block('floating-contact'); ?>
    </div>

    <div class="container mx-auto py-[40px]  lg:py-[70px] leading-[190%] ">

        <a href="/" class="text-[#3DA7F2] font-bold text-[14px] lg:text-[16px] mt-[40px]">
                        Quay về trang chủ 
                        <span class="ml-1">
                                <i class="fas fa-chevron-right"></i>
                        </span>
        </a>


        <h1 class="lg:mt-[4px] font-bold lg:text-[20px] lg:mt-[50px] ">
        Điền thông tin liên hệ
        </h1>

        
    </div>

    <div class="relative w-full pb-20 container mx-auto ">
        <?php
        $data = [
            "title" => "Liên hệ ngay với chúng tôi",
            "fields" => [
                "name_label" => "Tên của bạn",
                "name_placeholder" => "Nhập tên của bạn",
                "email_label" => "Email",
                "email_placeholder" => "Nhập email",
                "phone_label" => "Số điện thoại ",
                "phone_placeholder" => "Nhập số điện thoại ",
            ],
            "button_text" => "Gửi tin nhắn ",
            "image" => get_stylesheet_directory_uri() . "/assets/images/Frame 3 mb.png"
        ];
        ?>

        <div id="contact-page-data"
            data-props='<?php echo json_encode($data); ?>'>
        </div>

        <div>
            <?php render_rocket_block('contact-page'); ?>
        </div>

    </div>
</div>
<?php get_footer(); ?>