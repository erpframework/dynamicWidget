//michaeldewayneharris@gmail.com
if (!window.dynamicWidgetParams) {
  window.dynamicWidgetParams = {
    widgetJSDirectory: '/scripts/widgets/',
    widgetCSSDirectory: '/styles/widgets/',
    cache: false,
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
  window.dynamicWidgetParams.widgets = {};
  $.fn.dynamicWidget = function(widgetName){
    var args = Array.prototype.slice.call(arguments);
    
    if (!window.dynamicWidgetParams.widgets[widgetName]) {
      window.dynamicWidgetParams.widgets[widgetName] = {
        loadCSS: true
      };
    }
    
    if ($.dynamicWidget[widgetName]) {
      args.shift();
      return $(this)[widgetName].apply(this, args);
    }
    
    if (window.dynamicWidgetParams.widgets[widgetName].loading) {
      setTimeout($.proxy(function(){
        $(this).dynamicWidget.apply(this, args);
      }, this), 500);
      return this;
    }

    window.dynamicWidgetParams.widgets[widgetName].loading = true;
    var jsUrl = window.dynamicWidgetParams.widgetJSDirectory + widgetName + ".js";   
    
    $.ajax({
      url: jsUrl,
      dataType: "script",
      cache: window.dynamicWidgetParams.cache,
      success: $.proxy(function(){
        window.dynamicWidgetParams.widgets[widgetName].loading = false;
        
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
      if (window.dynamicWidgetParams.widgets[this.widgetName].loadCSS){
        var cssUrl = window.dynamicWidgetParams.widgetCSSDirectory + this.widgetName + ".css";
        var cssId = cssUrl.replace(/[\./]/g, "_");
        if ($("#" + cssId).length === 0) {
          $.ajax({
            url: cssUrl,
            dataType: "text",
            cache: window.dynamicWidgetParams.cache,
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
  _destroy: function(){
    if (window.dynamicWidgetParams.widgets[this.widgetName].loadCSS){
      var cssUrl = window.dynamicWidgetParams.widgetCSSDirectory + this.widgetName + ".css";
      cssUrl = cssUrl.replace(/[\./]/g, "_");
      $("#" + cssUrl).remove();
    }
    if (this.dw_destroy) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_destroy.apply(this, args);
    }
  },
  _create: function(){
    if (this.dw_create) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_create.apply(this, args);
    }
  },
  _delay: function(){
    if (this.dw_delay) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_delay.apply(this, args);
    }
  },
  _focusable: function(){
    if (this.dw_focusable) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_focusable.apply(this, args);
    }
  },
  _getCreateOptions: function(){
    if (this.dw_getCreateOptions) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_getCreateOptions.apply(this, args);
    }
  },
  _hide: function(){
    if (this.dw_hide) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_hide.apply(this, args);
    }
  },
  _hoverable: function(){
    if (this._hoverable) {
      var args = Array.prototype.slice.call(arguments);
      this._hoverable.apply(this, args);
    }
  },
  _off: function(){
    if (this.dw_off) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_off.apply(this, args);
    }
  },
  _on: function(){
    if (this.dw_on) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_on.apply(this, args);
    }
  },
  _setOption: function(){
    if (this.dw_setOption) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_setOption.apply(this, args);
    }
  },
  _setOptions: function(){
    if (this.dw_setOptions) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_setOptions.apply(this, args);
    }
  },
  _show: function(){
    if (this.dw_show) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_show.apply(this, args);
    }
  },
  _super: function(){
    if (this.dw_super) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_super.apply(this, args);
    }
  },
  _superApply: function(){
    if (this.dw_superApply) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_superApply.apply(this, args);
    }
  },
  _trigger: function(){
    if (this.dw_trigger) {
      var args = Array.prototype.slice.call(arguments);
      this.dw_trigger.apply(this, args);
    }
  }
});