
  export const buildMenuTree = (menuList) => {
  const menuMap = {};
  const tree = [];

  // Group by ID for fast access
  menuList.forEach(item => {
    menuMap[item.id] = { ...item, children: [] };
  });

  // Build hierarchy
  menuList.forEach(item => {
    if (item.parent && item.parent !== 0) {
      const parent = menuMap[item.parent];
      if (parent) {
        parent.children.push(menuMap[item.id]);
      }
    } else {
      tree.push(menuMap[item.id]);
    }
  });

  // Recursive sort by sort_order
  const sortMenus = (menus) => {
    return menus
      .sort((a, b) => {
        const aOrder = a.sort_order !== null ? parseInt(a.sort_order) : 999;
        const bOrder = b.sort_order !== null ? parseInt(b.sort_order) : 999;
        return aOrder - bOrder;
      })
      .map(menu => ({
        ...menu,
        children: sortMenus(menu.children),
      }));
  };

  return sortMenus(tree);
};
