/**
 * RAÍCES DIGITALES - DASHBOARD (MEJORADO)
 * Panel de control con estadísticas y progreso
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.utils.requireAuth()) return;

    // Cargar datos del usuario
    loadDashboard();
});

function loadDashboard() {
    const user = window.utils.getCurrentUser();
    if (!user) return;

    // --- Actualizar header ---
    updateHeader(user);

    // --- Diagnostic card ---
    updateDiagnosticCard(user);

    // --- Progreso por áreas ---
    updateAreaProgress(user);

    // --- Progreso general de módulos ---
    updateModuleProgress(user);

    // --- Actividad reciente ---
    updateRecentActivity(user);

    // --- Recomendaciones ---
    updateRecommendations(user);

    // --- Estadísticas rápidas ---
    updateQuickStats(user);
}

/**
 * Actualiza el header del dashboard
 */
function updateHeader(user) {
    const header = document.getElementById('dashboardHeader');
    if (!header) return;

    // Obtener iniciales del nombre (para el avatar)
    const initials = user.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');

    const level = user.diagnosticResults ? user.diagnosticResults.level : 'Sin evaluar';
    const levelEmoji = user.diagnosticResults ? user.diagnosticResults.levelEmoji : '📚';

    // Calcular progreso general para mostrar en el badge
    let progressPercentage = 0;
    if (user.diagnosticCompleted && user.progress) {
        const totalModules = MODULES.filter(m => m.level === user.diagnosticResults.level.toLowerCase()).length;
        const completed = user.progress.completedModules ? user.progress.completedModules.length : 0;
        progressPercentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    }

    header.innerHTML = `
        <div>
            <h1>¡Hola, <span>${user.name}</span>! 👋</h1>
            <p style="color:var(--color-text-light);font-size:0.95rem;margin-top:4px;">
                <i class="fas fa-calendar-alt" style="color:var(--color-primary);"></i>
                Último acceso: ${user.progress?.lastAccess ? window.utils.formatTimeAgo(user.progress.lastAccess) : 'Hoy'}
            </p>
        </div>
        <div class="user-badge">
            <div class="avatar">${initials}</div>
            <div>
                <div class="user-name">${user.name}</div>
                <div class="user-level">
                    ${levelEmoji} ${level}
                    ${user.diagnosticCompleted ? `• ${progressPercentage}% completado` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Actualiza la tarjeta de diagnóstico
 */
function updateDiagnosticCard(user) {
    const diagnosticContent = document.getElementById('diagnosticContent');
    if (!diagnosticContent) return;

    if (user.diagnosticCompleted && user.diagnosticResults) {
        const results = user.diagnosticResults;
        const levelEmoji = results.levelEmoji || '📊';

        // Calcular número de módulos disponibles para este nivel
        const userLevel = results.level.toLowerCase();
        const totalModules = MODULES.filter(m => m.level === userLevel).length;
        const completedModules = user.progress?.completedModules?.length || 0;

        diagnosticContent.innerHTML = `
            <div class="diagnostic-status" style="background: rgba(45, 106, 79, 0.08);">
                <div class="status-icon">✅</div>
                <div class="status-text">
                    <h4>Diagnóstico completado ${levelEmoji}</h4>
                    <p>
                        Nivel: <strong>${results.level}</strong> • 
                        Puntaje: ${results.totalScore}/${results.maxPossible} • 
                        ${results.totalPercentage}%
                    </p>
                    <p style="font-size:0.85rem;color:var(--color-text-light);margin-top:2px;">
                        <i class="fas fa-book"></i> ${completedModules} de ${totalModules} módulos completados
                    </p>
                </div>
                <a href="diagnostic.html" class="btn btn-outline btn-sm">Ver detalles</a>
            </div>
        `;
    } else {
        diagnosticContent.innerHTML = `
            <div class="diagnostic-status">
                <div class="status-icon">📋</div>
                <div class="status-text">
                    <h4>Diagnóstico pendiente</h4>
                    <p>Realiza tu evaluación inicial para conocer tu nivel y desbloquear rutas personalizadas</p>
                </div>
                <a href="diagnostic.html" class="btn btn-primary btn-sm">
                    <i class="fas fa-play"></i> Comenzar
                </a>
            </div>
        `;
    }
}

/**
 * Actualiza el progreso por áreas (con datos del diagnóstico)
 */
function updateAreaProgress(user) {
    const progressContent = document.getElementById('progressContent');
    if (!progressContent) return;

    const areas = [
        { id: 'information', label: 'Información y datos', icon: 'fa-database' },
        { id: 'communication', label: 'Comunicación y colaboración', icon: 'fa-comments' },
        { id: 'content', label: 'Creación de contenido', icon: 'fa-pen-fancy' },
        { id: 'security', label: 'Seguridad', icon: 'fa-shield-alt' },
        { id: 'problemSolving', label: 'Resolución de problemas', icon: 'fa-lightbulb' }
    ];

    if (user.diagnosticCompleted && user.diagnosticResults) {
        const scores = user.diagnosticResults.scores || {};
        let html = '';
        areas.forEach(area => {
            const score = scores[area.id] || 0;
            const maxScore = 6;
            const percentage = Math.min(Math.round((score / maxScore) * 100), 100);

            // Determinar color según porcentaje
            let color = '#D9534F';
            if (percentage >= 70) color = '#2D8B4E';
            else if (percentage >= 40) color = '#F0AD4E';

            html += `
                <div class="progress-item">
                    <div class="progress-label">
                        <span><i class="fas ${area.icon}" style="color:var(--color-primary);width:18px;"></i> ${area.label}</span>
                        <span>${score}/${maxScore}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%;background:${color};"></div>
                    </div>
                </div>
            `;
        });

        // Añadir progreso general de módulos
        const userLevel = user.diagnosticResults.level.toLowerCase();
        const totalModules = MODULES.filter(m => m.level === userLevel).length;
        const completedModules = user.progress?.completedModules?.length || 0;
        const modulePercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

        html += `
            <div style="margin-top:16px;padding-top:16px;border-top:2px solid var(--color-border);">
                <div class="progress-item">
                    <div class="progress-label">
                        <span><i class="fas fa-route" style="color:var(--color-primary);width:18px;"></i> Progreso general</span>
                        <span>${completedModules}/${totalModules} módulos</span>
                    </div>
                    <div class="progress-bar" style="height:12px;">
                        <div class="progress-fill" style="width: ${modulePercentage}%;background:linear-gradient(90deg, var(--color-primary-light), var(--color-primary));"></div>
                    </div>
                </div>
            </div>
        `;

        progressContent.innerHTML = html;
    } else {
        progressContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-simple"></i>
                <h4>Sin datos de progreso</h4>
                <p>Completa el diagnóstico para ver tu progreso por áreas</p>
            </div>
        `;
    }
}

/**
 * Actualiza el progreso de módulos (versión compacta en sidebar)
 */
function updateModuleProgress(user) {
    const moduleProgressContainer = document.getElementById('moduleProgressContent');
    if (!moduleProgressContainer) return;

    if (!user.diagnosticCompleted || !user.diagnosticResults) {
        moduleProgressContainer.innerHTML = `
            <div class="empty-state" style="padding:20px 0;">
                <i class="fas fa-book" style="font-size:1.5rem;"></i>
                <h4 style="font-size:0.95rem;">Sin módulos</h4>
                <p style="font-size:0.85rem;">Completa el diagnóstico primero</p>
            </div>
        `;
        return;
    }

    const userLevel = user.diagnosticResults.level.toLowerCase();
    const availableModules = MODULES.filter(m => m.level === userLevel);
    const completedModules = user.progress?.completedModules || [];

    if (availableModules.length === 0) {
        moduleProgressContainer.innerHTML = `
            <div class="empty-state" style="padding:20px 0;">
                <i class="fas fa-book" style="font-size:1.5rem;"></i>
                <h4 style="font-size:0.95rem;">Sin módulos disponibles</h4>
                <p style="font-size:0.85rem;">No hay módulos para tu nivel actual</p>
            </div>
        `;
        return;
    }

    let html = `<ul class="activity-list" style="max-height:200px;overflow-y:auto;">`;
    // Mostrar solo los primeros 4 módulos
    const displayModules = availableModules.slice(0, 4);
    displayModules.forEach(module => {
        const isCompleted = completedModules.includes(module.id);
        const icon = isCompleted ? 'fa-check-circle' : 'fa-circle';
        const color = isCompleted ? '#2D8B4E' : 'var(--color-border)';

        html += `
            <li style="justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
                    <i class="fas ${icon}" style="color:${color};flex-shrink:0;"></i>
                    <span style="font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${module.title}</span>
                </div>
                <span style="font-size:0.75rem;color:var(--color-text-light);flex-shrink:0;">
                    ${isCompleted ? '✅' : '⏳'}
                </span>
            </li>
        `;
    });

    if (availableModules.length > 4) {
        html += `
            <li style="text-align:center;padding:8px 0;border-bottom:none;font-size:0.85rem;color:var(--color-text-light);">
                <a href="learning.html" style="color:var(--color-primary);font-weight:600;">Ver todos (${availableModules.length} módulos)</a>
            </li>
        `;
    }

    html += `</ul>`;
    moduleProgressContainer.innerHTML = html;
}

/**
 * Actualiza la actividad reciente
 */
function updateRecentActivity(user) {
    const recentContent = document.getElementById('recentActivityContent');
    if (!recentContent) return;

    const activities = [];

    // Registro
    activities.push({
        icon: 'fa-user-plus',
        text: 'Te registraste en Raíces Digitales',
        date: user.createdAt ? window.utils.formatTimeAgo(user.createdAt) : 'Reciente',
        priority: 1
    });

    // Diagnóstico
    if (user.diagnosticCompleted) {
        activities.push({
            icon: 'fa-clipboard-check',
            text: `Completaste tu diagnóstico - Nivel ${user.diagnosticResults.level}`,
            date: user.diagnosticResults.date ? window.utils.formatTimeAgo(user.diagnosticResults.date) : 'Reciente',
            priority: 2
        });
    }

    // Módulos completados
    if (user.progress && user.progress.completedModules && user.progress.completedModules.length > 0) {
        const count = user.progress.completedModules.length;
        const moduleNames = user.progress.completedModules.slice(-3).map(id => {
            const mod = MODULES.find(m => m.id === id);
            return mod ? mod.title : id;
        });

        activities.push({
            icon: 'fa-check-circle',
            text: `Completaste ${count} módulo${count > 1 ? 's' : ''}: ${moduleNames.join(', ')}`,
            date: user.progress.lastAccess ? window.utils.formatTimeAgo(user.progress.lastAccess) : 'Reciente',
            priority: 3
        });
    }

    // Si no hay actividad
    if (activities.length <= 1 && !user.diagnosticCompleted) {
        recentContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clock"></i>
                <h4>Sin actividad reciente</h4>
                <p style="font-size:0.9rem;">Comienza tu diagnóstico para registrar tu primera actividad</p>
            </div>
        `;
        return;
    }

    // Ordenar por prioridad y mostrar
    activities.sort((a, b) => a.priority - b.priority);
    const displayActivities = activities.slice(0, 5);

    let html = '<ul class="activity-list">';
    displayActivities.forEach(activity => {
        html += `
            <li>
                <div class="activity-icon"><i class="fas ${activity.icon}"></i></div>
                <span style="flex:1;font-size:0.9rem;">${activity.text}</span>
                <span class="activity-date">${activity.date}</span>
            </li>
        `;
    });
    html += '</ul>';

    recentContent.innerHTML = html;
}

/**
 * Actualiza las recomendaciones
 */
function updateRecommendations(user) {
    const recommendationsContent = document.getElementById('recommendationsContent');
    if (!recommendationsContent) return;

    if (!user.diagnosticCompleted || !user.diagnosticResults) {
        recommendationsContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-lightbulb"></i>
                <h4>Sin recomendaciones</h4>
                <p style="font-size:0.9rem;">Completa el diagnóstico para recibir recomendaciones</p>
            </div>
        `;
        return;
    }

    const results = user.diagnosticResults;
    const scores = results.scores || {};
    const userLevel = results.level.toLowerCase();
    const completedModules = user.progress?.completedModules || [];

    // Identificar áreas débiles (puntaje <= 3)
    const areaLabels = {
        information: 'Información y datos',
        communication: 'Comunicación y colaboración',
        content: 'Creación de contenido',
        security: 'Seguridad',
        problemSolving: 'Resolución de problemas'
    };

    let weakAreas = [];
    let strongAreas = [];

    for (const [key, value] of Object.entries(scores)) {
        if (value <= 3) {
            weakAreas.push(areaLabels[key] || key);
        } else if (value >= 5) {
            strongAreas.push(areaLabels[key] || key);
        }
    }

    // Recomendaciones basadas en módulos pendientes
    const availableModules = MODULES.filter(m => m.level === userLevel);
    const pendingModules = availableModules.filter(m => !completedModules.includes(m.id));

    let html = '';

    // Si hay módulos pendientes
    if (pendingModules.length > 0) {
        html += `
            <div style="margin-bottom:12px;">
                <p style="font-weight:600;font-size:0.95rem;margin-bottom:6px;">
                    <i class="fas fa-arrow-right" style="color:var(--color-primary);"></i> Siguiente paso:
                </p>
                <div style="background:rgba(45,106,79,0.08);padding:12px 16px;border-radius:var(--radius);">
                    <p style="font-weight:500;font-size:0.95rem;">${pendingModules[0].title}</p>
                    <p style="font-size:0.85rem;color:var(--color-text-light);">${pendingModules[0].areaLabel} • Dificultad ${'★'.repeat(pendingModules[0].difficulty)}</p>
                    <a href="learning.html" class="btn btn-primary btn-sm" style="margin-top:8px;width:100%;justify-content:center;">
                        <i class="fas fa-play"></i> Continuar aprendiendo
                    </a>
                </div>
            </div>
        `;
    }

    // Áreas débiles
    if (weakAreas.length > 0) {
        html += `
            <div style="margin-bottom:8px;">
                <p style="font-weight:600;font-size:0.9rem;margin-bottom:4px;">
                    <i class="fas fa-exclamation-triangle" style="color:#F0AD4E;"></i> Áreas a reforzar:
                </p>
                <ul style="list-style:none;padding:0;font-size:0.9rem;">
        `;
        weakAreas.forEach(area => {
            html += `
                <li style="padding:2px 0;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-circle" style="font-size:0.4rem;color:#F0AD4E;"></i>
                    ${area}
                </li>
            `;
        });
        html += `
                </ul>
            </div>
        `;
    }

    // Áreas fuertes
    if (strongAreas.length > 0) {
        html += `
            <div>
                <p style="font-weight:600;font-size:0.9rem;margin-bottom:4px;margin-top:8px;">
                    <i class="fas fa-star" style="color:#F0AD4E;"></i> Áreas destacadas:
                </p>
                <ul style="list-style:none;padding:0;font-size:0.9rem;">
        `;
        strongAreas.forEach(area => {
            html += `
                <li style="padding:2px 0;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-circle" style="font-size:0.4rem;color:#2D8B4E;"></i>
                    ${area}
                </li>
            `;
        });
        html += `
                </ul>
            </div>
        `;
    }

    if (!html) {
        html = `
            <div style="text-align:center;padding:12px 0;">
                <i class="fas fa-star" style="font-size:2rem;color:var(--color-primary-light);"></i>
                <h4 style="margin-top:8px;font-size:1rem;">¡Excelente desempeño!</h4>
                <p style="font-size:0.85rem;color:var(--color-text-light);">
                    Has mostrado un buen nivel en todas las áreas.
                </p>
            </div>
        `;
    }

    recommendationsContent.innerHTML = html;
}

/**
 * Actualiza estadísticas rápidas
 */
function updateQuickStats(user) {
    const container = document.getElementById('quickStatsContainer');
    if (!container) return;

    let stats = [];

    // Estadística 1: Nivel
    const level = user.diagnosticResults ? user.diagnosticResults.level : 'Sin evaluar';
    const levelEmoji = user.diagnosticResults ? user.diagnosticResults.levelEmoji : '📚';
    stats.push({
        icon: 'fa-trophy',
        label: 'Nivel actual',
        value: `${levelEmoji} ${level}`,
        color: 'var(--color-primary)'
    });

    // Estadística 2: Módulos completados
    const completedModules = user.progress?.completedModules?.length || 0;
    const userLevel = user.diagnosticResults ? user.diagnosticResults.level.toLowerCase() : 'basico';
    const totalModules = MODULES.filter(m => m.level === userLevel).length;
    stats.push({
        icon: 'fa-check-double',
        label: 'Módulos completados',
        value: `${completedModules}/${totalModules}`,
        color: '#2D8B4E'
    });

    // Estadística 3: Puntaje diagnóstico
    const score = user.diagnosticResults ? `${user.diagnosticResults.totalPercentage}%` : '--';
    stats.push({
        icon: 'fa-percent',
        label: 'Puntaje diagnóstico',
        value: score,
        color: '#F0AD4E'
    });

    // Estadística 4: Días activo
    const daysActive = user.createdAt ? Math.ceil((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    stats.push({
        icon: 'fa-calendar-check',
        label: 'Días activo',
        value: daysActive > 0 ? `${daysActive}d` : 'Hoy',
        color: '#0D47A1'
    });

    let html = '';
    stats.forEach(stat => {
        html += `
            <div style="background:var(--color-white);border-radius:var(--radius);padding:16px;text-align:center;border:1px solid var(--color-border);">
                <i class="fas ${stat.icon}" style="font-size:1.5rem;color:${stat.color};margin-bottom:4px;"></i>
                <div style="font-size:1.3rem;font-weight:700;">${stat.value}</div>
                <div style="font-size:0.8rem;color:var(--color-text-light);">${stat.label}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// DATOS DE MÓDULOS PARA EL DASHBOARD
// ============================================
if (typeof MODULES === 'undefined') {
    window.MODULES = [
        { id: 'basico_informacion_1', title: 'Introducción a la computadora', level: 'basico', area: 'information', areaLabel: 'Información y datos', difficulty: 1 },
        { id: 'basico_informacion_2', title: 'Navegación web básica', level: 'basico', area: 'information', areaLabel: 'Información y datos', difficulty: 1 },
        { id: 'basico_comunicacion_1', title: 'Uso del correo electrónico', level: 'basico', area: 'communication', areaLabel: 'Comunicación y colaboración', difficulty: 1 },
        { id: 'basico_seguridad_1', title: 'Seguridad básica: contraseñas', level: 'basico', area: 'security', areaLabel: 'Seguridad', difficulty: 1 },
        { id: 'intermedio_informacion_1', title: 'Evaluación de fuentes de información', level: 'intermedio', area: 'information', areaLabel: 'Información y datos', difficulty: 2 },
        { id: 'intermedio_comunicacion_1', title: 'Herramientas de colaboración en línea', level: 'intermedio', area: 'communication', areaLabel: 'Comunicación y colaboración', difficulty: 2 },
        { id: 'intermedio_contenido_1', title: 'Creación de presentaciones digitales', level: 'intermedio', area: 'content', areaLabel: 'Creación de contenido', difficulty: 2 },
        { id: 'intermedio_seguridad_1', title: 'Privacidad en redes sociales', level: 'intermedio', area: 'security', areaLabel: 'Seguridad', difficulty: 2 },
        { id: 'avanzado_informacion_1', title: 'Análisis y visualización de datos', level: 'avanzado', area: 'information', areaLabel: 'Información y datos', difficulty: 3 },
        { id: 'avanzado_seguridad_1', title: 'Ciberseguridad y protección avanzada', level: 'avanzado', area: 'security', areaLabel: 'Seguridad', difficulty: 3 },
        { id: 'avanzado_problemas_1', title: 'Resolución avanzada de problemas digitales', level: 'avanzado', area: 'problemSolving', areaLabel: 'Resolución de problemas', difficulty: 3 }
    ];
}