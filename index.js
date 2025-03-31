
import { useState, useEffect } from "react";

export default function Home() {
  const [impulses, setImpulses] = useState([
    "Du bist genug.",
    "Heute ist dein Tag!",
    "Vertrau dem Prozess.",
    "Dein Licht leuchtet heller, als du denkst."
  ]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const dayIndex = new Date().getDate() % impulses.length;
    setMessage(impulses[dayIndex]);
  }, [impulses]);

  const showRandom = () => {
    const random = impulses[Math.floor(Math.random() * impulses.length)];
    setMessage(random);
  };

  const addImpulse = () => {
    if (input.trim() !== "") {
      setImpulses([input, ...impulses]);
      setInput("");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      color: 'white',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌌 SpiritCheck</h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '1rem',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <p>{message}</p>
        <button onClick={showRandom} style={{ marginTop: '1rem' }}>🔮 Neuer Impuls</button>
      </div>
      <div style={{ marginTop: '2rem', maxWidth: '400px', width: '100%' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Deinen Impuls eingeben..."
          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}
        />
        <button onClick={addImpulse}>✨ Impuls senden</button>
      </div>
      <div style={{ marginTop: '2rem', maxWidth: '400px' }}>
        <h2>Alle Impulse 🌠</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {impulses.map((impulse, index) => (
            <li key={index}>{impulse}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
