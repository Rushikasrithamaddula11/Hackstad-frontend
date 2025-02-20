import { useEffect, useRef } from 'react';

export default function TechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Circuit {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.pathPoints = this.generatePath();
        this.progress = 0;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      generatePath() {
        const points = [];
        let x = this.x;
        let y = this.y;
        const segments = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < segments; i++) {
          const angle = Math.random() * Math.PI * 2;
          const length = Math.random() * 100 + 50;
          x += Math.cos(angle) * length;
          y += Math.sin(angle) * length;
          points.push({ x, y });
        }
        return points;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= this.pathPoints.length - 1) {
          this.reset();
        }
      }

      draw() {
        const currentIndex = Math.floor(this.progress);
        const nextIndex = Math.min(currentIndex + 1, this.pathPoints.length - 1);
        const fraction = this.progress - currentIndex;

        const current = this.pathPoints[currentIndex];
        const next = this.pathPoints[nextIndex];

        const x = current.x + (next.x - current.x) * fraction;
        const y = current.y + (next.y - current.y) * fraction;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(64, 196, 255, ${this.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.pathPoints[0].x, this.pathPoints[0].y);
        for (let i = 1; i < this.pathPoints.length; i++) {
          ctx.lineTo(this.pathPoints[i].x, this.pathPoints[i].y);
        }
        ctx.strokeStyle = `rgba(64, 196, 255, ${this.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    const circuits = Array.from({ length: 50 }, () => new Circuit());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      circuits.forEach(circuit => {
        circuit.update();
        circuit.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none bg-gray-900"
      style={{ zIndex: 0 }}
    />
  );
}