var Ec=Object.create;var ks=Object.defineProperty;var Cc=Object.getOwnPropertyDescriptor;var Rc=Object.getOwnPropertyNames;var Ic=Object.getPrototypeOf,Lc=Object.prototype.hasOwnProperty;var Oc=(e,t,r)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Dc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rc(t))!Lc.call(e,s)&&s!==r&&ks(e,s,{get:()=>t[s],enumerable:!(n=Cc(t,s))||n.enumerable});return e};var Mc=(e,t,r)=>(r=e!=null?Ec(Ic(e)):{},Dc(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var Je=(e,t,r)=>Oc(e,typeof t!="symbol"?t+"":t,r);var ya=$s((o_,va)=>{var Dr=1e3,Mr=Dr*60,Nr=Mr*60,xr=Nr*24,Bc=xr*7,Uc=xr*365.25;va.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return jc(e);if(r==="number"&&isFinite(e))return t.long?Hc(e):zc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Uc;case"weeks":case"week":case"w":return r*Bc;case"days":case"day":case"d":return r*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function zc(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Dr?Math.round(e/Dr)+"s":e+"ms"}function Hc(e){var t=Math.abs(e);return t>=xr?In(e,t,xr,"day"):t>=Nr?In(e,t,Nr,"hour"):t>=Mr?In(e,t,Mr,"minute"):t>=Dr?In(e,t,Dr,"second"):e+" ms"}function In(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ka=$s((a_,wa)=>{function Wc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=ya(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let h=0;h<f.length;h++)m=(m<<5)-m+f.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,h=null,A,$;function T(...z){if(!T.enabled)return;let x=T,V=Number(new Date),te=V-(m||V);x.diff=te,x.prev=m,x.curr=V,m=V,z[0]=r.coerce(z[0]),typeof z[0]!="string"&&z.unshift("%O");let I=0;z[0]=z[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";I++;let F=r.formatters[H];if(typeof F=="function"){let ie=z[I];S=F.call(x,ie),z.splice(I,1),I--}return S}),r.formatArgs.call(x,z),(x.log||r.log).apply(x,z)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(f)),$),set:z=>{h=z}}),typeof r.init=="function"&&r.init(T),T}function n(f,m){let h=r(this.namespace+(typeof m>"u"?":":m)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,m){let h=0,A=0,$=-1,T=0;for(;h<f.length;)if(A<m.length&&(m[A]===f[h]||m[A]==="*"))m[A]==="*"?($=A,T=h,A++):(h++,A++);else if($!==-1)A=$+1,T++,h=T;else return!1;for(;A<m.length&&m[A]==="*";)A++;return A===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function l(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}wa.exports=Wc});var $a=$s((xt,Ln)=>{xt.formatArgs=Yc;xt.save=Vc;xt.load=Kc;xt.useColors=Gc;xt.storage=Zc();xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Gc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ln.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}xt.log=console.debug||console.log||(()=>{});function Vc(e){try{e?xt.storage.setItem("debug",e):xt.storage.removeItem("debug")}catch{}}function Kc(){let e;try{e=xt.storage.getItem("debug")||xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Zc(){try{return localStorage}catch{}}Ln.exports=ka()(xt);var{formatters:Xc}=Ln.exports;Xc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Kr=globalThis,Rn=Kr.trustedTypes,oa=Rn?Rn.createPolicy("lit-html",{createHTML:e=>e}):void 0,ua="$lit$",lr=`lit$${Math.random().toFixed(9).slice(2)}$`,pa="?"+lr,Nc=`<${pa}>`,wr=document,Zr=()=>wr.createComment(""),Xr=e=>e===null||typeof e!="object"&&typeof e!="function",Rs=Array.isArray,Pc=e=>Rs(e)||typeof e?.[Symbol.iterator]=="function",xs=`[ 	
\f\r]`,Vr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,aa=/-->/g,ia=/>/g,vr=RegExp(`>|${xs}(?:([^\\s"'>=/]+)(${xs}*=${xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),la=/'/g,ca=/"/g,fa=/^(?:script|style|textarea|title)$/i,Is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Is(1),Zt=Is(2),Qf=Is(3),kr=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),da=new WeakMap,yr=wr.createTreeWalker(wr,129);function _a(e,t){if(!Rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oa!==void 0?oa.createHTML(t):t}var Fc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Vr;for(let l=0;l<r;l++){let c=e[l],u,f,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Vr?f[1]==="!--"?a=aa:f[1]!==void 0?a=ia:f[2]!==void 0?(fa.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=vr):f[3]!==void 0&&(a=vr):a===vr?f[0]===">"?(a=s??Vr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?vr:f[3]==='"'?ca:la):a===ca||a===la?a=vr:a===aa||a===ia?a=Vr:(a=vr,s=void 0);let A=a===vr&&e[l+1].startsWith("/>")?" ":"";o+=a===Vr?c+Nc:m>=0?(n.push(u),c.slice(0,m)+ua+c.slice(m)+lr+A):c+lr+(m===-2?l:A)}return[_a(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Qr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Fc(t,r);if(this.el=e.createElement(u,n),yr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ua)){let h=f[a++],A=s.getAttribute(m).split(lr),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?As:$[1]==="?"?Ts:$[1]==="@"?Es:Or}),s.removeAttribute(m)}else m.startsWith(lr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(fa.test(s.tagName)){let m=s.textContent.split(lr),h=m.length-1;if(h>0){s.textContent=Rn?Rn.emptyScript:"";for(let A=0;A<h;A++)s.append(m[A],Zr()),yr.nextNode(),c.push({type:2,index:++o});s.append(m[h],Zr())}}}else if(s.nodeType===8)if(s.data===pa)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(lr,m+1))!==-1;)c.push({type:7,index:o}),m+=lr.length-1}o++}}static createElement(t,r){let n=wr.createElement("template");return n.innerHTML=t,n}};function Lr(e,t,r=e,n){if(t===kr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Lr(e,s._$AS(e,t.values),s,n)),t}var Ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??wr).importNode(r,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Jr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Cs(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=wr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Lr(this,t,r),Xr(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==kr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&Xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(wr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Qr.createElement(_a(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=da.get(t.strings);return r===void 0&&da.set(t.strings,r=new Qr(t)),r}k(t){Rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Zr()),this.O(Zr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Lr(this,t,r,0),a=!Xr(t)||t!==this._$AH&&t!==kr,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Lr(this,l[n+c],r,c),u===kr&&(u=this._$AH[c]),a||(a=!Xr(u)||u!==this._$AH[c]),u===lt?t=lt:t!==lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Ts=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},Es=class extends Or{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Lr(this,t,r,0)??lt)===kr)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Lr(this,t)}};var qc=Kr.litHtmlPolyfillSupport;qc?.(Qr,Jr),(Kr.litHtmlVersions??(Kr.litHtmlVersions=[])).push("3.3.1");var Pe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Jr(t.insertBefore(Zr(),o),o,void 0,r??{})}return s._$AI(e),s};var St="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ct(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ga(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ha(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ba(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var xa=Mc($a(),1);function st(e){return(0,xa.default)(`beads-ui:${e}`)}function Mt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Sr(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ta(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ea(e,t){let r=Mt(e.updated_at),n=Mt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ca(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Mt(e.created_at),o=Mt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Ra(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Qc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Sa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Aa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Qc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ia(e,t){let r=Sa(e),n=Sa(t);if(r!==n)return r<n?-1:1;let s=Aa(e),o=Aa(t);if(s!==o)return s<o?-1:1;let a=Mt(e&&e.created_at),l=Mt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ls=2**20;function Pr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Mt(e&&e.created_at)}function On(e){return(t,r)=>{let n=Pr(t,e),s=Pr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:Pr(l,r)-Ls};if(!l)return{rank:Pr(a,r)+Ls};let c=Pr(a,r),u=Pr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Ls}))}}function Ds(e,t={}){let r=st(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Sr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function m(h){if(l||!h||h.id!==e)return;let A=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,A),!(A<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let T of $)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=A,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let T=n.get($.id);if(!T)n.set($.id,$);else{let z=Number.isFinite(T.updated_at)?T.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(z<=x){for(let V of Object.keys(T))V in $||delete T[V];for(let[V,te]of Object.entries($))T[V]=te}}f()}o=A,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=A,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Dn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function La(e){let t=st("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(u)){let $=r.get(A);if(!$)continue;let T=$.itemsById;for(let z of f)typeof z=="string"&&z.length>0&&T.set(z,!0);for(let z of m)typeof z=="string"&&z.length>0&&T.set(z,!0);for(let z of h)typeof z=="string"&&z.length>0&&T.delete(z)}}async function o(l,c){let u=Dn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let h=r.get(l)||null;if(h){let A=n.get(h.key);A&&(A.delete(l),A.size===0&&n.delete(h.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Dn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Oa(){let e=st("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let m=u?Dn(u):"",h=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),A&&h&&m&&h!==m){let $=t.get(c);if($)try{$.dispose()}catch{}let T=s.get(c);if(T){try{T()}catch{}s.delete(c)}let z=Ds(c,f);t.set(c,z);let x=z.subscribe(()=>o());s.set(c,x)}else if(!A){let $=Ds(c,f);t.set(c,$);let T=$.subscribe(()=>o());s.set(c,T)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Da(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ms(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Jc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ed(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Na(e){let t=st("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jc(n),a=ed(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ms(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ms(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var td=Object.freeze({workspace_config:{default_workspace:null}});function Pa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:td.workspace_config.default_workspace}}}function Fa(e={}){let t=st("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Pa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Pa(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function qa(e){let t=st("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(m,h)=>{let A=s++,$=Date.now();n.set(A,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",A,m,r+1),a();let T=!1,z=()=>{T||(T=!0,n.delete(A),l())},x=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,m,Date.now()-$),z())},3e4);try{let V=await u(m,h),te=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,m,te),V}catch(V){let te=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,m,te,V),V}finally{clearTimeout(x),z()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function Q(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Mn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Ra),c;switch(l){case"created_desc":return c.sort(Sr),c;case"created_asc":return c.sort(Ta),c;case"updated_desc":return c.sort(Ea),c;case"priority":return c.sort(Ca),c;case"manual":default:{let u=r();return u?c.sort(On(u)):c.sort(Sr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ft(e){let t=Xt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function At(e,t){let r=Xt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Nn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Pn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Os(l,c,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let A=n(Os(l,c,h.order),a);s(h,A);let $=await t("ui-order-set",{expected_revision:h.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Fn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ns(e,t){return!t||typeof e!="string"||e.length===0||Fn(t.visible_labels).includes(e)?!0:Fn(t.hidden_labels).includes(e)?!1:!Fn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function qn(e,t){return Fn(e).filter(r=>Ns(r,t))}function cr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var rd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ua={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ba={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nd={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function sd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ja(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function od(e){if(!e||e.fill==="none"||!e.approval_state)return ja(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ad(e,t,r){let n=rd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=nd[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Ua[e]||e}
      </div>
    </div>
  `}function Bn(e,t){if(!e||!e.stages)return"";let r=Ba[e.route]||Ba.spec_backed,n=e.stages,s=sd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ua[a]||a} ${a==="plan"?od(n[a]||{}):ja(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ad(a,n[a]||{},a===s))}
    </div>
  `}function id(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var za=2;function ld(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,za).join(", "),s=r.length-za,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function cd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&cr(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&cr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&cr(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of qn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&cr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(r,"blocked")&&s.push(...ld(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function dd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ud(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function pd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ia):r.children;return i`
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
        ${ud(e)}
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
                  <span class=${dd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Un(e,t){let r=id(e.priority);return i`
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
      ${cd(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?Bn(e.workflow,e.status):""}
      ${pd(e,t)}
    </article>
  `}function Fr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
        ${e.items.map(o=>Un(o,t))}
      </div>
    </section>
  `}function Ha(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Un(n,t))}
        </div>
      </div>
    </dialog>
  `}var fd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_d=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],md=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Wa(e,t,r){return i`
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
        ${fd.map(n=>i`<option
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
        ${_d.map(n=>i`<option
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
        ${md.map(n=>i`<option
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
  `}var hd=200,bd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},vd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ga="beads-ui.board.sort",Ya=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function yd(){try{let e=window.localStorage.getItem(Ga);if(e&&Ya.has(e))return e}catch{}return"created_desc"}function Va(e,t){let r=st("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||St,h=s?Mn(s,a):null,A=Pn({transport:o,uiOrderStore:a}),$=[],T=[],z=[],x=[],V=[],te=[],I=!1,D=0,S=yd(),H=new Map,F=new Map,ie=new Map,ge=new Set,ce={search:"",priority:"",type:"",labels:[]},$e=!1,ve=null;function Ue(j){return String(j.status||"open")==="open"}function Ge(j){let K=String(j.status||"open");return K==="open"||K==="blocked"}function Fe(j){let K=ce.search.trim().toLowerCase(),ae=ce.priority,de=ce.type,ne=ce.labels;return j.filter(Re=>{if(K){let Ye=String(Re.id||"").toLowerCase(),tt=String(Re.title||"").toLowerCase();if(!Ye.includes(K)&&!tt.includes(K))return!1}if(ae!==""&&String(Re.priority)!==ae||de!==""&&String(Re.issue_type||"")!==de)return!1;if(ne.length>0){let Ye=Array.isArray(Re.labels)?Re.labels:[];if(!ne.some(tt=>Ye.includes(tt)))return!1}return!0})}function Ee(){let j=new Set;for(let K of[$,T,z,x,V,te])for(let ae of K){let de=Array.isArray(ae.labels)?ae.labels:[];for(let ne of de)typeof ne=="string"&&ne.length>0&&j.add(ne)}return Array.from(j).sort()}function ye(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function _e(){try{if(h){let j=h.selectBoardColumn("tab:board:in-progress","in_progress",S),K=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ge),ae=new Set(j.map(Te=>Te.id)),de=h.selectBoardColumn("tab:board:ready","ready",S).filter(Te=>Ue(Te)&&!ae.has(Te.id)),ne=h.selectBoardColumn("tab:board:resolved","resolved",S),Re=h.selectBoardColumn("tab:board:deferred","deferred",S),Ye=h.selectBoardColumn("tab:board:closed","closed").slice(0,hd),tt=[...K,...de,...j,...ne,...Ye];ke(tt);let Ae=new Set;for(let Te of tt)Te&&Te.id&&!Ps(Te)&&Ae.add(Te.id);let He=!ye();$=He?en(K,Ae):K,T=He?en(de,Ae):de,z=He?en(j,Ae):j,x=He?en(ne,Ae):ne,V=Re,D=Re.length,te=He?en(Ye,Ae):Ye,H=new Map;for(let Te of $)H.set(Te.id,"open");for(let Te of T)H.set(Te.id,"open");for(let Te of z)H.set(Te.id,"in_progress");for(let Te of x)H.set(Te.id,"resolved");for(let Te of V)H.set(Te.id,"deferred");for(let Te of te)H.set(Te.id,"closed");F=new Map;for(let Te of $)F.set(Te.id,"blocked-col");for(let Te of T)F.set(Te.id,"ready-col");for(let Te of z)F.set(Te.id,"in-progress-col");for(let Te of x)F.set(Te.id,"resolved-col");for(let Te of te)F.set(Te.id,"closed-col")}Oe()}catch{$=[],T=[],z=[],x=[],V=[],te=[],ie=new Map,Oe()}}function ke(j){let K=new Map;for(let de of j)de&&de.id&&!K.has(de.id)&&K.set(de.id,de);let ae=new Map;for(let de of K.values()){let ne=Ps(de);if(!ne)continue;let Re=ae.get(ne);Re||(Re=[],ae.set(ne,Re)),Re.push({id:de.id,title:de.title,status:de.status,metadata:de.metadata,created_at:de.created_at,updated_at:de.updated_at})}ie=ae}function me(j){let K=ie.get(j)||[],ae=0;for(let ne of K)(ne.status==="resolved"||ne.status==="closed")&&(ae+=1);let de=Nn(K);return{total:K.length,count:ae,current:de,children:K}}function Y(j){return!ge.has(j)}function Z(j,K){j.preventDefault(),j.stopPropagation(),ge.has(K)?ge.delete(K):ge.add(K),Oe()}function Ce(j,K){j.preventDefault(),j.stopPropagation(),n(K)}function pe(j,K){j.preventDefault(),j.stopPropagation(),n(K)}function fe(j,K){ve||n(K)}function R(j,K){j.preventDefault(),j.stopPropagation(),wd(K).then(ae=>{ae&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function E(j,K){ve=K,j.dataTransfer&&(j.dataTransfer.setData("text/plain",K),j.dataTransfer.effectAllowed="move"),j.target.classList.add("board-card--dragging")}function le(j){j.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{ve=null},0)}function qe(j){let K=String(j.target.value||"");!K||K===m||(m=K,u&&u(K),Oe())}function Ie(){return l?l.get():null}function we(j){let K=c?c.get():null,ae=K?K.cleanup_failed:null;if(!ae||typeof ae!="object"||Array.isArray(ae))return null;let de=ae[j];return!de||typeof de!="object"||Array.isArray(de)?null:de}let xe={onCardClick:fe,onCopyId:R,onDragStart:E,onDragEnd:le,onClosedRangeChange:qe,rollupFor:me,isExpanded:Y,onRollupToggle:Z,onChildClick:Ce,onFromChipClick:pe,cleanupFailureFor:we,get policy(){return Ie()}};function Ke(j,K){ve||(G(),n(K))}function Ne(j,K){j.preventDefault(),j.stopPropagation(),G(),n(K)}let Xe={...xe,onCardClick:Ke,onChildClick:Ne,onFromChipClick:Ne,get policy(){return Ie()}};function L(j){let K=j.target,ae=e.querySelector(".board-filter__labels");K&&ae&&ae.contains(K)||w()}function W(j){j.key==="Escape"&&w()}function B(){$e||($e=!0,document.addEventListener("mousedown",L),document.addEventListener("keydown",W),Oe())}function w(){$e&&($e=!1,document.removeEventListener("mousedown",L),document.removeEventListener("keydown",W),Oe())}function C(j){j.key==="Escape"&&G()}function N(){I||(I=!0,document.addEventListener("keydown",C),Oe())}function G(){I&&(I=!1,document.removeEventListener("keydown",C),Oe())}let X={onClose:G,onOverlayClick(j){j.target===j.currentTarget&&G()}},Le={onSearchInput(j){ce.search=String(j.target.value||""),_e()},onPriorityChange(j){ce.priority=String(j.target.value||""),_e()},onTypeChange(j){ce.type=String(j.target.value||""),_e()},onSortChange(j){let K=String(j.target.value||"");if(!(!Ya.has(K)||K===S)){S=K;try{window.localStorage.setItem(Ga,K)}catch{}_e()}},onDeferredToggle(){I?G():N()},onLabelMenuToggle(){$e?w():B()},onLabelToggle(j){let K=ce.labels.indexOf(j);K===-1?ce.labels.push(j):ce.labels.splice(K,1),_e()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],_e())},onNewIssue(){f&&f()}};function Se(){return i`
      <div class="board-view">
        ${Wa(ce,Le,{sort_mode:S,deferred_popup_open:I,deferred_count:D,label_options:Ee(),label_menu_open:$e})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:Fe($)},xe)}
          ${Fr({title:"Ready",id:"ready-col",items:Fe(T)},xe)}
          ${Fr({title:"In progress",id:"in-progress-col",items:Fe(z)},xe)}
          ${Fr({title:"Resolved",id:"resolved-col",items:Fe(x)},xe)}
          ${Fr({title:"Closed",id:"closed-col",items:Fe(te),is_closed:!0,closed_range:m},xe)}
        </div>
        ${I?Ha({items:Fe(V),count:D},Xe,X):""}
      </div>
    `}function Oe(){Pe(Se(),e),ze()}function ze(){try{let j=e.querySelector("#deferred-popup");j&&!j.open&&(typeof j.showModal=="function"?j.showModal():j.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ae of K)Array.from(ae.querySelectorAll(".board-card")).forEach((ne,Re)=>{ne.tabIndex=Re===0?0:-1})}catch{}}async function ot(j,K){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:j,status:K}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ae){r("update-status failed: %o",ae),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(j){switch(j){case"blocked-col":return $;case"ready-col":return T;case"in-progress-col":return z;case"resolved-col":return x;default:return[]}}function ut(j,K,ae){if(!o||!a)return;let de=et(j),ne=de.find(He=>He.id===K);if(!ne)return;let Re=de.filter(He=>He.id!==K),Ye=ae.closest?ae.closest(".board-card"):null,tt=Re.length;if(Ye){let He=Ye.getAttribute("data-issue-id");if(He===K)return;let Te=Re.findIndex(dt=>dt.id===He);Te>=0&&(tt=Te)}let Ae=Re.slice();Ae.splice(tt,0,ne),A.applyReorder(K,Ae,tt)}function kt(){for(let j of Array.from(e.querySelectorAll(".board-column--drag-over")))j.classList.remove("board-column--drag-over")}let nt=null;e.addEventListener("dragover",j=>{j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let ae=j.target.closest(".board-column");ae&&ae!==nt&&(nt&&nt.classList.remove("board-column--drag-over"),ae.classList.add("board-column--drag-over"),nt=ae)}),e.addEventListener("dragleave",j=>{let K=j.relatedTarget;(!K||!e.contains(K))&&nt&&(nt.classList.remove("board-column--drag-over"),nt=null)}),e.addEventListener("drop",j=>{j.preventDefault(),nt&&(nt.classList.remove("board-column--drag-over"),nt=null);let K=j.target,ae=K.closest(".board-column");if(!ae)return;let de=j.dataTransfer?.getData("text/plain")||"";if(!de)return;let ne=ae.id,Re=F.get(de);if(Re&&Re===ne){if(vd.has(ne)){if(S!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(ne,de,K)}return}let Ye=bd[ne];if(!Ye){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(de)!==Ye&&ot(de,Ye)}),e.addEventListener("keydown",j=>{let K=j.target;if(!(K instanceof HTMLElement))return;let ae=String(K.tagName||"").toLowerCase();if(ae==="input"||ae==="textarea"||ae==="select"||ae==="button"||ae==="a"||K.isContentEditable===!0)return;let de=K.closest(".board-card");if(!de)return;let ne=String(j.key||"");if(ne==="Enter"||ne===" "){j.preventDefault();let Ae=de.getAttribute("data-issue-id");Ae&&n(Ae);return}if(ne!=="ArrowUp"&&ne!=="ArrowDown"&&ne!=="ArrowLeft"&&ne!=="ArrowRight")return;j.preventDefault();let Re=de.closest(".board-column");if(!Re)return;let Ye=Array.from(Re.querySelectorAll(".board-card")),tt=Ye.indexOf(de);if(ne==="ArrowDown"&&tt<Ye.length-1){at(de,Ye[tt+1]);return}if(ne==="ArrowUp"&&tt>0){at(de,Ye[tt-1]);return}if(ne==="ArrowLeft"||ne==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),He=Ae.indexOf(Re),Te=ne==="ArrowRight"?1:-1,dt=He+Te;for(;dt>=0&&dt<Ae.length;){let ht=Ae[dt].querySelector(".board-card");if(ht){at(de,ht);return}dt+=Te}}});function at(j,K){try{j.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let rt=null;h&&h.subscribe&&(rt=h.subscribe(()=>{try{_e()}catch{}}));let it=null;l&&l.subscribe&&(it=l.subscribe(()=>{try{_e()}catch{}}));let mt=null;return c&&c.subscribe&&(mt=c.subscribe(()=>{Oe()})),{async load(){r("load"),_e()},clear(){w(),G(),rt&&(rt(),rt=null),it&&(it(),it=null),mt&&(mt(),mt=null),e.replaceChildren(),$=[],T=[],z=[],x=[],V=[],te=[],H=new Map,F=new Map}}}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function en(e,t){return e.filter(r=>{let n=Ps(r);return!(n&&t.has(n))})}async function wd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ar(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ur(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function kd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Qt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await kd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ja="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],tn=[...Jt,"reasoning_output_tokens"],$d=["implementation","review-consult"];function Fs(e){let t=0;for(let r of Jt)t+=_t(e?.[r]);return t}function xd(e){return!e||typeof e!="object"?!1:Jt.some(t=>Number.isFinite(e[t]))}function Ka(e){return!e||typeof e!="object"?!1:tn.some(t=>Number.isFinite(e[t]))}function Sd(e){let t={};for(let r of tn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Za(e){let t={};for(let r of tn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Xa(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Fs(t)}function Ad(e){return e==="claude"?"Claude":"Codex"}function Td(e){return`\u03C4 ${ei(e)}`}function Ed(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ja),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ad(r)} ${Td(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ed(r,n)})}return t}function zn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of tn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=_t(l.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qs(e){return!e||typeof e!="object"?null:Rt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cd(e){return e==="codex"?"codex":"claude"}function pr(){return{subtotal:0,breakdown:Sd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function jn(e,t,r){e.subtotal+=t.subtotal;for(let n of tn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Qa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ei(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function qr(e){return xd(e)?`\u03C4 ${ei(Fs(e))}`:null}function Nt(e){let t=qr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Br(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Fs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ja),r.join(`
`)}function Rt(e,t){let r={claude:pr(),codex:pr()},n={orchestrator:{claude:pr(),codex:pr()},implementation:{claude:pr(),codex:pr()},"review-consult":{claude:pr(),codex:pr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Ka(c)){let f=Cd(l.runner),m=Za(c),h={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Xa(f,m)};m.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),jn(r[f],h,!0),jn(n.orchestrator[f],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!$d.includes(f.role)||!Ka(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=Za(f.usage),A={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:Xa("codex",h)};A.receipt_id=m,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),h.replayed===!0&&(A.replayed=!0),jn(r.codex,A,!1),jn(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Qa(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...Qa(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:ci,setPrototypeOf:ti,isFrozen:Rd,getPrototypeOf:Id,getOwnPropertyDescriptor:Ld}=Object,{freeze:vt,seal:It,create:Gs}=Object,{apply:Ys,construct:Vs}=typeof Reflect<"u"&&Reflect;vt||(vt=function(t){return t});It||(It=function(t){return t});Ys||(Ys=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Vs||(Vs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Hn=yt(Array.prototype.forEach),Od=yt(Array.prototype.lastIndexOf),ri=yt(Array.prototype.pop),rn=yt(Array.prototype.push),Dd=yt(Array.prototype.splice),Gn=yt(String.prototype.toLowerCase),Bs=yt(String.prototype.toString),Us=yt(String.prototype.match),nn=yt(String.prototype.replace),Md=yt(String.prototype.indexOf),Nd=yt(String.prototype.trim),Pt=yt(Object.prototype.hasOwnProperty),bt=yt(RegExp.prototype.test),sn=Pd(TypeError);function yt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ys(e,t,n)}}function Pd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Vs(e,r)}}function Me(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gn;ti&&ti(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Rd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Fd(e){for(let t=0;t<e.length;t++)Pt(e,t)||(e[t]=null);return e}function er(e){let t=Gs(null);for(let[r,n]of ci(e))Pt(e,r)&&(Array.isArray(n)?t[r]=Fd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=er(n):t[r]=n);return t}function on(e,t){for(;e!==null;){let n=Ld(e,t);if(n){if(n.get)return yt(n.get);if(typeof n.value=="function")return yt(n.value)}e=Id(e)}function r(){return null}return r}var ni=vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),js=vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zs=vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qd=vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bd=vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),si=vt(["#text"]),oi=vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ws=vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ai=vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wn=vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ud=It(/\{\{[\w\W]*|[\w\W]*\}\}/gm),jd=It(/<%[\w\W]*|[\w\W]*%>/gm),zd=It(/\$\{[\w\W]*/gm),Hd=It(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wd=It(/^aria-[\-\w]+$/),di=It(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gd=It(/^(?:\w+script|data):/i),Yd=It(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ui=It(/^html$/i),Vd=It(/^[a-z][.\w]*(-[.\w]+)+$/i),ii=Object.freeze({__proto__:null,ARIA_ATTR:Wd,ATTR_WHITESPACE:Yd,CUSTOM_ELEMENT:Vd,DATA_ATTR:Hd,DOCTYPE_NAME:ui,ERB_EXPR:jd,IS_ALLOWED_URI:di,IS_SCRIPT_OR_DATA:Gd,MUSTACHE_EXPR:Ud,TMPLIT_EXPR:zd}),an={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Kd=function(){return typeof window>"u"?null:window},Zd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},li=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function pi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Kd(),t=U=>pi(U);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==an.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:A}=e,$=c.prototype,T=on($,"cloneNode"),z=on($,"remove"),x=on($,"nextSibling"),V=on($,"childNodes"),te=on($,"parentNode");if(typeof a=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let I,D="",{implementation:S,createNodeIterator:H,createDocumentFragment:F,getElementsByTagName:ie}=r,{importNode:ge}=n,ce=li();t.isSupported=typeof ci=="function"&&typeof te=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:$e,ERB_EXPR:ve,TMPLIT_EXPR:Ue,DATA_ATTR:Ge,ARIA_ATTR:Fe,IS_SCRIPT_OR_DATA:Ee,ATTR_WHITESPACE:ye,CUSTOM_ELEMENT:_e}=ii,{IS_ALLOWED_URI:ke}=ii,me=null,Y=Me({},[...ni,...js,...zs,...Hs,...si]),Z=null,Ce=Me({},[...oi,...Ws,...ai,...Wn]),pe=Object.seal(Gs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fe=null,R=null,E=Object.seal(Gs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),le=!0,qe=!0,Ie=!1,we=!0,xe=!1,Ke=!0,Ne=!1,Xe=!1,L=!1,W=!1,B=!1,w=!1,C=!0,N=!1,G="user-content-",X=!0,Le=!1,Se={},Oe=null,ze=Me({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ot=null,et=Me({},["audio","video","img","source","image","track"]),ut=null,kt=Me({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",rt="http://www.w3.org/1999/xhtml",it=rt,mt=!1,j=null,K=Me({},[nt,at,rt],Bs),ae=Me({},["mi","mo","mn","ms","mtext"]),de=Me({},["annotation-xml"]),ne=Me({},["title","style","font","a","script"]),Re=null,Ye=["application/xhtml+xml","text/html"],tt="text/html",Ae=null,He=null,Te=r.createElement("form"),dt=function(b){return b instanceof RegExp||b instanceof Function},ht=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(He&&He===b)){if((!b||typeof b!="object")&&(b={}),b=er(b),Re=Ye.indexOf(b.PARSER_MEDIA_TYPE)===-1?tt:b.PARSER_MEDIA_TYPE,Ae=Re==="application/xhtml+xml"?Bs:Gn,me=Pt(b,"ALLOWED_TAGS")?Me({},b.ALLOWED_TAGS,Ae):Y,Z=Pt(b,"ALLOWED_ATTR")?Me({},b.ALLOWED_ATTR,Ae):Ce,j=Pt(b,"ALLOWED_NAMESPACES")?Me({},b.ALLOWED_NAMESPACES,Bs):K,ut=Pt(b,"ADD_URI_SAFE_ATTR")?Me(er(kt),b.ADD_URI_SAFE_ATTR,Ae):kt,ot=Pt(b,"ADD_DATA_URI_TAGS")?Me(er(et),b.ADD_DATA_URI_TAGS,Ae):et,Oe=Pt(b,"FORBID_CONTENTS")?Me({},b.FORBID_CONTENTS,Ae):ze,fe=Pt(b,"FORBID_TAGS")?Me({},b.FORBID_TAGS,Ae):er({}),R=Pt(b,"FORBID_ATTR")?Me({},b.FORBID_ATTR,Ae):er({}),Se=Pt(b,"USE_PROFILES")?b.USE_PROFILES:!1,le=b.ALLOW_ARIA_ATTR!==!1,qe=b.ALLOW_DATA_ATTR!==!1,Ie=b.ALLOW_UNKNOWN_PROTOCOLS||!1,we=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=b.SAFE_FOR_TEMPLATES||!1,Ke=b.SAFE_FOR_XML!==!1,Ne=b.WHOLE_DOCUMENT||!1,W=b.RETURN_DOM||!1,B=b.RETURN_DOM_FRAGMENT||!1,w=b.RETURN_TRUSTED_TYPE||!1,L=b.FORCE_BODY||!1,C=b.SANITIZE_DOM!==!1,N=b.SANITIZE_NAMED_PROPS||!1,X=b.KEEP_CONTENT!==!1,Le=b.IN_PLACE||!1,ke=b.ALLOWED_URI_REGEXP||di,it=b.NAMESPACE||rt,ae=b.MATHML_TEXT_INTEGRATION_POINTS||ae,de=b.HTML_INTEGRATION_POINTS||de,pe=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&dt(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&dt(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(qe=!1),B&&(W=!0),Se&&(me=Me({},si),Z=[],Se.html===!0&&(Me(me,ni),Me(Z,oi)),Se.svg===!0&&(Me(me,js),Me(Z,Ws),Me(Z,Wn)),Se.svgFilters===!0&&(Me(me,zs),Me(Z,Ws),Me(Z,Wn)),Se.mathMl===!0&&(Me(me,Hs),Me(Z,ai),Me(Z,Wn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?E.tagCheck=b.ADD_TAGS:(me===Y&&(me=er(me)),Me(me,b.ADD_TAGS,Ae))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?E.attributeCheck=b.ADD_ATTR:(Z===Ce&&(Z=er(Z)),Me(Z,b.ADD_ATTR,Ae))),b.ADD_URI_SAFE_ATTR&&Me(ut,b.ADD_URI_SAFE_ATTR,Ae),b.FORBID_CONTENTS&&(Oe===ze&&(Oe=er(Oe)),Me(Oe,b.FORBID_CONTENTS,Ae)),X&&(me["#text"]=!0),Ne&&Me(me,["html","head","body"]),me.table&&(Me(me,["tbody"]),delete fe.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=b.TRUSTED_TYPES_POLICY,D=I.createHTML("")}else I===void 0&&(I=Zd(A,s)),I!==null&&typeof D=="string"&&(D=I.createHTML(""));vt&&vt(b),He=b}},or=Me({},[...js,...zs,...qd]),Vt=Me({},[...Hs,...Bd]),Bt=function(b){let O=te(b);(!O||!O.tagName)&&(O={namespaceURI:it,tagName:"template"});let J=Gn(b.tagName),De=Gn(O.tagName);return j[b.namespaceURI]?b.namespaceURI===at?O.namespaceURI===rt?J==="svg":O.namespaceURI===nt?J==="svg"&&(De==="annotation-xml"||ae[De]):!!or[J]:b.namespaceURI===nt?O.namespaceURI===rt?J==="math":O.namespaceURI===at?J==="math"&&de[De]:!!Vt[J]:b.namespaceURI===rt?O.namespaceURI===at&&!de[De]||O.namespaceURI===nt&&!ae[De]?!1:!Vt[J]&&(ne[J]||!or[J]):!!(Re==="application/xhtml+xml"&&j[b.namespaceURI]):!1},pt=function(b){rn(t.removed,{element:b});try{te(b).removeChild(b)}catch{z(b)}},$t=function(b,O){try{rn(t.removed,{attribute:O.getAttributeNode(b),from:O})}catch{rn(t.removed,{attribute:null,from:O})}if(O.removeAttribute(b),b==="is")if(W||B)try{pt(O)}catch{}else try{O.setAttribute(b,"")}catch{}},Ut=function(b){let O=null,J=null;if(L)b="<remove></remove>"+b;else{let Be=Us(b,/^[\r\n\t ]+/);J=Be&&Be[0]}Re==="application/xhtml+xml"&&it===rt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let De=I?I.createHTML(b):b;if(it===rt)try{O=new h().parseFromString(De,Re)}catch{}if(!O||!O.documentElement){O=S.createDocument(it,"template",null);try{O.documentElement.innerHTML=mt?D:De}catch{}}let Ze=O.body||O.documentElement;return b&&J&&Ze.insertBefore(r.createTextNode(J),Ze.childNodes[0]||null),it===rt?ie.call(O,Ne?"html":"body")[0]:Ne?O.documentElement:Ze},Lt=function(b){return H.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ot=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},jt=function(b){return typeof l=="function"&&b instanceof l};function p(U,b,O){Hn(U,J=>{J.call(t,b,O,He)})}let y=function(b){let O=null;if(p(ce.beforeSanitizeElements,b,null),Ot(b))return pt(b),!0;let J=Ae(b.nodeName);if(p(ce.uponSanitizeElement,b,{tagName:J,allowedTags:me}),Ke&&b.hasChildNodes()&&!jt(b.firstElementChild)&&bt(/<[/\w!]/g,b.innerHTML)&&bt(/<[/\w!]/g,b.textContent)||b.nodeType===an.progressingInstruction||Ke&&b.nodeType===an.comment&&bt(/<[/\w]/g,b.data))return pt(b),!0;if(!(E.tagCheck instanceof Function&&E.tagCheck(J))&&(!me[J]||fe[J])){if(!fe[J]&&se(J)&&(pe.tagNameCheck instanceof RegExp&&bt(pe.tagNameCheck,J)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(J)))return!1;if(X&&!Oe[J]){let De=te(b)||b.parentNode,Ze=V(b)||b.childNodes;if(Ze&&De){let Be=Ze.length;for(let _=Be-1;_>=0;--_){let d=T(Ze[_],!0);d.__removalCount=(b.__removalCount||0)+1,De.insertBefore(d,x(b))}}}return pt(b),!0}return b instanceof c&&!Bt(b)||(J==="noscript"||J==="noembed"||J==="noframes")&&bt(/<\/no(script|embed|frames)/i,b.innerHTML)?(pt(b),!0):(xe&&b.nodeType===an.text&&(O=b.textContent,Hn([$e,ve,Ue],De=>{O=nn(O,De," ")}),b.textContent!==O&&(rn(t.removed,{element:b.cloneNode()}),b.textContent=O)),p(ce.afterSanitizeElements,b,null),!1)},q=function(b,O,J){if(C&&(O==="id"||O==="name")&&(J in r||J in Te))return!1;if(!(qe&&!R[O]&&bt(Ge,O))){if(!(le&&bt(Fe,O))){if(!(E.attributeCheck instanceof Function&&E.attributeCheck(O,b))){if(!Z[O]||R[O]){if(!(se(b)&&(pe.tagNameCheck instanceof RegExp&&bt(pe.tagNameCheck,b)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(b))&&(pe.attributeNameCheck instanceof RegExp&&bt(pe.attributeNameCheck,O)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(O,b))||O==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&bt(pe.tagNameCheck,J)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(J))))return!1}else if(!ut[O]){if(!bt(ke,nn(J,ye,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&b!=="script"&&Md(J,"data:")===0&&ot[b])){if(!(Ie&&!bt(Ee,nn(J,ye,"")))){if(J)return!1}}}}}}}return!0},se=function(b){return b!=="annotation-xml"&&Us(b,_e)},ue=function(b){p(ce.beforeSanitizeAttributes,b,null);let{attributes:O}=b;if(!O||Ot(b))return;let J={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0},De=O.length;for(;De--;){let Ze=O[De],{name:Be,namespaceURI:_,value:d}=Ze,k=Ae(Be),v=d,P=Be==="value"?v:Nd(v);if(J.attrName=k,J.attrValue=P,J.keepAttr=!0,J.forceKeepAttr=void 0,p(ce.uponSanitizeAttribute,b,J),P=J.attrValue,N&&(k==="id"||k==="name")&&($t(Be,b),P=G+P),Ke&&bt(/((--!?|])>)|<\/(style|title|textarea)/i,P)){$t(Be,b);continue}if(k==="attributename"&&Us(P,"href")){$t(Be,b);continue}if(J.forceKeepAttr)continue;if(!J.keepAttr){$t(Be,b);continue}if(!we&&bt(/\/>/i,P)){$t(Be,b);continue}xe&&Hn([$e,ve,Ue],he=>{P=nn(P,he," ")});let ee=Ae(b.nodeName);if(!q(ee,k,P)){$t(Be,b);continue}if(I&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!_)switch(A.getAttributeType(ee,k)){case"TrustedHTML":{P=I.createHTML(P);break}case"TrustedScriptURL":{P=I.createScriptURL(P);break}}if(P!==v)try{_?b.setAttributeNS(_,Be,P):b.setAttribute(Be,P),Ot(b)?pt(b):ri(t.removed)}catch{$t(Be,b)}}p(ce.afterSanitizeAttributes,b,null)},be=function U(b){let O=null,J=Lt(b);for(p(ce.beforeSanitizeShadowDOM,b,null);O=J.nextNode();)p(ce.uponSanitizeShadowNode,O,null),y(O),ue(O),O.content instanceof o&&U(O.content);p(ce.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(U){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,J=null,De=null,Ze=null;if(mt=!U,mt&&(U="<!-->"),typeof U!="string"&&!jt(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw sn("dirty is not a string, aborting")}else throw sn("toString is not a function");if(!t.isSupported)return U;if(Xe||ht(b),t.removed=[],typeof U=="string"&&(Le=!1),Le){if(U.nodeName){let d=Ae(U.nodeName);if(!me[d]||fe[d])throw sn("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)O=Ut("<!---->"),J=O.ownerDocument.importNode(U,!0),J.nodeType===an.element&&J.nodeName==="BODY"||J.nodeName==="HTML"?O=J:O.appendChild(J);else{if(!W&&!xe&&!Ne&&U.indexOf("<")===-1)return I&&w?I.createHTML(U):U;if(O=Ut(U),!O)return W?null:w?D:""}O&&L&&pt(O.firstChild);let Be=Lt(Le?U:O);for(;De=Be.nextNode();)y(De),ue(De),De.content instanceof o&&be(De.content);if(Le)return U;if(W){if(B)for(Ze=F.call(O.ownerDocument);O.firstChild;)Ze.appendChild(O.firstChild);else Ze=O;return(Z.shadowroot||Z.shadowrootmode)&&(Ze=ge.call(n,Ze,!0)),Ze}let _=Ne?O.outerHTML:O.innerHTML;return Ne&&me["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&bt(ui,O.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+_),xe&&Hn([$e,ve,Ue],d=>{_=nn(_,d," ")}),I&&w?I.createHTML(_):_},t.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(U),Xe=!0},t.clearConfig=function(){He=null,Xe=!1},t.isValidAttribute=function(U,b,O){He||ht({});let J=Ae(U),De=Ae(b);return q(J,De,O)},t.addHook=function(U,b){typeof b=="function"&&rn(ce[U],b)},t.removeHook=function(U,b){if(b!==void 0){let O=Od(ce[U],b);return O===-1?void 0:Dd(ce[U],O,1)[0]}return ri(ce[U])},t.removeHooks=function(U){ce[U]=[]},t.removeAllHooks=function(){ce=li()},t}var fi=pi();var _i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},mi=e=>(...t)=>({_$litDirective$:e,values:t}),Yn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var ln=class extends Yn{constructor(t){if(super(t),this.it=lt,t.type!==_i.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===kr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ln.directiveName="unsafeHTML",ln.resultType=1;var gi=mi(ln);function Qs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Er=Qs();function $i(e){Er=e}var pn={exec:()=>null};function je(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(wt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Xd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),wt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qd=/^(?:[ \t]*(?:\n|$))+/,Jd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,eu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,tu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Js=/(?:[*+-]|\d{1,9}[.)])/,xi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Si=je(xi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ru=je(xi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nu=/^[^\n]+/,to=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,su=je(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",to).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ou=je(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Js).getRegex(),Jn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,au=je("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ro).replace("tag",Jn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ai=je(eo).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex(),iu=je(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ai).getRegex(),no={blockquote:iu,code:Jd,def:su,fences:eu,heading:tu,hr:fn,html:au,lheading:Si,list:ou,newline:Qd,paragraph:Ai,table:pn,text:nu},hi=je("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex(),lu={...no,lheading:ru,table:hi,paragraph:je(eo).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",hi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jn).getRegex()},cu={...no,html:je(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:je(eo).replace("hr",fn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Si).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},du=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,uu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ti=/^( {2,}|\\)\n(?!\s*$)/,pu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,es=/[\p{P}\p{S}]/u,so=/[\s\p{P}\p{S}]/u,Ei=/[^\s\p{P}\p{S}]/u,fu=je(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,so).getRegex(),Ci=/(?!~)[\p{P}\p{S}]/u,_u=/(?!~)[\s\p{P}\p{S}]/u,mu=/(?:[^\s\p{P}\p{S}]|~)/u,gu=je(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Xd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ri=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hu=je(Ri,"u").replace(/punct/g,es).getRegex(),bu=je(Ri,"u").replace(/punct/g,Ci).getRegex(),Ii="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vu=je(Ii,"gu").replace(/notPunctSpace/g,Ei).replace(/punctSpace/g,so).replace(/punct/g,es).getRegex(),yu=je(Ii,"gu").replace(/notPunctSpace/g,mu).replace(/punctSpace/g,_u).replace(/punct/g,Ci).getRegex(),wu=je("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ei).replace(/punctSpace/g,so).replace(/punct/g,es).getRegex(),ku=je(/\\(punct)/,"gu").replace(/punct/g,es).getRegex(),$u=je(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xu=je(ro).replace("(?:-->|$)","-->").getRegex(),Su=je("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Au=je(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Li=je(/^!?\[(label)\]\[(ref)\]/).replace("label",Zn).replace("ref",to).getRegex(),Oi=je(/^!?\[(ref)\](?:\[\])?/).replace("ref",to).getRegex(),Tu=je("reflink|nolink(?!\\()","g").replace("reflink",Li).replace("nolink",Oi).getRegex(),bi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oo={_backpedal:pn,anyPunctuation:ku,autolink:$u,blockSkip:gu,br:Ti,code:uu,del:pn,emStrongLDelim:hu,emStrongRDelimAst:vu,emStrongRDelimUnd:wu,escape:du,link:Au,nolink:Oi,punctuation:fu,reflink:Li,reflinkSearch:Tu,tag:Su,text:pu,url:pn},Eu={...oo,link:je(/^!?\[(label)\]\((.*?)\)/).replace("label",Zn).getRegex(),reflink:je(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zn).getRegex()},Ks={...oo,emStrongRDelimAst:yu,emStrongLDelim:bu,url:je(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",bi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:je(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",bi).getRegex()},Cu={...Ks,br:je(Ti).replace("{2,}","*").getRegex(),text:je(Ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vn={normal:no,gfm:lu,pedantic:cu},cn={normal:oo,gfm:Ks,breaks:Cu,pedantic:Eu},Ru={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vi=e=>Ru[e];function tr(e,t){if(t){if(wt.escapeTest.test(e))return e.replace(wt.escapeReplace,vi)}else if(wt.escapeTestNoEncode.test(e))return e.replace(wt.escapeReplaceNoEncode,vi);return e}function yi(e){try{e=encodeURI(e).replace(wt.percentDecode,"%")}catch{return null}return e}function wi(e,t){let r=e.replace(wt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(wt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(wt.slashPipe,"|");return n}function dn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Iu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ki(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Lu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Xn=class{constructor(e){Je(this,"options");Je(this,"rules");Je(this,"lexer");this.options=e||Er}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:dn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Lu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=dn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:dn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=dn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
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
`,e=e.substring(h.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex($),z=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),V=this.rules.other.headingBeginRegex($),te=this.rules.other.htmlBeginRegex($);for(;e;){let I=e.split(`
`,1)[0],D;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||V.test(h)||te.test(h)||T.test(h)||z.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+D.slice($);else{if(A||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||V.test(m)||z.test(m))break;f+=`
`+h}!A&&!h.trim()&&(A=!0),u+=I+`
`,e=e.substring(I.length+1),m=D.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=wi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(wi(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=dn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Iu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ki(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ki(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=m.slice(1,-1);return{type:"em",raw:m,text:A,tokens:this.lexer.inlineTokens(A)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Zs{constructor(t){Je(this,"tokens");Je(this,"options");Je(this,"state");Je(this,"inlineQueue");Je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Er,this.options.tokenizer=this.options.tokenizer||new Xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:wt,block:Vn.normal,inline:cn.normal};this.options.pedantic?(r.block=Vn.pedantic,r.inline=cn.pedantic):this.options.gfm&&(r.block=Vn.gfm,this.options.breaks?r.inline=cn.breaks:r.inline=cn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Vn,inline:cn}}static lex(t,r){return new Zs(r).lex(t)}static lexInline(t,r){return new Zs(r).inlineTokens(t)}lex(t){t=t.replace(wt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(wt.tabCharGlobal,"    ").replace(wt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(A=>{h=A.call({lexer:this},m),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Qn=class{constructor(e){Je(this,"options");Je(this,"parser");this.options=e||Er}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(wt.notSpaceStart)?.[0],s=e.replace(wt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+tr(n)+'">'+(r?s:tr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:tr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=yi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+tr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=yi(e);if(s===null)return tr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${tr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Xs{constructor(t){Je(this,"options");Je(this,"renderer");Je(this,"textRenderer");this.options=t||Er,this.options.renderer=this.options.renderer||new Qn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ao}static parse(t,r){return new Xs(r).parse(t)}static parseInline(t,r){return new Xs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Kn,un=(Kn=class{constructor(e){Je(this,"options");Je(this,"block");this.options=e||Er}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},Je(Kn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Je(Kn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Kn),Ou=class{constructor(...e){Je(this,"defaults",Qs());Je(this,"options",this.setOptions);Je(this,"parse",this.parseMarkdown(!0));Je(this,"parseInline",this.parseMarkdown(!1));Je(this,"Parser",qt);Je(this,"Renderer",Qn);Je(this,"TextRenderer",ao);Je(this,"Lexer",Ft);Je(this,"Tokenizer",Xn);Je(this,"Hooks",un);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Qn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Xn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new un;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];un.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&un.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,u);return c.call(s,m)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,u);return m===!1&&(m=await c.apply(s,u)),m})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+tr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Tr=new Ou;function Ve(e,t){return Tr.parse(e,t)}Ve.options=Ve.setOptions=function(e){return Tr.setOptions(e),Ve.defaults=Tr.defaults,$i(Ve.defaults),Ve};Ve.getDefaults=Qs;Ve.defaults=Er;Ve.use=function(...e){return Tr.use(...e),Ve.defaults=Tr.defaults,$i(Ve.defaults),Ve};Ve.walkTokens=function(e,t){return Tr.walkTokens(e,t)};Ve.parseInline=Tr.parseInline;Ve.Parser=qt;Ve.parser=qt.parse;Ve.Renderer=Qn;Ve.TextRenderer=ao;Ve.Lexer=Ft;Ve.lexer=Ft.lex;Ve.Tokenizer=Xn;Ve.Hooks=un;Ve.parse=Ve;var wm=Ve.options,km=Ve.setOptions,$m=Ve.use,xm=Ve.walkTokens,Sm=Ve.parseInline;var Am=qt.parse,Tm=Ft.lex;function fr(e){let t=Ve.parse(e),r=fi.sanitize(t);return gi(r)}function rr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ur(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ts(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Du={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Mu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Nu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function _r(e){return!!e&&typeof e=="object"}function io(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Di(e,t){let r=io(e),n=io(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Pu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>_r(s)&&typeof s.text=="string"?s.text:"").join(""):_r(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Fu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Du[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=io(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Di(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=Di(_r(l)?l.old_string:"",_r(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Mi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ni(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Mu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Nu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function qu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(_r(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ni(o.text));else if(o.type==="thinking"){let a=Mi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Fu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(_r(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Pu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Bu(e){if(e.type==="item.completed"&&_r(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ni(t.text)];if(t.type==="reasoning"){let r=Mi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Uu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Pi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!_r(o))continue;let a=Uu(o)?Bu(o):qu(o,r);for(let l of a)t.push(l)}return t}var ju=5,zu=10,Hu=/Task\s+#(\d+)/,Wu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function rs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Yu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Vu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Ku(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Hu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Zu(e){if(e.tool==="Bash"){let t=e.command||"";return Wu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Xu(e){let t=e.filter(s=>s.kind==="tool").slice(-zu),r=new Map;t.forEach((s,o)=>{let a=Zu(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Qu(e){let t=Vu(e);if(t)return{text:t,guess:!1};let r=Ku(e);if(r)return{text:r,guess:!1};let n=Xu(e);return n?{text:n,guess:!0}:null}function Ju(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:At(e,t)}function ns(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,u=new Set,f=null,m=null,h=!1,A=!1,$=!1,T=null,z=null;function x(){h=!1,A=!1,$=!1,T=null,z=null}async function V(R){if(r){A=!0,$=!1,ye();try{let E=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!E||typeof E!="object"||Array.isArray(E)?$=!0:(T=E,z=R)}catch{o===R&&($=!0)}finally{o===R&&(A=!1,ye())}}}function te(){if(h=!h,h&&o&&z!==o){V(o);return}ye()}function I(){if(!h)return"";let R=Ur({loading:A,error:$});if(R)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!T)return"";if(T.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let E=ts(T.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${E?i`<div class="prompt-block__meta">${E} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function D(){if(!o||!n)return[];let R=n.get(o);return Pi(R?R.lines:[])}function S(){if(!o||!n)return null;let R=n.get(o),E=R?R.last_event_at:null;return typeof E=="number"?E:null}function H(){return a.status==="running"}function F(){if(H()&&o){m||(m=setInterval(()=>ye(),1e3));return}ie()}function ie(){m&&(clearInterval(m),m=null)}function ge(R){let E=[],le=0;for(;le<R.length;){let qe=R[le];if(qe.kind==="tool"){let Ie=le;for(;Ie<R.length&&R[Ie].kind==="tool"&&R[Ie].tool===qe.tool;)Ie+=1;if(Ie-le>=ju&&!u.has(le)){E.push({kind:"group",idx:le,tool:qe.tool||"",lines:R.slice(le,Ie).map((we,xe)=>({idx:le+xe,line:we}))}),le=Ie;continue}}E.push({kind:"line",idx:le,line:qe}),le+=1}return E}function ce(R){for(let E=R.length-1;E>=0;E-=1){let le=R[E];if(le.kind==="result"||le.kind==="error")return null;if(le.kind==="tool"&&!Object.hasOwn(le,"result"))return le}return null}function $e(R){for(let E=R.length-1;E>=0;E-=1)if(R[E].kind==="thinking")return R[E];return null}function ve(R,E){if(E.kind==="gate")return i`<div class="sv__gate">${E.text}</div>`;if(E.kind==="phase")return i`<div class="sv__phase">${E.text}</div>`;if(E.kind==="result")return i`<div
        class="sv__result${E.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${E.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${fr(E.text||(E.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(E.kind==="thinking"){let le=c.has(R);return i`<div
        class="sv__think${le?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ke(R)}
      >
        <span class="sv__think-line">💭 ${rs(E.text)}</span>
        ${le?i`<pre class="sv__think-expand">${E.text}</pre>`:""}
      </div>`}if(E.kind==="error")return i`<div class="sv__error">⛔ ${E.text}</div>`;if(E.kind==="blocker")return i`<div class="sv__error">⛔ ${E.text}</div>`;if(E.kind==="tool"){let le=c.has(R),qe=E.tool==="Bash"?Yu(E.command):0,Ie=E.tool==="Bash"?qe>1?rs(E.command):E.command:E.path||E.command||"";return i`<div
        class="sv__tool${le?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ke(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${E.icon}</span>
          <span class="sv__tool-name">${E.tool}</span>
          ${Ie?i`<span class="sv__tool-detail">${Ie}</span>`:""}
          ${qe>1?i`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof E.added=="number"?i`<span class="sv__diff-add">+${E.added}</span>`:""}
          ${typeof E.removed=="number"?i`<span class="sv__diff-del">−${E.removed}</span>`:""}
          ${E.result?i`<span class="sv__tool-ok">→ ${E.result}</span>`:""}
        </span>
        ${le?i`<pre class="sv__tool-expand">${Ue(E)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${fr(E.text||"")}</div>`}function Ue(R){let E=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)E.push(R.command);else if(R.input!==void 0)try{E.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&E.push(`output:
${R.output}`),E.join(`

`)}function Ge(){if(!o)return i``;let R=D(),E=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),le=a.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Ie=H(),we=Ie?Ju(S(),Date.now()):"",xe=Ie?ce(R):null,Ke=Ie?$e(R):null,Ne=Qu(R);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ne?i`<span
              class="sv__stage${Ne.guess?" sv__stage--guess":""}"
              title=${Ne.text}
              >${Ne.text}</span
            >`:""}
        ${Ie?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?i`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${le?i`<button
              type="button"
              class="sv__session"
              title=${le}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${le}`}
              @click=${()=>Y(le)}
            >
              ⧉ ${le.slice(0,8)}
            </button>`:""}
        ${E?i`<span class="sv__meta">${E}</span>`:""}
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
          aria-label=${qe}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>fe()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${R.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ge(R).map(Xe=>Xe.kind==="group"?Fe(Xe):ve(Xe.idx,Xe.line))}
      </div>
      ${xe||Ke?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${xe?i`<span class="sv__now-icon">${xe.icon}</span>
                  <span class="sv__now-name">${xe.tool}</span>
                  <span class="sv__now-detail"
                    >${xe.tool==="Bash"?rs(xe.command):xe.path||xe.command||""}</span
                  >`:""}
            ${Ke?i`<span class="sv__now-think"
                  >💭 ${rs(Ke.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Fe(R){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ee(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ee(R){u.add(R),ye()}function ye(){Pe(Ge(),e),F(),l&&_e()}function _e(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function ke(R){c.has(R)?c.delete(R):c.add(R),ye()}function me(){l=!l,ye()}function Y(R){Ar(R).then(E=>{E?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Z(R){!o||!R||(a={...a,...R},ye())}function Ce(R){let E=R.target;if(!E||!E.classList||!E.classList.contains("sv__body"))return;!(E.scrollHeight-E.scrollTop-E.clientHeight<=4)&&l&&(l=!1,ye())}e.addEventListener("scroll",Ce,!0);function pe(R){let E=R&&R.attempt_id;E&&(o=E,a=R.meta||{},l=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(ye)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),ye())}function fe(){let R=o;o=null,c.clear(),u.clear(),x(),ie(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),Pe(i``,e),s&&s()}return{open:pe,updateMeta:Z,close:fe,isOpen(){return o!==null},destroy(){ie(),f&&(f(),f=null),e.removeEventListener("scroll",Ce,!0),o=null,Pe(i``,e)}}}function _n(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Fi(t.spec_id),s=Fi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Fi(e){return typeof e=="string"?e.trim():""}function ep(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function tp(e){let t=e&&e.metadata||{},r=_n(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:ep(t)?null:"plan_pending"}),n}function qi(e,t){let r=tp(e);return i`
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
  `}var rp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",np=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,sp=/^\*\*결론\*\* — (.+)$/;function ss(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==rp)return null;let r=np.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?sp.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Bi=20;function Ui(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function op(e){return e.length>Bi?`${e.slice(0,Bi)}\u2026`:e}function ap(e,t,r,n){let s=`${t.lane} ${op(t.identifier)}`;return i`<div class="detail-report">
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
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${fr(t.body)}
        </div>`:""}
  </div>`}function ip(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
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
  </div>`}function ji(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=ss(typeof c.text=="string"?c.text:"");return u?ap(c,u,t,s.has(c.id)):ip(c)})}
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
  `}var lp=["codex","opus","fable","self","skip"],cp=["codex","fable","skip"],dp=["low","medium","high","xhigh"],up=["standard","fast_track"],Cr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],co=["impl_runtime","orchestration_model"],mn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],uo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},zi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},pp=["self","skip"],fp="opus",po={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function fo(e){let t=uo[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function _p(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:po[e]||"(\uAE30\uBCF8)"}function jr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rr(e){if(!jr(e)||!jr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jr(r)&&jr(r.models));return t.length>0?t:null}function lo(e){return{value:e,label:e}}function _o(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Hi(e,t,r=null){let n=Rr(e);if(!n)return t?[{label:null,options:[lo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,l])=>({label:a,options:Object.keys(l.models).map(lo)})),o=s.some(a=>a.options.some(l=>l.value===t));return t&&!o?[_o(t),...s]:s}function mr(e,t){let r={label:null,options:e.map(lo)};return t&&!e.includes(t)?[_o(t),r]:[r]}function nr(e,t){let r=Rr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function mo(e,t){return jr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function mp(e,t){return jr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():mo(e,t)}function gp(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mp(n,n.models[t]);return[]}function hp(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function go(e,t){let r=Rr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mo(n,n.models[t]);return[]}function Yi(e){let t=Rr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of mo(n,s))r.includes(o)||r.push(o);return r}function Vi(e,t){if(!t)return Yi(e);let n=Rr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of go(e,o))s.includes(a)||s.push(a);return s}function as(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=nr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?go(t,n.impl_model):Vi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function zr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||fp,a=r("impl_model"),l=r("impl_runtime"),c=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?nr(n,o):s:null;return Cr.map(u=>{let f=t(u),m,h=!1;return u==="orchestration_model"?m=Hi(n,f):u==="impl_runtime"?m=mr(["inherit","claude","codex"],f):u==="impl_model"?(m=c?Hi(n,f,c):f?[_o(f)]:[],h=l==="inherit"&&c===null):u==="orchestration_effort"?m=mr(gp(n,o),f):u==="orchestration_speed"?m=bp(hp(n,o),f):u==="impl_effort"?(m=mr(a?go(n,a):c?Vi(n,c):Yi(n),f),h=l==="inherit"&&c===null):u==="plan_review_model"?m=mr(cp,f):Object.hasOwn(zi,u)?(m=mr(dp,f),h=pp.includes(r(zi[u]))):m=mr(lp,f),{key:u,groups:m,selected:f,disabled:h,runner:u==="orchestration_model"?nr(n,o):null}})}function os(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Wi(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Wi(s,t))}
          </optgroup>`)}
  `}function bp(e,t){return mr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Wi(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Gi(e,t,r,n,s,o,a){return i`
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
  `}function vp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function yp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,l=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,m])=>{let h=t(f)||"codex",A=t(m);return`${u} ${h}${A?`/${A}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Cr.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:l.join(" \xB7 ")}];return i`<section
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
              >${vp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Ki(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},l=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let T=l($);return T||(typeof a[$]=="string"?a[$]:"")},u=zr({selectedOf:l,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),h=mn.flatMap($=>$.keys).filter($=>l($)).length,A=$=>{let T=m.get($);return T?Gi(T.key,os(T.groups,T.selected,_p(T.key,a,s)),T.selected,!!T.selected,T.disabled,T.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${yp(l,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Gi("workflow_mode",os(mr(up,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${co.map(A)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${mn.map($=>i`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(A)}
          </section>`)}
    </details>
  `}function wp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?i`
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:fr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Pe(u(),e)}async function m($,T={}){s=$,o="loading",a="",l="",f();let z=r?r():"";if(!z){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(z)+"&path="+encodeURIComponent($);try{let V=await n(x),te=await V.json().catch(()=>({}));if(!V.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||V.status)+")",f();return}a=String(te.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Pe(i``,e)}function A(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:A}}var kp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ji="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $p(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function xp(e){let t=gt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=qr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ji}
          >부분 집계</span
        >`:""}`}function Xi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Qi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?el(t):""}function Sp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Qi(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Qi(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Ap(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...kp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${$p(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Ji}</span>`:""}
  </div>`}var Tp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function el(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ep(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function tl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),A=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${T=>{T.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Xi(qs(u));if(gt(f).length===0&&!qr(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
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
      세션 이력${xp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=qs(u),m=Xi(f),h=gt(m);return i`<div class="detail-session-row">
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
            ${ur(u)?i`<span
                  class="detail-session__resumed"
                  title=${ur(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):qr(u.usage)?i`<span class="detail-session__usage"
                    >${qr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${el(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Ep(u)}
          ${s.has(u.attempt_id)&&u.usage?Ap(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Sp(f)}
        </div>`})}
    </div>
  `}function rl(e,t={}){return i`
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
          ${Cp(e)}
        </div>`:""}
  `}function Cp(e){let t=Ur(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?rr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ts(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?rr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?rr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Rp=["open","in_progress","deferred","resolved","closed"],Ip=[0,1,2,3,4];function nl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,m={},h="",A=!1,$=!1,T=!1,z="",x="",V="";function te(){$=!1,T=!1,z="",x="",V=""}let I=[],D=null,S=null,H=!1,F="",ie=!1,ge=0,ce=new Set;function $e(){I=[],D=null,S=null,H=!1,F="",ie=!1,ge+=1,ce.clear()}async function ve(d){if(!s)return;let k=++ge;try{let v=await Promise.resolve(s("get-comments",{id:d}));if(k!==ge||d!==u)return;I=Array.isArray(v)?v:[],H=!1}catch{if(k!==ge||d!==u)return;H=!0}_()}function Ue(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(D!==u){D=u,S=d,ve(u);return}d!==null&&d!==S&&(S=d,ve(u))}function Ge(d){ce.has(d)?ce.delete(d):ce.add(d),_()}function Fe(d){let k=F.trim().length===0;F=d,k!==(d.trim().length===0)&&_()}async function Ee(){let d=F.trim();if(!s||!u||d.length===0||ie)return;let k=u;ie=!0,_();let v=!1;try{let P=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(P)&&P.length>0&&(v=!0,k===u&&(I=P,H=!1,F="",S=P.length))}catch{v=!1}v||Q("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(ie=!1),_()}let ye={onToggle:Ge,onDraftInput:Fe,onSubmit:Ee},_e=document.createElement("div");_e.className="md-viewer-root",document.body.appendChild(_e);let ke=Zi(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let Y=ns(me,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),Z=!1,Ce=!1,pe=!1,fe=null,R=null,E=0;function le(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function qe(){Z=!1,Ce=!1,pe=!1,fe=null,R=null,E+=1}async function Ie(d){if(!s)return;let k=++E;Ce=!0,pe=!1,_();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==E)return;!v||typeof v!="object"||Array.isArray(v)?pe=!0:(fe=v,R=le(d))}catch{k===E&&(pe=!0)}finally{k===E&&(Ce=!1,_())}}function we(){if(Z=!Z,Z&&u&&R!==le(u)){fe=null,Ie(u);return}_()}function xe(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(v=>v&&v.bead_id===u).sort((v,P)=>(P.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[]}))}function Ke(){if(!a||!u)return null;let d=a.get();return Rt(d&&d.attempts||{},u)}let Ne=new Set;function Xe(d){Ne.has(d)?Ne.delete(d):Ne.add(d),_()}function L(d){let k=a?a.get():null,v=k&&k.attempts?k.attempts[d]:null;Y.open({attempt_id:d,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function W(d){if(!s||!d)return;let k=()=>{let he=a?a.get():null;return he&&typeof he.revision=="number"?he.revision:0},v=async(he={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...he}),P=he=>{he?.queue&&a?.set&&a.set(he.queue)},ee=await v();if(P(ee),ee&&ee.conflict){let he=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:k();ee=await s("worker-attempt-resume",{attempt_id:d,expected_revision:he}),P(ee)}ee=await Qt(ee,(he,ct)=>v({continuation:he,decision_token:ct}),{onResult:P,refresh:()=>v()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}let B={onOpen:L,onResume:W,onToggleUsage:Xe};function w(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?X()?.presets.find(P=>P.id===k):null;return v&&v.compatible!==!1&&v.settings?v.settings:{}}function C(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?X()?.presets.find(P=>P.id===k):null;return v&&v.compatible!==!1&&typeof v.name=="string"?v.name:""}function N(){let d=a?a.get():null;return d&&d.runner_catalog||null}function G(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},v=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof w().orchestration_model=="string"?w().orchestration_model:"")||"opus";return nr(N(),v)}function X(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Le(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},v=P=>typeof k[P]=="string"?k[P]:P==="impl_runtime"&&typeof k.impl_model=="string"&&nr(N(),k.impl_model)||"";return zr({selectedOf:v,effectiveOf:v,runner_catalog:N()}).some(P=>P.groups.some(ee=>ee.options.some(he=>he.value===P.selected&&he.label.endsWith("(\uBE44\uD638\uD658)"))))}function Se(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function Oe(){let d=X(),k=d?.presets.find(v=>v.id===h);if(!(!s||!u||!d||!k||Le(k)||A)){A=!0,_();try{let v=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(v&&v.conflict){Se(v),Q("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let P=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&P&&typeof P=="object"){f=P;for(let ee of Cr)delete m[ee];Q("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,_()}}}function ze(){let d=X();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],v=k.find(ee=>ee.id===h),P=v?Le(v):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||A}
          @change=${ee=>{h=ee.target.value,_()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(ee=>{let he=Le(ee);return i`<option
              value=${ee.id}
              ?selected=${ee.id===h}
            >
              ${ee.name}${he?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!v||P||A}
          @click=${()=>{Oe()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ot=null;r&&r.subscribe&&(ot=r.subscribe(()=>nt()));let et=null;a&&typeof a.subscribe=="function"&&(et=a.subscribe(()=>{u&&_()}));let ut=null;l&&typeof l.subscribe=="function"&&(ut=l.subscribe(()=>{u&&_()}));function kt(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",kt);function nt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(v=>v&&v.id===u)||d[0]||f}Ue(),_()}}function at(d){Ar(d).then(k=>{k?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function rt(d){d.preventDefault(),d.stopPropagation(),u&&at(u)}function it(d,k){d.preventDefault(),d.stopPropagation(),at(k)}function mt(d,k,v){d.preventDefault(),d.stopPropagation(),ke.open(k,{missing_state:v})}function j(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function K(d,k){let v=f||{},P=v.metadata&&typeof v.metadata=="object"?v.metadata:{},ee={};for(let re of["impl_runtime","impl_model","impl_effort"])ee[re]=Object.hasOwn(m,re)?m[re]:typeof P[re]=="string"?P[re]:"";ee[d]=k;let he=as(ee,N(),G()),ct={};for(let re of["impl_runtime","impl_model","impl_effort"])ct[re]=m[re],m[re]=he[re]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...he,orchestration_runtime:G()})).then(re=>{let Qe=Array.isArray(re)?re[0]:re;if(!Qe||typeof Qe!="object"||!Qe.id)throw new Error("implementation target readback failed");f=Qe;for(let ar of["impl_runtime","impl_model","impl_effort"])delete m[ar];_()}).catch(()=>{for(let re of["impl_runtime","impl_model","impl_effort"])ct[re]===void 0?delete m[re]:m[re]=ct[re];_(),Q("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ae(d,k,v){if(!s||!u)return!1;try{let P=await Promise.resolve(s(d,k)),ee=Array.isArray(P)?P[0]:P;return ee&&typeof ee=="object"&&ee.id?(f=ee,!0):(Q(v,"error"),!1)}catch{return Q(v,"error"),!1}}function de(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function ne(){$=!0,z=f&&f.title||"",_(),de('.detail-edit__input[data-edit="title"]')}function Re(d){z=d.target.value}function Ye(){$=!1,z="",_()}function tt(){ae("edit-text",{id:u,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,z=""),_()})}function Ae(){T=!0,x=f&&f.description||"",_(),de('.detail-edit__textarea[data-edit="description"]')}function He(d){x=d.target.value}function Te(){T=!1,x="",_()}function dt(){ae("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(T=!1,x=""),_()})}function ht(d,k,v,P){if(d.key==="Escape"){d.stopPropagation(),v();return}d.key==="Enter"&&(!P||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function or(d){let k=d.target.value;ae("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Vt(d){let k=Number(d.target.value);ae("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function Bt(d){V=d.target.value}function pt(){let d=V.trim();d.length!==0&&ae("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(V=""),_()})}function $t(d){if(d.key==="Escape"){d.stopPropagation(),V="",_();return}d.key==="Enter"&&(d.preventDefault(),pt())}function Ut(d){ae("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let Lt={onCopyPath:it,onOpenDoc:mt},Ot={onChange:j,onImplTargetChange:K};function jt(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function p(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function y(d){let v=(Array.isArray(d.dependencies)?d.dependencies:[]).map(P=>({id:jt(P),icon:p(P)})).filter(P=>P.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${v.map(P=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(P.id)}
                  >
                    ${P.icon?`${P.icon} `:""}${P.id}
                  </button>`:i`<span class="detail-dep"
                    >${P.icon?`${P.icon} `:""}${P.id}</span
                  >`)}
          </div>`}
    `}function q(d){let k=d.metadata||{},v=d.workflow||{},P=v.stages||{},ee=P.spec&&P.spec.stale,he=P.impl&&P.impl.stale,ct=P.plan||null,re=v.route_source==="derived",Qe=v.route||k.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${re?" detail-kv__v--derived":""}"
          title=${re?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${re?"unset":Qe}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ct?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ct?.approval_receipt||"\uC5C6\uC74C"}${ct?.approval_state==="stale"?" \xB7 stale":ct?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${v.exec_receipt.kind}:${v.exec_receipt.actor}@${v.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${v.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let se={route:["quick_fix","spec_backed","full_plan"]};async function ue(d,k){let v=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await ae("update-workflow-meta",{id:u,key:d,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function be(d){let k=d.metadata||{};return i` ${((P,ee)=>{let he=se[P],ct=typeof k[P]=="string"?k[P]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${P}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${P}
          data-edit=${`wfmeta-${P}`}
          @change=${re=>ue(P,re)}
        >
          <option value="" ?selected=${!he.includes(ct)}>
            ${ee}
          </option>
          ${he.map(re=>i`<option value=${re} ?selected=${ct===re}>${re}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function U(d,k){return $?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${Re}
            @keydown=${v=>ht(v,tt,Ye,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${tt}
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
        ${gt(k).map(v=>i`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ne}
        >
          ✎
        </button>
      </div>
    `}function b(d){let k=ft(d.created_at),v=ft(d.updated_at);return!k&&!v?i``:i`
      ${k?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${v?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function O(d,k){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${or}
        >
          ${Rp.map(v=>i`<option value=${v} ?selected=${v===d}>${v}</option>`)}
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
          ${Ip.map(v=>i`<option value=${String(v)} ?selected=${v===k}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function J(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ae}
            >
              ✎
            </button>`}
      </div>
      ${T?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${He}
              @keydown=${k=>ht(k,dt,Te,!0)}
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
                @click=${Te}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function De(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Ze(d){let k=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(v=>i`<span class="detail-label-chip"
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
            .value=${V}
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
    `}function Be(){if(!u)return i``;let d=f||{},k=String(d.id||u),v=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",P=Ke(),ee=d.status||"open",he=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",ct=d.description||"",re={...d,metadata:{...d.metadata||{},...m}};return i`
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
            @click=${rt}
          >
            ${k}
          </button>
          ${U(v,P)}
          ${O(ee,he)} ${b(d)}
          ${J(ct)}
          ${ji(I,ye,{expanded:ce,draft:F,sending:ie,error:H})}
          ${De(d)} ${Ze(d)} ${y(d)}
          ${q(d)} ${be(d)}
          ${qi(d,Lt)}
          ${ze()}
          ${Ki(re,Ot,w(),N(),C())}
          ${rl({expanded:Z,loading:Ce,error:pe,data:fe},{onToggle:we})}
          ${tl(xe(),B,{total:P,expanded:Ne})}
        </div>
      </div>
    `}function _(){Pe(Be(),e)}return{load(d){d!==u&&(m={},h="",te(),$e(),qe()),u=d,f=null,nt()},clear(){u=null,f=null,m={},h="",A=!1,te(),$e(),qe(),ke.close(),Y.close(),Pe(i``,e)},destroy(){ot&&(ot(),ot=null),et&&(et(),et=null),ut&&(ut(),ut=null),document.removeEventListener("keydown",kt),ke.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),Y.destroy(),me.parentNode&&me.parentNode.removeChild(me),u=null,f=null,h="",A=!1,$e(),qe(),Pe(i``,e)}}}var Lp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function sl(e,t){return Ns(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Op(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ol(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let H=r.get();if(H)try{let F=await n("display-policy-set",{expected_revision:H.revision,policy:S(H)});c(F),F&&F.conflict&&F.policy&&(F=await n("display-policy-set",{expected_revision:F.policy.revision,policy:S(F.policy)}),c(F)),F&&F.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let H=r.get();if(!H)return;let F=sl(S,H)!=="shown";l(ie=>Op(S,ie,F))}function f(){let S=a.trim();S.length!==0&&(a="",l(H=>H.hidden_prefixes.includes(S)?{hidden_prefixes:H.hidden_prefixes}:{hidden_prefixes:[...H.hidden_prefixes,S]}),z())}function m(S){l(H=>({hidden_prefixes:H.hidden_prefixes.filter(F=>F!==S)}))}function h(S){let H=r.get();if(!H)return;let F=H.chips[S]===!1;l(()=>({chips:{[S]:F}}))}function A(S){let H=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${H.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${H.map(F=>{let ie=sl(F,S);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ie}`}
                  data-label=${F}
                  data-state=${ie}
                  @click=${()=>u(F)}
                >
                  ${F}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(H=>i`<span class="display-settings__prefix">
                ${H}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${H} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(H)}
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
            @input=${H=>{a=String(H.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function T(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Lp.map(([H,F])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${H}
                  .checked=${S.chips[H]!==!1}
                  @change=${()=>h(H)}
                />
                <span>${F}</span>
              </label>`)}
        </div>
      </section>
    `}function z(){let S=r.get();Pe(i`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${D}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?i`${A(S)} ${$(S)}
                ${T(S)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,V=()=>{x=!1};o.addEventListener("close",V),o.addEventListener("cancel",V);let te=null;r.subscribe&&(te=r.subscribe(()=>{x&&z()}));function I(){x||(a="",x=!0,z(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:D,destroy(){x=!1,o.removeEventListener("close",V),o.removeEventListener("cancel",V),te&&(te(),te=null),o.remove()}}}function al(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function is(e,t){let{queueStore:r,presetStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=null,l=!1;function c(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let w=c();return typeof w.revision=="number"?w.revision:0}function f(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function m(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function h(w){w&&w.queue&&r&&r.set(w.queue)}function A(){return c().runner_catalog??null}let $=null;function T(){if($!==null)return $;let w=c().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function z(w){if(!s)return;let C=f();if(!C)return;$=w||"";let N=I(w);if(we(),!N.viable){Q(N.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),$=null,we();return}try{let G=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:u(),expected_preset_revision:C.revision});h(G),G&&G.presets&&n&&n.set(G.presets),G&&G.conflict?Q("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):G&&G.applied||Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}$=null,we()}function x(w){a={id:w.id,name:w.name,settings:{...w.settings||{}}},S(),l=!1,we()}function V(){a={id:null,name:"",settings:{}},l=!1,we()}function te(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},N=G=>typeof C[G]=="string"?C[G]:G==="impl_runtime"&&typeof C.impl_model=="string"&&nr(A(),C.impl_model)||"";return zr({selectedOf:N,effectiveOf:N,runner_catalog:A()}).some(G=>G.groups.some(X=>X.options.some(Le=>Le.value===G.selected&&Le.label.endsWith("(\uBE44\uD638\uD658)"))))}function I(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let N=f()?.presets.find(X=>X.id===w);if(!N||N.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let G=N.compatible===!1||te(N);return{viable:!G,missing:!1,incompatible:G,preset:N}}function D(){let w=a?.settings.orchestration_model;return typeof w!="string"?null:nr(A(),w)}function S(){if(!a)return;let w=as({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},A(),D());for(let C of["impl_runtime","impl_model","impl_effort"])w[C]?a.settings[C]=w[C]:delete a.settings[C]}function H(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},N=Cr.filter(X=>typeof C[X]=="string").length,G=Cr.filter(X=>typeof C[X]=="string").map(X=>`${uo[X]?.title||X}: ${C[X]}`);return{count:`${N}/12 \uC9C0\uC815`,choices:G.length>0?G.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function F(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let C=f();if(C)try{let N=await s("exec-preset-delete",{expected_revision:C.revision,id:w.id});m(N),N&&N.conflict&&Q("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ie(w=!1){if(!s||!a)return;let C=f();if(!C)return;let N=w||a.id===null,G={expected_revision:C.revision,...N?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let X=await s(N?"exec-preset-create":"exec-preset-update",G);if(m(X),X&&X.conflict){l=!0,we();return}if(X&&X.applied){a=null,l=!1,we();return}Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ge(w){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${fo(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${C=>{if(!a)return;let N=C.target.value;N?a.settings[w.key]=N:delete a.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&S(),l=!1,we()}}
      >
        ${os(w.groups,w.selected,po[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ce(){if(!a)return"";let w=Se=>typeof a?.settings[Se]=="string"?a.settings[Se]:"",C=zr({selectedOf:w,effectiveOf:w,runner_catalog:A(),controller_runtime:D()}),N=mn.flatMap(Se=>Se.keys).filter(Se=>typeof a?.settings[Se]=="string").length,G=Se=>{let Oe=C.find(ze=>ze.key===Se);return Oe?ge(Oe):""},X=f(),Le=a.id!==null&&X!==null&&!X.presets.some(Se=>Se.id===a?.id);return i`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${a.name}
          data-preset-name
          @input=${Se=>{a&&(a.name=Se.target.value,l=!1)}}
        />
      </label>
      ${l?i`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Le?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${co.map(G)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${N}개 변경됨</summary>
        ${mn.map(Se=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${Se.id}
            >
              <h4>${Se.label}</h4>
              ${Se.keys.map(G)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Le?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ie(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{ie(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{a=null,l=!1,we()}}
        >
          취소
        </button>
      </div>
    </div>`}function $e(){let w=f(),C=w?w.presets.filter(X=>X?.migration_pending!==!0):[],N=T()||"",G=I(N);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${V}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:C.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:C.map(X=>{let Le=H(X),Se=I(X.id),Oe=X.id===N,ze=Se.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Se.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",ot=typeof X.reference_count=="number",et=ot?X.reference_count:null,ut=Array.isArray(X.reference_summary)?X.reference_summary.map(kt=>kt?.display_name||kt?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${X.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${X.name}</strong>
                  ${Oe?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Le.count}</span>
                  <span data-preset-references=${X.id}
                    >${ot?`\uCC38\uC870 ${et}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Se.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Le.choices}</small>
                  ${ut?i`<small data-preset-impact=${X.id}
                        >업데이트 영향: ${ut}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Oe?i`<button
                        type="button"
                        data-workspace-preset-release=${X.id}
                        @click=${()=>{z("")}}
                      >
                        기본 해제
                      </button>`:i`<button
                        type="button"
                        data-workspace-preset-assign=${X.id}
                        ?disabled=${!Se.viable}
                        title=${ze}
                        @click=${()=>{z(X.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${X.id}
                    @click=${()=>x(X)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${X.id}
                    ?disabled=${et===null||et>0||X.reference_scan_complete===!1}
                    title=${et===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":et>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":X.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{F(X)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${w!==null&&N&&G.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${N} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${N}
                @click=${()=>{z("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${ce()}
    </section>`}function ve(){let w=c().workspace_info;return w&&typeof w=="object"?w:{}}function Ue(w,C){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${C}</span
    >`}let Ge=!1,Fe=!1,Ee=!1,ye=null;async function _e(){if(s){Fe=!0,Ee=!1,we();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?Ee=!0:ye=w}catch{Ee=!0}finally{Fe=!1,we()}}}function ke(){if(Ge=!Ge,Ge&&!ye){_e();return}we()}function me(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Ge?"true":"false"}
          @click=${ke}
        >
          ${Ge?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Ge?Y():""}
    </section>`}function Y(){let w=Ur({loading:Fe,error:Ee});if(w)return w;if(!ye)return"";let C=Array.isArray(ye.variants)?ye.variants:[];return i`<div class="exec-defaults__sp-body">
      ${ye.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${ye.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(N=>i`<div class="exec-defaults__sp-variant" data-variant=${N.key}>
            <div class="exec-defaults__sp-cond">${N.condition}</div>
            ${rr(N.label,N.system_prompt)}
          </div>`)}
    </div>`}function Z(w){if(typeof w!="number"||!Number.isFinite(w))return"";let C=w/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function Ce(w){let C=Z(w);return C?Ue("config",C):""}function pe(w){let C=typeof w.base_sha=="string"?w.base_sha:"",N=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`;return i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${N}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${w.verify?i`<code class="exec-defaults__vd-cmd"
                  >${w.verify.script}</code
                >${Ce(w.verify.timeout_ms)}`:i`선언 없음${Ue("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${w.deploy?i`<code class="exec-defaults__vd-cmd"
                  >${w.deploy.script}</code
                >${Ce(w.deploy.timeout_ms)}`:i`선언 없음${Ue("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function fe(w){let C=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?pe(C):C&&(C.status==="pending"||C.status==="error")?i`<section class="exec-defaults__vd" data-seam="repo-ops">
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
    </section>`}async function R(w){if(!s)return;let C=await s("worker-auto-repair-toggle",{on:w,expected_revision:u()});if(h(C),C&&C.conflict){let N=await s("worker-auto-repair-toggle",{on:w,expected_revision:u()});h(N)}we()}let E={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function le(w,C,N){return i`<div class="exec-defaults__policy-group" data-policy=${N}>
      <div class="exec-defaults__policy-label">${w}</div>
      <ul class="exec-defaults__policy-list">
        ${C.map(G=>i`<li data-token=${G}>
              ${E[G]||G}
            </li>`)}
      </ul>
    </div>`}function qe(w){return i`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${w.map(C=>{let N=[E[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?N.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?N.push(`${E[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&N.push(`${C.sessions_per_user_action}\uD68C`,E[C.user_actions]||C.user_actions),C.applies_when&&N.push(E[C.applies_when]||C.applies_when),i`<li data-token=${C.id}>
            <strong>${E[C.id]||C.id}</strong>
            <span>${N.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Ie(){let w=c(),C=w.auto_repair!==!1,N=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null,G=Array.isArray(w.repo_operations)?w.repo_operations:[],X=G.find(ze=>ze.state==="repairing"),Le=G.filter(ze=>ze.state==="failed"||ze.state==="repairing"),Se=Le.length?Math.min(...Le.map(ze=>typeof ze.repair?.remaining=="number"?ze.repair.remaining:0)):N?.auto_repair?.resolution_ladder?.find(ze=>ze.id==="auto_repair_session")?.attempts??1,Oe=Array.isArray(N?.auto_repair?.resolution_ladder)?N.auto_repair.resolution_ladder:[];return i`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          @change=${ze=>{R(ze.target.checked)}}
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
          >남은 자동 해결 ${Se}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${X?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${X.repair?.owner_bead||X.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${N?i`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(N.worker_automatic||[]).length} · 해결 사다리
                ${Oe.length} · 금지
                ${(N.never_automatic||[]).length}</span
              >
            </summary>
            ${le("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",N.worker_automatic||[],"worker-automatic")}
            ${N.supported===!1||N.schema_version!==2?i`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${N.schema_version})`}
                </div>`:qe(Oe)}
            ${le("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",N.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function we(){Pe(i`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${B}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${$e()} ${fe(ve())}
            ${Ie()} ${me()}
          </div>
        </div>
      `,o)}let xe=!1,Ke=()=>{xe=!1},Ne=w=>{w.target===w.currentTarget&&B()};o.addEventListener("close",Ke),o.addEventListener("cancel",Ke),o.addEventListener("click",Ne);let Xe=null;r&&r.subscribe&&(Xe=r.subscribe(()=>{xe&&we()}));let L=null;n&&n.subscribe&&(L=n.subscribe(()=>{xe&&we()}));function W(){xe||(xe=!0,we(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function B(){xe&&(xe=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:W,close:B,destroy(){xe=!1,o.removeEventListener("close",Ke),o.removeEventListener("cancel",Ke),o.removeEventListener("click",Ne),Xe&&(Xe(),Xe=null),L&&(L(),L=null),o.remove()}}}function ls(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function cs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Dp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:ls(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function il(e,t){let r=Dp(e,t);return r?i`<button
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
            title=${r.deploy.at?ft(r.deploy.at):""}
            >${cs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=At(e.created_at),r=At(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Mp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function gn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ds(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Mp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:u}}function sr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function bo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=Nt(e.usage),a=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!l,u=c?At(e.done_at):"",f=e.selectable?i`<input
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
          >`:"",A=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=i`<span class="worker-mini__title">${e.title}</span>`,z=e.pr_url&&e.pr_number?i`<a
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
        >`:"",V=n.map(ve=>ve===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ve}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ve===e.completion_badge&&e.completion_title||""}
          >${ve}</span
        >`),te=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",I=s.length>0?s.map(ve=>i`<span class="worker-usage" title=${ve.tooltip}
              >${ve.label}</span
            >`):o?i`<span class="worker-usage" title=${Br(e.usage)}
            >${o}</span
          >`:"",D=a?i`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",S=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",F=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ie=e.discard,ge=ie?.action||e.discard_action?i`<button
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
        </button>`:"",ce=e.revise_action?i`<button
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
        </button>`:"",$e=!!(o||a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ie?.operation||e.revise_action);return i`<div
    class="worker-mini${l?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${A}${$}${T}</div>
          <div class="worker-mini__row2">
            ${I}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ft(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${V}${D}
            <span class="worker-mini__actions"
              >${S}${H}${F}${ge}</span
            >
            ${Hr(e)}
          </div>`:l?i`<div class="worker-mini__head">
              ${f}${m}${A}${$}${z}${x}${V}${h}${te}
            </div>
            <div class="worker-mini__body">${T}</div>
            ${$e?i`<div class="worker-mini__foot">
                  ${I}${D}
                  <span class="worker-mini__actions"
                    >${S}${H}${F}${ge}${ce}</span
                  >
                  ${sr(e)}
                </div>`:""}
            ${Hr(e)}`:i`<div class="worker-mini__line">
              ${f}${m}${A}${$}${T}${z}${x}${V}${h}${te}${I}${D}${S}${H}${F}${ge}
            </div>
            ${sr(e)} ${Hr(e)}`}
  </div>`}function Np(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?Bn(r,e.status):""}
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
    ${Hr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Np(n):bo(n))}
          </div>`}
  </section>`}var ll=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],hn=ll.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ll.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function cl(e){let t=hn.findIndex(r=>r.step===e);return hn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ir(e){let t=hn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Pp(e){let t=hn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:hn.length}}function us(e){let t=Pp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var dl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ul={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function pl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yo(e){for(let t of pl(e))if(Object.hasOwn(dl,t))return dl[t];return null}function wo(e){let t=null;for(let r of pl(e))Object.hasOwn(ul,r)&&(t=ul[r]);return t}function ps(e){let t=yo(e),r=wo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function fl(e,t){let r=yo(e)??yo(t),n=wo(t)??wo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var _l=160;function Fp(e){return e.length>_l?`${e.slice(0,_l)}\u2026`:e}function qp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Fp(e.command)}</code>`:""}
  </div>`}function Bp(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ko(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ml(e){let t=e.failure?ps(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${qp(e.failure.cause_detail)}
          ${Bp(e.failure.reason)}
          ${sr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Up(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ko(t-e.started_at):"\u2014",a=Wt(e),l=ur(e),c=gt(e.usage),u=Nt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
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
            ${A}
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
            ${A}`}
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
                  title=${Br(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Hr(e)} ${sr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function $o(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Up(s,t,r))}
  </div>`}function gr(e){return i`<svg
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
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var bn=1,jp=6e4,zp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Hp=new Set(["auto_merge","merged","merge","done"]),kl={running:3,paused:2,failed:1};function Wp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Gp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=kl[u.run_state],h=kl[l];if(m>h||m===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Rt(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function $l(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Tt(e){return e&&typeof e=="object"?e:{}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let l=[],c=[],u=[],f=[],m=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let V=x.root_dir,te=x.name||V,I=a.get(V),D=I&&typeof I.revision=="number"?I.revision:typeof x.revision=="number"?x.revision:0,S=Tt(x.attempts),H=Tt(x.bead_titles),F=Tt(x.pr_observations),ie=Tt(x.admission),ge=Tt(x.revise_parked),ce=Tt(x.merge_queue_state),$e=Tt(x.cleanup_failed),ve=Tt(x.discard_operations),Ue=Array.isArray(x.merge_queue)?x.merge_queue:[],Ge=new Set(Ue.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>Y.bead_id)),Fe=new Map(Ue.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>[Y.bead_id,Y])),Ee=Array.isArray(x.queue)?x.queue:[],ye=Array.isArray(x.done)?x.done:[],_e=new Map;for(let Y of ye)Y&&typeof Y.bead_id=="string"&&typeof Y.added_at=="number"&&_e.set(Y.bead_id,Y.added_at);let ke=Y=>({id:Y,title:H[Y]||Y,root_dir:V,workspace_name:te,expected_revision:D,draggable:!1}),me=new Set;for(let[Y,Z]of Gp(S,_e))me.add(Y),c.push({...ke(Y),lane:"running",attempt_id:Z.attempt_id,run_state:Z.run_state,can_pause:Z.can_pause,can_resume:Z.can_resume,started_at:Z.started_at,last_event_at:Z.last_event_at,runner:Z.runner,model:Z.model,effort:Z.effort,speed:Z.speed,resumed_from:Z.resumed_from,continuation_mode:Z.continuation_mode,usage:Z.usage,discard:Gt(ve,Y,{attempt_id:Z.attempt_id}),badges:Z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Z.run_state==="failed"});for(let Y of Array.isArray(x.pr_wait)?x.pr_wait:[]){let Z=Y&&Y.bead_id;if(typeof Z!="string"||me.has(Z))continue;me.add(Z);let Ce=Tt(F[Z]),pe=Tt(Ce.pr),fe=Ce.gate?Tt(Ce.gate):null,R=Ge.has(Z),E=Fe.get(Z)?.continuation_action||null,le=!!E&&E.continuation===null,qe=ce.active===Z,Ie=Y.external===!0,we=$e[Z]||null,xe=!!fe&&fe.base_badge==="\uCDA9\uB3CC",Ke=!!we&&["child_sweep","branch_cleanup","parent_close"].includes(we.step)&&!!fe&&fe.tier==="merged",Ne=Ie&&!!we&&!!fe&&fe.tier==="merged",Xe=!!fe&&["closed_unmerged","review","undecidable"].includes(fe.tier),L=Gt(ve,Z,{external:Ie,merge_active:qe,merge_queued:R,merged:!!we||fe?.tier==="merged"}),W=!!L.operation;u.push({...ke(Z),lane:"pr_wait",pr_number:typeof pe.number=="number"?pe.number:null,pr_url:typeof pe.url=="string"?pe.url:void 0,external:Ie,usage:Rt(S,Z),badges:le?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:we?[Ir(we.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ir(we.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof fe?.gate_badge=="string"&&fe.gate_badge.length>0?[fe.gate_badge]:[],alert:!!we||Xe,reason:we?us(we.step):"PR \uB300\uAE30",merge_action:!R||le,merge_enabled:!W&&(le||fe?.enabled===!0||xe||Ke||Ne),merge_label:le?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ne||Ke?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!Ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:le?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?L.error?`\uD3D0\uAE30 \uC2E4\uD328: ${L.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${L.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ne?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":fe?.enabled===!0?`\uBA38\uC9C0 (${fe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${fe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:R&&!le,cancel_enabled:!qe,continuation_mismatch:E?.mismatch||null,discard:L,discard_action:L.action,discard_enabled:L.enabled,discard_title:L.title})}for(let Y=0;Y<Ee.length;Y++){let Z=Ee[Y],Ce=Z&&Z.bead_id;if(typeof Ce!="string"||me.has(Ce))continue;me.add(Ce);let pe=ge[Ce],fe=Gt(ve,Ce),R=fe.operation?fe:null,E={...ke(Ce),lane:"queue",draggable:!R,discard:R||void 0,reason:$l(ie,Ce),queue_position:Y+1,queue_index:Y,queue_length:Ee.length,badges:pe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!pe,revise_action:!!pe,revise_enabled:!!pe&&!R,revise_title:pe?pe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(E);let le=h.get(V);le?le.push(E):h.set(V,[E])}for(let Y of Array.isArray(x.runnable)?x.runnable:[]){let Z=Y&&Y.bead_id;typeof Z!="string"||me.has(Z)||(me.add(Z),l.push({...ke(Z),title:Y.title||H[Z]||Z,lane:"runnable",draggable:!0,reason:$l(ie,Z),created_at:Y.created_at??void 0,updated_at:Y.updated_at??void 0,labels:Array.isArray(Y.labels)?Y.labels:[],spec_reviewer:typeof Y.spec_reviewer=="string"?Y.spec_reviewer:void 0,plan_state:Y.plan_state==="approved"||Y.plan_state==="authored"?Y.plan_state:"none",workflow:Y.route?{route:Y.route,chips:{route:Y.route}}:null,place_index:Ee.length}))}for(let Y of ye){let Z=Y&&Y.bead_id;if(typeof Z!="string"||me.has(Z)||(me.add(Z),o!==void 0&&typeof Y.added_at=="number"&&Y.added_at<o))continue;let Ce=Wp(S,Z);m.push({...ke(Z),lane:"done",done:!0,usage:Rt(S,Z),done_at:typeof Y.added_at=="number"?Y.added_at:void 0,done_kind:Ce&&typeof Ce.done_kind=="string"?Ce.done_kind:null})}}let A=new Map;s.forEach((x,V)=>{x&&typeof x.root_dir=="string"&&A.set(x.root_dir,V)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,V)=>{if($==="repo"){let D=A.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(V.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==S)return D-S}let te=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,I=typeof V.started_at=="number"&&Number.isFinite(V.started_at)?V.started_at:null;return te!==null&&I!==null&&te!==I?te-I:te===null&&I!==null?1:te!==null&&I===null?-1:x.id.localeCompare(V.id)}),m.sort((x,V)=>(V.done_at??0)-(x.done_at??0));let T=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),z=[];for(let x of T)!x||typeof x.root_dir!="string"||z.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=bn?x.slots:bn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Tt(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Tt(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:l,queue:f,queue_groups:z,running:c,pr_wait:u,done:m,automation:{total:z.length,both_on:z.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Yp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<jp;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ft(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${At(e,t)}</span
        >`}</span
  >`}function vn(e){return i`<div class="mon-c__title">${e.title}</div>`}function yn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function fs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function To(e){let t=gt(e.usage),r=Nt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Br(e.usage)}
        >${r}</span
      >`:""}function Eo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Vp(e){return i`<span class="mon-c__ops">
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
          ${hl()}
        </button>`:""}
  </span>`}function Kp(e,t){let r=typeof e.started_at=="number"?ko(t-e.started_at):"";return i`${vn(e)}
    <div class="mon-c__meta">
      ${Eo(e)}${Yp(e.last_event_at,t)}${yn(e)}${fs(e)}
      ${Wt(e)?i`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${ur(e)?i`<span
            class="rtile__resumed"
            title=${ur(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${To(e)}${Vp(e)}${sr(e)}
    </div>`}function Zp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=At(e.updated_at);return i`${vn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${yn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${qn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${fs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
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
    </div>`}function Xp(e){let t=!!e.discard?.operation;return i`${vn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${yn(e)}
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
    ${sr(e)}
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
        </div>`:""}`}function Qp(e){let t=!!(Nt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${vn(e)}
    <div class="mon-c__meta">
      ${yn(e)}${fs(e)}
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
          ${sr(e)}
        </div>`:""}`}function Jp(e,t){let r=e.done_kind||"",n=r?zp[r]||r:"",s=At(e.done_at,t);return i`${vn(e)}
    <div class="mon-c__meta">
      ${yn(e)}${fs(e)}
      ${n?i`<span
            class="mon-live__kind${Hp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${To(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${ft(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function xl(e,t){return e.lane==="running"?Kp(e,t):e.lane==="runnable"?Zp(e):e.lane==="queue"?Xp(e):e.lane==="pr_wait"?Qp(e):Jp(e,t)}function Sl(e){let t=String(e.revision);return i`<header
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
  </header>`}function Al(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
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
  </div>`}function Tl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function El(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gt(zn(t));let r={};for(let l of Jt)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of Jt){let m=c[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Nt(r):null}var Rl="bdui.monitor.done-range",Il="bdui.monitor.running_sort";function ef(){try{let e=window.localStorage.getItem(Rl);return Ct(e)?e:St}catch{return St}}function tf(e){try{window.localStorage.setItem(Rl,e)}catch{}}function rf(){try{return window.localStorage.getItem(Il)==="repo"?"repo":"started"}catch{return"started"}}function nf(e){try{window.localStorage.setItem(Il,e)}catch{}}var Ll="tab:monitor:pipeline",sf=1e3,of=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Cl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
  </div>`}function Ol(e,t){let r=st("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(L=>typeof globalThis.confirm!="function"||globalThis.confirm(L)),m=ef(),h=rf();function A(){let L=Ht.find(W=>W.value===m);return L?L.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let T=Ao(null,null),z=null,x=new Map,V=new Set;function te(L){return T.queue_groups.find(W=>W.root_dir===L)||null}let D=is(e,{queueStore:{get(){if(!z)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let L=x.get(z);if(L)return L;let W=te(z),B=s&&s.get?s.get():null,w=(Array.isArray(B)?B:[]).find(C=>C&&C.root_dir===z);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},default_exec_preset_id:W?W.default_exec_preset_id:null,runner_catalog:W?W.runner_catalog:null,workspace_info:w?w.workspace_info:void 0}},set(L){z&&x.set(z,L);for(let W of Array.from(V))W()},subscribe(L){return V.add(L),()=>V.delete(L)}},presetStore:a,transport:o?(L,W)=>o(L,L==="worker-queue-set-default-exec-preset"||L==="get-worker-system-prompt"?{...W||{},root_dir:z}:W):void 0}),S=null,H=null;async function F(L,W,B,w,C=!0){if(!o||!B)return null;let N=await o(L,{...W,root_dir:B,expected_revision:w});if(N&&N.conflict&&C){N.queue&&x.set(B,N.queue);let G=N.queue&&typeof N.queue.revision=="number"?N.queue.revision:w;N=await o(L,{...W,root_dir:B,expected_revision:G})}return N&&N.queue&&B&&x.set(B,N.queue),N}function ie(L,W){let B=x.get(L),w=s&&s.get?s.get():null,C=(Array.isArray(w)?w:[]).find(G=>G?.root_dir===L);return(B||C)?.merge_queue?.find(G=>G.bead_id===W)?.continuation_action}async function ge(L,W,B,w){let C=await F(L,W,B,w),N=x.get(B)?.revision??C?.queue?.revision??w;return Qt(C,(G,X)=>F(L,{...W,continuation:G,decision_token:X},B,N,!1),{refresh:G=>F(L,W,B,G?.queue?.revision??x.get(B)?.revision??N,!1)})}async function ce(L,W,B,w){let C=await Qt({continuation_mismatch:w},(G,X)=>F("worker-merge-queue-add",{bead_id:W,continuation:G,decision_token:X},L,B,!1)),N=C?.queue?.merge_queue?.find(G=>G.bead_id===W)?.continuation_action;C?.applied!==!0&&N?.continuation===null&&N.mismatch&&await ce(L,W,C.queue.revision,N.mismatch)}async function $e(L,W,B){let w=await F("worker-discard",L,W,B);if(w&&w.discarded===!0){Q(ds(w),"success",5e3);return}if(w&&w.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ve(L,W,B){return!o||!B?null:await o(L,{...W,root_dir:B})}async function Ue(L){if(!o||!L&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:L}),B=W&&Array.isArray(W.failed)?W.failed:[];B.length>0&&Q(`\uC790\uB3D9\uD654 ${L?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${B.map(w=>w.root_dir).join(", ")}`,"error",3200)}async function Ge(){let L=new Map;for(let W of T.pr_wait)L.has(W.root_dir)||L.set(W.root_dir,W.expected_revision);for(let[W,B]of L)await F("worker-merge-queue-add-all",{},W,B)}let Fe=null,Ee=!1,ye=null;function _e(){ye!==null&&clearTimeout(ye),ye=setTimeout(()=>{ye=null,Ee=!1},0)}function ke(L){let W=L.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function me(L){let W=ke(L);return!W||!Fe?null:(W.getAttribute("data-root-dir")||"")===Fe.root_dir?W:null}function Y(){for(let L of Array.from($.querySelectorAll(".mon-group--drag-over")))L.classList.remove("mon-group--drag-over")}function Z(L){let W=L.target,B=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(B){Fe={bead_id:B.getAttribute("data-issue-id")||"",lane:B.getAttribute("data-lane")||"",root_dir:B.getAttribute("data-root-dir")||"",revision:Number(B.getAttribute("data-revision")||0)||0,queue_index:Number(B.getAttribute("data-queue-index")),queue_length:Number(B.getAttribute("data-queue-length")),place_index:Number(B.getAttribute("data-place-index"))},Ee=!0;try{L.dataTransfer?.setData("text/plain",Fe.bead_id),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}catch{}}}function Ce(L){let W=me(L);W&&(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function pe(L){ke(L)?.classList.remove("mon-group--drag-over")}function fe(){Fe=null,Y(),_e()}function R(L){let W=me(L),B=Fe;if(Fe=null,Y(),!W||!B||!B.bead_id)return;L.preventDefault();let w=L.target,C=typeof w?.closest=="function"?w.closest('.mon-card[data-lane="queue"]'):null,N=C&&W.contains(C)?Number(C.getAttribute("data-queue-index")):NaN;if(B.lane==="runnable"){let Le=Number.isFinite(N)?N:B.place_index;if(!Number.isFinite(Le))return;F("worker-queue-place",{bead_id:B.bead_id,index:Le},B.root_dir,B.revision);return}if(B.lane!=="queue"||C&&C.getAttribute("data-issue-id")===B.bead_id)return;let G=B.queue_index,X=Number.isFinite(N)?G>N?N:N-1:B.queue_length-1;!Number.isFinite(X)||X<0||X===G||F("worker-queue-reorder",{bead_id:B.bead_id,to_index:X},B.root_dir,B.revision)}function E(L){let W={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return i`${Al({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:h,done_range:m,token_total:El(T.done),token_tooltip:Tl(A())})}
      <div class="worker-lanes mon-lanes">
        ${of.map(B=>{let w=W[B.lane],C=B.lane==="queue"?T.queue_groups.length>0?i`${T.queue_groups.map(N=>i`<div
                        class="mon-group"
                        data-root-dir=${N.root_dir}
                      >
                        ${Sl(N)}
                        <div class="mon-group__list">
                          ${N.items.map(G=>Cl(G,L))}
                        </div>
                      </div>`)}`:void 0:w.length>0?i`${w.map(N=>Cl(N,L))}`:void 0;return Yt({id:`monitor-${B.lane}`,lane:B.pane,title:B.lane==="done"?`\uC644\uB8CC\xB7${A()}`:B.title,items:w,empty:B.empty,body:C,live:B.lane==="running"&&w.length>0,header_control:B.lane==="pr_wait"&&w.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function le(){let L=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],B=u();T=Ao(L,W,{done_since:$r(m,B),running_sort:h}),Pe(E(B),$)}function qe(L,W){let B=l?l():void 0;if(!W||!B||W===B||!c){n(L);return}c(W).then(()=>{n(L)}).catch(w=>{r("workspace switch for %s failed: %o",W,w)})}function Ie(L){return{root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0}}function we(L,W){let{root_dir:B,revision:w}=Ie(L),C=L.getAttribute("data-issue-id")||"",N=W.dataset.attemptId||L.getAttribute("data-attempt-id")||"",G=W.classList;if(G.contains("worker-card__place")){F("worker-queue-place",{bead_id:C,index:Number(L.getAttribute("data-place-index")||0)||0},B,w);return}if(G.contains("mon-op--up")||G.contains("mon-op--down")){let X=Number(L.getAttribute("data-queue-index")||0)||0,Le=G.contains("mon-op--up")?X-1:X+1;if(Le<0)return;F("worker-queue-reorder",{bead_id:C,to_index:Le},B,w);return}if(G.contains("mon-op--remove")){F("worker-queue-remove",{bead_id:C},B,w);return}if(G.contains("mon-op--pause")){ve("worker-attempt-pause",{attempt_id:N},B);return}if(G.contains("mon-op--discard")){if(!f(gn(C,"unmerged")))return;$e({bead_id:C,...N?{attempt_id:N}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,w);return}if(G.contains("mon-op--resume")){ge("worker-attempt-resume",{attempt_id:N},B,w);return}if(G.contains("mon-op--dismiss")){F("worker-attempt-dismiss",{attempt_id:N},B,w);return}if(G.contains("worker-mini__merge")){let X=ie(B,C);X?.mismatch&&X.continuation===null?ce(B,C,w,X.mismatch):F("worker-merge-queue-add",{bead_id:C},B,w);return}if(G.contains("worker-mini__merge-cancel")){F("worker-merge-queue-remove",{bead_id:C},B,w);return}if(G.contains("worker-mini__discard")){let X=W.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(gn(C,X)))return;$e({bead_id:C,...N?{attempt_id:N}:{},...W.dataset.operationId?{operation_id:W.dataset.operationId}:{}},B,w);return}if(G.contains("worker-mini__revise-fix")){ge("worker-revise-fix",{bead_id:C},B,w);return}G.contains("worker-mini__revise-approve")&&F("worker-revise-approve",{bead_id:C},B,w)}function xe(L){let W=Ee;Ee=!1;let B=L.target;if(!B||typeof B.closest!="function"||B.closest("dialog")||B.closest("a"))return;let w=B.closest(".mon-running-sort");if(w){L.preventDefault(),h=w.getAttribute("data-sort")==="repo"?"repo":"started",nf(h),le();return}let C=B.closest(".mon-auto-all");if(C){L.preventDefault(),Ue(C.getAttribute("data-on")==="true");return}if(B.closest(".mon-merge-all")){L.preventDefault(),Ge();return}let G=B.closest(".mon-ctl--advance");if(G){L.preventDefault();let{root_dir:ot,revision:et}=Ie(G);F("worker-automation-toggle",{on:G.getAttribute("data-on")==="true"},ot,et);return}let X=B.closest(".mon-ctl--merge-auto");if(X){L.preventDefault();let{root_dir:ot,revision:et}=Ie(X);F("worker-merge-auto-toggle",{on:X.getAttribute("data-on")==="true"},ot,et);return}let Le=B.closest(".mon-ctl--exec");if(Le){L.preventDefault(),z=Le.getAttribute("data-root-dir")||null,x.delete(z||""),D.open();return}let Se=B.closest(".mon-card");if(!Se)return;let Oe=B.closest("button");if(Oe){L.preventDefault(),we(Se,Oe);return}let ze=Se.getAttribute("data-issue-id");ze&&!W&&(L.preventDefault(),qe(ze,Se.getAttribute("data-root-dir")||""))}function Ke(L){let W=L.target;if(!W||typeof W.closest!="function")return;let B=W.closest(".mon-done-range");if(B){m=Ct(B.value)?B.value:St,tf(m),le();return}let w=W.closest(".mon-slots__input");if(!w)return;let{root_dir:C,revision:N}=Ie(w),G=Number(w.value);if(!Number.isFinite(G))return;let X=Math.max(bn,Math.floor(G));F("worker-queue-set-slots",{slots:X},C,N)}e.addEventListener("click",xe),e.addEventListener("change",Ke),e.addEventListener("dragstart",Z),e.addEventListener("dragover",Ce),e.addEventListener("dragleave",pe),e.addEventListener("drop",R),e.addEventListener("dragend",fe),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),le();for(let L of Array.from(V))L()}catch{}}));function Ne(){H!==null&&(clearInterval(H),H=null)}function Xe(){ye!==null&&(clearTimeout(ye),ye=null)}return{load(){r("load"),le(),H===null&&(H=setInterval(()=>{try{le()}catch{}},sf))},pause(){Ne()},clear(){Ne(),Xe(),S&&(S(),S=null),e.removeEventListener("click",xe),e.removeEventListener("change",Ke),e.removeEventListener("dragstart",Z),e.removeEventListener("dragover",Ce),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",R),e.removeEventListener("dragend",fe),D.destroy(),V.clear(),e.replaceChildren()}}}function Dl(e,t,r){let n=st("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){Pe(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Pe(i``,e)}}}var Ml=["bug","feature","task","epic","chore"];function Nl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Pl=["Critical","High","Medium","Low","Backlog"];function Fl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let S of Ml){let H=document.createElement("option");H.value=S,H.textContent=Nl(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let F=Pl[S]||"Medium";H.textContent=`${S} \u2013 ${F}`,a.appendChild(H)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(D){s.disabled=D,o.disabled=D,a.disabled=D,l.disabled=D,c.disabled=D,f.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function z(){u.textContent=""}function x(D){u.textContent=D}function V(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function te(){let D=o.value||"",S=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function I(){z();let D=String(s.value||"").trim();if(D.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),F=String(c.value||""),ie={title:D};H.length>0&&(ie.type=H),String(S).length>0&&(ie.priority=S),F.length>0&&(ie.description=F),T(!0);try{await t("create-issue",ie)}catch{T(!1),x("Failed to create issue");return}te(),T(!1),$()}return r.addEventListener("cancel",D=>{D.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),I())}),n.addEventListener("submit",D=>{D.preventDefault(),I()}),{open(){n.reset(),z(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var af=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ql(e){return String(e).padStart(2,"0")}function lf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function cf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ql(n.getHours())}:${ql(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${af[n.getMonth()]} ${n.getDate()} ${o}`;return`${lf(r,t)} \xB7 ${l}`}function df(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Bl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Ul(e){let t=!1,r=null,n=new Map;function s(){Pe(i``,e),e.hidden=!0}function o(){let c=Bl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Pe(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let m=n.get(f.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,A=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map($=>{let T=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,z=Math.min(100,Math.max(0,T)),V=`resets ${cf($.resetsAt,u)}${h?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${df(z)}"
                style=${`--progress: ${z}%`}
                title=${V}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${z}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Bl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var uf="worker-ineligible";function Co(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function jl(e){return Co(e).includes(uf)}var Ro="worker-serial";function wn(e){return Co(e).includes(Ro)}var pf=20,zl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Hl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function ff(e,t,r=pf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Wl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function _f(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Gl(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Yl(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function mf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
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
  </div>`}function gf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
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
          >${_f(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Yl(fl(t.failure_kind,n)):""}
      ${mf(t)}
      ${Gl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ls(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hf(e){let t=e.cleanup,r=Ir(t.step);return i`<li
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
        ${cl(t.step).map(n=>i`<li
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
        ${t.repair_eligible?i`<button
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
  </li>`}function bf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?hf(t):gf(t))}
        </ul>`}
  </section>`}function Vl(e,t={}){let r=null;function n(){Pe(r?bf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:ff(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var vf="tab:worker:ready",yf="tab:worker:blocked",wf="tab:worker:in-progress",kf="tab:worker:closed",kn=1,$f=new Set(["done","failed","orphaned","stopped","discarded"]);function Kl(e){return _n(e).path.length>0}var Ql="beads-ui.worker.candidate-filter",Io={show_blocked:!1,spec:"all"};function xf(){try{let e=window.localStorage.getItem(Ql);if(!e)return{...Io};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Io};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Io}}}function Sf(e){try{window.localStorage.setItem(Ql,JSON.stringify(e))}catch{}}function Af(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Tf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jl="bdui.worker.candidate_sort",Ef=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],_s="spec";function Cf(){try{let e=window.localStorage.getItem(Jl);return e==="board"||e==="created"||e==="spec"?e:_s}catch{return _s}}function Rf(e){try{window.localStorage.setItem(Jl,e)}catch{}}var ec="bdui.worker.done-range";function If(){try{let e=window.localStorage.getItem(ec);return Ct(e)?e:St}catch{return St}}function Lf(e){try{window.localStorage.setItem(ec,e)}catch{}}var Of="(max-width: 640px)",tc="beads-ui.worker.lane-collapsed",$n={queue:!0,done:!0};function Df(){try{let e=window.localStorage.getItem(tc);if(!e)return{...$n};let t=JSON.parse(e);return!t||typeof t!="object"?{...$n}:{queue:typeof t.queue=="boolean"?t.queue:$n.queue,done:typeof t.done=="boolean"?t.done:$n.done}}catch{return{...$n}}}function Mf(e){try{window.localStorage.setItem(tc,JSON.stringify(e))}catch{}}function Zl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Nf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Sr):(n.sort(On(r)),t==="board"?n:[...n.filter(Kl),...n.filter(s=>!Kl(s))])}function Pf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ff(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Bf=["closed_unmerged","review","undecidable"],Uf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function jf(e,t){for(let r of Uf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Xl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function zf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Lo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Hf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Wf(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,m=null,h=null,A={},$=!1){let T=!!c&&c.position>0,z=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,V=c&&c.failure||null,te=r[e]||null,I=te&&te.gate?te.gate:null,D=te&&te.pr?te.pr:null,S=Hf(h),H=zf(c?c.resolution:null),F=[];l&&F.push("\uC138\uC158");let ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,ge=jf(l&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",ie?null:o&&o.activity||null);if(ie&&F.push(ie),ge.label&&F.push(ge.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&F.push(I.base_badge),m&&F.push(m),n){let ke=Ir(n.step);F.push(ke?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ke}`:"\uC815\uB9AC \uBA48\uCDA4")}S&&F.push(S.badge),T&&!x&&F.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),V&&F.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Xl(V)}`),z&&F.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&F.push(`\uC790\uB3D9 \uC81C\uC678: ${Xl(f)}`);let ce=!!I&&I.base_badge==="\uCDA9\uB3CC",$e=!!I&&I.enabled===!0,ve=vo(o&&o.merge_progress?o.merge_progress.step:null),Ue=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!I&&I.tier==="merged",Ge=l&&!!n&&!!I&&I.tier==="merged",Fe=l&&ce&&u===!1,Ee=Gt(A,e,{external:l,merge_active:x||!!ve,merge_queued:T,conflict_active:!!a,cleanup_active:!1,merged:!!n||I?.tier==="merged"}),ye=!!Ee.operation,_e=!Ue&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?us(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:F,live_badge:a==="paused"?null:H?.live||a==="running"?ie:ge.live?ge.label:null,usage:s,alert:!!I&&Bf.includes(I.tier)||!!n||!!V||!!(S&&S.alert),merge_action:_e?!1:!T||z,timeline_action:_e,cancel_action:T&&!z,cancel_enabled:!x&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ee,discard_action:Ee.action,merge_step:ve,discard_enabled:Ee.enabled,discard_title:Ee.title,merge_enabled:!ve&&!a&&!ye&&!(S&&S.lock_actions)&&!Fe&&!_e&&($e||ce||Ue||Ge),merge_label:z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ue||Ge?"\uC815\uB9AC \uC7AC\uAC1C":ce&&!ve&&!Ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ye?Ee.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ee.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ve.label}`:Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Fe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ce?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":$e?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:m}=t,h=n?Mn(n,l):null,A=Pn({transport:r,uiOrderStore:l}),$=null,T=[],z=xf(),x=Cf(),V=Ct(f)?f:If(),te=new Map;function I(){let p=Ht.find(y=>y.value===V);return p?p.label:"\uC624\uB298"}let D=Df(),S=!1,H=new Set,F=new Set,ie=new Set,ge=new Set,ce="ordinary",$e=!1,ve=new Map,Ue=[],Ge=document.createElement("div");Ge.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let Ee=document.createElement("div");Ee.className="worker-drawer-overlay",Ee.hidden=!0;let ye=document.createElement("div");ye.className="worker-drawer-overlay__backdrop";let _e=document.createElement("div");_e.className="worker-drawer-host";let ke=document.createElement("div");ke.className="worker-drawer-host",ke.hidden=!0,Ee.append(ye,_e,ke);let me=document.createElement("div");me.className="worker-lanes-host",Ge.append(Fe,Ee,me),e.appendChild(Ge);let Y=null,Z=ns(_e,{transport:r,sessionLogStore:a,onClose:()=>{Y=null,Ee.hidden=!0,ne()}}),Ce=Vl(ke,{onClose:()=>{ke.hidden=!0,Ee.hidden=!0,ne()}}),pe=is(Ge,{queueStore:s,presetStore:o,transport:r});function fe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:kn,queue:[],pr_wait:[],done:[]}}function R(){let p=fe();return typeof p.revision=="number"?p.revision:0}function E(p){p&&p.queue&&s&&s.set(p.queue)}function le(){let p=fe().queue;return Array.isArray(p)?p.length:0}async function qe(p,y){if(!r)return;let q=await r("worker-queue-place",{bead_id:p,index:y,expected_revision:R()});E(q),q&&q.conflict&&await r("worker-queue-place",{bead_id:p,index:y,expected_revision:R()}).then(E)}async function Ie(p,y){if(!r)return;let q=await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:R()});E(q),q&&q.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:R()}).then(E)}async function we(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:R()});E(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:R()}).then(E)}async function xe(){if(!r||$e)return;let y=(Array.isArray(fe().queue)?fe().queue:[]).map(U=>U.bead_id).filter(U=>ge.has(U));if(y.length===0)return;if(y.some(U=>{let b=ve.get(U);return b!==!0&&b!==!1})){Q("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let q=ce==="serial",se=y.filter(U=>ve.get(U)!==q);if(se.length===0){ge.clear(),ne(),Q("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}$e=!0,ne();let ue=[],be=0;try{for(let U of se){let b=await Promise.resolve(r(q?"label-add":"label-remove",{id:U,label:Ro})).catch(()=>[]),O=Array.isArray(b)?b[0]:b,J=O&&typeof O=="object"?O.labels:null;O&&typeof O=="object"&&O.id===U&&Array.isArray(J)&&wn(J)===q?be+=1:ue.push(U)}if(ue.length===0){ge.clear(),Q(`${be}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ge.clear();for(let U of ue)ge.add(U);Q(`${se.length}\uAC1C \uC911 ${be}\uAC1C \uBCC0\uACBD \xB7 ${ue.length}\uAC1C \uC2E4\uD328 (${ue.join(", ")})`,"error")}finally{$e=!1,ne()}}async function Ke(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ne(p){if(!r||!p)return;let y=async(se={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:R(),...se}),q=await y();E(q),q&&q.conflict&&(q=await r("worker-attempt-resume",{attempt_id:p,expected_revision:R()}),E(q)),q=await Qt(q,(se,ue)=>y({continuation:se,decision_token:ue}),{onResult:E,refresh:()=>y()}),q&&q.resumed===!1&&!q.conflict&&q.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${q.reason}`,"error",2400)}async function Xe(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:R()});E(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:R()}),E(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function L(p,y,q=!0){if(!r)return null;let se=r,ue=await se(p,{...y,expected_revision:R()});return E(ue),ue&&ue.conflict&&q&&(ue=await se(p,{...y,expected_revision:R()}),E(ue)),ue}async function W(p){if(!r||!p)return;let y=fe().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await w(p,y.mismatch);return}H.add(p),ne();let q;try{q=await L("worker-merge-queue-add",{bead_id:p})}finally{H.delete(p),ne()}!q||q.conflict||q.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function B(p){if(!(!r||!p||F.has(p))){F.add(p),ne();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:R()});E(y),y&&!y.retried&&!y.conflict&&y.reason&&Q(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{F.delete(p),ne()}}}async function w(p,y){let q=await Qt({continuation_mismatch:y},(ue,be)=>L("worker-merge-queue-add",{bead_id:p,continuation:ue,decision_token:be},!1)),se=q?.queue?.merge_queue?.find(ue=>ue.bead_id===p)?.continuation_action;if(q?.applied!==!0&&se?.continuation===null&&se.mismatch){await w(p,se.mismatch);return}q&&q.applied===!1&&!q.conflict&&Q("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function C(p){if(!r)return;let y=await L("worker-merge-auto-toggle",{on:p});!y||y.conflict||Q(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function N(p){if(!r||!p)return;let y=await L("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function G(){await L("worker-merge-queue-remove",{all:!0})}async function X(p,y=null,q="unmerged",se=null){if(!r||!p)return;let ue=gn(p,q);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ue)))return;let U=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...se?{operation_id:se}:{},expected_revision:R()});if(E(U),U&&U.conflict&&(U=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...se?{operation_id:se}:{},expected_revision:R()}),E(U)),U&&U.discarded===!0){Q(ds(U),"success",5e3);return}if(U&&U.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${U.reason}`,"error",2800);return}if(U&&U.accepted&&U.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(U&&U.accepted&&!U.discarded){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${U.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}U&&!U.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Le(p,y){if(!r||!y||ie.has(y))return;ie.add(y),ne();let q;try{let se=async(ue={})=>await r(p,{bead_id:y,expected_revision:R(),...ue});q=await se(),E(q),q&&q.conflict&&(q=await r(p,{bead_id:y,expected_revision:R()}),E(q)),p==="worker-revise-fix"&&(q=await Qt(q,(ue,be)=>se({continuation:ue,decision_token:be}),{onResult:E,refresh:()=>se()}))}finally{ie.delete(y),ne()}if(!(!q||q.conflict)){if(q.ok){Q(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${q.reason||""}`,"error",3e3)}}async function Se(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:R()});E(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:R()}).then(E)}async function Oe(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(E(y),y&&y.ok===!1){Q(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&Q("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ze(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});E(y),y&&y.ok===!1&&Q(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function ot(p){if(!r||!Number.isFinite(p))return;let y=Math.max(kn,Math.floor(p)),q=await r("worker-queue-set-slots",{slots:y,expected_revision:R()});E(q),q&&q.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:R()}).then(E)}async function et(p){if(!r)return;let y=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:R()});E(y),y&&y.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:R()}).then(E)}function ut(){let p=fe(),y=h?h.selectBoardColumn(vf,"ready"):[],q=h?h.selectBoardColumn(yf,"blocked"):[],se=h?h.selectBoardColumn(kf,"closed"):[],ue=h?h.selectBoardColumn(wf,"in_progress"):[],be=new Map;for(let g of ue){let M=Ff(g);if(!M)continue;let oe=be.get(M);oe?oe.push(g):be.set(M,[g])}let U=g=>{let M=Nn(be.get(g)||[]);return M?M.title||M.id:null},b=p.bead_titles||{},O=new Map;for(let[g,M]of Object.entries(b))typeof M=="string"&&M.length>0&&O.set(g,M);for(let g of[...y,...q])O.set(g.id,g.title||g.id);ve.clear();let J=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},De=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,M]of Object.entries(De))Array.isArray(M)&&ve.set(g,wn(M));for(let g of[...y,...q]){let M=g.labels;if(!Array.isArray(M))continue;if(!ve.has(g.id)){ve.set(g.id,wn(M));continue}let oe=J[g.id],We=Xt(oe&&typeof oe=="object"?oe.updated_at:null),zt=Xt(g.updated_at);zt!==null&&We!==null&&zt>We&&ve.set(g.id,wn(M))}let Ze=new Map;for(let[g,M]of Object.entries(J))M&&typeof M=="object"&&Ze.set(g,M);for(let g of[...y,...q])Ze.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Be=g=>Ze.get(g)||{},_=p.pr_wait||[],d=p.pr_observations||{},k=p.pr_activity||{},v=p.cleanup_failed||{},P=Object.entries(v).map(([g,M])=>({bead_id:g,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),ee=p.queue||[],he=new Set(ee.map(g=>g.bead_id));for(let g of ge)he.has(g)||ge.delete(g);let ct=new Set([...ee.map(g=>g.bead_id),..._.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),re=new Set(q.map(g=>g.id)),Qe=l?l.get()?.order||{}:{},ar=new Set,Po=[];for(let g of[...y,...q])ct.has(g.id)||ar.has(g.id)||Pf(g)||jl(g.labels)||(ar.add(g.id),Po.push(g));T=Nf(Po,x,Qe);let fc=p.admission||{},Fo=g=>{let M=fc[g];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof M.reason=="string"?M.reason:"",We=oe.indexOf(":");return We>0&&We<oe.length-1?`\u26D4 ${oe.slice(0,We)} (${oe.slice(We+1)})`:`\u26D4 ${oe}`},_c=T.map(g=>{let M=_n(g),oe=M.path.length>0,We=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!We&&oe&&!M.conflict,ir=re.has(g.id),Et=[];ir&&Et.push(qf(g)),We?Et.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):M.conflict?Et.push("spec_id_conflict"):oe||Et.push("spec \uC5C6\uC74C");let Cn=Fo(g.id);return Cn&&Et.push(Cn),{id:g.id,title:g.title||g.id,reason:Et.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:We,status:g.status,blocked:ir,has_spec:oe}}),ms=Af(_c,z),mc=ms.visible,gc=p.revise_parked||{},Wr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},qo=(g,M)=>g.map(oe=>{let We=M==="queue"?gc[oe.bead_id]:null,zt=M==="queue"?Gt(Wr,oe.bead_id):null,ir=zt?.operation?zt:null,Et=M==="queue"?ve.has(oe.bead_id)?ve.get(oe.bead_id)||!1:null:!1,Cn=Et===!0&&(Object.values(p.attempts||{}).some(Kt=>Kt&&Kt.bead_id!==oe.bead_id&&!$f.has(Kt.status))||_.some(Kt=>Kt.bead_id!==oe.bead_id)||Object.values(Wr).some(Kt=>Kt&&Kt.bead_id!==oe.bead_id&&Kt.phase!=="done")),sa=M==="done"?[]:[Fo(oe.bead_id)];return Cn&&sa.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:oe.bead_id,title:O.get(oe.bead_id)||oe.bead_id,reason:sa.filter(Boolean).join(" \xB7 "),draggable:M!=="done"&&!ir,done:M==="done",lane:M,selectable:M==="queue",selected:M==="queue"&&ge.has(oe.bead_id),worker_serial:Et,discard:ir,badges:We?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!We,revise_action:!!We,revise_enabled:!!We&&!ir&&!ie.has(oe.bead_id),revise_title:We?We.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${We.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?Rt(p.attempts||{},oe.bead_id):null,done_at:M==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,...Be(oe.bead_id)}}),Bo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Bo.set(g.bead_id,g.added_at);let Gr=p.attempts?Object.values(p.attempts):[],gs=new Set;for(let g of Gr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&gs.add(g.resumed_from);let hs=new Map;for(let g of Gr)hs.set(g.bead_id,g.attempt_id);let bs=new Map;for(let g of Gr)bs.set(g.attempt_id,g);function vs(g){let M=new Set,oe=g;for(;oe&&!M.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;M.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&bs.get(oe.resumed_from)||null}return!1}let xn=typeof p.declared_base=="string"?p.declared_base:null;function hc(g){let M=null;for(let oe of Gr)!oe||oe.bead_id!==g||vs(oe)||(M===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=oe);return M&&typeof M.target_base=="string"?M.target_base:null}let Uo=[],jo=[],bc=g=>{let M=hs.get(g.bead_id)!==g.attempt_id,oe=Bo.get(g.bead_id),We=typeof oe=="number"&&oe>0&&typeof g.finished_at=="number"&&oe>=g.finished_at;return!M&&!We&&typeof g.dismissed_at!="number"},zo=g=>{let M=typeof g.session_id=="string"&&g.session_id.length>0,oe=gs.has(g.attempt_id);return{eligible:M&&!oe,reason:M?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dt=null;for(let g of Gr){let M=g.status==="paused"&&!gs.has(g.attempt_id);if(g.status==="running"||M)jo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:O.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:M,conflict_resolution:vs(g),base_exception:Lo(xn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(Wr,g.bead_id,{attempt_id:g.attempt_id}),usage:Rt(p.attempts||{},g.bead_id),current_child:U(g.bead_id),...Be(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&bc(g)){let oe=zo(g);Uo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:O.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(Wr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:vs(g),base_exception:Lo(xn,g.target_base),usage:Rt(p.attempts||{},g.bead_id),current_child:U(g.bead_id),...Be(g.bead_id)}),Dt=g}}let Sn=[...Uo,...jo],Ho=null;if(Dt){let g=zo(Dt),M=Dt.cause_detail;Ho={bead_id:Dt.bead_id,repo:Dt.repo||"",reason:Dt.cause||Dt.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Dt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(Wr,Dt.bead_id,{attempt_id:Dt.attempt_id})}}let vc=new Set(Sn.map(g=>g.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],Wo=new Map,Go=new Map,Yo=new Map;ys.forEach((g,M)=>{g&&typeof g.bead_id=="string"&&(Wo.set(g.bead_id,M+1),Go.set(g.bead_id,g.resolution),Yo.set(g.bead_id,g.continuation_action||null))});let Vo=p.merge_queue_state||{active:null,failures:{}},yc=Vo.failures||{},wc=p.auto_merge_skips||{},Ko=g=>{let M=wc[g];if(!M)return null;let oe=d[g],We=oe&&oe.pr?oe.pr.head_sha:null;return We&&We===M.head_sha?M.reason||"":null},An=new Map;for(let g of Sn)g.failed!==!0&&g.conflict_resolution&&(g.paused?An.has(g.bead_id)||An.set(g.bead_id,"paused"):An.set(g.bead_id,"running"));let Zo=Sn.filter(g=>!g.paused&&g.failed!==!0).length,Xo=(p.workspace_info||{}).slots,kc=typeof Xo=="number"?Xo:typeof p.slots=="number"?p.slots:kn,Qo=p.pr_wait_holds_slot===!0?kn:kc,$c=Zo>Qo,Tn=$r(V),xc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Tn===void 0||typeof g.added_at!="number"||g.added_at>=Tn).sort((g,M)=>(M.added_at||0)-(g.added_at||0)),Yr=qo(xc,"done"),Sc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Jo=[],Ac=u?.()||"";for(let g of se){let M=Xt(g.closed_at);if(typeof g.id!="string"||Sc.has(g.id)||M===null||Tn!==void 0&&M<Tn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let oe=`${Ac}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,We=te.get(oe);We===void 0&&r&&(te.set(oe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ir=Array.isArray(zt)&&zt.some(Et=>ss(typeof Et?.text=="string"?Et.text:"")?.lane==="session");te.set(oe,ir?"session":"not-session"),ne()}).catch(()=>{te.set(oe,"failed"),ne()})),We==="session"&&Jo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:M,created_at:g.created_at,updated_at:g.updated_at})}Yr.push(...Jo),Yr.sort((g,M)=>(M.done_at||0)-(g.done_at||0));let En={};for(let g of Jt)En[g]=0;let ea=!1,ta=0,ws=0,ra=0;for(let g of Yr){let M=g.usage;if(M&&typeof M=="object"){let oe=!1;for(let We of Jt)Number.isFinite(M[We])&&(En[We]+=M[We],ea=!0,oe=!0);oe&&(ws+=1,Number.isFinite(M.total_cost_usd)&&(ta+=M.total_cost_usd,ra+=1))}}ws>0&&ra===ws&&(En.total_cost_usd=ta);let na=Yr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Tc=na.length>0?gt(zn(na)):ea?Nt(En):null;return{queue:p,idToTitle:O,candidates:mc,candidate_hidden:{blocked:ms.hidden_blocked,spec:ms.hidden_spec},running:Sn,live_count:Zo,slots:Qo,over_cap:$c,failure:Ho,waiting:qo(ee.filter(g=>!vc.has(g.bead_id)),"queue"),pr_wait:_.map(g=>Wf(g.bead_id,O.get(g.bead_id)||g.bead_id,d,v[g.bead_id]||null,Rt(p.attempts||{},g.bead_id),k[g.bead_id]||(H.has(g.bead_id)||F.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),An.get(g.bead_id)||null,g.external===!0,{position:Wo.get(g.bead_id)||0,active:Vo.active===g.bead_id,failure:yc[g.bead_id]||null,resolution:Go.get(g.bead_id),continuation_action:Yo.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Ko(g.bead_id):null,Lo(xn,hc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(hs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...Be(g.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:_.map(g=>g.bead_id).filter(g=>Ko(g)!==null),declared_base:xn,done:Yr,token_total:Tc,cleanup_failures:P,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function kt(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",q=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=K(p),ue=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,U=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,b=i`<label class="worker-tgl worker-slots"
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
      </button>`,O=ml({failure:p.failure}),J=il(p.repo_operations,p.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${q} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${ue}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${b}</div>
          <div class="worker-kpi">${U}</div>
        </div>
        ${J}${O}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${q}${se}${b}</div>
        <div class="worker-kpi">
          ${ue}${be}${U}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(De=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${De.tooltip}
                >${I()} 완료 · 누적 ${De.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${J}${O}`}function nt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(q=>!q.paused&&q.failed!==!0);return i`<section
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
      ${p.running.length>0?$o(p.running,Date.now(),Y):""}
      ${p.pr_wait.map(q=>bo(q))}
    </section>`}function at(p){let y=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${z.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Tf.map(q=>i`<button
              type="button"
              class="worker-filter__chip${z.spec===q.value?" is-active":""}"
              data-spec=${q.value}
              aria-pressed=${z.spec===q.value?"true":"false"}
            >
              ${q.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function rt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Ef.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function it(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${V}
      >
        ${Ht.map(p=>i`<option value=${p.value} ?selected=${V===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function mt(){if(ge.size===0)return"";let p=Array.from(ge),y=p.some(q=>{let se=ve.get(q);return se!==!0&&se!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ce}
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
    </div>`}function j(p){let y=(p.queue.pr_wait||[]).filter(be=>be&&be.external!==!0&&typeof be.bead_id=="string"),q=new Set(p.running.filter(be=>!be.paused&&be.failed!==!0).map(be=>be.bead_id));for(let be of y)q.add(be.bead_id);let se=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||y.length===0||p.waiting.length===0||q.size<p.slots),ue=p.pr_wait.some(be=>be.worker_serial===!0);if(!(!se&&!(ue&&p.queue.auto_merge!==!0)))return i`${se?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${ue&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function K(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let q=new Set(p.auto_excluded),se=p.pr_wait.filter(ue=>ue.merge_action&&ue.merge_enabled&&!q.has(ue.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function ae(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:rt(),controls:at(p)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${nt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${mt()}${j(p)}`,collapsible:!0,collapsed:D.queue,preview:Zl(p.waiting)})}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:D.done,preview:Array.isArray(p.token_total)?p.token_total.map(q=>q.label).join(" \xB7 "):p.token_total||Zl(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${mt()}${j(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(q=>!q.paused&&q.failed!==!0),body:$o(p.running,Date.now(),Y)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function de(p){D={...D,[p]:!D[p]},Mf(D),ne()}function ne(){let p=ut();Pe(kt(p),Fe),Pe(ae(p),me)}function Re(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let q=Math.round(p.getBoundingClientRect().height);Ge.style.setProperty("--worker-ribbon-top",`${q}px`)};if(y(),typeof ResizeObserver=="function"){let q=new ResizeObserver(y);q.observe(p),Ue.push(()=>q.disconnect())}else window.addEventListener("resize",y),Ue.push(()=>window.removeEventListener("resize",y))}function Ye(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Of);S=!!p.matches;let y=q=>{let se=!!(q&&typeof q.matches=="boolean"?q.matches:p.matches);se!==S&&(S=se,ne())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),Ue.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),Ue.push(()=>p.removeListener(y)))}function tt(p){let y=p.target,q=y?.closest?.(".worker-mini__grip"),se=q?q.closest('.worker-mini[data-lane="queue"]'):y?.closest?.('.worker-card[draggable="true"]');if(!se)return;let ue=se.dataset.beadId||"",be=se.dataset.lane||"";$={bead_id:ue,from_lane:be};try{p.dataTransfer?.setData("text/plain",ue),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ae(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let q=y.dataset.lane||"";q!=="candidate"&&q!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function He(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Te(p,y){let q=T.find(U=>U.id===p);if(!q)return;let se=T.filter(U=>U.id!==p),ue=se.length;if(y){let U=y.dataset.beadId;if(U===p)return;let b=se.findIndex(O=>O.id===U);b>=0&&(ue=b)}let be=se.slice();be.splice(ue,0,q),A.applyReorder(p,be,ue)}function dt(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let q=y.dataset.lane||"",se=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",ue=$?.from_lane||"";if($=null,!se)return;let be=p.target?.closest?.(".worker-mini, .worker-card"),U=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),b=U.length;if(be){let O=U.indexOf(be);O>=0&&(b=O)}if(y.classList.contains("worker-pane--collapsed")&&(b=le()),q==="candidate"){if(ue==="candidate"){Te(se,be);return}ue==="queue"&&we(se);return}q==="queue"&&(ue==="queue"?Ie(se,b):qe(se,b))}function ht(p){z=p,Sf(p),ne()}function or(p){x=p==="board"||p==="created"||p==="spec"?p:_s,Rf(x),ne()}function Vt(p){V=Ct(p)?p:St,Lf(V),m?.(V),ne()}function Bt(p){let y=p.target?.closest?.(".worker-mini__select");if(y){let J=y.dataset.beadId||"";J&&(y.checked?ge.add(J):ge.delete(J),ne());return}let q=p.target?.closest?.(".worker-bulk__mode");if(q){ce=q.value==="serial"?"serial":"ordinary";return}let se=p.target?.closest?.(".worker-filter__blocked");if(se){ht({...z,show_blocked:se.checked});return}let ue=p.target?.closest?.(".worker-done-range");if(ue){Vt(ue.value);return}let be=p.target?.closest?.(".worker-sort");if(be){or(be.value||_s);return}let U=p.target?.closest?.(".worker-pr-wait-hold");if(U){et(U.checked);return}let b=p.target?.closest?.(".worker-slots__input");if(!b)return;let O=Number.parseInt(b.value,10);if(!Number.isFinite(O)){ne();return}ot(O).then(ne)}function pt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function $t(){let p=ut();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Ut(){Y&&Z.close(),ke.hidden=!1,Ee.hidden=!1,Ce.open($t()),ne()}function Lt(p){let y=fe(),q=y.attempts?y.attempts[p]:null;Y=p,Ce.close(),ke.hidden=!0,Ee.hidden=!1,Z.open({attempt_id:p,meta:pt(q)}),ne()}function Ot(){if(Ce.isOpen()&&Ce.refresh($t()),!Y)return;let p=fe(),y=p.attempts?p.attempts[Y]:null;if(y){Z.updateMeta(pt(y));return}Z.close()}function jt(p){let y=p.target,q=y?.closest?.(".worker-bulk__apply");if(q){q.disabled||xe();return}if(y?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-exec-defaults-dialog"))return;if(y?.closest?.(".worker-exec-defaults-btn")){pe.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){Ut();return}let se=y?.closest?.(".worker-repo-op__session");if(se){let re=se.dataset.attemptId;re&&Lt(re);return}let ue=y?.closest?.(".worker-repo-op__resolve");if(ue){Oe(ue.dataset.operationId||"");return}let be=y?.closest?.(".worker-repo-op__dismiss");if(be){ze(be.dataset.operationId||"");return}let U=y?.closest?.(".worker-cleanup__resume");if(U){let re=U.dataset.beadId;re&&B(re);return}let b=y?.closest?.(".worker-banner__resume");if(b){let re=b.dataset.attemptId;re&&Ne(re);return}let O=y?.closest?.(".worker-banner__discard");if(O){let re=O.dataset.confirmation==="merged"?"merged":"unmerged";X(O.dataset.beadId||"",O.dataset.attemptId||null,re,O.dataset.operationId||null);return}let J=y?.closest?.(".worker-banner__dismiss");if(J){let re=J.dataset.attemptId;re&&Xe(re);return}if(y?.closest?.(".worker-play")){Se(!fe().auto_advance);return}let De=y?.closest?.(".worker-merge-all");if(De){De.classList.contains("worker-merge-all--stop")?fe().auto_merge===!0?C(!1):G():C(!0);return}let Ze=y?.closest?.(".worker-pane__hd--toggle");if(Ze){let re=Ze.dataset.lane;(re==="queue"||re==="done")&&de(re);return}let Be=y?.closest?.(".worker-card__place");if(Be){let re=Be.dataset.beadId;re&&!Be.disabled&&qe(re,le());return}let _=y?.closest?.(".worker-filter__chip");if(_){let re=_.dataset.spec;(re==="all"||re==="with"||re==="without")&&ht({...z,spec:re});return}let d=y?.closest?.(".worker-mini__merge");if(d){let re=d.dataset.beadId||"";fe().cleanup_failed?.[re]?B(re):W(re);return}let k=y?.closest?.(".worker-mini__merge-cancel");if(k){N(k.dataset.beadId||"");return}let v=y?.closest?.(".worker-mini__discard");if(v){X(v.dataset.beadId||"",v.dataset.attemptId||null,v.dataset.discardMode==="merged"?"merged":"unmerged",v.dataset.operationId||null);return}let P=y?.closest?.(".worker-mini__revise-fix");if(P){Le("worker-revise-fix",P.dataset.beadId||"");return}let ee=y?.closest?.(".worker-mini__revise-approve");if(ee){Le("worker-revise-approve",ee.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let re=y?.closest?.(".rtile"),Qe=re?.dataset?.beadId,ar=re?.dataset?.attemptId;Qe&&X(Qe,ar||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let Qe=y?.closest?.(".rtile")?.dataset?.attemptId;Qe&&Xe(Qe);return}if(y?.closest?.(".rtile__pause")){let Qe=y?.closest?.(".rtile")?.dataset?.attemptId;Qe&&Ke(Qe);return}if(y?.closest?.(".rtile__resume")){let Qe=y?.closest?.(".rtile")?.dataset?.attemptId;Qe&&Ne(Qe);return}if(y?.closest?.(".rtile__session")){let Qe=y?.closest?.(".rtile")?.dataset?.attemptId;Qe&&Lt(Qe);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Ce.close(),Z.close();return}if(y?.closest?.(".worker-drawer-host"))return;let he=y?.closest?.(".rtile");if(he){if(y?.closest?.(".rtile__id")){let Qe=he.dataset.beadId;Qe&&Ar(Qe).then(ar=>{ar?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let re=he.dataset.beadId;re&&c&&c(re);return}let ct=y?.closest?.(".worker-mini, .worker-card");if(ct){let re=ct.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){re&&Ar(re).then(Qe=>{Qe?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}re&&c&&c(re)}}return e.addEventListener("dragstart",tt),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",He),e.addEventListener("drop",dt),e.addEventListener("click",jt),e.addEventListener("change",Bt),Ye(),Re(),h&&Ue.push(h.subscribe(()=>{for(let[p,y]of te)y==="failed"&&te.delete(p);ne()})),s&&Ue.push(s.subscribe(()=>{ne(),Ot()})),ne(),{load(){ne()},openExecDefaults(){pe.open()},destroy(){for(let p of Ue.splice(0))try{p()}catch{}e.removeEventListener("dragstart",tt),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",He),e.removeEventListener("drop",dt),e.removeEventListener("click",jt),e.removeEventListener("change",Bt);try{Z.destroy()}catch{}Ee.hidden=!0;try{pe.destroy()}catch{}Pe(i``,e)}}}function Do(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function rc(e,t,r,n=async()=>{},s=async()=>{}){let o=st("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(S){let F=S.target.value,ge=t.getState().workspace?.current?.path||"";if(F&&F!==ge){o("switching workspace to %s",F),l=!0,D();try{await r(F)}catch(ce){o("workspace switch failed: %o",ce)}finally{l=!1,D()}}}async function m(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||c)){o("git-pulling workspace %s",H),c=!0,D();try{await n(H)}catch(F){o("workspace git pull failed: %o",F)}finally{c=!1,D()}}}function h(S){let H=S.target;H&&e.contains(H)||T()}function A(S){S.key==="Escape"&&T()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",A),D())}function T(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),D())}function z(){u?T():$()}async function x(S){let H=S.target,F=H.value,ie=H.checked;o("toggling visibility %s \u2192 %s",F,String(ie));try{await s(F,ie)}catch(ge){o("workspace visibility toggle failed: %o",ge)}}function V(S){return S?i`
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
    `:i``}function te(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${z}
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
                ${S.map(F=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${F.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${F.path}"
                        .checked=${!H.has(F.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Do(F.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let S=t.getState(),H=S.workspace?.current,F=S.workspace?.available||[],ie=new Set(S.workspace?.hidden||[]),ge=H?.path||F[0]?.path||"";if(F.length===0)return i``;let ce=F.filter($e=>!ie.has($e.path)||$e.path===ge);if(ce.length<=1){let $e=ce[0]||F[0],ve=Do($e.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${$e.path}"
            >${ve}</span
          >
          ${te(F,ie)}
          ${V(ge)}
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
          ${ce.map($e=>i`
              <option
                value="${$e.path}"
                ?selected=${$e.path===ge}
                title="${$e.path}"
              >
                ${Do($e.path)}
              </option>
            `)}
        </select>
        ${te(F,ie)}
        ${V(ge)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Pe(I(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),Pe(i``,e)}}}var nc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Mo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sc(e,t,r=Mo()){return{id:r,type:e,payload:t}}function oc(e={}){let t=st("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],m=new Map,h=new Set;function A(I){for(let D of Array.from(h))try{D(I)}catch{}}function $(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),D=(r.jitterRatio||0)*I,S=Math.max(0,Math.round(I+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,te()},S)}function T(I){try{s?.send(JSON.stringify(I))}catch(D){t("ws send failed",D)}}function z(){for(o="open",t("ws open"),A(o),a=0;f.length;){let I=f.shift();I&&T(I)}}function x(I){let D;try{D=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let H=u.get(D.id);u.delete(D.id),D.ok?H?.resolve(D.payload):H?.reject(D.error||new Error("ws error"));return}let S=m.get(D.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(D.payload)}catch(F){t("ws event handler error",F)}else t("ws received unhandled message type: %s",D.type)}function V(){o="closed",t("ws closed"),A(o);for(let[I,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(I);a+=1,$()}function te(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",A(o),s.addEventListener("open",z),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(D){t("ws connect failed %o",D),$()}}return te(),{send(I,D){if(!nc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let S=Mo(),H=sc(I,D,S);return t("send %s id=%s",I,S),new Promise((F,ie)=>{u.set(S,{resolve:F,reject:ie,type:I}),s&&s.readyState===s.OPEN?T(H):(t("queue %s id=%s (state=%s)",I,S,o),f.push(H))})},on(I,D){m.has(I)||m.set(I,new Set);let S=m.get(I);return S?.add(D),()=>{S?.delete(D)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,te()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Gf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Yf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var No=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ac=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],hr="tab:worker:closed",Vf="bdui.worker.done-range",ic=Ll,lc="worker:queue",cc="ui:order",dc="ui:display-policy",uc="exec:presets",br="tab:board:closed",pc="beads-ui.board.closed-range";function Kf(e){let t=st("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Pe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Ul(s),o&&a&&l&&c){let ye=function(_,d){let k="Request failed",v="";if(_&&typeof _=="object"){let ee=_;if(typeof ee.message=="string"&&ee.message.length>0&&(k=ee.message),typeof ee.details=="string")v=ee.details;else if(ee.details&&typeof ee.details=="object")try{v=JSON.stringify(ee.details,null,2)}catch{v=""}}else typeof _=="string"&&_.length>0&&(k=_);let P=d&&d.length>0?`Failed to load ${d}`:"Request failed";Ee.open(P,k,v)},L=function(_){return`${p.getState().workspace.current?.path||""}\0${_}`},W=function(){le&&(le().catch(()=>{}),le=null),qe=null,Ie=null},w=function(_){we=_;let d=()=>{we!==_||p.getState().selected_id!==_||(we=null,B(_))};if(!Ne){Ke.then(d);return}d()},X=function(_,d,k,v,P){return k!==G[d]?(P().catch(()=>{}),!1):(_.set(v,P),!0)},Le=function(){let _=p.getState();et(_.view==="board"),it(_.view==="worker"),de(_.view==="monitor"),j(_.view==="board"||_.view==="worker"||!!_.selected_id)},ze=function(){let _=$r(Se);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ot=function(){let _=$r(Oe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},et=function(_){if(_)for(let[d,k]of No){if(C.has(d)||N.has(d))continue;let v=d===br?ze():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}N.add(d);let P=G.board,ee=!1;me.subscribeList(d,v).then(he=>{ee=!X(C,"board",P,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),ye(he,"board")}).finally(()=>{N.delete(d),ee&&Le()})}else nt()},nt=function(){G.board+=1;for(let[_]of No){let d=C.get(_);d&&(d().catch(()=>{}),C.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},it=function(_){if(!_){mt();return}for(let[d,k]of ac){if(at.has(d)||N.has(d))continue;let v=d===hr?ot():{type:k};try{Y.register(d,v)}catch(he){t("register %s store failed: %o",d,he)}N.add(d);let P=G.worker,ee=!1;me.subscribeList(d,v).then(he=>{ee=!X(at,"worker",P,d,he)}).catch(he=>{t("subscribe %s failed: %o",d,he),ye(he,"worker")}).finally(()=>{N.delete(d),ee&&Le()})}},mt=function(){G.worker+=1;for(let[_]of ac){let d=at.get(_);d&&(d().catch(()=>{}),at.delete(_));try{Y.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},j=function(_){if(!_){K();return}rt||(ke("subscribe-worker-queue",{id:lc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),rt=()=>ke("unsubscribe-worker-queue",{id:lc}))},K=function(){rt&&(rt().catch(()=>{}),rt=null)},de=function(_){if(!_){ne();return}ae||(ke("subscribe-monitor-pipeline",{id:ic}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),ae=()=>ke("unsubscribe-monitor-pipeline",{id:ic}))},ne=function(){ae&&(ae().catch(()=>{}),ae=null)},Ye=function(){Re||(ke("subscribe-ui-order",{id:cc}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Re=()=>ke("unsubscribe-ui-order",{id:cc}))},tt=function(){Re&&(Re().catch(()=>{}),Re=null),pe.clear()},He=function(){Ae||(ke("subscribe-display-policy",{id:dc}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Ae=()=>ke("unsubscribe-display-policy",{id:dc}))},Te=function(){Ae&&(Ae().catch(()=>{}),Ae=null),fe.clear()},ht=function(){dt||(ke("subscribe-exec-presets",{id:uc}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),dt=()=>ke("unsubscribe-exec-presets",{id:uc}))},Ut=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=ye,f=L,m=W,h=w,A=X,$=Le,T=ze,z=ot,x=et,V=nt,te=it,I=mt,D=j,S=K,H=de,F=ne,ie=Ye,ge=tt,ce=He,$e=Te,ve=ht,Ue=Ut;let Ge=document.getElementById("header-loading"),Fe=qa(Ge),Ee=al(e),_e=oc(),ke=Fe.wrapSend((_,d)=>_e.send(_,d)),me=La(ke),Y=Oa(),Z=Ma(),Ce=ha(),pe=Da(),fe=ma(),R=ga(),E=ba();_e.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&R.set({revision:d.revision,presets:d.presets})}),_e.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{Ce.set(d.workspaces,d.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{pe.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),_e.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{fe.set(d.policy)}catch{}}),_e.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{E.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),_e.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{E.append(d.attempt_id,d.event)}catch{}}),_e.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="snapshot")try{v.applyPush(d)}catch{}}),_e.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="upsert")try{v.applyPush(d)}catch{}}),_e.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",v=k?Y.getStore(k):null;if(v&&d&&d.type==="delete")try{v.applyPush(d)}catch{}});let le=null,qe=null,Ie=null,we=null,xe=()=>{},Ke=new Promise(_=>{xe=()=>_(void 0)}),Ne=!1,Xe=!1;async function B(_){let d=L(_);if(d===qe||d===Ie)return;Ie=d;let k=`detail:${_}`,v={type:"issue-detail",params:{id:_}};try{Y.register(k,v)}catch(P){t("register detail store failed: %o",P)}try{let P=await me.subscribeList(k,v);if(p.getState().selected_id!==_||L(_)!==d){await P().catch(()=>{});return}le&&await le().catch(()=>{}),le=P,qe=d}catch(P){t("detail subscribe failed: %o",P),ye(P,"issue details")}finally{Ie===d&&(Ie=null)}}let C=new Map,N=new Set,G={board:0,worker:0},Se=St;try{let _=window.localStorage.getItem(pc);Ct(_)&&(Se=_)}catch{}let Oe=St;try{let _=window.localStorage.getItem(Vf);Ct(_)&&(Oe=_)}catch{}async function ut(_){if(!Ct(_)||_===Se)return;Se=_;try{window.localStorage.setItem(pc,_)}catch{}let d=C.get(br);if(!d)return;C.delete(br),await d().catch(()=>{});let k=ze();try{Y.register(br,k)}catch(v){t("register %s store failed: %o",br,v)}try{let v=await me.subscribeList(br,k);C.set(br,v)}catch(v){t("re-subscribe %s failed: %o",br,v),ye(v,"board")}}async function kt(_){if(!Ct(_)||_===Oe)return;Oe=_;let d=at.get(hr);if(!d)return;at.delete(hr),await d().catch(()=>{});let k=ot();try{Y.register(hr,k)}catch(v){t("register %s store failed: %o",hr,v)}try{let v=await me.subscribeList(hr,k);at.set(hr,v)}catch(v){t("re-subscribe %s failed: %o",hr,v),ye(v,"worker")}}let at=new Map,rt=null,ae=null,Re=null,Ae=null,dt=null;async function or(){Ae=null,fe.clear(),dt=null,R.clear(),rt=null,ae=null,C.clear(),at.clear(),G.board+=1,G.worker+=1,ht();let _=p.getState().workspace.current?.path;if(_)try{await _e.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}He();let d=p.getState();et(d.view==="board"),it(d.view==="worker"),de(d.view==="monitor"),j(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Vt(){t("clearing all subscriptions for workspace switch"),nt(),mt(),K(),Z.clear(),tt(),Ye(),Te(),He(),W();let _=p.getState();if(_.selected_id)try{Y.unregister(`detail:${_.selected_id}`)}catch{}let d=p.getState();et(d.view==="board"),it(d.view==="worker"),de(d.view==="monitor"),j(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&w(d.selected_id)}async function Bt(_){t("requesting workspace switch to %s",_),Xe=!0;try{let d=await _e.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(p.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await Vt(),Q("Switched to "+Ut(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Q("Failed to switch workspace","error",3e3),d}finally{Xe=!1}}async function pt(_){t("requesting workspace git pull for %s",_);try{let d=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){Q("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+Ut(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,v=d?.message;if(k==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let P=v?`: ${v}`:"";throw Q(`Git pull failed${P}`,"error",3e3),d}}async function $t(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await _e.send("set-workspace-visibility",{path:_,visible:d}),await Lt()}catch(k){t("workspace visibility update failed: %o",k),Q("Failed to update project visibility","error",3e3)}}async function Lt(){try{let _=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,v=Array.isArray(_.hidden)?_.hidden.filter(ee=>typeof ee=="string"):[];p.setState({workspace:{current:k,available:d,hidden:v}});let P=window.localStorage.getItem("beads-ui.workspace");P&&(!d.some(he=>he.path===P)||v.includes(P)?window.localStorage.removeItem("beads-ui.workspace"):k&&P!==k.path&&(t("restoring saved workspace preference: %s",P),await Bt(P)))}}catch(_){t("failed to load workspaces: %o",_)}}_e.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(p.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Lt(),Vt())});let Ot=!1;if(typeof _e.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Ot=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Ot&&(Ot=!1,Q("Reconnected","success",2200),Yf(p,(k,v)=>{t(`${k}: %o`,v)}),or())};_e.onConnection(_)}let jt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(jt=_)}catch(_){t("view parse error: %o",_)}let p=Fa({config:Gf(),view:jt});_e.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=p.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{Z.set(d.queue)}catch{}});let y=Na(p);y.start();let q=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),se=async(_,d)=>{try{return await ke(_,d)}catch(k){if(q.has(_))throw k;return[]}};n&&Dl(n,p,y);let ue=document.getElementById("workspace-picker");ue&&rc(ue,p,Bt,pt,$t);let be=Fl(e,(_,d)=>ke(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>be.open())}catch{}let U=ol(e,{policyStore:fe,transport:(_,d)=>ke(_,d),labelOptions:()=>{let _=new Set;for(let[d]of No)for(let k of Y.snapshotFor(d)||[]){let v=k.labels;if(Array.isArray(v))for(let P of v)typeof P=="string"&&P.length>0&&_.add(P)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>U.open())}catch{}let b=Va(o,{gotoIssue:_=>y.gotoIssue(_),issueStores:Y,transport:se,workerQueueStore:Z,uiOrderStore:pe,displayPolicyStore:fe,closedRange:Se,onClosedRangeChange:_=>{ut(_)},onNewIssue:()=>be.open()}),O=Oo(a,{transport:se,issueStores:Y,queueStore:Z,execPresetStore:R,sessionLogStore:E,uiOrderStore:pe,gotoIssue:_=>p.setState({selected_id:_}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Oe,onDoneRangeChange:_=>{kt(_)}}),J=Ol(l,{transport:se,pipelineStore:Ce,execPresetStore:R,gotoIssue:_=>y.gotoIssue(_),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:_=>Bt(_)}),De=nl(c,{issueStores:Y,transport:se,queueStore:Z,execPresetStore:R,sessionLogStore:E,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:_=>{p.getState().view==="worker"?p.setState({selected_id:_}):y.gotoIssue(_)},onClose:()=>{let _=p.getState();p.setState({selected_id:null});try{y.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{p.setState({selected_id:null}),y.gotoView("worker"),O.openExecDefaults()}}),Ze=p.getState().selected_id;Ze&&(c.hidden=!1,De.load(Ze),w(Ze)),p.subscribe(_=>{let d=_.selected_id;d?(c.hidden=!1,De.load(d),Xe||w(d)):(De.clear(),c.hidden=!0,W())});let Be=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",l.hidden=_.view!=="monitor",et(_.view==="board"),it(_.view==="worker"),de(_.view==="monitor"),j(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&b.load(),_.view==="worker"&&O.load(),_.view==="monitor"?J.load():J.pause(),window.localStorage.setItem("beads-ui.view",_.view)};p.subscribe(Be),Be(p.getState()),Ye(),He(),ht(),Lt().finally(()=>{Ne=!0,xe()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),v=_.target,P=v&&v.tagName?String(v.tagName).toLowerCase():"",ee=P==="input"||P==="textarea"||P==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;d&&k==="n"&&(ee||(_.preventDefault(),be.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Kf(t)});export{Kf as bootstrap,Gf as readBootstrapConfig,Yf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
