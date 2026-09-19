// Spinner from https://codepen.io/danvim/pen/poxNmME

export default function Spinner({
  size = 60,
  duration = 1,
  className,
}: {
  size?: number;
  duration?: number;
  className?: string;
}) {
  const unit = size / 12;

  const wrapperStyle = /** @type {React.CSSProperties} */ {
    width: size,
    height: size,
    "--vs-size": `${size}px`,
    "--vs-unit": `${unit}px`,
    "--vs-duration": `${duration}s`,
    filter: `drop-shadow(0 0 calc(var(--vs-unit) * 0.25) rgba(0,0,0,0.5))`,
  };

  return (
    <div className={`relative inline-block ${className}`} style={wrapperStyle}>
      <div className="vista-spinner relative rounded-full overflow-visible">
        <div className="bottom-glow" />
        <div className="top-glow" />
        <div className="glow-group absolute inset-0">
          <div className="star-dust">
            <div className="noise" />
            <div className="radar-reveal" />
          </div>
          <div className="glow">
            <div className="train" />
          </div>
        </div>
        <div className="spec top" />
        <div className="spec bottom" />
      </div>

      <style>{`
        .vista-spinner {
          width: var(--vs-size);
          height: var(--vs-size);
          border-radius: 9999px;
          /* donut-shaped mask so only the ring is visible */
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cdefs%3E%3Cmask id='a'%3E%3Crect width='1' height='1' fill='white'/%3E%3Ccircle cx='50%25' cy='50%25' r='30%25' fill='black' /%3E%3C/mask%3E%3C/defs%3E%3Crect width='1' height='1' mask='url(%23a)'/%3E%3C/svg%3E");
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cdefs%3E%3Cmask id='a'%3E%3Crect width='1' height='1' fill='white'/%3E%3Ccircle cx='50%25' cy='50%25' r='30%25' fill='black' /%3E%3C/mask%3E%3C/defs%3E%3Crect width='1' height='1' mask='url(%23a)'/%3E%3C/svg%3E");
          background: radial-gradient(50% 50% at 50% 50%, #424e13 60%, #262d0b 90%);
        }

        .vista-spinner .glow {
          position: absolute;
          top: 0;
          left: 50%;
          right: 50%;
          bottom: 0;
          animation: vs-rotate var(--vs-duration) infinite linear;
          filter: blur(calc(var(--vs-unit) * 0.4));
        }

        .vista-spinner .glow::after {
          position: absolute;
          content: "";
          display: block;
          height: calc(var(--vs-unit) * 1.5);
          width: calc(var(--vs-unit) * 3);
          top: calc(var(--vs-unit) * 0.5);
          left: calc(var(--vs-unit) * -1.5);
          border-radius: 9999px;
          background-color: #fff;
        }

        .vista-spinner .glow .train {
          position: relative;
          width: 100%;
          height: 100%;
          transform: rotate(-45deg);
        }

        .vista-spinner .glow .train::after {
          position: absolute;
          content: "";
          display: block;
          left: calc(var(--vs-unit) * -6);
          top: 0;
          width: calc(var(--vs-unit) * 12);
          height: calc(var(--vs-unit) * 6);
          background:
            radial-gradient(40% 90% at 60% 40%, #bad454 0%, #bad45400 100%),
            radial-gradient(63.65% 77.14% at 50% 20%, #849b27cc 0%, #849b2700 100%);
          border-radius: 9999px;
          mix-blend-mode: soft-light;
        }

        .vista-spinner .star-dust {
          position: absolute;
          width: var(--vs-size);
          height: var(--vs-size);
          filter: contrast(180%) brightness(1500%) blur(calc(var(--vs-unit) * 0.1)) saturate(0) invert(1);
          animation: vs-rotate var(--vs-duration) infinite linear;
          mix-blend-mode: color-dodge;
        }

        .vista-spinner .star-dust > * {
          position: absolute;
          width: inherit;
          height: inherit;
        }

        .vista-spinner .star-dust .noise {
          background:
            linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.04' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: vs-star-trail calc(var(--vs-duration) * 1.6) infinite linear;
        }

        .vista-spinner .star-dust .radar-reveal {
          background: conic-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0));
        }

        .vista-spinner .top-glow {
          position: absolute;
          width: calc(var(--vs-unit) * 12.8);
          height: calc(var(--vs-unit) * 7.5);
          left: calc((var(--vs-size) - var(--vs-unit) * 12.8) / 2);
          top: calc(var(--vs-unit) * -1);
          background: radial-gradient(50% 50% at 50% 50%, #cee085a3 50%, #f2f7de00 100%);
          border-radius: 9999px;
        }

        .vista-spinner .bottom-glow {
          position: absolute;
          width: calc(var(--vs-unit) * 11);
          height: calc(var(--vs-unit) * 7);
          left: calc((var(--vs-size) - var(--vs-unit) * 11) / 2);
          bottom: calc(var(--vs-unit) * -1.5);
          background: radial-gradient(50% 50% at 50% 50%, #a6c431 31.25%, #a6c43100 100%);
          border-radius: 9999px;
          mix-blend-mode: hard-light;
          filter: blur(calc(var(--vs-unit) * 0.25));
        }

        .vista-spinner .spec {
          position: absolute;
          width: var(--vs-size);
          height: calc(var(--vs-unit) * 5.5);
          background-size: var(--vs-size) var(--vs-size);
        }

        .vista-spinner .spec.top {
          left: 0;
          top: 0;
          background-image: radial-gradient(
            50% 50% at 50% 50%,
            rgba(255,255,255,0) 67%,
            rgba(255,255,255,0.1) 68%,
            rgba(255,255,255,0.8) 80%,
            rgba(255,255,255,0.9) 88%,
            rgba(255,255,255,0) 93%
          );
          mask-image: radial-gradient(ellipse at top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 85%);
          -webkit-mask-image: radial-gradient(ellipse at top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 85%);
        }

        .vista-spinner .spec.bottom {
          left: 0;
          bottom: 0;
          background-image: radial-gradient(
            50% 50% at 50% 50%,
            rgba(255,255,255,0) 67%,
            rgba(255,255,255,0.6) 77%,
            rgba(255,255,255,0.6) 78%,
            rgba(255,255,255,0) 88%
          );
          background-position: bottom;
          mask-image: radial-gradient(ellipse at bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 90%);
          -webkit-mask-image: radial-gradient(ellipse at bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 90%);
        }

        @keyframes vs-rotate {
          0% { transform: rotate(90deg); }
          100% { transform: rotate(450deg); }
        }

        @keyframes vs-star-trail {
          0% { transform: rotate(10deg); }
          100% { transform: rotate(-710deg); }
        }
      `}</style>
    </div>
  );
}
