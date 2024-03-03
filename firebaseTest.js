const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  child,
  orderByChild,
  equalTo,
  query,
  onChildAdded,
  onChildChanged,
  onValue,
} = require("firebase/database");

const firebaseUrl = "leaguestat-b9523.firebaseio.com";
const firebaseToken = "uwM69pPkdUhb0UuVAxM8IcA6pBAzATAxOc8979oJ";
const apiKey = "AIzaSyBVn0Gr6zIFtba-hQy3StkifD8bb7Hi68A";

const firebaseConfig = {
  apiKey,
  databaseURL: firebaseUrl,
};

// var todaysDate = new Date();
// var getYear = todaysDate.getFullYear();
// var theMonth = todaysDate.getMonth() + 1;
// var getMonth = theMonth < 10 ? "0" + theMonth.toString() : theMonth.toString();
// var getDay =
//   todaysDate.getDate() < 10
//     ? "0" + todaysDate.getDate().toString()
//     : todaysDate.getDate().toString();
// var subscribeDate = getYear + "-" + getMonth + "-" + getDay;
// console.log("subscribing to", { subscribeDate });

const app = initializeApp(firebaseConfig);

// console.log(app);
const db = getDatabase(app);
const dbRef = ref(db);

// const fbPubClockRef = child(dbRef, "/svf/ahl/publishedclock/1/games/");
// const fbRunningClocksRef = child(dbRef, "/svf/ahl/runningclock/games/");
// const fbGoalSummary = child(dbRef, "/svf/ahl/goalssummary/1/games/");

// const fbPubClockUpdate = (snapshot) => {
//   console.log("got snapshot update", snapshot.toJSON());
// };

// onValue(
//   query(fbGoalSummary, equalTo(subscribeDate), orderByChild("DatePlayed")),
//   (snapshot) => {
//     // console.log('got goal summary value', snapshot.toJSON());
//     // console.log(
//     //   Object.entries(snapshot.val()).flatMap(([k, v]) => v.PeriodsInfo)
//     // );
//   }
// );

/*

{
  goaliechanges: { '1': { games: [Object] } },
  goals: { '1': { games: [Object] } },
  goalssummary: { '1': { games: [Object] } },
  mvps: { '1': { games: [Object] } },
  penalties: { '1': { games: [Object] } },
  penaltiessummary: { '1': { games: [Object] } },
  publishedclock: { '1': { games: [Object] } },
  shotssummary: { '1': { games: [Object] } }
}
*/

// onValue(query(child(dbRef, "/svf/ahl")), (snapshot) => {
//   console.log(snapshot.toJSON());
// })

// /svf/ahl/goals/1/games/{gameId}
// onValue(query(child(dbRef, "/svf/ahl/goals/1/games/1025162")), (snapshot) => {
//   console.log(snapshot.toJSON().GameGoals);
// });

// /svf/ahl/goalssummary/1/games/{gameId}
// onValue(
//   query(child(dbRef, "/svf/ahl/shotssummary/1/games/1025169")),
//   (snapshot) => {
//     console.log(snapshot.toJSON());
//   }
// );

/*


{
  DatePlayed: '2023-06-01',
  GameGoalieChanges: {
    '0': {
      InGoalie: [Object],
      IsHome: false,
      OutGoalie: [Object],
      Period: 0,
      PeriodLongName: '1st',
      PeriodShortName: '1',
      Time: '0:00'
    },
    '1': {
      InGoalie: [Object],
      IsHome: false,
      OutGoalie: [Object],
      Period: 0,
      PeriodLongName: '3rd',
      PeriodShortName: '3',
      Time: '17:18'
    },
    '2': {
      InGoalie: [Object],
      IsHome: true,
      OutGoalie: [Object],
      Period: 0,
      PeriodLongName: '1st',
      PeriodShortName: '1',
      Time: '0:00'
    }
  }
}



*/

const logSnapshot = (snapshot) => {
  console.log(snapshot.toJSON());
};

// onValue(query(child(dbRef, "/svf/pwhl/runningclock/games/16")), (snapshot) => {
//   console.log("[runningclock]", snapshot.toJSON());
// });
onValue(
  query(child(dbRef, "/svf/pwhl/publishedclock/1/games/16")),
  (snapshot) => {
    console.log("[publishedclock]", snapshot.toJSON());
  }
);
// onValue(query(child(dbRef, "/svf/pwhl/goals/1/games/16")), logSnapshot);
// onValue(query(child(dbRef, "/svf/pwhl/goalssummary/1/games/16")), logSnapshot);
// onValue(
//   query(child(dbRef, "/svf/pwhl/penaltiessummary/1/games/16")),
//   (snapshot) => {
//     console.log("[penaltiessummary]", snapshot.toJSON());
//   }
// );

// game penalty summary
// "/svf/" + clientCode + "/penaltiessummary/" + langId + "/games/" + gameId)
// var handleGamePenaltySummawyUpdate = function(snapshot) {
//       // Get clientCode, langId and gameId
//       var snapshotUrl = snapshot.ref.toString();
//       var splitUrl = snapshotUrl.split("/");

//       var gameId = parseInt(splitUrl[splitUrl.length - 1]);
//       var langId = parseInt(splitUrl[splitUrl.length - 3]);
//       var clientCode = splitUrl[splitUrl.length - 5];

//       var gameUid = createGameUid(clientCode, gameId, langId);

//       gamePenaltySummaryCallbacks[gameUid].penaltySummaryData = snapshot.val();

//       notifyGamePenaltySummaryListeners(gameUid);
//   };
