private _categoryLevelBuild = () => {

  // 初始化数据
  const categories = this.categories.data;
  let cates = categories.filter((c, i) => !c.pid);
  let subCates = categories.filter((c, i) => !!c.pid);

  // 级别数据构造
  const levelBuild = (sub, cates, level) => {
    // 遍历传入的父级分类
    cates.forEach(c => {
      // 如果当前分类的pid是父分类
      if(Object.is(sub.pid, c._id)) {
        // 则把自己加入到父分类的children中
        // console.log(sub.slug);
        c.level = level;
        sub.level = level + 1;
        c.children = c.children || [];
        c.children.push(sub);
        // console.log(c)
        // subCates.splice(subCates.findIndex((c) => Object.is(c, sub)), 1);
      } else {
        // 否则，如果父分类有子级，则继续递归子级
        let hasChildren = c.children && c.children.length;
        hasChildren && levelBuild(sub, c.children, level + 1);
        hasChildren || (c.level = level);
      }
    })
  };

  // 执行级别数据构造
  subCates.forEach(sub => { levelBuild(sub, cates, 0)});

  console.log(cates, subCates);

  // 如果存在父分类失效的子分类，则将子分类重新构造
  // if(subCates.length) Array.from(subCates).reverse().forEach(sub => { levelBuild(sub, subCates, 0)});

  // 扁平数据构造
  const levelBuildRun = cates => {
    let newCategories = [];
    const levelBuildOptimize = cates => {
      cates.forEach(c => {
        newCategories.push(c);
        if(c.children && c.children.length) levelBuildOptimize(c.children);
      })
    }
    levelBuildOptimize(cates);
    return newCategories;
  }

  // 开始执行
  this.categories.data = levelBuildRun([...cates, ...[]]);
};
