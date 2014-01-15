CKEDITOR.editorConfig = function( config ) {
  config.removePlugins = "forms, iframe, save, flash, maximize, templates, print, preview, newpage";
  config.contentsCss = CKEDITOR.basePath + "../shared/wysiwyg.css";
  config.enterMode = CKEDITOR.ENTER_BR;
  config.shiftEnterMode = CKEDITOR.ENTER_BR;
  config.protectedSource.push(/<[\$\/]?marquee[\s\S]*?>\n?/g);
  config.protectedSource.push(/<[\$\/]?blink[\s\S]*?>\n?/g);
};
CKEDITOR.on("instanceReady", function( ev ) {
  var blockTags = ["div","h1","h2","h3","h4","h5","h6","p","pre","li","blockquote","ul","ol",
  "table","thead","tbody","tfoot","td","th",];
  for (var i = 0; i < blockTags.length; i++)
  {
     ev.editor.dataProcessor.writer.setRules(blockTags[i], {
        breakBeforeOpen : false,
        breakAfterOpen : false,
        breakBeforeClose : false,
        breakAfterClose : false
     });
  }
});