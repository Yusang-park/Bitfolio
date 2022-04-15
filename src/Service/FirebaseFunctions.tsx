import {
  push,
  ref,
  limitToLast,
  onValue,
  orderByChild,
  query,
  remove,
} from "@firebase/database";
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { authService, dbService, realtimeDbService } from "../firebase_config";

export async function sendChatMessage(
  cryptoId: string,
  message: string,
  tempNickname: string
) {
  const locate = ref(realtimeDbService, `chat/${cryptoId}/`);
  push(locate, {
    uid: authService.currentUser ? authService.currentUser.uid : -1,
    name: authService.currentUser
      ? authService.currentUser.displayName
      : tempNickname,
    message,
    createdAt: Timestamp.fromDate(new Date()),
  });
}

export async function getChatMessages(cryptoId: string, callBack: Function) {
  const chatRef = query(
    ref(realtimeDbService, `chat/${cryptoId}/`),
    orderByChild("createdAt"),
    limitToLast(50)
  );
  onValue(chatRef, (snapshot) => {
    callBack(snapshot.val());
  });
}

export async function delChatMessage(cryptoId: string, docKey: string) {
  remove(ref(realtimeDbService, `chat/${cryptoId}/${docKey}`));
}

export async function updateFavorites(
  cryptoId: string,
  fullNameEn: string,
  imageUrl: string,
  existed: boolean
) {
  if (authService.currentUser !== null) {
    const ref = doc(dbService, "User", authService.currentUser.uid);
    if (existed)
      setDoc(
        ref,
        { [cryptoId]: { imageUrl: imageUrl, fullName: fullNameEn } },
        { merge: true }
      );
    else updateDoc(ref, { [cryptoId]: deleteField() });
  }
}

export async function getFavorites() {
  if (authService.currentUser !== null) {
    const ref = doc(dbService, "User", authService.currentUser.uid);
    let res = await getDoc(ref);

    return res.data() ?? {};
  } else {
    alert("로그인 후 이용 가능합니다.");
    return {};
  }
}
