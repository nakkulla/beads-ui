var Ec=Object.create;var ks=Object.defineProperty;var Cc=Object.getOwnPropertyDescriptor;var Rc=Object.getOwnPropertyNames;var Ic=Object.getPrototypeOf,Lc=Object.prototype.hasOwnProperty;var Oc=(e,t,r)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Dc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rc(t))!Lc.call(e,s)&&s!==r&&ks(e,s,{get:()=>t[s],enumerable:!(n=Cc(t,s))||n.enumerable});return e};var Mc=(e,t,r)=>(r=e!=null?Ec(Ic(e)):{},Dc(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Oc(e,typeof t!="symbol"?t+"":t,r);var ya=$s((i_,va)=>{var Dr=1e3,Mr=Dr*60,Nr=Mr*60,xr=Nr*24,Bc=xr*7,Uc=xr*365.25;va.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return jc(e);if(r==="number"&&isFinite(e))return t.long?Hc(e):zc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Uc;case"weeks":case"week":case"w":return r*Bc;case"days":case"day":case"d":return r*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function zc(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Dr?Math.round(e/Dr)+"s":e+"ms"}function Hc(e){var t=Math.abs(e);return t>=xr?In(e,t,xr,"day"):t>=Nr?In(e,t,Nr,"hour"):t>=Mr?In(e,t,Mr,"minute"):t>=Dr?In(e,t,Dr,"second"):e+" ms"}function In(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ka=$s((l_,wa)=>{function Wc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=ya(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let h=0;h<f.length;h++)m=(m<<5)-m+f.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,h=null,A,$;function T(...j){if(!T.enabled)return;let x=T,Y=Number(new Date),ee=Y-(m||Y);x.diff=ee,x.prev=m,x.curr=Y,m=Y,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let I=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(S,z)=>{if(S==="%%")return"%";I++;let P=r.formatters[z];if(typeof P=="function"){let ie=j[I];S=P.call(x,ie),j.splice(I,1),I--}return S}),r.formatArgs.call(x,j),(x.log||r.log).apply(x,j)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(f)),$),set:j=>{h=j}}),typeof r.init=="function"&&r.init(T),T}function n(f,m){let h=r(this.namespace+(typeof m>"u"?":":m)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,m){let h=0,A=0,$=-1,T=0;for(;h<f.length;)if(A<m.length&&(m[A]===f[h]||m[A]==="*"))m[A]==="*"?($=A,T=h,A++):(h++,A++);else if($!==-1)A=$+1,T++,h=T;else return!1;for(;A<m.length&&m[A]==="*";)A++;return A===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function i(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}wa.exports=Wc});var $a=$s((xt,Ln)=>{xt.formatArgs=Yc;xt.save=Vc;xt.load=Kc;xt.useColors=Gc;xt.storage=Zc();xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Gc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ln.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}xt.log=console.debug||console.log||(()=>{});function Vc(e){try{e?xt.storage.setItem("debug",e):xt.storage.removeItem("debug")}catch{}}function Kc(){let e;try{e=xt.storage.getItem("debug")||xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Zc(){try{return localStorage}catch{}}Ln.exports=ka()(xt);var{formatters:Xc}=Ln.exports;Xc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Kr=globalThis,Rn=Kr.trustedTypes,oa=Rn?Rn.createPolicy("lit-html",{createHTML:e=>e}):void 0,ua="$lit$",lr=`lit$${Math.random().toFixed(9).slice(2)}$`,pa="?"+lr,Nc=`<${pa}>`,wr=document,Zr=()=>wr.createComment(""),Xr=e=>e===null||typeof e!="object"&&typeof e!="function",Rs=Array.isArray,Pc=e=>Rs(e)||typeof e?.[Symbol.iterator]=="function",xs=`[ 	
\f\r]`,Vr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,aa=/-->/g,ia=/>/g,vr=RegExp(`>|${xs}(?:([^\\s"'>=/]+)(${xs}*=${xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),la=/'/g,ca=/"/g,fa=/^(?:script|style|textarea|title)$/i,Is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Is(1),Zt=Is(2),e_=Is(3),kr=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),da=new WeakMap,yr=wr.createTreeWalker(wr,129);function _a(e,t){if(!Rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oa!==void 0?oa.createHTML(t):t}var Fc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Vr;for(let i=0;i<r;i++){let c=e[i],u,f,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Vr?f[1]==="!--"?a=aa:f[1]!==void 0?a=ia:f[2]!==void 0?(fa.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=vr):f[3]!==void 0&&(a=vr):a===vr?f[0]===">"?(a=s??Vr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?vr:f[3]==='"'?ca:la):a===ca||a===la?a=vr:a===aa||a===ia?a=Vr:(a=vr,s=void 0);let A=a===vr&&e[i+1].startsWith("/>")?" ":"";o+=a===Vr?c+Nc:m>=0?(n.push(u),c.slice(0,m)+ua+c.slice(m)+lr+A):c+lr+(m===-2?i:A)}return[_a(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Qr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Fc(t,r);if(this.el=e.createElement(u,n),yr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ua)){let h=f[a++],A=s.getAttribute(m).split(lr),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?As:$[1]==="?"?Ts:$[1]==="@"?Es:Or}),s.removeAttribute(m)}else m.startsWith(lr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(fa.test(s.tagName)){let m=s.textContent.split(lr),h=m.length-1;if(h>0){s.textContent=Rn?Rn.emptyScript:"";for(let A=0;A<h;A++)s.append(m[A],Zr()),yr.nextNode(),c.push({type:2,index:++o});s.append(m[h],Zr())}}}else if(s.nodeType===8)if(s.data===pa)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(lr,m+1))!==-1;)c.push({type:7,index:o}),m+=lr.length-1}o++}}static createElement(t,r){let n=wr.createElement("template");return n.innerHTML=t,n}};function Lr(e,t,r=e,n){if(t===kr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Lr(e,s._$AS(e,t.values),s,n)),t}var Ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??wr).importNode(r,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Jr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Cs(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=wr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Lr(this,t,r),Xr(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==kr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&Xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(wr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Qr.createElement(_a(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=da.get(t.strings);return r===void 0&&da.set(t.strings,r=new Qr(t)),r}k(t){Rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Zr()),this.O(Zr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Lr(this,t,r,0),a=!Xr(t)||t!==this._$AH&&t!==kr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Lr(this,i[n+c],r,c),u===kr&&(u=this._$AH[c]),a||(a=!Xr(u)||u!==this._$AH[c]),u===lt?t=lt:t!==lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Ts=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},Es=class extends Or{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Lr(this,t,r,0)??lt)===kr)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Lr(this,t)}};var qc=Kr.litHtmlPolyfillSupport;qc?.(Qr,Jr),(Kr.litHtmlVersions??(Kr.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Jr(t.insertBefore(Zr(),o),o,void 0,r??{})}return s._$AI(e),s};var St="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ct(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ga(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ha(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ba(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var xa=Mc($a(),1);function at(e){return(0,xa.default)(`beads-ui:${e}`)}function Mt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Sr(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ta(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ea(e,t){let r=Mt(e.updated_at),n=Mt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ca(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Mt(e.created_at),o=Mt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ra(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Qc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Sa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Aa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Qc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ia(e,t){let r=Sa(e),n=Sa(t);if(r!==n)return r<n?-1:1;let s=Aa(e),o=Aa(t);if(s!==o)return s<o?-1:1;let a=Mt(e&&e.created_at),i=Mt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ls=2**20;function Pr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Mt(e&&e.created_at)}function On(e){return(t,r)=>{let n=Pr(t,e),s=Pr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Pr(i,r)-Ls};if(!i)return{rank:Pr(a,r)+Ls};let c=Pr(a,r),u=Pr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Ls}))}}function Ds(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Sr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(h){if(i||!h||h.id!==e)return;let A=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,A),!(A<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let T of $)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=A,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let T=n.get($.id);if(!T)n.set($.id,$);else{let j=Number.isFinite(T.updated_at)?T.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=x){for(let Y of Object.keys(T))Y in $||delete T[Y];for(let[Y,ee]of Object.entries($))T[Y]=ee}}f()}o=A,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=A,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Dn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function La(e){let t=at("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(u)){let $=r.get(A);if(!$)continue;let T=$.itemsById;for(let j of f)typeof j=="string"&&j.length>0&&T.set(j,!0);for(let j of m)typeof j=="string"&&j.length>0&&T.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&T.delete(j)}}async function o(i,c){let u=Dn(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let m=r.get(i);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(m){let h=r.get(i)||null;if(h){let A=n.get(h.key);A&&(A.delete(i),A.size===0&&n.delete(h.key))}throw r.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=r.get(i)||null;if(m){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Dn,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Oa(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Dn(u):"",h=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),A&&h&&m&&h!==m){let $=t.get(c);if($)try{$.dispose()}catch{}let T=s.get(c);if(T){try{T()}catch{}s.delete(c)}let j=Ds(c,f);t.set(c,j);let x=j.subscribe(()=>o());s.set(c,x)}else if(!A){let $=Ds(c,f);t.set(c,$);let T=$.subscribe(()=>o());s.set(c,T)}return r.set(c,m),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Da(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ms(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Jc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ed(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Na(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jc(n),a=ed(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ms(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ms(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var td=Object.freeze({workspace_config:{default_workspace:null}});function Pa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:td.workspace_config.default_workspace}}}function Fa(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Pa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Pa(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function qa(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,h)=>{let A=s++,$=Date.now();n.set(A,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",A,m,r+1),a();let T=!1,j=()=>{T||(T=!0,n.delete(A),i())},x=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,m,Date.now()-$),j())},3e4);try{let Y=await u(m,h),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,m,ee),Y}catch(Y){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,m,ee,Y),Y}finally{clearTimeout(x),j()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function X(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Mn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Ra),c;switch(i){case"created_desc":return c.sort(Sr),c;case"created_asc":return c.sort(Ta),c;case"updated_desc":return c.sort(Ea),c;case"priority":return c.sort(Ca),c;case"manual":default:{let u=r();return u?c.sort(On(u)):c.sort(Sr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ft(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function At(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Nn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Pn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Os(i,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let A=n(Os(i,c,h.order),a);s(h,A);let $=await t("ui-order-set",{expected_revision:h.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Fn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ns(e,t){return!t||typeof e!="string"||e.length===0||Fn(t.visible_labels).includes(e)?!0:Fn(t.hidden_labels).includes(e)?!1:!Fn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function qn(e,t){return Fn(e).filter(r=>Ns(r,t))}function cr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var rd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ua={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ba={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nd={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function sd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ja(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function od(e){if(!e||e.fill==="none"||!e.approval_state)return ja(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ad(e,t,r){let n=rd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=nd[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ua[e]||e}
      </div>
    </div>
  `}function Bn(e,t){if(!e||!e.stages)return"";let r=Ba[e.route]||Ba.spec_backed,n=e.stages,s=sd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ua[a]||a} ${a==="plan"?od(n[a]||{}):ja(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ad(a,n[a]||{},a===s))}
    </div>
  `}function id(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var za=2;function ld(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,za).join(", "),s=r.length-za,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function cd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&cr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&cr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&cr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of qn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&cr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(r,"blocked")&&s.push(...ld(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function dd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ud(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function pd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ia):r.children;return l`
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
        ${ud(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${dd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Un(e,t){let r=id(e.priority);return l`
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
      ${cd(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?Bn(e.workflow,e.status):""}
      ${pd(e,t)}
    </article>
  `}function Fr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Ht.map(o=>l`<option
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
        ${e.items.map(o=>Un(o,t))}
      </div>
    </section>
  `}function Ha(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Un(n,t))}
        </div>
      </div>
    </dialog>
  `}var fd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_d=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],md=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Wa(e,t,r){return l`
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
        ${fd.map(n=>l`<option
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
        ${_d.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${gd(e,t,r)}
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
        ${md.map(n=>l`<option
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
  `}var hd=200,bd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},vd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ga="beads-ui.board.sort",Ya=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function yd(){try{let e=window.localStorage.getItem(Ga);if(e&&Ya.has(e))return e}catch{}return"created_desc"}function Va(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||St,h=s?Mn(s,a):null,A=Pn({transport:o,uiOrderStore:a}),$=[],T=[],j=[],x=[],Y=[],ee=[],I=!1,L=0,S=yd(),z=new Map,P=new Map,ie=new Map,ve=new Set,le={search:"",priority:"",type:"",labels:[]},$e=!1,ke=null;function We(U){return String(U.status||"open")==="open"}function Ze(U){let V=String(U.status||"open");return V==="open"||V==="blocked"}function ze(U){let V=le.search.trim().toLowerCase(),ae=le.priority,pe=le.type,re=le.labels;return U.filter(Ce=>{if(V){let Ve=String(Ce.id||"").toLowerCase(),nt=String(Ce.title||"").toLowerCase();if(!Ve.includes(V)&&!nt.includes(V))return!1}if(ae!==""&&String(Ce.priority)!==ae||pe!==""&&String(Ce.issue_type||"")!==pe)return!1;if(re.length>0){let Ve=Array.isArray(Ce.labels)?Ce.labels:[];if(!re.some(nt=>Ve.includes(nt)))return!1}return!0})}function Te(){let U=new Set;for(let V of[$,T,j,x,Y,ee])for(let ae of V){let pe=Array.isArray(ae.labels)?ae.labels:[];for(let re of pe)typeof re=="string"&&re.length>0&&U.add(re)}return Array.from(U).sort()}function Ae(){return le.search.trim()!==""||le.priority!==""||le.type!==""||le.labels.length>0}function me(){try{if(h){let U=h.selectBoardColumn("tab:board:in-progress","in_progress",S),V=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ze),ae=new Set(U.map(Se=>Se.id)),pe=h.selectBoardColumn("tab:board:ready","ready",S).filter(Se=>We(Se)&&!ae.has(Se.id)),re=h.selectBoardColumn("tab:board:resolved","resolved",S),Ce=h.selectBoardColumn("tab:board:deferred","deferred",S),Ve=h.selectBoardColumn("tab:board:closed","closed").slice(0,hd),nt=[...V,...pe,...U,...re,...Ve];he(nt);let xe=new Set;for(let Se of nt)Se&&Se.id&&!Ps(Se)&&xe.add(Se.id);let Ge=!Ae();$=Ge?en(V,xe):V,T=Ge?en(pe,xe):pe,j=Ge?en(U,xe):U,x=Ge?en(re,xe):re,Y=Ce,L=Ce.length,ee=Ge?en(Ve,xe):Ve,z=new Map;for(let Se of $)z.set(Se.id,"open");for(let Se of T)z.set(Se.id,"open");for(let Se of j)z.set(Se.id,"in_progress");for(let Se of x)z.set(Se.id,"resolved");for(let Se of Y)z.set(Se.id,"deferred");for(let Se of ee)z.set(Se.id,"closed");P=new Map;for(let Se of $)P.set(Se.id,"blocked-col");for(let Se of T)P.set(Se.id,"ready-col");for(let Se of j)P.set(Se.id,"in-progress-col");for(let Se of x)P.set(Se.id,"resolved-col");for(let Se of ee)P.set(Se.id,"closed-col")}Oe()}catch{$=[],T=[],j=[],x=[],Y=[],ee=[],ie=new Map,Oe()}}function he(U){let V=new Map;for(let pe of U)pe&&pe.id&&!V.has(pe.id)&&V.set(pe.id,pe);let ae=new Map;for(let pe of V.values()){let re=Ps(pe);if(!re)continue;let Ce=ae.get(re);Ce||(Ce=[],ae.set(re,Ce)),Ce.push({id:pe.id,title:pe.title,status:pe.status,metadata:pe.metadata,created_at:pe.created_at,updated_at:pe.updated_at})}ie=ae}function be(U){let V=ie.get(U)||[],ae=0;for(let re of V)(re.status==="resolved"||re.status==="closed")&&(ae+=1);let pe=Nn(V);return{total:V.length,count:ae,current:pe,children:V}}function G(U){return!ve.has(U)}function K(U,V){U.preventDefault(),U.stopPropagation(),ve.has(V)?ve.delete(V):ve.add(V),Oe()}function Re(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function ge(U,V){U.preventDefault(),U.stopPropagation(),n(V)}function _e(U,V){ke||n(V)}function R(U,V){U.preventDefault(),U.stopPropagation(),wd(V).then(ae=>{ae&&X("\uBCF5\uC0AC\uB428","success",1200)})}function C(U,V){ke=V,U.dataTransfer&&(U.dataTransfer.setData("text/plain",V),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function ce(U){U.target.classList.remove("board-card--dragging"),mt(),setTimeout(()=>{ke=null},0)}function De(U){let V=String(U.target.value||"");!V||V===m||(m=V,u&&u(V),Oe())}function Ee(){return i?i.get():null}function Ue(U){let V=c?c.get():null,ae=V?V.cleanup_failed:null;if(!ae||typeof ae!="object"||Array.isArray(ae))return null;let pe=ae[U];return!pe||typeof pe!="object"||Array.isArray(pe)?null:pe}let Me={onCardClick:_e,onCopyId:R,onDragStart:C,onDragEnd:ce,onClosedRangeChange:De,rollupFor:be,isExpanded:G,onRollupToggle:K,onChildClick:Re,onFromChipClick:ge,cleanupFailureFor:Ue,get policy(){return Ee()}};function Le(U,V){ke||(E(),n(V))}function Ie(U,V){U.preventDefault(),U.stopPropagation(),E(),n(V)}let Qe={...Me,onCardClick:Le,onChildClick:Ie,onFromChipClick:Ie,get policy(){return Ee()}};function O(U){let V=U.target,ae=e.querySelector(".board-filter__labels");V&&ae&&ae.contains(V)||Z()}function H(U){U.key==="Escape"&&Z()}function q(){$e||($e=!0,document.addEventListener("mousedown",O),document.addEventListener("keydown",H),Oe())}function Z(){$e&&($e=!1,document.removeEventListener("mousedown",O),document.removeEventListener("keydown",H),Oe())}function ue(U){U.key==="Escape"&&E()}function w(){I||(I=!0,document.addEventListener("keydown",ue),Oe())}function E(){I&&(I=!1,document.removeEventListener("keydown",ue),Oe())}let W={onClose:E,onOverlayClick(U){U.target===U.currentTarget&&E()}},de={onSearchInput(U){le.search=String(U.target.value||""),me()},onPriorityChange(U){le.priority=String(U.target.value||""),me()},onTypeChange(U){le.type=String(U.target.value||""),me()},onSortChange(U){let V=String(U.target.value||"");if(!(!Ya.has(V)||V===S)){S=V;try{window.localStorage.setItem(Ga,V)}catch{}me()}},onDeferredToggle(){I?E():w()},onLabelMenuToggle(){$e?Z():q()},onLabelToggle(U){let V=le.labels.indexOf(U);V===-1?le.labels.push(U):le.labels.splice(V,1),me()},onLabelClear(){le.labels.length!==0&&(le.labels=[],me())},onNewIssue(){f&&f()}};function oe(){return l`
      <div class="board-view">
        ${Wa(le,de,{sort_mode:S,deferred_popup_open:I,deferred_count:L,label_options:Te(),label_menu_open:$e})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:ze($)},Me)}
          ${Fr({title:"Ready",id:"ready-col",items:ze(T)},Me)}
          ${Fr({title:"In progress",id:"in-progress-col",items:ze(j)},Me)}
          ${Fr({title:"Resolved",id:"resolved-col",items:ze(x)},Me)}
          ${Fr({title:"Closed",id:"closed-col",items:ze(ee),is_closed:!0,closed_range:m},Me)}
        </div>
        ${I?Ha({items:ze(Y),count:L},Qe,W):""}
      </div>
    `}function Oe(){Be(oe(),e),Ne()}function Ne(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ae of V)Array.from(ae.querySelectorAll(".board-card")).forEach((re,Ce)=>{re.tabIndex=Ce===0?0:-1})}catch{}}async function Je(U,V){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:V}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ae){r("update-status failed: %o",ae),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Fe(U){switch(U){case"blocked-col":return $;case"ready-col":return T;case"in-progress-col":return j;case"resolved-col":return x;default:return[]}}function ut(U,V,ae){if(!o||!a)return;let pe=Fe(U),re=pe.find(Ge=>Ge.id===V);if(!re)return;let Ce=pe.filter(Ge=>Ge.id!==V),Ve=ae.closest?ae.closest(".board-card"):null,nt=Ce.length;if(Ve){let Ge=Ve.getAttribute("data-issue-id");if(Ge===V)return;let Se=Ce.findIndex(dt=>dt.id===Ge);Se>=0&&(nt=Se)}let xe=Ce.slice();xe.splice(nt,0,re),A.applyReorder(V,xe,nt)}function mt(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let ae=U.target.closest(".board-column");ae&&ae!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),ae.classList.add("board-column--drag-over"),rt=ae)}),e.addEventListener("dragleave",U=>{let V=U.relatedTarget;(!V||!e.contains(V))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",U=>{U.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let V=U.target,ae=V.closest(".board-column");if(!ae)return;let pe=U.dataTransfer?.getData("text/plain")||"";if(!pe)return;let re=ae.id,Ce=P.get(pe);if(Ce&&Ce===re){if(vd.has(re)){if(S!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(re,pe,V)}return}let Ve=bd[re];if(!Ve){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}z.get(pe)!==Ve&&Je(pe,Ve)}),e.addEventListener("keydown",U=>{let V=U.target;if(!(V instanceof HTMLElement))return;let ae=String(V.tagName||"").toLowerCase();if(ae==="input"||ae==="textarea"||ae==="select"||ae==="button"||ae==="a"||V.isContentEditable===!0)return;let pe=V.closest(".board-card");if(!pe)return;let re=String(U.key||"");if(re==="Enter"||re===" "){U.preventDefault();let xe=pe.getAttribute("data-issue-id");xe&&n(xe);return}if(re!=="ArrowUp"&&re!=="ArrowDown"&&re!=="ArrowLeft"&&re!=="ArrowRight")return;U.preventDefault();let Ce=pe.closest(".board-column");if(!Ce)return;let Ve=Array.from(Ce.querySelectorAll(".board-card")),nt=Ve.indexOf(pe);if(re==="ArrowDown"&&nt<Ve.length-1){st(pe,Ve[nt+1]);return}if(re==="ArrowUp"&&nt>0){st(pe,Ve[nt-1]);return}if(re==="ArrowLeft"||re==="ArrowRight"){let xe=Array.from(e.querySelectorAll(".board-column")),Ge=xe.indexOf(Ce),Se=re==="ArrowRight"?1:-1,dt=Ge+Se;for(;dt>=0&&dt<xe.length;){let bt=xe[dt].querySelector(".board-card");if(bt){st(pe,bt);return}dt+=Se}}});function st(U,V){try{U.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let ot=null;h&&h.subscribe&&(ot=h.subscribe(()=>{try{me()}catch{}}));let it=null;i&&i.subscribe&&(it=i.subscribe(()=>{try{me()}catch{}}));let gt=null;return c&&c.subscribe&&(gt=c.subscribe(()=>{Oe()})),{async load(){r("load"),me()},clear(){Z(),E(),ot&&(ot(),ot=null),it&&(it(),it=null),gt&&(gt(),gt=null),e.replaceChildren(),$=[],T=[],j=[],x=[],Y=[],ee=[],z=new Map,P=new Map}}}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function en(e,t){return e.filter(r=>{let n=Ps(r);return!(n&&t.has(n))})}async function wd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ar(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ur(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function kd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Qt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await kd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ja="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],tn=[...Jt,"reasoning_output_tokens"],$d=["implementation","review-consult"];function Fs(e){let t=0;for(let r of Jt)t+=_t(e?.[r]);return t}function xd(e){return!e||typeof e!="object"?!1:Jt.some(t=>Number.isFinite(e[t]))}function Ka(e){return!e||typeof e!="object"?!1:tn.some(t=>Number.isFinite(e[t]))}function Sd(e){let t={};for(let r of tn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Za(e){let t={};for(let r of tn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Xa(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Fs(t)}function Ad(e){return e==="claude"?"Claude":"Codex"}function Td(e){return`\u03C4 ${ei(e)}`}function Ed(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ja),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ad(r)} ${Td(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ed(r,n)})}return t}function zn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of tn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=_t(i.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qs(e){return!e||typeof e!="object"?null:Rt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cd(e){return e==="codex"?"codex":"claude"}function pr(){return{subtotal:0,breakdown:Sd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function jn(e,t,r){e.subtotal+=t.subtotal;for(let n of tn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Qa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ei(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function qr(e){return xd(e)?`\u03C4 ${ei(Fs(e))}`:null}function Nt(e){let t=qr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Br(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Fs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ja),r.join(`
`)}function Rt(e,t){let r={claude:pr(),codex:pr()},n={orchestrator:{claude:pr(),codex:pr()},implementation:{claude:pr(),codex:pr()},"review-consult":{claude:pr(),codex:pr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Ka(c)){let f=Cd(i.runner),m=Za(c),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:Xa(f,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),jn(r[f],h,!0),jn(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!$d.includes(f.role)||!Ka(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=Za(f.usage),A={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Xa("codex",h)};A.receipt_id=m,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),h.replayed===!0&&(A.replayed=!0),jn(r.codex,A,!1),jn(n[A.role].codex,A,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Qa(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...Qa(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ci,setPrototypeOf:ti,isFrozen:Rd,getPrototypeOf:Id,getOwnPropertyDescriptor:Ld}=Object,{freeze:yt,seal:It,create:Gs}=Object,{apply:Ys,construct:Vs}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});It||(It=function(t){return t});Ys||(Ys=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Vs||(Vs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Hn=wt(Array.prototype.forEach),Od=wt(Array.prototype.lastIndexOf),ri=wt(Array.prototype.pop),rn=wt(Array.prototype.push),Dd=wt(Array.prototype.splice),Gn=wt(String.prototype.toLowerCase),Bs=wt(String.prototype.toString),Us=wt(String.prototype.match),nn=wt(String.prototype.replace),Md=wt(String.prototype.indexOf),Nd=wt(String.prototype.trim),Pt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),sn=Pd(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ys(e,t,n)}}function Pd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Vs(e,r)}}function qe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gn;ti&&ti(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Rd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Fd(e){for(let t=0;t<e.length;t++)Pt(e,t)||(e[t]=null);return e}function er(e){let t=Gs(null);for(let[r,n]of ci(e))Pt(e,r)&&(Array.isArray(n)?t[r]=Fd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=er(n):t[r]=n);return t}function on(e,t){for(;e!==null;){let n=Ld(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Id(e)}function r(){return null}return r}var ni=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),js=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zs=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qd=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bd=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),si=yt(["#text"]),oi=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ws=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ai=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ud=It(/\{\{[\w\W]*|[\w\W]*\}\}/gm),jd=It(/<%[\w\W]*|[\w\W]*%>/gm),zd=It(/\$\{[\w\W]*/gm),Hd=It(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wd=It(/^aria-[\-\w]+$/),di=It(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gd=It(/^(?:\w+script|data):/i),Yd=It(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ui=It(/^html$/i),Vd=It(/^[a-z][.\w]*(-[.\w]+)+$/i),ii=Object.freeze({__proto__:null,ARIA_ATTR:Wd,ATTR_WHITESPACE:Yd,CUSTOM_ELEMENT:Vd,DATA_ATTR:Hd,DOCTYPE_NAME:ui,ERB_EXPR:jd,IS_ALLOWED_URI:di,IS_SCRIPT_OR_DATA:Gd,MUSTACHE_EXPR:Ud,TMPLIT_EXPR:zd}),an={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Kd=function(){return typeof window>"u"?null:window},Zd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},li=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function pi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Kd(),t=B=>pi(B);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==an.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:A}=e,$=c.prototype,T=on($,"cloneNode"),j=on($,"remove"),x=on($,"nextSibling"),Y=on($,"childNodes"),ee=on($,"parentNode");if(typeof a=="function"){let B=r.createElement("template");B.content&&B.content.ownerDocument&&(r=B.content.ownerDocument)}let I,L="",{implementation:S,createNodeIterator:z,createDocumentFragment:P,getElementsByTagName:ie}=r,{importNode:ve}=n,le=li();t.isSupported=typeof ci=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:$e,ERB_EXPR:ke,TMPLIT_EXPR:We,DATA_ATTR:Ze,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Te,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:me}=ii,{IS_ALLOWED_URI:he}=ii,be=null,G=qe({},[...ni,...js,...zs,...Hs,...si]),K=null,Re=qe({},[...oi,...Ws,...ai,...Wn]),ge=Object.seal(Gs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),_e=null,R=null,C=Object.seal(Gs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ce=!0,De=!0,Ee=!1,Ue=!0,Me=!1,Le=!0,Ie=!1,Qe=!1,O=!1,H=!1,q=!1,Z=!1,ue=!0,w=!1,E="user-content-",W=!0,de=!1,oe={},Oe=null,Ne=qe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Je=null,Fe=qe({},["audio","video","img","source","image","track"]),ut=null,mt=qe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",st="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",it=ot,gt=!1,U=null,V=qe({},[rt,st,ot],Bs),ae=qe({},["mi","mo","mn","ms","mtext"]),pe=qe({},["annotation-xml"]),re=qe({},["title","style","font","a","script"]),Ce=null,Ve=["application/xhtml+xml","text/html"],nt="text/html",xe=null,Ge=null,Se=r.createElement("form"),dt=function(b){return b instanceof RegExp||b instanceof Function},bt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ge&&Ge===b)){if((!b||typeof b!="object")&&(b={}),b=er(b),Ce=Ve.indexOf(b.PARSER_MEDIA_TYPE)===-1?nt:b.PARSER_MEDIA_TYPE,xe=Ce==="application/xhtml+xml"?Bs:Gn,be=Pt(b,"ALLOWED_TAGS")?qe({},b.ALLOWED_TAGS,xe):G,K=Pt(b,"ALLOWED_ATTR")?qe({},b.ALLOWED_ATTR,xe):Re,U=Pt(b,"ALLOWED_NAMESPACES")?qe({},b.ALLOWED_NAMESPACES,Bs):V,ut=Pt(b,"ADD_URI_SAFE_ATTR")?qe(er(mt),b.ADD_URI_SAFE_ATTR,xe):mt,Je=Pt(b,"ADD_DATA_URI_TAGS")?qe(er(Fe),b.ADD_DATA_URI_TAGS,xe):Fe,Oe=Pt(b,"FORBID_CONTENTS")?qe({},b.FORBID_CONTENTS,xe):Ne,_e=Pt(b,"FORBID_TAGS")?qe({},b.FORBID_TAGS,xe):er({}),R=Pt(b,"FORBID_ATTR")?qe({},b.FORBID_ATTR,xe):er({}),oe=Pt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ce=b.ALLOW_ARIA_ATTR!==!1,De=b.ALLOW_DATA_ATTR!==!1,Ee=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Ue=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=b.SAFE_FOR_TEMPLATES||!1,Le=b.SAFE_FOR_XML!==!1,Ie=b.WHOLE_DOCUMENT||!1,H=b.RETURN_DOM||!1,q=b.RETURN_DOM_FRAGMENT||!1,Z=b.RETURN_TRUSTED_TYPE||!1,O=b.FORCE_BODY||!1,ue=b.SANITIZE_DOM!==!1,w=b.SANITIZE_NAMED_PROPS||!1,W=b.KEEP_CONTENT!==!1,de=b.IN_PLACE||!1,he=b.ALLOWED_URI_REGEXP||di,it=b.NAMESPACE||ot,ae=b.MATHML_TEXT_INTEGRATION_POINTS||ae,pe=b.HTML_INTEGRATION_POINTS||pe,ge=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&dt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&dt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Me&&(De=!1),q&&(H=!0),oe&&(be=qe({},si),K=[],oe.html===!0&&(qe(be,ni),qe(K,oi)),oe.svg===!0&&(qe(be,js),qe(K,Ws),qe(K,Wn)),oe.svgFilters===!0&&(qe(be,zs),qe(K,Ws),qe(K,Wn)),oe.mathMl===!0&&(qe(be,Hs),qe(K,ai),qe(K,Wn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?C.tagCheck=b.ADD_TAGS:(be===G&&(be=er(be)),qe(be,b.ADD_TAGS,xe))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?C.attributeCheck=b.ADD_ATTR:(K===Re&&(K=er(K)),qe(K,b.ADD_ATTR,xe))),b.ADD_URI_SAFE_ATTR&&qe(ut,b.ADD_URI_SAFE_ATTR,xe),b.FORBID_CONTENTS&&(Oe===Ne&&(Oe=er(Oe)),qe(Oe,b.FORBID_CONTENTS,xe)),W&&(be["#text"]=!0),Ie&&qe(be,["html","head","body"]),be.table&&(qe(be,["tbody"]),delete _e.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=b.TRUSTED_TYPES_POLICY,L=I.createHTML("")}else I===void 0&&(I=Zd(A,s)),I!==null&&typeof L=="string"&&(L=I.createHTML(""));yt&&yt(b),Ge=b}},or=qe({},[...js,...zs,...qd]),Vt=qe({},[...Hs,...Bd]),Bt=function(b){let D=ee(b);(!D||!D.tagName)&&(D={namespaceURI:it,tagName:"template"});let Q=Gn(b.tagName),Pe=Gn(D.tagName);return U[b.namespaceURI]?b.namespaceURI===st?D.namespaceURI===ot?Q==="svg":D.namespaceURI===rt?Q==="svg"&&(Pe==="annotation-xml"||ae[Pe]):!!or[Q]:b.namespaceURI===rt?D.namespaceURI===ot?Q==="math":D.namespaceURI===st?Q==="math"&&pe[Pe]:!!Vt[Q]:b.namespaceURI===ot?D.namespaceURI===st&&!pe[Pe]||D.namespaceURI===rt&&!ae[Pe]?!1:!Vt[Q]&&(re[Q]||!or[Q]):!!(Ce==="application/xhtml+xml"&&U[b.namespaceURI]):!1},pt=function(b){rn(t.removed,{element:b});try{ee(b).removeChild(b)}catch{j(b)}},$t=function(b,D){try{rn(t.removed,{attribute:D.getAttributeNode(b),from:D})}catch{rn(t.removed,{attribute:null,from:D})}if(D.removeAttribute(b),b==="is")if(H||q)try{pt(D)}catch{}else try{D.setAttribute(b,"")}catch{}},Ut=function(b){let D=null,Q=null;if(O)b="<remove></remove>"+b;else{let je=Us(b,/^[\r\n\t ]+/);Q=je&&je[0]}Ce==="application/xhtml+xml"&&it===ot&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Pe=I?I.createHTML(b):b;if(it===ot)try{D=new h().parseFromString(Pe,Ce)}catch{}if(!D||!D.documentElement){D=S.createDocument(it,"template",null);try{D.documentElement.innerHTML=gt?L:Pe}catch{}}let Xe=D.body||D.documentElement;return b&&Q&&Xe.insertBefore(r.createTextNode(Q),Xe.childNodes[0]||null),it===ot?ie.call(D,Ie?"html":"body")[0]:Ie?D.documentElement:Xe},Lt=function(b){return z.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ot=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},jt=function(b){return typeof i=="function"&&b instanceof i};function p(B,b,D){Hn(B,Q=>{Q.call(t,b,D,Ge)})}let y=function(b){let D=null;if(p(le.beforeSanitizeElements,b,null),Ot(b))return pt(b),!0;let Q=xe(b.nodeName);if(p(le.uponSanitizeElement,b,{tagName:Q,allowedTags:be}),Le&&b.hasChildNodes()&&!jt(b.firstElementChild)&&vt(/<[/\w!]/g,b.innerHTML)&&vt(/<[/\w!]/g,b.textContent)||b.nodeType===an.progressingInstruction||Le&&b.nodeType===an.comment&&vt(/<[/\w]/g,b.data))return pt(b),!0;if(!(C.tagCheck instanceof Function&&C.tagCheck(Q))&&(!be[Q]||_e[Q])){if(!_e[Q]&&ne(Q)&&(ge.tagNameCheck instanceof RegExp&&vt(ge.tagNameCheck,Q)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Q)))return!1;if(W&&!Oe[Q]){let Pe=ee(b)||b.parentNode,Xe=Y(b)||b.childNodes;if(Xe&&Pe){let je=Xe.length;for(let _=je-1;_>=0;--_){let d=T(Xe[_],!0);d.__removalCount=(b.__removalCount||0)+1,Pe.insertBefore(d,x(b))}}}return pt(b),!0}return b instanceof c&&!Bt(b)||(Q==="noscript"||Q==="noembed"||Q==="noframes")&&vt(/<\/no(script|embed|frames)/i,b.innerHTML)?(pt(b),!0):(Me&&b.nodeType===an.text&&(D=b.textContent,Hn([$e,ke,We],Pe=>{D=nn(D,Pe," ")}),b.textContent!==D&&(rn(t.removed,{element:b.cloneNode()}),b.textContent=D)),p(le.afterSanitizeElements,b,null),!1)},F=function(b,D,Q){if(ue&&(D==="id"||D==="name")&&(Q in r||Q in Se))return!1;if(!(De&&!R[D]&&vt(Ze,D))){if(!(ce&&vt(ze,D))){if(!(C.attributeCheck instanceof Function&&C.attributeCheck(D,b))){if(!K[D]||R[D]){if(!(ne(b)&&(ge.tagNameCheck instanceof RegExp&&vt(ge.tagNameCheck,b)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(b))&&(ge.attributeNameCheck instanceof RegExp&&vt(ge.attributeNameCheck,D)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(D,b))||D==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&vt(ge.tagNameCheck,Q)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Q))))return!1}else if(!ut[D]){if(!vt(he,nn(Q,Ae,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&b!=="script"&&Md(Q,"data:")===0&&Je[b])){if(!(Ee&&!vt(Te,nn(Q,Ae,"")))){if(Q)return!1}}}}}}}return!0},ne=function(b){return b!=="annotation-xml"&&Us(b,me)},fe=function(b){p(le.beforeSanitizeAttributes,b,null);let{attributes:D}=b;if(!D||Ot(b))return;let Q={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0},Pe=D.length;for(;Pe--;){let Xe=D[Pe],{name:je,namespaceURI:_,value:d}=Xe,k=xe(je),v=d,N=je==="value"?v:Nd(v);if(Q.attrName=k,Q.attrValue=N,Q.keepAttr=!0,Q.forceKeepAttr=void 0,p(le.uponSanitizeAttribute,b,Q),N=Q.attrValue,w&&(k==="id"||k==="name")&&($t(je,b),N=E+N),Le&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,N)){$t(je,b);continue}if(k==="attributename"&&Us(N,"href")){$t(je,b);continue}if(Q.forceKeepAttr)continue;if(!Q.keepAttr){$t(je,b);continue}if(!Ue&&vt(/\/>/i,N)){$t(je,b);continue}Me&&Hn([$e,ke,We],ye=>{N=nn(N,ye," ")});let J=xe(b.nodeName);if(!F(J,k,N)){$t(je,b);continue}if(I&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!_)switch(A.getAttributeType(J,k)){case"TrustedHTML":{N=I.createHTML(N);break}case"TrustedScriptURL":{N=I.createScriptURL(N);break}}if(N!==v)try{_?b.setAttributeNS(_,je,N):b.setAttribute(je,N),Ot(b)?pt(b):ri(t.removed)}catch{$t(je,b)}}p(le.afterSanitizeAttributes,b,null)},we=function B(b){let D=null,Q=Lt(b);for(p(le.beforeSanitizeShadowDOM,b,null);D=Q.nextNode();)p(le.uponSanitizeShadowNode,D,null),y(D),fe(D),D.content instanceof o&&B(D.content);p(le.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(B){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,Q=null,Pe=null,Xe=null;if(gt=!B,gt&&(B="<!-->"),typeof B!="string"&&!jt(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw sn("dirty is not a string, aborting")}else throw sn("toString is not a function");if(!t.isSupported)return B;if(Qe||bt(b),t.removed=[],typeof B=="string"&&(de=!1),de){if(B.nodeName){let d=xe(B.nodeName);if(!be[d]||_e[d])throw sn("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof i)D=Ut("<!---->"),Q=D.ownerDocument.importNode(B,!0),Q.nodeType===an.element&&Q.nodeName==="BODY"||Q.nodeName==="HTML"?D=Q:D.appendChild(Q);else{if(!H&&!Me&&!Ie&&B.indexOf("<")===-1)return I&&Z?I.createHTML(B):B;if(D=Ut(B),!D)return H?null:Z?L:""}D&&O&&pt(D.firstChild);let je=Lt(de?B:D);for(;Pe=je.nextNode();)y(Pe),fe(Pe),Pe.content instanceof o&&we(Pe.content);if(de)return B;if(H){if(q)for(Xe=P.call(D.ownerDocument);D.firstChild;)Xe.appendChild(D.firstChild);else Xe=D;return(K.shadowroot||K.shadowrootmode)&&(Xe=ve.call(n,Xe,!0)),Xe}let _=Ie?D.outerHTML:D.innerHTML;return Ie&&be["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&vt(ui,D.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+_),Me&&Hn([$e,ke,We],d=>{_=nn(_,d," ")}),I&&Z?I.createHTML(_):_},t.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(B),Qe=!0},t.clearConfig=function(){Ge=null,Qe=!1},t.isValidAttribute=function(B,b,D){Ge||bt({});let Q=xe(B),Pe=xe(b);return F(Q,Pe,D)},t.addHook=function(B,b){typeof b=="function"&&rn(le[B],b)},t.removeHook=function(B,b){if(b!==void 0){let D=Od(le[B],b);return D===-1?void 0:Dd(le[B],D,1)[0]}return ri(le[B])},t.removeHooks=function(B){le[B]=[]},t.removeAllHooks=function(){le=li()},t}var fi=pi();var _i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mi=e=>(...t)=>({_$litDirective$:e,values:t}),Yn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var ln=class extends Yn{constructor(t){if(super(t),this.it=lt,t.type!==_i.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===kr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ln.directiveName="unsafeHTML",ln.resultType=1;var gi=mi(ln);function Qs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Er=Qs();function $i(e){Er=e}var pn={exec:()=>null};function He(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(kt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Xd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qd=/^(?:[ \t]*(?:\n|$))+/,Jd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,eu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,tu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Js=/(?:[*+-]|\d{1,9}[.)])/,xi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Si=He(xi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ru=He(xi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nu=/^[^\n]+/,to=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,su=He(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",to).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ou=He(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Js).getRegex(),Jn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,au=He("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ro).replace("tag",Jn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ai=He(eo).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex(),iu=He(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ai).getRegex(),no={blockquote:iu,code:Jd,def:su,fences:eu,heading:tu,hr:fn,html:au,lheading:Si,list:ou,newline:Qd,paragraph:Ai,table:pn,text:nu},hi=He("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex(),lu={...no,lheading:ru,table:hi,paragraph:He(eo).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",hi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex()},cu={...no,html:He(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:He(eo).replace("hr",fn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Si).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},du=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,uu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ti=/^( {2,}|\\)\n(?!\s*$)/,pu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,es=/[\p{P}\p{S}]/u,so=/[\s\p{P}\p{S}]/u,Ei=/[^\s\p{P}\p{S}]/u,fu=He(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,so).getRegex(),Ci=/(?!~)[\p{P}\p{S}]/u,_u=/(?!~)[\s\p{P}\p{S}]/u,mu=/(?:[^\s\p{P}\p{S}]|~)/u,gu=He(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Xd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ri=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hu=He(Ri,"u").replace(/punct/g,es).getRegex(),bu=He(Ri,"u").replace(/punct/g,Ci).getRegex(),Ii="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vu=He(Ii,"gu").replace(/notPunctSpace/g,Ei).replace(/punctSpace/g,so).replace(/punct/g,es).getRegex(),yu=He(Ii,"gu").replace(/notPunctSpace/g,mu).replace(/punctSpace/g,_u).replace(/punct/g,Ci).getRegex(),wu=He("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ei).replace(/punctSpace/g,so).replace(/punct/g,es).getRegex(),ku=He(/\\(punct)/,"gu").replace(/punct/g,es).getRegex(),$u=He(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xu=He(ro).replace("(?:-->|$)","-->").getRegex(),Su=He("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Au=He(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Li=He(/^!?\[(label)\]\[(ref)\]/).replace("label",Zn).replace("ref",to).getRegex(),Oi=He(/^!?\[(ref)\](?:\[\])?/).replace("ref",to).getRegex(),Tu=He("reflink|nolink(?!\\()","g").replace("reflink",Li).replace("nolink",Oi).getRegex(),bi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oo={_backpedal:pn,anyPunctuation:ku,autolink:$u,blockSkip:gu,br:Ti,code:uu,del:pn,emStrongLDelim:hu,emStrongRDelimAst:vu,emStrongRDelimUnd:wu,escape:du,link:Au,nolink:Oi,punctuation:fu,reflink:Li,reflinkSearch:Tu,tag:Su,text:pu,url:pn},Eu={...oo,link:He(/^!?\[(label)\]\((.*?)\)/).replace("label",Zn).getRegex(),reflink:He(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zn).getRegex()},Ks={...oo,emStrongRDelimAst:yu,emStrongLDelim:bu,url:He(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",bi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:He(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",bi).getRegex()},Cu={...Ks,br:He(Ti).replace("{2,}","*").getRegex(),text:He(Ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vn={normal:no,gfm:lu,pedantic:cu},cn={normal:oo,gfm:Ks,breaks:Cu,pedantic:Eu},Ru={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vi=e=>Ru[e];function tr(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,vi)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,vi);return e}function yi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function wi(e,t){let r=e.replace(kt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function dn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Iu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ki(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function Lu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Xn=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Er}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:dn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Lu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=dn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:dn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=dn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let A=h,$=A.raw+`
`+r.join(`
`),T=this.blockquote($);o[o.length-1]=T,n=n.substring(0,n.length-A.raw.length)+T.raw,s=s.substring(0,s.length-A.text.length)+T.text;break}else if(h?.type==="list"){let A=h,$=A.raw+`
`+r.join(`
`),T=this.list($);o[o.length-1]=T,n=n.substring(0,n.length-h.raw.length)+T.raw,s=s.substring(0,s.length-A.raw.length)+T.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),h=e.split(`
`,1)[0],A=!m.trim(),$=0;if(this.options.pedantic?($=2,f=m.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=m.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),Y=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let I=e.split(`
`,1)[0],L;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||Y.test(h)||ee.test(h)||T.test(h)||j.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+L.slice($);else{if(A||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||Y.test(m)||j.test(m))break;f+=`
`+h}!A&&!h.trim()&&(A=!0),u+=I+`
`,e=e.substring(I.length+1),m=L.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=wi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(wi(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=dn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Iu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ki(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ki(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=m.slice(1,-1);return{type:"em",raw:m,text:A,tokens:this.lexer.inlineTokens(A)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Zs{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Er,this.options.tokenizer=this.options.tokenizer||new Xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:Vn.normal,inline:cn.normal};this.options.pedantic?(r.block=Vn.pedantic,r.inline=cn.pedantic):this.options.gfm&&(r.block=Vn.gfm,this.options.breaks?r.inline=cn.breaks:r.inline=cn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Vn,inline:cn}}static lex(t,r){return new Zs(r).lex(t)}static lexInline(t,r){return new Zs(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(A=>{h=A.call({lexer:this},m),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Qn=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Er}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+tr(n)+'">'+(r?s:tr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:tr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=yi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+tr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=yi(e);if(s===null)return tr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${tr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Xs{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Er,this.options.renderer=this.options.renderer||new Qn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ao}static parse(t,r){return new Xs(r).parse(t)}static parseInline(t,r){return new Xs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Kn,un=(Kn=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Er}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},tt(Kn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(Kn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Kn),Ou=class{constructor(...e){tt(this,"defaults",Qs());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",qt);tt(this,"Renderer",Qn);tt(this,"TextRenderer",ao);tt(this,"Lexer",Ft);tt(this,"Tokenizer",Xn);tt(this,"Hooks",un);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Qn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Xn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new un;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];un.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&un.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return c.call(s,m)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+tr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Tr=new Ou;function Ke(e,t){return Tr.parse(e,t)}Ke.options=Ke.setOptions=function(e){return Tr.setOptions(e),Ke.defaults=Tr.defaults,$i(Ke.defaults),Ke};Ke.getDefaults=Qs;Ke.defaults=Er;Ke.use=function(...e){return Tr.use(...e),Ke.defaults=Tr.defaults,$i(Ke.defaults),Ke};Ke.walkTokens=function(e,t){return Tr.walkTokens(e,t)};Ke.parseInline=Tr.parseInline;Ke.Parser=qt;Ke.parser=qt.parse;Ke.Renderer=Qn;Ke.TextRenderer=ao;Ke.Lexer=Ft;Ke.lexer=Ft.lex;Ke.Tokenizer=Xn;Ke.Hooks=un;Ke.parse=Ke;var $m=Ke.options,xm=Ke.setOptions,Sm=Ke.use,Am=Ke.walkTokens,Tm=Ke.parseInline;var Em=qt.parse,Cm=Ft.lex;function fr(e){let t=Ke.parse(e),r=fi.sanitize(t);return gi(r)}function rr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ur(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ts(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Du={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Mu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Nu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function _r(e){return!!e&&typeof e=="object"}function io(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Di(e,t){let r=io(e),n=io(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Pu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>_r(s)&&typeof s.text=="string"?s.text:"").join(""):_r(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Fu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Du[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=io(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Di(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Di(_r(i)?i.old_string:"",_r(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Mi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ni(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Mu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Nu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function qu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(_r(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ni(o.text));else if(o.type==="thinking"){let a=Mi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Fu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(_r(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Pu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Bu(e){if(e.type==="item.completed"&&_r(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ni(t.text)];if(t.type==="reasoning"){let r=Mi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Uu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Pi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!_r(o))continue;let a=Uu(o)?Bu(o):qu(o,r);for(let i of a)t.push(i)}return t}var ju=5,zu=10,Hu=/Task\s+#(\d+)/,Wu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function rs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Yu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Vu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Ku(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Hu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Zu(e){if(e.tool==="Bash"){let t=e.command||"";return Wu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Xu(e){let t=e.filter(s=>s.kind==="tool").slice(-zu),r=new Map;t.forEach((s,o)=>{let a=Zu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Qu(e){let t=Vu(e);if(t)return{text:t,guess:!1};let r=Ku(e);if(r)return{text:r,guess:!1};let n=Xu(e);return n?{text:n,guess:!0}:null}function Ju(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:At(e,t)}function ns(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,m=null,h=!1,A=!1,$=!1,T=null,j=null;function x(){h=!1,A=!1,$=!1,T=null,j=null}async function Y(R){if(r){A=!0,$=!1,Ae();try{let C=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!C||typeof C!="object"||Array.isArray(C)?$=!0:(T=C,j=R)}catch{o===R&&($=!0)}finally{o===R&&(A=!1,Ae())}}}function ee(){if(h=!h,h&&o&&j!==o){Y(o);return}Ae()}function I(){if(!h)return"";let R=Ur({loading:A,error:$});if(R)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!T)return"";if(T.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let C=ts(T.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${C?l`<div class="prompt-block__meta">${C} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function L(){if(!o||!n)return[];let R=n.get(o);return Pi(R?R.lines:[])}function S(){if(!o||!n)return null;let R=n.get(o),C=R?R.last_event_at:null;return typeof C=="number"?C:null}function z(){return a.status==="running"}function P(){if(z()&&o){m||(m=setInterval(()=>Ae(),1e3));return}ie()}function ie(){m&&(clearInterval(m),m=null)}function ve(R){let C=[],ce=0;for(;ce<R.length;){let De=R[ce];if(De.kind==="tool"){let Ee=ce;for(;Ee<R.length&&R[Ee].kind==="tool"&&R[Ee].tool===De.tool;)Ee+=1;if(Ee-ce>=ju&&!u.has(ce)){C.push({kind:"group",idx:ce,tool:De.tool||"",lines:R.slice(ce,Ee).map((Ue,Me)=>({idx:ce+Me,line:Ue}))}),ce=Ee;continue}}C.push({kind:"line",idx:ce,line:De}),ce+=1}return C}function le(R){for(let C=R.length-1;C>=0;C-=1){let ce=R[C];if(ce.kind==="result"||ce.kind==="error")return null;if(ce.kind==="tool"&&!Object.hasOwn(ce,"result"))return ce}return null}function $e(R){for(let C=R.length-1;C>=0;C-=1)if(R[C].kind==="thinking")return R[C];return null}function ke(R,C){if(C.kind==="gate")return l`<div class="sv__gate">${C.text}</div>`;if(C.kind==="phase")return l`<div class="sv__phase">${C.text}</div>`;if(C.kind==="result")return l`<div
        class="sv__result${C.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${C.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${fr(C.text||(C.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(C.kind==="thinking"){let ce=c.has(R);return l`<div
        class="sv__think${ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(R)}
      >
        <span class="sv__think-line">💭 ${rs(C.text)}</span>
        ${ce?l`<pre class="sv__think-expand">${C.text}</pre>`:""}
      </div>`}if(C.kind==="error")return l`<div class="sv__error">⛔ ${C.text}</div>`;if(C.kind==="blocker")return l`<div class="sv__error">⛔ ${C.text}</div>`;if(C.kind==="tool"){let ce=c.has(R),De=C.tool==="Bash"?Yu(C.command):0,Ee=C.tool==="Bash"?De>1?rs(C.command):C.command:C.path||C.command||"";return l`<div
        class="sv__tool${ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>he(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${C.icon}</span>
          <span class="sv__tool-name">${C.tool}</span>
          ${Ee?l`<span class="sv__tool-detail">${Ee}</span>`:""}
          ${De>1?l`<span class="sv__tool-more">⋯ ${De}줄</span>`:""}
          ${typeof C.added=="number"?l`<span class="sv__diff-add">+${C.added}</span>`:""}
          ${typeof C.removed=="number"?l`<span class="sv__diff-del">−${C.removed}</span>`:""}
          ${C.result?l`<span class="sv__tool-ok">→ ${C.result}</span>`:""}
        </span>
        ${ce?l`<pre class="sv__tool-expand">${We(C)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${fr(C.text||"")}</div>`}function We(R){let C=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)C.push(R.command);else if(R.input!==void 0)try{C.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&C.push(`output:
${R.output}`),C.join(`

`)}function Ze(){if(!o)return l``;let R=L(),C=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ce=a.session_id||"",De=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ee=z(),Ue=Ee?Ju(S(),Date.now()):"",Me=Ee?le(R):null,Le=Ee?$e(R):null,Ie=Qu(R);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ie?l`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${Ee?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ue?l`<span class="sv__live-ago">${Ue}</span>`:""}</span
            >`:""}
        ${ce?l`<button
              type="button"
              class="sv__session"
              title=${ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ce}`}
              @click=${()=>G(ce)}
            >
              ⧉ ${ce.slice(0,8)}
            </button>`:""}
        ${C?l`<span class="sv__meta">${C}</span>`:""}
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
          @click=${ee}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${De}
          @click=${be}
        >
          <span class="sv__follow-full">⇣ ${De}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>_e()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${R.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ve(R).map(Qe=>Qe.kind==="group"?ze(Qe):ke(Qe.idx,Qe.line))}
      </div>
      ${Me||Le?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Me?l`<span class="sv__now-icon">${Me.icon}</span>
                  <span class="sv__now-name">${Me.tool}</span>
                  <span class="sv__now-detail"
                    >${Me.tool==="Bash"?rs(Me.command):Me.path||Me.command||""}</span
                  >`:""}
            ${Le?l`<span class="sv__now-think"
                  >💭 ${rs(Le.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ze(R){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Te(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(R){u.add(R),Ae()}function Ae(){Be(Ze(),e),P(),i&&me()}function me(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function he(R){c.has(R)?c.delete(R):c.add(R),Ae()}function be(){i=!i,Ae()}function G(R){Ar(R).then(C=>{C?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function K(R){!o||!R||(a={...a,...R},Ae())}function Re(R){let C=R.target;if(!C||!C.classList||!C.classList.contains("sv__body"))return;!(C.scrollHeight-C.scrollTop-C.clientHeight<=4)&&i&&(i=!1,Ae())}e.addEventListener("scroll",Re,!0);function ge(R){let C=R&&R.attempt_id;C&&(o=C,a=R.meta||{},i=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(Ae)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ae())}function _e(){let R=o;o=null,c.clear(),u.clear(),x(),ie(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),Be(l``,e),s&&s()}return{open:ge,updateMeta:K,close:_e,isOpen(){return o!==null},destroy(){ie(),f&&(f(),f=null),e.removeEventListener("scroll",Re,!0),o=null,Be(l``,e)}}}function _n(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Fi(t.spec_id),s=Fi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Fi(e){return typeof e=="string"?e.trim():""}function ep(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function tp(e){let t=e&&e.metadata||{},r=_n(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:ep(t)?null:"plan_pending"}),n}function qi(e,t){let r=tp(e);return l`
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
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var rp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",np=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,sp=/^\*\*결론\*\* — (.+)$/;function ss(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==rp)return null;let r=np.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?sp.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Bi=20;function Ui(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function op(e){return e.length>Bi?`${e.slice(0,Bi)}\u2026`:e}function ap(e,t,r,n){let s=`${t.lane} ${op(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Ui(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${fr(t.body)}
        </div>`:""}
  </div>`}function ip(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ui(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${fr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ji(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=ss(typeof c.text=="string"?c.text:"");return u?ap(c,u,t,s.has(c.id)):ip(c)})}
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
  `}var lp=["codex","opus","fable","self","skip"],cp=["codex","fable","skip"],dp=["low","medium","high","xhigh"],up=["standard","fast_track"],Cr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],co=["impl_runtime","orchestration_model"],mn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],uo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},zi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},pp=["self","skip"],fp="opus",po={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function fo(e){let t=uo[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function _p(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:po[e]||"(\uAE30\uBCF8)"}function jr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rr(e){if(!jr(e)||!jr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jr(r)&&jr(r.models));return t.length>0?t:null}function lo(e){return{value:e,label:e}}function _o(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Hi(e,t,r=null){let n=Rr(e);if(!n)return t?[{label:null,options:[lo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(lo)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[_o(t),...s]:s}function mr(e,t){let r={label:null,options:e.map(lo)};return t&&!e.includes(t)?[_o(t),r]:[r]}function nr(e,t){let r=Rr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function mo(e,t){return jr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function mp(e,t){return jr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():mo(e,t)}function gp(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mp(n,n.models[t]);return[]}function hp(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function go(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mo(n,n.models[t]);return[]}function Yi(e){let t=Rr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of mo(n,s))r.includes(o)||r.push(o);return r}function Vi(e,t){if(!t)return Yi(e);let n=Rr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of go(e,o))s.includes(a)||s.push(a);return s}function as(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=nr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?go(t,n.impl_model):Vi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function zr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||fp,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?nr(n,o):s:null;return Cr.map(u=>{let f=t(u),m,h=!1;return u==="orchestration_model"?m=Hi(n,f):u==="impl_runtime"?m=mr(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Hi(n,f,c):f?[_o(f)]:[],h=i==="inherit"&&c===null):u==="orchestration_effort"?m=mr(gp(n,o),f):u==="orchestration_speed"?m=bp(hp(n,o),f):u==="impl_effort"?(m=mr(a?go(n,a):c?Vi(n,c):Yi(n),f),h=i==="inherit"&&c===null):u==="plan_review_model"?m=mr(cp,f):Object.hasOwn(zi,u)?(m=mr(dp,f),h=pp.includes(r(zi[u]))):m=mr(lp,f),{key:u,groups:m,selected:f,disabled:h,runner:u==="orchestration_model"?nr(n,o):null}})}function os(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Wi(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Wi(s,t))}
          </optgroup>`)}
  `}function bp(e,t){return mr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Wi(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Gi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${fo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?l`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function vp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function yp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let h=t(f)||"codex",A=t(m);return`${u} ${h}${A?`/${A}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Cr.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return l`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>l`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${vp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Ki(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let T=i($);return T||(typeof a[$]=="string"?a[$]:"")},u=zr({selectedOf:i,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),h=mn.flatMap($=>$.keys).filter($=>i($)).length,A=$=>{let T=m.get($);return T?Gi(T.key,os(T.groups,T.selected,_p(T.key,a,s)),T.selected,!!T.selected,T.disabled,T.runner,t):""};return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${yp(i,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Gi("workflow_mode",os(mr(up,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${co.map(A)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${mn.map($=>l`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(A)}
          </section>`)}
    </details>
  `}function wp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${wp(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:fr(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Be(u(),e)}async function m($,T={}){s=$,o="loading",a="",i="",f();let j=r?r():"";if(!j){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent($);try{let Y=await n(x),ee=await Y.json().catch(()=>({}));if(!Y.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||Y.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Be(l``,e)}function A(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:A}}var kp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ji="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $p(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function xp(e){let t=ht(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=qr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Ji}
          >부분 집계</span
        >`:""}`}function Xi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Qi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?el(t):""}function Sp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?l`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Qi(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${Qi(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Ap(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...kp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${$p(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Ji}</span>`:""}
  </div>`}var Tp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function el(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ep(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function tl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),A=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${T=>{T.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Xi(qs(u));if(ht(f).length===0&&!qr(u.usage))return"";let m=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${xp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=qs(u),m=Xi(f),h=ht(m);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Tp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${ur(u)?l`<span
                  class="detail-session__resumed"
                  title=${ur(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(A=>l`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):qr(u.usage)?l`<span class="detail-session__usage"
                    >${qr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${el(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Ep(u)}
          ${s.has(u.attempt_id)&&u.usage?Ap(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Sp(f)}
        </div>`})}
    </div>
  `}function rl(e,t={}){return l`
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
          ${Cp(e)}
        </div>`:""}
  `}function Cp(e){let t=Ur(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?rr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ts(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Rp=["open","in_progress","deferred","resolved","closed"],Ip=[0,1,2,3,4];function nl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},h="",A=!1,$=!1,T=!1,j="",x="",Y="";function ee(){$=!1,T=!1,j="",x="",Y=""}let I=[],L=null,S=null,z=!1,P="",ie=!1,ve=0,le=new Set;function $e(){I=[],L=null,S=null,z=!1,P="",ie=!1,ve+=1,le.clear()}async function ke(d){if(!s)return;let k=++ve;try{let v=await Promise.resolve(s("get-comments",{id:d}));if(k!==ve||d!==u)return;I=Array.isArray(v)?v:[],z=!1}catch{if(k!==ve||d!==u)return;z=!0}_()}function We(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(L!==u){L=u,S=d,ke(u);return}d!==null&&d!==S&&(S=d,ke(u))}function Ze(d){le.has(d)?le.delete(d):le.add(d),_()}function ze(d){let k=P.trim().length===0;P=d,k!==(d.trim().length===0)&&_()}async function Te(){let d=P.trim();if(!s||!u||d.length===0||ie)return;let k=u;ie=!0,_();let v=!1;try{let N=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(N)&&N.length>0&&(v=!0,k===u&&(I=N,z=!1,P="",S=N.length))}catch{v=!1}v||X("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(ie=!1),_()}let Ae={onToggle:Ze,onDraftInput:ze,onSubmit:Te},me=document.createElement("div");me.className="md-viewer-root",document.body.appendChild(me);let he=Zi(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),be=document.createElement("div");be.className="session-log-root",document.body.appendChild(be);let G=ns(be,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),K=!1,Re=!1,ge=!1,_e=null,R=null,C=0;function ce(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function De(){K=!1,Re=!1,ge=!1,_e=null,R=null,C+=1}async function Ee(d){if(!s)return;let k=++C;Re=!0,ge=!1,_();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==C)return;!v||typeof v!="object"||Array.isArray(v)?ge=!0:(_e=v,R=ce(d))}catch{k===C&&(ge=!0)}finally{k===C&&(Re=!1,_())}}function Ue(){if(K=!K,K&&u&&R!==ce(u)){_e=null,Ee(u);return}_()}function Me(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(v=>v&&v.bead_id===u).sort((v,N)=>(N.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[]}))}function Le(){if(!a||!u)return null;let d=a.get();return Rt(d&&d.attempts||{},u)}let Ie=new Set;function Qe(d){Ie.has(d)?Ie.delete(d):Ie.add(d),_()}function O(d){let k=a?a.get():null,v=k&&k.attempts?k.attempts[d]:null;G.open({attempt_id:d,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function H(d){if(!s||!d)return;let k=()=>{let ye=a?a.get():null;return ye&&typeof ye.revision=="number"?ye.revision:0},v=async(ye={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...ye}),N=ye=>{ye?.queue&&a?.set&&a.set(ye.queue)},J=await v();if(N(J),J&&J.conflict){let ye=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:k();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:ye}),N(J)}J=await Qt(J,(ye,ct)=>v({continuation:ye,decision_token:ct}),{onResult:N,refresh:()=>v()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let q={onOpen:O,onResume:H,onToggleUsage:Qe};function Z(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?W()?.presets.find(N=>N.id===k):null;return v&&v.compatible!==!1&&v.settings?v.settings:{}}function ue(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?W()?.presets.find(N=>N.id===k):null;return v&&v.compatible!==!1&&typeof v.name=="string"?v.name:""}function w(){let d=a?a.get():null;return d&&d.runner_catalog||null}function E(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},v=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof Z().orchestration_model=="string"?Z().orchestration_model:"")||"opus";return nr(w(),v)}function W(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function de(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},v=N=>typeof k[N]=="string"?k[N]:N==="impl_runtime"&&typeof k.impl_model=="string"&&nr(w(),k.impl_model)||"";return zr({selectedOf:v,effectiveOf:v,runner_catalog:w()}).some(N=>N.groups.some(J=>J.options.some(ye=>ye.value===N.selected&&ye.label.endsWith("(\uBE44\uD638\uD658)"))))}function oe(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Oe(){let d=W(),k=d?.presets.find(v=>v.id===h);if(!(!s||!u||!d||!k||de(k)||A)){A=!0,_();try{let v=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(v&&v.conflict){oe(v),X("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let N=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&N&&typeof N=="object"){f=N;for(let J of Cr)delete m[J];X("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,_()}}}function Ne(){let d=W();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],v=k.find(J=>J.id===h),N=v?de(v):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||A}
          @change=${J=>{h=J.target.value,_()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(J=>{let ye=de(J);return l`<option
              value=${J.id}
              ?selected=${J.id===h}
            >
              ${J.name}${ye?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!v||N||A}
          @click=${()=>{Oe()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let Je=null;r&&r.subscribe&&(Je=r.subscribe(()=>rt()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{u&&_()}));let ut=null;i&&typeof i.subscribe=="function"&&(ut=i.subscribe(()=>{u&&_()}));function mt(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",mt);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(v=>v&&v.id===u)||d[0]||f}We(),_()}}function st(d){Ar(d).then(k=>{k?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ot(d){d.preventDefault(),d.stopPropagation(),u&&st(u)}function it(d,k){d.preventDefault(),d.stopPropagation(),st(k)}function gt(d,k,v){d.preventDefault(),d.stopPropagation(),he.open(k,{missing_state:v})}function U(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function V(d,k){let v=f||{},N=v.metadata&&typeof v.metadata=="object"?v.metadata:{},J={};for(let te of["impl_runtime","impl_model","impl_effort"])J[te]=Object.hasOwn(m,te)?m[te]:typeof N[te]=="string"?N[te]:"";J[d]=k;let ye=as(J,w(),E()),ct={};for(let te of["impl_runtime","impl_model","impl_effort"])ct[te]=m[te],m[te]=ye[te]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ye,orchestration_runtime:E()})).then(te=>{let et=Array.isArray(te)?te[0]:te;if(!et||typeof et!="object"||!et.id)throw new Error("implementation target readback failed");f=et;for(let ar of["impl_runtime","impl_model","impl_effort"])delete m[ar];_()}).catch(()=>{for(let te of["impl_runtime","impl_model","impl_effort"])ct[te]===void 0?delete m[te]:m[te]=ct[te];_(),X("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ae(d,k,v){if(!s||!u)return!1;try{let N=await Promise.resolve(s(d,k)),J=Array.isArray(N)?N[0]:N;return J&&typeof J=="object"&&J.id?(f=J,!0):(X(v,"error"),!1)}catch{return X(v,"error"),!1}}function pe(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function re(){$=!0,j=f&&f.title||"",_(),pe('.detail-edit__input[data-edit="title"]')}function Ce(d){j=d.target.value}function Ve(){$=!1,j="",_()}function nt(){ae("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,j=""),_()})}function xe(){T=!0,x=f&&f.description||"",_(),pe('.detail-edit__textarea[data-edit="description"]')}function Ge(d){x=d.target.value}function Se(){T=!1,x="",_()}function dt(){ae("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(T=!1,x=""),_()})}function bt(d,k,v,N){if(d.key==="Escape"){d.stopPropagation(),v();return}d.key==="Enter"&&(!N||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function or(d){let k=d.target.value;ae("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Vt(d){let k=Number(d.target.value);ae("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Bt(d){Y=d.target.value}function pt(){let d=Y.trim();d.length!==0&&ae("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(Y=""),_()})}function $t(d){if(d.key==="Escape"){d.stopPropagation(),Y="",_();return}d.key==="Enter"&&(d.preventDefault(),pt())}function Ut(d){ae("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let Lt={onCopyPath:it,onOpenDoc:gt},Ot={onChange:U,onImplTargetChange:V};function jt(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function p(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function y(d){let v=(Array.isArray(d.dependencies)?d.dependencies:[]).map(N=>({id:jt(N),icon:p(N)})).filter(N=>N.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${v.map(N=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(N.id)}
                  >
                    ${N.icon?`${N.icon} `:""}${N.id}
                  </button>`:l`<span class="detail-dep"
                    >${N.icon?`${N.icon} `:""}${N.id}</span
                  >`)}
          </div>`}
    `}function F(d){let k=d.metadata||{},v=d.workflow||{},N=v.stages||{},J=N.spec&&N.spec.stale,ye=N.impl&&N.impl.stale,ct=N.plan||null,te=v.route_source==="derived",et=v.route||k.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${te?" detail-kv__v--derived":""}"
          title=${te?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${te?"unset":et}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ct?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ct?.approval_receipt||"\uC5C6\uC74C"}${ct?.approval_state==="stale"?" \xB7 stale":ct?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${v.exec_receipt.kind}:${v.exec_receipt.actor}@${v.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${v.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let ne={route:["quick_fix","spec_backed","full_plan"]};async function fe(d,k){let v=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await ae("update-workflow-meta",{id:u,key:d,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function we(d){let k=d.metadata||{};return l` ${((N,J)=>{let ye=ne[N],ct=typeof k[N]=="string"?k[N]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${N}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${N}
          data-edit=${`wfmeta-${N}`}
          @change=${te=>fe(N,te)}
        >
          <option value="" ?selected=${!ye.includes(ct)}>
            ${J}
          </option>
          ${ye.map(te=>l`<option value=${te} ?selected=${ct===te}>${te}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function B(d,k){return $?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${Ce}
            @keydown=${v=>bt(v,nt,Ve,!1)}
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
              @click=${Ve}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${ht(k).map(v=>l`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${re}
        >
          ✎
        </button>
      </div>
    `}function b(d){let k=ft(d.created_at),v=ft(d.updated_at);return!k&&!v?l``:l`
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${v?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function D(d,k){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${or}
        >
          ${Rp.map(v=>l`<option value=${v} ?selected=${v===d}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Vt}
        >
          ${Ip.map(v=>l`<option value=${String(v)} ?selected=${v===k}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function Q(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${xe}
            >
              ✎
            </button>`}
      </div>
      ${T?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ge}
              @keydown=${k=>bt(k,dt,Se,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Pe(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Xe(d){let k=Array.isArray(d.labels)?d.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(v=>l`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>Ut(v)}
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
            @input=${Bt}
            @keydown=${$t}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${pt}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!u)return l``;let d=f||{},k=String(d.id||u),v=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",N=Le(),J=d.status||"open",ye=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",ct=d.description||"",te={...d,metadata:{...d.metadata||{},...m}};return l`
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
            @click=${ot}
          >
            ${k}
          </button>
          ${B(v,N)}
          ${D(J,ye)} ${b(d)}
          ${Q(ct)}
          ${ji(I,Ae,{expanded:le,draft:P,sending:ie,error:z})}
          ${Pe(d)} ${Xe(d)} ${y(d)}
          ${F(d)} ${we(d)}
          ${qi(d,Lt)}
          ${Ne()}
          ${Ki(te,Ot,Z(),w(),ue())}
          ${rl({expanded:K,loading:Re,error:ge,data:_e},{onToggle:Ue})}
          ${tl(Me(),q,{total:N,expanded:Ie})}
        </div>
      </div>
    `}function _(){Be(je(),e)}return{load(d){d!==u&&(m={},h="",ee(),$e(),De()),u=d,f=null,rt()},clear(){u=null,f=null,m={},h="",A=!1,ee(),$e(),De(),he.close(),G.close(),Be(l``,e)},destroy(){Je&&(Je(),Je=null),Fe&&(Fe(),Fe=null),ut&&(ut(),ut=null),document.removeEventListener("keydown",mt),he.destroy(),me.parentNode&&me.parentNode.removeChild(me),G.destroy(),be.parentNode&&be.parentNode.removeChild(be),u=null,f=null,h="",A=!1,$e(),De(),Be(l``,e)}}}var Lp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function sl(e,t){return Ns(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Op(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ol(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(S){let z=r.get();if(z)try{let P=await n("display-policy-set",{expected_revision:z.revision,policy:S(z)});c(P),P&&P.conflict&&P.policy&&(P=await n("display-policy-set",{expected_revision:P.policy.revision,policy:S(P.policy)}),c(P)),P&&P.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let z=r.get();if(!z)return;let P=sl(S,z)!=="shown";i(ie=>Op(S,ie,P))}function f(){let S=a.trim();S.length!==0&&(a="",i(z=>z.hidden_prefixes.includes(S)?{hidden_prefixes:z.hidden_prefixes}:{hidden_prefixes:[...z.hidden_prefixes,S]}),j())}function m(S){i(z=>({hidden_prefixes:z.hidden_prefixes.filter(P=>P!==S)}))}function h(S){let z=r.get();if(!z)return;let P=z.chips[S]===!1;i(()=>({chips:{[S]:P}}))}function A(S){let z=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${z.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${z.map(P=>{let ie=sl(P,S);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ie}`}
                  data-label=${P}
                  data-state=${ie}
                  @click=${()=>u(P)}
                >
                  ${P}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(z=>l`<span class="display-settings__prefix">
                ${z}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${z} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(z)}
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
            @input=${z=>{a=String(z.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function T(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Lp.map(([z,P])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${z}
                  .checked=${S.chips[z]!==!1}
                  @change=${()=>h(z)}
                />
                <span>${P}</span>
              </label>`)}
        </div>
      </section>
    `}function j(){let S=r.get();Be(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${L}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?l`${A(S)} ${$(S)}
                ${T(S)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,Y=()=>{x=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let ee=null;r.subscribe&&(ee=r.subscribe(()=>{x&&j()}));function I(){x||(a="",x=!0,j(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function L(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:L,destroy(){x=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),ee&&(ee(),ee=null),o.remove()}}}function al(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Dp(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Mp(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function is(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let w=u();return typeof w.revision=="number"?w.revision:0}function m(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function h(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function A(w){w&&w.queue&&r&&r.set(w.queue)}function $(){return u().runner_catalog??null}let T=null;function j(){if(T!==null)return T;let w=u().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function x(w){if(!s)return;let E=m();if(!E)return;T=w||"";let W=L(w);if(Le(),!W.viable){X(W.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),T=null,Le();return}try{let de=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:f(),expected_preset_revision:E.revision});A(de),de&&de.presets&&n&&n.set(de.presets),de&&de.conflict?X("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):de&&de.applied||X("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{X("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}T=null,Le()}function Y(w){i={id:w.id,name:w.name,settings:{...w.settings||{}}},z(),c=!1,Le()}function ee(){i={id:null,name:"",settings:{}},c=!1,Le()}function I(w){let E=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=de=>typeof E[de]=="string"?E[de]:de==="impl_runtime"&&typeof E.impl_model=="string"&&nr($(),E.impl_model)||"";return zr({selectedOf:W,effectiveOf:W,runner_catalog:$()}).some(de=>de.groups.some(oe=>oe.options.some(Oe=>Oe.value===de.selected&&Oe.label.endsWith("(\uBE44\uD638\uD658)"))))}function L(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let W=m()?.presets.find(oe=>oe.id===w);if(!W||W.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let de=W.compatible===!1||I(W);return{viable:!de,missing:!1,incompatible:de,preset:W}}function S(){let w=i?.settings.orchestration_model;return typeof w!="string"?null:nr($(),w)}function z(){if(!i)return;let w=as({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),S());for(let E of["impl_runtime","impl_model","impl_effort"])w[E]?i.settings[E]=w[E]:delete i.settings[E]}function P(w){let E=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=Cr.filter(oe=>typeof E[oe]=="string").length,de=Cr.filter(oe=>typeof E[oe]=="string").map(oe=>`${uo[oe]?.title||oe}: ${E[oe]}`);return{count:`${W}/12 \uC9C0\uC815`,choices:de.length>0?de.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ie(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let E=m();if(E)try{let W=await s("exec-preset-delete",{expected_revision:E.revision,id:w.id});h(W),W&&W.conflict&&X("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ve(w=!1){if(!s||!i)return;let E=m();if(!E)return;let W=w||i.id===null,de={expected_revision:E.revision,...W?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let oe=await s(W?"exec-preset-create":"exec-preset-update",de);if(h(oe),oe&&oe.conflict){c=!0,Le();return}if(oe&&oe.applied){i=null,c=!1,Le();return}X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function le(w){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${fo(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${E=>{if(!i)return;let W=E.target.value;W?i.settings[w.key]=W:delete i.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&z(),c=!1,Le()}}
      >
        ${os(w.groups,w.selected,po[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function $e(){if(!i)return"";let w=Ne=>typeof i?.settings[Ne]=="string"?i.settings[Ne]:"",E=zr({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:S()}),W=mn.flatMap(Ne=>Ne.keys).filter(Ne=>typeof i?.settings[Ne]=="string").length,de=Ne=>{let Je=E.find(Fe=>Fe.key===Ne);return Je?le(Je):""},oe=m(),Oe=i.id!==null&&oe!==null&&!oe.presets.some(Ne=>Ne.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${Ne=>{i&&(i.name=Ne.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Oe?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${co.map(de)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${W}개 변경됨</summary>
        ${mn.map(Ne=>l`<section
              class="exec-preset-editor__group"
              data-preset-group=${Ne.id}
            >
              <h4>${Ne.label}</h4>
              ${Ne.keys.map(de)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Oe?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ve(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{ve(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,c=!1,Le()}}
        >
          취소
        </button>
      </div>
    </div>`}function ke(){let w=m(),E=w?w.presets.filter(oe=>oe?.migration_pending!==!0):[],W=j()||"",de=L(W);return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ee}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:E.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:E.map(oe=>{let Oe=P(oe),Ne=L(oe.id),Je=oe.id===W,Fe=Ne.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",ut=typeof oe.reference_count=="number",mt=ut?oe.reference_count:null,rt=Array.isArray(oe.reference_summary)?oe.reference_summary.map(st=>st?.display_name||st?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${oe.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${oe.name}</strong>
                  ${Je?l`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Oe.count}</span>
                  <span data-preset-references=${oe.id}
                    >${ut?`\uCC38\uC870 ${mt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Ne.incompatible?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Oe.choices}</small>
                  ${rt?l`<small data-preset-impact=${oe.id}
                        >업데이트 영향: ${rt}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Je?l`<button
                        type="button"
                        data-workspace-preset-release=${oe.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:l`<button
                        type="button"
                        data-workspace-preset-assign=${oe.id}
                        ?disabled=${!Ne.viable}
                        title=${Fe}
                        @click=${()=>{x(oe.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${oe.id}
                    @click=${()=>Y(oe)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${oe.id}
                    ?disabled=${mt===null||mt>0||oe.reference_scan_complete===!1}
                    title=${mt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":mt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":oe.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ie(oe)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${w!==null&&W&&de.missing?l`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${W} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${W}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${$e()}
    </section>`}function We(){let w=u().workspace_info;return w&&typeof w=="object"?w:{}}function Ze(w,E){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${E}</span
    >`}function ze(w){let E=w?Mp(w.cmd):"",W=w?Dp(w.timeout_ms):"",de=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${E?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${E}</span>
            ${Ze("config","config")}
            ${W?l`<span class="exec-defaults__vd-meta"
                  >timeout ${W}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${Ze("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${de}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let Te=!1,Ae=!1,me=!1,he=null;async function be(){if(s){Ae=!0,me=!1,Le();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?me=!0:he=w}catch{me=!0}finally{Ae=!1,Le()}}}function G(){if(Te=!Te,Te&&!he){be();return}Le()}function K(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Te?"true":"false"}
          @click=${G}
        >
          ${Te?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Te?Re():""}
    </section>`}function Re(){let w=Ur({loading:Ae,error:me});if(w)return w;if(!he)return"";let E=Array.isArray(he.variants)?he.variants:[];return l`<div class="exec-defaults__sp-body">
      ${he.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${he.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${E.map(W=>l`<div class="exec-defaults__sp-variant" data-variant=${W.key}>
            <div class="exec-defaults__sp-cond">${W.condition}</div>
            ${rr(W.label,W.system_prompt)}
          </div>`)}
    </div>`}function ge(w){if(typeof w!="number"||!Number.isFinite(w))return"";let E=w/6e4;return Number.isInteger(E)?`timeout ${E}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function _e(w){let E=ge(w);return E?Ze("config",E):""}function R(w){let E=typeof w.base_sha=="string"?w.base_sha:"",W=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${E?`@${E.slice(0,7)}`:""}`;return l`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${W}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${w.verify?l`<code class="exec-defaults__vd-cmd"
                  >${w.verify.script}</code
                >${_e(w.verify.timeout_ms)}`:l`선언 없음${Ze("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${w.deploy?l`<code class="exec-defaults__vd-cmd"
                  >${w.deploy.script}</code
                >${_e(w.deploy.timeout_ms)}`:l`선언 없음${Ze("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function C(w){let E=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return E&&E.status==="resolved"?R(E):E&&(E.status==="pending"||E.status==="error")?l`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${E.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${E.error_code?l` — <code>${E.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${ze(w.verify_cmd)}
    </section>`}async function ce(w){if(!s)return;let E=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});if(A(E),E&&E.conflict){let W=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});A(W)}Le()}let De={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function Ee(w,E,W){return l`<div class="exec-defaults__policy-group" data-policy=${W}>
      <div class="exec-defaults__policy-label">${w}</div>
      <ul class="exec-defaults__policy-list">
        ${E.map(de=>l`<li data-token=${de}>
              ${De[de]||de}
            </li>`)}
      </ul>
    </div>`}function Ue(w){return l`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${w.map(E=>{let W=[De[E.trigger]||E.trigger];return Number.isInteger(E.attempts_per_operation_attempt)?W.push(`operation\uB2F9 ${E.attempts_per_operation_attempt}\uD68C`):Number.isInteger(E.attempts)?W.push(`${De[E.budget]||E.budget} ${E.attempts}\uD68C`):Number.isInteger(E.sessions_per_user_action)&&W.push(`${E.sessions_per_user_action}\uD68C`,De[E.user_actions]||E.user_actions),E.applies_when&&W.push(De[E.applies_when]||E.applies_when),l`<li data-token=${E.id}>
            <strong>${De[E.id]||E.id}</strong>
            <span>${W.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Me(){let w=u(),E=w.auto_repair!==!1,W=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null,de=Array.isArray(w.repo_operations)?w.repo_operations:[],oe=de.find(Fe=>Fe.state==="repairing"),Oe=de.filter(Fe=>Fe.state==="failed"||Fe.state==="repairing"),Ne=Oe.length?Math.min(...Oe.map(Fe=>typeof Fe.repair?.remaining=="number"?Fe.repair.remaining:0)):W?.auto_repair?.resolution_ladder?.find(Fe=>Fe.id==="auto_repair_session")?.attempts??1,Je=Array.isArray(W?.auto_repair?.resolution_ladder)?W.auto_repair.resolution_ladder:[];return l`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          .checked=${E}
          @change=${Fe=>{ce(Fe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Ne}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${oe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${oe.repair?.owner_bead||oe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${W?l`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(W.worker_automatic||[]).length} · 해결 사다리
                ${Je.length} · 금지
                ${(W.never_automatic||[]).length}</span
              >
            </summary>
            ${Ee("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",W.worker_automatic||[],"worker-automatic")}
            ${W.supported===!1||W.schema_version!==2?l`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${W.schema_version})`}
                </div>`:Ue(Je)}
            ${Ee("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",W.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function Le(){Be(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ue}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${ke()} ${C(We())}
            ${Me()} ${K()}
          </div>
        </div>
      `,a)}let Ie=!1,Qe=()=>{Ie=!1},O=w=>{w.target===w.currentTarget&&ue()};a.addEventListener("close",Qe),a.addEventListener("cancel",Qe),a.addEventListener("click",O);let H=null;r&&r.subscribe&&(H=r.subscribe(()=>{Ie&&Le()}));let q=null;n&&n.subscribe&&(q=n.subscribe(()=>{Ie&&Le()}));function Z(){Ie||(Ie=!0,Le(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function ue(){Ie&&(Ie=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Z,close:ue,destroy(){Ie=!1,a.removeEventListener("close",Qe),a.removeEventListener("cancel",Qe),a.removeEventListener("click",O),H&&(H(),H=null),q&&(q(),q=null),a.remove()}}}function ls(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function cs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Np(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:ls(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function il(e,t){let r=Np(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?ft(r.deploy.at):""}
            >${cs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Pp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function gn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ds(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Pp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function sr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function bo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=ht(e.usage),o=Nt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!i,u=c?At(e.done_at):"",f=e.selectable?l`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",m=r?l`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?l`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?l`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",A=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=l`<span class="worker-mini__title">${e.title}</span>`,j=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(ke=>ke===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ke}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ke===e.completion_badge&&e.completion_title||""}
          >${ke}</span
        >`),ee=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",I=s.length>0?s.map(ke=>l`<span class="worker-usage" title=${ke.tooltip}
              >${ke.label}</span
            >`):o?l`<span class="worker-usage" title=${Br(e.usage)}
            >${o}</span
          >`:"",L=a?l`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",S=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",z=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",P=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ie=e.discard,ve=ie?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ie?.attempt_id||""}
          data-operation-id=${ie?.operation?.operation_id||""}
          data-discard-mode=${ie?.confirmation||"unmerged"}
          ?disabled=${ie?!ie.enabled:e.discard_enabled===!1}
          title=${ie?ie.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ie?.label||"\uD3D0\uAE30"}
        </button>`:"",le=e.revise_action?l`<button
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
        </button>`:"",$e=!!(o||a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ie?.operation||e.revise_action);return l`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?l`<div class="worker-mini__row1">${A}${$}${T}</div>
          <div class="worker-mini__row2">
            ${I}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ft(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${Y}${L}
            <span class="worker-mini__actions"
              >${S}${z}${P}${ve}</span
            >
            ${Hr(e)}
          </div>`:i?l`<div class="worker-mini__head">
              ${f}${m}${A}${$}${j}${x}${Y}${h}${ee}
            </div>
            <div class="worker-mini__body">${T}</div>
            ${$e?l`<div class="worker-mini__foot">
                  ${I}${L}
                  <span class="worker-mini__actions"
                    >${S}${z}${P}${ve}${le}</span
                  >
                  ${sr(e)}
                </div>`:""}
            ${Hr(e)}`:l`<div class="worker-mini__line">
              ${f}${m}${A}${$}${T}${j}${x}${Y}${h}${ee}${I}${L}${S}${z}${P}${ve}
            </div>
            ${sr(e)} ${Hr(e)}`}
  </div>`}function Fp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Bn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
    ${Hr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Fp(n):bo(n))}
          </div>`}
  </section>`}var ll=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],hn=ll.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ll.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function cl(e){let t=hn.findIndex(r=>r.step===e);return hn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ir(e){let t=hn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function qp(e){let t=hn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:hn.length}}function us(e){let t=qp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var dl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ul={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function pl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yo(e){for(let t of pl(e))if(Object.hasOwn(dl,t))return dl[t];return null}function wo(e){let t=null;for(let r of pl(e))Object.hasOwn(ul,r)&&(t=ul[r]);return t}function ps(e){let t=yo(e),r=wo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function fl(e,t){let r=yo(e)??yo(t),n=wo(t)??wo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var _l=160;function Bp(e){return e.length>_l?`${e.slice(0,_l)}\u2026`:e}function Up(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Bp(e.command)}</code>`:""}
  </div>`}function jp(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ko(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ml(e){let t=e.failure?ps(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
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
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Up(e.failure.cause_detail)}
          ${jp(e.failure.reason)}
          ${sr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function zp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ko(t-e.started_at):"\u2014",a=Wt(e),i=ur(e),c=ht(e.usage),u=Nt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${A}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
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
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||m?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>l`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${Br(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Hr(e)} ${sr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function $o(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>zp(s,t,r))}
  </div>`}function gr(e){return l`<svg
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
  </svg>`}function xo(){return gr(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function So(){return gr(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function gl(){return gr(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function hl(){return gr(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function bl(){return gr(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function vl(){return gr(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function yl(){return gr(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function wl(){return gr(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var bn=1,Hp=6e4,Wp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Gp=new Set(["auto_merge","merged","merge","done"]),kl={running:3,paused:2,failed:1};function Yp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Vp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=kl[u.run_state],h=kl[i];if(m>h||m===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Rt(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function $l(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Tt(e){return e&&typeof e=="object"?e:{}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],c=[],u=[],f=[],m=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let Y=x.root_dir,ee=x.name||Y,I=a.get(Y),L=I&&typeof I.revision=="number"?I.revision:typeof x.revision=="number"?x.revision:0,S=Tt(x.attempts),z=Tt(x.bead_titles),P=Tt(x.pr_observations),ie=Tt(x.admission),ve=Tt(x.revise_parked),le=Tt(x.merge_queue_state),$e=Tt(x.cleanup_failed),ke=Tt(x.discard_operations),We=Array.isArray(x.merge_queue)?x.merge_queue:[],Ze=new Set(We.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),ze=new Map(We.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),Te=Array.isArray(x.queue)?x.queue:[],Ae=Array.isArray(x.done)?x.done:[],me=new Map;for(let G of Ae)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&me.set(G.bead_id,G.added_at);let he=G=>({id:G,title:z[G]||G,root_dir:Y,workspace_name:ee,expected_revision:L,draggable:!1}),be=new Set;for(let[G,K]of Vp(S,me))be.add(G),c.push({...he(G),lane:"running",attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,runner:K.runner,model:K.model,effort:K.effort,speed:K.speed,resumed_from:K.resumed_from,continuation_mode:K.continuation_mode,usage:K.usage,discard:Gt(ke,G,{attempt_id:K.attempt_id}),badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let G of Array.isArray(x.pr_wait)?x.pr_wait:[]){let K=G&&G.bead_id;if(typeof K!="string"||be.has(K))continue;be.add(K);let Re=Tt(P[K]),ge=Tt(Re.pr),_e=Re.gate?Tt(Re.gate):null,R=Ze.has(K),C=ze.get(K)?.continuation_action||null,ce=!!C&&C.continuation===null,De=le.active===K,Ee=G.external===!0,Ue=$e[K]||null,Me=!!_e&&_e.base_badge==="\uCDA9\uB3CC",Le=!!Ue&&["child_sweep","branch_cleanup","parent_close"].includes(Ue.step)&&!!_e&&_e.tier==="merged",Ie=Ee&&!!Ue&&!!_e&&_e.tier==="merged",Qe=!!_e&&["closed_unmerged","review","undecidable"].includes(_e.tier),O=Gt(ke,K,{external:Ee,merge_active:De,merge_queued:R,merged:!!Ue||_e?.tier==="merged"}),H=!!O.operation;u.push({...he(K),lane:"pr_wait",pr_number:typeof ge.number=="number"?ge.number:null,pr_url:typeof ge.url=="string"?ge.url:void 0,external:Ee,usage:Rt(S,K),badges:ce?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ue?[Ir(Ue.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ir(Ue.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof _e?.gate_badge=="string"&&_e.gate_badge.length>0?[_e.gate_badge]:[],alert:!!Ue||Qe,reason:Ue?us(Ue.step):"PR \uB300\uAE30",merge_action:!R||ce,merge_enabled:!H&&(ce||_e?.enabled===!0||Me||Le||Ie),merge_label:ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ie||Le?"\uC815\uB9AC \uC7AC\uAC1C":Me&&!Le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":H?O.error?`\uD3D0\uAE30 \uC2E4\uD328: ${O.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${O.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":_e?.enabled===!0?`\uBA38\uC9C0 (${_e.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${_e?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:R&&!ce,cancel_enabled:!De,continuation_mismatch:C?.mismatch||null,discard:O,discard_action:O.action,discard_enabled:O.enabled,discard_title:O.title})}for(let G=0;G<Te.length;G++){let K=Te[G],Re=K&&K.bead_id;if(typeof Re!="string"||be.has(Re))continue;be.add(Re);let ge=ve[Re],_e=Gt(ke,Re),R=_e.operation?_e:null,C={...he(Re),lane:"queue",draggable:!R,discard:R||void 0,reason:$l(ie,Re),queue_position:G+1,queue_index:G,queue_length:Te.length,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!R,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(C);let ce=h.get(Y);ce?ce.push(C):h.set(Y,[C])}for(let G of Array.isArray(x.runnable)?x.runnable:[]){let K=G&&G.bead_id;typeof K!="string"||be.has(K)||(be.add(K),i.push({...he(K),title:G.title||z[K]||K,lane:"runnable",draggable:!0,reason:$l(ie,K),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,place_index:Te.length}))}for(let G of Ae){let K=G&&G.bead_id;if(typeof K!="string"||be.has(K)||(be.add(K),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Re=Yp(S,K);m.push({...he(K),lane:"done",done:!0,usage:Rt(S,K),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Re&&typeof Re.done_kind=="string"?Re.done_kind:null})}}let A=new Map;s.forEach((x,Y)=>{x&&typeof x.root_dir=="string"&&A.set(x.root_dir,Y)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,Y)=>{if($==="repo"){let L=A.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(L!==S)return L-S}let ee=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,I=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return ee!==null&&I!==null&&ee!==I?ee-I:ee===null&&I!==null?1:ee!==null&&I===null?-1:x.id.localeCompare(Y.id)}),m.sort((x,Y)=>(Y.done_at??0)-(x.done_at??0));let T=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),j=[];for(let x of T)!x||typeof x.root_dir!="string"||j.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=bn?x.slots:bn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Tt(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Tt(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:i,queue:f,queue_groups:j,running:c,pr_wait:u,done:m,automation:{total:j.length,both_on:j.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Kp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Hp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ft(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${At(e,t)}</span
        >`}</span
  >`}function vn(e){return l`<div class="mon-c__title">${e.title}</div>`}function yn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function fs(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function To(e){let t=ht(e.usage),r=Nt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${Br(e.usage)}
        >${r}</span
      >`:""}function Eo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Zp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${So()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${xo()}
        </button>`}
    ${e.discard?.action?l`<button
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
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${hl()}
        </button>`:""}
  </span>`}function Xp(e,t){let r=typeof e.started_at=="number"?ko(t-e.started_at):"";return l`${vn(e)}
    <div class="mon-c__meta">
      ${Eo(e)}${Kp(e.last_event_at,t)}${yn(e)}${fs(e)}
      ${Wt(e)?l`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${ur(e)?l`<span
            class="rtile__resumed"
            title=${ur(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${To(e)}${Zp(e)}${sr(e)}
    </div>`}function Qp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=At(e.updated_at);return l`${vn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${yn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${qn(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${fs(e)}
      ${i?l`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
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
    </div>`}function Jp(e){let t=!!e.discard?.operation;return l`${vn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${yn(e)}
      ${Eo(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?l`<button
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
    ${sr(e)}
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
        </div>`:""}`}function ef(e){let t=!!(Nt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${vn(e)}
    <div class="mon-c__meta">
      ${yn(e)}${fs(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Eo(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${To(e)}
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
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${sr(e)}
        </div>`:""}`}function tf(e,t){let r=e.done_kind||"",n=r?Wp[r]||r:"",s=At(e.done_at,t);return l`${vn(e)}
    <div class="mon-c__meta">
      ${yn(e)}${fs(e)}
      ${n?l`<span
            class="mon-live__kind${Gp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${To(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ft(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function xl(e,t){return e.lane==="running"?Xp(e,t):e.lane==="runnable"?Qp(e):e.lane==="queue"?Jp(e):e.lane==="pr_wait"?ef(e):tf(e,t)}function Sl(e){let t=String(e.revision);return l`<header
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
        ${bl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${vl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${bn}
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
        ${yl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Al(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?gl():wl()}
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
        ${Ht.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Tl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function El(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ht(zn(t));let r={};for(let i of Jt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Jt){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Nt(r):null}var Rl="bdui.monitor.done-range",Il="bdui.monitor.running_sort";function rf(){try{let e=window.localStorage.getItem(Rl);return Ct(e)?e:St}catch{return St}}function nf(e){try{window.localStorage.setItem(Rl,e)}catch{}}function sf(){try{return window.localStorage.getItem(Il)==="repo"?"repo":"started"}catch{return"started"}}function of(e){try{window.localStorage.setItem(Il,e)}catch{}}var Ll="tab:monitor:pipeline",af=1e3,lf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Cl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${xl(e,t)}
  </div>`}function Ol(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(O=>typeof globalThis.confirm!="function"||globalThis.confirm(O)),m=rf(),h=sf();function A(){let O=Ht.find(H=>H.value===m);return O?O.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let T=Ao(null,null),j=null,x=new Map,Y=new Set;function ee(O){return T.queue_groups.find(H=>H.root_dir===O)||null}let L=is(e,{queueStore:{get(){if(!j)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let O=x.get(j);if(O)return O;let H=ee(j),q=s&&s.get?s.get():null,Z=(Array.isArray(q)?q:[]).find(ue=>ue&&ue.root_dir===j);return{revision:H?H.revision:0,exec_defaults:H?H.exec_defaults:{},default_exec_preset_id:H?H.default_exec_preset_id:null,runner_catalog:H?H.runner_catalog:null,workspace_info:Z?Z.workspace_info:void 0}},set(O){j&&x.set(j,O);for(let H of Array.from(Y))H()},subscribe(O){return Y.add(O),()=>Y.delete(O)}},presetStore:a,transport:o?(O,H)=>o(O,O==="worker-queue-set-default-exec-preset"||O==="get-worker-system-prompt"?{...H||{},root_dir:j}:H):void 0,getWorkspacePath:()=>j||void 0}),S=null,z=null;async function P(O,H,q,Z,ue=!0){if(!o||!q)return null;let w=await o(O,{...H,root_dir:q,expected_revision:Z});if(w&&w.conflict&&ue){w.queue&&x.set(q,w.queue);let E=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:Z;w=await o(O,{...H,root_dir:q,expected_revision:E})}return w&&w.queue&&q&&x.set(q,w.queue),w}function ie(O,H){let q=x.get(O),Z=s&&s.get?s.get():null,ue=(Array.isArray(Z)?Z:[]).find(E=>E?.root_dir===O);return(q||ue)?.merge_queue?.find(E=>E.bead_id===H)?.continuation_action}async function ve(O,H,q,Z){let ue=await P(O,H,q,Z),w=x.get(q)?.revision??ue?.queue?.revision??Z;return Qt(ue,(E,W)=>P(O,{...H,continuation:E,decision_token:W},q,w,!1),{refresh:E=>P(O,H,q,E?.queue?.revision??x.get(q)?.revision??w,!1)})}async function le(O,H,q,Z){let ue=await Qt({continuation_mismatch:Z},(E,W)=>P("worker-merge-queue-add",{bead_id:H,continuation:E,decision_token:W},O,q,!1)),w=ue?.queue?.merge_queue?.find(E=>E.bead_id===H)?.continuation_action;ue?.applied!==!0&&w?.continuation===null&&w.mismatch&&await le(O,H,ue.queue.revision,w.mismatch)}async function $e(O,H,q){let Z=await P("worker-discard",O,H,q);if(Z&&Z.discarded===!0){X(ds(Z),"success",5e3);return}if(Z&&Z.reason){X(`\uD3D0\uAE30 \uC2E4\uD328: ${Z.reason}`,"error");return}if(Z&&Z.accepted&&Z.pending==="merged_revert"){X("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Z&&Z.accepted){X(`\uD3D0\uAE30 \uC9C4\uD589: ${Z.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Z&&!Z.conflict&&X("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ke(O,H,q){return!o||!q?null:await o(O,{...H,root_dir:q})}async function We(O){if(!o||!O&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:O}),q=H&&Array.isArray(H.failed)?H.failed:[];q.length>0&&X(`\uC790\uB3D9\uD654 ${O?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${q.map(Z=>Z.root_dir).join(", ")}`,"error",3200)}async function Ze(){let O=new Map;for(let H of T.pr_wait)O.has(H.root_dir)||O.set(H.root_dir,H.expected_revision);for(let[H,q]of O)await P("worker-merge-queue-add-all",{},H,q)}let ze=null,Te=!1,Ae=null;function me(){Ae!==null&&clearTimeout(Ae),Ae=setTimeout(()=>{Ae=null,Te=!1},0)}function he(O){let H=O.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function be(O){let H=he(O);return!H||!ze?null:(H.getAttribute("data-root-dir")||"")===ze.root_dir?H:null}function G(){for(let O of Array.from($.querySelectorAll(".mon-group--drag-over")))O.classList.remove("mon-group--drag-over")}function K(O){let H=O.target,q=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(q){ze={bead_id:q.getAttribute("data-issue-id")||"",lane:q.getAttribute("data-lane")||"",root_dir:q.getAttribute("data-root-dir")||"",revision:Number(q.getAttribute("data-revision")||0)||0,queue_index:Number(q.getAttribute("data-queue-index")),queue_length:Number(q.getAttribute("data-queue-length")),place_index:Number(q.getAttribute("data-place-index"))},Te=!0;try{O.dataTransfer?.setData("text/plain",ze.bead_id),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}}function Re(O){let H=be(O);H&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function ge(O){he(O)?.classList.remove("mon-group--drag-over")}function _e(){ze=null,G(),me()}function R(O){let H=be(O),q=ze;if(ze=null,G(),!H||!q||!q.bead_id)return;O.preventDefault();let Z=O.target,ue=typeof Z?.closest=="function"?Z.closest('.mon-card[data-lane="queue"]'):null,w=ue&&H.contains(ue)?Number(ue.getAttribute("data-queue-index")):NaN;if(q.lane==="runnable"){let de=Number.isFinite(w)?w:q.place_index;if(!Number.isFinite(de))return;P("worker-queue-place",{bead_id:q.bead_id,index:de},q.root_dir,q.revision);return}if(q.lane!=="queue"||ue&&ue.getAttribute("data-issue-id")===q.bead_id)return;let E=q.queue_index,W=Number.isFinite(w)?E>w?w:w-1:q.queue_length-1;!Number.isFinite(W)||W<0||W===E||P("worker-queue-reorder",{bead_id:q.bead_id,to_index:W},q.root_dir,q.revision)}function C(O){let H={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return l`${Al({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:h,done_range:m,token_total:El(T.done),token_tooltip:Tl(A())})}
      <div class="worker-lanes mon-lanes">
        ${lf.map(q=>{let Z=H[q.lane],ue=q.lane==="queue"?T.queue_groups.length>0?l`${T.queue_groups.map(w=>l`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${Sl(w)}
                        <div class="mon-group__list">
                          ${w.items.map(E=>Cl(E,O))}
                        </div>
                      </div>`)}`:void 0:Z.length>0?l`${Z.map(w=>Cl(w,O))}`:void 0;return Yt({id:`monitor-${q.lane}`,lane:q.pane,title:q.lane==="done"?`\uC644\uB8CC\xB7${A()}`:q.title,items:Z,empty:q.empty,body:ue,live:q.lane==="running"&&Z.length>0,header_control:q.lane==="pr_wait"&&Z.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ce(){let O=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],q=u();T=Ao(O,H,{done_since:$r(m,q),running_sort:h}),Be(C(q),$)}function De(O,H){let q=i?i():void 0;if(!H||!q||H===q||!c){n(O);return}c(H).then(()=>{n(O)}).catch(Z=>{r("workspace switch for %s failed: %o",H,Z)})}function Ee(O){return{root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0}}function Ue(O,H){let{root_dir:q,revision:Z}=Ee(O),ue=O.getAttribute("data-issue-id")||"",w=H.dataset.attemptId||O.getAttribute("data-attempt-id")||"",E=H.classList;if(E.contains("worker-card__place")){P("worker-queue-place",{bead_id:ue,index:Number(O.getAttribute("data-place-index")||0)||0},q,Z);return}if(E.contains("mon-op--up")||E.contains("mon-op--down")){let W=Number(O.getAttribute("data-queue-index")||0)||0,de=E.contains("mon-op--up")?W-1:W+1;if(de<0)return;P("worker-queue-reorder",{bead_id:ue,to_index:de},q,Z);return}if(E.contains("mon-op--remove")){P("worker-queue-remove",{bead_id:ue},q,Z);return}if(E.contains("mon-op--pause")){ke("worker-attempt-pause",{attempt_id:w},q);return}if(E.contains("mon-op--discard")){if(!f(gn(ue,"unmerged")))return;$e({bead_id:ue,...w?{attempt_id:w}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},q,Z);return}if(E.contains("mon-op--resume")){ve("worker-attempt-resume",{attempt_id:w},q,Z);return}if(E.contains("mon-op--dismiss")){P("worker-attempt-dismiss",{attempt_id:w},q,Z);return}if(E.contains("worker-mini__merge")){let W=ie(q,ue);W?.mismatch&&W.continuation===null?le(q,ue,Z,W.mismatch):P("worker-merge-queue-add",{bead_id:ue},q,Z);return}if(E.contains("worker-mini__merge-cancel")){P("worker-merge-queue-remove",{bead_id:ue},q,Z);return}if(E.contains("worker-mini__discard")){let W=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(gn(ue,W)))return;$e({bead_id:ue,...w?{attempt_id:w}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},q,Z);return}if(E.contains("worker-mini__revise-fix")){ve("worker-revise-fix",{bead_id:ue},q,Z);return}E.contains("worker-mini__revise-approve")&&P("worker-revise-approve",{bead_id:ue},q,Z)}function Me(O){let H=Te;Te=!1;let q=O.target;if(!q||typeof q.closest!="function"||q.closest("dialog")||q.closest("a"))return;let Z=q.closest(".mon-running-sort");if(Z){O.preventDefault(),h=Z.getAttribute("data-sort")==="repo"?"repo":"started",of(h),ce();return}let ue=q.closest(".mon-auto-all");if(ue){O.preventDefault(),We(ue.getAttribute("data-on")==="true");return}if(q.closest(".mon-merge-all")){O.preventDefault(),Ze();return}let E=q.closest(".mon-ctl--advance");if(E){O.preventDefault();let{root_dir:Je,revision:Fe}=Ee(E);P("worker-automation-toggle",{on:E.getAttribute("data-on")==="true"},Je,Fe);return}let W=q.closest(".mon-ctl--merge-auto");if(W){O.preventDefault();let{root_dir:Je,revision:Fe}=Ee(W);P("worker-merge-auto-toggle",{on:W.getAttribute("data-on")==="true"},Je,Fe);return}let de=q.closest(".mon-ctl--exec");if(de){O.preventDefault(),j=de.getAttribute("data-root-dir")||null,x.delete(j||""),L.open();return}let oe=q.closest(".mon-card");if(!oe)return;let Oe=q.closest("button");if(Oe){O.preventDefault(),Ue(oe,Oe);return}let Ne=oe.getAttribute("data-issue-id");Ne&&!H&&(O.preventDefault(),De(Ne,oe.getAttribute("data-root-dir")||""))}function Le(O){let H=O.target;if(!H||typeof H.closest!="function")return;let q=H.closest(".mon-done-range");if(q){m=Ct(q.value)?q.value:St,nf(m),ce();return}let Z=H.closest(".mon-slots__input");if(!Z)return;let{root_dir:ue,revision:w}=Ee(Z),E=Number(Z.value);if(!Number.isFinite(E))return;let W=Math.max(bn,Math.floor(E));P("worker-queue-set-slots",{slots:W},ue,w)}e.addEventListener("click",Me),e.addEventListener("change",Le),e.addEventListener("dragstart",K),e.addEventListener("dragover",Re),e.addEventListener("dragleave",ge),e.addEventListener("drop",R),e.addEventListener("dragend",_e),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),ce();for(let O of Array.from(Y))O()}catch{}}));function Ie(){z!==null&&(clearInterval(z),z=null)}function Qe(){Ae!==null&&(clearTimeout(Ae),Ae=null)}return{load(){r("load"),ce(),z===null&&(z=setInterval(()=>{try{ce()}catch{}},af))},pause(){Ie()},clear(){Ie(),Qe(),S&&(S(),S=null),e.removeEventListener("click",Me),e.removeEventListener("change",Le),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",Re),e.removeEventListener("dragleave",ge),e.removeEventListener("drop",R),e.removeEventListener("dragend",_e),L.destroy(),Y.clear(),e.replaceChildren()}}}function Dl(e,t,r){let n=at("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
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
    `}function i(){Be(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Be(l``,e)}}}var Ml=["bug","feature","task","epic","chore"];function Nl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Pl=["Critical","High","Medium","Low","Backlog"];function Fl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let S of Ml){let z=document.createElement("option");z.value=S,z.textContent=Nl(S),o.appendChild(z)}a.replaceChildren();for(let S=0;S<=4;S+=1){let z=document.createElement("option");z.value=String(S);let P=Pl[S]||"Medium";z.textContent=`${S} \u2013 ${P}`,a.appendChild(z)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(L){s.disabled=L,o.disabled=L,a.disabled=L,i.disabled=L,c.disabled=L,f.disabled=L,m.disabled=L,m.textContent=L?"Creating\u2026":"Create"}function j(){u.textContent=""}function x(L){u.textContent=L}function Y(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let L=o.value||"",S=a.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function I(){j();let L=String(s.value||"").trim();if(L.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let z=String(o.value||""),P=String(c.value||""),ie={title:L};z.length>0&&(ie.type=z),String(S).length>0&&(ie.priority=S),P.length>0&&(ie.description=P),T(!0);try{await t("create-issue",ie)}catch{T(!1),x("Failed to create issue");return}ee(),T(!1),$()}return r.addEventListener("cancel",L=>{L.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),I())}),n.addEventListener("submit",L=>{L.preventDefault(),I()}),{open(){n.reset(),j(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var cf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ql(e){return String(e).padStart(2,"0")}function df(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function uf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ql(n.getHours())}:${ql(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${cf[n.getMonth()]} ${n.getDate()} ${o}`;return`${df(r,t)} \xB7 ${i}`}function pf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Bl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Ul(e){let t=!1,r=null,n=new Map;function s(){Be(l``,e),e.hidden=!0}function o(){let c=Bl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Be(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,A=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map($=>{let T=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,j=Math.min(100,Math.max(0,T)),Y=`resets ${uf($.resetsAt,u)}${h?` \xB7 ${A}`:""}`;return l`<span
                class="usage-meter__window ${pf(j)}"
                style=${`--progress: ${j}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${j}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(Bl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var ff="worker-ineligible";function Co(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function jl(e){return Co(e).includes(ff)}var Ro="worker-serial";function wn(e){return Co(e).includes(Ro)}var _f=20,zl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Hl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function mf(e,t,r=_f){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Wl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function gf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Gl(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Yl(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function hf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Hl,n)?Hl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function bf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ft(e.at):""}
      >${cs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Wl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(zl,t.kind)?zl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ls(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ho(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Wl(e)}"
          >${gf(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Yl(fl(t.failure_kind,n)):""}
      ${hf(t)}
      ${Gl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ls(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function vf(e){let t=e.cleanup,r=Ir(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ft(e.at):""}
      >${cs(e.at)||"\u2014"}</span
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
        ${cl(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Yl(ps(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Gl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function yf(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?vf(t):bf(t))}
        </ul>`}
  </section>`}function Vl(e,t={}){let r=null;function n(){Be(r?yf(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:mf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var wf="tab:worker:ready",kf="tab:worker:blocked",$f="tab:worker:in-progress",xf="tab:worker:closed",kn=1,Sf=new Set(["done","failed","orphaned","stopped","discarded"]);function Kl(e){return _n(e).path.length>0}var Ql="beads-ui.worker.candidate-filter",Io={show_blocked:!1,spec:"all"};function Af(){try{let e=window.localStorage.getItem(Ql);if(!e)return{...Io};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Io};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Io}}}function Tf(e){try{window.localStorage.setItem(Ql,JSON.stringify(e))}catch{}}function Ef(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Cf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jl="bdui.worker.candidate_sort",Rf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],_s="spec";function If(){try{let e=window.localStorage.getItem(Jl);return e==="board"||e==="created"||e==="spec"?e:_s}catch{return _s}}function Lf(e){try{window.localStorage.setItem(Jl,e)}catch{}}var ec="bdui.worker.done-range";function Of(){try{let e=window.localStorage.getItem(ec);return Ct(e)?e:St}catch{return St}}function Df(e){try{window.localStorage.setItem(ec,e)}catch{}}var Mf="(max-width: 640px)",tc="beads-ui.worker.lane-collapsed",$n={queue:!0,done:!0};function Nf(){try{let e=window.localStorage.getItem(tc);if(!e)return{...$n};let t=JSON.parse(e);return!t||typeof t!="object"?{...$n}:{queue:typeof t.queue=="boolean"?t.queue:$n.queue,done:typeof t.done=="boolean"?t.done:$n.done}}catch{return{...$n}}}function Pf(e){try{window.localStorage.setItem(tc,JSON.stringify(e))}catch{}}function Zl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ff(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Sr):(n.sort(On(r)),t==="board"?n:[...n.filter(Kl),...n.filter(s=>!Kl(s))])}function qf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Bf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Uf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var jf=["closed_unmerged","review","undecidable"],zf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Hf(e,t){for(let r of zf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Xl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Wf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Lo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Gf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Yf(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,m=null,h=null,A={},$=!1){let T=!!c&&c.position>0,j=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,Y=c&&c.failure||null,ee=r[e]||null,I=ee&&ee.gate?ee.gate:null,L=ee&&ee.pr?ee.pr:null,S=Gf(h),z=Wf(c?c.resolution:null),P=[];i&&P.push("\uC138\uC158");let ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":z?z.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,ve=Hf(i&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",ie?null:o&&o.activity||null);if(ie&&P.push(ie),ve.label&&P.push(ve.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&P.push(I.base_badge),m&&P.push(m),n){let he=Ir(n.step);P.push(he?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${he}`:"\uC815\uB9AC \uBA48\uCDA4")}S&&P.push(S.badge),T&&!x&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),Y&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Xl(Y)}`),j&&P.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${Xl(f)}`);let le=!!I&&I.base_badge==="\uCDA9\uB3CC",$e=!!I&&I.enabled===!0,ke=vo(o&&o.merge_progress?o.merge_progress.step:null),We=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!I&&I.tier==="merged",Ze=i&&!!n&&!!I&&I.tier==="merged",ze=i&&le&&u===!1,Te=Gt(A,e,{external:i,merge_active:x||!!ke,merge_queued:T,conflict_active:!!a,cleanup_active:!1,merged:!!n||I?.tier==="merged"}),Ae=!!Te.operation,me=!We&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?us(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:L&&typeof L.number=="number"?L.number:null,pr_url:L&&typeof L.url=="string"?L.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:P,live_badge:a==="paused"?null:z?.live||a==="running"?ie:ve.live?ve.label:null,usage:s,alert:!!I&&jf.includes(I.tier)||!!n||!!Y||!!(S&&S.alert),merge_action:me?!1:!T||j,timeline_action:me,cancel_action:T&&!j,cancel_enabled:!x&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Te,discard_action:Te.action,merge_step:ke,discard_enabled:Te.enabled,discard_title:Te.title,merge_enabled:!ke&&!a&&!Ae&&!(S&&S.lock_actions)&&!ze&&!me&&($e||le||We||Ze),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":We||Ze?"\uC815\uB9AC \uC7AC\uAC1C":le&&!ke&&!We?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ae?Te.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Te.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Te.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":We?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":le?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":$e?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,h=n?Mn(n,i):null,A=Pn({transport:r,uiOrderStore:i}),$=null,T=[],j=Af(),x=If(),Y=Ct(f)?f:Of(),ee=new Map;function I(){let p=Ht.find(y=>y.value===Y);return p?p.label:"\uC624\uB298"}let L=Nf(),S=!1,z=new Set,P=new Set,ie=new Set,ve=new Set,le="ordinary",$e=!1,ke=new Map,We=[],Ze=document.createElement("div");Ze.className="worker-console";let ze=document.createElement("div");ze.className="worker-top";let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let me=document.createElement("div");me.className="worker-drawer-host";let he=document.createElement("div");he.className="worker-drawer-host",he.hidden=!0,Te.append(Ae,me,he);let be=document.createElement("div");be.className="worker-lanes-host",Ze.append(ze,Te,be),e.appendChild(Ze);let G=null,K=ns(me,{transport:r,sessionLogStore:a,onClose:()=>{G=null,Te.hidden=!0,re()}}),Re=Vl(he,{onClose:()=>{he.hidden=!0,Te.hidden=!0,re()}}),ge=is(Ze,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function _e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:kn,queue:[],pr_wait:[],done:[]}}function R(){let p=_e();return typeof p.revision=="number"?p.revision:0}function C(p){p&&p.queue&&s&&s.set(p.queue)}function ce(){let p=_e().queue;return Array.isArray(p)?p.length:0}async function De(p,y){if(!r)return;let F=await r("worker-queue-place",{bead_id:p,index:y,expected_revision:R()});C(F),F&&F.conflict&&await r("worker-queue-place",{bead_id:p,index:y,expected_revision:R()}).then(C)}async function Ee(p,y){if(!r)return;let F=await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:R()});C(F),F&&F.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:R()}).then(C)}async function Ue(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:R()});C(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:R()}).then(C)}async function Me(){if(!r||$e)return;let y=(Array.isArray(_e().queue)?_e().queue:[]).map(B=>B.bead_id).filter(B=>ve.has(B));if(y.length===0)return;if(y.some(B=>{let b=ke.get(B);return b!==!0&&b!==!1})){X("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let F=le==="serial",ne=y.filter(B=>ke.get(B)!==F);if(ne.length===0){ve.clear(),re(),X("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}$e=!0,re();let fe=[],we=0;try{for(let B of ne){let b=await Promise.resolve(r(F?"label-add":"label-remove",{id:B,label:Ro})).catch(()=>[]),D=Array.isArray(b)?b[0]:b,Q=D&&typeof D=="object"?D.labels:null;D&&typeof D=="object"&&D.id===B&&Array.isArray(Q)&&wn(Q)===F?we+=1:fe.push(B)}if(fe.length===0){ve.clear(),X(`${we}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ve.clear();for(let B of fe)ve.add(B);X(`${ne.length}\uAC1C \uC911 ${we}\uAC1C \uBCC0\uACBD \xB7 ${fe.length}\uAC1C \uC2E4\uD328 (${fe.join(", ")})`,"error")}finally{$e=!1,re()}}async function Le(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ie(p){if(!r||!p)return;let y=async(ne={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:R(),...ne}),F=await y();C(F),F&&F.conflict&&(F=await r("worker-attempt-resume",{attempt_id:p,expected_revision:R()}),C(F)),F=await Qt(F,(ne,fe)=>y({continuation:ne,decision_token:fe}),{onResult:C,refresh:()=>y()}),F&&F.resumed===!1&&!F.conflict&&F.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${F.reason}`,"error",2400)}async function Qe(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:R()});C(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:R()}),C(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function O(p,y,F=!0){if(!r)return null;let ne=r,fe=await ne(p,{...y,expected_revision:R()});return C(fe),fe&&fe.conflict&&F&&(fe=await ne(p,{...y,expected_revision:R()}),C(fe)),fe}async function H(p){if(!r||!p)return;let y=_e().merge_queue?.find(ne=>ne.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Z(p,y.mismatch);return}z.add(p),re();let F;try{F=await O("worker-merge-queue-add",{bead_id:p})}finally{z.delete(p),re()}!F||F.conflict||F.applied||X("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function q(p){if(!(!r||!p||P.has(p))){P.add(p),re();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:R()});C(y),y&&!y.retried&&!y.conflict&&y.reason&&X(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{P.delete(p),re()}}}async function Z(p,y){let F=await Qt({continuation_mismatch:y},(fe,we)=>O("worker-merge-queue-add",{bead_id:p,continuation:fe,decision_token:we},!1)),ne=F?.queue?.merge_queue?.find(fe=>fe.bead_id===p)?.continuation_action;if(F?.applied!==!0&&ne?.continuation===null&&ne.mismatch){await Z(p,ne.mismatch);return}F&&F.applied===!1&&!F.conflict&&X("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ue(p){if(!r)return;let y=await O("worker-merge-auto-toggle",{on:p});!y||y.conflict||X(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function w(p){if(!r||!p)return;let y=await O("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&X("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function E(){await O("worker-merge-queue-remove",{all:!0})}async function W(p,y=null,F="unmerged",ne=null){if(!r||!p)return;let fe=gn(p,F);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let B=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ne?{operation_id:ne}:{},expected_revision:R()});if(C(B),B&&B.conflict&&(B=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ne?{operation_id:ne}:{},expected_revision:R()}),C(B)),B&&B.discarded===!0){X(ds(B),"success",5e3);return}if(B&&B.reason){X(`\uD3D0\uAE30 \uC2E4\uD328: ${B.reason}`,"error",2800);return}if(B&&B.accepted&&B.pending==="merged_revert"){X("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(B&&B.accepted&&!B.discarded){X(`\uD3D0\uAE30 \uC9C4\uD589: ${B.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}B&&!B.conflict&&X("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function de(p,y){if(!r||!y||ie.has(y))return;ie.add(y),re();let F;try{let ne=async(fe={})=>await r(p,{bead_id:y,expected_revision:R(),...fe});F=await ne(),C(F),F&&F.conflict&&(F=await r(p,{bead_id:y,expected_revision:R()}),C(F)),p==="worker-revise-fix"&&(F=await Qt(F,(fe,we)=>ne({continuation:fe,decision_token:we}),{onResult:C,refresh:()=>ne()}))}finally{ie.delete(y),re()}if(!(!F||F.conflict)){if(F.ok){X(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}X(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function oe(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:R()});C(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:R()}).then(C)}async function Oe(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(C(y),y&&y.ok===!1){X(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&X("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Ne(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});C(y),y&&y.ok===!1&&X(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Je(p){if(!r||!Number.isFinite(p))return;let y=Math.max(kn,Math.floor(p)),F=await r("worker-queue-set-slots",{slots:y,expected_revision:R()});C(F),F&&F.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:R()}).then(C)}async function Fe(p){if(!r)return;let y=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:R()});C(y),y&&y.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:R()}).then(C)}function ut(){let p=_e(),y=h?h.selectBoardColumn(wf,"ready"):[],F=h?h.selectBoardColumn(kf,"blocked"):[],ne=h?h.selectBoardColumn(xf,"closed"):[],fe=h?h.selectBoardColumn($f,"in_progress"):[],we=new Map;for(let g of fe){let M=Bf(g);if(!M)continue;let se=we.get(M);se?se.push(g):we.set(M,[g])}let B=g=>{let M=Nn(we.get(g)||[]);return M?M.title||M.id:null},b=p.bead_titles||{},D=new Map;for(let[g,M]of Object.entries(b))typeof M=="string"&&M.length>0&&D.set(g,M);for(let g of[...y,...F])D.set(g.id,g.title||g.id);ke.clear();let Q=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Pe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,M]of Object.entries(Pe))Array.isArray(M)&&ke.set(g,wn(M));for(let g of[...y,...F]){let M=g.labels;if(!Array.isArray(M))continue;if(!ke.has(g.id)){ke.set(g.id,wn(M));continue}let se=Q[g.id],Ye=Xt(se&&typeof se=="object"?se.updated_at:null),zt=Xt(g.updated_at);zt!==null&&Ye!==null&&zt>Ye&&ke.set(g.id,wn(M))}let Xe=new Map;for(let[g,M]of Object.entries(Q))M&&typeof M=="object"&&Xe.set(g,M);for(let g of[...y,...F])Xe.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let je=g=>Xe.get(g)||{},_=p.pr_wait||[],d=p.pr_observations||{},k=p.pr_activity||{},v=p.cleanup_failed||{},N=Object.entries(v).map(([g,M])=>({bead_id:g,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),J=p.queue||[],ye=new Set(J.map(g=>g.bead_id));for(let g of ve)ye.has(g)||ve.delete(g);let ct=new Set([...J.map(g=>g.bead_id),..._.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),te=new Set(F.map(g=>g.id)),et=i?i.get()?.order||{}:{},ar=new Set,Po=[];for(let g of[...y,...F])ct.has(g.id)||ar.has(g.id)||qf(g)||jl(g.labels)||(ar.add(g.id),Po.push(g));T=Ff(Po,x,et);let fc=p.admission||{},Fo=g=>{let M=fc[g];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof M.reason=="string"?M.reason:"",Ye=se.indexOf(":");return Ye>0&&Ye<se.length-1?`\u26D4 ${se.slice(0,Ye)} (${se.slice(Ye+1)})`:`\u26D4 ${se}`},_c=T.map(g=>{let M=_n(g),se=M.path.length>0,Ye=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Ye&&se&&!M.conflict,ir=te.has(g.id),Et=[];ir&&Et.push(Uf(g)),Ye?Et.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):M.conflict?Et.push("spec_id_conflict"):se||Et.push("spec \uC5C6\uC74C");let Cn=Fo(g.id);return Cn&&Et.push(Cn),{id:g.id,title:g.title||g.id,reason:Et.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ye,status:g.status,blocked:ir,has_spec:se}}),ms=Ef(_c,j),mc=ms.visible,gc=p.revise_parked||{},Wr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},qo=(g,M)=>g.map(se=>{let Ye=M==="queue"?gc[se.bead_id]:null,zt=M==="queue"?Gt(Wr,se.bead_id):null,ir=zt?.operation?zt:null,Et=M==="queue"?ke.has(se.bead_id)?ke.get(se.bead_id)||!1:null:!1,Cn=Et===!0&&(Object.values(p.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==se.bead_id&&!Sf.has(Kt.status))||_.some(Kt=>Kt.bead_id!==se.bead_id)||Object.values(Wr).some(Kt=>Kt&&Kt.bead_id!==se.bead_id&&Kt.phase!=="done")),sa=M==="done"?[]:[Fo(se.bead_id)];return Cn&&sa.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:se.bead_id,title:D.get(se.bead_id)||se.bead_id,reason:sa.filter(Boolean).join(" \xB7 "),draggable:M!=="done"&&!ir,done:M==="done",lane:M,selectable:M==="queue",selected:M==="queue"&&ve.has(se.bead_id),worker_serial:Et,discard:ir,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!ir&&!ie.has(se.bead_id),revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?Rt(p.attempts||{},se.bead_id):null,done_at:M==="done"&&typeof se.added_at=="number"?se.added_at:void 0,...je(se.bead_id)}}),Bo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Bo.set(g.bead_id,g.added_at);let Gr=p.attempts?Object.values(p.attempts):[],gs=new Set;for(let g of Gr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&gs.add(g.resumed_from);let hs=new Map;for(let g of Gr)hs.set(g.bead_id,g.attempt_id);let bs=new Map;for(let g of Gr)bs.set(g.attempt_id,g);function vs(g){let M=new Set,se=g;for(;se&&!M.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;M.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&bs.get(se.resumed_from)||null}return!1}let xn=typeof p.declared_base=="string"?p.declared_base:null;function hc(g){let M=null;for(let se of Gr)!se||se.bead_id!==g||vs(se)||(M===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=se);return M&&typeof M.target_base=="string"?M.target_base:null}let Uo=[],jo=[],bc=g=>{let M=hs.get(g.bead_id)!==g.attempt_id,se=Bo.get(g.bead_id),Ye=typeof se=="number"&&se>0&&typeof g.finished_at=="number"&&se>=g.finished_at;return!M&&!Ye&&typeof g.dismissed_at!="number"},zo=g=>{let M=typeof g.session_id=="string"&&g.session_id.length>0,se=gs.has(g.attempt_id);return{eligible:M&&!se,reason:M?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dt=null;for(let g of Gr){let M=g.status==="paused"&&!gs.has(g.attempt_id);if(g.status==="running"||M)jo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:D.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:M,conflict_resolution:vs(g),base_exception:Lo(xn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(Wr,g.bead_id,{attempt_id:g.attempt_id}),usage:Rt(p.attempts||{},g.bead_id),current_child:B(g.bead_id),...je(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&bc(g)){let se=zo(g);Uo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:D.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(Wr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:vs(g),base_exception:Lo(xn,g.target_base),usage:Rt(p.attempts||{},g.bead_id),current_child:B(g.bead_id),...je(g.bead_id)}),Dt=g}}let Sn=[...Uo,...jo],Ho=null;if(Dt){let g=zo(Dt),M=Dt.cause_detail;Ho={bead_id:Dt.bead_id,repo:Dt.repo||"",reason:Dt.cause||Dt.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Dt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(Wr,Dt.bead_id,{attempt_id:Dt.attempt_id})}}let vc=new Set(Sn.map(g=>g.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],Wo=new Map,Go=new Map,Yo=new Map;ys.forEach((g,M)=>{g&&typeof g.bead_id=="string"&&(Wo.set(g.bead_id,M+1),Go.set(g.bead_id,g.resolution),Yo.set(g.bead_id,g.continuation_action||null))});let Vo=p.merge_queue_state||{active:null,failures:{}},yc=Vo.failures||{},wc=p.auto_merge_skips||{},Ko=g=>{let M=wc[g];if(!M)return null;let se=d[g],Ye=se&&se.pr?se.pr.head_sha:null;return Ye&&Ye===M.head_sha?M.reason||"":null},An=new Map;for(let g of Sn)g.failed!==!0&&g.conflict_resolution&&(g.paused?An.has(g.bead_id)||An.set(g.bead_id,"paused"):An.set(g.bead_id,"running"));let Zo=Sn.filter(g=>!g.paused&&g.failed!==!0).length,Xo=(p.workspace_info||{}).slots,kc=typeof Xo=="number"?Xo:typeof p.slots=="number"?p.slots:kn,Qo=p.pr_wait_holds_slot===!0?kn:kc,$c=Zo>Qo,Tn=$r(Y),xc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Tn===void 0||typeof g.added_at!="number"||g.added_at>=Tn).sort((g,M)=>(M.added_at||0)-(g.added_at||0)),Yr=qo(xc,"done"),Sc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Jo=[],Ac=u?.()||"";for(let g of ne){let M=Xt(g.closed_at);if(typeof g.id!="string"||Sc.has(g.id)||M===null||Tn!==void 0&&M<Tn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let se=`${Ac}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ye=ee.get(se);Ye===void 0&&r&&(ee.set(se,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ir=Array.isArray(zt)&&zt.some(Et=>ss(typeof Et?.text=="string"?Et.text:"")?.lane==="session");ee.set(se,ir?"session":"not-session"),re()}).catch(()=>{ee.set(se,"failed"),re()})),Ye==="session"&&Jo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:M,created_at:g.created_at,updated_at:g.updated_at})}Yr.push(...Jo),Yr.sort((g,M)=>(M.done_at||0)-(g.done_at||0));let En={};for(let g of Jt)En[g]=0;let ea=!1,ta=0,ws=0,ra=0;for(let g of Yr){let M=g.usage;if(M&&typeof M=="object"){let se=!1;for(let Ye of Jt)Number.isFinite(M[Ye])&&(En[Ye]+=M[Ye],ea=!0,se=!0);se&&(ws+=1,Number.isFinite(M.total_cost_usd)&&(ta+=M.total_cost_usd,ra+=1))}}ws>0&&ra===ws&&(En.total_cost_usd=ta);let na=Yr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Tc=na.length>0?ht(zn(na)):ea?Nt(En):null;return{queue:p,idToTitle:D,candidates:mc,candidate_hidden:{blocked:ms.hidden_blocked,spec:ms.hidden_spec},running:Sn,live_count:Zo,slots:Qo,over_cap:$c,failure:Ho,waiting:qo(J.filter(g=>!vc.has(g.bead_id)),"queue"),pr_wait:_.map(g=>Yf(g.bead_id,D.get(g.bead_id)||g.bead_id,d,v[g.bead_id]||null,Rt(p.attempts||{},g.bead_id),k[g.bead_id]||(z.has(g.bead_id)||P.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),An.get(g.bead_id)||null,g.external===!0,{position:Wo.get(g.bead_id)||0,active:Vo.active===g.bead_id,failure:yc[g.bead_id]||null,resolution:Go.get(g.bead_id),continuation_action:Yo.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Ko(g.bead_id):null,Lo(xn,hc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(hs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...je(g.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:_.map(g=>g.bead_id).filter(g=>Ko(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:xn,done:Yr,token_total:Tc,cleanup_failures:N,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function mt(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",F=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ne=V(p),fe=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",we=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,B=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,b=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${kn}
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
      </button>`,D=ml({failure:p.failure}),Q=il(p.repo_operations,p.cleanup_failures);return S?l`<div class="worker-ribbon">
          ${F} ${ne}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${we}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${b}</div>
          <div class="worker-kpi">${B}</div>
        </div>
        ${Q}${D}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${ne}${b}</div>
        <div class="worker-kpi">
          ${fe}${we}${B}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Pe=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Pe.tooltip}
                >${I()} 완료 · 누적 ${Pe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Q}${D}`}function rt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(F=>!F.paused&&F.failed!==!0);return l`<section
      class="worker-now${y?" worker-pane--live":""}"
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
      ${p.running.length>0?$o(p.running,Date.now(),G):""}
      ${p.pr_wait.map(F=>bo(F))}
    </section>`}function st(p){let y=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cf.map(F=>l`<button
              type="button"
              class="worker-filter__chip${j.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${j.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function ot(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Rf.map(p=>l`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function it(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Y}
      >
        ${Ht.map(p=>l`<option value=${p.value} ?selected=${Y===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function gt(){if(ve.size===0)return"";let p=Array.from(ve),y=p.some(F=>{let ne=ke.get(F);return ne!==!0&&ne!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${le}
        ?disabled=${$e}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${y||$e}
        title=${y?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":$e?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function U(p){let y=(p.queue.pr_wait||[]).filter(we=>we&&we.external!==!0&&typeof we.bead_id=="string"),F=new Set(p.running.filter(we=>!we.paused&&we.failed!==!0).map(we=>we.bead_id));for(let we of y)F.add(we.bead_id);let ne=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||y.length===0||p.waiting.length===0||F.size<p.slots),fe=p.pr_wait.some(we=>we.worker_serial===!0);if(!(!ne&&!(fe&&p.queue.auto_merge!==!0)))return l`${ne?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${fe&&p.queue.auto_merge!==!0?l`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function V(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let F=new Set(p.auto_excluded),ne=p.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!F.has(fe.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ne>0?` ${ne}`:""}
    </button>`}function ae(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ot(),controls:st(p)});return S?l`<div class="worker-lanes worker-lanes--mobile">
        ${rt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${gt()}${U(p)}`,collapsible:!0,collapsed:L.queue,preview:Zl(p.waiting)})}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:L.done,preview:Array.isArray(p.token_total)?p.token_total.map(F=>F.label).join(" \xB7 "):p.token_total||Zl(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${gt()}${U(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(F=>!F.paused&&F.failed!==!0),body:$o(p.running,Date.now(),G)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function pe(p){L={...L,[p]:!L[p]},Pf(L),re()}function re(){let p=ut();Be(mt(p),ze),Be(ae(p),be)}function Ce(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let F=Math.round(p.getBoundingClientRect().height);Ze.style.setProperty("--worker-ribbon-top",`${F}px`)};if(y(),typeof ResizeObserver=="function"){let F=new ResizeObserver(y);F.observe(p),We.push(()=>F.disconnect())}else window.addEventListener("resize",y),We.push(()=>window.removeEventListener("resize",y))}function Ve(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Mf);S=!!p.matches;let y=F=>{let ne=!!(F&&typeof F.matches=="boolean"?F.matches:p.matches);ne!==S&&(S=ne,re())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),We.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),We.push(()=>p.removeListener(y)))}function nt(p){let y=p.target,F=y?.closest?.(".worker-mini__grip"),ne=F?F.closest('.worker-mini[data-lane="queue"]'):y?.closest?.('.worker-card[draggable="true"]');if(!ne)return;let fe=ne.dataset.beadId||"",we=ne.dataset.lane||"";$={bead_id:fe,from_lane:we};try{p.dataTransfer?.setData("text/plain",fe),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function xe(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let F=y.dataset.lane||"";F!=="candidate"&&F!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function Ge(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Se(p,y){let F=T.find(B=>B.id===p);if(!F)return;let ne=T.filter(B=>B.id!==p),fe=ne.length;if(y){let B=y.dataset.beadId;if(B===p)return;let b=ne.findIndex(D=>D.id===B);b>=0&&(fe=b)}let we=ne.slice();we.splice(fe,0,F),A.applyReorder(p,we,fe)}function dt(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let F=y.dataset.lane||"",ne=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",fe=$?.from_lane||"";if($=null,!ne)return;let we=p.target?.closest?.(".worker-mini, .worker-card"),B=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),b=B.length;if(we){let D=B.indexOf(we);D>=0&&(b=D)}if(y.classList.contains("worker-pane--collapsed")&&(b=ce()),F==="candidate"){if(fe==="candidate"){Se(ne,we);return}fe==="queue"&&Ue(ne);return}F==="queue"&&(fe==="queue"?Ee(ne,b):De(ne,b))}function bt(p){j=p,Tf(p),re()}function or(p){x=p==="board"||p==="created"||p==="spec"?p:_s,Lf(x),re()}function Vt(p){Y=Ct(p)?p:St,Df(Y),m?.(Y),re()}function Bt(p){let y=p.target?.closest?.(".worker-mini__select");if(y){let Q=y.dataset.beadId||"";Q&&(y.checked?ve.add(Q):ve.delete(Q),re());return}let F=p.target?.closest?.(".worker-bulk__mode");if(F){le=F.value==="serial"?"serial":"ordinary";return}let ne=p.target?.closest?.(".worker-filter__blocked");if(ne){bt({...j,show_blocked:ne.checked});return}let fe=p.target?.closest?.(".worker-done-range");if(fe){Vt(fe.value);return}let we=p.target?.closest?.(".worker-sort");if(we){or(we.value||_s);return}let B=p.target?.closest?.(".worker-pr-wait-hold");if(B){Fe(B.checked);return}let b=p.target?.closest?.(".worker-slots__input");if(!b)return;let D=Number.parseInt(b.value,10);if(!Number.isFinite(D)){re();return}Je(D).then(re)}function pt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function $t(){let p=ut();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Ut(){G&&K.close(),he.hidden=!1,Te.hidden=!1,Re.open($t()),re()}function Lt(p){let y=_e(),F=y.attempts?y.attempts[p]:null;G=p,Re.close(),he.hidden=!0,Te.hidden=!1,K.open({attempt_id:p,meta:pt(F)}),re()}function Ot(){if(Re.isOpen()&&Re.refresh($t()),!G)return;let p=_e(),y=p.attempts?p.attempts[G]:null;if(y){K.updateMeta(pt(y));return}K.close()}function jt(p){let y=p.target,F=y?.closest?.(".worker-bulk__apply");if(F){F.disabled||Me();return}if(y?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-exec-defaults-dialog"))return;if(y?.closest?.(".worker-exec-defaults-btn")){ge.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){Ut();return}let ne=y?.closest?.(".worker-repo-op__session");if(ne){let te=ne.dataset.attemptId;te&&Lt(te);return}let fe=y?.closest?.(".worker-repo-op__resolve");if(fe){Oe(fe.dataset.operationId||"");return}let we=y?.closest?.(".worker-repo-op__dismiss");if(we){Ne(we.dataset.operationId||"");return}let B=y?.closest?.(".worker-cleanup__resume");if(B){let te=B.dataset.beadId;te&&q(te);return}let b=y?.closest?.(".worker-banner__resume");if(b){let te=b.dataset.attemptId;te&&Ie(te);return}let D=y?.closest?.(".worker-banner__discard");if(D){let te=D.dataset.confirmation==="merged"?"merged":"unmerged";W(D.dataset.beadId||"",D.dataset.attemptId||null,te,D.dataset.operationId||null);return}let Q=y?.closest?.(".worker-banner__dismiss");if(Q){let te=Q.dataset.attemptId;te&&Qe(te);return}if(y?.closest?.(".worker-play")){oe(!_e().auto_advance);return}let Pe=y?.closest?.(".worker-merge-all");if(Pe){Pe.classList.contains("worker-merge-all--stop")?_e().auto_merge===!0?ue(!1):E():ue(!0);return}let Xe=y?.closest?.(".worker-pane__hd--toggle");if(Xe){let te=Xe.dataset.lane;(te==="queue"||te==="done")&&pe(te);return}let je=y?.closest?.(".worker-card__place");if(je){let te=je.dataset.beadId;te&&!je.disabled&&De(te,ce());return}let _=y?.closest?.(".worker-filter__chip");if(_){let te=_.dataset.spec;(te==="all"||te==="with"||te==="without")&&bt({...j,spec:te});return}let d=y?.closest?.(".worker-mini__merge");if(d){let te=d.dataset.beadId||"";_e().cleanup_failed?.[te]?q(te):H(te);return}let k=y?.closest?.(".worker-mini__merge-cancel");if(k){w(k.dataset.beadId||"");return}let v=y?.closest?.(".worker-mini__discard");if(v){W(v.dataset.beadId||"",v.dataset.attemptId||null,v.dataset.discardMode==="merged"?"merged":"unmerged",v.dataset.operationId||null);return}let N=y?.closest?.(".worker-mini__revise-fix");if(N){de("worker-revise-fix",N.dataset.beadId||"");return}let J=y?.closest?.(".worker-mini__revise-approve");if(J){de("worker-revise-approve",J.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let te=y?.closest?.(".rtile"),et=te?.dataset?.beadId,ar=te?.dataset?.attemptId;et&&W(et,ar||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let et=y?.closest?.(".rtile")?.dataset?.attemptId;et&&Qe(et);return}if(y?.closest?.(".rtile__pause")){let et=y?.closest?.(".rtile")?.dataset?.attemptId;et&&Le(et);return}if(y?.closest?.(".rtile__resume")){let et=y?.closest?.(".rtile")?.dataset?.attemptId;et&&Ie(et);return}if(y?.closest?.(".rtile__session")){let et=y?.closest?.(".rtile")?.dataset?.attemptId;et&&Lt(et);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),K.close();return}if(y?.closest?.(".worker-drawer-host"))return;let ye=y?.closest?.(".rtile");if(ye){if(y?.closest?.(".rtile__id")){let et=ye.dataset.beadId;et&&Ar(et).then(ar=>{ar?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let te=ye.dataset.beadId;te&&c&&c(te);return}let ct=y?.closest?.(".worker-mini, .worker-card");if(ct){let te=ct.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){te&&Ar(te).then(et=>{et?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}te&&c&&c(te)}}return e.addEventListener("dragstart",nt),e.addEventListener("dragover",xe),e.addEventListener("dragleave",Ge),e.addEventListener("drop",dt),e.addEventListener("click",jt),e.addEventListener("change",Bt),Ve(),Ce(),h&&We.push(h.subscribe(()=>{for(let[p,y]of ee)y==="failed"&&ee.delete(p);re()})),s&&We.push(s.subscribe(()=>{re(),Ot()})),re(),{load(){re()},openExecDefaults(){ge.open()},destroy(){for(let p of We.splice(0))try{p()}catch{}e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",xe),e.removeEventListener("dragleave",Ge),e.removeEventListener("drop",dt),e.removeEventListener("click",jt),e.removeEventListener("change",Bt);try{K.destroy()}catch{}Te.hidden=!0;try{ge.destroy()}catch{}Be(l``,e)}}}function Do(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function rc(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(S){let P=S.target.value,ve=t.getState().workspace?.current?.path||"";if(P&&P!==ve){o("switching workspace to %s",P),i=!0,L();try{await r(P)}catch(le){o("workspace switch failed: %o",le)}finally{i=!1,L()}}}async function m(){let S=t.getState(),z=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!z||c)){o("git-pulling workspace %s",z),c=!0,L();try{await n(z)}catch(P){o("workspace git pull failed: %o",P)}finally{c=!1,L()}}}function h(S){let z=S.target;z&&e.contains(z)||T()}function A(S){S.key==="Escape"&&T()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",A),L())}function T(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),L())}function j(){u?T():$()}async function x(S){let z=S.target,P=z.value,ie=z.checked;o("toggling visibility %s \u2192 %s",P,String(ie));try{await s(P,ie)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function Y(S){return S?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function ee(S,z){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(P=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${P.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${P.path}"
                        .checked=${!z.has(P.path)}
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
    `}function I(){let S=t.getState(),z=S.workspace?.current,P=S.workspace?.available||[],ie=new Set(S.workspace?.hidden||[]),ve=z?.path||P[0]?.path||"";if(P.length===0)return l``;let le=P.filter($e=>!ie.has($e.path)||$e.path===ve);if(le.length<=1){let $e=le[0]||P[0],ke=Do($e.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${$e.path}"
            >${ke}</span
          >
          ${ee(P,ie)}
          ${Y(ve)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${le.map($e=>l`
              <option
                value="${$e.path}"
                ?selected=${$e.path===ve}
                title="${$e.path}"
              >
                ${Do($e.path)}
              </option>
            `)}
        </select>
        ${ee(P,ie)}
        ${Y(ve)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){Be(I(),e)}return L(),a=t.subscribe(()=>L()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),Be(l``,e)}}}var nc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Mo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sc(e,t,r=Mo()){return{id:r,type:e,payload:t}}function oc(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],m=new Map,h=new Set;function A(I){for(let L of Array.from(h))try{L(I)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),L=(r.jitterRatio||0)*I,S=Math.max(0,Math.round(I+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",S,a+1),i=setTimeout(()=>{i=null,ee()},S)}function T(I){try{s?.send(JSON.stringify(I))}catch(L){t("ws send failed",L)}}function j(){for(o="open",t("ws open"),A(o),a=0;f.length;){let I=f.shift();I&&T(I)}}function x(I){let L;try{L=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let z=u.get(L.id);u.delete(L.id),L.ok?z?.resolve(L.payload):z?.reject(L.error||new Error("ws error"));return}let S=m.get(L.type);if(S&&S.size>0)for(let z of Array.from(S))try{z(L.payload)}catch(P){t("ws event handler error",P)}else t("ws received unhandled message type: %s",L.type)}function Y(){o="closed",t("ws closed"),A(o);for(let[I,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(I);a+=1,$()}function ee(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",A(o),s.addEventListener("open",j),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(L){t("ws connect failed %o",L),$()}}return ee(),{send(I,L){if(!nc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let S=Mo(),z=sc(I,L,S);return t("send %s id=%s",I,S),new Promise((P,ie)=>{u.set(S,{resolve:P,reject:ie,type:I}),s&&s.readyState===s.OPEN?T(z):(t("queue %s id=%s (state=%s)",I,S,o),f.push(z))})},on(I,L){m.has(I)||m.set(I,new Set);let S=m.get(I);return S?.add(L),()=>{S?.delete(L)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Vf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Kf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var No=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ac=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],hr="tab:worker:closed",Zf="bdui.worker.done-range",ic=Ll,lc="worker:queue",cc="ui:order",dc="ui:display-policy",uc="exec:presets",br="tab:board:closed",pc="beads-ui.board.closed-range";function Xf(e){let t=at("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Ul(s),o&&a&&i&&c){let Ae=function(_,d){let k="Request failed",v="";if(_&&typeof _=="object"){let J=_;if(typeof J.message=="string"&&J.message.length>0&&(k=J.message),typeof J.details=="string")v=J.details;else if(J.details&&typeof J.details=="object")try{v=JSON.stringify(J.details,null,2)}catch{v=""}}else typeof _=="string"&&_.length>0&&(k=_);let N=d&&d.length>0?`Failed to load ${d}`:"Request failed";Te.open(N,k,v)},O=function(_){return`${p.getState().workspace.current?.path||""}\0${_}`},H=function(){ce&&(ce().catch(()=>{}),ce=null),De=null,Ee=null},Z=function(_){Ue=_;let d=()=>{Ue!==_||p.getState().selected_id!==_||(Ue=null,q(_))};if(!Ie){Le.then(d);return}d()},W=function(_,d,k,v,N){return k!==E[d]?(N().catch(()=>{}),!1):(_.set(v,N),!0)},de=function(){let _=p.getState();Fe(_.view==="board"),it(_.view==="worker"),pe(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id)},Ne=function(){let _=$r(oe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Je=function(){let _=$r(Oe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Fe=function(_){if(_)for(let[d,k]of No){if(ue.has(d)||w.has(d))continue;let v=d===br?Ne():{type:k};try{G.register(d,v)}catch(ye){t("register %s store failed: %o",d,ye)}w.add(d);let N=E.board,J=!1;be.subscribeList(d,v).then(ye=>{J=!W(ue,"board",N,d,ye)}).catch(ye=>{t("subscribe %s failed: %o",d,ye),Ae(ye,"board")}).finally(()=>{w.delete(d),J&&de()})}else rt()},rt=function(){E.board+=1;for(let[_]of No){let d=ue.get(_);d&&(d().catch(()=>{}),ue.delete(_));try{G.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},it=function(_){if(!_){gt();return}for(let[d,k]of ac){if(st.has(d)||w.has(d))continue;let v=d===hr?Je():{type:k};try{G.register(d,v)}catch(ye){t("register %s store failed: %o",d,ye)}w.add(d);let N=E.worker,J=!1;be.subscribeList(d,v).then(ye=>{J=!W(st,"worker",N,d,ye)}).catch(ye=>{t("subscribe %s failed: %o",d,ye),Ae(ye,"worker")}).finally(()=>{w.delete(d),J&&de()})}},gt=function(){E.worker+=1;for(let[_]of ac){let d=st.get(_);d&&(d().catch(()=>{}),st.delete(_));try{G.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},U=function(_){if(!_){V();return}ot||(he("subscribe-worker-queue",{id:lc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),ot=()=>he("unsubscribe-worker-queue",{id:lc}))},V=function(){ot&&(ot().catch(()=>{}),ot=null)},pe=function(_){if(!_){re();return}ae||(he("subscribe-monitor-pipeline",{id:ic}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),ae=()=>he("unsubscribe-monitor-pipeline",{id:ic}))},re=function(){ae&&(ae().catch(()=>{}),ae=null)},Ve=function(){Ce||(he("subscribe-ui-order",{id:cc}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Ce=()=>he("unsubscribe-ui-order",{id:cc}))},nt=function(){Ce&&(Ce().catch(()=>{}),Ce=null),ge.clear()},Ge=function(){xe||(he("subscribe-display-policy",{id:dc}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),xe=()=>he("unsubscribe-display-policy",{id:dc}))},Se=function(){xe&&(xe().catch(()=>{}),xe=null),_e.clear()},bt=function(){dt||(he("subscribe-exec-presets",{id:uc}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),dt=()=>he("unsubscribe-exec-presets",{id:uc}))},Ut=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=Ae,f=O,m=H,h=Z,A=W,$=de,T=Ne,j=Je,x=Fe,Y=rt,ee=it,I=gt,L=U,S=V,z=pe,P=re,ie=Ve,ve=nt,le=Ge,$e=Se,ke=bt,We=Ut;let Ze=document.getElementById("header-loading"),ze=qa(Ze),Te=al(e),me=oc(),he=ze.wrapSend((_,d)=>me.send(_,d)),be=La(he),G=Oa(),K=Ma(),Re=ha(),ge=Da(),_e=ma(),R=ga(),C=ba();me.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&R.set({revision:d.revision,presets:d.presets})}),me.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{Re.set(d.workspaces,d.workspaces_state)}catch{}}),me.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{ge.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),me.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{_e.set(d.policy)}catch{}}),me.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{C.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),me.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{C.append(d.attempt_id,d.event)}catch{}}),me.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="snapshot")try{v.applyPush(d)}catch{}}),me.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="upsert")try{v.applyPush(d)}catch{}}),me.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="delete")try{v.applyPush(d)}catch{}});let ce=null,De=null,Ee=null,Ue=null,Me=()=>{},Le=new Promise(_=>{Me=()=>_(void 0)}),Ie=!1,Qe=!1;async function q(_){let d=O(_);if(d===De||d===Ee)return;Ee=d;let k=`detail:${_}`,v={type:"issue-detail",params:{id:_}};try{G.register(k,v)}catch(N){t("register detail store failed: %o",N)}try{let N=await be.subscribeList(k,v);if(p.getState().selected_id!==_||O(_)!==d){await N().catch(()=>{});return}ce&&await ce().catch(()=>{}),ce=N,De=d}catch(N){t("detail subscribe failed: %o",N),Ae(N,"issue details")}finally{Ee===d&&(Ee=null)}}let ue=new Map,w=new Set,E={board:0,worker:0},oe=St;try{let _=window.localStorage.getItem(pc);Ct(_)&&(oe=_)}catch{}let Oe=St;try{let _=window.localStorage.getItem(Zf);Ct(_)&&(Oe=_)}catch{}async function ut(_){if(!Ct(_)||_===oe)return;oe=_;try{window.localStorage.setItem(pc,_)}catch{}let d=ue.get(br);if(!d)return;ue.delete(br),await d().catch(()=>{});let k=Ne();try{G.register(br,k)}catch(v){t("register %s store failed: %o",br,v)}try{let v=await be.subscribeList(br,k);ue.set(br,v)}catch(v){t("re-subscribe %s failed: %o",br,v),Ae(v,"board")}}async function mt(_){if(!Ct(_)||_===Oe)return;Oe=_;let d=st.get(hr);if(!d)return;st.delete(hr),await d().catch(()=>{});let k=Je();try{G.register(hr,k)}catch(v){t("register %s store failed: %o",hr,v)}try{let v=await be.subscribeList(hr,k);st.set(hr,v)}catch(v){t("re-subscribe %s failed: %o",hr,v),Ae(v,"worker")}}let st=new Map,ot=null,ae=null,Ce=null,xe=null,dt=null;async function or(){xe=null,_e.clear(),dt=null,R.clear(),ot=null,ae=null,ue.clear(),st.clear(),E.board+=1,E.worker+=1,bt();let _=p.getState().workspace.current?.path;if(_)try{await me.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ge();let d=p.getState();Fe(d.view==="board"),it(d.view==="worker"),pe(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Vt(){t("clearing all subscriptions for workspace switch"),rt(),gt(),V(),K.clear(),nt(),Ve(),Se(),Ge(),H();let _=p.getState();if(_.selected_id)try{G.unregister(`detail:${_.selected_id}`)}catch{}let d=p.getState();Fe(d.view==="board"),it(d.view==="worker"),pe(d.view==="monitor"),U(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&Z(d.selected_id)}async function Bt(_){t("requesting workspace switch to %s",_),Qe=!0;try{let d=await me.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(p.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await Vt(),X("Switched to "+Ut(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),X("Failed to switch workspace","error",3e3),d}finally{Qe=!1}}async function pt(_){t("requesting workspace git pull for %s",_);try{let d=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){X("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+Ut(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,v=d?.message;if(k==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let N=v?`: ${v}`:"";throw X(`Git pull failed${N}`,"error",3e3),d}}async function $t(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await me.send("set-workspace-visibility",{path:_,visible:d}),await Lt()}catch(k){t("workspace visibility update failed: %o",k),X("Failed to update project visibility","error",3e3)}}async function Lt(){try{let _=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,v=Array.isArray(_.hidden)?_.hidden.filter(J=>typeof J=="string"):[];p.setState({workspace:{current:k,available:d,hidden:v}});let N=window.localStorage.getItem("beads-ui.workspace");N&&(!d.some(ye=>ye.path===N)||v.includes(N)?window.localStorage.removeItem("beads-ui.workspace"):k&&N!==k.path&&(t("restoring saved workspace preference: %s",N),await Bt(N)))}}catch(_){t("failed to load workspaces: %o",_)}}me.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(p.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Lt(),Vt())});let Ot=!1;if(typeof me.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Ot=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Ot&&(Ot=!1,X("Reconnected","success",2200),Kf(p,(k,v)=>{t(`${k}: %o`,v)}),or())};me.onConnection(_)}let jt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(jt=_)}catch(_){t("view parse error: %o",_)}let p=Fa({config:Vf(),view:jt});me.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=p.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{K.set(d.queue)}catch{}});let y=Na(p);y.start();let F=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ne=async(_,d)=>{try{return await he(_,d)}catch(k){if(F.has(_))throw k;return[]}};n&&Dl(n,p,y);let fe=document.getElementById("workspace-picker");fe&&rc(fe,p,Bt,pt,$t);let we=Fl(e,(_,d)=>he(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>we.open())}catch{}let B=ol(e,{policyStore:_e,transport:(_,d)=>he(_,d),labelOptions:()=>{let _=new Set;for(let[d]of No)for(let k of G.snapshotFor(d)||[]){let v=k.labels;if(Array.isArray(v))for(let N of v)typeof N=="string"&&N.length>0&&_.add(N)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>B.open())}catch{}let b=Va(o,{gotoIssue:_=>y.gotoIssue(_),issueStores:G,transport:ne,workerQueueStore:K,uiOrderStore:ge,displayPolicyStore:_e,closedRange:oe,onClosedRangeChange:_=>{ut(_)},onNewIssue:()=>we.open()}),D=Oo(a,{transport:ne,issueStores:G,queueStore:K,execPresetStore:R,sessionLogStore:C,uiOrderStore:ge,gotoIssue:_=>p.setState({selected_id:_}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Oe,onDoneRangeChange:_=>{mt(_)}}),Q=Ol(i,{transport:ne,pipelineStore:Re,execPresetStore:R,gotoIssue:_=>y.gotoIssue(_),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:_=>Bt(_)}),Pe=nl(c,{issueStores:G,transport:ne,queueStore:K,execPresetStore:R,sessionLogStore:C,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:_=>{p.getState().view==="worker"?p.setState({selected_id:_}):y.gotoIssue(_)},onClose:()=>{let _=p.getState();p.setState({selected_id:null});try{y.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{p.setState({selected_id:null}),y.gotoView("worker"),D.openExecDefaults()}}),Xe=p.getState().selected_id;Xe&&(c.hidden=!1,Pe.load(Xe),Z(Xe)),p.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,Pe.load(d),Qe||Z(d)):(Pe.clear(),c.hidden=!0,H())});let je=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",Fe(_.view==="board"),it(_.view==="worker"),pe(_.view==="monitor"),U(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&b.load(),_.view==="worker"&&D.load(),_.view==="monitor"?Q.load():Q.pause(),window.localStorage.setItem("beads-ui.view",_.view)};p.subscribe(je),je(p.getState()),Ve(),Ge(),bt(),Lt().finally(()=>{Ie=!0,Me()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),v=_.target,N=v&&v.tagName?String(v.tagName).toLowerCase():"",J=N==="input"||N==="textarea"||N==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;d&&k==="n"&&(J||(_.preventDefault(),we.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Xf(t)});export{Xf as bootstrap,Vf as readBootstrapConfig,Kf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
