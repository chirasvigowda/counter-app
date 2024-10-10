import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0; 
    this.minNumber = 0; 
    this.maxNumber = 30; 
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number, reflect: true }, 
      minNumber: { type: Number }, 
      maxNumber: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .btm-wrapper {
        display: flex; 
        justify-content: center; 
      }
      .wrapper {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-8);
        text-align: center; 
      }
    
      .counter{
        font-size: var(--ddd-font-size-l)
        
      }
      :host([counter="18"]) .counter {
        color: var(--ddd-theme-default-landgrantBrown); 
      }
      :host([counter="21"]) .counter {
        color: var(--ddd-theme-default-skyBlue); 
      }
      :host([counter="0"]) .counter {
        color: var(--ddd-theme-default-roarGolden); 
      }
      :host([counter="30"]) .counter {
        color: var(--ddd-theme-default-original87Pink); 
      }
      button {
        font-size: var(--ddd-font-size-s); 
        background-color: var(--ddd-theme-default-skyLight);
        padding: var(--ddd-spacing-2); 
        
      }
      button:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
      }
      button:disabled {
        background-color: var(--ddd-theme-default-potential0);
      }
    `];
  }
  decrement() {
    if (this.counter > this.minNumber) {
      this.counter--; 
    }
  }
  increment() {
    if (this.counter < this.maxNumber) {
      this.counter++; 
    }
  }
  updated(changedProperties) {
    if (changedroperties.has('counter')) {
      if (this.counter === this.maxNumber) {
        this.makeItRain();
      }
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");

        }, 0);
      }
    );
  }

  render() {
    return html`
      <confetti-container id="confetti" class="wrapper">
        <div>${this.title}</div>
        <div class = "counter">${this.counter}</div>
        <div class="btm-wrapper"> 
          <button @click="${this.decrement}" ?disabled ="${this.counter === this.minNumber}">-</button>
          <button @click="${this.increment}" ?disabled = "${this.counter === this.maxNumber}">+</button>
        </div>

        <slot></slot>
    </confetti-container>
      </div>`;
  }
static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}


globalThis.customElements.define(counterApp.tag, counterApp);
