const nav = document.querySelector("#mainNav");
const playBtn = document.querySelector("#playBtn");
const heartBtn = document.querySelector("#heartBtn");
const progressBar = document.querySelector("#progressBar");
const currentTime = document.querySelector("#currentTime");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

let playing = false;
let seconds = 102;
let timer;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const secondsPart = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${secondsPart}`;
}

playBtn.addEventListener("click", () => {
  playing = !playing;
  playBtn.innerHTML = playing ? "&#10074;&#10074;" : "&#9654;";
  playBtn.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");

  if (playing) {
    timer = window.setInterval(() => {
      if (seconds >= 218) {
        seconds = 0;
      }
      seconds += 1;
      currentTime.textContent = formatTime(seconds);
      progressBar.style.width = `${(seconds / 218) * 100}%`;
    }, 1000);
  } else {
    window.clearInterval(timer);
  }
});

heartBtn.addEventListener("click", () => {
  heartBtn.classList.toggle("liked");
  heartBtn.innerHTML = heartBtn.classList.contains("liked") ? "&#9829;" : "&#9825;";
});

document.querySelectorAll(".genre-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".genre-btn.active")?.classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".music-item").forEach((item) => {
      item.classList.toggle("hidden", filter !== "todos" && item.dataset.category !== filter);
    });
  });
});
