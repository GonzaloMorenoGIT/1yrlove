// Fecha objetivo: 17 de julio de 2026 a las 15:00, hora peninsular española.
// El offset +02:00 corresponde al horario de verano en Madrid.
const targetDate = new Date("2026-07-17T15:00:00+02:00").getTime();

const elements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  countdownPanel: document.getElementById("countdown-panel"),
  revealPanel: document.getElementById("reveal-panel"),
  soundToggle: document.getElementById("sound-toggle"),
  soundText: document.getElementById("sound-text"),
  soundIcon: document.getElementById("sound-icon"),
  audio: document.getElementById("ambient-audio")
};

const pad = (value) => String(value).padStart(2, "0");

function revealSurprise() {
  elements.countdownPanel.classList.add("hidden");
  elements.revealPanel.classList.remove("hidden");
  document.title = "Feliz aniversario — Match Love";
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    revealSurprise();
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
  elements.seconds.textContent = pad(seconds);
}

elements.soundToggle.addEventListener("click", async () => {
  // El botón queda preparado por si añades un archivo llamado musica.mp3
  // dentro de la misma carpeta y cambias el src del audio en index.html.
  if (!elements.audio.querySelector("source").getAttribute("src")) {
    elements.soundText.textContent = "Añade musica.mp3";
    elements.soundIcon.textContent = "♪";
    setTimeout(() => {
      elements.soundText.textContent = "Ambiente";
      elements.soundIcon.textContent = "♫";
    }, 2200);
    return;
  }

  try {
    if (elements.audio.paused) {
      await elements.audio.play();
      elements.soundToggle.classList.add("active");
      elements.soundText.textContent = "Sonando";
      elements.soundIcon.textContent = "♬";
    } else {
      elements.audio.pause();
      elements.soundToggle.classList.remove("active");
      elements.soundText.textContent = "Ambiente";
      elements.soundIcon.textContent = "♫";
    }
  } catch {
    elements.soundText.textContent = "No disponible";
  }
});

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
