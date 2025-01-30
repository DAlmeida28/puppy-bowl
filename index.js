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
  const createNewBtn = document.createElement(`button`);
  
  h1.innerText = `Roster:`;
  createNewBtn.innerText = `Create new player`;

  main.append(h1);
  main.append(createNewBtn);

  createNewBtn.addEventListener(`click`, () => {
    renderNewPlayer();
  })

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

const renderNewPlayer = () => {
  main.innerHTML = ``;

  const formHTML = `Puppy Name: <input id="PlayerName"></input>
                    Puppy Breed: <input id="PuppyBreed"></input>
                    Status: <input type="radio" id="field" name="status" value="field"/> 
                    <label for="field">Field</label>
                    <input type="radio" id="bench" name="status" value="bench"/>
                    <label for="bench">Bench</label>
                    `

  h1 = document.createElement(`h1`);
  submissionForm = document.createElement(`form`);
  submitButton = document.createElement(`button`);
  backButton = document.createElement(`button`);

  h1.innerText = `Player Submission`;
  submitButton.innerText = `Submit`;
  backButton.innerText = `Back to Roster`;

  main.append(h1);
  main.append(submissionForm);
  submissionForm.innerHTML = formHTML;
  main.append(submitButton)
  main.append(backButton);

  backButton.addEventListener(`click`, () => {
    renderRoster();
  })

  submitButton.addEventListener(`click`, () => {
    submitNewPlayer();
  })
}

const submitNewPlayer = async () => {
  const submitPuppy = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-ft-helpdesk/players`,
    {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${document.querySelector(`#PlayerName`).value}`,
        breed: `${document.querySelector(`#PuppyBreed`).value}`,
      }),
    }
  );
  const result = await submitPuppy.json();
  console.log(result);
  

}
  // console.log(`${document.querySelector(`#PlayerName`).value}`);
  // console.log(`new player test`);

getPuppies();