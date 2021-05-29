function global(){
 /************************Traer Datos */  
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

  /*************************Match***********************************************************/
  //traer los valores del match
  var arregloMatch= hojaMatch.getRange(1,1, ultimaFilaMatch,1).getValues();

  /************************* Conjunta**************************************************** */ 
  var datos_originales= hojaConjunta.getRange(1,1,ultimaFilaConjunta,ultimaColumnaConjunta).getValues();

 /* */


/*hacer el filtro mediante ciertas condiciones*/
  var datos_filtrados= datos_originales.filter(function(item){
    return item[1]=="T-3213"; // Iteracion
  });
/**/

    contador=0
    for (i=1; i<=5; i++){

        console.log(i);

      /***************************copia del archivo*********************************************** */
        nombreCopia=("Ficha_" + contador);
        documentoCopiado= DriveApp.getFileById("1HGwuqgbpvKfwJEk6VPuyIuacJcWm8h4g6WxrAboVmDY").makeCopy(nombreCopia);
  
        var idNuevoDocumento = (documentoCopiado.getId());
        contador=contador+1
      /**/

      /*********************filtrar solo las columnas que me interesan slice push******************/ //TUTORIAL
        var nuevoArreglo=[]
        for(var k=0;k<= datos_filtrados.length-1;k++){
        var unoPorUno= datos_filtrados[k].slice(5,11);
        nuevoArreglo.push(unoPorUno);
        }
      /**/
        
      /********************************Traer la hoja************************************************* */
        //traer la hoja de cálculo Plantilla por su id
        var archivoPlantilla =SpreadsheetApp.openById(idNuevoDocumento);

        // traer las hojas del archivo Plantilla
        var hojaPlantilla= archivoPlantilla.getSheetByName("Hoja2");
      /**/


      /************************************pegar valores *************************************************/
  
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
        for (j=0;j<=nuevoArreglo.length-1;j++) {
        //var suma_total_dos= suma_total_dos+ nuevoArreglo[i][1]
        columna=2;
        var valorASumar= nuevoArreglo[j][columna];
        var suma = suma + valorASumar;
        }

        //pegar la suma
        var rangoAPegar= hojaPlantilla.getRange(5,4);
        rangoAPegar.setValue(suma) 
      /**/

    } //aquì termina el for



}// aqui termina la funcion global


/*todos los datos de los valores a pegar deben de estar en la hoja conjunta*/
/*falta iterar listado*/
/*poner en carpetas*
/* hacerlo con botones*/














