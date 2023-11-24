document.addEventListener('DOMContentLoaded', function () {
    let cotizacionDolarBlue;

    fetch('https://dolarapi.com/v1/dolares')
        .then(response => response.json())
        .then(data => {
            cotizacionDolarBlue = data.find(cotizacion => cotizacion.nombre === 'Blue');

            mostrarCotizacionBlue(cotizacionDolarBlue);
        })
        .catch(error => {
            console.error('Error al obtener las cotizaciones:', error);
        });

    const inputMontoPesos = document.getElementById('monto');
    inputMontoPesos.addEventListener('input', function () {
        actualizar(cotizacionDolarBlue);
    });
});

function mostrarCotizacionBlue(cotizacion) {
    const cotizacionBlueElement = document.getElementById('cotizacionBlue');
    cotizacionBlueElement.textContent = `Compra $${cotizacion.compra} - Venta $${cotizacion.venta}`;
}

let conversionPesos = true;

function cambiarSentidoConversion() {
    conversionPesos = !conversionPesos;

    const resultadoConversionElement = document.getElementById('resultadoConversion');
    resultadoConversionElement.textContent = '';

    const btnCambiarSentido = document.getElementById('moneda');
    btnCambiarSentido.textContent = conversionPesos ? 'ARS' : 'USD';


}

function actualizar(cotizacionDolarBlue) {
    if (!cotizacionDolarBlue) {
        mostrarErrorObtenerCotizacion();
        return;
    }
    const monto = parseFloat(document.getElementById('monto').value);

    if (isNaN(monto)) {
        mostrarErrorConversion();
        return;
    }

    let resultado;
    if (conversionPesos) {
        resultado = monto / cotizacionDolarBlue.venta;
    } else {
        resultado = monto * cotizacionDolarBlue.venta;
    }
    mostrarResultadoConversion(resultado);
}

function mostrarResultadoConversion(resultado) {
    const resultadoConversionElement = document.getElementById('resultadoConversion');
    if (conversionPesos) {
        resultadoConversionElement.textContent = `Resultado de la conversión: USD ${resultado.toFixed(2)}`;
    } else {
        resultadoConversionElement.textContent = `Resultado de la conversión: ARS ${resultado.toFixed(2)}`;
    }

}

function mostrarErrorObtenerCotizacion() {
    const resultadoConversionElement = document.getElementById('resultadoConversion');
    resultadoConversionElement.textContent = 'Error al obtener la cotización del dólar blue. Por favor, inténtelo de nuevo más tarde.';
}

function mostrarErrorConversion() {
    const resultadoConversionElement = document.getElementById('resultadoConversion');
    resultadoConversionElement.textContent = '';
}
