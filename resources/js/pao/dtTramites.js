
function dtTramites(tramites) {
    
    var html = '<div class="row" style="padding-top: 3px;">' +
    /* TODO*/
    '<div class="col-md-12">' +
        /* Box */
        '<div class="box-inner">' +
                '<div class="box-header well">' +
                    '<h2 class="header_titulo"><i class=""></i>Información de Trámites del afiliado</h2>' +
                '</div>' +
            /* Box - Content */
            '<div class="box-content">' +
                    '<table class="table table-striped table-bordered responsive">' +
                    '<thead style="background-color:#F2F2F2;">' +
                        '<tr>' +
                            '<td style="text-align: center; font-weight: bold;">Trámite</td>' +
                            '<td style="text-align: center; font-weight: bold;">Fecha Reg.</td>' +
                            '<td style="text-align: center; font-weight: bold;">Tipo</td>' +
                            '<td style="text-align: center; font-weight: bold;">Tipo Doc.</td>' +
                            '<td style="text-align: center; font-weight: bold;">Número Doc.</td>' +
                            '<td style="text-align: center; font-weight: bold;">Nombres</td>' +
                            '<td style="text-align: center; font-weight: bold;">Estado</td>' +
                            '<td style="text-align: center; font-weight: bold;">Fecha Estado</td>' +
                            '<td style="text-align: center; font-weight: bold;">Detalle</td>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';
                            $.each(tramites, function (index, item) {
                                html += '<tr>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.NombreTramite) + '</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.FechaRegistro) + '</td>' +
                                        '<td style="text-align: center;">Afiliado</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.TipoDocumento) + '</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.NumeroDocumento) + '</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.Nombre) + '</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.Estado) + '</td>' +
                                        '<td style="text-align: center;">' + app.validateNULL(item.FechaEstado) + '</td>' +
                                        '<td style="text-align: center;"><a class="btn btn-round btn-default"><span class="glyphicon glyphicon-eye-open"></span></a></td>' +
                                        '</tr>';

                            });
                   html += '</tbody>' +
                '</table>' +
            '</div>' +
            /* /.Box - Content */
        '</div>' +
        /* /.Box */
    '</div>' +
    /* /.TODO*/
'</div>';
    /* /Row*/


    return html;
}

