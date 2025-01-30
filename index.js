//state object
const state = {
  puppyPlayers: [],
  puppyDetails: []
}

const main = document.querySelector(`main`);

//function to get puppies.
const getPuppies = async () => {
  const puppiesGet = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-ft/players`);
  const puppyObjects = await puppiesGet.json();
  state.puppyPlayers = puppyObjects.data.players;
  renderRoster();
}

const renderRoster = () => {
  main.innerHTML = ``;

  const h1 = document.createElement(`h1`);

  h1.innerText = `Roster:`;

  main.append(h1);

  state.puppyPlayers.forEach((player) => {
    const h4 = document.createElement(`h4`);
    const liID = document.createElement(`li`);
    const liTeamID = document.createElement(`li`);
    
    liID.innerText = `Player ID: ${player.id}`;
    liTeamID.innerText = `Team ID: ${player.teamId}`;
    h4.innerHTML = `<h4>${player.name}</h4>`;
    
    h4.append(liID);
    h4.append(liTeamID);
    main.append(h4);

    h4.addEventListener(`click`, () => {
      state.puppyDetails = player;
      renderPuppyDetails();
    })
  })
}


const renderPuppyDetails = () => {
  main.innerHTML = ``;

  const h1 = document.createElement(`h1`);
  const liBreed = document.createElement(`li`);
  const liCohortId = document.createElement(`li`);
  const liCreatedAt = document.createElement(`li`);
  const liId = document.createElement(`li`);
  const imgImageUrl = document.createElement(`p`);
  const liStatus = document.createElement(`li`);
  const liteamId = document.createElement(`li`);
  const liUpdatedAt = document.createElement(`li`);
  const backButton = document.createElement(`button`);

  h1.innerText = `Name: ${state.puppyDetails.name}`;
  imgImageUrl.innerHTML = `<img alt ="photo of ${state.puppyDetails.name}" src=${state.puppyDetails.imageUrl} height=900x width=700px </img>`;
  liBreed.innerText = `Breed: ${state.puppyDetails.breed}`;
  liCohortId.innerText = `Cohort ID: ${state.puppyDetails.cohortId}`;
  liId.innerText = `ID: ${state.puppyDetails.id}`;
  liStatus.innerText = `Status: ${state.puppyDetails.status}`;
  liCreatedAt.innerText = `Created on : ${state.puppyDetails.createdAt}`
  liteamId.innerText = `Team ID: ${state.puppyDetails.teamId}`;
  liUpdatedAt.innerText = `Updated At: ${state.puppyDetails.updatedAt};`
  backButton.innerText = `Back To Roster`;

  main.append(h1);
  main.append(imgImageUrl);
  main.append(liBreed);
  main.append(liId);
  main.append(liCohortId);
  main.append(liStatus);
  main.append(liteamId);
  main.append(liCreatedAt);
  main.append(liUpdatedAt);
  main.append(backButton);

  backButton.addEventListener(`click`, () => {
    renderRoster();
  })
}
getPuppies();