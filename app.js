
var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
           $stateProvider
           .state('index', {
                  url: '/',
                  templateUrl: 'hireTrackNavigationPage.html'
                  })
           .state('hireTrackSettingsPage', {
                  url: '/hireTrackSettingsPage',
                  templateUrl: 'hireTrackSettingsPage.html'
                  })
           .state('hireTrackCompanyListPage', {
                  url: '/hireTrackCompanyListPage',
                  templateUrl: 'hireTrackCompanyListPage.html'
                  })
           .state('hireTrackAddCompanyPage', {
                url: '/hireTrackAddCompanyPage',
                  templateUrl: 'hireTrackAddCompanyPage.html'
                  })
           .state('HireTrackSearchCompanyPage', {
                  url: '/HireTrackSearchCompanyPage',
                  templateUrl: 'HireTrackSearchCompanyPage.html'
                  })
           .state('hireTrackPersonListPage', {
                  url: '/hireTrackPersonListPage',
                  templateUrl: 'hireTrackPersonListPage.html'
                  })
           .state('hireTrackAddPersonPage', {
                  url: '/hireTrackAddPersonPage',
                  templateUrl: 'hireTrackAddPersonPage.html'
                  })
           .state('HireTrackSearchPersonPage', {
                  url: '/HireTrackSearchPersonPage',
                  templateUrl: 'HireTrackSearchPersonPage.html'
                  })
           $urlRouterProvider.otherwise('/');
           });


app.controller('MainCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading) {
               
//               document.addEventListener("deviceready",function(){
//                                        
//                                         },false);
               
               $scope.shouldShowDelete = false;
               $scope.shouldShowReorder = false;
               $scope.listCanSwipe = true;
               
/*function to load when particular page open*/
               var ServerURL;
               var PassCode;
               var parameters;
               var companyDetailsResult;
               var personDetailsResult;
               var data = [];
               var companyCheckBoxOptions = [];
               var companyCheckBoxOptionsValue = [];
               var personCheckBoxOptions = [];
               var personCheckBoxOptionsValue = [];
               var res;
               
               $scope.showAlert = function(Title,Msg,path) {
               
               var alertPopup = $ionicPopup.alert({
                                                  title: Title,
                                                  template: '<center>'+Msg+'</center>'
                                                  });
               alertPopup.then(function(res) {
                               $location.path(path);
                               });
               
               }
               
               $scope.Loading = function (){
               
               $ionicLoading.show({template: 'Loading..<br><ion-spinner icon="spiral"></ion-spinner>'});
              
               }
               
               $scope.hideLoading = function (){
                $ionicLoading.hide();
               }
               
               
               $scope.checkNetworkConnection = function (){
               
               var networkState = navigator.connection.type;
               var states = {};
               states[Connection.UNKNOWN] = 'Unknown connection';
               states[Connection.ETHERNET] = 'Ethernet connection';
               states[Connection.WIFI] = 'WiFi connection';
               states[Connection.CELL_2G] = 'Cell 2G connection';
               states[Connection.CELL_3G] = 'Cell 3G connection';
               states[Connection.CELL_4G] = 'Cell 4G connection';
               states[Connection.NONE] = 'No network connection';
               if (states[networkState] == 'No network connection') {
               return false;
               } else {
               return true;
               }
               
               }
               
//               $scope.hireTrackWebService = function (methodname,params,callback){
//               alert(methodname);
//               alert(JSON.stringify(params));
//               $http({method: "POST",
//                     url: "localStorage.getItem('webServiceURL')'"+methodname+"'",
//                     params
//                     }).then(function (res) {
//                             callback(res);
//                             
//                      }, function (res) {
//                          console.log(JSON.stringify(res));
//                             });
//               
//               }
               
               
               
               $scope.hireTrackNavigationPageContent = function (info){
               
                ServerURL = localStorage.getItem("webServiceURL");
                PassCode = "asdf"+localStorage.getItem("passCode");
               
               if ((ServerURL == null) || (PassCode == null) || (ServerURL == "")|| (PassCode == "")) {
               $scope.isDisabled = true;
               }else{
               $scope.isDisabled = false;
               }
               }
               
               $scope.hireTrackCheckForUrlAndPassCode = function (info){
               
               ServerURL = localStorage.getItem("webServiceURL");
               PassCode = "asdf"+localStorage.getItem("passCode");

               if ((ServerURL == null) || (PassCode == null) || (ServerURL == "")|| (PassCode == "")) {
               $scope.hireTrack = {webServiceURL: "",
                                   passCode: ""};
               }else{
               $scope.hireTrack = {webServiceURL: localStorage.getItem("webServiceURL"),
                                   passCode: "asdf"+localStorage.getItem("passCode")};
               }
               }
               
               
/*call function of button onclick*/
               
               $scope.saveHireTrackCredentials= function(info){
               
               if(!info){
               $scope.showAlert("HireTrack","Please Enter Webservice URL & Passcode");
               }else if(!(info.webServiceURL)){
               $scope.showAlert("HireTrack","Please Enter Webservice URL");
               }else if(!(info.passCode)){
               $scope.showAlert("HireTrack","Please Enter Passcode");
               }else{
              
               var confirmPopup = $ionicPopup.confirm({
                                                      title: 'HireTrack',
                                                      template: 'Are you sure you want to save new service url?'
                                                      });
               
               confirmPopup.then(function(res) {
                                 if(res) {
                                 if($scope.checkNetworkConnection()){
                                 $http.post(info.webServiceURL+"WSVerfication",{authkey:"asdf1"+info.passCode}).then(function (res){
                                 console.log(JSON.stringify(res));
                                 $scope.Loading();
                                 if(res.data.WSVerficationResult.statusMessage.success){
                                 localStorage.setItem("webServiceURL",info.webServiceURL);
                                 localStorage.setItem("passCode",info.passCode);
                                 $scope.isDisabled = false;
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Connected To Server Successfully.!","/hireTrackNavigationPage").then();
                                  }else{
                                  $scope.isDisabled = true;
                                  $scope.hideLoading();
                                  $scope.showAlert("HireTrack","Wrong PassCode Please Try Again Later.");
                                  }
                                  },function (data){
                                  $scope.isDisabled = true;
                                  $scope.hideLoading();
                                  $scope.showAlert("HireTrack","Server Not Reachable.! Please Check The Server URL Or Try It Later");
                                 });
                                 }else{
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Please Check Your Network Connection");
                                 }
                                 } else {
                                 console.log('Not sure!');
                                 }
                                 });
               
               }
               }
               
               
               $scope.hireTrackGenerateCompanyList= function(where){
               
               $scope.hireTrackHideShowEditIcon = true;
               $scope.hireTrackHideShowCheckMarkIcon = false;
               
               $scope.data = {
               showDelete: false
               };
               
               parameters = {
               authkey:"asdf1"+localStorage.getItem("passCode"),
               column: "null",
               search: "null"
               };
               
               data = [];
               $scope.Loading()
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetAllCompanyDetails",parameters).then(function (res){
               console.log("Companylist"+JSON.stringify(res));
               if(res.data.GetAllCompanyDetailsResult.statusMessage.success){
               companyDetailsResult = JSON.parse(res.data.GetAllCompanyDetailsResult.result);
               for(var i=0;i<companyDetailsResult.length;i++){
               data.push({companyCounter: companyDetailsResult[i].CompanyCounter,companyName: companyDetailsResult[i].CompanyName, townName: companyDetailsResult[i].Town,county:companyDetailsResult[i].County,postcode:companyDetailsResult[i].PostCode});
               }
               if(where == "fromUpdate"){
               console.log("donothing");
               }else{
               $location.path("/hireTrackCompanyListPage");
               }
               $scope.opts = data;
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Could Not Generate List");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               
               $scope.addCompanyDetails = {};
               
               $scope.hireTrackAddNewCompany = function(info){
               
                              if(!(info.hireTrackCompanyName)){
                              $scope.showAlert("HireTrack","Please Enter Company Name");
                              }else if(!(info.hireTrackCompanyTelephone)){
                              $scope.showAlert("HireTrack","Please Enter Company Telephone");
                              }else if(!(info.hireTrackCompanyEmail)){
                              $scope.showAlert("HireTrack","Please Enter Company Email");
                              }else{
               
                              if($scope.title=="Add Company"){
                                parameters = {
                                authkey: "asdf1"+localStorage.getItem("passCode"),
                                CompanyName: info.hireTrackCompanyName,
                                MainTelephone: info.hireTrackCompanyTelephone,
                                MainFax: info.hireTrackCompanyFacsimile,
                                EmailAddress: info.hireTrackCompanyEmail,
                                URL: info.hireTrackCompanyURL,
                                Accref: info.hireTrackCompanyAccRef,
                                Cellular: info.hireTrackCompanyMobile,
                                Address1: info.hireTrackCompanyAddressline1,
                                Address2: info.hireTrackCompanyAddressline2,
                                Address3: info.hireTrackCompanyAddressline3,
                                Town: info.hireTrackCompanyTown,
                                County: info.hireTrackCompanyCounty,
                                PostCode: info.hireTrackCompanyPostCode,
                                Country: info.hireTrackCompanyCountry,
                                CompanyCounter: 0
                                            };
                              }else{
                                parameters = {
                                authkey: "asdf1"+localStorage.getItem("passCode"),
                                CompanyName: info.hireTrackCompanyName,
                                MainTelephone: info.hireTrackCompanyTelephone,
                                MainFax: info.hireTrackCompanyFacsimile,
                                EmailAddress: info.hireTrackCompanyEmail,
                                URL: info.hireTrackCompanyURL,
                                Accref: info.hireTrackCompanyAccRef,
                                Cellular: info.hireTrackCompanyMobile,
                                Address1: info.hireTrackCompanyAddressline1,
                                Address2: info.hireTrackCompanyAddressline2,
                                Address3: info.hireTrackCompanyAddressline3,
                                Town: info.hireTrackCompanyTown,
                                County: info.hireTrackCompanyCounty,
                                PostCode: info.hireTrackCompanyPostCode,
                                Country: info.hireTrackCompanyCountry,
                                CompanyCounter: localStorage.getItem("companyCounter")
                                            };
                              }
//               $scope.hireTrackWebService = function (UpdateCompanyDetails,parameters,function(res){
//                                                      
//                                                      console.log("Companylistasdfs"+JSON.stringify(res));
//                                                      
//                                                      }){
//              
//               
//               }
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"UpdateCompanyDetails",parameters).then(function (res){
                                       console.log("Companylist"+JSON.stringify(res));
                                       if(res.data.UpdateCompanyDetailsResult.statusMessage.success){
                                       if($scope.title=="Add Company"){
                                       $scope.hireTrackGenerateCompanyList('fromUpdate');
                                       $scope.hideLoading();
                                       $scope.showAlert("HireTrack","Company Added Successfully","/hireTrackCompanyListPage").then();
                                       }else{
                                       $scope.hireTrackGenerateCompanyList('fromUpdate');
                                       $scope.hideLoading();
                                       $scope.showAlert("HireTrack","Company Updated Successfully","/hireTrackCompanyListPage").then();
                                       }
                                       }else{
                                       if($scope.title=="Add Company"){
                                       $scope.hideLoading();
                                       $scope.showAlert("HireTrack","Unable To Add Company");
                                       }else{
                                       $scope.hideLoading();
                                       $scope.showAlert("HireTrack","Unable To Update Company Details");
                                       }
                                       }
                                       },function(err){
                                       $scope.hideLoading();
                                       $scope.showAlert("HireTrack",err);
                                       });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
                              }
               }
               
               
               $scope.hireTrackDeleteCompany = function(event) {
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               ID: event.target.id
               };
               
               var confirmPopup = $ionicPopup.confirm({
                                                      title: "HireTrack",
                                                      template: "<center>Are You Sure You Want To Delete Company</center>"
                                                      });
               confirmPopup.then(function(res) {
                                 if(res) {
                                 $scope.Loading();
                                 if($scope.checkNetworkConnection()){
                                 $http.post(localStorage.getItem("webServiceURL")+"DeleteCompanyDetails",parameters).then(function (res){
                                 console.log("Companylist"+JSON.stringify(res));
                                 if(res.data.DeleteCompanyDetailsResult.statusMessage.success){
                                 $scope.hireTrackGenerateCompanyList();
                                  $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Company Deleted Successfully");
                                 }else{
                                  $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Unable To Delete");
                                 }
                                 },function(err){
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack",err);
                                 });
                                 }else{
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Please Check Your Network Connection");
                                 }
                                 } else {
                                 $scope.hideLoading();
                                 console.log("dont delete");
                                 }
                                 });
               
               
               }
               
               $scope.hireTrackShowOptionToDelete = function(){
               
               if($scope.hireTrackHideShowEditIcon){
               $scope.hireTrackHideShowEditIcon = false;
               $scope.hireTrackHideShowCheckMarkIcon = true;
               }else{
               $scope.hireTrackHideShowCheckMarkIcon = false;
               $scope.hireTrackHideShowEditIcon = true;
               
               }
               }
               
               $scope.hireTrackClearAllFields = function(info){
               info.NameField = "";
               info.TownField = "";
               info.radio = false;
               info.nameField = false;
               info.townField = false;
               companyCheckBoxOptionsValue = [];
               $scope.hireTrackSearchCompanyPgLoadContent();
               }
               
               $scope.hireTrackPersonClearAllFields = function(info){
               info.Forename = "";
               info.Surname = "";
               info.Nickname = "";
               info.radio = false;
               info.foreName = false;
               info.surName = false;
               info.nickName = false;
               info.crewskills = false;
               personCheckBoxOptionsValue = [];
               $scope.hireTrackSearchPersonPgLoadContent();
               }
               
               $scope.hireTrackUserShowOptionToDelete = function(){
               if($scope.hireTrackUserHideShowEditIcon){
                 $scope.hireTrackUserHideShowEditIcon = false;
                 $scope.hireTrackUserHideShowCheckMarkIcon = true;
               }else{
                 $scope.hireTrackUserHideShowCheckMarkIcon = false;
                 $scope.hireTrackUserHideShowEditIcon = true;
               }
               }
               
               
               $scope.hideTitleContent = function(){
               $scope.title = "Add Company";
               $scope.addCompanyDetails.hireTrackCompanyName = "";
               $scope.addCompanyDetails.hireTrackCompanyTelephone = "";
               $scope.addCompanyDetails.hireTrackCompanyFacsimile = "";
               $scope.addCompanyDetails.hireTrackCompanyMobile = "";
               $scope.addCompanyDetails.hireTrackCompanyEmail = "";
               $scope.addCompanyDetails.hireTrackCompanyURL = "";
               $scope.addCompanyDetails.hireTrackCompanyAccRef = "";
               $scope.addCompanyDetails.hireTrackCompanyAddressline1 = "";
               $scope.addCompanyDetails.hireTrackCompanyAddressline2 = "";
               $scope.addCompanyDetails.hireTrackCompanyAddressline3 = "";
               $scope.addCompanyDetails.hireTrackCompanyTown = "";
               $scope.addCompanyDetails.hireTrackCompanyCounty = "";
               $scope.addCompanyDetails.hireTrackCompanyPostCode = "";
               $scope.addCompanyDetails.hireTrackCompanyCountry = "";
               
               }
               
               
               $scope.addCompanyDetails = {};
               
               $scope.hireTrackCompanyListView = function(event){
               
               if(event.target.id==""){
               $scope.showAlert("HireTrack","Please Click On The List Correctly To View Company Details");
               }else{
               $scope.title = "Edit Company";
               
               localStorage.setItem("companyCounter",event.target.id);
               console.log(localStorage.getItem("companyCounter"));
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               ID: localStorage.getItem("companyCounter")
               };
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetCompanyDetails",parameters).then(function (res){
               companyDetailsResult = JSON.parse(res.data.GetCompanyDetailsResult.result);
               console.log("details"+companyDetailsResult);
               if(res.data.GetCompanyDetailsResult.statusMessage.success){
               $scope.addCompanyDetails.hireTrackCompanyName = companyDetailsResult[0].CompanyName;
               $scope.addCompanyDetails.hireTrackCompanyTelephone = companyDetailsResult[0].MainTelephone;
               $scope.addCompanyDetails.hireTrackCompanyFacsimile = companyDetailsResult[0].MainFax;
               $scope.addCompanyDetails.hireTrackCompanyMobile = companyDetailsResult[0].Cellular;
               $scope.addCompanyDetails.hireTrackCompanyEmail = companyDetailsResult[0].EmailAddress;
               $scope.addCompanyDetails.hireTrackCompanyURL = companyDetailsResult[0].URL;
               $scope.addCompanyDetails.hireTrackCompanyAccRef = companyDetailsResult[0].Accref;
               $scope.addCompanyDetails.hireTrackCompanyAddressline1 = companyDetailsResult[0].Address1;
               $scope.addCompanyDetails.hireTrackCompanyAddressline2 = companyDetailsResult[0].Address2;
               $scope.addCompanyDetails.hireTrackCompanyAddressline3 = companyDetailsResult[0].Address3;
               $scope.addCompanyDetails.hireTrackCompanyTown = companyDetailsResult[0].Town;
               $scope.addCompanyDetails.hireTrackCompanyCounty = companyDetailsResult[0].County;
               $scope.addCompanyDetails.hireTrackCompanyPostCode = companyDetailsResult[0].PostCode;
               $scope.addCompanyDetails.hireTrackCompanyCountry = companyDetailsResult[0].Country;
               $location.path('/hireTrackAddCompanyPage');
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Get Company Details");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               }
    
              
               $scope.hireTrackSearchCompanyPgLoadContent = function (){
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode")
               };
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"CompanyFilters",parameters).then(function (res){
               console.log("details"+JSON.stringify(res));
               if (res.data.CompanyFiltersResult.statusMessage.success) {
               companyDetailsResult = JSON.parse(res.data.CompanyFiltersResult.result);
               companyCheckBoxOptions = [];
               for(var i=0;i<companyDetailsResult.length;i++){
               companyCheckBoxOptions.push({id:companyDetailsResult[i].CompanyFilterCounter,text:companyDetailsResult[i].CompanyFilterDescription});
               }
               $scope.checkbox = companyCheckBoxOptions;
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
            $scope.showAlert("HireTrack","Unable To Do Search Please Try Again Later","/hireTrackCompanyListPage").then();
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }

               $scope.item = {};
               
               $scope.hireTrackCompanyAdvancedSearch = function (info){
               if(!(info.radio)){
               info.radio = "";
               }
               
               if(companyCheckBoxOptionsValue.length==0){
               
               if((info.NameField)&&(info.TownField)){
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "CompanyName,Town",
               search: info.NameField+","+info.TownField,
               operation: info.radio
               };
               }
               else if(info.NameField){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "CompanyName",
               search: info.NameField,
               operation: info.radio
               };
               }else if(info.TownField){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "Town",
               search: info.TownField,
               operation: info.radio
               };
               }else{
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "null",
               search: "null",
               operation: info.radio
               };
               }
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetAllCompanyDetails",parameters).then(function (res){
               console.log("getall"+JSON.stringify(res));
               if(res.data.GetAllCompanyDetailsResult.statusMessage.success){
               companyDetailsResult = JSON.parse(res.data.GetAllCompanyDetailsResult.result);
               if (companyDetailsResult == "") {
               $scope.showAlert("HireTrack","No Search Result Found..!");
               $scope.hideLoading();
               }else{
               data = [];
               for(var i=0;i<companyDetailsResult.length;i++){
               data.push({companyCounter: companyDetailsResult[i].CompanyCounter,companyName: companyDetailsResult[i].CompanyName, townName: companyDetailsResult[i].Town});
               }
               $scope.opts = data;
               $scope.hideLoading();
               $location.path('/hireTrackCompanyListPage');
               }
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Do Search..!");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }else{
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               FilterID: "" +companyCheckBoxOptionsValue+ "",
               operation: info.radio
               };
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"AdvanceCompanySearch",parameters).then(function (res){
               console.log("advanced"+JSON.stringify(res));
               if (res.data.AdvanceCompanySearchResult.statusMessage.success) {
               companyDetailsResult = JSON.parse(res.data.AdvanceCompanySearchResult.result);
               if (companyDetailsResult == "") {
               $scope.showAlert("HireTrack","No Search Result Found..!");
               $scope.hideLoading();
               }else{
               data = [];
               for(var i=0;i<companyDetailsResult.length;i++){
               data.push({companyCounter: companyDetailsResult[i].CompanyCounter,companyName: companyDetailsResult[i].CompanyName, townName: companyDetailsResult[i].Town});
               }
               $scope.opts = data;
               $scope.hideLoading();
               $location.path('/hireTrackCompanyListPage');
               }
               }else{
                $scope.hideLoading();
              $scope.showAlert("HireTrack","No Result For Search");
               }
               },function(err){
                $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               
               }
                     
               $scope.getCompanyCheckBoxCounterID = function (info,qid){
               if(info.check){
               companyCheckBoxOptionsValue.push(qid);
               }else{
               var index = companyCheckBoxOptionsValue.indexOf(qid);
               companyCheckBoxOptionsValue.splice(index, 1);
               }
               if(companyCheckBoxOptionsValue==""){
               $scope.item.nameField = false;
               $scope.item.townField = false;
               }else{
               $scope.item.nameField = true;
               $scope.item.townField = true;
               }
               }
               
               $scope.hireTrackClearSearchFields = function (){
               $scope.item.NameField = "";
               $scope.item.TownField = "";
               $scope.item.radio = false;
               }
               
               
               /*Person */
               
               $scope.hireTrackGeneratePersonList= function(where){
               
               $scope.hireTrackUserHideShowCheckMarkIcon = false;
               $scope.hireTrackUserHideShowEditIcon = true;
               
               $scope.data = {
               showDelete: false
               };
               
               parameters = {
               authkey:"asdf1"+localStorage.getItem("passCode"),
               column: "null",
               search: "null"
               };
               
               data = [];
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetAllUserDetails",parameters).then(function (res){
               console.log("Companylist"+JSON.stringify(res));
               if(res.data.GetAllUserDetailsResult.statusMessage.success){
               personDetailsResult = JSON.parse(res.data.GetAllUserDetailsResult.result);
               for(var i=0;i<personDetailsResult.length;i++){
               data.push({personCounter: personDetailsResult[i].namecounter,personName: personDetailsResult[i].forename, townName: personDetailsResult[i].town});
               }
               if(where == "fromUpdate"){
               console.log("donothing");
               }else{
               $location.path("/hireTrackPersonListPage");
               }
               $scope.Personopts = data;
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Could Not Generate List");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }

               $scope.hireTrackDeletePerson = function(event) {
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               ID: event.target.id
               };
               
               var confirmPopup = $ionicPopup.confirm({
                                                      title: "HireTrack",
                                                      template: "<center>Are You Sure You Want To Delete This User?</center>"
                                                      });
               confirmPopup.then(function(res) {
                                 if(res) {
                                 $scope.Loading();
                                 if($scope.checkNetworkConnection()){
                                 $http.post(localStorage.getItem("webServiceURL")+"DeleteUserDetails",parameters).then(function (res){
                                 console.log("Personlist"+JSON.stringify(res));
                                 if(res.data.DeleteUserDetailsResult.statusMessage.success){
                                 $scope.hireTrackGeneratePersonList();
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","User Deleted Successfully");
                                 }else{
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Unable To Delete");
                                 }
                                 },function(err){
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack",err);
                                 });
                                 }else{
                                 $scope.hideLoading();
                                 $scope.showAlert("HireTrack","Please Check Your Network Connection");
                                 }
                                 } else {
                                 $scope.hideLoading();
                                 console.log("dont delete");
                                 }
                                 });
               
               
               }
               
               
               $scope.hidePersonTitleContent = function(){
               $location.path('/hireTrackAddPersonPage');
               $scope.personTitle = "Add Person";
               $scope.addPersonDetails.hireTrackPersonTitle = "";
               $scope.addPersonDetails.hireTrackPersonForeName = "";
               $scope.addPersonDetails.hireTrackPersonSurename = "";
               $scope.addPersonDetails.hireTrackPersonSalutation = "";
               $scope.addPersonDetails.hireTrackPersonNickname = "";
               $scope.addPersonDetails.hireTrackPersonDOB = "";
               $scope.addPersonDetails.hireTrackPersonTelephone = "";
               $scope.addPersonDetails.hireTrackPersonFacsimile = "";
               $scope.addPersonDetails.hireTrackPersonMobile = "";
               $scope.addPersonDetails.hireTrackPersonEmail = "";
               $scope.addPersonDetails.hireTrackPersonAddressline1 = "";
               $scope.addPersonDetails.hireTrackPersonAddressline2 = "";
               $scope.addPersonDetails.hireTrackPersonAddressline3 = "";
               $scope.addPersonDetails.hireTrackPersonTown = "";
               $scope.addPersonDetails.hireTrackPersonCounty = "";
               $scope.addPersonDetails.hireTrackPersonPostCode = "";
               $scope.addPersonDetails.hireTrackPersonCountry = "";
               }
               
               
               $scope.addPersonDetails = {};
               
               $scope.hireTrackPersonListView = function(event){
               
               if(event.target.id==""){
               $scope.showAlert("HireTrack","Please Click On The List Correctly To View Person Details.!");
               }else{
               $scope.personTitle = "Edit Person";
               localStorage.setItem("personCounter",event.target.id);
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               ID: localStorage.getItem("personCounter")
               };
               
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetUserDetails",parameters).then(function (res){
               personDetailsResult = JSON.parse(res.data.GetUserDetailsResult.result);
               console.log("details"+JSON.stringify(res));
               var regExp = /\(([^)]+)\)/;
               var matches = regExp.exec(personDetailsResult[0].dob);
               var now = new Date(+matches[1]);
               var month, year, date, fullMonth;
               if (now.getMonth() < 10) {
               month = now.getMonth() + 1;
               fullMonth = "0" + month;
               } else {
               month = now.getMonth() + 1;
               }
               if (now.getDate() < 10) {
               date = "0" + now.getDate();
               } else {
               date = now.getDate();
               }
               var fullDate = (now.getFullYear() + "-" + fullMonth + "-" + date);
               if(res.data.GetUserDetailsResult.statusMessage.success){
               $scope.addPersonDetails.hireTrackPersonTitle = personDetailsResult[0].title;
               $scope.addPersonDetails.hireTrackPersonForeName = personDetailsResult[0].forename;
               $scope.addPersonDetails.hireTrackPersonSurename = personDetailsResult[0].surname;
               $scope.addPersonDetails.hireTrackPersonSalutation = personDetailsResult[0].salutation;
               $scope.addPersonDetails.hireTrackPersonNickname = personDetailsResult[0].nickname;
               $scope.addPersonDetails.hireTrackPersonDOB = new Date(now.getFullYear(),fullMonth,date);
               $scope.addPersonDetails.hireTrackPersonTelephone = personDetailsResult[0].telephone;
               $scope.addPersonDetails.hireTrackPersonFacsimile = personDetailsResult[0].facsimile;
               $scope.addPersonDetails.hireTrackPersonMobile = personDetailsResult[0].mobile;
               $scope.addPersonDetails.hireTrackPersonEmail = personDetailsResult[0].email;
               $scope.addPersonDetails.hireTrackPersonAddressline1 = personDetailsResult[0].address1;
               $scope.addPersonDetails.hireTrackPersonAddressline2 = personDetailsResult[0].address2;
               $scope.addPersonDetails.hireTrackPersonAddressline3 = personDetailsResult[0].address3;
               $scope.addPersonDetails.hireTrackPersonTown = personDetailsResult[0].town;
               $scope.addPersonDetails.hireTrackPersonCounty = personDetailsResult[0].county;
               $scope.addPersonDetails.hireTrackCompanyPostCode = personDetailsResult[0].postcode;
               $scope.addPersonDetails.hireTrackPersonCountry = personDetailsResult[0].country;
               $location.path('/hireTrackAddPersonPage');
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Get Person Details");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               }
               
               $scope.addPersonDetails = {};
               
               $scope.hireTrackAddNewPerson = function(info){
               var splitDate = info.hireTrackPersonDOB;
               var day = splitDate.getDate();
               var month = splitDate.getMonth()+1;
               var year = splitDate.getFullYear();
               var fullDate = year+"-"+month+"-"+day;
               if($scope.personTitle=="Add Person"){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               namecounter: "0",
               title: info.hireTrackPersonTitle,
               surname: info.hireTrackPersonSurename,
               forename: info.hireTrackPersonForeName,
               nickname: info.hireTrackPersonNickname,
               salutation: info.hireTrackPersonSalutation,
               dob: fullDate,
               telephone: info.hireTrackPersonTelephone,
               facsimile: info.hireTrackPersonFacsimile,
               mobile: info.hireTrackPersonMobile,
               email: info.hireTrackPersonEmail,
               address1: info.hireTrackPersonAddressline1,
               address2: info.hireTrackPersonAddressline2,
               address3: info.hireTrackPersonAddressline3,
               town: info.hireTrackPersonTown,
               county: info.hireTrackPersonCounty,
               postcode: info.hireTrackPersonPostCode,
               country: info.hireTrackPersonCountry
               };
               }else{
               if(info.hireTrackPersonPostCode==undefined){
               info.hireTrackPersonPostCode = "";
               }
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               namecounter: localStorage.getItem("personCounter"),
               title: info.hireTrackPersonTitle,
               surname: info.hireTrackPersonSurename,
               forename: info.hireTrackPersonForeName,
               nickname: info.hireTrackPersonNickname,
               salutation: info.hireTrackPersonSalutation,
               dob: fullDate,
               telephone: info.hireTrackPersonTelephone,
               facsimile: info.hireTrackPersonFacsimile,
               mobile: info.hireTrackPersonMobile,
               email: info.hireTrackPersonEmail,
               address1: info.hireTrackPersonAddressline1,
               address2: info.hireTrackPersonAddressline2,
               address3: info.hireTrackPersonAddressline3,
               town: info.hireTrackPersonTown,
               county: info.hireTrackPersonCounty,
               postcode: info.hireTrackPersonPostCode,
               country: info.hireTrackPersonCountry
               };
               }
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"UpdateUserDetails",parameters).then(function (res){
               console.log("Companylist"+JSON.stringify(res));
               if(res.data.UpdateUserDetailsResult.statusMessage.success){
               if($scope.personTitle=="Add Person"){
               $scope.hireTrackGeneratePersonList('fromUpdate');
               $scope.hideLoading();
               $scope.showAlert("HireTrack","User Added Successfully","/hireTrackPersonListPage").then();
               }else{
               $scope.hireTrackGeneratePersonList('fromUpdate');
               $scope.hideLoading();
               $scope.showAlert("HireTrack","User Updated Successfully","/hireTrackPersonListPage").then();
               }
               }else{
               if($scope.personTitle=="Add Person"){
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Add User");
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Update User Details");
               }
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               
               
               $scope.hireTrackSearchPersonPgLoadContent = function (){
               
               $scope.searchPersonCheckBox=true;
               $scope.searchPersonCrewSkillsCheckBox=false;
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode")
               };
               
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"UserFilters",parameters).then(function (res){
               console.log("details"+JSON.stringify(res));
               if (res.data.UserFiltersResult.statusMessage.success) {
               personDetailsResult = JSON.parse(res.data.UserFiltersResult.result);
               personCheckBoxOptions = [];
               for(var i=0;i<personDetailsResult.length;i++){
               personCheckBoxOptions.push({id:personDetailsResult[i].FilterCount,text:personDetailsResult[i].FilterConditions});
               }
               $scope.personCheckbox = personCheckBoxOptions;
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Do Search Please Try Again Later","/hireTrackPersonListPage").then();
               }
               },function(err){
                $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               
               $scope.getPersonCheckBoxCounterID = function (info,qid){
               if(info.check||info.crewSkillsCheck){
               personCheckBoxOptionsValue.push(qid);
               }else{
               var index = personCheckBoxOptionsValue.indexOf(qid);
               personCheckBoxOptionsValue.splice(index, 1);
               }
               
               if(personCheckBoxOptionsValue==""){
               $scope.item.foreName = false;
               $scope.item.surName = false;
               $scope.item.nickName= false;
               }else{
               $scope.item.foreName = true;
               $scope.item.surName = true;
               $scope.item.nickName= true;
               }
               }
               
               $scope.hireTrackClearPersonSearchFields = function (){
               $scope.item.Forename = "";
               $scope.item.Surname = "";
               $scope.item.Nickname= "";
               $scope.item.radio = false;
               }
               
               $scope.loadCrewSkillsOptions = function (info){
               if(info.crewskills){
               
               $scope.searchPersonCheckBox = false;
               $scope.searchPersonCrewSkillsCheckBox=true;
               personCheckBoxOptions = [];
               personCheckBoxOptionsValue = [];
               $scope.getCrewSkillsCheckBoxValues();
               
               }else{
               
               $scope.searchPersonCrewSkillsCheckBox=false;
               $scope.searchPersonCheckBox = true;
               personCheckBoxOptions = [];
               personCheckBoxOptionsValue = [];
               $scope.hireTrackSearchPersonPgLoadContent();
               
               }
               }
               
               $scope.getCrewSkillsCheckBoxValues = function (){
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode")
               };
               
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"UserCrewFilters",parameters).then(function (res){
               console.log("details"+JSON.stringify(res));
               if (res.data.UserCrewFiltersResult.statusMessage.success) {
               personDetailsResult = JSON.parse(res.data.UserCrewFiltersResult.result);
               personCheckBoxOptions = [];
               for(var i=0;i<personDetailsResult.length;i++){
               personCheckBoxOptions.push({id:personDetailsResult[i].Crewindex,text:personDetailsResult[i].CrewText});
               }
               $scope.personCrewSkillsCheckbox = personCheckBoxOptions;
               $scope.hideLoading();
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Unable To Do Search Please Try Again Later","/hireTrackPersonListPage").then();
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }
               
               
               $scope.hireTrackPersonAdvancedSearch = function (info){
               
               if(!(info.radio)){
               info.radio = "";
               }
               
               
               if(personCheckBoxOptionsValue==""){
               
               if((info.Forename) && (info.Surname) && (info.Nickname)){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "forename,surname,nickname",
               search: info.Forename + "," + info.Surname + "," + info.Nickname,
               operation: info.radio
               };
               
               }else if((info.Forename) && (info.Surname)){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "forename,surname",
               search: info.Forename + "," + info.Surname,
               operation: info.radio
               };
               }else if((info.Surname) && (info.Nickname)){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "surname,nickname",
               search: info.Surname+ "," + info.Nickname,
               operation: info.radio
               };
               
               }else if((info.Forename) && (info.Nickname)){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "forename,nickname",
               search: info.Forename+ "," + info.Nickname,
               operation: info.radio
               };
               
               }else if(info.Forename){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "forename",
               search: info.Forename,
               operation: info.radio
               };
               
               }else if(info.Surname){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "surname",
               search: info.Surname,
               operation: info.radio
               };
               
               }else if(info.Nickname){
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "nickname",
               search: info.Nickname,
               operation: info.radio
               };
               
               }
               else{
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               column: "null",
               search: "null",
               operation: info.radio
               };
               }
               data = [];
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"GetAllUserDetails",parameters).then(function (res){
               console.log("Companylist"+JSON.stringify(res));
               if(res.data.GetAllUserDetailsResult.statusMessage.success){
               personDetailsResult = JSON.parse(res.data.GetAllUserDetailsResult.result);
               for(var i=0;i<personDetailsResult.length;i++){
               data.push({personCounter: personDetailsResult[i].namecounter,personName: personDetailsResult[i].forename, townName: personDetailsResult[i].town});
               }
               $scope.Personopts = data;
               $scope.hideLoading();
               $location.path('\hireTrackPersonListPage');
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Could Not Generate List");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }
               }else{
               
               parameters = {
               authkey: "asdf1"+localStorage.getItem("passCode"),
               FilterID: "" +personCheckBoxOptionsValue+ "",
               operation: info.radio
               };
               
               $scope.Loading();
               if($scope.checkNetworkConnection()){
               $http.post(localStorage.getItem("webServiceURL")+"AdvanceCrewUserSearch",parameters).then(function (res){
               console.log("advanced"+JSON.stringify(res));
               if (res.data.AdvanceCrewUserSearchResult.statusMessage.success) {
               personDetailsResult = JSON.parse(res.data.AdvanceCrewUserSearchResult.result);
               if (personDetailsResult == "") {
               $scope.showAlert("HireTrack","No Search Result Found..!");
               $scope.hideLoading();
               }else{
               data = [];
               for(var i=0;i<personDetailsResult.length;i++){
               data.push({personCounter: personDetailsResult[i].namecounter,personName: personDetailsResult[i].forename, townName: personDetailsResult[i].town});
               }
               $scope.Personopts = data;
               $scope.hideLoading();
               $location.path('/hireTrackPersonListPage');
                }
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","No Result For Search");
               }
               },function(err){
               $scope.hideLoading();
               $scope.showAlert("HireTrack",err);
               });
               }else{
               $scope.hideLoading();
               $scope.showAlert("HireTrack","Please Check Your Network Connection");
               }

               }
               
               }
               });





