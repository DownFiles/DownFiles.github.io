// Elementos del DOM
const urlInput = document.getElementById('urlInput');
const formatSelect = document.getElementById('formatSelect');
const downloadBtn = document.getElementById('downloadBtn');

// Animación de las tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las tarjetas y elementos animables
document.querySelectorAll('.platform-card, .step, .feature, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Función para validar URL
function isValidURL(string) {
    try {
        const url = new URL(string);
        // Lista de dominios compatibles
        const validDomains = [
            'youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com',
            'twitter.com', 'x.com', 'facebook.com', 'soundcloud.com'
        ];
        return validDomains.some(domain => url.hostname.includes(domain));
    } catch (_) {
        return false;
    }
}

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
    // Eliminar mensaje anterior si existe
    const oldMessage = document.querySelector('.message-box');
    if (oldMessage) {
        oldMessage.remove();
    }

    const messageBox = document.createElement('div');
    messageBox.className = `message-box message-${type}`;
    messageBox.textContent = message;
    
    const downloadBox = document.querySelector('.download-box');
    downloadBox.appendChild(messageBox);

    // Animar entrada
    setTimeout(() => {
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';
    }, 10);

    // Eliminar después de 4 segundos
    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.style.transform = 'translateY(-10px)';
        setTimeout(() => messageBox.remove(), 300);
    }, 4000);
}

// Función para simular descarga (aquí conectarías con tu API real)
function processDownload(url, format) {
    // Cambiar texto del botón
    downloadBtn.textContent = 'Procesando...';
    downloadBtn.disabled = true;

    // Simular proceso de descarga (en producción, aquí harías una llamada a tu API)
    setTimeout(() => {
        showMessage(`¡Listo! Tu archivo en formato ${format.toUpperCase()} está preparado.`, 'success');
        downloadBtn.textContent = 'Descargar';
        downloadBtn.disabled = false;
        
        // Aquí normalmente iniciarías la descarga real
        console.log(`Descargando: ${url} en formato ${format}`);
        
        // Limpiar input
        urlInput.value = '';
    }, 2000);
}

// Event listener para el botón de descarga
downloadBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    const format = formatSelect.value;

    // Validar que hay una URL
    if (!url) {
        showMessage('Por favor, pega un enlace válido', 'error');
        urlInput.focus();
        return;
    }

    // Validar que la URL es válida
    if (!isValidURL(url)) {
        showMessage('URL no válida o plataforma no compatible', 'error');
        return;
    }

    // Procesar descarga
    processDownload(url, format);
});

// Permitir descargar con Enter
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        downloadBtn.click();
    }
});

// Animación del placeholder
let placeholderIndex = 0;
const placeholders = [
    'Pega aquí el enlace del video o música...',
    'Ejemplo: https://youtube.com/watch?v=...',
    'Ejemplo: https://tiktok.com/@usuario/video/...',
    'Ejemplo: https://instagram.com/p/...'
];

setInterval(() => {
    if (document.activeElement !== urlInput && !urlInput.value) {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        urlInput.placeholder = placeholders[placeholderIndex];
    }
}, 3000);

// Efecto hover en las tarjetas de plataforma
document.querySelectorAll('.platform-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Acordeón para FAQ
document.querySelectorAll('.faq-item h4').forEach(question => {
    question.style.cursor = 'pointer';
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = answer.style.maxHeight;

        // Cerrar todas las respuestas
        document.querySelectorAll('.faq-item p').forEach(p => {
            p.style.maxHeight = null;
            p.style.marginTop = '0';
        });

        // Abrir la seleccionada si estaba cerrada
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.marginTop = '0.5rem';
        }
    });
});

// Inicializar FAQ cerradas
document.querySelectorAll('.faq-item p').forEach(answer => {
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease, margin-top 0.3s ease';
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contador de descargas (simulado)
let downloadCount = 15847;
const counterElement = document.createElement('p');
counterElement.className = 'download-counter';
counterElement.innerHTML = `<strong>${downloadCount.toLocaleString()}</strong> descargas realizadas hoy`;
document.querySelector('.info-text').after(counterElement);

// Incrementar contador cada cierto tiempo
setInterval(() => {
    downloadCount += Math.floor(Math.random() * 3) + 1;
    counterElement.innerHTML = `<strong>${downloadCount.toLocaleString()}</strong> descargas realizadas hoy`;
}, 5000);

console.log('DownFiles cargado correctamente ✓');
