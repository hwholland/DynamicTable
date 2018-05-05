# [parse-cmd-args](https://github.com/neogeek/parse-cmd-args) *1.0.2*

> Returns an object containing the path and flags parsed from process.argv


### lib/cmd.js


#### parseCmdArgs([args, options]) 

Returns an object containing the path and flags parsed from process.argv

    console.log(parseCmdArgs());
    console.log(parseCmdArgs(process.argv.slice(2)));

    console.log(parseCmdArgs(['--version']));
    console.log(parseCmdArgs(['-s', 'Test email']));
    console.log(parseCmdArgs(['./src/', '-s', 'Test email']));

    console.log(parseCmdArgs(null, {'requireUserInput': true}));
    console.log(parseCmdArgs(null, {'allowMultipleInputs': true}));


##### Parameters

- **args** `Array`  *Optional* Arguments to parse through.
- **options** `Object`  *Optional* Options object.
- **options.requireUserInput** `Object`  *Optional* Require user defined input through process.argv removing default of current directory.
- **options.allowMultipleInputs** `Object`  *Optional* Allow for multiple user defined inputs. Causes parseCmdArgs to return an array of inputs.




##### Returns


- `Object`   Object with keys for both the input and flags parsed out of arguments array.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
