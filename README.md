# express-dumper
Express js dump array or object with unordered list as tree view with html and css

### Sample View

 - [1] key => value
 - [2] key => value
 - [3] key => children
	 - [1] sub-key => value
	 - [2] sub-key => value
	 - [3] sub-key => children
		 - [1] sub-key => value
		 - [2] sub-key => value
		 - [3] sub-key => value
 - [4] key => value

#### How to use ?

`const dumper = require('express-dumper');`
`dumper.dump(/* array or object */)`

#### Sample with express view
````
app.locals.dumper = function(array) {
  return dumper.dump(array);
});
````
`<%= dumper(/* array or object */) %>  OR  {{ dumper(/* array or object */) }}`
