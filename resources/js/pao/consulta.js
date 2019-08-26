$('#dvTrmite').fadeTo('slow', .6);
$('#dvTrmite').append('<div id="divDisabled" style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
$('#TipoDocumento').chosen();
$('#sltTramite').chosen();

$('#btnBuscarPao').click(function () {
    var tipoDocumento = $("#TipoDocumento").val();
    var numDocumento = ($("#NumDocumento").val()).toUpperCase();
    if (tipoDocumento == '') {
        alertModal("Debe ingresar un Tipo de Documento");
        return;
    }
    if (numDocumento == '') {
        alertModal("Debe ingresar un Número de Documento");
        return;
    }
   
    $('#DocParam').val(numDocumento);
    $('#TipoDocParam').val(tipoDocumento);
    obtenerDetalleAfiliado(tipoDocumento , numDocumento , obtTramitesAfi);

});

function obtenerDetalleAfiliado( tipoDocumento , numDocumento , obtTramitesAfi){

    $.ajax({
        // url: ws_pao +'/Afiliado/ObtenerAfiliado',
        // type: 'POST',
        url: ws_pao +'/Afiliado/ObtenerAfiliado.json',
        data: {
            tipoDocumento: tipoDocumento,
            numDocumento: numDocumento
        },
        cache: false,
        dataType: 'JSON',
        beforeSend: function (xhr) {
            console.log(app.urlBase)
            $('#dtTramites').html('<img src="' + app.urlBase + 'resources/img/loading.gif" style="width:128px; height:128px; display:block; margin:auto;"/>');
        }
    }).done(function (response) {
        var htmldetalle = dtAfiliado(response.content);
        $('#dtAfiliado').html(htmldetalle);
        obtTramitesAfi(response.content.IdNssAfi , response.content.CodigoCuentaAfi , ObtenerlstTramites);
    });
    
}

function obtTramitesAfi(CUSPP, CodigoCuenta , oblstTramite) {
    $.ajax({
        // url: ws_pao + '/Afiliado/ObtenerTramites',
        // type: 'POST',
         url: ws_pao + '/Afiliado/ObtenerTramites.json',
        data: {
            CUSPP: CUSPP,
            CodigoCuenta: CodigoCuenta
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var htmltramite = dtTramites(response.content);
        $('#dtTramites').html(htmltramite);
        $('#tblTramites').DataTable({ "aoColumnDefs": [{ "sClass": "text-center", "aTargets": [0, 1, 6, 8] }, { "sClass": "text-right", "aTargets": [7] }],
        "bLengthChange": false,
        "bFilter": false,
        "bSort": false,
        "language": { "url": urlInicio +'/resources/plugins/dataTables/Spanish.json' },
        "bProcessing": true,
        "bServerSide": false,
        //  "sAjaxSource": 'BuscarEvaluacionesZp',
        // "sServerMethod": "POST",
        // "fnServerParams": function (aoData) {
        //     aoData.push(
        //                 { "name": "TipoDocumento", "value": 'parametroBandejaDTO.TipoDocumento' },
        //                 { "name": "NumeroDocumento", "value": 'parametroBandejaDTO.NumeroDocumento' },
        //                 { "name": "FechaInicial", "value": 'parametroBandejaDTO.FechaInicial' },
        //                 { "name": "FechaFinal", "value": 'parametroBandejaDTO.FechaFinal' },
        //                 { "name": "IndPaso1", "value": 'parametroBandejaDTO.IndPaso1' }
        //            );
        // },
        "initComplete": function (settings, json) {
            $('.row2').removeClass('row2').addClass('row');
            $('#tblTramites_paginate').parent().removeClass().addClass('col-sm-7 col-md-offset-5');
            $('#tblTramites').css('width' , '')
        }
    });
    
        oblstTramite(response.content , includeSiniestro);
    });
}

function ObtenerlstTramites(content , fnIncludeSiniestro){
    var rs = fnIncludeSiniestro(content);


    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerTramites',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerTramites.json',
        cache: false,
        dataType: 'JSON'
    }).done(function(response){
        divdisabled(response.content , rs);
    });
}
function includeSiniestro( arr ){
    var newArr = arr.filter(function (el){
        return ( el.NombreTramite === "CAMBIO DE FONDO");
    });
    return newArr.length > 1  ? true : false;

}
function  divdisabled ( content, rs){
    var options = '';
        content.forEach(function(element) {
            if( rs && element.ID_TRAMITE == 2) {
                options += '<option value="' + element.ID_TRAMITE + '" disabled="true">' + element.DESCRIPCION + '</option>'    
            }else{
                options += '<option value="' + element.ID_TRAMITE + '">' + element.DESCRIPCION + '</option>'
            }
            
        });
    $('#sltTramite').html(options);
    $('#sltTramite').chosen().trigger('chosen:updated');;
    $('#dvTrmite').attr('style', '');
    $('#divDisabled').remove();

}
