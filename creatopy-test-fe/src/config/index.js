function loadParams() {
  const list = window.location.search.substring(1).split("&");
  let m = {};
  for (let i = 0; i < list.length; i++) {
    let indexOf = list[i].indexOf("=");
    if (indexOf >= 0) m[list[i].substring(0, indexOf)] = decodeURIComponent(list[i].substring(indexOf + 1));
  }
  return m;
}
var params = loadParams();
var currentUrl;
var backends = {};
var main = params["main"];
if (window && window.location) {
  currentUrl = window.location.href;
}
function bindBE(variable, key) {
  switch (variable) {
    case "prod":
      backends[key] = "http://localhost:8000";
      break;
    case "test":
      backends[key] = "http://localhost:8000";
      break;
    case "local":
      backends[key] = "http://localhost:8000";
      break;
    case "beta":
      backends[key] = "http://localhost:8000";
      break;
    default:
      if (currentUrl.indexOf("localhost") > -1) {
        switch (key) {
          case "main":
            backends[key] = "http://localhost:8000";
            break;
          default:
            backends[key] = "http://localhost:8000";
        }
      }
  }
}

bindBE(main, "main");

const apolloConfig = {
  // apollo client:
  apollo: {
    networkInterface: backends.main + "/graphql",
  },
  // sw path
  sw: {
    path: "assets/sw.js",
  },
};
const backendAuthPath = backends.main + "/auth";
export { backendAuthPath, apolloConfig };
