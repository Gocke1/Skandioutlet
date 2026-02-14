import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Skandioutlet</h4>
          <p>Premium shopping i skandinavisk stil.</p>
        </div>
        <div>
          <h4>Kontakt</h4>
          <p>Kontakta oss via kontaktformuläret.</p>
        </div>
        <div>
          <h4>Juridik</h4>
          <Link href="/policies">Integritet & Returpolicy</Link>
          <br />
          <Link href="/terms">Allmänna villkor</Link>
        </div>
      </div>
    </footer>
  );
}
