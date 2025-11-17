let model;
let webcam;
let canvas;
let ctx;
let isDetecting = false;
let videoPlayed = false;
const youtubeUrl = 'https://youtu.be/TsxAVFQkXQ8?si=lxfTL-a_YTlErj1j';

async function setupWebcam() {
    webcam = document.getElementById('webcam');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });
        webcam.srcObject = stream;
        
        return new Promise((resolve) => {
            webcam.onloadedmetadata = () => {
                canvas.width = webcam.videoWidth;
                canvas.height = webcam.videoHeight;
                resolve();
            };
        });
    } catch (error) {
        console.error('Error al acceder a la webcam:', error);
        document.getElementById('status').textContent = 'Error: No se puede acceder a la webcam';
    }
}

async function loadModel() {
    try {
        model = await cocoSsd.load();
        document.getElementById('status').textContent = '✅ Listo! Detectando...';
        return model;
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
        document.getElementById('status').textContent = 'Error al cargar el modelo';
    }
}

function showFlag(isGreen) {
    const flagContainer = document.getElementById('flag-container');
    const flag = document.getElementById('flag');
    const flagText = document.getElementById('flag-text');
    
    flagContainer.classList.remove('hidden');
    
    if (isGreen) {
        flag.className = 'flag green';
        flag.textContent = '🚩';
        flagText.textContent = 'Performative';
        flagText.style.color = '#38ef7d';
        
        // Mostrar álbumes cuando es green flag
        flagContainer.classList.add('show-albums');
        
        // Abrir video en nueva pestaña solo cuando detecta matcha (green flag) y no se ha abierto antes
        if (!videoPlayed) {
            window.open(youtubeUrl, '_blank');
            videoPlayed = true;
        }
    } else {
        flag.className = 'flag red';
        flag.textContent = '🚩';
        flagText.textContent = 'Red Flag';
        flagText.style.color = '#f45c43';
        
        // Ocultar álbumes cuando es red flag
        flagContainer.classList.remove('show-albums');
    }
}

async function detectObjects() {
    if (!isDetecting) return;
    
    const predictions = await model.detect(webcam);
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Buscar objetos que puedan ser un matcha (cup, bottle, etc.)
    let matchaDetected = false;
    
    predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        
        // Detectar tazas, botellas o cualquier objeto que pueda contener matcha
        if (prediction.class === 'cup' || 
            prediction.class === 'bottle' || 
            prediction.class === 'wine glass') {
            matchaDetected = true;
        }
    });
    
    // Mostrar flag correspondiente
    showFlag(matchaDetected);
    
    // Actualizar status
    const status = document.getElementById('status');
    if (matchaDetected) {
        status.textContent = '🍵 Green Flag';
        status.style.background = 'rgba(56, 239, 125, 0.3)';
    } else {
        status.textContent = '❌ Red Flag';
        status.style.background = 'rgba(244, 92, 67, 0.3)';
    }
    
    requestAnimationFrame(detectObjects);
}

async function init() {
    await setupWebcam();
    await loadModel();
    isDetecting = true;
    detectObjects();
}

// Iniciar cuando la página cargue
window.addEventListener('load', init);
