$('#sltTipoDoc').chosen();
$('#dtGastosSepelio').children().not('#btns').hide();

/*Radio Button Funeraria*/
$('.groupFuneraria').on('change', function () {
    console.log(this.value);
    switch (this.value) {
        case '00':
            $(this).parent().siblings().html('<input placeholder="Nombres" class="form-control" id="pNatural" type="text">')
            break;
        case '01':
            lstFuneraria(this);
            break;
    }
})
/*Carga de Archivo Defuncion*/
$('#btnCargaDefuncion').on('click', function () {
    $('#fileCargaDefuncion').trigger('click');
});

/*/Carga de Archivo*/

function cargarBoleta(btn) {
    var index = $(btn).parent().siblings().get(0).textContent;
    var numComp = $(btn).parent().siblings().get(2).textContent;
    var fecEmision = $(btn).parent().siblings().get(3).textContent.split('/').join('');
    var name = "'" +fecEmision + "-" + numComp + "'";
    var htmlinput = '<input onchange="fileDocChange(this, ' + name +' )" id="fileDoc' + index + '" type="file" style="display:none;">';
    $(btn).append(htmlinput);
    $(htmlinput).trigger('click');

}
function fileDocChange(fileInput , name) {   
    var formdata = new FormData(); //FormData object
    //Appending each file to FormData object
    formdata.append(fileInput.files[0].name, fileInput.files[0]);
    formdata.append('name', name);
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', app.urlBase + 'Pao/Upload');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "OK") {
                $()
            }
        }
    }


}
//Funcion para ver Imagen en MODAL
//function fileDocChange(e) {
//     app.mensajes.viewimagen('Vista Previa', e.target.files[0] , 'Aceptar',null);
//}

/* Carga de Boletas*/




    /*LISTA DE TIPO DE DOCUMENTOS*/
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerTipoDocumento',
        // type: 'POST',
         url: ws_pao + '/ListasPao/ObtenerTipoDocumento.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var options = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            options += '<option value="' + item.TipoDocumentoID + '" >' + item.Descripcion + '</option>'
        
        });
        $('#sltTipDocumento').html(options);
        //$('#sltTipDocumento').trigger('chosen:updated');
        //$('#sltTipDocumento').chosen();
    });
    /*LISTA DE TIPO DE Moneda*/
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerMoneda',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerMoneda.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var options = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            options += '<option value="' + item.MonedaID + '" >' + item.Descripcion + '</option>'

        });
        $('#sltTipoMoneda').html(options);
        //$('#sltTipDocumento').trigger('chosen:updated');
    });
    /*LISTA DE TIPO DE ESTADO CIVIL*/
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerEstadoCivil',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerEstadoCivil.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var options = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            options += '<option value="' + item.EstadoCivilID + '" >' + item.Descripcion + '</option>'

        });
        $('#sltEstadoCiv').html(options);
        //$('#sltTipDocumento').trigger('chosen:updated');
        //$('#sltEstadoCiv').chosen();
    });
    /*LISTA DE FUNERARIA*/
    function lstFuneraria(ref){
        $.ajax({
            // url: ws_pao + '/ListasPao/ObtenerFuneraria',
            // type: 'POST',
            url: ws_pao + '/ListasPao/ObtenerFuneraria.json',
            cache: false,
            dataType: 'JSON'
        }).done(function (response) {
            var slt = '<select style="width: 100%;" class="chosen-select" name="sltFunerario" id="sltFunerario">';
            slt += '<option value="">&lt;-Seleccione-&gt;</option>';
            $.each(response.content, function (index, item) {
                slt += '<option value="' + item.cod_patronal + '" >' + item.id_patrono + '-' + item.razon_social + '</option>';

            });
            slt += '</select>';

            $(ref).parent().siblings().html(slt)
            //$('#sltTipDocumento').trigger('chosen:updated');
            $('#sltFunerario').chosen().trigger('chosen:updated');
        });
    }
    /*LISTA DE TIPO DE SEXOS*/
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerSexo',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerSexo.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var options = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            options += '<option value="' + item.SexoID + '" >' + item.Descripcion + '</option>'

        });
        $('#sltSexo').html(options);
        //$('#sltTipDocumento').trigger('chosen:updated');
        //$('#sltSexo').chosen();
    });

    //Lista Causa de fallecimientos
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerCausaFallecimiento',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerCausaFallecimiento.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var html = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            html += '<option value="' + item.COD_VALOR + '"> ' + item.COD_VALOR + '-' + item.DES_VALOR + '</option>';
        })
        $('#sltCausas').html(html);
        $('#sltCausas').chosen();
    });

    /*LISTA DE PARENTESCO*/
    $.ajax({
        // url: ws_pao + '/ListasPao/ObtenerParentesco',
        // type: 'POST',
        url: ws_pao + '/ListasPao/ObtenerParentesco.json',
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var options = '<option value="">&lt;-Seleccione-&gt;</option>';
        $.each(response.content, function (index, item) {
            options += '<option value="' + item.ParentescoID + '" >' + item.Descripcion + '</option>'

        });
        $('#sltParentesco').html(options);
        //$('#sltTipDocumento').trigger('chosen:updated');
        //$('#sltParentesco').chosen();
    });
    /*OBETENER AFILIADO*/
    $.ajax({
        // url:  ws_pao + '/Afiliado/ObtenerAfiliado',
        // type: 'POST',
        url:  ws_pao + '/Afiliado/ObtenerAfiliado.json',        
        data: {
            tipoDocumento: TipoDocParam,
            numDocumento : DocParam
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (response) {
        var htmldetalle = dtAfiliado(response.content);
        $('#dtAfiliado').html(htmldetalle);
        obtenerAfiliado($('#IdNssAfi').val());
        inicializarFechas();
    
    });
    /*OBTENER BENEFICIARIOS*/
    function obtenerAfiliado(IdNss) {
        $.ajax({
            // url: ws_pao + '/Afiliado/ObtenerBeneficiarios',
            // type: 'POST',
            url: ws_pao + '/Afiliado/ObtenerBeneficiarios.json',
            data: {
                idNSS: IdNss
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);
            var condicion = false;
            $.each(response.content, function (index, item) {
                if (item.NumeroDocumento != null) {
                    condicion = true;
                }
            });
            if (condicion) {
                var htmlBeneficiario = tblBeneficiario(response.content);
                $('.check').prop('disabled', false);
            } else {
                var htmlBeneficiario = tblBeneficiario(null);
                $('.check').prop('disabled', true);
            }
            
            $('#tblBeneficiario .col-md-12').html(htmlBeneficiario);

        });
    }
    $('#btnGrabar').on('click', function () {
        if(app.esNuloVacioNoDefinido($('#sltCausas').val())){
            var fncFocus = function () {
                $('#sltCausas').focus()
            }
            app.mensajes.advertencia('Validación', 'Verificar el Ingreso de la Causa de fallecimiento', 'Aceptar', 'Cancelar', fncFocus, null);
            return;
        }
        console.log($('#FechaRegistro').val());

        $.ajax({
            url: ws_pao + '/TramitePao/GuardarTramitePao',
            type: 'POST',
            data: {
                IdNss: $('#IdNssAfi').val(),
                CodPersona: '',
                CodPerAfiliado: '',
                CodCuenta: $('#CodCuentaAfi').val(),
                PrimerApellido: $('#PrimerApellidoAfi').val(),
                SegundoApellido: $('#SegundoApellidoAfi').val(),
                PrimerNombre: $('#PrimerNombreAfi').val(),
                SegundoNombre: $('#SegundoNombreAfi').val(),
                CodTramite: IDTramite,
                FechaReistro: $('#FechaRegistro').val(),
                TipoPersonaTramite: 'A',
                CodTipoId: $('#CodTipoDocumentoAfi').val(),
                NumIdentificador: $('#NumeroIdAfi').val()
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (response) {
            console.log(response.content)
            ajaxguardaAvisoSiniestro(response.content);
        });

    });

    function ajaxguardaAvisoSiniestro(seqTramite) {
        $.ajax({
            url: ws_pao + '/TramitePao/GuardarAvisoSiniestro',
            type: 'POST',
            data: {
                SeqTramite: seqTramite,
                IdNss: $('#IdNssAfi').val(),
                CodPersona: '',
                CodPerAfiliado: '',
                CodCuenta: $('#CodCuentaAfi').val(),
                CodTipoId: $('#CodTipoDocumentoAfi').val(),
                NumIdentificador: $('#NumeroIdAfi').val(),
                TipoPersonaTramite :'A',
                CodCausaSiniestro: $('#sltCausas').val(),
                EmailDeclarante: $('#txtEmailDeclarante').val(),
                RutaCertificado: '',
                FechaFallecimiento: $('#fechFalle').val(),
                FechaRegistro: $('#FechaRegistro').val(),
                FechaSiniestro: $('#FechaSiniestro').val(),
                TipoCobertura: 'CC',
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);

        });
    }

    /*Agregar tabla de Boletas*/
    $('.btn-add').on('click', function () {
        var formchildrengastos = $(this).closest('.row').find('.input').children().not('.chosen-container').not('.btn-add');
        var numrow = $('#tblDocumentos tbody tr').not('#rowTotal').length +1;
        var condicion = "1";
        var tipDoc = $('#sltTipoDoc option:selected').text();
        var numDoc = $('#nDoc').val();
        var fecEmision = $('#fechEmision').val();
        var tipoMOneda = $('#sltTipoMoneda option:selected') .text();
        var monto = $('#txtMonto').val();


        $.each(formchildrengastos, function (index, item) {
            if ($(item).val() === "") {
                condicion = "0"
            }
        }); 
        var row ='<tr>'+
                    '<td>' + numrow + '</td>' +
                    '<td>' + tipDoc + '</td>' +
                    '<td>' + numDoc + '</td>' +
                    '<td>' + fecEmision + '</td>' +
                    '<td>' + tipoMOneda + '</td>' +
                    '<td style="text-align: right;">' + monto + '</td>' +
                    '<td style="text-align: right;" >' +
                        '<span style="font-weight: bold;vertical-align:middle;">3.21</span>' +
                    '</td>' +
                    '<td style="text-align: right;">';
                        if($('#sltTipoMoneda').val() == 1){ 
                            row += '<span style="vertical-align:middle;">'+ monto +'</span>';
                        }else{
                            row += '<span style="vertical-align:middle;">'+ (monto / 3.21).toFixed(2) +'</span>';
                        }
                        
                    row +='</td>' +
                    '<td >' +
                        '<span style="font-weight: bold;vertical-align:middle;">NO</span>' +
                    '</td>' +
                    '<td >' +
                        '<a  class="btn btn-round btn-default" onclick="cargarBoleta(this)">' +
                            '<span class="glyphicon glyphicon-paperclip"></span>' +
                        '</a>&nbsp;' +
                        '<a class="btn btn-round btn-default" onclick="deleterow(this)">' +
                            '<span class="glyphicon glyphicon-minus"></span>' +
                        '</a>' +
                    '</td>' +
                '</tr>';

            if(condicion === "1"){
                $('#tblDocumentos tbody').append(row);
                calcularTotal();
                
            } else {
                app.mensajes.error("Correccion", 'Campos necesarios faltantes', "Aceptar", null);
            }

        
    
    });

    function calcularTotal(){
        var montospen = $('#tblDocumentos tbody tr td:nth-child(8)');
        var suma = 0;
        
        $.each(montospen, function (index, item) { 
            suma += Number(item.textContent);
        });
        $('#monTotal').text(suma.toFixed(2))
    }
    function deleterow(btnrow) {
        $(btnrow).closest('tr').remove();
        calcularTotal();
    }
    function varificaExisteBol(tipDoc , numDoc){
        var tipsDocumentos = $('#tblDocumentos tbody tr td:nth-child(2)');
        var numsDocumentos = $('#tblDocumentos tbody tr td:nth-child(3)');
    }

    function verBeneficiarios(check) {
        if (check.checked) {
            $('#tblBeneficiario input[type=checkbox]').prop('disabled', false).prop('checked', false);
        } else {
            $('#tblBeneficiario input[type=checkbox]').prop('disabled', true).prop('checked', false);
        }
    }
    function viewGastos(check) {
        if (check.checked) {
            $('#dtGastosSepelio').children().not('#btns').show();
            $('#dtGastosSepelio .chosen-select').chosen().trigger("chosen:updated");
            $('#btnSolicitud').prop('disabled', false);
            $('#btnSolicitud').addClass('btn-success');
            $('#btnSolicitud').removeClass('disabled');
        } else {
            $('#dtGastosSepelio').children().not('#btns').hide();
            $('#btnSolicitud').prop('disabled', true);
            $('#btnSolicitud').addClass('disabled');
            $('#btnSolicitud').removeClass('btn-success');
        }
    }

    function inicializarFechas() {
        $('#fechNac').datepicker({
            format: 'dd/mm/yyyy'
        });
        $('#fechEmision').datepicker({
            format: 'dd/mm/yyyy'
        });
        $('#fechFalle').datepicker({
            format: 'dd/mm/yyyy'
        });
    }


