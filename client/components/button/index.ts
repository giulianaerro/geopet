customElements.define(
  "my-button",
  class extends HTMLElement {
    shadow: ShadowRoot;
    variant: string;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.variant = this.getAttribute("variant");
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const button = document.createElement("button");
      const style = document.createElement("style");

      style.innerHTML = `
          .signup{
              background-color: #CF503A;
              border: 5px solid #9C3C2C;
              border-radius: 10px;
              width: 100%;
              max-width: 250px;
              padding: 8px 10px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              font-family: "Poppins", sans-serif;
          }
          .signup-main{
            max-width: 400px;
            padding: 8px 40px;
            color: #fff;
            font-size: 24px;
        }
       
            `;
      button.textContent = this.textContent;
      button.className = this.variant;
      this.shadow.appendChild(button);
      this.shadow.appendChild(style);
    }
  }
);
