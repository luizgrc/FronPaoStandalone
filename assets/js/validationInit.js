function formValidation() {
    "use strict";
    /*----------- BEGIN validationEngine CODE -------------------------*/
    $('#popup-validation1').validationEngine('attach', { showOneMessage: true, binded: false, promptPosition: "topRight", scroll: false, autoHidePrompt: true,
        autoHideDelay: 4000,
        fadeDuration: 0.3
    });  
    /*----------- END validationEngine CODE -------------------------*/    
}