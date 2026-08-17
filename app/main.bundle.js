var dd=Object.create;var qs=Object.defineProperty;var ud=Object.getOwnPropertyDescriptor;var pd=Object.getOwnPropertyNames;var fd=Object.getPrototypeOf,_d=Object.prototype.hasOwnProperty;var md=(e,t,r)=>t in e?qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Bs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var gd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of pd(t))!_d.call(e,s)&&s!==r&&qs(e,s,{get:()=>t[s],enumerable:!(n=ud(t,s))||n.enumerable});return e};var hd=(e,t,r)=>(r=e!=null?dd(fd(e)):{},gd(t||!e||!e.__esModule?qs(r,"default",{value:e,enumerable:!0}):r,e));var et=(e,t,r)=>md(e,typeof t!="symbol"?t+"":t,r);var Na=Bs((j_,Pa)=>{var Fr=1e3,qr=Fr*60,Br=qr*60,Tr=Br*24,vd=Tr*7,wd=Tr*365.25;Pa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return kd(e);if(r==="number"&&isFinite(e))return t.long?xd(e):$d(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function kd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*wd;case"weeks":case"week":case"w":return r*vd;case"days":case"day":case"d":return r*Tr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Br;case"minutes":case"minute":case"mins":case"min":case"m":return r*qr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function $d(e){var t=Math.abs(e);return t>=Tr?Math.round(e/Tr)+"d":t>=Br?Math.round(e/Br)+"h":t>=qr?Math.round(e/qr)+"m":t>=Fr?Math.round(e/Fr)+"s":e+"ms"}function xd(e){var t=Math.abs(e);return t>=Tr?Nn(e,t,Tr,"day"):t>=Br?Nn(e,t,Br,"hour"):t>=qr?Nn(e,t,qr,"minute"):t>=Fr?Nn(e,t,Fr,"second"):e+" ms"}function Nn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var qa=Bs((W_,Fa)=>{function Sd(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Na(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let g=0;for(let h=0;h<_.length;h++)g=(g<<5)-g+_.charCodeAt(h),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=t;function r(_){let g,h=null,E,x;function F(...B){if(!F.enabled)return;let A=F,S=Number(new Date),M=S-(g||S);A.diff=M,A.prev=g,A.curr=S,g=S,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let I=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(j,Y)=>{if(j==="%%")return"%";I++;let X=r.formatters[Y];if(typeof X=="function"){let ge=B[I];j=X.call(A,ge),B.splice(I,1),I--}return j}),r.formatArgs.call(A,B),(A.log||r.log).apply(A,B)}return F.namespace=_,F.useColors=r.useColors(),F.color=r.selectColor(_),F.extend=n,F.destroy=r.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,x=r.enabled(_)),x),set:B=>{h=B}}),typeof r.init=="function"&&r.init(F),F}function n(_,g){let h=r(this.namespace+(typeof g>"u"?":":g)+_);return h.log=this.log,h}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let g=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(_,g){let h=0,E=0,x=-1,F=0;for(;h<_.length;)if(E<g.length&&(g[E]===_[h]||g[E]==="*"))g[E]==="*"?(x=E,F=h,E++):(h++,E++);else if(x!==-1)E=x+1,F++,h=F;else return!1;for(;E<g.length&&g[E]==="*";)E++;return E===g.length}function a(){let _=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),_}function c(_){for(let g of r.skips)if(o(_,g))return!1;for(let g of r.names)if(o(_,g))return!0;return!1}function l(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Fa.exports=Sd});var Ba=Bs((Rt,Fn)=>{Rt.formatArgs=Td;Rt.save=Ed;Rt.load=Cd;Rt.useColors=Ad;Rt.storage=Rd();Rt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Rt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ad(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Td(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Fn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Rt.log=console.debug||console.log||(()=>{});function Ed(e){try{e?Rt.storage.setItem("debug",e):Rt.storage.removeItem("debug")}catch{}}function Cd(){let e;try{e=Rt.storage.getItem("debug")||Rt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Rd(){try{return localStorage}catch{}}Fn.exports=qa()(Rt);var{formatters:Id}=Fn.exports;Id.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,In=Xr.trustedTypes,wa=In?In.createPolicy("lit-html",{createHTML:e=>e}):void 0,js="$lit$",tr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+tr,bd=`<${Ws}>`,$r=document,Qr=()=>$r.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",zs=Array.isArray,Ta=e=>zs(e)||typeof e?.[Symbol.iterator]=="function",Us=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ka=/-->/g,$a=/>/g,wr=RegExp(`>|${Us}(?:([^\\s"'>=/]+)(${Us}*=${Us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xa=/'/g,Sa=/"/g,Ea=/^(?:script|style|textarea|title)$/i,Hs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Hs(1),dr=Hs(2),M_=Hs(3),Mt=Symbol.for("lit-noChange"),ut=Symbol.for("lit-nothing"),Aa=new WeakMap,kr=$r.createTreeWalker($r,129);function Ca(e,t){if(!zs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return wa!==void 0?wa.createHTML(t):t}var Ra=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let c=0;c<r;c++){let l=e[c],d,_,g=-1,h=0;for(;h<l.length&&(a.lastIndex=h,_=a.exec(l),_!==null);)h=a.lastIndex,a===Zr?_[1]==="!--"?a=ka:_[1]!==void 0?a=$a:_[2]!==void 0?(Ea.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=wr):_[3]!==void 0&&(a=wr):a===wr?_[0]===">"?(a=s??Zr,g=-1):_[1]===void 0?g=-2:(g=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?wr:_[3]==='"'?Sa:xa):a===Sa||a===xa?a=wr:a===ka||a===$a?a=Zr:(a=wr,s=void 0);let E=a===wr&&e[c+1].startsWith("/>")?" ":"";o+=a===Zr?l+bd:g>=0?(n.push(d),l.slice(0,g)+js+l.slice(g)+tr+E):l+tr+(g===-2?c:E)}return[Ca(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},en=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[d,_]=Ra(t,r);if(this.el=e.createElement(d,n),kr.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=kr.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(js)){let h=_[a++],E=s.getAttribute(g).split(tr),x=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:x[2],strings:E,ctor:x[1]==="."?On:x[1]==="?"?Dn:x[1]==="@"?Mn:Sr}),s.removeAttribute(g)}else g.startsWith(tr)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(Ea.test(s.tagName)){let g=s.textContent.split(tr),h=g.length-1;if(h>0){s.textContent=In?In.emptyScript:"";for(let E=0;E<h;E++)s.append(g[E],Qr()),kr.nextNode(),l.push({type:2,index:++o});s.append(g[h],Qr())}}}else if(s.nodeType===8)if(s.data===Ws)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(tr,g+1))!==-1;)l.push({type:7,index:o}),g+=tr.length-1}o++}}static createElement(t,r){let n=$r.createElement("template");return n.innerHTML=t,n}};function xr(e,t,r=e,n){if(t===Mt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=xr(e,s._$AS(e,t.values),s,n)),t}var Ln=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??$r).importNode(r,!0);kr.currentNode=s;let o=kr.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Nr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new Pn(o,this,t)),this._$AV.push(d),l=n[++c]}a!==l?.index&&(o=kr.nextNode(),a++)}return kr.currentNode=$r,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Nr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ut,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=xr(this,t,r),Jr(t)?t===ut||t==null||t===""?(this._$AH!==ut&&this._$AR(),this._$AH=ut):t!==this._$AH&&t!==Mt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ta(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ut&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T($r.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=en.createElement(Ca(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ln(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Aa.get(t.strings);return r===void 0&&Aa.set(t.strings,r=new en(t)),r}k(t){zs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Qr()),this.O(Qr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ut,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ut}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=xr(this,t,r,0),a=!Jr(t)||t!==this._$AH&&t!==Mt,a&&(this._$AH=t);else{let c=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=xr(this,c[n+l],r,l),d===Mt&&(d=this._$AH[l]),a||(a=!Jr(d)||d!==this._$AH[l]),d===ut?t=ut:t!==ut&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===ut?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},On=class extends Sr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ut?void 0:t}},Dn=class extends Sr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ut)}},Mn=class extends Sr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=xr(this,t,r,0)??ut)===Mt)return;let n=this._$AH,s=t===ut&&n!==ut||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ut&&(n===ut||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Pn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){xr(this,t)}},Ia={M:js,P:tr,A:Ws,C:1,L:Ra,R:Ln,D:Ta,V:xr,I:Nr,H:Sr,N:Dn,U:Mn,B:On,F:Pn},yd=Xr.litHtmlPolyfillSupport;yd?.(en,Nr),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Nr(t.insertBefore(Qr(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",Xt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Pt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ar(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function La(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Oa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Da(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ma(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ua=hd(Ba(),1);function lt(e){return(0,Ua.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Er(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function za(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Ha(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ga(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Va(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ld=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ja(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Wa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ld.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ya(e,t){let r=ja(e),n=ja(t);if(r!==n)return r<n?-1:1;let s=Wa(e),o=Wa(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),c=Wt(t&&t.created_at);if(a!==c)return a<c?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var Gs=2**20;function Ur(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function qn(e){return(t,r)=>{let n=Ur(t,e),s=Ur(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Vs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:Ur(c,r)-Gs};if(!c)return{rank:Ur(a,r)+Gs};let l=Ur(a,r),d=Ur(c,r),_=(l+d)/2;return l<_&&_<d?{rank:_}:{renormalize:n.map((g,h)=>({bead_id:g.id,rank:h*Gs}))}}function Ys(e,t={}){let r=lt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,l=t.sort||Er;function d(){for(let h of Array.from(a))try{h()}catch{}}function _(){s=Array.from(n.values()).sort(l)}function g(h){if(c||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let x=Array.isArray(h.issues)?h.issues:[];for(let F of x)F&&typeof F.id=="string"&&F.id.length>0&&n.set(F.id,F);_(),o=E,d();return}if(h.type==="upsert"){let x=h.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let F=n.get(x.id);if(!F)n.set(x.id,x);else{let B=Number.isFinite(F.updated_at)?F.updated_at:0,A=Number.isFinite(x.updated_at)?x.updated_at:0;if(B<=A){for(let S of Object.keys(F))S in x||delete F[S];for(let[S,M]of Object.entries(x))F[S]=M}}_()}o=E,d()}else if(h.type==="delete"){let x=String(h.issue_id||"");x&&(n.delete(x),_()),o=E,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function Bn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ka(e){let t=lt("subs"),r=new Map,n=new Map;function s(c,l){t("applyDelta %s +%d ~%d -%d",c,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let E of Array.from(d)){let x=r.get(E);if(!x)continue;let F=x.itemsById;for(let B of _)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&F.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&F.delete(B)}}async function o(c,l){let d=Bn(l);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let g=r.get(c);if(g&&g.key!==d){let h=n.get(g.key);h&&(h.delete(c),h.size===0&&n.delete(g.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:l.type,params:l.params})}catch(g){let h=r.get(c)||null;if(h){let E=n.get(h.key);E&&(E.delete(c),E.size===0&&n.delete(h.key))}throw r.delete(c),g}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let g=r.get(c)||null;if(g){let h=n.get(g.key);h&&(h.delete(c),h.size===0&&n.delete(g.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Bn,selectors:{getIds(c){let l=r.get(c);return l?Array.from(l.itemsById.keys()):[]},has(c,l){let d=r.get(c);return d?d.itemsById.has(l):!1},count(c){let l=r.get(c);return l?l.itemsById.size:0},getItemsById(c){let l=r.get(c),d={};if(!l)return d;for(let _ of l.itemsById.keys())d[_]=!0;return d}}}}function Za(){let e=lt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,_){let g=d?Bn(d):"",h=r.get(l)||"",E=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),E&&h&&g&&h!==g){let x=t.get(l);if(x)try{x.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let B=Ys(l,_);t.set(l,B);let A=B.subscribe(()=>o());s.set(l,A)}else if(!E){let x=Ys(l,_);t.set(l,x);let F=x.subscribe(()=>o());s.set(l,F)}return r.set(l,g),()=>c(l)}function c(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let _=s.get(l);if(_){try{_()}catch{}s.delete(l)}}return{register:a,unregister:c,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Xa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Qa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ja(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ks(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Od(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Dd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ei(e){let t=lt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Od(n),a=Dd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ks(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ks(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Md=Object.freeze({workspace_config:{default_workspace:null}});function ti(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Md.workspace_config.default_workspace}}}function ri(e={}){let t=lt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ti(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ti(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ni(e){let t=lt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(g,h)=>{let E=s++,x=Date.now();n.set(E,{type:g,start_ts:x}),t("request start id=%d type=%s count=%d",E,g,r+1),a();let F=!1,B=()=>{F||(F=!0,n.delete(E),c())},A=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,g,Date.now()-x),B())},3e4);try{let S=await d(g,h),M=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",E,g,M),S}catch(S){let M=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,g,M,S),S}finally{clearTimeout(A),B()}}}return o(),{wrapSend:l,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,g])=>({id:_,type:g.type,elapsed_ms:d-g.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Un(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Va),l;switch(c){case"created_desc":return l.sort(Er),l;case"created_asc":return l.sort(za),l;case"updated_desc":return l.sort(Ha),l;case"priority":return l.sort(Ga),l;case"manual":default:{let d=r();return d?l.sort(qn(d)):l.sort(Er),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Cr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=Cr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ot(e,t){let r=Cr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let l=Math.floor(c/7);if(c<30)return`${l}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function jn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Cr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Wn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let l={...a.order};for(let d of c)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,c,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Vs(c,l,d.order),a);s(d,_);let g=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(h);let E=n(Vs(c,l,h.order),a);s(h,E);let x=await t("ui-order-set",{expected_revision:h.revision,entries:E});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function zn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zs(e,t){return!t||typeof e!="string"||e.length===0||zn(t.visible_labels).includes(e)?!0:zn(t.hidden_labels).includes(e)?!1:!zn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Hn(e,t){return zn(e).filter(r=>Zs(r,t))}function ur(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Pd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},oi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},si={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Nd={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Fd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ai(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function qd(e){if(!e||e.fill==="none"||!e.approval_state)return ai(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Bd(e,t,r){let n=Pd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Nd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${l}>
        ${oi[e]||e}
      </div>
    </div>
  `}function Gn(e,t){if(!e||!e.stages)return"";let r=si[e.route]||si.spec_backed,n=e.stages,s=Fd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${oi[a]||a} ${a==="plan"?qd(n[a]||{}):ai(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Bd(a,n[a]||{},a===s))}
    </div>
  `}function Ud(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ii=2;function jd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ii).join(", "),s=r.length-ii,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Wd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&ur(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&ur(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&ur(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Hn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&ur(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ur(r,"blocked")&&s.push(...jd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ur(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function zd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hd(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Gd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ya):r.children;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?i`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:i`<span class="board-card__roll-none">children 없음</span>`}
        ${Hd(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,c)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${zd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Vn(e,t){let r=Ud(e.priority);return i`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>t.onCardClick(n,e.id)}
      @dragstart=${n=>t.onDragStart(n,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${n=>t.onCopyId(n,e.id)}
        >
          ${e.id}
        </button>
        ${r?i`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Wd(e,t)}
      ${e.workflow&&ur(t.policy||null,"stepper")?Gn(e.workflow,e.status):""}
      ${Gd(e,t)}
    </article>
  `}function jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?i`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Xt.map(o=>i`<option
                    value=${o.value}
                    ?selected=${o.value===e.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(o=>Vn(o,t))}
      </div>
    </section>
  `}function li(e,t,r){return i`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${r.onOverlayClick}
      @cancel=${r.onClose}
    >
      <div class="deferred-popup__container">
        <header class="deferred-popup__header">
          <div class="deferred-popup__title" id="deferred-popup-title">
            Deferred ${e.count}
          </div>
          <button
            type="button"
            class="deferred-popup__close"
            aria-label="닫기"
            @click=${r.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Vn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Vd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Yd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Kd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Zd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?i`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?i`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>i`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?i`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ci(e,t,r){return i`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${e.search}
        @input=${t.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${t.onPriorityChange}
      >
        ${Vd.map(n=>i`<option
              value=${n.value}
              ?selected=${e.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${Yd.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Zd(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${r.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${Kd.map(n=>i`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${t.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var Xd=200,Qd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Jd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),di="beads-ui.board.sort",ui=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function eu(){try{let e=window.localStorage.getItem(di);if(e&&ui.has(e))return e}catch{}return"created_desc"}function pi(e,t){let r=lt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,g=t.closedRange||Lt,h=s?Un(s,a):null,E=Wn({transport:o,uiOrderStore:a}),x=[],F=[],B=[],A=[],S=[],M=[],I=!1,T=0,j=eu(),Y=new Map,X=new Map,ge=new Map,ne=new Set,ae={search:"",priority:"",type:"",labels:[]},he=!1,Ie=null;function Ae(z){return String(z.status||"open")==="open"}function We(z){let K=String(z.status||"open");return K==="open"||K==="blocked"}function Ne(z){let K=ae.search.trim().toLowerCase(),_e=ae.priority,ue=ae.type,ke=ae.labels;return z.filter(Oe=>{if(K){let Xe=String(Oe.id||"").toLowerCase(),Qe=String(Oe.title||"").toLowerCase();if(!Xe.includes(K)&&!Qe.includes(K))return!1}if(_e!==""&&String(Oe.priority)!==_e||ue!==""&&String(Oe.issue_type||"")!==ue)return!1;if(ke.length>0){let Xe=Array.isArray(Oe.labels)?Oe.labels:[];if(!ke.some(Qe=>Xe.includes(Qe)))return!1}return!0})}function Ge(){let z=new Set;for(let K of[x,F,B,A,S,M])for(let _e of K){let ue=Array.isArray(_e.labels)?_e.labels:[];for(let ke of ue)typeof ke=="string"&&ke.length>0&&z.add(ke)}return Array.from(z).sort()}function Te(){return ae.search.trim()!==""||ae.priority!==""||ae.type!==""||ae.labels.length>0}function me(){try{if(h){let z=h.selectBoardColumn("tab:board:in-progress","in_progress",j),K=h.selectBoardColumn("tab:board:blocked","blocked",j).filter(We),_e=new Set(z.map(xe=>xe.id)),ue=h.selectBoardColumn("tab:board:ready","ready",j).filter(xe=>Ae(xe)&&!_e.has(xe.id)),ke=h.selectBoardColumn("tab:board:resolved","resolved",j),Oe=h.selectBoardColumn("tab:board:deferred","deferred",j),Xe=h.selectBoardColumn("tab:board:closed","closed").slice(0,Xd),Qe=[...K,...ue,...z,...ke,...Xe];$e(Qe);let Re=new Set;for(let xe of Qe)xe&&xe.id&&!Xs(xe)&&Re.add(xe.id);let Je=!Te();x=Je?tn(K,Re):K,F=Je?tn(ue,Re):ue,B=Je?tn(z,Re):z,A=Je?tn(ke,Re):ke,S=Oe,T=Oe.length,M=Je?tn(Xe,Re):Xe,Y=new Map;for(let xe of x)Y.set(xe.id,"open");for(let xe of F)Y.set(xe.id,"open");for(let xe of B)Y.set(xe.id,"in_progress");for(let xe of A)Y.set(xe.id,"resolved");for(let xe of S)Y.set(xe.id,"deferred");for(let xe of M)Y.set(xe.id,"closed");X=new Map;for(let xe of x)X.set(xe.id,"blocked-col");for(let xe of F)X.set(xe.id,"ready-col");for(let xe of B)X.set(xe.id,"in-progress-col");for(let xe of A)X.set(xe.id,"resolved-col");for(let xe of M)X.set(xe.id,"closed-col")}Ce()}catch{x=[],F=[],B=[],A=[],S=[],M=[],ge=new Map,Ce()}}function $e(z){let K=new Map;for(let ue of z)ue&&ue.id&&!K.has(ue.id)&&K.set(ue.id,ue);let _e=new Map;for(let ue of K.values()){let ke=Xs(ue);if(!ke)continue;let Oe=_e.get(ke);Oe||(Oe=[],_e.set(ke,Oe)),Oe.push({id:ue.id,title:ue.title,status:ue.status,metadata:ue.metadata,created_at:ue.created_at,updated_at:ue.updated_at})}ge=_e}function be(z){let K=ge.get(z)||[],_e=0;for(let ke of K)(ke.status==="resolved"||ke.status==="closed")&&(_e+=1);let ue=jn(K);return{total:K.length,count:_e,current:ue,children:K}}function $(z){return!ne.has(z)}function w(z,K){z.preventDefault(),z.stopPropagation(),ne.has(K)?ne.delete(K):ne.add(K),Ce()}function H(z,K){z.preventDefault(),z.stopPropagation(),n(K)}function q(z,K){z.preventDefault(),z.stopPropagation(),n(K)}function J(z,K){Ie||n(K)}function O(z,K){z.preventDefault(),z.stopPropagation(),tu(K).then(_e=>{_e&&re("\uBCF5\uC0AC\uB428","success",1200)})}function L(z,K){Ie=K,z.dataTransfer&&(z.dataTransfer.setData("text/plain",K),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function fe(z){z.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Ie=null},0)}function Le(z){let K=String(z.target.value||"");!K||K===g||(g=K,d&&d(K),Ce())}function U(){return c?c.get():null}function P(z){let K=l?l.get():null,_e=K?K.cleanup_failed:null;if(!_e||typeof _e!="object"||Array.isArray(_e))return null;let ue=_e[z];return!ue||typeof ue!="object"||Array.isArray(ue)?null:ue}let C={onCardClick:J,onCopyId:O,onDragStart:L,onDragEnd:fe,onClosedRangeChange:Le,rollupFor:be,isExpanded:$,onRollupToggle:w,onChildClick:H,onFromChipClick:q,cleanupFailureFor:P,get policy(){return U()}};function Q(z,K){Ie||(R(),n(K))}function Z(z,K){z.preventDefault(),z.stopPropagation(),R(),n(K)}let de={...C,onCardClick:Q,onChildClick:Z,onFromChipClick:Z,get policy(){return U()}};function se(z){let K=z.target,_e=e.querySelector(".board-filter__labels");K&&_e&&_e.contains(K)||st()}function Ee(z){z.key==="Escape"&&st()}function Ye(){he||(he=!0,document.addEventListener("mousedown",se),document.addEventListener("keydown",Ee),Ce())}function st(){he&&(he=!1,document.removeEventListener("mousedown",se),document.removeEventListener("keydown",Ee),Ce())}function ft(z){z.key==="Escape"&&R()}function tt(){I||(I=!0,document.addEventListener("keydown",ft),Ce())}function R(){I&&(I=!1,document.removeEventListener("keydown",ft),Ce())}let V={onClose:R,onOverlayClick(z){z.target===z.currentTarget&&R()}},ie={onSearchInput(z){ae.search=String(z.target.value||""),me()},onPriorityChange(z){ae.priority=String(z.target.value||""),me()},onTypeChange(z){ae.type=String(z.target.value||""),me()},onSortChange(z){let K=String(z.target.value||"");if(!(!ui.has(K)||K===j)){j=K;try{window.localStorage.setItem(di,K)}catch{}me()}},onDeferredToggle(){I?R():tt()},onLabelMenuToggle(){he?st():Ye()},onLabelToggle(z){let K=ae.labels.indexOf(z);K===-1?ae.labels.push(z):ae.labels.splice(K,1),me()},onLabelClear(){ae.labels.length!==0&&(ae.labels=[],me())},onNewIssue(){_&&_()}};function Pe(){return i`
      <div class="board-view">
        ${ci(ae,ie,{sort_mode:j,deferred_popup_open:I,deferred_count:T,label_options:Ge(),label_menu_open:he})}
        <div class="board-root">
          ${jr({title:"Blocked",id:"blocked-col",items:Ne(x)},C)}
          ${jr({title:"Ready",id:"ready-col",items:Ne(F)},C)}
          ${jr({title:"In progress",id:"in-progress-col",items:Ne(B)},C)}
          ${jr({title:"Resolved",id:"resolved-col",items:Ne(A)},C)}
          ${jr({title:"Closed",id:"closed-col",items:Ne(M),is_closed:!0,closed_range:g},C)}
        </div>
        ${I?li({items:Ne(S),count:T},de,V):""}
      </div>
    `}function Ce(){je(Pe(),e),Fe()}function Fe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let _e of K)Array.from(_e.querySelectorAll(".board-card")).forEach((ke,Oe)=>{ke.tabIndex=Oe===0?0:-1})}catch{}}async function ot(z,K){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:K}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(_e){r("update-status failed: %o",_e),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function at(z){switch(z){case"blocked-col":return x;case"ready-col":return F;case"in-progress-col":return B;case"resolved-col":return A;default:return[]}}function wt(z,K,_e){if(!o||!a)return;let ue=at(z),ke=ue.find(Je=>Je.id===K);if(!ke)return;let Oe=ue.filter(Je=>Je.id!==K),Xe=_e.closest?_e.closest(".board-card"):null,Qe=Oe.length;if(Xe){let Je=Xe.getAttribute("data-issue-id");if(Je===K)return;let xe=Oe.findIndex(mt=>mt.id===Je);xe>=0&&(Qe=xe)}let Re=Oe.slice();Re.splice(Qe,0,ke),E.applyReorder(K,Re,Qe)}function gt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ct=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let _e=z.target.closest(".board-column");_e&&_e!==ct&&(ct&&ct.classList.remove("board-column--drag-over"),_e.classList.add("board-column--drag-over"),ct=_e)}),e.addEventListener("dragleave",z=>{let K=z.relatedTarget;(!K||!e.contains(K))&&ct&&(ct.classList.remove("board-column--drag-over"),ct=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ct&&(ct.classList.remove("board-column--drag-over"),ct=null);let K=z.target,_e=K.closest(".board-column");if(!_e)return;let ue=z.dataTransfer?.getData("text/plain")||"";if(!ue)return;let ke=_e.id,Oe=X.get(ue);if(Oe&&Oe===ke){if(Jd.has(ke)){if(j!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}wt(ke,ue,K)}return}let Xe=Qd[ke];if(!Xe){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(ue)!==Xe&&ot(ue,Xe)}),e.addEventListener("keydown",z=>{let K=z.target;if(!(K instanceof HTMLElement))return;let _e=String(K.tagName||"").toLowerCase();if(_e==="input"||_e==="textarea"||_e==="select"||_e==="button"||_e==="a"||K.isContentEditable===!0)return;let ue=K.closest(".board-card");if(!ue)return;let ke=String(z.key||"");if(ke==="Enter"||ke===" "){z.preventDefault();let Re=ue.getAttribute("data-issue-id");Re&&n(Re);return}if(ke!=="ArrowUp"&&ke!=="ArrowDown"&&ke!=="ArrowLeft"&&ke!=="ArrowRight")return;z.preventDefault();let Oe=ue.closest(".board-column");if(!Oe)return;let Xe=Array.from(Oe.querySelectorAll(".board-card")),Qe=Xe.indexOf(ue);if(ke==="ArrowDown"&&Qe<Xe.length-1){xt(ue,Xe[Qe+1]);return}if(ke==="ArrowUp"&&Qe>0){xt(ue,Xe[Qe-1]);return}if(ke==="ArrowLeft"||ke==="ArrowRight"){let Re=Array.from(e.querySelectorAll(".board-column")),Je=Re.indexOf(Oe),xe=ke==="ArrowRight"?1:-1,mt=Je+xe;for(;mt>=0&&mt<Re.length;){let St=Re[mt].querySelector(".board-card");if(St){xt(ue,St);return}mt+=xe}}});function xt(z,K){try{z.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let dt=null;h&&h.subscribe&&(dt=h.subscribe(()=>{try{me()}catch{}}));let it=null;c&&c.subscribe&&(it=c.subscribe(()=>{try{me()}catch{}}));let De=null;return l&&l.subscribe&&(De=l.subscribe(()=>{Ce()})),{async load(){r("load"),me()},clear(){st(),R(),dt&&(dt(),dt=null),it&&(it(),it=null),De&&(De(),De=null),e.replaceChildren(),x=[],F=[],B=[],A=[],S=[],M=[],Y=new Map,X=new Map}}}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function tn(e,t){return e.filter(r=>{let n=Xs(r);return!(n&&t.has(n))})}async function tu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Qt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function fr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function ru(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${Qt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Qt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(l=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),l(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function rr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await ru(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var hi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var nr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],rn=[...nr,"reasoning_output_tokens"],nu=["implementation","review-consult"];function Qs(e){let t=0;for(let r of nr)t+=yt(e?.[r]);return t}function su(e){return!e||typeof e!="object"?!1:nr.some(t=>Number.isFinite(e[t]))}function fi(e){return!e||typeof e!="object"?!1:rn.some(t=>Number.isFinite(e[t]))}function ou(e){let t={};for(let r of rn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function _i(e){let t={};for(let r of rn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function mi(e,t){return e==="codex"?yt(t.input_tokens)+yt(t.output_tokens):Qs(t)}function au(e){return e==="claude"?"Claude":"Codex"}function iu(e){return`\u03C4 ${bi(e)}`}function lu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${yt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${yt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${yt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${yt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(hi),o.join(`
`)}function vt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${au(r)} ${iu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:lu(r,n)})}return t}function Kn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let l of rn)Number.isFinite(a.breakdown[l])&&(c.breakdown[l]=yt(c.breakdown[l])+yt(a.breakdown[l]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Js(e){return!e||typeof e!="object"?null:Nt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function cu(e){return e==="codex"?"codex":"claude"}function _r(){return{subtotal:0,breakdown:ou(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Yn(e,t,r){e.subtotal+=t.subtotal;for(let n of rn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=yt(e.breakdown[n])+yt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function gi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function bi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Wr(e){return su(e)?`\u03C4 ${bi(Qs(e))}`:null}function zt(e){let t=Wr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Qs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(hi),r.join(`
`)}function Nt(e,t){let r={claude:_r(),codex:_r()},n={orchestrator:{claude:_r(),codex:_r()},implementation:{claude:_r(),codex:_r()},"review-consult":{claude:_r(),codex:_r()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let l=c.usage;if(fi(l)){let _=cu(c.runner),g=_i(l),h={provider:_,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:g,subtotal:mi(_,g)};g.replayed===!0&&(h.replayed=!0),typeof c.model=="string"&&(h.model=c.model),typeof c.session_id=="string"&&(h.session_id=c.session_id),Yn(r[_],h,!0),Yn(n.orchestrator[_],h,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!nu.includes(_.role)||!fi(_.usage))continue;let g=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let h=_i(_.usage),E={provider:"codex",role:_.role,attempt_id:String(c.attempt_id||""),usage:h,subtotal:mi("codex",h)};E.receipt_id=g,typeof _.model=="string"&&(E.model=_.model),typeof _.session_id=="string"?E.session_id=_.session_id:typeof _.thread_id=="string"&&(E.session_id=_.thread_id),typeof _.turn_id=="string"&&(E.turn_id=_.turn_id),typeof _.completed_at=="string"&&(E.completed_at=_.completed_at),h.replayed===!0&&(E.replayed=!0),Yn(r.codex,E,!1),Yn(n[E.role].codex,E,!1)}}let o={};for(let c of["claude","codex"]){let l=r[c];if(l.legs.length===0)continue;let d=gi(l,!1);c==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let _=n[c][d];_.legs.length>0&&(l[d]={...gi(_,!0),legs:_.legs})}Object.keys(l).length>0&&(a[c]=l)}return{providers:o,roles:a}}var{entries:Ti,setPrototypeOf:yi,isFrozen:du,getPrototypeOf:uu,getOwnPropertyDescriptor:pu}=Object,{freeze:Tt,seal:Ft,create:ao}=Object,{apply:io,construct:lo}=typeof Reflect<"u"&&Reflect;Tt||(Tt=function(t){return t});Ft||(Ft=function(t){return t});io||(io=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});lo||(lo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Zn=Et(Array.prototype.forEach),fu=Et(Array.prototype.lastIndexOf),vi=Et(Array.prototype.pop),nn=Et(Array.prototype.push),_u=Et(Array.prototype.splice),Qn=Et(String.prototype.toLowerCase),eo=Et(String.prototype.toString),to=Et(String.prototype.match),sn=Et(String.prototype.replace),mu=Et(String.prototype.indexOf),gu=Et(String.prototype.trim),Ht=Et(Object.prototype.hasOwnProperty),At=Et(RegExp.prototype.test),on=hu(TypeError);function Et(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return io(e,t,n)}}function hu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return lo(e,r)}}function Be(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qn;yi&&yi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(du(t)||(t[n]=o),s=o)}e[s]=!0}return e}function bu(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function sr(e){let t=ao(null);for(let[r,n]of Ti(e))Ht(e,r)&&(Array.isArray(n)?t[r]=bu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=sr(n):t[r]=n);return t}function an(e,t){for(;e!==null;){let n=pu(e,t);if(n){if(n.get)return Et(n.get);if(typeof n.value=="function")return Et(n.value)}e=uu(e)}function r(){return null}return r}var wi=Tt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ro=Tt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),no=Tt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),yu=Tt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),so=Tt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vu=Tt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ki=Tt(["#text"]),$i=Tt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oo=Tt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),xi=Tt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Xn=Tt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),wu=Ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ku=Ft(/<%[\w\W]*|[\w\W]*%>/gm),$u=Ft(/\$\{[\w\W]*/gm),xu=Ft(/^data-[\-\w.\u00B7-\uFFFF]+$/),Su=Ft(/^aria-[\-\w]+$/),Ei=Ft(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Au=Ft(/^(?:\w+script|data):/i),Tu=Ft(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ci=Ft(/^html$/i),Eu=Ft(/^[a-z][.\w]*(-[.\w]+)+$/i),Si=Object.freeze({__proto__:null,ARIA_ATTR:Su,ATTR_WHITESPACE:Tu,CUSTOM_ELEMENT:Eu,DATA_ATTR:xu,DOCTYPE_NAME:Ci,ERB_EXPR:ku,IS_ALLOWED_URI:Ei,IS_SCRIPT_OR_DATA:Au,MUSTACHE_EXPR:wu,TMPLIT_EXPR:$u}),ln={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Cu=function(){return typeof window>"u"?null:window},Ru=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ai=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ri(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cu(),t=ce=>Ri(ce);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ln.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:E}=e,x=l.prototype,F=an(x,"cloneNode"),B=an(x,"remove"),A=an(x,"nextSibling"),S=an(x,"childNodes"),M=an(x,"parentNode");if(typeof a=="function"){let ce=r.createElement("template");ce.content&&ce.content.ownerDocument&&(r=ce.content.ownerDocument)}let I,T="",{implementation:j,createNodeIterator:Y,createDocumentFragment:X,getElementsByTagName:ge}=r,{importNode:ne}=n,ae=Ai();t.isSupported=typeof Ti=="function"&&typeof M=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:Ie,TMPLIT_EXPR:Ae,DATA_ATTR:We,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:Ge,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:me}=Si,{IS_ALLOWED_URI:$e}=Si,be=null,$=Be({},[...wi,...ro,...no,...so,...ki]),w=null,H=Be({},[...$i,...oo,...xi,...Xn]),q=Object.seal(ao(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),J=null,O=null,L=Object.seal(ao(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,Le=!0,U=!1,P=!0,C=!1,Q=!0,Z=!1,de=!1,se=!1,Ee=!1,Ye=!1,st=!1,ft=!0,tt=!1,R="user-content-",V=!0,ie=!1,Pe={},Ce=null,Fe=Be({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ot=null,at=Be({},["audio","video","img","source","image","track"]),wt=null,gt=Be({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ct="http://www.w3.org/1998/Math/MathML",xt="http://www.w3.org/2000/svg",dt="http://www.w3.org/1999/xhtml",it=dt,De=!1,z=null,K=Be({},[ct,xt,dt],eo),_e=Be({},["mi","mo","mn","ms","mtext"]),ue=Be({},["annotation-xml"]),ke=Be({},["title","style","font","a","script"]),Oe=null,Xe=["application/xhtml+xml","text/html"],Qe="text/html",Re=null,Je=null,xe=r.createElement("form"),mt=function(b){return b instanceof RegExp||b instanceof Function},St=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===b)){if((!b||typeof b!="object")&&(b={}),b=sr(b),Oe=Xe.indexOf(b.PARSER_MEDIA_TYPE)===-1?Qe:b.PARSER_MEDIA_TYPE,Re=Oe==="application/xhtml+xml"?eo:Qn,be=Ht(b,"ALLOWED_TAGS")?Be({},b.ALLOWED_TAGS,Re):$,w=Ht(b,"ALLOWED_ATTR")?Be({},b.ALLOWED_ATTR,Re):H,z=Ht(b,"ALLOWED_NAMESPACES")?Be({},b.ALLOWED_NAMESPACES,eo):K,wt=Ht(b,"ADD_URI_SAFE_ATTR")?Be(sr(gt),b.ADD_URI_SAFE_ATTR,Re):gt,ot=Ht(b,"ADD_DATA_URI_TAGS")?Be(sr(at),b.ADD_DATA_URI_TAGS,Re):at,Ce=Ht(b,"FORBID_CONTENTS")?Be({},b.FORBID_CONTENTS,Re):Fe,J=Ht(b,"FORBID_TAGS")?Be({},b.FORBID_TAGS,Re):sr({}),O=Ht(b,"FORBID_ATTR")?Be({},b.FORBID_ATTR,Re):sr({}),Pe=Ht(b,"USE_PROFILES")?b.USE_PROFILES:!1,fe=b.ALLOW_ARIA_ATTR!==!1,Le=b.ALLOW_DATA_ATTR!==!1,U=b.ALLOW_UNKNOWN_PROTOCOLS||!1,P=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,C=b.SAFE_FOR_TEMPLATES||!1,Q=b.SAFE_FOR_XML!==!1,Z=b.WHOLE_DOCUMENT||!1,Ee=b.RETURN_DOM||!1,Ye=b.RETURN_DOM_FRAGMENT||!1,st=b.RETURN_TRUSTED_TYPE||!1,se=b.FORCE_BODY||!1,ft=b.SANITIZE_DOM!==!1,tt=b.SANITIZE_NAMED_PROPS||!1,V=b.KEEP_CONTENT!==!1,ie=b.IN_PLACE||!1,$e=b.ALLOWED_URI_REGEXP||Ei,it=b.NAMESPACE||dt,_e=b.MATHML_TEXT_INTEGRATION_POINTS||_e,ue=b.HTML_INTEGRATION_POINTS||ue,q=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&mt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(q.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&mt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(q.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(q.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),C&&(Le=!1),Ye&&(Ee=!0),Pe&&(be=Be({},ki),w=[],Pe.html===!0&&(Be(be,wi),Be(w,$i)),Pe.svg===!0&&(Be(be,ro),Be(w,oo),Be(w,Xn)),Pe.svgFilters===!0&&(Be(be,no),Be(w,oo),Be(w,Xn)),Pe.mathMl===!0&&(Be(be,so),Be(w,xi),Be(w,Xn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?L.tagCheck=b.ADD_TAGS:(be===$&&(be=sr(be)),Be(be,b.ADD_TAGS,Re))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?L.attributeCheck=b.ADD_ATTR:(w===H&&(w=sr(w)),Be(w,b.ADD_ATTR,Re))),b.ADD_URI_SAFE_ATTR&&Be(wt,b.ADD_URI_SAFE_ATTR,Re),b.FORBID_CONTENTS&&(Ce===Fe&&(Ce=sr(Ce)),Be(Ce,b.FORBID_CONTENTS,Re)),V&&(be["#text"]=!0),Z&&Be(be,["html","head","body"]),be.table&&(Be(be,["tbody"]),delete J.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw on('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=b.TRUSTED_TYPES_POLICY,T=I.createHTML("")}else I===void 0&&(I=Ru(E,s)),I!==null&&typeof T=="string"&&(T=I.createHTML(""));Tt&&Tt(b),Je=b}},Dt=Be({},[...ro,...no,...yu]),Ut=Be({},[...so,...vu]),yr=function(b){let G=M(b);(!G||!G.tagName)&&(G={namespaceURI:it,tagName:"template"});let oe=Qn(b.tagName),ze=Qn(G.tagName);return z[b.namespaceURI]?b.namespaceURI===xt?G.namespaceURI===dt?oe==="svg":G.namespaceURI===ct?oe==="svg"&&(ze==="annotation-xml"||_e[ze]):!!Dt[oe]:b.namespaceURI===ct?G.namespaceURI===dt?oe==="math":G.namespaceURI===xt?oe==="math"&&ue[ze]:!!Ut[oe]:b.namespaceURI===dt?G.namespaceURI===xt&&!ue[ze]||G.namespaceURI===ct&&!_e[ze]?!1:!Ut[oe]&&(ke[oe]||!Dt[oe]):!!(Oe==="application/xhtml+xml"&&z[b.namespaceURI]):!1},ht=function(b){nn(t.removed,{element:b});try{M(b).removeChild(b)}catch{B(b)}},kt=function(b,G){try{nn(t.removed,{attribute:G.getAttributeNode(b),from:G})}catch{nn(t.removed,{attribute:null,from:G})}if(G.removeAttribute(b),b==="is")if(Ee||Ye)try{ht(G)}catch{}else try{G.setAttribute(b,"")}catch{}},er=function(b){let G=null,oe=null;if(se)b="<remove></remove>"+b;else{let Ue=to(b,/^[\r\n\t ]+/);oe=Ue&&Ue[0]}Oe==="application/xhtml+xml"&&it===dt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let ze=I?I.createHTML(b):b;if(it===dt)try{G=new h().parseFromString(ze,Oe)}catch{}if(!G||!G.documentElement){G=j.createDocument(it,"template",null);try{G.documentElement.innerHTML=De?T:ze}catch{}}let nt=G.body||G.documentElement;return b&&oe&&nt.insertBefore(r.createTextNode(oe),nt.childNodes[0]||null),it===dt?ge.call(G,Z?"html":"body")[0]:Z?G.documentElement:nt},p=function(b){return Y.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},v=function(b){return b instanceof g&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof _)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},N=function(b){return typeof c=="function"&&b instanceof c};function te(ce,b,G){Zn(ce,oe=>{oe.call(t,b,G,Je)})}let le=function(b){let G=null;if(te(ae.beforeSanitizeElements,b,null),v(b))return ht(b),!0;let oe=Re(b.nodeName);if(te(ae.uponSanitizeElement,b,{tagName:oe,allowedTags:be}),Q&&b.hasChildNodes()&&!N(b.firstElementChild)&&At(/<[/\w!]/g,b.innerHTML)&&At(/<[/\w!]/g,b.textContent)||b.nodeType===ln.progressingInstruction||Q&&b.nodeType===ln.comment&&At(/<[/\w]/g,b.data))return ht(b),!0;if(!(L.tagCheck instanceof Function&&L.tagCheck(oe))&&(!be[oe]||J[oe])){if(!J[oe]&&we(oe)&&(q.tagNameCheck instanceof RegExp&&At(q.tagNameCheck,oe)||q.tagNameCheck instanceof Function&&q.tagNameCheck(oe)))return!1;if(V&&!Ce[oe]){let ze=M(b)||b.parentNode,nt=S(b)||b.childNodes;if(nt&&ze){let Ue=nt.length;for(let ve=Ue-1;ve>=0;--ve){let y=F(nt[ve],!0);y.__removalCount=(b.__removalCount||0)+1,ze.insertBefore(y,A(b))}}}return ht(b),!0}return b instanceof l&&!yr(b)||(oe==="noscript"||oe==="noembed"||oe==="noframes")&&At(/<\/no(script|embed|frames)/i,b.innerHTML)?(ht(b),!0):(C&&b.nodeType===ln.text&&(G=b.textContent,Zn([he,Ie,Ae],ze=>{G=sn(G,ze," ")}),b.textContent!==G&&(nn(t.removed,{element:b.cloneNode()}),b.textContent=G)),te(ae.afterSanitizeElements,b,null),!1)},ye=function(b,G,oe){if(ft&&(G==="id"||G==="name")&&(oe in r||oe in xe))return!1;if(!(Le&&!O[G]&&At(We,G))){if(!(fe&&At(Ne,G))){if(!(L.attributeCheck instanceof Function&&L.attributeCheck(G,b))){if(!w[G]||O[G]){if(!(we(b)&&(q.tagNameCheck instanceof RegExp&&At(q.tagNameCheck,b)||q.tagNameCheck instanceof Function&&q.tagNameCheck(b))&&(q.attributeNameCheck instanceof RegExp&&At(q.attributeNameCheck,G)||q.attributeNameCheck instanceof Function&&q.attributeNameCheck(G,b))||G==="is"&&q.allowCustomizedBuiltInElements&&(q.tagNameCheck instanceof RegExp&&At(q.tagNameCheck,oe)||q.tagNameCheck instanceof Function&&q.tagNameCheck(oe))))return!1}else if(!wt[G]){if(!At($e,sn(oe,Te,""))){if(!((G==="src"||G==="xlink:href"||G==="href")&&b!=="script"&&mu(oe,"data:")===0&&ot[b])){if(!(U&&!At(Ge,sn(oe,Te,"")))){if(oe)return!1}}}}}}}return!0},we=function(b){return b!=="annotation-xml"&&to(b,me)},Ke=function(b){te(ae.beforeSanitizeAttributes,b,null);let{attributes:G}=b;if(!G||v(b))return;let oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:w,forceKeepAttr:void 0},ze=G.length;for(;ze--;){let nt=G[ze],{name:Ue,namespaceURI:ve,value:y}=nt,f=Re(Ue),u=y,k=Ue==="value"?u:gu(u);if(oe.attrName=f,oe.attrValue=k,oe.keepAttr=!0,oe.forceKeepAttr=void 0,te(ae.uponSanitizeAttribute,b,oe),k=oe.attrValue,tt&&(f==="id"||f==="name")&&(kt(Ue,b),k=R+k),Q&&At(/((--!?|])>)|<\/(style|title|textarea)/i,k)){kt(Ue,b);continue}if(f==="attributename"&&to(k,"href")){kt(Ue,b);continue}if(oe.forceKeepAttr)continue;if(!oe.keepAttr){kt(Ue,b);continue}if(!P&&At(/\/>/i,k)){kt(Ue,b);continue}C&&Zn([he,Ie,Ae],pe=>{k=sn(k,pe," ")});let W=Re(b.nodeName);if(!ye(W,f,k)){kt(Ue,b);continue}if(I&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!ve)switch(E.getAttributeType(W,f)){case"TrustedHTML":{k=I.createHTML(k);break}case"TrustedScriptURL":{k=I.createScriptURL(k);break}}if(k!==u)try{ve?b.setAttributeNS(ve,Ue,k):b.setAttribute(Ue,k),v(b)?ht(b):vi(t.removed)}catch{kt(Ue,b)}}te(ae.afterSanitizeAttributes,b,null)},Ve=function ce(b){let G=null,oe=p(b);for(te(ae.beforeSanitizeShadowDOM,b,null);G=oe.nextNode();)te(ae.uponSanitizeShadowNode,G,null),le(G),Ke(G),G.content instanceof o&&ce(G.content);te(ae.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ce){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},G=null,oe=null,ze=null,nt=null;if(De=!ce,De&&(ce="<!-->"),typeof ce!="string"&&!N(ce))if(typeof ce.toString=="function"){if(ce=ce.toString(),typeof ce!="string")throw on("dirty is not a string, aborting")}else throw on("toString is not a function");if(!t.isSupported)return ce;if(de||St(b),t.removed=[],typeof ce=="string"&&(ie=!1),ie){if(ce.nodeName){let y=Re(ce.nodeName);if(!be[y]||J[y])throw on("root node is forbidden and cannot be sanitized in-place")}}else if(ce instanceof c)G=er("<!---->"),oe=G.ownerDocument.importNode(ce,!0),oe.nodeType===ln.element&&oe.nodeName==="BODY"||oe.nodeName==="HTML"?G=oe:G.appendChild(oe);else{if(!Ee&&!C&&!Z&&ce.indexOf("<")===-1)return I&&st?I.createHTML(ce):ce;if(G=er(ce),!G)return Ee?null:st?T:""}G&&se&&ht(G.firstChild);let Ue=p(ie?ce:G);for(;ze=Ue.nextNode();)le(ze),Ke(ze),ze.content instanceof o&&Ve(ze.content);if(ie)return ce;if(Ee){if(Ye)for(nt=X.call(G.ownerDocument);G.firstChild;)nt.appendChild(G.firstChild);else nt=G;return(w.shadowroot||w.shadowrootmode)&&(nt=ne.call(n,nt,!0)),nt}let ve=Z?G.outerHTML:G.innerHTML;return Z&&be["!doctype"]&&G.ownerDocument&&G.ownerDocument.doctype&&G.ownerDocument.doctype.name&&At(Ci,G.ownerDocument.doctype.name)&&(ve="<!DOCTYPE "+G.ownerDocument.doctype.name+`>
`+ve),C&&Zn([he,Ie,Ae],y=>{ve=sn(ve,y," ")}),I&&st?I.createHTML(ve):ve},t.setConfig=function(){let ce=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};St(ce),de=!0},t.clearConfig=function(){Je=null,de=!1},t.isValidAttribute=function(ce,b,G){Je||St({});let oe=Re(ce),ze=Re(b);return ye(oe,ze,G)},t.addHook=function(ce,b){typeof b=="function"&&nn(ae[ce],b)},t.removeHook=function(ce,b){if(b!==void 0){let G=fu(ae[ce],b);return G===-1?void 0:_u(ae[ce],G,1)[0]}return vi(ae[ce])},t.removeHooks=function(ce){ae[ce]=[]},t.removeAllHooks=function(){ae=Ai()},t}var Ii=Ri();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Jn=e=>(...t)=>({_$litDirective$:e,values:t}),Hr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var cn=class extends Hr{constructor(t){if(super(t),this.it=ut,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ut||t==null)return this._t=void 0,this.it=t;if(t===Mt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};cn.directiveName="unsafeHTML",cn.resultType=1;var Li=Jn(cn);function fo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=fo();function qi(e){Lr=e}var fn={exec:()=>null};function He(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ct.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Iu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ct={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Lu=/^(?:[ \t]*(?:\n|$))+/,Ou=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Du=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_n=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Mu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_o=/(?:[*+-]|\d{1,9}[.)])/,Bi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ui=He(Bi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Pu=He(Bi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Nu=/^[^\n]+/,go=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Fu=He(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",go).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),qu=He(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_o).getRegex(),os="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ho=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Bu=He("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ho).replace("tag",os).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ji=He(mo).replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",os).getRegex(),Uu=He(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ji).getRegex(),bo={blockquote:Uu,code:Ou,def:Fu,fences:Du,heading:Mu,hr:_n,html:Bu,lheading:Ui,list:qu,newline:Lu,paragraph:ji,table:fn,text:Nu},Oi=He("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",os).getRegex(),ju={...bo,lheading:Pu,table:Oi,paragraph:He(mo).replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Oi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",os).getRegex()},Wu={...bo,html:He(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ho).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:fn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:He(mo).replace("hr",_n).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ui).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},zu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Hu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wi=/^( {2,}|\\)\n(?!\s*$)/,Gu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,as=/[\p{P}\p{S}]/u,yo=/[\s\p{P}\p{S}]/u,zi=/[^\s\p{P}\p{S}]/u,Vu=He(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,yo).getRegex(),Hi=/(?!~)[\p{P}\p{S}]/u,Yu=/(?!~)[\s\p{P}\p{S}]/u,Ku=/(?:[^\s\p{P}\p{S}]|~)/u,Zu=He(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Iu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Gi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Xu=He(Gi,"u").replace(/punct/g,as).getRegex(),Qu=He(Gi,"u").replace(/punct/g,Hi).getRegex(),Vi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ju=He(Vi,"gu").replace(/notPunctSpace/g,zi).replace(/punctSpace/g,yo).replace(/punct/g,as).getRegex(),ep=He(Vi,"gu").replace(/notPunctSpace/g,Ku).replace(/punctSpace/g,Yu).replace(/punct/g,Hi).getRegex(),tp=He("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,zi).replace(/punctSpace/g,yo).replace(/punct/g,as).getRegex(),rp=He(/\\(punct)/,"gu").replace(/punct/g,as).getRegex(),np=He(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),sp=He(ho).replace("(?:-->|$)","-->").getRegex(),op=He("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",sp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),rs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ap=He(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",rs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Yi=He(/^!?\[(label)\]\[(ref)\]/).replace("label",rs).replace("ref",go).getRegex(),Ki=He(/^!?\[(ref)\](?:\[\])?/).replace("ref",go).getRegex(),ip=He("reflink|nolink(?!\\()","g").replace("reflink",Yi).replace("nolink",Ki).getRegex(),Di=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,vo={_backpedal:fn,anyPunctuation:rp,autolink:np,blockSkip:Zu,br:Wi,code:Hu,del:fn,emStrongLDelim:Xu,emStrongRDelimAst:Ju,emStrongRDelimUnd:tp,escape:zu,link:ap,nolink:Ki,punctuation:Vu,reflink:Yi,reflinkSearch:ip,tag:op,text:Gu,url:fn},lp={...vo,link:He(/^!?\[(label)\]\((.*?)\)/).replace("label",rs).getRegex(),reflink:He(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",rs).getRegex()},co={...vo,emStrongRDelimAst:ep,emStrongLDelim:Qu,url:He(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Di).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:He(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Di).getRegex()},cp={...co,br:He(Wi).replace("{2,}","*").getRegex(),text:He(co.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},es={normal:bo,gfm:ju,pedantic:Wu},dn={normal:vo,gfm:co,breaks:cp,pedantic:lp},dp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Mi=e=>dp[e];function ar(e,t){if(t){if(Ct.escapeTest.test(e))return e.replace(Ct.escapeReplace,Mi)}else if(Ct.escapeTestNoEncode.test(e))return e.replace(Ct.escapeReplaceNoEncode,Mi);return e}function Pi(e){try{e=encodeURI(e).replace(Ct.percentDecode,"%")}catch{return null}return e}function Ni(e,t){let r=e.replace(Ct.findPipe,(o,a,c)=>{let l=!1,d=a;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Ct.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ct.slashPipe,"|");return n}function un(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function up(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Fi(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,l}function pp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var ns=class{constructor(e){et(this,"options");et(this,"rules");et(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:un(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=pp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=un(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:un(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=un(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))c.push(r[l]),a=!0;else if(!a)c.push(r[l]);else break;r=r.slice(l);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=g,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,x=E.raw+`
`+r.join(`
`),F=this.blockquote(x);o[o.length-1]=F,n=n.substring(0,n.length-E.raw.length)+F.raw,s=s.substring(0,s.length-E.text.length)+F.text;break}else if(h?.type==="list"){let E=h,x=E.raw+`
`+r.join(`
`),F=this.list(x);o[o.length-1]=F,n=n.substring(0,n.length-h.raw.length)+F.raw,s=s.substring(0,s.length-E.raw.length)+F.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],E=!g.trim(),x=0;if(this.options.pedantic?(x=2,_=g.trimStart()):E?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,_=g.slice(x),x+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(x),B=this.rules.other.hrRegex(x),A=this.rules.other.fencesBeginRegex(x),S=this.rules.other.headingBeginRegex(x),M=this.rules.other.htmlBeginRegex(x);for(;e;){let I=e.split(`
`,1)[0],T;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),T=h):T=h.replace(this.rules.other.tabCharGlobal,"    "),A.test(h)||S.test(h)||M.test(h)||F.test(h)||B.test(h))break;if(T.search(this.rules.other.nonSpaceChar)>=x||!h.trim())_+=`
`+T.slice(x);else{if(E||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(g)||S.test(g)||B.test(g))break;_+=`
`+h}!E&&!h.trim()&&(E=!0),d+=I+`
`,e=e.substring(I.length+1),g=T.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=_.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=_.raw+l.tokens[0].raw,l.tokens[0].text=_.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(_)):l.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):l.tokens.unshift(_)}}if(!s.loose){let d=l.tokens.filter(g=>g.type==="space"),_=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=_}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ni(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ni(a,o.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=un(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=up(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Fi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Fi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+l);let _=[...n[0]][0].length,g=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let E=g.slice(1,-1);return{type:"em",raw:g,text:E,tokens:this.lexer.inlineTokens(E)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class uo{constructor(t){et(this,"tokens");et(this,"options");et(this,"state");et(this,"inlineQueue");et(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new ns,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ct,block:es.normal,inline:dn.normal};this.options.pedantic?(r.block=es.pedantic,r.inline=dn.pedantic):this.options.gfm&&(r.block=es.gfm,this.options.breaks?r.inline=dn.breaks:r.inline=dn.gfm),this.tokenizer.rules=r}static get rules(){return{block:es,inline:dn}}static lex(t,r){return new uo(r).lex(t)}static lexInline(t,r){return new uo(r).inlineTokens(t)}lex(t){t=t.replace(Ct.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ct.tabCharGlobal,"    ").replace(Ct.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},c),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let l;if(this.options.extensions?.inline?.some(_=>(l=_.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let _=r.at(-1);l.type==="text"&&_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,c)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},g),typeof h=="number"&&h>=0&&(_=Math.min(_,h))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},ss=class{constructor(e){et(this,"options");et(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ct.notSpaceStart)?.[0],s=e.replace(Ct.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ar(n)+'">'+(r?s:ar(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ar(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let c=e.items[a];n+=this.listitem(c)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Pi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ar(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Pi(e);if(s===null)return ar(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ar(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},wo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class po{constructor(t){et(this,"options");et(this,"renderer");et(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new ss,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new wo}static parse(t,r){return new po(r).parse(t)}static parseInline(t,r){return new po(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},ts,pn=(ts=class{constructor(e){et(this,"options");et(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},et(ts,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),et(ts,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ts),fp=class{constructor(...e){et(this,"defaults",fo());et(this,"options",this.setOptions);et(this,"parse",this.parseMarkdown(!0));et(this,"parseInline",this.parseMarkdown(!1));et(this,"Parser",Vt);et(this,"Renderer",ss);et(this,"TextRenderer",wo);et(this,"Lexer",Gt);et(this,"Tokenizer",ns);et(this,"Hooks",pn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ss(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ns(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new pn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],l=s[a];pn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&pn.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await c.call(s,d);return l.call(s,g)})();let _=c.call(s,d);return l.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(s,d);return g===!1&&(g=await l.apply(s,d)),g})();let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ar(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ir=new fp;function Ze(e,t){return Ir.parse(e,t)}Ze.options=Ze.setOptions=function(e){return Ir.setOptions(e),Ze.defaults=Ir.defaults,qi(Ze.defaults),Ze};Ze.getDefaults=fo;Ze.defaults=Lr;Ze.use=function(...e){return Ir.use(...e),Ze.defaults=Ir.defaults,qi(Ze.defaults),Ze};Ze.walkTokens=function(e,t){return Ir.walkTokens(e,t)};Ze.parseInline=Ir.parseInline;Ze.Parser=Vt;Ze.parser=Vt.parse;Ze.Renderer=ss;Ze.TextRenderer=wo;Ze.Lexer=Gt;Ze.lexer=Gt.lex;Ze.Tokenizer=ns;Ze.Hooks=pn;Ze.parse=Ze;var og=Ze.options,ag=Ze.setOptions,ig=Ze.use,lg=Ze.walkTokens,cg=Ze.parseInline;var dg=Vt.parse,ug=Gt.lex;function mr(e){let t=Ze.parse(e),r=Ii.sanitize(t);return Li(r)}function ir(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Gr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function is(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var _p={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},mp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,gp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function gr(e){return!!e&&typeof e=="object"}function ko(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Zi(e,t){let r=ko(e),n=ko(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let l=s.get(c)||0;l>0?s.set(c,l-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function hp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>gr(s)&&typeof s.text=="string"?s.text:"").join(""):gr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function bp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:_p[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ko(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Zi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let l=Zi(gr(c)?c.old_string:"",gr(c)?c.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Xi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Qi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=mp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:gp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function yp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(gr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Qi(o.text));else if(o.type==="thinking"){let a=Xi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=bp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(gr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=hp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function vp(e){if(e.type==="item.completed"&&gr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Qi(t.text)];if(t.type==="reasoning"){let r=Xi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function wp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ji(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!gr(o))continue;let a=wp(o)?vp(o):yp(o,r);for(let c of a)t.push(c)}return t}var kp=5,$p=10,xp=/Task\s+#(\d+)/,Sp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ap=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ls(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Tp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ep(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Cp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=xp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Rp(e){if(e.tool==="Bash"){let t=e.command||"";return Sp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ap.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ip(e){let t=e.filter(s=>s.kind==="tool").slice(-$p),r=new Map;t.forEach((s,o)=>{let a=Rp(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Lp(e){let t=Ep(e);if(t)return{text:t,guess:!1};let r=Cp(e);if(r)return{text:r,guess:!1};let n=Ip(e);return n?{text:n,guess:!0}:null}function Op(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ot(e,t)}function cs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,l=new Set,d=new Set,_=null,g=null,h=!1,E=!1,x=!1,F=null,B=null;function A(){h=!1,E=!1,x=!1,F=null,B=null}async function S(O){if(r){E=!0,x=!1,Te();try{let L=await Promise.resolve(r("get-attempt-prompt",{attempt_id:O}));if(o!==O)return;!L||typeof L!="object"||Array.isArray(L)?x=!0:(F=L,B=O)}catch{o===O&&(x=!0)}finally{o===O&&(E=!1,Te())}}}function M(){if(h=!h,h&&o&&B!==o){S(o);return}Te()}function I(){if(!h)return"";let O=Gr({loading:E,error:x});if(O)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${O}
      </div>`;if(!F)return"";if(F.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let L=is(F.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${L?i`<div class="prompt-block__meta">${L} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function T(){if(!o||!n)return[];let O=n.get(o);return Ji(O?O.lines:[])}function j(){if(!o||!n)return null;let O=n.get(o),L=O?O.last_event_at:null;return typeof L=="number"?L:null}function Y(){return a.status==="running"}function X(){if(Y()&&o){g||(g=setInterval(()=>Te(),1e3));return}ge()}function ge(){g&&(clearInterval(g),g=null)}function ne(O){let L=[],fe=0;for(;fe<O.length;){let Le=O[fe];if(Le.kind==="tool"){let U=fe;for(;U<O.length&&O[U].kind==="tool"&&O[U].tool===Le.tool;)U+=1;if(U-fe>=kp&&!d.has(fe)){L.push({kind:"group",idx:fe,tool:Le.tool||"",lines:O.slice(fe,U).map((P,C)=>({idx:fe+C,line:P}))}),fe=U;continue}}L.push({kind:"line",idx:fe,line:Le}),fe+=1}return L}function ae(O){for(let L=O.length-1;L>=0;L-=1){let fe=O[L];if(fe.kind==="result"||fe.kind==="error")return null;if(fe.kind==="tool"&&!Object.hasOwn(fe,"result"))return fe}return null}function he(O){for(let L=O.length-1;L>=0;L-=1)if(O[L].kind==="thinking")return O[L];return null}function Ie(O,L){if(L.kind==="gate")return i`<div class="sv__gate">${L.text}</div>`;if(L.kind==="phase")return i`<div class="sv__phase">${L.text}</div>`;if(L.kind==="result")return i`<div
        class="sv__result${L.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${L.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(L.text||(L.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(L.kind==="thinking"){let fe=l.has(O);return i`<div
        class="sv__think${fe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>$e(O)}
      >
        <span class="sv__think-line">💭 ${ls(L.text)}</span>
        ${fe?i`<pre class="sv__think-expand">${L.text}</pre>`:""}
      </div>`}if(L.kind==="error")return i`<div class="sv__error">⛔ ${L.text}</div>`;if(L.kind==="blocker")return i`<div class="sv__error">⛔ ${L.text}</div>`;if(L.kind==="tool"){let fe=l.has(O),Le=L.tool==="Bash"?Tp(L.command):0,U=L.tool==="Bash"?Le>1?ls(L.command):L.command:L.path||L.command||"";return i`<div
        class="sv__tool${fe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>$e(O)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${L.icon}</span>
          <span class="sv__tool-name">${L.tool}</span>
          ${U?i`<span class="sv__tool-detail">${U}</span>`:""}
          ${Le>1?i`<span class="sv__tool-more">⋯ ${Le}줄</span>`:""}
          ${typeof L.added=="number"?i`<span class="sv__diff-add">+${L.added}</span>`:""}
          ${typeof L.removed=="number"?i`<span class="sv__diff-del">−${L.removed}</span>`:""}
          ${L.result?i`<span class="sv__tool-ok">→ ${L.result}</span>`:""}
        </span>
        ${fe?i`<pre class="sv__tool-expand">${Ae(L)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${mr(L.text||"")}</div>`}function Ae(O){let L=[];if(O.tool==="Bash"&&typeof O.command=="string"&&O.command.length>0)L.push(O.command);else if(O.input!==void 0)try{L.push(`input: ${JSON.stringify(O.input,null,2)}`)}catch{}return typeof O.output=="string"&&O.output.length>0&&L.push(`output:
${O.output}`),L.join(`

`)}function We(){if(!o)return i``;let O=T(),L=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),fe=a.session_id||"",Le=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,U=Y(),P=U?Op(j(),Date.now()):"",C=U?ae(O):null,Q=U?he(O):null,Z=Lp(O);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Z?i`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${U?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${P?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${P}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${P?i`<span class="sv__live-ago">${P}</span>`:""}</span
            >`:""}
        ${fe?i`<button
              type="button"
              class="sv__session"
              title=${fe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${fe}`}
              @click=${()=>$(fe)}
            >
              ⧉ ${fe.slice(0,8)}
            </button>`:""}
        ${L?i`<span class="sv__meta">${L}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${M}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Le}
          @click=${be}
        >
          <span class="sv__follow-full">⇣ ${Le}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>J()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${O.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ne(O).map(de=>de.kind==="group"?Ne(de):Ie(de.idx,de.line))}
      </div>
      ${C||Q?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${C?i`<span class="sv__now-icon">${C.icon}</span>
                  <span class="sv__now-name">${C.tool}</span>
                  <span class="sv__now-detail"
                    >${C.tool==="Bash"?ls(C.command):C.path||C.command||""}</span
                  >`:""}
            ${Q?i`<span class="sv__now-think"
                  >💭 ${ls(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ne(O){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ge(O.idx)}
    >
      <span class="sv__group-icon">${O.lines[0].line.icon}</span>
      <span class="sv__group-name">${O.tool}</span>
      <span class="sv__group-count">${O.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ge(O){d.add(O),Te()}function Te(){je(We(),e),X(),c&&me()}function me(){let O=e.querySelector(".sv__body");O&&(O.scrollTop=O.scrollHeight)}function $e(O){l.has(O)?l.delete(O):l.add(O),Te()}function be(){c=!c,Te()}function $(O){Rr(O).then(L=>{L?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function w(O){!o||!O||(a={...a,...O},Te())}function H(O){let L=O.target;if(!L||!L.classList||!L.classList.contains("sv__body"))return;!(L.scrollHeight-L.scrollTop-L.clientHeight<=4)&&c&&(c=!1,Te())}e.addEventListener("scroll",H,!0);function q(O){let L=O&&O.attempt_id;L&&(o=L,a=O.meta||{},c=!0,l.clear(),d.clear(),A(),!_&&n&&(_=n.subscribe(Te)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Te())}function J(){let O=o;o=null,l.clear(),d.clear(),A(),ge(),r&&O&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${O}`})).catch(()=>{}),je(i``,e),s&&s()}return{open:q,updateMeta:w,close:J,isOpen(){return o!==null},destroy(){ge(),_&&(_(),_=null),e.removeEventListener("scroll",H,!0),o=null,je(i``,e)}}}function mn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=el(t.spec_id),s=el(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function el(e){return typeof e=="string"?e.trim():""}function Dp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Mp(e){let t=e&&e.metadata||{},r=mn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Dp(t)?null:"plan_pending"}),n}function tl(e,t){let r=Mp(e);return i`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?i`<div class="detail-empty">산출물 없음</div>`:i`
          ${r.map(n=>i`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Pp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Np=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Fp=/^\*\*결론\*\* — (.+)$/;function ds(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Pp)return null;let r=Np.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?Fp.exec(t[a]):null,l=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var rl=20;function nl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function qp(e){return e.length>rl?`${e.slice(0,rl)}\u2026`:e}function Bp(e,t,r,n){let s=`${t.lane} ${qp(t.identifier)}`;return i`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${n?"true":"false"}
      @click=${()=>r.onToggle&&r.onToggle(e.id)}
    >
      <span class="detail-report__tri">${n?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${nl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function Up(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${nl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function sl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(l=>{let d=ds(typeof l.text=="string"?l.text:"");return d?Bp(l,d,t,s.has(l.id)):Up(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${a||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:zg}=Ia;var ol=e=>e.strings===void 0;var jp={},al=(e,t=jp)=>e._$AH=t;var Or=Jn(class extends Hr{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ol(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Mt||t===ut)return t;let r=e.element,n=e.name;if(e.type===or.PROPERTY){if(t===r[n])return Mt}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Mt}else if(e.type===or.ATTRIBUTE&&r.getAttribute(n)===t+"")return Mt;return al(e),t}});var $o=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],us=["orchestration_model","orchestration_effort","orchestration_speed"],il=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ps=["delegated","main"],fs=["inherit","claude","codex"],gn=["default","fast"],_s=["standard","fast_track"],hn=["codex","opus","fable","self","skip"],ms=["codex","fable","skip"],gs=["low","medium","high","xhigh"],qt="auto";function lr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ll(e){if(!lr(e)||!lr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))lr(n)&&lr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function cl(e){return e?.impl_dispatch==="main"}function hs(e,t){let r=ll(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[qt,...n.flatMap(([,s])=>s)]}function Vr(e,t,r){if(!lr(e)||!lr(e.runners))return[qt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!lr(o)||!lr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==qt&&a!==r)continue;let l=lr(c)?c.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[qt,...n]}function bs(e,t){let r=ll(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function dl(e,t){let r={};for(let n of $o){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function ul(e,t){let r={};for(let n of us){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var xo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...us]}],So={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},fl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function pl(e){return typeof e=="string"&&e.length>0?e:null}function Wp(e,t,r){let n=pl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=pl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function ys(e,t,r){return e.map(n=>({key:n,...Wp(n,t,r)}))}function _l(e,t,r){let n={pin:0,global:0,base:0};for(let s of ys(e,t,r))n[s.source]+=1;return n}function ml(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function gl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Jg=[...$o,...us];var zp=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Hp={pin:"pin",global:"global",base:"base"};function Gp(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${Hp[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Vp(e,t,r){switch(e){case"workflow_mode":return _s;case"spec_review_model":case"impl_review_model":return hn;case"plan_review_model":return ms;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return gs;case"impl_dispatch":return ps;case"impl_runtime":return fs;case"impl_model":return hs(r,t.impl_runtime);case"impl_effort":return Vr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return gn;case"orchestration_model":return bs(r,null);case"orchestration_effort":return Vr(r,void 0,t.orchestration_model||qt).filter(n=>n!==qt);default:return[]}}function Yp(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${Gp(e.source)}
    <span class="detail-effective__k"
      >${So[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${fl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${So[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===qt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function hl(e,t){let r=xo.flatMap(o=>o.keys),n=_l(r,e.metadata,e.workspace_values),s={};for(let o of ys(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${Kp(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${xo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${ys(o.keys,e.metadata,e.workspace_values).map(a=>Yp(a,{expanded:e.expanded,options:Vp(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Or(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
              </option>`)}
        </select>
        <button
          type="button"
          data-apply-impl-preset
          ?disabled=${e.preset_id.length===0||e.preset_busy}
          @click=${t.onPresetApply}
        >
          이 이슈에 적용
        </button>
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function Kp(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function bl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"";return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${zp.map(c=>{let l=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",d=n[c.id],_=l.length>0||d?.fill==="full",g=!_&&d?.fill==="dim",h=d?.stale===!0;return i`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${g?" detail-summary__gate--current":""}${h?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${l?i`<span class="detail-summary__gate-sha"
                >${l.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var yl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function bn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function vs(e){if(!bn(e)||!bn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>bn(r)&&bn(r.models));return t.length>0?t:null}function Ao(e,t){let r=vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function vl(e,t){return bn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function wl(e,t){let r=vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return vl(n,n.models[t]);return[]}function Zp(e){let t=vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of vl(n,s))r.includes(o)||r.push(o);return r}function Xp(e,t){if(!t)return Zp(e);let n=vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of wl(e,o))s.includes(a)||s.push(a);return s}function kl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Ao(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?wl(t,n.impl_model):Xp(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Qp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function $l(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function l(x){x.key==="Escape"&&s&&(x.preventDefault(),h())}document.addEventListener("keydown",l);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Qp(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:mr(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){je(d(),e)}async function g(x,F={}){s=x,o="loading",a="",c="",_();let B=r?r():"";if(!B){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let A="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(x);try{let S=await n(A),M=await S.json().catch(()=>({}));if(!S.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&F.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||S.status)+")",_();return}a=String(M.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,je(i``,e)}function E(){document.removeEventListener("keydown",l),h()}return{open:g,close:h,destroy:E}}var Jp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Al="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ef(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function tf(e){let t=vt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Wr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Al}
          >부분 집계</span
        >`:""}`}function xl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Sl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Tl(t):""}function rf(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=vt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?i`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Sl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Sl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function nf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Jp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${ef(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Al}</span>`:""}
  </div>`}var sf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Tl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function of(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function El(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let g=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),E=g&&!h,x=g?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${x}
      @click=${F=>{F.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let g=d.cause_detail,h=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:d.cause;return i`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},l=d=>{let _=xl(Js(d));if(vt(_).length===0&&!Wr(d.usage))return"";let g=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${g?"true":"false"}
      title=${g?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${tf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=Js(d),g=xl(_),h=vt(g);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${sf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${fr(d)?i`<span
                  class="detail-session__resumed"
                  title=${fr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Qt(d)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Wr(d.usage)?i`<span class="detail-session__usage"
                    >${Wr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Tl(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${c(d)} ${of(d)}
          ${s.has(d.attempt_id)&&d.usage?nf(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${rf(_)}
        </div>`})}
    </div>
  `}function Cl(e,t={}){return i`
    <div class="detail-section-label">
      과업 프롬프트
      <button
        type="button"
        class="detail-prompt__toggle"
        data-seam="task-prompt-toggle"
        aria-expanded=${e.expanded?"true":"false"}
        title=${e.expanded?"\uC811\uAE30":"\uC6CC\uCEE4\uAC00 \uBCF4\uB0B8 \uD504\uB86C\uD504\uD2B8 \uBCF4\uAE30"}
        @click=${()=>t.onToggle&&t.onToggle()}
      >
        ${e.expanded?"\uC811\uAE30":"\uD3BC\uCE58\uAE30"}
      </button>
    </div>
    ${e.expanded?i`<div class="detail-prompt" data-seam="task-prompt">
          ${af(e)}
        </div>`:""}
  `}function af(e){let t=Gr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=is(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var lf=["open","in_progress","deferred","resolved","closed"],cf=[0,1,2,3,4];function Rl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,l=t.sessionLogStore,d=null,_=null,g={},h="",E=!1,x=!1,F={},B=!1,A=!1,S="",M="",I="";function T(){B=!1,A=!1,S="",M="",I=""}let j=[],Y=null,X=null,ge=!1,ne="",ae=!1,he=0,Ie=new Set;function Ae(){j=[],Y=null,X=null,ge=!1,ne="",ae=!1,he+=1,Ie.clear()}async function We(y){if(!s)return;let f=++he;try{let u=await Promise.resolve(s("get-comments",{id:y}));if(f!==he||y!==d)return;j=Array.isArray(u)?u:[],ge=!1}catch{if(f!==he||y!==d)return;ge=!0}ve()}function Ne(){if(!s||!d)return;let y=_&&typeof _.comment_count=="number"?_.comment_count:null;if(Y!==d){Y=d,X=y,We(d);return}y!==null&&y!==X&&(X=y,We(d))}function Ge(y){Ie.has(y)?Ie.delete(y):Ie.add(y),ve()}function Te(y){let f=ne.trim().length===0;ne=y,f!==(y.trim().length===0)&&ve()}async function me(){let y=ne.trim();if(!s||!d||y.length===0||ae)return;let f=d;ae=!0,ve();let u=!1;try{let k=await Promise.resolve(s("add-comment",{id:f,text:y}));Array.isArray(k)&&k.length>0&&(u=!0,f===d&&(j=k,ge=!1,ne="",X=k.length))}catch{u=!1}u||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(ae=!1),ve()}let $e={onToggle:Ge,onDraftInput:Te,onSubmit:me},be=document.createElement("div");be.className="md-viewer-root",document.body.appendChild(be);let $=$l(be,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),w=document.createElement("div");w.className="session-log-root",document.body.appendChild(w);let H=cs(w,{transport:s?(y,f)=>Promise.resolve(s(y,f)):void 0,sessionLogStore:l}),q=!1,J=!1,O=!1,L=null,fe=null,Le=0;function U(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function P(){q=!1,J=!1,O=!1,L=null,fe=null,Le+=1}async function C(y){if(!s)return;let f=++Le;J=!0,O=!1,ve();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(f!==Le)return;!u||typeof u!="object"||Array.isArray(u)?O=!0:(L=u,fe=U(y))}catch{f===Le&&(O=!0)}finally{f===Le&&(J=!1,ve())}}function Q(){if(q=!q,q&&d&&fe!==U(d)){L=null,C(d);return}ve()}function Z(){if(!a||!d)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,k)=>(k.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[]}))}function de(){if(!a||!d)return null;let y=a.get();return Nt(y&&y.attempts||{},d)}let se=new Set;function Ee(y){se.has(y)?se.delete(y):se.add(y),ve()}function Ye(y){let f=a?a.get():null,u=f&&f.attempts?f.attempts[y]:null;H.open({attempt_id:y,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}async function st(y){if(!s||!y)return;let f=()=>{let pe=a?a.get():null;return pe&&typeof pe.revision=="number"?pe.revision:0},u=async(pe={})=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:f(),...pe}),k=pe=>{pe?.queue&&a?.set&&a.set(pe.queue)},W=await u();if(k(W),W&&W.conflict){let pe=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:f();W=await s("worker-attempt-resume",{attempt_id:y,expected_revision:pe}),k(W)}W=await rr(W,(pe,Me)=>u({continuation:pe,decision_token:Me}),{onResult:k,refresh:()=>u()}),W&&W.resumed===!1&&!W.conflict&&W.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${W.reason}`,"error",2400)}let ft={onOpen:Ye,onResume:st,onToggleUsage:Ee};function tt(){let y=a?a.get():null,f={...F};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let k=y&&y[u];typeof k=="string"&&(f[u]=k)}return f}async function R(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));F=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{F={}}ve()}}function V(){let y=a?a.get():null;return y&&y.runner_catalog||null}function ie(){let y=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},u=(Object.hasOwn(g,"orchestration_model")?g.orchestration_model:void 0)||(typeof y.orchestration_model=="string"?y.orchestration_model:"")||(typeof tt().orchestration_model=="string"?tt().orchestration_model:"")||"opus";return Ao(V(),u)}function Pe(){let y=c?c.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function Ce(y){return y?.compatible===!1}function Fe(y){c&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&c.set({revision:y.revision,presets:y.presets})}async function ot(){let y=Pe(),f=y?.presets.find(u=>u.id===h);if(!(!s||!d||!y||!f||Ce(f)||E)){E=!0,ve();try{let u=await Promise.resolve(s("apply-impl-preset",gl(d,f.id,y.revision)));if(u&&u.conflict){Fe(u),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let k=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&k&&typeof k=="object"){_=k;for(let W of yl)delete g[W];re("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}u&&u.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,ve()}}}let at=null;r&&r.subscribe&&(at=r.subscribe(()=>xt()));let wt=null;a&&typeof a.subscribe=="function"&&(wt=a.subscribe(()=>{d&&ve()}));let gt=null;c&&typeof c.subscribe=="function"&&(gt=c.subscribe(()=>{d&&ve()}));function ct(y){y.key==="Escape"&&d&&(y.preventDefault(),n())}document.addEventListener("keydown",ct);function xt(){if(d){if(r&&typeof r.snapshotFor=="function"){let y=r.snapshotFor("detail:"+d)||[];_=y.find(u=>u&&u.id===d)||y[0]||_}Ne(),ve()}}function dt(y){Rr(y).then(f=>{f?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function it(y){y.preventDefault(),y.stopPropagation(),d&&dt(d)}function De(y,f){y.preventDefault(),y.stopPropagation(),dt(f)}function z(y,f,u){y.preventDefault(),y.stopPropagation(),$.open(f,{missing_state:u})}function K(y,f){g[y]=f,ve(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ml(d,y,f.length===0?null:f))).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function _e(y,f){let u=_||{},k=u.metadata&&typeof u.metadata=="object"?u.metadata:{},W={};for(let Se of["impl_runtime","impl_model","impl_effort"])W[Se]=Object.hasOwn(g,Se)?g[Se]:typeof k[Se]=="string"?k[Se]:"";W[y]=f;let pe=kl(W,V(),ie()),Me={};for(let Se of["impl_runtime","impl_model","impl_effort"])Me[Se]=g[Se],g[Se]=pe[Se]||"";ve(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...pe,orchestration_runtime:ie()})).then(Se=>{let $t=Array.isArray(Se)?Se[0]:Se;if(!$t||typeof $t!="object"||!$t.id)throw new Error("implementation target readback failed");_=$t;for(let vr of["impl_runtime","impl_model","impl_effort"])delete g[vr];ve()}).catch(()=>{for(let Se of["impl_runtime","impl_model","impl_effort"])Me[Se]===void 0?delete g[Se]:g[Se]=Me[Se];ve(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ue(y,f,u){if(!s||!d)return!1;try{let k=await Promise.resolve(s(y,f)),W=Array.isArray(k)?k[0]:k;return W&&typeof W=="object"&&W.id?(_=W,!0):(re(u,"error"),!1)}catch{return re(u,"error"),!1}}function ke(y){setTimeout(()=>{try{let f=e.querySelector(y);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function Oe(){B=!0,S=_&&_.title||"",ve(),ke('.detail-edit__input[data-edit="title"]')}function Xe(y){S=y.target.value}function Qe(){B=!1,S="",ve()}function Re(){ue("edit-text",{id:d,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(B=!1,S=""),ve()})}function Je(){A=!0,M=_&&_.description||"",ve(),ke('.detail-edit__textarea[data-edit="description"]')}function xe(y){M=y.target.value}function mt(){A=!1,M="",ve()}function St(){ue("edit-text",{id:d,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(A=!1,M=""),ve()})}function Dt(y,f,u,k){if(y.key==="Escape"){y.stopPropagation(),u();return}y.key==="Enter"&&(!k||y.ctrlKey||y.metaKey)&&(y.preventDefault(),f())}function Ut(y){let f=y.target.value;ue("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function yr(y){let f=Number(y.target.value);ue("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function ht(y){I=y.target.value}function kt(){let y=I.trim();y.length!==0&&ue("label-add",{id:d,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(I=""),ve()})}function er(y){if(y.key==="Escape"){y.stopPropagation(),I="",ve();return}y.key==="Enter"&&(y.preventDefault(),kt())}function p(y){ue("label-remove",{id:d,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ve())}let v={onCopyPath:De,onOpenDoc:z};function N(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function te(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function le(y){let u=(Array.isArray(y.dependencies)?y.dependencies:[]).map(k=>({id:N(k),icon:te(k)})).filter(k=>k.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${u.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${u.map(k=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(k.id)}
                  >
                    ${k.icon?`${k.icon} `:""}${k.id}
                  </button>`:i`<span class="detail-dep"
                    >${k.icon?`${k.icon} `:""}${k.id}</span
                  >`)}
          </div>`}
    `}function ye(y){let f=y.metadata||{},u=y.workflow||{},k=u.stages||{},W=k.spec&&k.spec.stale,pe=k.impl&&k.impl.stale,Me=k.plan||null,Se=u.route_source==="derived",$t=u.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Se?" detail-kv__v--derived":""}"
          title=${Se?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Se?"unset":$t}</span
        >
      </div>
      ${u.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${W?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Me?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Me?.approval_receipt||"\uC5C6\uC74C"}${Me?.approval_state==="stale"?" \xB7 stale":Me?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${pe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${u.exec_receipt.kind}:${u.exec_receipt.actor}@${u.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${u.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${u.impl_entry.actor}@${u.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let we={route:["quick_fix","spec_backed","full_plan"]};async function Ke(y,f){let u=f.target.value;if(y==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ve();return}await ue("update-workflow-meta",{id:d,key:y,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ve()}function Ve(y){let f=y.metadata||{};return i` ${((k,W)=>{let pe=we[k],Me=typeof f[k]=="string"?f[k]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${k}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${k}
          data-edit=${`wfmeta-${k}`}
          @change=${Se=>Ke(k,Se)}
        >
          <option value="" ?selected=${!pe.includes(Me)}>
            ${W}
          </option>
          ${pe.map(Se=>i`<option value=${Se} ?selected=${Me===Se}>${Se}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ce(y,f){return B?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${Xe}
            @keydown=${u=>Dt(u,Re,Qe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Re}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Qe}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${vt(f).map(u=>i`<span class="detail-usage-total" title=${u.tooltip}
              >${u.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Oe}
        >
          ✎
        </button>
      </div>
    `}function b(y){let f=bt(y.created_at),u=bt(y.updated_at);return!f&&!u?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${u?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${u}</span>
          </div>`:""}
    `}function G(y,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ut}
        >
          ${lf.map(u=>i`<option value=${u} ?selected=${u===y}>${u}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${yr}
        >
          ${cf.map(u=>i`<option value=${String(u)} ?selected=${u===f}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function oe(y){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${A?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Je}
            >
              ✎
            </button>`}
      </div>
      ${A?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${M}
              @input=${xe}
              @keydown=${f=>Dt(f,St,mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${St}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${mt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ze(y){let f=typeof y.notes=="string"?y.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function nt(y){let f=Array.isArray(y.labels)?y.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(u=>i`<span class="detail-label-chip"
              >${u}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${u}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+u}
                @click=${()=>p(u)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${ht}
            @keydown=${er}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${kt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ue(){if(!d)return i``;let y=_||{},f=String(y.id||d),u=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",k=de(),W=y.status||"open",pe=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",Me=y.description||"",Se={...y,metadata:{...y.metadata||{},...g}};return i`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>n()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${it}
          >
            ${f}
          </button>
          ${ce(u,k)}
          ${bl(Se)}
          ${hl({metadata:Se.metadata,workspace_values:tt(),catalog:V(),expanded:x,presets:Pe()?.presets||[],preset_id:h,preset_busy:E},{onToggle:()=>{x=!x,ve()},onEdit:($t,vr)=>{if($t==="impl_runtime"||$t==="impl_model"||$t==="impl_effort"){_e($t,vr??"");return}K($t,vr??"")},onPresetSelect:$t=>{h=$t,ve()},onPresetApply:()=>{ot()}})}
          ${G(W,pe)} ${b(y)}
          ${oe(Me)}
          ${sl(j,$e,{expanded:Ie,draft:ne,sending:ae,error:ge})}
          ${ze(y)} ${nt(y)} ${le(y)}
          ${ye(y)} ${Ve(y)}
          ${tl(y,v)}
          ${Cl({expanded:q,loading:J,error:O,data:L},{onToggle:Q})}
          ${El(Z(),ft,{total:k,expanded:se})}
        </div>
      </div>
    `}function ve(){je(Ue(),e)}return{load(y){y!==d&&(g={},h="",x=!1,T(),Ae(),P()),d=y,_=null,xt(),R()},clear(){d=null,_=null,g={},h="",E=!1,T(),Ae(),P(),$.close(),H.close(),je(i``,e)},destroy(){at&&(at(),at=null),wt&&(wt(),wt=null),gt&&(gt(),gt=null),document.removeEventListener("keydown",ct),$.destroy(),be.parentNode&&be.parentNode.removeChild(be),H.destroy(),w.parentNode&&w.parentNode.removeChild(w),d=null,_=null,h="",E=!1,Ae(),P(),je(i``,e)}}}function Il(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
    <div class="fatal-error">
      <div class="fatal-error__icon" aria-hidden="true">!</div>
      <div class="fatal-error__body">
        <p class="fatal-error__eyebrow">Critical</p>
        <h2 class="fatal-error__title" id="fatal-error-title">Command failed</h2>
        <p class="fatal-error__message" id="fatal-error-message"></p>
        <pre class="fatal-error__detail" id="fatal-error-detail"></pre>
        <div class="fatal-error__actions">
          <button type="button" class="btn primary" id="fatal-error-reload">Reload</button>
          <button type="button" class="btn" id="fatal-error-close">Dismiss</button>
        </div>
      </div>
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,_,g="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:l,close:c,getElement(){return t}}}function ws(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function To(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function ks(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function df(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:ws(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ll(e,t){let r=df(e,t);return r?i`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?i`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?bt(r.deploy.at):""}
            >${ks(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${To(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function uf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function yn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function $s(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Jt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,g)=>(_.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,l=s?uf(s.phase):null,d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:c,confirmation:d}}function cr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?i`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?i`<code>백업: ${n}</code>`:t.error?i`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?i`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?i`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function Eo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=vt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!a,l=c?Ot(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=i`<span class="worker-mini__title">${e.title}</span>`,F=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",B=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",A=r.map(he=>he===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${he}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${he===e.completion_badge&&e.completion_title||""}
          >${he}</span
        >`),S=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",M=n.length>0?n.map(he=>i`<span class="worker-usage" title=${he.tooltip}
              >${he.label}</span
            >`):s?i`<span class="worker-usage" title=${zr(e.usage)}
            >${s}</span
          >`:"",I=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",T=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Y=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",X=e.discard,ge=X?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${X?.attempt_id||""}
          data-operation-id=${X?.operation?.operation_id||""}
          data-discard-mode=${X?.confirmation||"unmerged"}
          ?disabled=${X?!X.enabled:e.discard_enabled===!1}
          title=${X?X.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${X?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.revise_action?i`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title=${e.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",ae=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||X?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${h}${E}${x}</div>
          <div class="worker-mini__row2">
            ${M}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${A}${I}
            <span class="worker-mini__actions"
              >${T}${j}${Y}${ge}</span
            >
            ${Yr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${h}${E}${F}${B}${A}${g}${S}
            </div>
            <div class="worker-mini__body">${x}</div>
            ${ae?i`<div class="worker-mini__foot">
                  ${M}${I}
                  <span class="worker-mini__actions"
                    >${T}${j}${Y}${ge}${ne}</span
                  >
                  ${cr(e)}
                </div>`:""}
            ${Yr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${h}${E}${x}${F}${B}${A}${g}${S}${M}${I}${T}${j}${Y}${ge}
            </div>
            ${cr(e)} ${Yr(e)}`}
  </div>`}function pf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?i`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Gn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${c?" worker-card__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${e.id}
        ?disabled=${!t}
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Yr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?i`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return i`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?i`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:i`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":i`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?i`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?pf(n):Eo(n))}
          </div>`}
  </section>`}var Ol=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],vn=Ol.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Co(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=Ol.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Dl(e){let t=vn.findIndex(r=>r.step===e);return vn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=vn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function ff(e){let t=vn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:vn.length}}function xs(e){let t=ff(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ml={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Pl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function Nl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ro(e){for(let t of Nl(e))if(Object.hasOwn(Ml,t))return Ml[t];return null}function Io(e){let t=null;for(let r of Nl(e))Object.hasOwn(Pl,r)&&(t=Pl[r]);return t}function Ss(e){let t=Ro(e),r=Io(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Fl(e,t){let r=Ro(e)??Ro(t),n=Io(t)??Io(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var ql=160;function _f(e){return e.length>ql?`${e.slice(0,ql)}\u2026`:e}function mf(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${_f(e.command)}</code>`:""}
  </div>`}function gf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Lo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bl(e){let t=e.failure?Ss(e.failure.reason):"";return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?i`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${e.failure.bead_id}
                data-attempt-id=${e.failure.resume_attempt_id||""}
                data-operation-id=${e.failure.discard.operation?.operation_id||""}
                data-confirmation=${e.failure.discard.confirmation}
                ?disabled=${!e.failure.discard.enabled}
                title=${e.failure.discard.title}
              >
                ${e.failure.discard.label}
              </button>`:""}
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${mf(e.failure.cause_detail)}
          ${gf(e.failure.reason)}
          ${cr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function hf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Lo(t-e.started_at):"\u2014",a=Qt(e),c=fr(e),l=vt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,g=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?i`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${E}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?i`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:i`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||d||_||g?i`<div class="rtile__meta">
          ${_?i`<span class="worker-mini__badge">${_}</span>`:""}
          ${g?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${g}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(x=>i`<span class="worker-usage" title=${x.tooltip}
                    >${x.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${zr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Yr(e)} ${cr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Oo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>hf(s,t,r))}
  </div>`}function Mr(e){return i`<svg
    class="mon-i"
    viewBox="0 0 16 16"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${e}
  </svg>`}function Do(){return Mr(dr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Mo(){return Mr(dr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ul(){return Mr(dr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function jl(){return Mr(dr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Wl(){return Mr(dr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function zl(){return Mr(dr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Hl(){return Mr(dr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var wn=1,bf=6e4,yf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},vf=new Set(["auto_merge","merged","merge","done"]),Gl={running:3,paused:2,failed:1};function wf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function kf(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let g=t.get(a.bead_id),h=typeof g=="number"&&g>0&&typeof a.finished_at=="number"&&g>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let g=Gl[d.run_state],h=Gl[c];if(g>h||g===h&&(d.started_at??0)>(l??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Nt(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function Vl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Bt(e){return e&&typeof e=="object"?e:{}}function Po(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let c=[],l=[],d=[],_=[],g=[],h=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let S=A.root_dir,M=A.name||S,I=a.get(S),T=I&&typeof I.revision=="number"?I.revision:typeof A.revision=="number"?A.revision:0,j=Bt(A.attempts),Y=Bt(A.bead_titles),X=Bt(A.pr_observations),ge=Bt(A.admission),ne=Bt(A.revise_parked),ae=Bt(A.merge_queue_state),he=Bt(A.cleanup_failed),Ie=Bt(A.discard_operations),Ae=Array.isArray(A.merge_queue)?A.merge_queue:[],We=new Set(Ae.filter($=>$&&typeof $.bead_id=="string").map($=>$.bead_id)),Ne=new Map(Ae.filter($=>$&&typeof $.bead_id=="string").map($=>[$.bead_id,$])),Ge=Array.isArray(A.queue)?A.queue:[],Te=Array.isArray(A.done)?A.done:[],me=new Map;for(let $ of Te)$&&typeof $.bead_id=="string"&&typeof $.added_at=="number"&&me.set($.bead_id,$.added_at);let $e=$=>({id:$,title:Y[$]||$,root_dir:S,workspace_name:M,expected_revision:T,draggable:!1}),be=new Set;for(let[$,w]of kf(j,me))be.add($),l.push({...$e($),lane:"running",attempt_id:w.attempt_id,run_state:w.run_state,can_pause:w.can_pause,can_resume:w.can_resume,started_at:w.started_at,last_event_at:w.last_event_at,runner:w.runner,model:w.model,effort:w.effort,speed:w.speed,resumed_from:w.resumed_from,continuation_mode:w.continuation_mode,usage:w.usage,discard:Jt(Ie,$,{attempt_id:w.attempt_id}),badges:w.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:w.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:w.run_state==="failed"});for(let $ of Array.isArray(A.pr_wait)?A.pr_wait:[]){let w=$&&$.bead_id;if(typeof w!="string"||be.has(w))continue;be.add(w);let H=Bt(X[w]),q=Bt(H.pr),J=H.gate?Bt(H.gate):null,O=We.has(w),L=Ne.get(w)?.continuation_action||null,fe=!!L&&L.continuation===null,Le=ae.active===w,U=$.external===!0,P=he[w]||null,C=!!J&&J.base_badge==="\uCDA9\uB3CC",Q=!!P&&["child_sweep","branch_cleanup","parent_close"].includes(P.step)&&!!J&&J.tier==="merged",Z=U&&!!P&&!!J&&J.tier==="merged",de=!!J&&["closed_unmerged","review","undecidable"].includes(J.tier),se=Jt(Ie,w,{external:U,merge_active:Le,merge_queued:O,merged:!!P||J?.tier==="merged"}),Ee=!!se.operation;d.push({...$e(w),lane:"pr_wait",pr_number:typeof q.number=="number"?q.number:null,pr_url:typeof q.url=="string"?q.url:void 0,external:U,usage:Nt(j,w),badges:fe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:P?[Dr(P.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(P.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof J?.gate_badge=="string"&&J.gate_badge.length>0?[J.gate_badge]:[],alert:!!P||de,reason:P?xs(P.step):"PR \uB300\uAE30",merge_action:!O||fe,merge_enabled:!Ee&&(fe||J?.enabled===!0||C||Q||Z),merge_label:fe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Z||Q?"\uC815\uB9AC \uC7AC\uAC1C":C&&!Q?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:fe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Q?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":J?.enabled===!0?`\uBA38\uC9C0 (${J.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${J?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:O&&!fe,cancel_enabled:!Le,continuation_mismatch:L?.mismatch||null,discard:se,discard_action:se.action,discard_enabled:se.enabled,discard_title:se.title})}for(let $=0;$<Ge.length;$++){let w=Ge[$],H=w&&w.bead_id;if(typeof H!="string"||be.has(H))continue;be.add(H);let q=ne[H],J=Jt(Ie,H),O=J.operation?J:null,L={...$e(H),lane:"queue",draggable:!O,discard:O||void 0,reason:Vl(ge,H),queue_position:$+1,queue_index:$,queue_length:Ge.length,badges:q?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!q,revise_action:!!q,revise_enabled:!!q&&!O,revise_title:q?q.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${q.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(L);let fe=h.get(S);fe?fe.push(L):h.set(S,[L])}for(let $ of Array.isArray(A.runnable)?A.runnable:[]){let w=$&&$.bead_id;typeof w!="string"||be.has(w)||(be.add(w),c.push({...$e(w),title:$.title||Y[w]||w,lane:"runnable",draggable:!0,reason:Vl(ge,w),created_at:$.created_at??void 0,updated_at:$.updated_at??void 0,labels:Array.isArray($.labels)?$.labels:[],spec_reviewer:typeof $.spec_reviewer=="string"?$.spec_reviewer:void 0,plan_state:$.plan_state==="approved"||$.plan_state==="authored"?$.plan_state:"none",workflow:$.route?{route:$.route,chips:{route:$.route}}:null,place_index:Ge.length}))}for(let $ of Te){let w=$&&$.bead_id;if(typeof w!="string"||be.has(w)||(be.add(w),o!==void 0&&typeof $.added_at=="number"&&$.added_at<o))continue;let H=wf(j,w);g.push({...$e(w),lane:"done",done:!0,usage:Nt(j,w),done_at:typeof $.added_at=="number"?$.added_at:void 0,done_kind:H&&typeof H.done_kind=="string"?H.done_kind:null})}}let E=new Map;s.forEach((A,S)=>{A&&typeof A.root_dir=="string"&&E.set(A.root_dir,S)});let x=r&&r.running_sort==="repo"?"repo":"started";l.sort((A,S)=>{if(x==="repo"){let T=E.get(A.root_dir)??Number.MAX_SAFE_INTEGER,j=E.get(S.root_dir)??Number.MAX_SAFE_INTEGER;if(T!==j)return T-j}let M=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,I=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null;return M!==null&&I!==null&&M!==I?M-I:M===null&&I!==null?1:M!==null&&I===null?-1:A.id.localeCompare(S.id)}),g.sort((A,S)=>(S.done_at??0)-(A.done_at??0));let F=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),B=[];for(let A of F)!A||typeof A.root_dir!="string"||B.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=wn?A.slots:wn,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Bt(A.runner_catalog),items:h.get(A.root_dir)||[]});return{runnable:c,queue:_,queue_groups:B,running:l,pr_wait:d,done:g,automation:{total:B.length,both_on:B.filter(A=>A.auto_advance&&A.auto_merge).length}}}function $f(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<bf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Ot(e,t)}</span
        >`}</span
  >`}function kn(e){return i`<div class="mon-c__title">${e.title}</div>`}function $n(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function As(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function No(e){let t=vt(e.usage),r=zt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${zr(e.usage)}
        >${r}</span
      >`:""}function Fo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function xf(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Mo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Do()}
        </button>`}
    ${e.discard?.action?i`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?i`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${jl()}
        </button>`:""}
  </span>`}function Sf(e,t){let r=typeof e.started_at=="number"?Lo(t-e.started_at):"";return i`${kn(e)}
    <div class="mon-c__meta">
      ${Fo(e)}${$f(e.last_event_at,t)}${$n(e)}${As(e)}
      ${Qt(e)?i`<span class="mon-c__model">${Qt(e)}</span>`:""}
      ${fr(e)?i`<span
            class="rtile__resumed"
            title=${fr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${No(e)}${xf(e)}${cr(e)}
    </div>`}function Af(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=Ot(e.updated_at);return i`${kn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${$n(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Hn(e.labels,null).map(l=>i`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${As(e)}
      ${c?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="worker-card__place"
          data-bead-id=${e.id}
          title="대기 큐 맨 뒤에 추가"
        >
          대기로 ↴
        </button>
      </span>
    </div>`}function Tf(e){let t=!!e.discard?.operation;return i`${kn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${$n(e)}
      ${Fo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?i`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${cr(e)}
    ${e.revise_action?i`<div class="mon-c__tail">
          <button
            type="button"
            class="worker-mini__revise-fix"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title=${e.revise_title||""}
          >
            finding 수용·수정
          </button>
          <button
            type="button"
            class="worker-mini__revise-approve"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
          >
            승인하고 진행
          </button>
        </div>`:""}`}function Ef(e){let t=!!(zt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${kn(e)}
    <div class="mon-c__meta">
      ${$n(e)}${As(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Fo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${No(e)}
          ${e.merge_action?i`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?i`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?i`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${cr(e)}
        </div>`:""}`}function Cf(e,t){let r=e.done_kind||"",n=r?yf[r]||r:"",s=Ot(e.done_at,t);return i`${kn(e)}
    <div class="mon-c__meta">
      ${$n(e)}${As(e)}
      ${n?i`<span
            class="mon-live__kind${vf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${No(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Yl(e,t){return e.lane==="running"?Sf(e,t):e.lane==="runnable"?Af(e):e.lane==="queue"?Tf(e):e.lane==="pr_wait"?Ef(e):Cf(e,t)}function Kl(e){let t=String(e.revision);return i`<header
    class="mon-group__hd${e.items.length===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${e.items.length}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?Mo():Do()}
        <span class="mon-ctl__label">자동화</span>
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${e.auto_merge?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_merge?"false":"true"}
        aria-pressed=${e.auto_merge?"true":"false"}
        title=${e.auto_merge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB044\uACE0 \uC774 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uC744 \uBE44\uC6C1\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4"}
      >
        ${Wl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${zl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${wn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Zl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Xt.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ul():Hl()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${e.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${e.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${e.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${e.done_range}
      >
        ${Xt.map(c=>i`<option
              value=${c.value}
              ?selected=${e.done_range===c.value}
            >
              ${c.label}
            </option>`)}
      </select>
      ${a.map(c=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${c.tooltip}
            >${o} 완료 · 누적 ${c.label}</span
          >`)}
    </div>
  </div>`}function Xl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ql(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return vt(Kn(t));let r={};for(let c of nr)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let l=c&&c.usage;if(l&&typeof l=="object"){let d=!1;for(let _ of nr){let g=l[_];typeof g=="number"&&Number.isFinite(g)&&(r[_]+=g,n=!0,d=!0)}if(d){o+=1;let _=l.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var ec="bdui.monitor.done-range",tc="bdui.monitor.running_sort";function Rf(){try{let e=window.localStorage.getItem(ec);return Pt(e)?e:Lt}catch{return Lt}}function If(e){try{window.localStorage.setItem(ec,e)}catch{}}function Lf(){try{return window.localStorage.getItem(tc)==="repo"?"repo":"started"}catch{return"started"}}function Of(e){try{window.localStorage.setItem(tc,e)}catch{}}var rc="tab:monitor:pipeline",Df=1e3,Mf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Jl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${r?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${Yl(e,t)}
  </div>`}function nc(e,t){let r=lt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(U=>typeof globalThis.confirm!="function"||globalThis.confirm(U)),_=Rf(),g=Lf();function h(){let U=Xt.find(P=>P.value===_);return U?U.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let x=Po(null,null),F=new Map,B=null,A=null;async function S(U,P,C,Q,Z=!0){if(!o||!C)return null;let de=await o(U,{...P,root_dir:C,expected_revision:Q});if(de&&de.conflict&&Z){de.queue&&F.set(C,de.queue);let se=de.queue&&typeof de.queue.revision=="number"?de.queue.revision:Q;de=await o(U,{...P,root_dir:C,expected_revision:se})}return de&&de.queue&&C&&F.set(C,de.queue),de}function M(U,P){let C=F.get(U),Q=s&&s.get?s.get():null,Z=(Array.isArray(Q)?Q:[]).find(se=>se?.root_dir===U);return(C||Z)?.merge_queue?.find(se=>se.bead_id===P)?.continuation_action}async function I(U,P,C,Q){let Z=await S(U,P,C,Q),de=F.get(C)?.revision??Z?.queue?.revision??Q;return rr(Z,(se,Ee)=>S(U,{...P,continuation:se,decision_token:Ee},C,de,!1),{refresh:se=>S(U,P,C,se?.queue?.revision??F.get(C)?.revision??de,!1)})}async function T(U,P,C,Q){let Z=await rr({continuation_mismatch:Q},(se,Ee)=>S("worker-merge-queue-add",{bead_id:P,continuation:se,decision_token:Ee},U,C,!1)),de=Z?.queue?.merge_queue?.find(se=>se.bead_id===P)?.continuation_action;Z?.applied!==!0&&de?.continuation===null&&de.mismatch&&await T(U,P,Z.queue.revision,de.mismatch)}async function j(U,P,C){let Q=await S("worker-discard",U,P,C);if(Q&&Q.discarded===!0){re($s(Q),"success",5e3);return}if(Q&&Q.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){re(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Y(U,P,C){return!o||!C?null:await o(U,{...P,root_dir:C})}async function X(U){if(!o||!U&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let P=await o("monitor-auto-toggle",{on:U}),C=P&&Array.isArray(P.failed)?P.failed:[];C.length>0&&re(`\uC790\uB3D9\uD654 ${U?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${C.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function ge(){let U=new Map;for(let P of x.pr_wait)U.has(P.root_dir)||U.set(P.root_dir,P.expected_revision);for(let[P,C]of U)await S("worker-merge-queue-add-all",{},P,C)}let ne=null,ae=!1,he=null;function Ie(){he!==null&&clearTimeout(he),he=setTimeout(()=>{he=null,ae=!1},0)}function Ae(U){let P=U.target;return typeof P?.closest=="function"?P.closest(".mon-group"):null}function We(U){let P=Ae(U);return!P||!ne?null:(P.getAttribute("data-root-dir")||"")===ne.root_dir?P:null}function Ne(){for(let U of Array.from(E.querySelectorAll(".mon-group--drag-over")))U.classList.remove("mon-group--drag-over")}function Ge(U){let P=U.target,C=typeof P?.closest=="function"?P.closest('.mon-card[draggable="true"]'):null;if(C){ne={bead_id:C.getAttribute("data-issue-id")||"",lane:C.getAttribute("data-lane")||"",root_dir:C.getAttribute("data-root-dir")||"",revision:Number(C.getAttribute("data-revision")||0)||0,queue_index:Number(C.getAttribute("data-queue-index")),queue_length:Number(C.getAttribute("data-queue-length")),place_index:Number(C.getAttribute("data-place-index"))},ae=!0;try{U.dataTransfer?.setData("text/plain",ne.bead_id),U.dataTransfer&&(U.dataTransfer.effectAllowed="move")}catch{}}}function Te(U){let P=We(U);P&&(U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move"),P.classList.add("mon-group--drag-over"))}function me(U){Ae(U)?.classList.remove("mon-group--drag-over")}function $e(){ne=null,Ne(),Ie()}function be(U){let P=We(U),C=ne;if(ne=null,Ne(),!P||!C||!C.bead_id)return;U.preventDefault();let Q=U.target,Z=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,de=Z&&P.contains(Z)?Number(Z.getAttribute("data-queue-index")):NaN;if(C.lane==="runnable"){let Ye=Number.isFinite(de)?de:C.place_index;if(!Number.isFinite(Ye))return;S("worker-queue-place",{bead_id:C.bead_id,index:Ye},C.root_dir,C.revision);return}if(C.lane!=="queue"||Z&&Z.getAttribute("data-issue-id")===C.bead_id)return;let se=C.queue_index,Ee=Number.isFinite(de)?se>de?de:de-1:C.queue_length-1;!Number.isFinite(Ee)||Ee<0||Ee===se||S("worker-queue-reorder",{bead_id:C.bead_id,to_index:Ee},C.root_dir,C.revision)}function $(U){let P={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return i`${Zl({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},running_sort:g,done_range:_,token_total:Ql(x.done),token_tooltip:Xl(h())})}
      <div class="worker-lanes mon-lanes">
        ${Mf.map(C=>{let Q=P[C.lane],Z=C.lane==="queue"?x.queue_groups.length>0?i`${x.queue_groups.map(de=>i`<div
                        class="mon-group"
                        data-root-dir=${de.root_dir}
                      >
                        ${Kl(de)}
                        <div class="mon-group__list">
                          ${de.items.map(se=>Jl(se,U))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?i`${Q.map(de=>Jl(de,U))}`:void 0;return Yt({id:`monitor-${C.lane}`,lane:C.pane,title:C.lane==="done"?`\uC644\uB8CC\xB7${h()}`:C.title,items:Q,empty:C.empty,body:Z,live:C.lane==="running"&&Q.length>0,header_control:C.lane==="pr_wait"&&Q.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function w(){let U=s&&s.get?s.get():null,P=s&&s.getWorkspacesState?s.getWorkspacesState():[],C=l();x=Po(U,P,{done_since:Ar(_,C),running_sort:g}),je($(C),E)}function H(U,P){let C=a?a():void 0;if(!P||!C||P===C||!c){n(U);return}c(P).then(()=>{n(U)}).catch(Q=>{r("workspace switch for %s failed: %o",P,Q)})}function q(U){return{root_dir:U.getAttribute("data-root-dir")||"",revision:Number(U.getAttribute("data-revision")||0)||0}}function J(U,P){let{root_dir:C,revision:Q}=q(U),Z=U.getAttribute("data-issue-id")||"",de=P.dataset.attemptId||U.getAttribute("data-attempt-id")||"",se=P.classList;if(se.contains("worker-card__place")){S("worker-queue-place",{bead_id:Z,index:Number(U.getAttribute("data-place-index")||0)||0},C,Q);return}if(se.contains("mon-op--up")||se.contains("mon-op--down")){let Ee=Number(U.getAttribute("data-queue-index")||0)||0,Ye=se.contains("mon-op--up")?Ee-1:Ee+1;if(Ye<0)return;S("worker-queue-reorder",{bead_id:Z,to_index:Ye},C,Q);return}if(se.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:Z},C,Q);return}if(se.contains("mon-op--pause")){Y("worker-attempt-pause",{attempt_id:de},C);return}if(se.contains("mon-op--discard")){if(!d(yn(Z,"unmerged")))return;j({bead_id:Z,...de?{attempt_id:de}:{},...P.dataset.operationId?{operation_id:P.dataset.operationId}:{}},C,Q);return}if(se.contains("mon-op--resume")){I("worker-attempt-resume",{attempt_id:de},C,Q);return}if(se.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:de},C,Q);return}if(se.contains("worker-mini__merge")){let Ee=M(C,Z);Ee?.mismatch&&Ee.continuation===null?T(C,Z,Q,Ee.mismatch):S("worker-merge-queue-add",{bead_id:Z},C,Q);return}if(se.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:Z},C,Q);return}if(se.contains("worker-mini__discard")){let Ee=P.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(yn(Z,Ee)))return;j({bead_id:Z,...de?{attempt_id:de}:{},...P.dataset.operationId?{operation_id:P.dataset.operationId}:{}},C,Q);return}if(se.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:Z},C,Q);return}se.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:Z},C,Q)}function O(U){let P=ae;ae=!1;let C=U.target;if(!C||typeof C.closest!="function"||C.closest("dialog")||C.closest("a"))return;let Q=C.closest(".mon-running-sort");if(Q){U.preventDefault(),g=Q.getAttribute("data-sort")==="repo"?"repo":"started",Of(g),w();return}let Z=C.closest(".mon-auto-all");if(Z){U.preventDefault(),X(Z.getAttribute("data-on")==="true");return}if(C.closest(".mon-merge-all")){U.preventDefault(),ge();return}let se=C.closest(".mon-ctl--advance");if(se){U.preventDefault();let{root_dir:tt,revision:R}=q(se);S("worker-automation-toggle",{on:se.getAttribute("data-on")==="true"},tt,R);return}let Ee=C.closest(".mon-ctl--merge-auto");if(Ee){U.preventDefault();let{root_dir:tt,revision:R}=q(Ee);S("worker-merge-auto-toggle",{on:Ee.getAttribute("data-on")==="true"},tt,R);return}let Ye=C.closest(".mon-card");if(!Ye)return;let st=C.closest("button");if(st){U.preventDefault(),J(Ye,st);return}let ft=Ye.getAttribute("data-issue-id");ft&&!P&&(U.preventDefault(),H(ft,Ye.getAttribute("data-root-dir")||""))}function L(U){let P=U.target;if(!P||typeof P.closest!="function")return;let C=P.closest(".mon-done-range");if(C){_=Pt(C.value)?C.value:Lt,If(_),w();return}let Q=P.closest(".mon-slots__input");if(!Q)return;let{root_dir:Z,revision:de}=q(Q),se=Number(Q.value);if(!Number.isFinite(se))return;let Ee=Math.max(wn,Math.floor(se));S("worker-queue-set-slots",{slots:Ee},Z,de)}e.addEventListener("click",O),e.addEventListener("change",L),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",Te),e.addEventListener("dragleave",me),e.addEventListener("drop",be),e.addEventListener("dragend",$e),s&&typeof s.subscribe=="function"&&(B=s.subscribe(()=>{try{F.clear(),w()}catch{}}));function fe(){A!==null&&(clearInterval(A),A=null)}function Le(){he!==null&&(clearTimeout(he),he=null)}return{load(){r("load"),w(),A===null&&(A=setInterval(()=>{try{w()}catch{}},Df))},pause(){fe()},clear(){fe(),Le(),B&&(B(),B=null),e.removeEventListener("click",O),e.removeEventListener("change",L),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",Te),e.removeEventListener("dragleave",me),e.removeEventListener("drop",be),e.removeEventListener("dragend",$e),e.replaceChildren()}}}function sc(e,t,r){let n=lt("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function c(){je(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var oc=["bug","feature","task","epic","chore"];function ac(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ic=["Critical","High","Medium","Low","Backlog"];function lc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
    <div class="new-issue__container" part="container">
      <header class="new-issue__header">
        <div class="new-issue__title">New Issue</div>
        <button type="button" class="new-issue__close" aria-label="Close">\xD7</button>
      </header>
      <div class="new-issue__body">
        <form id="new-issue-form" class="new-issue__form">
          <label for="new-title">Title</label>
          <input id="new-title" name="title" type="text" required placeholder="Short summary" />

          <label for="new-type">Type</label>
          <select id="new-type" name="type" aria-label="Issue type"></select>

          <label for="new-priority">Priority</label>
          <select id="new-priority" name="priority" aria-label="Priority"></select>

          <label for="new-labels">Labels</label>
          <input id="new-labels" name="labels" type="text" placeholder="comma,separated" />

          <label for="new-description">Description</label>
          <textarea id="new-description" name="description" rows="6" placeholder="Optional markdown description"></textarea>

          <div aria-live="polite" role="status" class="new-issue__error" id="new-issue-error"></div>

          <div class="new-issue__actions" style="grid-column: 1 / -1">
            <button type="button" id="btn-cancel">Cancel (Esc)</button>
            <button type="submit" id="btn-create">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let j of oc){let Y=document.createElement("option");Y.value=j,Y.textContent=ac(j),o.appendChild(Y)}a.replaceChildren();for(let j=0;j<=4;j+=1){let Y=document.createElement("option");Y.value=String(j);let X=ic[j]||"Medium";Y.textContent=`${j} \u2013 ${X}`,a.appendChild(Y)}}E();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function F(T){s.disabled=T,o.disabled=T,a.disabled=T,c.disabled=T,l.disabled=T,_.disabled=T,g.disabled=T,g.textContent=T?"Creating\u2026":"Create"}function B(){d.textContent=""}function A(T){d.textContent=T}function S(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{o.value="",a.value="2"}}function M(){let T=o.value||"",j=a.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function I(){B();let T=String(s.value||"").trim();if(T.length===0){A("Title is required"),s.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){A("Priority must be 0..4"),a.focus();return}let Y=String(o.value||""),X=String(l.value||""),ge={title:T};Y.length>0&&(ge.type=Y),String(j).length>0&&(ge.priority=j),X.length>0&&(ge.description=X),F(!0);try{await t("create-issue",ge)}catch{F(!1),A("Failed to create issue");return}M(),F(!1),x()}return r.addEventListener("cancel",T=>{T.preventDefault(),x()}),h.addEventListener("click",()=>x()),_.addEventListener("click",()=>x()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),I())}),n.addEventListener("submit",T=>{T.preventDefault(),I()}),{open(){n.reset(),B(),S();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var Pf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Nf(e,t){return Zs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function cc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Nf(n,e);return i`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function dc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
              >
                ×
              </button>
            </span>`)}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${t}
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function uc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Pf.map(([r,n])=>i`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var Ff=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function pc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(R=>re(R,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="session",l=!1,d="",_={},g={},h=[],E=!1,x=null,F={},B="",A="",S=!1,M=!1,I=!1,T=null;function j(){let R=t.queueStore?.get();return Zt(R)?R.runner_catalog:null}function Y(){let R=t.implPresetStore?.get();return Zt(R)&&Array.isArray(R.presets)?R:null}async function X(){E=!0,Z();try{let R=await r("get-session-defaults",{});_=Zt(R?.values)?{...R.values}:{},g={..._},h=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{E=!1,Z()}}async function ge(){let R=dl(_,g);if(Object.keys(R).length!==0){try{let V=await r("set-session-defaults",{values:R});_=Zt(V?.values)?{...V.values}:{},g={..._},h=Array.isArray(V?.warnings)?V.warnings:[]}catch(V){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Z()}}function ne(R,V){V===Kt?delete g[R]:g[R]=V,Z(),ge()}async function ae(){let R=t.queueStore?.get();if(!Zt(R))return;let V={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},ie=ul(V,{...V,...F});if(Object.keys(ie).length!==0){try{let Pe=await r("worker-queue-set-orchestration-defaults",{expected_revision:R.revision,values:ie});if(Pe&&Pe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}F={}}catch(Pe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Pe instanceof Error?Pe.message:String(Pe)}`)}Z()}}function he(R,V){F[R]=V===Kt?null:V,Z(),ae()}async function Ie(R){let V=t.queueStore?.get();if(!(!Zt(V)||R<1)){try{await r("worker-queue-set-slots",{expected_revision:V.revision,slots:R})}catch(ie){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}Z()}}function Ae(){let R={};for(let V of il){let ie=g[V];typeof ie=="string"&&ie.length>0&&(R[V]=ie)}return R}async function We(){let R=Y();if(!R)return;let V=Ae();if(Object.keys(V).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ie=(R.presets||[]).find(Ce=>Ce.id===B),Pe=A.trim()||(ie?ie.name:"");if(!Pe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ce=ie?await r("impl-preset-update",{expected_revision:R.revision,id:ie.id,name:Pe,settings:V}):await r("impl-preset-create",{expected_revision:R.revision,name:Pe,settings:V});if(Ce&&Ce.applied){if(A="",!ie&&Array.isArray(Ce.presets)){let Fe=Ce.presets.find(ot=>ot.name===Pe);B=Fe?Fe.id:B}Z()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z()}catch(Ce){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ce instanceof Error?Ce.message:String(Ce)}`)}}async function Ne(){let R=Y();if(!(!R||B.length===0))try{let V=await r("impl-preset-delete",{expected_revision:R.revision,id:B});V&&V.applied?(B="",Z()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z())}catch(V){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function Ge(){let R=Y();if(!(!R||B.length===0)){try{let V=await r("apply-impl-preset-global",{preset_id:B,expected_revision:R.revision});V&&V.applied?(_=Zt(V.values)?{...V.values}:{},g={..._},h=Array.isArray(V.warnings)?V.warnings:[]):V&&V.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(V){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Z()}}async function Te(){M=!0,I=!1,Z();try{let R=await r("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?I=!0:T=R}catch{I=!0}finally{M=!1,Z()}}function me(){if(S=!S,S&&!T){Te();return}Z()}function $e(){let R=Gr({loading:M,error:I});if(R)return R;if(!T)return"";let V=Array.isArray(T.variants)?T.variants:[];return i`<div class="settings-dialog__sp-body">
      ${T.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${T.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${V.map(ie=>i`<div class="settings-dialog__sp-variant" data-variant=${ie.key}>
            <div class="settings-dialog__sp-cond">${ie.condition}</div>
            ${ir(ie.label,ie.system_prompt)}
          </div>`)}
    </div>`}function be(){return i`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${S?"true":"false"}
        @click=${me}
      >
        ${S?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${S?$e():""}
    </section>`}function $(R,V,ie,Pe,Ce,Fe){let ot=Ce[R]??Kt;return i`<select
      class=${ot===Kt?"settings-dialog__unset":""}
      data-key=${R}
      aria-label=${V}
      ?disabled=${Fe===!0}
      .value=${Or(String(ot))}
      @change=${at=>Pe(R,String(at.target.value))}
    >
      <option value=${Kt} ?selected=${ot===Kt}>(기본)</option>
      ${ie.map(at=>i`<option value=${at} ?selected=${at===ot}>
            ${at===qt?"\uC790\uB3D9":at}
          </option>`)}
    </select>`}function w(R,V,ie,Pe,Ce,Fe=!1){return i`<div
      class=${`settings-dialog__row${Fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        ${$(R,V,ie,Pe,Ce,Fe)}
      </span>
    </div>`}function H(R,V,ie,Pe,Ce){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${V}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${$(ie,`${R} \uBAA8\uB378`,Pe,ne,g,!1)}
        ${$(Ce,`${R} effort`,gs,ne,g,!1)}
      </span>
    </div>`}function q(){let R=j(),V=cl(g),ie=g.impl_runtime,Pe=g.impl_model,Ce=Y();return i`
      <section
        class=${`settings-dialog__pane${c==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${h.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Kt}
                        aria-pressed=${String(!g.workflow_mode)}
                        @click=${()=>ne("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${_s.map(Fe=>i`<button
                            type="button"
                            data-mode=${Fe}
                            aria-pressed=${String(g.workflow_mode===Fe)}
                            @click=${()=>ne("workflow_mode",Fe)}
                          >
                            ${Fe}
                          </button>`)}
                    </span>
                  </span>
                </div>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  리뷰 게이트
                  <span class="settings-dialog__hint">모델 · effort</span>
                </div>
                ${H("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",hn,"spec_review_effort")}
                ${H("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ms,"plan_review_effort")}
                ${H("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",hn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${w("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ps,ne,g)}
                ${w("impl_runtime","\uC704\uC784 \uB300\uC0C1",fs,ne,g,V)}
                ${w("impl_model","\uBAA8\uB378",hs(R,ie),ne,g,V)}
                ${w("impl_effort","effort",Vr(R,ie,Pe),ne,g,V)}
                ${w("impl_speed","\uC18D\uB3C4",gn,ne,g,V)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Or(B)}
                  @change=${Fe=>{B=String(Fe.target.value),Z()}}
                >
                  <option value="" ?selected=${B===""}>
                    구현 프리셋…
                  </option>
                  ${(Ce?.presets||[]).map(Fe=>i`<option
                        value=${Fe.id}
                        ?selected=${Fe.id===B}
                      >
                        ${Fe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${B.length===0}
                  @click=${Ge}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${B?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Or(A)}
                  @input=${Fe=>{A=String(Fe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${We}
                >
                  ${B?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${B.length===0}
                  @click=${Ne}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function J(){let R=t.queueStore?.get(),V=j(),ie={orchestration_model:F.orchestration_model??(Zt(R)?R.orchestration_model:null),orchestration_effort:F.orchestration_effort??(Zt(R)?R.orchestration_effort:null),orchestration_speed:F.orchestration_speed??(Zt(R)?R.orchestration_speed:null)},Pe=bs(V,x),Ce=Vr(V,x||void 0,ie.orchestration_model||qt).filter(ot=>ot!==qt),Fe=Zt(R)&&typeof R.slots=="number"?R.slots:2;return i`
      <section
        class=${`settings-dialog__pane${c==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Or(x||Kt)}
                @change=${ot=>{let at=String(ot.target.value);x=at===Kt?null:at,Z()}}
              >
                <option value=${Kt} ?selected=${!x}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${x==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${x==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${w("orchestration_model","\uBAA8\uB378",Pe,he,ie)}
          ${w("orchestration_effort","effort",Ce,he,ie)}
          ${w("orchestration_speed","\uC18D\uB3C4",gn,he,ie)}
        </div>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">동시 실행</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">slots</span>
            <span class="settings-dialog__controls">
              <span class="settings-dialog__stepper">
                <button
                  type="button"
                  aria-label="slots 감소"
                  @click=${()=>Ie(Fe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Fe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ie(Fe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${be()}
      </section>
    `}function O(){let R=n.get();return i`
      <section
        class=${`settings-dialog__pane${c==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${R?i`
              ${cc(R,s(),U)}
              ${dc(R,d,{onDraft:V=>{d=V},onAdd:P,onRemove:C})}
              ${uc(R,Q)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function L(R){let V=n.get();if(V)try{let ie=await r("display-policy-set",{expected_revision:V.revision,policy:R(V)});fe(ie),ie&&ie.conflict&&ie.policy&&(ie=await r("display-policy-set",{expected_revision:ie.policy.revision,policy:R(ie.policy)}),fe(ie)),ie&&ie.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function fe(R){R&&R.policy&&typeof R.policy=="object"&&n.set(R.policy)}function Le(R){L(R)}function U(R){let V=n.get();if(!V)return;let ie=!qf(R,V);Le(Pe=>Bf(R,Pe,ie))}function P(){let R=d.trim();R.length!==0&&(d="",Le(V=>V.hidden_prefixes.includes(R)?{hidden_prefixes:V.hidden_prefixes}:{hidden_prefixes:[...V.hidden_prefixes,R]}),Z())}function C(R){Le(V=>({hidden_prefixes:V.hidden_prefixes.filter(ie=>ie!==R)}))}function Q(R){let V=n.get();if(!V)return;let ie=V.chips[R]===!1;Le(()=>({chips:{[R]:ie}}))}function Z(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ff.map(R=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${R.id}
                  aria-selected=${String(c===R.id)}
                  aria-controls=${`settings-pane-${R.id}`}
                  @click=${()=>de(R.id)}
                >
                  <span class="settings-dialog__glyph">${R.glyph}</span>
                  ${R.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${tt}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${q()} ${J()} ${O()}
          </div>
        </div>
      `,a)}function de(R){c=R,Z()}let se=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",se),a.addEventListener("cancel",se);let Ee=R=>{R.target===a&&tt()};a.addEventListener("click",Ee);let Ye=null;n.subscribe&&(Ye=n.subscribe(()=>{l&&Z()}));let st=null;t.implPresetStore?.subscribe&&(st=t.implPresetStore.subscribe(()=>{l&&Z()}));function ft(R="session"){l||(l=!0,t.onOpenChange?.(!0),c=R,d="",F={},Z(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),X())}function tt(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ft,close:tt,sessionDraft:()=>({...g}),destroy(){l=!1,a.removeEventListener("close",se),a.removeEventListener("cancel",se),a.removeEventListener("click",Ee),Ye&&(Ye(),Ye=null),st&&(st(),st=null),a.remove()}}}function qf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Bf(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Uf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function fc(e){return String(e).padStart(2,"0")}function jf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Wf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${fc(n.getHours())}:${fc(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Uf[n.getMonth()]} ${n.getDate()} ${o}`;return`${jf(r,t)} \xB7 ${c}`}function zf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var _c=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function mc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let l=_c.filter(_=>n.has(_.key));if(l.length===0){s();return}let d=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(_=>{let g=n.get(_.key),h=typeof g.ageSeconds=="number"&&g.ageSeconds>600,E=h?`${Math.floor(g.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${g.windows.map(x=>{let F=typeof x.pct=="number"&&Number.isFinite(x.pct)?x.pct:0,B=Math.min(100,Math.max(0,F)),S=`resets ${Wf(x.resetsAt,d)}${h?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${zf(B)}"
                style=${`--progress: ${B}%`}
                title=${S}
              >
                <span class="usage-meter__label">${x.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function c(){let l=await Promise.all(_c.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),c(),r=setInterval(()=>{c()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Hf="worker-ineligible";function qo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gc(e){return qo(e).includes(Hf)}var Gf="worker-serial";function Bo(e){return qo(e).includes(Gf)}var Vf=new Set(["done","failed","orphaned","stopped","discarded"]);function hc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,c=new Map,l=!1;function d(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function _(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function g(){let $=d(),w=new Set;for(let H of Object.values($.attempts||{})){let q=H;q&&typeof q.bead_id=="string"&&!Vf.has(q.status)&&w.add(q.bead_id)}for(let H of Array.isArray($.pr_wait)?$.pr_wait:[])H&&typeof H.bead_id=="string"&&w.add(H.bead_id);for(let H of Object.values($.discard_operations||{})){let q=H;q&&q.phase!=="done"&&typeof q.bead_id=="string"&&w.add(q.bead_id)}return w}function h($){return $.filter(w=>E(w)===null)}function E($){let w=d();for(let H of Array.isArray(w.serial_lanes)?w.serial_lanes:[])if(Array.isArray(H?.entries)&&H.entries.some(q=>q.bead_id===$))return H.id;return(Array.isArray(w.queue)?w.queue:[]).some(H=>H.bead_id===$)?"parallel":null}function x($,w){let H=a.get($);return H||[...w.order]}function F($){if($.length<2)return!1;let w=E($[0]);if(!w||w==="parallel")return!1;let H=d(),q=(Array.isArray(H.serial_lanes)?H.serial_lanes:[]).find(O=>O.id===w)?.entries.map(O=>O.bead_id);if(!Array.isArray(q))return!1;let J=$.map(O=>q.indexOf(O));return J.every(O=>O>=0)&&J.every((O,L)=>L===0||O>J[L-1])}function B(){let $=d(),w=Array.isArray($.serial_lanes)?$.serial_lanes:[],H=w.find(q=>Array.isArray(q.entries)&&q.entries.length===0);return H?H.id:w[0]?.id||"s1"}function A($){let w=d().bead_titles||{};return typeof w[$]=="string"?w[$]:$}async function S($,w){if(!s||l)return null;l=!0,Ae();try{return await s($,w)}finally{l=!1,Ae()}}async function M($){let w=await S("worker-parallel-analysis-start",{force:$});w&&w.applied===!1&&w.reason&&re(`\uBD84\uC11D \uC2E4\uD328: ${w.reason}`,"error",2800)}async function I(){let $=_().job;!s||!$||await s("worker-parallel-analysis-cancel",{job_id:$.job_id})}async function T($){let w=_().settings;await S("worker-parallel-analysis-settings-update",{expected_revision:w.revision,runner:w.runner||"claude",model:$,effort:w.effort||"high"})}async function j($,w){if(!s||l)return;let H=x($,w),q=_();if(H.length<2||!q.last_good){re("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let J=c.get($)||B(),O=()=>({snapshot_digest:q.last_good.identity_digest,group_index:$,lane:J,ordered_bead_ids:H,expected_revision:d().revision});l=!0,Ae();try{let L=await s("worker-parallel-analysis-submit",O());L&&L.queue&&r&&r.set(L.queue),L&&L.applied!==!0&&L.conflict===!0&&(L=await s("worker-parallel-analysis-submit",O()),L&&L.queue&&r&&r.set(L.queue)),L&&L.applied===!0?(a.delete($),re(`\uC9C1\uB82C \uB808\uC778 ${J}\uC5D0 ${H.length}\uAC1C \uBC30\uCE58`,"success")):re(`\uC81C\uCD9C \uAC70\uBD80: ${L?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,Ae()}}function Y($,w,H){a.set($,x($,w).filter(q=>q!==H)),Ae()}function X($){a.delete($),Ae()}function ge($,w,H,q){let J=[...x($,w)],O=J.indexOf(H),L=O+q;O<0||L<0||L>=J.length||(J.splice(L,0,...J.splice(O,1)),a.set($,J),Ae())}function ne(){let $=_().settings,w=d().runner_catalog,H=Object.keys(w?.runners?.[$.runner||"claude"]?.models||{}),q=!!($.runner&&$.model&&$.effort);return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${J=>{T(J.target.value)}}
        >
          ${H.map(J=>i`<option value=${J} ?selected=${$.model===J}>
                ${J}
              </option>`)}
        </select>
      </label>
      ${q?i`<span class="pa-settings__effort"
            >effort ${$.effort}</span
          >`:i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`}
    </div>`}function ae($){let w=d(),H=(Array.isArray(w.queue)?w.queue.length:0)+(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).reduce((O,L)=>O+(Array.isArray(L.entries)?L.entries.length:0),0),q=!!$.job,J=!!($.settings.runner&&$.settings.model&&$.settings.effort);return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${H}</span>
      ${$.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date($.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!J||q||l}
        @click=${()=>{M(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!J||q||l}
        @click=${()=>{M(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!q}
        @click=${()=>{I()}}
      >
        취소
      </button>
    </div>`}function he($,w){let H=x($,w),q=g(),J=H.filter(P=>q.has(P)),O=h(H),L=F(H),fe=Array.isArray(d().serial_lanes)?d().serial_lanes:[],Le=c.get($)||B(),U=w.eligible!==!0||H.length<2||J.length>0||O.length>0||L||l;return i`<section class="pa-group" data-group-index=${String($)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${w.confidence}</span>
        ${w.categories.map(P=>i`<span class="pa-group__category">${P}</span>`)}
        ${L?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${w.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${O.length>0?i`<span class="pa-group__stale"
              >stale — ${O.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${w.reason}</p>
      <ol class="pa-group__members">
        ${H.map((P,C)=>i`<li class="pa-member" data-bead-id=${P}>
              <span class="pa-member__seq">${C+1}</span>
              <span class="pa-member__title">${A(P)}</span>
              ${q.has(P)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${P}
                ?disabled=${C===0}
                aria-label=${`${P} \uC704\uB85C`}
                @click=${()=>ge($,w,P,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${P}
                ?disabled=${C===H.length-1}
                aria-label=${`${P} \uC544\uB798\uB85C`}
                @click=${()=>ge($,w,P,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${P}
                aria-label=${`${P} \uC81C\uC678`}
                @click=${()=>Y($,w,P)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${w.evidence.map(P=>i`<li class="pa-evidence">
              <code>${P.path}</code>
              <span class="pa-evidence__locator">${P.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>X($)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${P=>{c.set($,P.target.value),Ae()}}
          >
            ${fe.map((P,C)=>i`<option
                  value=${P.id}
                  ?selected=${Le===P.id}
                >
                  직렬 ${C+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${U}
          @click=${()=>{j($,w)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ie($){let w=Array.isArray($.issues)?$.issues:[],H=w.filter(J=>J.verdict==="parallel_ok").length,q=w.filter(J=>J.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${H}</span>
      <span>uncertain ${q}</span>
    </div>`}function Ae(){let $=_(),w=$.last_good?.result;je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${be}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ne()} ${ae($)}
            ${w?i`${w.groups.map((H,q)=>he(q,H))}
                ${w.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ie(w)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let We=!1,Ne=()=>{We=!1},Ge=$=>{$.target===$.currentTarget&&be()};o.addEventListener("close",Ne),o.addEventListener("cancel",Ne),o.addEventListener("click",Ge);let Te=null;r&&r.subscribe&&(Te=r.subscribe(()=>{We&&Ae()}));let me=null;n&&n.subscribe&&(me=n.subscribe(()=>{We&&Ae()}));function $e(){We||(We=!0,Ae(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function be(){We&&(We=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:$e,close:be,destroy(){We=!1,o.removeEventListener("close",Ne),o.removeEventListener("cancel",Ne),o.removeEventListener("click",Ge),Te&&(Te(),Te=null),me&&(me(),me=null),o.remove()}}}function bc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let S=s();return typeof S.revision=="number"?S.revision:0}function a(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=s().workspace_info;return S&&typeof S=="object"?S:{}}function l(S,M){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${M}</span
    >`}function d(S){if(typeof S!="number"||!Number.isFinite(S))return"";let M=S/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function _(S){let M=d(S);return M?l("config",M):""}function g(S){let M=typeof S.base_sha=="string"?S.base_sha:"",I=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${I}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${S.verify.script}</code
                >${_(S.verify.timeout_ms)}`:i`선언 없음${l("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?i`<code class="worker-repo-ops__vd-cmd"
                  >${S.deploy.script}</code
                >${_(S.deploy.timeout_ms)}`:i`선언 없음${l("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${S.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function h(S){let M=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?g(M):M&&(M.status==="pending"||M.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${M.error_code?i` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function E(S){if(!r)return;let M=await r("worker-auto-repair-toggle",{on:S,expected_revision:o()});if(a(M),M&&M.conflict){let I=await r("worker-auto-repair-toggle",{on:S,expected_revision:o()});a(I)}n()}let x={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function F(S,M,I){return i`<div class="worker-repo-ops__policy-group" data-policy=${I}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(T=>i`<li data-token=${T}>
              ${x[T]||T}
            </li>`)}
      </ul>
    </div>`}function B(S){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(M=>{let I=[x[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?I.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?I.push(`${x[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&I.push(`${M.sessions_per_user_action}\uD68C`,x[M.user_actions]||M.user_actions),M.applies_when&&I.push(x[M.applies_when]||M.applies_when),i`<li data-token=${M.id}>
            <strong>${x[M.id]||M.id}</strong>
            <span>${I.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function A(){let S=s(),M=S.auto_repair!==!1,I=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,T=Array.isArray(S.repo_operations)?S.repo_operations:[],j=T.find(ne=>ne.state==="repairing"),Y=T.filter(ne=>ne.state==="failed"||ne.state==="repairing"),X=Y.length?Math.min(...Y.map(ne=>typeof ne.repair?.remaining=="number"?ne.repair.remaining:0)):I?.auto_repair?.resolution_ladder?.find(ne=>ne.id==="auto_repair_session")?.attempts??1,ge=Array.isArray(I?.auto_repair?.resolution_ladder)?I.auto_repair.resolution_ladder:[];return i`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${M}
          @change=${ne=>{E(ne.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${M?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${X}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${j?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${j.repair?.owner_bead||j.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${I?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(I.worker_automatic||[]).length} · 해결 사다리
                ${ge.length} · 금지
                ${(I.never_automatic||[]).length}</span
              >
            </summary>
            ${F("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",I.worker_automatic||[],"worker-automatic")}
            ${I.supported===!1||I.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${I.schema_version})`}
                </div>`:B(ge)}
            ${F("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",I.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${h(c())} ${A()}
      </details>`}}}var Yf=20,yc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},vc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Kf(e,t,r=Yf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function wc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Zf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function $c(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Xf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(vc,n)?vc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Qf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${ks(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${wc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yc,t.kind)?yc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ws(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${To(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wc(e)}"
          >${Zf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?$c(Fl(t.failure_kind,n)):""}
      ${Xf(t)}
      ${kc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ws(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Jf(e){let t=e.cleanup,r=Dr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${ks(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--warn"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${t.bead_id} 머지 후 정리</span>
        <span class="worker-ev__st worker-ev__st--warn">멈춤</span>
      </div>
      <ol class="worker-stepper" aria-label="정리 단계">
        ${Dl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${$c(Ss(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?i`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${kc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function e_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
    <div class="worker-repo-drawer__hd">
      <h3>저장소 작업 타임라인</h3>
      <span class="worker-repo-drawer__hint">${e.repo}</span>
      <span class="worker-repo-drawer__spacer"></span>
      <button
        type="button"
        class="worker-repo-drawer__close"
        aria-label="닫기"
        data-seam="repo-ops-close"
      >
        ✕
      </button>
    </div>
    ${e.events.length===0?i`<div class="worker-repo-drawer__empty">기록 없음</div>`:i`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Jf(t):Qf(t))}
        </ul>`}
  </section>`}function xc(e,t={}){let r=null;function n(){je(r?e_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Kf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var t_="tab:worker:ready",r_="tab:worker:blocked",n_="tab:worker:in-progress",s_="tab:worker:closed",Ts=1,Sc=5;function Ac(e){return mn(e).path.length>0}var Cc="beads-ui.worker.candidate-filter",Uo={show_blocked:!1,spec:"all"};function o_(){try{let e=window.localStorage.getItem(Cc);if(!e)return{...Uo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Uo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Uo}}}function a_(e){try{window.localStorage.setItem(Cc,JSON.stringify(e))}catch{}}function i_(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let l=r(c),d=n(c);l&&d?s.push(c):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var l_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rc="bdui.worker.candidate_sort",c_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Es="spec";function d_(){try{let e=window.localStorage.getItem(Rc);return e==="board"||e==="created"||e==="spec"?e:Es}catch{return Es}}function u_(e){try{window.localStorage.setItem(Rc,e)}catch{}}var Ic="bdui.worker.done-range";function p_(){try{let e=window.localStorage.getItem(Ic);return Pt(e)?e:Lt}catch{return Lt}}function f_(e){try{window.localStorage.setItem(Ic,e)}catch{}}var __="(max-width: 640px)",Lc="beads-ui.worker.lane-collapsed",xn={queue:!0,done:!0};function m_(){try{let e=window.localStorage.getItem(Lc);if(!e)return{...xn};let t=JSON.parse(e);return!t||typeof t!="object"?{...xn}:{queue:typeof t.queue=="boolean"?t.queue:xn.queue,done:typeof t.done=="boolean"?t.done:xn.done}}catch{return{...xn}}}function g_(e){try{window.localStorage.setItem(Lc,JSON.stringify(e))}catch{}}function Tc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function h_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Er):(n.sort(qn(r)),t==="board"?n:[...n.filter(Ac),...n.filter(s=>!Ac(s))])}function b_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function y_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function v_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var w_=["closed_unmerged","review","undecidable"],k_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function $_(e,t){for(let r of k_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Ec(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function x_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function S_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function jo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function A_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function T_(e,t,r,n,s=null,o=null,a=null,c=!1,l=null,d=!0,_=null,g=null,h=null,E={},x=!1,F=!1){let B=!!l&&l.position>0,A=!!l?.continuation_action&&l.continuation_action.continuation===null,S=!!l&&l.active===!0,M=l&&l.failure||null,I=r[e]||null,T=I&&I.gate?I.gate:null,j=I&&I.pr?I.pr:null,Y=A_(h),X=x_(l?l.resolution:null),ge=S_(l?l.head_review:null),ne=l&&l.head_review||null,ae=l&&l.authority||null,he=!!ne&&["pending","reviewing","revising"].includes(ne.state),Ie=B&&!S&&(ne?.state==="failed"||!ae||ae.source==="automatic"&&!F),Ae=[];c&&Ae.push("\uC138\uC158");let We=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":X?X.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ne=$_(c&&T&&T.tier==="closed_unmerged"?"\uB2EB\uD798":T&&T.gate_badge||"",We?null:o&&o.activity||null);if(We&&Ae.push(We),ge&&Ae.push(ge.badge),Ne.label&&Ae.push(Ne.label),T&&T.base_badge&&T.base_badge!==T.gate_badge&&Ae.push(T.base_badge),g&&Ae.push(g),n){let J=Dr(n.step);Ae.push(J?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${J}`:"\uC815\uB9AC \uBA48\uCDA4")}Y&&Ae.push(Y.badge),B&&!S&&Ae.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),M&&Ae.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Ec(M)}`),A&&Ae.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),_&&Ae.push(`\uC790\uB3D9 \uC81C\uC678: ${Ec(_)}`);let Ge=!!T&&T.base_badge==="\uCDA9\uB3CC",Te=!!T&&T.enabled===!0,me=Co(o&&o.merge_progress?o.merge_progress.step:null),$e=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!T&&T.tier==="merged",be=c&&!!n&&!!T&&T.tier==="merged",$=c&&Ge&&d===!1,w=Jt(E,e,{external:c,merge_active:S||!!me,merge_queued:B,conflict_active:!!a,cleanup_active:!1,merged:!!n||T?.tier==="merged"}),H=!!w.operation,q=!$e&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?xs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:c,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",completion_badge:Y?Y.badge:null,completion_title:Y?Y.title:"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:Ae,live_badge:a==="paused"?null:X?.live||a==="running"?We:ge?.live?ge.badge:Ne.live?Ne.label:null,usage:s,alert:!!T&&w_.includes(T.tier)||!!n||!!M||!!(ge&&ge.alert)||!!(Y&&Y.alert),merge_action:q?!1:!B||A||Ie,timeline_action:q,cancel_action:B&&!A,cancel_enabled:(!S||he)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":S&&!he?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":he?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:w,discard_action:w.action,merge_step:me,discard_enabled:w.enabled,discard_title:w.title,merge_enabled:!me&&!a&&!H&&!(Y&&Y.lock_actions)&&!$&&!q&&(Te||Ge||$e||be||Ie),merge_label:A?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":$e||be?"\uC815\uB9AC \uC7AC\uAC1C":Ge&&!me&&!$e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:H?w.error?`\uD3D0\uAE30 \uC2E4\uD328: ${w.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${w.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:A?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ge?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Te?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wo(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:l,getWorkspacePath:d,doneRange:_,onDoneRangeChange:g}=t,h=n?Un(n,c):null,E=Wn({transport:r,uiOrderStore:c}),x=null,F=[],B=o_(),A=d_(),S=Pt(_)?_:p_(),M=new Map;function I(){let p=Xt.find(v=>v.value===S);return p?p.label:"\uC624\uB298"}let T=m_(),j=!1,Y=new Set,X=new Set,ge=new Set,ne=[],ae=document.createElement("div");ae.className="worker-console";let he=document.createElement("div");he.className="worker-top";let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let We=document.createElement("div");We.className="worker-drawer-host";let Ne=document.createElement("div");Ne.className="worker-drawer-host",Ne.hidden=!0,Ie.append(Ae,We,Ne);let Ge=document.createElement("div");Ge.className="worker-lanes-host",ae.append(he,Ie,Ge),e.appendChild(ae);let Te=null,me=cs(We,{transport:r,sessionLogStore:a,onClose:()=>{Te=null,Ie.hidden=!0,De()}}),$e=xc(Ne,{onClose:()=>{Ne.hidden=!0,Ie.hidden=!0,De()}}),be=bc({queueStore:s,transport:r,onChanged:()=>De()}),$=o?hc(ae,{queueStore:s,analysisStore:o,transport:r}):null;function w(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ts,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function H(){let p=w();return typeof p.revision=="number"?p.revision:0}function q(p){p&&p.queue&&s&&s.set(p.queue)}function J(){let p=w().queue;return Array.isArray(p)?p.length:0}async function O(p,v,N){if(!r)return;let te=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:N,expected_revision:H()}),le=await r("worker-queue-place",te());q(le),le&&le.conflict&&await r("worker-queue-place",te()).then(q)}async function L(p,v,N){if(!r)return;let te=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:N,expected_revision:H()}),le=await r("worker-queue-reorder",te());q(le),le&&le.conflict&&await r("worker-queue-reorder",te()).then(q)}async function fe(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:H()});q(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:H()}).then(q)}async function Le(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function U(p){if(!r||!p)return;let v=async(te={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:H(),...te}),N=await v();q(N),N&&N.conflict&&(N=await r("worker-attempt-resume",{attempt_id:p,expected_revision:H()}),q(N)),N=await rr(N,(te,le)=>v({continuation:te,decision_token:le}),{onResult:q,refresh:()=>v()}),N&&N.resumed===!1&&!N.conflict&&N.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${N.reason}`,"error",2400)}async function P(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:H()});q(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:H()}),q(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function C(p,v,N=!0){if(!r)return null;let te=r,le=await te(p,{...v,expected_revision:H()});return q(le),le&&le.conflict&&N&&(le=await te(p,{...v,expected_revision:H()}),q(le)),le}async function Q(p){if(!r||!p)return;let v=w().merge_queue?.find(te=>te.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await de(p,v.mismatch);return}Y.add(p),De();let N;try{N=await C("worker-merge-queue-add",{bead_id:p})}finally{Y.delete(p),De()}!N||N.conflict||N.applied||re("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Z(p){if(!(!r||!p||X.has(p))){X.add(p),De();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:H()});q(v),v&&!v.retried&&!v.conflict&&v.reason&&re(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{X.delete(p),De()}}}async function de(p,v){let N=await rr({continuation_mismatch:v},(le,ye)=>C("worker-merge-queue-add",{bead_id:p,continuation:le,decision_token:ye},!1)),te=N?.queue?.merge_queue?.find(le=>le.bead_id===p)?.continuation_action;if(N?.applied!==!0&&te?.continuation===null&&te.mismatch){await de(p,te.mismatch);return}N&&N.applied===!1&&!N.conflict&&re("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function se(p){if(!r)return;let v=await C("worker-merge-auto-toggle",{on:p});!v||v.conflict||re(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Ee(p){if(!r||!p)return;let v=await C("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ye(){await C("worker-merge-queue-remove",{all:!0})}async function st(p,v=null,N="unmerged",te=null){if(!r||!p)return;let le=yn(p,N);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let we=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...te?{operation_id:te}:{},expected_revision:H()});if(q(we),we&&we.conflict&&(we=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...te?{operation_id:te}:{},expected_revision:H()}),q(we)),we&&we.discarded===!0){re($s(we),"success",5e3);return}if(we&&we.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${we.reason}`,"error",2800);return}if(we&&we.accepted&&we.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(we&&we.accepted&&!we.discarded){re(`\uD3D0\uAE30 \uC9C4\uD589: ${we.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}we&&!we.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ft(p,v){if(!r||!v||ge.has(v))return;ge.add(v),De();let N;try{let te=async(le={})=>await r(p,{bead_id:v,expected_revision:H(),...le});N=await te(),q(N),N&&N.conflict&&(N=await r(p,{bead_id:v,expected_revision:H()}),q(N)),p==="worker-revise-fix"&&(N=await rr(N,(le,ye)=>te({continuation:le,decision_token:ye}),{onResult:q,refresh:()=>te()}))}finally{ge.delete(v),De()}if(!(!N||N.conflict)){if(N.ok){re(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function tt(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:H()});q(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:H()}).then(q)}async function R(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(q(v),v&&v.ok===!1){re(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&re("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function V(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});q(v),v&&v.ok===!1&&re(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function ie(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Ts,Math.floor(p)),N=await r("worker-queue-set-slots",{slots:v,expected_revision:H()});q(N),N&&N.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:H()}).then(q)}async function Pe(p){if(!r||!Number.isInteger(p)||p<1||p>Sc)return;let v=w(),N=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((ye,we)=>ye+(Array.isArray(we?.entries)?we.entries.length:0),0),te=()=>({count:p,expected_revision:H()}),le=await r("worker-queue-set-serial-lane-count",te());q(le),le&&le.conflict&&(le=await r("worker-queue-set-serial-lane-count",te()),q(le)),le&&le.applied&&N>0&&re(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${N}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ce(){let p=w(),v=h?h.selectBoardColumn(t_,"ready"):[],N=h?h.selectBoardColumn(r_,"blocked"):[],te=h?h.selectBoardColumn(s_,"closed"):[],le=h?h.selectBoardColumn(n_,"in_progress"):[],ye=new Map;for(let m of le){let D=y_(m);if(!D)continue;let ee=ye.get(D);ee?ee.push(m):ye.set(D,[m])}let we=m=>{let D=jn(ye.get(m)||[]);return D?D.title||D.id:null},Ke=p.bead_titles||{},Ve=new Map;for(let[m,D]of Object.entries(Ke))typeof D=="string"&&D.length>0&&Ve.set(m,D);for(let m of[...v,...N])Ve.set(m.id,m.title||m.id);let ce=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},b=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},G=new Map;for(let[m,D]of Object.entries(b))Array.isArray(D)&&G.set(m,Bo(D));for(let m of[...v,...N]){let D=m.labels;Array.isArray(D)&&!G.has(m.id)&&G.set(m.id,Bo(D))}let oe=new Map,ze=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(ze)?ze:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let D=m.members.map(qe=>{let _t=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(It=>It.entries.some(pt=>pt.bead_id===qe));return _t?_t.id:null});if(!(D.every(qe=>qe!==null)&&new Set(D).size===1))for(let qe of m.members)oe.set(qe,m.members.filter(_t=>_t!==qe))}let nt=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Ue=new Map;for(let[m,D]of Object.entries(ce))D&&typeof D=="object"&&Ue.set(m,D);for(let m of[...v,...N])Ue.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let ve=m=>Ue.get(m)||{},y=p.pr_wait||[],f=p.pr_observations||{},u=p.pr_activity||{},k=p.cleanup_failed||{},W=Object.entries(k).map(([m,D])=>({bead_id:m,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),pe=p.queue||[],Me=new Set([...pe.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(D=>D.bead_id)),...y.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),Se=new Set(N.map(m=>m.id)),$t=c?c.get()?.order||{}:{},vr=new Set,Vo=[];for(let m of[...v,...N])Me.has(m.id)||vr.has(m.id)||b_(m)||gc(m.labels)||(vr.add(m.id),Vo.push(m));F=h_(Vo,A,$t);let Hc=p.admission||{},Yo=m=>{let D=Hc[m];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ee=typeof D.reason=="string"?D.reason:"",qe=ee.indexOf(":");return qe>0&&qe<ee.length-1?`\u26D4 ${ee.slice(0,qe)} (${ee.slice(qe+1)})`:`\u26D4 ${ee}`},Gc=F.map(m=>{let D=mn(m),ee=D.path.length>0,qe=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",_t=!qe&&ee&&!D.conflict,It=Se.has(m.id),pt=[];It&&pt.push(v_(m)),qe?pt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):D.conflict?pt.push("spec_id_conflict"):ee||pt.push("spec \uC5C6\uC74C");let rt=Yo(m.id);return rt&&pt.push(rt),{id:m.id,title:m.title||m.id,reason:pt.join(" \xB7 "),draggable:_t,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:qe,status:m.status,blocked:It,has_spec:ee}}),Cs=i_(Gc,B),Vc=Cs.visible,Yc=p.revise_parked||{},Sn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Rs=(m,D)=>m.map((ee,qe)=>{let _t=D!=="done",It=D!=="done"&&D!=="queue",pt=_t?Yc[ee.bead_id]:null,rt=_t?Jt(Sn,ee.bead_id):null,Ns=rt?.operation?rt:null,id=_t&&G.get(ee.bead_id)===!0,ld=_t?Yo(ee.bead_id):null,cd=_t?[ld]:[],ba=nt[ee.bead_id]||[],ya=p.admission&&typeof p.admission=="object"?p.admission[ee.bead_id]:null,va=_t&&ba.length>0&&typeof ya?.reason=="string"&&ya.reason.startsWith("not_ready")?[`\u23F8 ${ba.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Fs=_t?oe.get(ee.bead_id):void 0;return Fs&&Fs.length>0&&va.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Fs.join(", ")}\uC640`),{id:ee.bead_id,title:Ve.get(ee.bead_id)||ee.bead_id,reason:cd.filter(Boolean).join(" \xB7 "),draggable:_t&&!Ns,done:D==="done",lane:D,seq:It?qe+1:void 0,worker_serial:id,discard:Ns,badges:[...va,...pt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!pt,revise_action:!!pt,revise_enabled:!!pt&&!Ns&&!ge.has(ee.bead_id),revise_title:pt?pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Nt(p.attempts||{},ee.bead_id):null,done_at:D==="done"&&typeof ee.added_at=="number"?ee.added_at:void 0,...ve(ee.bead_id)}}),Ko=new Map;for(let m of p.done)m&&typeof m.bead_id=="string"&&typeof m.added_at=="number"&&Ko.set(m.bead_id,m.added_at);let Pr=p.attempts?Object.values(p.attempts):[],Is=new Set;for(let m of Pr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&Is.add(m.resumed_from);let Ls=new Map;for(let m of Pr)Ls.set(m.bead_id,m.attempt_id);let Os=new Map;for(let m of Pr)Os.set(m.attempt_id,m);function Ds(m){let D=new Set,ee=m;for(;ee&&!D.has(ee.attempt_id);){if(ee.conflict_resolution===!0)return!0;D.add(ee.attempt_id),ee=typeof ee.resumed_from=="string"&&ee.resumed_from.length>0&&Os.get(ee.resumed_from)||null}return!1}let An=typeof p.declared_base=="string"?p.declared_base:null;function Kc(m){let D=null;for(let ee of Pr)!ee||ee.bead_id!==m||Ds(ee)||(D===null||(typeof ee.started_at=="number"?ee.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ee);return D&&typeof D.target_base=="string"?D.target_base:null}let Zo=[],Xo=[],Zc=m=>{let D=Ls.get(m.bead_id)!==m.attempt_id,ee=Ko.get(m.bead_id),qe=typeof ee=="number"&&ee>0&&typeof m.finished_at=="number"&&ee>=m.finished_at;return!D&&!qe&&typeof m.dismissed_at!="number"},Qo=m=>{let D=typeof m.session_id=="string"&&m.session_id.length>0,ee=Is.has(m.attempt_id);return{eligible:D&&!ee,reason:D?ee?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let m of Pr){let D=m.status==="paused"&&!Is.has(m.attempt_id);if(m.status==="running"||D)Xo.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Ve.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:D,conflict_resolution:Ds(m),base_exception:jo(An,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:Jt(Sn,m.bead_id,{attempt_id:m.attempt_id}),usage:Nt(p.attempts||{},m.bead_id),current_child:we(m.bead_id),...ve(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Zc(m)){let ee=Qo(m);Zo.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Ve.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Jt(Sn,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ee.eligible,resume_reason:ee.reason,conflict_resolution:Ds(m),base_exception:jo(An,m.target_base),usage:Nt(p.attempts||{},m.bead_id),current_child:we(m.bead_id),...ve(m.bead_id)}),jt=m}}let Tn=[...Zo,...Xo],Jo=null;if(jt){let m=Qo(jt),D=jt.cause_detail;Jo={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:Jt(Sn,jt.bead_id,{attempt_id:jt.attempt_id})}}let ea=new Set(Tn.map(m=>m.bead_id)),Ms=Array.isArray(p.merge_queue)?p.merge_queue:[],ta=new Map,ra=new Map,na=new Map,sa=new Map,oa=new Map;Ms.forEach((m,D)=>{m&&typeof m.bead_id=="string"&&(ta.set(m.bead_id,D+1),ra.set(m.bead_id,m.resolution),na.set(m.bead_id,m.continuation_action||null),sa.set(m.bead_id,m.head_review||null),oa.set(m.bead_id,m.authority||null))});let aa=p.merge_queue_state||{active:null,failures:{}},Xc=aa.failures||{},Qc=p.auto_merge_skips||{},ia=m=>{let D=Qc[m];if(!D)return null;let ee=f[m],qe=ee&&ee.pr?ee.pr.head_sha:null;return qe&&qe===D.head_sha?D.reason||"":null},En=new Map;for(let m of Tn)m.failed!==!0&&m.conflict_resolution&&(m.paused?En.has(m.bead_id)||En.set(m.bead_id,"paused"):En.set(m.bead_id,"running"));let la=Tn.filter(m=>!m.paused&&m.failed!==!0).length,ca=(p.workspace_info||{}).slots,da=typeof ca=="number"?ca:typeof p.slots=="number"?p.slots:Ts,Jc=la>da,Cn=Ar(S),ed=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>Cn===void 0||typeof m.added_at!="number"||m.added_at>=Cn).sort((m,D)=>(D.added_at||0)-(m.added_at||0)),Kr=Rs(ed,"done"),td=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),ua=[],rd=d?.()||"";for(let m of te){let D=Cr(m.closed_at);if(typeof m.id!="string"||td.has(m.id)||D===null||Cn!==void 0&&D<Cn||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ee=`${rd}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,qe=M.get(ee);qe===void 0&&r&&(M.set(ee,"pending"),Promise.resolve(r("get-comments",{id:m.id})).then(_t=>{let It=Array.isArray(_t)&&_t.some(pt=>ds(typeof pt?.text=="string"?pt.text:"")?.lane==="session");M.set(ee,It?"session":"not-session"),De()}).catch(()=>{M.set(ee,"failed"),De()})),qe==="session"&&ua.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:D,created_at:m.created_at,updated_at:m.updated_at})}Kr.push(...ua),Kr.sort((m,D)=>(D.done_at||0)-(m.done_at||0));let Rn={};for(let m of nr)Rn[m]=0;let pa=!1,fa=0,Ps=0,_a=0;for(let m of Kr){let D=m.usage;if(D&&typeof D=="object"){let ee=!1;for(let qe of nr)Number.isFinite(D[qe])&&(Rn[qe]+=D[qe],pa=!0,ee=!0);ee&&(Ps+=1,Number.isFinite(D.total_cost_usd)&&(fa+=D.total_cost_usd,_a+=1))}}Ps>0&&_a===Ps&&(Rn.total_cost_usd=fa);let ma=Kr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),nd=ma.length>0?vt(Kn(ma)):pa?zt(Rn):null,sd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},od=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ga=m=>{if(y.some(qe=>qe.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Pr.filter(qe=>qe&&qe.bead_id===m),ee=D.length>0?D[D.length-1].status:null;return ee==="failed"||ee==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ee==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ha=od.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,D)=>{let ee=sd[m.id]||{},qe=new Map((Array.isArray(ee.corrections)?ee.corrections:[]).filter(rt=>rt&&typeof rt.bead_id=="string"&&typeof rt.after=="string").map(rt=>[rt.bead_id,rt.after])),_t=Rs(m.entries.filter(rt=>!ea.has(rt.bead_id)),m.id).map(rt=>qe.has(rt.id)?{...rt,badges:[`\u{1F517} ${qe.get(rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...rt.badges]}:rt),It=Array.isArray(ee.occupied_by)?ee.occupied_by.filter(rt=>typeof rt=="string"):[],pt=It.map(rt=>({id:rt,title:Ve.get(rt)||rt,draggable:!1,lane:m.id,ghost:!0,badges:[ga(rt)]}));return{id:m.id,index:D+1,rows:[...pt,..._t],occupied:It.length>0,badge:It.length>0?ga(It[0]):"\uB300\uAE30",cycle:ee.cycle===!0}}),ad=typeof p.serial_lane_count=="number"?p.serial_lane_count:ha.length;return{queue:p,idToTitle:Ve,candidates:Vc,candidate_hidden:{blocked:Cs.hidden_blocked,spec:Cs.hidden_spec},running:Tn,live_count:la,slots:da,over_cap:Jc,failure:Jo,waiting:Rs(pe.filter(m=>!ea.has(m.bead_id)),"queue"),serial_lanes:ha,serial_lane_count:ad,pr_wait:y.map(m=>T_(m.bead_id,Ve.get(m.bead_id)||m.bead_id,f,k[m.bead_id]||null,Nt(p.attempts||{},m.bead_id),u[m.bead_id]||(Y.has(m.bead_id)||X.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),En.get(m.bead_id)||null,m.external===!0,{position:ta.get(m.bead_id)||0,active:aa.active===m.bead_id,failure:Xc[m.bead_id]||null,resolution:ra.get(m.bead_id),continuation_action:na.get(m.bead_id),head_review:sa.get(m.bead_id)||null,authority:oa.get(m.bead_id)||null},m.wt_present!==!1,p.auto_merge===!0?ia(m.bead_id):null,jo(An,Kc(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Os.get(Ls.get(m.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(m=>({...m,...ve(m.id)})),merge_queue_length:Ms.length,merge_queue_running:Ms.length>0,auto_excluded:y.map(m=>m.bead_id).filter(m=>ia(m)!==null),declared_base:An,done:Kr,token_total:nd,cleanup_failures:W,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Fe(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",N=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,te=xt(p),le=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,we=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Ke=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ts}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Sc},(b,G)=>G+1).map(b=>i`<option
                value=${String(b)}
                ?selected=${p.serial_lane_count===b}
              >
                ${b}
              </option>`)}
        </select>
      </label>
      ${o?i`<button
            type="button"
            class="worker-analysis-btn"
            title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
          >
            ✳ 병렬성 분석
          </button>`:""} `,Ve=Bl({failure:p.failure}),ce=Ll(p.repo_operations,p.cleanup_failures);return j?i`<div class="worker-ribbon">
          ${N} ${te}
          <div class="worker-kpi worker-kpi--ribbon">${le}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ke}</div>
          <div class="worker-kpi">${we}</div>
        </div>
        ${ce}${be.template()}${Ve}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${te}${Ke}</div>
        <div class="worker-kpi">
          ${le}${ye}${we}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(b=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${b.tooltip}
                >${I()} 완료 · 누적 ${b.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${ce}${be.template()}${Ve}`}function ot(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(N=>!N.paused&&N.failed!==!0);return i`<section
      class="worker-now${v?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Oo(p.running,Date.now(),Te):""}
      ${p.pr_wait.map(N=>Eo(N))}
    </section>`}function at(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${l_.map(N=>i`<button
              type="button"
              class="worker-filter__chip${B.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${B.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function wt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${c_.map(p=>i`<option value=${p.value} ?selected=${A===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function gt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${S}
      >
        ${Xt.map(p=>i`<option value=${p.value} ?selected=${S===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ct(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,N=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Yt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:N})}function xt(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let N=new Set(p.auto_excluded),te=p.pr_wait.filter(le=>le.merge_action&&le.merge_enabled&&!N.has(le.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${te>0?` ${te}`:""}
    </button>`}function dt(p){let v=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:wt(),controls:at(p)});return j?i`<div class="worker-lanes worker-lanes--mobile">
        ${ot(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:T.queue,preview:Tc(p.waiting)})}
        ${p.serial_lanes.map(N=>ct(N))}
        ${v}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:gt(),collapsible:!0,collapsed:T.done,preview:Array.isArray(p.token_total)?p.token_total.map(N=>N.label).join(" \xB7 "):p.token_total||Tc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(N=>ct(N))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(N=>!N.paused&&N.failed!==!0),body:Oo(p.running,Date.now(),Te)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:gt()})}
    </div>`}function it(p){T={...T,[p]:!T[p]},g_(T),De()}function De(){let p=Ce();je(Fe(p),he),je(dt(p),Ge)}function z(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let N=Math.round(p.getBoundingClientRect().height);ae.style.setProperty("--worker-ribbon-top",`${N}px`)};if(v(),typeof ResizeObserver=="function"){let N=new ResizeObserver(v);N.observe(p),ne.push(()=>N.disconnect())}else window.addEventListener("resize",v),ne.push(()=>window.removeEventListener("resize",v))}function K(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(__);j=!!p.matches;let v=N=>{let te=!!(N&&typeof N.matches=="boolean"?N.matches:p.matches);te!==j&&(j=te,De())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ne.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ne.push(()=>p.removeListener(v)))}let _e=null;function ue(p){_e=p.target instanceof Element?p.target:null}function ke(p){let N=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!N)return;if(_e&&N.contains(_e)&&_e.closest("input, button, a")){p.preventDefault();return}let te=N.dataset.beadId||"",le=N.dataset.lane||"";x={bead_id:te,from_lane:le};try{p.dataTransfer?.setData("text/plain",te),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Oe(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let N=v.dataset.lane||"";N!=="candidate"&&N!=="queue"&&!/^s[1-5]$/.test(N)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function Xe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Qe(p,v){let N=F.find(we=>we.id===p);if(!N)return;let te=F.filter(we=>we.id!==p),le=te.length;if(v){let we=v.dataset.beadId;if(we===p)return;let Ke=te.findIndex(Ve=>Ve.id===we);Ke>=0&&(le=Ke)}let ye=te.slice();ye.splice(le,0,N),E.applyReorder(p,ye,le)}function Re(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let N=v.dataset.lane||"",te=x?.bead_id||p.dataTransfer?.getData("text/plain")||"",le=x?.from_lane||"";if(x=null,!te)return;let ye=p.target?.closest?.(".worker-mini, .worker-card"),we=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Ke=we.length;if(ye){let Ve=we.indexOf(ye);Ve>=0&&(Ke=Ve)}if(Ke=Math.max(0,Ke-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(Ke=J()),N==="candidate"){if(le==="candidate"){Qe(te,ye);return}(le==="queue"||/^s[1-5]$/.test(le))&&fe(te);return}if(N==="queue"||/^s[1-5]$/.test(N)){let Ve=N==="queue"?"parallel":N;le===N?L(te,Ve,Ke):O(te,Ve,Ke)}}function Je(p){B=p,a_(p),De()}function xe(p){A=p==="board"||p==="created"||p==="spec"?p:Es,u_(A),De()}function mt(p){S=Pt(p)?p:Lt,f_(S),g?.(S),De()}function St(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let Ke=Number.parseInt(v.value,10);Number.isFinite(Ke)&&Pe(Ke).then(De);return}let N=p.target?.closest?.(".worker-filter__blocked");if(N){Je({...B,show_blocked:N.checked});return}let te=p.target?.closest?.(".worker-done-range");if(te){mt(te.value);return}let le=p.target?.closest?.(".worker-sort");if(le){xe(le.value||Es);return}let ye=p.target?.closest?.(".worker-slots__input");if(!ye)return;let we=Number.parseInt(ye.value,10);if(!Number.isFinite(we)){De();return}ie(we).then(De)}function Dt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ut(){let p=Ce();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function yr(){Te&&me.close(),Ne.hidden=!1,Ie.hidden=!1,$e.open(Ut()),De()}function ht(p){let v=w(),N=v.attempts?v.attempts[p]:null;Te=p,$e.close(),Ne.hidden=!0,Ie.hidden=!1,me.open({attempt_id:p,meta:Dt(N)}),De()}function kt(){if($e.isOpen()&&$e.refresh(Ut()),!Te)return;let p=w(),v=p.attempts?p.attempts[Te]:null;if(v){me.updateMeta(Dt(v));return}me.close()}function er(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){$?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){yr();return}let N=v?.closest?.(".worker-repo-op__session");if(N){let k=N.dataset.attemptId;k&&ht(k);return}let te=v?.closest?.(".worker-repo-op__resolve");if(te){R(te.dataset.operationId||"");return}let le=v?.closest?.(".worker-repo-op__dismiss");if(le){V(le.dataset.operationId||"");return}let ye=v?.closest?.(".worker-cleanup__resume");if(ye){let k=ye.dataset.beadId;k&&Z(k);return}let we=v?.closest?.(".worker-banner__resume");if(we){let k=we.dataset.attemptId;k&&U(k);return}let Ke=v?.closest?.(".worker-banner__discard");if(Ke){let k=Ke.dataset.confirmation==="merged"?"merged":"unmerged";st(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,k,Ke.dataset.operationId||null);return}let Ve=v?.closest?.(".worker-banner__dismiss");if(Ve){let k=Ve.dataset.attemptId;k&&P(k);return}if(v?.closest?.(".worker-play")){tt(!w().auto_advance);return}let ce=v?.closest?.(".worker-merge-all");if(ce){ce.classList.contains("worker-merge-all--stop")?w().auto_merge===!0?se(!1):Ye():se(!0);return}let b=v?.closest?.(".worker-pane__hd--toggle");if(b){let k=b.dataset.lane;(k==="queue"||k==="done")&&it(k);return}let G=v?.closest?.(".worker-card__place");if(G){let k=G.dataset.beadId;k&&!G.disabled&&O(k,"parallel",J());return}let oe=v?.closest?.(".worker-filter__chip");if(oe){let k=oe.dataset.spec;(k==="all"||k==="with"||k==="without")&&Je({...B,spec:k});return}let ze=v?.closest?.(".worker-mini__merge");if(ze){let k=ze.dataset.beadId||"";w().cleanup_failed?.[k]?Z(k):Q(k);return}let nt=v?.closest?.(".worker-mini__merge-cancel");if(nt){Ee(nt.dataset.beadId||"");return}let Ue=v?.closest?.(".worker-mini__discard");if(Ue){st(Ue.dataset.beadId||"",Ue.dataset.attemptId||null,Ue.dataset.discardMode==="merged"?"merged":"unmerged",Ue.dataset.operationId||null);return}let ve=v?.closest?.(".worker-mini__revise-fix");if(ve){ft("worker-revise-fix",ve.dataset.beadId||"");return}let y=v?.closest?.(".worker-mini__revise-approve");if(y){ft("worker-revise-approve",y.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let k=v?.closest?.(".rtile"),W=k?.dataset?.beadId,pe=k?.dataset?.attemptId;W&&st(W,pe||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let W=v?.closest?.(".rtile")?.dataset?.attemptId;W&&P(W);return}if(v?.closest?.(".rtile__pause")){let W=v?.closest?.(".rtile")?.dataset?.attemptId;W&&Le(W);return}if(v?.closest?.(".rtile__resume")){let W=v?.closest?.(".rtile")?.dataset?.attemptId;W&&U(W);return}if(v?.closest?.(".rtile__session")){let W=v?.closest?.(".rtile")?.dataset?.attemptId;W&&ht(W);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){$e.close(),me.close();return}if(v?.closest?.(".worker-drawer-host"))return;let f=v?.closest?.(".rtile");if(f){if(v?.closest?.(".rtile__id")){let W=f.dataset.beadId;W&&Rr(W).then(pe=>{pe?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let k=f.dataset.beadId;k&&l&&l(k);return}let u=v?.closest?.(".worker-mini, .worker-card");if(u){let k=u.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){k&&Rr(k).then(W=>{W?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}k&&l&&l(k)}}return e.addEventListener("pointerdown",ue),e.addEventListener("dragstart",ke),e.addEventListener("dragover",Oe),e.addEventListener("dragleave",Xe),e.addEventListener("drop",Re),e.addEventListener("click",er),e.addEventListener("change",St),K(),z(),h&&ne.push(h.subscribe(()=>{for(let[p,v]of M)v==="failed"&&M.delete(p);De()})),s&&ne.push(s.subscribe(()=>{De(),kt()})),De(),{load(){De()},destroy(){for(let p of ne.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",ue),e.removeEventListener("dragstart",ke),e.removeEventListener("dragover",Oe),e.removeEventListener("dragleave",Xe),e.removeEventListener("drop",Re),e.removeEventListener("click",er),e.removeEventListener("change",St);try{me.destroy()}catch{}Ie.hidden=!0;try{$?.destroy()}catch{}je(i``,e)}}}function zo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Oc(e,t,r,n=async()=>{},s=async()=>{}){let o=lt("views:workspace-picker"),a=null,c=!1,l=!1,d=!1;async function _(j){let X=j.target.value,ne=t.getState().workspace?.current?.path||"";if(X&&X!==ne){o("switching workspace to %s",X),c=!0,T();try{await r(X)}catch(ae){o("workspace switch failed: %o",ae)}finally{c=!1,T()}}}async function g(){let j=t.getState(),Y=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!Y||l)){o("git-pulling workspace %s",Y),l=!0,T();try{await n(Y)}catch(X){o("workspace git pull failed: %o",X)}finally{l=!1,T()}}}function h(j){let Y=j.target;Y&&e.contains(Y)||F()}function E(j){j.key==="Escape"&&F()}function x(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),T())}function F(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),T())}function B(){d?F():x()}async function A(j){let Y=j.target,X=Y.value,ge=Y.checked;o("toggling visibility %s \u2192 %s",X,String(ge));try{await s(X,ge)}catch(ne){o("workspace visibility toggle failed: %o",ne)}}function S(j){return j?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${c||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function M(j,Y){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${j.map(X=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!Y.has(X.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${zo(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let j=t.getState(),Y=j.workspace?.current,X=j.workspace?.available||[],ge=new Set(j.workspace?.hidden||[]),ne=Y?.path||X[0]?.path||"";if(X.length===0)return i``;let ae=X.filter(he=>!ge.has(he.path)||he.path===ne);if(ae.length<=1){let he=ae[0]||X[0],Ie=zo(he.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${Ie}</span
          >
          ${M(X,ge)}
          ${S(ne)}
          ${l?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${c||l}
          aria-label="Select project workspace"
        >
          ${ae.map(he=>i`
              <option
                value="${he.path}"
                ?selected=${he.path===ne}
                title="${he.path}"
              >
                ${zo(he.path)}
              </option>
            `)}
        </select>
        ${M(X,ge)}
        ${S(ne)}
        ${c||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){je(I(),e)}return T(),a=t.subscribe(()=>T()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),je(i``,e)}}}var Dc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ho(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Mc(e,t,r=Ho()){return{id:r,type:e,payload:t}}function Pc(e={}){let t=lt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,l=!0,d=new Map,_=[],g=new Map,h=new Set;function E(I){for(let T of Array.from(h))try{T(I)}catch{}}function x(){if(!l||c)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),T=(r.jitterRatio||0)*I,j=Math.max(0,Math.round(I+(Math.random()*2-1)*T));t("ws retry in %d ms (attempt %d)",j,a+1),c=setTimeout(()=>{c=null,M()},j)}function F(I){try{s?.send(JSON.stringify(I))}catch(T){t("ws send failed",T)}}function B(){for(o="open",t("ws open"),E(o),a=0;_.length;){let I=_.shift();I&&F(I)}}function A(I){let T;try{T=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){t("ws received invalid envelope");return}if(d.has(T.id)){let Y=d.get(T.id);d.delete(T.id),T.ok?Y?.resolve(T.payload):Y?.reject(T.error||new Error("ws error"));return}let j=g.get(T.type);if(j&&j.size>0)for(let Y of Array.from(j))try{Y(T.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",T.type)}function S(){o="closed",t("ws closed"),E(o);for(let[I,T]of d.entries())T.reject(new Error("ws disconnected")),d.delete(I);a+=1,x()}function M(){if(!l)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",E(o),s.addEventListener("open",B),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",S)}catch(T){t("ws connect failed %o",T),x()}}return M(),{send(I,T){if(!Dc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let j=Ho(),Y=Mc(I,T,j);return t("send %s id=%s",I,j),new Promise((X,ge)=>{d.set(j,{resolve:X,reject:ge,type:I}),s&&s.readyState===s.OPEN?F(Y):(t("queue %s id=%s (state=%s)",I,j,o),_.push(Y))})},on(I,T){g.has(I)||g.set(I,new Set);let j=g.get(I);return j?.add(T),()=>{j?.delete(T)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){l=!0,c&&(clearTimeout(c),c=null),a=0,M()},close(){l=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function E_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function C_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Go=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],hr="tab:worker:closed",R_="bdui.worker.done-range",Fc=rc,qc="worker:queue",Bc="worker:parallel-analysis",Uc="ui:order",jc="ui:display-policy",Wc="exec:presets",br="tab:board:closed",zc="beads-ui.board.closed-range";function I_(e){let t=lt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&mc(s),o&&a&&c&&l){let Te=function(f,u){let k="Request failed",W="";if(f&&typeof f=="object"){let Me=f;if(typeof Me.message=="string"&&Me.message.length>0&&(k=Me.message),typeof Me.details=="string")W=Me.details;else if(Me.details&&typeof Me.details=="object")try{W=JSON.stringify(Me.details,null,2)}catch{W=""}}else typeof f=="string"&&f.length>0&&(k=f);let pe=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ge.open(pe,k,W)},Ee=function(f){return`${ye.getState().workspace.current?.path||""}\0${f}`},Ye=function(){Le&&(Le().catch(()=>{}),Le=null),U=null,P=null},ft=function(f){C=f;let u=()=>{C!==f||ye.getState().selected_id!==f||(C=null,st(f))};if(!de){Z.then(u);return}u()},ie=function(f,u,k,W,pe){return k!==V[u]?(pe().catch(()=>{}),!1):(f.set(W,pe),!0)},Ce=function(){let f=ye.getState();gt(f.view==="board"),z(f.view==="worker"),Oe(f.view==="monitor"),_e(f.view==="board"||f.view==="worker"||Pe||!!f.selected_id)},at=function(){let f=Ar(Fe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},wt=function(){let f=Ar(ot);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},gt=function(f){if(f)for(let[u,k]of Go){if(tt.has(u)||R.has(u))continue;let W=u===br?at():{type:k};try{$.register(u,W)}catch(Se){t("register %s store failed: %o",u,Se)}R.add(u);let pe=V.board,Me=!1;be.subscribeList(u,W).then(Se=>{Me=!ie(tt,"board",pe,u,Se)}).catch(Se=>{t("subscribe %s failed: %o",u,Se),Te(Se,"board")}).finally(()=>{R.delete(u),Me&&Ce()})}else dt()},dt=function(){V.board+=1;for(let[f]of Go){let u=tt.get(f);u&&(u().catch(()=>{}),tt.delete(f));try{$.unregister(f)}catch(k){t("unregister %s failed: %o",f,k)}}},z=function(f){if(!f){K();return}for(let[u,k]of Nc){if(it.has(u)||R.has(u))continue;let W=u===hr?wt():{type:k};try{$.register(u,W)}catch(Se){t("register %s store failed: %o",u,Se)}R.add(u);let pe=V.worker,Me=!1;be.subscribeList(u,W).then(Se=>{Me=!ie(it,"worker",pe,u,Se)}).catch(Se=>{t("subscribe %s failed: %o",u,Se),Te(Se,"worker")}).finally(()=>{R.delete(u),Me&&Ce()})}},K=function(){V.worker+=1;for(let[f]of Nc){let u=it.get(f);u&&(u().catch(()=>{}),it.delete(f));try{$.unregister(f)}catch(k){t("unregister %s failed: %o",f,k)}}},_e=function(f){if(!f){ue();return}De||($e("subscribe-worker-queue",{id:qc}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),$e("subscribe-worker-parallel-analysis",{id:Bc}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),De=()=>($e("unsubscribe-worker-parallel-analysis",{id:Bc}),$e("unsubscribe-worker-queue",{id:qc})))},ue=function(){De&&(De().catch(()=>{}),De=null),H.clear()},Oe=function(f){if(!f){Xe();return}ke||($e("subscribe-monitor-pipeline",{id:Fc}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),ke=()=>$e("unsubscribe-monitor-pipeline",{id:Fc}))},Xe=function(){ke&&(ke().catch(()=>{}),ke=null)},Re=function(){Qe||($e("subscribe-ui-order",{id:Uc}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Qe=()=>$e("unsubscribe-ui-order",{id:Uc}))},Je=function(){Qe&&(Qe().catch(()=>{}),Qe=null),J.clear()},mt=function(){xe||($e("subscribe-display-policy",{id:jc}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),xe=()=>$e("unsubscribe-display-policy",{id:jc}))},St=function(){xe&&(xe().catch(()=>{}),xe=null),O.clear()},Ut=function(){Dt||($e("subscribe-impl-presets",{id:Wc}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),Dt=()=>$e("unsubscribe-impl-presets",{id:Wc}))},v=function(f){if(!f)return"Unknown";let u=f.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Te,_=Ee,g=Ye,h=ft,E=ie,x=Ce,F=at,B=wt,A=gt,S=dt,M=z,I=K,T=_e,j=ue,Y=Oe,X=Xe,ge=Re,ne=Je,ae=mt,he=St,Ie=Ut,Ae=v;let We=document.getElementById("header-loading"),Ne=ni(We),Ge=Il(e),me=Pc(),$e=Ne.wrapSend((f,u)=>me.send(f,u)),be=Ka($e),$=Za(),w=Ja(),H=Qa(),q=Da(),J=Xa(),O=La(),L=Oa(),fe=Ma();me.on("impl-presets-snapshot",f=>{let u=f;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&L.set({revision:u.revision,presets:u.presets})}),me.on("monitor-pipeline-snapshot",f=>{let u=f;if(!(!u||!Array.isArray(u.workspaces)))try{q.set(u.workspaces,u.workspaces_state)}catch{}}),me.on("ui-order-snapshot",f=>{let u=f;if(u&&typeof u.revision=="number")try{J.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),me.on("display-policy-snapshot",f=>{let u=f;if(u&&u.policy&&typeof u.policy=="object")try{O.set(u.policy)}catch{}}),me.on("session-log-snapshot",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{fe.set(u.attempt_id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),me.on("session-log-append",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{fe.append(u.attempt_id,u.event)}catch{}}),me.on("snapshot",f=>{let u=f,k=u&&typeof u.id=="string"?u.id:"",W=k?$.getStore(k):null;if(W&&u&&u.type==="snapshot")try{W.applyPush(u)}catch{}}),me.on("upsert",f=>{let u=f,k=u&&typeof u.id=="string"?u.id:"",W=k?$.getStore(k):null;if(W&&u&&u.type==="upsert")try{W.applyPush(u)}catch{}}),me.on("delete",f=>{let u=f,k=u&&typeof u.id=="string"?u.id:"",W=k?$.getStore(k):null;if(W&&u&&u.type==="delete")try{W.applyPush(u)}catch{}});let Le=null,U=null,P=null,C=null,Q=()=>{},Z=new Promise(f=>{Q=()=>f(void 0)}),de=!1,se=!1;async function st(f){let u=Ee(f);if(u===U||u===P)return;P=u;let k=`detail:${f}`,W={type:"issue-detail",params:{id:f}};try{$.register(k,W)}catch(pe){t("register detail store failed: %o",pe)}try{let pe=await be.subscribeList(k,W);if(ye.getState().selected_id!==f||Ee(f)!==u){await pe().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=pe,U=u}catch(pe){t("detail subscribe failed: %o",pe),Te(pe,"issue details")}finally{P===u&&(P=null)}}let tt=new Map,R=new Set,V={board:0,worker:0},Pe=!1,Fe=Lt;try{let f=window.localStorage.getItem(zc);Pt(f)&&(Fe=f)}catch{}let ot=Lt;try{let f=window.localStorage.getItem(R_);Pt(f)&&(ot=f)}catch{}async function ct(f){if(!Pt(f)||f===Fe)return;Fe=f;try{window.localStorage.setItem(zc,f)}catch{}let u=tt.get(br);if(!u)return;tt.delete(br),await u().catch(()=>{});let k=at();try{$.register(br,k)}catch(W){t("register %s store failed: %o",br,W)}try{let W=await be.subscribeList(br,k);tt.set(br,W)}catch(W){t("re-subscribe %s failed: %o",br,W),Te(W,"board")}}async function xt(f){if(!Pt(f)||f===ot)return;ot=f;let u=it.get(hr);if(!u)return;it.delete(hr),await u().catch(()=>{});let k=wt();try{$.register(hr,k)}catch(W){t("register %s store failed: %o",hr,W)}try{let W=await be.subscribeList(hr,k);it.set(hr,W)}catch(W){t("re-subscribe %s failed: %o",hr,W),Te(W,"worker")}}let it=new Map,De=null,ke=null,Qe=null,xe=null,Dt=null;async function yr(){xe=null,O.clear(),Dt=null,L.clear(),De=null,ke=null,tt.clear(),it.clear(),V.board+=1,V.worker+=1,Ut();let f=ye.getState().workspace.current?.path;if(f)try{await me.send("set-workspace",{path:f})}catch(k){t("workspace restore after reconnect failed: %o",k);return}mt();let u=ye.getState();gt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),_e(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function ht(){t("clearing all subscriptions for workspace switch"),dt(),K(),ue(),w.clear(),Je(),Re(),St(),mt(),Ye();let f=ye.getState();if(f.selected_id)try{$.unregister(`detail:${f.selected_id}`)}catch{}let u=ye.getState();gt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),_e(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&ft(u.selected_id)}async function kt(f){t("requesting workspace switch to %s",f),se=!0;try{let u=await me.send("set-workspace",{path:f});t("workspace switch result: %o",u),u&&u.workspace&&(ye.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),u.changed&&(await ht(),re("Switched to "+v(f),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),re("Failed to switch workspace","error",3e3),u}finally{se=!1}}async function er(f){t("requesting workspace git pull for %s",f);try{let u=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let k=u?.status;if(k==="up_to_date"){re("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+v(f),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let k=u?.code,W=u?.message;if(k==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let pe=W?`: ${W}`:"";throw re(`Git pull failed${pe}`,"error",3e3),u}}async function p(f,u){t("setting workspace visibility %s \u2192 %s",f,String(u));try{await me.send("set-workspace-visibility",{path:f,visible:u}),await N()}catch(k){t("workspace visibility update failed: %o",k),re("Failed to update project visibility","error",3e3)}}async function N(){try{let f=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let u=f.workspaces.map(Me=>({path:Me.path,database:Me.database,pid:Me.pid,version:Me.version})),k=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,W=Array.isArray(f.hidden)?f.hidden.filter(Me=>typeof Me=="string"):[];ye.setState({workspace:{current:k,available:u,hidden:W}});let pe=window.localStorage.getItem("beads-ui.workspace");pe&&(!u.some(Se=>Se.path===pe)||W.includes(pe)?window.localStorage.removeItem("beads-ui.workspace"):k&&pe!==k.path&&(t("restoring saved workspace preference: %s",pe),await kt(pe)))}}catch(f){t("failed to load workspaces: %o",f)}}me.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ye.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),N(),ht())});let te=!1;if(typeof me.onConnection=="function"){let f=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(te=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&te&&(te=!1,re("Reconnected","success",2200),C_(ye,(k,W)=>{t(`${k}: %o`,W)}),yr())};me.onConnection(f)}let le="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(le=f)}catch(f){t("view parse error: %o",f)}let ye=ri({config:E_(),view:le});me.on("worker-queue-snapshot",f=>{let u=f;if(!u||!u.queue)return;let k=ye.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&u.root_dir!==k){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{w.set(u.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",f=>{let u=f;if(!u)return;let k=ye.getState().workspace.current?.path;if(!(typeof k=="string"&&k.length>0&&typeof u.root_dir=="string"&&u.root_dir!==k))try{H.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let we=ei(ye);we.start();let Ke=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Ve=async(f,u)=>{try{return await $e(f,u)}catch(k){if(Ke.has(f))throw k;return[]}};n&&sc(n,ye,we);let ce=document.getElementById("workspace-picker");ce&&Oc(ce,ye,kt,er,p);let b=lc(e,(f,u)=>$e(f,u));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>b.open())}catch{}let G=pc(e,{policyStore:O,queueStore:w,implPresetStore:L,transport:(f,u)=>$e(f,u),onOpenChange:f=>{Pe=f,Ce()},labelOptions:()=>{let f=new Set;for(let[u]of Go)for(let k of $.snapshotFor(u)||[]){let W=k.labels;if(Array.isArray(W))for(let pe of W)typeof pe=="string"&&pe.length>0&&f.add(pe)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>G.open()))}catch{}let oe=pi(o,{gotoIssue:f=>we.gotoIssue(f),issueStores:$,transport:Ve,workerQueueStore:w,uiOrderStore:J,displayPolicyStore:O,closedRange:Fe,onClosedRangeChange:f=>{ct(f)},onNewIssue:()=>b.open()}),ze=Wo(a,{transport:Ve,issueStores:$,queueStore:w,analysisStore:H,sessionLogStore:fe,uiOrderStore:J,gotoIssue:f=>ye.setState({selected_id:f}),getWorkspacePath:()=>ye.getState().workspace.current?.path,doneRange:ot,onDoneRangeChange:f=>{xt(f)}}),nt=nc(c,{transport:Ve,pipelineStore:q,execPresetStore:L,gotoIssue:f=>we.gotoIssue(f),getWorkspacePath:()=>ye.getState().workspace.current?.path,switchWorkspace:f=>kt(f)}),Ue=Rl(l,{issueStores:$,transport:Ve,queueStore:w,execPresetStore:L,sessionLogStore:fe,getWorkspacePath:()=>ye.getState().workspace.current?.path,onNavigate:f=>{ye.getState().view==="worker"?ye.setState({selected_id:f}):we.gotoIssue(f)},onClose:()=>{let f=ye.getState();ye.setState({selected_id:null});try{we.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{G.open("session")}}),ve=ye.getState().selected_id;ve&&(l.hidden=!1,Ue.load(ve),ft(ve)),ye.subscribe(f=>{let u=f.selected_id;u?(l.hidden=!1,Ue.load(u),se||ft(u)):(Ue.clear(),l.hidden=!0,Ye())});let y=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",gt(f.view==="board"),z(f.view==="worker"),Oe(f.view==="monitor"),_e(f.view==="board"||f.view==="worker"||Pe||!!f.selected_id),!f.selected_id&&f.view==="board"&&oe.load(),f.view==="worker"&&ze.load(),f.view==="monitor"?nt.load():nt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ye.subscribe(y),y(ye.getState()),Re(),mt(),Ut(),N().finally(()=>{de=!0,Q()}),window.addEventListener("keydown",f=>{let u=f.ctrlKey||f.metaKey,k=String(f.key||"").toLowerCase(),W=f.target,pe=W&&W.tagName?String(W.tagName).toLowerCase():"",Me=pe==="input"||pe==="textarea"||pe==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;u&&k==="n"&&(Me||(f.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&I_(t)});export{I_ as bootstrap,E_ as readBootstrapConfig,C_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
