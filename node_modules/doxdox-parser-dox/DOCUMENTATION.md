# [doxdox-parser-dox](https://github.com/neogeek/doxdox-parser-dox) *1.1.3*

> Dox parser plugin for doxdox.


### index.js


#### formatStringForName(contents)  *private method*

Format string as name.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| contents | `String`  | String to format. | &nbsp; |




##### Examples

```javascript
formatStringForName('module.exports.parser');
```


##### Returns


- `String`  Formatted string.



#### formatStringForParam(contents)  *private method*

Format string as param.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| contents | `String`  | String to format. | &nbsp; |




##### Examples

```javascript
formatStringForParam('[optional param]');
```


##### Returns


- `String`  Formatted string.



#### formatStringForUID(contents)  *private method*

Format string as UID.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| contents | `String`  | String to format. | &nbsp; |




##### Examples

```javascript
formatStringForUID('example string');
```


##### Returns


- `String`  Formatted string.



#### parser(content, filename) 

Dox parser for doxdox.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  | Contents of file. | &nbsp; |
| filename | `String`  | Name of file. Used to generate UIDs. | &nbsp; |




##### Examples

```javascript
parser(content, 'index.js').then(methods => console.log(methods));
```


##### Returns


- `Promise`  Promise with methods parsed from contents.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
