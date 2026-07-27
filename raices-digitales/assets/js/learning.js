/**
 * RAÍCES DIGITALES - RUTAS DE APRENDIZAJE
 * Módulo de contenido educativo personalizado
 */

// ============================================
// CATÁLOGO DE MÓDULOS DE APRENDIZAJE
// ============================================
const MODULES = [
    // ========================================
    // NIVEL BÁSICO
    // ========================================
    {
        id: 'basico_informacion_1',
        title: 'Introducción a la computadora',
        area: 'information',
        areaLabel: 'Información y datos',
        level: 'basico',
        difficulty: 1,
        description: 'Aprende las partes básicas de una computadora y cómo usarla correctamente.',
        content: `
            <h4>¿Qué es una computadora?</h4>
            <p>Una computadora es una máquina electrónica que procesa información. Está compuesta por dos partes principales:</p>
            <ul>
                <li><strong>Hardware:</strong> Las partes físicas que puedes tocar (pantalla, teclado, mouse, CPU).</li>
                <li><strong>Software:</strong> Los programas que hacen funcionar la computadora (sistema operativo, aplicaciones).</li>
            </ul>
            <h4>Encender y apagar correctamente</h4>
            <p>Siempre utiliza el menú de inicio para apagar la computadora. Nunca la desconectes directamente de la corriente mientras está encendida.</p>
            <h4>El escritorio</h4>
            <p>El escritorio es la pantalla principal que ves al encender la computadora. Aquí encontrarás íconos, carpetas y accesos directos a tus programas.</p>
        `,
        tips: [
            'Mantén tu computadora limpia y en un lugar ventilado.',
            'No instales programas de fuentes desconocidas.',
            'Crea una contraseña segura para tu usuario.'
        ],
        resources: [
            { type: 'video', title: 'Video: Introducción a la computadora', url: '#' },
            { type: 'article', title: 'Artículo: Partes de una computadora', url: '#' }
        ]
    },
    {
        id: 'basico_informacion_2',
        title: 'Navegación web básica',
        area: 'information',
        areaLabel: 'Información y datos',
        level: 'basico',
        difficulty: 1,
        description: 'Aprende a usar el navegador web para buscar información en internet.',
        content: `
            <h4>¿Qué es un navegador web?</h4>
            <p>Un navegador es un programa que te permite ver páginas web. Ejemplos: Chrome, Firefox, Edge.</p>
            <h4>Partes del navegador</h4>
            <ul>
                <li><strong>Barra de direcciones:</strong> Aquí escribes la dirección web (URL) o la palabra que quieres buscar.</li>
                <li><strong>Pestañas:</strong> Te permiten tener varias páginas abiertas al mismo tiempo.</li>
                <li><strong>Botones de navegación:</strong> Atrás, adelante, actualizar, inicio.</li>
            </ul>
            <h4>Búsquedas simples</h4>
            <p>Escribe palabras clave en la barra de búsqueda. Ejemplo: "recetas de cocina" o "clima en mi ciudad".</p>
            <p>Los resultados se muestran como una lista de enlaces. Haz clic en ellos para visitar la página.</p>
        `,
        tips: [
            'Usa palabras clave específicas para mejores resultados.',
            'Evita hacer clic en anuncios sospechosos.',
            'Cierra las pestañas que no uses para no confundirte.'
        ],
        resources: [
            { type: 'video', title: 'Video: Cómo usar un navegador', url: '#' },
            { type: 'article', title: 'Guía de búsqueda en internet', url: '#' }
        ]
    },
    {
        id: 'basico_comunicacion_1',
        title: 'Uso del correo electrónico',
        area: 'communication',
        areaLabel: 'Comunicación y colaboración',
        level: 'basico',
        difficulty: 1,
        description: 'Aprende a crear y usar una cuenta de correo electrónico.',
        content: `
            <h4>¿Qué es el correo electrónico?</h4>
            <p>El correo electrónico (email) es un servicio digital que te permite enviar y recibir mensajes a través de internet.</p>
            <h4>Crear una cuenta de correo</h4>
            <p>Puedes crear una cuenta gratuita en servicios como Gmail, Outlook o Yahoo. Necesitarás:</p>
            <ul>
                <li>Un nombre de usuario (ej: tu.nombre@gmail.com)</li>
                <li>Una contraseña segura</li>
                <li>Información de recuperación (número de teléfono o correo alternativo)</li>
            </ul>
            <h4>Estructura de un correo</h4>
            <ul>
                <li><strong>Para:</strong> Dirección del destinatario.</li>
                <li><strong>Asunto:</strong> Breve descripción del mensaje.</li>
                <li><strong>Cuerpo:</strong> El mensaje que quieres enviar.</li>
                <li><strong>Adjuntos:</strong> Archivos que puedes enviar junto al correo.</li>
            </ul>
        `,
        tips: [
            'Revisa el correo electrónico antes de enviarlo.',
            'No abras archivos adjuntos de remitentes desconocidos.',
            'Usa un asunto claro y descriptivo.'
        ],
        resources: [
            { type: 'video', title: 'Video: Crear una cuenta de Gmail', url: '#' },
            { type: 'article', title: 'Manual de correo electrónico', url: '#' }
        ]
    },
    {
        id: 'basico_seguridad_1',
        title: 'Seguridad básica: contraseñas',
        area: 'security',
        areaLabel: 'Seguridad',
        level: 'basico',
        difficulty: 1,
        description: 'Aprende a crear contraseñas seguras y proteger tus cuentas.',
        content: `
            <h4>¿Por qué son importantes las contraseñas?</h4>
            <p>Las contraseñas son la primera línea de defensa para proteger tu información personal en internet.</p>
            <h4>Características de una contraseña segura</h4>
            <ul>
                <li><strong>Longitud:</strong> Al menos 8 caracteres.</li>
                <li><strong>Combinación:</strong> Letras mayúsculas, minúsculas, números y símbolos.</li>
                <li><strong>Única:</strong> No uses la misma contraseña en diferentes cuentas.</li>
                <li><strong>Personal:</strong> No uses información personal como tu fecha de nacimiento.</li>
            </ul>
            <h4>Ejemplo de contraseña segura</h4>
            <p><code>MiGato2024!EsGenial</code> - Esta contraseña es larga, combina mayúsculas, minúsculas, números y símbolos.</p>
        `,
        tips: [
            'Usa un administrador de contraseñas para recordarlas.',
            'Cambia tus contraseñas cada 3-6 meses.',
            'Nunca compartas tus contraseñas con nadie.'
        ],
        resources: [
            { type: 'video', title: 'Video: Cómo crear una contraseña segura', url: '#' },
            { type: 'article', title: 'Guía de seguridad digital', url: '#' }
        ]
    },

    // ========================================
    // NIVEL INTERMEDIO
    // ========================================
    {
        id: 'intermedio_informacion_1',
        title: 'Evaluación de fuentes de información',
        area: 'information',
        areaLabel: 'Información y datos',
        level: 'intermedio',
        difficulty: 2,
        description: 'Aprende a identificar fuentes confiables y evitar información falsa.',
        content: `
            <h4>¿Cómo saber si una fuente es confiable?</h4>
            <p>No toda la información en internet es verdadera. Para evaluar una fuente, pregúntate:</p>
            <ul>
                <li><strong>¿Quién es el autor?</strong> ¿Es un experto en el tema?</li>
                <li><strong>¿Cuándo fue publicada?</strong> ¿La información está actualizada?</li>
                <li><strong>¿Cuál es la fuente?</strong> ¿Es un sitio web reconocido, un periódico, una institución?</li>
                <li><strong>¿Tiene referencias?</strong> ¿Cita otras fuentes confiables?</li>
            </ul>
            <h4>Señales de desinformación</h4>
            <ul>
                <li>Titulares exagerados o sensacionalistas.</li>
                <li>Falta de autor o fecha de publicación.</li>
                <li>Diseño poco profesional o con muchos anuncios.</li>
                <li>Información que no puedes verificar en otros sitios.</li>
            </ul>
        `,
        tips: [
            'Contrasta la información con al menos 2-3 fuentes diferentes.',
            'Verifica las fechas de publicación.',
            'Usa sitios oficiales para temas de salud, gobierno o educación.'
        ],
        resources: [
            { type: 'video', title: 'Video: Cómo identificar fake news', url: '#' },
            { type: 'article', title: 'Guía de verificación de información', url: '#' }
        ]
    },
    {
        id: 'intermedio_comunicacion_1',
        title: 'Herramientas de colaboración en línea',
        area: 'communication',
        areaLabel: 'Comunicación y colaboración',
        level: 'intermedio',
        difficulty: 2,
        description: 'Aprende a usar Google Drive para trabajar en equipo.',
        content: `
            <h4>¿Qué es Google Drive?</h4>
            <p>Google Drive es un servicio de almacenamiento en la nube que te permite guardar, compartir y editar archivos desde cualquier dispositivo.</p>
            <h4>Herramientas principales</h4>
            <ul>
                <li><strong>Google Docs:</strong> Crear y editar documentos de texto en línea.</li>
                <li><strong>Google Sheets:</strong> Crear y editar hojas de cálculo.</li>
                <li><strong>Google Slides:</strong> Crear y editar presentaciones.</li>
                <li><strong>Google Forms:</strong> Crear encuestas y formularios.</li>
            </ul>
            <h4>Cómo colaborar en tiempo real</h4>
            <p>Varias personas pueden editar el mismo documento al mismo tiempo. Los cambios se guardan automáticamente y puedes ver quién está editando en tiempo real.</p>
            <p>Comparte el archivo con otros usando el botón "Compartir" y eligiendo el nivel de acceso (editar, comentar, ver).</p>
        `,
        tips: [
            'Usa comentarios para dar retroalimentación a tus compañeros.',
            'Organiza tus archivos en carpetas por proyecto.',
            'Aprovecha el historial de versiones para recuperar cambios anteriores.'
        ],
        resources: [
            { type: 'video', title: 'Video: Google Drive para principiantes', url: '#' },
            { type: 'article', title: 'Manual de Google Docs', url: '#' }
        ]
    },
    {
        id: 'intermedio_contenido_1',
        title: 'Creación de presentaciones digitales',
        area: 'content',
        areaLabel: 'Creación de contenido digital',
        level: 'intermedio',
        difficulty: 2,
        description: 'Aprende a crear presentaciones profesionales con Google Slides.',
        content: `
            <h4>Estructura de una buena presentación</h4>
            <ul>
                <li><strong>Portada:</strong> Título, autor, fecha, logo.</li>
                <li><strong>Índice:</strong> Muestra la estructura de la presentación.</li>
                <li><strong>Cuerpo:</strong> Desarrolla los temas con claridad.</li>
                <li><strong>Conclusión:</strong> Resumen y cierre.</li>
                <li><strong>Referencias:</strong> Fuentes utilizadas.</li>
            </ul>
            <h4>Consejos de diseño</h4>
            <ul>
                <li>Usa pocas palabras por diapositiva.</li>
                <li>Incluye imágenes que apoyen el mensaje.</li>
                <li>Mantén un diseño consistente (colores, fuentes).</li>
                <li>Evita fondos recargados o colores que dificulten la lectura.</li>
            </ul>
        `,
        tips: [
            'Ensaya tu presentación antes de exponerla.',
            'Usa el modo "Presentar con notas" para tener tus apuntes.',
            'Incluye una diapositiva final con "Preguntas" para fomentar la participación.'
        ],
        resources: [
            { type: 'video', title: 'Video: Cómo usar Google Slides', url: '#' },
            { type: 'article', title: 'Plantillas de presentaciones', url: '#' }
        ]
    },
    {
        id: 'intermedio_seguridad_1',
        title: 'Privacidad en redes sociales',
        area: 'security',
        areaLabel: 'Seguridad',
        level: 'intermedio',
        difficulty: 2,
        description: 'Aprende a proteger tu privacidad en redes sociales.',
        content: `
            <h4>¿Por qué es importante la privacidad?</h4>
            <p>En las redes sociales compartes información personal que puede ser utilizada por terceros. Es importante configurar adecuadamente tus opciones de privacidad.</p>
            <h4>Configuración de privacidad en redes sociales</h4>
            <ul>
                <li><strong>Perfil público o privado:</strong> Configura tu perfil como privado para que solo tus amigos vean tus publicaciones.</li>
                <li><strong>Información personal:</strong> No compartas tu dirección, número de teléfono o información bancaria.</li>
                <li><strong>Etiquetado:</strong> Revisa quién puede etiquetarte y aprueba las etiquetas antes de que aparezcan.</li>
                <li><strong>Publicaciones:</strong> Piensa antes de publicar. Una vez publicado, puede ser difícil de eliminar.</li>
            </ul>
        `,
        tips: [
            'Revisa tus configuraciones de privacidad periódicamente.',
            'No aceptes solicitudes de amistad de personas desconocidas.',
            'Ten cuidado con lo que compartes en historias y estados.'
        ],
        resources: [
            { type: 'video', title: 'Video: Privacidad en Facebook', url: '#' },
            { type: 'article', title: 'Guía de privacidad en redes sociales', url: '#' }
        ]
    },

    // ========================================
    // NIVEL AVANZADO
    // ========================================
    {
        id: 'avanzado_informacion_1',
        title: 'Análisis y visualización de datos',
        area: 'information',
        areaLabel: 'Información y datos',
        level: 'avanzado',
        difficulty: 3,
        description: 'Aprende a interpretar y visualizar datos con herramientas digitales.',
        content: `
            <h4>¿Qué es el análisis de datos?</h4>
            <p>El análisis de datos es el proceso de inspeccionar, limpiar y transformar datos para descubrir información útil.</p>
            <h4>Herramientas de visualización</h4>
            <ul>
                <li><strong>Google Data Studio:</strong> Crea dashboards interactivos.</li>
                <li><strong>Microsoft Power BI:</strong> Herramienta profesional de análisis.</li>
                <li><strong>Tableau:</strong> Plataforma líder en visualización de datos.</li>
                <li><strong>Excel/Google Sheets:</strong> Herramientas básicas con gráficos y tablas dinámicas.</li>
            </ul>
            <h4>Tipos de gráficos</h4>
            <ul>
                <li><strong>Barras:</strong> Comparar categorías.</li>
                <li><strong>Líneas:</strong> Mostrar tendencias en el tiempo.</li>
                <li><strong>Pie:</strong> Mostrar proporciones.</li>
                <li><strong>Dispersión:</strong> Mostrar relaciones entre variables.</li>
            </ul>
        `,
        tips: [
            'Elige el gráfico adecuado para tu tipo de dato.',
            'Mantén los gráficos simples y fáciles de interpretar.',
            'Incluye etiquetas y títulos claros.'
        ],
        resources: [
            { type: 'video', title: 'Video: Introducción a Google Data Studio', url: '#' },
            { type: 'article', title: 'Guía de visualización de datos', url: '#' }
        ]
    },
    {
        id: 'avanzado_seguridad_1',
        title: 'Ciberseguridad y protección avanzada',
        area: 'security',
        areaLabel: 'Seguridad',
        level: 'avanzado',
        difficulty: 3,
        description: 'Aprende sobre ciberseguridad y cómo protegerte de amenazas avanzadas.',
        content: `
            <h4>¿Qué es la ciberseguridad?</h4>
            <p>La ciberseguridad es la práctica de proteger sistemas, redes y programas de ataques digitales.</p>
            <h4>Amenazas comunes</h4>
            <ul>
                <li><strong>Malware:</strong> Software malicioso que infecta tu dispositivo.</li>
                <li><strong>Phishing:</strong> Intentos de obtener información personal haciéndose pasar por una entidad confiable.</li>
                <li><strong>Ransomware:</strong> Secuestra tus archivos y pide un rescate.</li>
                <li><strong>Ingeniería social:</strong> Manipulación de personas para obtener información.</li>
            </ul>
            <h4>Medidas de protección</h4>
            <ul>
                <li>Mantén tu software actualizado.</li>
                <li>Usa autenticación de dos factores (2FA).</li>
                <li>Instala un antivirus confiable.</li>
                <li>No uses redes WiFi públicas sin protección (VPN).</li>
                <li>Haz copias de seguridad regulares de tu información.</li>
            </ul>
        `,
        tips: [
            'Activa las actualizaciones automáticas de software.',
            'Verifica siempre la URL antes de ingresar datos personales.',
            'Desconfía de ofertas demasiado buenas para ser verdad.'
        ],
        resources: [
            { type: 'video', title: 'Video: Conceptos básicos de ciberseguridad', url: '#' },
            { type: 'article', title: 'Guía de ciberseguridad para todos', url: '#' }
        ]
    },
    {
        id: 'avanzado_problemas_1',
        title: 'Resolución avanzada de problemas digitales',
        area: 'problemSolving',
        areaLabel: 'Resolución de problemas',
        level: 'avanzado',
        difficulty: 3,
        description: 'Aprende a resolver problemas complejos con herramientas digitales.',
        content: `
            <h4>Metodología de resolución de problemas</h4>
            <ol>
                <li><strong>Identificar el problema:</strong> Define claramente cuál es el problema.</li>
                <li><strong>Analizar:</strong> Recopila información sobre el problema.</li>
                <li><strong>Generar soluciones:</strong> Piensa en posibles alternativas.</li>
                <li><strong>Seleccionar:</strong> Elige la mejor solución.</li>
                <li><strong>Implementar:</strong> Pon la solución en práctica.</li>
                <li><strong>Evaluar:</strong> Verifica si la solución funcionó.</li>
            </ol>
            <h4>Automatización con herramientas digitales</h4>
            <ul>
                <li><strong>Zapier/Make:</strong> Automatiza tareas entre aplicaciones.</li>
                <li><strong>Google Apps Script:</strong> Crea scripts personalizados para Google Workspace.</li>
                <li><strong>Python:</strong> Lenguaje de programación versátil para automatización.</li>
                <li><strong>Power Automate:</strong> Automatiza flujos de trabajo en Microsoft.</li>
            </ul>
        `,
        tips: [
            'Divide problemas grandes en pequeños pasos.',
            'Documenta tus soluciones para futuras referencias.',
            'Comparte tus conocimientos con la comunidad.'
        ],
        resources: [
            { type: 'video', title: 'Video: Automatización con Zapier', url: '#' },
            { type: 'article', title: 'Guía de resolución de problemas digitales', url: '#' }
        ]
    }
];

// ============================================
// ESTADO DE APRENDIZAJE
// ============================================
let currentFilter = 'all';
let currentUser = null;
let userModules = [];

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.utils.requireAuth()) return;

    currentUser = window.utils.getCurrentUser();

    // Verificar si el usuario tiene diagnóstico completado
    if (!currentUser || !currentUser.diagnosticCompleted) {
        showNoDiagnostic();
        return;
    }

    // Inicializar módulos del usuario
    initializeUserModules();

    // Renderizar módulos
    renderModules();

    // Configurar filtros
    setupFilters();
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Inicializa los módulos del usuario
 */
function initializeUserModules() {
    const users = window.utils.getStorageData('raices_users', []);
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        // Asegurar que progress existe
        if (!users[userIndex].progress) {
            users[userIndex].progress = {
                completedModules: [],
                currentModule: null,
                lastAccess: window.utils.getCurrentDate()
            };
        }

        // Asegurar que completedModules existe
        if (!users[userIndex].progress.completedModules) {
            users[userIndex].progress.completedModules = [];
        }

        currentUser = users[userIndex];
        userModules = MODULES.filter(m => {
            // Obtener nivel del usuario del diagnóstico
            const userLevel = currentUser.diagnosticResults.level.toLowerCase();
            return m.level === userLevel;
        });
    }
}

/**
 * Renderiza los módulos de aprendizaje
 */
function renderModules() {
    const container = document.getElementById('modulesContainer');
    if (!container) return;

    // Actualizar badge de nivel
    updateLevelBadge();

    // Filtrar módulos
    let filteredModules = userModules;
    if (currentFilter !== 'all') {
        filteredModules = userModules.filter(m => m.area === currentFilter);
    }

    if (filteredModules.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;background:var(--color-white);border-radius:var(--radius-lg);border:1px solid var(--color-border);grid-column:1/-1;">
                <i class="fas fa-search" style="font-size:3rem;color:var(--color-border);margin-bottom:16px;"></i>
                <h3>No hay módulos disponibles</h3>
                <p style="color:var(--color-text-light);">
                    ${currentFilter !== 'all' ? 'No hay módulos para esta área. Intenta con otro filtro.' : 'No hay módulos disponibles para tu nivel. Actualiza tu diagnóstico.'}
                </p>
            </div>
        `;
        return;
    }

    // Construir HTML
    let html = `<div class="modules-grid">`;

    filteredModules.forEach(module => {
        const isCompleted = currentUser.progress.completedModules.includes(module.id);
        const areaClass = module.area;

        let stars = '';
        for (let i = 1; i <= 3; i++) {
            stars += `<span class="star ${i <= module.difficulty ? '' : 'empty'}">★</span>`;
        }

        const statusIcon = isCompleted ? 'fa-check-circle' : 'fa-circle';
        const statusClass = isCompleted ? 'completed' : 'pending';
        const statusText = isCompleted ? 'Completado' : 'Pendiente';

        html += `
            <div class="module-card ${isCompleted ? 'completed' : ''}" data-id="${module.id}">
                <span class="module-badge ${areaClass}">${module.areaLabel}</span>
                <h3>${module.title}</h3>
                <p class="module-desc">${module.description}</p>
                <div class="module-meta">
                    <span class="difficulty">${stars}</span>
                    <span class="module-status ${statusClass}">
                        <i class="fas ${statusIcon}"></i> ${statusText}
                    </span>
                </div>
                <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'}" onclick="openModule('${module.id}')">
                    ${isCompleted ? '<i class="fas fa-eye"></i> Ver contenido' : '<i class="fas fa-play"></i> Comenzar módulo'}
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

/**
 * Actualiza el badge de nivel del usuario
 */
function updateLevelBadge() {
    const container = document.getElementById('levelBadgeContainer');
    if (!container) return;

    if (!currentUser || !currentUser.diagnosticResults) {
        container.innerHTML = `
            <span class="level-badge sin-evaluar">
                <i class="fas fa-question-circle"></i> Sin evaluar
            </span>
        `;
        return;
    }

    const level = currentUser.diagnosticResults.level.toLowerCase();
    const emoji = currentUser.diagnosticResults.levelEmoji || '📚';
    const levelClass = currentUser.diagnosticResults.levelClass || 'basico';

    container.innerHTML = `
        <span class="level-badge ${levelClass}">
            ${emoji} Nivel ${currentUser.diagnosticResults.level}
        </span>
    `;
}

/**
 * Configura los filtros de área
 */
function setupFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover activo de todos
            filters.forEach(b => b.classList.remove('active'));
            // Activar el seleccionado
            this.classList.add('active');
            // Actualizar filtro
            currentFilter = this.dataset.filter;
            // Re-renderizar
            renderModules();
        });
    });
}

// ============================================
// MODAL DE DETALLE DEL MÓDULO
// ============================================

/**
 * Abre el modal con el detalle del módulo
 */
function openModule(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const isCompleted = currentUser.progress.completedModules.includes(moduleId);
    const areaClass = module.area;

    const modal = document.getElementById('moduleModal');
    const body = document.getElementById('modalBody');

    // Contenido del modal
    let content = `
        <span class="modal-badge ${areaClass}">${module.areaLabel}</span>
        <h2>${module.title}</h2>
        <p class="modal-desc">${module.description}</p>
        <div class="modal-content-body">
            ${module.content}
        </div>
    `;

    // Tips si existen
    if (module.tips && module.tips.length > 0) {
        content += `
            <h4>💡 Tips prácticos</h4>
            <ul>
                ${module.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    }

    // Recursos si existen
    if (module.resources && module.resources.length > 0) {
        content += `
            <h4>📚 Recursos adicionales</h4>
            <ul>
                ${module.resources.map(r => `<li><i class="fas ${r.type === 'video' ? 'fa-video' : 'fa-file-alt'}"></i> ${r.title}</li>`).join('')}
            </ul>
        `;
    }

    // Acciones
    content += `
        <div class="modal-actions">
            <button class="btn btn-outline" onclick="closeModal()">
                <i class="fas fa-times"></i> Cerrar
            </button>
    `;

    if (!isCompleted) {
        content += `
            <button class="btn btn-success" onclick="completeModule('${module.id}')">
                <i class="fas fa-check"></i> Marcar como completado
            </button>
        `;
    } else {
        content += `
            <button class="btn btn-outline" onclick="uncompleteModule('${module.id}')" style="border-color:#D9534F;color:#D9534F;">
                <i class="fas fa-undo"></i> Desmarcar
            </button>
        `;
    }

    content += `
        </div>
    `;

    body.innerHTML = content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal
 */
function closeModal() {
    const modal = document.getElementById('moduleModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

/**
 * Marca un módulo como completado
 */
function completeModule(moduleId) {
    const users = window.utils.getStorageData('raices_users', []);
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        if (!users[userIndex].progress.completedModules.includes(moduleId)) {
            users[userIndex].progress.completedModules.push(moduleId);
            users[userIndex].progress.lastAccess = window.utils.getCurrentDate();
            window.utils.setStorageData('raices_users', users);

            // Actualizar usuario actual
            currentUser = users[userIndex];

            window.utils.showNotification('¡Módulo completado! 🎉', 'success');

            // Cerrar modal y refrescar
            closeModal();
            renderModules();
        }
    }
}

/**
 * Desmarca un módulo (para pruebas)
 */
function uncompleteModule(moduleId) {
    if (!confirm('¿Estás seguro de que quieres desmarcar este módulo?')) return;

    const users = window.utils.getStorageData('raices_users', []);
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        const index = users[userIndex].progress.completedModules.indexOf(moduleId);
        if (index !== -1) {
            users[userIndex].progress.completedModules.splice(index, 1);
            window.utils.setStorageData('raices_users', users);

            currentUser = users[userIndex];
            window.utils.showNotification('Módulo desmarcado', 'info');

            closeModal();
            renderModules();
        }
    }
}

/**
 * Muestra pantalla cuando no hay diagnóstico
 */
function showNoDiagnostic() {
    const container = document.getElementById('modulesContainer');
    const filters = document.getElementById('filtersContainer');
    const badge = document.getElementById('levelBadgeContainer');

    if (filters) filters.style.display = 'none';
    if (badge) {
        badge.innerHTML = `
            <span class="level-badge sin-evaluar">
                <i class="fas fa-question-circle"></i> Sin evaluar
            </span>
        `;
    }

    if (container) {
        container.innerHTML = `
            <div class="no-diagnostic" style="grid-column:1/-1;">
                <i class="fas fa-clipboard-list"></i>
                <h3>¡Realiza tu diagnóstico primero!</h3>
                <p>
                    Para acceder a tus rutas de aprendizaje personalizadas,
                    necesitas completar el diagnóstico de competencias digitales.
                </p>
                <a href="diagnostic.html" class="btn btn-primary">
                    <i class="fas fa-play"></i> Ir al diagnóstico
                </a>
            </div>
        `;
    }
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.openModule = openModule;
window.closeModal = closeModal;
window.completeModule = completeModule;
window.uncompleteModule = uncompleteModule;