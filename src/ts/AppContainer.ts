import {html, LitElement, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
// @ts-ignore
import styles from '../scss/container.scss';
import '../../build/fusion';

const currScript: HTMLOrSVGScriptElement = document.currentScript;

export class AppContainer extends LitElement {
    @property({type: Boolean, attribute: 'allow-scripts'})
    private allowScripts: boolean = false;
    @property({type: HTMLDivElement})
    private container: HTMLDivElement = document.createElement('div');

    static get styles() {
        return unsafeCSS(styles);
    }

    connectedCallback() {
        super.connectedCallback();
        const container = this.container;

        // @ts-ignore
        this.container.createElement = function () {
            return document.createElement.apply(document, [...arguments]);
        }
        // @ts-ignore
        this.container.createDocumentFragment = function () {
            return document.createDocumentFragment.apply(document, [...arguments]);
        }
        // @ts-ignore
        this.container.createTextNode = function () {
            return document.createTextNode.apply(document, [...arguments]);
        }
        // @ts-ignore
        this.container.createRange = function () {
            return document.createRange.apply(document, [...arguments]);
        }
        // @ts-ignore
        this.container.getElementsByTagName = function (name) {
            return container.querySelectorAll(name);
        }
        // @ts-ignore
        this.container.getElementsByClassName = function (name) {
            return container.querySelectorAll('.' + name);
        }
        // @ts-ignore
        this.container.getElementById = function (name) {
            return container.querySelector('#' + name);
        }
        const oldQuerySelector = this.container.querySelector;
        // @ts-ignore
        this.container.querySelector = function (name) {
            if (name === 'head' || name === 'body' || name === 'html') {
                return container;
            }
            return oldQuerySelector.apply(container, [...arguments]);
        }

        // @ts-ignore
        this.container.body = this.container;
        // @ts-ignore
        this.container.head = this.container;
    }

    set innerHTML(data) {
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(this.container);
        this.container.innerHTML = "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined\" rel=\"stylesheet\">" + data;

        if (currScript) {
            this._evalScript(currScript);
        }

        if (!this.allowScripts) {
            return;
        }

        const scripts = this.shadowRoot.querySelectorAll('script');
        scripts.forEach((script) => {
            if (script.matches('[src]')) {
                this._evalScript(script);
            } else {
                this._evalCode(script.innerHTML)
            }
        });
    }

    private _evalCode(content, src = '') {
        const fn = new Function('document', content);
        try {
            fn(this.container);
        } catch (e) {
            console.error(e, src, fn);
        }
    }

    private _evalScript(script: HTMLOrSVGScriptElement) {
        fetch(script.getAttribute('src'))
            .then(response => response.text())
            .then((body) => this._evalCode(body, script.getAttribute('src')))
            .catch(e => {
                console.error('failed to fetch script', e);
            });
    }

    render() {
        return html`
          <slot>
            <div class="page-loading">
              <div><p>Loading, please wait...</p>
                <img alt="Loading"
                     src="data:image/gif;base64,R0lGODlhKwALAPEAAP///wA1aYKbtQA1aSH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA="/>
              </div>
            </div>
          </slot>`;
    }
}

customElements.get('app-container') || customElements.define('app-container', AppContainer);
