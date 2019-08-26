$('#dvTrmite').fadeTo('slow', .6);
$('#dvTrmite').append('<div id="divDisabled" style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
$('#sltTramite').chosen();
$('#TipoDocumento').chosen();
$.ajax({
    // url: ws_pao + '/ListasPao/ObtenerTramites',
    // type: 'POST',
    url: ws_pao + '/ListasPao/ObtenerTramites.json',
    cache: false,
    dataType: 'JSON'
}).done(function (response) {
    var options = '';
    $.each(response.content , function (index, item) {
        options += '<option value="' + item.ID_TRAMITE + '">' + item.DESCRIPCION + '</option>'
    });
    $('#sltTramite').html(options);
    $('#sltTramite').trigger('chosen:updated');;
});

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
        obtenerTramites(response.content.IdNssAfi, response.content.CodigoCuentaAfi);
        $('#dvTrmite').attr('style', '');
        $('#divDisabled').remove();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });


});

function obtenerTramites(CUSPP, CodigoCuenta) {
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
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });
}