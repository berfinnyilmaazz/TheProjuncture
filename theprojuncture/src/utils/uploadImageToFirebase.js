import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * @param {File} file - Yüklenecek dosya
 * @param {string} folder - Klasör adı: "avatars" veya "projects"
 */
export const uploadImageToFirebase = async (file, folder = "projects") => {
  const imageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
