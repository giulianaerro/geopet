const imgLogo = require("../../img/imgLogo.png");

import { Dropzone } from "dropzone";
import { state } from "../../state";
import { Router } from "@vaadin/router";
import { mapAlgolia } from "../../../server/lib/algolia";

export class Reportpet extends HTMLElement {
  connectedCallback() {
    this.render();

    const currentState = state.getState();

    if (currentState.pet.edit == false) {
      this.createPets();
    } else {
      this.editPets();
    }
  }

  createPets() {
    const deleteButton: any = document.querySelector(".delete-button");
    deleteButton.style = "display:none";
    const textAwait: any = document.querySelector(".text-lost");
    textAwait.style = "display:none";

    const form = document.querySelector(".reportLostPet__form");

    let imageDataURL;

    const imageDrop = document.querySelector(".dropzone-photo");

    const myDropzone = new Dropzone(imageDrop, {
      url: "/falsa",
      autoProcessQueue: false,
      clickable: true,
      thumbnailWidth: 370,
      thumbnailHeight: 190,
      thumbnail: function (file, dataUrl) {
        // Display the image in your file.previewElement
        imageDrop.setAttribute("src", dataUrl);
      },
    });

    myDropzone.on("thumbnail", function (file) {
      imageDataURL = file.dataURL;
    });

    mapAlgolia().then(() => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const textAwait: any = document.querySelector(".text-lost");
        textAwait.style = "display:inherit";

        const currentState = state.getState();
        const target = e.target as any;
        const petName = target.petName.value;
        const bio = target.bio.value;
        const petLat = currentState.pet.petLat;
        const petLng = currentState.pet.petLng;
        const emailUser = currentState.user.email;
        state
          .createPetLost({
            petName,
            bio,
            imageDataURL,
            petLat,
            petLng,
            emailUser,
          })
          .then((res) => {
            if (res == true) {
              Router.go("/mylostpets");
            } else {
              window.alert("Su mascota no ha podido ser publicada");
            }
          });
      });
    });
  }
  editPets() {
    const currentState = state.getState();
    currentState.pet.edit = false;

    const deleteButton: any = document.querySelector(".delete-button");
    deleteButton.style = "display:inherit";

    //obitiene la info de la publicacion de la mascota
    const form: any = document.querySelector(".reportLostPet__form");
    form.petName.value = currentState.pet.petName;
    form.bio.value = currentState.pet.bio;

    let imageDataURL;

    const imageDrop = document.querySelector(".dropzone-photo");

    const myDropzone = new Dropzone(imageDrop, {
      url: "/falsa",
      autoProcessQueue: false,
      clickable: true,
      thumbnailWidth: 370,
      thumbnailHeight: 190,
      thumbnail: function (file, dataUrl) {
        // Display the image in your file.previewElement
        imageDrop.setAttribute("src", dataUrl);
      },
    });

    myDropzone.on("thumbnail", function (file) {
      imageDataURL = file.dataURL;
    });

    mapAlgolia().then(() => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentState = state.getState();
        currentState.pet.id;
        const target = e.target as any;
        const petName = target.petName.value;
        const bio = target.bio.value;
        const petLat = currentState.pet.petLat;
        const petLng = currentState.pet.petLng;
        currentState.pet.id;
        state.editPetReport(currentState.pet.id, {
          petName,
          bio,
          imageDataURL,
          petLat,
          petLng,
        });
      });
    });

    //si aprieto guardar edita la publicacion de la mascota
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      Router.go("/");
    });

    //si aprieto el boton eliminar, borra la publicacion de la mascota.
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      state.deletePetReport({ id: currentState.pet.id }).then(() => {
        Router.go("/mylostpets");
      });
    });
  }

  render() {
    const style = document.createElement("style");
    style.innerHTML = ` 
      .reportLostPet__form{
        color: black;
        display: flex;
        flex-direction: column;
        padding: 10px 35px;
       font-family: "poppins";
        align-items: center;
      }

   
      .report__input{
        border-radius: 10px;
              width: 100%;
              max-width: 400px;
              padding: 13px 25px;
              color: black;
              font-size: 18px;
              cursor: pointer;
              font-family: "Poppins", sans-serif;
              margin-bottom: 50px;
      }

      .report__textarea{
        border-radius: 10px;
        border:solid 2px;
              width: 100%;
              max-width: 400px;
              height: 100px;
              padding: 13px 25px;
              color: black;
              font-size: 18px;
              cursor: pointer;
              font-family: "Poppins", sans-serif;
              margin-bottom: 50px;
      }
      .dropzone__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

      }
    
      .dropzone-photo{
        border: solid 1px;
        border-radius: 10px;
        width: 370px;
        height: 180px;
        margin-bottom: 50px;
      }
      .input__container{
        display: flex;
        flex-direction: column;
      }
      .ubicacion__container {
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        width:100%;
        max-width:600px;
      }
      #map {
        
          height:300px;
          background-color:black;
          border-radius:2px;
          margin:20px 0;
          border:solid 1px;
          margin-bottom: 80px;
        
      }
      .mapbox{
        display: flex;
        width:100%;
        max-width:600px;
      }
      .publish-pets__container-buttons{
        width: 250px;
      text-align:center;
      }
      
      .ubic__search-button {
        background-color: #5064A6;
        border: 5px solid #152B73;
        border-radius: 10px;
        padding: 8px 10px;
        color: #fff;
        height: fit-content;
        font-size: 18px;
        cursor: pointer;
        font-family: "Poppins", sans-serif;
        margin-left: 15px;
      }
      .container__report{
        display:flex;
        
      }
      .delete-button{
        background-color: #5064A6;
        border: 5px solid #152B73;
        border-radius: 10px;
        width: 100%;
        max-width: 250px;
        padding: 8px 10px;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        font-family: "Poppins", sans-serif;
        margin-bottom: 15px;
        
      }
      
      
      `;

    this.innerHTML = `
    
    <head-comp></head-comp>  
    <form class="reportLostPet__form">
    <my-text variant="main" >Reportar mi mascota perdida</my-text>
    <div class="input__container">
    <div>
    <label>NOMBRE DE LA MASCOTA </label><br>
    <input class="report__input" type="text" name="petName" required>
    </div>
    
    <div>
   <label>BIO </label><br>
   <textarea class="report__textarea" name="bio" required></textarea>
  </div>
</div>
<h2>Subi una foto de tu mascota:</h2>
      <div class="dropzone__container">
        <img src="${imgLogo}" class="dropzone-photo">
      </div>
      <div class="ubicacion__container">
        <div>
         <my-text variant="subtitle">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</my-text>
          </div>
          <div id="map" class="mapbox"></div>
          </div>  
    <div class="input__container">
          <div>
    <label>DONDE SE PERDIÓ?</label><br>
    <div class="container__report">
    <input id="ubicacion" class="report__input" type="text" name="petUbication" required>
    <div class="ubic__search-button">Buscar</div>
   </div>
   </div>

   </div>  
   <my-text class="text-lost" variant="subtitle">Espere unos segundos mientras publicamos su mascota</my-text>
   <div class="publish-pets__container-buttons">
   <button class="boton-rojo button-publish-lost-pet">Guardar</button>
   <button class="delete-button">Eliminar</button>
 </div>
     </form>
    `;

    this.appendChild(style);
  }
}
customElements.define("petlost-comp", Reportpet);
