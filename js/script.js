function startSequence() {
  showCountdownStep();
}
function checkOrientationAndShowButton() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    document.getElementById("startBtn").style.display = "block";
  } else {
    document.getElementById("startBtn").style.display = "none";
  }
}
window.addEventListener("orientationchange", checkOrientationAndShowButton);
window.addEventListener("resize", checkOrientationAndShowButton);
checkOrientationAndShowButton();
const startBtn = document.getElementById("startBtn");
const audio = document.querySelector("audio");
startBtn.addEventListener("click", () => {
  audio.play();
  startBtn.style.display = "none";
  setTimeout(() => {
    startSequence();
  }, 3000);
});
const countdownValues = [3, 2, 1, "HAPPY", "BIRTHDAY", "TO", "YOU"];
let index = 0;
const countdownEl = document.getElementById("countdown");
function showCountdownStep() {
  if (index < countdownValues.length) {
    countdownEl.textContent = countdownValues[index];
    countdownEl.style.visibility = "visible";
    countdownEl.classList.remove("animate");
    void countdownEl.offsetWidth;
    countdownEl.classList.add("animate");
    setTimeout(() => {
      countdownEl.style.visibility = "hidden";
      index++;
      setTimeout(showCountdownStep, 500);
    }, 1000);
  } else {
    startMatrixExplosion();
  }
}
function startMatrixExplosion() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const particles = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const chars = "MATRIX";
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: centerX,
      y: centerY,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      char: chars.charAt(Math.floor(Math.random() * chars.length)),
      alpha: 1
    });
  }
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.fillStyle = `rgba(255,105,180,${p.alpha})`;
      ctx.font = "20px monospace";
      ctx.fillText(p.char, p.x, p.y);
      if (p.alpha <= 0) particles.splice(i, 1);
    });
    if (particles.length > 0) {
      requestAnimationFrame(draw);
    } else {
      startStarBackground();
      showFinalImage();
      matrixRain();
    }
  }
  draw();
}
function startStarBackground() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const stars = Array.from({length: 100}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2,
    alpha: Math.random()
  }));
  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.alpha += (Math.random() - 0.5) * 0.05;
      if (s.alpha < 0) s.alpha = 0;
      if (s.alpha > 1) s.alpha = 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}
function showFinalImage() {
  const final = document.getElementById("finalImage");
  final.style.display = "block";
  setTimeout(() => {
    final.style.opacity = 1;
  }, 50);
}
function matrixRain() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const columns = Math.floor(width / 20);
  const drops = Array(columns).fill(0);
  const chars = "01";
  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#0f0";
    ctx.font = "20px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
}