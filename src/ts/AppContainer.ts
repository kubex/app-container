import {html, LitElement, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
// @ts-ignore
import styles from '../scss/container.scss';

@customElement('app-container')
export class AppContainer extends LitElement {
    @property({type: Boolean, attribute: 'allow-scripts'})
    private allowScripts: boolean = false;

    static get styles() {
        return unsafeCSS(styles);
    }

    connectedCallback() {
        super.connectedCallback();

        // @ts-ignore
        this.shadowRoot.createElement = function () {
            return document.createElement.apply(document, [...arguments]);
        }

        // @ts-ignore
        this.shadowRoot.body = this.shadowRoot;
    }

    set innerHTML(data) {
        this.shadowRoot.innerHTML = "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined\" rel=\"stylesheet\">" + data;

        if (!this.allowScripts) {
            return;
        }

        const scripts = this.shadowRoot.querySelectorAll('script');
        scripts.forEach((script) => {
            if (script.matches('[src]')) {
                fetch(script.getAttribute('src'))
                    .then(response => response.text())
                    .then((body) => {
                        this._evalCode(body)
                    });
            } else {
                this._evalCode(script.innerHTML)
            }
        });
    }

    private _evalCode(content) {
        const fn = new Function('document', content);
        fn(this.shadowRoot);
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
