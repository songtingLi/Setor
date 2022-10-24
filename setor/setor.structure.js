(function (functory) {

  Setor && functory(Setor);

})((Setor) => {
  const APP_CONFIG_PATH = "app.config.json";

  function createApp() {
    fetch(APP_CONFIG_PATH)
      .then(data => data.json())
      .then(config => {
        if (!config.rootNode) return;

        Setor.components({
          "app-root": "src/App"
        });
        let rootNode = document.querySelector(config.rootNode);
        rootNode.innerHTML = "<app-root></app-root>";

        if (config.rootJs) {
          fetch(config.rootJs)
            .then(data => data.text())
            .then(js => {
              new Function(js)();
            });
        }

        if (config.rootCss) {
          fetch(config.rootCss)
            .then(data => data.text())
            .then(css => {
              Setor.rootCss(css);
            });
        }
      });
  }

  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      createApp();
    });
  } else {
    createApp();
  }
})
