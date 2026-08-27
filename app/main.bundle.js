var A_=Object.create;var ta=Object.defineProperty;var S_=Object.getOwnPropertyDescriptor;var E_=Object.getOwnPropertyNames;var T_=Object.getPrototypeOf,C_=Object.prototype.hasOwnProperty;var R_=(e,t,n)=>t in e?ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var na=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var O_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of E_(t))!C_.call(e,s)&&s!==n&&ta(e,s,{get:()=>t[s],enumerable:!(r=S_(t,s))||r.enumerable});return e};var L_=(e,t,n)=>(n=e!=null?A_(T_(e)):{},O_(t||!e||!e.__esModule?ta(n,"default",{value:e,enumerable:!0}):n,e));var Ot=(e,t,n)=>R_(e,typeof t!="symbol"?t+"":t,n);var Oc=na((cw,Rc)=>{var Br=1e3,Ur=Br*60,Wr=Ur*60,xr=Wr*24,P_=xr*7,D_=xr*365.25;Rc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return N_(e);if(n==="number"&&isFinite(e))return t.long?F_(e):q_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function N_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*D_;case"weeks":case"week":case"w":return n*P_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return n*Br;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function q_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=Br?Math.round(e/Br)+"s":e+"ms"}function F_(e){var t=Math.abs(e);return t>=xr?$o(e,t,xr,"day"):t>=Wr?$o(e,t,Wr,"hour"):t>=Ur?$o(e,t,Ur,"minute"):t>=Br?$o(e,t,Br,"second"):e+" ms"}function $o(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Ic=na((uw,Lc)=>{function j_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=Oc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let v=0;v<d.length;v++)m=(m<<5)-m+d.charCodeAt(v),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,v=null,b,k;function N(...W){if(!N.enabled)return;let K=N,le=Number(new Date),Y=le-(m||le);K.diff=Y,K.prev=m,K.curr=le,m=le,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let B=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(j,Q)=>{if(j==="%%")return"%";B++;let V=n.formatters[Q];if(typeof V=="function"){let ue=W[B];j=V.call(K,ue),W.splice(B,1),B--}return j}),n.formatArgs.call(K,W),(K.log||n.log).apply(K,W)}return N.namespace=d,N.useColors=n.useColors(),N.color=n.selectColor(d),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:W=>{v=W}}),typeof n.init=="function"&&n.init(N),N}function r(d,m){let v=n(this.namespace+(typeof m>"u"?":":m)+d);return v.log=this.log,v}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of m)v[0]==="-"?n.skips.push(v.slice(1)):n.names.push(v)}function o(d,m){let v=0,b=0,k=-1,N=0;for(;v<d.length;)if(b<m.length&&(m[b]===d[v]||m[b]==="*"))m[b]==="*"?(k=b,N=v,b++):(v++,b++);else if(k!==-1)b=k+1,N++,v=N;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function a(d){for(let m of n.skips)if(o(d,m))return!1;for(let m of n.names)if(o(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Lc.exports=j_});var Mc=na((vn,xo)=>{vn.formatArgs=U_;vn.save=W_;vn.load=z_;vn.useColors=B_;vn.storage=H_();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function B_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function U_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+xo.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function W_(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function z_(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function H_(){try{return localStorage}catch{}}xo.exports=Ic()(vn);var{formatters:G_}=xo.exports;G_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ps=globalThis,go=ps.trustedTypes,_c=go?go.createPolicy("lit-html",{createHTML:e=>e}):void 0,sa="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,oa="?"+Qn,I_=`<${oa}>`,vr=document,fs=()=>vr.createComment(""),_s=e=>e===null||typeof e!="object"&&typeof e!="function",ia=Array.isArray,vc=e=>ia(e)||typeof e?.[Symbol.iterator]=="function",ra=`[ 	
\f\r]`,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mc=/-->/g,gc=/>/g,hr=RegExp(`>|${ra}(?:([^\\s"'>=/]+)(${ra}*=${ra}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bc=/'/g,hc=/"/g,wc=/^(?:script|style|textarea|title)$/i,aa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=aa(1),gs=aa(2),nw=aa(3),Cn=Symbol.for("lit-noChange"),Ut=Symbol.for("lit-nothing"),yc=new WeakMap,yr=vr.createTreeWalker(vr,129);function kc(e,t){if(!ia(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _c!==void 0?_c.createHTML(t):t}var $c=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=ds;for(let a=0;a<n;a++){let l=e[a],u,d,m=-1,v=0;for(;v<l.length&&(i.lastIndex=v,d=i.exec(l),d!==null);)v=i.lastIndex,i===ds?d[1]==="!--"?i=mc:d[1]!==void 0?i=gc:d[2]!==void 0?(wc.test(d[2])&&(s=RegExp("</"+d[2],"g")),i=hr):d[3]!==void 0&&(i=hr):i===hr?d[0]===">"?(i=s??ds,m=-1):d[1]===void 0?m=-2:(m=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?hr:d[3]==='"'?hc:bc):i===hc||i===bc?i=hr:i===mc||i===gc?i=ds:(i=hr,s=void 0);let b=i===hr&&e[a+1].startsWith("/>")?" ":"";o+=i===ds?l+I_:m>=0?(r.push(u),l.slice(0,m)+sa+l.slice(m)+Qn+b):l+Qn+(m===-2?a:b)}return[kc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ms=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[u,d]=$c(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(sa)){let v=d[i++],b=s.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?ho:k[1]==="?"?yo:k[1]==="@"?vo:kr}),s.removeAttribute(m)}else m.startsWith(Qn)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(wc.test(s.tagName)){let m=s.textContent.split(Qn),v=m.length-1;if(v>0){s.textContent=go?go.emptyScript:"";for(let b=0;b<v;b++)s.append(m[b],fs()),yr.nextNode(),l.push({type:2,index:++o});s.append(m[v],fs())}}}else if(s.nodeType===8)if(s.data===oa)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Qn,m+1))!==-1;)l.push({type:7,index:o}),m+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===Cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=_s(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var bo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new Fr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new wo(o,this,t)),this._$AV.push(u),l=r[++a]}i!==l?.index&&(o=yr.nextNode(),i++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ut,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),_s(t)?t===Ut||t==null||t===""?(this._$AH!==Ut&&this._$AR(),this._$AH=Ut):t!==this._$AH&&t!==Cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):vc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ut&&_s(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ms.createElement(kc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new bo(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=yc.get(t.strings);return n===void 0&&yc.set(t.strings,n=new ms(t)),n}k(t){ia(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(fs()),this.O(fs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ut,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ut}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=wr(this,t,n,0),i=!_s(t)||t!==this._$AH&&t!==Cn,i&&(this._$AH=t);else{let a=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=wr(this,a[r+l],n,l),u===Cn&&(u=this._$AH[l]),i||(i=!_s(u)||u!==this._$AH[l]),u===Ut?t=Ut:t!==Ut&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}i&&!s&&this.j(t)}j(t){t===Ut?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ho=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ut?void 0:t}},yo=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ut)}},vo=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Ut)===Cn)return;let r=this._$AH,s=t===Ut&&r!==Ut||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ut&&(r===Ut||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},wo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},xc={M:sa,P:Qn,A:oa,C:1,L:$c,R:bo,D:vc,V:wr,I:Fr,H:kr,N:yo,U:vo,B:ho,F:wo},M_=ps.litHtmlPolyfillSupport;M_?.(ms,Fr),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Fr(t.insertBefore(fs(),o),o,void 0,n??{})}return s._$AI(e),s};var ko="today",Ac=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],jr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Kn(e){return e==="today"?"today":"7d"}function la(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Sc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ec(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Tc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,a){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Cc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,o],a.last_event_at=Date.now(),e.set(i,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Pc=L_(Mc(),1);function qt(e){return(0,Pc.default)(`beads-ui:${e}`)}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function qc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Ao(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Fc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Pn(e.created_at),o=Pn(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function jc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var K_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Dc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Nc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=K_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Bc(e,t){let n=Dc(e),r=Dc(t);if(n!==r)return n<r?-1:1;let s=Nc(e),o=Nc(t);if(s!==o)return s<o?-1:1;let i=Pn(e&&e.created_at),a=Pn(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ca=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function So(e){return(t,n)=>{let r=zr(t,e),s=zr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function ua(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:zr(a,n)-ca};if(!a)return{rank:zr(i,n)+ca};let l=zr(i,n),u=zr(a,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,v)=>({bead_id:m.id,rank:v*ca}))}}function da(e,t={}){let n=qt(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||Ar;function u(){for(let v of Array.from(i))try{v()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function m(v){if(a||!v||v.id!==e)return;let b=Number(v.revision)||0;if(n("apply %s rev=%d",v.type,b),!(b<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(v.issues)?v.issues:[];for(let N of k)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);d(),o=b,u();return}if(v.type==="upsert"){let k=v.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let N=r.get(k.id);if(!N)r.set(k.id,k);else{let W=Number.isFinite(N.updated_at)?N.updated_at:0,K=Number.isFinite(k.updated_at)?k.updated_at:0;if(W<=K){for(let le of Object.keys(N))le in k||delete N[le];for(let[le,Y]of Object.entries(k))N[le]=Y}}d()}o=b,u()}else if(v.type==="delete"){let k=String(v.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(v){return i.add(v),()=>{i.delete(v)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(v){return r.get(v)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function Eo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Uc(e){let t=qt("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],v=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let N=k.itemsById;for(let W of d)typeof W=="string"&&W.length>0&&N.set(W,!0);for(let W of m)typeof W=="string"&&W.length>0&&N.set(W,!0);for(let W of v)typeof W=="string"&&W.length>0&&N.delete(W)}}async function o(a,l){let u=Eo(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let m=n.get(a);if(m&&m.key!==u){let v=r.get(m.key);v&&(v.delete(a),v.size===0&&r.delete(m.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(m){let v=n.get(a)||null;if(v){let b=r.get(v.key);b&&(b.delete(a),b.size===0&&r.delete(v.key))}throw n.delete(a),m}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let m=n.get(a)||null;if(m){let v=r.get(m.key);v&&(v.delete(a),v.size===0&&r.delete(m.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Eo,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Wc(){let e=qt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,u,d){let m=u?Eo(u):"",v=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,v),b&&v&&m&&v!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let N=s.get(l);if(N){try{N()}catch{}s.delete(l)}let W=da(l,d);t.set(l,W);let K=W.subscribe(()=>o());s.set(l,K)}else if(!b){let k=da(l,d);t.set(l,k);let N=k.subscribe(()=>o());s.set(l,N)}return n.set(l,m),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function zc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Hc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function pa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function V_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Y_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Gc(e){let t=qt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):V_(r),i=Y_(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=pa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?pa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Z_=Object.freeze({workspace_config:{default_workspace:null}});function Kc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Z_.workspace_config.default_workspace}}}function Vc(e={}){let t=qt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Kc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Kc(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Yc(e){let t=qt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(m,v)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let N=!1,W=()=>{N||(N=!0,r.delete(b),a())},K=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),W())},3e4);try{let le=await u(m,v),Y=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,Y),le}catch(le){let Y=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,Y,le),le}finally{clearTimeout(K),W()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function To(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(jc),l;switch(a){case"created_desc":return l.sort(Ar),l;case"created_asc":return l.sort(qc),l;case"updated_desc":return l.sort(Ao),l;case"priority":return l.sort(Fc),l;case"manual":default:{let u=n();return u?l.sort(So(u)):l.sort(Ar),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Dn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function on(e){let t=Dn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Dn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function Zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Dn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Co(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ro(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Co(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Oo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Zc(n);return{total:n.length,count:r,current:s,children:n}}function Lo(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ua(a,l,u.order),i);s(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let v={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(v);let b=r(ua(a,l,v.order),i);s(v,b);let k=await t("ui-order-set",{expected_revision:v.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Xc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Io(e,t){let n=Xc(e),r=Xc(t);return n.length===0||r.length===0?!1:n!==r}function Mo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function fa(e,t){return!t||typeof e!="string"||e.length===0||Mo(t.visible_labels).includes(e)?!0:Mo(t.hidden_labels).includes(e)?!1:!Mo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Qc(e,t){return Mo(e).filter(n=>fa(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function X_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Q_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function J_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${X_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Po(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(Bc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Q_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>J_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var em={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},eu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Jc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},tm={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function nm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function tu(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function rm(e){if(!e||e.fill==="none"||!e.approval_state)return tu(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function sm(e,t,n,r){let s=em[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,a=tm[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),i&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",m=eu[e]||e,v=r?nu(t):null;if(!v)return c`
      <div class="seg">
        <div class=${l} style=${d}>${a}</div>
        <div class=${u}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${v.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,v,e)}}
    >
      <div class=${l} style=${d}>${a}</div>
      <div class=${u}>${m}</div>
    </button>
  `}function nu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Do(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Jc[e.route]||Jc.spec_backed,o=e.stages,i=nm(s,o,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${eu[u]||u} ${u==="plan"?rm(o[u]||{}):tu(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>nu(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(u=>sm(u,o[u]||{},u===i,r))}
    </div>
  `}function om(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ru=2;function su(e){let t=e.slice(0,ru).join(", "),n=e.length-ru;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function im(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(Io(e,i)?o:s).push(i);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${su(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${su(o)}</span
      >`),n}function _a(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function No(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${No(e)}@${e.sha}`}function qo(e,t){if(!e)return null;let n=_a(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=_a(t?.kind),i=o!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function ou(e,t){let n=qo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function am(e){if(!e)return null;let t=_a(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function lm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&cr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let a=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let o=ou(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let a=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(a)}`}
        >${`exec ${a.kind==="delegated"?No(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Qc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&cr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")&&s.push(...im(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function cm(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function um(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Po(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:cm(e),empty_label:"children \uC5C6\uC74C",childChips:ma,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ma(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return qo(t,n)?c`<span class="board-card__roll-child-chips">
    ${ou(t,n)}
    ${am(n)}
  </span>`:null}function Fo(e,t){let n=om(e.priority);return c`
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
      ${lm(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?Do(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${um(e,t)}
    </article>
  `}function Hr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Ac.map(o=>c`<option
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
        ${e.items.map(o=>Fo(o,t))}
      </div>
    </section>
  `}function iu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Fo(r,t))}
        </div>
      </div>
    </dialog>
  `}var dm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],pm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],fm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function _m(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
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
  `}function au(e,t,n){return c`
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
        ${dm.map(r=>c`<option
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
        ${pm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${_m(e,t,n)}
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
        ${fm.map(r=>c`<option
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
  `}var mm=200,gm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},bm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),lu="beads-ui.board.sort",cu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function hm(){try{let e=window.localStorage.getItem(lu);if(e&&cu.has(e))return e}catch{}return"created_desc"}function uu(e,t){let n=qt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,v=t.closedRange||ko,b=s?To(s,i):null,k=Lo({transport:o,uiOrderStore:i}),N=[],W=[],K=[],le=[],Y=[],B=[],D=!1,j=0,Q=hm(),V=new Map,ue=new Map,U=new Map,Z=new Set,ie={search:"",priority:"",type:"",labels:[]},ne=!1,Ee=null;function Ue(C){return String(C.status||"open")==="open"}function me(C){let H=String(C.status||"open");return H==="open"||H==="blocked"}function X(C){let H=ie.search.trim().toLowerCase(),Ie=ie.priority,Be=ie.type,Ae=ie.labels;return C.filter(lt=>{if(H){let st=String(lt.id||"").toLowerCase(),ye=String(lt.title||"").toLowerCase();if(!st.includes(H)&&!ye.includes(H))return!1}if(Ie!==""&&String(lt.priority)!==Ie||Be!==""&&String(lt.issue_type||"")!==Be)return!1;if(Ae.length>0){let st=Array.isArray(lt.labels)?lt.labels:[];if(!Ae.some(ye=>st.includes(ye)))return!1}return!0})}function Te(){let C=new Set;for(let H of[N,W,K,le,Y,B])for(let Ie of H){let Be=Array.isArray(Ie.labels)?Ie.labels:[];for(let Ae of Be)typeof Ae=="string"&&Ae.length>0&&C.add(Ae)}return Array.from(C).sort()}function Le(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function T(){try{if(b){let C=b.selectBoardColumn("tab:board:in-progress","in_progress",Q),H=b.selectBoardColumn("tab:board:blocked","blocked",Q).filter(me),Ie=new Set(C.map(F=>F.id)),Be=b.selectBoardColumn("tab:board:ready","ready",Q).filter(F=>Ue(F)&&!Ie.has(F.id)),Ae=b.selectBoardColumn("tab:board:resolved","resolved",Q),lt=b.selectBoardColumn("tab:board:deferred","deferred",Q),st=b.selectBoardColumn("tab:board:closed","closed").slice(0,mm),ye=[...H,...Be,...C,...Ae,...st];se(ye);let Xe=new Set;for(let F of ye)F&&F.id&&!Co(F)&&Xe.add(F.id);let P=!Le();N=P?bs(H,Xe):H,W=P?bs(Be,Xe):Be,K=P?bs(C,Xe):C,le=P?bs(Ae,Xe):Ae,Y=lt,j=lt.length,B=P?bs(st,Xe):st,V=new Map;for(let F of N)V.set(F.id,"open");for(let F of W)V.set(F.id,"open");for(let F of K)V.set(F.id,"in_progress");for(let F of le)V.set(F.id,"resolved");for(let F of Y)V.set(F.id,"deferred");for(let F of B)V.set(F.id,"closed");ue=new Map;for(let F of N)ue.set(F.id,"blocked-col");for(let F of W)ue.set(F.id,"ready-col");for(let F of K)ue.set(F.id,"in-progress-col");for(let F of le)ue.set(F.id,"resolved-col");for(let F of B)ue.set(F.id,"closed-col")}pt()}catch{N=[],W=[],K=[],le=[],Y=[],B=[],U=new Map,pt()}}function se(C){U=Ro(C)}function $e(C){return Oo(U,C)}function we(C){return!Z.has(C)}function xe(C,H){C.preventDefault(),C.stopPropagation(),Z.has(H)?Z.delete(H):Z.add(H),pt()}function be(C,H){C.preventDefault(),C.stopPropagation(),r(H)}function Se(C,H){C.preventDefault(),C.stopPropagation(),r(H)}function it(C,H){Ee||r(H)}function ht(C,H){C.preventDefault(),C.stopPropagation(),ym(H).then(Ie=>{Ie&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function _t(C,H){Ee=H,C.dataTransfer&&(C.dataTransfer.setData("text/plain",H),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function wt(C){C.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Ee=null},0)}function R(C){let H=String(C.target.value||"");!H||H===v||(v=H,u&&u(H),pt())}function oe(){return a?a.get():null}function Ce(C){let H=l?l.get():null,Ie=H?H.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let Be=Ie[C];return!Be||typeof Be!="object"||Array.isArray(Be)?null:Be}let Ne={onCardClick:it,onCopyId:ht,onDragStart:_t,onDragEnd:wt,onClosedRangeChange:R,rollupFor:$e,isExpanded:we,onRollupToggle:xe,onChildClick:be,onFromChipClick:Se,onOpenDoc:m?(C,H)=>m(H):void 0,cleanupFailureFor:Ce,get policy(){return oe()}};function We(C,H){Ee||(Me(),r(H))}function Je(C,H){C.preventDefault(),C.stopPropagation(),Me(),r(H)}let tt={...Ne,onCardClick:We,onChildClick:Je,onFromChipClick:Je,onOpenDoc:m?(C,H)=>{Me(),m(H)}:void 0,get policy(){return oe()}};function bt(C){let H=C.target,Ie=e.querySelector(".board-filter__labels");H&&Ie&&Ie.contains(H)||he()}function te(C){C.key==="Escape"&&he()}function G(){ne||(ne=!0,document.addEventListener("mousedown",bt),document.addEventListener("keydown",te),pt())}function he(){ne&&(ne=!1,document.removeEventListener("mousedown",bt),document.removeEventListener("keydown",te),pt())}function ct(C){C.key==="Escape"&&Me()}function nt(){D||(D=!0,document.addEventListener("keydown",ct),pt())}function Me(){D&&(D=!1,document.removeEventListener("keydown",ct),pt())}let Fe={onClose:Me,onOverlayClick(C){C.target===C.currentTarget&&Me()}},dt={onSearchInput(C){ie.search=String(C.target.value||""),T()},onPriorityChange(C){ie.priority=String(C.target.value||""),T()},onTypeChange(C){ie.type=String(C.target.value||""),T()},onSortChange(C){let H=String(C.target.value||"");if(!(!cu.has(H)||H===Q)){Q=H;try{window.localStorage.setItem(lu,H)}catch{}T()}},onDeferredToggle(){D?Me():nt()},onLabelMenuToggle(){ne?he():G()},onLabelToggle(C){let H=ie.labels.indexOf(C);H===-1?ie.labels.push(C):ie.labels.splice(H,1),T()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],T())},onNewIssue(){d&&d()}};function at(){return c`
      <div class="board-view">
        ${au(ie,dt,{sort_mode:Q,deferred_popup_open:D,deferred_count:j,label_options:Te(),label_menu_open:ne})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:X(N)},Ne)}
          ${Hr({title:"Ready",id:"ready-col",items:X(W)},Ne)}
          ${Hr({title:"In progress",id:"in-progress-col",items:X(K)},Ne)}
          ${Hr({title:"Resolved",id:"resolved-col",items:X(le)},Ne)}
          ${Hr({title:"Closed",id:"closed-col",items:X(B),is_closed:!0,closed_range:v},Ne)}
        </div>
        ${D?iu({items:X(Y),count:j},tt,Fe):""}
      </div>
    `}function pt(){rt(at(),e),Et()}function Et(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of H)Array.from(Ie.querySelectorAll(".board-card")).forEach((Ae,lt)=>{Ae.tabIndex=lt===0?0:-1})}catch{}}async function zt(C,H){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:H}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(C){switch(C){case"blocked-col":return N;case"ready-col":return W;case"in-progress-col":return K;case"resolved-col":return le;default:return[]}}function Lt(C,H,Ie){if(!o||!i)return;let Be=Ht(C),Ae=Be.find(P=>P.id===H);if(!Ae)return;let lt=Be.filter(P=>P.id!==H),st=Ie.closest?Ie.closest(".board-card"):null,ye=lt.length;if(st){let P=st.getAttribute("data-issue-id");if(P===H)return;let F=lt.findIndex(ve=>ve.id===P);F>=0&&(ye=F)}let Xe=lt.slice();Xe.splice(ye,0,Ae),k.applyReorder(H,Xe,ye)}function It(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let xt=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let Ie=C.target.closest(".board-column");Ie&&Ie!==xt&&(xt&&xt.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),xt=Ie)}),e.addEventListener("dragleave",C=>{let H=C.relatedTarget;(!H||!e.contains(H))&&xt&&(xt.classList.remove("board-column--drag-over"),xt=null)}),e.addEventListener("drop",C=>{C.preventDefault(),xt&&(xt.classList.remove("board-column--drag-over"),xt=null);let H=C.target,Ie=H.closest(".board-column");if(!Ie)return;let Be=C.dataTransfer?.getData("text/plain")||"";if(!Be)return;let Ae=Ie.id,lt=ue.get(Be);if(lt&&lt===Ae){if(bm.has(Ae)){if(Q!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Lt(Ae,Be,H)}return}let st=gm[Ae];if(!st){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(Be)!==st&&zt(Be,st)}),e.addEventListener("keydown",C=>{let H=C.target;if(!(H instanceof HTMLElement))return;let Ie=String(H.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||H.isContentEditable===!0)return;let Be=H.closest(".board-card");if(!Be)return;let Ae=String(C.key||"");if(Ae==="Enter"||Ae===" "){C.preventDefault();let Xe=Be.getAttribute("data-issue-id");Xe&&r(Xe);return}if(Ae!=="ArrowUp"&&Ae!=="ArrowDown"&&Ae!=="ArrowLeft"&&Ae!=="ArrowRight")return;C.preventDefault();let lt=Be.closest(".board-column");if(!lt)return;let st=Array.from(lt.querySelectorAll(".board-card")),ye=st.indexOf(Be);if(Ae==="ArrowDown"&&ye<st.length-1){je(Be,st[ye+1]);return}if(Ae==="ArrowUp"&&ye>0){je(Be,st[ye-1]);return}if(Ae==="ArrowLeft"||Ae==="ArrowRight"){let Xe=Array.from(e.querySelectorAll(".board-column")),P=Xe.indexOf(lt),F=Ae==="ArrowRight"?1:-1,ve=P+F;for(;ve>=0&&ve<Xe.length;){let Ge=Xe[ve].querySelector(".board-card");if(Ge){je(Be,Ge);return}ve+=F}}});function je(C,H){try{C.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let I=null;b&&b.subscribe&&(I=b.subscribe(()=>{try{T()}catch{}}));let J=null;a&&a.subscribe&&(J=a.subscribe(()=>{try{T()}catch{}}));let ge=null;return l&&l.subscribe&&(ge=l.subscribe(()=>{pt()})),{async load(){n("load"),T()},clear(){he(),Me(),I&&(I(),I=null),J&&(J(),J=null),ge&&(ge(),ge=null),e.replaceChildren(),N=[],W=[],K=[],le=[],Y=[],B=[],V=new Map,ue=new Map}}}function bs(e,t){return e.filter(n=>{let r=Co(n);return!(r&&t.has(r))})}async function ym(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var kn=e=>e??Ut;async function Nn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Sr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function hs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function vm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${Sr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,a,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await vm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var wm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],du={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},km=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Wt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function Dt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function fu(e,t,n){let r=Wt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Wt(n[e]);return s===null?null:{value:s,source:"global"}}function ys(e,t,n,r){return fu(e,t,n)||{value:r,source:"base"}}function ga(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&tn(s?.[t])){let i=Wt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&tn(s)){for(let i of Object.values(s))if(tn(i)){let a=Wt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return Wt(r?.runners?.[o]?.models?.[e]?.id)||e}function $m(e,t){return Wt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return Dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return Dt(e,t,r,e,"explicit")}function _u(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];tn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(tn(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function xm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(tn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Am(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of xm(t,n)){let o=_u(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ba(e){return Dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function pu(e,t,n){let r=fu(e,t,n);return r?Kr(r.value,r.source):Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function $n(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&tn(r.session)?r.session:null,o=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,i=tn(e.runner_catalog)?e.runner_catalog:null,a=Wt(n.quick_fix_impl_model),l=Am(a,s,i),u={};if(s){let d=ys("workflow_mode",t,n,Wt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Dt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Kr(d.value,d.source);for(let Y of["spec_review","plan_review","impl_review"]){let B=`${Y}_model`,D=Wt(Y==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=ys(B,t,n,D);if(j.value===null)u[B]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!tn(s.review?.reviewers?.[j.value]))u[B]=ba(Dt(j.value,j.source,"",null,"explicit"));else{let Q=$m(j.value,s);u[B]=Dt(j.value,j.source,Gr(Q),Q,j.source==="base"?"default":"explicit")}}for(let[Y,B]of Object.entries(du)){let D=u[B].value;if(D==="self"||D==="skip"){u[Y]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=Wt(s.review?.reviewers?.[D||""]?.effort),Q=ys(Y,t,n,j);u[Y]=Q.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(Q.value,Q.source,Q.value,Q.value,Q.source==="base"?"default":"explicit")}let m=tn(s.implementation?.default)?s.implementation.default:{},v=Wt(e.route),b=v!==null&&["quick_fix","spec_backed","full_plan"].includes(v),k=tn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=b&&tn(k[v])?k[v]:{};for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=ys(Y,t,n,Y==="impl_dispatch"?Wt(N.dispatch)||Wt(m.dispatch):Wt(m[Y.replace("impl_","")]));u[Y]=B.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let W=Wt(t.impl_runtime),K=W==="inherit"?Wt(e.controller_runtime):W,le=v==="quick_fix"&&Wt(t.impl_dispatch)===null&&l.runtime!==null&&(W===null||K===l.runtime);if(le){let Y=l.runtime,B=a;u.impl_dispatch=Dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(u.impl_runtime=Dt(Y,"global",`${Y} (\uC720\uB3C4)`,Y,"explicit")),Wt(t.impl_model)===null&&(u.impl_model=Dt(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Y]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Y=u.impl_runtime.value==="inherit"?Wt(e.controller_runtime):u.impl_runtime.value,B=Y?_u(Y,s,i):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=ba(u.impl_model);else{let D=ga(u.impl_model.value,Y,s,i);u.impl_model.display=Gr(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let Y=Wt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=Y?Wt(s.implementation?.effort_by_transport?.[Y]?.auto):null;B&&!km.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",u.impl_speed.source))}}else for(let d of wm.filter(m=>!m.startsWith("orchestration_")))u[d]=pu(d,t,n);if(!s){for(let[d,m]of Object.entries(du))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=pu(d,t,n);continue}let m=d.replace("orchestration_",""),v=Wt(o[m]),b=ys(d,t,n,v);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Wt(o.model_id)||b.value:ga(b.value,null,s,i);u[d]=Dt(b.value,b.source,Gr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}u[d]=Kr(b.value,b.source)}if(s)if(a===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Dt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(d)})`,null,"default")}else if(l.runtime!==null){let d=ga(a,l.runtime,s,i);u.quick_fix_impl_model=Dt(a,"global",Gr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=ba(Dt(a,"global","",null,"explicit")):u.quick_fix_impl_model=Kr(a,"global");return u}function Sm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function jo(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let v={...r,...m};return $n({pin:e.layer==="pin"?v:t,global:e.layer==="pin"?n:v,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let a=s(i)[e.key],l=s(o)[e.key],u=Wt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Sm(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let v=s({...o,[e.key]:m})[e.key];return{value:m,label:v.display,full_value:v.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(a=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(m))},d=()=>u(r.value.trim());o.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ha(e){return`session:${e.provider}:${e.session_id}`}function vs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Em(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:ha(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:vs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Em(e,n)}}}var ya="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Tm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",mu="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Yn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Zr=[...Yn,"reasoning_output_tokens"],Cm={codex:["implementation","review-consult"],claude:["subagent"]};function va(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Yn.some(t=>Number.isFinite(e[t]))}function Rm(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))}function wa(e){let t=0;for(let n of Yn)t+=Zt(e?.[n]);return t}function Om(e){return!e||typeof e!="object"?!1:Yn.some(t=>Number.isFinite(e[t]))}function gu(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Lm(e){let t={};for(let n of Zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function bu(e){let t={};for(let n of Zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function hu(e,t){return va(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):wa(t)}function Im(e){return e==="claude"?"Claude":"Codex"}function Mm(e){return`\u03C4 ${vu(e)}`}function Pm(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(va(n)||r>0&&!Rm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Tm];return t.replayed&&u.push(ya),u.join(`
`)}let s=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${mu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${mu}`:o,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ya),l.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Im(n)} ${Mm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Pm(n,r)})}return t}function Uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=Zt(a.total_only_subtotal)+Zt(i.total_only_subtotal));for(let l of Zr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=Zt(a.breakdown[l])+Zt(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ka(e){return!e||typeof e!="object"?null:Rn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Dm(e){return e==="codex"?"codex":"claude"}function Vn(){return{subtotal:0,breakdown:Lm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bo(e,t,n){e.subtotal+=t.subtotal,va(t.usage)&&(e.total_only+=t.subtotal);for(let r of Zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function yu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function vu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return Om(e)?`\u03C4 ${vu(wa(e))}`:null}function tr(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ws(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${wa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ya),n.join(`
`)}function Rn(e,t){let n={claude:Vn(),codex:Vn()},r={orchestrator:{claude:Vn(),codex:Vn()},implementation:{claude:Vn(),codex:Vn()},"review-consult":{claude:Vn(),codex:Vn()},subagent:{claude:Vn(),codex:Vn()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(gu(l)){let d=Dm(a.runner),m=bu(l),v={provider:d,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:m,subtotal:hu(d,m)};m.replayed===!0&&(v.replayed=!0),typeof a.model=="string"&&(v.model=a.model),typeof a.session_id=="string"&&(v.session_id=a.session_id),Bo(n[d],v,!0),Bo(r.orchestrator[d],v,!0)}let u=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Cm[m].includes(d.role)||!gu(d.usage))continue;let v=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!v||s.has(v))continue;s.add(v);let b=bu(d.usage),k={provider:m,role:d.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:hu(m,b)};k.receipt_id=v,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),Bo(n[m],k,!1),Bo(r[k.role][m],k,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let u=yu(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[a]=u}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[a][u];d.legs.length>0&&(l[u]={...yu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}function wu(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let i=[],a=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),v=Number(a.get(l))>Number(a.get(d));m&&v&&(u===null||Number(a.get(d))>Number(a.get(u)))&&(u=d)}u!==null&&i.push({bead_id:l,after:u})}return{order:o,corrections:i,cycle:!1}}var Nm="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",zo="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",qm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Fm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ks(e,t){return`${e}\0${t}`}function jm(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(a=>a!==s&&n.has(a)))}return r}function Bm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function As(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=jm(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,v]of s)for(let b of v)o.push({blocker:b,blockee:m});let i=Bm(e,t),a=new Map(r.map((m,v)=>[m,v])),l=r.slice(0,i).filter(m=>s.get(m).some(v=>Number(a.get(v))>Number(a.get(m)))),u=wu(r.slice(i),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function ku(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:As(n,t)}function Um(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Wm(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function zm(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function $a(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function Hm(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add(ks(i,l));let r=new Map,s=new Map;for(let i of e){let a=ks(i.a,i.b);r.set(a,i),s.set(a,i.type==="dep-add")}let o=[];for(let i of e){let a=ks(i.a,i.b);r.get(a)===i&&s.get(a)!==n.has(a)&&o.push(i)}return o}function Gm(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Km(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Wo(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function xa(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ss(e){let t=zm(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Wm(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,m)=>{if(s.refusal!==null||u===d)return;let v=t.get(u)||[];if(v.includes(d))return;let b=o(u);if(b!==null){if($a(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...v,d]),m!==void 0&&r.add(ks(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let v=o(u);v!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:v}))},laneCreated:(u,d)=>r.has(ks(u,d))}}function Es(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Hm(e.dep_ops,t.blocked_by_map),i=o.filter(d=>d.type==="dep-remove"),a=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Um(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...u===void 0?{}:{correction:u}}}function $u(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function $s(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function xu(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||o.set(a,[...o.get(a)||[],i.bead_id])}for(let[i,a]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return s}function Au(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let a=s.get(i)??0;r.push(Wo(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),s.set(i,a+1)}}function xs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ho(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Aa(e,t,n){let r=Ss(n),s=[],o=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Nm};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:qm};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xa(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&d===void 0)return{refused:Qr};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(Y=>Y.bead_id===e.bead_id);if(k<0)return;let N=k>0?d.entries[k-1]:null,W=k+1<d.entries.length?d.entries[k+1]:null,K=$s(d,k),le=W!==null&&$s(d,k+1);K&&N!==null&&r.removeDep(e.bead_id,N.bead_id),le&&W!==null&&r.removeDep(W.bead_id,e.bead_id),(K||le)&&N!==null&&W!==null&&r.addDep(W.bead_id,N.bead_id,u)},v=(k,N)=>{let W=n.cross_lanes.get(k),K=W.entries.findIndex(U=>U.bead_id===e.bead_id),le=W.entries.filter(U=>U.bead_id!==e.bead_id),Y=Math.max(0,Math.min(le.length,K>=0&&N>K?N-1:N)),B=-1;if(le.forEach((U,Z)=>{n.fixed_members.has(U.bead_id)&&(B=Z)}),Y<=B){r.state.refusal=Fm;return}let D=K>=0?W.entries[K]:d?.entries.find(U=>U.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=As({status:W.status,entries:[...le.slice(0,Y),D,...le.slice(Y)]},n);let j=a.entries;if(Ho(j,W.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:xs(j)}}),W.status!=="confirmed")return;let Q=j.findIndex(U=>U.bead_id===e.bead_id),V=Q>0?j[Q-1].bead_id:null,ue=Q+1<j.length?j[Q+1].bead_id:null;if(V===null){ue!==null&&r.addDep(ue,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),ue!==null&&(r.graph.get(ue)||[]).includes(V)){let U=W.entries.findIndex(Z=>Z.bead_id===ue);(r.laneCreated(ue,V)||U>0&&W.entries[U-1].bead_id===V&&$s(W,U))&&r.removeDep(ue,V),r.addDep(ue,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...xu(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:xs(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&v(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Gm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Wo(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let N=n.parallel_rows,W=N[Math.max(0,Math.min(N.length,t.marker_index))];if(!(!!W&&W.bead_id===e.bead_id)&&Km(n,e.root_dir)&&b!==void 0){let le=b>k?k:k-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Wo(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Wo(e.bead_id,e.root_dir,t.index,t.lane_id));return Es(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function Su(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=As(n,t);if(r.held)return{refused:zo};let s=r.entries,o=Ss(t),i=[];$u(o,s,e),o.state.refusal===null&&Au(o,t,s,i);let a=Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Es(o,t,a,i,{lane_id:e,correction:r})}function Eu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=As(n,t),s=r.entries,o=Ss(t),i=[];$u(o,s,e),o.state.refusal===null&&Au(o,t,s,i);let a=Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}];return Es(o,t,a,i,{lane_id:e,correction:r})}function Tu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=As(n,t),s=r.entries;return Es(Ss(t),t,Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}],[],{lane_id:e,correction:r})}function Cu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ss(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)$s(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Es(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:xu(t,n,e,n.entries)})}function Ru(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;$s(n,i)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${xa(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Ou(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Lu(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function Sa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xa(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Iu={running:3,paused:2,failed:1};function Er(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Mu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Pu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Er(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Er(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),m=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,u=o.get(i.bead_id);if(u){let d=Iu[u.run_state],m=Iu[a];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}o.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:o,resumed_from_ids:r}}var Go=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ta=[...Go.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Ko=[...Go,...nr],Vm=Ta.filter(e=>Ko.includes(e)),Du=["delegated","main"],Vo=["inherit","claude","codex"],Ts=["default","fast"],Cs=["standard","fast_track"],Rs=["codex","opus","fable","self","skip"],Yo=["codex","fable","skip"],Zo=["low","medium","high","xhigh"],Sn="auto";function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Nu(e){if(!An(e)||!An(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))An(r)&&An(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Nu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Sn,...r.flatMap(([,s])=>s)]}function qu(e,t,n,r){if(!An(e)||!An(e.runners))return[Sn];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!An(i)||!An(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==Sn&&a!==n)continue;let u=r(i,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Sn,...s]}function es(e,t,n){return qu(e,t,n,(r,s)=>An(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ca(e,t,n){return qu(e,t,n,(r,s)=>An(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:An(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Os(e,t){let n=Nu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Fu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Jr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!es(t,s,r.impl_model||Sn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Ym={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ea=[...Vm,...nr],Zm=[...Ko,...Ta].filter((e,t,n)=>n.indexOf(e)===t&&!Ea.includes(e));function ju(e,t){let n=An(e)?e:{},r=An(t)?t:{},s=[];for(let i of Ea){let a=n[i]??null,l=r[i]??null;a!==l&&s.push({key:i,label:Ym[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let o=[];for(let i of[...Zm,...Object.keys(r)])!Ea.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function Ra(e,t,n,r,s,o){return jo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Bu(e,t){let n={};for(let r of Ta){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Uu(e,t){let n={};for(let r of nr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Oa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Xo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function La(e,t,n,r,s,o=null){let i=$n({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(a=>({key:a,...i[a]}))}function Wu(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let a of La(e,t,n,r,s,o))i[a.source]+=1;return i}function zu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Hu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var jk=[...Go,...nr];var Gu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ls(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qo(e){if(!Ls(e)||!Ls(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ls(n)&&Ls(n.models));return t.length>0?t:null}function qn(e,t){let n=Qo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Ku(e,t){return Ls(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Vu(e,t){let n=Qo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Ku(r,r.models[t]);return[]}function Xm(e){let t=Qo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Ku(r,s))n.includes(o)||n.push(o);return n}function Qm(e,t){if(!t)return Xm(e);let r=Qo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of Vu(e,o))s.includes(i)||s.push(i);return s}function Yu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=qn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Vu(t,r.impl_model):Qm(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ia=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Zu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${Xo[t.source]})`}function Ma(e){return e.filter(t=>t!==null).join(`
`)}function Is(e){if(typeof e!="object"||e===null)return null;let t=Sr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function Tr(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),s=pr(e,"orchestration_speed"),o=Zu([qn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",s)])}}function Jm(e,t){return e===null||e.value===null||Ia.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function eg(e){return e===null||Ia.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function tg(e){return e===null?null:e.value==="auto"?"auto":Ia.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),s=pr(e,"impl_model"),o=pr(e,"impl_effort"),i=pr(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":Zu([Jm(r,t??null),eg(s),tg(o),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:Ma(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",s),fr("impl_effort",o),fr("impl_speed",i)])}}var ng=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var Xu={orchestration_model:["fable"],impl_runtime:["claude"]},rg={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Qu(e){return typeof e=="object"&&e!==null?e:null}function Ju(e,t){return typeof e=="string"&&t.includes(e)?e:""}function sg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>ng.includes(t))}function ts(e,t=e){let n=Qu(e);if(!n)return null;let r=Ju(n.rec_orchestration_model,Xu.orchestration_model);if(r.length===0)return null;let s=Ju(n.rec_impl_runtime,Xu.impl_runtime),o={orchestration_model:r};s.length>0&&(o.impl_runtime=s);let i=Qu(t)||{},a=Object.keys(o),l=0,u=0;for(let m of a){let v=i[m];typeof v=="string"&&v.length>0&&(l+=1,v===o[m]&&(u+=1))}let d=l===0?"unapplied":u===a.length?"applied":"diverged";return{reasons:sg(n.rec_reason),rec:o,state:d}}function Jo(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=rg[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ei(e){return e.replace(/\/+$/,"")}function og(e,t){let n=ei(e),r=ei(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ti(e,t){let n=new Set;for(let r of e)for(let s of t){if(!og(r,s))continue;let o=ei(r),i=ei(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function ni(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function td(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Cr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ri(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function si(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,a=o.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function oi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function ig(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:ni(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function nd(e,t){let n=ig(e,t);return n?c`<button
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
            title=${n.deploy.at?on(n.deploy.at):""}
            >${oi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Cr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ns(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ag(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ps(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ii(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Fn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,v)=>(m.requested_at||0)-(v.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?ag(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:a,confirmation:d}}function Ms(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var lg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function rd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(u){return Number.isInteger(i[u])?Number(i[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:lg[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ai(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function cg(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function li(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,i=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!i?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${i?c`<span
          class=${`worker-dep worker-dep--armed${i.orphan?" worker-dep--armed-orphan":""}`}
          title=${i.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${i.orphan?c`${i.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${i.lane_id}
                >
                  해제
                </button>`:i.label}</span
        >`:""}
    ${t.map(a=>c`<span
          class=${`worker-dep worker-dep--pred${a.foreign?" worker-dep--foreign":""}`}
          title=${a.title||""}
          >${a.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${a.id}
                data-root-dir=${a.root_dir||""}
              >
                ${a.label}
              </button>`:a.label}</span
        >`)}${n.map(a=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${a.id}
          aria-label=${`scope \uACB9\uCE68 ${a.id} (${a.location_label})`}
          title=${[`\uACB9\uCE68 ${a.id} (${a.location_label})`,...a.prefixes].join(`
`)}
        >
          ⧉ ${a.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?cg(s):""}
  </div>`}function ci(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function ug(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function sd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ui(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${Jo(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function od(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function di(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function dg(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),s=wn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${od(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${on(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${ws(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${td(e.work_kind)}
            >작업 ${Cr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function jn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return dg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=an(e.usage),o=tr(e.usage),i=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,u=l?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",v=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,N=e.lane==="done"?"":ci(e.workflow),W=e.lane==="done"?"":sd(e.from_id),K=di(e.priority),le=c`<span class="worker-mini__title">${e.title}</span>`,Y=od(e.pr_url,e.pr_number),B=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",D=r.map(xe=>xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",Q=s.length>0?s.map(xe=>c`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):o?c`<span class="worker-usage" title=${ws(e.usage)}
            >${o}</span
          >`:"",V=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",ue=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Z=e.discard,ie=Z?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Z?.attempt_id||""}
          data-operation-id=${Z?.operation?.operation_id||""}
          data-discard-mode=${Z?.confirmation||"unmerged"}
          ?disabled=${Z?!Z.enabled:e.discard_enabled===!1}
          title=${Z?Z.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Z?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.stale_work||null,Ee=ne?c`${ne.can_resume||ne.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ne.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ne.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            다시 확인
          </button>`:""}`:"",Ue=ne?c`<div class="worker-mini__stale">
        <strong>${ne.title}</strong>
        <span>${ne.summary}</span>
        <span>${ne.cause}</span>
        ${ne.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",me=e.revise_action?c`<button
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
        </button>`:"",X=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=ui(e.rec),Le=b||N||W||X||Te||Q?c`<div class="worker-chips">
          ${b}${N}${W}${X?ai(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${Q}
        </div>`:"",T=li(e.dependency_chips),se=Ms(e),$e=t.actions?t.actions:"",we=!!(i||e.merge_action||e.cancel_action||e.discard_action||Z?.operation||e.revise_action||ne);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${K}${W}${Y}${le}${$e}
          </div>
          <div class="worker-mini__row2">
            ${Q}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${on(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${td(e.work_kind)}
                  >작업 ${Cr(e.work_ms)}</span
                >`:""}${D}${V}
            <span class="worker-mini__actions"
              >${ue}${U}${ie}</span
            >
            ${ns(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${m}${k}${K}${Y}${B}${D}${v}${j}${$e}
            </div>
            <div class="worker-mini__body">${le}${Ue}</div>
            ${T}${Le}${we?c`<div class="worker-mini__foot">
                  ${V}
                  <span class="worker-mini__actions"
                    >${ue}${U}${ie}${me}${Ee}</span
                  >
                  ${Ms(e)}
                </div>`:""}
            ${ns(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${k}${K}${le}${Y}${B}${D}${v}${j}${V}${ue}${U}${ie}${$e}
            </div>
            ${T}${Le}${se} ${ns(e)}`}
  </div>`}function pg(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var fg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Da(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,i=e.session_preferred===!0,a=fg[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=li(e.dependency_chips),v=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=ci(l),k=sd(e.from_id),N=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${di(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:i?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${ui(e.rec)}${ug(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Do(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${m}
    ${v||b||k||N?c`<div class="worker-chips">
          ${v}${b}${k}${ai(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${pg(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${ns(e)}
  </div>`}function Zn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${kn(e.id||void 0)}
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
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?Da(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):jn(s))}
          </div>`}
  </section>`}function ed(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function pi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${ed("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${kn(r.drop)}
            data-root-dir=${kn(r.root_dir)}
            data-lane-id=${kn(r.lane_id)}
            data-lane-length=${kn(r.lane_length)}
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
        ${ed("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>_g(s))}
          </div>`}
    </section>
  </div>`}function _g(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Zn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${kn(t.drop)}
        data-root-dir=${kn(t.root_dir)}
        data-lane-id=${kn(t.lane_id)}
        data-lane-length=${kn(t.lane_length)}
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
  </div>`}function fi(e){return e.count?c`<section
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
  </section>`:""}var id=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ds=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function _i(e,t){let n=id.find(s=>s.step===e);if(!n)return null;let r=id.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function ad(e){let t=Ds.findIndex(n=>n.step===e);return Ds.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Rr(e){let t=Ds.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function mg(e){let t=Ds.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ds.length}}function mi(e){let t=mg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var qa=new Set(["queued","running","retry_pending"]),ld=new Set(["failed","succeeded"]),gg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ns={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},bg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ns.base_containment,child_sweep:Ns.child_sweep,branch_cleanup:Ns.branch_cleanup,parent_close:Ns.parent_close};function hg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function yg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...qa,...ld].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function vg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function Na(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=gg[s];if(!o)return null;let i=_i(n,`${r} ${o}`);return i?{...i,active:qa.has(s),failed:s==="failed"}:null}function wg(e){return!e||typeof e!="object"?null:bg[e.step]||null}function qs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=wg(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=hg(e.merge_sha)?e.merge_sha:null,l=!o&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&yg(k,t,a)).sort(vg):[],u=i?l:[],d=u.find(k=>qa.has(k.state));if(d)return Na(d);if(s)return s.step==="repo_operations"&&l[0]?Na(l[0],!0):null;let m=u.find(k=>ld.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Na(m);if(r){let k=_i(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let v=typeof e.cleanup_cursor=="string"?Ns[e.cleanup_cursor]:null;if(!v)return null;let b=_i(v.step,v.label);return b?{...b,active:!0,failed:!1}:null}function gi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var kg="\uBBF8\uC801\uC7AC";function Fa(e,t){let n=Io(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function cd(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let u=Fa(o,{id:l,location_label:s.get(l)||kg}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),a.push(u)}a.length>0&&r.set(o,a)}return r}function ja(e,t){return`${e}\0${t}`}function ud(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ba(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Fs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function dd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Fs(s)})`,location_label:Fs(s),scope:null,same_lane_ahead:!1};let i=Ba(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function pd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ja(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=ja(a.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,v=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of v){let N=r.get(k);N&&N!==u&&!b.includes(N)&&b.push(N)}}let o=(a,l)=>{let u=new Set,d=[a];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...s.get(m)||[]))}return!1},i=new Map;for(let[a,l]of s){let u=[];for(let d of l){let m=n.get(d);o(d,a)&&m&&u.push(m)}u.length>0&&i.set(a,u)}return i}function fd(e,t){return ja(e,t)}var _d=1,js=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Wa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rs={show_blocked:!0,spec:"all"},md={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function $g(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Er(r)||(n=typeof r.status=="string"?r.status:null);return n}function xg(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Er(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Ag(e,t){let{winners:n,resumed_from_ids:r}=Pu(e,t),s=new Map;for(let[o,i]of n){let a=i.attempt,l=i.run_state,u=i.started_at,d=typeof a.session_id=="string"&&a.session_id.length>0;s.set(o,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:Rn(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(a.attempt_id)})}return s}function gd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Nt(e){return e&&typeof e=="object"?e:{}}function Sg(e,t,n){let r=Nt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let a=v=>$n({pin:v,global:i,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let d=bd(Tr(l,o),Tr(u,o)),m=bd(_r(l,null),_r(u,null));return d||m?{orchestration:d,worker:m}:null}function bd(e,t){return!e||t&&t.text===e.text?null:e}function hd(e,t){let n=Ba(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Eg(e,t,n){let r=t.get(e);if(!r)return hd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Fs(r)}function Tg(e,t,n,r){let s=t.get(e);if(!s)return{label:hd(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),a=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${a} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Fs(s),title:""}}function Cg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Rg(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Og(e,t,n,r,s,o,i){let a=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",v=Array.isArray(l.entries)?l.entries:[],b=[];v.forEach((K,le)=>{let Y=K&&typeof K.bead_id=="string"?K.bead_id:"";if(Y.length===0)return;let B=K&&typeof K.root_dir=="string"?K.root_dir:"",D=n.get(Y),j=D?D.state:void 0,Q=j==="running"||j==="pr_wait"||j==="done",V=!D||j==="runnable",ue=D&&D.lane==="parallel"&&typeof D.position=="number"?D.position-1:null,U=Tg(Y,n,r,t),Z=b.length>0?b[b.length-1].id:null,ie=m==="confirmed"&&Z!==null&&!(t.get(Y)||[]).includes(Z);b.push({id:Y,title:s.get(Y)||Y,root_dir:D?D.root_dir:B,workspace_name:D?D.workspace_name:o.get(B)||"",seq:le+1,location_label:U.label,location_title:U.title,draggable:!Q,fixed:Q,done:j==="done",unplaced:V,mismatch:ie,...ue!==null?{queue_index:ue}:{}})}),b.forEach((K,le)=>{K.seq=le+1});let k=b.length>0&&b.every(K=>K.done),N=b.filter(K=>!K.fixed&&i.armed_by_bead.get(K.id)!==d).map(K=>K.id),W=Rg(d,m,b,k,N,i);a.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(K=>K.mismatch||K.unplaced),unlaunched:N,...W})}),a}function Lg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Ig(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:v}=Lg(l,t,n);v!==void 0&&(l.scope_state=v),o.set(u,{cards:[l],scope:m})}let i=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let v of l.cards)v.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=i.get(d);m?m.push(l):i.set(d,[l])}let a=(l,u,d)=>{let m=u.cards[0],v={id:m.id,title:m.title,location_label:Eg(m.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(v):b.overlap_chips=[v]};for(let l of i.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=ti(l[u].scope,l[d].scope);m.length!==0&&(a(l[u],l[d],m),a(l[d],l[u],m))}}function Ua(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function bi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Bs(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...rs,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&js.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&u.set(R.root_dir,R);let d=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);for(let R of r)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);let m=[],v=[],b=[],k=[],N=[],W=[],K=new Map,le=new Map,Y=new Map,B=new Map,D=new Map,j=new Map,Q=new Map,V=new Set,ue=new Map,U=new Map,Z=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let oe=R.root_dir,Ce=R.name||oe,Ne=u.get(oe),We=Ne&&typeof Ne.revision=="number"?Ne.revision:typeof R.revision=="number"?R.revision:0,Je=Nt(R.attempts),tt=Nt(R.bead_titles);for(let[P,F]of Object.entries(tt))typeof F=="string"&&F.length>0&&Z.set(P,F);let bt=Nt(R.bead_times),te=Nt(R.pr_observations),G=Nt(R.admission),he=Nt(R.revise_parked),ct=Nt(R.merge_queue_state),nt=Nt(R.cleanup_failed),Me=Nt(R.discard_operations),Fe=Nt(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&ue.set(oe,Nt(R.bead_scope));let dt=Nt(R.bead_workflow),at=Nt(R.pr_activity),pt=Array.isArray(R.repo_operations)?R.repo_operations:[],Et=Array.isArray(R.merge_queue)?R.merge_queue:[],zt=new Set(Et.filter(P=>P&&typeof P.bead_id=="string").map(P=>P.bead_id)),Ht=new Map(Et.filter(P=>P&&typeof P.bead_id=="string").map(P=>[P.bead_id,P])),Lt=Array.isArray(R.queue)?R.queue:[];for(let P of[...Lt,...Array.isArray(R.pr_wait)?R.pr_wait:[]])P&&typeof P.bead_id=="string"&&typeof P.armed_by_lane=="string"&&P.armed_by_lane.length>0&&j.set(P.bead_id,P.armed_by_lane);for(let P of Array.isArray(R.disarmed_on_load)?R.disarmed_on_load:[])typeof P=="string"&&P.length>0&&V.add(P);let It=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(P=>P&&/^s[1-5]$/.test(P.id)&&Array.isArray(P.entries)),xt=Nt(R.lane_states),je=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,It.length);Y.set(oe,je),B.set(oe,Lt.length);let I=new Map(It.map(P=>[P.id,P])),J=new Map;for(let P of It)for(let F of P.entries)F&&typeof F.bead_id=="string"&&J.set(F.bead_id,P.id);for(let[P,F]of Object.entries(Fe))Array.isArray(F)&&D.set(P,F.filter(ve=>typeof ve=="string"&&ve.length>0));let ge=Array.isArray(R.done)?R.done:[];for(let P of ge)P&&typeof P.bead_id=="string"&&W.push({id:P.bead_id,root_dir:oe,workspace_name:Ce});let C=new Map;for(let P of ge)P&&typeof P.bead_id=="string"&&typeof P.added_at=="number"&&C.set(P.bead_id,P.added_at);let H=P=>({id:P,title:tt[P]||P,root_dir:oe,workspace_name:Ce,expected_revision:We,draggable:!1,...Nt(bt[P]).created_at?{created_at:Nt(bt[P]).created_at}:{},...Nt(bt[P]).updated_at?{updated_at:Nt(bt[P]).updated_at}:{}}),Ie=P=>{let F=dt[P]?.chips?.pr;return F&&typeof F.number=="number"&&typeof F.url=="string"?{pr_number:F.number,pr_url:F.url}:{}},Be=P=>Object.hasOwn(Fe,P)?{blocked_by:Array.isArray(Fe[P])?Fe[P].filter(F=>typeof F=="string"&&F.length>0):[]}:{},Ae=new Set;for(let[P,F]of Ag(Je,C)){Ae.add(P);let ve=F.run_state==="failed"?Cg(Je,F.attempt_id):null;ve!==null&&Q.set(P,ve),v.push({...H(P),lane:"running",...Be(P),...J.has(P)?{serial_lane_id:J.get(P)}:{},attempt_id:F.attempt_id,run_state:F.run_state,status:F.status||void 0,workflow:dt[P]||null,can_pause:F.can_pause,can_resume:F.can_resume,started_at:F.started_at,last_event_at:F.last_event_at,last_activity:F.last_activity,legs:F.legs,runner:F.runner,model:F.model,effort:F.effort,speed:F.speed,resumed_from:F.resumed_from,continuation_mode:F.continuation_mode,usage:F.usage,exec_chips:{orchestration:Is(F),worker:null},discard:Fn(Me,P,{attempt_id:F.attempt_id}),badges:F.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:F.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:F.run_state==="failed"})}for(let[P,F]of Mu(Je)){if(v.some(ke=>ke.id===P))continue;let ve=F.attempt,Ge=F.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";v.push({...H(P),lane:"running",kind:"session",...Be(P),attempt_id:typeof ve.attempt_id=="string"?ve.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[P]||null,can_pause:!1,can_resume:!1,started_at:F.started_at,last_event_at:typeof ve.last_event_at=="number"?ve.last_event_at:null,last_activity:ve.last_activity&&typeof ve.last_activity=="object"?ve.last_activity:null,legs:Array.isArray(ve.legs)?ve.legs:[],runner:typeof ve.runner=="string"?ve.runner:null,model:typeof ve.model=="string"?ve.model:null,effort:typeof ve.effort=="string"?ve.effort:null,speed:typeof ve.speed=="string"?ve.speed:null,resumed_from:null,continuation_mode:null,usage:ve.usage&&typeof ve.usage=="object"?ve.usage:null,exec_chips:{orchestration:Is(ve),worker:null},discard:Fn(Me,P,{merge_queued:!0}),badges:[F.origin==="auto"?`${Ge} \xB7 \uC790\uB3D9`:Ge],alert:!1})}for(let P of Array.isArray(R.session_active)?R.session_active:[]){let F=P&&P.bead_id;typeof F!="string"||Ae.has(F)||(Ae.add(F),Array.isArray(P.blocked_by)&&P.blocked_by.length>0&&D.set(F,P.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof P.title=="string"&&P.title.length>0&&Z.set(F,P.title),v.push({...H(F),title:P.title||tt[F]||F,lane:"running",kind:"session",status:"in_progress",started_at:Ua(P.started_at)??Ua(P.updated_at)??void 0,updated_at:Ua(P.updated_at)??void 0,workflow:P.workflow||null,labels:Array.isArray(P.labels)?P.labels:[],spec_id:typeof P.spec_id=="string"?P.spec_id:"",blocked:P.blocked===!0,...Array.isArray(P.blocked_by)?{blocked_by:P.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(P.session_refs)?P.session_refs:[],badges:[],alert:!1}))}for(let P of Array.isArray(R.pr_wait)?R.pr_wait:[]){let F=P&&P.bead_id;if(typeof F!="string"||Ae.has(F))continue;Ae.add(F);let ve=Nt(te[F]),Ge=Nt(ve.pr),ke=ve.gate?Nt(ve.gate):null,Ze=zt.has(F),ot=Ht.get(F)?.continuation_action||null,mt=!!ot&&ot.continuation===null,$t=ct.active===F,Kt=P.external===!0,Tt=nt[F]||null,Qt=Nt(at[F]),Pe=qs({bead_id:F,merge_sha:P.merge_sha,cleanup_cursor:P.cleanup_cursor,merge_progress:Qt.merge_progress||null,cleanup_failed:Tt,repo_operations:pt}),mn=gi(Pe),Jt=!!ke&&ke.base_badge==="\uCDA9\uB3CC",Ft=!!Tt&&["child_sweep","branch_cleanup","parent_close"].includes(Tt.step)&&!!ke&&ke.tier==="merged",Xt=Kt&&!!Tt&&!!ke&&ke.tier==="merged",gn=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier)&&ke.reason!=="review_receipt_undetermined",fe=Fn(Me,F,{external:Kt,merge_active:$t||Pe?.step==="merge",merge_queued:Ze,cleanup_active:mn,merged:!!Tt||ke?.tier==="merged"}),S=!!fe.operation;b.push({...H(F),lane:"pr_wait",...Be(F),workflow:dt[F]||null,pr_number:typeof Ge.number=="number"?Ge.number:null,pr_url:typeof Ge.url=="string"?Ge.url:void 0,external:Kt,usage:Rn(Je,F),merge_step:Pe,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Pe?[ke?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Tt?[Rr(Tt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(Tt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:Pe?Pe.failed===!0:!!Tt||gn,reason:Tt&&Pe?.active!==!0?mi(Tt.step):"PR \uB300\uAE30",merge_action:ke?.tier==="merged"&&!Ft&&!Xt?!1:!Ze||mt,merge_enabled:!S&&(mt||ke?.enabled===!0||Jt||Ft||Xt),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Xt||Ft?"\uC815\uB9AC \uC7AC\uAC1C":Jt&&!Ft?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":S?fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Xt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Jt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ze&&!mt,cancel_enabled:!$t,continuation_mismatch:ot?.mismatch||null,discard:fe,discard_action:fe.action,discard_enabled:fe.enabled,discard_title:fe.title})}let lt=(P,F,ve,Ge)=>{let ke=P&&P.bead_id;if(typeof ke!="string"||Ae.has(ke))return null;Ae.add(ke);let Ze=he[ke],ot=Fn(Me,ke),mt=ot.operation?ot:null,$t={...H(ke),lane:F,workflow:dt[ke]||null,draggable:!mt,discard:mt||void 0,reason:gd(G,ke),seq:ve+1,queue_position:ve+1,queue_index:ve,queue_length:Ge,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!mt,revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Kt=Be(ke);return Object.hasOwn(Kt,"blocked_by")&&($t.blocked_by=Kt.blocked_by),$t};for(let P=0;P<Lt.length;P++){let F=lt(Lt[P],"queue",P,Lt.length);if(!F)continue;k.push(F);let ve=K.get(oe);ve?ve.push(F):K.set(oe,[F])}let st=P=>{let F=b.find(Ze=>Ze.id===P&&Ze.root_dir===oe);if(F)return{id:P,title:F.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ve=v.find(Ze=>Ze.id===P&&Ze.root_dir===oe),Ge=ve?ve.run_state:$g(Je,P),ke=Ge==="failed"||Ge==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ge==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:P,title:ve?ve.title:H(P).title,badge:ke}},ye=[];for(let P=0;P<Math.max(je,It.length);P++){let F=`s${P+1}`,ve=I.get(F),Ge=ve&&Array.isArray(ve.entries)?ve.entries:[],ke=Nt(xt[F]),Ze=Array.isArray(ke.occupied_by)?ke.occupied_by.filter($t=>typeof $t=="string"):[],ot=new Set(Ze),mt=[];for(let $t=0;$t<Ge.length;$t++){let Kt=Ge[$t]&&Ge[$t].bead_id;if(typeof Kt=="string"&&ot.has(Kt)){Ae.add(Kt);continue}let Tt=lt(Ge[$t],F,$t,Ge.length);Tt&&(mt.push(Tt),k.push(Tt))}mt.length===0&&Ze.length===0&&(je<=1||P>=je)||ye.push({id:F,index:P,items:mt,raw_length:Ge.length,occupied_by:Ze,occupants:Ze.map($t=>st($t)),corrections:Array.isArray(ke.corrections)?ke.corrections.length:0,cycle:ke.cycle===!0,...mt.length===0&&Ze.length===0?{empty:!0}:{}})}le.set(oe,ye);let Xe=Array.from({length:je},(P,F)=>{let ve=`s${F+1}`,Ge=I.get(ve),ke=Ge&&Array.isArray(Ge.entries)?Ge.entries:[],Ze=Nt(xt[ve]);return{id:ve,index:ke.length,length:ke.length,occupied_by:Array.isArray(Ze.occupied_by)?Ze.occupied_by.filter(ot=>typeof ot=="string"):[]}});for(let P of Array.isArray(R.runnable)?R.runnable:[]){let F=P&&P.bead_id;if(typeof F!="string"||Ae.has(F))continue;Ae.add(F);let ve=P.workflow&&typeof P.workflow=="object"?P.workflow:null,Ge=ve&&typeof ve.route=="string"&&ve.route||(typeof P.route=="string"?P.route:null),ke=Sg(Nt(Ne),P.exec_pins,Ge),Ze=ts(P.rec,P.exec_pins);Array.isArray(P.blocked_by)&&P.blocked_by.length>0&&D.set(F,P.blocked_by.filter(ot=>typeof ot=="string"&&ot.length>0)),typeof P.title=="string"&&P.title.length>0&&Z.set(F,P.title),Array.isArray(P.scope)&&U.set(F,P.scope.filter(ot=>typeof ot=="string"&&ot.length>0)),m.push({...H(F),title:P.title||tt[F]||F,lane:"runnable",draggable:!0,reason:gd(G,F),created_at:P.created_at??void 0,updated_at:P.updated_at??void 0,status:typeof P.status=="string"?P.status:void 0,labels:Array.isArray(P.labels)?P.labels:[],spec_id:typeof P.spec_id=="string"?P.spec_id:"",published:P.published===!0,workflow:ve||(Ge?{route:Ge,chips:{route:Ge}}:null),...ke?{exec_chips:ke}:{},...Ze?{rec:Ze}:{},blocked:P.blocked===!0,...Array.isArray(P.blocked_by)?{blocked_by:P.blocked_by.filter(ot=>typeof ot=="string"&&ot.length>0)}:{},place_index:Lt.length,place_lanes:Xe})}for(let P of ge){let F=P&&P.bead_id;if(typeof F!="string"||Ae.has(F)||(Ae.add(F),o!==void 0&&typeof P.added_at=="number"&&P.added_at<o))continue;let ve=xg(Je,F),Ge=ve&&typeof ve.done_kind=="string"?ve.done_kind:null;N.push({...H(F),lane:"done",done:!0,done_layout:"three_line",usage:Rn(Je,F),work_ms:si(Je,F),done_at:typeof P.added_at=="number"?P.added_at:void 0,done_kind:Ge,...Ie(F),badges:[...Ge&&md[Ge]?[md[Ge]]:[],...ri(Je,F)]})}}let ie=new Map;s.forEach((R,oe)=>{R&&typeof R.root_dir=="string"&&ie.set(R.root_dir,oe)});let ne=n&&n.running_sort==="repo"?"repo":"started";v.sort((R,oe)=>{let Ce=R.kind==="session",Ne=oe.kind==="session";if(Ce!==Ne)return Ce?1:-1;if(Ce&&Ne){let tt=bi(oe.updated_at)-bi(R.updated_at);return tt!==0?tt:R.id.localeCompare(oe.id)}if(ne==="repo"){let tt=ie.get(R.root_dir)??Number.MAX_SAFE_INTEGER,bt=ie.get(oe.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==bt)return tt-bt}let We=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,Je=typeof oe.started_at=="number"&&Number.isFinite(oe.started_at)?oe.started_at:null;return We!==null&&Je!==null&&We!==Je?We-Je:We===null&&Je!==null?1:We!==null&&Je===null?-1:R.id.localeCompare(oe.id)}),N.sort((R,oe)=>(oe.done_at??0)-(R.done_at??0));let Ee=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),Ue=new Set(m.map(R=>R.root_dir)),me=[];for(let R of Ee){if(!R||typeof R.root_dir!="string")continue;let oe=K.get(R.root_dir)||[],Ce=le.get(R.root_dir)||[];!(oe.length>0||Ce.some(We=>We.items.length>0||We.occupied_by.length>0))&&!Ue.has(R.root_dir)||me.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=_d?R.slots:_d,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Nt(R.runner_catalog),items:oe,sublanes:{parallel:oe,serial:Ce},serial_lane_count:Y.get(R.root_dir)||0,raw_queue_length:B.get(R.root_dir)||0})}let X={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:me,running:v,pr_wait:b,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Te=ud(X);for(let R of W)Te.has(R.id)||Te.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});for(let R of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){if(!Object.hasOwn(R,"blocked_by"))continue;let oe=Te.get(R.id);R.blockers=(R.blocked_by||[]).map(Ce=>dd(Ce,oe,Te,s))}for(let R of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){let oe=(R.blockers||[]).map(Ne=>{let We=Te.get(Ne.id)?.root_dir;return{...Fa(R.id,Ne),openable:!0,...typeof We=="string"&&We.length>0?{root_dir:We}:{}}});if(oe.length===0)continue;let Ce={predecessors:oe};R.dependency_chips=Ce}Ig(X,ue,U,Te,s);let Le=pd(X.queue_groups);for(let R of X.queue_groups)for(let oe of R.sublanes.serial){let Ce=Le.get(fd(R.root_dir,oe.id));Ce&&(oe.cross_wait_peers=Ce)}X.chain_lanes=Og(a&&Array.isArray(a.lanes)?a.lanes:[],D,Te,s,Z,d,{armed_by_bead:j,failed_by_bead:Q,disarmed_lanes:V});let T=new Map;for(let R of[...X.queue,...X.runnable])T.has(R.id)||T.set(R.id,R);let se=new Set;for(let R of X.chain_lanes)for(let oe of R.rows){if(R.status==="confirmed"&&!oe.unplaced&&!oe.fixed&&se.add(oe.id),!R.draft&&!oe.unplaced)continue;let Ce=T.get(oe.id);Ce&&(Ce.cross_lane_chip={lane_id:R.lane_id,number:R.number,status:R.status,label:R.draft?`\uC5F0\uACB0 ${R.number} (draft)`:`\uC5F0\uACB0 ${R.number}`})}let $e=new Map(X.chain_lanes.map(R=>[R.lane_id,R.number]));for(let R of[...X.queue,...X.running]){let oe=j.get(R.id);if(typeof oe!="string"||oe.length===0)continue;let Ce=$e.get(oe);R.armed_lane_chip=Ce===void 0?{lane_id:oe,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:oe,label:`\u25B6 \uC5F0\uACB0 ${Ce}`,orphan:!1}}let we=[];for(let R of K.values())for(let oe of R)se.has(oe.id)||we.push(oe);we.sort((R,oe)=>{let Ce=R.workspace_name.localeCompare(oe.workspace_name);return Ce!==0?Ce:(R.queue_index??0)-(oe.queue_index??0)}),X.parallel_rows=we;let xe={};for(let[R,oe]of Te)typeof oe.root_dir=="string"&&oe.root_dir.length>0&&(xe[R]=oe.root_dir);for(let R of X.chain_lanes)for(let oe of R.rows)!Object.hasOwn(xe,oe.id)&&oe.root_dir.length>0&&d.has(oe.root_dir)&&(xe[oe.id]=oe.root_dir);X.owner_of=xe;let be=X.runnable.length;X.runnable_all=X.runnable.slice();let Se=X.runnable;i.show_blocked||(Se=Se.filter(R=>R.blocked!==!0));let it=Se.length;i.spec==="with"?Se=Se.filter(R=>R.published===!0):i.spec==="without"&&(Se=Se.filter(R=>R.published!==!0)),X.runnable_hidden={blocked:be-it,spec:it-Se.length};let ht=(R,oe)=>{let Ce=bi(oe.updated_at)-bi(R.updated_at);return Ce!==0?Ce:R.id.localeCompare(oe.id)},wt=l==="repo_spec"?(R,oe)=>{let Ce=R.published===!0?0:1,Ne=oe.published===!0?0:1;return Ce!==Ne?Ce-Ne:ht(R,oe)}:ht;if(l==="updated_flat")X.runnable=Se.slice().sort(ht),X.runnable_sections=[];else{let R=new Map;for(let Ne of Se){let We=R.get(Ne.root_dir);We?We.push(Ne):R.set(Ne.root_dir,[Ne])}let oe=[],Ce=[];for(let Ne of Ee){if(!Ne||typeof Ne.root_dir!="string")continue;let We=(R.get(Ne.root_dir)||[]).slice().sort(wt);R.delete(Ne.root_dir),We.length!==0&&(oe.push({root_dir:Ne.root_dir,name:Ne.name||Ne.root_dir,items:We.map(Je=>({...Je,workspace_name:""}))}),Ce.push(...We))}for(let[Ne,We]of R){let Je=We.slice().sort(wt);oe.push({root_dir:Ne,name:Je[0]?.workspace_name||Ne,items:Je.map(tt=>({...tt,workspace_name:""}))}),Ce.push(...Je)}X.runnable=Ce,X.runnable_sections=oe}return X}var Mg="\uC0AC\uC774\uD074";function Pg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[o,i]of Object.entries(s))Array.isArray(i)&&t.set(o,n(i));for(let o of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])o&&typeof o.bead_id=="string"&&Array.isArray(o.blocked_by)&&o.blocked_by.length>0&&t.set(o.bead_id,n(o.blocked_by))}return t}function za(e,t,n){let r=Bs(e,t),s=[],o=new Set,i=(l,u)=>{for(let d of l)o.has(d.id)||(o.add(d.id),s.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let a=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:a===null?s:s.filter(l=>l.root_dir===a),blocked_by_map:Pg(e)}}function yd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let a=$a(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:a,...a?{reason:Mg}:{}})}return o.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),o}function vd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Cd,setPrototypeOf:wd,isFrozen:Dg,getPrototypeOf:Ng,getOwnPropertyDescriptor:qg}=Object,{freeze:pn,seal:On,create:Xa}=Object,{apply:Qa,construct:Ja}=typeof Reflect<"u"&&Reflect;pn||(pn=function(t){return t});On||(On=function(t){return t});Qa||(Qa=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ja||(Ja=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var hi=fn(Array.prototype.forEach),Fg=fn(Array.prototype.lastIndexOf),kd=fn(Array.prototype.pop),Us=fn(Array.prototype.push),jg=fn(Array.prototype.splice),vi=fn(String.prototype.toLowerCase),Ha=fn(String.prototype.toString),Ga=fn(String.prototype.match),Ws=fn(String.prototype.replace),Bg=fn(String.prototype.indexOf),Ug=fn(String.prototype.trim),Bn=fn(Object.prototype.hasOwnProperty),dn=fn(RegExp.prototype.test),zs=Wg(TypeError);function fn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Qa(e,t,r)}}function Wg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ja(e,n)}}function gt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:vi;wd&&wd(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Dg(t)||(t[r]=o),s=o)}e[s]=!0}return e}function zg(e){for(let t=0;t<e.length;t++)Bn(e,t)||(e[t]=null);return e}function rr(e){let t=Xa(null);for(let[n,r]of Cd(e))Bn(e,n)&&(Array.isArray(r)?t[n]=zg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=rr(r):t[n]=r);return t}function Hs(e,t){for(;e!==null;){let r=qg(e,t);if(r){if(r.get)return fn(r.get);if(typeof r.value=="function")return fn(r.value)}e=Ng(e)}function n(){return null}return n}var $d=pn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ka=pn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Va=pn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hg=pn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ya=pn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gg=pn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),xd=pn(["#text"]),Ad=pn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Za=pn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Sd=pn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),yi=pn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Kg=On(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vg=On(/<%[\w\W]*|[\w\W]*%>/gm),Yg=On(/\$\{[\w\W]*/gm),Zg=On(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xg=On(/^aria-[\-\w]+$/),Rd=On(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qg=On(/^(?:\w+script|data):/i),Jg=On(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Od=On(/^html$/i),eb=On(/^[a-z][.\w]*(-[.\w]+)+$/i),Ed=Object.freeze({__proto__:null,ARIA_ATTR:Xg,ATTR_WHITESPACE:Jg,CUSTOM_ELEMENT:eb,DATA_ATTR:Zg,DOCTYPE_NAME:Od,ERB_EXPR:Vg,IS_ALLOWED_URI:Rd,IS_SCRIPT_OR_DATA:Qg,MUSTACHE_EXPR:Kg,TMPLIT_EXPR:Yg}),Gs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tb=function(){return typeof window>"u"?null:window},nb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Td=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ld(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tb(),t=fe=>Ld(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Gs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:v,trustedTypes:b}=e,k=l.prototype,N=Hs(k,"cloneNode"),W=Hs(k,"remove"),K=Hs(k,"nextSibling"),le=Hs(k,"childNodes"),Y=Hs(k,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let B,D="",{implementation:j,createNodeIterator:Q,createDocumentFragment:V,getElementsByTagName:ue}=n,{importNode:U}=r,Z=Td();t.isSupported=typeof Cd=="function"&&typeof Y=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:ne,TMPLIT_EXPR:Ee,DATA_ATTR:Ue,ARIA_ATTR:me,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:Le}=Ed,{IS_ALLOWED_URI:T}=Ed,se=null,$e=gt({},[...$d,...Ka,...Va,...Ya,...xd]),we=null,xe=gt({},[...Ad,...Za,...Sd,...yi]),be=Object.seal(Xa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,it=null,ht=Object.seal(Xa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),_t=!0,wt=!0,R=!1,oe=!0,Ce=!1,Ne=!0,We=!1,Je=!1,tt=!1,bt=!1,te=!1,G=!1,he=!0,ct=!1,nt="user-content-",Me=!0,Fe=!1,dt={},at=null,pt=gt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Et=null,zt=gt({},["audio","video","img","source","image","track"]),Ht=null,Lt=gt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),It="http://www.w3.org/1998/Math/MathML",xt="http://www.w3.org/2000/svg",je="http://www.w3.org/1999/xhtml",I=je,J=!1,ge=null,C=gt({},[It,xt,je],Ha),H=gt({},["mi","mo","mn","ms","mtext"]),Ie=gt({},["annotation-xml"]),Be=gt({},["title","style","font","a","script"]),Ae=null,lt=["application/xhtml+xml","text/html"],st="text/html",ye=null,Xe=null,P=n.createElement("form"),F=function(S){return S instanceof RegExp||S instanceof Function},ve=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Xe&&Xe===S)){if((!S||typeof S!="object")&&(S={}),S=rr(S),Ae=lt.indexOf(S.PARSER_MEDIA_TYPE)===-1?st:S.PARSER_MEDIA_TYPE,ye=Ae==="application/xhtml+xml"?Ha:vi,se=Bn(S,"ALLOWED_TAGS")?gt({},S.ALLOWED_TAGS,ye):$e,we=Bn(S,"ALLOWED_ATTR")?gt({},S.ALLOWED_ATTR,ye):xe,ge=Bn(S,"ALLOWED_NAMESPACES")?gt({},S.ALLOWED_NAMESPACES,Ha):C,Ht=Bn(S,"ADD_URI_SAFE_ATTR")?gt(rr(Lt),S.ADD_URI_SAFE_ATTR,ye):Lt,Et=Bn(S,"ADD_DATA_URI_TAGS")?gt(rr(zt),S.ADD_DATA_URI_TAGS,ye):zt,at=Bn(S,"FORBID_CONTENTS")?gt({},S.FORBID_CONTENTS,ye):pt,Se=Bn(S,"FORBID_TAGS")?gt({},S.FORBID_TAGS,ye):rr({}),it=Bn(S,"FORBID_ATTR")?gt({},S.FORBID_ATTR,ye):rr({}),dt=Bn(S,"USE_PROFILES")?S.USE_PROFILES:!1,_t=S.ALLOW_ARIA_ATTR!==!1,wt=S.ALLOW_DATA_ATTR!==!1,R=S.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=S.SAFE_FOR_TEMPLATES||!1,Ne=S.SAFE_FOR_XML!==!1,We=S.WHOLE_DOCUMENT||!1,bt=S.RETURN_DOM||!1,te=S.RETURN_DOM_FRAGMENT||!1,G=S.RETURN_TRUSTED_TYPE||!1,tt=S.FORCE_BODY||!1,he=S.SANITIZE_DOM!==!1,ct=S.SANITIZE_NAMED_PROPS||!1,Me=S.KEEP_CONTENT!==!1,Fe=S.IN_PLACE||!1,T=S.ALLOWED_URI_REGEXP||Rd,I=S.NAMESPACE||je,H=S.MATHML_TEXT_INTEGRATION_POINTS||H,Ie=S.HTML_INTEGRATION_POINTS||Ie,be=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&F(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&F(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(wt=!1),te&&(bt=!0),dt&&(se=gt({},xd),we=[],dt.html===!0&&(gt(se,$d),gt(we,Ad)),dt.svg===!0&&(gt(se,Ka),gt(we,Za),gt(we,yi)),dt.svgFilters===!0&&(gt(se,Va),gt(we,Za),gt(we,yi)),dt.mathMl===!0&&(gt(se,Ya),gt(we,Sd),gt(we,yi))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?ht.tagCheck=S.ADD_TAGS:(se===$e&&(se=rr(se)),gt(se,S.ADD_TAGS,ye))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?ht.attributeCheck=S.ADD_ATTR:(we===xe&&(we=rr(we)),gt(we,S.ADD_ATTR,ye))),S.ADD_URI_SAFE_ATTR&&gt(Ht,S.ADD_URI_SAFE_ATTR,ye),S.FORBID_CONTENTS&&(at===pt&&(at=rr(at)),gt(at,S.FORBID_CONTENTS,ye)),Me&&(se["#text"]=!0),We&&gt(se,["html","head","body"]),se.table&&(gt(se,["tbody"]),delete Se.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw zs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw zs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=S.TRUSTED_TYPES_POLICY,D=B.createHTML("")}else B===void 0&&(B=nb(b,s)),B!==null&&typeof D=="string"&&(D=B.createHTML(""));pn&&pn(S),Xe=S}},Ge=gt({},[...Ka,...Va,...Hg]),ke=gt({},[...Ya,...Gg]),Ze=function(S){let de=Y(S);(!de||!de.tagName)&&(de={namespaceURI:I,tagName:"template"});let Oe=vi(S.tagName),yt=vi(de.tagName);return ge[S.namespaceURI]?S.namespaceURI===xt?de.namespaceURI===je?Oe==="svg":de.namespaceURI===It?Oe==="svg"&&(yt==="annotation-xml"||H[yt]):!!Ge[Oe]:S.namespaceURI===It?de.namespaceURI===je?Oe==="math":de.namespaceURI===xt?Oe==="math"&&Ie[yt]:!!ke[Oe]:S.namespaceURI===je?de.namespaceURI===xt&&!Ie[yt]||de.namespaceURI===It&&!H[yt]?!1:!ke[Oe]&&(Be[Oe]||!Ge[Oe]):!!(Ae==="application/xhtml+xml"&&ge[S.namespaceURI]):!1},ot=function(S){Us(t.removed,{element:S});try{Y(S).removeChild(S)}catch{W(S)}},mt=function(S,de){try{Us(t.removed,{attribute:de.getAttributeNode(S),from:de})}catch{Us(t.removed,{attribute:null,from:de})}if(de.removeAttribute(S),S==="is")if(bt||te)try{ot(de)}catch{}else try{de.setAttribute(S,"")}catch{}},$t=function(S){let de=null,Oe=null;if(tt)S="<remove></remove>"+S;else{let At=Ga(S,/^[\r\n\t ]+/);Oe=At&&At[0]}Ae==="application/xhtml+xml"&&I===je&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let yt=B?B.createHTML(S):S;if(I===je)try{de=new v().parseFromString(yt,Ae)}catch{}if(!de||!de.documentElement){de=j.createDocument(I,"template",null);try{de.documentElement.innerHTML=J?D:yt}catch{}}let Rt=de.body||de.documentElement;return S&&Oe&&Rt.insertBefore(n.createTextNode(Oe),Rt.childNodes[0]||null),I===je?ue.call(de,We?"html":"body")[0]:We?de.documentElement:Rt},Kt=function(S){return Q.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Tt=function(S){return S instanceof m&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Qt=function(S){return typeof a=="function"&&S instanceof a};function Pe(fe,S,de){hi(fe,Oe=>{Oe.call(t,S,de,Xe)})}let mn=function(S){let de=null;if(Pe(Z.beforeSanitizeElements,S,null),Tt(S))return ot(S),!0;let Oe=ye(S.nodeName);if(Pe(Z.uponSanitizeElement,S,{tagName:Oe,allowedTags:se}),Ne&&S.hasChildNodes()&&!Qt(S.firstElementChild)&&dn(/<[/\w!]/g,S.innerHTML)&&dn(/<[/\w!]/g,S.textContent)||S.nodeType===Gs.progressingInstruction||Ne&&S.nodeType===Gs.comment&&dn(/<[/\w]/g,S.data))return ot(S),!0;if(!(ht.tagCheck instanceof Function&&ht.tagCheck(Oe))&&(!se[Oe]||Se[Oe])){if(!Se[Oe]&&Ft(Oe)&&(be.tagNameCheck instanceof RegExp&&dn(be.tagNameCheck,Oe)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Oe)))return!1;if(Me&&!at[Oe]){let yt=Y(S)||S.parentNode,Rt=le(S)||S.childNodes;if(Rt&&yt){let At=Rt.length;for(let jt=At-1;jt>=0;--jt){let nn=N(Rt[jt],!0);nn.__removalCount=(S.__removalCount||0)+1,yt.insertBefore(nn,K(S))}}}return ot(S),!0}return S instanceof l&&!Ze(S)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&dn(/<\/no(script|embed|frames)/i,S.innerHTML)?(ot(S),!0):(Ce&&S.nodeType===Gs.text&&(de=S.textContent,hi([ie,ne,Ee],yt=>{de=Ws(de,yt," ")}),S.textContent!==de&&(Us(t.removed,{element:S.cloneNode()}),S.textContent=de)),Pe(Z.afterSanitizeElements,S,null),!1)},Jt=function(S,de,Oe){if(he&&(de==="id"||de==="name")&&(Oe in n||Oe in P))return!1;if(!(wt&&!it[de]&&dn(Ue,de))){if(!(_t&&dn(me,de))){if(!(ht.attributeCheck instanceof Function&&ht.attributeCheck(de,S))){if(!we[de]||it[de]){if(!(Ft(S)&&(be.tagNameCheck instanceof RegExp&&dn(be.tagNameCheck,S)||be.tagNameCheck instanceof Function&&be.tagNameCheck(S))&&(be.attributeNameCheck instanceof RegExp&&dn(be.attributeNameCheck,de)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(de,S))||de==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&dn(be.tagNameCheck,Oe)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Oe))))return!1}else if(!Ht[de]){if(!dn(T,Ws(Oe,Te,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&S!=="script"&&Bg(Oe,"data:")===0&&Et[S])){if(!(R&&!dn(X,Ws(Oe,Te,"")))){if(Oe)return!1}}}}}}}return!0},Ft=function(S){return S!=="annotation-xml"&&Ga(S,Le)},Xt=function(S){Pe(Z.beforeSanitizeAttributes,S,null);let{attributes:de}=S;if(!de||Tt(S))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},yt=de.length;for(;yt--;){let Rt=de[yt],{name:At,namespaceURI:jt,value:nn}=Rt,rn=ye(At),En=nn,Mt=At==="value"?En:Ug(En);if(Oe.attrName=rn,Oe.attrValue=Mt,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,Pe(Z.uponSanitizeAttribute,S,Oe),Mt=Oe.attrValue,ct&&(rn==="id"||rn==="name")&&(mt(At,S),Mt=nt+Mt),Ne&&dn(/((--!?|])>)|<\/(style|title|textarea)/i,Mt)){mt(At,S);continue}if(rn==="attributename"&&Ga(Mt,"href")){mt(At,S);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){mt(At,S);continue}if(!oe&&dn(/\/>/i,Mt)){mt(At,S);continue}Ce&&hi([ie,ne,Ee],cn=>{Mt=Ws(Mt,cn," ")});let sn=ye(S.nodeName);if(!Jt(sn,rn,Mt)){mt(At,S);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!jt)switch(b.getAttributeType(sn,rn)){case"TrustedHTML":{Mt=B.createHTML(Mt);break}case"TrustedScriptURL":{Mt=B.createScriptURL(Mt);break}}if(Mt!==En)try{jt?S.setAttributeNS(jt,At,Mt):S.setAttribute(At,Mt),Tt(S)?ot(S):kd(t.removed)}catch{mt(At,S)}}Pe(Z.afterSanitizeAttributes,S,null)},gn=function fe(S){let de=null,Oe=Kt(S);for(Pe(Z.beforeSanitizeShadowDOM,S,null);de=Oe.nextNode();)Pe(Z.uponSanitizeShadowNode,de,null),mn(de),Xt(de),de.content instanceof o&&fe(de.content);Pe(Z.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(fe){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Oe=null,yt=null,Rt=null;if(J=!fe,J&&(fe="<!-->"),typeof fe!="string"&&!Qt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw zs("dirty is not a string, aborting")}else throw zs("toString is not a function");if(!t.isSupported)return fe;if(Je||ve(S),t.removed=[],typeof fe=="string"&&(Fe=!1),Fe){if(fe.nodeName){let nn=ye(fe.nodeName);if(!se[nn]||Se[nn])throw zs("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof a)de=$t("<!---->"),Oe=de.ownerDocument.importNode(fe,!0),Oe.nodeType===Gs.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?de=Oe:de.appendChild(Oe);else{if(!bt&&!Ce&&!We&&fe.indexOf("<")===-1)return B&&G?B.createHTML(fe):fe;if(de=$t(fe),!de)return bt?null:G?D:""}de&&tt&&ot(de.firstChild);let At=Kt(Fe?fe:de);for(;yt=At.nextNode();)mn(yt),Xt(yt),yt.content instanceof o&&gn(yt.content);if(Fe)return fe;if(bt){if(te)for(Rt=V.call(de.ownerDocument);de.firstChild;)Rt.appendChild(de.firstChild);else Rt=de;return(we.shadowroot||we.shadowrootmode)&&(Rt=U.call(r,Rt,!0)),Rt}let jt=We?de.outerHTML:de.innerHTML;return We&&se["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&dn(Od,de.ownerDocument.doctype.name)&&(jt="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+jt),Ce&&hi([ie,ne,Ee],nn=>{jt=Ws(jt,nn," ")}),B&&G?B.createHTML(jt):jt},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ve(fe),Je=!0},t.clearConfig=function(){Xe=null,Je=!1},t.isValidAttribute=function(fe,S,de){Xe||ve({});let Oe=ye(fe),yt=ye(S);return Jt(Oe,yt,de)},t.addHook=function(fe,S){typeof S=="function"&&Us(Z[fe],S)},t.removeHook=function(fe,S){if(S!==void 0){let de=Fg(Z[fe],S);return de===-1?void 0:jg(Z[fe],de,1)[0]}return kd(Z[fe])},t.removeHooks=function(fe){Z[fe]=[]},t.removeAllHooks=function(){Z=Td()},t}var Id=Ld();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wi=e=>(...t)=>({_$litDirective$:e,values:t}),ss=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ks=class extends ss{constructor(t){if(super(t),this.it=Ut,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ut||t==null)return this._t=void 0,this.it=t;if(t===Cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ks.directiveName="unsafeHTML",Ks.resultType=1;var Md=wi(Ks);function rl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=rl();function Bd(e){Lr=e}var Xs={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(_n.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var rb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},sb=/^(?:[ \t]*(?:\n|$))+/,ob=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ib=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ab=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,sl=/(?:[*+-]|\d{1,9}[.)])/,Ud=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Wd=kt(Ud).replace(/bull/g,sl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lb=kt(Ud).replace(/bull/g,sl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ol=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,cb=/^[^\n]+/,il=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ub=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",il).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),db=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,sl).getRegex(),Ei="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",al=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,pb=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",al).replace("tag",Ei).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),zd=kt(ol).replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex(),fb=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",zd).getRegex(),ll={blockquote:fb,code:ob,def:ub,fences:ib,heading:ab,hr:Qs,html:pb,lheading:Wd,list:db,newline:sb,paragraph:zd,table:Xs,text:cb},Pd=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex(),_b={...ll,lheading:lb,table:Pd,paragraph:kt(ol).replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Pd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex()},mb={...ll,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",al).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt(ol).replace("hr",Qs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Wd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Hd=/^( {2,}|\\)\n(?!\s*$)/,hb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ti=/[\p{P}\p{S}]/u,cl=/[\s\p{P}\p{S}]/u,Gd=/[^\s\p{P}\p{S}]/u,yb=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,cl).getRegex(),Kd=/(?!~)[\p{P}\p{S}]/u,vb=/(?!~)[\s\p{P}\p{S}]/u,wb=/(?:[^\s\p{P}\p{S}]|~)/u,kb=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Vd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$b=kt(Vd,"u").replace(/punct/g,Ti).getRegex(),xb=kt(Vd,"u").replace(/punct/g,Kd).getRegex(),Yd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ab=kt(Yd,"gu").replace(/notPunctSpace/g,Gd).replace(/punctSpace/g,cl).replace(/punct/g,Ti).getRegex(),Sb=kt(Yd,"gu").replace(/notPunctSpace/g,wb).replace(/punctSpace/g,vb).replace(/punct/g,Kd).getRegex(),Eb=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Gd).replace(/punctSpace/g,cl).replace(/punct/g,Ti).getRegex(),Tb=kt(/\\(punct)/,"gu").replace(/punct/g,Ti).getRegex(),Cb=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rb=kt(al).replace("(?:-->|$)","-->").getRegex(),Ob=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Lb=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Zd=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",xi).replace("ref",il).getRegex(),Xd=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",il).getRegex(),Ib=kt("reflink|nolink(?!\\()","g").replace("reflink",Zd).replace("nolink",Xd).getRegex(),Dd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ul={_backpedal:Xs,anyPunctuation:Tb,autolink:Cb,blockSkip:kb,br:Hd,code:bb,del:Xs,emStrongLDelim:$b,emStrongRDelimAst:Ab,emStrongRDelimUnd:Eb,escape:gb,link:Lb,nolink:Xd,punctuation:yb,reflink:Zd,reflinkSearch:Ib,tag:Ob,text:hb,url:Xs},Mb={...ul,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",xi).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xi).getRegex()},el={...ul,emStrongRDelimAst:Sb,emStrongLDelim:xb,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Dd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Dd).getRegex()},Pb={...el,br:kt(Hd).replace("{2,}","*").getRegex(),text:kt(el.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ki={normal:ll,gfm:_b,pedantic:mb},Vs={normal:ul,gfm:el,breaks:Pb,pedantic:Mb},Db={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Nd=e=>Db[e];function or(e,t){if(t){if(_n.escapeTest.test(e))return e.replace(_n.escapeReplace,Nd)}else if(_n.escapeTestNoEncode.test(e))return e.replace(_n.escapeReplaceNoEncode,Nd);return e}function qd(e){try{e=encodeURI(e).replace(_n.percentDecode,"%")}catch{return null}return e}function Fd(e,t){let n=e.replace(_n.findPipe,(o,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(_n.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(_n.slashPipe,"|");return r}function Ys(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Nb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function jd(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function qb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ai=class{constructor(e){Ot(this,"options");Ot(this,"rules");Ot(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ys(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=qb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ys(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ys(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ys(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=m,n.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let b=v,k=b.raw+`
`+n.join(`
`),N=this.blockquote(k);o[o.length-1]=N,r=r.substring(0,r.length-b.raw.length)+N.raw,s=s.substring(0,s.length-b.text.length)+N.text;break}else if(v?.type==="list"){let b=v,k=b.raw+`
`+n.join(`
`),N=this.list(k);o[o.length-1]=N,r=r.substring(0,r.length-v.raw.length)+N.raw,s=s.substring(0,s.length-b.raw.length)+N.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),v=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(v)&&(u+=v+`
`,e=e.substring(v.length+1),l=!0),!l){let N=this.rules.other.nextBulletRegex(k),W=this.rules.other.hrRegex(k),K=this.rules.other.fencesBeginRegex(k),le=this.rules.other.headingBeginRegex(k),Y=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],D;if(v=B,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),D=v):D=v.replace(this.rules.other.tabCharGlobal,"    "),K.test(v)||le.test(v)||Y.test(v)||N.test(v)||W.test(v))break;if(D.search(this.rules.other.nonSpaceChar)>=k||!v.trim())d+=`
`+D.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(m)||le.test(m)||W.test(m))break;d+=`
`+v}!b&&!v.trim()&&(b=!0),u+=B+`
`,e=e.substring(B.length+1),m=D.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Fd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Fd(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Ys(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Nb(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),jd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return jd(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let d=[...r[0]][0].length,m=e.slice(0,s+r.index+d+i);if(Math.min(s,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let v=m.slice(2,-2);return{type:"strong",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Un=class tl{constructor(t){Ot(this,"tokens");Ot(this,"options");Ot(this,"state");Ot(this,"inlineQueue");Ot(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new Ai,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_n,block:ki.normal,inline:Vs.normal};this.options.pedantic?(n.block=ki.pedantic,n.inline=Vs.pedantic):this.options.gfm&&(n.block=ki.gfm,this.options.breaks?n.inline=Vs.breaks:n.inline=Vs.gfm),this.tokenizer.rules=n}static get rules(){return{block:ki,inline:Vs}}static lex(t,n){return new tl(n).lex(t)}static lexInline(t,n){return new tl(n).inlineTokens(t)}lex(t){t=t.replace(_n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_n.tabCharGlobal,"    ").replace(_n.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),v;this.options.extensions.startInline.forEach(b=>{v=b.call({lexer:this},m),typeof v=="number"&&v>=0&&(d=Math.min(d,v))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Si=class{constructor(e){Ot(this,"options");Ot(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_n.notSpaceStart)?.[0],s=e.replace(_n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+or(r)+'">'+(n?s:or(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:or(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let a=e.items[i];r+=this.listitem(a)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let i=0;i<o.length;i++)n+=this.tablecell(o[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${or(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=qd(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+or(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=qd(e);if(s===null)return or(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${or(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:or(e.text)}},dl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Wn=class nl{constructor(t){Ot(this,"options");Ot(this,"renderer");Ot(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new Si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new dl}static parse(t,n){return new nl(n).parse(t)}static parseInline(t,n){return new nl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},$i,Zs=($i=class{constructor(e){Ot(this,"options");Ot(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Un.lex:Un.lexInline}provideParser(){return this.block?Wn.parse:Wn.parseInline}},Ot($i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ot($i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$i),Fb=class{constructor(...e){Ot(this,"defaults",rl());Ot(this,"options",this.setOptions);Ot(this,"parse",this.parseMarkdown(!0));Ot(this,"parseInline",this.parseMarkdown(!1));Ot(this,"Parser",Wn);Ot(this,"Renderer",Si);Ot(this,"TextRenderer",dl);Ot(this,"Lexer",Un);Ot(this,"Tokenizer",Ai);Ot(this,"Hooks",Zs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Si(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Ai(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Zs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];Zs.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&Zs.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await a.call(s,u);return l.call(s,m)})();let d=a.call(s,u);return l.call(s,d)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await a.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Un.lex(e,t??this.defaults)}parser(e,t){return Wn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Un.lex:Un.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Wn.parse:Wn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Un.lex:Un.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Wn.parse:Wn.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+or(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Or=new Fb;function St(e,t){return Or.parse(e,t)}St.options=St.setOptions=function(e){return Or.setOptions(e),St.defaults=Or.defaults,Bd(St.defaults),St};St.getDefaults=rl;St.defaults=Lr;St.use=function(...e){return Or.use(...e),St.defaults=Or.defaults,Bd(St.defaults),St};St.walkTokens=function(e,t){return Or.walkTokens(e,t)};St.parseInline=Or.parseInline;St.Parser=Wn;St.parser=Wn.parse;St.Renderer=Si;St.TextRenderer=dl;St.Lexer=Un;St.lexer=Un.lex;St.Tokenizer=Ai;St.Hooks=Zs;St.parse=St;var R$=St.options,O$=St.setOptions,L$=St.use,I$=St.walkTokens,M$=St.parseInline;var P$=Wn.parse,D$=Un.lex;function mr(e){let t=St.parse(e),n=Id.sanitize(t);return Md(n)}function ir(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function os(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ci(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Jd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},jb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Bb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ub=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function zn(e){return!!e&&typeof e=="object"}function pl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function fl(e,t){let n=pl(e),r=pl(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function ep(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>zn(s)&&typeof s.text=="string"?s.text:"").join(""):zn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Wb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Jd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=pl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=fl(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=fl(zn(a)?a.old_string:"",zn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function _l(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var zb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function tp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>zn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(zb,"").trim();return n.length>0?{kind:"user",text:n}:null}function ml(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Bb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ub.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(zn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(ml(i.text));else if(i.type==="thinking"){let a=_l(i.thinking);a&&o.push(a)}else if(i.type==="tool_use"){let a=Wb(i);typeof i.id=="string"&&t.set(i.id,a),o.push(a)}}return n?Qd(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(zn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=ep(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let o=tp(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Qd([s],n):[s]}return[]}function Qd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Kb(e){let t=typeof e.command=="string"?e.command:"",n=ep(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Jd.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Vb(e){if(e.type==="item.completed"&&zn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ml(t.text)];if(t.type==="user_message"){let n=tp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=_l(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Kb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Yb(e){if(e.schema!=="codex-delegation-monitor-v1"||!zn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&zn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ml(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=_l(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=jb[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Zb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return zn(t)?t:null}function np(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Xb(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Hb(o,r);let i=o.schema==="codex-delegation-monitor-v1"?Yb(o):Zb(o)?Vb(o):Gb(o,n);return i.length>0&&(r.progress=null),i}}}function gl(e){let t=[],n=np(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qb=5,Jb=10,eh=/Task\s+#(\d+)/,th=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,nh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Js(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function rh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function oh(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=eh.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function ih(e){if(e.tool==="Bash"){let t=e.command||"";return th.test(t)?"~ PR/\uAC8C\uC2DC \uC911":nh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ah(e){let t=e.filter(s=>s.kind==="tool").slice(-Jb),n=new Map;t.forEach((s,o)=>{let i=ih(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function lh(e){let t=sh(e);if(t)return{text:t,guess:!1};let n=oh(e);if(n)return{text:n,guess:!1};let r=ah(e);return r?{text:r,guess:!0}:null}function ch(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function is(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,a=null,l=null,u=null,d=!1,m={},v=!0,b=new Set,k=new Set,N=null,W=null,K=!1,le=!1,Y=!1,B=null,D=null;function j(){K=!1,le=!1,Y=!1,B=null,D=null}async function Q(te){if(n){le=!0,Y=!1,Se();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(o!==te)return;!G||typeof G!="object"||Array.isArray(G)?Y=!0:(B=G,D=te)}catch{o===te&&(Y=!0)}finally{o===te&&(le=!1,Se())}}}function V(){if(K=!K,K&&o&&D!==o){Q(o);return}Se()}function ue(){if(!K)return"";let te=os({loading:le,error:Y});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=Ci(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function U(){if(!l||!r)return[];let te=r.get(l);return gl(te?te.lines:[])}function Z(){if(!l||!r)return null;let te=r.get(l),G=te?te.last_event_at:null;return typeof G=="number"?G:null}function ie(){return m.status==="running"}function ne(){if(ie()&&o){W||(W=setInterval(()=>Se(),1e3));return}Ee()}function Ee(){W&&(clearInterval(W),W=null)}function Ue(te){let G=[],he=0;for(;he<te.length;){let{idx:ct,line:nt}=te[he];if(nt.kind==="tool"){let Me=he;for(;Me<te.length&&te[Me].line.kind==="tool"&&te[Me].line.tool===nt.tool;)Me+=1;if(Me-he>=Qb&&!k.has(ct)){G.push({kind:"group",idx:ct,tool:nt.tool||"",lines:te.slice(he,Me)}),he=Me;continue}}G.push({kind:"line",idx:ct,line:nt}),he+=1}return G}function me(te){let G=[],he=new Map;for(let Me=0;Me<te.length;Me+=1){let Fe=te[Me],dt=Fe.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let at=he.get(dt);at||(at={kind:"subagent",idx:Me,launch_id:dt,agent_type:null,header:null,lines:[]},he.set(dt,at),G.push(at)),at.lines.push({idx:Me,line:Fe});continue}if(Fe.kind==="tool"&&Fe.tool==="Agent"&&typeof Fe.launch_id=="string"&&Fe.launch_id.length>0){let at=X(Fe),pt=he.get(Fe.launch_id);if(pt){pt.header={idx:Me,line:Fe},pt.agent_type=at;continue}let Et={kind:"subagent",idx:Me,launch_id:Fe.launch_id,agent_type:at,header:{idx:Me,line:Fe},lines:[]};he.set(Fe.launch_id,Et),G.push(Et);continue}G.push({kind:"entry",idx:Me,line:Fe})}let ct=[],nt=0;for(;nt<G.length;){if(G[nt].kind!=="entry"){ct.push(G[nt]),nt+=1;continue}let Me=nt;for(;Me<G.length&&G[Me].kind==="entry";)Me+=1;ct.push(...Ue(G.slice(nt,Me))),nt=Me}return ct}function X(te){let G=te.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function Te(te){for(let G=te.length-1;G>=0;G-=1){let he=te[G];if(he.kind==="result"||he.kind==="error")return null;if(he.kind==="tool"&&!Object.hasOwn(he,"result"))return he}return null}function Le(te){for(let G=te.length-1;G>=0;G-=1)if(te[G].kind==="thinking")return te[G];return null}function T(te,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let he=b.has(te);return c`<div
        class="sv__think${he?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(te)}
      >
        <span class="sv__think-line">💭 ${Js(G.text)}</span>
        ${he?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let he=b.has(te);return c`<div
        class="sv__line sv__line--user${he?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ht(te)}
      >
        <span class="sv__user-line">▷ ${Js(G.text)}</span>
        ${he?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let he=b.has(te),ct=G.tool==="Bash"?rh(G.command):0,nt=G.tool==="Bash"?ct>1?Js(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${he?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ht(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${nt?c`<span class="sv__tool-detail">${nt}</span>`:""}
          ${ct>1?c`<span class="sv__tool-more">⋯ ${ct}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${he?c`<pre class="sv__tool-expand">${se(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${mr(G.text||"")}</div>`}function se(te){let G=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)G.push(te.command);else if(te.input!==void 0)try{G.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&G.push(`output:
${te.output}`),G.join(`

`)}function $e(){if(!o)return c``;let te=U(),G=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),he=m.session_id||"",ct=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${v?"ON":"OFF"}`,nt=ie(),Me=nt?ch(Z(),Date.now()):"",Fe=nt?Te(te):null,dt=nt?Le(te):null,at=lh(te);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":o)}</span
        >
        ${at?c`<span
              class="sv__stage${at.guess?" sv__stage--guess":""}"
              title=${at.text}
              >${at.text}</span
            >`:""}
        ${nt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Me?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Me}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Me?c`<span class="sv__live-ago">${Me}</span>`:""}</span
            >`:""}
        ${he?c`<button
              type="button"
              class="sv__session"
              title=${he}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${he}`}
              @click=${()=>wt(he)}
            >
              ⧉ ${he.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>wt(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${K?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${K?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${v?" sv__follow--on":""}"
          aria-pressed=${v?"true":"false"}
          aria-label=${ct}
          @click=${_t}
        >
          <span class="sv__follow-full">⇣ ${ct}</span>
          <span class="sv__follow-short">⇣ ${v?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>bt()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ue()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:me(te).map(pt=>pt.kind==="subagent"?xe(pt):pt.kind==="group"?we(pt):T(pt.idx,pt.line))}
      </div>
      ${Fe||dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Fe?c`<span class="sv__now-icon">${Fe.icon}</span>
                  <span class="sv__now-name">${Fe.tool}</span>
                  <span class="sv__now-detail"
                    >${Fe.tool==="Bash"?Js(Fe.command):Fe.path||Fe.command||""}</span
                  >`:""}
            ${dt?c`<span class="sv__now-think"
                  >💭 ${Js(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function we(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>be(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(te){let G=k.has(te.idx),he=te.header?te.header.line:null,ct=he?he.is_error===!0?"\u2717":typeof he.result=="string"?"\u2713":"\u27F3":"",nt=he&&he.command?he.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${nt?c`<span class="sv__sub-detail">${nt}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${ct?c`<span class="sv__sub-state">${ct}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${Ue(te.lines).map(Me=>Me.kind==="group"?we(Me):T(Me.idx,Me.line))}
          </div>`:""}
    </div>`}function be(te){k.add(te),Se()}function Se(){rt($e(),e),ne(),v&&it()}function it(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function ht(te){b.has(te)?b.delete(te):b.add(te),Se()}function _t(){v=!v,Se()}function wt(te){Nn(te).then(G=>{G?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function R(te){!o||!te||(m={...m,...te},Se())}function oe(te){let G=te.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&v&&(v=!1,Se())}e.addEventListener("scroll",oe,!0);function Ce(te){let G=te.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||bt()}let Ne=!1;function We(){Ne||(document.addEventListener("mousedown",Ce),Ne=!0)}function Je(){Ne&&(document.removeEventListener("mousedown",Ce),Ne=!1)}function tt(te){let G=te&&te.attempt_id;if(!G)return;let he=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,ct=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if(he&&ct)return;let nt=l;o=G,i=he,a=ct,l=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&nt&&nt!==l&&Promise.resolve(n("unsubscribe-session-log",{id:nt})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,m=te.meta||{},d=te.hide_prompt===!0,v=!0,b.clear(),k.clear(),j(),!N&&r&&(N=r.subscribe(Se)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),We(),Se()}function bt(){let te=l;Je(),o=null,i=null,a=null,l=null,u=null,d=!1,b.clear(),k.clear(),j(),Ee(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),rt(c``,e),s&&s()}return{open:tt,updateMeta:R,close:bt,isOpen(){return o!==null},destroy(){Ee(),Je(),N&&(N(),N=null),e.removeEventListener("scroll",oe,!0),o=null,i=null,a=null,l=null,u=null,d=!1,rt(c``,e)}}}function uh(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ri(t.spec_id),s=Ri(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ri(e){return typeof e=="string"?e.trim():""}function dh(e){let t=uh(e);if(t.path)return t;let n=Ri(rp(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function rp(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var ph=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function eo(e){let t=dh(e),n=Ri(rp(e).spec_review),r=ph.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function fh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function _h(e){let t=e&&e.metadata||{},n=eo(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:fh(t)?null:"plan_pending"}),r}function sp(e,t){let n=_h(e);return c`
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
  `}var mh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",gh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,bh=/^\*\*결론\*\* — (.+)$/;function Oi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==mh)return null;let n=gh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?bh.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var op=20;function ip(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function hh(e){return e.length>op?`${e.slice(0,op)}\u2026`:e}function yh(e,t,n,r){let s=`${t.lane} ${hh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ip(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function vh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ip(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ap(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let u=Oi(typeof l.text=="string"?l.text:"");return u?yh(l,u,t,s.has(l.id)):vh(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:bx}=xc;var lp=e=>e.strings===void 0;var wh={},cp=(e,t=wh)=>e._$AH=t;var Ir=wi(class extends ss{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!lp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Cn||t===Ut)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return Cn}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Cn}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Cn;return cp(e),t}});var kh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],bl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},up={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},$h={pin:"pin",global:"global",base:"base"};function xh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${$h[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ah(e,t,n){switch(e){case"workflow_mode":return Cs;case"spec_review_model":case"impl_review_model":return Rs;case"plan_review_model":return Yo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Zo;case"impl_dispatch":return Du;case"impl_runtime":return Vo;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return es(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ts;case"orchestration_model":return Os(n,null);case"orchestration_effort":return es(n,void 0,t.orchestration_model||Sn).filter(r=>r!==Sn);default:return[]}}function Sh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${xh(e.source)}
    <span class="detail-effective__k"
      >${dr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Xo[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${dr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function dp(e,t){let n=Oa.flatMap(l=>l.keys),r=La(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Wu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),i=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${a}
        >${Eh(o)}</span
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
          ${Oa.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=jo({key:u.key,choices:Ah(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Sh(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ir(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Eh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Th(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function pp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},o=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",a=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=Th(r.exec_receipt),u=l?Jn(l):a,d=l?`${l.kind}:${l.actor}`:a.split("@")[0],m=qo(r.planned_execution,r.exec_receipt),v=r.chips?.pr?.number,b=typeof v=="number"?`PR #${v}`:"PR",k=ts(n),N=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${o?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${o}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${m?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${m.kind}
            title=${m.title}
            >${m.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${l?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${k.state}
            title=${Jo(k)}
            ?disabled=${k.state==="applied"}
            @click=${()=>N?.(k.rec,k.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Ch(o).map(W=>Rh(W,n,s,{label:W.id==="pr"?b:W.label,href:W.id==="pr"?i:""}))}
    </div>
  </section>`}function Ch(e){let n=typeof e=="string"&&Object.hasOwn(bl,e)&&bl[e]||bl.spec_backed;return kh.filter(r=>n.includes(r.id))}var Li={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Rh(e,t,n,r){let s=Oh(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,a=i?i==="full":s.length>0,l=!a&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",m=u?Li.stale:a?Li.on:l?Li.current:Li.none,v=Lh(e,n),b=`${r.label} \xB7 ${m}${v?` \xB7 ${v}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,N=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${N}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${N}</span
  >`}function Oh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Lh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(up,n)?up[n]:""}function Ii(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fp(e){return Ii(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function _p(e,t){let n=e&&e[t];if(!Ii(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(fp),s=fp(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function bp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Mi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${bp(e)}${t}`}function as(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${bp(e)}`}function Ih(e,t,n){if(n!==null){let s=e==="claude"?Mi:as,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:as({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function mp(e,t){if(!Ii(e)||e.state!=="usable"||!Ii(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function gp(e){let t=e.provider_key==="claude"?Mi:as,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ih(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function hp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${gp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:_p(t,"claude"),selected:s,workspace_default:mp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${gp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:_p(t,"codex"),selected:o,workspace_default:mp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Mh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ph(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Pi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a=null,l="";function u(N){N.key==="Escape"&&s&&(N.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Mh(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${a===null?null:c`<pre class="mv__front">
${a}</pre
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){rt(d(),e)}async function v(N,W={}){s=N,o="loading",i="",a=null,l="",m();let K=W.workspace||(n?n():"");if(!K){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let le="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(N);try{let Y=await r(le),B=await Y.json().catch(()=>({}));if(!Y.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||Y.status)+")",m();return}let D=Ph(String(B.content||""));a=D.front,i=D.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,rt(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:v,close:b,destroy:k}}var Dh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],wp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Di=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Nh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function yp(e){return typeof e=="string"&&Nh.has(e)}var qh=["running","done","failed","interrupted"],Fh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function jh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Bh(e){let t=an(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${wp}
          >부분 집계</span
        >`:""}`}function vp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function vl(e){if(typeof e=="number")return to(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?to(t):""}function Uh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Wh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function hl(e){return e===null||typeof e=="string"&&e.trim().length>0}function yl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function zh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Di.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?hl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||hl(t.effort))||!(!("agent_type"in t)||hl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!qh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!yl(t.started_at)||!yl(t.last_event_at)||!yl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Hh(e,t,n){let s=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${vl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${vl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Gh(e,t,n,r){let s=e.status==="running"?null:t,i=(s?an({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?to(e.last_event_at):s?vl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Uh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Wh(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Fh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Kh(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Vh(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let m=zh(d);!m||s.has(m.launch_id)||yp(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let i={};for(let{role:d,provider:m}of Di){let v=t?t.roles[d]?.[m]:null;i[d]=v?[...v.legs]:[]}let a=Di.flatMap(({role:d})=>i[d]),l=new Set,u=[];for(let{role:d,provider:m}of Di){for(let v of r.filter(b=>b.role===d&&b.provider===m)){let b=a.find(k=>k.receipt_id===v.launch_id)||null;b&&!Kh(v,b)||(b&&l.add(b.receipt_id),u.push(Gh(v,b,e.attempt_id,n)))}for(let v of i[d])!l.has(v.receipt_id)&&!yp(v.agent_type)&&u.push(Hh(d,m,v))}return u}function Yh(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Dh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${jh(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${wp}</span>`:""}
  </div>`}var Zh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function to(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Xh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Qh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Jh(e,t){let n=Qh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ha(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${vs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${to(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function kp(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],a=i.map(b=>Jh(b,t)),l=n.expanded||new Set;if(s.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let N=typeof b.session_id=="string"&&b.session_id.length>0,W=u.has(b.attempt_id),K=N&&!W,le=N?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!K}
      title=${le}
      @click=${Y=>{Y.stopPropagation(),K&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let N=b.cause_detail,W=N&&typeof N.reason=="string"&&N.reason.length>0?typeof N.command=="string"&&N.command.length>0?`${N.reason} \xB7 ${N.command}`:N.reason:b.cause;return c`<div class="detail-session__cause" title=${W}>
      ${b.cause}
    </div>`},v=b=>{let k=vp(ka(b));if(an(k).length===0&&!Xr(b.usage))return"";let N=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${N?"true":"false"}
      title=${N?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${W=>{W.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Bh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(b=>{let k=ka(b),N=vp(k),W=an(N);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Zh[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${hs(b)?c`<span
                  class="detail-session__resumed"
                  title=${hs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sr(b)}</span>
            ${W.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${W.length>0?W.map(K=>c`<span
                      class="detail-session__usage"
                      title=${K.tooltip}
                      >${K.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${to(b.started_at)}</span>
          </button>
          ${v(b)} ${d(b)} ${m(b)} ${Xh(b)}
          ${l.has(b.attempt_id)&&b.usage?Yh(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Vh(b,k,t)}
        </div>`})}
    </div>
  `}function $p(e,t={}){return c`
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
          ${ey(e)}
        </div>`:""}
  `}function ey(e){let t=os(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ci(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ty=["open","in_progress","deferred","resolved","closed"],ny=[0,1,2,3,4];function xp(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},v="",b=!1,k=[],N=!1,W={},K={claude:null,codex:null},le=null,Y=null,B=0,D=!1,j=!1,Q="",V="",ue="",U="",Z=!1;function ie(){D=!1,j=!1,Q="",V="",ue="",U="",Z=!1}function ne(){K={claude:null,codex:null},le=null,Y=null,B+=1}async function Ee(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function Ue(y){try{let E=await fetch(y);if(!E.ok)return null;let A=await E.json();if(!A||typeof A!="object"||!Array.isArray(A.accounts))return null;let _e=A.accounts.filter(Ke=>Ke!==null&&typeof Ke=="object"&&!Array.isArray(Ke));return{accounts:_e,active:_e.find(Ke=>Ke.active===!0)||null}}catch{return null}}async function me(y){Y=y;let E=++B,[A,_e,Ke]=await Promise.all([Ue("/api/claude-usage"),Ue("/api/codex-usage"),Ee()]);E!==B||y!==u||(K={claude:A,codex:_e},le=Ke,De())}let X=[],Te=null,Le=null,T=!1,se="",$e=!1,we=0,xe=new Set;function be(){X=[],Te=null,Le=null,T=!1,se="",$e=!1,we+=1,xe.clear()}async function Se(y){if(!s)return;let E=++we;try{let A=await Promise.resolve(s("get-comments",{id:y}));if(E!==we||y!==u)return;X=Array.isArray(A)?A:[],T=!1}catch{if(E!==we||y!==u)return;T=!0}De()}function it(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,Le=y,Se(u);return}y!==null&&y!==Le&&(Le=y,Se(u))}function ht(y){xe.has(y)?xe.delete(y):xe.add(y),De()}function _t(y){let E=se.trim().length===0;se=y,E!==(y.trim().length===0)&&De()}async function wt(){let y=se.trim();if(!s||!u||y.length===0||$e)return;let E=u;$e=!0,De();let A=!1;try{let _e=await Promise.resolve(s("add-comment",{id:E,text:y}));Array.isArray(_e)&&_e.length>0&&(A=!0,E===u&&(X=_e,T=!1,se="",Le=_e.length))}catch{A=!1}A||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),E===u&&($e=!1),De()}let R={onToggle:ht,onDraftInput:_t,onSubmit:wt},oe=t.mdViewer||null,Ce=null;oe||(Ce=document.createElement("div"),Ce.className="md-viewer-root",document.body.appendChild(Ce));let Ne=oe||Pi(Ce,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),We=document.createElement("div");We.className="session-log-root",document.body.appendChild(We);let Je=is(We,{transport:s?(y,E)=>Promise.resolve(s(y,E)):void 0,sessionLogStore:l}),tt=!1,bt=!1,te=!1,G=null,he=null,ct=0;function nt(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function Me(){tt=!1,bt=!1,te=!1,G=null,he=null,ct+=1}async function Fe(y){if(!s)return;let E=++ct;bt=!0,te=!1,De();try{let A=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(E!==ct)return;!A||typeof A!="object"||Array.isArray(A)?te=!0:(G=A,he=nt(y))}catch{E===ct&&(te=!0)}finally{E===ct&&(bt=!1,De())}}let dt=[],at=null,pt=0;function Et(y,E){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${E}`}function zt(){dt=[],at=null,pt+=1}async function Ht(y,E){if(!s)return;let A=++pt,_e;try{_e=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{_e=null}A!==pt||E!==at||(dt=_e&&Array.isArray(_e.sessions)?_e.sessions:[],De())}function Lt(){if(!s||!u)return;let y=d&&d.metadata,E=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(E===null){zt();return}let A=Et(u,E);at!==A&&(dt=[],at=A,Ht(u,A))}function It(){if(tt=!tt,tt&&u&&he!==nt(u)){G=null,Fe(u);return}De()}function xt(){if(!i||!u)return[];let y=i.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(A=>A&&A.bead_id===u).sort((A,_e)=>(_e.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,effort:A.effort||A.observed_effort||null,speed:A.speed||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null,continuation_mode:A.continuation_mode||null,dismissed_at:typeof A.dismissed_at=="number"?A.dismissed_at:null,cause:typeof A.cause=="string"?A.cause:null,cause_detail:A.cause_detail||null,exec_default_preset_id:typeof A.exec_default_preset_id=="string"?A.exec_default_preset_id:null,exec_default_preset_revision:typeof A.exec_default_preset_revision=="number"?A.exec_default_preset_revision:null,exec_values:A.exec_values&&typeof A.exec_values=="object"?A.exec_values:null,usage:A.usage||null,usage_legs:Array.isArray(A.usage_legs)?A.usage_legs:[],delegation_sessions:Array.isArray(A.delegation_sessions)?A.delegation_sessions:[]}))}function je(){if(!i||!u)return null;let y=i.get();return Rn(y&&y.attempts||{},u)}let I=new Set;function J(y){I.has(y)?I.delete(y):I.add(y),De()}function ge(y){let E=i?i.get():null,A=E&&E.attempts?E.attempts[y]:null;Je.open({attempt_id:y,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}function C(y,E){let A=i?i.get():null,_e=A&&A.attempts?A.attempts[y]:null,Ve=(_e&&Array.isArray(_e.delegation_sessions)?_e.delegation_sessions:[]).find(vt=>vt&&typeof vt=="object"&&vt.launch_id===E);Ve&&Je.open({attempt_id:y,launch_id:E,meta:{runner:Ve.provider==="claude"?"claude":"codex",role:Ve.role,...typeof Ve.agent_type=="string"?{agent_type:Ve.agent_type}:{},model:Ve.model,effort:Ve.effort,session_id:Ve.session_id,status:Ve.status}})}async function H(y){if(!s||!y)return;let E=await Vr();if(E===null)return;let A=()=>{let vt=i?i.get():null;return vt&&typeof vt.revision=="number"?vt.revision:0},_e=async(vt={},ze=A())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:ze,...E!==""?{instructions:E}:{},...vt}),Ke=vt=>{vt?.queue&&i?.set&&i.set(vt.queue)},Ve=await _e();if(Ke(Ve),Ve&&Ve.conflict){let vt=Ve.queue&&typeof Ve.queue.revision=="number"?Ve.queue.revision:A();Ve=await _e({},vt),Ke(Ve)}Ve=await er(Ve,(vt,ze)=>_e({continuation:vt,decision_token:ze}),{onResult:Ke,refresh:()=>_e()}),Ve&&Ve.resumed===!1&&!Ve.conflict&&Ve.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ve.reason}`,"error",2400)}function Ie(y){!y||!u||Je.open(Yr(y,u,d&&d.status))}let Be={onOpen:ge,onOpenDelegation:C,onResume:H,onToggleUsage:J,onOpenSessionRef:Ie,onCopyResumeCommand:Qt};function Ae(){let y=i?i.get():null,E={...W};for(let A of["orchestration_model","orchestration_effort","orchestration_speed"]){let _e=y&&y[A];typeof _e=="string"&&(E[A]=_e)}return E}async function lt(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));W=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{W={}}De()}}function st(){let y=i?i.get():null;return y&&y.runner_catalog||null}function ye(){let y=i?i.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function Xe(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},A=$n({pin:{...y,...m},global:Ae(),execution_defaults:ye(),runner_catalog:st(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return qn(st(),A)}function P(){let y=a?a.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function F(y){return y?.compatible===!1}function ve(y){a&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&a.set({revision:y.revision,presets:y.presets})}async function Ge(){let y=P(),E=y?.presets.find(A=>A.id===v);if(!(!s||!u||!y||!E||F(E)||b)){b=!0,k=[],De();try{let A=await Promise.resolve(s("apply-impl-preset",Hu(u,E.id,y.revision)));if(A&&A.conflict){ve(A),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let _e=A&&Array.isArray(A.issue)?A.issue[0]:A?.issue;if(A&&A.applied&&_e&&typeof _e=="object"){d=_e,k=Array.isArray(A.skipped_orchestration_keys)?A.skipped_orchestration_keys.filter(Ke=>typeof Ke=="string"):[];for(let Ke of Gu)delete m[Ke];ce(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}A&&A.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(A){A&&typeof A=="object"&&A.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,De()}}}let ke=null;n&&n.subscribe&&(ke=n.subscribe(()=>Tt()));let Ze=null;i&&typeof i.subscribe=="function"&&(Ze=i.subscribe(()=>{u&&De()}));let ot=null,mt=null;function $t(){mt&&(mt(),mt=null)}a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{u&&De()}));function Kt(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",Kt);function Tt(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(A=>A&&A.id===u)||y[0]||d}it(),Lt(),De()}}function Qt(y){Nn(y).then(E=>{E?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Pe(y){y.preventDefault(),y.stopPropagation(),u&&Qt(u)}function mn(y,E){y.preventDefault(),y.stopPropagation(),Qt(E)}function Jt(y,E,A){y.preventDefault(),y.stopPropagation(),Ne.open(E,{missing_state:A})}async function Ft(y,E){let A=Object.hasOwn(m,y),_e=m[y];if(m[y]=E,De(),!(!s||!u))try{let Ke=await Promise.resolve(s("update-exec-settings",zu(u,y,E.length===0?null:E))),Ve=Array.isArray(Ke)?Ke[0]:Ke;if(!Ve||typeof Ve!="object"||!Ve.id)throw new Error("exec settings readback failed");d=Ve,delete m[y],De()}catch(Ke){throw A?m[y]=_e:delete m[y],De(),ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ke}}function Xt(y){y.catch(()=>{})}async function gn(y,E){let A=d||{},_e=A.metadata&&typeof A.metadata=="object"?A.metadata:{},Ke={};for(let ze of["impl_runtime","impl_model","impl_effort"])Ke[ze]=Object.hasOwn(m,ze)?m[ze]:typeof _e[ze]=="string"?_e[ze]:"";Ke[y]=E;let Ve=Yu(Ke,st(),Xe()),vt={};for(let ze of["impl_runtime","impl_model","impl_effort"])vt[ze]=m[ze],m[ze]=Ve[ze]||"";if(De(),!(!s||!u))return Promise.resolve(s("update-impl-target",{id:u,...Ve,orchestration_runtime:Xe()})).then(ze=>{let ft=Array.isArray(ze)?ze[0]:ze;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");d=ft;for(let yn of["impl_runtime","impl_model","impl_effort"])delete m[yn];De()}).catch(ze=>{for(let ft of["impl_runtime","impl_model","impl_effort"])vt[ft]===void 0?delete m[ft]:m[ft]=vt[ft];throw De(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),ze})}async function fe(y,E){if(!(!y||typeof y!="object")&&!(E==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await Ft("orchestration_model",y.orchestration_model)}catch{return}if(typeof y.impl_runtime=="string"&&y.impl_runtime.length>0)try{await gn("impl_runtime",y.impl_runtime)}catch{}}}async function S(y,E,A){if(!s||!u)return!1;try{let _e=await Promise.resolve(s(y,E)),Ke=Array.isArray(_e)?_e[0]:_e;return Ke&&typeof Ke=="object"&&Ke.id?(d=Ke,!0):(ce(A,"error"),!1)}catch(_e){return _e&&typeof _e=="object"&&_e.code==="bd_readback_failed"?(ce("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ce(A,"error"),!1)}}function de(y){setTimeout(()=>{try{let E=e.querySelector(y);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function Oe(){D=!0,Q=d&&d.title||"",De(),de('.detail-edit__input[data-edit="title"]')}function yt(y){Q=y.target.value}function Rt(){D=!1,Q="",De()}function At(){S("edit-text",{id:u,field:"title",value:Q},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E===!0&&(D=!1,Q=""),De()})}function jt(){j=!0,V=d&&d.description||"",De(),de('.detail-edit__textarea[data-edit="description"]')}function nn(y){V=y.target.value}function rn(){j=!1,V="",De()}function En(){S("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E===!0&&(j=!1,V=""),De()})}function Mt(y,E,A,_e){if(y.key==="Escape"){y.stopPropagation(),A();return}y.key==="Enter"&&(!_e||y.ctrlKey||y.metaKey)&&(y.preventDefault(),E())}function sn(y){let E=y.target.value;S("update-status",{id:u,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>De())}function cn(y){let E=Number(y.target.value);S("update-priority",{id:u,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>De())}function un(y){ue=y.target.value}function Gn(){let y=ue.trim();y.length!==0&&S("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E===!0&&(ue=""),De()})}function x(y){if(y.key==="Escape"){y.stopPropagation(),ue="",De();return}y.key==="Enter"&&(y.preventDefault(),Gn())}function O(y){S("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>De())}let p={onCopyPath:mn,onOpenDoc:Jt};function h(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function L(y){return y&&typeof y=="object"?String(y.dependency_type||y.type||""):""}function ee(y){switch(y){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return y.length>0?`${y} `:""}}function pe(y){if(!y||typeof y!="object")return;let E=typeof y.status=="string"?y.status:"",A=typeof y.title=="string"?y.title:"";return E.length>0&&A.length>0?`${E} \xB7 ${A}`:void 0}function ut(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Qe(){return t.depCandidates?t.depCandidates():null}async function Bt(y,E,A){let _e=ut(),Ke=u;if(!Ke)return;if(_e.length===0){ce("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let Ve=await S(y,{a:Ke,b:E,view_id:Ke,root_dir:_e},A),vt=Ve===!0||Ve!==!1&&Ve.saved===!0;vt&&t.onDepChanged&&t.onDepChanged({type:y,a:Ke,b:E}),y==="dep-add"&&vt&&(U="",Z=!1),De()}function Gt(y){if(!u)return;let E=globalThis.confirm;typeof E=="function"&&!E(`${y}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Bt("dep-remove",y,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function en(y){y.disabled||Bt("dep-add",y.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Tn(y){U=y.target.value,Z=!0,De()}function bn(){Z||(Z=!0,De())}function Vt(y,E){if(y.key==="Escape"){y.stopPropagation(),U="",Z=!1,De();return}y.key==="Enter"&&(y.preventDefault(),E.length===1&&!E[0].disabled&&en(E[0]))}function hn(y){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${U}
        @focus=${bn}
        @input=${Tn}
        @keydown=${E=>Vt(E,y)}
      />
      ${Z||U.length>0?c`<div class="detail-dep-add__list">
            ${y.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:y.map(E=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${E.bead_id}
                      ?disabled=${E.disabled}
                      title=${kn(E.reason)}
                      @click=${()=>en(E)}
                    >
                      <span class="detail-dep-add__repo"
                        >${E.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${E.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${E.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Ln(y,E){let A=E.get(y.id),_e=o?c`<button
          type="button"
          class="detail-dep__link"
          title=${kn(y.title)}
          @click=${()=>A===void 0?o(y.id):o(y.id,A)}
        >
          ${y.label}
        </button>`:c`<span class="detail-dep__link" title=${kn(y.title)}
          >${y.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${y.kind}${o?" detail-dep--link":""}`}
      >${_e}${y.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${y.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+y.id}
            @click=${()=>Gt(y.id)}
          >
            ✕
          </button>`:""}</span
    >`}function In(y){let E=Array.isArray(y.dependencies)?y.dependencies:[],A=Array.isArray(y.dependents)?y.dependents:[],_e=[];for(let ze of E){let ft=h(ze);ft.length>0&&L(ze)==="blocks"&&_e.push({id:ft,label:`\u26D3 \uB9C9\uB294 ${ft}`,kind:"pred",title:pe(ze)})}for(let ze of A){let ft=h(ze);ft.length>0&&L(ze)==="blocks"&&_e.push({id:ft,label:`\u26D3 \uB9C9\uD788\uB294 ${ft}`,kind:"succ",title:pe(ze)})}for(let ze of E){let ft=h(ze),yn=L(ze);ft.length>0&&yn!=="blocks"&&_e.push({id:ft,label:`${ee(yn)}${ft}`,kind:"other",title:pe(ze)})}let Ke=Qe(),Ve=new Map;if(Ke)for(let ze of Ke.issues)Ve.has(ze.bead_id)||Ve.set(ze.bead_id,ze.root_dir);let vt=Ke&&u?vd(yd(u,Ke),U):[];return c`
      <div class="detail-section-label">의존성</div>
      ${_e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${_e.map(ze=>Ln(ze,Ve))}
          </div>`}
      ${Ke===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:hn(vt)}
    `}function ar(y){let E=y.metadata||{},A=y.workflow||{},_e=A.stages||{},Ke=_e.spec&&_e.spec.stale,Ve=_e.impl&&_e.impl.stale,vt=A.quick_fix_review?.state==="stale",ze=_e.plan||null,ft=A.route_source==="derived",yn=A.route||E.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ft?" detail-kv__v--derived":""}"
          title=${ft?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ft?"unset":yn}</span
        >
      </div>
      ${A.route!=="quick_fix"||Object.hasOwn(E,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${E.spec_review||"\uC5C6\uC74C"}${Ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ze?.approval_receipt||"\uC5C6\uC74C"}${ze?.approval_state==="stale"?" \xB7 stale":ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${A.route!=="quick_fix"||Object.hasOwn(E,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${E.impl_review||"\uC5C6\uC74C"}${Ve?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${A.resolver.attempt} \xB7 ${A.resolver.prior_sha} \u2192 ${A.resolver.sha}`}
              >${`${A.resolver.prior_sha.slice(0,7)} \u2192 ${A.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${A.route==="quick_fix"||Object.hasOwn(E,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${E.quick_fix_review||"\uC5C6\uC74C"}${vt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${A.planned_execution.kind}</span>
            </div>
            ${A.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${A.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${A.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(A.exec_receipt)}</span
            >
          </div>`:""}
      ${A.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${A.impl_entry.actor}@${A.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${E.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let f={route:["quick_fix","spec_backed","full_plan"]};async function g(y,E){let A=E.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){De();return}await S("update-workflow-meta",{id:u,key:y,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),De()}function w(y){let E=y.metadata||{};return c` ${((_e,Ke)=>{let Ve=f[_e],vt=typeof E[_e]=="string"?E[_e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${_e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${_e}
          data-edit=${`wfmeta-${_e}`}
          @change=${ze=>g(_e,ze)}
        >
          <option value="" ?selected=${!Ve.includes(vt)}>
            ${Ke}
          </option>
          ${Ve.map(ze=>c`<option value=${ze} ?selected=${vt===ze}>${ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(y,E){return D?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Q}
            @input=${yt}
            @keydown=${A=>Mt(A,At,Rt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${At}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Rt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${an(E).map(A=>c`<span class="detail-usage-total" title=${A.tooltip}
              >${A.label}</span
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
    `}function q(y){let E=on(y.created_at),A=on(y.updated_at);return!E&&!A?c``:c`
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function z(y,E){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sn}
        >
          ${ty.map(A=>c`<option value=${A} ?selected=${A===y}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${cn}
        >
          ${ny.map(A=>c`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function re(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${j?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${jt}
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
              .value=${V}
              @input=${nn}
              @keydown=${E=>Mt(E,En,rn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${En}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${rn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Re(y){let E=typeof y.notes=="string"?y.notes:"";return E.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${E}</div>
    `}function He(y){let E=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>c`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>O(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ue}
            @input=${un}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Gn}
          >
            추가
          </button>
        </span>
      </div>
    `}function et(){if(!u)return c``;let y=d||{},E=String(y.id||u),A=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",_e=je(),Ke=y.status||"open",Ve=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",vt=y.description||"",ze={...y,metadata:{...y.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Pe}
            >
              ${E}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${$(A,_e)}
          ${pp(ze,{onApplyRec:fe})}
          ${dp({metadata:ze.metadata,workspace_values:Ae(),catalog:st(),execution_defaults:ye(),expanded:N,presets:P()?.presets||[],preset_id:v,preset_busy:b,skipped_orchestration_keys:k},{onToggle:ft=>{N=ft,De()},onEdit:(ft,yn)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){Xt(gn(ft,yn??""));return}Xt(Ft(ft,yn??""))},onPresetSelect:ft=>{v=ft,k=[],De()},onPresetApply:()=>{Ge()}})}
          ${hp({md:ze.metadata,catalog:K,workspace_defaults:le,handlers:{onExecChange:(ft,yn)=>Xt(Ft(ft,yn))}})}
          ${z(Ke,Ve)} ${q(y)}
          ${re(vt)}
          ${ap(X,R,{expanded:xe,draft:se,sending:$e,error:T})}
          ${Re(y)} ${He(y)} ${In(y)}
          ${ar(y)} ${w(y)}
          ${sp(y,p)}
          ${$p({expanded:tt,loading:bt,error:te,data:G},{onToggle:It})}
          ${kp(xt(),Be,{total:_e,expanded:I},dt)}
        </div>
      </div>
    `}function De(){rt(et(),e)}return{load(y){y!==u&&(m={},v="",k=[],N=!1,ie(),be(),Me(),zt(),ne()),u=y,d=null,!mt&&t.subscribeCandidates&&(mt=t.subscribeCandidates(()=>{u&&De()})),Tt(),lt(),Y!==y&&me(y)},clear(){u=null,d=null,m={},v="",b=!1,k=[],N=!1,ie(),be(),Me(),zt(),ne(),$t(),Ne.close(),Je.close(),rt(c``,e)},destroy(){ke&&(ke(),ke=null),Ze&&(Ze(),Ze=null),ot&&(ot(),ot=null),$t(),document.removeEventListener("keydown",Kt),oe||(Ne.destroy(),Ce&&Ce.parentNode&&Ce.parentNode.removeChild(Ce)),Je.destroy(),We.parentNode&&We.parentNode.removeChild(We),u=null,d=null,ne(),v="",b=!1,k=[],be(),Me(),zt(),rt(c``,e)}}}function Ap(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let v=typeof m=="string"?m.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}var ry="(max-width: 640px)";function Ni(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ry),n=!!t.matches;e(n);let r=s=>{let i=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function sy(){return{lanes:{done:!0},areas:{}}}function no(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function oy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:no(r.lanes),areas:no(r.areas)}:{lanes:no(r),areas:{}}}catch{return null}}function Sp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function qi(e,t=sy()){let n={lanes:no(t.lanes),areas:no(t.areas)},r=oy(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let i=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:i}},Sp(e,s),i},toggleArea(o){let i=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:i}},Sp(e,s),i}}}function Tp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:l})}for(let i=0;i<s.length;i+=1)for(let a=i+1;a<s.length;a+=1){let l=ti(s[i].scope,s[a].scope);if(l.length===0)continue;let u=s[i].member,d=s[a].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Ep=["parallel","serial","candidate"];function ro(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function wl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=Ep.includes(r.kind),l=Ep.includes(s.kind);if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&l&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(a&&o===null&&l&&i===null){let u=iy(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${ro(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ro(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function iy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Cp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Rp={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function xl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function kl(e){for(let t of xl(e))if(Object.hasOwn(Cp,t))return Cp[t];return null}function $l(e){let t=null;for(let n of xl(e))Object.hasOwn(Rp,n)&&(t=Rp[n]);return t}function ls(e){let t=kl(e),n=$l(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Lp(e,t){let n=kl(e)??kl(t),r=$l(t)??$l(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ay=new Set(["repo_operation_timeout_unresolved"]);function ly(e){for(let t of xl(e))if(ay.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function cy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Ip(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ly(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(cy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Cr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Op={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Mp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Op,t.blocked_reason)?Op[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ls(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ls(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Pp=160;function uy(e){return e.length>Pp?`${e.slice(0,Pp)}\u2026`:e}function dy(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${uy(e.command)}</code>`:""}
  </div>`}function py(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function fy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Dp(e){let t=e.failure?ls(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${dy(e.failure.cause_detail,e.failure.reason)}
          ${py(e.failure.reason)}
          ${Ms({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function _y(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var my=new Set(["codex-runner"]);function gy(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&my.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),u=a.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",m=r?wn(r.updated_at,t):"",v=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${wn(i,t)}</span
            >`:""}
      </div>`:v?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${v}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var by={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function hy(e){if(!e)return"";let t=by[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Al(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fy(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=hs(e),m=an(e.usage),v=tr(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,N=e.landing,W=e.attempt_id&&e.attempt_id===n,K=r.monitor||null,le=_y(K),Y=K?li(K.dependency_chips):"",B=gy(K,t,a,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),D=s&&e.workflow?.chips?.exec_receipt||null,j=ci(e.workflow),Q=ui(e.rec),V=D?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(D)}`}
        >${`${D.kind}:${No(D)}`}</span
      >`:"",ue=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${vs(o)}</span
      >`:"",U=le||j||ue||V||Q?c`<div class="rtile__meta">
          ${le}${j}${ue}${V}${Q}
        </div>`:"",Z=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ie=s?"":ns(e),ne=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${W?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${di(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${Z}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${hy(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${ne}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
                  aria-label="실패 기록 닫기"
                >
                  ✕
                </button>`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${a?c`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${ne}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${B}${e.rollup?Po(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ma}):""}
    ${N?c`<div class="rtile__landing">
          <span
            class="merge-step${N.failed?" merge-step--failed":""}"
            style=${`--progress: ${N.percent}%`}
            >${N.label}${N.index>0?c`<span class="merge-step__n"
                  >${N.index}/${N.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Y}
    ${s?U:le||j||u||Q||m.length>0||v?c`<div class="rtile__meta">
            ${le}${j}${ai(e.exec_chips)}${Q}
            ${m.length>0?m.map(Ee=>c`<span class="worker-usage" title=${Ee.tooltip}
                      >${Ee.label}</span
                    >`):v?c`<span
                    class="worker-usage"
                    title=${ws(e.usage)}
                    >${v}</span
                  >`:""}
          </div>`:""}
    ${Ms(e)} ${ie}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Np(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Al(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var ln="",yy=["impl_runtime","impl_model","impl_effort"],vy=["claude_account","codex_account"],wy=5,Fi=1;function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ji(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>ce(I,"error",4e3)),o={},i={},a=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},v=Promise.resolve(),b={claude:null,codex:null},k=!1,N=null,W={},K="",le="",Y=!1,B=!1,D=!1,j=null,Q=!1;function V(){let I=t.queue?t.queue():null;return xn(I)?I:null}function ue(){let I=V();return I?I.runner_catalog:null}function U(){let I=V();return I&&xn(I.execution_defaults)?I.execution_defaults:null}function Z(){let I=t.implPresetStore?.get();return xn(I)&&Array.isArray(I.presets)?I:null}function ie(){return r===null?{}:{root_dir:r}}async function ne(I,J){return Q||!n?null:await n(I,J)}function Ee(I){I&&xn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function Ue(I,J){let ge=V();if(!ge||Q)return null;let C=await ne(I,{...J,...ie(),expected_revision:ge.revision});if(Ee(C),r!==null&&C&&C.conflict){let H=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:V()?.revision??ge.revision;C=await ne(I,{...J,...ie(),expected_revision:H}),Ee(C)}return C}async function me(){l=!0,je();try{let I=await ne("get-session-defaults",{...ie()});o=xn(I?.values)?{...I.values}:{},i={...o},a=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){a=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{l=!1,je()}}async function X(){let I=Bu(o,i);if(Object.keys(I).length!==0){try{let J=await ne("set-session-defaults",{values:I,...ie()});o=xn(J?.values)?{...J.values}:{},i={...o},a=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}je()}}function Te(I,J){if(!xn(I))return;let ge=I.state;u={state:ge==="usable"||ge==="unusable"||ge==="absent"?ge:"absent",values:xn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},m={...u.values},J&&(d={...m})}async function Le(){try{Te(await ne("get-workspace-accounts",{...ie()}),!0)}catch(I){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}je()}async function T(I){try{let J=await fetch(I);if(!J.ok)return null;let ge=await J.json();if(!xn(ge)||!Array.isArray(ge.accounts))return null;let C=ge.accounts.filter(H=>xn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:C,active:C.find(H=>H.active===!0)||null}}catch{return null}}async function se(){k=!0;let[I,J]=await Promise.all([T("/api/claude-usage"),T("/api/codex-usage")]);Q||(b={claude:I,codex:J},je())}function $e(){let I={};for(let J of vy){let ge=Object.hasOwn(d,J)?d[J]:null,C=Object.hasOwn(m,J)?m[J]:null;ge!==C&&(I[J]=ge)}return I}async function we(){let I=$e();if(Object.keys(I).length!==0){try{Te(await ne("set-workspace-accounts",{values:I,...ie()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}je()}}function xe(I,J){J===ln?delete d[I]:d[I]=J,je(),v=v.then(()=>we())}function be(I,J){if(yy.includes(I)){ht(I,J);return}J===ln?delete i[I]:i[I]=J,je(),X()}function Se(){let I=It().orchestration_model,J=$n({global:{orchestration_model:I??void 0},execution_defaults:U(),runner_catalog:ue()}).orchestration_model.value;return J?qn(ue(),J):null}function it(I,J){typeof J=="string"&&J.length>0?i[I]=J:delete i[I]}function ht(I,J){let ge=J===ln?void 0:J,C=Fu({impl_runtime:I==="impl_runtime"?ge:i.impl_runtime,impl_model:I==="impl_model"?ge:i.impl_model,impl_effort:I==="impl_effort"?ge:i.impl_effort},ue(),Se());it("impl_runtime",C.impl_runtime),it("impl_model",C.impl_model),it("impl_effort",C.impl_effort),je(),X()}async function _t(){let I=V();if(!I)return;let J={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},ge=Uu(J,{...J,...W});if(Object.keys(ge).length!==0){try{let C=await Ue("worker-queue-set-orchestration-defaults",{values:ge});if(C&&C.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(C){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}je()}}function wt(I,J){W[I]=J===ln?null:J,je(),_t()}function R(I){if(N=I,!I){je();return}let J=ue(),ge=It(),C=ge.orchestration_model;C&&!Os(J,I).includes(C)&&(W.orchestration_model=null,C=null);let H=ge.orchestration_effort;H&&!Ca(J,I,C||Sn).includes(H)&&(W.orchestration_effort=null),je(),_t()}async function oe(I){if(!(!V()||I<Fi)){try{await Ue("worker-queue-set-slots",{slots:I})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}je()}}async function Ce(I){if(!(!V()||I<Fi||I>wy)){try{await Ue("worker-queue-set-serial-lane-count",{count:I})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}je()}}async function Ne(I,J){let ge=I==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Ue(ge,{on:J})}catch(C){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}je()}function We(){let I={},J=It();for(let ge of Ko){let C=nr.includes(ge)?J[ge]:i[ge];typeof C=="string"&&C.length>0&&(I[ge]=C)}return I}async function Je(){let I=Z();if(!I)return;let J=We();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ge=(I.presets||[]).find(H=>H.id===K),C=le.trim()||(ge?ge.name:"");if(!C){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ge?await ne("impl-preset-update",{expected_revision:I.revision,id:ge.id,name:C,settings:J}):await ne("impl-preset-create",{expected_revision:I.revision,name:C,settings:J});if(H&&H.applied){if(le="",!ge&&Array.isArray(H.presets)){let Ie=H.presets.find(Be=>Be.name===C);K=Ie?Ie.id:K}je()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),je()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function tt(){let I=Z();if(!(!I||K.length===0))try{let J=await ne("impl-preset-delete",{expected_revision:I.revision,id:K});J&&J.applied?(K="",je()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),je())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function bt(I){o=xn(I.values)?{...I.values}:{},i={...o},a=Array.isArray(I.warnings)?I.warnings:[],xn(I.queue)&&(t.onQueueAdopt?.(I.queue),W={})}async function te(){let I=Z(),J=V();if(!I||!J||K.length===0)return;let ge=C=>({preset_id:K,expected_revision:I.revision,expected_queue_revision:C,...ie()});try{let C=await ne("apply-impl-preset-global",ge(J.revision));if(C&&C.applied&&bt(C),r!==null&&C&&C.queue_applied===!1){let H=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:V()?.revision??J.revision;C=await ne("apply-impl-preset-global",ge(H)),C&&C.applied&&bt(C)}C&&C.applied?C.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):C&&C.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(C){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}je()}async function G(){B=!0,D=!1,je();try{let I=await ne("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?D=!0:j=I}catch{D=!0}finally{B=!1,je()}}function he(){if(Y=!Y,Y&&!j){G();return}je()}function ct(){let I=os({loading:B,error:D});if(I)return I;if(!j)return"";let J=Array.isArray(j.variants)?j.variants:[];return c`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(ge=>c`<div class="settings-dialog__sp-variant" data-variant=${ge.key}>
            <div class="settings-dialog__sp-cond">${ge.condition}</div>
            ${ir(ge.label,ge.system_prompt)}
          </div>`)}
    </div>`}function nt(){return c`<section
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
        aria-expanded=${Y?"true":"false"}
        @click=${he}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?ct():""}
    </section>`}function Me(I,J,ge,C,H,Ie,Be){let Ae=H[I]??ln,lt=Ra(I,ge,H,U(),ue(),Be),st=lt.options.find(Xe=>Xe.value===Ae),ye=Ae===ln?lt.full_value:st?.full_value;return c`<select
        class=${Ae===ln?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${J}
        title=${ye||""}
        ?disabled=${Ie===!0||lt.disabled}
        .value=${Ir(String(Ae))}
        @change=${Xe=>C(I,String(Xe.target.value))}
      >
        <option value=${ln} ?selected=${Ae===ln}>
          ${lt.unset_label}
        </option>
        ${lt.options.map(Xe=>c`<option
              value=${Xe.value}
              title=${Xe.full_value||""}
              ?selected=${Xe.value===Ae}
            >
              ${Xe.label}
            </option>`)}
      </select>
      ${Ae===ln?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(I,J,ge,C,H,Ie=!1,Be){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Me(I,J,ge,C,H,Ie,Be)}
      </span>
    </div>`}function dt(I,J){let ge=J?J.active:null;return xn(ge)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?ge.email:as({...ge,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function at(I,J,ge){let C=b[ge],H=Object.hasOwn(d,I)?d[I]:ln,Ie=ge==="claude"?Mi:as,Be=!!C?.accounts.some(Ae=>Ae.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${I}
          @change=${Ae=>xe(I,String(Ae.target.value))}
        >
          <option value=${ln} ?selected=${H.length===0}>
            ${dt(ge,C)}
          </option>
          ${H.length>0&&!Be?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${C?.accounts.map(Ae=>c`<option value=${Ae.key} ?selected=${Ae.key===H}>
                ${Ie(Ae)}
              </option>`)||""}
        </select>
        ${C?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pt(){let I=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function Et(I,J,ge,C,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${Me(ge,`${I} \uBAA8\uB378`,C,be,i,!1)}
        ${Me(H,`${I} effort`,Zo,be,i,!1)}
      </span>
    </div>`}function zt(I,J,ge,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${C?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${C?"true":"false"}
          aria-label=${J}
          @click=${()=>Ne(I,!C)}
        >
          ${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ge}</span>
      </span>
    </div>`}function Ht(I,J,ge,C){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>C(ge-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ge}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>C(ge+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(J=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${J.kind}
          >
            <span class="settings-dialog__preset-diff-label">${J.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${J.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${J.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function It(){let I=V(),J={};for(let ge of nr)J[ge]=Object.prototype.hasOwnProperty.call(W,ge)?W[ge]:I&&typeof I[ge]=="string"?I[ge]:null;return J}function xt(){let I=ue(),J=i.impl_runtime,ge=i.impl_model,C=Z(),H=V(),Ie=It(),Be=Os(I,N),Ae=Jr(I,void 0).filter(ke=>ke!==Sn),lt=Ca(I,N,Ie.orchestration_model||Sn).filter(ke=>ke!==Sn),st=K?(C?.presets||[]).find(ke=>ke.id===K):null,ye=st?ju(We(),xn(st.settings)?st.settings:{}):null,Xe=H&&typeof H.slots=="number"?H.slots:Fi+1,P=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:Fi,F=U()?.supported===!0,ve=pt(),Ge=Ra("workflow_mode",Cs,i,U(),I);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${ve?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ve}
          </div>`:""}
      ${F?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Ir(K)}
                @change=${ke=>{K=String(ke.target.value),je()}}
              >
                <option value="" ?selected=${K===""}>
                  실행 프리셋…
                </option>
                ${(C?.presets||[]).map(ke=>c`<option
                      value=${ke.id}
                      ?selected=${ke.id===K}
                    >
                      ${ke.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ye||ye.rows.length===0}
                @click=${te}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${K?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ir(le)}
                @input=${ke=>{le=String(ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${K?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Je}
              >
                ${K?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${K.length===0}
                @click=${tt}
              >
                삭제
              </button>
            </div>
            ${ye?Lt(ye):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ir(N||ln)}
                    @change=${ke=>{let Ze=String(ke.target.value);R(Ze===ln?null:Ze)}}
                  >
                    <option value=${ln} ?selected=${!N}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${N==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${N==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Fe("orchestration_model","\uBAA8\uB378",Be,wt,Ie)}
              ${Fe("orchestration_effort","effort",lt,wt,Ie)}
              ${Fe("orchestration_speed","\uC18D\uB3C4",Ts,wt,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${at("claude_account","Claude","claude")}
              ${at("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${ln}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>be("workflow_mode",ln)}
                    >
                      ${Ge.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Cs.map(ke=>c`<button
                          type="button"
                          data-mode=${ke}
                          aria-pressed=${String(i.workflow_mode===ke)}
                          @click=${()=>be("workflow_mode",ke)}
                        >
                          ${ke}
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
              ${Et("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Rs,"spec_review_effort")}
              ${Et("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Yo,"plan_review_effort")}
              ${Et("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Rs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Vo,be,i)}
              ${Fe("impl_model","\uBAA8\uB378",Jr(I,J),be,i)}
              ${Fe("impl_effort","effort",es(I,J,ge),be,i)}
              ${Fe("impl_speed","\uC18D\uB3C4",Ts,be,i)}
              ${Fe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ae,be,i,!1,{...i,...Ie})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${zt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${zt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Xe,ke=>oe(ke))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",P,ke=>Ce(ke))}
            </div>
            ${nt()}
          `}
    `}function je(){Q||rt(xt(),e)}return{load(){W={};let I=[me(),Le()];return k||I.push(se()),Promise.all(I).then(()=>{})},render:je,sessionDraft:()=>({...i}),destroy(){Q=!0,rt(c``,e)}}}function Bi(e){return c`<svg
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
  </svg>`}function qp(){return Bi(gs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Fp(){return Bi(gs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function jp(){return Bi(gs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Bp(){return Bi(gs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Up(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Wp(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return an(Uo(t));let n={};for(let a of Yn)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Yn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?tr(n):null}function Hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Sl(e,t){let n=Hn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function ky(e,t){if(!Hn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function $y(e){if(!Hn(e)||!Hn(e.execution_defaults)||!Hn(e.runner_catalog)||!Hn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=$n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=qn(e.runner_catalog,n.orchestration_model.value??""),s=Tr(n,e.runner_catalog),o=_r(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function zp(e,t){let n=t.notify||(T=>ce(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",o.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,m=null,v=new Map;function b(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(se=>Hn(se)):[]}function k(T){return b().find(se=>se.root_dir===T)||null}function N(T){return ky(k(T),v.get(T))}function W(){for(let T of b()){let se=v.get(T.root_dir);se&&typeof se.revision=="number"&&typeof T.revision=="number"&&T.revision>=se.revision&&v.delete(T.root_dir)}}async function K(T,se,$e){let we=t.transport,xe=N(se);if(!(!we||!Hn(xe))){try{let be=await we(T,{...$e,root_dir:se,expected_revision:xe.revision});if(Hn(be?.queue)&&v.set(se,be.queue),be&&be.conflict){let Se=Hn(be.queue)&&typeof be.queue.revision=="number"?be.queue.revision:N(se)?.revision;be=await we(T,{...$e,root_dir:se,expected_revision:Se}),Hn(be?.queue)&&v.set(se,be.queue)}}catch(be){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}X()}}function le(T){u!==T&&(u=T,t.onFocusChange?.(u),X())}function Y(T){le(u===T?null:T)}function B(T){if(d===T){j();return}D(),d=T;let se=k(T);i.textContent=`${se?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=ji(l,{root_dir:T,queue:()=>N(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{v.set(T,$e),X()}}),m.load(),X()}function D(){m?.destroy(),m=null}function j(T){D(),d=null,s.hidden=!0,i.textContent="",T!==!0&&X()}let Q=()=>j();a.addEventListener("click",Q);function V(T){T.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",V);function ue(T,se){let $e=Math.max(se,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(we,xe)=>xe<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function U(T){let se=T.auto_advance===!0,$e=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?Fp():qp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${$e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${$e?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${$e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${jp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Bp()}
      </button>`}function Z(T){let se=$y(T);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function ie(T){let se=[];for(let[$e,we]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let xe=Sl(T,$e);xe>0&&se.push(`${we} ${xe}`)}return se.join(" \xB7 ")}function ne(T){let se=Sl(T,"running"),$e=typeof T.slots=="number"?T.slots:1;return c`<div
      class=${`mon2-deck__tile${u===T.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${T.root_dir}
      aria-pressed=${u===T.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${T.root_dir}>${T.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${$e}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${$e}</span>
          ${ue(se,$e)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${T.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${U(T)}</div>
        <span class="mon2-deck__counts">${ie(T)}</span>
        ${Z(T)}
      </div>
    </div>`}function Ee(T){let se=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",we=Wp(Array.isArray(se)?se:[]),xe=be=>T.reduce((Se,it)=>Se+Sl(it,be),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${xe("running")} · 대기 ${xe("queue")} · PR
        ${xe("pr_wait")}${xe("session_active")>0?` \xB7 \uC138\uC158 ${xe("session_active")}`:""}
        · ${$e} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${we===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof we=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Up($e)}
                  >${we}</span
                >`:we.map(be=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${be.provider}
                      title=${be.tooltip}
                      >${be.label}</span
                    >`)}
          </span>`}
    </div>`}function Ue(){let T=b();return T.length===0?"":c`${Ee(T)}
      <div class="mon2-deck__strip">
        ${T.map(se=>ne(se))}
      </div>`}function me(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function X(){W(),me(),d!==null&&!k(d)&&j(!0),rt(Ue(),r),m?.render()}function Te(T){let se=T.target;if(!se||typeof se.closest!="function")return;let $e=se.closest("[data-root-dir]");if(!$e)return;let we=$e.getAttribute("data-root-dir")||"",xe=se.closest("[data-act]")?.getAttribute("data-act");if(xe==="worker"){t.gotoWorkerTab?.(we);return}if(xe==="auto"){K("worker-automation-toggle",we,{on:N(we)?.auto_advance!==!0});return}if(xe==="merge"){K("worker-merge-auto-toggle",we,{on:N(we)?.auto_merge!==!0});return}if(xe==="gear"){B(we);return}Y(we)}function Le(T){if(T.key!=="Enter"&&T.key!==" ")return;let se=T.target;if(!se||typeof se.closest!="function")return;let $e=se.closest('[data-root-dir][role="button"]');!$e||$e!==se||(T.preventDefault(),Y($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Te),r.addEventListener("keydown",Le),{render:X,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",Te),r.removeEventListener("keydown",Le),a.removeEventListener("click",Q),D(),rt(c``,r),e.replaceChildren()}}}var Hp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",xy=1e4;function Gp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Kp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Xp="bdui.monitor.done-range",Qp="bdui.monitor.running_sort",Jp="bdui.monitor.candidate_sort",ef="beads-ui.monitor.candidate-filter",tf="beads-ui.monitor.sections";function Ay(){try{let e=window.localStorage.getItem(ef);if(!e)return{...rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...rs}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:rs.show_blocked,spec:Wa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...rs}}}function Vp(e){try{window.localStorage.setItem(ef,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Sy(){try{let e=window.localStorage.getItem(Jp);return js.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ey(e){try{window.localStorage.setItem(Jp,e)}catch{}}function Ty(){try{let e=window.localStorage.getItem(tf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Cy(e){try{window.localStorage.setItem(tf,JSON.stringify(e))}catch{}}function Ry(){try{let e=window.localStorage.getItem(Xp);return e===null?"today":Kn(e)}catch{return"today"}}function Oy(e){try{window.localStorage.setItem(Xp,e)}catch{}}function Ly(){try{return window.localStorage.getItem(Qp)==="repo"?"repo":"started"}catch{return"started"}}function Iy(e){try{window.localStorage.setItem(Qp,e)}catch{}}var nf="tab:monitor:pipeline",My=1e3,Yp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Py=["queue","runnable","done"],Zp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Dy(e){return e>=1&&e<=Zp.length?Zp[e-1]:`(${e})`}function rf(e,t){let n=qt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),v=Ry(),b=Ly(),k=Ay(),N=Sy(),W=Ty(),K=qi("beads-ui.monitor.lane-collapsed"),le=!1,Y=null,B=null,D=null,j=null,Q=[],V=null,ue=null,U=null,Z=null;function ie(f){return Z===null&&(Z=Qt()),ku(f,Z)}function ne(f,g){Ee(),!(g<=0)&&(ue={lane_id:f,corrected:g},U=setTimeout(()=>{U=null,ue=null,ye()},xy))}function Ee(){U!==null&&(clearTimeout(U),U=null),ue=null}function Ue(){let f=jr.find(g=>g.value===v);return f?f.label:""}let me=document.createElement("div");me.className="mon",e.appendChild(me);let X=document.createElement("div");X.className="worker-drawer-overlay",X.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let Le=document.createElement("div");Le.className="worker-drawer-host mon2-drawer",X.append(Te,Le),e.appendChild(X);let T=Bs(null,null),se=new Map,$e=new Map,we=null,xe=null,be=null,Se=is(Le,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,X.hidden=!0,ye()}});async function it(f,g,w,$,q=!0){if(!o||!w)return null;let z=await o(f,{...g,root_dir:w,expected_revision:$});if(z&&z.conflict&&q){z.queue&&$e.set(w,z.queue);let re=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$;z=await o(f,{...g,root_dir:w,expected_revision:re})}return z&&z.queue&&w&&$e.set(w,z.queue),z}function ht(f,g){let w=$e.get(f),$=s&&s.get?s.get():null,q=(Array.isArray($)?$:[]).find(re=>re?.root_dir===f);return(w||q)?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action}async function _t(f,g,w,$){let q=await it(f,g,w,$),z=$e.get(w)?.revision??q?.queue?.revision??$;return er(q,(re,Re)=>it(f,{...g,continuation:re,decision_token:Re},w,z,!1),{refresh:re=>it(f,g,w,re?.queue?.revision??$e.get(w)?.revision??z,!1)})}async function wt(f,g,w,$){let q=await er({continuation_mismatch:$},(re,Re)=>it("worker-merge-queue-add",{bead_id:g,continuation:re,decision_token:Re},f,w,!1)),z=q?.queue?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action;q?.applied!==!0&&z?.continuation===null&&z.mismatch&&await wt(f,g,q.queue.revision,z.mismatch)}async function R(f,g,w){let $=await it("worker-discard",f,g,w);if($&&$.discarded===!0){ce(ii($),"success",5e3);return}if($&&$.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function oe(f,g,w){return!o||!w?null:await o(f,{...g,root_dir:w})}async function Ce(){let f=new Map;for(let g of T.pr_wait)f.has(g.root_dir)||f.set(g.root_dir,g.expected_revision);for(let[g,w]of f)await it("worker-merge-queue-add-all",{},g,w)}function Ne(f){let g=W[f];return!!(g&&g.runnable===!0)}function We(f){let g={...W[f]||{}};g.runnable=!g.runnable,W={...W,[f]:g},Cy(W),ye()}function Je(f){K.toggle(f),ye()}function tt(f){K.toggleArea(f),ye()}function bt(f){let g=T.queue_groups.find(w=>w.root_dir===f);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let $=`s${w+1}`,q=g.sublanes.serial.find(z=>z.id===$);if(!q||q.raw_length===0&&q.occupied_by.length===0)return $}return null}function te(f,g){let w=T.queue_groups.find(q=>q.root_dir===f),$=w?w.sublanes.serial.find(q=>q.id===g):void 0;return $?$.raw_length:0}function G(f,g){let w=se.get(f),$=se.get(g);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let q=Gp(w),z=Gp($);if(q!==null&&q===z&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let re=Kp(w),Re=Kp($);if(re&&z!==null){let He=z;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:f,lane:He,index:te($.root_dir,He)}]}}if(q!==null&&Re&&z===null){let He=q;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:te(w.root_dir,He)}]}}if(re&&q===null&&Re&&z===null){let He=bt(w.root_dir);return He===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${He} \uB808\uC778\uC5D0 ${g} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:0},{bead_id:f,lane:He,index:1}]}}return!re&&!Re?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:re?{kind:"note",text:`${ro($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ro(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function he(f,g){let w=G(f,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:Hp,title:w.title}:{kind:"place",label:Hp,title:w.title}}}function ct(f,g){if(!j||j.bead_id!==f)return null;let w=j.counterpart_id,$=g.filter(q=>q.id===w);return $.length===0?null:{rows:$.map(q=>he(f,q))}}function nt(f){let g=f.dependency_chips||null,w=f.overlap_chips||[],$=f.scope_state==="missing",q=f.cross_lane_chip,z=f.armed_lane_chip;if(!g&&w.length===0&&!$&&!q&&!z)return null;let re=ct(f.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...q?{cross_lane:{lane_id:q.lane_id,label:q.label}}:{},...z?{armed_lane:z}:{},...re?{popover:re}:{}}}function Me(f){let g=nt(f);return g?{...f,dependency_chips:g}:f}async function Fe(f,g){let w=G(f,g);if(j=null,w.kind!=="ops"){ye();return}let $=mn(w.root_dir,w.ops[0].bead_id);for(let q of w.ops){let z=await dt(q,w.root_dir,$);if(z===null)break;$=z}ye()}async function dt(f,g,w){try{let $=await it("worker-queue-place",f,g,w,!1);if($&&$.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ce($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let q=$.queue?$.queue.revision:void 0;return typeof q!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):q}catch($){return ce(ot($),"error"),null}}function at(f){let g=Ne(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${f.root_dir}>${f.name}</span>
      <span class="mon2-sec__count">${f.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function pt(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${g}
    </div>`}function Et(f){if(D!==f.id)return null;let g=T.queue_groups.find(z=>z.root_dir===f.root_dir),w=f.place_lanes||[],$=T.cross_lanes_revision!==null,q=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let z of T.chain_lanes)q.push({id:`lane:${z.lane_id}`,label:`\uC5F0\uACB0 ${z.number} (${z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});q.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let z of w)q.push({id:`serial:${z.id}`,label:`\uC9C1\uB82C ${Number(z.id.slice(1))}`,count:z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:q}}function zt(f){return pt(f,c`${Da(Me(f),Et(f),{exec_chips_mode:"pinned_only",onOpenDoc:a?(g,w)=>a(w,f.root_dir):void 0})}`)}function Ht(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(f=>zt(f))}
      </div>`:c`${T.runnable_sections.map(f=>{let g=Ne(f.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${at({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(w=>zt(w))}
            </div>`}
      </section>`})}`}function Lt(f,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${f.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${f.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${f.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function It(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${g}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${jn(Me(f),{actions:Lt(f,!0)})}
    </div>`}function xt(f,g,w,$){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${w}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Dy(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function je(f){let g=T.cross_lanes_revision!==null,w=ie(f.lane_id),$=w?.held===!0,q=w?.cycle===!0,z=w?w.mismatched:[],re=ue&&ue.lane_id===f.lane_id?ue.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${re>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${re}건 자동 교정</span
            >`:""}
        ${q?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${zo}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!g||!f.can_confirm||$}
              title=${$?zo:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!g}
          title=${f.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${f.lane_id}
      >
        ${f.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((Re,He)=>xt(f,Re,He,z))}
      </div>
    </div>`}function I(f,g,w){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.id}
      data-row-index=${w}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${jn(Me(g),{actions:Lt(g)})}
    </div>`}function J(f){if(f.length===0)return"";let g=f.length-1;return`${f[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function ge(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${jn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function C(f,g){let w=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(q=>ge(q)),...g.items.map((q,z)=>I(g,q,z))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${w.map(q=>`${q.id} \u2014 ${q.badge}`).join(`
`)}
              >${J(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(q=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${q.workspace_name}·${q.lane}과 교차 대기
                </div>`)}`}:{}}}function H(){let f=T.cross_lanes_revision!==null,g=T.chain_lanes.some(w=>w.draft&&w.rows.length===0);return pi({parallel:{rows:T.parallel_rows.map((w,$)=>It(w,$)),count:T.parallel_rows.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(w=>w.sublanes.serial.map($=>({...C(w,$),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:K.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(w=>je(w)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!f}
          title=${f?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ie(f){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(g=>Al({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},f,B,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:nt(g)}}))}
    </div>`}function Be(f){let g={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},w=$=>{let q=g[$.lane],z=$.lane==="runnable"?T.runnable_flat?q.length>0?Ht():void 0:T.runnable_sections.length>0?Ht():void 0:$.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?H():void 0:$.lane==="running"?Ie(f):q.length>0?c`${q.map(re=>jn(re))}`:void 0;return Zn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:q,count:q.length,src:$.lane==="runnable",empty:$.empty,body:z,live:$.lane==="running"&&q.length>0,collapsible:!0,collapsed:K.isCollapsed($.pane),controls:$.lane==="runnable"?Ae():void 0,header_control:lt($.lane,q.length)})};if(le){let $=Py.map(q=>Yp.find(z=>z.lane===q)).filter(q=>q!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${fi({live:T.running.length>0,running_body:T.running.length>0?Ie(f):"",pr_wait_rows:T.pr_wait.map(q=>jn(q)),count:T.running.length+T.pr_wait.length})}
            ${$.map(q=>w(q))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Yp.map($=>w($))}
        </div>
      </div>`}function Ae(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wa.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function lt(f,g){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${js.map(w=>c`<option
              value=${w.value}
              ?selected=${N===w.value}
            >
              ${w.label}
            </option>`)}
      </select>`:f==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:f==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${v}
      >
        ${jr.map(w=>c`<option value=${w.value} ?selected=${v===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function st(f){let g=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,q={done_since:$r(v,d()),running_sort:b,candidate_filter:k,candidate_sort:N};return $!==void 0&&(q.cross_lanes=$),Bs(g,w,q)}function ye(){let f=d();T=st(),Z=null,se=new Map;for(let g of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!g.non_occupying&&!se.has(g.id)&&se.set(g.id,g);rt(Be(f),me),P()?.render(),Xe(),F()}function Xe(){let f=new Map;for(let g of T.queue_groups)f.set(g.root_dir,g.auto_advance);for(let g of Array.from(me.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=f.get(w);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function P(){if(be)return be;let f=me.querySelector(".mon2-deck");return f?(be=zp(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Ue,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Ge,onFocusChange:g=>{V=g,F()}}),be):null}function F(){me.classList.toggle("has-focus",V!==null);for(let f of Array.from(me.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V);for(let f of Array.from(me.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=se.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",V!==null&&!!g&&g.root_dir===V)}for(let f of Array.from(me.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V)}function ve(f,g){let w=i?i():void 0;if(!g||!w||g===w||!l){r(f);return}l(g).then(()=>{r(f)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function Ge(f){if(!f)return;let g=i?i():void 0,w=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===f){w();return}l(f).then(w).catch($=>{n("workspace switch for %s failed: %o",f,$),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ke(f){Nn(f).then(g=>{ce(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Ze(f){let g=se.get(f)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function ot(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function mt(f,g,w){if(f!=="dep-add")return;let $=T.chain_lanes.find(q=>q.rows.some(z=>z.id===g));!$||!$.rows.some(q=>q.id===w)||await de(q=>Tu($.lane_id,q),"",[{type:f,a:g,b:w}])}function $t(){let f=new Map,g=s&&s.get?s.get():null,w=$=>Array.isArray($)?$.filter(q=>typeof q=="string"&&q.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let q=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[z,re]of Object.entries(q))Array.isArray(re)&&f.set(z,w(re));for(let z of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&z.blocked_by.length>0&&f.set(z.bead_id,w(z.blocked_by))}return f}function Kt(){let f=new Map,g=new Map,w=s&&s.get?s.get():null,$=q=>Array.isArray(q)?q.filter(z=>typeof z=="string"&&z.length>0):[];for(let q of Array.isArray(w)?w:[]){if(!q||typeof q!="object")continue;let z=q.bead_blocked_by&&typeof q.bead_blocked_by=="object"?q.bead_blocked_by:{};for(let[re,Re]of Object.entries(z))Array.isArray(Re)&&f.set(re,$(Re));for(let re of Array.isArray(q.runnable)?q.runnable:[])re&&typeof re.bead_id=="string"&&Array.isArray(re.blocked_by)&&g.set(re.bead_id,$(re.blocked_by))}for(let q of Q)for(let z of[f,g]){let re=z.get(q.a);re!==void 0&&z.set(q.a,q.type==="dep-remove"?re.filter(Re=>Re!==q.b):re.includes(q.b)?re:[...re,q.b])}return{snapshot:f,runnable:g}}function Tt(){let f=$t();for(let g of Q){let w=(f.get(g.a)||[]).slice();g.type==="dep-remove"?f.set(g.a,w.filter($=>$!==g.b)):w.includes(g.b)||f.set(g.a,[...w,g.b])}return f}function Qt(f=T,g=Pe()){let w=new Map;for(let et of Array.isArray(g?.lanes)?g.lanes:[]){let De=new Map;for(let y of Array.isArray(et?.entries)?et.entries:[])y&&typeof y.bead_id=="string"&&De.set(y.bead_id,y.dep_created_by_lane===!0);w.set(typeof et?.id=="string"?et.id:"",De)}let $=new Map,q=new Map,z=new Set,re=new Set;for(let et of f.chain_lanes){let De=w.get(et.lane_id);$.set(et.lane_id,{status:et.status,entries:et.rows.map((y,E)=>({bead_id:y.id,root_dir:y.root_dir,...E===0?{}:{dep_created_by_lane:De?.get(y.id)===!0}}))});for(let y of et.rows)q.set(y.id,et.lane_id),y.fixed&&z.add(y.id),y.unplaced||re.add(y.id)}let Re=new Map;for(let et of f.parallel_rows)typeof et.queue_index=="number"&&Re.set(et.id,et.queue_index);for(let et of f.queue_groups)for(let De of et.sublanes.serial)for(let y of De.items)typeof y.queue_index=="number"&&Re.set(y.id,y.queue_index);let He=Kt();return{blocked_by_map:Tt(),snapshot_blocked_by:He.snapshot,runnable_blocked_by:He.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:$,owner_lane_of:q,fixed_members:z,placed_members:re,parallel_rows:f.parallel_rows.map(et=>({bead_id:et.id,root_dir:et.root_dir,queue_index:et.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:Re}}function Pe(){return(s&&s.crossLanes?s.crossLanes():null)??null}function mn(f,g){let w=se.get(g);if(w&&w.root_dir===f)return w.expected_revision;let $=T.queue_groups.find(q=>q.root_dir===f);return $?$.revision:0}async function Jt(f,g,w){if(f.type==="worker-queue-disarm"){try{let $=await it(f.type,f.payload,f.root_dir,w.get(f.root_dir)??mn(f.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&w.set(f.root_dir,$.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await Ft(f.type,f.payload,f.root_dir,w,{bead_id:g})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await oe(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch($){return ce(ot($),"error"),!1}}async function Ft(f,g,w,$,q){try{let z=await it(f,g,w,$.get(w)??mn(w,q.bead_id));return!z||typeof z.applied!="boolean"?(ce("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(z.queue&&typeof z.queue.revision=="number"&&$.set(w,z.queue.revision),z.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):z.applied===!1?(ce(z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$.get(w)??0)}catch(z){return ce(ot(z),"error"),null}}function Xt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(Q=[...Q,{type:f.type,a:f.a,b:f.b}])}async function gn(f,g){if(!o)return{ok:!1};try{let w=await o(f.type,{...f.payload,expected_revision:g});return!w||typeof w.revision!="number"?(ce("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,q=$&&$.code==="conflict"?$.details?.cross_lanes:null;return q&&typeof q.revision=="number"&&Array.isArray(q.lanes)?{ok:!1,conflict:q}:(ce(ot(w),"error"),{ok:!1})}}async function fe(f,g,w){let $=new Map,q=[],z=f.ops.slice(0,f.lane_op_index),re=f.ops.slice(f.lane_op_index);for(let He of z){if(!await Jt(He,w,$))return{done:!0};Xt(He)}let Re=g;for(let He of f.lane_ops){if(Re===null)return ce("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let et=await gn(He,Re);if(!et.ok)return et.conflict?{done:!1,conflict:et.conflict}:{done:!0};Re=et.revision}for(let He of re){if(!await Jt(He,w,$))return{done:!0};Xt(He),He.type==="dep-add"&&q.push(He)}for(let He of Ou(q))Re=await S(He,Re);return{done:!0}}async function S(f,g){if(g===null||!o)return g;let w=f.pairs,$=g;for(let q=0;q<2;q+=1){if(w.length===0)return $;try{let z=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:w.map(re=>({bead_id:re.bead_id,after:re.after,value:!0})),expected_revision:$});return z&&typeof z.revision=="number"?z.revision:$}catch(z){let re=z,Re=re&&re.code==="conflict"?re.details?.cross_lanes:null;if(!Re||typeof Re.revision!="number"||!Array.isArray(Re.lanes))return $;let He=Re.lanes.find(et=>et&&et.id===f.lane_id);w=Lu(Array.isArray(He?.entries)?He.entries:[],w),$=Re.revision}}return $}async function de(f,g,w=[]){Q=w,Ee();let $=T,q=Pe();for(let z=0;;z+=1){let re=f(Qt($,q));if("refused"in re){ce(re.refused,"error");break}let Re=await fe(re,$.cross_lanes_revision,g);if(Re.done){re.correction&&ne(re.correction.lane_id,re.correction.corrected);break}if(z>=1){ce("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=st(Re.conflict),q=Re.conflict}Q=[],ye()}async function Oe(f,g){await de(w=>Aa(f,g,w),f.bead_id)}async function yt(f,g){if(f==="run"){await At(g);return}if(f==="stop"){await jt(g);return}if(f==="create"){await de(w=>Sa(null,w),"");return}if(f==="remove"){let w=Ru(g,Qt());if(w!==null&&!m(w))return;await de($=>Cu(g,$),"");return}await de(w=>f==="confirm"?Su(g,w):Eu(g,w),"")}function Rt(f){let g=new Map;for(let w of f.rows){let $=T.owner_of[w.id]||w.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],w.id])}return g}async function At(f){let g=T.chain_lanes.find(z=>z.lane_id===f);if(!g||T.cross_lanes_revision===null){ye();return}Ee();let w=new Map,$=new Map,q=Rt(g);for(let z of g.rows){if(!z.unplaced)continue;let re=T.owner_of[z.id]||z.root_dir;if(typeof re!="string"||re.length===0){ce(`${z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),ye();return}let Re=$.get(re)??0;if(await Ft("worker-queue-place",{bead_id:z.id,lane:"parallel",index:(T.parallel_raw_length[re]??0)+Re},re,w,{bead_id:z.id})===null){ye();return}$.set(re,Re+1)}for(let[z,re]of q)if(await Ft("worker-queue-arm",{bead_ids:re,lane_id:f},z,w,{bead_id:re[0]})===null){ce("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),ye();return}ye()}async function jt(f){let g=T.chain_lanes.find($=>$.lane_id===f);if(!g||T.cross_lanes_revision===null){ye();return}Ee();let w=new Map;for(let[$,q]of Rt(g))if(await Ft("worker-queue-disarm",{lane_id:f},$,w,{bead_id:q[0]})===null)break;ye()}async function nn(f,g){let{root_dir:w,revision:$}=Ze(f);if(w.length===0){ye();return}await Ft("worker-queue-disarm",{bead_ids:[f],lane_id:g},w,new Map([[w,$]]),{bead_id:f}),ye()}async function rn(f,g){let w=se.get(f);if(!w){ye();return}let $={kind:"candidate",bead_id:f,root_dir:w.root_dir};if(g==="new-lane"){await de(q=>Sa({bead_id:f,root_dir:w.root_dir},q),f);return}if(g.startsWith("lane:")){let q=g.slice(5);if(!T.chain_lanes.find(re=>re.lane_id===q)){ye();return}await de(re=>Aa($,{kind:"chain",lane_id:q,marker_index:(re.cross_lanes.get(q)?.entries??[]).length},re),f);return}if(g.startsWith("serial:")){let q=g.slice(7),z=(w.place_lanes||[]).find(re=>re.id===q);await Oe($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:q,index:z?z.index:0});return}await Oe($,{kind:"parallel",marker_index:T.parallel_rows.length})}async function En(f,g){let w=T.parallel_rows,$=w.findIndex(et=>et.id===f);if($<0)return;let q=w[$].root_dir,z=[];w.forEach((et,De)=>{et.root_dir===q&&z.push(De)});let re=z.indexOf($),Re=z[re+g];if(typeof Re!="number")return;let He=g===-1?Re:z[re+2]??Math.min(w.length,Re+1);await Oe({kind:"parallel",bead_id:f,root_dir:q,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:He})}async function Mt(f){for(let g of T.chain_lanes){let w=g.rows.find($=>$.id===f);if(w){await Oe({kind:"chain",bead_id:f,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}let sn=null,cn=!1,un=null;function Gn(){un!==null&&clearTimeout(un),un=setTimeout(()=>{un=null,cn=!1},0)}function x(f,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&f.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return f.querySelectorAll("[data-row-index]").length}function O(f){let g=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:T.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function p(f){let g=f.target;if(!sn)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return O(g);let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:x(w,g)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:x(w,g)}};if($==="repo-serial"){let q=w.getAttribute("data-root-dir")||"";if(q!==sn.root_dir)return null;let z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,re=z&&w.contains(z)?z.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Re=Number(re);return{zone:w,target:{kind:"repo-serial",root_dir:q,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Re)?Re:0}}}return null}function h(){for(let f of Array.from(me.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let L=null;function ee(f){L=f.target instanceof Element?f.target:null}function pe(f){let g=f.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;if(w&&L&&w.contains(L)&&typeof L.closest=="function"&&L.closest("input, button, a")){f.preventDefault();return}let q=$.getAttribute("data-bead-id")||"",z=$.getAttribute("data-drag-kind")||"",re=$.getAttribute("data-root-dir")||"";if(!q||!z||!re)return;let Re=$.getAttribute("data-queue-index")||"",He=Number(Re),et=$.getAttribute("data-lane-id")||"";sn={kind:z,bead_id:q,root_dir:re,...Re!==""&&Number.isFinite(He)?{queue_index:He}:{},...et?{lane_id:et}:{}},cn=!0,D=null,me.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",q),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function ut(f){let g=p(f);g&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function Qe(f){let g=f.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Bt(){sn=null,h(),me.classList.remove("is-dragging"),Gn()}function Gt(f){let g=p(f),w=sn;sn=null,h(),me.classList.remove("is-dragging"),!(!g||!w)&&(f.preventDefault(),Oe(w,g.target))}function en(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Tn(f,g){let{item:w,root_dir:$,revision:q}=Ze(g),z=w?.attempt_id||"",re=f.classList;if(re.contains("worker-mini__rowops-up")||re.contains("worker-mini__rowops-down")){En(g,re.contains("worker-mini__rowops-up")?-1:1);return}if(re.contains("worker-mini__rowops-remove")){it("worker-queue-remove",{bead_id:g},$,q);return}if(re.contains("mon2-crow__detach")){Mt(g);return}if(re.contains("worker-dep__open")){ve(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(re.contains("mon2-arm__release")){nn(g,f.getAttribute("data-lane-id")||"");return}if(re.contains("mon-lane__chip")){let Re=f.getAttribute("data-lane-id")||"";me.querySelector(`.mon2-clane[data-lane-id="${Re}"]`)?.scrollIntoView({block:"nearest"});return}if(re.contains("mon-overlap__chip")){let Re=f.getAttribute("data-overlap-id")||"";j=!!j&&j.bead_id===g&&j.counterpart_id===Re?null:{bead_id:g,counterpart_id:Re},ye();return}if(re.contains("mon-overlap__place")){Fe(g,f.getAttribute("data-counterpart-id")||"");return}if(re.contains("worker-card__place")){D=D===g?null:g,ye();return}if(re.contains("worker-card__place-cancel")){D=null,ye();return}if(re.contains("worker-card__place-lane")){let Re=f.getAttribute("data-lane")||"parallel";D=null,rn(g,Re);return}if(re.contains("rtile__session")){if(w&&w.kind==="session"){let Re=(w.session_refs||[]).find(He=>He&&He.current===!0);Re&&(X.hidden=!1,Se.open(Yr(Re,g,"in_progress",$)),ye());return}B=z,z&&w&&(X.hidden=!1,Se.open({attempt_id:z,root_dir:$,meta:en(w)})),ye();return}if(re.contains("rtile__pause")){oe("worker-attempt-pause",{attempt_id:z},$);return}if(re.contains("rtile__resume")){Vr().then(Re=>{if(Re!==null)return _t("worker-attempt-resume",{attempt_id:z,...Re!==""?{instructions:Re}:{}},$,q)});return}if(re.contains("rtile__dismiss")){it("worker-attempt-dismiss",{attempt_id:z},$,q);return}if(re.contains("rtile__discard")){if(!m(Ps(g,"unmerged")))return;R({bead_id:g,...z?{attempt_id:z}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,q);return}if(re.contains("worker-mini__merge")){let Re=ht($,g);Re?.mismatch&&Re.continuation===null?wt($,g,q,Re.mismatch):it("worker-merge-queue-add",{bead_id:g},$,q);return}if(re.contains("worker-mini__merge-cancel")){it("worker-merge-queue-remove",{bead_id:g},$,q);return}if(re.contains("worker-mini__discard")){let Re=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ps(g,Re)))return;R({bead_id:g,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,q);return}if(re.contains("worker-mini__revise-fix")){_t("worker-revise-fix",{bead_id:g},$,q);return}re.contains("worker-mini__revise-approve")&&it("worker-revise-approve",{bead_id:g},$,q)}function bn(f){let g=cn;cn=!1;let w=f.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){f.preventDefault();let _e=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";_e&&ke(_e);return}let q=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(q){f.preventDefault();let A=q.getAttribute("data-root-dir")||se.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||q.getAttribute("title")||"";Ge(A);return}let z=w.closest(".mon2-sec__toggle");if(z){f.preventDefault(),We(z.getAttribute("data-root-dir")||"");return}let re=w.closest(".worker-pane__toggle[data-lane]");if(re){f.preventDefault();let A=re.getAttribute("data-lane")||"";(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&Je(A);return}let Re=w.closest(".worker-wait__area-toggle[data-area]");if(Re){f.preventDefault(),tt(Re.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){f.preventDefault(),yt("create","");return}let He=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(He){f.preventDefault();let A=He.getAttribute("data-lane-id")||"",_e=He.classList;yt(_e.contains("mon2-clane__confirm")?"confirm":_e.contains("mon2-clane__reapply")?"reapply":_e.contains("mon2-clane__run")?"run":_e.contains("mon2-clane__stop")?"stop":"remove",A);return}if(w.closest(".mon-merge-all")){f.preventDefault(),Ce();return}let et=w.closest(".mon-filter__spec");if(et){f.preventDefault(),k={...k,spec:et.getAttribute("data-spec")||"all"},Vp(k),ye();return}let De=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!De)return;let y=De.getAttribute("data-bead-id")||"",E=w.closest("button");if(E){f.preventDefault(),Tn(E,y);return}y&&!g&&(f.preventDefault(),ve(y,De.getAttribute("data-root-dir")||Ze(y).root_dir))}function Vt(f){let g=f.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){k={...k,show_blocked:w.checked},Vp(k),ye();return}let $=g.closest(".mon-candidate-sort");if($){N=js.some(re=>re.value===$.value)?$.value:"repo_spec",Ey(N),ye();return}let q=g.closest(".mon-running-sort");if(q){b=q.value==="repo"?"repo":"started",Iy(b),ye();return}let z=g.closest(".mon-done-range");z&&(v=Kn(z.value),Oy(v),ye())}function hn(f){let g=f.target,w=g&&typeof g.closest=="function"?q=>g.closest(q):()=>null,$=!1;j&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(j=null,$=!0),$&&ye()}function Ln(f){f.key!=="Escape"||!j||(j=null,ye())}e.addEventListener("click",bn),e.addEventListener("change",Vt),e.addEventListener("pointerdown",ee),document.addEventListener("click",hn),document.addEventListener("keydown",Ln),e.addEventListener("dragstart",pe),e.addEventListener("dragover",ut),e.addEventListener("dragleave",Qe),e.addEventListener("drop",Gt),e.addEventListener("dragend",Bt);{let f=!0;Y=Ni(g=>{if(le=g,f){f=!1;return}ye()})}s&&typeof s.subscribe=="function"&&(we=s.subscribe(()=>{try{$e.clear(),ye()}catch{}}));function In(){xe!==null&&(clearInterval(xe),xe=null)}function ar(){un!==null&&(clearTimeout(un),un=null)}return{recorrectSharedLane:mt,load(){n("load"),ye(),xe===null&&(xe=setInterval(()=>{try{ye()}catch{}},My))},pause(){In()},clear(){In(),ar(),we&&(we(),we=null),Y&&(Y(),Y=null),Se.destroy(),X.hidden=!0,be?.destroy(),be=null,e.removeEventListener("click",bn),e.removeEventListener("change",Vt),e.removeEventListener("pointerdown",ee),document.removeEventListener("click",hn),document.removeEventListener("keydown",Ln),e.removeEventListener("dragstart",pe),e.removeEventListener("dragover",ut),e.removeEventListener("dragleave",Qe),e.removeEventListener("drop",Gt),e.removeEventListener("dragend",Bt),e.replaceChildren()}}}function sf(e,t,n){let r=qt("views:nav"),{global_element:s,repo_element:o}=e,i=null;function a(v){return b=>{b.preventDefault();let k=v==="monitor"&&l()==="monitor"?"worker":v;r("click tab %s",k),n.gotoView(k)}}function l(){let v=t.getState();return v.view==="worker"||v.view==="monitor"?v.view:"board"}function u(){let v=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${v==="monitor"?"is-active":""}"
        @click=${a("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let v=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${v==="board"?"is-active":""}"
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${v==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function m(){s&&rt(u(),s),o&&rt(d(),o)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),s&&rt(c``,s),o&&rt(c``,o)}}}var of=["bug","feature","task","epic","chore"];function af(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lf=["Critical","High","Medium","Low","Backlog"];function cf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),v=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let j of of){let Q=document.createElement("option");Q.value=j,Q.textContent=af(j),o.appendChild(Q)}i.replaceChildren();for(let j=0;j<=4;j+=1){let Q=document.createElement("option");Q.value=String(j);let V=lf[j]||"Medium";Q.textContent=`${j} \u2013 ${V}`,i.appendChild(Q)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,i.disabled=D,a.disabled=D,l.disabled=D,d.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function W(){u.textContent=""}function K(D){u.textContent=D}function le(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?i.value=j:i.value="2"}catch{o.value="",i.value="2"}}function Y(){let D=o.value||"",j=i.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function B(){W();let D=String(s.value||"").trim();if(D.length===0){K("Title is required"),s.focus();return}let j=Number(i.value||"2");if(!(j>=0&&j<=4)){K("Priority must be 0..4"),i.focus();return}let Q=String(o.value||""),V=String(l.value||""),ue={title:D};Q.length>0&&(ue.type=Q),String(j).length>0&&(ue.priority=j),V.length>0&&(ue.description=V),N(!0);try{await t("create-issue",ue)}catch{N(!1),K("Failed to create issue");return}Y(),N(!1),k()}return n.addEventListener("cancel",D=>{D.preventDefault(),k()}),v.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),B())}),r.addEventListener("submit",D=>{D.preventDefault(),B()}),{open(){r.reset(),W(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Ny=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function qy(e,t){return fa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=qy(r,e);return c`<button
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
  `}function df(e,t,n){return c`
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
  `}function pf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Ny.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Fy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function ff(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ne=>ce(ne,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,u="",d=null;function m(){if(d)return d;let ne=i.querySelector('[data-pane="execution"]');return ne?(d=ji(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function v(){return c`
      <section
        class=${`settings-dialog__pane${a==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function b(){let ne=r.get();return c`
      <section
        class=${`settings-dialog__pane${a==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${ne?c`
              ${uf(ne,s(),K)}
              ${df(ne,u,{onDraft:Ee=>{u=Ee},onAdd:le,onRemove:Y})}
              ${pf(ne,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ne){let Ee=r.get();if(Ee)try{let Ue=await n("display-policy-set",{expected_revision:Ee.revision,policy:ne(Ee)});N(Ue),Ue&&Ue.conflict&&Ue.policy&&(Ue=await n("display-policy-set",{expected_revision:Ue.policy.revision,policy:ne(Ue.policy)}),N(Ue)),Ue&&Ue.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function W(ne){k(ne)}function K(ne){let Ee=r.get();if(!Ee)return;let Ue=!jy(ne,Ee);W(me=>By(ne,me,Ue))}function le(){let ne=u.trim();ne.length!==0&&(u="",W(Ee=>Ee.hidden_prefixes.includes(ne)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,ne]}),D())}function Y(ne){W(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(Ue=>Ue!==ne)}))}function B(ne){let Ee=r.get();if(!Ee)return;let Ue=Ee.chips[ne]===!1;W(()=>({chips:{[ne]:Ue}}))}function D(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Fy.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(a===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>j(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ie}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${v()} ${b()}
          </div>
        </div>
      `,i),m()}function j(ne){a=ne,D()}let Q=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",Q),i.addEventListener("cancel",Q);let V=ne=>{ne.target===i&&ie()};i.addEventListener("click",V);let ue=null;r.subscribe&&(ue=r.subscribe(()=>{l&&D()}));let U=null;t.implPresetStore?.subscribe&&(U=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function Z(ne="execution"){l||(l=!0,t.onOpenChange?.(!0),a=ne,u="",D(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function ie(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Z,close:ie,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",Q),i.removeEventListener("cancel",Q),i.removeEventListener("click",V),ue&&(ue(),ue=null),U&&(U(),U=null),d?.destroy(),d=null,i.remove()}}}function jy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function By(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Uy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_f="usage-meter-card",Wy="usage-meter-layer",El=600,zy=["token_expired","relogin_required"];function mf(e){return String(e).padStart(2,"0")}function Hy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function gf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${mf(r.getHours())}:${mf(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Uy[r.getMonth()]} ${r.getDate()} ${o}`;return`${Hy(n,t)} \xB7 ${a}`}function Gy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ky(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Vy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=Ky(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?wf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Yy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Vy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function kf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Zy(e,t){return!e.held||kf(e,t)<=El?e:{...e,available:!1,windows:[],accounts:[]}}function vf(e,t){return`${e}:${t}`}function $f(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,a=0,l=null;function u(){rt(c``,e),e.hidden=!0,m()}function d(){if(l===null){let me=e.ownerDocument;l=me.createElement("div"),l.id=Wy,l.className="usage-meter__layer",me.body.appendChild(l)}return l}function m(){l!==null&&(rt(c``,l),l.remove(),l=null)}function v(me){n!==me&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",W),window.addEventListener("resize",N)),n=me)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",W),window.removeEventListener("resize",N))}function k(me){let X=me.target;X&&(e.contains(X)||l!==null&&l.contains(X))||(b(),ie())}function N(){ie()}function W(me){me.key==="Escape"&&(b(),ie())}function K(me){n===me?b():v(me),ie()}function le(){b(),ie()}async function Y(me,X){if(r.has(me.key))return;let Te=vf(me.key,X);r.set(me.key,X),i.delete(Te),ie();let Le=null;try{Le=await(await fetch(me.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{Le=null}if(t)return;if(r.delete(me.key),!Le||Le.ok!==!0){let se=Le&&typeof Le.error=="string"&&Le.error.length>0?Le.error:"network_error";i.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),ie();return}let T=Array.isArray(Le.warnings)?Le.warnings.filter(se=>typeof se=="string"&&se.length>0):[];T.length>0&&i.set(Te,{kind:"warn",text:T.join(" \xB7 ")}),ie(),await Ue()}function B(me,X,Te,Le){let T=hf(me.pct),$e=`resets ${gf(me.resetsAt,Le)}${X?` \xB7 ${Te}`:""}`;return c`<span
      class="usage-meter__window ${bf(T)}"
      style=${`--progress: ${T}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${me.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function D(me,X,Te){let Le=kf(X,Te),T=X.available&&(X.held||Le>El),se=T?`${Math.floor(Le/60)}\uBD84 \uC804 \uCE21\uC815`:"",$e=X.accounts.filter(Se=>!Se.active).length,we=`usage-meter__group${T?" usage-meter__group--stale":""}`,xe=c`<span class="usage-meter__provider"
        >${me.label}</span
      >
      ${X.available?X.windows.map(Se=>B(Se,T,se,Te)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${$e>0?c`<span class="usage-meter__badge">+${$e}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${we}
        aria-label=${`${me.label} usage`}
        >${xe}</span
      >`;let be=n===me.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${we}`}
      aria-label=${`${me.label} usage`}
      aria-expanded=${be?"true":"false"}
      aria-controls=${_f}
      @click=${()=>K(me.key)}
    >
      ${xe}
    </button>`}function j(me,X){return c`<span class="usage-meter" aria-label="Usage">
      ${me.map(Te=>D(Te.provider,Te.snapshot,X))}
    </span>`}function Q(me,X){let Te=hf(me.pct),Le=gf(me.resetsAt,X);return c`<span
      class="usage-meter__account-window ${bf(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${me.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${Le.length>0?`\u21BB ${Le}`:""}</span
      >
    </span>`}function V(me,X){return zy.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${me.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ue(me,X,Te){let Le=X.status==="ok",T=typeof X.ageSeconds=="number"&&X.ageSeconds>El,se=i.get(vf(me.key,X.number)),$e=r.get(me.key),we=$e!==void 0,xe=$e===X.number,be=["usage-meter__account"];return X.active&&be.push("usage-meter__account--active"),Le||be.push("usage-meter__account--unavailable"),T&&be.push("usage-meter__account--stale"),c`<div class=${be.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${X.email}
          >${X.alias===null?X.email:X.alias}</span
        >
        ${X.plan===null?"":c`<span class="usage-meter__account-tag">${X.plan}</span>`}
        ${X.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${X.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Gy(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${we}
              @click=${()=>{Y(me,X.number)}}
            >
              ${xe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Le?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Se=>Q(Se,Te))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(me,X.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function U(me,X,Te){let Le=X.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${me.label} · 활성 ${Le} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(T=>ue(me,T,Te))}
    </section>`}function Z(me,X){return c`<div
      class="usage-meter__card"
      id=${_f}
      role="dialog"
      aria-label=${`${me.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${U(me.provider,me.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ie(){let me=Date.now(),X=[];for(let Le of yf){let T=o.get(Le.key);T&&X.push({provider:Le,snapshot:Zy(T,me)})}if(X.length===0){b(),u();return}let Te=X.find(Le=>Le.provider.key===n&&Le.snapshot.accounts.length>0);Te||b(),rt(j(X,me),e),e.hidden=!1,Te?ne(Te,me):m()}function ne(me,X){let Te=d(),Le=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${Le.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Le.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${Z(me,X)}`,Te)}async function Ee(me){try{let X=await fetch(me.endpoint);return X.ok?Yy(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ue(){a+=1;let me=a,X=await Promise.all(yf.map(async Te=>({provider:Te,read:await Ee(Te)})));if(!(t||me!==a)){for(let Te of X){let Le=Te.provider.key;if(Te.read.kind==="ok"){o.set(Le,Te.read.snapshot);continue}if(Te.read.kind==="empty"){o.delete(Le);continue}let T=o.get(Le);T!==void 0&&!T.held&&o.set(Le,{...T,held:!0})}ie()}}return u(),Ue(),s=setInterval(()=>{Ue()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function xf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),a=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!a&&typeof s.dismissed_at!="number"}}var Xy="worker-ineligible";function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Af(e){return so(e).includes(Xy)}var Qy="session-preferred",Jy=["exclusive_machine","iterative_user_judgment","visual_verification"];function Sf(e,t){if(!so(e).includes(Qy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Jy.includes(n)?n:""}var ev="worker-serial";function Tl(e){return so(e).includes(ev)}var Ef=new Set(["sh","bash","zsh","dash","ksh"]),Tf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Cf(e){let t=e.split("/");return t[t.length-1]||""}function tv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Cf(n[0]);if(r!=="env")return Ef.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Ef.has(Cf(s))}function nv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function rv(e){let t=[],n=0;Tf.lastIndex=0;for(let r of e.matchAll(Tf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:nv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Rf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",a="",l=0,u=null,d=!1;function m(D,j){return j?rv(D).map(Q=>Q.kind==="plain"?Q.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${Q.kind}"
            >${Q.text}</span
          >`):D}function v(){if(!s)return c``;let D=o==="ready"&&tv(i),j=o==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Y()}
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
              ?disabled=${o!=="ready"}
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Y()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${a}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${j.map((Q,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(Q,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){rt(v(),r)}async function k(){if(o!=="ready")return;let D=await Nn(i);ce(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),Y())}function W(){d||(document.addEventListener("keydown",N),d=!0)}function K(){d&&(document.removeEventListener("keydown",N),d=!1)}async function le(D,j=null){let Q=++l;W(),s={...D},u=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ue=t?t():"";if(!ue){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let U="/api/repo-ops-script?workspace="+encodeURIComponent(ue)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let Z=await n(U),ie=await Z.json().catch(()=>({}));if(Q!==l)return;if((t?t():"")!==ue){Y();return}if(!Z.ok||!ie||ie.ok!==!0){o="error",a=sv(ie&&typeof ie.error=="string"?ie.error:""),b();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},i=String(ie.content),o="ready",b()}catch{if(Q!==l)return;o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Y(){l+=1,K(),s=null,i="",b();let D=u;u=null,D?.isConnected&&D.focus()}function B(){Y(),r.remove()}return{open:le,close:Y,destroy:B}}var Of={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},ov=new Set(["queued","running","retry_pending"]);function Lf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let U=o();return typeof U.revision=="number"?U.revision:0}function a(U){t&&U&&U.queue&&typeof U.queue=="object"&&t.set(U.queue)}function l(){let U=o().workspace_info;return U&&typeof U=="object"?U:{}}function u(U,Z){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${U}"
      >${Z}</span
    >`}function d(U){if(typeof U!="number"||!Number.isFinite(U))return"";let Z=U/6e4;return Number.isInteger(Z)?`timeout ${Z}\uBD84`:`timeout ${Math.round(U/1e3)}\uCD08`}function m(U){let Z=d(U);return Z?u("config",Z):""}function v(U,Z,ie){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ie.script}
      @click=${ne=>{s&&s({lane:U,base_sha:Z.base_sha,path:ie.script,base_ref:Z.base_ref},ne.currentTarget)}}
    ></button>`}function b(){let U=o().repo_operations;return Array.isArray(U)?U:[]}function k(){let U=l().repo_ops,Z=U&&typeof U=="object"?U.repo_id:null;return typeof Z=="string"&&Z?Z:null}function N(){return b().some(U=>U&&U.kind==="deploy"&&ov.has(U.state))}function W(){let U=N(),Z=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${U||Z}
      title=${U?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Z?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{j()}}
    >
      배포 실행
    </button>`}function K(){let U=o().repo_ops_opt_out;return{verify:U?.verify===!0,deploy:U?.deploy===!0}}function le(U,Z){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Z}
        @change=${ie=>{D(U,!ie.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function Y(U){let Z=typeof U.base_sha=="string"?U.base_sha:"",ie=`${U.source_path||"repo-ops/config.toml"} @ ${U.base_ref||"?"}${Z?`@${Z.slice(0,7)}`:""}`,ne=K(),Ee=!!U.verify&&ne.verify,Ue=!!U.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ie}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${U.verify?c`${v("verify",U,U.verify)}
              ${m(U.verify.timeout_ms)}
              ${Ee?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":U.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${U.verify?le("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ue?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${U.deploy?c`${v("deploy",U,U.deploy)}
              ${m(U.deploy.timeout_ms)}
              ${Ue?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):W()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ue?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":U.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${U.deploy?le("deploy",ne.deploy):""}
      </div>
    </section>`}function B(U){let Z=U.repo_ops&&typeof U.repo_ops=="object"?U.repo_ops:null;return Z&&(Z.status==="resolved"||Z.status==="absent")?Y(Z):Z&&(Z.status==="pending"||Z.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Z.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${Z.error_code?c` — <code>${Z.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function D(U,Z){if(!n)return;let ie=await n("worker-repo-ops-opt-out-toggle",{kind:U,opted_out:Z,expected_revision:i()});if(a(ie),ie&&ie.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:U,opted_out:Z,expected_revision:i()});a(ne)}r()}async function j(){let U=k();if(!n||U===null)return;let Z=await n("worker-repo-operation-deploy-run",{repo_id:U});if(a(Z),!Z||Z.ok!==!0){let ie=Z&&typeof Z.reason=="string"?Z.reason:"",ne=Object.hasOwn(Of,ie)?Of[ie]:ie||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ce(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else ce("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let Q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(U,Z,ie){return c`<div class="worker-repo-ops__policy-group" data-policy=${ie}>
      <div class="worker-repo-ops__policy-label">${U}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Z.map(ne=>c`<li data-token=${ne}>
              ${Q[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function ue(){let U=o(),Z=U.repo_operation_policy&&typeof U.repo_operation_policy=="object"?U.repo_operation_policy:null;return Z?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Z.worker_automatic||[]).length} · 금지
            ${(Z.never_automatic||[]).length}</span
          >
        </summary>
        ${Z.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Z.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Z.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Z.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${B(l())} ${ue()}
      </details>`}}}var Pf=20,iv=5,av=new Set(["failed","running","queued","retry_pending"]),If={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function lv(e,t,n=Pf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function cv(e){if(e.type==="cleanup")return!0;let t=e.operation;return av.has(t.state)&&!t.dismissed&&!t.superseded_by}function uv(e,t,n={}){let r=lv(e,t,1/0),s=n.expanded===!0?Pf:iv,o=new Set(r.slice(0,s)),i=r.filter(a=>o.has(a)||cv(a));return{visible:i,hidden:r.length-i.length}}function Mf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function dv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Df(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Nf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function pv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function fv(e,t){let n=Ip(e,t),r=Mp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function _v(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function mv(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${oi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Mf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(If,n.kind)?If[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${ni(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Cr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Mf(e)}"
          >${dv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Nf(Lp(n.failure_kind,s)):""}
      ${fv(n,pv(t,n))}
      ${_v(n)}
      ${Df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ni(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||""},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function gv(e){let t=e.cleanup,n=Rr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${oi(e.at)||"\u2014"}</span
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
        ${ad(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Nf(ls(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function bv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?gv(r):mv(r,e.repo_ops))}
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
  </section>`}function qf(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=uv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(bv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){o();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var hv=qt("views:worker"),yv="tab:worker:ready",vv="tab:worker:blocked",wv="tab:worker:in-progress",kv="tab:worker:resolved",$v="tab:worker:closed",Ui=1,Ff=5;function jf(e){return eo(e).evidence==="published"}var xv=new Set(["quick_fix","spec_backed","full_plan"]);function Bf(e){return typeof e=="string"&&xv.has(e)}var Hf="beads-ui.worker.candidate-filter",Cl={show_blocked:!1,spec:"all"};function Av(){try{let e=window.localStorage.getItem(Hf);if(!e)return{...Cl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Cl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Cl}}}function Sv(e){try{window.localStorage.setItem(Hf,JSON.stringify(e))}catch{}}function Ev(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),u=r(a);l&&u?s.push(a):!l&&u?o+=1:l&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Tv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gf="bdui.worker.candidate_sort",Kf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Ol="spec";function Vf(e){return Kf.some(t=>t.value===e)?e:Ol}function Cv(){try{return Vf(window.localStorage.getItem(Gf))}catch{return Ol}}function Rv(e){try{window.localStorage.setItem(Gf,e)}catch{}}var Yf="bdui.worker.done-range";function Ov(){try{let e=window.localStorage.getItem(Yf);return e===null?"today":Kn(e)}catch{return"today"}}function Lv(e){try{window.localStorage.setItem(Yf,e)}catch{}}function Uf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Iv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Ar):t==="updated"?r.sort(Ao):(r.sort(So(n)),t==="board"?r:[...r.filter(jf),...r.filter(s=>!jf(s))])}function Mv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Pv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Dv="\u{1F512} blocked";function Wf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Nv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function qv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Fv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function jv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Bv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Rl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Uv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Wv=new Set(["waiting_metadata","reviewing","retrying"]);function zv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",a=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",a?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${a}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,a=typeof r.next_at=="number"?on(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,a?`\uB2E4\uC74C \uC2DC\uAC01 ${a}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Hv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Gv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Hv(e.terminal_reason);l&&a.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])a.push(u);return e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&a.push(`repair ${s.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:i,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:!Uv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function zf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Kv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(zf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${zf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Nv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Wf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Wf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Vv(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,u=!0,d=null,m=null,v=null,b={},k=!1,N=!1,W={},K=null){let le=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,B=!!l&&l.active===!0,D=l&&l.failure||null,j=Fv(l?l.waiting:null,v),Q=n[e]||null,V=Q&&Q.gate?Q.gate:null,ue=Q&&Q.pr?Q.pr:null,U=jv(l?l.resolution:null),Z=Bv(l?l.head_review:null),ie=l&&l.head_review||null,ne=zv(v,ie),Ee=Gv(v,ne),Ue=l&&l.authority||null,me=!!ie&&["pending","reviewing","revising"].includes(ie.state),X=!!v&&typeof v=="object"&&Wv.has(v.phase),Te=le&&!B&&(ie?.state==="failed"||!Ue||X||Ue.source==="automatic"&&!N),Le=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":U?U.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":j,T=!!V&&V.base_badge==="\uCDA9\uB3CC",se=!!V&&V.enabled===!0,$e=qs({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),we=gi($e),xe=o&&!$e&&(o.queueing??null)?o.queueing:null,be=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!V&&V.tier==="merged",Se=a&&!!r&&!!V&&V.tier==="merged",it=Te&&(se||T||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||be||Se),ht=a&&T&&u===!1,_t=Fn(b,e,{external:a,merge_active:B||$e?.step==="merge",merge_queued:le,conflict_active:!!i,cleanup_active:we,merged:!!r||V?.tier==="merged"}),wt=!!_t.operation,R=!be&&!!r&&r.step==="repo_operations",oe=Kv({continuation_required:Y,queueing:xe,merge_step:$e,conflict_badge:Le,conflict_live:U?.live===!0||i==="running",head_review:ie&&Z?{...Z,state:ie.state,failure_reason:ie.failure_reason}:null,auto_resolution:ne,recovery:Ee,cleanup_failed:r,cleanup_label:r?Rr(r.step):null,base_exception:m,conflicting:T,gate:V,receipt_check:Q&&Q.receipt_check?Q.receipt_check:null,queue_failure:D,auto_skip:d,queued:le,queue_active:B,queue_position:l?l.position:0,activity:Le?null:o&&o.activity||null}),Ce=oe?.live===!0&&oe.title?c`<span title=${oe.title}>${oe.label}</span>`:oe?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&$e?.active!==!0?mi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...K?{dependency_chips:K}:{},external:a,pr_number:ue&&typeof ue.number=="number"?ue.number:null,pr_url:ue&&typeof ue.url=="string"?ue.url:"",completion_badge:oe?.live!==!0&&oe?.title?oe.label:null,completion_title:oe?.title||"",completion_repair_pr_url:Ee?Ee.repair_pr_url:"",completion_repair_pr_number:Ee?Ee.repair_pr_number:null,badges:Ce?[Ce]:[],live_badge:oe?.live===!0?Ce:null,usage:s,alert:oe?.alert===!0,merge_action:V?.tier==="merged"&&!be&&!Se||R?!1:!le||Y||Te,cancel_action:le&&!Y,cancel_enabled:(!B||me)&&!(Ee&&Ee.lock_actions),cancel_title:Ee&&Ee.lock_actions?`${Ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!me?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":me?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:_t,discard_action:_t.action,merge_step:$e,discard_enabled:_t.enabled,discard_title:_t.title,merge_enabled:!$e&&!xe&&!i&&!wt&&!m&&!(Ee&&Ee.lock_actions)&&!ht&&!R&&(se||T||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||be||Se||it||X&&!B),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||Se?"\uC815\uB9AC \uC7AC\uAC1C":T&&!$e&&!be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":V?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:wt?_t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":xe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":$e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${$e.label}`:Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ht?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":V?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:V&&V.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${V&&V.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ll(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:a,getWorkspacePath:l,switchWorkspace:u,openDoc:d,doneRange:m,onDoneRangeChange:v}=t,b=r?To(r,i):null,k=Lo({transport:n,uiOrderStore:i}),N=null,W=[],K=Av(),le=null,Y=null,B={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=Cv(),j=m?Kn(m):Ov(),Q=new Map;function V(){let p=jr.find(h=>h.value===j);return p?p.label:"\uC624\uB298"}let ue=qi("beads-ui.worker.lane-collapsed"),U=!1,Z=new Set,ie=new Set,ne=new Set,Ee=new Set,Ue=new Set,me={},X=null,Te=0,Le=null,T=[];function se(p){return X===p?me:{}}async function $e(){if(!n)return;let p=l?.()||"";if(X===p||Le&&Le.key===p&&Le.generation===Te)return;let h=++Te;Le={key:p,generation:h};let L=null;try{L=await Promise.resolve(n("get-session-defaults",{}))}catch(ee){if(h!==Te)return;Le=null,hv("get-session-defaults failed: %o",ee),Pe();return}h===Te&&(me=L&&typeof L.values=="object"&&L.values!==null?{...L.values}:{},X=p,Le=null,Pe())}function we(){X=null,Te+=1,$e()}let xe=document.createElement("div");xe.className="worker-console";let be=document.createElement("div");be.className="worker-top";let Se=document.createElement("div");Se.className="worker-drawer-overlay",Se.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let ht=document.createElement("div");ht.className="worker-drawer-host";let _t=document.createElement("div");_t.className="worker-drawer-host",_t.hidden=!0,Se.append(it,ht,_t);let wt=document.createElement("div");wt.className="worker-lanes-host",xe.append(be,Se,wt),e.appendChild(xe);let R=null,oe=is(ht,{transport:n,sessionLogStore:o,onClose:()=>{R=null,Se.hidden=!0,Pe()}}),Ce=qf(_t,{onClose:()=>{_t.hidden=!0,Se.hidden=!0,Pe()}}),Ne=Rf({getWorkspacePath:l||(()=>"")}),We=l&&l()||"",Je=Lf({queueStore:s,transport:n,onChanged:()=>Pe(),onOpenScript:(p,h)=>{Ne.open(p,h)}});function tt(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ui,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function bt(){let p=tt(),h=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,L=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ee=[];for(let ut of L){if(ee.length>=h)break;!ut||typeof ut.id!="string"||!/^s[1-5]$/.test(ut.id)||!Array.isArray(ut.entries)||ee.push({id:ut.id,label:`\uC9C1\uB82C ${ut.id.slice(1)}`,count:ut.entries.length})}return ee.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...ee]}function te(p){if(!le||!p.some(L=>L.id===le))return null;let h=bt();return h?{bead_id:le,lanes:h}:null}function G(){let p=tt();return typeof p.revision=="number"?p.revision:0}function he(p){p&&p.queue&&s&&s.set(p.queue)}function ct(){let p=tt().queue;return Array.isArray(p)?p.length:0}async function nt(p,h,L){if(!n)return;let ee=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},...L===void 0?{}:{index:L},expected_revision:G()}),pe=await n("worker-queue-place",ee());he(pe),pe&&pe.conflict&&await n("worker-queue-place",ee()).then(he)}async function Me(p,h,L){if(!n)return;let ee=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},to_index:L,expected_revision:G()}),pe=await n("worker-queue-reorder",ee());he(pe),pe&&pe.conflict&&await n("worker-queue-reorder",ee()).then(he)}async function Fe(p){if(!n)return;let h=await n("worker-queue-remove",{bead_id:p,expected_revision:G()});he(h),h&&h.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:G()}).then(he)}async function dt(p){if(!n||!p)return;let h=await n("worker-attempt-pause",{attempt_id:p});h&&h.paused===!1&&h.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function at(p){if(!n||!p)return;let h=await Vr();if(h===null)return;let L=async(pe={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:G(),...h!==""?{instructions:h}:{},...pe}),ee=await L();he(ee),ee&&ee.conflict&&(ee=await L(),he(ee)),ee=await er(ee,(pe,ut)=>L({continuation:pe,decision_token:ut}),{onResult:he,refresh:()=>L()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}async function pt(p){if(!n||!p)return;let h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:G()});he(h),h&&h.conflict&&(h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:G()}),he(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Et(p,h,L=!0){if(!n)return null;let ee=n,pe=await ee(p,{...h,expected_revision:G()});return he(pe),pe&&pe.conflict&&L&&(pe=await ee(p,{...h,expected_revision:G()}),he(pe)),pe}async function zt(p){if(!n||!p)return;let h=tt().merge_queue?.find(ee=>ee.bead_id===p)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Lt(p,h.mismatch);return}Z.add(p),Pe();let L;try{L=await Et("worker-merge-queue-add",{bead_id:p})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Z.delete(p),Pe()}if(!(!L||L.applied)){if(L.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(qv(L.reason),"error",2400)}}async function Ht(p){if(!(!n||!p||ie.has(p))){ie.add(p),Pe();try{let h=await n("worker-cleanup-retry",{bead_id:p,expected_revision:G()});he(h),h&&!h.retried&&!h.conflict&&h.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{ie.delete(p),Pe()}}}async function Lt(p,h){let L=await er({continuation_mismatch:h},(pe,ut)=>Et("worker-merge-queue-add",{bead_id:p,continuation:pe,decision_token:ut},!1)),ee=L?.queue?.merge_queue?.find(pe=>pe.bead_id===p)?.continuation_action;if(L?.applied!==!0&&ee?.continuation===null&&ee.mismatch){await Lt(p,ee.mismatch);return}L&&L.applied===!1&&!L.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function It(p){if(!n)return;let h=await Et("worker-merge-auto-toggle",{on:p});!h||h.conflict||ce(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function xt(p){if(!n||!p)return;let h=await Et("worker-merge-queue-remove",{bead_id:p});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function je(){await Et("worker-merge-queue-remove",{all:!0})}async function I(p,h=null,L="unmerged",ee=null){if(!n||!p)return;let pe=Ps(p,L);if(!(!!ee||typeof globalThis.confirm!="function"||globalThis.confirm(pe)))return;let Qe=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...ee?{operation_id:ee}:{},expected_revision:G()});if(he(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...ee?{operation_id:ee}:{},expected_revision:G()}),he(Qe)),Qe&&Qe.discarded===!0){ce(ii(Qe),"success",5e3);return}if(Qe&&Qe.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function J(p,h,L){if(!(!n||!h||!L||Ee.has(h))){Ee.add(h),Pe();try{let ee=await n(p,{bead_id:h,action_id:L,expected_revision:G()});he(ee),ee?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ee?.ok&&ee?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ee.reason)}`,"error",2800)}finally{Ee.delete(h),Pe()}}}async function ge(p,h){if(!n||!h||ne.has(h))return;ne.add(h),Pe();let L;try{let ee=async(pe={})=>await n(p,{bead_id:h,expected_revision:G(),...pe});L=await ee(),he(L),L&&L.conflict&&(L=await n(p,{bead_id:h,expected_revision:G()}),he(L)),p==="worker-revise-fix"&&(L=await er(L,(pe,ut)=>ee({continuation:pe,decision_token:ut}),{onResult:he,refresh:()=>ee()}))}finally{ne.delete(h),Pe()}if(!(!L||L.conflict)){if(L.ok){ce(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function C(p){if(!n)return;let h=await n("worker-automation-toggle",{on:p,expected_revision:G()});he(h),h&&h.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:G()}).then(he)}async function H(p){if(!n||!p)return;let h=await n("worker-repo-operation-dismiss",{operation_id:p});he(h),h&&h.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function Ie(p){if(!n||!Number.isFinite(p))return;let h=Math.max(Ui,Math.floor(p)),L=await n("worker-queue-set-slots",{slots:h,expected_revision:G()});he(L),L&&L.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:G()}).then(he)}async function Be(p){if(!n||!Number.isInteger(p)||p<1||p>Ff)return;let h=tt(),L=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(p).reduce((ut,Qe)=>ut+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),ee=()=>({count:p,expected_revision:G()}),pe=await n("worker-queue-set-serial-lane-count",ee());he(pe),pe&&pe.conflict&&(pe=await n("worker-queue-set-serial-lane-count",ee()),he(pe)),pe&&pe.applied&&L>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${L}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Ae="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function lt(p,h){let L=wl(p,h.id,B);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:L.kind==="note"?{kind:"note",text:L.text}:L.kind==="disabled"?{kind:"disabled",label:Ae,title:L.title}:{kind:"place",label:Ae,title:L.title}}}function st(p,h){if(!Y||Y.bead_id!==p)return null;let L=Y.counterpart_id,ee=h.filter(pe=>pe.id===L);return ee.length===0?null:{rows:ee.map(pe=>lt(p,pe))}}async function ye(p,h){let L=wl(p,h,B);if(Y=null,L.kind!=="ops"){Pe();return}let ee=G();for(let pe of L.ops){let ut=await Xe(pe,ee);if(ut===null)break;ee=ut}Pe()}async function Xe(p,h){if(!n)return null;try{let L=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:h});if(he(L),L&&L.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!L||L.applied!==!0)return ce(L&&typeof L.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${L.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ee=L.queue?L.queue.revision:void 0;return typeof ee!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ee}catch(L){return ce(L instanceof Error&&L.message?L.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function P(){let p=tt(),h=b?b.selectBoardColumn(yv,"ready"):[],L=b?b.selectBoardColumn(vv,"blocked"):[],ee=b?b.selectBoardColumn($v,"closed"):[],pe=b?b.selectBoardColumn(wv,"in_progress"):[],ut=b?b.selectBoardColumn(kv,"resolved"):[],Qe=Ro([...h,...L,...pe,...ut,...ee]),Bt=new Map;for(let _ of[...h,...L,...pe])_&&_.id&&!Bt.has(_.id)&&Bt.set(_.id,_);let Gt={...se(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let M=p[_];typeof M=="string"&&(Gt[_]=M)}function en(_,M){let ae=Bt.get(_);if(!ae)return null;let qe=ae.metadata&&typeof ae.metadata=="object"?ae.metadata:{},Ye=ae.workflow?.route,Yt=qe.route,Pt=Bf(Ye)?Ye:Bf(Yt)?Yt:null;return $n({pin:qe,global:Gt,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Pt,controller_runtime:M})}function Tn(_){let M=_.runner||null,ae=en(_.bead_id,M),qe=Is(_),Ye=ae?_r(ae,M):null;return qe||Ye?{orchestration:qe,worker:Ye}:null}let bn=new Map;function Vt(_){if(bn.has(_))return bn.get(_)??null;let M=en(_,null),ae=null;if(M){let qe=qn(p.runner_catalog??null,M.orchestration_model.value??""),Ye=qe===null?M:en(_,qe),Yt=Tr(Ye,p.runner_catalog??null),Pt=_r(Ye,qe);ae=Yt||Pt?{orchestration:Yt,worker:Pt}:null}return bn.set(_,ae),ae}let hn=new Map;function Ln(_){if(hn.has(_))return hn.get(_)??null;let M=Bt.get(_),ae=M&&M.metadata&&typeof M.metadata=="object"?M.metadata:null,qe=ae?ts(ae):null;return hn.set(_,qe),qe}function In(_){let M=Oo(Qe,_);return M.total===0?null:M}let ar=p.bead_titles||{},f=new Map;for(let[_,M]of Object.entries(ar))typeof M=="string"&&M.length>0&&f.set(_,M);for(let _ of[...h,...L])f.set(_.id,_.title||_.id);let g=new Map;for(let _ of[...h,...L,...pe,...ut,...ee])_&&_.id&&typeof _.from_id=="string"&&g.set(_.id,_.from_id);let w=new Map;for(let _ of[...h,...L,...pe,...ut,...ee])_&&_.id&&typeof _.priority=="number"&&w.set(_.id,_.priority);let $=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},q=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},z=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},re=new Map;for(let[_,M]of Object.entries(q))Array.isArray(M)&&re.set(_,Tl(M));for(let _ of[...h,...L]){let M=_.labels;Array.isArray(M)&&!re.has(_.id)&&re.set(_.id,Tl(M))}let Re=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},He=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},et=new Map;for(let[_,M]of Object.entries($))M&&typeof M=="object"&&et.set(_,M);for(let _ of[...h,...L])et.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let De=_=>et.get(_)||{},y=p.pr_wait||[],E=p.pr_observations||{},A=p.pr_activity||{},_e=p.cleanup_failed||{},Ke=Object.entries(_e).map(([_,M])=>({bead_id:_,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0})),Ve=p.queue||[],vt=new Set([...Ve.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(M=>M.bead_id)),...y.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),ze=new Set(L.map(_=>_.id)),ft=i?i.get()?.order||{}:{},yn=new Set,Dl=[];for(let _ of[...h,...L])vt.has(_.id)||yn.has(_.id)||Mv(_)||(yn.add(_.id),Dl.push(_));W=Iv(Dl,D,ft);let a_=p.admission||{},Nl=_=>{let M=a_[_];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof M.reason=="string"?M.reason:"",qe=ae.indexOf(":");return qe>0&&qe<ae.length-1?`\u26D4 ${ae.slice(0,qe)} (${ae.slice(qe+1)})`:`\u26D4 ${ae}`},ql=new Map,l_=W.map(_=>{let M=eo(_),ae=M.evidence==="published",qe=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Ye=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Yt=Object.hasOwn(_,"labels")&&Af(_.labels),Pt=Yt||!Object.hasOwn(_,"labels")?"":Sf(_.labels,_.metadata),Nr=Pt.length>0,Ct=!Yt&&(qe?Ye:ae&&!M.conflict),_o=ze.has(_.id),Xn=[];if(_o){let mo=Pv(_);mo.length>0?ql.set(_.id,mo):Xn.push(Dv)}qe&&!Ye?Xn.push("missing_description"):!qe&&M.conflict?Xn.push("spec_id_conflict"):!qe&&M.evidence==="none"?Xn.push("spec \uC5C6\uC74C"):!qe&&M.evidence==="draft"&&Xn.push("spec \uBBF8\uBC1C\uD589(draft)");let qr=Nl(_.id);return qr&&Xn.push(qr),{id:_.id,title:_.title||_.id,reason:Xn.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:qe,status:_.status,worker_ineligible:Yt,session_preferred:Nr,session_preferred_reason:Pt,blocked:_o,has_spec:ae,exec_chips:Vt(_.id),rec:Ln(_.id),from_id:_.from_id||void 0,priority:w.get(_.id)}}),Wi=Ev(l_,K),zi=Wi.visible,c_=p.revise_parked||{},oo=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},u_=_=>{let M=z[_]?.chips?.pr;return M&&typeof M.number=="number"&&typeof M.url=="string"?{pr_number:M.number,pr_url:M.url}:{}},Hi=(_,M)=>_.map((ae,qe)=>{let Ye=M!=="done",Yt=M!=="done"&&M!=="queue",Pt=Ye?c_[ae.bead_id]:null,Nr=Ye?Fn(oo,ae.bead_id):null,Ct=Nr?.operation?Nr:null,_o=Ye&&re.get(ae.bead_id)===!0,Xn=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,qr=Ye?rd(Xn,!!Ct||Ee.has(ae.bead_id)):null,mo=Ye&&!qr?Nl(ae.bead_id):null,$_=Ye?[mo]:[],x_=[];return{id:ae.bead_id,title:f.get(ae.bead_id)||ae.bead_id,reason:$_.filter(Boolean).join(" \xB7 "),draggable:Ye&&!Ct&&!qr,done:M==="done",lane:M,seq:Yt?qe+1:void 0,worker_serial:_o,discard:Ct,stale_work:qr,badges:[...x_,...Pt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...M==="done"?ri(p.attempts||{},ae.bead_id):[]],alert:!!Pt,revise_action:!!Pt,revise_enabled:!!Pt&&!Ct&&!ne.has(ae.bead_id),revise_title:Pt?Pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?Rn(p.attempts||{},ae.bead_id):null,work_ms:M==="done"?si(p.attempts||{},ae.bead_id):null,done_at:M==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,exec_chips:Ye?Vt(ae.bead_id):null,rec:Ln(ae.bead_id),workflow:Ye&&z[ae.bead_id]||null,...M==="done"?u_(ae.bead_id):{},from_id:g.get(ae.bead_id)||void 0,priority:w.get(ae.bead_id),...De(ae.bead_id)}}),Mr=p.attempts?Object.values(p.attempts).filter(Er):[],Gi=new Set;for(let _ of Mr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Gi.add(_.resumed_from);let Fl=new Map;for(let _ of Mr)Fl.set(_.bead_id,_.attempt_id);let cs=new Map;for(let _ of Mr)cs.set(_.attempt_id,_);function Ki(_){let M=new Set,ae=_;for(;ae&&!M.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;M.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&cs.get(ae.resumed_from)||null}return!1}let io=typeof p.declared_base=="string"?p.declared_base:null;function d_(_){let M=null;for(let ae of Mr)!ae||ae.bead_id!==_||Ki(ae)||(M===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=ae);return M&&typeof M.target_base=="string"?M.target_base:null}let Vi=[],ao=[],p_=xf(p),jl=_=>{let M=typeof _.session_id=="string"&&_.session_id.length>0,ae=Gi.has(_.attempt_id);return{eligible:M&&!ae,reason:M?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Mn=null;for(let _ of Mr){let M=_.status==="paused"&&!Gi.has(_.attempt_id);if(_.status==="running"||M)ao.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:M,conflict_resolution:Ki(_),base_exception:Rl(io,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Fn(oo,_.bead_id,{attempt_id:_.attempt_id}),workflow:z[_.bead_id]||null,priority:w.get(_.bead_id),usage:Rn(p.attempts||{},_.bead_id),rollup:In(_.bead_id),rollup_expanded:Ue.has(_.bead_id),exec_chips:Tn(_),rec:Ln(_.bead_id),...De(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&p_(_)){let ae=jl(_);Vi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Fn(oo,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:Ki(_),base_exception:Rl(io,_.target_base),workflow:z[_.bead_id]||null,priority:w.get(_.bead_id),usage:Rn(p.attempts||{},_.bead_id),rollup:In(_.bead_id),rollup_expanded:Ue.has(_.bead_id),exec_chips:Tn(_),rec:Ln(_.bead_id),...De(_.bead_id)}),Mn=_}}let Bl=new Set([...Vi,...ao].map(_=>_.bead_id)),Ul=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let M=_&&_.bead_id;if(!(typeof M!="string"||M.length===0||Bl.has(M))){if(Bl.add(M),Array.isArray(_.blocked_by)){let ae=_.blocked_by.filter(qe=>typeof qe=="string"&&qe.length>0);ae.length>0&&Ul.set(M,ae)}ao.push({bead_id:M,attempt_id:null,kind:"session",title:_.title||f.get(M)||M,status:"in_progress",started_at:Dn(_.started_at)??Dn(_.updated_at),updated_at:Dn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:w.get(M),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:Ln(M),usage:null,rollup:null,rollup_expanded:!1})}}let Pr=[...Vi,...ao].map(_=>{let M=cs.get(_.attempt_id),ae=M?.quickfix_landing;if(M?.quickfix_lane!==!0||!ae||typeof ae!="object")return _;let qe=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,Ye=qs({bead_id:M.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:qe?{step:ae.cursor,reason:qe}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Ye?{..._,landing:Ye}:_}),Wl=null;if(Mn){let _=jl(Mn),M=Mn.cause_detail;Wl={bead_id:Mn.bead_id,repo:Mn.repo||"",reason:Mn.cause||Mn.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Mn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Fn(oo,Mn.bead_id,{attempt_id:Mn.attempt_id})}}let zl=new Set(Pr.map(_=>_.bead_id)),Yi=Array.isArray(p.merge_queue)?p.merge_queue:[],Hl=new Map,Gl=new Map,Kl=new Map,Vl=new Map,Yl=new Map;Yi.forEach((_,M)=>{_&&typeof _.bead_id=="string"&&(Hl.set(_.bead_id,M+1),Gl.set(_.bead_id,_.resolution),Kl.set(_.bead_id,_.continuation_action||null),Vl.set(_.bead_id,_.head_review||null),Yl.set(_.bead_id,_.authority||null))});let Dr=p.merge_queue_state||{active:null,failures:{}},f_=Dr.failures||{},Zl=Dr.waiting&&typeof Dr.waiting.bead_id=="string"&&typeof Dr.waiting.reason=="string"?Dr.waiting:null,__=p.auto_merge_skips||{},Xl=_=>{let M=__[_];if(!M)return null;let ae=E[_],qe=ae&&ae.pr?ae.pr.head_sha:null;return qe&&qe===M.head_sha?M.reason||"":null},lo=new Map;for(let _ of Pr)_.failed!==!0&&_.conflict_resolution&&(_.paused?lo.has(_.bead_id)||lo.set(_.bead_id,"paused"):lo.set(_.bead_id,"running"));let Ql=Pr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Jl=(p.workspace_info||{}).slots,ec=typeof Jl=="number"?Jl:typeof p.slots=="number"?p.slots:Ui,m_=Ql>ec,co=$r(j),g_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>co===void 0||typeof _.added_at!="number"||_.added_at>=co).sort((_,M)=>(M.added_at||0)-(_.added_at||0)),us=Hi(g_,"done"),b_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),tc=[],h_=l?.()||"";for(let _ of ee){let M=Dn(_.closed_at);if(typeof _.id!="string"||b_.has(_.id)||M===null||co!==void 0&&M<co||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ae=`${h_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,qe=Q.get(ae);if(qe===void 0&&n&&(Q.set(ae,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Ye=>{let Yt=Array.isArray(Ye)&&Ye.some(Pt=>Oi(typeof Pt?.text=="string"?Pt.text:"")?.lane==="session");Q.set(ae,Yt?"session":"not-session"),Pe()}).catch(()=>{Q.set(ae,"failed"),Pe()})),qe==="session"){let Ye=Dn(_.started_at);tc.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Ye!==null&&M>=Ye?M-Ye:null,work_kind:"session",done_at:M,created_at:_.created_at,updated_at:_.updated_at})}}us.push(...tc),us.sort((_,M)=>(M.done_at||0)-(_.done_at||0));let uo={};for(let _ of Yn)uo[_]=0;let nc=!1,rc=0,Zi=0,sc=0;for(let _ of us){let M=_.usage;if(M&&typeof M=="object"){let ae=!1;for(let qe of Yn)Number.isFinite(M[qe])&&(uo[qe]+=M[qe],nc=!0,ae=!0);ae&&(Zi+=1,Number.isFinite(M.total_cost_usd)&&(rc+=M.total_cost_usd,sc+=1))}}Zi>0&&sc===Zi&&(uo.total_cost_usd=rc);let oc=us.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),y_=oc.length>0?an(Uo(oc)):nc?tr(uo):null,ic=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},ac=Array.isArray(p.serial_lanes)?p.serial_lanes:[],lc=_=>{if(y.some(qe=>qe.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let M=Mr.filter(qe=>qe&&qe.bead_id===_),ae=M.length>0?M[M.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},po=ac.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,M)=>{let ae=ic[_.id]||{},qe=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(Ct=>Ct&&typeof Ct.bead_id=="string"&&typeof Ct.after=="string").map(Ct=>[Ct.bead_id,Ct.after])),Ye=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(Ct=>typeof Ct=="string"):[],Yt=new Set(Ye),Pt=Hi(_.entries.filter(Ct=>!zl.has(Ct.bead_id)&&!Yt.has(Ct.bead_id)),_.id).map(Ct=>qe.has(Ct.id)?{...Ct,badges:[`\u{1F517} ${qe.get(Ct.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Ct.badges]}:Ct),Nr=Ye.map(Ct=>({id:Ct,title:f.get(Ct)||Ct,draggable:!1,lane:_.id,ghost:!0,badges:[lc(Ct)]}));return{id:_.id,index:M+1,rows:[...Nr,...Pt],occupied:Ye.length>0,badge:Ye.length>0?lc(Ye[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),cc=typeof p.serial_lane_count=="number"?p.serial_lane_count:po.length,Xi=Hi(Ve.filter(_=>!zl.has(_.bead_id)),"queue"),uc=new Map,dc=new Set;for(let[_,M]of Object.entries(ic)){if(!/^s[1-5]$/.test(_))continue;let ae=M&&Array.isArray(M.occupied_by)?M.occupied_by:[];for(let qe of ae)typeof qe=="string"&&uc.set(qe,_);ae.length>0&&dc.add(_)}let lr=[];for(let _ of Pr)typeof _.bead_id=="string"&&lr.push({id:_.bead_id,title:f.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:uc.get(_.bead_id)??null});for(let _ of y){let M=_&&_.bead_id;typeof M!="string"||M.length===0||lr.push({id:M,title:f.get(M)||M,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of po)for(let M of _.rows)M.ghost!==!0&&lr.push({id:M.id,title:M.title,location_label:`${_.id} #${M.seq??""}`.trim(),kind:"serial",lane_id:_.id});Xi.forEach((_,M)=>{lr.push({id:_.id,title:_.title,location_label:`#${M+1}`,kind:"parallel",lane_id:null})});for(let _ of zi)lr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let pc={};for(let _ of ac)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(pc[_.id]=_.entries.length);let Qi=new Map;for(let _ of lr)Qi.has(_.id)||Qi.set(_.id,_);B={members_by_id:Qi,serial_raw_lengths:pc,serial_lane_count:cc,occupied_lanes:dc};let v_=Tp(p.bead_scope,lr),fo=new Map;for(let[_,M]of Ul)fo.set(_,M);for(let[_,M]of ql)fo.set(_,M);for(let[_,M]of Object.entries(Re))Array.isArray(M)&&fo.set(_,M.filter(ae=>typeof ae=="string"&&ae.length>0));let w_=cd(fo,lr,He),Ji=(_,M=null)=>{let ae=v_.get(_),qe=w_.get(_)||null,Ye=ae&&ae.overlaps.length>0?ae.overlaps:null,Yt=!!ae&&ae.scope_missing;if(!qe&&!Ye&&!Yt)return M;let Pt=Ye?st(_,Ye):null;return{...M||{},...qe?{predecessors:qe}:{},...Ye?{overlaps:Ye}:{},...Yt?{scope_missing:!0}:{},...Pt?{popover:Pt}:{}}},ea=_=>{let M=Ji(_.id,_.dependency_chips||null);return M&&(_.dependency_chips=M),_};for(let _ of Xi)ea(_);for(let _ of po)for(let M of _.rows)M.ghost!==!0&&ea(M);for(let _ of zi)ea(_);let fc=new Map;for(let _ of Pr){let M=typeof _.bead_id=="string"?_.bead_id:"";if(M.length===0)continue;let ae=_.kind==="session",qe=Ji(M),Ye=typeof _.attempt_id=="string"&&_.attempt_id.length>0?cs.get(_.attempt_id):void 0,Yt=Ye&&Ye.last_activity&&typeof Ye.last_activity=="object"?Ye.last_activity:null,Pt=Ye&&Array.isArray(Ye.legs)?Ye.legs:[];!qe&&!Yt&&Pt.length===0&&!ae||fc.set(M,{...Yt?{last_activity:Yt}:{},...Pt.length>0?{legs:Pt}:{},...qe?{dependency_chips:qe}:{}})}let k_=y.map(_=>Vv(_.bead_id,f.get(_.bead_id)||_.bead_id,E,_e[_.bead_id]||null,Rn(p.attempts||{},_.bead_id),A[_.bead_id]||(Z.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ie.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lo.get(_.bead_id)||null,_.external===!0,{position:Hl.get(_.bead_id)||0,active:Dr.active===_.bead_id,failure:f_[_.bead_id]||null,waiting:Zl?.bead_id===_.bead_id?Zl.reason:null,resolution:Gl.get(_.bead_id),continuation_action:Kl.get(_.bead_id),head_review:Vl.get(_.bead_id)||null,authority:Yl.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?Xl(_.bead_id):null,Rl(io,d_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},cs.get(Fl.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},Ji(_.bead_id))).map(_=>({..._,workflow:z[_.id]||null,priority:w.get(_.id),...De(_.id)}));return{queue:p,idToTitle:f,candidates:zi,candidate_hidden:{blocked:Wi.hidden_blocked,spec:Wi.hidden_spec},running:Pr,live_count:Ql,slots:ec,over_cap:m_,failure:Wl,waiting:Xi,serial_lanes:po,serial_lane_count:cc,running_overlays:fc,pr_wait:k_,merge_queue_length:Yi.length,merge_queue_running:Yi.length>0,auto_excluded:y.map(_=>_.bead_id).filter(_=>Xl(_)!==null),declared_base:io,done:us,token_total:y_,cleanup_failures:Ke,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function F(p){let h=p.waiting.length>0?p.waiting[0].id:"\u2014",L=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ee=Ze(p),pe=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ut=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(Vt=>Vt&&typeof Vt.armed_by_lane=="string"&&Vt.armed_by_lane.length>0).length,Qe=ut>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${ut}건 진행 중</span
          >`:"",Bt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${V()} 완료 <b>${p.done.length}</b></span
      >`,Gt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,en=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ui}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ff},(Vt,hn)=>hn+1).map(Vt=>c`<option
                value=${String(Vt)}
                ?selected=${p.serial_lane_count===Vt}
              >
                ${Vt}
              </option>`)}
        </select>
      </label> `,Tn=Dp({failure:p.failure}),bn=nd(p.repo_operations,p.cleanup_failures);return U?c`<div class="worker-ribbon">
          ${L} ${ee}
          <div class="worker-kpi worker-kpi--ribbon">
            ${pe}${Qe}${Bt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${en}</div>
          <div class="worker-kpi">${Gt}</div>
        </div>
        ${bn}${Je.template()}${Tn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${ee}${en}</div>
        <div class="worker-kpi">
          ${pe}${Qe}${Bt}${Gt}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Vt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Vt.tooltip}
                >${V()} 완료 · 누적 ${Vt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${bn}${Je.template()}${Tn}`}function ve(p){let h=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${K.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Tv.map(L=>c`<button
              type="button"
              class="worker-filter__chip${K.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${K.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function Ge(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Kf.map(p=>c`<option value=${p.value} ?selected=${D===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function ke(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${jr.map(p=>c`<option value=${p.value} ?selected=${j===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function Ze(p){let h=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${h?" is-active":""}"
        title=${h?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${h?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(h)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(p.auto_excluded),ee=p.pr_wait.filter(pe=>pe.merge_action&&pe.merge_enabled&&!L.has(pe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function ot(p){return pi({parallel:{rows:p.waiting.map(h=>jn(h)),count:p.waiting.length,collapsed:ue.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(h=>({id:h.id,title:`\uC9C1\uB82C ${h.index}`,rows:h.rows.map(L=>jn(L)),count:h.rows.length,empty:h.rows.length===0,badge:h.badge,held:h.occupied,cycle:h.cycle})),collapsed:ue.isAreaCollapsed("serial")}})}function mt(p){return Np(p.running,Date.now(),R,p.running_overlays)}function $t(p){return p.running.some(h=>h.kind!=="session"&&!h.paused&&h.failed!==!0)}function Kt(p){let h=Zn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ge(),controls:ve(p),collapsible:!0,collapsed:ue.isCollapsed("candidate"),place_menu:te(p.candidates),onOpenDoc:d?(ee,pe)=>d(pe):void 0}),L=Zn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,header_control:ke(),collapsible:!0,collapsed:ue.isCollapsed("done"),preview:U?Array.isArray(p.token_total)?p.token_total.map(ee=>ee.label).join(" \xB7 "):p.token_total||Uf(p.done):void 0});return U?c`<div class="worker-lanes worker-lanes--mobile">
        ${fi({live:$t(p),running_body:p.running.length>0?mt(p):"",pr_wait_rows:p.pr_wait.map(ee=>jn(ee)),count:p.running.length+p.pr_wait.length})}
        ${Zn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:ue.isCollapsed("queue"),preview:Uf(p.waiting),body:ot(p)})}
        ${h} ${L}
      </div>`:c`<div class="worker-lanes">
      ${h}
      ${Zn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:ue.isCollapsed("queue"),body:ot(p)})}
      ${Zn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:$t(p),collapsible:!0,collapsed:ue.isCollapsed("running"),body:mt(p)})}
      ${Zn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:ue.isCollapsed("pr_wait")})}
      ${L}
    </div>`}function Tt(p){ue.toggle(p),Pe()}function Qt(p){ue.toggleArea(p),Pe()}function Pe(){let p=P();rt(F(p),be),rt(Kt(p),wt)}function mn(){let p=!0,h=Ni(L=>{if(U=L,p){p=!1;return}Pe()});T.push(h)}let Jt=null;function Ft(p){Jt=p.target instanceof Element?p.target:null}function Xt(p){let L=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!L)return;if(Jt&&L.contains(Jt)&&Jt.closest("input, button, a")){p.preventDefault();return}let ee=L.dataset.beadId||"",pe=L.dataset.lane||"";N={bead_id:ee,from_lane:pe},xe.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",ee),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function gn(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;let L=h.dataset.lane||"";L!=="candidate"&&L!=="queue"&&!/^s[1-5]$/.test(L)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function fe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function S(){xe.classList.remove("is-dragging")}function de(p,h){let L=W.find(Qe=>Qe.id===p);if(!L)return;let ee=W.filter(Qe=>Qe.id!==p),pe=ee.length;if(h){let Qe=h.dataset.beadId;if(Qe===p)return;let Bt=ee.findIndex(Gt=>Gt.id===Qe);Bt>=0&&(pe=Bt)}let ut=ee.slice();ut.splice(pe,0,L),k.applyReorder(p,ut,pe)}function Oe(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;p.preventDefault(),h.classList.remove("worker-pane--drag-over"),xe.classList.remove("is-dragging");let L=h.dataset.lane||"",ee=N?.bead_id||p.dataTransfer?.getData("text/plain")||"",pe=N?.from_lane||"";if(N=null,!ee)return;let ut=p.target?.closest?.(".worker-mini, .worker-card"),Qe=L==="queue"&&h.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||h,Bt=Array.from(Qe.querySelectorAll(".worker-mini, .worker-card")),Gt=Bt.length;if(ut){let en=Bt.indexOf(ut);en>=0&&(Gt=en)}if(Gt=Math.max(0,Gt-Qe.querySelectorAll(".worker-mini--ghost").length),h.classList.contains("worker-pane--collapsed")&&(Gt=ct()),L==="candidate"){if(pe==="candidate"){de(ee,ut);return}(pe==="queue"||/^s[1-5]$/.test(pe))&&Fe(ee);return}if(L==="queue"||/^s[1-5]$/.test(L)){let en=L==="queue"?"parallel":L;pe===L?Me(ee,en,Gt):nt(ee,en)}}function yt(p){K=p,Sv(p),Pe()}function Rt(p){D=Vf(p),Rv(D),Pe()}function At(p){j=Kn(p),Lv(j),v?.(j),Pe()}function jt(p){let h=p.target?.closest?.(".worker-serial-lane-count");if(h){let Bt=Number.parseInt(h.value,10);Number.isFinite(Bt)&&Be(Bt).then(Pe);return}let L=p.target?.closest?.(".worker-filter__blocked");if(L){yt({...K,show_blocked:L.checked});return}let ee=p.target?.closest?.(".worker-done-range");if(ee){At(ee.value);return}let pe=p.target?.closest?.(".worker-sort");if(pe){Rt(pe.value||Ol);return}let ut=p.target?.closest?.(".worker-slots__input");if(!ut)return;let Qe=Number.parseInt(ut.value,10);if(!Number.isFinite(Qe)){Pe();return}Ie(Qe).then(Pe)}function nn(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rn(){let p=P(),h=tt().workspace_info,L=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:L}}function En(){R&&oe.close(),_t.hidden=!1,Se.hidden=!1,Ce.open(rn()),Pe()}function Mt(p){let h=tt(),L=h.attempts?h.attempts[p]:null;R=p,Ce.close(),_t.hidden=!0,Se.hidden=!1,oe.open({attempt_id:p,meta:nn(L)}),Pe()}function sn(p){let h=tt(),L=(Array.isArray(h.session_active)?h.session_active:[]).find(pe=>pe&&pe.bead_id===p),ee=(L&&Array.isArray(L.session_refs)?L.session_refs:[]).find(pe=>pe&&pe.current===!0);ee&&(Ce.close(),_t.hidden=!0,Se.hidden=!1,oe.open(Yr(ee,p,"in_progress")),Pe())}function cn(){if(Ce.isOpen()&&Ce.refresh(rn()),!R)return;let p=tt(),h=p.attempts?p.attempts[R]:null;if(h){oe.updateMeta(nn(h));return}oe.close()}function un(p,h){if(p.length===0||!a)return;let L=l?l():void 0;if(h.length===0||!L||h===L||!u){a(p);return}Promise.resolve(u(h)).then(()=>{a(p)}).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Gn(p){let h=p.target;if(h?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let L=h?.closest?.(".worker-dep__open");if(L){un(L.getAttribute("data-dep-id")||"",L.getAttribute("data-root-dir")||"");return}let ee=h?.closest?.(".mon-overlap__chip");if(ee){let E=ee.closest("[data-bead-id]"),A=E&&E.getAttribute("data-bead-id")||"";if(A){let _e=ee.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===A&&Y.counterpart_id===_e?null:{bead_id:A,counterpart_id:_e},Pe()}return}let pe=h?.closest?.(".mon-overlap__place");if(pe){let E=pe.closest("[data-bead-id]"),A=E&&E.getAttribute("data-bead-id")||"";A&&ye(A,pe.getAttribute("data-counterpart-id")||"");return}if(h?.closest?.(".mon-overlap__popover"))return;if(h?.closest?.(".worker-repo-strip")){En();return}let ut=h?.closest?.(".worker-repo-op__dismiss");if(ut){H(ut.dataset.operationId||"");return}let Qe=h?.closest?.(".worker-cleanup__resume");if(Qe){let E=Qe.dataset.beadId;E&&Ht(E);return}let Bt=h?.closest?.(".worker-banner__resume");if(Bt){let E=Bt.dataset.attemptId;E&&at(E);return}let Gt=h?.closest?.(".worker-banner__discard");if(Gt){let E=Gt.dataset.confirmation==="merged"?"merged":"unmerged";I(Gt.dataset.beadId||"",Gt.dataset.attemptId||null,E,Gt.dataset.operationId||null);return}let en=h?.closest?.(".worker-banner__dismiss");if(en){let E=en.dataset.attemptId;E&&pt(E);return}if(h?.closest?.(".worker-play")){C(!tt().auto_advance);return}let Tn=h?.closest?.(".worker-merge-all");if(Tn){Tn.classList.contains("worker-merge-all--stop")?tt().auto_merge===!0?It(!1):je():It(!0);return}let bn=h?.closest?.(".worker-pane__toggle[data-lane]");if(bn){let E=bn.dataset.lane;(E==="candidate"||E==="queue"||E==="running"||E==="pr_wait"||E==="done")&&Tt(E);return}let Vt=h?.closest?.(".worker-wait__area-toggle[data-area]");if(Vt){let E=Vt.dataset.area;(E==="parallel"||E==="serial")&&Qt(E);return}let hn=h?.closest?.(".worker-card__place-lane");if(hn){let E=hn.dataset.beadId,A=hn.dataset.lane;E&&(A==="parallel"||/^s[1-5]$/.test(A||""))&&(le=null,Pe(),nt(E,A));return}if(h?.closest?.(".worker-card__place-cancel")){le=null,Pe();return}let In=h?.closest?.(".worker-card__place");if(In){let E=In.dataset.beadId;E&&!In.disabled&&(bt()?(le=E,Pe()):nt(E,"parallel"));return}let ar=h?.closest?.(".worker-filter__chip");if(ar){let E=ar.dataset.spec;(E==="all"||E==="with"||E==="without")&&yt({...K,spec:E});return}let f=h?.closest?.(".worker-mini__merge");if(f){let E=f.dataset.beadId||"";tt().cleanup_failed?.[E]?Ht(E):zt(E);return}let g=h?.closest?.(".worker-mini__merge-cancel");if(g){xt(g.dataset.beadId||"");return}let w=h?.closest?.(".worker-mini__discard");if(w){I(w.dataset.beadId||"",w.dataset.attemptId||null,w.dataset.discardMode==="merged"?"merged":"unmerged",w.dataset.operationId||null);return}let $=h?.closest?.(".worker-mini__stale-continue");if($){J("worker-stale-work-continue",$.dataset.beadId||"",$.dataset.actionId||"");return}let q=h?.closest?.(".worker-mini__stale-backup");if(q){J("worker-stale-work-backup-fresh",q.dataset.beadId||"",q.dataset.actionId||"");return}let z=h?.closest?.(".worker-mini__stale-recheck");if(z){J("worker-stale-work-recheck",z.dataset.beadId||"",z.dataset.actionId||"");return}let re=h?.closest?.(".worker-mini__revise-fix");if(re){ge("worker-revise-fix",re.dataset.beadId||"");return}let Re=h?.closest?.(".worker-mini__revise-approve");if(Re){ge("worker-revise-approve",Re.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let E=h?.closest?.(".rtile"),A=E?.dataset?.beadId,_e=E?.dataset?.attemptId;A&&I(A,_e||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let A=h?.closest?.(".rtile")?.dataset?.attemptId;A&&pt(A);return}if(h?.closest?.(".rtile__pause")){let A=h?.closest?.(".rtile")?.dataset?.attemptId;A&&dt(A);return}if(h?.closest?.(".rtile__resume")){let A=h?.closest?.(".rtile")?.dataset?.attemptId;A&&at(A);return}if(h?.closest?.(".rtile__session")){let E=h?.closest?.(".rtile"),A=E?.dataset?.attemptId;if(A){Mt(A);return}let _e=E?.dataset?.beadId;_e&&sn(_e);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){Ce.close(),oe.close();return}if(h?.closest?.(".worker-drawer-host"))return;let He=h?.closest?.(".rtile .board-card__roll-toggle");if(He){let E=He.dataset.rollParent;E&&(Ue.has(E)?Ue.delete(E):Ue.add(E),Pe());return}let et=h?.closest?.(".rtile .board-card__roll-child");if(et){let E=et.dataset.childId;E&&a&&a(E);return}let De=h?.closest?.(".rtile");if(De){if(h?.closest?.(".rtile__id")){let A=De.dataset.beadId;A&&Nn(A).then(_e=>{_e?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let E=De.dataset.beadId;E&&a&&a(E);return}let y=h?.closest?.(".worker-mini, .worker-card");if(y){let E=y.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){E&&Nn(E).then(_e=>{_e?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let A=h?.closest?.(".ctl-chip--from");if(A){let _e=A.dataset.fromId;_e&&a&&a(_e);return}E&&a&&a(E)}}e.addEventListener("pointerdown",Ft),e.addEventListener("dragstart",Xt),e.addEventListener("dragover",gn),e.addEventListener("dragleave",fe),e.addEventListener("dragend",S),e.addEventListener("drop",Oe),e.addEventListener("click",Gn),e.addEventListener("change",jt);function x(p){if(!Y)return;let h=p.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Pe())}function O(p){p.key!=="Escape"||!Y||(Y=null,Pe())}return document.addEventListener("click",x),document.addEventListener("keydown",O),T.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",O)}),mn(),b&&T.push(b.subscribe(()=>{for(let[p,h]of Q)h==="failed"&&Q.delete(p);Pe()})),s&&T.push(s.subscribe(()=>{let p=l&&l()||"";p!==We&&(We=p,Ne.close()),Pe(),cn()})),Pe(),{load(){$e(),Pe()},refreshSessionDefaults:we,destroy(){for(let p of T.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Ft),e.removeEventListener("dragstart",Xt),e.removeEventListener("dragover",gn),e.removeEventListener("dragleave",fe),e.removeEventListener("dragend",S),e.removeEventListener("drop",Oe),e.removeEventListener("click",Gn),e.removeEventListener("change",jt);try{oe.destroy()}catch{}Se.hidden=!0;try{Ne.destroy()}catch{}rt(c``,e)}}}function Il(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Zf(e,t,n,r=async()=>{},s=async()=>{}){let o=qt("views:workspace-picker"),i=null,a=!1,l=!1,u=!1;async function d(j){let V=j.target.value,U=t.getState().workspace?.current?.path||"";if(V&&V!==U){o("switching workspace to %s",V),a=!0,D();try{await n(V)}catch(Z){o("workspace switch failed: %o",Z)}finally{a=!1,D()}}}async function m(){let j=t.getState(),Q=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!Q||l)){o("git-pulling workspace %s",Q),l=!0,D();try{await r(Q)}catch(V){o("workspace git pull failed: %o",V)}finally{l=!1,D()}}}function v(j){let Q=j.target;Q&&e.contains(Q)||N()}function b(j){j.key==="Escape"&&N()}function k(){u||(u=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",b),D())}function N(){u&&(u=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",b),D())}function W(){u?N():k()}async function K(j){let Q=j.target,V=Q.value,ue=Q.checked;o("toggling visibility %s \u2192 %s",V,String(ue));try{await s(V,ue)}catch(U){o("workspace visibility toggle failed: %o",U)}}function le(j){return j?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(j,Q){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
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
                ${j.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!Q.has(V.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Il(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let j=t.getState(),Q=j.workspace?.current,V=j.workspace?.available||[],ue=new Set(j.workspace?.hidden||[]),U=Q?.path||V[0]?.path||"";if(V.length===0)return c``;let Z=V.filter(ie=>!ue.has(ie.path)||ie.path===U);if(Z.length<=1){let ie=Z[0]||V[0],ne=Il(ie.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${ne}</span
          >
          ${Y(V,ue)}
          ${le(U)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${Z.map(ie=>c`
              <option
                value="${ie.path}"
                ?selected=${ie.path===U}
                title="${ie.path}"
              >
                ${Il(ie.path)}
              </option>
            `)}
        </select>
        ${Y(V,ue)}
        ${le(U)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){rt(B(),e)}return D(),i=t.subscribe(()=>D()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",b),rt(c``,e)}}}var Xf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ml(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Qf(e,t,n=Ml()){return{id:n,type:e,payload:t}}function Jf(e={}){let t=qt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,u=new Map,d=[],m=new Map,v=new Set;function b(B){for(let D of Array.from(v))try{D(B)}catch{}}function k(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),D=(n.jitterRatio||0)*B,j=Math.max(0,Math.round(B+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",j,i+1),a=setTimeout(()=>{a=null,Y()},j)}function N(B){try{s?.send(JSON.stringify(B))}catch(D){t("ws send failed",D)}}function W(){for(o="open",t("ws open"),b(o),i=0;d.length;){let B=d.shift();B&&N(B)}}function K(B){let D;try{D=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let Q=u.get(D.id);u.delete(D.id),D.ok?Q?.resolve(D.payload):Q?.reject(D.error||new Error("ws error"));return}let j=m.get(D.type);if(j&&j.size>0)for(let Q of Array.from(j))try{Q(D.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",D.type)}function le(){o="closed",t("ws closed"),b(o);for(let[B,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(B);i+=1,k()}function Y(){if(!l)return;let B=r();try{s=new WebSocket(B),t("ws connecting %s",B),o="connecting",b(o),s.addEventListener("open",W),s.addEventListener("message",K),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(D){t("ws connect failed %o",D),k()}}return Y(),{send(B,D){if(!Xf.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let j=Ml(),Q=Qf(B,D,j);return t("send %s id=%s",B,j),new Promise((V,ue)=>{u.set(j,{resolve:V,reject:ue,type:B}),s&&s.readyState===s.OPEN?N(Q):(t("queue %s id=%s (state=%s)",B,j,o),d.push(Q))})},on(B,D){m.has(B)||m.set(B,new Set);let j=m.get(B);return j?.add(D),()=>{j?.delete(D)}},onConnection(B){return v.add(B),()=>{v.delete(B)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,Y()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function Yv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Zv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Pl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],e_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Xv="bdui.worker.done-range",t_=nf,n_="worker:queue",r_="ui:order",s_="ui:display-policy",o_="exec:presets",br="tab:board:closed",i_="beads-ui.board.closed-range";function Qv(e){let t=qt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&$f(i),a&&l&&u&&d){let $e=function(x,O){let p="Request failed",h="";if(x&&typeof x=="object"){let ee=x;if(typeof ee.message=="string"&&ee.message.length>0&&(p=ee.message),typeof ee.details=="string")h=ee.details;else if(ee.details&&typeof ee.details=="object")try{h=JSON.stringify(ee.details,null,2)}catch{h=""}}else typeof x=="string"&&x.length>0&&(p=x);let L=O&&O.length>0?`Failed to load ${O}`:"Request failed";se.open(L,p,h)},he=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},ct=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Ne=null,We=null},Me=function(x){Je=x;let O=()=>{Je!==x||fe.getState().selected_id!==x||(Je=null,nt(x))};if(!te){bt.then(O);return}O()},pt=function(x,O,p,h,L){return p!==at[O]?(L().catch(()=>{}),!1):(x.set(h,L),!0)},zt=function(){let x=fe.getState();je(x.view==="board"),Ie(x.view==="worker"),Xe(ye(x)),Ae(x.view==="board"||x.view==="worker"||Et||!!x.selected_id)},It=function(){let x=$r(Ht);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},xt=function(){let x=$r(Lt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},je=function(x){if(x)for(let[O,p]of Pl){if(Fe.has(O)||dt.has(O))continue;let h=O===br?It():{type:p};try{Se.register(O,h)}catch(pe){t("register %s store failed: %o",O,pe)}dt.add(O);let L=at.board,ee=!1;be.subscribeList(O,h).then(pe=>{ee=!pt(Fe,"board",L,O,pe)}).catch(pe=>{t("subscribe %s failed: %o",O,pe),$e(pe,"board")}).finally(()=>{dt.delete(O),ee&&zt()})}else ge()},ge=function(){at.board+=1;for(let[x]of Pl){let O=Fe.get(x);O&&(O().catch(()=>{}),Fe.delete(x));try{Se.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Ie=function(x){if(!x){Be();return}for(let[O,p]of e_){if(C.has(O)||dt.has(O))continue;let h=O===gr?xt():{type:p};try{Se.register(O,h)}catch(pe){t("register %s store failed: %o",O,pe)}dt.add(O);let L=at.worker,ee=!1;be.subscribeList(O,h).then(pe=>{ee=!pt(C,"worker",L,O,pe)}).catch(pe=>{t("subscribe %s failed: %o",O,pe),$e(pe,"worker")}).finally(()=>{dt.delete(O),ee&&zt()})}},Be=function(){at.worker+=1;for(let[x]of e_){let O=C.get(x);O&&(O().catch(()=>{}),C.delete(x));try{Se.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Ae=function(x){if(!x){lt();return}H||(xe("subscribe-worker-queue",{id:n_}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),H=()=>xe("unsubscribe-worker-queue",{id:n_}))},lt=function(){H&&(H().catch(()=>{}),H=null)},ye=function(x){return x.view==="monitor"||x.selected_id!=null},Xe=function(x){if(!x){P();return}st||(xe("subscribe-monitor-pipeline",{id:t_}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),st=()=>xe("unsubscribe-monitor-pipeline",{id:t_}))},P=function(){st&&(st().catch(()=>{}),st=null)},ve=function(){F||(xe("subscribe-ui-order",{id:r_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),F=()=>xe("unsubscribe-ui-order",{id:r_}))},Ge=function(){F&&(F().catch(()=>{}),F=null),_t.clear()},Ze=function(){ke||(xe("subscribe-display-policy",{id:s_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),ke=()=>xe("unsubscribe-display-policy",{id:s_}))},ot=function(){ke&&(ke().catch(()=>{}),ke=null),wt.clear()},$t=function(){mt||(xe("subscribe-impl-presets",{id:o_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),mt=()=>xe("unsubscribe-impl-presets",{id:o_}))},Jt=function(x){if(!x)return"Unknown";let O=x.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},rn=function(x,O){nn.open(x.path,{missing_state:x.missing_state,...O?{workspace:O}:{}})};var m=$e,v=he,b=ct,k=Me,N=pt,W=zt,K=It,le=xt,Y=je,B=ge,D=Ie,j=Be,Q=Ae,V=lt,ue=ye,U=Xe,Z=P,ie=ve,ne=Ge,Ee=Ze,Ue=ot,me=$t,X=Jt,Te=rn;let Le=document.getElementById("header-loading"),T=Yc(Le),se=Ap(e),we=Jf(),xe=T.wrapSend((x,O)=>we.send(x,O)),be=Uc(xe),Se=Wc(),it=Hc(),ht=Tc(),_t=zc(),wt=Sc(),R=Ec(),oe=Cc();we.on("impl-presets-snapshot",x=>{let O=x;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&R.set({revision:O.revision,presets:O.presets})}),we.on("monitor-pipeline-snapshot",x=>{let O=x;if(!(!O||!Array.isArray(O.workspaces)))try{ht.set(O.workspaces,O.workspaces_state,O.cross_lanes)}catch{}}),we.on("ui-order-snapshot",x=>{let O=x;if(O&&typeof O.revision=="number")try{_t.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),we.on("display-policy-snapshot",x=>{let O=x;if(O&&O.policy&&typeof O.policy=="object")try{wt.set(O.policy)}catch{}}),we.on("session-log-snapshot",x=>{let O=x;if(O&&typeof O.id=="string")try{oe.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),we.on("session-log-append",x=>{let O=x;if(O&&typeof O.id=="string")try{oe.append(O.id,O.event)}catch{}}),we.on("snapshot",x=>{let O=x,p=O&&typeof O.id=="string"?O.id:"",h=p?Se.getStore(p):null;if(h&&O&&O.type==="snapshot")try{h.applyPush(O)}catch{}}),we.on("upsert",x=>{let O=x,p=O&&typeof O.id=="string"?O.id:"",h=p?Se.getStore(p):null;if(h&&O&&O.type==="upsert")try{h.applyPush(O)}catch{}}),we.on("delete",x=>{let O=x,p=O&&typeof O.id=="string"?O.id:"",h=p?Se.getStore(p):null;if(h&&O&&O.type==="delete")try{h.applyPush(O)}catch{}});let Ce=null,Ne=null,We=null,Je=null,tt=()=>{},bt=new Promise(x=>{tt=()=>x(void 0)}),te=!1,G=!1;async function nt(x){let O=he(x);if(O===Ne||O===We)return;We=O;let p=`detail:${x}`,h={type:"issue-detail",params:{id:x}};try{Se.register(p,h)}catch(L){t("register detail store failed: %o",L)}try{let L=await be.subscribeList(p,h);if(fe.getState().selected_id!==x||he(x)!==O){await L().catch(()=>{});return}Ce&&await Ce().catch(()=>{}),Ce=L,Ne=O}catch(L){t("detail subscribe failed: %o",L),$e(L,"issue details")}finally{We===O&&(We=null)}}let Fe=new Map,dt=new Set,at={board:0,worker:0},Et=!1,Ht=ko;try{let x=window.localStorage.getItem(i_);la(x)&&(Ht=x)}catch{}let Lt="today";try{let x=window.localStorage.getItem(Xv);x!==null&&(Lt=Kn(x))}catch{}async function I(x){if(!la(x)||x===Ht)return;Ht=x;try{window.localStorage.setItem(i_,x)}catch{}let O=Fe.get(br);if(!O)return;Fe.delete(br),await O().catch(()=>{});let p=It();try{Se.register(br,p)}catch(h){t("register %s store failed: %o",br,h)}try{let h=await be.subscribeList(br,p);Fe.set(br,h)}catch(h){t("re-subscribe %s failed: %o",br,h),$e(h,"board")}}async function J(x){let O=Kn(x);if(O===Lt)return;Lt=O;let p=C.get(gr);if(!p)return;C.delete(gr),await p().catch(()=>{});let h=xt();try{Se.register(gr,h)}catch(L){t("register %s store failed: %o",gr,L)}try{let L=await be.subscribeList(gr,h);C.set(gr,L)}catch(L){t("re-subscribe %s failed: %o",gr,L),$e(L,"worker")}}let C=new Map,H=null,st=null,F=null,ke=null,mt=null;async function Kt(){ke=null,wt.clear(),mt=null,R.clear(),H=null,st=null,Fe.clear(),C.clear(),at.board+=1,at.worker+=1,$t();let x=fe.getState().workspace.current?.path;if(x)try{await we.send("set-workspace",{path:x})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ze();let O=fe.getState();je(O.view==="board"),Ie(O.view==="worker"),Xe(ye(O)),Ae(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function Tt(){t("clearing all subscriptions for workspace switch"),ge(),Be(),lt(),it.clear(),Ge(),ve(),ot(),Ze(),ct();let x=fe.getState();if(x.selected_id)try{Se.unregister(`detail:${x.selected_id}`)}catch{}let O=fe.getState();je(O.view==="board"),Ie(O.view==="worker"),Xe(ye(O)),Ae(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&Me(O.selected_id)}async function Qt(x){t("requesting workspace switch to %s",x),G=!0;try{let O=await we.send("set-workspace",{path:x});t("workspace switch result: %o",O),O&&O.workspace&&(fe.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),O.changed&&(await Tt(),ce("Switched to "+Jt(x),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),ce("Failed to switch workspace","error",3e3),O}finally{G=!1}}async function Pe(x){t("requesting workspace git pull for %s",x);try{let O=await we.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let p=O?.status;if(p==="up_to_date"){ce("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Jt(x),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let p=O?.code,h=O?.message;if(p==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let L=h?`: ${h}`:"";throw ce(`Git pull failed${L}`,"error",3e3),O}}async function mn(x,O){t("setting workspace visibility %s \u2192 %s",x,String(O));try{await we.send("set-workspace-visibility",{path:x,visible:O}),await Ft()}catch(p){t("workspace visibility update failed: %o",p),ce("Failed to update project visibility","error",3e3)}}async function Ft(){try{let x=await we.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let O=x.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),p=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,h=Array.isArray(x.hidden)?x.hidden.filter(ee=>typeof ee=="string"):[];fe.setState({workspace:{current:p,available:O,hidden:h}});let L=window.localStorage.getItem("beads-ui.workspace");L&&(!O.some(pe=>pe.path===L)||h.includes(L)?window.localStorage.removeItem("beads-ui.workspace"):p&&L!==p.path&&(t("restoring saved workspace preference: %s",L),await Qt(L)))}}catch(x){t("failed to load workspaces: %o",x)}}we.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Ft(),Tt())});let Xt=!1;if(typeof we.onConnection=="function"){let x=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(Xt=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&Xt&&(Xt=!1,ce("Reconnected","success",2200),Zv(fe,(p,h)=>{t(`${p}: %o`,h)}),Kt())};we.onConnection(x)}let gn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(gn=x)}catch(x){t("view parse error: %o",x)}let fe=Vc({config:Yv(),view:gn});we.on("worker-queue-snapshot",x=>{let O=x;if(!O||!O.queue)return;let p=fe.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&O.root_dir!==p){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{it.set(O.queue)}catch{}});let S=Gc(fe);S.start();let de=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Oe=async(x,O)=>{try{return await xe(x,O)}catch(p){if(de.has(x))throw p;return[]}};sf({global_element:r,repo_element:s},fe,S);let yt=document.getElementById("workspace-picker");yt&&Zf(yt,fe,Qt,Pe,mn);let Rt=cf(e,(x,O)=>xe(x,O));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Rt.open())}catch{}let At=ff(e,{policyStore:wt,queueStore:it,implPresetStore:R,transport:(x,O)=>xe(x,O),onOpenChange:x=>{let O=Et;Et=x,zt(),O&&x===!1&&Mt.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[O]of Pl)for(let p of Se.snapshotFor(O)||[]){let h=p.labels;if(Array.isArray(h))for(let L of h)typeof L=="string"&&L.length>0&&x.add(L)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>At.open()))}catch{}let jt=document.createElement("div");jt.className="md-viewer-root",document.body.appendChild(jt);let nn=Pi(jt,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),En=uu(a,{gotoIssue:x=>S.gotoIssue(x),issueStores:Se,transport:Oe,workerQueueStore:it,uiOrderStore:_t,displayPolicyStore:wt,closedRange:Ht,onClosedRangeChange:x=>{I(x)},onNewIssue:()=>Rt.open(),openDoc:rn}),Mt=Ll(l,{transport:Oe,issueStores:Se,queueStore:it,sessionLogStore:oe,uiOrderStore:_t,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Qt(x),openDoc:rn,doneRange:Lt,onDoneRangeChange:x=>{J(x)}}),sn=rf(u,{transport:Oe,pipelineStore:ht,execPresetStore:R,sessionLogStore:oe,router:S,gotoIssue:x=>S.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Qt(x),openDoc:rn}),cn=xp(d,{issueStores:Se,transport:Oe,queueStore:it,execPresetStore:R,sessionLogStore:oe,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:nn,depCandidates:()=>{let x=ht.get();if(x===null)return null;let O=ht.getWorkspacesState(),p=fe.getState();if(p.view==="monitor")return za(x,O);let h=p.workspace.current?.path;return h?za(x,O,{root_dir:h}):null},subscribeCandidates:x=>ht.subscribe(x),onDepChanged:({type:x,a:O,b:p})=>{let h=sn;x==="dep-add"&&h&&typeof h.recorrectSharedLane=="function"&&h.recorrectSharedLane(x,O,p)},onNavigate:(x,O)=>{let p=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):S.gotoIssue(x)},h=fe.getState().workspace.current?.path;if(typeof O!="string"||O.length===0||!h||O===h){p();return}Promise.resolve(Qt(O)).then(p).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{S.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{At.open("execution")}}),un=fe.getState().selected_id;un&&(d.hidden=!1,cn.load(un),Me(un)),fe.subscribe(x=>{let O=x.selected_id;O?(d.hidden=!1,cn.load(O),G||Me(O)):(cn.clear(),d.hidden=!0,ct())});let Gn=x=>{a.hidden=x.view!=="board",l.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",o&&o.classList.toggle("is-quiet",x.view==="monitor"),je(x.view==="board"),Ie(x.view==="worker"),Xe(ye(x)),Ae(x.view==="board"||x.view==="worker"||Et||!!x.selected_id),!x.selected_id&&x.view==="board"&&En.load(),x.view==="worker"&&Mt.load(),x.view==="monitor"?sn.load():sn.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(Gn),Gn(fe.getState()),ve(),Ze(),$t(),Ft().finally(()=>{te=!0,tt()}),window.addEventListener("keydown",x=>{let O=x.ctrlKey||x.metaKey,p=String(x.key||"").toLowerCase(),h=x.target,L=h&&h.tagName?String(h.tagName).toLowerCase():"",ee=L==="input"||L==="textarea"||L==="select"||h&&typeof h.isContentEditable=="boolean"&&h.isContentEditable;O&&p==="n"&&(ee||(x.preventDefault(),Rt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Qv(t)});export{Qv as bootstrap,Yv as readBootstrapConfig,Zv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
