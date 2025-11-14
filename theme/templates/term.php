<?php /* Template Name: Term page */ ?>

<?php get_header(); ?>


<div class="bg-gradient-to-r from-[#bae3f8] via-[#F5F5F5] to-[#bae3f8] relative">
        
    <div class="">
        <?php render_rocket_block('floating-contact'); ?>
    </div>

    <div class="container py-[40px]  lg:py-[100px] leading-[190%] pt-[40px] ">

        <a href="/" class="text-[#3DA7F2] font-bold text-[14px] lg:text-[16px] mt-[40px]">
            Back to Homepage
            <span class="ml-1">
                    <i class="fas fa-chevron-right"></i>
            </span>
        </a>  

        <h1 class="lg:mt-[4px] font-bold lg:text-[20px] lg:mt-[50px]">
        Privacy policy
        </h1>
        

        
    </div>

    <div class="relative w-full max-w-[1200px] mx-auto py-20 px-4 md:px-8">

        <div>
            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 16.png' ?>" 
                alt="logo"
                class="lg:h-[400px] lg:w-[700px]  absolute z-10 lg:bottom-[-260px] lg:right-[-10px] lg:block hidden"
            />

            <img 
                src="<?php echo get_stylesheet_directory_uri().'/assets/images/Frame 3 mb.png' ?>" 
                alt="logo"
                class="h-auto w-[330px]  absolute z-10 lg:bottom-[-260px] left-[40px] lg:hidden"
            />
        </div>
    </div>
</div>
<?php get_footer(); ?>