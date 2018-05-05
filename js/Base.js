sap.ui.define(["sap/ui/base/Object", "sap/ui/model/json/JSONModel"], function(Base, JSONModel) {
    "use strict";
    return Base.extend("DynamicTable.js.Base", {

        constructor: function(oProperties) {
            if(oProperties) {
                var aNames = Object.getOwnPropertyNames(oProperties);
                for(var i = 0; i < aNames.length; i++) {
                    var sName = aNames[i];
                    var sValue = oProperties[sName];
                    this.data[sName] = sValue;
                }
            }
        },

        _get: function(sUrl, fnSuccess, fnError) {
            $.ajax({
                url: sUrl,
                success: fnSuccess,
                error: fnError
            });
        },

        _post: function(sUrl, oData, fnSuccess, fnError) {
            jQuery.ajax({
                url: sUrl,
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify(oData),
                contentType: 'application/json',
                success: fnSuccess,
                error: fnError
            });
        },

        getModel: function() {
            return (this.model);
        },

        setModel: function(oModel) {
            this.model = oModel;
        },

        getParent: function() {
            return (this.parent);
        },

        setParent: function(oParent) {
            try {
                this.parent = oParent;
            } catch (e) {
            }
        },

        getEmptyModel() {
            return (new JSONModel());
        }

    })
});