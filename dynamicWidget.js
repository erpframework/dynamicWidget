//version 0.0.1
if (!window.dynamicWidgetParams) {
  dynamicWidgetParams = {
    widgetJSDirectory: '/scripts/widgets/',
    widgetCSSDirectory: '/styles/widgets/',
    cache: true,
    widgets: {
      //to skip loading of css, 
      //you need to build this object in your server language of choice.
      //i recomend a recursive function that builds this based on if the file exists or not
      //otherwise it is assumed that every dynamic widget has css and js
      //widgetName: {loadCSS: false}
    }
  };
}

(function($){
  dynamicWidgetParams.widgets = {};
  $.fn.dynamicWidget = function(widgetName){
    var args = Array.prototype.slice.call(arguments);
    
    if (!dynamicWidgetParams.widgets[widgetName]) {
      dynamicWidgetParams.widgets[widgetName] = {
        loadCSS: true
      };
    }
    
    if ($.dynamicWidget[widgetName]) {
      args.shift();
      return $(this)[widgetName].apply(this, args);
    }
    
    if (dynamicWidgetParams.widgets[widgetName].loading) {
      setTimeout($.proxy(function(){
        $(this).dynamicWidget.apply(this, args);
      }, this), 500);
      return this;
    }

    dynamicWidgetParams.widgets[widgetName].loading = true;
    var jsUrl = dynamicWidgetParams.widgetJSDirectory + widgetName + ".js";   
    
    $.ajax({
      url: jsUrl,
      dataType: "script",
      cache: dynamicWidgetParams.cache,
      success: $.proxy(function(){
        dynamicWidgetParams.widgets[widgetName].loading = false;
        
        $(this).dynamicWidget.apply(this, args);
        
      },this),
      
      error: $.proxy(function(){
        throw ("Unable to load " + widgetName + " js");
      }, this)
    });
       
    return this;
  };
}(jQuery));

jQuery.widget('dynamicWidget.base', {
  _init: function(){
    if (this.dw_init) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_init.apply(this, args);
      
      if (dynamicWidgetParams.widgets[this.widgetName].loadCSS){
        var cssUrl = dynamicWidgetParams.widgetCSSDirectory + this.widgetName + ".css";
        var cssId = cssUrl.replace(/[\./]/g, "_");
        if ($("#" + cssId).length === 0) {
          $.ajax({
            url: cssUrl,
            dataType: "text",
            cache: dynamicWidgetParams.cache,
            success: function(data){
              $("head").append("<style id='" + cssId + "'>" + data + "</style>");
            },
            error: $.proxy(function(){
              throw ("Unable to load " + widgetName + " css");
            }, this)
          });
        }
      }
    }
  },
  destroy: function(){
    if (dynamicWidgetParams.widgets[this.widgetName].loadCSS){
      var cssUrl = dynamicWidgetParams.widgetCSSDirectory + this.widgetName + ".css";
      cssUrl = cssUrl.replace(/[\./]/g, "_");
      $("#" + cssUrl).remove();
    }
    if (this.dw_destroy) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_destroy.apply(this, args);
    }
  }
});