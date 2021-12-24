customElements.define(
  "my-text",
  class extends HTMLElement {
    shadow: ShadowRoot;
    variant: string;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.variant = this.getAttribute("variant") || "body";
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");

      style.innerHTML = `
            .main{
              font-size: 30px;
              font-weight: bold;
              padding: 100px 20px;
              margin: 0 auto;
              text-align: center;
              
            }
            @media (min-width: 796px) {
              .main {
                padding: 100px;
              }
            }
            @media (min-width: 1090px) {
              .main {
                padding: 100px 200px;
              }    
              }
              @media (min-width: 1450px) {
                .main {
                  padding: 100px 400px;
                  
                }
              }

            .title{
              font-size: 30px;
              font-weight: bold;
              padding: 30px;
              margin: 0 auto;
              text-align: center;
            }
            .subtitle{
              font-size: 21px;
              font-weight: bold;
              padding: 30px;
              margin: 0 auto;
              text-align: center;
            
            }
              `;

      div.className = this.variant;
      div.textContent = this.textContent;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
