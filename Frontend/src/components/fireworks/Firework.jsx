import './Firework.css';

function Firework() {
  const spans = Array.from({ length: 20 }, (_, i) => (
    <span key={i} style={{ '--i': i + 1 }}></span>
  ));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <section className="w-full h-full">
        {[...Array(11)].map((_, index) => (
          <div className="loader" key={index} style={{ '--r': index + 1 }}>
            {spans}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Firework;
