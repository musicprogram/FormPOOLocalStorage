const formulario = document.querySelector("#formulario");
const formularioName = document.querySelector("#formularioName");
const listaFormulario = document.querySelector("#listaFormulario");
// primero las constantes de la vista 1)

// array vacío para guardar la información en el localStorage
let usersArray = []; // array vacío
//
//

// clases 2)

class User {
	constructor(name, id){
		this.name = name,
		this.id = id
	}
}

class Interfaz { 
	agregarUsuario(user){
		const elemento = document.createElement('div')

		elemento.innerHTML = mostrarHTML(user);
		// se crea un elemento y se asigna el nombre del objeto
		listaFormulario.appendChild(elemento) //para crear hijos
		// 
	}

	guardarDataLocalStorage(usersArray){ //array
		localStorage.setItem('users', JSON.stringify(usersArray));
		// se cambia el array a formato json y se setea  el localhost
	}

	eliminarUser(e){
		if(e.name === 'delete'){
			// console.log(e.parentElement.textContent)
			e.parentElement.remove() //eliminar div en la vista


			// eliminar en localStorage
			usersArray = JSON.parse(localStorage.getItem('users')); // todos los usuarios de loscalStorage
			// eliminando con el id que se le da a cada elemento
			let idInstancia; // cada div tiene un id diferente, que es el mismo de cada user
			const actualUsersArray =[] //nuevo array
			idInstancia = e.parentElement.id;
			usersArray.forEach((elemento) =>{
				//console.log(elemento);
				if(elemento.id !== idInstancia){
					actualUsersArray.push(elemento);
				}	
			})

			this.guardarDataLocalStorage(actualUsersArray) // guardando en la base de datos local guardarDataLocalStorage()
			this.mostrarMensaje("destroy item...","danger"); //mostrar mensaje y clase de bootstrap
		}
	}
	mostrarMensaje(message, cssClass){ // dos parametros , mensaje, clase de bootstrap
		const div = document.createElement('div'); //se crea un elemento
		div.className = `alert alert-${cssClass} mt-2 message`; // se le asigna la clase 
		div.appendChild(document.createTextNode(message)) // y se adjunta un texto hijo
		// mostrando en el DOM

		const container = document.querySelector("#container");// se llaman los divs en donde se va a dejar el mensaje
		const appdiv = document.querySelector("#app");// se llaman los divs en donde se va a dejar el mensaje

		container.insertBefore(div,appdiv); // insertar despues de container y antes de appdiv

		setTimeout(function(){ //para que desaparezca el mensaje
			document.querySelector(".message").remove(); // remove quitar
		}, 3000)
	}
}


// eventos 

// formulario
formulario.addEventListener("submit", ejecutarFormulario);

function ejecutarFormulario (e) {
	e.preventDefault();
	// console.log(e)
	// console.log(formularioName.value)
	let name = formularioName.value // cambiar a variable opcional
	let id = Math.random().toString(36).substr(2, 9); // un id único con js
	// console.log(id)

	const user = new User(name,id) // crear un nuevo usuario, se asigna el texto como  parametro 

	const interfaz = new Interfaz() // se crea un nuevo objeto de interfaz 
	interfaz.agregarUsuario(user) //y se asigna el objeto user al parametro agregarUsuario
	//console.log(user)


	// localStorage **********
	usersArray.push(user);
	interfaz.guardarDataLocalStorage(usersArray)
	//  se pasa el array como parametro


	// mostrar mensaje 
	interfaz.mostrarMensaje('create item', 'success')
	/// mensaje enviando texto y nombre de clase

	formulario.reset();
	//console.log(usersArray);
}



// para que cargue la información que esta guardada en el localStorage
// carga todo el html y esto es lo primero que se ejecuta
document.addEventListener('DOMContentLoaded', leerLocalStorage)

function leerLocalStorage(){
	// el array se reinicia yviene con lo que hay en localStorage
	usersArray = JSON.parse(localStorage.getItem("users")); // para volver el texto plano a un array
	// console.log(usersArray)
	if(usersArray === null){
		usersArray = [];
	}else {
		for(let user of usersArray){
			listaFormulario.innerHTML += mostrarHTML(user);
		}
	}
}

// un partial aparte de los items del html

function mostrarHTML(user){
	return  `
						<div class="alert alert-secondary mt-2" role="alert" id="${user.id}">
						  ${user.name}
						  <a href="#" class="btn btn-danger" name="delete">delete</a> 
						</div>
					`
}


// para eliminar 

listaFormulario.addEventListener("click", eliminarUsuario)

function eliminarUsuario(e){

	let confirmar = confirm("are you sure?"); // confirmar si va a ser eliminado
	if(confirmar === true){
			// console.log(e.target)
			// se pasa el target de lo que esta clickeando
			const interfaz = new Interfaz();
			interfaz.eliminarUser(e.target)
	}
	
}

/// eliminar

