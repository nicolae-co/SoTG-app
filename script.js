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
  games: {
    account2: "",
    account3: "",
    account4: "",
  },
};

const account2 = {
  team: "TUF",
  username: "b",
  password: "b",
  logo: "./assets/logoTuf.png",
  games: {
    account1: "",
    account3: "",
    account4: "",
  },
};

const account3 = {
  team: "Jets",
  username: "c",
  password: "c",
  logo: "./assets/logoJets.png",
  games: {
    account1: "",
    account2: "",
    account4: "",
  },
};

const account4 = {
  team: "NUF",
  username: "d",
  password: "d",
  logo: "./assets/logoNuf.png",
  games: {
    account1: "",
    account2: "",
    account3: "",
  },
};

const accounts = [account1, account2, account3, account4];

const containerLogin = document.querySelector(".login");
const containerDashboard = document.querySelector(".dashboard");
const dashboardTeamLogo = document.querySelector(".dashboard__team--logo");
const dashboardMatches = document.querySelector(".dashboard__matches");

const modal = document.querySelector(".form__modal");
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
    const combination = {
      [team1]: {
        [team2]: "",
      },
      [team2]: { [team1]: "" },
    };
    games.push(combination);
  }
}

dashboardMatches.addEventListener("click", function (e) {
  const clicked = e.target.closest(".match");
  console.log(clicked.dataset.team1);
  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  if (clicked) {
    openModal();
    console.log(currentAccount);
    updateFormModal();
  }
  const rangeInput = document.getElementById("rules");
  const displayValue = document.getElementById("score");

  rangeInput.addEventListener("input", (event) => {
    const currentValue = event.target.value;
    displayValue.innerHTML = currentValue;
  });

  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});

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

  displayGames(currentAccount, currentAccount.team);
  console.log(games);
});

const displayGames = function (key) {
  for (let game of games) {
    if (game.hasOwnProperty(key.team)) {
      console.log("test");
      const match = document.createElement("h1");
      match.dataset.team1 = Object.keys(game)[0];
      match.dataset.team2 = Object.keys(game)[1];
      match.className = "match";
      match.textContent = `${Object.keys(game)[0]} - ${Object.keys(game)[1]}`;
      dashboardMatches.appendChild(match);
    }
  }
};

const updateFormModal = function () {
  const markup = `

  <form id="form">
                    <label for="rules">Knowledge of the Rules</label>
                    <p id="score">2</p>
                    <input type="range" id="rules" min="0" max="4" />
                    <label for="contact">Fouls and Body Contact</label>
                    <input type="range" id="contact" min="0" max="4" />
                    <label for="fair-minddness">Fair-Mindeness</label>
                    <input type="range" id="fair-minddness" min="0" max="4" />
                    <label for="self-control">Positive Attitude and Self Control</label>
                    <input type="range" id="self-control" min="0" max="4" />
                    <label for="communication">Communications</label>
                    <input type="range" id="communication" min="0" max="4" />
                  </form>`;
  modal.insertAdjacentHTML("afterbegin", markup);
};

function filterByKeys(data, key1, key2) {
  const matchingPairs = [];

  for (const [index, obj] of Object.entries(data)) {
    if (obj.hasOwnProperty(key1) && obj.hasOwnProperty(key2)) {
      matchingPairs.push({ [index]: obj });
    }
  }

  console.log(matchingPairs);
}
