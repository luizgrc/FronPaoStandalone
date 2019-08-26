// JavaScript Document
$(document).ready(function (e) {
    $('#REJA_SOLICITUDREJA').hide();
    //Fondo FullScreen
    var theWindow = $(window), $bg = $("#bg"), aspectRatio = $bg.width() / $bg.height();

    function resizeBg() {

        if ((theWindow.width() / theWindow.height()) < aspectRatio) {
            $bg.removeClass().addClass('bgheight');
        } else {
            $bg.removeClass().addClass('bgwidth');
        }

    }
    theWindow.resize(function () {
        resizeBg();
    }).trigger("resize");
});

$(document).ready(function () {
    var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67;

    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

    $(".no-copy-paste").keydown(function (e) {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) return false;
    });

    $(document).on('contextmenu', '.no-copy-paste', function (e) {
        e.preventDefault();
    });

    $("#overlay").hide();

});

/*$(document).on("keydown", ".input-money", function (e) {
    if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 110, 190, 109, 189]) !== -1 || ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    } else {
        return;
    }
});*/

$(document).on("keydown", ".input-money", function (e) {
    if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(document).on("keydown", ".input-date", function (e) {
    if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 111, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

/*$(document).on("keyup", ".input-money,.input-entero", function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 16]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }

    var value = this.value.split(',').join('').split('.');

    value[0] = value[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    this.value = value.join('.');
});*/

function formatLocalNumber(number, decimals) {
    var d = Number(number).toLocaleString('es-PE', { minimumFractionDigits: decimals });
    return d;
}


$(window).unload(function () {
    $("#overlay").show();
});

$(document).ajaxComplete(function (event, xhr, settings) {

    $("body").removeClass('loading');
    if (xhr.status == 401) {
        window.location = urlInicio;
    }
});


function compareDate(fechamenor, fechamayor) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;

    var valor = 0

    var pos1 = fechamenor.indexOf(dtCh)
    var pos2 = fechamenor.indexOf(dtCh, pos1 + 1)
    var strDayMe = fechamenor.substring(0, pos1)
    var strMonthMe = fechamenor.substring(pos1 + 1, pos2)
    var strYearMe = fechamenor.substring(pos2 + 1)

    var pos3 = fechamayor.indexOf(dtCh)
    var pos4 = fechamayor.indexOf(dtCh, pos3 + 1)
    var strDayMa = fechamayor.substring(0, pos3)
    var strMonthMa = fechamayor.substring(pos3 + 1, pos4)
    var strYearMa = fechamayor.substring(pos4 + 1)

    var fecMenor = strYearMe + strMonthMe + strDayMe
    var fecMayor = strYearMa + strMonthMa + strDayMa

    if (fecMenor == fecMayor) {
        valor = 0
    } else {
        if (fecMenor < fecMayor) {
            valor = 1
        } else {
            valor = -1
        }
    }
    return valor
}

function isValidDate(str) {

    // mm-dd-yyyy hh:mm:ss

    var regex = /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})\s*(\d{0,2}):?(\d{0,2}):?(\d{0,2})/,
      parts = regex.exec(str);

    if (parts) {
        var date = new Date((+parts[3]), (+parts[2]) - 1, (+parts[1]), (+parts[4]), (+parts[5]), (+parts[6]));
        if ((date.getDate() == parts[1]) && (date.getMonth() == parts[2] - 1) && (date.getFullYear() == parts[3])) {
            return date;
        }
    }

    return false;

}

function parseDate(data) {
    var parts = data.split('/');
    var date = new Date(parts[2], parts[1] - 1, parts[0]);
    return date;
}