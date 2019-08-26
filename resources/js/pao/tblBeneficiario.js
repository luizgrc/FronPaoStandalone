function tblBeneficiario(beneficiario) {
    /* TODO*/
    var html = '<table id="tblBen" class="table table-striped table-bordered responsive">' +
        '<thead style="background-color:#F2F2F2;">' +
            '<tr>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Seleccionar</td>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Parentesco</td>' +
                '<td style="text-align: center; font-weight: bold;">Nombres</td>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Tipo Documento</td>' +
                '<td style="text-align: center; font-weight: bold;width: 10%;">Num. Documento</td>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Fec. Nacimiento</td>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Sexo</td>' +
                '<td style="text-align: center; font-weight: bold;width: 8%;">Condición</td>' +
            '</tr>' +
        '</thead>' +
        '<tbody>';
    if (beneficiario != null) {
        $.each(beneficiario, function (index, item) {
            var nombres = app.validateNULL(item.PrimerApellido) + ' ' + app.validateNULL(item.SegundoApellido) + ' ' + app.validateNULL(item.PrimerNombre) + ' ' + app.validateNULL(item.SegundoNombre);
            html += '<tr>' +
                '<td class="group" style="text-align: center;"><input disabled="true" type="checkbox" onchange="validateCheck(this)"/></td>' +
                '<td style="text-align: center;">' + app.validateNULL(item.Parentesco) + '</td>' +
                '<td style="text-align: center;">' + nombres + '<input style="display:none" type="text" value="' + item.Idnss + '" /></td>' +
                '<td style="text-align: center;">' + app.validateNULL(item.TipoDocumento) + '</td>' +
                '<td style="text-align: center;">' + app.validateNULL(item.NumeroDocumento) + '</td>' +
                '<td style="text-align: center;">' + app.validateNULL(item.FechaNacimiento) + '</td>';
                        switch(app.validateNULL(item.Sexo)){
                            case 'F':
                                html += '<td style="text-align: center;">Femenino</td>';
                                break;
                            case 'M':
                                html += '<td style="text-align: center;">Masculino</td>';
                                break;
                            default:
                                html += '<td style="text-align: center;"></td>';
                                break;
                        }

                html +='<td style="text-align: center;">' + app.validateNULL(item.Condicion) + '</td>' +
            '</tr>';
        });
        
        //html += '<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">CONYUGE</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">HIJO1</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">HIJO2</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">HIJO3</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">HIJO4</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">HIJO5</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">PADRE</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>' +
        //'<tr>' +
        //    '<td class="group" style="text-align: center;"><input type="checkbox" onchange="validateCheck(this)"/></td>' +
        //    '<td style="text-align: center;">MADRE</td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //    '<td style="text-align: center;"></td>' +
        //'</tr>';
    } else {
        html += '<tr>' +
            '<td colspan="8" class="group" style="text-align: left;">No se Encontro Información</td>' +
        '</tr>';
    }
    html += '</tbody>' +
'</table>';



    return html;
}

function validateCheck(check) {
    $('#tblBen input[type="checkbox"]').not(check).prop('checked', false);
}