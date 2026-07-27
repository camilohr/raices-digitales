/**
 * RAÍCES DIGITALES - APP (MEJORADO)
 * Control principal de la aplicación
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- Toggle menú móvil ---
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('open');
                // Actualizar icono
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            }
        });
    }

    // --- Cerrar menú al hacer clic fuera (móvil) ---
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        const toggle = document.getElementById('navToggle');

        if (nav && navLinks && toggle) {
            if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });

    // --- Cerrar menú al hacer clic en un enlace (móvil) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navContainer = this.closest('.nav-links');
            const toggle = document.getElementById('navToggle');
            if (navContainer && window.innerWidth <= 768) {
                navContainer.classList.remove('open');
                if (toggle) {
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // --- Actualizar navbar según autenticación ---
    updateNavbar();

    // --- Marcar enlace activo ---
    highlightActiveLink();

    // --- Prevenir envío de formularios con Enter en ciertos casos ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const target = e.target;
            if (target.tagName === 'INPUT') {
                const form = target.closest('form');
                if (form && !form.querySelector('button[type="submit"]')) {
                    e.preventDefault();
                }
            }
        }
    });
});

/**
 * Actualiza la barra de navegación según el estado de autenticación
 */
function updateNavbar() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const isAuth = window.utils.isAuthenticated();
    const currentUser = window.utils.getCurrentUser();

    if (isAuth && currentUser) {
        // Obtener primeras 2 letras del nombre para el avatar
        const initials = currentUser.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');

        navLinks.innerHTML = `
            <a href="dashboard.html"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="diagnostic.html"><i class="fas fa-clipboard-list"></i> Diagnóstico</a>
            <a href="learning.html"><i class="fas fa-route"></i> Mis Rutas</a>
            <a href="profile.html"><i class="fas fa-user-circle"></i> ${currentUser.name}</a>
            <a href="#" id="logoutBtn" class="btn btn-outline btn-sm">
                <i class="fas fa-sign-out-alt"></i> Salir
            </a>
        `;

        // Evento de logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
    } else {
        navLinks.innerHTML = `
            <a href="index.html" class="active">Inicio</a>
            <a href="login.html" class="btn btn-outline btn-sm">Iniciar Sesión</a>
            <a href="register.html" class="btn btn-primary btn-sm">Registrarse</a>
        `;
    }

// --- Redirigir al index al hacer clic en el logo (sin cerrar sesión) ---
const brand = document.querySelector('.nav-brand');
if (brand) {
    brand.style.cursor = 'pointer';
    brand.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}
}

/**
 * Maneja el cierre de sesión
 */
async function handleLogout() {
    const confirmed = await window.utils.showConfirm(
        '¿Estás seguro de que quieres cerrar sesión?',
        'Cerrar sesión'
    );

    if (confirmed) {
        localStorage.removeItem('raices_session');
        window.utils.showNotification('Sesión cerrada exitosamente', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    }
}

/**
 * Resalta el enlace activo en la navegación
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a:not(.btn)');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}