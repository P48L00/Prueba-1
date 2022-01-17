const kelvin=273.15;
const obtenerClima=()=>{
    let ciudad=document.querySelector("#ciudad").value;
    let pais=document.querySelector("#pais").value;

    if(ciudad.trim()===''||
    pais.trim()===''){
    mostrarError("#msj-error", "Falta completar campos");
    return;
    }
    consultarApi(ciudad, pais);
}

const consultarApi= async(ciudad, pais)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + pais+"&appid=fea484c81d747ced83174174f5aec1e8";
    console.log(url);
    const respuesta=await fetch(url);
    const resultado=await respuesta.json();
    console.log(resultado);

    if(resultado.cod=="404"){
        mostrarError("$msj-error", "No hay resultados");
        return;
    }
    const{name, main}=resultado;
    if(!name) return null;

    let divResultado=document.querySelector("#divResultado");

    divResultado.innerHTML=
    "<div> <h2>El clima de "+ name + " es: </h2> <p> T° Actual: " + parseFloat(main.temp-kelvin, 10).toFixed(2) + "<span> &#x2103; </span> </p> <p> T° Maxima: " + 
    parseFloat(main.temp_max-kelvin, 10).toFixed(2) + "<span> &#x2103; </span> </p> <p> T° Minima: " + parseFloat(main.temp_min-kelvin, 10).toFixed(2) + "<span> &#x2103; </span> </p> </div>"
}

const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML='<p style="background-color: red; color: white;">' + mensaje + '</p>';
    setTimeout(()=>{ divError.innerHTML='';}, 2000);
}