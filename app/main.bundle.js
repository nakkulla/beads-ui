var Hg=Object.create;var al=Object.defineProperty;var zg=Object.getOwnPropertyDescriptor;var Kg=Object.getOwnPropertyNames;var Gg=Object.getPrototypeOf,Vg=Object.prototype.hasOwnProperty;var Yg=(e,t,n)=>t in e?al(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ll=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Xg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Kg(t))!Vg.call(e,s)&&s!==n&&al(e,s,{get:()=>t[s],enumerable:!(r=zg(t,s))||r.enumerable});return e};var Qg=(e,t,n)=>(n=e!=null?Hg(Gg(e)):{},Xg(t||!e||!e.__esModule?al(n,"default",{value:e,enumerable:!0}):n,e));var Ht=(e,t,n)=>Yg(e,typeof t!="symbol"?t+"":t,n);var Nu=ll((g0,Lu)=>{var fs=1e3,_s=fs*60,ms=_s*60,Wr=ms*24,eh=Wr*7,th=Wr*365.25;Lu.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return nh(e);if(n==="number"&&isFinite(e))return t.long?sh(e):rh(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function nh(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*th;case"weeks":case"week":case"w":return n*eh;case"days":case"day":case"d":return n*Wr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*ms;case"minutes":case"minute":case"mins":case"min":case"m":return n*_s;case"seconds":case"second":case"secs":case"sec":case"s":return n*fs;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function rh(e){var t=Math.abs(e);return t>=Wr?Math.round(e/Wr)+"d":t>=ms?Math.round(e/ms)+"h":t>=_s?Math.round(e/_s)+"m":t>=fs?Math.round(e/fs)+"s":e+"ms"}function sh(e){var t=Math.abs(e);return t>=Wr?fi(e,t,Wr,"day"):t>=ms?fi(e,t,ms,"hour"):t>=_s?fi(e,t,_s,"minute"):t>=fs?fi(e,t,fs,"second"):e+" ms"}function fi(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Pu=ll((h0,Du)=>{function oh(e){n.debug=n,n.default=n,n.coerce=a,n.disable=o,n.enable=s,n.enabled=l,n.humanize=Nu(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let _=0;_<d.length;_++)f=(f<<5)-f+d.charCodeAt(_),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,_=null,h,g;function E(...y){if(!E.enabled)return;let te=E,J=Number(new Date),z=J-(f||J);te.diff=z,te.prev=f,te.curr=J,f=J,y[0]=n.coerce(y[0]),typeof y[0]!="string"&&y.unshift("%O");let M=0;y[0]=y[0].replace(/%([a-zA-Z%])/g,(q,j)=>{if(q==="%%")return"%";M++;let X=n.formatters[j];if(typeof X=="function"){let P=y[M];q=X.call(te,P),y.splice(M,1),M--}return q}),n.formatArgs.call(te,y),(te.log||n.log).apply(te,y)}return E.namespace=d,E.useColors=n.useColors(),E.color=n.selectColor(d),E.extend=r,E.destroy=n.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(h!==n.namespaces&&(h=n.namespaces,g=n.enabled(d)),g),set:y=>{_=y}}),typeof n.init=="function"&&n.init(E),E}function r(d,f){let _=n(this.namespace+(typeof f>"u"?":":f)+d);return _.log=this.log,_}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,f){let _=0,h=0,g=-1,E=0;for(;_<d.length;)if(h<f.length&&(f[h]===d[_]||f[h]==="*"))f[h]==="*"?(g=h,E=_,h++):(_++,h++);else if(g!==-1)h=g+1,E++,_=E;else return!1;for(;h<f.length&&f[h]==="*";)h++;return h===f.length}function o(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Du.exports=oh});var Mu=ll((Sn,_i)=>{Sn.formatArgs=ah;Sn.save=lh;Sn.load=ch;Sn.useColors=ih;Sn.storage=uh();Sn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Sn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ih(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ah(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_i.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Sn.log=console.debug||console.log||(()=>{});function lh(e){try{e?Sn.storage.setItem("debug",e):Sn.storage.removeItem("debug")}catch{}}function ch(){let e;try{e=Sn.storage.getItem("debug")||Sn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function uh(){try{return localStorage}catch{}}_i.exports=Pu()(Sn);var{formatters:dh}=_i.exports;dh.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Js=globalThis,oi=Js.trustedTypes,bu=oi?oi.createPolicy("lit-html",{createHTML:e=>e}):void 0,ul="$lit$",or=`lit$${Math.random().toFixed(9).slice(2)}$`,dl="?"+or,Zg=`<${dl}>`,jr=document,eo=()=>jr.createComment(""),to=e=>e===null||typeof e!="object"&&typeof e!="function",pl=Array.isArray,xu=e=>pl(e)||typeof e?.[Symbol.iterator]=="function",cl=`[ 	
\f\r]`,Zs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yu=/-->/g,vu=/>/g,Mr=RegExp(`>|${cl}(?:([^\\s"'>=/]+)(${cl}*=${cl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ku=/'/g,wu=/"/g,Au=/^(?:script|style|textarea|title)$/i,fl=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=fl(1),ro=fl(2),c0=fl(3),Pn=Symbol.for("lit-noChange"),Qt=Symbol.for("lit-nothing"),$u=new WeakMap,qr=jr.createTreeWalker(jr,129);function Su(e,t){if(!pl(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return bu!==void 0?bu.createHTML(t):t}var Eu=(e,t)=>{let n=e.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",o=Zs;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,_=0;for(;_<a.length&&(o.lastIndex=_,d=o.exec(a),d!==null);)_=o.lastIndex,o===Zs?d[1]==="!--"?o=yu:d[1]!==void 0?o=vu:d[2]!==void 0?(Au.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=Mr):d[3]!==void 0&&(o=Mr):o===Mr?d[0]===">"?(o=s??Zs,f=-1):d[1]===void 0?f=-2:(f=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?Mr:d[3]==='"'?wu:ku):o===wu||o===ku?o=Mr:o===yu||o===vu?o=Zs:(o=Mr,s=void 0);let h=o===Mr&&e[l+1].startsWith("/>")?" ":"";i+=o===Zs?a+Zg:f>=0?(r.push(u),a.slice(0,f)+ul+a.slice(f)+or+h):a+or+(f===-2?l:h)}return[Su(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},no=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[u,d]=Eu(t,n);if(this.el=e.createElement(u,r),qr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=qr.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ul)){let _=d[o++],h=s.getAttribute(f).split(or),g=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:g[2],strings:h,ctor:g[1]==="."?ai:g[1]==="?"?li:g[1]==="@"?ci:Br}),s.removeAttribute(f)}else f.startsWith(or)&&(a.push({type:6,index:i}),s.removeAttribute(f));if(Au.test(s.tagName)){let f=s.textContent.split(or),_=f.length-1;if(_>0){s.textContent=oi?oi.emptyScript:"";for(let h=0;h<_;h++)s.append(f[h],eo()),qr.nextNode(),a.push({type:2,index:++i});s.append(f[_],eo())}}}else if(s.nodeType===8)if(s.data===dl)a.push({type:2,index:i});else{let f=-1;for(;(f=s.data.indexOf(or,f+1))!==-1;)a.push({type:7,index:i}),f+=or.length-1}i++}}static createElement(t,n){let r=jr.createElement("template");return r.innerHTML=t,r}};function Fr(e,t,n=e,r){if(t===Pn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,i=to(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=Fr(e,s._$AS(e,t.values),s,r)),t}var ii=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??jr).importNode(n,!0);qr.currentNode=s;let i=qr.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new ds(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new ui(i,this,t)),this._$AV.push(u),a=r[++l]}o!==a?.index&&(i=qr.nextNode(),o++)}return qr.currentNode=jr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},ds=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Qt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Fr(this,t,n),to(t)?t===Qt||t==null||t===""?(this._$AH!==Qt&&this._$AR(),this._$AH=Qt):t!==this._$AH&&t!==Pn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xu(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Qt&&to(this._$AH)?this._$AA.nextSibling.data=t:this.T(jr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=no.createElement(Su(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let i=new ii(s,this),o=i.u(this.options);i.p(n),this.T(o),this._$AH=i}}_$AC(t){let n=$u.get(t.strings);return n===void 0&&$u.set(t.strings,n=new no(t)),n}k(t){pl(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let i of t)s===n.length?n.push(r=new e(this.O(eo()),this.O(eo()),this,this.options)):r=n[s],r._$AI(i),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Br=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,i){this.type=1,this._$AH=Qt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Qt}_$AI(t,n=this,r,s){let i=this.strings,o=!1;if(i===void 0)t=Fr(this,t,n,0),o=!to(t)||t!==this._$AH&&t!==Pn,o&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Fr(this,l[r+a],n,a),u===Pn&&(u=this._$AH[a]),o||(o=!to(u)||u!==this._$AH[a]),u===Qt?t=Qt:t!==Qt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}o&&!s&&this.j(t)}j(t){t===Qt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ai=class extends Br{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Qt?void 0:t}},li=class extends Br{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Qt)}},ci=class extends Br{constructor(t,n,r,s,i){super(t,n,r,s,i),this.type=5}_$AI(t,n=this){if((t=Fr(this,t,n,0)??Qt)===Pn)return;let r=this._$AH,s=t===Qt&&r!==Qt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Qt&&(r===Qt||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ui=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Fr(this,t)}},Tu={M:ul,P:or,A:dl,C:1,L:Eu,R:ii,D:xu,V:Fr,I:ds,H:Br,N:li,U:ci,B:ai,F:ui},Jg=Js.litHtmlPolyfillSupport;Jg?.(no,ds),(Js.litHtmlVersions??(Js.litHtmlVersions=[])).push("3.3.1");var ut=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=n?.renderBefore??null;r._$litPart$=s=new ds(t.insertBefore(eo(),i),i,void 0,n??{})}return s._$AI(e),s};var di="today",pi=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],ps=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Yn(e){return e==="today"?"today":"7d"}function _l(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ur(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ru(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Cu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ou(){let e=null,t=[],n,r=new Set;function s(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,o,l){e=Array.isArray(i)?i:null,t=Array.isArray(o)?o:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Iu(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,i,o=null){e.set(n(s),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof o=="number"?o:null}),r()},append(s,i){let o=n(s),l=e.get(o)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(o,l),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var qu=Qg(Mu(),1);function jt(e){return(0,qu.default)(`beads-ui:${e}`)}function ph(e){let n=ju((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function ju(e){return typeof e=="string"?e.trim():""}function fh(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var _h=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function gs(e){let t=ph(e),n=ju(fh(e).spec_review),r=_h.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:s}:{...t,evidence:r?"published":"draft",skipped:s}}function Fn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function so(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,i=t.priority??2;if(s!==i)return s-i;let o=e.id,l=t.id;return o<l?-1:o>l?1:0}function zu(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,i=t.priority??2;if(s!==i)return s-i;let o=e.id,l=t.id;return o<l?-1:o>l?1:0}function Ku(e,t){let n=Fn(e.updated_at),r=Fn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,i=t.id;return s<i?-1:s>i?1:0}function Gu(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Fn(e.created_at),i=Fn(t.created_at);if(s!==i)return s<i?1:-1;let o=e.id,l=t.id;return o<l?-1:o>l?1:0}function Vu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,i=t?.id;return s<i?-1:s>i?1:0}var mi=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function mh(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(mi,e)}function gl(e){if(!e||typeof e!="object")return!1;let t=e;return mh(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Fu(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Bu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return gs(e).evidence==="published"?1:0;case"created":return Fu(e.created_at);case"updated":return Fu(e.updated_at);default:return null}}function Uu(e,t,n){let r=Bu(e,n.key),s=Bu(t,n.key);if(r===null||s===null)return r===s?0:r===null?1:-1;if(r===s)return 0;let i=r<s?-1:1;return n.dir==="desc"?-i:i}function Yu(e){let t=Array.isArray(e)?e.filter(gl):[];return(n,r)=>{for(let l of t){let a=Uu(n,r,l);if(a!==0)return a}let s=Uu(n,r,{key:"created",dir:"asc"});if(s!==0)return s;let i=n.id,o=r.id;return i<o?-1:i>o?1:0}}var gh=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Wu(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Hu(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=gh.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Xu(e,t){let n=Wu(e),r=Wu(t);if(n!==r)return n<r?-1:1;let s=Hu(e),i=Hu(t);if(s!==i)return s<i?-1:1;let o=Fn(e&&e.created_at),l=Fn(t&&t.created_at);if(o!==l)return o<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ml=2**20;function hs(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Fn(e&&e.created_at)}function Qu(e){return(t,n)=>{let r=hs(t,e),s=hs(n,e);if(r!==s)return r<s?-1:1;let i=t?.id,o=n?.id;return i<o?-1:i>o?1:0}}function hl(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,i=Math.max(0,Math.min(t,s-1)),o=i-1>=0?r[i-1]:null,l=i+1<s?r[i+1]:null;if(!o&&!l)return{rank:0};if(!o)return{rank:hs(l,n)-ml};if(!l)return{rank:hs(o,n)+ml};let a=hs(o,n),u=hs(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,_)=>({bead_id:f.id,rank:_*ml}))}}function bl(e,t={}){let n=jt(`issue-store:${e}`),r=new Map,s=[],i=0,o=new Set,l=!1,a=t.sort||so;function u(){for(let _ of Array.from(o))try{_()}catch{}}function d(){s=Array.from(r.values()).sort(a)}function f(_){if(l||!_||_.id!==e)return;let h=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,h),!(h<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(h<=i)return;r.clear();let g=Array.isArray(_.issues)?_.issues:[];for(let E of g)E&&typeof E.id=="string"&&E.id.length>0&&r.set(E.id,E);d(),i=h,u();return}if(_.type==="upsert"){let g=_.issue,E=!1;if(g&&typeof g.id=="string"&&g.id.length>0){let y=r.get(g.id);if(!y)r.set(g.id,g),E=!0;else{let te=Number.isFinite(y.updated_at)?y.updated_at:0,J=Number.isFinite(g.updated_at)?g.updated_at:0;if(te<=J){for(let z of Object.keys(y))z in g||delete y[z];for(let[z,M]of Object.entries(g))y[z]=M;E=!0}}}i=h,E&&(d(),u())}else if(_.type==="delete"){let g=String(_.issue_id||""),E=g?r.delete(g):!1;i=h,E&&(d(),u())}}}return{id:e,subscribe(_){return o.add(_),()=>{o.delete(_)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),s=[],o.clear(),i=0}}}function gi(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let i of s){let o=e.params[i];n[i]=String(o)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Zu(e){let t=jt("subs"),n=new Map,r=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let h of Array.from(u)){let g=n.get(h);if(!g)continue;let E=g.itemsById;for(let y of d)typeof y=="string"&&y.length>0&&E.set(y,!0);for(let y of f)typeof y=="string"&&y.length>0&&E.set(y,!0);for(let y of _)typeof y=="string"&&y.length>0&&E.delete(y)}}async function i(l,a){let u=gi(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=n.get(l)||null;if(_){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:s,_subKeyOf:gi,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Ju(){let e=jt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function i(a){for(let u of Array.from(r))try{u(a)}catch{}}function o(a,u,d){let f=u?gi(u):"",_=n.get(a)||"",h=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,_),h&&_&&f&&_!==f){let g=t.get(a);if(g)try{g.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let y=bl(a,d);t.set(a,y);let te=y.subscribe(()=>i(a));s.set(a,te)}else if(!h){let g=bl(a,d);t.set(a,g);let E=g.subscribe(()=>i(a));s.set(a,E)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=s.get(a);if(d){try{d()}catch{}s.delete(a)}}return{register:o,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function ed(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function td(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function yl(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"||e==="adr"?e:"board"}?issue=${encodeURIComponent(t)}`}function hh(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function bh(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":/^#\/adr(\b|\/|$)/.test(t)?"adr":"board"}function nd(e){let t=jt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),i=s&&s[1]?decodeURIComponent(s[1]):hh(r),o=bh(r);if(t("hash change \u2192 view=%s id=%s",o,i),e.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${o}?issue=${encodeURIComponent(i)}`:`#/${o}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},i=s.view==="worker"||s.view==="monitor"||s.view==="compare"||s.view==="adr"?s.view:"board",o=yl(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==o?window.location.hash=o:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?s.worker?.selected_parent_id:s.selected_id,o=i?yl(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==o?window.location.hash=o:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var yh=Object.freeze({workspace_config:{default_workspace:null}});function rd(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:yh.workspace_config.default_workspace}}}function sd(e={}){let t=jt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:rd(e.config)},r=new Set;function s(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let o={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?rd(i.config):n.config},l=o.workspace.current?.path!==n.workspace.current?.path||o.workspace.available.length!==n.workspace.available.length||o.workspace.hidden.length!==n.workspace.hidden.length||o.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=o.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;o.selected_id===n.selected_id&&o.view===n.view&&o.filters.status===n.filters.status&&o.filters.search===n.filters.search&&o.filters.type===n.filters.type&&o.board.closed_filter===n.board.closed_filter&&o.worker.selected_parent_id===n.worker.selected_parent_id&&o.worker.show_closed_children.length===n.worker.show_closed_children.length&&o.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=o,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function od(e){let t=jt("activity"),n=0,r=new Map,s=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function o(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,_)=>{let h=s++,g=Date.now();r.set(h,{type:f,start_ts:g}),t("request start id=%d type=%s count=%d",h,f,n+1),o();let E=!1,y=()=>{E||(E=!0,r.delete(h),l())},te=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,f,Date.now()-g),y())},3e4);try{let J=await u(f,_),z=Date.now()-g;return t("request done id=%d type=%s elapsed=%dms",h,f,z),J}catch(J){let z=Date.now()-g;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,f,z,J),J}finally{clearTimeout(te),y()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ve(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}var $l="adr:snapshot",vl=["missing","retired"],kl=["adr_missing","supersede_unapplied"],wl="token_missing",hi="section_missing",bi="usage",ld=["adr_status"],vh=[...kl,wl,hi,bi,...ld];function id(e,t){return t.includes(e)?e:"\uAE30\uD0C0"}function kh(e){return typeof e=="string"&&e.startsWith("docs/")}function wh(e){return new Date(e).toTimeString().slice(0,8)}function $h(e){let t=e.citations_stale||[],n=e.candidates||[],r=[];for(let u of n)for(let d of u.errors||[])r.push(d);let s=t.filter(u=>vl.includes(u.kind)),i=r.filter(u=>kl.includes(u.kind)),o=r.filter(u=>u.kind===wl),l=r.filter(u=>u.kind===hi),a=[...t.filter(u=>!vl.includes(u.kind)),...r.filter(u=>ld.includes(u.kind)||!kl.includes(u.kind)&&u.kind!==wl&&u.kind!==hi&&u.kind!==bi)];return{current:(e.current||[]).length,drift:!!(e.index_drift&&e.index_drift.ok===!1),citation_stale:s.length,unresolved:i.length,token_missing:o.length,pending:l.length,other:a.length,cross:(e.cross_citations||[]).length}}function xh(e,t,n){let r=[],s=(e.citations_stale||[]).filter(a=>a.kind==="retired"&&a.adr===t.id);s.length>0&&r.push({key:"cite",text:`\uC778\uC6A9 stale ${s.length}`});let i=0;for(let a of e.candidates||[])for(let u of a.errors||[])u.adr===t.id&&(i+=1);i>0&&r.push({key:"cand",text:`\uD6C4\uBCF4 ${i}`}),(e.frontmatter_errors||[]).filter(a=>a.file===t.file).length>0&&r.push({key:"fm",text:"frontmatter \uC624\uB958"});let l=0;for(let a of n)if(a.root_dir!==e.root_dir)for(let u of a.cross_citations||[])u.adr===t.id&&u.target?.root_dir===e.root_dir&&(l+=1);return l>0&&r.push({key:"cross",text:`\uD53C\uC778\uC6A9 ${l}`}),r}function ad(e,t){return t?[String(e.id),e.title||"",e.summary||"",e.spec||"",e.bead||""].join(`
`).toLowerCase().includes(t):!0}function Ah(e){return e?{tone:e.status==="accepted"?"ok":"warn",text:e.status}:{tone:"unknown",text:"\uBBF8\uD655\uC778"}}function cd(e,t={}){let n=jt("views:adr"),r=t.adrStore,s=t.gotoIssue,i=t.getWorkspacePath,o=t.switchWorkspace,l=t.openDoc,a={repo:"",query:"",stale_first:!0},u=null;function d(){let P=r?r.get():null;return P&&Array.isArray(P.workspaces)?P.workspaces:[]}function f(P,x,I){let O=I||P;return!kh(P)||!l?c`<span class="adr-doc adr-doc--plain">${O}</span>`:c`<button
      type="button"
      class="adr-doc adr-doc--link"
      @click=${()=>l({path:P,missing_state:null},x)}
    >
      ${O}
    </button>`}function _(P,x){return c`<button
      type="button"
      class="adr-bead"
      @click=${async()=>{let I=i?i():void 0;if(o&&x&&x!==I)try{await o(x)}catch(O){n("switch workspace failed: %o",O);return}s&&s(P)}}
    >
      ${P}
    </button>`}function h(P,x){let I=a.query.trim().toLowerCase(),O=(P.current||[]).filter(fe=>ad(fe,I));if(O.length===0)return c``;let ae=O.map(fe=>({adr:fe,chips:xh(P,fe,x)}));return ae.sort((fe,ye)=>{if(a.stale_first){let Q=fe.chips.length>0?1:0,le=ye.chips.length>0?1:0;if(Q!==le)return le-Q}return ye.adr.id-fe.adr.id}),c`
      <div class="adr-tablewrap">
        <table class="adr-table adr-table--current">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
              <th>summary</th>
              <th>spec</th>
              <th>bead</th>
              <th>신호</th>
            </tr>
          </thead>
          <tbody>
            ${ae.map(({adr:fe,chips:ye})=>c`
                <tr data-adr=${String(fe.id)}>
                  <td class="adr-num">${fe.id}</td>
                  <td>
                    ${f(`docs/adr/${fe.file}`,P.root_dir,fe.title||fe.file)}
                  </td>
                  <td class="adr-date">${fe.date||""}</td>
                  <td class="adr-summary">${fe.summary||""}</td>
                  <td>${fe.spec?f(fe.spec,P.root_dir):c``}</td>
                  <td>
                    ${fe.bead?_(fe.bead,P.root_dir):c``}
                  </td>
                  <td class="adr-signals">
                    ${ye.map(Q=>c`<span class="adr-chip adr-chip--signal"
                          >${Q.text}</span
                        >`)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}function g(P){let x=a.query.trim().toLowerCase(),I=(P.history||[]).filter(O=>ad(O,x)).slice().sort((O,ae)=>ae.id-O.id);return I.length===0?c``:c`
      <details class="adr-history">
        <summary>이력 ${I.length}</summary>
        <div class="adr-tablewrap">
          <table class="adr-table adr-table--history">
            <tbody>
              ${I.map(O=>c`
                  <tr data-adr=${String(O.id)}>
                    <td class="adr-num">${O.id}</td>
                    <td>${O.title||O.file}</td>
                    <td class="adr-status">${O.status}</td>
                    <td class="adr-superseded">
                      ${O.superseded_by===null||O.superseded_by===void 0?"":`\u2192 ${O.superseded_by}`}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </details>
    `}function E(P){return c`<p class="adr-env">환경 · ${P}</p>`}function y(P){let x=P.env_errors?.index;if(x)return c`<section class="adr-sec adr-sec--drift">
        ${E(x)}
      </section>`;let I=P.index_drift;return!I||I.ok!==!1?c``:c`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${I.detail||"\uC778\uB371\uC2A4\uAC00 ADR\uACFC \uC5B4\uAE0B\uB09C\uB2E4"}</p>
    </section>`}function te(P){let x=P.env_errors?.citations;if(x)return c`<section class="adr-sec adr-sec--cite">
        ${E(x)}
      </section>`;let I=P.citations_stale||[];return I.length===0?c``:c`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${I.length}</h3>
      <ul class="adr-rows">
        ${I.map(O=>c`
            <li class="adr-row">
              ${O.file?f(O.file,P.root_dir,`${O.file}${O.line===null||O.line===void 0?"":`:${O.line}`}`):c``}
              <span class="adr-row__mid"
                >${O.adr===null||O.adr===void 0?"":`ADR ${O.adr}`}</span
              >
              <span class="adr-chip adr-chip--kind"
                >${id(O.kind,vl)}</span
              >
              <span class="adr-row__detail">${O.detail||""}</span>
            </li>
          `)}
      </ul>
    </section>`}function J(P){let x=P.env_errors?.candidates;if(x)return c`<section class="adr-sec adr-sec--cand">
        ${E(x)}
      </section>`;let I=(P.candidates||[]).filter(fe=>(fe.errors||[]).length>0),O=[],ae=[];for(let fe of I){let ye=fe.errors||[],Q=ye.filter(pe=>pe.kind!==hi&&pe.kind!==bi),le=ye.some(pe=>pe.kind===bi);if(Q.length===0&&!le){ae.push(fe.spec);continue}O.push({spec:fe.spec,errors:Q,env:le})}return O.length===0&&ae.length===0?c``:c`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${O.map(fe=>c`
          <div class="adr-candspec" data-spec=${fe.spec}>
            <div class="adr-candspec__hd">
              ${f(fe.spec,P.root_dir)}
              ${fe.env?c`<span class="adr-chip adr-chip--env">환경</span>`:c``}
            </div>
            <ul class="adr-rows">
              ${fe.errors.map(ye=>c`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind"
                      >${id(ye.kind,vh)}</span
                    >
                    <span class="adr-row__mid"
                      >${ye.adr===null||ye.adr===void 0?"":`ADR ${ye.adr}`}</span
                    >
                    <span class="adr-row__detail">${ye.detail||""}</span>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      ${ae.length>0?c`<details class="adr-pending">
            <summary>이행 전 스펙 ${ae.length}</summary>
            <ul class="adr-rows">
              ${ae.map(fe=>c`<li class="adr-row">${f(fe,P.root_dir)}</li>`)}
            </ul>
          </details>`:c``}
    </section>`}function z(P){let x=P.cross_citations||[];return x.length===0?c``:c`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${x.length}</h3>
      <ul class="adr-rows">
        ${x.map(I=>{let O=Ah(I.target);return c`
            <li class="adr-row">
              ${f(I.file,P.root_dir,`${I.file}:${I.line}`)}
              <span class="adr-row__mid"
                >→ ADR ${I.repo}/${String(I.adr).padStart(4,"0")}</span
              >
              <span class="adr-chip adr-chip--cross is-${O.tone}"
                >${O.text}</span
              >
            </li>
          `})}
      </ul>
    </section>`}function M(P){let x=$h(P),I=[];return x.current>0&&I.push({key:"current",text:`\uD604\uC7AC \uC720\uD6A8 ${x.current}`}),x.drift&&I.push({key:"drift",text:"\uC778\uB371\uC2A4 drift"}),x.citation_stale>0&&I.push({key:"cite",text:`\uC778\uC6A9 stale ${x.citation_stale}`}),x.unresolved>0&&I.push({key:"cand",text:`\uD6C4\uBCF4 \uBBF8\uC2E4\uCCB4\uD654 ${x.unresolved}`}),x.token_missing>0&&I.push({key:"token",text:`\uD1A0\uD070 \uC5C6\uC74C ${x.token_missing}`}),x.pending>0&&I.push({key:"pending",text:`\uC774\uD589 \uC804 \uC2A4\uD399 ${x.pending}`}),x.other>0&&I.push({key:"other",text:`\uAE30\uD0C0 ${x.other}`}),x.cross>0&&I.push({key:"cross",text:`\uAD50\uCC28 \uC778\uC6A9 ${x.cross}`}),P.computing?I.push({key:"computing",text:"\uACC4\uC0B0 \uC911"}):typeof P.computed_at=="number"&&P.computed_at>0&&I.push({key:"computed",text:`\uAC31\uC2E0 ${wh(P.computed_at)}`}),c`<div class="adr-counts">
      ${I.map(O=>c`<span class="adr-chip adr-chip--count adr-count--${O.key}"
            >${O.text}</span
          >`)}
    </div>`}function D(P,x){let I=P.adr_dir_missing===!0;return c`
      <section class="adr-ws" data-repo=${P.root_dir}>
        <header class="adr-ws__hd">
          <h2>${P.name}</h2>
          ${P.name_duplicate?c`<span class="adr-chip adr-chip--dup">이름 중복</span>`:c``}
        </header>
        ${M(P)} ${h(P,x)} ${g(P)}
        ${I?c``:y(P)}
        ${I?c``:te(P)}
        ${I?c``:J(P)}
        ${I?c``:z(P)}
      </section>
    `}function q(P){return c`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${a.repo===""?"true":"false"}
            @click=${()=>{a.repo="",X()}}
          >
            전체
          </button>
          ${P.map(x=>c`
              <button
                type="button"
                class="adr-filter"
                data-repo=${x.root_dir}
                aria-pressed=${a.repo===x.root_dir?"true":"false"}
                @click=${()=>{a.repo=x.root_dir,X()}}
              >
                ${x.name}
              </button>
            `)}
        </div>
        <input
          type="search"
          class="adr-search"
          placeholder="번호·제목·summary·spec·bead"
          aria-label="ADR 검색"
          .value=${a.query}
          @input=${x=>{a.query=x.target.value,X()}}
        />
        <button
          type="button"
          class="adr-sort"
          aria-pressed=${a.stale_first?"true":"false"}
          @click=${()=>{a.stale_first=!a.stale_first,X()}}
        >
          stale 우선
        </button>
      </div>
    `}function j(){let P=d(),x=a.repo?P.filter(I=>I.root_dir===a.repo):P;return c`
      ${q(P)}
      <div class="adr-body">
        ${x.map(I=>D(I,P))}
      </div>
    `}function X(){ut(j(),e)}return X(),r&&typeof r.subscribe=="function"&&(u=r.subscribe(()=>X())),{destroy(){u&&(u(),u=null),ut(c``,e)}}}function bs(e=void 0,t=void 0,n=void 0){let r=n&&Array.isArray(n.client_ids)?new Set(n.client_ids):null;function s(){if(!t||typeof t.get!="function")return null;let l=t.get();return l&&l.order?l.order:{}}function i(l,a,u){let d=e&&e.snapshotFor?e.snapshotFor(l):[];if(a==="closed")return d.sort(Vu),d;switch(u){case"created_desc":return d.sort(so),d;case"created_asc":return d.sort(zu),d;case"updated_desc":return d.sort(Ku),d;case"priority":return d.sort(Gu),d;case"manual":default:{let f=s();return f?d.sort(Qu(f)):d.sort(so),d}}}function o(l){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(u=>{r&&!r.has(u)||l()})),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(l)),()=>{for(let u of a)try{u()}catch{}}}return{selectBoardColumn:i,subscribe:o}}function wr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=wr(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function yn(e,t){let n=wr(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let i=Math.floor(s/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(s/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ud(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=wr(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function yi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=yi(r);if(!s)continue;let i=n.get(s);i||(i=[],n.set(s,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ki(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let s=ud(n);return{total:n.length,count:r,current:s,children:n}}function ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xl(e,t){return!t||typeof e!="string"||e.length===0||ys(t.visible_labels).includes(e)?!0:ys(t.hidden_labels).includes(e)?!1:!ys(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function dd(e,t){return ys(e).filter(n=>xl(n,t))}function $r(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var pd="bench";function fd(e){let t=e&&typeof e=="object"?e.labels:null;return ys(t).includes(pd)}function _d(e){return!!e&&ys(e.visible_labels).includes(pd)}function md(e){let t=e.transport,n=e.uiOrderStore;function r(o,l){return"renormalize"in o?o.renormalize:[{bead_id:l,rank:o.rank}]}function s(o,l){let a={...o.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:o.revision,order:a})}async function i(o,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(hl(l,a,u.order),o);s(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(_);let h=r(hl(l,a,_.order),o);s(_,h);let g=await t("ui-order-set",{expected_revision:_.revision,entries:h});g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function gd(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Xn(e,t){let n=gd(e),r=gd(t);return n.length===0||r.length===0?!1:n!==r}function Sh(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Eh(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Th(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Sh(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function wi(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let o=Array.isArray(e.children)?e.children:[],l=n>0?o.slice().sort(Xu):o;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Eh(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Th(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Rh={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},yd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},hd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ch={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Oh(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let i=t[s];if(i&&i.fill==="dim"&&i.stale!==!0)return s}return null}function vd(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}var bd="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function Ih(e){let t=!!e&&e.review_state==="incomplete";if(!e||e.fill==="none"||!e.approval_state){let r=vd(e);return t?`${r} \xB7 ${bd}`:r}let n=[];return e.glyph==="review"?n.push(xr.review):e.glyph==="skip"&&n.push(xr.skip),t&&n.push(bd),e.approval_state==="missing"?n.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?n.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?n.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):n.push("\uC2B9\uC778 \uC644\uB8CC"),n.join(" \xB7 ")}function Lh(e,t,n,r){let s=Rh[e]||e,i=t&&t.fill||"none",o=!!t&&t.stale===!0,l=Ch[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${s} dim`:i==="full"&&(a+=` b-${s} full`),o&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",f=yd[e]||e,_=r?kd(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let h=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${_.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${g=>{g.preventDefault(),g.stopPropagation(),r(g,_,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function kd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function $i(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=hd[e.route]||hd.spec_backed,i=e.stages,o=Oh(s,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${yd[u]||u} ${u==="plan"?Ih(i[u]||{}):vd(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&s.some(u=>kd(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${s.map(u=>Lh(u,i[u]||{},u===o,r))}
    </div>
  `}function Nh(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var wd=2;function $d(e){let t=e.slice(0,wd).join(", "),n=e.length-wd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Dh(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],s=[],i=[];for(let o of r)(Xn(e,o)?i:s).push(o);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${$d(s)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${$d(i)}</span
      >`),n}function Ph(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Al(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function xi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function ir(e){return`${e.kind}:${xi(e)}@${e.sha}`}function Ai(e,t){if(!e)return null;let n=Al(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let i=Al(t?.kind),o=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${o?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${ir(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function xd(e,t){let n=Ai(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Mh(e){if(!e)return null;let t=Al(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${ir(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function qh(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&$r(n,"route")){let l=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&$r(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&$r(n,"pr")){let l=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=xd(r.planned_execution,r.exec_receipt);if(i&&s.push(i),r.exec_receipt){let l=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ir(l)}`}
        >${`exec ${l.kind==="delegated"?xi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of dd(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&$r(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(n,"blocked")){let l=Ph(e.metadata);l&&s.push(l),s.push(...Dh(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function jh(e){let t=yn(e.created_at),n=yn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Fh(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return wi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:jh(e),empty_label:"children \uC5C6\uC74C",childChips:Sl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Sl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ai(t,n)?c`<span class="board-card__roll-child-chips">
    ${xd(t,n)}
    ${Mh(n)}
  </span>`:null}function Si(e,t){let n=Nh(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${qh(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?$i(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Fh(e,t)}
    </article>
  `}function vs(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${pi.map(i=>c`<option
                    value=${i.value}
                    ?selected=${i.value===e.closed_range}
                  >
                    ${i.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(i=>Si(i,t))}
      </div>
    </section>
  `}function Ad(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Si(r,t))}
        </div>
      </div>
    </dialog>
  `}var Bh=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Uh=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Wh=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Hh(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(i=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(i)}
                        @change=${()=>t.onLabelToggle(i)}
                      />
                      <span>${i}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Sd(e,t,n){return c`
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
        ${Bh.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${Uh.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Hh(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${Wh.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var zh=200,Kh=["tab:board:ready","tab:board:blocked","tab:board:in-progress","tab:board:resolved","tab:board:deferred","tab:board:closed"],Gh={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Vh=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ed="beads-ui.board.sort",Td=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Yh(){try{let e=window.localStorage.getItem(Ed);if(e&&Td.has(e))return e}catch{}return"created_desc"}function Rd(e,t){let n=jt("views:board"),r=t.gotoIssue,s=t.issueStores,i=t.transport,o=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,_=t.closedRange||di,h=s?bs(s,o,{client_ids:Kh}):null,g=md({transport:i,uiOrderStore:o}),E=[],y=[],te=[],J=[],z=[],M=[],D=!1,q=0,j=Yh(),X=new Map,P=new Map,x=new Map,I=new Set,O={search:"",priority:"",type:"",labels:[]},ae=!1,fe=null;function ye(oe){return String(oe.status||"open")==="open"}function Q(oe){return String(oe.status||"open")==="open"}function le(oe){let be=O.search.trim().toLowerCase(),Qe=O.priority,at=O.type,et=O.labels,ht=_d(ce());return oe.filter(bt=>{if(!ht&&fd(bt))return!1;if(be){let rt=String(bt.id||"").toLowerCase(),Ke=String(bt.title||"").toLowerCase();if(!rt.includes(be)&&!Ke.includes(be))return!1}if(Qe!==""&&String(bt.priority)!==Qe||at!==""&&String(bt.issue_type||"")!==at)return!1;if(et.length>0){let rt=Array.isArray(bt.labels)?bt.labels:[];if(!et.some(Ke=>rt.includes(Ke)))return!1}return!0})}function pe(){let oe=new Set;for(let be of[E,y,te,J,z,M])for(let Qe of be){let at=Array.isArray(Qe.labels)?Qe.labels:[];for(let et of at)typeof et=="string"&&et.length>0&&oe.add(et)}return Array.from(oe).sort()}function Ne(){return O.search.trim()!==""||O.priority!==""||O.type!==""||O.labels.length>0}function qe(){if(!e.hidden)try{if(h){let oe=h.selectBoardColumn("tab:board:in-progress","in_progress",j),be=h.selectBoardColumn("tab:board:blocked","blocked",j).filter(Q),Qe=new Set(oe.map(V=>V.id)),at=h.selectBoardColumn("tab:board:ready","ready",j).filter(V=>ye(V)&&!Qe.has(V.id)),et=h.selectBoardColumn("tab:board:resolved","resolved",j),ht=h.selectBoardColumn("tab:board:deferred","deferred",j),bt=h.selectBoardColumn("tab:board:closed","closed").slice(0,zh),rt=[...be,...at,...oe,...et,...bt];Pe(rt);let Ke=new Set;for(let V of rt)V&&V.id&&!yi(V)&&Ke.add(V.id);let T=!Ne();E=T?oo(be,Ke):be,y=T?oo(at,Ke):at,te=T?oo(oe,Ke):oe,J=T?oo(et,Ke):et,z=ht,q=ht.length,M=T?oo(bt,Ke):bt,X=new Map;for(let V of E)X.set(V.id,"open");for(let V of y)X.set(V.id,"open");for(let V of te)X.set(V.id,"in_progress");for(let V of J)X.set(V.id,"resolved");for(let V of z)X.set(V.id,"deferred");for(let V of M)X.set(V.id,"closed");P=new Map;for(let V of E)P.set(V.id,"blocked-col");for(let V of y)P.set(V.id,"ready-col");for(let V of te)P.set(V.id,"in-progress-col");for(let V of J)P.set(V.id,"resolved-col");for(let V of M)P.set(V.id,"closed-col")}st()}catch{E=[],y=[],te=[],J=[],z=[],M=[],x=new Map,st()}}function Pe(oe){x=vi(oe)}function he(oe){return ki(x,oe)}function U(oe){return!I.has(oe)}function ue(oe,be){oe.preventDefault(),oe.stopPropagation(),I.has(be)?I.delete(be):I.add(be),st()}function _e(oe,be){oe.preventDefault(),oe.stopPropagation(),r(be)}function B(oe,be){oe.preventDefault(),oe.stopPropagation(),r(be)}function W(oe,be){fe||r(be)}function Ce(oe,be){oe.preventDefault(),oe.stopPropagation(),Xh(be).then(Qe=>{Qe&&ve("\uBCF5\uC0AC\uB428","success",1200)})}function K(oe,be){fe=be,oe.dataTransfer&&(oe.dataTransfer.setData("text/plain",be),oe.dataTransfer.effectAllowed="move"),oe.target.classList.add("board-card--dragging")}function ne(oe){oe.target.classList.remove("board-card--dragging"),v(),setTimeout(()=>{fe=null},0)}function se(oe){let be=String(oe.target.value||"");!be||be===_||(_=be,u&&u(be),st())}function ce(){return l?l.get():null}function Re(oe){let be=a?a.get():null,Qe=be?be.cleanup_failed:null;if(!Qe||typeof Qe!="object"||Array.isArray(Qe))return null;let at=Qe[oe];return!at||typeof at!="object"||Array.isArray(at)?null:at}let Z={onCardClick:W,onCopyId:Ce,onDragStart:K,onDragEnd:ne,onClosedRangeChange:se,rollupFor:he,isExpanded:U,onRollupToggle:ue,onChildClick:_e,onFromChipClick:B,onOpenDoc:f?(oe,be)=>f(be):void 0,cleanupFailureFor:Re,get policy(){return ce()}};function Oe(oe,be){fe||(He(),r(be))}function Me(oe,be){oe.preventDefault(),oe.stopPropagation(),He(),r(be)}let Je={...Z,onCardClick:Oe,onChildClick:Me,onFromChipClick:Me,onOpenDoc:f?(oe,be)=>{He(),f(be)}:void 0,get policy(){return ce()}};function je(oe){let be=oe.target,Qe=e.querySelector(".board-filter__labels");be&&Qe&&Qe.contains(be)||Te()}function ie(oe){oe.key==="Escape"&&Te()}function ee(){ae||(ae=!0,document.addEventListener("mousedown",je),document.addEventListener("keydown",ie),st())}function Te(){ae&&(ae=!1,document.removeEventListener("mousedown",je),document.removeEventListener("keydown",ie),st())}function ft(oe){oe.key==="Escape"&&He()}function _t(){D||(D=!0,document.addEventListener("keydown",ft),st())}function He(){D&&(D=!1,document.removeEventListener("keydown",ft),st())}let mt={onClose:He,onOverlayClick(oe){oe.target===oe.currentTarget&&He()}},It={onSearchInput(oe){O.search=String(oe.target.value||""),qe()},onPriorityChange(oe){O.priority=String(oe.target.value||""),qe()},onTypeChange(oe){O.type=String(oe.target.value||""),qe()},onSortChange(oe){let be=String(oe.target.value||"");if(!(!Td.has(be)||be===j)){j=be;try{window.localStorage.setItem(Ed,be)}catch{}qe()}},onDeferredToggle(){D?He():_t()},onLabelMenuToggle(){ae?Te():ee()},onLabelToggle(oe){let be=O.labels.indexOf(oe);be===-1?O.labels.push(oe):O.labels.splice(be,1),qe()},onLabelClear(){O.labels.length!==0&&(O.labels=[],qe())},onNewIssue(){d&&d()}};function St(){return c`
      <div class="board-view">
        ${Sd(O,It,{sort_mode:j,deferred_popup_open:D,deferred_count:q,label_options:pe(),label_menu_open:ae})}
        <div class="board-root">
          ${vs({title:"Blocked",id:"blocked-col",items:le(E)},Z)}
          ${vs({title:"Ready",id:"ready-col",items:le(y)},Z)}
          ${vs({title:"In progress",id:"in-progress-col",items:le(te)},Z)}
          ${vs({title:"Resolved",id:"resolved-col",items:le(J)},Z)}
          ${vs({title:"Closed",id:"closed-col",items:le(M),is_closed:!0,closed_range:_},Z)}
        </div>
        ${D?Ad({items:le(z),count:q},Je,mt):""}
      </div>
    `}function st(){e.hidden||(ut(St(),e),pt())}function pt(){try{let oe=e.querySelector("#deferred-popup");oe&&!oe.open&&(typeof oe.showModal=="function"?oe.showModal():oe.setAttribute("open",""));let be=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Qe of be)Array.from(Qe.querySelectorAll(".board-card")).forEach((et,ht)=>{et.tabIndex=ht===0?0:-1})}catch{}}async function Jt(oe,be){if(!i){ve("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:oe,status:be}),ve("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Qe){n("update-status failed: %o",Qe),ve("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Mt(oe){switch(oe){case"blocked-col":return E;case"ready-col":return y;case"in-progress-col":return te;case"resolved-col":return J;default:return[]}}function Zt(oe,be,Qe){if(!i||!o)return;let at=Mt(oe),et=at.find(T=>T.id===be);if(!et)return;let ht=at.filter(T=>T.id!==be),bt=Qe.closest?Qe.closest(".board-card"):null,rt=ht.length;if(bt){let T=bt.getAttribute("data-issue-id");if(T===be)return;let V=ht.findIndex(Y=>Y.id===T);V>=0&&(rt=V)}let Ke=ht.slice();Ke.splice(rt,0,et),g.applyReorder(be,Ke,rt)}function v(){for(let oe of Array.from(e.querySelectorAll(".board-column--drag-over")))oe.classList.remove("board-column--drag-over")}let G=null;e.addEventListener("dragover",oe=>{oe.preventDefault(),oe.dataTransfer&&(oe.dataTransfer.dropEffect="move");let Qe=oe.target.closest(".board-column");Qe&&Qe!==G&&(G&&G.classList.remove("board-column--drag-over"),Qe.classList.add("board-column--drag-over"),G=Qe)}),e.addEventListener("dragleave",oe=>{let be=oe.relatedTarget;(!be||!e.contains(be))&&G&&(G.classList.remove("board-column--drag-over"),G=null)}),e.addEventListener("drop",oe=>{oe.preventDefault(),G&&(G.classList.remove("board-column--drag-over"),G=null);let be=oe.target,Qe=be.closest(".board-column");if(!Qe)return;let at=oe.dataTransfer?.getData("text/plain")||"";if(!at)return;let et=Qe.id,ht=P.get(at);if(ht&&ht===et){if(Vh.has(et)){if(j!=="manual"){ve("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Zt(et,at,be)}return}let bt=Gh[et];if(!bt){ve("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(at)!==bt&&Jt(at,bt)}),e.addEventListener("keydown",oe=>{let be=oe.target;if(!(be instanceof HTMLElement))return;let Qe=String(be.tagName||"").toLowerCase();if(Qe==="input"||Qe==="textarea"||Qe==="select"||Qe==="button"||Qe==="a"||be.isContentEditable===!0)return;let at=be.closest(".board-card");if(!at)return;let et=String(oe.key||"");if(et==="Enter"||et===" "){oe.preventDefault();let Ke=at.getAttribute("data-issue-id");Ke&&r(Ke);return}if(et!=="ArrowUp"&&et!=="ArrowDown"&&et!=="ArrowLeft"&&et!=="ArrowRight")return;oe.preventDefault();let ht=at.closest(".board-column");if(!ht)return;let bt=Array.from(ht.querySelectorAll(".board-card")),rt=bt.indexOf(at);if(et==="ArrowDown"&&rt<bt.length-1){De(at,bt[rt+1]);return}if(et==="ArrowUp"&&rt>0){De(at,bt[rt-1]);return}if(et==="ArrowLeft"||et==="ArrowRight"){let Ke=Array.from(e.querySelectorAll(".board-column")),T=Ke.indexOf(ht),V=et==="ArrowRight"?1:-1,Y=T+V;for(;Y>=0&&Y<Ke.length;){let Ae=Ke[Y].querySelector(".board-card");if(Ae){De(at,Ae);return}Y+=V}}});function De(oe,be){try{oe.tabIndex=-1,be.tabIndex=0,be.focus()}catch{}}let Ie=null;h&&h.subscribe&&(Ie=h.subscribe(()=>{try{qe()}catch{}}));let Fe=null;l&&l.subscribe&&(Fe=l.subscribe(()=>{try{qe()}catch{}}));let ze=null;return a&&a.subscribe&&(ze=a.subscribe(()=>{st()})),{async load(){n("load"),qe()},clear(){Te(),He(),Ie&&(Ie(),Ie=null),Fe&&(Fe(),Fe=null),ze&&(ze(),ze=null),e.replaceChildren(),E=[],y=[],te=[],J=[],z=[],M=[],X=new Map,P=new Map}}}function oo(e,t){return e.filter(n=>{let r=yi(n);return!(r&&t.has(r))})}async function Xh(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Ei=["bug","feature","task","epic","chore"];function Cd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Od=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var io={usd:null,basis:"none"};function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ks(e){return typeof e=="number"&&Number.isFinite(e)}function Qh(e,t){if(!e||typeof t!="string"||t.length===0||!Hr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Hr(r?.models));for(let r of n){let s=r.models[t];if(Hr(s))return Hr(s.price)?s.price:null}for(let r of n)for(let s of Object.values(r.models))if(Hr(s)&&s.id===t)return Hr(s.price)?s.price:null;return null}function Id(e,t,n){if(!Hr(e))return io;if(ks(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=Qh(n,t);if(!r)return io;if(Od.some(([i])=>ks(e[i]))){let i=0;for(let[o,l]of Od){let a=ks(e[o])?e[o]:0;if(a<=0)continue;let u=r[l];if(!ks(u))return io;i+=a*u/1e6}return{usd:i,basis:"computed"}}return ks(e.total_tokens)&&ks(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:io}var El="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Zh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Ld="\uBD84\uD574 \uC5C6\uB294 leg",Jh="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",eb="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",Tl={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function Ri(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Yt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function ws(e){let t=Ri(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(Jh),n.push(eb),n}function Yt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Zn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],$s=[...Zn,"reasoning_output_tokens"],tb={codex:["implementation","review-consult"],claude:["subagent"]};function Rl(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Zn.some(t=>Number.isFinite(e[t]))}function nb(e){return!e||typeof e!="object"?!1:$s.some(t=>Number.isFinite(e[t]))}function Cl(e){let t=0;for(let n of Zn)t+=Yt(e?.[n]);return t}function rb(e){return!e||typeof e!="object"?!1:Zn.some(t=>Number.isFinite(e[t]))}function Nd(e){return!e||typeof e!="object"?!1:$s.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function sb(e){let t={};for(let n of $s)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Dd(e){let t={};for(let n of $s)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pd(e,t){return Rl(t)?Yt(t.total_tokens):e==="codex"?Yt(t.input_tokens)+Yt(t.output_tokens):Cl(t)}function ob(e){return e==="claude"?"Claude":"Codex"}function ib(e){return`\u03C4 ${jd(e)}`}function ab(e,t){let n=t.breakdown||{},r=Yt(t.total_only_subtotal);if(Rl(n)||r>0&&!nb(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Zh,...ws(t)];return t.replayed&&u.push(El),u.join(`
`)}let s=[`\uC785\uB825 ${Yt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Yt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Yt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Yt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Ld} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",o=r>0?`${i} + ${Ld}`:i,a=[e==="claude"?`Claude subtotal = ${o}`:`Codex subtotal = ${o}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return a.push(...ws(t)),t.replayed&&a.push(El),a.join(`
`)}function fn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let s=Ri(r);t.push({provider:n,label:`${ob(n)} ${ib(r.subtotal)}${s?` \xB7 ${s}`:""}`,tooltip:ab(n,r)})}return t}function Ci(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let s of e)if(!(!s||!s.providers))for(let i of["claude","codex"]){let o=s.providers[i];if(!o)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=o.subtotal,Number.isFinite(o.total_only_subtotal)&&(l.total_only_subtotal=Yt(l.total_only_subtotal)+Yt(o.total_only_subtotal));for(let a of $s)Number.isFinite(o.breakdown[a])&&(l.breakdown[a]=Yt(l.breakdown[a])+Yt(o.breakdown[a]));o.replayed&&(l.replayed=!0),typeof o.total_cost_usd=="number"&&Number.isFinite(o.total_cost_usd)&&(n[i]+=o.total_cost_usd,r[i]=!0,o.cost_estimated===!0&&(l.cost_estimated=!0)),Number.isFinite(o.unpriced_leg_count)&&(l.unpriced_leg_count=Yt(l.unpriced_leg_count)+Yt(o.unpriced_leg_count))}for(let s of["claude","codex"]){let i=t[s];i&&r[s]&&(i.total_cost_usd=n[s])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ol(e,t=null){return!e||typeof e!="object"?null:lr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function Md(e,t){let n=Id(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function lb(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function cb(e){return e==="codex"?"codex":"claude"}function Qn(){return{subtotal:0,breakdown:sb(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function Ti(e,t){e.subtotal+=t.subtotal,Rl(t.usage)&&(e.total_only+=t.subtotal);for(let n of $s)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Yt(e.breakdown[n])+Yt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Yt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function qd(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function jd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function xs(e){return rb(e)?`\u03C4 ${jd(Cl(e))}`:null}function ar(e){let t=xs(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ao(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Yt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Yt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Yt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Yt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Cl(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(El),n.join(`
`)}function lr(e,t,n=null){let r={claude:Qn(),codex:Qn()},s={orchestrator:{claude:Qn(),codex:Qn()},implementation:{claude:Qn(),codex:Qn()},"review-consult":{claude:Qn(),codex:Qn()},subagent:{claude:Qn(),codex:Qn()}},i=new Set,o=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let d=u.usage;if(Nd(d)){let _=cb(u.runner),h=Dd(d),g={provider:_,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:h,subtotal:Pd(_,h)};h.replayed===!0&&(g.replayed=!0),typeof u.model=="string"&&(g.model=u.model),typeof u.session_id=="string"&&(g.session_id=u.session_id),Md(g,n),o.push(g),Ti(r[_],g),Ti(s.orchestrator[_],g)}let f=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let _ of f){let h=_&&_.provider==="claude"?"claude":"codex";if(!_||_.provider!=="codex"&&_.provider!=="claude"||!tb[h].includes(_.role)||!Nd(_.usage))continue;let g=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!g||i.has(g))continue;i.add(g);let E=Dd(_.usage),y={provider:h,role:_.role,attempt_id:String(u.attempt_id||""),usage:E,subtotal:Pd(h,E)};y.receipt_id=g,typeof _.agent_type=="string"&&(y.agent_type=_.agent_type),typeof _.agent_id=="string"&&(y.agent_id=_.agent_id),typeof _.model=="string"&&(y.model=_.model),typeof _.effort=="string"&&_.effort.trim().length>0&&(y.effort=_.effort),typeof _.session_id=="string"?y.session_id=_.session_id:typeof _.thread_id=="string"&&(y.session_id=_.thread_id),typeof _.turn_id=="string"&&(y.turn_id=_.turn_id),(typeof _.completed_at=="string"||typeof _.completed_at=="number"&&Number.isFinite(_.completed_at))&&(y.completed_at=_.completed_at),E.replayed===!0&&(y.replayed=!0),Md(y,n),o.push(y),Ti(r[h],y),Ti(s[y.role][h],y)}}lb(o);let l={};for(let u of["claude","codex"]){let d=r[u];d.legs.length!==0&&(l[u]=qd(d,!1))}if(Object.keys(l).length===0)return null;let a={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let d={};for(let f of["claude","codex"]){let _=s[u][f];_.legs.length>0&&(d[f]={...qd(_,!0),legs:_.legs})}Object.keys(d).length>0&&(a[u]=d)}return{providers:l,roles:a}}var Oi=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."}),Il=Object.freeze({verify_cmd_failed:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deploy_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_red:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",gh_observation_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ref_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",merge_sha_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_rev_unavailable:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ff_diverged:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",deployment_target_not_covering_merge:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",repo_ops_worktree_unowned:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",manual_target_missing:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",base_unresolved:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",bootstrap_not_approved:"Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",foreign_landing_unpinned:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_checkout_unavailable:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_deploy_unsupported:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",interrupted_without_terminal_exit:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",cleanup_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",retry_exhausted:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",conflict_unresolved:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",internal_record_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",repair_lane_retired:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694."}),Ll=Object.freeze({revision_conflict:"\uC791\uC5C5 \uBAA9\uB85D\uC774 \uAC31\uC2E0\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC0C1\uD0DC\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",stale_work_conflict:"\uC774\uC804 \uC791\uC5C5\uC758 \uD655\uC778 \uACB0\uACFC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD45C\uC2DC\uB41C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",waiting_lane_changed:"\uB300\uAE30\uC5F4 \uBC30\uCE58\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC704\uCE58\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",discard_in_progress:"\uC774 \uC791\uC5C5\uC758 \uD3D0\uAE30\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",action_in_flight:"\uB2E4\uB978 \uC791\uC5C5 \uCC98\uB9AC\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",bead_running:"\uC774 \uC774\uC288\uC758 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC2E4\uD589 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",external_pr_owner:"\uB2E4\uB978 \uC138\uC158\uC774 \uAD00\uB9AC\uD558\uB294 PR\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 PR\uACFC \uC138\uC158 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",remote_branch_owner:"\uC6D0\uACA9 \uBE0C\uB79C\uCE58\uAC00 \uB0A8\uC544 \uC788\uC5B4 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBE0C\uB79C\uCE58\uC640 PR \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",base_identity_changed:"\uAE30\uC900 \uBE0C\uB79C\uCE58\uC758 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uAE30\uC900 \uBE0C\uB79C\uCE58\uB97C \uD655\uC778\uD558\uC138\uC694.",worktree_identity_changed:"\uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uC758 \uC2DD\uBCC4 \uC815\uBCF4\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB97C \uD655\uC778\uD558\uC138\uC694.",remote_ref_observe_failed:"\uC6D0\uACA9 PR\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0\uACFC \uC811\uADFC \uAD8C\uD55C\uC744 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694."});var BA=Object.freeze([12e4,3e5,9e5]),Fd=3;var UA=Object.freeze([Object.freeze({group:"api",re:/ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|fetch failed/i}),Object.freeze({group:"runtime",re:/command not found|ENOENT|spawn .* ENOENT|login status|not authenticated/i})]);var Bd={running:3,paused:2,failed:1};function cr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ud(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Wd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let o of n)!o||typeof o.bead_id!="string"||(typeof o.resumed_from=="string"&&o.resumed_from.length>0&&r.add(o.resumed_from),cr(o)&&s.set(o.bead_id,o.attempt_id));let i=new Map;for(let o of n){if(!o||typeof o.bead_id!="string"||o.bead_id.length===0||!cr(o))continue;let l=null;if(o.status==="running")l="running";else if(o.status==="paused"&&!r.has(o.attempt_id))l="paused";else if(o.status==="failed"||o.status==="orphaned"){let d=t.get(o.bead_id),f=typeof d=="number"&&d>0&&typeof o.finished_at=="number"&&d>=o.finished_at;s.get(o.bead_id)===o.attempt_id&&!f&&typeof o.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof o.started_at=="number"?o.started_at:null,u=i.get(o.bead_id);if(u){let d=Bd[u.run_state],f=Bd[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(o.bead_id,{attempt:o,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var ub=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Pl=Object.freeze({codex:"Codex \xB7 Sol",astra:"Codex \xB7 Astra"}),Kd=["orchestration_model","orchestration_effort","orchestration_speed"],Gd=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],db=[...Kd,...Gd],Hd={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},Ml={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},zd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},pb=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","orchestrator-or-runtime-model-default","actual-effort"]);function on(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Nt(e){return typeof e=="string"&&e.length>0?e:null}function As(e){return e.startsWith("gpt-")?e.slice(4):e}function At(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Vd(e,t,n){let r=Nt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Nt(n[e]);return s===null?null:{value:s,source:"global"}}function Ar(e,t,n,r){return Vd(e,t,n)||{value:r,source:"base"}}function Nl(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&on(s?.[t])){let o=Nt(s[t][e]);if(o!==null)return o}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&on(s)){for(let o of Object.values(s))if(on(o)){let l=Nt(o[e]);if(l!==null)return l}else if(Array.isArray(o)&&o.includes(e))return e}let i=r?.model_index?.[e];return Nt(r?.runners?.[i]?.models?.[e]?.id)||e}function fb(e,t){return Nt(t?.review?.reviewers?.[e]?.model)||e}function Bn(e,t,n=!1){if(e==="default")return At(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?As(e):e;return At(e,t,r,e,"explicit")}function Yd(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];on(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(o=>typeof o=="string"));let i=n?.runners?.[e]?.models;if(on(i))for(let o of Object.keys(i))s.includes(o)||s.push(o);return s}function _b(e,t){let n=[],r=e?.implementation?.model_catalog;on(r)&&n.push(...Object.keys(r));let s=t?.runners;if(on(s))for(let i of Object.keys(s))n.includes(i)||n.push(i);return n}function mb(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of _b(t,n)){let i=Yd(s,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ii(e){return At(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Dl(e,t,n){let r=Vd(e,t,n);return r?Bn(r.value,r.source):At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Cn(e){let t=on(e.pin)?e.pin:{},n=on(e.global)?e.global:{},r=on(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&on(r.session)?r.session:null,i=r?.supported===!0&&on(r.orchestration)?r.orchestration:null,o=on(e.runner_catalog)?e.runner_catalog:null,l=Nt(n.quick_fix_impl_model),a=mb(l,s,o),u={};if(s){let d=Ar("workflow_mode",t,n,Nt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?At(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Bn(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let M=`${z}_model`,D=Nt(z==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),q=Ar(M,t,n,D);if(q.value===null)u[M]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!on(s.review?.reviewers?.[q.value]))u[M]=Ii(At(q.value,q.source,"",null,"explicit"));else{let j=fb(q.value,s);u[M]=At(q.value,q.source,As(j),j,q.source==="base"?"default":"explicit")}}for(let[z,M]of Object.entries(Ml)){let D=u[M].value;if(D==="self"||D==="skip"){u[z]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Nt(s.review?.reviewers?.[D||""]?.effort),j=Ar(z,t,n,q);u[z]=j.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}for(let[z,M]of Object.entries(zd)){let D=u[M];if(D.resolution==="incompatible"||D.value==="self"||D.value==="skip"){u[z]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(D.resolution==="unavailable"){u[z]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=Ar(z,t,n,"default");u[z]=q.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Bn(q.value,q.source)}let f=on(s.implementation?.default)?s.implementation.default:{},_=Nt(e.route),h=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),g=on(s.implementation?.route_defaults)?s.implementation.route_defaults:{},E=h&&on(g[_])?g[_]:{},y={},te=!1;if(_==="quick_fix"){let z=Nt(t.impl_runtime),M=Nt(n.quick_fix_impl_runtime),D=z||M,q=D==="inherit"?Nt(e.controller_runtime):D;te=l!==null&&a.runtime!==null&&(D===null||q===a.runtime);let j=Nt(t.impl_dispatch),X=Nt(n.quick_fix_impl_dispatch);if(j!==null)u.impl_dispatch=Bn(j,"pin"),y.impl_dispatch="pin";else if(X!==null)u.impl_dispatch=Bn(X,"global"),y.impl_dispatch="quick_fix";else if(te)u.impl_dispatch=At("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),y.impl_dispatch="implied";else{let P=Nt(E.dispatch)||Nt(f.dispatch);u.impl_dispatch=P?At(P,"base",P,P,"default"):At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),y.impl_dispatch="base"}if(z!==null)u.impl_runtime=Bn(z,"pin"),y.impl_runtime="pin";else if(M!==null)u.impl_runtime=Bn(M,"global"),y.impl_runtime="quick_fix";else if(te){let P=a.runtime;u.impl_runtime=At(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit"),y.impl_runtime="derived"}else{let P=Ar("impl_runtime",{},n,Nt(f.runtime));u.impl_runtime=P.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit"),y.impl_runtime=P.source}for(let P of["impl_model","impl_effort","impl_speed"]){let x=Nt(t[P]),I=Nt(n[`quick_fix_${P}`]),O;x!==null?(O={value:x,source:"pin"},y[P]="pin"):P==="impl_model"&&te&&l!==null?(O={value:l,source:"global"},y[P]="quick_fix"):P!=="impl_model"&&I!==null?(O={value:I,source:"global"},y[P]="quick_fix"):(O=Ar(P,{},n,Nt(f[P.replace("impl_","")])),y[P]=O.source),u[P]=O.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(O.value,O.source,O.value,O.value,O.source==="base"?"default":"explicit")}}else for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=Ar(z,t,n,z==="impl_dispatch"?Nt(E.dispatch)||Nt(f.dispatch):Nt(f[z.replace("impl_","")]));u[z]=M.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let J=u.impl_dispatch.value==="main";if(J?u.impl_dispatch.display=y.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(y.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":y.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Nt(e.controller_runtime):u.impl_runtime.value,M=z?Yd(z,s,o):[];_==="quick_fix"&&y.impl_model==="base"&&y.impl_runtime!=="base"&&M.length>0&&!M.includes(u.impl_model.value)&&(u.impl_model=At("auto","base","auto","auto","default"));let D=u.impl_model.value;if(D!=="auto"&&M.length>0&&!M.includes(D))u.impl_model=Ii(u.impl_model);else{let q=Nl(D,z,s,o);u.impl_model.display=As(q),u.impl_model.full_value=q,y.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let z=Nt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=z?Nt(s.implementation?.effort_by_transport?.[z]?.auto):null;M&&!pb.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}y.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=At(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=y.impl_speed==="quick_fix"?At("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",u.impl_speed.source));for(let z of["impl_runtime","impl_effort","impl_speed"])y[z]==="quick_fix"&&u[z].value!==null&&!u[z].display.endsWith("(quick_fix)")&&(u[z].display=`${u[z].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!te&&a.offered&&(u.quick_fix_impl_model=Ii(At(l,"global","",l,"explicit")));for(let[z,M]of Object.entries(Hd))!z.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,z)&&(u[z]={...u[M]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=At("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(J)for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of ub.filter(f=>!db.includes(f)))u[d]=Dl(d,t,n);if(!s){for(let[d,f]of Object.entries(Ml))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(zd))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Kd){if(!i){u[d]=Dl(d,t,n);continue}let f=d.replace("orchestration_",""),_=Nt(i[f]),h=`quick_fix_${d}`,g=e.route==="quick_fix"?Nt(n[h]):null,E=Nt(t[d]),y=E!==null?{value:E,source:"pin"}:g!==null?{value:g,source:"global"}:Ar(d,{},n,_),te=E===null&&g!==null;if(d==="orchestration_effort"&&y.source==="base"){u[d]=At(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(y.value===null){u[d]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let J=y.source==="base"?Nt(i.model_id)||y.value:Nl(y.value,null,s,o);u[d]=At(y.value,y.source,`${As(J)}${te?" (quick_fix)":""}`,J,y.source==="base"?"default":"explicit");continue}if(y.value==="default"){u[d]=te?At("default","global","default (quick_fix)","default","explicit"):y.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",y.source);continue}u[d]=te?At(y.value,"global",`${y.value} (quick_fix)`,y.value,"explicit"):Bn(y.value,y.source)}for(let d of Gd){let f=Hd[d];u[d]=u[f]?{...u[f]}:Dl(d,t,n)}if(s&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=At(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${As(d)})`,null,"default")}else if(a.runtime!==null){let d=Nl(l,a.runtime,s,o);u.quick_fix_impl_model=At(l,"global",As(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Ii(At(l,"global","",null,"explicit")):u.quick_fix_impl_model=Bn(l,"global");return u}function gb(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Li(e){let t=on(e.pin)?e.pin:{},n=on(e.global)?e.global:{},r=on(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=f=>{let _={...r,...f};return Cn({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,o={...i};delete o[e.key];let l=s(o)[e.key],a=s(i)[e.key],u=Nt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:gb(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let _=s({...i,[e.key]:f})[e.key],h=Object.values(Ml).includes(e.key)&&_.resolution!=="incompatible"&&Object.hasOwn(Pl,f)?Pl[f]:_.display;return{value:f,label:h,full_value:_.full_value}})}}var Ni=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],hb=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],lo=[...Ni.filter(e=>e!=="impl_dispatch"),...hb,"base_sync_accept_local_commits","bdui_url"],Xd=["base_sync_accept_local_commits"],co="true";function Di(e){let t={};if(!hn(e))return t;for(let[n,r]of Object.entries(e)){if(Xd.includes(n)){r===!0&&(t[n]=co);continue}typeof r=="string"&&(t[n]=r)}return t}function Qd(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Un=["orchestration_model","orchestration_effort","orchestration_speed"],Ss=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],ql=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),Es=[...Ni,...Un],bb=lo.filter(e=>Es.includes(e));function yb(e,t){let n={},r=[];for(let[i,o]of Object.entries(ql)){let l=e[i];if(!Object.hasOwn(e,i)){n[o]=null;continue}let a=t[o];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[o]=null,r.push(`lane_incompatible:${o}`);continue}n[o]=l}let s=Object.keys(e).filter(i=>!Object.hasOwn(ql,i));return{values:n,warnings:r,skipped_keys:s}}var uo=["delegated","main"],Pi=["inherit","claude","codex"],Jn=["default","fast"],po=["standard","fast_track"],fo=["codex","astra","opus","fable","self","skip"],Mi=["codex","astra","fable","skip"],qi=["low","medium","high","xhigh"],Zd=["default","fast"],En="auto";function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jd(e){if(!hn(e)||!hn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))hn(r)&&hn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ts(e,t){let n=Jd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[En,...r.flatMap(([,s])=>s)]}function ep(e,t,n,r){if(!hn(e)||!hn(e.runners))return[En];let s=[];for(let[i,o]of Object.entries(e.runners))if(!(!hn(o)||!hn(o.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(o.models)){if(n&&n!==En&&l!==n)continue;let u=r(o,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[En,...s]}function zr(e,t,n){return ep(e,t,n,(r,s)=>hn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ji(e,t,n){return ep(e,t,n,(r,s)=>hn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:hn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Rs(e,t){let n=Jd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function tp(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Ts(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!zr(t,s,r.impl_model||En).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var vb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},kb={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},jl=[...bb,...Un],wb=[...Es,...lo].filter((e,t,n)=>n.indexOf(e)===t&&!jl.includes(e));function np(e,t){let n=hn(e)?e:{},r=hn(t)?t:{},s=[];for(let o of jl){let l=n[o]??null,a=r[o]??null;l!==a&&s.push({key:o,label:vb[o]||o,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let o of[...wb,...Object.keys(r)])!jl.includes(o)&&!i.includes(o)&&Object.hasOwn(r,o)&&i.push(o);return{rows:s,ignored_keys:i}}function rp(e,t,n){let r=hn(e)?e:{},s=yb(hn(t)?t:{},n),i=[];for(let o of Object.values(ql)){let l=r[o]??null,a=s.values[o]??null;l!==a&&i.push({key:o,label:kb[o]||o,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:s.skipped_keys}}function Fl(e,t,n,r,s,i,o=null){return Li({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:s,route:o})}function sp(e,t){let n={};for(let r of lo){let s=e?.[r],i=t?.[r];if(s!==i){if(Xd.includes(r)){n[r]=i===co?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function op(e,t){let n={};for(let r of[...Un,...Ss]){let s=e?.[r]??null,i=t?.[r]??null;s!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Bl=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Un]}],er={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Fi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ul(e,t,n,r,s,i=null){let o=Cn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...o[l]}))}function ip(e,t,n,r,s,i=null){let o={pin:0,global:0,base:0};for(let l of Ul(e,t,n,r,s,i))o[l.source]+=1;return o}function ap(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function lp(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var XA=[...Ni,...Un];var cp=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function _o(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bi(e){if(!_o(e)||!_o(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>_o(n)&&_o(n.models));return t.length>0?t:null}function Wn(e,t){let n=Bi(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function up(e,t){return _o(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function dp(e,t){let n=Bi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return up(r,r.models[t]);return[]}function $b(e){let t=Bi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let i of up(r,s))n.includes(i)||n.push(i);return n}function xb(e,t){if(!t)return $b(e);let r=Bi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let s=[];for(let i of Object.keys(r.models))for(let o of dp(e,i))s.includes(o)||s.push(o);return s}function pp(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let i=Wn(t,r.impl_model);if(r.impl_model&&(!s||i!==s))return r.impl_model="",r.impl_effort="",r;let o=r.impl_model?dp(t,r.impl_model):xb(t,s);return r.impl_effort&&o.length>0&&!o.includes(r.impl_effort)&&(r.impl_effort=""),r}function On(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ui(e){let t=e.runner==="codex"?e.codex_account:e.claude_account;return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,typeof e.speed=="string"?e.speed:"default",typeof t=="string"&&t.length>0?t:null].filter(Boolean).join(" \xB7 ")}function mo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var Wl=new Set(["unavailable","not_applicable"]);function ur(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Hl(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Sr(e,t){return t===null?null:`${er[e]}: ${t.display} (${Fi[t.source]})`}function go(e){return e.filter(t=>t!==null).join(`
`)}function Wi(e){if(typeof e!="object"||e===null)return null;let t=On(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:go(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(er.orchestration_model,e.model),n(er.orchestration_effort,e.effort),n(er.orchestration_speed,e.speed)])}}function zl(e,t){let n=ur(e,"orchestration_model");return n===null||n.resolution==="unavailable"?null:Wn(t,n.value??"")}function Cs(e,t){let n=ur(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ur(e,"orchestration_effort"),s=ur(e,"orchestration_speed"),i=Hl([zl(e,t),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:go(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Sr("orchestration_model",n),Sr("orchestration_effort",r),Sr("orchestration_speed",s)])}}function Ab(e,t){return e===null||e.value===null||Wl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Sb(e){return e===null||Wl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Eb(e){return e===null?null:e.value==="auto"?"auto":Wl.has(e.resolution)?null:e.display}function Kr(e,t){if(typeof e!="object"||e===null)return null;let n=ur(e,"impl_dispatch"),r=ur(e,"impl_runtime"),s=ur(e,"impl_model"),i=ur(e,"impl_effort"),o=ur(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Hl([Ab(r,t??null),Sb(s),Eb(i),o!==null&&o.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:go(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Sr("impl_dispatch",n),Sr("impl_runtime",r),Sr("impl_model",s),Sr("impl_effort",i),Sr("impl_speed",o)])}}function fp(e){if(typeof e!="object"||e===null)return null;if(e.kind==="main")return{text:"\uBA54\uC778",title:go(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4","\uAD6C\uD604: \uCEE8\uD2B8\uB864\uB7EC \uC9C1\uC811(main)"])};if(e.kind!=="delegated")return null;let t=typeof e.model=="string"?e.model:null,n=typeof e.effort=="string"?e.effort:null,r=Hl([t,n]);return r===""?null:{text:r,title:go(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4",t===null?null:`${er.impl_model}: ${t}`,n===null?null:`${er.impl_effort}: ${n}`])}}var Tb=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Rb=Object.freeze(["delivery_unproven:"]);function Os(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Tb.has(t))return"session";for(let n of Rb)if(t.startsWith(n))return"session";return"settlement"}var Cb=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Ob={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Kl(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Ob[n]||"").filter(n=>n.length>0)}var _p={orchestration_model:["fable"],impl_runtime:["claude"]},Gl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function mp(e){return typeof e=="object"&&e!==null?e:null}function gp(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Ib(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Cb.includes(t))}function ho(e,t=e){let n=mp(e);if(!n)return null;let r=gp(n.rec_orchestration_model,_p.orchestration_model);if(r.length===0)return null;let s=gp(n.rec_impl_runtime,_p.impl_runtime),i={orchestration_model:r};s.length>0&&(i.impl_runtime=s);let o=mp(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let _=o[f];typeof _=="string"&&_.length>0&&(a+=1,_===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Ib(n.rec_reason),rec:i,state:d}}function Hi(e){if(!e||typeof e!="object")return"";let t=Kl(e),n=Gl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function zi(e){return e.replace(/\/+$/,"")}function Lb(e,t){let n=zi(e),r=zi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ki(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Lb(r,s))continue;let i=zi(r),o=zi(s);n.add(i.length>=o.length?i:o)}return[...n].sort()}function Vl(e,t){return`${e}\0${t}`}function hp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of s.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:s.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function yo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===s)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function bo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function bp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${bo(s)})`,location_label:bo(s),scope:null,same_lane_ahead:!1};let o=yo(e,r),l=o==="internal"?"\uBBF8\uC801\uC7AC":o==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:o,same_lane_ahead:!1}}function yp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Vl(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),s.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Vl(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let g of _){let E=r.get(g);E&&E!==u&&!h.includes(E)&&h.push(E)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...s.get(f)||[]))}return!1},o=new Map;for(let[l,a]of s){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&o.set(l,u)}return o}function vp(e,t){return Vl(e,t)}var an=e=>e??Qt;var Nb=Object.freeze(["done","abandoned"]);function kp(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Nb.includes(e.phase)}var Db=".chip-popover, .judgement-chip";function Is(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function s(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function o(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(Db)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",o),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",o),document.removeEventListener("keydown",l))}return{toggle:s,close:i,isOpen:r,attach:a,detach:u}}function Ls(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function vn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function Pb(e){let t=await vn(e);ve(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Gr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Pb(e)}}
    >
      ⧉
    </button></span
  >`}var wp=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Mb="worker-ineligible";function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $p(e){return vo(e).includes(Mb)}var qb=new Set(wp),xp=new WeakMap;function Ns(e){return e&&typeof e=="object"?e:{}}function jb(e){let t=xp.get(e);if(t)return t;let n=Sp(e);return xp.set(e,n),n}function Gi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Fb(e,t){if(e.length===0)return null;if(jb(t).has(e))return{lane:"running"};if(Gi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Gi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let s=Gi(r.entries,e);if(s>=0)return{lane:r.id,index:s}}return Gi(t.done,e)>=0?{lane:"done"}:null}function Yl(e,t){let n=qb.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function ko(e,t){let n=Ns(e),r=Ns(t),s=gs(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Ns(n.metadata).route=="string"?Ns(n.metadata).route:""),o=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&$p(n.labels),u=Object.hasOwn(Ns(n.metadata),"awaiting_user"),d=Fb(typeof n.id=="string"?n.id:"",r);return Yl({route:i,spec:o?"n/a":s.conflict?"conflict":s.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Vr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function wo(e){let t=Ns(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],s=[];for(let o of r){if(s.length>=n)break;!o||typeof o.id!="string"||!/^s[1-5]$/.test(o.id)||!Array.isArray(o.entries)||s.push({id:o.id,label:`\uC9C1\uB82C ${o.id.slice(1)}`,count:o.entries.length})}return s.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...s]}function Ap(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Yi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Rp(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Yr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Cp(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Ep(e){return e==="auto"||e==="click"?e:null}function Op(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,s=-1,i=null,o=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=s&&(s=f,r=Ep(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,o=Ep(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:o}}function Ip(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t)continue;let o=i.started_at,l=i.finished_at;typeof o!="number"||typeof l!="number"||!Number.isFinite(o)||!Number.isFinite(l)||l<o||(n+=l-o,r=!0)}return r?n:null}function Xi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Bb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let o of n)o.kind!=="deploy"||o.state!=="succeeded"||typeof o.target_sha!="string"||(!s||(typeof o.finished_at=="number"?o.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=o);let i=n.filter(o=>o.state==="failed"&&!o.dismissed&&!o.superseded_by).length+r.length;return{deploy:s?{sha:Yi(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Lp(e,t){let n=Bb(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?nn(n.deploy.at):""}
            >${Xi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Yr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ds(e){let t=yn(e.created_at),n=yn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Ub(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ao(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function So(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Zi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Np(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function pr(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&kp(_)).sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,o=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,a=s?Ub(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=Np(l),f=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!o&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:o||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:s||null,progress:a,error:l,confirmation:f,abandon:{action:!!s&&s.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Dp(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Vi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Np(t.error),s=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${s?c`<code>백업: ${s}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Wb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Pp(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.action_id;if(typeof s!="string"||s.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(l[d])?Number(l[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:o,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Wb[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:s,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Xr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function $o(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Hb(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Xl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function zb(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Mp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Vr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Kb(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Ji(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Xl(e.predecessors),r=Array.isArray(e.released)?e.released:[],s=Xl(e.dependents),i=Xl(e.overlaps),o=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||s.length>0||t!=="",u=r.length>0||i.length>0||o;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(d=>$o(d,"pred"))}${t}${s.map(d=>$o(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>$o(d,"released"))}${i.map(d=>$o(Hb(d),"overlap"))}${o?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function qp(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>$o({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function ea(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Qr(e){let t=la(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    data-route=${t}
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function ta(e,t){let n=la(e);return{route:n===null?void 0:n,tinted:n!==null&&t===!0}}function Gb(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let s=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...s].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function jp(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function na(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Hi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Vb={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Yb(e,t=!1){let n=Fp(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Fp(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Xb(e,t){if(typeof e!="string"||e.length===0||!Number.isInteger(t)||t<=0)return!1;try{let n=new URL(e).protocol;return n==="https:"||n==="http:"}catch{return!1}}function Bp(e,t){return Xb(e,t)?c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`:""}function ra(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Qb(e){let t=Array.isArray(e.badges)?e.badges:[],n=fn(e.usage),r=ar(e.usage),s=yn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${Bp(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${nn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${qp(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${Qr(e.workflow)}${e.exec_chips?Xr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${ao(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Rp(e.work_kind)}
            >작업 ${Yr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function sa(e,t){return typeof e=="number"?e+Wp-t:0}function Zb(e,t,n){return e?c`<button
    type="button"
    class="worker-dep worker-dep--gate worker-dep--gate-${e.kind} judgement-chip"
    data-chip-key="gate"
    data-bead-id=${t}
    aria-expanded=${n?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Zl(e,t=Date.now()){let n=sa(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function Jl(e,t=Date.now()){let n=!!e.gate;return sa(e.added_at,t)<=0&&!n?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title=${n?"\uD050 \uC815\uC9C0\xB7\uACF5\uAE09\uC790 \uBCF4\uB958\uB97C \uC774 \uD589\uC5D0 \uB300\uD574\uC11C\uB9CC \uBB34\uC2DC\uD558\uACE0 \uC9C0\uAE08 \uC2E4\uD589\uD569\uB2C8\uB2E4":"\uB300\uAE30 \uC9C4\uC785 \uC720\uC608\uB97C \uC774 \uD56D\uBAA9\uC5D0 \uB300\uD574\uC11C\uB9CC \uAC77\uACE0 \uC9C0\uAE08 \uC2E4\uD589\uD569\uB2C8\uB2E4"}
  >
    지금 시작
  </button>`}function Jb(e){let t=e.gate;return!t||t.kind!=="systemic"||typeof t.since!="number"?"":c`<button
    type="button"
    class="op-btn worker-mini__hold-resume"
    data-action="queue-hold-resume"
    data-since=${t.since}
    title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다 (큐 전체)"
  >
    ▶ 재개
  </button>`}function Ps(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${Jb(e)}${Jl(e)}${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function Hn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Qb(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=fn(e.usage),i=ar(e.usage),o=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?yn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=Qr(e.workflow),E=e.lane==="done"?"":jp(e.from_id),y=ra(e.priority),te=c`<span class="worker-mini__title">${e.title}</span>`,J=Bp(e.pr_url,e.pr_number),z=e.foreign_repo?c`<span
        class="worker-mini__foreign-pr"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${e.foreign_repo}</span
      >`:"",M=r.map(Z=>Z===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Z}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Z===e.completion_badge&&e.completion_title||""}
          >${Z}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",q=s.length>0?s.map(Z=>c`<span class="worker-usage" title=${Z.tooltip}
              >${Z.label}</span
            >`):i?c`<span class="worker-usage" title=${ao(e.usage)}
            >${i}</span
          >`:"",j=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",X=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",x=e.discard,I=x?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${x?.attempt_id||""}
          data-operation-id=${x?.operation?.operation_id||""}
          data-discard-mode=${x?.confirmation||"unmerged"}
          ?disabled=${x?!x.enabled:e.discard_enabled===!1}
          title=${x?x.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${x?.label||"\uD3D0\uAE30"}
        </button>`:"",O=x?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${x.operation.operation_id}
        data-operation-kind=${x.operation.kind||""}
        data-last-error=${x.error||""}
        title=${x.abandon.title}
      >
        ${x.abandon.label}
      </button>`:"",ae=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",fe=x?.abandon.action?c`${I}${O}${ae}`:c`${ae}${I}`,ye=e.stale_work||null,Q=ye?c`${ye.can_resume||ye.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ye.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ye.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            다시 확인
          </button>`:""}`:"",le=ye?c`<div class="worker-mini__stale">
        <strong>${ye.title}</strong>
        <span>${ye.summary}</span>
        <span>${ye.cause}</span>
        ${ye.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",pe=e.revise_action?c`<button
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
        </button>`:"",Ne=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),qe=Ne?Xr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",Pe=na(e.rec,dr(e,"rec")),he=dr(e,"gate"),U=Zb(e.gate,e.id,he),ue=Zl(e.added_at),_e=Yb(e,dr(e,"receipt")),B=ea(e.cross_lane_chip),W=Gr(e.log_path),Ce=_||B||g||E||Ne||Pe||_e||q||W?c`<div class="worker-chips">
          ${_}${B}${g}${E}${qe}${Pe}${_e}${q}${W}${he?"":xo(e)}
        </div>`:"",K=Ji(e.dependency_chips,U===""&&ue===""?"":c`${U}${he?xo(e):""}${ue}`),ne=Vi(e),se=t.actions?t.actions:"",ce=!!(o||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||x?.operation||e.revise_action||ye),Re=ta(e.workflow,!o&&e.external!==!0&&e.ghost!==!0);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${Re.tinted?" worker-mini--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${an(Re.route)}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${h}${y}${E}${J}${z}${te}${se}
          </div>
          ${qp(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${g}${qe}${q}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Rp(e.work_kind)}
                  >작업 ${Yr(e.work_ms)}</span
                >`:""}${M}${j}
            <span class="worker-mini__actions"
              >${X}${P}${fe}</span
            >
            ${Ds(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${h}${y}${J}${z}${M}${D}${se}
            </div>
            <div class="worker-mini__body">${te}${le}</div>
            ${K}${Ce}${ce?c`<div class="worker-mini__foot">
                  ${j}
                  <span class="worker-mini__actions"
                    >${X}${P}${fe}${pe}${Q}</span
                  >
                  ${Vi(e)}
                </div>`:""}
            ${Ds(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${h}${y}${te}${J}${z}${M}${D}${j}${X}${P}${fe}${se}
            </div>
            ${K}${Ce}${ne} ${Ds(e)}`}
  </div>`}function ec(e,t){let n,r=[];for(let s of e){let i=s.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Up={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function tc(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Gl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Kl(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Up[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="gate"){let n=e.gate;return n?{title:"\uC790\uB3D9 \uB514\uC2A4\uD328\uCE58\uAC00 \uB9C9\uD600 \uC788\uB2E4",lines:n.lines}:null}if(t==="readiness"){let n=Mp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Fp(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Vb[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var ey=["gate","rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function oa(e,t){for(let n of ey){if(!t(n))continue;let r=tc(e,n);return r?{chip_key:n,content:r}:null}return null}function xo(e){return e.chip_popover?Ls(e.chip_popover.content):""}function dr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var nc="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function rc(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,o=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Up[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),h=dr(e,"spec_after_blocker"),g=zb(e.spec_after_blocker===!0,h),E=Mp(e),y=dr(e,"readiness"),te=Kb(E,y),J=c`${g}${h?xo(e):""}${te}${y?xo(e):""}`,z=Ji(e.dependency_chips,g===""&&te===""?"":J),M=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",D=ea(e.cross_lane_chip),q=Qr(u),j=jp(e.from_id),X=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),P=!r&&(e.blocked===!0||e.queue_placeable===!1),x=ta(u,!r);return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}${P?" worker-card--blocked":""}${x.tinted?" worker-card--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${an(x.route)}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ra(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${dr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${dr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${na(e.rec,dr(e,"rec"))}${Gb(u,dr(e,"qfr"))}
      ${h||y?"":xo(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?$i(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${z}
    ${M||D||q||j||X?c`<div class="worker-chips">
          ${M}${D}${q}${j}${Xr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${ec(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${_?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${Vr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${Ds(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${an(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?rc(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Hn(s))}
          </div>`}
  </section>`}function Tp(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ia(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Tp("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${an(r.drop)}
            data-root-dir=${an(r.root_dir)}
            data-lane-id=${an(r.lane_id)}
            data-lane-length=${an(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${Tp("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>ty(s))}
          </div>`}
    </section>
  </div>`}function ty(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${tr({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${an(t.drop)}
        data-root-dir=${an(t.root_dir)}
        data-lane-id=${an(t.lane_id)}
        data-lane-length=${an(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function aa(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var Hp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},zp={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Kp={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function ny(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function ry(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let s=t&&typeof t=="object"?t.resets_at:null,i=ny(s);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(zp,n))return zp[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Eo(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ca(e){for(let t of Eo(e)){if(Object.hasOwn(Hp,t))return Hp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Vp(e){return Eo(e).length===0?null:ca(e)||"\uC2E4\uD328"}function Zr(e){let t=null;for(let n of Eo(e))Object.hasOwn(Oi,n)&&(t=Oi[n]);return t}function Yp(e){let t=null;for(let n of Eo(e))Object.hasOwn(Il,n)&&(t=Il[n]);return t}function Er(e,t){if(typeof e=="string"&&Object.hasOwn(Kp,e))return Kp[e];let n=ry(e,t);if(n!==null)return n;let r=ca(e),s=Zr(e);return r&&s?`${r} \u2014 ${s}`:r||s?r||s:typeof e=="string"?e:""}function Xp(e,t){let n=ca(e)??ca(t),r=Zr(t)??Zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var sy=new Set(["repo_operation_timeout_unresolved"]);function oy(e){for(let t of Eo(e))if(sy.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function iy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Qp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||oy(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(iy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Yr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Gp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Zp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Gp,t.blocked_reason)?Gp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Er(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Er(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function nr(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function ua(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=nr(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let s=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${s?` \xB7 ${s}`:""}${t}`}let n=nr(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Jp(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function da(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}var ef=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],To=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function pa(e,t){let n=ef.find(s=>s.step===e);if(!n)return null;let r=ef.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function tf(e){let t=To.findIndex(n=>n.step===e);return To.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Jr(e){let t=To.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function ay(e){let t=To.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:To.length}}function fa(e){let t=ay(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var oc=new Set(["queued","running","retry_pending"]),nf=new Set(["failed","succeeded"]),ly={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Ro={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},cy={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ro.base_containment,child_sweep:Ro.child_sweep,branch_cleanup:Ro.branch_cleanup,parent_close:Ro.parent_close};function uy(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function dy(e,t,n){return!["verify","deploy"].includes(e.kind)||![...oc,...nf].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function py(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let i=typeof e.requested_at=="number"?e.requested_at:0,o=typeof t.requested_at=="number"?t.requested_at:0;if(i!==o)return o-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function sc(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,i=ly[s];if(!i)return null;let o=pa(n,`${r} ${i}`);return o?{...o,active:oc.has(s),failed:s==="failed"}:null}function fy(e){return!e||typeof e!="object"?null:cy[e.step]||null}function Co(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=fy(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),o=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=uy(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(g=>g&&typeof g=="object"&&dy(g,t,l)).sort(py):[],u=o?a:[],d=u.find(g=>oc.has(g.state));if(d)return sc(d);if(s)return s.step==="repo_operations"&&a[0]?sc(a[0],!0):null;let f=u.find(g=>nf.has(g.state)?g.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return sc(f);if(r){let g=pa(r.step,r.label);return g?{...g,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Ro[e.cleanup_cursor]:null;if(!_)return null;let h=pa(_.step,_.label);return h?{...h,active:!0,failed:!1}:null}function _a(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var _y="\uBBF8\uC801\uC7AC";function ic(e,t){return`${e} ${t}`}function ac(e,t,n,r){if(!n)return`${e} \u2014 ${t}`;let s=typeof r=="string"&&r.length>0?`\uB2E4\uB978 \uC800\uC7A5\uC18C(${r})`:"\uB2E4\uB978 \uC800\uC7A5\uC18C";return`${e} \u2014 ${t} \xB7 ${s}\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4`}function my(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function lc(e,t){let n=Xn(e,t.id),r=ic("\u26D3",t.id);return{id:t.id,label:r,title:ac(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n,t.workspace_name),...n?{foreign:!0}:{}}}var gy=10080*60*1e3;function rf(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-gy)return null;let s=Xn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",o=ic("\u{1F513}",t.id),l={id:t.id,label:o,title:ac(o,`\uD574\uC81C \u2014 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,s,t.workspace_name),...s?{foreign:!0}:{}};return s?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function sf(e,t,n,r){let s=Xn(e,t),i=ic("\u{1F513}",t),o={id:t,label:i,title:ac(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",s,n),...s?{foreign:!0}:{}};return s?typeof r=="string"&&r.length>0&&(o.openable=!0,o.root_dir=r):o.openable=!0,o}function of(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},s=[];for(let i of[...new Set(n)].sort()){let o=Xn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...o?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):o||(a.openable=!0),s.push(a)}return s}function af(e,t,n={}){let r=new Map,s=new Map;for(let i of t)s.has(i.id)||s.set(i.id,i.location_label);for(let[i,o]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(o)?o:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],d=my(u),f=lc(i,{id:a,location_label:s.get(a)||_y,...d?{workspace_name:d}:{}});f.foreign!==!0?f.openable=!0:typeof u=="string"&&u.length>0&&(f.openable=!0,f.root_dir=u),l.push(f)}l.length>0&&r.set(i,l)}return r}var ha=1,Wp=2e4,Oo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Io=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ts=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function es(e){if(!Array.isArray(e))return[];let t=new Set(ts.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function ya(e,t){let n=es(e);return n.includes(t)?n.filter(r=>r!==t):es([...n,t])}var Ms={show_blocked:!0,readiness:"all",routes:[]},lf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function hy(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!cr(r)||(n=typeof r.status=="string"?r.status:null);return n}function by(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!cr(s))continue;let i=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;i>=r&&(r=i,n=s)}return n}function Sp(e){let t=Ye(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(gf(Ye(t.attempts),n).keys())}function gf(e,t,n={}){let{winners:r,resumed_from_ids:s}=Wd(e,t),i=new Map;for(let[o,l]of r){let a=l.attempt,u=l.run_state;if(bf(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,h=Os(a.quickfix_landing)==="session",g=u!=="running"&&(f||!h)&&!s.has(a.attempt_id),E=!f&&h?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":s.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,y=Ye(n.observations?.[o]),te=Ye(y.pr),J=typeof a.merge_sha=="string"&&a.merge_sha.length>0||te.state==="MERGED",z=pr(n.discard_operations,o,{attempt_id:a.attempt_id,merged:J}),M=u==="failed"?uf(a,{resume_eligible:g,resume_reason:E,confirmation:z.confirmation,history:n.bead_timelines?.[o]}):null;i.set(o,{...cf(a,e,u,n.runner_catalog),started_at:d,...M?{failure:M}:{},can_pause:u==="running"&&f,...a.instructions_restart&&typeof a.instructions_restart=="object"?{instructions_restart:a.instructions_restart}:{},can_resume:g})}for(let[o,l]of Ty(e,t)){if(i.has(o)||l.run_state==="waiting"&&kf(n.admission,o))continue;let a=l.attempt,u=pr(n.discard_operations,o,{attempt_id:a.attempt_id}),d=vf(a),f=l.run_state==="provider_hold"?$y(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[o]}):null;i.set(o,{...cf(a,e,l.run_state,n.runner_catalog),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:uf(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[o]})}:{},...l.run_state==="waiting"?{wait:yy(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function cf(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:lr(t,e.bead_id,r)}}function uf(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:vf(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,...e.continuation_choice==="prior_attempt"?{continuation_choice:"prior_attempt"}:{},landed:Dp(e),confirmation:t.confirmation,...hf(t.history)}}function hf(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let s of t)!s||typeof s!="object"||typeof s.summary!="string"||s.summary.length===0||n.push({event_id:typeof s.event_id=="string"?s.event_id:"",kind:typeof s.kind=="string"?s.kind:"",summary:s.summary,at:typeof s.at=="number"?s.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function yy(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let s of n)!s||typeof s!="object"||typeof s.id!="string"||s.id.length===0||r.push({id:s.id,rig:typeof s.rig=="string"?s.rig:null,status:typeof s.status=="string"?s.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function bf(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function vy(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Ye(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(s=>Array.isArray(s?.attempt_ids)&&s.attempt_ids.includes(e.attempt_id))||null}function yf(e,t){if(e===null)return null;let n=Ye(t).claude;if(!Array.isArray(n))return null;let r=n.find(s=>s?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function ky(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function wy(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(o=>o?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||ky(e,r.attempts)?"disarmed":null}function $y(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,s=vy(e,t.provider_hold),i=typeof s?.model=="string"&&s.model.length>0?s.model:typeof e.model=="string"&&e.model.length>0?e.model:null,o=typeof s?.account=="string"&&s.account.length>0?s.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof s?.last_error=="string"?s.last_error:"",a=wy(e,s,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof s?.resets_at=="number"?s.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof s?.next_probe_at=="number"?s.next_probe_at:null,f=yf(o,t.account_catalog),_=hf(t.history);return{kind:s?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||o?{target:{...i?{model:i}:{},...o?{account:o}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...s?.auto_switch==="none"||s?.auto_switch==="disabled"?{auto_switch:s.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function vf(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var df=Fd;function xy(e,t){if(!e||e.kind!=="env"&&e.kind!=="systemic")return null;let n=Er(e.cause)||String(e.cause||""),r=typeof e.since=="number"?e.since:null,s=nr(r),i=[n,...s?[`\uC2DC\uC791 ${s}`]:[]];if(e.kind==="systemic"){let d=(Array.isArray(e.bead_ids)?e.bead_ids:[]).filter(_=>typeof _=="string"&&_.length>0),f=typeof e.halted_by_attempt_id=="string"&&e.halted_by_attempt_id.length>0?e.halted_by_attempt_id:null;return{kind:"systemic",label:`\u26D4 \uC815\uC9C0 \xB7 ${n}`,title:n,since:r,next_at:null,lines:[...i,...f?[`\uC815\uC9C0\uC2DC\uD0A8 attempt ${f}`]:[],...d.length>0?[`bead ${d.join(", ")}`]:[],"\uCD9C\uAD6C: \uC774 \uD589\uC758 \u25B6 \uC7AC\uAC1C(\uD050 \uC804\uCCB4) \uB610\uB294 [\uC9C0\uAE08 \uC2DC\uC791](\uC774 \uD589\uB9CC)"]}}let o=Array.isArray(t)?t:[],l=o.map(d=>d?d.next_at:null).filter(d=>typeof d=="number"&&Number.isFinite(d)).sort((d,f)=>d-f),a=l.length>0?l[0]:null,u=nr(a);return{kind:"env",label:u?`\u21BB \uD658\uACBD \uBCF4\uB958 \xB7 \uB2E4\uC74C ${u}`:"\u21BB \uD658\uACBD \uBCF4\uB958 \xB7 \uC7AC\uC2DC\uB3C4 \uC2E4\uD589 \uC911",title:n,since:r,next_at:a,lines:[...i,...o.filter(d=>d&&typeof d.bead_id=="string").map(d=>{let f=typeof d.attempts=="number"?d.attempts:df,_=nr(d.next_at);return`${d.bead_id} \xB7 \uC7AC\uC2DC\uB3C4 ${f}/${df} \xB7 ${_?`\uB2E4\uC74C ${_}`:"\uC7AC\uC2DC\uB3C4 \uC2E4\uD589 \uC911"}`}),a===null?"\uCD9C\uAD6C: [\uC9C0\uAE08 \uC2DC\uC791](\uC774 \uD589\uB9CC) \u2014 \uC7AC\uC2DC\uB3C4 \uACB0\uACFC\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911":"\uCD9C\uAD6C: \uC7AC\uC2DC\uB3C4 \uB300\uAE30 \uD0C0\uC77C\uC758 \u21BB \uC9C0\uAE08 \uC7AC\uC2DC\uB3C4, \uB610\uB294 [\uC9C0\uAE08 \uC2DC\uC791](\uC774 \uD589\uB9CC)"]}}function Ay(e,t,n,r){if(e===null)return null;let s=Ye(Ye(n)[e]),i=Array.isArray(s.targets)?s.targets:[],o=i.find(J=>J&&J.kind==="outage"),l=o?null:i.find(J=>J&&J.kind==="usage_limit"&&(typeof J.account!="string"||t!==null&&J.account===t)),a=o||l||null;if(!a)return null;let u=typeof a.account=="string"?a.account:null,d=yf(u,r),f={kind:o?"outage":"usage_limit",...typeof a.resets_at=="number"?{resets_at:a.resets_at}:{},...typeof a.next_probe_at=="number"?{next_probe_at:a.next_probe_at}:{},target:{...typeof a.model=="string"?{model:a.model}:{},...u?{account:u}:{},...d?{account_alias:d}:{}},...typeof a.auto_switch=="string"?{auto_switch:a.auto_switch}:{}},_=ua(f),h=[a.model,d||u].filter(J=>typeof J=="string"&&J.length>0).join(" \xB7 "),g=typeof a.last_error=="string"&&a.last_error.length>0?a.last_error:typeof a.detail=="string"&&a.detail.length>0?a.detail:null,E=o?nr(a.next_probe_at):nr(a.resets_at),y=da(a.auto_switch),te=!o&&u===null;return{kind:o?"provider_outage":"provider_usage",label:_,title:_,since:null,next_at:o?typeof a.next_probe_at=="number"?a.next_probe_at:null:typeof a.resets_at=="number"?a.resets_at:null,lines:[...h?[h]:[],...g?[g]:[],...E?[`${o?"\uB2E4\uC74C \uD504\uB85C\uBE0C":"\uB9AC\uC14B"} ${E}`]:[],...y?[y]:[],te?"\uCD9C\uAD6C: [\uC9C0\uAE08 \uC2DC\uC791](\uC774 \uD589\uB9CC, \uAC8C\uC774\uD2B8 \uBB34\uC2DC) \u2014 \uC774 target\uC740 \uD504\uB85C\uBE0C\uAC00 \uC5C6\uACE0, \uBB36\uC778 attempt\uC758 \u21BB \uC774\uC5B4\uD558\uAE30\uAC00 \uC9C0\uC6B4\uB2E4(\xA76 F3)":"\uCD9C\uAD6C: [\uC9C0\uAE08 \uC2DC\uC791](\uC774 \uD589\uB9CC, \uAC8C\uC774\uD2B8 \uBB34\uC2DC) \u2014 target\uC740 \uD504\uB85C\uBE0C \uC131\uACF5 \uC2DC \uC790\uB3D9 \uD574\uC81C"]}}function Sy(e,t,n){let r=e[`${t}_account`];if(typeof r=="string"&&r.length>0)return r;let s=Ye(n)[t];if(!Array.isArray(s))return null;let i=s.find(o=>o?.active===!0);return i&&typeof i.email=="string"?i.email:null}var Ey=new Set(["parked","retry_wait","waiting"]);function Ty(e,t){let n=Object.values(e||{}),r=new Set(n.map(o=>o?.resumed_from).filter(o=>typeof o=="string")),s=new Map;for(let o of n)o&&typeof o.bead_id=="string"&&cr(o)&&s.set(o.bead_id,o.attempt_id);let i=new Map;for(let o of n){let l=bf(o);if(!o||typeof o.bead_id!="string"||o.bead_id.length===0||!cr(o)||!Ey.has(o.status)&&!l||s.get(o.bead_id)!==o.attempt_id||typeof o.dismissed_at=="number"||l&&r.has(o.attempt_id))continue;let a=t.get(o.bead_id);typeof a=="number"&&a>0&&typeof o.finished_at=="number"&&a>=o.finished_at||i.set(o.bead_id,{attempt:o,run_state:l?"provider_hold":o.status})}return i}function pf(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function kf(e,t){let n=Ye(Ye(e)[t]),r=Ye(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Ye(e){return e&&typeof e=="object"?e:{}}function dc(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Ry(e){let t=Ye(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Cy(e,t,n){let r=Ye(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,i=e.runner_catalog,o=e.session_defaults;if(!s||!i||!o)return null;let l=_=>Cn({pin:_,global:o,execution_defaults:s,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=ff(Cs(a,i),Cs(u,i)),f=ff(Kr(a,null),Kr(u,null));return d||f?{orchestration:d,worker:f}:null}function ff(e,t){return!e||t&&t.text===e.text?null:e}function Oy(e,t,n){let s=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(o=>o&&typeof o=="object"&&typeof o.id=="string").slice().sort((o,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof o.closed_at=="number"?o.closed_at:0)),i=[];for(let o of s){let l=typeof o.workspace_name=="string"&&o.workspace_name.length>0?o.workspace_name:dc(o.root_dir),a=rf(e,{...o,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function pc(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Iy=new Set(["quick_fix","spec_backed","full_plan"]);function _f(e){return typeof e=="string"&&Iy.has(e)}function Ly(e){let t={...Ye(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function mf(e,t,n){let r=e.runner_catalog??null,s=ba(e,t,n,null);if(!s)return null;let i=Wn(r,s.orchestration_model.value??""),o=i===null?s:ba(e,t,n,i)||s,l=Cs(o,r),a=Kr(o,i);return l||a?{orchestration:l,worker:a}:null}function ba(e,t,n,r){let s=_f(n)?n:_f(t.route)?t.route:null;try{return Cn({pin:t,global:Ly(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:s,controller_runtime:r})}catch{return null}}function Ny(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Kr(ba(e,Ye(t.metadata),t.route,n),n)}function Dy(e){if(!e)return null;let t=Wi(e),n=fp(e.impl_actor);return t||n?{orchestration:t,worker:n}:null}function la(e){if(!e)return null;let t=Ye(e),n=Ye(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",s=n.route_source==="derived"||t.route_source==="derived";return r.length===0||s?"unset":r}function Py(e){return la(e.workflow)??"unset"}function fc(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function My(e){let t={};for(let l of Zn)t[l]=0;let n=!1,r=0,s=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Zn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(s+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}s>0&&i===s&&(t.total_cost_usd=r);let o=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return o.length>0?fn(Ci(o)):n?ar(t):null}function wf(e,t){let n=yo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function qy(e,t,n){let r=t.get(e);if(!r)return wf(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return bo(r)}function jy(e,t,n,r,s,i){let o=t.get(e);if(!o)return{label:i&&yo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":wf(e,n),title:""};if(o.state==="runnable"&&i&&yo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let a=r.get(e),u=o.lane==="parallel"?"\uBCD1\uB82C":o.lane,d=s.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${u} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":bo(o),title:""}}function Fy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function By(e,t,n,r,s,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(o=>i.failed_by_bead.get(o.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(o=>i.armed_by_bead.get(o.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ga(e,t){return`${typeof e=="string"?e:""}\0${t}`}function Uy(e,t,n,r,s,i,o,l,a){let u=[];return e.forEach((d,f)=>{let _=typeof d.id=="string"?d.id:"";if(_.length===0)return;let h=d.status==="confirmed"?"confirmed":"draft",g=Array.isArray(d.entries)?d.entries:[],E=[];g.forEach((z,M)=>{let D=z&&typeof z.bead_id=="string"?z.bead_id:"";if(D.length===0)return;let q=z&&typeof z.root_dir=="string"?z.root_dir:"",j=n.get(D),X=j?j.state:void 0,P=X==="running"||X==="pr_wait"||X==="done",x=!j||X==="runnable",I=j&&j.lane==="parallel"&&typeof j.position=="number"?j.position-1:null,O=jy(D,n,r,t,l,h==="confirmed"),ae=E.length>0?E[E.length-1]:null,fe=h==="confirmed"&&ae!==null&&!ae.done&&!(t.get(D)||[]).includes(ae.id),ye=a.get(ga(q.length>0||!j?q:j.root_dir,D))||null;E.push({id:D,title:s.get(D)||D,route:ye?ye.route:null,route_source:ye?ye.route_source:null,exec_chips:ye?ye.exec_chips:null,added_at:ye?ye.added_at:null,root_dir:j?j.root_dir:q,workspace_name:j?j.workspace_name:i.get(q)||"",seq:M+1,location_label:O.label,location_title:O.title,draggable:!P,fixed:P,done:X==="done",unplaced:x,mismatch:fe,...I!==null?{queue_index:I}:{}})}),E.forEach((z,M)=>{z.seq=M+1});let y=E.length>0&&E.every(z=>z.done),te=E.filter(z=>!z.fixed&&o.armed_by_bead.get(z.id)!==_).map(z=>z.id),J=By(_,h,E,y,te,o);u.push({lane_id:_,status:h,draft:h==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:E,all_done:y,can_confirm:h==="draft"&&E.length>=2,has_mismatch:h==="confirmed"&&E.some(z=>z.mismatch),unlaunched:te,...J})}),u}function Wy(e,t,n){if(e.lane==="runnable"){let o=n.get(e.id);return o?o.length===0?{scope:[],state:"missing"}:{scope:o,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let i=s.scope.filter(o=>typeof o=="string"&&o.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Hy(e,t,n,r,s){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:_}=Wy(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:f})}let o=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=o.get(d);f?f.push(a):o.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],_={id:f.id,title:f.title,location_label:qy(f.id,r,s),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let h of a.cards)h.overlap_chips?h.overlap_chips.push(_):h.overlap_chips=[_]};for(let a of o.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Ki(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function cc(e,t,n,r){let s=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,o=!Xn(e.id,t),l=typeof e.root_dir=="string"?e.root_dir:"",a=typeof s=="string"&&s.length>0?s:typeof i=="string"&&i.length>0?i:o&&l.length>0?l:"";return a.length>0?{openable:!0,root_dir:a}:o?{openable:!0}:{}}function zy(e,t,n,r){let s=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&s.add(l);if(s.size===0)return{ids:[]};let i={},o={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of s){let a=o[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Xn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...s],root_dirs:i}}function uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ma(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ky(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",s=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||s.includes(t)}}function Gy(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let s of e.runnable_sections)n.push(s.items);let r=[];for(let s of e.queue_groups){n.push(s.items,s.sublanes.parallel);for(let i of s.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let s of n)for(let i of s)i.search_match=t(i);for(let s of r)for(let i of s)i.search_match=t(i)}function Tr(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,o={...Ms,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Oo.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),_=new Map;for(let v of s)v&&typeof v.root_dir=="string"&&_.set(v.root_dir,v);let h=new Map;for(let v of s)v&&typeof v.root_dir=="string"&&h.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&h.set(v.root_dir,v.name||v.root_dir);let g=[],E=[],y=[],te=[],J=[],z=[],M=new Map,D=new Map,q=new Map,j=new Map,X=new Map,P=new Map,x=new Map,I=new Map,O=new Map,ae=new Map,fe=new Map,ye=new Map,Q=new Map,le=new Map,pe=new Map,Ne=new Map,qe=new Map,Pe=new Set,he=new Map,U=new Map,ue=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let G=v.root_dir,De=v.name||G,Ie=_.get(G),Fe=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof v.revision=="number"?v.revision:0,ze=Ye(v.attempts),oe=Ie&&Ie.runner_catalog||v.runner_catalog||null,be=Ye(v.bead_titles);for(let[A,p]of Object.entries(be))typeof p=="string"&&p.length>0&&ue.set(A,p);let Qe=Ye(v.bead_times),at=Ye(v.pr_observations),et=Ye(v.admission),ht=Ye(v.blocker_workspaces);ye.set(G,ht);for(let[A,p]of Object.entries(et))p&&typeof p=="object"&&fe.set(A,p);let bt=Ye(v.revise_parked),rt=Ye(v.merge_queue_state),Ke=Ye(v.cleanup_failed),T=Ye(v.discard_operations),V=Ye(v.bead_timelines),Y=Ye(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&he.set(G,Ye(v.bead_scope));let Ae=Ye(v.bead_workflow),xe=Ye(v.pr_activity),yt=Array.isArray(v.repo_operations)?v.repo_operations:[];I.set(G,yt);let xt=typeof v.declared_base=="string"?v.declared_base:null;x.set(G,xt),P.set(G,Object.entries(Ke).map(([A,p])=>({bead_id:A,step:p&&p.step?p.step:"",reason:p&&p.reason?p.reason:"",at:p&&typeof p.at=="number"?p.at:null,detail:p&&typeof p.detail=="string"?p.detail:null,output_tail:p&&typeof p.output_tail=="string"&&p.output_tail?p.output_tail:void 0,log_path:p&&typeof p.log_path=="string"&&p.log_path?p.log_path:void 0,retry_count:p&&typeof p.retry_count=="number"&&Number.isInteger(p.retry_count)&&p.retry_count>0?p.retry_count:0,failure_code:p&&typeof p.failure_code=="string"?p.failure_code:void 0})));for(let[A,p]of Object.entries(Ye(v.bead_overlay)))p&&typeof p=="object"&&O.set(`${G}\0${A}`,p);let vt=new Map;for(let A of Object.values(ze))A&&typeof A.attempt_id=="string"&&vt.set(A.attempt_id,A);let Lt=Array.isArray(v.merge_queue)?v.merge_queue:[],qt=new Set(Lt.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Gt=new Map(Lt.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),rn=new Map,kt=new Map,en=new Map,un=new Map;Lt.forEach((A,p)=>{A&&typeof A.bead_id=="string"&&(rn.set(A.bead_id,p+1),kt.set(A.bead_id,A.resolution),en.set(A.bead_id,A.continuation_action||null),un.set(A.bead_id,A.authority||null))});let Ut=Ye(v.auto_merge_skips),Vt=A=>{let p=Ut[A];if(!p)return null;let m=Ye(Ye(at[A]).pr).head_sha;return m&&m===p.head_sha?p.reason||"":null};X.set(G,{positions:rn,resolutions:kt,continuations:en,authorities:un,state:{active:typeof rt.active=="string"?rt.active:null,failures:Ye(rt.failures),waiting:rt.waiting&&typeof rt.waiting.bead_id=="string"&&typeof rt.waiting.reason=="string"?rt.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(A=>A&&A.bead_id).filter(A=>typeof A=="string"&&Vt(A)!==null),running:Lt.length>0}),Ne.set(G,{hold:v.hold&&typeof v.hold=="object"?v.hold:null,lineages:Array.isArray(v.lineages)?v.lineages:[],provider_hold:Ye(v.provider_hold),account_catalog:Ye(v.account_catalog)});let Xt=Array.isArray(v.queue)?v.queue:[];for(let A of[...Xt,...(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).flatMap(p=>Array.isArray(p?.entries)?p.entries:[]),...Array.isArray(v.pr_wait)?v.pr_wait:[]])A&&typeof A.bead_id=="string"&&typeof A.armed_by_lane=="string"&&A.armed_by_lane.length>0&&pe.set(A.bead_id,A.armed_by_lane);for(let A of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof A=="string"&&A.length>0&&Pe.add(A);let Ve=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),N=Ye(v.lane_states),$e=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,Ve.length);q.set(G,$e),j.set(G,Xt.length);let Ue=new Map(Ve.map(A=>[A.id,A])),wt=new Map;for(let A of Ve)for(let p of A.entries)p&&typeof p.bead_id=="string"&&wt.set(p.bead_id,A.id);for(let[A,p]of Object.entries(Ye(v.bead_dependents))){let m=Array.isArray(p?.ids)?p.ids:[],S=Ye(p?.root_dirs),C=le.get(A)||{ids:new Set,root_dirs:{}};for(let re of m)typeof re=="string"&&re.length>0&&C.ids.add(re);for(let[re,ge]of Object.entries(S))typeof ge=="string"&&ge.length>0&&(C.root_dirs[re]=ge);le.set(A,C)}for(let[A,p]of Object.entries(Y))Array.isArray(p)&&ae.set(A,p.filter(m=>typeof m=="string"&&m.length>0));let tt=Array.isArray(v.done)?v.done:[];for(let A of tt)A&&typeof A.bead_id=="string"&&z.push({id:A.bead_id,root_dir:G,workspace_name:De});let Et=new Map;for(let A of tt)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&Et.set(A.bead_id,A.added_at);let Tt=A=>({id:A,title:be[A]||A,root_dir:G,workspace_name:De,expected_revision:Fe,draggable:!1,...Ye(Qe[A]).created_at?{created_at:Ye(Qe[A]).created_at}:{},...Ye(Qe[A]).updated_at?{updated_at:Ye(Qe[A]).updated_at}:{}}),lt=A=>{let p=Ae[A]?.chips?.pr;return p&&typeof p.number=="number"&&typeof p.url=="string"?{pr_number:p.number,pr_url:p.url}:{}},Bt=A=>Object.hasOwn(Y,A)?{blocked_by:Array.isArray(Y[A])?Y[A].filter(p=>typeof p=="string"&&p.length>0):[]}:{},An=(A,p)=>{let m=Bt(A),S=et[A],C=S&&S.reason==="prerequisite_unmet"&&Array.isArray(S.blockers)?S.blockers:[],re=(p?.blockers||[]).map(Ee=>Ee.id).filter(Ee=>typeof Ee=="string"&&Ee.length>0);if(p&&Object.hasOwn(Y,A)){let Ee=m.blocked_by||[],w=re.filter(R=>!Ee.includes(R));return w.length>0&&Q.set(`${G}\0${A}`,w),{blocked_by:Ee,wait:{...p,returning:Ee.length===0}}}let ge=[...re,...C.map(Ee=>Ee.id)].filter(Ee=>typeof Ee=="string"&&Ee.length>0);if(ge.length===0)return p?{...m,wait:{...p,returning:!1}}:m;let we=[...m.blocked_by||[]];for(let Ee of ge)we.includes(Ee)||we.push(Ee);return{blocked_by:we,...p?{wait:{...p,returning:!1}}:{}}},$t=new Set;for(let[A,p]of gf(ze,Et,{discard_operations:T,observations:at,bead_timelines:V,provider_hold:Ye(v.provider_hold),auto_resume_pending:Array.isArray(v.auto_resume_pending)?v.auto_resume_pending:[],account_catalog:Ye(v.account_catalog),runner_catalog:oe,admission:et})){$t.add(A);let m=p.run_state==="failed"?Fy(ze,p.attempt_id):null;m!==null&&qe.set(A,m);let S=vt.get(p.attempt_id)||null,C=O.get(`${G}\0${A}`),re=C&&C.rollup?C.rollup:null,ge=pc(xt,S?S.target_base:null),we=S?fc(S,vt):!1,Ee=S&&S.quickfix_lane===!0&&S.quickfix_landing&&typeof S.quickfix_landing=="object"?S.quickfix_landing:null,w=Ee&&typeof Ee.reason=="string"&&Ee.reason.length>0?Ee.reason:null,R=Ee?Co({bead_id:A,merge_sha:Ee.head_sha,cleanup_cursor:Ee.cursor,cleanup_failed:w?{step:Ee.cursor,reason:w}:null,repo_operations:yt}):null,Le=An(A,p.wait);E.push({...Tt(A),lane:"running",...Le,...wt.has(A)?{serial_lane_id:wt.get(A)}:{},attempt_id:p.attempt_id,run_state:p.run_state,status:p.status||void 0,workflow:Ae[A]||null,can_pause:p.can_pause,...p.instructions_restart?{instructions_restart:p.instructions_restart}:{},can_resume:p.can_resume,started_at:p.started_at,last_event_at:p.last_event_at,last_activity:p.last_activity,legs:p.legs,runner:p.runner,model:p.model,effort:p.effort,speed:p.speed,resumed_from:p.resumed_from,continuation_mode:p.continuation_mode,usage:p.usage,failure:p.failure||null,hold:p.hold||null,wait:Le.wait||p.wait||null,retry:p.retry||null,...p.run_state==="retry_wait"&&v.hold&&v.hold.kind==="env"&&typeof v.hold.since=="number"?{hold_since:v.hold.since}:{},exec_chips:{orchestration:Wi(p),worker:Ny(Ye(Ie),C,p.runner||null)},discard:pr(T,A,{attempt_id:p.attempt_id,merged:p.failure?.confirmation==="merged"||Ye(at[A]).pr?.state==="MERGED"}),...re?{rollup:re}:{},...we?{conflict_resolution:!0}:{},...ge?{base_exception:ge}:{},...R?{landing:R}:{},badges:p.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:p.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:p.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:p.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:p.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:p.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:p.run_state==="failed"})}for(let[A,p]of Ud(ze)){if(E.some(S=>S.id===A))continue;let m=p.attempt;E.push({...Tt(A),lane:"running",kind:"session",...Bt(A),attempt_id:typeof m.attempt_id=="string"?m.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ae[A]||null,can_pause:!1,can_resume:!1,started_at:p.started_at,last_event_at:typeof m.last_event_at=="number"?m.last_event_at:null,last_activity:m.last_activity&&typeof m.last_activity=="object"?m.last_activity:null,legs:Array.isArray(m.legs)?m.legs:[],runner:typeof m.runner=="string"?m.runner:null,model:typeof m.model=="string"?m.model:null,effort:typeof m.effort=="string"?m.effort:null,speed:typeof m.speed=="string"?m.speed:null,resumed_from:null,continuation_mode:null,usage:m.usage&&typeof m.usage=="object"?m.usage:null,exec_chips:{orchestration:Wi(m),worker:null},discard:pr(T,A,{merge_queued:!0}),badges:[p.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let A of Array.isArray(v.session_active)?v.session_active:[]){let p=A&&A.bead_id;typeof p!="string"||$t.has(p)||($t.add(p),Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&ae.set(p,A.blocked_by.filter(m=>typeof m=="string"&&m.length>0)),typeof A.title=="string"&&A.title.length>0&&ue.set(p,A.title),E.push({...Tt(p),title:A.title||be[p]||p,lane:"running",kind:"session",status:"in_progress",started_at:uc(A.started_at)??uc(A.updated_at)??void 0,updated_at:uc(A.updated_at)??void 0,workflow:A.workflow||null,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(m=>typeof m=="string"&&m.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(A.session_refs)?A.session_refs:[],badges:[],alert:!1}))}for(let A of Array.isArray(v.pr_wait)?v.pr_wait:[]){let p=A&&A.bead_id;if(typeof p!="string"||$t.has(p))continue;$t.add(p);let m=Ye(at[p]),S=Ye(m.pr),C=m.gate?Ye(m.gate):null,re=qt.has(p),ge=Gt.get(p)?.continuation_action||null,we=!!ge&&ge.continuation===null,Ee=rt.active===p,w=A.external===!0,R=A.foreign===!0,Le=R&&typeof A.repo_slug=="string"?A.repo_slug:"",Be=R&&typeof A.pr_url=="string"?A.pr_url:"",ot=R&&typeof A.pr_number=="number"?A.pr_number:null,gt=Ke[p]||null,Rt=Ye(xe[p]),Dt=Co({bead_id:p,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:Rt.merge_progress||null,cleanup_failed:gt,repo_operations:yt}),ls=_a(Dt),$=!!C&&C.base_badge==="\uCDA9\uB3CC",b=!!gt&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!C&&C.tier==="merged",L=w&&!!gt&&!!C&&C.tier==="merged",de=!!C&&["closed_unmerged","review","undecidable"].includes(C.tier),ke=pr(T,p,{external:w,merge_active:Ee||Dt?.step==="merge",merge_queued:re,cleanup_active:ls,merged:!!gt||C?.tier==="merged"}),Ge=!!ke.operation,it=Ry(m.receipt_check);y.push({...Tt(p),lane:"pr_wait",...Bt(p),...it.length>0?{receipt_badge:{codes:it}}:{},workflow:Ae[p]||null,pr_number:ot??(typeof S.number=="number"?S.number:null),pr_url:Be||(typeof S.url=="string"?S.url:void 0),external:w,...Le?{foreign_repo:Le}:{},usage:lr(ze,p,oe),merge_step:Dt,badges:we?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Dt?[C?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[Jr(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Jr(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:C?.reason==="pr_repo_foreign"?["\uC678\uBD80 \uC800\uC7A5\uC18C PR"]:typeof C?.gate_badge=="string"&&C.gate_badge.length>0?[C.gate_badge]:[],alert:Dt?Dt.failed===!0:!!gt||de,reason:gt&&Dt?.active!==!0?fa(gt.step):"PR \uB300\uAE30",merge_action:C?.tier==="merged"&&!b&&!L?!1:!re||we,merge_enabled:!Ge&&(we||C?.enabled===!0||$||b||L),merge_label:we?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":L||b?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":$&&!b?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:we?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ge?ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:L?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":b?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":$?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":C?.enabled===!0?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${C?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:re&&!we,cancel_enabled:!Ee,continuation_mismatch:ge?.mismatch||null,discard:ke,discard_action:ke.action,discard_enabled:ke.enabled,discard_title:ke.title})}let bn=(A,p,m,S)=>{let C=A&&A.bead_id;if(typeof C!="string"||$t.has(C))return null;$t.add(C);let re=bt[C],ge=pr(T,C),we=ge.operation?ge:null,Ee={...Tt(C),lane:p,...typeof A.added_at=="number"?{added_at:A.added_at}:{},workflow:Ae[C]||null,draggable:!we,discard:we||void 0,reason:pf(et,C),seq:m+1,queue_position:m+1,queue_index:m,queue_length:S,badges:re?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!re,revise_action:!!re,revise_enabled:!!re&&!we,revise_title:re?re.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${re.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},w=An(C,null);return Object.hasOwn(w,"blocked_by")&&(Ee.blocked_by=w.blocked_by),Ee};for(let A=0;A<Xt.length;A++){let p=bn(Xt[A],"queue",A,Xt.length);if(!p)continue;te.push(p);let m=M.get(G);m?m.push(p):M.set(G,[p])}let _n=A=>{let p=y.find(re=>re.id===A&&re.root_dir===G);if(p)return{id:A,title:p.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let m=E.find(re=>re.id===A&&re.root_dir===G),S=m?m.run_state:hy(ze,A),C=S==="failed"||S==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":S==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:A,title:m?m.title:Tt(A).title,badge:C}},mn=[];for(let A=0;A<Math.max($e,Ve.length);A++){let p=`s${A+1}`,m=Ue.get(p),S=m&&Array.isArray(m.entries)?m.entries:[],C=Ye(N[p]),re=Array.isArray(C.occupied_by)?C.occupied_by.filter(w=>typeof w=="string"):[],ge=new Set(re),we=new Set(S.map(w=>w?.bead_id).filter(w=>typeof w=="string"&&ge.has(w)&&kf(et,w))),Ee=[];for(let w=0;w<S.length;w++){let R=S[w]&&S[w].bead_id;if(typeof R=="string"&&ge.has(R)&&!we.has(R)){$t.add(R);continue}let Le=bn(S[w],p,w,S.length);Le&&(typeof R=="string"&&we.has(R)&&(Le.badges=[_n(R).badge,...Le.badges||[]]),Ee.push(Le),te.push(Le))}Ee.length===0&&re.length===0&&($e<=1||A>=$e)||mn.push({id:p,index:A,items:Ee,raw_length:S.length,occupied_by:re,occupants:re.filter(w=>!we.has(w)).map(w=>_n(w)),corrections:Array.isArray(C.corrections)?C.corrections.length:0,cycle:C.cycle===!0,...Ee.length===0&&re.length===0?{empty:!0}:{}})}D.set(G,mn);let nt=Array.from({length:$e},(A,p)=>{let m=`s${p+1}`,S=Ue.get(m),C=S&&Array.isArray(S.entries)?S.entries:[],re=Ye(N[m]);return{id:m,index:C.length,length:C.length,occupied_by:Array.isArray(re.occupied_by)?re.occupied_by.filter(ge=>typeof ge=="string"):[]}});for(let A of Array.isArray(v.runnable)?v.runnable:[]){let p=A&&A.bead_id;if(typeof p!="string"||$t.has(p))continue;$t.add(p);let m=A.workflow&&typeof A.workflow=="object"?A.workflow:null,S=m&&typeof m.route=="string"&&m.route||(typeof A.route=="string"?A.route:null),C=Cy(Ye(Ie),A.exec_pins,S),re=ho(A.rec,A.exec_pins);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&ae.set(p,A.blocked_by.filter(Dt=>typeof Dt=="string"&&Dt.length>0)),typeof A.title=="string"&&A.title.length>0&&ue.set(p,A.title),Array.isArray(A.scope)&&U.set(p,A.scope.filter(Dt=>typeof Dt=="string"&&Dt.length>0));let ge=Object.hasOwn(A,"eligible"),Ee=!ge&&Object.hasOwn(A,"route")&&Object.hasOwn(A,"spec_state")&&Object.hasOwn(A,"has_description")&&Object.hasOwn(A,"awaiting_user")&&Object.hasOwn(A,"worker_ineligible")?Yl({route:typeof A.route=="string"?A.route:"",spec:A.spec_state,has_description:A.has_description===!0,awaiting_user:A.awaiting_user===!0,worker_ineligible:A.worker_ineligible===!0},null):null,w=ge?A.eligible!==!1:Ee?Ee.placeable:!0,R=Ee?Ee.worker_ineligible:A.worker_ineligible===!0,Le=w&&!R,Be=Ee?{route_ok:Ee.route_ok,awaiting_user:Ee.awaiting_user,missing_description:Ee.missing_description,placement_spec:Ee.spec}:Object.hasOwn(A,"route_ok")?{route_ok:A.route_ok===!0,awaiting_user:A.awaiting_user===!0,missing_description:A.missing_description===!0,placement_spec:A.placement_spec}:null,ot=[];!ge&&Ee&&!Ee.placeable&&ot.push(Vr(Ee)),typeof A.reason=="string"&&A.reason.length>0&&ot.push(A.reason);let gt=pf(et,p);gt&&ot.push(gt);let Rt=Oy(p,A.release_info,f)?.map(Dt=>({...Dt,...cc({id:p,root_dir:G},Dt.id)}));g.push({...Tt(p),title:A.title||be[p]||p,lane:"runnable",draggable:!ge&&Le,queue_placeable:Le,...Be||{},...R?{worker_ineligible:!0}:{},...A.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof A.session_preferred_reason=="string"?A.session_preferred_reason:""}:{},...A.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Rt?{dependency_chips:{released:Rt}}:{},...A.dependents_info&&typeof A.dependents_info=="object"?{dependents_info:A.dependents_info}:{},reason:ot.join(" \xB7 "),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",published:A.published===!0,workflow:m||(S?{route:S,chips:{route:S}}:null),...C?{exec_chips:C}:{},...re?{rec:re}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(Dt=>typeof Dt=="string"&&Dt.length>0)}:{},place_index:Xt.length,place_lanes:nt})}for(let A of tt){let p=A&&A.bead_id;if(typeof p!="string"||$t.has(p)||($t.add(p),i!==void 0&&typeof A.added_at=="number"&&A.added_at<i))continue;let m=by(ze,p),S=m&&typeof m.done_kind=="string"?m.done_kind:null,C=Dy(m);J.push({...Tt(p),lane:"done",done:!0,workflow:Ae[p]||null,...C?{exec_chips:C}:{},done_layout:"three_line",usage:lr(ze,p,oe),work_ms:Ip(ze,p),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:S,...lt(p),badges:[...S&&lf[S]?[lf[S]]:[],...Cp(ze,p)]})}for(let A of Array.isArray(v.session_done)?v.session_done:[]){let p=A&&(A.id||A.bead_id);typeof p!="string"||$t.has(p)||($t.add(p),J.push({...Tt(p),...A,id:p,root_dir:G,workspace_name:De,expected_revision:Fe,lane:"done",done:!0}))}}if(O.size>0)for(let v of[...g,...te,...E,...y,...J]){let G=O.get(`${v.root_dir}\0${v.id}`);if(!G)continue;typeof G.priority=="number"&&(v.priority=G.priority),typeof G.from_id=="string"&&G.from_id.length>0&&(v.from_id=G.from_id),v.lane==="done"&&Array.isArray(G.carried_to)&&G.carried_to.length>0&&(v.carried_to=G.carried_to);let De=Ye(v.workflow),Ie=Ye(De.chips);if(!Ie.route&&!De.route&&typeof G.route=="string"&&G.route.length>0&&(v.workflow={...De,route:G.route,chips:{...Ie,route:G.route}}),!Object.hasOwn(G,"metadata"))continue;let Fe=Ye(G.metadata);if(v.rec=ho(Fe),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let ze=mf(Ye(_.get(v.root_dir)),Fe,typeof G.route=="string"&&G.route.length>0?G.route:Ye(v.workflow).route);ze&&(v.exec_chips=ze)}}let _e=new Set;for(let v of te){let G=Ne.get(v.root_dir);if(!G)continue;if(v.lane!=="queue"){let ht=`${v.root_dir}\0${v.lane}`;if(_e.has(ht))continue;_e.add(ht)}let Ie=pe.has(v.id)?null:xy(G.hold,G.lineages),Fe=Ye(_.get(v.root_dir)),ze=O.get(`${v.root_dir}\0${v.id}`),oe=Ye(ze&&ze.metadata),be=ba(Fe,oe,ze&&typeof ze.route=="string"&&ze.route.length>0?ze.route:Ye(v.workflow).route,null),Qe=be?zl(be,Fe.runner_catalog??null):null,at=Qe===null?null:Ay(Qe,Sy(oe,Qe,G.account_catalog),G.provider_hold,G.account_catalog),et=Ie?at?{...Ie,lines:[...Ie.lines,`\uACF5\uAE09\uC790: ${at.label}`]}:Ie:at;et&&(v.gate=et)}let B=new Map;s.forEach((v,G)=>{v&&typeof v.root_dir=="string"&&B.set(v.root_dir,G)});let W=n&&n.running_sort==="repo"?"repo":"started";E.sort((v,G)=>{let De=v.kind==="session",Ie=G.kind==="session";if(De!==Ie)return De?1:-1;if(De&&Ie){let oe=ma(G.updated_at)-ma(v.updated_at);return oe!==0?oe:v.id.localeCompare(G.id)}if(W==="repo"){let oe=B.get(v.root_dir)??Number.MAX_SAFE_INTEGER,be=B.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(oe!==be)return oe-be}let Fe=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,ze=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return Fe!==null&&ze!==null&&Fe!==ze?Fe-ze:Fe===null&&ze!==null?1:Fe!==null&&ze===null?-1:v.id.localeCompare(G.id)}),J.sort((v,G)=>(G.done_at??0)-(v.done_at??0));let Ce=s.length>0?s:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),K=new Set(g.map(v=>v.root_dir)),ne=new Map;for(let v of E)v.kind==="session"||v.run_state!=="running"||ne.set(v.root_dir,(ne.get(v.root_dir)||0)+1);let se=new Map;for(let v of J){let G=se.get(v.root_dir);G?G.push(v):se.set(v.root_dir,[v])}let ce={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Re=[];for(let v of Ce){if(!v||typeof v.root_dir!="string")continue;let G=M.get(v.root_dir)||[],De=D.get(v.root_dir)||[],Ie=G.length>0||De.some(oe=>oe.items.length>0||oe.occupied_by.length>0);if(u!=="all"&&!Ie&&!K.has(v.root_dir))continue;let Fe=typeof v.slots=="number"&&v.slots>=ha?v.slots:ha,ze=ne.get(v.root_dir)||0;Re.push({live_count:ze,over_cap:ze>Fe,merge:X.get(v.root_dir)||ce,token_total:My(se.get(v.root_dir)||[]),cleanup_failures:P.get(v.root_dir)||[],declared_base:x.get(v.root_dir)??null,repo_operations:I.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:Fe,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:Ye(v.runner_catalog),items:G,sublanes:{parallel:G,serial:De},serial_lane_count:q.get(v.root_dir)||0,raw_queue_length:j.get(v.root_dir)||0})}let Z={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:te,queue_groups:Re,running:E,pr_wait:y,done:J,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Oe=hp(Z);for(let v of z)Oe.has(v.id)||Oe.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let G=Oe.get(v.id),De=ye.get(v.root_dir)||{};v.blockers=(v.blocked_by||[]).map(Ie=>{let Fe=Oe.get(Ie)?.workspace_name||dc(De[Ie]);return{...bp(Ie,G,Oe,s),...Fe?{workspace_name:Fe}:{}}})}for(let v of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let G=ye.get(v.root_dir)||{},De=(v.blockers||[]).map(oe=>({...lc(v.id,oe),...cc(v,oe.id,Oe,G)})),Ie=(Q.get(`${v.root_dir}\0${v.id}`)||[]).map(oe=>{let be=Oe.get(oe),Qe=be?.root_dir||G[oe];return{...sf(v.id,oe,be?.workspace_name||dc(Qe),Qe),...cc(v,oe,Oe,G)}}),Fe=of(v.id,zy(le.get(v.id),v.dependents_info,v,Oe));if(De.length===0&&Ie.length===0&&Fe.length===0)continue;let ze={...v.dependency_chips||{},...De.length>0?{predecessors:De}:{},...Ie.length>0?{released:Ie}:{},...Fe.length>0?{dependents:Fe}:{}};v.dependency_chips=ze}Hy(Z,he,U,Oe,s);let Me=yp(Z.queue_groups);for(let v of Z.queue_groups)for(let G of v.sublanes.serial){let De=Me.get(vp(v.root_dir,G.id));De&&(G.cross_wait_peers=De)}let Je=new Map;for(let v of[...Z.queue,...Z.running,...Z.pr_wait,...Z.done,...Z.runnable]){let G=ga(v.root_dir,v.id);if(Je.has(G))continue;let De=Ye(v.workflow),Ie=Ye(De.chips),Fe=O.get(`${v.root_dir}\0${v.id}`),ze=(typeof Ie.route=="string"&&Ie.route.length>0?Ie.route:typeof De.route=="string"&&De.route.length>0?De.route:Fe&&typeof Fe.route=="string"&&Fe.route.length>0?Fe.route:null)||null,oe=typeof Ie.route_source=="string"?Ie.route_source:typeof De.route_source=="string"?De.route_source:null;Je.set(G,{route:ze,route_source:oe,exec_chips:v.exec_chips||null,added_at:typeof v.added_at=="number"?v.added_at:null})}for(let v of l&&Array.isArray(l.lanes)?l.lanes:[])for(let G of Array.isArray(v?.entries)?v.entries:[]){let De=G&&typeof G.bead_id=="string"?G.bead_id:"",Ie=G&&typeof G.root_dir=="string"?G.root_dir:"";if(De.length===0||Je.has(ga(Ie,De)))continue;let Fe=O.get(`${Ie}\0${De}`);if(!Fe)continue;let ze=typeof Fe.route=="string"&&Fe.route.length>0?Fe.route:null,oe=Object.hasOwn(Fe,"metadata")?mf(Ye(_.get(Ie)),Ye(Fe.metadata),ze):null;ze===null&&oe===null||Je.set(ga(Ie,De),{route:ze,route_source:null,exec_chips:oe,added_at:null})}Z.chain_lanes=Uy(l&&Array.isArray(l.lanes)?l.lanes:[],ae,Oe,s,ue,h,{armed_by_bead:pe,failed_by_bead:qe,disarmed_lanes:Pe},fe,Je);let je=new Map;for(let v of[...Z.queue,...Z.runnable])je.has(v.id)||je.set(v.id,v);let ie=new Set;for(let v of Z.chain_lanes)for(let G of v.rows){if(v.status==="confirmed"&&!G.unplaced&&!G.fixed&&ie.add(G.id),!v.draft&&!G.unplaced)continue;let De=je.get(G.id);De&&(De.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let ee=new Map(Z.chain_lanes.map(v=>[v.lane_id,v]));for(let v of[...Z.queue,...Z.running]){let G=pe.get(v.id);if(typeof G!="string"||G.length===0)continue;let De=ee.get(G);v.armed_lane_chip=De===void 0||De.status==="draft"?{lane_id:G,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:G,label:`\u25B6 \uC5F0\uACB0 ${De.number}`,orphan:!1}}let Te=[];for(let v of M.values())for(let G of v)ie.has(G.id)||Te.push(G);Te.sort((v,G)=>{let De=v.workspace_name.localeCompare(G.workspace_name);return De!==0?De:(v.queue_index??0)-(G.queue_index??0)}),Z.parallel_rows=Te;let ft={};for(let[v,G]of Oe)typeof G.root_dir=="string"&&G.root_dir.length>0&&(ft[v]=G.root_dir);for(let v of Z.chain_lanes)for(let G of v.rows)!Object.hasOwn(ft,G.id)&&G.root_dir.length>0&&h.has(G.root_dir)&&(ft[G.id]=G.root_dir);Z.owner_of=ft;let _t=Z.runnable.length;Z.runnable_all=Z.runnable.slice();let He=Z.runnable,mt=v=>o.show_blocked||v.blocked!==!0,It=v=>o.readiness==="all"||(o.readiness==="ready"?v.queue_placeable===!0:v.queue_placeable!==!0),St=es(o.routes),st=v=>St.length===0||St.includes(Py(v));if(d==="per_control"){let v=[],G=0,De=0,Ie=0;for(let Fe of He){let ze=mt(Fe),oe=It(Fe),be=st(Fe);if(ze&&oe&&be){v.push(Fe);continue}(ze?0:1)+(oe?0:1)+(be?0:1)>1||(ze?oe?Ie+=1:De+=1:G+=1)}He=v,Z.runnable_hidden={blocked:G,readiness:De,route:Ie}}else{He=He.filter(mt);let v=He.length;He=He.filter(It);let G=He.length;He=He.filter(st),Z.runnable_hidden={blocked:_t-v,readiness:v-G,route:G-He.length}}let pt=(v,G)=>{let De=ma(G.updated_at)-ma(v.updated_at);return De!==0?De:v.id.localeCompare(G.id)},Mt=a==="repo_spec"?(v,G)=>{let De=v.queue_placeable===!0?0:1,Ie=G.queue_placeable===!0?0:1;if(De!==Ie)return De-Ie;let Fe=v.published===!0?0:1,ze=G.published===!0?0:1;return Fe!==ze?Fe-ze:pt(v,G)}:pt;if(a==="as_given")Z.runnable=He,Z.runnable_sections=[];else if(a==="updated_flat")Z.runnable=He.slice().sort(pt),Z.runnable_sections=[];else{let v=new Map;for(let Ie of He){let Fe=v.get(Ie.root_dir);Fe?Fe.push(Ie):v.set(Ie.root_dir,[Ie])}let G=[],De=[];for(let Ie of Ce){if(!Ie||typeof Ie.root_dir!="string")continue;let Fe=(v.get(Ie.root_dir)||[]).slice().sort(Mt);v.delete(Ie.root_dir),Fe.length!==0&&(G.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Fe.map(ze=>({...ze,workspace_name:""}))}),De.push(...Fe))}for(let[Ie,Fe]of v){let ze=Fe.slice().sort(Mt);G.push({root_dir:Ie,name:ze[0]?.workspace_name||Ie,items:ze.map(oe=>({...oe,workspace_name:""}))}),De.push(...ze)}Z.runnable=De,Z.runnable_sections=G}let Zt=Ky(n?n.search:void 0);return Zt&&Gy(Z,Zt),Z}var va=["impl_review_model","impl_review_effort","impl_review_speed"],Vy=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function ns(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fr(e){return typeof e=="string"&&e.length>0?e:null}function mc(e){let t=ns(e)&&ns(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:fr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function $f(e,t,n=20){let r=String(t||"").trim().toLowerCase(),s=[],i=new Set;for(let o of Array.isArray(e)?e:[]){let l=fr(ns(o)?o.id:null);if(l===null||i.has(l))continue;let a=fr(o.title)??"";if(r.length>0&&!l.toLowerCase().includes(r)&&!a.toLowerCase().includes(r))continue;i.add(l);let u=mc(o);if(s.push({id:l,title:a,eligible:u.eligible,reason:u.reason}),s.length>=n)break}return s.sort((o,l)=>o.eligible===l.eligible?0:o.eligible?-1:1)}function gc(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function ka(e){for(let t of Array.isArray(e)?e:[]){let n=ns(t)&&ns(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},s=!0;for(let i of va){let o=fr(n[i]);if(o===null){s=!1;break}r[i]=o}if(s)return r}return{...Vy}}function xf(e){return fr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||gc(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?va.every(t=>fr(e.reviewer?.[t])!==null):!0}var _c=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function Af(e){if(typeof e=="string")return _c[e]??e;if(!ns(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=fr(e.code)??fr(e.error)??"",n=fr(e.message)??"",r=_c[t]??(n.length>0?n:t),s=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&_c[t]&&s.push(`(${n})`);let i=ns(e.details)?e.details:{},o=Array.isArray(i.aborted)?i.aborted.filter(l=>typeof l=="string"&&l.length>0):[];return o.length>0&&s.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${o.join(", ")}`),s.join(" ")}function hc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Rr(e){return typeof e=="string"&&e.length>0?e:null}var Yy=new Set(["failed","orphaned"]);function Sf(e){if(!hc(e))return null;let t=Mn(e.cell_count),n=Mn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function qs(e){let t=e.map(i=>Mn(i)).filter(i=>i!==null).sort((i,o)=>i-o),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function Xy(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function Qy(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=hc(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function Ef(e,t){if(!hc(e))return[];let n=new Map;for(let o of Array.isArray(t)?t:[]){let l=Rr(o?.attempt_id);l!==null&&n.set(l,o)}let r=Array.isArray(e.cells)?e.cells:[],s=Array.isArray(e.presets)?e.presets:[],i=[];for(let o of s){let l=Rr(o?.id);if(l===null)continue;let u=r.filter(_=>_?.preset_id===l).sort((_,h)=>(Mn(_?.k)??0)-(Mn(h?.k)??0)).map(_=>{let h=Rr(_.attempt_id),g=h===null?null:n.get(h)??null,E=Qy(_,g);return{...g??{},bead_id:Rr(_.bead_id)??"",attempt_id:h,cell_k:Mn(_.k),status:Rr(g?.status)??Rr(_.status),failed:g?.failed===!0||Yy.has(String(_.status??"")),verify:E,workspace_name:_.k===null?"":`#${_.k}`}}),d=u.filter(_=>_.verify==="pass"||_.verify==="fail"),f=d.filter(_=>_.verify==="pass"&&_.status==="done");i.push({key:`${Rr(e.run_id)??""}:${l}`,name:Rr(o?.name)??l,n:u.length,success_rate:d.length===0?null:f.length/d.length,success_sample:d.length,unknown_count:u.length-d.length,pass_caret:Xy(u.map(_=>_.verify)),failed_count:u.filter(_=>_.failed===!0).length,retry_count:u.filter(_=>_.is_retry===!0).length,duration_ms:qs(u.map(_=>Mn(_.duration_ms))),tokens:qs(u.map(_=>Mn(_.usage?.tokens))),cost_usd:qs(u.map(_=>Mn(_.usage?.total_cost_usd))),blocking:qs(u.map(_=>Mn(_.review?.blocking))),minor:qs(u.map(_=>Mn(_.review?.minor))),round:qs(u.map(_=>Mn(_.review?.round))),rows:u})}return i}var ln="\u2014";function rr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function wa(e){let t=rr(e);if(t===null||t<0)return ln;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function $a(e){let t=rr(e);return t===null||t<=0?ln:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function Tf(e){return!e||rr(e.total_cost_usd)===null?ln:Ri({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??ln}function bc(e){let t=rr(e);return t===null?ln:`$${t.toFixed(2)}`}function Rf(e){let t=rr(e?.sample)??0,n=rr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function yc(e){let t=rr(e);return t===null?ln:`${Math.round(t*100)}%`}function Cf(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function Of(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?ln:t.join(" \xB7 ")}function If(e){if(!e)return ln;let t=rr(e.blocking),n=rr(e.minor),r=rr(e.round);if(t===null&&n===null&&r===null)return ln;let s=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[s,i].filter(o=>o!==null).join(" \xB7 ")}var Zy="30d";function Lf(e,t={}){let n=jt("views:compare"),r=t.transport,s=t.gotoIssue,i=t.execPresetStore,o=t.sourceCandidates,l={range:Zy,root_dir:"",issue_type:"",route:"",include_bench:!1},a={rows:[],groups:[],workspaces:[]},u=new Set,d=!1,f=null,_=!1,h=0,g={runs:[],selected:null,rows:[]},E=new Set,y={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:ka([]),error:null,submitting:!1};async function te(){if(!r)return;let U=h+=1;d=!0,f=null,Pe();try{let ue=await r("get-compare",{range:l.range,root_dirs:l.root_dir?[l.root_dir]:[],issue_types:l.issue_type?[l.issue_type]:[],routes:l.route?[l.route]:[],include_bench:l.include_bench});if(U!==h)return;let _e=ue&&ue.payload?ue.payload:ue;a={rows:Array.isArray(_e?.rows)?_e.rows:[],groups:Array.isArray(_e?.groups)?_e.groups:[],workspaces:Array.isArray(_e?.workspaces)?_e.workspaces:a.workspaces},g.runs=Array.isArray(_e?.runs)?_e.runs:[],g.rows=Array.isArray(_e?.bench_rows)?_e.bench_rows:[],g.selected!==null&&!g.runs.some(B=>B.run_id===g.selected)&&(g.selected=null),y.open||(y.reviewer=ka(g.runs)),_=!0}catch(ue){if(U!==h)return;n("get-compare failed: %o",ue),f=ue instanceof Error?ue.message:String(ue)}finally{U===h&&(d=!1,Pe())}}function J(U){g.selected=g.selected===U?null:U,Pe()}function z(){let U=D(y.source_id);return xf({source_id:y.source_id,source_eligible:U===null?!1:mc(U).eligible,preset_ids:y.preset_ids,repeats:y.repeats,reviewer_mode:y.reviewer_mode,reviewer:y.reviewer})}async function M(){if(!(!r||y.submitting||!z())){y.submitting=!0,y.error=null,Pe();try{let U=await r("bench-run-create",{source_id:y.source_id,preset_ids:[...y.preset_ids],repeats:y.repeats,reviewer_mode:y.reviewer_mode,...y.reviewer_mode==="fixed"?{reviewer:y.reviewer}:{}}),ue=U&&U.payload?U.payload:U,_e=ue&&ue.run&&typeof ue.run.run_id=="string"?ue.run.run_id:null;y.open=!1,y.error=null,await te(),_e!==null&&g.selected!==_e&&J(_e)}catch(U){n("bench-run-create failed: %o",U),y.error=Af(U)}finally{y.submitting=!1,Pe()}}}function D(U){if(!o||U.length===0)return null;for(let ue of o())if(ue&&ue.id===U)return ue;return null}function q(U,ue){l[U]=ue,te()}function j(U){u.has(U)?u.delete(U):u.add(U),Pe()}function X(U,ue,_e,B){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${U}</span>
        <select
          class="cmp-filter__select"
          .value=${ue}
          @change=${W=>B(W.target.value)}
        >
          ${_e.map(W=>c`<option
                value=${W.value}
                ?selected=${W.value===ue}
              >
                ${W.label}
              </option>`)}
        </select>
      </label>
    `}function P(){let U=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...a.workspaces.map(ue=>({value:ue.root_dir,label:ue.name}))];return c`
      <div class="cmp-filters">
        ${X("\uAE30\uAC04",l.range,pi.map(ue=>({value:ue.value,label:ue.label})),ue=>q("range",ue))}
        ${X("\uC800\uC7A5\uC18C",l.root_dir,U,ue=>q("root_dir",ue))}
        ${X("\uC720\uD615",l.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...Ei.map(ue=>({value:ue,label:ue}))],ue=>q("issue_type",ue))}
        ${X("route",l.route,[{value:"",label:"\uC804\uCCB4 route"},...ts.filter(ue=>ue.value!=="unset").map(ue=>({value:ue.value,label:ue.label}))],ue=>q("route",ue))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${l.include_bench}
            @change=${ue=>{l.include_bench=ue.target.checked,te()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${d}
          @click=${()=>{te()}}
        >
          새로고침
        </button>
      </div>
    `}function x(U){let ue=yc(U.success_rate),_e=typeof U.unknown_count=="number"&&U.unknown_count>0?c`<span class="cmp-note">미상 ${U.unknown_count}</span>`:null,B=U.pass_caret?c`<span class="cmp-note"
          >pass^${U.pass_caret.k}
          ${yc(U.pass_caret.value)}</span
        >`:null,W=typeof U.success_sample=="number"&&U.success_sample!==U.n?c`<span class="cmp-note"
            >n=${U.success_sample}/${U.n}</span
          >`:null;return c`${ue} ${W} ${B} ${_e}`}function I(U,ue){let _e=Rf(U);return c`${ue(U?.median)}
    ${_e?c`<span class="cmp-note">${_e}</span>`:null}`}function O(U){let ue=ws(U.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>s&&s(U.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${U.bead_id}</span>
          <span class="cmp-issue-title">${U.title||""}</span>
          <span class="cmp-note">${U.workspace_name}</span>
        </td>
        <td class="cmp-cell">${wa(U.duration_ms)}</td>
        <td class="cmp-cell">${Of(U)}</td>
        <td class="cmp-cell">${Cf(U.verify)}</td>
        <td class="cmp-cell">${If(U.review)}</td>
        <td class="cmp-cell">${$a(U.usage?.tokens)}</td>
        <td class="cmp-cell" title=${ue}>${Tf(U.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${U.finished_at?nn(U.finished_at):ln}
        </td>
      </tr>
    `}function ae(U){let ue=u.has(U.key),_e=new Set(U.attempt_ids||[]),B=ue?a.rows.filter(W=>_e.has(W.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${ue?"is-open":""}"
        @click=${()=>j(U.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ue?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${U.name}</span>
          <span class="cmp-note">${U.n}건</span>
        </td>
        <td class="cmp-cell">
          ${I(U.duration_ms,wa)}
        </td>
        <td class="cmp-cell">
          실패 ${U.failed_count} · 재시도 ${U.retry_count}
        </td>
        <td class="cmp-cell">${x(U)}</td>
        <td class="cmp-cell">
          ${I(U.blocking,W=>typeof W=="number"?`b${W}`:ln)}
          ${I(U.minor,W=>typeof W=="number"?`m${W}`:ln)}
          ${I(U.round,W=>typeof W=="number"?`r${W}`:ln)}
        </td>
        <td class="cmp-cell">${I(U.tokens,$a)}</td>
        <td class="cmp-cell">
          ${I(U.cost_usd,bc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${B.map(W=>O(W))}
    `}function fe(U){let ue=g.selected===U.run_id,_e=D(String(U.source_bead_id||"")),B=_e&&typeof _e.title=="string"&&_e.title.length>0?_e.title:String(U.source_bead_id||""),W=Sf(U),Ce=Array.isArray(U.presets)?U.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${ue?"is-selected":""}"
        data-run-id=${U.run_id}
        @click=${()=>J(String(U.run_id))}
      >
        <span class="cmp-run__title">${B}</span>
        <span class="cmp-note">프리셋 ${Ce}</span>
        <span class="cmp-note">반복 ${U.repeats??ln}</span>
        <span class="cmp-note"
          >${typeof U.created_at=="number"?nn(U.created_at):ln}</span
        >
        <span class="cmp-run__progress"
          >${W===null?ln:W.text}</span
        >
      </button>
    `}function ye(U){let ue=E.has(U.key);return c`
      <tr
        class="cmp-row cmp-row--group ${ue?"is-open":""}"
        @click=${()=>{E.has(U.key)?E.delete(U.key):E.add(U.key),Pe()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ue?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${U.name}</span>
          <span class="cmp-note">${U.n}건</span>
        </td>
        <td class="cmp-cell">
          ${I(U.duration_ms,wa)}
        </td>
        <td class="cmp-cell">
          실패 ${U.failed_count} · 재시도 ${U.retry_count}
        </td>
        <td class="cmp-cell">${x(U)}</td>
        <td class="cmp-cell">
          ${I(U.blocking,_e=>typeof _e=="number"?`b${_e}`:ln)}
          ${I(U.minor,_e=>typeof _e=="number"?`m${_e}`:ln)}
          ${I(U.round,_e=>typeof _e=="number"?`r${_e}`:ln)}
        </td>
        <td class="cmp-cell">${I(U.tokens,$a)}</td>
        <td class="cmp-cell">
          ${I(U.cost_usd,bc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${ue?(U.rows||[]).map(_e=>O(_e)):null}
    `}function Q(U){let ue=Ef(U,g.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${U.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(U.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${ue.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
              <thead>
                <tr>
                  <th scope="col">프리셋</th>
                  <th scope="col">시간</th>
                  <th scope="col">실패 · 재시도</th>
                  <th scope="col">검증</th>
                  <th scope="col">리뷰 지적 · 라운드</th>
                  <th scope="col">토큰</th>
                  <th scope="col">가격</th>
                  <th scope="col">종료</th>
                </tr>
              </thead>
              <tbody>
                ${ue.map(_e=>ye(_e))}
              </tbody>
            </table>`}
      </div>
    `}function le(){let U=i?i.get():null,ue=Array.isArray(U?.presets)?U.presets:[],_e=$f(o?o():[],y.query);return c`
      <form
        class="cmp-form"
        @submit=${B=>{B.preventDefault(),M()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${y.query}
            @input=${B=>{y.query=String(B.target.value||""),Pe()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${_e.length===0?c`<div class="cmp-empty">후보 없음</div>`:_e.map(B=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${y.source_id===B.id?"is-selected":""}"
                    data-source-id=${B.id}
                    ?disabled=${!B.eligible}
                    title=${B.reason}
                    @click=${()=>{y.source_id=B.id,Pe()}}
                  >
                    <span class="cmp-candidate__id">${B.id}</span>
                    <span class="cmp-candidate__title">${B.title}</span>
                    ${B.eligible?null:c`<span class="cmp-candidate__reason"
                          >${B.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${ue.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:ue.map(B=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${B.id}
                        .checked=${y.preset_ids.includes(B.id)}
                        @change=${W=>{let Ce=W.target.checked;y.preset_ids=Ce?[...y.preset_ids,B.id]:y.preset_ids.filter(K=>K!==B.id),Pe()}}
                      />
                      <span>${B.name}</span>
                    </label>
                  `)}
          </div>
        </div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">반복</span>
          <input
            type="number"
            class="cmp-form__input cmp-form__input--repeats"
            min="1"
            max="5"
            .value=${String(y.repeats)}
            @change=${B=>{let W=B.target;y.repeats=gc(W.value),W.value=String(y.repeats),Pe()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(B=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${B.value}
                    .checked=${y.reviewer_mode===B.value}
                    @change=${()=>{y.reviewer_mode=B.value,Pe()}}
                  />
                  <span>${B.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${y.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${va.map(B=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${B}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${B}
                      .value=${y.reviewer[B]||""}
                      @input=${W=>{y.reviewer={...y.reviewer,[B]:String(W.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${y.error!==null?c`<div class="cmp-error" role="alert">${y.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${y.submitting||!z()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{y.open=!1,y.error=null,Pe()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function pe(){let U=g.selected===null?null:g.runs.find(ue=>ue.run_id===g.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{y.open=!y.open,y.open&&(y.error=null,y.reviewer=ka(g.runs)),Pe()}}
          >
            새 실험
          </button>
        </div>
        ${y.open?le():null}
        ${g.runs.length===0?c`<div class="cmp-empty">
              ${d?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${g.runs.map(ue=>fe(ue))}
            </div>`}
        ${U===null?null:Q(U)}
      </section>
    `}function Ne(){return f!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${f}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{te()}}
          >
            새로고침
          </button>
        </div>
      `:_?a.groups.length===0?c`<div class="cmp-empty">
        해당 조건의 실행 기록이 없습니다
      </div>`:c`
      <table class="cmp-table">
        <thead>
          <tr>
            <th scope="col">프리셋 · 서명</th>
            <th scope="col">시간</th>
            <th scope="col">실패 · 재시도</th>
            <th scope="col">검증</th>
            <th scope="col">리뷰 지적 · 라운드</th>
            <th scope="col">토큰</th>
            <th scope="col">가격</th>
            <th scope="col">종료</th>
          </tr>
        </thead>
        <tbody>
          ${a.groups.map(U=>ae(U))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${d?"\uC77D\uB294 \uC911\u2026":""}</div>`}function qe(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${P()}
        </header>
        ${pe()} ${Ne()}
      </div>
    `}function Pe(){ut(qe(),e)}let he=null;return i&&i.subscribe&&(he=i.subscribe(()=>{y.open&&Pe()})),Pe(),{load(){d||te()},pause(){h+=1,d=!1},refresh(){return te()},destroy(){he&&(he(),he=null),ut(c``,e)}}}function Jy(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),i=t.createElement("button"),o=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",o.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${On(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${On(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.className="op-btn",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,s,i),n.append(o,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Cr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,i=await Jy(s);if(i===null)return r;r=await t(i,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function vc(e,t=document,n={}){let r=e?.kind,s=r==="settlement",i=r==="restart",o=r==="resume_recorded",l=i||o,a=n?.onSubmit,u=t.createElement("dialog");u.className="op-dialog resume-instructions-dialog";let d=t.createElement("h2"),f=t.createElement("textarea"),_=t.createElement("div"),h=t.createElement("button"),g=t.createElement("button"),E=t.createElement("p"),y=[e?.bead_id,e?.tuple].filter(J=>typeof J=="string"&&J!=="").join(" \xB7 ");if(d.textContent=i?"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC7AC\uC2DC\uC791":o?"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30":s?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",f.placeholder=l?"\uC774\uBC88 \uC7AC\uAC1C\uC5D0 \uC804\uB2EC\uD560 \uC9C0\uCE68 (\uD544\uC218)":"\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",f.maxLength=4e3,l&&(f.required=!0),_.className="op-dialog__actions resume-instructions-dialog__actions",h.type="button",h.className="op-btn op-btn--primary",h.textContent=i?"\uC911\uB2E8 \uD6C4 \uC7AC\uC2DC\uC791":o?"\uC774\uC5B4\uD558\uAE30":s?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30",g.type="button",g.className="op-btn",g.textContent="\uCDE8\uC18C",E.className="resume-instructions-dialog__error",E.hidden=!0,_.append(h,g),u.append(d),l){let J=t.createElement("p");J.className="resume-instructions-dialog__desc",J.textContent=i?"\uC2E4\uD589\uC744 \uC911\uB2E8\uD55C \uB4A4 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uAC11\uB2C8\uB2E4. \uC2E4\uD589 \uC911\uC778 \uB3C4\uAD6C\uB294 \uC911\uB2E8\uB420 \uC218 \uC788\uC73C\uBA70 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB294 \uBCF4\uC874\uB429\uB2C8\uB2E4.":"\uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uAC11\uB2C8\uB2E4. \uC2E4\uD589 \uC911\uC778 \uB3C4\uAD6C\uB294 \uC911\uB2E8\uB420 \uC218 \uC788\uC73C\uBA70 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB294 \uBCF4\uC874\uB429\uB2C8\uB2E4.",u.append(J)}if(y!==""){let J=t.createElement("p");J.className="resume-instructions-dialog__target",J.textContent=y,u.append(J)}u.append(f,E,_),t.body.append(u);let te=()=>{l&&(h.disabled=f.value.trim().length===0)};return te(),new Promise(J=>{let z=!1,M=!1,D=j=>{z||(z=!0,typeof u.close=="function"&&u.close(),u.remove(),J(j))},q=async()=>{if(z||M)return;let j=f.value.trim();if(l&&j.length===0)return;if(!a){D(j);return}M=!0,h.disabled=!0,g.disabled=!0,E.hidden=!0;let X;try{X=await a(j)}catch{X={ok:!1,message:"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}}if(M=!1,X?.ok){D(j);return}E.textContent=X?.message||"\uC694\uCCAD\uC774 \uAC70\uBD80\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",E.hidden=!1,g.disabled=!1,h.disabled=!1,te(),f.focus()};h.addEventListener("click",()=>{q()}),g.addEventListener("click",()=>{M||D(null)}),f.addEventListener("input",te),f.addEventListener("keydown",j=>{j.key==="Enter"&&(j.ctrlKey||j.metaKey)&&(j.preventDefault(),q())}),u.addEventListener("cancel",j=>{j.preventDefault(),M||D(null)}),typeof u.showModal=="function"?u.showModal():u.setAttribute("open",""),f.focus()})}async function js(e){let{context:t,transport:n,adopt:r}=e,s=await vc(t);if(s===null)return null;let i=s===""?{}:{instructions:s},o=await n({...i});if(r?.(o),o&&o.conflict&&(o=await n({...i}),r?.(o)),o=await Cr(o,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),o&&o.resumed===!1&&!o.conflict&&o.reason){let l=t?.kind==="settlement"?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30";ve(`${l} \uAC70\uBD80: ${o.reason}`,"error",2400)}return o}async function xa(e){let{context:t,pause:n,resume:r,snapshot:s}=e,i=t?.attempt_id||"",o=u=>u&&u.attempts&&u.attempts[i]||null,l=u=>Object.values(u?.attempts||{}).some(d=>d&&d.resumed_from===i),a=!1;return vc(t,document,{onSubmit:async u=>{if(t?.kind==="restart"&&!a){let _;try{_=await n()}catch{_=null}if(_&&_.paused===!0)a=!0;else{if(_&&_.paused===!1)return{ok:!1,message:`\uC7AC\uC2DC\uC791 \uAC70\uBD80: ${_.reason||"unknown"}`};{let h=o(s());return h&&h.status==="paused"?{ok:!1,message:"\uC911\uB2E8\uC740 \uC644\uB8CC\uB410\uC9C0\uB9CC \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. paused \uD589\uC758 [\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30]\uB85C \uC7AC\uAC1C\uD558\uC138\uC694."}:{ok:!1,message:"\uC911\uB2E8 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694."}}}}let d={continuation:"prior_attempt",instructions:u},f;try{f=await r({...d}),f&&f.conflict===!0&&(f=await r({...d}))}catch{f=null}return f&&f.resumed===!0?{ok:!0}:f&&f.resumed===!1?{ok:!1,message:`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason||"unknown"}`}:l(s())?(ve("\uC774\uBBF8 \uC7AC\uAC1C\uB428","info",2400),{ok:!0}):{ok:!1,message:"\uC7AC\uAC1C \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}}})}function kc(e){return`session:${e.provider}:${e.session_id}`}function Lo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function ev(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Fs(e,t,n,r){return{attempt_id:kc(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Lo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:ev(e,n)}}}function Nf(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let s=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(a),i.push(a)}let o=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));f&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&o.push({bead_id:a,after:u})}return{order:i,corrections:o,cycle:!1}}var tv="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Aa="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",nv="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",rv="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Bs="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function No(e,t){return`${e}\0${t}`}function sv(e,t){let n=new Set(e),r=new Map;for(let s of e){let i=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,o=i instanceof Map?i.get(s):void 0;if(!Array.isArray(o))return null;r.set(s,o.filter(l=>l!==s&&n.has(l)))}return r}function ov(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Mo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),s=sv(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,_]of s)for(let h of _)i.push({blocker:h,blockee:f});let o=ov(e,t),l=new Map(r.map((f,_)=>[f,_])),a=r.slice(0,o).filter(f=>s.get(f).some(_=>Number(l.get(_))>Number(l.get(f)))),u=Nf(r.slice(o),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,o),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Pf(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Mo(n,t)}function iv(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function av(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function lv(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function wc(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let i=s.pop();for(let o of e.get(i)||[]){if(o===n)return!0;r.has(o)||(r.add(o),s.push(o))}}return!1}function cv(e,t){let n=new Set;for(let[o,l]of t)for(let a of l)n.add(No(o,a));let r=new Map,s=new Map;for(let o of e){let l=No(o.a,o.b);r.set(l,o),s.set(l,o.type==="dep-add")}let i=[];for(let o of e){let l=No(o.a,o.b);r.get(l)===o&&s.get(l)!==n.has(l)&&i.push(o)}return i}function uv(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),i=r[s];if(i&&i.root_dir===t)return i.queue_index;for(let o=s-1;o>=0;o--)if(r[o].root_dir===t)return r[o].queue_index+1;for(let o=s;o<r.length;o++)if(r[o].root_dir===t)return r[o].queue_index;return e.parallel_raw_length.get(t)??0}function dv(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Df(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function $c(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function qo(e){let t=lv(e.blocked_by_map),n=[],r=new Set,s={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=av(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:i,addDep:(u,d,f)=>{if(s.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let h=i(u);if(h!==null){if(wc(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),f!==void 0&&r.add(No(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:h,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let _=i(u);_!==null&&(t.set(u,f.filter(h=>h!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(No(u,d))}}function jo(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=cv(e.dep_ops,t.blocked_by_map),o=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:iv(s.lane_id,s.correction);return{lane_ops:n,ops:[...o,...a,...l,...r],lane_op_index:o.length+a.length,...u===void 0?{}:{correction:u}}}function Mf(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function qf(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],i=new Map;for(let o of r){let l=e.owner_of.get(o.bead_id)||o.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],o.bead_id])}for(let[o,l]of i)s.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:o});return s}function Po(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Sa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ea(e,t,n){let r=qo(n),s=[],i=[],o=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:tv};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:nv};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${$c(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Bs}}if(e.kind==="chain"&&d===void 0)return{refused:Bs};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let g=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(g<0)return;let E=g>0?d.entries[g-1]:null,y=g+1<d.entries.length?d.entries[g+1]:null,te=Do(d,g),J=y!==null&&Do(d,g+1);te&&E!==null&&r.removeDep(e.bead_id,E.bead_id),J&&y!==null&&r.removeDep(y.bead_id,e.bead_id),(te||J)&&E!==null&&y!==null&&r.addDep(y.bead_id,E.bead_id,u)},_=(g,E)=>{let y=n.cross_lanes.get(g),te=y.entries.findIndex(x=>x.bead_id===e.bead_id),J=y.entries.filter(x=>x.bead_id!==e.bead_id),z=Math.max(0,Math.min(J.length,te>=0&&E>te?E-1:E)),M=-1;if(J.forEach((x,I)=>{n.fixed_members.has(x.bead_id)&&(M=I)}),z<=M){r.state.refusal=rv;return}let D=te>=0?y.entries[te]:d?.entries.find(x=>x.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Mo({status:y.status,entries:[...J.slice(0,z),D,...J.slice(z)]},n);let q=l.entries;if(Sa(q,y.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:g,entries:Po(q)}}),y.status!=="confirmed")return;let j=q.findIndex(x=>x.bead_id===e.bead_id),X=j>0?q[j-1].bead_id:null,P=j+1<q.length?q[j+1].bead_id:null;if(X===null){P!==null&&r.addDep(P,e.bead_id,g);return}if(r.addDep(e.bead_id,X,g),P!==null&&(r.graph.get(P)||[]).includes(X)){let x=y.entries.findIndex(I=>I.bead_id===P);(r.laneCreated(P,X)||x>0&&y.entries[x-1].bead_id===X&&Do(y,x))&&r.removeDep(P,X),r.addDep(P,e.bead_id,g)}},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let g=d.entries.filter(y=>y.bead_id!==e.bead_id),E=d.status==="confirmed"&&g.length<2?d.entries:d.entries.filter(y=>y.bead_id===e.bead_id);o.push(...qf(n,d,u,E)),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Po(g)}})}if(t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let g=uv(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Df(e.bead_id,e.root_dir,g));else if(e.kind==="parallel"){let E=n.parallel_rows,y=E[Math.max(0,Math.min(E.length,t.marker_index))];if(!(!!y&&y.bead_id===e.bead_id)&&dv(n,e.root_dir)&&h!==void 0){let J=h>g?g:g-1;J>=0&&J!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:J},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let g=h>t.index?t.index:t.index-1;g>=0&&g!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:g},root_dir:e.root_dir})}}else i.push(Df(e.bead_id,e.root_dir,t.index,t.lane_id));return jo(r,n,s,i,{disarm_ops:o,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function jf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bs};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Mo(n,t);if(r.held)return{refused:Aa};let s=r.entries,i=qo(t),o=[];Mf(i,s,e);let l=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),jo(i,t,l,o,{lane_id:e,correction:r})}function Ff(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bs};let r=Mo(n,t),s=r.entries,i=qo(t),o=[];Mf(i,s,e);let l=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}];return jo(i,t,l,o,{lane_id:e,correction:r})}function Bf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bs};let r=Mo(n,t),s=r.entries;return jo(qo(t),t,Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}],[],{lane_id:e,correction:r})}function Uf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bs};let r=qo(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Do(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return jo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:qf(t,n,e,n.entries)})}function Wf(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let o=1;o<n.entries.length;o+=1){let l=`  ${n.entries[o].bead_id} \u2190 ${n.entries[o-1].bead_id}`;Do(n,o)?r.push(l):s.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${$c(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Hf(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function zf(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function xc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${$c(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var pv="\uC0AC\uC774\uD074";function fv(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,o]of Object.entries(s))Array.isArray(o)&&t.set(i,n(o));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function Ac(e,t,n){let r=Tr(e,t),s=[],i=new Set,o=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),s.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};o(r.running,"running"),o(r.pr_wait,"pr_wait"),o(r.queue,"queue"),o(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?s:s.filter(a=>a.root_dir===l),blocked_by_map:fv(e)}}function Kf(e,t){let n=new Map;for(let o of t.issues)!o||typeof o.bead_id!="string"||o.bead_id.length===0||n.has(o.bead_id)||n.set(o.bead_id,o);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],i=[];for(let o of n.values()){if(o.bead_id===e||o.lane==="done"||s.includes(o.bead_id))continue;let l=wc(t.blocked_by_map,o.bead_id,e);i.push({...o,disabled:l,...l?{reason:pv}:{}})}return i.sort((o,l)=>{let a=r!==void 0&&o.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:o.bead_id.localeCompare(l.bead_id)}),i}function Gf(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var _v=/^\S+-\S+$/;function Vf(e){return _v.test(e.trim())}var{entries:r_,setPrototypeOf:Yf,isFrozen:mv,getPrototypeOf:gv,getOwnPropertyDescriptor:hv}=Object,{freeze:wn,seal:qn,create:Ic}=Object,{apply:Lc,construct:Nc}=typeof Reflect<"u"&&Reflect;wn||(wn=function(t){return t});qn||(qn=function(t){return t});Lc||(Lc=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),i=2;i<r;i++)s[i-2]=arguments[i];return t.apply(n,s)});Nc||(Nc=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Ta=$n(Array.prototype.forEach),bv=$n(Array.prototype.lastIndexOf),Xf=$n(Array.prototype.pop),Fo=$n(Array.prototype.push),yv=$n(Array.prototype.splice),Ca=$n(String.prototype.toLowerCase),Sc=$n(String.prototype.toString),Ec=$n(String.prototype.match),Bo=$n(String.prototype.replace),vv=$n(String.prototype.indexOf),kv=$n(String.prototype.trim),zn=$n(Object.prototype.hasOwnProperty),kn=$n(RegExp.prototype.test),Uo=wv(TypeError);function $n(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Lc(e,t,r)}}function wv(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Nc(e,n)}}function Ot(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ca;Yf&&Yf(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let i=n(s);i!==s&&(mv(t)||(t[r]=i),s=i)}e[s]=!0}return e}function $v(e){for(let t=0;t<e.length;t++)zn(e,t)||(e[t]=null);return e}function _r(e){let t=Ic(null);for(let[n,r]of r_(e))zn(e,n)&&(Array.isArray(r)?t[n]=$v(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=_r(r):t[n]=r);return t}function Wo(e,t){for(;e!==null;){let r=hv(e,t);if(r){if(r.get)return $n(r.get);if(typeof r.value=="function")return $n(r.value)}e=gv(e)}function n(){return null}return n}var Qf=wn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Tc=wn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Rc=wn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xv=wn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Cc=wn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Av=wn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zf=wn(["#text"]),Jf=wn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Oc=wn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),e_=wn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ra=wn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sv=qn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ev=qn(/<%[\w\W]*|[\w\W]*%>/gm),Tv=qn(/\$\{[\w\W]*/gm),Rv=qn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Cv=qn(/^aria-[\-\w]+$/),s_=qn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ov=qn(/^(?:\w+script|data):/i),Iv=qn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),o_=qn(/^html$/i),Lv=qn(/^[a-z][.\w]*(-[.\w]+)+$/i),t_=Object.freeze({__proto__:null,ARIA_ATTR:Cv,ATTR_WHITESPACE:Iv,CUSTOM_ELEMENT:Lv,DATA_ATTR:Rv,DOCTYPE_NAME:o_,ERB_EXPR:Ev,IS_ALLOWED_URI:s_,IS_SCRIPT_OR_DATA:Ov,MUSTACHE_EXPR:Sv,TMPLIT_EXPR:Tv}),Ho={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Nv=function(){return typeof window>"u"?null:window},Dv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},n_=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function i_(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Nv(),t=Ve=>i_(Ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ho.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:h}=e,g=a.prototype,E=Wo(g,"cloneNode"),y=Wo(g,"remove"),te=Wo(g,"nextSibling"),J=Wo(g,"childNodes"),z=Wo(g,"parentNode");if(typeof o=="function"){let Ve=n.createElement("template");Ve.content&&Ve.content.ownerDocument&&(n=Ve.content.ownerDocument)}let M,D="",{implementation:q,createNodeIterator:j,createDocumentFragment:X,getElementsByTagName:P}=n,{importNode:x}=r,I=n_();t.isSupported=typeof r_=="function"&&typeof z=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:O,ERB_EXPR:ae,TMPLIT_EXPR:fe,DATA_ATTR:ye,ARIA_ATTR:Q,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:pe,CUSTOM_ELEMENT:Ne}=t_,{IS_ALLOWED_URI:qe}=t_,Pe=null,he=Ot({},[...Qf,...Tc,...Rc,...Cc,...Zf]),U=null,ue=Ot({},[...Jf,...Oc,...e_,...Ra]),_e=Object.seal(Ic(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),B=null,W=null,Ce=Object.seal(Ic(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),K=!0,ne=!0,se=!1,ce=!0,Re=!1,Z=!0,Oe=!1,Me=!1,Je=!1,je=!1,ie=!1,ee=!1,Te=!0,ft=!1,_t="user-content-",He=!0,mt=!1,It={},St=null,st=Ot({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,Jt=Ot({},["audio","video","img","source","image","track"]),Mt=null,Zt=Ot({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),v="http://www.w3.org/1998/Math/MathML",G="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml",Ie=De,Fe=!1,ze=null,oe=Ot({},[v,G,De],Sc),be=Ot({},["mi","mo","mn","ms","mtext"]),Qe=Ot({},["annotation-xml"]),at=Ot({},["title","style","font","a","script"]),et=null,ht=["application/xhtml+xml","text/html"],bt="text/html",rt=null,Ke=null,T=n.createElement("form"),V=function(N){return N instanceof RegExp||N instanceof Function},Y=function(){let N=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ke&&Ke===N)){if((!N||typeof N!="object")&&(N={}),N=_r(N),et=ht.indexOf(N.PARSER_MEDIA_TYPE)===-1?bt:N.PARSER_MEDIA_TYPE,rt=et==="application/xhtml+xml"?Sc:Ca,Pe=zn(N,"ALLOWED_TAGS")?Ot({},N.ALLOWED_TAGS,rt):he,U=zn(N,"ALLOWED_ATTR")?Ot({},N.ALLOWED_ATTR,rt):ue,ze=zn(N,"ALLOWED_NAMESPACES")?Ot({},N.ALLOWED_NAMESPACES,Sc):oe,Mt=zn(N,"ADD_URI_SAFE_ATTR")?Ot(_r(Zt),N.ADD_URI_SAFE_ATTR,rt):Zt,pt=zn(N,"ADD_DATA_URI_TAGS")?Ot(_r(Jt),N.ADD_DATA_URI_TAGS,rt):Jt,St=zn(N,"FORBID_CONTENTS")?Ot({},N.FORBID_CONTENTS,rt):st,B=zn(N,"FORBID_TAGS")?Ot({},N.FORBID_TAGS,rt):_r({}),W=zn(N,"FORBID_ATTR")?Ot({},N.FORBID_ATTR,rt):_r({}),It=zn(N,"USE_PROFILES")?N.USE_PROFILES:!1,K=N.ALLOW_ARIA_ATTR!==!1,ne=N.ALLOW_DATA_ATTR!==!1,se=N.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=N.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=N.SAFE_FOR_TEMPLATES||!1,Z=N.SAFE_FOR_XML!==!1,Oe=N.WHOLE_DOCUMENT||!1,je=N.RETURN_DOM||!1,ie=N.RETURN_DOM_FRAGMENT||!1,ee=N.RETURN_TRUSTED_TYPE||!1,Je=N.FORCE_BODY||!1,Te=N.SANITIZE_DOM!==!1,ft=N.SANITIZE_NAMED_PROPS||!1,He=N.KEEP_CONTENT!==!1,mt=N.IN_PLACE||!1,qe=N.ALLOWED_URI_REGEXP||s_,Ie=N.NAMESPACE||De,be=N.MATHML_TEXT_INTEGRATION_POINTS||be,Qe=N.HTML_INTEGRATION_POINTS||Qe,_e=N.CUSTOM_ELEMENT_HANDLING||{},N.CUSTOM_ELEMENT_HANDLING&&V(N.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=N.CUSTOM_ELEMENT_HANDLING.tagNameCheck),N.CUSTOM_ELEMENT_HANDLING&&V(N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=N.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),N.CUSTOM_ELEMENT_HANDLING&&typeof N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=N.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(ne=!1),ie&&(je=!0),It&&(Pe=Ot({},Zf),U=[],It.html===!0&&(Ot(Pe,Qf),Ot(U,Jf)),It.svg===!0&&(Ot(Pe,Tc),Ot(U,Oc),Ot(U,Ra)),It.svgFilters===!0&&(Ot(Pe,Rc),Ot(U,Oc),Ot(U,Ra)),It.mathMl===!0&&(Ot(Pe,Cc),Ot(U,e_),Ot(U,Ra))),N.ADD_TAGS&&(typeof N.ADD_TAGS=="function"?Ce.tagCheck=N.ADD_TAGS:(Pe===he&&(Pe=_r(Pe)),Ot(Pe,N.ADD_TAGS,rt))),N.ADD_ATTR&&(typeof N.ADD_ATTR=="function"?Ce.attributeCheck=N.ADD_ATTR:(U===ue&&(U=_r(U)),Ot(U,N.ADD_ATTR,rt))),N.ADD_URI_SAFE_ATTR&&Ot(Mt,N.ADD_URI_SAFE_ATTR,rt),N.FORBID_CONTENTS&&(St===st&&(St=_r(St)),Ot(St,N.FORBID_CONTENTS,rt)),He&&(Pe["#text"]=!0),Oe&&Ot(Pe,["html","head","body"]),Pe.table&&(Ot(Pe,["tbody"]),delete B.tbody),N.TRUSTED_TYPES_POLICY){if(typeof N.TRUSTED_TYPES_POLICY.createHTML!="function")throw Uo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof N.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Uo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=N.TRUSTED_TYPES_POLICY,D=M.createHTML("")}else M===void 0&&(M=Dv(h,s)),M!==null&&typeof D=="string"&&(D=M.createHTML(""));wn&&wn(N),Ke=N}},Ae=Ot({},[...Tc,...Rc,...xv]),xe=Ot({},[...Cc,...Av]),yt=function(N){let $e=z(N);(!$e||!$e.tagName)&&($e={namespaceURI:Ie,tagName:"template"});let Ue=Ca(N.tagName),wt=Ca($e.tagName);return ze[N.namespaceURI]?N.namespaceURI===G?$e.namespaceURI===De?Ue==="svg":$e.namespaceURI===v?Ue==="svg"&&(wt==="annotation-xml"||be[wt]):!!Ae[Ue]:N.namespaceURI===v?$e.namespaceURI===De?Ue==="math":$e.namespaceURI===G?Ue==="math"&&Qe[wt]:!!xe[Ue]:N.namespaceURI===De?$e.namespaceURI===G&&!Qe[wt]||$e.namespaceURI===v&&!be[wt]?!1:!xe[Ue]&&(at[Ue]||!Ae[Ue]):!!(et==="application/xhtml+xml"&&ze[N.namespaceURI]):!1},xt=function(N){Fo(t.removed,{element:N});try{z(N).removeChild(N)}catch{y(N)}},vt=function(N,$e){try{Fo(t.removed,{attribute:$e.getAttributeNode(N),from:$e})}catch{Fo(t.removed,{attribute:null,from:$e})}if($e.removeAttribute(N),N==="is")if(je||ie)try{xt($e)}catch{}else try{$e.setAttribute(N,"")}catch{}},Lt=function(N){let $e=null,Ue=null;if(Je)N="<remove></remove>"+N;else{let Et=Ec(N,/^[\r\n\t ]+/);Ue=Et&&Et[0]}et==="application/xhtml+xml"&&Ie===De&&(N='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+N+"</body></html>");let wt=M?M.createHTML(N):N;if(Ie===De)try{$e=new _().parseFromString(wt,et)}catch{}if(!$e||!$e.documentElement){$e=q.createDocument(Ie,"template",null);try{$e.documentElement.innerHTML=Fe?D:wt}catch{}}let tt=$e.body||$e.documentElement;return N&&Ue&&tt.insertBefore(n.createTextNode(Ue),tt.childNodes[0]||null),Ie===De?P.call($e,Oe?"html":"body")[0]:Oe?$e.documentElement:tt},qt=function(N){return j.call(N.ownerDocument||N,N,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Gt=function(N){return N instanceof f&&(typeof N.nodeName!="string"||typeof N.textContent!="string"||typeof N.removeChild!="function"||!(N.attributes instanceof d)||typeof N.removeAttribute!="function"||typeof N.setAttribute!="function"||typeof N.namespaceURI!="string"||typeof N.insertBefore!="function"||typeof N.hasChildNodes!="function")},rn=function(N){return typeof l=="function"&&N instanceof l};function kt(Ve,N,$e){Ta(Ve,Ue=>{Ue.call(t,N,$e,Ke)})}let en=function(N){let $e=null;if(kt(I.beforeSanitizeElements,N,null),Gt(N))return xt(N),!0;let Ue=rt(N.nodeName);if(kt(I.uponSanitizeElement,N,{tagName:Ue,allowedTags:Pe}),Z&&N.hasChildNodes()&&!rn(N.firstElementChild)&&kn(/<[/\w!]/g,N.innerHTML)&&kn(/<[/\w!]/g,N.textContent)||N.nodeType===Ho.progressingInstruction||Z&&N.nodeType===Ho.comment&&kn(/<[/\w]/g,N.data))return xt(N),!0;if(!(Ce.tagCheck instanceof Function&&Ce.tagCheck(Ue))&&(!Pe[Ue]||B[Ue])){if(!B[Ue]&&Ut(Ue)&&(_e.tagNameCheck instanceof RegExp&&kn(_e.tagNameCheck,Ue)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Ue)))return!1;if(He&&!St[Ue]){let wt=z(N)||N.parentNode,tt=J(N)||N.childNodes;if(tt&&wt){let Et=tt.length;for(let Tt=Et-1;Tt>=0;--Tt){let lt=E(tt[Tt],!0);lt.__removalCount=(N.__removalCount||0)+1,wt.insertBefore(lt,te(N))}}}return xt(N),!0}return N instanceof a&&!yt(N)||(Ue==="noscript"||Ue==="noembed"||Ue==="noframes")&&kn(/<\/no(script|embed|frames)/i,N.innerHTML)?(xt(N),!0):(Re&&N.nodeType===Ho.text&&($e=N.textContent,Ta([O,ae,fe],wt=>{$e=Bo($e,wt," ")}),N.textContent!==$e&&(Fo(t.removed,{element:N.cloneNode()}),N.textContent=$e)),kt(I.afterSanitizeElements,N,null),!1)},un=function(N,$e,Ue){if(Te&&($e==="id"||$e==="name")&&(Ue in n||Ue in T))return!1;if(!(ne&&!W[$e]&&kn(ye,$e))){if(!(K&&kn(Q,$e))){if(!(Ce.attributeCheck instanceof Function&&Ce.attributeCheck($e,N))){if(!U[$e]||W[$e]){if(!(Ut(N)&&(_e.tagNameCheck instanceof RegExp&&kn(_e.tagNameCheck,N)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(N))&&(_e.attributeNameCheck instanceof RegExp&&kn(_e.attributeNameCheck,$e)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck($e,N))||$e==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&kn(_e.tagNameCheck,Ue)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(Ue))))return!1}else if(!Mt[$e]){if(!kn(qe,Bo(Ue,pe,""))){if(!(($e==="src"||$e==="xlink:href"||$e==="href")&&N!=="script"&&vv(Ue,"data:")===0&&pt[N])){if(!(se&&!kn(le,Bo(Ue,pe,"")))){if(Ue)return!1}}}}}}}return!0},Ut=function(N){return N!=="annotation-xml"&&Ec(N,Ne)},Vt=function(N){kt(I.beforeSanitizeAttributes,N,null);let{attributes:$e}=N;if(!$e||Gt(N))return;let Ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:U,forceKeepAttr:void 0},wt=$e.length;for(;wt--;){let tt=$e[wt],{name:Et,namespaceURI:Tt,value:lt}=tt,Bt=rt(Et),An=lt,$t=Et==="value"?An:kv(An);if(Ue.attrName=Bt,Ue.attrValue=$t,Ue.keepAttr=!0,Ue.forceKeepAttr=void 0,kt(I.uponSanitizeAttribute,N,Ue),$t=Ue.attrValue,ft&&(Bt==="id"||Bt==="name")&&(vt(Et,N),$t=_t+$t),Z&&kn(/((--!?|])>)|<\/(style|title|textarea)/i,$t)){vt(Et,N);continue}if(Bt==="attributename"&&Ec($t,"href")){vt(Et,N);continue}if(Ue.forceKeepAttr)continue;if(!Ue.keepAttr){vt(Et,N);continue}if(!ce&&kn(/\/>/i,$t)){vt(Et,N);continue}Re&&Ta([O,ae,fe],_n=>{$t=Bo($t,_n," ")});let bn=rt(N.nodeName);if(!un(bn,Bt,$t)){vt(Et,N);continue}if(M&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Tt)switch(h.getAttributeType(bn,Bt)){case"TrustedHTML":{$t=M.createHTML($t);break}case"TrustedScriptURL":{$t=M.createScriptURL($t);break}}if($t!==An)try{Tt?N.setAttributeNS(Tt,Et,$t):N.setAttribute(Et,$t),Gt(N)?xt(N):Xf(t.removed)}catch{vt(Et,N)}}kt(I.afterSanitizeAttributes,N,null)},Xt=function Ve(N){let $e=null,Ue=qt(N);for(kt(I.beforeSanitizeShadowDOM,N,null);$e=Ue.nextNode();)kt(I.uponSanitizeShadowNode,$e,null),en($e),Vt($e),$e.content instanceof i&&Ve($e.content);kt(I.afterSanitizeShadowDOM,N,null)};return t.sanitize=function(Ve){let N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$e=null,Ue=null,wt=null,tt=null;if(Fe=!Ve,Fe&&(Ve="<!-->"),typeof Ve!="string"&&!rn(Ve))if(typeof Ve.toString=="function"){if(Ve=Ve.toString(),typeof Ve!="string")throw Uo("dirty is not a string, aborting")}else throw Uo("toString is not a function");if(!t.isSupported)return Ve;if(Me||Y(N),t.removed=[],typeof Ve=="string"&&(mt=!1),mt){if(Ve.nodeName){let lt=rt(Ve.nodeName);if(!Pe[lt]||B[lt])throw Uo("root node is forbidden and cannot be sanitized in-place")}}else if(Ve instanceof l)$e=Lt("<!---->"),Ue=$e.ownerDocument.importNode(Ve,!0),Ue.nodeType===Ho.element&&Ue.nodeName==="BODY"||Ue.nodeName==="HTML"?$e=Ue:$e.appendChild(Ue);else{if(!je&&!Re&&!Oe&&Ve.indexOf("<")===-1)return M&&ee?M.createHTML(Ve):Ve;if($e=Lt(Ve),!$e)return je?null:ee?D:""}$e&&Je&&xt($e.firstChild);let Et=qt(mt?Ve:$e);for(;wt=Et.nextNode();)en(wt),Vt(wt),wt.content instanceof i&&Xt(wt.content);if(mt)return Ve;if(je){if(ie)for(tt=X.call($e.ownerDocument);$e.firstChild;)tt.appendChild($e.firstChild);else tt=$e;return(U.shadowroot||U.shadowrootmode)&&(tt=x.call(r,tt,!0)),tt}let Tt=Oe?$e.outerHTML:$e.innerHTML;return Oe&&Pe["!doctype"]&&$e.ownerDocument&&$e.ownerDocument.doctype&&$e.ownerDocument.doctype.name&&kn(o_,$e.ownerDocument.doctype.name)&&(Tt="<!DOCTYPE "+$e.ownerDocument.doctype.name+`>
`+Tt),Re&&Ta([O,ae,fe],lt=>{Tt=Bo(Tt,lt," ")}),M&&ee?M.createHTML(Tt):Tt},t.setConfig=function(){let Ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Y(Ve),Me=!0},t.clearConfig=function(){Ke=null,Me=!1},t.isValidAttribute=function(Ve,N,$e){Ke||Y({});let Ue=rt(Ve),wt=rt(N);return un(Ue,wt,$e)},t.addHook=function(Ve,N){typeof N=="function"&&Fo(I[Ve],N)},t.removeHook=function(Ve,N){if(N!==void 0){let $e=bv(I[Ve],N);return $e===-1?void 0:yv(I[Ve],$e,1)[0]}return Xf(I[Ve])},t.removeHooks=function(Ve){I[Ve]=[]},t.removeAllHooks=function(){I=n_()},t}var a_=i_();var mr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oa=e=>(...t)=>({_$litDirective$:e,values:t}),Us=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var zo=class extends Us{constructor(t){if(super(t),this.it=Qt,t.type!==mr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Qt||t==null)return this._t=void 0,this.it=t;if(t===Pn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};zo.directiveName="unsafeHTML",zo.resultType=1;var l_=Oa(zo);function qc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ss=qc();function m_(e){ss=e}var Yo={exec:()=>null};function Pt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(xn.caret,"$1"),n=n.replace(s,o),r},getRegex:()=>new RegExp(n,t)};return r}var Pv=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Mv=/^(?:[ \t]*(?:\n|$))+/,qv=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,jv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Fv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,jc=/(?:[*+-]|\d{1,9}[.)])/,g_=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,h_=Pt(g_).replace(/bull/g,jc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bv=Pt(g_).replace(/bull/g,jc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Fc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Uv=/^[^\n]+/,Bc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wv=Pt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Bc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Hv=Pt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,jc).getRegex(),Ma="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Uc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zv=Pt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Uc).replace("tag",Ma).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),b_=Pt(Fc).replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ma).getRegex(),Kv=Pt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",b_).getRegex(),Wc={blockquote:Kv,code:qv,def:Wv,fences:jv,heading:Fv,hr:Xo,html:zv,lheading:h_,list:Hv,newline:Mv,paragraph:b_,table:Yo,text:Uv},c_=Pt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ma).getRegex(),Gv={...Wc,lheading:Bv,table:c_,paragraph:Pt(Fc).replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",c_).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ma).getRegex()},Vv={...Wc,html:Pt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Uc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Pt(Fc).replace("hr",Xo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",h_).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Xv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,y_=/^( {2,}|\\)\n(?!\s*$)/,Qv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qa=/[\p{P}\p{S}]/u,Hc=/[\s\p{P}\p{S}]/u,v_=/[^\s\p{P}\p{S}]/u,Zv=Pt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Hc).getRegex(),k_=/(?!~)[\p{P}\p{S}]/u,Jv=/(?!~)[\s\p{P}\p{S}]/u,ek=/(?:[^\s\p{P}\p{S}]|~)/u,tk=Pt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Pv?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),w_=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,nk=Pt(w_,"u").replace(/punct/g,qa).getRegex(),rk=Pt(w_,"u").replace(/punct/g,k_).getRegex(),$_="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sk=Pt($_,"gu").replace(/notPunctSpace/g,v_).replace(/punctSpace/g,Hc).replace(/punct/g,qa).getRegex(),ok=Pt($_,"gu").replace(/notPunctSpace/g,ek).replace(/punctSpace/g,Jv).replace(/punct/g,k_).getRegex(),ik=Pt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,v_).replace(/punctSpace/g,Hc).replace(/punct/g,qa).getRegex(),ak=Pt(/\\(punct)/,"gu").replace(/punct/g,qa).getRegex(),lk=Pt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ck=Pt(Uc).replace("(?:-->|$)","-->").getRegex(),uk=Pt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ck).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Na=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,dk=Pt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Na).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),x_=Pt(/^!?\[(label)\]\[(ref)\]/).replace("label",Na).replace("ref",Bc).getRegex(),A_=Pt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Bc).getRegex(),pk=Pt("reflink|nolink(?!\\()","g").replace("reflink",x_).replace("nolink",A_).getRegex(),u_=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zc={_backpedal:Yo,anyPunctuation:ak,autolink:lk,blockSkip:tk,br:y_,code:Xv,del:Yo,emStrongLDelim:nk,emStrongRDelimAst:sk,emStrongRDelimUnd:ik,escape:Yv,link:dk,nolink:A_,punctuation:Zv,reflink:x_,reflinkSearch:pk,tag:uk,text:Qv,url:Yo},fk={...zc,link:Pt(/^!?\[(label)\]\((.*?)\)/).replace("label",Na).getRegex(),reflink:Pt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Na).getRegex()},Dc={...zc,emStrongRDelimAst:ok,emStrongLDelim:rk,url:Pt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",u_).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Pt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",u_).getRegex()},_k={...Dc,br:Pt(y_).replace("{2,}","*").getRegex(),text:Pt(Dc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ia={normal:Wc,gfm:Gv,pedantic:Vv},Ko={normal:zc,gfm:Dc,breaks:_k,pedantic:fk},mk={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},d_=e=>mk[e];function gr(e,t){if(t){if(xn.escapeTest.test(e))return e.replace(xn.escapeReplace,d_)}else if(xn.escapeTestNoEncode.test(e))return e.replace(xn.escapeReplaceNoEncode,d_);return e}function p_(e){try{e=encodeURI(e).replace(xn.percentDecode,"%")}catch{return null}return e}function f_(e,t){let n=e.replace(xn.findPipe,(i,o,l)=>{let a=!1,u=o;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(xn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(xn.slashPipe,"|");return r}function Go(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let i=e.charAt(r-s-1);if(i===t&&!n)s++;else if(i!==t&&n)s++;else break}return e.slice(0,r-s)}function gk(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function __(e,t,n,r,s){let i=t.href,o=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:o,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function hk(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(i=>{let o=i.match(n.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=s.length?i.slice(s.length):i}).join(`
`)}var Da=class{constructor(e){Ht(this,"options");Ht(this,"rules");Ht(this,"lexer");this.options=e||ss}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Go(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=hk(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Go(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Go(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Go(t[0],`
`).split(`
`),r="",s="",i=[];for(;n.length>0;){let o=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),o=!0;else if(!o)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let h=_,g=h.raw+`
`+n.join(`
`),E=this.blockquote(g);i[i.length-1]=E,r=r.substring(0,r.length-h.raw.length)+E.raw,s=s.substring(0,s.length-h.text.length)+E.text;break}else if(_?.type==="list"){let h=_,g=h.raw+`
`+n.join(`
`),E=this.list(g);i[i.length-1]=E,r=r.substring(0,r.length-_.raw.length)+E.raw,s=s.substring(0,s.length-h.raw.length)+E.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),o=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),_=e.split(`
`,1)[0],h=!f.trim(),g=0;if(this.options.pedantic?(g=2,d=f.trimStart()):h?g=t[1].length+1:(g=t[2].search(this.rules.other.nonSpaceChar),g=g>4?1:g,d=f.slice(g),g+=t[1].length),h&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex(g),y=this.rules.other.hrRegex(g),te=this.rules.other.fencesBeginRegex(g),J=this.rules.other.headingBeginRegex(g),z=this.rules.other.htmlBeginRegex(g);for(;e;){let M=e.split(`
`,1)[0],D;if(_=M,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),D=_):D=_.replace(this.rules.other.tabCharGlobal,"    "),te.test(_)||J.test(_)||z.test(_)||E.test(_)||y.test(_))break;if(D.search(this.rules.other.nonSpaceChar)>=g||!_.trim())d+=`
`+D.slice(g);else{if(h||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(f)||J.test(f)||y.test(f))break;d+=`
`+_}!h&&!_.trim()&&(h=!0),u+=M+`
`,e=e.substring(M.length+1),f=D.slice(g)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!s.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=d}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=f_(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let o of r)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<n.length;o++)i.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:i.align[o]});for(let o of s)i.rows.push(f_(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Go(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=gk(t[2],"()");if(i===-2)return;if(i>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],s=i[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),__(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return __(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,o,l=s,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){l+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let d=[...r[0]][0].length,f=e.slice(0,s+r.index+d+o);if(Math.min(s,o)%2){let h=f.slice(1,-1);return{type:"em",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Kn=class Pc{constructor(t){Ht(this,"tokens");Ht(this,"options");Ht(this,"state");Ht(this,"inlineQueue");Ht(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ss,this.options.tokenizer=this.options.tokenizer||new Da,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:xn,block:Ia.normal,inline:Ko.normal};this.options.pedantic?(n.block=Ia.pedantic,n.inline=Ko.pedantic):this.options.gfm&&(n.block=Ia.gfm,this.options.breaks?n.inline=Ko.breaks:n.inline=Ko.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ia,inline:Ko}}static lex(t,n){return new Pc(n).lex(t)}static lexInline(t,n){return new Pc(n).inlineTokens(t)}lex(t){t=t.replace(xn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(xn.tabCharGlobal,"    ").replace(xn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(o=>(s=o.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let o=n.at(-1);s.raw.length===1&&o!==void 0?o.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.at(-1).src=o.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let i=t;if(this.options.extensions?.startBlock){let o=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=t.substring(0,o+1))}if(this.state.top&&(s=this.tokenizer.paragraph(i))){let o=n.at(-1);r&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(s),r=i.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(s);continue}if(t){let o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=s[2]?s[2].length:0,r=r.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let o=!1,l="";for(;t;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),_;this.options.extensions.startInline.forEach(h=>{_=h.call({lexer:this},f),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Pa=class{constructor(e){Ht(this,"options");Ht(this,"parser");this.options=e||ss}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(xn.notSpaceStart)?.[0],s=e.replace(xn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+gr(r)+'">'+(n?s:gr(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:gr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let o=0;o<e.items.length;o++){let l=e.items[o];r+=this.listitem(l)}let s=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+s+i+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let i=e.rows[s];n="";for(let o=0;o<i.length;o++)n+=this.tablecell(i[o]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${gr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=p_(e);if(s===null)return r;e=s;let i='<a href="'+e+'"';return t&&(i+=' title="'+gr(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=p_(e);if(s===null)return gr(n);e=s;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${gr(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:gr(e.text)}},Kc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Gn=class Mc{constructor(t){Ht(this,"options");Ht(this,"renderer");Ht(this,"textRenderer");this.options=t||ss,this.options.renderer=this.options.renderer||new Pa,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Kc}static parse(t,n){return new Mc(n).parse(t)}static parseInline(t,n){return new Mc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let o=s,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=l||"";continue}}let i=s;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let o=i;switch(o.type){case"escape":{r+=n.text(o);break}case"html":{r+=n.html(o);break}case"link":{r+=n.link(o);break}case"image":{r+=n.image(o);break}case"checkbox":{r+=n.checkbox(o);break}case"strong":{r+=n.strong(o);break}case"em":{r+=n.em(o);break}case"codespan":{r+=n.codespan(o);break}case"br":{r+=n.br(o);break}case"del":{r+=n.del(o);break}case"text":{r+=n.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},La,Vo=(La=class{constructor(e){Ht(this,"options");Ht(this,"block");this.options=e||ss}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Kn.lex:Kn.lexInline}provideParser(){return this.block?Gn.parse:Gn.parseInline}},Ht(La,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ht(La,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),La),bk=class{constructor(...e){Ht(this,"defaults",qc());Ht(this,"options",this.setOptions);Ht(this,"parse",this.parseMarkdown(!0));Ht(this,"parseInline",this.parseMarkdown(!1));Ht(this,"Parser",Gn);Ht(this,"Renderer",Pa);Ht(this,"TextRenderer",Kc);Ht(this,"Lexer",Kn);Ht(this,"Tokenizer",Da);Ht(this,"Hooks",Vo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let i of s.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of s.rows)for(let o of i)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(i=>{let o=s[i].flat(1/0);n=n.concat(this.walkTokens(o,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=t.renderers[s.name];i?t.renderers[s.name]=function(...o){let l=s.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[s.level];i?i.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Pa(this.defaults);for(let i in n.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=n.renderer[o],a=s[o];s[o]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=a.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Da(this.defaults);for(let i in n.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=n.tokenizer[o],a=s[o];s[o]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=a.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Vo;for(let i in n.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=n.hooks[o],a=s[o];Vo.passThroughHooks.has(i)?s[o]=u=>{if(this.defaults.async&&Vo.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(s,u);return a.call(s,f)})();let d=l.call(s,u);return a.call(s,d)}:s[o]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,u);return f===!1&&(f=await a.apply(s,u)),f})();let d=l.apply(s,u);return d===!1&&(d=a.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),s&&(l=l.concat(s.call(this,o))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Kn.lex(e,t??this.defaults)}parser(e,t){return Gn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(o,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Gn.parse:Gn.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(i);try{s.hooks&&(t=s.hooks.preprocess(t));let o=(s.hooks?s.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(t,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Gn.parse:Gn.parseInline)(o,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+gr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},rs=new bk;function Ft(e,t){return rs.parse(e,t)}Ft.options=Ft.setOptions=function(e){return rs.setOptions(e),Ft.defaults=rs.defaults,m_(Ft.defaults),Ft};Ft.getDefaults=qc;Ft.defaults=ss;Ft.use=function(...e){return rs.use(...e),Ft.defaults=rs.defaults,m_(Ft.defaults),Ft};Ft.walkTokens=function(e,t){return rs.walkTokens(e,t)};Ft.parseInline=rs.parseInline;Ft.Parser=Gn;Ft.parser=Gn.parse;Ft.Renderer=Pa;Ft.TextRenderer=Kc;Ft.Lexer=Kn;Ft.lexer=Kn.lex;Ft.Tokenizer=Da;Ft.Hooks=Vo;Ft.parse=Ft;var VE=Ft.options,YE=Ft.setOptions,XE=Ft.use,QE=Ft.walkTokens,ZE=Ft.parseInline;var JE=Gn.parse,eT=Kn.lex;function hr(e){let t=Ft.parse(e),n=a_.sanitize(t);return l_(n)}function br(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ws(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ja(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var T_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},yk={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},vk=new Set(["codex-delegation-monitor-v1","codex-delegation-monitor-v2"]),kk=new Set(["read","list_files","search","unknown"]),wk=new Set(["add","modify","delete"]),S_=20,$k=128,xk=256,R_=/[\u0000-\u001f\u007f-\u009f]/,Ak={add:"\uCD94\uAC00",modify:"\uC218\uC815",delete:"\uC0AD\uC81C"};function Gc(e){return typeof e=="string"&&vk.has(e)}function C_(e,t){return Object.keys(e).every(n=>t.has(n))}function O_(e){return typeof e!="string"||e.length===0||e.length>xk||R_.test(e)||e.startsWith("/")||e.startsWith("\\")||/^[A-Za-z]:[\\/]/.test(e)?!1:!e.split(/[\\/]/).includes("..")}function Sk(e){if(!In(e)||!C_(e,Ek)||typeof e.type!="string"||!kk.has(e.type))return null;let t={type:e.type};return typeof e.name=="string"&&e.name.length>0&&e.name.length<=$k&&!R_.test(e.name)&&(t.name=e.name),O_(e.path)&&(t.path=e.path),t}var Ek=new Set(["type","name","path"]),Tk=new Set(["path","kind"]);function Rk(e){return!In(e)||!C_(e,Tk)||typeof e.kind!="string"||!wk.has(e.kind)||!O_(e.path)?null:{path:e.path,kind:e.kind}}function Ck(e,t={}){let n={},r=t.completed===!0;if(e.activity==="command_execution"&&Array.isArray(e.parsed_cmd)&&e.parsed_cmd.length<=S_){let s=e.parsed_cmd.map(Sk);s.every(i=>i!==null)&&(n.parsed_cmd=s)}if(e.activity==="command_execution"&&r&&typeof e.exit_code=="number"&&Number.isInteger(e.exit_code)&&(n.exit_code=e.exit_code),e.activity==="file_change"&&Array.isArray(e.changes)&&e.changes.length<=S_){let s=e.changes.map(Rk);s.every(i=>i!==null)&&(n.changes=s)}return typeof e.details_truncated=="boolean"&&(n.parsed_cmd!==void 0||n.changes!==void 0)&&(n.details_truncated=e.details_truncated),n}function Ok(e){let t=Ck(e,{completed:!0}),n=[];for(let r of t.parsed_cmd||[]){let s=[r.path,r.name].filter(i=>typeof i=="string"&&i.length>0);n.push([r.type,...s].join(" "))}for(let r of t.changes||[])n.push(`${Ak[r.kind]} ${r.path}`);return t.details_truncated===!0&&n.length>0&&n.push("\u2026"),typeof t.exit_code=="number"&&n.push(`exit ${t.exit_code}`),n.join(" \xB7 ")}var Ik=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Lk=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function In(e){return!!e&&typeof e=="object"}function Vc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Yc(e,t){let n=Vc(e),r=Vc(t),s=new Map;for(let l of n)s.set(l,(s.get(l)||0)+1);let i=0;for(let l of r){let a=s.get(l)||0;a>0?s.set(l,a-1):i+=1}let o=0;for(let l of s.values())o+=l;return{added:i,removed:o}}function I_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>In(s)&&typeof s.text=="string"?s.text:"").join(""):In(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Nk(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:T_[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Vc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:i}=Yc(n.old_string,n.new_string);r.added=s,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,i=0,o=Array.isArray(n.edits)?n.edits:[];for(let l of o){let a=Yc(In(l)?l.old_string:"",In(l)?l.new_string:"");s+=a.added,i+=a.removed}r.added=s,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Xc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Dk=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function L_(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>In(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Dk,"").trim();return n.length>0?{kind:"user",text:n}:null}function Qc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ik.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Lk.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Pk(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Mk(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],i=[];for(let o of s)if(In(o)){if(o.type==="text"&&typeof o.text=="string")i.push(Qc(o.text));else if(o.type==="thinking"){let l=Xc(o.thinking);l&&i.push(l)}else if(o.type==="tool_use"){let l=Nk(o);typeof o.id=="string"&&t.set(o.id,l),i.push(l)}}return n?E_(i,n):i}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(In(o)&&o.type==="tool_result"){let l=t.get(String(o.tool_use_id));if(l){let a=I_(o.content);l.result=a,l.output=typeof o.content=="string"?o.content:a,o.is_error===!0&&(l.is_error=!0)}}let i=L_(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?E_([s],n):[s]}return[]}function E_(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function qk(e){let t=typeof e.command=="string"?e.command:"",n=I_(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(o=>o.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:T_.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(i.result=s),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function jk(e){if(e.type==="item.completed"&&In(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Qc(t.text)];if(t.type==="user_message"){let n=L_(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Xc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[qk(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Fk(e){if(!Gc(e.schema)||!In(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&In(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Qc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let o=Xc(n.text);return o?[o]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=yk[n.activity];if(!r)return[];let s,i;if(n.status==="completed")s="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${s}`,icon:i,expandable:!1,result:Ok(n)}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Bk(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Uk(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return In(t)?t:null}function N_(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let i=Uk(s);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&!Gc(i.schema))return Pk(i,r);let o=Gc(i.schema)?Fk(i):Bk(i)?jk(i):Mk(i,n);return o.length>0&&(r.progress=null),o}}}function Zc(e){let t=[],n=N_(),r=Array.isArray(e)?e:[];for(let s of r)for(let i of n.push(s))t.push(i);return t}var Wk=5,Hk=10,zk=/Task\s+#(\d+)/,Kk=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gk=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Vk(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Yk(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Xk(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let i=s.input||{};if(s.tool==="TaskCreate"){let a=zk.exec(s.output||s.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let o=t.get(String(i.taskId??""));if(!o)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(o.label=l.trim()),typeof i.status=="string"&&(o.active=i.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Qk(e){if(e.tool==="Bash"){let t=e.command||"";return Kk.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gk.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Zk(e){let t=e.filter(s=>s.kind==="tool").slice(-Hk),n=new Map;t.forEach((s,i)=>{let o=Qk(s);if(!o)return;let l=n.get(o)||{count:0,last:-1};l.count+=1,l.last=i,n.set(o,l)});let r=null;for(let[s,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:s,count:i.count,last:i.last});return r?r.label:null}function Jk(e){let t=Yk(e);if(t)return{text:t,guess:!1};let n=Xk(e);if(n)return{text:n,guess:!1};let r=Zk(e);return r?{text:r,guess:!0}:null}function ew(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:yn(e,t)}function Hs(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,i=null,o=null,l=null,a=null,u=null,d=!1,f={},_=!0,h=new Set,g=new Set,E=null,y=null,te=!1,J=!1,z=!1,M=null,D=null;function q(){te=!1,J=!1,z=!1,M=null,D=null}async function j(ie){if(n){J=!0,z=!1,B();try{let ee=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ie,...u?{root_dir:u}:{}}));if(i!==ie)return;!ee||typeof ee!="object"||Array.isArray(ee)?z=!0:(M=ee,D=ie)}catch{i===ie&&(z=!0)}finally{i===ie&&(J=!1,B())}}}function X(){if(te=!te,te&&i&&D!==i){j(i);return}B()}function P(){if(!te)return"";let ie=Ws({loading:J,error:z});if(ie)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ie}
      </div>`;if(!M)return"";if(M.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=ja(M.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?c`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?br("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function x(){if(!a||!r)return[];let ie=r.get(a);return Zc(ie?ie.lines:[])}function I(){if(!a||!r)return null;let ie=r.get(a),ee=ie?ie.last_event_at:null;return typeof ee=="number"?ee:null}function O(){return f.status==="running"}function ae(){if(O()&&i){y||(y=setInterval(()=>B(),1e3));return}fe()}function fe(){y&&(clearInterval(y),y=null)}function ye(ie){let ee=[],Te=0;for(;Te<ie.length;){let{idx:ft,line:_t}=ie[Te];if(_t.kind==="tool"){let He=Te;for(;He<ie.length&&ie[He].line.kind==="tool"&&ie[He].line.tool===_t.tool;)He+=1;if(He-Te>=Wk&&!g.has(ft)){ee.push({kind:"group",idx:ft,tool:_t.tool||"",lines:ie.slice(Te,He)}),Te=He;continue}}ee.push({kind:"line",idx:ft,line:_t}),Te+=1}return ee}function Q(ie){let ee=[],Te=new Map;for(let He=0;He<ie.length;He+=1){let mt=ie[He],It=mt.parent_tool_use_id;if(typeof It=="string"&&It.length>0){let St=Te.get(It);St||(St={kind:"subagent",idx:He,launch_id:It,agent_type:null,header:null,lines:[]},Te.set(It,St),ee.push(St)),St.lines.push({idx:He,line:mt});continue}if(mt.kind==="tool"&&mt.tool==="Agent"&&typeof mt.launch_id=="string"&&mt.launch_id.length>0){let St=le(mt),st=Te.get(mt.launch_id);if(st){st.header={idx:He,line:mt},st.agent_type=St;continue}let pt={kind:"subagent",idx:He,launch_id:mt.launch_id,agent_type:St,header:{idx:He,line:mt},lines:[]};Te.set(mt.launch_id,pt),ee.push(pt);continue}ee.push({kind:"entry",idx:He,line:mt})}let ft=[],_t=0;for(;_t<ee.length;){if(ee[_t].kind!=="entry"){ft.push(ee[_t]),_t+=1;continue}let He=_t;for(;He<ee.length&&ee[He].kind==="entry";)He+=1;ft.push(...ye(ee.slice(_t,He))),_t=He}return ft}function le(ie){let ee=ie.input;return ee&&typeof ee.subagent_type=="string"?ee.subagent_type:null}function pe(ie){for(let ee=ie.length-1;ee>=0;ee-=1){let Te=ie[ee];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function Ne(ie){for(let ee=ie.length-1;ee>=0;ee-=1)if(ie[ee].kind==="thinking")return ie[ee];return null}function qe(ie,ee){if(ee.kind==="gate")return c`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return c`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return c`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${hr(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let Te=h.has(ie);return c`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ce(ie)}
      >
        <span class="sv__think-line">💭 ${Qo(ee.text)}</span>
        ${Te?c`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="user"){let Te=h.has(ie);return c`<div
        class="sv__line sv__line--user${Te?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ce(ie)}
      >
        <span class="sv__user-line">▷ ${Qo(ee.text)}</span>
        ${Te?c`<pre class="sv__user-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let Te=h.has(ie),ft=ee.tool==="Bash"?Vk(ee.command):0,_t=ee.tool==="Bash"?ft>1?Qo(ee.command):ee.command:ee.path||ee.command||"";return c`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ce(ie)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${_t?c`<span class="sv__tool-detail">${_t}</span>`:""}
          ${ft>1?c`<span class="sv__tool-more">⋯ ${ft}줄</span>`:""}
          ${typeof ee.added=="number"?c`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?c`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?c`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${Te?c`<pre class="sv__tool-expand">${Pe(ee)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${hr(ee.text||"")}</div>`}function Pe(ie){let ee=[];if(ie.tool==="Bash"&&typeof ie.command=="string"&&ie.command.length>0)ee.push(ie.command);else if(ie.input!==void 0)try{ee.push(`input: ${JSON.stringify(ie.input,null,2)}`)}catch{}return typeof ie.output=="string"&&ie.output.length>0&&ee.push(`output:
${ie.output}`),ee.join(`

`)}function he(){if(!i)return c``;let ie=x(),ee=(o?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Te=f.session_id||"",ft=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,_t=O(),He=_t?ew(I(),Date.now()):"",mt=_t?pe(ie):null,It=_t?Ne(ie):null,St=Jk(ie);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(o?f.role||"":i)}</span
        >
        ${St?c`<span
              class="sv__stage${St.guess?" sv__stage--guess":""}"
              title=${St.text}
              >${St.text}</span
            >`:""}
        ${_t?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${Te?c`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>ne(Te)}
            >
              ⧉ ${Te.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ne(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ee?c`<span class="sv__meta">${ee}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${o||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${te?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${te?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${X}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${ft}
          @click=${K}
        >
          <span class="sv__follow-full">⇣ ${ft}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>je()}
        >
          ✕
        </button>
      </div>
      ${o||d?"":P()}
      <div class="sv__body">
        ${ie.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Q(ie).map(st=>st.kind==="subagent"?ue(st):st.kind==="group"?U(st):qe(st.idx,st.line))}
      </div>
      ${mt||It?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${mt?c`<span class="sv__now-icon">${mt.icon}</span>
                  <span class="sv__now-name">${mt.tool}</span>
                  <span class="sv__now-detail"
                    >${mt.tool==="Bash"?Qo(mt.command):mt.path||mt.command||""}</span
                  >`:""}
            ${It?c`<span class="sv__now-think"
                  >💭 ${Qo(It.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function U(ie){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(ie.idx)}
    >
      <span class="sv__group-icon">${ie.lines[0].line.icon}</span>
      <span class="sv__group-name">${ie.tool}</span>
      <span class="sv__group-count">${ie.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ue(ie){let ee=g.has(ie.idx),Te=ie.header?ie.header.line:null,ft=Te?Te.is_error===!0?"\u2717":typeof Te.result=="string"?"\u2713":"\u27F3":"",_t=Te&&Te.command?Te.command:"";return c`<div class="sv__sub${ee?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(ie.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ie.agent_type||"subagent"}</span>
        ${_t?c`<span class="sv__sub-detail">${_t}</span>`:""}
        <span class="sv__sub-count">${ie.lines.length}줄</span>
        ${ft?c`<span class="sv__sub-state">${ft}</span>`:""}
        ${ee?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ee?c`<div class="sv__sub-body">
            ${ye(ie.lines).map(He=>He.kind==="group"?U(He):qe(He.idx,He.line))}
          </div>`:""}
    </div>`}function _e(ie){g.add(ie),B()}function B(){ut(he(),e),ae(),_&&W()}function W(){let ie=e.querySelector(".sv__body");ie&&(ie.scrollTop=ie.scrollHeight)}function Ce(ie){h.has(ie)?h.delete(ie):h.add(ie),B()}function K(){_=!_,B()}function ne(ie){vn(ie).then(ee=>{ee?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(ie){!i||!ie||(f={...f,...ie},B())}function ce(ie){let ee=ie.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&_&&(_=!1,B())}e.addEventListener("scroll",ce,!0);function Re(ie){let ee=ie.target;!ee||typeof ee.closest!="function"||e.contains(ee)||ee.closest("dialog")||ee.closest(".md-viewer-root")||je()}let Z=!1;function Oe(){Z||(document.addEventListener("mousedown",Re),Z=!0)}function Me(){Z&&(document.removeEventListener("mousedown",Re),Z=!1)}function Je(ie){let ee=ie&&ie.attempt_id;if(!ee)return;let Te=typeof ie.launch_id=="string"&&ie.launch_id.length>0?ie.launch_id:null,ft=ie.session_ref&&typeof ie.session_ref=="object"?ie.session_ref:null;if(Te&&ft)return;let _t=a;i=ee,o=Te,l=ft,a=o?`session-log:${i}:${o}`:`session-log:${i}`,n&&_t&&_t!==a&&Promise.resolve(n("unsubscribe-session-log",{id:_t})).catch(()=>{}),u=typeof ie.root_dir=="string"&&ie.root_dir.length>0?ie.root_dir:null,f=ie.meta||{},d=ie.hide_prompt===!0,_=!0,h.clear(),g.clear(),q(),!E&&r&&(E=r.subscribe(B)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...o?{launch_id:o}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Oe(),B()}function je(){let ie=a;Me(),i=null,o=null,l=null,a=null,u=null,d=!1,h.clear(),g.clear(),q(),fe(),n&&ie&&Promise.resolve(n("unsubscribe-session-log",{id:ie})).catch(()=>{}),ut(c``,e),s&&s()}return{open:Je,updateMeta:se,close:je,isOpen(){return i!==null},destroy(){fe(),Me(),E&&(E(),E=null),e.removeEventListener("scroll",ce,!0),i=null,o=null,l=null,a=null,u=null,d=!1,ut(c``,e)}}}function tw(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let s=n?.plan?.doc;return s&&t.push({kind:"plan",path:s.path,missing_state:s.missing_state}),t}function D_(e,t){let n=tw(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var nw="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",rw=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,sw=/^\*\*결론\*\* — (.+)$/;function Fa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==nw)return null;let n=rw.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],i=n[3],o=2;for(;o<t.length&&t[o].trim().length===0;)o+=1;let l=o<t.length?sw.exec(t[o]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?o+1:o;return{lane:r,identifier:s,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var ow=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,iw=/^VERDICT: (APPROVE|REVISE)$/,aw=/^anchor: ([0-9a-fA-F]+)$/,lw=/^[0-9]+\. /,cw="- \uC9C0\uC801 \uC5C6\uC74C",uw={spec:40,impl:40,plan:12};function P_(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=ow.exec(t[0]||"");if(!n)return null;let r=iw.exec(t[1]||""),s=aw.exec(t[2]||"");if(!r||!s)return null;let i=n[1],o=s[1];if(o.length!==uw[i])return null;let l=t.slice(3),a=0,u=!1;for(let d of l)lw.test(d)?a+=1:d.trim()===cw&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:o,points:a>0?a:u?0:null,body:l.join(`
`).trim()}}var M_=20;function Jc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${i}`}function dw(e){return e.length>M_?`${e.slice(0,M_)}\u2026`:e}function pw(e,t,n,r){let s=`${t.lane} ${dw(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${Jc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${hr(t.body)}
        </div>`:""}
  </div>`}var q_=12;function fw(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function _w(e,t,n,r){let s=t.anchor.length>q_?`${t.anchor.slice(0,q_)}\u2026`:t.anchor,i=fw(t);return c`<div class="detail-report detail-report--review">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🔎</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">리뷰 결과</span>
        <span class="detail-report__lane"
          >${t.step} · r${t.round}</span
        >
        <span class="detail-report__anchor" title=${t.anchor}
          >${s}</span
        >
        <span class="detail-report__time"
          >${Jc(e.created_at)}</span
        >
      </span>
      <span class="detail-report__concl">
        <span
          class="detail-report__verdict detail-report__verdict--${t.verdict==="APPROVE"?"approve":"revise"}"
          >${t.verdict}</span
        >${i?c`<span class="detail-report__points">${i}</span>`:""}
      </span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${hr(t.body)}
        </div>`:""}
  </div>`}function mw(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Jc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${hr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function j_(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",o=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=typeof a.text=="string"?a.text:"",d=Fa(u);if(d)return pw(a,d,t,s.has(a.id));let f=P_(u);return f?_w(a,f,t,s.has(a.id)):mw(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${o}
        .value=${i}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${o||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:LT}=Tu;var F_=e=>e.strings===void 0;var gw={},B_=(e,t=gw)=>e._$AH=t;var Or=Oa(class extends Us{constructor(e){if(super(e),e.type!==mr.PROPERTY&&e.type!==mr.ATTRIBUTE&&e.type!==mr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!F_(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Pn||t===Qt)return t;let n=e.element,r=e.name;if(e.type===mr.PROPERTY){if(t===n[r])return Pn}else if(e.type===mr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Pn}else if(e.type===mr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Pn;return B_(e),t}});var hw=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],eu={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},U_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},bw={pin:"pin",global:"global",base:"base"};function yw(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${bw[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function vw(e,t,n){switch(e){case"workflow_mode":return po;case"spec_review_model":case"impl_review_model":return fo;case"plan_review_model":return Mi;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return qi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Jn;case"impl_dispatch":return uo;case"impl_runtime":return Pi;case"impl_model":return Ts(n,t.impl_runtime);case"impl_effort":return zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Jn;case"orchestration_model":return Rs(n,null);case"orchestration_effort":return zr(n,void 0,t.orchestration_model||En).filter(r=>r!==En);default:return[]}}function kw(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${yw(e.source)}
    <span class="detail-effective__k"
      >${er[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Fi[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${er[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function W_(e,t){let n=Bl.flatMap(a=>a.keys),r=Ul(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ip(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),o=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${ww(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Bl.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Li({key:u.key,choices:vw(u.key,o,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return kw(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Or(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            <span class="detail-effective__hint"
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function ww(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function $w(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function H_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},i=r.route||n.route||null,o=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=$w(r.exec_receipt),u=a?ir(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=Ai(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,h=typeof _=="number"?`PR #${_}`:"PR",g=ho(n),E=g!==null&&t.isChipOpen?.("rec")===!0,y=E?tc({rec:g},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${i?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${i}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >${h}</a
          >`:""}
      ${f?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${g?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${g.state}
            aria-expanded=${E?"true":"false"}
            title=${Hi(g)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${y?Ls(y):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${xw(i).map(te=>Aw(te,n,s,{label:te.id==="pr"?h:te.label,href:te.id==="pr"?o:""}))}
    </div>
  </section>`}function xw(e){let n=typeof e=="string"&&Object.hasOwn(eu,e)&&eu[e]||eu.spec_backed;return hw.filter(r=>n.includes(r.id))}var Ba={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Aw(e,t,n,r){let s=Sw(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,o=typeof i?.fill=="string"?i.fill:null,l=o?o==="full":s.length>0,a=!l&&o==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",f=u?Ba.stale:l?Ba.on:a?Ba.current:Ba.none,_=Tw(e,n),h=`${r.label} \xB7 ${f}${_?` \xB7 ${_}`:""}${s?` \xB7 ${s}`:""}`,g=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,E=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${g}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${h}
      >${E}</a
    >`:c`<span
    class=${g}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${E}</span
  >`}function Sw(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}var Ew="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function Tw(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state,r=typeof n=="string"&&Object.hasOwn(U_,n)?U_[n]:"";return t.plan?.review_state!=="incomplete"?r:[Ew,r].filter(Boolean).join(" \xB7 ")}function Ua(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function z_(e){return Ua(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function K_(e,t){let n=e&&e[t];if(!Ua(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(z_),s=z_(n.active)?n.active:null;return{accounts:r,active:s||r.find(i=>i.active===!0)||null}}function Y_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Wa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Y_(e)}${t}`}function zs(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Y_(e)}`}function Rw(e,t,n){if(n!==null){let s=e==="claude"?Wa:zs,i=t?t.accounts.find(o=>o.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?s(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zs({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function G_(e,t){if(!Ua(e)||e.state!=="usable"||!Ua(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function V_(e){let t=e.provider_key==="claude"?Wa:zs,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Rw(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function X_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${V_({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:K_(t,"claude"),selected:s,workspace_default:G_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${V_({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:K_(t,"codex"),selected:i,workspace_default:G_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Cw(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ow(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ha(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,i="loading",o="",l=null,a="";function u(E){E.key==="Escape"&&s&&(E.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Cw(s)}</span
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
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${hr(o)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){ut(d(),e)}async function _(E,y={}){s=E,i="loading",o="",l=null,a="",f();let te=y.workspace||(n?n():"");if(!te){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let J="/api/doc?workspace="+encodeURIComponent(te)+"&path="+encodeURIComponent(E);try{let z=await r(J),M=await z.json().catch(()=>({}));if(!z.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&y.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||z.status)+")",f();return}let D=Ow(String(M.content||""));l=D.front,o=D.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,ut(c``,e)}function g(){document.removeEventListener("keydown",u),h()}return{open:_,close:h,destroy:g}}function J_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in Tl))return"";let n=Tl[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=ws({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var Iw=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],em="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",za=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Lw=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Q_(e){return typeof e=="string"&&Lw.has(e)}var Nw=["running","done","failed","interrupted"],ru={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Dw(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Pw(e){let t=fn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=xs(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${em}
          >부분 집계</span
        >`:""}`}function Z_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ka(e){if(typeof e=="number")return Ks(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ks(t):""}function tm(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function nm(e,t,n){if(e.provider!=="claude"){let s=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${s}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function rm(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function tu(e){return e===null||typeof e=="string"&&e.trim().length>0}function nu(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Mw(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!za.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?tu(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||tu(t.effort))||!(!("agent_type"in t)||tu(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Nw.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!nu(t.started_at)||!nu(t.last_event_at)||!nu(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function qw(e,t,n,r){let i=fn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],o=nm({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${o.title}
      >${o.text}</span
    >
    ${rm(o.thread)}
    ${Ka(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ka(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${J_(n)}
  </div>`}function jw(e,t,n,r,s){let i=e.status==="running"?null:t,l=(i?fn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ks(e.last_event_at):i?Ka(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,tm(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=nm(e,i,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ru[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${rm(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}${J_(i)}
  </button>`}function Fw(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}var Bw="\uC804\uCCB4 \uD569\uACC4\uC5D0 \uBCC4\uB3C4 \uAC00\uC0B0\uD558\uC9C0 \uC54A\uC74C";function Uw(e){if(!e||typeof e!="object")return null;let t={},n=[["input_tokens","input_tokens","\uC785\uB825"],["output_tokens","output_tokens","\uCD9C\uB825"],["cached_input_tokens","cache_read_input_tokens","\uCE90\uC2DC\uC77D\uAE30"],["cache_write_input_tokens","cache_creation_input_tokens","\uCE90\uC2DC\uC4F0\uAE30"],["reasoning_output_tokens","reasoning_output_tokens","\uCD94\uB860\uCD9C\uB825"]],r=[],s=0,i=0;for(let[u,d,f]of n){let _=e[u];typeof _=="number"&&Number.isFinite(_)&&(t[d]=_,r.push(`${f} ${_.toLocaleString("en-US")}`),i+=1,(d==="input_tokens"||d==="output_tokens")&&(s+=_))}let o=e.total_tokens,l=typeof o=="number"&&Number.isFinite(o)?o:null;if(i===0)return l===null?null:{subtotal:l,breakdown:{total_tokens:l},lines:[`\uCD1D ${l.toLocaleString("en-US")}`,"\uC138\uBD80 \uB0B4\uC5ED \uBBF8\uAD00\uCE21"]};let a=[...r];return l!==null&&a.unshift(`\uCD1D ${l.toLocaleString("en-US")}`),{subtotal:l??s,breakdown:t,lines:a}}function Ww(e){let t=Uw(e.usage),r=(t?fn({providers:{codex:{subtotal:t.subtotal,breakdown:t.breakdown}},roles:{}}):[])[0],s=typeof e.status=="string"&&e.status in ru?e.status:"running",i=typeof e.thread_id=="string"?e.thread_id:"",o=s==="running"?Ks(e.last_event_at):Ka(e.completed_at),l=["codex",e.agent_path,tm(e.model),e.effort].filter(Boolean).join(" \xB7 ");return c`<div
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${s}"
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ru[s]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >native child</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.launch_id||i}
      >${i.slice(0,8)}</span
    >
    ${o?c`<span class="detail-session__leg-time detail-session__time"
          >${o}</span
        >`:""}
    ${r&&t?c`<span
          class="detail-session__usage"
          title=${[...t.lines,Bw].join(`
`)}
          >${r.label}</span
        >`:""}
  </div>`}function Hw(e){let t=Array.isArray(e.codex_children)?e.codex_children:[],n=new Set,r=[];for(let s of t)!s||typeof s!="object"||typeof s.thread_id!="string"||s.thread_id.length===0||n.has(s.thread_id)||(n.add(s.thread_id),r.push(Ww(s)));return r}function zw(e,t,n){let r=[],s=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let _=Mw(f);!_||s.has(_.launch_id)||Q_(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((f,_)=>(f.started_at||0)-(_.started_at||0));let o={};for(let{role:f,provider:_}of za){let h=t?t.roles[f]?.[_]:null;o[f]=h?[...h.legs]:[]}let l=za.flatMap(({role:f})=>o[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:_}of za){for(let h of r.filter(g=>g.role===f&&g.provider===_)){let g=l.find(y=>y.receipt_id===h.launch_id)||null;if(g&&!Fw(h,g))continue;g&&a.add(g.receipt_id);let E=_==="codex"&&u.has(h.session_id);d.push(jw(h,g,e.attempt_id,n,E)),_==="codex"&&u.add(h.session_id)}for(let h of o[f])if(!a.has(h.receipt_id)&&!Q_(h.agent_type)){let g=typeof h.session_id=="string"&&h.session_id.length>0?h.session_id:null,E=_==="codex"&&g!==null&&u.has(g);d.push(qw(f,_,h,E)),_==="codex"&&g!==null&&u.add(g)}}return d}function Kw(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Iw,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Dw(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${em}</span>`:""}
  </div>`}var Gw={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ks(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Vw(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Yw={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Xw(e,t){let n=Yw[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${kc(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Lo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ks(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function sm(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],o=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,E)=>E.index-g.index)],l=o.map(g=>Xw(g,t)),a=n.expanded||new Set,u=n.catalog||null;if(s.length===0&&o.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let g of s)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&d.add(g.resumed_from);let f=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let y=typeof g.session_id=="string"&&g.session_id.length>0,te=d.has(g.attempt_id),J=y&&!te,z=y?te?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!J}
      title=${z}
      @click=${M=>{M.stopPropagation(),J&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let y=g.cause_detail,te=y&&typeof y.reason=="string"&&y.reason.length>0?typeof y.command=="string"&&y.command.length>0?`${y.reason} \xB7 ${y.command}`:y.reason:g.cause;return c`<div class="detail-session__cause" title=${te}>
      ${g.cause}
    </div>`},h=g=>{let E=Z_(Ol(g,u));if(fn(E).length===0&&!xs(g.usage))return"";let y=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${y?"true":"false"}
      title=${y?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${te=>{te.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Pw(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${s.map(g=>{let E=Ol(g,u),y=Z_(E),te=fn(y);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Gw[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${mo(g)?c`<span
                  class="detail-session__resumed"
                  title=${mo(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${On(g)}</span>
            ${te.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${te.length>0?te.map(J=>c`<span
                      class="detail-session__usage"
                      title=${J.tooltip}
                      >${J.label}</span
                    >`):xs(g.usage)?c`<span class="detail-session__usage"
                    >${xs(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ks(g.started_at)}</span>
          </button>
          ${h(g)} ${f(g)} ${_(g)} ${Vw(g)}
          ${a.has(g.attempt_id)&&g.usage?Kw(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${zw(g,E,t)} ${Hw(g)}
        </div>`})}
    </div>
  `}function om(e,t={}){return c`
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
    ${e.expanded?c`<div class="detail-prompt" data-seam="task-prompt">
          ${Qw(e)}
        </div>`:""}
  `}function Qw(e){let t=Ws(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?br("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ja(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?br("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var os=10;function im(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function am(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let s=typeof e.shown=="number"&&e.shown>0?e.shown:os,i=r.slice(0,s),o=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${im(l.at)?c`<span class="detail-timeline__at"
                  >${im(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${o>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${o})
        </button>`:""}
  `}var Zw=["open","in_progress","deferred","resolved","closed"],Jw=[0,1,2,3,4];function lm(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,i=t.onNavigate,o=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},_="",h=!1,g=[],E=!1,y=!1,te={},J={claude:null,codex:null},z=null,M=null,D=0,q=!1,j=!1,X="",P="",x="",I="",O=!1;function ae(){q=!1,j=!1,X="",P="",x="",I="",O=!1}function fe(){J={claude:null,codex:null},z=null,M=null,D+=1}async function ye(){if(!s)return null;try{let k=await Promise.resolve(s("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function Q(k){try{let F=await fetch(k);if(!F.ok)return null;let H=await F.json();if(!H||typeof H!="object"||!Array.isArray(H.accounts))return null;let Se=H.accounts.filter(Ze=>Ze!==null&&typeof Ze=="object"&&!Array.isArray(Ze));return{accounts:Se,active:Se.find(Ze=>Ze.active===!0)||null}}catch{return null}}async function le(k){M=k;let F=++D,[H,Se,Ze]=await Promise.all([Q("/api/claude-usage"),Q("/api/codex-usage"),ye()]);F!==D||k!==u||(J={claude:H,codex:Se},z=Ze,ct())}let pe=[],Ne=null,qe=null,Pe=!1,he="",U=!1,ue=0,_e=new Set;function B(){pe=[],Ne=null,qe=null,Pe=!1,he="",U=!1,ue+=1,_e.clear()}async function W(k){if(!s)return;let F=++ue;try{let H=await Promise.resolve(s("get-comments",{id:k}));if(F!==ue||k!==u)return;pe=Array.isArray(H)?H:[],Pe=!1}catch{if(F!==ue||k!==u)return;Pe=!0}ct()}function Ce(){if(!s||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ne!==u){Ne=u,qe=k,W(u);return}k!==null&&k!==qe&&(qe=k,W(u))}function K(k){_e.has(k)?_e.delete(k):_e.add(k),ct()}function ne(k){let F=he.trim().length===0;he=k,F!==(k.trim().length===0)&&ct()}async function se(){let k=he.trim();if(!s||!u||k.length===0||U)return;let F=u;U=!0,ct();let H=!1;try{let Se=await Promise.resolve(s("add-comment",{id:F,text:k}));Array.isArray(Se)&&Se.length>0&&(H=!0,F===u&&(pe=Se,Pe=!1,he="",qe=Se.length))}catch{H=!1}H||ve("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),F===u&&(U=!1),ct()}let ce={onToggle:K,onDraftInput:ne,onSubmit:se},Re=t.mdViewer||null,Z=null;Re||(Z=document.createElement("div"),Z.className="md-viewer-root",document.body.appendChild(Z));let Oe=Re||Ha(Z,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let Je=Hs(Me,{transport:s?(k,F)=>Promise.resolve(s(k,F)):void 0,sessionLogStore:a}),je=!1,ie=!1,ee=!1,Te=null,ft=null,_t=0;function He(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function mt(){je=!1,ie=!1,ee=!1,Te=null,ft=null,_t+=1}async function It(k){if(!s)return;let F=++_t;ie=!0,ee=!1,ct();try{let H=await Promise.resolve(s("get-bead-prompt",{bead_id:k}));if(F!==_t)return;!H||typeof H!="object"||Array.isArray(H)?ee=!0:(Te=H,ft=He(k))}catch{F===_t&&(ee=!0)}finally{F===_t&&(ie=!1,ct())}}let St=[],st=null,pt=0;function Jt(k,F){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${F}`}function Mt(){St=[],st=null,pt+=1}async function Zt(k,F){if(!s)return;let H=++pt,Se;try{Se=await Promise.resolve(s("get-session-refs",{bead_id:k}))}catch{Se=null}H!==pt||F!==st||(St=Se&&Array.isArray(Se.sessions)?Se.sessions:[],ct())}function v(){if(!s||!u)return;let k=d&&d.metadata,F=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(F===null){Mt();return}let H=Jt(u,F);st!==H&&(St=[],st=H,Zt(u,H))}let G=[],De=[],Ie=os,Fe=null,ze=0;function oe(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function be(){G=[],De=[],Ie=os,Fe=null,ze+=1}async function Qe(k,F){if(!s)return;let H=++ze,Se;try{Se=await Promise.resolve(s("get-bead-timeline",{bead_id:k}))}catch{Se=null}H!==ze||F!==Fe||(G=Se&&Array.isArray(Se.events)?Se.events:[],De=Se&&Array.isArray(Se.attempts)?Se.attempts:[],Ie=os,ct())}function at(){if(!s||!u)return;let k=oe(u);Fe!==k&&(G=[],De=[],Ie=os,Fe=k,Qe(u,k))}function et(){Ie+=os,ct()}function ht(){if(je=!je,je&&u&&ft!==He(u)){Te=null,It(u);return}ct()}function bt(){let k={};for(let H of De)H&&typeof H=="object"&&H.bead_id===u&&(k[String(H.attempt_id)]=H);let F=o?o.get():null;for(let H of F&&F.attempts?Object.values(F.attempts):[]){let Se=H;Se&&Se.bead_id===u&&(k[String(Se.attempt_id)]=Se)}return k}function rt(){return u?Object.values(bt()).sort((F,H)=>(H.started_at||0)-(F.started_at||0)).map(F=>({attempt_id:F.attempt_id,bead_id:F.bead_id,status:F.status,started_at:typeof F.started_at=="number"?F.started_at:null,runner:F.runner||null,model:F.model||null,effort:F.effort||F.observed_effort||null,speed:F.speed||null,session_id:F.session_id||null,resumed_from:F.resumed_from||null,continuation_mode:F.continuation_mode||null,dismissed_at:typeof F.dismissed_at=="number"?F.dismissed_at:null,cause:typeof F.cause=="string"?F.cause:null,cause_detail:F.cause_detail||null,exec_default_preset_id:typeof F.exec_default_preset_id=="string"?F.exec_default_preset_id:null,exec_default_preset_revision:typeof F.exec_default_preset_revision=="number"?F.exec_default_preset_revision:null,exec_values:F.exec_values&&typeof F.exec_values=="object"?F.exec_values:null,usage:F.usage||null,usage_legs:Array.isArray(F.usage_legs)?F.usage_legs:[],delegation_sessions:Array.isArray(F.delegation_sessions)?F.delegation_sessions:[],codex_children:Array.isArray(F.codex_children)?F.codex_children:[]})):[]}function Ke(){return u?lr(bt(),u,kt()):null}let T=new Set;function V(k){T.has(k)?T.delete(k):T.add(k),ct()}function Y(k){let F=o?o.get():null,H=F&&F.attempts?F.attempts[k]:null;Je.open({attempt_id:k,meta:H?{runner:H.runner||void 0,model:H.model||void 0,effort:H.effort||void 0,status:H.status||void 0,session_id:H.session_id||void 0}:{}})}function Ae(k,F){let H=o?o.get():null,Se=H&&H.attempts?H.attempts[k]:null,dt=(Se&&Array.isArray(Se.delegation_sessions)?Se.delegation_sessions:[]).find(Wt=>Wt&&typeof Wt=="object"&&Wt.launch_id===F);dt&&Je.open({attempt_id:k,launch_id:F,meta:{runner:dt.provider==="claude"?"claude":"codex",role:dt.role,...typeof dt.agent_type=="string"?{agent_type:dt.agent_type}:{},model:dt.model,effort:dt.effort,session_id:dt.session_id,status:dt.status}})}async function xe(k){if(!s||!k)return;let F=s,H=()=>{let Ze=o?o.get():null;return Ze&&typeof Ze.revision=="number"?Ze.revision:0},Se=o?.get()?.attempts?.[k]||null;await js({context:{bead_id:Se?.bead_id||u||"",kind:"session",tuple:Se?On(Se):""},transport:Ze=>F("worker-attempt-resume",{attempt_id:k,expected_revision:H(),...Ze}),adopt:Ze=>{Ze?.queue&&o?.set&&o.set(Ze.queue)}})}async function yt(k,F){if(!s||!k)return;let H=s,Se=()=>{let me=o?o.get():null;return{bead_id:k,...F==="parallel"?{}:{lane:F},expected_revision:me&&typeof me.revision=="number"?me.revision:0}},Ze=me=>{me?.queue&&o?.set&&o.set(me.queue)},dt=await Promise.resolve(H("worker-queue-place",Se()));if(Ze(dt),dt&&dt.conflict&&(dt=await Promise.resolve(H("worker-queue-place",Se())),Ze(dt)),ct(),!dt)return;if(dt.applied===!1&&typeof dt.admission_reason=="string"){ve(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${dt.admission_reason}`,"error",2400);return}if(dt.reason==="rejected"){ve("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(dt.applied===!1)return;let Wt=dt.queue?ko({id:k},dt.queue).location:null;Wt&&"index"in Wt&&ve(`${Ap(Wt.lane)} \uB300\uAE30 #${Wt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function xt(k,F){if(F){y=!0,ct();return}yt(k,"parallel")}function vt(k,F){let Ze=(k.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ze&&(Ze!=="parallel"&&!/^s[1-5]$/.test(Ze)||(y=!1,ct(),yt(F,Ze)))}function Lt(k){!k||!u||Je.open(Fs(k,u,d&&d.status))}let qt={onOpen:Y,onOpenDelegation:Ae,onResume:xe,onToggleUsage:V,onOpenSessionRef:Lt,onCopyResumeCommand:Bt};function Gt(){let k=o?o.get():null,F={...te};for(let H of[...Un,...Ss]){let Se=k&&k[H];typeof Se=="string"&&(F[H]=Se)}return F}async function rn(){if(s){try{let k=await Promise.resolve(s("get-session-defaults",{}));te=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{te={}}ct()}}function kt(){let k=o?o.get():null;return k&&k.runner_catalog||null}function en(){let k=o?o.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function un(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},H=Cn({pin:{...k,...f},global:Gt(),execution_defaults:en(),runner_catalog:kt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return Wn(kt(),H)}function Ut(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Vt(k){return k?.compatible===!1}function Xt(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function Ve(){let k=Ut(),F=k?.presets.find(H=>H.id===_);if(!(!s||!u||!k||!F||Vt(F)||h)){h=!0,g=[],ct();try{let H=await Promise.resolve(s("apply-impl-preset",lp(u,F.id,k.revision)));if(H&&H.conflict){Xt(H),ve("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Se=H&&Array.isArray(H.issue)?H.issue[0]:H?.issue;if(H&&H.applied&&Se&&typeof Se=="object"){d=Se,g=Array.isArray(H.skipped_orchestration_keys)?H.skipped_orchestration_keys.filter(Ze=>typeof Ze=="string"):[];for(let Ze of cp)delete f[Ze];ve(g.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}H&&H.error==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(H){H&&typeof H=="object"&&H.code==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,ct()}}}let N=null;n&&n.subscribe&&(N=n.subscribe(k=>{!u||k!==`detail:${u}`||lt()}));let $e=null;o&&typeof o.subscribe=="function"&&($e=o.subscribe(()=>{u&&ct()}));let Ue=null,wt=null;function tt(){wt&&(wt(),wt=null)}l&&typeof l.subscribe=="function"&&(Ue=l.subscribe(()=>{u&&ct()}));function Et(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",Et);let Tt=Is(()=>ct());Tt.attach();function lt(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(H=>H&&H.id===u)||k[0]||d}Ce(),v(),at(),ct()}}function Bt(k){vn(k).then(F=>{F?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function An(k){k.preventDefault(),k.stopPropagation(),u&&Bt(u)}function $t(k,F){k.preventDefault(),k.stopPropagation(),Bt(F)}function bn(k,F,H){k.preventDefault(),k.stopPropagation(),Oe.open(F,{missing_state:H})}async function _n(k,F){let H=Object.hasOwn(f,k),Se=f[k];if(f[k]=F,ct(),!(!s||!u))try{let Ze=await Promise.resolve(s("update-exec-settings",ap(u,k,F.length===0?null:F))),dt=Array.isArray(Ze)?Ze[0]:Ze;if(!dt||typeof dt!="object"||!dt.id)throw new Error("exec settings readback failed");d=dt,delete f[k],ct()}catch(Ze){throw H?f[k]=Se:delete f[k],ct(),ve("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ze}}function mn(k){k.catch(()=>{})}async function nt(k,F){let H=d||{},Se=H.metadata&&typeof H.metadata=="object"?H.metadata:{},Ze={};for(let me of["impl_runtime","impl_model","impl_effort"])Ze[me]=Object.hasOwn(f,me)?f[me]:typeof Se[me]=="string"?Se[me]:"";Ze[k]=F;let dt=pp(Ze,kt(),un()),Wt={};for(let me of["impl_runtime","impl_model","impl_effort"])Wt[me]=f[me],f[me]=dt[me]||"";if(ct(),!(!s||!u))return Promise.resolve(s("update-impl-target",{id:u,...dt,orchestration_runtime:un()})).then(me=>{let We=Array.isArray(me)?me[0]:me;if(!We||typeof We!="object"||!We.id)throw new Error("implementation target readback failed");d=We;for(let Ct of["impl_runtime","impl_model","impl_effort"])delete f[Ct];ct()}).catch(me=>{for(let We of["impl_runtime","impl_model","impl_effort"])Wt[We]===void 0?delete f[We]:f[We]=Wt[We];throw ct(),ve("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),me})}async function A(k,F,H){if(!s||!u)return!1;try{let Se=await Promise.resolve(s(k,F)),Ze=Array.isArray(Se)?Se[0]:Se;return Ze&&typeof Ze=="object"&&Ze.id?(d=Ze,!0):(ve(H,"error"),!1)}catch(Se){return Se&&typeof Se=="object"&&Se.code==="bd_readback_failed"?(ve("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ve(p(H,Se),"error"),!1)}}function p(k,F){let H=F&&typeof F=="object"&&typeof F.message=="string"?F.message.trim():"";return H.length>0?`${k} \u2014 ${H}`:k}function m(k){setTimeout(()=>{try{let F=e.querySelector(k);F&&typeof F.focus=="function"&&F.focus()}catch{}},0)}function S(){q=!0,X=d&&d.title||"",ct(),m('.detail-edit__input[data-edit="title"]')}function C(k){X=k.target.value}function re(){q=!1,X="",ct()}function ge(){A("edit-text",{id:u,field:"title",value:X},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F===!0&&(q=!1,X=""),ct()})}function we(){j=!0,P=d&&d.description||"",ct(),m('.detail-edit__textarea[data-edit="description"]')}function Ee(k){P=k.target.value}function w(){j=!1,P="",ct()}function R(){A("edit-text",{id:u,field:"description",value:P},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F===!0&&(j=!1,P=""),ct()})}function Le(k,F,H,Se){if(k.key==="Escape"){k.stopPropagation(),H();return}k.key==="Enter"&&(!Se||k.ctrlKey||k.metaKey)&&(k.preventDefault(),F())}function Be(k){let F=k.target.value;A("update-status",{id:u,status:F},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ct())}function ot(k){let F=Number(k.target.value);A("update-priority",{id:u,priority:F},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ct())}function gt(k){x=k.target.value}function Rt(){let k=x.trim();k.length!==0&&A("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(F=>{F===!0&&(x=""),ct()})}function Dt(k){if(k.key==="Escape"){k.stopPropagation(),x="",ct();return}k.key==="Enter"&&(k.preventDefault(),Rt())}function ls(k){A("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ct())}let $={onCopyPath:$t,onOpenDoc:bn};function b(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function L(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function de(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function ke(k,F){let H=Ge(F),Se=[];return k.length>0&&Se.push(k),H&&Se.push(H),Se.length>0?Se.join(`
`):void 0}function Ge(k){if(!k||typeof k!="object")return;let F=typeof k.status=="string"?k.status:"",H=typeof k.title=="string"?k.title:"";return F.length>0&&H.length>0?`${F} \xB7 ${H}`:void 0}function it(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function tn(){return t.depCandidates?t.depCandidates():null}async function gn(k,F,H){let Se=it(),Ze=u;if(!Ze)return;if(Se.length===0){ve("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let dt=await A(k,{a:Ze,b:F,view_id:Ze,root_dir:Se},H),Wt=dt===!0||dt!==!1&&dt.saved===!0;Wt&&t.onDepChanged&&t.onDepChanged({type:k,a:Ze,b:F}),k==="dep-add"&&Wt&&(I="",O=!1),ct()}function zt(k){if(!u)return;let F=globalThis.confirm;typeof F=="function"&&!F(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||gn("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Nn(k){k.disabled||Dn(k.bead_id)}function Dn(k){gn("dep-add",k,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Nr(k,F){let H=I.trim();return!Vf(H)||H===u||F.includes(H)||k.some(Se=>Se.bead_id===H)?null:H}function Vn(k){I=k.target.value,O=!0,ct()}function sr(){O||(O=!0,ct())}function pn(k,F,H){if(k.key==="Escape"){k.stopPropagation(),I="",O=!1,ct();return}k.key==="Enter"&&(k.preventDefault(),F.length===1&&!F[0].disabled?Nn(F[0]):H!==null&&Dn(H))}function yr(k,F){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${I}
        @focus=${sr}
        @input=${Vn}
        @keydown=${H=>pn(H,k,F)}
      />
      ${O||I.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0&&F===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(H=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${H.bead_id}
                      ?disabled=${H.disabled}
                      title=${an(H.reason)}
                      @click=${()=>Nn(H)}
                    >
                      <span class="detail-dep-add__repo"
                        >${H.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${H.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${H.title}</span
                      >
                    </button>`)}
            ${F===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${F}
                  data-dep-direct="1"
                  @click=${()=>Dn(F)}
                >
                  <span class="detail-dep-add__id">${F}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function cs(k,F){let H=F.get(k.id),Se=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${an(k.title)}
          @click=${()=>H===void 0?i(k.id):i(k.id,H)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${an(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${i?" detail-dep--link":""}`}
      >${Se}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>zt(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Dr(k){let F=Array.isArray(k.dependencies)?k.dependencies:[],H=Array.isArray(k.dependents)?k.dependents:[],Se=[];for(let We of F){let Ct=b(We);Ct.length>0&&L(We)==="blocks"&&Se.push({id:Ct,label:`\u26D3 ${Ct}`,kind:"pred",title:ke("\uB9C9\uB294",We)})}for(let We of H){let Ct=b(We);Ct.length>0&&L(We)==="blocks"&&Se.push({id:Ct,label:`\u2192 ${Ct}`,kind:"succ",title:ke("\uB9C9\uD788\uB294",We)})}for(let We of F){let Ct=b(We),us=L(We);if(Ct.length>0&&us!=="blocks"){let sn=de(us);Se.push({id:Ct,label:`${sn.glyph}${Ct}`,kind:"other",title:ke(sn.relation,We)})}}let Ze=tn(),dt=new Map;if(Ze)for(let We of Ze.issues)dt.has(We.bead_id)||dt.set(We.bead_id,We.root_dir);let Wt=Ze&&u?Gf(Kf(u,Ze),I):[],me=Nr(Wt,Se.filter(We=>We.kind==="pred").map(We=>We.id));return c`
      <div class="detail-section-label">의존성</div>
      ${Se.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Se.map(We=>cs(We,dt))}
          </div>`}
      ${Ze===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:yr(Wt,me)}
    `}function vr(k){let F=k.metadata||{},H=k.workflow||{},Se=H.stages||{},Ze=Se.spec&&Se.spec.stale,dt=Se.impl&&Se.impl.stale,Wt=H.quick_fix_review?.state==="stale",me=Se.plan||null,We=H.route_source==="derived",Ct=H.route||F.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${We?" detail-kv__v--derived":""}"
          title=${We?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${We?"unset":Ct}</span
        >
      </div>
      ${H.route!=="quick_fix"||Object.hasOwn(F,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${F.spec_review||"\uC5C6\uC74C"}${Ze?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v"
                >${me?.receipt||"\uC5C6\uC74C"}${me?.review_state==="incomplete"?" \xB7 \uBD88\uC644\uC804(\uC575\uCEE4 \uBD88\uC77C\uCE58)":""}</span
              >
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${me?.approval_receipt||"\uC5C6\uC74C"}${me?.approval_state==="stale"?" \xB7 stale":me?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${H.route!=="quick_fix"||Object.hasOwn(F,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${F.impl_review||"\uC5C6\uC74C"}${dt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${H.resolver.attempt} \xB7 ${H.resolver.prior_sha} \u2192 ${H.resolver.sha}`}
              >${`${H.resolver.prior_sha.slice(0,7)} \u2192 ${H.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${H.route==="quick_fix"||Object.hasOwn(F,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${F.quick_fix_review||"\uC5C6\uC74C"}${Wt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${H.planned_execution.kind}</span>
            </div>
            ${H.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${H.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${H.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${ir(H.exec_receipt)}</span
            >
          </div>`:""}
      ${H.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${H.impl_entry.actor}@${H.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${F.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${F.pr_url}</span>
          </div>`:""}
    `}let kr={route:["quick_fix","spec_backed","full_plan"]};async function Pr(k,F){let H=F.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&H!=="full_plan"&&!window.confirm(`full_plan \u2192 ${H||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ct();return}await A("update-workflow-meta",{id:u,key:k,value:H},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ct()}function Xe(k){let F=k.metadata||{};return c` ${((Se,Ze)=>{let dt=kr[Se],Wt=typeof F[Se]=="string"?F[Se]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Se}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Se}
          data-edit=${`wfmeta-${Se}`}
          @change=${me=>Pr(Se,me)}
        >
          <option value="" ?selected=${!dt.includes(Wt)}>
            ${Ze}
          </option>
          ${dt.map(me=>c`<option value=${me} ?selected=${Wt===me}>${me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Kt(k,F){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${X}
            @input=${C}
            @keydown=${H=>Le(H,ge,re,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ge}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${re}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${fn(F).map(H=>c`<span class="detail-usage-total" title=${H.tooltip}
              >${H.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${S}
        >
          ✎
        </button>
      </div>
    `}function Rn(k){let F=nn(k.created_at),H=nn(k.updated_at);return!F&&!H?c``:c`
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
          </div>`:""}
    `}function Xs(k,F){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Be}
        >
          ${Zw.map(H=>c`<option value=${H} ?selected=${H===k}>${H}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ot}
        >
          ${Jw.map(H=>c`<option value=${String(H)} ?selected=${H===F}>
                P${H}
              </option>`)}
        </select>
      </div>
    `}function Qs(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${j?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${we}
            >
              ✎
            </button>`}
      </div>
      ${j?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${P}
              @input=${Ee}
              @keydown=${F=>Le(F,R,w,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${R}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${w}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ti(k){let F=typeof k.notes=="string"?k.notes:"";return F.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${F}</div>
    `}function ni(k){let F=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${F.map(H=>c`<span class="detail-label-chip"
              >${H}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${H}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+H}
                @click=${()=>ls(H)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${gt}
            @keydown=${Dt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Rt}
          >
            추가
          </button>
        </span>
      </div>
    `}function ri(){if(!u)return c``;let k=d||{},F=String(k.id||u),H=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Se=Ke(),Ze=k.status||"open",dt=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Wt=k.description||"",me=o?o.get():null,We=me&&Ze!=="closed"?ko({...k,id:F},me):null,Ct=me?wo(me):null,us={...k,metadata:{...k.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${An}
            >
              ${F}
            </button>
            ${We?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${F}
                  ?disabled=${!We.placeable}
                  title=${Vr(We)}
                  @click=${()=>xt(F,Ct)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${We&&y&&Ct?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${sn=>vt(sn,F)}
              >
                ${ec(Ct,F)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${F}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{y=!1,ct()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Kt(H,Se)}
          ${H_(us,{onChipToggle:sn=>Tt.toggle({bead_id:F,chip_key:sn}),isChipOpen:sn=>Tt.isOpen({bead_id:F,chip_key:sn})})}
          ${W_({metadata:us.metadata,workspace_values:Gt(),catalog:kt(),execution_defaults:en(),expanded:E,presets:Ut()?.presets||[],preset_id:_,preset_busy:h,skipped_orchestration_keys:g},{onToggle:sn=>{E=sn,ct()},onEdit:(sn,si)=>{if(sn==="impl_runtime"||sn==="impl_model"||sn==="impl_effort"){mn(nt(sn,si??""));return}mn(_n(sn,si??""))},onPresetSelect:sn=>{_=sn,g=[],ct()},onPresetApply:()=>{Ve()}})}
          ${X_({md:us.metadata,catalog:J,workspace_defaults:z,handlers:{onExecChange:(sn,si)=>mn(_n(sn,si))}})}
          ${Xs(Ze,dt)} ${Rn(k)}
          ${Qs(Wt)}
          ${j_(pe,ce,{expanded:_e,draft:he,sending:U,error:Pe})}
          ${ti(k)} ${ni(k)} ${Dr(k)}
          ${vr(k)} ${Xe(k)}
          ${D_(k,$)}
          ${om({expanded:je,loading:ie,error:ee,data:Te},{onToggle:ht})}
          ${sm(rt(),qt,{total:Se,expanded:T,catalog:kt()},St)}
          ${am({events:G,shown:Ie},{onMore:et})}
        </div>
      </div>
    `}function ct(){ut(ri(),e)}return{load(k){k!==u&&(f={},y=!1,_="",g=[],E=!1,ae(),B(),mt(),Mt(),be(),fe()),u=k,d=null,!wt&&t.subscribeCandidates&&(wt=t.subscribeCandidates(()=>{u&&ct()})),lt(),rn(),M!==k&&le(k)},clear(){u=null,d=null,f={},y=!1,_="",h=!1,g=[],E=!1,ae(),B(),mt(),Mt(),be(),fe(),tt(),Oe.close(),Je.close(),ut(c``,e)},destroy(){N&&(N(),N=null),$e&&($e(),$e=null),Ue&&(Ue(),Ue=null),tt(),document.removeEventListener("keydown",Et),Tt.detach(),Re||(Oe.destroy(),Z&&Z.parentNode&&Z.parentNode.removeChild(Z)),Je.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),u=null,d=null,fe(),_="",h=!1,g=[],B(),mt(),Mt(),be(),ut(c``,e)}}}function cm(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),o=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var e$="(max-width: 640px)";function Ga(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(e$),n=!!t.matches;e(n);let r=s=>{let o=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);o!==n&&(n=o,e(o))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function t$(){return{lanes:{done:!0},areas:{}}}function Zo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function n$(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Zo(r.lanes),areas:Zo(r.areas)}:{lanes:Zo(r),areas:{}}}catch{return null}}function um(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Va(e,t=t$()){let n={lanes:Zo(t.lanes),areas:Zo(t.areas)},r=n$(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return s.lanes[i]===!0},isAreaCollapsed(i){return s.areas[i]===!0},toggle(i){let o=s.lanes[i]!==!0;return s={...s,lanes:{...s.lanes,[i]:o}},um(e,s),o},toggleArea(i){let o=s.areas[i]!==!0;return s={...s,areas:{...s.areas,[i]:o}},um(e,s),o}}}function su(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ya(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Xa(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:s,getCrossLanes:i,reproject:o,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:_}=e,h=[],g=null,E=!1,y=null,te=null,J=null;function z(){y!==null&&clearTimeout(y),y=setTimeout(()=>{y=null,E=!1},0)}function M(){return i()??null}function D(){let K=new Map,ne=s();for(let se of Array.isArray(ne)?ne:[]){if(!se||typeof se!="object")continue;let ce=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Re,Z]of Object.entries(ce))Array.isArray(Z)&&K.set(Re,Ya(Z));for(let Re of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Re&&typeof Re.bead_id=="string"&&Array.isArray(Re.blocked_by)&&Re.blocked_by.length>0&&K.set(Re.bead_id,Ya(Re.blocked_by))}return K}function q(){let K=new Map,ne=new Map,se=s();for(let ce of Array.isArray(se)?se:[]){if(!ce||typeof ce!="object")continue;let Re=ce.bead_blocked_by&&typeof ce.bead_blocked_by=="object"?ce.bead_blocked_by:{};for(let[Z,Oe]of Object.entries(Re))Array.isArray(Oe)&&K.set(Z,Ya(Oe));for(let Z of Array.isArray(ce.runnable)?ce.runnable:[])Z&&typeof Z.bead_id=="string"&&Array.isArray(Z.blocked_by)&&ne.set(Z.bead_id,Ya(Z.blocked_by))}for(let ce of h)for(let Re of[K,ne]){let Z=Re.get(ce.a);Z!==void 0&&Re.set(ce.a,ce.type==="dep-remove"?Z.filter(Oe=>Oe!==ce.b):Z.includes(ce.b)?Z:[...Z,ce.b])}return{snapshot:K,runnable:ne}}function j(){let K=D();for(let ne of h){let se=(K.get(ne.a)||[]).slice();ne.type==="dep-remove"?K.set(ne.a,se.filter(ce=>ce!==ne.b)):se.includes(ne.b)||K.set(ne.a,[...se,ne.b])}return K}function X(K=r(),ne=M()){let se=new Map;for(let je of Array.isArray(ne?.lanes)?ne.lanes:[]){let ie=new Map;for(let ee of Array.isArray(je?.entries)?je.entries:[])ee&&typeof ee.bead_id=="string"&&ie.set(ee.bead_id,ee.dep_created_by_lane===!0);se.set(typeof je?.id=="string"?je.id:"",ie)}let ce=new Map,Re=new Map,Z=new Set,Oe=new Set;for(let je of K.chain_lanes){let ie=se.get(je.lane_id);ce.set(je.lane_id,{status:je.status,entries:je.rows.map((ee,Te)=>({bead_id:ee.id,root_dir:ee.root_dir,...Te===0?{}:{dep_created_by_lane:ie?.get(ee.id)===!0}}))});for(let ee of je.rows)Re.set(ee.id,je.lane_id),ee.fixed&&Z.add(ee.id),ee.unplaced||Oe.add(ee.id)}let Me=new Map;for(let je of K.parallel_rows)typeof je.queue_index=="number"&&Me.set(je.id,je.queue_index);for(let je of K.queue_groups)for(let ie of je.sublanes.serial)for(let ee of ie.items)typeof ee.queue_index=="number"&&Me.set(ee.id,ee.queue_index);let Je=q();return{blocked_by_map:j(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(K.owner_of)),cross_lanes:ce,owner_lane_of:Re,fixed_members:Z,placed_members:Oe,parallel_rows:K.parallel_rows.map(je=>({bead_id:je.id,root_dir:je.root_dir,queue_index:je.queue_index??0})),parallel_raw_length:new Map(Object.entries(K.parallel_raw_length)),queue_index_of:Me}}function P(K,ne){let se=r();for(let Re of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Re.non_occupying||Re.id!==ne)){if(Re.root_dir===K)return Re.expected_revision;break}let ce=se.queue_groups.find(Re=>Re.root_dir===K);return ce?ce.revision:0}async function x(K,ne,se,ce){if(!t)return null;let Z=await t(K,{...ne,...se?{root_dir:se}:{},expected_revision:ce});if(Z&&Z.conflict){Z.queue&&d?.(se,Z.queue);let Oe=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:ce;Z=await t(K,{...ne,...se?{root_dir:se}:{},expected_revision:Oe})}return Z&&Z.queue&&d?.(se,Z.queue),Z}async function I(K,ne,se,ce,Re){try{let Z=await x(K,ne,se,ce.get(se)??P(se,Re.bead_id));return!Z||typeof Z.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(Z.queue&&typeof Z.queue.revision=="number"&&ce.set(se,Z.queue.revision),Z.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):Z.applied===!1?(a(Z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${Z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:ce.get(se)??0)}catch(Z){return a(su(Z),"error"),null}}async function O(K,ne,se=new Map){if(K.type==="worker-queue-disarm"){try{let ce=await x(K.type,K.payload,K.root_dir,se.get(K.root_dir)??P(K.root_dir,ne));ce&&ce.queue&&typeof ce.queue.revision=="number"&&se.set(K.root_dir,ce.queue.revision)}catch{}return!0}if(K.type==="worker-queue-place"||K.type==="worker-queue-reorder"||K.type==="worker-queue-remove")return await I(K.type,K.payload,K.root_dir,se,{bead_id:ne})!==null;try{return(K.type==="dep-add"||K.type==="dep-remove")&&t&&await t(K.type,{a:K.a,b:K.b,...K.root_dir?{root_dir:K.root_dir}:{}}),!0}catch(ce){return a(su(ce),"error"),!1}}function ae(K){(K.type==="dep-add"||K.type==="dep-remove")&&(h=[...h,{type:K.type,a:K.a,b:K.b}])}async function fe(K,ne){if(!t)return{ok:!1};try{let se=await t(K.type,{...K.payload,expected_revision:ne});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let ce=se,Re=ce&&ce.code==="conflict"?ce.details?.cross_lanes:null;return Re&&typeof Re.revision=="number"&&Array.isArray(Re.lanes)?{ok:!1,conflict:Re}:(a(su(se),"error"),{ok:!1})}}async function ye(K,ne,se){let ce=new Map,Re=[],Z=K.ops.slice(0,K.lane_op_index),Oe=K.ops.slice(K.lane_op_index);for(let Je of Z){if(!await O(Je,se,ce))return{done:!0};ae(Je)}let Me=ne;for(let Je of K.lane_ops){if(Me===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let je=await fe(Je,Me);if(!je.ok)return je.conflict?{done:!1,conflict:je.conflict}:{done:!0};Me=je.revision}for(let Je of Oe){if(!await O(Je,se,ce))return{done:!0};ae(Je),Je.type==="dep-add"&&Re.push(Je)}for(let Je of Hf(Re))Me=await Q(Je,Me);return{done:!0}}async function Q(K,ne){if(ne===null||!t)return ne;let se=K.pairs,ce=ne;for(let Re=0;Re<2;Re+=1){if(se.length===0)return ce;try{let Z=await t("monitor-lane-provenance",{lane_id:K.lane_id,pairs:se.map(Oe=>({bead_id:Oe.bead_id,after:Oe.after,value:!0})),expected_revision:ce});return Z&&typeof Z.revision=="number"?Z.revision:ce}catch(Z){let Oe=Z,Me=Oe&&Oe.code==="conflict"?Oe.details?.cross_lanes:null;if(!Me||typeof Me.revision!="number"||!Array.isArray(Me.lanes))return ce;let Je=Me.lanes.find(je=>je&&je.id===K.lane_id);se=zf(Array.isArray(Je?.entries)?Je.entries:[],se),ce=Me.revision}}return ce}async function le(K,ne,se=[]){h=se,l("",0);let ce=r(),Re=M();for(let Z=0;;Z+=1){let Oe=K(X(ce,Re));if("refused"in Oe){a(Oe.refused,"error");break}let Me=await ye(Oe,ce.cross_lanes_revision,ne);if(Me.done){Oe.correction&&l(Oe.correction.lane_id,Oe.correction.corrected);break}if(Z>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=o(Me.conflict);ce=Je.lanes,Re=Je.raw_lanes}h=[],u()}async function pe(K,ne){await le(se=>Ea(K,ne,se),K.bead_id)}function Ne(K,ne){let se=ne&&typeof ne.closest=="function"?ne.closest("[data-row-index]"):null;if(se&&K.contains(se)){let ce=Number(se.getAttribute("data-row-index"));return Number.isFinite(ce)?ce:0}return K.querySelectorAll("[data-row-index]").length}function qe(K){let ne=typeof K?.closest=="function"?K.closest(".worker-pane--collapsed[data-lane]"):null;if(!ne)return null;let se=ne.getAttribute("data-lane");return se==="queue"?{zone:ne,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&_===!0?{zone:ne,target:{kind:"candidate"}}:null}function Pe(K){let ne=K.target;if(!g)return null;let se=typeof ne?.closest=="function"?ne.closest("[data-drop]"):null;if(!se)return qe(ne);let ce=se.getAttribute("data-drop");if(ce==="candidate")return{zone:se,target:{kind:"candidate"}};if(ce==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Ne(se,ne)}};if(ce==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Ne(se,ne)}};if(ce==="repo-serial"){let Re=se.getAttribute("data-root-dir")||"";if(Re!==g.root_dir)return null;let Z=typeof ne?.closest=="function"?ne.closest("[data-queue-index]"):null,Oe=Z&&se.contains(Z)?Z.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Me=Number(Oe);return{zone:se,target:{kind:"repo-serial",root_dir:Re,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Me)?Me:0}}}return null}function he(){for(let K of Array.from(n.querySelectorAll(".is-drop-over")))K.classList.remove("is-drop-over")}function U(K){te=K.target instanceof Element?K.target:null}function ue(K){let ne=K.target,se=typeof ne?.closest=="function"?ne.closest('[draggable="true"][data-bead-id]'):null,ce=se?se.closest("[data-drag-kind]"):null;if(!ce)return;if(se&&te&&se.contains(te)&&typeof te.closest=="function"&&te.closest("input, button, a")){K.preventDefault();return}let Re=ce.getAttribute("data-bead-id")||"",Z=ce.getAttribute("data-drag-kind")||"",Oe=ce.getAttribute("data-root-dir")||"";if(!Re||!Z)return;let Me=ce.getAttribute("data-queue-index")||"",Je=Number(Me),je=ce.getAttribute("data-lane-id")||"";g={kind:Z,bead_id:Re,root_dir:Oe,...Me!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...je?{lane_id:je}:{}},E=!0,f?.(),n.classList.add("is-dragging");try{K.dataTransfer?.setData("text/plain",Re),K.dataTransfer&&(K.dataTransfer.effectAllowed="move")}catch{}}function _e(K){let ne=Pe(K);ne&&(K.preventDefault(),K.dataTransfer&&(K.dataTransfer.dropEffect="move"),ne.zone.classList.add("is-drop-over"))}function B(K){let ne=K.target;typeof ne?.closest=="function"&&(ne.closest("[data-drop]")?.classList.remove("is-drop-over"),ne.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function W(){g=null,he(),n.classList.remove("is-dragging"),z()}function Ce(K){let ne=Pe(K),se=g;g=null,he(),n.classList.remove("is-dragging"),!(!ne||!se)&&(K.preventDefault(),pe(se,ne.target))}return{attach(K){J||(J=K,K.addEventListener("pointerdown",U),K.addEventListener("dragstart",ue),K.addEventListener("dragover",_e),K.addEventListener("dragleave",B),K.addEventListener("drop",Ce),K.addEventListener("dragend",W))},detach(){y!==null&&(clearTimeout(y),y=null);let K=J;J=null,K&&(K.removeEventListener("pointerdown",U),K.removeEventListener("dragstart",ue),K.removeEventListener("dragover",_e),K.removeEventListener("dragleave",B),K.removeEventListener("drop",Ce),K.removeEventListener("dragend",W))},isDragging(){return g!==null},consumeClickSuppression(){let K=E;return E=!1,K},applyDrop:pe,runPlanned:le,dropModel:X,sendOp:O,sendQueueCas:I,rememberDep:ae}}function cn(e){return e&&typeof e=="object"?e:{}}function r$(e,t){for(let n of Object.values(cn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function s$(e,t){let r=cn(cn(t).account_catalog)[e];return Array.isArray(r)?r:[]}function dm(e,t){let n=e==="codex"?t?.key:t?.email;return typeof n=="string"?n:""}function o$(e,t){if(e!=="claude")return{eligible:!0,reason:""};if(t?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(t?.status||"\uBBF8\uC0C1")}`};let n=Array.isArray(t.windows)?t.windows:[],r=n.find(i=>i?.key==="5h"),s=n.find(i=>i?.key==="7d");if(!r||typeof r.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(s){if(typeof s.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(s.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Qa(e,t){let n=cn(cn(t).attempts)[e];if(!n)return null;let r=cn(cn(t).runner_catalog),s=cn(r.runners),i=typeof n.runner=="string"&&s[n.runner]?n.runner:Object.keys(s)[0]||"",o=cn(s[i]),l=cn(o.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof o.default_model=="string"?o.default_model:Object.keys(l)[0]||"",u=r$(e,cn(t)),d=i==="codex"?n.codex_account:n.claude_account,f=typeof d=="string"?d:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:f,fresh_current:!1}}function Za(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=cn(cn(cn(n).runner_catalog).runners),a=cn(l[r.value]),u=Object.keys(cn(a.models));return{...e,runner:r.value,account:r.value===e.runner?e.account:"",model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let s=t.closest(".provider-resume-dialog__model");if(s){try{let[l,a]=JSON.parse(s.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a,account:l===e.runner?e.account:""}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let o=t.closest(".provider-resume-dialog__fresh-input");return o?{...e,fresh_current:o.checked}:null}function ou(e){return e==="claude"}function i$(e){return e==="claude"||e==="codex"}function Ja(e){if(!e||!e.runner||!e.model||ou(e.runner)&&!e.account)return null;let t={runner:e.runner,model:e.model};e.account&&(e.runner==="claude"?t.claude_account=e.account:e.runner==="codex"&&(t.codex_account=e.account));let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Gs(e,t){if(!e)return"";let n=cn(cn(cn(t).runner_catalog).runners),r=s$(e.runner,t),s=e.runner!==e.original_runner;return c`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(n).map(i=>c`<option value=${i} ?selected=${i===e.runner}>
                ${i}
              </option>`)}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(n).map(([i,o])=>c`<optgroup label=${i}>
                ${Object.keys(cn(o?.models)).map(l=>c`<option
                      value=${JSON.stringify([i,l])}
                      ?selected=${i===e.runner&&l===e.model}
                    >
                      ${l}
                    </option>`)}
              </optgroup>`)}
        </select>
      </label>
      ${i$(e.runner)?c`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${e.account?"":c`<option value="" selected>계정 선택</option>`}
              ${e.account&&!r.some(i=>dm(e.runner,i)===e.account)?c`<option value=${e.account} selected>
                    ${e.account} (목록에 없음)
                  </option>`:""}
              ${r.map(i=>{let o=o$(e.runner,i),l=dm(e.runner,i),a=i.alias||i.email||l;return c`<option
                  value=${l}
                  ?selected=${l===e.account}
                  ?disabled=${!o.eligible}
                  title=${o.reason}
                >
                  ${a}${o.reason?` \u2014 ${o.reason}`:""}
                </option>`})}
            </select>
          </label>`:""}
      <label class="provider-resume-dialog__fresh">
        <input
          type="checkbox"
          class="provider-resume-dialog__fresh-input"
          .checked=${e.fresh_current}
        />
        새 세션으로
      </label>
    </div>
    ${s||e.fresh_current?c`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`:""}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${ou(e.runner)&&!e.account}
        title=${ou(e.runner)&&!e.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
      >
        이어하기
      </button>
    </div>
  </dialog>`}function el(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}function a$(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var pm=200;function l$(e){return typeof e!="string"||e.length===0?"":e.length>pm?`${e.slice(0,pm)}\u2026`:e}function c$(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function _m(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,s=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!s?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${fm(i.at)?c`<span class="rtile__history-at"
                    >${fm(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${s?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${Gr(n)}
          </p>`:""}`}function fm(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}var mm=Object.freeze({settlement:"\uC815\uB9AC \uC7AC\uC2DC\uB3C4",session:"\uC774\uC5B4\uD558\uAE30"});function u$(e){let t=Yp(e.cause);if(!t)return"";let n=Os(e.quickfix_landing);if(e.resume_eligible!==!1)return`${t} ${n==="settlement"?"\uC544\uB798 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB20C\uB7EC \uC2E4\uD328\uD55C \uCC29\uC9C0 \uD6C4 \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.":"\uC6D0\uC778\uC744 \uD655\uC778\uD55C \uB4A4 \uC544\uB798 [\uC774\uC5B4\uD558\uAE30]\uB85C \uAC19\uC740 \uC138\uC158\uC5D0\uC11C \uC791\uC5C5\uC744 \uACC4\uC18D\uD558\uC138\uC694."}`;let r=typeof e.resume_reason=="string"&&e.resume_reason.length>0?e.resume_reason:"";return e.attempt_id?[t,r,"\uC138\uC158 \uAE30\uB85D\uC744 \uC5F4\uC5B4 \uC6D0\uC778\uC744 \uD655\uC778\uD558\uC138\uC694."].filter(s=>s.length>0).join(" "):[t,r].filter(s=>s.length>0).join(" ")}function d$(e,t){if(!e||e.open!==!0)return"";let n=Zr(e.cause)||Er(e.cause,e.cause_detail),s=e.continuation_choice==="prior_attempt"&&typeof e.cause=="string"&&(e.cause.startsWith("resume_failed")||e.cause.startsWith("session_failed"))?e.cause==="resume_failed:transcript_missing"?"\uC774\uC5B4\uAC08 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC0C8 \uC138\uC158\uC744 \uC790\uB3D9\uC73C\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":`${n} \uC0C8 \uC138\uC158\uC744 \uC790\uB3D9\uC73C\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.`:n,i=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,l=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,a=l?[l.cursor||null,typeof l.head_sha=="string"?l.head_sha.slice(0,7):null,l.reason||null].filter(Boolean).join(" \xB7 "):"",u=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${yn(e.finished_at,t)}`:"",d=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(y=>typeof y=="string"&&y.length>0).join(" \xB7 "),f=e.usage?.total_cost_usd,_=typeof f=="number"&&Number.isFinite(f)?`$${f.toFixed(2)}`:"",h=_m(e),g=u$(e),E=mm[Os(e.quickfix_landing)];return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${h?c`<div>
            <dt>이력</dt>
            <dd>${h}</dd>
          </div>`:""}
      ${s?c`<div>
            <dt>원인</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${g?c`<div>
            <dt>다음</dt>
            <dd>${g}</dd>
          </div>`:""}
      ${i?c`<div>
            <dt>재시도 이력</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${a?c`<div>
            <dt>착지 단계</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${u?c`<div>
            <dt>실패 시각</dt>
            <dd>${u}</dd>
          </div>`:""}
      ${d?c`<div>
            <dt>실행</dt>
            <dd>${d}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${_?c`<div>
            <dt>비용</dt>
            <dd>${_}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?`${E} \uAC00\uB2A5`:e.resume_reason||`${E} \uBD88\uAC00`}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — ${E}로 배포·정리를 재개
        </p>`:""}
  </div>`}function p$(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=nr(e.resets_at),r=Jp(e.auto_resume),s=da(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${s?c`<div>
            <dt>계정 전환</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Gr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function f$(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var _$=new Set(["codex-runner"]);function m$(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,i=s&&typeof s.text=="string"?s.text:"",o=s&&typeof s.at=="number"?s.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&_$.has(h.agent_type))),a=l.filter(h=>h&&h.state==="live"),u=l.filter(h=>h&&h.state!=="live"),d=r&&typeof r.last_event_at=="number"?yn(r.last_event_at,t):"",f=r?yn(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${o!==null?c`<span class="rtile__activity-age"
              >${yn(o,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${_}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var g$={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function h$(e){if(!e)return"";let t=g$[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function b$(e,t,n,r="",s="",i=!1,o=void 0){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait"){let u=typeof o=="number"?c`<button
            type="button"
            class="op-btn rtile__hold-retry"
            data-since=${o}
            title="예약된 재시도를 지금 실행합니다"
          >
            ↻ 지금 재시도
          </button>`:"";return!n&&!u?"":c`<div class="rtile__foot">${n}${u}</div>`}let l=l$(t?.summary);if(e==="waiting")return c`${l?c`<p class="rtile__held-summary">${l}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let a=_m(t);return c`${l?c`<p class="rtile__held-summary">${l}</p>`:""}${a}
    <div class="rtile__foot">
      ${i?c`${n}${s}`:c`${s}${n}`}
    </div>`}function iu(e,t,n=null,r={}){let s=e.kind==="session",i=s&&Array.isArray(e.session_refs)&&e.session_refs.find(je=>je&&je.current===!0)||null,o=e.failed===!0,l=o&&e.failure||null,a=e.parked===!0&&!o,u=e.retry_wait===!0&&!o&&!a,d=e.waiting===!0&&!o&&!a&&!u,f=e.provider_hold===!0&&!o&&!a&&!u&&!d,_=a&&e.failure||null,h=d&&e.wait||null,g=f&&e.hold||null,E=a||u||d||f,y=!!e.paused,te=o||E?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):y?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?a$(t-e.started_at):"\u2014",J=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=mo(e),M=fn(e.usage),D=ar(e.usage),q=e.conflict_resolution?y?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,j=e.base_exception||null,X=e.landing,P=e.attempt_id&&e.attempt_id===n,x=r.monitor||null,I=f$(x),O=ea(x?.cross_lane_chip),ae=x?Ji(x.dependency_chips):"",fe=m$(x,t,y,s?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),ye=s&&e.workflow?.chips?.exec_receipt||null,Q=Qr(e.workflow),le=na(e.rec,e.chip_popover?.chip_key==="rec"),pe=e.chip_popover?Ls(e.chip_popover.content):"",Ne=ye?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ir(ye)}`}
        >${`${ye.kind}:${xi(ye)}`}</span
      >`:"",qe=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Lo(i)}</span
      >`:"",Pe=I||O||Q||qe||Ne||le?c`<div class="rtile__meta">
          ${I}${O}${Q}${qe}${Ne}${le}${pe}
        </div>`:"",he=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Vp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",U=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${c$(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:f&&g?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${g.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${ua(g)}
            </button>`:"",ue=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${j?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${j}</span
      >`:""}${he}${U}`,_e=s?"":Ds(e),B=Os(l?.quickfix_landing),W=mm[B],Ce=B==="settlement"?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589 (\uC138\uC158\uC744 \uC5F4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",K=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ne=e.discard?.action&&!(o&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",se=ne&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",ce=se?c`${ne}${se}`:ne,Re=e.instructions_restart||null,Z=Re?.eligible===!0,Oe=Re?c`<button
        type="button"
        class="op-btn rtile__restart-instructions"
        ?disabled=${!Z}
        title=${Z?"\uC2E4\uD589\uC744 \uC911\uB2E8\uD55C \uB4A4 \uC9C0\uC2DC\uB97C \uB2F4\uC544 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uC73C\uB85C \uC7AC\uC2DC\uC791":Re.reason||"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC7AC\uC2DC\uC791 \uBD88\uAC00"}
        aria-label="지시와 함께 재시작"
      >
        지시와 함께 재시작
      </button>`:"",Me=Re?c`<button
        type="button"
        class="op-btn rtile__resume-instructions"
        ?disabled=${!Z}
        title=${Z?"\uC9C0\uC2DC\uB97C \uB2F4\uC544 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uD558\uAE30":Re.reason||"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        aria-label="지시와 함께 이어하기"
      >
        지시와 함께 이어하기
      </button>`:"",Je=ta(e.workflow,!1);return c`<div
    class="rtile${P?" rtile--sel":""}${y?" rtile--paused":""}${o?" rtile--failed rtile--compact":""}${E?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${s?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
    data-route=${an(Je.route)}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ra(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${ue}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${te}</span>`:""}${h$(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${te}</span>`}
        ${s||E?"":o?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${B}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${W} \uBD88\uAC00`:Ce}
                  aria-label=${W}
                >
                  ↻ ${W}
                </button>
                ${ce}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${y?c`${Me}<button
                        type="button"
                        class="op-btn rtile__resume"
                        title="같은 세션으로 이어서 재개 (현재 실행 설정을 적용할 수 있음)"
                        aria-label="재개"
                      >
                        ▶ 재개
                      </button>`:c`${Oe}<button
                        type="button"
                        class="rtile__pause"
                        ?disabled=${e.can_pause===!1}
                        title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                        aria-label="일시정지"
                      >
                        ⏸
                      </button>`}
                ${ce}`}${a?"":K}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${E?b$(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?h:g,ce,d?ae:"",a?K:"",a&&!!e.discard?.error,e.hold_since):o?"":c`${fe}${e.rollup?wi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Sl}):""}
            ${X?c`<div class="rtile__landing">
                  <span
                    class="merge-step${X.failed?" merge-step--failed":""}"
                    style=${`--progress: ${X.percent}%`}
                    >${X.label}${X.index>0?c`<span class="merge-step__n"
                          >${X.index}/${X.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ae}
            ${s?Pe:I||O||Q||J||le||M.length>0||D?c`<div class="rtile__meta">
                    ${I}${O}${Q}${Xr(e.exec_chips)}${le}
                    ${M.length>0?M.map(je=>c`<span
                              class="worker-usage"
                              title=${je.tooltip}
                              >${je.label}</span
                            >`):D?c`<span
                            class="worker-usage"
                            title=${ao(e.usage)}
                            >${D}</span
                          >`:""}${pe}
                  </div>`:""}
            ${Vi(e)} ${_e}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${o||y?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${d$(l,t)}${p$(g)}
  </div>`}function y$(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function gm(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>iu(s,t,n,{monitor:y$(s)}))}
  </div>`}function Vs(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var dn="",v$=["impl_runtime","impl_model","impl_effort"],hm=["claude","codex"],k$=["claude_account","codex_account"],w$=5,tl=1;function jn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function nl(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(T=>ve(T,"error",4e3)),i={},o={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},_={},h={},g=Promise.resolve(),E=Promise.resolve(),y={claude:null,codex:null},te=!1,J=null,z={},M="",D="general",q="",j=!1,X=!1,P=!1,x=null,I=!1;function O(){let T=t.queue?t.queue():null;return jn(T)?T:null}function ae(){let T=O();return T?T.runner_catalog:null}function fe(){let T=O();return T&&jn(T.execution_defaults)?T.execution_defaults:null}function ye(){let T=O();return!!(T&&Object.hasOwn(T,"quick_fix_orchestration_model"))}function Q(){let T=t.implPresetStore?.get();return jn(T)&&Array.isArray(T.presets)?T:null}function le(){return r===null?{}:{root_dir:r}}async function pe(T,V){return I||!n?null:await n(T,V)}function Ne(T){T&&jn(T.queue)&&t.onQueueAdopt?.(T.queue)}async function qe(T,V){let Y=O();if(!Y||I)return null;let Ae=await pe(T,{...V,...le(),expected_revision:Y.revision});if(Ne(Ae),r!==null&&Ae&&Ae.conflict){let xe=Ae.queue&&typeof Ae.queue.revision=="number"?Ae.queue.revision:O()?.revision??Y.revision;Ae=await pe(T,{...V,...le(),expected_revision:xe}),Ne(Ae)}return Ae}async function Pe(){d=!0,Ke();try{let T=await pe("get-session-defaults",{...le()});i=Di(T?.values),o={...i},l={},a={},u=Array.isArray(T?.warnings)?T.warnings:[]}catch(T){u=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${T instanceof Error?T.message:String(T)}`)}finally{d=!1,Ke()}}function he(T,V){let Y={...V};for(let Ae of lo){let xe=o[Ae];xe!==T[Ae]&&(typeof xe=="string"?Y[Ae]=xe:delete Y[Ae])}return Y}function U(){E=E.then(()=>ue())}async function ue(){let T=sp(i,o);if(Object.keys(T).length===0)return;let V={...o};try{let Y=await pe("set-session-defaults",{values:T,...le()});i=Di(Y?.values),o=he(V,i),u=Array.isArray(Y?.warnings)?Y.warnings:[]}catch(Y){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}Ke()}function _e(T,V){if(!jn(T))return;let Y=T.state;f={state:Y==="usable"||Y==="unusable"||Y==="absent"?Y:"absent",values:jn(T.values)?{...T.values}:{},warnings:Array.isArray(T.warnings)?T.warnings:[]},h={...f.values},V&&(_={...h})}async function B(){try{_e(await pe("get-workspace-accounts",{...le()}),!0)}catch(T){f={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},_={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${T instanceof Error?T.message:String(T)}`)}Ke()}async function W(T){try{let V=await fetch(T);if(!V.ok)return null;let Y=await V.json();if(!jn(Y)||!Array.isArray(Y.accounts))return null;let Ae=Y.accounts.filter(xe=>jn(xe)&&typeof xe.key=="string"&&xe.key.length>0&&typeof xe.email=="string"&&xe.email.length>0);return{accounts:Ae,active:Ae.find(xe=>xe.active===!0)||null}}catch{return null}}async function Ce(){te=!0;let[T,V]=await Promise.all([W("/api/claude-usage"),W("/api/codex-usage")]);I||(y={claude:T,codex:V},Ke())}function K(){let T={};for(let V of k$){let Y=Object.hasOwn(_,V)?_[V]:null,Ae=Object.hasOwn(h,V)?h[V]:null;Y!==Ae&&(T[V]=Y)}return T}async function ne(){let T=K();if(Object.keys(T).length!==0){try{_e(await pe("set-workspace-accounts",{values:T,...le()}),!1)}catch(V){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Ke()}}function se(T,V){V===dn?delete _[T]:_[T]=V,Ke(),g=g.then(()=>ne())}function ce(T,V){if(v$.includes(T)){Je(T,V);return}V===dn?delete o[T]:o[T]=V,Ke(),U()}function Re(T,V){l[T]=V,delete a[T]}function Z(T,V,Y){if(l[T]=V,V.length>0&&!Y(V)){a[T]=!0,Ke();return}delete l[T],delete a[T],V.length===0?delete o[T]:o[T]=V,Ke(),U()}function Oe(){let T=ht().orchestration_model,V=Cn({global:{orchestration_model:T??void 0},execution_defaults:fe(),runner_catalog:ae()}).orchestration_model.value;return V?Wn(ae(),V):null}function Me(T,V){typeof V=="string"&&V.length>0?o[T]=V:delete o[T]}function Je(T,V){let Y=V===dn?void 0:V,Ae=tp({impl_runtime:T==="impl_runtime"?Y:o.impl_runtime,impl_model:T==="impl_model"?Y:o.impl_model,impl_effort:T==="impl_effort"?Y:o.impl_effort},ae(),Oe());Me("impl_runtime",Ae.impl_runtime),Me("impl_model",Ae.impl_model),Me("impl_effort",Ae.impl_effort),Ke(),U()}async function je(){let T=O();if(!T)return;let V={orchestration_model:T.orchestration_model??null,orchestration_effort:T.orchestration_effort??null,orchestration_speed:T.orchestration_speed??null,quick_fix_orchestration_model:T.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:T.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:T.quick_fix_orchestration_speed??null},Y=op(V,{...V,...z});if(Object.keys(Y).length!==0){try{let Ae=await qe("worker-queue-set-orchestration-defaults",{values:Y});if(Ae&&Ae.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}z={}}catch(Ae){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ke()}}function ie(T,V){z[T]=V===dn?null:V,Ke(),je()}function ee(T){if(J=T,!T){Ke();return}let V=ae(),Y=ht(),Ae=Y.orchestration_model;Ae&&!Rs(V,T).includes(Ae)&&(z.orchestration_model=null,Ae=null);let xe=Y.orchestration_effort;xe&&!ji(V,T,Ae||En).includes(xe)&&(z.orchestration_effort=null),Ke(),je()}async function Te(T){if(!(!O()||T<tl)){try{await qe("worker-queue-set-slots",{slots:T})}catch(V){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Ke()}}async function ft(T){if(!(!O()||T<tl||T>w$)){try{await qe("worker-queue-set-serial-lane-count",{count:T})}catch(V){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Ke()}}async function _t(T,V){let Y=T==="auto_advance"?"worker-automation-toggle":T==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await qe(Y,{on:V})}catch(Ae){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ke()}function He(){let T={},V=ht();for(let Y of Es){let Ae=Un.includes(Y)?V[Y]:o[Y];typeof Ae=="string"&&Ae.length>0&&(T[Y]=Ae)}return T}async function mt(){let T=Q();if(!T)return;let V=He();if(Object.keys(V).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Y=(T.presets||[]).find(xe=>xe.id===M),Ae=q.trim()||(Y?Y.name:"");if(!Ae){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let xe=Y?await pe("impl-preset-update",{expected_revision:T.revision,id:Y.id,name:Ae,settings:V}):await pe("impl-preset-create",{expected_revision:T.revision,name:Ae,settings:V});if(xe&&xe.applied){if(q="",!Y&&Array.isArray(xe.presets)){let yt=xe.presets.find(xt=>xt.name===Ae);M=yt?yt.id:M}Ke()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ke()}catch(xe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${xe instanceof Error?xe.message:String(xe)}`)}}async function It(){let T=Q();if(!(!T||M.length===0))try{let V=await pe("impl-preset-delete",{expected_revision:T.revision,id:M});V&&V.applied?(M="",Ke()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ke())}catch(V){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}function St(T){i=Di(T.values),o={...i},u=Array.isArray(T.warnings)?T.warnings:[],jn(T.queue)&&(t.onQueueAdopt?.(T.queue),z={})}async function st(T){let V=Q(),Y=O();if(!V||!Y||M.length===0||T==="quick_fix"&&!ye())return;let Ae=xe=>({preset_id:M,expected_revision:V.revision,expected_queue_revision:xe,...T==="quick_fix"?{lane:"quick_fix"}:{},...le()});try{let xe=await pe("apply-impl-preset-global",Ae(Y.revision));if(T==="quick_fix"&&xe&&xe.lane!=="quick_fix"){s("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ke();return}if(xe&&xe.applied&&St(xe),r!==null&&xe&&xe.queue_applied===!1){let yt=xe.queue&&typeof xe.queue.revision=="number"?xe.queue.revision:O()?.revision??Y.revision;if(xe=await pe("apply-impl-preset-global",Ae(yt)),T==="quick_fix"&&xe&&xe.lane!=="quick_fix"){s("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ke();return}xe&&xe.applied&&St(xe)}xe&&xe.applied?xe.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):xe&&xe.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(xe){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${xe instanceof Error?xe.message:String(xe)}`)}Ke()}async function pt(){X=!0,P=!1,Ke();try{let T=await pe("get-worker-system-prompt",{});!T||typeof T!="object"||Array.isArray(T)?P=!0:x=T}catch{P=!0}finally{X=!1,Ke()}}function Jt(){if(j=!j,j&&!x){pt();return}Ke()}function Mt(){let T=Ws({loading:X,error:P});if(T)return T;if(!x)return"";let V=Array.isArray(x.variants)?x.variants:[];return c`<div class="settings-dialog__sp-body">
      ${x.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${x.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${V.map(Y=>c`<div class="settings-dialog__sp-variant" data-variant=${Y.key}>
            <div class="settings-dialog__sp-cond">${Y.condition}</div>
            ${br(Y.label,Y.system_prompt)}
          </div>`)}
    </div>`}function Zt(){return c`<section
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
        aria-expanded=${j?"true":"false"}
        @click=${Jt}
      >
        ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${j?Mt():""}
    </section>`}function v(T,V,Y,Ae,xe,yt,xt,vt){let Lt=xe[T]??dn,qt=Fl(T,Y,xe,fe(),ae(),xt,vt),Gt=qt.options.find(kt=>kt.value===Lt),rn=Lt===dn?qt.full_value:Gt?.full_value;return c`<select
        class=${Lt===dn?"settings-dialog__unset":""}
        data-key=${T}
        aria-label=${V}
        title=${rn||""}
        ?disabled=${yt===!0||vt!=="quick_fix"&&qt.disabled}
        .value=${Or(String(Lt))}
        @change=${kt=>Ae(T,String(kt.target.value))}
      >
        <option value=${dn} ?selected=${Lt===dn}>
          ${qt.unset_label}
        </option>
        ${qt.options.map(kt=>c`<option
              value=${kt.value}
              title=${kt.full_value||""}
              ?selected=${kt.value===Lt}
            >
              ${kt.label}
            </option>`)}
      </select>
      ${Lt===dn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function G(T,V,Y,Ae,xe,yt=!1,xt,vt=null,Lt=null){return c`<div
      class=${`settings-dialog__row${yt?" settings-dialog__row--off":""}`}
      title=${yt&&Lt?Lt:""}
    >
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        ${v(T,V,Y,Ae,xe,yt,xt,vt)}
      </span>
    </div>`}function De(T,V,Y,Ae,xe,yt){let xt=Object.hasOwn(a,T),vt=l[T]??o[T]??dn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${xt?" settings-dialog__text--invalid":""}`}
          data-key=${T}
          aria-label=${V}
          aria-invalid=${String(xt)}
          placeholder=${Y}
          .value=${Or(vt)}
          @input=${Lt=>Re(T,String(Lt.target.value))}
          @change=${Lt=>Z(T,String(Lt.target.value).trim(),yt)}
        />
        ${vt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${T}
          >${xt?xe:Ae}</span
        >
      </span>
    </div>`}function Ie(T,V,Y,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${T}
            .checked=${o[T]===co}
            @change=${xe=>ce(T,xe.target.checked?co:dn)}
          />
          ${Y}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${T}>${Ae}</span>
      </span>
    </div>`}function Fe(T,V){let Y=V?V.active:null;return jn(Y)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${T==="claude"?Y.email:zs({...Y,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ze(T,V,Y){let Ae=y[Y],xe=Object.hasOwn(_,T)?_[T]:dn,yt=Y==="claude"?Wa:zs,xt=!!Ae?.accounts.some(vt=>vt.key===xe);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${V}
          data-account-key=${T}
          @change=${vt=>se(T,String(vt.target.value))}
        >
          <option value=${dn} ?selected=${xe.length===0}>
            ${Fe(Y,Ae)}
          </option>
          ${xe.length>0&&!xt?c`<option value=${xe} selected>
                ${xe} (목록에 없음)
              </option>`:""}
          ${Ae?.accounts.map(vt=>c`<option value=${vt.key} ?selected=${vt.key===xe}>
                ${yt(vt)}
              </option>`)||""}
        </select>
        ${Ae?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function oe(){let T=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${T} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${T}`:null}function be(T,V,Y,Ae,xe,yt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${V}-on)`}
        ></i>
        ${T}
      </span>
      <span class="settings-dialog__controls">
        ${v(Y,`${T} \uBAA8\uB378`,Ae,ce,o,!1)}
        ${v(xe,`${T} effort`,qi,ce,o,!1)}
        ${v(yt,`${T} \uC18D\uB3C4`,Zd,ce,o,!1)}
      </span>
    </div>`}function Qe(T,V,Y,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Ae?" is-on":""}`}
          data-automation=${T}
          aria-pressed=${Ae?"true":"false"}
          aria-label=${V}
          @click=${()=>_t(T,!Ae)}
        >
          ${Ae?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Y}</span>
      </span>
    </div>`}function at(T,V,Y,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${T}>
          <button
            type="button"
            aria-label=${`${V} \uAC10\uC18C`}
            @click=${()=>Ae(Y-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Y}</span>
          <button
            type="button"
            aria-label=${`${V} \uC99D\uAC00`}
            @click=${()=>Ae(Y+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function et(T,V){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${T.rows.length>0?`\uBCC0\uACBD ${T.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${T.rows.map(Y=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Y.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Y.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Y.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Y.after??(V==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${T.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${T.ignored_keys.join(", ")}은(는)
            ${V==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ht(){let T=O(),V={};for(let Y of[...Un,...Ss])V[Y]=Object.prototype.hasOwnProperty.call(z,Y)?z[Y]:T&&typeof T[Y]=="string"?T[Y]:null;return V}function bt(){let T=ht(),V={};for(let Y of Ss)V[Y]=T[Y]??null;for(let Y of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])V[Y]=o[Y]??null;return V}function rt(){let T=ae(),V=o.impl_runtime,Y=o.impl_model,Ae=Q(),xe=O(),yt=ht(),xt=Rs(T,J),vt=Ts(T,void 0).filter(tt=>tt!==En),Lt=zr(T,void 0,void 0),qt=ji(T,J,yt.orchestration_model||En).filter(tt=>tt!==En),Gt=M?(Ae?.presets||[]).find(tt=>tt.id===M):null,rn=Gt?np(He(),jn(Gt.settings)?Gt.settings:{}):null,kt={quick_fix_orchestration_model:Rs(T,null),quick_fix_orchestration_effort:ji(T,null,null).filter(tt=>tt!==En),quick_fix_orchestration_speed:Jn,quick_fix_impl_dispatch:uo,quick_fix_impl_runtime:hm,quick_fix_impl_model:vt,quick_fix_impl_effort:Lt,quick_fix_impl_speed:Jn},en=Gt?rp(bt(),jn(Gt.settings)?Gt.settings:{},kt):null,un=D==="quick_fix"?en:rn,Ut=ye(),Vt=Ut?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Xt={...o,...yt},Ve=xe&&typeof xe.slots=="number"?xe.slots:tl+1,N=xe&&typeof xe.serial_lane_count=="number"?xe.serial_lane_count:tl,$e=fe()?.supported===!0,Ue=oe(),wt=Fl("workflow_mode",po,o,fe(),T);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Ue?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ue}
          </div>`:""}
      ${$e?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Or(M)}
                @change=${tt=>{M=String(tt.target.value),Ke()}}
              >
                <option value="" ?selected=${M===""}>
                  실행 프리셋…
                </option>
                ${(Ae?.presets||[]).map(tt=>c`<option
                      value=${tt.id}
                      ?selected=${tt.id===M}
                    >
                      ${tt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!rn||rn.rows.length===0}
                @click=${()=>st("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Vt||""}
                ?disabled=${!Ut||!en||en.rows.length===0}
                @click=${()=>st("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${M?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Or(q)}
                @input=${tt=>{q=String(tt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${M?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${mt}
              >
                ${M?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${M.length===0}
                @click=${It}
              >
                삭제
              </button>
            </div>
            <div
              class="settings-dialog__seg"
              role="group"
              aria-label="프리셋 적용 레인"
              data-preset-lane-tabs
            >
              <button
                type="button"
                data-preset-lane="general"
                aria-pressed=${String(D==="general")}
                @click=${()=>{D="general",Ke()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(D==="quick_fix")}
                @click=${()=>{D="quick_fix",Ke()}}
              >
                quick_fix
              </button>
            </div>
            ${un?et(un,D):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Or(J||dn)}
                    @change=${tt=>{let Et=String(tt.target.value);ee(Et===dn?null:Et)}}
                  >
                    <option value=${dn} ?selected=${!J}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${J==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${J==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${G("orchestration_model","\uBAA8\uB378",xt,ie,yt)}
              ${G("orchestration_effort","effort",qt,ie,yt)}
              ${G("orchestration_speed","\uC18D\uB3C4",Jn,ie,yt)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ze("claude_account","Claude","claude")}
              ${ze("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${xe?.provider_auto_switch!==!1}
                      @change=${tt=>_t("provider_auto_switch",tt.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${dn}
                      aria-pressed=${String(!o.workflow_mode)}
                      @click=${()=>ce("workflow_mode",dn)}
                    >
                      ${wt.unset_label}
                    </button>
                    ${o.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${po.map(tt=>c`<button
                          type="button"
                          data-mode=${tt}
                          aria-pressed=${String(o.workflow_mode===tt)}
                          @click=${()=>ce("workflow_mode",tt)}
                        >
                          ${tt}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${De("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Qd)}
              ${Ie("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${be("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",fo,"spec_review_effort","spec_review_speed")}
              ${be("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Mi,"plan_review_effort","plan_review_speed")}
              ${be("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",fo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${G("impl_runtime","\uC704\uC784 \uB300\uC0C1",Pi,ce,o)}
              ${G("impl_model","\uBAA8\uB378",Ts(T,V),ce,o)}
              ${G("impl_effort","effort",zr(T,V,Y),ce,o)}
              ${G("impl_speed","\uC18D\uB3C4",Jn,ce,o)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Vt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${G("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",kt.quick_fix_orchestration_model,ie,yt,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",kt.quick_fix_orchestration_effort,ie,yt,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Jn,ie,yt,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",uo,ce,o,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",hm,ce,o,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_impl_model","\uBAA8\uB378",vt,ce,o,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_impl_effort","effort",Lt,ce,o,!Ut,Xt,"quick_fix",Vt)}
              ${G("quick_fix_impl_speed","\uC18D\uB3C4",Jn,ce,o,!Ut,Xt,"quick_fix",Vt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Qe("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",xe?.auto_advance===!0)}
              ${Qe("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",xe?.auto_merge===!0)}
              ${at("slots","\uB3D9\uC2DC \uC2E4\uD589",Ve,tt=>Te(tt))}
              ${at("serial-lane-count","\uC9C1\uB82C \uB808\uC778",N,tt=>ft(tt))}
            </div>
            ${Zt()}
          `}
    `}function Ke(){I||ut(rt(),e)}return{load(){z={},D="general",l={},a={};let T=[Pe(),B()];return te||T.push(Ce()),Promise.all(T).then(()=>{})},render:Ke,sessionDraft:()=>({...o}),destroy(){I=!0,ut(c``,e)}}}function rl(e){return c`<svg
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
  </svg>`}function bm(){return rl(ro`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ym(){return rl(ro`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vm(){return rl(ro`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function km(){return rl(ro`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function wm(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function $m(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return fn(Ci(t));let n={};for(let l of Zn)n[l]=0;let r=!1,s=0,i=0,o=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Zn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,o+=1)}}}return i>0&&o===i&&(n.total_cost_usd=s),r?ar(n):null}function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function au(e,t){let n=Ln(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $$(e,t){if(!Ln(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function x$(e){if(!Ln(e)||!Ln(e.execution_defaults)||!Ln(e.runner_catalog)||!Ln(e.session_defaults))return null;let t={...e.session_defaults};for(let o of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[o]=="string"&&e[o].length>0&&(t[o]=e[o]);let n=Cn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Wn(e.runner_catalog,n.orchestration_model.value??""),s=Cs(n,e.runner_catalog),i=Kr(n,r);return s===null&&i===null?null:{orchestration:s,worker:i}}function xm(e,t){let n=t.notify||(B=>ve(B,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let o=document.createElement("span");o.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(o,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",s.append(i,a),e.appendChild(s);let u=null,d=null,f=null,_=new Map;function h(){let B=t.workspacesState?t.workspacesState():[];return Array.isArray(B)?B.filter(W=>Ln(W)):[]}function g(B){return h().find(W=>W.root_dir===B)||null}function E(B){return $$(g(B),_.get(B))}function y(){for(let B of h()){let W=_.get(B.root_dir);W&&typeof W.revision=="number"&&typeof B.revision=="number"&&B.revision>=W.revision&&_.delete(B.root_dir)}}async function te(B,W,Ce){let K=t.transport,ne=E(W);if(!(!K||!Ln(ne))){try{let se=await K(B,{...Ce,root_dir:W,expected_revision:ne.revision});if(Ln(se?.queue)&&_.set(W,se.queue),se&&se.conflict){let ce=Ln(se.queue)&&typeof se.queue.revision=="number"?se.queue.revision:E(W)?.revision;se=await K(B,{...Ce,root_dir:W,expected_revision:ce}),Ln(se?.queue)&&_.set(W,se.queue)}}catch(se){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${se instanceof Error?se.message:String(se)}`)}U()}}function J(B){u!==B&&(u=B,t.onFocusChange?.(u),U())}function z(B){J(u===B?null:B)}function M(B){if(d===B){q();return}D(),d=B;let W=g(B);o.textContent=`${W?.name||B} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,f=nl(a,{root_dir:B,queue:()=>E(B),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ce=>{_.set(B,Ce),U()}}),f.load(),U()}function D(){f?.destroy(),f=null}function q(B){D(),d=null,s.hidden=!0,o.textContent="",B!==!0&&U()}let j=()=>q();l.addEventListener("click",j);function X(B){B.key==="Escape"&&u!==null&&J(null)}document.addEventListener("keydown",X);function P(B,W){let Ce=Math.max(W,B,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${W}\uAC1C \uC911 ${B}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ce},(K,ne)=>ne<B?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function x(B){let W=B.auto_advance===!0,Ce=B.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${W?" is-on":""}`}
        data-act="auto"
        aria-pressed=${W?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9\uD654`}
        title=${W?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${W?ym():bm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ce?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${vm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===B.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===B.root_dir?"true":"false"}
        aria-label=${`${B.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${km()}
      </button>`}function I(B){let W=x$(B);return W?c`<div class="mon2-deck__chips">
      ${W.orchestration?c`<span class="mon2-deck__chip" title=${W.orchestration.title}
            >오케 ${W.orchestration.text}</span
          >`:""}
      ${W.worker?c`<span class="mon2-deck__chip" title=${W.worker.title}
            >워커 ${W.worker.text}</span
          >`:""}
    </div>`:""}let O={equal:"\uB3D9\uAE30",behind:"\uB4A4\uCC98\uC9D0",ahead:"\uC55E\uC12C",diverged:"\uAC08\uB77C\uC9D0"},ae={missing_checkout:"\uCCB4\uD06C\uC544\uC6C3 \uC5C6\uC74C",invalid_target:"\uAE30\uC900 \uB300\uC0C1 \uD655\uC778 \uBD88\uAC00",fetch_failed:"\uC6D0\uACA9 \uAC31\uC2E0 \uC2E4\uD328",judge_failed:"\uD310\uC815 \uC2E4\uD328",invalid_result:"\uACB0\uACFC \uD615\uC2DD \uC624\uB958"},fe=[["conflict","\uCDA9\uB3CC"],["staged","staged"],["unmerged","unmerged"]];function ye(B,W){return W?`${B}+`:String(B)}function Q(B,W){let Ce=Date.parse(B);if(Number.isNaN(Ce))return"";let K=Math.max(0,Math.floor((W-Ce)/6e4));if(K<60)return`${K}\uBD84 \uC804`;let ne=Math.floor(K/60);return ne<24?`${ne}\uC2DC\uAC04 \uC804`:`${Math.floor(ne/24)}\uC77C \uC804`}function le(B){let W=Ln(B?.repo_health)?B.repo_health:null,Ce=W?W.state:"unknown";if(!W||Ce==="unknown")return c`<span
        class="mon2-deck__health is-unknown"
        title="저장소 건강 기록이 없습니다"
        >미확인</span
      >`;let K=typeof W.observed_at=="string"?Q(W.observed_at,Date.now()):"",ne=[];if(Ce==="error"||Ce==="stale"){let ce=ae[W.error_code];ce&&ne.push(`\uC218\uC9D1 \uC2E4\uD328 ${ce}`)}if(typeof W.head_relation=="string"){let ce=O[W.head_relation],Re=[typeof W.behind=="number"&&W.behind>0?`-${W.behind}`:"",typeof W.ahead=="number"&&W.ahead>0?`+${W.ahead}`:""].filter(Z=>Z.length>0);ne.push([ce||W.head_relation,...Re].join(" "))}let se=Ln(W.classes)?W.classes:null;if(se)for(let[ce,Re]of fe){let Z=se[ce];typeof Z=="number"&&Z>0&&ne.push(`${Re} ${ye(Z,W.truncated===!0)}`)}return Ce==="stale"&&ne.push("\uC624\uB798\uB41C \uAD00\uCC30\uAC12"),K.length>0&&ne.push(K),ne.length===0?"":c`<span
      class=${`mon2-deck__health is-${Ce}`}
      title=${`\uC800\uC7A5\uC18C \uAC74\uAC15 \u2014 ${W.truncated===!0?"\uC218\uCE58\uB294 \uC798\uB824 \uC774\uC0C1\uAC12\uC785\uB2C8\uB2E4":"15\uBD84\uB9C8\uB2E4 dotfiles\uAC00 \uAE30\uB85D\uD569\uB2C8\uB2E4"}`}
      >${ne.join(" \xB7 ")}</span
    >`}function pe(B){let W=[];for(let[Ce,K]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let ne=au(B,Ce);ne>0&&W.push(`${K} ${ne}`)}return W.join(" \xB7 ")}function Ne(B){let W=au(B,"running"),Ce=typeof B.slots=="number"?B.slots:1;return c`<div
      class=${`mon2-deck__tile${u===B.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${B.root_dir}
      aria-pressed=${u===B.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${B.root_dir}>${B.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ce}\uAC1C \uC911 ${W}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${W}/${Ce}</span>
          ${P(W,Ce)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${B.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${x(B)}</div>
        <span class="mon2-deck__counts">${pe(B)}</span>
        ${le(B)} ${I(B)}
      </div>
    </div>`}function qe(B){let W=t.doneItems?t.doneItems():[],Ce=t.rangeLabel?t.rangeLabel():"",K=$m(Array.isArray(W)?W:[]),ne=se=>B.reduce((ce,Re)=>ce+au(Re,se),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${B.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ce}`}
        >실행 ${ne("running")} · 대기 ${ne("queue")} · PR
        ${ne("pr_wait")}${ne("session_active")>0?` \xB7 \uC138\uC158 ${ne("session_active")}`:""}
        · ${Ce} 완료
        ${Array.isArray(W)?W.length:0}</span
      >
      ${K===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof K=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${wm(Ce)}
                  >${K}</span
                >`:K.map(se=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${se.provider}
                      title=${se.tooltip}
                      >${se.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let B=h();return B.length===0?"":c`${qe(B)}
      <div class="mon2-deck__strip">
        ${B.map(W=>Ne(W))}
      </div>`}function he(){u!==null&&!g(u)&&(u=null,t.onFocusChange?.(null))}function U(){y(),he(),d!==null&&!g(d)&&q(!0),ut(Pe(),r),f?.render()}function ue(B){let W=B.target;if(!W||typeof W.closest!="function")return;let Ce=W.closest("[data-root-dir]");if(!Ce)return;let K=Ce.getAttribute("data-root-dir")||"",ne=W.closest("[data-act]")?.getAttribute("data-act");if(ne==="worker"){t.gotoWorkerTab?.(K);return}if(ne==="auto"){te("worker-automation-toggle",K,{on:E(K)?.auto_advance!==!0});return}if(ne==="merge"){te("worker-merge-auto-toggle",K,{on:E(K)?.auto_merge!==!0});return}if(ne==="gear"){M(K);return}z(K)}function _e(B){if(B.key!=="Enter"&&B.key!==" ")return;let W=B.target;if(!W||typeof W.closest!="function")return;let Ce=W.closest('[data-root-dir][role="button"]');!Ce||Ce!==W||(B.preventDefault(),z(Ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ue),r.addEventListener("keydown",_e),{render:U,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",X),r.removeEventListener("click",ue),r.removeEventListener("keydown",_e),l.removeEventListener("click",j),D(),ut(c``,r),e.replaceChildren()}}}var A$=1e4,Em="bdui.monitor.done-range",Tm="bdui.monitor.running_sort",Rm="bdui.monitor.candidate_sort",Cm="beads-ui.monitor.candidate-filter",Om="beads-ui.monitor.sections";function S$(){try{let e=window.localStorage.getItem(Cm);if(!e)return{...Ms};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ms}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Ms.show_blocked,readiness:Io.some(n=>n.value===t.readiness)?t.readiness:"all",routes:es(t.routes)}}catch{return{...Ms}}}function lu(e){try{window.localStorage.setItem(Cm,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function E$(){try{let e=window.localStorage.getItem(Rm);return Oo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function T$(e){try{window.localStorage.setItem(Rm,e)}catch{}}function R$(){try{let e=window.localStorage.getItem(Om);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function C$(e){try{window.localStorage.setItem(Om,JSON.stringify(e))}catch{}}function O$(){try{let e=window.localStorage.getItem(Em);return e===null?"today":Yn(e)}catch{return"today"}}function I$(e){try{window.localStorage.setItem(Em,e)}catch{}}function L$(){try{return window.localStorage.getItem(Tm)==="repo"?"repo":"started"}catch{return"started"}}function N$(e){try{window.localStorage.setItem(Tm,e)}catch{}}var Im="tab:monitor:pipeline",D$=1e3,Am=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],P$=["queue","runnable","done"],Sm="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function M$(e){return e>=1&&e<=Sm.length?Sm[e-1]:`(${e})`}function Lm(e,t){let n=jt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,i=t.transport,o=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),_=O$(),h=L$(),g=S$(),E=E$(),y=R$(),te=Va("beads-ui.monitor.lane-collapsed"),J=!1,z=null,M=null,D=null,q=null,j=null,X=null,P=Is(()=>Y()),x=null,I=null,O=null,ae=null;function fe(p){return ae===null&&(ae=ce()),Pf(p,ae)}function ye(p,m){Q(),!(m<=0)&&(I={lane_id:p,corrected:m},O=setTimeout(()=>{O=null,I=null,Y()},A$))}function Q(){O!==null&&(clearTimeout(O),O=null),I=null}function le(){let p=ps.find(m=>m.value===_);return p?p.label:""}let pe=document.createElement("div");pe.className="mon",e.appendChild(pe);let Ne=document.createElement("div");Ne.className="worker-drawer-overlay",Ne.hidden=!0;let qe=document.createElement("div");qe.className="worker-drawer-overlay__backdrop";let Pe=document.createElement("div");Pe.className="worker-drawer-host mon2-drawer",Ne.append(qe,Pe),e.appendChild(Ne);let he=Tr(null,null),U=new Map,ue=new Map,_e=new Set,B=null,W=null,Ce=null,K=Hs(Pe,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{M=null,Ne.hidden=!0,Y()}}),ne=Xa({transport:i,console_el:pe,getLanes:()=>he,getWorkspaces:()=>s&&s.get?s.get():null,getCrossLanes:rn,reproject:p=>({lanes:V(p),raw_lanes:p}),onCorrection:ye,showToast:ve,requestRender:()=>Y(),adoptQueue:(p,m)=>{ue.set(p,m)},onDragBegin:()=>{D=null},candidate_drop:!0}),{applyDrop:se,dropModel:ce,runPlanned:Re,sendQueueCas:Z}=ne;async function Oe(p,m,S,C,re=!0){if(!i||!S)return null;let ge=await i(p,{...m,root_dir:S,expected_revision:C});if(ge&&ge.conflict&&re){ge.queue&&ue.set(S,ge.queue);let we=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:C;ge=await i(p,{...m,root_dir:S,expected_revision:we})}return ge&&ge.queue&&S&&ue.set(S,ge.queue),ge}function Me(p){let m=ue.get(p);if(m)return m;let S=s&&s.get?s.get():null;return(Array.isArray(S)?S:[]).find(C=>C?.root_dir===p)||{}}function Je(p,m){return Me(p)?.merge_queue?.find(C=>C.bead_id===m)?.continuation_action}async function je(p,m,S,C){let re=await Oe(p,m,S,C),ge=ue.get(S)?.revision??re?.queue?.revision??C;return Cr(re,(we,Ee)=>Oe(p,{...m,continuation:we,decision_token:Ee},S,ge,!1),{refresh:we=>Oe(p,m,S,we?.queue?.revision??ue.get(S)?.revision??ge,!1)})}async function ie(p,m,S,C){let re=await Cr({continuation_mismatch:C},(we,Ee)=>Oe("worker-merge-queue-add",{bead_id:m,continuation:we,decision_token:Ee},p,S,!1)),ge=re?.queue?.merge_queue?.find(we=>we.bead_id===m)?.continuation_action;re?.applied!==!0&&ge?.continuation===null&&ge.mismatch&&await ie(p,m,re.queue.revision,ge.mismatch)}async function ee(p,m,S){let C=await Oe("worker-discard",p,m,S);if(C&&C.discarded===!0){ve(Zi(C),"success",5e3);return}if(C&&C.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${C.reason}`,"error");return}if(C&&C.accepted&&C.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(C&&C.accepted){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${C.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}C&&!C.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Te(p,m,S,C){let re=await Oe("worker-discard-abandon",p,m,S);if(re&&re.abandoned===!0){ve(Qi(C),"success",5e3);return}if(re&&re.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${re.reason}`,"error");return}re&&!re.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function ft(p,m,S){return!i||!S?null:await i(p,{...m,root_dir:S})}async function _t(p,m,S){if(!_e.has(p)){_e.add(p),Y();try{let C=await Oe("worker-resolve-in-session",{bead_id:p},m,S,!1);C?.session==="already_running"?ve(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${C.tmux_window||"?"}`,"error"):C?.launched!==!0?ve(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${C?.reason||"unknown"}`,"error"):C.mode!=="fork"&&ve(`${typeof C.runner=="string"?C.runner:"claude"} \uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${C.fallback_reason||"unknown"})`,"success")}finally{_e.delete(p),Y()}}}async function He(){let p=new Map;for(let m of he.pr_wait)p.has(m.root_dir)||p.set(m.root_dir,m.expected_revision);for(let[m,S]of p)await Oe("worker-merge-queue-add-all",{},m,S)}function mt(p){let m=y[p];return!!(m&&m.runnable===!0)}function It(p){let m={...y[p]||{}};m.runnable=!m.runnable,y={...y,[p]:m},C$(y),Y()}function St(p){te.toggle(p),Y()}function st(p){te.toggleArea(p),Y()}function pt(p){let m=p.dependency_chips||null,S=p.overlap_chips||[],C=p.scope_state==="missing",re=p.armed_lane_chip;return!m&&S.length===0&&!C&&!re?null:{...m||{},...S.length>0?{overlaps:S}:{},...C?{scope_missing:!0}:{},...re?{armed_lane:re}:{}}}function Jt(p){return oa(p,m=>P.isOpen({bead_id:p.id,chip_key:m}))}function Mt(p){let m=pt(p),S=Jt(p);return m||S?{...p,...m?{dependency_chips:m}:{},...S?{chip_popover:S}:{}}:p}function Zt(p){let m=mt(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function v(p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${m}
    </div>`}function G(p){if(D!==p.id)return null;let m=he.queue_groups.find(ge=>ge.root_dir===p.root_dir),S=p.place_lanes||[],C=he.cross_lanes_revision!==null,re=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ge of he.chain_lanes)re.push({id:`lane:${ge.lane_id}`,label:`\uC5F0\uACB0 ${ge.number} (${ge.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ge.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!C});re.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!C,title:C?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ge of S)re.push({id:`serial:${ge.id}`,label:`\uC9C1\uB82C ${Number(ge.id.slice(1))}`,count:ge.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:re}}function De(p){return v(p,c`${rc(Mt(p),G(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(m,S)=>l(S,p.root_dir):void 0})}`)}function Ie(){return he.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${he.runnable.map(p=>De(p))}
      </div>`:c`${he.runnable_sections.map(p=>{let m=mt(p.root_dir);return c`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Zt({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${m?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(S=>De(S))}
            </div>`}
      </section>`})}`}function Fe(p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${m}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Hn(Mt(p),{actions:Ps(p,{nudgeable:!0})})}
    </div>`}function ze(p,m,S,C){return c`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${S}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${M$(m.seq)}</span
      >
      ${m.workspace_name?c`<span class="worker-mini__repo" title=${m.root_dir}
            >${m.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${m.id}</span>
      <span class="mon2-crow__title">${m.title}</span>
      ${m.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${C.includes(m.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${m.location_title}
        >${m.location_label}</span
      >
      ${Qr(m.route?{route:m.route,route_source:m.route_source??void 0}:null)}${m.exec_chips?Xr(m.exec_chips):""}
      ${Zl(m.added_at)}
      ${Jl({id:m.id,...typeof m.added_at=="number"?{added_at:m.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${m.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function oe(p){let m=he.cross_lanes_revision!==null,S=fe(p.lane_id),C=S?.held===!0,re=S?.cycle===!0,ge=S?S.mismatched:[],we=I&&I.lane_id===p.lane_id?I.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${we>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${we}건 자동 교정</span
            >`:""}
        ${re?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${C?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Aa}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!m||!p.can_confirm||C}
              title=${C?Aa:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!m}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((Ee,w)=>ze(p,Ee,w,ge))}
      </div>
    </div>`}function be(p,m,S){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.id}
      data-row-index=${S}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${Hn(Mt(m),{actions:Ps(m)})}
    </div>`}function Qe(p){if(p.length===0)return"";let m=p.length-1;return`${p[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function at(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Hn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function et(p,m){let S=m.occupants,C=m.cross_wait_peers||[];return{id:m.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${m.index+1}`,rows:[...S.map(re=>at(re)),...m.items.map((re,ge)=>be(m,re,ge))],count:m.items.length,empty:m.empty===!0,...S.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${S.map(re=>`${re.id} \u2014 ${re.badge}`).join(`
`)}
              >${Qe(S)}</span
            >`,held:!0}:{},cycle:m.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...C.length>0?{after:c`${C.map(re=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${re.workspace_name}·${re.lane}과 교차 대기
                </div>`)}`}:{}}}function ht(){let p=he.cross_lanes_revision!==null,m=he.chain_lanes.some(S=>S.draft&&S.rows.length===0);return ia({parallel:{rows:he.parallel_rows.map((S,C)=>Fe(S,C)),count:he.parallel_rows.length,collapsed:te.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:he.queue_groups.flatMap(S=>S.sublanes.serial.map(C=>({...et(S,C),drop:{drop:"repo-serial",root_dir:S.root_dir,lane_id:C.id,lane_length:String(C.raw_length)}}))),collapsed:te.isAreaCollapsed("serial"),extra_panes:he.chain_lanes.map(S=>oe(S)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${m||!p}
          title=${p?m?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...he.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function bt(p){return c`<div class="worker-rungrid">
      ${he.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:he.running.map(m=>iu({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",parked:m.run_state==="parked",retry_wait:m.run_state==="retry_wait",waiting:m.run_state==="waiting",wait:m.wait||null,provider_hold:m.run_state==="provider_hold",hold:m.hold?{...m.hold,open:j===m.attempt_id}:null,retry:m.retry||null,...typeof m.hold_since=="number"?{hold_since:m.hold_since}:{},status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":m.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":m.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":m.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":m.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:m.can_pause!==!1,...m.instructions_restart?{instructions_restart:m.instructions_restart}:{},exec_chips:m.exec_chips||null,usage:m.usage||null,chip_popover:Jt(m),discard:m.discard,failure:m.failure?{...m.failure,open:q===m.attempt_id}:null,...Vs(m.id,{discard:m.discard,parked:m.run_state==="parked"},_e.has(m.id))},p,M,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,cross_lane_chip:m.cross_lane_chip||null,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:pt(m)}}))}
    </div>`}function rt(p){let m={runnable:he.runnable,queue:he.queue,running:he.running,pr_wait:he.pr_wait,done:he.done},S=C=>{let re=m[C.lane],ge=C.lane==="runnable"?he.runnable_flat?re.length>0?Ie():void 0:he.runnable_sections.length>0?Ie():void 0:C.lane==="queue"?he.queue_groups.length>0||he.chain_lanes.length>0||he.parallel_rows.length>0||he.cross_lanes_unreadable?ht():void 0:C.lane==="running"?bt(p):re.length>0?c`${re.map(we=>Hn(Mt(we)))}`:void 0;return tr({id:`monitor-${C.lane}`,lane:C.pane,title:C.title,items:re,count:re.length,src:C.lane==="runnable",empty:C.empty,body:ge,live:C.lane==="running"&&re.length>0,collapsible:!0,collapsed:te.isCollapsed(C.pane),controls:C.lane==="runnable"?Ke():void 0,header_control:T(C.lane,re.length)})};if(J){let C=P$.map(re=>Am.find(ge=>ge.lane===re)).filter(re=>re!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${aa({live:he.running.length>0,running_body:he.running.length>0?bt(p):"",pr_wait_rows:he.pr_wait.map(re=>Hn(Mt(re))),count:he.running.length+he.pr_wait.length})}
            ${C.map(re=>S(re))}
          </div>
        </div>
        ${Gs(X?.draft||null,X?Me(X.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Am.map(C=>S(C))}
        </div>
      </div>
      ${Gs(X?.draft||null,X?Me(X.root_dir):{})}`}function Ke(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒
        blocked${he.runnable_hidden.blocked>0?` ${he.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Io.map(p=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${g.readiness===p.value?" is-active":""}"
              data-readiness=${p.value}
              aria-pressed=${g.readiness===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${he.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${he.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ts.map(p=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${g.routes.includes(p.value)?" is-active":""}"
              data-route=${p.value}
              aria-pressed=${g.routes.includes(p.value)?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${he.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${he.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function T(p,m){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${E}
      >
        ${Oo.map(S=>c`<option
              value=${S.value}
              ?selected=${E===S.value}
            >
              ${S.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${h}
      >
        <option value="started" ?selected=${h==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${h==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&m>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${ps.map(S=>c`<option value=${S.value} ?selected=${_===S.value}>
              ${S.label}
            </option>`)}
      </select>`:""}function V(p){let m=s&&s.get?s.get():null,S=s&&s.getWorkspacesState?s.getWorkspacesState():[],C=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,re={done_since:Ur(_,d()),running_sort:h,candidate_filter:g,candidate_sort:E};return C!==void 0&&(re.cross_lanes=C),Tr(m,S,re)}function Y(){if(e.hidden)return;let p=d();he=V(),ae=null,U=new Map;for(let m of[...he.runnable,...he.queue,...he.running,...he.pr_wait,...he.done])!m.non_occupying&&!U.has(m.id)&&U.set(m.id,m);ut(rt(p),pe),el(pe),xe()?.render(),Ae(),yt()}function Ae(){let p=new Map;for(let m of he.queue_groups)p.set(m.root_dir,m.auto_advance);for(let m of Array.from(pe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let S=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",C=p.get(S);typeof C=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${C?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function xe(){if(Ce)return Ce;let p=pe.querySelector(".mon2-deck");return p?(Ce=xm(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>he.done,rangeLabel:le,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:vt,onFocusChange:m=>{x=m,yt()}}),Ce):null}function yt(){pe.classList.toggle("has-focus",x!==null);for(let p of Array.from(pe.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",x!==null&&p.getAttribute("data-root-dir")===x);for(let p of Array.from(pe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=U.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",x!==null&&!!m&&m.root_dir===x)}for(let p of Array.from(pe.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",x!==null&&p.getAttribute("data-root-dir")===x)}function xt(p,m){let S=o?o():void 0;if(!m||!S||m===S||!a){r(p);return}a(m).then(()=>{r(p)}).catch(C=>{n("workspace switch for %s failed: %o",m,C)})}function vt(p){if(!p)return;let m=o?o():void 0,S=()=>{try{u?.gotoView("worker")}catch(C){n("gotoView(worker) failed: %o",C)}};if(!a||m&&m===p){S();return}a(p).then(S).catch(C=>{n("workspace switch for %s failed: %o",p,C),ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Lt(p){vn(p).then(m=>{ve(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function qt(p){let m=U.get(p)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}async function Gt(p,m,S){if(p!=="dep-add")return;let C=he.chain_lanes.find(re=>re.rows.some(ge=>ge.id===m));!C||!C.rows.some(re=>re.id===S)||await Re(re=>Bf(C.lane_id,re),"",[{type:p,a:m,b:S}])}function rn(){return(s&&s.crossLanes?s.crossLanes():null)??null}async function kt(p,m){if(p==="run"){await un(m);return}if(p==="stop"){await Ut(m);return}if(p==="create"){await Re(S=>xc(null,S),"");return}if(p==="remove"){let S=Wf(m,ce());if(S!==null&&!f(S))return;await Re(C=>Uf(m,C),"");return}await Re(S=>p==="confirm"?jf(m,S):Ff(m,S),"")}function en(p){let m=new Map;for(let S of p.rows){let C=he.owner_of[S.id]||S.root_dir;typeof C!="string"||C.length===0||m.set(C,[...m.get(C)||[],S.id])}return m}async function un(p){let m=he.chain_lanes.find(ge=>ge.lane_id===p);if(!m||he.cross_lanes_revision===null){Y();return}Q();let S=new Map,C=new Map,re=en(m);for(let ge of m.rows){if(ge.fixed||!ge.unplaced)continue;let we=he.owner_of[ge.id]||ge.root_dir;if(typeof we!="string"||we.length===0){ve(`${ge.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Y();return}let Ee=C.get(we)??0;if(await Z("worker-queue-place",{bead_id:ge.id,lane:"parallel",index:(he.parallel_raw_length[we]??0)+Ee},we,S,{bead_id:ge.id})===null){Y();return}C.set(we,Ee+1)}for(let[ge,we]of re)if(await Z("worker-queue-arm",{bead_ids:we,lane_id:p},ge,S,{bead_id:we[0]})===null){ve("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Y();return}Y()}async function Ut(p){let m=he.chain_lanes.find(C=>C.lane_id===p);if(!m||he.cross_lanes_revision===null){Y();return}Q();let S=new Map;for(let[C,re]of en(m))if(await Z("worker-queue-disarm",{lane_id:p},C,S,{bead_id:re[0]})===null)break;Y()}async function Vt(p,m,S,C){if(!i||!Number.isFinite(m)||S.length===0)return;let re=await i(p,{since:m,root_dir:S});re&&re.queue&&ue.set(S,re.queue),re&&re.ok===!1&&ve(`${C}: ${re.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":re.reason||""}`,"error",2800),Y()}async function Xt(p,m){await Vt("worker-queue-hold-resume",p,m,"\uC7AC\uAC1C \uAC70\uBD80")}async function Ve(p,m){await Vt("worker-queue-hold-retry-now",p,m,"\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80")}async function N(p,m){if(!i||!p||m.length===0){Y();return}let S=await i("worker-queue-start-now",{bead_id:p,root_dir:m});S&&S.queue&&ue.set(m,S.queue),S&&S.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${S.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":S.reason||""}`,"error",2800),Y()}async function $e(p,m){let{root_dir:S,revision:C}=qt(p);if(S.length===0){Y();return}await Z("worker-queue-disarm",{bead_ids:[p],lane_id:m},S,new Map([[S,C]]),{bead_id:p}),Y()}async function Ue(p,m){let S=U.get(p);if(!S){Y();return}let C={kind:"candidate",bead_id:p,root_dir:S.root_dir};if(m==="new-lane"){await Re(re=>xc({bead_id:p,root_dir:S.root_dir},re),p);return}if(m.startsWith("lane:")){let re=m.slice(5);if(!he.chain_lanes.find(we=>we.lane_id===re)){Y();return}await Re(we=>Ea(C,{kind:"chain",lane_id:re,marker_index:(we.cross_lanes.get(re)?.entries??[]).length},we),p);return}if(m.startsWith("serial:")){let re=m.slice(7),ge=(S.place_lanes||[]).find(we=>we.id===re);await se(C,{kind:"repo-serial",root_dir:S.root_dir,lane_id:re,index:ge?ge.index:0});return}await se(C,{kind:"parallel",marker_index:he.parallel_rows.length})}async function wt(p,m){let S=he.parallel_rows,C=S.findIndex(R=>R.id===p);if(C<0)return;let re=S[C].root_dir,ge=[];S.forEach((R,Le)=>{R.root_dir===re&&ge.push(Le)});let we=ge.indexOf(C),Ee=ge[we+m];if(typeof Ee!="number")return;let w=m===-1?Ee:ge[we+2]??Math.min(S.length,Ee+1);await se({kind:"parallel",bead_id:p,root_dir:re,queue_index:S[C].queue_index??0},{kind:"parallel",marker_index:w})}async function tt(p){for(let m of he.chain_lanes){let S=m.rows.find(C=>C.id===p);if(S){await se({kind:"chain",bead_id:p,root_dir:S.root_dir,lane_id:m.lane_id,...typeof S.queue_index=="number"?{queue_index:S.queue_index}:{}},{kind:"parallel",marker_index:he.parallel_rows.length});return}}}function Et(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Tt(p,m,S,C,re={}){let ge=U.get(p)||null;js({context:{bead_id:p,kind:C,tuple:ge?On(ge):""},transport:we=>Oe("worker-attempt-resume",{attempt_id:m,...re,...we},S,ue.get(S)?.revision??qt(p).revision,!1)})}function lt(p,m,S,C){let re=Me(S)?.attempts?.[m]||null;xa({context:{bead_id:p,kind:C,attempt_id:m,tuple:re?Ui(re):""},pause:()=>ft("worker-attempt-pause",{attempt_id:m,require_durable:!0},S),resume:ge=>Oe("worker-attempt-resume",{attempt_id:m,...ge},S,ue.get(S)?.revision??qt(p).revision,!1),snapshot:()=>Me(S)})}function Bt(){X=null,Y()}function An(){let p=X,m=p?Ja(p.draft):null;!p||!m||(X=null,Y(),Tt(p.bead_id,m.attempt_id,p.root_dir,"session",m.payload))}function $t(p,m){let{item:S,root_dir:C,revision:re}=qt(m),ge=S?.attempt_id||"",we=p.classList;if(we.contains("worker-mini__rowops-up")||we.contains("worker-mini__rowops-down")){wt(m,we.contains("worker-mini__rowops-up")?-1:1);return}if(we.contains("worker-mini__rowops-remove")){Oe("worker-queue-remove",{bead_id:m},C,re);return}if(we.contains("worker-mini__start-now")){N(m,C);return}if(we.contains("worker-mini__hold-resume")){Xt(Number(p.getAttribute("data-since")),C);return}if(we.contains("rtile__hold-retry")){Ve(Number(p.getAttribute("data-since")),C);return}if(we.contains("mon2-crow__detach")){tt(m);return}if(we.contains("worker-dep__open")){xt(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(we.contains("mon2-arm__release")){$e(m,p.getAttribute("data-lane-id")||"");return}if(we.contains("mon-lane__chip")){let Ee=p.getAttribute("data-lane-id")||"";pe.querySelector(`.mon2-clane[data-lane-id="${Ee}"]`)?.scrollIntoView({block:"nearest"});return}if(we.contains("judgement-chip")){let Ee=p.getAttribute("data-chip-key")||"";Ee&&P.toggle({bead_id:m,chip_key:Ee});return}if(we.contains("rtile__failure-badge")){q=q===ge?null:ge,Y();return}if(we.contains("rtile__provider-hold-badge")){j=j===ge?null:ge,Y();return}if(we.contains("rtile__attempt-copy")){let Ee=p.getAttribute("data-attempt-id")||"";Ee&&vn(Ee).then(w=>{ve(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)});return}if(we.contains("worker-card__place")){D=D===m?null:m,Y();return}if(we.contains("worker-card__place-cancel")){D=null,Y();return}if(we.contains("worker-card__place-lane")){let Ee=p.getAttribute("data-lane")||"parallel";D=null,Ue(m,Ee);return}if(we.contains("rtile__session")){if(S&&S.kind==="session"){let Ee=(S.session_refs||[]).find(w=>w&&w.current===!0);Ee&&(Ne.hidden=!1,K.open(Fs(Ee,m,"in_progress",C)),Y());return}M=ge,ge&&S&&(Ne.hidden=!1,K.open({attempt_id:ge,root_dir:C,meta:Et(S)})),Y();return}if(we.contains("rtile__restart-instructions")){lt(m,ge,C,"restart");return}if(we.contains("rtile__resume-instructions")){lt(m,ge,C,"resume_recorded");return}if(we.contains("rtile__pause")){ft("worker-attempt-pause",{attempt_id:ge},C);return}if(we.contains("rtile__resume-alternate")){let Ee=Qa(ge,Me(C));Ee&&(X={root_dir:C,bead_id:m,draft:Ee},Y());return}if(we.contains("rtile__resume")){Tt(m,ge,C,p.dataset.resumeKind==="settlement"?"settlement":"session");return}if(we.contains("rtile__resolve")){_t(m,C,ue.get(C)?.revision??qt(m).revision);return}if(we.contains("rtile__discard-abandon")){let Ee={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!f(So(m,Ee)))return;Te({bead_id:m,operation_id:p.dataset.operationId||""},C,re,Ee);return}if(we.contains("rtile__discard")){let Ee=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Ao(m,Ee)))return;ee({bead_id:m,...ge?{attempt_id:ge}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},C,re);return}if(we.contains("worker-mini__merge")){let Ee=Je(C,m);Ee?.mismatch&&Ee.continuation===null?ie(C,m,re,Ee.mismatch):Oe("worker-merge-queue-add",{bead_id:m},C,re);return}if(we.contains("worker-mini__merge-cancel")){Oe("worker-merge-queue-remove",{bead_id:m},C,re);return}if(we.contains("worker-mini__discard-abandon")){let Ee={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!f(So(m,Ee)))return;Te({bead_id:m,operation_id:p.dataset.operationId||""},C,re,Ee);return}if(we.contains("worker-mini__discard")){let Ee=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Ao(m,Ee)))return;ee({bead_id:m,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},C,re);return}if(we.contains("worker-mini__revise-fix")){je("worker-revise-fix",{bead_id:m},C,re);return}we.contains("worker-mini__revise-approve")&&Oe("worker-revise-approve",{bead_id:m},C,re)}function bn(p){let m=ne.consumeClickSuppression(),S=p.target;if(!S||typeof S.closest!="function")return;if(S.closest(".provider-resume-dialog__cancel")){Bt();return}if(S.closest(".provider-resume-dialog__confirm")){An();return}if(S.closest("dialog")||S.closest(".worker-drawer-overlay")||S.closest("a"))return;let C=S.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(C){p.preventDefault();let Dt=S.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||C.textContent?.trim()||"";Dt&&Lt(Dt);return}let re=S.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(re){p.preventDefault();let Rt=re.getAttribute("data-root-dir")||U.get(S.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||re.getAttribute("title")||"";vt(Rt);return}let ge=S.closest(".mon2-sec__toggle");if(ge){p.preventDefault(),It(ge.getAttribute("data-root-dir")||"");return}let we=S.closest(".worker-pane__toggle[data-lane]");if(we){p.preventDefault();let Rt=we.getAttribute("data-lane")||"";(Rt==="candidate"||Rt==="queue"||Rt==="running"||Rt==="pr_wait"||Rt==="done")&&St(Rt);return}let Ee=S.closest(".worker-wait__area-toggle[data-area]");if(Ee){p.preventDefault(),st(Ee.getAttribute("data-area")||"parallel");return}if(S.closest(".mon2-newlane")){p.preventDefault(),kt("create","");return}let w=S.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(w){p.preventDefault();let Rt=w.getAttribute("data-lane-id")||"",Dt=w.classList;kt(Dt.contains("mon2-clane__confirm")?"confirm":Dt.contains("mon2-clane__reapply")?"reapply":Dt.contains("mon2-clane__run")?"run":Dt.contains("mon2-clane__stop")?"stop":"remove",Rt);return}if(S.closest(".mon-merge-all")){p.preventDefault(),He();return}let R=S.closest(".mon-filter__route");if(R){p.preventDefault(),g={...g,routes:ya(g.routes,R.getAttribute("data-route")||"")},lu(g),Y();return}let Le=S.closest(".mon-filter__readiness");if(Le){p.preventDefault(),g={...g,readiness:Le.getAttribute("data-readiness")||"all"},lu(g),Y();return}let Be=S.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Be)return;let ot=Be.getAttribute("data-bead-id")||"",gt=S.closest("button");if(gt){p.preventDefault(),$t(gt,ot);return}S.closest(".rtile__failure-pop, .chip-popover")||ot&&!m&&(p.preventDefault(),xt(ot,Be.getAttribute("data-root-dir")||qt(ot).root_dir))}function _n(p){let m=p.target;if(!m||typeof m.closest!="function")return;if(X){let we=Za(X.draft,m,Me(X.root_dir));if(we){we!==X.draft&&(X={...X,draft:we},Y());return}}let S=m.closest(".mon-filter__blocked");if(S){g={...g,show_blocked:S.checked},lu(g),Y();return}let C=m.closest(".mon-candidate-sort");if(C){E=Oo.some(we=>we.value===C.value)?C.value:"repo_spec",T$(E),Y();return}let re=m.closest(".mon-running-sort");if(re){h=re.value==="repo"?"repo":"started",N$(h),Y();return}let ge=m.closest(".mon-done-range");ge&&(_=Yn(ge.value),I$(_),Y())}function mn(p){let m=p.target,S=m&&typeof m.closest=="function"?re=>m.closest(re):()=>null,C=!1;q&&!S(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,C=!0),j&&!S(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(j=null,C=!0),C&&Y()}function nt(p){p.key==="Escape"&&(q===null&&j===null&&X===null||(q=null,j=null,X=null,Y()))}e.addEventListener("click",bn),e.addEventListener("change",_n),document.addEventListener("click",mn),document.addEventListener("keydown",nt),P.attach(),ne.attach(e);{let p=!0;z=Ga(m=>{if(J=m,p){p=!1;return}Y()})}s&&typeof s.subscribe=="function"&&(B=s.subscribe(()=>{try{ue.clear(),Y()}catch{}}));function A(){W!==null&&(clearInterval(W),W=null)}return{recorrectSharedLane:Gt,load(){n("load"),Y(),W===null&&(W=setInterval(()=>{try{Y()}catch{}},D$))},pause(){A()},clear(){A(),Q(),ne.detach(),B&&(B(),B=null),z&&(z(),z=null),K.destroy(),Ne.hidden=!0,Ce?.destroy(),Ce=null,e.removeEventListener("click",bn),e.removeEventListener("change",_n),document.removeEventListener("click",mn),document.removeEventListener("keydown",nt),P.detach(),e.replaceChildren()}}}var q$=["board","worker","monitor","compare","adr"];function Nm(e,t,n){let r=jt("views:nav"),{global_element:s,repo_element:i}=e,o=null;function l(_){return h=>{h.preventDefault();let g=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",g),n.gotoView(g)}}function a(){let _=t.getState();return q$.includes(_.view)?_.view:"board"}function u(){let _=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/monitor"
          class="ctl-tab ctl-tab--monitor ${_==="monitor"?"is-active":""}"
          @click=${l("monitor")}
        >
          <span class="ctl-tab__dots" aria-hidden="true"
            ><i></i><i></i><i></i><i></i
          ></span>
          Monitor
        </a>
        <a
          href="#/compare"
          class="ctl-tab ctl-tab--compare ${_==="compare"?"is-active":""}"
          @click=${l("compare")}
          >비교</a
        >
        <a
          href="#/adr"
          class="ctl-tab ctl-tab--adr ${_==="adr"?"is-active":""}"
          @click=${l("adr")}
          >ADR</a
        >
      </div>
    `}function d(){let _=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${_==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${_==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){s&&ut(u(),s),i&&ut(d(),i)}return f(),o=t.subscribe(()=>f()),{destroy(){o&&(o(),o=null),s&&ut(c``,s),i&&ut(c``,i)}}}var Dm=["Critical","High","Medium","Low","Backlog"];function Pm(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),i=n.querySelector("#new-type"),o=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function h(){i.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",i.appendChild(D);for(let q of Ei){let j=document.createElement("option");j.value=q,j.textContent=Cd(q),i.appendChild(j)}o.replaceChildren();for(let q=0;q<=4;q+=1){let j=document.createElement("option");j.value=String(q);let X=Dm[q]||"Medium";j.textContent=`${q} \u2013 ${X}`,o.appendChild(j)}}h();function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function E(D){s.disabled=D,i.disabled=D,o.disabled=D,l.disabled=D,a.disabled=D,d.disabled=D,f.disabled=D,f.textContent=D?"Creating\u2026":"Create"}function y(){u.textContent=""}function te(D){u.textContent=D}function J(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?i.value=D:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?o.value=q:o.value="2"}catch{i.value="",o.value="2"}}function z(){let D=i.value||"",q=o.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function M(){y();let D=String(s.value||"").trim();if(D.length===0){te("Title is required"),s.focus();return}let q=Number(o.value||"2");if(!(q>=0&&q<=4)){te("Priority must be 0..4"),o.focus();return}let j=String(i.value||""),X=String(a.value||""),P={title:D};j.length>0&&(P.type=j),String(q).length>0&&(P.priority=q),X.length>0&&(P.description=X),E(!0);try{await t("create-issue",P)}catch{E(!1),te("Failed to create issue");return}z(),E(!1),g()}return n.addEventListener("cancel",D=>{D.preventDefault(),g()}),_.addEventListener("click",()=>g()),d.addEventListener("click",()=>g()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),M())}),r.addEventListener("submit",D=>{D.preventDefault(),M()}),{open(){r.reset(),y(),J();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){g()}}}var j$=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function F$(e,t){return xl(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Mm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=F$(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function qm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
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
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function jm(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${j$.map(([n,r])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var B$=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Fm(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,i=t.notify||(ae=>ve(ae,"error",4e3)),o=document.createElement("dialog");o.id="settings-dialog",o.className="settings-dialog",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","\uC124\uC815"),e.appendChild(o);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ae=o.querySelector('[data-pane="execution"]');return ae?(d=nl(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),d):null}function _(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function h(){let ae=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${ae?c`
              ${Mm(ae,s(),te)}
              ${qm(ae,u,{onDraft:fe=>{u=fe},onAdd:J,onRemove:z})}
              ${jm(ae,M)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function g(ae){let fe=r.get();if(fe)try{let ye=await n("display-policy-set",{expected_revision:fe.revision,policy:ae(fe)});E(ye),ye&&ye.conflict&&ye.policy&&(ye=await n("display-policy-set",{expected_revision:ye.policy.revision,policy:ae(ye.policy)}),E(ye)),ye&&ye.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function E(ae){ae&&ae.policy&&typeof ae.policy=="object"&&r.set(ae.policy)}function y(ae){g(ae)}function te(ae){let fe=r.get();if(!fe)return;let ye=!U$(ae,fe);y(Q=>W$(ae,Q,ye))}function J(){let ae=u.trim();ae.length!==0&&(u="",y(fe=>fe.hidden_prefixes.includes(ae)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,ae]}),D())}function z(ae){y(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(ye=>ye!==ae)}))}function M(ae){let fe=r.get();if(!fe)return;let ye=fe.chips[ae]===!1;y(()=>({chips:{[ae]:ye}}))}function D(){ut(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${B$.map(ae=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(l===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>q(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${O}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${h()}
          </div>
        </div>
      `,o),f()}function q(ae){l=ae,D()}let j=()=>{a=!1,t.onOpenChange?.(!1)};o.addEventListener("close",j),o.addEventListener("cancel",j);let X=ae=>{ae.target===o&&O()};o.addEventListener("click",X);let P=null;r.subscribe&&(P=r.subscribe(()=>{a&&D()}));let x=null;t.implPresetStore?.subscribe&&(x=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function I(ae="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ae,u="",D(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""),f()?.load())}function O(){a&&(a=!1,t.onOpenChange?.(!1),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:O,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,o.removeEventListener("close",j),o.removeEventListener("cancel",j),o.removeEventListener("click",X),P&&(P(),P=null),x&&(x(),x=null),d?.destroy(),d=null,o.remove()}}}function U$(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function W$(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var H$=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Bm="usage-meter-card",z$="usage-meter-layer",cu=600,K$=["token_expired","relogin_required"];function Um(e){return String(e).padStart(2,"0")}function G$(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${i>0?` ${i}m`:""}`:`${i}m`}function Wm(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),i=`${Um(r.getHours())}:${Um(r.getMinutes())}`,l=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?i:`${H$[r.getMonth()]} ${r.getDate()} ${i}`;return`${G$(n,t)} \xB7 ${l}`}function V$(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Hm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function zm(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Km=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Vm(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Y$(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Vm(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function X$(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let o=Y$(i);o&&r.push(o)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Vm(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Q$(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=X$(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Ym(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Z$(e,t){return!e.held||Ym(e,t)<=cu?e:{...e,available:!1,windows:[],accounts:[]}}function Gm(e,t){return`${e}:${t}`}function Xm(e){let t=!1,n=null,r=new Map,s=null,i=new Map,o=new Map,l=0,a=null;function u(){ut(c``,e),e.hidden=!0,f()}function d(){if(a===null){let Q=e.ownerDocument;a=Q.createElement("div"),a.id=z$,a.className="usage-meter__layer",Q.body.appendChild(a)}return a}function f(){a!==null&&(ut(c``,a),a.remove(),a=null)}function _(Q){n!==Q&&(n===null&&(document.addEventListener("mousedown",g),document.addEventListener("keydown",y),window.addEventListener("resize",E)),n=Q)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",y),window.removeEventListener("resize",E))}function g(Q){let le=Q.target;le&&(e.contains(le)||a!==null&&a.contains(le))||(h(),O())}function E(){O()}function y(Q){Q.key==="Escape"&&(h(),O())}function te(Q){n===Q?h():_(Q),O()}function J(){h(),O()}async function z(Q,le){if(r.has(Q.key))return;let pe=Gm(Q.key,le);r.set(Q.key,le),o.delete(pe),O();let Ne=null;try{Ne=await(await fetch(Q.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:le})})).json()}catch{Ne=null}if(t)return;if(r.delete(Q.key),!Ne||Ne.ok!==!0){let Pe=Ne&&typeof Ne.error=="string"&&Ne.error.length>0?Ne.error:"network_error";o.set(pe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Pe}`}),O();return}let qe=Array.isArray(Ne.warnings)?Ne.warnings.filter(Pe=>typeof Pe=="string"&&Pe.length>0):[];qe.length>0&&o.set(pe,{kind:"warn",text:qe.join(" \xB7 ")}),O(),await ye()}function M(Q,le,pe,Ne){let qe=zm(Q.pct),he=`resets ${Wm(Q.resetsAt,Ne)}${le?` \xB7 ${pe}`:""}`;return c`<span
      class="usage-meter__window ${Hm(qe)}"
      style=${`--progress: ${qe}%`}
      title=${he}
    >
      <span class="usage-meter__label">${Q.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${qe}%</span>
    </span>`}function D(Q,le,pe){let Ne=Ym(le,pe),qe=le.available&&(le.held||Ne>cu),Pe=qe?`${Math.floor(Ne/60)}\uBD84 \uC804 \uCE21\uC815`:"",he=le.accounts.filter(B=>!B.active).length,U=`usage-meter__group${qe?" usage-meter__group--stale":""}`,ue=c`<span class="usage-meter__provider"
        >${Q.label}</span
      >
      ${le.available?le.windows.map(B=>M(B,qe,Pe,pe)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${he>0?c`<span class="usage-meter__badge">+${he}</span>`:""}`;if(le.accounts.length===0)return c`<span
        class=${U}
        aria-label=${`${Q.label} usage`}
        >${ue}</span
      >`;let _e=n===Q.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${U}`}
      aria-label=${`${Q.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${Bm}
      @click=${()=>te(Q.key)}
    >
      ${ue}
    </button>`}function q(Q,le){return c`<span class="usage-meter" aria-label="Usage">
      ${Q.map(pe=>D(pe.provider,pe.snapshot,le))}
    </span>`}function j(Q,le){let pe=zm(Q.pct),Ne=Wm(Q.resetsAt,le);return c`<span
      class="usage-meter__account-window ${Hm(pe)}"
      style=${`--progress: ${pe}%`}
    >
      <span class="usage-meter__account-key">${Q.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${pe}%</span>
      <span class="usage-meter__account-reset"
        >${Ne.length>0?`\u21BB ${Ne}`:""}</span
      >
    </span>`}function X(Q,le){return K$.includes(le)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${Q.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function P(Q,le,pe){let Ne=le.status==="ok",qe=typeof le.ageSeconds=="number"&&le.ageSeconds>cu,Pe=o.get(Gm(Q.key,le.number)),he=r.get(Q.key),U=he!==void 0,ue=he===le.number,_e=["usage-meter__account"];return le.active&&_e.push("usage-meter__account--active"),Ne||_e.push("usage-meter__account--unavailable"),qe&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${le.email}
          >${le.alias===null?le.email:le.alias}</span
        >
        ${le.plan===null?"":c`<span class="usage-meter__account-tag">${le.plan}</span>`}
        ${le.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${le.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${V$(le.ageSeconds)}</span
            >`}
        ${le.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${U}
              @click=${()=>{z(Q,le.number)}}
            >
              ${ue?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ne?c`<div class="usage-meter__account-windows">
            ${le.windows.map(B=>j(B,pe))}
          </div>`:c`<div class="usage-meter__account-status">
            ${X(Q,le.status)}
          </div>`}
      ${Pe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Pe.kind}"
          >
            ${Pe.text}
          </div>`}
    </div>`}function x(Q,le,pe){let Ne=le.accounts.filter(qe=>qe.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${Q.label} · 활성 ${Ne} / 전체
        ${le.accounts.length}
      </h2>
      ${le.accounts.map(qe=>P(Q,qe,pe))}
    </section>`}function I(Q,le){return c`<div
      class="usage-meter__card"
      id=${Bm}
      role="dialog"
      aria-label=${`${Q.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${x(Q.provider,Q.snapshot,le)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function O(){let Q=Date.now(),le=[];for(let Ne of Km){let qe=i.get(Ne.key);qe&&le.push({provider:Ne,snapshot:Z$(qe,Q)})}if(le.length===0){h(),u();return}let pe=le.find(Ne=>Ne.provider.key===n&&Ne.snapshot.accounts.length>0);pe||h(),ut(q(le,Q),e),e.hidden=!1,pe?ae(pe,Q):f()}function ae(Q,le){let pe=d(),Ne=e.getBoundingClientRect(),qe=e.ownerDocument.documentElement.clientWidth;pe.style.setProperty("--usage-meter-anchor-top",`${Ne.bottom}px`),pe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,qe-Ne.right)}px`),ut(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${J}
        ></div>
        ${I(Q,le)}`,pe)}async function fe(Q){try{let le=await fetch(Q.endpoint);return le.ok?Q$(await le.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ye(){l+=1;let Q=l,le=await Promise.all(Km.map(async pe=>({provider:pe,read:await fe(pe)})));if(!(t||Q!==l)){for(let pe of le){let Ne=pe.provider.key;if(pe.read.kind==="ok"){i.set(Ne,pe.read.snapshot);continue}if(pe.read.kind==="empty"){i.delete(Ne);continue}let qe=i.get(Ne);qe!==void 0&&!qe.held&&i.set(Ne,{...qe,held:!0})}O()}}return u(),ye(),s=setInterval(()=>{ye()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function Ys(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Jm="bdui.worker.candidate_sort",Jo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),sl=Object.freeze({preset:"spec"}),eg=3,tg=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Qm(e){return Jo.some(t=>t.id===e)}function Zm(e){let t=Jo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function J$(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ei(e){return e&&"preset"in e?Zm(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Zm("spec")}function uu(e){return e&&"preset"in e?e.preset:null}function is(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Qm(e)?{preset:e}:sl}return is(i)}if(!e||typeof e!="object")return sl;let t=e;if(Qm(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>eg||!n.every(gl))return sl;let r=[];for(let i of n)r.some(o=>o.key===i.key)||r.push({key:i.key,dir:i.dir});let s=Jo.find(i=>J$(i.chain,r));return s?{preset:s.id}:{chain:r}}function ng(){try{return is(window.localStorage.getItem(Jm))}catch{return sl}}function du(e){try{window.localStorage.setItem(Jm,JSON.stringify(e))}catch{}}function rg(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(mi,n))return r;let s=n;if(r.slice(0,t).some(a=>a.key===s))return r.slice(0,t);let i={key:s,dir:r[t]&&r[t].key===s?r[t].dir:mi[s]},o=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==s);return[...o,i,...l].slice(0,eg)}function sg(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function ex(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ys(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let s=new Set,i=[],o=l=>{s.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!s.has(a.id)&&(n.get(a.id)??[]).every(u=>s.has(u))&&o(a)};for(;i.length<e.length;){let l=e.find(a=>!s.has(a.id)&&(n.get(a.id)??[]).every(u=>s.has(u)));o(l??e.find(a=>!s.has(a.id)))}return i}function og(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Yu(ei(t))),ex(n)}function ig(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],i=new Set;for(let o of t){if(i.has(o.id))continue;i.add(o.id);let l=r[o.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(o.id,{overlaps:[],scope_missing:!0});continue}n.set(o.id,{overlaps:[],scope_missing:!1}),s.push({member:o,scope:a})}for(let o=0;o<s.length;o+=1)for(let l=o+1;l<s.length;l+=1){let a=Ki(s[o].scope,s[l].scope);if(a.length===0)continue;let u=s[o].member,d=s[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var ag=new Set(["sh","bash","zsh","dash","ksh"]),lg=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function cg(e){let t=e.split("/");return t[t.length-1]||""}function tx(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=cg(n[0]);if(r!=="env")return ag.has(r);let s=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return s!==void 0&&ag.has(cg(s))}function nx(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function rx(e){let t=[],n=0;lg.lastIndex=0;for(let r of e.matchAll(lg)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:nx(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sx(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function ug(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,i="loading",o="",l="",a=0,u=null,d=!1;function f(D,q){return q?rx(D).map(j=>j.kind==="plain"?j.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${j.kind}"
            >${j.text}</span
          >`):D}function _(){if(!s)return c``;let D=i==="ready"&&tx(o),q=i==="ready"?o.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{g()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>z()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${q.map((j,X)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${X+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(j,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){ut(_(),r)}async function g(){if(i!=="ready")return;let D=await vn(o);ve(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function E(D){D.key==="Escape"&&s&&(D.preventDefault(),z())}function y(){d||(document.addEventListener("keydown",E),d=!0)}function te(){d&&(document.removeEventListener("keydown",E),d=!1)}async function J(D,q=null){let j=++a;y(),s={...D},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",o="",l="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let P=t?t():"";if(!P){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let x="/api/repo-ops-script?workspace="+encodeURIComponent(P)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let I=await n(x),O=await I.json().catch(()=>({}));if(j!==a)return;if((t?t():"")!==P){z();return}if(!I.ok||!O||O.ok!==!0){i="error",l=sx(O&&typeof O.error=="string"?O.error:""),h();return}s={lane:O.lane,base_sha:O.base_sha,path:O.path,base_ref:O.base_ref},o=String(O.content),i="ready",h()}catch{if(j!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function z(){a+=1,te(),s=null,o="",h();let D=u;u=null,D?.isConnected&&D.focus()}function M(){z(),r.remove()}return{open:J,close:z,destroy:M}}var dg={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},ox=new Set(["queued","running","retry_pending"]);function pg(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function i(){return t&&t.get()||{}}function o(){let x=i();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function a(){let x=i().workspace_info;return x&&typeof x=="object"?x:{}}function u(x,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${I}</span
    >`}function d(x){if(typeof x!="number"||!Number.isFinite(x))return"";let I=x/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function f(x){let I=d(x);return I?u("config",I):""}function _(x,I,O){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${O.script}
      @click=${ae=>{s&&s({lane:x,base_sha:I.base_sha,path:O.script,base_ref:I.base_ref},ae.currentTarget)}}
    ></button>`}function h(){let x=i().repo_operations;return Array.isArray(x)?x:[]}function g(){let x=a().repo_ops,I=x&&typeof x=="object"?x.repo_id:null;return typeof I=="string"&&I?I:null}function E(){return h().some(x=>x&&x.kind==="deploy"&&ox.has(x.state))}function y(){let x=E(),I=g()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${x||I}
      title=${x?"\uBC30\uD3EC \uC9C4\uD589 \uC911":I?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function te(){let x=i().repo_ops_opt_out;return{verify:x?.verify===!0,deploy:x?.deploy===!0}}function J(x,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${O=>{D(x,!O.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z(x){let I=typeof x.base_sha=="string"?x.base_sha:"",O=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,ae=te(),fe=!!x.verify&&ae.verify,ye=!!x.deploy&&ae.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${O}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?c`${_("verify",x,x.verify)}
              ${f(x.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${x.verify?J("verify",ae.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?c`${_("deploy",x,x.deploy)}
              ${f(x.deploy.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):y()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":x.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${x.deploy?J("deploy",ae.deploy):""}
      </div>
    </section>`}function M(x){let I=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?z(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${I.error_code?c` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function D(x,I){if(!n)return;let O=await n("worker-repo-ops-opt-out-toggle",{kind:x,opted_out:I,expected_revision:o()});if(l(O),O&&O.conflict){let ae=await n("worker-repo-ops-opt-out-toggle",{kind:x,opted_out:I,expected_revision:o()});l(ae)}r()}async function q(){let x=g();if(!n||x===null)return;let I=await n("worker-repo-operation-deploy-run",{repo_id:x});if(l(I),!I||I.ok!==!0){let O=I&&typeof I.reason=="string"?I.reason:"",ae=Object.hasOwn(dg,O)?dg[O]:O||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ve(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ae}`,"error")}else ve("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let j={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function X(x,I,O){return c`<div class="worker-repo-ops__policy-group" data-policy=${O}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(ae=>c`<li data-token=${ae}>
              ${j[ae]||ae}
            </li>`)}
      </ul>
    </div>`}function P(){let x=i(),I=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null;return I?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(I.worker_automatic||[]).length} · 금지
            ${(I.never_automatic||[]).length}</span
          >
        </summary>
        ${I.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${I.schema_version})`}
            </div>`:""}
        ${X("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",I.worker_automatic||[],"worker-automatic")}
        ${X("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",I.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${M(a())} ${P()}
      </details>`}}}var mg=20,ix=5,ax=new Set(["failed","running","queued","retry_pending"]),pu={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},fg={verify:"verify",deploy:"deploy",job:"deploy"};function lx(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function cx(e){return!e||typeof e!="object"?"":e.kind==="job"?lx(e.script_path)||pu.job:Object.hasOwn(pu,e.kind)?pu[e.kind]:e.kind}function ux(e,t,n=mg){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,i)=>s.at===null&&i.at===null?String(s.id||"").localeCompare(String(i.id||"")):s.at===null?1:i.at===null?-1:i.at-s.at),r.slice(0,Math.max(0,n))}function dx(e){if(e.type==="cleanup")return!0;let t=e.operation;return ax.has(t.state)&&!t.dismissed&&!t.superseded_by}function px(e,t,n={}){let r=ux(e,t,1/0),s=n.expanded===!0?mg:ix,i=new Set(r.slice(0,s)),o=r.filter(l=>i.has(l)||dx(l));return{visible:o,hidden:r.length-o.length}}function _g(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function fx(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function gg(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Gr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function hg(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function _x(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(fg,n))return;let r=e[fg[n]],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function mx(e,t){let n=Qp(e,t),r=Zp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function gx(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function hx(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${Xi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${_g(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${cx(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Yi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Yr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${_g(e)}"
          >${fx(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?hg(Xp(n.failure_kind,s)):""}
      ${mx(n,_x(t,n))}
      ${gx(n)}
      ${gg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Yi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function bx(e){let t=e.cleanup,n=Jr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${Xi(e.at)||"\u2014"}</span
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
        ${tf(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${hg(Er(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${gg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function yx(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?bx(r):hx(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function bg(e,t={}){let n=null;function r(){if(n===null){ut(c``,e);return}let o=px(n.operations,n.cleanup_failures,{expanded:n.expanded});ut(yx({events:o.visible,hidden:o.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",o=>{let l=o.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(o){n={operations:o.operations,cleanup_failures:o.cleanup_failures,repo:o.repo||"",repo_ops:o.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:i,isOpen:()=>n!==null,refresh(o){n&&(n={operations:o.operations,cleanup_failures:o.cleanup_failures,repo:o.repo||"",repo_ops:o.repo_ops||null,expanded:n.expanded},r())}}}function vx(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:{}}function yg(e){let t=new Map;for(let r of Array.isArray(e)?e:[]){if(!r||typeof r.id!="string"||r.id.length===0)continue;let s=vx(r.metadata).carried_from;if(!(typeof s!="string"||s.length===0))for(let i of Ys({dependencies:r.dependencies})){let o=t.get(i);o||(o=new Set,t.set(i,o)),o.add(r.id)}}let n=new Map;for(let[r,s]of t)n.set(r,[...s].sort());return n}var kx="session-preferred",wx=["external_roundtrip","user_feedback_loop"];function vg(e,t){if(!vo(e).includes(kx)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&wx.includes(n)?n:""}var $x="spec-after-blocker";function kg(e,t){return vo(e).includes($x)&&Array.isArray(t)&&t.length>0}var xx=jt("views:worker:adapter"),wg="tab:worker:ready",$g="tab:worker:blocked",xg="tab:worker:in-progress",Ag="tab:worker:resolved",Sg="tab:worker:closed",Ax="\u{1F512} blocked",Sx={revision:0,auto_advance:!1,auto_merge:!1,slots:ha,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Ex=["claude_account","codex_account"],Tx=[...Es,...Ex];function Rx(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Cx(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${nc}: ${n}`:nc}function as(e){return e&&typeof e=="object"?e:{}}function Ox(e){let t={};for(let n of Tx){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Ix(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Eg(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:s,onInvalidate:i}=e,o=n?bs(n,void 0,{client_ids:[wg,$g,xg,Ag,Sg]}):null,l=new Map,a={},u=null,d=0,f=null,_=!1;function h(){_||!i||i()}function g(q){return u===q?a:{}}async function E(){if(!r||_)return;let q=s?.()||"";if(u===q||f&&f.key===q&&f.generation===d)return;let j=++d;f={key:q,generation:j};let X=null;try{X=await Promise.resolve(r("get-session-defaults",{}))}catch(P){if(j!==d)return;f=null,xx("get-session-defaults failed: %o",P),h();return}j===d&&(a=X&&typeof X.values=="object"&&X.values!==null?{...X.values}:{},u=q,f=null,h())}function y(){u=null,d+=1,E()}function te(){for(let[q,j]of l)j==="failed"&&l.delete(q)}function J(q,j){return o?o.selectBoardColumn(q,j):[]}function z(q,j,X,P){let x=new Set(X.map(Q=>Q.id)),I=new Set,O=new Map,ae=[];for(let Q of[...j,...X]){if(I.has(Q.id)||Rx(Q))continue;let le=ko(Q,q);le.location===null&&(I.add(Q.id),O.set(Q.id,le),ae.push(Q))}let fe=og(ae,is(P)),ye=as(q.bead_scope);return fe.map(Q=>{let le=O.get(Q.id),pe=gs(Q),Ne=pe.evidence==="published",qe=typeof Q.workflow?.route=="string"&&Q.workflow.route||(Q.metadata&&typeof Q.metadata.route=="string"?Q.metadata.route:""),Pe=le.worker_ineligible,he=Pe||!Object.hasOwn(Q,"labels")?"":vg(Q.labels,Q.metadata),U=x.has(Q.id),ue=U?Ys(Q):[],_e=[];U&&ue.length===0&&_e.push(Ax),le.awaiting_user&&_e.push(Cx(Q.metadata)),le.missing_description?_e.push("missing_description"):le.spec==="conflict"?_e.push("spec_id_conflict"):le.spec==="none"?_e.push("spec \uC5C6\uC74C"):le.spec==="draft"&&_e.push("spec \uBBF8\uBC1C\uD589(draft)");let B=ye[Q.id];return{bead_id:Q.id,title:Q.title||Q.id,route:qe,spec_id:pe.conflict?"":pe.path,published:Ne,blocked:U,blocked_by:ue,labels:Array.isArray(Q.labels)?Q.labels:[],created_at:Q.created_at,updated_at:Q.updated_at,status:Q.status,workflow:Q.workflow||null,exec_pins:Ox(as(Q.metadata)),rec:null,...B&&Array.isArray(B.scope)?{scope:B.scope}:{},eligible:le.placeable,route_ok:le.route_ok,awaiting_user:le.awaiting_user,missing_description:le.missing_description,placement_spec:le.spec,reason:_e.join(" \xB7 "),worker_ineligible:Pe,session_preferred:he.length>0,session_preferred_reason:he,spec_after_blocker:kg(Q.labels,ue),release_info:Q.release_info,dependents_info:Q.dependents_info}})}function M(q){let[j,X,P,x,I]=q,O=vi([...j,...X,...P,...x,...I]),ae=yg([...j,...X,...P,...x]),fe={},ye=(Q,le)=>{if(!Q||typeof Q.id!="string"||Q.id.length===0)return;let pe=fe[Q.id]||(fe[Q.id]={});if(typeof Q.priority=="number"&&!("priority"in pe)&&(pe.priority=Q.priority),typeof Q.from_id=="string"&&!("from_id"in pe)&&(pe.from_id=Q.from_id),le&&!("metadata"in pe)){pe.metadata=as(Q.metadata);let Ne=as(Q.workflow).route;typeof Ne=="string"&&Ne.length>0&&(pe.route=Ne)}};for(let Q of[...j,...X,...P])ye(Q,!0);for(let Q of[...x,...I])ye(Q,!1);for(let Q of new Set([...Object.keys(fe),...O.keys()])){let le=ki(O,Q);if(le.total>0){let pe=fe[Q]||(fe[Q]={});pe.rollup=le}}for(let[Q,le]of ae){let pe=fe[Q]||(fe[Q]={});pe.carried_to=le}return fe}function D(q,j,X,P){let x=new Set((Array.isArray(q.done)?q.done:[]).map(O=>O?.bead_id).filter(O=>typeof O=="string")),I=[];for(let O of j){let ae=wr(O.closed_at);if(typeof O.id!="string"||x.has(O.id)||ae===null||P!==void 0&&ae<P||typeof O.comment_count!="number"||O.comment_count<=0)continue;let fe=`${X}\0${O.id}\0${String(O.updated_at)}\0${O.comment_count}`,ye=l.get(fe);if(ye===void 0&&r&&(l.set(fe,"pending"),Promise.resolve(r("get-comments",{id:O.id})).then(le=>{let pe=Array.isArray(le)&&le.some(Ne=>Fa(typeof Ne?.text=="string"?Ne.text:"")?.lane==="session");l.set(fe,pe?"session":"not-session"),h()}).catch(()=>{l.set(fe,"failed"),h()})),ye!=="session")continue;let Q=wr(O.started_at);I.push({id:O.id,title:O.title||O.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Q!==null&&ae>=Q?ae-Q:null,work_kind:"session",done_at:ae,created_at:O.created_at,updated_at:O.updated_at})}return I}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let j=t.get()||Sx,X=s?.()||"",P=q&&typeof q.done_since=="number"?q.done_since:void 0,x=J(wg,"ready"),I=J($g,"blocked"),O=J(xg,"in_progress"),ae=J(Ag,"resolved"),fe=J(Sg,"closed");return{workspaces:[{...j,bead_titles:{...as(j.bead_titles),...Object.fromEntries([...x,...I].filter(ye=>ye&&typeof ye.id=="string").map(ye=>[ye.id,ye.title||ye.id]))},root_dir:X,name:Ix(X),runnable:z(j,x,I,q?q.candidate_sort:void 0),session_done:D(j,fe,X,P),bead_overlay:M([x,I,O,ae,fe])}],workspaces_state:[{root_dir:X,revision:j.revision,auto_advance:j.auto_advance,auto_merge:j.auto_merge,slots:typeof as(j.workspace_info).slots=="number"?as(j.workspace_info).slots:j.slots,runner_catalog:j.runner_catalog,execution_defaults:j.execution_defaults,session_defaults:g(X),orchestration_model:j.orchestration_model,orchestration_effort:j.orchestration_effort,orchestration_speed:j.orchestration_speed,quick_fix_orchestration_model:j.quick_fix_orchestration_model,quick_fix_orchestration_effort:j.quick_fix_orchestration_effort,quick_fix_orchestration_speed:j.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){E()},refreshSessionDefaults:y,notifyIssuesChanged:te,destroy(){_=!0,d+=1,f=null,l.clear()}}}var ol=1,Tg=5,Lx={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:ol,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Tn(e){return e&&typeof e=="object"?e:{}}var Og="beads-ui.worker.candidate-filter",fu={show_blocked:!1,readiness:"all",routes:[]},Nx=1e3;function Dx(){try{let e=window.localStorage.getItem(Og);if(!e)return{...fu};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fu};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:es(t.routes)}}catch{return{...fu}}}function Px(e){try{window.localStorage.setItem(Og,JSON.stringify(e))}catch{}}var Ig="bdui.worker.done-range";function Mx(){try{let e=window.localStorage.getItem(Ig);return e===null?"today":Yn(e)}catch{return"today"}}function qx(e){try{window.localStorage.setItem(Ig,e)}catch{}}function Rg(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function jx(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Cg(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Fx(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Bx(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`;if(e.launched!==!0)return`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`;let t=typeof e.runner=="string"?e.runner:"claude";return e.mode==="fork"?null:`${t} \uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function Ux(e){return e&&e.launched===!0?"success":"error"}function Wx(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Hx(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var zx=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Kx=new Set(["waiting_metadata","reviewing","retrying"]),_u=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Gx(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":{let s=typeof n.origin_reason=="string"&&n.origin_reason.startsWith("receipt_unbacked:")?n.origin_reason.slice(17):null;return s!==null?{label:`\uC601\uC218\uC99D \uB300\uAE30 \u2014 ${s}`,details:[r,"\uC0C8 \uCEE4\uBC0B\xB7\uC0C8 \uC601\uC218\uC99D\xB7\uC7AC\uAD00\uCE21\uC774 \uC624\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}:{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}}case"retrying":{let s=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,o=typeof n.next_at=="number"?nn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(s,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${s}`,details:[r,o?`\uB2E4\uC74C \uC2DC\uAC01 ${o}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Vx(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Yx(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let s=Vx(e.terminal_reason);s&&r.push(`\uC6D0 \uC0AC\uC720: ${s}`);let i=e.phase==="needs_human"&&!s?Zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let o of t?t.details:[])r.push(o);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!zx.has(e.phase)}}function Xx(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Qx(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Zx(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,o={})=>{let l=[o.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:o.live===!0,alert:o.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Xx(e.receipt_check),s=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&s)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(_u.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let o=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${o?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${jx(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Cg(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Cg(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.reason==="pr_repo_foreign"?n("\uC678\uBD80 \uC800\uC7A5\uC18C PR",{title:"\uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 PR\uC785\uB2C8\uB2E4. \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C\uB294 \uC0C1\uD0DC\uB97C \uAD00\uCE21\xB7\uBA38\uC9C0\xB7\uC815\uB9AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Jx(e,t,n,r,s=null,i=null,o=null,l=!1,a=null,u=!0,d=null,f=null,_=null,h={},g=!1,E={},y=null,te={active:!1,failure:null,origin:null},J=!1,z={}){let M=!!a&&a.position>0,D=!!a?.continuation_action&&a.continuation_action.continuation===null,q=!!a&&a.active===!0,j=a&&a.failure||null,X=Wx(a?a.waiting:null),P=n[e]||null,x=P&&P.gate?P.gate:null,I=P&&P.pr?P.pr:null,O=z.foreign===!0,ae=O&&typeof z.repo_slug=="string"?z.repo_slug:"",fe=O&&typeof z.pr_url=="string"?z.pr_url:"",ye=O&&typeof z.pr_number=="number"?z.pr_number:null,Q=Hx(a?a.resolution:null),le=Gx(_),pe=Yx(_,le),Ne=a&&a.authority||null,qe=a&&a.review_dispatch||null,Pe=a?.hold?.auto_review_wait==="slot"?"slot":null,he=!!_&&typeof _=="object"&&Kx.has(_.phase),U=M&&!q&&(!Ne||he||Ne.source==="automatic"&&!g),ue=o==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Q?Q.badge:o==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":X,_e=!!x&&x.base_badge==="\uCDA9\uB3CC",B=!!x&&x.enabled===!0,W=Co({bead_id:e,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:E.repo_operations}),Ce=_a(W),K=i&&!W&&(i.queueing??null)?i.queueing:null,ne=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!x&&x.tier==="merged",se=r&&r.step==="repo_operations"&&W?.failed===!0&&(W.step==="deploy"||W.step==="verify")?W.step:null,ce=l&&!!r&&!!x&&x.tier==="merged",Re=U&&(B||_e||x?.reason==="base_behind"||_u.has(x?.reason)||ne||ce),Z=_u.has(x?.reason),Oe=l&&_e&&u===!1,Me=pr(h,e,{external:l,merge_active:q||W?.step==="merge",merge_queued:M,conflict_active:!!o,cleanup_active:Ce,merged:!!r||x?.tier==="merged"}),Je=!!Me.operation,je=!!r||_?.phase==="needs_human"||!!Me.error,ie=M&&!j&&!D&&!ne&&!(pe&&pe.lock_actions),ee=Zx({auto_pending:ie,continuation_required:D,queueing:K,merge_step:W,conflict_badge:ue,conflict_live:Q?.live===!0||o==="running",auto_resolution:le,recovery:pe,cleanup_failed:r,cleanup_label:r?Jr(r.step):null,base_exception:f,conflicting:_e,gate:x,receipt_check:P&&P.receipt_check?P.receipt_check:null,queue_failure:j,auto_skip:d,queued:M,queue_active:q,queue_position:a?a.position:0,review_session:te,review_dispatch:qe,auto_review_wait:Pe,activity:ue?null:i&&i.activity||null}),Te=ee?.live===!0&&ee.title?c`<span title=${ee.title}>${ee.label}</span>`:ee?.label||null,ft=Qx(P&&P.receipt_check?P.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&W?.active!==!0?fa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...y?{dependency_chips:y}:{},external:l,pr_number:ye??(I&&typeof I.number=="number"?I.number:null),pr_url:fe||(I&&typeof I.url=="string"?I.url:""),...ae?{foreign_repo:ae}:{},completion_badge:ee?.live!==!0&&ee?.title?ee.label:null,completion_title:ee?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...ft.length>0?{receipt_badge:{codes:ft}}:{},badges:Te?[Te]:[],live_badge:ee?.live===!0?Te:null,usage:s,alert:ee?.alert===!0,merge_action:x?.tier==="merged"&&!ne&&!ce?!1:!M||D||U||Z,cancel_action:M&&!D,cancel_enabled:!q&&!(pe&&pe.lock_actions),cancel_title:pe&&pe.lock_actions?`${pe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Me,discard_action:Me.action,resolve_action:je,resolve_enabled:!J,resolve_title:J?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:W,discard_enabled:Me.enabled,discard_title:Me.title,merge_enabled:!W&&!K&&!o&&!Je&&!f&&!(pe&&pe.lock_actions)&&!Oe&&te.active!==!0&&(B||_e||x?.reason==="base_behind"||Z||ne||ce||Re||he&&!q),merge_label:D?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ne||ce?se==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":se==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":_e&&!W&&!ne?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":x?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Z?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":U?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Je?Me.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Me.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Me.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:D?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":K?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":W?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${W.label}`:se?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${se==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":o==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":o==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":_e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":x?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te.active===!0?te.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":x?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":x?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":x?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":x?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":x?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":B?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}var e0=["tab:worker:ready","tab:worker:blocked","tab:worker:in-progress","tab:worker:resolved","tab:worker:closed"];function mu(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:i,gotoIssue:o,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,_=r?bs(r,void 0,{client_ids:e0}):null,h=Dx(),g=null,E=null,y=null,te=null,J=null,z=Is(()=>nt()),M=new Map,D=new Map,q=ng(),j=uu(q)===null,X=d?Yn(d):Mx();function P(){let $=ps.find(b=>b.value===X);return $?$.label:"\uC624\uB298"}let x=Va("beads-ui.worker.lane-collapsed"),I=!1,O="";function ae(){return O.trim().length>0}function fe($){return ae()?$.filter(b=>b.search_match===!0).length:void 0}let ye=new Set,Q=new Set,le=new Set,pe=new Set,Ne=new Set,qe=new Set,Pe=null,he=[],U=Eg({queueStore:s,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>nt()});function ue(){U.refreshSessionDefaults()}let _e=document.createElement("div");_e.className="worker-console";let B=document.createElement("div");B.className="worker-top";let W=document.createElement("div");W.className="worker-drawer-overlay",W.hidden=!0;let Ce=document.createElement("div");Ce.className="worker-drawer-overlay__backdrop";let K=document.createElement("div");K.className="worker-drawer-host";let ne=document.createElement("div");ne.className="worker-drawer-host",ne.hidden=!0,W.append(Ce,K,ne);let se=document.createElement("div");se.className="worker-lanes-host",_e.append(B,W,se),e.appendChild(_e);let ce=Tr(null,null),Re=[],Z=Xa({transport:n,console_el:_e,getLanes:()=>ce,getWorkspaces:()=>Re,getCrossLanes:()=>null,reproject:()=>({lanes:Ae(),raw_lanes:null}),onCorrection:()=>{},showToast:ve,requestRender:()=>nt(),adoptQueue:($,b)=>{s&&s.set(b)},onDragBegin:()=>{E=null}}),Oe=null,Me=Hs(K,{transport:n,sessionLogStore:i,onClose:()=>{Oe=null,W.hidden=!0,nt()}}),Je=bg(ne,{onClose:()=>{ne.hidden=!0,W.hidden=!0,nt()}}),je=ug({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",ee=pg({queueStore:s,transport:n,onChanged:()=>nt(),onOpenScript:($,b)=>{je.open($,b)}});function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ol,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ft($){let b=Qa($,Te());b&&(J=b,nt())}function _t(){J=null,nt()}function He(){let $=Ja(J);$&&(J=null,nt(),Mt($.attempt_id,"session",$.payload))}function mt($){if(!E||!$.some(L=>L.id===E))return null;let b=wo(Te());return b?{bead_id:E,lanes:b}:null}function It(){return l&&l()||""}async function St($,b){await Z.sendOp({type:"worker-queue-place",payload:{bead_id:$,...b==="parallel"?{}:{lane:b}},root_dir:It()},$)}function st(){let $=Te();return typeof $.revision=="number"?$.revision:0}function pt($){$&&$.queue&&s&&s.set($.queue)}async function Jt($){if(!n||!$)return;let b=await n("worker-attempt-pause",{attempt_id:$});b&&b.paused===!1&&b.reason&&ve(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Mt($,b="session",L={}){if(!n||!$)return;let de=n,ke=Te().attempts?.[$]||null;await js({context:{bead_id:ke?.bead_id||"",kind:b,tuple:ke?On(ke):""},transport:Ge=>de("worker-attempt-resume",{attempt_id:$,expected_revision:st(),...L,...Ge}),adopt:pt})}async function Zt($,b){if(!n||!$)return;let L=n,de=Te().attempts?.[$]||null;await xa({context:{bead_id:de?.bead_id||"",kind:b,attempt_id:$,tuple:de?Ui(de):""},pause:()=>L("worker-attempt-pause",{attempt_id:$,require_durable:!0}),resume:async ke=>{let Ge=await L("worker-attempt-resume",{attempt_id:$,expected_revision:st(),...ke});return pt(Ge),Ge},snapshot:()=>Te()})}async function v($,b,L=!0){if(!n)return null;let de=n,ke=await de($,{...b,expected_revision:st()});return pt(ke),ke&&ke.conflict&&L&&(ke=await de($,{...b,expected_revision:st()}),pt(ke)),ke}async function G($){if(!n||!$)return;let b=Te().merge_queue?.find(de=>de.bead_id===$)?.continuation_action;if(b?.mismatch&&b.continuation===null){await oe($,b.mismatch);return}ye.add($),nt();let L;try{L=await v("worker-merge-queue-add",{bead_id:$})}catch{ve("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete($),nt()}if(!(!L||L.applied)){if(L.conflict){ve("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ve(Fx(L.reason),"error",2400)}}async function De($){if(!(!n||!$||Q.has($))){Q.add($),nt();try{let b=await n("worker-cleanup-retry",{bead_id:$,expected_revision:st()});pt(b),b&&!b.retried&&!b.conflict&&b.reason&&ve(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{Q.delete($),nt()}}}async function Ie($){if(!(!n||!$||le.has($))){le.add($),nt();try{let b=await n("worker-resolve-in-session",{bead_id:$,expected_revision:st()});pt(b);let L=Bx(b);L!==null&&ve(L,Ux(b),4e3)}finally{le.delete($),nt()}}}async function Fe($,b){let L=Te().hold;if(!n||!L||typeof L.since!="number")return;let de=await n($,{since:L.since});pt(de),de&&de.ok===!1&&ve(`${b}: ${de.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":de.reason||""}`,"error",2800)}async function ze($){if(!n||!$)return;let b=await n("worker-queue-start-now",{bead_id:$});pt(b),b&&b.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${b.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":b.reason||""}`,"error",2800)}async function oe($,b){let L=await Cr({continuation_mismatch:b},(ke,Ge)=>v("worker-merge-queue-add",{bead_id:$,continuation:ke,decision_token:Ge},!1)),de=L?.queue?.merge_queue?.find(ke=>ke.bead_id===$)?.continuation_action;if(L?.applied!==!0&&de?.continuation===null&&de.mismatch){await oe($,de.mismatch);return}L&&L.applied===!1&&!L.conflict&&ve("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function be($){if(!n)return;let b=await v("worker-merge-auto-toggle",{on:$});!b||b.conflict||ve($?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",$?"success":"info",2400)}async function Qe($){if(!n||!$)return;let b=await v("worker-merge-queue-remove",{bead_id:$});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&ve("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function at(){await v("worker-merge-queue-remove",{all:!0})}async function et($,b=null,L="unmerged",de=null){if(!n||!$)return;let ke=Ao($,L);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(ke)))return;let it=await n("worker-discard",{bead_id:$,...b?{attempt_id:b}:{},...de?{operation_id:de}:{},expected_revision:st()});if(pt(it),it&&it.conflict&&(it=await n("worker-discard",{bead_id:$,...b?{attempt_id:b}:{},...de?{operation_id:de}:{},expected_revision:st()}),pt(it)),it&&it.discarded===!0){ve(Zi(it),"success",5e3);return}if(it&&it.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${it.reason}`,"error",2800);return}if(it&&it.accepted&&it.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(it&&it.accepted&&!it.discarded){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${it.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}it&&!it.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ht($,b,L){if(!n||!$||!b||typeof globalThis.confirm=="function"&&!globalThis.confirm(So($,L)))return;let de=await n("worker-discard-abandon",{bead_id:$,operation_id:b,expected_revision:st()});if(pt(de),de&&de.conflict&&(de=await n("worker-discard-abandon",{bead_id:$,operation_id:b,expected_revision:st()}),pt(de)),de&&de.abandoned===!0){ve(Qi(L),"success",5e3);return}if(de&&de.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2800);return}de&&!de.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function bt($,b,L){if(!(!n||!b||!L||Ne.has(b))){Ne.add(b),nt();try{let de=await n($,{bead_id:b,action_id:L,expected_revision:st()});pt(de);let ke=typeof de?.reason=="string"&&de.reason.length>0?de.reason:"",Ge=Object.hasOwn(Ll,ke)?Ll[ke]:"";Ge.length>0?ve(Ge,"error",2800):de?.conflict?ve("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&ke.length>0&&ve(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${ke}`,"error",2800)}finally{Ne.delete(b),nt()}}}async function rt($,b){if(!n||!b||pe.has(b))return;pe.add(b),nt();let L;try{let de=async(ke={})=>await n($,{bead_id:b,expected_revision:st(),...ke});L=await de(),pt(L),L&&L.conflict&&(L=await n($,{bead_id:b,expected_revision:st()}),pt(L)),$==="worker-revise-fix"&&(L=await Cr(L,(ke,Ge)=>de({continuation:ke,decision_token:Ge}),{onResult:pt,refresh:()=>de()}))}finally{pe.delete(b),nt()}if(!(!L||L.conflict)){if(L.ok){ve($==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ve(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function Ke($){if(!n)return;let b=await n("worker-automation-toggle",{on:$,expected_revision:st()});pt(b),b&&b.conflict&&await n("worker-automation-toggle",{on:$,expected_revision:st()}).then(pt)}async function T($){if(!n||!$)return;let b=await n("worker-repo-operation-dismiss",{operation_id:$});pt(b),b&&b.ok===!1&&ve(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function V($){if(!n||!Number.isFinite($))return;let b=Math.max(ol,Math.floor($)),L=await n("worker-queue-set-slots",{slots:b,expected_revision:st()});pt(L),L&&L.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:st()}).then(pt)}async function Y($){if(!n||!Number.isInteger($)||$<1||$>Tg)return;let b=Te(),L=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice($).reduce((Ge,it)=>Ge+(Array.isArray(it?.entries)?it.entries.length:0),0),de=()=>({count:$,expected_revision:st()}),ke=await n("worker-queue-set-serial-lane-count",de());pt(ke),ke&&ke.conflict&&(ke=await n("worker-queue-set-serial-lane-count",de()),pt(ke)),ke&&ke.applied&&L>0&&ve(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${L}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ae(){let $=Ur(X),b=U.read({candidate_sort:q,done_since:$});return Re=b.workspaces,ce=Tr(b.workspaces,b.workspaces_state,{done_since:$,candidate_filter:h,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:O}),ce}function xe($){return $.queue_groups[0]||Lx}function yt($){let b=$.dependency_chips||null,L={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},de=M.get($.id),ke=D.get($.id)||null,Ge=de&&de.overlaps.length>0?de.overlaps:null,it=!!de&&de.scope_missing;return!ke&&!Ge&&!it&&Object.keys(L).length===0?null:{...L,...ke?{predecessors:ke}:{},...Ge?{overlaps:Ge}:{},...it?{scope_missing:!0}:{}}}function xt($){return{...$,workspace_name:"",done_layout:void 0,dependency_chips:yt($)||void 0,chip_popover:vt($)}}function vt($){return oa($,b=>z.isOpen({bead_id:$.id,chip_key:b}))}function Lt(){let $=Te(),b=new Map;for(let L of Object.values(Tn($.lane_states))){let de=Array.isArray(L?.corrections)?L.corrections:[];for(let ke of de)ke&&typeof ke.bead_id=="string"&&typeof ke.after=="string"&&b.set(ke.bead_id,ke.after)}return{admission:Tn($.admission),correction_after:b}}function qt($,b){let L=xt($),de=Pp(b.admission[$.id]||null,!!$.discard||Ne.has($.id)),ke=b.correction_after.get($.id);return{...L,draggable:L.draggable===!0&&!de,stale_work:de,reason:de?"":L.reason,badges:ke?[`\u{1F517} ${ke} \uB4A4 (blocks \uC790\uB3D9)`,...L.badges||[]]:L.badges,revise_enabled:L.revise_enabled===!0&&!pe.has($.id)}}function Gt($){let b=Lt();return xe($).sublanes.parallel.map(L=>qt(L,b))}function rn($){let b=Lt();return xe($).sublanes.serial.map(L=>{let de=L.occupants.map(ke=>({id:ke.id,title:ke.title,draggable:!1,lane:L.id,ghost:!0,badges:[ke.badge],...typeof ke.search_match=="boolean"?{search_match:ke.search_match}:{}}));return{id:L.id,index:L.index+1,raw_length:L.raw_length,ghosts:de,items:L.items.map(ke=>qt(ke,b)),occupied:L.occupied_by.length>0,badge:L.occupants.length>0?L.occupants[0].badge:"\uB300\uAE30",cycle:L.cycle===!0}})}function kt($){return $.runnable.map(b=>xt(b))}function en($){return $.done.map(b=>xt(b))}function un($){let b=$.running.filter(L=>L.non_occupying!==!0).map(L=>({...L,bead_id:L.id,attempt_id:L.attempt_id||"",paused:L.run_state==="paused",failed:L.run_state==="failed",parked:L.run_state==="parked",retry_wait:L.run_state==="retry_wait",waiting:L.run_state==="waiting",wait:L.wait||null,provider_hold:L.run_state==="provider_hold",hold:L.hold?{...L.hold,open:te===L.attempt_id}:null,status_label:L.run_state==="failed"?L.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":L.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":L.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":L.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":L.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:L.can_pause!==!1,...L.instructions_restart?{instructions_restart:L.instructions_restart}:{},workspace_name:"",dependency_chips:yt(L)||void 0,chip_popover:vt(L),rollup_expanded:qe.has(L.id),failure:L.failure?{...L.failure,open:y===L.attempt_id}:null,...Vs(L.id,{discard:L.discard,parked:L.run_state==="parked"},le.has(L.id))}));return[...b.filter(L=>L.failed===!0),...b.filter(L=>L.failed!==!0&&L.parked===!0),...b.filter(L=>L.failed!==!0&&L.parked!==!0)]}function Ut($){return Vt($).map(b=>({...b,chip_popover:vt(b)}))}function Vt($){if(Pe&&Pe.model===$)return Pe.rows;let b=Te(),L=xe($),de=Tn(b.attempts),ke=Object.values(de).filter(cr),Ge=new Map;for(let Xe of ke)Ge.set(Xe.attempt_id,Xe);let it=new Map;for(let Xe of ke)it.set(Xe.bead_id,Xe);let tn=new Map;for(let Xe of[...$.pr_wait,...$.running,...$.queue,...$.runnable,...$.done])tn.has(Xe.id)||tn.set(Xe.id,Xe);let gn=Xe=>{let Kt=null;for(let Rn of ke)!Rn||Rn.bead_id!==Xe||fc(Rn,Ge)||(Kt===null||(typeof Rn.started_at=="number"?Rn.started_at:0)>=(typeof Kt.started_at=="number"?Kt.started_at:0))&&(Kt=Rn);return Kt&&typeof Kt.target_base=="string"?Kt.target_base:null},zt=new Map;for(let Xe of $.running)Xe.run_state==="failed"||Xe.conflict_resolution!==!0||(Xe.run_state!=="paused"?zt.set(Xe.id,"running"):zt.has(Xe.id)||zt.set(Xe.id,"paused"));let Nn=Tn(b.auto_merge_skips),Dn=new Set(L.merge.auto_excluded),Nr=Tn(b.pr_observations),Vn=Tn(b.pr_activity),sr=Tn(b.cleanup_failed),pn=Tn(b.discard_operations),yr=Tn(b.bead_workflow),cs=Tn(b.bead_titles),Dr=b.merge_queue_state||{active:null,failures:{}},vr=L.merge.state.waiting,kr=new Map;for(let Xe of Array.isArray(b.merge_queue)?b.merge_queue:[])Xe&&typeof Xe=="object"&&Xe.bead_id&&kr.set(Xe.bead_id,Xe);let Pr=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Xe=>{let Kt=tn.get(Xe.bead_id);return{...Jx(Xe.bead_id,Kt?.title||cs[Xe.bead_id]||Xe.bead_id,Nr,sr[Xe.bead_id]||null,lr(de,Xe.bead_id,L.runner_catalog||null),Vn[Xe.bead_id]||(ye.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Q.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),zt.get(Xe.bead_id)||null,Xe.external===!0,{position:L.merge.positions.get(Xe.bead_id)||0,active:Dr.active===Xe.bead_id,failure:Tn(Dr.failures)[Xe.bead_id]||null,waiting:vr&&vr.bead_id===Xe.bead_id?vr.reason:null,resolution:L.merge.resolutions.get(Xe.bead_id),continuation_action:L.merge.continuations.get(Xe.bead_id),authority:L.merge.authorities.get(Xe.bead_id)||null,hold:kr.get(Xe.bead_id)?.hold||null,review_dispatch:kr.get(Xe.bead_id)?.review_dispatch||null},Xe.wt_present!==!1,b.auto_merge===!0&&Dn.has(Xe.bead_id)?Nn[Xe.bead_id]?.reason||"":null,pc(L.declared_base,gn(Xe.bead_id)),Tn(b.completion_status)[Xe.bead_id]||null,pn,b.auto_merge===!0,{merge_sha:Xe.merge_sha,cleanup_cursor:Xe.cleanup_cursor,repo_operations:L.repo_operations},Kt?yt(Kt):null,Op(de,Xe.bead_id),le.has(Xe.bead_id),{...Xe.foreign===!0?{foreign:!0}:{},...typeof Xe.repo_slug=="string"?{repo_slug:Xe.repo_slug}:{},...typeof Xe.pr_url=="string"?{pr_url:Xe.pr_url}:{},...typeof Xe.pr_number=="number"?{pr_number:Xe.pr_number}:{}}),...Kt?.search_match===void 0?{}:{search_match:Kt.search_match},workflow:yr[Xe.bead_id]||null,priority:Kt?.priority,from_id:Kt?.from_id,...Kt?.created_at===void 0?{}:{created_at:Kt.created_at},...Kt?.updated_at===void 0?{}:{updated_at:Kt.updated_at}}});return Pe={model:$,rows:Pr},Pr}function Xt($){let b=xe($),L=[];for(let Ge of $.running)Ge.non_occupying!==!0&&L.push({id:Ge.id,title:Ge.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ge.serial_lane_id??null});for(let Ge of $.pr_wait)L.push({id:Ge.id,title:Ge.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ge of b.sublanes.serial)Ge.items.forEach((it,tn)=>{L.push({id:it.id,title:it.title,location_label:`${Ge.id} #${tn+1}`,kind:"serial",lane_id:Ge.id})});b.sublanes.parallel.forEach((Ge,it)=>{L.push({id:Ge.id,title:Ge.title,location_label:`#${it+1}`,kind:"parallel",lane_id:null})});for(let Ge of $.runnable)L.push({id:Ge.id,title:Ge.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ge.queue_placeable===!0});let de=Te();M=ig(de.bead_scope,L);let ke=new Map;for(let Ge of[...$.running,...$.runnable])Array.isArray(Ge.blocked_by)&&Ge.blocked_by.length>0&&ke.set(Ge.id,Ge.blocked_by);for(let[Ge,it]of Object.entries(Tn(de.bead_blocked_by)))Array.isArray(it)&&ke.set(Ge,it.filter(tn=>typeof tn=="string"&&tn.length>0));D=af(ke,L,Tn(de.blocker_workspaces))}function Ve($){let b=Te(),L=xe($),de=L.sublanes.parallel,ke=de.length>0?de[0].id:"\u2014",Ge=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,it=tt($),tn=L.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",gn=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(pn=>pn&&typeof pn.armed_by_lane=="string"&&pn.armed_by_lane.length>0).length,zt=gn>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${gn}건 진행 중</span
          >`:"",Nn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${L.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Ut($).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${P()} 완료 <b>${$.done.length}</b></span
      >`,Dn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${L.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${L.declared_base||"?"}</span
    >`,Nr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ol}
          step="1"
          .value=${String(L.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Tg},(pn,yr)=>yr+1).map(pn=>c`<option
                value=${String(pn)}
                ?selected=${L.serial_lane_count===pn}
              >
                ${pn}
              </option>`)}
        </select>
      </label> `,Vn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${O}
    />`,sr=Lp(L.repo_operations,L.cleanup_failures);return I?c`<div class="worker-ribbon">
          ${Ge} ${it}
          <div class="worker-kpi worker-kpi--ribbon">
            ${tn}${zt}${Nn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Nr}${Vn}</div>
          <div class="worker-kpi">${Dn}</div>
        </div>
        ${sr}${ee.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Ge}${it}${Nr}${Vn}
        </div>
        <div class="worker-kpi">
          ${tn}${zt}${Nn}${Dn}
          ${(Array.isArray(L.token_total)?L.token_total:L.token_total?[{label:L.token_total,tooltip:`${P()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(pn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${pn.tooltip}
                >${P()} 완료 · 누적 ${pn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ke}</b></span
          >
        </div>
      </div>
      ${sr}${ee.template()}`}function N($){let b=$.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${h.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Io.map(L=>c`<button
              type="button"
              class="worker-filter__chip${h.readiness===L.value?" is-active":""}"
              data-readiness=${L.value}
              aria-pressed=${h.readiness===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${b.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${b.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ts.map(L=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${h.routes.includes(L.value)?" is-active":""}"
              data-route=${L.value}
              aria-pressed=${h.routes.includes(L.value)?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${b.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${b.route}</span
            >`:""}
      </div>
    </div>`}function $e(){let $=j?"custom":uu(q)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Jo.map(b=>c`<option value=${b.id} ?selected=${$===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${$==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Ue(){let $=ei(q);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(b=>{let L=$[b];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${b}
            aria-label=${`${b+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${L?L.key:""}
          >
            ${b===0?"":c`<option value="" ?selected=${!L}>없음</option>`}
            ${tg.map(de=>c`<option
                  value=${de.key}
                  ?selected=${!!L&&L.key===de.key}
                >
                  ${de.label}
                </option>`)}
          </select>
          ${L?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${b}
                aria-label=${L.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${L.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${L.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function wt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${X}
      >
        ${ps.map($=>c`<option value=${$.value} ?selected=${X===$.value}>
              ${$.label}
            </option>`)}
      </select>
    </div>`}function tt($){let b=xe($).merge,L=Te().auto_merge===!0;if(b.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${L?" is-active":""}"
        title=${L?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${L?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${b.positions.size}
      </button>`;if(L)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let de=new Set(b.auto_excluded),ke=Ut($).filter(Ge=>Ge.merge_action&&Ge.merge_enabled&&!de.has(Ge.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ke>0?` ${ke}`:""}
    </button>`}function Et($,b){return c`<div
      data-bead-id=${$.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${an(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String($.queue_index??0)}
    >
      ${Hn({...$,...Vs($.id,{discard:$.discard,parked:!1},le.has($.id))},{actions:Ps($)})}
    </div>`}function Tt($){let b=Gt($),L=It();return ia({parallel:{rows:b.map((de,ke)=>Et(de,{kind:"parallel",root_dir:L,row_index:ke})),count:b.length,collapsed:x.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:L}},serial:{lanes:rn($).map(de=>({id:de.id,title:`\uC9C1\uB82C ${de.index}`,rows:[...de.ghosts.map(ke=>Hn({...ke,...Vs(ke.id,{discard:ke.discard,parked:!1},le.has(ke.id))},{actions:Ps(ke)})),...de.items.map((ke,Ge)=>Et(ke,{kind:"repo-serial",root_dir:L,row_index:Ge,lane_id:de.id}))],count:de.ghosts.length+de.items.length,match_count:fe([...de.ghosts,...de.items]),empty:de.ghosts.length+de.items.length===0,badge:de.badge,held:de.occupied,cycle:de.cycle,drop:{drop:"repo-serial",root_dir:L,lane_id:de.id,lane_length:String(de.raw_length)}})),collapsed:x.isAreaCollapsed("serial")}})}function lt($){return gm(un($),Date.now(),Oe)}function Bt($){return $.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function An($){let b=xe($),L=kt($),de=Gt($),ke=en($),Ge=Ut($),it=un($),tn=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:L,match_count:fe(L),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:$e(),header_row:j?Ue():void 0,controls:N($),collapsible:!0,collapsed:x.isCollapsed("candidate"),place_menu:mt(L),onOpenDoc:u?(zt,Nn)=>u(Nn):void 0}),gn=tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ke,match_count:fe(ke),empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,header_control:wt(),collapsible:!0,collapsed:x.isCollapsed("done"),preview:I?Array.isArray(b.token_total)?b.token_total.map(zt=>zt.label).join(" \xB7 "):b.token_total||Rg(ke):void 0});return I?c`<div class="worker-lanes worker-lanes--mobile">
          ${aa({live:Bt($),running_body:it.length>0?lt($):"",pr_wait_rows:Ge.map(zt=>Hn(zt)),count:it.length+Ge.length})}
          ${tr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,match_count:fe(de),collapsible:!0,collapsed:x.isCollapsed("queue"),preview:Rg(de),body:Tt($)})}
          ${tn} ${gn}
        </div>
        ${Gs(J,Te())}`:c`<div class="worker-lanes">
        ${tn}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,match_count:fe(de),collapsible:!0,collapsed:x.isCollapsed("queue"),body:Tt($)})}
        ${tr({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:it,match_count:fe(it),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${b.slots}</span
          >`,live:Bt($),collapsible:!0,collapsed:x.isCollapsed("running"),body:lt($)})}
        ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ge,match_count:fe(Ge),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:x.isCollapsed("pr_wait")})}
        ${gn}
      </div>
      ${Gs(J,Te())}`}function $t($){x.toggle($),nt()}function bn($){x.toggleArea($),nt()}function _n($){let b=Date.now();if(!$.queue.some(de=>sa(de.added_at,b)>0)){mn();return}g===null&&(g=window.setInterval(()=>{try{nt()}catch{}},Nx))}function mn(){g!==null&&(window.clearInterval(g),g=null)}function nt(){if(e.hidden)return;let $=Ae();_n($),Xt($),ut(Ve($),B),ut(An($),se),el(se)}function A(){let $=!0,b=Ga(L=>{if(I=L,$){$=!1;return}nt()});he.push(b)}function p($){h=$,Px($),nt()}function m($){if($==="custom"){j=!0,nt();return}q=is($),du(q),j=!1,nt()}function S($){q=is({chain:$}),du(q),nt()}function C($){X=Yn($),qx(X),f?.(X),nt()}function re($){let b=$.target;if(J){let zt=Za(J,b,Te());if(zt){zt!==J&&(J=zt,nt());return}}let L=b?.closest?.(".worker-serial-lane-count");if(L){let zt=Number.parseInt(L.value,10);Number.isFinite(zt)&&Y(zt).then(nt);return}let de=$.target?.closest?.(".worker-filter__blocked");if(de){p({...h,show_blocked:de.checked});return}let ke=$.target?.closest?.(".worker-sort-chain__key");if(ke){let zt=Number.parseInt(ke.getAttribute("data-step")||"",10);Number.isFinite(zt)&&S(rg(ei(q),zt,ke.value));return}let Ge=$.target?.closest?.(".worker-done-range");if(Ge){C(Ge.value);return}let it=$.target?.closest?.(".worker-sort");if(it){m(it.value);return}let tn=$.target?.closest?.(".worker-slots__input");if(!tn)return;let gn=Number.parseInt(tn.value,10);if(!Number.isFinite(gn)){nt();return}V(gn).then(nt)}function ge($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function we(){let $=xe(Ae()),b=Te().workspace_info,L=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:$.repo_operations,cleanup_failures:$.cleanup_failures,repo:l&&l()||"",repo_ops:L}}function Ee(){Oe&&Me.close(),ne.hidden=!1,W.hidden=!1,Je.open(we()),nt()}function w($){let b=Te(),L=b.attempts?b.attempts[$]:null;Oe=$,Je.close(),ne.hidden=!0,W.hidden=!1,Me.open({attempt_id:$,meta:ge(L)}),nt()}function R($){let b=Te(),L=(Array.isArray(b.session_active)?b.session_active:[]).find(ke=>ke&&ke.bead_id===$),de=(L&&Array.isArray(L.session_refs)?L.session_refs:[]).find(ke=>ke&&ke.current===!0);de&&(Je.close(),ne.hidden=!0,W.hidden=!1,Me.open(Fs(de,$,"in_progress")),nt())}function Le(){if(Je.isOpen()&&Je.refresh(we()),!Oe)return;let $=Te(),b=$.attempts?$.attempts[Oe]:null;if(b){Me.updateMeta(ge(b));return}Me.close()}function Be($,b){if($.length===0||!o)return;let L=l?l():void 0;if(b.length===0||!L||b===L||!a){o($);return}Promise.resolve(a(b)).then(()=>{o($)}).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ot($){let b=$.target;if(b?.closest?.(".provider-resume-dialog__cancel")){_t();return}if(b?.closest?.(".provider-resume-dialog__confirm")){He();return}if(b?.closest?.(".provider-resume-dialog")||b?.closest?.(".worker-mini__grip"))return;let L=b?.closest?.(".worker-sort-chain__dir");if(L){let me=Number.parseInt(L.getAttribute("data-step")||"",10);Number.isFinite(me)&&S(sg(ei(q),me));return}let de=b?.closest?.(".worker-dep__open");if(de){Be(de.getAttribute("data-dep-id")||"",de.getAttribute("data-root-dir")||"");return}let ke=b?.closest?.(".judgement-chip");if(ke){let me=ke.closest("[data-bead-id]"),We=me&&me.getAttribute("data-bead-id")||"",Ct=ke.getAttribute("data-chip-key")||"";We&&Ct&&z.toggle({bead_id:We,chip_key:Ct});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){Ee();return}let Ge=b?.closest?.(".worker-repo-op__dismiss");if(Ge){T(Ge.dataset.operationId||"");return}let it=b?.closest?.(".worker-cleanup__resume");if(it){let me=it.dataset.beadId;me&&De(me);return}let tn=b?.closest?.(".worker-cleanup__resolve");if(tn){let me=tn.dataset.beadId;me&&Ie(me);return}if(b?.closest?.('[data-action="queue-hold-resume"]')){Fe("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".rtile__hold-retry")){Fe("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Ke(!Te().auto_advance);return}let gn=b?.closest?.(".worker-merge-all");if(gn){gn.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?be(!1):at():be(!0);return}let zt=b?.closest?.(".worker-pane__toggle[data-lane]");if(zt){let me=zt.dataset.lane;(me==="candidate"||me==="queue"||me==="running"||me==="pr_wait"||me==="done")&&$t(me);return}let Nn=b?.closest?.(".worker-wait__area-toggle[data-area]");if(Nn){let me=Nn.dataset.area;(me==="parallel"||me==="serial")&&bn(me);return}let Dn=b?.closest?.(".worker-card__place-lane");if(Dn){let me=Dn.dataset.beadId,We=Dn.dataset.lane;me&&(We==="parallel"||/^s[1-5]$/.test(We||""))&&(E=null,nt(),St(me,We));return}if(b?.closest?.(".worker-card__place-cancel")){E=null,nt();return}let Vn=b?.closest?.(".worker-card__place");if(Vn){let me=Vn.dataset.beadId;me&&!Vn.disabled&&(wo(Te())?(E=me,nt()):St(me,"parallel"));return}let sr=b?.closest?.(".worker-filter__route");if(sr){let me=sr.dataset.route||"";me&&p({...h,routes:ya(h.routes,me)});return}let pn=b?.closest?.(".worker-filter__chip");if(pn){let me=pn.dataset.readiness;(me==="all"||me==="ready"||me==="not_ready")&&p({...h,readiness:me});return}let yr=b?.closest?.('[data-action="queue-start-now"]');if(yr){ze(yr.dataset.beadId||"");return}let cs=b?.closest?.('[data-action="queue-remove"]');if(cs){let me=cs.dataset.beadId||"";me&&Z.sendOp({type:"worker-queue-remove",payload:{bead_id:me},root_dir:It()},me);return}let Dr=b?.closest?.(".worker-mini__merge");if(Dr){let me=Dr.dataset.beadId||"";Te().cleanup_failed?.[me]?De(me):G(me);return}let vr=b?.closest?.(".worker-mini__merge-cancel");if(vr){Qe(vr.dataset.beadId||"");return}let kr=b?.closest?.(".worker-mini__resolve");if(kr){Ie(kr.dataset.beadId||"");return}let Pr=b?.closest?.(".rtile__resolve");if(Pr){let me=Pr.closest(".rtile");Ie(me?.dataset.beadId||"");return}let Xe=b?.closest?.(".worker-mini__discard"),Kt=b?.closest?.(".worker-mini__discard-abandon");if(Kt){ht(Kt.dataset.beadId||"",Kt.dataset.operationId||"",{kind:Kt.dataset.operationKind||"",last_error:Kt.dataset.lastError||""});return}if(Xe){et(Xe.dataset.beadId||"",Xe.dataset.attemptId||null,Xe.dataset.discardMode==="merged"?"merged":"unmerged",Xe.dataset.operationId||null);return}let Rn=b?.closest?.(".worker-mini__stale-continue");if(Rn){bt("worker-stale-work-continue",Rn.dataset.beadId||"",Rn.dataset.actionId||"");return}let Xs=b?.closest?.(".worker-mini__stale-backup");if(Xs){bt("worker-stale-work-backup-fresh",Xs.dataset.beadId||"",Xs.dataset.actionId||"");return}let Qs=b?.closest?.(".worker-mini__stale-recheck");if(Qs){bt("worker-stale-work-recheck",Qs.dataset.beadId||"",Qs.dataset.actionId||"");return}let ti=b?.closest?.(".worker-mini__revise-fix");if(ti){rt("worker-revise-fix",ti.dataset.beadId||"");return}let ni=b?.closest?.(".worker-mini__revise-approve");if(ni){rt("worker-revise-approve",ni.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let ri=b?.closest?.(".rtile__failure-badge");if(ri){let me=ri.dataset.attemptId||"";y=y===me?null:me,nt();return}let ct=b?.closest?.(".rtile__provider-hold-badge");if(ct){let me=ct.dataset.attemptId||"";te=te===me?null:me,nt();return}let k=b?.closest?.(".rtile__attempt-copy");if(k){let me=k.dataset.attemptId||"";me&&vn(me).then(We=>{ve(We?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",We?"success":"error",1400)});return}let F=b?.closest?.(".rtile__discard-abandon");if(F){let We=b?.closest?.(".rtile")?.dataset?.beadId;We&&ht(We,F.dataset.operationId||"",{kind:F.dataset.operationKind||"",last_error:F.dataset.lastError||""});return}let H=b?.closest?.(".rtile__discard");if(H){let me=b?.closest?.(".rtile"),We=me?.dataset?.beadId,Ct=me?.dataset?.attemptId;We&&et(We,Ct||null,H.dataset.confirmation==="merged"?"merged":"unmerged",H.dataset.operationId||null);return}if(b?.closest?.(".rtile__restart-instructions")){let We=b?.closest?.(".rtile")?.dataset?.attemptId;We&&Zt(We,"restart");return}if(b?.closest?.(".rtile__resume-instructions")){let We=b?.closest?.(".rtile")?.dataset?.attemptId;We&&Zt(We,"resume_recorded");return}if(b?.closest?.(".rtile__pause")){let We=b?.closest?.(".rtile")?.dataset?.attemptId;We&&Jt(We);return}if(b?.closest?.(".rtile__resume-alternate")){let We=b?.closest?.(".rtile")?.dataset?.attemptId;We&&ft(We);return}if(b?.closest?.(".rtile__resume")){let me=b?.closest?.(".rtile__resume"),Ct=b?.closest?.(".rtile")?.dataset?.attemptId;Ct&&Mt(Ct,me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let me=b?.closest?.(".rtile"),We=me?.dataset?.attemptId;if(We){w(We);return}let Ct=me?.dataset?.beadId;Ct&&R(Ct);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),Me.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Se=b?.closest?.(".rtile .board-card__roll-toggle");if(Se){let me=Se.dataset.rollParent;me&&(qe.has(me)?qe.delete(me):qe.add(me),nt());return}let Ze=b?.closest?.(".rtile .board-card__roll-child");if(Ze){let me=Ze.dataset.childId;me&&o&&o(me);return}let dt=b?.closest?.(".rtile");if(dt){if(b?.closest?.(".rtile__id")){let We=dt.dataset.beadId;We&&vn(We).then(Ct=>{Ct?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=dt.dataset.beadId;me&&o&&o(me);return}let Wt=b?.closest?.(".worker-mini, .worker-card");if(Wt){let me=Wt.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){me&&vn(me).then(Ct=>{Ct?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let We=b?.closest?.(".ctl-chip--from");if(We){let Ct=We.dataset.fromId;Ct&&o&&o(Ct);return}me&&o&&o(me)}}function gt($){let b=$.target;b?.closest?.(".worker-search")&&(O=b.value,nt())}function Rt($){let b=$.target;$.key!=="Escape"||!b?.closest?.(".worker-search")||O.length===0||(O="",nt())}Z.attach(e),e.addEventListener("click",ot),e.addEventListener("change",re),e.addEventListener("input",gt),e.addEventListener("keydown",Rt);function Dt($){let b=$.target,L=b&&typeof b.closest=="function"?ke=>b.closest(ke):()=>null,de=!1;y&&!L(".rtile__failure-pop, .rtile__failure-badge")&&(y=null,de=!0),te&&!L(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(te=null,de=!0),de&&nt()}function ls($){$.key==="Escape"&&(y===null&&te===null&&J===null||(y=null,te=null,J=null,nt()))}return document.addEventListener("click",Dt),document.addEventListener("keydown",ls),z.attach(),he.push(()=>{document.removeEventListener("click",Dt),document.removeEventListener("keydown",ls),z.detach()}),A(),_&&he.push(_.subscribe(()=>{U.notifyIssuesChanged(),nt()})),s&&he.push(s.subscribe(()=>{let $=l&&l()||"";$!==ie&&(ie=$,je.close()),nt(),Le()})),nt(),{load(){U.ensureSessionDefaults(),nt()},pause(){mn()},refreshSessionDefaults:ue,destroy(){mn();for(let $ of he.splice(0))try{$()}catch{}Z.detach(),e.removeEventListener("click",ot),e.removeEventListener("change",re),e.removeEventListener("input",gt),e.removeEventListener("keydown",Rt),U.destroy();try{Me.destroy()}catch{}W.hidden=!0;try{je.destroy()}catch{}ut(c``,e)}}}function gu(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Lg(e,t,n,r=async()=>{},s=async()=>{}){let i=jt("views:workspace-picker"),o=null,l=!1,a=!1,u=!1;async function d(q){let X=q.target.value,x=t.getState().workspace?.current?.path||"";if(X&&X!==x){i("switching workspace to %s",X),l=!0,D();try{await n(X)}catch(I){i("workspace switch failed: %o",I)}finally{l=!1,D()}}}async function f(){let q=t.getState(),j=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!j||a)){i("git-pulling workspace %s",j),a=!0,D();try{await r(j)}catch(X){i("workspace git pull failed: %o",X)}finally{a=!1,D()}}}function _(q){let j=q.target;j&&e.contains(j)||E()}function h(q){q.key==="Escape"&&E()}function g(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",h),D())}function E(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),D())}function y(){u?E():g()}async function te(q){let j=q.target,X=j.value,P=j.checked;i("toggling visibility %s \u2192 %s",X,String(P));try{await s(X,P)}catch(x){i("workspace visibility toggle failed: %o",x)}}function J(q){return q?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(q,j){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${y}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${q.map(X=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!j.has(X.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gu(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let q=t.getState(),j=q.workspace?.current,X=q.workspace?.available||[],P=new Set(q.workspace?.hidden||[]),x=j?.path||X[0]?.path||"";if(X.length===0)return c``;let I=X.filter(O=>!P.has(O.path)||O.path===x);if(I.length<=1){let O=I[0]||X[0],ae=gu(O.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${O.path}"
            >${ae}</span
          >
          ${z(X,P)}
          ${J(x)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${I.map(O=>c`
              <option
                value="${O.path}"
                ?selected=${O.path===x}
                title="${O.path}"
              >
                ${gu(O.path)}
              </option>
            `)}
        </select>
        ${z(X,P)}
        ${J(x)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){ut(M(),e)}return D(),o=t.subscribe(()=>D()),{destroy(){o&&(o(),o=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),ut(c``,e)}}}var Ng=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-adr","unsubscribe-adr","adr-snapshot","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create"];function hu(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Dg(e,t,n=hu()){return{id:n,type:e,payload:t}}function Pg(e={}){let t=jt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,i="closed",o=0,l=null,a=!0,u=new Map,d=[],f=new Map,_=new Set;function h(M){for(let D of Array.from(_))try{D(M)}catch{}}function g(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),h(i);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,o)),D=(n.jitterRatio||0)*M,q=Math.max(0,Math.round(M+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",q,o+1),l=setTimeout(()=>{l=null,z()},q)}function E(M){try{s?.send(JSON.stringify(M))}catch(D){t("ws send failed",D)}}function y(){for(i="open",t("ws open"),h(i),o=0;d.length;){let M=d.shift();M&&E(M)}}function te(M){let D;try{D=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let j=u.get(D.id);u.delete(D.id),D.ok?j?.resolve(D.payload):j?.reject(D.error||new Error("ws error"));return}let q=f.get(D.type);if(q&&q.size>0)for(let j of Array.from(q))try{j(D.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",D.type)}function J(){i="closed",t("ws closed"),h(i);for(let[M,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(M);o+=1,g()}function z(){if(!a)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),i="connecting",h(i),s.addEventListener("open",y),s.addEventListener("message",te),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(D){t("ws connect failed %o",D),g()}}return z(),{send(M,D){if(!Ng.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let q=hu(),j=Dg(M,D,q);return t("send %s id=%s",M,q),new Promise((X,P)=>{u.set(q,{resolve:X,reject:P,type:M}),s&&s.readyState===s.OPEN?E(j):(t("queue %s id=%s (state=%s)",M,q,i),d.push(j))})},on(M,D){f.has(M)||f.set(M,new Set);let q=f.get(M);return q?.add(D),()=>{q?.delete(D)}},onConnection(M){return _.add(M),()=>{_.delete(M)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),o=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return i}}}function t0(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function n0(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var il=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mg=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Ir="tab:worker:closed",r0="bdui.worker.done-range",qg=Im,jg="worker:queue",Fg="ui:order",Bg="ui:display-policy",Ug="exec:presets",Lr="tab:board:closed",Wg="beads-ui.board.closed-range";function s0(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let s of r)t(s.contentRect.height+o0(e))});return n.observe(e),()=>n.disconnect()}function o0(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,s)=>r+(parseFloat(s)||0),0)}function i0(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let r of t)try{r()}catch{}},subscribe(n){return t.add(n),()=>t.delete(n)}}}function a0(e){let t=jt("main");t("bootstrap start"),s0(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ut(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),o=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("compare-root"),f=document.getElementById("adr-root"),_=document.getElementById("detail-panel");if(o&&Xm(o),l&&a&&u&&d&&f&&_){let B=function(w,R){let Le="Request failed",Be="";if(w&&typeof w=="object"){let gt=w;if(typeof gt.message=="string"&&gt.message.length>0&&(Le=gt.message),typeof gt.details=="string")Be=gt.details;else if(gt.details&&typeof gt.details=="object")try{Be=JSON.stringify(gt.details,null,2)}catch{Be=""}}else typeof w=="string"&&w.length>0&&(Le=w);let ot=R&&R.length>0?`Failed to load ${R}`:"Request failed";_e.open(ot,Le,Be)},It=function(w){return`${lt.getState().workspace.current?.path||""}\0${w}`},St=function(){je&&(je().catch(()=>{}),je=null),ie=null,ee=null},pt=function(w){Te=w;let R=()=>{Te!==w||lt.getState().selected_id!==w||(Te=null,st(w))};if(!He){_t.then(R);return}R()},v=function(w,R,Le,Be,ot){return Le!==Zt[R]?(ot().catch(()=>{}),!1):(w.set(Be,ot),!0)},De=function(){let w=lt.getState();be(w.view==="board"),rt(w.view==="worker"),xe(Ae(w)),vt(w.view==="adr"),T(w.view==="board"||w.view==="worker"||G||!!w.selected_id)},ze=function(){let w=Ur(Ie);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},oe=function(){let w=Ur(Fe);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},be=function(w){if(w)for(let[R,Le]of il){if(Jt.has(R)||Mt.has(R))continue;let Be=R===Lr?ze():{type:Le};try{ne.register(R,Be)}catch(Rt){t("register %s store failed: %o",R,Rt)}Mt.add(R);let ot=Zt.board,gt=!1;K.subscribeList(R,Be).then(Rt=>{gt=!v(Jt,"board",ot,R,Rt)}).catch(Rt=>{t("subscribe %s failed: %o",R,Rt),B(Rt,"board")}).finally(()=>{Mt.delete(R),gt&&De()})}else et()},et=function(){Zt.board+=1;for(let[w]of il){let R=Jt.get(w);R&&(R().catch(()=>{}),Jt.delete(w));try{ne.unregister(w)}catch(Le){t("unregister %s failed: %o",w,Le)}}},rt=function(w){if(!w){Ke();return}for(let[R,Le]of Mg){if(ht.has(R)||Mt.has(R))continue;let Be=R===Ir?oe():{type:Le};try{ne.register(R,Be)}catch(Rt){t("register %s store failed: %o",R,Rt)}Mt.add(R);let ot=Zt.worker,gt=!1;K.subscribeList(R,Be).then(Rt=>{gt=!v(ht,"worker",ot,R,Rt)}).catch(Rt=>{t("subscribe %s failed: %o",R,Rt),B(Rt,"worker")}).finally(()=>{Mt.delete(R),gt&&De()})}},Ke=function(){Zt.worker+=1;for(let[w]of Mg){let R=ht.get(w);R&&(R().catch(()=>{}),ht.delete(w));try{ne.unregister(w)}catch(Le){t("unregister %s failed: %o",w,Le)}}},T=function(w){if(!w){V();return}bt||(Ce("subscribe-worker-queue",{id:jg}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),bt=()=>Ce("unsubscribe-worker-queue",{id:jg}))},V=function(){bt&&(bt().catch(()=>{}),bt=null)},Ae=function(w){return w.view==="monitor"||w.selected_id!=null},xe=function(w){if(!w){yt();return}Y||(Ce("subscribe-monitor-pipeline",{id:qg}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),Y=()=>Ce("unsubscribe-monitor-pipeline",{id:qg}))},yt=function(){Y&&(Y().catch(()=>{}),Y=null)},vt=function(w){if(!w){Lt();return}xt||(Ce("subscribe-adr",{id:$l}).catch(R=>{t("subscribe-adr failed: %o",R)}),xt=()=>Ce("unsubscribe-adr",{id:$l}))},Lt=function(){xt&&(xt().catch(()=>{}),xt=null)},Gt=function(){qt||(Ce("subscribe-ui-order",{id:Fg}).catch(w=>{t("subscribe-ui-order failed: %o",w)}),qt=()=>Ce("unsubscribe-ui-order",{id:Fg}))},rn=function(){qt&&(qt().catch(()=>{}),qt=null),Re.clear()},en=function(){kt||(Ce("subscribe-display-policy",{id:Bg}).catch(w=>{t("subscribe-display-policy failed: %o",w)}),kt=()=>Ce("unsubscribe-display-policy",{id:Bg}))},un=function(){kt&&(kt().catch(()=>{}),kt=null),Z.clear()},Vt=function(){Ut||(Ce("subscribe-impl-presets",{id:Ug}).catch(w=>{t("subscribe-impl-presets failed: %o",w)}),Ut=()=>Ce("unsubscribe-impl-presets",{id:Ug}))},wt=function(w){if(!w)return"Unknown";let R=w.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},p=function(w,R){A.open(w.path,{missing_state:w.missing_state,...R?{workspace:R}:{}})};var h=B,g=It,E=St,y=pt,te=v,J=De,z=ze,M=oe,D=be,q=et,j=rt,X=Ke,P=T,x=V,I=Ae,O=xe,ae=yt,fe=vt,ye=Lt,Q=Gt,le=rn,pe=en,Ne=un,qe=Vt,Pe=wt,he=p;let U=document.getElementById("header-loading"),ue=od(U),_e=cm(e),W=Pg(),Ce=ue.wrapSend((w,R)=>W.send(w,R)),K=Zu(Ce),ne=Ju(),se=td(),ce=Ou(),Re=ed(),Z=Ru(),Oe=Cu(),Me=Iu(),Je=i0();W.on("impl-presets-snapshot",w=>{let R=w;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&Oe.set({revision:R.revision,presets:R.presets})}),W.on("adr-snapshot",w=>{let R=w;!R||!Array.isArray(R.workspaces)||Je.set({workspaces:R.workspaces})}),W.on("monitor-pipeline-snapshot",w=>{let R=w;if(!(!R||!Array.isArray(R.workspaces)))try{ce.set(R.workspaces,R.workspaces_state,R.cross_lanes)}catch{}}),W.on("ui-order-snapshot",w=>{let R=w;if(R&&typeof R.revision=="number")try{Re.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),W.on("display-policy-snapshot",w=>{let R=w;if(R&&R.policy&&typeof R.policy=="object")try{Z.set(R.policy)}catch{}}),W.on("session-log-snapshot",w=>{let R=w;if(R&&typeof R.id=="string")try{Me.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),W.on("session-log-append",w=>{let R=w;if(R&&typeof R.id=="string")try{Me.append(R.id,R.event)}catch{}}),W.on("snapshot",w=>{let R=w,Le=R&&typeof R.id=="string"?R.id:"",Be=Le?ne.getStore(Le):null;if(Be&&R&&R.type==="snapshot")try{Be.applyPush(R)}catch{}}),W.on("upsert",w=>{let R=w,Le=R&&typeof R.id=="string"?R.id:"",Be=Le?ne.getStore(Le):null;if(Be&&R&&R.type==="upsert")try{Be.applyPush(R)}catch{}}),W.on("delete",w=>{let R=w,Le=R&&typeof R.id=="string"?R.id:"",Be=Le?ne.getStore(Le):null;if(Be&&R&&R.type==="delete")try{Be.applyPush(R)}catch{}});let je=null,ie=null,ee=null,Te=null,ft=()=>{},_t=new Promise(w=>{ft=()=>w(void 0)}),He=!1,mt=!1;async function st(w){let R=It(w);if(R===ie||R===ee)return;ee=R;let Le=`detail:${w}`,Be={type:"issue-detail",params:{id:w}};try{ne.register(Le,Be)}catch(ot){t("register detail store failed: %o",ot)}try{let ot=await K.subscribeList(Le,Be);if(lt.getState().selected_id!==w||It(w)!==R){await ot().catch(()=>{});return}je&&await je().catch(()=>{}),je=ot,ie=R}catch(ot){t("detail subscribe failed: %o",ot),B(ot,"issue details")}finally{ee===R&&(ee=null)}}let Jt=new Map,Mt=new Set,Zt={board:0,worker:0},G=!1,Ie=di;try{let w=window.localStorage.getItem(Wg);_l(w)&&(Ie=w)}catch{}let Fe="today";try{let w=window.localStorage.getItem(r0);w!==null&&(Fe=Yn(w))}catch{}async function Qe(w){if(!_l(w)||w===Ie)return;Ie=w;try{window.localStorage.setItem(Wg,w)}catch{}let R=Jt.get(Lr);if(!R)return;Jt.delete(Lr),await R().catch(()=>{});let Le=ze();try{ne.register(Lr,Le)}catch(Be){t("register %s store failed: %o",Lr,Be)}try{let Be=await K.subscribeList(Lr,Le);Jt.set(Lr,Be)}catch(Be){t("re-subscribe %s failed: %o",Lr,Be),B(Be,"board")}}async function at(w){let R=Yn(w);if(R===Fe)return;Fe=R;let Le=ht.get(Ir);if(!Le)return;ht.delete(Ir),await Le().catch(()=>{});let Be=oe();try{ne.register(Ir,Be)}catch(ot){t("register %s store failed: %o",Ir,ot)}try{let ot=await K.subscribeList(Ir,Be);ht.set(Ir,ot)}catch(ot){t("re-subscribe %s failed: %o",Ir,ot),B(ot,"worker")}}let ht=new Map,bt=null,Y=null,xt=null,qt=null,kt=null,Ut=null;async function Xt(){kt=null,Z.clear(),Ut=null,Oe.clear(),bt=null,Y=null,xt=null,Jt.clear(),ht.clear(),Zt.board+=1,Zt.worker+=1,Vt();let w=lt.getState().workspace.current?.path;if(w)try{await W.send("set-workspace",{path:w})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}en();let R=lt.getState();be(R.view==="board"),rt(R.view==="worker"),xe(Ae(R)),vt(R.view==="adr"),T(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function Ve(){t("clearing all subscriptions for workspace switch"),et(),Ke(),V(),se.clear(),rn(),Gt(),un(),en(),St();let w=lt.getState();if(w.selected_id)try{ne.unregister(`detail:${w.selected_id}`)}catch{}let R=lt.getState();be(R.view==="board"),rt(R.view==="worker"),xe(Ae(R)),T(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&pt(R.selected_id)}async function N(w){t("requesting workspace switch to %s",w),mt=!0;try{let R=await W.send("set-workspace",{path:w});t("workspace switch result: %o",R),R&&R.workspace&&(lt.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",w),R.changed&&(await Ve(),ve("Switched to "+wt(w),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),ve("Failed to switch workspace","error",3e3),R}finally{mt=!1}}async function $e(w){t("requesting workspace git pull for %s",w);try{let R=await W.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let Le=R?.status;if(Le==="up_to_date"){ve("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){ve("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ve("Git pulled "+wt(w),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let Le=R?.code,Be=R?.message;if(Le==="rebase_conflict"){ve("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){ve("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){ve("Git pull skipped: another operation is running","warning",3e3);return}let ot=Be?`: ${Be}`:"";throw ve(`Git pull failed${ot}`,"error",3e3),R}}async function Ue(w,R){t("setting workspace visibility %s \u2192 %s",w,String(R));try{await W.send("set-workspace-visibility",{path:w,visible:R}),await tt()}catch(Le){t("workspace visibility update failed: %o",Le),ve("Failed to update project visibility","error",3e3)}}async function tt(){try{let w=await W.send("list-workspaces",{});if(t("workspaces loaded: %o",w),w&&Array.isArray(w.workspaces)){let R=w.workspaces.map(gt=>({path:gt.path,database:gt.database,pid:gt.pid,version:gt.version})),Le=w.current?{path:w.current.root_dir,database:w.current.db_path}:null,Be=Array.isArray(w.hidden)?w.hidden.filter(gt=>typeof gt=="string"):[];lt.setState({workspace:{current:Le,available:R,hidden:Be}});let ot=window.localStorage.getItem("beads-ui.workspace");ot&&(!R.some(Rt=>Rt.path===ot)||Be.includes(ot)?window.localStorage.removeItem("beads-ui.workspace"):Le&&ot!==Le.path&&(t("restoring saved workspace preference: %s",ot),await N(ot)))}}catch(w){t("failed to load workspaces: %o",w)}}W.on("workspace-changed",w=>{t("workspace-changed event: %o",w),w&&w.root_dir&&(lt.setState({workspace:{current:{path:w.root_dir,database:w.db_path}}}),tt(),Ve())});let Et=!1;if(typeof W.onConnection=="function"){let w=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(Et=!0,ve("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&Et&&(Et=!1,ve("Reconnected","success",2200),n0(lt,(Le,Be)=>{t(`${Le}: %o`,Be)}),Xt())};W.onConnection(w)}let Tt="board";try{let w=window.localStorage.getItem("beads-ui.view");(w==="board"||w==="worker"||w==="monitor"||w==="compare"||w==="adr")&&(Tt=w)}catch(w){t("view parse error: %o",w)}let lt=sd({config:t0(),view:Tt});W.on("worker-queue-snapshot",w=>{let R=w;if(!R||!R.queue)return;let Le=lt.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&R.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{se.set(R.queue)}catch{}});let Bt=nd(lt);Bt.start();let An=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),$t=async(w,R)=>{try{return await Ce(w,R)}catch(Le){if(An.has(w))throw Le;return[]}};Nm({global_element:r,repo_element:s},lt,Bt);let bn=document.getElementById("workspace-picker");bn&&Lg(bn,lt,N,$e,Ue);let _n=Pm(e,(w,R)=>Ce(w,R));try{let w=document.getElementById("new-issue-btn");w&&w.addEventListener("click",()=>_n.open())}catch{}let mn=Fm(e,{policyStore:Z,queueStore:se,implPresetStore:Oe,transport:(w,R)=>Ce(w,R),onOpenChange:w=>{let R=G;G=w,De(),R&&w===!1&&S.refreshSessionDefaults()},labelOptions:()=>{let w=new Set;for(let[R]of il)for(let Le of ne.snapshotFor(R)||[]){let Be=Le.labels;if(Array.isArray(Be))for(let ot of Be)typeof ot=="string"&&ot.length>0&&w.add(ot)}return Array.from(w).sort()}});try{let w=document.getElementById("display-settings-btn");w&&(w.setAttribute("aria-label","\uC124\uC815"),w.setAttribute("title","\uC124\uC815"),w.addEventListener("click",()=>mn.open()))}catch{}let nt=document.createElement("div");nt.className="md-viewer-root",document.body.appendChild(nt);let A=Ha(nt,{getWorkspacePath:()=>lt.getState().workspace.current?.path}),m=Rd(l,{gotoIssue:w=>Bt.gotoIssue(w),issueStores:ne,transport:$t,workerQueueStore:se,uiOrderStore:Re,displayPolicyStore:Z,closedRange:Ie,onClosedRangeChange:w=>{Qe(w)},onNewIssue:()=>_n.open(),openDoc:p}),S=mu(a,{transport:$t,issueStores:ne,queueStore:se,sessionLogStore:Me,gotoIssue:w=>lt.setState({selected_id:w}),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:w=>N(w),openDoc:p,doneRange:Fe,onDoneRangeChange:w=>{at(w)}}),C=Lm(u,{transport:$t,pipelineStore:ce,execPresetStore:Oe,sessionLogStore:Me,router:Bt,gotoIssue:w=>Bt.gotoIssue(w),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:w=>N(w),openDoc:p}),re=Lf(d,{transport:$t,gotoIssue:w=>Bt.gotoIssue(w),execPresetStore:Oe,sourceCandidates:()=>{let w=new Map;for(let[R]of il)for(let Le of ne.snapshotFor(R)||[]){let Be=Le?.id;typeof Be=="string"&&Be.length>0&&!w.has(Be)&&w.set(Be,Le)}return Array.from(w.values())}});cd(f,{adrStore:Je,gotoIssue:w=>Bt.gotoIssue(w),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:w=>N(w),openDoc:p});let ge=lm(_,{issueStores:ne,transport:$t,queueStore:se,execPresetStore:Oe,sessionLogStore:Me,getWorkspacePath:()=>lt.getState().workspace.current?.path,mdViewer:A,depCandidates:()=>{let w=ce.get();if(w===null)return null;let R=ce.getWorkspacesState(),Le=lt.getState();if(Le.view==="monitor")return Ac(w,R);let Be=Le.workspace.current?.path;return Be?Ac(w,R,{root_dir:Be}):null},subscribeCandidates:w=>ce.subscribe(w),onDepChanged:({type:w,a:R,b:Le})=>{let Be=C;w==="dep-add"&&Be&&typeof Be.recorrectSharedLane=="function"&&Be.recorrectSharedLane(w,R,Le)},onNavigate:(w,R)=>{let Le=()=>{lt.getState().view==="worker"?lt.setState({selected_id:w}):Bt.gotoIssue(w)},Be=lt.getState().workspace.current?.path;if(typeof R!="string"||R.length===0||!Be||R===Be){Le();return}Promise.resolve(N(R)).then(Le).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let w=lt.getState();lt.setState({selected_id:null});try{Bt.gotoView(w.view==="worker"||w.view==="monitor"?w.view:"board")}catch{}},onOpenExecPresets:()=>{mn.open("execution")}}),we=lt.getState().selected_id;we&&(_.hidden=!1,ge.load(we),pt(we)),lt.subscribe(w=>{let R=w.selected_id;R?(_.hidden=!1,ge.load(R),mt||pt(R)):(ge.clear(),_.hidden=!0,St())});let Ee=w=>{l.hidden=w.view!=="board",a.hidden=w.view!=="worker",u.hidden=w.view!=="monitor",d.hidden=w.view!=="compare",f.hidden=w.view!=="adr",i&&i.classList.toggle("is-quiet",w.view==="monitor"||w.view==="compare"||w.view==="adr"),be(w.view==="board"),rt(w.view==="worker"),xe(Ae(w)),vt(w.view==="adr"),T(w.view==="board"||w.view==="worker"||G||!!w.selected_id),!w.selected_id&&w.view==="board"&&m.load(),w.view==="worker"?S.load():S.pause(),w.view==="monitor"?C.load():C.pause(),w.view==="compare"?re.load():re.pause(),window.localStorage.setItem("beads-ui.view",w.view)};lt.subscribe(Ee),Ee(lt.getState()),Gt(),en(),Vt(),tt().finally(()=>{He=!0,ft()}),window.addEventListener("keydown",w=>{let R=w.ctrlKey||w.metaKey,Le=String(w.key||"").toLowerCase(),Be=w.target,ot=Be&&Be.tagName?String(Be.tagName).toLowerCase():"",gt=ot==="input"||ot==="textarea"||ot==="select"||Be&&typeof Be.isContentEditable=="boolean"&&Be.isContentEditable;R&&Le==="n"&&(gt||(w.preventDefault(),_n.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let i=document.getElementById("theme-switch");i&&(i.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&a0(t)});export{a0 as bootstrap,t0 as readBootstrapConfig,n0 as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
