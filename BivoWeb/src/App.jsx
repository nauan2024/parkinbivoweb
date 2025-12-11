import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Cadastro_login} from "./components/Cadastro_login"; 
import { Home } from "./components/Home";
import { Entrada } from "./components/Entrada"; 
import { Saida } from "./components/Saida"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro_login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/saida" element={<Saida />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;