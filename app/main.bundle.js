var P_=Object.create;var ri=Object.defineProperty;var D_=Object.getOwnPropertyDescriptor;var N_=Object.getOwnPropertyNames;var q_=Object.getPrototypeOf,F_=Object.prototype.hasOwnProperty;var j_=(e,t,n)=>t in e?ri(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var si=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var B_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of N_(t))!F_.call(e,s)&&s!==n&&ri(e,s,{get:()=>t[s],enumerable:!(r=D_(t,s))||r.enumerable});return e};var U_=(e,t,n)=>(n=e!=null?P_(q_(e)):{},B_(t||!e||!e.__esModule?ri(n,"default",{value:e,enumerable:!0}):n,e));var Ft=(e,t,n)=>j_(e,typeof t!="symbol"?t+"":t,n);var qc=si((gw,Nc)=>{var Br=1e3,Ur=Br*60,Wr=Ur*60,xr=Wr*24,H_=xr*7,G_=xr*365.25;Nc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return K_(e);if(n==="number"&&isFinite(e))return t.long?Y_(e):V_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function K_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*G_;case"weeks":case"week":case"w":return n*H_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return n*Br;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function V_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=Br?Math.round(e/Br)+"s":e+"ms"}function Y_(e){var t=Math.abs(e);return t>=xr?$o(e,t,xr,"day"):t>=Wr?$o(e,t,Wr,"hour"):t>=Ur?$o(e,t,Ur,"minute"):t>=Br?$o(e,t,Br,"second"):e+" ms"}function $o(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var jc=si((bw,Fc)=>{function Z_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=qc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,b,w;function F(...W){if(!F.enabled)return;let Y=F,ae=Number(new Date),Z=ae-(_||ae);Y.diff=Z,Y.prev=_,Y.curr=ae,_=ae,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let U=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(H,S)=>{if(H==="%%")return"%";U++;let M=n.formatters[S];if(typeof M=="function"){let ne=W[U];H=M.call(Y,ne),W.splice(U,1),U--}return H}),n.formatArgs.call(Y,W),(Y.log||n.log).apply(Y,W)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,w=n.enabled(d)),w),set:W=>{h=W}}),typeof n.init=="function"&&n.init(F),F}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,b=0,w=-1,F=0;for(;h<d.length;)if(b<_.length&&(_[b]===d[h]||_[b]==="*"))_[b]==="*"?(w=b,F=h,b++):(h++,b++);else if(w!==-1)b=w+1,F++,h=F;else return!1;for(;b<_.length&&_[b]==="*";)b++;return b===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Fc.exports=Z_});var Bc=si((vn,xo)=>{vn.formatArgs=Q_;vn.save=J_;vn.load=em;vn.useColors=X_;vn.storage=tm();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function X_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Q_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+xo.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function J_(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function em(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function tm(){try{return localStorage}catch{}}xo.exports=jc()(vn);var{formatters:nm}=xo.exports;nm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ps=globalThis,go=ps.trustedTypes,wc=go?go.createPolicy("lit-html",{createHTML:e=>e}):void 0,ai="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,ii="?"+Qn,W_=`<${ii}>`,vr=document,fs=()=>vr.createComment(""),_s=e=>e===null||typeof e!="object"&&typeof e!="function",li=Array.isArray,Ec=e=>li(e)||typeof e?.[Symbol.iterator]=="function",oi=`[ 	
\f\r]`,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,kc=/-->/g,$c=/>/g,hr=RegExp(`>|${oi}(?:([^\\s"'>=/]+)(${oi}*=${oi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xc=/'/g,Ac=/"/g,Tc=/^(?:script|style|textarea|title)$/i,ci=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ci(1),gs=ci(2),cw=ci(3),On=Symbol.for("lit-noChange"),Vt=Symbol.for("lit-nothing"),Sc=new WeakMap,yr=vr.createTreeWalker(vr,129);function Cc(e,t){if(!li(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return wc!==void 0?wc.createHTML(t):t}var Rc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=ds;for(let i=0;i<n;i++){let l=e[i],u,d,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===ds?d[1]==="!--"?a=kc:d[1]!==void 0?a=$c:d[2]!==void 0?(Tc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=hr):d[3]!==void 0&&(a=hr):a===hr?d[0]===">"?(a=s??ds,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?hr:d[3]==='"'?Ac:xc):a===Ac||a===xc?a=hr:a===kc||a===$c?a=ds:(a=hr,s=void 0);let b=a===hr&&e[i+1].startsWith("/>")?" ":"";o+=a===ds?l+W_:_>=0?(r.push(u),l.slice(0,_)+ai+l.slice(_)+Qn+b):l+Qn+(_===-2?i:b)}return[Cc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ms=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Rc(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ai)){let h=d[a++],b=s.getAttribute(_).split(Qn),w=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?ho:w[1]==="?"?yo:w[1]==="@"?vo:kr}),s.removeAttribute(_)}else _.startsWith(Qn)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Tc.test(s.tagName)){let _=s.textContent.split(Qn),h=_.length-1;if(h>0){s.textContent=go?go.emptyScript:"";for(let b=0;b<h;b++)s.append(_[b],fs()),yr.nextNode(),l.push({type:2,index:++o});s.append(_[h],fs())}}}else if(s.nodeType===8)if(s.data===ii)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Qn,_+1))!==-1;)l.push({type:7,index:o}),_+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===On)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=_s(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var bo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Fr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new wo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Vt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),_s(t)?t===Vt||t==null||t===""?(this._$AH!==Vt&&this._$AR(),this._$AH=Vt):t!==this._$AH&&t!==On&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ec(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Vt&&_s(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ms.createElement(Cc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new bo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Sc.get(t.strings);return n===void 0&&Sc.set(t.strings,n=new ms(t)),n}k(t){li(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(fs()),this.O(fs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Vt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Vt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=wr(this,t,n,0),a=!_s(t)||t!==this._$AH&&t!==On,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=wr(this,i[r+l],n,l),u===On&&(u=this._$AH[l]),a||(a=!_s(u)||u!==this._$AH[l]),u===Vt?t=Vt:t!==Vt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ho=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vt?void 0:t}},yo=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Vt)}},vo=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Vt)===On)return;let r=this._$AH,s=t===Vt&&r!==Vt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Vt&&(r===Vt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},wo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Oc={M:ai,P:Qn,A:ii,C:1,L:Rc,R:bo,D:Ec,V:wr,I:Fr,H:kr,N:yo,U:vo,B:ho,F:wo},z_=ps.litHtmlPolyfillSupport;z_?.(ms,Fr),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.1");var at=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Fr(t.insertBefore(fs(),o),o,void 0,n??{})}return s._$AI(e),s};var ko="today",Lc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],jr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Hn(e){return e==="today"?"today":"7d"}function ui(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Dc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Uc=U_(Bc(),1);function Gt(e){return(0,Uc.default)(`beads-ui:${e}`)}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Hc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ao(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Gc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Pn(e.created_at),o=Pn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Kc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var rm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Wc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function zc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=rm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Vc(e,t){let n=Wc(e),r=Wc(t);if(n!==r)return n<r?-1:1;let s=zc(e),o=zc(t);if(s!==o)return s<o?-1:1;let a=Pn(e&&e.created_at),i=Pn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var di=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function So(e){return(t,n)=>{let r=zr(t,e),s=zr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function pi(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:zr(i,n)-di};if(!i)return{rank:zr(a,n)+di};let l=zr(a,n),u=zr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*di}))}}function fi(e,t={}){let n=Gt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Ar;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let w=Array.isArray(h.issues)?h.issues:[];for(let F of w)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=b,u();return}if(h.type==="upsert"){let w=h.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let F=r.get(w.id);if(!F)r.set(w.id,w);else{let W=Number.isFinite(F.updated_at)?F.updated_at:0,Y=Number.isFinite(w.updated_at)?w.updated_at:0;if(W<=Y){for(let ae of Object.keys(F))ae in w||delete F[ae];for(let[ae,Z]of Object.entries(w))F[ae]=Z}}d()}o=b,u()}else if(h.type==="delete"){let w=String(h.issue_id||"");w&&(r.delete(w),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Eo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Yc(e){let t=Gt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let w=n.get(b);if(!w)continue;let F=w.itemsById;for(let W of d)typeof W=="string"&&W.length>0&&F.set(W,!0);for(let W of _)typeof W=="string"&&W.length>0&&F.set(W,!0);for(let W of h)typeof W=="string"&&W.length>0&&F.delete(W)}}async function o(i,l){let u=Eo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Eo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Zc(){let e=Gt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let _=u?Eo(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),b&&h&&_&&h!==_){let w=t.get(l);if(w)try{w.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let W=fi(l,d);t.set(l,W);let Y=W.subscribe(()=>o());s.set(l,Y)}else if(!b){let w=fi(l,d);t.set(l,w);let F=w.subscribe(()=>o());s.set(l,F)}return n.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Xc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Qc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Jc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _i(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function sm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function om(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function eu(e){let t=Gt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):sm(r),a=om(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=_i(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?_i(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var am=Object.freeze({workspace_config:{default_workspace:null}});function tu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:am.workspace_config.default_workspace}}}function nu(e={}){let t=Gt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:tu(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?tu(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function ru(e){let t=Gt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(_,h)=>{let b=s++,w=Date.now();r.set(b,{type:_,start_ts:w}),t("request start id=%d type=%s count=%d",b,_,n+1),a();let F=!1,W=()=>{F||(F=!0,r.delete(b),i())},Y=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,_,Date.now()-w),W())},3e4);try{let ae=await u(_,h),Z=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",b,_,Z),ae}catch(ae){let Z=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,_,Z,ae),ae}finally{clearTimeout(Y),W()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function To(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Kc),l;switch(i){case"created_desc":return l.sort(Ar),l;case"created_asc":return l.sort(Hc),l;case"updated_desc":return l.sort(Ao),l;case"priority":return l.sort(Gc),l;case"manual":default:{let u=n();return u?l.sort(So(u)):l.sort(Ar),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Dn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pn(e){let t=Dn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Dn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function su(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Dn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Co(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ro(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Co(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Oo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=su(n);return{total:n.length,count:r,current:s,children:n}}function Lo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(pi(i,l,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let b=r(pi(i,l,h.order),a);s(h,b);let w=await t("ui-order-set",{expected_revision:h.revision,entries:b});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ou(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Io(e,t){let n=ou(e),r=ou(t);return n.length===0||r.length===0?!1:n!==r}function Mo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function mi(e,t){return!t||typeof e!="string"||e.length===0||Mo(t.visible_labels).includes(e)?!0:Mo(t.hidden_labels).includes(e)?!1:!Mo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function au(e,t){return Mo(e).filter(n=>mi(n,t))}function lr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function im(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function lm(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function cm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${im(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Po(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Vc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?lm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>cm(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var um={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},lu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},iu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},dm={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function pm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function cu(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function fm(e){if(!e||e.fill==="none"||!e.approval_state)return cu(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function _m(e,t,n,r){let s=um[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=dm[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=lu[e]||e,h=r?uu(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let b=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function uu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Do(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=iu[e.route]||iu.spec_backed,o=e.stages,a=pm(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${lu[u]||u} ${u==="plan"?fm(o[u]||{}):cu(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>uu(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>_m(u,o[u]||{},u===a,r))}
    </div>
  `}function mm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var du=2;function pu(e){let t=e.slice(0,du).join(", "),n=e.length-du;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function gm(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Io(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${pu(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${pu(o)}</span
      >`),n}function gi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function No(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${No(e)}@${e.sha}`}function qo(e,t){if(!e)return null;let n=gi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=gi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function fu(e,t){let n=qo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function bm(e){if(!e)return null;let t=gi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function hm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&lr(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&lr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&lr(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=fu(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(i)}`}
        >${`exec ${i.kind==="delegated"?No(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of au(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&lr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(n,"blocked")&&s.push(...gm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function ym(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function vm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Po(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:ym(e),empty_label:"children \uC5C6\uC74C",childChips:bi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function bi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return qo(t,n)?c`<span class="board-card__roll-child-chips">
    ${fu(t,n)}
    ${bm(n)}
  </span>`:null}function Fo(e,t){let n=mm(e.priority);return c`
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
      ${hm(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Do(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${vm(e,t)}
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
              ${Lc.map(o=>c`<option
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
  `}function _u(e,t,n){return c`
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
  `}var wm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],km=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],$m=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function mu(e,t,n){return c`
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
        ${wm.map(r=>c`<option
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
        ${km.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${xm(e,t,n)}
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
        ${$m.map(r=>c`<option
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
  `}var Am=200,Sm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Em=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),gu="beads-ui.board.sort",bu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Tm(){try{let e=window.localStorage.getItem(gu);if(e&&bu.has(e))return e}catch{}return"created_desc"}function hu(e,t){let n=Gt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||ko,b=s?To(s,a):null,w=Lo({transport:o,uiOrderStore:a}),F=[],W=[],Y=[],ae=[],Z=[],U=[],q=!1,H=0,S=Tm(),M=new Map,ne=new Map,be=new Map,Se=new Set,ce={search:"",priority:"",type:"",labels:[]},_e=!1,ke=null;function Be(T){return String(T.status||"open")==="open"}function we(T){let G=String(T.status||"open");return G==="open"||G==="blocked"}function X(T){let G=ce.search.trim().toLowerCase(),Me=ce.priority,x=ce.type,E=ce.labels;return T.filter(J=>{if(G){let fe=String(J.id||"").toLowerCase(),Ee=String(J.title||"").toLowerCase();if(!fe.includes(G)&&!Ee.includes(G))return!1}if(Me!==""&&String(J.priority)!==Me||x!==""&&String(J.issue_type||"")!==x)return!1;if(E.length>0){let fe=Array.isArray(J.labels)?J.labels:[];if(!E.some(Ee=>fe.includes(Ee)))return!1}return!0})}function Te(){let T=new Set;for(let G of[F,W,Y,ae,Z,U])for(let Me of G){let x=Array.isArray(Me.labels)?Me.labels:[];for(let E of x)typeof E=="string"&&E.length>0&&T.add(E)}return Array.from(T).sort()}function De(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function V(){try{if(b){let T=b.selectBoardColumn("tab:board:in-progress","in_progress",S),G=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(we),Me=new Set(T.map(P=>P.id)),x=b.selectBoardColumn("tab:board:ready","ready",S).filter(P=>Be(P)&&!Me.has(P.id)),E=b.selectBoardColumn("tab:board:resolved","resolved",S),J=b.selectBoardColumn("tab:board:deferred","deferred",S),fe=b.selectBoardColumn("tab:board:closed","closed").slice(0,Am),Ee=[...G,...x,...T,...E,...fe];D(Ee);let Fe=new Set;for(let P of Ee)P&&P.id&&!Co(P)&&Fe.add(P.id);let A=!De();F=A?bs(G,Fe):G,W=A?bs(x,Fe):x,Y=A?bs(T,Fe):T,ae=A?bs(E,Fe):E,Z=J,H=J.length,U=A?bs(fe,Fe):fe,M=new Map;for(let P of F)M.set(P.id,"open");for(let P of W)M.set(P.id,"open");for(let P of Y)M.set(P.id,"in_progress");for(let P of ae)M.set(P.id,"resolved");for(let P of Z)M.set(P.id,"deferred");for(let P of U)M.set(P.id,"closed");ne=new Map;for(let P of F)ne.set(P.id,"blocked-col");for(let P of W)ne.set(P.id,"ready-col");for(let P of Y)ne.set(P.id,"in-progress-col");for(let P of ae)ne.set(P.id,"resolved-col");for(let P of U)ne.set(P.id,"closed-col")}gt()}catch{F=[],W=[],Y=[],ae=[],Z=[],U=[],be=new Map,gt()}}function D(T){be=Ro(T)}function me(T){return Oo(be,T)}function xe(T){return!Se.has(T)}function Ye(T,G){T.preventDefault(),T.stopPropagation(),Se.has(G)?Se.delete(G):Se.add(G),gt()}function ie(T,G){T.preventDefault(),T.stopPropagation(),r(G)}function Ue(T,G){T.preventDefault(),T.stopPropagation(),r(G)}function mt(T,G){ke||r(G)}function ct(T,G){T.preventDefault(),T.stopPropagation(),Cm(G).then(Me=>{Me&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function St(T,G){ke=G,T.dataTransfer&&(T.dataTransfer.setData("text/plain",G),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function ft(T){T.target.classList.remove("board-card--dragging"),Ot(),setTimeout(()=>{ke=null},0)}function O(T){let G=String(T.target.value||"");!G||G===h||(h=G,u&&u(G),gt())}function oe(){return i?i.get():null}function Ie(T){let G=l?l.get():null,Me=G?G.cleanup_failed:null;if(!Me||typeof Me!="object"||Array.isArray(Me))return null;let x=Me[T];return!x||typeof x!="object"||Array.isArray(x)?null:x}let je={onCardClick:mt,onCopyId:ct,onDragStart:St,onDragEnd:ft,onClosedRangeChange:O,rollupFor:me,isExpanded:xe,onRollupToggle:Ye,onChildClick:ie,onFromChipClick:Ue,onOpenDoc:_?(T,G)=>_(G):void 0,cleanupFailureFor:Ie,get policy(){return oe()}};function Xe(T,G){ke||(ve(),r(G))}function rt(T,G){T.preventDefault(),T.stopPropagation(),ve(),r(G)}let yt={...je,onCardClick:Xe,onChildClick:rt,onFromChipClick:rt,onOpenDoc:_?(T,G)=>{ve(),_(G)}:void 0,get policy(){return oe()}};function vt(T){let G=T.target,Me=e.querySelector(".board-filter__labels");G&&Me&&Me.contains(G)||We()}function re(T){T.key==="Escape"&&We()}function Q(){_e||(_e=!0,document.addEventListener("mousedown",vt),document.addEventListener("keydown",re),gt())}function We(){_e&&(_e=!1,document.removeEventListener("mousedown",vt),document.removeEventListener("keydown",re),gt())}function ut(T){T.key==="Escape"&&ve()}function Ke(){q||(q=!0,document.addEventListener("keydown",ut),gt())}function ve(){q&&(q=!1,document.removeEventListener("keydown",ut),gt())}let Ge={onClose:ve,onOverlayClick(T){T.target===T.currentTarget&&ve()}},dt={onSearchInput(T){ce.search=String(T.target.value||""),V()},onPriorityChange(T){ce.priority=String(T.target.value||""),V()},onTypeChange(T){ce.type=String(T.target.value||""),V()},onSortChange(T){let G=String(T.target.value||"");if(!(!bu.has(G)||G===S)){S=G;try{window.localStorage.setItem(gu,G)}catch{}V()}},onDeferredToggle(){q?ve():Ke()},onLabelMenuToggle(){_e?We():Q()},onLabelToggle(T){let G=ce.labels.indexOf(T);G===-1?ce.labels.push(T):ce.labels.splice(G,1),V()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],V())},onNewIssue(){d&&d()}};function _t(){return c`
      <div class="board-view">
        ${mu(ce,dt,{sort_mode:S,deferred_popup_open:q,deferred_count:H,label_options:Te(),label_menu_open:_e})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:X(F)},je)}
          ${Hr({title:"Ready",id:"ready-col",items:X(W)},je)}
          ${Hr({title:"In progress",id:"in-progress-col",items:X(Y)},je)}
          ${Hr({title:"Resolved",id:"resolved-col",items:X(ae)},je)}
          ${Hr({title:"Closed",id:"closed-col",items:X(U),is_closed:!0,closed_range:h},je)}
        </div>
        ${q?_u({items:X(Z),count:H},yt,Ge):""}
      </div>
    `}function gt(){at(_t(),e),jt()}function jt(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Me of G)Array.from(Me.querySelectorAll(".board-card")).forEach((E,J)=>{E.tabIndex=J===0?0:-1})}catch{}}async function Zt(T,G){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:G}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Me){n("update-status failed: %o",Me),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Kt(T){switch(T){case"blocked-col":return F;case"ready-col":return W;case"in-progress-col":return Y;case"resolved-col":return ae;default:return[]}}function Et(T,G,Me){if(!o||!a)return;let x=Kt(T),E=x.find(A=>A.id===G);if(!E)return;let J=x.filter(A=>A.id!==G),fe=Me.closest?Me.closest(".board-card"):null,Ee=J.length;if(fe){let A=fe.getAttribute("data-issue-id");if(A===G)return;let P=J.findIndex($e=>$e.id===A);P>=0&&(Ee=P)}let Fe=J.slice();Fe.splice(Ee,0,E),w.applyReorder(G,Fe,Ee)}function Ot(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Me=T.target.closest(".board-column");Me&&Me!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),Me.classList.add("board-column--drag-over"),Je=Me)}),e.addEventListener("dragleave",T=>{let G=T.relatedTarget;(!G||!e.contains(G))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",T=>{T.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let G=T.target,Me=G.closest(".board-column");if(!Me)return;let x=T.dataTransfer?.getData("text/plain")||"";if(!x)return;let E=Me.id,J=ne.get(x);if(J&&J===E){if(Em.has(E)){if(S!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Et(E,x,G)}return}let fe=Sm[E];if(!fe){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(x)!==fe&&Zt(x,fe)}),e.addEventListener("keydown",T=>{let G=T.target;if(!(G instanceof HTMLElement))return;let Me=String(G.tagName||"").toLowerCase();if(Me==="input"||Me==="textarea"||Me==="select"||Me==="button"||Me==="a"||G.isContentEditable===!0)return;let x=G.closest(".board-card");if(!x)return;let E=String(T.key||"");if(E==="Enter"||E===" "){T.preventDefault();let Fe=x.getAttribute("data-issue-id");Fe&&r(Fe);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;T.preventDefault();let J=x.closest(".board-column");if(!J)return;let fe=Array.from(J.querySelectorAll(".board-card")),Ee=fe.indexOf(x);if(E==="ArrowDown"&&Ee<fe.length-1){qe(x,fe[Ee+1]);return}if(E==="ArrowUp"&&Ee>0){qe(x,fe[Ee-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let Fe=Array.from(e.querySelectorAll(".board-column")),A=Fe.indexOf(J),P=E==="ArrowRight"?1:-1,$e=A+P;for(;$e>=0&&$e<Fe.length;){let Ze=Fe[$e].querySelector(".board-card");if(Ze){qe(x,Ze);return}$e+=P}}});function qe(T,G){try{T.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let N=null;b&&b.subscribe&&(N=b.subscribe(()=>{try{V()}catch{}}));let ee=null;i&&i.subscribe&&(ee=i.subscribe(()=>{try{V()}catch{}}));let ye=null;return l&&l.subscribe&&(ye=l.subscribe(()=>{gt()})),{async load(){n("load"),V()},clear(){We(),ve(),N&&(N(),N=null),ee&&(ee(),ee=null),ye&&(ye(),ye=null),e.replaceChildren(),F=[],W=[],Y=[],ae=[],Z=[],U=[],M=new Map,ne=new Map}}}function bs(e,t){return e.filter(n=>{let r=Co(n);return!(r&&t.has(r))})}async function Cm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Tn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Sr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function hs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Rm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Sr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Rm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Om=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],yu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Lm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function nn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Yt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function Wt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function wu(e,t,n){let r=Yt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Yt(n[e]);return s===null?null:{value:s,source:"global"}}function ys(e,t,n,r){return wu(e,t,n)||{value:r,source:"base"}}function hi(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&nn(s?.[t])){let a=Yt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&nn(s)){for(let a of Object.values(s))if(nn(a)){let i=Yt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Yt(r?.runners?.[o]?.models?.[e]?.id)||e}function Im(e,t){return Yt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return Wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return Wt(e,t,r,e,"explicit")}function ku(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];nn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(nn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Mm(e,t){let n=[],r=e?.implementation?.model_catalog;nn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(nn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Pm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Mm(t,n)){let o=ku(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function yi(e){return Wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function vu(e,t,n){let r=wu(e,t,n);return r?Kr(r.value,r.source):Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function kn(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&nn(r.session)?r.session:null,o=r?.supported===!0&&nn(r.orchestration)?r.orchestration:null,a=nn(e.runner_catalog)?e.runner_catalog:null,i=Yt(n.quick_fix_impl_model),l=Pm(i,s,a),u={};if(s){let d=ys("workflow_mode",t,n,Yt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Kr(d.value,d.source);for(let Z of["spec_review","plan_review","impl_review"]){let U=`${Z}_model`,q=Yt(Z==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),H=ys(U,t,n,q);if(H.value===null)u[U]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(H.value!=="self"&&H.value!=="skip"&&!nn(s.review?.reviewers?.[H.value]))u[U]=yi(Wt(H.value,H.source,"",null,"explicit"));else{let S=Im(H.value,s);u[U]=Wt(H.value,H.source,Gr(S),S,H.source==="base"?"default":"explicit")}}for(let[Z,U]of Object.entries(yu)){let q=u[U].value;if(q==="self"||q==="skip"){u[Z]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let H=Yt(s.review?.reviewers?.[q||""]?.effort),S=ys(Z,t,n,H);u[Z]=S.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let _=nn(s.implementation?.default)?s.implementation.default:{},h=Yt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),w=nn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=b&&nn(w[h])?w[h]:{};for(let Z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let U=ys(Z,t,n,Z==="impl_dispatch"?Yt(F.dispatch)||Yt(_.dispatch):Yt(_[Z.replace("impl_","")]));u[Z]=U.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}let W=Yt(t.impl_runtime),Y=W==="inherit"?Yt(e.controller_runtime):W,ae=h==="quick_fix"&&Yt(t.impl_dispatch)===null&&l.runtime!==null&&(W===null||Y===l.runtime);if(ae){let Z=l.runtime,U=i;u.impl_dispatch=Wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(u.impl_runtime=Wt(Z,"global",`${Z} (\uC720\uB3C4)`,Z,"explicit")),Yt(t.impl_model)===null&&(u.impl_model=Wt(U,"global",U,U,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Z]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Z=u.impl_runtime.value==="inherit"?Yt(e.controller_runtime):u.impl_runtime.value,U=Z?ku(Z,s,a):[];if(u.impl_model.value!=="auto"&&U.length>0&&!U.includes(u.impl_model.value))u.impl_model=yi(u.impl_model);else{let q=hi(u.impl_model.value,Z,s,a);u.impl_model.display=Gr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let Z=Yt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),U=Z?Yt(s.implementation?.effort_by_transport?.[Z]?.auto):null;U&&!Lm.has(U)?(u.impl_effort.display=`${U} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=U,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",u.impl_speed.source))}}else for(let d of Om.filter(_=>!_.startsWith("orchestration_")))u[d]=vu(d,t,n);if(!s){for(let[d,_]of Object.entries(yu))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=vu(d,t,n);continue}let _=d.replace("orchestration_",""),h=Yt(o[_]),b=ys(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=b.source==="base"?Yt(o.model_id)||b.value:hi(b.value,null,s,a);u[d]=Wt(b.value,b.source,Gr(w),w,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}u[d]=Kr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(d)})`,null,"default")}else if(l.runtime!==null){let d=hi(i,l.runtime,s,a);u.quick_fix_impl_model=Wt(i,"global",Gr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=yi(Wt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Kr(i,"global");return u}function Dm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function jo(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return kn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Yt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Dm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function vi(e){return`session:${e.provider}:${e.session_id}`}function vs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Nm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:vi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:vs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Nm(e,n)}}}var wi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",qm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",$u="\uBD84\uD574 \uC5C6\uB294 leg";function tn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Zr=[...Kn,"reasoning_output_tokens"],Fm={codex:["implementation","review-consult"],claude:["subagent"]};function ki(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function jm(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))}function $i(e){let t=0;for(let n of Kn)t+=tn(e?.[n]);return t}function Bm(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function xu(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Um(e){let t={};for(let n of Zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Au(e){let t={};for(let n of Zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Su(e,t){return ki(t)?tn(t.total_tokens):e==="codex"?tn(t.input_tokens)+tn(t.output_tokens):$i(t)}function Wm(e){return e==="claude"?"Claude":"Codex"}function zm(e){return`\u03C4 ${Tu(e)}`}function Hm(e,t){let n=t.breakdown||{},r=tn(t.total_only_subtotal);if(ki(n)||r>0&&!jm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,qm];return t.replayed&&u.push(wi),u.join(`
`)}let s=[`\uC785\uB825 ${tn(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${tn(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${tn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${tn(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${tn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${tn(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${tn(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${$u} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${$u}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(wi),l.join(`
`)}function fn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Wm(n)} ${zm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Hm(n,r)})}return t}function Uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=tn(i.total_only_subtotal)+tn(a.total_only_subtotal));for(let l of Zr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=tn(i.breakdown[l])+tn(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function xi(e){return!e||typeof e!="object"?null:Ln({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Gm(e){return e==="codex"?"codex":"claude"}function Gn(){return{subtotal:0,breakdown:Um(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bo(e,t,n){e.subtotal+=t.subtotal,ki(t.usage)&&(e.total_only+=t.subtotal);for(let r of Zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=tn(e.breakdown[r])+tn(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Eu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Tu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return Bm(e)?`\u03C4 ${Tu($i(e))}`:null}function tr(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ws(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${tn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${tn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${tn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${tn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${$i(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(wi),n.join(`
`)}function Ln(e,t){let n={claude:Gn(),codex:Gn()},r={orchestrator:{claude:Gn(),codex:Gn()},implementation:{claude:Gn(),codex:Gn()},"review-consult":{claude:Gn(),codex:Gn()},subagent:{claude:Gn(),codex:Gn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(xu(l)){let d=Gm(i.runner),_=Au(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Su(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Bo(n[d],h,!0),Bo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Fm[_].includes(d.role)||!xu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=Au(d.usage),w={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:Su(_,b)};w.receipt_id=h,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),b.replayed===!0&&(w.replayed=!0),Bo(n[_],w,!1),Bo(r[w.role][_],w,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=Eu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...Eu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Nu,setPrototypeOf:Cu,isFrozen:Km,getPrototypeOf:Vm,getOwnPropertyDescriptor:Ym}=Object,{freeze:bn,seal:In,create:Oi}=Object,{apply:Li,construct:Ii}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});In||(In=function(t){return t});Li||(Li=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ii||(Ii=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Wo=hn(Array.prototype.forEach),Zm=hn(Array.prototype.lastIndexOf),Ru=hn(Array.prototype.pop),ks=hn(Array.prototype.push),Xm=hn(Array.prototype.splice),Ho=hn(String.prototype.toLowerCase),Ai=hn(String.prototype.toString),Si=hn(String.prototype.match),$s=hn(String.prototype.replace),Qm=hn(String.prototype.indexOf),Jm=hn(String.prototype.trim),Nn=hn(Object.prototype.hasOwnProperty),gn=hn(RegExp.prototype.test),xs=eg(TypeError);function hn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Li(e,t,r)}}function eg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ii(e,n)}}function $t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ho;Cu&&Cu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Km(t)||(t[r]=o),s=o)}e[s]=!0}return e}function tg(e){for(let t=0;t<e.length;t++)Nn(e,t)||(e[t]=null);return e}function nr(e){let t=Oi(null);for(let[n,r]of Nu(e))Nn(e,n)&&(Array.isArray(r)?t[n]=tg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=nr(r):t[n]=r);return t}function As(e,t){for(;e!==null;){let r=Ym(e,t);if(r){if(r.get)return hn(r.get);if(typeof r.value=="function")return hn(r.value)}e=Vm(e)}function n(){return null}return n}var Ou=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ei=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ti=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ng=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ci=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),rg=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Lu=bn(["#text"]),Iu=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ri=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Mu=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zo=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sg=In(/\{\{[\w\W]*|[\w\W]*\}\}/gm),og=In(/<%[\w\W]*|[\w\W]*%>/gm),ag=In(/\$\{[\w\W]*/gm),ig=In(/^data-[\-\w.\u00B7-\uFFFF]+$/),lg=In(/^aria-[\-\w]+$/),qu=In(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),cg=In(/^(?:\w+script|data):/i),ug=In(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fu=In(/^html$/i),dg=In(/^[a-z][.\w]*(-[.\w]+)+$/i),Pu=Object.freeze({__proto__:null,ARIA_ATTR:lg,ATTR_WHITESPACE:ug,CUSTOM_ELEMENT:dg,DATA_ATTR:ig,DOCTYPE_NAME:Fu,ERB_EXPR:og,IS_ALLOWED_URI:qu,IS_SCRIPT_OR_DATA:cg,MUSTACHE_EXPR:sg,TMPLIT_EXPR:ag}),Ss={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},pg=function(){return typeof window>"u"?null:window},fg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Du=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ju(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:pg(),t=Pe=>ju(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ss.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:b}=e,w=l.prototype,F=As(w,"cloneNode"),W=As(w,"remove"),Y=As(w,"nextSibling"),ae=As(w,"childNodes"),Z=As(w,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let U,q="",{implementation:H,createNodeIterator:S,createDocumentFragment:M,getElementsByTagName:ne}=n,{importNode:be}=r,Se=Du();t.isSupported=typeof Nu=="function"&&typeof Z=="function"&&H&&H.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:_e,TMPLIT_EXPR:ke,DATA_ATTR:Be,ARIA_ATTR:we,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:De}=Pu,{IS_ALLOWED_URI:V}=Pu,D=null,me=$t({},[...Ou,...Ei,...Ti,...Ci,...Lu]),xe=null,Ye=$t({},[...Iu,...Ri,...Mu,...zo]),ie=Object.seal(Oi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ue=null,mt=null,ct=Object.seal(Oi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),St=!0,ft=!0,O=!1,oe=!0,Ie=!1,je=!0,Xe=!1,rt=!1,yt=!1,vt=!1,re=!1,Q=!1,We=!0,ut=!1,Ke="user-content-",ve=!0,Ge=!1,dt={},_t=null,gt=$t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),jt=null,Zt=$t({},["audio","video","img","source","image","track"]),Kt=null,Et=$t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ot="http://www.w3.org/1998/Math/MathML",Je="http://www.w3.org/2000/svg",qe="http://www.w3.org/1999/xhtml",N=qe,ee=!1,ye=null,T=$t({},[Ot,Je,qe],Ai),G=$t({},["mi","mo","mn","ms","mtext"]),Me=$t({},["annotation-xml"]),x=$t({},["title","style","font","a","script"]),E=null,J=["application/xhtml+xml","text/html"],fe="text/html",Ee=null,Fe=null,A=n.createElement("form"),P=function(R){return R instanceof RegExp||R instanceof Function},$e=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Fe&&Fe===R)){if((!R||typeof R!="object")&&(R={}),R=nr(R),E=J.indexOf(R.PARSER_MEDIA_TYPE)===-1?fe:R.PARSER_MEDIA_TYPE,Ee=E==="application/xhtml+xml"?Ai:Ho,D=Nn(R,"ALLOWED_TAGS")?$t({},R.ALLOWED_TAGS,Ee):me,xe=Nn(R,"ALLOWED_ATTR")?$t({},R.ALLOWED_ATTR,Ee):Ye,ye=Nn(R,"ALLOWED_NAMESPACES")?$t({},R.ALLOWED_NAMESPACES,Ai):T,Kt=Nn(R,"ADD_URI_SAFE_ATTR")?$t(nr(Et),R.ADD_URI_SAFE_ATTR,Ee):Et,jt=Nn(R,"ADD_DATA_URI_TAGS")?$t(nr(Zt),R.ADD_DATA_URI_TAGS,Ee):Zt,_t=Nn(R,"FORBID_CONTENTS")?$t({},R.FORBID_CONTENTS,Ee):gt,Ue=Nn(R,"FORBID_TAGS")?$t({},R.FORBID_TAGS,Ee):nr({}),mt=Nn(R,"FORBID_ATTR")?$t({},R.FORBID_ATTR,Ee):nr({}),dt=Nn(R,"USE_PROFILES")?R.USE_PROFILES:!1,St=R.ALLOW_ARIA_ATTR!==!1,ft=R.ALLOW_DATA_ATTR!==!1,O=R.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=R.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=R.SAFE_FOR_TEMPLATES||!1,je=R.SAFE_FOR_XML!==!1,Xe=R.WHOLE_DOCUMENT||!1,vt=R.RETURN_DOM||!1,re=R.RETURN_DOM_FRAGMENT||!1,Q=R.RETURN_TRUSTED_TYPE||!1,yt=R.FORCE_BODY||!1,We=R.SANITIZE_DOM!==!1,ut=R.SANITIZE_NAMED_PROPS||!1,ve=R.KEEP_CONTENT!==!1,Ge=R.IN_PLACE||!1,V=R.ALLOWED_URI_REGEXP||qu,N=R.NAMESPACE||qe,G=R.MATHML_TEXT_INTEGRATION_POINTS||G,Me=R.HTML_INTEGRATION_POINTS||Me,ie=R.CUSTOM_ELEMENT_HANDLING||{},R.CUSTOM_ELEMENT_HANDLING&&P(R.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=R.CUSTOM_ELEMENT_HANDLING.tagNameCheck),R.CUSTOM_ELEMENT_HANDLING&&P(R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=R.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),R.CUSTOM_ELEMENT_HANDLING&&typeof R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=R.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(ft=!1),re&&(vt=!0),dt&&(D=$t({},Lu),xe=[],dt.html===!0&&($t(D,Ou),$t(xe,Iu)),dt.svg===!0&&($t(D,Ei),$t(xe,Ri),$t(xe,zo)),dt.svgFilters===!0&&($t(D,Ti),$t(xe,Ri),$t(xe,zo)),dt.mathMl===!0&&($t(D,Ci),$t(xe,Mu),$t(xe,zo))),R.ADD_TAGS&&(typeof R.ADD_TAGS=="function"?ct.tagCheck=R.ADD_TAGS:(D===me&&(D=nr(D)),$t(D,R.ADD_TAGS,Ee))),R.ADD_ATTR&&(typeof R.ADD_ATTR=="function"?ct.attributeCheck=R.ADD_ATTR:(xe===Ye&&(xe=nr(xe)),$t(xe,R.ADD_ATTR,Ee))),R.ADD_URI_SAFE_ATTR&&$t(Kt,R.ADD_URI_SAFE_ATTR,Ee),R.FORBID_CONTENTS&&(_t===gt&&(_t=nr(_t)),$t(_t,R.FORBID_CONTENTS,Ee)),ve&&(D["#text"]=!0),Xe&&$t(D,["html","head","body"]),D.table&&($t(D,["tbody"]),delete Ue.tbody),R.TRUSTED_TYPES_POLICY){if(typeof R.TRUSTED_TYPES_POLICY.createHTML!="function")throw xs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof R.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw xs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=R.TRUSTED_TYPES_POLICY,q=U.createHTML("")}else U===void 0&&(U=fg(b,s)),U!==null&&typeof q=="string"&&(q=U.createHTML(""));bn&&bn(R),Fe=R}},Ze=$t({},[...Ei,...Ti,...ng]),de=$t({},[...Ci,...rg]),st=function(R){let ge=Z(R);(!ge||!ge.tagName)&&(ge={namespaceURI:N,tagName:"template"});let Ne=Ho(R.tagName),xt=Ho(ge.tagName);return ye[R.namespaceURI]?R.namespaceURI===Je?ge.namespaceURI===qe?Ne==="svg":ge.namespaceURI===Ot?Ne==="svg"&&(xt==="annotation-xml"||G[xt]):!!Ze[Ne]:R.namespaceURI===Ot?ge.namespaceURI===qe?Ne==="math":ge.namespaceURI===Je?Ne==="math"&&Me[xt]:!!de[Ne]:R.namespaceURI===qe?ge.namespaceURI===Je&&!Me[xt]||ge.namespaceURI===Ot&&!G[xt]?!1:!de[Ne]&&(x[Ne]||!Ze[Ne]):!!(E==="application/xhtml+xml"&&ye[R.namespaceURI]):!1},bt=function(R){ks(t.removed,{element:R});try{Z(R).removeChild(R)}catch{W(R)}},At=function(R,ge){try{ks(t.removed,{attribute:ge.getAttributeNode(R),from:ge})}catch{ks(t.removed,{attribute:null,from:ge})}if(ge.removeAttribute(R),R==="is")if(vt||re)try{bt(ge)}catch{}else try{ge.setAttribute(R,"")}catch{}},Mt=function(R){let ge=null,Ne=null;if(yt)R="<remove></remove>"+R;else{let Tt=Si(R,/^[\r\n\t ]+/);Ne=Tt&&Tt[0]}E==="application/xhtml+xml"&&N===qe&&(R='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+R+"</body></html>");let xt=U?U.createHTML(R):R;if(N===qe)try{ge=new h().parseFromString(xt,E)}catch{}if(!ge||!ge.documentElement){ge=H.createDocument(N,"template",null);try{ge.documentElement.innerHTML=ee?q:xt}catch{}}let Bt=ge.body||ge.documentElement;return R&&Ne&&Bt.insertBefore(n.createTextNode(Ne),Bt.childNodes[0]||null),N===qe?ne.call(ge,Xe?"html":"body")[0]:Xe?ge.documentElement:Bt},Ht=function(R){return S.call(R.ownerDocument||R,R,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Lt=function(R){return R instanceof _&&(typeof R.nodeName!="string"||typeof R.textContent!="string"||typeof R.removeChild!="function"||!(R.attributes instanceof d)||typeof R.removeAttribute!="function"||typeof R.setAttribute!="function"||typeof R.namespaceURI!="string"||typeof R.insertBefore!="function"||typeof R.hasChildNodes!="function")},mn=function(R){return typeof i=="function"&&R instanceof i};function Nt(Pe,R,ge){Wo(Pe,Ne=>{Ne.call(t,R,ge,Fe)})}let an=function(R){let ge=null;if(Nt(Se.beforeSanitizeElements,R,null),Lt(R))return bt(R),!0;let Ne=Ee(R.nodeName);if(Nt(Se.uponSanitizeElement,R,{tagName:Ne,allowedTags:D}),je&&R.hasChildNodes()&&!mn(R.firstElementChild)&&gn(/<[/\w!]/g,R.innerHTML)&&gn(/<[/\w!]/g,R.textContent)||R.nodeType===Ss.progressingInstruction||je&&R.nodeType===Ss.comment&&gn(/<[/\w]/g,R.data))return bt(R),!0;if(!(ct.tagCheck instanceof Function&&ct.tagCheck(Ne))&&(!D[Ne]||Ue[Ne])){if(!Ue[Ne]&&Xt(Ne)&&(ie.tagNameCheck instanceof RegExp&&gn(ie.tagNameCheck,Ne)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(Ne)))return!1;if(ve&&!_t[Ne]){let xt=Z(R)||R.parentNode,Bt=ae(R)||R.childNodes;if(Bt&&xt){let Tt=Bt.length;for(let Qt=Tt-1;Qt>=0;--Qt){let Ut=F(Bt[Qt],!0);Ut.__removalCount=(R.__removalCount||0)+1,xt.insertBefore(Ut,Y(R))}}}return bt(R),!0}return R instanceof l&&!st(R)||(Ne==="noscript"||Ne==="noembed"||Ne==="noframes")&&gn(/<\/no(script|embed|frames)/i,R.innerHTML)?(bt(R),!0):(Ie&&R.nodeType===Ss.text&&(ge=R.textContent,Wo([ce,_e,ke],xt=>{ge=$s(ge,xt," ")}),R.textContent!==ge&&(ks(t.removed,{element:R.cloneNode()}),R.textContent=ge)),Nt(Se.afterSanitizeElements,R,null),!1)},ln=function(R,ge,Ne){if(We&&(ge==="id"||ge==="name")&&(Ne in n||Ne in A))return!1;if(!(ft&&!mt[ge]&&gn(Be,ge))){if(!(St&&gn(we,ge))){if(!(ct.attributeCheck instanceof Function&&ct.attributeCheck(ge,R))){if(!xe[ge]||mt[ge]){if(!(Xt(R)&&(ie.tagNameCheck instanceof RegExp&&gn(ie.tagNameCheck,R)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(R))&&(ie.attributeNameCheck instanceof RegExp&&gn(ie.attributeNameCheck,ge)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(ge,R))||ge==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&gn(ie.tagNameCheck,Ne)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(Ne))))return!1}else if(!Kt[ge]){if(!gn(V,$s(Ne,Te,""))){if(!((ge==="src"||ge==="xlink:href"||ge==="href")&&R!=="script"&&Qm(Ne,"data:")===0&&jt[R])){if(!(O&&!gn(X,$s(Ne,Te,"")))){if(Ne)return!1}}}}}}}return!0},Xt=function(R){return R!=="annotation-xml"&&Si(R,De)},cn=function(R){Nt(Se.beforeSanitizeAttributes,R,null);let{attributes:ge}=R;if(!ge||Lt(R))return;let Ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:xe,forceKeepAttr:void 0},xt=ge.length;for(;xt--;){let Bt=ge[xt],{name:Tt,namespaceURI:Qt,value:Ut}=Bt,rn=Ee(Tt),xn=Ut,qt=Tt==="value"?xn:Jm(xn);if(Ne.attrName=rn,Ne.attrValue=qt,Ne.keepAttr=!0,Ne.forceKeepAttr=void 0,Nt(Se.uponSanitizeAttribute,R,Ne),qt=Ne.attrValue,ut&&(rn==="id"||rn==="name")&&(At(Tt,R),qt=Ke+qt),je&&gn(/((--!?|])>)|<\/(style|title|textarea)/i,qt)){At(Tt,R);continue}if(rn==="attributename"&&Si(qt,"href")){At(Tt,R);continue}if(Ne.forceKeepAttr)continue;if(!Ne.keepAttr){At(Tt,R);continue}if(!oe&&gn(/\/>/i,qt)){At(Tt,R);continue}Ie&&Wo([ce,_e,ke],Sn=>{qt=$s(qt,Sn," ")});let An=Ee(R.nodeName);if(!ln(An,rn,qt)){At(Tt,R);continue}if(U&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Qt)switch(b.getAttributeType(An,rn)){case"TrustedHTML":{qt=U.createHTML(qt);break}case"TrustedScriptURL":{qt=U.createScriptURL(qt);break}}if(qt!==xn)try{Qt?R.setAttributeNS(Qt,Tt,qt):R.setAttribute(Tt,qt),Lt(R)?bt(R):Ru(t.removed)}catch{At(Tt,R)}}Nt(Se.afterSanitizeAttributes,R,null)},Oe=function Pe(R){let ge=null,Ne=Ht(R);for(Nt(Se.beforeSanitizeShadowDOM,R,null);ge=Ne.nextNode();)Nt(Se.uponSanitizeShadowNode,ge,null),an(ge),cn(ge),ge.content instanceof o&&Pe(ge.content);Nt(Se.afterSanitizeShadowDOM,R,null)};return t.sanitize=function(Pe){let R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ge=null,Ne=null,xt=null,Bt=null;if(ee=!Pe,ee&&(Pe="<!-->"),typeof Pe!="string"&&!mn(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw xs("dirty is not a string, aborting")}else throw xs("toString is not a function");if(!t.isSupported)return Pe;if(rt||$e(R),t.removed=[],typeof Pe=="string"&&(Ge=!1),Ge){if(Pe.nodeName){let Ut=Ee(Pe.nodeName);if(!D[Ut]||Ue[Ut])throw xs("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)ge=Mt("<!---->"),Ne=ge.ownerDocument.importNode(Pe,!0),Ne.nodeType===Ss.element&&Ne.nodeName==="BODY"||Ne.nodeName==="HTML"?ge=Ne:ge.appendChild(Ne);else{if(!vt&&!Ie&&!Xe&&Pe.indexOf("<")===-1)return U&&Q?U.createHTML(Pe):Pe;if(ge=Mt(Pe),!ge)return vt?null:Q?q:""}ge&&yt&&bt(ge.firstChild);let Tt=Ht(Ge?Pe:ge);for(;xt=Tt.nextNode();)an(xt),cn(xt),xt.content instanceof o&&Oe(xt.content);if(Ge)return Pe;if(vt){if(re)for(Bt=M.call(ge.ownerDocument);ge.firstChild;)Bt.appendChild(ge.firstChild);else Bt=ge;return(xe.shadowroot||xe.shadowrootmode)&&(Bt=be.call(r,Bt,!0)),Bt}let Qt=Xe?ge.outerHTML:ge.innerHTML;return Xe&&D["!doctype"]&&ge.ownerDocument&&ge.ownerDocument.doctype&&ge.ownerDocument.doctype.name&&gn(Fu,ge.ownerDocument.doctype.name)&&(Qt="<!DOCTYPE "+ge.ownerDocument.doctype.name+`>
`+Qt),Ie&&Wo([ce,_e,ke],Ut=>{Qt=$s(Qt,Ut," ")}),U&&Q?U.createHTML(Qt):Qt},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$e(Pe),rt=!0},t.clearConfig=function(){Fe=null,rt=!1},t.isValidAttribute=function(Pe,R,ge){Fe||$e({});let Ne=Ee(Pe),xt=Ee(R);return ln(Ne,xt,ge)},t.addHook=function(Pe,R){typeof R=="function"&&ks(Se[Pe],R)},t.removeHook=function(Pe,R){if(R!==void 0){let ge=Zm(Se[Pe],R);return ge===-1?void 0:Xm(Se[Pe],ge,1)[0]}return Ru(Se[Pe])},t.removeHooks=function(Pe){Se[Pe]=[]},t.removeAllHooks=function(){Se=Du()},t}var Bu=ju();var rr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Go=e=>(...t)=>({_$litDirective$:e,values:t}),Qr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Es=class extends Qr{constructor(t){if(super(t),this.it=Vt,t.type!==rr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Vt||t==null)return this._t=void 0,this.it=t;if(t===On)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Es.directiveName="unsafeHTML",Es.resultType=1;var Uu=Go(Es);function Ni(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Ni();function Yu(e){Tr=e}var Os={exec:()=>null};function Rt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(yn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var _g=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),yn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},mg=/^(?:[ \t]*(?:\n|$))+/,gg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ls=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,hg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,qi=/(?:[*+-]|\d{1,9}[.)])/,Zu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Xu=Rt(Zu).replace(/bull/g,qi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),yg=Rt(Zu).replace(/bull/g,qi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Fi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vg=/^[^\n]+/,ji=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,wg=Rt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ji).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),kg=Rt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,qi).getRegex(),Qo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Bi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$g=Rt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Bi).replace("tag",Qo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qu=Rt(Fi).replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),xg=Rt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qu).getRegex(),Ui={blockquote:xg,code:gg,def:wg,fences:bg,heading:hg,hr:Ls,html:$g,lheading:Xu,list:kg,newline:mg,paragraph:Qu,table:Os,text:vg},Wu=Rt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),Ag={...Ui,lheading:yg,table:Wu,paragraph:Rt(Fi).replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex()},Sg={...Ui,html:Rt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Bi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Os,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Rt(Fi).replace("hr",Ls).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Xu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Eg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Tg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ju=/^( {2,}|\\)\n(?!\s*$)/,Cg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jo=/[\p{P}\p{S}]/u,Wi=/[\s\p{P}\p{S}]/u,ed=/[^\s\p{P}\p{S}]/u,Rg=Rt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Wi).getRegex(),td=/(?!~)[\p{P}\p{S}]/u,Og=/(?!~)[\s\p{P}\p{S}]/u,Lg=/(?:[^\s\p{P}\p{S}]|~)/u,Ig=Rt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",_g?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),nd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Mg=Rt(nd,"u").replace(/punct/g,Jo).getRegex(),Pg=Rt(nd,"u").replace(/punct/g,td).getRegex(),rd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Dg=Rt(rd,"gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Wi).replace(/punct/g,Jo).getRegex(),Ng=Rt(rd,"gu").replace(/notPunctSpace/g,Lg).replace(/punctSpace/g,Og).replace(/punct/g,td).getRegex(),qg=Rt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Wi).replace(/punct/g,Jo).getRegex(),Fg=Rt(/\\(punct)/,"gu").replace(/punct/g,Jo).getRegex(),jg=Rt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Bg=Rt(Bi).replace("(?:-->|$)","-->").getRegex(),Ug=Rt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Bg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Wg=Rt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),sd=Rt(/^!?\[(label)\]\[(ref)\]/).replace("label",Yo).replace("ref",ji).getRegex(),od=Rt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ji).getRegex(),zg=Rt("reflink|nolink(?!\\()","g").replace("reflink",sd).replace("nolink",od).getRegex(),zu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zi={_backpedal:Os,anyPunctuation:Fg,autolink:jg,blockSkip:Ig,br:Ju,code:Tg,del:Os,emStrongLDelim:Mg,emStrongRDelimAst:Dg,emStrongRDelimUnd:qg,escape:Eg,link:Wg,nolink:od,punctuation:Rg,reflink:sd,reflinkSearch:zg,tag:Ug,text:Cg,url:Os},Hg={...zi,link:Rt(/^!?\[(label)\]\((.*?)\)/).replace("label",Yo).getRegex(),reflink:Rt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yo).getRegex()},Mi={...zi,emStrongRDelimAst:Ng,emStrongLDelim:Pg,url:Rt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",zu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Rt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",zu).getRegex()},Gg={...Mi,br:Rt(Ju).replace("{2,}","*").getRegex(),text:Rt(Mi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ko={normal:Ui,gfm:Ag,pedantic:Sg},Ts={normal:zi,gfm:Mi,breaks:Gg,pedantic:Hg},Kg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Hu=e=>Kg[e];function sr(e,t){if(t){if(yn.escapeTest.test(e))return e.replace(yn.escapeReplace,Hu)}else if(yn.escapeTestNoEncode.test(e))return e.replace(yn.escapeReplaceNoEncode,Hu);return e}function Gu(e){try{e=encodeURI(e).replace(yn.percentDecode,"%")}catch{return null}return e}function Ku(e,t){let n=e.replace(yn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(yn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(yn.slashPipe,"|");return r}function Cs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Vg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Vu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Yg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zo=class{constructor(e){Ft(this,"options");Ft(this,"rules");Ft(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Cs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Yg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Cs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Cs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Cs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,w=b.raw+`
`+n.join(`
`),F=this.blockquote(w);o[o.length-1]=F,r=r.substring(0,r.length-b.raw.length)+F.raw,s=s.substring(0,s.length-b.text.length)+F.text;break}else if(h?.type==="list"){let b=h,w=b.raw+`
`+n.join(`
`),F=this.list(w);o[o.length-1]=F,r=r.substring(0,r.length-h.raw.length)+F.raw,s=s.substring(0,s.length-b.raw.length)+F.raw,n=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],b=!_.trim(),w=0;if(this.options.pedantic?(w=2,d=_.trimStart()):b?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=_.slice(w),w+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(w),W=this.rules.other.hrRegex(w),Y=this.rules.other.fencesBeginRegex(w),ae=this.rules.other.headingBeginRegex(w),Z=this.rules.other.htmlBeginRegex(w);for(;e;){let U=e.split(`
`,1)[0],q;if(h=U,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),q=h):q=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||ae.test(h)||Z.test(h)||F.test(h)||W.test(h))break;if(q.search(this.rules.other.nonSpaceChar)>=w||!h.trim())d+=`
`+q.slice(w);else{if(b||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(_)||ae.test(_)||W.test(_))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=U+`
`,e=e.substring(U.length+1),_=q.slice(w)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ku(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ku(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Cs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Vg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Vu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Vu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=_.slice(1,-1);return{type:"em",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},qn=class Pi{constructor(t){Ft(this,"tokens");Ft(this,"options");Ft(this,"state");Ft(this,"inlineQueue");Ft(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Zo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:yn,block:Ko.normal,inline:Ts.normal};this.options.pedantic?(n.block=Ko.pedantic,n.inline=Ts.pedantic):this.options.gfm&&(n.block=Ko.gfm,this.options.breaks?n.inline=Ts.breaks:n.inline=Ts.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ko,inline:Ts}}static lex(t,n){return new Pi(n).lex(t)}static lexInline(t,n){return new Pi(n).inlineTokens(t)}lex(t){t=t.replace(yn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(yn.tabCharGlobal,"    ").replace(yn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Xo=class{constructor(e){Ft(this,"options");Ft(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(yn.notSpaceStart)?.[0],s=e.replace(yn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+sr(r)+'">'+(n?s:sr(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:sr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Gu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+sr(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Gu(e);if(s===null)return sr(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},Hi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fn=class Di{constructor(t){Ft(this,"options");Ft(this,"renderer");Ft(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Xo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hi}static parse(t,n){return new Di(n).parse(t)}static parseInline(t,n){return new Di(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Vo,Rs=(Vo=class{constructor(e){Ft(this,"options");Ft(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?qn.lex:qn.lexInline}provideParser(){return this.block?Fn.parse:Fn.parseInline}},Ft(Vo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ft(Vo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vo),Zg=class{constructor(...e){Ft(this,"defaults",Ni());Ft(this,"options",this.setOptions);Ft(this,"parse",this.parseMarkdown(!0));Ft(this,"parseInline",this.parseMarkdown(!1));Ft(this,"Parser",Fn);Ft(this,"Renderer",Xo);Ft(this,"TextRenderer",Hi);Ft(this,"Lexer",qn);Ft(this,"Tokenizer",Zo);Ft(this,"Hooks",Rs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Xo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Zo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Rs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];Rs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Rs.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return qn.lex(e,t??this.defaults)}parser(e,t){return Fn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?qn.lex:qn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Fn.parse:Fn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?qn.lex:qn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Fn.parse:Fn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+sr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new Zg;function It(e,t){return Er.parse(e,t)}It.options=It.setOptions=function(e){return Er.setOptions(e),It.defaults=Er.defaults,Yu(It.defaults),It};It.getDefaults=Ni;It.defaults=Tr;It.use=function(...e){return Er.use(...e),It.defaults=Er.defaults,Yu(It.defaults),It};It.walkTokens=function(e,t){return Er.walkTokens(e,t)};It.parseInline=Er.parseInline;It.Parser=Fn;It.parser=Fn.parse;It.Renderer=Xo;It.TextRenderer=Hi;It.Lexer=qn;It.lexer=qn.lex;It.Tokenizer=Zo;It.Hooks=Rs;It.parse=It;var Wk=It.options,zk=It.setOptions,Hk=It.use,Gk=It.walkTokens,Kk=It.parseInline;var Vk=Fn.parse,Yk=qn.lex;function ur(e){let t=It.parse(e),n=Bu.sanitize(t);return Uu(n)}function or(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Jr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var id={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Xg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Qg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Jg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function jn(e){return!!e&&typeof e=="object"}function Gi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ki(e,t){let n=Gi(e),r=Gi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function ld(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>jn(s)&&typeof s.text=="string"?s.text:"").join(""):jn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function eb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:id[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Gi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Ki(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Ki(jn(i)?i.old_string:"",jn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Vi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var tb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function cd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>jn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(tb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Yi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Qg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Jg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function nb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function rb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(jn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Yi(a.text));else if(a.type==="thinking"){let i=Vi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=eb(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ad(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(jn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=ld(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=cd(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ad([s],n):[s]}return[]}function ad(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function sb(e){let t=typeof e.command=="string"?e.command:"",n=ld(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:id.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function ob(e){if(e.type==="item.completed"&&jn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Yi(t.text)];if(t.type==="user_message"){let n=cd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Vi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[sb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ab(e){if(e.schema!=="codex-delegation-monitor-v1"||!jn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&jn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Yi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Vi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Xg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function ib(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function lb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return jn(t)?t:null}function ud(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=lb(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return nb(o,r);let a=o.schema==="codex-delegation-monitor-v1"?ab(o):ib(o)?ob(o):rb(o,n);return a.length>0&&(r.progress=null),a}}}function Zi(e){let t=[],n=ud(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var cb=5,ub=10,db=/Task\s+#(\d+)/,pb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,fb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function _b(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function mb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function gb(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=db.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function bb(e){if(e.tool==="Bash"){let t=e.command||"";return pb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":fb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function hb(e){let t=e.filter(s=>s.kind==="tool").slice(-ub),n=new Map;t.forEach((s,o)=>{let a=bb(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function yb(e){let t=mb(e);if(t)return{text:t,guess:!1};let n=gb(e);if(n)return{text:n,guess:!1};let r=hb(e);return r?{text:r,guess:!0}:null}function vb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function es(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,_={},h=!0,b=new Set,w=new Set,F=null,W=null,Y=!1,ae=!1,Z=!1,U=null,q=null;function H(){Y=!1,ae=!1,Z=!1,U=null,q=null}async function S(re){if(n){ae=!0,Z=!1,Ue();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(o!==re)return;!Q||typeof Q!="object"||Array.isArray(Q)?Z=!0:(U=Q,q=re)}catch{o===re&&(Z=!0)}finally{o===re&&(ae=!1,Ue())}}}function M(){if(Y=!Y,Y&&o&&q!==o){S(o);return}Ue()}function ne(){if(!Y)return"";let re=Jr({loading:ae,error:Z});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!U)return"";if(U.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=ea(U.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof U.task_prompt=="string"?or("\uACFC\uC5C5 (user)",U.task_prompt):""}
      ${typeof U.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",U.system_prompt):""}
    </div>`}function be(){if(!l||!r)return[];let re=r.get(l);return Zi(re?re.lines:[])}function Se(){if(!l||!r)return null;let re=r.get(l),Q=re?re.last_event_at:null;return typeof Q=="number"?Q:null}function ce(){return _.status==="running"}function _e(){if(ce()&&o){W||(W=setInterval(()=>Ue(),1e3));return}ke()}function ke(){W&&(clearInterval(W),W=null)}function Be(re){let Q=[],We=0;for(;We<re.length;){let{idx:ut,line:Ke}=re[We];if(Ke.kind==="tool"){let ve=We;for(;ve<re.length&&re[ve].line.kind==="tool"&&re[ve].line.tool===Ke.tool;)ve+=1;if(ve-We>=cb&&!w.has(ut)){Q.push({kind:"group",idx:ut,tool:Ke.tool||"",lines:re.slice(We,ve)}),We=ve;continue}}Q.push({kind:"line",idx:ut,line:Ke}),We+=1}return Q}function we(re){let Q=[],We=new Map;for(let ve=0;ve<re.length;ve+=1){let Ge=re[ve],dt=Ge.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let _t=We.get(dt);_t||(_t={kind:"subagent",idx:ve,launch_id:dt,agent_type:null,header:null,lines:[]},We.set(dt,_t),Q.push(_t)),_t.lines.push({idx:ve,line:Ge});continue}if(Ge.kind==="tool"&&Ge.tool==="Agent"&&typeof Ge.launch_id=="string"&&Ge.launch_id.length>0){let _t=X(Ge),gt=We.get(Ge.launch_id);if(gt){gt.header={idx:ve,line:Ge},gt.agent_type=_t;continue}let jt={kind:"subagent",idx:ve,launch_id:Ge.launch_id,agent_type:_t,header:{idx:ve,line:Ge},lines:[]};We.set(Ge.launch_id,jt),Q.push(jt);continue}Q.push({kind:"entry",idx:ve,line:Ge})}let ut=[],Ke=0;for(;Ke<Q.length;){if(Q[Ke].kind!=="entry"){ut.push(Q[Ke]),Ke+=1;continue}let ve=Ke;for(;ve<Q.length&&Q[ve].kind==="entry";)ve+=1;ut.push(...Be(Q.slice(Ke,ve))),Ke=ve}return ut}function X(re){let Q=re.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Te(re){for(let Q=re.length-1;Q>=0;Q-=1){let We=re[Q];if(We.kind==="result"||We.kind==="error")return null;if(We.kind==="tool"&&!Object.hasOwn(We,"result"))return We}return null}function De(re){for(let Q=re.length-1;Q>=0;Q-=1)if(re[Q].kind==="thinking")return re[Q];return null}function V(re,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ur(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let We=b.has(re);return c`<div
        class="sv__think${We?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ct(re)}
      >
        <span class="sv__think-line">💭 ${Is(Q.text)}</span>
        ${We?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let We=b.has(re);return c`<div
        class="sv__line sv__line--user${We?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ct(re)}
      >
        <span class="sv__user-line">▷ ${Is(Q.text)}</span>
        ${We?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let We=b.has(re),ut=Q.tool==="Bash"?_b(Q.command):0,Ke=Q.tool==="Bash"?ut>1?Is(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${We?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ct(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Ke?c`<span class="sv__tool-detail">${Ke}</span>`:""}
          ${ut>1?c`<span class="sv__tool-more">⋯ ${ut}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${We?c`<pre class="sv__tool-expand">${D(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ur(Q.text||"")}</div>`}function D(re){let Q=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)Q.push(re.command);else if(re.input!==void 0)try{Q.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&Q.push(`output:
${re.output}`),Q.join(`

`)}function me(){if(!o)return c``;let re=be(),Q=(a?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),We=_.session_id||"",ut=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Ke=ce(),ve=Ke?vb(Se(),Date.now()):"",Ge=Ke?Te(re):null,dt=Ke?De(re):null,_t=yb(re);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(a?_.role||"":o)}</span
        >
        ${_t?c`<span
              class="sv__stage${_t.guess?" sv__stage--guess":""}"
              title=${_t.text}
              >${_t.text}</span
            >`:""}
        ${Ke?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?c`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${We?c`<button
              type="button"
              class="sv__session"
              title=${We}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${We}`}
              @click=${()=>ft(We)}
            >
              ⧉ ${We.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>ft(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${M}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${ut}
          @click=${St}
        >
          <span class="sv__follow-full">⇣ ${ut}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>vt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":ne()}
      <div class="sv__body">
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:we(re).map(gt=>gt.kind==="subagent"?Ye(gt):gt.kind==="group"?xe(gt):V(gt.idx,gt.line))}
      </div>
      ${Ge||dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ge?c`<span class="sv__now-icon">${Ge.icon}</span>
                  <span class="sv__now-name">${Ge.tool}</span>
                  <span class="sv__now-detail"
                    >${Ge.tool==="Bash"?Is(Ge.command):Ge.path||Ge.command||""}</span
                  >`:""}
            ${dt?c`<span class="sv__now-think"
                  >💭 ${Is(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function xe(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ie(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ye(re){let Q=w.has(re.idx),We=re.header?re.header.line:null,ut=We?We.is_error===!0?"\u2717":typeof We.result=="string"?"\u2713":"\u27F3":"",Ke=We&&We.command?We.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ie(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${Ke?c`<span class="sv__sub-detail">${Ke}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${ut?c`<span class="sv__sub-state">${ut}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Be(re.lines).map(ve=>ve.kind==="group"?xe(ve):V(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function ie(re){w.add(re),Ue()}function Ue(){at(me(),e),_e(),h&&mt()}function mt(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function ct(re){b.has(re)?b.delete(re):b.add(re),Ue()}function St(){h=!h,Ue()}function ft(re){Tn(re).then(Q=>{Q?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function O(re){!o||!re||(_={..._,...re},Ue())}function oe(re){let Q=re.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&h&&(h=!1,Ue())}e.addEventListener("scroll",oe,!0);function Ie(re){let Q=re.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||vt()}let je=!1;function Xe(){je||(document.addEventListener("mousedown",Ie),je=!0)}function rt(){je&&(document.removeEventListener("mousedown",Ie),je=!1)}function yt(re){let Q=re&&re.attempt_id;if(!Q)return;let We=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,ut=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(We&&ut)return;let Ke=l;o=Q,a=We,i=ut,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Ke&&Ke!==l&&Promise.resolve(n("unsubscribe-session-log",{id:Ke})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,_=re.meta||{},d=re.hide_prompt===!0,h=!0,b.clear(),w.clear(),H(),!F&&r&&(F=r.subscribe(Ue)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Xe(),Ue()}function vt(){let re=l;rt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),w.clear(),H(),ke(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),at(c``,e),s&&s()}return{open:yt,updateMeta:O,close:vt,isOpen(){return o!==null},destroy(){ke(),rt(),F&&(F(),F=null),e.removeEventListener("scroll",oe,!0),o=null,a=null,i=null,l=null,u=null,d=!1,at(c``,e)}}}function wb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ta(t.spec_id),s=ta(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ta(e){return typeof e=="string"?e.trim():""}function kb(e){let t=wb(e);if(t.path)return t;let n=ta(dd(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function dd(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var $b=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ms(e){let t=kb(e),n=ta(dd(e).spec_review),r=$b.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function xb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Ab(e){let t=e&&e.metadata||{},n=Ms(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:xb(t)?null:"plan_pending"}),r}function pd(e,t){let n=Ab(e);return c`
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
  `}var Sb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Eb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Tb=/^\*\*결론\*\* — (.+)$/;function na(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Sb)return null;let n=Eb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Tb.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var fd=20;function _d(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Cb(e){return e.length>fd?`${e.slice(0,fd)}\u2026`:e}function Rb(e,t,n,r){let s=`${t.lane} ${Cb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${_d(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${ur(t.body)}
        </div>`:""}
  </div>`}function Ob(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${_d(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ur(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function md(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=na(typeof l.text=="string"?l.text:"");return u?Rb(l,u,t,s.has(l.id)):Ob(l)})}
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
  `}var{I:R$}=Oc;var gd=e=>e.strings===void 0;var Lb={},bd=(e,t=Lb)=>e._$AH=t;var Cr=Go(class extends Qr{constructor(e){if(super(e),e.type!==rr.PROPERTY&&e.type!==rr.ATTRIBUTE&&e.type!==rr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!gd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===On||t===Vt)return t;let n=e.element,r=e.name;if(e.type===rr.PROPERTY){if(t===n[r])return On}else if(e.type===rr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return On}else if(e.type===rr.ATTRIBUTE&&n.getAttribute(r)===t+"")return On;return bd(e),t}});var Ib=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var hd={orchestration_model:["fable"],impl_runtime:["claude"]},Mb={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function yd(e){return typeof e=="object"&&e!==null?e:null}function vd(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Pb(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Ib.includes(t))}function ts(e,t=e){let n=yd(e);if(!n)return null;let r=vd(n.rec_orchestration_model,hd.orchestration_model);if(r.length===0)return null;let s=vd(n.rec_impl_runtime,hd.impl_runtime),o={orchestration_model:r};s.length>0&&(o.impl_runtime=s);let a=yd(t)||{},i=Object.keys(o),l=0,u=0;for(let _ of i){let h=a[_];typeof h=="string"&&h.length>0&&(l+=1,h===o[_]&&(u+=1))}let d=l===0?"unapplied":u===i.length?"applied":"diverged";return{reasons:Pb(n.rec_reason),rec:o,state:d}}function ra(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=Mb[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}var sa=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Qi=[...sa.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],ar=["orchestration_model","orchestration_effort","orchestration_speed"],oa=[...sa,...ar],Db=Qi.filter(e=>oa.includes(e)),wd=["delegated","main"],aa=["inherit","claude","codex"],Ps=["default","fast"],Ds=["standard","fast_track"],Ns=["codex","opus","fable","self","skip"],ia=["codex","fable","skip"],la=["low","medium","high","xhigh"],Rn="auto";function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function kd(e){if(!Cn(e)||!Cn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))Cn(r)&&Cn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ns(e,t){let n=kd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Rn,...r.flatMap(([,s])=>s)]}function $d(e,t,n,r){if(!Cn(e)||!Cn(e.runners))return[Rn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Cn(a)||!Cn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Rn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Rn,...s]}function rs(e,t,n){return $d(e,t,n,(r,s)=>Cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ji(e,t,n){return $d(e,t,n,(r,s)=>Cn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function qs(e,t){let n=kd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function xd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!ns(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!rs(t,s,r.impl_model||Rn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Nb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Xi=[...Db,...ar],qb=[...oa,...Qi].filter((e,t,n)=>n.indexOf(e)===t&&!Xi.includes(e));function Ad(e,t){let n=Cn(e)?e:{},r=Cn(t)?t:{},s=[];for(let a of Xi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:Nb[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...qb,...Object.keys(r)])!Xi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function el(e,t,n,r,s,o){return jo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Sd(e,t){let n={};for(let r of Qi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Ed(e,t){let n={};for(let r of ar){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var tl=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ar]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ca={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function nl(e,t,n,r,s,o=null){let a=kn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Td(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of nl(e,t,n,r,s,o))a[i.source]+=1;return a}function Cd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Rd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var U$=[...sa,...ar];var Fb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],rl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Od={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},jb={pin:"pin",global:"global",base:"base"};function Bb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${jb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ub(e,t,n){switch(e){case"workflow_mode":return Ds;case"spec_review_model":case"impl_review_model":return Ns;case"plan_review_model":return ia;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return la;case"impl_dispatch":return wd;case"impl_runtime":return aa;case"impl_model":return ns(n,t.impl_runtime);case"impl_effort":return rs(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ps;case"orchestration_model":return qs(n,null);case"orchestration_effort":return rs(n,void 0,t.orchestration_model||Rn).filter(r=>r!==Rn);default:return[]}}function Wb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Bb(e.source)}
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
      >${ca[e.source]}</span
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
  </div>`}function Ld(e,t){let n=tl.flatMap(l=>l.keys),r=nl(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Td(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
      <span class="detail-effective__summary" title=${i}
        >${zb(o)}</span
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
          ${tl.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=jo({key:u.key,choices:Ub(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Wb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Cr(e.preset_id)}
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
  </details>`}function zb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Hb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Id(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},o=r.route||n.route||null,a=typeof n.pr_url=="string"?n.pr_url:"",i=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=Hb(r.exec_receipt),u=l?Jn(l):i,d=l?`${l.kind}:${l.actor}`:i.split("@")[0],_=qo(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,b=typeof h=="number"?`PR #${h}`:"PR",w=ts(n),F=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${a?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${a}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${_?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${_.kind}
            title=${_.title}
            >${_.label}</span
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
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${w.state}
            title=${ra(w)}
            ?disabled=${w.state==="applied"}
            @click=${()=>F?.(w.rec,w.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Gb(o).map(W=>Kb(W,n,s,{label:W.id==="pr"?b:W.label,href:W.id==="pr"?a:""}))}
    </div>
  </section>`}function Gb(e){let n=typeof e=="string"&&Object.hasOwn(rl,e)&&rl[e]||rl.spec_backed;return Fb.filter(r=>n.includes(r.id))}var ua={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Kb(e,t,n,r){let s=Vb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",_=u?ua.stale:i?ua.on:l?ua.current:ua.none,h=Yb(e,n),b=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,w=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,F=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${w}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${F}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${F}</span
  >`}function Vb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Yb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Od,n)?Od[n]:""}function da(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Md(e){return da(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Pd(e,t){let n=e&&e[t];if(!da(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Md),s=Md(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function qd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function pa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${qd(e)}${t}`}function ss(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${qd(e)}`}function Zb(e,t,n){if(n!==null){let s=e==="claude"?pa:ss,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ss({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Dd(e,t){if(!da(e)||e.state!=="usable"||!da(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Nd(e){let t=e.provider_key==="claude"?pa:ss,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Zb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Fd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Nd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Pd(t,"claude"),selected:s,workspace_default:Dd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Nd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Pd(t,"codex"),selected:o,workspace_default:Dd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var jd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Fs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fa(e){if(!Fs(e)||!Fs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Fs(n)&&Fs(n.models));return t.length>0?t:null}function Bn(e,t){let n=fa(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Bd(e,t){return Fs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ud(e,t){let n=fa(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Bd(r,r.models[t]);return[]}function Xb(e){let t=fa(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Bd(r,s))n.includes(o)||n.push(o);return n}function Qb(e,t){if(!t)return Xb(e);let r=fa(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Ud(e,o))s.includes(a)||s.push(a);return s}function Wd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Bn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Ud(t,r.impl_model):Qb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Jb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function eh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function _a(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Jb(s)}</span
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
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${ur(a)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){at(d(),e)}async function h(F,W={}){s=F,o="loading",a="",i=null,l="",_();let Y=W.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ae="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(F);try{let Z=await r(ae),U=await Z.json().catch(()=>({}));if(!Z.ok||!U||U.ok!==!0){if(U?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(U&&U.error||Z.status)+")",_();return}let q=eh(String(U.content||""));i=q.front,a=q.body,o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,at(c``,e)}function w(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:w}}var th=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Gd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ma=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],nh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function zd(e){return typeof e=="string"&&nh.has(e)}var rh=["running","done","failed","interrupted"],sh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function oh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ah(e){let t=fn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Gd}
          >부분 집계</span
        >`:""}`}function Hd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function il(e){if(typeof e=="number")return js(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?js(t):""}function ih(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function lh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ol(e){return e===null||typeof e=="string"&&e.trim().length>0}function al(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function ch(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ma.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ol(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ol(t.effort))||!(!("agent_type"in t)||ol(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!rh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!al(t.started_at)||!al(t.last_event_at)||!al(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function uh(e,t,n){let s=fn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${il(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${il(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function dh(e,t,n,r){let s=e.status==="running"?null:t,a=(s?fn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?js(e.last_event_at):s?il(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,ih(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=lh(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${sh[e.status]}</span
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
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function ph(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function fh(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=ch(d);!_||s.has(_.launch_id)||zd(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of ma){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=ma.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:_}of ma){for(let h of r.filter(b=>b.role===d&&b.provider===_)){let b=i.find(w=>w.receipt_id===h.launch_id)||null;b&&!ph(h,b)||(b&&l.add(b.receipt_id),u.push(dh(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!zd(h.agent_type)&&u.push(uh(d,_,h))}return u}function _h(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...th,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${oh(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Gd}</span>`:""}
  </div>`}var mh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function js(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function gh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var bh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function hh(e,t){let n=bh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${vi(e)}
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
      <span class="detail-session__time">${js(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Kd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,w)=>w.index-b.index)],i=a.map(b=>hh(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let F=typeof b.session_id=="string"&&b.session_id.length>0,W=u.has(b.attempt_id),Y=F&&!W,ae=F?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${ae}
      @click=${Z=>{Z.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let F=b.cause_detail,W=F&&typeof F.reason=="string"&&F.reason.length>0?typeof F.command=="string"&&F.command.length>0?`${F.reason} \xB7 ${F.command}`:F.reason:b.cause;return c`<div class="detail-session__cause" title=${W}>
      ${b.cause}
    </div>`},h=b=>{let w=Hd(xi(b));if(fn(w).length===0&&!Xr(b.usage))return"";let F=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${F?"true":"false"}
      title=${F?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${W=>{W.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${ah(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let w=xi(b),F=Hd(w),W=fn(F);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${mh[b.status||""]||"\xB7"}</span
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
            ${W.length>0?W.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${js(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${_(b)} ${gh(b)}
          ${l.has(b.attempt_id)&&b.usage?_h(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${fh(b,w,t)}
        </div>`})}
    </div>
  `}function Vd(e,t={}){return c`
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
          ${yh(e)}
        </div>`:""}
  `}function yh(e){let t=Jr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?or("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ea(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?or("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var vh=["open","in_progress","deferred","resolved","closed"],wh=[0,1,2,3,4];function Yd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},h="",b=!1,w=[],F=!1,W={},Y={claude:null,codex:null},ae=null,Z=null,U=0,q=!1,H=!1,S="",M="",ne="";function be(){q=!1,H=!1,S="",M="",ne=""}function Se(){Y={claude:null,codex:null},ae=null,Z=null,U+=1}async function ce(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function _e(y){try{let te=await fetch(y);if(!te.ok)return null;let j=await te.json();if(!j||typeof j!="object"||!Array.isArray(j.accounts))return null;let Ae=j.accounts.filter(nt=>nt!==null&&typeof nt=="object"&&!Array.isArray(nt));return{accounts:Ae,active:Ae.find(nt=>nt.active===!0)||null}}catch{return null}}async function ke(y){Z=y;let te=++U,[j,Ae,nt]=await Promise.all([_e("/api/claude-usage"),_e("/api/codex-usage"),ce()]);te!==U||y!==u||(Y={claude:j,codex:Ae},ae=nt,Le())}let Be=[],we=null,X=null,Te=!1,De="",V=!1,D=0,me=new Set;function xe(){Be=[],we=null,X=null,Te=!1,De="",V=!1,D+=1,me.clear()}async function Ye(y){if(!s)return;let te=++D;try{let j=await Promise.resolve(s("get-comments",{id:y}));if(te!==D||y!==u)return;Be=Array.isArray(j)?j:[],Te=!1}catch{if(te!==D||y!==u)return;Te=!0}Le()}function ie(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,X=y,Ye(u);return}y!==null&&y!==X&&(X=y,Ye(u))}function Ue(y){me.has(y)?me.delete(y):me.add(y),Le()}function mt(y){let te=De.trim().length===0;De=y,te!==(y.trim().length===0)&&Le()}async function ct(){let y=De.trim();if(!s||!u||y.length===0||V)return;let te=u;V=!0,Le();let j=!1;try{let Ae=await Promise.resolve(s("add-comment",{id:te,text:y}));Array.isArray(Ae)&&Ae.length>0&&(j=!0,te===u&&(Be=Ae,Te=!1,De="",X=Ae.length))}catch{j=!1}j||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),te===u&&(V=!1),Le()}let St={onToggle:Ue,onDraftInput:mt,onSubmit:ct},ft=t.mdViewer||null,O=null;ft||(O=document.createElement("div"),O.className="md-viewer-root",document.body.appendChild(O));let oe=ft||_a(O,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ie=document.createElement("div");Ie.className="session-log-root",document.body.appendChild(Ie);let je=es(Ie,{transport:s?(y,te)=>Promise.resolve(s(y,te)):void 0,sessionLogStore:l}),Xe=!1,rt=!1,yt=!1,vt=null,re=null,Q=0;function We(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function ut(){Xe=!1,rt=!1,yt=!1,vt=null,re=null,Q+=1}async function Ke(y){if(!s)return;let te=++Q;rt=!0,yt=!1,Le();try{let j=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(te!==Q)return;!j||typeof j!="object"||Array.isArray(j)?yt=!0:(vt=j,re=We(y))}catch{te===Q&&(yt=!0)}finally{te===Q&&(rt=!1,Le())}}let ve=[],Ge=null,dt=0;function _t(y,te){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${te}`}function gt(){ve=[],Ge=null,dt+=1}async function jt(y,te){if(!s)return;let j=++dt,Ae;try{Ae=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{Ae=null}j!==dt||te!==Ge||(ve=Ae&&Array.isArray(Ae.sessions)?Ae.sessions:[],Le())}function Zt(){if(!s||!u)return;let y=d&&d.metadata,te=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(te===null){gt();return}let j=_t(u,te);Ge!==j&&(ve=[],Ge=j,jt(u,j))}function Kt(){if(Xe=!Xe,Xe&&u&&re!==We(u)){vt=null,Ke(u);return}Le()}function Et(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(j=>j&&j.bead_id===u).sort((j,Ae)=>(Ae.started_at||0)-(j.started_at||0)).map(j=>({attempt_id:j.attempt_id,bead_id:j.bead_id,status:j.status,started_at:typeof j.started_at=="number"?j.started_at:null,runner:j.runner||null,model:j.model||null,effort:j.effort||j.observed_effort||null,speed:j.speed||null,session_id:j.session_id||null,resumed_from:j.resumed_from||null,continuation_mode:j.continuation_mode||null,dismissed_at:typeof j.dismissed_at=="number"?j.dismissed_at:null,cause:typeof j.cause=="string"?j.cause:null,cause_detail:j.cause_detail||null,exec_default_preset_id:typeof j.exec_default_preset_id=="string"?j.exec_default_preset_id:null,exec_default_preset_revision:typeof j.exec_default_preset_revision=="number"?j.exec_default_preset_revision:null,exec_values:j.exec_values&&typeof j.exec_values=="object"?j.exec_values:null,usage:j.usage||null,usage_legs:Array.isArray(j.usage_legs)?j.usage_legs:[],delegation_sessions:Array.isArray(j.delegation_sessions)?j.delegation_sessions:[]}))}function Ot(){if(!a||!u)return null;let y=a.get();return Ln(y&&y.attempts||{},u)}let Je=new Set;function qe(y){Je.has(y)?Je.delete(y):Je.add(y),Le()}function N(y){let te=a?a.get():null,j=te&&te.attempts?te.attempts[y]:null;je.open({attempt_id:y,meta:j?{runner:j.runner||void 0,model:j.model||void 0,effort:j.effort||void 0,status:j.status||void 0,session_id:j.session_id||void 0}:{}})}function ee(y,te){let j=a?a.get():null,Ae=j&&j.attempts?j.attempts[y]:null,tt=(Ae&&Array.isArray(Ae.delegation_sessions)?Ae.delegation_sessions:[]).find(it=>it&&typeof it=="object"&&it.launch_id===te);tt&&je.open({attempt_id:y,launch_id:te,meta:{runner:tt.provider==="claude"?"claude":"codex",role:tt.role,...typeof tt.agent_type=="string"?{agent_type:tt.agent_type}:{},model:tt.model,effort:tt.effort,session_id:tt.session_id,status:tt.status}})}async function ye(y){if(!s||!y)return;let te=await Vr();if(te===null)return;let j=()=>{let it=a?a.get():null;return it&&typeof it.revision=="number"?it.revision:0},Ae=async(it={},lt=j())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:lt,...te!==""?{instructions:te}:{},...it}),nt=it=>{it?.queue&&a?.set&&a.set(it.queue)},tt=await Ae();if(nt(tt),tt&&tt.conflict){let it=tt.queue&&typeof tt.queue.revision=="number"?tt.queue.revision:j();tt=await Ae({},it),nt(tt)}tt=await er(tt,(it,lt)=>Ae({continuation:it,decision_token:lt}),{onResult:nt,refresh:()=>Ae()}),tt&&tt.resumed===!1&&!tt.conflict&&tt.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${tt.reason}`,"error",2400)}function T(y){!y||!u||je.open(Yr(y,u,d&&d.status))}let G={onOpen:N,onOpenDelegation:ee,onResume:ye,onToggleUsage:qe,onOpenSessionRef:T,onCopyResumeCommand:At};function Me(){let y=a?a.get():null,te={...W};for(let j of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ae=y&&y[j];typeof Ae=="string"&&(te[j]=Ae)}return te}async function x(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));W=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{W={}}Le()}}function E(){let y=a?a.get():null;return y&&y.runner_catalog||null}function J(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function fe(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},j=kn({pin:{...y,..._},global:Me(),execution_defaults:J(),runner_catalog:E(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return Bn(E(),j)}function Ee(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function Fe(y){return y?.compatible===!1}function A(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function P(){let y=Ee(),te=y?.presets.find(j=>j.id===h);if(!(!s||!u||!y||!te||Fe(te)||b)){b=!0,w=[],Le();try{let j=await Promise.resolve(s("apply-impl-preset",Rd(u,te.id,y.revision)));if(j&&j.conflict){A(j),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ae=j&&Array.isArray(j.issue)?j.issue[0]:j?.issue;if(j&&j.applied&&Ae&&typeof Ae=="object"){d=Ae,w=Array.isArray(j.skipped_orchestration_keys)?j.skipped_orchestration_keys.filter(nt=>typeof nt=="string"):[];for(let nt of jd)delete _[nt];ue(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}j&&j.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(j){j&&typeof j=="object"&&j.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Le()}}}let $e=null;n&&n.subscribe&&($e=n.subscribe(()=>bt()));let Ze=null;a&&typeof a.subscribe=="function"&&(Ze=a.subscribe(()=>{u&&Le()}));let de=null;i&&typeof i.subscribe=="function"&&(de=i.subscribe(()=>{u&&Le()}));function st(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",st);function bt(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(j=>j&&j.id===u)||y[0]||d}ie(),Zt(),Le()}}function At(y){Tn(y).then(te=>{te?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Mt(y){y.preventDefault(),y.stopPropagation(),u&&At(u)}function Ht(y,te){y.preventDefault(),y.stopPropagation(),At(te)}function Lt(y,te,j){y.preventDefault(),y.stopPropagation(),oe.open(te,{missing_state:j})}async function mn(y,te){let j=Object.hasOwn(_,y),Ae=_[y];if(_[y]=te,Le(),!(!s||!u))try{let nt=await Promise.resolve(s("update-exec-settings",Cd(u,y,te.length===0?null:te))),tt=Array.isArray(nt)?nt[0]:nt;if(!tt||typeof tt!="object"||!tt.id)throw new Error("exec settings readback failed");d=tt,delete _[y],Le()}catch(nt){throw j?_[y]=Ae:delete _[y],Le(),ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),nt}}function Nt(y){y.catch(()=>{})}async function an(y,te){let j=d||{},Ae=j.metadata&&typeof j.metadata=="object"?j.metadata:{},nt={};for(let lt of["impl_runtime","impl_model","impl_effort"])nt[lt]=Object.hasOwn(_,lt)?_[lt]:typeof Ae[lt]=="string"?Ae[lt]:"";nt[y]=te;let tt=Wd(nt,E(),fe()),it={};for(let lt of["impl_runtime","impl_model","impl_effort"])it[lt]=_[lt],_[lt]=tt[lt]||"";if(Le(),!(!s||!u))return Promise.resolve(s("update-impl-target",{id:u,...tt,orchestration_runtime:fe()})).then(lt=>{let kt=Array.isArray(lt)?lt[0]:lt;if(!kt||typeof kt!="object"||!kt.id)throw new Error("implementation target readback failed");d=kt;for(let on of["impl_runtime","impl_model","impl_effort"])delete _[on];Le()}).catch(lt=>{for(let kt of["impl_runtime","impl_model","impl_effort"])it[kt]===void 0?delete _[kt]:_[kt]=it[kt];throw Le(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),lt})}async function ln(y,te){if(!(!y||typeof y!="object")&&!(te==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await mn("orchestration_model",y.orchestration_model)}catch{return}if(typeof y.impl_runtime=="string"&&y.impl_runtime.length>0)try{await an("impl_runtime",y.impl_runtime)}catch{}}}async function Xt(y,te,j){if(!s||!u)return!1;try{let Ae=await Promise.resolve(s(y,te)),nt=Array.isArray(Ae)?Ae[0]:Ae;return nt&&typeof nt=="object"&&nt.id?(d=nt,!0):(ue(j,"error"),!1)}catch{return ue(j,"error"),!1}}function cn(y){setTimeout(()=>{try{let te=e.querySelector(y);te&&typeof te.focus=="function"&&te.focus()}catch{}},0)}function Oe(){q=!0,S=d&&d.title||"",Le(),cn('.detail-edit__input[data-edit="title"]')}function Pe(y){S=y.target.value}function R(){q=!1,S="",Le()}function ge(){Xt("edit-text",{id:u,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(te=>{te&&(q=!1,S=""),Le()})}function Ne(){H=!0,M=d&&d.description||"",Le(),cn('.detail-edit__textarea[data-edit="description"]')}function xt(y){M=y.target.value}function Bt(){H=!1,M="",Le()}function Tt(){Xt("edit-text",{id:u,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(te=>{te&&(H=!1,M=""),Le()})}function Qt(y,te,j,Ae){if(y.key==="Escape"){y.stopPropagation(),j();return}y.key==="Enter"&&(!Ae||y.ctrlKey||y.metaKey)&&(y.preventDefault(),te())}function Ut(y){let te=y.target.value;Xt("update-status",{id:u,status:te},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Le())}function rn(y){let te=Number(y.target.value);Xt("update-priority",{id:u,priority:te},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Le())}function xn(y){ne=y.target.value}function qt(){let y=ne.trim();y.length!==0&&Xt("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(te=>{te&&(ne=""),Le()})}function An(y){if(y.key==="Escape"){y.stopPropagation(),ne="",Le();return}y.key==="Enter"&&(y.preventDefault(),qt())}function Sn(y){Xt("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Le())}let Zn={onCopyPath:Ht,onOpenDoc:Lt};function C(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function I(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ze(y){let j=(Array.isArray(y.dependencies)?y.dependencies:[]).map(Ae=>({id:C(Ae),icon:I(Ae)})).filter(Ae=>Ae.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${j.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${j.map(Ae=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Ae.id)}
                  >
                    ${Ae.icon?`${Ae.icon} `:""}${Ae.id}
                  </button>`:c`<span class="detail-dep"
                    >${Ae.icon?`${Ae.icon} `:""}${Ae.id}</span
                  >`)}
          </div>`}
    `}function Ve(y){let te=y.metadata||{},j=y.workflow||{},Ae=j.stages||{},nt=Ae.spec&&Ae.spec.stale,tt=Ae.impl&&Ae.impl.stale,it=j.quick_fix_review?.state==="stale",lt=Ae.plan||null,kt=j.route_source==="derived",on=j.route||te.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${kt?" detail-kv__v--derived":""}"
          title=${kt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${kt?"unset":on}</span
        >
      </div>
      ${j.route!=="quick_fix"||Object.hasOwn(te,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${te.spec_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${lt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${lt?.approval_receipt||"\uC5C6\uC74C"}${lt?.approval_state==="stale"?" \xB7 stale":lt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${j.route!=="quick_fix"||Object.hasOwn(te,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${te.impl_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${j.resolver.attempt} \xB7 ${j.resolver.prior_sha} \u2192 ${j.resolver.sha}`}
              >${`${j.resolver.prior_sha.slice(0,7)} \u2192 ${j.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${j.route==="quick_fix"||Object.hasOwn(te,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${te.quick_fix_review||"\uC5C6\uC74C"}${it?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${j.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${j.planned_execution.kind}</span>
            </div>
            ${j.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${j.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${j.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(j.exec_receipt)}</span
            >
          </div>`:""}
      ${j.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${j.impl_entry.actor}@${j.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${te.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${te.pr_url}</span>
          </div>`:""}
    `}let ot={route:["quick_fix","spec_backed","full_plan"]};async function wt(y,te){let j=te.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&j!=="full_plan"&&!window.confirm(`full_plan \u2192 ${j||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Le();return}await Xt("update-workflow-meta",{id:u,key:y,value:j},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Le()}function en(y){let te=y.metadata||{};return c` ${((Ae,nt)=>{let tt=ot[Ae],it=typeof te[Ae]=="string"?te[Ae]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ae}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ae}
          data-edit=${`wfmeta-${Ae}`}
          @change=${lt=>wt(Ae,lt)}
        >
          <option value="" ?selected=${!tt.includes(it)}>
            ${nt}
          </option>
          ${tt.map(lt=>c`<option value=${lt} ?selected=${it===lt}>${lt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function br(y,te){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${Pe}
            @keydown=${j=>Qt(j,ge,R,!1)}
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
              @click=${R}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${fn(te).map(j=>c`<span class="detail-usage-total" title=${j.tooltip}
              >${j.label}</span
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
    `}function Ir(y){let te=pn(y.created_at),j=pn(y.updated_at);return!te&&!j?c``:c`
      ${te?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${te}</span>
          </div>`:""}
      ${j?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${j}</span>
          </div>`:""}
    `}function m(y,te){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ut}
        >
          ${vh.map(j=>c`<option value=${j} ?selected=${j===y}>${j}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${rn}
        >
          ${wh.map(j=>c`<option value=${String(j)} ?selected=${j===te}>
                P${j}
              </option>`)}
        </select>
      </div>
    `}function k(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${H?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ne}
            >
              ✎
            </button>`}
      </div>
      ${H?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${M}
              @input=${xt}
              @keydown=${te=>Qt(te,Tt,Bt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Tt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Bt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function K(y){let te=typeof y.notes=="string"?y.notes:"";return te.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${te}</div>
    `}function pe(y){let te=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${te.map(j=>c`<span class="detail-label-chip"
              >${j}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${j}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+j}
                @click=${()=>Sn(j)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ne}
            @input=${xn}
            @keydown=${An}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${qt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ce(){if(!u)return c``;let y=d||{},te=String(y.id||u),j=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ae=Ot(),nt=y.status||"open",tt=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",it=y.description||"",lt={...y,metadata:{...y.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Mt}
            >
              ${te}
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
          ${br(j,Ae)}
          ${Id(lt,{onApplyRec:ln})}
          ${Ld({metadata:lt.metadata,workspace_values:Me(),catalog:E(),execution_defaults:J(),expanded:F,presets:Ee()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:w},{onToggle:kt=>{F=kt,Le()},onEdit:(kt,on)=>{if(kt==="impl_runtime"||kt==="impl_model"||kt==="impl_effort"){Nt(an(kt,on??""));return}Nt(mn(kt,on??""))},onPresetSelect:kt=>{h=kt,w=[],Le()},onPresetApply:()=>{P()}})}
          ${Fd({md:lt.metadata,catalog:Y,workspace_defaults:ae,handlers:{onExecChange:(kt,on)=>Nt(mn(kt,on))}})}
          ${m(nt,tt)} ${Ir(y)}
          ${k(it)}
          ${md(Be,St,{expanded:me,draft:De,sending:V,error:Te})}
          ${K(y)} ${pe(y)} ${ze(y)}
          ${Ve(y)} ${en(y)}
          ${pd(y,Zn)}
          ${Vd({expanded:Xe,loading:rt,error:yt,data:vt},{onToggle:Kt})}
          ${Kd(Et(),G,{total:Ae,expanded:Je},ve)}
        </div>
      </div>
    `}function Le(){at(Ce(),e)}return{load(y){y!==u&&(_={},h="",w=[],F=!1,be(),xe(),ut(),gt(),Se()),u=y,d=null,bt(),x(),Z!==y&&ke(y)},clear(){u=null,d=null,_={},h="",b=!1,w=[],F=!1,be(),xe(),ut(),gt(),Se(),oe.close(),je.close(),at(c``,e)},destroy(){$e&&($e(),$e=null),Ze&&(Ze(),Ze=null),de&&(de(),de=null),document.removeEventListener("keydown",st),ft||(oe.destroy(),O&&O.parentNode&&O.parentNode.removeChild(O)),je.destroy(),Ie.parentNode&&Ie.parentNode.removeChild(Ie),u=null,d=null,Se(),h="",b=!1,w=[],xe(),ut(),gt(),at(c``,e)}}}function Zd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}var kh="(max-width: 640px)";function ga(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(kh),n=!!t.matches;e(n);let r=s=>{let a=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);a!==n&&(n=a,e(a))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function $h(){return{lanes:{done:!0},areas:{}}}function Bs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function xh(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Bs(r.lanes),areas:Bs(r.areas)}:{lanes:Bs(r),areas:{}}}catch{return null}}function Xd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ba(e,t=$h()){let n={lanes:Bs(t.lanes),areas:Bs(t.areas)},r=xh(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let a=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:a}},Xd(e,s),a},toggleArea(o){let a=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:a}},Xd(e,s),a}}}var Vn=e=>e??Vt;function ha(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Jd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ya(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function va(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function wa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Ah(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ha(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ep(e,t){let n=Ah(e,t);return n?c`<button
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
            title=${n.deploy.at?pn(n.deploy.at):""}
            >${wa(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ws(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function os(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${pn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${pn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Sh(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function zs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ka(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Un(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Sh(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Us(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Eh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function tp(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Eh[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function $a(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Th(e){return c`<div
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
  </div>`}function xa(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${a?c`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?c`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${i.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
                data-root-dir=${i.root_dir||""}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?Th(s):""}
  </div>`}function Aa(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Ch(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function np(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Sa(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${ra(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function rp(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Rh(e){let t=Array.isArray(e.badges)?e.badges:[],n=fn(e.usage),r=tr(e.usage),s=wn(e.done_at);return c`<div
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
      ${rp(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${pn(e.done_at)}`}
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
            title=${Jd(e.work_kind)}
            >작업 ${Ws(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Wn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Rh(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=fn(e.usage),o=tr(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!i,u=l?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,F=e.lane==="done"?"":Aa(e.workflow),W=e.lane==="done"?"":np(e.from_id),Y=Ea(e.priority),ae=c`<span class="worker-mini__title">${e.title}</span>`,Z=rp(e.pr_url,e.pr_number),U=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=r.map(ie=>ie===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ie}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ie===e.completion_badge&&e.completion_title||""}
          >${ie}</span
        >`),H=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",S=s.length>0?s.map(ie=>c`<span class="worker-usage" title=${ie.tooltip}
              >${ie.label}</span
            >`):o?c`<span class="worker-usage" title=${ws(e.usage)}
            >${o}</span
          >`:"",M=a?c`<span
        class="merge-step${a.failed?" merge-step--failed":""}"
        style=${`--progress: ${a.percent}%`}
        >${a.label}${a.index>0?c`<span class="merge-step__n"
              >${a.index}/${a.total}</span
            >`:""}</span
      >`:"",ne=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",be=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Se=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ce=e.discard,_e=ce?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ce?.attempt_id||""}
          data-operation-id=${ce?.operation?.operation_id||""}
          data-discard-mode=${ce?.confirmation||"unmerged"}
          ?disabled=${ce?!ce.enabled:e.discard_enabled===!1}
          title=${ce?ce.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ce?.label||"\uD3D0\uAE30"}
        </button>`:"",ke=e.stale_work||null,Be=ke?c`${ke.can_resume||ke.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ke.action_id}
            ?disabled=${ke.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ke.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ke.action_id}
            ?disabled=${ke.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ke.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ke.action_id}
            ?disabled=${ke.locked}
          >
            다시 확인
          </button>`:""}`:"",we=ke?c`<div class="worker-mini__stale">
        <strong>${ke.title}</strong>
        <span>${ke.summary}</span>
        <span>${ke.cause}</span>
        ${ke.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",X=e.revise_action?c`<button
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
        </button>`:"",Te=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),De=Sa(e.rec),V=b||F||W||Te||De||S?c`<div class="worker-chips">
          ${b}${F}${W}${Te?$a(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${De}${S}
        </div>`:"",D=xa(e.dependency_chips),me=Us(e),xe=t.actions?t.actions:"",Ye=!!(a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ce?.operation||e.revise_action||ke);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${a?" worker-mini--merging":""}${a?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${w}${Y}${W}${Z}${ae}${xe}
          </div>
          <div class="worker-mini__row2">
            ${S}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Jd(e.work_kind)}
                  >작업 ${Ws(e.work_ms)}</span
                >`:""}${q}${M}
            <span class="worker-mini__actions"
              >${ne}${be}${Se}${_e}</span
            >
            ${os(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${_}${w}${Y}${Z}${U}${q}${h}${H}${xe}
            </div>
            <div class="worker-mini__body">${ae}${we}</div>
            ${D}${V}${Ye?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${ne}${be}${Se}${_e}${X}${Be}</span
                  >
                  ${Us(e)}
                </div>`:""}
            ${os(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${w}${Y}${ae}${Z}${U}${q}${h}${H}${M}${ne}${be}${Se}${_e}${xe}
            </div>
            ${D}${V}${me} ${os(e)}`}
  </div>`}function Oh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Lh={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function ll(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=Lh[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=xa(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=Aa(l),w=np(e.from_id),F=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Ea(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Sa(e.rec)}${Ch(l)}${n.dep_action===!0?c`<span class="worker-card__head-actions"
            ><button
              type="button"
              class="worker-card__dep mon-dep__btn"
              data-bead-id=${e.id}
              title="의존성"
              aria-label="의존성"
            >
              ⛓
            </button></span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Do(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${_}
    ${h||b||w||F?c`<div class="worker-chips">
          ${h}${b}${w}${$a(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Oh(t.lanes,e.id)}
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
    ${os(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Vn(e.id||void 0)}
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
                  </div>`:e.items.map(s=>e.lane==="candidate"?ll(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Wn(s))}
          </div>`}
  </section>`}function Qd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ta(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Qd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${Vn(r.drop)}
            data-root-dir=${Vn(r.root_dir)}
            data-lane-id=${Vn(r.lane_id)}
            data-lane-length=${Vn(r.lane_length)}
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
        ${Qd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>Ih(s))}
          </div>`}
    </section>
  </div>`}function Ih(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${Vn(t.drop)}
        data-root-dir=${Vn(t.root_dir)}
        data-lane-id=${Vn(t.lane_id)}
        data-lane-length=${Vn(t.lane_length)}
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
  </div>`}function Ca(e){return e.count?c`<section
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
  </section>`:""}function Ra(e){return e.replace(/\/+$/,"")}function Mh(e,t){let n=Ra(e),r=Ra(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Oa(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Mh(r,s))continue;let o=Ra(r),a=Ra(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function op(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=Oa(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var sp=["parallel","serial","candidate"];function Hs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function cl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=sp.includes(r.kind),l=sp.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=Ph(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Hs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Hs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ph(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var ap={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ip={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function lp(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ul(e){for(let t of lp(e))if(Object.hasOwn(ap,t))return ap[t];return null}function dl(e){let t=null;for(let n of lp(e))Object.hasOwn(ip,n)&&(t=ip[n]);return t}function La(e){let t=ul(e),n=dl(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function cp(e,t){let n=ul(e)??ul(t),r=dl(t)??dl(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var up=160;function Dh(e){return e.length>up?`${e.slice(0,up)}\u2026`:e}function Nh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${Dh(e.command)}</code>`:""}
  </div>`}function qh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Fh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function dp(e){let t=e.failure?La(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Nh(e.failure.cause_detail,e.failure.reason)}
          ${qh(e.failure.reason)}
          ${Us({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function jh(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Bh=new Set(["codex-runner"]);function Uh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Bh.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",_=r?wn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${wn(a,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
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
      </div>`:""}`}var Wh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function zh(e){if(!e)return"";let t=Wh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function pl(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(ke=>ke&&ke.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Fh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=hs(e),_=fn(e.usage),h=tr(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,F=e.landing,W=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,ae=jh(Y),Z=Y?xa(Y.dependency_chips):"",U=Uh(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),q=s&&e.workflow?.chips?.exec_receipt||null,H=Aa(e.workflow),S=Sa(e.rec),M=q?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(q)}`}
        >${`${q.kind}:${No(q)}`}</span
      >`:"",ne=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${vs(o)}</span
      >`:"",be=ae||H||ne||M||S?c`<div class="rtile__meta">
          ${ae}${H}${ne}${M}${S}
        </div>`:"",Se=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${w?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${w}</span
      >`:""}`,ce=s?"":os(e),_e=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${W?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Ea(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${Se}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${zh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${_e}
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
                ${i?c`<button
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
                ${_e}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${U}${e.rollup?Po(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:bi}):""}
    ${F?c`<div class="rtile__landing">
          <span
            class="merge-step${F.failed?" merge-step--failed":""}"
            style=${`--progress: ${F.percent}%`}
            >${F.label}${F.index>0?c`<span class="merge-step__n"
                  >${F.index}/${F.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Z}
    ${s?be:ae||H||u||S||_.length>0||h?c`<div class="rtile__meta">
            ${ae}${H}${$a(e.exec_chips)}${S}
            ${_.length>0?_.map(ke=>c`<span class="worker-usage" title=${ke.tooltip}
                      >${ke.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${ws(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Us(e)} ${ce}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function pp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>pl(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var fl=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function fp(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${ca[t.source]})`}function _l(e){return e.filter(t=>t!==null).join(`
`)}function Gs(e){if(typeof e!="object"||e===null)return null;let t=Sr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:_l(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function Rr(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),s=pr(e,"orchestration_speed"),o=fp([Bn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:_l(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",s)])}}function Hh(e,t){return e===null||e.value===null||fl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Gh(e){return e===null||fl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Kh(e){return e===null?null:e.value==="auto"?"auto":fl.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),s=pr(e,"impl_model"),o=pr(e,"impl_effort"),a=pr(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":fp([Hh(r,t??null),Gh(s),Kh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:_l(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",s),fr("impl_effort",o),fr("impl_speed",a)])}}var _n="",Vh=["impl_runtime","impl_model","impl_effort"],Yh=["claude_account","codex_account"],Zh=5,Ia=1;function $n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ma(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(N=>ue(N,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),b={claude:null,codex:null},w=!1,F=null,W={},Y="",ae="",Z=!1,U=!1,q=!1,H=null,S=!1;function M(){let N=t.queue?t.queue():null;return $n(N)?N:null}function ne(){let N=M();return N?N.runner_catalog:null}function be(){let N=M();return N&&$n(N.execution_defaults)?N.execution_defaults:null}function Se(){let N=t.implPresetStore?.get();return $n(N)&&Array.isArray(N.presets)?N:null}function ce(){return r===null?{}:{root_dir:r}}async function _e(N,ee){return S||!n?null:await n(N,ee)}function ke(N){N&&$n(N.queue)&&t.onQueueAdopt?.(N.queue)}async function Be(N,ee){let ye=M();if(!ye||S)return null;let T=await _e(N,{...ee,...ce(),expected_revision:ye.revision});if(ke(T),r!==null&&T&&T.conflict){let G=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:M()?.revision??ye.revision;T=await _e(N,{...ee,...ce(),expected_revision:G}),ke(T)}return T}async function we(){l=!0,qe();try{let N=await _e("get-session-defaults",{...ce()});o=$n(N?.values)?{...N.values}:{},a={...o},i=Array.isArray(N?.warnings)?N.warnings:[]}catch(N){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${N instanceof Error?N.message:String(N)}`)}finally{l=!1,qe()}}async function X(){let N=Sd(o,a);if(Object.keys(N).length!==0){try{let ee=await _e("set-session-defaults",{values:N,...ce()});o=$n(ee?.values)?{...ee.values}:{},a={...o},i=Array.isArray(ee?.warnings)?ee.warnings:[]}catch(ee){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}qe()}}function Te(N,ee){if(!$n(N))return;let ye=N.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:$n(N.values)?{...N.values}:{},warnings:Array.isArray(N.warnings)?N.warnings:[]},_={...u.values},ee&&(d={..._})}async function De(){try{Te(await _e("get-workspace-accounts",{...ce()}),!0)}catch(N){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${N instanceof Error?N.message:String(N)}`)}qe()}async function V(N){try{let ee=await fetch(N);if(!ee.ok)return null;let ye=await ee.json();if(!$n(ye)||!Array.isArray(ye.accounts))return null;let T=ye.accounts.filter(G=>$n(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:T,active:T.find(G=>G.active===!0)||null}}catch{return null}}async function D(){w=!0;let[N,ee]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage")]);S||(b={claude:N,codex:ee},qe())}function me(){let N={};for(let ee of Yh){let ye=Object.hasOwn(d,ee)?d[ee]:null,T=Object.hasOwn(_,ee)?_[ee]:null;ye!==T&&(N[ee]=ye)}return N}async function xe(){let N=me();if(Object.keys(N).length!==0){try{Te(await _e("set-workspace-accounts",{values:N,...ce()}),!1)}catch(ee){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}qe()}}function Ye(N,ee){ee===_n?delete d[N]:d[N]=ee,qe(),h=h.then(()=>xe())}function ie(N,ee){if(Vh.includes(N)){ct(N,ee);return}ee===_n?delete a[N]:a[N]=ee,qe(),X()}function Ue(){let N=Ot().orchestration_model,ee=kn({global:{orchestration_model:N??void 0},execution_defaults:be(),runner_catalog:ne()}).orchestration_model.value;return ee?Bn(ne(),ee):null}function mt(N,ee){typeof ee=="string"&&ee.length>0?a[N]=ee:delete a[N]}function ct(N,ee){let ye=ee===_n?void 0:ee,T=xd({impl_runtime:N==="impl_runtime"?ye:a.impl_runtime,impl_model:N==="impl_model"?ye:a.impl_model,impl_effort:N==="impl_effort"?ye:a.impl_effort},ne(),Ue());mt("impl_runtime",T.impl_runtime),mt("impl_model",T.impl_model),mt("impl_effort",T.impl_effort),qe(),X()}async function St(){let N=M();if(!N)return;let ee={orchestration_model:N.orchestration_model??null,orchestration_effort:N.orchestration_effort??null,orchestration_speed:N.orchestration_speed??null},ye=Ed(ee,{...ee,...W});if(Object.keys(ye).length!==0){try{let T=await Be("worker-queue-set-orchestration-defaults",{values:ye});if(T&&T.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(T){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}qe()}}function ft(N,ee){W[N]=ee===_n?null:ee,qe(),St()}function O(N){if(F=N,!N){qe();return}let ee=ne(),ye=Ot(),T=ye.orchestration_model;T&&!qs(ee,N).includes(T)&&(W.orchestration_model=null,T=null);let G=ye.orchestration_effort;G&&!Ji(ee,N,T||Rn).includes(G)&&(W.orchestration_effort=null),qe(),St()}async function oe(N){if(!(!M()||N<Ia)){try{await Be("worker-queue-set-slots",{slots:N})}catch(ee){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}qe()}}async function Ie(N){if(!(!M()||N<Ia||N>Zh)){try{await Be("worker-queue-set-serial-lane-count",{count:N})}catch(ee){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}qe()}}async function je(N,ee){let ye=N==="auto_advance"?"worker-automation-toggle":N==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Be(ye,{on:ee})}catch(T){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}qe()}function Xe(){let N={},ee=Ot();for(let ye of oa){let T=ar.includes(ye)?ee[ye]:a[ye];typeof T=="string"&&T.length>0&&(N[ye]=T)}return N}async function rt(){let N=Se();if(!N)return;let ee=Xe();if(Object.keys(ee).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(N.presets||[]).find(G=>G.id===Y),T=ae.trim()||(ye?ye.name:"");if(!T){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=ye?await _e("impl-preset-update",{expected_revision:N.revision,id:ye.id,name:T,settings:ee}):await _e("impl-preset-create",{expected_revision:N.revision,name:T,settings:ee});if(G&&G.applied){if(ae="",!ye&&Array.isArray(G.presets)){let Me=G.presets.find(x=>x.name===T);Y=Me?Me.id:Y}qe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),qe()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function yt(){let N=Se();if(!(!N||Y.length===0))try{let ee=await _e("impl-preset-delete",{expected_revision:N.revision,id:Y});ee&&ee.applied?(Y="",qe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),qe())}catch(ee){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}}function vt(N){o=$n(N.values)?{...N.values}:{},a={...o},i=Array.isArray(N.warnings)?N.warnings:[],$n(N.queue)&&(t.onQueueAdopt?.(N.queue),W={})}async function re(){let N=Se(),ee=M();if(!N||!ee||Y.length===0)return;let ye=T=>({preset_id:Y,expected_revision:N.revision,expected_queue_revision:T,...ce()});try{let T=await _e("apply-impl-preset-global",ye(ee.revision));if(T&&T.applied&&vt(T),r!==null&&T&&T.queue_applied===!1){let G=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:M()?.revision??ee.revision;T=await _e("apply-impl-preset-global",ye(G)),T&&T.applied&&vt(T)}T&&T.applied?T.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}qe()}async function Q(){U=!0,q=!1,qe();try{let N=await _e("get-worker-system-prompt",{});!N||typeof N!="object"||Array.isArray(N)?q=!0:H=N}catch{q=!0}finally{U=!1,qe()}}function We(){if(Z=!Z,Z&&!H){Q();return}qe()}function ut(){let N=Jr({loading:U,error:q});if(N)return N;if(!H)return"";let ee=Array.isArray(H.variants)?H.variants:[];return c`<div class="settings-dialog__sp-body">
      ${H.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ee.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${or(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function Ke(){return c`<section
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
        aria-expanded=${Z?"true":"false"}
        @click=${We}
      >
        ${Z?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Z?ut():""}
    </section>`}function ve(N,ee,ye,T,G,Me,x){let E=G[N]??_n,J=el(N,ye,G,be(),ne(),x),fe=J.options.find(Fe=>Fe.value===E),Ee=E===_n?J.full_value:fe?.full_value;return c`<select
        class=${E===_n?"settings-dialog__unset":""}
        data-key=${N}
        aria-label=${ee}
        title=${Ee||""}
        ?disabled=${Me===!0||J.disabled}
        .value=${Cr(String(E))}
        @change=${Fe=>T(N,String(Fe.target.value))}
      >
        <option value=${_n} ?selected=${E===_n}>
          ${J.unset_label}
        </option>
        ${J.options.map(Fe=>c`<option
              value=${Fe.value}
              title=${Fe.full_value||""}
              ?selected=${Fe.value===E}
            >
              ${Fe.label}
            </option>`)}
      </select>
      ${E===_n?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ge(N,ee,ye,T,G,Me=!1,x){return c`<div
      class=${`settings-dialog__row${Me?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        ${ve(N,ee,ye,T,G,Me,x)}
      </span>
    </div>`}function dt(N,ee){let ye=ee?ee.active:null;return $n(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${N==="claude"?ye.email:ss({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function _t(N,ee,ye){let T=b[ye],G=Object.hasOwn(d,N)?d[N]:_n,Me=ye==="claude"?pa:ss,x=!!T?.accounts.some(E=>E.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ee}
          data-account-key=${N}
          @change=${E=>Ye(N,String(E.target.value))}
        >
          <option value=${_n} ?selected=${G.length===0}>
            ${dt(ye,T)}
          </option>
          ${G.length>0&&!x?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(E=>c`<option value=${E.key} ?selected=${E.key===G}>
                ${Me(E)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function gt(){let N=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${N} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${N}`:null}function jt(N,ee,ye,T,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ee}-on)`}
        ></i>
        ${N}
      </span>
      <span class="settings-dialog__controls">
        ${ve(ye,`${N} \uBAA8\uB378`,T,ie,a,!1)}
        ${ve(G,`${N} effort`,la,ie,a,!1)}
      </span>
    </div>`}function Zt(N,ee,ye,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${N}
          aria-pressed=${T?"true":"false"}
          aria-label=${ee}
          @click=${()=>je(N,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function Kt(N,ee,ye,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${N}>
          <button
            type="button"
            aria-label=${`${ee} \uAC10\uC18C`}
            @click=${()=>T(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${ee} \uC99D\uAC00`}
            @click=${()=>T(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Et(N){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${N.rows.length>0?`\uBCC0\uACBD ${N.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${N.rows.map(ee=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ee.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ee.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ee.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ee.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${N.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${N.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ot(){let N=M(),ee={};for(let ye of ar)ee[ye]=Object.prototype.hasOwnProperty.call(W,ye)?W[ye]:N&&typeof N[ye]=="string"?N[ye]:null;return ee}function Je(){let N=ne(),ee=a.impl_runtime,ye=a.impl_model,T=Se(),G=M(),Me=Ot(),x=qs(N,F),E=ns(N,void 0).filter(de=>de!==Rn),J=Ji(N,F,Me.orchestration_model||Rn).filter(de=>de!==Rn),fe=Y?(T?.presets||[]).find(de=>de.id===Y):null,Ee=fe?Ad(Xe(),$n(fe.settings)?fe.settings:{}):null,Fe=G&&typeof G.slots=="number"?G.slots:Ia+1,A=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Ia,P=be()?.supported===!0,$e=gt(),Ze=el("workflow_mode",Ds,a,be(),N);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${$e?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${$e}
          </div>`:""}
      ${P?"":c`<div
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
                .value=${Cr(Y)}
                @change=${de=>{Y=String(de.target.value),qe()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(de=>c`<option
                      value=${de.id}
                      ?selected=${de.id===Y}
                    >
                      ${de.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ee||Ee.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Cr(ae)}
                @input=${de=>{ae=String(de.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${rt}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${yt}
              >
                삭제
              </button>
            </div>
            ${Ee?Et(Ee):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Cr(F||_n)}
                    @change=${de=>{let st=String(de.target.value);O(st===_n?null:st)}}
                  >
                    <option value=${_n} ?selected=${!F}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${F==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${F==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ge("orchestration_model","\uBAA8\uB378",x,ft,Me)}
              ${Ge("orchestration_effort","effort",J,ft,Me)}
              ${Ge("orchestration_speed","\uC18D\uB3C4",Ps,ft,Me)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${_t("claude_account","Claude","claude")}
              ${_t("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${_n}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ie("workflow_mode",_n)}
                    >
                      ${Ze.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ds.map(de=>c`<button
                          type="button"
                          data-mode=${de}
                          aria-pressed=${String(a.workflow_mode===de)}
                          @click=${()=>ie("workflow_mode",de)}
                        >
                          ${de}
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
              ${jt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ns,"spec_review_effort")}
              ${jt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ia,"plan_review_effort")}
              ${jt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ns,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ge("impl_runtime","\uC704\uC784 \uB300\uC0C1",aa,ie,a)}
              ${Ge("impl_model","\uBAA8\uB378",ns(N,ee),ie,a)}
              ${Ge("impl_effort","effort",rs(N,ee,ye),ie,a)}
              ${Ge("impl_speed","\uC18D\uB3C4",Ps,ie,a)}
              ${Ge("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",E,ie,a,!1,{...a,...Me})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Zt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${Zt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${Zt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${Kt("slots","\uB3D9\uC2DC \uC2E4\uD589",Fe,de=>oe(de))}
              ${Kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",A,de=>Ie(de))}
            </div>
            ${Ke()}
          `}
    `}function qe(){S||at(Je(),e)}return{load(){W={};let N=[we(),De()];return w||N.push(D()),Promise.all(N).then(()=>{})},render:qe,sessionDraft:()=>({...a}),destroy(){S=!0,at(c``,e)}}}function Pa(e){return c`<svg
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
  </svg>`}function _p(){return Pa(gs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function mp(){return Pa(gs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function gp(){return Pa(gs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function bp(){return Pa(gs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function hp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function yp(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return fn(Uo(t));let n={};for(let i of Kn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Kn){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?tr(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ml(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Xh(e,t){if(!zn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Qh(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=kn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Bn(e.runner_catalog,n.orchestration_model.value??""),s=Rr(n,e.runner_catalog),o=_r(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function vp(e,t){let n=t.notify||(V=>ue(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function b(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(D=>zn(D)):[]}function w(V){return b().find(D=>D.root_dir===V)||null}function F(V){return Xh(w(V),h.get(V))}function W(){for(let V of b()){let D=h.get(V.root_dir);D&&typeof D.revision=="number"&&typeof V.revision=="number"&&V.revision>=D.revision&&h.delete(V.root_dir)}}async function Y(V,D,me){let xe=t.transport,Ye=F(D);if(!(!xe||!zn(Ye))){try{let ie=await xe(V,{...me,root_dir:D,expected_revision:Ye.revision});if(zn(ie?.queue)&&h.set(D,ie.queue),ie&&ie.conflict){let Ue=zn(ie.queue)&&typeof ie.queue.revision=="number"?ie.queue.revision:F(D)?.revision;ie=await xe(V,{...me,root_dir:D,expected_revision:Ue}),zn(ie?.queue)&&h.set(D,ie.queue)}}catch(ie){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}X()}}function ae(V){u!==V&&(u=V,t.onFocusChange?.(u),X())}function Z(V){ae(u===V?null:V)}function U(V){if(d===V){H();return}q(),d=V;let D=w(V);a.textContent=`${D?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Ma(l,{root_dir:V,queue:()=>F(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:me=>{h.set(V,me),X()}}),_.load(),X()}function q(){_?.destroy(),_=null}function H(V){q(),d=null,s.hidden=!0,a.textContent="",V!==!0&&X()}let S=()=>H();i.addEventListener("click",S);function M(V){V.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",M);function ne(V,D){let me=Math.max(D,V,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${D}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:me},(xe,Ye)=>Ye<V?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function be(V){let D=V.auto_advance===!0,me=V.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${D?" is-on":""}`}
        data-act="auto"
        aria-pressed=${D?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${D?mp():_p()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${me?" is-on":""}`}
        data-act="merge"
        aria-pressed=${me?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${me?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${gp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${bp()}
      </button>`}function Se(V){let D=Qh(V);return D?c`<div class="mon2-deck__chips">
      ${D.orchestration?c`<span class="mon2-deck__chip" title=${D.orchestration.title}
            >오케 ${D.orchestration.text}</span
          >`:""}
      ${D.worker?c`<span class="mon2-deck__chip" title=${D.worker.title}
            >워커 ${D.worker.text}</span
          >`:""}
    </div>`:""}function ce(V){let D=[];for(let[me,xe]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ye=ml(V,me);Ye>0&&D.push(`${xe} ${Ye}`)}return D.join(" \xB7 ")}function _e(V){let D=ml(V,"running"),me=typeof V.slots=="number"?V.slots:1;return c`<div
      class=${`mon2-deck__tile${u===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${u===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${me}\uAC1C \uC911 ${D}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${D}/${me}</span>
          ${ne(D,me)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${V.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${be(V)}</div>
        <span class="mon2-deck__counts">${ce(V)}</span>
        ${Se(V)}
      </div>
    </div>`}function ke(V){let D=t.doneItems?t.doneItems():[],me=t.rangeLabel?t.rangeLabel():"",xe=yp(Array.isArray(D)?D:[]),Ye=ie=>V.reduce((Ue,mt)=>Ue+ml(mt,ie),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${me}`}
        >실행 ${Ye("running")} · 대기 ${Ye("queue")} · PR
        ${Ye("pr_wait")}${Ye("session_active")>0?` \xB7 \uC138\uC158 ${Ye("session_active")}`:""}
        · ${me} 완료
        ${Array.isArray(D)?D.length:0}</span
      >
      ${xe===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof xe=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${hp(me)}
                  >${xe}</span
                >`:xe.map(ie=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ie.provider}
                      title=${ie.tooltip}
                      >${ie.label}</span
                    >`)}
          </span>`}
    </div>`}function Be(){let V=b();return V.length===0?"":c`${ke(V)}
      <div class="mon2-deck__strip">
        ${V.map(D=>_e(D))}
      </div>`}function we(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function X(){W(),we(),d!==null&&!w(d)&&H(!0),at(Be(),r),_?.render()}function Te(V){let D=V.target;if(!D||typeof D.closest!="function")return;let me=D.closest("[data-root-dir]");if(!me)return;let xe=me.getAttribute("data-root-dir")||"",Ye=D.closest("[data-act]")?.getAttribute("data-act");if(Ye==="worker"){t.gotoWorkerTab?.(xe);return}if(Ye==="auto"){Y("worker-automation-toggle",xe,{on:F(xe)?.auto_advance!==!0});return}if(Ye==="merge"){Y("worker-merge-auto-toggle",xe,{on:F(xe)?.auto_merge!==!0});return}if(Ye==="gear"){U(xe);return}Z(xe)}function De(V){if(V.key!=="Enter"&&V.key!==" ")return;let D=V.target;if(!D||typeof D.closest!="function")return;let me=D.closest('[data-root-dir][role="button"]');!me||me!==D||(V.preventDefault(),Z(me.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Te),r.addEventListener("keydown",De),{render:X,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",Te),r.removeEventListener("keydown",De),i.removeEventListener("click",S),q(),at(c``,r),e.replaceChildren()}}}function wp(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let _=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));_&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Jh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Na="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",ey="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ty="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",as="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ks(e,t){return`${e}\0${t}`}function ny(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function ry(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Zs(e,t){let n=e.entries,r=n.map(_=>_.bead_id),s=ny(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[_,h]of s)for(let b of h)o.push({blocker:b,blockee:_});let a=ry(e,t),i=new Map(r.map((_,h)=>[_,h])),l=r.slice(0,a).filter(_=>s.get(_).some(h=>Number(i.get(h))>Number(i.get(_)))),u=wp(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,a),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function kp(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Zs(n,t)}function sy(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function oy(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ay(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function gl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function iy(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Ks(a,l));let r=new Map,s=new Map;for(let a of e){let i=Ks(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ks(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ly(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function cy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Da(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function bl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Xs(e){let t=ay(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=oy(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,_)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(gl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(Ks(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=o(u);h!==null&&(t.set(u,_.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Ks(u,d))}}function Qs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=iy(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:sy(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function $p(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Vs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function xp(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function Ap(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(Da(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ys(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function qa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function hl(e,t,n){let r=Xs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Jh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ey};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${bl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:as}}if(e.kind==="chain"&&d===void 0)return{refused:as};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(Z=>Z.bead_id===e.bead_id);if(w<0)return;let F=w>0?d.entries[w-1]:null,W=w+1<d.entries.length?d.entries[w+1]:null,Y=Vs(d,w),ae=W!==null&&Vs(d,w+1);Y&&F!==null&&r.removeDep(e.bead_id,F.bead_id),ae&&W!==null&&r.removeDep(W.bead_id,e.bead_id),(Y||ae)&&F!==null&&W!==null&&r.addDep(W.bead_id,F.bead_id,u)},h=(w,F)=>{let W=n.cross_lanes.get(w),Y=W.entries.findIndex(be=>be.bead_id===e.bead_id),ae=W.entries.filter(be=>be.bead_id!==e.bead_id),Z=Math.max(0,Math.min(ae.length,Y>=0&&F>Y?F-1:F)),U=-1;if(ae.forEach((be,Se)=>{n.fixed_members.has(be.bead_id)&&(U=Se)}),Z<=U){r.state.refusal=ty;return}let q=Y>=0?W.entries[Y]:d?.entries.find(be=>be.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Zs({status:W.status,entries:[...ae.slice(0,Z),q,...ae.slice(Z)]},n);let H=i.entries;if(qa(H,W.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:w,entries:Ys(H)}}),W.status!=="confirmed")return;let S=H.findIndex(be=>be.bead_id===e.bead_id),M=S>0?H[S-1].bead_id:null,ne=S+1<H.length?H[S+1].bead_id:null;if(M===null){ne!==null&&r.addDep(ne,e.bead_id,w);return}if(r.addDep(e.bead_id,M,w),ne!==null&&(r.graph.get(ne)||[]).includes(M)){let be=W.entries.findIndex(Se=>Se.bead_id===ne);(r.laneCreated(ne,M)||be>0&&W.entries[be-1].bead_id===M&&Vs(W,be))&&r.removeDep(ne,M),r.addDep(ne,e.bead_id,w)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...xp(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ys(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=ly(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Da(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let F=n.parallel_rows,W=F[Math.max(0,Math.min(F.length,t.marker_index))];if(!(!!W&&W.bead_id===e.bead_id)&&cy(n,e.root_dir)&&b!==void 0){let ae=b>w?w:w-1;ae>=0&&ae!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&o.push(Da(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let w=b>t.index?t.index:t.index-1;w>=0&&w!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else o.push(Da(e.bead_id,e.root_dir,t.index,t.lane_id));return Qs(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function Sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Zs(n,t);if(r.held)return{refused:Na};let s=r.entries,o=Xs(t),a=[];$p(o,s,e),o.state.refusal===null&&Ap(o,t,s,a);let i=qa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ys(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Qs(o,t,i,a,{lane_id:e,correction:r})}function Ep(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Zs(n,t),s=r.entries,o=Xs(t),a=[];$p(o,s,e),o.state.refusal===null&&Ap(o,t,s,a);let i=qa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ys(s)}}];return Qs(o,t,i,a,{lane_id:e,correction:r})}function Tp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Zs(n,t),s=r.entries;return Qs(Xs(t),t,qa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ys(s)}}],[],{lane_id:e,correction:r})}function Cp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Xs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Vs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Qs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:xp(t,n,e,n.entries)})}function Rp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Vs(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${bl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Op(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Lp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function yl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${bl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var uy="\uC0AC\uC774\uD074";function Ip(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=gl(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:uy}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function Mp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Pp={running:3,paused:2,failed:1};function Or(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Dp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Np(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Or(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Or(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Pp[u.run_state],_=Pp[i];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var qp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Js=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Fa(e,t){let n=qp.find(s=>s.step===e);if(!n)return null;let r=qp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Fp(e){let t=Js.findIndex(n=>n.step===e);return Js.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Lr(e){let t=Js.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function dy(e){let t=Js.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Js.length}}function ja(e){let t=dy(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var wl=new Set(["queued","running","retry_pending","repairing"]),jp=new Set(["failed","succeeded"]),py={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},eo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},fy={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:eo.base_containment,child_sweep:eo.child_sweep,branch_cleanup:eo.branch_cleanup,parent_close:eo.parent_close};function _y(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function my(e,t,n){return!["verify","deploy"].includes(e.kind)||![...wl,...jp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function gy(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function vl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=py[s];if(!o)return null;let a=Fa(n,`${r} ${o}`);return a?{...a,active:wl.has(s),failed:s==="failed"}:null}function by(e){return!e||typeof e!="object"?null:fy[e.step]||null}function to(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=by(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=_y(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&my(w,t,i)).sort(gy):[],u=a?l:[],d=u.find(w=>wl.has(w.state));if(d)return vl(d);if(s)return s.step==="repo_operations"&&l[0]?vl(l[0],!0):null;let _=u.find(w=>jp.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return vl(_);if(r){let w=Fa(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?eo[e.cleanup_cursor]:null;if(!h)return null;let b=Fa(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Ba(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var hy="\uBBF8\uC801\uC7AC";function kl(e,t){let n=Io(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function Bp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=kl(o,{id:l,location_label:s.get(l)||hy}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function $l(e,t){return`${e}\0${t}`}function Up(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function xl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function no(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Wp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${no(s)})`,location_label:no(s),scope:null,same_lane_ahead:!1};let a=xl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function zp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=$l(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=$l(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let w of h){let F=r.get(w);F&&F!==u&&!b.includes(F)&&b.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function Hp(e,t){return $l(e,t)}var Gp=1,ro=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Sl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],is={show_blocked:!0,spec:"all"},Kp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function yy(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Or(r)||(n=typeof r.status=="string"?r.status:null);return n}function vy(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Or(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function wy(e,t){let{winners:n,resumed_from_ids:r}=Np(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Ln(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Vp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function zt(e){return e&&typeof e=="object"?e:{}}function ky(e,t,n){let r=zt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>kn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Yp(Rr(l,o),Rr(u,o)),_=Yp(_r(l,null),_r(u,null));return d||_?{orchestration:d,worker:_}:null}function Yp(e,t){return!e||t&&t.text===e.text?null:e}function Zp(e,t){let n=xl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function $y(e,t,n){let r=t.get(e);if(!r)return Zp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return no(r)}function xy(e,t,n,r){let s=t.get(e);if(!s)return{label:Zp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":no(s),title:""}}function Ay(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Sy(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Ey(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let _=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,ae)=>{let Z=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(Z.length===0)return;let U=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",q=n.get(Z),H=q?q.state:void 0,S=H==="running"||H==="pr_wait"||H==="done",M=!q||H==="runnable",ne=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,be=xy(Z,n,r,t),Se=b.length>0?b[b.length-1].id:null,ce=_==="confirmed"&&Se!==null&&!(t.get(Z)||[]).includes(Se);b.push({id:Z,title:s.get(Z)||Z,root_dir:q?q.root_dir:U,workspace_name:q?q.workspace_name:o.get(U)||"",seq:ae+1,location_label:be.label,location_title:be.title,draggable:!S,fixed:S,done:H==="done",unplaced:M,mismatch:ce,...ne!==null?{queue_index:ne}:{}})}),b.forEach((Y,ae)=>{Y.seq=ae+1});let w=b.length>0&&b.every(Y=>Y.done),F=b.filter(Y=>!Y.fixed&&a.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),W=Sy(d,_,b,w,F,a);i.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:w,can_confirm:_==="draft"&&b.length>=2,has_mismatch:_==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:F,...W})}),i}function Ty(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Cy(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:_,state:h}=Ty(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:_})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,_=a.get(d);_?_.push(l):a.set(d,[l])}let i=(l,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:$y(_.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let _=Oa(l[u].scope,l[d].scope);_.length!==0&&(i(l[u],l[d],_),i(l[d],l[u],_))}}function Al(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function El(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...is,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&ro.some(O=>O.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let O of s)O&&typeof O.root_dir=="string"&&u.set(O.root_dir,O);let d=new Map;for(let O of s)O&&typeof O.root_dir=="string"&&d.set(O.root_dir,O.name||O.root_dir);for(let O of r)O&&typeof O.root_dir=="string"&&d.set(O.root_dir,O.name||O.root_dir);let _=[],h=[],b=[],w=[],F=[],W=[],Y=new Map,ae=new Map,Z=new Map,U=new Map,q=new Map,H=new Map,S=new Map,M=new Set,ne=new Map,be=new Map,Se=new Map;for(let O of r){if(!O||typeof O.root_dir!="string")continue;let oe=O.root_dir,Ie=O.name||oe,je=u.get(oe),Xe=je&&typeof je.revision=="number"?je.revision:typeof O.revision=="number"?O.revision:0,rt=zt(O.attempts),yt=zt(O.bead_titles);for(let[A,P]of Object.entries(yt))typeof P=="string"&&P.length>0&&Se.set(A,P);let vt=zt(O.bead_times),re=zt(O.pr_observations),Q=zt(O.admission),We=zt(O.revise_parked),ut=zt(O.merge_queue_state),Ke=zt(O.cleanup_failed),ve=zt(O.discard_operations),Ge=zt(O.bead_blocked_by);Object.hasOwn(O,"bead_scope")&&ne.set(oe,zt(O.bead_scope));let dt=zt(O.bead_workflow),_t=zt(O.pr_activity),gt=Array.isArray(O.repo_operations)?O.repo_operations:[],jt=Array.isArray(O.merge_queue)?O.merge_queue:[],Zt=new Set(jt.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Kt=new Map(jt.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),Et=Array.isArray(O.queue)?O.queue:[];for(let A of[...Et,...Array.isArray(O.pr_wait)?O.pr_wait:[]])A&&typeof A.bead_id=="string"&&typeof A.armed_by_lane=="string"&&A.armed_by_lane.length>0&&H.set(A.bead_id,A.armed_by_lane);for(let A of Array.isArray(O.disarmed_on_load)?O.disarmed_on_load:[])typeof A=="string"&&A.length>0&&M.add(A);let Ot=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),Je=zt(O.lane_states),qe=typeof O.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(O.serial_lane_count))):Math.min(5,Ot.length);Z.set(oe,qe),U.set(oe,Et.length);let N=new Map(Ot.map(A=>[A.id,A])),ee=new Map;for(let A of Ot)for(let P of A.entries)P&&typeof P.bead_id=="string"&&ee.set(P.bead_id,A.id);for(let[A,P]of Object.entries(Ge))Array.isArray(P)&&q.set(A,P.filter($e=>typeof $e=="string"&&$e.length>0));let ye=Array.isArray(O.done)?O.done:[];for(let A of ye)A&&typeof A.bead_id=="string"&&W.push({id:A.bead_id,root_dir:oe,workspace_name:Ie});let T=new Map;for(let A of ye)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&T.set(A.bead_id,A.added_at);let G=A=>({id:A,title:yt[A]||A,root_dir:oe,workspace_name:Ie,expected_revision:Xe,draggable:!1,...zt(vt[A]).created_at?{created_at:zt(vt[A]).created_at}:{},...zt(vt[A]).updated_at?{updated_at:zt(vt[A]).updated_at}:{}}),Me=A=>{let P=dt[A]?.chips?.pr;return P&&typeof P.number=="number"&&typeof P.url=="string"?{pr_number:P.number,pr_url:P.url}:{}},x=A=>Object.hasOwn(Ge,A)?{blocked_by:Array.isArray(Ge[A])?Ge[A].filter(P=>typeof P=="string"&&P.length>0):[]}:{},E=new Set;for(let[A,P]of wy(rt,T)){E.add(A);let $e=P.run_state==="failed"?Ay(rt,P.attempt_id):null;$e!==null&&S.set(A,$e),h.push({...G(A),lane:"running",...x(A),...ee.has(A)?{serial_lane_id:ee.get(A)}:{},attempt_id:P.attempt_id,run_state:P.run_state,status:P.status||void 0,workflow:dt[A]||null,can_pause:P.can_pause,can_resume:P.can_resume,started_at:P.started_at,last_event_at:P.last_event_at,last_activity:P.last_activity,legs:P.legs,runner:P.runner,model:P.model,effort:P.effort,speed:P.speed,resumed_from:P.resumed_from,continuation_mode:P.continuation_mode,usage:P.usage,exec_chips:{orchestration:Gs(P),worker:null},discard:Un(ve,A,{attempt_id:P.attempt_id}),badges:P.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:P.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:P.run_state==="failed"})}for(let[A,P]of Dp(rt)){if(h.some(de=>de.id===A))continue;let $e=P.attempt,Ze=P.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...G(A),lane:"running",kind:"session",...x(A),attempt_id:typeof $e.attempt_id=="string"?$e.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[A]||null,can_pause:!1,can_resume:!1,started_at:P.started_at,last_event_at:typeof $e.last_event_at=="number"?$e.last_event_at:null,last_activity:$e.last_activity&&typeof $e.last_activity=="object"?$e.last_activity:null,legs:Array.isArray($e.legs)?$e.legs:[],runner:typeof $e.runner=="string"?$e.runner:null,model:typeof $e.model=="string"?$e.model:null,effort:typeof $e.effort=="string"?$e.effort:null,speed:typeof $e.speed=="string"?$e.speed:null,resumed_from:null,continuation_mode:null,usage:$e.usage&&typeof $e.usage=="object"?$e.usage:null,exec_chips:{orchestration:Gs($e),worker:null},discard:Un(ve,A,{merge_queued:!0}),badges:[P.origin==="auto"?`${Ze} \xB7 \uC790\uB3D9`:Ze],alert:!1})}for(let A of Array.isArray(O.session_active)?O.session_active:[]){let P=A&&A.bead_id;typeof P!="string"||E.has(P)||(E.add(P),Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&q.set(P,A.blocked_by.filter($e=>typeof $e=="string"&&$e.length>0)),typeof A.title=="string"&&A.title.length>0&&Se.set(P,A.title),h.push({...G(P),title:A.title||yt[P]||P,lane:"running",kind:"session",status:"in_progress",started_at:Al(A.started_at)??Al(A.updated_at)??void 0,updated_at:Al(A.updated_at)??void 0,workflow:A.workflow||null,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter($e=>typeof $e=="string"&&$e.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(A.session_refs)?A.session_refs:[],badges:[],alert:!1}))}for(let A of Array.isArray(O.pr_wait)?O.pr_wait:[]){let P=A&&A.bead_id;if(typeof P!="string"||E.has(P))continue;E.add(P);let $e=zt(re[P]),Ze=zt($e.pr),de=$e.gate?zt($e.gate):null,st=Zt.has(P),bt=Kt.get(P)?.continuation_action||null,At=!!bt&&bt.continuation===null,Mt=ut.active===P,Ht=A.external===!0,Lt=Ke[P]||null,mn=zt(_t[P]),Nt=to({bead_id:P,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:mn.merge_progress||null,cleanup_failed:Lt,repo_operations:gt}),an=Ba(Nt),ln=!!de&&de.base_badge==="\uCDA9\uB3CC",Xt=!!Lt&&["child_sweep","branch_cleanup","parent_close"].includes(Lt.step)&&!!de&&de.tier==="merged",cn=Ht&&!!Lt&&!!de&&de.tier==="merged",Oe=!!de&&["closed_unmerged","review","undecidable"].includes(de.tier)&&de.reason!=="review_receipt_undetermined",Pe=Un(ve,P,{external:Ht,merge_active:Mt||Nt?.step==="merge",merge_queued:st,cleanup_active:an,merged:!!Lt||de?.tier==="merged"}),R=!!Pe.operation;b.push({...G(P),lane:"pr_wait",...x(P),workflow:dt[P]||null,pr_number:typeof Ze.number=="number"?Ze.number:null,pr_url:typeof Ze.url=="string"?Ze.url:void 0,external:Ht,usage:Ln(rt,P),merge_step:Nt,badges:At?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Nt?[de?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Lt?[Lr(Lt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(Lt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof de?.gate_badge=="string"&&de.gate_badge.length>0?[de.gate_badge]:[],alert:Nt?Nt.failed===!0:!!Lt||Oe,reason:Lt&&Nt?.active!==!0?ja(Lt.step):"PR \uB300\uAE30",merge_action:de?.tier==="merged"&&!Xt&&!cn?!1:!st||At,merge_enabled:!R&&(At||de?.enabled===!0||ln||Xt||cn),merge_label:At?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":cn||Xt?"\uC815\uB9AC \uC7AC\uAC1C":ln&&!Xt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:At?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":R?Pe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Pe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Pe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:cn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ln?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?.enabled===!0?`\uBA38\uC9C0 (${de.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${de?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:st&&!At,cancel_enabled:!Mt,continuation_mismatch:bt?.mismatch||null,discard:Pe,discard_action:Pe.action,discard_enabled:Pe.enabled,discard_title:Pe.title})}let J=(A,P,$e,Ze)=>{let de=A&&A.bead_id;if(typeof de!="string"||E.has(de))return null;E.add(de);let st=We[de],bt=Un(ve,de),At=bt.operation?bt:null,Mt={...G(de),lane:P,workflow:dt[de]||null,draggable:!At,discard:At||void 0,reason:Vp(Q,de),seq:$e+1,queue_position:$e+1,queue_index:$e,queue_length:Ze,badges:st?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!st,revise_action:!!st,revise_enabled:!!st&&!At,revise_title:st?st.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${st.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Ht=x(de);return Object.hasOwn(Ht,"blocked_by")&&(Mt.blocked_by=Ht.blocked_by),Mt};for(let A=0;A<Et.length;A++){let P=J(Et[A],"queue",A,Et.length);if(!P)continue;w.push(P);let $e=Y.get(oe);$e?$e.push(P):Y.set(oe,[P])}let fe=A=>{let P=b.find(st=>st.id===A&&st.root_dir===oe);if(P)return{id:A,title:P.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $e=h.find(st=>st.id===A&&st.root_dir===oe),Ze=$e?$e.run_state:yy(rt,A),de=Ze==="failed"||Ze==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ze==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:A,title:$e?$e.title:G(A).title,badge:de}},Ee=[];for(let A=0;A<Math.max(qe,Ot.length);A++){let P=`s${A+1}`,$e=N.get(P),Ze=$e&&Array.isArray($e.entries)?$e.entries:[],de=zt(Je[P]),st=Array.isArray(de.occupied_by)?de.occupied_by.filter(Mt=>typeof Mt=="string"):[],bt=new Set(st),At=[];for(let Mt=0;Mt<Ze.length;Mt++){let Ht=Ze[Mt]&&Ze[Mt].bead_id;if(typeof Ht=="string"&&bt.has(Ht)){E.add(Ht);continue}let Lt=J(Ze[Mt],P,Mt,Ze.length);Lt&&(At.push(Lt),w.push(Lt))}At.length===0&&st.length===0&&(qe<=1||A>=qe)||Ee.push({id:P,index:A,items:At,raw_length:Ze.length,occupied_by:st,occupants:st.map(Mt=>fe(Mt)),corrections:Array.isArray(de.corrections)?de.corrections.length:0,cycle:de.cycle===!0,...At.length===0&&st.length===0?{empty:!0}:{}})}ae.set(oe,Ee);let Fe=Array.from({length:qe},(A,P)=>{let $e=`s${P+1}`,Ze=N.get($e),de=Ze&&Array.isArray(Ze.entries)?Ze.entries:[],st=zt(Je[$e]);return{id:$e,index:de.length,length:de.length,occupied_by:Array.isArray(st.occupied_by)?st.occupied_by.filter(bt=>typeof bt=="string"):[]}});for(let A of Array.isArray(O.runnable)?O.runnable:[]){let P=A&&A.bead_id;if(typeof P!="string"||E.has(P))continue;E.add(P);let $e=A.workflow&&typeof A.workflow=="object"?A.workflow:null,Ze=$e&&typeof $e.route=="string"&&$e.route||(typeof A.route=="string"?A.route:null),de=ky(zt(je),A.exec_pins,Ze),st=ts(A.rec,A.exec_pins);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&q.set(P,A.blocked_by.filter(bt=>typeof bt=="string"&&bt.length>0)),typeof A.title=="string"&&A.title.length>0&&Se.set(P,A.title),Array.isArray(A.scope)&&be.set(P,A.scope.filter(bt=>typeof bt=="string"&&bt.length>0)),_.push({...G(P),title:A.title||yt[P]||P,lane:"runnable",draggable:!0,reason:Vp(Q,P),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",published:A.published===!0,workflow:$e||(Ze?{route:Ze,chips:{route:Ze}}:null),...de?{exec_chips:de}:{},...st?{rec:st}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(bt=>typeof bt=="string"&&bt.length>0)}:{},place_index:Et.length,place_lanes:Fe})}for(let A of ye){let P=A&&A.bead_id;if(typeof P!="string"||E.has(P)||(E.add(P),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let $e=vy(rt,P),Ze=$e&&typeof $e.done_kind=="string"?$e.done_kind:null;F.push({...G(P),lane:"done",done:!0,done_layout:"three_line",usage:Ln(rt,P),work_ms:va(rt,P),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Ze,...Me(P),badges:[...Ze&&Kp[Ze]?[Kp[Ze]]:[],...ya(rt,P)]})}}let ce=new Map;s.forEach((O,oe)=>{O&&typeof O.root_dir=="string"&&ce.set(O.root_dir,oe)});let _e=n&&n.running_sort==="repo"?"repo":"started";h.sort((O,oe)=>{let Ie=O.kind==="session",je=oe.kind==="session";if(Ie!==je)return Ie?1:-1;if(Ie&&je){let yt=Ua(oe.updated_at)-Ua(O.updated_at);return yt!==0?yt:O.id.localeCompare(oe.id)}if(_e==="repo"){let yt=ce.get(O.root_dir)??Number.MAX_SAFE_INTEGER,vt=ce.get(oe.root_dir)??Number.MAX_SAFE_INTEGER;if(yt!==vt)return yt-vt}let Xe=typeof O.started_at=="number"&&Number.isFinite(O.started_at)?O.started_at:null,rt=typeof oe.started_at=="number"&&Number.isFinite(oe.started_at)?oe.started_at:null;return Xe!==null&&rt!==null&&Xe!==rt?Xe-rt:Xe===null&&rt!==null?1:Xe!==null&&rt===null?-1:O.id.localeCompare(oe.id)}),F.sort((O,oe)=>(oe.done_at??0)-(O.done_at??0));let ke=s.length>0?s:r.map(O=>({root_dir:O&&O.root_dir,name:O&&O.name,auto_advance:O&&O.auto_advance,auto_merge:O&&O.auto_merge,slots:O&&O.slots,revision:O&&O.revision,runner_catalog:O&&O.runner_catalog})),Be=new Set(_.map(O=>O.root_dir)),we=[];for(let O of ke){if(!O||typeof O.root_dir!="string")continue;let oe=Y.get(O.root_dir)||[],Ie=ae.get(O.root_dir)||[];!(oe.length>0||Ie.some(Xe=>Xe.items.length>0||Xe.occupied_by.length>0))&&!Be.has(O.root_dir)||we.push({root_dir:O.root_dir,name:O.name||O.root_dir,auto_advance:O.auto_advance===!0,auto_merge:O.auto_merge===!0,slots:typeof O.slots=="number"&&O.slots>=Gp?O.slots:Gp,revision:typeof O.revision=="number"?O.revision:0,runner_catalog:zt(O.runner_catalog),items:oe,sublanes:{parallel:oe,serial:Ie},serial_lane_count:Z.get(O.root_dir)||0,raw_queue_length:U.get(O.root_dir)||0})}let X={runnable:_,runnable_all:_,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:w,queue_groups:we,running:h,pr_wait:b,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},Te=Up(X);for(let O of W)Te.has(O.id)||Te.set(O.id,{root_dir:O.root_dir,workspace_name:O.workspace_name,lane:"done",state:"done"});for(let O of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){if(!Object.hasOwn(O,"blocked_by"))continue;let oe=Te.get(O.id);O.blockers=(O.blocked_by||[]).map(Ie=>Wp(Ie,oe,Te,s))}for(let O of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){let oe=(O.blockers||[]).map(je=>({...kl(O.id,je),openable:!0}));if(oe.length===0)continue;let Ie={predecessors:oe};O.dependency_chips=Ie}Cy(X,ne,be,Te,s);let De=zp(X.queue_groups);for(let O of X.queue_groups)for(let oe of O.sublanes.serial){let Ie=De.get(Hp(O.root_dir,oe.id));Ie&&(oe.cross_wait_peers=Ie)}X.chain_lanes=Ey(i&&Array.isArray(i.lanes)?i.lanes:[],q,Te,s,Se,d,{armed_by_bead:H,failed_by_bead:S,disarmed_lanes:M});let V=new Map;for(let O of[...X.queue,...X.runnable])V.has(O.id)||V.set(O.id,O);let D=new Set;for(let O of X.chain_lanes)for(let oe of O.rows){if(O.status==="confirmed"&&!oe.unplaced&&!oe.fixed&&D.add(oe.id),!O.draft&&!oe.unplaced)continue;let Ie=V.get(oe.id);Ie&&(Ie.cross_lane_chip={lane_id:O.lane_id,number:O.number,status:O.status,label:O.draft?`\uC5F0\uACB0 ${O.number} (draft)`:`\uC5F0\uACB0 ${O.number}`})}let me=new Map(X.chain_lanes.map(O=>[O.lane_id,O.number]));for(let O of[...X.queue,...X.running]){let oe=H.get(O.id);if(typeof oe!="string"||oe.length===0)continue;let Ie=me.get(oe);O.armed_lane_chip=Ie===void 0?{lane_id:oe,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:oe,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let xe=[];for(let O of Y.values())for(let oe of O)D.has(oe.id)||xe.push(oe);xe.sort((O,oe)=>{let Ie=O.workspace_name.localeCompare(oe.workspace_name);return Ie!==0?Ie:(O.queue_index??0)-(oe.queue_index??0)}),X.parallel_rows=xe;let Ye={};for(let[O,oe]of Te)typeof oe.root_dir=="string"&&oe.root_dir.length>0&&(Ye[O]=oe.root_dir);for(let O of X.chain_lanes)for(let oe of O.rows)!Object.hasOwn(Ye,oe.id)&&oe.root_dir.length>0&&d.has(oe.root_dir)&&(Ye[oe.id]=oe.root_dir);X.owner_of=Ye;let ie=X.runnable.length;X.runnable_all=X.runnable.slice();let Ue=X.runnable;a.show_blocked||(Ue=Ue.filter(O=>O.blocked!==!0));let mt=Ue.length;a.spec==="with"?Ue=Ue.filter(O=>O.published===!0):a.spec==="without"&&(Ue=Ue.filter(O=>O.published!==!0)),X.runnable_hidden={blocked:ie-mt,spec:mt-Ue.length};let ct=(O,oe)=>{let Ie=Ua(oe.updated_at)-Ua(O.updated_at);return Ie!==0?Ie:O.id.localeCompare(oe.id)},ft=l==="repo_spec"?(O,oe)=>{let Ie=O.published===!0?0:1,je=oe.published===!0?0:1;return Ie!==je?Ie-je:ct(O,oe)}:ct;if(l==="updated_flat")X.runnable=Ue.slice().sort(ct),X.runnable_sections=[];else{let O=new Map;for(let je of Ue){let Xe=O.get(je.root_dir);Xe?Xe.push(je):O.set(je.root_dir,[je])}let oe=[],Ie=[];for(let je of ke){if(!je||typeof je.root_dir!="string")continue;let Xe=(O.get(je.root_dir)||[]).slice().sort(ft);O.delete(je.root_dir),Xe.length!==0&&(oe.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Xe.map(rt=>({...rt,workspace_name:""}))}),Ie.push(...Xe))}for(let[je,Xe]of O){let rt=Xe.slice().sort(ft);oe.push({root_dir:je,name:rt[0]?.workspace_name||je,items:rt.map(yt=>({...yt,workspace_name:""}))}),Ie.push(...rt)}X.runnable=Ie,X.runnable_sections=oe}return X}var Xp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Ry=1e4;function Qp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Jp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var rf="bdui.monitor.done-range",sf="bdui.monitor.running_sort",of="bdui.monitor.candidate_sort",af="beads-ui.monitor.candidate-filter",lf="beads-ui.monitor.sections";function Oy(){try{let e=window.localStorage.getItem(af);if(!e)return{...is};let t=JSON.parse(e);return!t||typeof t!="object"?{...is}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:is.show_blocked,spec:Sl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...is}}}function ef(e){try{window.localStorage.setItem(af,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ly(){try{let e=window.localStorage.getItem(of);return ro.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Iy(e){try{window.localStorage.setItem(of,e)}catch{}}function My(){try{let e=window.localStorage.getItem(lf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Py(e){try{window.localStorage.setItem(lf,JSON.stringify(e))}catch{}}function Dy(){try{let e=window.localStorage.getItem(rf);return e===null?"today":Hn(e)}catch{return"today"}}function Ny(e){try{window.localStorage.setItem(rf,e)}catch{}}function qy(){try{return window.localStorage.getItem(sf)==="repo"?"repo":"started"}catch{return"started"}}function Fy(e){try{window.localStorage.setItem(sf,e)}catch{}}var cf="tab:monitor:pipeline",jy=1e3,tf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],By=["queue","runnable","done"],nf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Uy(e){return e>=1&&e<=nf.length?nf[e-1]:`(${e})`}function uf(e,t){let n=Gt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=Dy(),b=qy(),w=Oy(),F=Ly(),W=My(),Y=ba("beads-ui.monitor.lane-collapsed"),ae=!1,Z=null,U=null,q=null,H=null,S=null,M=[],ne=null,be=null,Se=null,ce=null;function _e(p){return ce===null&&(ce=Oe()),kp(p,ce)}function ke(p,g){Be(),!(g<=0)&&(be={lane_id:p,corrected:g},Se=setTimeout(()=>{Se=null,be=null,P()},Ry))}function Be(){Se!==null&&(clearTimeout(Se),Se=null),be=null}function we(){let p=jr.find(g=>g.value===h);return p?p.label:""}let X=document.createElement("div");X.className="mon",e.appendChild(X);let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let De=document.createElement("div");De.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host mon2-drawer",Te.append(De,V),e.appendChild(Te);let D=El(null,null),me=new Map,xe=new Map,Ye=null,ie=null,Ue=null,mt=es(V,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{U=null,Te.hidden=!0,P()}});async function ct(p,g,v,$,B=!0){if(!o||!v)return null;let z=await o(p,{...g,root_dir:v,expected_revision:$});if(z&&z.conflict&&B){z.queue&&xe.set(v,z.queue);let se=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$;z=await o(p,{...g,root_dir:v,expected_revision:se})}return z&&z.queue&&v&&xe.set(v,z.queue),z}function St(p,g){let v=xe.get(p),$=s&&s.get?s.get():null,B=(Array.isArray($)?$:[]).find(se=>se?.root_dir===p);return(v||B)?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action}async function ft(p,g,v,$){let B=await ct(p,g,v,$),z=xe.get(v)?.revision??B?.queue?.revision??$;return er(B,(se,he)=>ct(p,{...g,continuation:se,decision_token:he},v,z,!1),{refresh:se=>ct(p,g,v,se?.queue?.revision??xe.get(v)?.revision??z,!1)})}async function O(p,g,v,$){let B=await er({continuation_mismatch:$},(se,he)=>ct("worker-merge-queue-add",{bead_id:g,continuation:se,decision_token:he},p,v,!1)),z=B?.queue?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action;B?.applied!==!0&&z?.continuation===null&&z.mismatch&&await O(p,g,B.queue.revision,z.mismatch)}async function oe(p,g,v){let $=await ct("worker-discard",p,g,v);if($&&$.discarded===!0){ue(ka($),"success",5e3);return}if($&&$.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ie(p,g,v){return!o||!v?null:await o(p,{...g,root_dir:v})}async function je(){let p=new Map;for(let g of D.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,v]of p)await ct("worker-merge-queue-add-all",{},g,v)}function Xe(p){let g=W[p];return!!(g&&g.runnable===!0)}function rt(p){let g={...W[p]||{}};g.runnable=!g.runnable,W={...W,[p]:g},Py(W),P()}function yt(p){Y.toggle(p),P()}function vt(p){Y.toggleArea(p),P()}function re(p){let g=D.queue_groups.find(v=>v.root_dir===p);if(!g)return null;for(let v=0;v<g.serial_lane_count;v+=1){let $=`s${v+1}`,B=g.sublanes.serial.find(z=>z.id===$);if(!B||B.raw_length===0&&B.occupied_by.length===0)return $}return null}function Q(p,g){let v=D.queue_groups.find(B=>B.root_dir===p),$=v?v.sublanes.serial.find(B=>B.id===g):void 0;return $?$.raw_length:0}function We(p,g){let v=me.get(p),$=me.get(g);if(!v||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let B=Qp(v),z=Qp($);if(B!==null&&B===z&&v.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let se=Jp(v),he=Jp($);if(se&&z!==null){let et=z;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:p,lane:et,index:Q($.root_dir,et)}]}}if(B!==null&&he&&z===null){let et=B;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:et,index:Q(v.root_dir,et)}]}}if(se&&B===null&&he&&z===null){let et=re(v.root_dir);return et===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${et} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:et,index:0},{bead_id:p,lane:et,index:1}]}}return!se&&!he?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:se?{kind:"note",text:`${Hs($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Hs(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ut(p,g){let v=We(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Xp,title:v.title}:{kind:"place",label:Xp,title:v.title}}}function Ke(p,g){if(!H||H.bead_id!==p)return null;let v=H.counterpart_id,$=g.filter(B=>B.id===v);return $.length===0?null:{rows:$.map(B=>ut(p,B))}}function ve(p){let g=p.dependency_chips||null,v=p.overlap_chips||[],$=p.scope_state==="missing",B=p.cross_lane_chip,z=p.armed_lane_chip;if(!g&&v.length===0&&!$&&!B&&!z)return null;let se=Ke(p.id,v);return{...g||{},...v.length>0?{overlaps:v}:{},...$?{scope_missing:!0}:{},...B?{cross_lane:{lane_id:B.lane_id,label:B.label}}:{},...z?{armed_lane:z}:{},...se?{popover:se}:{}}}function Ge(p){let g=ve(p);return g?{...p,dependency_chips:g}:p}async function dt(p,g){let v=We(p,g);if(H=null,v.kind!=="ops"){P();return}let $=R(v.root_dir,v.ops[0].bead_id);for(let B of v.ops){let z=await _t(B,v.root_dir,$);if(z===null)break;$=z}P()}async function _t(p,g,v){try{let $=await ct("worker-queue-place",p,g,v,!1);if($&&$.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ue($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=$.queue?$.queue.revision:void 0;return typeof B!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch($){return ue(Ht($),"error"),null}}function gt(p){let g=Xe(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
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
    </header>`}function jt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function Zt(p){if(q!==p.id)return null;let g=D.queue_groups.find(z=>z.root_dir===p.root_dir),v=p.place_lanes||[],$=D.cross_lanes_revision!==null,B=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let z of D.chain_lanes)B.push({id:`lane:${z.lane_id}`,label:`\uC5F0\uACB0 ${z.number} (${z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});B.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let z of v)B.push({id:`serial:${z.id}`,label:`\uC9C1\uB82C ${Number(z.id.slice(1))}`,count:z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:B}}function Kt(){let p=[],g=new Set,v=($,B)=>{for(let z of $)g.has(z.id)||(g.add(z.id),p.push({bead_id:z.id,root_dir:z.root_dir,workspace_name:z.workspace_name,title:z.title,lane:B}))};return v(D.running,"running"),v(D.pr_wait,"pr_wait"),v(D.queue,"queue"),v(D.runnable_all,"runnable"),p}function Et(p){if(!S||S.bead_id!==p)return"";let g=ln(),v=Kt(),$=new Map;for(let he of v)$.set(he.bead_id,he);let B=(g.get(p)||[]).filter(he=>$.has(he)),z=Mp(Ip(p,{issues:v,blocked_by_map:g}),S.query),se=D.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${B.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${B.map(he=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${he}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${he}
                aria-label=${`${he} \uC5F0\uACB0 \uD574\uC81C`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${S.query}
      />
      <div class="mon-deppanel__list">
        ${z.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:z.map(he=>c`<button
                  type="button"
                  class="mon-deppanel__cand${he.disabled?" is-disabled":""}"
                  data-dep-cand=${he.bead_id}
                  ?disabled=${he.disabled}
                  title=${he.reason||he.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${he.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${he.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${he.title}</span
                  >${he.reason?c`<span class="mon-deppanel__cand-reason"
                        >${he.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${se===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Ot(p){return jt(p,c`${ll(Ge(p),Zt(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(g,v)=>i(v,p.root_dir):void 0})}${Et(p.id)}`)}function Je(){return D.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${D.runnable.map(p=>Ot(p))}
      </div>`:c`${D.runnable_sections.map(p=>{let g=Xe(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${gt({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(v=>Ot(v))}
            </div>`}
      </section>`})}`}function qe(p,g=!1){return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="mon-dep__btn"
        data-bead-id=${p.id}
        title="의존성"
        aria-label="의존성"
      >
        ⛓
      </button>
      ${g?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${p.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function N(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Wn(Ge(p),{actions:qe(p,!0)})}
      ${Et(p.id)}
    </div>`}function ee(p,g,v,$){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Uy(g.seq)}</span
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
    </div>`}function ye(p){let g=D.cross_lanes_revision!==null,v=_e(p.lane_id),$=v?.held===!0,B=v?.cycle===!0,z=v?v.mismatched:[],se=be&&be.lane_id===p.lane_id?be.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${se>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${B?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Na}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!g||!p.can_confirm||$}
              title=${$?Na:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!g}
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
            </div>`:p.rows.map((he,et)=>ee(p,he,et,z))}
      </div>
    </div>`}function T(p,g,v){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${v}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Wn(Ge(g),{actions:qe(g)})}
      ${Et(g.id)}
    </div>`}function G(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function Me(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Wn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function x(p,g){let v=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...v.map(B=>Me(B)),...g.items.map((B,z)=>T(g,B,z))],count:g.items.length,empty:g.empty===!0,...v.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${v.map(B=>`${B.id} \u2014 ${B.badge}`).join(`
`)}
              >${G(v)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(B=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${B.workspace_name}·${B.lane}과 교차 대기
                </div>`)}`}:{}}}function E(){let p=D.cross_lanes_revision!==null,g=D.chain_lanes.some(v=>v.draft&&v.rows.length===0);return Ta({parallel:{rows:D.parallel_rows.map((v,$)=>N(v,$)),count:D.parallel_rows.length,collapsed:Y.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:D.queue_groups.flatMap(v=>v.sublanes.serial.map($=>({...x(v,$),drop:{drop:"repo-serial",root_dir:v.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Y.isAreaCollapsed("serial"),extra_panes:D.chain_lanes.map(v=>ye(v)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!p}
          title=${p?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...D.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function J(p){return c`<div class="worker-rungrid">
      ${D.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:D.running.map(g=>pl({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,U,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:ve(g)}}))}
    </div>`}function fe(p){let g={runnable:D.runnable,queue:D.queue,running:D.running,pr_wait:D.pr_wait,done:D.done},v=$=>{let B=g[$.lane],z=$.lane==="runnable"?D.runnable_flat?B.length>0?Je():void 0:D.runnable_sections.length>0?Je():void 0:$.lane==="queue"?D.queue_groups.length>0||D.chain_lanes.length>0||D.parallel_rows.length>0||D.cross_lanes_unreadable?E():void 0:$.lane==="running"?J(p):B.length>0?c`${B.map(se=>Wn(se))}`:void 0;return Yn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:B,count:B.length,src:$.lane==="runnable",empty:$.empty,body:z,live:$.lane==="running"&&B.length>0,collapsible:!0,collapsed:Y.isCollapsed($.pane),controls:$.lane==="runnable"?Ee():void 0,header_control:Fe($.lane,B.length)})};if(ae){let $=By.map(B=>tf.find(z=>z.lane===B)).filter(B=>B!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ca({live:D.running.length>0,running_body:D.running.length>0?J(p):"",pr_wait_rows:D.pr_wait.map(B=>Wn(B)),count:D.running.length+D.pr_wait.length})}
            ${$.map(B=>v(B))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${tf.map($=>v($))}
        </div>
      </div>`}function Ee(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${D.runnable_hidden.blocked>0?` ${D.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Sl.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${w.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${D.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${D.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Fe(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${ro.map(v=>c`<option
              value=${v.value}
              ?selected=${F===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:p==="running"?c`<select
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
      </select>`:p==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${jr.map(v=>c`<option value=${v.value} ?selected=${h===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function A(p){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,B={done_since:$r(h,d()),running_sort:b,candidate_filter:w,candidate_sort:F};return $!==void 0&&(B.cross_lanes=$),El(g,v,B)}function P(){let p=d();D=A(),ce=null,me=new Map;for(let g of[...D.runnable,...D.queue,...D.running,...D.pr_wait,...D.done])!g.non_occupying&&!me.has(g.id)&&me.set(g.id,g);at(fe(p),X),Ze()?.render(),$e(),de()}function $e(){let p=new Map;for(let g of D.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(X.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let v=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=p.get(v);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(Ue)return Ue;let p=X.querySelector(".mon2-deck");return p?(Ue=vp(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>D.done,rangeLabel:we,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:bt,onFocusChange:g=>{ne=g,de()}}),Ue):null}function de(){X.classList.toggle("has-focus",ne!==null);for(let p of Array.from(X.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",ne!==null&&p.getAttribute("data-root-dir")===ne);for(let p of Array.from(X.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=me.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",ne!==null&&!!g&&g.root_dir===ne)}for(let p of Array.from(X.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",ne!==null&&p.getAttribute("data-root-dir")===ne)}function st(p,g){let v=a?a():void 0;if(!g||!v||g===v||!l){r(p);return}l(g).then(()=>{r(p)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function bt(p){if(!p)return;let g=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===p){v();return}l(p).then(v).catch($=>{n("workspace switch for %s failed: %o",p,$),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function At(p){Tn(p).then(g=>{ue(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Mt(p){let g=me.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function Ht(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Lt(p,g,v){let $=D.owner_of[g];if(typeof $!="string"||$.length===0){ue(`${g}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Ie(p,{a:g,b:v},$),await mn(p,g,v)}catch(B){ue(Ht(B),"error")}P()}async function mn(p,g,v){if(p!=="dep-add")return;let $=D.chain_lanes.find(B=>B.rows.some(z=>z.id===g));!$||!$.rows.some(B=>B.id===v)||await Ut(B=>Tp($.lane_id,B),"",[{type:p,a:g,b:v}])}function Nt(p){return D.runnable.some(g=>g.id===p)||D.parallel_rows.some(g=>g.id===p)?!0:D.queue_groups.some(g=>g.sublanes.serial.some(v=>v.items.some($=>$.id===p)))}function an(p){!p||!Nt(p)||(S=S&&S.bead_id===p?null:{bead_id:p,query:""},P())}function ln(){let p=new Map,g=s&&s.get?s.get():null,v=$=>Array.isArray($)?$.filter(B=>typeof B=="string"&&B.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let B=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[z,se]of Object.entries(B))Array.isArray(se)&&p.set(z,v(se));for(let z of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&z.blocked_by.length>0&&p.set(z.bead_id,v(z.blocked_by))}return p}function Xt(){let p=new Map,g=new Map,v=s&&s.get?s.get():null,$=B=>Array.isArray(B)?B.filter(z=>typeof z=="string"&&z.length>0):[];for(let B of Array.isArray(v)?v:[]){if(!B||typeof B!="object")continue;let z=B.bead_blocked_by&&typeof B.bead_blocked_by=="object"?B.bead_blocked_by:{};for(let[se,he]of Object.entries(z))Array.isArray(he)&&p.set(se,$(he));for(let se of Array.isArray(B.runnable)?B.runnable:[])se&&typeof se.bead_id=="string"&&Array.isArray(se.blocked_by)&&g.set(se.bead_id,$(se.blocked_by))}for(let B of M)for(let z of[p,g]){let se=z.get(B.a);se!==void 0&&z.set(B.a,B.type==="dep-remove"?se.filter(he=>he!==B.b):se.includes(B.b)?se:[...se,B.b])}return{snapshot:p,runnable:g}}function cn(){let p=ln();for(let g of M){let v=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,v.filter($=>$!==g.b)):v.includes(g.b)||p.set(g.a,[...v,g.b])}return p}function Oe(p=D,g=Pe()){let v=new Map;for(let pt of Array.isArray(g?.lanes)?g.lanes:[]){let sn=new Map;for(let Ct of Array.isArray(pt?.entries)?pt.entries:[])Ct&&typeof Ct.bead_id=="string"&&sn.set(Ct.bead_id,Ct.dep_created_by_lane===!0);v.set(typeof pt?.id=="string"?pt.id:"",sn)}let $=new Map,B=new Map,z=new Set,se=new Set;for(let pt of p.chain_lanes){let sn=v.get(pt.lane_id);$.set(pt.lane_id,{status:pt.status,entries:pt.rows.map((Ct,En)=>({bead_id:Ct.id,root_dir:Ct.root_dir,...En===0?{}:{dep_created_by_lane:sn?.get(Ct.id)===!0}}))});for(let Ct of pt.rows)B.set(Ct.id,pt.lane_id),Ct.fixed&&z.add(Ct.id),Ct.unplaced||se.add(Ct.id)}let he=new Map;for(let pt of p.parallel_rows)typeof pt.queue_index=="number"&&he.set(pt.id,pt.queue_index);for(let pt of p.queue_groups)for(let sn of pt.sublanes.serial)for(let Ct of sn.items)typeof Ct.queue_index=="number"&&he.set(Ct.id,Ct.queue_index);let et=Xt();return{blocked_by_map:cn(),snapshot_blocked_by:et.snapshot,runnable_blocked_by:et.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:$,owner_lane_of:B,fixed_members:z,placed_members:se,parallel_rows:p.parallel_rows.map(pt=>({bead_id:pt.id,root_dir:pt.root_dir,queue_index:pt.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:he}}function Pe(){return(s&&s.crossLanes?s.crossLanes():null)??null}function R(p,g){let v=me.get(g);if(v&&v.root_dir===p)return v.expected_revision;let $=D.queue_groups.find(B=>B.root_dir===p);return $?$.revision:0}async function ge(p,g,v){if(p.type==="worker-queue-disarm"){try{let $=await ct(p.type,p.payload,p.root_dir,v.get(p.root_dir)??R(p.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&v.set(p.root_dir,$.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await Ne(p.type,p.payload,p.root_dir,v,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await Ie(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch($){return ue(Ht($),"error"),!1}}async function Ne(p,g,v,$,B){try{let z=await ct(p,g,v,$.get(v)??R(v,B.bead_id));return!z||typeof z.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(z.queue&&typeof z.queue.revision=="number"&&$.set(v,z.queue.revision),z.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):z.applied===!1?(ue(z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$.get(v)??0)}catch(z){return ue(Ht(z),"error"),null}}function xt(p){(p.type==="dep-add"||p.type==="dep-remove")&&(M=[...M,{type:p.type,a:p.a,b:p.b}])}async function Bt(p,g){if(!o)return{ok:!1};try{let v=await o(p.type,{...p.payload,expected_revision:g});return!v||typeof v.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let $=v,B=$&&$.code==="conflict"?$.details?.cross_lanes:null;return B&&typeof B.revision=="number"&&Array.isArray(B.lanes)?{ok:!1,conflict:B}:(ue(Ht(v),"error"),{ok:!1})}}async function Tt(p,g,v){let $=new Map,B=[],z=p.ops.slice(0,p.lane_op_index),se=p.ops.slice(p.lane_op_index);for(let et of z){if(!await ge(et,v,$))return{done:!0};xt(et)}let he=g;for(let et of p.lane_ops){if(he===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let pt=await Bt(et,he);if(!pt.ok)return pt.conflict?{done:!1,conflict:pt.conflict}:{done:!0};he=pt.revision}for(let et of se){if(!await ge(et,v,$))return{done:!0};xt(et),et.type==="dep-add"&&B.push(et)}for(let et of Op(B))he=await Qt(et,he);return{done:!0}}async function Qt(p,g){if(g===null||!o)return g;let v=p.pairs,$=g;for(let B=0;B<2;B+=1){if(v.length===0)return $;try{let z=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:v.map(se=>({bead_id:se.bead_id,after:se.after,value:!0})),expected_revision:$});return z&&typeof z.revision=="number"?z.revision:$}catch(z){let se=z,he=se&&se.code==="conflict"?se.details?.cross_lanes:null;if(!he||typeof he.revision!="number"||!Array.isArray(he.lanes))return $;let et=he.lanes.find(pt=>pt&&pt.id===p.lane_id);v=Lp(Array.isArray(et?.entries)?et.entries:[],v),$=he.revision}}return $}async function Ut(p,g,v=[]){M=v,Be();let $=D,B=Pe();for(let z=0;;z+=1){let se=p(Oe($,B));if("refused"in se){ue(se.refused,"error");break}let he=await Tt(se,$.cross_lanes_revision,g);if(he.done){se.correction&&ke(se.correction.lane_id,se.correction.corrected);break}if(z>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=A(he.conflict),B=he.conflict}M=[],P()}async function rn(p,g){await Ut(v=>hl(p,g,v),p.bead_id)}async function xn(p,g){if(p==="run"){await An(g);return}if(p==="stop"){await Sn(g);return}if(p==="create"){await Ut(v=>yl(null,v),"");return}if(p==="remove"){let v=Rp(g,Oe());if(v!==null&&!_(v))return;await Ut($=>Cp(g,$),"");return}await Ut(v=>p==="confirm"?Sp(g,v):Ep(g,v),"")}function qt(p){let g=new Map;for(let v of p.rows){let $=D.owner_of[v.id]||v.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],v.id])}return g}async function An(p){let g=D.chain_lanes.find(z=>z.lane_id===p);if(!g||D.cross_lanes_revision===null){P();return}Be();let v=new Map,$=new Map,B=qt(g);for(let z of g.rows){if(!z.unplaced)continue;let se=D.owner_of[z.id]||z.root_dir;if(typeof se!="string"||se.length===0){ue(`${z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),P();return}let he=$.get(se)??0;if(await Ne("worker-queue-place",{bead_id:z.id,lane:"parallel",index:(D.parallel_raw_length[se]??0)+he},se,v,{bead_id:z.id})===null){P();return}$.set(se,he+1)}for(let[z,se]of B)if(await Ne("worker-queue-arm",{bead_ids:se,lane_id:p},z,v,{bead_id:se[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),P();return}P()}async function Sn(p){let g=D.chain_lanes.find($=>$.lane_id===p);if(!g||D.cross_lanes_revision===null){P();return}Be();let v=new Map;for(let[$,B]of qt(g))if(await Ne("worker-queue-disarm",{lane_id:p},$,v,{bead_id:B[0]})===null)break;P()}async function Zn(p,g){let{root_dir:v,revision:$}=Mt(p);if(v.length===0){P();return}await Ne("worker-queue-disarm",{bead_ids:[p],lane_id:g},v,new Map([[v,$]]),{bead_id:p}),P()}async function C(p,g){let v=me.get(p);if(!v){P();return}let $={kind:"candidate",bead_id:p,root_dir:v.root_dir};if(g==="new-lane"){await Ut(B=>yl({bead_id:p,root_dir:v.root_dir},B),p);return}if(g.startsWith("lane:")){let B=g.slice(5);if(!D.chain_lanes.find(se=>se.lane_id===B)){P();return}await Ut(se=>hl($,{kind:"chain",lane_id:B,marker_index:(se.cross_lanes.get(B)?.entries??[]).length},se),p);return}if(g.startsWith("serial:")){let B=g.slice(7),z=(v.place_lanes||[]).find(se=>se.id===B);await rn($,{kind:"repo-serial",root_dir:v.root_dir,lane_id:B,index:z?z.index:0});return}await rn($,{kind:"parallel",marker_index:D.parallel_rows.length})}async function I(p,g){let v=D.parallel_rows,$=v.findIndex(pt=>pt.id===p);if($<0)return;let B=v[$].root_dir,z=[];v.forEach((pt,sn)=>{pt.root_dir===B&&z.push(sn)});let se=z.indexOf($),he=z[se+g];if(typeof he!="number")return;let et=g===-1?he:z[se+2]??Math.min(v.length,he+1);await rn({kind:"parallel",bead_id:p,root_dir:B,queue_index:v[$].queue_index??0},{kind:"parallel",marker_index:et})}async function ze(p){for(let g of D.chain_lanes){let v=g.rows.find($=>$.id===p);if(v){await rn({kind:"chain",bead_id:p,root_dir:v.root_dir,lane_id:g.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:D.parallel_rows.length});return}}}let Ve=null,ot=!1,wt=null;function en(){wt!==null&&clearTimeout(wt),wt=setTimeout(()=>{wt=null,ot=!1},0)}function br(p,g){let v=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(v&&p.contains(v)){let $=Number(v.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return p.querySelectorAll("[data-row-index]").length}function Ir(p){let g=typeof p?.closest=="function"?p.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let v=g.getAttribute("data-lane");return v==="queue"?{zone:g,target:{kind:"parallel",marker_index:D.parallel_rows.length}}:v==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function m(p){let g=p.target;if(!Ve)return null;let v=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!v)return Ir(g);let $=v.getAttribute("data-drop");if($==="candidate")return{zone:v,target:{kind:"candidate"}};if($==="parallel")return{zone:v,target:{kind:"parallel",marker_index:br(v,g)}};if($==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:br(v,g)}};if($==="repo-serial"){let B=v.getAttribute("data-root-dir")||"";if(B!==Ve.root_dir)return null;let z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,se=z&&v.contains(z)?z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),he=Number(se);return{zone:v,target:{kind:"repo-serial",root_dir:B,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(he)?he:0}}}return null}function k(){for(let p of Array.from(X.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}let K=null;function pe(p){K=p.target instanceof Element?p.target:null}function Ce(p){let g=p.target,v=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=v?v.closest("[data-drag-kind]"):null;if(!$)return;if(v&&K&&v.contains(K)&&typeof K.closest=="function"&&K.closest("input, button, a")){p.preventDefault();return}let B=$.getAttribute("data-bead-id")||"",z=$.getAttribute("data-drag-kind")||"",se=$.getAttribute("data-root-dir")||"";if(!B||!z||!se)return;let he=$.getAttribute("data-queue-index")||"",et=Number(he),pt=$.getAttribute("data-lane-id")||"";Ve={kind:z,bead_id:B,root_dir:se,...he!==""&&Number.isFinite(et)?{queue_index:et}:{},...pt?{lane_id:pt}:{}},ot=!0,q=null,X.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",B),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Le(p){let g=m(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function y(p){let g=p.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function te(){Ve=null,k(),X.classList.remove("is-dragging"),en()}function j(p){let g=m(p),v=Ve;Ve=null,k(),X.classList.remove("is-dragging"),!(!g||!v)&&(p.preventDefault(),rn(v,g.target))}function Ae(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function nt(p,g){let{item:v,root_dir:$,revision:B}=Mt(g),z=v?.attempt_id||"",se=p.classList;if(se.contains("worker-mini__rowops-up")||se.contains("worker-mini__rowops-down")){I(g,se.contains("worker-mini__rowops-up")?-1:1);return}if(se.contains("worker-mini__rowops-remove")){ct("worker-queue-remove",{bead_id:g},$,B);return}if(se.contains("mon2-crow__detach")){ze(g);return}if(se.contains("mon-dep__btn")){an(g);return}if(se.contains("worker-dep__open")){an(g);return}if(se.contains("mon2-arm__release")){Zn(g,p.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let he=p.getAttribute("data-lane-id")||"";X.querySelector(`.mon2-clane[data-lane-id="${he}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("mon-deppanel__unlink")){let he=p.getAttribute("data-dep-a")||"",et=p.getAttribute("data-dep-b")||"";_(`${et}\uAC00 ${he}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Lt("dep-remove",he,et);return}if(se.contains("mon-deppanel__cand")){let he=p.getAttribute("data-dep-cand")||"";S&&he&&Lt("dep-add",S.bead_id,he);return}if(se.contains("mon-overlap__chip")){let he=p.getAttribute("data-overlap-id")||"";H=!!H&&H.bead_id===g&&H.counterpart_id===he?null:{bead_id:g,counterpart_id:he},P();return}if(se.contains("mon-overlap__place")){dt(g,p.getAttribute("data-counterpart-id")||"");return}if(se.contains("worker-card__place")){q=q===g?null:g,P();return}if(se.contains("worker-card__place-cancel")){q=null,P();return}if(se.contains("worker-card__place-lane")){let he=p.getAttribute("data-lane")||"parallel";q=null,C(g,he);return}if(se.contains("rtile__session")){if(v&&v.kind==="session"){let he=(v.session_refs||[]).find(et=>et&&et.current===!0);he&&(Te.hidden=!1,mt.open(Yr(he,g,"in_progress",$)),P());return}U=z,z&&v&&(Te.hidden=!1,mt.open({attempt_id:z,root_dir:$,meta:Ae(v)})),P();return}if(se.contains("rtile__pause")){Ie("worker-attempt-pause",{attempt_id:z},$);return}if(se.contains("rtile__resume")){Vr().then(he=>{if(he!==null)return ft("worker-attempt-resume",{attempt_id:z,...he!==""?{instructions:he}:{}},$,B)});return}if(se.contains("rtile__dismiss")){ct("worker-attempt-dismiss",{attempt_id:z},$,B);return}if(se.contains("rtile__discard")){if(!_(zs(g,"unmerged")))return;oe({bead_id:g,...z?{attempt_id:z}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,B);return}if(se.contains("worker-mini__merge")){let he=St($,g);he?.mismatch&&he.continuation===null?O($,g,B,he.mismatch):ct("worker-merge-queue-add",{bead_id:g},$,B);return}if(se.contains("worker-mini__merge-cancel")){ct("worker-merge-queue-remove",{bead_id:g},$,B);return}if(se.contains("worker-mini__discard")){let he=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(zs(g,he)))return;oe({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,B);return}if(se.contains("worker-mini__revise-fix")){ft("worker-revise-fix",{bead_id:g},$,B);return}se.contains("worker-mini__revise-approve")&&ct("worker-revise-approve",{bead_id:g},$,B)}function tt(p){let g=ot;ot=!1;let v=p.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let $=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){p.preventDefault();let ht=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";ht&&At(ht);return}let B=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(B){p.preventDefault();let Re=B.getAttribute("data-root-dir")||me.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||B.getAttribute("title")||"";bt(Re);return}let z=v.closest(".mon2-sec__toggle");if(z){p.preventDefault(),rt(z.getAttribute("data-root-dir")||"");return}let se=v.closest(".worker-pane__toggle[data-lane]");if(se){p.preventDefault();let Re=se.getAttribute("data-lane")||"";(Re==="candidate"||Re==="queue"||Re==="running"||Re==="pr_wait"||Re==="done")&&yt(Re);return}let he=v.closest(".worker-wait__area-toggle[data-area]");if(he){p.preventDefault(),vt(he.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){p.preventDefault(),xn("create","");return}let et=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(et){p.preventDefault();let Re=et.getAttribute("data-lane-id")||"",ht=et.classList;xn(ht.contains("mon2-clane__confirm")?"confirm":ht.contains("mon2-clane__reapply")?"reapply":ht.contains("mon2-clane__run")?"run":ht.contains("mon2-clane__stop")?"stop":"remove",Re);return}if(v.closest(".mon-merge-all")){p.preventDefault(),je();return}let pt=v.closest(".mon-filter__spec");if(pt){p.preventDefault(),w={...w,spec:pt.getAttribute("data-spec")||"all"},ef(w),P();return}let sn=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!sn)return;let Ct=sn.getAttribute("data-bead-id")||"",En=v.closest("button");if(En){p.preventDefault(),nt(En,Ct);return}Ct&&!g&&(p.preventDefault(),st(Ct,sn.getAttribute("data-root-dir")||Mt(Ct).root_dir))}function it(p){let g=p.target;if(!g||typeof g.closest!="function")return;let v=g.closest(".mon-filter__blocked");if(v){w={...w,show_blocked:v.checked},ef(w),P();return}let $=g.closest(".mon-candidate-sort");if($){F=ro.some(se=>se.value===$.value)?$.value:"repo_spec",Iy(F),P();return}let B=g.closest(".mon-running-sort");if(B){b=B.value==="repo"?"repo":"started",Fy(b),P();return}let z=g.closest(".mon-done-range");z&&(h=Hn(z.value),Ny(h),P())}function lt(p){let g=p.target,v=g&&typeof g.closest=="function"?B=>g.closest(B):()=>null,$=!1;H&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(H=null,$=!0),S&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(S=null,$=!0),$&&P()}function kt(p){p.key!=="Escape"||!H&&!S||(H=null,S=null,P())}function on(p){let g=p.target;!g||typeof g.closest!="function"||!g.closest(".mon-deppanel__search")||!S||(S={...S,query:g.value},P())}e.addEventListener("click",tt),e.addEventListener("change",it),e.addEventListener("input",on),e.addEventListener("pointerdown",pe),document.addEventListener("click",lt),document.addEventListener("keydown",kt),e.addEventListener("dragstart",Ce),e.addEventListener("dragover",Le),e.addEventListener("dragleave",y),e.addEventListener("drop",j),e.addEventListener("dragend",te);{let p=!0;Z=ga(g=>{if(ae=g,p){p=!1;return}P()})}s&&typeof s.subscribe=="function"&&(Ye=s.subscribe(()=>{try{xe.clear(),P()}catch{}}));function ls(){ie!==null&&(clearInterval(ie),ie=null)}function un(){wt!==null&&(clearTimeout(wt),wt=null)}return{load(){n("load"),P(),ie===null&&(ie=setInterval(()=>{try{P()}catch{}},jy))},pause(){ls()},clear(){ls(),un(),Ye&&(Ye(),Ye=null),Z&&(Z(),Z=null),mt.destroy(),Te.hidden=!0,Ue?.destroy(),Ue=null,e.removeEventListener("click",tt),e.removeEventListener("change",it),e.removeEventListener("input",on),e.removeEventListener("pointerdown",pe),document.removeEventListener("click",lt),document.removeEventListener("keydown",kt),e.removeEventListener("dragstart",Ce),e.removeEventListener("dragover",Le),e.removeEventListener("dragleave",y),e.removeEventListener("drop",j),e.removeEventListener("dragend",te),e.replaceChildren()}}}function df(e,t,n){let r=Gt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let w=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",w),n.gotoView(w)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&at(u(),s),o&&at(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&at(c``,s),o&&at(c``,o)}}}var pf=["bug","feature","task","epic","chore"];function ff(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var _f=["Critical","High","Medium","Low","Backlog"];function mf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let H of pf){let S=document.createElement("option");S.value=H,S.textContent=ff(H),o.appendChild(S)}a.replaceChildren();for(let H=0;H<=4;H+=1){let S=document.createElement("option");S.value=String(H);let M=_f[H]||"Medium";S.textContent=`${H} \u2013 ${M}`,a.appendChild(S)}}b();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,l.disabled=q,d.disabled=q,_.disabled=q,_.textContent=q?"Creating\u2026":"Create"}function W(){u.textContent=""}function Y(q){u.textContent=q}function ae(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let H=window.localStorage.getItem("beads-ui.new.priority");H&&/^\d$/.test(H)?a.value=H:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let q=o.value||"",H=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),H.length>0&&window.localStorage.setItem("beads-ui.new.priority",H)}async function U(){W();let q=String(s.value||"").trim();if(q.length===0){Y("Title is required"),s.focus();return}let H=Number(a.value||"2");if(!(H>=0&&H<=4)){Y("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),M=String(l.value||""),ne={title:q};S.length>0&&(ne.type=S),String(H).length>0&&(ne.priority=H),M.length>0&&(ne.description=M),F(!0);try{await t("create-issue",ne)}catch{F(!1),Y("Failed to create issue");return}Z(),F(!1),w()}return n.addEventListener("cancel",q=>{q.preventDefault(),w()}),h.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),U())}),r.addEventListener("submit",q=>{q.preventDefault(),U()}),{open(){r.reset(),W(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var Wy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function zy(e,t){return mi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function gf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=zy(r,e);return c`<button
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
  `}function bf(e,t,n){return c`
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
  `}function hf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Wy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Hy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function yf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(_e=>ue(_e,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function _(){if(d)return d;let _e=a.querySelector('[data-pane="execution"]');return _e?(d=Ma(_e,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ke=>t.queueStore?.set?.(ke)}),d):null}function h(){return c`
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
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function b(){let _e=r.get();return c`
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
        ${_e?c`
              ${gf(_e,s(),Y)}
              ${bf(_e,u,{onDraft:ke=>{u=ke},onAdd:ae,onRemove:Z})}
              ${hf(_e,U)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(_e){let ke=r.get();if(ke)try{let Be=await n("display-policy-set",{expected_revision:ke.revision,policy:_e(ke)});F(Be),Be&&Be.conflict&&Be.policy&&(Be=await n("display-policy-set",{expected_revision:Be.policy.revision,policy:_e(Be.policy)}),F(Be)),Be&&Be.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(_e){_e&&_e.policy&&typeof _e.policy=="object"&&r.set(_e.policy)}function W(_e){w(_e)}function Y(_e){let ke=r.get();if(!ke)return;let Be=!Gy(_e,ke);W(we=>Ky(_e,we,Be))}function ae(){let _e=u.trim();_e.length!==0&&(u="",W(ke=>ke.hidden_prefixes.includes(_e)?{hidden_prefixes:ke.hidden_prefixes}:{hidden_prefixes:[...ke.hidden_prefixes,_e]}),q())}function Z(_e){W(ke=>({hidden_prefixes:ke.hidden_prefixes.filter(Be=>Be!==_e)}))}function U(_e){let ke=r.get();if(!ke)return;let Be=ke.chips[_e]===!1;W(()=>({chips:{[_e]:Be}}))}function q(){at(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Hy.map(_e=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${_e.id}
                  aria-selected=${String(i===_e.id)}
                  aria-controls=${`settings-pane-${_e.id}`}
                  @click=${()=>H(_e.id)}
                >
                  <span class="settings-dialog__glyph">${_e.glyph}</span>
                  ${_e.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),_()}function H(_e){i=_e,q()}let S=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",S),a.addEventListener("cancel",S);let M=_e=>{_e.target===a&&ce()};a.addEventListener("click",M);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{l&&q()}));let be=null;t.implPresetStore?.subscribe&&(be=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function Se(_e="execution"){l||(l=!0,t.onOpenChange?.(!0),i=_e,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function ce(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Se,close:ce,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",S),a.removeEventListener("cancel",S),a.removeEventListener("click",M),ne&&(ne(),ne=null),be&&(be(),be=null),d?.destroy(),d=null,a.remove()}}}function Gy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ky(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Vy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],vf="usage-meter-card",Yy="usage-meter-layer",Tl=600,Zy=["token_expired","relogin_required"];function wf(e){return String(e).padStart(2,"0")}function Xy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function kf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${wf(r.getHours())}:${wf(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Vy[r.getMonth()]} ${r.getDate()} ${o}`;return`${Xy(n,t)} \xB7 ${i}`}function Qy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function $f(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function xf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Af=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Ef(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Jy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Ef(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function ev(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Jy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Ef(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function tv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=ev(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Tf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function nv(e,t){return!e.held||Tf(e,t)<=Tl?e:{...e,available:!1,windows:[],accounts:[]}}function Sf(e,t){return`${e}:${t}`}function Cf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){at(c``,e),e.hidden=!0,_()}function d(){if(l===null){let we=e.ownerDocument;l=we.createElement("div"),l.id=Yy,l.className="usage-meter__layer",we.body.appendChild(l)}return l}function _(){l!==null&&(at(c``,l),l.remove(),l=null)}function h(we){n!==we&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",W),window.addEventListener("resize",F)),n=we)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",W),window.removeEventListener("resize",F))}function w(we){let X=we.target;X&&(e.contains(X)||l!==null&&l.contains(X))||(b(),ce())}function F(){ce()}function W(we){we.key==="Escape"&&(b(),ce())}function Y(we){n===we?b():h(we),ce()}function ae(){b(),ce()}async function Z(we,X){if(r.has(we.key))return;let Te=Sf(we.key,X);r.set(we.key,X),a.delete(Te),ce();let De=null;try{De=await(await fetch(we.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{De=null}if(t)return;if(r.delete(we.key),!De||De.ok!==!0){let D=De&&typeof De.error=="string"&&De.error.length>0?De.error:"network_error";a.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${D}`}),ce();return}let V=Array.isArray(De.warnings)?De.warnings.filter(D=>typeof D=="string"&&D.length>0):[];V.length>0&&a.set(Te,{kind:"warn",text:V.join(" \xB7 ")}),ce(),await Be()}function U(we,X,Te,De){let V=xf(we.pct),me=`resets ${kf(we.resetsAt,De)}${X?` \xB7 ${Te}`:""}`;return c`<span
      class="usage-meter__window ${$f(V)}"
      style=${`--progress: ${V}%`}
      title=${me}
    >
      <span class="usage-meter__label">${we.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function q(we,X,Te){let De=Tf(X,Te),V=X.available&&(X.held||De>Tl),D=V?`${Math.floor(De/60)}\uBD84 \uC804 \uCE21\uC815`:"",me=X.accounts.filter(Ue=>!Ue.active).length,xe=`usage-meter__group${V?" usage-meter__group--stale":""}`,Ye=c`<span class="usage-meter__provider"
        >${we.label}</span
      >
      ${X.available?X.windows.map(Ue=>U(Ue,V,D,Te)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${me>0?c`<span class="usage-meter__badge">+${me}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${xe}
        aria-label=${`${we.label} usage`}
        >${Ye}</span
      >`;let ie=n===we.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${xe}`}
      aria-label=${`${we.label} usage`}
      aria-expanded=${ie?"true":"false"}
      aria-controls=${vf}
      @click=${()=>Y(we.key)}
    >
      ${Ye}
    </button>`}function H(we,X){return c`<span class="usage-meter" aria-label="Usage">
      ${we.map(Te=>q(Te.provider,Te.snapshot,X))}
    </span>`}function S(we,X){let Te=xf(we.pct),De=kf(we.resetsAt,X);return c`<span
      class="usage-meter__account-window ${$f(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${we.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${De.length>0?`\u21BB ${De}`:""}</span
      >
    </span>`}function M(we,X){return Zy.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${we.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(we,X,Te){let De=X.status==="ok",V=typeof X.ageSeconds=="number"&&X.ageSeconds>Tl,D=a.get(Sf(we.key,X.number)),me=r.get(we.key),xe=me!==void 0,Ye=me===X.number,ie=["usage-meter__account"];return X.active&&ie.push("usage-meter__account--active"),De||ie.push("usage-meter__account--unavailable"),V&&ie.push("usage-meter__account--stale"),c`<div class=${ie.join(" ")}>
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
              >${Qy(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${xe}
              @click=${()=>{Z(we,X.number)}}
            >
              ${Ye?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${De?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Ue=>S(Ue,Te))}
          </div>`:c`<div class="usage-meter__account-status">
            ${M(we,X.status)}
          </div>`}
      ${D===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${D.kind}"
          >
            ${D.text}
          </div>`}
    </div>`}function be(we,X,Te){let De=X.accounts.filter(V=>V.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${we.label} · 활성 ${De} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(V=>ne(we,V,Te))}
    </section>`}function Se(we,X){return c`<div
      class="usage-meter__card"
      id=${vf}
      role="dialog"
      aria-label=${`${we.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${be(we.provider,we.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let we=Date.now(),X=[];for(let De of Af){let V=o.get(De.key);V&&X.push({provider:De,snapshot:nv(V,we)})}if(X.length===0){b(),u();return}let Te=X.find(De=>De.provider.key===n&&De.snapshot.accounts.length>0);Te||b(),at(H(X,we),e),e.hidden=!1,Te?_e(Te,we):_()}function _e(we,X){let Te=d(),De=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${De.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-De.right)}px`),at(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${Se(we,X)}`,Te)}async function ke(we){try{let X=await fetch(we.endpoint);return X.ok?tv(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Be(){i+=1;let we=i,X=await Promise.all(Af.map(async Te=>({provider:Te,read:await ke(Te)})));if(!(t||we!==i)){for(let Te of X){let De=Te.provider.key;if(Te.read.kind==="ok"){o.set(De,Te.read.snapshot);continue}if(Te.read.kind==="empty"){o.delete(De);continue}let V=o.get(De);V!==void 0&&!V.held&&o.set(De,{...V,held:!0})}ce()}}return u(),Be(),s=setInterval(()=>{Be()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function Rf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var rv="worker-ineligible";function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Of(e){return so(e).includes(rv)}var sv="session-preferred",ov=["exclusive_machine","iterative_user_judgment","visual_verification"];function Lf(e,t){if(!so(e).includes(sv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&ov.includes(n)?n:""}var av="worker-serial";function Cl(e){return so(e).includes(av)}function Rl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var iv=new Set(["done","failed","orphaned","stopped","discarded"]),lv={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},cv={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},uv={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ol(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:uv[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function If(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,_=null,h=null,b=null,w=new Set,F=!1,W=0,Y=null,ae=new Set;function Z(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function U(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function H(){if(!s)return;let x=++W;F=!0,b=null,w.clear(),Je();try{let E=await s("worker-parallel-analysis-targets",{root_dir:q()});if(x!==W||!qe)return;let J=Array.isArray(E?.qualified)?E.qualified:[],fe=Array.isArray(E?.excluded)?E.excluded:[];b={qualified:J,excluded:fe};for(let Ee of J)Ee&&typeof Ee.id=="string"&&w.add(Ee.id)}catch{x===W&&qe&&(b={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===W&&(F=!1,qe&&Je())}}function S(x){return Array.isArray(x.runs)?x.runs:[]}function M(){let x=Z(),E=new Set;for(let J of Object.values(x.attempts||{})){let fe=J;fe&&typeof fe.bead_id=="string"&&!iv.has(fe.status)&&E.add(fe.bead_id)}for(let J of Array.isArray(x.pr_wait)?x.pr_wait:[])J&&typeof J.bead_id=="string"&&E.add(J.bead_id);for(let J of Object.values(x.discard_operations||{})){let fe=J;fe&&fe.phase!=="done"&&typeof fe.bead_id=="string"&&E.add(fe.bead_id)}return E}function ne(x){return x.filter(E=>be(E)===null)}function be(x){let E=Z();for(let J of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(J?.entries)&&J.entries.some(fe=>fe.bead_id===x))return J.id;return(Array.isArray(E.queue)?E.queue:[]).some(J=>J.bead_id===x)?"parallel":null}function Se(x,E){let J=l.get(x);return J||[...E.order]}function ce(x){if(x.length<2)return!1;let E=be(x[0]);if(!E||E==="parallel")return!1;let J=Z(),fe=(Array.isArray(J.serial_lanes)?J.serial_lanes:[]).find(Fe=>Fe.id===E)?.entries.map(Fe=>Fe.bead_id);if(!Array.isArray(fe))return!1;let Ee=x.map(Fe=>fe.indexOf(Fe));return Ee.every(Fe=>Fe>=0)&&Ee.every((Fe,A)=>A===0||Fe>Ee[A-1])}function _e(){let x=Z(),E=Array.isArray(x.serial_lanes)?x.serial_lanes:[],J=E.find(fe=>Array.isArray(fe.entries)&&fe.entries.length===0);return J?J.id:E[0]?.id||"s1"}function ke(x){let E=Z().bead_titles||{};return typeof E[x]=="string"?E[x]:x}async function Be(x,E){if(!s||d)return null;d=!0,Je();try{return await s(x,E)}finally{d=!1,Je()}}async function we(x){r?.setPending?.(!0);try{let E=await Be("worker-parallel-analysis-start",{force:x,target_ids:Array.from(w)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function X(){let x=U().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Te(x){if(!(!s||ae.has(x))){ae.add(x),Je();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:x});if(!qe)return;if(E?.ok===!0&&typeof E.prompt=="string"){Y={run_id:x,prompt:E.prompt};return}ue(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ae.delete(x),Je()}}}function De(){Y=null,Je()}async function V(){if(!Y)return;let x=await Tn(Y.prompt);ue(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function D(x,E){a&&a(x,Ol(E))}function me(){return Z().runner_catalog}function xe(x){return Object.keys(me()?.runners?.[x]?.models||{})}function Ye(x){let E=xe(x),J=me()?.runners?.[x]?.default_model;return typeof J=="string"&&E.includes(J)?J:E[0]||""}function ie(){let x=U().settings,E=_||x.runner||"claude",J=xe(E),fe=_?Ye(E):x.model||J[0]||"",Ee=Rl(me(),E,fe),Fe=x.effort||"",A=Ee.includes(Fe)?Fe:Ee[0]||"";return{runner:E,model:fe,effort:A,models:J,efforts:Ee}}async function Ue(x){let E=U().settings,J=await Be("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:x.runner,model:x.model,effort:x.effort});(!J||J.applied!==!0)&&(_=null,Je(),J&&J.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${J.reason}`,"error",2800))}function mt(x){_=x,Je();let E=ie();Ue({runner:x,model:E.model,effort:E.effort})}function ct(x){let E=ie(),J=Rl(me(),E.runner,x);Ue({runner:E.runner,model:x,effort:J.includes(E.effort)?E.effort:J[0]||""})}function St(x){let E=ie();Ue({runner:E.runner,model:E.model,effort:x})}async function ft(x,E){if(!s||d)return;let J=Se(x,E),fe=U();if(J.length<2||!fe.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ee=u.get(x)||_e(),Fe=()=>({snapshot_digest:fe.last_good.identity_digest,group_index:x,lane:Ee,ordered_bead_ids:J,expected_revision:Z().revision});d=!0,Je();try{let A=await s("worker-parallel-analysis-submit",Fe());A&&A.queue&&n&&n.set(A.queue),A&&A.applied!==!0&&A.conflict===!0&&(A=await s("worker-parallel-analysis-submit",Fe()),A&&A.queue&&n&&n.set(A.queue)),A&&A.applied===!0?(l.delete(x),ue(`\uC9C1\uB82C \uB808\uC778 ${Ee}\uC5D0 ${J.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${A?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Je()}}function O(x,E,J){l.set(x,Se(x,E).filter(fe=>fe!==J)),Je()}function oe(x){l.delete(x),Je()}function Ie(x,E,J,fe){let Ee=[...Se(x,E)],Fe=Ee.indexOf(J),A=Fe+fe;Fe<0||A<0||A>=Ee.length||(Ee.splice(A,0,...Ee.splice(Fe,1)),l.set(x,Ee),Je())}function je(){let x=U().settings,E=Object.keys(me()?.runners||{}),J=ie();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${fe=>mt(fe.target.value)}
        >
          ${E.map(fe=>c`<option
                value=${fe}
                ?selected=${J.runner===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${fe=>ct(fe.target.value)}
        >
          ${J.models.map(fe=>c`<option
                value=${fe}
                ?selected=${J.model===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${fe=>St(fe.target.value)}
        >
          ${J.efforts.map(fe=>c`<option
                value=${fe}
                ?selected=${J.effort===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      ${Xe(x)}
    </div>`}function Xe(x){return!yt(x)||rt(x)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function rt(x){return x.is_default===!0&&x.compatible===!1}function yt(x){return!!(x.runner&&x.model&&x.effort)}function vt(x){return yt(x)&&x.compatible!==!1}function re(x){let E=Math.max(0,Math.floor(x/1e3)),J=Math.floor(E/60),fe=E%60;return`${J}:${String(fe).padStart(2,"0")}`}function Q(x){let E=x.job;if(E){let J=typeof E.started_at=="number"?E.started_at:0,fe=`${E.runner||"?"}/${E.model||"?"}`,Ee=J?` \xB7 \uACBD\uACFC ${re(Date.now()-J)}`:"",Fe=typeof E.session_id=="string"?E.session_id:"",A=S(x).find(P=>P.run_id===E.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${fe} · effort ${E.effort||"?"}${Ee}</span
        >
        ${Fe?c`<code class="pa-session-id" title=${Fe}
              >${Fe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>D(E.job_id,A||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${A?.prompt_saved!==!0||ae.has(E.job_id)}
          @click=${()=>{Te(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ut()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function We(x){let E=Q(x);return E===""?"":c`<div class="pa__strip">${E}</div>`}function ut(){return r?.isPending?.()===!0}function Ke(x){let E=!!x.job,J=vt(x.settings),fe=b!==null&&w.size===0,Ee=E||d||ut()||F;return c`<div class="pa-meta">
      ${x.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!J||Ee||fe}
        @click=${()=>{we(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!J||Ee||fe}
        @click=${()=>{we(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{X()}}
      >
        취소
      </button>
    </div>`}function ve(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function Ge(x,E){E?w.add(x):w.delete(x),Je()}function dt(x){let E=Array.isArray(x.scope)?x.scope:[],J=Array.isArray(x.overlaps)?x.overlaps:[];return E.length===0&&J.length===0?c``:c`<span class="pa-target__signals">
      ${E.length>0?c`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(fe=>c`<li><code>${fe}</code></li>`)}
            </ul>
          </details>`:""}
      ${J.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${J.join(", ")}`}
            >겹침 ${J.join(", ")}</span
          >`:""}
    </span>`}function _t(){let x=b?.qualified||[],E=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${b&&x.length>0?c`<ul class="pa-targets__list">
            ${x.map(J=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${J.id}
                      .checked=${w.has(J.id)}
                      @change=${fe=>Ge(J.id,fe.target.checked)}
                    />
                    <span class="pa-target__title">${J.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${dt(J)}
                    <span class="pa-target__route">${J.route}</span>
                    <span class="pa-target__lane"
                      >${ve(J.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&x.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&E.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(J=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${J.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${lv[J.reason]||J.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ve(J.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function gt(x){let E=typeof x.session_id=="string"&&x.session_id.length>0,J=E?x.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${cv[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${E?c`<code class="pa-session-id" title=${J}
            >${J.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?c`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>D(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||ae.has(x.run_id)}
          @click=${()=>{Te(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function jt(x){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?c`<ul class="pa-runs__list">
            ${x.map(E=>gt(E))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Zt(){return Y?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${De}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{V()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${De}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function Kt(x,E){let J=Se(x,E),fe=M(),Ee=J.filter(de=>fe.has(de)),Fe=ne(J),A=ce(J),P=Array.isArray(Z().serial_lanes)?Z().serial_lanes:[],$e=u.get(x)||_e(),Ze=E.eligible!==!0||J.length<2||Ee.length>0||Fe.length>0||A||d;return c`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(de=>c`<span class="pa-group__category">${de}</span>`)}
        ${A?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Fe.length>0?c`<span class="pa-group__stale"
              >stale — ${Fe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${J.map((de,st)=>c`<li class="pa-member" data-bead-id=${de}>
              <span class="pa-member__seq">${st+1}</span>
              <span class="pa-member__title">${ke(de)}</span>
              ${fe.has(de)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${de}
                ?disabled=${st===0}
                aria-label=${`${de} \uC704\uB85C`}
                @click=${()=>Ie(x,E,de,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${de}
                ?disabled=${st===J.length-1}
                aria-label=${`${de} \uC544\uB798\uB85C`}
                @click=${()=>Ie(x,E,de,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${de}
                aria-label=${`${de} \uC81C\uC678`}
                @click=${()=>O(x,E,de)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${E.evidence.map(de=>c`<li class="pa-evidence">
              <code>${de.path}</code>
              <span class="pa-evidence__locator">${de.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>oe(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${de=>{u.set(x,de.target.value),Je()}}
          >
            ${P.map((de,st)=>c`<option
                  value=${de.id}
                  ?selected=${$e===de.id}
                >
                  직렬 ${st+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ze}
          @click=${()=>{ft(x,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Et(x){let E=Array.isArray(x.issues)?x.issues:[],J=E.filter(Ee=>Ee.verdict==="parallel_ok").length,fe=E.filter(Ee=>Ee.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${J}</span>
      <span>uncertain ${fe}</span>
    </div>`}function Ot(){let x=qe&&!!U().job;if(x&&h===null){h=setInterval(()=>Je(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function Je(){let x=U();_&&x.settings.runner===_&&(_=null);let E=x.last_good?.result;Ot(),at(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Me}
            >
              ×
            </button>
          </header>
          ${We(x)}
          <div class="pa__body">
            ${je()} ${Ke(x)} ${_t()}
            ${E?c`${E.groups.map((J,fe)=>Kt(fe,J))}
                ${E.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Et(E)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${jt(S(x))}
          </div>
        </div>
        ${Zt()}
      `,i)}let qe=!1,N=()=>{qe=!1,Y=null,W+=1,Ot()},ee=x=>{x.target===x.currentTarget&&Me()};i.addEventListener("close",N),i.addEventListener("cancel",N),i.addEventListener("click",ee);let ye=null;n&&n.subscribe&&(ye=n.subscribe(()=>{qe&&Je()}));let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{qe&&Je()}));function G(){qe||(qe=!0,Je(),H(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Me(){qe&&(qe=!1,Y=null,W+=1,Ot(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:Me,destroy(){qe=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",N),i.removeEventListener("cancel",N),i.removeEventListener("click",ee),ye&&(ye(),ye=null),T&&(T(),T=null),i.remove()}}}var Mf=new Set(["sh","bash","zsh","dash","ksh"]),Pf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Df(e){let t=e.split("/");return t[t.length-1]||""}function dv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Df(n[0]);if(r!=="env")return Mf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Mf.has(Df(s))}function pv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function fv(e){let t=[],n=0;Pf.lastIndex=0;for(let r of e.matchAll(Pf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:pv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function _v(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Nf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function _(q,H){return H?fv(q).map(S=>S.kind==="plain"?S.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):q}function h(){if(!s)return c``;let q=o==="ready"&&dv(a),H=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Z()}
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
              @click=${()=>{w()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Z()}
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
                  ${H.map((S,M)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(S,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){at(h(),r)}async function w(){if(o!=="ready")return;let q=await Tn(a);ue(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function F(q){q.key==="Escape"&&s&&(q.preventDefault(),Z())}function W(){d||(document.addEventListener("keydown",F),d=!0)}function Y(){d&&(document.removeEventListener("keydown",F),d=!1)}async function ae(q,H=null){let S=++l;W(),s={...q},u=H||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let be="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let Se=await n(be),ce=await Se.json().catch(()=>({}));if(S!==l)return;if((t?t():"")!==ne){Z();return}if(!Se.ok||!ce||ce.ok!==!0){o="error",i=_v(ce&&typeof ce.error=="string"?ce.error:""),b();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},a=String(ce.content),o="ready",b()}catch{if(S!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Z(){l+=1,Y(),s=null,a="",b();let q=u;u=null,q?.isConnected&&q.focus()}function U(){Z(),r.remove()}return{open:ae,close:Z,destroy:U}}function qf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function i(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function l(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function u(S,M){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${M}</span
    >`}function d(S){if(typeof S!="number"||!Number.isFinite(S))return"";let M=S/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function _(S){let M=d(S);return M?u("config",M):""}function h(S,M,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${be=>{s&&s({lane:S,base_sha:M.base_sha,path:ne.script,base_ref:M.base_ref},be.currentTarget)}}
    ></button>`}function b(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function w(S,M){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${ne=>{ae(S,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(S){let M=typeof S.base_sha=="string"?S.base_sha:"",ne=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,be=b(),Se=!!S.verify&&be.verify,ce=!!S.deploy&&be.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?c`${h("verify",S,S.verify)}
              ${_(S.verify.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?w("verify",be.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?c`${h("deploy",S,S.deploy)}
              ${_(S.deploy.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?w("deploy",be.deploy):""}
      </div>
    </section>`}function W(S){let M=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?F(M):M&&(M.status==="pending"||M.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${M.error_code?c` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Y(S){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(i(M),M&&M.conflict){let ne=await n("worker-auto-repair-toggle",{on:S,expected_revision:a()});i(ne)}r()}async function ae(S,M){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});if(i(ne),ne&&ne.conflict){let be=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:M,expected_revision:a()});i(be)}r()}let Z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function U(S,M,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(be=>c`<li data-token=${be}>
              ${Z[be]||be}
            </li>`)}
      </ul>
    </div>`}function q(S){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(M=>{let ne=[Z[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?ne.push(`${Z[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&ne.push(`${M.sessions_per_user_action}\uD68C`,Z[M.user_actions]||M.user_actions),M.applies_when&&ne.push(Z[M.applies_when]||M.applies_when),c`<li data-token=${M.id}>
            <strong>${Z[M.id]||M.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function H(){let S=o(),M=S.auto_repair!==!1,ne=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,be=Array.isArray(S.repo_operations)?S.repo_operations:[],Se=be.find(Be=>Be.state==="repairing"),ce=be.filter(Be=>Be.state==="failed"||Be.state==="repairing"),_e=ce.length?Math.min(...ce.map(Be=>typeof Be.repair?.remaining=="number"?Be.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(Be=>Be.id==="auto_repair_session")?.attempts??1,ke=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${Be=>{Y(Be.target.checked)}}
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
          >남은 자동 해결 ${_e}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Se?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Se.repair?.owner_bead||Se.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${ne?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(ne.worker_automatic||[]).length} · 해결 사다리
                ${ke.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${U("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:q(ke)}
            ${U("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(l())} ${H()}
      </details>`}}}var Uf=20,mv=5,gv=new Set(["failed","repairing","running","queued","retry_pending"]),Ff={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},jf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function bv(e,t,n=Uf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function hv(e){if(e.type==="cleanup")return!0;let t=e.operation;return gv.has(t.state)&&!t.dismissed&&!t.superseded_by}function yv(e,t,n={}){let r=bv(e,t,1/0),s=n.expanded===!0?Uf:mv,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||hv(i));return{visible:a,hidden:r.length-a.length}}function Bf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function vv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Wf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function zf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function wv(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(jf,r)?jf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
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
  </div>`}function kv(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pn(e.at):""}
      >${wa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Bf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ff,t.kind)?Ff[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ha(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ws(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Bf(e)}"
          >${vv(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?zf(cp(t.failure_kind,r)):""}
      ${wv(t)}
      ${Wf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ha(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function $v(e){let t=e.cleanup,n=Lr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pn(e.at):""}
      >${wa(e.at)||"\u2014"}</span
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
        ${Fp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${zf(La(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
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
      ${Wf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function xv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?$v(r):kv(r))}
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
  </section>`}function Hf(e,t={}){let n=null;function r(){if(n===null){at(c``,e);return}let a=yv(n.operations,n.cleanup_failures,{expanded:n.expanded});at(xv({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Av=Gt("views:worker"),Sv="tab:worker:ready",Ev="tab:worker:blocked",Tv="tab:worker:in-progress",Cv="tab:worker:resolved",Rv="tab:worker:closed",Wa=1,Gf=5;function Kf(e){return Ms(e).evidence==="published"}var Ov=new Set(["quick_fix","spec_backed","full_plan"]);function Vf(e){return typeof e=="string"&&Ov.has(e)}var Qf="beads-ui.worker.candidate-filter",Ll={show_blocked:!1,spec:"all"};function Lv(){try{let e=window.localStorage.getItem(Qf);if(!e)return{...Ll};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ll};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ll}}}function Iv(e){try{window.localStorage.setItem(Qf,JSON.stringify(e))}catch{}}function Mv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Pv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jf="bdui.worker.candidate_sort",e_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Ml="spec";function t_(e){return e_.some(t=>t.value===e)?e:Ml}function Dv(){try{return t_(window.localStorage.getItem(Jf))}catch{return Ml}}function Nv(e){try{window.localStorage.setItem(Jf,e)}catch{}}var n_="bdui.worker.done-range";function qv(){try{let e=window.localStorage.getItem(n_);return e===null?"today":Hn(e)}catch{return"today"}}function Fv(e){try{window.localStorage.setItem(n_,e)}catch{}}function Yf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function jv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Ar):t==="updated"?r.sort(Ao):(r.sort(So(n)),t==="board"?r:[...r.filter(Kf),...r.filter(s=>!Kf(s))])}function Bv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Uv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Wv="\u{1F512} blocked";function Zf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function zv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Hv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Gv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Kv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Vv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Il(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Yv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Zv=new Set(["waiting_metadata","reviewing","retrying"]);function Xv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?pn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Qv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Jv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Qv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Yv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Xf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ew(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Xf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Xf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=zv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Zf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Zf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function tw(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,_=null,h=null,b={},w=!1,F=!1,W={},Y=null){let ae=!!l&&l.position>0,Z=!!l?.continuation_action&&l.continuation_action.continuation===null,U=!!l&&l.active===!0,q=l&&l.failure||null,H=Gv(l?l.waiting:null,h),S=n[e]||null,M=S&&S.gate?S.gate:null,ne=S&&S.pr?S.pr:null,be=Kv(l?l.resolution:null),Se=Vv(l?l.head_review:null),ce=l&&l.head_review||null,_e=Xv(h,ce),ke=Jv(h,_e),Be=l&&l.authority||null,we=!!ce&&["pending","reviewing","revising"].includes(ce.state),X=!!h&&typeof h=="object"&&Zv.has(h.phase),Te=ae&&!U&&(ce?.state==="failed"||!Be||X||Be.source==="automatic"&&!F),De=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":be?be.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":H,V=!!M&&M.base_badge==="\uCDA9\uB3CC",D=!!M&&M.enabled===!0,me=to({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),xe=Ba(me),Ye=o&&!me&&(o.queueing??null)?o.queueing:null,ie=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!M&&M.tier==="merged",Ue=i&&!!r&&!!M&&M.tier==="merged",mt=Te&&(D||V||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||ie||Ue),ct=i&&V&&u===!1,St=Un(b,e,{external:i,merge_active:U||me?.step==="merge",merge_queued:ae,conflict_active:!!a,cleanup_active:xe,merged:!!r||M?.tier==="merged"}),ft=!!St.operation,O=!ie&&!!r&&r.step==="repo_operations",oe=ew({continuation_required:Z,queueing:Ye,merge_step:me,conflict_badge:De,conflict_live:be?.live===!0||a==="running",head_review:ce&&Se?{...Se,state:ce.state,failure_reason:ce.failure_reason}:null,auto_resolution:_e,recovery:ke,cleanup_failed:r,cleanup_label:r?Lr(r.step):null,base_exception:_,conflicting:V,gate:M,receipt_check:S&&S.receipt_check?S.receipt_check:null,queue_failure:q,auto_skip:d,queued:ae,queue_active:U,queue_position:l?l.position:0,activity:De?null:o&&o.activity||null}),Ie=oe?.live===!0&&oe.title?c`<span title=${oe.title}>${oe.label}</span>`:oe?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&me?.active!==!0?ja(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:w,...Y?{dependency_chips:Y}:{},external:i,pr_number:ne&&typeof ne.number=="number"?ne.number:null,pr_url:ne&&typeof ne.url=="string"?ne.url:"",completion_badge:oe?.live!==!0&&oe?.title?oe.label:null,completion_title:oe?.title||"",completion_repair_pr_url:ke?ke.repair_pr_url:"",completion_repair_pr_number:ke?ke.repair_pr_number:null,badges:Ie?[Ie]:[],live_badge:oe?.live===!0?Ie:null,usage:s,alert:oe?.alert===!0,merge_action:M?.tier==="merged"&&!ie&&!Ue||O?!1:!ae||Z||Te,timeline_action:O,cancel_action:ae&&!Z,cancel_enabled:(!U||we)&&!(ke&&ke.lock_actions),cancel_title:ke&&ke.lock_actions?`${ke.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!we?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":we?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:St,discard_action:St.action,merge_step:me,discard_enabled:St.enabled,discard_title:St.title,merge_enabled:!me&&!Ye&&!a&&!ft&&!_&&!(ke&&ke.lock_actions)&&!ct&&!O&&(D||V||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||ie||Ue||mt||X&&!U),merge_label:Z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ie||Ue?"\uC815\uB9AC \uC7AC\uAC1C":V&&!me&&!ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":M?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ft?St.error?`\uD3D0\uAE30 \uC2E4\uD328: ${St.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${St.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ye?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ct?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":V?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":M?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":D?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:M&&M.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${M&&M.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Pl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:_,doneRange:h,onDoneRangeChange:b}=t,w=r?To(r,i):null,F=Lo({transport:n,uiOrderStore:i}),W=null,Y=[],ae=Lv(),Z=null,U=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},H=Dv(),S=h?Hn(h):qv(),M=new Map;function ne(){let m=jr.find(k=>k.value===S);return m?m.label:"\uC624\uB298"}let be=ba("beads-ui.worker.lane-collapsed"),Se=!1,ce=new Set,_e=new Set,ke=new Set,Be=new Set,we=new Set,X={},Te=null,De=0,V=null,D=[];function me(m){return Te===m?X:{}}async function xe(){if(!n)return;let m=u?.()||"";if(Te===m||V&&V.key===m&&V.generation===De)return;let k=++De;V={key:m,generation:k};let K=null;try{K=await Promise.resolve(n("get-session-defaults",{}))}catch(pe){if(k!==De)return;V=null,Av("get-session-defaults failed: %o",pe),Oe();return}k===De&&(X=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},Te=m,V=null,Oe())}function Ye(){Te=null,De+=1,xe()}let ie=document.createElement("div");ie.className="worker-console";let Ue=document.createElement("div");Ue.className="worker-top";let mt=document.createElement("div");mt.className="worker-drawer-overlay",mt.hidden=!0;let ct=document.createElement("div");ct.className="worker-drawer-overlay__backdrop";let St=document.createElement("div");St.className="worker-drawer-host";let ft=document.createElement("div");ft.className="worker-drawer-host",ft.hidden=!0,mt.append(ct,St,ft);let O=document.createElement("div");O.className="worker-lanes-host",ie.append(Ue,mt,O),e.appendChild(ie);let oe=null,Ie=null,je=es(St,{transport:n,sessionLogStore:a,onClose:()=>{oe=null,Ie=null,mt.hidden=!0,Oe()}}),Xe=Hf(ft,{onClose:()=>{ft.hidden=!0,mt.hidden=!0,Oe()}}),rt=Nf({getWorkspacePath:u||(()=>"")}),yt=u&&u()||"",vt=qf({queueStore:s,transport:n,onChanged:()=>Oe(),onOpenScript:(m,k)=>{rt.open(m,k)}}),re=o?If(ie,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(m,k)=>Ve(m,k)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Wa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function We(){let m=Q(),k=typeof m.serial_lane_count=="number"&&Number.isInteger(m.serial_lane_count)&&m.serial_lane_count>0?Math.min(m.serial_lane_count,5):0,K=Array.isArray(m.serial_lanes)?m.serial_lanes:[],pe=[];for(let Le of K){if(pe.length>=k)break;!Le||typeof Le.id!="string"||!/^s[1-5]$/.test(Le.id)||!Array.isArray(Le.entries)||pe.push({id:Le.id,label:`\uC9C1\uB82C ${Le.id.slice(1)}`,count:Le.entries.length})}return pe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(m.queue)?m.queue:[]).length},...pe]}function ut(m){if(!Z||!m.some(K=>K.id===Z))return null;let k=We();return k?{bead_id:Z,lanes:k}:null}function Ke(){let m=Q();return typeof m.revision=="number"?m.revision:0}function ve(m){m&&m.queue&&s&&s.set(m.queue)}function Ge(){let m=Q().queue;return Array.isArray(m)?m.length:0}async function dt(m,k,K){if(!n)return;let pe=()=>({bead_id:m,...k==="parallel"?{}:{lane:k},...K===void 0?{}:{index:K},expected_revision:Ke()}),Ce=await n("worker-queue-place",pe());ve(Ce),Ce&&Ce.conflict&&await n("worker-queue-place",pe()).then(ve)}async function _t(m,k,K){if(!n)return;let pe=()=>({bead_id:m,...k==="parallel"?{}:{lane:k},to_index:K,expected_revision:Ke()}),Ce=await n("worker-queue-reorder",pe());ve(Ce),Ce&&Ce.conflict&&await n("worker-queue-reorder",pe()).then(ve)}async function gt(m){if(!n)return;let k=await n("worker-queue-remove",{bead_id:m,expected_revision:Ke()});ve(k),k&&k.conflict&&await n("worker-queue-remove",{bead_id:m,expected_revision:Ke()}).then(ve)}async function jt(m){if(!n||!m)return;let k=await n("worker-attempt-pause",{attempt_id:m});k&&k.paused===!1&&k.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Zt(m){if(!n||!m)return;let k=await Vr();if(k===null)return;let K=async(Ce={})=>await n("worker-attempt-resume",{attempt_id:m,expected_revision:Ke(),...k!==""?{instructions:k}:{},...Ce}),pe=await K();ve(pe),pe&&pe.conflict&&(pe=await K(),ve(pe)),pe=await er(pe,(Ce,Le)=>K({continuation:Ce,decision_token:Le}),{onResult:ve,refresh:()=>K()}),pe&&pe.resumed===!1&&!pe.conflict&&pe.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${pe.reason}`,"error",2400)}async function Kt(m){if(!n||!m)return;let k=await n("worker-attempt-dismiss",{attempt_id:m,expected_revision:Ke()});ve(k),k&&k.conflict&&(k=await n("worker-attempt-dismiss",{attempt_id:m,expected_revision:Ke()}),ve(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Et(m,k,K=!0){if(!n)return null;let pe=n,Ce=await pe(m,{...k,expected_revision:Ke()});return ve(Ce),Ce&&Ce.conflict&&K&&(Ce=await pe(m,{...k,expected_revision:Ke()}),ve(Ce)),Ce}async function Ot(m){if(!n||!m)return;let k=Q().merge_queue?.find(pe=>pe.bead_id===m)?.continuation_action;if(k?.mismatch&&k.continuation===null){await qe(m,k.mismatch);return}ce.add(m),Oe();let K;try{K=await Et("worker-merge-queue-add",{bead_id:m})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ce.delete(m),Oe()}if(!(!K||K.applied)){if(K.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Hv(K.reason),"error",2400)}}async function Je(m){if(!(!n||!m||_e.has(m))){_e.add(m),Oe();try{let k=await n("worker-cleanup-retry",{bead_id:m,expected_revision:Ke()});ve(k),k&&!k.retried&&!k.conflict&&k.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{_e.delete(m),Oe()}}}async function qe(m,k){let K=await er({continuation_mismatch:k},(Ce,Le)=>Et("worker-merge-queue-add",{bead_id:m,continuation:Ce,decision_token:Le},!1)),pe=K?.queue?.merge_queue?.find(Ce=>Ce.bead_id===m)?.continuation_action;if(K?.applied!==!0&&pe?.continuation===null&&pe.mismatch){await qe(m,pe.mismatch);return}K&&K.applied===!1&&!K.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function N(m){if(!n)return;let k=await Et("worker-merge-auto-toggle",{on:m});!k||k.conflict||ue(m?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",m?"success":"info",2400)}async function ee(m){if(!n||!m)return;let k=await Et("worker-merge-queue-remove",{bead_id:m});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ye(){await Et("worker-merge-queue-remove",{all:!0})}async function T(m,k=null,K="unmerged",pe=null){if(!n||!m)return;let Ce=zs(m,K);if(!(!!pe||typeof globalThis.confirm!="function"||globalThis.confirm(Ce)))return;let y=await n("worker-discard",{bead_id:m,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:Ke()});if(ve(y),y&&y.conflict&&(y=await n("worker-discard",{bead_id:m,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:Ke()}),ve(y)),y&&y.discarded===!0){ue(ka(y),"success",5e3);return}if(y&&y.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${y.reason}`,"error",2800);return}if(y&&y.accepted&&y.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(y&&y.accepted&&!y.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${y.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}y&&!y.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(m,k,K){if(!(!n||!k||!K||Be.has(k))){Be.add(k),Oe();try{let pe=await n(m,{bead_id:k,action_id:K,expected_revision:Ke()});ve(pe),pe?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!pe?.ok&&pe?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(pe.reason)}`,"error",2800)}finally{Be.delete(k),Oe()}}}async function Me(m,k){if(!n||!k||ke.has(k))return;ke.add(k),Oe();let K;try{let pe=async(Ce={})=>await n(m,{bead_id:k,expected_revision:Ke(),...Ce});K=await pe(),ve(K),K&&K.conflict&&(K=await n(m,{bead_id:k,expected_revision:Ke()}),ve(K)),m==="worker-revise-fix"&&(K=await er(K,(Ce,Le)=>pe({continuation:Ce,decision_token:Le}),{onResult:ve,refresh:()=>pe()}))}finally{ke.delete(k),Oe()}if(!(!K||K.conflict)){if(K.ok){ue(m==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${K.reason||""}`,"error",3e3)}}async function x(m){if(!n)return;let k=await n("worker-automation-toggle",{on:m,expected_revision:Ke()});ve(k),k&&k.conflict&&await n("worker-automation-toggle",{on:m,expected_revision:Ke()}).then(ve)}async function E(m){if(!n||!m)return;let k=await n("worker-repo-operation-repair",{operation_id:m});if(ve(k),k&&k.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function J(m){if(!n||!m)return;let k=await n("worker-repo-operation-dismiss",{operation_id:m});ve(k),k&&k.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function fe(m){if(!n||!Number.isFinite(m))return;let k=Math.max(Wa,Math.floor(m)),K=await n("worker-queue-set-slots",{slots:k,expected_revision:Ke()});ve(K),K&&K.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:Ke()}).then(ve)}async function Ee(m){if(!n||!Number.isInteger(m)||m<1||m>Gf)return;let k=Q(),K=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(m).reduce((Le,y)=>Le+(Array.isArray(y?.entries)?y.entries.length:0),0),pe=()=>({count:m,expected_revision:Ke()}),Ce=await n("worker-queue-set-serial-lane-count",pe());ve(Ce),Ce&&Ce.conflict&&(Ce=await n("worker-queue-set-serial-lane-count",pe()),ve(Ce)),Ce&&Ce.applied&&K>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${K}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Fe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function A(m,k){let K=cl(m,k.id,q);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:K.kind==="note"?{kind:"note",text:K.text}:K.kind==="disabled"?{kind:"disabled",label:Fe,title:K.title}:{kind:"place",label:Fe,title:K.title}}}function P(m,k){if(!U||U.bead_id!==m)return null;let K=U.counterpart_id,pe=k.filter(Ce=>Ce.id===K);return pe.length===0?null:{rows:pe.map(Ce=>A(m,Ce))}}async function $e(m,k){let K=cl(m,k,q);if(U=null,K.kind!=="ops"){Oe();return}let pe=Ke();for(let Ce of K.ops){let Le=await Ze(Ce,pe);if(Le===null)break;pe=Le}Oe()}async function Ze(m,k){if(!n)return null;try{let K=await n("worker-queue-place",{bead_id:m.bead_id,lane:m.lane,index:m.index,expected_revision:k});if(ve(K),K&&K.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!K||K.applied!==!0)return ue(K&&typeof K.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${K.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let pe=K.queue?K.queue.revision:void 0;return typeof pe!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):pe}catch(K){return ue(K instanceof Error&&K.message?K.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function de(){let m=Q(),k=w?w.selectBoardColumn(Sv,"ready"):[],K=w?w.selectBoardColumn(Ev,"blocked"):[],pe=w?w.selectBoardColumn(Rv,"closed"):[],Ce=w?w.selectBoardColumn(Tv,"in_progress"):[],Le=w?w.selectBoardColumn(Cv,"resolved"):[],y=Ro([...k,...K,...Ce,...Le,...pe]),te=new Map;for(let f of[...k,...K,...Ce])f&&f.id&&!te.has(f.id)&&te.set(f.id,f);let j={...me(u?.()||"")};for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){let L=m[f];typeof L=="string"&&(j[f]=L)}function Ae(f,L){let le=te.get(f);if(!le)return null;let He=le.metadata&&typeof le.metadata=="object"?le.metadata:{},Qe=le.workflow?.route,Jt=He.route,Pt=Vf(Qe)?Qe:Vf(Jt)?Jt:null;return kn({pin:He,global:j,execution_defaults:m.execution_defaults??null,runner_catalog:m.runner_catalog??null,route:Pt,controller_runtime:L})}function nt(f){let L=f.runner||null,le=Ae(f.bead_id,L),He=Gs(f),Qe=le?_r(le,L):null;return He||Qe?{orchestration:He,worker:Qe}:null}let tt=new Map;function it(f){if(tt.has(f))return tt.get(f)??null;let L=Ae(f,null),le=null;if(L){let He=Bn(m.runner_catalog??null,L.orchestration_model.value??""),Qe=He===null?L:Ae(f,He),Jt=Rr(Qe,m.runner_catalog??null),Pt=_r(Qe,He);le=Jt||Pt?{orchestration:Jt,worker:Pt}:null}return tt.set(f,le),le}let lt=new Map;function kt(f){if(lt.has(f))return lt.get(f)??null;let L=te.get(f),le=L&&L.metadata&&typeof L.metadata=="object"?L.metadata:null,He=le?ts(le):null;return lt.set(f,He),He}function on(f){let L=Oo(y,f);return L.total===0?null:L}let ls=m.bead_titles||{},un=new Map;for(let[f,L]of Object.entries(ls))typeof L=="string"&&L.length>0&&un.set(f,L);for(let f of[...k,...K])un.set(f.id,f.title||f.id);let p=new Map;for(let f of[...k,...K,...Ce,...Le,...pe])f&&f.id&&typeof f.from_id=="string"&&p.set(f.id,f.from_id);let g=new Map;for(let f of[...k,...K,...Ce,...Le,...pe])f&&f.id&&typeof f.priority=="number"&&g.set(f.id,f.priority);let v=m.bead_times&&typeof m.bead_times=="object"&&!Array.isArray(m.bead_times)?m.bead_times:{},$=m.bead_labels&&typeof m.bead_labels=="object"&&!Array.isArray(m.bead_labels)?m.bead_labels:{},B=m.bead_workflow&&typeof m.bead_workflow=="object"&&!Array.isArray(m.bead_workflow)?m.bead_workflow:{},z=new Map;for(let[f,L]of Object.entries($))Array.isArray(L)&&z.set(f,Cl(L));for(let f of[...k,...K]){let L=f.labels;Array.isArray(L)&&!z.has(f.id)&&z.set(f.id,Cl(L))}let se=new Map,he=o?.get()?.last_good?.result?.groups;for(let f of Array.isArray(he)?he:[]){if(f?.eligible!==!0||!Array.isArray(f.members))continue;let L=f.members.map(He=>{let Qe=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).find(Jt=>Jt.entries.some(Pt=>Pt.bead_id===He));return Qe?Qe.id:null});if(!(L.every(He=>He!==null)&&new Set(L).size===1))for(let He of f.members)se.set(He,f.members.filter(Qe=>Qe!==He))}let et=m.bead_blocked_by&&typeof m.bead_blocked_by=="object"&&!Array.isArray(m.bead_blocked_by)?m.bead_blocked_by:{},pt=m.blocker_workspaces&&typeof m.blocker_workspaces=="object"&&!Array.isArray(m.blocker_workspaces)?m.blocker_workspaces:{},sn=new Map;for(let[f,L]of Object.entries(v))L&&typeof L=="object"&&sn.set(f,L);for(let f of[...k,...K])sn.set(f.id,{created_at:f.created_at,updated_at:f.updated_at});let Ct=f=>sn.get(f)||{},En=m.pr_wait||[],Re=m.pr_observations||{},ht=m.pr_activity||{},dn=m.cleanup_failed||{},Fl=Object.entries(dn).map(([f,L])=>({bead_id:f,step:L&&L.step?L.step:"",reason:L&&L.reason?L.reason:"",at:L&&typeof L.at=="number"?L.at:null,detail:L&&typeof L.detail=="string"?L.detail:null,output_tail:L&&typeof L.output_tail=="string"&&L.output_tail?L.output_tail:void 0,log_path:L&&typeof L.log_path=="string"&&L.log_path?L.log_path:void 0,retry_count:L&&typeof L.retry_count=="number"&&Number.isInteger(L.retry_count)&&L.retry_count>0?L.retry_count:0,failure_code:L&&typeof L.failure_code=="string"?L.failure_code:void 0,subject_id:L&&typeof L.subject_id=="string"?L.subject_id:void 0,repair_eligible:!!(L&&L.repair_eligible),repair:L&&L.repair?L.repair:void 0})),jl=m.queue||[],m_=new Set([...jl.map(f=>f.bead_id),...(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).flatMap(f=>(Array.isArray(f?.entries)?f.entries:[]).map(L=>L.bead_id)),...En.map(f=>f.bead_id),...m.done.map(f=>f.bead_id)]),g_=new Set(K.map(f=>f.id)),b_=i?i.get()?.order||{}:{},Bl=new Set,Ul=[];for(let f of[...k,...K])m_.has(f.id)||Bl.has(f.id)||Bv(f)||(Bl.add(f.id),Ul.push(f));Y=jv(Ul,H,b_);let h_=m.admission||{},Wl=f=>{let L=h_[f];if(!L)return"";if(L.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof L.reason=="string"?L.reason:"",He=le.indexOf(":");return He>0&&He<le.length-1?`\u26D4 ${le.slice(0,He)} (${le.slice(He+1)})`:`\u26D4 ${le}`},zl=new Map,y_=Y.map(f=>{let L=Ms(f),le=L.evidence==="published",He=f.workflow?.route==="quick_fix"||f.metadata&&f.metadata.route==="quick_fix",Qe=!Object.hasOwn(f,"description")||typeof f.description=="string"&&f.description.trim().length>0,Jt=Object.hasOwn(f,"labels")&&Of(f.labels),Pt=Jt||!Object.hasOwn(f,"labels")?"":Lf(f.labels,f.metadata),Nr=Pt.length>0,Dt=!Jt&&(He?Qe:le&&!L.conflict),_o=g_.has(f.id),Xn=[];if(_o){let mo=Uv(f);mo.length>0?zl.set(f.id,mo):Xn.push(Wv)}He&&!Qe?Xn.push("missing_description"):!He&&L.conflict?Xn.push("spec_id_conflict"):!He&&L.evidence==="none"?Xn.push("spec \uC5C6\uC74C"):!He&&L.evidence==="draft"&&Xn.push("spec \uBBF8\uBC1C\uD589(draft)");let qr=Wl(f.id);return qr&&Xn.push(qr),{id:f.id,title:f.title||f.id,reason:Xn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:f.created_at,updated_at:f.updated_at,workflow:f.workflow,is_quick_fix:He,status:f.status,worker_ineligible:Jt,session_preferred:Nr,session_preferred_reason:Pt,blocked:_o,has_spec:le,exec_chips:it(f.id),rec:kt(f.id),from_id:f.from_id||void 0,priority:g.get(f.id)}}),za=Mv(y_,ae),Ha=za.visible,v_=m.revise_parked||{},oo=m.discard_operations&&typeof m.discard_operations=="object"&&!Array.isArray(m.discard_operations)?m.discard_operations:{},w_=f=>{let L=B[f]?.chips?.pr;return L&&typeof L.number=="number"&&typeof L.url=="string"?{pr_number:L.number,pr_url:L.url}:{}},Ga=(f,L)=>f.map((le,He)=>{let Qe=L!=="done",Jt=L!=="done"&&L!=="queue",Pt=Qe?v_[le.bead_id]:null,Nr=Qe?Un(oo,le.bead_id):null,Dt=Nr?.operation?Nr:null,_o=Qe&&z.get(le.bead_id)===!0,Xn=m.admission&&typeof m.admission=="object"?m.admission[le.bead_id]:null,qr=Qe?tp(Xn,!!Dt||Be.has(le.bead_id)):null,mo=Qe&&!qr?Wl(le.bead_id):null,M_=Qe?[mo]:[],vc=[],ni=Qe?se.get(le.bead_id):void 0;return ni&&ni.length>0&&vc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ni.join(", ")}\uC640`),{id:le.bead_id,title:un.get(le.bead_id)||le.bead_id,reason:M_.filter(Boolean).join(" \xB7 "),draggable:Qe&&!Dt&&!qr,done:L==="done",lane:L,seq:Jt?He+1:void 0,worker_serial:_o,discard:Dt,stale_work:qr,badges:[...vc,...Pt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...L==="done"?ya(m.attempts||{},le.bead_id):[]],alert:!!Pt,revise_action:!!Pt,revise_enabled:!!Pt&&!Dt&&!ke.has(le.bead_id),revise_title:Pt?Pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:L==="done"?Ln(m.attempts||{},le.bead_id):null,work_ms:L==="done"?va(m.attempts||{},le.bead_id):null,done_at:L==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:Qe?it(le.bead_id):null,rec:kt(le.bead_id),workflow:Qe&&B[le.bead_id]||null,...L==="done"?w_(le.bead_id):{},from_id:p.get(le.bead_id)||void 0,priority:g.get(le.bead_id),...Ct(le.bead_id)}}),Mr=m.attempts?Object.values(m.attempts).filter(Or):[],Ka=new Set;for(let f of Mr)f&&typeof f.resumed_from=="string"&&f.resumed_from.length>0&&Ka.add(f.resumed_from);let Hl=new Map;for(let f of Mr)Hl.set(f.bead_id,f.attempt_id);let cs=new Map;for(let f of Mr)cs.set(f.attempt_id,f);function Va(f){let L=new Set,le=f;for(;le&&!L.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;L.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&cs.get(le.resumed_from)||null}return!1}let ao=typeof m.declared_base=="string"?m.declared_base:null;function k_(f){let L=null;for(let le of Mr)!le||le.bead_id!==f||Va(le)||(L===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof L.started_at=="number"?L.started_at:0))&&(L=le);return L&&typeof L.target_base=="string"?L.target_base:null}let Ya=[],io=[],$_=Rf(m),Gl=f=>{let L=typeof f.session_id=="string"&&f.session_id.length>0,le=Ka.has(f.attempt_id);return{eligible:L&&!le,reason:L?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Mn=null;for(let f of Mr){let L=f.status==="paused"&&!Ka.has(f.attempt_id);if(f.status==="running"||L)io.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:un.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,paused:L,conflict_resolution:Va(f),base_exception:Il(ao,f.target_base),can_pause:typeof f.session_id=="string"&&f.session_id.length>0,discard:Un(oo,f.bead_id,{attempt_id:f.attempt_id}),workflow:B[f.bead_id]||null,priority:g.get(f.bead_id),usage:Ln(m.attempts||{},f.bead_id),rollup:on(f.bead_id),rollup_expanded:we.has(f.bead_id),exec_chips:nt(f),rec:kt(f.bead_id),...Ct(f.bead_id)});else if((f.status==="failed"||f.status==="orphaned")&&$_(f)){let le=Gl(f);Ya.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:un.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,failed:!0,status:f.status,status_label:f.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Un(oo,f.bead_id,{attempt_id:f.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:Va(f),base_exception:Il(ao,f.target_base),workflow:B[f.bead_id]||null,priority:g.get(f.bead_id),usage:Ln(m.attempts||{},f.bead_id),rollup:on(f.bead_id),rollup_expanded:we.has(f.bead_id),exec_chips:nt(f),rec:kt(f.bead_id),...Ct(f.bead_id)}),Mn=f}}let Kl=new Set([...Ya,...io].map(f=>f.bead_id)),Vl=new Map;for(let f of Array.isArray(m.session_active)?m.session_active:[]){let L=f&&f.bead_id;if(!(typeof L!="string"||L.length===0||Kl.has(L))){if(Kl.add(L),Array.isArray(f.blocked_by)){let le=f.blocked_by.filter(He=>typeof He=="string"&&He.length>0);le.length>0&&Vl.set(L,le)}io.push({bead_id:L,attempt_id:null,kind:"session",title:f.title||un.get(L)||L,status:"in_progress",started_at:Dn(f.started_at)??Dn(f.updated_at),updated_at:Dn(f.updated_at),workflow:f.workflow||null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],priority:g.get(L),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:kt(L),usage:null,rollup:null,rollup_expanded:!1})}}let Pr=[...Ya,...io].map(f=>{let L=cs.get(f.attempt_id),le=L?.quickfix_landing;if(L?.quickfix_lane!==!0||!le||typeof le!="object")return f;let He=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,Qe=to({bead_id:L.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:He?{step:le.cursor,reason:He}:null,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]});return Qe?{...f,landing:Qe}:f}),Yl=null;if(Mn){let f=Gl(Mn),L=Mn.cause_detail;Yl={bead_id:Mn.bead_id,repo:Mn.repo||"",reason:Mn.cause||Mn.status,cause_detail:L&&typeof L.reason=="string"?{reason:L.reason,command:typeof L.command=="string"?L.command:null}:null,resume_attempt_id:Mn.attempt_id,resume_eligible:f.eligible,resume_reason:f.reason,discard:Un(oo,Mn.bead_id,{attempt_id:Mn.attempt_id})}}let Zl=new Set(Pr.map(f=>f.bead_id)),Za=Array.isArray(m.merge_queue)?m.merge_queue:[],Xl=new Map,Ql=new Map,Jl=new Map,ec=new Map,tc=new Map;Za.forEach((f,L)=>{f&&typeof f.bead_id=="string"&&(Xl.set(f.bead_id,L+1),Ql.set(f.bead_id,f.resolution),Jl.set(f.bead_id,f.continuation_action||null),ec.set(f.bead_id,f.head_review||null),tc.set(f.bead_id,f.authority||null))});let Dr=m.merge_queue_state||{active:null,failures:{}},x_=Dr.failures||{},nc=Dr.waiting&&typeof Dr.waiting.bead_id=="string"&&typeof Dr.waiting.reason=="string"?Dr.waiting:null,A_=m.auto_merge_skips||{},rc=f=>{let L=A_[f];if(!L)return null;let le=Re[f],He=le&&le.pr?le.pr.head_sha:null;return He&&He===L.head_sha?L.reason||"":null},lo=new Map;for(let f of Pr)f.failed!==!0&&f.conflict_resolution&&(f.paused?lo.has(f.bead_id)||lo.set(f.bead_id,"paused"):lo.set(f.bead_id,"running"));let sc=Pr.filter(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0).length,oc=(m.workspace_info||{}).slots,ac=typeof oc=="number"?oc:typeof m.slots=="number"?m.slots:Wa,S_=sc>ac,co=$r(S),E_=(Array.isArray(m.done)?m.done.slice():[]).filter(f=>co===void 0||typeof f.added_at!="number"||f.added_at>=co).sort((f,L)=>(L.added_at||0)-(f.added_at||0)),us=Ga(E_,"done"),T_=new Set((Array.isArray(m.done)?m.done:[]).map(f=>f?.bead_id).filter(f=>typeof f=="string")),ic=[],C_=u?.()||"";for(let f of pe){let L=Dn(f.closed_at);if(typeof f.id!="string"||T_.has(f.id)||L===null||co!==void 0&&L<co||typeof f.comment_count!="number"||f.comment_count<=0)continue;let le=`${C_}\0${f.id}\0${String(f.updated_at)}\0${f.comment_count}`,He=M.get(le);if(He===void 0&&n&&(M.set(le,"pending"),Promise.resolve(n("get-comments",{id:f.id})).then(Qe=>{let Jt=Array.isArray(Qe)&&Qe.some(Pt=>na(typeof Pt?.text=="string"?Pt.text:"")?.lane==="session");M.set(le,Jt?"session":"not-session"),Oe()}).catch(()=>{M.set(le,"failed"),Oe()})),He==="session"){let Qe=Dn(f.started_at);ic.push({id:f.id,title:f.title||f.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Qe!==null&&L>=Qe?L-Qe:null,work_kind:"session",done_at:L,created_at:f.created_at,updated_at:f.updated_at})}}us.push(...ic),us.sort((f,L)=>(L.done_at||0)-(f.done_at||0));let uo={};for(let f of Kn)uo[f]=0;let lc=!1,cc=0,Xa=0,uc=0;for(let f of us){let L=f.usage;if(L&&typeof L=="object"){let le=!1;for(let He of Kn)Number.isFinite(L[He])&&(uo[He]+=L[He],lc=!0,le=!0);le&&(Xa+=1,Number.isFinite(L.total_cost_usd)&&(cc+=L.total_cost_usd,uc+=1))}}Xa>0&&uc===Xa&&(uo.total_cost_usd=cc);let dc=us.map(f=>f.usage).filter(f=>f&&typeof f=="object"&&f.providers),R_=dc.length>0?fn(Uo(dc)):lc?tr(uo):null,pc=m.lane_states&&typeof m.lane_states=="object"&&!Array.isArray(m.lane_states)?m.lane_states:{},fc=Array.isArray(m.serial_lanes)?m.serial_lanes:[],_c=f=>{if(En.some(He=>He.bead_id===f))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let L=Mr.filter(He=>He&&He.bead_id===f),le=L.length>0?L[L.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},po=fc.filter(f=>f&&typeof f.id=="string"&&Array.isArray(f.entries)).map((f,L)=>{let le=pc[f.id]||{},He=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(Dt=>Dt&&typeof Dt.bead_id=="string"&&typeof Dt.after=="string").map(Dt=>[Dt.bead_id,Dt.after])),Qe=Array.isArray(le.occupied_by)?le.occupied_by.filter(Dt=>typeof Dt=="string"):[],Jt=new Set(Qe),Pt=Ga(f.entries.filter(Dt=>!Zl.has(Dt.bead_id)&&!Jt.has(Dt.bead_id)),f.id).map(Dt=>He.has(Dt.id)?{...Dt,badges:[`\u{1F517} ${He.get(Dt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Dt.badges]}:Dt),Nr=Qe.map(Dt=>({id:Dt,title:un.get(Dt)||Dt,draggable:!1,lane:f.id,ghost:!0,badges:[_c(Dt)]}));return{id:f.id,index:L+1,rows:[...Nr,...Pt],occupied:Qe.length>0,badge:Qe.length>0?_c(Qe[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),mc=typeof m.serial_lane_count=="number"?m.serial_lane_count:po.length,Qa=Ga(jl.filter(f=>!Zl.has(f.bead_id)),"queue"),gc=new Map,bc=new Set;for(let[f,L]of Object.entries(pc)){if(!/^s[1-5]$/.test(f))continue;let le=L&&Array.isArray(L.occupied_by)?L.occupied_by:[];for(let He of le)typeof He=="string"&&gc.set(He,f);le.length>0&&bc.add(f)}let ir=[];for(let f of Pr)typeof f.bead_id=="string"&&ir.push({id:f.bead_id,title:un.get(f.bead_id)||f.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:gc.get(f.bead_id)??null});for(let f of En){let L=f&&f.bead_id;typeof L!="string"||L.length===0||ir.push({id:L,title:un.get(L)||L,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let f of po)for(let L of f.rows)L.ghost!==!0&&ir.push({id:L.id,title:L.title,location_label:`${f.id} #${L.seq??""}`.trim(),kind:"serial",lane_id:f.id});Qa.forEach((f,L)=>{ir.push({id:f.id,title:f.title,location_label:`#${L+1}`,kind:"parallel",lane_id:null})});for(let f of Ha)ir.push({id:f.id,title:f.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let hc={};for(let f of fc)f&&typeof f.id=="string"&&Array.isArray(f.entries)&&(hc[f.id]=f.entries.length);let Ja=new Map;for(let f of ir)Ja.has(f.id)||Ja.set(f.id,f);q={members_by_id:Ja,serial_raw_lengths:hc,serial_lane_count:mc,occupied_lanes:bc};let O_=op(m.bead_scope,ir),fo=new Map;for(let[f,L]of Vl)fo.set(f,L);for(let[f,L]of zl)fo.set(f,L);for(let[f,L]of Object.entries(et))Array.isArray(L)&&fo.set(f,L.filter(le=>typeof le=="string"&&le.length>0));let L_=Bp(fo,ir,pt),ei=(f,L=null)=>{let le=O_.get(f),He=L_.get(f)||null,Qe=le&&le.overlaps.length>0?le.overlaps:null,Jt=!!le&&le.scope_missing;if(!He&&!Qe&&!Jt)return L;let Pt=Qe?P(f,Qe):null;return{...L||{},...He?{predecessors:He}:{},...Qe?{overlaps:Qe}:{},...Jt?{scope_missing:!0}:{},...Pt?{popover:Pt}:{}}},ti=f=>{let L=ei(f.id,f.dependency_chips||null);return L&&(f.dependency_chips=L),f};for(let f of Qa)ti(f);for(let f of po)for(let L of f.rows)L.ghost!==!0&&ti(L);for(let f of Ha)ti(f);let yc=new Map;for(let f of Pr){let L=typeof f.bead_id=="string"?f.bead_id:"";if(L.length===0)continue;let le=f.kind==="session",He=ei(L),Qe=typeof f.attempt_id=="string"&&f.attempt_id.length>0?cs.get(f.attempt_id):void 0,Jt=Qe&&Qe.last_activity&&typeof Qe.last_activity=="object"?Qe.last_activity:null,Pt=Qe&&Array.isArray(Qe.legs)?Qe.legs:[];!He&&!Jt&&Pt.length===0&&!le||yc.set(L,{...Jt?{last_activity:Jt}:{},...Pt.length>0?{legs:Pt}:{},...He?{dependency_chips:He}:{}})}let I_=En.map(f=>tw(f.bead_id,un.get(f.bead_id)||f.bead_id,Re,dn[f.bead_id]||null,Ln(m.attempts||{},f.bead_id),ht[f.bead_id]||(ce.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:_e.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lo.get(f.bead_id)||null,f.external===!0,{position:Xl.get(f.bead_id)||0,active:Dr.active===f.bead_id,failure:x_[f.bead_id]||null,waiting:nc?.bead_id===f.bead_id?nc.reason:null,resolution:Ql.get(f.bead_id),continuation_action:Jl.get(f.bead_id),head_review:ec.get(f.bead_id)||null,authority:tc.get(f.bead_id)||null},f.wt_present!==!1,m.auto_merge===!0?rc(f.bead_id):null,Il(ao,k_(f.bead_id)),m.completion_status&&typeof m.completion_status=="object"&&!Array.isArray(m.completion_status)&&m.completion_status[f.bead_id]||null,m.discard_operations&&typeof m.discard_operations=="object"&&!Array.isArray(m.discard_operations)?m.discard_operations:{},cs.get(Hl.get(f.bead_id)||"")?.worker_serial===!0,m.auto_merge===!0,{merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]},ei(f.bead_id))).map(f=>({...f,workflow:B[f.id]||null,priority:g.get(f.id),...Ct(f.id)}));return{queue:m,idToTitle:un,candidates:Ha,candidate_hidden:{blocked:za.hidden_blocked,spec:za.hidden_spec},running:Pr,live_count:sc,slots:ac,over_cap:S_,failure:Yl,waiting:Qa,serial_lanes:po,serial_lane_count:mc,running_overlays:yc,pr_wait:I_,merge_queue_length:Za.length,merge_queue_running:Za.length>0,auto_excluded:En.map(f=>f.bead_id).filter(f=>rc(f)!==null),declared_base:ao,done:us,token_total:R_,cleanup_failures:Fl,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]}}function st(){let k=!!o?.get()?.job,K=!k&&o?.isPending?.()===!0,pe=k?"\uBD84\uC11D \uC911":K?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${pe?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${pe?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${pe?c`<span class="worker-analysis-btn__badge">${pe}</span>`:""}
    </button>`}function bt(m){let k=m.waiting.length>0?m.waiting[0].id:"\u2014",K=c`<button
      type="button"
      class="worker-play${m.queue.auto_advance?" is-active":""}"
    >
      ${m.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,pe=Lt(m),Ce=m.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Le=m.queue.auto_advance?0:(Array.isArray(m.queue.queue)?m.queue.queue:[]).filter(it=>it&&typeof it.armed_by_lane=="string"&&it.armed_by_lane.length>0).length,y=Le>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Le}건 진행 중</span
          >`:"",te=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${m.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${m.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${ne()} 완료 <b>${m.done.length}</b></span
      >`,j=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${m.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${m.declared_base||"?"}</span
    >`,Ae=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Wa}
          step="1"
          .value=${String(m.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Gf},(it,lt)=>lt+1).map(it=>c`<option
                value=${String(it)}
                ?selected=${m.serial_lane_count===it}
              >
                ${it}
              </option>`)}
        </select>
      </label>
      ${o?st():""} `,nt=dp({failure:m.failure}),tt=ep(m.repo_operations,m.cleanup_failures);return Se?c`<div class="worker-ribbon">
          ${K} ${pe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ce}${y}${te}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ae}</div>
          <div class="worker-kpi">${j}</div>
        </div>
        ${tt}${vt.template()}${nt}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${K}${pe}${Ae}</div>
        <div class="worker-kpi">
          ${Ce}${y}${te}${j}
          ${(Array.isArray(m.token_total)?m.token_total:m.token_total?[{label:m.token_total,tooltip:`${ne()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(it=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${it.tooltip}
                >${ne()} 완료 · 누적 ${it.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${tt}${vt.template()}${nt}`}function At(m){let k=m.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${ae.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Pv.map(K=>c`<button
              type="button"
              class="worker-filter__chip${ae.spec===K.value?" is-active":""}"
              data-spec=${K.value}
              aria-pressed=${ae.spec===K.value?"true":"false"}
            >
              ${K.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function Mt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${H}
    >
      ${e_.map(m=>c`<option value=${m.value} ?selected=${H===m.value}>
            ${m.label}
          </option>`)}
    </select>`}function Ht(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${S}
      >
        ${jr.map(m=>c`<option value=${m.value} ?selected=${S===m.value}>
              ${m.label}
            </option>`)}
      </select>
    </div>`}function Lt(m){let k=m.queue.auto_merge===!0;if(m.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${m.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let K=new Set(m.auto_excluded),pe=m.pr_wait.filter(Ce=>Ce.merge_action&&Ce.merge_enabled&&!K.has(Ce.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${pe>0?` ${pe}`:""}
    </button>`}function mn(m){return Ta({parallel:{rows:m.waiting.map(k=>Wn(k)),count:m.waiting.length,collapsed:be.isAreaCollapsed("parallel")},serial:{lanes:m.serial_lanes.map(k=>({id:k.id,title:`\uC9C1\uB82C ${k.index}`,rows:k.rows.map(K=>Wn(K)),count:k.rows.length,empty:k.rows.length===0,badge:k.badge,held:k.occupied,cycle:k.cycle})),collapsed:be.isAreaCollapsed("serial")}})}function Nt(m){return pp(m.running,Date.now(),oe,m.running_overlays)}function an(m){return m.running.some(k=>k.kind!=="session"&&!k.paused&&k.failed!==!0)}function ln(m){let k=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:m.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Mt(),controls:At(m),collapsible:!0,collapsed:be.isCollapsed("candidate"),place_menu:ut(m.candidates),onOpenDoc:_?(pe,Ce)=>_(Ce):void 0}),K=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:m.done,empty:`${ne()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ht(),collapsible:!0,collapsed:be.isCollapsed("done"),preview:Se?Array.isArray(m.token_total)?m.token_total.map(pe=>pe.label).join(" \xB7 "):m.token_total||Yf(m.done):void 0});return Se?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ca({live:an(m),running_body:m.running.length>0?Nt(m):"",pr_wait_rows:m.pr_wait.map(pe=>Wn(pe)),count:m.running.length+m.pr_wait.length})}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:m.waiting,count:m.waiting.length,collapsible:!0,collapsed:be.isCollapsed("queue"),preview:Yf(m.waiting),body:mn(m)})}
        ${k} ${K}
      </div>`:c`<div class="worker-lanes">
      ${k}
      ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:m.waiting,count:m.waiting.length,collapsible:!0,collapsed:be.isCollapsed("queue"),body:mn(m)})}
      ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:m.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${m.slots}</span
        >`,live:an(m),collapsible:!0,collapsed:be.isCollapsed("running"),body:Nt(m)})}
      ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:m.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:be.isCollapsed("pr_wait")})}
      ${K}
    </div>`}function Xt(m){be.toggle(m),Oe()}function cn(m){be.toggleArea(m),Oe()}function Oe(){let m=de();at(bt(m),Ue),at(ln(m),O)}function Pe(){let m=!0,k=ga(K=>{if(Se=K,m){m=!1;return}Oe()});D.push(k)}let R=null;function ge(m){R=m.target instanceof Element?m.target:null}function Ne(m){let K=m.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!K)return;if(R&&K.contains(R)&&R.closest("input, button, a")){m.preventDefault();return}let pe=K.dataset.beadId||"",Ce=K.dataset.lane||"";W={bead_id:pe,from_lane:Ce},ie.classList.add("is-dragging");try{m.dataTransfer?.setData("text/plain",pe),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}function xt(m){let k=m.target?.closest?.(".worker-pane");if(!k)return;let K=k.dataset.lane||"";K!=="candidate"&&K!=="queue"&&!/^s[1-5]$/.test(K)||(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function Bt(m){m.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Tt(){ie.classList.remove("is-dragging")}function Qt(m,k){let K=Y.find(y=>y.id===m);if(!K)return;let pe=Y.filter(y=>y.id!==m),Ce=pe.length;if(k){let y=k.dataset.beadId;if(y===m)return;let te=pe.findIndex(j=>j.id===y);te>=0&&(Ce=te)}let Le=pe.slice();Le.splice(Ce,0,K),F.applyReorder(m,Le,Ce)}function Ut(m){let k=m.target?.closest?.(".worker-pane");if(!k)return;m.preventDefault(),k.classList.remove("worker-pane--drag-over"),ie.classList.remove("is-dragging");let K=k.dataset.lane||"",pe=W?.bead_id||m.dataTransfer?.getData("text/plain")||"",Ce=W?.from_lane||"";if(W=null,!pe)return;let Le=m.target?.closest?.(".worker-mini, .worker-card"),y=K==="queue"&&k.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||k,te=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),j=te.length;if(Le){let Ae=te.indexOf(Le);Ae>=0&&(j=Ae)}if(j=Math.max(0,j-y.querySelectorAll(".worker-mini--ghost").length),k.classList.contains("worker-pane--collapsed")&&(j=Ge()),K==="candidate"){if(Ce==="candidate"){Qt(pe,Le);return}(Ce==="queue"||/^s[1-5]$/.test(Ce))&&gt(pe);return}if(K==="queue"||/^s[1-5]$/.test(K)){let Ae=K==="queue"?"parallel":K;Ce===K?_t(pe,Ae,j):dt(pe,Ae)}}function rn(m){ae=m,Iv(m),Oe()}function xn(m){H=t_(m),Nv(H),Oe()}function qt(m){S=Hn(m),Fv(S),b?.(S),Oe()}function An(m){let k=m.target?.closest?.(".worker-serial-lane-count");if(k){let te=Number.parseInt(k.value,10);Number.isFinite(te)&&Ee(te).then(Oe);return}let K=m.target?.closest?.(".worker-filter__blocked");if(K){rn({...ae,show_blocked:K.checked});return}let pe=m.target?.closest?.(".worker-done-range");if(pe){qt(pe.value);return}let Ce=m.target?.closest?.(".worker-sort");if(Ce){xn(Ce.value||Ml);return}let Le=m.target?.closest?.(".worker-slots__input");if(!Le)return;let y=Number.parseInt(Le.value,10);if(!Number.isFinite(y)){Oe();return}fe(y).then(Oe)}function Sn(m){return m?{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,worktree:m.worktree||void 0,status:m.status||void 0,session_id:m.session_id||void 0}:{}}function Zn(){let m=de();return{operations:m.repo_operations,cleanup_failures:m.cleanup_failures,repo:u&&u()||""}}function C(){oe&&je.close(),ft.hidden=!1,mt.hidden=!1,Xe.open(Zn()),Oe()}function I(m){let k=Q(),K=k.attempts?k.attempts[m]:null;oe=m,Ie=null,Xe.close(),ft.hidden=!0,mt.hidden=!1,je.open({attempt_id:m,meta:Sn(K)}),Oe()}function ze(m){let k=Q(),K=(Array.isArray(k.session_active)?k.session_active:[]).find(Ce=>Ce&&Ce.bead_id===m),pe=(K&&Array.isArray(K.session_refs)?K.session_refs:[]).find(Ce=>Ce&&Ce.current===!0);pe&&(Xe.close(),ft.hidden=!0,mt.hidden=!1,je.open(Yr(pe,m,"in_progress")),Oe())}function Ve(m,k){oe=null,Ie=m,Xe.close(),ft.hidden=!0,mt.hidden=!1,je.open({attempt_id:m,meta:k,hide_prompt:!0}),Oe()}function ot(){if(Xe.isOpen()&&Xe.refresh(Zn()),Ie){let K=(o?.get()?.runs||[]).find(pe=>pe.run_id===Ie);K?je.updateMeta(Ol(K)):je.close();return}if(!oe)return;let m=Q(),k=m.attempts?m.attempts[oe]:null;if(k){je.updateMeta(Sn(k));return}je.close()}function wt(m,k){if(m.length===0||!l)return;let K=u?u():void 0;if(k.length===0||!K||k===K||!d){l(m);return}Promise.resolve(d(k)).then(()=>{l(m)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function en(m){let k=m.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-parallel-analysis-dialog"))return;let K=k?.closest?.(".worker-dep__open");if(K){wt(K.getAttribute("data-dep-id")||"",K.getAttribute("data-root-dir")||"");return}let pe=k?.closest?.(".mon-overlap__chip");if(pe){let Re=pe.closest("[data-bead-id]"),ht=Re&&Re.getAttribute("data-bead-id")||"";if(ht){let dn=pe.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===ht&&U.counterpart_id===dn?null:{bead_id:ht,counterpart_id:dn},Oe()}return}let Ce=k?.closest?.(".mon-overlap__place");if(Ce){let Re=Ce.closest("[data-bead-id]"),ht=Re&&Re.getAttribute("data-bead-id")||"";ht&&$e(ht,Ce.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-analysis-btn")){re?.open();return}if(k?.closest?.(".worker-repo-strip")||k?.closest?.(".worker-mini__timeline")){C();return}let Le=k?.closest?.(".worker-repo-op__session");if(Le){let Re=Le.dataset.attemptId;Re&&I(Re);return}let y=k?.closest?.(".worker-repo-op__resolve");if(y){E(y.dataset.operationId||"");return}let te=k?.closest?.(".worker-repo-op__dismiss");if(te){J(te.dataset.operationId||"");return}let j=k?.closest?.(".worker-cleanup__resume");if(j){let Re=j.dataset.beadId;Re&&Je(Re);return}let Ae=k?.closest?.(".worker-banner__resume");if(Ae){let Re=Ae.dataset.attemptId;Re&&Zt(Re);return}let nt=k?.closest?.(".worker-banner__discard");if(nt){let Re=nt.dataset.confirmation==="merged"?"merged":"unmerged";T(nt.dataset.beadId||"",nt.dataset.attemptId||null,Re,nt.dataset.operationId||null);return}let tt=k?.closest?.(".worker-banner__dismiss");if(tt){let Re=tt.dataset.attemptId;Re&&Kt(Re);return}if(k?.closest?.(".worker-play")){x(!Q().auto_advance);return}let it=k?.closest?.(".worker-merge-all");if(it){it.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?N(!1):ye():N(!0);return}let lt=k?.closest?.(".worker-pane__toggle[data-lane]");if(lt){let Re=lt.dataset.lane;(Re==="candidate"||Re==="queue"||Re==="running"||Re==="pr_wait"||Re==="done")&&Xt(Re);return}let kt=k?.closest?.(".worker-wait__area-toggle[data-area]");if(kt){let Re=kt.dataset.area;(Re==="parallel"||Re==="serial")&&cn(Re);return}let on=k?.closest?.(".worker-card__place-lane");if(on){let Re=on.dataset.beadId,ht=on.dataset.lane;Re&&(ht==="parallel"||/^s[1-5]$/.test(ht||""))&&(Z=null,Oe(),dt(Re,ht));return}if(k?.closest?.(".worker-card__place-cancel")){Z=null,Oe();return}let un=k?.closest?.(".worker-card__place");if(un){let Re=un.dataset.beadId;Re&&!un.disabled&&(We()?(Z=Re,Oe()):dt(Re,"parallel"));return}let p=k?.closest?.(".worker-filter__chip");if(p){let Re=p.dataset.spec;(Re==="all"||Re==="with"||Re==="without")&&rn({...ae,spec:Re});return}let g=k?.closest?.(".worker-mini__merge");if(g){let Re=g.dataset.beadId||"";Q().cleanup_failed?.[Re]?Je(Re):Ot(Re);return}let v=k?.closest?.(".worker-mini__merge-cancel");if(v){ee(v.dataset.beadId||"");return}let $=k?.closest?.(".worker-mini__discard");if($){T($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let B=k?.closest?.(".worker-mini__stale-continue");if(B){G("worker-stale-work-continue",B.dataset.beadId||"",B.dataset.actionId||"");return}let z=k?.closest?.(".worker-mini__stale-backup");if(z){G("worker-stale-work-backup-fresh",z.dataset.beadId||"",z.dataset.actionId||"");return}let se=k?.closest?.(".worker-mini__stale-recheck");if(se){G("worker-stale-work-recheck",se.dataset.beadId||"",se.dataset.actionId||"");return}let he=k?.closest?.(".worker-mini__revise-fix");if(he){Me("worker-revise-fix",he.dataset.beadId||"");return}let et=k?.closest?.(".worker-mini__revise-approve");if(et){Me("worker-revise-approve",et.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let Re=k?.closest?.(".rtile"),ht=Re?.dataset?.beadId,dn=Re?.dataset?.attemptId;ht&&T(ht,dn||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let ht=k?.closest?.(".rtile")?.dataset?.attemptId;ht&&Kt(ht);return}if(k?.closest?.(".rtile__pause")){let ht=k?.closest?.(".rtile")?.dataset?.attemptId;ht&&jt(ht);return}if(k?.closest?.(".rtile__resume")){let ht=k?.closest?.(".rtile")?.dataset?.attemptId;ht&&Zt(ht);return}if(k?.closest?.(".rtile__session")){let Re=k?.closest?.(".rtile"),ht=Re?.dataset?.attemptId;if(ht){I(ht);return}let dn=Re?.dataset?.beadId;dn&&ze(dn);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){Xe.close(),je.close();return}if(k?.closest?.(".worker-drawer-host"))return;let pt=k?.closest?.(".rtile .board-card__roll-toggle");if(pt){let Re=pt.dataset.rollParent;Re&&(we.has(Re)?we.delete(Re):we.add(Re),Oe());return}let sn=k?.closest?.(".rtile .board-card__roll-child");if(sn){let Re=sn.dataset.childId;Re&&l&&l(Re);return}let Ct=k?.closest?.(".rtile");if(Ct){if(k?.closest?.(".rtile__id")){let ht=Ct.dataset.beadId;ht&&Tn(ht).then(dn=>{dn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Re=Ct.dataset.beadId;Re&&l&&l(Re);return}let En=k?.closest?.(".worker-mini, .worker-card");if(En){let Re=En.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Re&&Tn(Re).then(dn=>{dn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ht=k?.closest?.(".ctl-chip--from");if(ht){let dn=ht.dataset.fromId;dn&&l&&l(dn);return}Re&&l&&l(Re)}}e.addEventListener("pointerdown",ge),e.addEventListener("dragstart",Ne),e.addEventListener("dragover",xt),e.addEventListener("dragleave",Bt),e.addEventListener("dragend",Tt),e.addEventListener("drop",Ut),e.addEventListener("click",en),e.addEventListener("change",An);function br(m){if(!U)return;let k=m.target;k&&typeof k.closest=="function"&&k.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,Oe())}function Ir(m){m.key!=="Escape"||!U||(U=null,Oe())}return document.addEventListener("click",br),document.addEventListener("keydown",Ir),D.push(()=>{document.removeEventListener("click",br),document.removeEventListener("keydown",Ir)}),Pe(),w&&D.push(w.subscribe(()=>{for(let[m,k]of M)k==="failed"&&M.delete(m);Oe()})),s&&D.push(s.subscribe(()=>{let m=u&&u()||"";m!==yt&&(yt=m,rt.close()),Oe(),ot()})),o&&typeof o.subscribe=="function"&&D.push(o.subscribe(()=>{ot(),Oe()})),Oe(),{load(){xe(),Oe()},refreshSessionDefaults:Ye,destroy(){for(let m of D.splice(0))try{m()}catch{}e.removeEventListener("pointerdown",ge),e.removeEventListener("dragstart",Ne),e.removeEventListener("dragover",xt),e.removeEventListener("dragleave",Bt),e.removeEventListener("dragend",Tt),e.removeEventListener("drop",Ut),e.removeEventListener("click",en),e.removeEventListener("change",An);try{je.destroy()}catch{}mt.hidden=!0;try{re?.destroy()}catch{}try{rt.destroy()}catch{}at(c``,e)}}}function Dl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function r_(e,t,n,r=async()=>{},s=async()=>{}){let o=Gt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(H){let M=H.target.value,be=t.getState().workspace?.current?.path||"";if(M&&M!==be){o("switching workspace to %s",M),i=!0,q();try{await n(M)}catch(Se){o("workspace switch failed: %o",Se)}finally{i=!1,q()}}}async function _(){let H=t.getState(),S=H.workspace?.current?.path||H.workspace?.available?.[0]?.path||"";if(!(!S||l)){o("git-pulling workspace %s",S),l=!0,q();try{await r(S)}catch(M){o("workspace git pull failed: %o",M)}finally{l=!1,q()}}}function h(H){let S=H.target;S&&e.contains(S)||F()}function b(H){H.key==="Escape"&&F()}function w(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),q())}function F(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),q())}function W(){u?F():w()}async function Y(H){let S=H.target,M=S.value,ne=S.checked;o("toggling visibility %s \u2192 %s",M,String(ne));try{await s(M,ne)}catch(be){o("workspace visibility toggle failed: %o",be)}}function ae(H){return H?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Z(H,S){return c`
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
                ${H.map(M=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${M.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${M.path}"
                        .checked=${!S.has(M.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Dl(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let H=t.getState(),S=H.workspace?.current,M=H.workspace?.available||[],ne=new Set(H.workspace?.hidden||[]),be=S?.path||M[0]?.path||"";if(M.length===0)return c``;let Se=M.filter(ce=>!ne.has(ce.path)||ce.path===be);if(Se.length<=1){let ce=Se[0]||M[0],_e=Dl(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${_e}</span
          >
          ${Z(M,ne)}
          ${ae(be)}
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
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${Se.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===be}
                title="${ce.path}"
              >
                ${Dl(ce.path)}
              </option>
            `)}
        </select>
        ${Z(M,ne)}
        ${ae(be)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){at(U(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),at(c``,e)}}}var s_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Nl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function o_(e,t,n=Nl()){return{id:n,type:e,payload:t}}function a_(e={}){let t=Gt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],_=new Map,h=new Set;function b(U){for(let q of Array.from(h))try{q(U)}catch{}}function w(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let U=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*U,H=Math.max(0,Math.round(U+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",H,a+1),i=setTimeout(()=>{i=null,Z()},H)}function F(U){try{s?.send(JSON.stringify(U))}catch(q){t("ws send failed",q)}}function W(){for(o="open",t("ws open"),b(o),a=0;d.length;){let U=d.shift();U&&F(U)}}function Y(U){let q;try{q=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let S=u.get(q.id);u.delete(q.id),q.ok?S?.resolve(q.payload):S?.reject(q.error||new Error("ws error"));return}let H=_.get(q.type);if(H&&H.size>0)for(let S of Array.from(H))try{S(q.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",q.type)}function ae(){o="closed",t("ws closed"),b(o);for(let[U,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(U);a+=1,w()}function Z(){if(!l)return;let U=r();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",b(o),s.addEventListener("open",W),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(q){t("ws connect failed %o",q),w()}}return Z(),{send(U,q){if(!s_.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let H=Nl(),S=o_(U,q,H);return t("send %s id=%s",U,H),new Promise((M,ne)=>{u.set(H,{resolve:M,reject:ne,type:U}),s&&s.readyState===s.OPEN?F(S):(t("queue %s id=%s (state=%s)",U,H,o),d.push(S))})},on(U,q){_.has(U)||_.set(U,new Set);let H=_.get(U);return H?.add(q),()=>{H?.delete(q)}},onConnection(U){return h.add(U),()=>{h.delete(U)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function nw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function rw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ql=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],i_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],mr="tab:worker:closed",sw="bdui.worker.done-range",l_=cf,c_="worker:queue",u_="worker:parallel-analysis",d_="ui:order",p_="ui:display-policy",f_="exec:presets",gr="tab:board:closed",__="beads-ui.board.closed-range";function ow(e){let t=Gt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;at(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&Cf(a),i&&l&&u&&d){let D=function(C,I){let ze="Request failed",Ve="";if(C&&typeof C=="object"){let wt=C;if(typeof wt.message=="string"&&wt.message.length>0&&(ze=wt.message),typeof wt.details=="string")Ve=wt.details;else if(wt.details&&typeof wt.details=="object")try{Ve=JSON.stringify(wt.details,null,2)}catch{Ve=""}}else typeof C=="string"&&C.length>0&&(ze=C);let ot=I&&I.length>0?`Failed to load ${I}`:"Request failed";V.open(ot,ze,Ve)},We=function(C){return`${Oe.getState().workspace.current?.path||""}\0${C}`},ut=function(){Ie&&(Ie().catch(()=>{}),Ie=null),je=null,Xe=null},ve=function(C){rt=C;let I=()=>{rt!==C||Oe.getState().selected_id!==C||(rt=null,Ke(C))};if(!re){vt.then(I);return}I()},gt=function(C,I,ze,Ve,ot){return ze!==_t[I]?(ot().catch(()=>{}),!1):(C.set(Ve,ot),!0)},Zt=function(){let C=Oe.getState();qe(C.view==="board"),Me(C.view==="worker"),Ee(C.view==="monitor"),E(C.view==="board"||C.view==="worker"||jt||!!C.selected_id)},Ot=function(){let C=$r(Kt);return C===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:C}}},Je=function(){let C=$r(Et);return C===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:C}}},qe=function(C){if(C)for(let[I,ze]of ql){if(Ge.has(I)||dt.has(I))continue;let Ve=I===gr?Ot():{type:ze};try{ie.register(I,Ve)}catch(en){t("register %s store failed: %o",I,en)}dt.add(I);let ot=_t.board,wt=!1;Ye.subscribeList(I,Ve).then(en=>{wt=!gt(Ge,"board",ot,I,en)}).catch(en=>{t("subscribe %s failed: %o",I,en),D(en,"board")}).finally(()=>{dt.delete(I),wt&&Zt()})}else ye()},ye=function(){_t.board+=1;for(let[C]of ql){let I=Ge.get(C);I&&(I().catch(()=>{}),Ge.delete(C));try{ie.unregister(C)}catch(ze){t("unregister %s failed: %o",C,ze)}}},Me=function(C){if(!C){x();return}for(let[I,ze]of i_){if(T.has(I)||dt.has(I))continue;let Ve=I===mr?Je():{type:ze};try{ie.register(I,Ve)}catch(en){t("register %s store failed: %o",I,en)}dt.add(I);let ot=_t.worker,wt=!1;Ye.subscribeList(I,Ve).then(en=>{wt=!gt(T,"worker",ot,I,en)}).catch(en=>{t("subscribe %s failed: %o",I,en),D(en,"worker")}).finally(()=>{dt.delete(I),wt&&Zt()})}},x=function(){_t.worker+=1;for(let[C]of i_){let I=T.get(C);I&&(I().catch(()=>{}),T.delete(C));try{ie.unregister(C)}catch(ze){t("unregister %s failed: %o",C,ze)}}},E=function(C){if(!C){J();return}G||(xe("subscribe-worker-queue",{id:c_}).catch(I=>{t("subscribe-worker-queue failed: %o",I)}),xe("subscribe-worker-parallel-analysis",{id:u_}).catch(I=>{t("subscribe-worker-parallel-analysis failed: %o",I)}),G=()=>(xe("unsubscribe-worker-parallel-analysis",{id:u_}),xe("unsubscribe-worker-queue",{id:c_})))},J=function(){G&&(G().catch(()=>{}),G=null),mt.clear()},Ee=function(C){if(!C){Fe();return}fe||(xe("subscribe-monitor-pipeline",{id:l_}).catch(I=>{t("subscribe-monitor-pipeline failed: %o",I)}),fe=()=>xe("unsubscribe-monitor-pipeline",{id:l_}))},Fe=function(){fe&&(fe().catch(()=>{}),fe=null)},P=function(){A||(xe("subscribe-ui-order",{id:d_}).catch(C=>{t("subscribe-ui-order failed: %o",C)}),A=()=>xe("unsubscribe-ui-order",{id:d_}))},$e=function(){A&&(A().catch(()=>{}),A=null),St.clear()},de=function(){Ze||(xe("subscribe-display-policy",{id:p_}).catch(C=>{t("subscribe-display-policy failed: %o",C)}),Ze=()=>xe("unsubscribe-display-policy",{id:p_}))},st=function(){Ze&&(Ze().catch(()=>{}),Ze=null),ft.clear()},At=function(){bt||(xe("subscribe-impl-presets",{id:f_}).catch(C=>{t("subscribe-impl-presets failed: %o",C)}),bt=()=>xe("unsubscribe-impl-presets",{id:f_}))},an=function(C){if(!C)return"Unknown";let I=C.split("/").filter(Boolean);return I.length>0?I[I.length-1]:"Unknown"},Ut=function(C,I){Qt.open(C.path,{missing_state:C.missing_state,...I?{workspace:I}:{}})};var _=D,h=We,b=ut,w=ve,F=gt,W=Zt,Y=Ot,ae=Je,Z=qe,U=ye,q=Me,H=x,S=E,M=J,ne=Ee,be=Fe,Se=P,ce=$e,_e=de,ke=st,Be=At,we=an,X=Ut;let Te=document.getElementById("header-loading"),De=ru(Te),V=Zd(e),me=a_(),xe=De.wrapSend((C,I)=>me.send(C,I)),Ye=Yc(xe),ie=Zc(),Ue=Jc(),mt=Qc(),ct=Pc(),St=Xc(),ft=Ic(),O=Mc(),oe=Dc();me.on("impl-presets-snapshot",C=>{let I=C;I&&typeof I.revision=="number"&&Array.isArray(I.presets)&&O.set({revision:I.revision,presets:I.presets})}),me.on("monitor-pipeline-snapshot",C=>{let I=C;if(!(!I||!Array.isArray(I.workspaces)))try{ct.set(I.workspaces,I.workspaces_state,I.cross_lanes)}catch{}}),me.on("ui-order-snapshot",C=>{let I=C;if(I&&typeof I.revision=="number")try{St.set({revision:I.revision,order:I.order&&typeof I.order=="object"?I.order:{}})}catch{}}),me.on("display-policy-snapshot",C=>{let I=C;if(I&&I.policy&&typeof I.policy=="object")try{ft.set(I.policy)}catch{}}),me.on("session-log-snapshot",C=>{let I=C;if(I&&typeof I.id=="string")try{oe.set(I.id,Array.isArray(I.lines)?I.lines:[],typeof I.last_event_at=="number"?I.last_event_at:null)}catch{}}),me.on("session-log-append",C=>{let I=C;if(I&&typeof I.id=="string")try{oe.append(I.id,I.event)}catch{}}),me.on("snapshot",C=>{let I=C,ze=I&&typeof I.id=="string"?I.id:"",Ve=ze?ie.getStore(ze):null;if(Ve&&I&&I.type==="snapshot")try{Ve.applyPush(I)}catch{}}),me.on("upsert",C=>{let I=C,ze=I&&typeof I.id=="string"?I.id:"",Ve=ze?ie.getStore(ze):null;if(Ve&&I&&I.type==="upsert")try{Ve.applyPush(I)}catch{}}),me.on("delete",C=>{let I=C,ze=I&&typeof I.id=="string"?I.id:"",Ve=ze?ie.getStore(ze):null;if(Ve&&I&&I.type==="delete")try{Ve.applyPush(I)}catch{}});let Ie=null,je=null,Xe=null,rt=null,yt=()=>{},vt=new Promise(C=>{yt=()=>C(void 0)}),re=!1,Q=!1;async function Ke(C){let I=We(C);if(I===je||I===Xe)return;Xe=I;let ze=`detail:${C}`,Ve={type:"issue-detail",params:{id:C}};try{ie.register(ze,Ve)}catch(ot){t("register detail store failed: %o",ot)}try{let ot=await Ye.subscribeList(ze,Ve);if(Oe.getState().selected_id!==C||We(C)!==I){await ot().catch(()=>{});return}Ie&&await Ie().catch(()=>{}),Ie=ot,je=I}catch(ot){t("detail subscribe failed: %o",ot),D(ot,"issue details")}finally{Xe===I&&(Xe=null)}}let Ge=new Map,dt=new Set,_t={board:0,worker:0},jt=!1,Kt=ko;try{let C=window.localStorage.getItem(__);ui(C)&&(Kt=C)}catch{}let Et="today";try{let C=window.localStorage.getItem(sw);C!==null&&(Et=Hn(C))}catch{}async function N(C){if(!ui(C)||C===Kt)return;Kt=C;try{window.localStorage.setItem(__,C)}catch{}let I=Ge.get(gr);if(!I)return;Ge.delete(gr),await I().catch(()=>{});let ze=Ot();try{ie.register(gr,ze)}catch(Ve){t("register %s store failed: %o",gr,Ve)}try{let Ve=await Ye.subscribeList(gr,ze);Ge.set(gr,Ve)}catch(Ve){t("re-subscribe %s failed: %o",gr,Ve),D(Ve,"board")}}async function ee(C){let I=Hn(C);if(I===Et)return;Et=I;let ze=T.get(mr);if(!ze)return;T.delete(mr),await ze().catch(()=>{});let Ve=Je();try{ie.register(mr,Ve)}catch(ot){t("register %s store failed: %o",mr,ot)}try{let ot=await Ye.subscribeList(mr,Ve);T.set(mr,ot)}catch(ot){t("re-subscribe %s failed: %o",mr,ot),D(ot,"worker")}}let T=new Map,G=null,fe=null,A=null,Ze=null,bt=null;async function Mt(){Ze=null,ft.clear(),bt=null,O.clear(),G=null,fe=null,Ge.clear(),T.clear(),_t.board+=1,_t.worker+=1,At();let C=Oe.getState().workspace.current?.path;if(C)try{await me.send("set-workspace",{path:C})}catch(ze){t("workspace restore after reconnect failed: %o",ze);return}de();let I=Oe.getState();qe(I.view==="board"),Me(I.view==="worker"),Ee(I.view==="monitor"),E(I.view==="board"||I.view==="worker"||!!I.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),ye(),x(),J(),Ue.clear(),$e(),P(),st(),de(),ut();let C=Oe.getState();if(C.selected_id)try{ie.unregister(`detail:${C.selected_id}`)}catch{}let I=Oe.getState();qe(I.view==="board"),Me(I.view==="worker"),Ee(I.view==="monitor"),E(I.view==="board"||I.view==="worker"||!!I.selected_id),I.selected_id&&ve(I.selected_id)}async function Lt(C){t("requesting workspace switch to %s",C),Q=!0;try{let I=await me.send("set-workspace",{path:C});t("workspace switch result: %o",I),I&&I.workspace&&(Oe.setState({workspace:{current:{path:I.workspace.root_dir,database:I.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",C),I.changed&&(await Ht(),ue("Switched to "+an(C),"success",2e3)))}catch(I){throw t("workspace switch failed: %o",I),ue("Failed to switch workspace","error",3e3),I}finally{Q=!1}}async function mn(C){t("requesting workspace git pull for %s",C);try{let I=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",I);let ze=I?.status;if(ze==="up_to_date"){ue("Already up to date","success",2e3);return}if(ze==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+an(C),"success",2e3)}catch(I){t("workspace git pull failed: %o",I);let ze=I?.code,Ve=I?.message;if(ze==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ze==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ze==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let ot=Ve?`: ${Ve}`:"";throw ue(`Git pull failed${ot}`,"error",3e3),I}}async function Nt(C,I){t("setting workspace visibility %s \u2192 %s",C,String(I));try{await me.send("set-workspace-visibility",{path:C,visible:I}),await ln()}catch(ze){t("workspace visibility update failed: %o",ze),ue("Failed to update project visibility","error",3e3)}}async function ln(){try{let C=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",C),C&&Array.isArray(C.workspaces)){let I=C.workspaces.map(wt=>({path:wt.path,database:wt.database,pid:wt.pid,version:wt.version})),ze=C.current?{path:C.current.root_dir,database:C.current.db_path}:null,Ve=Array.isArray(C.hidden)?C.hidden.filter(wt=>typeof wt=="string"):[];Oe.setState({workspace:{current:ze,available:I,hidden:Ve}});let ot=window.localStorage.getItem("beads-ui.workspace");ot&&(!I.some(en=>en.path===ot)||Ve.includes(ot)?window.localStorage.removeItem("beads-ui.workspace"):ze&&ot!==ze.path&&(t("restoring saved workspace preference: %s",ot),await Lt(ot)))}}catch(C){t("failed to load workspaces: %o",C)}}me.on("workspace-changed",C=>{t("workspace-changed event: %o",C),C&&C.root_dir&&(Oe.setState({workspace:{current:{path:C.root_dir,database:C.db_path}}}),ln(),Ht())});let Xt=!1;if(typeof me.onConnection=="function"){let C=I=>{t("ws state %s",I),I==="reconnecting"||I==="closed"?(Xt=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):I==="open"&&Xt&&(Xt=!1,ue("Reconnected","success",2200),rw(Oe,(ze,Ve)=>{t(`${ze}: %o`,Ve)}),Mt())};me.onConnection(C)}let cn="board";try{let C=window.localStorage.getItem("beads-ui.view");(C==="board"||C==="worker"||C==="monitor")&&(cn=C)}catch(C){t("view parse error: %o",C)}let Oe=nu({config:nw(),view:cn});me.on("worker-queue-snapshot",C=>{let I=C;if(!I||!I.queue)return;let ze=Oe.getState().workspace.current?.path;if(typeof ze=="string"&&ze.length>0&&I.root_dir!==ze){t("dropping worker-queue snapshot for %s",String(I.root_dir));return}try{Ue.set(I.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",C=>{let I=C;if(!I)return;let ze=Oe.getState().workspace.current?.path;if(!(typeof ze=="string"&&ze.length>0&&typeof I.root_dir=="string"&&I.root_dir!==ze))try{mt.set({settings:I.settings,job:I.job??null,runs:Array.isArray(I.runs)?I.runs:[],last_good:I.last_good??null})}catch{}});let Pe=eu(Oe);Pe.start();let R=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ge=async(C,I)=>{try{return await xe(C,I)}catch(ze){if(R.has(C))throw ze;return[]}};df({global_element:r,repo_element:s},Oe,Pe);let Ne=document.getElementById("workspace-picker");Ne&&r_(Ne,Oe,Lt,mn,Nt);let xt=mf(e,(C,I)=>xe(C,I));try{let C=document.getElementById("new-issue-btn");C&&C.addEventListener("click",()=>xt.open())}catch{}let Bt=yf(e,{policyStore:ft,queueStore:Ue,implPresetStore:O,transport:(C,I)=>xe(C,I),onOpenChange:C=>{let I=jt;jt=C,Zt(),I&&C===!1&&xn.refreshSessionDefaults()},labelOptions:()=>{let C=new Set;for(let[I]of ql)for(let ze of ie.snapshotFor(I)||[]){let Ve=ze.labels;if(Array.isArray(Ve))for(let ot of Ve)typeof ot=="string"&&ot.length>0&&C.add(ot)}return Array.from(C).sort()}});try{let C=document.getElementById("display-settings-btn");C&&(C.setAttribute("aria-label","\uC124\uC815"),C.setAttribute("title","\uC124\uC815"),C.addEventListener("click",()=>Bt.open()))}catch{}let Tt=document.createElement("div");Tt.className="md-viewer-root",document.body.appendChild(Tt);let Qt=_a(Tt,{getWorkspacePath:()=>Oe.getState().workspace.current?.path}),rn=hu(i,{gotoIssue:C=>Pe.gotoIssue(C),issueStores:ie,transport:ge,workerQueueStore:Ue,uiOrderStore:St,displayPolicyStore:ft,closedRange:Kt,onClosedRangeChange:C=>{N(C)},onNewIssue:()=>xt.open(),openDoc:Ut}),xn=Pl(l,{transport:ge,issueStores:ie,queueStore:Ue,analysisStore:mt,sessionLogStore:oe,uiOrderStore:St,gotoIssue:C=>Oe.setState({selected_id:C}),getWorkspacePath:()=>Oe.getState().workspace.current?.path,switchWorkspace:C=>Lt(C),openDoc:Ut,doneRange:Et,onDoneRangeChange:C=>{ee(C)}}),qt=uf(u,{transport:ge,pipelineStore:ct,execPresetStore:O,sessionLogStore:oe,router:Pe,gotoIssue:C=>Pe.gotoIssue(C),getWorkspacePath:()=>Oe.getState().workspace.current?.path,switchWorkspace:C=>Lt(C),openDoc:Ut}),An=Yd(d,{issueStores:ie,transport:ge,queueStore:Ue,execPresetStore:O,sessionLogStore:oe,getWorkspacePath:()=>Oe.getState().workspace.current?.path,mdViewer:Qt,onNavigate:C=>{Oe.getState().view==="worker"?Oe.setState({selected_id:C}):Pe.gotoIssue(C)},onClose:()=>{let C=Oe.getState();Oe.setState({selected_id:null});try{Pe.gotoView(C.view==="worker"||C.view==="monitor"?C.view:"board")}catch{}},onOpenExecPresets:()=>{Bt.open("execution")}}),Sn=Oe.getState().selected_id;Sn&&(d.hidden=!1,An.load(Sn),ve(Sn)),Oe.subscribe(C=>{let I=C.selected_id;I?(d.hidden=!1,An.load(I),Q||ve(I)):(An.clear(),d.hidden=!0,ut())});let Zn=C=>{i.hidden=C.view!=="board",l.hidden=C.view!=="worker",u.hidden=C.view!=="monitor",o&&o.classList.toggle("is-quiet",C.view==="monitor"),qe(C.view==="board"),Me(C.view==="worker"),Ee(C.view==="monitor"),E(C.view==="board"||C.view==="worker"||jt||!!C.selected_id),!C.selected_id&&C.view==="board"&&rn.load(),C.view==="worker"&&xn.load(),C.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",C.view)};Oe.subscribe(Zn),Zn(Oe.getState()),P(),de(),At(),ln().finally(()=>{re=!0,yt()}),window.addEventListener("keydown",C=>{let I=C.ctrlKey||C.metaKey,ze=String(C.key||"").toLowerCase(),Ve=C.target,ot=Ve&&Ve.tagName?String(Ve.tagName).toLowerCase():"",wt=ot==="input"||ot==="textarea"||ot==="select"||Ve&&typeof Ve.isContentEditable=="boolean"&&Ve.isContentEditable;I&&ze==="n"&&(wt||(C.preventDefault(),xt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&ow(t)});export{ow as bootstrap,nw as readBootstrapConfig,rw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
