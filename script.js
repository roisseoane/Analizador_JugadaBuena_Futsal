// --- 1. Constantes y Elementos del DOM ---
const UMBRAL_BUENA_JUGADA = 6; // Umbral de puntos

// Obtenemos los elementos una vez que el script se carga
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const analysisModal = document.getElementById('analysisModal');
const evaluateBtn = document.getElementById('evaluateBtn');
const criteriaForm = document.getElementById('criteriaForm');
const resultadoWrapper = document.getElementById('resultado_wrapper');
const resultadoFinalDiv = document.getElementById('resultado_final');
const resultadoScoreDiv = document.getElementById('resultado_score');
const resultadoExplicacionDiv = document.getElementById('resultado_explicacion');

// IDs de las casillas de "Impacto" (Puerta de Control)
const gateCheckboxes = ['q1', 'q2', 'q3', 'q4'];

// IDs de TODAS las casillas
const allCheckboxes = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

// --- 2. Función para abrir el modal ---
function openModal() {
    criteriaForm.reset(); 
    resultadoWrapper.style.display = 'none';
    resultadoWrapper.className = '';
    
    modalOverlay.style.display = 'block';
    analysisModal.style.display = 'block';
}

// --- 3. Función para cerrar el modal ---
function closeModal() {
    modalOverlay.style.display = 'none';
    analysisModal.style.display = 'none';
}

// --- 4. Función de Evaluación (Lógica Ponderada) ---
function evaluatePlay() {
    let totalScore = 0;
    let esCandidata = false;

    // --- Fase 1: Comprobar la Puerta de Control (Impacto) ---
    for (const id of gateCheckboxes) {
        if (document.getElementById(id).checked) {
            esCandidata = true;
            break; // Basta con que una esté marcada
        }
    }

    if (!esCandidata) {
        // Si no es candidata, el resultado es automático
        showResult(0, "NO (Jugada Neutra)", "No se marcó ningún 'Impacto Positivo' (Sección 1). La jugada es irrelevante.");
        return;
    }

    // --- Fase 2: Calcular Puntuación Total ---
    for (const id of allCheckboxes) {
        const checkbox = document.getElementById(id);
        if (checkbox.checked) {
            // 'dataset.score' obtiene el atributo 'data-score' del HTML
            totalScore += parseInt(checkbox.dataset.score, 10);
        }
    }

    // --- Fase 3: Aplicar Umbral y Mostrar Resultado ---
    if (totalScore >= UMBRAL_BUENA_JUGADA) {
        showResult(totalScore, "SÍ (Buena Jugada)", `La puntuación supera el umbral de ${UMBRAL_BUENA_JUGADA}. Los aspectos positivos superan a los negativos.`);
    } else {
        showResult(totalScore, "NO (Acción Anulada)", `La puntuación no alcanza el umbral de ${UMBRAL_BUENA_JUGADA}. Los costes o errores anulan el impacto positivo.`);
    }
}

// --- 5. Función Auxiliar para Mostrar Resultado ---
function showResult(score, resultado, explicacion) {
    resultadoFinalDiv.innerHTML = resultado;
    resultadoScoreDiv.innerHTML = `Puntuación Final: ${score}`;
    resultadoExplicacionDiv.innerHTML = explicacion;

    // Asignar clase CSS para color
    if (resultado.startsWith("SÍ")) {
        resultadoWrapper.className = 'resultado-si';
    } else {
        resultadoWrapper.className = 'resultado-no';
    }
    
    // Mostrar el contenedor del resultado
    resultadoWrapper.style.display = 'block';
}

// --- 6. Asignar Eventos ---
// Nos aseguramos de que los botones existan antes de asignarles eventos
if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
}
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}
if (evaluateBtn) {
    evaluateBtn.addEventListener('click', evaluatePlay);
}
