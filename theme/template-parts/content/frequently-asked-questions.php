<?php
$items = $args['items'] ?? array();
$text_title = $args['text_title'] ?? '';
?>

<div class="container ">
    <div class="mb-10 lg:mb-[60px]">
        <?php foreach ($items as $item): ?>
            <div class="py-2 border-b border-gray-300 w-[850px]  mx-auto">
                <?php render_rocket_block('collapse-block', $item); ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
