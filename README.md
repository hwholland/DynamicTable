# bean.dynamic.Table

This is a component which makes up part of a library of components which each provide a dynamic control (user-interface) in JavaScript, using the OpenUI5 franework.  This component builds a responsive table (sap.m.Table in OpenUI5) based on configurations made in a JSON file.  The data structure modeled in JSON can also be reflected in a database, or any other structured model. 

## Prerequisites

OpenUI5 must be downloaded and extracted.  The bootstrap for this component then needs to be adapted to the location of the UI5 folder on the filesystem.  This can be done by editing the following lines of code in the index.html file, or wherever the main application bootstrap is:

```
<script src="../../../../libs/ui5/resources/sap-ui-core.js" id="sap-ui-bootstrap" 
	data-sap-ui-theme="sap_belize_plus" 
	data-sap-ui-bindingSyntax="complex" 
	data-sap-ui-compatVersion="edge" 
	data-sap-ui-preload="async" 
	data-sap-ui-language="en" 
	data-sap-ui-resourceroots='{
		"bean.dynamic.Table": "./"  }'>
</script>

```

More specifically, this line:

```
<script src="../../../../libs/ui5/resources/sap-ui-core.js" 

```

### Installing

Download the package to the host computer (desktop or server), then navigate
to the project's directory on the filesystem using a command-prompt or terminal.

```
~/DynamicTable
```

## Built With

* [OpenUI5](https://github.com/openui5) - The user-interface framework
* [Node.js](https://nodejs.org) - Server-side JavaScript engine
* [Express](https://github.com/expressjs/express) - The web framework


## Authors

* **Juichia Che** - *Concept*
* **Harrison Holland** - *Software Architecture & Engineering, Database Design & Implementation, User Interface Design* - [hwholland](https://github.com/hwholland)
