import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "signin-comp",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const currentState = state.getState();

      const form = document.querySelector(".sign__form");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const password = target.password.value;
        const resauthUser = await state.signIn(
          currentState.user.email,
          password
        );
        if (resauthUser == false) {
          window.alert("contraseña incorrecta");
        } else {
          Router.go("/");
        }
      });
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .signin__container{
  
        }
        .sign__form{
          color: black;
          display: flex;
          flex-direction: column;
          padding: 10px 60px;
         font-family: "poppins";
          align-items: center;
  
        }
        
        label{
          font-size: 16px;
        }
        .boton{
          width: 350px;
      text-align:center;
        }
       
       
    `;

      this.innerHTML = ` 
        <div class="signin__container">
        <head-comp></head-comp>   
        <form class="sign__form">
        <my-text variant="main" >Ingresar</my-text>
        <div>
        <label>CONTRASEÑA </label><br>
        <input class="signin__input" type="password" name="password" required>
       </div>
       <div class="boton">
       <button class="boton-rojo">Siguiente</button>
     </div>
        </form>
      </div>
    
    `;
      this.appendChild(style);
    }
  }
);
