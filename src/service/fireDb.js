import {
  push,
  ref,
  set,
  child,
  get,
  limitToLast,
  onValue,
  orderByChild,
  query,
} from "@firebase/database";
import { addDoc, collection, Timestamp } from "@firebase/firestore";
import { authService, dbService, realtimeDbService } from "../firebase_config";

export async function sendChatMessage(cryptoId, message) {
  const locate = ref(realtimeDbService, `chat/${cryptoId}/`);
  push(locate, {
    uid: authService.currentUser.uid,
    name: authService.currentUser.displayName,
    message,
    createdAt: Timestamp.fromDate(new Date()),
  });
}

export async function getChatMessages(cryptoId, callBack) {
  const chatRef = query(
    ref(realtimeDbService, `chat/${cryptoId}/`),
    orderByChild("createdAt"),
    limitToLast(50)
  );
  onValue(chatRef, (snapshot) => {
    callBack(snapshot.val());
  });
}

// export async function sendChatMessage(cryptoId, message) {
//   await addDoc(collection(dbService, cryptoId), {
//     uid: authService.currentUser.uid,
//     name: authService.currentUser.displayName,
//     message,
//     createdAt: Timestamp.fromDate(new Date()),
//   });
// }

// const q = query(
//   collection(getFirestore(), data.id),
//   // where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
//   orderBy("createdAt")
// );
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const newArray = querySnapshot.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//     };
//   });
//   // setTweets(newArray);
//   console.log("new Chat", newArray);
// });

// return () => {
//   unsubscribe();
// };
