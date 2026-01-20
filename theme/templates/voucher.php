<?php /* Template Name: Contact Voucher page */ ?>

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

        <div>
            <?php render_rocket_block('contact-voucher'); ?>
        </div>
    </div>
</div>
<?php get_footer(); ?>