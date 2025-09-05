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

  // Reset trạng thái Final Container
  const finalContainer = document.getElementById("finalContainer");
  finalContainer.style.display = "none";
  finalContainer.style.opacity = 0;

  matrixRain("H A P P Y B I R T H D A Y");
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
    showImageSequence(() => {
      startMatrixExplosion();
    });
  }
}

function showImageSequence(callback) {
  const items = document.querySelectorAll("#imageSequence .imageItem");
  document.getElementById("imageSequence").style.display = "block";

  let i = 0;
  function showNext() {
    if (i < items.length) {
      const item = items[i];
      const tag = item.querySelector(".hashtag");

      const randomX = Math.random() * 80;
      const randomY = Math.random() * 60;
      const side = Math.random() > 0.5 ? "left" : "right";

      item.style.left = `${randomX}%`;
      item.style.top = `${randomY}%`;
      tag.style[side] = "5%";

      item.classList.add("show");

      setTimeout(() => {
        item.classList.remove("show");
        i++;
        setTimeout(showNext, 2500);
      }, 2500);
    } else {
      document.getElementById("imageSequence").style.display = "none";
      callback();
    }
  }
  showNext();
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
  const chars = "I LOVE U";

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
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      showFinal();
    }
  }

  draw();

  // Fallback: gọi showFinal sau 5 giây nếu vòng lặp chưa kết thúc
  setTimeout(() => {
    if (particles.length > 0) {
      startStarBackground();
      showFinal();
    }
  }, 5000);
}

function startStarBackground() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const stars = Array.from({ length: 100 }, () => ({
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

function showFinal() {
  const finalContainer = document.getElementById("finalContainer");

  // Cảnh báo nhưng không chặn
  if (!window.matchMedia("(orientation: landscape)").matches) {
    alert("Nên xoay ngang màn hình để xem đẹp hơn 🎉");
  }

  finalContainer.style.display = "flex";

  setTimeout(() => {
    finalContainer.style.opacity = 1;
    document.getElementById("replayBtn").style.display = "block";
  }, 50);
}

document.getElementById("replayBtn").addEventListener("click", () => {
  location.reload();
});

function matrixRain(chars) {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let width, height, columns, drops, fontSize = 20;

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
  requestAnimationFrame(tick);
}
