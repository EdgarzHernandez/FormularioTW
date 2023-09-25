
// Obtener elementos del documento HTML (Manejo del DOM)
const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.querySelector('#logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesExpiracion = document.querySelector('#tarjeta .mes');
const yearExpiracion = document.querySelector('#tarjeta .year');
const ccv = document.querySelector('#tarjeta .ccv');




 // Función para mostrar el frente de la tarjeta
const mostrarFrente = () => 
{
	if(tarjeta.classList.contains('active'))
	{
	   tarjeta.classList.remove('active');
	}
}


// Manejar clic en la tarjeta para rotarla
tarjeta.addEventListener('click', () => 
{
	tarjeta.classList.toggle('active');
});


// Manejar clic en el botón para abrir el formulario
btnAbrirFormulario.addEventListener('click', () => 
{
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});


// Generar opciones para el select de mes dinámicamente
for(let i = 1; i <= 12; i++)
{
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}


//Generar opciones para el select de año dinámicamente
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++)
{
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}


// Validar y formatear el número de tarjeta en tiempo real
formulario.inputNumero.addEventListener('keyup', (e) => 
{
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	// Actualizar el número de tarjeta en la interfaz gráfica en tiempo real
	numeroTarjeta.textContent = valorInput;

	// Si el valor está vacío, mostrar una tarjeta genérica
	if(valorInput == '')
	{
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

    // Detectar si el número de tarjeta comienza con '4' (Visa) o '5' (Mastercard)
	if(valorInput[0] == 4)
	{   // Mostrar el logo de Visa
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} 
	else if(valorInput[0] == 5)
	{   // Mostrar el logo de Mastercard
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Voltear la tarjeta para que el usuario vea el frente
	mostrarFrente();
});


// Actualizar el nombre en la tarjeta y la firma en tiempo real
formulario.inputNombre.addEventListener('keyup', (e) => 
{
	let valorInput = e.target.value;

     // Eliminar números del valor del nombre
	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	// Actualizar el nombre en la tarjeta y la firma
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	// Si el valor está vacío, mostrar un nombre por defecto
	if(valorInput == '')
	{
		nombreTarjeta.textContent = 'Edgar Hernández';
	}
    // Voltear la tarjeta para que el usuario vea el frente
	mostrarFrente();
});


// Actualizar el mes de expiración en tiempo real
formulario.selectMes.addEventListener('change', (e) => 
{
	mesExpiracion.textContent = e.target.value;
	// Voltear la tarjeta para que el usuario vea el frente
	mostrarFrente();
});


// Actualizar el año de expiración en tiempo real (mostrando solo los últimos 2 dígitos)
formulario.selectYear.addEventListener('change', (e) => 
{
	yearExpiracion.textContent = e.target.value.slice(2);
	// Voltear la tarjeta para que el usuario vea el frente
	mostrarFrente();
});


// Manejar el CCV (Código de seguridad)
formulario.inputCCV.addEventListener('keyup', () => 
{
	// Si la tarjeta no está volteada, hacerlo
	if(!tarjeta.classList.contains('active'))
	{
		tarjeta.classList.toggle('active');
	}

     // Eliminar espacios y letras del valor del CCV
	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	// Actualizar el CCV en la tarjeta
	ccv.textContent = formulario.inputCCV.value;
});