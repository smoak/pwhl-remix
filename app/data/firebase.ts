import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBVn0Gr6zIFtba-hQy3StkifD8bb7Hi68A",
  databaseURL: "leaguestat-b9523.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
