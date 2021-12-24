import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "signup-comp",
  class extends HTMLElement {
    connectedCallback() {
      this.render();

      const currentState = state.getState();

      if (currentState.user.token == "") {
        const form = document.querySelector(".signup__form");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const target = e.target as any;
          const fullName = target.name.value;
          const password = target.password.value;
          const confirmPassword = target.confirmPassword.value;

          if (password == confirmPassword) {
            state.signUp(currentState.user.email, fullName, password);
            Router.go("/");
          } else {
            window.alert("Las contraseñas no coinciden");
          }
        });
      } else {
        state.myInfo().then(() => {
          const form: any = document.querySelector(".signup__form");
          form.name.value = currentState.user.fullName;

          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target as any;
            const fullName = target.name.value;
            const password = target.password.value;
            const confirmPassword = target.confirmPassword.value;

            if (password == confirmPassword) {
              state.editMyInfo(fullName, password);
              Router.go("/");
            } else {
              window.alert("Las contraseñas no coinciden");
            }
          });
        });
      }
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        
          .signup__form{
            color: black;
            display: flex;
            flex-direction: column;
            padding: 10px 35px;
            font-family: "poppins";
            align-items: center;
    
          }
         

          .margin{
              margin-bottom: 20px;
          }
          .botoncito{
            width: 350px;
          text-align:center;
          }

          label{
            font-size: 16px;
          }
          .button{
            width: 350px;
        text-align:center;
          }
      `;

      this.innerHTML = ` 
          <div class="signin__container">
          <head-comp></head-comp>   
          <form class="signup__form">
          <my-text variant="main">Mis datos</my-text>
          <div>
          <label>NOMBRE </label><br>
          <input class="signin__input" type="name" name="name" required>
         </div>
         <div>
         <label>CONTRASEÑA </label><br>
         <input class="signin__input margin" type="password" name="password" required>
        </div>
        <div>
        <label>REPETIR CONTRASEÑA </label><br>
        <input class="signin__input" type="password" name="confirmPassword" required>
       </div>
         <div class="botoncito">
          <button class="boton-rojo button-signup">Siguiente</button>
        </div>
          </form>
        </div>
      
      `;
      this.appendChild(style);
    }
  }
);
