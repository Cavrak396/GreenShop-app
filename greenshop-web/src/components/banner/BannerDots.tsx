interface Dot {
  id: number;
}

interface BannerDotsProps {
  activeImage: number;
  setActiveImage: (id: number) => void;
}

const dots: Dot[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

function BannerDots({ activeImage, setActiveImage }: BannerDotsProps) {
  return (
    <div className="banner__dots">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={`banner__dot ${
            activeImage === dot.id ? "active-dot" : ""
          }`}
          onClick={() => setActiveImage(dot.id)}
        ></span>
      ))}
    </div>
  );
}

export default BannerDots;