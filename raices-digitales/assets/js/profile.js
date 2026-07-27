/**
 * RAÍCES DIGITALES - PERFIL
 * Gestión de perfil de usuario
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.utils.requireAuth()) return;

    loadProfile();
    setupProfileForm();
});

/**
 * Carga los datos del perfil
 */
function loadProfile() {
    const user = window.utils.getCurrentUser();
    if (!user) return;

    // --- Header del perfil ---
    const header = document.getElementById('profileHeader');
    if (header) {
        const initial = user.name.charAt(0).toUpperCase();
        const level = user.diagnosticResults ? user.diagnosticResults.level : 'Sin evaluar';
        const levelEmoji = user.diagnosticResults ? user.diagnosticResults.levelEmoji : '📚';

        header.innerHTML = `
            <div class="profile-avatar">${initial}</div>
            <div class="profile-info">
                <h1>${user.name}</h1>
                <div class="email"><i class="fas fa-envelope"></i> ${user.email}</div>
                <div class="meta">
                    <span><i class="fas fa-calendar-alt"></i> Miembro desde: ${user.createdAt || 'Reciente'}</span>
                    <span><i class="fas fa-trophy"></i> Nivel: ${levelEmoji} ${level}</span>
                    <span><i class="fas fa-clock"></i> Último acceso: ${user.progress?.lastAccess || 'Hoy'}</span>
                </div>
            </div>
        `;
    }

    // --- Formulario ---
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    if (nameInput) nameInput.value = user.name;
    if (emailInput) emailInput.value = user.email;

    // --- Estadísticas ---
    const statsContainer = document.getElementById('profileStats');
    if (statsContainer) {
        const completedModules = user.progress?.completedModules?.length || 0;
        const userLevel = user.diagnosticResults ? user.diagnosticResults.level.toLowerCase() : 'basico';
        const totalModules = window.MODULES ? window.MODULES.filter(m => m.level === userLevel).length : 0;
        const score = user.diagnosticResults ? `${user.diagnosticResults.totalPercentage}%` : '--';
        const daysActive = user.createdAt ? Math.ceil((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0;

        let stats = `
            <div class="stat-item">
                <span class="label"><i class="fas fa-route"></i> Módulos completados</span>
                <span class="value ${completedModules > 0 ? 'completed' : 'pending'}">${completedModules}/${totalModules}</span>
            </div>
            <div class="stat-item">
                <span class="label"><i class="fas fa-percent"></i> Puntaje diagnóstico</span>
                <span class="value">${score}</span>
            </div>
            <div class="stat-item">
                <span class="label"><i class="fas fa-calendar-check"></i> Días activo</span>
                <span class="value">${daysActive > 0 ? daysActive + ' días' : 'Hoy'}</span>
            </div>
            <div class="stat-item">
                <span class="label"><i class="fas fa-check-circle"></i> Estado diagnóstico</span>
                <span class="value ${user.diagnosticCompleted ? 'completed' : 'pending'}">
                    ${user.diagnosticCompleted ? '✅ Completado' : '⏳ Pendiente'}
                </span>
            </div>
        `;

        // Detalles por área si existe diagnóstico
        if (user.diagnosticCompleted && user.diagnosticResults) {
            const scores = user.diagnosticResults.scores || {};
            const areaLabels = {
                information: 'Información y datos',
                communication: 'Comunicación y colaboración',
                content: 'Creación de contenido',
                security: 'Seguridad',
                problemSolving: 'Resolución de problemas'
            };

            stats += `<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--color-border);">`;
            stats += `<p style="font-weight:600;font-size:0.9rem;margin-bottom:8px;">Desempeño por área:</p>`;

            for (const [key, value] of Object.entries(scores)) {
                const label = areaLabels[key] || key;
                const percentage = Math.round((value.score / value.max) * 100);
                let color = '#D9534F';
                if (percentage >= 70) color = '#2D8B4E';
                else if (percentage >= 40) color = '#F0AD4E';

                stats += `
                    <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:2px 0;">
                        <span>${label}</span>
                        <span style="font-weight:600;color:${color};">${value.score}/${value.max}</span>
                    </div>
                `;
            }
            stats += `</div>`;
        }

        statsContainer.innerHTML = stats;
    }
}

/**
 * Configura el formulario de edición de perfil
 */
function setupProfileForm() {
    const form = document.getElementById('profileForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const user = window.utils.getCurrentUser();
        if (!user) return;

        const nameInput = document.getElementById('profileName');
        const passwordInput = document.getElementById('profilePassword');

        // Validar nombre
        if (!nameInput.value.trim()) {
            window.utils.showNotification('El nombre no puede estar vacío', 'error');
            return;
        }

        // Actualizar usuario
        const users = window.utils.getStorageData('raices_users', []);
        const userIndex = users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            users[userIndex].name = nameInput.value.trim();

            // Actualizar contraseña si se proporcionó
            if (passwordInput.value && passwordInput.value.length >= 6) {
                users[userIndex].password = passwordInput.value;
            } else if (passwordInput.value && passwordInput.value.length < 6) {
                window.utils.showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }

            window.utils.setStorageData('raices_users', users);

            // Actualizar sesión
            const session = window.utils.getStorageData('raices_session');
            if (session) {
                session.userId = user.id;
                window.utils.setStorageData('raices_session', session);
            }

            window.utils.showNotification('Perfil actualizado correctamente ✅', 'success');

            // Recargar perfil
            loadProfile();
            passwordInput.value = '';
        }
    });
}

/**
 * Exporta los datos del usuario como JSON
 */
function exportData() {
    const user = window.utils.getCurrentUser();
    if (!user) return;

    // Preparar datos para exportar
    const exportData = {
        usuario: {
            id: user.id,
            nombre: user.name,
            email: user.email,
            fecha_registro: user.createdAt,
            ultimo_acceso: user.progress?.lastAccess || 'N/A'
        },
        diagnostico: user.diagnosticResults || null,
        progreso: {
            modulos_completados: user.progress?.completedModules || [],
            total_modulos_completados: user.progress?.completedModules?.length || 0
        },
        fecha_exportacion: new Date().toISOString()
    };

    // Crear archivo JSON
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Descargar
    const link = document.createElement('a');
    link.href = url;
    link.download = `raices_digitales_${user.name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    window.utils.showNotification('Datos exportados correctamente 📥', 'success');
}

/**
 * Elimina la cuenta del usuario
 */
function deleteAccount() {
    if (!confirm('⚠️ ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        return;
    }

    if (!confirm('Todos tus datos serán eliminados permanentemente. ¿Continuar?')) {
        return;
    }

    const user = window.utils.getCurrentUser();
    if (!user) return;

    // Eliminar usuario
    let users = window.utils.getStorageData('raices_users', []);
    users = users.filter(u => u.id !== user.id);
    window.utils.setStorageData('raices_users', users);

    // Eliminar sesión
    localStorage.removeItem('raices_session');

    window.utils.showNotification('Cuenta eliminada. Lamentamos verte ir. 👋', 'info');

    // Redirigir al inicio
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Exportar funciones globales
window.exportData = exportData;
window.deleteAccount = deleteAccount;