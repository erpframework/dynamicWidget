jQuery.widget('dynamicWidget.template', $.dynamicWidget.base, { 
  dw_init: function(){
    console.log('init');
  },
  dw_destroy: function(){
    console.log('destroy');
  }
});

