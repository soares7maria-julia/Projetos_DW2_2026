
import './App.css'
import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [contador, setContador] = useState(0);

  return (
    <div className={styles.container}>
      <h1>Contador</h1>

      <p className={styles.valor}>{contador}</p>

      <div className={styles.botoes}>
        <button onClick={() => setContador(contador + 1)}>+</button>
        <button onClick={() => setContador(contador - 1)}>-</button>
      </div>
    </div>
  );
}

export default App;