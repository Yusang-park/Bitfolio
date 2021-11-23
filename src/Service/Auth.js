import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { authService } from "../firebase_config";

export async function registerWithEamil(email, password) {
  try {
    await createUserWithEmailAndPassword(authService, email, password).then(
      (e) => {}
    );
  } catch (e) {
    return e.message.replace("Firebase: Error ", "");
  }
}

export async function loginWithEamil(email, password) {
  try {
    await signInWithEmailAndPassword(authService, email, password);
  } catch (e) {
    return e.message.replace("Firebase: Error ", "");
  }
}

export async function loginWithSocial(provider) {
  if (provider === "google") {
    try {
      const provider = new GoogleAuthProvider();
      await new signInWithRedirect(authService, provider);
      const result = await getRedirectResult(authService);
      if (result) {
        // const user = result.user;
        // const credential = provider.credentialFromResult(authService, result);
        // const token = credential.accessToken;
      }
      return;
    } catch (error) {
      return error;
    }
    // const operationType = result.operationType;
  } else if (provider === "github") {
    try {
      const provider = new GithubAuthProvider();

      await new signInWithRedirect(authService, provider);
      const result = await getRedirectResult(authService);
      if (result) {
        // const user = result.user;
        // const credential = provider.credentialFromResult(authService, result);
        // const token = credential.accessToken;
      }
      // const operationType = result.operationType;
      return;
    } catch (error) {
      return error;
    }
  }
}

export async function logout() {
  await signOut(authService);
  return;
}
