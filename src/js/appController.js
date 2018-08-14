/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'models/utils', 'ojs/ojknockout', 'ojs/ojbutton'],
  function (oj, ko, utils) {
    function ControllerViewModel() {
      var self = this;


      //Read file path with cordova-plugin-file       
      function readFromFile(fileName) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(fileName, function (fileEntry) {
          var reader = new FileReader();
          readr.onloadend = function (e) {
            console.log(e);
            //console.log(JSON.parse(this.result));                 
            //var srcData = fileLoadedEvent.target.result;                
          };
          reader.readAsDataURL(e.target.files[0]);
          //reader.readAsText(file);
        }, errorHandler.bind(null, fileName));
      }

      //check path file device Exists
      function checkIfFileExists(path) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
          fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
        }, getFSFail); //of requestFileSystem
      }
      function fileExists(fileEntry) {
        alert("File " + fileEntry.fullPath + " exists!");
      }
      function fileDoesNotExist() {
        alert("file does not exist");
      }
      function getFSFail(evt) {
        console.log(evt.target.error.code);
      }

      
      self.buttonClick = function () {
        cordova.plugins.ExpenseOCR.openCameraOCR('Start camera', function (res) {
          //console.log(res.MerchantName);
          //console.log(res.Date);
          //console.log(res.Amount);         
          // console.log(res.image); 
          console.log('res:', res);
          console.log('res length:', res.length);
          // window.localStorage.setItem('selectedImage',);
          utils.setStorageData('selectedImage', res);
          try {
            checkIfFileExists(res);
            readFromFile(res);
          } catch{ }
          console.log('goto detail');
          oj.Router.rootInstance.go('detail');

        }, function (e) {
          alert('Error: ' + e)
        })
      }





      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
    }

    return new ControllerViewModel();
  }
);
