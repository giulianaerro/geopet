import { state } from "../../state";

class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();

    const currentState = state.getState();
    const textLostPetAround: any = document.querySelector(
      ".main__text-lost-pet-around"
    );
    const textLostPet: any = document.querySelector(".main__text-lost-pet");
    const userLocation: any = document.querySelector(".main__button-red");
    userLocation.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition((res) => {
        currentState.user.userLat = res.coords.latitude;
        currentState.user.userLng = res.coords.longitude;
        state.setState(currentState);

        if (currentState.userLat == "" && currentState.userLng == "") {
          userLocation.style = "display:inherit";
        } else {
          userLocation.style = "display:none";
          textLostPet.style = "display: none";
          textLostPetAround.style = "display: inherit";

          //agrego las tarjetas de perros perdidos cerca de la ubicación dada
          const div = document.createElement("div");

          div.innerHTML = `<card-comp class="petsaround-cards__container"></card-comp>`;
          this.appendChild(div);
        }
      });
    });
  }

  render() {
    const style = document.createElement("style");

    style.innerHTML = `
      .main__container-optionss {
        display: flex;
        justify-content:center      
      }
      .main__button-red{
        display:block;
        
      }
      .main__text-lost-pet-around{
        display:none
      }
      `;

    this.innerHTML = `
      <head-comp></head-comp>
      <my-text class="main__text-lost-pet" variant="main"> Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación. </my-text>
      <my-text class="main__text-lost-pet-around" variant="main">Mascotas perdidas cerca tuyo</my-text>
      <div class="main__container-optionss">
      <my-button class="main__button-red" variant="signup signup-main">Dar mi ubicación</my-buitton>
      </div>
      `;
    this.appendChild(style);
  }
}
customElements.define("hom-ge", HomePage);
