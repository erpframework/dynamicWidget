dynamicWidget
=============

Dynamic widget loading for  JQuery UI

## global configuration
```javascript
dynamicWidgetParams = {
	widgetJSDirectory: 'scripts/widgets/',//this is not necessary if you put your widgets in /scripts/widgets/
	widgetCSSDirectory: 'styles/widgets/',//this is not necessary if you put your widgets in /styles/widgets/
	cache: true,
	widgets: {    //this is not needed unless you want to have a dynamic widget without any css
	  //to skip loading of css, 
	  //you need to build this object in your server language of choice.
	  //i recomend a recursive function that builds this based on if the file exists or not
	  //otherwise it is assumed that every dynamic widget has css and js
	  //widgetName: {loadCSS: false}
	}
};
```
## Widget Definition
```javascript
jQuery.widget('dynamicWidget.template', $.dynamicWidget.base, { 
  dw_init: function(){
    console.log('init');
  },
  dw_destroy: function(){
    console.log('destroy');
  }
});
```
* dynamicWidget names must contain the dynamicWidget. prefix
* dynamicWidgets must use $.dynamicWidget.base as a base class for the widget.
* init and destroy functions must be specified using the dw_ prefix.  this step is very important.  if you specific _init and destroy you will override dynamicWidgets handing of css
* other than that its exactly a jquery ui widget

## Usage
### Creation 
```javascript
$(document).dynamicWidget("template");
```
### Destruction
```javascript
$(document).dynamicWidget("template", "destroy");
```

* Dynamic widgets function almost identical to standard jqueryUI widgets.  The only difference is everything must go through the dynamicWidget function. 
* basically everything beyond the first parameter gets passed to the a jquery ui widget, so anything you want to pass will work the same way as with jquery ui 

to pass additional options to your widget:
```javascript
$(document).dynamicWidget("template", {yourOptions: yourValues});
```
or you can trigger a function to run on your widget like this 
```javascript
$(document).dynamicWidget("template", "yourFunction");
```

*you can use dynamic widgets almost exactly like you use standard jqueryui widgets.  the only difference is you need to pass it through the dynamicWidget function with the first paramter being the name of the widget
