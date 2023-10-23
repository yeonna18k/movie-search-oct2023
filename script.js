// TMDB
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTNkYjJhOTk4NmU3ZGNkMDc4NjU2YjBkMDEyZDlmYiIsInN1YiI6IjY1MmY2YjVkY2FlZjJkMDBmZjU0MGZkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zdCI9FQc9ff_Of0eN-cwy99rwHlcwJAKNwDcsqgHPpA",
  },
};
function movieList() {
  const url = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

  fetch(url, options)
    .then((response) => response.json()) // response로 받아서 요청에 대한 응답을 JSON형태로 파싱
    // .then((response) => console.log(response))
    .then((response) => {
      let result = response["results"];
      // console.log(result);
      // console.log(result[0]["name"]);

      result.forEach(function (i) {
        // for문과 다름 !! 이 자체로 순서 돌려줌 (i 없어도)
        // console.log(i);

        let title = i["name"];
        let img = i["poster_path"];
        let overview = i["overview"];
        let vote_average = i["vote_average"];
        let id = i["id"];
        //console.log(title, img, overview, vote_average);

        let temp_html = `
        <img
          class="card-img"
          src="https://image.tmdb.org/t/p/w500${img}"
        />
        <div class="card-title" id="title" >${title}</div>
        <div class="card-overview">
        ${overview}
        </div>
        <div class="card-vote">Rating ${vote_average}</div>
        `;

        const a = document.createElement("div");
        a.innerHTML = temp_html;
        const cardList = document.querySelector(".card-list");

        a.addEventListener("click", function () {
          clickEvent(id);
        });

        cardList.append(a);

        let input = document.querySelector("#input");

        input.addEventListener("change", function () {
          // console.log(this.value);
          // console.log(title.toLowerCase().indexOf(this.value));
          // cardList.removeChild(a);
          if (title.toLowerCase().includes(this.value)) {
            // console.log(title);
            a.style.display = "";
          } else {
            a.style.display = "none";
          }
        });
      });
    })
    .catch((err) => console.error(err));
}
movieList();

function clickEvent(target) {
  window.alert(`영화의 ID는 ${target}입니다.`);
  // console.log(target);
}

// let btn = document.querySelector("button");
// const card = document.querySelector(".card");
// btn.addEventListener("click", function () {
//   btnClick(card);
// });

// function btnClick(target) {
//   let cardTitle = document.querySelector("#title");
//   console.log(target);
// }
