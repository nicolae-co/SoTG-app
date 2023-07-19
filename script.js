"use strict";
/*

ENDZONE
user=za54%N!C
pass=*-5&9^@z

TUF
user=PDnDu_R2
pass=t4nCpXCG

JETS
user=CHZL@utp
pass=pHxz5bwd

NUF
user=qno76*xR
pass=6F9Eo9N9
*/

const account1 = {
  team: "Endzone",
  username: "a",
  password: "a",
  logo: "./assets/logoEndzone.svg",
};

const account2 = {
  team: "TUF",
  username: "b",
  password: "b",
  logo: "./assets/logoTuf.png",
};

const account3 = {
  team: "Jets",
  username: "c",
  password: "c",
  logo: "./assets/logoJets.png",
};

const account4 = {
  team: "NUF",
  username: "d",
  password: "d",
  logo: "./assets/logoNuf.png",
};

const account5 = {
  team: "CatchIt",
  username: "e",
  password: "e",
  logo: "./assets/logoTurneu.png",
};

const itemValue = localStorage.getItem("roundRobinResults");

let roundRobinResults;

if (itemValue !== null) {
  // Item exists in local storage
  roundRobinResults = itemValue;
  console.log(roundRobinResults);
} else {
  // Item does not exist in local storage
  roundRobinResults = {
    Endzone: {
      TUF: { submited: false },
      NUF: { submited: false },
      Jets: { submited: false },
      CatchIt: { submited: false },
    },
    TUF: {
      Endzone: { submited: false },
      NUF: { submited: false },
      Jets: { submited: false },
      CatchIt: { submited: false },
    },
    NUF: {
      TUF: { submited: false },
      Endzone: { submited: false },
      Jets: { submited: false },
      CatchIt: { submited: false },
    },
    Jets: {
      TUF: { submited: false },
      NUF: { submited: false },
      Endzone: { submited: false },
      CatchIt: { submited: false },
    },
    CatchIt: {
      TUF: { submited: false },
      NUF: { submited: false },
      Jets: { submited: false },
      Endzone: { submited: false },
    },
  };
  console.log(roundRobinResults);
}

const accounts = [account1, account2, account3, account4, account5];

const containerLogin = document.querySelector(".login");
const containerDashboard = document.querySelector(".dashboard");
const dashboardTeamLogo = document.querySelector(".dashboard__team--logo");
const dashboardMatches = document.querySelector(".dashboard__matches");

const overlay = document.querySelector(".overlay");

const btnLogin = document.querySelector(".login__btn");
const btnCloseModal = document.querySelector(".close-modal");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPass = document.querySelector(".login__input--pin");

let currentAccount;
const games = [];
for (let i = 0; i < accounts.length; i++) {
  const team1 = accounts[i].team;

  // Iterate over the remaining objects to create combinations
  for (let j = i + 1; j < accounts.length; j++) {
    const team2 = accounts[j].team;

    // Create a new object with the combination and add it to the new array
    const combination = [team1, team2];
    games.push(combination);
  }
}

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.password === inputLoginPass.value) {
    containerLogin.classList.remove("visible");
    containerLogin.classList.add("hidden");
    containerDashboard.classList.remove("hidden");
    containerDashboard.classList.add("visible");

    dashboardTeamLogo.src = currentAccount.logo;
  }

  displayGames(currentAccount.team);
});

const displayGames = function (key) {
  for (let game of games) {
    if (game.includes(key)) {
      const match = document.createElement("h1");
      match.dataset.game = `${game[0]}-${game[1]}`;
      match.dataset.opponent = `${game[game.findIndex((el) => el !== key)]}`;
      match.textContent = `${game[0]} - ${game[1]}`;
      match.className = "match";
      dashboardMatches.appendChild(match);

      const markup = `
                      <form class='spirit__form hidden' data-game=${match.dataset.game} data-opponent= ${match.dataset.opponent}>
                        <label for="${match.dataset.game}-rules">Knowledge of the Rules</label>
                        <p id="score">2</p>
                        <input type="range" id="${match.dataset.game}-rules" min="0" max="4" /> 
                        <label for="${match.dataset.game}-contact">Fouls and Body Contact</label>
                        <input type="range" id="${match.dataset.game}-contact" min="0" max="4" />   
                        <label for="${match.dataset.game}-fair-minddness">Fair-Mindeness</label>
                        <input type="range" id="${match.dataset.game}-fair-minddness" min="0" max="4" />
                        <label for="${match.dataset.game}-self-control">Positive Attitude and Self Control</label>  
                        <input type="range" id="${match.dataset.game}-self-control" min="0" max="4" />
                        <label for="${match.dataset.game}-communication">Communications</label>
                        <input type="range" id="${match.dataset.game}-communication" min="0" max="4" />
                        <button type="submit">Submit</button>
                      </form>`;
      dashboardMatches.insertAdjacentHTML("beforeend", markup);
    }
  }
  function toggleForms(dataGame) {
    const forms = document.querySelectorAll(".spirit__form");
    forms.forEach((form) => {
      if (form.getAttribute("data-game") === dataGame) {
        form.classList.toggle("hidden");
      }
    });
  }

  // Event listener for each h1 element
  const h1Elements = document.querySelectorAll(".match");
  h1Elements.forEach((h1) => {
    h1.addEventListener("click", () => {
      const dataGame = h1.getAttribute("data-game");
      toggleForms(dataGame);
    });
  });

  // Event listener for form submission
  const forms = document.querySelectorAll(".spirit__form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // Access form data
      let rules = document.getElementById(`${form.dataset.game}-rules`).value;
      let contact = document.getElementById(
        `${form.dataset.game}-contact`
      ).value;
      let fairMinddness = document.getElementById(
        `${form.dataset.game}-fair-minddness`
      ).value;
      let selfControl = document.getElementById(
        `${form.dataset.game}-self-control`
      ).value;
      let communication = document.getElementById(
        `${form.dataset.game}-communication`
      ).value;

      for (let key in roundRobinResults) {
        if (key === currentAccount.team) {
          console.log("test");
          console.log(key);
          for (let opp in roundRobinResults[key]) {
            console.log(!roundRobinResults[key][opp].submited);
            if (
              opp === form.dataset.opponent &&
              !roundRobinResults[key][opp].submited
            ) {
              roundRobinResults[key][opp].submited = true;
              console.log(!roundRobinResults[key][opp].submited);
              roundRobinResults[key][opp].scores = {
                rules: rules,
                contact: contact,
                fairMinddness: fairMinddness,
                selfControl: selfControl,
                communication: communication,
              };
            }
          }
        }
      }

      // Clear form fields (optional)
      const roundRobinResultsJSON = JSON.stringify(roundRobinResults);

      localStorage.setItem("roundRobinResults", roundRobinResultsJSON);
      console.log(roundRobinResults);
      form.reset();
    });
  });
};
