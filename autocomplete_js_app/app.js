const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//Search states.json and fliter it
const searchStates = async searchText => {
  const res = await fetch("/data/states.json");
  const states = await res.json();
  //console.log(states)
  //Get matches to current text input
  // TIPS => gi means global and NOT case sensitive
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  //console.log(matches);
  outputHtml(matches);
};

//Show results in HTML

// TIPS => map return an array of html string , and then we join() it to get valid html output
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        
        <div class="card card-body mb-1">
        <h4> ${match.name}  (${match.abbr})  <span class="text-primary"> ${
          match.capital
        }</span>
        </h4>
        <small> Lat : ${match.lat}</small>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
