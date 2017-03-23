if ("serviceWorker" in navigator) {
  window.onload = () => {
    navigator.serviceWorker.register("../sw-cache.js").then((scope) => {
      console.log(scope.scope);
    }
    ).catch(err => console.log(err))
  };
}

var request = window.indexedDB.open("TodoList", 1);
