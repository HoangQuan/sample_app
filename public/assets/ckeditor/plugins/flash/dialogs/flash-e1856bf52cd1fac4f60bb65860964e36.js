/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){function e(e,t,r){var l=o[this.id];if(l)for(var s=this instanceof CKEDITOR.ui.dialog.checkbox,d=0;d<l.length;d++){var c=l[d];switch(c.type){case a:if(!e)continue;if(null!==e.getAttribute(c.name))return e=e.getAttribute(c.name),s?this.setValue("true"==e.toLowerCase()):this.setValue(e),void 0;s&&this.setValue(!!c["default"]);break;case n:if(!e)continue;if(c.name in r)return e=r[c.name],s?this.setValue("true"==e.toLowerCase()):this.setValue(e),void 0;s&&this.setValue(!!c["default"]);break;case i:if(!t)continue;if(t.getAttribute(c.name))return e=t.getAttribute(c.name),s?this.setValue("true"==e.toLowerCase()):this.setValue(e),void 0;s&&this.setValue(!!c["default"])}}}function t(e,t,r){var l=o[this.id];if(l)for(var s=""===this.getValue(),d=this instanceof CKEDITOR.ui.dialog.checkbox,c=0;c<l.length;c++){var u=l[c];switch(u.type){case a:if(!e||"data"==u.name&&t&&!e.hasAttribute("data"))continue;var p=this.getValue();s||d&&p===u["default"]?e.removeAttribute(u.name):e.setAttribute(u.name,p);break;case n:if(!e)continue;if(p=this.getValue(),s||d&&p===u["default"])u.name in r&&r[u.name].remove();else if(u.name in r)r[u.name].setAttribute("value",p);else{var m=CKEDITOR.dom.element.createFromHtml("<cke:param></cke:param>",e.getDocument());m.setAttributes({name:u.name,value:p}),1>e.getChildCount()?m.appendTo(e):m.insertBefore(e.getFirst())}break;case i:if(!t)continue;p=this.getValue(),s||d&&p===u["default"]?t.removeAttribute(u.name):t.setAttribute(u.name,p)}}}for(var a=1,n=2,i=4,o={id:[{type:a,name:"id"}],classid:[{type:a,name:"classid"}],codebase:[{type:a,name:"codebase"}],pluginspage:[{type:i,name:"pluginspage"}],src:[{type:n,name:"movie"},{type:i,name:"src"},{type:a,name:"data"}],name:[{type:i,name:"name"}],align:[{type:a,name:"align"}],"class":[{type:a,name:"class"},{type:i,name:"class"}],width:[{type:a,name:"width"},{type:i,name:"width"}],height:[{type:a,name:"height"},{type:i,name:"height"}],hSpace:[{type:a,name:"hSpace"},{type:i,name:"hSpace"}],vSpace:[{type:a,name:"vSpace"},{type:i,name:"vSpace"}],style:[{type:a,name:"style"},{type:i,name:"style"}],type:[{type:i,name:"type"}]},r="play loop menu quality scale salign wmode bgcolor base flashvars allowScriptAccess allowFullScreen".split(" "),l=0;l<r.length;l++)o[r[l]]=[{type:i,name:r[l]},{type:n,name:r[l]}];for(r=["allowFullScreen","play","loop","menu"],l=0;l<r.length;l++)o[r[l]][0]["default"]=o[r[l]][1]["default"]=!0;CKEDITOR.dialog.add("flash",function(a){var n,i=!a.config.flashEmbedTagOnly,o=a.config.flashAddEmbedTag||a.config.flashEmbedTagOnly,r="<div>"+CKEDITOR.tools.htmlEncode(a.lang.common.preview)+'<br><div id="cke_FlashPreviewLoader'+CKEDITOR.tools.getNextNumber()+'" style="display:none"><div class="loading">&nbsp;</div></div><div id="cke_FlashPreviewBox'+CKEDITOR.tools.getNextNumber()+'" class="FlashPreviewBox"></div></div>';return{title:a.lang.flash.title,minWidth:420,minHeight:310,onShow:function(){this.fakeImage=this.objectNode=this.embedNode=null,n=new CKEDITOR.dom.element("embed",a.document);var e=this.getSelectedElement();if(e&&e.data("cke-real-element-type")&&"flash"==e.data("cke-real-element-type")){this.fakeImage=e;var t=a.restoreRealElement(e),i=null,o=null,r={};if("cke:object"==t.getName()){i=t,t=i.getElementsByTag("embed","cke"),0<t.count()&&(o=t.getItem(0));for(var t=i.getElementsByTag("param","cke"),l=0,s=t.count();s>l;l++){var d=t.getItem(l),c=d.getAttribute("name"),d=d.getAttribute("value");r[c]=d}}else"cke:embed"==t.getName()&&(o=t);this.objectNode=i,this.embedNode=o,this.setupContent(i,o,r,e)}},onOk:function(){var e=null,t=null,n=null;if(this.fakeImage?(e=this.objectNode,t=this.embedNode):(i&&(e=CKEDITOR.dom.element.createFromHtml("<cke:object></cke:object>",a.document),e.setAttributes({classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"})),o&&(t=CKEDITOR.dom.element.createFromHtml("<cke:embed></cke:embed>",a.document),t.setAttributes({type:"application/x-shockwave-flash",pluginspage:"http://www.macromedia.com/go/getflashplayer"}),e&&t.appendTo(e))),e)for(var n={},r=e.getElementsByTag("param","cke"),l=0,s=r.count();s>l;l++)n[r.getItem(l).getAttribute("name")]=r.getItem(l);r={},l={},this.commitContent(e,t,n,r,l),e=a.createFakeElement(e||t,"cke_flash","flash",!0),e.setAttributes(l),e.setStyles(r),this.fakeImage?(e.replace(this.fakeImage),a.getSelection().selectElement(e)):a.insertElement(e)},onHide:function(){this.preview&&this.preview.setHtml("")},contents:[{id:"info",label:a.lang.common.generalTab,accessKey:"I",elements:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["280px","110px"],align:"right",children:[{id:"src",type:"text",label:a.lang.common.url,required:!0,validate:CKEDITOR.dialog.validate.notEmpty(a.lang.flash.validateSrc),setup:e,commit:t,onLoad:function(){var e=this.getDialog(),t=function(t){n.setAttribute("src",t),e.preview.setHtml('<embed height="100%" width="100%" src="'+CKEDITOR.tools.htmlEncode(n.getAttribute("src"))+'" type="application/x-shockwave-flash"></embed>')};e.preview=e.getContentElement("info","preview").getElement().getChild(3),this.on("change",function(e){e.data&&e.data.value&&t(e.data.value)}),this.getInputElement().on("change",function(){t(this.getValue())},this)}},{type:"button",id:"browse",filebrowser:"info:src",hidden:!0,style:"display:inline-block;margin-top:10px;",label:a.lang.common.browseServer}]}]},{type:"hbox",widths:["25%","25%","25%","25%","25%"],children:[{type:"text",id:"width",requiredContent:"embed[width]",style:"width:95px",label:a.lang.common.width,validate:CKEDITOR.dialog.validate.htmlLength(a.lang.common.invalidHtmlLength.replace("%1",a.lang.common.width)),setup:e,commit:t},{type:"text",id:"height",requiredContent:"embed[height]",style:"width:95px",label:a.lang.common.height,validate:CKEDITOR.dialog.validate.htmlLength(a.lang.common.invalidHtmlLength.replace("%1",a.lang.common.height)),setup:e,commit:t},{type:"text",id:"hSpace",requiredContent:"embed[hspace]",style:"width:95px",label:a.lang.flash.hSpace,validate:CKEDITOR.dialog.validate.integer(a.lang.flash.validateHSpace),setup:e,commit:t},{type:"text",id:"vSpace",requiredContent:"embed[vspace]",style:"width:95px",label:a.lang.flash.vSpace,validate:CKEDITOR.dialog.validate.integer(a.lang.flash.validateVSpace),setup:e,commit:t}]},{type:"vbox",children:[{type:"html",id:"preview",style:"width:95%;",html:r}]}]},{id:"Upload",hidden:!0,filebrowser:"uploadButton",label:a.lang.common.upload,elements:[{type:"file",id:"upload",label:a.lang.common.upload,size:38},{type:"fileButton",id:"uploadButton",label:a.lang.common.uploadSubmit,filebrowser:"info:src","for":["Upload","upload"]}]},{id:"properties",label:a.lang.flash.propertiesTab,elements:[{type:"hbox",widths:["50%","50%"],children:[{id:"scale",type:"select",requiredContent:"embed[scale]",label:a.lang.flash.scale,"default":"",style:"width : 100%;",items:[[a.lang.common.notSet,""],[a.lang.flash.scaleAll,"showall"],[a.lang.flash.scaleNoBorder,"noborder"],[a.lang.flash.scaleFit,"exactfit"]],setup:e,commit:t},{id:"allowScriptAccess",type:"select",requiredContent:"embed[allowscriptaccess]",label:a.lang.flash.access,"default":"",style:"width : 100%;",items:[[a.lang.common.notSet,""],[a.lang.flash.accessAlways,"always"],[a.lang.flash.accessSameDomain,"samedomain"],[a.lang.flash.accessNever,"never"]],setup:e,commit:t}]},{type:"hbox",widths:["50%","50%"],children:[{id:"wmode",type:"select",requiredContent:"embed[wmode]",label:a.lang.flash.windowMode,"default":"",style:"width : 100%;",items:[[a.lang.common.notSet,""],[a.lang.flash.windowModeWindow,"window"],[a.lang.flash.windowModeOpaque,"opaque"],[a.lang.flash.windowModeTransparent,"transparent"]],setup:e,commit:t},{id:"quality",type:"select",requiredContent:"embed[quality]",label:a.lang.flash.quality,"default":"high",style:"width : 100%;",items:[[a.lang.common.notSet,""],[a.lang.flash.qualityBest,"best"],[a.lang.flash.qualityHigh,"high"],[a.lang.flash.qualityAutoHigh,"autohigh"],[a.lang.flash.qualityMedium,"medium"],[a.lang.flash.qualityAutoLow,"autolow"],[a.lang.flash.qualityLow,"low"]],setup:e,commit:t}]},{type:"hbox",widths:["50%","50%"],children:[{id:"align",type:"select",requiredContent:"object[align]",label:a.lang.common.align,"default":"",style:"width : 100%;",items:[[a.lang.common.notSet,""],[a.lang.common.alignLeft,"left"],[a.lang.flash.alignAbsBottom,"absBottom"],[a.lang.flash.alignAbsMiddle,"absMiddle"],[a.lang.flash.alignBaseline,"baseline"],[a.lang.common.alignBottom,"bottom"],[a.lang.common.alignMiddle,"middle"],[a.lang.common.alignRight,"right"],[a.lang.flash.alignTextTop,"textTop"],[a.lang.common.alignTop,"top"]],setup:e,commit:function(e,a,n,i,o){var r=this.getValue();t.apply(this,arguments),r&&(o.align=r)}},{type:"html",html:"<div></div>"}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(a.lang.flash.flashvars),children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"menu",label:a.lang.flash.chkMenu,"default":!0,setup:e,commit:t},{type:"checkbox",id:"play",label:a.lang.flash.chkPlay,"default":!0,setup:e,commit:t},{type:"checkbox",id:"loop",label:a.lang.flash.chkLoop,"default":!0,setup:e,commit:t},{type:"checkbox",id:"allowFullScreen",label:a.lang.flash.chkFull,"default":!0,setup:e,commit:t}]}]}]},{id:"advanced",label:a.lang.common.advancedTab,elements:[{type:"hbox",children:[{type:"text",id:"id",requiredContent:"object[id]",label:a.lang.common.id,setup:e,commit:t}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",id:"bgcolor",requiredContent:"embed[bgcolor]",label:a.lang.flash.bgcolor,setup:e,commit:t},{type:"text",id:"class",requiredContent:"embed(cke-xyz)",label:a.lang.common.cssClass,setup:e,commit:t}]},{type:"text",id:"style",requiredContent:"embed{cke-xyz}",validate:CKEDITOR.dialog.validate.inlineStyle(a.lang.common.invalidInlineStyle),label:a.lang.common.cssStyle,setup:e,commit:t}]}]}})}();