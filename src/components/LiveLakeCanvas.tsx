import React, { useEffect, useRef } from 'react';
import { TimeOfDay } from '../types';

interface LiveLakeCanvasProps {
  atmosphere: TimeOfDay;
}

export const LiveLakeCanvas: React.FC<LiveLakeCanvasProps> = ({ atmosphere }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 260;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      step += 0.015;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Colors based on atmosphere
      let wave1Color = 'rgba(79, 111, 126, 0.25)';
      let wave2Color = 'rgba(29, 61, 79, 0.4)';
      let mountainColor = 'rgba(29, 61, 79, 0.15)';

      if (atmosphere === 'alba') {
        wave1Color = 'rgba(230, 220, 196, 0.3)';
        wave2Color = 'rgba(217, 56, 58, 0.15)';
        mountainColor = 'rgba(79, 111, 126, 0.2)';
      } else if (atmosphere === 'tramonto') {
        wave1Color = 'rgba(217, 56, 58, 0.25)';
        wave2Color = 'rgba(212, 163, 89, 0.2)';
        mountainColor = 'rgba(45, 30, 48, 0.3)';
      } else if (atmosphere === 'notte') {
        wave1Color = 'rgba(15, 32, 45, 0.6)';
        wave2Color = 'rgba(29, 61, 79, 0.3)';
        mountainColor = 'rgba(10, 20, 30, 0.4)';
      }

      // Draw subtle mountain silhouettes (representing Monte Isola and Trentapassi)
      ctx.fillStyle = mountainColor;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.45);
      ctx.quadraticCurveTo(width * 0.2, height * 0.15, width * 0.38, height * 0.5);
      // Monte Isola peak
      ctx.quadraticCurveTo(width * 0.52, height * 0.05, width * 0.68, height * 0.55);
      ctx.quadraticCurveTo(width * 0.85, height * 0.25, width, height * 0.4);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Wave Layer 1
      ctx.fillStyle = wave1Color;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.008 + step) * 8 + Math.cos(x * 0.003 - step * 0.5) * 5 + height * 0.65;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Wave Layer 2 (foreground)
      ctx.fillStyle = wave2Color;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.01 - step * 1.2) * 6 + Math.sin(x * 0.005 + step * 0.8) * 4 + height * 0.78;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Small stylized ferry silhouette drifting across the lake
      const boatX = ((step * 35) % (width + 80)) - 40;
      const boatY = height * 0.64 + Math.sin(boatX * 0.01 + step) * 3;

      ctx.fillStyle = atmosphere === 'notte' ? 'rgba(255, 230, 150, 0.8)' : 'rgba(29, 61, 79, 0.7)';
      // Hull
      ctx.beginPath();
      ctx.moveTo(boatX - 14, boatY);
      ctx.lineTo(boatX + 14, boatY);
      ctx.lineTo(boatX + 10, boatY + 5);
      ctx.lineTo(boatX - 10, boatY + 5);
      ctx.closePath();
      ctx.fill();

      // Cabin & tiny light
      ctx.fillRect(boatX - 6, boatY - 5, 12, 5);
      if (atmosphere === 'notte' || atmosphere === 'tramonto') {
        ctx.fillStyle = '#FFEAA7';
        ctx.beginPath();
        ctx.arc(boatX + 8, boatY - 3, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [atmosphere]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
