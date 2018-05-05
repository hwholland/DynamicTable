# [doxdox-plugin-handlebars](https://github.com/neogeek/doxdox-plugin-handlebars) *1.1.6*

> Custom Handlebars template plugin for doxdox.


### index.js


#### plugin(data) 

Custom Handlebars template plugin for doxdox.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Array`  | Methods parsed using a doxdox parser. | &nbsp; |




##### Examples

```javascript
parseInputs(inputs, {'parser': 'dox', 'layout': 'template.hbs'}).then(content => console.log(content));
```


##### Returns


- `Promise`  Promise with generated content.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
