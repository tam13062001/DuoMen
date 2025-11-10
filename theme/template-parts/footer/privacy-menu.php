<?php 
$current_lang = datum_detect_lang();
$menu = get_menu_tree_bilingual('privacy-menu', $current_lang);
?>

<div class="lg:space-x-[50px] text-[16px] lg:flex">
    <div class="space-x-[50px] mb-9 lg:mb-0">
        <?php foreach ($menu as $item): ?>
            <a 
              href="<?php echo esc_url(datum_menu_lang_url($item['url'], $current_lang)); ?>" 
              class="hover:underline transition duration-200"
            >
                <?php echo esc_html(($item['title'])); ?>
            </a>
        <?php endforeach; ?>
    </div>
    <span>Copyright © 2025 by Datum</span>
</div>
