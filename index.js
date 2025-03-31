
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [impulses, setImpulses] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchImpulses();
  }, []);

  async function fetchImpulses() {
    const { data, error } = await supabase.from("impulses").select("id, message").order("id", { ascending: false });
    if (!error) setImpulses(data);
  }

  async function addImpulse() {
    if (input.trim() === "") return;
    const { data, error } = await supabase.from("impulses").insert([{ message: input }]);
    if (!error) {
      setImpulses([data[0], ...impulses]);
      setInput("");
    }
  }

  async function deleteImpulse(id) {
    await supabase.from("impulses").delete().eq("id", id);
    setImpulses(impulses.filter((i) => i.id !== id));
  }

  return (
    <div className="container">
      <h1>🌌 SpiritCheck</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Deinen Impuls hier eingeben..."
      />
      <button onClick={addImpulse}>Senden</button>
      <ul>
        {impulses.map((impulse) => (
          <li key={impulse.id}>
            {impulse.message}
            <button onClick={() => deleteImpulse(impulse.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          padding: 2rem;
          text-align: center;
          background: linear-gradient(135deg, #f9f9f9, #a7e9ff);
          min-height: 100vh;
        }
        input {
          padding: 10px;
          width: 60%;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        button {
          margin: 10px;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #4f46e5;
          color: white;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 10px 0;
          background: #eef;
          padding: 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
