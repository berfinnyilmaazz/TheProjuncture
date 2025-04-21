// src/utils/uploadImageToFirebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImageToFirebase = async (file) => {
  const imageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
