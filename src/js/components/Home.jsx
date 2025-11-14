import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { obtenerTareas } from "../TodoList";

//create your first component
const Home = () => {

	const [valorInput, setValorInput] = useState([])

	const [nuevaTarea, setnuevaTarea] = useState('')

	useEffect(() => {
		obtenerTareas().then(data => setValorInput(data.todos))
	}, [])

	function funOnKeyDown(event) {

    if (event.code === 'Enter') {

        if (nuevaTarea.trim() === '') {
            alert('Debes escribir el nombre de la tarea!');
            return;
        }

        fetch('https://playground.4geeks.com/todo/todos/radamis', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: nuevaTarea,
                is_done: false
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);

                setValorInput([
                    ...valorInput,
                    {
                        id: valorInput.length + 1,
                        label: nuevaTarea,
                        is_done: false
                    }
                ]);

                setnuevaTarea('');
            })
            .catch(error => console.log(error));
    }
}

	function eliminarTarea(id) {

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(resp => {
        console.log(resp.ok);
        console.log(resp.status);

        if (resp.ok) {
            const newTareas = valorInput.filter((tarea) => tarea.id !== id);
            setValorInput(newTareas);
        }
    })
    .catch(error => console.log(error));
}

	return (
		<div>
			<div className="container contenedor">
				<h1 className="lista">LISTA DE TAREAS</h1>
				<ul>
					<input
						type="text"
						value={nuevaTarea}
						onKeyDown={funOnKeyDown} onChange={(event) => setnuevaTarea(event.target.value)} placeholder='No hay tareas, añadir tareas' />
					{valorInput.map((valor) => (
						<div key={valor.id}>
							<li><p>{valor.label}
								<button className="X"
									onClick={() => eliminarTarea(valor.id)}>x</button></p></li>
						</div>

					))}
				</ul>
				<p className="cantidad">{valorInput.length} Tareas añadida</p>
			</div>


		</div>
	);

};



export default Home;