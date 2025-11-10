<?php if ( !is_front_page() ) : ?>
<header id="header" class="border-b border-border bg-white shadow-sm">
    <div class="flex h-16 items-center justify-between px-6">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="h-8 w-8 rounded-full bg-[#F3C11B] flex items-center justify-center ">
              <div class="h-4 w-4 rounded-full bg-black"></div>
            </div>
          </div>
          <div>
            <h1 class="text-xl font-bold text-black"><?php the_title() ?></h1>
            <p class="text-xs text-gray-600">Employee Dashboard</p>
          </div>
        </div>

        <div>
          <?php render_rocket_block('logout'); ?>
        </div>
    </div>
</header>
<?php endif; ?>
