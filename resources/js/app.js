/*
* =============== CREACION ====================
* Por: Quality Gardian SAC | http://www.qualitygardian.com
* Fecha: 2018-12-11
* Requerimiento: REQ – 243 Rediseño del SGA
* Descripcion: Nuevo Sistema de Control de Accesos
* ======= MODIFICACION 0001(MOD.0001) ========
* Por:
* Fecha:
* Date:
* Requerimiento:
* Descripcion:
* =============================================
*/

var app = (function ($, win, doc) {
    var contenedorPrincipal = $("#content");
    var rutaUbicacion = win.location.origin + win.location.pathname;
    var urlBase = urlBaseAbsoluta;
    var llamadasAjax = 0;
    $btnSalirPortal = $("#btnSalirPortal");

    var defaultsApp = (function () {
        var dataTableLenguaje = {
            "paginate": {
                "first": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "last": '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                "next": '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                "previous": '<i class="fa fa-angle-left" aria-hidden="true"></i>'
            },
            "lengthMenu": "Registros por página: _MENU_",
            "search": "Buscar:",
            "loadingRecords": "Cargando...",
            "processing": '<img src="/PlanDescuentos/resources/img/loading.gif" style="width:128px; height:128px; display:block; margin:auto;"/>',
            "emptyTable": "Sin datos",
            "zeroRecords": "No existen coindicencias",
            "info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 al 0 registros",
            "infoFiltered": "(Filtrado de _MAX_ registros en total)",
            "select": {
                "rows": {
                    "_": "%d registros seleccionados",
                    "0": "",
                    "1": ""
                }
            }
        };
        var dataTablePaginacion = true;
        var dataTableBusqueda = false;
        var dataTableOrdenamiento = false;
        var dataTableSeleccion = {
            simple: "single",
            multiple: 'multi'
        };
        var dataTableCambiarRegistros = false;
        var dataTableTamanioPagina = 20;
        var select2Limpiar = true;
        var select2Estilo = {
            single: "single",
            multiple: "multiple"
        };
        var select2Placeholder = "Seleccionar";
        var lenguaje = "es";
        var datePickerFormato = "dd/mm/yyyy";
        var datePickerAutocerrar = true;
        var modalKeyboard = false;
        var modalBackdrop = "static";

        return {
            dataTableLenguaje: dataTableLenguaje,
            dataTablePaginacion: dataTablePaginacion,
            dataTableBusqueda: dataTableBusqueda,
            dataTableOrdenamiento: dataTableOrdenamiento,
            dataTableSeleccion: dataTableSeleccion,
            dataTableCambiarRegistros: dataTableCambiarRegistros,
            dataTableTamanioPagina: dataTableTamanioPagina,
            select2Limpiar: select2Limpiar,
            select2Estilo: select2Estilo,
            select2Placeholder: select2Placeholder,
            lenguaje: lenguaje,
            datePickerFormato: datePickerFormato,
            datePickerAutocerrar: datePickerAutocerrar,
            modalKeyboard: modalKeyboard,
            modalBackdrop: modalBackdrop
        };
    })();

    // Constructor
    $(inicializar);

    function inicializar() {
        // Binding de eventos
        $.fn.datepicker.defaults.autoclose = defaultsApp.datePickerAutocerrar;
        $.fn.datepicker.defaults.format = defaultsApp.datePickerFormato;
        $.fn.datepicker.defaults.language = defaultsApp.lenguaje;

        $btnSalirPortal.click(btnSalirPortalClick);
        // Funciones iniciales
        establecerMenuActivo();

        // Activamos eventos cuando el doom este listo
        $(doc).on("keydown", ".input-entero", soloEnteros);
        $(doc).on("keydown", ".input-decimal", soloDecimal);
        $(doc).on("blur", ".input-decimal", soloDecimalBlur);

        // Activar el tooltip
        $('.sga-tooltip').tooltip({ html: true });
    }


    function btnSalirPortalClick() {
        document.getElementById('logoutForm').submit();
        //win.close();
    }

    // Permitir el ingreso de solo numeros enteros
    function soloEnteros(e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
    // Permitir el ingreso de solo numeros enteros
    function soloDecimal(e) {
        console.log(e.keyCode);
        var arrowsKeyCodes = [37, 38, 39, 40];
        var numPadNumberKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        var dots = [110, 190];
        var tabBackDel = [8, 9, 46];
        var acv = [65, 67, 86];

        // Allow only one dot.
        if (e.target.value.indexOf('.') !== -1 && dots.indexOf(e.keyCode) !== -1) {
            e.preventDefault();
        }
        // allow only [0-9] number, numpad number, arrow,  BackSpace, Tab, Del
        // Ctrl + C, Ctrl + V, Ctrl + A
        if ((e.keyCode < 48 && arrowsKeyCodes.indexOf(e.keyCode) === -1 ||
             e.keyCode > 57 && numPadNumberKeyCodes.indexOf(e.keyCode) === -1 && dots.indexOf(e.keyCode) === -1)
            && tabBackDel.indexOf(e.keyCode) === -1 && (e.ctrlKey === false || e.ctrlKey === true && acv.indexOf(e.keyCode) === -1)) {
            e.preventDefault();
        }
    }
    function soloDecimalBlur(e) {
        var value = e.target.value;
        if (value.substring(value.length - 1) === '.')
            e.target.value = value.substring(0, value.length - 1)
    }

    // Establecer el menu activo
    function establecerMenuActivo() {
        $('ul.sidebar-menu a').filter(function () {
            return this.href === rutaUbicacion;
        }).parent().addClass('active');

        $('ul.treeview-menu a').filter(function () {
            return this.href === rutaUbicacion;
        }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active menu-open');
    }

    // Mensajes del sistema
    var mensajes = (function () {
        // Asignacion de variables del modal de mensajes
        var $modal = $("#ModalMensajeApp");
        var $titulo = $("#tituloModalMensaje");
        var $cuerpo = $("#cuerpoModalMensaje");
        var $btnAceptar = $("#btnAceptarModalMensaje");
        var $btnCancelar = $("#btnCancelarModalMensaje");

        // Configuracion de las opciones por defecto
        var defaultsMensajes = {
            titulo: "SGA",
            mensaje: "",
            textoBotonAceptar: "Aceptar",
            textoBotonCancelar: "Cerrar",
            callbackAceptar: null,
            callbackCancelar: null,
            callback: null,
            estilo: {
                primario: "alert-success",
                informacion: "alert-warning",
                exito: "alert-success",
                advertencia: "alert-warning",
                error: "alert-danger",
                tituloexito: "titulo-sucess",
                tituloadvertencia: "titulo-warning",
                tituloerror: "titulo-error"
            },
        };

        // Constructor
        $(inicializar);

        function inicializar() {
            // Binding de eventos
            $btnAceptar.click(btnAceptarClick);
            $btnCancelar.click(btnCancelarClick);
            $modal.on("hidden.bs.modal", modalOnHidden);
        }

        // Accion al dar click en el boton Aceptar del mensage
        function btnAceptarClick() {
            defaultsMensajes.callback = defaultsMensajes.callbackAceptar;
        }

        // Accion al dar click en el boton Cancelar del mensaje
        function btnCancelarClick() {
            defaultsMensajes.callback = defaultsMensajes.callbackCancelar;
        }

        // Accion cuando se cierra el modal
        function modalOnHidden() {
            if (!esNuloNoDefinido(defaultsMensajes.callback)) {
                defaultsMensajes.callback();
            }
        }

        // Muestra un mensaje modal primario
        function primario(mensaje) {
            $modal.attr("class", "modal fade");
            $titulo.text(defaultsMensajes.titulo);
            $cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.primario + " text-center");
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajes.mensaje);
            $btnAceptar.show().html(defaultsMensajes.textoBotonAceptar);
            $btnCancelar.hide();
            defaults.callbackAceptar = null;
            defaults.callbackCancelar = null;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Muestra un mensaje modal de informacion
        function informacion(titulo, mensaje, textoBotonAceptar, callback) {
            $modal.attr("class", "modal fade");
            $titulo.text(defaultsMensajes.titulo);
            $cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.informacion + " text-center");
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajes.mensaje);
            $btnAceptar.show().html(!esNuloNoDefinido(textoBotonAceptar) ? textoBotonAceptar : defaultsMensajes.textoBotonAceptar);
            $btnCancelar.hide();
            defaultsMensajes.callbackAceptar = callback;
            defaultsMensajes.callbackCancelar = null;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Muestra un mensaje modal de exito
        function exito(titulo, mensaje, textoBotonAceptar, callback) {
            $modal.attr("class", "modal fade");
            $titulo.text(!esNuloNoDefinido(titulo) ? titulo : defaultsMensajes.titulo);
            $titulo.attr("class", defaultsMensajes.estilo.tituloexito);
            $cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.exito + " text-center");
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajes.mensaje);
            $btnAceptar.show().html(!esNuloNoDefinido(textoBotonAceptar) ? textoBotonAceptar : defaultsMensajes.textoBotonAceptar);
            $btnCancelar.hide();
            defaultsMensajes.callbackAceptar = callback;
            defaultsMensajes.callbackCancelar = null;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Muestra un mensaje modal de confirmacion
        function advertencia(titulo, mensaje, textoBotonAceptar, textoBotonCancelar, callbackAceptar, callbackCancelar) {
            $modal.attr("class", "modal fade");
            $titulo.text(!esNuloNoDefinido(titulo) ? titulo : defaultsMensajes.titulo);
            $titulo.attr("class", defaultsMensajes.estilo.tituloadvertencia);
            $cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.advertencia + " text-center");
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajes.mensaje);
            $btnAceptar.show().html(!esNuloNoDefinido(textoBotonAceptar) ? textoBotonAceptar : defaultsMensajes.textoBotonAceptar);
            $btnCancelar.show().html(!esNuloNoDefinido(textoBotonCancelar) ? textoBotonCancelar : defaultsMensajes.textoBotonCancelar);
            defaultsMensajes.callbackAceptar = callbackAceptar;
            defaultsMensajes.callbackCancelar = callbackCancelar;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Muestra un mensaje modal de error
        function error(titulo, mensaje, textoBotonAceptar, callback) {
            $modal.attr("class", "modal fade");
            $titulo.text(!esNuloNoDefinido(titulo) ? titulo : defaultsMensajes.titulo);
            $titulo.attr("class", defaultsMensajes.estilo.tituloerror);
            $cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.error + " text-center");
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajes.mensaje);
            $btnAceptar.show().html(!esNuloNoDefinido(textoBotonAceptar) ? textoBotonAceptar : defaultsMensajes.textoBotonAceptar);
            $btnCancelar.hide();
            defaultsMensajes.callbackAceptar = callback;
            defaultsMensajes.callbackCancelar = null;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }
        // Muestra un mensaje modal de Imagen
        function viewimagen(titulo, srcimagen, textoBotonAceptar, callback) {
            $modal.attr("class", "modal fade");
            $titulo.text(!esNuloNoDefinido(titulo) ? titulo : defaultsMensajes.titulo);
            $titulo.attr("class", defaultsMensajes.estilo.tituloadvertencia);
            //$cuerpo.attr("class", "modal-body " + defaultsMensajes.estilo.exito + " text-center");
            $cuerpo.html('<img id="blah" src="' + URL.createObjectURL(srcimagen) + '" alt="your image" />');
            $btnAceptar.show().html(!esNuloNoDefinido(textoBotonAceptar) ? textoBotonAceptar : defaultsMensajes.textoBotonAceptar);
            $btnCancelar.hide();
            defaultsMensajes.callbackAceptar = callback;
            defaultsMensajes.callbackCancelar = null;
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Retorno de funciones para ser llamados desde otros scripts
        return {
            primario: primario,
            informacion: informacion,
            exito: exito,
            advertencia: advertencia,
            error: error,
            viewimagen: viewimagen
        };
    })();

    // Error general del sistema
    var errorGeneral = (function () {
        // Asignacion de variables
        var $modal = $("#modalError");
        var $titulo = $("#tituloModalError");
        var $cuerpo = $("#cuerpoModalError");

        // Configuracion de las opciones por defecto
        var defaultsErrorGeneral = {
            titulo: "SGA",
            mensaje: "Se ha producido un error inesperado al procesar su solicitud."
        };

        // Muestra el modal de error general
        function mostrar(titulo, mensaje) {
            $titulo.html(!esNuloNoDefinido(titulo) ? titulo : defaultsErrorGeneral.titulo);
            $cuerpo.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsErrorGeneral.mensaje);
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Retorno de funciones
        return {
            mostrar: mostrar
        };
    })();

    // Mensajes del sistema cuando esta procesando
    var mensajeCargando = (function () {
        // Asignacion de variables
        var $modal = $("#modalCargando");
        var $mensaje = $("#mensajeModalCargando");

        // Configuracion de las opciones por defecto
        var defaultsMensajeCargando = {
            mensaje: "Procesando, por favor espere..."
        };

        // Muestra mensaje de espera mientras se cargan datos
        function mostrar(mensaje) {
            $mensaje.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajeCargando.mensaje);
            return $modal.modal({
                keyboard: defaultsApp.modalKeyboard,
                backdrop: defaultsApp.modalBackdrop
            });
        }

        // Oculta mensaje de espera mientras se cargan datos
        function ocultar() {
            return $modal.modal("hide");
        }

        // Establece un mensaje en el modal
        function establecerMensaje(mensaje) {
            $mensaje.html(!esNuloNoDefinido(mensaje) ? mensaje : defaultsMensajeCargando.mensaje);
        }

        // Retorno de funciones
        return {
            mostrar: mostrar,
            ocultar: ocultar,
            establecerMensaje: establecerMensaje
        };
    })();

    // Ejecuta una llamada ajax con los parametros especificados
    function ajax(metodo, url, data, callbackCompletado, callbackError, callbackSiempre, mensajeEspera) {
        try {
            var m = !esNuloNoDefinido(metodo) ? metodo : "POST";
            var u = urlBase + url;
            var d = !esNuloNoDefinido(data) ? data : "";

            llamadasAjax++;

            if (llamadasAjax === 1) {
                mensajeCargando.mostrar(mensajeEspera);
            } else {
                mensajeCargando.establecerMensaje(mensajeEspera);
            }

            return $.ajax({
                method: m,
                url: u,
                data: d,
                cache: false,
                contentType: 'application/json',
                dataType: "json"
            }).done(function (data, textStatus, jqXhr) {
                if (data.Status === 1) {
                    if (!esNuloNoDefinido(callbackCompletado)) {
                        callbackCompletado(data.Result);
                    }
                } else if (data.Status === 0) {
                    mensajes.error("Error", data.CurrentException, "Aceptar", callbackError);
                } else {
                    contenedorPrincipal.html(data);
                }
            }).fail(function (jqXhr, textStatus, errorThrow) {
                if (jqXhr.status != 401) {
                    var mensaje = "<h4>Se ha producido un error inesperado al procesar su solicitud.</h4>";
                    mensaje = mensaje + "Estado: " + jqXhr.status + "<br />";
                    mensaje = mensaje + "Descripción del error: <br />" + errorThrow;
                    errorGeneral.mostrar("Error General", mensaje);
                }
            }).always(function (jqXhr, textStatus) {
                llamadasAjax--;
                if (llamadasAjax === 0) {
                    mensajeCargando.ocultar();
                }
                if (!esNuloNoDefinido(callbackSiempre)) {
                    callbackSiempre();
                }
            });

        } catch (e) {
            mensajeCargando.ocultar();
            var mensaje = "<h4>Se ha producido un error inesperado al procesar su solicitud.</h4>";
            mensaje = mensaje + "Descripción del error: <br />" + e.toString();
            errorGeneral.mostrar("Error General", mensaje);
        }
    }

    // Verifica si un parametro es nulo o no definido
    function esNuloNoDefinido(valor) {
        if (typeof valor === "undefined" || valor === null) {
            return true;
        } else {
            return false;
        }
    }

    // Verifica si un parametro es vacio
    function esNuloVacioNoDefinido(valor) {
        if (typeof valor === "undefined" || valor === null || String(valor).trim().length === 0) {
            return true;
        } else {
            return false;
        }
    }


    // Llena un combox con datos. La estructura de Data es "Value" y "Text"
    function llenarCombobox(selector, data, selectorPadre, primerItem, filtros, primerSeleccionado) {
        if (!esNuloNoDefinido(primerItem)) {
            var item = {
                Value: primerItem.Value,
                Text: primerItem.Text
            };
            data.splice(0, 0, item);
        }
        selector.empty();
        selector.select2({
            dropdownParent: selectorPadre,
            language: defaultsApp.language,
            allowClear: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.allowClear) ? filtros.allowClear : defaultsApp.select2Limpiar,
            placeholder: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.placeholder) ? filtros.placeholder : defaultsApp.select2Placeholder,
            data: $.map(data, function (obj, i) {
                if (obj.Value !== null && obj.Text !== null) {
                    return {
                        id: obj.Value,
                        text: obj.Text
                    };
                } else {
                    return null;
                }
            })
        });

        if (primerSeleccionado) {
            selector.val("-1").trigger('change');
        }
        var selected = selector.attr('data-selected');
        if (selected) {
            selector.val(selected).trigger("change");
        }
    }

    // Llena un datatable con datos y especificacion de columnas
    function llenarDataTable(selector, data, columnas, definicionColumnas, nombreTabla, filtros, columnsDynam) {
        var tabla;
        if ($.fn.dataTable.isDataTable(nombreTabla)) {
            tabla = selector.dataTable().api();
        } else {
            tabla = selector.dataTable({
                paging: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.paging) ? filtros.paging : defaultsApp.dataTablePaginacion,
                searching: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.searching) ? filtros.searching : defaultsApp.dataTableBusqueda,
                ordering: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.ordering) ? filtros.ordering : defaultsApp.dataTableOrdenamiento,
                select: {
                    style: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.select) ? filtros.select : defaultsApp.dataTableSeleccion.simple,
                },
                order: [],
                columns: columnas,
                columnDefs: definicionColumnas,
                language: defaultsApp.dataTableLenguaje,
                pageLength: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.pageLength) ? filtros.pageLength : defaultsApp.dataTableTamanioPagina,
                lengthChange: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.lengthChange) ? filtros.lengthChange : defaultsApp.dataTableCambiarRegistros,
                info: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.info) ? filtros.info : true,
            }).api();
        }
        tabla.clear();
        if (data) {
            tabla.rows.add(data);
        }
        if (columnsDynam) {
            columnsDynam.forEach(function (v, i, arr) {
                var col = tabla.column(v.target);
                col.visible(v.visible);
            });
        }
        tabla.columns.adjust().draw();
        //tabla.draw();
        return tabla;
    }

    function llenarDataTableAjax(selector, columnas, definicionColumnas, filtros, ajax) {
        //if ($.fn.dataTable.isDataTable(nombreTabla)) {
        //    table = selector.DataTable();
        //}
        tabla = selector.DataTable({
            destroy: true,
            processing: true,
            serverSide: true,
            paging: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.paging) ? filtros.paging : defaultsApp.dataTablePaginacion,
            searching: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.searching) ? filtros.searching : defaultsApp.dataTableBusqueda,
            ordering: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.ordering) ? filtros.ordering : defaultsApp.dataTableOrdenamiento,
            select: {
                style: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.select) ? filtros.select : defaultsApp.dataTableSeleccion.simple,
            },
            order: [],
            columns: columnas,
            columnDefs: definicionColumnas,
            language: defaultsApp.dataTableLenguaje,
            pageLength: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.pageLength) ? filtros.pageLength : defaultsApp.dataTableTamanioPagina,
            lengthChange: !esNuloNoDefinido(filtros) && !esNuloNoDefinido(filtros.lengthChange) ? filtros.lengthChange : defaultsApp.dataTableCambiarRegistros,
            ajax: ajax
        });
    }

    // Convierte un tipo DateTime .Net a Date in javascript
    function convertirEnFecha(data, conFormato) {
        try {
            var fecha = new Date(parseInt(data.substr(6)));
            if (conFormato) {
                var dd = fecha.getDate();
                var mm = fecha.getMonth() + 1;
                var yy = fecha.getFullYear();
                var fechaFormateada = ("00" + dd).slice(-2) + "/" + ("00" + mm).slice(-2) + "/" + yy;
                return fechaFormateada;
            } else {
                return fecha;
            }
        } catch (e) {
            return null;
        }
    }

    // Convierte un tipo DateTime .Net a Time in javascript
    function convertirEnHora(data, conFormato) {
        try {
            var hora = new Date(parseInt(data.substr(6)));
            if (conFormato) {
                var hh = hora.getHours();
                var mm = hora.getMinutes();
                var horaFormateada = ("00" + hh).slice(-2) + ":" + ("00" + mm).slice(-2);
                return horaFormateada;
            } else {
                return hora;
            }
        } catch (e) {
            return null;
        }
    }

    function parseDate(data) {
        var parts = data.split('/');
        var date = new Date(parts[2], parts[1] - 1, parts[0]);
        return date;
    }

    function isValidDate(str) {
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

    // Convierte un tipo DateTime .Net a Date in javascript
    function convertirEnFechaHora(data, conFormato) {
        try {
            var fecha = new Date(parseInt(data.substr(6)));
            if (conFormato) {
                var dd = fecha.getDate();
                var mm = fecha.getMonth() + 1;
                var yy = fecha.getFullYear();
                var hh = fecha.getHours();
                var fechaFormateada = ("00" + dd).slice(-2) + "/" + ("00" + mm).slice(-2) + "/" + yy;

                var mi = fecha.getMinutes();
                var ss = fecha.getSeconds();
                var horaFormateada = ("00" + hh).slice(-2) + ":" + ("00" + mi).slice(-2) + ":" + ("00" + ss).slice(-2);
                return fechaFormateada + " " + horaFormateada;
            } else {
                return fecha;
            }
        } catch (e) {
            return null;
        }
    }

    // Selecciona una opcion de un combobox a partir del texto
    function seleccionarItemComboPorTexto(selector, texto) {
        selector.find("option").each(function () {
            var id = $(this).val();
            var text = $(this).text();
            if (text.toLowerCase() === texto.toLowerCase()) {
                selector.val(id).trigger("change");
                return false;
            }
        });
    }

    // Obtiene el valor del parametro url especificado
    function obtenerParametroUrl(nombreParametro) {
        var valor = null;
        var urlParam = win.location.search.substring(1);
        var objParams = urlParam.split("&");

        $.each(objParams, function (index, object) {
            var params = object.split("=");
            if (params[0] === nombreParametro) {
                valor = decodeURIComponent(params[1]);
            }
        });
        if (valor.length === 0) {
            valor = null;
        }

        return valor;
    }

    // Obtiene el valor de una celda de una fila seleccionada en el datatable, especificando el nombre de la columna
    function obtenerValorCeldaFilaSeleccionadaDatatable(selector, nombreColumna) {
        var filas = selector.dataTable().api().rows(".selected").data().count();
        if (filas > 0) {
            var command;
            if (!esNuloNoDefinido(nombreColumna)) {
                command = 'selector.dataTable().api().rows(".selected").data()[0].' + nombreColumna;

            } else {
                command = 'selector.dataTable().api().rows(".selected").data()[0]';
            }
            return eval(command);
        } else {
            return null;
        }
    }

    // Obtiene toda la fila de un datatable especificando el numero de la fila
    function obtenerFilaDatatable(selector, numeroFila) {
        var filas = selector.dataTable().api().rows().data().count();
        if (filas > 0) {
            var command;
            if (!esNuloNoDefinido(numeroFila)) {
                command = 'selector.dataTable().api().rows().data()[' + numeroFila + ']';
            } else {
                command = 'selector.dataTable().api().rows().data()';
            }
            return eval(command);
        } else {
            return null;
        }
    }

    // Redirecciona a otra pagina local
    function redirigirA(url) {
        win.location.href = urlBase + url;
    }

    // Formatear un numero a la cantidad de digitos decimales establecido y en formato con separador de miles con comas
    function formatoNumeroConComas(cadenaNumero, decimales) {
        if (esNuloNoDefinido(decimales) || isNaN(decimales)) {
            decimales = 0;
        } else {
            decimales = parseInt(decimales);
        }

        try {
            cadenaNumero = parseFloat(cadenaNumero.replace(/[^0-9\.]/g, '')).toFixed(decimales);

            if (!isNaN(cadenaNumero)) {
                return cadenaNumero.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            } else {
                return parseFloat("0").toFixed(decimales);
            }
        } catch (e) {
            return parseFloat("0").toFixed(decimales);
        }
    }

    // Formatea un numero con separador de miles con comas, a un valor numerico sin comas
    function formatoNumero(cadenaNumero) {
        try {
            var numero = parseFloat(cadenaNumero.replace(/,/g, ''));
            return numero;
        } catch (e) {
            return parseFloat("0");
        }
    }

    // Convierte un balor booleado en SI o No
    function convertirBoolEnSiNo(valorBooleano) {
        if (esNuloNoDefinido(valorBooleano)) {
            return "";
        }
        if (valorBooleano) {
            return "SI";
        } else {
            return "NO";
        }
    }

    function compararFechas(fechamenor, fechamayor) {
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

    function isUrl(str) {
        str = str.toLowerCase();
        regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }

    function validarEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    // Valida NULL y si es tipo number en decimal 0.00
    function validateNULL(campo) {
        if (typeof (campo) == "number") {
            if (campo == 0) {
                return campo.toFixed(2);
            }
        }
        return campo != null ? campo : "";
    }

    function alfanumerico(valor) {
        var re = /^[a-z0-9]+$/i;
        return re.test(valor);
    }


    function alfanumericoguion(valor) {
        var re = /^[a-z0-9\-]+$/i;
        return re.test(valor);
    }

    // Retorno de funciones
    return {
        rutaUbicacion: rutaUbicacion,
        urlBase: urlBase,
        defaultsApp: defaultsApp,
        mensajes: mensajes,
        errorGeneral: errorGeneral,
        mensajeCargando: mensajeCargando,
        ajax: ajax,
        esNuloNoDefinido: esNuloNoDefinido,
        esNuloVacioNoDefinido: esNuloVacioNoDefinido,
        llenarCombobox: llenarCombobox,
        llenarDataTable: llenarDataTable,
        llenarDataTableAjax: llenarDataTableAjax,
        convertirEnFecha: convertirEnFecha,
        convertirEnHora: convertirEnHora,
        seleccionarItemComboPorTexto: seleccionarItemComboPorTexto,
        obtenerParametroUrl: obtenerParametroUrl,
        obtenerValorCeldaFilaSeleccionadaDatatable: obtenerValorCeldaFilaSeleccionadaDatatable,
        obtenerFilaDatatable: obtenerFilaDatatable,
        redirigirA: redirigirA,
        formatoNumeroConComas: formatoNumeroConComas,
        formatoNumero: formatoNumero,
        convertirBoolEnSiNo: convertirBoolEnSiNo,
        convertirEnFechaHora: convertirEnFechaHora,
        compararFechas: compararFechas,
        isUrl: isUrl,
        validarEmail: validarEmail,
        validateNULL: validateNULL,
        alfanumerico: alfanumerico,
        alfanumericoguion: alfanumericoguion,
        parseDate: parseDate
    };
})(window.jQuery, window, document);

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        },
        configurable: true,
        writable: true
    });
}

$.fn.modal.Constructor.prototype.enforceFocus = function () {
    $(document)
        .off('focusin.bs.modal') // guard against infinite focus loop
        .on('focusin.bs.modal', $.proxy(function (e) {
            if (
                this.$element[0] !== e.target && !this.$element.has(e.target).length
                // CKEditor compatibility fix start.
                && !$(e.target).closest('.cke_dialog, .cke').length
                // CKEditor compatibility fix end.
            ) {
                this.$element.trigger('focus');
            }
        }, this));
};

$(document).ajaxComplete(function (event, xhr, settings) {


    if (xhr.status == 401) {
        window.location = urlBaseAbsoluta;
    }
});
