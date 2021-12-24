import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";
import { Pet, User } from "../models";

export async function createPetLost(UserId, body) {
  const { petName, bio, imageDataURL, petLat, petLng, emailUser } = body;

  const imagen = await cloudinary.uploader.upload(imageDataURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });

  const user = await User.findByPk(UserId);

  if (user) {
    const lostPet = await Pet.create({
      petName,
      bio,
      imageDataURL: imagen.secure_url,
      petLat,
      petLng,
      emailUser,
      UserId,
    });

    await index.saveObject({
      objectID: lostPet.get("id"),
      petName: lostPet.get("petName"),
      bio: lostPet.get("bio"),
      imageDataURL: lostPet.get("imageDataURL"),
      _geoloc: {
        lat: lostPet.get("petLat"),
        lng: lostPet.get("petLng"),
      },
      emailUser: lostPet.get("emailUser"),
      UserId,
    });
    return true;
  } else {
    return false;
  }
}

export async function petsAround(lat, lng) {
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 500000,
  });
  return hits;
}

export async function myLostPets(UserId) {
  const myPets = await Pet.findAll({ where: { UserId } });

  return myPets;
}

export async function editMyPet(id, body) {
  const { petName, bio, imageDataURL, petLat, petLng } = body;

  const imagen = await cloudinary.uploader.upload(imageDataURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });

  const editPet = await Pet.update(
    {
      petName,
      bio,
      imageDataURL: imagen.url,
      petLat,
      petLng,
    },
    { where: { id: id } }
  );

  return editPet;
}

export async function deletedLostPet(id) {
  await Pet.destroy({ where: { id } });
  await index.deleteObject(id);
  return true;
}
