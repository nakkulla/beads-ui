var Ac=Object.create;var ks=Object.defineProperty;var Tc=Object.getOwnPropertyDescriptor;var Ec=Object.getOwnPropertyNames;var Cc=Object.getPrototypeOf,Rc=Object.prototype.hasOwnProperty;var Ic=(e,t,r)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Lc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ec(t))!Rc.call(e,s)&&s!==r&&ks(e,s,{get:()=>t[s],enumerable:!(n=Tc(t,s))||n.enumerable});return e};var Oc=(e,t,r)=>(r=e!=null?Ac(Cc(e)):{},Lc(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Ic(e,typeof t!="symbol"?t+"":t,r);var va=$s((n_,ba)=>{var Or=1e3,Dr=Or*60,Mr=Dr*60,$r=Mr*24,Fc=$r*7,qc=$r*365.25;ba.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Bc(e);if(r==="number"&&isFinite(e))return t.long?jc(e):Uc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Bc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*qc;case"weeks":case"week":case"w":return r*Fc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Or;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Uc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Mr?Math.round(e/Mr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Or?Math.round(e/Or)+"s":e+"ms"}function jc(e){var t=Math.abs(e);return t>=$r?Rn(e,t,$r,"day"):t>=Mr?Rn(e,t,Mr,"hour"):t>=Dr?Rn(e,t,Dr,"minute"):t>=Or?Rn(e,t,Or,"second"):e+" ms"}function Rn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var wa=$s((s_,ya)=>{function zc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=va(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let h=0;h<f.length;h++)m=(m<<5)-m+f.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,h=null,T,$;function E(...B){if(!E.enabled)return;let x=E,Y=Number(new Date),te=Y-(m||Y);x.diff=te,x.prev=m,x.curr=Y,m=Y,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let I=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(A,j)=>{if(A==="%%")return"%";I++;let P=r.formatters[j];if(typeof P=="function"){let ne=B[I];A=P.call(x,ne),B.splice(I,1),I--}return A}),r.formatArgs.call(x,B),(x.log||r.log).apply(x,B)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,$=r.enabled(f)),$),set:B=>{h=B}}),typeof r.init=="function"&&r.init(E),E}function n(f,m){let h=r(this.namespace+(typeof m>"u"?":":m)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,m){let h=0,T=0,$=-1,E=0;for(;h<f.length;)if(T<m.length&&(m[T]===f[h]||m[T]==="*"))m[T]==="*"?($=T,E=h,T++):(h++,T++);else if($!==-1)T=$+1,E++,h=E;else return!1;for(;T<m.length&&m[T]==="*";)T++;return T===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function l(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ya.exports=zc});var ka=$s((St,In)=>{St.formatArgs=Wc;St.save=Gc;St.load=Yc;St.useColors=Hc;St.storage=Vc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+In.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Gc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Yc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Vc(){try{return localStorage}catch{}}In.exports=wa()(St);var{formatters:Kc}=In.exports;Kc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Vr=globalThis,Cn=Vr.trustedTypes,sa=Cn?Cn.createPolicy("lit-html",{createHTML:e=>e}):void 0,da="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ua="?"+ir,Dc=`<${ua}>`,yr=document,Kr=()=>yr.createComment(""),Zr=e=>e===null||typeof e!="object"&&typeof e!="function",Rs=Array.isArray,Mc=e=>Rs(e)||typeof e?.[Symbol.iterator]=="function",xs=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oa=/-->/g,aa=/>/g,br=RegExp(`>|${xs}(?:([^\\s"'>=/]+)(${xs}*=${xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ia=/'/g,la=/"/g,pa=/^(?:script|style|textarea|title)$/i,Is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Is(1),Xt=Is(2),Zf=Is(3),wr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),ca=new WeakMap,vr=yr.createTreeWalker(yr,129);function fa(e,t){if(!Rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return sa!==void 0?sa.createHTML(t):t}var Nc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let l=0;l<r;l++){let c=e[l],u,f,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Yr?f[1]==="!--"?a=oa:f[1]!==void 0?a=aa:f[2]!==void 0?(pa.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Yr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?la:ia):a===la||a===ia?a=br:a===oa||a===aa?a=Yr:(a=br,s=void 0);let T=a===br&&e[l+1].startsWith("/>")?" ":"";o+=a===Yr?c+Dc:m>=0?(n.push(u),c.slice(0,m)+da+c.slice(m)+ir+T):c+ir+(m===-2?l:T)}return[fa(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Xr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Nc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=vr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(da)){let h=f[a++],T=s.getAttribute(m).split(ir),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:T,ctor:$[1]==="."?As:$[1]==="?"?Ts:$[1]==="@"?Es:Lr}),s.removeAttribute(m)}else m.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(pa.test(s.tagName)){let m=s.textContent.split(ir),h=m.length-1;if(h>0){s.textContent=Cn?Cn.emptyScript:"";for(let T=0;T<h;T++)s.append(m[T],Kr()),vr.nextNode(),c.push({type:2,index:++o});s.append(m[h],Kr())}}}else if(s.nodeType===8)if(s.data===ua)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ir,m+1))!==-1;)c.push({type:7,index:o}),m+=ir.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Ir(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Ir(e,s._$AS(e,t.values),s,n)),t}var Ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Qr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Cs(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Ir(this,t,r),Zr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Xr.createElement(fa(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ca.get(t.strings);return r===void 0&&ca.set(t.strings,r=new Xr(t)),r}k(t){Rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Kr()),this.O(Kr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Lr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Ir(this,t,r,0),a=!Zr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Ir(this,l[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Zr(u)||u!==this._$AH[c]),u===dt?t=dt:t!==dt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Lr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},Ts=class extends Lr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},Es=class extends Lr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Ir(this,t,r,0)??dt)===wr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ir(this,t)}};var Pc=Vr.litHtmlPolyfillSupport;Pc?.(Xr,Qr),(Vr.litHtmlVersions??(Vr.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Qr(t.insertBefore(Kr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function _a(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ga(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ha(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var $a=Oc(ka(),1);function at(e){return(0,$a.default)(`beads-ui:${e}`)}function Mt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Aa(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ta(e,t){let r=Mt(e.updated_at),n=Mt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ea(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Mt(e.created_at),o=Mt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ca(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function xa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Sa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Zc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ra(e,t){let r=xa(e),n=xa(t);if(r!==n)return r<n?-1:1;let s=Sa(e),o=Sa(t);if(s!==o)return s<o?-1:1;let a=Mt(e&&e.created_at),l=Mt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ls=2**20;function Nr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Mt(e&&e.created_at)}function Ln(e){return(t,r)=>{let n=Nr(t,e),s=Nr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:Nr(l,r)-Ls};if(!l)return{rank:Nr(a,r)+Ls};let c=Nr(a,r),u=Nr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Ls}))}}function Ds(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(h){if(l||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=T,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let B=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(B<=x){for(let Y of Object.keys(E))Y in $||delete E[Y];for(let[Y,te]of Object.entries($))E[Y]=te}}f()}o=T,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=T,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function On(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ia(e){let t=at("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let T of Array.from(u)){let $=r.get(T);if(!$)continue;let E=$.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of m)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&E.delete(B)}}async function o(l,c){let u=On(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let h=r.get(l)||null;if(h){let T=n.get(h.key);T&&(T.delete(l),T.size===0&&n.delete(h.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:On,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function La(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?On(u):"",h=r.get(c)||"",T=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),T&&h&&m&&h!==m){let $=t.get(c);if($)try{$.dispose()}catch{}let E=s.get(c);if(E){try{E()}catch{}s.delete(c)}let B=Ds(c,f);t.set(c,B);let x=B.subscribe(()=>o());s.set(c,x)}else if(!T){let $=Ds(c,f);t.set(c,$);let E=$.subscribe(()=>o());s.set(c,E)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Oa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Da(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ms(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Qc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ma(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Xc(n),a=Qc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ms(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ms(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Jc=Object.freeze({workspace_config:{default_workspace:null}});function Na(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jc.workspace_config.default_workspace}}}function Pa(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Na(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Na(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Fa(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,h)=>{let T=s++,$=Date.now();n.set(T,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",T,m,r+1),a();let E=!1,B=()=>{E||(E=!0,n.delete(T),l())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,m,Date.now()-$),B())},3e4);try{let Y=await u(m,h),te=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",T,m,te),Y}catch(Y){let te=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,m,te,Y),Y}finally{clearTimeout(x),B()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ee(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Dn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Ca),c;switch(l){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(Aa),c;case"updated_desc":return c.sort(Ta),c;case"priority":return c.sort(Ea),c;case"manual":default:{let u=r();return u?c.sort(Ln(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=Qt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=Qt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Mn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Nn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Os(l,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let T=n(Os(l,c,h.order),a);s(h,T);let $=await t("ui-order-set",{expected_revision:h.revision,entries:T});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Pn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ns(e,t){return!t||typeof e!="string"||e.length===0||Pn(t.visible_labels).includes(e)?!0:Pn(t.hidden_labels).includes(e)?!1:!Pn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Fn(e,t){return Pn(e).filter(r=>Ns(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var ed={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ba={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},qa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},td={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function rd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ua(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function nd(e){if(!e||e.fill==="none"||!e.approval_state)return Ua(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function sd(e,t,r){let n=ed[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=td[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Ba[e]||e}
      </div>
    </div>
  `}function qn(e,t){if(!e||!e.stages)return"";let r=qa[e.route]||qa.spec_backed,n=e.stages,s=rd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ba[a]||a} ${a==="plan"?nd(n[a]||{}):Ua(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>sd(a,n[a]||{},a===s))}
    </div>
  `}function od(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ja=2;function ad(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ja).join(", "),s=r.length-ja,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function id(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Fn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...ad(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function ld(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function cd(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function dd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ra):r.children;return i`
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
        ${cd(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,l)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${ld(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Bn(e,t){let r=od(e.priority);return i`
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
      ${id(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?qn(e.workflow,e.status):""}
      ${dd(e,t)}
    </article>
  `}function Pr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Ht.map(o=>i`<option
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
        ${e.items.map(o=>Bn(o,t))}
      </div>
    </section>
  `}function za(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Bn(n,t))}
        </div>
      </div>
    </dialog>
  `}var ud=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],pd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],fd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function _d(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Ha(e,t,r){return i`
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
        ${ud.map(n=>i`<option
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
        ${pd.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${_d(e,t,r)}
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
        ${fd.map(n=>i`<option
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
  `}var md=200,gd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},hd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Wa="beads-ui.board.sort",Ga=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function bd(){try{let e=window.localStorage.getItem(Wa);if(e&&Ga.has(e))return e}catch{}return"created_desc"}function Ya(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||At,h=s?Dn(s,a):null,T=Nn({transport:o,uiOrderStore:a}),$=[],E=[],B=[],x=[],Y=[],te=[],I=!1,O=0,A=bd(),j=new Map,P=new Map,ne=new Map,Ee=new Set,ie={search:"",priority:"",type:"",labels:[]},he=!1,ke=null;function He(U){return String(U.status||"open")==="open"}function et(U){let V=String(U.status||"open");return V==="open"||V==="blocked"}function Re(U){let V=ie.search.trim().toLowerCase(),Z=ie.priority,pe=ie.type,ye=ie.labels;return U.filter(Te=>{if(V){let Ye=String(Te.id||"").toLowerCase(),nt=String(Te.title||"").toLowerCase();if(!Ye.includes(V)&&!nt.includes(V))return!1}if(Z!==""&&String(Te.priority)!==Z||pe!==""&&String(Te.issue_type||"")!==pe)return!1;if(ye.length>0){let Ye=Array.isArray(Te.labels)?Te.labels:[];if(!ye.some(nt=>Ye.includes(nt)))return!1}return!0})}function Fe(){let U=new Set;for(let V of[$,E,B,x,Y,te])for(let Z of V){let pe=Array.isArray(Z.labels)?Z.labels:[];for(let ye of pe)typeof ye=="string"&&ye.length>0&&U.add(ye)}return Array.from(U).sort()}function be(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function _e(){try{if(h){let U=h.selectBoardColumn("tab:board:in-progress","in_progress",A),V=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(et),Z=new Set(U.map(we=>we.id)),pe=h.selectBoardColumn("tab:board:ready","ready",A).filter(we=>He(we)&&!Z.has(we.id)),ye=h.selectBoardColumn("tab:board:resolved","resolved",A),Te=h.selectBoardColumn("tab:board:deferred","deferred",A),Ye=h.selectBoardColumn("tab:board:closed","closed").slice(0,md),nt=[...V,...pe,...U,...ye,...Ye];Ae(nt);let Se=new Set;for(let we of nt)we&&we.id&&!Ps(we)&&Se.add(we.id);let Ve=!be();$=Ve?Jr(V,Se):V,E=Ve?Jr(pe,Se):pe,B=Ve?Jr(U,Se):U,x=Ve?Jr(ye,Se):ye,Y=Te,O=Te.length,te=Ve?Jr(Ye,Se):Ye,j=new Map;for(let we of $)j.set(we.id,"open");for(let we of E)j.set(we.id,"open");for(let we of B)j.set(we.id,"in_progress");for(let we of x)j.set(we.id,"resolved");for(let we of Y)j.set(we.id,"deferred");for(let we of te)j.set(we.id,"closed");P=new Map;for(let we of $)P.set(we.id,"blocked-col");for(let we of E)P.set(we.id,"ready-col");for(let we of B)P.set(we.id,"in-progress-col");for(let we of x)P.set(we.id,"resolved-col");for(let we of te)P.set(we.id,"closed-col")}De()}catch{$=[],E=[],B=[],x=[],Y=[],te=[],ne=new Map,De()}}function Ae(U){let V=new Map;for(let pe of U)pe&&pe.id&&!V.has(pe.id)&&V.set(pe.id,pe);let Z=new Map;for(let pe of V.values()){let ye=Ps(pe);if(!ye)continue;let Te=Z.get(ye);Te||(Te=[],Z.set(ye,Te)),Te.push({id:pe.id,title:pe.title,status:pe.status,metadata:pe.metadata,created_at:pe.created_at,updated_at:pe.updated_at})}ne=Z}function me(U){let V=ne.get(U)||[],Z=0;for(let ye of V)(ye.status==="resolved"||ye.status==="closed")&&(Z+=1);let pe=Mn(V);return{total:V.length,count:Z,current:pe,children:V}}function G(U){return!Ee.has(U)}function K(U,V){U.preventDefault(),U.stopPropagation(),Ee.has(V)?Ee.delete(V):Ee.add(V),De()}function Ie(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function de(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function le(U,V){ke||n(V)}function R(U,V){U.preventDefault(),U.stopPropagation(),vd(V).then(Z=>{Z&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function q(U,V){ke=V,U.dataTransfer&&(U.dataTransfer.setData("text/plain",V),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function ce(U){U.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{ke=null},0)}function Ue(U){let V=String(U.target.value||"");!V||V===m||(m=V,u&&u(V),De())}function Ce(){return l?l.get():null}function ve(U){let V=c?c.get():null,Z=V?V.cleanup_failed:null;if(!Z||typeof Z!="object"||Array.isArray(Z))return null;let pe=Z[U];return!pe||typeof pe!="object"||Array.isArray(pe)?null:pe}let $e={onCardClick:le,onCopyId:R,onDragStart:q,onDragEnd:ce,onClosedRangeChange:Ue,rollupFor:me,isExpanded:G,onRollupToggle:K,onChildClick:Ie,onFromChipClick:de,cleanupFailureFor:ve,get policy(){return Ce()}};function Xe(U,V){ke||(W(),n(V))}function qe(U,V){U.preventDefault(),U.stopPropagation(),W(),n(V)}let We={...$e,onCardClick:Xe,onChildClick:qe,onFromChipClick:qe,get policy(){return Ce()}};function D(U){let V=U.target,Z=e.querySelector(".board-filter__labels");V&&Z&&Z.contains(V)||y()}function z(U){U.key==="Escape"&&y()}function F(){he||(he=!0,document.addEventListener("mousedown",D),document.addEventListener("keydown",z),De())}function y(){he&&(he=!1,document.removeEventListener("mousedown",D),document.removeEventListener("keydown",z),De())}function C(U){U.key==="Escape"&&W()}function L(){I||(I=!0,document.addEventListener("keydown",C),De())}function W(){I&&(I=!1,document.removeEventListener("keydown",C),De())}let J={onClose:W,onOverlayClick(U){U.target===U.currentTarget&&W()}},Oe={onSearchInput(U){ie.search=String(U.target.value||""),_e()},onPriorityChange(U){ie.priority=String(U.target.value||""),_e()},onTypeChange(U){ie.type=String(U.target.value||""),_e()},onSortChange(U){let V=String(U.target.value||"");if(!(!Ga.has(V)||V===A)){A=V;try{window.localStorage.setItem(Wa,V)}catch{}_e()}},onDeferredToggle(){I?W():L()},onLabelMenuToggle(){he?y():F()},onLabelToggle(U){let V=ie.labels.indexOf(U);V===-1?ie.labels.push(U):ie.labels.splice(V,1),_e()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],_e())},onNewIssue(){f&&f()}};function xe(){return i`
      <div class="board-view">
        ${Ha(ie,Oe,{sort_mode:A,deferred_popup_open:I,deferred_count:O,label_options:Fe(),label_menu_open:he})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:Re($)},$e)}
          ${Pr({title:"Ready",id:"ready-col",items:Re(E)},$e)}
          ${Pr({title:"In progress",id:"in-progress-col",items:Re(B)},$e)}
          ${Pr({title:"Resolved",id:"resolved-col",items:Re(x)},$e)}
          ${Pr({title:"Closed",id:"closed-col",items:Re(te),is_closed:!0,closed_range:m},$e)}
        </div>
        ${I?za({items:Re(Y),count:O},We,J):""}
      </div>
    `}function De(){Be(xe(),e),Ge()}function Ge(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Z of V)Array.from(Z.querySelectorAll(".board-card")).forEach((ye,Te)=>{ye.tabIndex=Te===0?0:-1})}catch{}}async function it(U,V){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:V}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Z){r("update-status failed: %o",Z),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function rt(U){switch(U){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return B;case"resolved-col":return x;default:return[]}}function _t(U,V,Z){if(!o||!a)return;let pe=rt(U),ye=pe.find(Ve=>Ve.id===V);if(!ye)return;let Te=pe.filter(Ve=>Ve.id!==V),Ye=Z.closest?Z.closest(".board-card"):null,nt=Te.length;if(Ye){let Ve=Ye.getAttribute("data-issue-id");if(Ve===V)return;let we=Te.findIndex(ut=>ut.id===Ve);we>=0&&(nt=we)}let Se=Te.slice();Se.splice(nt,0,ye),T.applyReorder(V,Se,nt)}function $t(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let Z=U.target.closest(".board-column");Z&&Z!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),Z.classList.add("board-column--drag-over"),ot=Z)}),e.addEventListener("dragleave",U=>{let V=U.relatedTarget;(!V||!e.contains(V))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",U=>{U.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let V=U.target,Z=V.closest(".board-column");if(!Z)return;let pe=U.dataTransfer?.getData("text/plain")||"";if(!pe)return;let ye=Z.id,Te=P.get(pe);if(Te&&Te===ye){if(hd.has(ye)){if(A!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}_t(ye,pe,V)}return}let Ye=gd[ye];if(!Ye){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}j.get(pe)!==Ye&&it(pe,Ye)}),e.addEventListener("keydown",U=>{let V=U.target;if(!(V instanceof HTMLElement))return;let Z=String(V.tagName||"").toLowerCase();if(Z==="input"||Z==="textarea"||Z==="select"||Z==="button"||Z==="a"||V.isContentEditable===!0)return;let pe=V.closest(".board-card");if(!pe)return;let ye=String(U.key||"");if(ye==="Enter"||ye===" "){U.preventDefault();let Se=pe.getAttribute("data-issue-id");Se&&n(Se);return}if(ye!=="ArrowUp"&&ye!=="ArrowDown"&&ye!=="ArrowLeft"&&ye!=="ArrowRight")return;U.preventDefault();let Te=pe.closest(".board-column");if(!Te)return;let Ye=Array.from(Te.querySelectorAll(".board-card")),nt=Ye.indexOf(pe);if(ye==="ArrowDown"&&nt<Ye.length-1){lt(pe,Ye[nt+1]);return}if(ye==="ArrowUp"&&nt>0){lt(pe,Ye[nt-1]);return}if(ye==="ArrowLeft"||ye==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),Ve=Se.indexOf(Te),we=ye==="ArrowRight"?1:-1,ut=Ve+we;for(;ut>=0&&ut<Se.length;){let bt=Se[ut].querySelector(".board-card");if(bt){lt(pe,bt);return}ut+=we}}});function lt(U,V){try{U.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let st=null;h&&h.subscribe&&(st=h.subscribe(()=>{try{_e()}catch{}}));let ct=null;l&&l.subscribe&&(ct=l.subscribe(()=>{try{_e()}catch{}}));let ht=null;return c&&c.subscribe&&(ht=c.subscribe(()=>{De()})),{async load(){r("load"),_e()},clear(){y(),W(),st&&(st(),st=null),ct&&(ct(),ct=null),ht&&(ht(),ht=null),e.replaceChildren(),$=[],E=[],B=[],x=[],Y=[],te=[],j=new Map,P=new Map}}}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Jr(e,t){return e.filter(r=>{let n=Ps(r);return!(n&&t.has(n))})}async function vd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function yd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Jt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await yd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Qa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var er=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],en=[...er,"reasoning_output_tokens"],wd=["implementation","review-consult"];function Fs(e){let t=0;for(let r of er)t+=ft(e?.[r]);return t}function kd(e){return!e||typeof e!="object"?!1:er.some(t=>Number.isFinite(e[t]))}function Va(e){return!e||typeof e!="object"?!1:en.some(t=>Number.isFinite(e[t]))}function $d(e){let t={};for(let r of en)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ka(e){let t={};for(let r of en)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Za(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Fs(t)}function xd(e){return e==="claude"?"Claude":"Codex"}function Sd(e){return`\u03C4 ${Ja(e)}`}function Ad(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Qa),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${xd(r)} ${Sd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ad(r,n)})}return t}function jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of en)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=ft(l.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qs(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Td(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:$d(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Un(e,t,r){e.subtotal+=t.subtotal;for(let n of en)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Xa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ja(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Fr(e){return kd(e)?`\u03C4 ${Ja(Fs(e))}`:null}function Nt(e){let t=Fr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function qr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Fs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Qa),r.join(`
`)}function It(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Va(c)){let f=Td(l.runner),m=Ka(c),h={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Za(f,m)};m.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Un(r[f],h,!0),Un(n.orchestrator[f],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!wd.includes(f.role)||!Va(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=Ka(f.usage),T={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:Za("codex",h)};T.receipt_id=m,typeof f.model=="string"&&(T.model=f.model),typeof f.session_id=="string"?T.session_id=f.session_id:typeof f.thread_id=="string"&&(T.session_id=f.thread_id),typeof f.turn_id=="string"&&(T.turn_id=f.turn_id),typeof f.completed_at=="string"&&(T.completed_at=f.completed_at),h.replayed===!0&&(T.replayed=!0),Un(r.codex,T,!1),Un(n[T.role].codex,T,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Xa(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...Xa(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:li,setPrototypeOf:ei,isFrozen:Ed,getPrototypeOf:Cd,getOwnPropertyDescriptor:Rd}=Object,{freeze:yt,seal:Lt,create:Gs}=Object,{apply:Ys,construct:Vs}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Lt||(Lt=function(t){return t});Ys||(Ys=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Vs||(Vs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var zn=wt(Array.prototype.forEach),Id=wt(Array.prototype.lastIndexOf),ti=wt(Array.prototype.pop),tn=wt(Array.prototype.push),Ld=wt(Array.prototype.splice),Wn=wt(String.prototype.toLowerCase),Bs=wt(String.prototype.toString),Us=wt(String.prototype.match),rn=wt(String.prototype.replace),Od=wt(String.prototype.indexOf),Dd=wt(String.prototype.trim),Pt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),nn=Md(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ys(e,t,n)}}function Md(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Vs(e,r)}}function Pe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Wn;ei&&ei(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ed(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nd(e){for(let t=0;t<e.length;t++)Pt(e,t)||(e[t]=null);return e}function tr(e){let t=Gs(null);for(let[r,n]of li(e))Pt(e,r)&&(Array.isArray(n)?t[r]=Nd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=tr(n):t[r]=n);return t}function sn(e,t){for(;e!==null;){let n=Rd(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Cd(e)}function r(){return null}return r}var ri=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),js=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zs=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pd=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fd=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ni=yt(["#text"]),si=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ws=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qd=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Ud=Lt(/\$\{[\w\W]*/gm),jd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),zd=Lt(/^aria-[\-\w]+$/),ci=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hd=Lt(/^(?:\w+script|data):/i),Wd=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),di=Lt(/^html$/i),Gd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),ai=Object.freeze({__proto__:null,ARIA_ATTR:zd,ATTR_WHITESPACE:Wd,CUSTOM_ELEMENT:Gd,DATA_ATTR:jd,DOCTYPE_NAME:di,ERB_EXPR:Bd,IS_ALLOWED_URI:ci,IS_SCRIPT_OR_DATA:Hd,MUSTACHE_EXPR:qd,TMPLIT_EXPR:Ud}),on={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yd=function(){return typeof window>"u"?null:window},Vd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ii=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ui(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yd(),t=X=>ui(X);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==on.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:T}=e,$=c.prototype,E=sn($,"cloneNode"),B=sn($,"remove"),x=sn($,"nextSibling"),Y=sn($,"childNodes"),te=sn($,"parentNode");if(typeof a=="function"){let X=r.createElement("template");X.content&&X.content.ownerDocument&&(r=X.content.ownerDocument)}let I,O="",{implementation:A,createNodeIterator:j,createDocumentFragment:P,getElementsByTagName:ne}=r,{importNode:Ee}=n,ie=ii();t.isSupported=typeof li=="function"&&typeof te=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:ke,TMPLIT_EXPR:He,DATA_ATTR:et,ARIA_ATTR:Re,IS_SCRIPT_OR_DATA:Fe,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:_e}=ai,{IS_ALLOWED_URI:Ae}=ai,me=null,G=Pe({},[...ri,...js,...zs,...Hs,...ni]),K=null,Ie=Pe({},[...si,...Ws,...oi,...Hn]),de=Object.seal(Gs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),le=null,R=null,q=Object.seal(Gs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ce=!0,Ue=!0,Ce=!1,ve=!0,$e=!1,Xe=!0,qe=!1,We=!1,D=!1,z=!1,F=!1,y=!1,C=!0,L=!1,W="user-content-",J=!0,Oe=!1,xe={},De=null,Ge=Pe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),it=null,rt=Pe({},["audio","video","img","source","image","track"]),_t=null,$t=Pe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",ct=st,ht=!1,U=null,V=Pe({},[ot,lt,st],Bs),Z=Pe({},["mi","mo","mn","ms","mtext"]),pe=Pe({},["annotation-xml"]),ye=Pe({},["title","style","font","a","script"]),Te=null,Ye=["application/xhtml+xml","text/html"],nt="text/html",Se=null,Ve=null,we=r.createElement("form"),ut=function(v){return v instanceof RegExp||v instanceof Function},bt=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ve&&Ve===v)){if((!v||typeof v!="object")&&(v={}),v=tr(v),Te=Ye.indexOf(v.PARSER_MEDIA_TYPE)===-1?nt:v.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?Bs:Wn,me=Pt(v,"ALLOWED_TAGS")?Pe({},v.ALLOWED_TAGS,Se):G,K=Pt(v,"ALLOWED_ATTR")?Pe({},v.ALLOWED_ATTR,Se):Ie,U=Pt(v,"ALLOWED_NAMESPACES")?Pe({},v.ALLOWED_NAMESPACES,Bs):V,_t=Pt(v,"ADD_URI_SAFE_ATTR")?Pe(tr($t),v.ADD_URI_SAFE_ATTR,Se):$t,it=Pt(v,"ADD_DATA_URI_TAGS")?Pe(tr(rt),v.ADD_DATA_URI_TAGS,Se):rt,De=Pt(v,"FORBID_CONTENTS")?Pe({},v.FORBID_CONTENTS,Se):Ge,le=Pt(v,"FORBID_TAGS")?Pe({},v.FORBID_TAGS,Se):tr({}),R=Pt(v,"FORBID_ATTR")?Pe({},v.FORBID_ATTR,Se):tr({}),xe=Pt(v,"USE_PROFILES")?v.USE_PROFILES:!1,ce=v.ALLOW_ARIA_ATTR!==!1,Ue=v.ALLOW_DATA_ATTR!==!1,Ce=v.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=v.SAFE_FOR_TEMPLATES||!1,Xe=v.SAFE_FOR_XML!==!1,qe=v.WHOLE_DOCUMENT||!1,z=v.RETURN_DOM||!1,F=v.RETURN_DOM_FRAGMENT||!1,y=v.RETURN_TRUSTED_TYPE||!1,D=v.FORCE_BODY||!1,C=v.SANITIZE_DOM!==!1,L=v.SANITIZE_NAMED_PROPS||!1,J=v.KEEP_CONTENT!==!1,Oe=v.IN_PLACE||!1,Ae=v.ALLOWED_URI_REGEXP||ci,ct=v.NAMESPACE||st,Z=v.MATHML_TEXT_INTEGRATION_POINTS||Z,pe=v.HTML_INTEGRATION_POINTS||pe,de=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(Ue=!1),F&&(z=!0),xe&&(me=Pe({},ni),K=[],xe.html===!0&&(Pe(me,ri),Pe(K,si)),xe.svg===!0&&(Pe(me,js),Pe(K,Ws),Pe(K,Hn)),xe.svgFilters===!0&&(Pe(me,zs),Pe(K,Ws),Pe(K,Hn)),xe.mathMl===!0&&(Pe(me,Hs),Pe(K,oi),Pe(K,Hn))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?q.tagCheck=v.ADD_TAGS:(me===G&&(me=tr(me)),Pe(me,v.ADD_TAGS,Se))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?q.attributeCheck=v.ADD_ATTR:(K===Ie&&(K=tr(K)),Pe(K,v.ADD_ATTR,Se))),v.ADD_URI_SAFE_ATTR&&Pe(_t,v.ADD_URI_SAFE_ATTR,Se),v.FORBID_CONTENTS&&(De===Ge&&(De=tr(De)),Pe(De,v.FORBID_CONTENTS,Se)),J&&(me["#text"]=!0),qe&&Pe(me,["html","head","body"]),me.table&&(Pe(me,["tbody"]),delete le.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=v.TRUSTED_TYPES_POLICY,O=I.createHTML("")}else I===void 0&&(I=Vd(T,s)),I!==null&&typeof O=="string"&&(O=I.createHTML(""));yt&&yt(v),Ve=v}},Vt=Pe({},[...js,...zs,...Pd]),Bt=Pe({},[...Hs,...Fd]),Ut=function(v){let H=te(v);(!H||!H.tagName)&&(H={namespaceURI:ct,tagName:"template"});let oe=Wn(v.tagName),Le=Wn(H.tagName);return U[v.namespaceURI]?v.namespaceURI===lt?H.namespaceURI===st?oe==="svg":H.namespaceURI===ot?oe==="svg"&&(Le==="annotation-xml"||Z[Le]):!!Vt[oe]:v.namespaceURI===ot?H.namespaceURI===st?oe==="math":H.namespaceURI===lt?oe==="math"&&pe[Le]:!!Bt[oe]:v.namespaceURI===st?H.namespaceURI===lt&&!pe[Le]||H.namespaceURI===ot&&!Z[Le]?!1:!Bt[oe]&&(ye[oe]||!Vt[oe]):!!(Te==="application/xhtml+xml"&&U[v.namespaceURI]):!1},mt=function(v){tn(t.removed,{element:v});try{te(v).removeChild(v)}catch{B(v)}},xt=function(v,H){try{tn(t.removed,{attribute:H.getAttributeNode(v),from:H})}catch{tn(t.removed,{attribute:null,from:H})}if(H.removeAttribute(v),v==="is")if(z||F)try{mt(H)}catch{}else try{H.setAttribute(v,"")}catch{}},jt=function(v){let H=null,oe=null;if(D)v="<remove></remove>"+v;else{let Ke=Us(v,/^[\r\n\t ]+/);oe=Ke&&Ke[0]}Te==="application/xhtml+xml"&&ct===st&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let Le=I?I.createHTML(v):v;if(ct===st)try{H=new h().parseFromString(Le,Te)}catch{}if(!H||!H.documentElement){H=A.createDocument(ct,"template",null);try{H.documentElement.innerHTML=ht?O:Le}catch{}}let Qe=H.body||H.documentElement;return v&&oe&&Qe.insertBefore(r.createTextNode(oe),Qe.childNodes[0]||null),ct===st?ne.call(H,qe?"html":"body")[0]:qe?H.documentElement:Qe},Ot=function(v){return j.call(v.ownerDocument||v,v,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},p=function(v){return v instanceof m&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof f)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},w=function(v){return typeof l=="function"&&v instanceof l};function S(X,v,H){zn(X,oe=>{oe.call(t,v,H,Ve)})}let se=function(v){let H=null;if(S(ie.beforeSanitizeElements,v,null),p(v))return mt(v),!0;let oe=Se(v.nodeName);if(S(ie.uponSanitizeElement,v,{tagName:oe,allowedTags:me}),Xe&&v.hasChildNodes()&&!w(v.firstElementChild)&&vt(/<[/\w!]/g,v.innerHTML)&&vt(/<[/\w!]/g,v.textContent)||v.nodeType===on.progressingInstruction||Xe&&v.nodeType===on.comment&&vt(/<[/\w]/g,v.data))return mt(v),!0;if(!(q.tagCheck instanceof Function&&q.tagCheck(oe))&&(!me[oe]||le[oe])){if(!le[oe]&&ge(oe)&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,oe)||de.tagNameCheck instanceof Function&&de.tagNameCheck(oe)))return!1;if(J&&!De[oe]){let Le=te(v)||v.parentNode,Qe=Y(v)||v.childNodes;if(Qe&&Le){let Ke=Qe.length;for(let _=Ke-1;_>=0;--_){let d=E(Qe[_],!0);d.__removalCount=(v.__removalCount||0)+1,Le.insertBefore(d,x(v))}}}return mt(v),!0}return v instanceof c&&!Ut(v)||(oe==="noscript"||oe==="noembed"||oe==="noframes")&&vt(/<\/no(script|embed|frames)/i,v.innerHTML)?(mt(v),!0):($e&&v.nodeType===on.text&&(H=v.textContent,zn([he,ke,He],Le=>{H=rn(H,Le," ")}),v.textContent!==H&&(tn(t.removed,{element:v.cloneNode()}),v.textContent=H)),S(ie.afterSanitizeElements,v,null),!1)},fe=function(v,H,oe){if(C&&(H==="id"||H==="name")&&(oe in r||oe in we))return!1;if(!(Ue&&!R[H]&&vt(et,H))){if(!(ce&&vt(Re,H))){if(!(q.attributeCheck instanceof Function&&q.attributeCheck(H,v))){if(!K[H]||R[H]){if(!(ge(v)&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,v)||de.tagNameCheck instanceof Function&&de.tagNameCheck(v))&&(de.attributeNameCheck instanceof RegExp&&vt(de.attributeNameCheck,H)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(H,v))||H==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&vt(de.tagNameCheck,oe)||de.tagNameCheck instanceof Function&&de.tagNameCheck(oe))))return!1}else if(!_t[H]){if(!vt(Ae,rn(oe,be,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&v!=="script"&&Od(oe,"data:")===0&&it[v])){if(!(Ce&&!vt(Fe,rn(oe,be,"")))){if(oe)return!1}}}}}}}return!0},ge=function(v){return v!=="annotation-xml"&&Us(v,_e)},ue=function(v){S(ie.beforeSanitizeAttributes,v,null);let{attributes:H}=v;if(!H||p(v))return;let oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0},Le=H.length;for(;Le--;){let Qe=H[Le],{name:Ke,namespaceURI:_,value:d}=Qe,k=Se(Ke),b=d,N=Ke==="value"?b:Dd(b);if(oe.attrName=k,oe.attrValue=N,oe.keepAttr=!0,oe.forceKeepAttr=void 0,S(ie.uponSanitizeAttribute,v,oe),N=oe.attrValue,L&&(k==="id"||k==="name")&&(xt(Ke,v),N=W+N),Xe&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,N)){xt(Ke,v);continue}if(k==="attributename"&&Us(N,"href")){xt(Ke,v);continue}if(oe.forceKeepAttr)continue;if(!oe.keepAttr){xt(Ke,v);continue}if(!ve&&vt(/\/>/i,N)){xt(Ke,v);continue}$e&&zn([he,ke,He],Q=>{N=rn(N,Q," ")});let re=Se(v.nodeName);if(!fe(re,k,N)){xt(Ke,v);continue}if(I&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!_)switch(T.getAttributeType(re,k)){case"TrustedHTML":{N=I.createHTML(N);break}case"TrustedScriptURL":{N=I.createScriptURL(N);break}}if(N!==b)try{_?v.setAttributeNS(_,Ke,N):v.setAttribute(Ke,N),p(v)?mt(v):ti(t.removed)}catch{xt(Ke,v)}}S(ie.afterSanitizeAttributes,v,null)},je=function X(v){let H=null,oe=Ot(v);for(S(ie.beforeSanitizeShadowDOM,v,null);H=oe.nextNode();)S(ie.uponSanitizeShadowNode,H,null),se(H),ue(H),H.content instanceof o&&X(H.content);S(ie.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(X){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,oe=null,Le=null,Qe=null;if(ht=!X,ht&&(X="<!-->"),typeof X!="string"&&!w(X))if(typeof X.toString=="function"){if(X=X.toString(),typeof X!="string")throw nn("dirty is not a string, aborting")}else throw nn("toString is not a function");if(!t.isSupported)return X;if(We||bt(v),t.removed=[],typeof X=="string"&&(Oe=!1),Oe){if(X.nodeName){let d=Se(X.nodeName);if(!me[d]||le[d])throw nn("root node is forbidden and cannot be sanitized in-place")}}else if(X instanceof l)H=jt("<!---->"),oe=H.ownerDocument.importNode(X,!0),oe.nodeType===on.element&&oe.nodeName==="BODY"||oe.nodeName==="HTML"?H=oe:H.appendChild(oe);else{if(!z&&!$e&&!qe&&X.indexOf("<")===-1)return I&&y?I.createHTML(X):X;if(H=jt(X),!H)return z?null:y?O:""}H&&D&&mt(H.firstChild);let Ke=Ot(Oe?X:H);for(;Le=Ke.nextNode();)se(Le),ue(Le),Le.content instanceof o&&je(Le.content);if(Oe)return X;if(z){if(F)for(Qe=P.call(H.ownerDocument);H.firstChild;)Qe.appendChild(H.firstChild);else Qe=H;return(K.shadowroot||K.shadowrootmode)&&(Qe=Ee.call(n,Qe,!0)),Qe}let _=qe?H.outerHTML:H.innerHTML;return qe&&me["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&vt(di,H.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+_),$e&&zn([he,ke,He],d=>{_=rn(_,d," ")}),I&&y?I.createHTML(_):_},t.setConfig=function(){let X=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(X),We=!0},t.clearConfig=function(){Ve=null,We=!1},t.isValidAttribute=function(X,v,H){Ve||bt({});let oe=Se(X),Le=Se(v);return fe(oe,Le,H)},t.addHook=function(X,v){typeof v=="function"&&tn(ie[X],v)},t.removeHook=function(X,v){if(v!==void 0){let H=Id(ie[X],v);return H===-1?void 0:Ld(ie[X],H,1)[0]}return ti(ie[X])},t.removeHooks=function(X){ie[X]=[]},t.removeAllHooks=function(){ie=ii()},t}var pi=ui();var fi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},_i=e=>(...t)=>({_$litDirective$:e,values:t}),Gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var an=class extends Gn{constructor(t){if(super(t),this.it=dt,t.type!==fi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};an.directiveName="unsafeHTML",an.resultType=1;var mi=_i(an);function Qs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Qs();function ki(e){Tr=e}var un={exec:()=>null};function ze(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(kt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zd=/^(?:[ \t]*(?:\n|$))+/,Xd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Js=/(?:[*+-]|\d{1,9}[.)])/,$i=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xi=ze($i).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),eu=ze($i).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tu=/^[^\n]+/,to=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ru=ze(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",to).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nu=ze(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Js).getRegex(),Qn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,su=ze("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ro).replace("tag",Qn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Si=ze(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),ou=ze(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Si).getRegex(),no={blockquote:ou,code:Xd,def:ru,fences:Qd,heading:Jd,hr:pn,html:su,lheading:xi,list:nu,newline:Zd,paragraph:Si,table:un,text:tu},gi=ze("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),au={...no,lheading:eu,table:gi,paragraph:ze(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex()},iu={...no,html:ze(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:un,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ze(eo).replace("hr",pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ai=/^( {2,}|\\)\n(?!\s*$)/,du=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jn=/[\p{P}\p{S}]/u,so=/[\s\p{P}\p{S}]/u,Ti=/[^\s\p{P}\p{S}]/u,uu=ze(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,so).getRegex(),Ei=/(?!~)[\p{P}\p{S}]/u,pu=/(?!~)[\s\p{P}\p{S}]/u,fu=/(?:[^\s\p{P}\p{S}]|~)/u,_u=ze(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ci=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mu=ze(Ci,"u").replace(/punct/g,Jn).getRegex(),gu=ze(Ci,"u").replace(/punct/g,Ei).getRegex(),Ri="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",hu=ze(Ri,"gu").replace(/notPunctSpace/g,Ti).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),bu=ze(Ri,"gu").replace(/notPunctSpace/g,fu).replace(/punctSpace/g,pu).replace(/punct/g,Ei).getRegex(),vu=ze("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ti).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),yu=ze(/\\(punct)/,"gu").replace(/punct/g,Jn).getRegex(),wu=ze(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ku=ze(ro).replace("(?:-->|$)","-->").getRegex(),$u=ze("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ku).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Kn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xu=ze(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Kn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ii=ze(/^!?\[(label)\]\[(ref)\]/).replace("label",Kn).replace("ref",to).getRegex(),Li=ze(/^!?\[(ref)\](?:\[\])?/).replace("ref",to).getRegex(),Su=ze("reflink|nolink(?!\\()","g").replace("reflink",Ii).replace("nolink",Li).getRegex(),hi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oo={_backpedal:un,anyPunctuation:yu,autolink:wu,blockSkip:_u,br:Ai,code:cu,del:un,emStrongLDelim:mu,emStrongRDelimAst:hu,emStrongRDelimUnd:vu,escape:lu,link:xu,nolink:Li,punctuation:uu,reflink:Ii,reflinkSearch:Su,tag:$u,text:du,url:un},Au={...oo,link:ze(/^!?\[(label)\]\((.*?)\)/).replace("label",Kn).getRegex(),reflink:ze(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Kn).getRegex()},Ks={...oo,emStrongRDelimAst:bu,emStrongLDelim:gu,url:ze(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ze(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hi).getRegex()},Tu={...Ks,br:ze(Ai).replace("{2,}","*").getRegex(),text:ze(Ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yn={normal:no,gfm:au,pedantic:iu},ln={normal:oo,gfm:Ks,breaks:Tu,pedantic:Au},Eu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bi=e=>Eu[e];function rr(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,bi)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,bi);return e}function vi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function yi(e,t){let r=e.replace(kt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function cn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function wi(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Ru(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zn=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:cn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Ru(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=cn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:cn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=cn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(h?.type==="list"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-h.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],T=!m.trim(),$=0;if(this.options.pedantic?($=2,f=m.trimStart()):T?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=m.slice($),$+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex($),B=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),Y=this.rules.other.headingBeginRegex($),te=this.rules.other.htmlBeginRegex($);for(;e;){let I=e.split(`
`,1)[0],O;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||Y.test(h)||te.test(h)||E.test(h)||B.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+O.slice($);else{if(T||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||Y.test(m)||B.test(m))break;f+=`
`+h}!T&&!h.trim()&&(T=!0),u+=I+`
`,e=e.substring(I.length+1),m=O.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=yi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(yi(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=cn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),wi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return wi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let T=m.slice(1,-1);return{type:"em",raw:m,text:T,tokens:this.lexer.inlineTokens(T)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Zs{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:Yn.normal,inline:ln.normal};this.options.pedantic?(r.block=Yn.pedantic,r.inline=ln.pedantic):this.options.gfm&&(r.block=Yn.gfm,this.options.breaks?r.inline=ln.breaks:r.inline=ln.gfm),this.tokenizer.rules=r}static get rules(){return{block:Yn,inline:ln}}static lex(t,r){return new Zs(r).lex(t)}static lexInline(t,r){return new Zs(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},m),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Xn=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+rr(n)+'">'+(r?s:rr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:rr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=vi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=vi(e);if(s===null)return rr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Xs{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ao}static parse(t,r){return new Xs(r).parse(t)}static parseInline(t,r){return new Xs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Vn,dn=(Vn=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},tt(Vn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(Vn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vn),Iu=class{constructor(...e){tt(this,"defaults",Qs());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",qt);tt(this,"Renderer",Xn);tt(this,"TextRenderer",ao);tt(this,"Lexer",Ft);tt(this,"Tokenizer",Zn);tt(this,"Hooks",dn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Xn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new dn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];dn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&dn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,u);return c.call(s,m)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+rr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new Iu;function Je(e,t){return Ar.parse(e,t)}Je.options=Je.setOptions=function(e){return Ar.setOptions(e),Je.defaults=Ar.defaults,ki(Je.defaults),Je};Je.getDefaults=Qs;Je.defaults=Tr;Je.use=function(...e){return Ar.use(...e),Je.defaults=Ar.defaults,ki(Je.defaults),Je};Je.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Je.parseInline=Ar.parseInline;Je.Parser=qt;Je.parser=qt.parse;Je.Renderer=Xn;Je.TextRenderer=ao;Je.Lexer=Ft;Je.lexer=Ft.lex;Je.Tokenizer=Zn;Je.Hooks=dn;Je.parse=Je;var vm=Je.options,ym=Je.setOptions,wm=Je.use,km=Je.walkTokens,$m=Je.parseInline;var xm=qt.parse,Sm=Ft.lex;function pr(e){let t=Je.parse(e),r=pi.sanitize(t);return mi(r)}function nr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Br(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function es(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Lu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ou=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Du=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function io(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Oi(e,t){let r=io(e),n=io(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Mu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Lu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=io(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Oi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=Oi(fr(l)?l.old_string:"",fr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Di(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Mi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ou.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Du.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Pu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Mi(o.text));else if(o.type==="thinking"){let a=Di(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Mu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Fu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Mi(t.text)];if(t.type==="reasoning"){let r=Di(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function qu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ni(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!fr(o))continue;let a=qu(o)?Fu(o):Pu(o,r);for(let l of a)t.push(l)}return t}var Bu=5,Uu=10,ju=/Task\s+#(\d+)/,zu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Hu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Wu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Gu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Yu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=ju.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Vu(e){if(e.tool==="Bash"){let t=e.command||"";return zu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Hu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ku(e){let t=e.filter(s=>s.kind==="tool").slice(-Uu),r=new Map;t.forEach((s,o)=>{let a=Vu(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Zu(e){let t=Gu(e);if(t)return{text:t,guess:!1};let r=Yu(e);if(r)return{text:r,guess:!1};let n=Ku(e);return n?{text:n,guess:!0}:null}function Xu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function rs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,u=new Set,f=null,m=null,h=!1,T=!1,$=!1,E=null,B=null;function x(){h=!1,T=!1,$=!1,E=null,B=null}async function Y(R){if(r){T=!0,$=!1,be();try{let q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!q||typeof q!="object"||Array.isArray(q)?$=!0:(E=q,B=R)}catch{o===R&&($=!0)}finally{o===R&&(T=!1,be())}}}function te(){if(h=!h,h&&o&&B!==o){Y(o);return}be()}function I(){if(!h)return"";let R=Br({loading:T,error:$});if(R)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!E)return"";if(E.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let q=es(E.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${q?i`<div class="prompt-block__meta">${q} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let R=n.get(o);return Ni(R?R.lines:[])}function A(){if(!o||!n)return null;let R=n.get(o),q=R?R.last_event_at:null;return typeof q=="number"?q:null}function j(){return a.status==="running"}function P(){if(j()&&o){m||(m=setInterval(()=>be(),1e3));return}ne()}function ne(){m&&(clearInterval(m),m=null)}function Ee(R){let q=[],ce=0;for(;ce<R.length;){let Ue=R[ce];if(Ue.kind==="tool"){let Ce=ce;for(;Ce<R.length&&R[Ce].kind==="tool"&&R[Ce].tool===Ue.tool;)Ce+=1;if(Ce-ce>=Bu&&!u.has(ce)){q.push({kind:"group",idx:ce,tool:Ue.tool||"",lines:R.slice(ce,Ce).map((ve,$e)=>({idx:ce+$e,line:ve}))}),ce=Ce;continue}}q.push({kind:"line",idx:ce,line:Ue}),ce+=1}return q}function ie(R){for(let q=R.length-1;q>=0;q-=1){let ce=R[q];if(ce.kind==="result"||ce.kind==="error")return null;if(ce.kind==="tool"&&!Object.hasOwn(ce,"result"))return ce}return null}function he(R){for(let q=R.length-1;q>=0;q-=1)if(R[q].kind==="thinking")return R[q];return null}function ke(R,q){if(q.kind==="gate")return i`<div class="sv__gate">${q.text}</div>`;if(q.kind==="phase")return i`<div class="sv__phase">${q.text}</div>`;if(q.kind==="result")return i`<div
        class="sv__result${q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(q.text||(q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(q.kind==="thinking"){let ce=c.has(R);return i`<div
        class="sv__think${ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(R)}
      >
        <span class="sv__think-line">💭 ${ts(q.text)}</span>
        ${ce?i`<pre class="sv__think-expand">${q.text}</pre>`:""}
      </div>`}if(q.kind==="error")return i`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="blocker")return i`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="tool"){let ce=c.has(R),Ue=q.tool==="Bash"?Wu(q.command):0,Ce=q.tool==="Bash"?Ue>1?ts(q.command):q.command:q.path||q.command||"";return i`<div
        class="sv__tool${ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${q.icon}</span>
          <span class="sv__tool-name">${q.tool}</span>
          ${Ce?i`<span class="sv__tool-detail">${Ce}</span>`:""}
          ${Ue>1?i`<span class="sv__tool-more">⋯ ${Ue}줄</span>`:""}
          ${typeof q.added=="number"?i`<span class="sv__diff-add">+${q.added}</span>`:""}
          ${typeof q.removed=="number"?i`<span class="sv__diff-del">−${q.removed}</span>`:""}
          ${q.result?i`<span class="sv__tool-ok">→ ${q.result}</span>`:""}
        </span>
        ${ce?i`<pre class="sv__tool-expand">${He(q)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${pr(q.text||"")}</div>`}function He(R){let q=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)q.push(R.command);else if(R.input!==void 0)try{q.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&q.push(`output:
${R.output}`),q.join(`

`)}function et(){if(!o)return i``;let R=O(),q=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ce=a.session_id||"",Ue=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Ce=j(),ve=Ce?Xu(A(),Date.now()):"",$e=Ce?ie(R):null,Xe=Ce?he(R):null,qe=Zu(R);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${qe?i`<span
              class="sv__stage${qe.guess?" sv__stage--guess":""}"
              title=${qe.text}
              >${qe.text}</span
            >`:""}
        ${Ce?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?i`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${ce?i`<button
              type="button"
              class="sv__session"
              title=${ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ce}`}
              @click=${()=>G(ce)}
            >
              ⧉ ${ce.slice(0,8)}
            </button>`:""}
        ${q?i`<span class="sv__meta">${q}</span>`:""}
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
          @click=${te}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Ue}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${Ue}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>le()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${R.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:Ee(R).map(We=>We.kind==="group"?Re(We):ke(We.idx,We.line))}
      </div>
      ${$e||Xe?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$e?i`<span class="sv__now-icon">${$e.icon}</span>
                  <span class="sv__now-name">${$e.tool}</span>
                  <span class="sv__now-detail"
                    >${$e.tool==="Bash"?ts($e.command):$e.path||$e.command||""}</span
                  >`:""}
            ${Xe?i`<span class="sv__now-think"
                  >💭 ${ts(Xe.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Re(R){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Fe(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Fe(R){u.add(R),be()}function be(){Be(et(),e),P(),l&&_e()}function _e(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function Ae(R){c.has(R)?c.delete(R):c.add(R),be()}function me(){l=!l,be()}function G(R){Sr(R).then(q=>{q?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function K(R){!o||!R||(a={...a,...R},be())}function Ie(R){let q=R.target;if(!q||!q.classList||!q.classList.contains("sv__body"))return;!(q.scrollHeight-q.scrollTop-q.clientHeight<=4)&&l&&(l=!1,be())}e.addEventListener("scroll",Ie,!0);function de(R){let q=R&&R.attempt_id;q&&(o=q,a=R.meta||{},l=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(be)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),be())}function le(){let R=o;o=null,c.clear(),u.clear(),x(),ne(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),Be(i``,e),s&&s()}return{open:de,updateMeta:K,close:le,isOpen(){return o!==null},destroy(){ne(),f&&(f(),f=null),e.removeEventListener("scroll",Ie,!0),o=null,Be(i``,e)}}}function fn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Pi(t.spec_id),s=Pi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Pi(e){return typeof e=="string"?e.trim():""}function Qu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Ju(e){let t=e&&e.metadata||{},r=fn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Qu(t)?null:"plan_pending"}),n}function Fi(e,t){let r=Ju(e);return i`
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
  `}var ep="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",tp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,rp=/^\*\*결론\*\* — (.+)$/;function ns(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ep)return null;let r=tp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?rp.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var qi=20;function Bi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function np(e){return e.length>qi?`${e.slice(0,qi)}\u2026`:e}function sp(e,t,r,n){let s=`${t.lane} ${np(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Bi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function op(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ui(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=ns(typeof c.text=="string"?c.text:"");return u?sp(c,u,t,s.has(c.id)):op(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
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
  `}var ap=["codex","opus","fable","self","skip"],ip=["codex","fable","skip"],lp=["low","medium","high","xhigh"],cp=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],co=["impl_runtime","orchestration_model"],_n=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],uo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ji={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},dp=["self","skip"],up="opus",po={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function fo(e){let t=uo[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function pp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:po[e]||"(\uAE30\uBCF8)"}function Ur(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Ur(e)||!Ur(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ur(r)&&Ur(r.models));return t.length>0?t:null}function lo(e){return{value:e,label:e}}function _o(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function zi(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[lo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,l])=>({label:a,options:Object.keys(l.models).map(lo)})),o=s.some(a=>a.options.some(l=>l.value===t));return t&&!o?[_o(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(lo)};return t&&!e.includes(t)?[_o(t),r]:[r]}function sr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function mo(e,t){return Ur(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fp(e,t){return Ur(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():mo(e,t)}function _p(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return fp(n,n.models[t]);return[]}function mp(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function go(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mo(n,n.models[t]);return[]}function Gi(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of mo(n,s))r.includes(o)||r.push(o);return r}function Yi(e,t){if(!t)return Gi(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of go(e,o))s.includes(a)||s.push(a);return s}function os(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=sr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?go(t,n.impl_model):Yi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function jr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||up,a=r("impl_model"),l=r("impl_runtime"),c=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?sr(n,o):s:null;return Er.map(u=>{let f=t(u),m,h=!1;return u==="orchestration_model"?m=zi(n,f):u==="impl_runtime"?m=_r(["inherit","claude","codex"],f):u==="impl_model"?(m=c?zi(n,f,c):f?[_o(f)]:[],h=l==="inherit"&&c===null):u==="orchestration_effort"?m=_r(_p(n,o),f):u==="orchestration_speed"?m=gp(mp(n,o),f):u==="impl_effort"?(m=_r(a?go(n,a):c?Yi(n,c):Gi(n),f),h=l==="inherit"&&c===null):u==="plan_review_model"?m=_r(ip,f):Object.hasOwn(ji,u)?(m=_r(lp,f),h=dp.includes(r(ji[u]))):m=_r(ap,f),{key:u,groups:m,selected:f,disabled:h,runner:u==="orchestration_model"?sr(n,o):null}})}function ss(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Hi(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Hi(s,t))}
          </optgroup>`)}
  `}function gp(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Hi(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Wi(e,t,r,n,s,o,a){return i`
    <div class="detail-kv">
      <span class="detail-kv__k">${fo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${l=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,l.target.value):a.onChange(e,l.target.value)}
        >
          ${t}
        </select>
        ${o?i`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function hp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function bp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,l=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let h=t(f)||"codex",T=t(m);return`${u} ${h}${T?`/${T}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:l.join(" \xB7 ")}];return i`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>i`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${hp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Vi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},l=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let E=l($);return E||(typeof a[$]=="string"?a[$]:"")},u=jr({selectedOf:l,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),h=_n.flatMap($=>$.keys).filter($=>l($)).length,T=$=>{let E=m.get($);return E?Wi(E.key,ss(E.groups,E.selected,pp(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${bp(l,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Wi("workflow_mode",ss(_r(cp,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${co.map(T)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${_n.map($=>i`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(T)}
          </section>`)}
    </details>
  `}function vp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ki(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${vp(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Be(u(),e)}async function m($,E={}){s=$,o="loading",a="",l="",f();let B=r?r():"";if(!B){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent($);try{let Y=await n(x),te=await Y.json().catch(()=>({}));if(!Y.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||Y.status)+")",f();return}a=String(te.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Be(i``,e)}function T(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:T}}var yp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Qi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function kp(e){let t=gt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Fr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Qi}
          >부분 집계</span
        >`:""}`}function Zi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Xi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ji(t):""}function $p(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Xi(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Xi(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function xp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...yp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${wp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Qi}</span>`:""}
  </div>`}var Sp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ji(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ap(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function el(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),T=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${$}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Zi(qs(u));if(gt(f).length===0&&!Fr(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${kp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=qs(u),m=Zi(f),h=gt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Sp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?i`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(T=>i`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Fr(u.usage)?i`<span class="detail-session__usage"
                    >${Fr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ji(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Ap(u)}
          ${s.has(u.attempt_id)&&u.usage?xp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${$p(f)}
        </div>`})}
    </div>
  `}function tl(e,t={}){return i`
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
          ${Tp(e)}
        </div>`:""}
  `}function Tp(e){let t=Br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=es(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Ep=["open","in_progress","deferred","resolved","closed"],Cp=[0,1,2,3,4];function rl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},h="",T=!1,$=!1,E=!1,B="",x="",Y="";function te(){$=!1,E=!1,B="",x="",Y=""}let I=[],O=null,A=null,j=!1,P="",ne=!1,Ee=0,ie=new Set;function he(){I=[],O=null,A=null,j=!1,P="",ne=!1,Ee+=1,ie.clear()}async function ke(d){if(!s)return;let k=++Ee;try{let b=await Promise.resolve(s("get-comments",{id:d}));if(k!==Ee||d!==u)return;I=Array.isArray(b)?b:[],j=!1}catch{if(k!==Ee||d!==u)return;j=!0}_()}function He(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(O!==u){O=u,A=d,ke(u);return}d!==null&&d!==A&&(A=d,ke(u))}function et(d){ie.has(d)?ie.delete(d):ie.add(d),_()}function Re(d){let k=P.trim().length===0;P=d,k!==(d.trim().length===0)&&_()}async function Fe(){let d=P.trim();if(!s||!u||d.length===0||ne)return;let k=u;ne=!0,_();let b=!1;try{let N=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(N)&&N.length>0&&(b=!0,k===u&&(I=N,j=!1,P="",A=N.length))}catch{b=!1}b||ee("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(ne=!1),_()}let be={onToggle:et,onDraftInput:Re,onSubmit:Fe},_e=document.createElement("div");_e.className="md-viewer-root",document.body.appendChild(_e);let Ae=Ki(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let G=rs(me,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),K=!1,Ie=!1,de=!1,le=null,R=null,q=0;function ce(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Ue(){K=!1,Ie=!1,de=!1,le=null,R=null,q+=1}async function Ce(d){if(!s)return;let k=++q;Ie=!0,de=!1,_();try{let b=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==q)return;!b||typeof b!="object"||Array.isArray(b)?de=!0:(le=b,R=ce(d))}catch{k===q&&(de=!0)}finally{k===q&&(Ie=!1,_())}}function ve(){if(K=!K,K&&u&&R!==ce(u)){le=null,Ce(u);return}_()}function $e(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(b=>b&&b.bead_id===u).sort((b,N)=>(N.started_at||0)-(b.started_at||0)).map(b=>({attempt_id:b.attempt_id,bead_id:b.bead_id,status:b.status,started_at:typeof b.started_at=="number"?b.started_at:null,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,session_id:b.session_id||null,resumed_from:b.resumed_from||null,continuation_mode:b.continuation_mode||null,dismissed_at:typeof b.dismissed_at=="number"?b.dismissed_at:null,cause:typeof b.cause=="string"?b.cause:null,cause_detail:b.cause_detail||null,exec_default_preset_id:typeof b.exec_default_preset_id=="string"?b.exec_default_preset_id:null,exec_default_preset_revision:typeof b.exec_default_preset_revision=="number"?b.exec_default_preset_revision:null,exec_values:b.exec_values&&typeof b.exec_values=="object"?b.exec_values:null,usage:b.usage||null,usage_legs:Array.isArray(b.usage_legs)?b.usage_legs:[]}))}function Xe(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let qe=new Set;function We(d){qe.has(d)?qe.delete(d):qe.add(d),_()}function D(d){let k=a?a.get():null,b=k&&k.attempts?k.attempts[d]:null;G.open({attempt_id:d,meta:b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}})}async function z(d){if(!s||!d)return;let k=()=>{let Q=a?a.get():null;return Q&&typeof Q.revision=="number"?Q.revision:0},b=async(Q={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...Q}),N=Q=>{Q?.queue&&a?.set&&a.set(Q.queue)},re=await b();if(N(re),re&&re.conflict){let Q=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:k();re=await s("worker-attempt-resume",{attempt_id:d,expected_revision:Q}),N(re)}re=await Jt(re,(Q,Ne)=>b({continuation:Q,decision_token:Ne}),{onResult:N,refresh:()=>b()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}let F={onOpen:D,onResume:z,onToggleUsage:We};function y(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,b=typeof k=="string"?J()?.presets.find(N=>N.id===k):null;return b&&b.compatible!==!1&&b.settings?b.settings:{}}function C(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,b=typeof k=="string"?J()?.presets.find(N=>N.id===k):null;return b&&b.compatible!==!1&&typeof b.name=="string"?b.name:""}function L(){let d=a?a.get():null;return d&&d.runner_catalog||null}function W(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},b=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof y().orchestration_model=="string"?y().orchestration_model:"")||"opus";return sr(L(),b)}function J(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Oe(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},b=N=>typeof k[N]=="string"?k[N]:N==="impl_runtime"&&typeof k.impl_model=="string"&&sr(L(),k.impl_model)||"";return jr({selectedOf:b,effectiveOf:b,runner_catalog:L()}).some(N=>N.groups.some(re=>re.options.some(Q=>Q.value===N.selected&&Q.label.endsWith("(\uBE44\uD638\uD658)"))))}function xe(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function De(){let d=J(),k=d?.presets.find(b=>b.id===h);if(!(!s||!u||!d||!k||Oe(k)||T)){T=!0,_();try{let b=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(b&&b.conflict){xe(b),ee("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let N=b&&Array.isArray(b.issue)?b.issue[0]:b?.issue;if(b&&b.applied&&N&&typeof N=="object"){f=N;for(let re of Er)delete m[re];ee("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}b&&b.error==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(b){b&&typeof b=="object"&&b.code==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,_()}}}function Ge(){let d=J();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],b=k.find(re=>re.id===h),N=b?Oe(b):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||T}
          @change=${re=>{h=re.target.value,_()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(re=>{let Q=Oe(re);return i`<option
              value=${re.id}
              ?selected=${re.id===h}
            >
              ${re.name}${Q?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!b||N||T}
          @click=${()=>{De()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let it=null;r&&r.subscribe&&(it=r.subscribe(()=>ot()));let rt=null;a&&typeof a.subscribe=="function"&&(rt=a.subscribe(()=>{u&&_()}));let _t=null;l&&typeof l.subscribe=="function"&&(_t=l.subscribe(()=>{u&&_()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function ot(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(b=>b&&b.id===u)||d[0]||f}He(),_()}}function lt(d){Sr(d).then(k=>{k?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(d){d.preventDefault(),d.stopPropagation(),u&&lt(u)}function ct(d,k){d.preventDefault(),d.stopPropagation(),lt(k)}function ht(d,k,b){d.preventDefault(),d.stopPropagation(),Ae.open(k,{missing_state:b})}function U(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function V(d,k){let b=f||{},N=b.metadata&&typeof b.metadata=="object"?b.metadata:{},re={};for(let Me of["impl_runtime","impl_model","impl_effort"])re[Me]=Object.hasOwn(m,Me)?m[Me]:typeof N[Me]=="string"?N[Me]:"";re[d]=k;let Q=os(re,L(),W()),Ne={};for(let Me of["impl_runtime","impl_model","impl_effort"])Ne[Me]=m[Me],m[Me]=Q[Me]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Q,orchestration_runtime:W()})).then(Me=>{let Kt=Array.isArray(Me)?Me[0]:Me;if(!Kt||typeof Kt!="object"||!Kt.id)throw new Error("implementation target readback failed");f=Kt;for(let _s of["impl_runtime","impl_model","impl_effort"])delete m[_s];_()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])Ne[Me]===void 0?delete m[Me]:m[Me]=Ne[Me];_(),ee("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Z(d,k,b){if(!s||!u)return!1;try{let N=await Promise.resolve(s(d,k)),re=Array.isArray(N)?N[0]:N;return re&&typeof re=="object"&&re.id?(f=re,!0):(ee(b,"error"),!1)}catch{return ee(b,"error"),!1}}function pe(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function ye(){$=!0,B=f&&f.title||"",_(),pe('.detail-edit__input[data-edit="title"]')}function Te(d){B=d.target.value}function Ye(){$=!1,B="",_()}function nt(){Z("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,B=""),_()})}function Se(){E=!0,x=f&&f.description||"",_(),pe('.detail-edit__textarea[data-edit="description"]')}function Ve(d){x=d.target.value}function we(){E=!1,x="",_()}function ut(){Z("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),_()})}function bt(d,k,b,N){if(d.key==="Escape"){d.stopPropagation(),b();return}d.key==="Enter"&&(!N||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Vt(d){let k=d.target.value;Z("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Bt(d){let k=Number(d.target.value);Z("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Ut(d){Y=d.target.value}function mt(){let d=Y.trim();d.length!==0&&Z("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(Y=""),_()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),Y="",_();return}d.key==="Enter"&&(d.preventDefault(),mt())}function jt(d){Z("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let Ot={onCopyPath:ct,onOpenDoc:ht},p={onChange:U,onImplTargetChange:V};function w(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function S(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function se(d){let b=(Array.isArray(d.dependencies)?d.dependencies:[]).map(N=>({id:w(N),icon:S(N)})).filter(N=>N.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${b.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${b.map(N=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(N.id)}
                  >
                    ${N.icon?`${N.icon} `:""}${N.id}
                  </button>`:i`<span class="detail-dep"
                    >${N.icon?`${N.icon} `:""}${N.id}</span
                  >`)}
          </div>`}
    `}function fe(d){let k=d.metadata||{},b=d.workflow||{},N=b.stages||{},re=N.spec&&N.spec.stale,Q=N.impl&&N.impl.stale,Ne=N.plan||null,Me=b.route_source==="derived",Kt=b.route||k.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":Kt}</span
        >
      </div>
      ${b.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${re?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ne?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ne?.approval_receipt||"\uC5C6\uC74C"}${Ne?.approval_state==="stale"?" \xB7 stale":Ne?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${b.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${b.exec_receipt.kind}:${b.exec_receipt.actor}@${b.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${b.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${b.impl_entry.actor}@${b.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let ge={route:["quick_fix","spec_backed","full_plan"]};async function ue(d,k){let b=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&b!=="full_plan"&&!window.confirm(`full_plan \u2192 ${b||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await Z("update-workflow-meta",{id:u,key:d,value:b},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function je(d){let k=d.metadata||{};return i` ${((N,re)=>{let Q=ge[N],Ne=typeof k[N]=="string"?k[N]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${N}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${N}
          data-edit=${`wfmeta-${N}`}
          @change=${Me=>ue(N,Me)}
        >
          <option value="" ?selected=${!Q.includes(Ne)}>
            ${re}
          </option>
          ${Q.map(Me=>i`<option value=${Me} ?selected=${Ne===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function X(d,k){return $?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${Te}
            @keydown=${b=>bt(b,nt,Ye,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${nt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ye}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${gt(k).map(b=>i`<span class="detail-usage-total" title=${b.tooltip}
              >${b.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ye}
        >
          ✎
        </button>
      </div>
    `}function v(d){let k=pt(d.created_at),b=pt(d.updated_at);return!k&&!b?i``:i`
      ${k?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${b?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${b}</span>
          </div>`:""}
    `}function H(d,k){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${Ep.map(b=>i`<option value=${b} ?selected=${b===d}>${b}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Bt}
        >
          ${Cp.map(b=>i`<option value=${String(b)} ?selected=${b===k}>
                P${b}
              </option>`)}
        </select>
      </div>
    `}function oe(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
            >
              ✎
            </button>`}
      </div>
      ${E?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ve}
              @keydown=${k=>bt(k,ut,we,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ut}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${we}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Le(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Qe(d){let k=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(b=>i`<span class="detail-label-chip"
              >${b}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${b}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+b}
                @click=${()=>jt(b)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Y}
            @input=${Ut}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${mt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ke(){if(!u)return i``;let d=f||{},k=String(d.id||u),b=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",N=Xe(),re=d.status||"open",Q=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ne=d.description||"",Me={...d,metadata:{...d.metadata||{},...m}};return i`
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
            @click=${st}
          >
            ${k}
          </button>
          ${X(b,N)}
          ${H(re,Q)} ${v(d)}
          ${oe(Ne)}
          ${Ui(I,be,{expanded:ie,draft:P,sending:ne,error:j})}
          ${Le(d)} ${Qe(d)} ${se(d)}
          ${fe(d)} ${je(d)}
          ${Fi(d,Ot)}
          ${Ge()}
          ${Vi(Me,p,y(),L(),C())}
          ${tl({expanded:K,loading:Ie,error:de,data:le},{onToggle:ve})}
          ${el($e(),F,{total:N,expanded:qe})}
        </div>
      </div>
    `}function _(){Be(Ke(),e)}return{load(d){d!==u&&(m={},h="",te(),he(),Ue()),u=d,f=null,ot()},clear(){u=null,f=null,m={},h="",T=!1,te(),he(),Ue(),Ae.close(),G.close(),Be(i``,e)},destroy(){it&&(it(),it=null),rt&&(rt(),rt=null),_t&&(_t(),_t=null),document.removeEventListener("keydown",$t),Ae.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),G.destroy(),me.parentNode&&me.parentNode.removeChild(me),u=null,f=null,h="",T=!1,he(),Ue(),Be(i``,e)}}}var Rp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function nl(e,t){return Ns(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ip(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function sl(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(A){let j=r.get();if(j)try{let P=await n("display-policy-set",{expected_revision:j.revision,policy:A(j)});c(P),P&&P.conflict&&P.policy&&(P=await n("display-policy-set",{expected_revision:P.policy.revision,policy:A(P.policy)}),c(P)),P&&P.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let j=r.get();if(!j)return;let P=nl(A,j)!=="shown";l(ne=>Ip(A,ne,P))}function f(){let A=a.trim();A.length!==0&&(a="",l(j=>j.hidden_prefixes.includes(A)?{hidden_prefixes:j.hidden_prefixes}:{hidden_prefixes:[...j.hidden_prefixes,A]}),B())}function m(A){l(j=>({hidden_prefixes:j.hidden_prefixes.filter(P=>P!==A)}))}function h(A){let j=r.get();if(!j)return;let P=j.chips[A]===!1;l(()=>({chips:{[A]:P}}))}function T(A){let j=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${j.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${j.map(P=>{let ne=nl(P,A);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ne}`}
                  data-label=${P}
                  data-state=${ne}
                  @click=${()=>u(P)}
                >
                  ${P}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(j=>i`<span class="display-settings__prefix">
                ${j}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${j} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(j)}
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
            @input=${j=>{a=String(j.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(A){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Rp.map(([j,P])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${j}
                  .checked=${A.chips[j]!==!1}
                  @change=${()=>h(j)}
                />
                <span>${P}</span>
              </label>`)}
        </div>
      </section>
    `}function B(){let A=r.get();Be(i`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?i`${T(A)} ${$(A)}
                ${E(A)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,Y=()=>{x=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let te=null;r.subscribe&&(te=r.subscribe(()=>{x&&B()}));function I(){x||(a="",x=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:O,destroy(){x=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),te&&(te(),te=null),o.remove()}}}function ol(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function as(e,t){let{queueStore:r,presetStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=null,l=!1;function c(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let y=c();return typeof y.revision=="number"?y.revision:0}function f(){let y=n?n.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function m(y){n&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&n.set({revision:y.revision,presets:y.presets})}function h(y){y&&y.queue&&r&&r.set(y.queue)}function T(){return c().runner_catalog??null}let $=null;function E(){if($!==null)return $;let y=c().default_exec_preset_id;return typeof y=="string"&&y.length>0?y:null}async function B(y){if(!s)return;let C=f();if(!C)return;$=y||"";let L=I(y);if(ve(),!L.viable){ee(L.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),$=null,ve();return}try{let W=await s("worker-queue-set-default-exec-preset",{preset_id:y||null,expected_queue_revision:u(),expected_preset_revision:C.revision});h(W),W&&W.presets&&n&&n.set(W.presets),W&&W.conflict?ee("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):W&&W.applied||ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}$=null,ve()}function x(y){a={id:y.id,name:y.name,settings:{...y.settings||{}}},A(),l=!1,ve()}function Y(){a={id:null,name:"",settings:{}},l=!1,ve()}function te(y){let C=y&&y.settings&&typeof y.settings=="object"?y.settings:{},L=W=>typeof C[W]=="string"?C[W]:W==="impl_runtime"&&typeof C.impl_model=="string"&&sr(T(),C.impl_model)||"";return jr({selectedOf:L,effectiveOf:L,runner_catalog:T()}).some(W=>W.groups.some(J=>J.options.some(Oe=>Oe.value===W.selected&&Oe.label.endsWith("(\uBE44\uD638\uD658)"))))}function I(y){if(!y)return{viable:!0,missing:!1,incompatible:!1,preset:null};let L=f()?.presets.find(J=>J.id===y);if(!L||L.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let W=L.compatible===!1||te(L);return{viable:!W,missing:!1,incompatible:W,preset:L}}function O(){let y=a?.settings.orchestration_model;return typeof y!="string"?null:sr(T(),y)}function A(){if(!a)return;let y=os({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},T(),O());for(let C of["impl_runtime","impl_model","impl_effort"])y[C]?a.settings[C]=y[C]:delete a.settings[C]}function j(y){let C=y&&y.settings&&typeof y.settings=="object"?y.settings:{},L=Er.filter(J=>typeof C[J]=="string").length,W=Er.filter(J=>typeof C[J]=="string").map(J=>`${uo[J]?.title||J}: ${C[J]}`);return{count:`${L}/12 \uC9C0\uC815`,choices:W.length>0?W.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function P(y){if(!s||!window.confirm(`\u201C${y.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let C=f();if(C)try{let L=await s("exec-preset-delete",{expected_revision:C.revision,id:y.id});m(L),L&&L.conflict&&ee("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ne(y=!1){if(!s||!a)return;let C=f();if(!C)return;let L=y||a.id===null,W={expected_revision:C.revision,...L?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let J=await s(L?"exec-preset-create":"exec-preset-update",W);if(m(J),J&&J.conflict){l=!0,ve();return}if(J&&J.applied){a=null,l=!1,ve();return}ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Ee(y){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${fo(y.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${y.key}
        ?disabled=${y.disabled}
        @change=${C=>{if(!a)return;let L=C.target.value;L?a.settings[y.key]=L:delete a.settings[y.key],(y.key==="impl_runtime"||y.key==="impl_model"||y.key==="impl_effort"||y.key==="orchestration_model")&&A(),l=!1,ve()}}
      >
        ${ss(y.groups,y.selected,po[y.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ie(){if(!a)return"";let y=xe=>typeof a?.settings[xe]=="string"?a.settings[xe]:"",C=jr({selectedOf:y,effectiveOf:y,runner_catalog:T(),controller_runtime:O()}),L=_n.flatMap(xe=>xe.keys).filter(xe=>typeof a?.settings[xe]=="string").length,W=xe=>{let De=C.find(Ge=>Ge.key===xe);return De?Ee(De):""},J=f(),Oe=a.id!==null&&J!==null&&!J.presets.some(xe=>xe.id===a?.id);return i`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${a.name}
          data-preset-name
          @input=${xe=>{a&&(a.name=xe.target.value,l=!1)}}
        />
      </label>
      ${l?i`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Oe?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${co.map(W)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${L}개 변경됨</summary>
        ${_n.map(xe=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${xe.id}
            >
              <h4>${xe.label}</h4>
              ${xe.keys.map(W)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Oe?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ne(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{ne(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{a=null,l=!1,ve()}}
        >
          취소
        </button>
      </div>
    </div>`}function he(){let y=f(),C=y?y.presets.filter(J=>J?.migration_pending!==!0):[],L=E()||"",W=I(L);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Y}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${y===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:C.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:C.map(J=>{let Oe=j(J),xe=I(J.id),De=J.id===L,Ge=xe.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":xe.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",it=typeof J.reference_count=="number",rt=it?J.reference_count:null,_t=Array.isArray(J.reference_summary)?J.reference_summary.map($t=>$t?.display_name||$t?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${J.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${J.name}</strong>
                  ${De?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Oe.count}</span>
                  <span data-preset-references=${J.id}
                    >${it?`\uCC38\uC870 ${rt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${xe.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Oe.choices}</small>
                  ${_t?i`<small data-preset-impact=${J.id}
                        >업데이트 영향: ${_t}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${De?i`<button
                        type="button"
                        data-workspace-preset-release=${J.id}
                        @click=${()=>{B("")}}
                      >
                        기본 해제
                      </button>`:i`<button
                        type="button"
                        data-workspace-preset-assign=${J.id}
                        ?disabled=${!xe.viable}
                        title=${Ge}
                        @click=${()=>{B(J.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${J.id}
                    @click=${()=>x(J)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${J.id}
                    ?disabled=${rt===null||rt>0||J.reference_scan_complete===!1}
                    title=${rt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":rt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":J.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{P(J)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${y!==null&&L&&W.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${L} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${L}
                @click=${()=>{B("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${ie()}
    </section>`}function ke(){let y=c().workspace_info;return y&&typeof y=="object"?y:{}}function He(y,C){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${C}</span
    >`}let et=!1,Re=!1,Fe=!1,be=null;async function _e(){if(s){Re=!0,Fe=!1,ve();try{let y=await Promise.resolve(s("get-worker-system-prompt",{}));!y||typeof y!="object"||Array.isArray(y)?Fe=!0:be=y}catch{Fe=!0}finally{Re=!1,ve()}}}function Ae(){if(et=!et,et&&!be){_e();return}ve()}function me(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${et?"true":"false"}
          @click=${Ae}
        >
          ${et?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${et?G():""}
    </section>`}function G(){let y=Br({loading:Re,error:Fe});if(y)return y;if(!be)return"";let C=Array.isArray(be.variants)?be.variants:[];return i`<div class="exec-defaults__sp-body">
      ${be.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${be.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(L=>i`<div class="exec-defaults__sp-variant" data-variant=${L.key}>
            <div class="exec-defaults__sp-cond">${L.condition}</div>
            ${nr(L.label,L.system_prompt)}
          </div>`)}
    </div>`}function K(y){if(typeof y!="number"||!Number.isFinite(y))return"";let C=y/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(y/1e3)}\uCD08`}function Ie(y){let C=K(y);return C?He("config",C):""}function de(y){let C=typeof y.base_sha=="string"?y.base_sha:"",L=`${y.source_path||"repo-ops/config.toml"} @ ${y.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`;return i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${L}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${y.verify?i`<code class="exec-defaults__vd-cmd"
                  >${y.verify.script}</code
                >${Ie(y.verify.timeout_ms)}`:i`선언 없음${He("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${y.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${y.deploy?i`<code class="exec-defaults__vd-cmd"
                  >${y.deploy.script}</code
                >${Ie(y.deploy.timeout_ms)}`:i`선언 없음${He("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${y.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function le(y){let C=y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?de(C):C&&(C.status==="pending"||C.status==="error")?i`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${C.error_code?i` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">저장소 작업 선언</p>
      <div class="exec-defaults__vd-line exec-defaults__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(y){if(!s)return;let C=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});if(h(C),C&&C.conflict){let L=await s("worker-auto-repair-toggle",{on:y,expected_revision:u()});h(L)}ve()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ce(y,C,L){return i`<div class="exec-defaults__policy-group" data-policy=${L}>
      <div class="exec-defaults__policy-label">${y}</div>
      <ul class="exec-defaults__policy-list">
        ${C.map(W=>i`<li data-token=${W}>
              ${q[W]||W}
            </li>`)}
      </ul>
    </div>`}function Ue(y){return i`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${y.map(C=>{let L=[q[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?L.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?L.push(`${q[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&L.push(`${C.sessions_per_user_action}\uD68C`,q[C.user_actions]||C.user_actions),C.applies_when&&L.push(q[C.applies_when]||C.applies_when),i`<li data-token=${C.id}>
            <strong>${q[C.id]||C.id}</strong>
            <span>${L.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Ce(){let y=c(),C=y.auto_repair!==!1,L=y.repo_operation_policy&&typeof y.repo_operation_policy=="object"?y.repo_operation_policy:null,W=Array.isArray(y.repo_operations)?y.repo_operations:[],J=W.find(Ge=>Ge.state==="repairing"),Oe=W.filter(Ge=>Ge.state==="failed"||Ge.state==="repairing"),xe=Oe.length?Math.min(...Oe.map(Ge=>typeof Ge.repair?.remaining=="number"?Ge.repair.remaining:0)):L?.auto_repair?.resolution_ladder?.find(Ge=>Ge.id==="auto_repair_session")?.attempts??1,De=Array.isArray(L?.auto_repair?.resolution_ladder)?L.auto_repair.resolution_ladder:[];return i`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${C}
          @change=${Ge=>{R(Ge.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${xe}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${J?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${J.repair?.owner_bead||J.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${L?i`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(L.worker_automatic||[]).length} · 해결 사다리
                ${De.length} · 금지
                ${(L.never_automatic||[]).length}</span
              >
            </summary>
            ${ce("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",L.worker_automatic||[],"worker-automatic")}
            ${L.supported===!1||L.schema_version!==2?i`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${L.schema_version})`}
                </div>`:Ue(De)}
            ${ce("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",L.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function ve(){Be(i`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${F}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${he()} ${le(ke())}
            ${Ce()} ${me()}
          </div>
        </div>
      `,o)}let $e=!1,Xe=()=>{$e=!1},qe=y=>{y.target===y.currentTarget&&F()};o.addEventListener("close",Xe),o.addEventListener("cancel",Xe),o.addEventListener("click",qe);let We=null;r&&r.subscribe&&(We=r.subscribe(()=>{$e&&ve()}));let D=null;n&&n.subscribe&&(D=n.subscribe(()=>{$e&&ve()}));function z(){$e||($e=!0,ve(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function F(){$e&&($e=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:z,close:F,destroy(){$e=!1,o.removeEventListener("close",Xe),o.removeEventListener("cancel",Xe),o.removeEventListener("click",qe),We&&(We(),We=null),D&&(D(),D=null),o.remove()}}}function is(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Lp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:is(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function al(e,t){let r=Lp(e,t);return r?i`<button
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
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${ls(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function zr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Op(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function mn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function cs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Op(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:u}}function or(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function bo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=Nt(e.usage),a=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!l,u=c?Tt(e.done_at):"",f=e.selectable?i`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",m=r?i`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?i`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?i`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",T=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=i`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(ke=>ke===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ke}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ke===e.completion_badge&&e.completion_title||""}
          >${ke}</span
        >`),te=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",I=s.length>0?s.map(ke=>i`<span class="worker-usage" title=${ke.tooltip}
              >${ke.label}</span
            >`):o?i`<span class="worker-usage" title=${qr(e.usage)}
            >${o}</span
          >`:"",O=a?i`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",A=e.merge_action?i`<button
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
      </button>`:"",P=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ne=e.discard,Ee=ne?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ne?.attempt_id||""}
          data-operation-id=${ne?.operation?.operation_id||""}
          data-discard-mode=${ne?.confirmation||"unmerged"}
          ?disabled=${ne?!ne.enabled:e.discard_enabled===!1}
          title=${ne?ne.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ne?.label||"\uD3D0\uAE30"}
        </button>`:"",ie=e.revise_action?i`<button
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
        </button>`:"",he=!!(o||a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ne?.operation||e.revise_action);return i`<div
    class="worker-mini${l?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${T}${$}${E}</div>
          <div class="worker-mini__row2">
            ${I}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${Y}${O}
            <span class="worker-mini__actions"
              >${A}${j}${P}${Ee}</span
            >
            ${zr(e)}
          </div>`:l?i`<div class="worker-mini__head">
              ${f}${m}${T}${$}${B}${x}${Y}${h}${te}
            </div>
            <div class="worker-mini__body">${E}</div>
            ${he?i`<div class="worker-mini__foot">
                  ${I}${O}
                  <span class="worker-mini__actions"
                    >${A}${j}${P}${Ee}${ie}</span
                  >
                  ${or(e)}
                </div>`:""}
            ${zr(e)}`:i`<div class="worker-mini__line">
              ${f}${m}${T}${$}${E}${B}${x}${Y}${h}${te}${I}${O}${A}${j}${P}${Ee}
            </div>
            ${or(e)} ${zr(e)}`}
  </div>`}function Dp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?qn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
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
    ${zr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Dp(n):bo(n))}
          </div>`}
  </section>`}var il=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],gn=il.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=il.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function ll(e){let t=gn.findIndex(r=>r.step===e);return gn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Rr(e){let t=gn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Mp(e){let t=gn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:gn.length}}function ds(e){let t=Mp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var cl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},dl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function ul(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yo(e){for(let t of ul(e))if(Object.hasOwn(cl,t))return cl[t];return null}function wo(e){let t=null;for(let r of ul(e))Object.hasOwn(dl,r)&&(t=dl[r]);return t}function us(e){let t=yo(e),r=wo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function pl(e,t){let r=yo(e)??yo(t),n=wo(t)??wo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var fl=160;function Np(e){return e.length>fl?`${e.slice(0,fl)}\u2026`:e}function Pp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Np(e.command)}</code>`:""}
  </div>`}function Fp(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ko(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function _l(e){let t=e.failure?us(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Pp(e.failure.cause_detail)}
          ${Fp(e.failure.reason)}
          ${or({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function qp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ko(t-e.started_at):"\u2014",a=Wt(e),l=dr(e),c=gt(e.usage),u=Nt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?i`<button
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
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
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
            ${T}
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
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||m?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>i`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${qr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${zr(e)} ${or(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function $o(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>qp(s,t,r))}
  </div>`}function mr(e){return i`<svg
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
  </svg>`}function xo(){return mr(Xt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function So(){return mr(Xt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ml(){return mr(Xt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function gl(){return mr(Xt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function hl(){return mr(Xt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function bl(){return mr(Xt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function vl(){return mr(Xt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function yl(){return mr(Xt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var hn=1,Bp=6e4,Up={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},jp=new Set(["auto_merge","merged","merge","done"]),wl={running:3,paused:2,failed:1};function zp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Hp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=wl[u.run_state],h=wl[l];if(m>h||m===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function kl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let l=[],c=[],u=[],f=[],m=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let Y=x.root_dir,te=x.name||Y,I=a.get(Y),O=I&&typeof I.revision=="number"?I.revision:typeof x.revision=="number"?x.revision:0,A=Et(x.attempts),j=Et(x.bead_titles),P=Et(x.pr_observations),ne=Et(x.admission),Ee=Et(x.revise_parked),ie=Et(x.merge_queue_state),he=Et(x.cleanup_failed),ke=Et(x.discard_operations),He=Array.isArray(x.merge_queue)?x.merge_queue:[],et=new Set(He.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),Re=new Map(He.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),Fe=Array.isArray(x.queue)?x.queue:[],be=Array.isArray(x.done)?x.done:[],_e=new Map;for(let G of be)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&_e.set(G.bead_id,G.added_at);let Ae=G=>({id:G,title:j[G]||G,root_dir:Y,workspace_name:te,expected_revision:O,draggable:!1}),me=new Set;for(let[G,K]of Hp(A,_e))me.add(G),c.push({...Ae(G),lane:"running",attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,runner:K.runner,model:K.model,effort:K.effort,speed:K.speed,resumed_from:K.resumed_from,continuation_mode:K.continuation_mode,usage:K.usage,discard:Gt(ke,G,{attempt_id:K.attempt_id}),badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let G of Array.isArray(x.pr_wait)?x.pr_wait:[]){let K=G&&G.bead_id;if(typeof K!="string"||me.has(K))continue;me.add(K);let Ie=Et(P[K]),de=Et(Ie.pr),le=Ie.gate?Et(Ie.gate):null,R=et.has(K),q=Re.get(K)?.continuation_action||null,ce=!!q&&q.continuation===null,Ue=ie.active===K,Ce=G.external===!0,ve=he[K]||null,$e=!!le&&le.base_badge==="\uCDA9\uB3CC",Xe=!!ve&&["child_sweep","branch_cleanup","parent_close"].includes(ve.step)&&!!le&&le.tier==="merged",qe=Ce&&!!ve&&!!le&&le.tier==="merged",We=!!le&&["closed_unmerged","review","undecidable"].includes(le.tier),D=Gt(ke,K,{external:Ce,merge_active:Ue,merge_queued:R,merged:!!ve||le?.tier==="merged"}),z=!!D.operation;u.push({...Ae(K),lane:"pr_wait",pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:Ce,usage:It(A,K),badges:ce?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ve?[Rr(ve.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(ve.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof le?.gate_badge=="string"&&le.gate_badge.length>0?[le.gate_badge]:[],alert:!!ve||We,reason:ve?ds(ve.step):"PR \uB300\uAE30",merge_action:!R||ce,merge_enabled:!z&&(ce||le?.enabled===!0||$e||Xe||qe),merge_label:ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":qe||Xe?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!Xe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":z?D.error?`\uD3D0\uAE30 \uC2E4\uD328: ${D.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${D.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":le?.enabled===!0?`\uBA38\uC9C0 (${le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:R&&!ce,cancel_enabled:!Ue,continuation_mismatch:q?.mismatch||null,discard:D,discard_action:D.action,discard_enabled:D.enabled,discard_title:D.title})}for(let G=0;G<Fe.length;G++){let K=Fe[G],Ie=K&&K.bead_id;if(typeof Ie!="string"||me.has(Ie))continue;me.add(Ie);let de=Ee[Ie],le=Gt(ke,Ie),R=le.operation?le:null,q={...Ae(Ie),lane:"queue",draggable:!R,discard:R||void 0,reason:kl(ne,Ie),queue_position:G+1,queue_index:G,queue_length:Fe.length,badges:de?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!de,revise_action:!!de,revise_enabled:!!de&&!R,revise_title:de?de.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${de.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(q);let ce=h.get(Y);ce?ce.push(q):h.set(Y,[q])}for(let G of Array.isArray(x.runnable)?x.runnable:[]){let K=G&&G.bead_id;typeof K!="string"||me.has(K)||(me.add(K),l.push({...Ae(K),title:G.title||j[K]||K,lane:"runnable",draggable:!0,reason:kl(ne,K),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,place_index:Fe.length}))}for(let G of be){let K=G&&G.bead_id;if(typeof K!="string"||me.has(K)||(me.add(K),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Ie=zp(A,K);m.push({...Ae(K),lane:"done",done:!0,usage:It(A,K),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Ie&&typeof Ie.done_kind=="string"?Ie.done_kind:null})}}let T=new Map;s.forEach((x,Y)=>{x&&typeof x.root_dir=="string"&&T.set(x.root_dir,Y)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,Y)=>{if($==="repo"){let O=T.get(x.root_dir)??Number.MAX_SAFE_INTEGER,A=T.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==A)return O-A}let te=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,I=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return te!==null&&I!==null&&te!==I?te-I:te===null&&I!==null?1:te!==null&&I===null?-1:x.id.localeCompare(Y.id)}),m.sort((x,Y)=>(Y.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),B=[];for(let x of E)!x||typeof x.root_dir!="string"||B.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=hn?x.slots:hn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:l,queue:f,queue_groups:B,running:c,pr_wait:u,done:m,automation:{total:B.length,both_on:B.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Wp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Bp;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function bn(e){return i`<div class="mon-c__title">${e.title}</div>`}function vn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ps(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function To(e){let t=gt(e.usage),r=Nt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${qr(e.usage)}
        >${r}</span
      >`:""}function Eo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Gp(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${So()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${xo()}
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
          ${gl()}
        </button>`:""}
  </span>`}function Yp(e,t){let r=typeof e.started_at=="number"?ko(t-e.started_at):"";return i`${bn(e)}
    <div class="mon-c__meta">
      ${Eo(e)}${Wp(e.last_event_at,t)}${vn(e)}${ps(e)}
      ${Wt(e)?i`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?i`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${To(e)}${Gp(e)}${or(e)}
    </div>`}function Vp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Tt(e.updated_at);return i`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${vn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Fn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ps(e)}
      ${l?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
            >수정 ${l}</span
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
    </div>`}function Kp(e){let t=!!e.discard?.operation;return i`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${vn(e)}
      ${Eo(e)}
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
    ${or(e)}
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
        </div>`:""}`}function Zp(e){let t=!!(Nt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Eo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${To(e)}
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
          ${or(e)}
        </div>`:""}`}function Xp(e,t){let r=e.done_kind||"",n=r?Up[r]||r:"",s=Tt(e.done_at,t);return i`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${n?i`<span
            class="mon-live__kind${jp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${To(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function $l(e,t){return e.lane==="running"?Yp(e,t):e.lane==="runnable"?Vp(e):e.lane==="queue"?Kp(e):e.lane==="pr_wait"?Zp(e):Xp(e,t)}function xl(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?So():xo()}
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
        ${hl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${bl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${hn}
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
        ${vl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Sl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ml():yl()}
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
        ${Ht.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function Al(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Tl(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gt(jn(t));let r={};for(let l of er)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of er){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Nt(r):null}var Cl="bdui.monitor.done-range",Rl="bdui.monitor.running_sort";function Qp(){try{let e=window.localStorage.getItem(Cl);return Rt(e)?e:At}catch{return At}}function Jp(e){try{window.localStorage.setItem(Cl,e)}catch{}}function ef(){try{return window.localStorage.getItem(Rl)==="repo"?"repo":"started"}catch{return"started"}}function tf(e){try{window.localStorage.setItem(Rl,e)}catch{}}var Il="tab:monitor:pipeline",rf=1e3,nf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function El(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${$l(e,t)}
  </div>`}function Ll(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),m=Qp(),h=ef();function T(){let D=Ht.find(z=>z.value===m);return D?D.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=Ao(null,null),B=null,x=new Map,Y=new Set;function te(D){return E.queue_groups.find(z=>z.root_dir===D)||null}let O=as(e,{queueStore:{get(){if(!B)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let D=x.get(B);if(D)return D;let z=te(B),F=s&&s.get?s.get():null,y=(Array.isArray(F)?F:[]).find(C=>C&&C.root_dir===B);return{revision:z?z.revision:0,exec_defaults:z?z.exec_defaults:{},default_exec_preset_id:z?z.default_exec_preset_id:null,runner_catalog:z?z.runner_catalog:null,workspace_info:y?y.workspace_info:void 0}},set(D){B&&x.set(B,D);for(let z of Array.from(Y))z()},subscribe(D){return Y.add(D),()=>Y.delete(D)}},presetStore:a,transport:o?(D,z)=>o(D,D==="worker-queue-set-default-exec-preset"||D==="get-worker-system-prompt"?{...z||{},root_dir:B}:z):void 0}),A=null,j=null;async function P(D,z,F,y,C=!0){if(!o||!F)return null;let L=await o(D,{...z,root_dir:F,expected_revision:y});if(L&&L.conflict&&C){L.queue&&x.set(F,L.queue);let W=L.queue&&typeof L.queue.revision=="number"?L.queue.revision:y;L=await o(D,{...z,root_dir:F,expected_revision:W})}return L&&L.queue&&F&&x.set(F,L.queue),L}function ne(D,z){let F=x.get(D),y=s&&s.get?s.get():null,C=(Array.isArray(y)?y:[]).find(W=>W?.root_dir===D);return(F||C)?.merge_queue?.find(W=>W.bead_id===z)?.continuation_action}async function Ee(D,z,F,y){let C=await P(D,z,F,y),L=x.get(F)?.revision??C?.queue?.revision??y;return Jt(C,(W,J)=>P(D,{...z,continuation:W,decision_token:J},F,L,!1),{refresh:W=>P(D,z,F,W?.queue?.revision??x.get(F)?.revision??L,!1)})}async function ie(D,z,F,y){let C=await Jt({continuation_mismatch:y},(W,J)=>P("worker-merge-queue-add",{bead_id:z,continuation:W,decision_token:J},D,F,!1)),L=C?.queue?.merge_queue?.find(W=>W.bead_id===z)?.continuation_action;C?.applied!==!0&&L?.continuation===null&&L.mismatch&&await ie(D,z,C.queue.revision,L.mismatch)}async function he(D,z,F){let y=await P("worker-discard",D,z,F);if(y&&y.discarded===!0){ee(cs(y),"success",5e3);return}if(y&&y.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error");return}if(y&&y.accepted&&y.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(y&&y.accepted){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}y&&!y.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ke(D,z,F){return!o||!F?null:await o(D,{...z,root_dir:F})}async function He(D){if(!o||!D&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:D}),F=z&&Array.isArray(z.failed)?z.failed:[];F.length>0&&ee(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${F.map(y=>y.root_dir).join(", ")}`,"error",3200)}async function et(){let D=new Map;for(let z of E.pr_wait)D.has(z.root_dir)||D.set(z.root_dir,z.expected_revision);for(let[z,F]of D)await P("worker-merge-queue-add-all",{},z,F)}let Re=null,Fe=!1,be=null;function _e(){be!==null&&clearTimeout(be),be=setTimeout(()=>{be=null,Fe=!1},0)}function Ae(D){let z=D.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function me(D){let z=Ae(D);return!z||!Re?null:(z.getAttribute("data-root-dir")||"")===Re.root_dir?z:null}function G(){for(let D of Array.from($.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function K(D){let z=D.target,F=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(F){Re={bead_id:F.getAttribute("data-issue-id")||"",lane:F.getAttribute("data-lane")||"",root_dir:F.getAttribute("data-root-dir")||"",revision:Number(F.getAttribute("data-revision")||0)||0,queue_index:Number(F.getAttribute("data-queue-index")),queue_length:Number(F.getAttribute("data-queue-length")),place_index:Number(F.getAttribute("data-place-index"))},Fe=!0;try{D.dataTransfer?.setData("text/plain",Re.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function Ie(D){let z=me(D);z&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function de(D){Ae(D)?.classList.remove("mon-group--drag-over")}function le(){Re=null,G(),_e()}function R(D){let z=me(D),F=Re;if(Re=null,G(),!z||!F||!F.bead_id)return;D.preventDefault();let y=D.target,C=typeof y?.closest=="function"?y.closest('.mon-card[data-lane="queue"]'):null,L=C&&z.contains(C)?Number(C.getAttribute("data-queue-index")):NaN;if(F.lane==="runnable"){let Oe=Number.isFinite(L)?L:F.place_index;if(!Number.isFinite(Oe))return;P("worker-queue-place",{bead_id:F.bead_id,index:Oe},F.root_dir,F.revision);return}if(F.lane!=="queue"||C&&C.getAttribute("data-issue-id")===F.bead_id)return;let W=F.queue_index,J=Number.isFinite(L)?W>L?L:L-1:F.queue_length-1;!Number.isFinite(J)||J<0||J===W||P("worker-queue-reorder",{bead_id:F.bead_id,to_index:J},F.root_dir,F.revision)}function q(D){let z={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return i`${Sl({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:h,done_range:m,token_total:Tl(E.done),token_tooltip:Al(T())})}
      <div class="worker-lanes mon-lanes">
        ${nf.map(F=>{let y=z[F.lane],C=F.lane==="queue"?E.queue_groups.length>0?i`${E.queue_groups.map(L=>i`<div
                        class="mon-group"
                        data-root-dir=${L.root_dir}
                      >
                        ${xl(L)}
                        <div class="mon-group__list">
                          ${L.items.map(W=>El(W,D))}
                        </div>
                      </div>`)}`:void 0:y.length>0?i`${y.map(L=>El(L,D))}`:void 0;return Yt({id:`monitor-${F.lane}`,lane:F.pane,title:F.lane==="done"?`\uC644\uB8CC\xB7${T()}`:F.title,items:y,empty:F.empty,body:C,live:F.lane==="running"&&y.length>0,header_control:F.lane==="pr_wait"&&y.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ce(){let D=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],F=u();E=Ao(D,z,{done_since:kr(m,F),running_sort:h}),Be(q(F),$)}function Ue(D,z){let F=l?l():void 0;if(!z||!F||z===F||!c){n(D);return}c(z).then(()=>{n(D)}).catch(y=>{r("workspace switch for %s failed: %o",z,y)})}function Ce(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function ve(D,z){let{root_dir:F,revision:y}=Ce(D),C=D.getAttribute("data-issue-id")||"",L=z.dataset.attemptId||D.getAttribute("data-attempt-id")||"",W=z.classList;if(W.contains("worker-card__place")){P("worker-queue-place",{bead_id:C,index:Number(D.getAttribute("data-place-index")||0)||0},F,y);return}if(W.contains("mon-op--up")||W.contains("mon-op--down")){let J=Number(D.getAttribute("data-queue-index")||0)||0,Oe=W.contains("mon-op--up")?J-1:J+1;if(Oe<0)return;P("worker-queue-reorder",{bead_id:C,to_index:Oe},F,y);return}if(W.contains("mon-op--remove")){P("worker-queue-remove",{bead_id:C},F,y);return}if(W.contains("mon-op--pause")){ke("worker-attempt-pause",{attempt_id:L},F);return}if(W.contains("mon-op--discard")){if(!f(mn(C,"unmerged")))return;he({bead_id:C,...L?{attempt_id:L}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},F,y);return}if(W.contains("mon-op--resume")){Ee("worker-attempt-resume",{attempt_id:L},F,y);return}if(W.contains("mon-op--dismiss")){P("worker-attempt-dismiss",{attempt_id:L},F,y);return}if(W.contains("worker-mini__merge")){let J=ne(F,C);J?.mismatch&&J.continuation===null?ie(F,C,y,J.mismatch):P("worker-merge-queue-add",{bead_id:C},F,y);return}if(W.contains("worker-mini__merge-cancel")){P("worker-merge-queue-remove",{bead_id:C},F,y);return}if(W.contains("worker-mini__discard")){let J=z.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(mn(C,J)))return;he({bead_id:C,...L?{attempt_id:L}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},F,y);return}if(W.contains("worker-mini__revise-fix")){Ee("worker-revise-fix",{bead_id:C},F,y);return}W.contains("worker-mini__revise-approve")&&P("worker-revise-approve",{bead_id:C},F,y)}function $e(D){let z=Fe;Fe=!1;let F=D.target;if(!F||typeof F.closest!="function"||F.closest("dialog")||F.closest("a"))return;let y=F.closest(".mon-running-sort");if(y){D.preventDefault(),h=y.getAttribute("data-sort")==="repo"?"repo":"started",tf(h),ce();return}let C=F.closest(".mon-auto-all");if(C){D.preventDefault(),He(C.getAttribute("data-on")==="true");return}if(F.closest(".mon-merge-all")){D.preventDefault(),et();return}let W=F.closest(".mon-ctl--advance");if(W){D.preventDefault();let{root_dir:it,revision:rt}=Ce(W);P("worker-automation-toggle",{on:W.getAttribute("data-on")==="true"},it,rt);return}let J=F.closest(".mon-ctl--merge-auto");if(J){D.preventDefault();let{root_dir:it,revision:rt}=Ce(J);P("worker-merge-auto-toggle",{on:J.getAttribute("data-on")==="true"},it,rt);return}let Oe=F.closest(".mon-ctl--exec");if(Oe){D.preventDefault(),B=Oe.getAttribute("data-root-dir")||null,x.delete(B||""),O.open();return}let xe=F.closest(".mon-card");if(!xe)return;let De=F.closest("button");if(De){D.preventDefault(),ve(xe,De);return}let Ge=xe.getAttribute("data-issue-id");Ge&&!z&&(D.preventDefault(),Ue(Ge,xe.getAttribute("data-root-dir")||""))}function Xe(D){let z=D.target;if(!z||typeof z.closest!="function")return;let F=z.closest(".mon-done-range");if(F){m=Rt(F.value)?F.value:At,Jp(m),ce();return}let y=z.closest(".mon-slots__input");if(!y)return;let{root_dir:C,revision:L}=Ce(y),W=Number(y.value);if(!Number.isFinite(W))return;let J=Math.max(hn,Math.floor(W));P("worker-queue-set-slots",{slots:J},C,L)}e.addEventListener("click",$e),e.addEventListener("change",Xe),e.addEventListener("dragstart",K),e.addEventListener("dragover",Ie),e.addEventListener("dragleave",de),e.addEventListener("drop",R),e.addEventListener("dragend",le),s&&typeof s.subscribe=="function"&&(A=s.subscribe(()=>{try{x.clear(),ce();for(let D of Array.from(Y))D()}catch{}}));function qe(){j!==null&&(clearInterval(j),j=null)}function We(){be!==null&&(clearTimeout(be),be=null)}return{load(){r("load"),ce(),j===null&&(j=setInterval(()=>{try{ce()}catch{}},rf))},pause(){qe()},clear(){qe(),We(),A&&(A(),A=null),e.removeEventListener("click",$e),e.removeEventListener("change",Xe),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",Ie),e.removeEventListener("dragleave",de),e.removeEventListener("drop",R),e.removeEventListener("dragend",le),O.destroy(),Y.clear(),e.replaceChildren()}}}function Ol(e,t,r){let n=at("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){Be(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Be(i``,e)}}}var Dl=["bug","feature","task","epic","chore"];function Ml(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Nl=["Critical","High","Medium","Low","Backlog"];function Pl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let A of Dl){let j=document.createElement("option");j.value=A,j.textContent=Ml(A),o.appendChild(j)}a.replaceChildren();for(let A=0;A<=4;A+=1){let j=document.createElement("option");j.value=String(A);let P=Nl[A]||"Medium";j.textContent=`${A} \u2013 ${P}`,a.appendChild(j)}}T();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(O){s.disabled=O,o.disabled=O,a.disabled=O,l.disabled=O,c.disabled=O,f.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function B(){u.textContent=""}function x(O){u.textContent=O}function Y(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?a.value=A:a.value="2"}catch{o.value="",a.value="2"}}function te(){let O=o.value||"",A=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function I(){B();let O=String(s.value||"").trim();if(O.length===0){x("Title is required"),s.focus();return}let A=Number(a.value||"2");if(!(A>=0&&A<=4)){x("Priority must be 0..4"),a.focus();return}let j=String(o.value||""),P=String(c.value||""),ne={title:O};j.length>0&&(ne.type=j),String(A).length>0&&(ne.priority=A),P.length>0&&(ne.description=P),E(!0);try{await t("create-issue",ne)}catch{E(!1),x("Failed to create issue");return}te(),E(!1),$()}return r.addEventListener("cancel",O=>{O.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),I())}),n.addEventListener("submit",O=>{O.preventDefault(),I()}),{open(){n.reset(),B(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var sf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fl(e){return String(e).padStart(2,"0")}function of(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function af(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Fl(n.getHours())}:${Fl(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${sf[n.getMonth()]} ${n.getDate()} ${o}`;return`${of(r,t)} \xB7 ${l}`}function lf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var ql=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Bl(e){let t=!1,r=null,n=new Map;function s(){Be(i``,e),e.hidden=!0}function o(){let c=ql.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Be(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,T=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,B=Math.min(100,Math.max(0,E)),Y=`resets ${af($.resetsAt,u)}${h?` \xB7 ${T}`:""}`;return i`<span
                class="usage-meter__window ${lf(B)}"
                style=${`--progress: ${B}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(ql.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var cf="worker-ineligible";function Co(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ul(e){return Co(e).includes(cf)}var Ro="worker-serial";function yn(e){return Co(e).includes(Ro)}var df=20,jl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},zl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function uf(e,t,r=df){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Hl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function pf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Wl(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Gl(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function ff(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(zl,n)?zl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function _f(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(jl,t.kind)?jl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${is(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ho(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hl(e)}"
          >${pf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Gl(pl(t.failure_kind,n)):""}
      ${ff(t)}
      ${Wl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${is(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function mf(e){let t=e.cleanup,r=Rr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
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
        ${ll(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Gl(us(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Wl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function gf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?mf(t):_f(t))}
        </ul>`}
  </section>`}function Yl(e,t={}){let r=null;function n(){Be(r?gf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:uf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var hf="tab:worker:ready",bf="tab:worker:blocked",vf="tab:worker:in-progress",yf="tab:worker:closed",wn=1,wf=new Set(["done","failed","orphaned","stopped","discarded"]);function Vl(e){return fn(e).path.length>0}var Xl="beads-ui.worker.candidate-filter",Io={show_blocked:!1,spec:"all"};function kf(){try{let e=window.localStorage.getItem(Xl);if(!e)return{...Io};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Io};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Io}}}function $f(e){try{window.localStorage.setItem(Xl,JSON.stringify(e))}catch{}}function xf(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Sf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ql="bdui.worker.candidate_sort",Af=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],fs="spec";function Tf(){try{let e=window.localStorage.getItem(Ql);return e==="board"||e==="created"||e==="spec"?e:fs}catch{return fs}}function Ef(e){try{window.localStorage.setItem(Ql,e)}catch{}}var Jl="bdui.worker.done-range";function Cf(){try{let e=window.localStorage.getItem(Jl);return Rt(e)?e:At}catch{return At}}function Rf(e){try{window.localStorage.setItem(Jl,e)}catch{}}var If="(max-width: 640px)",ec="beads-ui.worker.lane-collapsed",kn={queue:!0,done:!0};function Lf(){try{let e=window.localStorage.getItem(ec);if(!e)return{...kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...kn}:{queue:typeof t.queue=="boolean"?t.queue:kn.queue,done:typeof t.done=="boolean"?t.done:kn.done}}catch{return{...kn}}}function Of(e){try{window.localStorage.setItem(ec,JSON.stringify(e))}catch{}}function Kl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Df(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Ln(r)),t==="board"?n:[...n.filter(Vl),...n.filter(s=>!Vl(s))])}function Mf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Nf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Pf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ff=["closed_unmerged","review","undecidable"],qf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Bf(e,t){for(let r of qf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Zl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Uf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Lo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function jf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function zf(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,m=null,h=null,T={},$=!1){let E=!!c&&c.position>0,B=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,Y=c&&c.failure||null,te=r[e]||null,I=te&&te.gate?te.gate:null,O=te&&te.pr?te.pr:null,A=jf(h),j=Uf(c?c.resolution:null),P=[];l&&P.push("\uC138\uC158");let ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":j?j.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ee=Bf(l&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",ne?null:o&&o.activity||null);if(ne&&P.push(ne),Ee.label&&P.push(Ee.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&P.push(I.base_badge),m&&P.push(m),n){let Ae=Rr(n.step);P.push(Ae?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ae}`:"\uC815\uB9AC \uBA48\uCDA4")}A&&P.push(A.badge),E&&!x&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),Y&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Zl(Y)}`),B&&P.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${Zl(f)}`);let ie=!!I&&I.base_badge==="\uCDA9\uB3CC",he=!!I&&I.enabled===!0,ke=vo(o&&o.merge_progress?o.merge_progress.step:null),He=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!I&&I.tier==="merged",et=l&&!!n&&!!I&&I.tier==="merged",Re=l&&ie&&u===!1,Fe=Gt(T,e,{external:l,merge_active:x||!!ke,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||I?.tier==="merged"}),be=!!Fe.operation,_e=!He&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?ds(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:l,pr_number:O&&typeof O.number=="number"?O.number:null,pr_url:O&&typeof O.url=="string"?O.url:"",completion_badge:A?A.badge:null,completion_title:A?A.title:"",completion_repair_pr_url:A?A.repair_pr_url:"",completion_repair_pr_number:A?A.repair_pr_number:null,badges:P,live_badge:a==="paused"?null:j?.live||a==="running"?ne:Ee.live?Ee.label:null,usage:s,alert:!!I&&Ff.includes(I.tier)||!!n||!!Y||!!(A&&A.alert),merge_action:_e?!1:!E||B,timeline_action:_e,cancel_action:E&&!B,cancel_enabled:!x&&!(A&&A.lock_actions),cancel_title:A&&A.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Fe,discard_action:Fe.action,merge_step:ke,discard_enabled:Fe.enabled,discard_title:Fe.title,merge_enabled:!ke&&!a&&!be&&!(A&&A.lock_actions)&&!Re&&!_e&&(he||ie||He||et),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":He||et?"\uC815\uB9AC \uC7AC\uAC1C":ie&&!ke&&!He?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:be?Fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Re?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":He?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ie?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":he?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,h=n?Dn(n,l):null,T=Nn({transport:r,uiOrderStore:l}),$=null,E=[],B=kf(),x=Tf(),Y=Rt(f)?f:Cf(),te=new Map;function I(){let p=Ht.find(w=>w.value===Y);return p?p.label:"\uC624\uB298"}let O=Lf(),A=!1,j=new Set,P=new Set,ne=new Set,Ee="ordinary",ie=!1,he=new Map,ke=[],He=document.createElement("div");He.className="worker-console";let et=document.createElement("div");et.className="worker-top";let Re=document.createElement("div");Re.className="worker-drawer-overlay",Re.hidden=!0;let Fe=document.createElement("div");Fe.className="worker-drawer-overlay__backdrop";let be=document.createElement("div");be.className="worker-drawer-host";let _e=document.createElement("div");_e.className="worker-drawer-host",_e.hidden=!0,Re.append(Fe,be,_e);let Ae=document.createElement("div");Ae.className="worker-lanes-host",He.append(et,Re,Ae),e.appendChild(He);let me=null,G=rs(be,{transport:r,sessionLogStore:a,onClose:()=>{me=null,Re.hidden=!0,Z()}}),K=Yl(_e,{onClose:()=>{_e.hidden=!0,Re.hidden=!0,Z()}}),Ie=as(He,{queueStore:s,presetStore:o,transport:r});function de(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:wn,queue:[],pr_wait:[],done:[]}}function le(){let p=de();return typeof p.revision=="number"?p.revision:0}function R(p){p&&p.queue&&s&&s.set(p.queue)}function q(){let p=de().queue;return Array.isArray(p)?p.length:0}async function ce(p,w){if(!r)return;let S=await r("worker-queue-place",{bead_id:p,index:w,expected_revision:le()});R(S),S&&S.conflict&&await r("worker-queue-place",{bead_id:p,index:w,expected_revision:le()}).then(R)}async function Ue(p,w){if(!r)return;let S=await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:le()});R(S),S&&S.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:le()}).then(R)}async function Ce(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:le()});R(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:le()}).then(R)}async function ve(){if(!r||ie)return;let w=(Array.isArray(de().queue)?de().queue:[]).map(ue=>ue.bead_id).filter(ue=>ne.has(ue));if(w.length===0)return;if(w.some(ue=>{let je=he.get(ue);return je!==!0&&je!==!1})){ee("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let S=Ee==="serial",se=w.filter(ue=>he.get(ue)!==S);if(se.length===0){ne.clear(),Z(),ee("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}ie=!0,Z();let fe=[],ge=0;try{for(let ue of se){let je=await Promise.resolve(r(S?"label-add":"label-remove",{id:ue,label:Ro})).catch(()=>[]),X=Array.isArray(je)?je[0]:je,v=X&&typeof X=="object"?X.labels:null;X&&typeof X=="object"&&X.id===ue&&Array.isArray(v)&&yn(v)===S?ge+=1:fe.push(ue)}if(fe.length===0){ne.clear(),ee(`${ge}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ne.clear();for(let ue of fe)ne.add(ue);ee(`${se.length}\uAC1C \uC911 ${ge}\uAC1C \uBCC0\uACBD \xB7 ${fe.length}\uAC1C \uC2E4\uD328 (${fe.join(", ")})`,"error")}finally{ie=!1,Z()}}async function $e(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Xe(p){if(!r||!p)return;let w=async(se={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:le(),...se}),S=await w();R(S),S&&S.conflict&&(S=await r("worker-attempt-resume",{attempt_id:p,expected_revision:le()}),R(S)),S=await Jt(S,(se,fe)=>w({continuation:se,decision_token:fe}),{onResult:R,refresh:()=>w()}),S&&S.resumed===!1&&!S.conflict&&S.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function qe(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:le()});R(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:le()}),R(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ee(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function We(p,w,S=!0){if(!r)return null;let se=r,fe=await se(p,{...w,expected_revision:le()});return R(fe),fe&&fe.conflict&&S&&(fe=await se(p,{...w,expected_revision:le()}),R(fe)),fe}async function D(p){if(!r||!p)return;let w=de().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await z(p,w.mismatch);return}j.add(p),Z();let S;try{S=await We("worker-merge-queue-add",{bead_id:p})}finally{j.delete(p),Z()}!S||S.conflict||S.applied||ee("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function z(p,w){let S=await Jt({continuation_mismatch:w},(fe,ge)=>We("worker-merge-queue-add",{bead_id:p,continuation:fe,decision_token:ge},!1)),se=S?.queue?.merge_queue?.find(fe=>fe.bead_id===p)?.continuation_action;if(S?.applied!==!0&&se?.continuation===null&&se.mismatch){await z(p,se.mismatch);return}S&&S.applied===!1&&!S.conflict&&ee("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function F(p){if(!r)return;let w=await We("worker-merge-auto-toggle",{on:p});!w||w.conflict||ee(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function y(p){if(!r||!p)return;let w=await We("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ee("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function C(){await We("worker-merge-queue-remove",{all:!0})}async function L(p,w=null,S="unmerged",se=null){if(!r||!p)return;let fe=mn(p,S);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let ue=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:le()});if(R(ue),ue&&ue.conflict&&(ue=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...se?{operation_id:se}:{},expected_revision:le()}),R(ue)),ue&&ue.discarded===!0){ee(cs(ue),"success",5e3);return}if(ue&&ue.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${ue.reason}`,"error",2800);return}if(ue&&ue.accepted&&ue.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ue&&ue.accepted&&!ue.discarded){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ue&&!ue.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function W(p,w){if(!r||!w||P.has(w))return;P.add(w),Z();let S;try{let se=async(fe={})=>await r(p,{bead_id:w,expected_revision:le(),...fe});S=await se(),R(S),S&&S.conflict&&(S=await r(p,{bead_id:w,expected_revision:le()}),R(S)),p==="worker-revise-fix"&&(S=await Jt(S,(fe,ge)=>se({continuation:fe,decision_token:ge}),{onResult:R,refresh:()=>se()}))}finally{P.delete(w),Z()}if(!(!S||S.conflict)){if(S.ok){ee(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ee(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function J(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:le()});R(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:le()}).then(R)}async function Oe(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(R(w),w&&w.ok===!1){ee(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ee("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function xe(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});R(w),w&&w.ok===!1&&ee(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function De(p){if(!r||!Number.isFinite(p))return;let w=Math.max(wn,Math.floor(p)),S=await r("worker-queue-set-slots",{slots:w,expected_revision:le()});R(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:le()}).then(R)}async function Ge(p){if(!r)return;let w=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:le()});R(w),w&&w.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:le()}).then(R)}function it(){let p=de(),w=h?h.selectBoardColumn(hf,"ready"):[],S=h?h.selectBoardColumn(bf,"blocked"):[],se=h?h.selectBoardColumn(yf,"closed"):[],fe=h?h.selectBoardColumn(vf,"in_progress"):[],ge=new Map;for(let g of fe){let M=Nf(g);if(!M)continue;let ae=ge.get(M);ae?ae.push(g):ge.set(M,[g])}let ue=g=>{let M=Mn(ge.get(g)||[]);return M?M.title||M.id:null},je=p.bead_titles||{},X=new Map;for(let[g,M]of Object.entries(je))typeof M=="string"&&M.length>0&&X.set(g,M);for(let g of[...w,...S])X.set(g.id,g.title||g.id);he.clear();let v=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},H=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,M]of Object.entries(H))Array.isArray(M)&&he.set(g,yn(M));for(let g of[...w,...S]){let M=g.labels;if(!Array.isArray(M))continue;if(!he.has(g.id)){he.set(g.id,yn(M));continue}let ae=v[g.id],Ze=Qt(ae&&typeof ae=="object"?ae.updated_at:null),zt=Qt(g.updated_at);zt!==null&&Ze!==null&&zt>Ze&&he.set(g.id,yn(M))}let oe=new Map;for(let[g,M]of Object.entries(v))M&&typeof M=="object"&&oe.set(g,M);for(let g of[...w,...S])oe.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Le=g=>oe.get(g)||{},Qe=p.pr_wait||[],Ke=p.pr_observations||{},_=p.pr_activity||{},d=p.cleanup_failed||{},k=Object.entries(d).map(([g,M])=>({bead_id:g,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),b=p.queue||[],N=new Set(b.map(g=>g.bead_id));for(let g of ne)N.has(g)||ne.delete(g);let re=new Set([...b.map(g=>g.bead_id),...Qe.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),Q=new Set(S.map(g=>g.id)),Ne=l?l.get()?.order||{}:{},Me=new Set,Kt=[];for(let g of[...w,...S])re.has(g.id)||Me.has(g.id)||Mf(g)||Ul(g.labels)||(Me.add(g.id),Kt.push(g));E=Df(Kt,x,Ne);let _s=p.admission||{},Po=g=>{let M=_s[g];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof M.reason=="string"?M.reason:"",Ze=ae.indexOf(":");return Ze>0&&Ze<ae.length-1?`\u26D4 ${ae.slice(0,Ze)} (${ae.slice(Ze+1)})`:`\u26D4 ${ae}`},pc=E.map(g=>{let M=fn(g),ae=M.path.length>0,Ze=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Ze&&ae&&!M.conflict,ar=Q.has(g.id),Ct=[];ar&&Ct.push(Pf(g)),Ze?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):M.conflict?Ct.push("spec_id_conflict"):ae||Ct.push("spec \uC5C6\uC74C");let En=Po(g.id);return En&&Ct.push(En),{id:g.id,title:g.title||g.id,reason:Ct.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ze,status:g.status,blocked:ar,has_spec:ae}}),ms=xf(pc,B),fc=ms.visible,_c=p.revise_parked||{},Hr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Fo=(g,M)=>g.map(ae=>{let Ze=M==="queue"?_c[ae.bead_id]:null,zt=M==="queue"?Gt(Hr,ae.bead_id):null,ar=zt?.operation?zt:null,Ct=M==="queue"?he.has(ae.bead_id)?he.get(ae.bead_id)||!1:null:!1,En=Ct===!0&&(Object.values(p.attempts||{}).some(Zt=>Zt&&Zt.bead_id!==ae.bead_id&&!wf.has(Zt.status))||Qe.some(Zt=>Zt.bead_id!==ae.bead_id)||Object.values(Hr).some(Zt=>Zt&&Zt.bead_id!==ae.bead_id&&Zt.phase!=="done")),na=M==="done"?[]:[Po(ae.bead_id)];return En&&na.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ae.bead_id,title:X.get(ae.bead_id)||ae.bead_id,reason:na.filter(Boolean).join(" \xB7 "),draggable:M!=="done"&&!ar,done:M==="done",lane:M,selectable:M==="queue",selected:M==="queue"&&ne.has(ae.bead_id),worker_serial:Ct,discard:ar,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!ar&&!P.has(ae.bead_id),revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?It(p.attempts||{},ae.bead_id):null,done_at:M==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...Le(ae.bead_id)}}),qo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&qo.set(g.bead_id,g.added_at);let Wr=p.attempts?Object.values(p.attempts):[],gs=new Set;for(let g of Wr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&gs.add(g.resumed_from);let hs=new Map;for(let g of Wr)hs.set(g.bead_id,g.attempt_id);let bs=new Map;for(let g of Wr)bs.set(g.attempt_id,g);function vs(g){let M=new Set,ae=g;for(;ae&&!M.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;M.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&bs.get(ae.resumed_from)||null}return!1}let $n=typeof p.declared_base=="string"?p.declared_base:null;function mc(g){let M=null;for(let ae of Wr)!ae||ae.bead_id!==g||vs(ae)||(M===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=ae);return M&&typeof M.target_base=="string"?M.target_base:null}let Bo=[],Uo=[],gc=g=>{let M=hs.get(g.bead_id)!==g.attempt_id,ae=qo.get(g.bead_id),Ze=typeof ae=="number"&&ae>0&&typeof g.finished_at=="number"&&ae>=g.finished_at;return!M&&!Ze&&typeof g.dismissed_at!="number"},jo=g=>{let M=typeof g.session_id=="string"&&g.session_id.length>0,ae=gs.has(g.attempt_id);return{eligible:M&&!ae,reason:M?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dt=null;for(let g of Wr){let M=g.status==="paused"&&!gs.has(g.attempt_id);if(g.status==="running"||M)Uo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:X.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:M,conflict_resolution:vs(g),base_exception:Lo($n,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),usage:It(p.attempts||{},g.bead_id),current_child:ue(g.bead_id),...Le(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&gc(g)){let ae=jo(g);Bo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:X.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:vs(g),base_exception:Lo($n,g.target_base),usage:It(p.attempts||{},g.bead_id),current_child:ue(g.bead_id),...Le(g.bead_id)}),Dt=g}}let xn=[...Bo,...Uo],zo=null;if(Dt){let g=jo(Dt),M=Dt.cause_detail;zo={bead_id:Dt.bead_id,repo:Dt.repo||"",reason:Dt.cause||Dt.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Dt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(Hr,Dt.bead_id,{attempt_id:Dt.attempt_id})}}let hc=new Set(xn.map(g=>g.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],Ho=new Map,Wo=new Map,Go=new Map;ys.forEach((g,M)=>{g&&typeof g.bead_id=="string"&&(Ho.set(g.bead_id,M+1),Wo.set(g.bead_id,g.resolution),Go.set(g.bead_id,g.continuation_action||null))});let Yo=p.merge_queue_state||{active:null,failures:{}},bc=Yo.failures||{},vc=p.auto_merge_skips||{},Vo=g=>{let M=vc[g];if(!M)return null;let ae=Ke[g],Ze=ae&&ae.pr?ae.pr.head_sha:null;return Ze&&Ze===M.head_sha?M.reason||"":null},Sn=new Map;for(let g of xn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Sn.has(g.bead_id)||Sn.set(g.bead_id,"paused"):Sn.set(g.bead_id,"running"));let Ko=xn.filter(g=>!g.paused&&g.failed!==!0).length,Zo=(p.workspace_info||{}).slots,yc=typeof Zo=="number"?Zo:typeof p.slots=="number"?p.slots:wn,Xo=p.pr_wait_holds_slot===!0?wn:yc,wc=Ko>Xo,An=kr(Y),kc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>An===void 0||typeof g.added_at!="number"||g.added_at>=An).sort((g,M)=>(M.added_at||0)-(g.added_at||0)),Gr=Fo(kc,"done"),$c=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Qo=[],xc=u?.()||"";for(let g of se){let M=Qt(g.closed_at);if(typeof g.id!="string"||$c.has(g.id)||M===null||An!==void 0&&M<An||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ae=`${xc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ze=te.get(ae);Ze===void 0&&r&&(te.set(ae,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Ct=>ns(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");te.set(ae,ar?"session":"not-session"),Z()}).catch(()=>{te.set(ae,"failed"),Z()})),Ze==="session"&&Qo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:M,created_at:g.created_at,updated_at:g.updated_at})}Gr.push(...Qo),Gr.sort((g,M)=>(M.done_at||0)-(g.done_at||0));let Tn={};for(let g of er)Tn[g]=0;let Jo=!1,ea=0,ws=0,ta=0;for(let g of Gr){let M=g.usage;if(M&&typeof M=="object"){let ae=!1;for(let Ze of er)Number.isFinite(M[Ze])&&(Tn[Ze]+=M[Ze],Jo=!0,ae=!0);ae&&(ws+=1,Number.isFinite(M.total_cost_usd)&&(ea+=M.total_cost_usd,ta+=1))}}ws>0&&ta===ws&&(Tn.total_cost_usd=ea);let ra=Gr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Sc=ra.length>0?gt(jn(ra)):Jo?Nt(Tn):null;return{queue:p,idToTitle:X,candidates:fc,candidate_hidden:{blocked:ms.hidden_blocked,spec:ms.hidden_spec},running:xn,live_count:Ko,slots:Xo,over_cap:wc,failure:zo,waiting:Fo(b.filter(g=>!hc.has(g.bead_id)),"queue"),pr_wait:Qe.map(g=>zf(g.bead_id,X.get(g.bead_id)||g.bead_id,Ke,d[g.bead_id]||null,It(p.attempts||{},g.bead_id),_[g.bead_id]||(j.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Sn.get(g.bead_id)||null,g.external===!0,{position:Ho.get(g.bead_id)||0,active:Yo.active===g.bead_id,failure:bc[g.bead_id]||null,resolution:Wo.get(g.bead_id),continuation_action:Go.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Vo(g.bead_id):null,Lo($n,mc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(hs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...Le(g.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:Qe.map(g=>g.bead_id).filter(g=>Vo(g)!==null),declared_base:$n,done:Gr,token_total:Sc,cleanup_failures:k,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function rt(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",S=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=ht(p),fe=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ge=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,ue=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,je=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${wn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,X=_l({failure:p.failure}),v=al(p.repo_operations,p.cleanup_failures);return A?i`<div class="worker-ribbon">
          ${S} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${je}</div>
          <div class="worker-kpi">${ue}</div>
        </div>
        ${v}${X}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${se}${je}</div>
        <div class="worker-kpi">
          ${fe}${ge}${ue}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(H=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${H.tooltip}
                >${I()} 완료 · 누적 ${H.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${v}${X}`}function _t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(S=>!S.paused&&S.failed!==!0);return i`<section
      class="worker-now${w?" worker-pane--live":""}"
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
      ${p.running.length>0?$o(p.running,Date.now(),me):""}
      ${p.pr_wait.map(S=>bo(S))}
    </section>`}function $t(p){let w=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Sf.map(S=>i`<button
              type="button"
              class="worker-filter__chip${B.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${B.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function ot(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Af.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function lt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Y}
      >
        ${Ht.map(p=>i`<option value=${p.value} ?selected=${Y===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function st(){if(ne.size===0)return"";let p=Array.from(ne),w=p.some(S=>{let se=he.get(S);return se!==!0&&se!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${Ee}
        ?disabled=${ie}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${w||ie}
        title=${w?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":ie?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function ct(p){let w=(p.queue.pr_wait||[]).filter(ge=>ge&&ge.external!==!0&&typeof ge.bead_id=="string"),S=new Set(p.running.filter(ge=>!ge.paused&&ge.failed!==!0).map(ge=>ge.bead_id));for(let ge of w)S.add(ge.bead_id);let se=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||w.length===0||p.waiting.length===0||S.size<p.slots),fe=p.pr_wait.some(ge=>ge.worker_serial===!0);if(!(!se&&!(fe&&p.queue.auto_merge!==!0)))return i`${se?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${fe&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function ht(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(w)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let S=new Set(p.auto_excluded),se=p.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!S.has(fe.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function U(p){let w=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ot(),controls:$t(p)});return A?i`<div class="worker-lanes worker-lanes--mobile">
        ${_t(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${st()}${ct(p)}`,collapsible:!0,collapsed:O.queue,preview:Kl(p.waiting)})}
        ${w}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt(),collapsible:!0,collapsed:O.done,preview:Array.isArray(p.token_total)?p.token_total.map(S=>S.label).join(" \xB7 "):p.token_total||Kl(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${st()}${ct(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(S=>!S.paused&&S.failed!==!0),body:$o(p.running,Date.now(),me)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt()})}
    </div>`}function V(p){O={...O,[p]:!O[p]},Of(O),Z()}function Z(){let p=it();Be(rt(p),et),Be(U(p),Ae)}function pe(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let S=Math.round(p.getBoundingClientRect().height);He.style.setProperty("--worker-ribbon-top",`${S}px`)};if(w(),typeof ResizeObserver=="function"){let S=new ResizeObserver(w);S.observe(p),ke.push(()=>S.disconnect())}else window.addEventListener("resize",w),ke.push(()=>window.removeEventListener("resize",w))}function ye(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(If);A=!!p.matches;let w=S=>{let se=!!(S&&typeof S.matches=="boolean"?S.matches:p.matches);se!==A&&(A=se,Z())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),ke.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),ke.push(()=>p.removeListener(w)))}function Te(p){let w=p.target,S=w?.closest?.(".worker-mini__grip"),se=S?S.closest('.worker-mini[data-lane="queue"]'):w?.closest?.('.worker-card[draggable="true"]');if(!se)return;let fe=se.dataset.beadId||"",ge=se.dataset.lane||"";$={bead_id:fe,from_lane:ge};try{p.dataTransfer?.setData("text/plain",fe),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ye(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let S=w.dataset.lane||"";S!=="candidate"&&S!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function nt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Se(p,w){let S=E.find(ue=>ue.id===p);if(!S)return;let se=E.filter(ue=>ue.id!==p),fe=se.length;if(w){let ue=w.dataset.beadId;if(ue===p)return;let je=se.findIndex(X=>X.id===ue);je>=0&&(fe=je)}let ge=se.slice();ge.splice(fe,0,S),T.applyReorder(p,ge,fe)}function Ve(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let S=w.dataset.lane||"",se=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",fe=$?.from_lane||"";if($=null,!se)return;let ge=p.target?.closest?.(".worker-mini, .worker-card"),ue=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),je=ue.length;if(ge){let X=ue.indexOf(ge);X>=0&&(je=X)}if(w.classList.contains("worker-pane--collapsed")&&(je=q()),S==="candidate"){if(fe==="candidate"){Se(se,ge);return}fe==="queue"&&Ce(se);return}S==="queue"&&(fe==="queue"?Ue(se,je):ce(se,je))}function we(p){B=p,$f(p),Z()}function ut(p){x=p==="board"||p==="created"||p==="spec"?p:fs,Ef(x),Z()}function bt(p){Y=Rt(p)?p:At,Rf(Y),m?.(Y),Z()}function Vt(p){let w=p.target?.closest?.(".worker-mini__select");if(w){let v=w.dataset.beadId||"";v&&(w.checked?ne.add(v):ne.delete(v),Z());return}let S=p.target?.closest?.(".worker-bulk__mode");if(S){Ee=S.value==="serial"?"serial":"ordinary";return}let se=p.target?.closest?.(".worker-filter__blocked");if(se){we({...B,show_blocked:se.checked});return}let fe=p.target?.closest?.(".worker-done-range");if(fe){bt(fe.value);return}let ge=p.target?.closest?.(".worker-sort");if(ge){ut(ge.value||fs);return}let ue=p.target?.closest?.(".worker-pr-wait-hold");if(ue){Ge(ue.checked);return}let je=p.target?.closest?.(".worker-slots__input");if(!je)return;let X=Number.parseInt(je.value,10);if(!Number.isFinite(X)){Z();return}De(X).then(Z)}function Bt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ut(){let p=it();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function mt(){me&&G.close(),_e.hidden=!1,Re.hidden=!1,K.open(Ut()),Z()}function xt(p){let w=de(),S=w.attempts?w.attempts[p]:null;me=p,K.close(),_e.hidden=!0,Re.hidden=!1,G.open({attempt_id:p,meta:Bt(S)}),Z()}function jt(){if(K.isOpen()&&K.refresh(Ut()),!me)return;let p=de(),w=p.attempts?p.attempts[me]:null;if(w){G.updateMeta(Bt(w));return}G.close()}function Ot(p){let w=p.target,S=w?.closest?.(".worker-bulk__apply");if(S){S.disabled||ve();return}if(w?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){Ie.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){mt();return}let se=w?.closest?.(".worker-repo-op__session");if(se){let Q=se.dataset.attemptId;Q&&xt(Q);return}let fe=w?.closest?.(".worker-repo-op__resolve");if(fe){Oe(fe.dataset.operationId||"");return}let ge=w?.closest?.(".worker-repo-op__dismiss");if(ge){xe(ge.dataset.operationId||"");return}let ue=w?.closest?.(".worker-cleanup__resume");if(ue){let Q=ue.dataset.beadId;Q&&D(Q);return}let je=w?.closest?.(".worker-banner__resume");if(je){let Q=je.dataset.attemptId;Q&&Xe(Q);return}let X=w?.closest?.(".worker-banner__discard");if(X){let Q=X.dataset.confirmation==="merged"?"merged":"unmerged";L(X.dataset.beadId||"",X.dataset.attemptId||null,Q,X.dataset.operationId||null);return}let v=w?.closest?.(".worker-banner__dismiss");if(v){let Q=v.dataset.attemptId;Q&&qe(Q);return}if(w?.closest?.(".worker-play")){J(!de().auto_advance);return}let H=w?.closest?.(".worker-merge-all");if(H){H.classList.contains("worker-merge-all--stop")?de().auto_merge===!0?F(!1):C():F(!0);return}let oe=w?.closest?.(".worker-pane__hd--toggle");if(oe){let Q=oe.dataset.lane;(Q==="queue"||Q==="done")&&V(Q);return}let Le=w?.closest?.(".worker-card__place");if(Le){let Q=Le.dataset.beadId;Q&&!Le.disabled&&ce(Q,q());return}let Qe=w?.closest?.(".worker-filter__chip");if(Qe){let Q=Qe.dataset.spec;(Q==="all"||Q==="with"||Q==="without")&&we({...B,spec:Q});return}let Ke=w?.closest?.(".worker-mini__merge");if(Ke){D(Ke.dataset.beadId||"");return}let _=w?.closest?.(".worker-mini__merge-cancel");if(_){y(_.dataset.beadId||"");return}let d=w?.closest?.(".worker-mini__discard");if(d){L(d.dataset.beadId||"",d.dataset.attemptId||null,d.dataset.discardMode==="merged"?"merged":"unmerged",d.dataset.operationId||null);return}let k=w?.closest?.(".worker-mini__revise-fix");if(k){W("worker-revise-fix",k.dataset.beadId||"");return}let b=w?.closest?.(".worker-mini__revise-approve");if(b){W("worker-revise-approve",b.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Q=w?.closest?.(".rtile"),Ne=Q?.dataset?.beadId,Me=Q?.dataset?.attemptId;Ne&&L(Ne,Me||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&qe(Ne);return}if(w?.closest?.(".rtile__pause")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&$e(Ne);return}if(w?.closest?.(".rtile__resume")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&Xe(Ne);return}if(w?.closest?.(".rtile__session")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&xt(Ne);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){K.close(),G.close();return}if(w?.closest?.(".worker-drawer-host"))return;let N=w?.closest?.(".rtile");if(N){if(w?.closest?.(".rtile__id")){let Ne=N.dataset.beadId;Ne&&Sr(Ne).then(Me=>{Me?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Q=N.dataset.beadId;Q&&c&&c(Q);return}let re=w?.closest?.(".worker-mini, .worker-card");if(re){let Q=re.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Q&&Sr(Q).then(Ne=>{Ne?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Q&&c&&c(Q)}}return e.addEventListener("dragstart",Te),e.addEventListener("dragover",Ye),e.addEventListener("dragleave",nt),e.addEventListener("drop",Ve),e.addEventListener("click",Ot),e.addEventListener("change",Vt),ye(),pe(),h&&ke.push(h.subscribe(()=>{for(let[p,w]of te)w==="failed"&&te.delete(p);Z()})),s&&ke.push(s.subscribe(()=>{Z(),jt()})),Z(),{load(){Z()},openExecDefaults(){Ie.open()},destroy(){for(let p of ke.splice(0))try{p()}catch{}e.removeEventListener("dragstart",Te),e.removeEventListener("dragover",Ye),e.removeEventListener("dragleave",nt),e.removeEventListener("drop",Ve),e.removeEventListener("click",Ot),e.removeEventListener("change",Vt);try{G.destroy()}catch{}Re.hidden=!0;try{Ie.destroy()}catch{}Be(i``,e)}}}function Do(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function tc(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(A){let P=A.target.value,Ee=t.getState().workspace?.current?.path||"";if(P&&P!==Ee){o("switching workspace to %s",P),l=!0,O();try{await r(P)}catch(ie){o("workspace switch failed: %o",ie)}finally{l=!1,O()}}}async function m(){let A=t.getState(),j=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!j||c)){o("git-pulling workspace %s",j),c=!0,O();try{await n(j)}catch(P){o("workspace git pull failed: %o",P)}finally{c=!1,O()}}}function h(A){let j=A.target;j&&e.contains(j)||E()}function T(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),O())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),O())}function B(){u?E():$()}async function x(A){let j=A.target,P=j.value,ne=j.checked;o("toggling visibility %s \u2192 %s",P,String(ne));try{await s(P,ne)}catch(Ee){o("workspace visibility toggle failed: %o",Ee)}}function Y(A){return A?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function te(A,j){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(P=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${P.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${P.path}"
                        .checked=${!j.has(P.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Do(P.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let A=t.getState(),j=A.workspace?.current,P=A.workspace?.available||[],ne=new Set(A.workspace?.hidden||[]),Ee=j?.path||P[0]?.path||"";if(P.length===0)return i``;let ie=P.filter(he=>!ne.has(he.path)||he.path===Ee);if(ie.length<=1){let he=ie[0]||P[0],ke=Do(he.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${ke}</span
          >
          ${te(P,ne)}
          ${Y(Ee)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${ie.map(he=>i`
              <option
                value="${he.path}"
                ?selected=${he.path===Ee}
                title="${he.path}"
              >
                ${Do(he.path)}
              </option>
            `)}
        </select>
        ${te(P,ne)}
        ${Y(Ee)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Be(I(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),Be(i``,e)}}}var rc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Mo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function nc(e,t,r=Mo()){return{id:r,type:e,payload:t}}function sc(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],m=new Map,h=new Set;function T(I){for(let O of Array.from(h))try{O(I)}catch{}}function $(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*I,A=Math.max(0,Math.round(I+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",A,a+1),l=setTimeout(()=>{l=null,te()},A)}function E(I){try{s?.send(JSON.stringify(I))}catch(O){t("ws send failed",O)}}function B(){for(o="open",t("ws open"),T(o),a=0;f.length;){let I=f.shift();I&&E(I)}}function x(I){let O;try{O=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let j=u.get(O.id);u.delete(O.id),O.ok?j?.resolve(O.payload):j?.reject(O.error||new Error("ws error"));return}let A=m.get(O.type);if(A&&A.size>0)for(let j of Array.from(A))try{j(O.payload)}catch(P){t("ws event handler error",P)}else t("ws received unhandled message type: %s",O.type)}function Y(){o="closed",t("ws closed"),T(o);for(let[I,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(I);a+=1,$()}function te(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",T(o),s.addEventListener("open",B),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(O){t("ws connect failed %o",O),$()}}return te(),{send(I,O){if(!rc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let A=Mo(),j=nc(I,O,A);return t("send %s id=%s",I,A),new Promise((P,ne)=>{u.set(A,{resolve:P,reject:ne,type:I}),s&&s.readyState===s.OPEN?E(j):(t("queue %s id=%s (state=%s)",I,A,o),f.push(j))})},on(I,O){m.has(I)||m.set(I,new Set);let A=m.get(I);return A?.add(O),()=>{A?.delete(O)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,te()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Hf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Wf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var No=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],oc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Gf="bdui.worker.done-range",ac=Il,ic="worker:queue",lc="ui:order",cc="ui:display-policy",dc="exec:presets",hr="tab:board:closed",uc="beads-ui.board.closed-range";function Yf(e){let t=at("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Bl(s),o&&a&&l&&c){let be=function(_,d){let k="Request failed",b="";if(_&&typeof _=="object"){let re=_;if(typeof re.message=="string"&&re.message.length>0&&(k=re.message),typeof re.details=="string")b=re.details;else if(re.details&&typeof re.details=="object")try{b=JSON.stringify(re.details,null,2)}catch{b=""}}else typeof _=="string"&&_.length>0&&(k=_);let N=d&&d.length>0?`Failed to load ${d}`:"Request failed";Fe.open(N,k,b)},D=function(_){return`${S.getState().workspace.current?.path||""}\0${_}`},z=function(){ce&&(ce().catch(()=>{}),ce=null),Ue=null,Ce=null},y=function(_){ve=_;let d=()=>{ve!==_||S.getState().selected_id!==_||(ve=null,F(_))};if(!qe){Xe.then(d);return}d()},J=function(_,d,k,b,N){return k!==W[d]?(N().catch(()=>{}),!1):(_.set(b,N),!0)},Oe=function(){let _=S.getState();rt(_.view==="board"),ct(_.view==="worker"),pe(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id)},Ge=function(){let _=kr(xe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},it=function(){let _=kr(De);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},rt=function(_){if(_)for(let[d,k]of No){if(C.has(d)||L.has(d))continue;let b=d===hr?Ge():{type:k};try{G.register(d,b)}catch(Q){t("register %s store failed: %o",d,Q)}L.add(d);let N=W.board,re=!1;me.subscribeList(d,b).then(Q=>{re=!J(C,"board",N,d,Q)}).catch(Q=>{t("subscribe %s failed: %o",d,Q),be(Q,"board")}).finally(()=>{L.delete(d),re&&Oe()})}else ot()},ot=function(){W.board+=1;for(let[_]of No){let d=C.get(_);d&&(d().catch(()=>{}),C.delete(_));try{G.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},ct=function(_){if(!_){ht();return}for(let[d,k]of oc){if(lt.has(d)||L.has(d))continue;let b=d===gr?it():{type:k};try{G.register(d,b)}catch(Q){t("register %s store failed: %o",d,Q)}L.add(d);let N=W.worker,re=!1;me.subscribeList(d,b).then(Q=>{re=!J(lt,"worker",N,d,Q)}).catch(Q=>{t("subscribe %s failed: %o",d,Q),be(Q,"worker")}).finally(()=>{L.delete(d),re&&Oe()})}},ht=function(){W.worker+=1;for(let[_]of oc){let d=lt.get(_);d&&(d().catch(()=>{}),lt.delete(_));try{G.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},U=function(_){if(!_){V();return}st||(Ae("subscribe-worker-queue",{id:ic}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),st=()=>Ae("unsubscribe-worker-queue",{id:ic}))},V=function(){st&&(st().catch(()=>{}),st=null)},pe=function(_){if(!_){ye();return}Z||(Ae("subscribe-monitor-pipeline",{id:ac}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),Z=()=>Ae("unsubscribe-monitor-pipeline",{id:ac}))},ye=function(){Z&&(Z().catch(()=>{}),Z=null)},Ye=function(){Te||(Ae("subscribe-ui-order",{id:lc}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Te=()=>Ae("unsubscribe-ui-order",{id:lc}))},nt=function(){Te&&(Te().catch(()=>{}),Te=null),de.clear()},Ve=function(){Se||(Ae("subscribe-display-policy",{id:cc}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Se=()=>Ae("unsubscribe-display-policy",{id:cc}))},we=function(){Se&&(Se().catch(()=>{}),Se=null),le.clear()},bt=function(){ut||(Ae("subscribe-exec-presets",{id:dc}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),ut=()=>Ae("unsubscribe-exec-presets",{id:dc}))},jt=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=be,f=D,m=z,h=y,T=J,$=Oe,E=Ge,B=it,x=rt,Y=ot,te=ct,I=ht,O=U,A=V,j=pe,P=ye,ne=Ye,Ee=nt,ie=Ve,he=we,ke=bt,He=jt;let et=document.getElementById("header-loading"),Re=Fa(et),Fe=ol(e),_e=sc(),Ae=Re.wrapSend((_,d)=>_e.send(_,d)),me=Ia(Ae),G=La(),K=Da(),Ie=ga(),de=Oa(),le=_a(),R=ma(),q=ha();_e.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&R.set({revision:d.revision,presets:d.presets})}),_e.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{Ie.set(d.workspaces,d.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{de.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),_e.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{le.set(d.policy)}catch{}}),_e.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{q.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),_e.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{q.append(d.attempt_id,d.event)}catch{}}),_e.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",b=k?G.getStore(k):null;if(b&&d&&d.type==="snapshot")try{b.applyPush(d)}catch{}}),_e.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",b=k?G.getStore(k):null;if(b&&d&&d.type==="upsert")try{b.applyPush(d)}catch{}}),_e.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",b=k?G.getStore(k):null;if(b&&d&&d.type==="delete")try{b.applyPush(d)}catch{}});let ce=null,Ue=null,Ce=null,ve=null,$e=()=>{},Xe=new Promise(_=>{$e=()=>_(void 0)}),qe=!1,We=!1;async function F(_){let d=D(_);if(d===Ue||d===Ce)return;Ce=d;let k=`detail:${_}`,b={type:"issue-detail",params:{id:_}};try{G.register(k,b)}catch(N){t("register detail store failed: %o",N)}try{let N=await me.subscribeList(k,b);if(S.getState().selected_id!==_||D(_)!==d){await N().catch(()=>{});return}ce&&await ce().catch(()=>{}),ce=N,Ue=d}catch(N){t("detail subscribe failed: %o",N),be(N,"issue details")}finally{Ce===d&&(Ce=null)}}let C=new Map,L=new Set,W={board:0,worker:0},xe=At;try{let _=window.localStorage.getItem(uc);Rt(_)&&(xe=_)}catch{}let De=At;try{let _=window.localStorage.getItem(Gf);Rt(_)&&(De=_)}catch{}async function _t(_){if(!Rt(_)||_===xe)return;xe=_;try{window.localStorage.setItem(uc,_)}catch{}let d=C.get(hr);if(!d)return;C.delete(hr),await d().catch(()=>{});let k=Ge();try{G.register(hr,k)}catch(b){t("register %s store failed: %o",hr,b)}try{let b=await me.subscribeList(hr,k);C.set(hr,b)}catch(b){t("re-subscribe %s failed: %o",hr,b),be(b,"board")}}async function $t(_){if(!Rt(_)||_===De)return;De=_;let d=lt.get(gr);if(!d)return;lt.delete(gr),await d().catch(()=>{});let k=it();try{G.register(gr,k)}catch(b){t("register %s store failed: %o",gr,b)}try{let b=await me.subscribeList(gr,k);lt.set(gr,b)}catch(b){t("re-subscribe %s failed: %o",gr,b),be(b,"worker")}}let lt=new Map,st=null,Z=null,Te=null,Se=null,ut=null;async function Vt(){Se=null,le.clear(),ut=null,R.clear(),st=null,Z=null,C.clear(),lt.clear(),W.board+=1,W.worker+=1,bt();let _=S.getState().workspace.current?.path;if(_)try{await _e.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ve();let d=S.getState();rt(d.view==="board"),ct(d.view==="worker"),pe(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),ot(),ht(),V(),K.clear(),nt(),Ye(),we(),Ve(),z();let _=S.getState();if(_.selected_id)try{G.unregister(`detail:${_.selected_id}`)}catch{}let d=S.getState();rt(d.view==="board"),ct(d.view==="worker"),pe(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&y(d.selected_id)}async function Ut(_){t("requesting workspace switch to %s",_),We=!0;try{let d=await _e.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(S.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await Bt(),ee("Switched to "+jt(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),ee("Failed to switch workspace","error",3e3),d}finally{We=!1}}async function mt(_){t("requesting workspace git pull for %s",_);try{let d=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){ee("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+jt(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,b=d?.message;if(k==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let N=b?`: ${b}`:"";throw ee(`Git pull failed${N}`,"error",3e3),d}}async function xt(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await _e.send("set-workspace-visibility",{path:_,visible:d}),await Ot()}catch(k){t("workspace visibility update failed: %o",k),ee("Failed to update project visibility","error",3e3)}}async function Ot(){try{let _=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,b=Array.isArray(_.hidden)?_.hidden.filter(re=>typeof re=="string"):[];S.setState({workspace:{current:k,available:d,hidden:b}});let N=window.localStorage.getItem("beads-ui.workspace");N&&(!d.some(Q=>Q.path===N)||b.includes(N)?window.localStorage.removeItem("beads-ui.workspace"):k&&N!==k.path&&(t("restoring saved workspace preference: %s",N),await Ut(N)))}}catch(_){t("failed to load workspaces: %o",_)}}_e.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(S.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Ot(),Bt())});let p=!1;if(typeof _e.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(p=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&p&&(p=!1,ee("Reconnected","success",2200),Wf(S,(k,b)=>{t(`${k}: %o`,b)}),Vt())};_e.onConnection(_)}let w="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(w=_)}catch(_){t("view parse error: %o",_)}let S=Pa({config:Hf(),view:w});_e.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=S.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{K.set(d.queue)}catch{}});let se=Ma(S);se.start();let fe=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ge=async(_,d)=>{try{return await Ae(_,d)}catch(k){if(fe.has(_))throw k;return[]}};n&&Ol(n,S,se);let ue=document.getElementById("workspace-picker");ue&&tc(ue,S,Ut,mt,xt);let je=Pl(e,(_,d)=>Ae(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>je.open())}catch{}let X=sl(e,{policyStore:le,transport:(_,d)=>Ae(_,d),labelOptions:()=>{let _=new Set;for(let[d]of No)for(let k of G.snapshotFor(d)||[]){let b=k.labels;if(Array.isArray(b))for(let N of b)typeof N=="string"&&N.length>0&&_.add(N)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>X.open())}catch{}let v=Ya(o,{gotoIssue:_=>se.gotoIssue(_),issueStores:G,transport:ge,workerQueueStore:K,uiOrderStore:de,displayPolicyStore:le,closedRange:xe,onClosedRangeChange:_=>{_t(_)},onNewIssue:()=>je.open()}),H=Oo(a,{transport:ge,issueStores:G,queueStore:K,execPresetStore:R,sessionLogStore:q,uiOrderStore:de,gotoIssue:_=>S.setState({selected_id:_}),getWorkspacePath:()=>S.getState().workspace.current?.path,doneRange:De,onDoneRangeChange:_=>{$t(_)}}),oe=Ll(l,{transport:ge,pipelineStore:Ie,execPresetStore:R,gotoIssue:_=>se.gotoIssue(_),getWorkspacePath:()=>S.getState().workspace.current?.path,switchWorkspace:_=>Ut(_)}),Le=rl(c,{issueStores:G,transport:ge,queueStore:K,execPresetStore:R,sessionLogStore:q,getWorkspacePath:()=>S.getState().workspace.current?.path,onNavigate:_=>{S.getState().view==="worker"?S.setState({selected_id:_}):se.gotoIssue(_)},onClose:()=>{let _=S.getState();S.setState({selected_id:null});try{se.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{S.setState({selected_id:null}),se.gotoView("worker"),H.openExecDefaults()}}),Qe=S.getState().selected_id;Qe&&(c.hidden=!1,Le.load(Qe),y(Qe)),S.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,Le.load(d),We||y(d)):(Le.clear(),c.hidden=!0,z())});let Ke=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",l.hidden=_.view!=="monitor",rt(_.view==="board"),ct(_.view==="worker"),pe(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&v.load(),_.view==="worker"&&H.load(),_.view==="monitor"?oe.load():oe.pause(),window.localStorage.setItem("beads-ui.view",_.view)};S.subscribe(Ke),Ke(S.getState()),Ye(),Ve(),bt(),Ot().finally(()=>{qe=!0,$e()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),b=_.target,N=b&&b.tagName?String(b.tagName).toLowerCase():"",re=N==="input"||N==="textarea"||N==="select"||b&&typeof b.isContentEditable=="boolean"&&b.isContentEditable;d&&k==="n"&&(re||(_.preventDefault(),je.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Yf(t)});export{Yf as bootstrap,Hf as readBootstrapConfig,Wf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
