let tabla = new Object();
let resultados_copas = []
let n_copas = 0;
let persona = "persona_"
let puntos_copa="puntos_copa_"
let fila_cartas = 0

const puntos = [5, 3, 2, 1]


actualizarTabla = () => {
    let objeto_resultados_copa = new Object()
    objeto_resultados_copa.nombre_copa = document.getElementById("nombre_copa").value
    objeto_resultados_copa.puestos = []

    for(let i = 1; i <= 4; i++){

        let temp_persona = persona + i.toString();
        let nombre_persona = document.getElementById(temp_persona).value

        let temp_puntos_copa = puntos_copa + i.toString()
        let cantidad_puntos_copa = parseInt(document.getElementById(temp_puntos_copa).value)


        if(tabla.hasOwnProperty(nombre_persona)){
            tabla[nombre_persona].puntos += cantidad_puntos_copa;
            tabla[nombre_persona].puntaje += puntos[i-1];
            tabla[nombre_persona].posicion[i-1] += 1;
        }
        else{
            tabla[nombre_persona] = {
                puntos: cantidad_puntos_copa,
                puntaje: puntos[i-1],
                posicion: [0,0,0,0]
            }
            tabla[nombre_persona].posicion[i-1] += 1;
        }

        objeto_resultados_copa.puestos.push({
            jugador: nombre_persona,
            puntos: cantidad_puntos_copa
        })
    }

    resultados_copas.push(objeto_resultados_copa)
}

obtenerFila = (objeto_persona, nombre_persona, puesto) => {

    return `
    <tbody class="removible">
        <tr >
            <th>${puesto}</th>
            <th>${nombre_persona}</th>
            <td>${objeto_persona.posicion[0]}</td>
            <td>${objeto_persona.posicion.reduce(function (a,b){return a+b; }, 0)}</td>
            <td>${objeto_persona.puntaje}</td>
            <td>${objeto_persona.puntos}</td>
        </tr>
    </tbody>
    `
}

visualizarTablaPosiciones = () => {

    const elementos = document.querySelectorAll('.removible');

    elementos.forEach(elem => {
        elem.remove();
    });


    let arreglo = ordenarTabla()
    for(let i = 0; i<arreglo.length; i++) {
         document.getElementById("tabla_posiciones").innerHTML += obtenerFila(tabla[arreglo[i][0]], arreglo[i][0], i+1);
    }
}

ordenarTabla = () => {
    let tabla_arr = Object.entries(tabla)
    tabla_arr.sort((a,b) => (a[1].puntaje < b[1].puntaje?1:-1))
    return tabla_arr
}

agregarCarta = () => {

    let orden = []

    for(let i = 1; i <= 4; i++) {
        let temp_persona = persona + i.toString();
        let nombre_persona = document.getElementById(temp_persona).value

        let temp_puntos_copa = puntos_copa + i.toString()
        let cantidad_puntos_copa = parseInt(document.getElementById(temp_puntos_copa).value)

        orden.push([nombre_persona, cantidad_puntos_copa])
    }

    let cartaNueva = `
        <div class="card" style="width: 15rem;">
        <div class="card-body">
        <h5 class="card-title">${document.getElementById("nombre_copa").value}</h5>
        <table class="table">
            <tr>
            <th>1</th> <td>${orden[0][0]}</td> <td>${orden[0][1]}</td>
            </tr>
            <tr>
            <th>2</th> <td>${orden[1][0]}</td> <td>${orden[1][1]}</td>
            </tr>
            <tr>
            <th>3</th> <td>${orden[2][0]}</td> <td>${orden[2][1]}</td>
            </tr>
            <tr>
            <th>4</th> <td>${orden[3][0]}</td> <td>${orden[3][1]}</td>
            </tr>
        </table>
        </div>
        </div>
    `

    if(n_copas % 5 == 0){
        fila_cartas++;
        let elemento = document.createElement("div");
        elemento.setAttribute("id", "cartas-fila-"+fila_cartas.toString());
        elemento.setAttribute("style", "display: flex; justify-content: space-between");
        document.getElementById("cartas").appendChild(elemento);
        document.getElementById("cartas").innerHTML += "<br>"
    }
    document.getElementById("cartas-fila-" + fila_cartas.toString()).innerHTML += cartaNueva;

    n_copas++;

}


document.getElementById("guardar").onclick = (e) => {
    e.preventDefault()
    let pestanha_datos = window.open("", "datos", "width=800, height=800")
    pestanha_datos.document.write(
        "<pre>"+JSON.stringify({
        resultados_generales: tabla,
        resultados_copas_individuales: resultados_copas
        },null,4) + "</pre>"
    )
}

restaurarVariables = (json) => {
    tabla = json.resultados_generales
    resultados_copas = json.resultados_copas_individuales
    console.log(resultados_copas)
    visualizarTablaPosiciones()
    console.log(resultados_copas)
    for(let i = 0; i<resultados_copas.length; i++){
        let cartaNueva = `
        <div class="card" style="width: 15rem;">
        <div class="card-body">
        <h5 class="card-title">${resultados_copas[i].nombre_copa}</h5>
        <table class="table">
            <tr>
            <th>1</th> <td>${resultados_copas[i].puestos[0].jugador}</td> <td>${resultados_copas[i].puestos[0].puntos}</td>
            </tr>
            <tr>
            <th>2</th> <td>${resultados_copas[i].puestos[1].jugador}</td> <td>${resultados_copas[i].puestos[1].puntos}</td>
            </tr>
            <tr>
            <th>3</th> <td>${resultados_copas[i].puestos[2].jugador}</td> <td>${resultados_copas[i].puestos[2].puntos}</td>
            </tr>
            <tr>
            <th>4</th> <td>${resultados_copas[i].puestos[3].jugador}</td> <td>${resultados_copas[i].puestos[3].puntos}</td>
            </tr>
        </table>
        </div>
        </div>
        `
        if(n_copas % 5 == 0){
            fila_cartas++;
            let elemento = document.createElement("div");
            elemento.setAttribute("id", "cartas-fila-"+fila_cartas.toString());
            elemento.setAttribute("style", "display: flex; justify-content: space-between");
            document.getElementById("cartas").appendChild(elemento);
            document.getElementById("cartas").innerHTML += "<br>"
        }
        document.getElementById("cartas-fila-" + fila_cartas.toString()).innerHTML += cartaNueva;

        n_copas++;
    }
}

document.getElementById("cargar").onclick = (e) => {
    e.preventDefault()
    let pestanha_datos = window.open("", "datos", "width=800, height=800")
    pestanha_datos.document.write(`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <h1>Ingrese datos JSON</h1>
        <textarea id="datos_json" rows="20" cols="100"></textarea><br><br>
        <button class="btn btn-primary" id="enviar_carga">Enviar</button>
    `)
    pestanha_datos.document.getElementById("enviar_carga").onclick = (e) => {
        e.preventDefault()
        const datos_enviados = pestanha_datos.document.getElementById("datos_json").value
        try{
            const json = JSON.parse(datos_enviados)
            restaurarVariables(json)
        } catch (e){
            pestanha_datos.alert("No es un formato JSON valido")
        }
    }


}

document.getElementById("guardar_copa").onclick = (e) => {
    e.preventDefault()
    actualizarTabla()
    visualizarTablaPosiciones()
    agregarCarta()
}