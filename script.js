document.getElementById('registroEvento').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const archivo = document.getElementById('archivo').files[0];

    // Validaciones adicionales
    const errores = [];

    // Validar nombre (mínimo 3 caracteres)
    if (nombre.length < 3) {
        errores.push('El nombre debe tener al menos 3 caracteres.');
    }

    // Validar correo electrónico con expresión regular
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
        errores.push('Ingrese un correo electrónico válido.');
    }

    // Validar teléfono (solo números y mínimo 10 dígitos)
    const telefonoRegex = /^\d{10,}$/;
    if (!telefonoRegex.test(telefono)) {
        errores.push('El número de teléfono debe contener al menos 10 dígitos numéricos.');
    }

    // Validar que al menos un interés esté seleccionado
    if (intereses.length === 0) {
        errores.push('Seleccione al menos un interés.');
    }

    // Validar que se haya seleccionado un horario
    if (!horario) {
        errores.push('Seleccione un horario preferido.');
    }

    // Validar que la fecha del evento no sea anterior a la fecha actual
    const fechaEvento = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00
    if (fechaEvento < hoy) {
        errores.push('La fecha del evento no puede ser anterior a la fecha actual.');
    }

    // Validar tipo y tamaño del archivo (si se sube alguno)
    if (archivo) {
        const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!tiposPermitidos.includes(archivo.type)) {
            errores.push('El archivo debe ser un PDF, JPG o PNG.');
        }
        const tamañoMaximo = 2 * 1024 * 1024; // 2MB
        if (archivo.size > tamañoMaximo) {
            errores.push('El archivo no debe superar los 2MB.');
        }
    }

    // Mostrar errores o enviar formulario
    if (errores.length > 0) {
        alert(errores.join('\n'));
    } else {
        alert('Registro exitoso. ¡Gracias por registrarte!');
    }
});
