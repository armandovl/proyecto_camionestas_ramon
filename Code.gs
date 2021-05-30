function global(){
 /************************Traer Datos */  
  //traer la hoja de cálculo externo por su id
  var archivoExterno =SpreadsheetApp.openById("1PRT5f20Vj8wTS9AbtAGAczIJ-V4jjTiYhbYD3oisg7k");
  
  // traer las hojas del archivo externo
  var hojaConjunta= archivoExterno.getSheetByName("base_conjunta");
  var hojaMatch= archivoExterno.getSheetByName("tarjetas");


  //traer las ultimas filas y columnas base conjunta
  var ultimaFilaConjunta= hojaConjunta.getLastRow();
  var ultimaColumnaConjunta= hojaConjunta.getLastColumn();

  //traer las ultimas filas y columnas tarjetas
  var ultimaFilaMatch= hojaMatch.getLastRow();
  var ultimaColumnaMatch= hojaMatch.getLastColumn();

  /*************************Match***********************************************************/
  //traer los valores del match
  var arregloMatch= hojaMatch.getRange(1,1, ultimaFilaMatch,1).getValues();

  /************************* Conjunta**************************************************** */ 
  var datos_originales= hojaConjunta.getRange(1,1,ultimaFilaConjunta,ultimaColumnaConjunta).getValues();

 /* */





    for (i=1; i<=arregloMatch.length-1; i++){

      /*hacer el filtro mediante ciertas condiciones*/
      var datos_filtrados= datos_originales.filter(function(item){
      return item[1]==arregloMatch[i]; // Iteracion
      });
      /**/

      /***************************copia del archivo*********************************************** */
        nombreCopia=(datos_filtrados[0][3]);
        documentoCopiado= DriveApp.getFileById("1HGwuqgbpvKfwJEk6VPuyIuacJcWm8h4g6WxrAboVmDY").makeCopy(nombreCopia);
  
        var idNuevoDocumento = (documentoCopiado.getId());

      /**/

      /*********************filtrar solo las columnas que me interesan slice push******************/ //TUTORIAL
        var nuevoArreglo=[]
        for(var k=0;k<= datos_filtrados.length-1;k++){
        var unoPorUno= datos_filtrados[k].slice(6,11);
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
  
        //Pegar la tabla
        var rangoAPegar= hojaPlantilla.getRange(12,1, nuevoArreglo.length,nuevoArreglo[0].length);
        rangoAPegar.setValues(nuevoArreglo)

        //pegar la marca
        var rangoAPegar= hojaPlantilla.getRange(7,2);
        // arreglo[0][3] [fila] [columna]
        rangoAPegar.setValue(datos_filtrados[0][11])

        //pegar el territorio
        var rangoAPegar= hojaPlantilla.getRange(7,5);
        // arreglo[0][3] [fila] [columna]
        rangoAPegar.setValue(datos_filtrados[0][4])
        
        //pegar placas
        var rangoAPegar= hojaPlantilla.getRange(8,2);
        // arreglo[0][3] [fila] [columna]
        rangoAPegar.setValue(datos_filtrados[0][5])

        //pegar monedero
        var rangoAPegar= hojaPlantilla.getRange(9,2);
        // arreglo[0][3] [fila] [columna]
        rangoAPegar.setValue(datos_filtrados[0][2])

        //pegar el resguardante
        var rangoAPegar= hojaPlantilla.getRange(29,4);
        // arreglo[0][3] [fila] [columna]
        rangoAPegar.setValue(datos_filtrados[0][3])


        // hacer la suma de litros y pegarla //TUTORIAL
        var suma = 0
        for (l=0;l<=nuevoArreglo.length-1;l++) {
        //var suma_total_dos= suma_total_dos+ nuevoArreglo[i][1]
        columna=2;
        var valorASumar= nuevoArreglo[l][columna];
        var suma = suma + valorASumar;
        }

        //pegar la suma de litros
        var rangoAPegar= hojaPlantilla.getRange(24,3);
        rangoAPegar.setValue(suma)


        // hacer la suma del importe y pegarla //TUTORIAL
        var suma = 0
        for (j=0;j<=nuevoArreglo.length-1;j++) {
        //var suma_total_dos= suma_total_dos+ nuevoArreglo[i][1]
        columna=3;
        var valorASumar= nuevoArreglo[j][columna];
        var suma = suma + valorASumar;
        }

        //pegar la suma de importe
        var rangoAPegar= hojaPlantilla.getRange(24,4);
        rangoAPegar.setValue(suma) 


      /**/

    } //aquì termina el for


}// aqui termina la funcion global




/*poner en carpetas*
/* hacerlo con botones*/














