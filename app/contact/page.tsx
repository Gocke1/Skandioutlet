export default function ContactPage() {
  return (
    <section className="container section">
      <h1>Kontakt</h1>
      <form className="form">
        <input placeholder="Namn" />
        <input placeholder="E-post" />
        <textarea placeholder="Meddelande" rows={5} />
        <button type="button">Skicka</button>
      </form>
      <p>E-post: info@skandioutlet.se</p>
      <p>Telefon: +46 10 123 45 67</p>
      <p>Organisationsnummer: 559999-1234</p>
      <h3>FAQ</h3>
      <p><strong>Hur lång är leveranstiden?</strong> 2-5 arbetsdagar inom Sverige.</p>
      <p><strong>Kan jag returnera?</strong> Ja, inom 14 dagar.</p>
    </section>
  );
}
