
    let animationId; // Variable to store the animation frame ID
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];

    function createConfettiPiece(x, y) {
      const shape = Math.floor(Math.random() * 3); // 0: Triangle, 1: Square, 2: Circle

      let confetti = {
        x,
        y,
        size: Math.random() * 5 + 5,
        color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
        angle: Math.random() * 360,
        speed: {
          x: Math.random() * 6 - 3,
          y: Math.random() * 6 - 3
        },
        rotation: Math.random() * 4 - 2,
        lifespan: Math.random() * 100 + 100, // Random lifespan between 100 and 200 frames
        alpha: 1 // Initial alpha value
      };

      switch (shape) {
        case 0: // Triangle
          confetti.draw = () => {
            ctx.save();
            ctx.globalAlpha = confetti.alpha;
            ctx.translate(confetti.x, confetti.y);
            ctx.rotate(confetti.rotation);
            ctx.fillStyle = confetti.color;
            ctx.beginPath();
            ctx.moveTo(0, -confetti.size / 2);
            ctx.lineTo(confetti.size / 2, confetti.size / 2);
            ctx.lineTo(-confetti.size / 2, confetti.size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          };
          break;
        case 1: // Square
          confetti.draw = () => {
            ctx.save();
            ctx.globalAlpha = confetti.alpha;
            ctx.translate(confetti.x, confetti.y);
            ctx.rotate(confetti.rotation);
            ctx.fillStyle = confetti.color;
            ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
            ctx.restore();
          };
          break;
        case 2: // Circle
          confetti.draw = () => {
            ctx.save();
            ctx.globalAlpha = confetti.alpha;
            ctx.translate(confetti.x, confetti.y);
            ctx.rotate(confetti.rotation);
            ctx.fillStyle = confetti.color;
            ctx.beginPath();
            ctx.arc(0, 0, confetti.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          };
          break;
      }

      return confetti;
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach((confetti, index) => {
        if (confetti.lifespan > 0) {
          confetti.draw();

          confetti.x += confetti.speed.x;
          confetti.y += confetti.speed.y;

          confetti.angle += confetti.rotation;
          confetti.rotation += 0.1;

          confetti.lifespan--;

          // Decrease alpha over time to make the confetti piece fade out
          confetti.alpha = confetti.lifespan / (confetti.lifespan + 10); // Change 20 to control fade out speed
        } else {
          // Remove the confetti piece from the array when its lifespan is over
          confettiPieces.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(drawConfetti);
    }

    function clearCanvas() {
      confettiPieces.length = 0;
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function playConfetti() {
      clearCanvas();
      canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
      for (let i = 0; i < 300; i++) {
        confettiPieces.push(createConfettiPiece(canvas.width/2,canvas.height/2-100));
      }
      drawConfetti();
    }