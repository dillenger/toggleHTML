var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var Services = globalThis.Services || ChromeUtils.import("resource://gre/modules/Services.jsm");

var reloadApi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    let recentWindow = Services.wm.getMostRecentWindow("mail:3pane");
    return {
      reloadApi: {
        async reloadMsg() {
          recentWindow.ReloadMessage();
        },
      },
    };
  }
};
