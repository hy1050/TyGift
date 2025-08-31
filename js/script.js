function matrixRain(chars) {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let width, height, columns, drops, fontSize = 20;
  const chars = "H A P P Y B I R T H D A Y";

  function size() {
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(Math.floor(Math.random() * -50));
    ctx.font = fontSize + "px ui-monospace, monospace";
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `rgba(0,0,0,0.04)`;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      // const ch = chars.split(" ")[i % chars.length];
      const ch = chars.charAt(i % chars.length);
      ctx.fillStyle = "#ff69b4";
      ctx.shadowColor = "#ff69b4";
      ctx.shadowBlur = 10;
      ctx.fillText(ch, x, y);
      ctx.shadowBlur = 0;
      if (y > height && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20);
      } else {
        drops[i] += 1;
      }
    }
    requestAnimationFrame(tick);
  }

  size();
  window.addEventListener('resize', size);
  tick();
}

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

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("bgMusic").play();
  matrixRain("H A P P Y");
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

    if (countdownValues[index] === "HAPPY") matrixRain("H A P P Y");
    if (countdownValues[index] === "BIRTHDAY") matrixRain("B I R T H D A Y");
    if (countdownValues[index] === "YOU") {
      matrixRain("T O Y O U");
      document.body.classList.add("shake");
      setTimeout(() => {
        document.body.classList.remove("shake");
      }, 500);
    }

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
  const chars = "LOVE";

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
      s.alpha = Math.max(0, Math.min(1, s.alpha));
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
  const final = document.getElementById('finalImage');
  final.style.display = 'flex';
  setTimeout(() => {
    final.style.opacity = 1;
    document.getElementById("replayBtn").style.display = "block";
  }, 50);
}

document.getElementById("replayBtn").addEventListener("click", () => {
  location.reload();
});