/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("link",function(e){function t(e){return e.replace(/'/g,"\\$&")}function a(e){var a,n,i,l=o;a=[r,"("];for(var s=0;s<l.length;s++)n=l[s].toLowerCase(),i=e[n],s>0&&a.push(","),a.push("'",i?t(encodeURIComponent(e[n])):"","'");return a.push(")"),a.join("")}function n(e){for(var t,a=e.length,n=[],i=0;a>i;i++)t=e.charCodeAt(i),n.push(t);return"String.fromCharCode("+n.join(",")+")"}function i(e){return(e=e.getAttribute("class"))?e.replace(/\s*(?:cke_anchor_empty|cke_anchor)(?:\s*$)?/g,""):""}var o,r,l=CKEDITOR.plugins.link,s=function(){var t=this.getDialog(),a=t.getContentElement("target","popupFeatures"),t=t.getContentElement("target","linkTargetName"),n=this.getValue();if(a&&t)switch(a=a.getElement(),a.hide(),t.setValue(""),n){case"frame":t.setLabel(e.lang.link.targetFrameName),t.getElement().show();break;case"popup":a.show(),t.setLabel(e.lang.link.targetPopupName),t.getElement().show();break;default:t.setValue(n),t.getElement().hide()}},d=/^javascript:/,c=/^mailto:([^?]+)(?:\?(.+))?$/,u=/subject=([^;?:@&=$,\/]*)/,p=/body=([^;?:@&=$,\/]*)/,m=/^#(.*)$/,h=/^((?:http|https|ftp|news):\/\/)?(.*)$/,g=/^(_(?:self|top|parent|blank))$/,f=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,b=/^javascript:([^(]+)\(([^)]+)\)$/,v=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,T=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,E=function(e,t){var a,n,l=t&&(t.data("cke-saved-href")||t.getAttribute("href"))||"",s={};if(l.match(d)&&("encode"==R?l=l.replace(f,function(e,t,a){return"mailto:"+String.fromCharCode.apply(String,t.split(","))+(a&&a.replace(/\\'/g,"'"))}):R&&l.replace(b,function(e,t,a){if(t==r){s.type="email";for(var n,i,e=s.email={},t=/(^')|('$)/g,a=a.match(/[^,\s]+/g),l=a.length,d=0;l>d;d++)n=decodeURIComponent,i=a[d].replace(t,"").replace(/\\'/g,"'"),i=n(i),n=o[d].toLowerCase(),e[n]=i;e.address=[e.name,e.domain].join("@")}})),!s.type)if(a=l.match(m))s.type="anchor",s.anchor={},s.anchor.name=s.anchor.id=a[1];else if(a=l.match(c)){n=l.match(u),l=l.match(p),s.type="email";var E=s.email={};E.address=a[1],n&&(E.subject=decodeURIComponent(n[1])),l&&(E.body=decodeURIComponent(l[1]))}else l&&(n=l.match(h))?(s.type="url",s.url={},s.url.protocol=n[1],s.url.url=n[2]):s.type="url";if(t){if(a=t.getAttribute("target"),s.target={},s.adv={},a)a.match(g)?s.target.type=s.target.name=a:(s.target.type="frame",s.target.name=a);else if(a=(a=t.data("cke-pa-onclick")||t.getAttribute("onclick"))&&a.match(v))for(s.target.type="popup",s.target.name=a[1];l=T.exec(a[2]);)"yes"!=l[2]&&"1"!=l[2]||l[1]in{height:1,width:1,top:1,left:1}?isFinite(l[2])&&(s.target[l[1]]=l[2]):s.target[l[1]]=!0;a=function(e,a){var n=t.getAttribute(a);null!==n&&(s.adv[e]=n||"")},a("advId","id"),a("advLangDir","dir"),a("advAccessKey","accessKey"),s.adv.advName=t.data("cke-saved-name")||t.getAttribute("name")||"",a("advLangCode","lang"),a("advTabIndex","tabindex"),a("advTitle","title"),a("advContentType","type"),CKEDITOR.plugins.link.synAnchorSelector?s.adv.advCSSClasses=i(t):a("advCSSClasses","class"),a("advCharset","charset"),a("advStyles","style"),a("advRel","rel")}a=s.anchors=[];var C;if(CKEDITOR.plugins.link.emptyAnchorFix)for(E=e.document.getElementsByTag("a"),l=0,n=E.count();n>l;l++)C=E.getItem(l),(C.data("cke-saved-name")||C.hasAttribute("name"))&&a.push({name:C.data("cke-saved-name")||C.getAttribute("name"),id:C.getAttribute("id")});else for(E=new CKEDITOR.dom.nodeList(e.document.$.anchors),l=0,n=E.count();n>l;l++)C=E.getItem(l),a[l]={name:C.getAttribute("name"),id:C.getAttribute("id")};if(CKEDITOR.plugins.link.fakeAnchor)for(E=e.document.getElementsByTag("img"),l=0,n=E.count();n>l;l++)(C=CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,E.getItem(l)))&&a.push({name:C.getAttribute("name"),id:C.getAttribute("id")});return this._.selectedElement=t,s},C=function(e){e.target&&this.setValue(e.target[this.id]||"")},y=function(e){e.adv&&this.setValue(e.adv[this.id]||"")},k=function(e){e.target||(e.target={}),e.target[this.id]=this.getValue()||""},I=function(e){e.adv||(e.adv={}),e.adv[this.id]=this.getValue()||""},R=e.config.emailProtection||"";R&&"encode"!=R&&(r=o=void 0,R.replace(/^([^(]+)\(([^)]+)\)$/,function(e,t,a){r=t,o=[],a.replace(/[^,\s]+/g,function(e){o.push(e)})}));var D=e.lang.common,S=e.lang.link;return{title:S.title,minWidth:350,minHeight:230,contents:[{id:"info",label:S.info,title:S.info,elements:[{id:"linkType",type:"select",label:S.type,"default":"url",items:[[S.toUrl,"url"],[S.toAnchor,"anchor"],[S.toEmail,"email"]],onChange:function(){var t=this.getDialog(),a=["urlOptions","anchorOptions","emailOptions"],n=this.getValue(),i=t.definition.getContents("upload"),i=i&&i.hidden;for("url"==n?(e.config.linkShowTargetTab&&t.showPage("target"),i||t.showPage("upload")):(t.hidePage("target"),i||t.hidePage("upload")),i=0;i<a.length;i++){var o=t.getContentElement("info",a[i]);o&&(o=o.getElement().getParent().getParent(),a[i]==n+"Options"?o.show():o.hide())}t.layout()},setup:function(e){e.type&&this.setValue(e.type)},commit:function(e){e.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:D.protocol,"default":"http://",items:[["http://‎","http://"],["https://‎","https://"],["ftp://‎","ftp://"],["news://‎","news://"],[S.other,""]],setup:function(e){e.url&&this.setValue(e.url.protocol||"")},commit:function(e){e.url||(e.url={}),e.url.protocol=this.getValue()}},{type:"text",id:"url",label:D.url,required:!0,onLoad:function(){this.allowOnChange=!0},onKeyUp:function(){this.allowOnChange=!1;var e=this.getDialog().getContentElement("info","protocol"),t=this.getValue(),a=/^((javascript:)|[#\/\.\?])/i,n=/^(http|https|ftp|news):\/\/(?=.)/i.exec(t);n?(this.setValue(t.substr(n[0].length)),e.setValue(n[0].toLowerCase())):a.test(t)&&e.setValue(""),this.allowOnChange=!0},onChange:function(){this.allowOnChange&&this.onKeyUp()},validate:function(){var e=this.getDialog();return e.getContentElement("info","linkType")&&"url"!=e.getValueOf("info","linkType")?!0:/javascript\:/.test(this.getValue())?(alert(D.invalidValue),!1):this.getDialog().fakeObj?!0:CKEDITOR.dialog.validate.notEmpty(S.noUrl).apply(this)},setup:function(e){this.allowOnChange=!1,e.url&&this.setValue(e.url.url),this.allowOnChange=!0},commit:function(e){this.onChange(),e.url||(e.url={}),e.url.url=this.getValue(),this.allowOnChange=!1}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().show()}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:D.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:S.selectAnchor,setup:function(e){e.anchors.length>0?this.getElement().show():this.getElement().hide()},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:S.anchorName,style:"width: 100%;",items:[[""]],setup:function(e){this.clear(),this.add("");for(var t=0;t<e.anchors.length;t++)e.anchors[t].name&&this.add(e.anchors[t].name);e.anchor&&this.setValue(e.anchor.name),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.focus()},commit:function(e){e.anchor||(e.anchor={}),e.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:S.anchorId,style:"width: 100%;",items:[[""]],setup:function(e){this.clear(),this.add("");for(var t=0;t<e.anchors.length;t++)e.anchors[t].id&&this.add(e.anchors[t].id);e.anchor&&this.setValue(e.anchor.id)},commit:function(e){e.anchor||(e.anchor={}),e.anchor.id=this.getValue()}}],setup:function(e){e.anchors.length>0?this.getElement().show():this.getElement().hide()}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="note" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(S.noAnchors)+"</div>",focus:!0,setup:function(e){e.anchors.length<1?this.getElement().show():this.getElement().hide()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:S.emailAddress,required:!0,validate:function(){var e=this.getDialog();return e.getContentElement("info","linkType")&&"email"==e.getValueOf("info","linkType")?CKEDITOR.dialog.validate.notEmpty(S.noEmail).apply(this):!0},setup:function(e){e.email&&this.setValue(e.email.address),(e=this.getDialog().getContentElement("info","linkType"))&&"email"==e.getValue()&&this.select()},commit:function(e){e.email||(e.email={}),e.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:S.emailSubject,setup:function(e){e.email&&this.setValue(e.email.subject)},commit:function(e){e.email||(e.email={}),e.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:S.emailBody,rows:3,"default":"",setup:function(e){e.email&&this.setValue(e.email.body)},commit:function(e){e.email||(e.email={}),e.email.body=this.getValue()}}],setup:function(){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}}]},{id:"target",requiredContent:"a[target]",label:S.target,title:S.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:D.target,"default":"notSet",style:"width : 100%;",items:[[D.notSet,"notSet"],[S.targetFrame,"frame"],[S.targetPopup,"popup"],[D.targetNew,"_blank"],[D.targetTop,"_top"],[D.targetSelf,"_self"],[D.targetParent,"_parent"]],onChange:s,setup:function(e){e.target&&this.setValue(e.target.type||"notSet"),s.call(this)},commit:function(e){e.target||(e.target={}),e.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:S.targetFrameName,"default":"",setup:function(e){e.target&&this.setValue(e.target.name)},commit:function(e){e.target||(e.target={}),e.target.name=this.getValue().replace(/\W/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:S.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:S.popupResizable,setup:C,commit:k},{type:"checkbox",id:"status",label:S.popupStatusBar,setup:C,commit:k}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:S.popupLocationBar,setup:C,commit:k},{type:"checkbox",id:"toolbar",label:S.popupToolbar,setup:C,commit:k}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:S.popupMenuBar,setup:C,commit:k},{type:"checkbox",id:"fullscreen",label:S.popupFullScreen,setup:C,commit:k}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:S.popupScrollBars,setup:C,commit:k},{type:"checkbox",id:"dependent",label:S.popupDependent,setup:C,commit:k}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:D.width,id:"width",setup:C,commit:k},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:S.popupLeft,id:"left",setup:C,commit:k}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:D.height,id:"height",setup:C,commit:k},{type:"text",labelLayout:"horizontal",label:S.popupTop,widths:["50%","50%"],id:"top",setup:C,commit:k}]}]}]}]},{id:"upload",label:S.upload,title:S.upload,hidden:!0,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:D.upload,style:"height:40px",size:29},{type:"fileButton",id:"uploadButton",label:D.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:S.advanced,title:S.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",requiredContent:"a[id]",label:S.id,setup:y,commit:I},{type:"select",id:"advLangDir",requiredContent:"a[dir]",label:S.langDir,"default":"",style:"width:110px",items:[[D.notSet,""],[S.langDirLTR,"ltr"],[S.langDirRTL,"rtl"]],setup:y,commit:I},{type:"text",id:"advAccessKey",requiredContent:"a[accesskey]",width:"80px",label:S.acccessKey,maxLength:1,setup:y,commit:I}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:S.name,id:"advName",requiredContent:"a[name]",setup:y,commit:I},{type:"text",label:S.langCode,id:"advLangCode",requiredContent:"a[lang]",width:"110px","default":"",setup:y,commit:I},{type:"text",label:S.tabIndex,id:"advTabIndex",requiredContent:"a[tabindex]",width:"80px",maxLength:5,setup:y,commit:I}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:S.advisoryTitle,requiredContent:"a[title]","default":"",id:"advTitle",setup:y,commit:I},{type:"text",label:S.advisoryContentType,requiredContent:"a[type]","default":"",id:"advContentType",setup:y,commit:I}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:S.cssClasses,requiredContent:"a(cke-xyz)","default":"",id:"advCSSClasses",setup:y,commit:I},{type:"text",label:S.charset,requiredContent:"a[charset]","default":"",id:"advCharset",setup:y,commit:I}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:S.rel,requiredContent:"a[rel]","default":"",id:"advRel",setup:y,commit:I},{type:"text",label:S.styles,requiredContent:"a{cke-xyz}","default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(e.lang.common.invalidInlineStyle),setup:y,commit:I}]}]}]}],onShow:function(){var e=this.getParentEditor(),t=e.getSelection(),a=null;(a=l.getSelectedLink(e))&&a.hasAttribute("href")?t.getSelectedElement()||t.selectElement(a):a=null,this.setupContent(E.apply(this,[e,a]))},onOk:function(){var e={},i=[],o={},r=this.getParentEditor();switch(this.commitContent(o),o.type||"url"){case"url":var l=o.url&&void 0!=o.url.protocol?o.url.protocol:"http://",s=o.url&&CKEDITOR.tools.trim(o.url.url)||"";e["data-cke-saved-href"]=0===s.indexOf("/")?s:l+s;break;case"anchor":l=o.anchor&&o.anchor.id,e["data-cke-saved-href"]="#"+(o.anchor&&o.anchor.name||l||"");break;case"email":var d=o.email,l=d.address;switch(R){case"":case"encode":var s=encodeURIComponent(d.subject||""),c=encodeURIComponent(d.body||""),d=[];s&&d.push("subject="+s),c&&d.push("body="+c),d=d.length?"?"+d.join("&"):"","encode"==R?(l=["javascript:void(location.href='mailto:'+",n(l)],d&&l.push("+'",t(d),"'"),l.push(")")):l=["mailto:",l,d];break;default:l=l.split("@",2),d.name=l[0],d.domain=l[1],l=["javascript:",a(d)]}e["data-cke-saved-href"]=l.join("")}if(o.target)if("popup"==o.target.type){for(var l=["window.open(this.href, '",o.target.name||"","', '"],u=["resizable","status","location","toolbar","menubar","fullscreen","scrollbars","dependent"],s=u.length,d=function(e){o.target[e]&&u.push(e+"="+o.target[e])},c=0;s>c;c++)u[c]=u[c]+(o.target[u[c]]?"=yes":"=no");d("width"),d("left"),d("height"),d("top"),l.push(u.join(","),"'); return false;"),e["data-cke-pa-onclick"]=l.join(""),i.push("target")}else"notSet"!=o.target.type&&o.target.name?e.target=o.target.name:i.push("target"),i.push("data-cke-pa-onclick","onclick");o.adv&&(l=function(t,a){var n=o.adv[t];n?e[a]=n:i.push(a)},l("advId","id"),l("advLangDir","dir"),l("advAccessKey","accessKey"),o.adv.advName?e.name=e["data-cke-saved-name"]=o.adv.advName:i=i.concat(["data-cke-saved-name","name"]),l("advLangCode","lang"),l("advTabIndex","tabindex"),l("advTitle","title"),l("advContentType","type"),l("advCSSClasses","class"),l("advCharset","charset"),l("advStyles","style"),l("advRel","rel")),l=r.getSelection(),e.href=e["data-cke-saved-href"],this._.selectedElement?(r=this._.selectedElement,s=r.data("cke-saved-href"),d=r.getHtml(),r.setAttributes(e),r.removeAttributes(i),o.adv&&o.adv.advName&&CKEDITOR.plugins.link.synAnchorSelector&&r.addClass(r.getChildCount()?"cke_anchor":"cke_anchor_empty"),(s==d||"email"==o.type&&-1!=d.indexOf("@"))&&(r.setHtml("email"==o.type?o.email.address:e["data-cke-saved-href"]),l.selectElement(r)),delete this._.selectedElement):(l=l.getRanges()[0],l.collapsed&&(r=new CKEDITOR.dom.text("email"==o.type?o.email.address:e["data-cke-saved-href"],r.document),l.insertNode(r),l.selectNodeContents(r)),r=new CKEDITOR.style({element:"a",attributes:e}),r.type=CKEDITOR.STYLE_INLINE,r.applyToRange(l),l.select())},onLoad:function(){e.config.linkShowAdvancedTab||this.hidePage("advanced"),e.config.linkShowTargetTab||this.hidePage("target")},onFocus:function(){var e=this.getContentElement("info","linkType");e&&"url"==e.getValue()&&(e=this.getContentElement("info","url"),e.select())}}});