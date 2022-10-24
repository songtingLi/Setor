(function (functory) {

  Setor && functory(Setor);

})((Setor) => {
  class Router{
    static map = {};
    static path = (() => {
      window.addEventListener("hashchange", () => {
        let newPath = location.hash.slice(2).split("/");
        this.refreshRouterView(this.path, newPath);
        this.path = newPath;
      });
      let newPath = location.hash.slice(2).split("/");
      this.refreshRouterView([""], newPath);
      return newPath;
    })();
    static refreshRouterView(oldPath, newPath) {
      let map = Router.map;
      let mPath = "";
      let hiddenRouters = new Set(), showRouters = new Set();
      for (const p of newPath) {
        if(p === "") break;
        mPath += p;
        if(map[mPath]) {
          for (const m of map[mPath]) {
            showRouters.add(m);
          }
        }
      }
      mPath = "";
      for (const p of oldPath) {
        if(p === "") break;
        mPath += "/" + p;
        if(map[mPath]) {
          for (const m of map[mPath]) {
            showRouters.has(m) || hiddenRouters.add(m);
          }
        }
      }

      hiddenRouters.forEach(router => this.hiddenRouterNode(router));
      showRouters.forEach(router => this.showRouterNode(router));
    }
    static to(path){
      location.hash = "#/" + path;
    }
    static showRouterNode(router) {
      router.anchor.parentNode.insertBefore(router.node, router.anchor);
    }
    static hiddenRouterNode(router) {
      router.anchor.parentNode.removeChild(router.node);
    }
  }

  Setor.addRenderSpecial("router", (node, valueString, adorns, valueFun, lsnrctl) => {
    let anchor = document.createComment("router");
    node.parentNode.insertBefore(anchor, node);
    let router = {anchor,node};

    if(!Router.map[valueString]) {
      Router.map[valueString] = [];
    }
    Router.map[valueString].push(router);

    if(location.hash.indexOf("#/" + valueString) !== 0) {
      Router.hiddenRouterNode(router);
    }
  })

  Object.assign(Setor.prototype, {
    to: Router.to,
    path: Router.path
  });
})
