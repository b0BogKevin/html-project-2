let animationId; // Variable to store the animation frame ID
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];

    function createConfettiPiece(x, y) {
      return {
        x,
        y,
        size: Math.random() * 5 + 5,
        color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
        angle: Math.random() * 360,
        speed: {
          x: Math.random() * 6 - 3,
          y: Math.random() * 6 - 3
        },
        rotation: Math.random() * 4 - 2
      };
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach(confetti => {
        ctx.save();
        ctx.translate(confetti.x + confetti.size / 2, confetti.y + confetti.size / 2);
        ctx.rotate(confetti.rotation);
        ctx.fillStyle = confetti.color;
        ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
        ctx.restore();

        confetti.x += confetti.speed.x;
        confetti.y += confetti.speed.y;

        confetti.angle += confetti.rotation;
        confetti.rotation += 0.1;
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


/*
// Get the canvas element
const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the confetti colors
const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548'];

// Define the confetti shapes
const shapes = ['circle', 'square', 'triangle'];

// Define the confetti particles
const particles = [];

// Define the confetti particle class
class Particle {
  constructor(x, y, color, shape) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.shape = shape;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.gravity = 0.2;
    this.life = 100;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.random() * Math.PI);
    ctx.fillStyle = this.color;

    switch (this.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-10, -10, 20, 20);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(-10, 10);
        ctx.fill();
        break;
    }

    ctx.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life--;

    if (this.life <= 0) {
      particles.splice(particles.indexOf(this), 1);
    }
  }
}

// Define the confetti burst function
function burst(x, y) {
  for (let i = 0; i < 100; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const particle = new Particle(x, y, color, shape);
    particles.push(particle);
  }
}

// Add a click event listener to the canvas
canvas.addEventListener('click', (event) => {
  burst(event.clientX, event.clientY);
});

// Define the animation loop
function loop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw the particles
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Request the next frame
  requestAnimationFrame(loop);
}

loop();*/