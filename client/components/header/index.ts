import { Router } from "@vaadin/router";
import { state } from "../../state";

const geopetLogo = require("../../img/geopet.png");

customElements.define(
  "head-comp",
  class extends HTMLElement {
    connectedCallback() {
      this.render();

      const currentState = state.getState();

      const cerrarSesion: any = this.querySelector(".button-blue");

      cerrarSesion.addEventListener("click", () => {
        state.cerrarSesion();
        setTimeout(() => {
          location.reload();
        }, 1000);
      });

      const cerrarSesionBurger: any = this.querySelector(".button-blue-burger");

      cerrarSesionBurger.addEventListener("click", () => {
        state.cerrarSesion();
        setTimeout(() => {
          location.reload();
        }, 1000);
      });

      if (currentState.user.token == "") {
        const iniciarSesion: any = this.querySelector(".button-red");
        const cerrarSesion: any = this.querySelector(".button-blue");
        const cerrarSesionBurger: any = this.querySelector(
          ".button-blue-burger"
        );
        const iniciarSesionBurger: any =
          this.querySelector(".button-red-burger");

        cerrarSesionBurger.style = "display:none";
        cerrarSesion.style = "display:none";
        iniciarSesion.style = "display:inherit";
        iniciarSesionBurger.style = "display:inherit";
      } else {
        const cerrarSesion: any = this.querySelector(".button-blue");
        const iniciarSesion: any = this.querySelector(".button-red");
        const iniciarSesionBurger: any =
          this.querySelector(".button-red-burger");
        const cerrarSesionBurger: any = this.querySelector(
          ".button-blue-burger"
        );

        cerrarSesionBurger.style = "display:inherit";
        cerrarSesion.style = "display:inherit";
        iniciarSesion.style = "display:none";
        iniciarSesionBurger.style = "display:none";
      }

      const burger = this.querySelector(".hamburger");
      const menu = this.querySelector("#menubar");
      burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
      });
      burger.addEventListener("click", () => {
        menu.classList.toggle("is_active");
      });
    }

    addListener() {
      const currentState = state.getState();

      const iniciarSesion: any = this.querySelector(".button-red");
      const iniciarSesionBurger: any = this.querySelector(".button-red-burger");

      const myData = this.querySelector(".my-data");
      const myLostPets = this.querySelector(".my-lost-pets");
      const publishPet = this.querySelector(".publish-pet");
      const myDataBurger = this.querySelector(".my-data-burger");
      const myLostPetsBurger = this.querySelector(".my-lost-pets-burger");
      const publishPetBurger = this.querySelector(".publish-pet-burger");

      const listeners = [
        myData,
        myLostPets,
        publishPet,
        myDataBurger,
        myLostPetsBurger,
        publishPetBurger,
        iniciarSesionBurger,
        iniciarSesion,
      ];

      if (currentState.user.token == "") {
        for (const l of listeners) {
          l.addEventListener("click", () => {
            Router.go("/auth");
          });
        }
      } else {
        myData.addEventListener("click", () => {
          Router.go("/signup");
        });
        myLostPets.addEventListener("click", () => {
          Router.go("/mylostpets");
        });
        publishPet.addEventListener("click", () => {
          Router.go("/reportpet");
        });
        myDataBurger.addEventListener("click", () => {
          Router.go("/signup");
        });
        myLostPetsBurger.addEventListener("click", () => {
          Router.go("/mylostpets");
        });
        publishPetBurger.addEventListener("click", () => {
          Router.go("/reportpet");
        });
      }
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
    .button-red{
              background-color: #CF503A;
              border: 5px solid #9C3C2C;
              border-radius: 10px;
              width: 100%;
              max-width: 150px;
              padding: 8px 10px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              font-family: "Poppins", sans-serif;
              text-decoration: none;
              text-align: center;
              justify-content: center;
            }
            .button-red-burger{
              background-color: #CF503A;
              border: 5px solid #9C3C2C;
              border-radius: 10px;
              width: 100%;
              max-width: 150px;
              padding: 8px 10px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              font-family: "Poppins", sans-serif;
              text-decoration: none;
              text-align: center;
              justify-content: center;
            }
              .button-blue {
                background-color: #5064a6;
                border: 5px solid #152b73;
                border-radius: 10px;
                width: 100%;
                max-width: 150px;
                padding: 8px 10px;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                font-family: "Poppins", sans-serif;
                text-decoration: none;
                text-align: center;
                justify-content: center;
              }
              .button-blue-burger {
                background-color: #5064a6;
                border: 5px solid #152b73;
                border-radius: 10px;
                width: 100%;
                max-width: 150px;
                padding: 8px 10px;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                font-family: "Poppins", sans-serif;
                text-decoration: none;
                text-align: center;
                justify-content: center;
              }
    
`;

      this.innerHTML = `    
      <div class="header__container-bar">
      <a  href="/">
          <img src="${geopetLogo}" class="logo">
          </a>
   
      <div class="hamburger">
        <div class="_layer -top"></div>
        <div class="_layer -mid"></div>
        <div class="_layer -bottom"></div>
      </div>
  
      <div class="header__container-ventana" id="menubar">
          <div class="ventana">
              <div class="my-data-burger ventana-content">Mis datos</div>
              <div class="my-lost-pets-burger ventana-content">Mis mascotas reportadas</div>
              <div class="publish-pet-burger ventana-content">Reportar mascota</div>
              <div class="ventana-button">
              <button class="button-red-burger">Ingresar</>
              <button class="button-blue-burger">Cerrar sesion</button>
              </div>
          </div>
      </div>
  
     <div class="bar__container-service">
     <div class="my-data service">Mis datos</div>
     <div class="my-lost-pets service">Mis mascotas reportadas</div>
     <div class="publish-pet service">Reportar mascota</div>

     <button class="button-red">Ingresar</button>
     <button class="button-blue">Cerrar sesion</button>
    
          </div>
          </div>

`;

      this.appendChild(style);
      this.addListener();
    }
  }
);
