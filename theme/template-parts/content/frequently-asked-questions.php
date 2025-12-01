<?php
$items = $args['items'] ?? array();
$text_title = $args['text_title'] ?? '';
?>

<div class=" " data-aos="fade-up" data-aos-delay="100">
    <div class="mb-10 lg:mb-[60px]">
        <?php foreach ($items as $item): ?>
            <div class="py-2 border-b border-gray-300 lg:w-[850px] w-auto mx-auto lg:text-[20px] text-[16px]">
                <?php render_rocket_block('collapse-block', $item); ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
