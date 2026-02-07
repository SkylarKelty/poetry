(function () {
  var canvas = document.getElementById("starfield");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var stars = [];
  var shootingStars = [];
  var rafId = 0;
  var width = window.innerWidth;
  var height = window.innerHeight;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeStars() {
    if (stars.length) return;
    for (var i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * 3000,
        y: Math.random() * 2000,
        r: Math.random() * 1.8 + 0.3,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.5 + 0.5,
        hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? 220 : 40) : 0
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.4 + 0.6;
      var alpha = s.brightness * twinkle;
      var x = s.x % width;
      var y = s.y % height;

      if (s.hue) {
        ctx.fillStyle = "hsla(" + s.hue + ", 60%, 80%, " + alpha + ")";
      } else {
        ctx.fillStyle = "rgba(220, 225, 255, " + alpha + ")";
      }

      ctx.beginPath();
      ctx.arc(x, y, s.r * twinkle, 0, Math.PI * 2);
      ctx.fill();

      if (s.r > 1.2) {
        ctx.fillStyle = "rgba(180, 200, 255, " + (alpha * 0.15) + ")";
        ctx.beginPath();
        ctx.arc(x, y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (Math.random() < 0.001 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.3,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        life: 1,
        len: 40 + Math.random() * 60
      });
    }

    var next = [];
    for (var j = 0; j < shootingStars.length; j++) {
      var ss = shootingStars[j];
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= 0.015;
      if (ss.life <= 0) continue;

      var grad = ctx.createLinearGradient(
        ss.x,
        ss.y,
        ss.x - ss.vx * (ss.len / 5),
        ss.y - ss.vy * (ss.len / 5)
      );
      grad.addColorStop(0, "rgba(220, 230, 255, " + ss.life * 0.9 + ")");
      grad.addColorStop(1, "rgba(220, 230, 255, 0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - ss.vx * (ss.len / 5), ss.y - ss.vy * (ss.len / 5));
      ctx.stroke();

      next.push(ss);
    }
    shootingStars = next;

    rafId = window.requestAnimationFrame(draw);
  }

  resize();
  makeStars();
  rafId = window.requestAnimationFrame(draw);
  window.addEventListener("resize", resize);

  window.addEventListener("pagehide", function () {
    window.cancelAnimationFrame(rafId);
  });
})();