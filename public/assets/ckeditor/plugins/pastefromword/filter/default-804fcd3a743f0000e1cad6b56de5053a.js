/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){function e(e){for(var e=e.toUpperCase(),t=s.length,a=0,n=0;t>n;++n)for(var i=s[n],o=i[1].length;e.substr(0,o)==i[1];e=e.substr(o))a+=i[0];return a}function t(e){for(var e=e.toUpperCase(),t=d.length,a=1,n=1;0<e.length;n*=t)a+=d.indexOf(e.charAt(e.length-1))*n,e=e.substr(0,e.length-1);return a}var a=CKEDITOR.htmlParser.fragment.prototype,n=CKEDITOR.htmlParser.element.prototype;a.onlyChild=n.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},n.removeAnyChildWithName=function(e){for(var t,a=this.children,n=[],i=0;i<a.length;i++)t=a[i],t.name&&(t.name==e&&(n.push(t),a.splice(i--,1)),n=n.concat(t.removeAnyChildWithName(e)));return n},n.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},a.firstChild=n.firstChild=function(e){for(var t,a=0;a<this.children.length;a++)if(t=this.children[a],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},n.addStyle=function(e,t,a){var n="";if("string"==typeof t)n+=e+":"+t+";";else{if("object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(n+=i+":"+e[i]+";");else n+=e;a=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(a?[n,e]:[e,n]).join(";"),this.attributes.style=e.replace(/^;|;(?=;)/,"")},n.getStyle=function(e){var t=this.attributes.style;return t?(t=CKEDITOR.tools.parseCssText(t,1),t[e]):void 0},CKEDITOR.dtd.parentOf=function(e){var t,a={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(a[t]=1);return a};var i,o=/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,r=/^(?:\b0[^\s]*\s*){1,4}$/,l={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},s=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],d="ABCDEFGHIJKLMNOPQRSTUVWXYZ",c=0,u=null,p=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var a=new CKEDITOR.htmlParser.element("cke:listbullet");return a.attributes={"cke:listsymbol":e[0]},a.add(new CKEDITOR.htmlParser.text(t)),a},isListBulletIndicator:function(e){return/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style)?!0:void 0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,a=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",a.style&&(a.style=p.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!c&&null!==u&&e>u&&(c=e-u),u=e,a["cke:indent"]=c&&Math.ceil(e/c)+1||1}],[/^mso-list$/,null,function(e){var e=e.split(" "),t=Number(e[0].match(/\d+/)),e=Number(e[1].match(/\d+/));1==e&&(t!==i&&(a["cke:reset"]=1),i=t),a["cke:indent"]=e}]])(a.style,e)||""),a["cke:indent"]||(u=0,a["cke:indent"]=1),CKEDITOR.tools.extend(a,t.attributes),!0):(i=u=c=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,a,n){e.setStyle(t,a);for(var t={},a=n.length,i=0;a>i;i++)t[n[i]]=e.getStyle(n[i]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){var a,t="number"==typeof t?t:1,n=e.attributes;switch(n.type){case"a":a="lower-alpha";break;case"1":a="decimal"}for(var r,l=e.children,s=0;s<l.length;s++)if(r=l[s],r.name in CKEDITOR.dtd.$listItem){var d=r.attributes,c=r.children,m=c[c.length-1];m.name in CKEDITOR.dtd.$list&&(e.add(m,s+1),--c.length||l.splice(s--,1)),r.name="cke:li",n.start&&!s&&(d.value=n.start),p.filters.stylesFilter([["tab-stops",null,function(e){(e=e.split(" ")[1].match(o))&&(u=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==i&&(d["cke:reset"]=1),i=e}]:null])(d.style),d["cke:indent"]=t,d["cke:listtype"]=e.name,d["cke:list-style-type"]=a}else if(r.name in CKEDITOR.dtd.$list){for(arguments.callee.apply(this,[r,t+1]),l=l.slice(0,s).concat(r.children).concat(l.slice(s+1)),e.children=[],r=0,c=l.length;c>r;r++)e.add(l[r]);l=e.children}delete e.name,n["cke:list"]=1},assembleList:function(a){for(var n,o,r,s,d,p,m,h,g,f,b,v,T=a.children,a=[],E=0;E<T.length;E++)if(n=T[E],"cke:li"==n.name)if(n.name="li",o=n.attributes,g=(g=o["cke:listsymbol"])&&g.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),f=b=v=null,o["cke:ignored"])T.splice(E--,1);else{if(o["cke:reset"]&&(p=s=d=null),r=Number(o["cke:indent"]),r!=s&&(h=m=null),g){if(h&&l[h][m].test(g[1]))f=h,b=m;else for(var C in l)for(var y in l[C])if(l[C][y].test(g[1])){if("ol"!=C||!/alpha|roman/.test(y)){f=C,b=y;break}m=/roman/.test(y)?e(g[1]):t(g[1]),(!v||v>m)&&(v=m,f=C,b=y)}!f&&(f=g[2]?"ol":"ul")}else f=o["cke:listtype"]||"ol",b=o["cke:list-style-type"];if(h=f,m=b||("ol"==f?"decimal":"disc"),b&&b!=("ol"==f?"decimal":"disc")&&n.addStyle("list-style-type",b),"ol"==f&&g){switch(b){case"decimal":v=Number(g[1]);break;case"lower-roman":case"upper-roman":v=e(g[1]);break;case"lower-alpha":case"upper-alpha":v=t(g[1])}n.attributes.value=v}if(p){if(r>s)a.push(p=new CKEDITOR.htmlParser.element(f)),p.add(n),d.add(p);else{if(s>r){s-=r;for(var k;s--&&(k=p.parent);)p=k.parent}p.add(n)}T.splice(E--,1)}else a.push(p=new CKEDITOR.htmlParser.element(f)),p.add(n),T[E]=p;d=n,s=r}else p&&(p=s=d=null);for(E=0;E<a.length;E++)if(p=a[E],C=p.children,m=m=void 0,y=p.children.length,k=m=void 0,T=/list-style-type:(.*?)(?:;|$)/,s=CKEDITOR.plugins.pastefromword.filters.stylesFilter,m=p.attributes,!T.exec(m.style)){for(d=0;y>d;d++)if(m=C[d],m.attributes.value&&Number(m.attributes.value)==d+1&&delete m.attributes.value,m=T.exec(m.attributes.style)){if(m[1]!=k&&k){k=null;break}k=m[1]}if(k){for(d=0;y>d;d++)m=C[d].attributes,m.style&&(m.style=s([["list-style-type"]])(m.style)||"");p.addStyle("list-style-type",k)}}i=u=c=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(a,n){var i=[];(a||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,o,r){o=o.toLowerCase(),"font-family"==o&&(r=r.replace(/["']/g,""));for(var l,s,d,c=0;c<e.length;c++)if(e[c]&&(a=e[c][0],l=e[c][1],s=e[c][2],d=e[c][3],o.match(a)&&(!l||r.match(l))))return o=d||o,t&&(s=s||r),"function"==typeof s&&(s=s(r,n,o)),s&&s.push&&(o=s[0],s=s[1]),"string"==typeof s&&i.push([o,s]),void 0;!t&&i.push([o,r])});for(var o=0;o<i.length;o++)i[o]=i[o].join(":");return i.length?i.join(";")+";":!1}},elementMigrateFilter:function(e,t){return e?function(a){var n=t?new CKEDITOR.style(e,t)._.definition:e;a.name=n.element,CKEDITOR.tools.extend(a.attributes,CKEDITOR.tools.clone(n.attributes)),a.addStyle(CKEDITOR.style.getStyleText(n))}:function(){}},styleMigrateFilter:function(e,t){var a=this.elementMigrateFilter;return e?function(n,i){var o=new CKEDITOR.htmlParser.element(null),r={};r[t]=n,a(e,r)(o),o.children=i.children,i.children=[o],o.filter=function(){},o.parent=i}:function(){}},bogusAttrFilter:function(e,t){return-1==t.name.indexOf("cke:")?!1:void 0},applyStyleFilter:null},getRules:function(e,t){var a=CKEDITOR.dtd,n=CKEDITOR.tools.extend({},a.$block,a.$listItem,a.$tableContent),i=e.config,o=this.filters,l=o.falsyFilter,s=o.stylesFilter,d=o.elementMigrateFilter,c=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),u=this.utils.createListBulletMarker,p=o.flattenList,m=o.assembleList,h=this.utils.isListBulletIndicator,g=this.utils.isContainingOnlySpaces,f=this.utils.resolveList,b=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},v=this.utils.getStyleComponents,T=this.utils.listDtdParents,E=!1!==i.pasteFromWordRemoveFontStyles,C=!1!==i.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),m(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=o.applyStyleFilter)&&t(e)},$:function(e){var o=e.name||"",r=e.attributes;if(o in n&&r.style&&(r.style=s([[/^(:?width|height)$/,null,b]])(r.style)||""),o.match(/h\d/)){if(e.filterChildren(t),f(e))return;d(i["format_"+o])(e)}else if(o in a.$inline)e.filterChildren(t),g(e)&&delete e.name;else if(-1!=o.indexOf(":")&&-1==o.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==o)return(o=e.attributes["o:href"])&&(e.attributes.src=o),e.name="img",void 0;delete e.name}o in T&&(e.filterChildren(t),m(e))},style:function(e){if(CKEDITOR.env.gecko){var e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1],t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,a,n){for(var a=a.split(","),e=a.length,i=0;e>i;i++)CKEDITOR.tools.trim(a[i]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,a,i){a=a||"*",i=i.substring(1,i.length),i.match(/MsoNormal/)||(t[a]||(t[a]={}),i?t[a][i]=n:t[a]=n)})}),o.applyStyleFilter=function(e){var a=t["*"]?"*":e.name,n=e.attributes&&e.attributes["class"];a in t&&(a=t[a],"object"==typeof a&&(a=a[n]),a&&e.addStyle(a,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes["class"])||e.getStyle("mso-list")){var a=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!g(e.parent)});(a=a&&a.parent)&&a.addStyle("mso-list","Ignore")}e.filterChildren(t),f(e)||(i.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):d(i["format_"+(i.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var a=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,a),a.style&&t.addStyle(a.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:p,ul:p,dl:p,font:function(e){if(h(e.parent))delete e.name;else{e.filterChildren(t);var a=e.attributes,n=a.style,i=e.parent;"font"==i.name?(CKEDITOR.tools.extend(i.attributes,e.attributes),n&&i.addStyle(n),delete e.name):(n=n||"",a.color&&("#000000"!=a.color&&(n+="color:"+a.color+";"),delete a.color),a.face&&(n+="font-family:"+a.face+";",delete a.face),a.size&&(n+="font-size:"+(3<a.size?"large":3>a.size?"small":"medium")+";",delete a.size),e.name="span",e.addStyle(n))}},span:function(e){if(h(e.parent))return!1;if(e.filterChildren(t),g(e))return delete e.name,null;if(h(e)){var a=e.firstChild(function(e){return e.value||"img"==e.name}),n=(a=a&&(a.value||"l."))&&a.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(n)return a=u(n,a),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(a.attributes["cke:ignored"]=1),a}return(n=(a=e.attributes)&&a.style)&&(a.style=s([["line-height"],[/^font-family$/,null,E?null:c(i.font_style,"family")],[/^font-size$/,null,E?null:c(i.fontSize_style,"size")],[/^color$/,null,E?null:c(i.colorButton_foreStyle,"color")],[/^background-color$/,null,E?null:c(i.colorButton_backStyle,"color")]])(n,e)||""),a.style||delete a.style,CKEDITOR.tools.isEmpty(a)&&delete e.name,null},b:d(i.coreStyles_bold),i:d(i.coreStyles_italic),u:d(i.coreStyles_underline),s:d(i.coreStyles_strike),sup:d(i.coreStyles_superscript),sub:d(i.coreStyles_subscript),a:function(e){e=e.attributes,e.href&&e.href.match(/^file:\/\/\/[\S]+#/i)&&(e.href=e.href.replace(/^file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!i.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:s(C?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,a){if(t.name in{p:1,div:1}){if(t="ltr"==i.contentsLangDirection?"margin-left":"margin-right","margin"==a)e=v(a,e,[t])[t];else if(a!=t)return null;if(e&&!r.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){return"img"==t.name?e:void 0}],[/^width|height$/,null,function(e,t){return t.name in{table:1,td:1,th:1,img:1}?e:void 0}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"==e?!1:CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0}],[/^margin$/,r],["text-indent","0cm"],["page-break-before"],["tab-stops"],["display","none"],E?[/font-?/]:null],C),width:function(e,t){return t.name in a.$tableContent?!1:void 0},border:function(e,t){return t.name in a.$tableContent?!1:void 0},"class":l,bgcolor:l,valign:C?l:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?l:function(e,t){var a=e.match(/<img.*?>/),n=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return n?(n=(a=n[1]||a&&"l.")&&a.match(/>(?:[(]?)([^\s]+?)([.)]?)</),u(n,a)):CKEDITOR.env.gecko&&a?(a=CKEDITOR.htmlParser.fragment.fromHtml(a[0]).children[0],(n=(n=(n=t.previous)&&n.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&n[1])&&(a.attributes.src=n),a):!1}}}},m=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};m.prototype={toHtml:function(e){var e=CKEDITOR.htmlParser.fragment.fromHtml(e),t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){CKEDITOR.env.gecko&&(e=e.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,"$1<span>$2</span>$3"));var a=new m,n=a.dataFilter;n.addRules(CKEDITOR.plugins.pastefromword.getRules(t,n)),t.fire("beforeCleanWord",{filter:n});try{e=a.toHtml(e)}catch(i){alert(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();