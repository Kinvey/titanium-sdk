import { EventEmitter } from 'events';
import bind from 'lodash/bind';
import isFunction from 'lodash/isFunction';

export default class Popup extends EventEmitter {
  open(url = '/', options = {}) {
    let interval;
    let eventListeners;
    let popupWindow;
    let titaniumWebView;
    let titaniumCloseButton;

    // clickHandler
    const clickHandler = () => {
      popupWindow.close();
    };

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
      // Clear the interval
      clearInterval(interval);

      // Close the popup
      popupWindow.close();
      this.popupWindow = null;

      // Remove event listeners
      if (popupWindow && isFunction(popupWindow.removeEventListener)) {
        popupWindow.removeEventListener('loadstart', eventListeners.loadStopCallback);
        popupWindow.removeEventListener('loadstop', eventListeners.loadStopCallback);
        popupWindow.removeEventListener('loaderror', eventListeners.loadErrorCallback);
        popupWindow.removeEventListener('close', eventListeners.exitCallback);
        popupWindow.removeEventListener('androidback', eventListeners.exitCallback);
        popupWindow.removeEventListener('exit', eventListeners.exitCallback);
      }

      if (titaniumWebView && isFunction(titaniumWebView.removeEventListener)) {
        titaniumWebView.removeEventListener('load', eventListeners.loadHandler);
        titaniumWebView.removeEventListener('error', eventListeners.loadHandler);
      }

      if (titaniumCloseButton && isFunction(titaniumCloseButton.removeEventListener)) {
        titaniumCloseButton.removeEventListener('click', eventListeners.clickHandler);
      }

      // Emit closed
      this.emit('closed');
    };

    // Bind event listeners
    eventListeners = {
      clickHandler: bind(clickHandler, this),
      loadStartCallback: bind(loadStartCallback, this),
      loadStopCallback: bind(loadStopCallback, this),
      loadErrorCallback: bind(loadErrorCallback, this),
      exitCallback: bind(exitCallback, this)
    };

    // Create popup window for Titanium
    titaniumWebView = global.Titanium.UI.createWebView({
      width: '100%',
      height: '100%',
      url: url
    });
    titaniumWebView.addEventListener('load', eventListeners.loadStopCallback);
    titaniumWebView.addEventListener('error', eventListeners.loadErrorCallback);

    popupWindow = global.Titanium.UI.createWindow({
      backgroundColor: 'white',
      barColor: '#000',
      title: options.title || 'Kinvey Mobile Identity Connect',
      modal: true
    });
    popupWindow.add(titaniumWebView);

    if (global.Titanium.Platform.osname === 'iphone' || global.Titanium.Platform.osname === 'ipad') {
      const tiWindow = global.Titanium.UI.createWindow({
        backgroundColor: 'white',
        barColor: '#e3e3e3',
        title: options.title || 'Kinvey Mobile Identity Connect',
      });
      tiWindow.add(titaniumWebView);

      titaniumCloseButton = global.Titanium.UI.createButton({
        title: 'Close',
        style: global.Titanium.UI.iPhone.SystemButtonStyle.DONE
      });
      tiWindow.setLeftNavButton(titaniumCloseButton);
      titaniumCloseButton.addEventListener('click', eventListeners.clickHandler);

      popupWindow = global.Titanium.UI.iOS.createNavigationWindow({
        backgroundColor: 'white',
        window: tiWindow,
        modal: true
      });
    } else if (global.Titanium.Platform.osname === 'android') {
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
