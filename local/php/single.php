<?php

get_header();

while (have_posts()) :
  the_post();
  get_template_part('partials/content/content-single');

  if (comments_open() || get_comments_number()) {
    comments_template();
  }
  the_post_navigation();
endwhile;

get_post();