var Ri=Object.create;var Rn=Object.defineProperty;var Ii=Object.getOwnPropertyDescriptor;var Li=Object.getOwnPropertyNames;var Di=Object.getPrototypeOf,Oi=Object.prototype.hasOwnProperty;var Mi=(e,t,r)=>t in e?Rn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var In=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ni=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Li(t))!Oi.call(e,s)&&s!==r&&Rn(e,s,{get:()=>t[s],enumerable:!(n=Ii(t,s))||n.enumerable});return e};var Pi=(e,t,r)=>(r=e!=null?Ri(Di(e)):{},Ni(t||!e||!e.__esModule?Rn(r,"default",{value:e,enumerable:!0}):r,e));var qe=(e,t,r)=>Mi(e,typeof t!="symbol"?t+"":t,r);var lo=In(($u,io)=>{var dr=1e3,ur=dr*60,pr=ur*60,Qt=pr*24,zi=Qt*7,Hi=Qt*365.25;io.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Wi(e);if(r==="number"&&isFinite(e))return t.long?ji(e):Gi(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Wi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Hi;case"weeks":case"week":case"w":return r*zi;case"days":case"day":case"d":return r*Qt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*pr;case"minutes":case"minute":case"mins":case"min":case"m":return r*ur;case"seconds":case"second":case"secs":case"sec":case"s":return r*dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Gi(e){var t=Math.abs(e);return t>=Qt?Math.round(e/Qt)+"d":t>=pr?Math.round(e/pr)+"h":t>=ur?Math.round(e/ur)+"m":t>=dr?Math.round(e/dr)+"s":e+"ms"}function ji(e){var t=Math.abs(e);return t>=Qt?Xr(e,t,Qt,"day"):t>=pr?Xr(e,t,pr,"hour"):t>=ur?Xr(e,t,ur,"minute"):t>=dr?Xr(e,t,dr,"second"):e+" ms"}function Xr(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var uo=In((xu,co)=>{function Yi(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=c,r.humanize=lo(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,w,$;function g(...C){if(!g.enabled)return;let G=g,j=Number(new Date),Z=j-(_||j);G.diff=Z,G.prev=_,G.curr=j,_=j,C[0]=r.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let M=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(x,P)=>{if(x==="%%")return"%";M++;let H=r.formatters[P];if(typeof H=="function"){let de=C[M];x=H.call(G,de),C.splice(M,1),M--}return x}),r.formatArgs.call(G,C),(G.log||r.log).apply(G,C)}return g.namespace=f,g.useColors=r.useColors(),g.color=r.selectColor(f),g.extend=n,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==r.namespaces&&(w=r.namespaces,$=r.enabled(f)),$),set:C=>{h=C}}),typeof r.init=="function"&&r.init(g),g}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,w=0,$=-1,g=0;for(;h<f.length;)if(w<_.length&&(_[w]===f[h]||_[w]==="*"))_[w]==="*"?($=w,g=h,w++):(h++,w++);else if($!==-1)w=$+1,g++,h=g;else return!1;for(;w<_.length&&_[w]==="*";)w++;return w===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function c(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function i(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}co.exports=Yi});var po=In((vt,Qr)=>{vt.formatArgs=Ki;vt.save=Zi;vt.load=Xi;vt.useColors=Vi;vt.storage=Qi();vt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ki(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}vt.log=console.debug||console.log||(()=>{});function Zi(e){try{e?vt.storage.setItem("debug",e):vt.storage.removeItem("debug")}catch{}}function Xi(){let e;try{e=vt.storage.getItem("debug")||vt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Qi(){try{return localStorage}catch{}}Qr.exports=uo()(vt);var{formatters:Ji}=Qr.exports;Ji.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var wr=globalThis,Zr=wr.trustedTypes,Vs=Zr?Zr.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",Ht=`lit$${Math.random().toFixed(9).slice(2)}$`,to="?"+Ht,Fi=`<${to}>`,Zt=document,$r=()=>Zt.createComment(""),xr=e=>e===null||typeof e!="object"&&typeof e!="function",Fn=Array.isArray,qi=e=>Fn(e)||typeof e?.[Symbol.iterator]=="function",Ln=`[ 	
\f\r]`,kr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ks=/-->/g,Zs=/>/g,Vt=RegExp(`>|${Ln}(?:([^\\s"'>=/]+)(${Ln}*=${Ln}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xs=/'/g,Qs=/"/g,ro=/^(?:script|style|textarea|title)$/i,qn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=qn(1),Pt=qn(2),hu=qn(3),Xt=Symbol.for("lit-noChange"),Xe=Symbol.for("lit-nothing"),Js=new WeakMap,Kt=Zt.createTreeWalker(Zt,129);function no(e,t){if(!Fn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vs!==void 0?Vs.createHTML(t):t}var Bi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=kr;for(let c=0;c<r;c++){let i=e[c],d,f,_=-1,h=0;for(;h<i.length&&(a.lastIndex=h,f=a.exec(i),f!==null);)h=a.lastIndex,a===kr?f[1]==="!--"?a=Ks:f[1]!==void 0?a=Zs:f[2]!==void 0?(ro.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Vt):f[3]!==void 0&&(a=Vt):a===Vt?f[0]===">"?(a=s??kr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Vt:f[3]==='"'?Qs:Xs):a===Qs||a===Xs?a=Vt:a===Ks||a===Zs?a=kr:(a=Vt,s=void 0);let w=a===Vt&&e[c+1].startsWith("/>")?" ":"";o+=a===kr?i+Fi:_>=0?(n.push(d),i.slice(0,_)+eo+i.slice(_)+Ht+w):i+Ht+(_===-2?c:w)}return[no(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Sr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,f]=Bi(t,r);if(this.el=e.createElement(d,n),Kt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Kt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(eo)){let h=f[a++],w=s.getAttribute(_).split(Ht),$=/([.?@])?(.*)/.exec(h);i.push({type:1,index:o,name:$[2],strings:w,ctor:$[1]==="."?On:$[1]==="?"?Mn:$[1]==="@"?Nn:lr}),s.removeAttribute(_)}else _.startsWith(Ht)&&(i.push({type:6,index:o}),s.removeAttribute(_));if(ro.test(s.tagName)){let _=s.textContent.split(Ht),h=_.length-1;if(h>0){s.textContent=Zr?Zr.emptyScript:"";for(let w=0;w<h;w++)s.append(_[w],$r()),Kt.nextNode(),i.push({type:2,index:++o});s.append(_[h],$r())}}}else if(s.nodeType===8)if(s.data===to)i.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Ht,_+1))!==-1;)i.push({type:7,index:o}),_+=Ht.length-1}o++}}static createElement(t,r){let n=Zt.createElement("template");return n.innerHTML=t,n}};function ir(e,t,r=e,n){if(t===Xt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=ir(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Zt).importNode(r,!0);Kt.currentNode=s;let o=Kt.nextNode(),a=0,c=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Ar(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Pn(o,this,t)),this._$AV.push(d),i=n[++c]}a!==i?.index&&(o=Kt.nextNode(),a++)}return Kt.currentNode=Zt,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ar=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Xe,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=ir(this,t,r),xr(t)?t===Xe||t==null||t===""?(this._$AH!==Xe&&this._$AR(),this._$AH=Xe):t!==this._$AH&&t!==Xt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Xe&&xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Zt.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Sr.createElement(no(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Js.get(t.strings);return r===void 0&&Js.set(t.strings,r=new Sr(t)),r}k(t){Fn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O($r()),this.O($r()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},lr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Xe,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Xe}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=ir(this,t,r,0),a=!xr(t)||t!==this._$AH&&t!==Xt,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=ir(this,c[n+i],r,i),d===Xt&&(d=this._$AH[i]),a||(a=!xr(d)||d!==this._$AH[i]),d===Xe?t=Xe:t!==Xe&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},On=class extends lr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Xe?void 0:t}},Mn=class extends lr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Xe)}},Nn=class extends lr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=ir(this,t,r,0)??Xe)===Xt)return;let n=this._$AH,s=t===Xe&&n!==Xe||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Xe&&(n===Xe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Pn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){ir(this,t)}};var Ui=wr.litHtmlPolyfillSupport;Ui?.(Sr,Ar),(wr.litHtmlVersions??(wr.litHtmlVersions=[])).push("3.3.1");var Me=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ar(t.insertBefore($r(),o),o,void 0,r??{})}return s._$AI(e),s};var wt="today",Dt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ft(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function cr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function so(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oo(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ao(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var fo=Pi(po(),1);function He(e){return(0,fo.default)(`beads-ui:${e}`)}function At(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Jt(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function go(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ho(e,t){let r=At(e.updated_at),n=At(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function bo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=At(e.created_at),o=At(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function vo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var el=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function _o(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function mo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=el.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function yo(e,t){let r=_o(e),n=_o(t);if(r!==n)return r<n?-1:1;let s=mo(e),o=mo(t);if(s!==o)return s<o?-1:1;let a=At(e&&e.created_at),c=At(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Bn=2**20;function fr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-At(e&&e.created_at)}function Jr(e){return(t,r)=>{let n=fr(t,e),s=fr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Un(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:fr(c,r)-Bn};if(!c)return{rank:fr(a,r)+Bn};let i=fr(a,r),d=fr(c,r),f=(i+d)/2;return i<f&&f<d?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*Bn}))}}function zn(e,t={}){let r=He(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||Jt;function d(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(i)}function _(h){if(c||!h||h.id!==e)return;let w=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let g of $)g&&typeof g.id=="string"&&g.id.length>0&&n.set(g.id,g);f(),o=w,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let g=n.get($.id);if(!g)n.set($.id,$);else{let C=Number.isFinite(g.updated_at)?g.updated_at:0,G=Number.isFinite($.updated_at)?$.updated_at:0;if(C<=G){for(let j of Object.keys(g))j in $||delete g[j];for(let[j,Z]of Object.entries($))g[j]=Z}}f()}o=w,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=w,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function en(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ko(e){let t=He("subs"),r=new Map,n=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let f=Array.isArray(i.added)?i.added:[],_=Array.isArray(i.updated)?i.updated:[],h=Array.isArray(i.removed)?i.removed:[];for(let w of Array.from(d)){let $=r.get(w);if(!$)continue;let g=$.itemsById;for(let C of f)typeof C=="string"&&C.length>0&&g.set(C,!0);for(let C of _)typeof C=="string"&&C.length>0&&g.set(C,!0);for(let C of h)typeof C=="string"&&C.length>0&&g.delete(C)}}async function o(c,i){let d=en(i);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let _=r.get(c);if(_&&_.key!==d){let h=n.get(_.key);h&&(h.delete(c),h.size===0&&n.delete(_.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(_){let h=r.get(c)||null;if(h){let w=n.get(h.key);w&&(w.delete(c),w.size===0&&n.delete(h.key))}throw r.delete(c),_}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let _=r.get(c)||null;if(_){let h=n.get(_.key);h&&(h.delete(c),h.size===0&&n.delete(_.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:en,selectors:{getIds(c){let i=r.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=r.get(c);return d?d.itemsById.has(i):!1},count(c){let i=r.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=r.get(c),d={};if(!i)return d;for(let f of i.itemsById.keys())d[f]=!0;return d}}}}function wo(){let e=He("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,f){let _=d?en(d):"",h=r.get(i)||"",w=t.has(i);if(e("register %s key=%s (prev=%s)",i,_,h),w&&h&&_&&h!==_){let $=t.get(i);if($)try{$.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let C=zn(i,f);t.set(i,C);let G=C.subscribe(()=>o());s.set(i,G)}else if(!w){let $=zn(i,f);t.set(i,$);let g=$.subscribe(()=>o());s.set(i,g)}return r.set(i,_),()=>c(i)}function c(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let f=s.get(i);if(f){try{f()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function $o(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function xo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Hn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function tl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function rl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function So(e){let t=He("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):tl(n),a=rl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Hn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Hn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var nl=Object.freeze({workspace_config:{default_workspace:null}});function Ao(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:nl.workspace_config.default_workspace}}}function To(e={}){let t=He("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ao(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ao(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!c&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Eo(e){let t=He("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(_,h)=>{let w=s++,$=Date.now();n.set(w,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",w,_,r+1),a();let g=!1,C=()=>{g||(g=!0,n.delete(w),c())},G=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,_,Date.now()-$),C())},3e4);try{let j=await d(_,h),Z=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",w,_,Z),j}catch(j){let Z=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,_,Z,j),j}finally{clearTimeout(G),C()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function tn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(vo),i;switch(c){case"created_desc":return i.sort(Jt),i;case"created_asc":return i.sort(go),i;case"updated_desc":return i.sort(ho),i;case"priority":return i.sort(bo),i;case"manual":default:{let d=r();return d?i.sort(Jr(d)):i.sort(Jt),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ct(e){let t=Tr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function kt(e,t){let r=Tr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function rn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Tr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function nn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(Un(c,i,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let w=n(Un(c,i,h.order),a);s(h,w);let $=await t("ui-order-set",{expected_revision:h.revision,entries:w});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function sn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wn(e,t){return!t||typeof e!="string"||e.length===0||sn(t.visible_labels).includes(e)?!0:sn(t.hidden_labels).includes(e)?!1:!sn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function on(e,t){return sn(e).filter(r=>Wn(r,t))}function er(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var sl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Co={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ol={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},al={review:"\u2713",skip:"\u2298"},_r={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function il(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ll(e){let t=e&&e.fill||"none";return t==="none"?_r.none:e&&e.stale===!0?_r.stale:t==="dim"?_r.dim:e&&e.glyph==="review"?_r.review:e&&e.glyph==="skip"?_r.skip:_r.done}function cl(e,t,r){let n=sl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=al[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Co[e]||e}
      </div>
    </div>
  `}function an(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=ol[r],s=e.stages,o=il(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(c=>`${Co[c]||c} ${ll(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(c=>cl(c,s[c]||{},c===o))}
    </div>
  `}function dl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ro=2;function ul(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ro).join(", "),s=r.length-Ro,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function pl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&er(r,"route")){let o=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&er(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&er(r,"pr")){let o=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of on(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&er(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),er(r,"blocked")&&s.push(...ul(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function fl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _l(e){let t=kt(e.created_at),r=kt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ct(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ct(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function ml(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(yo):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${_l(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,c)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${fl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ln(e,t){let r=dl(e.priority);return l`
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
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${pl(e,t)}
      ${e.workflow&&er(t.policy||null,"stepper")?an(e.workflow,e.status):""}
      ${ml(e,t)}
    </article>
  `}function mr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Dt.map(o=>l`<option
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
        ${e.items.map(o=>ln(o,t))}
      </div>
    </section>
  `}function Io(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ln(n,t))}
        </div>
      </div>
    </dialog>
  `}var gl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],hl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],bl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function vl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Lo(e,t,r){return l`
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
        ${gl.map(n=>l`<option
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
        ${hl.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${vl(e,t,r)}
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
        ${bl.map(n=>l`<option
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
  `}var yl=200,kl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},wl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Do="beads-ui.board.sort",Oo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function $l(){try{let e=window.localStorage.getItem(Do);if(e&&Oo.has(e))return e}catch{}return"created_desc"}function Mo(e,t){let r=He("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||wt,_=s?tn(s,a):null,h=nn({transport:o,uiOrderStore:a}),w=[],$=[],g=[],C=[],G=[],j=[],Z=!1,M=0,S=$l(),x=new Map,P=new Map,H=new Map,de=new Set,J={search:"",priority:"",type:"",labels:[]},ie=!1,me=null;function Le(L){return String(L.status||"open")==="open"}function Ye(L){let q=String(L.status||"open");return q==="open"||q==="blocked"}function Se(L){let q=J.search.trim().toLowerCase(),ne=J.priority,oe=J.type,le=J.labels;return L.filter(ve=>{if(q){let u=String(ve.id||"").toLowerCase(),b=String(ve.title||"").toLowerCase();if(!u.includes(q)&&!b.includes(q))return!1}if(ne!==""&&String(ve.priority)!==ne||oe!==""&&String(ve.issue_type||"")!==oe)return!1;if(le.length>0){let u=Array.isArray(ve.labels)?ve.labels:[];if(!le.some(b=>u.includes(b)))return!1}return!0})}function A(){let L=new Set;for(let q of[w,$,g,C,G,j])for(let ne of q){let oe=Array.isArray(ne.labels)?ne.labels:[];for(let le of oe)typeof le=="string"&&le.length>0&&L.add(le)}return Array.from(L).sort()}function K(){return J.search.trim()!==""||J.priority!==""||J.type!==""||J.labels.length>0}function O(){try{if(_){let L=_.selectBoardColumn("tab:board:in-progress","in_progress",S),q=_.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ye),ne=new Set(L.map(X=>X.id)),oe=_.selectBoardColumn("tab:board:ready","ready",S).filter(X=>Le(X)&&!ne.has(X.id)),le=_.selectBoardColumn("tab:board:resolved","resolved",S),ve=_.selectBoardColumn("tab:board:deferred","deferred",S),u=_.selectBoardColumn("tab:board:closed","closed").slice(0,yl),b=[...q,...oe,...L,...le,...u];W(b);let D=new Set;for(let X of b)X&&X.id&&!Gn(X)&&D.add(X.id);let Q=!K();w=Q?Er(q,D):q,$=Q?Er(oe,D):oe,g=Q?Er(L,D):L,C=Q?Er(le,D):le,G=ve,M=ve.length,j=Q?Er(u,D):u,x=new Map;for(let X of w)x.set(X.id,"open");for(let X of $)x.set(X.id,"open");for(let X of g)x.set(X.id,"in_progress");for(let X of C)x.set(X.id,"resolved");for(let X of G)x.set(X.id,"deferred");for(let X of j)x.set(X.id,"closed");P=new Map;for(let X of w)P.set(X.id,"blocked-col");for(let X of $)P.set(X.id,"ready-col");for(let X of g)P.set(X.id,"in-progress-col");for(let X of C)P.set(X.id,"resolved-col");for(let X of j)P.set(X.id,"closed-col")}Ae()}catch{w=[],$=[],g=[],C=[],G=[],j=[],H=new Map,Ae()}}function W(L){let q=new Map;for(let oe of L)oe&&oe.id&&!q.has(oe.id)&&q.set(oe.id,oe);let ne=new Map;for(let oe of q.values()){let le=Gn(oe);if(!le)continue;let ve=ne.get(le);ve||(ve=[],ne.set(le,ve)),ve.push({id:oe.id,title:oe.title,status:oe.status,metadata:oe.metadata,created_at:oe.created_at,updated_at:oe.updated_at})}H=ne}function ue(L){let q=H.get(L)||[],ne=0;for(let le of q)(le.status==="resolved"||le.status==="closed")&&(ne+=1);let oe=rn(q);return{total:q.length,count:ne,current:oe,children:q}}function ce(L){return!de.has(L)}function ke(L,q){L.preventDefault(),L.stopPropagation(),de.has(q)?de.delete(q):de.add(q),Ae()}function he(L,q){L.preventDefault(),L.stopPropagation(),n(q)}function ze(L,q){L.preventDefault(),L.stopPropagation(),n(q)}function pe(L,q){me||n(q)}function De(L,q){L.preventDefault(),L.stopPropagation(),xl(q).then(ne=>{ne&&se("\uBCF5\uC0AC\uB428","success",1200)})}function F(L,q){me=q,L.dataTransfer&&(L.dataTransfer.setData("text/plain",q),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function N(L){L.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{me=null},0)}function fe(L){let q=String(L.target.value||"");!q||q===f||(f=q,i&&i(q),Ae())}function Be(){return c?c.get():null}let R={onCardClick:pe,onCopyId:De,onDragStart:F,onDragEnd:N,onClosedRangeChange:fe,rollupFor:ue,isExpanded:ce,onRollupToggle:ke,onChildClick:he,onFromChipClick:ze,get policy(){return Be()}};function Y(L,q){me||(We(),n(q))}function I(L,q){L.preventDefault(),L.stopPropagation(),We(),n(q)}let re={...R,onCardClick:Y,onChildClick:I,onFromChipClick:I,get policy(){return Be()}};function ee(L){let q=L.target,ne=e.querySelector(".board-filter__labels");q&&ne&&ne.contains(q)||$e()}function be(L){L.key==="Escape"&&$e()}function _e(){ie||(ie=!0,document.addEventListener("mousedown",ee),document.addEventListener("keydown",be),Ae())}function $e(){ie&&(ie=!1,document.removeEventListener("mousedown",ee),document.removeEventListener("keydown",be),Ae())}function Oe(L){L.key==="Escape"&&We()}function st(){Z||(Z=!0,document.addEventListener("keydown",Oe),Ae())}function We(){Z&&(Z=!1,document.removeEventListener("keydown",Oe),Ae())}let tt={onClose:We,onOverlayClick(L){L.target===L.currentTarget&&We()}},dt={onSearchInput(L){J.search=String(L.target.value||""),O()},onPriorityChange(L){J.priority=String(L.target.value||""),O()},onTypeChange(L){J.type=String(L.target.value||""),O()},onSortChange(L){let q=String(L.target.value||"");if(!(!Oo.has(q)||q===S)){S=q;try{window.localStorage.setItem(Do,q)}catch{}O()}},onDeferredToggle(){Z?We():st()},onLabelMenuToggle(){ie?$e():_e()},onLabelToggle(L){let q=J.labels.indexOf(L);q===-1?J.labels.push(L):J.labels.splice(q,1),O()},onLabelClear(){J.labels.length!==0&&(J.labels=[],O())},onNewIssue(){d&&d()}};function ut(){return l`
      <div class="board-view">
        ${Lo(J,dt,{sort_mode:S,deferred_popup_open:Z,deferred_count:M,label_options:A(),label_menu_open:ie})}
        <div class="board-root">
          ${mr({title:"Blocked",id:"blocked-col",items:Se(w)},R)}
          ${mr({title:"Ready",id:"ready-col",items:Se($)},R)}
          ${mr({title:"In progress",id:"in-progress-col",items:Se(g)},R)}
          ${mr({title:"Resolved",id:"resolved-col",items:Se(C)},R)}
          ${mr({title:"Closed",id:"closed-col",items:Se(j),is_closed:!0,closed_range:f},R)}
        </div>
        ${Z?Io({items:Se(G),count:M},re,tt):""}
      </div>
    `}function Ae(){Me(ut(),e),Ve()}function Ve(){try{let L=e.querySelector("#deferred-popup");L&&!L.open&&(typeof L.showModal=="function"?L.showModal():L.setAttribute("open",""));let q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ne of q)Array.from(ne.querySelectorAll(".board-card")).forEach((le,ve)=>{le.tabIndex=ve===0?0:-1})}catch{}}async function rt(L,q){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:q}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ne){r("update-status failed: %o",ne),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(L){switch(L){case"blocked-col":return w;case"ready-col":return $;case"in-progress-col":return g;case"resolved-col":return C;default:return[]}}function pt(L,q,ne){if(!o||!a)return;let oe=lt(L),le=oe.find(Q=>Q.id===q);if(!le)return;let ve=oe.filter(Q=>Q.id!==q),u=ne.closest?ne.closest(".board-card"):null,b=ve.length;if(u){let Q=u.getAttribute("data-issue-id");if(Q===q)return;let X=ve.findIndex(ge=>ge.id===Q);X>=0&&(b=X)}let D=ve.slice();D.splice(b,0,le),h.applyReorder(q,D,b)}function bt(){for(let L of Array.from(e.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let Ue=null;e.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let ne=L.target.closest(".board-column");ne&&ne!==Ue&&(Ue&&Ue.classList.remove("board-column--drag-over"),ne.classList.add("board-column--drag-over"),Ue=ne)}),e.addEventListener("dragleave",L=>{let q=L.relatedTarget;(!q||!e.contains(q))&&Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null)}),e.addEventListener("drop",L=>{L.preventDefault(),Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null);let q=L.target,ne=q.closest(".board-column");if(!ne)return;let oe=L.dataTransfer?.getData("text/plain")||"";if(!oe)return;let le=ne.id,ve=P.get(oe);if(ve&&ve===le){if(wl.has(le)){if(S!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(le,oe,q)}return}let u=kl[le];if(!u){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}x.get(oe)!==u&&rt(oe,u)}),e.addEventListener("keydown",L=>{let q=L.target;if(!(q instanceof HTMLElement))return;let ne=String(q.tagName||"").toLowerCase();if(ne==="input"||ne==="textarea"||ne==="select"||ne==="button"||ne==="a"||q.isContentEditable===!0)return;let oe=q.closest(".board-card");if(!oe)return;let le=String(L.key||"");if(le==="Enter"||le===" "){L.preventDefault();let D=oe.getAttribute("data-issue-id");D&&n(D);return}if(le!=="ArrowUp"&&le!=="ArrowDown"&&le!=="ArrowLeft"&&le!=="ArrowRight")return;L.preventDefault();let ve=oe.closest(".board-column");if(!ve)return;let u=Array.from(ve.querySelectorAll(".board-card")),b=u.indexOf(oe);if(le==="ArrowDown"&&b<u.length-1){ft(oe,u[b+1]);return}if(le==="ArrowUp"&&b>0){ft(oe,u[b-1]);return}if(le==="ArrowLeft"||le==="ArrowRight"){let D=Array.from(e.querySelectorAll(".board-column")),Q=D.indexOf(ve),X=le==="ArrowRight"?1:-1,ge=Q+X;for(;ge>=0&&ge<D.length;){let Ee=D[ge].querySelector(".board-card");if(Ee){ft(oe,Ee);return}ge+=X}}});function ft(L,q){try{L.tabIndex=-1,q.tabIndex=0,q.focus()}catch{}}let Ke=null;_&&_.subscribe&&(Ke=_.subscribe(()=>{try{O()}catch{}}));let Qe=null;return c&&c.subscribe&&(Qe=c.subscribe(()=>{try{O()}catch{}})),{async load(){r("load"),O()},clear(){$e(),We(),Ke&&(Ke(),Ke=null),Qe&&(Qe(),Qe=null),e.replaceChildren(),w=[],$=[],g=[],C=[],G=[],j=[],x=new Map,P=new Map}}}function Gn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Er(e,t){return e.filter(r=>{let n=Gn(r);return!(n&&t.has(n))})}async function xl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Sl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function rr(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function No(e){let t=0;for(let r of qt)t+=rr(e?.[r]);return t}function Po(e){return!e||typeof e!="object"?!1:qt.some(t=>Number.isFinite(e[t]))}function Al(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function gr(e){return Po(e)?`\u03C4 ${Al(No(e))}`:null}function Tt(e){let t=gr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${rr(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${rr(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${rr(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${rr(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${No(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Sl),r.join(`
`)}function Ot(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Po(i)){n+=1;for(let d of qt)r[d]=rr(r[d])+rr(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:jo,setPrototypeOf:Fo,isFrozen:Tl,getPrototypeOf:El,getOwnPropertyDescriptor:Cl}=Object,{freeze:mt,seal:$t,create:Qn}=Object,{apply:Jn,construct:es}=typeof Reflect<"u"&&Reflect;mt||(mt=function(t){return t});$t||($t=function(t){return t});Jn||(Jn=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});es||(es=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var cn=gt(Array.prototype.forEach),Rl=gt(Array.prototype.lastIndexOf),qo=gt(Array.prototype.pop),Cr=gt(Array.prototype.push),Il=gt(Array.prototype.splice),un=gt(String.prototype.toLowerCase),jn=gt(String.prototype.toString),Yn=gt(String.prototype.match),Rr=gt(String.prototype.replace),Ll=gt(String.prototype.indexOf),Dl=gt(String.prototype.trim),Et=gt(Object.prototype.hasOwnProperty),_t=gt(RegExp.prototype.test),Ir=Ol(TypeError);function gt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Jn(e,t,n)}}function Ol(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return es(e,r)}}function xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:un;Fo&&Fo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Tl(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Ml(e){for(let t=0;t<e.length;t++)Et(e,t)||(e[t]=null);return e}function Bt(e){let t=Qn(null);for(let[r,n]of jo(e))Et(e,r)&&(Array.isArray(n)?t[r]=Ml(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Bt(n):t[r]=n);return t}function Lr(e,t){for(;e!==null;){let n=Cl(e,t);if(n){if(n.get)return gt(n.get);if(typeof n.value=="function")return gt(n.value)}e=El(e)}function r(){return null}return r}var Bo=mt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Vn=mt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Kn=mt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nl=mt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zn=mt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Pl=mt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Uo=mt(["#text"]),zo=mt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xn=mt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ho=mt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),dn=mt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Fl=$t(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ql=$t(/<%[\w\W]*|[\w\W]*%>/gm),Bl=$t(/\$\{[\w\W]*/gm),Ul=$t(/^data-[\-\w.\u00B7-\uFFFF]+$/),zl=$t(/^aria-[\-\w]+$/),Yo=$t(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hl=$t(/^(?:\w+script|data):/i),Wl=$t(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Vo=$t(/^html$/i),Gl=$t(/^[a-z][.\w]*(-[.\w]+)+$/i),Wo=Object.freeze({__proto__:null,ARIA_ATTR:zl,ATTR_WHITESPACE:Wl,CUSTOM_ELEMENT:Gl,DATA_ATTR:Ul,DOCTYPE_NAME:Vo,ERB_EXPR:ql,IS_ALLOWED_URI:Yo,IS_SCRIPT_OR_DATA:Hl,MUSTACHE_EXPR:Fl,TMPLIT_EXPR:Bl}),Dr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},jl=function(){return typeof window>"u"?null:window},Yl=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Go=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ko(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jl(),t=E=>Ko(E);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Dr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:w}=e,$=i.prototype,g=Lr($,"cloneNode"),C=Lr($,"remove"),G=Lr($,"nextSibling"),j=Lr($,"childNodes"),Z=Lr($,"parentNode");if(typeof a=="function"){let E=r.createElement("template");E.content&&E.content.ownerDocument&&(r=E.content.ownerDocument)}let M,S="",{implementation:x,createNodeIterator:P,createDocumentFragment:H,getElementsByTagName:de}=r,{importNode:J}=n,ie=Go();t.isSupported=typeof jo=="function"&&typeof Z=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Le,TMPLIT_EXPR:Ye,DATA_ATTR:Se,ARIA_ATTR:A,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:O,CUSTOM_ELEMENT:W}=Wo,{IS_ALLOWED_URI:ue}=Wo,ce=null,ke=xe({},[...Bo,...Vn,...Kn,...Zn,...Uo]),he=null,ze=xe({},[...zo,...Xn,...Ho,...dn]),pe=Object.seal(Qn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,F=null,N=Object.seal(Qn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,Be=!0,R=!1,Y=!0,I=!1,re=!0,ee=!1,be=!1,_e=!1,$e=!1,Oe=!1,st=!1,We=!0,tt=!1,dt="user-content-",ut=!0,Ae=!1,Ve={},rt=null,lt=xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,bt=xe({},["audio","video","img","source","image","track"]),Ue=null,ft=xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ke="http://www.w3.org/1998/Math/MathML",Qe="http://www.w3.org/2000/svg",L="http://www.w3.org/1999/xhtml",q=L,ne=!1,oe=null,le=xe({},[Ke,Qe,L],jn),ve=xe({},["mi","mo","mn","ms","mtext"]),u=xe({},["annotation-xml"]),b=xe({},["title","style","font","a","script"]),D=null,Q=["application/xhtml+xml","text/html"],X="text/html",ge=null,Ee=null,Pe=r.createElement("form"),Ze=function(p){return p instanceof RegExp||p instanceof Function},ot=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===p)){if((!p||typeof p!="object")&&(p={}),p=Bt(p),D=Q.indexOf(p.PARSER_MEDIA_TYPE)===-1?X:p.PARSER_MEDIA_TYPE,ge=D==="application/xhtml+xml"?jn:un,ce=Et(p,"ALLOWED_TAGS")?xe({},p.ALLOWED_TAGS,ge):ke,he=Et(p,"ALLOWED_ATTR")?xe({},p.ALLOWED_ATTR,ge):ze,oe=Et(p,"ALLOWED_NAMESPACES")?xe({},p.ALLOWED_NAMESPACES,jn):le,Ue=Et(p,"ADD_URI_SAFE_ATTR")?xe(Bt(ft),p.ADD_URI_SAFE_ATTR,ge):ft,pt=Et(p,"ADD_DATA_URI_TAGS")?xe(Bt(bt),p.ADD_DATA_URI_TAGS,ge):bt,rt=Et(p,"FORBID_CONTENTS")?xe({},p.FORBID_CONTENTS,ge):lt,De=Et(p,"FORBID_TAGS")?xe({},p.FORBID_TAGS,ge):Bt({}),F=Et(p,"FORBID_ATTR")?xe({},p.FORBID_ATTR,ge):Bt({}),Ve=Et(p,"USE_PROFILES")?p.USE_PROFILES:!1,fe=p.ALLOW_ARIA_ATTR!==!1,Be=p.ALLOW_DATA_ATTR!==!1,R=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Y=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,I=p.SAFE_FOR_TEMPLATES||!1,re=p.SAFE_FOR_XML!==!1,ee=p.WHOLE_DOCUMENT||!1,$e=p.RETURN_DOM||!1,Oe=p.RETURN_DOM_FRAGMENT||!1,st=p.RETURN_TRUSTED_TYPE||!1,_e=p.FORCE_BODY||!1,We=p.SANITIZE_DOM!==!1,tt=p.SANITIZE_NAMED_PROPS||!1,ut=p.KEEP_CONTENT!==!1,Ae=p.IN_PLACE||!1,ue=p.ALLOWED_URI_REGEXP||Yo,q=p.NAMESPACE||L,ve=p.MATHML_TEXT_INTEGRATION_POINTS||ve,u=p.HTML_INTEGRATION_POINTS||u,pe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ze(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ze(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),I&&(Be=!1),Oe&&($e=!0),Ve&&(ce=xe({},Uo),he=[],Ve.html===!0&&(xe(ce,Bo),xe(he,zo)),Ve.svg===!0&&(xe(ce,Vn),xe(he,Xn),xe(he,dn)),Ve.svgFilters===!0&&(xe(ce,Kn),xe(he,Xn),xe(he,dn)),Ve.mathMl===!0&&(xe(ce,Zn),xe(he,Ho),xe(he,dn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?N.tagCheck=p.ADD_TAGS:(ce===ke&&(ce=Bt(ce)),xe(ce,p.ADD_TAGS,ge))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?N.attributeCheck=p.ADD_ATTR:(he===ze&&(he=Bt(he)),xe(he,p.ADD_ATTR,ge))),p.ADD_URI_SAFE_ATTR&&xe(Ue,p.ADD_URI_SAFE_ATTR,ge),p.FORBID_CONTENTS&&(rt===lt&&(rt=Bt(rt)),xe(rt,p.FORBID_CONTENTS,ge)),ut&&(ce["#text"]=!0),ee&&xe(ce,["html","head","body"]),ce.table&&(xe(ce,["tbody"]),delete De.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ir('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ir('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=p.TRUSTED_TYPES_POLICY,S=M.createHTML("")}else M===void 0&&(M=Yl(w,s)),M!==null&&typeof S=="string"&&(S=M.createHTML(""));mt&&mt(p),Ee=p}},we=xe({},[...Vn,...Kn,...Nl]),at=xe({},[...Zn,...Pl]),xt=function(p){let T=Z(p);(!T||!T.tagName)&&(T={namespaceURI:q,tagName:"template"});let z=un(p.tagName),Te=un(T.tagName);return oe[p.namespaceURI]?p.namespaceURI===Qe?T.namespaceURI===L?z==="svg":T.namespaceURI===Ke?z==="svg"&&(Te==="annotation-xml"||ve[Te]):!!we[z]:p.namespaceURI===Ke?T.namespaceURI===L?z==="math":T.namespaceURI===Qe?z==="math"&&u[Te]:!!at[z]:p.namespaceURI===L?T.namespaceURI===Qe&&!u[Te]||T.namespaceURI===Ke&&!ve[Te]?!1:!at[z]&&(b[z]||!we[z]):!!(D==="application/xhtml+xml"&&oe[p.namespaceURI]):!1},Ge=function(p){Cr(t.removed,{element:p});try{Z(p).removeChild(p)}catch{C(p)}},it=function(p,T){try{Cr(t.removed,{attribute:T.getAttributeNode(p),from:T})}catch{Cr(t.removed,{attribute:null,from:T})}if(T.removeAttribute(p),p==="is")if($e||Oe)try{Ge(T)}catch{}else try{T.setAttribute(p,"")}catch{}},ye=function(p){let T=null,z=null;if(_e)p="<remove></remove>"+p;else{let je=Yn(p,/^[\r\n\t ]+/);z=je&&je[0]}D==="application/xhtml+xml"&&q===L&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Te=M?M.createHTML(p):p;if(q===L)try{T=new h().parseFromString(Te,D)}catch{}if(!T||!T.documentElement){T=x.createDocument(q,"template",null);try{T.documentElement.innerHTML=ne?S:Te}catch{}}let nt=T.body||T.documentElement;return p&&z&&nt.insertBefore(r.createTextNode(z),nt.childNodes[0]||null),q===L?de.call(T,ee?"html":"body")[0]:ee?T.documentElement:nt},Ce=function(p){return P.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},St=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Re=function(p){return typeof c=="function"&&p instanceof c};function y(E,p,T){cn(E,z=>{z.call(t,p,T,Ee)})}let U=function(p){let T=null;if(y(ie.beforeSanitizeElements,p,null),St(p))return Ge(p),!0;let z=ge(p.nodeName);if(y(ie.uponSanitizeElement,p,{tagName:z,allowedTags:ce}),re&&p.hasChildNodes()&&!Re(p.firstElementChild)&&_t(/<[/\w!]/g,p.innerHTML)&&_t(/<[/\w!]/g,p.textContent)||p.nodeType===Dr.progressingInstruction||re&&p.nodeType===Dr.comment&&_t(/<[/\w]/g,p.data))return Ge(p),!0;if(!(N.tagCheck instanceof Function&&N.tagCheck(z))&&(!ce[z]||De[z])){if(!De[z]&&te(z)&&(pe.tagNameCheck instanceof RegExp&&_t(pe.tagNameCheck,z)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(z)))return!1;if(ut&&!rt[z]){let Te=Z(p)||p.parentNode,nt=j(p)||p.childNodes;if(nt&&Te){let je=nt.length;for(let Je=je-1;Je>=0;--Je){let yt=g(nt[Je],!0);yt.__removalCount=(p.__removalCount||0)+1,Te.insertBefore(yt,G(p))}}}return Ge(p),!0}return p instanceof i&&!xt(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&_t(/<\/no(script|embed|frames)/i,p.innerHTML)?(Ge(p),!0):(I&&p.nodeType===Dr.text&&(T=p.textContent,cn([me,Le,Ye],Te=>{T=Rr(T,Te," ")}),p.textContent!==T&&(Cr(t.removed,{element:p.cloneNode()}),p.textContent=T)),y(ie.afterSanitizeElements,p,null),!1)},B=function(p,T,z){if(We&&(T==="id"||T==="name")&&(z in r||z in Pe))return!1;if(!(Be&&!F[T]&&_t(Se,T))){if(!(fe&&_t(A,T))){if(!(N.attributeCheck instanceof Function&&N.attributeCheck(T,p))){if(!he[T]||F[T]){if(!(te(p)&&(pe.tagNameCheck instanceof RegExp&&_t(pe.tagNameCheck,p)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(p))&&(pe.attributeNameCheck instanceof RegExp&&_t(pe.attributeNameCheck,T)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(T,p))||T==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&_t(pe.tagNameCheck,z)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(z))))return!1}else if(!Ue[T]){if(!_t(ue,Rr(z,O,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&p!=="script"&&Ll(z,"data:")===0&&pt[p])){if(!(R&&!_t(K,Rr(z,O,"")))){if(z)return!1}}}}}}}return!0},te=function(p){return p!=="annotation-xml"&&Yn(p,W)},m=function(p){y(ie.beforeSanitizeAttributes,p,null);let{attributes:T}=p;if(!T||St(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},Te=T.length;for(;Te--;){let nt=T[Te],{name:je,namespaceURI:Je,value:yt}=nt,Nt=ge(je),or=yt,et=je==="value"?or:Dl(or);if(z.attrName=Nt,z.attrValue=et,z.keepAttr=!0,z.forceKeepAttr=void 0,y(ie.uponSanitizeAttribute,p,z),et=z.attrValue,tt&&(Nt==="id"||Nt==="name")&&(it(je,p),et=dt+et),re&&_t(/((--!?|])>)|<\/(style|title|textarea)/i,et)){it(je,p);continue}if(Nt==="attributename"&&Yn(et,"href")){it(je,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){it(je,p);continue}if(!Y&&_t(/\/>/i,et)){it(je,p);continue}I&&cn([me,Le,Ye],jr=>{et=Rr(et,jr," ")});let ar=ge(p.nodeName);if(!B(ar,Nt,et)){it(je,p);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!Je)switch(w.getAttributeType(ar,Nt)){case"TrustedHTML":{et=M.createHTML(et);break}case"TrustedScriptURL":{et=M.createScriptURL(et);break}}if(et!==or)try{Je?p.setAttributeNS(Je,je,et):p.setAttribute(je,et),St(p)?Ge(p):qo(t.removed)}catch{it(je,p)}}y(ie.afterSanitizeAttributes,p,null)},v=function E(p){let T=null,z=Ce(p);for(y(ie.beforeSanitizeShadowDOM,p,null);T=z.nextNode();)y(ie.uponSanitizeShadowNode,T,null),U(T),m(T),T.content instanceof o&&E(T.content);y(ie.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(E){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,z=null,Te=null,nt=null;if(ne=!E,ne&&(E="<!-->"),typeof E!="string"&&!Re(E))if(typeof E.toString=="function"){if(E=E.toString(),typeof E!="string")throw Ir("dirty is not a string, aborting")}else throw Ir("toString is not a function");if(!t.isSupported)return E;if(be||ot(p),t.removed=[],typeof E=="string"&&(Ae=!1),Ae){if(E.nodeName){let yt=ge(E.nodeName);if(!ce[yt]||De[yt])throw Ir("root node is forbidden and cannot be sanitized in-place")}}else if(E instanceof c)T=ye("<!---->"),z=T.ownerDocument.importNode(E,!0),z.nodeType===Dr.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?T=z:T.appendChild(z);else{if(!$e&&!I&&!ee&&E.indexOf("<")===-1)return M&&st?M.createHTML(E):E;if(T=ye(E),!T)return $e?null:st?S:""}T&&_e&&Ge(T.firstChild);let je=Ce(Ae?E:T);for(;Te=je.nextNode();)U(Te),m(Te),Te.content instanceof o&&v(Te.content);if(Ae)return E;if($e){if(Oe)for(nt=H.call(T.ownerDocument);T.firstChild;)nt.appendChild(T.firstChild);else nt=T;return(he.shadowroot||he.shadowrootmode)&&(nt=J.call(n,nt,!0)),nt}let Je=ee?T.outerHTML:T.innerHTML;return ee&&ce["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&_t(Vo,T.ownerDocument.doctype.name)&&(Je="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+Je),I&&cn([me,Le,Ye],yt=>{Je=Rr(Je,yt," ")}),M&&st?M.createHTML(Je):Je},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ot(E),be=!0},t.clearConfig=function(){Ee=null,be=!1},t.isValidAttribute=function(E,p,T){Ee||ot({});let z=ge(E),Te=ge(p);return B(z,Te,T)},t.addHook=function(E,p){typeof p=="function"&&Cr(ie[E],p)},t.removeHook=function(E,p){if(p!==void 0){let T=Rl(ie[E],p);return T===-1?void 0:Il(ie[E],T,1)[0]}return qo(ie[E])},t.removeHooks=function(E){ie[E]=[]},t.removeAllHooks=function(){ie=Go()},t}var Zo=Ko();var Xo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qo=e=>(...t)=>({_$litDirective$:e,values:t}),pn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Or=class extends pn{constructor(t){if(super(t),this.it=Xe,t.type!==Xo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Xe||t==null)return this._t=void 0,this.it=t;if(t===Xt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Or.directiveName="unsafeHTML",Or.resultType=1;var Jo=Qo(Or);function ss(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var sr=ss();function aa(e){sr=e}var Fr={exec:()=>null};function Ie(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(ht.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Vl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ht={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Kl=/^(?:[ \t]*(?:\n|$))+/,Zl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ql=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,os=/(?:[*+-]|\d{1,9}[.)])/,ia=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,la=Ie(ia).replace(/bull/g,os).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jl=Ie(ia).replace(/bull/g,os).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),as=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ec=/^[^\n]+/,is=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tc=Ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",is).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rc=Ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,os).getRegex(),bn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ls=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nc=Ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ls).replace("tag",bn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ca=Ie(as).replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),sc=Ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ca).getRegex(),cs={blockquote:sc,code:Zl,def:tc,fences:Xl,heading:Ql,hr:qr,html:nc,lheading:la,list:rc,newline:Kl,paragraph:ca,table:Fr,text:ec},ea=Ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),oc={...cs,lheading:Jl,table:ea,paragraph:Ie(as).replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ea).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex()},ac={...cs,html:Ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ls).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Fr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ie(as).replace("hr",qr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",la).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ic=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,lc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,da=/^( {2,}|\\)\n(?!\s*$)/,cc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vn=/[\p{P}\p{S}]/u,ds=/[\s\p{P}\p{S}]/u,ua=/[^\s\p{P}\p{S}]/u,dc=Ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ds).getRegex(),pa=/(?!~)[\p{P}\p{S}]/u,uc=/(?!~)[\s\p{P}\p{S}]/u,pc=/(?:[^\s\p{P}\p{S}]|~)/u,fc=Ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Vl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),fa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,_c=Ie(fa,"u").replace(/punct/g,vn).getRegex(),mc=Ie(fa,"u").replace(/punct/g,pa).getRegex(),_a="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gc=Ie(_a,"gu").replace(/notPunctSpace/g,ua).replace(/punctSpace/g,ds).replace(/punct/g,vn).getRegex(),hc=Ie(_a,"gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,uc).replace(/punct/g,pa).getRegex(),bc=Ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ua).replace(/punctSpace/g,ds).replace(/punct/g,vn).getRegex(),vc=Ie(/\\(punct)/,"gu").replace(/punct/g,vn).getRegex(),yc=Ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kc=Ie(ls).replace("(?:-->|$)","-->").getRegex(),wc=Ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,$c=Ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ma=Ie(/^!?\[(label)\]\[(ref)\]/).replace("label",mn).replace("ref",is).getRegex(),ga=Ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",is).getRegex(),xc=Ie("reflink|nolink(?!\\()","g").replace("reflink",ma).replace("nolink",ga).getRegex(),ta=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,us={_backpedal:Fr,anyPunctuation:vc,autolink:yc,blockSkip:fc,br:da,code:lc,del:Fr,emStrongLDelim:_c,emStrongRDelimAst:gc,emStrongRDelimUnd:bc,escape:ic,link:$c,nolink:ga,punctuation:dc,reflink:ma,reflinkSearch:xc,tag:wc,text:cc,url:Fr},Sc={...us,link:Ie(/^!?\[(label)\]\((.*?)\)/).replace("label",mn).getRegex(),reflink:Ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mn).getRegex()},ts={...us,emStrongRDelimAst:hc,emStrongLDelim:mc,url:Ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ta).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ta).getRegex()},Ac={...ts,br:Ie(da).replace("{2,}","*").getRegex(),text:Ie(ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fn={normal:cs,gfm:oc,pedantic:ac},Mr={normal:us,gfm:ts,breaks:Ac,pedantic:Sc},Tc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ra=e=>Tc[e];function Ut(e,t){if(t){if(ht.escapeTest.test(e))return e.replace(ht.escapeReplace,ra)}else if(ht.escapeTestNoEncode.test(e))return e.replace(ht.escapeReplaceNoEncode,ra);return e}function na(e){try{e=encodeURI(e).replace(ht.percentDecode,"%")}catch{return null}return e}function sa(e,t){let r=e.replace(ht.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(ht.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ht.slashPipe,"|");return n}function Nr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ec(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function oa(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,i}function Cc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var gn=class{constructor(e){qe(this,"options");qe(this,"rules");qe(this,"lexer");this.options=e||sr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Nr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Cc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Nr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Nr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Nr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))c.push(r[i]),a=!0;else if(!a)c.push(r[i]);else break;r=r.slice(i);let d=c.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,$=w.raw+`
`+r.join(`
`),g=this.blockquote($);o[o.length-1]=g,n=n.substring(0,n.length-w.raw.length)+g.raw,s=s.substring(0,s.length-w.text.length)+g.text;break}else if(h?.type==="list"){let w=h,$=w.raw+`
`+r.join(`
`),g=this.list($);o[o.length-1]=g,n=n.substring(0,n.length-h.raw.length)+g.raw,s=s.substring(0,s.length-w.raw.length)+g.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),h=e.split(`
`,1)[0],w=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):w?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex($),C=this.rules.other.hrRegex($),G=this.rules.other.fencesBeginRegex($),j=this.rules.other.headingBeginRegex($),Z=this.rules.other.htmlBeginRegex($);for(;e;){let M=e.split(`
`,1)[0],S;if(h=M,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),S=h):S=h.replace(this.rules.other.tabCharGlobal,"    "),G.test(h)||j.test(h)||Z.test(h)||g.test(h)||C.test(h))break;if(S.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+S.slice($);else{if(w||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||G.test(_)||j.test(_)||C.test(_))break;f+=`
`+h}!w&&!h.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),_=S.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=f.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=f.raw+i.tokens[0].raw,i.tokens[0].text=f.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(f)):i.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):i.tokens.unshift(f)}}if(!s.loose){let d=i.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=sa(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(sa(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Nr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ec(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),oa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return oa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let w=_.slice(1,-1);return{type:"em",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ct=class rs{constructor(t){qe(this,"tokens");qe(this,"options");qe(this,"state");qe(this,"inlineQueue");qe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||sr,this.options.tokenizer=this.options.tokenizer||new gn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ht,block:fn.normal,inline:Mr.normal};this.options.pedantic?(r.block=fn.pedantic,r.inline=Mr.pedantic):this.options.gfm&&(r.block=fn.gfm,this.options.breaks?r.inline=Mr.breaks:r.inline=Mr.gfm),this.tokenizer.rules=r}static get rules(){return{block:fn,inline:Mr}}static lex(t,r){return new rs(r).lex(t)}static lexInline(t,r){return new rs(r).inlineTokens(t)}lex(t){t=t.replace(ht.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(ht.tabCharGlobal,"    ").replace(ht.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},c),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(f=>(i=f.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let f=r.at(-1);i.type==="text"&&f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,c)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):r.push(i);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},hn=class{constructor(e){qe(this,"options");qe(this,"parser");this.options=e||sr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(ht.notSpaceStart)?.[0],s=e.replace(ht.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Ut(n)+'">'+(r?s:Ut(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Ut(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ut(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=na(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ut(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=na(e);if(s===null)return Ut(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ut(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ut(e.text)}},ps=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Rt=class ns{constructor(t){qe(this,"options");qe(this,"renderer");qe(this,"textRenderer");this.options=t||sr,this.options.renderer=this.options.renderer||new hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ps}static parse(t,r){return new ns(r).parse(t)}static parseInline(t,r){return new ns(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},_n,Pr=(_n=class{constructor(e){qe(this,"options");qe(this,"block");this.options=e||sr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ct.lex:Ct.lexInline}provideParser(){return this.block?Rt.parse:Rt.parseInline}},qe(_n,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qe(_n,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_n),Rc=class{constructor(...e){qe(this,"defaults",ss());qe(this,"options",this.setOptions);qe(this,"parse",this.parseMarkdown(!0));qe(this,"parseInline",this.parseMarkdown(!1));qe(this,"Parser",Rt);qe(this,"Renderer",hn);qe(this,"TextRenderer",ps);qe(this,"Lexer",Ct);qe(this,"Tokenizer",gn);qe(this,"Hooks",Pr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new hn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],i=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new gn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Pr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],i=s[a];Pr.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Pr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,d);return i.call(s,_)})();let f=c.call(s,d);return i.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,d);return _===!1&&(_=await i.apply(s,d)),_})();let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ct.lex(e,t??this.defaults)}parser(e,t){return Rt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ut(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},nr=new Rc;function Ne(e,t){return nr.parse(e,t)}Ne.options=Ne.setOptions=function(e){return nr.setOptions(e),Ne.defaults=nr.defaults,aa(Ne.defaults),Ne};Ne.getDefaults=ss;Ne.defaults=sr;Ne.use=function(...e){return nr.use(...e),Ne.defaults=nr.defaults,aa(Ne.defaults),Ne};Ne.walkTokens=function(e,t){return nr.walkTokens(e,t)};Ne.parseInline=nr.parseInline;Ne.Parser=Rt;Ne.parser=Rt.parse;Ne.Renderer=hn;Ne.TextRenderer=ps;Ne.Lexer=Ct;Ne.lexer=Ct.lex;Ne.Tokenizer=gn;Ne.Hooks=Pr;Ne.parse=Ne;var Np=Ne.options,Pp=Ne.setOptions,Fp=Ne.use,qp=Ne.walkTokens,Bp=Ne.parseInline;var Up=Rt.parse,zp=Ct.lex;function Wt(e){let t=Ne.parse(e),r=Zo.sanitize(t);return Jo(r)}function zt(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function br(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function yn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Ic={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Lc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Dc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Gt(e){return!!e&&typeof e=="object"}function fs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ha(e,t){let r=fs(e),n=fs(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Oc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Gt(s)&&typeof s.text=="string"?s.text:"").join(""):Gt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Mc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Ic[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=fs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ha(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let i=ha(Gt(c)?c.old_string:"",Gt(c)?c.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ba(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function va(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Lc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Dc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Nc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Gt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(va(o.text));else if(o.type==="thinking"){let a=ba(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Mc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Gt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Oc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Pc(e){if(e.type==="item.completed"&&Gt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[va(t.text)];if(t.type==="reasoning"){let r=ba(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Fc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ya(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!Gt(o))continue;let a=Fc(o)?Pc(o):Nc(o,r);for(let c of a)t.push(c)}return t}var qc=5,Bc=10,Uc=/Task\s+#(\d+)/,zc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Hc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function kn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Wc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Gc(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function jc(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=Uc.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Yc(e){if(e.tool==="Bash"){let t=e.command||"";return zc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Hc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Vc(e){let t=e.filter(s=>s.kind==="tool").slice(-Bc),r=new Map;t.forEach((s,o)=>{let a=Yc(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Kc(e){let t=Gc(e);if(t)return{text:t,guess:!1};let r=jc(e);if(r)return{text:r,guess:!1};let n=Vc(e);return n?{text:n,guess:!0}:null}function Zc(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:kt(e,t)}function wn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,f=null,_=null,h=!1,w=!1,$=!1,g=null,C=null;function G(){h=!1,w=!1,$=!1,g=null,C=null}async function j(F){if(r){w=!0,$=!1,O();try{let N=await Promise.resolve(r("get-attempt-prompt",{attempt_id:F}));if(o!==F)return;!N||typeof N!="object"||Array.isArray(N)?$=!0:(g=N,C=F)}catch{o===F&&($=!0)}finally{o===F&&(w=!1,O())}}}function Z(){if(h=!h,h&&o&&C!==o){j(o);return}O()}function M(){if(!h)return"";let F=br({loading:w,error:$});if(F)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${F}
      </div>`;if(!g)return"";if(g.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let N=yn(g.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${N?l`<div class="prompt-block__meta">${N} 발송</div>`:""}
      ${typeof g.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",g.task_prompt):""}
      ${typeof g.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",g.system_prompt):""}
    </div>`}function S(){if(!o||!n)return[];let F=n.get(o);return ya(F?F.lines:[])}function x(){if(!o||!n)return null;let F=n.get(o),N=F?F.last_event_at:null;return typeof N=="number"?N:null}function P(){return a.status==="running"}function H(){if(P()&&o){_||(_=setInterval(()=>O(),1e3));return}de()}function de(){_&&(clearInterval(_),_=null)}function J(F){let N=[],fe=0;for(;fe<F.length;){let Be=F[fe];if(Be.kind==="tool"){let R=fe;for(;R<F.length&&F[R].kind==="tool"&&F[R].tool===Be.tool;)R+=1;if(R-fe>=qc&&!d.has(fe)){N.push({kind:"group",idx:fe,tool:Be.tool||"",lines:F.slice(fe,R).map((Y,I)=>({idx:fe+I,line:Y}))}),fe=R;continue}}N.push({kind:"line",idx:fe,line:Be}),fe+=1}return N}function ie(F){for(let N=F.length-1;N>=0;N-=1){let fe=F[N];if(fe.kind==="result"||fe.kind==="error")return null;if(fe.kind==="tool"&&!Object.hasOwn(fe,"result"))return fe}return null}function me(F){for(let N=F.length-1;N>=0;N-=1)if(F[N].kind==="thinking")return F[N];return null}function Le(F,N){if(N.kind==="gate")return l`<div class="sv__gate">${N.text}</div>`;if(N.kind==="phase")return l`<div class="sv__phase">${N.text}</div>`;if(N.kind==="result")return l`<div
        class="sv__result${N.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${N.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Wt(N.text||(N.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(N.kind==="thinking"){let fe=i.has(F);return l`<div
        class="sv__think${fe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(F)}
      >
        <span class="sv__think-line">💭 ${kn(N.text)}</span>
        ${fe?l`<pre class="sv__think-expand">${N.text}</pre>`:""}
      </div>`}if(N.kind==="error")return l`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="blocker")return l`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="tool"){let fe=i.has(F),Be=N.tool==="Bash"?Wc(N.command):0,R=N.tool==="Bash"?Be>1?kn(N.command):N.command:N.path||N.command||"";return l`<div
        class="sv__tool${fe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ue(F)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${N.icon}</span>
          <span class="sv__tool-name">${N.tool}</span>
          ${R?l`<span class="sv__tool-detail">${R}</span>`:""}
          ${Be>1?l`<span class="sv__tool-more">⋯ ${Be}줄</span>`:""}
          ${typeof N.added=="number"?l`<span class="sv__diff-add">+${N.added}</span>`:""}
          ${typeof N.removed=="number"?l`<span class="sv__diff-del">−${N.removed}</span>`:""}
          ${N.result?l`<span class="sv__tool-ok">→ ${N.result}</span>`:""}
        </span>
        ${fe?l`<pre class="sv__tool-expand">${Ye(N)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Wt(N.text||"")}</div>`}function Ye(F){let N=[];if(F.tool==="Bash"&&typeof F.command=="string"&&F.command.length>0)N.push(F.command);else if(F.input!==void 0)try{N.push(`input: ${JSON.stringify(F.input,null,2)}`)}catch{}return typeof F.output=="string"&&F.output.length>0&&N.push(`output:
${F.output}`),N.join(`

`)}function Se(){if(!o)return l``;let F=S(),N=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),fe=a.session_id||"",Be=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,R=P(),Y=R?Zc(x(),Date.now()):"",I=R?ie(F):null,re=R?me(F):null,ee=Kc(F);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ee?l`<span
              class="sv__stage${ee.guess?" sv__stage--guess":""}"
              title=${ee.text}
              >${ee.text}</span
            >`:""}
        ${R?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Y?l`<span class="sv__live-ago">${Y}</span>`:""}</span
            >`:""}
        ${fe?l`<button
              type="button"
              class="sv__session"
              title=${fe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${fe}`}
              @click=${()=>ke(fe)}
            >
              ⧉ ${fe.slice(0,8)}
            </button>`:""}
        ${N?l`<span class="sv__meta">${N}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Z}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Be}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${Be}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>De()}
        >
          ✕
        </button>
      </div>
      ${M()}
      <div class="sv__body">
        ${F.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:J(F).map(be=>be.kind==="group"?A(be):Le(be.idx,be.line))}
      </div>
      ${I||re?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${I?l`<span class="sv__now-icon">${I.icon}</span>
                  <span class="sv__now-name">${I.tool}</span>
                  <span class="sv__now-detail"
                    >${I.tool==="Bash"?kn(I.command):I.path||I.command||""}</span
                  >`:""}
            ${re?l`<span class="sv__now-think"
                  >💭 ${kn(re.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function A(F){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>K(F.idx)}
    >
      <span class="sv__group-icon">${F.lines[0].line.icon}</span>
      <span class="sv__group-name">${F.tool}</span>
      <span class="sv__group-count">${F.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function K(F){d.add(F),O()}function O(){Me(Se(),e),H(),c&&W()}function W(){let F=e.querySelector(".sv__body");F&&(F.scrollTop=F.scrollHeight)}function ue(F){i.has(F)?i.delete(F):i.add(F),O()}function ce(){c=!c,O()}function ke(F){tr(F).then(N=>{N?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function he(F){!o||!F||(a={...a,...F},O())}function ze(F){let N=F.target;if(!N||!N.classList||!N.classList.contains("sv__body"))return;!(N.scrollHeight-N.scrollTop-N.clientHeight<=4)&&c&&(c=!1,O())}e.addEventListener("scroll",ze,!0);function pe(F){let N=F&&F.attempt_id;N&&(o=N,a=F.meta||{},c=!0,i.clear(),d.clear(),G(),!f&&n&&(f=n.subscribe(O)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),O())}function De(){let F=o;o=null,i.clear(),d.clear(),G(),de(),r&&F&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${F}`})).catch(()=>{}),Me(l``,e),s&&s()}return{open:pe,updateMeta:he,close:De,isOpen(){return o!==null},destroy(){de(),f&&(f(),f=null),e.removeEventListener("scroll",ze,!0),o=null,Me(l``,e)}}}function Xc(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function ka(e,t){let r=Xc(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
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
                  @click=${s=>t.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Qc="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Jc=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ed=/^\*\*결론\*\* — (.+)$/;function wa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Qc)return null;let r=Jc.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?ed.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var $a=20;function xa(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function td(e){return e.length>$a?`${e.slice(0,$a)}\u2026`:e}function rd(e,t,r,n){let s=`${t.lane} ${td(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${xa(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Wt(t.body)}
        </div>`:""}
  </div>`}function nd(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${xa(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Wt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Sa(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=wa(typeof i.text=="string"?i.text:"");return d?rd(i,d,t,s.has(i.id)):nd(i)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${i=>t.onDraftInput&&t.onDraftInput(i.target.value)}
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
  `}var _s=["opus","sonnet","haiku","fable"],ms=["low","medium","high","xhigh"],gs=["codex","opus","fable","self","skip"],hs=["opus","fable","sonnet","haiku"],sd=["standard","fast_track"],bs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function $n(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:bs[e]||"(\uAE30\uBCF8)"}function Br(e,t,r,n,s,o){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${r.map(a=>l`<option value=${a.value} ?selected=${a.value===n}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Ur(e,t){let r=e.map(n=>({value:n,label:n}));return typeof t=="string"?[{value:"",label:t},...r]:r}function Aa(e,t,r){let n=e&&e.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Br("orchestration_model","orchestration_model",Ur(_s,$n("orchestration_model",s)),n.orchestration_model||"",!1,t)}
    ${Br("orchestration_effort","orchestration_effort",Ur(ms,$n("orchestration_effort",s)),n.orchestration_effort||"",!1,t)}
    ${Br("review_model","review_model",Ur(gs,$n("review_model",s)),n.review_model||"",!1,t)}
    ${Br("impl_model","impl_model",Ur(hs,$n("impl_model",s)),n.impl_model||"",!1,t)}
    ${Br("workflow_mode","workflow_mode",Ur(sd),o,n.workflow_mode==="fast_track",t)}
  `}function od(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ta(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${od(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Wt(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Me(d(),e)}async function _($){s=$,o="loading",a="",c="",f();let g=r?r():"";if(!g){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let C="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent($);try{let G=await n(C),j=await G.json().catch(()=>({}));if(!G.ok||!j||j.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||G.status)+")",f();return}a=String(j.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Me(l``,e)}function w(){document.removeEventListener("keydown",i),h()}return{open:_,close:h,destroy:w}}var ad=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Ea="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function id(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ld(e){let t=gr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Ea}
          >부분 집계</span
        >`:""}`}function cd(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${ad.map(r=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${id(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Ea}</span>`:""}
  </div>`}var dd={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ud(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ca(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),w=_&&!h,$=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${$}
      @click=${g=>{g.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return l`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},i=d=>{if(!gr(d.usage))return"";let f=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${ld(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>l`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${dd[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?l`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${gr(d.usage)?l`<span class="detail-session__usage"
                    >${gr(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ud(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?cd(d.usage):""}
          </div>`)}
    </div>
  `}function Ra(e,t={}){return l`
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
    ${e.expanded?l`<div class="detail-prompt" data-seam="task-prompt">
          ${pd(e)}
        </div>`:""}
  `}function pd(e){let t=br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=yn(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var fd=["open","in_progress","deferred","resolved","closed"],_d=[0,1,2,3,4];function Ia(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.sessionLogStore,i=null,d=null,f={},_=!1,h=!1,w="",$="",g="";function C(){_=!1,h=!1,w="",$="",g=""}let G=[],j=null,Z=null,M=!1,S="",x=!1,P=0,H=new Set;function de(){G=[],j=null,Z=null,M=!1,S="",x=!1,P+=1,H.clear()}async function J(y){if(!s)return;let U=++P;try{let B=await Promise.resolve(s("get-comments",{id:y}));if(U!==P||y!==i)return;G=Array.isArray(B)?B:[],M=!1}catch{if(U!==P||y!==i)return;M=!0}Re()}function ie(){if(!s||!i)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(j!==i){j=i,Z=y,J(i);return}y!==null&&y!==Z&&(Z=y,J(i))}function me(y){H.has(y)?H.delete(y):H.add(y),Re()}function Le(y){let U=S.trim().length===0;S=y,U!==(y.trim().length===0)&&Re()}async function Ye(){let y=S.trim();if(!s||!i||y.length===0||x)return;let U=i;x=!0,Re();let B=!1;try{let te=await Promise.resolve(s("add-comment",{id:U,text:y}));Array.isArray(te)&&te.length>0&&(B=!0,U===i&&(G=te,M=!1,S="",Z=te.length))}catch{B=!1}B||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),U===i&&(x=!1),Re()}let Se={onToggle:me,onDraftInput:Le,onSubmit:Ye},A=document.createElement("div");A.className="md-viewer-root",document.body.appendChild(A);let K=Ta(A,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),O=document.createElement("div");O.className="session-log-root",document.body.appendChild(O);let W=wn(O,{transport:s?(y,U)=>Promise.resolve(s(y,U)):void 0,sessionLogStore:c}),ue=!1,ce=!1,ke=!1,he=null,ze=null,pe=0;function De(){ue=!1,ce=!1,ke=!1,he=null,ze=null,pe+=1}async function F(y){if(!s)return;let U=++pe;ce=!0,ke=!1,Re();try{let B=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(U!==pe)return;!B||typeof B!="object"||Array.isArray(B)?ke=!0:(he=B,ze=y)}catch{U===pe&&(ke=!0)}finally{U===pe&&(ce=!1,Re())}}function N(){if(ue=!ue,ue&&i&&ze!==i){F(i);return}Re()}function fe(){if(!a||!i)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(B=>B&&B.bead_id===i).sort((B,te)=>(te.started_at||0)-(B.started_at||0)).map(B=>({attempt_id:B.attempt_id,bead_id:B.bead_id,status:B.status,started_at:typeof B.started_at=="number"?B.started_at:null,runner:B.runner||null,model:B.model||null,session_id:B.session_id||null,resumed_from:B.resumed_from||null,dismissed_at:typeof B.dismissed_at=="number"?B.dismissed_at:null,cause:typeof B.cause=="string"?B.cause:null,cause_detail:B.cause_detail||null,usage:B.usage||null}))}function Be(){if(!a||!i)return null;let y=a.get();return Ot(y&&y.attempts||{},i)}let R=new Set;function Y(y){R.has(y)?R.delete(y):R.add(y),Re()}function I(y){let U=a?a.get():null,B=U&&U.attempts?U.attempts[y]:null;W.open({attempt_id:y,meta:B?{runner:B.runner||void 0,model:B.model||void 0,effort:B.effort||void 0,status:B.status||void 0,session_id:B.session_id||void 0}:{}})}async function re(y){if(!s||!y)return;let U=()=>{let te=a?a.get():null;return te&&typeof te.revision=="number"?te.revision:0},B=await s("worker-attempt-resume",{attempt_id:y,expected_revision:U()});if(B&&B.conflict){let te=B.queue&&typeof B.queue.revision=="number"?B.queue.revision:U();B=await s("worker-attempt-resume",{attempt_id:y,expected_revision:te})}B&&B.resumed===!1&&!B.conflict&&B.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${B.reason}`,"error",2400)}let ee={onOpen:I,onResume:re,onToggleUsage:Y};function be(){let y=a?a.get():null,U=y&&y.exec_defaults;return U&&typeof U=="object"?U:{}}let _e=null;r&&r.subscribe&&(_e=r.subscribe(()=>st()));let $e=null;a&&typeof a.subscribe=="function"&&($e=a.subscribe(()=>{i&&Re()}));function Oe(y){y.key==="Escape"&&i&&(y.preventDefault(),n())}document.addEventListener("keydown",Oe);function st(){if(i){if(r&&typeof r.snapshotFor=="function"){let y=r.snapshotFor("detail:"+i)||[];d=y.find(B=>B&&B.id===i)||y[0]||d}ie(),Re()}}function We(y){tr(y).then(U=>{U?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function tt(y){y.preventDefault(),y.stopPropagation(),i&&We(i)}function dt(y,U){y.preventDefault(),y.stopPropagation(),We(U)}function ut(y,U){y.preventDefault(),y.stopPropagation(),K.open(U)}function Ae(y,U){f[y]=U,Re(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:y,value:U})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ve(y,U,B){if(!s||!i)return!1;try{let te=await Promise.resolve(s(y,U)),m=Array.isArray(te)?te[0]:te;return m&&typeof m=="object"&&m.id?(d=m,!0):(se(B,"error"),!1)}catch{return se(B,"error"),!1}}function rt(y){setTimeout(()=>{try{let U=e.querySelector(y);U&&typeof U.focus=="function"&&U.focus()}catch{}},0)}function lt(){_=!0,w=d&&d.title||"",Re(),rt('.detail-edit__input[data-edit="title"]')}function pt(y){w=y.target.value}function bt(){_=!1,w="",Re()}function Ue(){Ve("edit-text",{id:i,field:"title",value:w},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(U=>{U&&(_=!1,w=""),Re()})}function ft(){h=!0,$=d&&d.description||"",Re(),rt('.detail-edit__textarea[data-edit="description"]')}function Ke(y){$=y.target.value}function Qe(){h=!1,$="",Re()}function L(){Ve("edit-text",{id:i,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(U=>{U&&(h=!1,$=""),Re()})}function q(y,U,B,te){if(y.key==="Escape"){y.stopPropagation(),B();return}y.key==="Enter"&&(!te||y.ctrlKey||y.metaKey)&&(y.preventDefault(),U())}function ne(y){let U=y.target.value;Ve("update-status",{id:i,status:U},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Re())}function oe(y){let U=Number(y.target.value);Ve("update-priority",{id:i,priority:U},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Re())}function le(y){g=y.target.value}function ve(){let y=g.trim();y.length!==0&&Ve("label-add",{id:i,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(U=>{U&&(g=""),Re()})}function u(y){if(y.key==="Escape"){y.stopPropagation(),g="",Re();return}y.key==="Enter"&&(y.preventDefault(),ve())}function b(y){Ve("label-remove",{id:i,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Re())}let D={onCopyPath:dt,onOpenDoc:ut},Q={onChange:Ae};function X(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function ge(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ee(y){let B=(Array.isArray(y.dependencies)?y.dependencies:[]).map(te=>({id:X(te),icon:ge(te)})).filter(te=>te.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${B.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${B.map(te=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(te.id)}
                  >
                    ${te.icon?`${te.icon} `:""}${te.id}
                  </button>`:l`<span class="detail-dep"
                    >${te.icon?`${te.icon} `:""}${te.id}</span
                  >`)}
          </div>`}
    `}function Pe(y){let U=y.metadata||{},B=y.workflow||{},te=B.stages||{},m=te.spec&&te.spec.stale,v=te.impl&&te.impl.stale,E=B.route_source==="derived",p=B.route||U.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${E?" detail-kv__v--derived":""}"
          title=${E?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${E&&B.route?`${p} ? (\uCD94\uB860)`:p}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${U.spec_review||"\uC5C6\uC74C"}${m?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${U.impl_review||"\uC5C6\uC74C"}${v?" \xB7 stale":""}</span
        >
      </div>
      ${U.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${U.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"]};async function ot(y,U){let B=U.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&B!=="full_plan"&&!window.confirm(`full_plan \u2192 ${B||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Re();return}await Ve("update-workflow-meta",{id:i,key:y,value:B},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Re()}function we(y){let U=y.metadata||{};return l` ${((te,m)=>{let v=Ze[te],E=typeof U[te]=="string"?U[te]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${te}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${te}
          data-edit=${`wfmeta-${te}`}
          @change=${p=>ot(te,p)}
        >
          <option value="" ?selected=${!v.includes(E)}>
            ${m}
          </option>
          ${v.map(p=>l`<option value=${p} ?selected=${E===p}>${p}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function at(y){return _?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${w}
            @input=${pt}
            @keydown=${U=>q(U,Ue,bt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ue}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${bt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${lt}
        >
          ✎
        </button>
      </div>
    `}function xt(y){let U=ct(y.created_at),B=ct(y.updated_at);return!U&&!B?l``:l`
      ${U?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${U}</span>
          </div>`:""}
      ${B?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${B}</span>
          </div>`:""}
    `}function Ge(y,U){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ne}
        >
          ${fd.map(B=>l`<option value=${B} ?selected=${B===y}>${B}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${oe}
        >
          ${_d.map(B=>l`<option value=${String(B)} ?selected=${B===U}>
                P${B}
              </option>`)}
        </select>
      </div>
    `}function it(y){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${h?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ft}
            >
              ✎
            </button>`}
      </div>
      ${h?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${Ke}
              @keydown=${U=>q(U,L,Qe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${L}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Qe}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ye(y){let U=typeof y.notes=="string"?y.notes:"";return U.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${U}</div>
    `}function Ce(y){let U=Array.isArray(y.labels)?y.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${U.map(B=>l`<span class="detail-label-chip"
              >${B}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${B}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+B}
                @click=${()=>b(B)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${g}
            @input=${le}
            @keydown=${u}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ve}
          >
            추가
          </button>
        </span>
      </div>
    `}function St(){if(!i)return l``;let y=d||{},U=String(y.id||i),B=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",te=y.status||"open",m=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",v=y.description||"",E={...y,metadata:{...y.metadata||{},...f}};return l`
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
            @click=${tt}
          >
            ${U}
          </button>
          ${at(B)} ${Ge(te,m)}
          ${xt(y)} ${it(v)}
          ${Sa(G,Se,{expanded:H,draft:S,sending:x,error:M})}
          ${ye(y)} ${Ce(y)} ${Ee(y)}
          ${Pe(y)} ${we(y)}
          ${ka(y,D)}
          ${Aa(E,Q,be())}
          ${Ra({expanded:ue,loading:ce,error:ke,data:he},{onToggle:N})}
          ${Ca(fe(),ee,{total:Be(),expanded:R})}
        </div>
      </div>
    `}function Re(){Me(St(),e)}return{load(y){y!==i&&(f={},C(),de(),De()),i=y,d=null,st()},clear(){i=null,d=null,f={},C(),de(),De(),K.close(),W.close(),Me(l``,e)},destroy(){_e&&(_e(),_e=null),$e&&($e(),$e=null),document.removeEventListener("keydown",Oe),K.destroy(),A.parentNode&&A.parentNode.removeChild(A),W.destroy(),O.parentNode&&O.parentNode.removeChild(O),i=null,d=null,de(),De(),Me(l``,e)}}}var md=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function La(e,t){return Wn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function gd(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Da(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(x){let P=r.get();if(P)try{let H=await n("display-policy-set",{expected_revision:P.revision,policy:x(P)});i(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:x(H.policy)}),i(H)),H&&H.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function d(x){let P=r.get();if(!P)return;let H=La(x,P)!=="shown";c(de=>gd(x,de,H))}function f(){let x=a.trim();x.length!==0&&(a="",c(P=>P.hidden_prefixes.includes(x)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,x]}),C())}function _(x){c(P=>({hidden_prefixes:P.hidden_prefixes.filter(H=>H!==x)}))}function h(x){let P=r.get();if(!P)return;let H=P.chips[x]===!1;c(()=>({chips:{[x]:H}}))}function w(x){let P=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${P.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${P.map(H=>{let de=La(H,x);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${de}`}
                  data-label=${H}
                  data-state=${de}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function $(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(P=>l`<span class="display-settings__prefix">
                ${P}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${P} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(P)}
                >
                  ×
                </button>
              </span>`)}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${a}
            @input=${P=>{a=String(P.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function g(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${md.map(([P,H])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${P}
                  .checked=${x.chips[P]!==!1}
                  @change=${()=>h(P)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function C(){let x=r.get();Me(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${S}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${x?l`${w(x)} ${$(x)}
                ${g(x)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let G=!1,j=()=>{G=!1};o.addEventListener("close",j),o.addEventListener("cancel",j);let Z=null;r.subscribe&&(Z=r.subscribe(()=>{G&&C()}));function M(){G||(a="",G=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){G&&(G=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:M,close:S,destroy(){G=!1,o.removeEventListener("close",j),o.removeEventListener("cancel",j),Z&&(Z(),Z=null),o.remove()}}}function Oa(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function Ma(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Na(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var hd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Pa=160;function bd(e){return e.length>Pa?`${e.slice(0,Pa)}\u2026`:e}var vd=[{key:"orchestration_model",values:()=>_s},{key:"orchestration_effort",values:()=>ms},{key:"review_model",values:()=>gs},{key:"impl_model",values:()=>hs}];function xn(e,t){let{queueStore:r,transport:n,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let A=a();return typeof A.revision=="number"?A.revision:0}function i(){let A=a().exec_defaults;return A&&typeof A=="object"?A:{}}function d(A){A&&A.queue&&r&&r.set(A.queue)}async function f(A,K){if(!n)return;let O={key:A,value:K||null};try{let W=await n("worker-queue-set-exec-default",{...O,expected_revision:c()});d(W),W&&W.conflict&&(W=await n("worker-queue-set-exec-default",{...O,expected_revision:c()}),d(W)),W&&W.conflict&&se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(A,K,O){let W=!!O&&!K.includes(O);return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${A}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${A}`}
        data-key=${A}
        @change=${ue=>{f(A,ue.target.value)}}
      >
        <option value="" ?selected=${!O}>
          ${bs[A]||"(\uAE30\uBCF8)"}
        </option>
        ${W?l`<option value=${O} ?selected=${!0}>
              ${O} (비호환)
            </option>`:""}
        ${K.map(ue=>l`<option value=${ue} ?selected=${O===ue}>${ue}</option>`)}
      </select>
    </div>`}function h(){let A=a().workspace_info;return A&&typeof A=="object"?A:{}}function w(A,K){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${A}"
      >${K}</span
    >`}function $(A){let K=A?Na(A.cmd):"",O=A?Ma(A.timeout_ms):"",W=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${K?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${w("config","config")}
            ${O?l`<span class="exec-defaults__vd-meta"
                  >timeout ${O}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(A){let K=A?Na(A.cmd):"",O=A?Ma(A.timeout_ms):"",W=O?`timeout ${O} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ue=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${K?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${w("config","config")}
            ${A.detached===!0?w("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ue}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(A){if(!A||typeof A!="object")return"";let K=hd[String(A.outcome)];if(!K)return"";let O=A.outcome==="failed"&&A.reason?`${K.label} \xB7 ${A.reason}`:K.label,W=[ct(A.at),typeof A.bead_id=="string"?A.bead_id:"",typeof A.base_sha=="string"?A.base_sha.slice(0,7):""].filter(ke=>ke.length>0).join(" \xB7 "),ue=typeof A.detail=="string"&&A.detail.length>0?bd(A.detail):"",ce=typeof A.log_path=="string"&&A.log_path.length>0?A.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${w(K.modifier,O)}
        ${W?l`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
      ${ue?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ue}</code>
          </div>`:""}
      ${ce?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ce}</code>
          </div>`:""}
    </div>`}let G=!1,j=!1,Z=!1,M=null;async function S(){if(n){j=!0,Z=!1,J();try{let A=await Promise.resolve(n("get-worker-system-prompt",{}));!A||typeof A!="object"||Array.isArray(A)?Z=!0:M=A}catch{Z=!0}finally{j=!1,J()}}}function x(){if(G=!G,G&&!M){S();return}J()}function P(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${G?"true":"false"}
          @click=${x}
        >
          ${G?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${G?H():""}
    </section>`}function H(){let A=br({loading:j,error:Z});if(A)return A;if(!M)return"";let K=Array.isArray(M.variants)?M.variants:[];return l`<div class="exec-defaults__sp-body">
      ${M.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(O=>l`<div class="exec-defaults__sp-variant" data-variant=${O.key}>
            <div class="exec-defaults__sp-cond">${O.condition}</div>
            ${zt(O.label,O.system_prompt)}
          </div>`)}
    </div>`}function de(A){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(A.verify_cmd)} ${g(A.deploy_cmd)}
      ${C(A.last_deploy)}
    </section>`}function J(){let A=i();Me(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Se}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${vd.map(K=>_(K.key,K.values(),A[K.key]||""))}
            ${de(h())}
            ${P()}
          </div>
        </div>
      `,o)}let ie=!1,me=()=>{ie=!1};o.addEventListener("close",me),o.addEventListener("cancel",me);let Le=null;r&&r.subscribe&&(Le=r.subscribe(()=>{ie&&J()}));function Ye(){ie||(ie=!0,J(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function Se(){ie&&(ie=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:Ye,close:Se,destroy(){ie=!1,o.removeEventListener("close",me),o.removeEventListener("cancel",me),Le&&(Le(),Le=null),o.remove()}}}function vr(e){let t=kt(e.created_at),r=kt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ct(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${ct(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function vs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Tt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?kt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=l`<span class="worker-mini__title">${e.title}</span>`,h=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",w=r.map(x=>x===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${x}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${x}</span
        >`),$=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",g=n?l`<span class="worker-usage" title=${hr(e.usage)}
        >${n}</span
      >`:"",C=s?l`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",G=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Z=e.discard_action?l`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",M=e.revise_action?l`<button
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
        </button>`:"",S=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return l`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?l`<div class="worker-mini__row1">${d}${f}${_}</div>
          <div class="worker-mini__row2">
            ${g}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ct(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${w}${C}
            <span class="worker-mini__actions"
              >${G}${j}${Z}</span
            >
            ${vr(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${f}${h}${w}${$}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${S?l`<div class="worker-mini__foot">
                  ${g}${C}
                  <span class="worker-mini__actions"
                    >${G}${j}${Z}${M}</span
                  >
                </div>`:""}
            ${vr(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${f}${_}${h}${w}${$}${g}${C}${G}${j}${Z}
            </div>
            ${vr(e)}`}
  </div>`}function yd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?l`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?an(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
            class="worker-card__reason${a?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${vr(e)}
  </div>`}function Mt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?l`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return l`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?l`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?yd(n):vs(n))}
          </div>`}
  </section>`}var Fa=160;function ys(e){return e.length>Fa?`${e.slice(0,Fa)}\u2026`:e}function kd(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${ys(e.command)}</code>`:""}
  </div>`}function wd(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function $d(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ks(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function xd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?l`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:l`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?l`<div class="worker-banner__detail">
          남은 작업: <code>${ys(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?l`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:l`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?l`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function qa(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${kd(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>l`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?l`<div class="worker-banner__detail">
                <code>${ys(r.detail)}</code>
              </div>`:""}
          ${$d(r.log_path)} ${wd(r.output_tail)}
        </div>`)}
    ${xd(e.shipFailure)}
  </div>`}function Sd(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ks(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=Tt(e.usage),c=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return l`<div
    class="rtile${d?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?l`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${n?l`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:l`<button
            type="button"
            class="rtile__pause"
            ?disabled=${e.can_pause===!1}
            title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||c||i?l`<div class="rtile__meta">
          ${c?l`<span class="worker-mini__badge">${c}</span>`:""}
          ${i?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?l`<span class="rtile__runner">${o}</span>`:""}
          ${a?l`<span class="worker-usage" title=${hr(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ws(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Sd(s,t,r))}
  </div>`}function jt(e){return l`<svg
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
  </svg>`}function $s(){return jt(Pt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function xs(){return jt(Pt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ss(){return jt(Pt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ba(){return jt(Pt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ua(){return jt(Pt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function za(){return jt(Pt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ha(){return jt(Pt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Wa(){return jt(Pt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var zr=1,Ad=6e4,Td={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Ed=new Set(["auto_merge","merged","merge","done"]),Ga={running:3,paused:2,failed:1};function Cd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Rd(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Ga[d.run_state],h=Ga[c];if(_>h||_===h&&(d.started_at??0)>(i??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Ot(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!n.has(a.attempt_id)})}return o}function ja(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function It(e){return e&&typeof e=="object"?e:{}}function As(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let c=[],i=[],d=[],f=[],_=[],h=new Map;for(let g of n){if(!g||typeof g.root_dir!="string")continue;let C=g.root_dir,G=g.name||C,j=a.get(C),Z=j&&typeof j.revision=="number"?j.revision:typeof g.revision=="number"?g.revision:0,M=It(g.attempts),S=It(g.bead_titles),x=It(g.pr_observations),P=It(g.admission),H=It(g.revise_parked),de=It(g.merge_queue_state),J=It(g.cleanup_failed),ie=Array.isArray(g.merge_queue)?g.merge_queue:[],me=new Set(ie.filter(O=>O&&typeof O.bead_id=="string").map(O=>O.bead_id)),Le=Array.isArray(g.queue)?g.queue:[],Ye=Array.isArray(g.done)?g.done:[],Se=new Map;for(let O of Ye)O&&typeof O.bead_id=="string"&&typeof O.added_at=="number"&&Se.set(O.bead_id,O.added_at);let A=O=>({id:O,title:S[O]||O,root_dir:C,workspace_name:G,expected_revision:Z,draggable:!1}),K=new Set;for(let[O,W]of Rd(M,Se))K.add(O),i.push({...A(O),lane:"running",attempt_id:W.attempt_id,run_state:W.run_state,can_pause:W.can_pause,can_resume:W.can_resume,started_at:W.started_at,last_event_at:W.last_event_at,model:W.model,usage:W.usage,badges:W.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:W.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:W.run_state==="failed"});for(let O of Array.isArray(g.pr_wait)?g.pr_wait:[]){let W=O&&O.bead_id;if(typeof W!="string"||K.has(W))continue;K.add(W);let ue=It(x[W]),ce=It(ue.pr),ke=ue.gate?It(ue.gate):null,he=me.has(W),ze=de.active===W,pe=O.external===!0,De=J[W]||null,F=!!ke&&ke.base_badge==="\uCDA9\uB3CC",N=!!De&&!!ke&&ke.tier==="merged",fe=pe&&!!ke&&ke.tier==="merged";d.push({...A(W),lane:"pr_wait",pr_number:typeof ce.number=="number"?ce.number:null,pr_url:typeof ce.url=="string"?ce.url:void 0,external:pe,usage:Ot(M,W),badges:De?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!De,reason:De?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!he,merge_enabled:ke?.enabled===!0||F||N||fe,merge_label:fe?"\uC815\uB9AC":F&&!N?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:fe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":N?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":F?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:he,cancel_enabled:!ze,discard_action:!pe&&!De&&!(ke&&ke.tier==="merged"),discard_enabled:!ze&&!he,discard_title:he?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let O=0;O<Le.length;O++){let W=Le[O],ue=W&&W.bead_id;if(typeof ue!="string"||K.has(ue))continue;K.add(ue);let ce=H[ue],ke={...A(ue),lane:"queue",reason:ja(P,ue),queue_position:O+1,queue_index:O,queue_length:Le.length,badges:ce?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ce,revise_action:!!ce,revise_enabled:!!ce,revise_title:ce?ce.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ce.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(ke);let he=h.get(C);he?he.push(ke):h.set(C,[ke])}for(let O of Array.isArray(g.runnable)?g.runnable:[]){let W=O&&O.bead_id;typeof W!="string"||K.has(W)||(K.add(W),c.push({...A(W),title:O.title||S[W]||W,lane:"runnable",draggable:!0,reason:ja(P,W),created_at:O.created_at??void 0,updated_at:O.updated_at??void 0,labels:Array.isArray(O.labels)?O.labels:[],workflow:O.route?{route:O.route,chips:{route:O.route}}:null,place_index:Le.length}))}for(let O of Ye){let W=O&&O.bead_id;if(typeof W!="string"||K.has(W)||(K.add(W),o!==void 0&&typeof O.added_at=="number"&&O.added_at<o))continue;let ue=Cd(M,W);_.push({...A(W),lane:"done",done:!0,usage:Ot(M,W),done_at:typeof O.added_at=="number"?O.added_at:void 0,done_kind:ue&&typeof ue.done_kind=="string"?ue.done_kind:null})}}i.sort((g,C)=>(C.last_event_at??0)-(g.last_event_at??0)),_.sort((g,C)=>(C.done_at??0)-(g.done_at??0));let w=s.length>0?s:n.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),$=[];for(let g of w)!g||typeof g.root_dir!="string"||$.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=zr?g.slots:zr,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:It(g.exec_defaults),items:h.get(g.root_dir)||[]});return{runnable:c,queue:f,queue_groups:$,running:i,pr_wait:d,done:_,automation:{total:$.length,both_on:$.filter(g=>g.auto_advance&&g.auto_merge).length}}}function Id(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Ad;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ct(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${kt(e,t)}</span
        >`}</span
  >`}function Hr(e){return l`<div class="mon-c__title">${e.title}</div>`}function Wr(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Sn(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ts(e){let t=Tt(e.usage);return t?l`<span class="mon-c__usage" title=${hr(e.usage)}
        >${t}</span
      >`:""}function Es(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Ld(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${xs()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${$s()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Ss()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ba()}
        </button>`:""}
  </span>`}function Dd(e,t){let r=typeof e.started_at=="number"?ks(t-e.started_at):"";return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Es(e)}${Id(e.last_event_at,t)}${Wr(e)}${Sn(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ts(e)}${Ld(e)}
    </div>`}function Od(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=kt(e.updated_at);return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Wr(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${on(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${Sn(e)}
      ${o?l`<span title=${`\uC218\uC815 ${ct(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function Md(e){return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Wr(e)}
      ${Es(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
    ${e.revise_action?l`<div class="mon-c__tail">
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
        </div>`:""}`}function Nd(e){let t=!!(Tt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${Sn(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Es(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${Ts(e)}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function Pd(e,t){let r=e.done_kind||"",n=r?Td[r]||r:"",s=kt(e.done_at,t);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${Sn(e)}
      ${n?l`<span
            class="mon-live__kind${Ed.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ts(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ct(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ya(e,t){return e.lane==="running"?Dd(e,t):e.lane==="runnable"?Od(e):e.lane==="queue"?Md(e):e.lane==="pr_wait"?Nd(e):Pd(e,t)}function Va(e){let t=String(e.revision);return l`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?xs():$s()}
        <span class="mon-ctl__label">진행</span>
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
        ${Ua()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${za()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${zr}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        aria-haspopup="dialog"
        aria-label=${`${e.name} \uC2E4\uD589 \uAE30\uBCF8\uAC12`}
        title="실행 기본값"
      >
        ${Ha()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Ka(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Dt.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ss():Wa()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
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
        ${Dt.map(o=>l`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function Za(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Xa(e){let t={};for(let a of qt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of qt){let f=c[d];typeof f=="number"&&Number.isFinite(f)&&(t[d]+=f,r=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?Tt(t):null}var Ja="bdui.monitor.done-range";function Fd(){try{let e=window.localStorage.getItem(Ja);return Ft(e)?e:wt}catch{return wt}}function qd(e){try{window.localStorage.setItem(Ja,e)}catch{}}var ei="tab:monitor:pipeline",Bd=1e3,Ud=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Qa(e,t){let r=e.lane==="runnable"||e.lane==="queue";return l`<div
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
    ${Ya(e,t)}
  </div>`}function ti(e,t){let r=He("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(R=>typeof globalThis.confirm!="function"||globalThis.confirm(R)),f=Fd();function _(){let R=Dt.find(Y=>Y.value===f);return R?R.label:""}let h=document.createElement("div");h.className="mon",e.appendChild(h);let w=As(null,null),$=null,g=new Map,C=new Set;function G(R){return w.queue_groups.find(Y=>Y.root_dir===R)||null}let Z=xn(e,{queueStore:{get(){if(!$)return{revision:0,exec_defaults:{}};let R=g.get($);if(R)return R;let Y=G($),I=s&&s.get?s.get():null,re=(Array.isArray(I)?I:[]).find(ee=>ee&&ee.root_dir===$);return{revision:Y?Y.revision:0,exec_defaults:Y?Y.exec_defaults:{},workspace_info:re?re.workspace_info:void 0}},set(R){$&&g.set($,R);for(let Y of Array.from(C))Y()},subscribe(R){return C.add(R),()=>C.delete(R)}},transport:o?(R,Y)=>o(R,{...Y||{},root_dir:$}):void 0,getWorkspacePath:()=>$||void 0}),M=null,S=null;async function x(R,Y,I,re){if(!o||!I)return null;let ee=await o(R,{...Y,root_dir:I,expected_revision:re});if(ee&&ee.conflict){let be=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:re;ee=await o(R,{...Y,root_dir:I,expected_revision:be})}return ee&&ee.queue&&I&&g.set(I,ee.queue),ee}async function P(R,Y,I){return!o||!I?null:await o(R,{...Y,root_dir:I})}async function H(R){if(!o||!R&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let Y=await o("monitor-auto-toggle",{on:R}),I=Y&&Array.isArray(Y.failed)?Y.failed:[];I.length>0&&se(`\uC790\uB3D9\uD654 ${R?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(re=>re.root_dir).join(", ")}`,"error",3200)}async function de(){let R=new Map;for(let Y of w.pr_wait)R.has(Y.root_dir)||R.set(Y.root_dir,Y.expected_revision);for(let[Y,I]of R)await x("worker-merge-queue-add-all",{},Y,I)}let J=null,ie=!1,me=null;function Le(){me!==null&&clearTimeout(me),me=setTimeout(()=>{me=null,ie=!1},0)}function Ye(R){let Y=R.target;return typeof Y?.closest=="function"?Y.closest(".mon-group"):null}function Se(R){let Y=Ye(R);return!Y||!J?null:(Y.getAttribute("data-root-dir")||"")===J.root_dir?Y:null}function A(){for(let R of Array.from(h.querySelectorAll(".mon-group--drag-over")))R.classList.remove("mon-group--drag-over")}function K(R){let Y=R.target,I=typeof Y?.closest=="function"?Y.closest('.mon-card[draggable="true"]'):null;if(I){J={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},ie=!0;try{R.dataTransfer?.setData("text/plain",J.bead_id),R.dataTransfer&&(R.dataTransfer.effectAllowed="move")}catch{}}}function O(R){let Y=Se(R);Y&&(R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move"),Y.classList.add("mon-group--drag-over"))}function W(R){Ye(R)?.classList.remove("mon-group--drag-over")}function ue(){J=null,A(),Le()}function ce(R){let Y=Se(R),I=J;if(J=null,A(),!Y||!I||!I.bead_id)return;R.preventDefault();let re=R.target,ee=typeof re?.closest=="function"?re.closest('.mon-card[data-lane="queue"]'):null,be=ee&&Y.contains(ee)?Number(ee.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let Oe=Number.isFinite(be)?be:I.place_index;if(!Number.isFinite(Oe))return;x("worker-queue-place",{bead_id:I.bead_id,index:Oe},I.root_dir,I.revision);return}if(I.lane!=="queue"||ee&&ee.getAttribute("data-issue-id")===I.bead_id)return;let _e=I.queue_index,$e=Number.isFinite(be)?_e>be?be:be-1:I.queue_length-1;!Number.isFinite($e)||$e<0||$e===_e||x("worker-queue-reorder",{bead_id:I.bead_id,to_index:$e},I.root_dir,I.revision)}function ke(R){let Y={runnable:w.runnable,queue:w.queue,running:w.running,pr_wait:w.pr_wait,done:w.done};return l`${Ka({automation:w.automation,counts:{running:w.running.length,queue:w.queue.length,pr_wait:w.pr_wait.length},done_range:f,token_total:Xa(w.done),token_tooltip:Za(_())})}
      <div class="worker-lanes mon-lanes">
        ${Ud.map(I=>{let re=Y[I.lane],ee=I.lane==="queue"?w.queue_groups.length>0?l`${w.queue_groups.map(be=>l`<div
                        class="mon-group"
                        data-root-dir=${be.root_dir}
                      >
                        ${Va(be)}
                        <div class="mon-group__list">
                          ${be.items.map(_e=>Qa(_e,R))}
                        </div>
                      </div>`)}`:void 0:re.length>0?l`${re.map(be=>Qa(be,R))}`:void 0;return Mt({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${_()}`:I.title,items:re,empty:I.empty,body:ee,live:I.lane==="running"&&re.length>0,header_control:I.lane==="pr_wait"&&re.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function he(){let R=s&&s.get?s.get():null,Y=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=i();w=As(R,Y,{done_since:cr(f,I)}),Me(ke(I),h)}function ze(R,Y){let I=a?a():void 0;if(!Y||!I||Y===I||!c){n(R);return}c(Y).then(()=>{n(R)}).catch(re=>{r("workspace switch for %s failed: %o",Y,re)})}function pe(R){return{root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0}}function De(R,Y){let{root_dir:I,revision:re}=pe(R),ee=R.getAttribute("data-issue-id")||"",be=R.getAttribute("data-attempt-id")||"",_e=Y.classList;if(_e.contains("worker-card__place")){x("worker-queue-place",{bead_id:ee,index:Number(R.getAttribute("data-place-index")||0)||0},I,re);return}if(_e.contains("mon-op--up")||_e.contains("mon-op--down")){let $e=Number(R.getAttribute("data-queue-index")||0)||0,Oe=_e.contains("mon-op--up")?$e-1:$e+1;if(Oe<0)return;x("worker-queue-reorder",{bead_id:ee,to_index:Oe},I,re);return}if(_e.contains("mon-op--remove")){x("worker-queue-remove",{bead_id:ee},I,re);return}if(_e.contains("mon-op--pause")){P("worker-attempt-pause",{attempt_id:be},I);return}if(_e.contains("mon-op--stop")){P("worker-attempt-stop",{attempt_id:be},I);return}if(_e.contains("mon-op--resume")){x("worker-attempt-resume",{attempt_id:be},I,re);return}if(_e.contains("mon-op--dismiss")){x("worker-attempt-dismiss",{attempt_id:be},I,re);return}if(_e.contains("worker-mini__merge")){x("worker-merge-queue-add",{bead_id:ee},I,re);return}if(_e.contains("worker-mini__merge-cancel")){x("worker-merge-queue-remove",{bead_id:ee},I,re);return}if(_e.contains("worker-mini__discard")){if(!d(`${ee}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;x("worker-pr-discard",{bead_id:ee},I,re);return}if(_e.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:ee},I,re);return}_e.contains("worker-mini__revise-approve")&&x("worker-revise-approve",{bead_id:ee},I,re)}function F(R){let Y=ie;ie=!1;let I=R.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let re=I.closest(".mon-auto-all");if(re){R.preventDefault(),H(re.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){R.preventDefault(),de();return}let be=I.closest(".mon-ctl--advance");if(be){R.preventDefault();let{root_dir:tt,revision:dt}=pe(be);x("worker-queue-toggle",{on:be.getAttribute("data-on")==="true"},tt,dt);return}let _e=I.closest(".mon-ctl--merge-auto");if(_e){R.preventDefault();let{root_dir:tt,revision:dt}=pe(_e);x("worker-merge-auto-toggle",{on:_e.getAttribute("data-on")==="true"},tt,dt);return}let $e=I.closest(".mon-ctl--exec");if($e){R.preventDefault(),$=$e.getAttribute("data-root-dir")||null,g.delete($||""),Z.open();return}let Oe=I.closest(".mon-card");if(!Oe)return;let st=I.closest("button");if(st){R.preventDefault(),De(Oe,st);return}let We=Oe.getAttribute("data-issue-id");We&&!Y&&(R.preventDefault(),ze(We,Oe.getAttribute("data-root-dir")||""))}function N(R){let Y=R.target;if(!Y||typeof Y.closest!="function")return;let I=Y.closest(".mon-done-range");if(I){f=Ft(I.value)?I.value:wt,qd(f),he();return}let re=Y.closest(".mon-slots__input");if(!re)return;let{root_dir:ee,revision:be}=pe(re),_e=Number(re.value);if(!Number.isFinite(_e))return;let $e=Math.max(zr,Math.floor(_e));x("worker-queue-set-slots",{slots:$e},ee,be)}e.addEventListener("click",F),e.addEventListener("change",N),e.addEventListener("dragstart",K),e.addEventListener("dragover",O),e.addEventListener("dragleave",W),e.addEventListener("drop",ce),e.addEventListener("dragend",ue),s&&typeof s.subscribe=="function"&&(M=s.subscribe(()=>{try{g.clear(),he();for(let R of Array.from(C))R()}catch{}}));function fe(){S!==null&&(clearInterval(S),S=null)}function Be(){me!==null&&(clearTimeout(me),me=null)}return{load(){r("load"),he(),S===null&&(S=setInterval(()=>{try{he()}catch{}},Bd))},pause(){fe()},clear(){fe(),Be(),M&&(M(),M=null),e.removeEventListener("click",F),e.removeEventListener("change",N),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",O),e.removeEventListener("dragleave",W),e.removeEventListener("drop",ce),e.removeEventListener("dragend",ue),Z.destroy(),C.clear(),e.replaceChildren()}}}function ri(e,t,r){let n=He("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
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
    `}function c(){Me(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Me(l``,e)}}}var ni=["bug","feature","task","epic","chore"];function si(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var oi=["Critical","High","Medium","Low","Backlog"];function ai(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function w(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let x of ni){let P=document.createElement("option");P.value=x,P.textContent=si(x),o.appendChild(P)}a.replaceChildren();for(let x=0;x<=4;x+=1){let P=document.createElement("option");P.value=String(x);let H=oi[x]||"Medium";P.textContent=`${x} \u2013 ${H}`,a.appendChild(P)}}w();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function g(S){s.disabled=S,o.disabled=S,a.disabled=S,c.disabled=S,i.disabled=S,f.disabled=S,_.disabled=S,_.textContent=S?"Creating\u2026":"Create"}function C(){d.textContent=""}function G(S){d.textContent=S}function j(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let S=o.value||"",x=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function M(){C();let S=String(s.value||"").trim();if(S.length===0){G("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){G("Priority must be 0..4"),a.focus();return}let P=String(o.value||""),H=String(i.value||""),de={title:S};P.length>0&&(de.type=P),String(x).length>0&&(de.priority=x),H.length>0&&(de.description=H),g(!0);try{await t("create-issue",de)}catch{g(!1),G("Failed to create issue");return}Z(),g(!1),$()}return r.addEventListener("cancel",S=>{S.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),M())}),n.addEventListener("submit",S=>{S.preventDefault(),M()}),{open(){n.reset(),C(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var zd="tab:worker:ready",Hd="tab:worker:blocked",Wd="tab:worker:in-progress",An=1;function Is(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var di="beads-ui.worker.candidate-filter",Cs={show_blocked:!1,spec:"all"};function Gd(){try{let e=window.localStorage.getItem(di);if(!e)return{...Cs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Cs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Cs}}}function jd(e){try{window.localStorage.setItem(di,JSON.stringify(e))}catch{}}function Yd(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=r(c),d=n(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Vd=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ui="bdui.worker.candidate_sort",Kd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Tn="spec";function Zd(){try{let e=window.localStorage.getItem(ui);return e==="board"||e==="created"||e==="spec"?e:Tn}catch{return Tn}}function Xd(e){try{window.localStorage.setItem(ui,e)}catch{}}var pi="bdui.worker.done-range";function Qd(){try{let e=window.localStorage.getItem(pi);return Ft(e)?e:wt}catch{return wt}}function Jd(e){try{window.localStorage.setItem(pi,e)}catch{}}var eu="(max-width: 640px)",fi="beads-ui.worker.lane-collapsed",Gr={queue:!0,done:!0};function tu(){try{let e=window.localStorage.getItem(fi);if(!e)return{...Gr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gr}:{queue:typeof t.queue=="boolean"?t.queue:Gr.queue,done:typeof t.done=="boolean"?t.done:Gr.done}}catch{return{...Gr}}}function ru(e){try{window.localStorage.setItem(fi,JSON.stringify(e))}catch{}}function ii(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function nu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Jt):(n.sort(Jr(r)),t==="board"?n:[...n.filter(Is),...n.filter(s=>!Is(s))])}function su(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ou(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function au(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var iu=["closed_unmerged","undecidable"],lu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function cu(e,t){for(let r of lu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Rs=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function du(e){if(typeof e!="string"||e.length===0)return null;let t=Rs.length,r=Rs.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Rs[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function li(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function ci(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function uu(e,t,r,n,s=null,o=null,a=null,c=!1,i=null,d=!0,f=null,_=null){let h=!!i&&i.position>0,w=!!i&&i.active===!0,$=i&&i.failure||null,g=r[e]||null,C=g&&g.gate?g.gate:null,G=g&&g.pr?g.pr:null,j=[];c&&j.push("\uC138\uC158");let Z=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,M=cu(c&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",Z?null:o&&o.activity||null);Z&&j.push(Z),M.label&&j.push(M.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&j.push(C.base_badge),_&&j.push(_),n&&j.push("\uC815\uB9AC \uC2E4\uD328"),h&&!w&&j.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),$&&j.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${li($)}`),f&&j.push(`\uC790\uB3D9 \uC81C\uC678: ${li(f)}`);let S=!!C&&C.base_badge==="\uCDA9\uB3CC",x=!!C&&C.enabled===!0,P=du(o&&o.merge_progress?o.merge_progress.step:null),H=!!n&&!!C&&C.tier==="merged",de=c&&!!C&&C.tier==="merged",J=c&&S&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:G&&typeof G.number=="number"?G.number:null,pr_url:G&&typeof G.url=="string"?G.url:"",badges:j,live_badge:a==="running"?Z:Z?null:M.live?M.label:null,usage:s,alert:!!C&&iu.includes(C.tier)||!!n||!!$,merge_action:!h,cancel_action:h,cancel_enabled:!w,cancel_title:w?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(C&&C.tier==="merged"),merge_step:P,discard_enabled:!P&&!a&&!h,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!P&&!a&&!J&&(x||S||H||de),merge_label:de?"\uC815\uB9AC":S&&!P&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${P.label}`:de?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":S?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":x?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ls(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:c,getWorkspacePath:i}=t,d=n?tn(n,a):null,f=nn({transport:r,uiOrderStore:a}),_=null,h=[],w=Gd(),$=Zd(),g=Qd();function C(){let u=Dt.find(b=>b.value===g);return u?u.label:"\uC624\uB298"}let G=tu(),j=!1,Z=new Set,M=new Set,S=[],x=document.createElement("div");x.className="worker-console";let P=document.createElement("div");P.className="worker-top";let H=document.createElement("div");H.className="worker-drawer-overlay",H.hidden=!0;let de=document.createElement("div");de.className="worker-drawer-overlay__backdrop";let J=document.createElement("div");J.className="worker-drawer-host",H.append(de,J);let ie=document.createElement("div");ie.className="worker-lanes-host",x.append(P,H,ie),e.appendChild(x);let me=null,Le=wn(J,{transport:r,sessionLogStore:o,onClose:()=>{me=null,H.hidden=!0,Ae()}}),Ye=xn(x,{queueStore:s,transport:r,getWorkspacePath:i});function Se(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:An,queue:[],pr_wait:[],done:[]}}function A(){let u=Se();return typeof u.revision=="number"?u.revision:0}function K(u){u&&u.queue&&s&&s.set(u.queue)}function O(){let u=Se().queue;return Array.isArray(u)?u.length:0}async function W(u,b){if(!r)return;let D=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:A()});K(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:A()}).then(K)}async function ue(u,b){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:A()});K(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:A()}).then(K)}async function ce(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:A()});K(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:A()}).then(K)}async function ke(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function he(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function ze(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:A()});K(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:A()}),K(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function pe(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:A()});K(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:A()}),K(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function De(u,b){if(!r)return null;let D=r,Q=await D(u,{...b,expected_revision:A()});return K(Q),Q&&Q.conflict&&(Q=await D(u,{...b,expected_revision:A()}),K(Q)),Q}async function F(u){if(!r||!u)return;Z.add(u),Ae();let b;try{b=await De("worker-merge-queue-add",{bead_id:u})}finally{Z.delete(u),Ae()}!b||b.conflict||b.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function N(u){if(!r)return;let b=await De("worker-merge-auto-toggle",{on:u});!b||b.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function fe(u){if(!r||!u)return;let b=await De("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Be(){await De("worker-merge-queue-remove",{all:!0})}async function R(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let D=await r("worker-pr-discard",{bead_id:u,expected_revision:A()});if(K(D),D&&D.conflict&&(D=await r("worker-pr-discard",{bead_id:u,expected_revision:A()}),K(D)),D&&D.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}D&&D.discarded===!1&&!D.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${D.reason||""}`,"error",2800)}async function Y(u,b){if(!r||!b||M.has(b))return;M.add(b),Ae();let D;try{D=await r(u,{bead_id:b,expected_revision:A()}),K(D),D&&D.conflict&&(D=await r(u,{bead_id:b,expected_revision:A()}),K(D))}finally{M.delete(b),Ae()}if(!(!D||D.conflict)){if(D.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function I(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:A()});K(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:A()}).then(K)}async function re(u){await I(u),await N(u)}async function ee(u){if(!r||!Number.isFinite(u))return;let b=Math.max(An,Math.floor(u)),D=await r("worker-queue-set-slots",{slots:b,expected_revision:A()});K(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:A()}).then(K)}function be(){let u=Se(),b=d?d.selectBoardColumn(zd,"ready"):[],D=d?d.selectBoardColumn(Hd,"blocked"):[],Q=d?d.selectBoardColumn(Wd,"in_progress"):[],X=new Map;for(let k of Q){let V=ou(k);if(!V)continue;let ae=X.get(V);ae?ae.push(k):X.set(V,[k])}let ge=k=>{let V=rn(X.get(k)||[]);return V?V.title||V.id:null},Ee=u.bead_titles||{},Pe=new Map;for(let[k,V]of Object.entries(Ee))typeof V=="string"&&V.length>0&&Pe.set(k,V);for(let k of[...b,...D])Pe.set(k.id,k.title||k.id);let Ze=u.bead_times||{},ot=new Map;for(let[k,V]of Object.entries(Ze))V&&typeof V=="object"&&ot.set(k,V);for(let k of[...b,...D])ot.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let we=k=>ot.get(k)||{},at=u.pr_wait||[],xt=u.pr_observations||{},Ge=u.pr_activity||{},it=u.cleanup_failed||{},ye=Object.entries(it).map(([k,V])=>({bead_id:k,step:V&&V.step?V.step:"",reason:V&&V.reason?V.reason:"",detail:V&&typeof V.detail=="string"?V.detail:null,output_tail:V&&typeof V.output_tail=="string"&&V.output_tail?V.output_tail:void 0,log_path:V&&typeof V.log_path=="string"&&V.log_path?V.log_path:void 0})),Ce=u.ship_failure||null,St=Ce&&typeof Ce.reason=="string"&&Ce.reason?{bead_id:typeof Ce.bead_id=="string"?Ce.bead_id:"",reason:Ce.reason,detail:typeof Ce.detail=="string"?Ce.detail:null,pr_url:typeof Ce.pr_url=="string"?Ce.pr_url:null}:null,Re=u.queue||[],y=new Set([...Re.map(k=>k.bead_id),...at.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),U=new Set(D.map(k=>k.id)),B=a?a.get()?.order||{}:{},te=new Set,m=[];for(let k of[...b,...D])y.has(k.id)||te.has(k.id)||su(k)||(te.add(k.id),m.push(k));h=nu(m,$,B);let v=u.admission||{},E=k=>{let V=v[k];if(!V)return"";if(V.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof V.reason=="string"?V.reason:"",Fe=ae.indexOf(":");return Fe>0&&Fe<ae.length-1?`\u26D4 ${ae.slice(0,Fe)} (${ae.slice(Fe+1)})`:`\u26D4 ${ae}`},p=h.map(k=>{let V=Is(k),ae=U.has(k.id),Fe=[];ae&&Fe.push(au(k)),V||Fe.push("spec \uC5C6\uC74C");let Kr=E(k.id);return Kr&&Fe.push(Kr),{id:k.id,title:k.title||k.id,reason:Fe.join(" \xB7 "),draggable:V,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:ae,has_spec:V}}),T=Yd(p,w),z=T.visible,Te=u.revise_parked||{},nt=(k,V)=>k.map(ae=>{let Fe=V==="queue"?Te[ae.bead_id]:null;return{id:ae.bead_id,title:Pe.get(ae.bead_id)||ae.bead_id,reason:V==="done"?"":E(ae.bead_id),draggable:V!=="done",done:V==="done",lane:V,badges:Fe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Fe,revise_action:!!Fe,revise_enabled:!!Fe&&!M.has(ae.bead_id),revise_title:Fe?Fe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Fe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:V==="done"?Ot(u.attempts||{},ae.bead_id):null,done_at:V==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...we(ae.bead_id)}}),je=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&je.set(k.bead_id,k.added_at);let Je=u.attempts?Object.values(u.attempts):[],yt=new Set;for(let k of Je)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&yt.add(k.resumed_from);let Nt=new Map;for(let k of Je)Nt.set(k.bead_id,k.attempt_id);let or=new Map;for(let k of Je)or.set(k.attempt_id,k);function et(k){let V=new Set,ae=k;for(;ae&&!V.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;V.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&or.get(ae.resumed_from)||null}return!1}let ar=typeof u.declared_base=="string"?u.declared_base:null;function jr(k){let V=null;for(let ae of Je)!ae||ae.bead_id!==k||et(ae)||(V===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof V.started_at=="number"?V.started_at:0))&&(V=ae);return V&&typeof V.target_base=="string"?V.target_base:null}let yr=[],Lt=null;for(let k of Je){let V=k.status==="paused"&&!yt.has(k.attempt_id);if(k.status==="running"||V)yr.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Pe.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:V,conflict_resolution:et(k),base_exception:ci(ar,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Ot(u.attempts||{},k.bead_id),current_child:ge(k.bead_id),...we(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ae=Nt.get(k.bead_id)!==k.attempt_id,Fe=je.get(k.bead_id),Kr=typeof Fe=="number"&&Fe>0&&typeof k.finished_at=="number"&&Fe>=k.finished_at;!ae&&!Kr&&typeof k.dismissed_at!="number"&&(Lt=k)}}let Ns=null;if(Lt){let k=typeof Lt.session_id=="string"&&Lt.session_id.length>0,V=yt.has(Lt.attempt_id),ae=Lt.cause_detail;Ns={repo:Lt.repo||"",reason:Lt.cause||Lt.status,cause_detail:ae&&typeof ae.reason=="string"?{reason:ae.reason,command:typeof ae.command=="string"?ae.command:null}:null,resume_attempt_id:Lt.attempt_id,resume_eligible:k&&!V,resume_reason:k?V?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let xi=new Set(yr.map(k=>k.bead_id)),En=Array.isArray(u.merge_queue)?u.merge_queue:[],Ps=new Map;En.forEach((k,V)=>{k&&typeof k.bead_id=="string"&&Ps.set(k.bead_id,V+1)});let Fs=u.merge_queue_state||{active:null,failures:{}},Si=Fs.failures||{},Ai=u.auto_merge_skips||{},qs=k=>{let V=Ai[k];if(!V)return null;let ae=xt[k],Fe=ae&&ae.pr?ae.pr.head_sha:null;return Fe&&Fe===V.head_sha?V.reason||"":null},Yr=new Map;for(let k of yr)k.conflict_resolution&&(k.paused?Yr.has(k.bead_id)||Yr.set(k.bead_id,"paused"):Yr.set(k.bead_id,"running"));let Bs=yr.filter(k=>!k.paused).length,Us=(u.workspace_info||{}).slots,zs=typeof Us=="number"?Us:typeof u.slots=="number"?u.slots:An,Ti=Bs>zs,Hs=cr(g),Ei=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Hs===void 0||typeof k.added_at!="number"||k.added_at>=Hs).sort((k,V)=>(V.added_at||0)-(k.added_at||0)),Ws=nt(Ei,"done"),Vr={};for(let k of qt)Vr[k]=0;let Gs=!1,js=0,Cn=0,Ys=0;for(let k of Ws){let V=k.usage;if(V&&typeof V=="object"){let ae=!1;for(let Fe of qt)Number.isFinite(V[Fe])&&(Vr[Fe]+=V[Fe],Gs=!0,ae=!0);ae&&(Cn+=1,Number.isFinite(V.total_cost_usd)&&(js+=V.total_cost_usd,Ys+=1))}}Cn>0&&Ys===Cn&&(Vr.total_cost_usd=js);let Ci=Gs?Tt(Vr):null;return{queue:u,idToTitle:Pe,candidates:z,candidate_hidden:{blocked:T.hidden_blocked,spec:T.hidden_spec},running:yr,live_count:Bs,slots:zs,over_cap:Ti,failure:Ns,waiting:nt(Re.filter(k=>!xi.has(k.bead_id)),"queue"),pr_wait:at.map(k=>uu(k.bead_id,Pe.get(k.bead_id)||k.bead_id,xt,it[k.bead_id]||null,Ot(u.attempts||{},k.bead_id),Ge[k.bead_id]||(Z.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Yr.get(k.bead_id)||null,k.external===!0,{position:Ps.get(k.bead_id)||0,active:Fs.active===k.bead_id,failure:Si[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?qs(k.bead_id):null,ci(ar,jr(k.bead_id)))).map(k=>({...k,...we(k.id)})),merge_queue_length:En.length,merge_queue_running:En.length>0,auto_excluded:at.map(k=>k.bead_id).filter(k=>qs(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:ar,done:Ws,token_total:Ci,cleanup_failures:ye,ship_failure:St}}function _e(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",D=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,Q=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,X=l`<button
      type="button"
      class="worker-auto-all${Q?" is-active":""}"
      title=${Q?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${Q?"true":"false"}
    >
      ${Q?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,ge=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ee=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${C()} 완료 <b>${u.done.length}</b></span
      >`,Pe=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ze=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${An}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,ot=qa({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return j?l`<div class="worker-ribbon">
          ${D}
          <div class="worker-kpi worker-kpi--ribbon">${ge}${Ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${X}${Ze}</div>
          <div class="worker-kpi">${Pe}</div>
        </div>
        ${ot}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${X}${Ze}</div>
        <div class="worker-kpi">
          ${ge}${Ee}${Pe}
          ${u.token_total?l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${C()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${C()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${ot}`}function $e(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(D=>!D.paused);return l`<section
      class="worker-now${b?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${u.running.length+u.pr_wait.length}</span
        >
        ${tt(u)}
      </header>
      ${u.running.length>0?ws(u.running,Date.now(),me):""}
      ${u.pr_wait.map(D=>vs(D))}
    </section>`}function Oe(u){let b=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Vd.map(D=>l`<button
              type="button"
              class="worker-filter__chip${w.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${w.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${b.spec>0?l`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function st(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Kd.map(u=>l`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function We(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Dt.map(u=>l`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function tt(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let D=new Set(u.auto_excluded),Q=u.pr_wait.filter(X=>X.merge_action&&X.merge_enabled&&!D.has(X.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function dt(u){let b=Mt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:Oe(u)});return j?l`<div class="worker-lanes worker-lanes--mobile">
        ${$e(u)}
        ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:G.queue,preview:ii(u.waiting)})}
        ${b}
        ${Mt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:We(),collapsible:!0,collapsed:G.done,preview:u.token_total||ii(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${b}
      ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Mt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(D=>!D.paused),body:ws(u.running,Date.now(),me)})}
      ${Mt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:tt(u)})}
      ${Mt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${u.done.length}`,items:u.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:We()})}
    </div>`}function ut(u){G={...G,[u]:!G[u]},ru(G),Ae()}function Ae(){let u=be();Me(_e(u),P),Me(dt(u),ie)}function Ve(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let D=Math.round(u.getBoundingClientRect().height);x.style.setProperty("--worker-ribbon-top",`${D}px`)};if(b(),typeof ResizeObserver=="function"){let D=new ResizeObserver(b);D.observe(u),S.push(()=>D.disconnect())}else window.addEventListener("resize",b),S.push(()=>window.removeEventListener("resize",b))}function rt(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(eu);j=!!u.matches;let b=D=>{let Q=!!(D&&typeof D.matches=="boolean"?D.matches:u.matches);Q!==j&&(j=Q,Ae())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),S.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),S.push(()=>u.removeListener(b)))}function lt(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let D=b.dataset.beadId||"",Q=b.dataset.lane||"";_={bead_id:D,from_lane:Q};try{u.dataTransfer?.setData("text/plain",D),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function pt(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let D=b.dataset.lane||"";D!=="candidate"&&D!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function bt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ue(u,b){let D=h.find(Ee=>Ee.id===u);if(!D)return;let Q=h.filter(Ee=>Ee.id!==u),X=Q.length;if(b){let Ee=b.dataset.beadId;if(Ee===u)return;let Pe=Q.findIndex(Ze=>Ze.id===Ee);Pe>=0&&(X=Pe)}let ge=Q.slice();ge.splice(X,0,D),f.applyReorder(u,ge,X)}function ft(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let D=b.dataset.lane||"",Q=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",X=_?.from_lane||"";if(_=null,!Q)return;let ge=u.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Pe=Ee.length;if(ge){let Ze=Ee.indexOf(ge);Ze>=0&&(Pe=Ze)}if(b.classList.contains("worker-pane--collapsed")&&(Pe=O()),D==="candidate"){if(X==="candidate"){Ue(Q,ge);return}X==="queue"&&ce(Q);return}D==="queue"&&(X==="queue"?ue(Q,Pe):W(Q,Pe))}function Ke(u){w=u,jd(u),Ae()}function Qe(u){$=u==="board"||u==="created"||u==="spec"?u:Tn,Xd($),Ae()}function L(u){g=Ft(u)?u:wt,Jd(g),Ae()}function q(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){Ke({...w,show_blocked:b.checked});return}let D=u.target?.closest?.(".worker-done-range");if(D){L(D.value);return}let Q=u.target?.closest?.(".worker-sort");if(Q){Qe(Q.value||Tn);return}let X=u.target?.closest?.(".worker-slots__input");if(!X)return;let ge=Number.parseInt(X.value,10);if(!Number.isFinite(ge)){Ae();return}ee(ge).then(Ae)}function ne(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function oe(u){let b=Se(),D=b.attempts?b.attempts[u]:null;me=u,H.hidden=!1,Le.open({attempt_id:u,meta:ne(D)}),Ae()}function le(){if(!me)return;let u=Se(),b=u.attempts?u.attempts[me]:null;if(b){Le.updateMeta(ne(b));return}Le.close()}function ve(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Ye.open();return}let D=b?.closest?.(".worker-banner__resume");if(D){let ye=D.dataset.attemptId;ye&&ze(ye);return}let Q=b?.closest?.(".worker-banner__dismiss");if(Q){let ye=Q.dataset.attemptId;ye&&pe(ye);return}if(b?.closest?.(".worker-play")){I(!Se().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let ye=Se();re(!(ye.auto_advance===!0&&ye.auto_merge===!0));return}let X=b?.closest?.(".worker-merge-all");if(X){X.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?N(!1):Be():N(!0);return}let ge=b?.closest?.(".worker-pane__hd--toggle");if(ge){let ye=ge.dataset.lane;(ye==="queue"||ye==="done")&&ut(ye);return}let Ee=b?.closest?.(".worker-card__place");if(Ee){let ye=Ee.dataset.beadId;ye&&!Ee.disabled&&W(ye,O());return}let Pe=b?.closest?.(".worker-filter__chip");if(Pe){let ye=Pe.dataset.spec;(ye==="all"||ye==="with"||ye==="without")&&Ke({...w,spec:ye});return}let Ze=b?.closest?.(".worker-mini__merge");if(Ze){F(Ze.dataset.beadId||"");return}let ot=b?.closest?.(".worker-mini__merge-cancel");if(ot){fe(ot.dataset.beadId||"");return}let we=b?.closest?.(".worker-mini__discard");if(we){R(we.dataset.beadId||"");return}let at=b?.closest?.(".worker-mini__revise-fix");if(at){Y("worker-revise-fix",at.dataset.beadId||"");return}let xt=b?.closest?.(".worker-mini__revise-approve");if(xt){Y("worker-revise-approve",xt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let Ce=b?.closest?.(".rtile")?.dataset?.attemptId;Ce&&ke(Ce);return}if(b?.closest?.(".rtile__pause")){let Ce=b?.closest?.(".rtile")?.dataset?.attemptId;Ce&&he(Ce);return}if(b?.closest?.(".rtile__resume")){let Ce=b?.closest?.(".rtile")?.dataset?.attemptId;Ce&&ze(Ce);return}if(b?.closest?.(".rtile__session")){let Ce=b?.closest?.(".rtile")?.dataset?.attemptId;Ce&&oe(Ce);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){Le.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Ge=b?.closest?.(".rtile");if(Ge){if(b?.closest?.(".rtile__id")){let Ce=Ge.dataset.beadId;Ce&&tr(Ce).then(St=>{St?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ye=Ge.dataset.beadId;ye&&c&&c(ye);return}let it=b?.closest?.(".worker-mini, .worker-card");if(it){let ye=it.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){ye&&tr(ye).then(Ce=>{Ce?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ye&&c&&c(ye)}}return e.addEventListener("dragstart",lt),e.addEventListener("dragover",pt),e.addEventListener("dragleave",bt),e.addEventListener("drop",ft),e.addEventListener("click",ve),e.addEventListener("change",q),rt(),Ve(),d&&S.push(d.subscribe(Ae)),s&&S.push(s.subscribe(()=>{Ae(),le()})),Ae(),{load(){Ae()},destroy(){for(let u of S.splice(0))try{u()}catch{}e.removeEventListener("dragstart",lt),e.removeEventListener("dragover",pt),e.removeEventListener("dragleave",bt),e.removeEventListener("drop",ft),e.removeEventListener("click",ve),e.removeEventListener("change",q);try{Le.destroy()}catch{}H.hidden=!0;try{Ye.destroy()}catch{}Me(l``,e)}}}function Ds(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function _i(e,t,r,n=async()=>{},s=async()=>{}){let o=He("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function f(x){let H=x.target.value,J=t.getState().workspace?.current?.path||"";if(H&&H!==J){o("switching workspace to %s",H),c=!0,S();try{await r(H)}catch(ie){o("workspace switch failed: %o",ie)}finally{c=!1,S()}}}async function _(){let x=t.getState(),P=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!P||i)){o("git-pulling workspace %s",P),i=!0,S();try{await n(P)}catch(H){o("workspace git pull failed: %o",H)}finally{i=!1,S()}}}function h(x){let P=x.target;P&&e.contains(P)||g()}function w(x){x.key==="Escape"&&g()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),S())}function g(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),S())}function C(){d?g():$()}async function G(x){let P=x.target,H=P.value,de=P.checked;o("toggling visibility %s \u2192 %s",H,String(de));try{await s(H,de)}catch(J){o("workspace visibility toggle failed: %o",J)}}function j(x){return x?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${c||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function Z(x,P){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${x.map(H=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!P.has(H.path)}
                        @change=${G}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ds(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let x=t.getState(),P=x.workspace?.current,H=x.workspace?.available||[],de=new Set(x.workspace?.hidden||[]),J=P?.path||H[0]?.path||"";if(H.length===0)return l``;let ie=H.filter(me=>!de.has(me.path)||me.path===J);if(ie.length<=1){let me=ie[0]||H[0],Le=Ds(me.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Le}</span
          >
          ${Z(H,de)}
          ${j(J)}
          ${i?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${c||i}
          aria-label="Select project workspace"
        >
          ${ie.map(me=>l`
              <option
                value="${me.path}"
                ?selected=${me.path===J}
                title="${me.path}"
              >
                ${Ds(me.path)}
              </option>
            `)}
        </select>
        ${Z(H,de)}
        ${j(J)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Me(M(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Me(l``,e)}}}var mi=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Os(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function gi(e,t,r=Os()){return{id:r,type:e,payload:t}}function hi(e={}){let t=He("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,f=[],_=new Map,h=new Set;function w(M){for(let S of Array.from(h))try{S(M)}catch{}}function $(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*M,x=Math.max(0,Math.round(M+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",x,a+1),c=setTimeout(()=>{c=null,Z()},x)}function g(M){try{s?.send(JSON.stringify(M))}catch(S){t("ws send failed",S)}}function C(){for(o="open",t("ws open"),w(o),a=0;f.length;){let M=f.shift();M&&g(M)}}function G(M){let S;try{S=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let P=d.get(S.id);d.delete(S.id),S.ok?P?.resolve(S.payload):P?.reject(S.error||new Error("ws error"));return}let x=_.get(S.type);if(x&&x.size>0)for(let P of Array.from(x))try{P(S.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",S.type)}function j(){o="closed",t("ws closed"),w(o);for(let[M,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(M);a+=1,$()}function Z(){if(!i)return;let M=n();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",C),s.addEventListener("message",G),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(S){t("ws connect failed %o",S),$()}}return Z(),{send(M,S){if(!mi.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let x=Os(),P=gi(M,S,x);return t("send %s id=%s",M,x),new Promise((H,de)=>{d.set(x,{resolve:H,reject:de,type:M}),s&&s.readyState===s.OPEN?g(P):(t("queue %s id=%s (state=%s)",M,x,o),f.push(P))})},on(M,S){_.has(M)||_.set(M,new Set);let x=_.get(M);return x?.add(S),()=>{x?.delete(S)}},onConnection(M){return h.add(M),()=>{h.delete(M)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,Z()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function pu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function fu(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ms=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],bi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],vi=ei,yi="worker:queue",ki="ui:order",wi="ui:display-policy",Yt="tab:board:closed",$i="beads-ui.board.closed-range";function _u(e){let t=He("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Me(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&o&&a&&c){let Se=function(m,v){let E="Request failed",p="";if(m&&typeof m=="object"){let z=m;if(typeof z.message=="string"&&z.message.length>0&&(E=z.message),typeof z.details=="string")p=z.details;else if(z.details&&typeof z.details=="object")try{p=JSON.stringify(z.details,null,2)}catch{p=""}}else typeof m=="string"&&m.length>0&&(E=m);let T=v&&v.length>0?`Failed to load ${v}`:"Request failed";Ye.open(T,E,p)},I=function(m){return`${we.getState().workspace.current?.path||""}\0${m}`},re=function(){pe&&(pe().catch(()=>{}),pe=null),De=null,F=null},be=function(m){N=m;let v=()=>{N!==m||we.getState().selected_id!==m||(N=null,ee(m))};if(!R){Be.then(v);return}v()},st=function(m,v,E,p,T){return E!==Oe[v]?(T().catch(()=>{}),!1):(m.set(p,T),!0)},We=function(){let m=we.getState().view;ut(m==="board"),pt(m==="worker"),Qe(m==="monitor"),Ue(m==="worker")},dt=function(){let m=cr(tt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},ut=function(m){if(m)for(let[v,E]of Ms){if(_e.has(v)||$e.has(v))continue;let p=v===Yt?dt():{type:E};try{W.register(v,p)}catch(Te){t("register %s store failed: %o",v,Te)}$e.add(v);let T=Oe.board,z=!1;O.subscribeList(v,p).then(Te=>{z=!st(_e,"board",T,v,Te)}).catch(Te=>{t("subscribe %s failed: %o",v,Te),Se(Te,"board")}).finally(()=>{$e.delete(v),z&&We()})}else Ve()},Ve=function(){Oe.board+=1;for(let[m]of Ms){let v=_e.get(m);v&&(v().catch(()=>{}),_e.delete(m));try{W.unregister(m)}catch(E){t("unregister %s failed: %o",m,E)}}},pt=function(m){if(!m){bt();return}for(let[v,E]of bi){if(rt.has(v)||$e.has(v))continue;try{W.register(v,{type:E})}catch(z){t("register %s store failed: %o",v,z)}$e.add(v);let p=Oe.worker,T=!1;O.subscribeList(v,{type:E}).then(z=>{T=!st(rt,"worker",p,v,z)}).catch(z=>{t("subscribe %s failed: %o",v,z),Se(z,"worker")}).finally(()=>{$e.delete(v),T&&We()})}},bt=function(){Oe.worker+=1;for(let[m]of bi){let v=rt.get(m);v&&(v().catch(()=>{}),rt.delete(m));try{W.unregister(m)}catch(E){t("unregister %s failed: %o",m,E)}}},Ue=function(m){if(!m){ft();return}lt||(K("subscribe-worker-queue",{id:yi}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),lt=()=>K("unsubscribe-worker-queue",{id:yi}))},ft=function(){lt&&(lt().catch(()=>{}),lt=null)},Qe=function(m){if(!m){L();return}Ke||(K("subscribe-monitor-pipeline",{id:vi}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),Ke=()=>K("unsubscribe-monitor-pipeline",{id:vi}))},L=function(){Ke&&(Ke().catch(()=>{}),Ke=null)},ne=function(){q||(K("subscribe-ui-order",{id:ki}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),q=()=>K("unsubscribe-ui-order",{id:ki}))},oe=function(){q&&(q().catch(()=>{}),q=null),ke.clear()},ve=function(){le||(K("subscribe-display-policy",{id:wi}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),le=()=>K("unsubscribe-display-policy",{id:wi}))},u=function(){le&&(le().catch(()=>{}),le=null),he.clear()},Ee=function(m){if(!m)return"Unknown";let v=m.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var i=Se,d=I,f=re,_=be,h=st,w=We,$=dt,g=ut,C=Ve,G=pt,j=bt,Z=Ue,M=ft,S=Qe,x=L,P=ne,H=oe,de=ve,J=u,ie=Ee;let me=document.getElementById("header-loading"),Le=Eo(me),Ye=Oa(e),A=hi(),K=Le.wrapSend((m,v)=>A.send(m,v)),O=ko(K),W=wo(),ue=xo(),ce=oo(),ke=$o(),he=so(),ze=ao();A.on("monitor-pipeline-snapshot",m=>{let v=m;if(!(!v||!Array.isArray(v.workspaces)))try{ce.set(v.workspaces,v.workspaces_state)}catch{}}),A.on("ui-order-snapshot",m=>{let v=m;if(v&&typeof v.revision=="number")try{ke.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),A.on("display-policy-snapshot",m=>{let v=m;if(v&&v.policy&&typeof v.policy=="object")try{he.set(v.policy)}catch{}}),A.on("session-log-snapshot",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{ze.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),A.on("session-log-append",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{ze.append(v.attempt_id,v.event)}catch{}}),A.on("snapshot",m=>{let v=m,E=v&&typeof v.id=="string"?v.id:"",p=E?W.getStore(E):null;if(p&&v&&v.type==="snapshot")try{p.applyPush(v)}catch{}}),A.on("upsert",m=>{let v=m,E=v&&typeof v.id=="string"?v.id:"",p=E?W.getStore(E):null;if(p&&v&&v.type==="upsert")try{p.applyPush(v)}catch{}}),A.on("delete",m=>{let v=m,E=v&&typeof v.id=="string"?v.id:"",p=E?W.getStore(E):null;if(p&&v&&v.type==="delete")try{p.applyPush(v)}catch{}});let pe=null,De=null,F=null,N=null,fe=()=>{},Be=new Promise(m=>{fe=()=>m(void 0)}),R=!1,Y=!1;async function ee(m){let v=I(m);if(v===De||v===F)return;F=v;let E=`detail:${m}`,p={type:"issue-detail",params:{id:m}};try{W.register(E,p)}catch(T){t("register detail store failed: %o",T)}try{let T=await O.subscribeList(E,p);if(we.getState().selected_id!==m||I(m)!==v){await T().catch(()=>{});return}pe&&await pe().catch(()=>{}),pe=T,De=v}catch(T){t("detail subscribe failed: %o",T),Se(T,"issue details")}finally{F===v&&(F=null)}}let _e=new Map,$e=new Set,Oe={board:0,worker:0},tt=wt;try{let m=window.localStorage.getItem($i);Ft(m)&&(tt=m)}catch{}async function Ae(m){if(!Ft(m)||m===tt)return;tt=m;try{window.localStorage.setItem($i,m)}catch{}let v=_e.get(Yt);if(!v)return;_e.delete(Yt),await v().catch(()=>{});let E=dt();try{W.register(Yt,E)}catch(p){t("register %s store failed: %o",Yt,p)}try{let p=await O.subscribeList(Yt,E);_e.set(Yt,p)}catch(p){t("re-subscribe %s failed: %o",Yt,p),Se(p,"board")}}let rt=new Map,lt=null,Ke=null,q=null,le=null;async function b(){le=null,he.clear(),lt=null,Ke=null,_e.clear(),rt.clear(),Oe.board+=1,Oe.worker+=1;let m=we.getState().workspace.current?.path;if(m)try{await A.send("set-workspace",{path:m})}catch(E){t("workspace restore after reconnect failed: %o",E);return}ve();let v=we.getState().view;ut(v==="board"),pt(v==="worker"),Qe(v==="monitor"),Ue(v==="worker")}async function D(){t("clearing all subscriptions for workspace switch"),Ve(),bt(),ft(),ue.clear(),oe(),ne(),u(),ve(),re();let m=we.getState();if(m.selected_id)try{W.unregister(`detail:${m.selected_id}`)}catch{}let v=we.getState();ut(v.view==="board"),pt(v.view==="worker"),Qe(v.view==="monitor"),Ue(v.view==="worker"),v.selected_id&&be(v.selected_id)}async function Q(m){t("requesting workspace switch to %s",m),Y=!0;try{let v=await A.send("set-workspace",{path:m});t("workspace switch result: %o",v),v&&v.workspace&&(we.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),v.changed&&(await D(),se("Switched to "+Ee(m),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),se("Failed to switch workspace","error",3e3),v}finally{Y=!1}}async function X(m){t("requesting workspace git pull for %s",m);try{let v=await A.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let E=v?.status;if(E==="up_to_date"){se("Already up to date","success",2e3);return}if(E==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+Ee(m),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let E=v?.code,p=v?.message;if(E==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(E==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(E==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let T=p?`: ${p}`:"";throw se(`Git pull failed${T}`,"error",3e3),v}}async function ge(m,v){t("setting workspace visibility %s \u2192 %s",m,String(v));try{await A.send("set-workspace-visibility",{path:m,visible:v}),await Pe()}catch(E){t("workspace visibility update failed: %o",E),se("Failed to update project visibility","error",3e3)}}async function Pe(){try{let m=await A.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let v=m.workspaces.map(z=>({path:z.path,database:z.database,pid:z.pid,version:z.version})),E=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,p=Array.isArray(m.hidden)?m.hidden.filter(z=>typeof z=="string"):[];we.setState({workspace:{current:E,available:v,hidden:p}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!v.some(Te=>Te.path===T)||p.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):E&&T!==E.path&&(t("restoring saved workspace preference: %s",T),await Q(T)))}}catch(m){t("failed to load workspaces: %o",m)}}A.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(we.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Pe(),D())});let Ze=!1;if(typeof A.onConnection=="function"){let m=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(Ze=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&Ze&&(Ze=!1,se("Reconnected","success",2200),fu(we,(E,p)=>{t(`${E}: %o`,p)}),b())};A.onConnection(m)}let ot="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(ot=m)}catch(m){t("view parse error: %o",m)}let we=To({config:pu(),view:ot});A.on("worker-queue-snapshot",m=>{let v=m;if(!v||!v.queue)return;let E=we.getState().workspace.current?.path;if(typeof E=="string"&&E.length>0&&v.root_dir!==E){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{ue.set(v.queue)}catch{}});let at=So(we);at.start();let xt=new Set(["get-comments"]),Ge=async(m,v)=>{try{return await K(m,v)}catch(E){if(xt.has(m))throw E;return[]}};n&&ri(n,we,at);let it=document.getElementById("workspace-picker");it&&_i(it,we,Q,X,ge);let ye=ai(e,(m,v)=>K(m,v));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>ye.open())}catch{}let Ce=Da(e,{policyStore:he,transport:(m,v)=>K(m,v),labelOptions:()=>{let m=new Set;for(let[v]of Ms)for(let E of W.snapshotFor(v)||[]){let p=E.labels;if(Array.isArray(p))for(let T of p)typeof T=="string"&&T.length>0&&m.add(T)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>Ce.open())}catch{}let St=Mo(s,{gotoIssue:m=>at.gotoIssue(m),issueStores:W,transport:Ge,uiOrderStore:ke,displayPolicyStore:he,closedRange:tt,onClosedRangeChange:m=>{Ae(m)},onNewIssue:()=>ye.open()}),Re=Ls(o,{transport:Ge,issueStores:W,queueStore:ue,sessionLogStore:ze,uiOrderStore:ke,gotoIssue:m=>we.setState({selected_id:m}),getWorkspacePath:()=>we.getState().workspace.current?.path}),y=ti(a,{transport:Ge,pipelineStore:ce,gotoIssue:m=>at.gotoIssue(m),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:m=>Q(m)}),U=Ia(c,{issueStores:W,transport:Ge,queueStore:ue,sessionLogStore:ze,getWorkspacePath:()=>we.getState().workspace.current?.path,onNavigate:m=>{we.getState().view==="worker"?we.setState({selected_id:m}):at.gotoIssue(m)},onClose:()=>{let m=we.getState();we.setState({selected_id:null});try{at.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}}}),B=we.getState().selected_id;B&&(c.hidden=!1,U.load(B),be(B)),we.subscribe(m=>{let v=m.selected_id;v?(c.hidden=!1,U.load(v),Y||be(v)):(U.clear(),c.hidden=!0,re())});let te=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",a.hidden=m.view!=="monitor",ut(m.view==="board"),pt(m.view==="worker"),Qe(m.view==="monitor"),Ue(m.view==="worker"),!m.selected_id&&m.view==="board"&&St.load(),m.view==="worker"&&Re.load(),m.view==="monitor"?y.load():y.pause(),window.localStorage.setItem("beads-ui.view",m.view)};we.subscribe(te),te(we.getState()),ne(),ve(),Pe().finally(()=>{R=!0,fe()}),window.addEventListener("keydown",m=>{let v=m.ctrlKey||m.metaKey,E=String(m.key||"").toLowerCase(),p=m.target,T=p&&p.tagName?String(p.tagName).toLowerCase():"",z=T==="input"||T==="textarea"||T==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;v&&E==="n"&&(z||(m.preventDefault(),ye.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&_u(t)});export{_u as bootstrap,pu as readBootstrapConfig,fu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
