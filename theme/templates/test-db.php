<?php /* Template Name: Test connect db  */ ?>

<?php get_header(); ?>


<?php global $wpdb;

// Nếu bảng có prefix
$results =  orbit_test_db();


// In ra dạng thô
echo '<pre>';
print_r($results);
echo '</pre>'; ?>

<?php get_footer(); ?>
