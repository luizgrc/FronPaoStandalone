$(document).ready(function () {

    if (parseInt($("#CantSolicitudesPendiente").val()) > 0) {
        alertModal("Existen evaluaciones pendientes de aprobación con más días de lo permitido.");
    }

    inicializarFechas();

    $("#btnBuscarSolicitud").click(function () {
        glbCuspp = "";
        glbSeqEvaluacion = 0;

        if ($('#txtFechaInicial').val() && !isValidDate($('#txtFechaInicial').val())) {
            alertModal("La fecha de evaluación inicial no es válida.");
            $('#txtFechaInicial').val("");
            return;
        }

        if ($('#txtFechaFinal').val() && !isValidDate($('#txtFechaFinal').val())) {
            alertModal("La fecha de evaluación final no es válida.");
            $('#txtFechaFinal').val("");
            return;
        }

        var fecRegistroIni = parseDate($('#txtFechaInicial').val());
        var fecRegistroFin = parseDate($('#txtFechaFinal').val());

        if (fecRegistroIni && fecRegistroFin && fecRegistroFin < fecRegistroIni) {
            alertModal("La fecha de evaluación inicial debe ser menor o igual a la fecha de evaluación final.");
            return false;
        }

        var parametroBandejaDTO = {
            TipoDocumento: $('#idTipDoc').val(),
            NumeroDocumento: ($('#idNumDoc').val()).toUpperCase(),
            FechaInicial: $('#txtFechaInicial').val() && fecRegistroIni.toISOString(),
            FechaFinal: $('#txtFechaFinal').val() && fecRegistroFin.toISOString(),
            IndPaso1: $('#IndPaso1').val()
        };

        if (typeof (tbSolicitudes) != "undefined") {
            tbSolicitudes.destroy();
        }

        tbSolicitudes = $('#tabla-conSolicitudes').DataTable({
            "aoColumnDefs": [{ "sClass": "text-center", "aTargets": [0, 1, 6, 8] }, { "sClass": "text-right", "aTargets": [7] }],
            "bLengthChange": false,
            "bFilter": false,
            "bSort": false,
            "language": { "url": urlInicio +'/resources/plugins/dataTables/Spanish.json' },
            "bProcessing": true,
            "bServerSide": false,
            "sAjaxSource": 'BuscarEvaluacionesZp',
            "sServerMethod": "POST",
            "fnServerParams": function (aoData) {
                aoData.push(
                            { "name": "TipoDocumento", "value": parametroBandejaDTO.TipoDocumento },
                            { "name": "NumeroDocumento", "value": parametroBandejaDTO.NumeroDocumento },
                            { "name": "FechaInicial", "value": parametroBandejaDTO.FechaInicial },
                            { "name": "FechaFinal", "value": parametroBandejaDTO.FechaFinal },
                            { "name": "IndPaso1", "value": parametroBandejaDTO.IndPaso1 }
                       );
            },
            "initComplete": function (settings, json) {
               
            }
        });
    });

    $(document).on("click", 'a[name=btnAprobar]', function () {
        glbCuspp = $(this).closest('a').attr('data-cuspp');
        glbSeqEvaluacion = $(this).closest('a').attr('data-evaluacion');
        alertModalQuestion("¿Confirma que desea aprobar la evaluación?", 'aprobarEvaluacion');
    });

    $(document).on("click", 'a[name=btnRechazar]', function () {
        glbCuspp = $(this).closest('a').attr('data-cuspp');
        glbSeqEvaluacion = $(this).closest('a').attr('data-evaluacion');
        alertModalQuestion("¿Confirma que desea rechazar la evaluación?", 'rechazarEvaluacion');
    });

    $(document).on("click", 'a[name=btnVer]', function () {
        $(this).closest('td').find('a[name=btnAprobar]').attr("disabled", false);
        $(this).closest('td').find('a[name=btnRechazar]').attr("disabled", false);
        var ruta = $(this).closest('a').attr('data-ruta');
        verArchivo(ruta);
    });

    $("#btnBuscarSolicitud").click();
});

var glbCuspp = "";
var glbSeqEvaluacion = 0;
var ruta = "";

function verArchivo(ruta) {
    window.open(urlInicio + "Reja/ObtenerArchivo?path=" + ruta);
}

function aprobarEvaluacion() {
    $("body").addClass('loading');

    $.post("SetAprobacionPaso1", { idNss: glbCuspp, seqEvaluacion: glbSeqEvaluacion, estado: '2' }, function (data) {
        if (data.Rpta === "TRUE") {
            alertModal("La aprobación se realizó correctamente.");
            $("#btnBuscarSolicitud").click();
            return;
        } else {
            alertModal("No se pudo realizar la aprobación.");
            return;
        }
    });
}

function rechazarEvaluacion() {
    $("body").addClass('loading');

    $.post("SetAprobacionPaso1", { idNss: glbCuspp, seqEvaluacion: glbSeqEvaluacion, estado: '3' }, function (data) {
        if (data.Rpta === "TRUE") {
            alertModal("El rechazo se realizó correctamente.");
            $("#btnBuscarSolicitud").click();
            return;
        } else {
            alertModal("No se pudo realizar el rechazo.");
            return;
        }
    });
}

function inicializarFechas() {
    fechaDel = $('#txtFechaInicial').datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        if (ev.date.valueOf() > fechaAl.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate());
            fechaAl.setValue(newDate);
        } else {
            fechaAl.setValue(fechaAl.date);
        }
        if (ev.viewMode == "days") {
            fechaDel.hide();
            $('#txtFechaFinal')[0].focus();
        }
    }).data('datepicker');

    fechaAl = $('#txtFechaFinal').datepicker({
        format: 'dd/mm/yyyy',
        onRender: function (date) {
            if ($('#txtFechaInicial').val() != '')
                return date.valueOf() < fechaDel.date.valueOf() ? 'disabled' : '';
            return '';
        }
    }).on('changeDate', function (ev) {
        if (ev.viewMode == "days") {
            fechaAl.hide();
        }
    }).data('datepicker');
}