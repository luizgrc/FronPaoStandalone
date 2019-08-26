function dtAfiliado(afiliado) {
    /* Izquierda*/
    var html = '<div class="col-md-8">' +
        /* Box */
        '<div class="box-inner">' +
                '<div class="box-header well">' +
                    '<h2 class="header_titulo"><i class=""></i>Información del afiliado</h2>' +
                    '<div style="float:right;font-size:13px;margin-top: 3px;"><span style="font-weight:bold">Categoría :</span> S</div>' +
                '</div>' +
            /* Box - Content */
            '<div class="box-content">' +
                        '<table class="table table-bordered responsive" style="margin-bottom:0px;border-bottom: 0px;">' +
                        '<thead style="background-color:#F2F2F2;">' +
                            '<tr>' +
                                '<td style="text-align: center; font-weight: bold;">Apellidos y Nombres</td>' +
                                '<td style="text-align: center; font-weight: bold;">Documento</td>' +
                                '<td style="text-align: center; font-weight: bold;">CUSPP</td>' +
                                '<td style="text-align: center; font-weight: bold;">Fecha de Nacimiento</td>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td style="text-align: center;">' +
                                app.validateNULL(afiliado.PrimerApellido) + ' ' + app.validateNULL(afiliado.SegundoApellido) + ', ' + app.validateNULL(afiliado.PrimerNombre) + ' ' + app.validateNULL(afiliado.SegundoNombre) +
                                '</td>' +
                                '<td style="text-align: center;">' + app.validateNULL(afiliado.TipoDocumento) + '-' + app.validateNULL(afiliado.NumeroIdAfi) + '</td>' +
                                '<td style="text-align: center;">'+
                                    app.validateNULL(afiliado.IdNssAfi) +
                                '</td>' +
                                '<td style="text-align: center;">' + app.validateNULL(afiliado.Fecnacimiento) + '</td>' +
                            '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '<table class="table table-bordered responsive" style="border-top-width: 0px;">' +
                        '<thead style="background-color:#F2F2F2;">' +
                            '<tr>' +
                                '<td style="text-align: center; font-weight: bold;">Teléfono Fijo</td>' +
                                '<td style="text-align: center; font-weight: bold;">Teléfono Celular</td>' +
                                '<td style="text-align: center; font-weight: bold;">Email</td>' +
                                '<td style="text-align: center; font-weight: bold;">Dirección</td>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td style="text-align: center;width: 12%;">' + app.validateNULL(afiliado.TelelfonoDomicilio) + '</td>' +
                                '<td style="text-align: center;width: 12%;">' + app.validateNULL(afiliado.TelefonoCelular) + '</td>' +
                                '<td style="text-align: center;width: 34.8%;">' + app.validateNULL(afiliado.MailPersonal) + '</td>' +
                                '<td style="text-align: center;">' + app.validateNULL(afiliado.Direccion) + '</td>' +
                            '</tr>' +
                        '</tbody>' +
                        '</table>' +
            '</div>' +
            /* /.Box - Content */
        '</div>' +
        /* /.Box */
    '</div>' +
    /* /.Izquierda*/
    /* Derecha*/
    '<div class="col-md-4">' +
        /* Box */
        '<div class="box-inner">' +
                '<div class="box-header well">' +
                    //'<h2 class="header_titulo"><i class=""></i>Cuentas</h2>' +
                    '<div style="float:left;font-size:13px;margin-top: 3px;" class="header_titulo"><span style="font-weight:bold">Estado:</span> <span style="font-weight:bold;color: #c91126;">PASIVO - JUBILADO - SIN COBERTURA</span></div>' +
                '</div>' +
            /* Box - Content */
            '<div class="box-content">' +
                '<table class="table table-bordered responsive">' +
                '<thead style="background-color:#F2F2F2;">' +

                '</thead>' +
                '<tbody>' +
                    '<tr>' +
                        '<td style="background-color:#F2F2F2;text-align: center; font-weight: bold;">Saldo Obligatorio</td>' +
                        '<td style="text-align: center;"> Fondo ' + app.validateNULL(afiliado.TipoFondoAporteOb) + '</td>' +
                        '<td style="text-align: right;">' + app.validateNULL(afiliado.SaldoAporteOb) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="background-color:#F2F2F2;text-align: center; font-weight: bold;">SVCFP</td>' +
                        '<td style="text-align: center;"> Fondo ' + app.validateNULL(afiliado.TipoFondoAvcfp) + '</td>' +
                        '<td style="text-align: right;">' + app.validateNULL(afiliado.SaldoAvcfp) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="background-color:#F2F2F2;text-align: center; font-weight: bold;">SVSFP</td>' +
                        '<td style="text-align: center;">Fondo ' + app.validateNULL(afiliado.TipoFondoAvsfp) + '</td>' +
                        '<td style="text-align: right;">' + app.validateNULL(afiliado.SaldoAvsfp) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="background-color:#F2F2F2;text-align: center; font-weight: bold;">Total Saldo CIC</td>' +

                        '<td colspan="2" style="text-align: right;">' + app.validateNULL(afiliado.SaldoBaseRetiro) + '</td>' +
                    '</tr>' +
                '</tbody>' +
                '</table>' +
                '<input type="hidden" id="IdNssAfi" value="' + app.validateNULL(afiliado.IdNssAfi) + '" />' +
                '<input type="hidden" id="CodCuentaAfi" value="' + app.validateNULL(afiliado.CodigoCuentaAfi) + '" />' +
                '<input type="hidden" id="PrimerNombreAfi" value="' + app.validateNULL(afiliado.PrimerNombre) + '" />' +
                '<input type="hidden" id="SegundoNombreAfi" value="' + app.validateNULL(afiliado.SegundoNombre) + '" />' +
                '<input type="hidden" id="PrimerApellidoAfi" value="' + app.validateNULL(afiliado.PrimerApellido) + '" />' +
                '<input type="hidden" id="SegundoApellidoAfi" value="' + app.validateNULL(afiliado.SegundoApellido) + '" />' +
                '<input type="hidden" id="EmailDeclaranteAfi" value="' + app.validateNULL(afiliado.MailPersonal) + '" />' +
                '<input type="hidden" id="CodTipoDocumentoAfi" value="' + app.validateNULL(afiliado.CodTipoDocumento) + '" />' +
                '<input type="hidden" id="NumeroIdAfi" value="' + app.validateNULL(afiliado.NumeroIdAfi) + '" />' +
            '</div>' +
            /* /.Box - Content */
        '</div>' +
        /* /.Box */
    '</div>';
    /* /.Derecha*/

    return html;
}
