define(['ojs/ojcore', 'knockout', 'models/utils', 'jquery', 'ojs/ojknockout', 'appController'],
    function(oj, ko, utils, $) {
        function detailViewModel() {
            var self = this; 
            var receipt = utils.getStorageData("selectedImage");
            console.log(receipt);
        };
        return detailViewModel;
    });