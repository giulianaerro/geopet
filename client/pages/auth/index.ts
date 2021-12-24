import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "auth-comp",
  class extends HTMLElement {
    connectedCallback() {
      this.render();

      const form = document.querySelector(".signin__form");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const email = target.email.value;
        const resauthUser = await state.authUser(email);

        if (resauthUser == true) {
          Router.go("signin");
        } else {
          Router.go("signup");
        }
      });
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .signin__container{

      }
      .signin__form{
        color: black;
        display: flex;
        flex-direction: column;
        padding: 10px 60px;
        font-family: "poppins";
        align-items: center;

      }
      
      }
      label{
        font-size: 16px;
      }
      .button{
        width: 350px;
    text-align:center;
      }
      .my-button{
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
  `;

      this.innerHTML = ` 
      <div class="signin__container">
      <head-comp></head-comp>   
      <form class="signin__form">
      <my-text variant="main" >Ingresar</my-text>
      <div>
      <label>EMAIL </label><br>
      <input class="signin__input" type="email" name="email" required>
     </div>
     <div class="button">
      <button class="my-button" variant="signup">Siguiente</button>
    </div>
      </form>
    </div>
  
  `;

      this.appendChild(style);
    }
  }
);
