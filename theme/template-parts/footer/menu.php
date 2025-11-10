<?php

$current_lang = datum_detect_lang();

$columns = get_menu_tree_bilingual('footer-menu', $current_lang);
?>

<div class="grid grid-cols-2 md:grid-cols-4 gap-2">
    <?php foreach ($columns as $col): ?>
        <div>
            <h4 class="text-black uppercase lg:text-[16px] text-[12px] font-medium mb-4 mt-6 font-[500]">
                <?php echo esc_html($col['title']); ?>
            </h4>
            <ul class="space-y-5 font-bold text-[16px]">
                <?php foreach ($col['children'] as $item): ?>
                    <li>
                        <a 
                          href="<?php echo esc_url(datum_menu_lang_url($item['url'], $current_lang)); ?>" 
                          class="hover:underline transition duration-200"
                        >
                            <?php echo esc_html($item['title']); ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endforeach; ?>
</div>
