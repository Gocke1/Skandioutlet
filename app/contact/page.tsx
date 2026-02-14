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
      <p>Använd gärna formuläret ovan för att komma i kontakt med oss.</p>
      <h3>FAQ</h3>
      <p><strong>Hur lång är leveranstiden?</strong> 2-5 arbetsdagar inom Sverige.</p>
      <p><strong>Kan jag returnera?</strong> Ja, inom 14 dagar.</p>
    </section>
  );
}
