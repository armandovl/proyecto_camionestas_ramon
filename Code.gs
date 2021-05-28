function global(){
  
  //traer la hoja de cálculo externo por su id
  var archivoExterno =SpreadsheetApp.openById("1PRT5f20Vj8wTS9AbtAGAczIJ-V4jjTiYhbYD3oisg7k");
  
  // traer las hojas del archivo externo
  var hojaConjunta= archivoExterno.getSheetByName("base_conjunta");
  var hojaMatch= archivoExterno.getSheetByName("match");


  //traer las ultimas filas y columnas
  var ultimaFilaConjunta= hojaConjunta.getLastRow();
  var ultimaColumnaConjunta= hojaConjunta.getLastColumn();

  //traer las ultimas filas y columnas
  var ultimaFilaMatch= hojaMatch.getLastRow();
  var ultimaColumnaMatch= hojaMatch.getLastColumn();

  /*************************Match**************************************************** */
  //traer los valores del match
  var arregloMatch= hojaMatch.getRange(1,1, ultimaFilaMatch,1).getValues();

  /************************* Conjunta**************************************************** */ 
  var datos_originales= hojaConjunta.getRange(1,1,ultimaFilaConjunta,ultimaColumnaConjunta).getValues();

  //hacer el filtro mediante ciertas condiciones
  var datos_filtrados= datos_originales.filter(function(item){
    return item[1]=="T-3213"; // Iteracion
  });


  //console.log(datos_filtrados);

  
  /*********************filtrar solo las columnas que me interesan slice push******************/ //TUTORIAL
  var nuevoArreglo=[]

  for(var i=0;i<= datos_filtrados.length-1;i++){
    var unoPorUno= datos_filtrados[i].slice(5,11);
    nuevoArreglo.push(unoPorUno);
    
  }

  //console.log(nuevoArreglo);

  /********************************Pegar los datos************************************************* */
  //traer la hoja de cálculo Plantilla por su id
  var archivoPlantilla =SpreadsheetApp.openById("1HGwuqgbpvKfwJEk6VPuyIuacJcWm8h4g6WxrAboVmDY");
  
  // traer las hojas del archivo Plantilla
  var hojaPlantilla= archivoPlantilla.getSheetByName("Hoja2");
 
 
 
 /************************************pegar valores */
  
  //Pegar los datos filtrados en la hoja     //hoja.getRange(fila inicio, columna inicio, alto, ancho)
  var rangoAPegar= hojaPlantilla.getRange(12,7, datos_filtrados.length,datos_filtrados[0].length);
  rangoAPegar.setValues(datos_filtrados)

  //Pegar los datos nuevo Arreglo
  var rangoAPegar= hojaPlantilla.getRange(20,7, nuevoArreglo.length,nuevoArreglo[0].length);
  rangoAPegar.setValues(nuevoArreglo)

  //pegar un valor solitario

  var rangoAPegar= hojaPlantilla.getRange(5,2);
  // arreglo[0][3] [fila] [columna]
  rangoAPegar.setValue(datos_filtrados[0][2])
  
  // hacer la suma y pegarla //TUTORIAL
  var suma = 0
  for (i=0;i<=nuevoArreglo.length-1;i++) {
  //var suma_total_dos= suma_total_dos+ nuevoArreglo[i][1]
  columna=2;
  var valorASumar= nuevoArreglo[i][columna];
  var suma = suma + valorASumar;
  }

  console.log(suma)

  //pegar la suma
  var rangoAPegar= hojaPlantilla.getRange(5,4);
  rangoAPegar.setValue(suma) 
  
}


/*los datos de los valores deben de estar en la tabla*/
/*falta iterar*/
/*falta hacer copias*/
/*poner en carpetas*
/* hacerlo con botones*/














