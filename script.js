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

let roundRobinResults = [];

if (itemValue !== null) {
  roundRobinResults = JSON.parse(itemValue);
}

const accounts = [account1, account2, account3, account4, account5];

const containerLogin = document.querySelector(".login");
const containerDashboard = document.querySelector(".dashboard");
const navBar = document.querySelector(".top-nav");
const dashboardTeamLogo = document.querySelector(".dashboard__team--logo");
const dashboardMatches = document.querySelector(".dashboard__matches");

const overlay = document.querySelector(".overlay");

const btnLogin = document.querySelector(".login__btn");
const btnCloseModal = document.querySelector(".close-modal");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPass = document.querySelector(".login__input--pin");

let currentAccount;
let curTeam;
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
    navBar.classList.remove("hidden");
    navBar.classList.add("visible");
    containerLogin.classList.remove("visible");
    containerLogin.classList.add("hidden");
    containerDashboard.classList.remove("hidden");
    containerDashboard.classList.add("visible");

    dashboardTeamLogo.src = currentAccount.logo;
    curTeam = currentAccount.team;

    for (let game of games) {
      if (game.includes(currentAccount.team)) {
        displayGames(currentAccount.team, game);
        displayForms();
      }
    }
    submitForms();
    console.log(roundRobinResults);
  }
});

const displayGames = function (key, game) {
  const opponent = game[game.findIndex((el) => el !== key)];
  const curGame = curTeam + opponent;
  // Check if the game combination already exists in roundRobinResults and is submitted
  const gameExistsAndSubmitted = roundRobinResults.some(
    (entry) => entry.team === curTeam && entry.opponent === opponent
  );
  console.log(gameExistsAndSubmitted);
  if (!gameExistsAndSubmitted) {
    const match = document.createElement("h1");
    match.dataset.curTeam = curTeam;
    match.dataset.opponent = opponent;
    match.dataset.curGame = curGame;
    match.textContent = `${curTeam} - ${opponent}`;
    match.className = "match";
    dashboardMatches.appendChild(match);

    const markup = `
                      <form class='spirit__form hidden' data-game=${curGame} data-team=${curTeam} data-opponent= ${match.dataset.opponent}>
                        <label for="${curTeam}-rules">Knowledge of the Rules</label>
                        <p id="score-${curTeam}-rules">2</p>
                        <input type="range" id="${curTeam}-rules" min="0" max="4" /> 
                        <label for="${curTeam}-contact">Fouls and Body Contact</label>
                        <p id="score-${curTeam}-contact">2</p>
                        <input type="range" id="${curTeam}-contact" min="0" max="4" />   
                        <label for="${curTeam}-fair-minddness">Fair-Mindeness</label>
                        <p id="score-${curTeam}-fair-minddness">2</p>
                        <input type="range" id="${curTeam}-fair-minddness" min="0" max="4" />
                        <label for="${curTeam}-self-control">Positive Attitude and Self Control</label>
                        <p id="score-${curTeam}-self-control">2</p>  
                        <input type="range" id="${curTeam}-self-control" min="0" max="4" />
                        <label for="${curTeam}-communication">Communications</label>
                        <p id="score-${curTeam}-communication">2</p>
                        <input type="range" id="${curTeam}-communication" min="0" max="4" />
                        <button class='submitBtn' type="submit">Submit</button>
                      </form>`;
    dashboardMatches.insertAdjacentHTML("beforeend", markup);
    // Event listeners to update <p> tags live
    document
      .getElementById(`${curTeam}-rules`)
      .addEventListener("input", () => {
        updateScore(`${curTeam}-rules`, `score-${curTeam}-rules`);
      });

    document
      .getElementById(`${curTeam}-contact`)
      .addEventListener("input", () => {
        updateScore(`${curTeam}-contact`, `score-${curTeam}-contact`);
      });

    document
      .getElementById(`${curTeam}-fair-minddness`)
      .addEventListener("input", () => {
        updateScore(
          `${curTeam}-fair-minddness`,
          `score-${curTeam}-fair-minddness`
        );
      });

    document
      .getElementById(`${curTeam}-self-control`)
      .addEventListener("input", () => {
        updateScore(`${curTeam}-self-control`, `score-${curTeam}-self-control`);
      });

    document
      .getElementById(`${curTeam}-communication`)
      .addEventListener("input", () => {
        updateScore(
          `${curTeam}-communication`,
          `score-${curTeam}-communication`
        );
      });
  }
};

// Define the named function for the click event
function handleClick(event) {
  const h1 = event.currentTarget; // Get the clicked h1 element
  const dataGame = h1.getAttribute("data-cur-game");
  toggleForms(dataGame);
}

function displayForms() {
  const h1Elements = document.querySelectorAll(".match");

  // Remove previous event listeners before adding new ones
  h1Elements.forEach((h1) => {
    h1.removeEventListener("click", handleClick); // Remove previous listener
    h1.addEventListener("click", handleClick); // Add new listener
  });
}
// Event listener for form submission
function submitForms() {
  const forms = document.querySelectorAll(".spirit__form");
  if (forms) {
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Access form data
        let rules = +document.getElementById(`${form.dataset.team}-rules`)
          .value;
        let contact = +document.getElementById(`${form.dataset.team}-contact`)
          .value;
        let fairMinddness = +document.getElementById(
          `${form.dataset.team}-fair-minddness`
        ).value;
        let selfControl = +document.getElementById(
          `${form.dataset.team}-self-control`
        ).value;
        let communication = +document.getElementById(
          `${form.dataset.team}-communication`
        ).value;

        const total =
          rules + contact + selfControl + fairMinddness + communication;

        const scores = {
          team: curTeam,
          opponent: form.dataset.opponent,
          rules,
          contact,
          fairMinddness,
          selfControl,
          communication,
          total,
        };
        // Check if the same team and opponent combination already exists in roundRobinResults
        const combinationExists = roundRobinResults.some(
          (entry) =>
            (entry.team === curTeam &&
              entry.opponent === form.dataset.opponent) ||
            (entry.team === form.dataset.opponent && entry.opponent === curTeam)
        );

        if (!combinationExists) {
          roundRobinResults.push(scores);
          localStorage.setItem(
            "roundRobinResults",
            JSON.stringify(roundRobinResults)
          );
        }

        form.remove();
        const matchingH1 = document.querySelector(
          `h1[data-cur-game="${form.dataset.game}"][data-cur-team="${curTeam}"][data-opponent="${form.dataset.opponent}"]`
        );

        if (matchingH1) {
          matchingH1.remove();
        }
      });
    });
    console.log(roundRobinResults);
    console.log(forms);
  }
}

function toggleForms(dataGame) {
  const forms = document.querySelectorAll(".spirit__form");
  if (forms) {
    forms.forEach((form) => {
      if (form.getAttribute("data-game") === dataGame) {
        form.classList.toggle("hidden");
      }
    });
  }
}

function updateScore(inputId, pId) {
  const inputElement = document.getElementById(inputId);
  const pElement = document.getElementById(pId);
  pElement.textContent = inputElement.value; // Update the <p> tag with the input value
}
