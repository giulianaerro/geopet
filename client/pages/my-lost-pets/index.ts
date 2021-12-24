import { Router } from "@vaadin/router";
import { state } from "../../state";

export class LostPets extends HTMLElement {
  connectedCallback() {
    this.render();

    state.getMyPets().then((pets) => {
      for (const pet of pets) {
        this.myPetsPublished(pet);
      }
      if (pets.length == 0) {
        this.noPetsPublished();
      }
    });
  }

  myPetsPublished(pet) {
    const mypetsContainer = document.querySelector(".mypets-cards__container");

    const div = document.createElement("div");
    div.innerHTML = `
                    <div class="pet-card">
                        <img crossorigin="anonymous" src="${pet.imageDataURL}" class="pet-img">
                <div class="pet__card-content">
                <h3 class="pet__card-title">${pet.petName}</h3>
                <p class="pet__card-text">${pet.bio}</p>
                <a id="pet__${pet.id}" class="pet__card-link">Editar</a>
            </div>
            </div>

             
            
        `;
    mypetsContainer.appendChild(div);

    const editPet = document.getElementById(`pet__${pet.id}`);
    editPet.addEventListener("click", () => {
      const currentState = state.getState();

      currentState.pet.id = pet.id;
      currentState.pet.petName = pet.petName;
      currentState.pet.bio = pet.bio;
      currentState.pet.edit = true;
      state.setState(currentState);

      Router.go("/reportpet");
    });
  }

  noPetsPublished() {
    const div = document.createElement("div");
    const style = document.createElement("style");

    style.innerHTML = `
      .no-pets{
        display: flex;
        justify-content: center;
      }`;

    div.innerHTML = `
          <my-text variant="subtitle">No tienes mascotas reportadas</my-text>
        `;

    this.appendChild(div);
    this.appendChild(style);
  }

  render() {
    this.innerHTML = `
        <head-comp></head-comp>
        <my-text variant="main" >Mis mascotas publicadas</my-text>
        <div class="mypets-cards__container"></div>
        `;
  }
}
customElements.define("mypets-comp", LostPets);
