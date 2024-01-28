
updateButton = (htmlPrefValue) => {
  switch (htmlPrefValue) {
    case 0:
      messenger.browserAction.setIcon({path: "toggleHTML1.png"});
      messenger.browserAction.setTitle({title: "Toggle HTML (viewing original HTML)"});
      break;

    case 4:
      messenger.browserAction.setIcon({path: "toggleHTML4.png"});
      messenger.browserAction.setTitle({title: "Toggle HTML (viewing all body parts)"});
      break;

    case 3:
      messenger.browserAction.setIcon({path: "toggleHTML2.png"});
      messenger.browserAction.setTitle({title: "Toggle HTML (viewing simple HTML)"});
      break;

    case 1:
      messenger.browserAction.setIcon({path: "toggleHTML3.png"});
      messenger.browserAction.setTitle({title: "Toggle HTML (viewing plain text)"});
      break;

    default:
      //disable button as pref value does not seem to be there
      messenger.browserAction.disable();
  }
}

togglePref = async () => {
  // get a value from the pref system
  let htmlPrefValue = await messenger.LegacyPrefs.getPref("mailnews.display.html_as");
  let mimePrefValue = await messenger.LegacyPrefs.getPref("mailnews.display.disallow_mime_handlers");
  let textPrefValue = await messenger.LegacyPrefs.getPref("mailnews.display.prefer_plaintext");
  let bodyPrefValue = await messenger.LegacyPrefs.getPref("mailnews.display.show_all_body_parts_menu");

  // toggle pref if possible
  switch (htmlPrefValue) {
    case 0:
      await messenger.LegacyPrefs.setPref("mailnews.display.html_as", 4);
      await messenger.LegacyPrefs.setPref("mailnews.display.disallow_mime_handlers", 0);
      await messenger.LegacyPrefs.setPref("mailnews.display.prefer_plaintext", false);
      await messenger.LegacyPrefs.setPref("mailnews.display.show_all_body_parts_menu", true);
      updateButton(4);
      break;

    case 4:
      await messenger.LegacyPrefs.setPref("mailnews.display.html_as", 3);
      await messenger.LegacyPrefs.setPref("mailnews.display.disallow_mime_handlers", 1);
      await messenger.LegacyPrefs.setPref("mailnews.display.prefer_plaintext", false);
      await messenger.LegacyPrefs.setPref("mailnews.display.show_all_body_parts_menu", false);
      updateButton(3);
      break;

    case 3:
      await messenger.LegacyPrefs.setPref("mailnews.display.html_as", 1);
      await messenger.LegacyPrefs.setPref("mailnews.display.disallow_mime_handlers", 1);
      await messenger.LegacyPrefs.setPref("mailnews.display.prefer_plaintext", true);
      await messenger.LegacyPrefs.setPref("mailnews.display.show_all_body_parts_menu", false);
      updateButton(1);
      break;

    case 1:
      await messenger.LegacyPrefs.setPref("mailnews.display.html_as", 0);
      await messenger.LegacyPrefs.setPref("mailnews.display.disallow_mime_handlers", 0);
      await messenger.LegacyPrefs.setPref("mailnews.display.prefer_plaintext", false);
      await messenger.LegacyPrefs.setPref("mailnews.display.show_all_body_parts_menu", false);
      updateButton(0);
      break;

    default:
      //disable button as pref value does not seem to be there
      updateButton();
  }

  // reload the message
  messenger.reloadApi.reloadMsg();
}

(async () => {
  // get a value from the pref system and initialize the button
  let htmlPrefValue = await messenger.LegacyPrefs.getPref("mailnews.display.html_as");
  updateButton(htmlPrefValue);

  messenger.browserAction.onClicked.addListener(togglePref);
})()
