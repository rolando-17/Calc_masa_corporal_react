import './App.css';
import { Formulario } from './componentes/Formulario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href='r' >
          Health Overview 
        </a>
        <div className="menu-icon">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      <div className="main-body">
        <div className="texto-principal">
          <h2>Calculadora de Grasa Corporal</h2>
        </div>
        <div className="texto-secundario">
          <p>El método de la Marina de los Estados Unidos (US Navy Method) ofrece una manera sencilla de cálcular
            un aproximado del porcentaje de tejido adiposo en el cuerpo de una persona.
          </p>
          <p>Los valores requeridos por la fórmula son los siguientes:</p>
        </div>
        <Formulario/>
      </div>
    </div>
  );
}

export default App;
