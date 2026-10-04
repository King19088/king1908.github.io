// 1. Находим холст и кисть
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// 2. Растягиваем холст на весь экран
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 3. Массив всех частиц
const particles = [];

// 4. Функция создания ОДНОЙ частицы в точке (x, y)
function spawnParticle(x, y) {
  particles.push({
    x: x,
    y: y,
    vx: 0,  // лёгкий разлёт по X
    vy: 0,  // лёгкий разлёт по Y
    size: 10,    // размер 2..6
    life: 1,                        // жизнь: 1 → 0
    color: "#008000" // случайный цвет
  });
}

// 5. ЛОВИМ ДВИЖЕНИЕ МЫШИ
window.addEventListener("mousemove", (e) => {
  // создаём сразу 2-3 частицы за один сдвиг — след гуще
  for (let i = 0; i < 1; i++) {
    spawnParticle(e.clientX, e.clientY);
  }
});

// 6. Игровой цикл — рисуем 60 раз в секунду
function draw() {
  // очищаем холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // идём С КОНЦА, потому что удаляем элементы
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    // движение
    p.x += p.vx;
    p.y += p.vy;

    // жизнь уменьшается
    p.life -= 0.02;

    // если жизнь кончилась — удаляем частицу и пропускаем
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    // рисуем круг
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    // ↑ размер тоже уменьшается вместе с жизнью — красивее

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life; // прозрачность = жизнь
    ctx.fill();
  }

  // сбрасываем прозрачность, иначе она повлияет на следующий кадр
  ctx.globalAlpha = 1;

  requestAnimationFrame(draw);
}
draw();