import React, { useState } from 'react';
import ColorPalette from './ColorPalette';

export const Formulario = () => {
  const [formValues, setFormValues] = useState({
    genero: 'hombre',
    altura: '',
    peso: '',
    cintura: '',
    cuello: '',
    cadera: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validar si el valor ingresado es negativo
    if (value < 0) {
      return; // No se permite un valor negativo, se sale de la función
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleResetClick = () => {
    setFormValues({ altura: '', peso: '', cintura: '', cuello: '', cadera: '' });
    setMostrarColorPalette(false);
  };

  const { genero, altura, peso, cintura, cuello, cadera } = formValues;
  const [mostrarColorPalette, setMostrarColorPalette] = useState(false);
  const [grasaCorporal, setGrasaCorporal] = useState(0);

  const handleGeneroChange = (event) => {
    setFormValues({ ...formValues, genero: event.target.value });
  };

  const calcularGrasaCorporal = (event) => {
    event.preventDefault();

    let grasaCorporal = 0;

    if (genero === 'hombre') {
      grasaCorporal =
        (495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura))) - 450;
    } else if (genero === 'mujer') {
      grasaCorporal =
        (495 / (1.29579 - 0.35004 * Math.log10(parseFloat(cintura) + parseFloat(cadera) - parseFloat(cuello)) + 0.221 * Math.log10(parseFloat(altura)))) - 450;
    }

    if (grasaCorporal < 0) {
      grasaCorporal = 0;
    }

    console.log(`Grasa corporal: ${grasaCorporal.toFixed(1)}%`);
    setGrasaCorporal(grasaCorporal.toFixed(1));
    setMostrarColorPalette(true);
  };

  return (
    <div>
      <form onSubmit={calcularGrasaCorporal}>
        <div className="form-genero">
          <label>Género:</label>
          <div className="genero">
            <input type="radio" name="genero" value="hombre" checked={genero === 'hombre'} onChange={handleGeneroChange} id="hombre" />
            <label htmlFor="hombre">Hombre</label>
          </div>
          <div className="genero">
            <input type="radio" name="genero" value="mujer" checked={genero === 'mujer'} onChange={handleGeneroChange}  id="mujer" />
            <label htmlFor="mujer">Mujer</label>
          </div>    
        </div>
            
        <div className='form-container'>
          <div className='form-genero'>
            <label>Altura (cm): </label>
            <input type="number" className='input-large' name="altura" id="altura" placeholder="Escribe tu altura" value={altura} onChange={handleInputChange} />
            <label>Peso (kg): </label>
            <input type="number" className='input-large' name="peso" id="peso" placeholder="Escribe tu peso" value={peso} onChange={handleInputChange} />
            <label>Cintura (cm): </label>
            <input type="number" className='input-large' name="cintura" id="cintura" placeholder="Medida de tu cintura" value={cintura} onChange={handleInputChange} />
            <label>Cuello (cm): </label>
            <input type="number" className='input-large' name="cuello" id="cuello" placeholder="Medida de tu cuello" value={cuello} onChange={handleInputChange}/>
            {genero === 'mujer' && (
              <>
                <label>Cadera (cm): </label>
                <input type="number" className='input-large' name="cadera" id="cadera" placeholder="Medida de tu cadera" value={cadera} onChange={handleInputChange} />
              </>
            )}
          </div>
          <div className='color-palette-container'>
            {mostrarColorPalette && 
              <>
                <h2>Tu Resultado: {grasaCorporal}%</h2>
                <ColorPalette grasaCorporal={grasaCorporal} />
              </>
            }
          </div>
        </div>
            
        <div className='botones'>
          <button className='boton-azul' type='submit'>Calcular</button>
          <button className='boton-azul' onClick={handleResetClick}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};
