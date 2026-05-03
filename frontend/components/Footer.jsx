import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} <strong>Arun Yadav</strong>
      </p>

      <div className="footer-links">
        <a
          href="https://github.com/Arun-IIITD"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/arun-yadav-2529792a7/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}