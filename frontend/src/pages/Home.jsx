import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <h1>Kidney Compass</h1>
        <p>
          A simple patient education app to help dialysis patients learn,
          organize questions, and feel more confident in their care.
        </p>

        <Link to="/signup" className="primary-button">
          Get Started
        </Link>
      </div>

      <div className="feature-cards">
        <div className="card">
          <h2>Learn</h2>
          <p>Browse beginner-friendly kidney and dialysis education topics.</p>
        </div>

        <div className="card">
          <h2>Ask</h2>
          <p>Save questions you want to discuss with your healthcare team.</p>
        </div>

        <div className="card">
          <h2>Stay Empowered</h2>
          <p>Keep your learning and questions organized in one place.</p>
        </div>
      </div>

      <div className="disclaimer">
        <strong>Disclaimer:</strong> Kidney Compass is for educational purposes only.
        It is not medical advice. Always follow the guidance of your doctor,
        nurse, dietitian, or dialysis care team.
      </div>
    </section>
  );
}

export default Home;