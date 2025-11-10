<header class="w-full z-[100]">
    <div class="container">
        <div class="flex py-[32px] items-center justify-between text-[16px]">
            <a href="/">
                <img class="w-[140px]" src="<?php echo get_assets_from_path('/images/logo.png')  ?>" alt="Logo" />
            </a>
            <?php get_template_part('template-parts/header/menu'); ?>
            <?php get_template_part('template-parts/content/language-switcher'); ?>
        </div>
    </div>
</header>
