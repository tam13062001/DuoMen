<?php
$current_id = get_queried_object_id();
$current_lang = datum_detect_lang();
$primary_menu_items = get_menu_tree_bilingual('primary-menu', $current_lang);

?>


<div class=" hidden xl:flex font-bold mt-2">
    <?php foreach ($primary_menu_items as $menu) : ?>

        <?php
        $menu_post_id = url_to_postid($menu['url']);
        $is_active = false;
        if ($menu_post_id) {
            // Nếu chính nó là trang hiện tại
            if ($current_id === $menu_post_id) {
                $is_active = true;
            }

            // Nếu menu là cha của trang hiện tại
            $ancestors = get_post_ancestors($current_id);
            if (in_array($menu_post_id, $ancestors)) {
                $is_active = true;
            }

            // Nếu trang hiện tại là con của menu này
            if (!empty($menu['children'])) {
                foreach ($menu['children'] as $submenu) {
                    $submenu_post_id = url_to_postid($submenu['url']);
                    if ($current_id === $submenu_post_id) {
                        $is_active = true;
                        break;
                    }
                }
            }
        }
        ?>


<div class="menu group relative 2xl:mt-1 mt-1">
    <?php if (!empty($menu['children'])): ?>
        <span class="2xl:mx-4 lg:mx-4 hover:border-b-2 cursor-pointer <?php echo $is_active ? 'active' : ''; ?>">
            <?php echo esc_html($menu['title']); ?>
        </span>
        <ul class="absolute left-0 top-full list-none z-20 w-max m-0 hidden group-hover:block pt-2">
            <?php foreach ($menu['children'] as $submenu) : ?>
                <li class="relative bg-secondary/10 hover:bg-secondary/20 border-b border-primary">
                    <a href="<?php echo esc_url(datum_menu_lang_url($submenu['url'], $current_lang)); ?>" class="block px-4 py-2 font-bold">
                        <?php echo esc_html($submenu['title']); ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <a class="2xl:mx-4 lg:mx-2 hover:border-b-2 <?php echo $is_active ? 'active' : ''; ?>" href="<?php echo esc_url(datum_menu_lang_url($menu['url'], $current_lang)); ?>">
            <?php echo esc_html($menu['title']); ?>
        </a>
    <?php endif; ?>
</div>

    <?php endforeach; ?>
</div>

<?php function translate_menu_items($items) {
    foreach ($items as &$item) {
        $item['title'] = datum_get_translation($item['title']);
        if (!empty($item['children'])) {
            $item['children'] = translate_menu_items($item['children']);
        }
    }
    return $items;
}

$translated_menu_items = translate_menu_items($primary_menu_items);
 ?>
<div class="xl:hidden lg:block ">
    <?php
    global $rocket;
    $logo_url = $rocket->helper->get_custom_logo_url();
    render_rocket_block('mobile-menu', array(
        'data' => array_values($primary_menu_items), // Đã là song ngữ rồi
        'logo_url_2' => get_stylesheet_directory_uri() . '/assets/images/logo.png',
    ));
    ?>
</div>
