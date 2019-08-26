function validarCamposSolicitud() {
    var r = document.getElementById('codigoBanco');
    var item1 = r.options[r.selectedIndex].value;
    var numcubanco = $("#numCuentaBanco").val();
    var numtel = $("#telefonoAfiCelular").val();
    var numtelfijo = $("#telefonoAfiFijo").val();
    var ddn = $('#ddn').val();
    var td = $('[name=tipoDevolucion]:checked').val();
    var tr = $('#tipoRetiroParc').val();
    var pr = $('#porcentRetiro').val();
    var mo = parseFloat($('#monto').val().replace(/,/g, '')).toFixed(2);
    var ar = $('#armadas').val();
    var pe = $('#periodicidad').val();
    var totalExceso = parseFloat($('#total_exceso_post').val()); //REQ-164

    var montoVsf = parseFloat($('#aporteVsfp').val().replace(/,/g, '')).toFixed(2);
    var ckap = $("#chkAporteVsfp").is(':checked');
    var ckac = $("#chkAporteCombinado").is(':checked');

    var indCci = $("#IndicadorCci").val();

    $("#htipoRetiroParc").val(tr);
    $("#hporcentRetiro").val(pr);
    $("#hmonto").val(mo);
    $("#harmadas").val(ar);
    $("#hperiodicidad").val(pe);
    $("#hmontoBasePension").val($("#saldoPension").val());

    $("#hformaPago").val($("[name=formaPago]:checked").val());

    if ($("#valorBono").val() == "") {
        $("#valorBono").val("0");
    }
    /* RE-1596 comentado
    if (!validarEmail()) {
    alertModal("Debe ingresar un email válido.");
    return false;
    }*/
   
    /*if (numtel == '' && numtelfijo == '') {
        alertModal("Debe ingresar al menos un número telefónico: Número de celular o Teléfono fijo.");
        return false;
    }
    if (numtel != '' && numtel.length < 9) {
        alertModal("El número de celular debe ser de nueve dígitos.");
        return false;
    }
    if (numtel != '' && numtel.charAt(0) != '9') {
        alertModal("El número de celular debe empezar con el número 9.");
        return false;
    }
    if (ddn == '' && numtelfijo != '') {
        alertModal("Debe ingresar un número DDN.");
        return false;
    }
    if (numtelfijo == '' && ddn != '') {
        alertModal("Debe ingresar un número de teléfono fijo.");
        return false;
    }
    if (numtelfijo.length == 6 && ddn == '01') {
        alertModal("El DDN no es correcto.");
        return false;
    }
    if (numtelfijo.length == 7 && ddn != '01') {
        alertModal("El DDN no es correcto.");
        return false;
    }
    if (numtelfijo.length > 1 && numtelfijo.length < 6) {
        alertModal("El número de teléfono fijo no es correcto.");
        return false;
    }*/
    if (td == "") {
        alertModal("Debe seleccionar un tipo de devolución.");
        return false;
    } else if (td == "T1") {
        if (tr == "") {
            alertModal("El tipo de retiro no es válido.");
            return false;
        }
        else if (pr == "") {
            alertModal("El porcentaje no es válido.");
            return false;
        }
        else if (mo == "" || mo == 0) {
            alertModal("El monto no es válido.");
            return false;
        }
        else if (Number(mo) > Number(parseFloat($('#saldoDisponible955').val()).toFixed(2))) {
            alertModal("El monto ingresado no puede ser mayor al monto del Saldo Disponible.");
            return false;
        }
        else if ($('#chk_aporte_exceso').prop("checked") && Number(mo) < Number(totalExceso.toFixed(2))) {
            alertModal("El monto ingresado no puede ser menor al monto de Aportes en Exceso: " + totalExceso.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            return false;
        }
        else if (ar != 1) {
            alertModal("El número de armadas no es válido.");
            return false;
        }
        else if (pe != "") {
            alertModal("La frecuencia de las armadas no es válido.");
            return false;
        }
    } else if (td == "T2") {
        if (tr == "") {
            alertModal("El tipo de retiro no es válido.");
            return false;
        }
        else if (pr == "") {
            alertModal("El porcentaje no es válido.");
            return false;
        }
        else if (mo == "" || mo == 0) {
            alertModal("El monto no es válido.");
            return false;
        }
        else if (Number(mo) > Number(parseFloat($('#saldoDisponible955').val()).toFixed(2))) {
            alertModal("El monto ingresado no puede ser mayor al monto del Saldo Disponible.");
            return false;
        } else if ($('#chk_aporte_exceso').prop("checked") && Number(mo) < Number(totalExceso.toFixed(2))) {
            alertModal("El monto ingresado no puede ser menor al monto de Aportes en Exceso: " + totalExceso.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            return false;
        }
        else if (ar < 2) {
            alertModal("El número de armadas no es válido.");
            return false;
        }
        else if (pe == "") {
            alertModal("La frecuencia de las armadas no es válido.");
            return false;
        }
    } else if (td == "T3") {
        if (tr == "") {
            alertModal("Debe seleccionar un tipo de retiro parcial.");
            return false;
        }
        else if (tr == "P" && pr == "") {
            alertModal("Debe seleccionar un porcentaje.");
            return false;
        }
        else if ((mo == "" || mo == 0)) {
            alertModal("Debe ingresar un monto válido.");
            return false;
        }
        else if (Number(mo) > Number(parseFloat($('#saldoDisponible955').val()).toFixed(2))) {
            alertModal("El monto ingresado no puede ser mayor al monto del Saldo Disponible.");
            return false;
        } else if ($('#chk_aporte_exceso').prop("checked") && Number(mo) < Number(totalExceso.toFixed(2))) {
            alertModal("El monto ingresado no puede ser menor al monto de Aportes en Exceso: " + totalExceso.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            return false;
        }
        else if (ar != 1) {
            alertModal("El número de armadas no es válido.");
            return false;
        }
        else if (pe != "") {
            alertModal("La frecuencia de las armadas no es válido.");
            return false;
        }
    } else if (td == "T4") {
        if (tr == "") {
            alertModal("Debe seleccionar un tipo de retiro parcial.");
            return false;
        }
        else if (tr == "P" && pr == "") {
            alertModal("Debe seleccionar un porcentaje.");
            return false;
        }
        else if ((mo == "" || mo == 0)) {
            alertModal("Debe ingresar un monto válido.");
            return false;
        }
        else if (Number(mo) > Number(parseFloat($('#saldoDisponible955').val()).toFixed(2))) {
            alertModal("El monto ingresado no puede ser mayor al monto del Saldo Disponible.");
            return false;
        } else if ($('#chk_aporte_exceso').prop("checked") && Number(mo) < Number(totalExceso.toFixed(2))) {
            alertModal("El monto ingresado no puede ser menor al monto de Aportes en Exceso: " + totalExceso.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            return false;
        }
        else if (ar < 2) {
            alertModal("El número de armadas no es válido.");
            return false;
        }
        else if (pe == "") {
            alertModal("La frecuencia de las armadas no es válido.");
            return false;
        }
    } else if (td == 'T5') {
        if ($("#saldoPension").val() == "" || parseFloat($('#saldoPension').val().replace(/,/g, '')) == 0) {
            alertModal("El monto para pensión no es válido.");
            return false;
        }
    }
    if (td != "T5" && td != "T6") {

        if (ckap == false && ckac == false && $("#radioAbono").prop("checked") == false &&  ($("#radioCheque").length == 0 || $("#radioCheque").prop("checked") == false) && $("#radioCtaPre").prop("checked") == false) {
            alertModal("Debe seleccionar una forma de pago.");
            return false;
        }
        if ((ckap == true || ckac == true) && $("#tipoFondoPagoAvsfp").val() == "") {
            alertModal("Debe seleccionar el Tipo de Fondo de AVSFP.");
            return false;
        }
        if (ckac == true && (montoVsf == "" || parseFloat(montoVsf) <= parseFloat(0) || parseFloat(montoVsf) >= parseFloat(mo))) {
            alertModal("El monto Avsfp  no es válido, mayor a cero y menor al monto solicitado.");
            return false;
        }
        if (ckac == true && $("#radioAbono").prop("checked") == false && ($("#radioCheque").length == 0 || $("#radioCheque").prop("checked") == false) && $("#radioCtaPre").prop("checked") == false) {
            alertModal("Debe seleccionar una forma de pago complementaria.");
            return false;
        }
        else if ((mo == "" || mo == 0)) {
            alertModal("Debe ingresar un monto válido.");
            return false;
        } else if ($('#chk_aporte_exceso').prop("checked") && Number(mo) < Number(totalExceso.toFixed(2))) {
            alertModal("El monto ingresado no puede ser menor al monto de Aportes en Exceso: " + totalExceso.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            return false;
        }
        if ($("#radioAbono").prop("checked")) {
            if (item1 == "") {
                alertModal("Debe seleccionar un banco.");
                return false;
            }
            else if ($("#tipoCuentaBanco").val() == '' && indCci == "N") {
                alertModal("Debe seleccionar un tipo de cuenta.");
                return false;
            }

            if (item1 === "0009" && numcubanco.length != 10 && indCci == "N") {
                alertModal("Debe ingresar 10 dígitos en el número de cuenta.");
                return false;
            }
            if (item1 === "0011" && numcubanco.length != 20 && indCci == "N") {
                alertModal("Debe ingresar 20 dígitos en el número de cuenta.");
                return false;
            }
            if (item1 === "0003" && numcubanco.length != 13 && indCci == "N") {
                alertModal("Debe ingresar 13 dígitos en el número de cuenta.");
                return false;
            }
            if (item1 === "0002" && numcubanco.length != 14 && indCci == "N") {
                alertModal("Debe ingresar 14 dígitos en el número de cuenta.");
                return false;
            }
            if ($("#numCuentaBanco").val() != $("#numCuentaBanco2").val() && indCci == "N") {
                alertModal("El número de cuenta debe ser el mismo en ambos campos.");
                return false;
            }

            /*2017-03-21 REQ-177 Ctrl cambios
            if (indCci == "S" && $("#tipoCci").val() == "") {
            alertModal("Debe seleccionar un tipo de cuenta interbancaria.");
            return false;
            }*/
            if (indCci == "S" && ($("#cci").val()).length != 20) {
                alertModal("Debe ingresar 20 dígitos en el número de cuenta interbancaria.");
                return false;
            }
            if (indCci == "S" && $("#cci").val() != $("#cci2").val()) {
                alertModal("El número de cuenta interbancaria debe ser el mismo en ambos campos.");
                return false;
            }

            if (!$('#copiaDocId').prop('checked')) {
                alertModal("Debe seleccionar la opción Copia de Documento de Identidad y Voucher.");
                return false;
            }
        }
    }
    if ($("#saldo_pendiente_post").length > 0 && parseFloat($("#saldo_pendiente_post").val()) < 0) {
        alertModal("El saldo de la cuenta presenta inconsistencia, revisar.");
        return false;
    }
    return true;
}

function validarCamposNumericos() {
    // Validar para el ingrerso de números en Ddn, Telefono Fijo, Celular, Montos (incluye punto y coma) y Armadas

    $(document).on("keydown", "#ddn, #telefonoAfiFijo, #telefonoAfiCelular, #armadas, #numCuentaBanco, #numCuentaBanco2, #cci, #cci2", function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    $(document).on("keydown", "#aporteVsfp, #monto", function (e) {
        if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
   
}