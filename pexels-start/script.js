const API_KEY = "INSERISCI_LA_TUA_API_KEY"

const loadBtn = document.querySelector(".btn-primary")
const loadSecondaryBtn = document.querySelector(".btn-secondary")
const row = document.querySelector(".row")

const searchForm = document.createElement("form")
const searchInput = document.createElement("input")

searchForm.classList.add("mt-3")
searchInput.classList.add("form-control")
searchInput.placeholder = "Search images..."
searchInput.type = "text"

searchForm.appendChild(searchInput);
document.querySelector(".jumbotron .container").appendChild(searchForm)

let imagesData = [];

// 🔹 FETCH API
async function getImages(query) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}`,
      {
        headers: {
          Authorization: API_KEY,
        }
      }
    )

    const data = await res.json()
    imagesData = data.photos
    renderCards(imagesData)
  } catch (err) {
    console.error(err)
  }
}

// 🔹 RENDER CARDS
function renderCards(photos) {
  row.innerHTML = ""

  photos.forEach((photo, index) => {
    const col = document.createElement("div")
    col.className = "col-md-4"

    col.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top">
        <div class="card-body">
          <h5 class="card-title clickable-title">${photo.photographer}</h5>
          <p class="card-text">
            Image from Pexels API
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary view-btn">VIEW</button>
              <button class="btn btn-sm btn-outline-secondary hide-btn">HIDE</button>
            </div>
            <small class="text-muted">${photo.id}</small>
          </div>
        </div>
      </div>
    `

    row.appendChild(col)
  })

  addEvents();
}

//EVENTI
function addEvents() {
  // HIDE CARD
  document.querySelectorAll(".hide-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".col-md-4").remove()
    })
  })

  // VIEW IMAGE (apre nuova pagina dettaglio)
  document.querySelectorAll(".view-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const photo = imagesData[index]

      localStorage.setItem(
        "photoDetail",
        JSON.stringify(photo)
      );

      window.location.href = "detail.html"
    })
  })

  // CLICK SU IMMAGINE O NOME → DETTAGLIO
  document.querySelectorAll(".card-img-top, .clickable-title").forEach((el, index) => {
    el.addEventListener("click", () => {
      const photo = imagesData[index]

      localStorage.setItem("photoDetail", JSON.stringify(photo))
      window.location.href = "detail.html"
    });
  });
}

// BOTTONI
loadBtn.addEventListener("click", (e) => {
  e.preventDefault()
  getImages("hamsters")
});

loadSecondaryBtn.addEventListener("click", (e) => {
  e.preventDefault()
  getImages("tigers")
});

// SEARCH
searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  getImages(searchInput.value)
});