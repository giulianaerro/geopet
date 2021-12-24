import { state } from "../../state";

class PetCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  noPetsAround() {
    const div = document.createElement("div");
    const style = document.createElement("style");

    style.innerHTML = `
      .no-pets{
        display: flex;
        justify-content: center;
      }`;

    div.innerHTML = `
          <my-text variant="subtitle">No encontramos mascotas cerca de tu ubicación</my-text>
        `;

    this.appendChild(div);
    this.appendChild(style);
  }

  render() {
    state.petsAround().then((pets) => {
      if (pets.length == 0) {
        this.noPetsAround();
      }

      for (const pet of pets) {
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="pet-card">

                        <img crossorigin="anonymous" src="${pet.imageDataURL}" class="pet-img">
                <div class="pet__card-content">
                <h3 class="pet__card-title">${pet.petName}</h3>
                <p class="pet__card-text">${pet.bio}</p>
                <a id="pet__${pet.objectID}" class="pet__card-link">Reportar</a>
            </div>
            </div>
            
       
          <div id="modal_container" class="modal-container">
            <div class="modal">
            <my-text  variant="title"> Reportar info </my-text>

              <form class="reportPettt__form">
              <div>
              <label>TU NOMBRE</label><br>
              <input class="report__input" type="text" name="name" required>
              </div>
              <div>
              <label>TU TÉLEFONO</label><br>
              <input class="report__input" type="text" name="telefono" required>
              </div>
              <div>
            <label>DONDE LO VISTE?</label><br>
            <textarea class="report__textarea" name="info" required></textarea>
            </div>
            <button class="send-report-button">Enviar Reporte</button>
            </form>
            <button class="close-button" id="close">Cerrar</button>
            </div>
          </div>
            
            `;

        this.appendChild(div);

        const editPet = document.getElementById(`pet__${pet.objectID}`);
        const modal_container = document.getElementById("modal_container");
        const close = document.getElementById("close");

        editPet.addEventListener("click", () => {
          modal_container.classList.add("show");
          currentState.report.userId = pet.UserId;
          currentState.report.petName = pet.petName;
          currentState.report.emailUser = pet.emailUser;
        });

        close.addEventListener("click", () => {
          modal_container.classList.remove("show");
        });
      }

      const form = document.querySelector(".reportPettt__form");
      const currentState = state.getState();
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const target = e.target as any;
        const name = target.name.value;
        const telReporter = target.telefono.value;
        const infoPet = target.info.value;
        const petName = currentState.report.petName;
        const emailUser = currentState.report.emailUser;

        const nameReporter = (currentState.report.nameReporter = name);
        const tel = (currentState.report.tel = telReporter);
        const petInfo = (currentState.report.petInfo = infoPet);
        state.sendReport({
          petName,
          nameReporter,
          tel,
          petInfo,
          emailUser,
        });
      });
    });
  }
}
customElements.define("card-comp", PetCard);
