import { EventEmitter } from 'events';
import { isiOS, isAndroid } from './utils';
import bind from 'lodash/bind';

/**
 * @private
 */
export class Popup extends EventEmitter {
  open(url = '/') {
    this.eventListeners = {
      loadHandler: bind(this.loadHandler, this),
      clickHandler: bind(this.clickHandler, this),
      closeHandler: bind(this.closeHandler, this)
    };

    const promise = new Promise(resolve => {
      this.tiWebView = Titanium.UI.createWebView({
        width: '100%',
        height: '100%',
        url: url
      });

      this.popup = Titanium.UI.createWindow({
        backgroundColor: 'white',
        barColor: '#000',
        title: 'Mobile Identity Connect',
        modal: true
      });
      this.popup.add(this.tiWebView);

      if (isiOS()) {
        this.tiWin = Titanium.UI.createWindow({
          backgroundColor: 'white',
          barColor: '#e3e3e3',
          title: 'Mobile Identity Connect'
        });
        this.tiWin.add(this.tiWebView);

        this.tiCloseButton = Titanium.UI.createButton({
          title: 'Close',
          style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        this.tiWin.setLeftNavButton(this.tiCloseButton);
        this.tiCloseButton.addEventListener('click', this.eventListeners.clickHandler);

        this.popup = Titanium.UI.iOS.createNavigationWindow({
          backgroundColor: 'white',
          window: this.tiWin,
          modal: true
        });
      } else if (isAndroid()) {
        this.popup.addEventListener('androidback', this.eventListeners.closeHandler);
      }

      this.tiWebView.addEventListener('load', this.eventListeners.loadHandler);
      this.tiWebView.addEventListener('error', this.eventListeners.loadHandler);
      this.popup.addEventListener('close', this.eventListeners.closeHandler);
      this.popup.open();
      resolve(this);
    });
    return promise;
  }

  close() {
    const promise = new Promise(resolve => {
      this.popup.close();
      resolve();
    });
    return promise;
  }

  loadHandler(event) {
    this.emit('loaded', event.url);
  }

  clickHandler() {
    this.close();
  }

  closeHandler() {
    this.tiWebView.removeEventListener('load', this.eventListeners.loadHandler);
    this.tiWebView.removeEventListener('error', this.eventListeners.loadHandler);
    this.popup.removeEventListener('close', this.eventListeners.closeHandler);

    if (isiOS()) {
      this.tiCloseButton.removeEventListener('click', this.eventListeners.clickHandler);
    } else if (isAndroid()) {
      this.popup.close();
      this.popup.removeEventListener('androidback', this.eventListeners.closeHandler);
    }

    this.emit('closed');
  }
}
