/**
 * RAÍCES DIGITALES - UTILS (MEJORADO)
 * Funciones auxiliares reutilizables
 */

// --- ID único ---
function generateId() {
    return 'uid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// --- Fecha formateada ---
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
    if (!dateString) return 'Reciente';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function formatTimeAgo(dateString) {
    if (!dateString) return 'Reciente';
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Ayer';
    if (diff < 7) return `Hace ${diff} días`;
    if (diff < 30) return `Hace ${Math.floor(diff / 7)} semanas`;
    if (diff < 365) return `Hace ${Math.floor(diff / 30)} meses`;
    return `Hace ${Math.floor(diff / 365)} años`;
}

// --- Obtener datos de localStorage ---
function getStorageData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Error al leer localStorage:', e);
        return defaultValue;
    }
}

// --- Guardar datos en localStorage ---
function setStorageData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
        return false;
    }
}

// --- Verificar si un usuario está autenticado ---
function isAuthenticated() {
    const session = getStorageData('raices_session');
    if (!session) return false;

    const users = getStorageData('raices_users', []);
    return users.some(user => user.id === session.userId);
}

// --- Obtener usuario actual ---
function getCurrentUser() {
    const session = getStorageData('raices_session');
    if (!session) return null;

    const users = getStorageData('raices_users', []);
    return users.find(user => user.id === session.userId) || null;
}

// --- Actualizar usuario en localStorage ---
function updateUser(updatedUser) {
    const users = getStorageData('raices_users', []);
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        setStorageData('raices_users', users);
        return true;
    }
    return false;
}

// --- Redirigir si no está autenticado ---
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// --- Redirigir si ya está autenticado ---
function requireGuest() {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return false;
    }
    return true;
}

// --- Mostrar notificaciones (mejorado) ---
function showNotification(message, type = 'info', duration = 4000) {
    // Eliminar notificaciones existentes
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Icono según tipo
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    notification.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
            <i class="fas ${icons[type] || icons.info}" style="font-size:1.2rem;"></i>
            <span style="flex:1;">${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;

    document.body.appendChild(notification);

    // Evento de cierre
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeNotification(notification);
        });
    }

    // Cierre automático
    const timeoutId = setTimeout(() => {
        closeNotification(notification);
    }, duration);

    // Guardar timeout para cancelar si se cierra manualmente
    notification.dataset.timeoutId = timeoutId;

    // Hacer clic en la notificación la cierra
    notification.addEventListener('click', function(e) {
        if (e.target.closest('.notification-close')) return;
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    clearTimeout(notification.dataset.timeoutId);
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 300);
}

// --- Confirmación personalizada ---
function showConfirm(message, title = 'Confirmar') {
    return new Promise((resolve) => {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
            font-family: var(--font-primary);
        `;

        // Crear modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: var(--radius-lg);
            padding: 32px;
            max-width: 420px;
            width: 100%;
            box-shadow: var(--shadow-xl);
            animation: slideIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:3rem;margin-bottom:12px;">⚠️</div>
                <h3 style="margin-bottom:8px;">${title}</h3>
                <p style="color:var(--color-text-light);margin-bottom:24px;">${message}</p>
                <div style="display:flex;gap:12px;justify-content:center;">
                    <button class="btn btn-outline btn-confirm-cancel">Cancelar</button>
                    <button class="btn btn-danger btn-confirm-ok">Aceptar</button>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Eventos
        const cancelBtn = modal.querySelector('.btn-confirm-cancel');
        const okBtn = modal.querySelector('.btn-confirm-ok');

        function close() {
            overlay.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 300);
        }

        cancelBtn.addEventListener('click', () => {
            close();
            resolve(false);
        });

        okBtn.addEventListener('click', () => {
            close();
            resolve(true);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                close();
                resolve(false);
            }
        });
    });
}

// --- Exportar funciones globalmente ---
window.utils = {
    generateId,
    getCurrentDate,
    formatDate,
    formatTimeAgo,
    getStorageData,
    setStorageData,
    isAuthenticated,
    getCurrentUser,
    updateUser,
    requireAuth,
    requireGuest,
    showNotification,
    showConfirm
};