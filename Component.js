sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel', 'dynamic/Table/js/Control'], 
    function (UIComponent, JSONModel, ResponsiveTable) {
    "use strict";

    /**
     * Generates responsive tables from the OpenUI5 framework (sap.m.Table) dynamically
     * by reading properties from a data structure that resides in a JSON file.
     * 
     * @class       DynamicTable
     * @subject     DynamicTable
     * @extends     sap.ui.core.UIComponent
     */
    var Component = UIComponent.extend("dynamic.Table", {

        /**
         * Generates responsive simpleForms from the OpenUI5 framework (sap.m.SimpleForm) dynamically
         * by reading properties from a data structure that resides in a JSON file.
         * 
         * @class       DynamicSimpleForm
         * @subject     DynamicSimpleForm
         * @extends     sap.ui.core.UIComponent
         */
        var Component = UIComponent.extend("dynamic.SimpleForm", {

        init: function () {
            var that = this;
            sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
            var sMethod = this.getComponentData().method;
            var sSubject = this.getComponentData().subject;
            var sClass = this.getComponentData().class;
            this.view = this.getComponentData().view;
            this.tables = {};
            var oTable = this.getTable(sMethod, sSubject, sClass);
        },

            init: function() {
                var that = this;
                sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
                var sMethod = this.getComponentData().method;
                var sSubject = this.getComponentData().subject;
                var sClass = this.getComponentData().class;
                this.view = this.getComponentData().view;
                this.simpleForms = {};
                var oSimpleForm = this.getSimpleForm(sMethod, sSubject, sClass);
            },

            /**
             * @brief   Initiates the sequence of events which configures and returns
             * a user-interface control of a responsive SimpleForm.
             * 
             * @method      getSimpleForm
             * @memberof    DynamicSimpleForm
             * @example
             * // Function to instantiate a new responsive SimpleForm control
             * getControl: function (sMethod, sSubject, sClass, oView) {
             *     this.view = oView;
             *     var oSimpleForm = this.getSimpleForm(sMethod, sSubject, sClass);
             *     return (oSimpleForm.getControl());
             * }
             * 
             * @param {String} sMethod The method property of the data model
             * @param {String} sSubject The subject property of the data model
             * @param {String} sClass The classification property of the data model
             * @return Executes a function to configure the SimpleForm
             */
            getSimpleForm: function(sMethod, sSubject, sClass) {
                var sId = sMethod + "--" + sSubject + "--" + sClass;
                if (this.simpleForms[sMethod]) {
                    if (this.simpleForms[sMethod][sSubject]) {
                        if (this.simpleForms[sMethod][sSubject][sClass]) {
                            return (this.simpleForms[sMethod][sSubject][sClass]);
                        } else {
                            return (this.runSetup(sId, sMethod, sSubject, sClass));
                        }
                    } else {
                        this.simpleForms[sMethod][sSubject] = {};
                        return (this.runSetup(sId, sMethod, sSubject, sClass));
                    }
                } else {
                    this.simpleForms[sMethod] = {};
                    this.simpleForms[sMethod][sSubject] = {};
                    return (this.runSetup(sId, sMethod, sSubject, sClass));
                }
            },

            /**
             * @brief Executes each of the configuration steps required to build a new instance
             * of the control object.
             * 
             * @method      runSetup
             * @memberof    DynamicSimpleForm
             * 
             * @param {String} sId       The control ID for the DOM object tree
             * @param {String} sMethod   The name of the method
             * @param {String} sSubject  The name of the subject
             * @param {String} sClass    The name of the class
             * 
             * @return      Instance of the Control class
             */
            runSetup: function(sId, sMethod, sSubject, sClass) {
                var oSimpleForm = new SimpleForm(this.createId(sId));
                var oConfig = this.getConfiguration(sMethod, sSubject, sClass);
                this.getFragments(oConfig);
                this.setConfiguration(oSimpleForm, oConfig);
                this.simpleForms[sMethod][sSubject][sClass] = oSimpleForm;
                return (this.simpleForms[sMethod][sSubject][sClass]);
            },

            /**
             * @brief Retrieves the node of the data structure containing the settings for 
             * the specific instance of the SimpleForm.
             * 
             * @method      getConfiguration
             * @memberof    DynamicSimpleForm
             * 
             * @param {String} sMethod   The name of the method
             * @param {String} sSubject  The name of the subject
             * @param {String} sClass    The name of the class
             * 
             * @return  Settings for the SimpleForm configuration from the data model
             */
            getConfiguration: function(sMethod, sSubject, sClass) {
                return (this.getModel("config").getProperty("/" + sMethod + "/" + sSubject + "/" + sClass));
            },

            /**
             * @brief   Returns the entire data structure with all configuration options
             *          
             * @memberof    DynamicSimpleForm
             * 
             * @return  Model containing all methods, subjects, and classes
             */
            getConfigModel: function() {
                return (this.getModel("config"));
            },

            /**
             * @brief   Retrieves a model with sample data
             * 
             * @method      getDataModel
             * @memberof    DynamicSimpleForm
             * 
             * @return  Model containing sample data
             */
            getDataModel: function() {
                return (this.getModel("data"));
            },

            /**
             * @brief Instantiates a new control (from an XML fragment) for 
             * each of the columns in the SimpleForm instance.
             * 
             * @method      getFragments
             * @memberof    DynamicSimpleForm
             * 
             * @param {Object} oConfig  Configuration for the SimpleForm instance (method + subject + class)
             */
            getFragments: function(oConfig) {
                for (var i = 0; i < oConfig.formContainers.length; i++) {
                    if (oConfig.formContainers[i].title) {
                        var sTitle = oConfig.formContainers[i].title;
                        var oTitle = sap.ui.xmlfragment("dynamic.SimpleForm.fragment.Title", this);
                        oTitle.setProperty("text", sTitle);
                        oConfig.formContainers[i].title = oTitle;
                        if (this.view) {
                            this.view.addDependent(oTitle);
                        }
                    }
                    if (oConfig.formContainers[i].label) {
                        var sLabel = oConfig.formContainers[i].label;
                        var oLabel = sap.ui.xmlfragment("dynamic.SimpleForm.fragment.Label", this);
                        oLabel.setProperty("text", sLabel);
                        oConfig.formContainers[i].label = oLabel;
                        if (this.view) {
                            this.view.addDependent(oLabel);
                        }
                    }
                    if (oConfig.formContainers[i].control) {
                        var oControl = sap.ui.xmlfragment("dynamic.SimpleForm.fragment." + oConfig.formContainers[i].control.fragment, this);
                        var aProperties = Object.getOwnPropertyNames(oConfig.formContainers[i].control.binding);
                        for (var j = 0; j < aProperties.length; j++) {
                            var sProperty = aProperties[j];
                            oControl.bindProperty(sProperty, oConfig.formContainers[i].control.binding[sProperty]);
                        }
                        oConfig.formContainers[i].control = oControl;
                        if (this.view) {
                            this.view.addDependent(oControl);
                        }
                    }

                var oFragment = sap.ui.xmlfragment("dynamic.Table.fragment." + oTemplate.fragment, this);
                var aProperties = Object.getOwnPropertyNames(oTemplate.binding);
                for(var j = 0; j < aProperties.length; j++) {
                    var sProperty = aProperties[j];
                    oFragment.bindProperty(sProperty, oTemplate.binding[sProperty]);
                }
                if(this.view) {
                    this.view.addDependent(oFragment);    
                }
                oConfig.columns[i].template = oFragment;
            }
            for (var x = 0; x < oConfig.toolbar.length; x++) {
                var oTemplate = oConfig.toolbar[x];
                var oFragment = sap.ui.xmlfragment("dynamic.Table.fragment." + oTemplate.fragment, this);
                if(oTemplate.properties) {
                    var aProperties = Object.getOwnPropertyNames(oTemplate.properties);
                    for(var j = 0; j < aProperties.length; j++) {
                        var sProperty = aProperties[j];
                        oFragment.setProperty(sProperty, oTemplate.properties[sProperty]);
                    }    
                }
                if(this.view) {
                    this.view.addDependent(oFragment);    
                }
            },

            /**
             * @brief   Sets the configuration options for the SimpleForm
             * 
             * @method      setConfiguration
             * @memberof    DynamicSimpleForm
             * 
             * @param {Object} oSimpleForm The instantiated SimpleForm object
             * @param {Object} oConfig The configuration for the SimpleForm instance
             */
            setConfiguration(oSimpleForm, oConfig) {
                oSimpleForm.setConfiguration(oConfig);
            },

            /**
             * @brief   Gets a new responsive SimpleForm control
             * 
             * @method      getControl
             * @memberof    DynamicSimpleForm
             * 
             * @example
             * onBeforeOpenDialog: function (oEvent) {
             *     var oSource = oEvent.getSource();
             *     var sComponent = this.getOwnerComponent().getFieldGroupId(oSource, "component");
             *     var sMethod = this.getOwnerComponent().getFieldGroupId(oSource, "method");
             *     var sSubject = this.getOwnerComponent().getFieldGroupId(oSource, "subject");
             *     var sClass = this.getOwnerComponent().getFieldGroupId(oSource, "class");
             *     var that = this;
             *     
             *     var pComponent = new Promise((resolve, reject) => {
             *         resolve(that.getOwnerComponent().getComponent(sComponent, sMethod, sSubject, sClass, that.getView()));
             *     }).then(function (oComponent) {
             *         var oControl = oComponent.getControl(sMethod, sSubject, sClass, that.getView());
             *         oSource.addContent(oControl);
             *     });
             * }
             * 
             * @param {String} sMethod   The name of the method
             * @param {String} sSubject  The name of the subject
             * @param {String} sClass    The name of the class
             * @param {Object} oView     The view object requesting the control
             * 
             * @return  Instantiated user-interface control
             */
            getControl: function(sMethod, sSubject, sClass, oView) {
                this.view = oView;
                var oSimpleForm = this.getSimpleForm(sMethod, sSubject, sClass);
                return (oSimpleForm.getControl());
            }

        });

        return Component;
    });