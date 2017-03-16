import { EventEmitter } from 'events';
import bind from 'lodash/bind';
import isFunction from 'lodash/isFunction';

import Device from './device';

export default class Popup extends EventEmitter {
  open(url = '/', options = {}) {
    let eventListeners;
    let popupWindow;
    let titaniumWebView;
    let titaniumCloseButton;

    // loadStartCallback
    const loadStartCallback = (event) => {
      this.emit('loadstart', event);
    };

    // loadStopCallback
    const loadStopCallback = (event) => {
      this.emit('loadstop', event);
    };

    // loadErrorCallback
    const loadErrorCallback = (event) => {
      this.emit('error', event);
    };

    // exitCallback
    const exitCallback = () => {
      // Close the popup
      popupWindow.close();
      this.popupWindow = null;

      // Remove event listeners
      if (popupWindow && isFunction(popupWindow.removeEventListener)) {
        popupWindow.removeEventListener('close', eventListeners.exitCallback);
        popupWindow.removeEventListener('androidback', eventListeners.exitCallback);
      }

      if (titaniumWebView && isFunction(titaniumWebView.removeEventListener)) {
        titaniumWebView.removeEventListener('load', eventListeners.loadStopCallback);
        titaniumWebView.removeEventListener('error', eventListeners.loadErrorCallback);
      }

      if (titaniumCloseButton && isFunction(titaniumCloseButton.removeEventListener)) {
        titaniumCloseButton.removeEventListener('click', eventListeners.closeHandler);
      }

      // Emit closed
      this.emit('exit');
    };

    // Bind event listeners
    eventListeners = {
      closeHandler: bind(this.close, this),
      loadStartCallback: bind(loadStartCallback, this),
      loadStopCallback: bind(loadStopCallback, this),
      loadErrorCallback: bind(loadErrorCallback, this),
      exitCallback: bind(exitCallback, this)
    };

    // Create popup window for Titanium
    titaniumWebView = Ti.UI.createWebView({
      width: '100%',
      height: '100%',
      url: url
    });
    titaniumWebView.addEventListener('load', eventListeners.loadStopCallback);
    titaniumWebView.addEventListener('error', eventListeners.loadErrorCallback);

    popupWindow = Ti.UI.createWindow({
      backgroundColor: 'white',
      barColor: '#000',
      title: options.title || 'Kinvey Mobile Identity Connect',
      modal: true
    });
    popupWindow.add(titaniumWebView);

    if (Device.isiOS()) {
      const tiWindow = Ti.UI.createWindow({
        backgroundColor: 'white',
        barColor: '#e3e3e3',
        title: options.title || 'Kinvey Mobile Identity Connect',
      });
      tiWindow.add(titaniumWebView);

      titaniumCloseButton = Ti.UI.createButton({
        title: 'Close',
        style: Ti.UI.iOS !== 'undefined'
          ? Ti.UI.iOS.SystemButtonStyle.DONE
          : Ti.UI.iPhone.SystemButtonStyle.DONE
      });
      tiWindow.setLeftNavButton(titaniumCloseButton);
      titaniumCloseButton.addEventListener('click', eventListeners.closeHandler);

      popupWindow = Ti.UI.iOS.createNavigationWindow({
        backgroundColor: 'white',
        window: tiWindow,
        modal: true
      });
    } else if (Device.isAndroid()) {
      popupWindow.addEventListener('androidback', eventListeners.exitCallback);
    }

    // Open the popup
    popupWindow.addEventListener('close', eventListeners.exitCallback);
    popupWindow.open();

    // Set the popupWindow instance
    this.popupWindow = popupWindow;

    // Return this
    return this;
  }

  close() {
    if (this.popupWindow) {
      this.popupWindow.close();
    }

    return this;
  }
}
