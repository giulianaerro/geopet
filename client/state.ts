import { Router } from "@vaadin/router";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const state = {
  data: {
    user: {
      userLat: "",
      userLng: "",
      email: "",
      fullName: "",
      token: "",
    },
    pet: {
      id: "",
      petName: "",
      bio: "",
      imageDataURL: "",
      petLat: "",
      petLng: "",
      edit: false,
    },
    report: {
      emailUser: "",
      petName: "",
      nameReporter: "",
      petInfo: "",
      tel: "",
    },
  },
  listeners: [],
  init() {
    const localState = localStorage.getItem("state");
    if (localState) {
      state.setState(JSON.parse(localState));
    }
  },

  getState() {
    return this.data;
  },

  async authUser(email: string) {
    const authUserRes = await fetch(
      API_BASE_URL + "/user/exist?email=" + email
    );
    const resAuth = await authUserRes.json();

    const currentState = this.getState();
    currentState.user.email = email;
    this.setState(currentState);

    return resAuth;
  },

  async signIn(email: string, password: string) {
    const signInRes = await fetch(API_BASE_URL + "/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resSignIn = await signInRes.json();
    const currentState = this.getState();
    currentState.user.token = resSignIn.token;
    this.saveToken(currentState);
    this.setState(currentState);

    return resSignIn;
  },

  async signUp(email: string, fullName: string, password: string) {
    const signUpRes = await fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullName,
        password,
      }),
    });
    const resSignUp = await signUpRes.json();
    const currentState = this.getState();
    currentState.user.fullName = fullName;
    this.setState(currentState);
  },

  async myInfo() {
    const currentState = this.getState();
    const myInfoRes = await fetch(API_BASE_URL + "/me", {
      headers: {
        Authorization: "bearer " + currentState.user.token,
      },
    });
    const resMyInfo = await myInfoRes.json();
    currentState.user.fullName = resMyInfo.fullName;
    return resMyInfo;
  },

  async editMyInfo(fullName, password) {
    const currentState = this.getState();
    const editMyInfoRes = await fetch(API_BASE_URL + "/me/edit", {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + currentState.user.token,
      },
      body: JSON.stringify({
        fullName,
        password,
      }),
    });
    const resEditMyInfo = await editMyInfoRes.json();
    currentState.user.fullName = resEditMyInfo.fullName;

    return resEditMyInfo;
  },

  async petsAround() {
    const currentState = this.getState();
    const petsAroundRes = await fetch(
      API_BASE_URL +
        "/pets?userLat=" +
        currentState.user.userLat +
        "&userLng=" +
        currentState.user.userLng,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const resPetsAround = await petsAroundRes.json();
    return resPetsAround;
  },

  async createPetLost(data) {
    const currentState = state.getState();

    const createPetLostRes = await fetch(API_BASE_URL + "/pet/lost", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + currentState.user.token,
      },
      body: JSON.stringify(data),
    });
    const resCreatePetLost = await createPetLostRes.json();

    return resCreatePetLost;
  },

  async getMyPets() {
    const currentState = state.getState();
    const myPetsRes = await fetch(API_BASE_URL + "/me/pets", {
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + currentState.user.token,
      },
    });

    const resMyPets = await myPetsRes.json();
    return resMyPets;
  },

  async editPetReport(id, data) {
    const currentState = state.getState();

    const editPetReport = await fetch(API_BASE_URL + "/pets/edit/" + id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + currentState.user.token,
      },
      body: JSON.stringify(data),
    });

    const resEditPetReport = await editPetReport.json();

    if (resEditPetReport == true) {
      window.alert("Su mascota fue modificada");
    } else {
      window.alert("No pudimos modificar su mascota");
    }
  },

  async deletePetReport(petId) {
    const currentState = state.getState();

    const deletPetRes = await fetch(API_BASE_URL + "/pet/delete", {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + currentState.user.token,
      },
      body: JSON.stringify(petId),
    });
    const resDeletPet = await deletPetRes;
    return resDeletPet;
  },
  async sendReport(data) {
    const sendReportRes = await fetch(API_BASE_URL + "/pet/report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resSendReport = await sendReportRes.json();

    if (resSendReport == true) {
      window.alert("Su reporte ha sido enviado");
      location.reload();
    } else {
      window.alert("No pudimos enviar tu reporte");
    }
  },

  saveToken(state) {
    localStorage.setItem("state", JSON.stringify(state));
  },
  cerrarSesion() {
    this.data.user.token = "";
    localStorage.removeItem("state");
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }

    localStorage.setItem("save-state", JSON.stringify(newState));
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };
