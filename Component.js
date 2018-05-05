sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel', 'DynamicTable/js/Control'], function (UIComponent, JSONModel, ResponsiveTable) {
    "use strict";

    /**
     * The main interface for interacting with the table objects (tables.web.js.ResponsiveTable).
     * Handles the init process of establishing a new table object and corresponding user-interface control.  This
     * takes the burden off the view controllers so they can simply focus on event-handling specific to that view.
     * 
     *
     * @subject       tables.web.components.table.Responsive
     * @extends     sap.ui.core.UIComponent
     */
    var Component = UIComponent.extend("DynamicTable.Component", {

        /**
         * @property   {Object} metadata settings and information about the application
         * @memberof   tables.web.components.table.Responsive
         */
        metadata: {
            manifest: "json"
        },

        /**
         * @method      init
         * @memberof    tables.web.components.table.Responsive
         */
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

        getTable: function (sMethod, sSubject, sClass) {
            var sId = sMethod + "--" + sSubject + "--" + sClass;
            if (this.tables[sMethod]) {
                if (this.tables[sMethod][sSubject]) {
                    if (this.tables[sMethod][sSubject][sClass]) {
                        return (this.tables[sMethod][sSubject][sClass]);
                    }
                    else {
                        return (this.runSetup(sId, sMethod, sSubject, sClass));
                    }
                }
                else {
                    this.tables[sMethod][sSubject] = {};
                    return (this.runSetup(sId, sMethod, sSubject, sClass));
                }
            }
            else {
                this.tables[sMethod] = {};
                this.tables[sMethod][sSubject] = {};
                return (this.runSetup(sId, sMethod, sSubject, sClass));
            }
        },

        runSetup: function (sId, sMethod, sSubject, sClass) {
            var oTable = new ResponsiveTable(this.createId(sId));
            var oConfig = this.getConfiguration(sMethod, sSubject, sClass);
            this.getFragments(oConfig);
            this.setConfiguration(oTable, oConfig);
            this.tables[sMethod][sSubject][sClass] = oTable;
            return (this.tables[sMethod][sSubject][sClass]);
        },

        getConfiguration: function (sMethod, sSubject, sClass) {
            return (this.getModel("config").getProperty("/" + sMethod + "/" + sSubject + "/" + sClass));
        },

        getDataModel: function () {
            return (this.getModel("config"));
        },

        getFragments: function (oConfig) {
            for (var i = 0; i < oConfig.columns.length; i++) {
                var sTemplate = oConfig.columns[i].template;
                var oFragment = sap.ui.xmlfragment("DynamicTable.fragment." + sTemplate, this);
                if(this.view) {
                    this.view.addDependent(oFragment);    
                }
                oConfig.columns[i].template = oFragment;
            }
            for (var x = 0; x < oConfig.toolbar.length; x++) {
                var sTemplate = oConfig.toolbar[x];
                var oFragment = sap.ui.xmlfragment("DynamicTable.fragment." + sTemplate, this);
                if(this.view) {
                    this.view.addDependent(oFragment);    
                }
                oConfig.toolbar[x] = oFragment;
            }
        },

        setConfiguration(oTable, oConfig) {
            oTable.setConfiguration(oConfig);
        },

        getControl: function (sMethod, sSubject, sClass, oView) {
            this.view = oView;
            var oTable = this.getTable(sMethod, sSubject, sClass);
            return (oTable.getControl());
        }

    });

    return Component;
});