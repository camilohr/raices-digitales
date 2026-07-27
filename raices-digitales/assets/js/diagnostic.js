/**
 * RAÍCES DIGITALES - DIAGNÓSTICO
 * Módulo de evaluación de competencias digitales
 * Basado en DigComp 2.2 (5 áreas)
 */

// ============================================
// BANCO DE PREGUNTAS (10 preguntas)
// ============================================
const QUESTIONS = [
    // Área 1: Información y datos (2 preguntas)
    {
        id: 1,
        area: 'information',
        areaLabel: 'Información y datos',
        text: '¿Qué haces cuando necesitas encontrar información confiable en internet?',
        options: [
            { text: 'Busco en el primer resultado que aparece en Google', value: 1 },
            { text: 'Comparo varias fuentes y verifico quién es el autor', value: 3 },
            { text: 'Pregunto en redes sociales o grupos de WhatsApp', value: 2 }
        ]
    },
    {
        id: 2,
        area: 'information',
        areaLabel: 'Información y datos',
        text: '¿Cómo organizas la información digital que encuentras?',
        options: [
            { text: 'No la guardo, solo la uso en el momento', value: 1 },
            { text: 'Uso carpetas y nombres descriptivos para encontrarla fácilmente', value: 3 },
            { text: 'Solo la descargo en el escritorio sin organización', value: 1 }
        ]
    },

    // Área 2: Comunicación y colaboración (2 preguntas)
    {
        id: 3,
        area: 'communication',
        areaLabel: 'Comunicación y colaboración',
        text: '¿Conoces y utilizas herramientas para trabajar en equipo en línea?',
        options: [
            { text: 'No, solo uso WhatsApp para comunicarme', value: 1 },
            { text: 'Sí, uso Google Docs o Drive para colaborar', value: 3 },
            { text: 'Las he escuchado pero no las he utilizado', value: 2 }
        ]
    },
    {
        id: 4,
        area: 'communication',
        areaLabel: 'Comunicación y colaboración',
        text: '¿Cómo compartes archivos con otras personas?',
        options: [
            { text: 'Por correo electrónico como adjunto', value: 2 },
            { text: 'Uso servicios en la nube como Google Drive o Dropbox', value: 3 },
            { text: 'No comparto archivos digitales', value: 1 }
        ]
    },

    // Área 3: Creación de contenido digital (2 preguntas)
    {
        id: 5,
        area: 'content',
        areaLabel: 'Creación de contenido digital',
        text: '¿Has creado algún documento o presentación digital?',
        options: [
            { text: 'No, nunca lo he hecho', value: 1 },
            { text: 'Sí, he creado documentos simples en Word o similar', value: 2 },
            { text: 'Sí, creo contenido multimedia (presentaciones, infografías, etc.)', value: 3 }
        ]
    },
    {
        id: 6,
        area: 'content',
        areaLabel: 'Creación de contenido digital',
        text: '¿Sabes cómo modificar o editar una imagen o video?',
        options: [
            { text: 'No sé hacerlo', value: 1 },
            { text: 'Sé hacer ajustes básicos como recortar o cambiar tamaño', value: 2 },
            { text: 'Uso herramientas de edición profesional o avanzada', value: 3 }
        ]
    },

    // Área 4: Seguridad (2 preguntas)
    {
        id: 7,
        area: 'security',
        areaLabel: 'Seguridad',
        text: '¿Qué prácticas usas para proteger tus contraseñas?',
        options: [
            { text: 'Uso la misma contraseña para todas mis cuentas', value: 1 },
            { text: 'Uso contraseñas diferentes y seguras para cada cuenta', value: 3 },
            { text: 'Las guardo en un archivo o en mi computadora sin protección', value: 1 }
        ]
    },
    {
        id: 8,
        area: 'security',
        areaLabel: 'Seguridad',
        text: '¿Sabes identificar un correo electrónico de phishing (fraude)?',
        options: [
            { text: 'No sé qué es el phishing', value: 1 },
            { text: 'Sí, puedo identificar correos sospechosos por su contenido', value: 3 },
            { text: 'Solo si tiene errores de ortografía muy evidentes', value: 2 }
        ]
    },

    // Área 5: Resolución de problemas (2 preguntas)
    {
        id: 9,
        area: 'problemSolving',
        areaLabel: 'Resolución de problemas',
        text: '¿Qué haces cuando una herramienta digital no funciona como esperabas?',
        options: [
            { text: 'Dejo de usarla y busco otra alternativa', value: 1 },
            { text: 'Busco soluciones en tutoriales, foros o el centro de ayuda', value: 3 },
            { text: 'Le pregunto a alguien que sepa más que yo', value: 2 }
        ]
    },
    {
        id: 10,
        area: 'problemSolving',
        areaLabel: 'Resolución de problemas',
        text: '¿Has utilizado herramientas digitales para resolver problemas cotidianos?',
        options: [
            { text: 'No, nunca las he usado para eso', value: 1 },
            { text: 'Sí, para hacer cálculos, buscar información o planificar', value: 2 },
            { text: 'Sí, automatizo tareas y optimizo procesos con herramientas digitales', value: 3 }
        ]
    }
];

// ============================================
// ESTADO DEL DIAGNÓSTICO
// ============================================
const state = {
    currentQuestion: 0,
    answers: {},
    totalQuestions: QUESTIONS.length,
    started: false,
    completed: false
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.utils.requireAuth()) return;

    const user = window.utils.getCurrentUser();

    // Si el usuario ya completó el diagnóstico, mostrar resultados
    if (user && user.diagnosticCompleted && user.diagnosticResults) {
        showResults(user.diagnosticResults);
        document.getElementById('resetButtonContainer').style.display = 'block';
        return;
    }

    // Iniciar diagnóstico
    initDiagnostic();
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Inicializa el diagnóstico
 */
function initDiagnostic() {
    state.currentQuestion = 0;
    state.answers = {};
    state.completed = false;
    state.started = true;

    // Mostrar progreso
    updateProgress();

    // Renderizar primera pregunta
    renderQuestion(0);
}

/**
 * Renderiza una pregunta específica
 */
function renderQuestion(index) {
    const container = document.getElementById('questionsContainer');
    if (!container) return;

    if (index >= state.totalQuestions) {
        // Todas las preguntas respondidas, mostrar resultados
        calculateResults();
        return;
    }

    const question = QUESTIONS[index];
    const answered = state.answers[question.id] !== undefined;

    // Crear HTML de la pregunta
    const letters = ['A', 'B', 'C'];

    let html = `
        <div class="question-card active">
            <div class="question-meta">
                <span class="question-area">
                    <i class="fas fa-tag"></i> ${question.areaLabel}
                </span>
                <span class="question-number">Pregunta ${index + 1} de ${state.totalQuestions}</span>
            </div>
            <div class="question-text">${question.text}</div>
            <div class="options-group">
    `;

    question.options.forEach((option, optIndex) => {
        const isSelected = answered && state.answers[question.id] === optIndex;
        html += `
            <div class="option-item ${isSelected ? 'selected' : ''}"
                 data-question="${question.id}"
                 data-option="${optIndex}"
                 onclick="selectOption(${question.id}, ${optIndex})">
                <span class="option-letter">${letters[optIndex]}</span>
                <span class="option-label">${option.text}</span>
                <div class="option-radio"></div>
            </div>
        `;
    });

    html += `
            </div>
            <div class="question-nav">
                <button class="btn btn-outline btn-sm" onclick="prevQuestion()" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Anterior
                </button>
                <div class="dots">
    `;

    // Dots de progreso
    for (let i = 0; i < state.totalQuestions; i++) {
        let cls = 'dot';
        if (i === index) cls += ' active';
        else if (state.answers[QUESTIONS[i].id] !== undefined) cls += ' completed';
        html += `<span class="${cls}"></span>`;
    }

    html += `
                </div>
                <button class="btn btn-primary btn-sm" onclick="nextQuestion()" ${!answered ? 'disabled' : ''}>
                    ${index === state.totalQuestions - 1 ? 'Ver resultados' : 'Siguiente'} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Actualizar progreso
    updateProgress();

    // Desplazarse al inicio de la pregunta en móvil
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Selecciona una opción
 */
function selectOption(questionId, optionIndex) {
    // Guardar respuesta
    state.answers[questionId] = optionIndex;

    // Actualizar UI
    const container = document.getElementById('questionsContainer');
    const items = container.querySelectorAll('.option-item');
    items.forEach(item => {
        const qId = parseInt(item.dataset.question);
        const optIdx = parseInt(item.dataset.option);
        if (qId === questionId) {
            item.classList.toggle('selected', optIdx === optionIndex);
        }
    });

    // Habilitar botón siguiente
    const nextBtn = container.querySelector('.question-nav .btn-primary');
    if (nextBtn) {
        nextBtn.disabled = false;
    }

    // Actualizar dots
    const dots = container.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (state.answers[QUESTIONS[i].id] !== undefined) {
            dot.classList.add('completed');
        }
    });

    // Si es la última pregunta, cambiar texto del botón
    if (state.currentQuestion === state.totalQuestions - 1) {
        const btn = container.querySelector('.question-nav .btn-primary');
        if (btn) {
            const allAnswered = state.totalQuestions === Object.keys(state.answers).length;
            btn.innerHTML = allAnswered ? '<i class="fas fa-check"></i> Ver resultados' : 'Siguiente <i class="fas fa-arrow-right"></i>';
            btn.disabled = !allAnswered;
        }
    }
}

/**
 * Ir a la siguiente pregunta
 */
function nextQuestion() {
    const current = state.currentQuestion;
    const question = QUESTIONS[current];

    // Verificar si la pregunta actual tiene respuesta
    if (state.answers[question.id] === undefined) {
        window.utils.showNotification('Por favor selecciona una opción', 'warning');
        return;
    }

    if (current < state.totalQuestions - 1) {
        state.currentQuestion++;
        renderQuestion(state.currentQuestion);
    } else {
        // Todas las preguntas respondidas, calcular resultados
        calculateResults();
    }
}

/**
 * Ir a la pregunta anterior
 */
function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion(state.currentQuestion);
    }
}

/**
 * Actualiza la barra de progreso
 */
function updateProgress() {
    const answered = Object.keys(state.answers).length;
    const total = state.totalQuestions;
    const percentage = Math.round((answered / total) * 100);

    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const percent = document.getElementById('progressPercentage');

    if (fill) fill.style.width = percentage + '%';
    if (label) {
        if (answered === total) {
            label.textContent = '¡Diagnóstico completado!';
        } else {
            label.textContent = `Pregunta ${state.currentQuestion + 1} de ${total}`;
        }
    }
    if (percent) percent.textContent = percentage + '%';
}

// ============================================
// CÁLCULO DE RESULTADOS
// ============================================

/**
 * Calcula los resultados del diagnóstico
 */
function calculateResults() {
    const totalQuestions = state.totalQuestions;

    // Verificar que todas las preguntas estén respondidas
    if (Object.keys(state.answers).length !== totalQuestions) {
        window.utils.showNotification('Por favor responde todas las preguntas', 'warning');
        return;
    }

    // Calcular puntaje por área
    const areaScores = {};
    const areaCounts = {};

    QUESTIONS.forEach((q, index) => {
        const answerIndex = state.answers[q.id];
        if (answerIndex !== undefined) {
            const value = q.options[answerIndex].value;
            if (!areaScores[q.area]) {
                areaScores[q.area] = 0;
                areaCounts[q.area] = 0;
            }
            areaScores[q.area] += value;
            areaCounts[q.area]++;
        }
    });

    // Calcular promedio por área (sobre 6 puntos máximo = 2 preguntas * 3 puntos)
    const areaAverages = {};
    let totalScore = 0;
    let maxPossible = 0;

    for (const [area, score] of Object.entries(areaScores)) {
        const count = areaCounts[area];
        const maxAreaScore = count * 3;
        areaAverages[area] = {
            score: score,
            max: maxAreaScore,
            percentage: Math.round((score / maxAreaScore) * 100)
        };
        totalScore += score;
        maxPossible += maxAreaScore;
    }

    // Calcular nivel general
    const totalPercentage = Math.round((totalScore / maxPossible) * 100);
    let level, levelClass, levelEmoji;

    if (totalPercentage >= 66) {
        level = 'Avanzado';
        levelClass = 'avanzado';
        levelEmoji = '🚀';
    } else if (totalPercentage >= 40) {
        level = 'Intermedio';
        levelClass = 'intermedio';
        levelEmoji = '📈';
    } else {
        level = 'Básico';
        levelClass = 'basico';
        levelEmoji = '🌱';
    }

    // Mapeo de áreas a nombres legibles
    const areaLabels = {
        information: 'Información y datos',
        communication: 'Comunicación y colaboración',
        content: 'Creación de contenido digital',
        security: 'Seguridad',
        problemSolving: 'Resolución de problemas'
    };

    // Construir objeto de resultados
    const results = {
        date: window.utils.getCurrentDate(),
        scores: areaAverages,
        totalScore: totalScore,
        maxPossible: maxPossible,
        totalPercentage: totalPercentage,
        level: level,
        levelClass: levelClass,
        levelEmoji: levelEmoji,
        areaLabels: areaLabels,
        answers: state.answers
    };

    // Guardar en el usuario
    saveResults(results);

    // Mostrar resultados
    showResults(results);
}

/**
 * Guarda los resultados en el perfil del usuario
 */
function saveResults(results) {
    const user = window.utils.getCurrentUser();
    if (!user) return;

    const users = window.utils.getStorageData('raices_users', []);
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        users[userIndex].diagnosticCompleted = true;
        users[userIndex].diagnosticResults = results;

        // Inicializar progreso si no existe
        if (!users[userIndex].progress) {
            users[userIndex].progress = {
                completedModules: [],
                currentModule: null,
                lastAccess: window.utils.getCurrentDate()
            };
        }

        window.utils.setStorageData('raices_users', users);

        // Actualizar sesión
        const session = window.utils.getStorageData('raices_session');
        if (session) {
            session.userId = user.id;
            window.utils.setStorageData('raices_session', session);
        }

        window.utils.showNotification('¡Diagnóstico completado con éxito! 🎉', 'success');
    }
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================

/**
 * Muestra la pantalla de resultados
 */
function showResults(results) {
    // Ocultar preguntas, mostrar resultados
    document.getElementById('questionsContainer').innerHTML = '';
    document.getElementById('resetButtonContainer').style.display = 'block';

    const container = document.getElementById('resultsContainer');
    if (!container) return;

    const areaLabels = results.areaLabels || {};
    const scores = results.scores || {};

    // Generar HTML de áreas
    let areasHtml = '';
    const areaKeys = Object.keys(scores);

    areaKeys.forEach(area => {
        const data = scores[area];
        const label = areaLabels[area] || area;
        const percentage = data.percentage || 0;
        areasHtml += `
            <div class="results-area">
                <div class="area-name">
                    <span>${label}</span>
                    <span class="area-score">${data.score}/${data.max}</span>
                </div>
                <div class="area-bar">
                    <div class="fill" style="width:${percentage}%;"></div>
                </div>
            </div>
        `;
    });

    // Si no hay áreas, mostrar mensaje
    if (!areasHtml) {
        areasHtml = '<p style="text-align:center;color:var(--color-text-light);">No se pudieron calcular los resultados</p>';
    }

    container.innerHTML = `
        <div class="results-header">
            <div class="icon">${results.levelEmoji || '📊'}</div>
            <h2>¡Diagnóstico completado!</h2>
            <p class="subtitle">Estos son tus resultados en competencias digitales</p>
            <div class="results-level ${results.levelClass || 'basico'}">
                Nivel <strong>${results.level || 'Sin evaluar'}</strong>
            </div>
            <p style="color:var(--color-text-light);font-size:0.95rem;">
                Puntaje total: ${results.totalScore || 0}/${results.maxPossible || 30}
                (${results.totalPercentage || 0}%)
            </p>
        </div>
        <div class="results-grid">
            ${areasHtml}
        </div>
        <div style="text-align:center;padding:16px;background:var(--color-background);border-radius:var(--radius);margin-top:8px;">
            <p style="font-size:0.95rem;color:var(--color-text-light);">
                <i class="fas fa-lightbulb" style="color:var(--color-primary);"></i>
                Basado en el marco DigComp 2.2 de la Comisión Europea
            </p>
        </div>
        <div class="results-actions">
            <a href="dashboard.html" class="btn btn-primary">
                <i class="fas fa-th-large"></i> Ir al Dashboard
            </a>
            <a href="learning.html" class="btn btn-success">
                <i class="fas fa-route"></i> Ver rutas de aprendizaje
            </a>
        </div>
    `;

    container.classList.add('active');

    // Actualizar barra de progreso a 100%
    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const percent = document.getElementById('progressPercentage');
    if (fill) fill.style.width = '100%';
    if (label) label.textContent = '¡Diagnóstico completado!';
    if (percent) percent.textContent = '100%';

    // Desplazarse a los resultados
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// REINICIAR DIAGNÓSTICO
// ============================================

/**
 * Reinicia el diagnóstico (limpia respuestas y resultados)
 */
function resetDiagnostic() {
    if (!confirm('¿Estás seguro de que quieres reiniciar el diagnóstico? Se perderán tus respuestas actuales.')) {
        return;
    }

    const user = window.utils.getCurrentUser();
    if (!user) return;

    // Limpiar diagnóstico del usuario
    const users = window.utils.getStorageData('raices_users', []);
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        users[userIndex].diagnosticCompleted = false;
        users[userIndex].diagnosticResults = null;
        window.utils.setStorageData('raices_users', users);
    }

    // Reiniciar estado
    state.currentQuestion = 0;
    state.answers = {};
    state.completed = false;

    // Ocultar resultados, mostrar preguntas
    document.getElementById('resultsContainer').classList.remove('active');
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('resetButtonContainer').style.display = 'none';

    // Reiniciar progreso
    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const percent = document.getElementById('progressPercentage');
    if (fill) fill.style.width = '0%';
    if (label) label.textContent = 'Pregunta 1 de 10';
    if (percent) percent.textContent = '0%';

    // Renderizar primera pregunta
    renderQuestion(0);

    window.utils.showNotification('Diagnóstico reiniciado', 'info');
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.resetDiagnostic = resetDiagnostic;