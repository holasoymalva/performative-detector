# 🍵 Performative Detector - Green/Red Flag

Proyecto de detección de matcha usando webcam con TensorFlow.js que muestra flags según la detección.

## Características

- ✅ Detección en tiempo real usando la webcam
- 🍵 Detecta tazas, botellas y vasos (posibles contenedores de matcha)
- 🚩 Muestra "Green Flag - Performative" cuando detecta matcha
- 🚩 Muestra "Red Flag" cuando NO detecta matcha
- 🎥 Reproduce video de YouTube automáticamente al mostrar red flag

## Cómo usar

1. Abre `index.html` en tu navegador (recomendado: Chrome o Firefox)
2. Permite el acceso a la webcam cuando se solicite
3. Muestra una taza, botella o vaso frente a la cámara
4. El sistema detectará automáticamente y mostrará la flag correspondiente

## Tecnologías

- HTML5 / CSS3
- JavaScript
- TensorFlow.js
- COCO-SSD (modelo de detección de objetos)
- YouTube IFrame API

## Notas

- Requiere conexión a internet para cargar los modelos de TensorFlow.js
- Funciona mejor con buena iluminación
- El modelo detecta tazas, botellas y vasos como posibles contenedores de matcha
