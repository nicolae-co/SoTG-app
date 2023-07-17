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

    displayGames(currentAccount);

    console.log(currentAccount);
  }
});

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

const displayGames = function (team) {
  for (let game of games) {
    if (game.includes(team.team)) {
      const match = document.createElement("h1");
      match.dataset.team1 = game[0];
      match.dataset.team2 = game[1];
      match.className = "match";
      match.textContent = `${game[0]} - ${game[1]}`;
      dashboardMatches.appendChild(match);
      console.log(dashboardMatches);
    }
  }
};

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
  }
  // for (let i = 0; i < btnsOpenModal.length; i++) {
  //   btnsOpenModal[i].addEventListener("click", openModal);
  // }

  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});
