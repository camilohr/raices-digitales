/**
 * RAÍCES DIGITALES - AUTH (MEJORADO)
 * Módulo de autenticación con validaciones mejoradas
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- Inicializar datos de usuarios si no existen ---
    if (!localStorage.getItem('raices_users')) {
        localStorage.setItem('raices_users', JSON.stringify([]));
    }

    // --- Página de registro ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        // Validación en tiempo real
        const inputs = registerForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            input.addEventListener('input', function() {
                if (this.classList.contains('input-error')) {
                    validateField(this);
                }
            });
        });
    }

    // --- Página de login ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // --- Toggle mostrar contraseña ---
// Toggle para contraseña principal
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
    togglePassword.addEventListener('click', function() {
        const input = document.getElementById('password');
        if (input) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        }
    });
}

// Toggle para confirmar contraseña
const toggleConfirm = document.getElementById('toggleConfirmPassword');
if (toggleConfirm) {
    toggleConfirm.addEventListener('click', function() {
        const input = document.getElementById('confirmPassword');
        if (input) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        }
    });
}
});

/**
 * Valida un campo individualmente
 */
function validateField(input) {
    const id = input.id;
    const value = input.value.trim();

    switch (id) {
        case 'name':
            if (!value || value.length < 2) {
                showFieldError(input, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            clearFieldError(input);
            return true;

        case 'email':
            if (!value || !isValidEmail(value)) {
                showFieldError(input, 'Ingresa un correo electrónico válido');
                return false;
            }
            clearFieldError(input);
            return true;

        case 'password':
            if (!value || value.length < 6) {
                showFieldError(input, 'La contraseña debe tener al menos 6 caracteres');
                return false;
            }
            clearFieldError(input);
            return true;

        case 'confirmPassword':
            const password = document.getElementById('password');
            if (password && value !== password.value) {
                showFieldError(input, 'Las contraseñas no coinciden');
                return false;
            }
            clearFieldError(input);
            return true;

        default:
            return true;
    }
}

/**
 * Maneja el registro de un nuevo usuario
 */
async function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    // Validar todos los campos
    let isValid = true;

    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(password)) isValid = false;
    if (!validateField(confirmPassword)) isValid = false;

    if (!terms || !terms.checked) {
        showFieldError(terms, 'Debes aceptar los términos para continuar');
        isValid = false;
    } else {
        clearFieldError(terms);
    }

    if (!isValid) return;

    // Verificar si el correo ya está registrado
    const users = window.utils.getStorageData('raices_users', []);
    if (users.some(user => user.email === email.value.trim().toLowerCase())) {
        window.utils.showNotification('Este correo ya está registrado. Por favor inicia sesión.', 'error');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        id: window.utils.generateId(),
        name: name.value.trim(),
        email: email.value.trim().toLowerCase(),
        password: password.value,
        createdAt: window.utils.getCurrentDate(),
        diagnosticCompleted: false,
        diagnosticResults: null,
        progress: {
            completedModules: [],
            currentModule: null,
            lastAccess: window.utils.getCurrentDate()
        }
    };

    // Guardar usuario
    users.push(newUser);
    window.utils.setStorageData('raices_users', users);

    // Crear sesión
    window.utils.setStorageData('raices_session', {
        userId: newUser.id,
        createdAt: window.utils.getCurrentDate()
    });

    window.utils.showNotification('¡Registro exitoso! Bienvenido a Raíces Digitales 🌱', 'success');

    // Redirigir al dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
}

/**
 * Maneja el inicio de sesión
 */
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Validar campos
    let isValid = true;
    if (!validateField(email)) isValid = false;
    if (!validateField(password)) isValid = false;

    if (!isValid) return;

    // Buscar usuario
    const users = window.utils.getStorageData('raices_users', []);
    const user = users.find(u =>
        u.email === email.value.trim().toLowerCase() &&
        u.password === password.value
    );

    if (!user) {
        window.utils.showNotification('Correo o contraseña incorrectos', 'error');
        return;
    }

    // Crear sesión
    window.utils.setStorageData('raices_session', {
        userId: user.id,
        createdAt: window.utils.getCurrentDate()
    });

    window.utils.showNotification('¡Bienvenido de vuelta, ' + user.name + '! 🌱', 'success');

    // Redirigir al dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
}

/**
 * Valida formato de email (mejorado)
 */
function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Muestra error en un campo (mejorado)
 */
function showFieldError(input, message) {
    if (!input) return;
    input.classList.add('input-error');
    const errorEl = input.closest('.form-group')?.querySelector('.error-text');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

/**
 * Limpia error de un campo
 */
function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('input-error');
    const errorEl = input.closest('.form-group')?.querySelector('.error-text');
    if (errorEl) {
        errorEl.classList.remove('show');
    }
}