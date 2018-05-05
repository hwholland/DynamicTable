# solo

Small-business ERP toolkit that provides bookkeeping, reporting, and workflow.  Additionally, the system has the capability of identifying opportunities to improve business processes based on observing trends as data is captured during the business transactions.  

## Architecture

Solo is an implementation of general systems theory.  At it's core is a data model which is abstract such that all business transactions can be categorized neatly into distinct groups.

... [finish this at some point]

## Getting Started

These instructions will get you a copy of the software up and running on a local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The OpenUI5 framework must be installed on the machine running this package.  Currently, there is one set of libraries which is required by this application but not provided as part of the open-source package.  The OpenUI5 framework will ultimately have to be packaged with this
git repository but it is not currently included.  

*Note: this requirement will likely prevent the application from functioning as expected if deployed by anyone other than Harrison - who has the complete OpenUI5 libraries (including the sap.viz libraries) on his laptop.  Ask him for help if needed.*

### Installing

Download the archive to the host computer (desktop or server), then navigate
to the project's directory on the filesystem using a command-prompt or terminal.

```
~/DynamicTable
```

Open index.html in a text editor and change this line of code

```
<script src="../../libs/ui5/resources/sap-ui-core.js" 
```

This needs to reference the UI5 framework on the local machine.  The remainder of that tag is the bootstrap for UI5.
```
	id="sap-ui-bootstrap" 
	data-sap-ui-theme="sap_belize_plus" 
	data-sap-ui-bindingSyntax="complex" 
	data-sap-ui-compatVersion="edge" 
	data-sap-ui-preload="async" 
	data-sap-ui-language="en" 
	data-sap-ui-resourceroots='{
		"DynamicTable": "./"  

	}'>
</script>
```

For Windows machines do not include "sudo"

## Deployment

In the same directory as the installation path, run the following command

```
node index.js
```

## Built With

* [OpenUI5](https://github.com/openui5) - The user-interface framework
* [Node.js](https://nodejs.org) - Server-side JavaScript engine
* [Express](https://github.com/expressjs/express) - The web framework


## Authors

* **Juichia Che** - *Concept*
* **Harrison Holland** - *Software Architecture & Engineering, Database Design & Implementation, User Interface Design* - [hwholland](https://github.com/hwholland)
