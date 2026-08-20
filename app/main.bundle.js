var cu=Object.create;var po=Object.defineProperty;var du=Object.getOwnPropertyDescriptor;var uu=Object.getOwnPropertyNames;var pu=Object.getPrototypeOf,fu=Object.prototype.hasOwnProperty;var _u=(e,t,r)=>t in e?po(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var fo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var mu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of uu(t))!fu.call(e,s)&&s!==r&&po(e,s,{get:()=>t[s],enumerable:!(n=du(t,s))||n.enumerable});return e};var gu=(e,t,r)=>(r=e!=null?cu(pu(e)):{},mu(t||!e||!e.__esModule?po(r,"default",{value:e,enumerable:!0}):r,e));var dt=(e,t,r)=>_u(e,typeof t!="symbol"?t+"":t,r);var wi=fo((vg,vi)=>{var Yr=1e3,Zr=Yr*60,Xr=Zr*60,qr=Xr*24,yu=qr*7,vu=qr*365.25;vi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return wu(e);if(r==="number"&&isFinite(e))return t.long?$u(e):ku(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function wu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*vu;case"weeks":case"week":case"w":return r*yu;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Xr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Yr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ku(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=Xr?Math.round(e/Xr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Yr?Math.round(e/Yr)+"s":e+"ms"}function $u(e){var t=Math.abs(e);return t>=qr?ss(e,t,qr,"day"):t>=Xr?ss(e,t,Xr,"hour"):t>=Zr?ss(e,t,Zr,"minute"):t>=Yr?ss(e,t,Yr,"second"):e+" ms"}function ss(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var $i=fo((wg,ki)=>{function xu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=wi(),r.destroy=d,Object.keys(e).forEach(u=>{r[u]=e[u]}),r.names=[],r.skips=[],r.formatters={};function t(u){let f=0;for(let h=0;h<u.length;h++)f=(f<<5)-f+u.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(u){let f,h=null,I,S;function O(...q){if(!O.enabled)return;let Z=O,K=Number(new Date),z=K-(f||K);Z.diff=z,Z.prev=f,Z.curr=K,f=K,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let L=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(F,k)=>{if(F==="%%")return"%";L++;let W=r.formatters[k];if(typeof W=="function"){let oe=q[L];F=W.call(Z,oe),q.splice(L,1),L--}return F}),r.formatArgs.call(Z,q),(Z.log||r.log).apply(Z,q)}return O.namespace=u,O.useColors=r.useColors(),O.color=r.selectColor(u),O.extend=n,O.destroy=r.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(I!==r.namespaces&&(I=r.namespaces,S=r.enabled(u)),S),set:q=>{h=q}}),typeof r.init=="function"&&r.init(O),O}function n(u,f){let h=r(this.namespace+(typeof f>"u"?":":f)+u);return h.log=this.log,h}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let f=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(u,f){let h=0,I=0,S=-1,O=0;for(;h<u.length;)if(I<f.length&&(f[I]===u[h]||f[I]==="*"))f[I]==="*"?(S=I,O=h,I++):(h++,I++);else if(S!==-1)I=S+1,O++,h=O;else return!1;for(;I<f.length&&f[I]==="*";)I++;return I===f.length}function a(){let u=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),u}function i(u){for(let f of r.skips)if(o(u,f))return!1;for(let f of r.names)if(o(u,f))return!0;return!1}function l(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ki.exports=xu});var xi=fo((Dt,os)=>{Dt.formatArgs=Su;Dt.save=Eu;Dt.load=Tu;Dt.useColors=Au;Dt.storage=Cu();Dt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Dt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Au(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Su(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Dt.log=console.debug||console.log||(()=>{});function Eu(e){try{e?Dt.storage.setItem("debug",e):Dt.storage.removeItem("debug")}catch{}}function Tu(){let e;try{e=Dt.storage.getItem("debug")||Dt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Cu(){try{return localStorage}catch{}}os.exports=$i()(Dt);var{formatters:Ru}=os.exports;Ru.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var pn=globalThis,Qn=pn.trustedTypes,oi=Qn?Qn.createPolicy("lit-html",{createHTML:e=>e}):void 0,mo="$lit$",_r=`lit$${Math.random().toFixed(9).slice(2)}$`,go="?"+_r,bu=`<${go}>`,Mr=document,fn=()=>Mr.createComment(""),_n=e=>e===null||typeof e!="object"&&typeof e!="function",bo=Array.isArray,ui=e=>bo(e)||typeof e?.[Symbol.iterator]=="function",_o=`[ 	
\f\r]`,un=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ai=/-->/g,ii=/>/g,Lr=RegExp(`>|${_o}(?:([^\\s"'>=/]+)(${_o}*=${_o}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),li=/'/g,ci=/"/g,pi=/^(?:script|style|textarea|title)$/i,ho=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ho(1),$r=ho(2),fg=ho(3),Wt=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),di=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function fi(e,t){if(!bo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oi!==void 0?oi.createHTML(t):t}var _i=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=un;for(let i=0;i<r;i++){let l=e[i],d,u,f=-1,h=0;for(;h<l.length&&(a.lastIndex=h,u=a.exec(l),u!==null);)h=a.lastIndex,a===un?u[1]==="!--"?a=ai:u[1]!==void 0?a=ii:u[2]!==void 0?(pi.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=Lr):u[3]!==void 0&&(a=Lr):a===Lr?u[0]===">"?(a=s??un,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?Lr:u[3]==='"'?ci:li):a===ci||a===li?a=Lr:a===ai||a===ii?a=un:(a=Lr,s=void 0);let I=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===un?l+bu:f>=0?(n.push(d),l.slice(0,f)+mo+l.slice(f)+_r+I):l+_r+(f===-2?i:I)}return[fi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},mn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,u]=_i(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(mo)){let h=u[a++],I=s.getAttribute(f).split(_r),S=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:S[2],strings:I,ctor:S[1]==="."?es:S[1]==="?"?ts:S[1]==="@"?rs:Dr}),s.removeAttribute(f)}else f.startsWith(_r)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(pi.test(s.tagName)){let f=s.textContent.split(_r),h=f.length-1;if(h>0){s.textContent=Qn?Qn.emptyScript:"";for(let I=0;I<h;I++)s.append(f[I],fn()),Or.nextNode(),l.push({type:2,index:++o});s.append(f[h],fn())}}}else if(s.nodeType===8)if(s.data===go)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(_r,f+1))!==-1;)l.push({type:7,index:o}),f+=_r.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Wt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=_n(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var Jn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Kr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new ns(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),_n(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==Wt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ui(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&_n(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=mn.createElement(fi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Jn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=di.get(t.strings);return r===void 0&&di.set(t.strings,r=new mn(t)),r}k(t){bo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(fn()),this.O(fn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!_n(t)||t!==this._$AH&&t!==Wt,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Pr(this,i[n+l],r,l),d===Wt&&(d=this._$AH[l]),a||(a=!_n(d)||d!==this._$AH[l]),d===mt?t=mt:t!==mt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},es=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},ts=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},rs=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??mt)===Wt)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ns=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},mi={M:mo,P:_r,A:go,C:1,L:_i,R:Jn,D:ui,V:Pr,I:Kr,H:Dr,N:ts,U:rs,B:es,F:ns},hu=pn.litHtmlPolyfillSupport;hu?.(mn,Kr),(pn.litHtmlVersions??(pn.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Kr(t.insertBefore(fn(),o),o,void 0,r??{})}return s._$AI(e),s};var qt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function gi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function hi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function yi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ai=gu(xi(),1);function _t(e){return(0,Ai.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ti(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ci(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ri(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ii(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Iu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Si(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ei(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Iu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Li(e,t){let r=Si(e),n=Si(t);if(r!==n)return r<n?-1:1;let s=Ei(e),o=Ei(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var yo=2**20;function Qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function as(e){return(t,r)=>{let n=Qr(t,e),s=Qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function vo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Qr(i,r)-yo};if(!i)return{rank:Qr(a,r)+yo};let l=Qr(a,r),d=Qr(i,r),u=(l+d)/2;return l<u&&u<d?{rank:u}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*yo}))}}function wo(e,t={}){let r=_t(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Fr;function d(){for(let h of Array.from(a))try{h()}catch{}}function u(){s=Array.from(n.values()).sort(l)}function f(h){if(i||!h||h.id!==e)return;let I=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,I),!(I<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(I<=o)return;n.clear();let S=Array.isArray(h.issues)?h.issues:[];for(let O of S)O&&typeof O.id=="string"&&O.id.length>0&&n.set(O.id,O);u(),o=I,d();return}if(h.type==="upsert"){let S=h.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let O=n.get(S.id);if(!O)n.set(S.id,S);else{let q=Number.isFinite(O.updated_at)?O.updated_at:0,Z=Number.isFinite(S.updated_at)?S.updated_at:0;if(q<=Z){for(let K of Object.keys(O))K in S||delete O[K];for(let[K,z]of Object.entries(S))O[K]=z}}u()}o=I,d()}else if(h.type==="delete"){let S=String(h.issue_id||"");S&&(n.delete(S),u()),o=I,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function is(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Oi(e){let t=_t("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let u=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let I of Array.from(d)){let S=r.get(I);if(!S)continue;let O=S.itemsById;for(let q of u)typeof q=="string"&&q.length>0&&O.set(q,!0);for(let q of f)typeof q=="string"&&q.length>0&&O.set(q,!0);for(let q of h)typeof q=="string"&&q.length>0&&O.delete(q)}}async function o(i,l){let d=is(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let u=n.get(d);u&&u.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let h=r.get(i)||null;if(h){let I=n.get(h.key);I&&(I.delete(i),I.size===0&&n.delete(h.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:is,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let u of l.itemsById.keys())d[u]=!0;return d}}}}function Mi(){let e=_t("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,u){let f=d?is(d):"",h=r.get(l)||"",I=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,h),I&&h&&f&&h!==f){let S=t.get(l);if(S)try{S.dispose()}catch{}let O=s.get(l);if(O){try{O()}catch{}s.delete(l)}let q=wo(l,u);t.set(l,q);let Z=q.subscribe(()=>o());s.set(l,Z)}else if(!I){let S=wo(l,u);t.set(l,S);let O=S.subscribe(()=>o());s.set(l,O)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let u=s.get(l);if(u){try{u()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Di(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ni(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ko(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Lu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ou(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function qi(e){let t=_t("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Lu(n),a=Ou(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ko(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ko(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Mu=Object.freeze({workspace_config:{default_workspace:null}});function Fi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Mu.workspace_config.default_workspace}}}function ji(e={}){let t=_t("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Fi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Fi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,u)=>d!==r.workspace.hidden[u]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,u)=>d===r.worker.show_closed_children[u])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Bi(e){let t=_t("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,h)=>{let I=s++,S=Date.now();n.set(I,{type:f,start_ts:S}),t("request start id=%d type=%s count=%d",I,f,r+1),a();let O=!1,q=()=>{O||(O=!0,n.delete(I),i())},Z=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",I,f,Date.now()-S),q())},3e4);try{let K=await d(f,h),z=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",I,f,z),K}catch(K){let z=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",I,f,z,K),K}finally{clearTimeout(Z),q()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([u,f])=>({id:u,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ae(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ls(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ii),l;switch(i){case"created_desc":return l.sort(Fr),l;case"created_asc":return l.sort(Ti),l;case"updated_desc":return l.sort(Ci),l;case"priority":return l.sort(Ri),l;case"manual":default:{let d=r();return d?l.sort(as(d)):l.sort(Fr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function $t(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ft(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function cs(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ds(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},u=n(vo(i,l,d.order),a);s(d,u);let f=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let I=n(vo(i,l,h.order),a);s(h,I);let S=await t("ui-order-set",{expected_revision:h.revision,entries:I});S&&S.applied&&r.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $o(e,t){return!t||typeof e!="string"||e.length===0||us(t.visible_labels).includes(e)?!0:us(t.hidden_labels).includes(e)?!1:!us(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function ps(e,t){return us(e).filter(r=>$o(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Pu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Wi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ui={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Du={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Nu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function zi(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function qu(e){if(!e||e.fill==="none"||!e.approval_state)return zi(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Fu(e,t,r){let n=Pu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Du[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Wi[e]||e}
      </div>
    </div>
  `}function fs(e,t){if(!e||!e.stages)return"";let r=Ui[e.route]||Ui.spec_backed,n=e.stages,s=Nu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Wi[a]||a} ${a==="plan"?qu(n[a]||{}):zi(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Fu(a,n[a]||{},a===s))}
    </div>
  `}function ju(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Hi=2;function Bu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Hi).join(", "),s=r.length-Hi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function xo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function _s(e,t){if(!e)return null;let r=xo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=xo(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function Gi(e,t){let r=_s(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Uu(e){if(!e)return null;let t=xo(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Wu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Gi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of ps(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...Bu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function zu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hu(e){let t=Ft(e.created_at),r=Ft(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Gu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Li):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Hu(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${zu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${_s(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Gi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Uu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ms(e,t){let r=ju(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Wu(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?fs(e.workflow,e.status):""}
      ${Gu(e,t)}
    </article>
  `}function Jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${or.map(o=>c`<option
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
        ${e.items.map(o=>ms(o,t))}
      </div>
    </section>
  `}function Vi(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ms(n,t))}
        </div>
      </div>
    </dialog>
  `}var Vu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ku=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Yu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Zu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ki(e,t,r){return c`
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
        ${Vu.map(n=>c`<option
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
        ${Ku.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Zu(e,t,r)}
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
        ${Yu.map(n=>c`<option
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
  `}var Xu=200,Qu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ju=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Yi="beads-ui.board.sort",Zi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ep(){try{let e=window.localStorage.getItem(Yi);if(e&&Zi.has(e))return e}catch{}return"created_desc"}function Xi(e,t){let r=_t("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,f=t.closedRange||qt,h=s?ls(s,a):null,I=ds({transport:o,uiOrderStore:a}),S=[],O=[],q=[],Z=[],K=[],z=[],L=!1,E=0,F=ep(),k=new Map,W=new Map,oe=new Map,ue=new Set,J={search:"",priority:"",type:"",labels:[]},se=!1,Le=null;function ze(U){return String(U.status||"open")==="open"}function Xe(U){let Q=String(U.status||"open");return Q==="open"||Q==="blocked"}function at(U){let Q=J.search.trim().toLowerCase(),v=J.priority,C=J.type,N=J.labels;return U.filter(j=>{if(Q){let me=String(j.id||"").toLowerCase(),$e=String(j.title||"").toLowerCase();if(!me.includes(Q)&&!$e.includes(Q))return!1}if(v!==""&&String(j.priority)!==v||C!==""&&String(j.issue_type||"")!==C)return!1;if(N.length>0){let me=Array.isArray(j.labels)?j.labels:[];if(!N.some($e=>me.includes($e)))return!1}return!0})}function rt(){let U=new Set;for(let Q of[S,O,q,Z,K,z])for(let v of Q){let C=Array.isArray(v.labels)?v.labels:[];for(let N of C)typeof N=="string"&&N.length>0&&U.add(N)}return Array.from(U).sort()}function nt(){return J.search.trim()!==""||J.priority!==""||J.type!==""||J.labels.length>0}function _e(){try{if(h){let U=h.selectBoardColumn("tab:board:in-progress","in_progress",F),Q=h.selectBoardColumn("tab:board:blocked","blocked",F).filter(Xe),v=new Set(U.map(Se=>Se.id)),C=h.selectBoardColumn("tab:board:ready","ready",F).filter(Se=>ze(Se)&&!v.has(Se.id)),N=h.selectBoardColumn("tab:board:resolved","resolved",F),j=h.selectBoardColumn("tab:board:deferred","deferred",F),me=h.selectBoardColumn("tab:board:closed","closed").slice(0,Xu),$e=[...Q,...C,...U,...N,...me];qe($e);let ce=new Set;for(let Se of $e)Se&&Se.id&&!Ao(Se)&&ce.add(Se.id);let ot=!nt();S=ot?gn(Q,ce):Q,O=ot?gn(C,ce):C,q=ot?gn(U,ce):U,Z=ot?gn(N,ce):N,K=j,E=j.length,z=ot?gn(me,ce):me,k=new Map;for(let Se of S)k.set(Se.id,"open");for(let Se of O)k.set(Se.id,"open");for(let Se of q)k.set(Se.id,"in_progress");for(let Se of Z)k.set(Se.id,"resolved");for(let Se of K)k.set(Se.id,"deferred");for(let Se of z)k.set(Se.id,"closed");W=new Map;for(let Se of S)W.set(Se.id,"blocked-col");for(let Se of O)W.set(Se.id,"ready-col");for(let Se of q)W.set(Se.id,"in-progress-col");for(let Se of Z)W.set(Se.id,"resolved-col");for(let Se of z)W.set(Se.id,"closed-col")}D()}catch{S=[],O=[],q=[],Z=[],K=[],z=[],oe=new Map,D()}}function qe(U){let Q=new Map;for(let C of U)C&&C.id&&!Q.has(C.id)&&Q.set(C.id,C);let v=new Map;for(let C of Q.values()){let N=Ao(C);if(!N)continue;let j=v.get(N);j||(j=[],v.set(N,j)),j.push({id:C.id,title:C.title,status:C.status,metadata:C.metadata,workflow:C.workflow,created_at:C.created_at,updated_at:C.updated_at})}oe=v}function fe(U){let Q=oe.get(U)||[],v=0;for(let N of Q)(N.status==="resolved"||N.status==="closed")&&(v+=1);let C=cs(Q);return{total:Q.length,count:v,current:C,children:Q}}function xe(U){return!ue.has(U)}function Ee(U,Q){U.preventDefault(),U.stopPropagation(),ue.has(Q)?ue.delete(Q):ue.add(Q),D()}function Fe(U,Q){U.preventDefault(),U.stopPropagation(),n(Q)}function ve(U,Q){U.preventDefault(),U.stopPropagation(),n(Q)}function je(U,Q){Le||n(Q)}function Oe(U,Q){U.preventDefault(),U.stopPropagation(),tp(Q).then(v=>{v&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function ge(U,Q){Le=Q,U.dataTransfer&&(U.dataTransfer.setData("text/plain",Q),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function he(U){U.target.classList.remove("board-card--dragging"),be(),setTimeout(()=>{Le=null},0)}function G(U){let Q=String(U.target.value||"");!Q||Q===f||(f=Q,d&&d(Q),D())}function V(){return i?i.get():null}function ye(U){let Q=l?l.get():null,v=Q?Q.cleanup_failed:null;if(!v||typeof v!="object"||Array.isArray(v))return null;let C=v[U];return!C||typeof C!="object"||Array.isArray(C)?null:C}let Te={onCardClick:je,onCopyId:Oe,onDragStart:ge,onDragEnd:he,onClosedRangeChange:G,rollupFor:fe,isExpanded:xe,onRollupToggle:Ee,onChildClick:Fe,onFromChipClick:ve,cleanupFailureFor:ye,get policy(){return V()}};function Ue(U,Q){Le||(pe(),n(Q))}function He(U,Q){U.preventDefault(),U.stopPropagation(),pe(),n(Q)}let Ae={...Te,onCardClick:Ue,onChildClick:He,onFromChipClick:He,get policy(){return V()}};function st(U){let Q=U.target,v=e.querySelector(".board-filter__labels");Q&&v&&v.contains(Q)||re()}function Qe(U){U.key==="Escape"&&re()}function H(){se||(se=!0,document.addEventListener("mousedown",st),document.addEventListener("keydown",Qe),D())}function re(){se&&(se=!1,document.removeEventListener("mousedown",st),document.removeEventListener("keydown",Qe),D())}function Ce(U){U.key==="Escape"&&pe()}function We(){L||(L=!0,document.addEventListener("keydown",Ce),D())}function pe(){L&&(L=!1,document.removeEventListener("keydown",Ce),D())}let m={onClose:pe,onOverlayClick(U){U.target===U.currentTarget&&pe()}},$={onSearchInput(U){J.search=String(U.target.value||""),_e()},onPriorityChange(U){J.priority=String(U.target.value||""),_e()},onTypeChange(U){J.type=String(U.target.value||""),_e()},onSortChange(U){let Q=String(U.target.value||"");if(!(!Zi.has(Q)||Q===F)){F=Q;try{window.localStorage.setItem(Yi,Q)}catch{}_e()}},onDeferredToggle(){L?pe():We()},onLabelMenuToggle(){se?re():H()},onLabelToggle(U){let Q=J.labels.indexOf(U);Q===-1?J.labels.push(U):J.labels.splice(Q,1),_e()},onLabelClear(){J.labels.length!==0&&(J.labels=[],_e())},onNewIssue(){u&&u()}};function x(){return c`
      <div class="board-view">
        ${Ki(J,$,{sort_mode:F,deferred_popup_open:L,deferred_count:E,label_options:rt(),label_menu_open:se})}
        <div class="board-root">
          ${Jr({title:"Blocked",id:"blocked-col",items:at(S)},Te)}
          ${Jr({title:"Ready",id:"ready-col",items:at(O)},Te)}
          ${Jr({title:"In progress",id:"in-progress-col",items:at(q)},Te)}
          ${Jr({title:"Resolved",id:"resolved-col",items:at(Z)},Te)}
          ${Jr({title:"Closed",id:"closed-col",items:at(z),is_closed:!0,closed_range:f},Te)}
        </div>
        ${L?Vi({items:at(K),count:E},Ae,m):""}
      </div>
    `}function D(){Ze(x(),e),Y()}function Y(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let Q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let v of Q)Array.from(v.querySelectorAll(".board-card")).forEach((N,j)=>{N.tabIndex=j===0?0:-1})}catch{}}async function X(U,Q){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:Q}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(v){r("update-status failed: %o",v),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(U){switch(U){case"blocked-col":return S;case"ready-col":return O;case"in-progress-col":return q;case"resolved-col":return Z;default:return[]}}function le(U,Q,v){if(!o||!a)return;let C=ne(U),N=C.find(ot=>ot.id===Q);if(!N)return;let j=C.filter(ot=>ot.id!==Q),me=v.closest?v.closest(".board-card"):null,$e=j.length;if(me){let ot=me.getAttribute("data-issue-id");if(ot===Q)return;let Se=j.findIndex(gt=>gt.id===ot);Se>=0&&($e=Se)}let ce=j.slice();ce.splice($e,0,N),I.applyReorder(Q,ce,$e)}function be(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let we=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let v=U.target.closest(".board-column");v&&v!==we&&(we&&we.classList.remove("board-column--drag-over"),v.classList.add("board-column--drag-over"),we=v)}),e.addEventListener("dragleave",U=>{let Q=U.relatedTarget;(!Q||!e.contains(Q))&&we&&(we.classList.remove("board-column--drag-over"),we=null)}),e.addEventListener("drop",U=>{U.preventDefault(),we&&(we.classList.remove("board-column--drag-over"),we=null);let Q=U.target,v=Q.closest(".board-column");if(!v)return;let C=U.dataTransfer?.getData("text/plain")||"";if(!C)return;let N=v.id,j=W.get(C);if(j&&j===N){if(Ju.has(N)){if(F!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}le(N,C,Q)}return}let me=Qu[N];if(!me){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(C)!==me&&X(C,me)}),e.addEventListener("keydown",U=>{let Q=U.target;if(!(Q instanceof HTMLElement))return;let v=String(Q.tagName||"").toLowerCase();if(v==="input"||v==="textarea"||v==="select"||v==="button"||v==="a"||Q.isContentEditable===!0)return;let C=Q.closest(".board-card");if(!C)return;let N=String(U.key||"");if(N==="Enter"||N===" "){U.preventDefault();let ce=C.getAttribute("data-issue-id");ce&&n(ce);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;U.preventDefault();let j=C.closest(".board-column");if(!j)return;let me=Array.from(j.querySelectorAll(".board-card")),$e=me.indexOf(C);if(N==="ArrowDown"&&$e<me.length-1){Me(C,me[$e+1]);return}if(N==="ArrowUp"&&$e>0){Me(C,me[$e-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let ce=Array.from(e.querySelectorAll(".board-column")),ot=ce.indexOf(j),Se=N==="ArrowRight"?1:-1,gt=ot+Se;for(;gt>=0&&gt<ce.length;){let Ke=ce[gt].querySelector(".board-card");if(Ke){Me(C,Ke);return}gt+=Se}}});function Me(U,Q){try{U.tabIndex=-1,Q.tabIndex=0,Q.focus()}catch{}}let Pe=null;h&&h.subscribe&&(Pe=h.subscribe(()=>{try{_e()}catch{}}));let ke=null;i&&i.subscribe&&(ke=i.subscribe(()=>{try{_e()}catch{}}));let Ve=null;return l&&l.subscribe&&(Ve=l.subscribe(()=>{D()})),{async load(){r("load"),_e()},clear(){re(),pe(),Pe&&(Pe(),Pe=null),ke&&(ke(),ke=null),Ve&&(Ve(),Ve=null),e.replaceChildren(),S=[],O=[],q=[],Z=[],K=[],z=[],k=new Map,W=new Map}}}function Ao(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function gn(e,t){return e.filter(r=>{let n=Ao(r);return!(n&&t.has(n))})}async function tp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function rp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=u=>{typeof r.close=="function"&&r.close(),r.remove(),l(u)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function mr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await rp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var np=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Qi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},sp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Et(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function vt(e){return typeof e=="string"&&e.length>0?e:null}function gs(e){return e.startsWith("gpt-")?e.slice(4):e}function yt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function rl(e,t,r){let n=vt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=vt(r[e]);return s===null?null:{value:s,source:"global"}}function bn(e,t,r,n){return rl(e,t,r)||{value:n,source:"base"}}function Ji(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Et(s?.[t])){let a=vt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Et(s)){for(let a of Object.values(s))if(Et(a)){let i=vt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return vt(n?.runners?.[o]?.models?.[e]?.id)||e}function op(e,t){return vt(t?.review?.reviewers?.[e]?.model)||e}function hn(e,t,r=!1){if(e==="default")return yt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?gs(e):e;return yt(e,t,n,e,"explicit")}function ap(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Et(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Et(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function el(e){return yt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function tl(e,t,r){let n=rl(e,t,r);return n?hn(n.value,n.source):yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function en(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Et(n.session)?n.session:null,o=n?.supported===!0&&Et(n.orchestration)?n.orchestration:null,a=Et(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=bn("workflow_mode",t,r,vt(s.workflow_mode_default));i.workflow_mode=l.source==="base"?yt(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):hn(l.value,l.source);for(let S of["spec_review","plan_review","impl_review"]){let O=`${S}_model`,q=vt(S==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),Z=bn(O,t,r,q);if(Z.value===null)i[O]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(Z.value!=="self"&&Z.value!=="skip"&&!Et(s.review?.reviewers?.[Z.value]))i[O]=el(yt(Z.value,Z.source,"",null,"explicit"));else{let K=op(Z.value,s);i[O]=yt(Z.value,Z.source,gs(K),K,Z.source==="base"?"default":"explicit")}}for(let[S,O]of Object.entries(Qi)){let q=i[O].value;if(q==="self"||q==="skip"){i[S]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let Z=vt(s.review?.reviewers?.[q||""]?.effort),K=bn(S,t,r,Z);i[S]=K.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(K.value,K.source,K.value,K.value,K.source==="base"?"default":"explicit")}let d=Et(s.implementation?.default)?s.implementation.default:{},u=vt(e.route),f=u!==null&&["quick_fix","spec_backed","full_plan"].includes(u),h=Et(s.implementation?.route_defaults)?s.implementation.route_defaults:{},I=f&&Et(h[u])?h[u]:{};for(let S of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let O=bn(S,t,r,S==="impl_dispatch"?vt(I.dispatch)||vt(d.dispatch):vt(d[S.replace("impl_","")]));i[S]=O.value===null?yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):yt(O.value,O.source,O.value,O.value,O.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let S of["impl_runtime","impl_model","impl_effort","impl_speed"])i[S]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let S=i.impl_runtime.value==="inherit"?vt(e.controller_runtime):i.impl_runtime.value,O=S?ap(S,s,a):[];if(i.impl_model.value!=="auto"&&O.length>0&&!O.includes(i.impl_model.value))i.impl_model=el(i.impl_model);else{let q=Ji(i.impl_model.value,S,s,a);i.impl_model.display=gs(q),i.impl_model.full_value=q}}if(i.impl_effort.value==="auto"){let S=vt(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),O=S?vt(s.implementation?.effort_by_transport?.[S]?.auto):null;O&&!sp.has(O)?(i.impl_effort.display=`${O} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=O,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",i.impl_speed.source))}}else for(let l of np.filter(d=>!d.startsWith("orchestration_")))i[l]=tl(l,t,r);if(!s){for(let[l,d]of Object.entries(Qi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=yt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=tl(l,t,r);continue}let d=l.replace("orchestration_",""),u=vt(o[d]),f=bn(l,t,r,u);if(l==="orchestration_effort"&&f.source==="base"){i[l]=yt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[l]=yt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let h=f.source==="base"?vt(o.model_id)||f.value:Ji(f.value,null,s,a);i[l]=yt(f.value,f.source,gs(h),h,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[l]=f.source==="base"?yt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",f.source);continue}i[l]=hn(f.value,f.source)}return i}function ip(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function bs(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=u=>en({pin:e.layer==="pin"?u:t,global:e.layer==="pin"?r:u,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=vt(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:ip(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(u=>{let f=n({...s,[e.key]:u})[e.key];return{value:u,label:f.display,full_value:f.full_value}})}}function tn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=f=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},u=()=>d(n.value.trim());o.addEventListener("click",u),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),u())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var il="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var gr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],yn=[...gr,"reasoning_output_tokens"],lp=["implementation","review-consult"];function So(e){let t=0;for(let r of gr)t+=xt(e?.[r]);return t}function cp(e){return!e||typeof e!="object"?!1:gr.some(t=>Number.isFinite(e[t]))}function nl(e){return!e||typeof e!="object"?!1:yn.some(t=>Number.isFinite(e[t]))}function dp(e){let t={};for(let r of yn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function sl(e){let t={};for(let r of yn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ol(e,t){return e==="codex"?xt(t.input_tokens)+xt(t.output_tokens):So(t)}function up(e){return e==="claude"?"Claude":"Codex"}function pp(e){return`\u03C4 ${ll(e)}`}function fp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${xt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${xt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${xt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${xt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(il),o.join(`
`)}function At(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${up(r)} ${pp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:fp(r,n)})}return t}function ys(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of yn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=xt(i.breakdown[l])+xt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Eo(e){return!e||typeof e!="object"?null:Ht({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function _p(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:dp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function hs(e,t,r){e.subtotal+=t.subtotal;for(let n of yn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=xt(e.breakdown[n])+xt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function al(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ll(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function rn(e){return cp(e)?`\u03C4 ${ll(So(e))}`:null}function Qt(e){let t=rn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function nn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${So(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(il),r.join(`
`)}function Ht(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(nl(l)){let u=_p(i.runner),f=sl(l),h={provider:u,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ol(u,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),hs(r[u],h,!0),hs(n.orchestrator[u],h,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let u of d){if(!u||u.provider!=="codex"||!lp.includes(u.role)||!nl(u.usage))continue;let f=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=sl(u.usage),I={provider:"codex",role:u.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:ol("codex",h)};I.receipt_id=f,typeof u.model=="string"&&(I.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&(I.effort=u.effort),typeof u.session_id=="string"?I.session_id=u.session_id:typeof u.thread_id=="string"&&(I.session_id=u.thread_id),typeof u.turn_id=="string"&&(I.turn_id=u.turn_id),typeof u.completed_at=="string"&&(I.completed_at=u.completed_at),h.replayed===!0&&(I.replayed=!0),hs(r.codex,I,!1),hs(n[I.role].codex,I,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=al(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let u=n[i][d];u.legs.length>0&&(l[d]={...al(u,!0),legs:u.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:bl,setPrototypeOf:cl,isFrozen:mp,getPrototypeOf:gp,getOwnPropertyDescriptor:bp}=Object,{freeze:Lt,seal:Gt,create:Mo}=Object,{apply:Po,construct:Do}=typeof Reflect<"u"&&Reflect;Lt||(Lt=function(t){return t});Gt||(Gt=function(t){return t});Po||(Po=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Do||(Do=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var vs=Ot(Array.prototype.forEach),hp=Ot(Array.prototype.lastIndexOf),dl=Ot(Array.prototype.pop),vn=Ot(Array.prototype.push),yp=Ot(Array.prototype.splice),ks=Ot(String.prototype.toLowerCase),To=Ot(String.prototype.toString),Co=Ot(String.prototype.match),wn=Ot(String.prototype.replace),vp=Ot(String.prototype.indexOf),wp=Ot(String.prototype.trim),Jt=Ot(Object.prototype.hasOwnProperty),It=Ot(RegExp.prototype.test),kn=kp(TypeError);function Ot(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Po(e,t,n)}}function kp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Do(e,r)}}function et(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ks;cl&&cl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(mp(t)||(t[n]=o),s=o)}e[s]=!0}return e}function $p(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function br(e){let t=Mo(null);for(let[r,n]of bl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=$p(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=br(n):t[r]=n);return t}function $n(e,t){for(;e!==null;){let n=bp(e,t);if(n){if(n.get)return Ot(n.get);if(typeof n.value=="function")return Ot(n.value)}e=gp(e)}function r(){return null}return r}var ul=Lt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ro=Lt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Io=Lt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xp=Lt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Lo=Lt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ap=Lt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pl=Lt(["#text"]),fl=Lt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Oo=Lt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_l=Lt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ws=Lt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sp=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ep=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Tp=Gt(/\$\{[\w\W]*/gm),Cp=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Rp=Gt(/^aria-[\-\w]+$/),hl=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ip=Gt(/^(?:\w+script|data):/i),Lp=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yl=Gt(/^html$/i),Op=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i),ml=Object.freeze({__proto__:null,ARIA_ATTR:Rp,ATTR_WHITESPACE:Lp,CUSTOM_ELEMENT:Op,DATA_ATTR:Cp,DOCTYPE_NAME:yl,ERB_EXPR:Ep,IS_ALLOWED_URI:hl,IS_SCRIPT_OR_DATA:Ip,MUSTACHE_EXPR:Sp,TMPLIT_EXPR:Tp}),xn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Mp=function(){return typeof window>"u"?null:window},Pp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},gl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function vl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mp(),t=R=>vl(R);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==xn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:I}=e,S=l.prototype,O=$n(S,"cloneNode"),q=$n(S,"remove"),Z=$n(S,"nextSibling"),K=$n(S,"childNodes"),z=$n(S,"parentNode");if(typeof a=="function"){let R=r.createElement("template");R.content&&R.content.ownerDocument&&(r=R.content.ownerDocument)}let L,E="",{implementation:F,createNodeIterator:k,createDocumentFragment:W,getElementsByTagName:oe}=r,{importNode:ue}=n,J=gl();t.isSupported=typeof bl=="function"&&typeof z=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Le,TMPLIT_EXPR:ze,DATA_ATTR:Xe,ARIA_ATTR:at,IS_SCRIPT_OR_DATA:rt,ATTR_WHITESPACE:nt,CUSTOM_ELEMENT:_e}=ml,{IS_ALLOWED_URI:qe}=ml,fe=null,xe=et({},[...ul,...Ro,...Io,...Lo,...pl]),Ee=null,Fe=et({},[...fl,...Oo,..._l,...ws]),ve=Object.seal(Mo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,Oe=null,ge=Object.seal(Mo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),he=!0,G=!0,V=!1,ye=!0,Te=!1,Ue=!0,He=!1,Ae=!1,st=!1,Qe=!1,H=!1,re=!1,Ce=!0,We=!1,pe="user-content-",m=!0,$=!1,x={},D=null,Y=et({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),X=null,ne=et({},["audio","video","img","source","image","track"]),le=null,be=et({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),we="http://www.w3.org/1998/Math/MathML",Me="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",ke=Pe,Ve=!1,U=null,Q=et({},[we,Me,Pe],To),v=et({},["mi","mo","mn","ms","mtext"]),C=et({},["annotation-xml"]),N=et({},["title","style","font","a","script"]),j=null,me=["application/xhtml+xml","text/html"],$e="text/html",ce=null,ot=null,Se=r.createElement("form"),gt=function(_){return _ instanceof RegExp||_ instanceof Function},Ke=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ot&&ot===_)){if((!_||typeof _!="object")&&(_={}),_=br(_),j=me.indexOf(_.PARSER_MEDIA_TYPE)===-1?$e:_.PARSER_MEDIA_TYPE,ce=j==="application/xhtml+xml"?To:ks,fe=Jt(_,"ALLOWED_TAGS")?et({},_.ALLOWED_TAGS,ce):xe,Ee=Jt(_,"ALLOWED_ATTR")?et({},_.ALLOWED_ATTR,ce):Fe,U=Jt(_,"ALLOWED_NAMESPACES")?et({},_.ALLOWED_NAMESPACES,To):Q,le=Jt(_,"ADD_URI_SAFE_ATTR")?et(br(be),_.ADD_URI_SAFE_ATTR,ce):be,X=Jt(_,"ADD_DATA_URI_TAGS")?et(br(ne),_.ADD_DATA_URI_TAGS,ce):ne,D=Jt(_,"FORBID_CONTENTS")?et({},_.FORBID_CONTENTS,ce):Y,je=Jt(_,"FORBID_TAGS")?et({},_.FORBID_TAGS,ce):br({}),Oe=Jt(_,"FORBID_ATTR")?et({},_.FORBID_ATTR,ce):br({}),x=Jt(_,"USE_PROFILES")?_.USE_PROFILES:!1,he=_.ALLOW_ARIA_ATTR!==!1,G=_.ALLOW_DATA_ATTR!==!1,V=_.ALLOW_UNKNOWN_PROTOCOLS||!1,ye=_.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=_.SAFE_FOR_TEMPLATES||!1,Ue=_.SAFE_FOR_XML!==!1,He=_.WHOLE_DOCUMENT||!1,Qe=_.RETURN_DOM||!1,H=_.RETURN_DOM_FRAGMENT||!1,re=_.RETURN_TRUSTED_TYPE||!1,st=_.FORCE_BODY||!1,Ce=_.SANITIZE_DOM!==!1,We=_.SANITIZE_NAMED_PROPS||!1,m=_.KEEP_CONTENT!==!1,$=_.IN_PLACE||!1,qe=_.ALLOWED_URI_REGEXP||hl,ke=_.NAMESPACE||Pe,v=_.MATHML_TEXT_INTEGRATION_POINTS||v,C=_.HTML_INTEGRATION_POINTS||C,ve=_.CUSTOM_ELEMENT_HANDLING||{},_.CUSTOM_ELEMENT_HANDLING&&gt(_.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=_.CUSTOM_ELEMENT_HANDLING.tagNameCheck),_.CUSTOM_ELEMENT_HANDLING&&gt(_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),_.CUSTOM_ELEMENT_HANDLING&&typeof _.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=_.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(G=!1),H&&(Qe=!0),x&&(fe=et({},pl),Ee=[],x.html===!0&&(et(fe,ul),et(Ee,fl)),x.svg===!0&&(et(fe,Ro),et(Ee,Oo),et(Ee,ws)),x.svgFilters===!0&&(et(fe,Io),et(Ee,Oo),et(Ee,ws)),x.mathMl===!0&&(et(fe,Lo),et(Ee,_l),et(Ee,ws))),_.ADD_TAGS&&(typeof _.ADD_TAGS=="function"?ge.tagCheck=_.ADD_TAGS:(fe===xe&&(fe=br(fe)),et(fe,_.ADD_TAGS,ce))),_.ADD_ATTR&&(typeof _.ADD_ATTR=="function"?ge.attributeCheck=_.ADD_ATTR:(Ee===Fe&&(Ee=br(Ee)),et(Ee,_.ADD_ATTR,ce))),_.ADD_URI_SAFE_ATTR&&et(le,_.ADD_URI_SAFE_ATTR,ce),_.FORBID_CONTENTS&&(D===Y&&(D=br(D)),et(D,_.FORBID_CONTENTS,ce)),m&&(fe["#text"]=!0),He&&et(fe,["html","head","body"]),fe.table&&(et(fe,["tbody"]),delete je.tbody),_.TRUSTED_TYPES_POLICY){if(typeof _.TRUSTED_TYPES_POLICY.createHTML!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof _.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw kn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=_.TRUSTED_TYPES_POLICY,E=L.createHTML("")}else L===void 0&&(L=Pp(I,s)),L!==null&&typeof E=="string"&&(E=L.createHTML(""));Lt&&Lt(_),ot=_}},Tt=et({},[...Ro,...Io,...xp]),Ut=et({},[...Lo,...Ap]),dr=function(_){let P=z(_);(!P||!P.tagName)&&(P={namespaceURI:ke,tagName:"template"});let te=ks(_.tagName),de=ks(P.tagName);return U[_.namespaceURI]?_.namespaceURI===Me?P.namespaceURI===Pe?te==="svg":P.namespaceURI===we?te==="svg"&&(de==="annotation-xml"||v[de]):!!Tt[te]:_.namespaceURI===we?P.namespaceURI===Pe?te==="math":P.namespaceURI===Me?te==="math"&&C[de]:!!Ut[te]:_.namespaceURI===Pe?P.namespaceURI===Me&&!C[de]||P.namespaceURI===we&&!v[de]?!1:!Ut[te]&&(N[te]||!Tt[te]):!!(j==="application/xhtml+xml"&&U[_.namespaceURI]):!1},wt=function(_){vn(t.removed,{element:_});try{z(_).removeChild(_)}catch{q(_)}},Rt=function(_,P){try{vn(t.removed,{attribute:P.getAttributeNode(_),from:P})}catch{vn(t.removed,{attribute:null,from:P})}if(P.removeAttribute(_),_==="is")if(Qe||H)try{wt(P)}catch{}else try{P.setAttribute(_,"")}catch{}},ur=function(_){let P=null,te=null;if(st)_="<remove></remove>"+_;else{let Re=Co(_,/^[\r\n\t ]+/);te=Re&&Re[0]}j==="application/xhtml+xml"&&ke===Pe&&(_='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+_+"</body></html>");let de=L?L.createHTML(_):_;if(ke===Pe)try{P=new h().parseFromString(de,j)}catch{}if(!P||!P.documentElement){P=F.createDocument(ke,"template",null);try{P.documentElement.innerHTML=Ve?E:de}catch{}}let Ne=P.body||P.documentElement;return _&&te&&Ne.insertBefore(r.createTextNode(te),Ne.childNodes[0]||null),ke===Pe?oe.call(P,He?"html":"body")[0]:He?P.documentElement:Ne},pr=function(_){return k.call(_.ownerDocument||_,_,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Nt=function(_){return _ instanceof f&&(typeof _.nodeName!="string"||typeof _.textContent!="string"||typeof _.removeChild!="function"||!(_.attributes instanceof u)||typeof _.removeAttribute!="function"||typeof _.setAttribute!="function"||typeof _.namespaceURI!="string"||typeof _.insertBefore!="function"||typeof _.hasChildNodes!="function")},nr=function(_){return typeof i=="function"&&_ instanceof i};function kt(R,_,P){vs(R,te=>{te.call(t,_,P,ot)})}let fr=function(_){let P=null;if(kt(J.beforeSanitizeElements,_,null),Nt(_))return wt(_),!0;let te=ce(_.nodeName);if(kt(J.uponSanitizeElement,_,{tagName:te,allowedTags:fe}),Ue&&_.hasChildNodes()&&!nr(_.firstElementChild)&&It(/<[/\w!]/g,_.innerHTML)&&It(/<[/\w!]/g,_.textContent)||_.nodeType===xn.progressingInstruction||Ue&&_.nodeType===xn.comment&&It(/<[/\w]/g,_.data))return wt(_),!0;if(!(ge.tagCheck instanceof Function&&ge.tagCheck(te))&&(!fe[te]||je[te])){if(!je[te]&&Pt(te)&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,te)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(te)))return!1;if(m&&!D[te]){let de=z(_)||_.parentNode,Ne=K(_)||_.childNodes;if(Ne&&de){let Re=Ne.length;for(let ct=Re-1;ct>=0;--ct){let ut=O(Ne[ct],!0);ut.__removalCount=(_.__removalCount||0)+1,de.insertBefore(ut,Z(_))}}}return wt(_),!0}return _ instanceof l&&!dr(_)||(te==="noscript"||te==="noembed"||te==="noframes")&&It(/<\/no(script|embed|frames)/i,_.innerHTML)?(wt(_),!0):(Te&&_.nodeType===xn.text&&(P=_.textContent,vs([se,Le,ze],de=>{P=wn(P,de," ")}),_.textContent!==P&&(vn(t.removed,{element:_.cloneNode()}),_.textContent=P)),kt(J.afterSanitizeElements,_,null),!1)},Je=function(_,P,te){if(Ce&&(P==="id"||P==="name")&&(te in r||te in Se))return!1;if(!(G&&!Oe[P]&&It(Xe,P))){if(!(he&&It(at,P))){if(!(ge.attributeCheck instanceof Function&&ge.attributeCheck(P,_))){if(!Ee[P]||Oe[P]){if(!(Pt(_)&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,_)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(_))&&(ve.attributeNameCheck instanceof RegExp&&It(ve.attributeNameCheck,P)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(P,_))||P==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&It(ve.tagNameCheck,te)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(te))))return!1}else if(!le[P]){if(!It(qe,wn(te,nt,""))){if(!((P==="src"||P==="xlink:href"||P==="href")&&_!=="script"&&vp(te,"data:")===0&&X[_])){if(!(V&&!It(rt,wn(te,nt,"")))){if(te)return!1}}}}}}}return!0},Pt=function(_){return _!=="annotation-xml"&&Co(_,_e)},p=function(_){kt(J.beforeSanitizeAttributes,_,null);let{attributes:P}=_;if(!P||Nt(_))return;let te={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee,forceKeepAttr:void 0},de=P.length;for(;de--;){let Ne=P[de],{name:Re,namespaceURI:ct,value:ut}=Ne,w=ce(Re),y=ut,g=Re==="value"?y:wp(y);if(te.attrName=w,te.attrValue=g,te.keepAttr=!0,te.forceKeepAttr=void 0,kt(J.uponSanitizeAttribute,_,te),g=te.attrValue,We&&(w==="id"||w==="name")&&(Rt(Re,_),g=pe+g),Ue&&It(/((--!?|])>)|<\/(style|title|textarea)/i,g)){Rt(Re,_);continue}if(w==="attributename"&&Co(g,"href")){Rt(Re,_);continue}if(te.forceKeepAttr)continue;if(!te.keepAttr){Rt(Re,_);continue}if(!ye&&It(/\/>/i,g)){Rt(Re,_);continue}Te&&vs([se,Le,ze],T=>{g=wn(g,T," ")});let M=ce(_.nodeName);if(!Je(M,w,g)){Rt(Re,_);continue}if(L&&typeof I=="object"&&typeof I.getAttributeType=="function"&&!ct)switch(I.getAttributeType(M,w)){case"TrustedHTML":{g=L.createHTML(g);break}case"TrustedScriptURL":{g=L.createScriptURL(g);break}}if(g!==y)try{ct?_.setAttributeNS(ct,Re,g):_.setAttribute(Re,g),Nt(_)?wt(_):dl(t.removed)}catch{Rt(Re,_)}}kt(J.afterSanitizeAttributes,_,null)},A=function R(_){let P=null,te=pr(_);for(kt(J.beforeSanitizeShadowDOM,_,null);P=te.nextNode();)kt(J.uponSanitizeShadowNode,P,null),fr(P),p(P),P.content instanceof o&&R(P.content);kt(J.afterSanitizeShadowDOM,_,null)};return t.sanitize=function(R){let _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},P=null,te=null,de=null,Ne=null;if(Ve=!R,Ve&&(R="<!-->"),typeof R!="string"&&!nr(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw kn("dirty is not a string, aborting")}else throw kn("toString is not a function");if(!t.isSupported)return R;if(Ae||Ke(_),t.removed=[],typeof R=="string"&&($=!1),$){if(R.nodeName){let ut=ce(R.nodeName);if(!fe[ut]||je[ut])throw kn("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof i)P=ur("<!---->"),te=P.ownerDocument.importNode(R,!0),te.nodeType===xn.element&&te.nodeName==="BODY"||te.nodeName==="HTML"?P=te:P.appendChild(te);else{if(!Qe&&!Te&&!He&&R.indexOf("<")===-1)return L&&re?L.createHTML(R):R;if(P=ur(R),!P)return Qe?null:re?E:""}P&&st&&wt(P.firstChild);let Re=pr($?R:P);for(;de=Re.nextNode();)fr(de),p(de),de.content instanceof o&&A(de.content);if($)return R;if(Qe){if(H)for(Ne=W.call(P.ownerDocument);P.firstChild;)Ne.appendChild(P.firstChild);else Ne=P;return(Ee.shadowroot||Ee.shadowrootmode)&&(Ne=ue.call(n,Ne,!0)),Ne}let ct=He?P.outerHTML:P.innerHTML;return He&&fe["!doctype"]&&P.ownerDocument&&P.ownerDocument.doctype&&P.ownerDocument.doctype.name&&It(yl,P.ownerDocument.doctype.name)&&(ct="<!DOCTYPE "+P.ownerDocument.doctype.name+`>
`+ct),Te&&vs([se,Le,ze],ut=>{ct=wn(ct,ut," ")}),L&&re?L.createHTML(ct):ct},t.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(R),Ae=!0},t.clearConfig=function(){ot=null,Ae=!1},t.isValidAttribute=function(R,_,P){ot||Ke({});let te=ce(R),de=ce(_);return Je(te,de,P)},t.addHook=function(R,_){typeof _=="function"&&vn(J[R],_)},t.removeHook=function(R,_){if(_!==void 0){let P=hp(J[R],_);return P===-1?void 0:yp(J[R],P,1)[0]}return dl(J[R])},t.removeHooks=function(R){J[R]=[]},t.removeAllHooks=function(){J=gl()},t}var wl=vl();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$s=e=>(...t)=>({_$litDirective$:e,values:t}),sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var An=class extends sn{constructor(t){if(super(t),this.it=mt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===Wt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};An.directiveName="unsafeHTML",An.resultType=1;var kl=$s(An);function jo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=jo();function Cl(e){Ur=e}var Cn={exec:()=>null};function it(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Mt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Dp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Mt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Np=/^(?:[ \t]*(?:\n|$))+/,qp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bo=/(?:[*+-]|\d{1,9}[.)])/,Rl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Il=it(Rl).replace(/bull/g,Bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bp=it(Rl).replace(/bull/g,Bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Uo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Up=/^[^\n]+/,Wo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Wp=it(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Wo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),zp=it(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bo).getRegex(),Cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",zo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Hp=it("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",zo).replace("tag",Cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ll=it(Uo).replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex(),Gp=it(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ll).getRegex(),Ho={blockquote:Gp,code:qp,def:Wp,fences:Fp,heading:jp,hr:Rn,html:Hp,lheading:Il,list:zp,newline:Np,paragraph:Ll,table:Cn,text:Up},$l=it("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex(),Vp={...Ho,lheading:Bp,table:$l,paragraph:it(Uo).replace("hr",Rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$l).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Cs).getRegex()},Kp={...Ho,html:it(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",zo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Cn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:it(Uo).replace("hr",Rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Il).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ol=/^( {2,}|\\)\n(?!\s*$)/,Xp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Rs=/[\p{P}\p{S}]/u,Go=/[\s\p{P}\p{S}]/u,Ml=/[^\s\p{P}\p{S}]/u,Qp=it(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Go).getRegex(),Pl=/(?!~)[\p{P}\p{S}]/u,Jp=/(?!~)[\s\p{P}\p{S}]/u,ef=/(?:[^\s\p{P}\p{S}]|~)/u,tf=it(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Dp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Dl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,rf=it(Dl,"u").replace(/punct/g,Rs).getRegex(),nf=it(Dl,"u").replace(/punct/g,Pl).getRegex(),Nl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",sf=it(Nl,"gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Go).replace(/punct/g,Rs).getRegex(),of=it(Nl,"gu").replace(/notPunctSpace/g,ef).replace(/punctSpace/g,Jp).replace(/punct/g,Pl).getRegex(),af=it("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ml).replace(/punctSpace/g,Go).replace(/punct/g,Rs).getRegex(),lf=it(/\\(punct)/,"gu").replace(/punct/g,Rs).getRegex(),cf=it(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),df=it(zo).replace("(?:-->|$)","-->").getRegex(),uf=it("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",df).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ss=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pf=it(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ss).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ql=it(/^!?\[(label)\]\[(ref)\]/).replace("label",Ss).replace("ref",Wo).getRegex(),Fl=it(/^!?\[(ref)\](?:\[\])?/).replace("ref",Wo).getRegex(),ff=it("reflink|nolink(?!\\()","g").replace("reflink",ql).replace("nolink",Fl).getRegex(),xl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Vo={_backpedal:Cn,anyPunctuation:lf,autolink:cf,blockSkip:tf,br:Ol,code:Zp,del:Cn,emStrongLDelim:rf,emStrongRDelimAst:sf,emStrongRDelimUnd:af,escape:Yp,link:pf,nolink:Fl,punctuation:Qp,reflink:ql,reflinkSearch:ff,tag:uf,text:Xp,url:Cn},_f={...Vo,link:it(/^!?\[(label)\]\((.*?)\)/).replace("label",Ss).getRegex(),reflink:it(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ss).getRegex()},No={...Vo,emStrongRDelimAst:of,emStrongLDelim:nf,url:it(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:it(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xl).getRegex()},mf={...No,br:it(Ol).replace("{2,}","*").getRegex(),text:it(No.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xs={normal:Ho,gfm:Vp,pedantic:Kp},Sn={normal:Vo,gfm:No,breaks:mf,pedantic:_f},gf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Al=e=>gf[e];function yr(e,t){if(t){if(Mt.escapeTest.test(e))return e.replace(Mt.escapeReplace,Al)}else if(Mt.escapeTestNoEncode.test(e))return e.replace(Mt.escapeReplaceNoEncode,Al);return e}function Sl(e){try{e=encodeURI(e).replace(Mt.percentDecode,"%")}catch{return null}return e}function El(e,t){let r=e.replace(Mt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Mt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Mt.slashPipe,"|");return n}function En(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function bf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Tl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function hf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Es=class{constructor(e){dt(this,"options");dt(this,"rules");dt(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:En(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=hf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=En(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:En(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=En(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${u}`:u;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let I=h,S=I.raw+`
`+r.join(`
`),O=this.blockquote(S);o[o.length-1]=O,n=n.substring(0,n.length-I.raw.length)+O.raw,s=s.substring(0,s.length-I.text.length)+O.text;break}else if(h?.type==="list"){let I=h,S=I.raw+`
`+r.join(`
`),O=this.list(S);o[o.length-1]=O,n=n.substring(0,n.length-h.raw.length)+O.raw,s=s.substring(0,s.length-I.raw.length)+O.raw,r=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),h=e.split(`
`,1)[0],I=!f.trim(),S=0;if(this.options.pedantic?(S=2,u=f.trimStart()):I?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,u=f.slice(S),S+=t[1].length),I&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let O=this.rules.other.nextBulletRegex(S),q=this.rules.other.hrRegex(S),Z=this.rules.other.fencesBeginRegex(S),K=this.rules.other.headingBeginRegex(S),z=this.rules.other.htmlBeginRegex(S);for(;e;){let L=e.split(`
`,1)[0],E;if(h=L,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),E=h):E=h.replace(this.rules.other.tabCharGlobal,"    "),Z.test(h)||K.test(h)||z.test(h)||O.test(h)||q.test(h))break;if(E.search(this.rules.other.nonSpaceChar)>=S||!h.trim())u+=`
`+E.slice(S);else{if(I||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Z.test(f)||K.test(f)||q.test(f))break;u+=`
`+h}!I&&!h.trim()&&(I=!0),d+=L+`
`,e=e.substring(L.length+1),f=E.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=u.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=u.raw+l.tokens[0].raw,l.tokens[0].text=u.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(u)):l.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):l.tokens.unshift(u)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),u=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=u}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=El(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(El(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=En(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=bf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Tl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Tl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let u=[...n[0]][0].length,f=e.slice(0,s+n.index+u+a);if(Math.min(s,a)%2){let I=f.slice(1,-1);return{type:"em",raw:f,text:I,tokens:this.lexer.inlineTokens(I)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class qo{constructor(t){dt(this,"tokens");dt(this,"options");dt(this,"state");dt(this,"inlineQueue");dt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Es,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Mt,block:xs.normal,inline:Sn.normal};this.options.pedantic?(r.block=xs.pedantic,r.inline=Sn.pedantic):this.options.gfm&&(r.block=xs.gfm,this.options.breaks?r.inline=Sn.breaks:r.inline=Sn.gfm),this.tokenizer.rules=r}static get rules(){return{block:xs,inline:Sn}}static lex(t,r){return new qo(r).lex(t)}static lexInline(t,r){return new qo(r).inlineTokens(t)}lex(t){t=t.replace(Mt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Mt.tabCharGlobal,"    ").replace(Mt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let u=r.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(I=>{h=I.call({lexer:this},f),typeof h=="number"&&h>=0&&(u=Math.min(u,h))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):r.push(l);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Ts=class{constructor(e){dt(this,"options");dt(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Mt.notSpaceStart)?.[0],s=e.replace(Mt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+yr(n)+'">'+(r?s:yr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:yr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Sl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+yr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Sl(e);if(s===null)return yr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${yr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},Ko=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class Fo{constructor(t){dt(this,"options");dt(this,"renderer");dt(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Ts,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ko}static parse(t,r){return new Fo(r).parse(t)}static parseInline(t,r){return new Fo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},As,Tn=(As=class{constructor(e){dt(this,"options");dt(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},dt(As,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),dt(As,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),As),yf=class{constructor(...e){dt(this,"defaults",jo());dt(this,"options",this.setOptions);dt(this,"parse",this.parseMarkdown(!0));dt(this,"parseInline",this.parseMarkdown(!1));dt(this,"Parser",tr);dt(this,"Renderer",Ts);dt(this,"TextRenderer",Ko);dt(this,"Lexer",er);dt(this,"Tokenizer",Es);dt(this,"Hooks",Tn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ts(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Es(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Tn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Tn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Tn.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let u=i.call(s,d);return l.call(s,u)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let u=i.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+yr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Br=new yf;function lt(e,t){return Br.parse(e,t)}lt.options=lt.setOptions=function(e){return Br.setOptions(e),lt.defaults=Br.defaults,Cl(lt.defaults),lt};lt.getDefaults=jo;lt.defaults=Ur;lt.use=function(...e){return Br.use(...e),lt.defaults=Br.defaults,Cl(lt.defaults),lt};lt.walkTokens=function(e,t){return Br.walkTokens(e,t)};lt.parseInline=Br.parseInline;lt.Parser=tr;lt.parser=tr.parse;lt.Renderer=Ts;lt.TextRenderer=Ko;lt.Lexer=er;lt.lexer=er.lex;lt.Tokenizer=Es;lt.Hooks=Tn;lt.parse=lt;var Fb=lt.options,jb=lt.setOptions,Bb=lt.use,Ub=lt.walkTokens,Wb=lt.parseInline;var zb=tr.parse,Hb=er.lex;function Tr(e){let t=lt.parse(e),r=wl.sanitize(t);return kl(r)}function vr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function on(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Is(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var vf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},wf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},kf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$f=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Yo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function jl(e,t){let r=Yo(e),n=Yo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Af(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:vf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Yo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=jl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=jl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Zo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Xo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=kf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:$f.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Sf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Xo(o.text));else if(o.type==="thinking"){let a=Zo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Af(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=xf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ef(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Xo(t.text)];if(t.type==="reasoning"){let r=Zo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Tf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Xo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Zo(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=wf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Cf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Bl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Tf(o):Cf(o)?Ef(o):Sf(o,r);for(let i of a)t.push(i)}return t}var Rf=5,If=10,Lf=/Task\s+#(\d+)/,Of=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Mf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ls(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Pf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Df(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Nf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Lf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function qf(e){if(e.tool==="Bash"){let t=e.command||"";return Of.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Mf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ff(e){let t=e.filter(s=>s.kind==="tool").slice(-If),r=new Map;t.forEach((s,o)=>{let a=qf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function jf(e){let t=Df(e);if(t)return{text:t,guess:!1};let r=Nf(e);if(r)return{text:r,guess:!1};let n=Ff(e);return n?{text:n,guess:!0}:null}function Bf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ft(e,t)}function Os(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l=!1,d={},u=!0,f=new Set,h=new Set,I=null,S=null,O=!1,q=!1,Z=!1,K=null,z=null;function L(){O=!1,q=!1,Z=!1,K=null,z=null}async function E(G){if(r){q=!0,Z=!1,fe();try{let V=await Promise.resolve(r("get-attempt-prompt",{attempt_id:G}));if(o!==G)return;!V||typeof V!="object"||Array.isArray(V)?Z=!0:(K=V,z=G)}catch{o===G&&(Z=!0)}finally{o===G&&(q=!1,fe())}}}function F(){if(O=!O,O&&o&&z!==o){E(o);return}fe()}function k(){if(!O)return"";let G=on({loading:q,error:Z});if(G)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${G}
      </div>`;if(!K)return"";if(K.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Is(K.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof K.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",K.task_prompt):""}
      ${typeof K.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",K.system_prompt):""}
    </div>`}function W(){if(!i||!n)return[];let G=n.get(i);return Bl(G?G.lines:[])}function oe(){if(!i||!n)return null;let G=n.get(i),V=G?G.last_event_at:null;return typeof V=="number"?V:null}function ue(){return d.status==="running"}function J(){if(ue()&&o){S||(S=setInterval(()=>fe(),1e3));return}se()}function se(){S&&(clearInterval(S),S=null)}function Le(G){let V=[],ye=0;for(;ye<G.length;){let Te=G[ye];if(Te.kind==="tool"){let Ue=ye;for(;Ue<G.length&&G[Ue].kind==="tool"&&G[Ue].tool===Te.tool;)Ue+=1;if(Ue-ye>=Rf&&!h.has(ye)){V.push({kind:"group",idx:ye,tool:Te.tool||"",lines:G.slice(ye,Ue).map((He,Ae)=>({idx:ye+Ae,line:He}))}),ye=Ue;continue}}V.push({kind:"line",idx:ye,line:Te}),ye+=1}return V}function ze(G){for(let V=G.length-1;V>=0;V-=1){let ye=G[V];if(ye.kind==="result"||ye.kind==="error")return null;if(ye.kind==="tool"&&!Object.hasOwn(ye,"result"))return ye}return null}function Xe(G){for(let V=G.length-1;V>=0;V-=1)if(G[V].kind==="thinking")return G[V];return null}function at(G,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let ye=f.has(G);return c`<div
        class="sv__think${ye?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ee(G)}
      >
        <span class="sv__think-line">💭 ${Ls(V.text)}</span>
        ${ye?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let ye=f.has(G),Te=V.tool==="Bash"?Pf(V.command):0,Ue=V.tool==="Bash"?Te>1?Ls(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${ye?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ee(G)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${Ue?c`<span class="sv__tool-detail">${Ue}</span>`:""}
          ${Te>1?c`<span class="sv__tool-more">⋯ ${Te}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${ye?c`<pre class="sv__tool-expand">${rt(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Tr(V.text||"")}</div>`}function rt(G){let V=[];if(G.tool==="Bash"&&typeof G.command=="string"&&G.command.length>0)V.push(G.command);else if(G.input!==void 0)try{V.push(`input: ${JSON.stringify(G.input,null,2)}`)}catch{}return typeof G.output=="string"&&G.output.length>0&&V.push(`output:
${G.output}`),V.join(`

`)}function nt(){if(!o)return c``;let G=W(),V=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),ye=d.session_id||"",Te=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${u?"ON":"OFF"}`,Ue=ue(),He=Ue?Bf(oe(),Date.now()):"",Ae=Ue?ze(G):null,st=Ue?Xe(G):null,Qe=jf(G);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Qe?c`<span
              class="sv__stage${Qe.guess?" sv__stage--guess":""}"
              title=${Qe.text}
              >${Qe.text}</span
            >`:""}
        ${Ue?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${ye?c`<button
              type="button"
              class="sv__session"
              title=${ye}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ye}`}
              @click=${()=>ve(ye)}
            >
              ⧉ ${ye.slice(0,8)}
            </button>`:""}
        ${V?c`<span class="sv__meta">${V}</span>`:""}
        ${d.worktree?c`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||l?"":c`<button
              type="button"
              class="sv__prompt-toggle${O?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${O?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${F}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${u?" sv__follow--on":""}"
          aria-pressed=${u?"true":"false"}
          aria-label=${Te}
          @click=${Fe}
        >
          <span class="sv__follow-full">⇣ ${Te}</span>
          <span class="sv__follow-short">⇣ ${u?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>he()}
        >
          ✕
        </button>
      </div>
      ${a||l?"":k()}
      <div class="sv__body">
        ${G.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Le(G).map(H=>H.kind==="group"?_e(H):at(H.idx,H.line))}
      </div>
      ${Ae||st?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ae?c`<span class="sv__now-icon">${Ae.icon}</span>
                  <span class="sv__now-name">${Ae.tool}</span>
                  <span class="sv__now-detail"
                    >${Ae.tool==="Bash"?Ls(Ae.command):Ae.path||Ae.command||""}</span
                  >`:""}
            ${st?c`<span class="sv__now-think"
                  >💭 ${Ls(st.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(G){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>qe(G.idx)}
    >
      <span class="sv__group-icon">${G.lines[0].line.icon}</span>
      <span class="sv__group-name">${G.tool}</span>
      <span class="sv__group-count">${G.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function qe(G){h.add(G),fe()}function fe(){Ze(nt(),e),J(),u&&xe()}function xe(){let G=e.querySelector(".sv__body");G&&(G.scrollTop=G.scrollHeight)}function Ee(G){f.has(G)?f.delete(G):f.add(G),fe()}function Fe(){u=!u,fe()}function ve(G){Xt(G).then(V=>{V?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function je(G){!o||!G||(d={...d,...G},fe())}function Oe(G){let V=G.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&u&&(u=!1,fe())}e.addEventListener("scroll",Oe,!0);function ge(G){let V=G&&G.attempt_id;if(!V)return;let ye=i;o=V,a=typeof G.launch_id=="string"&&G.launch_id.length>0?G.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&ye&&ye!==i&&Promise.resolve(r("unsubscribe-session-log",{id:ye})).catch(()=>{}),d=G.meta||{},l=G.hide_prompt===!0,u=!0,f.clear(),h.clear(),L(),!I&&n&&(I=n.subscribe(fe)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),fe()}function he(){let G=i;o=null,a=null,i=null,l=!1,f.clear(),h.clear(),L(),se(),r&&G&&Promise.resolve(r("unsubscribe-session-log",{id:G})).catch(()=>{}),Ze(c``,e),s&&s()}return{open:ge,updateMeta:je,close:he,isOpen(){return o!==null},destroy(){se(),I&&(I(),I=null),e.removeEventListener("scroll",Oe,!0),o=null,a=null,i=null,l=!1,Ze(c``,e)}}}function In(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ul(t.spec_id),s=Ul(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ul(e){return typeof e=="string"?e.trim():""}function Uf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Wf(e){let t=e&&e.metadata||{},r=In(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Uf(t)?null:"plan_pending"}),n}function Wl(e,t){let r=Wf(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
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
  `}var zf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gf=/^\*\*결론\*\* — (.+)$/;function Ms(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zf)return null;let r=Hf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Gf.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var zl=20;function Hl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Vf(e){return e.length>zl?`${e.slice(0,zl)}\u2026`:e}function Kf(e,t,r,n){let s=`${t.lane} ${Vf(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Hl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function Yf(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Hl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Gl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Ms(typeof l.text=="string"?l.text:"");return d?Kf(l,d,t,s.has(l.id)):Yf(l)})}
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
  `}var{I:xh}=mi;var Vl=e=>e.strings===void 0;var Zf={},Kl=(e,t=Zf)=>e._$AH=t;var Wr=$s(class extends sn{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Wt||t===mt)return t;let r=e.element,n=e.name;if(e.type===hr.PROPERTY){if(t===r[n])return Wt}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Wt}else if(e.type===hr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Wt;return Kl(e),t}});var Ps=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],Yl=[...Ps,...Cr],Ds=["delegated","main"],Ns=["inherit","claude","codex"],Ln=["default","fast"],On=["standard","fast_track"],Mn=["codex","opus","fable","self","skip"],qs=["codex","fable","skip"],Fs=["low","medium","high","xhigh"],lr="auto";function wr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zl(e){if(!wr(e)||!wr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))wr(n)&&wr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Xl(e){return e?.impl_dispatch==="main"}function js(e,t){let r=Zl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function an(e,t,r){if(!wr(e)||!wr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!wr(o)||!wr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let l=wr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function Bs(e,t){let r=Zl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Qo(e,t,r,n,s){return bs({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Ql(e,t){let r={};for(let n of Ps){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Jl(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Jo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],ea={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ec={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ta(e,t,r,n,s,o=null){let a=en({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function tc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ta(e,t,r,n,s,o))a[i.source]+=1;return a}function rc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function nc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Ph=[...Ps,...Cr];var Xf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Qf={pin:"pin",global:"global",base:"base"};function Jf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Qf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function e_(e,t,r){switch(e){case"workflow_mode":return On;case"spec_review_model":case"impl_review_model":return Mn;case"plan_review_model":return qs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Fs;case"impl_dispatch":return Ds;case"impl_runtime":return Ns;case"impl_model":return js(r,t.impl_runtime);case"impl_effort":return an(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ln;case"orchestration_model":return Bs(r,null);case"orchestration_effort":return an(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function t_(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Jf(e.source)}
    <span class="detail-effective__k"
      >${ea[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ec[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${ea[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>c`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function sc(e,t){let r=Jo.flatMap(l=>l.keys),n=ta(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=tc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let d=l.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${r_(o)}</span
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
          ${Jo.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let u=bs({key:d.key,choices:e_(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return t_(d,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Wr(e.preset_id)}
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
  </details>`}function r_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function oc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=_s(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${i?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Xf.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",u=n[l.id],f=d.length>0||u?.fill==="full",h=!f&&u?.fill==="dim",I=u?.stale===!0;return c`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${h?" detail-summary__gate--current":""}${I?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var ac=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Pn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Us(e){if(!Pn(e)||!Pn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Pn(r)&&Pn(r.models));return t.length>0?t:null}function ra(e,t){let r=Us(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ic(e,t){return Pn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lc(e,t){let r=Us(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ic(n,n.models[t]);return[]}function n_(e){let t=Us(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ic(n,s))r.includes(o)||r.push(o);return r}function s_(e,t){if(!t)return n_(e);let n=Us(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of lc(e,o))s.includes(a)||s.push(a);return s}function cc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ra(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?lc(t,n.impl_model):s_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function o_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function dc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(S){S.key==="Escape"&&s&&(S.preventDefault(),h())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${o_(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:c``}function u(){Ze(d(),e)}async function f(S,O={}){s=S,o="loading",a="",i="",u();let q=r?r():"";if(!q){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let Z="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(S);try{let K=await n(Z),z=await K.json().catch(()=>({}));if(!K.ok||!z||z.ok!==!0){if(z?.error==="not_found"&&O.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",u();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||K.status)+")",u();return}a=String(z.content||""),o="ready",u()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function h(){s=null,Ze(c``,e)}function I(){document.removeEventListener("keydown",l),h()}return{open:f,close:h,destroy:I}}var a_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],pc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ws=["implementation","review-consult"],i_=["running","done","failed","interrupted"],l_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function c_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function d_(e){let t=At(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=rn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${pc}
          >부분 집계</span
        >`:""}`}function uc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function na(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?sa(t):""}function u_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ws.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!i_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function p_(e,t){let n=At({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${na(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${na(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function f_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?At({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?sa(e.last_event_at):s?na(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${l_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function __(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function m_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of o){let f=u_(u);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((u,f)=>u.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let u of Ws){let f=t.roles[u]?.codex;a[u]=f?[...f.legs]:[]}let i=Ws.flatMap(u=>a[u]),l=new Set,d=[];for(let u of Ws){for(let f of n.filter(h=>h.role===u)){let h=i.find(I=>I.receipt_id===f.launch_id)||null;h&&!__(f,h)||(h&&l.add(h.receipt_id),d.push(f_(f,h,e.attempt_id,r)))}for(let f of a[u])l.has(f.receipt_id)||d.push(p_(u,f))}return d}function g_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...a_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${c_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${pc}</span>`:""}
  </div>`}var b_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function sa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function h_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function fc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),I=f&&!h,S=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!I}
      title=${S}
      @click=${O=>{O.stopPropagation(),I&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},l=d=>{let u=uc(Eo(d));if(At(u).length===0&&!rn(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${d_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let u=Eo(d),f=uc(u),h=At(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${b_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(d)}</span>
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(I=>c`<span
                      class="detail-session__usage"
                      title=${I.tooltip}
                      >${I.label}</span
                    >`):rn(d.usage)?c`<span class="detail-session__usage"
                    >${rn(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${sa(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${h_(d)}
          ${s.has(d.attempt_id)&&d.usage?g_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${m_(d,u,t)}
        </div>`})}
    </div>
  `}function _c(e,t={}){return c`
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
          ${y_(e)}
        </div>`:""}
  `}function y_(e){let t=on(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Is(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var v_=["open","in_progress","deferred","resolved","closed"],w_=[0,1,2,3,4];function mc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,u=null,f={},h="",I=!1,S=[],O=!1,q={},Z=!1,K=!1,z="",L="",E="";function F(){Z=!1,K=!1,z="",L="",E=""}let k=[],W=null,oe=null,ue=!1,J="",se=!1,Le=0,ze=new Set;function Xe(){k=[],W=null,oe=null,ue=!1,J="",se=!1,Le+=1,ze.clear()}async function at(g){if(!s)return;let M=++Le;try{let T=await Promise.resolve(s("get-comments",{id:g}));if(M!==Le||g!==d)return;k=Array.isArray(T)?T:[],ue=!1}catch{if(M!==Le||g!==d)return;ue=!0}y()}function rt(){if(!s||!d)return;let g=u&&typeof u.comment_count=="number"?u.comment_count:null;if(W!==d){W=d,oe=g,at(d);return}g!==null&&g!==oe&&(oe=g,at(d))}function nt(g){ze.has(g)?ze.delete(g):ze.add(g),y()}function _e(g){let M=J.trim().length===0;J=g,M!==(g.trim().length===0)&&y()}async function qe(){let g=J.trim();if(!s||!d||g.length===0||se)return;let M=d;se=!0,y();let T=!1;try{let ee=await Promise.resolve(s("add-comment",{id:M,text:g}));Array.isArray(ee)&&ee.length>0&&(T=!0,M===d&&(k=ee,ue=!1,J="",oe=ee.length))}catch{T=!1}T||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),M===d&&(se=!1),y()}let fe={onToggle:nt,onDraftInput:_e,onSubmit:qe},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Ee=dc(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let ve=Os(Fe,{transport:s?(g,M)=>Promise.resolve(s(g,M)):void 0,sessionLogStore:l}),je=!1,Oe=!1,ge=!1,he=null,G=null,V=0;function ye(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Te(){je=!1,Oe=!1,ge=!1,he=null,G=null,V+=1}async function Ue(g){if(!s)return;let M=++V;Oe=!0,ge=!1,y();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(M!==V)return;!T||typeof T!="object"||Array.isArray(T)?ge=!0:(he=T,G=ye(g))}catch{M===V&&(ge=!0)}finally{M===V&&(Oe=!1,y())}}function He(){if(je=!je,je&&d&&G!==ye(d)){he=null,Ue(d);return}y()}function Ae(){if(!a||!d)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(T=>T&&T.bead_id===d).sort((T,ee)=>(ee.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function st(){if(!a||!d)return null;let g=a.get();return Ht(g&&g.attempts||{},d)}let Qe=new Set;function H(g){Qe.has(g)?Qe.delete(g):Qe.add(g),y()}function re(g){let M=a?a.get():null,T=M&&M.attempts?M.attempts[g]:null;ve.open({attempt_id:g,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function Ce(g,M){let T=a?a.get():null,ee=T&&T.attempts?T.attempts[g]:null,Ye=(ee&&Array.isArray(ee.delegation_sessions)?ee.delegation_sessions:[]).find(tt=>tt&&typeof tt=="object"&&tt.launch_id===M);Ye&&ve.open({attempt_id:g,launch_id:M,meta:{runner:"codex",role:Ye.role,model:Ye.model,effort:Ye.effort,session_id:Ye.session_id,status:Ye.status}})}async function We(g){if(!s||!g)return;let M=await tn();if(M===null)return;let T=()=>{let tt=a?a.get():null;return tt&&typeof tt.revision=="number"?tt.revision:0},ee=async(tt={},Be=T())=>await s("worker-attempt-resume",{attempt_id:g,expected_revision:Be,...M!==""?{instructions:M}:{},...tt}),Ie=tt=>{tt?.queue&&a?.set&&a.set(tt.queue)},Ye=await ee();if(Ie(Ye),Ye&&Ye.conflict){let tt=Ye.queue&&typeof Ye.queue.revision=="number"?Ye.queue.revision:T();Ye=await ee({},tt),Ie(Ye)}Ye=await mr(Ye,(tt,Be)=>ee({continuation:tt,decision_token:Be}),{onResult:Ie,refresh:()=>ee()}),Ye&&Ye.resumed===!1&&!Ye.conflict&&Ye.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ye.reason}`,"error",2400)}let pe={onOpen:re,onOpenDelegation:Ce,onResume:We,onToggleUsage:H};function m(){let g=a?a.get():null,M={...q};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let ee=g&&g[T];typeof ee=="string"&&(M[T]=ee)}return M}async function $(){if(s){try{let g=await Promise.resolve(s("get-session-defaults",{}));q=g&&g.values&&typeof g.values=="object"?g.values:{}}catch{q={}}y()}}function x(){let g=a?a.get():null;return g&&g.runner_catalog||null}function D(){let g=a?a.get():null;return g&&typeof g.execution_defaults=="object"?g.execution_defaults:null}function Y(){let g=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},T=en({pin:{...g,...f},global:m(),execution_defaults:D(),runner_catalog:x(),route:typeof g.route=="string"?g.route:null}).orchestration_model.value||"";return ra(x(),T)}function X(){let g=i?i.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function ne(g){return g?.compatible===!1}function le(g){i&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&i.set({revision:g.revision,presets:g.presets})}async function be(){let g=X(),M=g?.presets.find(T=>T.id===h);if(!(!s||!d||!g||!M||ne(M)||I)){I=!0,S=[],y();try{let T=await Promise.resolve(s("apply-impl-preset",nc(d,M.id,g.revision)));if(T&&T.conflict){le(T),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ee=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&ee&&typeof ee=="object"){u=ee,S=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(Ie=>typeof Ie=="string"):[];for(let Ie of ac)delete f[Ie];ae(S.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{I=!1,y()}}}let we=null;r&&r.subscribe&&(we=r.subscribe(()=>Ve()));let Me=null;a&&typeof a.subscribe=="function"&&(Me=a.subscribe(()=>{d&&y()}));let Pe=null;i&&typeof i.subscribe=="function"&&(Pe=i.subscribe(()=>{d&&y()}));function ke(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",ke);function Ve(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];u=g.find(T=>T&&T.id===d)||g[0]||u}rt(),y()}}function U(g){Xt(g).then(M=>{M?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Q(g){g.preventDefault(),g.stopPropagation(),d&&U(d)}function v(g,M){g.preventDefault(),g.stopPropagation(),U(M)}function C(g,M,T){g.preventDefault(),g.stopPropagation(),Ee.open(M,{missing_state:T})}function N(g,M){f[g]=M,y(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",rc(d,g,M.length===0?null:M))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function j(g,M){let T=u||{},ee=T.metadata&&typeof T.metadata=="object"?T.metadata:{},Ie={};for(let Be of["impl_runtime","impl_model","impl_effort"])Ie[Be]=Object.hasOwn(f,Be)?f[Be]:typeof ee[Be]=="string"?ee[Be]:"";Ie[g]=M;let Ye=cc(Ie,x(),Y()),tt={};for(let Be of["impl_runtime","impl_model","impl_effort"])tt[Be]=f[Be],f[Be]=Ye[Be]||"";y(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ye,orchestration_runtime:Y()})).then(Be=>{let bt=Array.isArray(Be)?Be[0]:Be;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");u=bt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];y()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])tt[Be]===void 0?delete f[Be]:f[Be]=tt[Be];y(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function me(g,M,T){if(!s||!d)return!1;try{let ee=await Promise.resolve(s(g,M)),Ie=Array.isArray(ee)?ee[0]:ee;return Ie&&typeof Ie=="object"&&Ie.id?(u=Ie,!0):(ae(T,"error"),!1)}catch{return ae(T,"error"),!1}}function $e(g){setTimeout(()=>{try{let M=e.querySelector(g);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function ce(){Z=!0,z=u&&u.title||"",y(),$e('.detail-edit__input[data-edit="title"]')}function ot(g){z=g.target.value}function Se(){Z=!1,z="",y()}function gt(){me("edit-text",{id:d,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(Z=!1,z=""),y()})}function Ke(){K=!0,L=u&&u.description||"",y(),$e('.detail-edit__textarea[data-edit="description"]')}function Tt(g){L=g.target.value}function Ut(){K=!1,L="",y()}function dr(){me("edit-text",{id:d,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M&&(K=!1,L=""),y()})}function wt(g,M,T,ee){if(g.key==="Escape"){g.stopPropagation(),T();return}g.key==="Enter"&&(!ee||g.ctrlKey||g.metaKey)&&(g.preventDefault(),M())}function Rt(g){let M=g.target.value;me("update-status",{id:d,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function ur(g){let M=Number(g.target.value);me("update-priority",{id:d,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function pr(g){E=g.target.value}function Nt(){let g=E.trim();g.length!==0&&me("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M&&(E=""),y()})}function nr(g){if(g.key==="Escape"){g.stopPropagation(),E="",y();return}g.key==="Enter"&&(g.preventDefault(),Nt())}function kt(g){me("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let fr={onCopyPath:v,onOpenDoc:C};function Je(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Pt(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(g){let T=(Array.isArray(g.dependencies)?g.dependencies:[]).map(ee=>({id:Je(ee),icon:Pt(ee)})).filter(ee=>ee.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${T.map(ee=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ee.id)}
                  >
                    ${ee.icon?`${ee.icon} `:""}${ee.id}
                  </button>`:c`<span class="detail-dep"
                    >${ee.icon?`${ee.icon} `:""}${ee.id}</span
                  >`)}
          </div>`}
    `}function A(g){let M=g.metadata||{},T=g.workflow||{},ee=T.stages||{},Ie=ee.spec&&ee.spec.stale,Ye=ee.impl&&ee.impl.stale,tt=ee.plan||null,Be=T.route_source==="derived",bt=T.route||M.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":bt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(M,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${M.spec_review||"\uC5C6\uC74C"}${Ie?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${tt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${tt?.approval_receipt||"\uC5C6\uC74C"}${tt?.approval_state==="stale"?" \xB7 stale":tt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(M,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${M.impl_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${T.exec_receipt.kind}:${T.exec_receipt.actor}@${T.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${T.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${M.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${M.pr_url}</span>
          </div>`:""}
    `}let R={route:["quick_fix","spec_backed","full_plan"]};async function _(g,M){let T=M.target.value;if(g==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await me("update-workflow-meta",{id:d,key:g,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function P(g){let M=g.metadata||{};return c` ${((ee,Ie)=>{let Ye=R[ee],tt=typeof M[ee]=="string"?M[ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ee}
          data-edit=${`wfmeta-${ee}`}
          @change=${Be=>_(ee,Be)}
        >
          <option value="" ?selected=${!Ye.includes(tt)}>
            ${Ie}
          </option>
          ${Ye.map(Be=>c`<option value=${Be} ?selected=${tt===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function te(g,M){return Z?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${ot}
            @keydown=${T=>wt(T,gt,Se,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${gt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Se}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${At(M).map(T=>c`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ce}
        >
          ✎
        </button>
      </div>
    `}function de(g){let M=$t(g.created_at),T=$t(g.updated_at);return!M&&!T?c``:c`
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${T?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function Ne(g,M){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Rt}
        >
          ${v_.map(T=>c`<option value=${T} ?selected=${T===g}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${w_.map(T=>c`<option value=${String(T)} ?selected=${T===M}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function Re(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ke}
            >
              ✎
            </button>`}
      </div>
      ${K?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${Tt}
              @keydown=${M=>wt(M,dr,Ut,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ut}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ct(g){let M=typeof g.notes=="string"?g.notes:"";return M.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function ut(g){let M=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(T=>c`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>kt(T)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${E}
            @input=${pr}
            @keydown=${nr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Nt}
          >
            추가
          </button>
        </span>
      </div>
    `}function w(){if(!d)return c``;let g=u||{},M=String(g.id||d),T=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ee=st(),Ie=g.status||"open",Ye=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",tt=g.description||"",Be={...g,metadata:{...g.metadata||{},...f}};return c`
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
            @click=${Q}
          >
            ${M}
          </button>
          ${te(T,ee)}
          ${oc(Be)}
          ${sc({metadata:Be.metadata,workspace_values:m(),catalog:x(),execution_defaults:D(),expanded:O,presets:X()?.presets||[],preset_id:h,preset_busy:I,skipped_orchestration_keys:S},{onToggle:bt=>{O=bt,y()},onEdit:(bt,sr)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){j(bt,sr??"");return}N(bt,sr??"")},onPresetSelect:bt=>{h=bt,S=[],y()},onPresetApply:()=>{be()}})}
          ${Ne(Ie,Ye)} ${de(g)}
          ${Re(tt)}
          ${Gl(k,fe,{expanded:ze,draft:J,sending:se,error:ue})}
          ${ct(g)} ${ut(g)} ${p(g)}
          ${A(g)} ${P(g)}
          ${Wl(g,fr)}
          ${_c({expanded:je,loading:Oe,error:ge,data:he},{onToggle:He})}
          ${fc(Ae(),pe,{total:ee,expanded:Qe})}
        </div>
      </div>
    `}function y(){Ze(w(),e)}return{load(g){g!==d&&(f={},h="",S=[],O=!1,F(),Xe(),Te()),d=g,u=null,Ve(),$()},clear(){d=null,u=null,f={},h="",I=!1,S=[],O=!1,F(),Xe(),Te(),Ee.close(),ve.close(),Ze(c``,e)},destroy(){we&&(we(),we=null),Me&&(Me(),Me=null),Pe&&(Pe(),Pe=null),document.removeEventListener("keydown",ke),Ee.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),ve.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),d=null,u=null,h="",I=!1,S=[],Xe(),Te(),Ze(c``,e)}}}function gc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,u,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function zs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Hs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function bc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Gs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function k_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:zs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hc(e,t){let r=k_(e,t);return r?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?$t(r.deploy.at):""}
            >${Gs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Hs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function ln(e){let t=Ft(e.created_at),r=Ft(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${$t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function $_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Dn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?$_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function kr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var x_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:x_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function oa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?Ft(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",u=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,S=c`<span class="worker-mini__title">${e.title}</span>`,O=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",q=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Z=r.map(Xe=>Xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Xe===e.completion_badge&&e.completion_title||""}
          >${Xe}</span
        >`),K=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",z=n.length>0?n.map(Xe=>c`<span class="worker-usage" title=${Xe.tooltip}
              >${Xe.label}</span
            >`):s?c`<span class="worker-usage" title=${nn(e.usage)}
            >${s}</span
          >`:"",L=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",E=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",F=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",W=e.discard,oe=W?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${W?.attempt_id||""}
          data-operation-id=${W?.operation?.operation_id||""}
          data-discard-mode=${W?.confirmation||"unmerged"}
          ?disabled=${W?!W.enabled:e.discard_enabled===!1}
          title=${W?W.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${W?.label||"\uD3D0\uAE30"}
        </button>`:"",ue=e.stale_work||null,J=ue?c`${ue.can_resume||ue.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",se=ue?c`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Le=e.revise_action?c`<button
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
        </button>`:"",ze=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||W?.operation||e.revise_action||ue);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${h}${I}${S}</div>
          <div class="worker-mini__row2">
            ${z}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${$t(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Hs(e.work_ms)}</span
                >`:""}${Z}${L}
            <span class="worker-mini__actions"
              >${E}${F}${k}${oe}</span
            >
            ${ln(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${u}${h}${I}${O}${q}${Z}${f}${K}
            </div>
            <div class="worker-mini__body">${S}${se}</div>
            ${ze?c`<div class="worker-mini__foot">
                  ${z}${L}
                  <span class="worker-mini__actions"
                    >${E}${F}${k}${oe}${Le}${J}</span
                  >
                  ${kr(e)}
                </div>`:""}
            ${ln(e)}`:c`<div class="worker-mini__line">
              ${d}${u}${h}${I}${S}${O}${q}${Z}${f}${K}${z}${L}${E}${F}${k}${oe}
            </div>
            ${kr(e)} ${ln(e)}`}
  </div>`}function A_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?fs(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${ln(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?A_(n):oa(n))}
          </div>`}
  </section>`}function aa(e,t){return`${e}\0${t}`}function ia(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function S_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function E_(e,t){return e==="internal"&&t===void 0}function vc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function wc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${vc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=S_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:E_(a,s)}}function kc(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(d,[]);for(let u of Array.isArray(l.items)?l.items:[])n.set(u.id,d)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=aa(i.root_dir,l.id),u=Array.isArray(l.items)?l.items[0]:null,h=!!u&&u.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],I=s.get(d);if(I)for(let S of h){let O=n.get(S);O&&O!==d&&!I.includes(O)&&I.push(O)}}let o=(i,l)=>{let d=new Set,u=[i];for(;u.length>0;){let f=u.pop();if(f===l)return!0;!f||d.has(f)||(d.add(f),u.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,l]of s){let d=[];for(let u of l){let f=r.get(u);o(u,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function $c(e){let t=ia(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=vc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function xc(e,t){return aa(e,t)}var Ac=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Nn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ks(e,t){let r=Ac.find(s=>s.step===e);if(!r)return null;let n=Ac.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Sc(e){let t=Nn.findIndex(r=>r.step===e);return Nn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function zr(e){let t=Nn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function T_(e){let t=Nn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Nn.length}}function Ys(e){let t=T_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ca=new Set(["queued","running","retry_pending","repairing"]),Ec=new Set(["failed","succeeded"]),C_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},qn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},R_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:qn.base_containment,child_sweep:qn.child_sweep,branch_cleanup:qn.branch_cleanup,parent_close:qn.parent_close};function I_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function L_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ca,...Ec].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function O_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function la(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=C_[s];if(!o)return null;let a=Ks(r,`${n} ${o}`);return a?{...a,active:ca.has(s),failed:s==="failed"}:null}function M_(e){return!e||typeof e!="object"?null:R_[e.step]||null}function Fn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=M_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=I_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(S=>S&&typeof S=="object"&&L_(S,t,i)).sort(O_):[],d=a?l:[],u=d.find(S=>ca.has(S.state));if(u)return la(u);if(s)return s.step==="repo_operations"&&l[0]?la(l[0],!0):null;let f=d.find(S=>Ec.has(S.state)?S.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return la(f);if(n){let S=Ks(n.step,n.label);return S?{...S,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?qn[e.cleanup_cursor]:null;if(!h)return null;let I=Ks(h.step,h.label);return I?{...I,active:!0,failed:!1}:null}function Zs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Tc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Cc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function da(e){for(let t of Rc(e))if(Object.hasOwn(Tc,t))return Tc[t];return null}function ua(e){let t=null;for(let r of Rc(e))Object.hasOwn(Cc,r)&&(t=Cc[r]);return t}function Xs(e){let t=da(e),r=ua(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Ic(e,t){let r=da(e)??da(t),n=ua(t)??ua(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Lc=160;function P_(e){return e.length>Lc?`${e.slice(0,Lc)}\u2026`:e}function D_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${P_(e.command)}</code>`:""}
  </div>`}function N_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function pa(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Oc(e){let t=e.failure?Xs(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${D_(e.failure.cause_detail)}
          ${N_(e.failure.reason)}
          ${kr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function q_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?pa(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),l=At(e.usage),d=Qt(e.usage),u=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,h=e.landing,I=e.attempt_id&&e.attempt_id===r,S=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${I?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${S}
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
            ${s?c`<button
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
            ${S}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${h?c`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?c`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||l.length>0||d||u||f?c`<div class="rtile__meta">
          ${u?c`<span class="worker-mini__badge">${u}</span>`:""}
          ${f?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(O=>c`<span class="worker-usage" title=${O.tooltip}
                    >${O.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${nn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${ln(e)} ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function fa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>q_(s,t,r))}
  </div>`}function Hr(e){return c`<svg
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
  </svg>`}function _a(){return Hr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ma(){return Hr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Mc(){return Hr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Pc(){return Hr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Dc(){return Hr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Nc(){return Hr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function qc(){return Hr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var jn=1,F_=6e4,j_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},B_=new Set(["auto_merge","merged","merge","done"]),Fc={running:3,paused:2,failed:1};function U_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function W_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Fc[d.run_state],h=Fc[i];if(f>h||f===h&&(d.started_at??0)>(l??0))continue}let u=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ht(e,a.bead_id),can_pause:i==="running"&&u,can_resume:i!=="running"&&u&&!n.has(a.attempt_id)})}return o}function jc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function ga(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],l=[],d=[],u=[],f=[],h=[],I=new Map,S=new Map,O=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let W=k.root_dir,oe=k.name||W,ue=a.get(W),J=ue&&typeof ue.revision=="number"?ue.revision:typeof k.revision=="number"?k.revision:0,se=St(k.attempts),Le=St(k.bead_titles),ze=St(k.pr_observations),Xe=St(k.admission),at=St(k.revise_parked),rt=St(k.merge_queue_state),nt=St(k.cleanup_failed),_e=St(k.discard_operations),qe=St(k.bead_blocked_by),fe=St(k.pr_activity),xe=Array.isArray(k.repo_operations)?k.repo_operations:[],Ee=Array.isArray(k.merge_queue)?k.merge_queue:[],Fe=new Set(Ee.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),ve=new Map(Ee.filter(H=>H&&typeof H.bead_id=="string").map(H=>[H.bead_id,H])),je=Array.isArray(k.queue)?k.queue:[],Oe=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(H=>H&&/^s[1-5]$/.test(H.id)&&Array.isArray(H.entries)),ge=St(k.lane_states),he=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Oe.length);O.set(W,he);let G=new Map(Oe.map(H=>[H.id,H])),V=new Map;for(let H of Oe)for(let re of H.entries)re&&typeof re.bead_id=="string"&&V.set(re.bead_id,H.id);let ye=Array.isArray(k.done)?k.done:[];for(let H of ye)H&&typeof H.bead_id=="string"&&h.push({id:H.bead_id,root_dir:W,workspace_name:oe});let Te=new Map;for(let H of ye)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&Te.set(H.bead_id,H.added_at);let Ue=H=>({id:H,title:Le[H]||H,root_dir:W,workspace_name:oe,expected_revision:J,draggable:!1}),He=new Set;for(let[H,re]of W_(se,Te))He.add(H),l.push({...Ue(H),lane:"running",...V.has(H)?{serial_lane_id:V.get(H)}:{},attempt_id:re.attempt_id,run_state:re.run_state,can_pause:re.can_pause,can_resume:re.can_resume,started_at:re.started_at,last_event_at:re.last_event_at,runner:re.runner,model:re.model,effort:re.effort,speed:re.speed,resumed_from:re.resumed_from,continuation_mode:re.continuation_mode,usage:re.usage,discard:cr(_e,H,{attempt_id:re.attempt_id}),badges:re.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:re.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:re.run_state==="failed"});for(let H of Array.isArray(k.pr_wait)?k.pr_wait:[]){let re=H&&H.bead_id;if(typeof re!="string"||He.has(re))continue;He.add(re);let Ce=St(ze[re]),We=St(Ce.pr),pe=Ce.gate?St(Ce.gate):null,m=Fe.has(re),$=ve.get(re)?.continuation_action||null,x=!!$&&$.continuation===null,D=rt.active===re,Y=H.external===!0,X=nt[re]||null,ne=St(fe[re]),le=Fn({bead_id:re,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:X,repo_operations:xe}),be=Zs(le),we=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Me=!!X&&["child_sweep","branch_cleanup","parent_close"].includes(X.step)&&!!pe&&pe.tier==="merged",Pe=Y&&!!X&&!!pe&&pe.tier==="merged",ke=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),Ve=cr(_e,re,{external:Y,merge_active:D||le?.step==="merge",merge_queued:m,cleanup_active:be,merged:!!X||pe?.tier==="merged"}),U=!!Ve.operation;d.push({...Ue(re),lane:"pr_wait",pr_number:typeof We.number=="number"?We.number:null,pr_url:typeof We.url=="string"?We.url:void 0,external:Y,usage:Ht(se,re),merge_step:le,badges:x?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:le?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:X?[zr(X.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${zr(X.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:le?le.failed===!0:!!X||ke,reason:X&&le?.active!==!0?Ys(X.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Me&&!Pe?!1:!m||x,merge_enabled:!U&&(x||pe?.enabled===!0||we||Me||Pe),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Pe||Me?"\uC815\uB9AC \uC7AC\uAC1C":we&&!Me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?Ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:m&&!x,cancel_enabled:!D,continuation_mismatch:$?.mismatch||null,discard:Ve,discard_action:Ve.action,discard_enabled:Ve.enabled,discard_title:Ve.title})}let Ae=(H,re,Ce,We)=>{let pe=H&&H.bead_id;if(typeof pe!="string"||He.has(pe))return null;He.add(pe);let m=at[pe],$=cr(_e,pe),x=$.operation?$:null,D={...Ue(pe),lane:re,draggable:!x,discard:x||void 0,reason:jc(Xe,pe),queue_position:Ce+1,queue_index:Ce,queue_length:We,badges:m?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!m,revise_action:!!m,revise_enabled:!!m&&!x,revise_title:m?m.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${m.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(qe,pe)&&(D.blocked_by=Array.isArray(qe[pe])?qe[pe].filter(Y=>typeof Y=="string"&&Y.length>0):[]),D};for(let H=0;H<je.length;H++){let re=Ae(je[H],"queue",H,je.length);if(!re)continue;u.push(re);let Ce=I.get(W);Ce?Ce.push(re):I.set(W,[re])}let st=[];for(let H=0;H<Oe.length;H++){let re=Oe[H],Ce=[];for(let pe=0;pe<re.entries.length;pe++){let m=Ae(re.entries[pe],re.id,pe,re.entries.length);m&&(Ce.push(m),u.push(m))}if(Ce.length===0)continue;let We=St(ge[re.id]);st.push({id:re.id,index:H,items:Ce,occupied_by:Array.isArray(We.occupied_by)?We.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(We.corrections)?We.corrections.length:0,cycle:We.cycle===!0})}S.set(W,st);let Qe=Array.from({length:he},(H,re)=>{let Ce=`s${re+1}`,We=G.get(Ce),pe=We&&Array.isArray(We.entries)?We.entries:[],m=St(ge[Ce]);return{id:Ce,index:pe.length,length:pe.length,occupied_by:Array.isArray(m.occupied_by)?m.occupied_by.filter($=>typeof $=="string"):[]}});for(let H of Array.isArray(k.runnable)?k.runnable:[]){let re=H&&H.bead_id;typeof re!="string"||He.has(re)||(He.add(re),i.push({...Ue(re),title:H.title||Le[re]||re,lane:"runnable",draggable:!0,reason:jc(Xe,re),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,blocked:H.blocked===!0,...Array.isArray(H.blocked_by)?{blocked_by:H.blocked_by.filter(Ce=>typeof Ce=="string"&&Ce.length>0)}:{},place_index:je.length,place_lanes:Qe}))}for(let H of ye){let re=H&&H.bead_id;if(typeof re!="string"||He.has(re)||(He.add(re),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let Ce=U_(se,re);f.push({...Ue(re),lane:"done",done:!0,usage:Ht(se,re),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:Ce&&typeof Ce.done_kind=="string"?Ce.done_kind:null})}}let q=new Map;s.forEach((k,W)=>{k&&typeof k.root_dir=="string"&&q.set(k.root_dir,W)});let Z=r&&r.running_sort==="repo"?"repo":"started";l.sort((k,W)=>{if(Z==="repo"){let J=q.get(k.root_dir)??Number.MAX_SAFE_INTEGER,se=q.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(J!==se)return J-se}let oe=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,ue=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return oe!==null&&ue!==null&&oe!==ue?oe-ue:oe===null&&ue!==null?1:oe!==null&&ue===null?-1:k.id.localeCompare(W.id)}),f.sort((k,W)=>(W.done_at??0)-(k.done_at??0));let K=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),z=[];for(let k of K){if(!k||typeof k.root_dir!="string")continue;let W=I.get(k.root_dir)||[],oe=S.get(k.root_dir)||[];z.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=jn?k.slots:jn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:St(k.runner_catalog),items:W,sublanes:{parallel:W,serial:oe},serial_lane_count:O.get(k.root_dir)||0})}let L={runnable:i,queue:u,queue_groups:z,running:l,pr_wait:d,done:f,automation:{total:z.length,both_on:z.filter(k=>k.auto_advance&&k.auto_merge).length}},E=ia(L);for(let k of h)E.has(k.id)||E.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...L.queue,...L.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let W=E.get(k.id);k.blockers=(k.blocked_by||[]).map(oe=>wc(oe,W,E,s)),k.blocker_warnings=k.blockers.filter(oe=>oe.missing_internal).map(oe=>`\u26A0 \uC120\uD589 ${oe.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let F=kc(L.queue_groups);for(let k of L.queue_groups)for(let W of k.sublanes.serial){let oe=F.get(xc(k.root_dir,W.id));oe&&(W.cross_wait_peers=oe)}return L}function z_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<F_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${$t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Ft(e,t)}</span
        >`}</span
  >`}function Bn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Un(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Qs(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ba(e){let t=At(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${nn(e.usage)}
        >${r}</span
      >`:""}function ha(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function H_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ma()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${_a()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Pc()}
        </button>`:""}
  </span>`}function Bc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?c`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>c`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Uc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?c`<div class="mon-blocker-warnings">
        ${t.map(r=>c`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Wc(){return c`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function G_(e,t){let r=typeof e.started_at=="number"?pa(t-e.started_at):"";return c`${Bn(e)}
    <div class="mon-c__meta">
      ${ha(e)}${z_(e.last_event_at,t)}${Un(e)}${Qs(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?c`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ba(e)}${H_(e)}${kr(e)}
    </div>`}function V_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ft(e.updated_at);return c`${Bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Un(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${ps(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Qs(e)}
      ${i?c`<span title=${`\uC218\uC815 ${$t(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Bc(e)}
      <span class="mon-c__ops">
        ${Wc()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(l=>c`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${l.id}
                  data-place-index=${String(l.index)}
                  role="menuitem"
                  aria-label=${`${l.id} \xB7 ${l.occupied_by.length>0?`\uC810\uC720 ${l.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${l.length}`}
                >
                  <strong>${l.id}</strong
                  ><span
                    >${l.occupied_by.length>0?`\uC810\uC720 ${l.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${l.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Uc(e)}`}function K_(e){let t=!!e.discard?.operation;return c`${Bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Un(e)}
      ${ha(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Bc(e)}
      <span class="mon-c__ops">
        ${Wc()}
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
        ${t?c`<button
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
    ${Uc(e)} ${kr(e)}
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function Y_(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${Bn(e)}
    <div class="mon-c__meta">
      ${Un(e)}${Qs(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ha(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${ba(e)}${t?c`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?c`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
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
          ${kr(e)}
        </div>`:""}`}function Z_(e,t){let r=e.done_kind||"",n=r?j_[r]||r:"",s=Ft(e.done_at,t);return c`${Bn(e)}
    <div class="mon-c__meta">
      ${Un(e)}${Qs(e)}
      ${n?c`<span
            class="mon-live__kind${B_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ba(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${$t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function zc(e,t){return e.lane==="running"?G_(e,t):e.lane==="runnable"?V_(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?K_(e):e.lane==="pr_wait"?Y_(e):Z_(e,t)}function Hc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return c`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
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
        ${e.auto_advance?ma():_a()}
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
        ${Dc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Nc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${jn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Gc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Mc():qc()}
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
        ${or.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Vc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return At(ys(t));let r={};for(let i of gr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let u of gr){let f=l[u];typeof f=="number"&&Number.isFinite(f)&&(r[u]+=f,n=!0,d=!0)}if(d){o+=1;let u=l.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(s+=u,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var Yc="bdui.monitor.done-range",Zc="bdui.monitor.running_sort",Xc="beads-ui.monitor.candidate-filter",ya={show_blocked:!1};function X_(){try{let e=window.localStorage.getItem(Xc);if(!e)return{...ya};let t=JSON.parse(e);return!t||typeof t!="object"?{...ya}:{show_blocked:t.show_blocked===!0}}catch{return{...ya}}}function Q_(e){try{window.localStorage.setItem(Xc,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function J_(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function em(){try{let e=window.localStorage.getItem(Yc);return zt(e)?e:qt}catch{return qt}}function tm(e){try{window.localStorage.setItem(Yc,e)}catch{}}function rm(){try{return window.localStorage.getItem(Zc)==="repo"?"repo":"started"}catch{return"started"}}function nm(e){try{window.localStorage.setItem(Zc,e)}catch{}}var Qc="tab:monitor:pipeline",sm=1e3,om=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Js(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
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
    ${zc(e,t)}
  </div>`}function am(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?c`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>Js(s,t))}
        </div>
      </section>`:c`<div class="mon-group__list">
        ${e.items.map(s=>Js(s,t))}
      </div>`;return c`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Hc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>c`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?c`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?c`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>c`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?c`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>Js(o,t))}
              </div>
            </section>`):""}
  </div>`}function Jc(e,t){let r=_t("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),u=em(),f=rm(),h=X_();function I(){let m=or.find($=>$.value===u);return m?m.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let O=ga(null,null),q=new Map,Z=null,K=null;async function z(m,$,x,D,Y=!0){if(!o||!x)return null;let X=await o(m,{...$,root_dir:x,expected_revision:D});if(X&&X.conflict&&Y){X.queue&&q.set(x,X.queue);let ne=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:D;X=await o(m,{...$,root_dir:x,expected_revision:ne})}return X&&X.queue&&x&&q.set(x,X.queue),X}function L(m,$){let x=q.get(m),D=s&&s.get?s.get():null,Y=(Array.isArray(D)?D:[]).find(ne=>ne?.root_dir===m);return(x||Y)?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action}async function E(m,$,x,D){let Y=await z(m,$,x,D),X=q.get(x)?.revision??Y?.queue?.revision??D;return mr(Y,(ne,le)=>z(m,{...$,continuation:ne,decision_token:le},x,X,!1),{refresh:ne=>z(m,$,x,ne?.queue?.revision??q.get(x)?.revision??X,!1)})}async function F(m,$,x,D){let Y=await mr({continuation_mismatch:D},(ne,le)=>z("worker-merge-queue-add",{bead_id:$,continuation:ne,decision_token:le},m,x,!1)),X=Y?.queue?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action;Y?.applied!==!0&&X?.continuation===null&&X.mismatch&&await F(m,$,Y.queue.revision,X.mismatch)}async function k(m,$,x){let D=await z("worker-discard",m,$,x);if(D&&D.discarded===!0){ae(Vs(D),"success",5e3);return}if(D&&D.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function W(m,$,x){return!o||!x?null:await o(m,{...$,root_dir:x})}async function oe(m){if(!o||!m&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:m}),x=$&&Array.isArray($.failed)?$.failed:[];x.length>0&&ae(`\uC790\uB3D9\uD654 ${m?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${x.map(D=>D.root_dir).join(", ")}`,"error",3200)}async function ue(){let m=new Map;for(let $ of O.pr_wait)m.has($.root_dir)||m.set($.root_dir,$.expected_revision);for(let[$,x]of m)await z("worker-merge-queue-add-all",{},$,x)}let J=null,se=!1,Le=null;function ze(){Le!==null&&clearTimeout(Le),Le=setTimeout(()=>{Le=null,se=!1},0)}function Xe(m){let $=m.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function at(m){let $=Xe(m);return!$||!J?null:($.getAttribute("data-root-dir")||"")===J.root_dir?$:null}function rt(){for(let m of Array.from(S.querySelectorAll(".mon-group--drag-over")))m.classList.remove("mon-group--drag-over")}function nt(m){let $=m.target,x=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(x){J={bead_id:x.getAttribute("data-issue-id")||"",lane:x.getAttribute("data-lane")||"",root_dir:x.getAttribute("data-root-dir")||"",revision:Number(x.getAttribute("data-revision")||0)||0,queue_index:Number(x.getAttribute("data-queue-index")),queue_length:Number(x.getAttribute("data-queue-length")),place_index:Number(x.getAttribute("data-place-index"))},se=!0;try{m.dataTransfer?.setData("text/plain",J.bead_id),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}}function _e(m){let $=at(m);$&&(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function qe(m){Xe(m)?.classList.remove("mon-group--drag-over")}function fe(){J=null,rt(),ze()}function xe(m){let $=at(m),x=J;if(J=null,rt(),!$||!x||!x.bead_id)return;m.preventDefault();let D=m.target,Y=typeof D?.closest=="function"?D.closest('.mon-card[data-lane="queue"]'):null,X=Y&&$.contains(Y)?Number(Y.getAttribute("data-queue-index")):NaN;if(x.lane==="runnable"){let be=Number.isFinite(X)?X:x.place_index;if(!Number.isFinite(be))return;z("worker-queue-place",{bead_id:x.bead_id,index:be},x.root_dir,x.revision);return}if(x.lane!=="queue"||Y&&Y.getAttribute("data-issue-id")===x.bead_id)return;let ne=x.queue_index,le=Number.isFinite(X)?ne>X?X:X-1:x.queue_length-1;!Number.isFinite(le)||le<0||le===ne||z("worker-queue-reorder",{bead_id:x.bead_id,to_index:le},x.root_dir,x.revision)}function Ee(m){let $=J_(O.runnable,h),x={runnable:$.visible,queue:O.queue,running:O.running,pr_wait:O.pr_wait,done:O.done};return c`${Gc({automation:O.automation,counts:{running:O.running.length,queue:O.queue.length,pr_wait:O.pr_wait.length},running_sort:f,done_range:u,token_total:Kc(O.done),token_tooltip:Vc(I())})}
      <div class="worker-lanes mon-lanes">
        ${om.map(D=>{let Y=x[D.lane],X=D.lane==="queue"?O.queue_groups.length>0?c`${O.queue_groups.map(ne=>am(ne,m))}`:void 0:Y.length>0?c`${Y.map(ne=>Js(ne,m))}`:void 0;return rr({id:`monitor-${D.lane}`,lane:D.pane,title:D.lane==="done"?`\uC644\uB8CC\xB7${I()}`:D.title,items:Y,empty:D.empty,body:X,live:D.lane==="running"&&Y.length>0,header_control:D.lane==="runnable"?c`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${h.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${$.hidden_blocked>0?c`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:D.lane==="pr_wait"&&Y.length>0?c`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Fe(){let m=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=l();O=ga(m,$,{done_since:Nr(u,x),running_sort:f}),Ze(Ee(x),S)}function ve(m,$){let x=a?a():void 0;if(!$||!x||$===x||!i){n(m);return}i($).then(()=>{n(m)}).catch(D=>{r("workspace switch for %s failed: %o",$,D)})}function je(m){return{root_dir:m.getAttribute("data-root-dir")||"",revision:Number(m.getAttribute("data-revision")||0)||0}}function Oe(m){if(typeof m=="string"&&m.length>0)return m;if(m&&typeof m=="object"){let $=m;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ge(m,$){let x=m.querySelector(".mon-link__trigger"),D=m.querySelector(".mon-link__popover"),Y=m.querySelector(".mon-link__error");!x||!D||!Y||(Te(),D.hidden=!1,x.setAttribute("aria-expanded","true"),Y.textContent=$,Y.hidden=!1)}async function he(m,$,x){let D=$.getAttribute("data-root-dir")||"",Y=$.getAttribute("data-issue-id")||"";if(!(!Y||!x||x===Y))try{await W(m,{a:Y,b:x},D),Te()}catch(X){ge($,Oe(X))}}function G(m,$){let{root_dir:x,revision:D}=je(m),Y=m.getAttribute("data-issue-id")||"",X=$.dataset.attemptId||m.getAttribute("data-attempt-id")||"",ne=$.classList;if(ne.contains("mon-link__trigger")){He($);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let le=$.dataset.targetId||"";he("dep-add",m,le);return}if(ne.contains("mon-blocker__remove")){let le=$.dataset.blockerId||"";he("dep-remove",m,le);return}if(ne.contains("mon-place__choice")){let le=$.dataset.lane||"parallel",be=Number($.dataset.placeIndex||0)||0;Te(),z("worker-queue-place",{bead_id:Y,...le==="parallel"?{}:{lane:le},index:be},x,D);return}if(ne.contains("worker-card__place")){Ue($);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let le=Number(m.getAttribute("data-queue-index")||0)||0,be=ne.contains("mon-op--up")?le-1:le+1;if(be<0)return;z("worker-queue-reorder",{bead_id:Y,.../^s[1-5]$/.test(m.dataset.lane||"")?{lane:m.dataset.lane}:{},to_index:be},x,D);return}if(ne.contains("mon-op--remove")){z("worker-queue-remove",{bead_id:Y},x,D);return}if(ne.contains("mon-op--pause")){W("worker-attempt-pause",{attempt_id:X},x);return}if(ne.contains("mon-op--discard")){if(!d(Dn(Y,"unmerged")))return;k({bead_id:Y,...X?{attempt_id:X}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,D);return}if(ne.contains("mon-op--resume")){tn().then(le=>{if(le!==null)return E("worker-attempt-resume",{attempt_id:X,...le!==""?{instructions:le}:{}},x,D)});return}if(ne.contains("mon-op--dismiss")){z("worker-attempt-dismiss",{attempt_id:X},x,D);return}if(ne.contains("worker-mini__merge")){let le=L(x,Y);le?.mismatch&&le.continuation===null?F(x,Y,D,le.mismatch):z("worker-merge-queue-add",{bead_id:Y},x,D);return}if(ne.contains("worker-mini__merge-cancel")){z("worker-merge-queue-remove",{bead_id:Y},x,D);return}if(ne.contains("worker-mini__discard")){let le=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Dn(Y,le)))return;k({bead_id:Y,...X?{attempt_id:X}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},x,D);return}if(ne.contains("worker-mini__revise-fix")){E("worker-revise-fix",{bead_id:Y},x,D);return}ne.contains("worker-mini__revise-approve")&&z("worker-revise-approve",{bead_id:Y},x,D)}function V(m){m.querySelector(".mon-link__list")?.replaceChildren();let x=m.querySelector(".mon-link__search");x&&(x.value="");let D=m.querySelector(".mon-link__direct");D&&(D.hidden=!0,D.dataset.targetId="",D.textContent="");let Y=m.querySelector(".mon-link__empty");Y&&(Y.hidden=!0);let X=m.querySelector(".mon-link__error");X&&(X.hidden=!0,X.textContent="")}function ye(m,$){let x=m.querySelector(".mon-link__list");if(!x)return;let D=document.createDocumentFragment(),Y=$c(O).filter(X=>X.id!==$);for(let X of Y){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=X.id,ne.dataset.search=`${X.id} ${X.title} ${X.location}`.toLocaleLowerCase();let le=document.createElement("strong");le.textContent=X.id;let be=document.createElement("span");be.textContent=X.title;let we=document.createElement("small");we.textContent=X.location,ne.append(le,be,we),D.append(ne)}x.replaceChildren(D)}function Te(){for(let m of Array.from(S.querySelectorAll(".mon-card-popover"))){let $=m;$.hidden=!0,$.classList.contains("mon-link__popover")&&V($)}for(let m of Array.from(S.querySelectorAll('[aria-expanded="true"]')))m.setAttribute("aria-expanded","false")}function Ue(m){let x=m.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!x)return;let D=x.hidden;Te(),D&&(x.hidden=!1,m.setAttribute("aria-expanded","true"))}function He(m){let x=m.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!x)return;let D=x.hidden;if(Te(),D){let Y=m.closest(".mon-card");ye(x,Y?.getAttribute("data-issue-id")||""),x.hidden=!1,m.setAttribute("aria-expanded","true");let X=x.querySelector(".mon-link__search");X&&(Ae(X),X.focus())}}function Ae(m){let $=m.closest(".mon-link__popover"),x=m.closest(".mon-card");if(!$||!x)return;let D=m.value.trim(),Y=D.toLocaleLowerCase(),X=0,ne=!1;for(let Pe of Array.from($.querySelectorAll(".mon-link__candidate"))){let ke=Pe,Ve=ke.dataset.targetId||"",U=Y.length===0||(ke.dataset.search||"").includes(Y);ke.hidden=!U,U&&(X+=1),Ve.toLocaleLowerCase()===Y&&(ne=!0)}let le=$.querySelector(".mon-link__direct"),be=x.getAttribute("data-issue-id")||"";if(le){let Pe=D.length>0&&!ne&&Y!==be.toLocaleLowerCase();le.hidden=!Pe,le.dataset.targetId=Pe?D:"",le.textContent=Pe?`\uC9C1\uC811 \uC785\uB825 \xB7 ${D}`:"",Pe&&(X+=1)}let we=$.querySelector(".mon-link__empty");we&&(we.hidden=X>0);let Me=$.querySelector(".mon-link__error");Me&&(Me.hidden=!0,Me.textContent="")}function st(m){let $=m.target;$&&S.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Te()}function Qe(m){if(m.key!=="Escape")return;let $=S.querySelector('[aria-expanded="true"]');Te(),$?.focus()}function H(m){let $=se;se=!1;let x=m.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest("a"))return;let D=x.closest(".mon-running-sort");if(D){m.preventDefault(),f=D.getAttribute("data-sort")==="repo"?"repo":"started",nm(f),Fe();return}let Y=x.closest(".mon-auto-all");if(Y){m.preventDefault(),oe(Y.getAttribute("data-on")==="true");return}if(x.closest(".mon-merge-all")){m.preventDefault(),ue();return}let ne=x.closest(".mon-ctl--advance");if(ne){m.preventDefault();let{root_dir:Pe,revision:ke}=je(ne);z("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},Pe,ke);return}let le=x.closest(".mon-ctl--merge-auto");if(le){m.preventDefault();let{root_dir:Pe,revision:ke}=je(le);z("worker-merge-auto-toggle",{on:le.getAttribute("data-on")==="true"},Pe,ke);return}let be=x.closest(".mon-card");if(!be)return;let we=x.closest("button");if(we){m.preventDefault(),G(be,we);return}let Me=be.getAttribute("data-issue-id");Me&&!$&&(m.preventDefault(),ve(Me,be.getAttribute("data-root-dir")||""))}function re(m){let $=m.target;if(!$||typeof $.closest!="function")return;let x=$.closest(".mon-filter__blocked");if(x){h={show_blocked:x.checked},Q_(h),Fe();return}let D=$.closest(".mon-done-range");if(D){u=zt(D.value)?D.value:qt,tm(u),Fe();return}let Y=$.closest(".mon-slots__input");if(!Y)return;let{root_dir:X,revision:ne}=je(Y),le=Number(Y.value);if(!Number.isFinite(le))return;let be=Math.max(jn,Math.floor(le));z("worker-queue-set-slots",{slots:be},X,ne)}function Ce(m){let $=m.target;$?.classList.contains("mon-link__search")&&Ae($)}e.addEventListener("click",H),e.addEventListener("change",re),e.addEventListener("input",Ce),e.addEventListener("dragstart",nt),e.addEventListener("dragover",_e),e.addEventListener("dragleave",qe),e.addEventListener("drop",xe),e.addEventListener("dragend",fe),document.addEventListener("click",st),document.addEventListener("keydown",Qe),s&&typeof s.subscribe=="function"&&(Z=s.subscribe(()=>{try{q.clear(),Fe()}catch{}}));function We(){K!==null&&(clearInterval(K),K=null)}function pe(){Le!==null&&(clearTimeout(Le),Le=null)}return{load(){r("load"),Fe(),K===null&&(K=setInterval(()=>{try{if(S.querySelector(".mon-card-popover:not([hidden])"))return;Fe()}catch{}},sm))},pause(){We()},clear(){We(),pe(),Z&&(Z(),Z=null),e.removeEventListener("click",H),e.removeEventListener("change",re),e.removeEventListener("input",Ce),e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",qe),e.removeEventListener("drop",xe),e.removeEventListener("dragend",fe),document.removeEventListener("click",st),document.removeEventListener("keydown",Qe),e.replaceChildren()}}}function ed(e,t,r){let n=_t("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Ze(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ze(c``,e)}}}var td=["bug","feature","task","epic","chore"];function rd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var nd=["Critical","High","Medium","Low","Backlog"];function sd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function I(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let F of td){let k=document.createElement("option");k.value=F,k.textContent=rd(F),o.appendChild(k)}a.replaceChildren();for(let F=0;F<=4;F+=1){let k=document.createElement("option");k.value=String(F);let W=nd[F]||"Medium";k.textContent=`${F} \u2013 ${W}`,a.appendChild(k)}}I();function S(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function O(E){s.disabled=E,o.disabled=E,a.disabled=E,i.disabled=E,l.disabled=E,u.disabled=E,f.disabled=E,f.textContent=E?"Creating\u2026":"Create"}function q(){d.textContent=""}function Z(E){d.textContent=E}function K(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let F=window.localStorage.getItem("beads-ui.new.priority");F&&/^\d$/.test(F)?a.value=F:a.value="2"}catch{o.value="",a.value="2"}}function z(){let E=o.value||"",F=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),F.length>0&&window.localStorage.setItem("beads-ui.new.priority",F)}async function L(){q();let E=String(s.value||"").trim();if(E.length===0){Z("Title is required"),s.focus();return}let F=Number(a.value||"2");if(!(F>=0&&F<=4)){Z("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),W=String(l.value||""),oe={title:E};k.length>0&&(oe.type=k),String(F).length>0&&(oe.priority=F),W.length>0&&(oe.description=W),O(!0);try{await t("create-issue",oe)}catch{O(!1),Z("Failed to create issue");return}z(),O(!1),S()}return r.addEventListener("cancel",E=>{E.preventDefault(),S()}),h.addEventListener("click",()=>S()),u.addEventListener("click",()=>S()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),L())}),n.addEventListener("submit",E=>{E.preventDefault(),L()}),{open(){n.reset(),q(),K();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var im=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function lm(e,t){return $o(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function od(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=lm(n,e);return c`<button
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
  `}function ad(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>c`<span class="settings-dialog__prefix">
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
  `}function id(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${im.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var cm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],jt="";function Bt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ld(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(m=>ae(m,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,d="",u={},f={},h=[],I=!1,S=null,O={},q="",Z="",K=!1,z=!1,L=!1,E=null;function F(){let m=t.queueStore?.get();return Bt(m)?m.runner_catalog:null}function k(){let m=t.queueStore?.get();return Bt(m)&&Bt(m.execution_defaults)?m.execution_defaults:null}function W(){let m=t.implPresetStore?.get();return Bt(m)&&Array.isArray(m.presets)?m:null}async function oe(){I=!0,Ae();try{let m=await r("get-session-defaults",{});u=Bt(m?.values)?{...m.values}:{},f={...u},h=Array.isArray(m?.warnings)?m.warnings:[]}catch(m){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${m instanceof Error?m.message:String(m)}`)}finally{I=!1,Ae()}}async function ue(){let m=Ql(u,f);if(Object.keys(m).length!==0){try{let $=await r("set-session-defaults",{values:m});u=Bt($?.values)?{...$.values}:{},f={...u},h=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ae()}}function J(m,$){$===jt?delete f[m]:f[m]=$,Ae(),ue()}async function se(){let m=t.queueStore?.get();if(!Bt(m))return;let $={orchestration_model:m.orchestration_model??null,orchestration_effort:m.orchestration_effort??null,orchestration_speed:m.orchestration_speed??null},x=Jl($,{...$,...O});if(Object.keys(x).length!==0){try{let D=await r("worker-queue-set-orchestration-defaults",{expected_revision:m.revision,values:x});if(D&&D.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}O={}}catch(D){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}Ae()}}function Le(m,$){O[m]=$===jt?null:$,Ae(),se()}async function ze(m){let $=t.queueStore?.get();if(!(!Bt($)||m<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:m})}catch(x){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ae()}}function Xe(){let m={},$=je();for(let x of Yl){let D=Cr.includes(x)?$[x]:f[x];typeof D=="string"&&D.length>0&&(m[x]=D)}return m}async function at(){let m=W();if(!m)return;let $=Xe();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let x=(m.presets||[]).find(Y=>Y.id===q),D=Z.trim()||(x?x.name:"");if(!D){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Y=x?await r("impl-preset-update",{expected_revision:m.revision,id:x.id,name:D,settings:$}):await r("impl-preset-create",{expected_revision:m.revision,name:D,settings:$});if(Y&&Y.applied){if(Z="",!x&&Array.isArray(Y.presets)){let X=Y.presets.find(ne=>ne.name===D);q=X?X.id:q}Ae()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ae()}catch(Y){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}}async function rt(){let m=W();if(!(!m||q.length===0))try{let $=await r("impl-preset-delete",{expected_revision:m.revision,id:q});$&&$.applied?(q="",Ae()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ae())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function nt(){let m=W(),$=t.queueStore?.get();if(!(!m||!Bt($)||q.length===0)){try{let x=await r("apply-impl-preset-global",{preset_id:q,expected_revision:m.revision,expected_queue_revision:$.revision});x&&x.applied?(u=Bt(x.values)?{...x.values}:{},f={...u},h=Array.isArray(x.warnings)?x.warnings:[],Bt(x.queue)&&(t.queueStore?.set?.(x.queue),O={}),x.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):x&&x.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(x){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ae()}}async function _e(){z=!0,L=!1,Ae();try{let m=await r("get-worker-system-prompt",{});!m||typeof m!="object"||Array.isArray(m)?L=!0:E=m}catch{L=!0}finally{z=!1,Ae()}}function qe(){if(K=!K,K&&!E){_e();return}Ae()}function fe(){let m=on({loading:z,error:L});if(m)return m;if(!E)return"";let $=Array.isArray(E.variants)?E.variants:[];return c`<div class="settings-dialog__sp-body">
      ${E.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${E.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(x=>c`<div class="settings-dialog__sp-variant" data-variant=${x.key}>
            <div class="settings-dialog__sp-cond">${x.condition}</div>
            ${vr(x.label,x.system_prompt)}
          </div>`)}
    </div>`}function xe(){return c`<section
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
        aria-expanded=${K?"true":"false"}
        @click=${qe}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?fe():""}
    </section>`}function Ee(m,$,x,D,Y,X){let ne=Y[m]??jt,le=Qo(m,x,Y,k(),F()),be=le.options.find(Me=>Me.value===ne),we=ne===jt?le.full_value:be?.full_value;return c`<select
        class=${ne===jt?"settings-dialog__unset":""}
        data-key=${m}
        aria-label=${$}
        title=${we||""}
        ?disabled=${X===!0||le.disabled}
        .value=${Wr(String(ne))}
        @change=${Me=>D(m,String(Me.target.value))}
      >
        <option value=${jt} ?selected=${ne===jt}>
          ${le.unset_label}
        </option>
        ${le.options.map(Me=>c`<option
              value=${Me.value}
              title=${Me.full_value||""}
              ?selected=${Me.value===ne}
            >
              ${Me.label}
            </option>`)}
      </select>
      ${ne===jt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(m,$,x,D,Y,X=!1){return c`<div
      class=${`settings-dialog__row${X?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ee(m,$,x,D,Y,X)}
      </span>
    </div>`}function ve(m,$,x,D,Y){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${m}
      </span>
      <span class="settings-dialog__controls">
        ${Ee(x,`${m} \uBAA8\uB378`,D,J,f,!1)}
        ${Ee(Y,`${m} effort`,Fs,J,f,!1)}
      </span>
    </div>`}function je(){let m=t.queueStore?.get(),$={};for(let x of Cr)$[x]=Object.prototype.hasOwnProperty.call(O,x)?O[x]:Bt(m)&&typeof m[x]=="string"?m[x]:null;return $}function Oe(){let m=F(),$=Xl(f),x=f.impl_runtime,D=f.impl_model,Y=W(),X=t.queueStore?.get(),ne=je(),le=Bs(m,S),be=an(m,S||void 0,ne.orchestration_model||lr).filter(ke=>ke!==lr),we=Bt(X)&&typeof X.slots=="number"?X.slots:2,Me=k()?.supported===!0,Pe=Qo("workflow_mode",On,f,k(),m);return c`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${h.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${Me?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${I?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${Wr(q)}
                  @change=${ke=>{q=String(ke.target.value),Ae()}}
                >
                  <option value="" ?selected=${q===""}>
                    실행 프리셋…
                  </option>
                  ${(Y?.presets||[]).map(ke=>c`<option
                        value=${ke.id}
                        ?selected=${ke.id===q}
                      >
                        ${ke.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${q.length===0}
                  @click=${nt}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Wr(Z)}
                  @input=${ke=>{Z=String(ke.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${at}
                >
                  ${q?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${q.length===0}
                  @click=${rt}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${Wr(S||jt)}
                      @change=${ke=>{let Ve=String(ke.target.value);S=Ve===jt?null:Ve,Ae()}}
                    >
                      <option
                        value=${jt}
                        ?selected=${!S}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${S==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${S==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Fe("orchestration_model","\uBAA8\uB378",le,Le,ne)}
                ${Fe("orchestration_effort","effort",be,Le,ne)}
                ${Fe("orchestration_speed","\uC18D\uB3C4",Ln,Le,ne)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${jt}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>J("workflow_mode",jt)}
                      >
                        ${Pe.unset_label}
                      </button>
                      ${f.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${On.map(ke=>c`<button
                            type="button"
                            data-mode=${ke}
                            aria-pressed=${String(f.workflow_mode===ke)}
                            @click=${()=>J("workflow_mode",ke)}
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
                ${ve("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Mn,"spec_review_effort")}
                ${ve("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",qs,"plan_review_effort")}
                ${ve("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Mn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Fe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ds,J,f)}
                ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ns,J,f,$)}
                ${Fe("impl_model","\uBAA8\uB378",js(m,x),J,f,$)}
                ${Fe("impl_effort","effort",an(m,x,D),J,f,$)}
                ${Fe("impl_speed","\uC18D\uB3C4",Ln,J,f,$)}
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
                        @click=${()=>ze(we-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${we}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>ze(we+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${xe()}
            `}
      </section>
    `}function ge(){let m=n.get();return c`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${m?c`
              ${od(m,s(),ye)}
              ${ad(m,d,{onDraft:$=>{d=$},onAdd:Te,onRemove:Ue})}
              ${id(m,He)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function he(m){let $=n.get();if($)try{let x=await r("display-policy-set",{expected_revision:$.revision,policy:m($)});G(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:m(x.policy)}),G(x)),x&&x.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function G(m){m&&m.policy&&typeof m.policy=="object"&&n.set(m.policy)}function V(m){he(m)}function ye(m){let $=n.get();if(!$)return;let x=!dm(m,$);V(D=>um(m,D,x))}function Te(){let m=d.trim();m.length!==0&&(d="",V($=>$.hidden_prefixes.includes(m)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,m]}),Ae())}function Ue(m){V($=>({hidden_prefixes:$.hidden_prefixes.filter(x=>x!==m)}))}function He(m){let $=n.get();if(!$)return;let x=$.chips[m]===!1;V(()=>({chips:{[m]:x}}))}function Ae(){Ze(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${cm.map(m=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${m.id}
                  aria-selected=${String(i===m.id)}
                  aria-controls=${`settings-pane-${m.id}`}
                  @click=${()=>st(m.id)}
                >
                  <span class="settings-dialog__glyph">${m.glyph}</span>
                  ${m.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${pe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Oe()} ${ge()}
          </div>
        </div>
      `,a)}function st(m){i=m,Ae()}let Qe=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Qe),a.addEventListener("cancel",Qe);let H=m=>{m.target===a&&pe()};a.addEventListener("click",H);let re=null;n.subscribe&&(re=n.subscribe(()=>{l&&Ae()}));let Ce=null;t.implPresetStore?.subscribe&&(Ce=t.implPresetStore.subscribe(()=>{l&&Ae()}));function We(m="execution"){l||(l=!0,t.onOpenChange?.(!0),i=m,d="",O={},Ae(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),oe())}function pe(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:We,close:pe,sessionDraft:()=>({...f}),destroy(){l=!1,a.removeEventListener("close",Qe),a.removeEventListener("cancel",Qe),a.removeEventListener("click",H),re&&(re(),re=null),Ce&&(Ce(),Ce=null),a.remove()}}}function dm(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function um(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var pm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function cd(e){return String(e).padStart(2,"0")}function fm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _m(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${cd(n.getHours())}:${cd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${pm[n.getMonth()]} ${n.getDate()} ${o}`;return`${fm(r,t)} \xB7 ${i}`}function mm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var dd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function ud(e){let t=!1,r=null,n=new Map;function s(){Ze(c``,e),e.hidden=!0}function o(){let l=dd.filter(u=>n.has(u.key));if(l.length===0){s();return}let d=Date.now();Ze(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(u=>{let f=n.get(u.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,I=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${u.label} usage`}
          >
            <span class="usage-meter__provider">${u.label}</span>
            ${f.windows.map(S=>{let O=typeof S.pct=="number"&&Number.isFinite(S.pct)?S.pct:0,q=Math.min(100,Math.max(0,O)),K=`resets ${_m(S.resetsAt,d)}${h?` \xB7 ${I}`:""}`;return c`<span
                class="usage-meter__window ${mm(q)}"
                style=${`--progress: ${q}%`}
                title=${K}
              >
                <span class="usage-meter__label">${S.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let u=await d.json();return!u||u.available!==!0||!Array.isArray(u.windows)?null:u}catch{return null}}async function i(){let l=await Promise.all(dd.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function pd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var gm="worker-ineligible";function va(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wa(e){return va(e).includes(gm)}var bm="worker-serial";function ka(e){return va(e).includes(bm)}function $a(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var hm=new Set(["done","failed","orphaned","stopped","discarded"]),ym={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},vm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},wm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function xa(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:wm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function fd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,d=new Map,u=!1,f=null,h=null,I=null,S=new Set,O=!1,q=0,Z=null,K=new Set;function z(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function L(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function E(){return o&&o()||""}async function F(){if(!s)return;let v=++q;O=!0,I=null,S.clear(),be();try{let C=await s("worker-parallel-analysis-targets",{root_dir:E()});if(v!==q||!we)return;let N=Array.isArray(C?.qualified)?C.qualified:[],j=Array.isArray(C?.excluded)?C.excluded:[];I={qualified:N,excluded:j};for(let me of N)me&&typeof me.id=="string"&&S.add(me.id)}catch{v===q&&we&&(I={qualified:[],excluded:[]},ae("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{v===q&&(O=!1,we&&be())}}function k(v){return Array.isArray(v.runs)?v.runs:[]}function W(){let v=z(),C=new Set;for(let N of Object.values(v.attempts||{})){let j=N;j&&typeof j.bead_id=="string"&&!hm.has(j.status)&&C.add(j.bead_id)}for(let N of Array.isArray(v.pr_wait)?v.pr_wait:[])N&&typeof N.bead_id=="string"&&C.add(N.bead_id);for(let N of Object.values(v.discard_operations||{})){let j=N;j&&j.phase!=="done"&&typeof j.bead_id=="string"&&C.add(j.bead_id)}return C}function oe(v){return v.filter(C=>ue(C)===null)}function ue(v){let C=z();for(let N of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(j=>j.bead_id===v))return N.id;return(Array.isArray(C.queue)?C.queue:[]).some(N=>N.bead_id===v)?"parallel":null}function J(v,C){let N=l.get(v);return N||[...C.order]}function se(v){if(v.length<2)return!1;let C=ue(v[0]);if(!C||C==="parallel")return!1;let N=z(),j=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find($e=>$e.id===C)?.entries.map($e=>$e.bead_id);if(!Array.isArray(j))return!1;let me=v.map($e=>j.indexOf($e));return me.every($e=>$e>=0)&&me.every(($e,ce)=>ce===0||$e>me[ce-1])}function Le(){let v=z(),C=Array.isArray(v.serial_lanes)?v.serial_lanes:[],N=C.find(j=>Array.isArray(j.entries)&&j.entries.length===0);return N?N.id:C[0]?.id||"s1"}function ze(v){let C=z().bead_titles||{};return typeof C[v]=="string"?C[v]:v}async function Xe(v,C){if(!s||u)return null;u=!0,be();try{return await s(v,C)}finally{u=!1,be()}}async function at(v){n?.setPending?.(!0);try{let C=await Xe("worker-parallel-analysis-start",{force:v,target_ids:Array.from(S)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ae(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ae(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function rt(){let v=L().job;!s||!v||await s("worker-parallel-analysis-cancel",{job_id:v.job_id})}async function nt(v){if(!(!s||K.has(v))){K.add(v),be();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:E(),run_id:v});if(!we)return;if(C?.ok===!0&&typeof C.prompt=="string"){Z={run_id:v,prompt:C.prompt};return}ae(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{K.delete(v),be()}}}function _e(){Z=null,be()}async function qe(){if(!Z)return;let v=await Xt(Z.prompt);ae(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)}function fe(v,C){a&&a(v,xa(C))}function xe(){return z().runner_catalog}function Ee(v){return Object.keys(xe()?.runners?.[v]?.models||{})}function Fe(v){let C=Ee(v),N=xe()?.runners?.[v]?.default_model;return typeof N=="string"&&C.includes(N)?N:C[0]||""}function ve(){let v=L().settings,C=f||v.runner||"claude",N=Ee(C),j=f?Fe(C):v.model||N[0]||"",me=$a(xe(),C,j),$e=v.effort||"",ce=me.includes($e)?$e:me[0]||"";return{runner:C,model:j,effort:ce,models:N,efforts:me}}async function je(v){let C=L().settings,N=await Xe("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:v.runner,model:v.model,effort:v.effort});(!N||N.applied!==!0)&&(f=null,be(),N&&N.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function Oe(v){f=v,be();let C=ve();je({runner:v,model:C.model,effort:C.effort})}function ge(v){let C=ve(),N=$a(xe(),C.runner,v);je({runner:C.runner,model:v,effort:N.includes(C.effort)?C.effort:N[0]||""})}function he(v){let C=ve();je({runner:C.runner,model:C.model,effort:v})}async function G(v,C){if(!s||u)return;let N=J(v,C),j=L();if(N.length<2||!j.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let me=d.get(v)||Le(),$e=()=>({snapshot_digest:j.last_good.identity_digest,group_index:v,lane:me,ordered_bead_ids:N,expected_revision:z().revision});u=!0,be();try{let ce=await s("worker-parallel-analysis-submit",$e());ce&&ce.queue&&r&&r.set(ce.queue),ce&&ce.applied!==!0&&ce.conflict===!0&&(ce=await s("worker-parallel-analysis-submit",$e()),ce&&ce.queue&&r&&r.set(ce.queue)),ce&&ce.applied===!0?(l.delete(v),ae(`\uC9C1\uB82C \uB808\uC778 ${me}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${ce?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{u=!1,be()}}function V(v,C,N){l.set(v,J(v,C).filter(j=>j!==N)),be()}function ye(v){l.delete(v),be()}function Te(v,C,N,j){let me=[...J(v,C)],$e=me.indexOf(N),ce=$e+j;$e<0||ce<0||ce>=me.length||(me.splice(ce,0,...me.splice($e,1)),l.set(v,me),be())}function Ue(){let v=L().settings,C=Object.keys(xe()?.runners||{}),N=ve();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${j=>Oe(j.target.value)}
        >
          ${C.map(j=>c`<option
                value=${j}
                ?selected=${N.runner===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${j=>ge(j.target.value)}
        >
          ${N.models.map(j=>c`<option
                value=${j}
                ?selected=${N.model===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${j=>he(j.target.value)}
        >
          ${N.efforts.map(j=>c`<option
                value=${j}
                ?selected=${N.effort===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      ${He(v)}
    </div>`}function He(v){return!st(v)||Ae(v)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:v.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${v.runner}/${v.model} · effort
        ${v.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:v.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function Ae(v){return v.is_default===!0&&v.compatible===!1}function st(v){return!!(v.runner&&v.model&&v.effort)}function Qe(v){return st(v)&&v.compatible!==!1}function H(v){let C=Math.max(0,Math.floor(v/1e3)),N=Math.floor(C/60),j=C%60;return`${N}:${String(j).padStart(2,"0")}`}function re(v){let C=v.job;if(C){let N=typeof C.started_at=="number"?C.started_at:0,j=`${C.runner||"?"}/${C.model||"?"}`,me=N?` \xB7 \uACBD\uACFC ${H(Date.now()-N)}`:"",$e=typeof C.session_id=="string"?C.session_id:"",ce=k(v).find(ot=>ot.run_id===C.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${j} · effort ${C.effort||"?"}${me}</span
        >
        ${$e?c`<code class="pa-session-id" title=${$e}
              >${$e.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>fe(C.job_id,ce||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ce?.prompt_saved!==!0||K.has(C.job_id)}
          @click=${()=>{nt(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ce()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ce(){return n?.isPending?.()===!0}function We(v){let C=!!v.job,N=Qe(v.settings),j=I!==null&&S.size===0,me=C||u||Ce()||O;return c`<div class="pa-meta">
      ${v.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(v.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${re(v)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||me||j}
        @click=${()=>{at(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||me||j}
        @click=${()=>{at(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{rt()}}
      >
        취소
      </button>
    </div>`}function pe(v){return typeof v=="string"&&v.length>0?v:"\uBBF8\uBC30\uCE58"}function m(v,C){C?S.add(v):S.delete(v),be()}function $(){let v=I?.qualified||[],C=I?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${O?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${v.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${I&&v.length>0?c`<ul class="pa-targets__list">
            ${v.map(N=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${S.has(N.id)}
                      @change=${j=>m(N.id,j.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__route">${N.route}</span>
                  <span class="pa-target__lane">${pe(N.lane)}</span>
                </li>`)}
          </ul>`:I&&v.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${I&&C.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(N=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${ym[N.reason]||N.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${pe(N.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function x(v){let C=typeof v.session_id=="string"&&v.session_id.length>0,N=C?v.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${v.outcome}"
        >${vm[v.outcome]||v.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(v.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${v.runner||"?"} / ${v.model||"?"} / ${v.effort||"?"}</span
      >
      ${C?c`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${v.outcome==="failure"&&v.reason?c`<span class="pa-run-row__reason">${v.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>fe(v.run_id,v)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${v.prompt_saved!==!0||K.has(v.run_id)}
          @click=${()=>{nt(v.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function D(v){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${v.length>0?c`<ul class="pa-runs__list">
            ${v.map(C=>x(C))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Y(){return Z?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${_e}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Z.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{qe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${_e}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Z.prompt}</pre
        >
      </section>
    </div>`:""}function X(v,C){let N=J(v,C),j=W(),me=N.filter(Ke=>j.has(Ke)),$e=oe(N),ce=se(N),ot=Array.isArray(z().serial_lanes)?z().serial_lanes:[],Se=d.get(v)||Le(),gt=C.eligible!==!0||N.length<2||me.length>0||$e.length>0||ce||u;return c`<section class="pa-group" data-group-index=${String(v)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(Ke=>c`<span class="pa-group__category">${Ke}</span>`)}
        ${ce?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${$e.length>0?c`<span class="pa-group__stale"
              >stale — ${$e.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${N.map((Ke,Tt)=>c`<li class="pa-member" data-bead-id=${Ke}>
              <span class="pa-member__seq">${Tt+1}</span>
              <span class="pa-member__title">${ze(Ke)}</span>
              ${j.has(Ke)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ke}
                ?disabled=${Tt===0}
                aria-label=${`${Ke} \uC704\uB85C`}
                @click=${()=>Te(v,C,Ke,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ke}
                ?disabled=${Tt===N.length-1}
                aria-label=${`${Ke} \uC544\uB798\uB85C`}
                @click=${()=>Te(v,C,Ke,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ke}
                aria-label=${`${Ke} \uC81C\uC678`}
                @click=${()=>V(v,C,Ke)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(Ke=>c`<li class="pa-evidence">
              <code>${Ke.path}</code>
              <span class="pa-evidence__locator">${Ke.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ye(v)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ke=>{d.set(v,Ke.target.value),be()}}
          >
            ${ot.map((Ke,Tt)=>c`<option
                  value=${Ke.id}
                  ?selected=${Se===Ke.id}
                >
                  직렬 ${Tt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${gt}
          @click=${()=>{G(v,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ne(v){let C=Array.isArray(v.issues)?v.issues:[],N=C.filter(me=>me.verdict==="parallel_ok").length,j=C.filter(me=>me.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${j}</span>
    </div>`}function le(){let v=we&&!!L().job;if(v&&h===null){h=setInterval(()=>be(),1e3);return}!v&&h!==null&&(clearInterval(h),h=null)}function be(){let v=L();f&&v.settings.runner===f&&(f=null);let C=v.last_good?.result;le(),Ze(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Q}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Ue()} ${We(v)} ${$()}
            ${C?c`${C.groups.map((N,j)=>X(j,N))}
                ${C.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ne(C)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${D(k(v))}
          </div>
        </div>
        ${Y()}
      `,i)}let we=!1,Me=()=>{we=!1,Z=null,q+=1,le()},Pe=v=>{v.target===v.currentTarget&&Q()};i.addEventListener("close",Me),i.addEventListener("cancel",Me),i.addEventListener("click",Pe);let ke=null;r&&r.subscribe&&(ke=r.subscribe(()=>{we&&be()}));let Ve=null;n&&n.subscribe&&(Ve=n.subscribe(()=>{we&&be()}));function U(){we||(we=!0,be(),F(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Q(){we&&(we=!1,Z=null,q+=1,le(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:U,close:Q,destroy(){we=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",Me),i.removeEventListener("cancel",Me),i.removeEventListener("click",Pe),ke&&(ke(),ke=null),Ve&&(Ve(),Ve=null),i.remove()}}}var _d=new Set(["sh","bash","zsh","dash","ksh"]),md=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gd(e){let t=e.split("/");return t[t.length-1]||""}function km(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=gd(r[0]);if(n!=="env")return _d.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&_d.has(gd(s))}function $m(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function xm(e){let t=[],r=0;md.lastIndex=0;for(let n of e.matchAll(md)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:$m(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Am(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function bd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,u=!1;function f(E,F){return F?xm(E).map(k=>k.kind==="plain"?k.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):E}function h(){if(!s)return c``;let E=o==="ready"&&km(a),F=o==="ready"?a.split(`
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
              ?disabled=${o!=="ready"}
              @click=${()=>{S()}}
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
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${F.map((k,W)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(k,E)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function I(){Ze(h(),n)}async function S(){if(o!=="ready")return;let E=await Xt(a);ae(E?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",E?"success":"error")}function O(E){E.key==="Escape"&&s&&(E.preventDefault(),z())}function q(){u||(document.addEventListener("keydown",O),u=!0)}function Z(){u&&(document.removeEventListener("keydown",O),u=!1)}async function K(E,F=null){let k=++l;q(),s={...E},d=F||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",I(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",I();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",I();return}let ue="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(E.lane)+"&base_sha="+encodeURIComponent(E.base_sha);try{let J=await r(ue),se=await J.json().catch(()=>({}));if(k!==l)return;if((t?t():"")!==oe){z();return}if(!J.ok||!se||se.ok!==!0){o="error",i=Am(se&&typeof se.error=="string"?se.error:""),I();return}s={lane:se.lane,base_sha:se.base_sha,path:se.path,base_ref:se.base_ref},a=String(se.content),o="ready",I()}catch{if(k!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",I()}}function z(){l+=1,Z(),s=null,a="",I();let E=d;d=null,E?.isConnected&&E.focus()}function L(){z(),n.remove()}return{open:K,close:z,destroy:L}}function hd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function d(L,E){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${E}</span
    >`}function u(L){if(typeof L!="number"||!Number.isFinite(L))return"";let E=L/6e4;return Number.isInteger(E)?`timeout ${E}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function f(L){let E=u(L);return E?d("config",E):""}function h(L,E,F){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${F.script}
      @click=${k=>{s&&s({lane:L,base_sha:E.base_sha,path:F.script,base_ref:E.base_ref},k.currentTarget)}}
    ></button>`}function I(L){let E=typeof L.base_sha=="string"?L.base_sha:"",F=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${E?`@${E.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${F}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${h("verify",L,L.verify)}
              ${f(L.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${h("deploy",L,L.deploy)}
              ${f(L.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function S(L){let E=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return E&&(E.status==="resolved"||E.status==="absent")?I(E):E&&(E.status==="pending"||E.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${E.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${E.error_code?c` — <code>${E.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(L){if(!r)return;let E=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(E),E&&E.conflict){let F=await r("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(F)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function Z(L,E,F){return c`<div class="worker-repo-ops__policy-group" data-policy=${F}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${E.map(k=>c`<li data-token=${k}>
              ${q[k]||k}
            </li>`)}
      </ul>
    </div>`}function K(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(E=>{let F=[q[E.trigger]||E.trigger];return Number.isInteger(E.attempts_per_operation_attempt)?F.push(`operation\uB2F9 ${E.attempts_per_operation_attempt}\uD68C`):Number.isInteger(E.attempts)?F.push(`${q[E.budget]||E.budget} ${E.attempts}\uD68C`):Number.isInteger(E.sessions_per_user_action)&&F.push(`${E.sessions_per_user_action}\uD68C`,q[E.user_actions]||E.user_actions),E.applies_when&&F.push(q[E.applies_when]||E.applies_when),c`<li data-token=${E.id}>
            <strong>${q[E.id]||E.id}</strong>
            <span>${F.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let L=o(),E=L.auto_repair!==!1,F=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,k=Array.isArray(L.repo_operations)?L.repo_operations:[],W=k.find(se=>se.state==="repairing"),oe=k.filter(se=>se.state==="failed"||se.state==="repairing"),ue=oe.length?Math.min(...oe.map(se=>typeof se.repair?.remaining=="number"?se.repair.remaining:0)):F?.auto_repair?.resolution_ladder?.find(se=>se.id==="auto_repair_session")?.attempts??1,J=Array.isArray(F?.auto_repair?.resolution_ladder)?F.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${E}
          @change=${se=>{O(se.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${W?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${W.repair?.owner_bead||W.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${F?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(F.worker_automatic||[]).length} · 해결 사다리
                ${J.length} · 금지
                ${(F.never_automatic||[]).length}</span
              >
            </summary>
            ${Z("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",F.worker_automatic||[],"worker-automatic")}
            ${F.supported===!1||F.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${F.schema_version})`}
                </div>`:K(J)}
            ${Z("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",F.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${S(l())} ${z()}
      </details>`}}}var Sm=20,yd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},vd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Em(e,t,r=Sm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function wd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Tm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kd(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function $d(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Cm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(vd,n)?vd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Rm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Gs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${wd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yd,t.kind)?yd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${zs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Hs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wd(e)}"
          >${Tm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?$d(Ic(t.failure_kind,n)):""}
      ${Cm(t)}
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${zs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Im(e){let t=e.cleanup,r=zr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?$t(e.at):""}
      >${Gs(e.at)||"\u2014"}</span
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
        ${Sc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${$d(Xs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Lm(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?Im(t):Rm(t))}
        </ul>`}
  </section>`}function xd(e,t={}){let r=null;function n(){Ze(r?Lm(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Em(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Om="tab:worker:ready",Mm="tab:worker:blocked",Pm="tab:worker:in-progress",Dm="tab:worker:closed",eo=1,Ad=5;function Sd(e){return In(e).path.length>0}var Cd="beads-ui.worker.candidate-filter",Aa={show_blocked:!1,spec:"all"};function Nm(){try{let e=window.localStorage.getItem(Cd);if(!e)return{...Aa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Aa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Aa}}}function qm(e){try{window.localStorage.setItem(Cd,JSON.stringify(e))}catch{}}function Fm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jm=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rd="bdui.worker.candidate_sort",Bm=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],to="spec";function Um(){try{let e=window.localStorage.getItem(Rd);return e==="board"||e==="created"||e==="spec"?e:to}catch{return to}}function Wm(e){try{window.localStorage.setItem(Rd,e)}catch{}}var Id="bdui.worker.done-range";function zm(){try{let e=window.localStorage.getItem(Id);return zt(e)?e:qt}catch{return qt}}function Hm(e){try{window.localStorage.setItem(Id,e)}catch{}}var Gm="(max-width: 640px)",Ld="beads-ui.worker.lane-collapsed",Wn={queue:!0,done:!0};function Vm(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...Wn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wn}:{queue:typeof t.queue=="boolean"?t.queue:Wn.queue,done:typeof t.done=="boolean"?t.done:Wn.done}}catch{return{...Wn}}}function Km(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Ed(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ym(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(as(r)),t==="board"?n:[...n.filter(Sd),...n.filter(s=>!Sd(s))])}function Zm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Xm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Td(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function eg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function tg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Sa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ng(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function sg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Td(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Td(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function og(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,u=null,f=null,h=null,I={},S=!1,O=!1,q={}){let Z=!!l&&l.position>0,K=!!l?.continuation_action&&l.continuation_action.continuation===null,z=!!l&&l.active===!0,L=l&&l.failure||null,E=eg(l?l.waiting:null,h),F=r[e]||null,k=F&&F.gate?F.gate:null,W=F&&F.pr?F.pr:null,oe=ng(h),ue=tg(l?l.resolution:null),J=rg(l?l.head_review:null),se=l&&l.head_review||null,Le=l&&l.authority||null,ze=!!se&&["pending","reviewing","revising"].includes(se.state),Xe=Z&&!z&&(se?.state==="failed"||!Le||Le.source==="automatic"&&!O),at=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ue?ue.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":E,rt=!!k&&k.base_badge==="\uCDA9\uB3CC",nt=!!k&&k.enabled===!0,_e=Fn({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:q.repo_operations}),qe=Zs(_e),fe=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",xe=i&&!!n&&!!k&&k.tier==="merged",Ee=Xe&&(nt||rt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||fe||xe),Fe=i&&rt&&d===!1,ve=cr(I,e,{external:i,merge_active:z||_e?.step==="merge",merge_queued:Z,conflict_active:!!a,cleanup_active:qe,merged:!!n||k?.tier==="merged"}),je=!!ve.operation,Oe=!fe&&!!n&&n.step==="repo_operations",ge=sg({continuation_required:K,merge_step:_e,conflict_badge:at,conflict_live:ue?.live===!0||a==="running",head_review:se&&J?{...J,state:se.state,failure_reason:se.failure_reason}:null,recovery:oe,cleanup_failed:n,cleanup_label:n?zr(n.step):null,base_exception:f,conflicting:rt,gate:k,queue_failure:L,auto_skip:u,queued:Z,queue_active:z,queue_position:l?l.position:0,activity:at?null:o&&o.activity||null}),he=ge?.live===!0&&ge.title?c`<span title=${ge.title}>${ge.label}</span>`:ge?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&_e?.active!==!0?Ys(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:i,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",completion_badge:ge?.live!==!0&&ge?.title?ge.label:null,completion_title:ge?.title||"",completion_repair_pr_url:oe?oe.repair_pr_url:"",completion_repair_pr_number:oe?oe.repair_pr_number:null,badges:he?[he]:[],live_badge:ge?.live===!0?he:null,usage:s,alert:ge?.alert===!0,merge_action:k?.tier==="merged"&&!fe&&!xe||Oe?!1:!Z||K||Xe,timeline_action:Oe,cancel_action:Z&&!K,cancel_enabled:(!z||ze)&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:z&&!ze?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ze?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ve,discard_action:ve.action,merge_step:_e,discard_enabled:ve.enabled,discard_title:ve.title,merge_enabled:!_e&&!a&&!je&&!f&&!(oe&&oe.lock_actions)&&!Fe&&!Oe&&(nt||rt||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||fe||xe||Ee),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||xe?"\uC815\uB9AC \uC7AC\uAC1C":rt&&!_e&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Xe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:je?ve.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ve.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ve.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Fe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":rt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":nt?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ea(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:u,onDoneRangeChange:f}=t,h=n?ls(n,i):null,I=ds({transport:r,uiOrderStore:i}),S=null,O=[],q=Nm(),Z=Um(),K=zt(u)?u:zm(),z=new Map;function L(){let p=or.find(A=>A.value===K);return p?p.label:"\uC624\uB298"}let E=Vm(),F=!1,k=new Set,W=new Set,oe=new Set,ue=new Set,J=[],se=document.createElement("div");se.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let ze=document.createElement("div");ze.className="worker-drawer-overlay",ze.hidden=!0;let Xe=document.createElement("div");Xe.className="worker-drawer-overlay__backdrop";let at=document.createElement("div");at.className="worker-drawer-host";let rt=document.createElement("div");rt.className="worker-drawer-host",rt.hidden=!0,ze.append(Xe,at,rt);let nt=document.createElement("div");nt.className="worker-lanes-host",se.append(Le,ze,nt),e.appendChild(se);let _e=null,qe=null,fe=Os(at,{transport:r,sessionLogStore:a,onClose:()=>{_e=null,qe=null,ze.hidden=!0,j()}}),xe=xd(rt,{onClose:()=>{rt.hidden=!0,ze.hidden=!0,j()}}),Ee=bd({getWorkspacePath:d||(()=>"")}),Fe=d&&d()||"",ve=hd({queueStore:s,transport:r,onChanged:()=>j(),onOpenScript:(p,A)=>{Ee.open(p,A)}}),je=o?fd(se,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(p,A)=>fr(p,A)}):null;function Oe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:eo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ge(){let p=Oe();return typeof p.revision=="number"?p.revision:0}function he(p){p&&p.queue&&s&&s.set(p.queue)}function G(){let p=Oe().queue;return Array.isArray(p)?p.length:0}async function V(p,A,R){if(!r)return;let _=()=>({bead_id:p,...A==="parallel"?{}:{lane:A},index:R,expected_revision:ge()}),P=await r("worker-queue-place",_());he(P),P&&P.conflict&&await r("worker-queue-place",_()).then(he)}async function ye(p,A,R){if(!r)return;let _=()=>({bead_id:p,...A==="parallel"?{}:{lane:A},to_index:R,expected_revision:ge()}),P=await r("worker-queue-reorder",_());he(P),P&&P.conflict&&await r("worker-queue-reorder",_()).then(he)}async function Te(p){if(!r)return;let A=await r("worker-queue-remove",{bead_id:p,expected_revision:ge()});he(A),A&&A.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ge()}).then(he)}async function Ue(p){if(!r||!p)return;let A=await r("worker-attempt-pause",{attempt_id:p});A&&A.paused===!1&&A.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function He(p){if(!r||!p)return;let A=await tn();if(A===null)return;let R=async(P={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ge(),...A!==""?{instructions:A}:{},...P}),_=await R();he(_),_&&_.conflict&&(_=await R(),he(_)),_=await mr(_,(P,te)=>R({continuation:P,decision_token:te}),{onResult:he,refresh:()=>R()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ae(p){if(!r||!p)return;let A=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()});he(A),A&&A.conflict&&(A=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ge()}),he(A)),A&&A.dismissed===!1&&!A.conflict&&A.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function st(p,A,R=!0){if(!r)return null;let _=r,P=await _(p,{...A,expected_revision:ge()});return he(P),P&&P.conflict&&R&&(P=await _(p,{...A,expected_revision:ge()}),he(P)),P}async function Qe(p){if(!r||!p)return;let A=Oe().merge_queue?.find(_=>_.bead_id===p)?.continuation_action;if(A?.mismatch&&A.continuation===null){await re(p,A.mismatch);return}k.add(p),j();let R;try{R=await st("worker-merge-queue-add",{bead_id:p})}finally{k.delete(p),j()}!R||R.conflict||R.applied||ae(Jm(R.reason),"error",2400)}async function H(p){if(!(!r||!p||W.has(p))){W.add(p),j();try{let A=await r("worker-cleanup-retry",{bead_id:p,expected_revision:ge()});he(A),A&&!A.retried&&!A.conflict&&A.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${A.reason}`,"error",2400)}finally{W.delete(p),j()}}}async function re(p,A){let R=await mr({continuation_mismatch:A},(P,te)=>st("worker-merge-queue-add",{bead_id:p,continuation:P,decision_token:te},!1)),_=R?.queue?.merge_queue?.find(P=>P.bead_id===p)?.continuation_action;if(R?.applied!==!0&&_?.continuation===null&&_.mismatch){await re(p,_.mismatch);return}R&&R.applied===!1&&!R.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ce(p){if(!r)return;let A=await st("worker-merge-auto-toggle",{on:p});!A||A.conflict||ae(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function We(p){if(!r||!p)return;let A=await st("worker-merge-queue-remove",{bead_id:p});A&&!A.conflict&&!A.applied&&A.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function pe(){await st("worker-merge-queue-remove",{all:!0})}async function m(p,A=null,R="unmerged",_=null){if(!r||!p)return;let P=Dn(p,R);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(P)))return;let de=await r("worker-discard",{bead_id:p,...A?{attempt_id:A}:{},..._?{operation_id:_}:{},expected_revision:ge()});if(he(de),de&&de.conflict&&(de=await r("worker-discard",{bead_id:p,...A?{attempt_id:A}:{},..._?{operation_id:_}:{},expected_revision:ge()}),he(de)),de&&de.discarded===!0){ae(Vs(de),"success",5e3);return}if(de&&de.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${de.reason}`,"error",2800);return}if(de&&de.accepted&&de.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(de&&de.accepted&&!de.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${de.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}de&&!de.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function $(p,A,R){if(!(!r||!A||!R||ue.has(A))){ue.add(A),j();try{let _=await r(p,{bead_id:A,action_id:R,expected_revision:ge()});he(_),_?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{ue.delete(A),j()}}}async function x(p,A){if(!r||!A||oe.has(A))return;oe.add(A),j();let R;try{let _=async(P={})=>await r(p,{bead_id:A,expected_revision:ge(),...P});R=await _(),he(R),R&&R.conflict&&(R=await r(p,{bead_id:A,expected_revision:ge()}),he(R)),p==="worker-revise-fix"&&(R=await mr(R,(P,te)=>_({continuation:P,decision_token:te}),{onResult:he,refresh:()=>_()}))}finally{oe.delete(A),j()}if(!(!R||R.conflict)){if(R.ok){ae(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function D(p){if(!r)return;let A=await r("worker-automation-toggle",{on:p,expected_revision:ge()});he(A),A&&A.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ge()}).then(he)}async function Y(p){if(!r||!p)return;let A=await r("worker-repo-operation-repair",{operation_id:p});if(he(A),A&&A.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${A.reason||""}`,"error",3e3);return}A&&A.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function X(p){if(!r||!p)return;let A=await r("worker-repo-operation-dismiss",{operation_id:p});he(A),A&&A.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}async function ne(p){if(!r||!Number.isFinite(p))return;let A=Math.max(eo,Math.floor(p)),R=await r("worker-queue-set-slots",{slots:A,expected_revision:ge()});he(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:A,expected_revision:ge()}).then(he)}async function le(p){if(!r||!Number.isInteger(p)||p<1||p>Ad)return;let A=Oe(),R=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).slice(p).reduce((te,de)=>te+(Array.isArray(de?.entries)?de.entries.length:0),0),_=()=>({count:p,expected_revision:ge()}),P=await r("worker-queue-set-serial-lane-count",_());he(P),P&&P.conflict&&(P=await r("worker-queue-set-serial-lane-count",_()),he(P)),P&&P.applied&&R>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function be(){let p=Oe(),A=h?h.selectBoardColumn(Om,"ready"):[],R=h?h.selectBoardColumn(Mm,"blocked"):[],_=h?h.selectBoardColumn(Dm,"closed"):[],P=h?h.selectBoardColumn(Pm,"in_progress"):[],te=new Map;for(let b of P){let B=Xm(b);if(!B)continue;let ie=te.get(B);ie?ie.push(b):te.set(B,[b])}let de=b=>{let B=cs(te.get(b)||[]);return B?B.title||B.id:null},Ne=p.bead_titles||{},Re=new Map;for(let[b,B]of Object.entries(Ne))typeof B=="string"&&B.length>0&&Re.set(b,B);for(let b of[...A,...R])Re.set(b.id,b.title||b.id);let ct=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},ut=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},w=new Map;for(let[b,B]of Object.entries(ut))Array.isArray(B)&&w.set(b,ka(B));for(let b of[...A,...R]){let B=b.labels;Array.isArray(B)&&!w.has(b.id)&&w.set(b.id,ka(B))}let y=new Map,g=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(g)?g:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let B=b.members.map(Ge=>{let ft=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Kt=>Kt.entries.some(Ct=>Ct.bead_id===Ge));return ft?ft.id:null});if(!(B.every(Ge=>Ge!==null)&&new Set(B).size===1))for(let Ge of b.members)y.set(Ge,b.members.filter(ft=>ft!==Ge))}let M=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},T=new Map;for(let[b,B]of Object.entries(ct))B&&typeof B=="object"&&T.set(b,B);for(let b of[...A,...R])T.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let ee=b=>T.get(b)||{},Ie=p.pr_wait||[],Ye=p.pr_observations||{},tt=p.pr_activity||{},Be=p.cleanup_failed||{},bt=Object.entries(Be).map(([b,B])=>({bead_id:b,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),sr=p.queue||[],De=new Set([...sr.map(b=>b.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(B=>B.bead_id)),...Ie.map(b=>b.bead_id),...p.done.map(b=>b.bead_id)]),ht=new Set(R.map(b=>b.id)),cn=i?i.get()?.order||{}:{},Ia=new Set,La=[];for(let b of[...A,...R])De.has(b.id)||Ia.has(b.id)||Zm(b)||Object.hasOwn(b,"labels")&&wa(b.labels)||(Ia.add(b.id),La.push(b));O=Ym(La,Z,cn);let Hd=p.admission||{},Oa=b=>{let B=Hd[b];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof B.reason=="string"?B.reason:"",Ge=ie.indexOf(":");return Ge>0&&Ge<ie.length-1?`\u26D4 ${ie.slice(0,Ge)} (${ie.slice(Ge+1)})`:`\u26D4 ${ie}`},Gd=O.map(b=>{let B=In(b),ie=B.path.length>0,Ge=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",ft=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,Ct=!(Object.hasOwn(b,"labels")&&wa(b.labels))&&(Ge?ft:ie&&!B.conflict),pt=ht.has(b.id),Yt=[];pt&&Yt.push(Qm(b)),Ge&&!ft?Yt.push("missing_description"):!Ge&&B.conflict?Yt.push("spec_id_conflict"):!Ge&&!ie&&Yt.push("spec \uC5C6\uC74C");let Xn=Oa(b.id);return Xn&&Yt.push(Xn),{id:b.id,title:b.title||b.id,reason:Yt.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Ge,status:b.status,blocked:pt,has_spec:ie}}),ro=Fm(Gd,q),Vd=ro.visible,Kd=p.revise_parked||{},zn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},no=(b,B)=>b.map((ie,Ge)=>{let ft=B!=="done",Kt=B!=="done"&&B!=="queue",Ct=ft?Kd[ie.bead_id]:null,pt=ft?cr(zn,ie.bead_id):null,Yt=pt?.operation?pt:null,Xn=ft&&w.get(ie.bead_id)===!0,ni=M[ie.bead_id]||[],lo=p.admission&&typeof p.admission=="object"?p.admission[ie.bead_id]:null,co=ft?yc(lo,!!Yt||ue.has(ie.bead_id)):null,iu=ft&&!co?Oa(ie.bead_id):null,lu=ft?[iu]:[],si=ft&&ni.length>0&&typeof lo?.reason=="string"&&lo.reason.startsWith("not_ready")?[`\u23F8 ${ni.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],uo=ft?y.get(ie.bead_id):void 0;return uo&&uo.length>0&&si.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${uo.join(", ")}\uC640`),{id:ie.bead_id,title:Re.get(ie.bead_id)||ie.bead_id,reason:lu.filter(Boolean).join(" \xB7 "),draggable:ft&&!Yt&&!co,done:B==="done",lane:B,seq:Kt?Ge+1:void 0,worker_serial:Xn,discard:Yt,stale_work:co,badges:[...si,...Ct?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ct,revise_action:!!Ct,revise_enabled:!!Ct&&!Yt&&!oe.has(ie.bead_id),revise_title:Ct?Ct.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ct.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Ht(p.attempts||{},ie.bead_id):null,work_ms:B==="done"?bc(p.attempts||{},ie.bead_id):null,done_at:B==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...ee(ie.bead_id)}}),Gr=p.attempts?Object.values(p.attempts):[],so=new Set;for(let b of Gr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&so.add(b.resumed_from);let Ma=new Map;for(let b of Gr)Ma.set(b.bead_id,b.attempt_id);let Hn=new Map;for(let b of Gr)Hn.set(b.attempt_id,b);function oo(b){let B=new Set,ie=b;for(;ie&&!B.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;B.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Hn.get(ie.resumed_from)||null}return!1}let Gn=typeof p.declared_base=="string"?p.declared_base:null;function Yd(b){let B=null;for(let ie of Gr)!ie||ie.bead_id!==b||oo(ie)||(B===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=ie);return B&&typeof B.target_base=="string"?B.target_base:null}let Pa=[],Da=[],Zd=pd(p),Na=b=>{let B=typeof b.session_id=="string"&&b.session_id.length>0,ie=so.has(b.attempt_id);return{eligible:B&&!ie,reason:B?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let b of Gr){let B=b.status==="paused"&&!so.has(b.attempt_id);if(b.status==="running"||B)Da.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Re.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:B,conflict_resolution:oo(b),base_exception:Sa(Gn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:cr(zn,b.bead_id,{attempt_id:b.attempt_id}),usage:Ht(p.attempts||{},b.bead_id),current_child:de(b.bead_id),...ee(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&Zd(b)){let ie=Na(b);Pa.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Re.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(zn,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:oo(b),base_exception:Sa(Gn,b.target_base),usage:Ht(p.attempts||{},b.bead_id),current_child:de(b.bead_id),...ee(b.bead_id)}),Vt=b}}let Vn=[...Pa,...Da].map(b=>{let B=Hn.get(b.attempt_id),ie=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!ie||typeof ie!="object")return b;let Ge=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,ft=Fn({bead_id:B.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Ge?{step:ie.cursor,reason:Ge}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return ft?{...b,landing:ft}:b}),qa=null;if(Vt){let b=Na(Vt),B=Vt.cause_detail;qa={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:cr(zn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Fa=new Set(Vn.map(b=>b.bead_id)),ao=Array.isArray(p.merge_queue)?p.merge_queue:[],ja=new Map,Ba=new Map,Ua=new Map,Wa=new Map,za=new Map;ao.forEach((b,B)=>{b&&typeof b.bead_id=="string"&&(ja.set(b.bead_id,B+1),Ba.set(b.bead_id,b.resolution),Ua.set(b.bead_id,b.continuation_action||null),Wa.set(b.bead_id,b.head_review||null),za.set(b.bead_id,b.authority||null))});let Vr=p.merge_queue_state||{active:null,failures:{}},Xd=Vr.failures||{},Ha=Vr.waiting&&typeof Vr.waiting.bead_id=="string"&&typeof Vr.waiting.reason=="string"?Vr.waiting:null,Qd=p.auto_merge_skips||{},Ga=b=>{let B=Qd[b];if(!B)return null;let ie=Ye[b],Ge=ie&&ie.pr?ie.pr.head_sha:null;return Ge&&Ge===B.head_sha?B.reason||"":null},Kn=new Map;for(let b of Vn)b.failed!==!0&&b.conflict_resolution&&(b.paused?Kn.has(b.bead_id)||Kn.set(b.bead_id,"paused"):Kn.set(b.bead_id,"running"));let Va=Vn.filter(b=>!b.paused&&b.failed!==!0).length,Ka=(p.workspace_info||{}).slots,Ya=typeof Ka=="number"?Ka:typeof p.slots=="number"?p.slots:eo,Jd=Va>Ya,Yn=Nr(K),eu=(Array.isArray(p.done)?p.done.slice():[]).filter(b=>Yn===void 0||typeof b.added_at!="number"||b.added_at>=Yn).sort((b,B)=>(B.added_at||0)-(b.added_at||0)),dn=no(eu,"done"),tu=new Set((Array.isArray(p.done)?p.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),Za=[],ru=d?.()||"";for(let b of _){let B=jr(b.closed_at);if(typeof b.id!="string"||tu.has(b.id)||B===null||Yn!==void 0&&B<Yn||typeof b.comment_count!="number"||b.comment_count<=0)continue;let ie=`${ru}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Ge=z.get(ie);Ge===void 0&&r&&(z.set(ie,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(ft=>{let Kt=Array.isArray(ft)&&ft.some(Ct=>Ms(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");z.set(ie,Kt?"session":"not-session"),j()}).catch(()=>{z.set(ie,"failed"),j()})),Ge==="session"&&Za.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:b.created_at,updated_at:b.updated_at})}dn.push(...Za),dn.sort((b,B)=>(B.done_at||0)-(b.done_at||0));let Zn={};for(let b of gr)Zn[b]=0;let Xa=!1,Qa=0,io=0,Ja=0;for(let b of dn){let B=b.usage;if(B&&typeof B=="object"){let ie=!1;for(let Ge of gr)Number.isFinite(B[Ge])&&(Zn[Ge]+=B[Ge],Xa=!0,ie=!0);ie&&(io+=1,Number.isFinite(B.total_cost_usd)&&(Qa+=B.total_cost_usd,Ja+=1))}}io>0&&Ja===io&&(Zn.total_cost_usd=Qa);let ei=dn.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),nu=ei.length>0?At(ys(ei)):Xa?Qt(Zn):null,su=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},ou=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ti=b=>{if(Ie.some(Ge=>Ge.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=Gr.filter(Ge=>Ge&&Ge.bead_id===b),ie=B.length>0?B[B.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ri=ou.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,B)=>{let ie=su[b.id]||{},Ge=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(pt=>pt&&typeof pt.bead_id=="string"&&typeof pt.after=="string").map(pt=>[pt.bead_id,pt.after])),ft=no(b.entries.filter(pt=>!Fa.has(pt.bead_id)),b.id).map(pt=>Ge.has(pt.id)?{...pt,badges:[`\u{1F517} ${Ge.get(pt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...pt.badges]}:pt),Kt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(pt=>typeof pt=="string"):[],Ct=Kt.map(pt=>({id:pt,title:Re.get(pt)||pt,draggable:!1,lane:b.id,ghost:!0,badges:[ti(pt)]}));return{id:b.id,index:B+1,rows:[...Ct,...ft],occupied:Kt.length>0,badge:Kt.length>0?ti(Kt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),au=typeof p.serial_lane_count=="number"?p.serial_lane_count:ri.length;return{queue:p,idToTitle:Re,candidates:Vd,candidate_hidden:{blocked:ro.hidden_blocked,spec:ro.hidden_spec},running:Vn,live_count:Va,slots:Ya,over_cap:Jd,failure:qa,waiting:no(sr.filter(b=>!Fa.has(b.bead_id)),"queue"),serial_lanes:ri,serial_lane_count:au,pr_wait:Ie.map(b=>og(b.bead_id,Re.get(b.bead_id)||b.bead_id,Ye,Be[b.bead_id]||null,Ht(p.attempts||{},b.bead_id),tt[b.bead_id]||(k.has(b.bead_id)||W.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Kn.get(b.bead_id)||null,b.external===!0,{position:ja.get(b.bead_id)||0,active:Vr.active===b.bead_id,failure:Xd[b.bead_id]||null,waiting:Ha?.bead_id===b.bead_id?Ha.reason:null,resolution:Ba.get(b.bead_id),continuation_action:Ua.get(b.bead_id),head_review:Wa.get(b.bead_id)||null,authority:za.get(b.bead_id)||null},b.wt_present!==!1,p.auto_merge===!0?Ga(b.bead_id):null,Sa(Gn,Yd(b.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[b.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Hn.get(Ma.get(b.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(b=>({...b,...ee(b.id)})),merge_queue_length:ao.length,merge_queue_running:ao.length>0,auto_excluded:Ie.map(b=>b.bead_id).filter(b=>Ga(b)!==null),declared_base:Gn,done:dn,token_total:nu,cleanup_failures:bt,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function we(){let A=!!o?.get()?.job,R=!A&&o?.isPending?.()===!0,_=A?"\uBD84\uC11D \uC911":R?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?c`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Me(p){let A=p.waiting.length>0?p.waiting[0].id:"\u2014",R=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=v(p),P=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",te=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${p.done.length}</b></span
      >`,de=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Ne=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${eo}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ad},(ut,w)=>w+1).map(ut=>c`<option
                value=${String(ut)}
                ?selected=${p.serial_lane_count===ut}
              >
                ${ut}
              </option>`)}
        </select>
      </label>
      ${o?we():""} `,Re=Oc({failure:p.failure}),ct=hc(p.repo_operations,p.cleanup_failures);return F?c`<div class="worker-ribbon">
          ${R} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${P}${te}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ne}</div>
          <div class="worker-kpi">${de}</div>
        </div>
        ${ct}${ve.template()}${Re}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${_}${Ne}</div>
        <div class="worker-kpi">
          ${P}${te}${de}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ut=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ut.tooltip}
                >${L()} 완료 · 누적 ${ut.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${A}</b></span
          >
        </div>
      </div>
      ${ct}${ve.template()}${Re}`}function Pe(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let A=p.running.some(R=>!R.paused&&R.failed!==!0);return c`<section
      class="worker-now${A?" worker-pane--live":""}"
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
      ${p.running.length>0?fa(p.running,Date.now(),_e):""}
      ${p.pr_wait.map(R=>oa(R))}
    </section>`}function ke(p){let A=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${q.show_blocked}
        />
        🔒 blocked${A.blocked>0?` ${A.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${jm.map(R=>c`<button
              type="button"
              class="worker-filter__chip${q.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${q.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${A.spec>0?c`<span class="worker-filter__hidden">숨김 ${A.spec}</span>`:""}
      </div>
    </div>`}function Ve(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Z}
    >
      ${Bm.map(p=>c`<option value=${p.value} ?selected=${Z===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function U(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${K}
      >
        ${or.map(p=>c`<option value=${p.value} ?selected=${K===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function Q(p){let A=c`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,R=p.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:A,controls:R})}function v(p){let A=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(A)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(p.auto_excluded),_=p.pr_wait.filter(P=>P.merge_action&&P.merge_enabled&&!R.has(P.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function C(p){let A=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ve(),controls:ke(p)});return F?c`<div class="worker-lanes worker-lanes--mobile">
        ${Pe(p)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:E.queue,preview:Ed(p.waiting)})}
        ${p.serial_lanes.map(R=>Q(R))}
        ${A}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:U(),collapsible:!0,collapsed:E.done,preview:Array.isArray(p.token_total)?p.token_total.map(R=>R.label).join(" \xB7 "):p.token_total||Ed(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${A}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(R=>Q(R))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(R=>!R.paused&&R.failed!==!0),body:fa(p.running,Date.now(),_e)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${p.done.length}`,items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:U()})}
    </div>`}function N(p){E={...E,[p]:!E[p]},Km(E),j()}function j(){let p=be();Ze(Me(p),Le),Ze(C(p),nt)}function me(){let p=document.querySelector(".app-header");if(!p)return;let A=()=>{let R=Math.round(p.getBoundingClientRect().height);se.style.setProperty("--worker-ribbon-top",`${R}px`)};if(A(),typeof ResizeObserver=="function"){let R=new ResizeObserver(A);R.observe(p),J.push(()=>R.disconnect())}else window.addEventListener("resize",A),J.push(()=>window.removeEventListener("resize",A))}function $e(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Gm);F=!!p.matches;let A=R=>{let _=!!(R&&typeof R.matches=="boolean"?R.matches:p.matches);_!==F&&(F=_,j())};typeof p.addEventListener=="function"?(p.addEventListener("change",A),J.push(()=>p.removeEventListener("change",A))):typeof p.addListener=="function"&&(p.addListener(A),J.push(()=>p.removeListener(A)))}let ce=null;function ot(p){ce=p.target instanceof Element?p.target:null}function Se(p){let R=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;if(ce&&R.contains(ce)&&ce.closest("input, button, a")){p.preventDefault();return}let _=R.dataset.beadId||"",P=R.dataset.lane||"";S={bead_id:_,from_lane:P};try{p.dataTransfer?.setData("text/plain",_),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function gt(p){let A=p.target?.closest?.(".worker-pane");if(!A)return;let R=A.dataset.lane||"";R!=="candidate"&&R!=="queue"&&!/^s[1-5]$/.test(R)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),A.classList.add("worker-pane--drag-over"))}function Ke(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Tt(p,A){let R=O.find(de=>de.id===p);if(!R)return;let _=O.filter(de=>de.id!==p),P=_.length;if(A){let de=A.dataset.beadId;if(de===p)return;let Ne=_.findIndex(Re=>Re.id===de);Ne>=0&&(P=Ne)}let te=_.slice();te.splice(P,0,R),I.applyReorder(p,te,P)}function Ut(p){let A=p.target?.closest?.(".worker-pane");if(!A)return;p.preventDefault(),A.classList.remove("worker-pane--drag-over");let R=A.dataset.lane||"",_=S?.bead_id||p.dataTransfer?.getData("text/plain")||"",P=S?.from_lane||"";if(S=null,!_)return;let te=p.target?.closest?.(".worker-mini, .worker-card"),de=Array.from(A.querySelectorAll(".worker-mini, .worker-card")),Ne=de.length;if(te){let Re=de.indexOf(te);Re>=0&&(Ne=Re)}if(Ne=Math.max(0,Ne-A.querySelectorAll(".worker-mini--ghost").length),A.classList.contains("worker-pane--collapsed")&&(Ne=G()),R==="candidate"){if(P==="candidate"){Tt(_,te);return}(P==="queue"||/^s[1-5]$/.test(P))&&Te(_);return}if(R==="queue"||/^s[1-5]$/.test(R)){let Re=R==="queue"?"parallel":R;P===R?ye(_,Re,Ne):V(_,Re,Ne)}}function dr(p){q=p,qm(p),j()}function wt(p){Z=p==="board"||p==="created"||p==="spec"?p:to,Wm(Z),j()}function Rt(p){K=zt(p)?p:qt,Hm(K),f?.(K),j()}function ur(p){let A=p.target?.closest?.(".worker-serial-lane-count");if(A){let Ne=Number.parseInt(A.value,10);Number.isFinite(Ne)&&le(Ne).then(j);return}let R=p.target?.closest?.(".worker-filter__blocked");if(R){dr({...q,show_blocked:R.checked});return}let _=p.target?.closest?.(".worker-done-range");if(_){Rt(_.value);return}let P=p.target?.closest?.(".worker-sort");if(P){wt(P.value||to);return}let te=p.target?.closest?.(".worker-slots__input");if(!te)return;let de=Number.parseInt(te.value,10);if(!Number.isFinite(de)){j();return}ne(de).then(j)}function pr(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Nt(){let p=be();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function nr(){_e&&fe.close(),rt.hidden=!1,ze.hidden=!1,xe.open(Nt()),j()}function kt(p){let A=Oe(),R=A.attempts?A.attempts[p]:null;_e=p,qe=null,xe.close(),rt.hidden=!0,ze.hidden=!1,fe.open({attempt_id:p,meta:pr(R)}),j()}function fr(p,A){_e=null,qe=p,xe.close(),rt.hidden=!0,ze.hidden=!1,fe.open({attempt_id:p,meta:A,hide_prompt:!0}),j()}function Je(){if(xe.isOpen()&&xe.refresh(Nt()),qe){let R=(o?.get()?.runs||[]).find(_=>_.run_id===qe);R?fe.updateMeta(xa(R)):fe.close();return}if(!_e)return;let p=Oe(),A=p.attempts?p.attempts[_e]:null;if(A){fe.updateMeta(pr(A));return}fe.close()}function Pt(p){let A=p.target;if(A?.closest?.(".worker-mini__serial, .worker-mini__grip")||A?.closest?.("#worker-parallel-analysis-dialog"))return;if(A?.closest?.(".worker-analysis-btn")){je?.open();return}if(A?.closest?.(".worker-repo-strip")||A?.closest?.(".worker-mini__timeline")){nr();return}let R=A?.closest?.(".worker-repo-op__session");if(R){let De=R.dataset.attemptId;De&&kt(De);return}let _=A?.closest?.(".worker-repo-op__resolve");if(_){Y(_.dataset.operationId||"");return}let P=A?.closest?.(".worker-repo-op__dismiss");if(P){X(P.dataset.operationId||"");return}let te=A?.closest?.(".worker-cleanup__resume");if(te){let De=te.dataset.beadId;De&&H(De);return}let de=A?.closest?.(".worker-banner__resume");if(de){let De=de.dataset.attemptId;De&&He(De);return}let Ne=A?.closest?.(".worker-banner__discard");if(Ne){let De=Ne.dataset.confirmation==="merged"?"merged":"unmerged";m(Ne.dataset.beadId||"",Ne.dataset.attemptId||null,De,Ne.dataset.operationId||null);return}let Re=A?.closest?.(".worker-banner__dismiss");if(Re){let De=Re.dataset.attemptId;De&&Ae(De);return}if(A?.closest?.(".worker-play")){D(!Oe().auto_advance);return}let ct=A?.closest?.(".worker-merge-all");if(ct){ct.classList.contains("worker-merge-all--stop")?Oe().auto_merge===!0?Ce(!1):pe():Ce(!0);return}let ut=A?.closest?.(".worker-pane__hd--toggle");if(ut){let De=ut.dataset.lane;(De==="queue"||De==="done")&&N(De);return}let w=A?.closest?.(".worker-card__place");if(w){let De=w.dataset.beadId;De&&!w.disabled&&V(De,"parallel",G());return}let y=A?.closest?.(".worker-filter__chip");if(y){let De=y.dataset.spec;(De==="all"||De==="with"||De==="without")&&dr({...q,spec:De});return}let g=A?.closest?.(".worker-mini__merge");if(g){let De=g.dataset.beadId||"";Oe().cleanup_failed?.[De]?H(De):Qe(De);return}let M=A?.closest?.(".worker-mini__merge-cancel");if(M){We(M.dataset.beadId||"");return}let T=A?.closest?.(".worker-mini__discard");if(T){m(T.dataset.beadId||"",T.dataset.attemptId||null,T.dataset.discardMode==="merged"?"merged":"unmerged",T.dataset.operationId||null);return}let ee=A?.closest?.(".worker-mini__stale-continue");if(ee){$("worker-stale-work-continue",ee.dataset.beadId||"",ee.dataset.actionId||"");return}let Ie=A?.closest?.(".worker-mini__stale-backup");if(Ie){$("worker-stale-work-backup-fresh",Ie.dataset.beadId||"",Ie.dataset.actionId||"");return}let Ye=A?.closest?.(".worker-mini__stale-recheck");if(Ye){$("worker-stale-work-recheck",Ye.dataset.beadId||"",Ye.dataset.actionId||"");return}let tt=A?.closest?.(".worker-mini__revise-fix");if(tt){x("worker-revise-fix",tt.dataset.beadId||"");return}let Be=A?.closest?.(".worker-mini__revise-approve");if(Be){x("worker-revise-approve",Be.dataset.beadId||"");return}if(A?.closest?.(".worker-mini__pr"))return;if(A?.closest?.(".rtile__discard")){let De=A?.closest?.(".rtile"),ht=De?.dataset?.beadId,cn=De?.dataset?.attemptId;ht&&m(ht,cn||null,"unmerged",A?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(A?.closest?.(".rtile__dismiss")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&Ae(ht);return}if(A?.closest?.(".rtile__pause")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&Ue(ht);return}if(A?.closest?.(".rtile__resume")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&He(ht);return}if(A?.closest?.(".rtile__session")){let ht=A?.closest?.(".rtile")?.dataset?.attemptId;ht&&kt(ht);return}if(A?.closest?.(".worker-drawer-overlay__backdrop")){xe.close(),fe.close();return}if(A?.closest?.(".worker-drawer-host"))return;let bt=A?.closest?.(".rtile");if(bt){if(A?.closest?.(".rtile__id")){let ht=bt.dataset.beadId;ht&&Xt(ht).then(cn=>{cn?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let De=bt.dataset.beadId;De&&l&&l(De);return}let sr=A?.closest?.(".worker-mini, .worker-card");if(sr){let De=sr.dataset.beadId;if(A?.closest?.(".worker-mini__id, .worker-card__id")){De&&Xt(De).then(ht=>{ht?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}De&&l&&l(De)}}return e.addEventListener("pointerdown",ot),e.addEventListener("dragstart",Se),e.addEventListener("dragover",gt),e.addEventListener("dragleave",Ke),e.addEventListener("drop",Ut),e.addEventListener("click",Pt),e.addEventListener("change",ur),$e(),me(),h&&J.push(h.subscribe(()=>{for(let[p,A]of z)A==="failed"&&z.delete(p);j()})),s&&J.push(s.subscribe(()=>{let p=d&&d()||"";p!==Fe&&(Fe=p,Ee.close()),j(),Je()})),o&&typeof o.subscribe=="function"&&J.push(o.subscribe(()=>{Je(),j()})),j(),{load(){j()},destroy(){for(let p of J.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",ot),e.removeEventListener("dragstart",Se),e.removeEventListener("dragover",gt),e.removeEventListener("dragleave",Ke),e.removeEventListener("drop",Ut),e.removeEventListener("click",Pt),e.removeEventListener("change",ur);try{fe.destroy()}catch{}ze.hidden=!0;try{je?.destroy()}catch{}try{Ee.destroy()}catch{}Ze(c``,e)}}}function Ta(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Od(e,t,r,n=async()=>{},s=async()=>{}){let o=_t("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function u(F){let W=F.target.value,ue=t.getState().workspace?.current?.path||"";if(W&&W!==ue){o("switching workspace to %s",W),i=!0,E();try{await r(W)}catch(J){o("workspace switch failed: %o",J)}finally{i=!1,E()}}}async function f(){let F=t.getState(),k=F.workspace?.current?.path||F.workspace?.available?.[0]?.path||"";if(!(!k||l)){o("git-pulling workspace %s",k),l=!0,E();try{await n(k)}catch(W){o("workspace git pull failed: %o",W)}finally{l=!1,E()}}}function h(F){let k=F.target;k&&e.contains(k)||O()}function I(F){F.key==="Escape"&&O()}function S(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",I),E())}function O(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",I),E())}function q(){d?O():S()}async function Z(F){let k=F.target,W=k.value,oe=k.checked;o("toggling visibility %s \u2192 %s",W,String(oe));try{await s(W,oe)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function K(F){return F?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(F,k){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${F.map(W=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!k.has(W.path)}
                        @change=${Z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ta(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let F=t.getState(),k=F.workspace?.current,W=F.workspace?.available||[],oe=new Set(F.workspace?.hidden||[]),ue=k?.path||W[0]?.path||"";if(W.length===0)return c``;let J=W.filter(se=>!oe.has(se.path)||se.path===ue);if(J.length<=1){let se=J[0]||W[0],Le=Ta(se.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Le}</span
          >
          ${z(W,oe)}
          ${K(ue)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${J.map(se=>c`
              <option
                value="${se.path}"
                ?selected=${se.path===ue}
                title="${se.path}"
              >
                ${Ta(se.path)}
              </option>
            `)}
        </select>
        ${z(W,oe)}
        ${K(ue)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){Ze(L(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",I),Ze(c``,e)}}}var Md=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ca(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pd(e,t,r=Ca()){return{id:r,type:e,payload:t}}function Dd(e={}){let t=_t("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,u=[],f=new Map,h=new Set;function I(L){for(let E of Array.from(h))try{E(L)}catch{}}function S(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),I(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),E=(r.jitterRatio||0)*L,F=Math.max(0,Math.round(L+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",F,a+1),i=setTimeout(()=>{i=null,z()},F)}function O(L){try{s?.send(JSON.stringify(L))}catch(E){t("ws send failed",E)}}function q(){for(o="open",t("ws open"),I(o),a=0;u.length;){let L=u.shift();L&&O(L)}}function Z(L){let E;try{E=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let k=d.get(E.id);d.delete(E.id),E.ok?k?.resolve(E.payload):k?.reject(E.error||new Error("ws error"));return}let F=f.get(E.type);if(F&&F.size>0)for(let k of Array.from(F))try{k(E.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",E.type)}function K(){o="closed",t("ws closed"),I(o);for(let[L,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(L);a+=1,S()}function z(){if(!l)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",I(o),s.addEventListener("open",q),s.addEventListener("message",Z),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(E){t("ws connect failed %o",E),S()}}return z(),{send(L,E){if(!Md.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let F=Ca(),k=Pd(L,E,F);return t("send %s id=%s",L,F),new Promise((W,oe)=>{d.set(F,{resolve:W,reject:oe,type:L}),s&&s.readyState===s.OPEN?O(k):(t("queue %s id=%s (state=%s)",L,F,o),u.push(k))})},on(L,E){f.has(L)||f.set(L,new Set);let F=f.get(L);return F?.add(E),()=>{F?.delete(E)}},onConnection(L){return h.add(L),()=>{h.delete(L)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function ag(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ig(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ra=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",lg="bdui.worker.done-range",qd=Qc,Fd="worker:queue",jd="worker:parallel-analysis",Bd="ui:order",Ud="ui:display-policy",Wd="exec:presets",Ir="tab:board:closed",zd="beads-ui.board.closed-range";function cg(e){let t=_t("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&ud(s),o&&a&&i&&l){let nt=function(w,y){let g="Request failed",M="";if(w&&typeof w=="object"){let ee=w;if(typeof ee.message=="string"&&ee.message.length>0&&(g=ee.message),typeof ee.details=="string")M=ee.details;else if(ee.details&&typeof ee.details=="object")try{M=JSON.stringify(ee.details,null,2)}catch{M=""}}else typeof w=="string"&&w.length>0&&(g=w);let T=y&&y.length>0?`Failed to load ${y}`:"Request failed";rt.open(T,g,M)},Qe=function(w){return`${Je.getState().workspace.current?.path||""}\0${w}`},H=function(){G&&(G().catch(()=>{}),G=null),V=null,ye=null},Ce=function(w){Te=w;let y=()=>{Te!==w||Je.getState().selected_id!==w||(Te=null,re(w))};if(!Ae){He.then(y);return}y()},$=function(w,y,g,M,T){return g!==m[y]?(T().catch(()=>{}),!1):(w.set(M,T),!0)},D=function(){let w=Je.getState();be(w.view==="board"),U(w.view==="worker"),j(w.view==="monitor"),v(w.view==="board"||w.view==="worker"||x||!!w.selected_id)},ne=function(){let w=Nr(Y);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},le=function(){let w=Nr(X);return w===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:w}}},be=function(w){if(w)for(let[y,g]of Ra){if(We.has(y)||pe.has(y))continue;let M=y===Ir?ne():{type:g};try{xe.register(y,M)}catch(Ie){t("register %s store failed: %o",y,Ie)}pe.add(y);let T=m.board,ee=!1;fe.subscribeList(y,M).then(Ie=>{ee=!$(We,"board",T,y,Ie)}).catch(Ie=>{t("subscribe %s failed: %o",y,Ie),nt(Ie,"board")}).finally(()=>{pe.delete(y),ee&&D()})}else Pe()},Pe=function(){m.board+=1;for(let[w]of Ra){let y=We.get(w);y&&(y().catch(()=>{}),We.delete(w));try{xe.unregister(w)}catch(g){t("unregister %s failed: %o",w,g)}}},U=function(w){if(!w){Q();return}for(let[y,g]of Nd){if(ke.has(y)||pe.has(y))continue;let M=y===Rr?le():{type:g};try{xe.register(y,M)}catch(Ie){t("register %s store failed: %o",y,Ie)}pe.add(y);let T=m.worker,ee=!1;fe.subscribeList(y,M).then(Ie=>{ee=!$(ke,"worker",T,y,Ie)}).catch(Ie=>{t("subscribe %s failed: %o",y,Ie),nt(Ie,"worker")}).finally(()=>{pe.delete(y),ee&&D()})}},Q=function(){m.worker+=1;for(let[w]of Nd){let y=ke.get(w);y&&(y().catch(()=>{}),ke.delete(w));try{xe.unregister(w)}catch(g){t("unregister %s failed: %o",w,g)}}},v=function(w){if(!w){C();return}Ve||(qe("subscribe-worker-queue",{id:Fd}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),qe("subscribe-worker-parallel-analysis",{id:jd}).catch(y=>{t("subscribe-worker-parallel-analysis failed: %o",y)}),Ve=()=>(qe("unsubscribe-worker-parallel-analysis",{id:jd}),qe("unsubscribe-worker-queue",{id:Fd})))},C=function(){Ve&&(Ve().catch(()=>{}),Ve=null),Fe.clear()},j=function(w){if(!w){me();return}N||(qe("subscribe-monitor-pipeline",{id:qd}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),N=()=>qe("unsubscribe-monitor-pipeline",{id:qd}))},me=function(){N&&(N().catch(()=>{}),N=null)},ce=function(){$e||(qe("subscribe-ui-order",{id:Bd}).catch(w=>{t("subscribe-ui-order failed: %o",w)}),$e=()=>qe("unsubscribe-ui-order",{id:Bd}))},ot=function(){$e&&($e().catch(()=>{}),$e=null),je.clear()},gt=function(){Se||(qe("subscribe-display-policy",{id:Ud}).catch(w=>{t("subscribe-display-policy failed: %o",w)}),Se=()=>qe("unsubscribe-display-policy",{id:Ud}))},Ke=function(){Se&&(Se().catch(()=>{}),Se=null),Oe.clear()},Ut=function(){Tt||(qe("subscribe-impl-presets",{id:Wd}).catch(w=>{t("subscribe-impl-presets failed: %o",w)}),Tt=()=>qe("unsubscribe-impl-presets",{id:Wd}))},Nt=function(w){if(!w)return"Unknown";let y=w.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var d=nt,u=Qe,f=H,h=Ce,I=$,S=D,O=ne,q=le,Z=be,K=Pe,z=U,L=Q,E=v,F=C,k=j,W=me,oe=ce,ue=ot,J=gt,se=Ke,Le=Ut,ze=Nt;let Xe=document.getElementById("header-loading"),at=Bi(Xe),rt=gc(e),_e=Dd(),qe=at.wrapSend((w,y)=>_e.send(w,y)),fe=Oi(qe),xe=Mi(),Ee=Ni(),Fe=Di(),ve=hi(),je=Pi(),Oe=gi(),ge=bi(),he=yi();_e.on("impl-presets-snapshot",w=>{let y=w;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&ge.set({revision:y.revision,presets:y.presets})}),_e.on("monitor-pipeline-snapshot",w=>{let y=w;if(!(!y||!Array.isArray(y.workspaces)))try{ve.set(y.workspaces,y.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",w=>{let y=w;if(y&&typeof y.revision=="number")try{je.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),_e.on("display-policy-snapshot",w=>{let y=w;if(y&&y.policy&&typeof y.policy=="object")try{Oe.set(y.policy)}catch{}}),_e.on("session-log-snapshot",w=>{let y=w;if(y&&typeof y.id=="string")try{he.set(y.id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),_e.on("session-log-append",w=>{let y=w;if(y&&typeof y.id=="string")try{he.append(y.id,y.event)}catch{}}),_e.on("snapshot",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",M=g?xe.getStore(g):null;if(M&&y&&y.type==="snapshot")try{M.applyPush(y)}catch{}}),_e.on("upsert",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",M=g?xe.getStore(g):null;if(M&&y&&y.type==="upsert")try{M.applyPush(y)}catch{}}),_e.on("delete",w=>{let y=w,g=y&&typeof y.id=="string"?y.id:"",M=g?xe.getStore(g):null;if(M&&y&&y.type==="delete")try{M.applyPush(y)}catch{}});let G=null,V=null,ye=null,Te=null,Ue=()=>{},He=new Promise(w=>{Ue=()=>w(void 0)}),Ae=!1,st=!1;async function re(w){let y=Qe(w);if(y===V||y===ye)return;ye=y;let g=`detail:${w}`,M={type:"issue-detail",params:{id:w}};try{xe.register(g,M)}catch(T){t("register detail store failed: %o",T)}try{let T=await fe.subscribeList(g,M);if(Je.getState().selected_id!==w||Qe(w)!==y){await T().catch(()=>{});return}G&&await G().catch(()=>{}),G=T,V=y}catch(T){t("detail subscribe failed: %o",T),nt(T,"issue details")}finally{ye===y&&(ye=null)}}let We=new Map,pe=new Set,m={board:0,worker:0},x=!1,Y=qt;try{let w=window.localStorage.getItem(zd);zt(w)&&(Y=w)}catch{}let X=qt;try{let w=window.localStorage.getItem(lg);zt(w)&&(X=w)}catch{}async function we(w){if(!zt(w)||w===Y)return;Y=w;try{window.localStorage.setItem(zd,w)}catch{}let y=We.get(Ir);if(!y)return;We.delete(Ir),await y().catch(()=>{});let g=ne();try{xe.register(Ir,g)}catch(M){t("register %s store failed: %o",Ir,M)}try{let M=await fe.subscribeList(Ir,g);We.set(Ir,M)}catch(M){t("re-subscribe %s failed: %o",Ir,M),nt(M,"board")}}async function Me(w){if(!zt(w)||w===X)return;X=w;let y=ke.get(Rr);if(!y)return;ke.delete(Rr),await y().catch(()=>{});let g=le();try{xe.register(Rr,g)}catch(M){t("register %s store failed: %o",Rr,M)}try{let M=await fe.subscribeList(Rr,g);ke.set(Rr,M)}catch(M){t("re-subscribe %s failed: %o",Rr,M),nt(M,"worker")}}let ke=new Map,Ve=null,N=null,$e=null,Se=null,Tt=null;async function dr(){Se=null,Oe.clear(),Tt=null,ge.clear(),Ve=null,N=null,We.clear(),ke.clear(),m.board+=1,m.worker+=1,Ut();let w=Je.getState().workspace.current?.path;if(w)try{await _e.send("set-workspace",{path:w})}catch(g){t("workspace restore after reconnect failed: %o",g);return}gt();let y=Je.getState();be(y.view==="board"),U(y.view==="worker"),j(y.view==="monitor"),v(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function wt(){t("clearing all subscriptions for workspace switch"),Pe(),Q(),C(),Ee.clear(),ot(),ce(),Ke(),gt(),H();let w=Je.getState();if(w.selected_id)try{xe.unregister(`detail:${w.selected_id}`)}catch{}let y=Je.getState();be(y.view==="board"),U(y.view==="worker"),j(y.view==="monitor"),v(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&Ce(y.selected_id)}async function Rt(w){t("requesting workspace switch to %s",w),st=!0;try{let y=await _e.send("set-workspace",{path:w});t("workspace switch result: %o",y),y&&y.workspace&&(Je.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",w),y.changed&&(await wt(),ae("Switched to "+Nt(w),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),ae("Failed to switch workspace","error",3e3),y}finally{st=!1}}async function ur(w){t("requesting workspace git pull for %s",w);try{let y=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let g=y?.status;if(g==="up_to_date"){ae("Already up to date","success",2e3);return}if(g==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Nt(w),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let g=y?.code,M=y?.message;if(g==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(g==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(g==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let T=M?`: ${M}`:"";throw ae(`Git pull failed${T}`,"error",3e3),y}}async function pr(w,y){t("setting workspace visibility %s \u2192 %s",w,String(y));try{await _e.send("set-workspace-visibility",{path:w,visible:y}),await nr()}catch(g){t("workspace visibility update failed: %o",g),ae("Failed to update project visibility","error",3e3)}}async function nr(){try{let w=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",w),w&&Array.isArray(w.workspaces)){let y=w.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),g=w.current?{path:w.current.root_dir,database:w.current.db_path}:null,M=Array.isArray(w.hidden)?w.hidden.filter(ee=>typeof ee=="string"):[];Je.setState({workspace:{current:g,available:y,hidden:M}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!y.some(Ie=>Ie.path===T)||M.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):g&&T!==g.path&&(t("restoring saved workspace preference: %s",T),await Rt(T)))}}catch(w){t("failed to load workspaces: %o",w)}}_e.on("workspace-changed",w=>{t("workspace-changed event: %o",w),w&&w.root_dir&&(Je.setState({workspace:{current:{path:w.root_dir,database:w.db_path}}}),nr(),wt())});let kt=!1;if(typeof _e.onConnection=="function"){let w=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(kt=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&kt&&(kt=!1,ae("Reconnected","success",2200),ig(Je,(g,M)=>{t(`${g}: %o`,M)}),dr())};_e.onConnection(w)}let fr="board";try{let w=window.localStorage.getItem("beads-ui.view");(w==="board"||w==="worker"||w==="monitor")&&(fr=w)}catch(w){t("view parse error: %o",w)}let Je=ji({config:ag(),view:fr});_e.on("worker-queue-snapshot",w=>{let y=w;if(!y||!y.queue)return;let g=Je.getState().workspace.current?.path;if(typeof g=="string"&&g.length>0&&y.root_dir!==g){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{Ee.set(y.queue)}catch{}}),_e.on("worker-parallel-analysis-snapshot",w=>{let y=w;if(!y)return;let g=Je.getState().workspace.current?.path;if(!(typeof g=="string"&&g.length>0&&typeof y.root_dir=="string"&&y.root_dir!==g))try{Fe.set({settings:y.settings,job:y.job??null,runs:Array.isArray(y.runs)?y.runs:[],last_good:y.last_good??null})}catch{}});let Pt=qi(Je);Pt.start();let p=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),A=async(w,y)=>{try{return await qe(w,y)}catch(g){if(p.has(w))throw g;return[]}};n&&ed(n,Je,Pt);let R=document.getElementById("workspace-picker");R&&Od(R,Je,Rt,ur,pr);let _=sd(e,(w,y)=>qe(w,y));try{let w=document.getElementById("new-issue-btn");w&&w.addEventListener("click",()=>_.open())}catch{}let P=ld(e,{policyStore:Oe,queueStore:Ee,implPresetStore:ge,transport:(w,y)=>qe(w,y),onOpenChange:w=>{x=w,D()},labelOptions:()=>{let w=new Set;for(let[y]of Ra)for(let g of xe.snapshotFor(y)||[]){let M=g.labels;if(Array.isArray(M))for(let T of M)typeof T=="string"&&T.length>0&&w.add(T)}return Array.from(w).sort()}});try{let w=document.getElementById("display-settings-btn");w&&(w.setAttribute("aria-label","\uC124\uC815"),w.setAttribute("title","\uC124\uC815"),w.addEventListener("click",()=>P.open()))}catch{}let te=Xi(o,{gotoIssue:w=>Pt.gotoIssue(w),issueStores:xe,transport:A,workerQueueStore:Ee,uiOrderStore:je,displayPolicyStore:Oe,closedRange:Y,onClosedRangeChange:w=>{we(w)},onNewIssue:()=>_.open()}),de=Ea(a,{transport:A,issueStores:xe,queueStore:Ee,analysisStore:Fe,sessionLogStore:he,uiOrderStore:je,gotoIssue:w=>Je.setState({selected_id:w}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:X,onDoneRangeChange:w=>{Me(w)}}),Ne=Jc(i,{transport:A,pipelineStore:ve,execPresetStore:ge,gotoIssue:w=>Pt.gotoIssue(w),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:w=>Rt(w)}),Re=mc(l,{issueStores:xe,transport:A,queueStore:Ee,execPresetStore:ge,sessionLogStore:he,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:w=>{Je.getState().view==="worker"?Je.setState({selected_id:w}):Pt.gotoIssue(w)},onClose:()=>{let w=Je.getState();Je.setState({selected_id:null});try{Pt.gotoView(w.view==="worker"||w.view==="monitor"?w.view:"board")}catch{}},onOpenExecPresets:()=>{P.open("execution")}}),ct=Je.getState().selected_id;ct&&(l.hidden=!1,Re.load(ct),Ce(ct)),Je.subscribe(w=>{let y=w.selected_id;y?(l.hidden=!1,Re.load(y),st||Ce(y)):(Re.clear(),l.hidden=!0,H())});let ut=w=>{o.hidden=w.view!=="board",a.hidden=w.view!=="worker",i.hidden=w.view!=="monitor",be(w.view==="board"),U(w.view==="worker"),j(w.view==="monitor"),v(w.view==="board"||w.view==="worker"||x||!!w.selected_id),!w.selected_id&&w.view==="board"&&te.load(),w.view==="worker"&&de.load(),w.view==="monitor"?Ne.load():Ne.pause(),window.localStorage.setItem("beads-ui.view",w.view)};Je.subscribe(ut),ut(Je.getState()),ce(),gt(),Ut(),nr().finally(()=>{Ae=!0,Ue()}),window.addEventListener("keydown",w=>{let y=w.ctrlKey||w.metaKey,g=String(w.key||"").toLowerCase(),M=w.target,T=M&&M.tagName?String(M.tagName).toLowerCase():"",ee=T==="input"||T==="textarea"||T==="select"||M&&typeof M.isContentEditable=="boolean"&&M.isContentEditable;y&&g==="n"&&(ee||(w.preventDefault(),_.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&cg(t)});export{cg as bootstrap,ag as readBootstrapConfig,ig as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
