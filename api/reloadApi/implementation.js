var { ExtensionCommon } = ChromeUtils.importESModule("resource://gre/modules/ExtensionCommon.sys.mjs");

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
