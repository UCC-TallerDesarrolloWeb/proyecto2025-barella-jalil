document.addEventListener('DOMContentLoaded', function () {
    // Variables del carrusel - CON VERIFICACIONES
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // VERIFICAR SI EXISTEN ELEMENTOS DEL CARRUSEL PRINCIPAL
    if (slides.length === 0) {
        console.log('No se encontró carrusel principal - probablemente está en proyecto.html');
        return; // Salir si no hay carrusel principal
    }

    let currentSlide = 0;
    let slideInterval;

    // Función para mostrar slide
    function showSlide(index) {
        // Remover clase active de todos los slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicadores.forEach(ind => ind.classList.remove('active'));

        // Asegurar que el índice esté dentro del rango
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        // Agregar clase active al slide e indicador actual
        slides[currentSlide].classList.add('active');
        if (indicadores[currentSlide]) {
            indicadores[currentSlide].classList.add('active');
        }
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    // Event listeners para botones - CON VERIFICACIONES
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners para indicadores - CON VERIFICACIONES
    indicadores.forEach((indicador, index) => {
        if (indicador) {
            indicador.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetInterval();
            });
        }
    });

    // Función para iniciar el intervalo automático
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Función para resetear el intervalo
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Iniciar el carrusel
    startInterval();
});

// ==========================================================================
// FUNCIONALIDAD PARA PROYECTOS - AGREGAR AL FINAL DEL ARCHIVO
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si estamos en la página de proyectos
    const proyectoCards = document.querySelectorAll('.proyecto-card');

    if (proyectoCards.length > 0) {
        console.log('Inicializando funcionalidad de proyectos...');

        // Efectos hover para tarjetas de proyectos
        proyectoCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });

        // Efectos para imágenes de la galería
        const galeriaItems = document.querySelectorAll('.galeria-item');

        galeriaItems.forEach(item => {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                console.log('Imagen clickeada:', img.src);
                // Aquí puedes agregar un lightbox/modal para ver imagen ampliada
            });
        });

        // Botón de consultar proyecto
        const btnConsultar = document.querySelector('.btn-consultar');
        if (btnConsultar) {
            btnConsultar.addEventListener('click', function () {
                alert('¡Gracias por tu interés! Te contactaremos pronto para asesorarte sobre este proyecto.');
                // Aquí puedes redirigir a un formulario de contacto
            });
        }

        // Carga perezosa de imágenes para proyectos
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.galeria-item img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
});

// Función para agregar más proyectos dinámicamente
function agregarProyecto(proyectoData) {
    console.log('Función para agregar nuevo proyecto:', proyectoData);
    // Implementación para agregar proyectos dinámicamente
}

// ==========================================================================
// LAZY LOADING SUPER SIMPLE Y EFECTIVO
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('=== INICIANDO LAZY LOADING MEJORADO ===');

    // Seleccionar TODAS las imágenes con data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    console.log('📷 Imágenes encontradas para lazy loading: ' + lazyImages.length);

    if (lazyImages.length === 0) {
        console.log('❌ No se encontraron imágenes con data-src');
        return;
    }

    // Función para cargar una imagen
    function loadImage(img) {
        const realSrc = img.getAttribute('data-src');
        console.log('🔄 Cargando imagen: ' + realSrc);

        // Crear nueva imagen para preload
        const newImage = new Image();
        newImage.src = realSrc;

        newImage.onload = function () {
            // Cuando carga, reemplazar la original
            img.src = realSrc;
            img.removeAttribute('data-src');
            img.style.opacity = '1';
            console.log('✅ Imagen cargada: ' + realSrc);
        };

        newImage.onerror = function () {
            console.log('❌ Error cargando: ' + realSrc);
        };
    }

    // Cargar imágenes visibles inmediatamente
    function loadVisibleImages() {
        lazyImages.forEach(img => {
            if (img.hasAttribute('data-src')) {
                const rect = img.getBoundingClientRect();

                // Si la imagen está en pantalla o cerca (500px)
                if (rect.top < window.innerHeight + 500) {
                    loadImage(img);
                }
            }
        });
    }

    // Cargar imágenes visibles al inicio
    loadVisibleImages();

    // Cargar imágenes al hacer scroll (optimizado)
    let isScrolling = false;
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                loadVisibleImages();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Cargar todas después de 3 segundos (fallback)
    setTimeout(loadVisibleImages, 3000);
});


// Validación del formulario de asesoramiento
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-asesoramiento');

    // Expresiones regulares para validación
    const soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+\.[^\s@]+$/; // Requiere dos puntos
    const telefonoValido = /^\d{8}$/;

    // Elementos del formulario
    const elementos = {
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        marca: document.getElementById('marca'),
        modelo: document.getElementById('modelo'),
        patente: document.getElementById('patente'),
        uso: document.getElementById('uso'),
        importacion: document.getElementById('importacion'),
        mejoras: document.querySelectorAll('input[name="mejoras"]')
    };

    // Validación en tiempo real
    elementos.nombre.addEventListener('input', validarNombre);
    elementos.apellido.addEventListener('input', validarApellido);
    elementos.email.addEventListener('input', validarEmail);
    elementos.telefono.addEventListener('input', validarTelefono);
    elementos.marca.addEventListener('input', validarMarca);
    elementos.modelo.addEventListener('input', validarModelo);
    elementos.patente.addEventListener('input', validarPatente);
    elementos.uso.addEventListener('change', validarUso);
    elementos.importacion.addEventListener('input', validarImportacion);

    // Validar checkboxes
    elementos.mejoras.forEach(checkbox => {
        checkbox.addEventListener('change', validarMejoras);
    });

    // Submit del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validarFormulario()) {
            // Aquí iría el envío real del formulario
            alert('¡Formulario enviado correctamente! Nos contactaremos a la brevedad.');
            form.reset();
            limpiarErrores();
        }
    });

    // Funciones de validación
    function validarNombre() {
        const valor = elementos.nombre.value.trim();
        const error = document.getElementById('error-nombre');

        if (!valor) {
            mostrarError(elementos.nombre, error, 'El nombre es obligatorio');
            return false;
        }

        if (!soloLetras.test(valor)) {
            mostrarError(elementos.nombre, error, 'Solo se permiten letras');
            return false;
        }

        limpiarError(elementos.nombre, error);
        return true;
    }

    function validarApellido() {
        const valor = elementos.apellido.value.trim();
        const error = document.getElementById('error-apellido');

        if (!valor) {
            mostrarError(elementos.apellido, error, 'El apellido es obligatorio');
            return false;
        }

        if (!soloLetras.test(valor)) {
            mostrarError(elementos.apellido, error, 'Solo se permiten letras');
            return false;
        }

        limpiarError(elementos.apellido, error);
        return true;
    }

    function validarEmail() {
        const valor = elementos.email.value.trim();
        const error = document.getElementById('error-email');

        if (!valor) {
            mostrarError(elementos.email, error, 'El email es obligatorio');
            return false;
        }

        if (!emailValido.test(valor)) {
            mostrarError(elementos.email, error, 'El email debe tener @ y dos puntos (ej: usuario@dominio.com.ar)');
            return false;
        }

        limpiarError(elementos.email, error);
        return true;
    }

    function validarTelefono() {
        const valor = elementos.telefono.value.trim();
        const error = document.getElementById('error-telefono');

        if (!valor) {
            mostrarError(elementos.telefono, error, 'El teléfono es obligatorio');
            return false;
        }

        if (!telefonoValido.test(valor)) {
            mostrarError(elementos.telefono, error, 'El teléfono debe tener 10 dígitos');
            return false;
        }

        limpiarError(elementos.telefono, error);
        return true;
    }

    function validarMarca() {
        const valor = elementos.marca.value.trim();
        const error = document.getElementById('error-marca');

        if (!valor) {
            mostrarError(elementos.marca, error, 'La marca es obligatoria');
            return false;
        }

        limpiarError(elementos.marca, error);
        return true;
    }

    function validarModelo() {
        const valor = elementos.modelo.value.trim();
        const error = document.getElementById('error-modelo');

        if (!valor) {
            mostrarError(elementos.modelo, error, 'El modelo es obligatorio');
            return false;
        }

        limpiarError(elementos.modelo, error);
        return true;
    }

    function validarPatente() {
        const valor = elementos.patente.value.trim();
        const error = document.getElementById('error-patente');

        if (!valor) {
            mostrarError(elementos.patente, error, 'La patente es obligatoria');
            return false;
        }

        limpiarError(elementos.patente, error);
        return true;
    }

    function validarUso() {
        const valor = elementos.uso.value;
        const error = document.getElementById('error-uso');

        if (!valor) {
            mostrarError(elementos.uso, error, 'Debe seleccionar un uso');
            return false;
        }

        limpiarError(elementos.uso, error);
        return true;
    }

    function validarMejoras() {
        const error = document.getElementById('error-mejoras');
        const checkboxesMarcados = Array.from(elementos.mejoras).some(cb => cb.checked);

        if (!checkboxesMarcados) {
            mostrarError(null, error, 'Seleccione al menos un tipo de mejora');
            return false;
        }

        limpiarError(null, error);
        return true;
    }

    function validarImportacion() {
        const valor = elementos.importacion.value.trim();
        const error = document.getElementById('error-importacion');

        if (!valor) {
            mostrarError(elementos.importacion, error, 'Este campo es obligatorio');
            return false;
        }

        limpiarError(elementos.importacion, error);
        return true;
    }

    // Validación completa del formulario
    function validarFormulario() {
        const validaciones = [
            validarNombre(),
            validarApellido(),
            validarEmail(),
            validarTelefono(),
            validarMarca(),
            validarModelo(),
            validarPatente(),
            validarUso(),
            validarMejoras(),
            validarImportacion()
        ];

        return validaciones.every(result => result === true);
    }

    // Utilidades
    function mostrarError(elemento, errorElement, mensaje) {
        if (elemento) {
            elemento.parentElement.classList.add('error');
        }
        errorElement.textContent = mensaje;
    }

    function limpiarError(elemento, errorElement) {
        if (elemento) {
            elemento.parentElement.classList.remove('error');
        }
        errorElement.textContent = '';
    }

    function limpiarErrores() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
    }
});

// Validación del formulario de asesoramiento
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-asesoramiento');

    // Expresiones regulares para validación - CORREGIDAS
    const soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+\.[^\s@]+$/;
    const telefonoValido = /^\d{10}$/; // 10 dígitos exactos

    // Elementos del formulario
    const elementos = {
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        marca: document.getElementById('marca'),
        modelo: document.getElementById('modelo'),
        patente: document.getElementById('patente'),
        uso: document.getElementById('uso'),
        importacion: document.getElementById('importacion'),
        mejoras: document.querySelectorAll('input[name="mejoras"]')
    };

    // Validación en tiempo real
    elementos.nombre.addEventListener('input', validarNombre);
    elementos.apellido.addEventListener('input', validarApellido);
    elementos.email.addEventListener('input', validarEmail);
    elementos.telefono.addEventListener('input', validarTelefono);
    elementos.marca.addEventListener('input', validarMarca);
    elementos.modelo.addEventListener('input', validarModelo);
    elementos.patente.addEventListener('input', validarPatente);
    elementos.uso.addEventListener('change', validarUso);
    elementos.importacion.addEventListener('input', validarImportacion);

    // Validar checkboxes
    elementos.mejoras.forEach(checkbox => {
        checkbox.addEventListener('change', validarMejoras);
    });

    // Submit del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validarFormulario()) {
            // Aquí iría el envío real del formulario
            alert('¡Formulario enviado correctamente! Nos contactaremos a la brevedad.');
            form.reset();
            limpiarErrores();
        }
    });

    // Funciones de validación
    function validarNombre() {
        const valor = elementos.nombre.value.trim();
        const error = document.getElementById('error-nombre');

        if (!valor) {
            mostrarError(elementos.nombre, error, 'El nombre es obligatorio');
            return false;
        }

        if (!soloLetras.test(valor)) {
            mostrarError(elementos.nombre, error, 'Solo se permiten letras');
            return false;
        }

        limpiarError(elementos.nombre, error);
        return true;
    }

    function validarApellido() {
        const valor = elementos.apellido.value.trim();
        const error = document.getElementById('error-apellido');

        if (!valor) {
            mostrarError(elementos.apellido, error, 'El apellido es obligatorio');
            return false;
        }

        if (!soloLetras.test(valor)) {
            mostrarError(elementos.apellido, error, 'Solo se permiten letras');
            return false;
        }

        limpiarError(elementos.apellido, error);
        return true;
    }

    function validarEmail() {
        const valor = elementos.email.value.trim();
        const error = document.getElementById('error-email');

        if (!valor) {
            mostrarError(elementos.email, error, 'El email es obligatorio');
            return false;
        }

        if (!emailValido.test(valor)) {
            mostrarError(elementos.email, error, 'El email debe tener @ y dos puntos (ej: usuario@dominio.com.ar)');
            return false;
        }

        limpiarError(elementos.email, error);
        return true;
    }

    function validarTelefono() {
        const valor = elementos.telefono.value.trim();
        const error = document.getElementById('error-telefono');

        console.log('Validando teléfono:', valor, 'Longitud:', valor.length); // Para debug

        if (!valor) {
            mostrarError(elementos.telefono, error, 'El teléfono es obligatorio');
            return false;
        }

        // Validar que sean solo números y exactamente 10 dígitos
        if (!/^\d+$/.test(valor)) {
            mostrarError(elementos.telefono, error, 'El teléfono debe contener solo números');
            return false;
        }

        if (valor.length !== 10) {
            mostrarError(elementos.telefono, error, 'El teléfono debe tener 10 dígitos');
            return false;
        }

        limpiarError(elementos.telefono, error);
        return true;
    }

    function validarMarca() {
        const valor = elementos.marca.value.trim();
        const error = document.getElementById('error-marca');

        if (!valor) {
            mostrarError(elementos.marca, error, 'La marca es obligatoria');
            return false;
        }

        limpiarError(elementos.marca, error);
        return true;
    }

    function validarModelo() {
        const valor = elementos.modelo.value.trim();
        const error = document.getElementById('error-modelo');

        if (!valor) {
            mostrarError(elementos.modelo, error, 'El modelo es obligatorio');
            return false;
        }

        limpiarError(elementos.modelo, error);
        return true;
    }

    function validarPatente() {
        const valor = elementos.patente.value.trim();
        const error = document.getElementById('error-patente');

        if (!valor) {
            mostrarError(elementos.patente, error, 'La patente es obligatoria');
            return false;
        }

        limpiarError(elementos.patente, error);
        return true;
    }

    function validarUso() {
        const valor = elementos.uso.value;
        const error = document.getElementById('error-uso');

        if (!valor) {
            mostrarError(elementos.uso, error, 'Debe seleccionar un uso');
            return false;
        }

        limpiarError(elementos.uso, error);
        return true;
    }

    function validarMejoras() {
        const error = document.getElementById('error-mejoras');
        const checkboxesMarcados = Array.from(elementos.mejoras).some(cb => cb.checked);

        if (!checkboxesMarcados) {
            mostrarError(null, error, 'Seleccione al menos un tipo de mejora');
            return false;
        }

        limpiarError(null, error);
        return true;
    }

    function validarImportacion() {
        const valor = elementos.importacion.value.trim();
        const error = document.getElementById('error-importacion');

        if (!valor) {
            mostrarError(elementos.importacion, error, 'Este campo es obligatorio');
            return false;
        }

        limpiarError(elementos.importacion, error);
        return true;
    }

    // Validación completa del formulario
    function validarFormulario() {
        const validaciones = [
            validarNombre(),
            validarApellido(),
            validarEmail(),
            validarTelefono(),
            validarMarca(),
            validarModelo(),
            validarPatente(),
            validarUso(),
            validarMejoras(),
            validarImportacion()
        ];

        return validaciones.every(result => result === true);
    }

    // Utilidades
    function mostrarError(elemento, errorElement, mensaje) {
        if (elemento) {
            elemento.parentElement.classList.add('error');
        }
        errorElement.textContent = mensaje;
    }

    function limpiarError(elemento, errorElement) {
        if (elemento) {
            elemento.parentElement.classList.remove('error');
        }
        errorElement.textContent = '';
    }

    function limpiarErrores() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
    }
});