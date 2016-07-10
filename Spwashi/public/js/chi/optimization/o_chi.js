/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
    return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
    void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map;
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.0.2
 */

(function(){"use strict";function lib$es6$promise$utils$$objectOrFunction(x){return typeof x==="function"||typeof x==="object"&&x!==null}function lib$es6$promise$utils$$isFunction(x){return typeof x==="function"}function lib$es6$promise$utils$$isMaybeThenable(x){return typeof x==="object"&&x!==null}var lib$es6$promise$utils$$_isArray;if(!Array.isArray){lib$es6$promise$utils$$_isArray=function(x){return Object.prototype.toString.call(x)==="[object Array]"}}else{lib$es6$promise$utils$$_isArray=Array.isArray}var lib$es6$promise$utils$$isArray=lib$es6$promise$utils$$_isArray;var lib$es6$promise$asap$$len=0;var lib$es6$promise$asap$$toString={}.toString;var lib$es6$promise$asap$$vertxNext;var lib$es6$promise$asap$$customSchedulerFn;var lib$es6$promise$asap$$asap=function asap(callback,arg){lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len]=callback;lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len+1]=arg;lib$es6$promise$asap$$len+=2;if(lib$es6$promise$asap$$len===2){if(lib$es6$promise$asap$$customSchedulerFn){lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush)}else{lib$es6$promise$asap$$scheduleFlush()}}};function lib$es6$promise$asap$$setScheduler(scheduleFn){lib$es6$promise$asap$$customSchedulerFn=scheduleFn}function lib$es6$promise$asap$$setAsap(asapFn){lib$es6$promise$asap$$asap=asapFn}var lib$es6$promise$asap$$browserWindow=typeof window!=="undefined"?window:undefined;var lib$es6$promise$asap$$browserGlobal=lib$es6$promise$asap$$browserWindow||{};var lib$es6$promise$asap$$BrowserMutationObserver=lib$es6$promise$asap$$browserGlobal.MutationObserver||lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;var lib$es6$promise$asap$$isNode=typeof process!=="undefined"&&{}.toString.call(process)==="[object process]";var lib$es6$promise$asap$$isWorker=typeof Uint8ClampedArray!=="undefined"&&typeof importScripts!=="undefined"&&typeof MessageChannel!=="undefined";function lib$es6$promise$asap$$useNextTick(){return function(){process.nextTick(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useVertxTimer(){return function(){lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useMutationObserver(){var iterations=0;var observer=new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2}}function lib$es6$promise$asap$$useMessageChannel(){var channel=new MessageChannel;channel.port1.onmessage=lib$es6$promise$asap$$flush;return function(){channel.port2.postMessage(0)}}function lib$es6$promise$asap$$useSetTimeout(){return function(){setTimeout(lib$es6$promise$asap$$flush,1)}}var lib$es6$promise$asap$$queue=new Array(1e3);function lib$es6$promise$asap$$flush(){for(var i=0;i<lib$es6$promise$asap$$len;i+=2){var callback=lib$es6$promise$asap$$queue[i];var arg=lib$es6$promise$asap$$queue[i+1];callback(arg);lib$es6$promise$asap$$queue[i]=undefined;lib$es6$promise$asap$$queue[i+1]=undefined}lib$es6$promise$asap$$len=0}function lib$es6$promise$asap$$attemptVertx(){try{var r=require;var vertx=r("vertx");lib$es6$promise$asap$$vertxNext=vertx.runOnLoop||vertx.runOnContext;return lib$es6$promise$asap$$useVertxTimer()}catch(e){return lib$es6$promise$asap$$useSetTimeout()}}var lib$es6$promise$asap$$scheduleFlush;if(lib$es6$promise$asap$$isNode){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useNextTick()}else if(lib$es6$promise$asap$$BrowserMutationObserver){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useMutationObserver()}else if(lib$es6$promise$asap$$isWorker){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useMessageChannel()}else if(lib$es6$promise$asap$$browserWindow===undefined&&typeof require==="function"){lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$attemptVertx()}else{lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$useSetTimeout()}function lib$es6$promise$$internal$$noop(){}var lib$es6$promise$$internal$$PENDING=void 0;var lib$es6$promise$$internal$$FULFILLED=1;var lib$es6$promise$$internal$$REJECTED=2;var lib$es6$promise$$internal$$GET_THEN_ERROR=new lib$es6$promise$$internal$$ErrorObject;function lib$es6$promise$$internal$$selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function lib$es6$promise$$internal$$cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function lib$es6$promise$$internal$$getThen(promise){try{return promise.then}catch(error){lib$es6$promise$$internal$$GET_THEN_ERROR.error=error;return lib$es6$promise$$internal$$GET_THEN_ERROR}}function lib$es6$promise$$internal$$tryThen(then,value,fulfillmentHandler,rejectionHandler){try{then.call(value,fulfillmentHandler,rejectionHandler)}catch(e){return e}}function lib$es6$promise$$internal$$handleForeignThenable(promise,thenable,then){lib$es6$promise$asap$$asap(function(promise){var sealed=false;var error=lib$es6$promise$$internal$$tryThen(then,thenable,function(value){if(sealed){return}sealed=true;if(thenable!==value){lib$es6$promise$$internal$$resolve(promise,value)}else{lib$es6$promise$$internal$$fulfill(promise,value)}},function(reason){if(sealed){return}sealed=true;lib$es6$promise$$internal$$reject(promise,reason)},"Settle: "+(promise._label||" unknown promise"));if(!sealed&&error){sealed=true;lib$es6$promise$$internal$$reject(promise,error)}},promise)}function lib$es6$promise$$internal$$handleOwnThenable(promise,thenable){if(thenable._state===lib$es6$promise$$internal$$FULFILLED){lib$es6$promise$$internal$$fulfill(promise,thenable._result)}else if(thenable._state===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,thenable._result)}else{lib$es6$promise$$internal$$subscribe(thenable,undefined,function(value){lib$es6$promise$$internal$$resolve(promise,value)},function(reason){lib$es6$promise$$internal$$reject(promise,reason)})}}function lib$es6$promise$$internal$$handleMaybeThenable(promise,maybeThenable){if(maybeThenable.constructor===promise.constructor){lib$es6$promise$$internal$$handleOwnThenable(promise,maybeThenable)}else{var then=lib$es6$promise$$internal$$getThen(maybeThenable);if(then===lib$es6$promise$$internal$$GET_THEN_ERROR){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$GET_THEN_ERROR.error)}else if(then===undefined){lib$es6$promise$$internal$$fulfill(promise,maybeThenable)}else if(lib$es6$promise$utils$$isFunction(then)){lib$es6$promise$$internal$$handleForeignThenable(promise,maybeThenable,then)}else{lib$es6$promise$$internal$$fulfill(promise,maybeThenable)}}}function lib$es6$promise$$internal$$resolve(promise,value){if(promise===value){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$selfFulfillment())}else if(lib$es6$promise$utils$$objectOrFunction(value)){lib$es6$promise$$internal$$handleMaybeThenable(promise,value)}else{lib$es6$promise$$internal$$fulfill(promise,value)}}function lib$es6$promise$$internal$$publishRejection(promise){if(promise._onerror){promise._onerror(promise._result)}lib$es6$promise$$internal$$publish(promise)}function lib$es6$promise$$internal$$fulfill(promise,value){if(promise._state!==lib$es6$promise$$internal$$PENDING){return}promise._result=value;promise._state=lib$es6$promise$$internal$$FULFILLED;if(promise._subscribers.length!==0){lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,promise)}}function lib$es6$promise$$internal$$reject(promise,reason){if(promise._state!==lib$es6$promise$$internal$$PENDING){return}promise._state=lib$es6$promise$$internal$$REJECTED;promise._result=reason;lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection,promise)}function lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection){var subscribers=parent._subscribers;var length=subscribers.length;parent._onerror=null;subscribers[length]=child;subscribers[length+lib$es6$promise$$internal$$FULFILLED]=onFulfillment;subscribers[length+lib$es6$promise$$internal$$REJECTED]=onRejection;if(length===0&&parent._state){lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,parent)}}function lib$es6$promise$$internal$$publish(promise){var subscribers=promise._subscribers;var settled=promise._state;if(subscribers.length===0){return}var child,callback,detail=promise._result;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];if(child){lib$es6$promise$$internal$$invokeCallback(settled,child,callback,detail)}else{callback(detail)}}promise._subscribers.length=0}function lib$es6$promise$$internal$$ErrorObject(){this.error=null}var lib$es6$promise$$internal$$TRY_CATCH_ERROR=new lib$es6$promise$$internal$$ErrorObject;function lib$es6$promise$$internal$$tryCatch(callback,detail){try{return callback(detail)}catch(e){lib$es6$promise$$internal$$TRY_CATCH_ERROR.error=e;return lib$es6$promise$$internal$$TRY_CATCH_ERROR}}function lib$es6$promise$$internal$$invokeCallback(settled,promise,callback,detail){var hasCallback=lib$es6$promise$utils$$isFunction(callback),value,error,succeeded,failed;if(hasCallback){value=lib$es6$promise$$internal$$tryCatch(callback,detail);if(value===lib$es6$promise$$internal$$TRY_CATCH_ERROR){failed=true;error=value.error;value=null}else{succeeded=true}if(promise===value){lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$cannotReturnOwn());return}}else{value=detail;succeeded=true}if(promise._state!==lib$es6$promise$$internal$$PENDING){}else if(hasCallback&&succeeded){lib$es6$promise$$internal$$resolve(promise,value)}else if(failed){lib$es6$promise$$internal$$reject(promise,error)}else if(settled===lib$es6$promise$$internal$$FULFILLED){lib$es6$promise$$internal$$fulfill(promise,value)}else if(settled===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,value)}}function lib$es6$promise$$internal$$initializePromise(promise,resolver){try{resolver(function resolvePromise(value){lib$es6$promise$$internal$$resolve(promise,value)},function rejectPromise(reason){lib$es6$promise$$internal$$reject(promise,reason)})}catch(e){lib$es6$promise$$internal$$reject(promise,e)}}function lib$es6$promise$enumerator$$Enumerator(Constructor,input){var enumerator=this;enumerator._instanceConstructor=Constructor;enumerator.promise=new Constructor(lib$es6$promise$$internal$$noop);if(enumerator._validateInput(input)){enumerator._input=input;enumerator.length=input.length;enumerator._remaining=input.length;enumerator._init();if(enumerator.length===0){lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result)}else{enumerator.length=enumerator.length||0;enumerator._enumerate();if(enumerator._remaining===0){lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result)}}}else{lib$es6$promise$$internal$$reject(enumerator.promise,enumerator._validationError())}}lib$es6$promise$enumerator$$Enumerator.prototype._validateInput=function(input){return lib$es6$promise$utils$$isArray(input)};lib$es6$promise$enumerator$$Enumerator.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")};lib$es6$promise$enumerator$$Enumerator.prototype._init=function(){this._result=new Array(this.length)};var lib$es6$promise$enumerator$$default=lib$es6$promise$enumerator$$Enumerator;lib$es6$promise$enumerator$$Enumerator.prototype._enumerate=function(){var enumerator=this;var length=enumerator.length;var promise=enumerator.promise;var input=enumerator._input;for(var i=0;promise._state===lib$es6$promise$$internal$$PENDING&&i<length;i++){enumerator._eachEntry(input[i],i)}};lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry=function(entry,i){var enumerator=this;var c=enumerator._instanceConstructor;if(lib$es6$promise$utils$$isMaybeThenable(entry)){if(entry.constructor===c&&entry._state!==lib$es6$promise$$internal$$PENDING){entry._onerror=null;enumerator._settledAt(entry._state,i,entry._result)}else{enumerator._willSettleAt(c.resolve(entry),i)}}else{enumerator._remaining--;enumerator._result[i]=entry}};lib$es6$promise$enumerator$$Enumerator.prototype._settledAt=function(state,i,value){var enumerator=this;var promise=enumerator.promise;if(promise._state===lib$es6$promise$$internal$$PENDING){enumerator._remaining--;if(state===lib$es6$promise$$internal$$REJECTED){lib$es6$promise$$internal$$reject(promise,value)}else{enumerator._result[i]=value}}if(enumerator._remaining===0){lib$es6$promise$$internal$$fulfill(promise,enumerator._result)}};lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt=function(promise,i){var enumerator=this;lib$es6$promise$$internal$$subscribe(promise,undefined,function(value){enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED,i,value)},function(reason){enumerator._settledAt(lib$es6$promise$$internal$$REJECTED,i,reason)})};function lib$es6$promise$promise$all$$all(entries){return new lib$es6$promise$enumerator$$default(this,entries).promise}var lib$es6$promise$promise$all$$default=lib$es6$promise$promise$all$$all;function lib$es6$promise$promise$race$$race(entries){var Constructor=this;var promise=new Constructor(lib$es6$promise$$internal$$noop);if(!lib$es6$promise$utils$$isArray(entries)){lib$es6$promise$$internal$$reject(promise,new TypeError("You must pass an array to race."));return promise}var length=entries.length;function onFulfillment(value){lib$es6$promise$$internal$$resolve(promise,value)}function onRejection(reason){lib$es6$promise$$internal$$reject(promise,reason)}for(var i=0;promise._state===lib$es6$promise$$internal$$PENDING&&i<length;i++){lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]),undefined,onFulfillment,onRejection)}return promise}var lib$es6$promise$promise$race$$default=lib$es6$promise$promise$race$$race;function lib$es6$promise$promise$resolve$$resolve(object){var Constructor=this;if(object&&typeof object==="object"&&object.constructor===Constructor){return object}var promise=new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$resolve(promise,object);return promise}var lib$es6$promise$promise$resolve$$default=lib$es6$promise$promise$resolve$$resolve;function lib$es6$promise$promise$reject$$reject(reason){var Constructor=this;var promise=new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$reject(promise,reason);return promise}var lib$es6$promise$promise$reject$$default=lib$es6$promise$promise$reject$$reject;var lib$es6$promise$promise$$counter=0;function lib$es6$promise$promise$$needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function lib$es6$promise$promise$$needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var lib$es6$promise$promise$$default=lib$es6$promise$promise$$Promise;function lib$es6$promise$promise$$Promise(resolver){this._id=lib$es6$promise$promise$$counter++;this._state=undefined;this._result=undefined;this._subscribers=[];if(lib$es6$promise$$internal$$noop!==resolver){if(!lib$es6$promise$utils$$isFunction(resolver)){lib$es6$promise$promise$$needsResolver()}if(!(this instanceof lib$es6$promise$promise$$Promise)){lib$es6$promise$promise$$needsNew()}lib$es6$promise$$internal$$initializePromise(this,resolver)}}lib$es6$promise$promise$$Promise.all=lib$es6$promise$promise$all$$default;lib$es6$promise$promise$$Promise.race=lib$es6$promise$promise$race$$default;lib$es6$promise$promise$$Promise.resolve=lib$es6$promise$promise$resolve$$default;lib$es6$promise$promise$$Promise.reject=lib$es6$promise$promise$reject$$default;lib$es6$promise$promise$$Promise._setScheduler=lib$es6$promise$asap$$setScheduler;lib$es6$promise$promise$$Promise._setAsap=lib$es6$promise$asap$$setAsap;lib$es6$promise$promise$$Promise._asap=lib$es6$promise$asap$$asap;lib$es6$promise$promise$$Promise.prototype={constructor:lib$es6$promise$promise$$Promise,then:function(onFulfillment,onRejection){var parent=this;var state=parent._state;if(state===lib$es6$promise$$internal$$FULFILLED&&!onFulfillment||state===lib$es6$promise$$internal$$REJECTED&&!onRejection){return this}var child=new this.constructor(lib$es6$promise$$internal$$noop);var result=parent._result;if(state){var callback=arguments[state-1];lib$es6$promise$asap$$asap(function(){lib$es6$promise$$internal$$invokeCallback(state,child,callback,result)})}else{lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection)}return child},"catch":function(onRejection){return this.then(null,onRejection)}};function lib$es6$promise$polyfill$$polyfill(){var local;if(typeof global!=="undefined"){local=global}else if(typeof self!=="undefined"){local=self}else{try{local=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}}var P=local.Promise;if(P&&Object.prototype.toString.call(P.resolve())==="[object Promise]"&&!P.cast){return}local.Promise=lib$es6$promise$promise$$default}var lib$es6$promise$polyfill$$default=lib$es6$promise$polyfill$$polyfill;var lib$es6$promise$umd$$ES6Promise={Promise:lib$es6$promise$promise$$default,polyfill:lib$es6$promise$polyfill$$default};if(typeof define==="function"&&define["amd"]){define('Promise',[],function(){return lib$es6$promise$umd$$ES6Promise})}else if(typeof module!=="undefined"&&module["exports"]){module["exports"]=lib$es6$promise$umd$$ES6Promise}else if(typeof this!=="undefined"){this["ES6Promise"]=lib$es6$promise$umd$$ES6Promise}lib$es6$promise$polyfill$$default()}).call(this);
//Underscore.js 1.8.3//http://underscorejs.org//(c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors//Underscore may be freely distributed under the MIT license.
(function () {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }

        return function (r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r), a = (o || r).length, c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function (t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)if (r(t[i], i, t))return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function (e, u, i) {
            var o = 0, a = O(e);
            if ("number" == typeof i)n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1; else if (r && i && a)return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u)return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)if (e[i] === u)return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length, e = n.constructor, u = m.isFunction(e) && e.prototype || a, i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;)i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }

    var u = this, i = u._, o = Array.prototype, a = Object.prototype, c = Function.prototype, f = o.push, l = o.slice, s = a.toString, p = a.hasOwnProperty, h = Array.isArray, v = Object.keys, g = c.bind, y = Object.create, d = function () {}, m = function (n) {return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)};
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function (n, t, r) {
        if (t === void 0)return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function (r) {return n.call(t, r)};
            case 2:
                return function (r, e) {return n.call(t, r, e)};
            case 3:
                return function (r, e, u) {return n.call(t, r, e, u)};
            case 4:
                return function (r, e, u, i) {return n.call(t, r, e, u, i)}
        }
        return function () {return n.apply(t, arguments)}
    }, x = function (n, t, r) {return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)};
    m.iteratee = function (n, t) {return x(n, t, 1 / 0)};
    var _ = function (n, t) {
        return function (r) {
            var e = arguments.length;
            if (2 > e || null == r)return r;
            for (var u = 1; e > u; u++)for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                var f = o[c];
                t && r[f] !== void 0 || (r[f] = i[f])
            }
            return r
        }
    }, j = function (n) {
        if (!m.isObject(n))return {};
        if (y)return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null, t
    }, w = function (n) {return function (t) {return null == t ? void 0 : t[n]}}, A = Math.pow(2, 53) - 1, O = w("length"), k = function (n) {
        var t = O(n);
        return "number" == typeof t && t >= 0 && A >= t
    };
    m.each = m.forEach = function (n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))for (e = 0, u = n.length; u > e; e++)t(n[e], e, n); else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++)t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
    }, m.filter = m.select = function (n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function (n, r, u) {t(n, r, u) && e.push(n)}), e
    }, m.reject = function (n, t, r) {return m.filter(n, m.negate(x(t)), r)}, m.every = m.all = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n))return !1
        }
        return !0
    }, m.some = m.any = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n))return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function (n, t, r, e) {return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0}, m.invoke = function (n, t) {
        var r = l.call(arguments, 2), e = m.isFunction(t);
        return m.map(n, function (n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function (n, t) {return m.map(n, m.property(t))}, m.where = function (n, t) {return m.filter(n, m.matcher(t))}, m.findWhere = function (n, t) {return m.find(n, m.matcher(t))}, m.max = function (n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)});
        return i
    }, m.min = function (n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)});
        return i
    }, m.shuffle = function (n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function (n, t, r) {return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))}, m.sortBy = function (n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function (n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function (n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)return 1;
                if (e > r || e === void 0)return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function (e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function (n, t, r) {m.has(n, r) ? n[r].push(t) : n[r] = [t]}), m.indexBy = F(function (n, t, r) {n[r] = t}), m.countBy = F(function (n, t, r) {m.has(n, r) ? n[r]++ : n[r] = 1}), m.toArray = function (n) {return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []}, m.size = function (n) {return null == n ? 0 : k(n) ? n.length : m.keys(n).length}, m.partition = function (n, t, r) {
        t = x(t, r);
        var e = [], u = [];
        return m.each(n, function (n, r, i) {(t(n, r, i) ? e : u).push(n)}), [e, u]
    }, m.first = m.head = m.take = function (n, t, r) {return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)}, m.initial = function (n, t, r) {return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))}, m.last = function (n, t, r) {return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))}, m.rest = m.tail = m.drop = function (n, t, r) {return l.call(n, null == t || r ? 1 : t)}, m.compact = function (n) {return m.filter(n, m.identity)};
    var S = function (n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0, l = c.length;
                for (u.length += l; l > f;)u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function (n, t) {return S(n, t, !1)}, m.without = function (n) {return m.difference(n, l.call(arguments, 1))}, m.uniq = m.unique = function (n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o], f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function () {return m.uniq(S(arguments, !0, !0))}, m.intersection = function (n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function (n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function (n) {return !m.contains(t, n)})
    }, m.zip = function () {return m.unzip(arguments)}, m.unzip = function (n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)r[e] = m.pluck(n, e);
        return r
    }, m.object = function (n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++)t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r)u[i] = n;
        return u
    };
    var E = function (n, t, r, e, u) {
        if (!(e instanceof t))return n.apply(r, u);
        var i = j(n.prototype), o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function (n, t) {
        if (g && n.bind === g)return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2), e = function () {return E(n, e, t, this, r.concat(l.call(arguments)))};
        return e
    }, m.partial = function (n) {
        var t = l.call(arguments, 1), r = function () {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length;)i.push(arguments[e++]);
            return E(n, r, this, this, i)
        };
        return r
    }, m.bindAll = function (n) {
        var t, r, e = arguments.length;
        if (1 >= e)throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++)r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function (n, t) {
        var r = function (e) {
            var u = r.cache, i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function (n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function () {return n.apply(null, r)}, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) {
        var e, u, i, o = null, a = 0;
        r || (r = {});
        var c = function () {a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)};
        return function () {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function (n, t, r) {
        var e, u, i, o, a, c = function () {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function () {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function (n, t) {return m.partial(t, n)}, m.negate = function (n) {return function () {return !n.apply(this, arguments)}}, m.compose = function () {
        var n = arguments, t = n.length - 1;
        return function () {
            for (var r = t, e = n[t].apply(this, arguments); r--;)e = n[r].call(this, e);
            return e
        }
    }, m.after = function (n, t) {return function () {return --n < 1 ? t.apply(this, arguments) : void 0}}, m.before = function (n, t) {
        var r;
        return function () {return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r}
    }, m.once = m.partial(m.before, 2);
    var M = !{toString: null}.propertyIsEnumerable("toString"), I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function (n) {
        if (!m.isObject(n))return [];
        if (v)return v(n);
        var t = [];
        for (var r in n)m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function (n) {
        if (!m.isObject(n))return [];
        var t = [];
        for (var r in n)t.push(r);
        return M && e(n, t), t
    }, m.values = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)e[u] = n[t[u]];
        return e
    }, m.mapObject = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function (n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function (n) {
        var t = [];
        for (var r in n)m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)if (e = u[i], t(n[e], e, n))return e
    }, m.pick = function (n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o)return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) {return t in r}, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a], l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function (n, t, r) {
        if (m.isFunction(t))t = m.negate(t); else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function (n, t) {return !m.contains(e, t)}
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function (n) {return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n}, m.tap = function (n, t) {return t(n), n}, m.isMatch = function (n, t) {
        var r = m.keys(t), e = r.length;
        if (null == n)return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u))return !1
        }
        return !0
    };
    var N = function (n, t, r, e) {
        if (n === t)return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))return !1;
        switch (u) {
            case"[object RegExp]":
            case"[object String]":
                return "" + n == "" + t;
            case"[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)return !1;
            var o = n.constructor, a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor"in n && "constructor"in t)return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;)if (r[c] === n)return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length)return !1;
            for (; c--;)if (!N(n[c], t[c], r, e))return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c)return !1;
            for (; c--;)if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e))return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function (n, t) {return N(n, t)}, m.isEmpty = function (n) {return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length}, m.isElement = function (n) {return !(!n || 1 !== n.nodeType)}, m.isArray = h || function (n) {return "[object Array]" === s.call(n)}, m.isObject = function (n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {m["is" + n] = function (t) {return s.call(t) === "[object " + n + "]"}}), m.isArguments(arguments) || (m.isArguments = function (n) {return m.has(n, "callee")}), "function" != typeof/./ && "object" != typeof Int8Array && (m.isFunction = function (n) {return "function" == typeof n || !1}), m.isFinite = function (n) {return isFinite(n) && !isNaN(parseFloat(n))}, m.isNaN = function (n) {return m.isNumber(n) && n !== +n}, m.isBoolean = function (n) {return n === !0 || n === !1 || "[object Boolean]" === s.call(n)}, m.isNull = function (n) {return null === n}, m.isUndefined = function (n) {return n === void 0}, m.has = function (n, t) {return null != n && p.call(n, t)}, m.noConflict = function () {return u._ = i, this}, m.identity = function (n) {return n}, m.constant = function (n) {return function () {return n}}, m.noop = function () {}, m.property = w, m.propertyOf = function (n) {return null == n ? function () {} : function (t) {return n[t]}}, m.matcher = m.matches = function (n) {return n = m.extendOwn({}, n), function (t) {return m.isMatch(t, n)}}, m.times = function (n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++)e[u] = t(u);
        return e
    }, m.random = function (n, t) {return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))}, m.now = Date.now || function () {return (new Date).getTime()};
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, T = m.invert(B), R = function (n) {
        var t = function (t) {return n[t]}, r = "(?:" + m.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g");
        return function (n) {return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n}
    };
    m.escape = R(B), m.unescape = R(T), m.result = function (n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function (n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var K = /(.)^/, z = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, D = /\\|'|\r|\n|\u2028|\u2029/g, L = function (n) {return "\\" + z[n]};
    m.template = function (n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"), u = 0, i = "__p+='";
        n.replace(e, function (t, r, e, o, a) {return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t}), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {var o = new Function(t.variable || "obj", "_", i)} catch (a) {throw a.source = i, a}
        var c = function (n) {return o.call(this, n, m)}, f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function (n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function (n, t) {return n._chain ? m(t).chain() : t};
    m.mixin = function (n) {
        m.each(m.functions(n), function (t) {
            var r = m[t] = n[t];
            m.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {return P(this, t.apply(this._wrapped, arguments))}
    }), m.prototype.value = function () {return this._wrapped}, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {return "" + this._wrapped}, "function" == typeof define && define.amd && define("underscore", [], function () {return m})
}).call(this);
//# sourceMappingURL=underscore-min.map;
(function(t){var e=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;if(typeof define==="function"&&define.amd){define('backbone',["underscore","jquery","exports"],function(i,r,n){e.Backbone=t(e,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(n){}t(e,exports,i,r)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,r){var n=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.3.3";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var a=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,n){return i[e](this[r],o(t,this),n)};case 4:return function(t,n,s){return i[e](this[r],o(t,this),n,s)};default:return function(){var t=s.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var h=function(t,e,r){i.each(e,function(e,n){if(i[n])t.prototype[n]=a(e,n,r)})};var o=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return l(t);if(i.isString(t))return function(e){return e.get(t)};return t};var l=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var u=e.Events={};var c=/\s+/;var f=function(t,e,r,n,s){var a=0,h;if(r&&typeof r==="object"){if(n!==void 0&&"context"in s&&s.context===void 0)s.context=n;for(h=i.keys(r);a<h.length;a++){e=f(t,e,h[a],r[h[a]],s)}}else if(r&&c.test(r)){for(h=r.split(c);a<h.length;a++){e=t(e,h[a],n,s)}}else{e=t(e,r,n,s)}return e};u.on=function(t,e,i){return d(this,t,e,i)};var d=function(t,e,i,r,n){t._events=f(v,t._events||{},e,i,{context:r,ctx:t,listening:n});if(n){var s=t._listeners||(t._listeners={});s[n.id]=n}return t};u.listenTo=function(t,e,r){if(!t)return this;var n=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var a=s[n];if(!a){var h=this._listenId||(this._listenId=i.uniqueId("l"));a=s[n]={obj:t,objId:n,id:h,listeningTo:s,count:0}}d(t,e,r,this,a);return this};var v=function(t,e,i,r){if(i){var n=t[e]||(t[e]=[]);var s=r.context,a=r.ctx,h=r.listening;if(h)h.count++;n.push({callback:i,context:s,ctx:s||a,listening:h})}return t};u.off=function(t,e,i){if(!this._events)return this;this._events=f(g,this._events,t,e,{context:i,listeners:this._listeners});return this};u.stopListening=function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=t?[t._listenId]:i.keys(n);for(var a=0;a<s.length;a++){var h=n[s[a]];if(!h)break;h.obj.off(e,r,this)}return this};var g=function(t,e,r,n){if(!t)return;var s=0,a;var h=n.context,o=n.listeners;if(!e&&!r&&!h){var l=i.keys(o);for(;s<l.length;s++){a=o[l[s]];delete o[a.id];delete a.listeningTo[a.objId]}return}var u=e?[e]:i.keys(t);for(;s<u.length;s++){e=u[s];var c=t[e];if(!c)break;var f=[];for(var d=0;d<c.length;d++){var v=c[d];if(r&&r!==v.callback&&r!==v.callback._callback||h&&h!==v.context){f.push(v)}else{a=v.listening;if(a&&--a.count===0){delete o[a.id];delete a.listeningTo[a.objId]}}}if(f.length){t[e]=f}else{delete t[e]}}return t};u.once=function(t,e,r){var n=f(p,{},t,e,i.bind(this.off,this));if(typeof t==="string"&&r==null)e=void 0;return this.on(n,e,r)};u.listenToOnce=function(t,e,r){var n=f(p,{},e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,n)};var p=function(t,e,r,n){if(r){var s=t[e]=i.once(function(){n(e,s);r.apply(this,arguments)});s._callback=r}return t};u.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];f(m,this._events,t,void 0,i);return this};var m=function(t,e,i,r){if(t){var n=t[e];var s=t.all;if(n&&s)s=s.slice();if(n)_(n,r);if(s)_(s,[e].concat(r))}return t};var _=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,h);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};u.bind=u.on;u.unbind=u.off;i.extend(e,u);var y=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};var n=i.result(this,"defaults");r=i.defaults(i.extend({},n,r),n);this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(y.prototype,u,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){if(t==null)return this;var n;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;var s=r.unset;var a=r.silent;var h=[];var o=this._changing;this._changing=true;if(!o){this._previousAttributes=i.clone(this.attributes);this.changed={}}var l=this.attributes;var u=this.changed;var c=this._previousAttributes;for(var f in n){e=n[f];if(!i.isEqual(l[f],e))h.push(f);if(!i.isEqual(c[f],e)){u[f]=e}else{delete u[f]}s?delete l[f]:l[f]=e}if(this.idAttribute in n)this.id=this.get(this.idAttribute);if(!a){if(h.length)this._pending=r;for(var d=0;d<h.length;d++){this.trigger("change:"+h[d],this,l[h[d]],r)}}if(o)return this;if(!a){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var r={};for(var n in t){var s=t[n];if(i.isEqual(e[n],s))continue;r[n]=s}return i.size(r)?r:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=i.extend({parse:true},t);var e=this;var r=t.success;t.success=function(i){var n=t.parse?e.parse(i,t):i;if(!e.set(n,t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};B(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true,parse:true},r);var s=r.wait;if(n&&!s){if(!this.set(n,r))return false}else if(!this._validate(n,r)){return false}var a=this;var h=r.success;var o=this.attributes;r.success=function(t){a.attributes=o;var e=r.parse?a.parse(t,r):t;if(s)e=i.extend({},n,e);if(e&&!a.set(e,r))return false;if(h)h.call(r.context,a,t,r);a.trigger("sync",a,t,r)};B(this,r);if(n&&s)this.attributes=i.extend({},o,n);var l=this.isNew()?"create":r.patch?"patch":"update";if(l==="patch"&&!r.attrs)r.attrs=n;var u=this.sync(l,this,r);this.attributes=o;return u},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=t.wait;var s=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(n)s();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};var a=false;if(this.isNew()){i.defer(t.success)}else{B(this,t);a=this.sync("delete",this,t)}if(!n)s();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend({},t,{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var b={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};h(y,b,"attributes");var x=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var w={add:true,remove:true,merge:true};var E={add:true,remove:false};var I=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var r=Array(t.length-i);var n=e.length;var s;for(s=0;s<r.length;s++)r[s]=t[s+i];for(s=0;s<n;s++)t[s+i]=e[s];for(s=0;s<r.length;s++)t[s+n+i]=r[s]};i.extend(x.prototype,u,{model:y,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,E))},remove:function(t,e){e=i.extend({},e);var r=!i.isArray(t);t=r?[t]:t.slice();var n=this._removeModels(t,e);if(!e.silent&&n.length){e.changes={added:[],merged:[],removed:n};this.trigger("update",this,e)}return r?n[0]:n},set:function(t,e){if(t==null)return;e=i.extend({},w,e);if(e.parse&&!this._isModel(t)){t=this.parse(t,e)||[]}var r=!i.isArray(t);t=r?[t]:t.slice();var n=e.at;if(n!=null)n=+n;if(n>this.length)n=this.length;if(n<0)n+=this.length+1;var s=[];var a=[];var h=[];var o=[];var l={};var u=e.add;var c=e.merge;var f=e.remove;var d=false;var v=this.comparator&&n==null&&e.sort!==false;var g=i.isString(this.comparator)?this.comparator:null;var p,m;for(m=0;m<t.length;m++){p=t[m];var _=this.get(p);if(_){if(c&&p!==_){var y=this._isModel(p)?p.attributes:p;if(e.parse)y=_.parse(y,e);_.set(y,e);h.push(_);if(v&&!d)d=_.hasChanged(g)}if(!l[_.cid]){l[_.cid]=true;s.push(_)}t[m]=_}else if(u){p=t[m]=this._prepareModel(p,e);if(p){a.push(p);this._addReference(p,e);l[p.cid]=true;s.push(p)}}}if(f){for(m=0;m<this.length;m++){p=this.models[m];if(!l[p.cid])o.push(p)}if(o.length)this._removeModels(o,e)}var b=false;var x=!v&&u&&f;if(s.length&&x){b=this.length!==s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;I(this.models,s,0);this.length=this.models.length}else if(a.length){if(v)d=true;I(this.models,a,n==null?this.length:n);this.length=this.models.length}if(d)this.sort({silent:true});if(!e.silent){for(m=0;m<a.length;m++){if(n!=null)e.index=n+m;p=a[m];p.trigger("add",p,this,e)}if(d||b)this.trigger("sort",this,e);if(a.length||o.length||h.length){e.changes={added:a,removed:o,merged:h};this.trigger("update",this,e)}}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[this.modelId(t.attributes||t)]||t.cid&&this._byId[t.cid]},has:function(t){return this.get(t)!=null},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var r=e.length;if(i.isFunction(e))e=i.bind(e,this);if(r===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return this.map(t+"")},fetch:function(t){t=i.extend({parse:true},t);var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};B(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!r)this.add(t,e);var n=this;var s=e.success;e.success=function(t,e,i){if(r)n.add(t,i);if(s)s.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var r=0;r<t.length;r++){var n=this.get(t[r]);if(!n)continue;var s=this.indexOf(n);this.models.splice(s,1);this.length--;delete this._byId[n.cid];var a=this.modelId(n.attributes);if(a!=null)delete this._byId[a];if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}i.push(n);this._removeReference(n,e)}return i},_isModel:function(t){return t instanceof y},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if(e){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var n=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(n!==s){if(n!=null)delete this._byId[n];if(s!=null)this._byId[s]=e}}}this.trigger.apply(this,arguments)}});var S={forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3};h(x,S,"models");var k=e.View=function(t){this.cid=i.uniqueId("view");i.extend(this,i.pick(t,P));this._ensureElement();this.initialize.apply(this,arguments)};var T=/^(\S+)\s*(.*)$/;var P=["model","collection","el","id","attributes","className","tagName","events"];i.extend(k.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){t||(t=i.result(this,"events"));if(!t)return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[r];if(!r)continue;var n=e.match(T);this.delegate(n[1],n[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i);return this},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i);return this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,n){var s=H[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||F()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var h=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(h)return h.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var o=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(o)o.call(n.context,t,e,i)};var l=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,l,n);return l};var H={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var A=/\((.*?)\)/g;var C=/(\(\?)?:\w+/g;var R=/\*\w+/g;var j=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,n){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){n=r;r=""}if(!n)n=this[r];var s=this;e.history.route(t,function(i){var a=s._extractParameters(t,i);if(s.execute(n,a,r)!==false){s.trigger.apply(s,["route:"+r].concat(a));s.trigger("route",r,a);e.history.trigger("route",s,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(j,"\\$&").replace(A,"(?:$1)?").replace(C,function(t,e){return e?t:"([^/?]+)"}).replace(R,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];this.checkUrl=i.bind(this.checkUrl,this);if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var M=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(M,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe");this.iframe.src="javascript:0";this.iframe.style.display="none";this.iframe.tabIndex=-1;var r=document.body;var n=r.insertBefore(this.iframe,r.firstChild).contentWindow;n.document.open();n.document.close();n.location.hash="#"+this.fragment}var s=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){s("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){s("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe.contentWindow)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.some(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe.contentWindow)){var n=this.iframe.contentWindow;if(!e.replace){n.document.open();n.document.close()}this._updateHash(n.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var q=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);n.prototype=i.create(r.prototype,t);n.prototype.constructor=n;n.__super__=r.prototype;return n};y.extend=x.extend=$.extend=k.extend=N.extend=q;var F=function(){throw new Error('A "url" property or function must be specified')};var B=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map;
//     (c) 2012 Onsi Fakhouri
//     Cocktail.js may be freely distributed under the MIT license.
//     http://github.com/onsi/cocktail
(function (factory) {
    if (typeof require === 'function' && typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('underscore'));
    } else if (typeof define === 'function') {
        define('Cocktail',['underscore'], factory);
    } else {
        this.Cocktail = factory(_);
    }
}(function (_) {
    /**
     * @alias Cocktail
     */
    var Cocktail             = {};
    var stop_propagation_obj = {'boon': null};
    Cocktail.end_with        = function (value) {
        return [stop_propagation_obj, value];
    };
    Cocktail.mixins          = {};

    Cocktail.mixin = function mixin(klass) {
        var mixins = _.chain(arguments).toArray().slice(1).flatten().value();
        // Allows mixing into the constructor's prototype or the dynamic instance
        var obj = klass.prototype || klass;

        var collisions = {};

        _.each(mixins, function (mixin) {
            if (_.isString(mixin)) {
                mixin = Cocktail.mixins[mixin];
            }
            _.each(mixin, function (value, key) {
                if (_.isFunction(value)) {
                    // If the mixer already has that exact function reference
                    // Note: this would occur on an accidental mixin of the same base
                    if (obj[key] === value) return;

                    if (obj[key]) {
                        // Avoid accessing built-in properties like constructor (#39)
                        collisions[key] = collisions.hasOwnProperty(key) ? collisions[key] : [obj[key]];
                        collisions[key].push(value);
                    }
                    obj[key] = value;
                } else if (_.isArray(value)) {
                    obj[key] = _.union(value, obj[key] || []);
                } else if (_.isObject(value)) {
                    obj[key] = _.extend({}, value, obj[key] || {});
                } else if (!(key in obj)) {
                    obj[key] = value;
                }
            });
        });

        _.each(collisions, function (propertyValues, propertyName) {
            obj[propertyName] = function () {
                var that             = this,
                    args             = arguments,
                    returnValue      = void 0;
                var stop_propagating = false;
                _.each(propertyValues, function (value) {
                    if (stop_propagating) return;
                    var returnedValue = _.isFunction(value) ? value.apply(that, args) : value;
                    if (typeof returnedValue !== "undefined") {
                        if (typeof returnedValue === "object" && !!returnedValue[0] && !!returnedValue.splice && returnedValue[0] === stop_propagation_obj) {
                            returnValue      = typeof returnedValue[1] !== "undefined" ? returnedValue[1] : returnValue;
                            stop_propagating = true;
                        } else {
                            returnValue = returnedValue;
                        }
                    }
                });

                return returnValue;
            };
        });

        return klass;
    };

    var originalExtend;

    Cocktail.patch = function patch(Backbone) {
        originalExtend = Backbone.Model.extend;

        var extend = function (protoProps, classProps) {
            var klass = originalExtend.call(this, protoProps, classProps);

            var mixins = klass.prototype.mixins;
            if (mixins && klass.prototype.hasOwnProperty('mixins')) {
                Cocktail.mixin(klass, mixins);
            }

            return klass;
        };

        _.each([Backbone.Model, Backbone.Collection, Backbone.Router, Backbone.View], function (klass) {
            klass.mixin = function mixin() {
                Cocktail.mixin(this, _.toArray(arguments));
            };

            klass.extend = extend;
        });
    };

    Cocktail.unpatch = function unpatch(Backbone) {
        _.each([Backbone.Model, Backbone.Collection, Backbone.Router, Backbone.View], function (klass) {
            klass.mixin  = undefined;
            klass.extend = originalExtend;
        });
    };

    return Cocktail;
}));

/**
 * Created by Sam Washington on 12/19/15.
 */
/**
 * @alias window.Sm
 * @global
 */
var Sm = {};
require([
    'require',
    'jquery',
    'Cocktail',
    'backbone'
], function (require, $, Cocktail, backbone) {
    /**
     * @type {{}}
     * @global
     */
    window.Sm = Sm || {};

    ////////////////////////////
    var dnd_el            = document.getElementById('drag_n_drop');
    var can_drag_and_drop = (!!dnd_el && dnd_el.checked);
    var dl_el             = document.getElementById('d_l');
    var is_edit_el        = document.getElementById('i_e');
    var is_edit_bool      = is_edit_el ? is_edit_el.value : false;
    var debug_level       = dl_el ? dl_el.value : false;
    Sm.CONFIG             = {
        DRAG_MODE: can_drag_and_drop,
        EDIT:      is_edit_bool,
        DEBUG:     parseInt(debug_level) + 1
    };
    ////////////////////////////
    /**
     * Add something as loaded
     * @name Sm.loaded
     * @type {{}}
     * @props {Function} add {@link Sm.loaded.add}
     */
    Sm.loaded = {
        _loaded:               {},
        _unloaded:             {},
        _waiting:              {},
        _correct_dependencies: function (dependencies) {
            var corrected = [];
            if (dependencies.constructor !== Array) {
                dependencies = [dependencies];
            }
            for (var i = 0; i < dependencies.length; i++) {
                var d = dependencies[i];
                d     = d.toLowerCase().trim();
                if (!this.is_loaded(d)) {
                    corrected.push(d);
                }
            }
            return corrected;
        },
        add:                   function (name, from) {
            name = name.toLowerCase().trim();
            if (this._loaded[name]) return true;
            this._loaded[name] = true;
            this.resolve(name, from || 'add');
            var waiting_names  = this._unloaded[name];
            if (waiting_names) {
                var len = waiting_names.length;
                for (var i = 0; i < len; i++) {
                    var w_name  = waiting_names[i];
                    w_name      = w_name.toLowerCase().trim();
                    var waiting = this._waiting[w_name];
                    if (typeof waiting !== "object" || waiting.timeout === false) continue;
                    waiting.dependencies = this._correct_dependencies(waiting.dependencies);
                    if (!waiting.dependencies.length) this.add(w_name, name);
                }
                delete this._unloaded[name];
            }
            return true;
        },
        resolve:               function (name, from) {
            var waiting = this._waiting[name];
            //Sm.CONFIG.DEBUG && console.log('res - ', [name, from]);
            if (!waiting || waiting.timeout === false) return false;
            clearTimeout(waiting.timeout);
            var fn      = waiting.fn;
            delete this._waiting[name];
            return fn();
        },
        _bb:                   {},
        when_loaded:           function (dependencies, fn, name, time_out) {
            var self = Sm.loaded;
            if (name)this._bb[name] = true;
            return new Promise(function (p_res, reject) {
                var n_r      = function (fn_) { p_res(fn_());};
                dependencies = self._correct_dependencies(dependencies);
                if (!name) name = dependencies.join ? dependencies.join(',') : dependencies + '-';
                name         = name.toLowerCase().trim();
                var other_fn = fn;
                if (typeof fn !== "function") fn = function () {return other_fn;};
                if (!dependencies.length) {
                    self.add(name);
                    return n_r(fn);
                } else {
                    for (var i = 0; i < dependencies.length; i++) {
                        var d             = dependencies[i];
                        self._unloaded[d] = self._unloaded[d] || [];
                        self._unloaded[d].push(name);
                    }
                    self._waiting[name] = {
                        timeout:      setTimeout(function () {
                            var waiting = self._waiting[name];
                            if (!waiting || waiting.timeout === false) return;
                            var d_s = self._correct_dependencies(waiting.dependencies);
                            if (!d_s.length) return p_res(self.add(name, 'timeout'));
                            self._waiting[name].timeout = false;
                            return reject(d_s);
                        }, time_out || 15000),
                        fn:           n_r.bind(null, fn),
                        dependencies: dependencies
                    }
                }
            });
        },
        is_loaded:             function (name) {
            if (name.constructor === Array) {
                for (var i = 0; i < name.length; i++) {
                    var m = name[i];
                    if (!this.is_loaded(m)) {
                        return false;
                    }
                }
                return true;
            }
            name = name.toLowerCase().trim();
            return !!this._loaded[name];
        }
    };


//-------------------------------------------------------------------------
    window.Sm.Extras       = window.Sm.Extras || {};
    Sm.Extras.visual_debug = function (add, classname) {
        var debug_el = document.getElementById('debug_el');
        if (debug_el) {
            var append       = document.createElement('li');
            append.innerHTML = '' + add;
            debug_el.appendChild(append);
        }
    };
//-------------------------------------------------------------------------
    /**
     * The Core structure of the Sm Namespace
     * @type {{}}
     */
    window.Sm.Core                 = {};
    require(['Sm-Core-Core']);
    require(['tooltipster']);
    require(['SmHighlight']);
    require(['Cocktail']);
    Cocktail.patch(backbone);
    /**
     * A container for the Model/View/ representations
     * @type {Sm.Entities|{}}
     */
    Sm.Entities                    = Sm.Entities || {};
    Sm.Entities.Abstraction        = Sm.Entities.Abstraction || {};
    Sm.Entities.Abstraction.mixins = Sm.Entities.Abstraction.mixins || {};


//-------------------------------------------------------------------------
    var NonexistentModelError       = function (message) {
        this.name    = 'NonexistentModelError';
        this.message = message || 'Model does not exist';
        this.stack   = (new Error()).stack;
    };
    NonexistentModelError.prototype = new Error;
    Sm.Errors                       = {};
    Sm.Errors.NonexistentModelError = NonexistentModelError;
    Sm.loaded.add('Errors');


    Sm.CONFIG.DEBUG && Sm.loaded.when_loaded('Core_Identifier', function () {
        var debug = document.getElementById('debug_identifier');
        if (!debug) return;
        var button = document.getElementById('debug_identifier_button');
        if (!button) return;
        var fn = function () {
            var val = debug.value;
            val     = val.trim();
            if (val.indexOf('MvWrapper') > -1) {
                var expl = val.split('.');
                expl.shift();
                if (expl.length)
                    Sm.CONFIG.DEBUG && console.log(Sm.Core.MvWrapper[expl.join('.')]);
                else
                    Sm.CONFIG.DEBUG && console.log(Sm.Core.MvWrapper);
            } else
                Sm.CONFIG.DEBUG && console.log(Sm.Core.Identifier.retrieve(val));
        };
        button.addEventListener('click', fn);
        debug.addEventListener('keyup', function (e) {
            if (e.keyCode == 13)fn();
        });
    }, 'Sm_debug_handler');


    dnd_el && dnd_el.addEventListener('change', function () {Sm.CONFIG.DRAG_MODE = this.checked;});
});
define("Sm", function(){});

/**
 * Created by Sam Washington on 12/17/15.
 */
/* Simple JavaScript Inheritance for ES 5.1 ( includes polyfill for IE < 9 )
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
//noinspection ThisExpressionReferencesGlobalObjectJS

/**
 * @class Class
 * @type {Function}
 * @global
 * @prop {Function} extend
 * @prop {Function} _super Call the parent function
 */

var initializing = !1, fnTest = /xyz/.test(function () {xyz}) ? /\b_super\b/ : /.*/, Class = function () {};
Class.extend     = function (t) {
    function _Class() {!initializing && this.init && this.init.apply(this, arguments)}

    var n        = this.prototype;
    initializing = !0;
    var e        = new this;
    initializing = !1;
    for (var r in t)e[r] = "function" == typeof t[r] && "function" == typeof n[r] && fnTest.test(t[r]) ? function (t, i) {
        return function () {
            var e       = this._super;
            this._super = n[t];
            var r       = i.apply(this, arguments);
            return this._super = e, r
        }
    }(r, t[r]) : t[r];
    return _Class.prototype = e, _Class.prototype.constructor = _Class, _Class.extend = arguments.callee, _Class
};
define('Class',[], function () {
    return Class;
});
/**
 * Created by Sam Washington on 12/18/15.
 */


define('Sm-Core-RelationshipIndex',['Class', 'Sm'], function (Class) {
    var Sm                    = window.Sm;
    /**
     * @alias Sm.Core.RelationshipIndex
     * @exports RelationshipIndex
     * @class RelationshipIndex
     * Keeps track of the relationships of the class and the MvCombos that are being related. Add, remove, move, locate functions included
     * @property locate             {@link Sm.Core.RelationshipIndex#locate}
     * @property locate             {@link Sm.Core.RelationshipIndex#locate}
     * @property add_new_context    {@link Sm.Core.RelationshipIndex#add_new_context}
     * @property add_item           {@link Sm.Core.RelationshipIndex#add_item}
     * @requires Class
     */
    Sm.Core.RelationshipIndex = Class.extend({
        /**
         * Initialize the Relationship Index
         * @param settings
         * @param {string}              settings.index
         * @param {Array}               settings.linked_entities
         * @param {Sm.Core.MvCombo}     settings.MvCombo
         * @param {string}              settings.is_reciprocal
         * @param {string}              settings.parent_type
         * @param {string}              settings._key
         */
        init:                            function (settings) {
            settings           = settings || {};
            this._meta         = {
                /**
                 * Keeps track of how the items are indexed - by which id?
                 * @type {string}
                 */
                _key:   '',
                _index: settings.index || null,
                _list:  []
            };
            this.parent_type   = settings.parent_type;
            this.is_reciprocal = !!settings.is_reciprocal;
            var l_r            = this.linked_entities = settings.linked_entities || [];
            /**
             *
             * @type {{string:{relationship:Sm.Core.Relationship, index:int}}}
             */
            this.deleted_items = {};
            this.items         = {};
            this._meta._key    = settings._key || (this.is_reciprocal ? l_r[0] : l_r[1]) || false;
            this.operations    = {};
            this.contexts      = {};
            this.add_new_context(0);
            this.MvCombo       = settings.MvCombo;
            this.status        = {
                last_fetched: false
            };
            var self           = this;
            this.Identity      = Sm.Core.Identifier.get_or_init({
                id:       false,
                ent_id:   false,
                type:     'RelationshipIndex',
                Resource: self
            });
            /** @type {object<Sm.Core.Relationship.Identity.r_id, Sm.Core.MvCombo.Identity.r_id> } */
            this.r_id_map      = {};
            this._to_delete    = {};
        },
        /**
         * Get info about the relationship_type_obj object that this is referencing. This gets its info from one of the indices in the Meta relationship_type_obj
         * @see Sm.Core.Meta.relationship_type_obj
         * @return {*}
         */
        get_relationship_type_obj_index: function () {
            if (this.info_index) return this.info_index;
            var index = this._meta._index;
            if (!index) return {error: "No index"};
            var parent_type = this.parent_type;
            var selfSm      = Sm.Entities[parent_type];
            if (!selfSm) return {error: "no self Sm"};
            var Meta_ = selfSm.Meta;
            if (!Meta_) return {error: "No info object for type " + this.parent_type};
            if (!Meta_.relationship_type_obj) return {error: "No info object relationship type obj"};
            if (!Meta_.relationship_type_obj[index]) return {error: "No info object for index " + index + '"'};
            var info_index   = Meta_.relationship_type_obj[index];
            info_index.index = index;
            this.info_index  = info_index;
            return info_index;
        },
        /**
         * Retrieve all of the models from the server that fall under this particular index
         * @alias Sm.Core.RelationshipIndex#fetch
         * @return {Promise}
         */
        fetch:                           function () {
            var info_index = this.get_relationship_type_obj_index();
            if (info_index.error) return Promise.reject(info_index);
            var MvType        = info_index.MvType;
            var is_reciprocal = this.is_reciprocal;
            var lower_mv;
            Sm.Entities[MvType]
            && Sm.Entities[MvType].Meta
            && (lower_mv = Sm.Entities[MvType].Meta.lower_plural[MvType]);
            var url           = Sm.urls.api.generate({
                MvCombo:           this.MvCombo,
                fetch:             lower_mv || MvType,
                find_usages:       is_reciprocal,
                relationship_type: info_index.index
            });
            if (!url || !url.length)return Promise.reject({error: "No URL"});
            this.status.last_fetched = new Date;
            return Promise.resolve($.ajax({
                url:         url,
                contentType: 'application/json; charset=UTF-8',
                method:      "GET"
            })).then(function (response) {
                if (typeof  response == 'object' && response.error && response.error.length) {
                    throw response.error;
                }
                if (!(Object.prototype.toString.call(response) === '[object Array]')) {
                    response = [response];
                }
                var others = [];
                for (var i = 0; i < response.length; i++) {
                    var model        = response[i];
                    Sm.CONFIG.DEBUG && console.log(model);
                    var m_model_type = model._model_type;
                    if (!m_model_type) continue;
                    var other_Sm = Sm.Entities[m_model_type];
                    if (!other_Sm) continue;
                    var OtherMvCombo = other_Sm.Wrapper.init_MvCombo({
                        model: model
                    });
                    others.push(OtherMvCombo);
                }
                return others;
            });
        },
        toJSON:                          function (context_id) {
            var info_index = this.get_relationship_type_obj_index();
            if (typeof info_index === "string") return Promise.reject(info_index);
            var context          = this.contexts[context_id] || this;
            var meta             = context._meta;
            var items            = context.items;
            var operations       = context.operations || {};
            var jsonObj          = {
                _meta:      meta,
                maps:       {},
                identities: {},
                operations: operations,
                context_id: context_id
            };
            var key              = this._meta._key;
            context._meta._index = this._meta._index;

            for (var index_ in operations) {
                if (!operations.hasOwnProperty(index_)) continue;
                var item_index = index_ in items ? items : context.deleted_items;
                var item       = item_index[index_].relationship || item_index[index_];
                if (!item.map) {
                    Sm.CONFIG.DEBUG && console.log(item, items, index_, index_ in items, item_index[index_]);
                    continue;
                }
                var map_link_key = item.get_Identity_at_index(key);
                if (!map_link_key) {
                    Sm.CONFIG.DEBUG && console.log(item);
                    continue;
                }
                jsonObj.maps[index_]       = item.map;
                jsonObj.identities[index_] = map_link_key;
            }

            return jsonObj;
        },
        /**
         * Save a RelationshipIndex
         * @param settings
         * @return {Promise}
         */
        save:                            function (settings) {
            /**     NOTE: saves relationship parameters**/
            settings       = settings || {};
            var context_id = settings.context_id;
            var context;
            context        = (context_id !== null && context_id !== "undefined") ? this.contexts[context_id] : this;
            if (!context) return Promise.reject({error: "No Context"});
            if (this.is_reciprocal) return Promise.resolve(true);
            var url = Sm.urls.api.generate({MvCombo: this.MvCombo});
            if (!url || !url.length)return Promise.reject({error: "No URL"});
            var self = this;
            return Promise.resolve($.ajax({
                url:         url,
                data:        JSON.stringify(context),
                contentType: 'application/json; charset=UTF-8',
                method:      "PATCH"
            })).then(function (result) {
                Sm.CONFIG.DEBUG && console.log(result);
                var deleted_items = self.deleted_items;
                var r_id;
                //Add back the ones that weren't successful
                if (typeof result === "object") {
                    var message = result.message;
                    var success = result.success;
                    var data    = result.data;
                    for (r_id in data) {
                        if (!data.hasOwnProperty(r_id)) continue;
                        var api_response      = data[r_id];
                        api_response.data.map = api_response.data.map || {};
                        if (api_response.success === true || api_response.success === 0) {
                            var item                 = context.items[r_id];
                            item.setMap(api_response.data.map);
                            context.operations[r_id] = [];
                        } else if (r_id in deleted_items) {
                            self.add_item(deleted_items[r_id], r_id, context_id, false, true)
                        }
                    }
                } else {
                    for (r_id in deleted_items) {
                        if (!deleted_items.hasOwnProperty(r_id)) continue;
                        self.add_item(deleted_items[r_id], r_id, context_id, false, true)
                    }
                }
                self.deleted_items = {};
            });
        },
        /**
         * Add a new potential relationship context to the list for relationships
         * @alias Sm.Core.RelationshipIndex#add_new_context
         * @param {r_id|int}    r_id    The r_id of the new context
         * @return {{_meta: {_list: Array, _index: (*|null)}}}
         */
        add_new_context:                 function (r_id) {
            var index = this._meta.index;
            var key   = this._meta._key;
            var self  = this;
            return this.contexts[r_id] || (this.contexts[r_id] = {
                    _meta:         {
                        /**
                         * A list of the relationships that exist in the main context
                         */
                        _list:  [],
                        _index: index || null,
                        _key:   key || false
                    },
                    deleted_items: {},
                    items:         {},
                    operations:    {},
                    toJSON:        self.toJSON.bind(self, r_id)
                });
        },
        /**
         * Return the index of a item relative to other based on an identifier
         * @alias Sm.Core.RelationshipIndex#locate
         * @param {r_id|Sm.Core.Identifier|Sm.Core.MvCombo}     identifier  The identity we are searching for
         * @param {r_id|int=}                                   context_id  The context to search
         * @returns {int}
         */
        locate:                          function (identifier, context_id) {
            if (!identifier) return -1;
            if (typeof identifier === "string") {
                var context;
                context    = context_id === null ? this : this.contexts[context_id];
                context_id = context_id || 0;

                if (!context || !context._meta || !context._meta._list) return -1;
                return context._meta._list.indexOf(identifier);
            }
            if (identifier.r_id) return this.locate(identifier.r_id, context_id);
            if (identifier.Identity) return this.locate(identifier.Identity);

            return -1;
        },
        sort_incoming:                   function (Relationship_, item_id) {},
        /**
         * Add a relationship to the list of known relationships
         * @alias Sm.Core.RelationshipIndex#add_item
         * @param Relationship_
         * @param item_id       The r_id of the entity that we are adding
         * @param context_id
         * @param update_indices
         * @returns {boolean}
         * @param silent
         */
        add_item:                        function (Relationship_, item_id, context_id, update_indices, silent) {
            var map = Relationship_.map || {};
            if (!map) return false;
            if (Relationship_.relationshipIndexRIDs.indexOf(this.Identity.r_id) < 0) Relationship_.relationshipIndexRIDs.push(this.Identity.r_id);
            var position                               = map.position || 1;
            position                                   = parseInt(position);
            update_indices                             = !!update_indices;
            context_id                                 = context_id || 0;
            var context                                = this.contexts[context_id] || this.add_new_context(context_id);
            var skip_context                           = false, skip_original = false;
            this.r_id_map[Relationship_.Identity.r_id] = item_id;
            //The position has to be at least 0
            (position < 0 && (position = 0));
            //If the item id is already in either of the lists (for some reason) skip adding it
            if (context._meta._list.indexOf(item_id) > -1) skip_context = true;
            if (this._meta._list.indexOf(item_id) > -1) skip_original = true;

            var context_length = context._meta._list.length;
            var length         = this._meta._list.length;
            var t_p;
            if (!skip_original) {
                t_p = position;
                t_p > length && (t_p = length);
                if (!length || (t_p >= length)) {
                    this._meta._list.push(item_id);
                }
                else (this._meta._list.splice(t_p - 1, 0, item_id));
            }
            if (!skip_context) {
                //If the position is greater than the limits of the array, just append it.
                //Otherwise, add it at the position intended. Because the position in the Database is 1 indexed (WHY?) #todo
                t_p = position;
                t_p > context_length && (t_p = context_length);
                if (!context_length || (t_p >= context_length)) {
                    context._meta._list.push(item_id);
                }
                else {
                    t_p || (t_p = 1);
                    context._meta._list.splice(t_p - 1, 0, item_id);
                }
                context.items[item_id] = Relationship_;
            }

            this.items[item_id] = Relationship_;
            if (!silent) {
                context.operations[item_id] = context.operations[item_id] || [];
                context.operations[item_id].push('add');
                this.operations[item_id]    = this.operations[item_id] || [];
                this.operations[item_id].push('add');
            }
            //We are able to decide to update the array indices
            if (update_indices) this.update_indices(context_id);
            this.sort_incoming(Relationship_, item_id);
            return true;
        },

        /**
         * Get an object containing two arrays: one with the items that are being related, one with the
         * @param context_id
         * @return {{relationships: Array, items: Array<Sm.Core.MvCombo>, count: int}}
         */
        get_listed_items:             function (context_id) {
            context_id  = context_id || 0;
            var context = this.contexts[context_id];
            //var items   = context.items;
            var list    = context._meta._list;
            var items   = context.items;
            var ret_obj = {
                relationships: [],
                items:         [],
                count:         0
            };
            for (var i = 0; i < list.length; i++) {
                var item_id = list[i];
                if (!items[item_id]) continue;
                var Relationship = items[item_id];
                var OtherMvCombo = Sm.Core.Identifier.retrieve(item_id);
                if (!OtherMvCombo) continue;
                OtherMvCombo = OtherMvCombo.getResource();
                ret_obj.items.push(OtherMvCombo);
                ret_obj.relationships.push(Relationship);
            }
            ret_obj.count = ret_obj.items.length;
            return ret_obj;
        },
        /**
         * Update the _list w/r to a specific context. Main context if not specified
         * @alias Sm.Core.RelationshipIndex#update_indices
         * @param {int|r_id=} context_id
         * @return {boolean}
         */
        update_indices:               function (context_id) {
            if (context_id || !context_id) return true; //todo todo todo
            context_id = context_id || 0;
            if (!this.contexts[context_id]) return false;
            var context      = this.contexts[context_id];
            var items        = context.items;
            var list         = context._meta._list;
            var updated_list = [];
            //iterate through the items and add their positions to a list
            for (var item_r_id in items) {
                if (!items.hasOwnProperty(item_r_id)) continue;
                var item = items[item_r_id];
                //get the position from the map/position
                var position = item.position || item.map.position || 1;
                if (!position) continue;
                //Add that position to the list
                updated_list.push({
                    item:     item,
                    r_id:     item_r_id,
                    position: position
                });
            }
            //Sort the list
            updated_list.sort(function (a, b) {
                return a.position - b.position;
            });

            //Iterate through that list and add the items to the right place
            var u_length = updated_list.length;
            u_length && (context._meta._list = []);
            for (var i = 0; i < u_length; i++) {
                var obj1                      = updated_list[i];
                context._meta._list.push(obj1.r_id);
                items[obj1.r_id].map.position = i + 1;
            }
        },
        /**
         * Remove a relationship from the list
         * @alias Sm.Core.RelationshipIndex#remove_item
         * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.Relationship|Sm.Core.Identifier}item
         * @param context_id
         * @param update_indices
         * @return {boolean|*}
         */
        remove_item:                  function (item, context_id, update_indices) {
            var all_contexts = this.contexts;
            var other_context_id;
            if (context_id == null) {
                var result = true, last_relationship;
                for (other_context_id in all_contexts) {
                    if (!all_contexts.hasOwnProperty(other_context_id)) continue;
                    result = (last_relationship = this.remove_item(item, other_context_id, update_indices)) && result;
                }
                return result ? last_relationship : false;
            }
            context_id = context_id || 0;
            if (typeof  item === "object") {
                if (item.setMap) {
                    item = this.r_id_map[item.Identity.r_id];
                } else if (item.r_id) {
                    item = item.r_id;
                }
                context_id = context_id || item.context_id || 0;
            }
            if (!this.contexts[context_id]) return false;

            var context = this.contexts[context_id];
            var items   = context.items;
            var list    = context._meta._list;
            if (!item in list) return false;
            var index           = this.locate(item, context_id);
            list.splice(index, 1);
            var can_remove_meta = false;
            for (other_context_id in all_contexts) {
                if (!all_contexts.hasOwnProperty(other_context_id)) continue;
                if (this.locate(item, other_context_id) > -1) {
                    can_remove_meta = true;
                    break;
                }
            }
            can_remove_meta && this._meta._list.splice(this.locate(item, null), 1);

            var relationship = items[item];
            delete items[item];
            if (!!update_indices) {
                this.update_indices(context_id);
            }
            context.operations[item] = context.operations[item] || [];
            context.operations[item].push('delete');
            if (can_remove_meta) {
                this.operations[item] = this.operations[item] || [];
                this.operations[item].push('delete');
            }
            if (this.MvCombo && item in this.MvCombo.relationship_map) {
                delete this.MvCombo.relationship_map[item];
            }
            context.deleted_items[item] = {
                relationship: relationship,
                index:        index
            };
            return relationship || false;
        },
        /**
         * Change the position of an item
         * @alias Sm.Core.RelationshipIndex#move_item
         * @param {r_id}    item_id         The r_id of the item whose position we are changing
         * @param {int}     new_position    The new position to move it to. 0 indexed
         * @param {r_id=}   context_id      The context of the relationship's existence. Main if not specified
         * @param {boolean} update_indices  Should we reindex the _list array? {@see Sm.Core.RelationshipIndex#update_indices}
         * @return {boolean} Were we successful?
         */
        move_item:                    function (item_id, new_position, context_id, update_indices) {
            if (!item_id) return false;
            context_id       = context_id || 0;
            var old_position = this.locate(item_id, context_id);
            if (old_position === -1) return false;

            var context = this.contexts[context_id];
            if (old_position == new_position) return true;
            if (old_position > new_position) {
                context._meta._list.splice(old_position, 1);
                context._meta._list.splice(new_position, 1, item_id);
            } else {
                context._meta._list.splice(new_position, 1, item_id);
                context._meta._list.splice(old_position, 1);
            }
            if (!!update_indices) {
                this.update_indices(context_id);
            }
            context.operations[item_id] = context.operations[item_id] || [];
            context.operations[item_id].push('move');
            if (!context_id) {
                this.operations[item_id] = this.operations[item_id] || [];
                this.operations[item_id].push('move');
            }
            return true;
        },
        /**
         * Return whether or not there exist relationships in one particular conrext
         * @param context_id
         * @return {*}
         */
        has_relationships_in_context: function (context_id) {
            context_id = context_id || 0;
            if (this.contexts[context_id] && this.contexts[context_id]._meta._list.length) {
                return true;
            } else if (this.status.last_fetched) {
                return false;
            } else {
                return 0;
            }
        }
    });
    Sm.loaded.add('Core_RelationshipIndex');
});
/**
 * Created by Sam Washington on 12/17/15.
 */
define('Sm-Core-Relationship',['Class', 'Sm'], function (Class) {
    /**
     * Contains details about the relationship between one entity and one or more others
     * @exports Relationship
     * @class   Relationship
     * @alias   Sm.Core.Relationship
     * @extends Class
     *
     * @property map
     * @property {Sm.Core.Identifier}       Identity                    An object containing details about what this Relationship represents on the server
     * @property get_Mv                     Get the MvCombo corresponding to a particular map index {@link Sm.Core.Relationship#get_Mv}
     * @property register_view_relationship Link Views together in a specific relationship          {@link Sm.Core.Relationship#register_view_relationship}
     * @property link_Mv                    Link an MvCombo to a proper map index                   {@link Sm.Core.Relationship#link_Mv}
     * @property get_view                   Retrieve a view based on another and a map index        {@link Sm.Core.Relationship#getView}
     * @property setMap                     Retrieve a view based on another and a map index        {@link Sm.Core.Relationship#setMap}
     */
    Sm.Core.Relationship = Class.extend({
        number_of_links:             2,
        /**
         *
         * @param settings
         * @param settings.linked_entities
         * @param settings.rel_indexes
         * @param settings.context_id
         */
        init:                        function (settings) {
            settings                   = settings || {};
            /**
             * An array of the RelationshipIndices that this Relationship belongs to
             * @type {Array}
             */
            this.relationshipIndexRIDs = [];
            /**
             * Probably the serialized version of what's on the server
             * @type {*|{id}|{id: null}}
             */
            this.map                   = this._get_default_map_properties();
            /**
             * An array of things that need to be deleted (by RID)
             * @type {{}}
             */
            this._to_delete            = {};
            /**
             * An object containing the index that is being referenced in the map (e.g. collection_id) and the MvCombo's Identifier
             * @link Sm.Core.Identifier
             * @link Sm.Core.MvCombo
             * @alias Sm.Core.Relationship#_map_links
             * @type {Object<string, Sm.Core.Identifier>}
             * @private
             */
            this._map_links            = {};
            /**
             * An object that connects specific Views to the relationship. Useful if there are multiple instances of a relationship being displayed in multiple different places
             * @type {{}}
             * @private
             */
            this._view_associations    = {};
            /**
             * The Entities that are allowed to be linked (right now, this is not enforced. Honesty policy!)
             * @type {*|Array}
             */
            this.linked_entities       = settings.linked_entities || this.linked_entities || ['', ''];
            /**
             * The indexes of each different id in the relationship (e.g. dimension_id)
             * @type {*|string[]}
             */
            this.rel_indexes           = settings.rel_indexes || this.rel_indexes || ['', ''];
            var self                   = this;
            this.Identity              = Sm.Core.Identifier.get_or_init({
                type:     'Relationship',
                Resource: self
            });
            this.context_id            = settings.context_id || this.map.context_id || 0;
        },
        /**
         * Get the Identifier of an MvCombo that resides at a specific index in the map_links map
         * @param key
         * @return {Sm.Core.Identifier|boolean}
         */
        get_Identity_at_index:       function (key) {
            return this._map_links[key] || false
        },
        /**
         * Set the map of the relationships, fill in the blank with defaults
         * @alias Sm.Core.Relationship#setMap
         * @param map
         */
        setMap:                      function (map) {
            map      = map || {};
            this.map = Sm.Core.util.merge_objects(this.map, map);
            if (this.map.id) this.Identity.refresh({id: this.map.id});
            return this;
        },
        toJSON:                      function () {
            return {
                map:   this.map,
                _meta: this._meta
            }
        },
        /**
         * Save the relationship
         * todo
         * @param settings
         */
        save:                        function (settings) {
            var url  = Sm.urls.api.generate({Relationship: this});
            Sm.CONFIG.DEBUG && console.log(url);
            var self = this;
            return Promise.resolve($.ajax({
                url:         url,
                data:        JSON.stringify(this),
                contentType: 'application/json; charset=UTF-8',
                method:      this.map && this.map.id ? "PATCH" : "POST"
            })).then(function (result) {
                Sm.CONFIG.DEBUG && console.log(result);
                if (result && result.success && result.data && result.data.map) {
                    if (result.data.map.id) self.setMap(result.data.map);
                    Sm.CONFIG.DEBUG && console.log(self.map);
                }
            });
        },
        /**
         * Remove the relationship, destroy the Views associated with it
         * @param settings
         * @param {boolean=true} settings.silent Should we update the relationship indexes? (save them)
         * @param {boolean=true} settings.secondary_key (The key of the view that we are removing
         * @param {boolean=true} settings.primary_key (The key of the view that we should probably remain)
         */
        destroy:                     function (settings) {
            settings          = settings || {};
            var silent        = ("silent" in settings) ? settings.silent : true;
            var related_views = this._view_associations;
            //Get the ID where the secondary relationship is being stored
            var secondary_key = settings.secondary_key || this.rel_indexes[1];
            //If the secondary key exists and is not just the default empty string, iterate through all of the linked views and remove the secondary view
            if (secondary_key && secondary_key.length) {
                for (var view_cid in related_views) {
                    if (!related_views.hasOwnProperty(view_cid)) continue;
                    this._to_delete[view_cid] = related_views[view_cid][secondary_key];
                }
            }
            /**
             * An array of the RelationshipIndex RIDs that we are going to find and remove this relationship from
             * @type {Array}
             */
            var RelIndices      = this.relationshipIndexRIDs;
            var all_resolve_arr = [];

            var url  = Sm.urls.api.generate({Relationship: this});
            Sm.CONFIG.DEBUG && console.log(url);
            var self = this;
            return Promise.resolve($.ajax({
                url:         url,
                data:        JSON.stringify(this),
                contentType: 'application/json; charset=UTF-8',
                method:      "DELETE"
            })).then(function (result) {
                Sm.CONFIG.DEBUG && console.log(result);
                if (result && result.success) {
                    for (var i = 0; i < RelIndices.length; i++) {
                        var RelationshipIndexID = Sm.Core.Identifier.retrieve(RelIndices[i]);
                        if (!RelationshipIndexID) continue;
                        var RelationshipIndex = RelationshipIndexID.getResource();
                        if (!RelationshipIndex) continue;
                        RelationshipIndex.remove_item(self, self.context_id, true);
                    }
                } else {
                    throw result.error;
                }
            });
        },
        /**
         * Link an MvCombo to a map_index (e.g. collection_id)
         * @alias Sm.Core.Relationship#link_Mv
         * @param {Sm.Core.MvCombo} Mv
         * @param map_index
         * @returns {Sm.Core.Relationship}
         */
        link_Mv:                     function (Mv, map_index) {
            if (!Mv || !map_index) return this;
            if (this.linked_entities.length < 2) {
                this.linked_entities.push(Mv.type);
            }
            this._map_links[map_index] = Mv.Identity;
            return this;
        },
        /**
         * Retrieve a linked resource by map index or, if there are only two being related, by the MvCombo that is not wanted (get the other)
         * @alias Sm.Core.Relationship#get_Mv
         * @param identification
         * @param {string=}                 identification.map_index            The Index in the map to retrieve
         * @param {Sm.Core.MvCombo=}        identification.SelfMvCombo          The MvCombo that is known, opposite the one that is wanted
         * @param {Sm.Core.Identifier=}     identification.Identity             The Identifier that is known, opposite of the MvCombo that is wanted
         * @return {Sm.Core.MvCombo|boolean|*}
         */
        get_Mv:                      function (identification) {
            var map_index = identification.map_index;
            if (!$.isArray(map_index))                 map_index = (map_index || '').split('|');

            var Id = (identification.SelfMvCombo) ? identification.SelfMvCombo.Identity : identification.Identity;

            for (var i = 0; i < map_index.length; i++) {
                var m_index = map_index[i];
                if (m_index && m_index.length && this._map_links[m_index]) {
                    return this._map_links[m_index].getResource();
                }
            }
            if (Id && this.number_of_links == 2) {
                var map_links = this._map_links;
                for (var index in map_links) {
                    if (!map_links.hasOwnProperty(index)) continue;
                    if (!map_links[index]) continue;
                    if (map_links[index] != Id) {
                        return map_links[index].getResource();
                    }
                }
            }
            return false;
        },
        /**
         * Find out the index in the map at which the MvCombo resides (e.g. collection_id)
         * @param identification
         * @return {string|boolean}
         */
        get_map_index_of_Mv:         function (identification) {
            var Id = (identification.SelfMvCombo) ? identification.SelfMvCombo.Identity : identification.Identity;
            if (Id && this.number_of_links == 2) {
                var map_links = this._map_links;
                for (var index in map_links) {
                    if (!map_links.hasOwnProperty(index)) continue;
                    if (!map_links[index]) continue;
                    if (map_links[index] == Id) {
                        return index;
                    }
                }
            }
            return false;
        },
        /**
         * Return an object that represents the default properties of the map that we are dealing with.
         * The Map depends on the type.
         * @returns {{id: null}}
         * @private
         */
        _get_default_map_properties: function () {
            return {
                id: null
            }
        },
        /**
         * Connect Views together in a predictable way based on the entities they represent.
         * @alias Sm.Core.Relationship#register_view_relationship
         * @param {Object<string, Sm.Core.SmView>} relationship_obj     An object representing the views mapped to their correct indices in the map (e.g. {section_id : View})
         */
        register_view_relationship:  function (relationship_obj) {
            relationship_obj = relationship_obj || {};
            var rel_indexes  = this.rel_indexes;
            for (var i = 0; i < rel_indexes.length; i++) {
                var rel               = rel_indexes[i];
                relationship_obj[rel] = relationship_obj[rel] || false;
            }
            for (var index in relationship_obj) {
                if (!relationship_obj.hasOwnProperty(index)) continue;
                var View = relationship_obj[index];
                if (!View || !View.cid) continue;
                this._view_associations[View.cid] = relationship_obj;
            }
        },
        /**
         * Return a View based on a provided c_id and the desired relationship type
         * @param {Sm.Core.SmView}      self_View       The View that is known
         * @param {string=}              other_index       The map_index to search for the View
         * @param {boolean=}             strict
         * @return {boolean|Sm.Core.SmView}
         */
        getView:                     function (self_View, other_index, strict) {
            var self_cid = self_View.cid;
            if (!other_index) {
                var self_MvCombo = self_View.MvCombo;
                other_index      = this.get_map_index_of_Mv(this.get_Mv({
                    SelfMvCombo: self_MvCombo
                }));
            }
            if (!self_cid || !other_index || (!!strict && !this._view_associations[self_cid])) return false;
            if (this._view_associations[self_cid] && this._view_associations[self_cid][other_index]) return this._view_associations[self_cid][other_index];
            if (!!strict) return false;
            var rel_indices = this.rel_indexes;
            var self_index;
            if (rel_indices.length == 2) {
                for (var i = 0; i < rel_indices.length; i++) {
                    var index = rel_indices[i];
                    if (index != other_index) {
                        self_index = index;
                        break;
                    }
                }
            }
            if (self_index) {
                var OtherMvCombo     = this.get_Mv({
                    SelfMvCombo: self_View.MvCombo,
                    map_index:   other_index
                });
                var v_r_obj          = {};
                v_r_obj[self_index]  = self_View;
                v_r_obj[other_index] = OtherMvCombo.getView({
                    reference_element: self_View.referenceElement,
                    strict:            strict
                });
                this.register_view_relationship(v_r_obj);
                return this.getView(self_View, other_index, true);
            }
            Sm.CONFIG.DEBUG && console.log(other_index, self_index);
            return false;
        }
    });
    Sm.loaded.add('Core_Relationship');
});
/**
 * Created by Sam Washington on 11/1/15.
 */
if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}
// Cross browser, backward compatible solution
var raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

define('Sm-Core-util',['jquery', 'Sm'], function ($) {
    /**
     * @typedef sm_util
     * @alias Sm.Core.util
     * @type {{getBrowserPrefix: Function, isElement: Function, merge_objects: Function, merge_objects_recursive: Function, switch_: Function, isChildOf: Function, insertAfter: Function, _recurseGetChildElements: Function, getChildElementsByClassName: Function, createElement: Function, camelize: Function, isEmpty: Function, hasClass: Function, getCaretCharacterOffsetWithin: Function, get_rect_width: Function, get_rect_height: Function, get_scroll: Function}}
     */
    Sm.Core.util = {
        getBrowserPrefix: function () {
            if (!this.browserPrefix) {
                return this.browserPrefix;
            }
            var browserPrefix;
            var N = navigator.appName, ua = navigator.userAgent, tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
            M = M[0];
            if (M == "Chrome") { browserPrefix = "webkit"; }
            if (M == "Firefox") { browserPrefix = "moz"; }
            if (M == "Safari") { browserPrefix = "webkit"; }
            if (M == "MSIE") { browserPrefix = "ms"; }
            this.browserPrefix = browserPrefix;
        },

        /**
         * @alias Sm.Core.util.follow_link
         * @param url
         * @param do_replace
         */
        follow_link: function (url, do_replace) {
            if (!do_replace) {
                var win = window.open(url, '_blank');
                win.focus();
            } else {
                window.location = url;
            }
        },

        /**
         * See if a variable is a DOM node
         * @param o
         * @returns {*}
         */
        isElement:                     function (o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
            );
        },
        /**
         * Return a semi-deep copy of two objects
         * todo add recursion?
         * @param original_object
         * @param overwriting_object
         * @returns {{}}
         */
        merge_objects:                 function (original_object, overwriting_object) {
            var obj3 = {};
            if (!!original_object && typeof original_object === 'object') {
                for (var attr_name in original_object) {
                    if (original_object.hasOwnProperty(attr_name))
                        obj3[attr_name] = original_object[attr_name];
                }
            }
            if (!!overwriting_object && typeof overwriting_object === 'object') {
                for (var attribute_name in overwriting_object) {
                    if (overwriting_object.hasOwnProperty(attribute_name)) {
                        obj3[attribute_name] = overwriting_object[attribute_name];
                    }
                }
            }
            return obj3;
        },
        merge_objects_recursive:       function (original_object, overwriting_object) {
            for (var p in overwriting_object) {
                if (!overwriting_object.hasOwnProperty(p)) continue;
                try {
                    // Property in destination object set; update its value.
                    if (overwriting_object[p].constructor == Object) {
                        original_object[p] = this.merge_objects_recursive(original_object[p], overwriting_object[p]);

                    } else {
                        original_object[p] = overwriting_object[p];

                    }
                } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    original_object[p] = overwriting_object[p];

                }
            }
            return original_object;
        },
        switch_:                       function (sw_statement) {
            for (var argument_name = 0; argument_name < sw_statement.length; argument_name++) {
                var argument = sw_statement[argument_name];
                if (!argument || !(typeof argument == 'object')) continue;
                var c = argument.c;
                var f = argument.f;
                if (!!c && typeof f === "function") {
                    return f();
                }
            }
        },
        /**
         * Check to see if an element is the child of another element
         * @param child
         * @param parent
         * @returns {boolean}
         */
        isChildOf:                     function (child, parent) {
            while ((child = child.parentNode) && child !== parent) {}
            return !!child
        },
        insertAfter:                   function (newNode, referenceNode) {
            if (!!referenceNode.nextSibling && !!referenceNode && !!newNode)
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        _recurseGetChildElements:      function (element, className, found_array) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var el = element.childNodes[i];
                if ($(el).hasClass(className)) {
                    found_array.push(element.childNodes[i]);
                    break;
                }
                this._recurseGetChildElements(element.childNodes[i], className, found_array);
            }
        },
        getChildElementsByClassName:   function (DOM_Element, className) {
            if (typeof className != "string" || !this.isElement(DOM_Element)) {
                return [];
            }
            var els = [];
            this._recurseGetChildElements(DOM_Element, className, els);
            return els;
        },
        createElement:                 function (string, and_append) {
            var div;
            div           = document.createElement("div");
            div.innerHTML = string;
            var child     = div.childNodes[0];
            if (!!and_append) {
                document.body.appendChild(child);
            }
            return child;
        },
        camelize:                      function (str, and_first) {
            str = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                return index == 0 ? match.toLowerCase() : match.toUpperCase();
            });
            if (!!and_first) {
                return str.replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });
            }
            return str;
        },
        isEmpty:                       function (el) {
            el = $(el);
            return !$.trim(el.html())
        },
        /**
         * Check to see if an element has a class
         * @param ele
         * @param cls
         * @returns {*}
         */
        hasClass:                      function (ele, cls) {
            if (!this.isElement(ele)) {
                return String(ele).match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
            }
            return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        //http://stackoverflow.com/a/4812022
        getCaretCharacterOffsetWithin: function (element) {
            var caretOffset = 0;
            var doc         = element.ownerDocument || element.document;
            var win         = doc.defaultView || doc.parentWindow;
            var sel;
            if (typeof win.getSelection != "undefined") {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range         = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset       = preCaretRange.toString().length;
                }
            } else if ((sel = doc.selection) && sel.type != "Control") {
                var textRange         = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset           = preCaretTextRange.text.length;
            }
            return caretOffset;
        },
        get_rect_width:                function (rect) {
            return rect.width || (rect.right - rect.left);
        },
        get_rect_height:               function (rect) {
            return rect.height || (rect.bottom - rect.top);
        },
        get_scroll:                    function (scrollProp, offsetProp) {
            if (typeof global[offsetProp] !== 'undefined') {
                return global[offsetProp];
            }
            if (document.clientHeight) {
                return document[scrollProp];
            }
            return document.body[scrollProp];
        },
        randomString:                  function (length, chars) {
            chars      = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        },
        requestAnimationFrame:         raf,
        /**
         * https://gist.github.com/louisremi/1114293#file_anim_loop_x.js
         * @param callback
         * @param element
         */
        create_animation_loop:         function (callback, element) {
            var continue_running = true, lastFrame = +new Date;
            var _raf             = this.requestAnimationFrame;

            function loop(now) {
                if (continue_running !== false) {
                    // Request animation frame, else, fallback to setTimeout
                    _raf ? _raf(loop, element) : setTimeout(loop, 16);
                    // Make sure to use a valid time, since:
                    // - Chrome 10 doesn't return it at all
                    // - setTimeout returns the actual timeout
                    now        = now && now > 1E4 ? now : +new Date;
                    var deltaT = now - lastFrame;
                    // do not render frame when deltaT is too high
                    if (deltaT < 160) {
                        continue_running = callback(deltaT, now);
                    }
                    lastFrame = now;
                }
            }

            loop();
        }
    };
    Sm.loaded.add('Core_util')
});
/**
 * Created by Sam Washington on 12/17/15.
 */

require(['require', 'Class', 'Sm-Core-util'], function (require) {
    var u = Sm.Core.util;
    /**
     * @typedef {string} r_id
     * Randomly generated string of characters meant to be used as identification for a resource. Stands for random id
     */
    /**
     * An object containing identification details about a particular resource
     * @alias Sm.Core.Identifier
     * @class Sm.Core.Identifier
     * @property {string|r_id}  r_id
     */
    var Identifier = Sm.Core.Identifier = Class.extend({
        /**
         * Return an object for serialization
         * @return {*}
         */
        toJSON:        function () {
            //  create a temporary object to return, minus the Resource that comes with it\
            //  We remove the Resource to avoid cyclic serialization
            var faux_merge = Sm.Core.util.merge_objects(this, {});
            if ("Resource" in faux_merge) delete  faux_merge.Resource;
            //  return the object as the serialized object
            return faux_merge;
        },
        /**
         * Initialize the Identifier with properties (id, ent_id, MvCombo/Resource, and an optional r_id if you want to set that manually)
         * @param {SmModel|{r_id: string, ent_id:string, id: int, MvCombo:Sm.Core.MvCombo, type:string, Resource:{}}|Sm.Core.MvCombo|*=}        id_obj          The first object to check for properties
         * @returns {Sm.Core.Identifier|boolean}
         */
        init:          function (id_obj) {
            id_obj          = id_obj || {};
            id_obj.Resource = id_obj.Resource || id_obj.MvCombo || false;

            /**
             * Unique, randomly database generated string held by all entities. Begins with a 4 letter prefix.
             * @type {String}
             */
            this.ent_id   = this.ent_id || id_obj.ent_id || false;
            /**
             * The ID of the record in the table
             * @type {int}
             */
            this.id       = this.id || id_obj.id || false;
            this.id       = this.id ? parseInt(this.id) : false;
            this.r_id     = id_obj.r_id || this.r_id || false;
            /**
             * The type of resource that is being discussed
             * @type {String|*|null}
             */
            this.type     = this.type || id_obj.type || Identifier.guess_type(this.ent_id) || null;
            /**
             * A string that includes the type and ID of a resource
             * @type {String|*}
             */
            this.typed_id = this.typed_id || (this.type && this.type.length ? this.type + '|' + this.id : null);
            /**
             * A randomly generated string meant to uniquely identify this Identifier in the instance that the ent_id or ID aren't there
             * @type {r_id}
             * @prop
             */
            this.r_id     = this.r_id || this.ent_id || this.generate_r_id();
            this.Resource = this.Resource || id_obj.Resource || null;
            if (!this.ent_id) delete this.ent_id;
            if (!this.id) {
                delete this.typed_id;
                delete this.id;
            }
            Identifier.register(this.r_id, this)
                .register(this.typed_id, this)
                .register(this.ent_id, this);
            //if (!/Relationship|View/.test(this.type))Sm.CONFIG.DEBUG && console.log(this.type, this);
            return this;
        },
        /**
         * Generate the randomized ID
         * @return {*}
         */
        generate_r_id: function () {
            return u.randomString(15);
        },
        /**
         * If we ever find out more information about the resource, this updates the properties of the class accordingly
         * @param id_obj
         */
        refresh:       function (id_obj) {
            if (typeof id_obj !== "object") return this;
            if (!this.id && id_obj.id && (!!id_obj.type || !!this.type)) {
                this.id       = id_obj.id;
                this.typed_id = (id_obj.type || this.type) + '|' + this.id;
                Identifier.register(this.typed_id, this)
            }
            if (!this.ent_id && id_obj.ent_id) {
                this.ent_id = id_obj.ent_id;
                Identifier.register(this.ent_id, this)
            }

            if (!this.Resource && !!id_obj.Resource || !!id_obj.MvCombo) {
                this.Resource = id_obj.Resource || id_obj.MvCombo;
            }
            return this;
        },
        /**
         * Return the MvCombo associated with this identity
         * @returns {{}|Sm.Core.MvCombo|boolean}
         */
        getResource:   function () {
            return this.Resource || false;
        }
    });

    /**
     * This is an object linking Identifiers to typed_ids, ent_ids, or r_ids
     * @type {{}}
     */
    Identifier.registry             = {};
    /**
     * Save the Identity under a certain key. Meant to save the Ent_id, r_id, and typed_id of the resource in a map with the Identity itself
     * Return the Identifier to chain
     * @param {string}      key
     * @param {Identifier}    value
     */
    Identifier.register             = function (key, value) {
        if (!key || !value || !key.length) return Identifier;
        Identifier.registry      = (Identifier.registry || {});
        Identifier.registry[key] = value;
        return Identifier;
    };
    Identifier.get_or_init          = function (id_obj) {
        return Identifier.retrieve(id_obj) || (new Identifier(id_obj))
    };
    /**
     * Determine whether a string is probably a ent_id
     * @param {string|*}    item    The Item to check
     * @returns {boolean}
     */
    Identifier.is_ent_id            = function (item) {
        //The length is 25 chars
        //The 6 characters after the 4th character are integers between 0 and 9 (the date)
        var ent_id_length = 25;
        return (typeof item === 'string') && item.length === ent_id_length && /[0-9]{6}/.test(item.substr(4, 6));
    };
    /**
     * Turn something into an object (the format used by everything)
     * @param {Sm.Core.Identifier|int|string|{}|Sm.Core.SmModel|Sm.Core.MvCombo}   id      The entity that we are turning into an object. id, typed_id, or ent_id
     * @param {string=}         type    The type of entity it is
     * @returns {{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}}
     */
    Identifier.normalize_identifier = function (id, type) {
        if (!id) return {};
        var obj = {};
        if (typeof id === 'object') return id;

        if (typeof id === 'string' && id.indexOf('|')) {
            return {typed_id: id};
        }

        if (Identifier.is_ent_id(id)) {
            return {ent_id: id, type: type};
        } else if ($.isNumeric(id)) {
            obj.id   = parseInt(id);
            obj.type = type;
            if (typeof type === "string") {
                obj.typed_id = type + '|' + id;
            }
        }

        return obj;
    };
    /**
     *
     * @param {Sm.Core.Identifier|{}|Sm.Core.SmModel|Sm.Core.MvCombo|{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}}      id_obj          The first object to check for properties
     * @returns {Sm.Core.Identifier|boolean}
     */
    Identifier.retrieve             = function (id_obj) {
        var r_id;
        var bb         = false;
        var IdRegistry = Identifier.registry;
        if (typeof id_obj === "string") {
            bb = true;
            if (id_obj in IdRegistry) return IdRegistry[id_obj];
            r_id   = id_obj;
            id_obj = {};
            if (Identifier.is_ent_id(r_id)) id_obj.ent_id = r_id;
            else id_obj.r_id = r_id;
        }
        id_obj     = Identifier.normalize_identifier(id_obj, id_obj.type || false) || {};
        bb && Sm.CONFIG.DEBUG && console.log(id_obj);
        var ent_id = id_obj.ent_id || false;
        r_id       = r_id || id_obj.r_id;
        if (r_id && r_id in IdRegistry) {
            return IdRegistry[r_id].refresh(id_obj);
        }
        if (ent_id && ent_id in IdRegistry) {
            return IdRegistry[ent_id].refresh(id_obj);
        }
        var id       = id_obj.id || false;
        id           = id ? parseInt(id) : false;
        var type     = id_obj.type || Identifier.guess_type(ent_id) || '';
        var typed_id = type && type.length && id ? type + '|' + id : null;
        if (typed_id && typed_id in IdRegistry) {
            return IdRegistry[typed_id].refresh(id_obj);
        }
    };
    /**
     *
     * @param {Sm.Core.Identifier|{}|Sm.Core.SmModel|Sm.Core.MvCombo|{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}} id_obj
     * @return {boolean|Sm.Core.MvCombo|Sm.Core.SmView|Sm.Core.Relationship|*}
     */
    Identifier.identify             = function (id_obj) {
        var identity = Identifier.retrieve(id_obj);
        if (identity) {return identity.getResource()}
        return false;
    };
    /**
     * Guess the type based on the ent_id
     * todo consider moving Identifier to the meta object? Maybe not, actually
     * @param ent_id
     * @return {boolean|string}
     */
    Identifier.guess_type           = function (ent_id) {
        if (!ent_id || !ent_id.length) return false;
        var begin = ent_id.substr(0, 4);
        switch (begin) {
            case 'sec_':
                return 'Section';
            case 'dim_':
                return 'Dimension';
            case 'page':
                return 'Page';
            case 'coll':
                return 'Collection';
            case 'dic_':
                return 'Dictionary';
            default :
                return false;
        }
    };
    Sm.loaded.add('Core_Identifier');
});
define("Sm-Core-Identifier", function(){});

/**
 * Created by Sam Washington on 12/18/15.
 */

require(['require', 'Class', 'Sm', 'Sm-Core-Identifier'], function (require, Class) {
    require('Sm');
    require('Sm-Core-Identifier');
    /**
     * @class MvWrapper
     * @alias Sm.Core.MvWrapper
     * @extends Emitter
     * @property {function} activate_MV         {@link Sm.Core.MvWrapper#activate_MV}
     * @property {function} deactivate_MV       {@link Sm.Core.MvWrapper#deactivate_MV}
     * @property {function} focus_MV            {@link Sm.Core.MvWrapper#focus_MV}
     * @property {function} build_MV            {@link Sm.Core.MvWrapper#build_MV}
     * @property {function} blur_MV             {@link Sm.Core.MvWrapper#blur_MV}
     * @property {function} select_MV           {@link Sm.Core.MvWrapper#select_MV}
     * @property {function} deselect_MV         {@link Sm.Core.MvWrapper#deselect_MV}
     * @property {function} destroy_MV          {@link Sm.Core.MvWrapper#destroy_MV}
     */
    Sm.Core.MvWrapper                         = Class.extend({
        type:       null,
        parentType: null,
        init:       function (settings) {
            settings              = settings || {};
            this.MvMaps           = {
                loaded_MVs:   {},
                focused_MVs:  {},
                selected_MVs: {},
                active_MVs:   {},
                deleted_MVs:  {}
            };
            this.CONFIG           = settings.CONFIG || {};
            this.CONFIG.EDIT      = this.CONFIG.EDIT || Sm.CONFIG.EDIT || false;
            this.CONFIG.DRAG_MODE = this.CONFIG.DRAG_MODE || Sm.CONFIG.DRAG_MODE;
            this.CONFIG.DEBUG     = this.CONFIG.DEBUG || Sm.CONFIG.DEBUG;
            this._callbacks       = {};
            this.events           = [];
            this.loaded_ent_ids   = {};
        },
        get_MVs:    function (type) {
            if (/loaded|active|focused|selected|deleted/.test(type)) return this.MvMaps[type];
        },

        /**
         * Pull all of the elements from an Array and initialize the MvCombos one-by-one.
         * Also instantiate correctly formatted relationships
         * @param           settings
         * @param {Array}   settings.elements   An array of the elements to hydrate
         * @return {Sm.Core.MvWrapper}
         */
        hydrate: function (settings) {
            settings        = settings || {};
            var element_arr = settings.elements || false;
            if (!element_arr || !element_arr.length) return this;

            var el, i, data_set, $el;
            /** Begin the iteration through the element array */
            for (i = 0; i < element_arr.length; i++) {
                el            = element_arr[i];
                $el           = $(el);
                /** The dataset attached to the element */
                data_set      = el.dataset || {
                        /**
                         * ID for the entity in its table on the server (if applicable)
                         */
                        id:     null,
                        /**
                         * Unique ID for the entity on the server
                         */
                        ent_id: null,
                        /**
                         * A raw model that is pulled directly from the server. Pure JSON object or JSON string.
                         */
                        model:  null
                    };
                var raw_model = data_set.model;
                if (!raw_model) continue;
                /**
                 * A pure JS object that contains information about the Model on the server. Parsed from a string.
                 * @type {{}}
                 */
                var model_properties = $.parseJSON(raw_model);
                //Once we have this, remove it from the element.
                delete data_set.model;
                //Initialize the MvCombo from the element and model properties
                var _Mv = this.init_MvCombo({
                    model: model_properties,
                    view:  el
                });

                //Find the nearest relationship container
                var $closest_rel_container = $el.closest('.relationship-container');
                //Find the nearest element that belongs to an initialized View already
                var $closest_view_$el = $el.parent().closest('[data-view_r_id]');
                //If there is a relationship container and an initialized View...
                if ($closest_rel_container[0] && $closest_view_$el[0]) {
                    //Get the Other MVCombo based on the entity id in the element .imperfect. todo think of a better solution
                    /**
                     * The Identity of the MvCombo that is going to be related
                     * @type {Sm.Core.Identifier|boolean}
                     */
                    var OtherMvComboID = Sm.Core.Identifier.retrieve({
                        ent_id: $closest_rel_container.data('ent_id')
                    });
                    var OtherMvCombo;
                    //If we found another MvCombo...
                    if (OtherMvComboID) {
                        OtherMvCombo = OtherMvComboID.getResource();

                        var reference_element = el.parentNode;
                        var otherView         = Sm.Core.Identifier.retrieve({r_id: $closest_view_$el.data('view_r_id')});
                        if (otherView) otherView = otherView.getResource();
                        //The Other MvCombo should already have its type loaded, but just in case something is wonky, wait for it to be loaded
                        Sm.loaded.when_loaded([_Mv.type, OtherMvCombo.type], (function (OtherMvCombo, _Mv, $closest_rel_container, reference_element, otherView) {
                            return function () {
                                //Find out how the two entities should be related
                                var Relationship_ = OtherMvCombo.getRelationship(_Mv.Identity);
                                /**
                                 * The Meta object that corresponds to the OtherMv (the Mv that we has already been initialized)
                                 * @type {Sm.Core.Meta|*}
                                 * @private
                                 */
                                var OtherMeta_    = Sm.Entities[OtherMvCombo.type].Meta;
                                /** The Index of the relationship */
                                var rel_index     = $closest_rel_container.data('relationship_index');

                                //If everything is in order...
                                if (Relationship_
                                    && OtherMeta_.relationship_type_obj
                                    && OtherMeta_.relationship_type_obj[rel_index]
                                    && OtherMeta_.relationship_type_obj[rel_index].primary_key
                                    && OtherMeta_.relationship_type_obj[rel_index].secondary_key) {
                                    /** An object to identify each view in their respective indices */
                                    var rel_obj = {};
                                    //Get the Primary and Secondary keys of the relationship according to the OtherMv
                                    var primary   = OtherMeta_.relationship_type_obj[rel_index].primary_key;
                                    var secondary = OtherMeta_.relationship_type_obj[rel_index].secondary_key;

                                    //The other view is the primary view
                                    rel_obj[primary] = otherView;
                                    //This view is the secondary view
                                    rel_obj[secondary] = _Mv.getView({
                                        reference_element: reference_element,
                                        strict:            true
                                    });
                                    //Register the view relationship
                                    Relationship_.register_view_relationship(rel_obj);
                                    //Add this view as being related to the other one
                                    otherView.add_relationship({
                                        self_map_index:          primary,
                                        map_index:               secondary,
                                        Relationship:            Relationship_,
                                        relationship_type_index: rel_index
                                    });
                                }
                            }
                        })(OtherMvCombo, _Mv, $closest_rel_container, reference_element, otherView), 'add_parent_relationship')

                    }
                }
                //If the element has the active class, add it as active. Otherwise, just add it as loaded.
                var add_as = $el.hasClass('active') ? 'active' : 'loaded';
                this.add_MV_as(add_as, _Mv.Identity);
                //Just for good measure, delete the model from the dataset
                'model' in el.dataset && delete el.dataset.model;
            }
            return this;
        },

        /**
         * Initialize an MvCombo based on a few different settings
         * If one with a matching Identity already exists, merge the settings
         * @param settings
         * @param {int=}                settings.id
         * @param {{}=}                 settings.model          A raw object containing details about the model
         * @param {SmModel=}            settings.Model          A Sm.Core.SmModel that corresponds to the MvCombo
         * @param {HTMLElement=}        settings.view           An element that is to be linked to the MvCombo
         * @param {Sm.Core.SmView=}     settings.View           A View that corresponds to this MvCombo (why would this exist?)
         * @param {Sm.Core.Identifier=} settings.Identifier     The Identity of the Model being referenced
         * @param {}                    settings.CONFIG
         * @param {}                    settings.Wrapper
         * @return {Sm.Core.MvCombo | boolean|*}
         */
        init_MvCombo: function (settings) {
            var _model_Identifier = settings.model || settings.Model || (settings.id ? {id: settings.id} : {});
            if (!_model_Identifier) Sm.CONFIG.DEBUG && console.log(_.clone(settings));
            settings         = settings || {};
            settings.CONFIG  = this.CONFIG;
            settings.Wrapper = this;
            settings.type    = this.type;
            var Id           = settings.Identifier || Sm.Core.Identifier.retrieve({
                    id:      _model_Identifier.id || false,
                    ent_id:  _model_Identifier.ent_id || false,
                    MvCombo: _model_Identifier.MvCombo || false,
                    type:    this.type
                });
            var m            = settings.model || settings.Model || settings;

            if (Id) {
                if (Id.r_id in this.MvMaps.loaded_MVs) {
                    var OldMv = Id.getResource();
                    Id.refresh({
                        id:     m.id || false,
                        ent_id: m.ent_id || false
                    });
                    var view  = settings.View || settings.view;
                    OldMv.addView(view);
                    return OldMv;
                }
            }

            var sm_type = Sm.Entities[this.type];
            if (!sm_type) return false;
            settings.type   = this.type;
            /**
             * @type {Sm.Core.MvCombo|Function}
             */
            var MvComboType = sm_type.MvCombo;

            if (!MvComboType) return false;

            /**
             * @type {Sm.Core.MvCombo}
             */
            var NewMvCombo  = new MvComboType(settings);
            NewMvCombo.type = this.type;
            if (!NewMvCombo.Identity) return false;
            if (!NewMvCombo.queryStatus('init')) return false;
            var events = ['blur', 'destroy', 'focus', 'select', 'deselect', 'edit', 'activate', 'deactivate'];
            for (var i = 0; i < events.length; i++) {
                var event_name   = events[i];
                var self_fn_name = event_name + '_MV';
                this[self_fn_name] && NewMvCombo.on(event_name, this[self_fn_name]);
            }
            if (NewMvCombo.type == this.type) this.add_MV_as('loaded', NewMvCombo);

            return NewMvCombo;
        },
        /**
         * Check to see if an MV is loaded, active, focused, selected, etc.
         * @param {string}                                              type_to_check   The Index to look in (loaded, active, focused, selected, etc.)
         * @param {Sm.Core.Identifier|Sm.Core.SmView|Sm.Core.MvCombo}   Id              The ID, MvCombo, or a View with the Identity to search for
         * @return {boolean}
         */
        MV_is:        function (type_to_check, Id) {
            if (!Id) return false;
            if (Id.Identity) {
                Id = Id.Identity;
            } else if (Id.MvCombo) {
                Id = Id.MvCombo.Identity;
            }
            var rid = Id.r_id;
            if (!rid) return false;

            type_to_check = type_to_check + '_MVs';

            return (this[type_to_check] && this[type_to_check][rid]);
        },
        add_MV_as:    function (type_to_add, Id) {
            //  If there is no Identity, continue
            if (!Id) return this;
            //  It's possible that either a View or an MvCombo were passed in. If that's the case, get the Identity accordingly
            if (Id.Identity) {
                Id = Id.Identity;
            } else if (Id.MvCombo) {
                Id = Id.MvCombo.Identity;
            }

            //  Get the R_ID of the MvCombo's Identity
            var rid = Id.r_id;
            //  If the R_ID doesn't exist, we can't do anything
            if (!rid) return this;

            //  Assure that there is an Entity object that corresponds to this type
            var selfSm = Sm.Entities[this.type];
            //  The Entity object should also have a Meta Class
            selfSm && selfSm.Meta && selfSm.Meta.add_MV_as(type_to_add, Id);
            var MvMaps = this.MvMaps;
            switch (type_to_add) {
                case 'loaded':
                    MvMaps.loaded_MVs[rid] = Id;
                    break;
                case 'active':
                case 'focused':
                case 'selected':
                    //  The index of operation is going to be the "type to add" + _MVs (e.g. loaded => loaded_MVs)
                    //  If that index doesn't exist, continue
                    if (!(type_to_add + '_MVs' in MvMaps)) {
                        Sm.CONFIG.DEBUG && console.log(type_to_add, MvMaps);
                        return this;
                    }
                    MvMaps[type_to_add + '_MVs'][rid] = Id;

                    //  In order for something to be active, focused, or selected, it must be loaded. Add it to the loaded stuff too
                    !(rid in MvMaps.loaded_MVs) && (MvMaps.loaded_MVs[rid] = Id);
                    break;
            }
            /*  Most of the time we are going to be dealing with entities from the database
             *  Add the entity id to a map of loaded entity IDs just in case.
             */
            var ent_id = Id.ent_id;
            if (Id.getResource) ent_id = ent_id || (Id.getResource() || {}).ent_id || false;

            (!!ent_id) && (this.loaded_ent_ids[ent_id] = Id);

            //If this Wrapper is a conceptual Wrapper, add the Entity to its parent, too
            if (this.parentType) {
                var t_sm_type = Sm.Entities[this.parentType];
                if (!t_sm_type)return this;
                var p_wrapper = t_sm_type.Wrapper;
                p_wrapper.add_MV_as(type_to_add, Id);
            }
            return this;
        },
        remove_MV_as: function (type_to_remove, Id) {
            //  If there is no Identity, continue
            if (!Id) return this;
            //  It's possible that either a View or an MvCombo were passed in. If that's the case, get the Identity accordingly
            if (Id.Identity) {
                Id = Id.Identity;
            } else if (Id.MvCombo) {
                Id = Id.MvCombo.Identity;
            }
            //  Assure that there is an Entity object that corresponds to this type
            var selfSm = Sm.Entities[this.type];
            //  The Entity object should also have a Meta Class
            selfSm && selfSm.Meta && selfSm.Meta.remove_MV_as(type_to_remove, Id);
            //  Get the R_ID of the MvCombo's Identity
            var rid = Id.r_id;
            //  If the R_ID doesn't exist, we can't do anything
            if (!rid) return this;

            //  The index of operation is going to be the "type to remove" + _MVs (e.g. loaded => loaded_MVs)
            var name   = type_to_remove + '_MVs';
            var MvMaps = this.MvMaps;

            //  If the name doesn't exist, we can't do anything
            if (!MvMaps[name]) return false;

            //  Remove the R_ID from the MvMap index
            (rid in this.MvMaps[name]) && delete this.MvMaps[name][rid];

            //  If the Entity is no longer loaded, it must also not be active, selected, or focused
            if (name == 'loaded') {
                (rid in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[rid];
                (rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
                (rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
            }

            //  If this Wrapper is a conceptual Wrapper, remove the Entity from its parent, too
            if (this.parentType) {
                var t_sm_type = Sm.Entities[this.parentType];
                if (!t_sm_type)return this;
                var p_wrapper = t_sm_type.Wrapper;
                p_wrapper.remove_MV_as(type_to_remove, Id);
            }
            return true;
        },

        /**
         * Returns the first MvCombo that is in the loaded list. Usually randomish.
         * @return {boolean|*|Sm.Core.MvCombo}
         */
        get_arbitrary:      function () {
            var MVs = this.MvMaps.loaded_MVs;
            for (var random_id in MVs) {
                if (!MVs.hasOwnProperty(random_id)) continue;
                return MVs[random_id].getResource();
            }
            return false;
        },
///////////////////////////////////////////////////////////////////////////////
        /**
         * Add focus to an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        focus_MV:           function (settings) {
            settings          = settings || {};
            var _Mv           = settings.MvCombo;
            var focused       = this.MvMaps.focused_MVs;
            var SpecifiedView = settings.View;
            if (this.MV_is('focused', _Mv)) return (new Promise(function (r) {
                r();
            }));
            this.blur_MV();
            SpecifiedView && SpecifiedView.focus();
            this.add_MV_as('focused', {MvCombo: _Mv});
            var P             = new Promise(function (resolve) {resolve()});
            return P;
        },
        /**
         * activate an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        activate_MV:        function (settings) {
            settings = settings || {};
            var _Mv  = settings.MvCombo;
            _Mv && this.add_MV_as('active', {MvCombo: _Mv});
            var P    = new Promise(function (resolve) {resolve()});
            return P;
        },
        /**
         * Select an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        select_MV:          function (settings) {
            settings = settings || {};
            var _Mv  = settings.MvCombo;
            _Mv && this.add_MV_as('selected', {MvCombo: _Mv});
            var P    = new Promise(function (resolve) {resolve()});
            return P;
        },
        /**
         * Deselect an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        deselect_MV:        function (settings) {
            settings = settings || {};
            var _Mv  = settings.MvCombo;
            _Mv && this.remove_MV_as('selected', {MvCombo: _Mv});
            var P    = new Promise(function (resolve) {resolve()});
            return P;
        },
        /**
         * Remove focus from an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        blur_MV:            function (settings) {
            settings = settings || {};
            var _Mv  = settings.MvCombo;
            _Mv && this.remove_MV_as('focused', {MvCombo: _Mv});
            if (!_Mv) {
                var focused = this.MvMaps.focused_MVs;
                for (var MvIdentity_r_id in focused) {
                    if (!focused.hasOwnProperty(MvIdentity_r_id)) continue;
                    var focused_MV_Identity = focused[MvIdentity_r_id];
                    var focused_MV          = focused_MV_Identity.getResource();
                    focused_MV.blur();
                }
            }
            var P = new Promise(function (resolve) {resolve()});
            return P;
        },
        /**
         * Deactivate an MvCombo
         * @param settings
         * @param settings.MvCombo {Sm.Core.MvCombo}
         * @param settings.View {Sm.Core.SmView}
         * @return {Promise}
         */
        deactivate_MV:      function (settings) {
            settings = settings || {};
            var _Mv  = settings.MvCombo;
            _Mv && this.remove_MV_as('active', {MvCombo: _Mv});
            var P    = new Promise(function (resolve) {resolve()});
            return P;
        },
///////////////////////////////////////////////////////////////////////////////
        build_MV:           function (settings) {
            settings   = !!settings && typeof  settings === 'object' ? settings : {};
            var prompt = !!settings.prompt;
            return prompt ? this._prompt_build_MV(settings) : this._continue_build_MV(settings);
        },
        destroy_MV:         function (MvCombo) {
            if (!MvCombo)   return Promise.reject();

            var id = MvCombo.id;
            (id in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[id];
            (id in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[id];
            (id in this.MvMaps.loaded_MVs) && delete this.MvMaps.loaded_MVs[id];
            (id in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[id];

            this.MvMaps.deleted_MVs[id] = true;
            return Promise.resolve(true);
        },
        _prompt_build_MV:   function (settings) {
            settings   = settings || {};
            var reject = Promise.reject();
            return this._continue_build_MV(settings);
        },
        _continue_build_MV: function (settings) {
            settings     = settings || {};
            var _Wrapper = this;
            var sm_type  = Sm.Entities[this.type];
            if (!sm_type) return Promise.reject("No SmType to accompany " + this.type);
            var ModelType = sm_type.Model;
            if (!ModelType) return Promise.reject("No Model type");

            var Model_           = new ModelType({});
            Model_.type          = this.type;
            var model_properties = Sm.Core.util.merge_objects(Model_.attributes, settings.model_properties || {});
            Model_.set(model_properties);
            return Promise.resolve(Model_.save()).then(function (response) {
                response.success = response.success || false;
                if (!response.success) throw  response.message || "Unknown error occurred";
                response.data = response.data || {};

                var NewMv        = _Wrapper.init_MvCombo({
                    Wrapper: _Wrapper,
                    model:   response.data.model,
                    CONFIG:  _Wrapper.CONFIG
                });
                if (!NewMv) return Promise.reject("No new Mv");
                NewMv.getView({}).render();
                _Wrapper.add_MV_as('loaded', {
                    MvCombo: NewMv,
                    id:      Model_.get('id'),
                    ent_id:  Model_.get('ent_id')
                });
                settings.MvCombo = NewMv;
                return NewMv;
            });
        }
    });
    Sm.Core.MvWrapper.replacements            = {
        replaced_MVs:    {},
        replacement_MVs: {}
    };
    /**
     *
     * @param mv_combo
     * @return {Sm.Core.MvCombo|Array<Sm.Core.MvCombo|boolean>|boolean|*}
     */
    Sm.Core.MvWrapper.convert_to_MvCombo      = function (mv_combo) {
        if (!mv_combo) return false;
        if (mv_combo.constructor == Array) {
            return mv_combo.map(function (item) {
                return Sm.Core.MvWrapper.convert_to_MvCombo(item);
            })
        }
        //Try to convert whatever we're talking about into an Identity
        if (mv_combo.r_id) mv_combo = mv_combo.r_id;
        if (mv_combo.Identity) mv_combo = mv_combo.Identity.r_id;
        if (typeof mv_combo === "string") {
            if (mv_combo in Sm.Core.Meta.MvMaps.loaded_MVs) {
                return Sm.Core.Meta.MvMaps.loaded_MVs[mv_combo].getResource();
            } else {
                var Identity = Sm.Core.Identifier.retrieve(mv_combo);
                //Doesn't Exist
                if (!Identity) return false;
                var Resource = Identity.getResource();
                //Doesn't exist
                if (!Resource) return false;
                //It's an MvCombo
                if (Resource.addView) return Resource;
                //It's a View or Model
                if (Resource.MvCombo) return Resource.MvCombo;
            }
        }
        return false;
    };
    /**
     * Get an array of r_ids that represent what this MvCombo effectively is. The array contains the r_ids of other MvCombos that can replace the content of whatever this one is.
     * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.MvCombo}    MvCombo_in_question     This is the r_id of the MvCombo that we are asking about
     * @param {boolean=false}                           get_original            Are we trying to return what this Mv is replacing?
     * @param {boolean=false}                           false_if_same           Should we false if we don't find anything? Makes us return a boolean, probably for the better
     * @param {{}=}                                     found                   An object whose items we've already found
     *  @return {{MVs:Array<Sm.Core.MvCombo.Identity.r_id>, replacement_indices: {}|string}|boolean}
     */
    Sm.Core.MvWrapper.get_effective_MV        = function (MvCombo_in_question, get_original, false_if_same, found) {
        found         = found || {};
        var MvWrapper = Sm.Core.MvWrapper;
        get_original  = !!get_original;
        /**
         * This is the r_id of the MvCombo that we are asking about
         */
        var r_id;
        if (typeof  MvCombo_in_question === "string") {
            r_id = MvCombo_in_question;
        } else {
            var MvCombo = MvWrapper.convert_to_MvCombo(MvCombo_in_question);
            if (!MvCombo) return false_if_same ? false : {
                MVs:                 MvCombo_in_question,
                replacement_indices: {}
            };
            r_id = MvCombo.Identity.r_id;
        }
        /** An array of the r_ids that compose this one (or that this one composes)
         * @type {Array<Sm.Core.MvCombo.Identity.r_id>}
         */
        var list;
        /**
         * If we are trying to get whatever this MvCombo is replacing, we should look in the "replacement MVs". Otherwise, we look in the "replaced MVs"
         * @type {string}
         */
        var where_to_look = !get_original ? MvWrapper.replacements.replaced_MVs : MvWrapper.replacements.replacement_MVs;
        var list_obj      = where_to_look[r_id];
        list              = list_obj ? list_obj.MVs : false;

        //If the list doesn't exist or is empty or is just an array that points back to itself, ignore it and move on
        if (!list || !list.length || (list.length === 1 && list[0] == r_id)) return false_if_same ? false : {MVs: [r_id], replacement_indices: {}};
        var replacement_index;
        var repl_indices = list_obj.replacement_indices;
        for (var rep_r_id in repl_indices) {
            if (!repl_indices.hasOwnProperty(rep_r_id)) continue;
            if (!replacement_index) replacement_index = repl_indices[rep_r_id];
        }
        var actual_list = [];
        var obj         = {};
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (found[item]) {
                delete where_to_look[r_id];
                list.splice(i, 1);
                i--;
                continue;
            }
            found[item]  = found;
            var resp_obj = Sm.Core.MvWrapper.get_effective_MV(item, get_original, true, found);
            if (!resp_obj && !obj[item]) {
                if (item == r_id) continue;
                actual_list.push(item);
                obj[item] = true;
            } else {
                var resp  = resp_obj.MVs;
                var items = resp_obj.replacement_indices;
                if (!replacement_index) {
                    for (var obj1 in items) {
                        if (!items.hasOwnProperty(obj1)) continue;
                        if (!replacement_index) replacement_index = items[obj1];
                    }
                }
                for (var j = 0; j < resp.length; j++) {
                    var name = resp[j];
                    if (!obj[name] && name != r_id) {
                        obj[name] = true;
                        actual_list.push(name);
                    }
                }
            }
        }
        return {
            MVs:                 actual_list,
            replacement_indices: replacement_index
        };
    };
    /**
     * Mark a list of MvCombo r_ids as being effectively replaced by the content of another list
     * @param {Array<Sm.Core.MvCombo.Identity.r_id>|Sm.Core.MvCombo}    D_ReplacedMvComboList
     * @param {Array<Sm.Core.MvCombo.Identity.r_id>|Sm.Core.MvCombo}    M_ReplacementMvComboList
     * @param {string}                                                  replacement_indices
     * @return {boolean}
     */
    Sm.Core.MvWrapper.register_MV_replacement = function (D_ReplacedMvComboList, M_ReplacementMvComboList, replacement_indices) {
        if (!replacement_indices) {
            Sm.CONFIG.DEBUG && console.log(replacement_indices);
            return false;
        }
        if (!M_ReplacementMvComboList || !D_ReplacedMvComboList) return false;
        var MvWrapper = Sm.Core.MvWrapper;
        if (D_ReplacedMvComboList.Identity) D_ReplacedMvComboList = [D_ReplacedMvComboList.Identity.r_id];
        if (M_ReplacementMvComboList.Identity) M_ReplacementMvComboList = [M_ReplacementMvComboList.Identity.r_id];
        //Sort the arrays to make comparison easier (just compare the joined arrays to see if they are the same)
        D_ReplacedMvComboList    = D_ReplacedMvComboList.sort();
        M_ReplacementMvComboList = M_ReplacementMvComboList.sort();

        var m_replacement_object = {};
        var d_replaced_object    = {};


        /**
         * MVs that the wrapper already knows have been replaced
         * @type {Sm.Core.MvWrapper.replacements.replaced_MVs|{}}
         */
        var wrapper_replaced      = MvWrapper.replacements.replaced_MVs;
        /**
         * Mvs that are replacing something
         * @type {Sm.Core.MvWrapper.replacements.replacement_MVs|{}}
         */
        var wrapper__replacements = MvWrapper.replacements.replacement_MVs;

        //Convert the replaced/replacements to a sorted string of the r_ids. This will be used as a quick comparison method
        var rep_d_to_string        = D_ReplacedMvComboList.join(',');
        var replacements_to_string = M_ReplacementMvComboList.join(',');
        var removed_mvs            = [];
        //We first iterate through the MvCombos that we've already replaced to see if what replaces them is equal to what we are now replacing (if we are undoing an action)
        for (var replaced_id in wrapper_replaced) {
            if (!wrapper_replaced.hasOwnProperty(replaced_id)) continue;
            //If the strings match
            var known_rep_d_string = wrapper_replaced[replaced_id].MVs.join(',');
            if (rep_d_to_string == known_rep_d_string && M_ReplacementMvComboList.indexOf(replaced_id) > -1) {
                delete wrapper_replaced[replaced_id];
                removed_mvs.push(replaced_id);
            }
        }
        var to_sort_string = removed_mvs.join(',');
        //If we have just undone a replacement (all of the MVs that were doing the replacing had already been replaced my the MVs that we were going to replace just now)
        //Delete the r_ids of the MVs that are now being replaced out of the "replacements" map
        if (to_sort_string == replacements_to_string) {
            for (var k = 0; k < D_ReplacedMvComboList.length; k++) {
                var replacement_r_id = D_ReplacedMvComboList[k];
                if (wrapper__replacements[replacement_r_id]) {
                    delete wrapper__replacements[replacement_r_id];
                }
            }
            removed_mvs = false;
        }
        if (!removed_mvs) return true;

        var mv;
        for (var i = 0; i < D_ReplacedMvComboList.length; i++) {
            mv                    = D_ReplacedMvComboList[i];
            d_replaced_object[mv] = replacement_indices;
            var possible_MV_obj   = MvWrapper.get_effective_MV(mv, false, true);
            /** @type {Array}  */
            var possible_MvCombo  = possible_MV_obj ? possible_MV_obj.MVs : false;
            //If we are replacing something that has already been replaced, get the r_ids of the MV that replace it to say that those are now going to be replaced by whatever this one was
            if (!possible_MvCombo) {
                var pos = M_ReplacementMvComboList.indexOf(mv);
                if (mv > 0) M_ReplacementMvComboList.splice(pos, 1);
                if (!M_ReplacementMvComboList.length) {
                    if (wrapper_replaced[mv]) delete wrapper_replaced[mv];
                } else {
                    wrapper_replaced[mv] = {
                        MVs:                 M_ReplacementMvComboList,
                        replacement_indices: m_replacement_object
                    };
                }
            } else {
                Sm.CONFIG.DEBUG && console.log('reps', possible_MvCombo);
                MvWrapper.register_MV_replacement(possible_MvCombo, M_ReplacementMvComboList, replacement_indices);
            }
        }
        var reps = [];
        //Iterate through the r_ids of the MVs that we are going to replace with
        //We want to get a list of r_ids that we are truly going to be replacing, and say that those are now replacing whatever we just replaced
        M_ReplacementMvComboList.forEach(function (currentValue) {
            m_replacement_object[currentValue] = replacement_indices;
            var eff_obj                        = MvWrapper.get_effective_MV(currentValue);
            var eff                            = eff_obj.MVs;
            if (eff) {
                for (var i = 0; i < eff.length; i++) {
                    var r_id = eff[i];
                    reps.push(r_id);
                }
            } else {
                reps.push(currentValue);
            }
        });
        for (var j = 0; j < reps.length; j++) {
            mv                        = reps[j];
            wrapper__replacements[mv] = {
                MVs:                 D_ReplacedMvComboList,
                replacement_indices: d_replaced_object
            };
        }
        return true;
    };

    Sm.loaded.when_loaded('Core_Identifier', function () {
        Sm.loaded.add('Core_MvWrapper');
    }, 'Core_MvWrapper');
});
define("Sm-Core-MvWrapper", function(){});

/**
 * Created by Sam Washington on 8/15/2015.
 */
define('Emitter',['Class'], function (Class) {
    var __arr_slice = Array.prototype.slice;

    /**
     * @class Emitter
     * @alias Emitter
     * @type {Function|Class}
     * @extends Class
     * @prop {Function} on
     * @prop {Function} off
     * @prop {Function} extend
     * @prop {Function} emit
     * @prop {Function} removeListener
     * @prop {Function} removeAllListeners
     * @prop {Function} add_bound
     * @prop {Function} get_bound
     */
    var Emitter = Class.extend({
        /**
         * @constructor
         * @param properties
         */
        init:               function (properties) {
            for (var obj in properties) {
                if (!properties.hasOwnProperty(obj)) continue;
                this[obj] = properties[obj];
            }

            this.events     = [];
            this._callbacks = {}
        },
        on:                 function (event, fn) {
            !this._callbacks && (this._callbacks = {});
            !this._callbacks[event] && (this._callbacks[event] = []);
            typeof fn === 'function' && this._callbacks[event].push(fn);
            return this;
        },
        off:                function (event, fn) {
            if (!this._callbacks || arguments.length === 0) {
                this._callbacks = {};
                return this;
            }
            var callbacks = this._callbacks[event];
            if (!callbacks) return this;

            //todo why not just use the callbacks var
            if (arguments.length === 1) {
                delete this._callbacks[event];
                return this;
            }
            var i, _i, _len;
            var callback;
            for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
                callback = callbacks[i];
                if (callback === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
            return this;
        },
        /**
         *
         * @param event
         * @returns {Emitter}
         */
        emit:               function (event) {
            var callbacks = this._prepare_event.apply(this, arguments);
            for (var i = 0; i < callbacks.length; i++) {
                var fn = callbacks[i];
                fn();
            }
            return this;
        },
        _prepare_event:     function (event) {
            var args = (arguments.length >= 2) ? __arr_slice.call(arguments, 1) : [];
            if (!this._callbacks) {
                this._callbacks = {};
                return [];
            }

            var callbacks       = this._callbacks[event];
            var callback;
            var other_callbacks = [];
            if (callbacks) {
                for (var _i = 0, _len = callbacks.length; _i < _len; _i++) {
                    callback = callbacks[_i];
                    if (!callback) continue;
                    other_callbacks[_i] = Function.prototype.bind.apply(callback, [this].concat(args));
                }
            }
            return other_callbacks || [];
        },
        resolve:            function (event) {
            var count = 0;
            return Promise.all(this._prepare_event.apply(this, arguments).map(function (fn) {
                count++;
                return fn ? fn() : false
            })).then(function (res) {
                return count === 1 ? res[0] : res;
            });
        },
        /**
         * Remove a function from an event
         * @param {String}      e       The name of the event
         * @param {Function}    fn      The function to remove
         */
        removeListener:     function (e, fn) {this.off(e, fn)},
        removeAllListeners: function () {this.off()},
        /**
         * Assure that the function is bound to the correct "this" value. Useful if it's possible that the same function
         * could be passed to another function in multiple different areas, and the function must be the same
         * @param name
         * @param fn
         * @param _self
         * @return {*}
         */
        add_bound:          function (name, fn, _self) {
            this._fns = this._fns || {};
            if (!(typeof fn === "function")) {
                Sm.CONFIG.DEBUG && console.log(name, fn);
                return function () {};
            }
            return this._fns[name] = this._fns[name] || fn.bind(_self || this);
        },
        get_bound:          function (name) {
            return this._fns[name] ? this._fns[name] : function () {}.bind(this);
        }
    });
    return Emitter;
});
/**
 * Created by Sam Washington on 12/17/15.
 */

/**
 * @module Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Core-util', 'Emitter'], function (require) {
    var Emitter = require('Emitter');

    /**
     * @typedef {Object} CONFIG      An object that holds standard configuration details for the entire page
     * @prop    {Boolean}   EDIT        Is the page in Edit mode?
     * @prop    {Boolean}   DEBUG       Is the page in debug mode?
     * @prop    {Boolean}   DRAG_MODE   Is the page in drag and drop mode?
     */
    /**
     * @typedef {Object}    EntityStatus
     * @prop {Boolean}      is_focused      At least one of the MvCombo's Views is focused
     * @prop {Boolean}      is_selected     At least one of the MvCombo's Views is selected
     * @prop {Boolean}      is_saving       The MvCombo is in the process of being saved
     * @prop {Boolean}      is_init         The MvCombo has been initialized
     * @prop {Boolean}      is_editing         The MvCombo has been initialized
     * @prop {Boolean}      is_active       The MvCombo is displayed somewhere on the screen
     * @prop {Boolean}      is_complete     The MvCombo has a Model that has an ID and a ent_id
     * @prop {Boolean}      has_ent_id        The MvCombo has a ent_id
     */
    /**
     * @typedef {Object}    EntityDetails
     * @prop {Boolean}      is_editable
     * @prop {Boolean}      is_selectable
     * @prop {Boolean}      is_viewable
     * @prop {Boolean}      is_relatable
     * @prop {Boolean}      is_destroyable
     * @prop {Boolean}      is_repositionable
     * @prop {Boolean}      is_copyable
     * @prop {Boolean}      is_draggable
     */
    /**
     * @alias Sm.Core.MvCombo
     *
     * An object that wraps Models and Views together under a common identifier
     * @extends Emitter
     * @type {Emitter|Function}
     *
     * @requires Sm.Core.Identifier
     *
     * @property {Object<SmView, string>}                   Views                       An object containing the views the belong to the MvCombo
     * @property {Sm.Core.MvWrapper}                        Wrapper                     The wrapper object for this type
     * @property {Array}                                    ViewList                    An array of the cid's belonging to the views of the MvCombo
     * @property {CONFIG}                                   CONFIG                      An object that details what this page is meant to be
     * @property {EntityStatus}                             status                      An object containing statuses of the object
     * @property {EntityDetails}                            details                     An object detailing some of the broad interaction details surrounding this entity
     * @property {Sm.Core.Identifier}                       Identity                    An object containing details about what this MvCombo represents on the server
     * @property {{}<string, Sm.Core.RelationshipIndex>}    relationships               The way entities relate to this(this is the primary entity/relationship holder)
     * @property {{}<string, Sm.Core.RelationshipIndex>}    reciprocal_relationships    The way this relates to entities (this is the secondary+ entity) Reciprocal relationships let us know which relationships must be severed
     * @property {{}}                                       relationship_map            Matches relationship
     * @property {Sm.Core.MvCombo.Identity.r_id|string}     r_id
     * @property {function}                                 _return_relationship    {@link Sm.Core.MvCombo#_create_relationship_holder}
     * @property {function}                                 focus                   {@link Sm.Core.MvCombo#focus}
     * @property {function}                                 save                    {@link Sm.Core.MvCombo#save}
     * @property {function}                                 destroy                 {@link Sm.Core.MvCombo#destroy}
     * @property {function}                                 _prompt_destroy         {@link Sm.Core.MvCombo#_prompt_destroy}
     * @property {function}                                 _prompt_save            {@link Sm.Core.MvCombo#_prompt_save}
     * @property {function}                                 _continue_destroy       {@link Sm.Core.MvCombo#_continue_destroy}
     * @property {function}                                 _continue_save          {@link Sm.Core.MvCombo#_continue_save}
     * @property {function}                                 _initModel              {@link Sm.Core.MvCombo#_initModel}
     * @property {function}                                 removeView              {@link Sm.Core.MvCombo#removeView}
     * @property {function}                                 getView                 {@link Sm.Core.MvCombo#getView}
     * @property {function}                                 forEachView             {@link Sm.Core.MvCombo#forEachView}
     */
    Sm.Core.MvCombo            = Emitter.extend({
        /**
         * @constructor
         * @param           settings
         * @param {CONFIG}  settings.CONFIG
         * @param {Sm.Core.SmModel=}    settings.Model          An SmModel that is related to this MvCombo
         * @param {{}}                  settings.model          An object detailing properties of the new SmModel
         * @param {Backbone.View=}      settings.View           A View that may already be correlated with this MvCombo's Identity
         * @param {HTMLElement=}        settings.view           An element that is already correlated with this MvCombo' Identity
         * @param {String=}             settings.type           The type of MvCombo this is. Not sure why this is here
         * @param {int=}                settings.id             An ID that is meant to correspond with this MvCombo - used as a backup
         * @param {String=}             settings.ent_id           A ent_id that is meant to correspond with this MvCombo - used as a backup
         * @param {Sm.Core.Identifier}  settings.Identifier     If there is, for some reason, a preexisting Identity, use that
         */
        init:                              function (settings) {
            this.type                  = settings.type || this.type || 'MvCombo';
            settings                   = settings || {};
            this._callbacks            = {};
            this.status                = {};
            this._relationships_to_add = null;
            this._permissions          = {};
            /**
             * An object containing the views the belong to the MvCombo
             * @type {{}}
             */
            this.Views                 = {};
            /**
             * An object containing information about which of this MvCombo's Views are ___d
             * @type {{selected_Views: {}, active_Views: {}, focused_Views: {}}}
             */
            this.ViewMaps              = {
                selected_Views: {},
                active_Views:   {},
                focused_Views:  {}
            };
            /**
             * An array of the cid's belonging to the views of the MvCombo
             * @type {Array}
             */
            this.ViewList              = [];
            /**
             * An Array of Views that were created just for the sake of having a View - if this can be replaced by a real element, that is preferable.
             * @type {Array}
             */
            this.defaultViewList       = [];
            /**
             * The Model that matches up to the Resource that we are dealing with
             * @type {Sm.Core.SmModel}
             */
            this.Model                 = null;
            this.relationship_map      = {};

            /**
             * Contains the relationships in which this is the primary relationship or relationships that don't have primary/secondary relationships
             * @type {{_meta: {default_list: Array, contexts: {}}}}
             */
            this.relationships            = {};
            /**
             * An index containing the relationships in which this is the secondary relationship
             * Also contains details about what other Entities this is related to
             * @type {{_meta: {default_list: Array, contexts: {}}}}
             */
            this.reciprocal_relationships = {};

            /**
             * The relationships in which this Model is the primary entity/relationships this MvCombo has
             * @type {*|Object.<string, Sm.Core.Relationship>|boolean|{}}
             */
            this.relationships            = this._create_relationship_holder() || {};
            /**
             * The relationships in which this Model is the secondary entity/How this MvCombo relates to other things
             * @type {*|Object.<string, Sm.Core.Relationship>|boolean|{}}
             */
            this.reciprocal_relationships = this._create_relationship_holder(true) || {};

            //todo
            this.CONFIG = Sm.CONFIG;

            this.Wrapper = settings.Wrapper || null;
            //initialize a view from the provided element or just instantiate a default View
            this.addView(settings.view || settings.View || null);
            var Model    = settings.model || settings.Model || null;

            Model = this.Model = this._initModel(Model);

            var self    = this;
            var type    = this.type || settings.type;
            this._cache = {ids: {}};
            var Id      = this.Identity = settings.Identifier || Sm.Core.Identifier.get_or_init({
                    id:       Model.id || settings.id || false,
                    ent_id:   Model.ent_id || settings.ent_id || false,
                    type:     type,
                    Resource: self
                });
            this.Model.Identity = Id;

            /**
             * Add all of the known relationships in their proper indices
             * @see {Sm.Core.MvCombo._prepare_known_relationships}
             */
            var prepare_known_relationships = (function (self) {
                return function () {
                    self._prepare_known_relationships(self._relationships_to_add);
                    !Sm.CONFIG.DEBUG && (self._relationships_to_add = null);
                }
            })(this);

            /**
             * Take all of the relationships to add (from initModel) and put them in the right places
             */
            if (Sm.loaded.is_loaded(this.type + '__core'))prepare_known_relationships();
            else Sm.loaded.when_loaded([this.type + '__core'], prepare_known_relationships, 'prepare_' + Id.ent_id + '_relationships');

            var get_fn = function (index) {
                return function () {
                    if (self._cache.ids[index]) return self._cache.ids[index];
                    return self._cache.ids[index] = !self.Identity || !self.Identity[index] ? false : self.Identity[index];
                }
            };

            Object.defineProperties(self, {
                ent_id: {
                    get: get_fn('ent_id')
                }, id:  {
                    get: get_fn('id')
                },
                /**
                 * @alias Sm.Core.MvCombo.r_id
                 * @type {Sm.Core.MvCombo.Identity.r_id|*}  */
                r_id:   {
                    get: get_fn('r_id')
                }
            });

            if (this.ent_id) this.setStatus('has_ent_id', true);
            this.setStatus('completed', (Id.id && Id.ent_id && Id.ent_id.length));

            var _destroy = this.add_bound('_destroy', this.destroy);
            var _focus   = this.add_bound('_focus', this.focus);

            this.on('destroy', _destroy).on('focus', _focus);
            this.setStatus('init', true)
        },
        /**
         * @alias Sm.Core.MvCombo#_return_relationship
         * @param is_reciprocal Is the relationship reciprocal?
         * @return {Object<string, Sm.Core.Relationship>|boolean}
         * @protected
         */
        _create_relationship_holder:       function (is_reciprocal) {
            var new_obj = {};

            if (!Sm.Entities[this.type]) return false;

            var Meta_ = Sm.Entities[this.type].Meta;
            if (!Meta_) return false;

            var relationship_obj_obj = Meta_.relationship_type_obj;
            if (!relationship_obj_obj) return false;
            var self_type = this.type;
            var self      = this;
            is_reciprocal = !!is_reciprocal;
            /**
             * Iterate through the known relationships and add a new {@link Sm.Core.RelationshipIndex} for each one
             */
            for (var r_t in relationship_obj_obj) {
                if (!relationship_obj_obj.hasOwnProperty(r_t)) continue;
                var rel_obj = relationship_obj_obj[r_t];
                if (rel_obj.is_only_reciprocal && !is_reciprocal) continue;

                var index = Meta_.get_relationship_type({type: 'index'}, r_t);

                var ModelRelationshipIndex = false;
                Sm.Entities[this.type].RelationshipAbstraction && (ModelRelationshipIndex = Sm.Entities[this.type].RelationshipAbstraction[index + '_RelationshipIndex']);
                ModelRelationshipIndex     = ModelRelationshipIndex || Sm.Core.RelationshipIndex;

                new_obj[r_t] = new ModelRelationshipIndex({
                    /**
                     * If the relationship is reciprocal, change the way we relate it
                     */
                    _key:            (is_reciprocal ? rel_obj.primary_key : rel_obj.secondary_key),
                    is_reciprocal:   is_reciprocal,
                    index:           index,
                    parent_type:     self_type,
                    linked_entities: rel_obj.linked_entities,
                    MvCombo:         self
                });
            }
            return new_obj;

        },
        /**
         * Initialize this MvCombo's Model from a Backbone model or an object of properties
         * @alias Sm.Core.MvCombo#_initModel
         * @param Model Either a Backbone Model or a json_encoded PHP Model
         * @returns {*}
         * @private
         */
        _initModel:                        function (Model) {
            var sm_type = Sm.Entities[this.type];
            if (!sm_type) return false;
            var ModelType_ = sm_type.Model;
            if (!ModelType_) return false;

            var id, ent_id;
            if (Model instanceof ModelType_) {
                Model.MvCombo = this;
                id            = Model.get('id');
                ent_id        = Model.get('ent_id');
            } else {
                if (typeof Model === 'string') {
                    Model = $.parseJSON(Model);
                } else if (!Model) {
                    Model = {};
                }
                var model_props = {};
                id              = Model.id;
                ent_id          = Model.ent_id;
                if (!!Model.id) model_props = _.clone(Model);
                /**
                 * Get details from the permissions
                 */
                if (model_props._permissions) {
                    var _permissions = model_props._permissions;
                    this.setPermission(_permissions);
                }

                /**
                 * Get the relationships_to_add from the relationships items index
                 */
                if (model_props.relationships && model_props.relationships.items) {
                    this._relationships_to_add = model_props.relationships.items;
                    delete model_props.relationships;
                }

                model_props.MvCombo = this;
                Model               = new ModelType_(model_props);
                Model.MvCombo       = this;
            }
            this.id     = id || false;
            this.ent_id = ent_id || false;
            return (Model || {});
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setPermission:                     function (permission, value) {
            if (typeof permission === "string") {
                this._permissions[permission] = value;
            } else if (typeof permission === "object") {
                for (var name in permission) {
                    if (!permission.hasOwnProperty(name)) continue;
                    this.setPermission(name, permission[name])
                }
            }
        },
        queryPermission:                   function (permission) {
            return permission && this._permissions[permission] ? this._permissions[permission] : null;
        },
        setStatus:                         function (status, value) {
            if (typeof status === "string") {
                this.status[status] = value;
            } else if (typeof status === "object") {
                for (var name in status) {
                    if (!status.hasOwnProperty(name)) continue;
                    this.setStatus(name, status[name])
                }
            }
        },
        queryStatus:                       function (status) {
            return status && this.status[status] ? this.status[status] : null;
        },
        /**
         * Iterate through the known relationships (usually the relationships that were provided through the query) and prepare them to be linked to MvCombos later
         * @todo consider changing this to allow relationships between more than two entities
         * @todo this is sometimes asynchronous, may cause issues later. For now, this is pretty okay.
         * @param {{}}  relationships   Generally the relationships_to_add from the _initModel
         * @see Sm.Core.MvCombo._initModel
         * @private
         */
        _prepare_known_relationships:      function (relationships) {
            relationships = relationships || {};
            var self_type = this.type;
            for (var relationship_index in relationships) {
                if (!relationships.hasOwnProperty(relationship_index)) continue;
                var actual_relationship = relationships[relationship_index];
                /**
                 * If the index is not existent or not an object, no usable data is there
                 */
                if (!actual_relationship || !(typeof actual_relationship === "object")) continue;
                /**
                 * The '_meta' index is essential for identifying the mapped object's type (imperfect, I know, but hey)
                 */
                if (!actual_relationship._meta) continue;
                if (!actual_relationship.items) continue;
                var relationship_items = actual_relationship.items;
                for (var other_model_id in relationship_items) {
                    if (!relationship_items.hasOwnProperty(other_model_id) || !$.isNumeric(other_model_id)) continue;
                    var mapped_props = relationship_items[other_model_id];
                    if (!mapped_props || !(typeof mapped_props === "object")) continue;
                    var map = mapped_props._map || false;
                    if (!map) continue;
                    /** @type {*|{_model_type:string}} */
                    var other_model = mapped_props.model;

                    /**
                     * @type {string} The Mapped Model type
                     */
                    var other_model_type;

                    if (!!other_model && !!other_model._model_type) other_model_type = other_model._model_type;

                    /**
                     * If there is a '_linked_entities' index in '_meta', use that.
                     * Right now, this only takes into account relationships between two things. Make this stop?
                     */
                    if (!other_model_type && !!actual_relationship._meta._linked_entities) {
                        var linked_entities = actual_relationship._meta._linked_entities;

                        //If there is only one entity type
                        if (linked_entities.length === 1) {
                            other_model_type = linked_entities[0];
                        } else {
                            //When there are other entities, check to see the first index that doesn't match the
                            other_model_type = linked_entities[0];
                            for (var i = 0; i < linked_entities.length; i++) {
                                var possible_other_model_type = linked_entities[i];
                                if (possible_other_model_type != self_type) {
                                    other_model_type = possible_other_model_type;
                                }
                            }
                        }
                    }
                    // If we don't know the other model type, skip it
                    if (!other_model_type) continue;
                    var self           = this;
                    /**
                     * Initialize the MvCombo of the other model and add the relationship to this MvCombo
                     */
                    var when_loaded_fn = (function (other_model_type, other_model, id, self, map, relationship_index) {
                        return function () {
                            var smOtherType = Sm.Entities[other_model_type];
                            if (!smOtherType) return;
                            /** @type Sm.Core.MvWrapper*/
                            var otherWrapper = smOtherType.Wrapper;
                            if (!otherWrapper) return;
                            /** @type {*|Sm.Core.MvCombo} */
                            var other_MV = otherWrapper.init_MvCombo({
                                model: other_model,
                                id:    id
                            });
                            /**
                             * Add the relationship
                             */
                            if (other_MV && other_MV.Identity) {
                                Sm.loaded.when_loaded([self.type + '__core', other_MV.type + '__core'], function () {
                                    self.add_relationship(other_MV, {
                                        map:                map,
                                        relationship_index: relationship_index,
                                        position:           map.position || 1,
                                        silent:             true
                                    }).catch(function (e) {
                                        Sm.CONFIG.DEBUG && console.log(e)
                                    });
                                }, 'add_rel_to_' + self.type);
                            }
                        }
                    })(other_model_type, other_model, other_model_id, self, map, relationship_index);

                    //When the other model type is loaded, add the relationship
                    if (Sm.loaded.is_loaded(other_model_type + '__core')) {
                        when_loaded_fn();
                    } else {
                        Sm.loaded.when_loaded(other_model_type + '__core', when_loaded_fn, 'add_rel_to_other_');
                    }
                }
                delete relationships[relationship_index];
            }
            return relationships;
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Add a View to the MvCombo
         * @param View
         * @param {HTMLElement|Node|boolean=}        context_element           The parent element of the View's element meant to keep track of relationship
         * @param {{}=}                      settings                  Settings
         * @param {string=}                  settings.display_type     The display type of the element. I feel like this is a code smell
         * @return {*}
         */
        addView:                           function (View, context_element, settings) {
            settings        = settings || {};
            var self_entity = Sm.Entities[this.type];

            var ViewType_ = self_entity.View;
            if (!ViewType_) return false;

            var _MvCombo = this;
            var Model    = this.Model;

            if (View instanceof ViewType_) {
                //set the View's model
                View.model = Model;
                //set the MvCombo of the View
                if (!View.MvCombo) View.setMvCombo(_MvCombo);

                //If we're adding the View, remove the first defaultViewList
                if (!!this.defaultViewList && !!this.defaultViewList.length) this.removeView(this.defaultViewList[0]);

                if (!context_element && document.body.contains(View.el.parentNode))
                    context_element = View.el.parentNode;
                View.referenceElement = context_element || View.referenceElement || false;
            } else {
                /** @type {{el:HTMLElement|boolean, model:Sm.Core.SmModel}} Properties to initialize the View */
                var view_props = {
                    model:        Model,
                    el:           false,
                    display_type: settings.display_type || 'full'
                };
                // If it's an element, initialize the View based on that
                if (Sm.Core.util.isElement(View)) {
                    view_props.el = View;
                    View          = new ViewType_(view_props);
                    View.setMvCombo(_MvCombo);
                    if (!View.referenceElement) {
                        if (!context_element && document.body.contains(View.el.parentNode))
                            context_element = View.el.parentNode;
                        View.referenceElement = context_element || false;
                    }

                    if (!!this.defaultViewList && !!this.defaultViewList.length) {
                        this.removeView(this.defaultViewList[0])
                    }
                } else {
                    //If there are any default Views, return the first one
                    !this.defaultViewList && (this.defaultViewList = []);
                    if (this.defaultViewList.length) return this.defaultViewList[0];
                    View = new ViewType_(view_props);
                    if (!!context_element && this.ViewList.length) {
                        var check    = false;
                        var ViewList = this.ViewList;
                        for (var i = 0; i < ViewList.length; i++) {
                            var view_id = ViewList[i];
                            var newView = this.Views[view_id];
                            if (newView.referenceElement == context_element) {
                                check = true;
                                return newView;
                            }
                        }
                    }
                    this.defaultViewList.push(View.cid);
                    View.setMvCombo && View.setMvCombo(_MvCombo);
                    if (!context_element && document.body.contains(View.el.parentNode))
                        context_element = View.el.parentNode;
                    View.referenceElement = context_element;
                }
            }
            if (!(View.cid in this.ViewList)) {
                this.Views[View.cid] = View;
                this.ViewList.push(View.cid);
            }
            return View;
        },
        /**
         * No longer relate this MvCombo to the View with cid ____
         * @alias Sm.Core.MvCombo#removeView
         * @param cid
         */
        removeView:                        function (cid) {
            if (cid in this.Views) delete  this.Views[cid];

            var ViewToRemove;
            if (this.defaultViewList && (ViewToRemove = this.defaultViewList.indexOf(cid)) > -1) {
                this.defaultViewList.splice(ViewToRemove, 1);
            }

            if (this.ViewList && (ViewToRemove = this.ViewList.indexOf(cid)) > -1) {
                this.ViewList.splice(ViewToRemove, 1);
            }
        },
        /**
         * Retrieve a view based on the cid, or a reference element
         * @alias Sm.Core.MvCombo#getView
         * @param settings
         * @param {string=}         settings.cid                  The cid, unique id created by Backbone.js, of the View
         * @param {HTMLElement=}    settings.reference_element    An element that is related to this View in the desired way
         * @param {boolean=false}   settings.strict               Should we create the View if we couldn't find it?
         * @param {string=}         settings.display_type         How should the view be displayed
         * @return {*}
         */
        getView:                           function (settings) {
            settings              = settings || {};
            var cid               = settings.cid || false;
            var reference_element = settings.reference_element || false;
            var strict            = !!settings.strict;
            var display_type      = settings.display_type;
            var View;
            //If there is a CID and we are being strict, return false if there is no match and true otherwise
            if (cid) {
                if (this.Views[cid]) return this.Views[cid];
                if (strict) return false;
            }
            var returnView = false;
            if (reference_element && !!this.ViewList.length) {
                var potential_view = false;
                /** @this {Sm.Core.SmView} */
                this.forEachView(function () {
                    if (!View && this.referenceElement == reference_element) View = this;
                    if (!this.referenceElement) potential_view = this;
                });
                if (View) {
                    returnView = View;
                } else if (!View && !strict) {
                    returnView = potential_view ? potential_view : this.addView(null, reference_element, {display_type: display_type});
                }
            }
            returnView = !returnView ? this.addView(null, reference_element, {
                display_type: display_type
            }) : returnView;
            if (typeof  returnView == "string") {
                return this.getView({
                    cid:    returnView,
                    strict: true
                });
            }
            return returnView;
        },
        /**
         * Apply a callback to each View associated with this MvCombo with the View being used as the 'this' parameter
         * @alias Sm.Core.MvCombo#forEachView
         * @param {function}    callback        The function to be run
         * @param {Array=}      callback_args   Arguments to be applied to the function
         */
        forEachView:                       function (callback, callback_args) {
            if (typeof callback === "function") {
                var view_ids = this.ViewList;
                for (var v = 0; v < view_ids.length; v++) {
                    var v_i = view_ids[v];
                    !!this.Views[v_i] && callback.apply(this.Views[v_i], callback_args)
                }
            }
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        focus:                             function (settings, View) {
            this.do_standard_interaction('focus', settings, View);
        },
        blur:                              function (settings, View) {
            this.do_standard_interaction('blur', settings, View);
        },
        activate:                          function (settings, View) {
            this.do_standard_interaction('activate', settings, View);
        },
        select:                            function (settings, View) {
            this.do_standard_interaction('select', settings, View);
        },
        deselect:                          function (settings, View) {
            this.do_standard_interaction('deselect', settings, View);
        },
        deactivate:                        function (settings, View) {
            this.do_standard_interaction('deactivate', settings, View);
        },
        do_standard_interaction:           function (action, settings, View) {
            action                       = action || 'focus';
            var status_name, is_negative = false;
            var action_index             = action;
            var action_category          = action;
            switch (action) {
                case "blur":
                    is_negative = true;
                case "focus":
                    action_category = "focus";
                    action_index    = 'focused_Views';
                    status_name     = 'focused';
                    break;
                case "deselect":
                    is_negative = true;
                case "select":
                    action_category = "select";
                    action_index    = 'selected_Views';
                    status_name     = 'selected';
                    break;
                case "deactivate":
                    is_negative = true;
                case "activate":
                    action_category = "activate";
                    action_index    = 'activated_Views';
                    status_name     = 'active';
                    break;
                default :
                    return false;
            }
            if ((arguments.length == 2 || typeof View == "undefined") && typeof settings === "object" && settings.cid) View = settings;
            var self_type               = this.type;
            /**
             * @type {Sm.Core.MvWrapper|*}
             */
            var Wrapper                 = this.Wrapper || Sm.Entities[self_type].Wrapper;
            var self                    = this;
            var obj                     = {MvCombo: self};
            this.ViewMaps[action_index] = this.ViewMaps[action_index] || {};
            var view_map_action         = this.ViewMaps[action_index];
            var count                   = 0;
            for (var prop in view_map_action) {
                if (!view_map_action.hasOwnProperty(prop)) continue;
                count++;
            }
            var act_on_view = function () {
                /** @this {Sm.Core.SmView}  */
                if (!this[action]) return;
                var p_q_res = this.queryPermission(action_category);
                if (p_q_res === null) p_q_res = this.queryPermission('view');
                if (!p_q_res && p_q_res !== null) {
                    Sm.CONFIG.DEBUG && console.log(action_category, p_q_res);
                    return false;
                }
                if (action == 'focus' && !!View && View != this) {
                    return self.blur(this);
                }
                if (is_negative) {
                    if (view_map_action[this.cid]) {
                        count--;
                        delete view_map_action[this.cid]
                    }
                } else {
                    view_map_action[this.cid] = this.Identity;
                    count++;
                }
                this[action]();
            };
            if (!!View) act_on_view.call(View);
            else this.forEachView(act_on_view);
            if (this.queryStatus(status_name) !== !!count) {
                this.setStatus(status_name, !!count);
                if (Wrapper[action + '_MV']) {
                    if (action == 'focus') {
                        //Make sure there are no other focused Views
                        var focused_MVs = Wrapper.MvMaps.focused_MVs;
                        for (var MV_r_id in focused_MVs) {
                            if (!focused_MVs.hasOwnProperty(MV_r_id)) continue;
                            if (MV_r_id != this.Identity.r_id) {
                                var Mv = focused_MVs[MV_r_id].getResource();
                                if (Mv) Mv.blur();
                            }
                        }
                    }
                    Wrapper[action + '_MV'](obj);
                }
            }
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Because MvCombos can only be related to something in one way (flawed? Maybe...) Return the Relationship
         * @param MvIdentity {string|{}|Sm.Core.MvCombo|*|Sm.Core.Identity} The Identity, MvCombo, or r_id of the Identity of the MvCombo that we are looking for
         * @return {Sm.Core.Relationship|boolean}
         */
        getRelationship:                   function (MvIdentity) {
            if (!MvIdentity) return false;

            if (MvIdentity.Identity) MvIdentity = MvIdentity.Identity;
            var r_id = typeof MvIdentity === "string" ? MvIdentity : MvIdentity.r_id;
            return this.relationship_map[r_id] || false;
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Get the details about how two entities should be related to each other
         * @param {object}              settings
         * @param {string}              settings.map_index
         * @param {Sm.Core.MvCombo}     settings.MvCombo
         * @param {{}}                  settings.map
         * @param {boolean}             settings.is_reciprocal
         * @return {{relationship: Sm.Core.Relationship|boolean, self_map_index: string|boolean, secondary_map_index: string|boolean}}
         * @private
         */
        _get_relationship_details:         function (settings) {
            settings          = settings || {};
            var Mv            = settings.MvCombo;
            var type          = Mv.type;
            var self_type     = this.type;
            var is_reciprocal = !!settings.is_reciprocal;
            var self_map_index, secondary_map_index, relationship;
            var map           = settings.map || {};

            var lc           = type.toLowerCase();
            /**
             * The result of the hook. This should have details about whether or not it matters that the relationship is reciprocal (i.e. primary_ and secondary_ stuff)
             * The index of this in the relationship
             * The index of the other one in the relationship
             * An object to be used as the map. This is not touched right now, but might be useful if mutating the actual map object
             * @type {*|{map, reciprocity_matters, self_index, other_index}|{map: *, reciprocity_matters: boolean, self_index: string, other_index: string}}
             * @private
             */
            var _hook_result = this._relationship_detail_hook(type, settings, map, lc);

            var reciprocity_matters = !!_hook_result.reciprocity_matters;
            var self_index          = _hook_result.self_index;
            var other_index         = _hook_result.other_index;

            if (is_reciprocal && reciprocity_matters) {
                self_map_index      = other_index;
                secondary_map_index = self_index;
            } else {
                self_map_index      = self_index;
                secondary_map_index = other_index;
            }

            //If both indices exist (this and the other one) instantiate a relationship
            if (self_map_index && secondary_map_index) {
                relationship = new Sm.Core.Relationship({
                    linked_entities: [self_type, type],
                    rel_indexes:     [self_map_index, secondary_map_index]
                });
                (map[self_map_index] = this.Identity.id);
                (map[secondary_map_index] = Mv.Identity.id);
            }

            return {
                relationship:        relationship || false,
                self_map_index:      self_map_index || false,
                secondary_map_index: secondary_map_index || false
            }
        },
        /**
         * A customizable hook that returns some details based on the type of the other MvCombo, the settings, map and the lowercase type of the other MvCombo
         * By default, the indices are based on the type. We just convert the entity type to lowercase, add _id, and call it a day.
         * If there is reciprocity, we add primary_ and secondary_ prefixes. Sometimes we might need to use the map or mutate it, so that's why that's there
         * @param {string}  type                The type of the other MvCombo
         * @param {object}  settings            settings
         * @param {object}  map                 The map object of the relationship
         * @param {string}  lowercase_type      Lowercase version of the other MvCombo's type
         * @return {{map: *, reciprocity_matters: boolean, self_index: string, other_index: string}}
         * @private
         */
        _relationship_detail_hook:         function (type, settings, map, lowercase_type) {
            var reciprocity_matters = false;
            var other_index         = lowercase_type + '_id';
            var self_index          = this.type.toLowerCase() + '_id';
            if (other_index == self_index) {
                reciprocity_matters = true;
                if (!!settings.is_reciprocal) {
                    self_index  = 'secondary_' + self_index;
                    other_index = 'primary_' + other_index;
                } else {
                    self_index  = 'primary_' + self_index;
                    other_index = 'secondary_' + other_index;
                }
            }
            return {
                map:                 map,
                reciprocity_matters: reciprocity_matters,
                self_index:          self_index,
                other_index:         other_index
            }
        },
        /**
         * Create a relationship between two entities, then create a
         * @see Sm.Core.Relationship
         * @see Sm.Core.MvCombo.relationships
         * @see Sm.Core.MvCombo.reciprocal_relationships
         * @see Sm.Core.MvCombo._prompt_relationship_add
         *
         * @param {Sm.Core.MvCombo|Sm.Core.Identifier|*}     OtherMvCombo
         * @param {{}}                  settings
         * @param {string=}             settings.type                       The type of MvCombo the other entity is
         * @param {{}}                  settings.map                        The map (if existent) between the two entities
         * @param {boolean=}            settings.is_reciprocal              Is the relationship only being reciprocated?
         * @param {boolean=}            settings.update_indices             Should we update the indices of the RelationshipIndex?
         * @param {boolean=}            settings.silent                     Is the relationship on the server?
         * @param {boolean=}            settings.prompt                     Should we prompt for information about the Relationship?
         * @param {string}              settings.relationship_index         Where to add the relationship
         * @param {int}                 settings.position                   The position at which to add the relationship
         * @param {int=0}               settings.context_r_id               If there is a context, this is the r_id of it
         * @param {Sm.Core.SmView}      settings.OtherView
         * @param {Sm.Core.Relationship=}ReciprocalRelationship            The other relationship. What are we reciprocating?
         * @return {Promise}
         */
        add_relationship:                  function (OtherMvCombo, settings, ReciprocalRelationship) {
            this.relationship_map  = this.relationship_map || {};
            settings               = settings || {};
            var silent             = !!settings.silent;
            var map                = settings.map || {};
            var relationship_index = settings.relationship_index;
            var prompt             = settings.prompt || !OtherMvCombo || !relationship_index;
            var update_indices     = typeof settings.update_indices !== "undefined" ? !!settings.update_indices : true;
            if (prompt) {return this._prompt_relationship_add(OtherMvCombo, settings);}

            var is_reciprocal                 = !!settings.is_reciprocal;
            var reciprocal_relationship_index = false;
            var self_type                     = this.type;
            // This needs type-hinting
            var selfSm = Sm.Entities[self_type];
            if (!!OtherMvCombo && OtherMvCombo.r_id && OtherMvCombo.getResource) {
                OtherMvCombo = OtherMvCombo.getResource();
            }
            if (!selfSm) throw  "No Sm for " + this.type;

            /** @type {Sm.Core.Meta} */
            var selfSmMeta;
            selfSmMeta = selfSm.Meta;
            if (!selfSmMeta) throw  "No Meta for " + this.type + " trying to add relationship";

            //If there is a nickname for a particular relationship, get that nickname (e.g. the nickname for "sections" is "definitions" in the dictionary
            if (selfSmMeta.relationship_aliases[relationship_index]) {
                relationship_index = selfSmMeta.relationship_aliases[relationship_index];
            }

            //Try to figure out the possible relationships this MvCombo could be in if we don't know the index

            var potential_relationships = selfSmMeta.get_possible_relationship_indices({is_reciprocal: is_reciprocal, OtherMvCombo: OtherMvCombo});
            //if (this.type == 'Section' && OtherMvCombo.type == 'Dictionary') Sm.CONFIG.DEBUG && console.log(this.type, ' - ', potential_relationships, ' - ', is_reciprocal);
            if (potential_relationships.length == 1) {
                //If there is only one possible relationship type,
                if (!relationship_index) relationship_index = potential_relationships[0];
            } else if (potential_relationships.length && !potential_relationships[0]) {
                //If the first index of the relationship is "null", then we are dealing with the relationship indices that are reciprocal (this Mv can reciprocate relationships in this index)
                //E.g. 'dictionaries' in Dictionary. Dictionary doesn't have relationships in this index, but it can be in this index for other Entities
                relationship_index = relationship_index || potential_relationships[1];

                //These relationships are the relationships opposite of the other one
                //todo Is this right?
                var anti_reciprocal_potential_relationships = selfSmMeta.get_possible_relationship_indices({is_reciprocal: !is_reciprocal, OtherMvCombo: OtherMvCombo});
                if (is_reciprocal && potential_relationships[0] === null && !!anti_reciprocal_potential_relationships.length) {
                    if (anti_reciprocal_potential_relationships.length == 1)
                        reciprocal_relationship_index = anti_reciprocal_potential_relationships[0];

                }
            }
            if (!selfSm) throw  "No Sm for " + this.type;
            if (!selfSmMeta) throw  "No Meta for " + this.type + " trying to add relationship";
            if (!map) throw  "No Map for " + this.type;
            if (!relationship_index) throw  "No RelationshipIndex for " + this.type;
            if (!OtherMvCombo) throw  "No OtherMvCombo for " + this.type;

            //This is a cheat. Sometimes instead of saying "micros" or something, we could just say "reciprocal_micros". This means that the relationship will be reciprocal by definition
            if (relationship_index.indexOf('reciprocal_') === 0) {
                is_reciprocal               = true;
                settings.relationship_index = relationship_index = relationship_index.split('_')[1];
            }
            /**
             * The first index that we're adding at. This is going to add at either the reciprocal or non-reciprocal index
             * @type {{}<string, Sm.Core.RelationshipIndex>} */
            var self_relationships      = !is_reciprocal ? this.relationships : this.reciprocal_relationships;
            /**
             * The second index we're adding at. This is going to be the index opposite the first one
             * @type {Sm.Core.MvCombo.relationships|Sm.Core.MvCombo.reciprocal_relationships} */
            var secondary_relationships = !!is_reciprocal ? this.relationships : this.reciprocal_relationships;
            /**
             * This is the first relationship index, the one that aligns with the reciprocity
             * @type {Sm.Core.RelationshipIndex}
             */
            var RelationshipIndex_      = self_relationships[relationship_index];
            if (!OtherMvCombo.Identity) return Promise.reject('There is no Identity to accompany the MvCombo');

            if (!RelationshipIndex_) return Promise.reject('No relationship index to match ' + relationship_index + ' in ' + this.type);

            var self              = this;
            /**
             * This is the object to use when resolving the promise
             * @type {{result: boolean, SelfMvCombo: Sm.Core.MvCombo, OtherMvCombo: (Sm.Core.MvCombo|Sm.Core.Identifier|*), RelationshipIndex: Sm.Core.RelationshipIndex, OtherView: Sm.Core.SmView}}
             */
            var resolution_object = {
                result:            false,
                SelfMvCombo:       self,
                OtherMvCombo:      OtherMvCombo,
                RelationshipIndex: RelationshipIndex_,
                OtherView:         settings.OtherView,
                map_indices:       []
            };


            /**
             * This is the secondary relationship index.
             * This is the one that does not align with the reciprocity.
             * Sometimes we need to have relationships in both reciprocal and main indices
             *      (e.g. 'dictionaries' is reciprocating a 'definition' relationship, but there is also a 'definitions' index in Dictionary)
             */
            var SecondaryRelationshipIndex;
            if (!!reciprocal_relationship_index) SecondaryRelationshipIndex = secondary_relationships[reciprocal_relationship_index];
            //If we are reciprocating the relationship, add the relationship in the reciprocal
            if (!!ReciprocalRelationship) {
                //Add at the reciprocal index
                resolution_object.result = !!RelationshipIndex_.add_item(ReciprocalRelationship, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);
                //Add at the secondary relationship index if the relationship can also be non-reciprocal
                if (SecondaryRelationshipIndex) SecondaryRelationshipIndex.add_item(ReciprocalRelationship, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

                //Add the relationship to the relationship map
                this.relationship_map[OtherMvCombo.Identity.r_id] = ReciprocalRelationship;
                resolution_object.Relationship                    = ReciprocalRelationship;
                return Promise.resolve(resolution_object);
            }

            /**
             * Based on the MvCombo, map, and reciprocity, get
             * * the constructor for the relationship object that will be used to link the two MvCombos
             * * The index at which the first relationship will be added
             */
            var relationshipDetails = this._get_relationship_details({
                map:                map,
                MvCombo:            OtherMvCombo,
                is_reciprocal:      is_reciprocal,
                relationship_index: relationship_index
            });
            /** @type {Sm.Core.Relationship} */
            var Relationship_       = relationshipDetails.relationship || new Sm.Core.Relationship;
            var self_map_index      = relationshipDetails.self_map_index;
            var secondary_map_index = relationshipDetails.secondary_map_index;

            if (OtherMvCombo.Identity === this.Identity) return Promise.reject('Cannot add the same MV');
            map.position                   = settings.position || map.position;

            //Initialize the relationship's details
            Relationship_
                .setMap(map)
                .link_Mv(this, self_map_index)
                .link_Mv(OtherMvCombo, secondary_map_index);
            resolution_object.Relationship = Relationship_;
            resolution_object.map_indices  = [
                self_map_index,
                secondary_map_index
            ];
            var result_of_rel_add          = resolution_object.result = !!RelationshipIndex_.add_item(Relationship_, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

            //todo does this do anything? I think so
            if (SecondaryRelationshipIndex) SecondaryRelationshipIndex.add_item(Relationship_, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

            //If the relationship is not reciprocal, add it to the other MvCombo as well
            settings.is_reciprocal = !is_reciprocal;
            //Add the relationship to the relationship map
            this.relationship_map[OtherMvCombo.Identity.r_id] = Relationship_;
            return OtherMvCombo.add_relationship(this, settings, Relationship_).then(function (e) {
                self.emit('add_relationship', resolution_object);
                if (result_of_rel_add && !!e.result) return resolution_object;
                Sm.CONFIG.DEBUG && console.log(e, result_of_rel_add);
                throw "Could not add relationship index";
            });
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * This is the final mutation point for the relationships and is meant to be overridden in inheriting classes.
         * All this does is ask for the details to create the relationship. Things like position prompting, relationship index deciding, etc
         * @see Sm.Core.MvCombo._prompt_relationship_add
         * @param OtherMvCombo
         * @param settings
         * @return {Promise}
         * @protected
         */
        _continue_prompt_relationship_add: function (OtherMvCombo, settings) {
            var self_Sm = Sm.Entities[this.type];
            if (!self_Sm) return Promise.reject('No SM');
            var Meta_    = self_Sm.Meta;
            var opposite = false;
            return (new Promise(function (resolve, reject) {
                var potential_relationships = Meta_.get_possible_relationship_indices({OtherMvCombo: OtherMvCombo, is_reciprocal: settings.is_reciprocal});
                //If there is only one possible relationship based on the type or whatever, that's the one we're going to use. No need to prompt
                if (potential_relationships.length == 1) settings.relationship_index = potential_relationships[0];
                if (!settings.relationship_index) {
                    //If we can't find stuff out about the relationship, don't even bother
                    if (!Meta_ || !Meta_.get_relationship_type) {
                        reject();
                        return;
                    }

                    //Ask about where to add the relationship
                    settings.relationship_index = prompt('What is the relationship type?');
                    if (settings.relationship_index.indexOf('reciprocal_') === 0 || settings.relationship_index.indexOf('!') === 0) {
                        settings.relationship_index = settings.relationship_index.replace('reciprocal_', '').replace('!', '');
                        opposite                    = true;
                        Sm.CONFIG.DEBUG && console.log(settings.relationship_index, opposite);
                    }
                    settings.relationship_index = Meta_.get_relationship_type({type: 'index'}, settings.relationship_index);
                }
                if (!settings.relationship_index) {
                    reject && reject();
                    return;
                }
                // Ask about which position to add the relationship
                if (!settings.position && settings.position !== 0) {
                    settings.position     = prompt('At which position should we add the relationship?');
                    settings.position     = settings.position || 0;
                    settings.map.position = settings.position;
                    //6 4 7 8 5 1 2
                }

                //Should we clone the View, or just relocate it? This is useful if we are replacing a relationship versus adding a new one
                //todo temporary, not good for debugging
                if (!!settings.OtherView && !!settings.OtherView.MvCombo) {
                    var clone = true || parseInt(prompt('Clone?'));
                    settings.OtherView.MvCombo.blur();
                    if (!!clone) (settings.OtherView = settings.OtherView.clone());
                }
                resolve({
                    opposite: opposite
                });
            }));
        },
        /**
         * Build the MvCombo in a "new relationship" scenario. Called from Sm.Core.MvCombo._prompt_relationship_add
         * Meant to be overridden
         * @see Sm.Core.MvCombo._prompt_relationship_add
         * @param otherWrapper
         * @param settings
         * @return {Promise}
         * @private
         */
        _build_other_MV:                   function (otherWrapper, settings) {
            return otherWrapper.build_MV(settings);
        },
        /**
         * Prompt the addition of the relationship.
         * This is called by the MvCombo add_relationship function, and either throws an error or fills in all of the blanks before continuing to add the relationship
         * @see Sm.Core.MvCombo.add_relationship
         * @param OtherMvCombo
         * @param settings
         * @return {*}
         * @private
         */
        _prompt_relationship_add:          function (OtherMvCombo, settings) {
            settings          = settings || {};
            settings.map      = settings.map || {};
            settings.position = settings.map.position = (settings.position || settings.map.position);
            var self               = this;
            settings.prompt_called = settings.prompt_called || 0;
            settings.prompt_called++;
            if (settings.prompt_called == 3) return Promise.reject('Error adding relationship');
            if (!OtherMvCombo && !settings.type) return Promise.reject('No relationship and no type');

            //If the Other MvCombo doesn't exist, try to create it
            if (!OtherMvCombo) {
                var otherSm = Sm.Entities[settings.type];
                if (!otherSm) return Promise.reject('No type to accompany ' + settings.type);
                /**
                 * @type Sm.Core.MvWrapper
                 */
                var otherWrapper = otherSm.Wrapper;
                if (!otherWrapper || settings.prompt_called == 2) return Promise.reject('Called twice and still no MvCombo');

                //After we build the other MV, try to add the relationship
                //Because this function is called in a function it calls (add_relationship), check to see how many times the exchange has gone. After trying a couple of times, stop to prevent a loop
                return this._build_other_MV(otherWrapper, settings)
                    .then(function (result) {return self.add_relationship(result, settings);})
                    .catch(function (error) {
                               Sm.CONFIG.DEBUG && console.log(error);
                               throw error;
                           });
            }
            settings.prompt = false;
            self.blur();

            return this._continue_prompt_relationship_add(OtherMvCombo, settings).then(function (result) {
                if (result && result.opposite) {
                    Sm.CONFIG.DEBUG && console.log(result, OtherMvCombo);
                    return OtherMvCombo.add_relationship(self, settings);
                } else {
                    return self.add_relationship(OtherMvCombo, settings);
                }
            }).catch(function (error) {
                Sm.CONFIG.DEBUG && console.log(error);
                throw error;
            });
        },
        /**
         * @alias Sm.Core.MvCombo#_prompt_destroy
         * @param settings{{}=}
         * @param settings.View
         * @return {Promise}
         * @private
         */
        _prompt_destroy:                   function (settings) {
            if (confirm('Are you sure you want to delete ' + this.type + ' ' + this.Identity.ent_id)) {
                return this._continue_destroy(settings);
            }
            return Promise.reject('canceled destroy');
        },
        /**
         * @alias Sm.Core.MvCombo#_prompt_alias
         * @param settings {{}=}
         * @param settings.View
         * @return {Promise}
         * @private
         */
        _prompt_save:                      function (settings) {
            if (confirm('Are you sure you want to save ' + this.type + ' ' + this.Identity.ent_id)) {
                return this._continue_save(settings)
            }
            return Promise.reject('Canceled save');
        },
        /**
         * @alias Sm.Core.MvCombo#_continue_save
         * @param settings
         * @param settings.silent
         * @returns {*}
         * @private
         */
        _continue_save:                    function (settings) {
            var Model = this.Model;
            if (!Model) return Promise.reject(Sm.Errors.NonexistentModelError);
            var s    = Model.save(null, {patch: true, wait: true, silent: !!settings.silent}).then(function (res) {
                Sm.CONFIG.DEBUG && console.log(res);
                return res;
            });
            var self = this;
            return (s ? s : Promise.reject('Could not save the model'));
        },
        /**
         * @alias Sm.Core.MvCombo#_continue_destroy
         * @param settings{{}=}
         * @return {Promise}
         * @private
         */
        _continue_destroy:                 function (settings) {
            var Model = this.Model;
            if (!Model) return Promise.reject(Sm.Errors.NonexistentModelError);
            var Wrapper = Sm.Entities[this.type].Wrapper;
            var d       = Model.destroy();
            var self    = this;
            return (d ? d : Promise.reject()).then(function (response) {
                if (response && response.success) return response;
                throw response.error;
            }).then(Wrapper.destroy_MV.bind(Wrapper)).then(function () {self.setStatus('destroyed', true);});
        },
        /**
         *
         * @param {{}=}settings
         * @param settings.prompt
         * @param settings.success
         * @param settings.fail
         * @param settings.
         * @return {Promise}
         */
        save:                              function (settings) {
            try {
                settings     = settings || {};
                var prompt   = !!settings.prompt;
                var Wrapper_ = Sm.Entities[this.type].Wrapper;
                if (!Wrapper_) return Promise.reject('No Wrapper to match ' + this.type);
                if (prompt) return this._prompt_save(settings);
                return this._continue_save(settings);
            } catch (e) {
                Sm.CONFIG.DEBUG && console.log(e);
                return Promise.reject(e);
            }
        },
        /**
         *
         * @param settings
         * @param settings.prompt
         * @param settings.success
         * @param settings.fail
         * @param View
         * @return {*}
         */
        destroy:                           function (settings, View) {
            var prompt   = !!settings.prompt;
            var Wrapper_ = Sm.Entities[this.type].Wrapper;
            var self     = this;
            if (!Sm.Entities[this.type].Wrapper) return Promise.reject('No Wrapper to match ' + this.type);
            return (prompt ? this._prompt_destroy({View: View}) : this._continue_destroy(settings)).then(function (results) {
                self.forEachView(function () {this.destroy();});
                return results;
            });
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Return a relationship index or false
         * @param {string}                              type
         * @param {boolean=false}                       is_reciprocal
         * @return {Sm.Core.RelationshipIndex|boolean}
         */
        getRelationshipIndex:              function (type, is_reciprocal) {
            is_reciprocal     = !!is_reciprocal;
            var relationships = is_reciprocal ? this.reciprocal_relationships : this.relationships;
            if (relationships[type]) return relationships[type];
            return false;
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        toJSON:                            function () {
            var Model = this.Model;
            return Model.attributes;
        }
    });
    /**
     * Based on a function that returns the MvCombos that need to be accounted for, generate an array of all of the MvCombos that are going to replace another MvCombo,
     * and the MvCombos that they will be replacing. At the end, this replacement is registered (might be moved later).
     * In this, there may be a function that is called on each MvCombo that returns a list of what it should be replaced by
     * @alias Sm.Core.MvCombo.replace_MV
     * @param parameters
     * @param {Sm.Core.MvCombo}                 parameters.MvCombo
     * @param {boolean}                         parameters.replace_effective
     * @param {boolean=}                        parameters.is_reciprocal                Whether or not we are doing this reciprocally. If we are, we should adjust the Array that we are adding it to, because it should be different than the MvCombo that requested this information
     * @param {Sm.Core.Relationship=}           parameters.relationship                 The relationship that corresponds to why we are replacing this MvCombo
     * @param {int=0}                           parameters.iterations                   The iteration that we are on. Because this function is recursive, we must keep track of the iterations to prevent any excessive looping. Capped at 10 iterations ATM
     * @param {Sm.Core.MvCombo~list_items_fn}                        parameters.list_items_fn                A function that returns an object {
     * @param {Array<Sm.Core.MvCombo>=}         parameters.replaced_MVs
     * @param {Array<Sm.Core.MvCombo>=}         parameters.replacement_MVs
     * @param {Array<Sm.Core.Relationship>=}    parameters.replaced_relationships
     * @param {Array<Sm.Core.Relationship>=}    parameters.replacement_relationships
     * @param {Array<Sm.Core.MvCombo.r_id>}     parameters.items
     * @param {string}                          parameters.replacement_index
     * @param parameters.is_not_first
     * @return {{
            items:                      Array<Sm.Core.MvCombo>,
            replacement_MVs:            Array<Sm.Core.MvCombo>,
            replaced_MVs:               Array<Sm.Core.MvCombo>,
            replacement_relationships:  Array<Sm.Core.Relationship>,
            replaced_relationships:     Array<Sm.Core.Relationship>
        }}
     */
    Sm.Core.MvCombo.replace_MV = function (parameters) {
        var relationship_array_to_add;
        var array_to_add, array_to_search;
        var MvCombo           = parameters.MvCombo;
        var replace_effective = parameters.replace_effective;
        //If the action is reciprocal, this is what distinguishes it as such
        var is_reciprocal = !!parameters.is_reciprocal;
        //This is the relationship that caused this MvCombo to be brought up in this context
        var relationship              = parameters.relationship;
        /**
         * A function that returns an object of lists (relationships and items) based on what an MvCombo should be replaced by.
         * @callback Sm.Core.MvCombo~list_items_fn
         * @param MvCombo
         * @param {boolean=false}   is_reciprocal
         * @param {{items:  Array<Sm.Core.MvCombo>,replacement_MVs:  Array<Sm.Core.MvCombo>,replaced_MVs: Array<Sm.Core.MvCombo>,replacement_relationships:  Array<Sm.Core.Relationship>,replaced_relationships: Array<Sm.Core.Relationship>}}
         * @return {{relationships: [], items: []}}
         */
        var list_items_fn             = parameters.list_items_fn || function () {};
        parameters.replaced_MVs       = parameters.replaced_MVs || [];
        parameters.replacement_MVs    = parameters.replacement_MVs || [];
        parameters.items              = parameters.items || {};
        var is_not_first              = parameters.is_not_first || false;
        var replaced_relationships    = parameters.replaced_relationships || [];
        var replacement_relationships = parameters.replacement_relationships || [];
        /**
         * There is an error in which the arrays are opposite of what they should be if we start out reciprocally.
         * This function swaps the return value if that is the case. I'm sure there is a way to fix this, but for now, I'm just going to leave it
         * @param is_final_return
         * @return {{items, replacement_MVs, replaced_MVs, replacement_relationships: Array, replaced_relationships: Array}}
         */
        var get_return_value          = function (is_final_return) {
            var obj = {
                items:                     parameters.items,
                replacement_MVs:           is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs,
                replaced_MVs:              is_reciprocal ? parameters.replacement_MVs : parameters.replaced_MVs,
                replacement_relationships: is_reciprocal ? replaced_relationships : replacement_relationships,
                replaced_relationships:    is_reciprocal ? replacement_relationships : replaced_relationships
            };
            if (!!is_final_return && !is_not_first) {
                if (replace_effective && obj.replaced_MVs.length > 1) {
                    var r_id = MvCombo.r_id;
                    var pos  = obj.replaced_MVs.indexOf(r_id);
                    if (pos > -1) {
                        obj.replaced_MVs.splice(pos, 1);
                        obj.replaced_relationships.splice(pos, 1);
                    }
                }
                Sm.Core.MvWrapper.register_MV_replacement(obj.replaced_MVs, obj.replacement_MVs, parameters.replacement_indices);
            }

            return obj;
        };

        if (parameters.iterations > 10) return get_return_value();
        var rel_obj       = list_items_fn(MvCombo, is_reciprocal, get_return_value());
        var relationships = rel_obj.relationships || [];
        var MvComboList   = rel_obj.items || [];


        array_to_search           = is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs;
        array_to_add              = !is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs;
        relationship_array_to_add = !is_reciprocal ? replaced_relationships : replacement_relationships;


        //Add this r_id to an array of things to keep ore remove (depending on what we're doing)

        if (replace_effective) {
            //Prevent recursion
            parameters.replace_effective = false;
            //Get the effective MvCombos, iterate through them, and add them as being used
            var mv_obj = Sm.Core.MvWrapper.get_effective_MV(MvCombo);
            var Mvs    = mv_obj.MVs;
            //Sm.CONFIG.DEBUG && console.log('--- Effective ', Mvs, ' - this - ', [MvCombo.r_id]);
            //Sm.CONFIG.DEBUG && console.log(" --- List ", MvComboList.map(function (t) {return t.r_id;}));
            for (var i = 0; i < Mvs.length; i++) {
                var OtherMvCombo_r_id               = Mvs[i];
                if (parameters.items[OtherMvCombo_r_id]) continue;
                array_to_add.push(OtherMvCombo_r_id);
                parameters.items[OtherMvCombo_r_id] = Sm.Core.MvWrapper.convert_to_MvCombo(OtherMvCombo_r_id);
                relationship_array_to_add.push(relationship || null);
            }
        } else {
            //Keep track of the items that we have accessed (makes things a little bit easier I think)
            parameters.items[MvCombo.r_id] = MvCombo;
            array_to_add.push(MvCombo.r_id);
            relationship_array_to_add.push(relationship || null);
        }

        //Iterate through all of this MvCombo's items/relationships to see if they need to be added to an array
        for (var j = 0; j < MvComboList.length; j++) {
            /** @type {Sm.Entities.Section.MvCombo} */
            var SecondMvCombo = MvComboList[j];

            if (array_to_search.indexOf(SecondMvCombo.Identity.r_id) < 0) {
                parameters.MvCombo       = SecondMvCombo;
                parameters.is_reciprocal = !is_reciprocal;
                parameters.relationship  = relationships[j];
                parameters.is_not_first  = true;
                Sm.Core.MvCombo.replace_MV(parameters)
            }
        }
        return get_return_value(true);
    };
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        Sm.loaded.add('Core_MvCombo');
    }, 'Core_MvCombo');
});
define("Sm-Core-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
define('Sm/urls/api',['require', 'Sm', 'Sm/urls/main'], function (require) {
    var order   = function (ctxt, self_plural) {
        var url = '';
        ctxt.user_id && ( url += 'users/' + ctxt.user_id + '/');
        ctxt.page_id && ( url += 'pages/' + ctxt.page_id + '/');
        ctxt.concept_id && ( url += 'concepts/' + ctxt.concept_id + '/');
        ctxt.dimension_id && ( url += 'dimensions/' + ctxt.dimension_id + '/');
        ctxt.collection_id && ( url += 'collections/' + ctxt.collection_id + '/');
        ctxt.dictionary_id && ( url += 'dictionaries/' + ctxt.dictionary_id + '/');
        ctxt.primary_id && ctxt.primary_id != id && ( url += self_plural + '/' + ctxt.primary_id + '/');
        ctxt.secondary_id && ctxt.secondary_id != id && ( url += self_plural + '/' + ctxt.secondary_id + '/');
        return url;
    };
    Sm.urls     = Sm.urls || {};
    Sm.urls.api = {
        /**
         *
         * @param settings
         * @param settings.type
         * @param settings.MvCombo
         * @param settings.id
         * @param settings.fetch
         * @param settings.context
         * @param settings.url
         * @param settings.Relationship
         * @param settings.find_usages
         * @param settings.relationship_type
         *
         */
        generate: function (settings) {
            try {
                settings = !!settings && typeof  settings === 'object' ? settings : {};
                var BASE_API_URL = Sm.urls.base_url + 'api/';
                if(settings.Relationship){
                    var Relationship = settings.Relationship;
                    var map_links = Relationship._map_links;
                    var unjoined_url   = [];
                    for (var index in map_links) {
                        if (!map_links.hasOwnProperty(index)) continue;
                        /** @type {Sm.Core.Identifier} The Identity of the linked MvCombos */
                        var Identity = map_links[index];
                        Sm.CONFIG.DEBUG && console.log(Identity);
                        if (Identity.type && Identity.id) unjoined_url.push(Identity.type + '/' + Identity.id);
                    }
                    return BASE_API_URL + unjoined_url.join('/');
                }
                if(settings.url) {
                    return BASE_API_URL + settings.url.replace('//', '/');
                }
                var _Mv  = settings.MvCombo;
                var id   = settings.id;
                if (!id && !!_Mv) id = _Mv.id;
                id            = id || null;
                var fetch     = settings.fetch;
                var ctxt      = settings.context || {
                        page_id:       null,
                        section_id:    null,
                        concept_id:    null,
                        primary_id:    null,
                        secondary_id:  null,
                        collection_id: null,
                        dimension_id:  null,
                        dictionary_id: null
                    };
                var self_type = (!!_Mv) ? _Mv.type : settings.type;
                var url       = '';

                var find_usages = !!settings.find_usages;

                var SelfSm = Sm.Entities[self_type];
                if (!SelfSm) return false;
                var self_plural = SelfSm.Meta.lower_plural[self_type];
                url += order(ctxt, self_plural);
                if (!fetch) {
                    url += self_plural + '/' + ((!!id) ? id + '/' : '');
                } else {
                    url += fetch.toLowerCase() + '/';
                }

                if (url.length) {
                    var url_arr = [];

                    find_usages && url_arr.push('usages=1');
                    !!settings.relationship_type && url_arr.push('relationship_type=' + settings.relationship_type);

                    if (url_arr.length) {
                        url += '?' + url_arr.join('&');
                    }
                } else {
                    return false;
                }

                return BASE_API_URL + url.replace('//', '/');
            } catch (e) {
                Sm.CONFIG.DEBUG && console.log(e);
                return '';
            }
        }
    };
    return Sm.urls.api;
});
/**
 * Created by Sam Washington on 12/20/15.
 */
define('Sm/urls/main',['require','Sm/urls/api'],function (require) {
    /**
     * @name Sm.urls
     * An object containing the URL generators of the day
     * @type {{}|*}
     */
    Sm.urls             = Sm.urls || {};
    Sm.urls.base_url    = 'http://s.dev.spwashi.com/';
    Sm.urls.entity_urls = {
        page: function (context, alias) {
            var location = arguments.join('/');
            if (!location || !location.length) return false;
            return Sm.urls.base_url + 'p/' + location.replace(/^\/|\/+$/gm, '');
        }
    };
    Sm.loaded.add('urls');
    require('Sm/urls/api')
});
/**
 * Created by Sam Washington on 12/17/15.
 */
define('Sm-Core-SmModel',['backbone', 'Sm/urls/main'], function (Backbone) {
    /**
     * @alias Sm.Core.SmModel
     */
    Sm.Core.SmModel = Backbone.Model.extend({
        defaults:   {
            _permissions: {
                edit:    false,
                view:    false,
                destroy: false
            }
        },
        initialize: function (settings) {
            settings     = settings || {};
            /**
             *
             * @type {*|Sm.Core.MvCombo}
             */
            this.MvCombo = settings.MvCombo || null;
            if ('MvCombo' in this.attributes) {
                delete this.attributes.MvCombo;
                delete settings.MvCombo;
            }
            Object.defineProperties(this, {
                id:     {
                    get: function () {
                        return this.attributes.id;
                    }
                },
                ent_id: {
                    get: function () {
                        return this.attributes.ent_id;
                    }
                }
            });
        },
        toJSON:     function () {
            var ret_obj = Sm.Core.util.merge_objects({}, this.attributes);
            if ('MvCombo' in ret_obj) {
                delete ret_obj.MvCombo;
            }
            return ret_obj;
        },
        url:        function () {
            var self    = this;
            var context = this.context;
            return Sm.urls.api.generate({
                MvCombo: self,
                context: context
            });
        }
    });
    Sm.loaded.add('Core_SmModel');
});
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Emitter', 'Sm'], function (require, Emitter) {
    require('Sm');
    require(['require', 'Sm/Extras/ViewAid'], function () {});
    Sm.loaded.when_loaded('Extras_ViewAid', function () {
        "use strict";
        var _f               = function () {};
        /**
         * These are the default settings for the Modal Dialog class
         * @type {{template_string: string, content_element_selector: string, click_events: Array, events: {save: Function, open: Function, close: Function, edit: Function, add: Function}, closeKey: number}}
         */
        var default_settings = {
            template_string:          '<div class="modal">\n    <div class="modal-content"></div>\n</div>',
            content_element_selector: '.modal-content',
            click_events:             [],
            events:                   {
                save:  false,
                open:  _f,
                close: _f,
                edit:  _f,
                add:   _f
            },
            closeKey:                 27
        };

        /**
         * A function to be used as a click handler
         * Checks to see which Modal should take the
         * @param e
         * @return {boolean}
         */
        var top_level_modal_handler = function (e) {
            /** @type {Sm.Extras.Modal} The to level modal dialog */
            var modal = Sm.Extras.Modal.open_modals[Sm.Extras.Modal.open_modals.length - 1];
            if (!modal) return true;
            if (typeof modal.settings.closeKey !== "number") modal.settings.closeKey = 27;
            if (e.which == 27) {
                modal.close();
            } else if (e.ctrlKey && e.which == 83) { //s - save
                e.stopPropagation();
                e.preventDefault();
                if (!!Sm.Extras.Modal.sm_modal_save) return false;
                Sm.Extras.Modal.sm_modal_save = true;
                modal.emit('save', modal, modal.content_element);
                window.setTimeout(function () {
                    Sm.Extras.Modal.sm_modal_save = false;
                }, 1500);
                return false;
            }
        };
        Sm.Extras.Modal             = Sm.Extras.ViewAid.extend({
            /**
             *
             * @param settings
             * @param settings.template_string
             * @param settings.content_element_selector
             * @param settings.click_events
             * @param settings.events
             * @param settings.closeKey
             */
            init: function (settings) {
                settings = settings || {};

                /** @type {HTMLElement|null} */
                this.element                   = null;
                default_settings.click_events  = [];
                this.settings                  = Sm.Core.util.merge_objects(default_settings, settings);
                this.settings.action_classname = 'modal-button';

                Sm.Extras.Modal.open_modals = Sm.Extras.Modal.open_modals || [];
                Sm.Extras.ViewAid.prototype.init.apply(this, arguments);
            },

            init_events:         function () {
                if (Sm.Extras.ViewAid.prototype.init_events.apply(this, arguments)) {
                    document.addEventListener("keydown", top_level_modal_handler);
                }
            },
            /**
             *
             * @param and_$
             * @return {HTMLElement|Node|$}
             */
            get_content_element: function (and_$) {
                this.$content_element = this.$content_element || $(this.content_element);
                return !!and_$ ? this.$content_element : this.content_element;
            },
            close:               function () {
                $('body').removeClass('modal-blur');

                this.element.removeEventListener('click', this.get_bound('click_handler'));
                this.element && this.element.parentNode.removeChild(this.element);
                this.emit('before_close', this, this.content_element);
                this.element = this.content_element = null;
                this.status.is_open = false;
                Sm.Extras.Modal.open_modals.splice(Sm.Extras.Modal.open_modals.indexOf(this), 1);
                if (!Sm.Extras.Modal.open_modals.length) {
                    document.removeEventListener("keydown", top_level_modal_handler);
                }
                this.emit('close', this, this.content_element);
            },
            open:                function () {
                this.emit('before_open', this);
                this.element = (typeof this.settings.template_string === "string")
                    ? Sm.Core.util.createElement(_.template(this.settings.template_string)(), true)
                    : false;
                if (!this.element) {
                    Sm.CONFIG.DEBUG && console.log('no open');
                    return false;
                }
                $('body').addClass('modal-blur');
                var $modal   = $(this.element);
                var m_c      = this.content_element = $modal.find(this.settings.content_element_selector)[0];
                if (m_c) this.content_element.innerHTML = this.html;
                if (!this.content_element) return false;
                this.init_events();
                this.status.is_open                     = true;
                Sm.Extras.Modal.open_modals.push(this);
                try { document.documentElement.appendChild(this.element);} catch (e) {console.log(e) }
                this.emit('open', this, this.content_element);
            },
            set_errors:          function (attr_name, reason, actual_value) {
                var $modal_content = this.get_content_element(true);
                if (actual_value != undefined) {
                    var potential_els = $modal_content.find('[data-attribute=' + attr_name + ']');
                    for (var i = 0; i < potential_els.length; i++) {
                        var element          = potential_els[i];
                        var el_parent        = element.parentNode;
                        var potential_errors = $(el_parent).find('.error');
                        var error            = potential_errors[0];

                        if (element.hasOwnProperty('checked')) {
                            element.checked = !!actual_value
                        } else {
                            $(element).val(actual_value);
                            element.innerHTML && (element.innerHTML = actual_value);
                        }
                        error && (error.innerHTML = reason);
                    }
                }
            },
            clear_errors:        function () {
                var all_errors = this.get_content_element(true).find('.error');
                for (var j = 0; j < all_errors.length; j++) {
                    var el = all_errors[j];
                    el && (el.innerHTML = '');
                }
            }
        });

        //In case there are multiple modal dialogs open, interact only with the topmost one
        Sm.loaded.add('Extras_Modal');
    }, 'Extras_Modal');
});
define("Sm/Extras/Modal", function(){});

/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
    Sm.loaded.when_loaded('Extras_Modal', function () {
        Sm.Entities.Abstraction.Modal      = Sm.Entities.Abstraction.Modal || {};
        /**
         * @alias Sm.Entities.Abstraction.Modal.Edit
         * @prop {Array} Sm.Entities.Abstraction.Modal.Edit.MvComboArr {@see Sm.Entities.Abstraction.Modal.Edit.MvComboArr}
         */
        Sm.Entities.Abstraction.Modal.Edit = Sm.Extras.Modal.extend({
            /**
             *
             * @param settings
             * @param settings.MvCombo
             */
            init:               function (settings) {
                settings       = settings || {};
                var MvComboArr = settings.MvCombo;
                this.self_type = settings.self_type || false;
                if (!!MvComboArr && MvComboArr.constructor !== Array) {
                    MvComboArr = [MvComboArr];
                }
                this.display_type = settings.display_type || 'full.modal';
                /**
                 * @alias Sm.Entities.Abstraction.Modal.Edit.MvComboArr
                 * @type {Array<Sm.Core.MvCombo>}
                 */
                this.MvComboArr   = MvComboArr || false;
                this.ViewArr      = [];

                var res    = Sm.Extras.Modal.prototype.init.apply(this, arguments);
                Sm.Entities.Abstraction.Modal.Edit.generate_element.call(this);
                var events = ['save', 'before_save', 'after_save', 'open', 'close', 'view_relationships', 'add_entity', 'select'];
                for (var i = 0; i < events.length; i++) {
                    var ev_name = events[i];
                    var fn      = Sm.Entities.Abstraction.Modal.Edit['on_' + ev_name] || function () {};
                    this.on(ev_name, fn.bind(this));
                }
                this.changed_attributes = {};
                return res;
            },
            update:             function () {
                //Sm.CONFIG.DEBUG && console.log("Not sure how to update this View");
            },
            /**
             * @this Sm.Entities.Abstraction.Modal.Edit
             * @param response
             * @param changed_attributes
             */
            success:            function (response, changed_attributes) {
                var $modal_content = this.get_content_element(true);

                /** @type {Sm.Entities.Abstraction.Edit.MvComboArr}  */
                var MvComboArr = this.MvComboArr;
                if (MvComboArr.length === 1) {
                    var MvCombo_              = MvComboArr[0];
                    var SelfView              = this.ViewArr[0];
                    response                  = response || {
                            message: {
                                text:      'Undefined error',
                                changed:   [],
                                defaulted: [],
                                deferred:  [],
                                errors:    []
                            },
                            success: false
                        };
                    response.message          = response.message || {};
                    var changed_on_server_arr = response.message.changed || [];
                    var response_model        = response.message.model || {};
                    var defaulted             = response.message.defaulted || {};

                    var errors      = response.message.errors || {};
                    var _Model      = MvCombo_.Model || {};

                    _Model.clear({silent: true});
                    _Model.set(response_model, {silent: true});
                    Sm.CONFIG.DEBUG && console.log(response_model.content_location);
                    this.update();
                    var changed_arr = [];
                    for (var attr in changed_attributes) {
                        if (!changed_attributes.hasOwnProperty(attr)) continue;
                        if (changed_on_server_arr.indexOf(attr) < 0) {
                            var reason = "Unknown error (1)";
                            if (defaulted[attr]) {
                                reason = defaulted[attr];
                            } else if (errors[attr]) {
                                reason = errors[attr];
                            }
                            var actual_value = response_model[attr];
                            this.set_errors(attr, reason, actual_value);
                        } else {
                            changed_arr.push(attr);
                        }
                    }
                    var self = this;
                    Sm.CONFIG.DEBUG && console.log(changed_attributes, response_model, _Model.attributes, _Model);
                    MvCombo_.forEachView(function () {
                        /** @type {Sm.Core.SmView|*}  */
                        var View = this;
                        if (!View || (SelfView && self.cid == View.cid)) return;
                        View.update(changed_arr);
                        View.refresh_all();
                    });
                    return Promise.resolve(changed_arr);
                }
                return Promise.reject("Not sure what to do with multiple MvCombos");
            },
            get_info_from_form: function () {
                var $modal_content = this.get_content_element(true);
                if (this.MvComboArr.length === 1) {
                    var edit      = $modal_content.find('.model.edit');
                    var set_thing = {};
                    var _Model    = this.MvComboArr[0].Model;
                    for (var i = 0; i < edit.length; i++) {
                        var $elem = $(edit[i]);
                        var elem  = edit[i];
                        var val   = $elem.val();
                        val.trim && (val = val.trim());
                        var name  = $elem.attr('name');
                        if (name == 'has_title') val = !!elem.checked ? 1 : 0;

                        if (!!name && val != _Model.get(name)) set_thing[name] = val;
                        var o   = {};
                        o[name] = val + '';
                    }
                    _Model.set(set_thing);
                    return (this.changed_attributes = _Model.changedAttributes());
                }
                return {};
            }
        });

        Sm.Entities.Abstraction.Modal.Edit.generate_element = function () {
            if (this.MvComboArr.length === 1) {
                var MvCombo_  = this.MvComboArr[0];
                var self      = this;
                var self_type = this.self_type;
                return Sm.Entities[self_type].Garage.generate(this.display_type + '.modal', MvCombo_).catch(function (reason) {
                    alert('There was an error - 1 - ' + reason);
                }).then(function (result) {
                    if (self.status.is_open) {
                        self._changeElement(result);
                    } else {
                        self.element = result;
                        self.setElement(result);
                    }
                }).catch(function (reason) {
                    alert('There was an error - ' + reason);
                });
            }
            return Promise.reject("Could ot figure out what to do");
        };

        /**
         * @typedef {function}  Sm.Entities.Abstraction.Modal.Edit.on_event
         */

        Sm.Entities.Abstraction.Modal.Edit.on_before_save        = function () {
            this.clear_errors();
            var $content_element    = this.get_content_element(true);
            $content_element.addClass('saving');
            this.changed_attributes = this.get_info_from_form();
        };
        /**
         * @type Sm.Entities.Abstraction.Modal.Edit.on_event
         */
        Sm.Entities.Abstraction.Modal.Edit.on_save               = function () {
            this.emit('before_save', this, this.content_element);
            var self       = this;
            var MvComboArr = this.MvComboArr;
            if (MvComboArr.length === 1) {
                var MvCombo_ = MvComboArr[0];
                return MvCombo_.save({
                    silent: true,
                    patch:  true
                }).then(function (result) {
                    Sm.CONFIG.DEBUG && console.log(result.message.model.content_location);
                    return self.resolve('after_save', result);
                });
            }
            return Promise.reject("Not sure what to do with multiple MvCombos yet");
        };
        Sm.Entities.Abstraction.Modal.Edit.on_after_save         = function (result) {
            this.$content_element.removeClass('saving');
            Sm.CONFIG.DEBUG && console.log(result);
            this.success(result, this.changed_attributes);
            this.changed_attributes = {};
            return result;
        };
        Sm.Entities.Abstraction.Modal.Edit.on_open               = function () {
            var content_element = this.content_element;
            var self            = this;
            this.MvComboArr.forEach(function (current_element, index) {
                self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));
            });
        };
        Sm.Entities.Abstraction.Modal.Edit.on_close              = function () {
            var ViewArr = this.ViewArr;
            for (var i = 0; i < ViewArr.length; i++) {
                var View_ = ViewArr[i];
                View_ && View_.destroy();
            }
        };
        Sm.Entities.Abstraction.Modal.Edit.on_view_relationships = function () {
            if (!this.self_type) return;
            if (this.MvComboArr.length !== 1) {
                Sm.CONFIG.DEBUG && console.log("Not sure what to do in this situation!");
                return;
            }
            var self_type              = this.self_type;
            var MvCombo_               = this.MvComboArr[0];
            var $modalContent          = this.get_content_element(true);
            var relationship_container = $modalContent.find('.view_relationship-container')[0];
            Sm.Entities[self_type]
            && Sm.Entities[self_type].Garage.generate('relationships', MvCombo_).catch(function (errr) {
                Sm.CONFIG.DEBUG && console.log(errr);
            }).then(function (result) {
                if (relationship_container) {
                    if (typeof result == 'string') {
                        Sm.CONFIG.DEBUG && console.log(result);
                        relationship_container.innerHTML = '<hr>' + result;
                    } else {
                        relationship_container.innerHTML = '<hr>';
                        try {
                            relationship_container.appendChild(result);
                        } catch (e) {
                            Sm.CONFIG.DEBUG && console.log(e);
                        }
                    }

                }
            }).catch(function (e) {
                Sm.CONFIG.DEBUG && console.log(e);
            });
        };
        Sm.Entities.Abstraction.Modal.Edit.on_add_entity         = function () {};
        Sm.Entities.Abstraction.Modal.Edit.on_select             = function () {
            var self = this;
            this.resolve('save').then(function (res) {
                Sm.CONFIG.DEBUG && console.log(res);
                Sm.Entities.Abstraction.Modal.Edit.generate_element.call(self);
            }).catch(function (res) {
                Sm.CONFIG.DEBUG && console.log(res);
            });
        };
    }, 'Entities_Abstraction_Modal_Edit');
});

define("Sm-Entities-Abstraction-ModalEdit", function(){});

/**
 * Created by Sam Washington on 12/17/15.
 */
require(['require', 'backbone', 'jquery', 'underscore', 'Cocktail', 'Sm-Entities-Abstraction-ModalEdit'],
        /**
         * @lends Cocktail
         * @lends Backbone
         * @lends $
         * @lends _
         */
        function (require, Backbone, $, _, Cocktail) {
            require(['require', 'Sm/Extras/DraggableMixin'], function () {});
            require(['require', 'Sm/Extras/Modal'], function () {});
            var Sm                               = window.Sm;
            /**
             * @alias Sm.Core.SmView
             * @class SmView
             * @extends Backbone.View
             * @augments Sm.Extras.Draggable.mixin
             * @augments Backbone.Events
             * @property {string}           type                The type of entity it represents
             * @property {string}           identifier          A query selector meant to identify an element of this type
             * @property {{}}               status              How the view is displayed
             * @property {function}         refresh_all         Refresh all of the views that are related to this
             * @property {$}                $Element            {@link Sm.Core.SmView#$Element}
             * @property {HTMLElement}      Element             {@link Sm.Core.SmView#Element}
             * @property {HTMLElement|Node} referenceElement
             * @property {string}           cid
             * @property {{}}               _rendering_callbacks {@link Sm.Core.SmView#_rendering_callbacks}
             * @property {function}         undelegateEvents
             * @property {function}         delegateEvents
             * @property {function}         remove
             * @property {HTMLElement}      el
             * @property {$}                $el
             * @property {{}}               _relationships
             * @property {Backbone.Model}   model
             * @property {function}         events
             * @property {Sm.Core.MvCombo}  MvCombo
             */
            Sm.Core.SmView                       = Backbone.View.extend({
                type:                   '',
                identifier:             '.spwashi-entity',
                /**
                 * An object relating the relationship index to the name of the element in the elements object
                 * @see Sm.Core.SmView.elements
                 */
                relationship_index_obj: {
                    collections: false,
                    children:    'child_holder',
                    composition: 'composition',
                    micros:      false,
                    pivots:      false
                },
                /**
                 * An object used to keep track of the elements of the View
                 * (name => Element)
                 *
                 */
                elements:               {},

                /**
                 * Default events of the Views
                 */
                initial_events:    {
                    click: function () {
                        Sm.CONFIG.DEBUG && console.log(this);
                    }
                },
                /**
                 * This is what's used to override the default, useful for inheriting classes
                 * @alias Sm.Core.SmView.additional_events
                 */
                additional_events: {
                    click: function () {
                        Sm.CONFIG.DEBUG && console.log(this);
                    }
                },

                setPermission:   function (permission, value) {
                    if (typeof permission === "string") {
                        this._permissions[permission] = value;
                    } else if (typeof permission === "object") {
                        for (var name in permission) {
                            if (!permission.hasOwnProperty(name)) continue;
                            this.setPermission(name, permission[name])
                        }
                    }
                },
                setStatus:       function (status, value) {
                    this.status = this.status || {};
                    if (typeof status === "string") {
                        this.status[status] = value;
                    } else if (typeof status === "object") {
                        for (var name in status) {
                            if (!status.hasOwnProperty(name)) continue;
                            this.setStatus(name, status[name])
                        }
                    }
                },
                queryPermission: function (permission) {
                    if (!this.MvCombo) return false;
                    if (permission == 'relate') permission = 'edit';
                    if (permission in this._permissions)
                        return this._permissions[permission];
                    var res = this.MvCombo.queryPermission(permission);
                    if (res != null) this._permissions[permission] = res;
                    return permission in this._permissions ? this._permissions[permission] : null;
                },
                queryStatus:     function (status) {
                    if (!this.MvCombo) return null;
                    if (status == 'relate') status = 'edit';
                    if (status in this.status)
                        return this.status[status];
                    var res = this.MvCombo.queryStatus(status);
                    if (res != null) this.status[status] = res;
                    return status in this.status ? this.status[status] : null;
                },


                /**
                 * Return the outerHTML for the View's element
                 * @return {string}
                 */
                outerHTML:        function () {
                    return this.get_rendered('Element').outerHTML;
                },
                /**
                 *
                 * @param {{}=}             settings
                 * @param {boolean=false}   settings.if_not_init
                 * @return {Sm.Core.SmView}
                 */
                init_permissions: function (settings) {
                    if (!this.MvCombo) return this;
                    settings                        = settings || {};
                    if (this.status.is_permissions_init && !!settings.if_not_init) return this;
                    this.queryPermission('destroy') && this.$el.addClass('can-delete');
                    this.queryPermission('view') && this.$el.addClass('can-view');
                    this.queryPermission('relate') && this.$el.addClass('can-relate');
                    this.queryPermission('edit') && this.$el.addClass('can-edit');
                    this.queryPermission('drag') && this.$el.addClass('can-drag');
                    this.queryPermission('focus') && this.$el.addClass('can-focus');
                    this.status.is_permissions_init = true;
                    return this;
                },
                /**
                 * Initialize the View
                 * @param settings
                 * @param {HTMLElement}     settings.el
                 * @param {Backbone.Model}  settings.model
                 * @param {string}          settings.display_type
                 */
                initialize:       function (settings) {
                    settings                  = settings || {};
                    _.extend(this, Backbone.Events);
                    this.elements             = {};
                    /**
                     * @alias Sm.Core.SmView#_rendering_callbacks
                     * @type {{}}
                     * @private
                     */
                    this._rendering_callbacks = this._rendering_callbacks || {};
                    this._permissions         = {};
                    this._cache               = {};
                    /**
                     * @private
                     * @type {{}}
                     */
                    this.status               = {};
                    /**
                     * When we got to this View through another MvCombo, this is an array that keeps track of that movement
                     * * rel_type.[rel_subtype].MvCombo_r_id
                     * * pivots.eli5.sec_xxxxxxxxxxxxxxxxxxxxx
                     * @type {Array}
                     */
                    this.reference_to         = [];
                    var self                  = this;
                    var self_type             = this.type;
                    this.Identity             = Sm.Core.Identifier.get_or_init({
                        id:       false,
                        r_id:     self.cid,
                        type:     self_type + 'View',
                        Resource: self
                    });
                    if (!!settings.el) {
                        this.setStatus({
                            rendered:     true,
                            up_to_date:   true,
                            init_from_el: true,
                        });
                        settings.el.sm_View = this;
                        settings.el.parentNode && (this.referenceElement = settings.el.parentNode);
                        this.old_el         = settings.el;
                        this.init_elements();
                        if (this.Identity) settings.el.dataset.view_r_id = this.Identity.r_id;
                    }
                    if (!!settings.model) {
                        this.setStatus('has_model', true);
                    }

                    //noinspection JSValidateTypes
                    /**
                     * A hash of properties of this View that have to be changed. IDKY it's here, but I'm sure it's a good idea.
                     * @type {Array}
                     * @private
                     */
                    this._to_update                = [];
                    /**
                     * A list of Views by relationship type that are related. {'relationship_index'=>{...r_id=>View...}}
                     * @type {{}}
                     * @private
                     */
                    this._relationships            = {};
                    this._reciprocal_relationships = {};
                    /**
                     *
                     * @type {HTMLElement|SmView}   _parent_reference
                     * @private
                     */
                    /**
                     * The MvCombo that is attached to this View
                     * @type {*|Sm.Core.Relationship|null}
                     */
                    this.MvCombo = settings.MvCombo || null;

                    this.display_type = settings.display_type ? settings.display_type : (this.display_type ? this.display_type : 'full');

                    _.extend(this, Backbone.Events);
                    Sm.loaded.when_loaded('Extras_Draggable', function () {
                        Sm.Extras.Draggable.mixin.call(self, {
                            can_start:  function () {
                                return Sm.CONFIG.DRAG_MODE;
                            },
                            can_accept: function (dragged, data) {
                                return true;
                            },
                            data:       self
                        });
                        var el = settings.el || self.el;
                        self.makeElementDraggable && self.makeElementDraggable(settings.el || self.el, true);
                    }, '_SmView_Init', 20000);
                    this.init_button_control_events();
                },


                /**
                 * Render all of the elements of this View
                 */
                init_elements:  function () {
                    var elements = this._rendering_callbacks;
                    for (var name in elements) {
                        if (!elements.hasOwnProperty(name)) continue;
                        this.get_rendered(name);
                    }
                },
                /**
                 * Get the events of the View
                 * @see {Backbone.View}
                 * @return {*}
                 */
                events:         function () {
                    this.initial_events    = this.initial_events || {};
                    this.additional_events = this.additional_events || {};
                    return Sm.Core.util.merge_objects(this.initial_events, this.additional_events);
                },
                /**
                 * Set the MvCombo of the View
                 * @param Mv
                 */
                setMvCombo:     function (Mv) {
                    if (!Mv) return;
                    this.MvCombo = Mv;
                },
                delegateEvents: function () {
                    return Backbone.View.prototype.delegateEvents.apply(this, arguments);
                },
                remove:         function () {
                    this.MvCombo.blur(this);
                    this.setStatus('rendered', false);
                    this.mark_unrendered();
                    this.undelegateEvents();
                    return Backbone.View.prototype.remove.apply(this, arguments);
                },
                /**
                 * Refresh all of the Views that are related to this
                 * @param settings
                 * @param {Array=}      ignore      An array of CID's to ignore (prolly because they've already been rendered)
                 * @returns {Sm.Core.SmView}
                 */
                refresh_all:    function (settings, ignore) {
                    settings    = settings || {};
                    ignore      = ignore || [];
                    var Element = this.get_rendered('Element');
                    this.delegateEvents(this.events());
                    var self    = this;

                    var MvCombo = this.MvCombo;
                    if (!MvCombo) return this;
                    var refresh               = function (relationship_index, holder_element) {
                        if (relationship_index && !!holder_element) {
                            holder_element.innerHTML = '';
                            //iterate through this backwards to avoid any positioning mistakes
                            for (var i = relationship_index._meta._list.length; i--;) {
                                var rel_r_id = relationship_index._meta._list[i];
                                self.add_relationship({
                                    render:            true,
                                    Relationship:      relationship_index.items[rel_r_id],
                                    RelationshipIndex: relationship_index
                                }).then(function (result) {
                                    if (result.OtherView) {
                                        result.OtherView.refresh_element(result.otherElement);
                                        result.OtherView.refresh_all(settings, ignore);
                                    }
                                }).catch(function (error) {
                                    Sm.CONFIG.DEBUG && console.log('error - ', error);
                                });
                            }
                        } else {
                            Sm.CONFIG.DEBUG && console.log('refresh no', relationship_index, holder_element);
                        }
                    };
                    this.refresh_element(Element);
                    var MvCombo_relationships = MvCombo.relationships;
                    for (var relationship_index in MvCombo_relationships) {
                        if (!MvCombo_relationships.hasOwnProperty(relationship_index)) continue;
                        var RelationshipIndex = MvCombo_relationships[relationship_index];
                        var holder_element    = this.get_rendered(this.relationship_index_obj[relationship_index]);
                        if (!holder_element) continue;
                        refresh(RelationshipIndex, holder_element)
                    }

                    return this;
                },

                /**
                 * Identify the View as unrendered. Useful for seeing if it's on the screen properly
                 */
                mark_unrendered: function () {
                    this.setStatus({
                        rendered:         false,
                        permissions_init: false
                    });
                    var elements = this.elements;
                    for (var index in elements) {
                        if (!elements.hasOwnProperty(index)) continue;
                        elements[index] = null;
                    }
                },
                mark_added:      function () {
                    this.setStatus({
                        rendered: true
                    });
                    this.post_add_hook();
                },
                /**
                 * Re-render the Element, reinitialize the events, get everything back to normal
                 * @param element
                 */
                refresh_element: function (element) {
                    if (!element) return;
                    this.undelegateEvents();
                    this.setElement(element);
                    this.init_elements();
                    this.setStatus({
                        rendered:   true,
                        up_to_date: true
                    });
                    this.delegateEvents(this.events());
                    this.init_button_control_events.call(this);
                    this.post_add_hook();
                },
                post_add_hook:   function () {
                    var self = this;
                    Sm.loaded.when_loaded('Vendor_MathJax', function () {
                        self.setStatus && self.setStatus('math_init', true);
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                    });
                },
                /**
                 * Render the Element
                 * @param settings
                 * @param settings.if_not_rendered      Should we only do this if the Element has not already been rendered?
                 * @param settings.display_type         How are we displaying the View? full
                 * @param settings.synchronous          Return a promise (true) or a rendered element (false)
                 * @return {Promise|HTMLElement|*}
                 */
                render:          function (settings) {
                    settings        = settings || {};
                    var synchronous = !!settings.synchronous;
                    if (!this.MvCombo || (this.queryStatus('destroyed'))) {
                        //Sm.CONFIG.DEBUG && console.log(this, ' Does not have an MvCombo unless ', this.queryStatus('destroyed'));
                        return synchronous ? false : Promise.reject("There is no longer an existent MvCombo for this View");
                    }
                    if ((this.queryStatus('rendered') && !!settings.if_not_rendered) || this.queryStatus('rendering')) {
                        Sm.CONFIG.DEBUG && console.log('ignore');
                        return synchronous ? this.el : Promise.resolve(this.el);
                    }
                    this.setStatus('rendering', true);
                    var MvCombo_    = this.MvCombo;
                    var self_type   = this.type;
                    var self        = this;

                    var post_render_func = function (result) {
                        var el_1    = $(result);
                        self.old_el = self.el;
                        self.setElement(el_1, 'render');
                        self.setStatus({
                            rendered:   true,
                            rendering:  false,
                            up_to_date: true
                        });
                        self.init_elements();
                        self.delegateEvents(self.events());
                        return el_1[0];
                    };
                    var Garage_          = Sm.Entities[self_type].Garage;
                    this.display_type    = settings.display_type || this.display_type || 'full';
                    //Sm.CONFIG.DEBUG  && settings.display_type && console.log(settings.display_type);
                    if (!synchronous)
                        return Garage_.generate(this.display_type, MvCombo_, false).then(post_render_func).catch(function (error) {
                            Sm.CONFIG.DEBUG && console.log(error);
                        });
                    else {
                        return post_render_func(Garage_.generate(this.display_type, MvCombo_, true))
                    }
                },
                /**
                 * @alias Sm.Core.SmView#get_rendered
                 * @param what
                 * @return {*}
                 */
                get_rendered:    function (what) {
                    if (!what) return false;
                    if (what == 'Element') {
                        if (!this.queryStatus('rendered')) {
                            (this.render({
                                synchronous:     true,
                                if_not_rendered: true
                            }));
                        }
                        return this.el;
                    } else if (what == '$Element') {
                        return (this.$el = $(this.get_rendered('Element')));
                    }
                    if (this._rendering_callbacks[what]) return this._rendering_callbacks[what].call(this);
                    if (what.indexOf('_element') < 0) what += '_element';
                    if (this._rendering_callbacks[what]) return this._rendering_callbacks[what].call(this);
                    if (what.indexOf('rendered_') < 0) what = 'rendered_' + what;
                    if (this._rendering_callbacks[what]) return this._rendering_callbacks[what].call(this);
                    return false;
                },

                /**
                 * Start the process to adding a relationship based an existing other View or MvCombo. This adds the relationship on the server
                 * @param {{}=}settings
                 * @param settings.View     {Sm.Core.SmView=}   If we know the View that is being added to this one, use it
                 * @param settings.type     {string=}           The Entity type that we are going to be adding
                 * @param settings.MvCombo  {}
                 * @return {*}
                 */
                begin_add_relationship: function (settings) {
                    /**NOTE: calls continue relationship_add**/
                    settings = settings || {};
                    var View_, MvCombo_;
                    if (!!settings.View) {
                        View_    = settings.View;
                        MvCombo_ = settings.MvCombo || View_.MvCombo;
                    } else if (!!settings.MvCombo) {
                        MvCombo_ = settings.MvCombo;
                        View_    = MvCombo_.getView({reference_element: this.referenceElement});
                    }
                    var self = this;

                    /**
                     * Create the Relationship on the server
                     */
                    return this.MvCombo.add_relationship(MvCombo_, {
                        type:      settings.type,
                        OtherView: View_,
                        prompt:    !!settings.prompt
                    }).catch(function (e) {
                        /**
                         * todo temporary
                         * Catch the error, log it, throw it
                         */
                        Sm.CONFIG.DEBUG && console.log(e);
                        throw e;
                    }).then(function (result) {
                        /**
                         * Given the result of the add_relationship, add the relationship to the View and register the View relationship in it.
                         */
                        if (result && result.RelationshipIndex) {
                            var selfMV             = result.SelfMvCombo;
                            var OtherMvCombo       = result.OtherMvCombo;
                            var otherView          = result.OtherView;
                            var Relationship_      = result.Relationship;
                            var RelationshipIndex_ = result.RelationshipIndex;
                            var self_map_index     = result.map_indices[0];
                            var other_map_index    = result.map_indices[1];
                            if (Relationship_) {
                                var reg_obj              = {};
                                reg_obj[self_map_index]  = self;
                                reg_obj[other_map_index] = otherView || View_;
                                Relationship_.register_view_relationship(reg_obj);
                                self.add_relationship({
                                    render:            true,
                                    Relationship:      Relationship_,
                                    RelationshipIndex: RelationshipIndex_
                                }).catch(function (error) {
                                    Sm.CONFIG.DEBUG && console.log('error - ', error);
                                });
                            }
                            return result;
                        }
                    }).catch(function (e) {
                        Sm.CONFIG.DEBUG && console.log(e);
                        throw e;
                    }).then(function (result) {
                        /**
                         * Save the relationshipIndex,
                         * todo this is not a good thing.
                         * Work out the logistics of saving
                         */
                        if (result && result.RelationshipIndex) {
                            if (result.Relationship) {
                                return result.Relationship.save();
                            }
                            var RelationshipIndex = result.RelationshipIndex;
                            var context_id        = 0;
                            RelationshipIndex.save({
                                /**NOTE: saving mechanism**/
                                context_id: context_id
                            }).catch(function (e) {
                                Sm.CONFIG.DEBUG && console.log(e);
                                throw e;
                            });
                        }
                    }).catch(function (e) {
                        console.log(e);
                        throw e;
                    });
                },
                /**
                 * Physically add the relationship to the View, regardless of whether or not it exists on the server
                 * @param settings
                 * @param {boolean=}                            settings.render
                 * @param {boolean=}                            settings.is_reciprocal
                 * @param {Sm.Core.Relationship=}               settings.Relationship               The Relationship to add
                 *                                                                                  (we assume that this has
                 *                                                                                  already been
                 *                                                                                  instantiated/Mv linked)
                 * @param {Sm.Core.RelationshipIndex=}          settings.RelationshipIndex          =
                 * @param {Sm.Core.MvCombo=}                    settings.MvCombo                    The MvCombo being related
                 * @param {string=}                             settings.map_index                  Where to search for the
                 *                                                                                  MvCombo (e.g. collection_id)
                 *                                                                                  If undefined, assume
                 *                                                                                  reciprocity
                 * @param {string=}                             settings.relationship_type_index    Where are we adding this
                 *                                                                                  entity? children? micros?
                 * @param {string=}                             settings.self_map_index             The map index at which we
                 *                                                                                  can find this View
                 * @param {object<string, Sm.Core.SmView>=}     settings.relationship_obj           An object representing the
                 *                                                                                  View relationships. This is a map_index: View.
                 * @param {r_id=}                               settings.context_r_id               The context in which the
                 *                                                                                  relationship exists
                 * @param {string=}                              settings.container_template         The template to use in
                 *                                                                                  wrapping the relationship
                 * todo comment this, Sam
                 * @return {Promise|boolean|*}
                 */
                add_relationship:       function (settings) {
                    /** @type {boolean} */
                    var render                  = !!settings.render;
                    /** @type {string|boolean} */
                    var relationship_type_index = settings.relationship_type_index || false;
                    /** @type {string|boolean} */
                    var other_map_index         = settings.map_index || false;
                    /** @type {string|boolean} */
                    var self_map_index          = settings.self_map_index || false;
                    /** @type {Sm.Core.Relationship|boolean} */
                    var Relationship_           = settings.Relationship || false;
                    /** @type {Sm.Core.MvCombo} */
                    var SelfMvCombo             = this.MvCombo;
                    /** @type {Sm.Core.RelationshipIndex|boolean} */
                    var RelationshipIndex_      = settings.RelationshipIndex || false;
                    /** @type {boolean} */
                    var is_reciprocal           = !!settings.is_reciprocal;
                    /** @type {Sm.Core.MvCombo} */
                    var OtherMvCombo;
                    /**
                     * This is a string that we will wrap the Relationship with if need be.
                     * @type {string|boolean} */
                    var container_template      = settings.container_template || false;

                    //If we know both the relationship and the RelationshipIndex, get the MvCombo and the map indices from them.
                    if (Relationship_ && RelationshipIndex_) {
                        !relationship_type_index &&
                        RelationshipIndex_._meta &&
                        RelationshipIndex_._meta._index &&
                        (relationship_type_index = RelationshipIndex_._meta._index);

                        OtherMvCombo = settings.MvCombo || Relationship_.get_Mv({
                                SelfMvCombo: SelfMvCombo,
                                map_index:   other_map_index
                            });

                        !other_map_index && OtherMvCombo && (other_map_index = Relationship_.get_map_index_of_Mv(OtherMvCombo));
                        !self_map_index && SelfMvCombo && (self_map_index = Relationship_.get_map_index_of_Mv(SelfMvCombo));
                    }

                    //We must know the map indices, the relationship type, the Relationship, and the MvCombo of the Current View
                    if (!other_map_index || !self_map_index || !relationship_type_index || !Relationship_ || !SelfMvCombo) {
                        return Promise.reject('Could not identify details');
                    }

                    var self                          = this;
                    /**
                     * An object used for Relationship.register_view_relationship
                     * @type {{}}
                     */
                    var relationship_obj              = settings.relationship_obj || {};
                    relationship_obj[other_map_index] = null;
                    relationship_obj[self_map_index]  = this;

                    //This is the only other way for us to get the OtherMvCombo. Not entirely sure why the Relationship.get_Mv function is duplicated, but eh.
                    //I assume that if the other one was called, this wouldn't be and vice-versa. Let's leave it.
                    OtherMvCombo = OtherMvCombo || settings.MvCombo || Relationship_.get_Mv({
                            SelfMvCombo: SelfMvCombo,
                            map_index:   other_map_index
                        });
                    if (!OtherMvCombo) return Promise.reject('There is no other MV');

                    /**
                     * Get the other View based on the Current one from the relationship
                     * @type {*|boolean|Sm.Core.SmView}
                     */
                    var OtherView = Relationship_.getView(this, other_map_index);
                    //If we couldn't find it, try to get one from the actual Other MvCombo. Afterwards, register the View relationship
                    if (!OtherView) {
                        OtherView = OtherMvCombo.getView({
                            reference_element: self.referenceElement
                        });
                        if (!OtherView) return Promise.reject('There is no other View');
                        relationship_obj[other_map_index] = OtherView;
                        Relationship_.register_view_relationship(relationship_obj);
                    }
                    this[relationship_type_index]                             = this[relationship_type_index] || {};
                    this[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
                    //If we are not reciprocally adding this relationship, try to do it with the Other View. This is mostly meant for us to keep track of what this View is being related to
                    if (!settings.is_reciprocal) {
                        settings.is_reciprocal  = true;
                        settings.render         = false;
                        settings.map_index      = other_map_index;
                        settings.self_map_index = self_map_index;
                        //The View keeps track of its relationships this way
                        this._relationships[relationship_type_index]                             = this._relationships[relationship_type_index] || {};
                        this._relationships[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
                        OtherView.add_relationship(settings).catch(console.log);
                    } else {
                        this._reciprocal_relationships[relationship_type_index]                             = this._reciprocal_relationships[relationship_type_index] || {};
                        this._reciprocal_relationships[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
                    }
                    //Get the actual RelationshipIndex
                    /**
                     * The actual RelationshipIndex of the Relationship
                     * @type {Sm.Core.RelationshipIndex}
                     */
                    var SelfRelationshipIndex = is_reciprocal
                        ? SelfMvCombo.reciprocal_relationships[relationship_type_index]
                        : SelfMvCombo.relationships[relationship_type_index];
                    if (!SelfRelationshipIndex) return Promise.reject('There is no index to match ' + relationship_type_index + ' in ' + SelfMvCombo.type);

                    //Find out where we should add the relationship
                    var position = SelfRelationshipIndex.locate(OtherMvCombo.Identity, settings.context_r_id || 0);
                    //Just in case there is an invalid response, normalize it by making the position the first position
                    position = (position || 0);
                    var P    = Promise.resolve([null]);

                    //In some cases, we are doing this for the future and might not need to actually render the Relationship yet.
                    //We could also be doing some behind the scenes stuff and need to know what something is related to. Either way, this is where we leave if we aren't rendering
                    if (!render) return P;

                    var otherElement = this.wrap_element_for_relationship(OtherView, relationship_type_index, Relationship_, container_template);
                    var selfElement  = this.get_rendered('Element');
                    //Get the element (using Sm.Core.SmView.get_rendered) that corresponds to a relationship type index
                    var r_index            = this.relationship_index_obj[relationship_type_index];
                    var self_index_element = this.get_rendered(r_index);
                    if (!otherElement) return Promise.reject('There is no other element');

                    if (self_index_element) {
                        var $self_index_element   = $(self_index_element);
                        var content_element_array = $self_index_element.children('.content');
                        if (content_element_array[0]) $self_index_element = $(content_element_array[0]);

                        var children                     = $self_index_element.children();
                        var existing_relationship_length = children.length;
                        var reference_node, subsections;
                        //If the existing relationship type is valid, insert it at the specified position. Otherwise, try to append it
                        if (existing_relationship_length && (position < existing_relationship_length)) {
                            subsections    = children;
                            reference_node = subsections[position];
                            reference_node.parentNode.insertBefore(otherElement, reference_node);
                            OtherView.mark_added();
                        } else {
                            try {
                                self_index_element.appendChild(otherElement);
                                OtherView.mark_added();
                            } catch (e) {
                                Sm.CONFIG.DEBUG && console.log(e);
                                throw e;
                            }
                        }
                    }
                    return Promise.resolve({
                        self_index_element: self_index_element,
                        OtherView:          OtherView,
                        otherElement:       otherElement
                    }).then(function (result) {
                        var other_r_id = OtherMvCombo.r_id;
                        var Refs       = Sm.Core.MvWrapper.get_effective_MV(other_r_id, false, true);
                        Sm.CONFIG.DEBUG && console.log(Refs, other_r_id);
                        if (Refs) {
                            return Sm.Core.SmView.replace_with_elements({
                                referenceElement:          self_index_element,
                                replacement_MVs:           Refs.MVs,
                                replaced_MVs:              [other_r_id],
                                replaced_relationships:    [],
                                replacement_relationships: []
                            }).then(function () {return result}).catch(function (res) {
                                Sm.CONFIG.DEBUG && console.log(res);
                            });
                        }
                        return result;
                    });
                },
                /**
                 * What to do when a View is dropped onto another one
                 * @param droppedView
                 * @return {*}
                 */
                accept_drop:            function (droppedView) {
                    return this.begin_add_relationship({View: droppedView})
                },

                /**
                 * Initialize the standard procedure for dealing with the button controls on the side of the Entities
                 */
                init_button_control_events: function () {
                    var self                   = this;
                    var button_control_element = this.get_rendered('button_control');
                    //Sm.CONFIG.DEBUG && console.log(button_control_element);
                    if (button_control_element && typeof button_control_element === "object") {
                        button_control_element.onclick = function (e) {
                            var target  = e.target;
                            var $target = $(target);
                            if (self.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                                self.prompt_edit();
                            } else if (self.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
                                this.begin_add_relationship();
                            }
                        }
                    }
                },

                /**
                 * Clone the View: duplicate the view and some of its properties/its element, register it with the MvCombo
                 * @return {Function}
                 */
                clone:                         function () {
                    var clone_element = this.get_rendered('Element').cloneNode(true);
                    var constructor_  = this.prototype ? this.prototype.constructor : this.constructor;
                    var selfMvCombo   = this.MvCombo;
                    var type          = this.type;
                    var clonedView    = new constructor_({
                        type:    type,
                        MvCombo: selfMvCombo,
                        el:      clone_element
                    });
                    var self          = this;
                    Sm.loaded.when_loaded('Extras_Draggable', function () {
                        self.setDraggingStatus(false);
                    });
                    selfMvCombo.addView(clonedView, this.referenceElement);
                    return clonedView;
                },
                /**
                 * Handle to be used for the DraggableMixin
                 */
                handle:                        true,
                /**
                 * Set the element of the Backbone View. Also connects this object to it and sets the reference element
                 * @param element
                 */
                setElement:                    function (element) {
                    element && (element = element[0] || element);
                    element && (element.sm_View = this);
                    if (this.Identity) {
                        element.dataset.view_r_id = this.Identity.r_id;
                    }
                    /**
                     * An element (usually the parent) of this element that can be used as a reference.
                     * When trying to get another view, check to see if this node is its reference.
                     * @type {Node|null}
                     */
                    this.referenceElement = element.parentNode ? element.parentNode : null;
                    var self              = this;
                    Backbone.View.prototype.setElement.apply(this, arguments);
                    this.init_permissions();
                    Sm.loaded.when_loaded('Extras_Draggable', function () {
                        self.makeElementDraggable && self.makeElementDraggable(null, self.handle || self.handle === undefined ? self.handle : true);
                    }, '_SmView_SetElement', 20000);
                },
                renderDragMirror:              function (el) {
                    var clone                 = el.cloneNode(true);
                    var rect                  = clone.getBoundingClientRect();
                    var wrap_thing            = document.createElement('div');
                    wrap_thing.style.position = 'absolute';
                    clone.style.width         = rect.width + 'px';
                    wrap_thing.appendChild(clone);
                    wrap_thing.className      = 'sm-mirror';
                    return wrap_thing;
                },
                /**
                 * Sometimes the relationship needs to be prepared differently before we can use it effectively.
                 * This is a function that does that, needs work
                 * todo WTF?!?
                 * @param View                  {Sm.Core.SmView}         The View that is being wrapped
                 * @param relationship_index    {string}                 The relationship index being referenced
                 * @param Relationship_         {Sm.Core.Relationship}   The actual Relationship that is being referenced
                 * @param container_template    {string=}                A template to use for wrapping the element. First child is the wrap
                 * @see Sm.Core.Relationship
                 * @return {HTMLElement|Element|{get}}
                 */
                wrap_element_for_relationship: function (View, relationship_index, Relationship_, container_template) {
                    return View.get_rendered('Element');
                },
                /**
                 * Find the closest parent element relative to this View that is defined a parent Element
                 * @return {{Relationship: *, el: *}}
                 */
                find_closest_relationship:     function () {
                    var $closest_relationship_holder = this.$el.closest('[data-relationship-r_id]');
                    var self                         = this;
                    var Relationship_                = false;
                    if ($closest_relationship_holder.length) {
                        var relationship_r_id = $closest_relationship_holder.data('relationship-r_id');
                        Relationship_         = Sm.Core.Identifier.identify({r_id: relationship_r_id});
                        Sm.CONFIG.DEBUG && console.log(Relationship_, relationship_r_id);
                    }
                    return {
                        Relationship: Relationship_,
                        el:           $closest_relationship_holder[0]
                    }
                },
                /**
                 * Refresh the old element, replace it with a new one
                 */
                replaceOldElement:             function () {
                    var old_el           = this.el;
                    var rendered_element = this.render({
                        display_type: this.display_type,
                        synchronous:  true
                    });
                    this.old_el &&
                    (this.old_el != rendered_element) &&
                    this.old_el.parentNode &&
                    this.old_el.parentNode.replaceChild(rendered_element, this.old_el);
                    this.old_el          = old_el;
                    this.refresh_element(rendered_element);
                    this.refresh_all();
                },

                /**
                 * Focus the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                focus:      function () {
                    if (this.queryStatus('focused')) return this;
                    this.init_permissions({if_not_init: true});
                    this.setStatus('focused', true);
                    this.get_rendered('$Element').addClass('focused');
                    return this;
                },
                /**
                 * Blur the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                blur:       function () {
                    if (!this.queryStatus('focused')) return this;
                    this.setStatus('focused', false);
                    this.$el.removeClass('focused');
                    return this;
                },
                /**
                 * Select the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                select:     function () {
                    this.setStatus('selected', true);
                    this.get_rendered('$Element').addClass('selected');
                    return this;
                },
                /**
                 * Deselect the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                deselect:   function () {
                    this.setStatus('selected', false);
                    this.get_rendered('$Element').removeClass('selected');
                    return this;
                },
                /**
                 * Activate the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                activate:   function () {
                    this.setStatus('active', true);
                    this.get_rendered('$Element').addClass('activated');
                    return this;
                },
                /**
                 * Deactivate the View
                 * @method
                 * @returns Sm.Core.SmView
                 */
                deactivate: function () {
                    this.setStatus('active', false);
                    this.get_rendered('$Element').removeClass('activated');
                    return this;
                },
                /**
                 * Remove the View from existence
                 * @method
                 * @returns Sm.Core.SmView
                 */
                destroy:    function () {
                    this.undelegateEvents();
                    Sm.CONFIG.DEBUG && console.log("removing - ", this.cid);
                    this.$el.removeData().unbind();
                    this.remove();
                    this.MvCombo.removeView(this.cid);
                    Backbone.View.prototype.remove.call(this);
                    return this;
                },

                /**
                 * Open up a Modal dialog for editing the Entity
                 * @param settings
                 */
                prompt_edit: function (settings) {
                    settings              = settings || {};
                    settings.display_type = settings.display_type || 'full';
                    var MvCombo_          = this.MvCombo;
                    if (!MvCombo_) return;
                    var selected = Sm.Core.Meta.get_MVs('selected');
                    var MvCombos = [];
                    for (var mv_combo_r_id in selected) {
                        if (!selected.hasOwnProperty(mv_combo_r_id)) continue;
                        /**
                         * @type Sm.Core.Identifier
                         */
                        var Identity = selected[mv_combo_r_id];
                        MvCombos.push(Identity.getResource())
                    }
                    var Modal = new Sm.Entities.Abstraction.Modal.Edit({
                        MvCombo:   [MvCombo_],
                        self_type: MvCombo_.type
                    });
                    Modal.open();
                },

                /**
                 * Based on the model, update this view
                 * @param {[]=} changed_attributes
                 * @return {Sm.Core.SmView}
                 */
                update:                          function (changed_attributes) {
                    if (this.display_type.indexOf('modal') > -1) return this;
                    if (!this.MvCombo) return this;
                    this.model          = this.model || this.MvCombo.Model;
                    if (!this.model) {
                        Sm.CONFIG.DEBUG && console.log("There was no model!");
                        return this;
                    }
                    if (!changed_attributes) {
                        this.init_elements();
                        changed_attributes = Object.keys(this.elements)
                    }
                    Sm.CONFIG.DEBUG && console.log(changed_attributes);
                    var type            = this.type.toLowerCase();
                    var type_identifier = type + '_type';
                    Sm.CONFIG.DEBUG && console.log(type_identifier);
                    if (changed_attributes.indexOf(type_identifier) > -1) {
                        this.mark_unrendered();
                        this.replaceOldElement();
                        return this;
                    }

                    for (var i = 0; i < changed_attributes.length; i++) {
                        var name = changed_attributes[i];
                        this._updateElementFromModelProperty(name, this.get_rendered(name));
                    }
                    return this;
                },
                /**
                 * Update an element based on the properties of the Model it is based on
                 * @param model_property
                 * @param element
                 * @private
                 */
                _updateElementFromModelProperty: function (model_property, element) {
                    if (!!element) {
                        var attr = this.model.get(model_property);
                        if (attr != undefined) {
                            element.innerHTML = this.model.escape(model_property);
                        }
                    }
                },

                /**
                 * Keep a version of a function named to be referenced otherwise, useful for referencing functions with a "this" attribute bound to them.
                 * @param name      The name of the function that we are dealing with
                 * @param fn        The function that we are naming/binding
                 * @param _self     What are we binding to the function? Defaults to this
                 * @return {*}
                 */
                add_bound: function (name, fn, _self) {
                    this._fns = this._fns || {};
                    if (!(typeof fn === "function") && !this._fns[name]) {
                        Sm.CONFIG.DEBUG && console.log(fn, name);
                        return function () {};
                    }
                    return this._fns[name] = this._fns[name] || fn.bind(_self || this);
                },
                /**
                 *
                 * @param name    {string}  The name of the function that we are looking for
                 * @param strict  {boolean=false} If we don't find the function, should we return false (strict) or a dummy function (not strict)
                 * @return {*}
                 */
                get_bound: function (name, strict) {
                    this._fns = this._fns || {};
                    return this._fns[name] ? this._fns[name] : (strict ? false : function () {}.bind(this));
                }
            });
            Sm.Core.SmView.replace_with_elements = function (parameters) {
                var referenceElement          = parameters.referenceElement;
                var replaced_MVs              = parameters.replaced_MVs || [];
                var replacement_MVs           = parameters.replacement_MVs || [];
                var replaced_relationships    = parameters.replaced_relationships || [];
                var replacement_relationships = parameters.replacement_relationships || [];
                var items                     = parameters.items || {};
                var forEachView               = typeof parameters.forEachView === "function" ? parameters.forEachView : false;

                //If there are no relationships to VERB to, reject this as unsuccessful
                if (!replacement_MVs.length) return Promise.reject('No replacement Views specified');
                //-------------------
                /** @type {Sm.Core.SmView} */
                var RemovedFirstView;
                /**
                 * Iterate through the Mvs that are being replaced and remove all of them but the last one, which we will save to append children after it.
                 * We remove that View later
                 */
                for (var j = replaced_MVs.length; j--;) {
                    var replaced_MV_r_id = replaced_MVs[j];
                    Sm.CONFIG.DEBUG && console.log(replaced_MV_r_id);
                    /** @type {Sm.Core.MvCombo} */
                    var RemovedMV        = items[replaced_MV_r_id] || Sm.Core.Identifier.identify(replaced_MV_r_id);
                    //Sm.CONFIG.DEBUG && console.log(RemovedMV, Sm.Core.Identifier.registry, Sm.Core.Identifier.registry[replaced_MV_r_id]);
                    if (!RemovedMV) continue;
                    /** @type {Sm.Core.SmView} */
                    var ReplacedView = RemovedMV.getView({strict: true, reference_element: referenceElement});
                    Sm.CONFIG.DEBUG && console.log(replaced_MV_r_id, ReplacedView);
                    if (!RemovedFirstView) {
                        RemovedFirstView = ReplacedView;
                        continue;
                    }
                    ReplacedView.remove();
                }
                /** @type {Promise} First Promise, meant to be used as the starter value for that reduce Array function*/
                var first_promise            = Promise.resolve(RemovedFirstView);
                /** @type {boolean} A simple check to see whether or not the RemovedFirstView has been removed from the screen yet*/
                var has_been_removed         = false;
                /** @type {Sm.Core.SmView}  The first View from that one array, Adding sections after this one is the game.*/
                var FirstView;
                /**
                 * The function that is run for each View. This takes a promise as a parameter and follows it up by rendering itself and appending itself after the previous element
                 * @param {Promise|*|{then:function}}           last_promise
                 * @param {Sm.Core.MvCombo}                     ReplacementMvCombo
                 * @param                                       currentIndex
                 * @return {Promise<Sm.Core.SmView>}
                 */
                var array_reduction_function = function (last_promise, ReplacementMvCombo, currentIndex) {
                    if (!currentIndex && !ReplacementMvCombo) return last_promise;
                    if (typeof ReplacementMvCombo === "string") {
                        if (items[ReplacementMvCombo])
                            ReplacementMvCombo = items[ReplacementMvCombo];
                        else {
                            var RepIdentity = Sm.Core.Identifier.retrieve(ReplacementMvCombo);
                            if (RepIdentity) ReplacementMvCombo = RepIdentity.getResource();
                        }
                    }
                    if (!ReplacementMvCombo || !ReplacementMvCombo.getView) {
                        return last_promise;
                    }
                    /** @type {Sm.Core.SmView} The View in question */
                    var CurrentView   = ReplacementMvCombo.getView({reference_element: referenceElement});
                    /**
                     *
                     * @param PreviousView {Sm.Core.SmView} The View that we dealt with before this one
                     * @return {Promise<Sm.Core.SmView>}
                     */
                    var for_this_view = function (PreviousView) {
                        //Asynchronously render the View, refresh the View's components, and insert it on the screen after the PreviousView
                        return CurrentView.render({
                            if_not_rendered: true,
                            synchronous:     false
                        }).then(function (el) {
                            CurrentView.refresh_all();
                            if (!PreviousView) {
                                Sm.CONFIG.DEBUG && console.log("Previous View does not exist ", PreviousView, CurrentView);
                            }
                            var last_el                  = PreviousView.el;
                            //this is where we are appending the View
                            Sm.Core.util.insertAfter(CurrentView.el, last_el);
                            CurrentView.mark_added();
                            CurrentView.referenceElement = el.parentNode;
                            //Remove the View that we haven't removed yet, say that we have removed it
                            if (!has_been_removed && PreviousView.cid == RemovedFirstView.cid) {
                                RemovedFirstView.remove();
                                has_been_removed = true;
                            }
                            //If the First View has not been declared, mark this one as it and carry on
                            if (!FirstView) FirstView = CurrentView;
                            if (forEachView) forEachView.call(CurrentView);
                            return CurrentView;
                        });

                    };
                    return last_promise.then(for_this_view);
                };
                return replacement_MVs.reduce(array_reduction_function, first_promise).then(function () {
                    //Focus the First View
                    FirstView && FirstView.MvCombo.focus(FirstView);
                    return true;
                });
            };
            Sm.loaded.add('Core_SmView');

//-----------------------------------------------------------------------------------------------------------
            //Initialize the global events
            (function (document) {
                /** @type {int|boolean} */
                var timer           = false;
                var prompt_deletion = function (what_we_gon_delete) {
                    var end_arr = [];
                    for (var i = 0; i < what_we_gon_delete.length; i++) {
                        var Identity = what_we_gon_delete[i];
                        end_arr.push(Identity.ent_id ? Identity.type + ': ' + Identity.ent_id : Identity.type + ": " + (Identity.id ? Identity.id : Identity.r_id));
                    }
                    if (end_arr.length && confirm("Are you sure you want to delete " + end_arr.join(', ')))
                        return Promise.resolve();
                    return Promise.reject();
                };

                var on_delete_press = function () {
                    var selected  = Sm.Core.Meta.MvMaps.selected_MVs;
                    var to_remove = [];
                    for (var r_id in selected) {
                        if (!selected.hasOwnProperty(r_id)) continue;
                        /** @type {Sm.Core.MvCombo} Selected MvCombo */
                        var MvCombo        = selected[r_id].getResource();
                        var Views          = MvCombo.ViewMaps.selected_Views;
                        var has_been_added = false;
                        for (var view_cid in Views) {
                            if (!Views.hasOwnProperty(view_cid)) continue;
                            var selected_View       = Views[view_cid].getResource();
                            var relationship_object = selected_View.find_closest_relationship();
                            /** @type {Sm.Core.Relationship}  */
                            var Relationship;
                            if (relationship_object && (Relationship = relationship_object.Relationship)) {
                                to_remove.push(Relationship.Identity);
                            } else {
                                if (!has_been_added) to_remove.push(MvCombo.Identity);
                            }
                        }
                    }
                    prompt_deletion(to_remove).then(function () {
                        for (var i = 0; i < to_remove.length; i++) {
                            var Identity = to_remove[i];
                            var Resource = Identity.getResource();
                            Resource.destroy({silent: false});
                        }
                    });
                    Sm.CONFIG.DEBUG && console.log(to_remove);

                };
                document.addEventListener('keydown', function (e) {
                    if (e.keyCode == 76 && e.shiftKey) {
                        if (timer == false) {
                            timer = setTimeout(function () {
                                timer = false;
                            }, 500);
                        } else {
                            timer = false;
                            clearTimeout(timer);
                            Sm.CONFIG.DEBUG && console.log(' ---------------------------------------- ');
                            Sm.CONFIG.DEBUG && console.log(' ');
                        }
                    } else if (e.keyCode == 46) {
                        //If we are deleting
                        on_delete_press();
                    }
                });
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode == 16) {
                        if (timer !== false) {
                            clearTimeout(timer);
                            timer = false;
                        }
                    }
                });
            })(document);
        });
define("Sm-Core-SmView", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
define('Sm-Core-Meta',['Emitter'], function (Emitter) {
    /**
     * @class Meta
     * @alias Sm.Core.Meta
     * @extends Emitter
     * @prop {function} add_MV_as                           {@link Sm.Core.Meta#add_MV_as}
     * @prop {function} remove_MV_as                        {@link Sm.Core.Meta#remove_MV_as}
     * @prop {{}}       relationship_types                  {@link Sm.Core.Meta#relationship_types}
     * @prop {{}}       relationship_type_obj               {@link Sm.Core.Meta#relationship_type_obj}
     * @prop {{}}       types                               {@link Sm.Core.Meta#types}
     * @prop {{}}       relationship_aliases                {@link Sm.Core.Meta#relationship_aliases}
     * @prop {function} get_type                            {@link Sm.Core.Meta#get_type}
     * @prop {function} get_possible_relationship_indices   {@link Sm.Core.Meta#get_possible_relationship_indices}
     * @prop {function} get_relationship_type               {@link Sm.Core.Meta#get_relationship_type}
     *
     */
    var Meta                      = Emitter.extend({
        CONFIG:                            {
            DEBUG:       false,
            EDIT:        false,
            DRAG_N_DROP: false
        },
        MvMaps:                            {},
        init:                              function (settings) {
            this.events         = [];
            this._callbacks     = {};
            this.MvMaps         = {
                loaded_MVs:   {},
                focused_MVs:  {},
                selected_MVs: {},
                active_MVs:   {},
                deleted_MVs:  {}
            };
            this.loaded_ent_ids = {};

            settings            = settings || {};
            this.type           = settings.type;
            this.lower_plural   = this.lower_plural || {};
            this.lower_singular = this.lower_singular || {};

            var entities = Sm.Entities;
            for (var entity_name in entities) {
                if (!entities.hasOwnProperty(entity_name)) continue;
                this.lower_singular[entity_name] =
                    this.lower_singular[entity_name]
                    || entity_name.toLowerCase();
                this.lower_plural[entity_name]   =
                    this.lower_plural[entity_name]
                    || (entities[entity_name].plural || entity_name + 's').toLowerCase();
            }
        },
        relationship_types:                {
            children:    1,
            composition: 2,
            macros:      3,
            micros:      4,
            pivots:      5
        },
        relationship_subtypes:             {
            eli5:            1,
            thing_explainer: 2,
            image:           3,
            video:           4,
            audio:           5,
            text:            6
        },
        relationship_type_obj:             {},
        /**
         * Return an Array containing the possible ways that something can be related to another entity based on some properties
         */
        types:                             {
            standard: 1
        },
        /**
         * Sometimes the relationship will have a different index in the receiving class than we can automatically identify.
         * This is the object that links type:alias
         */
        relationship_aliases:              {},
        /**
         * Get the either the index or the ID of the entity based on a provided index or ID
         * @param what_to_get
         * @param identifier
         * @return {*}
         */
        get_type:                          function (what_to_get, identifier) {
            var types = this.types;
            for (var t in types) {
                if (!types.hasOwnProperty(t)) continue;
                if (t == identifier || types[t] == identifier) return what_to_get == 'index' ? t : types[t];
            }
            return false;
        },
        /**
         * Return an Array containing the possible ways that something can be related to another entity based on some properties
         * @alias Sm.Core.Meta#get_possible_relationship_indices
         * @param settings
         * @param settings.map
         * @param settings.OtherMvCombo
         * @param settings.SelfMvCombo
         * @return {[]}                 This returns an array like [null, {relationship index}, ...] when asking for reciprocal indices, or [{rel ind}, ...] otherwise
         */
        get_possible_relationship_indices: function (settings) {
            return [];
        },
        /**
         * Return the type of relationship something is based on some sort of identifier
         * @param {{}}                                                                              settings
         * @param {boolean}                                                                         settings.sub             Are we looking for a subtype?
         * @param {string}                                                                          settings.type            The type to search for. [index|id]
         * @param {int|string}                                                                      settings.identifier      The relationship type (relationship_type_id or relationship_type name)
         * @param {{collection_id:string, dimension_id: string, dictionary_id: string}=}            settings.map             A map object. Only used as support. Not good. Don't know why I did this.
         * @param {boolean=false}                                                                   settings.is_reciprocal   Whether or not the relationship is reciprocal
         * @param {string|int|*}                                                                    identifier
         * @return {string|boolean|int}
         */
        get_relationship_type:             function (settings, identifier) {
            /** NOTE: this is where iterates over object to find return type**.
             settings                  = settings || {};
             /** @type {boolean} Whether the relationship is reciprocal. If so, could possibly change the guess of what the relationship is based on the map */
            var is_reciprocal         = !!settings.is_reciprocal;
            /** @type {string} The type tp find - index|id */
            var type                  = settings.type || 'index';
            /** @type {string} The identifier that we will use to know what we are looking for. Could be an index or ID of the relationship type */
            identifier                = identifier || settings.identifier || false;
            /** @type {{}} The map object of the relationship. When guessing the IDs of the relationship later, this map is what we'll use for the indices */
            var map                   = settings.map || {};
            /**
             * This is the relationship type object that has information on the relationships
             * @type {Meta.relationship_type_obj|{}}
             */
            var relationship_type_obj = !!settings.sub ? this.relationship_subtypes : this.relationship_type_obj;
            /** @type {boolean} Whether or not we are getting the ID */
            var get_id                = (type == 'id');
            /** @type {string|int} The index of the relationship*/
            var index;
            identifier                = identifier || map.relationship_type || false;
            /** @type {*} The object of the Entities that are in the Sm namespace */
            var SmEntities            = Sm.Entities;
            if (!identifier) return false;
            /**
             * Iterate through the relationship type object to find things that are mapped together
             */
            for (var relationship_type_index in relationship_type_obj) {
                if (!relationship_type_obj.hasOwnProperty(relationship_type_index)) continue;
                var rel_type = relationship_type_obj[relationship_type_index];
                /** @type {string} Either the index or the ID based on what we want to retrieve */
                index        = !!get_id && !!rel_type.id ? rel_type.id : relationship_type_index;

                if (get_id) {
                    if (rel_type.id) index = rel_type.id;
                    else index = parseInt(rel_type);
                }
                if (rel_type == identifier) return index;
                // If the Identifier matches the type index, return what we want because it's a match}
                if (identifier == relationship_type_index) return index;
                if (!(typeof rel_type === "object")) continue;
                rel_type.index_singular = rel_type.index_singular || '';
                rel_type.id             = rel_type.id || '';
                // Same for the singular index. If there is a case where there are multiple indices delimited by pipes, search those for the right index
                if (identifier == rel_type.index_singular || rel_type.index_singular.toLowerCase().search(new RegExp("\\|?" + identifier.toLowerCase() + "\\|?")) > -1) return index;
                // If the identifier matches the id, return that
                if (!!rel_type.id && identifier == rel_type.id) return index;
            }
            /**
             * Search the SmEntities to find out what the other type in the map would be. If it's reciprocal, we return the other type based on the
             */
            for (var entity_type in SmEntities) {
                if (!SmEntities.hasOwnProperty(entity_type) || entity_type != this.type) continue;
                //guess the other type
                var probable_other_id = this.lower_singular[entity_type] + '_id';
                //If that's in the map, return the index of the entity we're on if it's not reciprocal. Otherwise, return the relationship index of this entity
                if (probable_other_id in map) return is_reciprocal ? this.lower_plural[entity_type] : this.lower_plural[this.type];
            }
            if (!!settings.sub) {
                Sm.CONFIG.DEBUG && console.log(rel_type);
            }
            return false;
        },
        get_MVs:                           function (type) {
            //Sm.CONFIG.DEBUG && console.log(type, this.MvMaps[type], /loaded|active|focused|selected|deleted/.test(type));
            if (/loaded|active|focused|selected|deleted/.test(type)) return this.MvMaps[type + "_MVs"];
        },
        /**
         * Add Mv as type (linked, active, deleted, focused, selected)
         * @alias Sm.Core.Meta#add_MV_as
         * @param {string}              type_to_add
         * @param {Sm.Core.Identifier}    Id
         */
        add_MV_as:                         function (type_to_add, Id) {
            if (!Id) return this;
            var ent_id = Id.ent_id || Id.getResource().ent_id;
            var rid    = Id.r_id;
            if (!rid) return this;
            var MvMaps = this.MvMaps;
            this.type !== false && Sm.Core.Meta.add_MV_as(type_to_add, Id);
            switch (type_to_add) {
                case 'loaded':
                    MvMaps.loaded_MVs[rid] = Id;
                    break;
                case 'active':
                case 'focused':
                case 'selected':
                    if (!(type_to_add + '_MVs' in MvMaps)) {
                        Sm.CONFIG.DEBUG && console.log(type_to_add, MvMaps);
                        return this;
                    }
                    MvMaps[type_to_add + '_MVs'][rid] = Id;
                    !(rid in MvMaps.loaded_MVs) && (MvMaps.loaded_MVs[rid] = Id);
                    !(rid in MvMaps.active_MVs) && (MvMaps.active_MVs[rid] = Id);
                    break;
            }
            (!!ent_id) && (this.loaded_ent_ids[ent_id] = Id);
            return this;
        },
        /**
         * Remove Mv as type (linked, active, deleted, focused, selected)
         * @alias Sm.Core.Meta#remove_MV_as
         * @param {string}              type_to_remove
         * @param {Sm.Core.Identifier}    Id
         */
        remove_MV_as:                      function (type_to_remove, Id) {
            var rid = Id.r_id;
            if (!rid) return this;
            var name   = type_to_remove + '_MVs';
            var MvMaps = this.MvMaps;
            if (!MvMaps[name]) return false;
            this.type !== false && Sm.Core.Meta.remove_MV_as(type_to_remove, Id);
            (rid in this.MvMaps[name]) && delete this.MvMaps[name][rid];
            if (name == 'loaded') {
                (rid in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[rid];
                (rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
                (rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
            } else if (name == 'active') {
                (rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
                (rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
            }
            return true;
        }
    });
    /**
     * @property lower_plural
     */
    Sm.Core.Meta                  = new Meta({
        type: false
    });
    Sm.Core.Meta.base_constructor = Meta;
    Sm.loaded.add('Core_Meta');
});
/**
 * Created by Sam Washington on 12/28/15.
 */
require([
    'require',
    'Sm-Core-RelationshipIndex',
    'Sm-Core-Relationship',
    'Sm-Core-MvWrapper',
    'Sm-Core-MvCombo',
    'Sm-Core-Identifier',
    'Sm-Core-SmModel',
    'Sm-Core-SmView',
    'Sm-Core-Meta'
], function (require) {
    /**
     * The Core structure of the Sm Namespace
     * @type {{}}
     */
    require(['Sm-Core-RelationshipIndex'], function () {});
    require(['Sm-Core-Relationship'], function () {});
    require(['Sm-Core-MvWrapper'], function () {});
    require(['Sm-Core-MvCombo'], function () {});
    require(['Sm-Core-Identifier'], function () {});
    require(['Sm-Core-SmModel'], function () {});
    require(['Sm-Core-SmView'], function () {});
    require(['Sm-Core-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Core_Identifier',
        'Core_Meta',
        'Core_MvCombo',
        'Core_MvWrapper',
        'Core_Relationship',
        'Core_RelationshipIndex',
        'Core_SmModel',
        'Core_SmView'
    ], Sm, 'Core').then(function (res) {
        Sm.CONFIG.DEBUG && console.log(res);
    }).catch(function (error) {
        Sm.CONFIG.DEBUG && console.log("ERROR:", error);
    });
});
define("Sm-Core-Core", function(){});

/**
 * Created by Sam Washington on 11/27/15.
 */

if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}

var event_map = [];
var regex_on  = /^on/;
for (var event_name in global) {
    //noinspection JSUnfilteredForInLoop
    if (regex_on.test(event_name)) {
        //noinspection JSUnfilteredForInLoop
        event_map.push(event_name.slice(2));
    }
}
require(['require', 'Sm'], function (require) {
    require('Sm');
    var addEvent, removeEvent;
    if (!global.addEventListener) {
        addEvent    = function (el, type, fn) {
            return el.attachEvent('on' + type, wrap(el, type, fn));
        };
        removeEvent = function (el, type, fn) {
            var listener = unwrap(el, type, fn);
            if (listener) {
                return el.detachEvent('on' + type, listener);
            }
        }
    } else {
        addEvent    = function (el, type, fn, capturing) {
            if (!el) {
                return false;
            } else {
                return el.addEventListener(type, fn, capturing);
            }
        };
        removeEvent = function (el, type, fn, capturing) {
            if (!el) {
                console.log(arguments);
                return false;
            }
            return el.removeEventListener(type, fn, capturing);
        }
    }
    var hardCache      = [];
    var fabricateEvent = function (el, type, model) {
        var e;

        if (event_map.indexOf(type) === -1) {
            e = new CustomEvent(type, {detail: model});
        } else {
            if (doc.createEvent) {
                e = doc.createEvent('Event');
                e.initEvent(type, true, true);
            } else if (doc.createEventObject) {
                e = doc.createEventObject();
            }
        }

        if (el.dispatchEvent) {
            el.dispatchEvent(e);
        } else {
            el.fireEvent('on' + type, e);
        }
    };
    var wrapperFactory = function (el, type, fn) {
        return function wrapper(originalEvent) {
            var e             = originalEvent || global.event;
            e.target          = e.target || e.srcElement;
            e.preventDefault  = e.preventDefault || function preventDefault() { e.returnValue = false; };
            e.stopPropagation = e.stopPropagation || function stopPropagation() { e.cancelBubble = true; };
            e.which           = e.which || e.keyCode;
            fn.call(el, e);
        };
    };
    var wrap           = function (el, type, fn) {
        var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
        hardCache.push({
            wrapper: wrapper,
            element: el,
            type:    type,
            fn:      fn
        });
        return wrapper;
    };
    var unwrap         = function (el, type, fn) {
        var i = find(el, type, fn);
        if (i) {
            var wrapper = hardCache[i].wrapper;
            hardCache.splice(i, 1); // free up a tad of memory
            return wrapper;
        }
    };
    var find           = function (el, type, fn) {
        var i, item;
        for (i = 0; i < hardCache.length; i++) {
            item = hardCache[i];
            if (item.element === el && item.type === type && item.fn === fn) {
                return i;
            }
        }
    };

    Sm.loaded.when_loaded('core_util', function () {
        Sm.Core.util.crossvent = {
            add:       addEvent,
            remove:    removeEvent,
            fabricate: fabricateEvent
        };
        Sm.loaded.add('Core_util_crossvent');
    }, 'Core_util_crossvent');
});
define("crossvent", function(){});

/* Tooltipster v3.3.0 */;(function(e,t,n){function s(t,n){this.bodyOverflowX;this.callbacks={hide:[],show:[]};this.checkInterval=null;this.Content;this.$el=e(t);this.$elProxy;this.elProxyPosition;this.enabled=true;this.options=e.extend({},i,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.Status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this._init()}function o(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function f(){return!a&&u}function l(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",i={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,debug:true,delay:200,minWidth:0,maxWidth:null,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},hideOnClick:false,icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,multiple:false,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,positionTrackerCallback:function(e){if(this.option("trigger")=="hover"&&this.option("autoClose")){this.hide()}},restoration:"current",speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};s.prototype={_init:function(){var t=this;if(n.querySelector){var r=null;if(t.$el.data("tooltipster-initialTitle")===undefined){r=t.$el.attr("title");if(r===undefined)r=null;t.$el.data("tooltipster-initialTitle",r)}if(t.options.content!==null){t._content_set(t.options.content)}else{t._content_set(r)}var i=t.options.functionInit.call(t.$el,t.$el,t.Content);if(typeof i!=="undefined")t._content_set(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!u&&t.options.iconDesktop||u&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=true;t._show()}}).on("mouseleave."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(u&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t._showNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!f()||t.options.touchDevices){t._show()}})}}},_show:function(){var e=this;if(e.Status!="shown"&&e.Status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e._showNow()}},e.options.delay)}else e._showNow()}},_showNow:function(n){var r=this;r.options.functionBefore.call(r.$el,r.$el,function(){if(r.enabled&&r.Content!==null){if(n)r.callbacks.show.push(n);r.callbacks.hide=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;if(r.options.onlyOne){e(".tooltipstered").not(r.$el).each(function(t,n){var r=e(n),i=r.data("tooltipster-ns");e.each(i,function(e,t){var n=r.data(t),i=n.status(),s=n.option("autoClose");if(i!=="hidden"&&i!=="disappearing"&&s){n.hide()}})})}var i=function(){r.Status="shown";e.each(r.callbacks.show,function(e,t){t.call(r.$el)});r.callbacks.show=[]};if(r.Status!=="hidden"){var s=0;if(r.Status==="disappearing"){r.Status="appearing";if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+r.options.animation+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.stop().fadeIn(i)}}else if(r.Status==="shown"){i()}}else{r.Status="appearing";var s=r.options.speed;r.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var o="tooltipster-"+r.options.animation,a="-webkit-transition-duration: "+r.options.speed+"ms; -webkit-animation-duration: "+r.options.speed+"ms; -moz-transition-duration: "+r.options.speed+"ms; -moz-animation-duration: "+r.options.speed+"ms; -o-transition-duration: "+r.options.speed+"ms; -o-animation-duration: "+r.options.speed+"ms; -ms-transition-duration: "+r.options.speed+"ms; -ms-animation-duration: "+r.options.speed+"ms; transition-duration: "+r.options.speed+"ms; animation-duration: "+r.options.speed+"ms;",f=r.options.minWidth?"min-width:"+Math.round(r.options.minWidth)+"px;":"",c=r.options.maxWidth?"max-width:"+Math.round(r.options.maxWidth)+"px;":"",h=r.options.interactive?"pointer-events: auto;":"";r.$tooltip=e('<div class="tooltipster-base '+r.options.theme+'" style="'+f+" "+c+" "+h+" "+a+'"><div class="tooltipster-content"></div></div>');if(l())r.$tooltip.addClass(o);r._content_insert();r.$tooltip.appendTo("body");r.reposition();r.options.functionReady.call(r.$el,r.$el,r.$tooltip);if(l()){r.$tooltip.addClass(o+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.css("display","none").fadeIn(r.options.speed,i)}r._interval_set();e(t).on("scroll."+r.namespace+" resize."+r.namespace,function(){r.reposition()});if(r.options.autoClose){e("body").off("."+r.namespace);if(r.options.trigger=="hover"){if(u){setTimeout(function(){e("body").on("touchstart."+r.namespace,function(){r.hide()})},0)}if(r.options.interactive){if(u){r.$tooltip.on("touchstart."+r.namespace,function(e){e.stopPropagation()})}var p=null;r.$elProxy.add(r.$tooltip).on("mouseleave."+r.namespace+"-autoClose",function(){clearTimeout(p);p=setTimeout(function(){r.hide()},r.options.interactiveTolerance)}).on("mouseenter."+r.namespace+"-autoClose",function(){clearTimeout(p)})}else{r.$elProxy.on("mouseleave."+r.namespace+"-autoClose",function(){r.hide()})}if(r.options.hideOnClick){r.$elProxy.on("click."+r.namespace+"-autoClose",function(){r.hide()})}}else if(r.options.trigger=="click"){setTimeout(function(){e("body").on("click."+r.namespace+" touchstart."+r.namespace,function(){r.hide()})},0);if(r.options.interactive){r.$tooltip.on("click."+r.namespace+" touchstart."+r.namespace,function(e){e.stopPropagation()})}}}}if(r.options.timer>0){r.timerHide=setTimeout(function(){r.timerHide=null;r.hide()},r.options.timer+s)}}})},_interval_set:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.Status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.Status=="shown"||t.Status=="appearing")t.hide();t._interval_cancel()}else{if(t.options.positionTracker){var n=t._repositionInfo(t.$elProxy),r=false;if(o(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(o(n.position,t.elProxyPosition.position))r=true}else{if(o(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.reposition();t.options.positionTrackerCallback.call(t,t.$el)}}}},200)},_interval_cancel:function(){clearInterval(this.checkInterval);this.checkInterval=null},_content_set:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.Content=e},_content_insert:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.Content==="string"&&!e.options.contentAsHTML){t.text(e.Content)}else{t.empty().append(e.Content)}},_update:function(e){var t=this;t._content_set(e);if(t.Content!==null){if(t.Status!=="hidden"){t._content_insert();t.reposition();if(t.options.updateAnimation){if(l()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.Status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hide()}},_repositionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},hide:function(n){var r=this;if(n)r.callbacks.hide.push(n);r.callbacks.show=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;var i=function(){e.each(r.callbacks.hide,function(e,t){t.call(r.$el)});r.callbacks.hide=[]};if(r.Status=="shown"||r.Status=="appearing"){r.Status="disappearing";var s=function(){r.Status="hidden";if(typeof r.Content=="object"&&r.Content!==null){r.Content.detach()}r.$tooltip.remove();r.$tooltip=null;e(t).off("."+r.namespace);e("body").off("."+r.namespace).css("overflow-x",r.bodyOverflowX);e("body").off("."+r.namespace);r.$elProxy.off("."+r.namespace+"-autoClose");r.options.functionAfter.call(r.$el,r.$el);i()};if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-"+r.options.animation+"-show").addClass("tooltipster-dying");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(s)}else{r.$tooltip.stop().fadeOut(r.options.speed,s)}}else if(r.Status=="hidden"){i()}return r},show:function(e){this._showNow(e);return this},update:function(e){return this.content(e)},content:function(e){if(typeof e==="undefined"){return this.Content}else{this._update(e);return this}},reposition:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n._repositionInfo(n.$elProxy);var r=null,i=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false);if(n.$elProxy.is("area")){var f=n.$elProxy.attr("shape"),l=n.$elProxy.parent().attr("name"),c=e('img[usemap="#'+l+'"]'),h=c.offset().left,p=c.offset().top,d=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(f=="circle"){var v=parseInt(d[0]),m=parseInt(d[1]),g=parseInt(d[2]);s.dimension.height=g*2;s.dimension.width=g*2;s.offset.top=p+m-g;s.offset.left=h+v-g}else if(f=="rect"){var v=parseInt(d[0]),m=parseInt(d[1]),y=parseInt(d[2]),b=parseInt(d[3]);s.dimension.height=b-m;s.dimension.width=y-v;s.offset.top=p+m;s.offset.left=h+v}else if(f=="poly"){var w=[],E=[],S=0,x=0,T=0,N=0,C="even";for(var k=0;k<d.length;k++){var L=parseInt(d[k]);if(C=="even"){if(L>T){T=L;if(k===0){S=T}}if(L<S){S=L}C="odd"}else{if(L>N){N=L;if(k==1){x=N}}if(L<x){x=L}C="even"}}s.dimension.height=N-x;s.dimension.width=T-S;s.offset.top=p+x;s.offset.left=h+S}else{s.dimension.height=c.outerHeight(false);s.dimension.width=c.outerWidth(false);s.offset.top=p;s.offset.left=h}}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var n=e(t).scrollLeft();if(A-n<0){r=A-n;A=n}if(A+o-n>i){r=A-(i+n-o);A=i+n-o}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A<0&&O+o>i){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;r="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A+o>i&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=i-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A+o>i){A=s.offset.left-D-o-12;r="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}if(!r){r=""}else if(r=="left"){R="tooltipster-arrow-right";r=""}else if(r=="right"){R="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var z=parseFloat(n.$tooltip.css("border-top-width")),W=n.$tooltip.css("border-top-color")}else if(P=="left"){var z=parseFloat(n.$tooltip.css("border-right-width")),W=n.$tooltip.css("border-right-color")}else if(P=="right"){var z=parseFloat(n.$tooltip.css("border-left-width")),W=n.$tooltip.css("border-left-color")}else{var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}if(z>1){z++}var X="";if(z!==0){var V="",J="border-color: "+W+";";if(R.indexOf("bottom")!==-1){V="margin-top: -"+Math.round(z)+"px;"}else if(R.indexOf("top")!==-1){V="margin-bottom: -"+Math.round(z)+"px;"}else if(R.indexOf("left")!==-1){V="margin-right: -"+Math.round(z)+"px;"}else if(R.indexOf("right")!==-1){V="margin-left: -"+Math.round(z)+"px;"}X='<span class="tooltipster-arrow-border" style="'+V+" "+J+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var K='<div class="'+R+' tooltipster-arrow" style="'+r+'">'+X+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(K)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}return n},enable:function(){this.enabled=true;return this},disable:function(){this.hide();this.enabled=false;return this},destroy:function(){var t=this;t.hide();if(t.$el[0]!==t.$elProxy[0]){t.$elProxy.remove()}t.$el.removeData(t.namespace).off("."+t.namespace);var n=t.$el.data("tooltipster-ns");if(n.length===1){var r=null;if(t.options.restoration==="previous"){r=t.$el.data("tooltipster-initialTitle")}else if(t.options.restoration==="current"){r=typeof t.Content==="string"?t.Content:e("<div></div>").append(t.Content).html()}if(r){t.$el.attr("title",r)}t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else{n=e.grep(n,function(e,n){return e!==t.namespace});t.$el.data("tooltipster-ns",n)}return t},elementIcon:function(){return this.$el[0]!==this.$elProxy[0]?this.$elProxy[0]:undefined},elementTooltip:function(){return this.$tooltip?this.$tooltip[0]:undefined},option:function(e,t){if(typeof t=="undefined")return this.options[e];else{this.options[e]=t;return this}},status:function(){return this.Status}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(i,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster-ns"),i=n?e(this).data(n[0]):null;if(i){if(typeof i[t[0]]==="function"){var s=i[t[0]](t[1],t[2])}else{throw new Error('Unknown method .tooltipster("'+t[0]+'")')}if(s!==i){r=s;return false}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{var o=[],u=t[0]&&typeof t[0].multiple!=="undefined",a=u&&t[0].multiple||!u&&i.multiple,f=t[0]&&typeof t[0].debug!=="undefined",l=f&&t[0].debug||!f&&i.debug;this.each(function(){var n=false,r=e(this).data("tooltipster-ns"),i=null;if(!r){n=true}else if(a){n=true}else if(l){console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')}if(n){i=new s(this,t[0]);if(!r)r=[];r.push(i.namespace);e(this).data("tooltipster-ns",r);e(this).data(i.namespace,i)}o.push(i)});if(a)return o;else return this}}};var u=!!("ontouchstart"in t);var a=false;e("body").one("mousemove",function(){a=true})})(jQuery,window,document);
define("tooltipster", function(){});


console.log("BOONMAN");
/*! Select2 4.0.1 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define('select2',["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-d.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){
var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},l,j),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};if("static"!==this.$dropdownParent[0].style.position){var m=this.$dropdownParent.offset();l.top-=m.top,l.left-=m.left}c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("select2/compat/utils",["jquery"],function(a){function b(b,c,d){var e,f,g=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each(function(){0===this.indexOf("select2-")&&g.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each(function(){0!==this.indexOf("select2-")&&(f=d(this),null!=f&&g.push(f))})),b.attr("class",g.join(" "))}return{syncCssClasses:b}}),b.define("select2/compat/containerCss",["jquery","./utils"],function(a,b){function c(a){return null}function d(){}return d.prototype.render=function(d){var e=d.call(this),f=this.options.get("containerCssClass")||"";a.isFunction(f)&&(f=f(this.$element));var g=this.options.get("adaptContainerCssClass");if(g=g||c,-1!==f.indexOf(":all:")){f=f.replace(":all:","");var h=g;g=function(a){var b=h(a);return null!=b?b+" "+a:a}}var i=this.options.get("containerCss")||{};return a.isFunction(i)&&(i=i(this.$element)),b.syncCssClasses(e,this.$element,g),e.css(i),e.addClass(f),e},d}),b.define("select2/compat/dropdownCss",["jquery","./utils"],function(a,b){function c(a){return null}function d(){}return d.prototype.render=function(d){var e=d.call(this),f=this.options.get("dropdownCssClass")||"";a.isFunction(f)&&(f=f(this.$element));var g=this.options.get("adaptDropdownCssClass");if(g=g||c,-1!==f.indexOf(":all:")){f=f.replace(":all:","");var h=g;g=function(a){var b=h(a);return null!=b?b+" "+a:a}}var i=this.options.get("dropdownCss")||{};
return a.isFunction(i)&&(i=i(this.$element)),b.syncCssClasses(e,this.$element,g),e.css(i),e.addClass(f),e},d}),b.define("select2/compat/initSelection",["jquery"],function(a){function b(a,b,c){c.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"),this.initSelection=c.get("initSelection"),this._isInitialized=!1,a.call(this,b,c)}return b.prototype.current=function(b,c){var d=this;return this._isInitialized?void b.call(this,c):void this.initSelection.call(null,this.$element,function(b){d._isInitialized=!0,a.isArray(b)||(b=[b]),c(b)})},b}),b.define("select2/compat/inputData",["jquery"],function(a){function b(a,b,c){this._currentData=[],this._valueSeparator=c.get("valueSeparator")||",","hidden"===b.prop("type")&&c.get("debug")&&console&&console.warn&&console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."),a.call(this,b,c)}return b.prototype.current=function(b,c){function d(b,c){var e=[];return b.selected||-1!==a.inArray(b.id,c)?(b.selected=!0,e.push(b)):b.selected=!1,b.children&&e.push.apply(e,d(b.children,c)),e}for(var e=[],f=0;f<this._currentData.length;f++){var g=this._currentData[f];e.push.apply(e,d(g,this.$element.val().split(this._valueSeparator)))}c(e)},b.prototype.select=function(b,c){if(this.options.get("multiple")){var d=this.$element.val();d+=this._valueSeparator+c.id,this.$element.val(d),this.$element.trigger("change")}else this.current(function(b){a.map(b,function(a){a.selected=!1})}),this.$element.val(c.id),this.$element.trigger("change")},b.prototype.unselect=function(a,b){var c=this;b.selected=!1,this.current(function(a){for(var d=[],e=0;e<a.length;e++){var f=a[e];b.id!=f.id&&d.push(f.id)}c.$element.val(d.join(c._valueSeparator)),c.$element.trigger("change")})},b.prototype.query=function(a,b,c){for(var d=[],e=0;e<this._currentData.length;e++){var f=this._currentData[e],g=this.matches(b,f);null!==g&&d.push(g)}c({results:d})},b.prototype.addOptions=function(b,c){var d=a.map(c,function(b){return a.data(b[0],"data")});this._currentData.push.apply(this._currentData,d)},b}),b.define("select2/compat/matcher",["jquery"],function(a){function b(b){function c(c,d){var e=a.extend(!0,{},d);if(null==c.term||""===a.trim(c.term))return e;if(d.children){for(var f=d.children.length-1;f>=0;f--){var g=d.children[f],h=b(c.term,g.text,g);h||e.children.splice(f,1)}if(e.children.length>0)return e}return b(c.term,d.text,d)?e:null}return c}return b}),b.define("select2/compat/query",[],function(){function a(a,b,c){c.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."),a.call(this,b,c)}return a.prototype.query=function(a,b,c){b.callback=c;var d=this.options.get("query");d.call(null,b)},a}),b.define("select2/dropdown/attachContainer",[],function(){function a(a,b,c){a.call(this,b,c)}return a.prototype.position=function(a,b,c){var d=c.find(".dropdown-wrapper");d.append(b),b.addClass("select2-dropdown--below"),c.addClass("select2-container--below")},a}),b.define("select2/dropdown/stopPropagation",[],function(){function a(){}return a.prototype.bind=function(a,b,c){a.call(this,b,c);var d=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$dropdown.on(d.join(" "),function(a){a.stopPropagation()})},a}),b.define("select2/selection/stopPropagation",[],function(){function a(){}return a.prototype.bind=function(a,b,c){a.call(this,b,c);var d=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$selection.on(d.join(" "),function(a){a.stopPropagation()})},a}),function(c){"function"==typeof b.define&&b.define.amd?b.define("jquery-mousewheel",["jquery"],c):"object"==typeof exports?module.exports=c:c(a)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
//  Underscore.inflection.js
//  (c) 2014 Jeremy Ruppel
//  Underscore.inflection is freely distributable under the MIT license.
//  Portions of Underscore.inflection are inspired or borrowed from ActiveSupport
//  Version 1.0.0

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('inflection',['underscore'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('underscore'));
  } else {
    // Browser globals (root is window)
    factory(root._);
  }
})(this, function(_, undefined) {
  var plurals      = [];
  var singulars    = [];
  var uncountables = [];

  /**
   * Inflector
   */
  var inflector = {

    /**
     * `gsub` is a method that is just slightly different than our
     * standard `String#replace`. The main differences are that it
     * matches globally every time, and if no substitution is made
     * it returns `null`. It accepts a string for `word` and
     * `replacement`, and `rule` can be either a string or a regex.
     */
    gsub: function(word, rule, replacement) {
      var pattern = new RegExp(rule.source || rule, 'gi');

      return pattern.test(word) ? word.replace(pattern, replacement) : null;
    },

    /**
     * `plural` creates a new pluralization rule for the inflector.
     * `rule` can be either a string or a regex.
     */
    plural: function(rule, replacement) {
      plurals.unshift([rule, replacement]);
    },

    /**
     * Pluralizes the string passed to it. It also can accept a
     * number as the second parameter. If a number is provided,
     * it will pluralize the word to match the number. Optionally,
     * you can pass `true` as a third parameter. If found, this
     * will include the count with the output.
     */
    pluralize: function(word, count, includeNumber) {
      var result;

      if (count !== undefined) {
        count = parseFloat(count);
        result = (count === 1) ? this.singularize(word) : this.pluralize(word);
        result = (includeNumber) ? [count, result].join(' ') : result;
      } else {
        if (_(uncountables).include(word)) {
          return word;
        }

        result = word;

        _(plurals).detect(function(rule) {
          var gsub = this.gsub(word, rule[0], rule[1]);

          return gsub ? (result = gsub) : false;
        },
        this);
      }

      return result;
    },

    /**
     * `singular` creates a new singularization rule for the
     * inflector. `rule` can be either a string or a regex.
     */
    singular: function(rule, replacement) {
      singulars.unshift([rule, replacement]);
    },

    /**
     * `singularize` returns the singular version of the plural
     * passed to it.
     */
    singularize: function(word) {
      if (_(uncountables).include(word)) {
        return word;
      }

      var result = word;

      _(singulars).detect(function(rule) {
        var gsub = this.gsub(word, rule[0], rule[1]);

        return gsub ? (result = gsub) : false;
      },
      this);

      return result;
    },

    /**
     * `irregular` is a shortcut method to create both a
     * pluralization and singularization rule for the word at
     * the same time. You must supply both the singular form
     * and the plural form as explicit strings.
     */
    irregular: function(singular, plural) {
      this.plural('\\b' + singular + '\\b', plural);
      this.singular('\\b' + plural + '\\b', singular);
    },

    /**
     * `uncountable` creates a new uncountable rule for `word`.
     * Uncountable words do not get pluralized or singularized.
     */
    uncountable: function(word) {
      uncountables.unshift(word);
    },

    /**
     * `ordinalize` adds an ordinal suffix to `number`.
     */
    ordinalize: function(number) {
      if (isNaN(number)) {
        return number;
      }

      number = number.toString();
      var lastDigit = number.slice(-1);
      var lastTwoDigits = number.slice(-2);

      if (lastTwoDigits === '11' || lastTwoDigits === '12' || lastTwoDigits === '13') {
        return number + 'th';
      }

      switch (lastDigit) {
        case '1':
          return number + 'st';
        case '2':
          return number + 'nd';
        case '3':
          return number + 'rd';
        default:
          return number + 'th';
      }
    },

    /**
     * `titleize` capitalizes the first letter of each word in
     * the string `words`. It preserves the existing whitespace.
     */
    titleize: function(words) {
      if (typeof words !== 'string') {
        return words;
      }

      return words.replace(/\S+/g, function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    },

    /**
     * Resets the inflector's rules to their initial state,
     * clearing out any custom rules that have been added.
     */
    resetInflections: function() {
      plurals      = [];
      singulars    = [];
      uncountables = [];

      this.plural(/$/,                         's');
      this.plural(/s$/,                        's');
      this.plural(/(ax|test)is$/,              '$1es');
      this.plural(/(octop|vir)us$/,            '$1i');
      this.plural(/(octop|vir)i$/,             '$1i');
      this.plural(/(alias|status)$/,           '$1es');
      this.plural(/(bu)s$/,                    '$1ses');
      this.plural(/(buffal|tomat)o$/,          '$1oes');
      this.plural(/([ti])um$/,                 '$1a');
      this.plural(/([ti])a$/,                  '$1a');
      this.plural(/sis$/,                      'ses');
      this.plural(/(?:([^f])fe|([lr])?f)$/,     '$1$2ves');
      this.plural(/(hive)$/,                   '$1s');
      this.plural(/([^aeiouy]|qu)y$/,          '$1ies');
      this.plural(/(x|ch|ss|sh)$/,             '$1es');
      this.plural(/(matr|vert|ind)(?:ix|ex)$/, '$1ices');
      this.plural(/([m|l])ouse$/,              '$1ice');
      this.plural(/([m|l])ice$/,               '$1ice');
      this.plural(/^(ox)$/,                    '$1en');
      this.plural(/^(oxen)$/,                  '$1');
      this.plural(/(quiz)$/,                   '$1zes');

      this.singular(/s$/,                                                            '');
      this.singular(/(n)ews$/,                                                       '$1ews');
      this.singular(/([ti])a$/,                                                      '$1um');
      this.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/, '$1$2sis');
      this.singular(/(^analy)ses$/,                                                  '$1sis');
      this.singular(/([^f])ves$/,                                                    '$1fe');
      this.singular(/(hive)s$/,                                                      '$1');
      this.singular(/(tive)s$/,                                                      '$1');
      this.singular(/([lr])ves$/,                                                    '$1f');
      this.singular(/([^aeiouy]|qu)ies$/,                                            '$1y');
      this.singular(/(s)eries$/,                                                     '$1eries');
      this.singular(/(m)ovies$/,                                                     '$1ovie');
      this.singular(/(ss)$/,                                                         '$1');
      this.singular(/(x|ch|ss|sh)es$/,                                               '$1');
      this.singular(/([m|l])ice$/,                                                   '$1ouse');
      this.singular(/(bus)es$/,                                                      '$1');
      this.singular(/(o)es$/,                                                        '$1');
      this.singular(/(shoe)s$/,                                                      '$1');
      this.singular(/(cris|ax|test)es$/,                                             '$1is');
      this.singular(/(octop|vir)i$/,                                                 '$1us');
      this.singular(/(alias|status)es$/,                                             '$1');
      this.singular(/^(ox)en/,                                                       '$1');
      this.singular(/(vert|ind)ices$/,                                               '$1ex');
      this.singular(/(matr)ices$/,                                                   '$1ix');
      this.singular(/(quiz)zes$/,                                                    '$1');
      this.singular(/(database)s$/,                                                  '$1');

      this.irregular('person', 'people');
      this.irregular('man',    'men');
      this.irregular('child',  'children');
      this.irregular('sex',    'sexes');
      this.irregular('move',   'moves');
      this.irregular('cow',    'kine');

      this.uncountable('equipment');
      this.uncountable('information');
      this.uncountable('rice');
      this.uncountable('money');
      this.uncountable('species');
      this.uncountable('series');
      this.uncountable('fish');
      this.uncountable('sheep');
      this.uncountable('jeans');

      return this;
    }
  };

  /**
   * Underscore integration
   */
  _.mixin(inflector.resetInflections());

  return inflector;
});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Class', 'Sm'], function (require, Class) {
    require('Sm');
    require('Class');

    Sm.loaded.when_loaded('Core', function () {
        /**
         * @class Sm.Entities.Abstraction.Garage
         * @alias Sm.Entities.Abstraction.Garage
         * @property {Function} _default        {@link Sm.Entities.Abstraction.Garage._default   }
         * @property {Function} generate        {@link Sm.Entities.Abstraction.Garage.generate   }
         */
        Sm.Entities.Abstraction.Garage = Class.extend({
            /**
             * Initializes the singleton for an Entity's Garage class
             * @param type              {string} The type of Entity we are dealing with (e.g. Section)
             * @param type_identifier   {string} The index in the Model's properties that lets us know what kind of Entity subtype we're dealing with.
             *                                   For example, this could be "section_type" letting us know that the section type is what tells us that a section is standard or an image or something like that
             */
            init:                      function (type, type_identifier) {
                /**
                 * The Entity type that the Garage deals with (e.g. Section)
                 * @type {string}
                 */
                this.type               = type;
                /**
                 * The index in the Model's properties that lets us know what kind of Entity subtype we're dealing with.
                 * For example, this could be "section_type" letting us know that the section type is what tells us that a section is standard or an image or something like that
                 * @type {string}
                 */
                this.subtype_identifier = type_identifier;
            },
            /**
             * create a default element
             * @param e
             * @return {Element}
             * @private
             */
            _default:                  function (e) {
                Sm.CONFIG.DEBUG && console.log(e);
                var div       = document.createElement('div');
                div.className = 'empty';
                return div;
            },
            /**
             * Check to see that an MvCombo has all of the properties necessary to deal with it correctly, return everything we need to know about it
             * @param Mv_
             * @return {*}
             * @private
             */
            _get_details_from_MvCombo: function (Mv_) {
                if (!Mv_ || typeof Mv_ !== "object") {
                    Mv_ = {};
                }
                var Model_     = Mv_.Model;
                var attributes = Model_ ? Model_.attributes : (Mv_.attributes ? Mv_.attributes : Mv_);
                if (!attributes) attributes = {};

                var type = attributes[this.subtype_identifier];
                if (!type) {type = "standard";}
                var template_type = Sm.Entities[this.type].Meta.get_type('index', type);
                if (!template_type) template_type = 'standard';
                return {
                    Model:         Model_,
                    attributes:    Sm.Core.util.merge_objects(attributes, {_type: template_type}),
                    subtype:       type,
                    template_type: template_type
                }
            },
            /**
             * Generate a string to create an element based on the attributes of an MV
             * @param MvCombo_or_data
             * @param settings
             * @param settings.inner_string_name        What are we creating? [full, preview, inline, tab, tag?]
             * @param settings.is_modal                 Is this for a modal dialog?
             * @param settings.fallback                 If the function doesn't exist, what should we use as backup?
             * @param settings.outer_string_name
             * @param settings.inner_template_string
             * @param settings.template_index
             * @param settings.outer_template_string
             * @param is_synchronous                    Are we to return a promise?
             * @return {*}
             * @param inner_template_string
             */
            _rt:                       function (MvCombo_or_data, settings, is_synchronous, inner_template_string) {
                settings                  = settings || {};
                var is_modal              = settings.is_modal;
                var fallback              = settings.fallback || 'full';
                var outer_string_name     = settings.outer_string_name || (!!is_modal ? 'modal_outer' : 'outer');
                var outer_template_string = settings.outer_template_string || false;
                var template_index        = (settings.template_index || fallback || '').trim().toLowerCase();
                /**This is the name of the type of element we are creating. full? inline? preview? tab? tag? */
                var inner_string_name     = settings.inner_string_name;
                is_synchronous            = (is_synchronous != undefined) ? !!is_synchronous : true;
                var self                  = this;
                //Try to see if we can use the MvCombo
                var V = this._get_details_from_MvCombo(MvCombo_or_data);
                //If it turns out that we couldn't, return a default element
                if (!V) {
                    var def = self._default('could not validate');
                    return !is_synchronous ? (new Promise(function (resolve) {resolve(def);})) : def;
                }
                var self_type        = this.type;
                /**
                 * A copy of the Model's attributes (not a reference)
                 * @type {{}}
                 */
                var model_attributes = V.attributes || MvCombo_or_data;
                /**
                 * The name of the subtype we are dealing with. This might be an ID or a string.
                 * @type {string}
                 */
                var subtype          = V.subtype;
                /**
                 * The name of the template type that we are going to use to generate the element. This is a string based on the subtype of the entity (an example would be image for Section)
                 * @type {string}
                 */
                var template_type    = V.template_type;
                var finished_entity_string;
                /**
                 * Whether or not we should continue to try to resolve. If there is a timer going, after a while we should just give up
                 * @type {boolean}
                 */
                var keep_resolving   = true;


                var timer = false;

                /**
                 * This is a function that is run when resolving a promise or when we are ready to return a string (depending on if we are calling this function synchronously
                 * @return {string|boolean}
                 */
                var when_ready_callback = function () {
                    if (!keep_resolving) return false;
                    var body_name = !!is_modal ? 'modal' : 'body',
                        default_template_obj,
                        index_template_obj,
                        body;

                    /**
                     * We only need to do this if there is either no outer template or no inner template
                     */
                    if (!outer_template_string || !inner_template_string) {
                        /**
                         * This is the template index that is tailored to a specific Entity subtype
                         * @type {object}
                         */
                        index_template_obj = Sm.Entities[self_type].templates[template_type];

                        /**
                         * This contains the default object types
                         */
                        default_template_obj = Sm.Entities[self_type].templates._template;
                        /**
                         * If there is no index object and this is NOT the "standard" one,
                         * make the index object the standard. Otherwise, just use the default.
                         */
                        if (!index_template_obj) {
                            if (template_type != 'standard'
                                && Sm.loaded.is_loaded('Entities_' + self_type + '_templates_standard')
                                && Sm.Entities[self_type].templates.standard) {
                                //use the standard template object
                                index_template_obj = Sm.Entities[self_type].templates.standard;
                            } else {
                                //use the default template object as a last-ditch effort to create something
                                index_template_obj = default_template_obj;
                            }
                        }
                        /** If we have an inner string (full, inline, tag, tab) and that kind of thing matters for the index template obj, */
                        if (!!inner_string_name && (index_template_obj[inner_string_name] || '').length) {
                            inner_template_string = index_template_obj[inner_string_name];
                        } else if (!!inner_string_name && (default_template_obj[inner_string_name] || '').length) {
                            /** Otherwise if it exists in the default obj, use that*/
                            inner_template_string = default_template_obj[inner_string_name];
                        }
                    }
                    /**
                     * If there is no outer template string, make one.
                     */
                    if (!outer_template_string) {
                        if (!!index_template_obj[outer_string_name]) {
                            if (typeof index_template_obj[outer_string_name] === "string") {
                                outer_template_string = index_template_obj[outer_string_name];
                            }
                            /**
                             * Check to see if the preferred template has an "outer"
                             */
                            if (!outer_template_string && !!index_template_obj[outer_string_name]
                                && !!index_template_obj[outer_string_name][template_index]) {
                                outer_template_string = index_template_obj[outer_string_name][template_index];
                            } else {
                                Sm.CONFIG.DEBUG && console.log('Error checking ', template_type, ' ', template_index, ' ', outer_string_name);
                            }
                        } else {
                            //Sm.CONFIG.DEBUG && console.log('Does not exist ', index, ' ', template_index, ' ', outer_string_name);
                        }
                        if (!outer_template_string && !!default_template_obj[outer_string_name]) {
                            if (!outer_template_string && typeof default_template_obj[outer_string_name] === "string") {
                                outer_template_string = default_template_obj[outer_string_name];
                            }
                            /**
                             * If the outer template string was not found and we didn't look for it in the fallback index,
                             * look for it in the fallback index of the default template
                             */
                            if (!outer_template_string && !!default_template_obj[outer_string_name][template_index]) {
                                outer_template_string = default_template_obj[outer_string_name][template_index];
                            }
                            if (!outer_template_string && template_index != fallback && !!default_template_obj[outer_string_name][fallback]) {
                                outer_template_string = default_template_obj[outer_string_name][fallback];
                            }
                        }
                    }
//ssh://codozsqq@host32.registrar-servers.com:21098/home/codozsqq/public_html/
                    //default string!
                    if (!outer_template_string) {
                        outer_template_string = '<div>__CONTENT__</div>';
                    }
                    var cache_name = outer_string_name + template_index + (inner_string_name || body_name);
                    if (!outer_template_string.length) outer_template_string = '__CONTENT__';

                    if (!inner_template_string) {
                        index_template_obj.cache = index_template_obj.cache || {};
                        if (!!index_template_obj.cache[cache_name]) {
                            timer && clearTimeout(parseInt(timer));
                            finished_entity_string = index_template_obj.cache[cache_name](model_attributes);
                            return finished_entity_string;
                        }
                        if ((!index_template_obj[body_name] || !index_template_obj[body_name][template_index] )
                            && !!default_template_obj[body_name] && !!default_template_obj[body_name][template_index]) {
                            index_template_obj[body_name]                 = index_template_obj[body_name] || {};
                            index_template_obj[body_name][template_index] = default_template_obj[body_name][template_index]
                        }
                        if (!index_template_obj[body_name]) {
                            if (template_type != 'standard'
                                && Sm.loaded.is_loaded('Entities_' + self_type + '_templates_standard')
                                && Sm.Entities[self_type].templates.standard[body_name]) {
                                index_template_obj[body_name] = Sm.Entities[self_type].templates.standard[body_name];
                            } else {
                                throw "No Index Template  '" + body_name + "'  to match in " + self_type + " Garage";
                            }
                        }
                        body = index_template_obj[body_name][template_index] || index_template_obj[body_name]['full'];

                        if (!default_template_obj) throw "No Template to match " + self_type;
                        if (!body) throw "No Index Template '" + body_name + '.' + template_index + "' to match " + self_type;
                        if (!default_template_obj[outer_string_name]) throw "No Outer Template to match " + outer_string_name + ' - ';
                        inner_template_string = body;
                    }

                    /**
                     * Generate the controls for whatever we just made
                     */
                    {
                        var _it_button_control_obj = !!is_modal && !!index_template_obj.modal_button_control
                            ? index_template_obj.modal_button_control
                            : index_template_obj.button_control;
                        if (!_it_button_control_obj) {
                            _it_button_control_obj = !!is_modal && !!default_template_obj.modal_button_control
                                ? default_template_obj.modal_button_control
                                : default_template_obj.button_control;
                        }
                        var button_control;
                        if (typeof _it_button_control_obj === "string") {
                            button_control = _it_button_control_obj;
                        } else {
                            button_control = _it_button_control_obj ? _it_button_control_obj[template_index] : false;
                        }
                        if (!button_control && template_index != fallback && !!default_template_obj.button_control[fallback]) {
                            button_control = default_template_obj.button_control[fallback];
                        }
                    }

                    outer_template_string =
                        outer_template_string
                            .replace('__CONTENT__', inner_template_string)
                            .replace('__BUTTON_CONTROL__', button_control || '');

                    /**
                     * Cache the Underscore template to be used later
                     * @type {*|{function}}
                     */
                    var underscore_template                              = _.template(outer_template_string);
                    index_template_obj.cache[template_index + body_name] = underscore_template;
                    timer && clearTimeout(parseInt(timer));
                    finished_entity_string                               = underscore_template(model_attributes);
                    return finished_entity_string;
                };

                try {
                    if (!is_synchronous) {
                        var wait = 'Entities_' + self_type + '_templates__template';
                        var name = '_Entities_' + self_type + '_Garage.' + template_index;
                        return Sm.loaded.when_loaded(wait, when_ready_callback, name, 7000).catch(function () {
                            var e = "Could not load '" + wait + "' in time for '" + name + "'";
                            Sm.CONFIG.DEBUG && console.log(e);
                            throw e;
                        });
                    } else {
                        return when_ready_callback();
                    }
                } catch (e) {
                    return this._default(e);
                }
            },

            /**
             *
             * @param type
             * @param Mv_              The MvCombo that we are generatng an
             * @param is_synchronous
             * @param settings
             * @return {*}
             */
            generate: function (type, Mv_, is_synchronous, settings) {
                if (typeof type === "object") {
                    settings       = type;
                    type           = settings.type || settings.outer_string_name;
                    Mv_            = settings.MvCombo || settings.data || {};
                    is_synchronous = settings.synchronous;
                }
                settings                   = settings || {};
                type                       = (type || ' ').toLowerCase();
                var is_modal               = type.indexOf('modal') > -1;
                type                       = type.replace('.modal', '');
                var type_arr               = type.split('.');
                type                       = type_arr[0];
                settings.inner_string_name = type_arr[0] || settings.inner_string_name;
                var _args                  = arguments;
                if (this[type]) return this[type].apply(this, [
                    Mv_, is_synchronous, settings
                ]);

                return this._rt(Mv_, {
                    template_index:        type,
                    is_modal:              is_modal,
                    fallback:              settings.fallback || 'full',
                    outer_string_name:     settings.outer_string_name,
                    inner_string_name:     settings.inner_string_name,
                    inner_template_string: settings.inner_template_string,
                    template_type:         settings.template_type,
                    outer_template_string: settings.outer_template_string
                }, !!is_synchronous);
            },

            /**
             *
             * @param {Sm.Core.MvCombo} Mv_
             * @param is_synchronous Are we running this synchronously, or should we return a promise? (Allows for server stuff)
             * @param settings
             * @param settings.relationship_RIDs
             * @param settings.listed_relationships_obj
             * @param settings.always_display
             * @param settings.context_id
             * @param settings.display_type
             * @param {Sm.Entities.Abstraction.Garage~on_add}    settings.on_append
             * @param settings.always_display Relationship indices that we are always going to show (even if empty)
             * @return {*}
             */
            relationships:                 function (Mv_, is_synchronous, settings) {
                settings = settings || {};
                if (!Mv_) return is_synchronous ? false : Promise.resolve(false);
                var relationship_index_list = settings.relationship_index_list || [];
                if (!relationship_index_list.length) {
                    var _rels = Mv_.relationships || [];
                    for (var _rel_name in _rels) {
                        if (!_rels.hasOwnProperty(_rel_name)) continue;
                        relationship_index_list.push(_rel_name);
                    }
                }
                /** @type {{relationship_container: '', relationship_index_container: '', relationship_outer: ''}} The template object of this Entity  */
                var _template                          = Sm.Entities[this.type].templates._template;
                _template.relationship_index_container = _template.relationship_index_container || '__CONTENT__';
                /**
                 * If we can't find the necessary part sof the template, return an empty string
                 */
                if (!_template
                    || !_template.relationship_container
                    || !_template.relationship_outer) {
                    return is_synchronous ? '' : Promise.resolve('');
                }

                /**
                 * The context_id (context of the relationship if applicable) is based on the settings, or it is the default
                 * @type {number}
                 */
                var context_id                  = settings.context_id || 0,
                    rel_index_string            = _template.relationship_index_container,
                    rel_index_inner_string      = '',
                    relevant_relationships      = {},
                    obj_of_listed_relationships = settings.listed_relationships_obj || {};
                for (var i = 0; i < relationship_index_list.length; i++) {
                    var relationship_index = relationship_index_list[i];
                    if (!relationship_index) continue;
                    var relationship_index_content = '';

                    var relationships = [], related_items = [];


                    /**
                     * The relationship index with the first character capitalized
                     * @type {string}
                     */
                    var rel_index_to_upper            = relationship_index.charAt(0).toUpperCase() + relationship_index.slice(1);
                    /**
                     * Each relationship index will get its own element. This is the basic template for that element.
                     * @type {string}
                     * @private
                     */
                    var relationship_container_string =
                            _template.relationship_container
                                .replace('__TITLE__', rel_index_to_upper);
                    /**q
                     * If the relationship_RIDs for this index is a falsey value, there are no relationships that we are going to deal with specifically.
                     * Pull all of the known relationships
                     */
                    /** @type {Sm.Core.RelationshipIndex} The RelationshipIndex that we are going to be dealing with */
                    var RelationshipIndex = Mv_.getRelationshipIndex(relationship_index);
                    if (!RelationshipIndex) continue;

                    var relationship_object                    = obj_of_listed_relationships[relationship_index] || RelationshipIndex.get_listed_items(context_id);
                    related_items                              = relationship_object.items || [];
                    relationships                              = relationship_object.relationships || [];
                    relevant_relationships[relationship_index] = [];
                    var display_type                           = settings.display_type || 'preview';
                    for (var k = 0; k < related_items.length; k++) {
                        /** @type {Sm.Core.MvCombo} The MvCombo that is being related ot the original  */
                        var OtherMvCombo = related_items[k];
                        var Relationship = relationships[k];
                        var OtherView    = OtherMvCombo.getView({display_type: display_type});
                        OtherView.render({synchronous: true, display_type: display_type});

                        relevant_relationships[relationship_index].push({
                            MvCombo:      OtherMvCombo,
                            Relationship: Relationship,
                            View:         OtherView
                        })
                    }


                    rel_index_inner_string += relationship_container_string
                        .replace('__CONTENT__', relationship_index_content)
                        .replace('__TYPE__', relationship_index)
                        .replace('__R_ID__', Mv_.r_id);
                }
                var inner_string = rel_index_string
                    .replace('__BUTTON_CONTROL__', '')
                    .replace('__CONTENT__', rel_index_inner_string);

                return this._continue_relationship_render(relevant_relationships, inner_string, is_synchronous, settings.on_append, Mv_);
            },
            /**
             *
             * @param relevant_relationships
             * @param {string}              inner_string            The string that will serve as the overall container for everything
             * @param {boolean}             is_synchronous          Whether or not we should return a string or a promise
             * @param {function}            callback                A function to be run on every View
             * @return {*}
             * @private
             * @param {Sm.Core.MvCombo}     Mv_                     The MvCombo who the relationships belong to
             */
            _continue_relationship_render: function (relevant_relationships, inner_string, is_synchronous, callback, Mv_) {
                var $elem         = $(inner_string);
                var _template     = Sm.Entities[this.type].templates._template;
                /**
                 * @callback Sm.Entities.Abstraction.Garage~on_add
                 * @param {Sm.Core.MvCombo} MvCombo
                 * @param {Sm.Core.SmView} View
                 * @param {string} relationship_index
                 */
                callback          = typeof callback === "function" ? callback : false;
                /**
                 * An array of Views that have already been appended to the Element (shouldn't happen).
                 * This is meant to let us know which views need to be cloned
                 * @type {Array}
                 */
                var appendedViews = [];
                for (var loop_rel_index in relevant_relationships) {
                    if (!relevant_relationships.hasOwnProperty(loop_rel_index)) continue;
                    var holder = $elem.children('.' + loop_rel_index + '-container');
                    if (holder[0]) {
                        var related_views = relevant_relationships[loop_rel_index];
                        for (var k = 0; k < related_views.length; k++) {
                            var View_         = related_views[k].View;
                            /** @type {Sm.Core.Relationship} */
                            var Relationship_ = related_views[k].Relationship;
                            if (!View_.MvCombo) continue;
                            if (appendedViews.indexOf(View_.MvCombo.r_id) > -1) View_ = View_.clone();

                            var outer_string = _template.relationship_outer.replace('__CONTENT__', '').replace('__R_ID__', Relationship_.Identity.r_id).replace('__MV_R_ID__', Mv_ ? Mv_.r_id : 'null');
                            var $outer       = $(outer_string);
                            var content      = $outer.find('.content');
                            if (content[0]) {
                                content[0].appendChild(View_.get_rendered('Element'));
                                holder[0].appendChild($outer[0]);
                                appendedViews.push(View_.MvCombo.r_id);
                                View_.mark_added();
                            } else {
                                Sm.CONFIG.DEBUG && console.log($outer, content, View_);
                            }
                            if (callback) callback(View_.MvCombo, View_, loop_rel_index);
                        }
                    } else {
                        Sm.CONFIG.DEBUG && console.log(holder);
                    }
                }
                var result = $elem[0];
                return is_synchronous ? result : Promise.resolve(result);
            }
        });
        Sm.loaded.add('Entities_Abstraction_Garage');
    }, 'Entities_Abstraction_Garage');
});
define("Sm/Entities/Abstraction/Garage", function(){});

//noinspection BadExpressionStatementJS

var BASE_URL = "/resource/js/";
var CHI_URL  = BASE_URL + "chi/";
require.config({
    paths: {
        jquery:      BASE_URL + "vendor/jquery.min",
        Promise:     BASE_URL + "std/Promise",
        backbone:    BASE_URL + "vendor/backbone",
        Cocktail:    BASE_URL + "vendor/Cocktail",
        underscore:  BASE_URL + "vendor/underscore",
        crossvent:   BASE_URL + "vendor/crossvent",
        inflection:  BASE_URL + "vendor/underscore.inflection",
        tooltipster: BASE_URL + "vendor/jquery.tooltipster.min",
        select2:     BASE_URL + "vendor/jquery.select2.full",

        SmHighlight: BASE_URL + "std/sm_highlight",

        Class:   CHI_URL + "abstraction/Class",
        Emitter: CHI_URL + "abstraction/Emitter",
        Sm:      CHI_URL + "Sm",

        /////////////////
        "Sm-Core-View":              CHI_URL + "Sm/Core/View",
        "Sm-Core-Core":              CHI_URL + "Sm/Core/Core",
        "Sm-Core-Identifier":        CHI_URL + "Sm/Core/Identifier",
        "Sm-Core-Meta":              CHI_URL + "Sm/Core/Meta",
        "Sm-Core-MvCombo":           CHI_URL + "Sm/Core/MvCombo",
        "Sm-Core-MvWrapper":         CHI_URL + "Sm/Core/MvWrapper",
        "Sm-Core-Relationship":      CHI_URL + "Sm/Core/Relationship",
        "Sm-Core-RelationshipIndex": CHI_URL + "Sm/Core/RelationshipIndex",
        "Sm-Core-SmModel":           CHI_URL + "Sm/Core/SmModel",
        "Sm-Core-SmView":            CHI_URL + "Sm/Core/SmView",
        "Sm-Core-util":              CHI_URL + "Sm/Core/util",

        /////////////////
        "Sm-Entities-Abstraction-ModalEdit":            CHI_URL + "Sm/Entities/Abstraction/ModalEdit",
        "Sm-Entities-Abstraction-mixins-SidebarModule": CHI_URL + "Sm/Entities/Abstraction/SidebarModule",

        /////////////////
        "Sm-Entities-Page-Wrapper":                                             CHI_URL + "Sm/Entities/Page/Wrapper",
        "Sm-Entities-Page-MvCombo":                                             CHI_URL + "Sm/Entities/Page/MvCombo",
        "Sm-Entities-Page-View":                                                CHI_URL + "Sm/Entities/Page/View",
        "Sm-Entities-Page-Model":                                               CHI_URL + "Sm/Entities/Page/Model",
        "Sm-Entities-Page-Meta":                                                CHI_URL + "Sm/Entities/Page/Meta",
        "Sm-Entities-Page-Garage":                                              CHI_URL + "Sm/Entities/Page/Garage",
        "Sm-Entities-Page-main":                                                CHI_URL + "Sm/Entities/Page/main",
        "Sm-Entities-Section-main":                                             CHI_URL + "Sm/Entities/Section/main",
        "Sm-Entities-Collection-main":                                          CHI_URL + "Sm/Entities/Collection/main",
        "Sm-Entities-Dimension-main":                                           CHI_URL + "Sm/Entities/Dimension/main",
        "Sm-Entities-Dictionary-main":                                          CHI_URL + "Sm/Entities/Dictionary/main",
        "Sm-Entities-Concept-main":                                             CHI_URL + "Sm/Entities/Concept/main",
        "Sm-Entities-Page-templates-_template":                                 CHI_URL + "Sm/Entities/Page/templates/_template",
        "Sm-Entities-Page-templates-standard":                                  CHI_URL + "Sm/Entities/Page/templates/standard",
        "Sm-Entities-Collection-MvCombo":                                       CHI_URL + "Sm/Entities/Collection/MvCombo",
        "Sm-Entities-Collection-Wrapper":                                       CHI_URL + "Sm/Entities/Collection/Wrapper",
        "Sm-Entities-Collection-View":                                          CHI_URL + "Sm/Entities/Collection/View",
        "Sm-Entities-Collection-Model":                                         CHI_URL + "Sm/Entities/Collection/Model",
        "Sm-Entities-Collection-Meta":                                          CHI_URL + "Sm/Entities/Collection/Meta",
        "Sm-Entities-Collection-Garage":                                        CHI_URL + "Sm/Entities/Collection/Garage",
        "Sm-Entities-Collection-templates-_template":                           CHI_URL + "Sm/Entities/Collection/templates/_template",
        "Sm-Entities-Collection-templates-standard":                            CHI_URL + "Sm/Entities/Collection/templates/standard",
        "Sm-Entities-Dictionary-MvCombo":                                       CHI_URL + "Sm/Entities/Dictionary/MvCombo",
        "Sm-Entities-Dictionary-Wrapper":                                       CHI_URL + "Sm/Entities/Dictionary/Wrapper",
        "Sm-Entities-Dictionary-View":                                          CHI_URL + "Sm/Entities/Dictionary/View",
        "Sm-Entities-Dictionary-Model":                                         CHI_URL + "Sm/Entities/Dictionary/Model",
        "Sm-Entities-Dictionary-Meta":                                          CHI_URL + "Sm/Entities/Dictionary/Meta",
        "Sm-Entities-Dictionary-Garage":                                        CHI_URL + "Sm/Entities/Dictionary/Garage",
        "Sm-Entities-Dictionary-templates-_template":                           CHI_URL + "Sm/Entities/Dictionary/templates/_template",
        "Sm-Entities-Dictionary-templates-standard":                            CHI_URL + "Sm/Entities/Dictionary/templates/standard",
        "Sm-Entities-Dimension-MvCombo":                                        CHI_URL + "Sm/Entities/Dimension/MvCombo",
        "Sm-Entities-Dimension-Wrapper":                                        CHI_URL + "Sm/Entities/Dimension/Wrapper",
        "Sm-Entities-Dimension-View":                                           CHI_URL + "Sm/Entities/Dimension/View",
        "Sm-Entities-Dimension-Model":                                          CHI_URL + "Sm/Entities/Dimension/Model",
        "Sm-Entities-Dimension-Meta":                                           CHI_URL + "Sm/Entities/Dimension/Meta",
        "Sm-Entities-Dimension-Garage":                                         CHI_URL + "Sm/Entities/Dimension/Garage",
        "Sm-Entities-Dimension-templates-_template":                            CHI_URL + "Sm/Entities/Dimension/templates/_template",
        "Sm-Entities-Dimension-templates-standard":                             CHI_URL + "Sm/Entities/Dimension/templates/standard",
        "Sm-Entities-Section-MvCombo":                                          CHI_URL + "Sm/Entities/Section/MvCombo",
        "Sm-Entities-Section-Wrapper":                                          CHI_URL + "Sm/Entities/Section/Wrapper",
        "Sm-Entities-Section-View":                                             CHI_URL + "Sm/Entities/Section/View",
        "Sm-Entities-Section-Model":                                            CHI_URL + "Sm/Entities/Section/Model",
        "Sm-Entities-Section-Meta":                                             CHI_URL + "Sm/Entities/Section/Meta",
        "Sm-Entities-Section-Garage":                                           CHI_URL + "Sm/Entities/Section/Garage",
        "Sm-Entities-Section-templates-_template":                              CHI_URL + "Sm/Entities/Section/templates/_template",
        "Sm-Entities-Section-templates-standard":                               CHI_URL + "Sm/Entities/Section/templates/standard",
        "Sm-Entities-Section-templates-definition":                             CHI_URL + "Sm/Entities/Section/templates/definition",
        "Sm-Entities-Section-templates-image":                                  CHI_URL + "Sm/Entities/Section/templates/image",
        "Sm-Entities-Section-RelationshipAbstraction-pivots_RelationshipIndex": CHI_URL + "Sm/Entities/Section/RelationshipAbstraction/pivots_RelationshipIndex",
        "Sm-Entities-Concept-MvCombo":                                          CHI_URL + "Sm/Entities/Concept/MvCombo",
        "Sm-Entities-Concept-Wrapper":                                          CHI_URL + "Sm/Entities/Concept/Wrapper",
        "Sm-Entities-Concept-View":                                             CHI_URL + "Sm/Entities/Concept/View",
        "Sm-Entities-Concept-Model":                                            CHI_URL + "Sm/Entities/Concept/Model",
        "Sm-Entities-Concept-Meta":                                             CHI_URL + "Sm/Entities/Concept/Meta",
        "Sm-Entities-Concept-Garage":                                           CHI_URL + "Sm/Entities/Concept/Garage",
        "Sm-Entities-Concept-templates-_template":                              CHI_URL + "Sm/Entities/Concept/templates/_template",
        "Sm-Entities-Concept-templates-standard":                               CHI_URL + "Sm/Entities/Concept/templates/standard"
    }
});
define("require_config", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Collection definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Collection           = Sm.Entities.Collection || {};
    Sm.Entities.Collection.templates = Sm.Entities.Collection.templates || {};
    require(['Sm-Entities-Collection-MvCombo'], function () {});
    require(['Sm-Entities-Collection-Garage'], function () {});
    require(['Sm-Entities-Collection-Wrapper'], function () {});
    require(['Sm-Entities-Collection-View'], function () {});
    require(['Sm-Entities-Collection-Model'], function () {});
    require(['Sm-Entities-Collection-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Collection_MvCombo',
        'Entities_Collection_Wrapper',
        'Entities_Collection_View',
        'Entities_Collection_Model',
        'Entities_Collection_Meta',
        'Entities_Collection_Garage'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Collection.Wrapper.hydrate({elements: $body.find('.spwashi-collection')});
        Sm.loaded.add('Collection__core');
        Sm.loaded.when_loaded(['Entities_Collection_Garage'], function () {Sm.loaded.add('Collection')});
        Sm.CONFIG.DEBUG && console.log(' --- Collection has been loaded!');
        Sm.Extras.visual_debug('Collection has been loaded!');
    }, 'Collection');
});
define("Sm-Entities-Collection-main", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Dictionary definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Dictionary           = Sm.Entities.Dictionary || {};
    Sm.Entities.Dictionary.templates = Sm.Entities.Dictionary.templates || {};
    Sm.Entities.Dictionary.plural    = 'Dictionaries';
    require(['Sm-Entities-Dictionary-MvCombo'], function () {});
    require(['Sm-Entities-Dictionary-Wrapper'], function () {});
    require(['Sm-Entities-Dictionary-View'], function () {});
    require(['Sm-Entities-Dictionary-Garage'], function () {});
    require(['Sm-Entities-Dictionary-Model'], function () {});
    require(['Sm-Entities-Dictionary-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Dictionary_MvCombo',
        'Entities_Dictionary_Wrapper',
        'Entities_Dictionary_View',
        'Entities_Dictionary_Model',
        'Entities_Dictionary_Meta',
        'Entities_Dictionary_Garage'
    ], function () {
        var $body        = $(document.body);
        var dictionaries = $body.find('.spwashi-dictionary');
        Sm.Entities.Dictionary.Wrapper.hydrate({elements: dictionaries});
        Sm.loaded.add('Dictionary__core');
        Sm.loaded.when_loaded(['Entities_Dictionary_Garage'], function () {Sm.loaded.add('Dictionary')});
        
        for (var d = 0; d < dictionaries.length; d++) {
            var obj      = dictionaries[d];
            var $obj     = $(obj);
            var checkbox = $obj.find('input[type=checkbox]')[0];
            if (!checkbox) continue;
            if (checkbox.checked) {
                var Identity = Sm.Core.Identifier.retrieve(obj.dataset.ent_id);
                if (Identity) {
                    var Mv = Identity.getResource();
                    Mv && Mv.activate();
                }
            }
        }
        Sm.CONFIG.DEBUG && console.log(' --- Dictionary has been loaded!');
        Sm.Extras.visual_debug('Dictionary has been loaded!');
    }, 'Dictionary');
});
define("Sm-Entities-Dictionary-main", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Page definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Page           = Sm.Entities.Page || {};
    Sm.Entities.Page.templates = Sm.Entities.Page.templates || {};
    require(['Sm-Entities-Page-MvCombo'], function () {});
    require(['Sm-Entities-Page-Wrapper'], function () {});
    require(['Sm-Entities-Page-View'], function () {});
    require(['Sm-Entities-Page-Garage'], function () {});
    require(['Sm-Entities-Page-Model'], function () {});
    require(['Sm-Entities-Page-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Page_MvCombo',
        'Entities_Page_Wrapper',
        'Entities_Page_View',
        'Entities_Page_Model',
        'Entities_Page_Garage',
        'Entities_Page_Meta'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Page.Wrapper.hydrate({elements: $body.find('.spwashi-page')});
        Sm.loaded.add('Page');
        Sm.loaded.add('Page__core');
        Sm.CONFIG.DEBUG && console.log(' --- Page has been loaded!');
        Sm.Extras.visual_debug('Page has been loaded!');
    }, 'Page');
});
define("Sm-Entities-Page-main", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core'
], function (require) {
    /**
     * Loads the Dimension definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Dimension           = Sm.Entities.Dimension || {};
    Sm.Entities.Dimension.templates = Sm.Entities.Dimension.templates || {};
    require(['Sm-Entities-Dimension-MvCombo'], function () {});
    require(['Sm-Entities-Dimension-Wrapper'], function () {});
    require(['Sm-Entities-Dimension-View'], function () {});
    require(['Sm-Entities-Dimension-Garage'], function () {});
    require(['Sm-Entities-Dimension-Model'], function () {});
    require(['Sm-Entities-Dimension-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Dimension_MvCombo',
        'Entities_Dimension_Wrapper',
        'Entities_Dimension_View',
        'Entities_Dimension_Model',
        'Entities_Dimension_Meta'
    ], function () {
        var $body      = $(document.body);
        Sm.Entities.Dimension.Wrapper.hydrate({elements: $body.find('.spwashi-dimension')});
        var active_MVS = Sm.Entities.Dimension.Wrapper.MvMaps.active_MVs;
        for (var MV_ID in active_MVS) {
            if (!active_MVS.hasOwnProperty(MV_ID)) continue;
            if (active_MVS[MV_ID].MvCombo) {
                active_MVS[MV_ID].MvCombo.focus();
                break;
            }
        }
        Sm.loaded.add('Dimension__core');
        Sm.loaded.when_loaded(['Entities_Dimension_Garage'], function () {Sm.loaded.add('Dimension')});
        Sm.CONFIG.DEBUG && console.log(' --- Dimension has been loaded!');
        Sm.Extras.visual_debug('Dimension has been loaded!');
    }, 'Dimension');
});
define("Sm-Entities-Dimension-main", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Concept definition (not necessarily on every concept)
     * @type {{}}
     */
    Sm.Entities.Concept           = Sm.Entities.Concept || {};
    Sm.Entities.Concept.templates = Sm.Entities.Concept.templates || {};
    require(['Sm-Entities-Concept-MvCombo'], function () {});
    require(['Sm-Entities-Concept-Wrapper'], function () {});
    require(['Sm-Entities-Concept-View'], function () {});
    require(['Sm-Entities-Concept-Garage'], function () {});
    require(['Sm-Entities-Concept-Model'], function () {});
    require(['Sm-Entities-Concept-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Concept_MvCombo',
        'Entities_Concept_Wrapper',
        'Entities_Concept_View',
        'Entities_Concept_Model',
        'Entities_Concept_Meta',
        'Entities_Concept_Garage'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Concept.Wrapper.hydrate({elements: $body.find('.spwashi-concept')});
        Sm.loaded.add('Concept__core');
        Sm.loaded.when_loaded(['Entities_Concept_Garage'], function () {Sm.loaded.add('Concept')}, 'Concept');
        Sm.CONFIG.DEBUG && console.log(' --- Concept has been loaded!');
        Sm.Extras.visual_debug('Concept has been loaded!');
    }, 'Concept');
});
define("Sm-Entities-Concept-main", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Section definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Section                         = Sm.Entities.Section || {};
    Sm.Entities.Section.templates               = Sm.Entities.Section.templates || {};
    Sm.Entities.Section.RelationshipAbstraction = Sm.Entities.Section.RelationshipAbstraction || {};
    require(['Sm-Entities-Section-Meta'], function () {});
    require(['Sm-Entities-Section-MvCombo'], function () {});
    require(['Sm-Entities-Section-Wrapper'], function () {});
    require(['Sm-Entities-Section-View'], function () {});
    require(['Sm-Entities-Section-Garage'], function () {});
    require(['Sm-Entities-Section-Model'], function () {});
    require(['Sm-Entities-Section-RelationshipAbstraction-pivots_RelationshipIndex'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Section_MvCombo',
        'Entities_Section_Wrapper',
        'Entities_Section_View',
        'Entities_Section_Model',
        'Entities_Section_Meta',
        'Entities_Section_Garage',
        'Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex'
    ], function () {

        Sm.loaded.add('Section__core');
        Sm.loaded.when_loaded(['Entities_Section_Garage', 'Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex'], function () {Sm.loaded.add('Section')});

        var $body = $(document.body);
        Sm.Entities.Section.Wrapper.hydrate({elements: $body.find('.spwashi-section')});
        Sm.CONFIG.DEBUG && console.log(' --- Section has been loaded!');
        Sm.Extras.visual_debug('Section has been loaded!');
    }, 'Section');
});
define("Sm-Entities-Section-main", function(){});

/**
 * Created by Sam Washington on 12/21/15.
 */


require(['require', 'Sm', 'crossvent'], function (require) {
    var el_documentElement = window.document.documentElement;
    var el_body            = document.body;
    var $_window           = $(window);

    Sm.loaded.when_loaded(['Core', 'Core_util_crossvent'], function () {
        var crossvent = Sm.Core.util.crossvent;

        /**
         * @name dragUtil
         * @type {{getNextElement: Function, getRectHeight: Function, getRectWidth: Function, is_input: Function, getScroll: Function, getParent: Function, which_mouse_button: Function, always: Function, never: Function}}
         */
        var dragUtil  = {
            getNextElement    : function (el) {
                return el.nextElementSibling || manually();
                function manually() {
                    var sibling = el;
                    do {
                        sibling = sibling.nextSibling;
                    } while (sibling && sibling.nodeType !== 1);
                    return sibling;
                }
            },
            getRectHeight     : function (rect) {
                return rect.width || (rect.right - rect.left);
            },
            getRectWidth      : function (rect) {
                return rect.height || (rect.bottom - rect.top);
            },
            getOffset         : function (el, minus_scroll) {
                var rect = el.getBoundingClientRect();
                var self = this;
                var s_x  = self.getScroll('scrollLeft', 'pageXOffset');
                var s_y  = self.getScroll('scrollTop', 'pageYOffset');

                if (!!minus_scroll) {
                    s_x *= 0;
                    s_y *= 0;
                }

                return {
                    left: rect.left + s_x,
                    top : rect.top + s_y
                };
            },
            get_event_host    : function (e) {
                // on touchend event, we have to use `e.changedTouches`
                // see http://stackoverflow.com/questions/7192563/touchend-event-properties
                // see https://github.com/bevacqua/dragula/issues/34
                if (e.targetTouches && e.targetTouches.length) {
                    return e.targetTouches[0];
                }
                if (e.changedTouches && e.changedTouches.length) {
                    return e.changedTouches[0];
                }
                return e;
            },
            get_coordinate    : function (coordinate, e) {
                var host    = this.get_event_host(e);
                var missMap = {
                    pageX: 'clientX', // IE8
                    pageY: 'clientY' // IE8
                };
                if (coordinate in missMap && !(coordinate in host) && missMap[coordinate] in host) {
                    coordinate = missMap[coordinate];
                }
                return host[coordinate];
            },
            is_input          : function (el) {
                return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT';
            },
            getScroll         : function (scrollProp, offsetProp) {
                if (typeof global[offsetProp] !== 'undefined') {
                    return global[offsetProp];
                }
                if (el_documentElement.clientHeight) {
                    return el_documentElement[scrollProp];
                }
                return document.body[scrollProp];
            },
            getParent         : function (el) {
                return (!el || !el.parentNode || el.parentNode == document) ? null : el.parentNode;
            },
            which_mouse_button: function (e) {
                if (e.touches !== void 0) { return e.touches.length; }
                if (e.buttons !== void 0) { return e.buttons; }
                if (e.which !== void 0) { return e.which; }
                var button = e.button;
                if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
                    //noinspection JSBitwiseOperatorUsage
                    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
                }
            },
            getElOffset       : function (element) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while (element);

                return {
                    top : top,
                    left: left
                };
            },
            always            : function () {return true;},
            never             : function () {return false;},
            pn_touch          : function (el, op, type, fn) {
                var touch     = {
                    mouseup  : 'touchend',
                    mousedown: 'touchstart',
                    mousemove: 'touchmove'
                };
                var microsoft = {
                    mouseup  : 'MSPointerUp',
                    mousedown: 'MSPointerDown',
                    mousemove: 'MSPointerMove'
                };
                if (global.navigator.msPointerEnabled) {
                    crossvent[op](el, microsoft[type], fn);
                }
                crossvent[op](el, touch[type], fn);
                crossvent[op](el, type, fn);
            }
        };
        var Draggable = Sm.Extras.Draggable = {
            position            : {
                mouse: {
                    x: 0,
                    y: 0
                }
            },
            mouse_event_listener: function (e) {
                this.position.mouse.x = e.clientX;
                this.position.mouse.y = e.clientY;
            },
            /**
             * @alias Sm.Extras.Draggable.mixin
             * @param settings
             * @param settings.can_start
             * @param settings.can_accept
             * @param settings.data
             * @param settings.el
             */
            mixin               : function (settings) {
                settings       = settings || {};
                this.el        = this.el || settings.el || null;
                this.$el       = this.$el || $(this.el);
                var d_self     = this;
                var can_start  = dragUtil.never;
                var can_accept = dragUtil.never;
                if (!settings.can_start) {
                    can_start = dragUtil.never;
                } else if (settings.can_start === true) {
                    can_start = dragUtil.always;
                } else if (typeof settings.can_start === "function") {
                    can_start = settings.can_start;
                }
                if (!settings.can_accept) {
                    can_accept = dragUtil.never;
                } else if (settings.can_accept === true) {
                    can_accept = dragUtil.always;
                } else if (typeof settings.can_accept === "function") {
                    can_accept = settings.can_accept;
                }
                var s_data = settings.data || {};

                this.makeElementDraggable   = function (elem, handle) {
                    var el   = elem || this.el;
                    this.$el = this.$el || $(el);
                    if (typeof  handle == "boolean") {
                        handle && (handle = this.$el.find('.handle')[0]);
                    } else if (typeof  handle == 'string') {
                        handle = this.$el.find(handle)[0];
                    } else if (Sm.Core.util.isElement(handle)) {} else {
                        handle = false;
                    }
                    handle   = typeof handle !== "undefined" ? handle : el;

                    el.sm_Draggable         = this;
                    el.dataset.sm_draggable = true;
                    this._draggable.data    = s_data;
                    if (handle)
                        dragUtil.pn_touch(handle, 'add', 'mousedown', this.add_bound('grab', this._draggable.grab, this._draggable));
                };
                this.removeElementDraggable = function (elem, handle) {
                    var el                  = elem || this.el;
                    el.sm_Draggable         = false;
                    el.dataset.sm_draggable = false;
                    this._draggable.data    = {};

                    if (typeof  handle == "boolean") {
                        handle && (handle = this.$el.find('.handle')[0]);
                    } else if (typeof  handle == 'string') {
                        handle = this.$el.find(handle)[0];
                    } else if (Sm.Core.util.isElement(handle)) {} else {
                        handle = false;
                    }
                    handle = handle !== "undefined" ? handle : el;
                    if (handle)
                        dragUtil.pn_touch(handle, 'remove', 'mousedown', this.add_bound('grab', this._draggable.grab, this._draggable));
                };
                this.setDraggingStatus      = function (set_to_on) {
                    if (!set_to_on) {
                        this.$el.removeClass('sm-transit');
                    } else {
                        this.$el.addClass('sm-transit');
                    }
                };

                /**
                 * @param {HTMLElement} el
                 * @type {Function|*}
                 */
                this.renderDragMirror = this.renderDragMirror || function (el) {
                        /** @type {HTMLElement|Node} */
                        var _mirror            = el.cloneNode(true);
                        _mirror.style.position = 'absolute';
                        _mirror.style.width    = el.offsetWidth;
                        _mirror.style.height   = el.offsetHeight;
                        return _mirror;
                    };
                /**
                 * Keep a version of a function named to be referenced otherwise, useful for referencing functions with a "this" attribute bound to them.
                 * @type {Function|*}
                 */
                this.add_bound        = this.add_bound || function (name, fn, _self) {
                        this._fns = this._fns || {};
                        if (!(typeof fn === "function")) {
                            Sm.CONFIG.DEBUG && console.log(fn, name);
                            return function () {};
                        }
                        return this._fns[name] = this._fns[name] || fn.bind(_self || this);
                    };
                this.get_bound        = this.get_bound || function (name) {
                        return this._fns[name] ? this._fns[name] : function () {}.bind(this);
                    };
                this._draggable       = {
                    status  : {
                        is_draggable         : false,
                        is_dragging          : false,
                        is_grabbed           : false,
                        _grab_has_been_called: false,
                        is_animated          : false
                    },
                    position: {
                        offset      : {x: 0, y: 0},
                        latest_mouse: {x: 0, y: 0}
                    },
                    elements: {
                        last_hover      : null,
                        last_drop_target: null
                    },
                    /**
                     * Is the element in the mirror?
                     * @param ele
                     * @return {boolean}
                     */

                    /**
                     * An object containing the random id of elements that we know can receive this element
                     * Later, we can add functionality to vary the droppability, but not right now.
                     */
                    known_droppables: {},
                    /**
                     * The information that will get dropped
                     */
                    data            : {},

                    mirror_contains   : function (ele) {
                        if (!ele) return false;
                        if (!!this.elements.mirror) {
                            if (ele == this.elements.mirror) return true;
                            if (ele.dataset && (ele.dataset.sm_drag_is_in_mirror == true)) {
                                return true;
                            }
                            var test = true, p_node;
                            while (test) {
                                p_node = ele.parentNode;
                                if (p_node == this.elements.mirror) {
                                    ele.dataset && (ele.dataset.sm_drag_is_in_mirror = true);
                                    return true;
                                }
                                if ((!!p_node) && ((p_node !== el_body) && (p_node !== document))) {
                                    ( ele = p_node)
                                } else {
                                    test = false;
                                }
                            }
                        }
                        ele.dataset && (ele.dataset.sm_drag_is_in_mirror = false);
                        return false
                    },
                    /**
                     * Find the next drop target based on the mouse position
                     * @return {*|boolean}
                     */
                    find_drop_target  : function () {
                        var pos_obj = Draggable.position.mouse;
                        var x       = pos_obj.x;
                        var y       = pos_obj.y;
                        var list    = [];
                        var display = [];
                        var ele     = document.elementFromPoint(x, y);

                        var drop;
                        var potential_drops = [];
                        var rand_id;
                        while (!drop && ele && (ele !== el_body) && (ele !== window) && (ele !== document) && (ele !== document.documentElement)) {
                            list.push(ele);
                            display.push(ele.style.visibility);
                            ele.style.visibility = "hidden";
                            ele                  = document.elementFromPoint(x, y);

                            if (this.mirror_contains(ele)) continue;

                            if (!!ele.dataset.sm_drag_find_drop_rand_id) {
                                rand_id = ele.dataset.sm_drag_find_drop_rand_id;
                                if (this.known_droppables[rand_id]) {
                                    drop = ele;
                                    break;
                                }
                            }

                            if (!!ele.sm_Draggable && (!!can_accept && can_accept.call(ele.sm_Draggable, this, this.data))) {
                                potential_drops.push(ele);
                                rand_id = ele.dataset.sm_drag_find_drop_rand_id = Sm.Core.util.randomString(7);
                                this.known_droppables[rand_id] = ele;
                            }
                        }

                        // restore display property
                        for (var i = 0; i < list.length; i++) {
                            list[i].style.visibility = display[i];
                        }
                        return drop || false;
                    },
                    /**
                     * Get the first element under the cursor that isn't part of the mirror
                     * @return {*|boolean}
                     */
                    find_first_element: function () {
                        var pos_obj      = Draggable.position.mouse;
                        var x            = pos_obj.x;
                        var y            = pos_obj.y;
                        var v;
                        var m;
                        (m = this.elements.mirror ) && (v = m.style.visibility) && (m.style.visibility = 'hidden');
                        var test_element = document.elementFromPoint(x, y);
                        (!!m) && (m.style.visibility = v);

                        var actual;

                        var list         = [];
                        var visibilities = [];
                        while (!actual && !!test_element && (test_element !== el_body) && (test_element !== window) && (test_element !== document) && (test_element !== el_documentElement)) {
                            test_element                  = document.elementFromPoint(x, y);
                            if (!this.mirror_contains(test_element)) {
                                actual = test_element;
                                break;
                            }
                            visibilities.push(test_element.style.visibility);
                            test_element.style.visibility = 'hidden';
                            list.push(test_element);
                        }

                        for (var i = 0; i < list.length; i++) {
                            var ele              = list[i];
                            ele.style.visibility = visibilities[i];
                        }
                        return actual || false;
                    },

                    /**
                     *
                     * @param {SharedKeyboardAndMouseEventInit|Event}   e
                     */
                    grab                : function (e) {
                        if (this.status._grab_has_been_called) {
                            return;
                        }

                        !this.position && Sm.CONFIG.DEBUG && console.log(this);
                        this.position.latest_mouse.x = Draggable.position.mouse.x;
                        this.position.latest_mouse.y = Draggable.position.mouse.y;

                        /**
                         * Only respond to actual left clicks  or touch events
                         * @type {boolean}
                         */
                        var is_false_alarm = (dragUtil.which_mouse_button(e)) !== 1 || !!e.metaKey || !!e.ctrlKey;
                        if (is_false_alarm || !can_start(e)) {
                            return;
                        }
                        e.stopPropagation();

                        if (e.type === "mousedown") {
                            var target = e.target;
                            if (dragUtil.is_input(target)) {
                                return;
                            }
                        }

                        this.manual_grab(e);
                    },
                    /**
                     * When dragging multiple elements, manually "grab" them to initialize the process.
                     * todo at the moment, this clobbers the animate droppability function
                     * @param e
                     * @return {boolean}
                     */
                    manual_grab         : function (e) {
                        document.selection && document.selection.empty && document.selection.empty();
                        window.getSelection && window.getSelection().removeAllRanges();

                        this.status._grab_has_been_called = true;
                        this.status.is_grabbed            = true;

                        var $el     = d_self.$el;
                        var el      = d_self.el;
                        /** @type {HTMLElement|Node} */
                        var _mirror = this.elements.mirror = d_self.renderDragMirror(el);

                        if (!_mirror) {
                            this.release();
                            return false
                        }
                        !!e && e.preventDefault && e.preventDefault();

                        el_documentElement.appendChild(_mirror);
                        $el.addClass('sm-transit');

                        var w = _mirror.offsetWidth;
                        var h = _mirror.offsetHeight;

                        _mirror.style.left = Draggable.position.mouse.x - w / 2 + 'px';
                        _mirror.style.top  = Draggable.position.mouse.y - h / 2 + 'px';

                        //Problem with unbinding this?
                        dragUtil.pn_touch(el_documentElement, 'add', 'mousemove', d_self.add_bound('drag', this.drag, this));
                        dragUtil.pn_touch(el_documentElement, 'add', 'mouseup', d_self.add_bound('release', this.release, this));
                    },
                    drag                : function (e) {
                        var clientX = dragUtil.get_coordinate('clientX', e);
                        var clientY = dragUtil.get_coordinate('clientY', e);
                        this.cache  = this.cache || {};
                        var xx      = this.cache.window_height || $_window.innerHeight();

                        this.status.is_dragging = true;

                        var last_x    = this.position.latest_mouse.x;
                        var last_y    = this.position.latest_mouse.y;
                        var current_x = Draggable.position.mouse.x;
                        var current_y = Draggable.position.mouse.y;

                        var change_x = current_x - last_x;
                        var change_y = current_y - last_y;

                        if (Math.abs(change_x) < 5 && Math.abs(change_y) < 5) return;
                        this.position.latest_mouse.x = current_x;
                        this.position.latest_mouse.y = current_y;

                        if (Math.abs(xx - e.clientY) < 70) {
                            window.scrollBy(e.clientX, 20);
                        } else if (e.clientY < 70) {
                            window.scrollBy(e.clientX, -20);
                        }

                        var _mirror = this.elements.mirror;
                        if (!_mirror) return;
                        var left = _mirror.style.left;
                        var top  = _mirror.style.top;
                        // Strip the px, convert to float
                        top  = parseFloat(top.substring(0, top.length - 2));
                        left = parseFloat(left.substring(0, left.length - 2));

                        //_mirror.style.left = left + change_x + 'px';
                        //_mirror.style.top  = top + change_y + 'px';

                        //var current_element = this.find_first_element();
                        //if (!current_element || (current_element == this.elements.last_hover)) return;
                        //this.elements.last_hover = current_element;

                        var drop_target                = this.find_drop_target();
                        var last_el                    = this.elements.last_drop_target;

                        if (!drop_target) {
                            if (!!last_el) {
                                last_el && $(last_el).removeClass('sm-hover');
                                this.elements.last_drop_target = null;
                                $(_mirror).removeClass('sm-dropping');
                            }
                            return;
                        }
                        if (drop_target == last_el) return;

                        $(_mirror).addClass('sm-dropping');
                        !this.status.is_animated && this.animate_droppability();

                        last_el && $(last_el).removeClass('sm-hover');
                        this.elements.last_drop_target = drop_target;
                        $(drop_target).addClass('sm-hover');
                    },
                    /**
                     * Animate the element's motion as the mouse is dragged
                     * @type {Function}
                     * @return {boolean}
                     */
                    animate_droppability: function () {
                        var _mirror = this.elements.mirror;

                        var left = _mirror.style.left;
                        var top  = _mirror.style.top;
                        // Strip the px, convert to float
                        top  = parseFloat(top.substring(0, top.length - 2));
                        left = parseFloat(left.substring(0, left.length - 2));
                        var mouse_top;
                        var mouse_left;

                        var status = this.status;

                        var rect     = _mirror.getBoundingClientRect();
                        var w        = rect.width;
                        var h        = rect.height;
                        var mid_left = left + (w / 2);
                        var mid_top  = top - (h / 2);
                        var counter  = 0;
                        var work     = function (delta_t, now) {
                            if (!status.is_dragging) return false;

                            mouse_top          = Draggable.position.mouse.y;
                            mouse_left         = Draggable.position.mouse.x;
                            var diff_top       = mouse_top - mid_top;
                            var diff_left      = mouse_left - mid_left;
                            status.is_animated = true;

                            //if (Math.abs(diff_left) < 2 && Math.abs(diff_top) < 5) {
                            //    return false;
                            //}
                            delta_t      = (delta_t || 16) / 2;
                            var left_add = Math.round(diff_left / delta_t);
                            var top_add  = Math.round(diff_top / delta_t);

                            left += left_add;
                            mid_left += left_add;
                            top += top_add;
                            mid_top += top_add;

                            _mirror.style.top  = top + 'px';
                            _mirror.style.left = left + 'px';
                        };
                        Sm.Core.util.create_animation_loop(work);
                        return true;
                    },
                    drop                : function () {
                        var drop_target = this.elements.last_drop_target;
                        if (!drop_target) return false;
                        var otherDraggable = drop_target.sm_Draggable;
                        if (!otherDraggable) return false;
                        d_self.setDraggingStatus(false);
                        typeof otherDraggable.accept_drop === "function" && (otherDraggable.accept_drop(this.data));
                    },
                    release             : function () {
                        el_documentElement.style.pointer = "auto";
                        var last_drop                    = this.elements.last_drop_target;
                        !!last_drop && $(last_drop).removeClass('sm-hover');
                        this.drop();
                        this.elements.mirror && this.elements.mirror.parentNode.removeChild(this.elements.mirror);

                        this.elements.mirror =
                            this.elements.last_hover =
                                this.elements.last_drop_target =
                                    this.status.is_animated =
                                        this.status.is_dragging =
                                            this.status._grab_has_been_called = false;

                        var k_i = this.known_droppables;
                        for (var sm_d_r_id in k_i) {
                            if (!k_i.hasOwnProperty(sm_d_r_id)) continue;
                            var elem = k_i[sm_d_r_id];
                            elem && elem.dataset && (elem.dataset.sm_drag_find_drop_rand_id = false);
                        }

                        var $el = d_self.$el;
                        $el.removeClass('sm-transit');
                        dragUtil.pn_touch(el_documentElement, 'remove', 'mousemove', d_self.add_bound('drag', this.drag, this));
                        dragUtil.pn_touch(el_documentElement, 'remove', 'mouseup', d_self.add_bound('release', this.release, this));
                    }
                };
                this.grabElement      = this._draggable.manual_grab.bind(this._draggable);
            }
        };

        Sm.loaded.add('Extras_Draggable');
        document.addEventListener('mousemove', Draggable.mouse_event_listener.bind(Draggable));
    }, 'Extras_Draggable');
});
define("Sm/Extras/DraggableMixin", function(){});

/**
 * Created by Sam Washington on 6/10/16.
 */
require(['require', 'Emitter', 'Sm'],
        /**
         * @lends Emitter
         * @param require
         * @param Emitter
         */
        function (require, Emitter) {
            require('Sm');
            Sm.loaded.when_loaded('Core', function () {
                "use strict";
                Sm.Extras.ViewAid = Emitter.extend({
                    init:                  function (settings) {
                        settings              = settings || {};
                        this.settings         = this.settings || settings;
                        this.html             = '';
                        this._callbacks       = this._callbacks || {};
                        this.status           = {
                            is_open: false
                        };
                        this.init_emitter_events();
                        this.element          = settings.element;
                        this.action_classname = 'view_aid-button';
                        if (!Array.isArray(this.settings.click_events)) this.settings.click_events = [this.settings.click_events];
                        this.settings.click_events.splice(0, 0, this.default_click_handler.bind(this));

                        this.click_events = this.settings.click_events;
                        var el            = this.element;
                        this.html         = Sm.Core.util.isElement(el) ? el.innerHTML : (typeof el === 'string' ? el : '');
                        if (settings.is_open) {
                            this.status.is_open = true;
                            this.init_events();
                        }
                    },
                    _click_handler:        function (e) {
                        if (this.status.is_open) {
                            var click_events = this.settings.click_events;
                            for (var i = 0; i < click_events.length; i++) {
                                var event_handler = click_events[i];
                                if (!(typeof event_handler === "function")) continue;
                                if (false === event_handler(e)) break;
                            }
                        }
                        return true;
                    },
                    init_events:           function () {
                        if (!this.element) return false;
                        var _outsideClickHandler = this.add_bound('outside_click', this._outsideClickHandler);
                        this.element.addEventListener("click", _outsideClickHandler);
                        var bo                   = this.add_bound('click_handler', this._click_handler);
                        this.element.addEventListener('click', bo, true);
                        return true;
                    },
                    setElement:            function (element) {
                        this.html = Sm.Core.util.isElement(element) ? element.innerHTML : (typeof element === 'string' ? element : '');
                    },
                    _changeElement:        function (element) {
                        this.html           = Sm.Core.util.isElement(element) ? element.innerHTML : (typeof element === 'string' ? element : '');
                        var content_element = this.get_content_element();
                        if (content_element)
                            content_element.innerHTML = this.html;
                        this.init_events();
                        this.emit('open');
                    },
                    open:                  function () {
                        this.emit('before_open', this);
                        this.status.is_open = true;
                        this.init_events();
                        this.emit('open', this, this.content_element);
                    },
                    close:                 function () {
                        this.emit('before_close', this, this.content_element);
                        //this.element = this.content_element = null;
                        this.element && $(this.element).remove();
                        this.status.is_open = false;
                        this.emit('close', this, this.content_element);
                    },
                    _outsideClickHandler:  function (e) {
                        var node = e.target;
                        while (node != document.body && node.parentNode) {
                            if (node === this.get_content_element()) return;
                            node = node.parentNode;
                        }
                        this.close();
                    },
                    default_click_handler: function (e) {
                        var target  = e.target;
                        var $target = $(target);

                        var self       = this;
                        var target_has = false;
                        var parents    = false;
                        var sw         = [
                            {
                                c: $target.hasClass('edit') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('edit', self, self.get_content_element()) }
                            },
                            {
                                c: $target.hasClass('save') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('save', self, self.get_content_element()); }
                            },
                            {
                                c: $target.hasClass('add') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('add', self, self.get_content_element())}
                            },
                            {
                                c: $target.hasClass('close') && $target.hasClass(this.action_classname),
                                f: function () { self.close() }
                            },
                            {
                                c: (target_has = $target.hasClass('action')) || (parents = $target.parents('.action')).length,
                                f: function () {
                                    if (!target_has) {
                                        $target = parents[0];
                                        target  = $target;
                                    }
                                    target.dataset.action && self.emit(target.dataset.action, self, self.get_content_element(), target.dataset.data || '', target.dataset, e);
                                    target.dataset.action && e.stopPropagation();
                                    return true;
                                }
                            }
                        ];
                        return Sm.Core.util.switch_(sw);
                    },
                    /**
                     *
                     * @param and_$
                     * @return {HTMLElement|Node|$}
                     */
                    get_content_element:   function (and_$) {
                        this.$element = this.$element || $(this.element);
                        return !!and_$ ? this.$element : this.element;
                    },
                    init_emitter_events:   function () {
                        var events = this.settings.events;

                        for (var e_name in events) {
                            if (!events.hasOwnProperty(e_name)) continue;
                            var e_callback_fn_or_arr = events[e_name];
                            var fn, fn_;
                            if (e_callback_fn_or_arr.constructor === Array) {
                                for (var j = 0; j < e_callback_fn_or_arr.length; j++) {
                                    fn = e_callback_fn_or_arr[j];
                                    if (!fn || typeof fn.bind !== "function") {
                                        Sm.CONFIG.DEBUG && console.log(fn);
                                        continue;
                                    }
                                    this.on(e_name, fn.bind(this));
                                }
                            } else {
                                fn = e_callback_fn_or_arr;
                                if (!fn || typeof fn.bind !== "function") {
                                    Sm.CONFIG.DEBUG && console.log(fn);
                                    continue;
                                }
                                this.on(e_name, fn.bind(this));
                            }
                        }
                        var self = this;
                        this.on('open', function () {
                            var content_element = self.get_content_element();
                            var selects         = $(content_element).find('select');
                            for (var i = 0; i < selects.length; i++) {
                                var select_element = selects[i];
                                select_element.addEventListener('change', function (e) {
                                    self.emit('select', e);
                                })
                            }
                        });
                    }
                });
                Sm.loaded.add('Extras_ViewAid');
            }, 'Extras_ViewAid');
        });
define("Sm/Extras/ViewAid", function(){});

/**
 * Created by Sam Washington on 11/12/15.
 */


require(['jquery'], function ($) {
    Sm.Extras.Highlight = {
        highlight:    function (settings, event_settings) {
            settings              = !!settings && typeof  settings === 'object' ? settings : {};
            event_settings        = (!!event_settings && typeof event_settings === 'object') ? event_settings : {};
            var element_to_search = settings.element || document.body;

            //
            if (!Sm.Core.util.isElement(element_to_search)) return;

            var target          = settings.target || false;
            var word            = settings.word;
            var classname       = settings.className || '';
            classname += ' sm-highlight';
            var dataset         = settings.dataset || {};
            dataset.word        = dataset.word || word;
            word                = word.trim();
            var word_len        = word.length;
            var number_of_nodes = 0;

            var on_init = !!event_settings.on_init && typeof  event_settings.on_init === "function" ? event_settings.on_init : false;

            function flattenChildren(element, array, plain_array, len_array, obj) {
                var c_n = element.childNodes;
                if (!!c_n && c_n.length) {
                    for (var i = 0; i < c_n.length; i++) {
                        var node = c_n[i];
                        //console.log(node);
                        if ($(node).hasClass('sm-highlight')) {
                            if (node.childNodes.length === 1 && !!node.childNodes[0].textContent) {
                                if (node.childNodes[0].textContent.toLowerCase() == word.toLowerCase()) {
                                    continue;
                                }
                            }
                        }
                        flattenChildren(node, array, plain_array, len_array, obj)
                    }
                } else {
                    var text               = element.textContent || element.innerHTML;
                    if (!element.splitText || !text || !text.length) return array;
                    array.push(element);
                    plain_array.push(text);
                    len_array.push(text.length);
                    obj[number_of_nodes++] = {start: [], end: [], node: text};
                }
                return array;
            }

            var node_arr = [], plain_arr = [], length_arr = [], index_object = {};
            flattenChildren(element_to_search, node_arr, plain_arr, length_arr, index_object);


            function getIndicesOf(searchStr, str) {
                var match;
                var searchStrLen = searchStr.length;
                var re           = new RegExp(searchStr + '\\b', 'gi');
                var s_index, e_index;

                var indixes = [], end_indices = [];
                while ((match = re.exec(str)) != null) {
                    s_index = match.index;
                    e_index = s_index + searchStrLen - 1;
                    indixes.push(s_index);
                    end_indices.push(e_index);
                }
                return [indixes, end_indices];
            }

            //function getIndicesOf(searchStr, str, caseSensitive) {
            //    var startIndex     = 0, searchStrLen = searchStr.length;
            //    var index, indices = [], end_indices = [];
            //    if (!caseSensitive) {
            //        str       = str.toLowerCase();
            //        searchStr = searchStr.toLowerCase();
            //    }
            //    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            //        indices.push(index);
            //        startIndex = index + searchStrLen;
            //        end_indices.push(startIndex - 1);
            //    }
            //    return [indices, end_indices];
            //}

            var join          = plain_arr.join('');
            var g_i           = getIndicesOf(word, join);
            var start_indices = g_i[0], end_indices = g_i[1];
            if (!start_indices && !end_indices) {
                return;
            }
            var find_index_and_node = function (char_array, plaintext_array, return_object, type) {
                var _node_iterator = 0, index_in_node = 0;
                var plain_string   = plaintext_array[0];
                if (!plain_string) {
                    return;
                }
                var plain_string_len = plain_string.length, _absolute_char_position;
                var total_string_len = plain_string_len;
                var reverse_offset_in_node;


                for (var j = 0; j < char_array.length; j++) {
                    _absolute_char_position = char_array[j];
                    reverse_offset_in_node  = total_string_len - _absolute_char_position;
                    while ((_absolute_char_position >= total_string_len) && (plaintext_array[_node_iterator])) {
                        _node_iterator++;
                        plain_string           = plaintext_array[_node_iterator];
                        plain_string_len       = plain_string.length;
                        total_string_len += plain_string_len;
                        reverse_offset_in_node = total_string_len - _absolute_char_position;
                    }
                    index_in_node = plain_string_len - (reverse_offset_in_node);
                    if (index_in_node < 0) {
                        continue;
                    }
                    if (type) {
                        if (index_in_node - word_len < 0)
                            return_object[_node_iterator].end.push(index_in_node);
                    } else {
                        return_object[_node_iterator].start.push(index_in_node);
                    }
                }
            };
            find_index_and_node(start_indices, plain_arr, index_object, 0);
            find_index_and_node(end_indices, plain_arr, index_object, 1);

            for (var iterator = number_of_nodes - 1; !!(iterator + 1); iterator--) {
                var actual_node                 = node_arr[iterator];
                var node_length                 = length_arr[iterator];
                var word_start_character_offset = index_object[iterator].start;
                var word_end_character_offset   = index_object[iterator].end;
                var pos                         = 0;

                var span_node, word_text_node;


                if (!!word_start_character_offset.length) {
                    for (var i = word_start_character_offset.length - 1; !!(i + 1); i--) {
                        pos            = word_start_character_offset[i];
                        var assumed_end;
                        if (pos + word_len > node_length) {
                            assumed_end = node_length;
                        } else {
                            assumed_end = pos + word_len;
                        }
                        actual_node.splitText(assumed_end);
                        word_text_node = actual_node.splitText(pos);
                        actual_node.normalize();
                        if (!target) {
                            span_node = document.createElement('span');
                        } else {
                            span_node = document.createElement('a');
                            span_node.setAttribute('href', target);
                        }
                        span_node.className = classname;
                        var m_o_clone       = word_text_node.cloneNode(true);
                        span_node.appendChild(m_o_clone);
                        dataset.word && (span_node.dataset.word = dataset.word);
                        Sm.CONFIG.DEBUG && console.log(dataset.word);
                        word_text_node.parentNode.replaceChild(span_node, word_text_node);

                        if (on_init)
                            on_init(span_node)
                    }
                }
                //THIS WAS MEANT TO BE A WAY TO OVERLAP TAGS
                /* //THIS PART HAS BEEN REMOVED BECAUSE OF AN ERROR WITH node.normalize(); THAT WAS NOT CONJOINING THE TEXT NODES ... PROBABLY OKAY
                 if (!!word_end_character_offset.length) {
                 for (var j = word_end_character_offset.length - 1; !!(j + 1); j--) {
                 pos                    = word_end_character_offset[j];
                 pos                    = pos > node_length ? node_length - 1 : pos;
                 actual_node.splitText(pos + 1);
                 var word_end_text_node = actual_node.splitText(0);
                 span_node              = document.createElement('span');
                 span_node.className    = classname;
                 var word_end_clone     = word_end_text_node.cloneNode(true);
                 span_node.appendChild(word_end_clone);
                 word_end_text_node.parentNode.replaceChild(span_node, word_end_text_node);
                 }
                 }*/
            }

        },
        un_highlight: function (settings, event_settings) {
            settings              = !!settings && typeof  settings === 'object' ? settings : {};
            event_settings        = (!!event_settings && typeof event_settings === 'object') ? event_settings : {};
            var element_to_remove = settings.element || document.body;

            //
            if (!Sm.Core.util.isElement(element_to_remove)) return;
            var word               = settings.word;
            var dataset            = settings.dataset || {word: [], dictionary_ids: []};
            dataset.word           = dataset.word || [word];
            dataset.dictionary_ids = dataset.dictionary_ids || [];
            word                   = word.trim();

            var $element_to_remove = $(element_to_remove);
            var find               = $element_to_remove.find('.sm-highlight[data-word=' + word + ']');
            for (var i = 0; i < find.length; i++) {
                var instance = find[i];
                $(instance).replaceWith(instance.childNodes);
            }
            return true;
        }
    };
    Sm.loaded.add('Extras_SmHighlight');
});
define("SmHighlight", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Page on the server
     * @alias   Sm.Entities.Page.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Page.Model
     */
    Sm.Entities.Page.Model                = Sm.Core.SmModel.extend({});
    Sm.Entities.Page.Model.prototype.type = 'Page';
    Sm.loaded.add('Entities_Page_Model');
});
define("Sm-Entities-Page-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Page/MvCombo
 * @exports PageMvCombo
 * @class PageMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Page-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Page on the server
         * @alias   Sm.Entities.Page.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Page.MvCombo
         */
        Sm.Entities.Page.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Page_MvCombo');
    }, 'Entities_Page_MvCombo');
});
define("Sm-Entities-Page-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Page-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var PageWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Page',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Page.Wrapper = new PageWrapper;
        Sm.loaded.add('Entities_Page_Wrapper');
    }, 'Entities_Page_Wrapper');
});
define("Sm-Entities-Page-Wrapper", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        Sm.Entities.Page.View = Sm.Core.SmView.extend({
            type:                 'Page',
            identifier:           '.spwashi-page',
            _rendering_callbacks: {
                button_control_element: function () {
                    if (!!this.elements.button_control) return this.elements.button_control;
                    var matching = this.get_rendered('$Element').children('.button-control');
                    return this.elements.button_control = (matching[0] ? matching[0] : false);
                },
            },
            additional_events:    {
                click: function (e) {
                    if (this.MvCombo) {
                        this.handle_click(e.target);
                        e.stopPropagation();
                    }
                }
            },
            /**
             * This is a basic click handler that operates based only on the target of the click.
             * This one in particular handles
             *  * scaling
             *  * prompting edits
             *  * debugging
             *  * deleting
             *  * adding relationships
             * @param target The target of the click
             * @return {boolean}
             */
            handle_click:         function (target) {
                var $target = $(target);
                if (!this.MvCombo) return false;
                var Relationship_Obj = this.find_closest_relationship();
                var Relationship_    = Relationship_Obj.Relationship;

                if (this.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                    this.prompt_edit({display_type: 'inline'});
                } else if (this.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
                    this.begin_add_relationship({
                        type: 'Dictionary'
                    });
                } else if ($target.hasClass('add-section-button')) {
                    var Dimension = Sm.Entities.Dimension.Wrapper.get_active();
                    if (Dimension) {
                        var dView = Dimension.getView();
                        dView.begin_add_relationship({type: 'Section'});
                    }
                }

                // DEBUG    */
                else if ($target.hasClass('debug') && $target.hasClass('button') && Sm.CONFIG.DEBUG) {
                    console.log(this.cid, ' -- ', this.MvCombo, this.MvCombo.Model.attributes);
                }
                // DELETE   */
                else if (this.queryPermission('destroy') && $target.hasClass('delete') && $target.hasClass('button')) {
                    /** If this is in a relationship container ... */
                    if (Relationship_) {
                        Relationship_.destroy({silent: false});
                    } else {
                        this.MvCombo.destroy({prompt: true}, this);
                    }
                }
            }
        });
        Sm.loaded.add('Entities_Page_View');
    }, 'Entities_Page_View');
});
define("Sm-Entities-Page-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var PageMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {
            concepts  : {
                MvType         : 'Concept',
                index          : 'concept',
                id             : null,
                primary_key    : 'page_id',
                secondary_key  : 'concept_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Concept']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dimensions: {
                MvType         : 'Dimension',
                index          : 'dimension',
                id             : null,
                primary_key    : 'page_id',
                secondary_key  : 'dimension_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Dimension']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pages: {
                MvType         : 'Section|Concept',
                index          : 'section|concept',
                id             : null,
                primary_key    : 'section_id|concept_id',
                secondary_key  : 'page_id',
                is_reciprocal  : true,
                linked_entities: ['Page', 'Section|Concept']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'pages']}
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Section") return ['sections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];

            return [];
        }

    });
    Sm.Entities.Page.Meta                  = new PageMeta({type: 'Page'});
    Sm.Entities.Page.Meta.base_constructor = PageMeta;
    var self_type                          = 'Page';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});
define("Sm-Entities-Page-Meta", function(){});

/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Page-main'], function (require) {
    Sm.Entities.Page.templates._template = {
        outer: {full: ''},

        relationship_index_container: '<section class="relationship-index-container">\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        concept_relationship_outer: '<div class="relationship concept-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        relationship_outer        : '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        modal_outer               : {
            full: '<header>\n    <h3>Edit Page </h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        button_control            : {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Page_templates__template');
});
define("Sm-Entities-Page-templates-_template", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Page-main'], function (require) {
    Sm.Entities.Page.templates.standard = {
        modal: {
            full: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>'
        },
        body : {
            full: '<div class="page description" ><%- description %></div>',
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Page_templates_standard');
});
define("Sm-Entities-Page-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
    'Sm-Entities-Page-templates-_template',
    'Sm-Entities-Page-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Page-templates-_template');
    require('Sm-Entities-Page-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Page_Meta',
        'Entities_Page_templates__template'
    ], function () {
        /**
         * @alias Sm.Entities.Page.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass         = Sm.Entities.Abstraction.Garage.extend({
            relationships:                 function (Mv_, synchronous, settings) {
                settings              = settings || {};
                settings.display_type = 'inline';
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    synchronous,
                    settings
                ]);
            },
            _continue_relationship_render: function (relevant_relationships, inner_string, is_synchronous, settings) {
                settings                        = settings || {};
                /**
                 * The Element that we are going to be returning in the end - relationship index container
                 * @type {*|jQuery|HTMLElement}
                 */
                var $complete_relationship_elem = $(inner_string);
                var _template                   = Sm.Entities[this.type].templates._template;
                /**
                 * An array of Views that have already been appended to the Element (shouldn't happen).
                 * This is meant to let us know which views need to be cloned
                 * @type {Array}
                 */
                var appendedViews               = [];
                /**
                 * Iterate through the relevant relationships (relationship indices that were not empty) and append the Views
                 */
                for (var loop_rel_index in relevant_relationships) {
                    if (!relevant_relationships.hasOwnProperty(loop_rel_index)) continue;
                    /**
                     * Look in .{index}-container for the place to put the relationship. e.g. children-container or definition-container
                     */
                    var holder = $complete_relationship_elem.find('.' + loop_rel_index + '-container');

                    /**
                     * If we found the element
                     */
                    if (holder[0] && loop_rel_index === 'concepts') {
                        var related_views = relevant_relationships[loop_rel_index];
                        /**
                         * Loop through each of the related Views, render them,  and append them to the element properly
                         */
                        for (var k = 0; k < related_views.length; k++) {
                            var DefinitionView    = related_views[k].View;
                            var DefinitionMvCombo = DefinitionView.MvCombo;
                            if (!DefinitionMvCombo) continue;

                            /**
                             * The element of the View that we are adding
                             * @type {Element|HTMLElement|*}
                             * @private
                             */
                            /** @type {Sm.Core.Relationship} */
                            var Relationship_ = related_views[k].Relationship;
                            /**
                             * If the View has already been added used (this is related in more than one way to an entity - bad- ), clone it and move on.
                             */
                            if (appendedViews.indexOf(DefinitionMvCombo.Identity.r_id) > -1) DefinitionView = DefinitionView.clone();

                            /**
                             * If the MvCombo is a section, use our special outside for it.
                             * @type {*|string}
                             */
                            var rel_outer = (settings.relationship_outer
                                    ? _template[settings.relationship_outer]
                                    : (DefinitionMvCombo.type == "Section"
                                    ? _template.definition_relationship_outer
                                    : _template.relationship_outer)) || '';

                            /**
                             * The Outer String wil get its content emptied (that's where we append the relationships)
                             * THe Title is the optional location where the word being defined will be held.
                             * Each relationship has an R_ID which is the R_ID of the Relationship being referenced
                             * @type {string}
                             */
                            var outer_string = rel_outer
                                .replace('__CONTENT__', '')
                                .replace('__TITLE__', '<%- title && title.trim().length ? title : "-" %>')
                                .replace('__R_ID__', Relationship_.Identity.r_id)
                                .replace('__MV_R_ID__', DefinitionMvCombo.Identity.r_id);
                            outer_string     = _.template(outer_string)(DefinitionMvCombo.Model.attributes);
                            /**
                             * The definition element
                             * @type {*|jQuery|HTMLElement}
                             */
                            Sm.CONFIG.DEBUG && console.log(outer_string);
                            var $outer       = $(outer_string);
                            /**
                             * The total content of the definition
                             */
                            var $content     = $outer.find('.content');

                            /**
                             * We must append the children to the "content" element in order to get their events initialized.
                             * I suppose we could initialize them after, but it honestly isn't worth it
                             */
                            var child = false;
                            try {
                                if ($content[0] && child) {
                                    $content[0].appendChild(child);
                                    $outer[0].addEventListener('click', (function (View_) {
                                        return function (e) {View_.MvCombo.focus(View_);};
                                    })(DefinitionView));
                                    holder[0].appendChild($outer[0]);
                                    appendedViews.push(DefinitionMvCombo.Identity.r_id);
                                } else {
                                    Sm.CONFIG.DEBUG && console.log($outer, $content, DefinitionView.cid);
                                }
                            } catch (e) {
                                Sm.CONFIG.DEBUG && console.log(e);
                            }
                        }
                    } else {
                        //If there was a error, log it
                    }
                }
                var url = Sm.urls.api.generate({
                    type:    'Concept',
                    context: {
                        //todo todo todo
                        user_id: 11
                    }
                });

                /**
                 * todo move this somewhere where it makes sense
                 */
                $($complete_relationship_elem.find('#add-concept')).select2({
                    tags:       true,
                    multiple:   true,
                    allowClear: true,
                    ajax:       {
                        url:            url,
                        dataType:       'json',
                        delay:          250,
                        data:           function (params) {
                            return {q: params.term};
                        },
                        processResults: function (data, params) {
                            var result = [];
                            for (var i = 0; i < data.length; i++) {
                                var dp = data[i];
                                if (dp && !!dp.title) {
                                    result.push({
                                        id:   dp.ent_id,
                                        text: dp.title
                                    })
                                }
                            }
                            Sm.CONFIG.DEBUG && console.log(result);
                            return {results: result};
                        }
                    }
                });

                /**
                 * If we are running this function (semi) synchronously, return the element. Otherwise, return a promise
                 */
                var result = $complete_relationship_elem[0];
                return is_synchronous ? result : Promise.resolve(result);
            }
        });
        Sm.Entities.Page.Garage = new GarageClass('Page', 'page_type');
        Sm.loaded.add('Entities_Page_Garage');
    }, 'Entities_Page_Garage');
});
define("Sm-Entities-Page-Garage", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Concept on the server
     * @alias   Sm.Entities.Concept.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Concept.Model
     */
    Sm.Entities.Concept.Model                = Sm.Core.SmModel.extend({});
    Sm.Entities.Concept.Model.prototype.type = 'Concept';
    Sm.loaded.add('Entities_Concept_Model');
});
define("Sm-Entities-Concept-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Concept/MvCombo
 * @exports ConceptMvCombo
 * @class ConceptMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Concept-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Concept on the server
         * @alias   Sm.Entities.Concept.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Concept.MvCombo
         */
        Sm.Entities.Concept.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Concept_MvCombo');
    }, 'Entities_Concept_MvCombo');
});
define("Sm-Entities-Concept-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Concept-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var ConceptWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Concept',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Concept.Wrapper = new ConceptWrapper;
        Sm.loaded.add('Entities_Concept_Wrapper');
    }, 'Entities_Concept_Wrapper');
});
define("Sm-Entities-Concept-Wrapper", function(){});

/**
 * Created by Sam Washington on 7/9/16.
 */
require(['require', 'backbone', 'jquery', 'underscore', 'Cocktail', 'Sm-Entities-Abstraction-ModalEdit'], function (require, Backbone, $, _, Cocktail) {
    Sm.Entities.Abstraction.mixins.SidebarModule = {
        focus:                function () {
            if (this.status.is_focused) return this;
            var MvCombo_    = this.MvCombo;
            var Model_      = MvCombo_.Model;
            var description = Model_.get('description') || '';
            var self        = this;
            var desc        = self.elements.description_container || this.get_rendered('description_container');
            if (desc) {
                Sm.Entities[this.type].Garage.generate('preview', MvCombo_, false).then(function (result) {
                    self.elements.description_container.innerHTML = result;
                    self.init_button_control_events();
                });
            } else {
                Sm.CONFIG.DEBUG && console.log(this.type, this.elements.description_container, desc);
            }
            return Sm.Core.SmView.prototype.focus.apply(this, arguments);
        },
        blur:                 function () {
            if (!this.MvCombo.queryStatus('focused')) return this;
            this.elements.description_container && (this.elements.description_container.innerHTML = '');
            return Sm.Core.SmView.prototype.blur.apply(this, arguments);
        },
        _rendering_callbacks: {
            button_control:        function () {
                return (this.elements.button_control = this.elements.button_control || $(this.get_rendered('description_container')).find('.button-control')[0]);
            },
            container:             function () {
                if (!!this.elements.container) return this.elements.container;
                var type = this.type.toLowerCase();
                return (this.elements.container = this.elements.container || $('.' + type + '-container')[0] || false);
            },
            description_container: function () {
                return (this.elements.description_container = this.elements.description_container || $(this.get_rendered('container')).parent().find('.description-container')[0]);
            },
            title_element:         function () {
                if (!!this.elements.title) return this.elements.title;
                var matching = this.get_rendered('$Element').find('.title');
                return this.elements.title = (matching[0] ? matching[0] : false);
            },
            description_element:   function () {
                if (!!this.elements.description) return this.elements.description;
                var matching = this.get_rendered('$Element').find('.description');
                return this.elements.description = (matching[0] ? matching[0] : false);
            }
        }
    };
    Sm.loaded.add('Sm_Entities_Abstraction_mixins_SidebarModule');
});
define("Sm-Entities-Abstraction-mixins-SidebarModule", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    Sm.loaded.when_loaded(['Core_SmView', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Concept.View = Sm.Core.SmView.extend({
            type:              'Concept',
            mixins:            [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:        '.spwashi-concept',
            additional_events: {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;
                    if ($target.hasClass('spwashi-concept')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }
                }
            },
        });
        Sm.loaded.add('Entities_Concept_View');
    }, 'Entities_Concept_View');
});
define("Sm-Entities-Concept-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var ConceptMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {

            /**
             * @type {relationship_type_info_obj}
             */
            sections: {
                MvType         : 'Section',
                index          : 'section',
                id             : null,
                primary_key    : 'concept_id',
                secondary_key  : 'section_id',
                is_reciprocal  : false,
                linked_entities: ['Concept', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            concepts: {
                MvType         : 'Section|Page|Concept',
                index          : 'section|page|concept',
                id             : null,
                primary_key    : 'section_id|page_id|primary_concept_id',
                secondary_key  : 'concept_id|concept_id|primary_concept_id',
                is_reciprocal  : true,
                linked_entities: ['Concept', 'Section|Page|Concept']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pages: {
                MvType         : 'Page',
                index          : 'page',
                id             : null,
                primary_key    : 'concept_id',
                secondary_key  : 'page_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Concept']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'concepts']}
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Section") return ['sections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];

            return [];
        }
    });
    Sm.Entities.Concept.Meta                  = new ConceptMeta({type: 'Concept'});
    Sm.Entities.Concept.Meta.base_constructor = ConceptMeta;
    var self_type                             = 'Concept';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});
define("Sm-Entities-Concept-Meta", function(){});

/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Concept-main'], function (require) {
    Sm.Entities.Concept.templates._template = {
        outer: {
            full   : '',
            preview: '<div class="spwashi-concept preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            inline : '',
            tab    : '',
            tag    : ''
        },

        relationship_index_container: '<section class="relationship-index-container">\n    <select multiple name="relationships-concepts" id="add-concept" data-attribute="relationships-concepts" class="model edit"></select>\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        relationship_outer  : '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        modal_outer         : {
            full: '<header>\n    <h3>Edit Concept </h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        button_control      : {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        },
        modal_button_control: {
            full: '<div class="icons button-control">\n    <i class="modal-button button edit fa fa-pencil"></i>\n    <i class="modal-button delete button close fa fa-remove"></i>\n    <i class="modal-button button save fa fa-save icon-save"></i>\n    <i class="modal-button button add fa fa-plus"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Concept_templates__template');
});
define("Sm-Entities-Concept-templates-_template", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Concept-main'], function (require) {
    Sm.Entities.Concept.templates.standard = {
        modal: {
            full: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>'
        },
        body : {
            full: '<div class="description" ><%- description %></div>'
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Concept_templates_standard');
});
define("Sm-Entities-Concept-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Concept-templates-_template',
         'Sm-Entities-Concept-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Concept-templates-_template');
    require('Sm-Entities-Concept-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Concept_Meta',
        'Entities_Concept_templates__template',
    ], function () {
        /**
         * @alias Sm.Entities.Concept.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({
            relationships: function (Mv_, is_synchronous, settings) {
                settings                         = settings || {};
                settings.display_type            = 'preview';
                settings.relationship_index_list = settings.relationship_index_list || ['sections', 'concepts'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    is_synchronous,
                    settings
                ]);
            }
        });
        Sm.Entities.Concept.Garage = new GarageClass('Concept', 'concept_type');
        Sm.loaded.add('Entities_Concept_Garage');
    });
});
define("Sm-Entities-Concept-Garage", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Section-main'], function (require) {
    Sm.Entities.Section.templates._template = {
        outer      : {
            full   : '<section title="<%- subtitle %>" class="spwashi-section spwashi-entity  <% if( ! has_title) {%>no-title<% } %> <% if(_type){ %>type-<%- _type %><% } %> " data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    <div class="focus upper">\n        <div class="pan left ">\n            <i class="fa left fa-caret-left"></i>\n        </div>\n        <div class="pan right">\n            <i class="fa right fa-caret-right"></i>\n        </div>\n    </div>\n    <header>\n        <div class="dev id"><%- id %></div>\n        <% if(has_title != 0) { %><h3 class="title"><%- title %></h3> <% } %>\n    </header>\n    __CONTENT__\n    <div data-relationship_index="composition" data-ent_id="<%- ent_id %>" class="relationship-container composition-container"></div>\n    <div data-relationship_index="children" data-ent_id="<%- ent_id %>" class="relationship-container children-container"></div>\n</section>',
            preview: '<section title="<%- subtitle %>" class="spwashi-section preview spwashi-entity  <% if( ! has_title) {%>no-title<% } %> <% if(_type){ %>type-<%- _type %><% } %> " data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    <header>\n        <div class="dev id"><%- id %></div>\n        <% if(has_title != 0) { %><h3 class="title"><%- title %></h3> <% } %>\n    </header>\n    __CONTENT__\n</section>',
            inline : '<span title="<%- subtitle %>" class="spwashi-section inline spwashi-entity <% if(_type){ %>type-<%- _type %><% } %>">\n    __BUTTON_CONTROL__\n    __CONTENT__\n</span>',
            tab    : '',
            tag    : ''
        },
        modal_outer: {
            full: '<header>\n    <h3>Edit <%- _type ? _type : \'Section\' %></h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        /**
         * Just a container for a bunch of MvCombos
         */
        relationship_index_container: '<section class="relationship-index-container">__CONTENT__</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</div>',
        relationship_outer      : '<div class="relationship" data-Relationship-r_id="__R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity">\n    </div>\n    <div class="content">__CONTENT__</div>\n</div>',

        button_control      : {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        },
        modal_button_control: {
            full: '<div class="icons button-control">\n    <i class="modal-button button edit fa fa-pencil"></i>\n    <i class="modal-button delete button close fa fa-remove"></i>\n    <i class="modal-button button save fa fa-save icon-save"></i>\n    <i class="modal-button button add fa fa-plus"></i>\n</div>',
        },

        pivot_display: '<div class="button-dialog relationship-type section-pivot">\n    \n    <% if(typeof(home) !== "undefined") {%>\n    <div class="relationship-subtype-category home clearfix">\n        <div data-action="pivot" data-data="home" class="relationship-subtype action home active" data-relationship_subtype="home"><span>Home</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(text) !== "undefined") {%>\n    <div class="relationship-subtype-category text clearfix">\n        <div data-action="pivot" data-data="text" class="relationship-subtype action text <%= text.indexOf(\'text\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="text"><span>Text</span></div>\n        <div data-action="pivot" data-data="eli5" class="relationship-subtype action eli5 <%= text.indexOf(\'eli5\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="eli5"><span>ELI5</span></div>\n        <div data-action="pivot" data-data="thing_explainer" class="relationship-subtype action thing_explainer <%= text.indexOf(\'thing_explainer\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="thing_explainer">\n            <span>Thing Explainer</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(image) !== "undefined") {%>\n    <div class="relationship-subtype-category image">\n        <div data-action="pivot" data-data="image" class="relationship-subtype action image <%= image.indexOf(\'image\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="image"><span>Image</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(video) !== "undefined") {%>\n    <div class="relationship-subtype-category video">\n        <div data-action="pivot" data-data="video" class="relationship-subtype action video <%= video.indexOf(\'video\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="video"><span>Video</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(audio) !== "undefined") {%>\n    <div class="relationship-subtype-category audio">\n        <div data-action="pivot" data-data="audio" class="relationship-subtype action audio <%= audio.indexOf(\'audio\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="audio"><span>Audio</span></div>\n    </div>\n    <% } %>\n</div>'
    };

    Sm.loaded.add('Entities_Section_templates__template');
});
define("Sm-Entities-Section-templates-_template", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Section-main'], function (require) {
    Sm.Entities.Section.templates.standard = {
        body:  {
            full:    '<div class="content" ><%- content %></div>',
            preview: '<div class="content" ><% if(content.length > 50 ){ %><%- content.substr(0, 50) %> <% } else {%> <%- content %> <% }%></div>',
            inline:  '<div class="content" ><%- content && content.trim().length ? content :  "-" %></div>',
            tab:     false,
            tag:     false
        },
        modal: {
            full:    '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="content_location">Content Location:</label>\n    <input data-attribute="content_location" class="model edit content_location" type="text" name="content_location"\n           placeholder="Content Location" title="content_location" value="<%- content_location %>">\n    <span class="error" id="content_location-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>',
            inline:  '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>',
            preview: false,
            tab:     false,
            tag:     false
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Section_templates_standard');
});
define("Sm-Entities-Section-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Section.templates.definition = {
        modal_outer: {
            full:    '<header>\n    <h3>Edit Definition!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
            inline:  '<header>\n    <h3>Edit Definition!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n</div>',
            preview: false,
            tab:     false,
            tag:     false
        },
        modal:       {
            full:   '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="content_location">Content Location:</label>\n    <input data-attribute="content_location" class="model edit content_location" type="text" name="content_location"\n           placeholder="Content Location" title="content_location" value="<%- content_location %>">\n    <span class="error" id="content_location-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Content: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>',
            inline: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Words: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>'
        },
        body:        {
            full:    '<div class="content boon <% if(content_location !== undefined && !!content_location && content_location.length) {%>clickable <%}%>" ><%- content %></div>',
        },
        cache:       {}
    };
    Sm.loaded.add('Entities_Section_templates_definition');
});
define("Sm-Entities-Section-templates-definition", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Section.templates.image = {
        modal_outer: {
            full:    '<header>\n    <h3>Edit Image!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Image</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
            inline:  '<header>\n    <h3>Edit Image!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n</div>',
        },
        modal:       {
            full:   '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="content_location">Content Location:</label>\n    <input data-attribute="content_location" class="model edit content_location" type="text" name="content_location"\n           placeholder="Content Location" title="content_location" value="<%- content_location %>">\n    <span class="error" id="content_location-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Content: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>',
            inline: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Content: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>'
        },
        body:        {
            full:    '<div class="content-container entity-container">\n    <img class="content-location" src="<%- content_location %>" alt="<%- subtitle %>" title="">\n    <div class="content" ><%- content %></div>\n</div>',
        },
        cache:       {}
    };
    Sm.loaded.add('Entities_Section_templates_image');
});
define("Sm-Entities-Section-templates-image", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'underscore', 'Sm',
    'Sm-Entities-Section-templates-_template',
    'Sm-Entities-Section-templates-standard',
    'Sm-Entities-Section-templates-definition',
    'Sm-Entities-Section-templates-image'
], function (require) {
    require('Sm');
    require('Sm-Entities-Section-templates-_template');
    require('Sm-Entities-Section-templates-standard');
    require('Sm-Entities-Section-templates-definition');
    require('Sm-Entities-Section-templates-image');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Section_Meta',
        'Entities_Section_templates__template'
    ], function () {
        /**
         * @alias Sm.Entities.Section.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({
            relationships: function (Mv_, is_synchronous, settings) {
                settings                         = settings || {};
                settings.display_type            = 'preview';
                settings.relationship_index_list = settings.relationship_index_list || ['children', 'micros', 'pivots', 'composition', 'concepts'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    is_synchronous,
                    settings
                ]);
            }
        });
        Sm.Entities.Section.Garage = new GarageClass('Section', 'section_type');
        Sm.loaded.add('Entities_Section_Garage');
    }, 'Entities_Section_Garage');
});
define("Sm-Entities-Section-Garage", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Section on the server
     * @alias   Sm.Entities.Section.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Section.Model
     */
    Sm.Entities.Section.Model                = Sm.Core.SmModel.extend({
        defaults:   {
            id:               null,
            content_location: null,
            user_id:          null,
            has_title:        0,
            section_type:     1,
            title:            '-',
            subtitle:         null,
            content:          '-',
            description:      '-',
            ent_id:           null,
            words:            ''
        },
        set:        function (attributes, options) {
            Sm.Core.SmModel.prototype.set.call(this, attributes, options);
            this.init_words();

            if (!(typeof attributes === "string" && attributes == 'words') && !( typeof attributes === "object" && attributes.words)) return;
            if (this.get('section_type') == Sm.Entities.Section.Meta.types.definition && this.MvCombo) {
                /** @type {Sm.Core.RelationshipIndex} The relationshipIndex that we are going to be dealing with */
                var dictionary_relationship_index = this.MvCombo.getRelationshipIndex('dictionaries');
                if (!dictionary_relationship_index) return;
                var relationships    = dictionary_relationship_index.get_listed_items();
                var dictionary_array = relationships.items;
                if (relationships.count) {
                    for (var i = 0; i < dictionary_array.length; i++) {
                        /** @type {Sm.Entities.Dictionary.MvCombo} The Dictionary we are going to try to add words to */
                        var DictionaryMvCombo = dictionary_array[i];
                        if (!DictionaryMvCombo || !DictionaryMvCombo.add_definition) continue;
                        DictionaryMvCombo.add_definition(this.MvCombo);
                    }
                }
            }

        },
        init_words: function () {
            var words        = [];
            var section_type = this.get('section_type');
            if (section_type == Sm.Entities.Section.Meta.types.definition) {
                words = this.get('words') || '';
                if (typeof  words === "string" && words.trim().length) {
                    words = words.split(',');
                } else if (words.constructor !== Array) {
                    words = [];
                }
                for (var i = 0; i < words.length; i++) {
                    var w    = words[i];
                    words[i] = w.trim();
                }
                this._words = words;
            }
            return words;
        },
        get_words:  function () {
            this.init_words();
            return this._words || [];
        },
        initialize: function () {
            this._words = [];
            Sm.Core.SmModel.prototype.initialize.apply(this, arguments);
        }
    });
    Sm.Entities.Section.Model.prototype.type = 'Section';
    Sm.loaded.add('Entities_Section_Model');
});
define("Sm-Entities-Section-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Section/MvCombo
 * @exports SectionMvCombo
 * @class SectionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Section-Model', 'Sm-Core-MvCombo'], function (require) {
    /** NOTE: handles prompting for section-creation and childing and such**/
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Section on the server
         * @alias   Sm.Entities.Section.MvCombo
         * @augments Sm.Core.MvCombo
         * @extends Sm.Core.MvCombo
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Section.MvCombo
         */
        Sm.Entities.Section.MvCombo                                       = Sm.Core.MvCombo.extend({
            scale:                             function (scale_towards_micros, context_id) {
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('micros', context_id);
                var result           = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    is_reciprocal:       !scale_towards_micros,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'micros'
                });
                return Promise.resolve(result);
            },
            pivot:                             function (where, context_id) {
                //Sm.CONFIG.DEBUG && console.log('ORIGINAL_WHERE', where);
                var is_home          = where.constructor === Array && where[0] == 'home';
                where                = is_home ? (where[1] || false) : Sm.Entities.Section.Meta.get_relationship_type({sub: true, type: 'index'}, where);
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('pivots', context_id, where);
                //Sm.CONFIG.DEBUG && console.log('Attempt ', [this.Identity.r_id], ' - ', where);
                var result = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    replace_effective:   true,
                    is_reciprocal:       is_home,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'pivots'
                });
                //Sm.CONFIG.DEBUG && console.log('Replaced ', result.replaced_MVs, is_home);
                //Sm.CONFIG.DEBUG && console.log('New ones ', result.replacement_MVs);
                return Promise.resolve(result || {});
            },
            /**
             * Based on an MvCombo, find the various relationship subtypes that the MvCombo has
             * @param what_we_on
             * @param context_id
             * @return {{}}
             */
            get_relationship_subtypes:         function (what_we_on, context_id) {
                var return_object  = {};
                /**
                 * The Pivots of the MvCombo that this Section is related to
                 * @type {Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex}
                 */
                var PivotsRelIndex = this.relationships.pivots;
                //If the RelationshipIndex doesn't exist, return a standard object
                if (!PivotsRelIndex) return {};
                /**
                 * An object representing the relationship subtypes that the pivot RelationshipIndex is keeping track of. Links subtypes to
                 * @type {Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex.relationship_subtype_map|{}}
                 */
                var subtypes = PivotsRelIndex.relationship_subtype_map;
                var max      = false;
                //Iterate through the subtypes of the context
                if (subtypes && subtypes[context_id]) {
                    /** @type {string} The subtype that we are on as of current */
                    var subtype;
                    //When iterating through the subtypes, we don't care about the relationships they hold, only whether or not they exist
                    for (subtype in subtypes[context_id]) {
                        if (!subtypes[context_id].hasOwnProperty(subtype)) continue;
                        //Don't add a subtype if we are already on it
                        if (subtype == what_we_on) continue;

                        //At the time, text is the only subtype type that has multiple entries. Everything else only has the default types
                        if (/eli5|thing_explainer|text/.test(subtype)) {
                            return_object.text = return_object.text || [];
                            //Add to the "types of text entries" array
                            return_object.text.push(subtype);
                        } else if (/audio|video|image/.test(subtype)) {
                            return_object[subtype] = return_object[subtype] || [];
                            //Add to the "types of ___" array. This only happens this way for standardization purposes
                            return_object[subtype].push(subtype);
                            max                    = true;
                        }
                    }
                }

                /**
                 * Example return =
                 * {
                     *  text: ["text", "eli5"]
                     * }
                 */
                if (what_we_on != 'home') {
                    return_object.home = ['home'];
                    max                = true;
                }

                /**
                 * This is the max number of items that any subtype
                 * @type {*|Array|Number|number}
                 */
                return_object.max = (return_object.text && 3) || (max ? 1 : false);

                return return_object;
            },
            _build_other_MV:                   function (otherWrapper, settings) {
                settings.model_properties = settings.model_properties || {};
                var definition_type       = Sm.Entities.Section.Meta.types.definition;
                if (otherWrapper.type == "Section" && this.Model.attributes.section_type == definition_type) {
                    settings.model_properties.section_type = definition_type;
                }
                return otherWrapper.build_MV(settings);
            },
            _continue_prompt_relationship_add: function (OtherMvCombo, settings) {
                /**NOTE: Handles prompting of section-type and position as well as validation and transform from input
                 * to relationship type
                 **/
                var self_Sm = Sm.Entities[this.type];
                if (!self_Sm) return Promise.reject('No SM');
                var Meta_     = self_Sm.Meta;
                var otherType = OtherMvCombo.type;
                var opposite  = false;
                return (new Promise(function (resolve, reject) {
                    reject                      = reject || function (error) {return Sm.CONFIG.DEBUG && console.log(error) && false;};
                    var potential_relationships = Meta_.get_possible_relationship_indices({OtherMvCombo: OtherMvCombo});
                    if (potential_relationships.length == 1) settings.relationship_index = potential_relationships[0];
                    if (!settings.relationship_index) {
                        if (!Meta_ || !Meta_.get_relationship_type) return reject('The relationship type is not established');

                        settings.relationship_index = prompt('What is the relationship type?');
                        if (settings.relationship_index.indexOf('reciprocal_') === 0 || settings.relationship_index.indexOf('!') === 0) {
                            settings.relationship_index = settings.relationship_index.replace('reciprocal_', '').replace('!', '');
                            opposite                    = true;
                            Sm.CONFIG.DEBUG && console.log(settings.relationship_index, opposite);
                        }
                        settings.relationship_index = Meta_.get_relationship_type({type: 'index'}, settings.relationship_index);
                    }
                    if (!settings.relationship_index) return reject('There is no established relationship type');

                    if (settings.relationship_index == "pivots") {
                        settings.map.relationship_subtype = Meta_.get_relationship_type({type: 'id', sub: true}, prompt('What is the relationship subtype?'));
                    }
                    /*
                     * 1) determine pivot type requested
                     * 2) determine types of pivots available
                     * 3) determine define pivot subtype if valid request
                     * 4) continue creating pivot
                     */
                    else if (!settings.position && otherType != 'Concept') {
                        settings.position     = prompt('At which position should we add the relationship?');
                        settings.position     = settings.position || 0;
                        settings.map.position = settings.position;
                    }

                    if (!!settings.OtherView && !!settings.OtherView.MvCombo) {
                        var clone = true || parseInt(prompt('Clone?'));
                        settings.OtherView.MvCombo.blur();
                        if (!!clone) (settings.OtherView = settings.OtherView.clone());
                    }
                    return resolve({
                        opposite: opposite
                    });
                }));
            },
            _relationship_detail_hook:         function (type, settings, map, lc) {
                var reciprocity_matters, other_index, self_index;
                switch (type) {
                    case 'Section':
                        reciprocity_matters   = true;
                        other_index           = 'secondary_section_id';
                        self_index            = 'primary_section_id';
                        map.relationship_type = Sm.Entities.Section.Meta.get_relationship_type({type: 'id'}, settings.relationship_index);
                        break;
                    case 'Collection':
                    case 'Concept':
                    case 'Dictionary':
                    case 'Dimension':
                        other_index = lc + '_id';
                        self_index  = 'section_id';
                        break;
                }
                return {
                    map:                 map,
                    reciprocity_matters: reciprocity_matters,
                    self_index:          self_index,
                    other_index:         other_index
                }
            },
            /**
             * @alias Sm.Core.MvCombo#_prompt_destroy
             * @param settings
             * @param settings.View
             * @param settings.then_args
             * @param events
             * @param events.success
             * @param events.cancel
             * @param events.fail
             * @method
             */
            _prompt_destroy:                   function (settings, events) {
                events = events || {};
                if (confirm('Are you sure you want to delete ' + this.type + ' ' + this.Identity.ent_id)) {
                    return this._continue_destroy({
                        then_arg: settings.then_args || [events.success, events.fail]
                    })
                }
                var Wrapper_ = this.Wrapper;
                var Mv_      = this;
                var View     = settings.View;
                typeof events.cancel === "function" && events.cancel({
                    Wrapper: Wrapper_,
                    MvCombo: Mv_,
                    View:    View
                });
                return Promise.reject();
            }
        });
        /**
         *
         * @param relationship_index
         * @param context_id
         * @return {Sm.Core.MvCombo~list_items_fn} A function that iterates through the relationships of an MvCombo and returns the items/relationships of them. The index is dependent on the reciprocity
         * @param relationship_subtype
         */
        Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn = function (relationship_index, context_id, relationship_subtype) {
            return function (MvCombo, is_reciprocal, other_important_items) {
                /** @type {Sm.Core.RelationshipIndex|Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex|boolean} The RelationshipIndex that we are going to deal with */
                var RelationshipIndex = MvCombo.getRelationshipIndex(relationship_index, is_reciprocal);
                //Sm.CONFIG.DEBUG && console.log(' + find rels+ ', RelationshipIndex.get_listed_items(context_id).items.map(function (im) {return im.r_id;}), is_reciprocal);
                if (!RelationshipIndex) return {relationships: [], items: []};
                return relationship_index == 'pivots' ? RelationshipIndex.get_listed_subtype_items(relationship_subtype, context_id) : RelationshipIndex.get_listed_items(context_id);
            };
        };
        Sm.loaded.add('Entities_Section_MvCombo');
    }, 'Entities_Section_MvCombo');
});
define("Sm-Entities-Section-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var SectionWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Section',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Section.Wrapper = new SectionWrapper;
        Sm.loaded.add('Entities_Section_Wrapper');
    }, 'Entities_Section_Wrapper');
});
define("Sm-Entities-Section-Wrapper", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        /**
         * @augments Sm.Core.SmView
         * @class
         * @alias Sm.Entities.Section.View
         */
        Sm.Entities.Section.View = Sm.Core.SmView.extend({
            relationship_index_obj: {
                collections: false,
                children:    'child_holder',
                composition: 'composition',
                micros:      false,
                pivots:      'pivot_holder'
            },
            type:                   'Section',
            identifier:             '.spwashi-section',
            setElement:             function (elem) {
                if (elem) elem = elem[0] || elem;
                if (!elem || !elem.addEventListener) {return false;}
                return Sm.Core.SmView.prototype.setElement.apply(this, arguments);
            },
            _rendering_callbacks:   {
                button_control_element:   function () {
                    if (!!this.elements.button_control) return this.elements.button_control;
                    var matching = this.get_rendered('$Element').children('.button-control');
                    return this.elements.button_control = (matching[0] ? matching[0] : false);
                },
                title_element:            function () {
                    if (!!this.elements.title) return this.elements.title;
                    var matching = this.get_rendered('$Element').children('.title');
                    return this.elements.title = (matching[0] ? matching[0] : false);
                },
                subtitle_element:         function () {
                    if (!!this.elements.subtitle) return this.elements.subtitle;
                    var matching = this.get_rendered('$Element').children('.subtitle');
                    return this.elements.subtitle = (matching[0] ? matching[0] : false);
                },
                content_element:          function () {
                    if (!!this.elements.content) return this.elements.content;
                    var matching = this.get_rendered('$Element').children('.content');
                    return this.elements.content = (matching[0] ? matching[0] : false);
                },
                description_element:      function () {
                    if (!!this.elements.description) return this.elements.description;
                    var matching = this.get_rendered('$Element').children('.description');
                    return this.elements.description = (matching[0] ? matching[0] : false);
                },
                content_location_element: function () {
                    if (!!this.elements.content_location) return this.elements.content_location;
                    var matching = this.get_rendered('$Element').children('.content_location');
                    return this.elements.content_location = (matching[0] ? matching[0] : false);
                },
                child_holder_element:     function () {
                    if (!!this.elements.child_holder) return this.elements.child_holder;
                    var matching = this.get_rendered('$Element').children('.children-container');
                    var content_element;
                    if (matching[0]) return this.elements.child_holder = matching[0];
                    else if (content_element = this.get_rendered('content_element')) {
                        var child_holder           = document.createElement('div');
                        child_holder.className     = 'children-container';
                        Sm.Core.util.insertAfter(child_holder, content_element);
                        this.elements.child_holder = child_holder;
                        return this.elements.child_holder;
                    }
                    return false;
                },
                pivot_holder_element:     function () {
                    if (!!this.elements.pivot_holder) return this.elements.pivot_holder;

                    var Relationship_Obj = this.find_closest_relationship();
                    var Relationship_    = Relationship_Obj.Relationship;
                    var relElem          = Relationship_Obj.el;
                    var $relElem         = $(relElem);

                    var matching = false;
                    if ($relElem.hasClass('definition-relationship')) {
                        $relElem.addClass('pivot-container');
                        matching = relElem;
                    }
                    this.elements.pivot_holder = matching;
                    return this.elements.pivot_holder;
                },
                composition_element:      function () {
                    if (!!this.elements.composition_holder) return this.elements.composition_holder;
                    var matching = this.get_rendered('$Element').children('.composition-container');
                    var content_element;
                    if (matching[0]) return this.elements.composition_holder = matching[0];
                    else if (content_element = this.get_rendered('content_element')) {
                        var composition_holder           = document.createElement('div');
                        composition_holder.className     = 'composition-container';
                        Sm.Core.util.insertAfter(composition_holder, content_element);
                        this.elements.composition_holder = composition_holder;
                        return this.elements.composition_holder;
                    }
                    return false;
                },
                focus_element:            function () {
                    if (!!this.elements.focus) return this.elements.focus;
                    var matching = this.$el.children('.focus');
                    if (!matching.length) {
                        var focus       = document.createElement('div');
                        focus.className = 'focus upper';
                        var parent      = this.el;
                        if (!parent) return false;
                        var reference = parent.childNodes[0];
                        if (!reference) return false;
                        parent.insertBefore(focus, reference);
                        return this.elements.focus = focus;
                    }
                    return this.elements.focus = matching[0];
                }
            },
            initialize:             function (settings) {
                this._touch_data = {
                    start:        {
                        x:    0,
                        y:    0,
                        time: 0
                    },
                    threshold:    150, //required min distance traveled to be considered swipe
                    allowed_time: 200 // maximum time allowed to travel that distance
                };
                this.what_we_on  = 'home';
                Sm.Core.SmView.prototype.initialize.apply(this, arguments);
            },

            update:                     function (changed_attributes) {
                if (this.display_type.indexOf('modal') > -1) return this;
                var triggers = ["section_type", "content_location"];
                Sm.CONFIG.DEBUG && console.log(changed_attributes);
                for (var i = 0; i < triggers.length; i++) {
                    var t = triggers[i];
                    if (changed_attributes.indexOf(t) > -1) {
                        this.mark_unrendered();
                        this.replaceOldElement();
                        return this;
                    }
                }
                return Sm.Core.SmView.prototype.update.apply(this, arguments);
            },
            handle:                     true,
            /**
             * This is a basic click handler that operates based only on the target of the click.
             * This one in particular handles
             *  * scaling
             *  * prompting edits
             *  * debugging
             *  * deleting
             *  * adding relationships
             * @param target The target of the click
             * @return {boolean}
             * @param e
             */
            handle_click:               function (target, e) {
                /** NOTE: addresses pop-up button click */
                var $target = $(target);
                if (!this.MvCombo) return false;
                var self             = this;
                var Relationship_Obj = this.find_closest_relationship();
                var Relationship_    = Relationship_Obj.Relationship;
                var relElem          = Relationship_Obj.el;

                /**    SCALE    */
                if ($target.closest('.pan')[0]) {
                    if ($target.hasClass('left')) {
                        //scales towards more specific micro-sections
                        this.scale(true);
                    } else if ($target.hasClass('right')) {
                        //scales towards more generalized macros
                        this.scale(false);
                    }
                }/**    EDIT    */
                else if (this.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                    var edit_config = {};
                    if (Relationship_) edit_config.display_type = 'inline';
                    this.prompt_edit(edit_config);
                }/**    DEBUG  */
                else if ($target.hasClass('debug') && $target.hasClass('button') && Sm.CONFIG.DEBUG) {
                    Sm.CONFIG.DEBUG && console.log(this.cid, ' -- ', this.MvCombo, this.MvCombo.Identity.r_id, this.MvCombo.Model.attributes);
                }/**    DELETE    */
                else if (this.queryPermission('destroy') && $target.hasClass('delete') && $target.hasClass('button')) {
                    /** If this is in a relationship container ... */
                    if (Relationship_) {
                        Relationship_.destroy({silent: false}).then(function () {
                            /** Check to see what we're deleting the section from [Section, Dictionary, ...] */
                            if (Relationship_.linked_entities) {
                                /** Always remove the View itself */
                                self.destroy();
                                /** Then remove the relationship element */
                                relElem && relElem.parentNode.removeChild(relElem);
                                /** If we are deleting it from  a Section */
                                if (Relationship_.linked_entities[0] == 'Section' && Relationship_.linked_entities[1] == 'Section') {}
                                /** If we are deleting it from a Dictionary */
                                else if (Relationship_.linked_entities[0] == 'Dictionary' || Relationship_.linked_entities[1] == 'Dictionary') {}
                            }
                        });
                    } else {
                        this.MvCombo.destroy({prompt: true}, this);
                    }
                }/**    ADD RELATIONSHIP    */
                else if (this.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
                    this.begin_add_relationship({type: 'Section'});
                }/**    FOCUS    */
                else if (e.ctrlKey) {
                    !this.MvCombo.queryStatus('selected') ? this.MvCombo.select(this) : this.MvCombo.deselect(this);
                }
                else {
                    var is_dictionary = false;
                    if (!!Relationship_ && Relationship_ !== null && Relationship_ !== undefined) {
                        is_dictionary = Relationship_.linked_entities[0] == 'Dictionary' || Relationship_.linked_entities[1] == 'Dictionary';
                    } else {
                        Relationship_ = false;
                    }
                    if (Relationship_ !== null && Relationship_ && is_dictionary) {
                        Sm.CONFIG.DEBUG && console.log('is_dictionary');
                        var content_location = this.MvCombo.Model.get('content_location');
                        if (content_location && content_location.length) {
                            Sm.Core.util.follow_link(content_location, false);
                        }
                    }
                    this.MvCombo.focus(this);
                }
            },
            /**
             * Initialize the standard procedure for dealing with the button controls on the side of the Entities
             */
            init_button_control_events: function () {
                var Element  = this.el;
                var type     = this.type;
                var selfSm   = Sm.Entities[type];
                var $Element = $(Element);
                if (!$Element[0]) return false;
                /** @type {jQuery} The $ that represents the button control element */
                var $buttonControl = $(this.get_rendered('button_control'));
                /** @type {Sm.Entities.Section.View} */
                var self           = this;
                /** @type {string|int}  The r_id of the context that we're dealing with*/
                var context_id     = 0 + '';
                /** @type {string} A string stating what we are currently viewing in relation to another MvCombo. If View is the eli5 of another, this string */
                var what_we_on     = 'home';

                /** @type {jQuery} A jQuery object representing the element of the pivot display. */
                var $pivot_display;
                /** @type {boolean} Whether the ViewAid is open or not */
                var on            = false;
                /** @type {Sm.Extras.ViewAid} A ViewAid that helps us pivot Sections */
                this.PivotViewAid = null;
                var original      = {};
                $buttonControl.on({
                    mouseenter: function (event) {
                        event.stopPropagation();
                        if (self.PivotViewAid && self.PivotViewAid.status.is_open) on = true;
                        if (on) return true;
                        var referenced_mv_obj = Sm.Core.MvWrapper.get_effective_MV(self.MvCombo.r_id, true, true) || {};
                        var ReferencedMvCombo = referenced_mv_obj.MVs || false;

                        //If what we're dealing with is not a pivot, we aren't going to need to have a reference MvCombo
                        if (typeof referenced_mv_obj.replacement_indices === "string" && referenced_mv_obj.replacement_indices != 'pivots') ReferencedMvCombo = false;

                        var reference_used = false;
                        what_we_on         = self.what_we_on;

                        if (!ReferencedMvCombo) {
                            what_we_on        = 'home';
                            ReferencedMvCombo = self.MvCombo;
                        } else {
                            //Else we just use the first MvCombo as the relative for the pivots
                            ReferencedMvCombo = Sm.Core.MvWrapper.convert_to_MvCombo(ReferencedMvCombo)[0];
                            reference_used    = true;
                        }
                        //If the Vew aid is already made and open, we don't need to instantiate a new one
                        on        = true;
                        /** @type {jQuery} The button control jquery object */
                        var $this = $(this);

                        var is_different                     = false;
                        var self_relationship_subtype_object = ReferencedMvCombo.get_relationship_subtypes(what_we_on, context_id) || {};
                        for (var subtype_category in self_relationship_subtype_object) {
                            if (!self_relationship_subtype_object.hasOwnProperty(subtype_category)) continue;
                            var count = self_relationship_subtype_object[subtype_category].length;
                            if (original[subtype_category] != count) {
                                is_different               = true;
                                original[subtype_category] = count;
                            }
                        }
                        /** @type {string} This is the template that will be used to create the View aid */
                        var generated_view_aid_template = selfSm.Garage.generate({
                            outer_string_name: 'pivot_display',
                            synchronous:       true,
                            data:              self_relationship_subtype_object
                        });
                        //Create an actual element for the pivot display
                        /** @type {jQuery} An element for the pivot display */
                        $pivot_display = !$pivot_display ? $($(generated_view_aid_template)[0]) : $pivot_display;
                        /** @type {int} The number of elements across to display the View Aid. This is not perfect, but hey */
                        var number     = self_relationship_subtype_object.max || 1;
                        /** @type {Array<HTMLElement>} An array of relationship_subtype elements that we've found */
                        var rel_sub    = $pivot_display.find('.relationship-subtype');
                        var $rel_sub   = $(rel_sub[0]);
                        //If the first relationship subtype element exists, multiply its width with the number of elements across that there'll be
                        //Fixes an issue with improper width being shown
                        if ($rel_sub[0]) {
                            var one_width   = 75;
                            var rel_sub_cat = $pivot_display.find('.relationship-subtype-category');
                            //Using the relationship-subtype-category, make the width of the first one n times the width of one of its n children
                            if (rel_sub_cat[0]) {
                                var $rel_sub_cat = $(rel_sub_cat[0]);
                                var width        = one_width * number;
                                $rel_sub_cat.width(width);
                            }
                        }
                        //If the View_Aid doesn't already exist, create one. If it does, just use that.
                        //todo Cache the View aid and have it updatable
                        //Sm.CONFIG.DEBUG && console.log("diff = ", is_different);
                        if (self.PivotViewAid && is_different) {
                            delete self.PivotViewAid;
                        }
                        if (!self.PivotViewAid) {
                            self.PivotViewAid = new Sm.Extras.ViewAid({
                                element: $pivot_display[0],
                                events:  {
                                    pivot: function (View_Aid, va_content_element, data, dataset) {
                                        var View = self;
                                        if (reference_used && data !== 'home') {
                                            View = ReferencedMvCombo.getView({
                                                reference_element: self.referenceElement,
                                                strict:            true
                                            });
                                            Sm.CONFIG.DEBUG && console.log('-------------------');
                                            if (View) View.pivot(data, false, context_id);
                                            else Sm.CONFIG.DEBUG && console.log(ReferencedMvCombo);
                                        } else {
                                            if (data == 'home') data = ['home', what_we_on];
                                            self.pivot(data, false, context_id);
                                        }
                                    },
                                    open:  function () {
                                        if (!self_relationship_subtype_object.max) return;

                                        //Depending on how close we are to the window, add the "left" class to the view aid.
                                        //This controls if we put it on the left or the right of the screen
                                        var offset = $(window).width() - ($this.offset().left + $this.outerWidth());
                                        if (offset < 200) $pivot_display.addClass('left');
                                        //Append the button control to the screen
                                        $buttonControl.append($pivot_display);
                                    }
                                }
                            });
                        }
                        //Open the View aid
                        self.PivotViewAid.open();
                    },
                    mouseleave: function () {
                        on = false;
                        //If we have a pivot display existent and open, close it
                        if ($pivot_display) {
                            //We wait a little bit in case the mouse has accidentally left
                            setTimeout(function () {
                                if (!on && self.PivotViewAid.status.is_open) {
                                    self.PivotViewAid.close();
                                }
                            }, 250);
                        }
                    }
                });
            },
            remove:                     function () {
                this.PivotViewAid && this.PivotViewAid.status.is_open && this.PivotViewAid.close();
                return Sm.Core.SmView.prototype.remove.apply(this, arguments);
            },
            /**
             * Scale the complexity/summary of a section
             * @param {boolean} scale_towards_micros      This is meant to be less concise, more detailed
             * @param context_id
             */
            scale:                      function (scale_towards_micros, context_id) {
                var self    = this;
                /** @type {Sm.Entities.Section.MvCombo|*} The MvCombo that we are going to be dealing with */
                var MvCombo = this.MvCombo;
                return MvCombo.scale(scale_towards_micros, context_id || 0).then(function (result) {
                    Sm.Core.SmView.replace_with_elements({
                        items:                     result.items || [],
                        referenceElement:          self.referenceElement,
                        replacement_MVs:           result.replacement_MVs || [],
                        replaced_MVs:              result.replaced_MVs || [],
                        replacement_relationships: result.replacement_relationships || [],
                        replaced_relationships:    result.replaced_relationships || []
                    }).catch(function (res) {
                        Sm.CONFIG.DEBUG && console.log(res);
                        //If we tried to scale one way, remove the direction as a possibility for scaling
                        var className = scale_towards_micros ? 'can-pan-left' : 'can-pan-right';
                        self.get_rendered('focus_element') && $(self.get_rendered('focus_element'))
                            .removeClass(className)
                            .removeClass('maybe-' + className);
                    });
                });
            },
            /**
             * Replace this View with a pivot of this section or the pivot of another section
             * @param {string}                  where           The pivot subtype that we are looking for
             * @param {string|boolean}          is_reciprocal
             * @param context_id
             * @return {*}
             */
            pivot:                      function (where, is_reciprocal, context_id) {
                context_id = context_id || 0;
                var self   = this;
                return this.MvCombo.pivot(where, context_id || 0).then(function (result) {
                    Sm.Core.SmView.replace_with_elements({
                        referenceElement:          self.referenceElement,
                        items:                     result.items || {},
                        replacement_MVs:           result.replacement_MVs || [],
                        replaced_MVs:              result.replaced_MVs || [],
                        replacement_relationships: result.replacement_relationships || [],
                        replaced_relationships:    result.replaced_relationships || [],
                        name:                      'pivots.' + where,
                        forEachView:               function () {
                            this.what_we_on = where;
                        }
                    }).catch(function (res) {
                        Sm.CONFIG.DEBUG && console.log(res);
                    });
                })
            },

            /**
             * @override
             * @alias Sm.Entities.Section.View.additional_events
             */
            additional_events: {
                //swipe support
                touchstart: function (e) {
                    /** @alias e.changedTouches */
                    var changedTouches          = e.changedTouches || e.originalEvent.changedTouches;
                    var touch_obj               = changedTouches[0];
                    this._touch_data.start.x    = touch_obj.pageX;
                    this._touch_data.start.y    = touch_obj.pageY;
                    this._touch_data.start.time = new Date().getTime(); // record time when finger first makes contact with surface
                    e.preventDefault();
                },
                //swipe support
                touchend:   function (e) {
                    /** @alias e.changedTouches */
                    var changedTouches = e.changedTouches || e.originalEvent.changedTouches;
                    var touch_obj      = changedTouches[0];
                    //horizontal distance traveled
                    var dist = touch_obj.pageX - this._touch_data.start.x;
                    //check that time elapsed is in threshold, swipe distance is within threshold
                    var time_elapsed = new Date().getTime() - this._touch_data.start.time; // get time elapsed
                    if (time_elapsed <= this._touch_data.allowed_time
                        && Math.abs(touch_obj.pageY - this._touch_data.start.y) <= 100
                        && Math.abs(dist) >= this._touch_data.threshold) {
                        var left = true;
                        if (dist < 0) left = false;
                        this.scale(!!left);

                    } else if (this.MvCombo) {
                        e.stopPropagation();
                        this.handle_click(e.target, e);
                    }
                    this._touch_data.start = {
                        x:    0,
                        y:    0,
                        time: 0
                    };
                    e.preventDefault();
                    e.stopPropagation();
                },
                click:      function (e) {
                    //this.prompt_edit();
                    var isRightMB = (e.which && e.which == 3) || (e.button && e.button == 2);
                    if (isRightMB) Sm.CONFIG.DEBUG && console.log(this);

                    if (this.MvCombo) {
                        this.handle_click(e.target, e);
                        e.stopPropagation();
                    }
                }
            },
            /**
             * Render the Mirror that is to be dragged when adding this to another entity
             * @param el
             * @return {*}
             */
            renderDragMirror:  function (el) {
                var Mv_ = this.MvCombo;
                if (!Mv_) return false;
                var clone                 = el.cloneNode(true);
                var wrap_thing            = document.createElement('div');
                wrap_thing.style.position = 'absolute';
                wrap_thing.appendChild(clone);
                wrap_thing.className      = 'sm-mirror';
                wrap_thing.style.cursor   = 'grabbing';
                return wrap_thing;
            },
            blur:              function () {
                if (!this.queryStatus('focused')) return this;
                this.add_bound && document.removeEventListener('click', this.add_bound('blur', this.MvCombo.blur.bind(this.MvCombo, {}, this)));
                document.removeEventListener('keydown', this.get_bound('scale_handler'));
                return Sm.Core.SmView.prototype.blur.apply(this, arguments);
            },
            focus:             function () {
                if (this.queryStatus('focused')) return this;
                var self           = this;
                /**
                 * This is the <=   => handler for scaling the section
                 * @param e
                 */
                var scale_handler  = function (e) {
                    if (!self.queryStatus('focused')) {
                        Sm.CONFIG.DEBUG && console.log('View is not focused, will not scale');
                        return false;
                    }
                    var keyCode = e.which;
                    if (keyCode == 37) { //Left arrow, scale towards micros
                        self.scale(true).catch(function (err) {
                            Sm.CONFIG.DEBUG && console.log(err);
                        });
                        e.stopPropagation();
                    } else if (keyCode == 39) { //Right arrow, scale away from micros
                        self.scale(false).catch(function (err) {
                            Sm.CONFIG.DEBUG && console.log(err);
                        });
                        e.stopPropagation();
                    }
                };
                this.add_bound && document.addEventListener('click', this.add_bound('blur', this.MvCombo.blur.bind(this.MvCombo, {}, this)));
                document.addEventListener('keydown', this.add_bound('scale_handler', scale_handler));
                var $focus_element = this.$el.children('.focus');
                if ($focus_element[0]) {
                    var context_id = 0;
                    var MvCombo_   = this.MvCombo;
                    var MicroIndex = MvCombo_.relationships['micros'];
                    var MacroIndex = MvCombo_.reciprocal_relationships['micros'];
                    var can_left   = MicroIndex && MicroIndex.has_relationships_in_context(context_id);
                    var can_right  = MacroIndex && MacroIndex.has_relationships_in_context(context_id);

                    if (can_left) $focus_element.addClass('can-pan-left');
                    else if (can_left === 0) $focus_element.addClass('maybe-can-pan-left');
                    else $focus_element.removeClass('maybe-can-pan-left').removeClass('can-pan-left');

                    if (can_right) $focus_element.addClass('can-pan-right');
                    else if (can_right === 0) $focus_element.addClass('maybe-can-pan-right');
                    else $focus_element.removeClass('maybe-can-pan-right').removeClass('can-pan-right');
                }
                return Sm.Core.SmView.prototype.focus.apply(this, arguments);
            },


            undelegateEvents: function () {
                Sm.Core.SmView.prototype.undelegateEvents.apply(this, arguments);
            },

            wrap_element_for_relationship: function (View, relationship_index, Relationship_, container_template) {
                var def_container_string = container_template || '<div></div>';
                if (Relationship_.linked_entities && 'Dictionary' in Relationship_.linked_entities) {
                    def_container_string      = def_container_string.replace('__R_ID__', Relationship_.Identity.r_id);
                    var $definition_container = $(def_container_string);
                    if ($definition_container[0]) {
                        $definition_container[0].appendChild(OtherView.get_rendered('Element'));
                        return $definition_container[0];
                    }
                }
                return View.get_rendered('Element');
            }
        });
        Sm.loaded.add('Entities_Section_View');
    }, 'Entities_Section_View');
});
define("Sm-Entities-Section-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    /**
     * @typedef {{}} relationship_type_info_obj
     * @property MvType
     * @property {int|boolean}      id              The ID that correlates to the ID of the relationship type
     * @property {string}           primary_key     The Primary Key (from the perspective of this type - this type's relationship)
     * @property {string}           secondary_key   The Secondary Key (from this perspective - the other type's relationship)
     * @property {boolean}          is_only_reciprocal   Does this relationship exist solely in a reciprocal way? (e.g. sections don't have a generic "section" relationship, but collections do
     * @property {Array}            linked_entities An array of the entity names that are linked in this relationship (in order from primary to)
     * @property {string}           index_singular  The singular name of the index e.g. children => child, sections=>section
     */

    /**
     * @alias Sm.Entities.Section.Meta
     * @extends Sm.Core.Meta
     * @augments Sm.Core.Meta
     * @property  {{}}types
     */
    var SectionMeta = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj:             {
            /**
             * @type {relationship_type_info_obj}
             */
            children:    {
                MvType:             'Section',
                index_singular:     'child',
                id:                 1,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            composition: {
                MvType:             'Section',
                index_singular:     'composition',
                id:                 2,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            micros: {
                MvType:             'Section',
                index_singular:     'micro',
                id:                 4,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pivots:       {
                MvType:             'Section',
                index_singular:     'pivot',
                id:                 5,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            pages:        {
                MvType:             'Page',
                index_singular:     'page',
                primary_key:        'section_id',
                secondary_key:      'page_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Page']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            collections:  {
                MvType:             'Collection',
                index_singular:     'collection',
                primary_key:        'section_id',
                secondary_key:      'collection_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Collection']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dictionaries: {
                MvType:             'Dictionary',
                index_singular:     'dictionary',
                primary_key:        'section_id',
                secondary_key:      'dictionary_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Dictionary']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dimensions:   {
                MvType:             'Dimension',
                index_singular:     'dimension',
                primary_key:        'section_id',
                secondary_key:      'dimension_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Dimension']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            definitions:  {
                MvType:             'Dictionary',
                index_singular:     'definition',
                secondary_key:      'dictionary_id',
                primary_key:        'section_id',
                is_only_reciprocal: true,
                linked_entities:    ['Section', 'Dictionary']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            sections:     {
                MvType:          'Collection|Dimension|Concept',
                index_singular:  'collection|dimension|concept',
                primary_key:     'collection_id|dimension_id|concept_id',
                secondary_key:   'section_id',
                is_reciprocal:   true,
                linked_entities: ['Section', 'Collection|Dimension|Concept']
            },
            concepts:     {
                MvType:          'Concept',
                index:           'concept',
                id:              null,
                primary_key:     'section_id',
                secondary_key:   'concept_id',
                is_reciprocal:   false,
                linked_entities: ['Section', 'Concept']
            }
        },
        /**
         * The types of Sections there could be
         * @alias Sm.Entities.Section.Meta.types
         */
        types:                             {
            standard:   1,
            image:      2,
            video:      3,
            audio:      4,
            definition: 5,
            table:      6,
            list:       7,
            mirror:     8
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [null];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (type == "Dictionary" && is_reciprocal) return [null, 'definitions'];
            if (type == "Section") return ['children', 'composition', 'micros', 'pivots'];
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];
            if (type == "Dictionary") return ['dictionaries'];

            return [];
        }
    });
    try {
        Sm.Entities.Section.Meta                  = new SectionMeta({type: 'Section'});
        Sm.Entities.Section.Meta.base_constructor = SectionMeta;
        var self_type                             = 'Section';
        Sm.loaded.add('Entities_' + self_type + '_Meta');
    } catch (e) {
        Sm.CONFIG.DEBUG && console.log(e);
    }

});
define("Sm-Entities-Section-Meta", function(){});

/**
 * Created by Sam Washington on 6/15/16.
 */
require(['require', 'Emitter', 'Sm'], function (require, Emitter) {
    require('Sm');
    require(['require', 'Sm/Extras/ViewAid'], function () {});
    Sm.loaded.when_loaded('Core_RelationshipIndex', function () {
        /**
         * A class to hold the pivot relationships that a Section might have
         * @alias Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex
         * @extends Sm.Core.RelationshipIndex
         */
        Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex = Sm.Core.RelationshipIndex.extend({
            relationship_subtype_map: {},
            init:                     function (settings) {
                this.relationship_subtype_map = {};
                return Sm.Core.RelationshipIndex.prototype.init.apply(this, arguments);
            },
            /**
             * Get all of the relationships that gall under a certain subtype
             * @param subtype
             * @param context_id
             * @return {*}
             */
            get_listed_subtype_items: function (subtype, context_id) {
                var subtypes = this.relationship_subtype_map[context_id];
                if (!subtypes || !subtypes[subtype]) return false;
                var items   = subtypes[subtype];
                var ret_obj = {
                    relationships: [],
                    items:         []
                };
                for (var p_r_id in items) {
                    if (!items.hasOwnProperty(p_r_id)) continue;
                    var section_relationship = items[p_r_id];
                    var section              = Sm.Core.Identifier.retrieve(p_r_id);
                    if (!section) continue;
                    section = section.getResource();
                    ret_obj.items.push(section);
                    ret_obj.relationships.push(section_relationship);
                }
                return ret_obj;
            },
            sort_incoming:            function (Relationship_, item_id, context_id) {
                context_id = context_id || 0;
                var subtype;
                if (subtype = Relationship_.map.relationship_subtype) {
                    subtype = Sm.Entities.Section.Meta.get_relationship_type({sub: true, type: 'index'}, subtype);
                    if (!subtype) return;
                    this.relationship_subtype_map[context_id]                   = this.relationship_subtype_map[context_id] || {};
                    this.relationship_subtype_map[context_id][subtype]          = this.relationship_subtype_map[context_id][subtype] || {};
                    this.relationship_subtype_map[context_id][subtype][item_id] = Relationship_;
                }
            },
            /**
             *
             * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.Relationship|Sm.Core.Identifier}item_id
             * @param context_id
             * @param update_indices
             * @return {boolean|*}
             */
            remove_item:              function (item_id, context_id, update_indices) {
                context_id = context_id || 0;
                //If we could successfully remove the relationship, try to remove
                var success = this.relationship_subtype_map[context_id] && Sm.Core.RelationshipIndex.prototype.remove_item.apply(this, arguments);
                if (!success) return false;

                var rel_subs_context = this.relationship_subtype_map[context_id];
                if (typeof  item_id === "object") {
                    if (item_id.setMap) {
                        item_id = this.r_id_map[item_id.Identity.r_id];
                    } else if (item_id.r_id) {
                        item_id = item_id.r_id;
                    }
                }
                for (var subtype in rel_subs_context) {
                    if (!rel_subs_context.hasOwnProperty(subtype)) continue;
                    if (rel_subs_context[subtype][item_id]) {
                        var r_s_c_subtype = rel_subs_context[subtype];
                        delete r_s_c_subtype[item_id];
                        var has_something = false;
                        for (var items in r_s_c_subtype) {
                            //noinspection JSUnfilteredForInLoop
                            has_something = r_s_c_subtype.hasOwnProperty(items);
                            if (has_something)break;
                        }
                        if (!has_something) {
                            delete rel_subs_context[subtype];
                        }
                    }
                }

            }
        });
        Sm.loaded.add('Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex');
    }, 'Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex');
});
define("Sm-Entities-Section-RelationshipAbstraction-pivots_RelationshipIndex", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Collection on the server
     * @alias   Sm.Entities.Collection.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Collection.Model
     */
    Sm.Entities.Collection.Model                = Sm.Core.SmModel.extend({
        defaults: {
            id:              null,
            user_id:         null,
            collection_type: null,
            title:           null,
            description:     null,
            ent_id:          null,
            update_dt:       null,
            creation_dt:     null
        }
    });
    Sm.Entities.Collection.Model.prototype.type = 'Collection';
    Sm.loaded.add('Entities_Collection_Model');
});
define("Sm-Entities-Collection-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Collection/MvCombo
 * @exports CollectionMvCombo
 * @class CollectionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires CollectionView
 * @requires CollectionModel
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Collection-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Collection on the server
         * @alias   Sm.Entities.Collection.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Collection.MvCombo
         */
        Sm.Entities.Collection.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Collection_MvCombo');
    }, 'Entities_Collection_MvCombo');
});
define("Sm-Entities-Collection-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Collection-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var CollectionWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Collection',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Collection.Wrapper = new CollectionWrapper;
        Sm.loaded.add('Entities_Collection_Wrapper');
    }, 'Entities_Collection_Wrapper');
});
define("Sm-Entities-Collection-Wrapper", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-SmView', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    require();
    Sm.loaded.when_loaded(['Core_SmView', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Collection.View = Sm.Core.SmView.extend({
            type:              'Collection',
            mixins:            [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:        '.spwashi-collection',
            additional_events: {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;
                    if ($target.hasClass('spwashi-collection')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }
                }
            }
        });
        Sm.loaded.add('Entities_Collection_View');
    }, 'Entities_Collection_View');
});
define("Sm-Entities-Collection-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var CollectionMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj:             {

            /**
             * @type {relationship_type_info_obj}
             */
            sections:    {
                MvType:             'Section',
                index_singular:     'section',
                id:                 null,
                primary_key:        'collection_id',
                secondary_key:      'section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Collection', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            collections: {
                MvType:             'Section',
                index_singular:     'section',
                id:                 null,
                primary_key:        'section_id',
                secondary_key:      'collection_id',
                is_only_reciprocal: true,
                linked_entities:    ['Collection', 'Section']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings         = settings || {};
            var OtherMvCombo = settings.OtherMvCombo;
            var type         = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            if (type == "Section") return ['sections'];
            return [];
        }
    });
    Sm.Entities.Collection.Meta                  = new CollectionMeta({type: 'Collection'});
    Sm.Entities.Collection.Meta.base_constructor = CollectionMeta;
    var self_type = 'Collection';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});
define("Sm-Entities-Collection-Meta", function(){});

/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Collection-main'], function (require) {
    Sm.Entities.Collection.templates._template = {
        outer:       {
            full:    '',
            preview: '<div class="spwashi-collection preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            inline:  '',
            tab:     '',
            tag:     ''
        },
        modal_outer: {
            full: '<header>\n    <h3>Edit Section</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },

        relationship_index_container: '<section class="relationship-index-container">__CONTENT__</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</div>',
        relationship_outer:       '<div class="relationship" data-Relationship-r_id="__R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity">\n    </div>\n    <div class="content">__CONTENT__</div>\n</div>',

        button_control: {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Collection_templates__template');
});
define("Sm-Entities-Collection-templates-_template", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Collection-main'], function (require) {
    Sm.Entities.Collection.templates.standard = {
        body:  {
            full:    '<div class="description" ><%- description %></div>',
            preview: '<div class="description" ><%- description %></div>',
            inline:  '<div class="description" ><%- description %></div>',
            tab:     '<div class="description" ><%- description %></div>',
            tag:     '<div class="description" ><%- description %></div>'
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Collection_templates_standard');
});
define("Sm-Entities-Collection-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Collection-templates-_template',
         'Sm-Entities-Collection-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Collection-templates-_template');
    require('Sm-Entities-Collection-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Collection_Meta',
        'Entities_Collection_templates__template',
        'Entities_Collection_templates_standard'
        //'Entities_Collection_templates_',
        //'Entities_Collection_templates_',
        //'Entities_Collection_templates_',
    ], function () {
        /**
         * @alias Sm.Entities.Collection.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({});
        Sm.Entities.Collection.Garage = new GarageClass('Collection', 'collection_type');
        Sm.loaded.add('Entities_Collection_Garage');
    }, 'Entities_Collection_Garage');
});
define("Sm-Entities-Collection-Garage", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Dictionary on the server
     * @alias   Sm.Entities.Dictionary.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Dictionary.Model
     */
    Sm.Entities.Dictionary.Model                = Sm.Core.SmModel.extend({
        defaults: {
            title:       '-',
            description: '-',
            ent_id:      null,
            id:          null
        }
    });
    Sm.Entities.Dictionary.Model.prototype.type = 'Dictionary';
    Sm.loaded.add('Entities_Dictionary_Model');
});
define("Sm-Entities-Dictionary-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Dictionary/MvCombo
 * @exports DictionaryMvCombo
 * @class DictionaryMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Dictionary-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Dictionary on the server
         * @alias   Sm.Entities.Dictionary.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Dictionary.MvCombo
         */
        Sm.Entities.Dictionary.MvCombo = Sm.Core.MvCombo.extend({
            words:           {},
            check_words:     function (words, r_id) {
                if (!words) words = '';
                words                   = typeof words === "object" && words.constructor === Array ? words.slice(0) : words.split(',');
                var since_deleted_words = [];


                var non_existent_words = [];
                for (var i = 0; i < words.length; i++) {
                    var w = words[i] = words[i].toLowerCase().trim();
                    if (!w.length) continue;
                    if (this.words[w]) {
                        if (r_id && this.words[w].indexOf(r_id) === -1)
                            non_existent_words.push(w);
                    } else {
                        non_existent_words.push(w);
                    }
                }


                if (r_id) {
                    if (this.definition_word_map[r_id]) {
                        for (var k = 0; k < this.definition_word_map[r_id].length; k++) {
                            var word = this.definition_word_map[r_id][k];
                            if (words.indexOf(word) < 0) {
                                since_deleted_words.push(word);
                            }
                        }
                    } else {this.definition_word_map[r_id] = []}
                }


                return {
                    nonexistent_words:   non_existent_words,
                    since_deleted_words: since_deleted_words
                };
            },
            /**
             *
             * @param {Sm.Entities.Section.MvCombo}Definition
             */
            add_definition:  function (Definition) {
                var DefinitionModel = Definition.Model;
                var words           = DefinitionModel.get_words();
                var checked_words   = this.check_words(words, Definition.Identity.r_id);
                var new_ones        = checked_words.nonexistent_words;
                var old_ones        = checked_words.since_deleted_words;
                //Sm.CONFIG.DEBUG && console.log(new_ones, old_ones);
                for (var i = 0; i < new_ones.length; i++) {
                    var word = new_ones[i];
                    Sm.CONFIG.DEBUG && console.log(word);
                    this.add_word(word, Definition);
                }
                for (var j = 0; j < old_ones.length; j++) {
                    var old_word = old_ones[j];
                    this.remove_word(old_word, Definition);
                }
            },
            add_word:        function (word, definition) {
                if (!word.length) return;
                word = word.toLowerCase().trim();
                if (!word.length) return;
                this.words[word] = this.words[word] || [];

                var def_r_id = definition.Identity.r_id;
                if (this.words[word].indexOf(def_r_id) < 0) {
                    this.words[word].push(def_r_id);

                    var arr = this.definition_word_map[def_r_id] = this.definition_word_map[def_r_id] || [];
                    if (arr.indexOf(word) < 0) {
                        arr.push(word);
                    }
                }
                Sm.Entities.Dictionary.Wrapper.add_word(word, this);
            },
            remove_word:     function (word, definition) {
                if (!word || typeof  word !== "string" || !word.length) return false;
                word = word.toLowerCase().trim();
                if (!word.length) return false;
                if (!(word in this.words)) return false;
                var w_in_dic = this.words[word];
                if (!w_in_dic.length || !definition || !definition.Identity) {
                    delete  this.words[word];
                    Sm.Entities.Dictionary.Wrapper.remove_word(word, this)

                } else {
                    if (w_in_dic.indexOf(definition.Identity.r_id) > -1)
                        w_in_dic.splice(w_in_dic.indexOf(definition.Identity.r_id), 1);
                }
            },
            init:            function () {
                Sm.Core.MvCombo.prototype.init.apply(this, arguments);
                this.words               = {};
                this.definition_word_map = {};
                this.on('add_relationship', function (rel_details) {
                    rel_details           = rel_details || {};
                    var SelfMvCombo       = rel_details.SelfMvCombo;
                    var OtherMvCombo      = rel_details.OtherMvCombo;
                    var Relationship      = rel_details.Relationship;
                    var RelationshipIndex = rel_details.RelationshipIndex;
                    var OtherView         = rel_details.OtherView;
                    var map_indices       = rel_details.map_indices;
                    if (OtherMvCombo.type == 'Section') {
                        if (OtherMvCombo.Model) {
                            var words = OtherMvCombo.Model.get('words') || '';
                            if (words.length) {
                                var _words = words.split(',');
                                for (var i = 0; i < _words.length; i++) {
                                    var w = _words[i];
                                    SelfMvCombo.add_word(w, OtherMvCombo);
                                }
                            }
                        }
                    }
                });
            },
            _build_other_MV: function (otherWrapper, settings) {
                settings.model_properties = settings.model_properties || {};
                if (otherWrapper.type == "Section") {
                    settings.model_properties.section_type = Sm.Entities.Section.Meta.types.definition;
                    settings.prompt                        = true;
                }
                return otherWrapper.build_MV(settings);
            },
            /**
             * todo work on multiple different definitions
             * @param word
             * @param case_sensitive
             * @return {{relationships: [], items: []}}
             */
            define_word:     function (word, case_sensitive) {
                case_sensitive    = !!case_sensitive;
                word              = (!case_sensitive ? word.toLowerCase() : word).trim();
                var word_in_dic   = this.words[word];
                var relationships = [];
                var items         = [];
                if (word_in_dic) {
                    for (var w = 0; w < word_in_dic.length; w++) {
                        var def_MvCombo = word_in_dic[w];
                        var definition  = Sm.Core.Identifier.retrieve(def_MvCombo).getResource();
                        var rel         = this.getRelationship(def_MvCombo);
                        if (!rel || !definition) continue;
                        relationships.push(rel);
                        items.push(definition);
                    }
                }
                return {
                    items:         items,
                    relationships: relationships
                }
            }
        });
        Sm.loaded.add('Entities_Dictionary_MvCombo');
    }, 'Entities_Dictionary_MvCombo');
});
define("Sm-Entities-Dictionary-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Dictionary-main', 'Sm-Core-MvWrapper'], function (require) {

    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        /**
         * @alias Sm.Entities.Dictionary.Wrapper
         */
        var DictionaryWrapper          = Sm.Core.MvWrapper.extend({
            type:              'Dictionary',
            parentType:        null,
            highlighted_words: {},
            words:             {},
            add_word:          function (word, dictionary) {
                word             = word.toLowerCase().trim();
                this.words[word] = this.words[word] || [];
                var dic_r_id     = dictionary.Identity.r_id;
                if (!this.words[word].length) {
                    this.highlight_word(word, {element: document.getElementById('main')});
                }
                if (this.words[word].indexOf(dic_r_id) < 0) {
                    this.words[word].push(dic_r_id);
                }
            },
            remove_word:       function (word, dictionary) {
                word = word.toLowerCase().trim();
                if (!(word in this.words)) return false;
                var w_in_dic = this.words[word];
                if (!word.length || !dictionary || !dictionary.Identity) {
                    delete  this.words[word];
                    this.unhighlight_word(word, {element: document.getElementById('main')});
                } else {
                    w_in_dic.splice(w_in_dic.indexOf(dictionary.Identity.r_id), 1);
                }
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.init_tooltips
             * @param element
             * @return {boolean}
             */
            init_tooltips:     function (element) {
                var $element     = $(element);
                var Garage       = Sm.Entities.Dictionary.Garage;
                var DicTemplates = Sm.Entities.Dictionary.templates;
                if (!Garage || !DicTemplates) return false;
                $element.find('.sm-highlight').each(function () {
                    var $highlight = $(this);
                    $highlight.tooltipster({
                        content:        'Loading',
                        interactive:    true,
                        animation:      'grow',
                        speed:          0,
                        debug:          false,
                        touchDevices:   false,
                        //temporary
                        trigger:        'click',
                        functionBefore: function ($origin, continueTooltip) {
                            Sm.CONFIG.DEBUG && console.log('attempt');
                            if ($origin.parent().hasClass('tooltipstered')) $origin.parent().tooltipster('hide');
                            var active_dict_rids = Sm.Entities.Dictionary.Wrapper.MvMaps.active_MVs;
                            if (active_dict_rids) {
                                var active_dictionaries = [];
                                for (var dictionary_r_id in active_dict_rids) {
                                    if (!active_dict_rids.hasOwnProperty(dictionary_r_id)) continue;
                                    var Identity = active_dict_rids[dictionary_r_id];
                                    if (Identity)   active_dictionaries.push(Identity.getResource());
                                }
                                if (active_dictionaries.length) {
                                    continueTooltip();
                                    Sm.Entities.Dictionary.Garage.definition_tooltip(active_dictionaries, false, {
                                        word:  $origin.data('word'),
                                        title: $origin.text()
                                    }).then(function (content) {
                                        $origin.tooltipster('content', $(content));
                                    })
                                }
                            }
                        }
                    });
                });
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.unhighlight_word
             * @param word_or_words
             * @param settings
             */
            unhighlight_word:  function (word_or_words, settings) {
                settings = settings || {};
                if (typeof word_or_words === "object" && word_or_words.constructor === Array) {
                    for (var i = 0; i < word_or_words.length; i++) {
                        var word = word_or_words[i];
                        this.unhighlight_word(word)
                    }
                } else {
                    if (!word_or_words || !word_or_words.length)
                        var element                       = settings.element || document.body;
                    Sm.CONFIG.DEBUG && console.log(word_or_words);
                    this.highlighted_words                = this.highlighted_words || {};
                    this.highlighted_words[word_or_words] = false;
                    Sm.Extras.Highlight.un_highlight({
                        word:    word_or_words,
                        element: element
                    });
                }
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.highlight_word
             * @param word_or_words
             * @param settings
             */
            highlight_word:    function (word_or_words, settings) {
                settings = settings || {};
                if (word_or_words + '' == '[object Array]') {
                    for (var i = 0; i < word_or_words.length; i++) {
                        var word = word_or_words[i];
                        this.highlight_word(word)
                    }
                } else {
                    var element                           = settings.element || document.body;
                    this.highlighted_words[word_or_words] = true;
                    Sm.Extras.Highlight.highlight({
                        word:    word_or_words,
                        element: element
                    });
                    this.init_tooltips(element)
                }
            },

            change_word_highlight_status: function (highlight, word, DictionaryMvCombo_) {
                word      = word.trim().toLowerCase();
                highlight = !!highlight;
                if (!word || !DictionaryMvCombo_ || !word.trim().length) return false;
                var dic_r_id           = DictionaryMvCombo_.Identity.r_id;
                var word_in_dictionary = this.highlighted_words[word] = this.highlighted_words[word] || [];
                if (!highlight) {
                    var pos;
                    if (word_in_dictionary && (pos = word_in_dictionary.indexOf(dic_r_id)) > -1) {
                        word_in_dictionary.splice(pos, 1);
                        return true;
                    }
                    return false;
                } else {
                    if (word_in_dictionary.indexOf(dic_r_id) < 0) {
                        word_in_dictionary.push(dic_r_id);
                    }
                    return true;
                }

            }
        });
        Sm.Entities.Dictionary.Wrapper = new DictionaryWrapper;
        Sm.loaded.add('Entities_Dictionary_Wrapper');
    }, 'Entities_Dictionary_Wrapper');
});
define("Sm-Entities-Dictionary-Wrapper", function(){});

/**
 /**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-SmView', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    require('Sm-Core-SmView');
    require('Sm-Entities-Abstraction-mixins-SidebarModule');
    Sm.loaded.when_loaded(['Core', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Dictionary.View = Sm.Core.SmView.extend({
            type:                          'Dictionary',
            mixins:                        [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:                    '.spwashi-dictionary',
            additional_events:             {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;

                    if (target.tagName == 'INPUT' && target.type == 'checkbox') {
                        if (!MvCombo.queryStatus('active') && target.checked) {
                            Sm.CONFIG.DEBUG && console.log('activate');
                            MvCombo.activate(this);
                            Sm.CONFIG.DEBUG && console.log(MvCombo.words);
                        } else {
                            MvCombo.deactivate(this);
                        }
                    } else if ($target.hasClass('spwashi-dictionary')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }

                    if (this.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                        this.prompt_edit();
                    }

                }
            },
            relationship_index_obj:        {
                definitions: 'definitions_container'
            },
            _rendering_callbacks:          {
                definitions_container_element: function () {
                    if (!!this.elements.definitions_container) return this.elements.definitions_container;
                    var matching = this.get_rendered('$Element').find('.definitions-container');
                    var content_element;
                    if (matching[0]) return this.elements.definitions_container = matching[0];
                    else if (content_element = this.get_rendered('description')) {
                        var definitions_container           = document.createElement('div');
                        definitions_container.className     = 'definitions-container';
                        Sm.Core.util.insertAfter(definitions_container, content_element);
                        this.elements.definitions_container = definitions_container;
                        return this.elements.definitions_container;
                    }
                    return false;
                }
            },
            wrap_element_for_relationship: function (View, relationship_index, Relationship_) {
                if (relationship_index == "definitions") {
                    var MvCombo_ = View.MvCombo;
                    var outer    = Sm.Entities.Dictionary.templates._template.definition_relationship_outer;
                    outer        = outer
                        .replace('__MV_R_ID__', MvCombo_.Identity.r_id)
                        .replace('__R_ID__', Relationship_.Identity.r_id)
                        .replace('__CONTENT__', '')
                        .replace('__TITLE__', MvCombo_.Model.get('title') || '_');
                    var $outer   = $(outer);
                    if ($outer[0]) {
                        var $content = $outer.find('.content');
                        if ($content[0]) {
                            $content[0].appendChild(View.get_rendered('Element'));
                            return $outer[0];
                        }
                    }
                }
                return View.get_rendered('Element');
            },
            handle:                        undefined
        });
        Sm.loaded.add('Entities_Dictionary_View');
    }, 'Entities_Dictionary_View');
});
define("Sm-Entities-Dictionary-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    /**
     * @alias Sm.Entities.Dictionary.Meta
     * @augments Sm.Core.Meta
     */
    var DictionaryMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {
            /**
             * @type {relationship_type_info_obj}
             */
            definitions: {
                MvType            : 'Section',
                index_singular    : 'definition',
                id                : null,
                primary_key       : 'dictionary_id',
                secondary_key     : 'section_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dictionary', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            dictionaries: {
                MvType            : 'Page|Section',
                index_singular    : 'page|section',
                id                : null,
                primary_key       : 'page_id|section_id',
                secondary_key     : 'dictionary_id',
                is_only_reciprocal: true,
                linked_entities   : ['Section|Page', 'Dictionary']
            }
        },
        relationship_aliases             : {
            sections: 'definitions'
        },
        /**
         * @alias Sm.Entities.Dictionary.Meta.get_possible_relationship_indices
         * @param settings
         * @return {[]}
         */
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'dictionaries']}
            if (type == "Section") return ['definitions'];
            if (type == "Page") return ['pages'];
            return [];
        }

    });
    Sm.Entities.Dictionary.Meta                  = new DictionaryMeta({type: 'Dictionary'});
    Sm.Entities.Dictionary.Meta.base_constructor = DictionaryMeta;
    var self_type                                = 'Dictionary';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});
define("Sm-Entities-Dictionary-Meta", function(){});

/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dictionary-main'], function (require) {
    Sm.Entities.Dictionary.templates._template = {
        outer:                    {
            full:    '<div class="spwashi-dictionary preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            preview: '<div class="spwashi-dictionary preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            inline:  '',
            tab:     '',
            tag:     ''
        },
        modal_outer:              {
            full: '<header>\n    <h3>Edit Dictionary</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        relationship_index_container: '<section class="relationship-index-container">\n    <button class="action modal-button" data-action="add_entity" data-data=\'Section\' id="add-new-definition">Add New Definition</button>\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        additional_definition_container: '<div class="definition-container" data-Relationship-r_id="__R_ID__"></div>',
        relationship_outer:              '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity">\n    </div>\n    <div class="content">__CONTENT__</div>\n</div>',
        definition_relationship_outer:   '<div class="relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity" >\n    </div>\n    <header class="relationship-type-title">\n        <h3 class="title">__TITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',
        tooltip_outer:                   '<div class="tooltip relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <header>\n        <h3 class="title">__TITLE__</h3>\n        <h3 class="subtitle">__SUBTITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        button_control: {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>'
        }
    };
    Sm.loaded.add('Entities_Dictionary_templates__template');
});
define("Sm-Entities-Dictionary-templates-_template", function(){});

    /**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dictionary-main'], function (require) {
    Sm.Entities.Dictionary.templates.standard = {
        body:  {
            full:    '<div class="description" ><%- description %></div>',
            preview: '<div class="description" ><%- description %></div>',
            inline:  '<div class="description" ><%- description %></div>',
            tab:     '<div class="description" ><%- description %></div>',
            tag:     '<div class="description" ><%- description %></div>'
        },
        modal: {
            full: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Dictionary Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Dictionary Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>',
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Dictionary_templates_standard');
});
define("Sm-Entities-Dictionary-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
    'Sm-Entities-Dictionary-templates-_template',
    'Sm-Entities-Dictionary-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Dictionary-templates-_template');
    require('Sm-Entities-Dictionary-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Dictionary_Meta',
        'Entities_Dictionary_templates__template'
    ], function () {

        var GarageClass               = Sm.Entities.Abstraction.Garage.extend({
            /**
             * @alias {Sm.Entities.Dictionary.Garage#relationships}
             * @override {Sm.Entities.Abstraction.Garage#relationships}
             * @param Mv_
             * @param synchronous
             * @param settings
             * @return {*}
             */
            relationships:      function (Mv_, synchronous, settings) {
                settings                = settings || {};
                settings.display_type   = 'inline';
                settings.always_display = ['definitions'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    synchronous,
                    settings
                ]);
            },
            definition_tooltip: function (Mv_, synchronous, settings) {
                settings             = settings || {};
                var word             = settings.word || false;
                var title            = settings.title || word;
                var Garage_          = this;
                var config           = {
                    relationship_index_list: ['definitions'],
                    /** @type {Sm.Entities.Abstraction.Garage~on_add} on_append */
                    /**
                     * @type {Sm.Entities.Abstraction.Garage~on_add}
                     * @param {Sm.Core.MvCombo}             MvCombo
                     * @param {Sm.Entities.Section.View}    View
                     * @param {string}                      relationship_index
                     */
                    on_append:               function (MvCombo, View, relationship_index) {
                        Sm.CONFIG.DEBUG && console.log(View.queryPermission('view'));
                        View.setPermission('focus', false);
                        View.mark_added();
                    }
                };
                var string           = Sm.Entities.Dictionary.templates._template.tooltip_outer || '';
                string               = string
                    .replace('__CONTENT__', '')
                    .replace('__TITLE__', '')
                    .replace('__SUBTITLE__', '');
                var $tooltip_element = $(string);

                var content_element = $tooltip_element.find('.content');
                content_element     = content_element[0] || false;
                var append_content  = function (content) {
                    if (content_element) content_element.appendChild(content);
                    return $tooltip_element[0];
                };

                if (Object.prototype.toString.call(Mv_) === '[object Array]') {
                    if (!word && Mv_[0] && Mv_[0].Model) word = Mv_[0].Model.get('title');
                    var title_element = $tooltip_element.find('.title');
                    title_element     = title_element[0] || false;
                    if (title_element) title_element.innerHTML = title;

                    return Mv_.reduce(function (P, MvCombo_) {
                        return P.then(function () {
                            var def_rels                    = MvCombo_.define_word(word);
                            config.listed_relationships_obj = {
                                definitions: def_rels
                            };
                            return Garage_.relationships(MvCombo_, false, config).then(append_content);
                        });
                    }, Promise.resolve());
                } else {
                    return this.relationships(Mv_, false, config).then(append_content);
                }
            }
        });
        /**
         * @alias Sm.Entities.Dictionary.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        Sm.Entities.Dictionary.Garage = new GarageClass('Dictionary', 'dictionary_type');
        Sm.loaded.add('Entities_Dictionary_Garage');
    }, 'Entities_Dictionary_Garage');
});
define("Sm-Entities-Dictionary-Garage", function(){});

/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Dimension on the server
     * @alias   Sm.Entities.Dimension.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Dimension.Model
     */
    Sm.Entities.Dimension.Model                = Sm.Core.SmModel.extend({
        defaults: {
            title:       '-',
            description: '-',
            ent_id:      null,
            id:          null
        }
    });
    Sm.Entities.Dimension.Model.prototype.type = 'Dimension';
    Sm.loaded.add('Entities_Dimension_Model');
});
define("Sm-Entities-Dimension-Model", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Dimension/MvCombo
 * @exports DimensionMvCombo
 * @class DimensionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Dimension-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Dimension on the server
         * @alias   Sm.Entities.Dimension.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Dimension.MvCombo
         */
        Sm.Entities.Dimension.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Dimension_MvCombo');
    }, 'Entities_Dimension_MvCombo');
});
define("Sm-Entities-Dimension-MvCombo", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Dimension-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var DimensionWrapper          = Sm.Core.MvWrapper.extend({
            type              : 'Dimension',
            parentType        : null,
            populate_container: function (settings) {},
            get_active        : function () {
                var active_dimensions = this.MvMaps.active_MVs;
                for (var dimension in active_dimensions) {
                    if (!active_dimensions.hasOwnProperty(dimension)) continue;
                    return active_dimensions[dimension].getResource();
                }
            }
        });
        Sm.Entities.Dimension.Wrapper = new DimensionWrapper;
        Sm.loaded.add('Entities_Dimension_Wrapper');
    }, 'Entities_Dimension_Wrapper');
});
define("Sm-Entities-Dimension-Wrapper", function(){});

/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        Sm.Entities.Dimension.View = Sm.Core.SmView.extend({
            type:                   'Dimension',
            identifier:             '.spwashi-dimension',
            relationship_index_obj: {
                sections: 'section_holder'
            },
            initialize:             function (settings) {
                this._touch_data               = {
                    start:        {
                        x:    0,
                        y:    0,
                        time: 0
                    },
                    threshold:    150, //required min distance traveled to be considered swipe
                    allowed_time: 200 // maximum time allowed to travel that distance
                };
                var self_view                  = this;
                Sm.Core.SmView.prototype.initialize.apply(this, arguments);
                this.elements                  = Sm.Core.util.merge_objects({
                    title:          null,
                    description:    null,
                    content:        null,
                    section_holder: null
                }, this.elements);
            },
            _rendering_callbacks : {
                title_element:       function () {
                    if (!!this.elements.title) return this.elements.title;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'title');
                    if (!matching_element_list.length) return false;
                    return this.elements.title = matching_element_list[0];
                },
                content_element:     function () {
                    if (!!this.elements.content) return this.elements.content;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'content');
                    if (!matching_element_list.length) return false;
                    return this.elements.content = matching_element_list[0];
                },
                description_element: function () {
                    if (!!this.elements.description) return this.elements.description;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'description');
                    if (!matching_element_list.length) return false;
                    return this.elements.description = matching_element_list[0];
                },
                section_holder_element: function () {
                    if (!!this.elements.section_holder) return this.elements.section_holder;
                    if (!this.MvCombo || !this.MvCombo.Identity.ent_id || !this.MvCombo.Identity.ent_id.length) return false;
                    var matching_element_list = $('.section-container[data-ent_id=' + this.MvCombo.Identity.ent_id + ']');
                    if (!matching_element_list.length) {return false;}
                    Sm.CONFIG.DEBUG && console.log(matching_element_list[0]);
                    return this.elements.section_holder = matching_element_list[0];
                }
            },
            focus:                  function () {
                var add_button_list = document.getElementsByClassName('add-section-button');
                if (add_button_list.length) {
                    add_button_list[0].addEventListener('click', this.add_bound('begin_add_rel', this.begin_add_relationship.bind(this, {type: 'Section'})));
                }
                return Sm.Core.SmView.prototype.focus.apply(this, arguments);
            }
        });
        Sm.loaded.add('Entities_Dimension_View');
    }, 'Entities_Dimension_View');
});
define("Sm-Entities-Dimension-View", function(){});

/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var DimensionMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {
            /**
             * @type {relationship_type_info_obj}
             */
            sections: {
                MvType            : 'Section',
                index_singular    : 'section',
                primary_key       : 'dimension_id',
                secondary_key     : 'section_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dimension', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            pages   : {
                MvType            : 'Page',
                index_singular    : 'page',
                primary_key       : 'dimension_id',
                secondary_key     : 'page_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dimension', 'Page']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            dimensions: {
                MvType            : 'Section',
                index_singular    : 'section',
                primary_key       : 'section_id',
                secondary_key     : 'dimension_id',
                is_only_reciprocal: true,
                linked_entities   : ['Dimension', 'Section']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'dimensions']}
            if (type == "Section") return ['sections'];
            if (type == "Page") return ['pages'];
            return [];
        }
    });
    Sm.Entities.Dimension.Meta                  = new DimensionMeta({type: 'Dimension'});
    Sm.Entities.Dimension.Meta.base_constructor = DimensionMeta;
    var self_type                               = 'Dimension';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});
define("Sm-Entities-Dimension-Meta", function(){});

/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dimension-main'], function (require) {
    Sm.Entities.Dimension.templates._template = {
        outer:          {
            full:    '',
            preview: '',
            inline:  '',
            tab:     '',
            tag:     ''
        },
        button_control: {
            full:    '',
            preview: '',
            inline:  '',
            tab:     '',
            tag:     ''
        }
    };
    Sm.loaded.add('Entities_Dimension_templates__template');
});
define("Sm-Entities-Dimension-templates-_template", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dimension-main'], function (require) {
    Sm.Entities.Dimension.templates.standard = {
        body:  {
            /**
             *
             */
            full:    '<div class="description" ><%- description %></div>',
            preview: '<div class="description" ><%- description %></div>',
            inline:  '<div class="description" ><%- description %></div>',
            tab:     '<div class="description" ><%- description %></div>',
            tag:     '<div class="description" ><%- description %></div>'
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Dimension_templates_standard');
});
define("Sm-Entities-Dimension-templates-standard", function(){});

/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Dimension-templates-_template',
         'Sm-Entities-Dimension-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Dimension-templates-_template');
    require('Sm-Entities-Dimension-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Dimension_Meta',
        'Entities_Dimension_templates__template',
    ], function () {
        /**
         * @alias Sm.Entities.Dimension.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass              = Sm.Entities.Abstraction.Garage.extend({});
        Sm.Entities.Dimension.Garage = new GarageClass('Dimension', 'dimension_type');
        Sm.loaded.add('Entities_Dimension_Garage');
    }, 'Entities_Dimension_Garage');
});
define("Sm-Entities-Dimension-Garage", function(){});

