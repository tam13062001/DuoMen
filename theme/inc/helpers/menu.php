<?php
function get_menu_tree($menu_name) {
    $locations = get_nav_menu_locations();
    if (!array_key_exists($menu_name, $locations)) {
        return array();
    }
    $menu_id = $locations[$menu_name];
    // Get the menu items
    $menu_items = wp_get_nav_menu_items($menu_id);

    if (!$menu_items) {
        return [];
    }

    // Create an array to hold the tree structure
    $menu_tree = [];

    // Build a flat array with parent-child relationships
    foreach ($menu_items as $item) {
        $menu_tree[$item->ID] = [
            'ID' => $item->ID,
            'title' => $item->title,
            'url' => $item->url,
            'parent' => $item->menu_item_parent,
            'children' => []
        ];
    }


    // Organize items into a hierarchical structure
    foreach ($menu_tree as $item) {
        if ($item['parent'] != 0) {
            $menu_tree[$item['parent']]['children'][] = &$menu_tree[$item['ID']];
        }
    }


    // Filter out the top-level items
    return array_filter($menu_tree, function($item) {
        return $item['parent'] == '0' || $item['parent'] == 0;
    });
}