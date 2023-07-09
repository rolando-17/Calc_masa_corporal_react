import React from 'react';
import { shade } from 'polished';

const ColorPalette = ({ grasaCorporal }) => {
  const baseColors = ['#3f8bbc', '#408a49', '#b5b23d', '#ddb53f', '#c46b34'];
  const numSteps = 5; // Número de pasos para aclarar los colores
  const startIndex = 4; // Índice a partir del cual se muestran los colores

  const generatePalette = (color) => {
    const palette = [color];
    const step = 1 / numSteps;

    for (let i = 1; i <= numSteps; i++) {
      palette.push(shade(step * i, color));
    }

    return palette;
  };

  const combinedPalette = baseColors
    .slice(startIndex) // Se eliminan los primeros colores según el índice
    .reduce((acc, color) => [...acc, ...generatePalette(color)], []);

  const colorNames = ['2-4% Esencial', '6-13% Deportista', '14% Fitness', '18-25% Aceptable', '25% Obeso'];

  const getArrowPosition = () => {
    const percentage = parseFloat(grasaCorporal);
    const maxPercentage = 40; // Máximo porcentaje de la paleta de colores

    if (isNaN(percentage) || percentage < 0) {
      return -1; // Si el valor no es válido, la flecha estará fuera de la paleta de colores
    }

    if (percentage >= maxPercentage) {
      return combinedPalette.length - 1; // Si el porcentaje es mayor o igual al máximo, la flecha estará en el último color
    }

    const stepSize = maxPercentage / combinedPalette.length;
    const arrowPosition = Math.floor(percentage / stepSize);

    return arrowPosition;
  };

  const arrowPosition = getArrowPosition();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', position: 'relative' }} className="grasa-corporal-container">
        {combinedPalette.map((color, index) => (
          <div
            className={`paleta-colores${arrowPosition === index ? ' arrow' : ''}`}
            key={index}
            style={{
              backgroundColor: color
            }}
          />
        ))}
        {arrowPosition !== -1 && (
          <div
            className="paleta-colores-arrow"
            style={{
              left: `calc(${(arrowPosition * 100) / (combinedPalette.length - 1)}% - 10px)`
            }}
          />
        )}
        {arrowPosition !== -1 && (
          <div className="grasa-corporal-label-container" style={{ left: `calc(${(arrowPosition * 100) / (combinedPalette.length - 1)}% - 10px)` }}>
            <span className="grasa-corporal-label">{grasaCorporal}%</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex' }}>
        {combinedPalette.map((color, index) => (
          <div className="paleta-colores-small" key={index} style={{ backgroundColor: color }}>
            <span className="nombres-colores">{colorNames[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
