<?php get_header(); ?>
<div class="bg-white">
    <div class="container mx-auto">
        <!-- to apply language of post: use the_translate_post() -->            -->
        <?php //the_translated_content(); ?>
        <?php the_content() ?>
    </div>
</div>

<?php get_footer(); ?>
