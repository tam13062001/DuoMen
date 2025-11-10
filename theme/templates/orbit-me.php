<?php 
/* Template Name: Orbit me */ 
get_header(); 
?>

<div id="orbit-contents" hidden>
  <div data-key="home"><?php get_template_part('template-parts/content/orbitme','home'); ?></div>
  <div data-key="payslip"><?php get_template_part('template-parts/content/orbitme','payslip'); ?></div>
  <div data-key="performance"><?php get_template_part('template-parts/content/orbitme','performance'); ?></div>
  <div data-key="playground"><?php get_template_part('template-parts/content/orbitme','playground'); ?></div>
</div>

<?php render_rocket_block('navigation'); ?>

<?php get_footer(); ?>
