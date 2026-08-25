var ff=Object.create;var wa=Object.defineProperty;var _f=Object.getOwnPropertyDescriptor;var mf=Object.getOwnPropertyNames;var gf=Object.getPrototypeOf,hf=Object.prototype.hasOwnProperty;var bf=(e,t,n)=>t in e?wa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ka=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var yf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of mf(t))!hf.call(e,s)&&s!==n&&wa(e,s,{get:()=>t[s],enumerable:!(r=_f(t,s))||r.enumerable});return e};var vf=(e,t,n)=>(n=e!=null?ff(gf(e)):{},yf(t||!e||!e.__esModule?wa(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>bf(e,typeof t!="symbol"?t+"":t,n);var Gl=ka((by,Hl)=>{var xr=1e3,Ar=xr*60,Sr=Ar*60,lr=Sr*24,$f=lr*7,xf=lr*365.25;Hl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Af(e);if(n==="number"&&isFinite(e))return t.long?Ef(e):Sf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Af(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*xf;case"weeks":case"week":case"w":return n*$f;case"days":case"day":case"d":return n*lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Sr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ar;case"seconds":case"second":case"secs":case"sec":case"s":return n*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Sf(e){var t=Math.abs(e);return t>=lr?Math.round(e/lr)+"d":t>=Sr?Math.round(e/Sr)+"h":t>=Ar?Math.round(e/Ar)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function Ef(e){var t=Math.abs(e);return t>=lr?Ys(e,t,lr,"day"):t>=Sr?Ys(e,t,Sr,"hour"):t>=Ar?Ys(e,t,Ar,"minute"):t>=xr?Ys(e,t,xr,"second"):e+" ms"}function Ys(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Kl=ka((yy,Vl)=>{function Tf(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Gl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,w,S;function F(...z){if(!F.enabled)return;let V=F,oe=Number(new Date),M=oe-(_||oe);V.diff=M,V.prev=_,V.curr=oe,_=oe,z[0]=n.coerce(z[0]),typeof z[0]!="string"&&z.unshift("%O");let D=0;z[0]=z[0].replace(/%([a-zA-Z%])/g,(K,T)=>{if(K==="%%")return"%";D++;let U=n.formatters[T];if(typeof U=="function"){let W=z[D];K=U.call(V,W),z.splice(D,1),D--}return K}),n.formatArgs.call(V,z),(V.log||n.log).apply(V,z)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==n.namespaces&&(w=n.namespaces,S=n.enabled(d)),S),set:z=>{h=z}}),typeof n.init=="function"&&n.init(F),F}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,w=0,S=-1,F=0;for(;h<d.length;)if(w<_.length&&(_[w]===d[h]||_[w]==="*"))_[w]==="*"?(S=w,F=h,w++):(h++,w++);else if(S!==-1)w=S+1,F++,h=F;else return!1;for(;w<_.length&&_[w]==="*";)w++;return w===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Vl.exports=Tf});var Yl=ka((tn,Zs)=>{tn.formatArgs=Rf;tn.save=Of;tn.load=Lf;tn.useColors=Cf;tn.storage=If();tn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();tn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Cf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Rf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Zs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}tn.log=console.debug||console.log||(()=>{});function Of(e){try{e?tn.storage.setItem("debug",e):tn.storage.removeItem("debug")}catch{}}function Lf(){let e;try{e=tn.storage.getItem("debug")||tn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function If(){try{return localStorage}catch{}}Zs.exports=Kl()(tn);var{formatters:Pf}=Zs.exports;Pf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ws=Xr.trustedTypes,Rl=Ws?Ws.createPolicy("lit-html",{createHTML:e=>e}):void 0,xa="$lit$",Rn=`lit$${Math.random().toFixed(9).slice(2)}$`,Aa="?"+Rn,wf=`<${Aa}>`,sr=document,Jr=()=>sr.createComment(""),es=e=>e===null||typeof e!="object"&&typeof e!="function",Sa=Array.isArray,Dl=e=>Sa(e)||typeof e?.[Symbol.iterator]=="function",$a=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ol=/-->/g,Ll=/>/g,nr=RegExp(`>|${$a}(?:([^\\s"'>=/]+)(${$a}*=${$a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Il=/'/g,Pl=/"/g,Nl=/^(?:script|style|textarea|title)$/i,Ea=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ea(1),ns=Ea(2),dy=Ea(3),fn=Symbol.for("lit-noChange"),Nt=Symbol.for("lit-nothing"),Ml=new WeakMap,rr=sr.createTreeWalker(sr,129);function ql(e,t){if(!Sa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Rl!==void 0?Rl.createHTML(t):t}var Fl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let i=0;i<n;i++){let l=e[i],u,d,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===Qr?d[1]==="!--"?a=Ol:d[1]!==void 0?a=Ll:d[2]!==void 0?(Nl.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=nr):d[3]!==void 0&&(a=nr):a===nr?d[0]===">"?(a=s??Qr,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?nr:d[3]==='"'?Pl:Il):a===Pl||a===Il?a=nr:a===Ol||a===Ll?a=Qr:(a=nr,s=void 0);let w=a===nr&&e[i+1].startsWith("/>")?" ":"";o+=a===Qr?l+wf:_>=0?(r.push(u),l.slice(0,_)+xa+l.slice(_)+Rn+w):l+Rn+(_===-2?i:w)}return[ql(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ts=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Fl(t,n);if(this.el=e.createElement(u,r),rr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=rr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(xa)){let h=d[a++],w=s.getAttribute(_).split(Rn),S=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:S[2],strings:w,ctor:S[1]==="."?Hs:S[1]==="?"?Gs:S[1]==="@"?Vs:ar}),s.removeAttribute(_)}else _.startsWith(Rn)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Nl.test(s.tagName)){let _=s.textContent.split(Rn),h=_.length-1;if(h>0){s.textContent=Ws?Ws.emptyScript:"";for(let w=0;w<h;w++)s.append(_[w],Jr()),rr.nextNode(),l.push({type:2,index:++o});s.append(_[h],Jr())}}}else if(s.nodeType===8)if(s.data===Aa)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Rn,_+1))!==-1;)l.push({type:7,index:o}),_+=Rn.length-1}o++}}static createElement(t,n){let r=sr.createElement("template");return r.innerHTML=t,r}};function or(e,t,n=e,r){if(t===fn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=es(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=or(e,s._$AS(e,t.values),s,r)),t}var zs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??sr).importNode(n,!0);rr.currentNode=s;let o=rr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new $r(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new Ks(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=rr.nextNode(),a++)}return rr.currentNode=sr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Nt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=or(this,t,n),es(t)?t===Nt||t==null||t===""?(this._$AH!==Nt&&this._$AR(),this._$AH=Nt):t!==this._$AH&&t!==fn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Nt&&es(this._$AH)?this._$AA.nextSibling.data=t:this.T(sr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ts.createElement(ql(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Ml.get(t.strings);return n===void 0&&Ml.set(t.strings,n=new ts(t)),n}k(t){Sa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Jr()),this.O(Jr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Nt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Nt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=or(this,t,n,0),a=!es(t)||t!==this._$AH&&t!==fn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=or(this,i[r+l],n,l),u===fn&&(u=this._$AH[l]),a||(a=!es(u)||u!==this._$AH[l]),u===Nt?t=Nt:t!==Nt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Hs=class extends ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Nt?void 0:t}},Gs=class extends ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Nt)}},Vs=class extends ar{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=or(this,t,n,0)??Nt)===fn)return;let r=this._$AH,s=t===Nt&&r!==Nt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Nt&&(r===Nt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ks=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){or(this,t)}},jl={M:xa,P:Rn,A:Aa,C:1,L:Fl,R:zs,D:Dl,V:or,I:$r,H:ar,N:Gs,U:Vs,B:Hs,F:Ks},kf=Xr.litHtmlPolyfillSupport;kf?.(ts,$r),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var Ye=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(Jr(),o),o,void 0,n??{})}return s._$AI(e),s};var an="today",Wn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function _n(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ul(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function zl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Zl=vf(Yl(),1);function It(e){return(0,Zl.default)(`beads-ui:${e}`)}function yn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cr(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Jl(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ec(e,t){let n=yn(e.updated_at),r=yn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function tc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yn(e.created_at),o=yn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function nc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Mf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ql(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Xl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Mf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function rc(e,t){let n=Ql(e),r=Ql(t);if(n!==r)return n<r?-1:1;let s=Xl(e),o=Xl(t);if(s!==o)return s<o?-1:1;let a=yn(e&&e.created_at),i=yn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ta=2**20;function Er(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yn(e&&e.created_at)}function Qs(e){return(t,n)=>{let r=Er(t,e),s=Er(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ca(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Er(i,n)-Ta};if(!i)return{rank:Er(a,n)+Ta};let l=Er(a,n),u=Er(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ta}))}}function Ra(e,t={}){let n=It(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||cr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let w=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;r.clear();let S=Array.isArray(h.issues)?h.issues:[];for(let F of S)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=w,u();return}if(h.type==="upsert"){let S=h.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let F=r.get(S.id);if(!F)r.set(S.id,S);else{let z=Number.isFinite(F.updated_at)?F.updated_at:0,V=Number.isFinite(S.updated_at)?S.updated_at:0;if(z<=V){for(let oe of Object.keys(F))oe in S||delete F[oe];for(let[oe,M]of Object.entries(S))F[oe]=M}}d()}o=w,u()}else if(h.type==="delete"){let S=String(h.issue_id||"");S&&(r.delete(S),d()),o=w,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function sc(e){let t=It("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let w of Array.from(u)){let S=n.get(w);if(!S)continue;let F=S.itemsById;for(let z of d)typeof z=="string"&&z.length>0&&F.set(z,!0);for(let z of _)typeof z=="string"&&z.length>0&&F.set(z,!0);for(let z of h)typeof z=="string"&&z.length>0&&F.delete(z)}}async function o(i,l){let u=Xs(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=n.get(i)||null;if(h){let w=r.get(h.key);w&&(w.delete(i),w.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xs,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function oc(){let e=It("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let _=u?Xs(u):"",h=n.get(l)||"",w=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),w&&h&&_&&h!==_){let S=t.get(l);if(S)try{S.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let z=Ra(l,d);t.set(l,z);let V=z.subscribe(()=>o());s.set(l,V)}else if(!w){let S=Ra(l,d);t.set(l,S);let F=S.subscribe(()=>o());s.set(l,F)}return n.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function ac(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ic(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Oa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Df(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Nf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function cc(e){let t=It("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Df(r),a=Nf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Oa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Oa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var qf=Object.freeze({workspace_config:{default_workspace:null}});function uc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:qf.workspace_config.default_workspace}}}function dc(e={}){let t=It("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:uc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?uc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function pc(e){let t=It("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(_,h)=>{let w=s++,S=Date.now();r.set(w,{type:_,start_ts:S}),t("request start id=%d type=%s count=%d",w,_,n+1),a();let F=!1,z=()=>{F||(F=!0,r.delete(w),i())},V=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,_,Date.now()-S),z())},3e4);try{let oe=await u(_,h),M=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",w,_,M),oe}catch(oe){let M=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,_,M,oe),oe}finally{clearTimeout(V),z()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Js(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(nc),l;switch(i){case"created_desc":return l.sort(cr),l;case"created_asc":return l.sort(Jl),l;case"updated_desc":return l.sort(ec),l;case"priority":return l.sort(tc),l;case"manual":default:{let u=n();return u?l.sort(Qs(u)):l.sort(cr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function En(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=En(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function ln(e,t){let n=En(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function fc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=En(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function eo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function to(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=eo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function no(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=fc(n);return{total:n.length,count:r,current:s,children:n}}function ro(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Ca(i,l,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let w=r(Ca(i,l,h.order),a);s(h,w);let S=await t("ui-order-set",{expected_revision:h.revision,entries:w});S&&S.applied&&n.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function La(e,t){return!t||typeof e!="string"||e.length===0||so(t.visible_labels).includes(e)?!0:so(t.hidden_labels).includes(e)?!1:!so(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function _c(e,t){return so(e).filter(n=>La(n,t))}function zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Ff(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function jf(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Bf(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Ff(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function oo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(rc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?jf(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>Bf(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Uf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},gc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},mc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Wf={review:"\u2713",skip:"\u2298"},Hn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function zf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function hc(e){let t=e&&e.fill||"none";return t==="none"?Hn.none:e&&e.stale===!0?Hn.stale:t==="dim"?Hn.dim:e&&e.glyph==="review"?Hn.review:e&&e.glyph==="skip"?Hn.skip:Hn.done}function Hf(e){if(!e||e.fill==="none"||!e.approval_state)return hc(e);let t=[];return e.glyph==="review"?t.push(Hn.review):e.glyph==="skip"&&t.push(Hn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Gf(e,t,n,r){let s=Uf[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=Wf[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=gc[e]||e,h=r?bc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let w=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${w}
      title=${w}
      @click=${S=>{S.preventDefault(),S.stopPropagation(),r(S,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function bc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=mc[e.route]||mc.spec_backed,o=e.stages,a=zf(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${gc[u]||u} ${u==="plan"?Hf(o[u]||{}):hc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>bc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>Gf(u,o[u]||{},u===a,r))}
    </div>
  `}function Vf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var yc=2;function Kf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,yc).join(", "),s=n.length-yc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ia(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function io(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function On(e){return`${e.kind}:${io(e)}@${e.sha}`}function lo(e,t){if(!e)return null;let n=Ia(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ia(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${On(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function vc(e,t){let n=lo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Yf(e){if(!e)return null;let t=Ia(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${On(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Zf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&zn(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&zn(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&zn(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=vc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(i)}`}
        >${`exec ${i.kind==="delegated"?io(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of _c(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&zn(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),zn(n,"blocked")&&s.push(...Kf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&zn(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Qf(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Xf(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return oo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Qf(e),empty_label:"children \uC5C6\uC74C",childChips:Pa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Pa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return lo(t,n)?c`<span class="board-card__roll-child-chips">
    ${vc(t,n)}
    ${Yf(n)}
  </span>`:null}function co(e,t){let n=Vf(e.priority);return c`
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
      ${Zf(e,t)}
      ${e.workflow&&zn(t.policy||null,"stepper")?ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Xf(e,t)}
    </article>
  `}function Tr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Wn.map(o=>c`<option
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
        ${e.items.map(o=>co(o,t))}
      </div>
    </section>
  `}function wc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>co(r,t))}
        </div>
      </div>
    </dialog>
  `}var Jf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],e_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],t_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function n_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function kc(e,t,n){return c`
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
        ${Jf.map(r=>c`<option
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
        ${e_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${n_(e,t,n)}
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
        ${t_.map(r=>c`<option
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
  `}var r_=200,s_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},o_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),$c="beads-ui.board.sort",xc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function a_(){try{let e=window.localStorage.getItem($c);if(e&&xc.has(e))return e}catch{}return"created_desc"}function Ac(e,t){let n=It("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||an,w=s?Js(s,a):null,S=ro({transport:o,uiOrderStore:a}),F=[],z=[],V=[],oe=[],M=[],D=[],q=!1,K=0,T=a_(),U=new Map,W=new Map,we=new Map,he=new Set,pe={search:"",priority:"",type:"",labels:[]},H=!1,Ce=null;function Re(R){return String(R.status||"open")==="open"}function ue(R){let G=String(R.status||"open");return G==="open"||G==="blocked"}function ie(R){let G=pe.search.trim().toLowerCase(),xe=pe.priority,A=pe.type,g=pe.labels;return R.filter(k=>{if(G){let j=String(k.id||"").toLowerCase(),ne=String(k.title||"").toLowerCase();if(!j.includes(G)&&!ne.includes(G))return!1}if(xe!==""&&String(k.priority)!==xe||A!==""&&String(k.issue_type||"")!==A)return!1;if(g.length>0){let j=Array.isArray(k.labels)?k.labels:[];if(!g.some(ne=>j.includes(ne)))return!1}return!0})}function Ae(){let R=new Set;for(let G of[F,z,V,oe,M,D])for(let xe of G){let A=Array.isArray(xe.labels)?xe.labels:[];for(let g of A)typeof g=="string"&&g.length>0&&R.add(g)}return Array.from(R).sort()}function $e(){return pe.search.trim()!==""||pe.priority!==""||pe.type!==""||pe.labels.length>0}function Y(){try{if(w){let R=w.selectBoardColumn("tab:board:in-progress","in_progress",T),G=w.selectBoardColumn("tab:board:blocked","blocked",T).filter(ue),xe=new Set(R.map(Ee=>Ee.id)),A=w.selectBoardColumn("tab:board:ready","ready",T).filter(Ee=>Re(Ee)&&!xe.has(Ee.id)),g=w.selectBoardColumn("tab:board:resolved","resolved",T),k=w.selectBoardColumn("tab:board:deferred","deferred",T),j=w.selectBoardColumn("tab:board:closed","closed").slice(0,r_),ne=[...G,...A,...R,...g,...j];X(ne);let te=new Set;for(let Ee of ne)Ee&&Ee.id&&!eo(Ee)&&te.add(Ee.id);let be=!$e();F=be?rs(G,te):G,z=be?rs(A,te):A,V=be?rs(R,te):R,oe=be?rs(g,te):g,M=k,K=k.length,D=be?rs(j,te):j,U=new Map;for(let Ee of F)U.set(Ee.id,"open");for(let Ee of z)U.set(Ee.id,"open");for(let Ee of V)U.set(Ee.id,"in_progress");for(let Ee of oe)U.set(Ee.id,"resolved");for(let Ee of M)U.set(Ee.id,"deferred");for(let Ee of D)U.set(Ee.id,"closed");W=new Map;for(let Ee of F)W.set(Ee.id,"blocked-col");for(let Ee of z)W.set(Ee.id,"ready-col");for(let Ee of V)W.set(Ee.id,"in-progress-col");for(let Ee of oe)W.set(Ee.id,"resolved-col");for(let Ee of D)W.set(Ee.id,"closed-col")}mt()}catch{F=[],z=[],V=[],oe=[],M=[],D=[],we=new Map,mt()}}function X(R){we=to(R)}function ye(R){return no(we,R)}function me(R){return!he.has(R)}function Be(R,G){R.preventDefault(),R.stopPropagation(),he.has(G)?he.delete(G):he.add(G),mt()}function ae(R,G){R.preventDefault(),R.stopPropagation(),r(G)}function Ze(R,G){R.preventDefault(),R.stopPropagation(),r(G)}function it(R,G){Ce||r(G)}function P(R,G){R.preventDefault(),R.stopPropagation(),i_(G).then(xe=>{xe&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function fe(R,G){Ce=G,R.dataTransfer&&(R.dataTransfer.setData("text/plain",G),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function ve(R){R.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{Ce=null},0)}function Se(R){let G=String(R.target.value||"");!G||G===h||(h=G,u&&u(G),mt())}function He(){return i?i.get():null}function qe(R){let G=l?l.get():null,xe=G?G.cleanup_failed:null;if(!xe||typeof xe!="object"||Array.isArray(xe))return null;let A=xe[R];return!A||typeof A!="object"||Array.isArray(A)?null:A}let Ve={onCardClick:it,onCopyId:P,onDragStart:fe,onDragEnd:ve,onClosedRangeChange:Se,rollupFor:ye,isExpanded:me,onRollupToggle:Be,onChildClick:ae,onFromChipClick:Ze,onOpenDoc:_?(R,G)=>_(G):void 0,cleanupFailureFor:qe,get policy(){return He()}};function tt(R,G){Ce||(ze(),r(G))}function $t(R,G){R.preventDefault(),R.stopPropagation(),ze(),r(G)}let _t={...Ve,onCardClick:tt,onChildClick:$t,onFromChipClick:$t,onOpenDoc:_?(R,G)=>{ze(),_(G)}:void 0,get policy(){return He()}};function J(R){let G=R.target,xe=e.querySelector(".board-filter__labels");G&&xe&&xe.contains(G)||Je()}function Q(R){R.key==="Escape"&&Je()}function Le(){H||(H=!0,document.addEventListener("mousedown",J),document.addEventListener("keydown",Q),mt())}function Je(){H&&(H=!1,document.removeEventListener("mousedown",J),document.removeEventListener("keydown",Q),mt())}function Ie(R){R.key==="Escape"&&ze()}function ke(){q||(q=!0,document.addEventListener("keydown",Ie),mt())}function ze(){q&&(q=!1,document.removeEventListener("keydown",Ie),mt())}let Qe={onClose:ze,onOverlayClick(R){R.target===R.currentTarget&&ze()}},st={onSearchInput(R){pe.search=String(R.target.value||""),Y()},onPriorityChange(R){pe.priority=String(R.target.value||""),Y()},onTypeChange(R){pe.type=String(R.target.value||""),Y()},onSortChange(R){let G=String(R.target.value||"");if(!(!xc.has(G)||G===T)){T=G;try{window.localStorage.setItem($c,G)}catch{}Y()}},onDeferredToggle(){q?ze():ke()},onLabelMenuToggle(){H?Je():Le()},onLabelToggle(R){let G=pe.labels.indexOf(R);G===-1?pe.labels.push(R):pe.labels.splice(G,1),Y()},onLabelClear(){pe.labels.length!==0&&(pe.labels=[],Y())},onNewIssue(){d&&d()}};function nt(){return c`
      <div class="board-view">
        ${kc(pe,st,{sort_mode:T,deferred_popup_open:q,deferred_count:K,label_options:Ae(),label_menu_open:H})}
        <div class="board-root">
          ${Tr({title:"Blocked",id:"blocked-col",items:ie(F)},Ve)}
          ${Tr({title:"Ready",id:"ready-col",items:ie(z)},Ve)}
          ${Tr({title:"In progress",id:"in-progress-col",items:ie(V)},Ve)}
          ${Tr({title:"Resolved",id:"resolved-col",items:ie(oe)},Ve)}
          ${Tr({title:"Closed",id:"closed-col",items:ie(D),is_closed:!0,closed_range:h},Ve)}
        </div>
        ${q?wc({items:ie(M),count:K},_t,Qe):""}
      </div>
    `}function mt(){Ye(nt(),e),xt()}function xt(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let xe of G)Array.from(xe.querySelectorAll(".board-card")).forEach((g,k)=>{g.tabIndex=k===0?0:-1})}catch{}}async function St(R,G){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:G}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(xe){n("update-status failed: %o",xe),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function kt(R){switch(R){case"blocked-col":return F;case"ready-col":return z;case"in-progress-col":return V;case"resolved-col":return oe;default:return[]}}function Ot(R,G,xe){if(!o||!a)return;let A=kt(R),g=A.find(be=>be.id===G);if(!g)return;let k=A.filter(be=>be.id!==G),j=xe.closest?xe.closest(".board-card"):null,ne=k.length;if(j){let be=j.getAttribute("data-issue-id");if(be===G)return;let Ee=k.findIndex(et=>et.id===be);Ee>=0&&(ne=Ee)}let te=k.slice();te.splice(ne,0,g),S.applyReorder(G,te,ne)}function bt(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let Ge=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let xe=R.target.closest(".board-column");xe&&xe!==Ge&&(Ge&&Ge.classList.remove("board-column--drag-over"),xe.classList.add("board-column--drag-over"),Ge=xe)}),e.addEventListener("dragleave",R=>{let G=R.relatedTarget;(!G||!e.contains(G))&&Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null)}),e.addEventListener("drop",R=>{R.preventDefault(),Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null);let G=R.target,xe=G.closest(".board-column");if(!xe)return;let A=R.dataTransfer?.getData("text/plain")||"";if(!A)return;let g=xe.id,k=W.get(A);if(k&&k===g){if(o_.has(g)){if(T!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ot(g,A,G)}return}let j=s_[g];if(!j){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(A)!==j&&St(A,j)}),e.addEventListener("keydown",R=>{let G=R.target;if(!(G instanceof HTMLElement))return;let xe=String(G.tagName||"").toLowerCase();if(xe==="input"||xe==="textarea"||xe==="select"||xe==="button"||xe==="a"||G.isContentEditable===!0)return;let A=G.closest(".board-card");if(!A)return;let g=String(R.key||"");if(g==="Enter"||g===" "){R.preventDefault();let te=A.getAttribute("data-issue-id");te&&r(te);return}if(g!=="ArrowUp"&&g!=="ArrowDown"&&g!=="ArrowLeft"&&g!=="ArrowRight")return;R.preventDefault();let k=A.closest(".board-column");if(!k)return;let j=Array.from(k.querySelectorAll(".board-card")),ne=j.indexOf(A);if(g==="ArrowDown"&&ne<j.length-1){_e(A,j[ne+1]);return}if(g==="ArrowUp"&&ne>0){_e(A,j[ne-1]);return}if(g==="ArrowLeft"||g==="ArrowRight"){let te=Array.from(e.querySelectorAll(".board-column")),be=te.indexOf(k),Ee=g==="ArrowRight"?1:-1,et=be+Ee;for(;et>=0&&et<te.length;){let dt=te[et].querySelector(".board-card");if(dt){_e(A,dt);return}et+=Ee}}});function _e(R,G){try{R.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let I=null;w&&w.subscribe&&(I=w.subscribe(()=>{try{Y()}catch{}}));let Z=null;i&&i.subscribe&&(Z=i.subscribe(()=>{try{Y()}catch{}}));let re=null;return l&&l.subscribe&&(re=l.subscribe(()=>{mt()})),{async load(){n("load"),Y()},clear(){Je(),ze(),I&&(I(),I=null),Z&&(Z(),Z=null),re&&(re(),re=null),e.replaceChildren(),F=[],z=[],V=[],oe=[],M=[],D=[],U=new Map,W=new Map}}}function rs(e,t){return e.filter(n=>{let r=eo(n);return!(r&&t.has(r))})}async function i_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function cn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ur(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ss(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function l_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ur(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ur(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Ln(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await l_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var c_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Sc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},u_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mt(e){return typeof e=="string"&&e.length>0?e:null}function Cr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ct(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Tc(e,t,n){let r=Mt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Mt(n[e]);return s===null?null:{value:s,source:"global"}}function os(e,t,n,r){return Tc(e,t,n)||{value:r,source:"base"}}function Ma(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&jt(s?.[t])){let a=Mt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&jt(s)){for(let a of Object.values(s))if(jt(a)){let i=Mt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Mt(r?.runners?.[o]?.models?.[e]?.id)||e}function d_(e,t){return Mt(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return Ct(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Cr(e):e;return Ct(e,t,r,e,"explicit")}function Cc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];jt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(jt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function p_(e,t){let n=[],r=e?.implementation?.model_catalog;jt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(jt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function f_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of p_(t,n)){let o=Cc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Da(e){return Ct(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ec(e,t,n){let r=Tc(e,t,n);return r?Rr(r.value,r.source):Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&jt(r.session)?r.session:null,o=r?.supported===!0&&jt(r.orchestration)?r.orchestration:null,a=jt(e.runner_catalog)?e.runner_catalog:null,i=Mt(n.quick_fix_impl_model),l=f_(i,s,a),u={};if(s){let d=os("workflow_mode",t,n,Mt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ct(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Rr(d.value,d.source);for(let M of["spec_review","plan_review","impl_review"]){let D=`${M}_model`,q=Mt(M==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),K=os(D,t,n,q);if(K.value===null)u[D]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(K.value!=="self"&&K.value!=="skip"&&!jt(s.review?.reviewers?.[K.value]))u[D]=Da(Ct(K.value,K.source,"",null,"explicit"));else{let T=d_(K.value,s);u[D]=Ct(K.value,K.source,Cr(T),T,K.source==="base"?"default":"explicit")}}for(let[M,D]of Object.entries(Sc)){let q=u[D].value;if(q==="self"||q==="skip"){u[M]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let K=Mt(s.review?.reviewers?.[q||""]?.effort),T=os(M,t,n,K);u[M]=T.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(T.value,T.source,T.value,T.value,T.source==="base"?"default":"explicit")}let _=jt(s.implementation?.default)?s.implementation.default:{},h=Mt(e.route),w=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),S=jt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=w&&jt(S[h])?S[h]:{};for(let M of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let D=os(M,t,n,M==="impl_dispatch"?Mt(F.dispatch)||Mt(_.dispatch):Mt(_[M.replace("impl_","")]));u[M]=D.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit")}let z=Mt(t.impl_runtime),V=z==="inherit"?Mt(e.controller_runtime):z,oe=h==="quick_fix"&&Mt(t.impl_dispatch)===null&&l.runtime!==null&&(z===null||V===l.runtime);if(oe){let M=l.runtime,D=i;u.impl_dispatch=Ct("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),z===null&&(u.impl_runtime=Ct(M,"global",`${M} (\uC720\uB3C4)`,M,"explicit")),Mt(t.impl_model)===null&&(u.impl_model=Ct(D,"global",D,D,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let M of["impl_runtime","impl_model","impl_effort","impl_speed"])u[M]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!oe&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let M=u.impl_runtime.value==="inherit"?Mt(e.controller_runtime):u.impl_runtime.value,D=M?Cc(M,s,a):[];if(u.impl_model.value!=="auto"&&D.length>0&&!D.includes(u.impl_model.value))u.impl_model=Da(u.impl_model);else{let q=Ma(u.impl_model.value,M,s,a);u.impl_model.display=Cr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let M=Mt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),D=M?Mt(s.implementation?.effort_by_transport?.[M]?.auto):null;D&&!u_.has(D)?(u.impl_effort.display=`${D} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=D,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",u.impl_speed.source))}}else for(let d of c_.filter(_=>!_.startsWith("orchestration_")))u[d]=Ec(d,t,n);if(!s){for(let[d,_]of Object.entries(Sc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Ec(d,t,n);continue}let _=d.replace("orchestration_",""),h=Mt(o[_]),w=os(d,t,n,h);if(d==="orchestration_effort"&&w.source==="base"){u[d]=Ct(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){u[d]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let S=w.source==="base"?Mt(o.model_id)||w.value:Ma(w.value,null,s,a);u[d]=Ct(w.value,w.source,Cr(S),S,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){u[d]=w.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",w.source);continue}u[d]=Rr(w.value,w.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ct(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Cr(d)})`,null,"default")}else if(l.runtime!==null){let d=Ma(i,l.runtime,s,a);u.quick_fix_impl_model=Ct(i,"global",Cr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=Da(Ct(i,"global","",null,"explicit")):u.quick_fix_impl_model=Rr(i,"global");return u}function __(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function uo(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return nn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Mt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:__(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Or(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Pc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],as=[...In,"reasoning_output_tokens"],m_={codex:["implementation","review-consult"],claude:["subagent"]};function Na(e){let t=0;for(let n of In)t+=Ut(e?.[n]);return t}function g_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function Rc(e){return!e||typeof e!="object"?!1:as.some(t=>Number.isFinite(e[t]))}function h_(e){let t={};for(let n of as)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Oc(e){let t={};for(let n of as)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Lc(e,t){return e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):Na(t)}function b_(e){return e==="claude"?"Claude":"Codex"}function y_(e){return`\u03C4 ${Mc(e)}`}function v_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Pc),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${b_(n)} ${y_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:v_(n,r)})}return t}function fo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of as)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Ut(i.breakdown[l])+Ut(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qa(e){return!e||typeof e!="object"?null:mn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function w_(e){return e==="codex"?"codex":"claude"}function Tn(){return{subtotal:0,breakdown:h_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function po(e,t,n){e.subtotal+=t.subtotal;for(let r of as)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ic(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Mc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Lr(e){return g_(e)?`\u03C4 ${Mc(Na(e))}`:null}function Pn(e){let t=Lr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function is(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Na(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Pc),n.join(`
`)}function mn(e,t){let n={claude:Tn(),codex:Tn()},r={orchestrator:{claude:Tn(),codex:Tn()},implementation:{claude:Tn(),codex:Tn()},"review-consult":{claude:Tn(),codex:Tn()},subagent:{claude:Tn(),codex:Tn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Rc(l)){let d=w_(i.runner),_=Oc(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Lc(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),po(n[d],h,!0),po(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!m_[_].includes(d.role)||!Rc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let w=Oc(d.usage),S={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Lc(_,w)};S.receipt_id=h,typeof d.agent_type=="string"&&(S.agent_type=d.agent_type),typeof d.agent_id=="string"&&(S.agent_id=d.agent_id),typeof d.model=="string"&&(S.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(S.effort=d.effort),typeof d.session_id=="string"?S.session_id=d.session_id:typeof d.thread_id=="string"&&(S.session_id=d.thread_id),typeof d.turn_id=="string"&&(S.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(S.completed_at=d.completed_at),w.replayed===!0&&(S.replayed=!0),po(n[_],S,!1),po(r[S.role][_],S,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=Ic(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...Ic(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:zc,setPrototypeOf:Dc,isFrozen:k_,getPrototypeOf:$_,getOwnPropertyDescriptor:x_}=Object,{freeze:Yt,seal:gn,create:Ha}=Object,{apply:Ga,construct:Va}=typeof Reflect<"u"&&Reflect;Yt||(Yt=function(t){return t});gn||(gn=function(t){return t});Ga||(Ga=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Va||(Va=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var _o=Zt(Array.prototype.forEach),A_=Zt(Array.prototype.lastIndexOf),Nc=Zt(Array.prototype.pop),ls=Zt(Array.prototype.push),S_=Zt(Array.prototype.splice),go=Zt(String.prototype.toLowerCase),Fa=Zt(String.prototype.toString),ja=Zt(String.prototype.match),cs=Zt(String.prototype.replace),E_=Zt(String.prototype.indexOf),T_=Zt(String.prototype.trim),vn=Zt(Object.prototype.hasOwnProperty),Kt=Zt(RegExp.prototype.test),us=C_(TypeError);function Zt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ga(e,t,r)}}function C_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Va(e,n)}}function ct(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:go;Dc&&Dc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(k_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function R_(e){for(let t=0;t<e.length;t++)vn(e,t)||(e[t]=null);return e}function Mn(e){let t=Ha(null);for(let[n,r]of zc(e))vn(e,n)&&(Array.isArray(r)?t[n]=R_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Mn(r):t[n]=r);return t}function ds(e,t){for(;e!==null;){let r=x_(e,t);if(r){if(r.get)return Zt(r.get);if(typeof r.value=="function")return Zt(r.value)}e=$_(e)}function n(){return null}return n}var qc=Yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ba=Yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ua=Yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),O_=Yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wa=Yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),L_=Yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fc=Yt(["#text"]),jc=Yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),za=Yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bc=Yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mo=Yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),I_=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),P_=gn(/<%[\w\W]*|[\w\W]*%>/gm),M_=gn(/\$\{[\w\W]*/gm),D_=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),N_=gn(/^aria-[\-\w]+$/),Hc=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),q_=gn(/^(?:\w+script|data):/i),F_=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Gc=gn(/^html$/i),j_=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),Uc=Object.freeze({__proto__:null,ARIA_ATTR:N_,ATTR_WHITESPACE:F_,CUSTOM_ELEMENT:j_,DATA_ATTR:D_,DOCTYPE_NAME:Gc,ERB_EXPR:P_,IS_ALLOWED_URI:Hc,IS_SCRIPT_OR_DATA:q_,MUSTACHE_EXPR:I_,TMPLIT_EXPR:M_}),ps={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},B_=function(){return typeof window>"u"?null:window},U_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Wc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:B_(),t=Ne=>Vc(Ne);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ps.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:w}=e,S=l.prototype,F=ds(S,"cloneNode"),z=ds(S,"remove"),V=ds(S,"nextSibling"),oe=ds(S,"childNodes"),M=ds(S,"parentNode");if(typeof a=="function"){let Ne=n.createElement("template");Ne.content&&Ne.content.ownerDocument&&(n=Ne.content.ownerDocument)}let D,q="",{implementation:K,createNodeIterator:T,createDocumentFragment:U,getElementsByTagName:W}=n,{importNode:we}=r,he=Wc();t.isSupported=typeof zc=="function"&&typeof M=="function"&&K&&K.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:pe,ERB_EXPR:H,TMPLIT_EXPR:Ce,DATA_ATTR:Re,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:$e}=Uc,{IS_ALLOWED_URI:Y}=Uc,X=null,ye=ct({},[...qc,...Ba,...Ua,...Wa,...Fc]),me=null,Be=ct({},[...jc,...za,...Bc,...mo]),ae=Object.seal(Ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ze=null,it=null,P=Object.seal(Ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,ve=!0,Se=!1,He=!0,qe=!1,Ve=!0,tt=!1,$t=!1,_t=!1,J=!1,Q=!1,Le=!1,Je=!0,Ie=!1,ke="user-content-",ze=!0,Qe=!1,st={},nt=null,mt=ct({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),xt=null,St=ct({},["audio","video","img","source","image","track"]),kt=null,Ot=ct({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),bt="http://www.w3.org/1998/Math/MathML",Ge="http://www.w3.org/2000/svg",_e="http://www.w3.org/1999/xhtml",I=_e,Z=!1,re=null,R=ct({},[bt,Ge,_e],Fa),G=ct({},["mi","mo","mn","ms","mtext"]),xe=ct({},["annotation-xml"]),A=ct({},["title","style","font","a","script"]),g=null,k=["application/xhtml+xml","text/html"],j="text/html",ne=null,te=null,be=n.createElement("form"),Ee=function(L){return L instanceof RegExp||L instanceof Function},et=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(te&&te===L)){if((!L||typeof L!="object")&&(L={}),L=Mn(L),g=k.indexOf(L.PARSER_MEDIA_TYPE)===-1?j:L.PARSER_MEDIA_TYPE,ne=g==="application/xhtml+xml"?Fa:go,X=vn(L,"ALLOWED_TAGS")?ct({},L.ALLOWED_TAGS,ne):ye,me=vn(L,"ALLOWED_ATTR")?ct({},L.ALLOWED_ATTR,ne):Be,re=vn(L,"ALLOWED_NAMESPACES")?ct({},L.ALLOWED_NAMESPACES,Fa):R,kt=vn(L,"ADD_URI_SAFE_ATTR")?ct(Mn(Ot),L.ADD_URI_SAFE_ATTR,ne):Ot,xt=vn(L,"ADD_DATA_URI_TAGS")?ct(Mn(St),L.ADD_DATA_URI_TAGS,ne):St,nt=vn(L,"FORBID_CONTENTS")?ct({},L.FORBID_CONTENTS,ne):mt,Ze=vn(L,"FORBID_TAGS")?ct({},L.FORBID_TAGS,ne):Mn({}),it=vn(L,"FORBID_ATTR")?ct({},L.FORBID_ATTR,ne):Mn({}),st=vn(L,"USE_PROFILES")?L.USE_PROFILES:!1,fe=L.ALLOW_ARIA_ATTR!==!1,ve=L.ALLOW_DATA_ATTR!==!1,Se=L.ALLOW_UNKNOWN_PROTOCOLS||!1,He=L.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=L.SAFE_FOR_TEMPLATES||!1,Ve=L.SAFE_FOR_XML!==!1,tt=L.WHOLE_DOCUMENT||!1,J=L.RETURN_DOM||!1,Q=L.RETURN_DOM_FRAGMENT||!1,Le=L.RETURN_TRUSTED_TYPE||!1,_t=L.FORCE_BODY||!1,Je=L.SANITIZE_DOM!==!1,Ie=L.SANITIZE_NAMED_PROPS||!1,ze=L.KEEP_CONTENT!==!1,Qe=L.IN_PLACE||!1,Y=L.ALLOWED_URI_REGEXP||Hc,I=L.NAMESPACE||_e,G=L.MATHML_TEXT_INTEGRATION_POINTS||G,xe=L.HTML_INTEGRATION_POINTS||xe,ae=L.CUSTOM_ELEMENT_HANDLING||{},L.CUSTOM_ELEMENT_HANDLING&&Ee(L.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=L.CUSTOM_ELEMENT_HANDLING.tagNameCheck),L.CUSTOM_ELEMENT_HANDLING&&Ee(L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),L.CUSTOM_ELEMENT_HANDLING&&typeof L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),qe&&(ve=!1),Q&&(J=!0),st&&(X=ct({},Fc),me=[],st.html===!0&&(ct(X,qc),ct(me,jc)),st.svg===!0&&(ct(X,Ba),ct(me,za),ct(me,mo)),st.svgFilters===!0&&(ct(X,Ua),ct(me,za),ct(me,mo)),st.mathMl===!0&&(ct(X,Wa),ct(me,Bc),ct(me,mo))),L.ADD_TAGS&&(typeof L.ADD_TAGS=="function"?P.tagCheck=L.ADD_TAGS:(X===ye&&(X=Mn(X)),ct(X,L.ADD_TAGS,ne))),L.ADD_ATTR&&(typeof L.ADD_ATTR=="function"?P.attributeCheck=L.ADD_ATTR:(me===Be&&(me=Mn(me)),ct(me,L.ADD_ATTR,ne))),L.ADD_URI_SAFE_ATTR&&ct(kt,L.ADD_URI_SAFE_ATTR,ne),L.FORBID_CONTENTS&&(nt===mt&&(nt=Mn(nt)),ct(nt,L.FORBID_CONTENTS,ne)),ze&&(X["#text"]=!0),tt&&ct(X,["html","head","body"]),X.table&&(ct(X,["tbody"]),delete Ze.tbody),L.TRUSTED_TYPES_POLICY){if(typeof L.TRUSTED_TYPES_POLICY.createHTML!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof L.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=L.TRUSTED_TYPES_POLICY,q=D.createHTML("")}else D===void 0&&(D=U_(w,s)),D!==null&&typeof q=="string"&&(q=D.createHTML(""));Yt&&Yt(L),te=L}},dt=ct({},[...Ba,...Ua,...O_]),De=ct({},[...Wa,...L_]),ot=function(L){let de=M(L);(!de||!de.tagName)&&(de={namespaceURI:I,tagName:"template"});let Pe=go(L.tagName),ut=go(de.tagName);return re[L.namespaceURI]?L.namespaceURI===Ge?de.namespaceURI===_e?Pe==="svg":de.namespaceURI===bt?Pe==="svg"&&(ut==="annotation-xml"||G[ut]):!!dt[Pe]:L.namespaceURI===bt?de.namespaceURI===_e?Pe==="math":de.namespaceURI===Ge?Pe==="math"&&xe[ut]:!!De[Pe]:L.namespaceURI===_e?de.namespaceURI===Ge&&!xe[ut]||de.namespaceURI===bt&&!G[ut]?!1:!De[Pe]&&(A[Pe]||!dt[Pe]):!!(g==="application/xhtml+xml"&&re[L.namespaceURI]):!1},Lt=function(L){ls(t.removed,{element:L});try{M(L).removeChild(L)}catch{z(L)}},gt=function(L,de){try{ls(t.removed,{attribute:de.getAttributeNode(L),from:de})}catch{ls(t.removed,{attribute:null,from:de})}if(de.removeAttribute(L),L==="is")if(J||Q)try{Lt(de)}catch{}else try{de.setAttribute(L,"")}catch{}},pn=function(L){let de=null,Pe=null;if(_t)L="<remove></remove>"+L;else{let yt=ja(L,/^[\r\n\t ]+/);Pe=yt&&yt[0]}g==="application/xhtml+xml"&&I===_e&&(L='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+L+"</body></html>");let ut=D?D.createHTML(L):L;if(I===_e)try{de=new h().parseFromString(ut,g)}catch{}if(!de||!de.documentElement){de=K.createDocument(I,"template",null);try{de.documentElement.innerHTML=Z?q:ut}catch{}}let Et=de.body||de.documentElement;return L&&Pe&&Et.insertBefore(n.createTextNode(Pe),Et.childNodes[0]||null),I===_e?W.call(de,tt?"html":"body")[0]:tt?de.documentElement:Et},Bt=function(L){return T.call(L.ownerDocument||L,L,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},qt=function(L){return L instanceof _&&(typeof L.nodeName!="string"||typeof L.textContent!="string"||typeof L.removeChild!="function"||!(L.attributes instanceof d)||typeof L.removeAttribute!="function"||typeof L.setAttribute!="function"||typeof L.namespaceURI!="string"||typeof L.insertBefore!="function"||typeof L.hasChildNodes!="function")},Gt=function(L){return typeof i=="function"&&L instanceof i};function Ft(Ne,L,de){_o(Ne,Pe=>{Pe.call(t,L,de,te)})}let Dt=function(L){let de=null;if(Ft(he.beforeSanitizeElements,L,null),qt(L))return Lt(L),!0;let Pe=ne(L.nodeName);if(Ft(he.uponSanitizeElement,L,{tagName:Pe,allowedTags:X}),Ve&&L.hasChildNodes()&&!Gt(L.firstElementChild)&&Kt(/<[/\w!]/g,L.innerHTML)&&Kt(/<[/\w!]/g,L.textContent)||L.nodeType===ps.progressingInstruction||Ve&&L.nodeType===ps.comment&&Kt(/<[/\w]/g,L.data))return Lt(L),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(Pe))&&(!X[Pe]||Ze[Pe])){if(!Ze[Pe]&&Xt(Pe)&&(ae.tagNameCheck instanceof RegExp&&Kt(ae.tagNameCheck,Pe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Pe)))return!1;if(ze&&!nt[Pe]){let ut=M(L)||L.parentNode,Et=oe(L)||L.childNodes;if(Et&&ut){let yt=Et.length;for(let v=yt-1;v>=0;--v){let b=F(Et[v],!0);b.__removalCount=(L.__removalCount||0)+1,ut.insertBefore(b,V(L))}}}return Lt(L),!0}return L instanceof l&&!ot(L)||(Pe==="noscript"||Pe==="noembed"||Pe==="noframes")&&Kt(/<\/no(script|embed|frames)/i,L.innerHTML)?(Lt(L),!0):(qe&&L.nodeType===ps.text&&(de=L.textContent,_o([pe,H,Ce],ut=>{de=cs(de,ut," ")}),L.textContent!==de&&(ls(t.removed,{element:L.cloneNode()}),L.textContent=de)),Ft(he.afterSanitizeElements,L,null),!1)},We=function(L,de,Pe){if(Je&&(de==="id"||de==="name")&&(Pe in n||Pe in be))return!1;if(!(ve&&!it[de]&&Kt(Re,de))){if(!(fe&&Kt(ue,de))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(de,L))){if(!me[de]||it[de]){if(!(Xt(L)&&(ae.tagNameCheck instanceof RegExp&&Kt(ae.tagNameCheck,L)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(L))&&(ae.attributeNameCheck instanceof RegExp&&Kt(ae.attributeNameCheck,de)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(de,L))||de==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Kt(ae.tagNameCheck,Pe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(Pe))))return!1}else if(!kt[de]){if(!Kt(Y,cs(Pe,Ae,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&L!=="script"&&E_(Pe,"data:")===0&&xt[L])){if(!(Se&&!Kt(ie,cs(Pe,Ae,"")))){if(Pe)return!1}}}}}}}return!0},Xt=function(L){return L!=="annotation-xml"&&ja(L,$e)},Vt=function(L){Ft(he.beforeSanitizeAttributes,L,null);let{attributes:de}=L;if(!de||qt(L))return;let Pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},ut=de.length;for(;ut--;){let Et=de[ut],{name:yt,namespaceURI:v,value:b}=Et,$=ne(yt),N=b,ee=yt==="value"?N:T_(N);if(Pe.attrName=$,Pe.attrValue=ee,Pe.keepAttr=!0,Pe.forceKeepAttr=void 0,Ft(he.uponSanitizeAttribute,L,Pe),ee=Pe.attrValue,Ie&&($==="id"||$==="name")&&(gt(yt,L),ee=ke+ee),Ve&&Kt(/((--!?|])>)|<\/(style|title|textarea)/i,ee)){gt(yt,L);continue}if($==="attributename"&&ja(ee,"href")){gt(yt,L);continue}if(Pe.forceKeepAttr)continue;if(!Pe.keepAttr){gt(yt,L);continue}if(!He&&Kt(/\/>/i,ee)){gt(yt,L);continue}qe&&_o([pe,H,Ce],Me=>{ee=cs(ee,Me," ")});let ge=ne(L.nodeName);if(!We(ge,$,ee)){gt(yt,L);continue}if(D&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!v)switch(w.getAttributeType(ge,$)){case"TrustedHTML":{ee=D.createHTML(ee);break}case"TrustedScriptURL":{ee=D.createScriptURL(ee);break}}if(ee!==N)try{v?L.setAttributeNS(v,yt,ee):L.setAttribute(yt,ee),qt(L)?Lt(L):Nc(t.removed)}catch{gt(yt,L)}}Ft(he.afterSanitizeAttributes,L,null)},lt=function Ne(L){let de=null,Pe=Bt(L);for(Ft(he.beforeSanitizeShadowDOM,L,null);de=Pe.nextNode();)Ft(he.uponSanitizeShadowNode,de,null),Dt(de),Vt(de),de.content instanceof o&&Ne(de.content);Ft(he.afterSanitizeShadowDOM,L,null)};return t.sanitize=function(Ne){let L=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Pe=null,ut=null,Et=null;if(Z=!Ne,Z&&(Ne="<!-->"),typeof Ne!="string"&&!Gt(Ne))if(typeof Ne.toString=="function"){if(Ne=Ne.toString(),typeof Ne!="string")throw us("dirty is not a string, aborting")}else throw us("toString is not a function");if(!t.isSupported)return Ne;if($t||et(L),t.removed=[],typeof Ne=="string"&&(Qe=!1),Qe){if(Ne.nodeName){let b=ne(Ne.nodeName);if(!X[b]||Ze[b])throw us("root node is forbidden and cannot be sanitized in-place")}}else if(Ne instanceof i)de=pn("<!---->"),Pe=de.ownerDocument.importNode(Ne,!0),Pe.nodeType===ps.element&&Pe.nodeName==="BODY"||Pe.nodeName==="HTML"?de=Pe:de.appendChild(Pe);else{if(!J&&!qe&&!tt&&Ne.indexOf("<")===-1)return D&&Le?D.createHTML(Ne):Ne;if(de=pn(Ne),!de)return J?null:Le?q:""}de&&_t&&Lt(de.firstChild);let yt=Bt(Qe?Ne:de);for(;ut=yt.nextNode();)Dt(ut),Vt(ut),ut.content instanceof o&&lt(ut.content);if(Qe)return Ne;if(J){if(Q)for(Et=U.call(de.ownerDocument);de.firstChild;)Et.appendChild(de.firstChild);else Et=de;return(me.shadowroot||me.shadowrootmode)&&(Et=we.call(r,Et,!0)),Et}let v=tt?de.outerHTML:de.innerHTML;return tt&&X["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Kt(Gc,de.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+v),qe&&_o([pe,H,Ce],b=>{v=cs(v,b," ")}),D&&Le?D.createHTML(v):v},t.setConfig=function(){let Ne=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(Ne),$t=!0},t.clearConfig=function(){te=null,$t=!1},t.isValidAttribute=function(Ne,L,de){te||et({});let Pe=ne(Ne),ut=ne(L);return We(Pe,ut,de)},t.addHook=function(Ne,L){typeof L=="function"&&ls(he[Ne],L)},t.removeHook=function(Ne,L){if(L!==void 0){let de=A_(he[Ne],L);return de===-1?void 0:S_(he[Ne],de,1)[0]}return Nc(he[Ne])},t.removeHooks=function(Ne){he[Ne]=[]},t.removeAllHooks=function(){he=Wc()},t}var Kc=Vc();var Dn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ho=e=>(...t)=>({_$litDirective$:e,values:t}),Ir=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var fs=class extends Ir{constructor(t){if(super(t),this.it=Nt,t.type!==Dn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Nt||t==null)return this._t=void 0,this.it=t;if(t===fn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};fs.directiveName="unsafeHTML",fs.resultType=1;var Yc=ho(fs);function Qa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pr=Qa();function nu(e){pr=e}var hs={exec:()=>null};function ft(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Qt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var W_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Qt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},z_=/^(?:[ \t]*(?:\n|$))+/,H_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,G_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,V_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Xa=/(?:[*+-]|\d{1,9}[.)])/,ru=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,su=ft(ru).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),K_=ft(ru).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ja=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Y_=/^[^\n]+/,ei=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Z_=ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ei).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Q_=ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Xa).getRegex(),$o="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ti=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,X_=ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ti).replace("tag",$o).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ou=ft(Ja).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),J_=ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ou).getRegex(),ni={blockquote:J_,code:H_,def:Z_,fences:G_,heading:V_,hr:bs,html:X_,lheading:su,list:Q_,newline:z_,paragraph:ou,table:hs,text:Y_},Zc=ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),em={...ni,lheading:K_,table:Zc,paragraph:ft(Ja).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex()},tm={...ni,html:ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ti).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ft(Ja).replace("hr",bs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",su).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},nm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,au=/^( {2,}|\\)\n(?!\s*$)/,sm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xo=/[\p{P}\p{S}]/u,ri=/[\s\p{P}\p{S}]/u,iu=/[^\s\p{P}\p{S}]/u,om=ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ri).getRegex(),lu=/(?!~)[\p{P}\p{S}]/u,am=/(?!~)[\s\p{P}\p{S}]/u,im=/(?:[^\s\p{P}\p{S}]|~)/u,lm=ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",W_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),cu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cm=ft(cu,"u").replace(/punct/g,xo).getRegex(),um=ft(cu,"u").replace(/punct/g,lu).getRegex(),uu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",dm=ft(uu,"gu").replace(/notPunctSpace/g,iu).replace(/punctSpace/g,ri).replace(/punct/g,xo).getRegex(),pm=ft(uu,"gu").replace(/notPunctSpace/g,im).replace(/punctSpace/g,am).replace(/punct/g,lu).getRegex(),fm=ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,iu).replace(/punctSpace/g,ri).replace(/punct/g,xo).getRegex(),_m=ft(/\\(punct)/,"gu").replace(/punct/g,xo).getRegex(),mm=ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gm=ft(ti).replace("(?:-->|$)","-->").getRegex(),hm=ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,bm=ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),du=ft(/^!?\[(label)\]\[(ref)\]/).replace("label",vo).replace("ref",ei).getRegex(),pu=ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",ei).getRegex(),ym=ft("reflink|nolink(?!\\()","g").replace("reflink",du).replace("nolink",pu).getRegex(),Qc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,si={_backpedal:hs,anyPunctuation:_m,autolink:mm,blockSkip:lm,br:au,code:rm,del:hs,emStrongLDelim:cm,emStrongRDelimAst:dm,emStrongRDelimUnd:fm,escape:nm,link:bm,nolink:pu,punctuation:om,reflink:du,reflinkSearch:ym,tag:hm,text:sm,url:hs},vm={...si,link:ft(/^!?\[(label)\]\((.*?)\)/).replace("label",vo).getRegex(),reflink:ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vo).getRegex()},Ka={...si,emStrongRDelimAst:pm,emStrongLDelim:um,url:ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qc).getRegex()},wm={...Ka,br:ft(au).replace("{2,}","*").getRegex(),text:ft(Ka.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},bo={normal:ni,gfm:em,pedantic:tm},_s={normal:si,gfm:Ka,breaks:wm,pedantic:vm},km={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xc=e=>km[e];function Nn(e,t){if(t){if(Qt.escapeTest.test(e))return e.replace(Qt.escapeReplace,Xc)}else if(Qt.escapeTestNoEncode.test(e))return e.replace(Qt.escapeReplaceNoEncode,Xc);return e}function Jc(e){try{e=encodeURI(e).replace(Qt.percentDecode,"%")}catch{return null}return e}function eu(e,t){let n=e.replace(Qt.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(Qt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Qt.slashPipe,"|");return r}function ms(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function $m(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function tu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function xm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var wo=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ms(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=xm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ms(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ms(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ms(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,S=w.raw+`
`+n.join(`
`),F=this.blockquote(S);o[o.length-1]=F,r=r.substring(0,r.length-w.raw.length)+F.raw,s=s.substring(0,s.length-w.text.length)+F.text;break}else if(h?.type==="list"){let w=h,S=w.raw+`
`+n.join(`
`),F=this.list(S);o[o.length-1]=F,r=r.substring(0,r.length-h.raw.length)+F.raw,s=s.substring(0,s.length-w.raw.length)+F.raw,n=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],w=!_.trim(),S=0;if(this.options.pedantic?(S=2,d=_.trimStart()):w?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,d=_.slice(S),S+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(S),z=this.rules.other.hrRegex(S),V=this.rules.other.fencesBeginRegex(S),oe=this.rules.other.headingBeginRegex(S),M=this.rules.other.htmlBeginRegex(S);for(;e;){let D=e.split(`
`,1)[0],q;if(h=D,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),q=h):q=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||oe.test(h)||M.test(h)||F.test(h)||z.test(h))break;if(q.search(this.rules.other.nonSpaceChar)>=S||!h.trim())d+=`
`+q.slice(S);else{if(w||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||oe.test(_)||z.test(_))break;d+=`
`+h}!w&&!h.trim()&&(w=!0),u+=D+`
`,e=e.substring(D.length+1),_=q.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=eu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(eu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ms(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=$m(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),tu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return tu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let w=_.slice(1,-1);return{type:"em",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},wn=class Ya{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pr,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Qt,block:bo.normal,inline:_s.normal};this.options.pedantic?(n.block=bo.pedantic,n.inline=_s.pedantic):this.options.gfm&&(n.block=bo.gfm,this.options.breaks?n.inline=_s.breaks:n.inline=_s.gfm),this.tokenizer.rules=n}static get rules(){return{block:bo,inline:_s}}static lex(t,n){return new Ya(n).lex(t)}static lexInline(t,n){return new Ya(n).inlineTokens(t)}lex(t){t=t.replace(Qt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Qt.tabCharGlobal,"    ").replace(Qt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ko=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||pr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Qt.notSpaceStart)?.[0],s=e.replace(Qt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Nn(r)+'">'+(n?s:Nn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Nn(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Nn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Jc(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Nn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Jc(e);if(s===null)return Nn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Nn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Nn(e.text)}},oi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},kn=class Za{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||pr,this.options.renderer=this.options.renderer||new ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oi}static parse(t,n){return new Za(n).parse(t)}static parseInline(t,n){return new Za(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},yo,gs=(yo=class{constructor(e){At(this,"options");At(this,"block");this.options=e||pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?wn.lex:wn.lexInline}provideParser(){return this.block?kn.parse:kn.parseInline}},At(yo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(yo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yo),Am=class{constructor(...e){At(this,"defaults",Qa());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",kn);At(this,"Renderer",ko);At(this,"TextRenderer",oi);At(this,"Lexer",wn);At(this,"Tokenizer",wo);At(this,"Hooks",gs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new ko(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new gs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];gs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&gs.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return wn.lex(e,t??this.defaults)}parser(e,t){return kn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?wn.lex:wn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?kn.parse:kn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?wn.lex:wn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?kn.parse:kn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Nn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},dr=new Am;function wt(e,t){return dr.parse(e,t)}wt.options=wt.setOptions=function(e){return dr.setOptions(e),wt.defaults=dr.defaults,nu(wt.defaults),wt};wt.getDefaults=Qa;wt.defaults=pr;wt.use=function(...e){return dr.use(...e),wt.defaults=dr.defaults,nu(wt.defaults),wt};wt.walkTokens=function(e,t){return dr.walkTokens(e,t)};wt.parseInline=dr.parseInline;wt.Parser=kn;wt.parser=kn.parse;wt.Renderer=ko;wt.TextRenderer=oi;wt.Lexer=wn;wt.lexer=wn.lex;wt.Tokenizer=wo;wt.Hooks=gs;wt.parse=wt;var Uv=wt.options,Wv=wt.setOptions,zv=wt.use,Hv=wt.walkTokens,Gv=wt.parseInline;var Vv=kn.parse,Kv=wn.lex;function Gn(e){let t=wt.parse(e),n=Kc.sanitize(t);return Yc(n)}function qn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Pr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var _u={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Sm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Em=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Tm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function ai(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ii(e,t){let n=ai(e),r=ai(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function mu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Cn(s)&&typeof s.text=="string"?s.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Cm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:_u[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ai(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ii(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=ii(Cn(i)?i.old_string:"",Cn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function li(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ci(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Em.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Tm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Rm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Om(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Cn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ci(a.text));else if(a.type==="thinking"){let i=li(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Cm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?fu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Cn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=mu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?fu([s],n):[s]}return[]}function fu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Lm(e){let t=typeof e.command=="string"?e.command:"",n=mu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:_u.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Im(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ci(t.text)];if(t.type==="reasoning"){let n=li(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Lm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Pm(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ci(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=li(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Sm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Mm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Dm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function gu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Dm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Rm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Pm(o):Mm(o)?Im(o):Om(o,n);return a.length>0&&(r.progress=null),a}}}function ui(e){let t=[],n=gu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Nm=5,qm=10,Fm=/Task\s+#(\d+)/,jm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Bm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function So(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Um(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Wm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function zm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Fm.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Hm(e){if(e.tool==="Bash"){let t=e.command||"";return jm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Bm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Gm(e){let t=e.filter(s=>s.kind==="tool").slice(-qm),n=new Map;t.forEach((s,o)=>{let a=Hm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Vm(e){let t=Wm(e);if(t)return{text:t,guess:!1};let n=zm(e);if(n)return{text:n,guess:!1};let r=Gm(e);return r?{text:r,guess:!0}:null}function Km(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:ln(e,t)}function Mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=!1,d={},_=!0,h=new Set,w=new Set,S=null,F=null,z=!1,V=!1,oe=!1,M=null,D=null;function q(){z=!1,V=!1,oe=!1,M=null,D=null}async function K(J){if(n){V=!0,oe=!1,ae();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...l?{root_dir:l}:{}}));if(o!==J)return;!Q||typeof Q!="object"||Array.isArray(Q)?oe=!0:(M=Q,D=J)}catch{o===J&&(oe=!0)}finally{o===J&&(V=!1,ae())}}}function T(){if(z=!z,z&&o&&D!==o){K(o);return}ae()}function U(){if(!z)return"";let J=Pr({loading:V,error:oe});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!M)return"";if(M.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ao(M.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function W(){if(!i||!r)return[];let J=r.get(i);return ui(J?J.lines:[])}function we(){if(!i||!r)return null;let J=r.get(i),Q=J?J.last_event_at:null;return typeof Q=="number"?Q:null}function he(){return d.status==="running"}function pe(){if(he()&&o){F||(F=setInterval(()=>ae(),1e3));return}H()}function H(){F&&(clearInterval(F),F=null)}function Ce(J){let Q=[],Le=0;for(;Le<J.length;){let{idx:Je,line:Ie}=J[Le];if(Ie.kind==="tool"){let ke=Le;for(;ke<J.length&&J[ke].line.kind==="tool"&&J[ke].line.tool===Ie.tool;)ke+=1;if(ke-Le>=Nm&&!w.has(Je)){Q.push({kind:"group",idx:Je,tool:Ie.tool||"",lines:J.slice(Le,ke)}),Le=ke;continue}}Q.push({kind:"line",idx:Je,line:Ie}),Le+=1}return Q}function Re(J){let Q=[],Le=new Map;for(let ke=0;ke<J.length;ke+=1){let ze=J[ke],Qe=ze.parent_tool_use_id;if(typeof Qe=="string"&&Qe.length>0){let st=Le.get(Qe);st||(st={kind:"subagent",idx:ke,launch_id:Qe,agent_type:null,header:null,lines:[]},Le.set(Qe,st),Q.push(st)),st.lines.push({idx:ke,line:ze});continue}if(ze.kind==="tool"&&ze.tool==="Agent"&&typeof ze.launch_id=="string"&&ze.launch_id.length>0){let st=ue(ze),nt=Le.get(ze.launch_id);if(nt){nt.header={idx:ke,line:ze},nt.agent_type=st;continue}let mt={kind:"subagent",idx:ke,launch_id:ze.launch_id,agent_type:st,header:{idx:ke,line:ze},lines:[]};Le.set(ze.launch_id,mt),Q.push(mt);continue}Q.push({kind:"entry",idx:ke,line:ze})}let Je=[],Ie=0;for(;Ie<Q.length;){if(Q[Ie].kind!=="entry"){Je.push(Q[Ie]),Ie+=1;continue}let ke=Ie;for(;ke<Q.length&&Q[ke].kind==="entry";)ke+=1;Je.push(...Ce(Q.slice(Ie,ke))),Ie=ke}return Je}function ue(J){let Q=J.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function ie(J){for(let Q=J.length-1;Q>=0;Q-=1){let Le=J[Q];if(Le.kind==="result"||Le.kind==="error")return null;if(Le.kind==="tool"&&!Object.hasOwn(Le,"result"))return Le}return null}function Ae(J){for(let Q=J.length-1;Q>=0;Q-=1)if(J[Q].kind==="thinking")return J[Q];return null}function $e(J,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Gn(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Le=h.has(J);return c`<div
        class="sv__think${Le?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(J)}
      >
        <span class="sv__think-line">💭 ${So(Q.text)}</span>
        ${Le?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Le=h.has(J),Je=Q.tool==="Bash"?Um(Q.command):0,Ie=Q.tool==="Bash"?Je>1?So(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Le?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>it(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Ie?c`<span class="sv__tool-detail">${Ie}</span>`:""}
          ${Je>1?c`<span class="sv__tool-more">⋯ ${Je}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Le?c`<pre class="sv__tool-expand">${Y(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Gn(Q.text||"")}</div>`}function Y(J){let Q=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)Q.push(J.command);else if(J.input!==void 0)try{Q.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&Q.push(`output:
${J.output}`),Q.join(`

`)}function X(){if(!o)return c``;let J=W(),Q=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Le=d.session_id||"",Je=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,Ie=he(),ke=Ie?Km(we(),Date.now()):"",ze=Ie?ie(J):null,Qe=Ie?Ae(J):null,st=Vm(J);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${st?c`<span
              class="sv__stage${st.guess?" sv__stage--guess":""}"
              title=${st.text}
              >${st.text}</span
            >`:""}
        ${Ie?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ke?c`<span class="sv__live-ago">${ke}</span>`:""}</span
            >`:""}
        ${Le?c`<button
              type="button"
              class="sv__session"
              title=${Le}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Le}`}
              @click=${()=>fe(Le)}
            >
              ⧉ ${Le.slice(0,8)}
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${d.worktree?c`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":c`<button
              type="button"
              class="sv__prompt-toggle${z?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${z?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${T}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${Je}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${Je}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>_t()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":U()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Re(J).map(nt=>nt.kind==="subagent"?me(nt):nt.kind==="group"?ye(nt):$e(nt.idx,nt.line))}
      </div>
      ${ze||Qe?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?c`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?So(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${Qe?c`<span class="sv__now-think"
                  >💭 ${So(Qe.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ye(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Be(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function me(J){let Q=w.has(J.idx),Le=J.header?J.header.line:null,Je=Le?Le.is_error===!0?"\u2717":typeof Le.result=="string"?"\u2713":"\u27F3":"",Ie=Le&&Le.command?Le.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Be(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${Ie?c`<span class="sv__sub-detail">${Ie}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${Je?c`<span class="sv__sub-state">${Je}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ce(J.lines).map(ke=>ke.kind==="group"?ye(ke):$e(ke.idx,ke.line))}
          </div>`:""}
    </div>`}function Be(J){w.add(J),ae()}function ae(){Ye(X(),e),pe(),_&&Ze()}function Ze(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function it(J){h.has(J)?h.delete(J):h.add(J),ae()}function P(){_=!_,ae()}function fe(J){cn(J).then(Q=>{Q?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ve(J){!o||!J||(d={...d,...J},ae())}function Se(J){let Q=J.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&_&&(_=!1,ae())}e.addEventListener("scroll",Se,!0);function He(J){let Q=J.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||_t()}let qe=!1;function Ve(){qe||(document.addEventListener("mousedown",He),qe=!0)}function tt(){qe&&(document.removeEventListener("mousedown",He),qe=!1)}function $t(J){let Q=J&&J.attempt_id;if(!Q)return;let Le=i;o=Q,a=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Le&&Le!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Le})).catch(()=>{}),l=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,d=J.meta||{},u=J.hide_prompt===!0,_=!0,h.clear(),w.clear(),q(),!S&&r&&(S=r.subscribe(ae)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...l?{root_dir:l}:{}})).catch(()=>{}),Ve(),ae()}function _t(){let J=i;tt(),o=null,a=null,i=null,l=null,u=!1,h.clear(),w.clear(),q(),H(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),Ye(c``,e),s&&s()}return{open:$t,updateMeta:ve,close:_t,isOpen(){return o!==null},destroy(){H(),tt(),S&&(S(),S=null),e.removeEventListener("scroll",Se,!0),o=null,a=null,i=null,l=null,u=!1,Ye(c``,e)}}}function Eo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=di(t.spec_id),s=di(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function di(e){return typeof e=="string"?e.trim():""}function hu(e){let t=Eo(e);if(t.path)return t;let n=di(Ym(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Ym(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Zm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Qm(e){let t=e&&e.metadata||{},n=hu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Zm(t)?null:"plan_pending"}),r}function bu(e,t){let n=Qm(e);return c`
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
  `}var Xm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Jm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,eg=/^\*\*결론\*\* — (.+)$/;function To(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Xm)return null;let n=Jm.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?eg.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var yu=20;function vu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function tg(e){return e.length>yu?`${e.slice(0,yu)}\u2026`:e}function ng(e,t,n,r){let s=`${t.lane} ${tg(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${vu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Gn(t.body)}
        </div>`:""}
  </div>`}function rg(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${vu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Gn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function wu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=To(typeof l.text=="string"?l.text:"");return u?ng(l,u,t,s.has(l.id)):rg(l)})}
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
  `}var{I:Cw}=jl;var ku=e=>e.strings===void 0;var sg={},$u=(e,t=sg)=>e._$AH=t;var fr=ho(class extends Ir{constructor(e){if(super(e),e.type!==Dn.PROPERTY&&e.type!==Dn.ATTRIBUTE&&e.type!==Dn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ku(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===fn||t===Nt)return t;let n=e.element,r=e.name;if(e.type===Dn.PROPERTY){if(t===n[r])return fn}else if(e.type===Dn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return fn}else if(e.type===Dn.ATTRIBUTE&&n.getAttribute(r)===t+"")return fn;return $u(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],fi=[...Co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Fn=["orchestration_model","orchestration_effort","orchestration_speed"],Ro=[...Co,...Fn],og=fi.filter(e=>Ro.includes(e)),xu=["delegated","main"],Oo=["inherit","claude","codex"],ys=["default","fast"],vs=["standard","fast_track"],ws=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Io=["low","medium","high","xhigh"],dn="auto";function un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Au(e){if(!un(e)||!un(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))un(r)&&un(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Dr(e,t){let n=Au(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[dn,...r.flatMap(([,s])=>s)]}function Su(e,t,n,r){if(!un(e)||!un(e.runners))return[dn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!un(a)||!un(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==dn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[dn,...s]}function Nr(e,t,n){return Su(e,t,n,(r,s)=>un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function _i(e,t,n){return Su(e,t,n,(r,s)=>un(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:un(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ks(e,t){let n=Au(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Eu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Dr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Nr(t,s,r.impl_model||dn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ag={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},pi=[...og,...Fn],ig=[...Ro,...fi].filter((e,t,n)=>n.indexOf(e)===t&&!pi.includes(e));function Tu(e,t){let n=un(e)?e:{},r=un(t)?t:{},s=[];for(let a of pi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:ag[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...ig,...Object.keys(r)])!pi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function mi(e,t,n,r,s,o){return uo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Cu(e,t){let n={};for(let r of fi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Ru(e,t){let n={};for(let r of Fn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var gi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fn]}],Vn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function hi(e,t,n,r,s,o=null){let a=nn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Ou(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of hi(e,t,n,r,s,o))a[i.source]+=1;return a}function Lu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Iu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var jw=[...Co,...Fn];var lg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],cg={pin:"pin",global:"global",base:"base"};function ug(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${cg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function dg(e,t,n){switch(e){case"workflow_mode":return vs;case"spec_review_model":case"impl_review_model":return ws;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Io;case"impl_dispatch":return xu;case"impl_runtime":return Oo;case"impl_model":return Dr(n,t.impl_runtime);case"impl_effort":return Nr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ys;case"orchestration_model":return ks(n,null);case"orchestration_effort":return Nr(n,void 0,t.orchestration_model||dn).filter(r=>r!==dn);default:return[]}}function pg(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${ug(e.source)}
    <span class="detail-effective__k"
      >${Vn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Po[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Vn[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Pu(e,t){let n=gi.flatMap(l=>l.keys),r=hi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Ou(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${fg(o)}</span
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
          ${gi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=uo({key:u.key,choices:dg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return pg(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${fr(e.preset_id)}
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
  </details>`}function fg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function _g(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Mu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=_g(n.exec_receipt),l=i?On(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=lo(n.planned_execution,n.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${lg.map(_=>{let h=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",w=r[_.id],S=h.length>0||w?.fill==="full",F=!S&&w?.fill==="dim",z=w?.stale===!0;return c`<span
          class=${`detail-summary__gate${S?" detail-summary__gate--on":""}${F?" detail-summary__gate--current":""}${z?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${h?c`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Du(e){return Mo(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Nu(e,t){let n=e&&e[t];if(!Mo(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Du),s=Du(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function ju(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Do(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${ju(e)}${t}`}function qr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${ju(e)}`}function mg(e,t,n){if(n!==null){let s=e==="claude"?Do:qr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:qr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function qu(e,t){if(!Mo(e)||e.state!=="usable"||!Mo(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Fu(e){let t=e.provider_key==="claude"?Do:qr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${mg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Bu({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Fu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Nu(t,"claude"),selected:s,workspace_default:qu(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Fu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Nu(t,"codex"),selected:o,workspace_default:qu(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Uu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function $s(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function No(e){if(!$s(e)||!$s(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>$s(n)&&$s(n.models));return t.length>0?t:null}function $n(e,t){let n=No(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Wu(e,t){return $s(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function zu(e,t){let n=No(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Wu(r,r.models[t]);return[]}function gg(e){let t=No(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Wu(r,s))n.includes(o)||n.push(o);return n}function hg(e,t){if(!t)return gg(e);let r=No(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of zu(e,o))s.includes(a)||s.push(a);return s}function Hu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=$n(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?zu(t,r.impl_model):hg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function bg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function yg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),w())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${bg(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${Gn(a)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){Ye(d(),e)}async function h(F,z={}){s=F,o="loading",a="",i=null,l="",_();let V=z.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let oe="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(F);try{let M=await r(oe),D=await M.json().catch(()=>({}));if(!M.ok||!D||D.ok!==!0){if(D?.error==="not_found"&&z.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(D&&D.error||M.status)+")",_();return}let q=yg(String(D.content||""));i=q.front,a=q.body,o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Ye(c``,e)}function S(){document.removeEventListener("keydown",u),w()}return{open:h,close:w,destroy:S}}var vg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ku="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Fo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],wg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Gu(e){return typeof e=="string"&&wg.has(e)}var kg=["running","done","failed","interrupted"],$g={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function xg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ag(e){let t=zt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Lr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ku}
          >부분 집계</span
        >`:""}`}function Vu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function vi(e){if(typeof e=="number")return jo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?jo(t):""}function Sg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Eg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function bi(e){return e===null||typeof e=="string"&&e.trim().length>0}function yi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Tg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Fo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?bi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||bi(t.effort))||!(!("agent_type"in t)||bi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!kg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!yi(t.started_at)||!yi(t.last_event_at)||!yi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Cg(e,t,n){let s=zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${vi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${vi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Rg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?jo(e.last_event_at):s?vi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Sg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Eg(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${$g[e.status]}</span
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
  </button>`}function Og(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Lg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=Tg(d);!_||s.has(_.launch_id)||Gu(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of Fo){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=Fo.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:_}of Fo){for(let h of r.filter(w=>w.role===d&&w.provider===_)){let w=i.find(S=>S.receipt_id===h.launch_id)||null;w&&!Og(h,w)||(w&&l.add(w.receipt_id),u.push(Rg(h,w,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Gu(h.agent_type)&&u.push(Cg(d,_,h))}return u}function Ig(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...vg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${xg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ku}</span>`:""}
  </div>`}var Pg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Mg(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Yu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),w=_&&!h,S=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!w}
      title=${S}
      @click=${F=>{F.stopPropagation(),w&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let d=Vu(qa(u));if(zt(d).length===0&&!Lr(u.usage))return"";let _=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Ag(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let d=qa(u),_=Vu(d),h=zt(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Pg[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${ss(u)?c`<span
                  class="detail-session__resumed"
                  title=${ss(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ur(u)}</span>
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(w=>c`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):Lr(u.usage)?c`<span class="detail-session__usage"
                    >${Lr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${jo(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${Mg(u)}
          ${s.has(u.attempt_id)&&u.usage?Ig(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Lg(u,d,t)}
        </div>`})}
    </div>
  `}function Zu(e,t={}){return c`
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
          ${Dg(e)}
        </div>`:""}
  `}function Dg(e){let t=Pr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?qn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ao(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ng=["open","in_progress","deferred","resolved","closed"],qg=[0,1,2,3,4];function Qu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},h="",w=!1,S=[],F=!1,z={},V={claude:null,codex:null},oe=null,M=null,D=0,q=!1,K=!1,T="",U="",W="";function we(){q=!1,K=!1,T="",U="",W=""}function he(){V={claude:null,codex:null},oe=null,M=null,D+=1}async function pe(){if(!s)return null;try{let f=await Promise.resolve(s("get-workspace-accounts",{}));return f&&typeof f.state=="string"?f:null}catch{return null}}async function H(f){try{let C=await fetch(f);if(!C.ok)return null;let E=await C.json();if(!E||typeof E!="object"||!Array.isArray(E.accounts))return null;let le=E.accounts.filter(Te=>Te!==null&&typeof Te=="object"&&!Array.isArray(Te));return{accounts:le,active:le.find(Te=>Te.active===!0)||null}}catch{return null}}async function Ce(f){M=f;let C=++D,[E,le,Te]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage"),pe()]);C!==D||f!==u||(V={claude:E,codex:le},oe=Te,y())}let Re=[],ue=null,ie=null,Ae=!1,$e="",Y=!1,X=0,ye=new Set;function me(){Re=[],ue=null,ie=null,Ae=!1,$e="",Y=!1,X+=1,ye.clear()}async function Be(f){if(!s)return;let C=++X;try{let E=await Promise.resolve(s("get-comments",{id:f}));if(C!==X||f!==u)return;Re=Array.isArray(E)?E:[],Ae=!1}catch{if(C!==X||f!==u)return;Ae=!0}y()}function ae(){if(!s||!u)return;let f=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ue!==u){ue=u,ie=f,Be(u);return}f!==null&&f!==ie&&(ie=f,Be(u))}function Ze(f){ye.has(f)?ye.delete(f):ye.add(f),y()}function it(f){let C=$e.trim().length===0;$e=f,C!==(f.trim().length===0)&&y()}async function P(){let f=$e.trim();if(!s||!u||f.length===0||Y)return;let C=u;Y=!0,y();let E=!1;try{let le=await Promise.resolve(s("add-comment",{id:C,text:f}));Array.isArray(le)&&le.length>0&&(E=!0,C===u&&(Re=le,Ae=!1,$e="",ie=le.length))}catch{E=!1}E||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),C===u&&(Y=!1),y()}let fe={onToggle:Ze,onDraftInput:it,onSubmit:P},ve=t.mdViewer||null,Se=null;ve||(Se=document.createElement("div"),Se.className="md-viewer-root",document.body.appendChild(Se));let He=ve||qo(Se,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Ve=Mr(qe,{transport:s?(f,C)=>Promise.resolve(s(f,C)):void 0,sessionLogStore:l}),tt=!1,$t=!1,_t=!1,J=null,Q=null,Le=0;function Je(f){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}`}function Ie(){tt=!1,$t=!1,_t=!1,J=null,Q=null,Le+=1}async function ke(f){if(!s)return;let C=++Le;$t=!0,_t=!1,y();try{let E=await Promise.resolve(s("get-bead-prompt",{bead_id:f}));if(C!==Le)return;!E||typeof E!="object"||Array.isArray(E)?_t=!0:(J=E,Q=Je(f))}catch{C===Le&&(_t=!0)}finally{C===Le&&($t=!1,y())}}function ze(){if(tt=!tt,tt&&u&&Q!==Je(u)){J=null,ke(u);return}y()}function Qe(){if(!a||!u)return[];let f=a.get();return(f&&f.attempts?Object.values(f.attempts):[]).filter(E=>E&&E.bead_id===u).sort((E,le)=>(le.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,effort:E.effort||E.observed_effort||null,speed:E.speed||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,continuation_mode:E.continuation_mode||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null,exec_default_preset_id:typeof E.exec_default_preset_id=="string"?E.exec_default_preset_id:null,exec_default_preset_revision:typeof E.exec_default_preset_revision=="number"?E.exec_default_preset_revision:null,exec_values:E.exec_values&&typeof E.exec_values=="object"?E.exec_values:null,usage:E.usage||null,usage_legs:Array.isArray(E.usage_legs)?E.usage_legs:[],delegation_sessions:Array.isArray(E.delegation_sessions)?E.delegation_sessions:[]}))}function st(){if(!a||!u)return null;let f=a.get();return mn(f&&f.attempts||{},u)}let nt=new Set;function mt(f){nt.has(f)?nt.delete(f):nt.add(f),y()}function xt(f){let C=a?a.get():null,E=C&&C.attempts?C.attempts[f]:null;Ve.open({attempt_id:f,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}function St(f,C){let E=a?a.get():null,le=E&&E.attempts?E.attempts[f]:null,Ue=(le&&Array.isArray(le.delegation_sessions)?le.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===C);Ue&&Ve.open({attempt_id:f,launch_id:C,meta:{runner:Ue.provider==="claude"?"claude":"codex",role:Ue.role,...typeof Ue.agent_type=="string"?{agent_type:Ue.agent_type}:{},model:Ue.model,effort:Ue.effort,session_id:Ue.session_id,status:Ue.status}})}async function kt(f){if(!s||!f)return;let C=await Or();if(C===null)return;let E=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},le=async(Xe={},Ke=E())=>await s("worker-attempt-resume",{attempt_id:f,expected_revision:Ke,...C!==""?{instructions:C}:{},...Xe}),Te=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},Ue=await le();if(Te(Ue),Ue&&Ue.conflict){let Xe=Ue.queue&&typeof Ue.queue.revision=="number"?Ue.queue.revision:E();Ue=await le({},Xe),Te(Ue)}Ue=await Ln(Ue,(Xe,Ke)=>le({continuation:Xe,decision_token:Ke}),{onResult:Te,refresh:()=>le()}),Ue&&Ue.resumed===!1&&!Ue.conflict&&Ue.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ue.reason}`,"error",2400)}let Ot={onOpen:xt,onOpenDelegation:St,onResume:kt,onToggleUsage:mt};function bt(){let f=a?a.get():null,C={...z};for(let E of["orchestration_model","orchestration_effort","orchestration_speed"]){let le=f&&f[E];typeof le=="string"&&(C[E]=le)}return C}async function Ge(){if(s){try{let f=await Promise.resolve(s("get-session-defaults",{}));z=f&&f.values&&typeof f.values=="object"?f.values:{}}catch{z={}}y()}}function _e(){let f=a?a.get():null;return f&&f.runner_catalog||null}function I(){let f=a?a.get():null;return f&&typeof f.execution_defaults=="object"?f.execution_defaults:null}function Z(){let f=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},E=nn({pin:{...f,..._},global:bt(),execution_defaults:I(),runner_catalog:_e(),route:typeof f.route=="string"?f.route:null}).orchestration_model.value||"";return $n(_e(),E)}function re(){let f=i?i.get():null;return!f||typeof f.revision!="number"?null:{revision:f.revision,presets:Array.isArray(f.presets)?f.presets:[]}}function R(f){return f?.compatible===!1}function G(f){i&&f&&typeof f.revision=="number"&&Array.isArray(f.presets)&&i.set({revision:f.revision,presets:f.presets})}async function xe(){let f=re(),C=f?.presets.find(E=>E.id===h);if(!(!s||!u||!f||!C||R(C)||w)){w=!0,S=[],y();try{let E=await Promise.resolve(s("apply-impl-preset",Iu(u,C.id,f.revision)));if(E&&E.conflict){G(E),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let le=E&&Array.isArray(E.issue)?E.issue[0]:E?.issue;if(E&&E.applied&&le&&typeof le=="object"){d=le,S=Array.isArray(E.skipped_orchestration_keys)?E.skipped_orchestration_keys.filter(Te=>typeof Te=="string"):[];for(let Te of Uu)delete _[Te];ce(S.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}E&&E.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(E){E&&typeof E=="object"&&E.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,y()}}}let A=null;n&&n.subscribe&&(A=n.subscribe(()=>ne()));let g=null;a&&typeof a.subscribe=="function"&&(g=a.subscribe(()=>{u&&y()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&y()}));function j(f){f.key==="Escape"&&u&&(f.preventDefault(),r())}document.addEventListener("keydown",j);function ne(){if(u){if(n&&typeof n.snapshotFor=="function"){let f=n.snapshotFor("detail:"+u)||[];d=f.find(E=>E&&E.id===u)||f[0]||d}ae(),y()}}function te(f){cn(f).then(C=>{C?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function be(f){f.preventDefault(),f.stopPropagation(),u&&te(u)}function Ee(f,C){f.preventDefault(),f.stopPropagation(),te(C)}function et(f,C,E){f.preventDefault(),f.stopPropagation(),He.open(C,{missing_state:E})}function dt(f,C){_[f]=C,y(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Lu(u,f,C.length===0?null:C))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function De(f,C){let E=d||{},le=E.metadata&&typeof E.metadata=="object"?E.metadata:{},Te={};for(let Ke of["impl_runtime","impl_model","impl_effort"])Te[Ke]=Object.hasOwn(_,Ke)?_[Ke]:typeof le[Ke]=="string"?le[Ke]:"";Te[f]=C;let Ue=Hu(Te,_e(),Z()),Xe={};for(let Ke of["impl_runtime","impl_model","impl_effort"])Xe[Ke]=_[Ke],_[Ke]=Ue[Ke]||"";y(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ue,orchestration_runtime:Z()})).then(Ke=>{let vt=Array.isArray(Ke)?Ke[0]:Ke;if(!vt||typeof vt!="object"||!vt.id)throw new Error("implementation target readback failed");d=vt;for(let sn of["impl_runtime","impl_model","impl_effort"])delete _[sn];y()}).catch(()=>{for(let Ke of["impl_runtime","impl_model","impl_effort"])Xe[Ke]===void 0?delete _[Ke]:_[Ke]=Xe[Ke];y(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ot(f,C,E){if(!s||!u)return!1;try{let le=await Promise.resolve(s(f,C)),Te=Array.isArray(le)?le[0]:le;return Te&&typeof Te=="object"&&Te.id?(d=Te,!0):(ce(E,"error"),!1)}catch{return ce(E,"error"),!1}}function Lt(f){setTimeout(()=>{try{let C=e.querySelector(f);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function gt(){q=!0,T=d&&d.title||"",y(),Lt('.detail-edit__input[data-edit="title"]')}function pn(f){T=f.target.value}function Bt(){q=!1,T="",y()}function qt(){ot("edit-text",{id:u,field:"title",value:T},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(q=!1,T=""),y()})}function Gt(){K=!0,U=d&&d.description||"",y(),Lt('.detail-edit__textarea[data-edit="description"]')}function Ft(f){U=f.target.value}function Dt(){K=!1,U="",y()}function We(){ot("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(K=!1,U=""),y()})}function Xt(f,C,E,le){if(f.key==="Escape"){f.stopPropagation(),E();return}f.key==="Enter"&&(!le||f.ctrlKey||f.metaKey)&&(f.preventDefault(),C())}function Vt(f){let C=f.target.value;ot("update-status",{id:u,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function lt(f){let C=Number(f.target.value);ot("update-priority",{id:u,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ne(f){W=f.target.value}function L(){let f=W.trim();f.length!==0&&ot("label-add",{id:u,label:f},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(W=""),y()})}function de(f){if(f.key==="Escape"){f.stopPropagation(),W="",y();return}f.key==="Enter"&&(f.preventDefault(),L())}function Pe(f){ot("label-remove",{id:u,label:f},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let ut={onCopyPath:Ee,onOpenDoc:et};function Et(f){return typeof f=="string"?f:f&&typeof f=="object"?String(f.id||f.to||f.issue_id||f.depends_on||""):""}function yt(f){switch(f&&typeof f=="object"?String(f.dependency_type||f.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function v(f){let E=(Array.isArray(f.dependencies)?f.dependencies:[]).map(le=>({id:Et(le),icon:yt(le)})).filter(le=>le.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${E.map(le=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(le.id)}
                  >
                    ${le.icon?`${le.icon} `:""}${le.id}
                  </button>`:c`<span class="detail-dep"
                    >${le.icon?`${le.icon} `:""}${le.id}</span
                  >`)}
          </div>`}
    `}function b(f){let C=f.metadata||{},E=f.workflow||{},le=E.stages||{},Te=le.spec&&le.spec.stale,Ue=le.impl&&le.impl.stale,Xe=le.plan||null,Ke=E.route_source==="derived",vt=E.route||C.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ke?" detail-kv__v--derived":""}"
          title=${Ke?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ke?"unset":vt}</span
        >
      </div>
      ${E.route!=="quick_fix"||Object.hasOwn(C,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${C.spec_review||"\uC5C6\uC74C"}${Te?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${E.route!=="quick_fix"||Object.hasOwn(C,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${C.impl_review||"\uC5C6\uC74C"}${Ue?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${E.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${E.planned_execution.kind}</span>
            </div>
            ${E.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${E.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${E.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${On(E.exec_receipt)}</span
            >
          </div>`:""}
      ${E.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${E.impl_entry.actor}@${E.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${C.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let $={route:["quick_fix","spec_backed","full_plan"]};async function N(f,C){let E=C.target.value;if(f==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await ot("update-workflow-meta",{id:u,key:f,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function ee(f){let C=f.metadata||{};return c` ${((le,Te)=>{let Ue=$[le],Xe=typeof C[le]=="string"?C[le]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${le}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${le}
          data-edit=${`wfmeta-${le}`}
          @change=${Ke=>N(le,Ke)}
        >
          <option value="" ?selected=${!Ue.includes(Xe)}>
            ${Te}
          </option>
          ${Ue.map(Ke=>c`<option value=${Ke} ?selected=${Xe===Ke}>${Ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ge(f,C){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${T}
            @input=${pn}
            @keydown=${E=>Xt(E,qt,Bt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${qt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Bt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${f}</h2>
        ${zt(C).map(E=>c`<span class="detail-usage-total" title=${E.tooltip}
              >${E.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${gt}
        >
          ✎
        </button>
      </div>
    `}function Me(f){let C=Wt(f.created_at),E=Wt(f.updated_at);return!C&&!E?c``:c`
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function rt(f,C){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${Ng.map(E=>c`<option value=${E} ?selected=${E===f}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${lt}
        >
          ${qg.map(E=>c`<option value=${String(E)} ?selected=${E===C}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function x(f){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Gt}
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
              .value=${U}
              @input=${Ft}
              @keydown=${C=>Xt(C,We,Dt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${We}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Dt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${f||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function O(f){let C=typeof f.notes=="string"?f.notes:"";return C.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${C}</div>
    `}function Oe(f){let C=Array.isArray(f.labels)?f.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map(E=>c`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>Pe(E)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${W}
            @input=${Ne}
            @keydown=${de}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${L}
          >
            추가
          </button>
        </span>
      </div>
    `}function p(){if(!u)return c``;let f=d||{},C=String(f.id||u),E=f.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",le=st(),Te=f.status||"open",Ue=typeof f.priority=="number"?Math.max(0,Math.min(4,f.priority)):"",Xe=f.description||"",Ke={...f,metadata:{...f.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${be}
            >
              ${C}
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
          ${ge(E,le)}
          ${Mu(Ke)}
          ${Pu({metadata:Ke.metadata,workspace_values:bt(),catalog:_e(),execution_defaults:I(),expanded:F,presets:re()?.presets||[],preset_id:h,preset_busy:w,skipped_orchestration_keys:S},{onToggle:vt=>{F=vt,y()},onEdit:(vt,sn)=>{if(vt==="impl_runtime"||vt==="impl_model"||vt==="impl_effort"){De(vt,sn??"");return}dt(vt,sn??"")},onPresetSelect:vt=>{h=vt,S=[],y()},onPresetApply:()=>{xe()}})}
          ${Bu({md:Ke.metadata,catalog:V,workspace_defaults:oe,handlers:{onExecChange:dt}})}
          ${rt(Te,Ue)} ${Me(f)}
          ${x(Xe)}
          ${wu(Re,fe,{expanded:ye,draft:$e,sending:Y,error:Ae})}
          ${O(f)} ${Oe(f)} ${v(f)}
          ${b(f)} ${ee(f)}
          ${bu(f,ut)}
          ${Zu({expanded:tt,loading:$t,error:_t,data:J},{onToggle:ze})}
          ${Yu(Qe(),Ot,{total:le,expanded:nt})}
        </div>
      </div>
    `}function y(){Ye(p(),e)}return{load(f){f!==u&&(_={},h="",S=[],F=!1,we(),me(),Ie(),he()),u=f,d=null,ne(),Ge(),M!==f&&Ce(f)},clear(){u=null,d=null,_={},h="",w=!1,S=[],F=!1,we(),me(),Ie(),he(),He.close(),Ve.close(),Ye(c``,e)},destroy(){A&&(A(),A=null),g&&(g(),g=null),k&&(k(),k=null),document.removeEventListener("keydown",j),ve||(He.destroy(),Se&&Se.parentNode&&Se.parentNode.removeChild(Se)),Ve.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,d=null,he(),h="",w=!1,S=[],me(),Ie(),Ye(c``,e)}}}function Xu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Bo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Uo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Wo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function zo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Fg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Bo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ju(e,t){let n=Fg(e,t);return n?c`<button
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
            title=${n.deploy.at?Wt(n.deploy.at):""}
            >${zo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${As(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Fr(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function jg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ss(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ho(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function xn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?jg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function xs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Bg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ed(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Bg[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Go(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Ug(e){return c`<div
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
  </div>`}function jr(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;return n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a?"":c`<div class="worker-deps">
    ${n.map(l=>c`<span class="worker-dep worker-dep--pred" title=${l.title||""}
          ><span class="worker-dep__label">${l.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${l.id}
            aria-label=${`\uC120\uD589 ${l.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${o.map(l=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${l.id}
          aria-label=${`scope \uACB9\uCE68 ${l.id} (${l.location_label})`}
          title=${[`\uACB9\uCE68 ${l.id} (${l.location_label})`,...l.prefixes].join(`
`)}
        >
          ⧉ ${l.id}
        </button>`)}${a?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(l=>c`<span class="worker-dep worker-dep--succ" title=${l.title||""}
          >${l.label}</span
        >`)}${s.map(l=>c`<span class="worker-dep worker-dep--warn">${l}</span>`)}${i?Ug(i):""}
  </div>`}function Br(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function td(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Vo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Wg(e){let t=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),r=Pn(e.usage),s=ln(e.done_at);return c`<div
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
      ${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${is(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${As(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Kn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Wg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),s=Pn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?ln(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,S=e.lane==="done"?"":Br(e.workflow),F=td(e.from_id),z=Vo(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,oe=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",M=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",D=n.map(X=>X===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${X}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${X===e.completion_badge&&e.completion_title||""}
          >${X}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",K=r.length>0?r.map(X=>c`<span class="worker-usage" title=${X.tooltip}
              >${X.label}</span
            >`):s?c`<span class="worker-usage" title=${is(e.usage)}
            >${s}</span
          >`:"",T=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",W=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",we=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",he=e.discard,pe=he?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${he?.attempt_id||""}
          data-operation-id=${he?.operation?.operation_id||""}
          data-discard-mode=${he?.confirmation||"unmerged"}
          ?disabled=${he?!he.enabled:e.discard_enabled===!1}
          title=${he?he.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${he?.label||"\uD3D0\uAE30"}
        </button>`:"",H=e.stale_work||null,Ce=H?c`${H.can_resume||H.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            기존 작업 이어가기
          </button>`:""}${H.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            백업 후 새로 시작
          </button>`:""}${H.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            다시 확인
          </button>`:""}`:"",Re=H?c`<div class="worker-mini__stale">
        <strong>${H.title}</strong>
        <span>${H.summary}</span>
        <span>${H.cause}</span>
        ${H.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ue=e.revise_action?c`<button
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
        </button>`:"",ie=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Ae=jr(e.dependency_chips,{lane:e.lane}),$e=xs(e),Y=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||he?.operation||e.revise_action||H);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${w}${z}${F}${V}
          </div>
          <div class="worker-mini__row2">
            ${K}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${As(e.work_ms)}</span
                >`:""}${D}${T}
            <span class="worker-mini__actions"
              >${U}${W}${we}${pe}</span
            >
            ${Fr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${h}${w}${z}${S}${F}${oe}${M}${D}${_}${q}
            </div>
            <div class="worker-mini__body">${V}${Re}</div>
            ${Ae}${ie}${Y?c`<div class="worker-mini__foot">
                  ${K}${T}
                  <span class="worker-mini__actions"
                    >${U}${W}${we}${pe}${ue}${Ce}</span
                  >
                  ${xs(e)}
                </div>`:""}
            ${Fr(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${h}${w}${z}${S}${F}${V}${oe}${M}${D}${_}${q}${K}${T}${U}${W}${we}${pe}
            </div>
            ${Ae}${ie}${$e} ${Fr(e)}`}
  </div>`}function wi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=jr(e.dependency_chips,{lane:e.lane});return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Vo(e.priority)}
      ${Br(a)}${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${td(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?ao(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Go(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${t.lanes.map(d=>c`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${d.id}
                  title="${d.label} 대기 맨 뒤에 추가"
                >
                  <span>${d.label}</span>
                  <span class="worker-card__place-count">${d.count}</span>
                </button>`)}
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":i?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Fr(e)}
  </div>`}function hn(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?wi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Kn(r))}
          </div>`}
  </section>`}var nd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},rd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function sd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ki(e){for(let t of sd(e))if(Object.hasOwn(nd,t))return nd[t];return null}function $i(e){let t=null;for(let n of sd(e))Object.hasOwn(rd,n)&&(t=rd[n]);return t}function Ko(e){let t=ki(e),n=$i(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function od(e,t){let n=ki(e)??ki(t),r=$i(t)??$i(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ad=160;function zg(e){return e.length>ad?`${e.slice(0,ad)}\u2026`:e}function Hg(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${zg(e.command)}</code>`:""}
  </div>`}function Gg(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Vg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function id(e){let t=e.failure?Ko(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Hg(e.failure.cause_detail)}
          ${Gg(e.failure.reason)}
          ${xs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Kg(e){return e?c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Yg=new Set(["codex-runner"]);function Zg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Yg.has(h.agent_type))),l=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),d=jr(e.dependency_chips,{lane:"running"}),_=r?ln(r.updated_at,t):"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${ln(a,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${_}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function xi(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Vg(t-e.started_at):"\u2014",l=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ss(e),d=zt(e.usage),_=Pn(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,S=e.landing,F=e.attempt_id&&e.attempt_id===n,z=r.monitor||null,V=Kg(z),oe=Zg(z,t,a,s?{updated_at:e.updated_at??null}:null),M=s&&e.workflow?.chips?.exec_receipt||null,D=Br(e.workflow),q=M?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(M)}`}
        >${`${M.kind}:${io(M)}`}</span
      >`:"",K=D||q?c`<div class="rtile__meta">
          ${D}${q}
        </div>`:"",T=s?"":Fr(e),U=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${F?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Vo(e.priority)}${V}${u?c`<span class="rtile__resumed" title=${u}>↻</span>`:""}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${i}</span>`:""}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${i}</span>`}
        ${s?"":o?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${U}
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
                ${U}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${oe}${e.rollup?oo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Pa}):""}
    ${S?c`<div class="rtile__landing">
          <span
            class="merge-step${S.failed?" merge-step--failed":""}"
            style=${`--progress: ${S.percent}%`}
            >${S.label}${S.index>0?c`<span class="merge-step__n"
                  >${S.index}/${S.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?K:D||l||d.length>0||_||h||w?c`<div class="rtile__meta">
            ${D}${h?c`<span class="worker-mini__badge">${h}</span>`:""}
            ${w?c`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Go(e.exec_chips)}
            ${d.length>0?d.map(W=>c`<span class="worker-usage" title=${W.tooltip}
                      >${W.label}</span
                    >`):_?c`<span
                    class="worker-usage"
                    title=${is(e.usage)}
                    >${_}</span
                  >`:""}
          </div>`:""}
    ${T} ${xs(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ai(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>xi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Si=new Set(["unavailable","not_applicable"]);function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ld(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Zn(e,t){return t===null?null:`${Vn[e]}: ${t.display} (${Po[t.source]})`}function Ei(e){return e.filter(t=>t!==null).join(`
`)}function Es(e){if(typeof e!="object"||e===null)return null;let t=ur(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ei(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Vn.orchestration_model,e.model),n(Vn.orchestration_effort,e.effort),n(Vn.orchestration_speed,e.speed)])}}function _r(e,t){let n=Yn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Yn(e,"orchestration_effort"),s=Yn(e,"orchestration_speed"),o=ld([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ei(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Zn("orchestration_model",n),Zn("orchestration_effort",r),Zn("orchestration_speed",s)])}}function Qg(e,t){return e===null||e.value===null||Si.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Xg(e){return e===null||Si.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Jg(e){return e===null?null:e.value==="auto"?"auto":Si.has(e.resolution)?null:e.display}function Qn(e,t){if(typeof e!="object"||e===null)return null;let n=Yn(e,"impl_dispatch"),r=Yn(e,"impl_runtime"),s=Yn(e,"impl_model"),o=Yn(e,"impl_effort"),a=Yn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":ld([Qg(r,t??null),Xg(s),Jg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ei(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Zn("impl_dispatch",n),Zn("impl_runtime",r),Zn("impl_model",s),Zn("impl_effort",o),Zn("impl_speed",a)])}}var Ht="",eh=["impl_runtime","impl_model","impl_effort"],th=["claude_account","codex_account"],nh=5,Yo=1;function rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>ce(I,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),w={claude:null,codex:null},S=!1,F=null,z={},V="",oe="",M=!1,D=!1,q=!1,K=null,T=!1;function U(){let I=t.queue?t.queue():null;return rn(I)?I:null}function W(){let I=U();return I?I.runner_catalog:null}function we(){let I=U();return I&&rn(I.execution_defaults)?I.execution_defaults:null}function he(){let I=t.implPresetStore?.get();return rn(I)&&Array.isArray(I.presets)?I:null}function pe(){return r===null?{}:{root_dir:r}}async function H(I,Z){return T||!n?null:await n(I,Z)}function Ce(I){I&&rn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function Re(I,Z){let re=U();if(!re||T)return null;let R=await H(I,{...Z,...pe(),expected_revision:re.revision});if(Ce(R),r!==null&&R&&R.conflict){let G=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:U()?.revision??re.revision;R=await H(I,{...Z,...pe(),expected_revision:G}),Ce(R)}return R}async function ue(){l=!0,_e();try{let I=await H("get-session-defaults",{...pe()});o=rn(I?.values)?{...I.values}:{},a={...o},i=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{l=!1,_e()}}async function ie(){let I=Cu(o,a);if(Object.keys(I).length!==0){try{let Z=await H("set-session-defaults",{values:I,...pe()});o=rn(Z?.values)?{...Z.values}:{},a={...o},i=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}_e()}}function Ae(I,Z){if(!rn(I))return;let re=I.state;u={state:re==="usable"||re==="unusable"||re==="absent"?re:"absent",values:rn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},_={...u.values},Z&&(d={..._})}async function $e(){try{Ae(await H("get-workspace-accounts",{...pe()}),!0)}catch(I){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}_e()}async function Y(I){try{let Z=await fetch(I);if(!Z.ok)return null;let re=await Z.json();if(!rn(re)||!Array.isArray(re.accounts))return null;let R=re.accounts.filter(G=>rn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:R,active:R.find(G=>G.active===!0)||null}}catch{return null}}async function X(){S=!0;let[I,Z]=await Promise.all([Y("/api/claude-usage"),Y("/api/codex-usage")]);T||(w={claude:I,codex:Z},_e())}function ye(){let I={};for(let Z of th){let re=Object.hasOwn(d,Z)?d[Z]:null,R=Object.hasOwn(_,Z)?_[Z]:null;re!==R&&(I[Z]=re)}return I}async function me(){let I=ye();if(Object.keys(I).length!==0){try{Ae(await H("set-workspace-accounts",{values:I,...pe()}),!1)}catch(Z){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}_e()}}function Be(I,Z){Z===Ht?delete d[I]:d[I]=Z,_e(),h=h.then(()=>me())}function ae(I,Z){if(eh.includes(I)){P(I,Z);return}Z===Ht?delete a[I]:a[I]=Z,_e(),ie()}function Ze(){let I=bt().orchestration_model,Z=nn({global:{orchestration_model:I??void 0},execution_defaults:we(),runner_catalog:W()}).orchestration_model.value;return Z?$n(W(),Z):null}function it(I,Z){typeof Z=="string"&&Z.length>0?a[I]=Z:delete a[I]}function P(I,Z){let re=Z===Ht?void 0:Z,R=Eu({impl_runtime:I==="impl_runtime"?re:a.impl_runtime,impl_model:I==="impl_model"?re:a.impl_model,impl_effort:I==="impl_effort"?re:a.impl_effort},W(),Ze());it("impl_runtime",R.impl_runtime),it("impl_model",R.impl_model),it("impl_effort",R.impl_effort),_e(),ie()}async function fe(){let I=U();if(!I)return;let Z={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},re=Ru(Z,{...Z,...z});if(Object.keys(re).length!==0){try{let R=await Re("worker-queue-set-orchestration-defaults",{values:re});if(R&&R.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}z={}}catch(R){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}_e()}}function ve(I,Z){z[I]=Z===Ht?null:Z,_e(),fe()}function Se(I){if(F=I,!I){_e();return}let Z=W(),re=bt(),R=re.orchestration_model;R&&!ks(Z,I).includes(R)&&(z.orchestration_model=null,R=null);let G=re.orchestration_effort;G&&!_i(Z,I,R||dn).includes(G)&&(z.orchestration_effort=null),_e(),fe()}async function He(I){if(!(!U()||I<Yo)){try{await Re("worker-queue-set-slots",{slots:I})}catch(Z){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}_e()}}async function qe(I){if(!(!U()||I<Yo||I>nh)){try{await Re("worker-queue-set-serial-lane-count",{count:I})}catch(Z){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}_e()}}async function Ve(I,Z){let re=I==="auto_advance"?"worker-automation-toggle":I==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Re(re,{on:Z})}catch(R){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}_e()}function tt(){let I={},Z=bt();for(let re of Ro){let R=Fn.includes(re)?Z[re]:a[re];typeof R=="string"&&R.length>0&&(I[re]=R)}return I}async function $t(){let I=he();if(!I)return;let Z=tt();if(Object.keys(Z).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let re=(I.presets||[]).find(G=>G.id===V),R=oe.trim()||(re?re.name:"");if(!R){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=re?await H("impl-preset-update",{expected_revision:I.revision,id:re.id,name:R,settings:Z}):await H("impl-preset-create",{expected_revision:I.revision,name:R,settings:Z});if(G&&G.applied){if(oe="",!re&&Array.isArray(G.presets)){let xe=G.presets.find(A=>A.name===R);V=xe?xe.id:V}_e()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),_e()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function _t(){let I=he();if(!(!I||V.length===0))try{let Z=await H("impl-preset-delete",{expected_revision:I.revision,id:V});Z&&Z.applied?(V="",_e()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),_e())}catch(Z){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function J(I){o=rn(I.values)?{...I.values}:{},a={...o},i=Array.isArray(I.warnings)?I.warnings:[],rn(I.queue)&&(t.onQueueAdopt?.(I.queue),z={})}async function Q(){let I=he(),Z=U();if(!I||!Z||V.length===0)return;let re=R=>({preset_id:V,expected_revision:I.revision,expected_queue_revision:R,...pe()});try{let R=await H("apply-impl-preset-global",re(Z.revision));if(R&&R.applied&&J(R),r!==null&&R&&R.queue_applied===!1){let G=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:U()?.revision??Z.revision;R=await H("apply-impl-preset-global",re(G)),R&&R.applied&&J(R)}R&&R.applied?R.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):R&&R.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(R){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}_e()}async function Le(){D=!0,q=!1,_e();try{let I=await H("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?q=!0:K=I}catch{q=!0}finally{D=!1,_e()}}function Je(){if(M=!M,M&&!K){Le();return}_e()}function Ie(){let I=Pr({loading:D,error:q});if(I)return I;if(!K)return"";let Z=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(re=>c`<div class="settings-dialog__sp-variant" data-variant=${re.key}>
            <div class="settings-dialog__sp-cond">${re.condition}</div>
            ${qn(re.label,re.system_prompt)}
          </div>`)}
    </div>`}function ke(){return c`<section
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
        aria-expanded=${M?"true":"false"}
        @click=${Je}
      >
        ${M?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${M?Ie():""}
    </section>`}function ze(I,Z,re,R,G,xe,A){let g=G[I]??Ht,k=mi(I,re,G,we(),W(),A),j=k.options.find(te=>te.value===g),ne=g===Ht?k.full_value:j?.full_value;return c`<select
        class=${g===Ht?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${Z}
        title=${ne||""}
        ?disabled=${xe===!0||k.disabled}
        .value=${fr(String(g))}
        @change=${te=>R(I,String(te.target.value))}
      >
        <option value=${Ht} ?selected=${g===Ht}>
          ${k.unset_label}
        </option>
        ${k.options.map(te=>c`<option
              value=${te.value}
              title=${te.full_value||""}
              ?selected=${te.value===g}
            >
              ${te.label}
            </option>`)}
      </select>
      ${g===Ht?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Qe(I,Z,re,R,G,xe=!1,A){return c`<div
      class=${`settings-dialog__row${xe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${ze(I,Z,re,R,G,xe,A)}
      </span>
    </div>`}function st(I,Z){let re=Z?Z.active:null;return rn(re)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?re.email:qr({...re,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function nt(I,Z,re){let R=w[re],G=Object.hasOwn(d,I)?d[I]:Ht,xe=re==="claude"?Do:qr,A=!!R?.accounts.some(g=>g.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Z}
          data-account-key=${I}
          @change=${g=>Be(I,String(g.target.value))}
        >
          <option value=${Ht} ?selected=${G.length===0}>
            ${st(re,R)}
          </option>
          ${G.length>0&&!A?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${R?.accounts.map(g=>c`<option value=${g.key} ?selected=${g.key===G}>
                ${xe(g)}
              </option>`)||""}
        </select>
        ${R?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function mt(){let I=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function xt(I,Z,re,R,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${ze(re,`${I} \uBAA8\uB378`,R,ae,a,!1)}
        ${ze(G,`${I} effort`,Io,ae,a,!1)}
      </span>
    </div>`}function St(I,Z,re,R){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${R?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${R?"true":"false"}
          aria-label=${Z}
          @click=${()=>Ve(I,!R)}
        >
          ${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${re}</span>
      </span>
    </div>`}function kt(I,Z,re,R){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>R(re-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${re}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>R(re+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ot(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(Z=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Z.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function bt(){let I=U(),Z={};for(let re of Fn)Z[re]=Object.prototype.hasOwnProperty.call(z,re)?z[re]:I&&typeof I[re]=="string"?I[re]:null;return Z}function Ge(){let I=W(),Z=a.impl_runtime,re=a.impl_model,R=he(),G=U(),xe=bt(),A=ks(I,F),g=Dr(I,void 0).filter(De=>De!==dn),k=_i(I,F,xe.orchestration_model||dn).filter(De=>De!==dn),j=V?(R?.presets||[]).find(De=>De.id===V):null,ne=j?Tu(tt(),rn(j.settings)?j.settings:{}):null,te=G&&typeof G.slots=="number"?G.slots:Yo+1,be=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Yo,Ee=we()?.supported===!0,et=mt(),dt=mi("workflow_mode",vs,a,we(),I);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${et?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${et}
          </div>`:""}
      ${Ee?"":c`<div
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
                .value=${fr(V)}
                @change=${De=>{V=String(De.target.value),_e()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(R?.presets||[]).map(De=>c`<option
                      value=${De.id}
                      ?selected=${De.id===V}
                    >
                      ${De.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ne||ne.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${fr(oe)}
                @input=${De=>{oe=String(De.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${$t}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${_t}
              >
                삭제
              </button>
            </div>
            ${ne?Ot(ne):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${fr(F||Ht)}
                    @change=${De=>{let ot=String(De.target.value);Se(ot===Ht?null:ot)}}
                  >
                    <option value=${Ht} ?selected=${!F}>
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
              ${Qe("orchestration_model","\uBAA8\uB378",A,ve,xe)}
              ${Qe("orchestration_effort","effort",k,ve,xe)}
              ${Qe("orchestration_speed","\uC18D\uB3C4",ys,ve,xe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${nt("claude_account","Claude","claude")}
              ${nt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Ht}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ae("workflow_mode",Ht)}
                    >
                      ${dt.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${vs.map(De=>c`<button
                          type="button"
                          data-mode=${De}
                          aria-pressed=${String(a.workflow_mode===De)}
                          @click=${()=>ae("workflow_mode",De)}
                        >
                          ${De}
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
              ${xt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ws,"spec_review_effort")}
              ${xt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${xt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ws,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Oo,ae,a)}
              ${Qe("impl_model","\uBAA8\uB378",Dr(I,Z),ae,a)}
              ${Qe("impl_effort","effort",Nr(I,Z,re),ae,a)}
              ${Qe("impl_speed","\uC18D\uB3C4",ys,ae,a)}
              ${Qe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",g,ae,a,!1,{...a,...xe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${St("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${St("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${St("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${kt("slots","\uB3D9\uC2DC \uC2E4\uD589",te,De=>He(De))}
              ${kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",be,De=>qe(De))}
            </div>
            ${ke()}
          `}
    `}function _e(){T||Ye(Ge(),e)}return{load(){z={};let I=[ue(),$e()];return S||I.push(X()),Promise.all(I).then(()=>{})},render:_e,sessionDraft:()=>({...a}),destroy(){T=!0,Ye(c``,e)}}}function Qo(e){return c`<svg
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
  </svg>`}function cd(){return Qo(ns`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ud(){return Qo(ns`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function dd(){return Qo(ns`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function pd(){return Qo(ns`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function fd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function _d(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(fo(t));let n={};for(let i of In)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of In){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Pn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ti(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function rh(e,t){if(!An(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function sh(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=nn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),s=_r(n,e.runner_catalog),o=Qn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function md(e,t){let n=t.notify||(Y=>ce(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function w(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(X=>An(X)):[]}function S(Y){return w().find(X=>X.root_dir===Y)||null}function F(Y){return rh(S(Y),h.get(Y))}function z(){for(let Y of w()){let X=h.get(Y.root_dir);X&&typeof X.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=X.revision&&h.delete(Y.root_dir)}}async function V(Y,X,ye){let me=t.transport,Be=F(X);if(!(!me||!An(Be))){try{let ae=await me(Y,{...ye,root_dir:X,expected_revision:Be.revision});if(An(ae?.queue)&&h.set(X,ae.queue),ae&&ae.conflict){let Ze=An(ae.queue)&&typeof ae.queue.revision=="number"?ae.queue.revision:F(X)?.revision;ae=await me(Y,{...ye,root_dir:X,expected_revision:Ze}),An(ae?.queue)&&h.set(X,ae.queue)}}catch(ae){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}ie()}}function oe(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),ie())}function M(Y){oe(u===Y?null:Y)}function D(Y){if(d===Y){K();return}q(),d=Y;let X=S(Y);a.textContent=`${X?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Zo(l,{root_dir:Y,queue:()=>F(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{h.set(Y,ye),ie()}}),_.load(),ie()}function q(){_?.destroy(),_=null}function K(Y){q(),d=null,s.hidden=!0,a.textContent="",Y!==!0&&ie()}let T=()=>K();i.addEventListener("click",T);function U(Y){Y.key==="Escape"&&u!==null&&oe(null)}document.addEventListener("keydown",U);function W(Y,X){let ye=Math.max(X,Y,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${X}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(me,Be)=>Be<Y?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function we(Y){let X=Y.auto_advance===!0,ye=Y.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${X?" is-on":""}`}
        data-act="auto"
        aria-pressed=${X?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${X?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${X?ud():cd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${dd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${pd()}
      </button>`}function he(Y){let X=sh(Y);return X?c`<div class="mon2-deck__chips">
      ${X.orchestration?c`<span class="mon2-deck__chip" title=${X.orchestration.title}
            >오케 ${X.orchestration.text}</span
          >`:""}
      ${X.worker?c`<span class="mon2-deck__chip" title=${X.worker.title}
            >워커 ${X.worker.text}</span
          >`:""}
    </div>`:""}function pe(Y){let X=[];for(let[ye,me]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Be=Ti(Y,ye);Be>0&&X.push(`${me} ${Be}`)}return X.join(" \xB7 ")}function H(Y){let X=Ti(Y,"running"),ye=typeof Y.slots=="number"?Y.slots:1;return c`<div
      class=${`mon2-deck__tile${u===Y.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Y.root_dir}
      aria-pressed=${u===Y.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Y.root_dir}>${Y.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${X}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${X}/${ye}</span>
          ${W(X,ye)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Y.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${we(Y)}</div>
        <span class="mon2-deck__counts">${pe(Y)}</span>
        ${he(Y)}
      </div>
    </div>`}function Ce(Y){let X=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",me=_d(Array.isArray(X)?X:[]),Be=ae=>Y.reduce((Ze,it)=>Ze+Ti(it,ae),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${Be("running")} · 대기 ${Be("queue")} · PR
        ${Be("pr_wait")}${Be("session_active")>0?` \xB7 \uC138\uC158 ${Be("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(X)?X.length:0}</span
      >
      ${me===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof me=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${fd(ye)}
                  >${me}</span
                >`:me.map(ae=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ae.provider}
                      title=${ae.tooltip}
                      >${ae.label}</span
                    >`)}
          </span>`}
    </div>`}function Re(){let Y=w();return Y.length===0?"":c`${Ce(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(X=>H(X))}
      </div>`}function ue(){u!==null&&!S(u)&&(u=null,t.onFocusChange?.(null))}function ie(){z(),ue(),d!==null&&!S(d)&&K(!0),Ye(Re(),r),_?.render()}function Ae(Y){let X=Y.target;if(!X||typeof X.closest!="function")return;let ye=X.closest("[data-root-dir]");if(!ye)return;let me=ye.getAttribute("data-root-dir")||"",Be=X.closest("[data-act]")?.getAttribute("data-act");if(Be==="worker"){t.gotoWorkerTab?.(me);return}if(Be==="auto"){V("worker-automation-toggle",me,{on:F(me)?.auto_advance!==!0});return}if(Be==="merge"){V("worker-merge-auto-toggle",me,{on:F(me)?.auto_merge!==!0});return}if(Be==="gear"){D(me);return}M(me)}function $e(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let X=Y.target;if(!X||typeof X.closest!="function")return;let ye=X.closest('[data-root-dir][role="button"]');!ye||ye!==X||(Y.preventDefault(),M(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",$e),{render:ie,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",Ae),r.removeEventListener("keydown",$e),i.removeEventListener("click",T),q(),Ye(c``,r),e.replaceChildren()}}}var oh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ah="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Ci(e,t){return`${e}\0${t}`}function ih(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function lh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ch(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function uh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let l=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&n.has(u))));r.set(i,l.length);for(let u of l){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let l of(s.get(i)||[]).slice().sort()){let u=(r.get(l)||0)-1;r.set(l,u),u===0&&a.push(l)}}for(let i of t)o.includes(i)||o.push(i);return o}function dh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Ci(a,l));let r=new Map,s=new Map;for(let a of e){let i=Ci(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ci(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ph(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function fh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ri(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function gd(e,t,n){let r=lh(n.blocked_by_map),s=[],o=null,a=w=>{let S=n.owner_of.get(w);return typeof S!="string"||S.length===0?(o=ih(w),null):S},i=(w,S)=>{if(o!==null||w===S)return;let F=r.get(w)||[];if(!F.includes(S))return;let z=a(w);z!==null&&(r.set(w,F.filter(V=>V!==S)),s.push({type:"dep-remove",a:w,b:S,root_dir:z}))},l=(w,S)=>{if(o!==null||w===S)return;let F=r.get(w)||[];if(F.includes(S))return;let z=a(w);if(z!==null){if(ch(r,S,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${S}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...F,S]),s.push({type:"dep-add",a:w,b:S,root_dir:z})}},u=()=>{let w=n.lane_order.get(e.lane_id||"")||[],S=new Set(w),F=(r.get(e.bead_id)||[]).filter(V=>S.has(V)),z=w.filter(V=>(r.get(V)||[]).includes(e.bead_id));for(let V of F)i(e.bead_id,V);for(let V of z)i(V,e.bead_id);for(let V of F)for(let oe of z)l(oe,V);return w.filter(V=>V!==e.bead_id)},d=(w,S)=>{let F=n.lane_order.get(w)||[],z=F.indexOf(e.bead_id),V=uh(r,F.filter(q=>q!==e.bead_id)),oe=w.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,z>=0&&S>z?S-1:S)),M=oe>0?V[oe-1]:null,D=oe<V.length?V[oe]:null;if(M===null){D!==null&&l(D,e.bead_id);return}l(e.bead_id,M),D!==null&&(r.get(D)||[]).includes(M)&&(i(D,M),l(D,e.bead_id))},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:oh};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:ah};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let h=[];if(t.kind==="candidate")e.kind!=="candidate"&&h.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=ph(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")h.push(Ri(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let S=n.parallel_rows,F=S[Math.max(0,Math.min(S.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&fh(n,e.root_dir)&&_!==void 0){let V=_>w?w:w-1;V>=0&&V!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&h.push(Ri(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else h.push(Ri(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...dh(s,n.blocked_by_map),...h]}}var hd={running:3,paused:2,failed:1};function Ur(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function bd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function yd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Ur(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Ur(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=hd[u.run_state],_=hd[i];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}function Xo(e){return e.replace(/\/+$/,"")}function _h(e,t){let n=Xo(e),r=Xo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Jo(e,t){let n=new Set;for(let r of e)for(let s of t){if(!_h(r,s))continue;let o=Xo(r),a=Xo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var vd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ts=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ea(e,t){let n=vd.find(s=>s.step===e);if(!n)return null;let r=vd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function wd(e){let t=Ts.findIndex(n=>n.step===e);return Ts.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function mr(e){let t=Ts.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function mh(e){let t=Ts.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ts.length}}function ta(e){let t=mh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Li=new Set(["queued","running","retry_pending","repairing"]),kd=new Set(["failed","succeeded"]),gh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Cs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},hh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Cs.base_containment,child_sweep:Cs.child_sweep,branch_cleanup:Cs.branch_cleanup,parent_close:Cs.parent_close};function bh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function yh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Li,...kd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function vh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function Oi(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=gh[s];if(!o)return null;let a=ea(n,`${r} ${o}`);return a?{...a,active:Li.has(s),failed:s==="failed"}:null}function wh(e){return!e||typeof e!="object"?null:hh[e.step]||null}function Rs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=wh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=bh(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(S=>S&&typeof S=="object"&&yh(S,t,i)).sort(vh):[],u=a?l:[],d=u.find(S=>Li.has(S.state));if(d)return Oi(d);if(s)return s.step==="repo_operations"&&l[0]?Oi(l[0],!0):null;let _=u.find(S=>kd.has(S.state)?S.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Oi(_);if(r){let S=ea(r.step,r.label);return S?{...S,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Cs[e.cleanup_cursor]:null;if(!h)return null;let w=ea(h.step,h.label);return w?{...w,active:!0,failed:!1}:null}function na(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Ii(e,t){return`${e}\0${t}`}function $d(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Pi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function kh(e,t){return e==="internal"&&t===void 0}function Wr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function xd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Wr(s)})`,location_label:Wr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Pi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:kh(a,s)}}function Ad(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ii(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Ii(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],w=s.get(u);if(w)for(let S of h){let F=r.get(S);F&&F!==u&&!w.includes(F)&&w.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function Sd(e,t){return Ii(e,t)}var Ed=1,Os=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Di=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},Td={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function $h(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Ur(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function xh(e,t){let{winners:n,resumed_from_ids:r}=yd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:mn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Cd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Ah(e,t,n){let r=Rt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>nn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Rd(_r(l,o),_r(u,o)),_=Rd(Qn(l,null),Qn(u,null));return d||_?{orchestration:d,worker:_}:null}function Rd(e,t){return!e||t&&t.text===e.text?null:e}function Sh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Eh(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Wr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Th(e,t,n){let r=new Map;for(let l of e)r.set(l,Array.from(n.get(l)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(l=>(r.get(l)||0)===0).sort();for(let l of a)o.set(l,0);let i=[...a];for(;i.length>0;){let l=i.shift();s.push(l);let u=Array.from(t.get(l)||[]).filter(_=>e.includes(_)).sort(),d=(o.get(l)||0)+(u.length>1?1:0);for(let _ of u){let h=(r.get(_)||0)-1;r.set(_,h);let w=o.get(_);o.set(_,w===void 0?d:Math.min(w,d)),h===0&&i.push(_)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Ch(e,t,n){let r=new Map,s=new Map,o=new Set,a=(d,_,h)=>{let w=d.get(_);w?w.add(h):d.set(_,new Set([h]))},i=d=>t.get(d)?.lane==="done";for(let[d,_]of e)if(!i(d))for(let h of _)h===d||i(h)||(o.add(h),o.add(d),a(r,h,d),a(s,d,h));let l=new Set,u=[];for(let d of Array.from(o).sort()){if(l.has(d))continue;let _=[],h=[d];for(l.add(d);h.length>0;){let M=h.pop();_.push(M);for(let D of[...r.get(M)||[],...s.get(M)||[]])l.has(D)||(l.add(D),h.push(D))}if(_.length<2)continue;let w=_.map(M=>t.get(M));if(w.every(M=>!!M&&/^s[1-5]$/.test(M.lane||""))&&w.every(M=>M&&w[0]&&M.root_dir===w[0].root_dir&&M.lane===w[0].lane))continue;let{order:F,indent:z,cycle:V}=Th(_.slice().sort(),r,s),oe=V?_.slice().sort():F;u.push({key:_.slice().sort().join("\0"),cycle:V,nodes:oe.map(M=>{let D=t.get(M);return{id:M,workspace_name:D?D.workspace_name:"",root_dir:D?D.root_dir:"",location_label:D?Wr(D):Od(M,n),indent:V?0:z.get(M)||0}})})}return u}function Od(e,t){let n=Pi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Ld(e,t,n){let r=t.get(e);if(!r)return Od(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Wr(r)}function Rh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Oh(e,t,n,r,s,o,a){let i=(_,h,w,S,F=!1)=>{let z=r.get(_),V=z&&z.lane==="parallel"&&typeof z.position=="number"?z.position-1:null;return{id:_,title:o.get(_)||_,workflow:a.get(_)||null,root_dir:z?z.root_dir:"",workspace_name:z?z.workspace_name:"",seq:h,indent:w,predecessors:S,location_label:Ld(_,r,s),draggable:!F&&V!==null,...V!==null?{queue_index:V}:{}}},l=[];for(let _ of e.slice().sort((h,w)=>h.key<w.key?-1:1)){let h=new Set(_.nodes.map(w=>w.id));l.push({lane_id:`chain:${_.key}`,label:"",pending:!1,cycle:_.cycle,rows:_.nodes.map((w,S)=>i(w.id,S+1,_.cycle?0:w.indent,_.cycle?[]:Rh(w.id,h,n),_.cycle))})}let u=new Set;for(let _ of l)for(let h of _.rows)u.add(h.id);let d=[];return t.forEach((_,h)=>{let w=_&&typeof _.seed=="string"&&_.seed.length>0?_.seed:null;w!==null&&u.has(w)||(d.push(h),l.push({lane_id:`pending:${h}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),l.forEach((_,h)=>{_.label=`\uC5F0\uACB0 ${h+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:l,pending_lanes_kept:d}}function Lh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Ih(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:l,state:u}=Lh(i,t,n);if(u!==void 0&&(i.scope_state=u),l.length===0)continue;let d=o.get(i.root_dir);d?d.push({item:i,scope:l}):o.set(i.root_dir,[{item:i,scope:l}])}let a=(i,l,u)=>{let d={id:l.id,title:l.title,location_label:Ld(l.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(d):i.overlap_chips=[d]};for(let i of o.values())for(let l=0;l<i.length;l+=1)for(let u=l+1;u<i.length;u+=1){let d=Jo(i[l].scope,i[u].scope);d.length!==0&&(a(i[l].item,i[u].item,d),a(i[u].item,i[l].item,d))}}function Mi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ra(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ni(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Os.some(P=>P.value===n.candidate_sort)?n.candidate_sort:"repo_spec",l=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&l.set(P.root_dir,P);let u=[],d=[],_=[],h=[],w=[],S=[],F=new Map,z=new Map,V=new Map,oe=new Map,M=new Map,D=new Map,q=new Map,K=new Map,T=new Map;for(let P of r){if(!P||typeof P.root_dir!="string")continue;let fe=P.root_dir,ve=P.name||fe,Se=l.get(fe),He=Se&&typeof Se.revision=="number"?Se.revision:typeof P.revision=="number"?P.revision:0,qe=Rt(P.attempts),Ve=Rt(P.bead_titles);for(let[g,k]of Object.entries(Ve))typeof k=="string"&&k.length>0&&K.set(g,k);let tt=Rt(P.bead_times),$t=Rt(P.pr_observations),_t=Rt(P.admission),J=Rt(P.revise_parked),Q=Rt(P.merge_queue_state),Le=Rt(P.cleanup_failed),Je=Rt(P.discard_operations),Ie=Rt(P.bead_blocked_by);Object.hasOwn(P,"bead_scope")&&D.set(fe,Rt(P.bead_scope));let ke=Rt(P.bead_workflow);for(let[g,k]of Object.entries(ke))k&&typeof k=="object"&&T.set(g,k);let ze=Rt(P.pr_activity),Qe=Array.isArray(P.repo_operations)?P.repo_operations:[],st=Array.isArray(P.merge_queue)?P.merge_queue:[],nt=new Set(st.filter(g=>g&&typeof g.bead_id=="string").map(g=>g.bead_id)),mt=new Map(st.filter(g=>g&&typeof g.bead_id=="string").map(g=>[g.bead_id,g])),xt=Array.isArray(P.queue)?P.queue:[],St=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).filter(g=>g&&/^s[1-5]$/.test(g.id)&&Array.isArray(g.entries)),kt=Rt(P.lane_states),Ot=typeof P.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(P.serial_lane_count))):Math.min(5,St.length);V.set(fe,Ot),oe.set(fe,xt.length);let bt=new Map(St.map(g=>[g.id,g])),Ge=new Map;for(let g of St)for(let k of g.entries)k&&typeof k.bead_id=="string"&&Ge.set(k.bead_id,g.id);for(let[g,k]of Object.entries(Ie))Array.isArray(k)&&M.set(g,k.filter(j=>typeof j=="string"&&j.length>0));let _e=Array.isArray(P.done)?P.done:[];for(let g of _e)g&&typeof g.bead_id=="string"&&S.push({id:g.bead_id,root_dir:fe,workspace_name:ve});let I=new Map;for(let g of _e)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&I.set(g.bead_id,g.added_at);let Z=g=>({id:g,title:Ve[g]||g,root_dir:fe,workspace_name:ve,expected_revision:He,draggable:!1,...Rt(tt[g]).created_at?{created_at:Rt(tt[g]).created_at}:{},...Rt(tt[g]).updated_at?{updated_at:Rt(tt[g]).updated_at}:{}}),re=new Set;for(let[g,k]of xh(qe,I))re.add(g),d.push({...Z(g),lane:"running",...Ge.has(g)?{serial_lane_id:Ge.get(g)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:ke[g]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,exec_chips:{orchestration:Es(k),worker:null},discard:xn(Je,g,{attempt_id:k.attempt_id}),badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:k.run_state==="failed"});for(let[g,k]of bd(qe)){if(d.some(te=>te.id===g))continue;let j=k.attempt,ne=k.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";d.push({...Z(g),lane:"running",kind:"session",attempt_id:typeof j.attempt_id=="string"?j.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ke[g]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof j.last_event_at=="number"?j.last_event_at:null,last_activity:j.last_activity&&typeof j.last_activity=="object"?j.last_activity:null,legs:Array.isArray(j.legs)?j.legs:[],runner:typeof j.runner=="string"?j.runner:null,model:typeof j.model=="string"?j.model:null,effort:typeof j.effort=="string"?j.effort:null,speed:typeof j.speed=="string"?j.speed:null,resumed_from:null,continuation_mode:null,usage:j.usage&&typeof j.usage=="object"?j.usage:null,exec_chips:{orchestration:Es(j),worker:null},discard:xn(Je,g,{merge_queued:!0}),badges:[k.origin==="auto"?`${ne} \xB7 \uC790\uB3D9`:ne],alert:!1})}for(let g of Array.isArray(P.session_active)?P.session_active:[]){let k=g&&g.bead_id;typeof k!="string"||re.has(k)||(re.add(k),Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&M.set(k,g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)),typeof g.title=="string"&&g.title.length>0&&K.set(k,g.title),g.workflow&&typeof g.workflow=="object"&&T.set(k,g.workflow),d.push({...Z(k),title:g.title||Ve[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:Mi(g.started_at)??Mi(g.updated_at)??void 0,updated_at:Mi(g.updated_at)??void 0,workflow:g.workflow||null,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let g of Array.isArray(P.pr_wait)?P.pr_wait:[]){let k=g&&g.bead_id;if(typeof k!="string"||re.has(k))continue;re.add(k);let j=Rt($t[k]),ne=Rt(j.pr),te=j.gate?Rt(j.gate):null,be=nt.has(k),Ee=mt.get(k)?.continuation_action||null,et=!!Ee&&Ee.continuation===null,dt=Q.active===k,De=g.external===!0,ot=Le[k]||null,Lt=Rt(ze[k]),gt=Rs({bead_id:k,merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,merge_progress:Lt.merge_progress||null,cleanup_failed:ot,repo_operations:Qe}),pn=na(gt),Bt=!!te&&te.base_badge==="\uCDA9\uB3CC",qt=!!ot&&["child_sweep","branch_cleanup","parent_close"].includes(ot.step)&&!!te&&te.tier==="merged",Gt=De&&!!ot&&!!te&&te.tier==="merged",Ft=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),Dt=xn(Je,k,{external:De,merge_active:dt||gt?.step==="merge",merge_queued:be,cleanup_active:pn,merged:!!ot||te?.tier==="merged"}),We=!!Dt.operation;_.push({...Z(k),lane:"pr_wait",workflow:ke[k]||null,pr_number:typeof ne.number=="number"?ne.number:null,pr_url:typeof ne.url=="string"?ne.url:void 0,external:De,usage:mn(qe,k),merge_step:gt,badges:et?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:gt?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ot?[mr(ot.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${mr(ot.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:gt?gt.failed===!0:!!ot||Ft,reason:ot&&gt?.active!==!0?ta(ot.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!qt&&!Gt?!1:!be||et,merge_enabled:!We&&(et||te?.enabled===!0||Bt||qt||Gt),merge_label:et?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Gt||qt?"\uC815\uB9AC \uC7AC\uAC1C":Bt&&!qt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:et?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":We?Dt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Dt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Dt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Gt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Bt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!et,cancel_enabled:!dt,continuation_mismatch:Ee?.mismatch||null,discard:Dt,discard_action:Dt.action,discard_enabled:Dt.enabled,discard_title:Dt.title})}let R=(g,k,j,ne)=>{let te=g&&g.bead_id;if(typeof te!="string"||re.has(te))return null;re.add(te);let be=J[te],Ee=xn(Je,te),et=Ee.operation?Ee:null,dt={...Z(te),lane:k,workflow:ke[te]||null,draggable:!et,discard:et||void 0,reason:Cd(_t,te),seq:j+1,queue_position:j+1,queue_index:j,queue_length:ne,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!et,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ie,te)&&(dt.blocked_by=Array.isArray(Ie[te])?Ie[te].filter(De=>typeof De=="string"&&De.length>0):[]),dt};for(let g=0;g<xt.length;g++){let k=R(xt[g],"queue",g,xt.length);if(!k)continue;h.push(k);let j=F.get(fe);j?j.push(k):F.set(fe,[k])}let G=g=>{let k=_.find(te=>te.id===g&&te.root_dir===fe);if(k)return{id:g,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let j=d.find(te=>te.id===g&&te.root_dir===fe),ne=j&&j.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":j&&j.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:g,title:j?j.title:Z(g).title,badge:ne}},xe=[];for(let g=0;g<Math.max(Ot,St.length);g++){let k=`s${g+1}`,j=bt.get(k),ne=j&&Array.isArray(j.entries)?j.entries:[],te=[];for(let et=0;et<ne.length;et++){let dt=R(ne[et],k,et,ne.length);dt&&(te.push(dt),h.push(dt))}let be=Rt(kt[k]),Ee=Array.isArray(be.occupied_by)?be.occupied_by.filter(et=>typeof et=="string"):[];te.length===0&&Ee.length===0&&(Ot<=1||g>=Ot)||xe.push({id:k,index:g,items:te,raw_length:ne.length,occupied_by:Ee,occupants:Ee.map(et=>G(et)),corrections:Array.isArray(be.corrections)?be.corrections.length:0,cycle:be.cycle===!0,...te.length===0&&Ee.length===0?{empty:!0}:{}})}z.set(fe,xe);let A=Array.from({length:Ot},(g,k)=>{let j=`s${k+1}`,ne=bt.get(j),te=ne&&Array.isArray(ne.entries)?ne.entries:[],be=Rt(kt[j]);return{id:j,index:te.length,length:te.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(Ee=>typeof Ee=="string"):[]}});for(let g of Array.isArray(P.runnable)?P.runnable:[]){let k=g&&g.bead_id;if(typeof k!="string"||re.has(k))continue;re.add(k);let j=g.workflow&&typeof g.workflow=="object"?g.workflow:null,ne=j&&typeof j.route=="string"&&j.route||(typeof g.route=="string"?g.route:null),te=Ah(Rt(Se),g.exec_pins,ne);Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&M.set(k,g.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof g.title=="string"&&g.title.length>0&&K.set(k,g.title),j&&T.set(k,j),Array.isArray(g.scope)&&q.set(k,g.scope.filter(be=>typeof be=="string"&&be.length>0)),u.push({...Z(k),title:g.title||Ve[k]||k,lane:"runnable",draggable:!0,reason:Cd(_t,k),created_at:g.created_at??void 0,updated_at:g.updated_at??void 0,status:typeof g.status=="string"?g.status:void 0,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",workflow:j||(ne?{route:ne,chips:{route:ne}}:null),...te?{exec_chips:te}:{},blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:xt.length,place_lanes:A})}for(let g of _e){let k=g&&g.bead_id;if(typeof k!="string"||re.has(k)||(re.add(k),o!==void 0&&typeof g.added_at=="number"&&g.added_at<o))continue;let j=$h(qe,k),ne=j&&typeof j.done_kind=="string"?j.done_kind:null;w.push({...Z(k),lane:"done",done:!0,done_layout:"three_line",usage:mn(qe,k),work_ms:Wo(qe,k),done_at:typeof g.added_at=="number"?g.added_at:void 0,done_kind:ne,badges:[...ne&&Td[ne]?[Td[ne]]:[],...Uo(qe,k)]})}}let U=new Map;s.forEach((P,fe)=>{P&&typeof P.root_dir=="string"&&U.set(P.root_dir,fe)});let W=n&&n.running_sort==="repo"?"repo":"started";d.sort((P,fe)=>{let ve=P.kind==="session",Se=fe.kind==="session";if(ve!==Se)return ve?1:-1;if(ve&&Se){let Ve=ra(fe.updated_at)-ra(P.updated_at);return Ve!==0?Ve:P.id.localeCompare(fe.id)}if(W==="repo"){let Ve=U.get(P.root_dir)??Number.MAX_SAFE_INTEGER,tt=U.get(fe.root_dir)??Number.MAX_SAFE_INTEGER;if(Ve!==tt)return Ve-tt}let He=typeof P.started_at=="number"&&Number.isFinite(P.started_at)?P.started_at:null,qe=typeof fe.started_at=="number"&&Number.isFinite(fe.started_at)?fe.started_at:null;return He!==null&&qe!==null&&He!==qe?He-qe:He===null&&qe!==null?1:He!==null&&qe===null?-1:P.id.localeCompare(fe.id)}),w.sort((P,fe)=>(fe.done_at??0)-(P.done_at??0));let we=s.length>0?s:r.map(P=>({root_dir:P&&P.root_dir,name:P&&P.name,auto_advance:P&&P.auto_advance,auto_merge:P&&P.auto_merge,slots:P&&P.slots,revision:P&&P.revision,runner_catalog:P&&P.runner_catalog})),he=new Set(u.map(P=>P.root_dir)),pe=[];for(let P of we){if(!P||typeof P.root_dir!="string")continue;let fe=F.get(P.root_dir)||[],ve=z.get(P.root_dir)||[];!(fe.length>0||ve.some(He=>He.items.length>0||He.occupied_by.length>0))&&!he.has(P.root_dir)||pe.push({root_dir:P.root_dir,name:P.name||P.root_dir,auto_advance:P.auto_advance===!0,auto_merge:P.auto_merge===!0,slots:typeof P.slots=="number"&&P.slots>=Ed?P.slots:Ed,revision:typeof P.revision=="number"?P.revision:0,runner_catalog:Rt(P.runner_catalog),items:fe,sublanes:{parallel:fe,serial:ve},serial_lane_count:V.get(P.root_dir)||0,raw_queue_length:oe.get(P.root_dir)||0})}let H={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:h,queue_groups:pe,running:d,pr_wait:_,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(oe),owner_of:{},pending_lanes_kept:[]},Ce=$d(H);for(let P of S)Ce.has(P.id)||Ce.set(P.id,{root_dir:P.root_dir,workspace_name:P.workspace_name,lane:"done",state:"done"});let Re=new Map;for(let[P,fe]of M)for(let ve of fe){let Se=Re.get(ve);Se?Se.includes(P)||Se.push(P):Re.set(ve,[P])}for(let P of[...H.queue,...H.runnable]){if(!Object.hasOwn(P,"blocked_by"))continue;let fe=Ce.get(P.id);P.blockers=(P.blocked_by||[]).map(ve=>xd(ve,fe,Ce,s)),P.blocker_warnings=P.blockers.filter(ve=>ve.missing_internal).map(ve=>`\u26A0 \uC120\uD589 ${ve.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),P.blocker_warnings.length>0&&(P.alert=!0)}for(let P of[...H.queue,...H.runnable,...H.running,...H.pr_wait]){let fe=P.lane==="running"||P.lane==="pr_wait"?[]:(P.blockers||[]).map(Sh),ve=[];for(let qe of Re.get(P.id)||[]){let Ve=Eh(qe,Ce);Ve&&ve.push(Ve)}let Se=P.lane==="running"||P.lane==="pr_wait"?[]:P.blocker_warnings||[];if(fe.length===0&&ve.length===0&&Se.length===0)continue;let He={predecessors:fe,successors:ve,warnings:Se};P.dependency_chips=He}Ih(H,D,q,Ce,s),H.chains=Ch(M,Ce,s);let ue=Ad(H.queue_groups);for(let P of H.queue_groups)for(let fe of P.sublanes.serial){let ve=ue.get(Sd(P.root_dir,fe.id));ve&&(fe.cross_wait_peers=ve)}let ie=Oh(H.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],M,Ce,s,K,T);H.chain_lanes=ie.chain_lanes,H.pending_lanes_kept=ie.pending_lanes_kept;let Ae=new Map;for(let P of[...H.running,...H.queue,...H.runnable])Ae.has(P.id)||Ae.set(P.id,P);let $e=new Set;for(let P of H.chain_lanes)for(let fe of P.rows){$e.add(fe.id);let ve=Ae.get(fe.id);ve&&(ve.overlap_chips&&(fe.overlap_chips=ve.overlap_chips),ve.scope_state&&(fe.scope_state=ve.scope_state))}let Y=[];for(let P of F.values())for(let fe of P)$e.has(fe.id)||Y.push(fe);Y.sort((P,fe)=>{let ve=P.workspace_name.localeCompare(fe.workspace_name);return ve!==0?ve:(P.queue_index??0)-(fe.queue_index??0)}),H.parallel_rows=Y;let X={};for(let[P,fe]of Ce)typeof fe.root_dir=="string"&&fe.root_dir.length>0&&(X[P]=fe.root_dir);H.owner_of=X;let ye=H.runnable.length,me=H.runnable;a.show_blocked||(me=me.filter(P=>P.blocked!==!0));let Be=me.length;a.spec==="with"?me=me.filter(P=>!!P.spec_id):a.spec==="without"&&(me=me.filter(P=>!P.spec_id)),H.runnable_hidden={blocked:ye-Be,spec:Be-me.length};let ae=(P,fe)=>{let ve=ra(fe.updated_at)-ra(P.updated_at);return ve!==0?ve:P.id.localeCompare(fe.id)},it=i==="repo_spec"?(P,fe)=>{let ve=P.spec_id?0:1,Se=fe.spec_id?0:1;return ve!==Se?ve-Se:ae(P,fe)}:ae;if(i==="updated_flat")H.runnable=me.slice().sort(ae),H.runnable_sections=[];else{let P=new Map;for(let Se of me){let He=P.get(Se.root_dir);He?He.push(Se):P.set(Se.root_dir,[Se])}let fe=[],ve=[];for(let Se of we){if(!Se||typeof Se.root_dir!="string")continue;let He=(P.get(Se.root_dir)||[]).slice().sort(it);P.delete(Se.root_dir),He.length!==0&&(fe.push({root_dir:Se.root_dir,name:Se.name||Se.root_dir,items:He.map(qe=>({...qe,workspace_name:""}))}),ve.push(...He))}for(let[Se,He]of P){let qe=He.slice().sort(it);fe.push({root_dir:Se,name:qe[0]?.workspace_name||Se,items:qe.map(Ve=>({...Ve,workspace_name:""}))}),ve.push(...qe)}H.runnable=ve,H.runnable_sections=fe}return H}var Id="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Pd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Md(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Fd="bdui.monitor.done-range",jd="bdui.monitor.running_sort",Bd="bdui.monitor.candidate_sort",Ud="beads-ui.monitor.candidate-filter",Wd="beads-ui.monitor.sections";function Ph(){try{let e=window.localStorage.getItem(Ud);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:Di.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function Dd(e){try{window.localStorage.setItem(Ud,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Mh(){try{let e=window.localStorage.getItem(Bd);return Os.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Dh(e){try{window.localStorage.setItem(Bd,e)}catch{}}function Nh(){try{let e=window.localStorage.getItem(Wd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Nd(e){try{window.localStorage.setItem(Wd,JSON.stringify(e))}catch{}}function qh(){try{let e=window.localStorage.getItem(Fd);return _n(e)?e:an}catch{return an}}function Fh(e){try{window.localStorage.setItem(Fd,e)}catch{}}function jh(){try{return window.localStorage.getItem(jd)==="repo"?"repo":"started"}catch{return"started"}}function Bh(e){try{window.localStorage.setItem(jd,e)}catch{}}var zd="tab:monitor:pipeline",Uh=1e3,Wh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],qd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function zh(e){return e>=1&&e<=qd.length?qd[e-1]:`(${e})`}function Hd(e,t){let n=It("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),h=qh(),w=jh(),S=Ph(),F=Mh(),z=Nh(),V=null,oe=null,M=null,D=[],q=null;function K(){let v=Wn.find(b=>b.value===h);return v?v.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let W=Ni(null,null),we=new Map,he=new Map,pe=null,H=null,Ce=null,Re=Mr(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{V=null,_e()}});async function ue(v,b,$,N,ee=!0){if(!o||!$)return null;let ge=await o(v,{...b,root_dir:$,expected_revision:N});if(ge&&ge.conflict&&ee){ge.queue&&he.set($,ge.queue);let Me=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:N;ge=await o(v,{...b,root_dir:$,expected_revision:Me})}return ge&&ge.queue&&$&&he.set($,ge.queue),ge}function ie(v,b){let $=he.get(v),N=s&&s.get?s.get():null,ee=(Array.isArray(N)?N:[]).find(Me=>Me?.root_dir===v);return($||ee)?.merge_queue?.find(Me=>Me.bead_id===b)?.continuation_action}async function Ae(v,b,$,N){let ee=await ue(v,b,$,N),ge=he.get($)?.revision??ee?.queue?.revision??N;return Ln(ee,(Me,rt)=>ue(v,{...b,continuation:Me,decision_token:rt},$,ge,!1),{refresh:Me=>ue(v,b,$,Me?.queue?.revision??he.get($)?.revision??ge,!1)})}async function $e(v,b,$,N){let ee=await Ln({continuation_mismatch:N},(Me,rt)=>ue("worker-merge-queue-add",{bead_id:b,continuation:Me,decision_token:rt},v,$,!1)),ge=ee?.queue?.merge_queue?.find(Me=>Me.bead_id===b)?.continuation_action;ee?.applied!==!0&&ge?.continuation===null&&ge.mismatch&&await $e(v,b,ee.queue.revision,ge.mismatch)}async function Y(v,b,$){let N=await ue("worker-discard",v,b,$);if(N&&N.discarded===!0){ce(Ho(N),"success",5e3);return}if(N&&N.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${N.reason}`,"error");return}if(N&&N.accepted&&N.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(N&&N.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${N.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}N&&!N.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function X(v,b,$){return!o||!$?null:await o(v,{...b,root_dir:$})}async function ye(){let v=new Map;for(let b of W.pr_wait)v.has(b.root_dir)||v.set(b.root_dir,b.expected_revision);for(let[b,$]of v)await ue("worker-merge-queue-add-all",{},b,$)}function me(v){let b=z[v];return!!(b&&b.runnable===!0)}function Be(v){let b={...z[v]||{}};b.runnable=!b.runnable,z={...z,[v]:b},Nd(z),_e()}function ae(v){return z[v]===!0}function Ze(v){z={...z,[v]:z[v]!==!0},Nd(z),_e()}function it(v){let b=W.queue_groups.find($=>$.root_dir===v);if(!b)return null;for(let $=0;$<b.serial_lane_count;$+=1){let N=`s${$+1}`,ee=b.sublanes.serial.find(ge=>ge.id===N);if(!ee||ee.raw_length===0&&ee.occupied_by.length===0)return N}return null}function P(v,b){let $=W.queue_groups.find(ee=>ee.root_dir===v),N=$?$.sublanes.serial.find(ee=>ee.id===b):void 0;return N?N.raw_length:0}function fe(v,b){let $=we.get(v),N=we.get(b);if(!$||!N)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let ee=Pd($),ge=Pd(N);if(ee!==null&&ee===ge&&$.root_dir===N.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Me=Md($),rt=Md(N);if(Me&&ge!==null){let x=ge;return{kind:"ops",title:`${x} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:N.root_dir,ops:[{bead_id:v,lane:x,index:P(N.root_dir,x)}]}}if(ee!==null&&rt&&ge===null){let x=ee;return{kind:"ops",title:`${x} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:b,lane:x,index:P($.root_dir,x)}]}}if(Me&&ee===null&&rt&&ge===null){let x=it($.root_dir);return x===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${x} \uB808\uC778\uC5D0 ${b} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:b,lane:x,index:0},{bead_id:v,lane:x,index:1}]}}return!Me&&!rt?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Me?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ve(v,b){let $=fe(v,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:$.kind==="note"?{kind:"note",text:$.text}:$.kind==="disabled"?{kind:"disabled",label:Id,title:$.title}:{kind:"place",label:Id,title:$.title}}}function Se(v,b){if(!M||M.bead_id!==v)return null;let $=M.counterpart_id,N=b.filter(ee=>ee.id===$);return N.length===0?null:{rows:N.map(ee=>ve(v,ee))}}function He(v){let b=v.dependency_chips||null,$=v.overlap_chips||[],N=v.scope_state==="missing";if(!b&&$.length===0&&!N)return null;let ee=Se(v.id,$);return{...b||{},...$.length>0?{overlaps:$}:{},...N?{scope_missing:!0}:{},...ee?{popover:ee}:{}}}function qe(v){let b=He(v);return b?{...v,dependency_chips:b}:v}async function Ve(v,b){let $=fe(v,b);if(M=null,$.kind!=="ops"){_e();return}let N=te($.root_dir,$.ops[0].bead_id);for(let ee of $.ops){let ge=await tt(ee,$.root_dir,N);if(ge===null)break;N=ge}_e()}async function tt(v,b,$){try{let N=await ue("worker-queue-place",v,b,$,!1);if(N&&N.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!N||N.applied!==!0)return ce(N&&typeof N.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${N.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ee=N.queue?N.queue.revision:void 0;return typeof ee!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ee}catch(N){return ce(g(N),"error"),null}}function $t(v){let b=me(v.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${v.root_dir}>${v.name}</span>
      <span class="mon2-sec__count">${v.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function _t(v,b){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${b}
    </div>`}function J(v){if(oe!==v.id)return null;let b=W.queue_groups.find(N=>N.root_dir===v.root_dir),$=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...W.chain_lanes.map((N,ee)=>({id:`lane:${ee}`,label:`\uC5F0\uACB0 ${ee+1} \uB05D\uC5D0`,count:N.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...$.map(N=>({id:`serial:${N.id}`,label:`${b?b.name:""} \uC9C1\uB82C ${Number(N.id.slice(1))}`,count:N.length}))]}}function Q(v){return _t(v,wi(qe(v),J(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(b,$)=>i($,v.root_dir):void 0}))}function Le(){return W.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${W.runnable.map(v=>Q(v))}
      </div>`:c`${W.runnable_sections.map(v=>{let b=me(v.root_dir);return c`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${$t({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${b?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map($=>Q($))}
            </div>`}
      </section>`})}`}function Je(v,b){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${b}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Kn(qe(v))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${v.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function Ie(){let v=ae("parallel");return c`<section
      class="mon2-area mon2-parallel${v?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${W.parallel_rows.length}</span>
      </header>
      ${v?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${W.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:W.parallel_rows.map((b,$)=>Je(b,$))}
          </div>`}
    </section>`}function ke(v,b,$){return c`<div
      class="mon2-crow"
      style=${`--indent: ${b.indent}`}
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${$}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      ${v.cycle?"":c`<span class="mon2-crow__seq" aria-hidden="true"
            >${zh(b.seq)}</span
          >`}
      ${b.workspace_name?c`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      ${Br(b.workflow)}
      <span class="mon2-crow__title">${b.title}</span>
      ${b.predecessors.map(N=>c`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${N}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${b.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${b.location_label}`:b.location_label}</span
      >
      ${b.draggable?c`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${b.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${jr(He(b),{lane:we.get(b.id)?.lane})}
    </div>`}function ze(v){return c`<div class="mon2-clane" data-lane-id=${v.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${v.label}</span>
        <span class="mon2-clane__count">${v.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${v.lane_id}
      >
        ${v.cycle?c`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${v.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:v.rows.map((b,$)=>ke(v,b,$))}
      </div>
    </div>`}function Qe(v,b,$){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${v.id}
      data-row-index=${$}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Kn(qe(b))}
    </div>`}function st(v){if(v.length===0)return"";let b=v.length-1;return`${v[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function nt(v){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Kn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function mt(v,b){return c`<div
      class="mon2-lane${b.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(b.raw_length)}
    >
      ${hn({id:"",lane:b.id,title:`${v.name} \xB7 \uC9C1\uB82C ${b.index+1}`,items:b.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${b.id}
          data-lane-length=${String(b.raw_length)}
        >
          ${b.occupants.map($=>nt($))}
          ${b.items.length>0?b.items.map(($,N)=>Qe(b,$,N)):b.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${b.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${b.occupants.length>0?b.occupants.map($=>`${$.id} \u2014 ${$.badge}`).join(`
`):""}
            >${st(b.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${b.empty?c`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${b.index+1} 비어 있음
          </div>`:""}
      ${b.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(b.cross_wait_peers||[]).map($=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${$.workspace_name}·${$.lane}과 교차 대기
          </div>`)}
    </div>`}function xt(){let v=ae("serial"),b=W.chain_lanes.some($=>$.pending&&$.rows.length===0);return c`<section
      class="mon2-area mon2-serial${v?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${b}
          title=${b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${v?"":c`<div class="mon2-area__body">
            ${W.chain_lanes.map($=>ze($))}
            ${W.queue_groups.map($=>$.sublanes.serial.map(N=>mt($,N)))}
          </div>`}
    </section>`}function St(){return c`<div class="mon2-wait">${Ie()}${xt()}</div>`}function kt(v){return c`<div class="worker-rungrid">
      ${W.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:W.running.map(b=>xi({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:b.can_resume!==!1,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard},v,V,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:He(b)}}))}
    </div>`}function Ot(v){let b={runnable:W.runnable,queue:W.queue,running:W.running,pr_wait:W.pr_wait,done:W.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Wh.map($=>{let N=b[$.lane],ee=$.lane==="runnable"?W.runnable_flat?N.length>0?Le():void 0:W.runnable_sections.length>0?Le():void 0:$.lane==="queue"?W.queue_groups.length>0||W.chain_lanes.length>0||W.parallel_rows.length>0?St():void 0:$.lane==="running"?kt(v):N.length>0?c`${N.map(ge=>Kn(ge))}`:void 0;return hn({id:`monitor-${$.lane}`,lane:$.pane,title:$.lane==="done"?`\uC644\uB8CC\xB7${K()}`:$.title,items:N,empty:$.empty,body:ee,live:$.lane==="running"&&N.length>0,controls:$.lane==="runnable"?bt():void 0,header_control:Ge($.lane,N.length)})})}
      </div>`}function bt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${S.show_blocked}
        />
        🔒
        blocked${W.runnable_hidden.blocked>0?` ${W.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Di.map(v=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${S.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${S.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${W.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${W.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ge(v,b){return v==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${Os.map($=>c`<option
              value=${$.value}
              ?selected=${F===$.value}
            >
              ${$.label}
            </option>`)}
      </select>`:v==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${w}
      >
        <option value="started" ?selected=${w==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${w==="repo"}>
          레포순
        </option>
      </select>`:v==="pr_wait"&&b>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Wn.map($=>c`<option value=${$.value} ?selected=${h===$.value}>
              ${$.label}
            </option>`)}
      </select>`:""}function _e(){let v=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=d(),N=()=>Ni(v,b,{done_since:ir(h,$),running_sort:w,candidate_filter:S,candidate_sort:F,pending_lanes:D});W=N(),W.pending_lanes_kept.length!==D.length&&(D=W.pending_lanes_kept.map(ee=>D[ee]),W=N()),we=new Map;for(let ee of[...W.runnable,...W.queue,...W.running,...W.pr_wait,...W.done])!ee.non_occupying&&!we.has(ee.id)&&we.set(ee.id,ee);Ye(Ot($),T),Z()?.render(),I(),re()}function I(){let v=new Map;for(let b of W.queue_groups)v.set(b.root_dir,b.auto_advance);for(let b of Array.from(T.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let $=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",N=v.get($);typeof N=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${N?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Z(){if(Ce)return Ce;let v=T.querySelector(".mon2-deck");return v?(Ce=md(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>W.done,rangeLabel:K,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:G,onFocusChange:b=>{q=b,re()}}),Ce):null}function re(){T.classList.toggle("has-focus",q!==null);for(let v of Array.from(T.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q);for(let v of Array.from(T.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=we.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",q!==null&&!!b&&b.root_dir===q)}for(let v of Array.from(T.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q)}function R(v,b){let $=a?a():void 0;if(!b||!$||b===$||!l){r(v);return}l(b).then(()=>{r(v)}).catch(N=>{n("workspace switch for %s failed: %o",b,N)})}function G(v){if(!v)return;let b=a?a():void 0,$=()=>{try{u?.gotoView("worker")}catch(N){n("gotoView(worker) failed: %o",N)}};if(!l||b&&b===v){$();return}l(v).then($).catch(N=>{n("workspace switch for %s failed: %o",v,N),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function xe(v){cn(v).then(b=>{ce(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function A(v){let b=we.get(v)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function g(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let b=v;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function k(v,b,$){let{root_dir:N}=A(b);if(!(!b||!$||$===b))try{await X(v,{a:b,b:$},N)}catch(ee){ce(g(ee),"error")}}function j(){let v=new Map,b=s&&s.get?s.get():null,$=N=>Array.isArray(N)?N.filter(ee=>typeof ee=="string"&&ee.length>0):[];for(let N of Array.isArray(b)?b:[]){if(!N||typeof N!="object")continue;let ee=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[ge,Me]of Object.entries(ee))Array.isArray(Me)&&v.set(ge,$(Me));for(let ge of[...Array.isArray(N.runnable)?N.runnable:[],...Array.isArray(N.session_active)?N.session_active:[]])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&ge.blocked_by.length>0&&v.set(ge.bead_id,$(ge.blocked_by))}return v}function ne(){let v=new Map;for(let $ of W.chain_lanes)v.set($.lane_id,$.rows.map(N=>N.id));let b=new Map;for(let $ of W.parallel_rows)typeof $.queue_index=="number"&&b.set($.id,$.queue_index);for(let $ of W.queue_groups)for(let N of $.sublanes.serial)for(let ee of N.items)typeof ee.queue_index=="number"&&b.set(ee.id,ee.queue_index);return{blocked_by_map:j(),owner_of:new Map(Object.entries(W.owner_of)),lane_order:v,parallel_rows:W.parallel_rows.map($=>({bead_id:$.id,root_dir:$.root_dir,queue_index:$.queue_index??0})),parallel_raw_length:new Map(Object.entries(W.parallel_raw_length)),queue_index_of:b}}function te(v,b){let $=we.get(b);if($&&$.root_dir===v)return $.expected_revision;let N=W.queue_groups.find(ee=>ee.root_dir===v);return N?N.revision:0}async function be(v,b){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let $=await ue(v.type,v.payload,v.root_dir,te(v.root_dir,b));return $&&$.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):$&&$.applied===!1?(ce($.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await X(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch($){return ce(g($),"error"),!1}}async function Ee(v,b){let $=gd(v,b,ne());if("refused"in $){ce($.refused,"error");return}if(b.kind==="chain"){let N=W.chain_lanes.find(ge=>ge.lane_id===b.lane_id),ee=N&&N.pending&&N.rows.length===0?Number(N.lane_id.slice(8)):-1;ee>=0&&D[ee]&&(D=D.map((ge,Me)=>Me===ee?{seed:v.bead_id}:ge))}for(let N of $.ops)if(!await be(N,v.bead_id))break;_e()}async function et(v,b){let $=we.get(v);if(!$){_e();return}let N={kind:"candidate",bead_id:v,root_dir:$.root_dir};if(b==="new-lane"){D.some(ge=>ge.seed===null)||(D=[...D,{seed:null}]),_e();let ee=W.chain_lanes.find(ge=>ge.pending&&ge.rows.length===0);if(!ee)return;await Ee(N,{kind:"chain",lane_id:ee.lane_id,marker_index:0});return}if(b.startsWith("lane:")){let ee=W.chain_lanes[Number(b.slice(5))];if(!ee){_e();return}await Ee(N,{kind:"chain",lane_id:ee.lane_id,marker_index:ee.rows.length});return}if(b.startsWith("serial:")){let ee=b.slice(7),ge=($.place_lanes||[]).find(Me=>Me.id===ee);await Ee(N,{kind:"repo-serial",root_dir:$.root_dir,lane_id:ee,index:ge?ge.index:0});return}await Ee(N,{kind:"parallel",marker_index:W.parallel_rows.length})}async function dt(v,b){let $=W.parallel_rows,N=$.findIndex(O=>O.id===v);if(N<0)return;let ee=$[N].root_dir,ge=[];$.forEach((O,Oe)=>{O.root_dir===ee&&ge.push(Oe)});let Me=ge.indexOf(N),rt=ge[Me+b];if(typeof rt!="number")return;let x=b===-1?rt:ge[Me+2]??Math.min($.length,rt+1);await Ee({kind:"parallel",bead_id:v,root_dir:ee,queue_index:$[N].queue_index??0},{kind:"parallel",marker_index:x})}async function De(v){for(let b of W.chain_lanes){let $=b.rows.find(N=>N.id===v);if(!(!$||!$.draggable)){await Ee({kind:"chain",bead_id:v,root_dir:$.root_dir,lane_id:b.lane_id,...typeof $.queue_index=="number"?{queue_index:$.queue_index}:{}},{kind:"parallel",marker_index:W.parallel_rows.length});return}}}let ot=null,Lt=!1,gt=null;function pn(){gt!==null&&clearTimeout(gt),gt=setTimeout(()=>{gt=null,Lt=!1},0)}function Bt(v,b){let $=b&&typeof b.closest=="function"?b.closest("[data-row-index]"):null;if($&&v.contains($)){let N=Number($.getAttribute("data-row-index"));return Number.isFinite(N)?N:0}return v.querySelectorAll("[data-row-index]").length}function qt(v){let b=v.target,$=typeof b?.closest=="function"?b.closest("[data-drop]"):null;if(!$||!ot)return null;let N=$.getAttribute("data-drop");if(N==="candidate")return{zone:$,target:{kind:"candidate"}};if(N==="parallel")return{zone:$,target:{kind:"parallel",marker_index:Bt($,b)}};if(N==="chain")return{zone:$,target:{kind:"chain",lane_id:$.getAttribute("data-lane-id")||"",marker_index:Bt($,b)}};if(N==="repo-serial"){let ee=$.getAttribute("data-root-dir")||"";if(ee!==ot.root_dir)return null;let ge=typeof b?.closest=="function"?b.closest("[data-queue-index]"):null,Me=ge&&$.contains(ge)?ge.getAttribute("data-queue-index"):$.getAttribute("data-lane-length"),rt=Number(Me);return{zone:$,target:{kind:"repo-serial",root_dir:ee,lane_id:$.getAttribute("data-lane-id")||"",index:Number.isFinite(rt)?rt:0}}}return null}function Gt(){for(let v of Array.from(T.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Ft(v){let b=v.target,$=typeof b?.closest=="function"?b.closest('[draggable="true"][data-bead-id]'):null,N=$?$.closest("[data-drag-kind]"):null;if(!N)return;let ee=N.getAttribute("data-bead-id")||"",ge=N.getAttribute("data-drag-kind")||"",Me=N.getAttribute("data-root-dir")||"";if(!ee||!ge||!Me)return;let rt=N.getAttribute("data-queue-index")||"",x=Number(rt),O=N.getAttribute("data-lane-id")||"";ot={kind:ge,bead_id:ee,root_dir:Me,...rt!==""&&Number.isFinite(x)?{queue_index:x}:{},...O?{lane_id:O}:{}},Lt=!0,oe=null,T.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",ee),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function Dt(v){let b=qt(v);b&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),b.zone.classList.add("is-drop-over"))}function We(v){let b=v.target;typeof b?.closest=="function"&&b.closest("[data-drop]")?.classList.remove("is-drop-over")}function Xt(){ot=null,Gt(),T.classList.remove("is-dragging"),pn()}function Vt(v){let b=qt(v),$=ot;ot=null,Gt(),T.classList.remove("is-dragging"),!(!b||!$)&&(v.preventDefault(),Ee($,b.target))}function lt(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Ne(v,b){let{item:$,root_dir:N,revision:ee}=A(b),ge=$?.attempt_id||"",Me=v.classList;if(Me.contains("worker-dep__remove")){k("dep-remove",b,v.dataset.blockerId||"");return}if(Me.contains("mon2-rowops__up")||Me.contains("mon2-rowops__down")){dt(b,Me.contains("mon2-rowops__up")?-1:1);return}if(Me.contains("mon2-rowops__remove")){ue("worker-queue-remove",{bead_id:b},N,ee);return}if(Me.contains("mon2-crow__detach")){De(b);return}if(Me.contains("mon-overlap__chip")){let rt=v.getAttribute("data-overlap-id")||"";M=!!M&&M.bead_id===b&&M.counterpart_id===rt?null:{bead_id:b,counterpart_id:rt},_e();return}if(Me.contains("mon-overlap__place")){Ve(b,v.getAttribute("data-counterpart-id")||"");return}if(Me.contains("worker-card__place")){oe=oe===b?null:b,_e();return}if(Me.contains("worker-card__place-cancel")){oe=null,_e();return}if(Me.contains("worker-card__place-lane")){let rt=v.getAttribute("data-lane")||"parallel";oe=null,et(b,rt);return}if(Me.contains("rtile__session")){V=ge,ge&&$&&Re.open({attempt_id:ge,root_dir:N,meta:lt($)}),_e();return}if(Me.contains("rtile__pause")){X("worker-attempt-pause",{attempt_id:ge},N);return}if(Me.contains("rtile__resume")){Or().then(rt=>{if(rt!==null)return Ae("worker-attempt-resume",{attempt_id:ge,...rt!==""?{instructions:rt}:{}},N,ee)});return}if(Me.contains("rtile__dismiss")){ue("worker-attempt-dismiss",{attempt_id:ge},N,ee);return}if(Me.contains("rtile__discard")){if(!_(Ss(b,"unmerged")))return;Y({bead_id:b,...ge?{attempt_id:ge}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},N,ee);return}if(Me.contains("worker-mini__merge")){let rt=ie(N,b);rt?.mismatch&&rt.continuation===null?$e(N,b,ee,rt.mismatch):ue("worker-merge-queue-add",{bead_id:b},N,ee);return}if(Me.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:b},N,ee);return}if(Me.contains("worker-mini__discard")){let rt=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ss(b,rt)))return;Y({bead_id:b,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},N,ee);return}if(Me.contains("worker-mini__revise-fix")){Ae("worker-revise-fix",{bead_id:b},N,ee);return}Me.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:b},N,ee)}function L(v){let b=Lt;Lt=!1;let $=v.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest(".mon2-drawer")||$.closest("a"))return;let N=$.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(N){v.preventDefault();let y=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||N.textContent?.trim()||"";y&&xe(y);return}let ee=$.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ee){v.preventDefault();let p=ee.getAttribute("data-root-dir")||we.get($.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ee.getAttribute("title")||"";G(p);return}let ge=$.closest(".mon2-sec__toggle");if(ge){v.preventDefault(),Be(ge.getAttribute("data-root-dir")||"");return}let Me=$.closest(".mon2-area__toggle");if(Me){v.preventDefault(),Ze(Me.getAttribute("data-area")||"parallel");return}if($.closest(".mon2-newlane")){v.preventDefault(),D=[...D,{seed:null}],_e();return}if($.closest(".mon-merge-all")){v.preventDefault(),ye();return}let rt=$.closest(".mon-filter__spec");if(rt){v.preventDefault(),S={...S,spec:rt.getAttribute("data-spec")||"all"},Dd(S),_e();return}let x=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!x)return;let O=x.getAttribute("data-bead-id")||"",Oe=$.closest("button");if(Oe){v.preventDefault(),Ne(Oe,O);return}O&&!b&&(v.preventDefault(),R(O,x.getAttribute("data-root-dir")||A(O).root_dir))}function de(v){let b=v.target;if(!b||typeof b.closest!="function")return;let $=b.closest(".mon-filter__blocked");if($){S={...S,show_blocked:$.checked},Dd(S),_e();return}let N=b.closest(".mon-candidate-sort");if(N){F=Os.some(Me=>Me.value===N.value)?N.value:"repo_spec",Dh(F),_e();return}let ee=b.closest(".mon-running-sort");if(ee){w=ee.value==="repo"?"repo":"started",Bh(w),_e();return}let ge=b.closest(".mon-done-range");ge&&(h=_n(ge.value)?ge.value:an,Fh(h),_e())}function Pe(v){if(!M)return;let b=v.target;b&&typeof b.closest=="function"&&b.closest(".mon-overlap__popover, .mon-overlap__chip")||(M=null,_e())}function ut(v){v.key!=="Escape"||!M||(M=null,_e())}e.addEventListener("click",L),e.addEventListener("change",de),document.addEventListener("click",Pe),document.addEventListener("keydown",ut),e.addEventListener("dragstart",Ft),e.addEventListener("dragover",Dt),e.addEventListener("dragleave",We),e.addEventListener("drop",Vt),e.addEventListener("dragend",Xt),s&&typeof s.subscribe=="function"&&(pe=s.subscribe(()=>{try{he.clear(),_e()}catch{}}));function Et(){H!==null&&(clearInterval(H),H=null)}function yt(){gt!==null&&(clearTimeout(gt),gt=null)}return{load(){n("load"),_e(),H===null&&(H=setInterval(()=>{try{_e()}catch{}},Uh))},pause(){Et()},clear(){Et(),yt(),pe&&(pe(),pe=null),Re.destroy(),Ce?.destroy(),Ce=null,e.removeEventListener("click",L),e.removeEventListener("change",de),document.removeEventListener("click",Pe),document.removeEventListener("keydown",ut),e.removeEventListener("dragstart",Ft),e.removeEventListener("dragover",Dt),e.removeEventListener("dragleave",We),e.removeEventListener("drop",Vt),e.removeEventListener("dragend",Xt),e.replaceChildren()}}}function Gd(e,t,n){let r=It("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return w=>{w.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function _(){s&&Ye(u(),s),o&&Ye(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ye(c``,s),o&&Ye(c``,o)}}}var Vd=["bug","feature","task","epic","chore"];function Kd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Yd=["Critical","High","Medium","Low","Backlog"];function Zd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let K of Vd){let T=document.createElement("option");T.value=K,T.textContent=Kd(K),o.appendChild(T)}a.replaceChildren();for(let K=0;K<=4;K+=1){let T=document.createElement("option");T.value=String(K);let U=Yd[K]||"Medium";T.textContent=`${K} \u2013 ${U}`,a.appendChild(T)}}w();function S(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,l.disabled=q,d.disabled=q,_.disabled=q,_.textContent=q?"Creating\u2026":"Create"}function z(){u.textContent=""}function V(q){u.textContent=q}function oe(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let K=window.localStorage.getItem("beads-ui.new.priority");K&&/^\d$/.test(K)?a.value=K:a.value="2"}catch{o.value="",a.value="2"}}function M(){let q=o.value||"",K=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),K.length>0&&window.localStorage.setItem("beads-ui.new.priority",K)}async function D(){z();let q=String(s.value||"").trim();if(q.length===0){V("Title is required"),s.focus();return}let K=Number(a.value||"2");if(!(K>=0&&K<=4)){V("Priority must be 0..4"),a.focus();return}let T=String(o.value||""),U=String(l.value||""),W={title:q};T.length>0&&(W.type=T),String(K).length>0&&(W.priority=K),U.length>0&&(W.description=U),F(!0);try{await t("create-issue",W)}catch{F(!1),V("Failed to create issue");return}M(),F(!1),S()}return n.addEventListener("cancel",q=>{q.preventDefault(),S()}),h.addEventListener("click",()=>S()),d.addEventListener("click",()=>S()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),D())}),r.addEventListener("submit",q=>{q.preventDefault(),D()}),{open(){r.reset(),z(),oe();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var Hh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Gh(e,t){return La(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Qd(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Gh(r,e);return c`<button
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
  `}function Xd(e,t,n){return c`
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
  `}function Jd(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Hh.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Vh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function ep(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(H=>ce(H,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function _(){if(d)return d;let H=a.querySelector('[data-pane="execution"]');return H?(d=Zo(H,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ce=>t.queueStore?.set?.(Ce)}),d):null}function h(){return c`
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
    `}function w(){let H=r.get();return c`
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
        ${H?c`
              ${Qd(H,s(),V)}
              ${Xd(H,u,{onDraft:Ce=>{u=Ce},onAdd:oe,onRemove:M})}
              ${Jd(H,D)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function S(H){let Ce=r.get();if(Ce)try{let Re=await n("display-policy-set",{expected_revision:Ce.revision,policy:H(Ce)});F(Re),Re&&Re.conflict&&Re.policy&&(Re=await n("display-policy-set",{expected_revision:Re.policy.revision,policy:H(Re.policy)}),F(Re)),Re&&Re.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(H){H&&H.policy&&typeof H.policy=="object"&&r.set(H.policy)}function z(H){S(H)}function V(H){let Ce=r.get();if(!Ce)return;let Re=!Kh(H,Ce);z(ue=>Yh(H,ue,Re))}function oe(){let H=u.trim();H.length!==0&&(u="",z(Ce=>Ce.hidden_prefixes.includes(H)?{hidden_prefixes:Ce.hidden_prefixes}:{hidden_prefixes:[...Ce.hidden_prefixes,H]}),q())}function M(H){z(Ce=>({hidden_prefixes:Ce.hidden_prefixes.filter(Re=>Re!==H)}))}function D(H){let Ce=r.get();if(!Ce)return;let Re=Ce.chips[H]===!1;z(()=>({chips:{[H]:Re}}))}function q(){Ye(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Vh.map(H=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${H.id}
                  aria-selected=${String(i===H.id)}
                  aria-controls=${`settings-pane-${H.id}`}
                  @click=${()=>K(H.id)}
                >
                  <span class="settings-dialog__glyph">${H.glyph}</span>
                  ${H.label}
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
            ${h()} ${w()}
          </div>
        </div>
      `,a),_()}function K(H){i=H,q()}let T=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",T),a.addEventListener("cancel",T);let U=H=>{H.target===a&&pe()};a.addEventListener("click",U);let W=null;r.subscribe&&(W=r.subscribe(()=>{l&&q()}));let we=null;t.implPresetStore?.subscribe&&(we=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function he(H="execution"){l||(l=!0,t.onOpenChange?.(!0),i=H,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function pe(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:he,close:pe,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",T),a.removeEventListener("cancel",T),a.removeEventListener("click",U),W&&(W(),W=null),we&&(we(),we=null),d?.destroy(),d=null,a.remove()}}}function Kh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Yh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Zh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tp="usage-meter-card",Qh="usage-meter-layer",np=600,Xh=["token_expired","relogin_required"];function rp(e){return String(e).padStart(2,"0")}function Jh(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function sp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${rp(r.getHours())}:${rp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Zh[r.getMonth()]} ${r.getDate()} ${o}`;return`${Jh(n,t)} \xB7 ${i}`}function eb(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function op(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function ap(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var ip=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function cp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function tb(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:cp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function nb(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=tb(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?cp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function lp(e,t){return`${e}:${t}`}function up(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){Ye(c``,e),e.hidden=!0,_()}function d(){if(l===null){let ue=e.ownerDocument;l=ue.createElement("div"),l.id=Qh,l.className="usage-meter__layer",ue.body.appendChild(l)}return l}function _(){l!==null&&(Ye(c``,l),l.remove(),l=null)}function h(ue){n!==ue&&(n===null&&(document.addEventListener("mousedown",S),document.addEventListener("keydown",z),window.addEventListener("resize",F)),n=ue)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",S),document.removeEventListener("keydown",z),window.removeEventListener("resize",F))}function S(ue){let ie=ue.target;ie&&(e.contains(ie)||l!==null&&l.contains(ie))||(w(),pe())}function F(){pe()}function z(ue){ue.key==="Escape"&&(w(),pe())}function V(ue){n===ue?w():h(ue),pe()}function oe(){w(),pe()}async function M(ue,ie){if(r.has(ue.key))return;let Ae=lp(ue.key,ie);r.set(ue.key,ie),a.delete(Ae),pe();let $e=null;try{$e=await(await fetch(ue.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{$e=null}if(t)return;if(r.delete(ue.key),!$e||$e.ok!==!0){let X=$e&&typeof $e.error=="string"&&$e.error.length>0?$e.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${X}`}),pe();return}let Y=Array.isArray($e.warnings)?$e.warnings.filter(X=>typeof X=="string"&&X.length>0):[];Y.length>0&&a.set(Ae,{kind:"warn",text:Y.join(" \xB7 ")}),pe(),await Re()}function D(ue,ie,Ae,$e){let Y=ap(ue.pct),ye=`resets ${sp(ue.resetsAt,$e)}${ie?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${op(Y)}"
      style=${`--progress: ${Y}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${ue.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function q(ue,ie,Ae){let $e=ie.available&&typeof ie.ageSeconds=="number"&&ie.ageSeconds>np,Y=$e&&typeof ie.ageSeconds=="number"?`${Math.floor(ie.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",X=ie.accounts.filter(ae=>!ae.active).length,ye=`usage-meter__group${$e?" usage-meter__group--stale":""}`,me=c`<span class="usage-meter__provider"
        >${ue.label}</span
      >
      ${ie.available?ie.windows.map(ae=>D(ae,$e,Y,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${X>0?c`<span class="usage-meter__badge">+${X}</span>`:""}`;if(ie.accounts.length===0)return c`<span
        class=${ye}
        aria-label=${`${ue.label} usage`}
        >${me}</span
      >`;let Be=n===ue.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${ue.label} usage`}
      aria-expanded=${Be?"true":"false"}
      aria-controls=${tp}
      @click=${()=>V(ue.key)}
    >
      ${me}
    </button>`}function K(ue,ie){return c`<span class="usage-meter" aria-label="Usage">
      ${ue.map(Ae=>q(Ae.provider,Ae.snapshot,ie))}
    </span>`}function T(ue,ie){let Ae=ap(ue.pct),$e=sp(ue.resetsAt,ie);return c`<span
      class="usage-meter__account-window ${op(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${ue.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${$e.length>0?`\u21BB ${$e}`:""}</span
      >
    </span>`}function U(ue,ie){return Xh.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ue.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function W(ue,ie,Ae){let $e=ie.status==="ok",Y=typeof ie.ageSeconds=="number"&&ie.ageSeconds>np,X=a.get(lp(ue.key,ie.number)),ye=r.get(ue.key),me=ye!==void 0,Be=ye===ie.number,ae=["usage-meter__account"];return ie.active&&ae.push("usage-meter__account--active"),$e||ae.push("usage-meter__account--unavailable"),Y&&ae.push("usage-meter__account--stale"),c`<div class=${ae.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ie.email}
          >${ie.alias===null?ie.email:ie.alias}</span
        >
        ${ie.plan===null?"":c`<span class="usage-meter__account-tag">${ie.plan}</span>`}
        ${ie.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ie.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${eb(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${me}
              @click=${()=>{M(ue,ie.number)}}
            >
              ${Be?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${$e?c`<div class="usage-meter__account-windows">
            ${ie.windows.map(Ze=>T(Ze,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(ue,ie.status)}
          </div>`}
      ${X===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${X.kind}"
          >
            ${X.text}
          </div>`}
    </div>`}function we(ue,ie,Ae){let $e=ie.accounts.filter(Y=>Y.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ue.label} · 활성 ${$e} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(Y=>W(ue,Y,Ae))}
    </section>`}function he(ue,ie){return c`<div
      class="usage-meter__card"
      id=${tp}
      role="dialog"
      aria-label=${`${ue.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${we(ue.provider,ue.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function pe(){let ue=[];for(let $e of ip){let Y=o.get($e.key);Y&&ue.push({provider:$e,snapshot:Y})}if(ue.length===0){w(),u();return}let ie=ue.find($e=>$e.provider.key===n&&$e.snapshot.accounts.length>0);ie||w();let Ae=Date.now();Ye(K(ue,Ae),e),e.hidden=!1,ie?H(ie,Ae):_()}function H(ue,ie){let Ae=d(),$e=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${$e.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-$e.right)}px`),Ye(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${oe}
        ></div>
        ${he(ue,ie)}`,Ae)}async function Ce(ue){try{let ie=await fetch(ue.endpoint);return ie.ok?nb(await ie.json()):null}catch{return null}}async function Re(){i+=1;let ue=i,ie=await Promise.all(ip.map(async Ae=>({provider:Ae,snapshot:await Ce(Ae)})));if(!(t||ue!==i)){for(let Ae of ie)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);pe()}}return u(),Re(),s=setInterval(()=>{Re()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),u()}}}function dp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var rb="worker-ineligible";function qi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function pp(e){return qi(e).includes(rb)}var sb="worker-serial";function Fi(e){return qi(e).includes(sb)}function ji(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var ob=new Set(["done","failed","orphaned","stopped","discarded"]),ab={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},ib={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},lb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Bi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:lb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function fp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,_=null,h=null,w=null,S=new Set,F=!1,z=0,V=null,oe=new Set;function M(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function D(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function K(){if(!s)return;let A=++z;F=!0,w=null,S.clear(),Ge();try{let g=await s("worker-parallel-analysis-targets",{root_dir:q()});if(A!==z||!_e)return;let k=Array.isArray(g?.qualified)?g.qualified:[],j=Array.isArray(g?.excluded)?g.excluded:[];w={qualified:k,excluded:j};for(let ne of k)ne&&typeof ne.id=="string"&&S.add(ne.id)}catch{A===z&&_e&&(w={qualified:[],excluded:[]},ce("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{A===z&&(F=!1,_e&&Ge())}}function T(A){return Array.isArray(A.runs)?A.runs:[]}function U(){let A=M(),g=new Set;for(let k of Object.values(A.attempts||{})){let j=k;j&&typeof j.bead_id=="string"&&!ob.has(j.status)&&g.add(j.bead_id)}for(let k of Array.isArray(A.pr_wait)?A.pr_wait:[])k&&typeof k.bead_id=="string"&&g.add(k.bead_id);for(let k of Object.values(A.discard_operations||{})){let j=k;j&&j.phase!=="done"&&typeof j.bead_id=="string"&&g.add(j.bead_id)}return g}function W(A){return A.filter(g=>we(g)===null)}function we(A){let g=M();for(let k of Array.isArray(g.serial_lanes)?g.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(j=>j.bead_id===A))return k.id;return(Array.isArray(g.queue)?g.queue:[]).some(k=>k.bead_id===A)?"parallel":null}function he(A,g){let k=l.get(A);return k||[...g.order]}function pe(A){if(A.length<2)return!1;let g=we(A[0]);if(!g||g==="parallel")return!1;let k=M(),j=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(te=>te.id===g)?.entries.map(te=>te.bead_id);if(!Array.isArray(j))return!1;let ne=A.map(te=>j.indexOf(te));return ne.every(te=>te>=0)&&ne.every((te,be)=>be===0||te>ne[be-1])}function H(){let A=M(),g=Array.isArray(A.serial_lanes)?A.serial_lanes:[],k=g.find(j=>Array.isArray(j.entries)&&j.entries.length===0);return k?k.id:g[0]?.id||"s1"}function Ce(A){let g=M().bead_titles||{};return typeof g[A]=="string"?g[A]:A}async function Re(A,g){if(!s||d)return null;d=!0,Ge();try{return await s(A,g)}finally{d=!1,Ge()}}async function ue(A){r?.setPending?.(!0);try{let g=await Re("worker-parallel-analysis-start",{force:A,target_ids:Array.from(S)});g&&g.applied===!1&&g.reason&&(g.reason==="target_not_qualified"&&Array.isArray(g.detail)?ce(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${g.detail.join(", ")}`,"error",3200):ce(`\uBD84\uC11D \uC2E4\uD328: ${g.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ie(){let A=D().job;!s||!A||await s("worker-parallel-analysis-cancel",{job_id:A.job_id})}async function Ae(A){if(!(!s||oe.has(A))){oe.add(A),Ge();try{let g=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:A});if(!_e)return;if(g?.ok===!0&&typeof g.prompt=="string"){V={run_id:A,prompt:g.prompt};return}ce(g?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{oe.delete(A),Ge()}}}function $e(){V=null,Ge()}async function Y(){if(!V)return;let A=await cn(V.prompt);ce(A?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",A?"success":"error",1400)}function X(A,g){a&&a(A,Bi(g))}function ye(){return M().runner_catalog}function me(A){return Object.keys(ye()?.runners?.[A]?.models||{})}function Be(A){let g=me(A),k=ye()?.runners?.[A]?.default_model;return typeof k=="string"&&g.includes(k)?k:g[0]||""}function ae(){let A=D().settings,g=_||A.runner||"claude",k=me(g),j=_?Be(g):A.model||k[0]||"",ne=ji(ye(),g,j),te=A.effort||"",be=ne.includes(te)?te:ne[0]||"";return{runner:g,model:j,effort:be,models:k,efforts:ne}}async function Ze(A){let g=D().settings,k=await Re("worker-parallel-analysis-settings-update",{expected_revision:g.revision,runner:A.runner,model:A.model,effort:A.effort});(!k||k.applied!==!0)&&(_=null,Ge(),k&&k.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function it(A){_=A,Ge();let g=ae();Ze({runner:A,model:g.model,effort:g.effort})}function P(A){let g=ae(),k=ji(ye(),g.runner,A);Ze({runner:g.runner,model:A,effort:k.includes(g.effort)?g.effort:k[0]||""})}function fe(A){let g=ae();Ze({runner:g.runner,model:g.model,effort:A})}async function ve(A,g){if(!s||d)return;let k=he(A,g),j=D();if(k.length<2||!j.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ne=u.get(A)||H(),te=()=>({snapshot_digest:j.last_good.identity_digest,group_index:A,lane:ne,ordered_bead_ids:k,expected_revision:M().revision});d=!0,Ge();try{let be=await s("worker-parallel-analysis-submit",te());be&&be.queue&&n&&n.set(be.queue),be&&be.applied!==!0&&be.conflict===!0&&(be=await s("worker-parallel-analysis-submit",te()),be&&be.queue&&n&&n.set(be.queue)),be&&be.applied===!0?(l.delete(A),ce(`\uC9C1\uB82C \uB808\uC778 ${ne}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${be?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Ge()}}function Se(A,g,k){l.set(A,he(A,g).filter(j=>j!==k)),Ge()}function He(A){l.delete(A),Ge()}function qe(A,g,k,j){let ne=[...he(A,g)],te=ne.indexOf(k),be=te+j;te<0||be<0||be>=ne.length||(ne.splice(be,0,...ne.splice(te,1)),l.set(A,ne),Ge())}function Ve(){let A=D().settings,g=Object.keys(ye()?.runners||{}),k=ae();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${j=>it(j.target.value)}
        >
          ${g.map(j=>c`<option
                value=${j}
                ?selected=${k.runner===j}
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
          @change=${j=>P(j.target.value)}
        >
          ${k.models.map(j=>c`<option
                value=${j}
                ?selected=${k.model===j}
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
          @change=${j=>fe(j.target.value)}
        >
          ${k.efforts.map(j=>c`<option
                value=${j}
                ?selected=${k.effort===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      ${tt(A)}
    </div>`}function tt(A){return!_t(A)||$t(A)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:A.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${A.runner}/${A.model} · effort
        ${A.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:A.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function $t(A){return A.is_default===!0&&A.compatible===!1}function _t(A){return!!(A.runner&&A.model&&A.effort)}function J(A){return _t(A)&&A.compatible!==!1}function Q(A){let g=Math.max(0,Math.floor(A/1e3)),k=Math.floor(g/60),j=g%60;return`${k}:${String(j).padStart(2,"0")}`}function Le(A){let g=A.job;if(g){let k=typeof g.started_at=="number"?g.started_at:0,j=`${g.runner||"?"}/${g.model||"?"}`,ne=k?` \xB7 \uACBD\uACFC ${Q(Date.now()-k)}`:"",te=typeof g.session_id=="string"?g.session_id:"",be=T(A).find(Ee=>Ee.run_id===g.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${j} · effort ${g.effort||"?"}${ne}</span
        >
        ${te?c`<code class="pa-session-id" title=${te}
              >${te.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>X(g.job_id,be||g)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${be?.prompt_saved!==!0||oe.has(g.job_id)}
          @click=${()=>{Ae(g.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ie()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Je(A){let g=Le(A);return g===""?"":c`<div class="pa__strip">${g}</div>`}function Ie(){return r?.isPending?.()===!0}function ke(A){let g=!!A.job,k=J(A.settings),j=w!==null&&S.size===0,ne=g||d||Ie()||F;return c`<div class="pa-meta">
      ${A.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(A.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||ne||j}
        @click=${()=>{ue(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||ne||j}
        @click=${()=>{ue(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!g}
        @click=${()=>{ie()}}
      >
        취소
      </button>
    </div>`}function ze(A){return typeof A=="string"&&A.length>0?A:"\uBBF8\uBC30\uCE58"}function Qe(A,g){g?S.add(A):S.delete(A),Ge()}function st(A){let g=Array.isArray(A.scope)?A.scope:[],k=Array.isArray(A.overlaps)?A.overlaps:[];return g.length===0&&k.length===0?c``:c`<span class="pa-target__signals">
      ${g.length>0?c`<details class="pa-target__scope" title=${g.join(`
`)}>
            <summary>scope ${g.length}</summary>
            <ul>
              ${g.map(j=>c`<li><code>${j}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function nt(){let A=w?.qualified||[],g=w?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${A.length} \xB7 \uC81C\uC678 ${g.length}`}</span
        >
      </header>
      ${w&&A.length>0?c`<ul class="pa-targets__list">
            ${A.map(k=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${k.id}
                      .checked=${S.has(k.id)}
                      @change=${j=>Qe(k.id,j.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${st(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${ze(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&A.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&g.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${g.length}</summary>
            <ul class="pa-targets__list">
              ${g.map(k=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${ab[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ze(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function mt(A){let g=typeof A.session_id=="string"&&A.session_id.length>0,k=g?A.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${A.outcome}"
        >${ib[A.outcome]||A.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(A.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${A.runner||"?"} / ${A.model||"?"} / ${A.effort||"?"}</span
      >
      ${g?c`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${A.outcome==="failure"&&A.reason?c`<span class="pa-run-row__reason">${A.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>X(A.run_id,A)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${A.prompt_saved!==!0||oe.has(A.run_id)}
          @click=${()=>{Ae(A.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function xt(A){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${A.length>0?c`<ul class="pa-runs__list">
            ${A.map(g=>mt(g))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function St(){return V?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${$e}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Y()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${$e}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function kt(A,g){let k=he(A,g),j=U(),ne=k.filter(De=>j.has(De)),te=W(k),be=pe(k),Ee=Array.isArray(M().serial_lanes)?M().serial_lanes:[],et=u.get(A)||H(),dt=g.eligible!==!0||k.length<2||ne.length>0||te.length>0||be||d;return c`<section class="pa-group" data-group-index=${String(A)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${g.confidence}</span>
        ${g.categories.map(De=>c`<span class="pa-group__category">${De}</span>`)}
        ${be?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${g.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${te.length>0?c`<span class="pa-group__stale"
              >stale — ${te.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${g.reason}</p>
      <ol class="pa-group__members">
        ${k.map((De,ot)=>c`<li class="pa-member" data-bead-id=${De}>
              <span class="pa-member__seq">${ot+1}</span>
              <span class="pa-member__title">${Ce(De)}</span>
              ${j.has(De)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${De}
                ?disabled=${ot===0}
                aria-label=${`${De} \uC704\uB85C`}
                @click=${()=>qe(A,g,De,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${De}
                ?disabled=${ot===k.length-1}
                aria-label=${`${De} \uC544\uB798\uB85C`}
                @click=${()=>qe(A,g,De,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${De}
                aria-label=${`${De} \uC81C\uC678`}
                @click=${()=>Se(A,g,De)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${g.evidence.map(De=>c`<li class="pa-evidence">
              <code>${De.path}</code>
              <span class="pa-evidence__locator">${De.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>He(A)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${De=>{u.set(A,De.target.value),Ge()}}
          >
            ${Ee.map((De,ot)=>c`<option
                  value=${De.id}
                  ?selected=${et===De.id}
                >
                  직렬 ${ot+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${dt}
          @click=${()=>{ve(A,g)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ot(A){let g=Array.isArray(A.issues)?A.issues:[],k=g.filter(ne=>ne.verdict==="parallel_ok").length,j=g.filter(ne=>ne.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${j}</span>
    </div>`}function bt(){let A=_e&&!!D().job;if(A&&h===null){h=setInterval(()=>Ge(),1e3);return}!A&&h!==null&&(clearInterval(h),h=null)}function Ge(){let A=D();_&&A.settings.runner===_&&(_=null);let g=A.last_good?.result;bt(),Ye(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${xe}
            >
              ×
            </button>
          </header>
          ${Je(A)}
          <div class="pa__body">
            ${Ve()} ${ke(A)} ${nt()}
            ${g?c`${g.groups.map((k,j)=>kt(j,k))}
                ${g.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ot(g)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${xt(T(A))}
          </div>
        </div>
        ${St()}
      `,i)}let _e=!1,I=()=>{_e=!1,V=null,z+=1,bt()},Z=A=>{A.target===A.currentTarget&&xe()};i.addEventListener("close",I),i.addEventListener("cancel",I),i.addEventListener("click",Z);let re=null;n&&n.subscribe&&(re=n.subscribe(()=>{_e&&Ge()}));let R=null;r&&r.subscribe&&(R=r.subscribe(()=>{_e&&Ge()}));function G(){_e||(_e=!0,Ge(),K(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function xe(){_e&&(_e=!1,V=null,z+=1,bt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:xe,destroy(){_e=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",I),i.removeEventListener("cancel",I),i.removeEventListener("click",Z),re&&(re(),re=null),R&&(R(),R=null),i.remove()}}}function _p(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=Jo(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}function Ui(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",l=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=cb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function cb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var mp=new Set(["sh","bash","zsh","dash","ksh"]),gp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function hp(e){let t=e.split("/");return t[t.length-1]||""}function ub(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=hp(n[0]);if(r!=="env")return mp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&mp.has(hp(s))}function db(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function pb(e){let t=[],n=0;gp.lastIndex=0;for(let r of e.matchAll(gp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:db(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function fb(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function bp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function _(q,K){return K?pb(q).map(T=>T.kind==="plain"?T.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${T.kind}"
            >${T.text}</span
          >`):q}function h(){if(!s)return c``;let q=o==="ready"&&ub(a),K=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>M()}
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
              @click=${()=>M()}
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
                  ${K.map((T,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(T,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ye(h(),r)}async function S(){if(o!=="ready")return;let q=await cn(a);ce(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function F(q){q.key==="Escape"&&s&&(q.preventDefault(),M())}function z(){d||(document.addEventListener("keydown",F),d=!0)}function V(){d&&(document.removeEventListener("keydown",F),d=!1)}async function oe(q,K=null){let T=++l;z(),s={...q},u=K||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let W=t?t():"";if(!W){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let we="/api/repo-ops-script?workspace="+encodeURIComponent(W)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let he=await n(we),pe=await he.json().catch(()=>({}));if(T!==l)return;if((t?t():"")!==W){M();return}if(!he.ok||!pe||pe.ok!==!0){o="error",i=fb(pe&&typeof pe.error=="string"?pe.error:""),w();return}s={lane:pe.lane,base_sha:pe.base_sha,path:pe.path,base_ref:pe.base_ref},a=String(pe.content),o="ready",w()}catch{if(T!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function M(){l+=1,V(),s=null,a="",w();let q=u;u=null,q?.isConnected&&q.focus()}function D(){M(),r.remove()}return{open:oe,close:M,destroy:D}}function yp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let T=o();return typeof T.revision=="number"?T.revision:0}function i(T){t&&T&&T.queue&&typeof T.queue=="object"&&t.set(T.queue)}function l(){let T=o().workspace_info;return T&&typeof T=="object"?T:{}}function u(T,U){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${T}"
      >${U}</span
    >`}function d(T){if(typeof T!="number"||!Number.isFinite(T))return"";let U=T/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(T/1e3)}\uCD08`}function _(T){let U=d(T);return U?u("config",U):""}function h(T,U,W){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${we=>{s&&s({lane:T,base_sha:U.base_sha,path:W.script,base_ref:U.base_ref},we.currentTarget)}}
    ></button>`}function w(){let T=o().repo_ops_opt_out;return{verify:T?.verify===!0,deploy:T?.deploy===!0}}function S(T,U){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${W=>{oe(T,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(T){let U=typeof T.base_sha=="string"?T.base_sha:"",W=`${T.source_path||"repo-ops/config.toml"} @ ${T.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,we=w(),he=!!T.verify&&we.verify,pe=!!T.deploy&&we.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${W}</span>
      </p>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${T.verify?c`${h("verify",T,T.verify)}
              ${_(T.verify.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":T.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${T.verify?S("verify",we.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${T.deploy?c`${h("deploy",T,T.deploy)}
              ${_(T.deploy.timeout_ms)}
              ${pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":T.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${T.deploy?S("deploy",we.deploy):""}
      </div>
    </section>`}function z(T){let U=T.repo_ops&&typeof T.repo_ops=="object"?T.repo_ops:null;return U&&(U.status==="resolved"||U.status==="absent")?F(U):U&&(U.status==="pending"||U.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${U.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${U.error_code?c` — <code>${U.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(T){if(!n)return;let U=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});if(i(U),U&&U.conflict){let W=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});i(W)}r()}async function oe(T,U){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:U,expected_revision:a()});if(i(W),W&&W.conflict){let we=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:U,expected_revision:a()});i(we)}r()}let M={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function D(T,U,W){return c`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${T}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(we=>c`<li data-token=${we}>
              ${M[we]||we}
            </li>`)}
      </ul>
    </div>`}function q(T){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${T.map(U=>{let W=[M[U.trigger]||U.trigger];return Number.isInteger(U.attempts_per_operation_attempt)?W.push(`operation\uB2F9 ${U.attempts_per_operation_attempt}\uD68C`):Number.isInteger(U.attempts)?W.push(`${M[U.budget]||U.budget} ${U.attempts}\uD68C`):Number.isInteger(U.sessions_per_user_action)&&W.push(`${U.sessions_per_user_action}\uD68C`,M[U.user_actions]||U.user_actions),U.applies_when&&W.push(M[U.applies_when]||U.applies_when),c`<li data-token=${U.id}>
            <strong>${M[U.id]||U.id}</strong>
            <span>${W.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function K(){let T=o(),U=T.auto_repair!==!1,W=T.repo_operation_policy&&typeof T.repo_operation_policy=="object"?T.repo_operation_policy:null,we=Array.isArray(T.repo_operations)?T.repo_operations:[],he=we.find(Re=>Re.state==="repairing"),pe=we.filter(Re=>Re.state==="failed"||Re.state==="repairing"),H=pe.length?Math.min(...pe.map(Re=>typeof Re.repair?.remaining=="number"?Re.repair.remaining:0)):W?.auto_repair?.resolution_ladder?.find(Re=>Re.id==="auto_repair_session")?.attempts??1,Ce=Array.isArray(W?.auto_repair?.resolution_ladder)?W.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${U}
          @change=${Re=>{V(Re.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${U?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${H}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${he?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${he.repair?.owner_bead||he.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${W?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(W.worker_automatic||[]).length} · 해결 사다리
                ${Ce.length} · 금지
                ${(W.never_automatic||[]).length}</span
              >
            </summary>
            ${D("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",W.worker_automatic||[],"worker-automatic")}
            ${W.supported===!1||W.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${W.schema_version})`}
                </div>`:q(Ce)}
            ${D("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",W.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${z(l())} ${K()}
      </details>`}}}var $p=20,_b=5,mb=new Set(["failed","repairing","running","queued","retry_pending"]),vp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},wp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function gb(e,t,n=$p){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function hb(e){if(e.type==="cleanup")return!0;let t=e.operation;return mb.has(t.state)&&!t.dismissed&&!t.superseded_by}function bb(e,t,n={}){let r=gb(e,t,1/0),s=n.expanded===!0?$p:_b,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||hb(i));return{visible:a,hidden:r.length-a.length}}function kp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function yb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function xp(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Ap(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function vb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(wp,r)?wp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function wb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${zo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${kp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(vp,t.kind)?vp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Bo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${As(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${kp(e)}"
          >${yb(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Ap(od(t.failure_kind,r)):""}
      ${vb(t)}
      ${xp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Bo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function kb(e){let t=e.cleanup,n=mr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${zo(e.at)||"\u2014"}</span
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
        ${wd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Ap(Ko(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${xp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function $b(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?kb(r):wb(r))}
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
  </section>`}function Sp(e,t={}){let n=null;function r(){if(n===null){Ye(c``,e);return}let a=bb(n.operations,n.cleanup_failures,{expanded:n.expanded});Ye($b({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var xb=It("views:worker"),Ab="tab:worker:ready",Sb="tab:worker:blocked",Eb="tab:worker:in-progress",Tb="tab:worker:resolved",Cb="tab:worker:closed",sa=1,Ep=5;function Tp(e){return Eo(e).path.length>0}var Rb=new Set(["quick_fix","spec_backed","full_plan"]);function Cp(e){return typeof e=="string"&&Rb.has(e)}var Ip="beads-ui.worker.candidate-filter",Wi={show_blocked:!1,spec:"all"};function Ob(){try{let e=window.localStorage.getItem(Ip);if(!e)return{...Wi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Wi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Wi}}}function Lb(e){try{window.localStorage.setItem(Ip,JSON.stringify(e))}catch{}}function Ib(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Pb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Pp="bdui.worker.candidate_sort",Mb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],oa="spec";function Db(){try{let e=window.localStorage.getItem(Pp);return e==="board"||e==="created"||e==="spec"?e:oa}catch{return oa}}function Nb(e){try{window.localStorage.setItem(Pp,e)}catch{}}var Mp="bdui.worker.done-range";function qb(){try{let e=window.localStorage.getItem(Mp);return _n(e)?e:an}catch{return an}}function Fb(e){try{window.localStorage.setItem(Mp,e)}catch{}}var jb="(max-width: 640px)",Dp="beads-ui.worker.lane-collapsed",Ls={queue:!0,done:!0};function Bb(){try{let e=window.localStorage.getItem(Dp);if(!e)return{...Ls};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ls}:{queue:typeof t.queue=="boolean"?t.queue:Ls.queue,done:typeof t.done=="boolean"?t.done:Ls.done}}catch{return{...Ls}}}function Ub(e){try{window.localStorage.setItem(Dp,JSON.stringify(e))}catch{}}function Rp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Wb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(cr):(r.sort(Qs(n)),t==="board"?r:[...r.filter(Tp),...r.filter(s=>!Tp(s))])}function zb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Hb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Op(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Gb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Vb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Kb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Yb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Zb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function zi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Qb=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Xb=new Set(["waiting_metadata","reviewing","retrying"]);function Jb(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Wt(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ey(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ty(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=ey(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Qb.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Lp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ny(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Lp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Lp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Gb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Op(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Op(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function ry(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,_=null,h=null,w={},S=!1,F=!1,z={}){let V=!!l&&l.position>0,oe=!!l?.continuation_action&&l.continuation_action.continuation===null,M=!!l&&l.active===!0,D=l&&l.failure||null,q=Kb(l?l.waiting:null,h),K=n[e]||null,T=K&&K.gate?K.gate:null,U=K&&K.pr?K.pr:null,W=Yb(l?l.resolution:null),we=Zb(l?l.head_review:null),he=l&&l.head_review||null,pe=Jb(h,he),H=ty(h,pe),Ce=l&&l.authority||null,Re=!!he&&["pending","reviewing","revising"].includes(he.state),ue=!!h&&typeof h=="object"&&Xb.has(h.phase),ie=V&&!M&&(he?.state==="failed"||!Ce||ue||Ce.source==="automatic"&&!F),Ae=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":W?W.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,$e=!!T&&T.base_badge==="\uCDA9\uB3CC",Y=!!T&&T.enabled===!0,X=Rs({bead_id:e,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:z.repo_operations}),ye=na(X),me=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!T&&T.tier==="merged",Be=i&&!!r&&!!T&&T.tier==="merged",ae=ie&&(Y||$e||T?.reason==="base_behind"||T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"||me||Be),Ze=i&&$e&&u===!1,it=xn(w,e,{external:i,merge_active:M||X?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:ye,merged:!!r||T?.tier==="merged"}),P=!!it.operation,fe=!me&&!!r&&r.step==="repo_operations",ve=ny({continuation_required:oe,merge_step:X,conflict_badge:Ae,conflict_live:W?.live===!0||a==="running",head_review:he&&we?{...we,state:he.state,failure_reason:he.failure_reason}:null,auto_resolution:pe,recovery:H,cleanup_failed:r,cleanup_label:r?mr(r.step):null,base_exception:_,conflicting:$e,gate:T,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:D,auto_skip:d,queued:V,queue_active:M,queue_position:l?l.position:0,activity:Ae?null:o&&o.activity||null}),Se=ve?.live===!0&&ve.title?c`<span title=${ve.title}>${ve.label}</span>`:ve?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&X?.active!==!0?ta(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:S,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:ve?.live!==!0&&ve?.title?ve.label:null,completion_title:ve?.title||"",completion_repair_pr_url:H?H.repair_pr_url:"",completion_repair_pr_number:H?H.repair_pr_number:null,badges:Se?[Se]:[],live_badge:ve?.live===!0?Se:null,usage:s,alert:ve?.alert===!0,merge_action:T?.tier==="merged"&&!me&&!Be||fe?!1:!V||oe||ie,timeline_action:fe,cancel_action:V&&!oe,cancel_enabled:(!M||Re)&&!(H&&H.lock_actions),cancel_title:H&&H.lock_actions?`${H.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:it,discard_action:it.action,merge_step:X,discard_enabled:it.enabled,discard_title:it.title,merge_enabled:!X&&!a&&!P&&!_&&!(H&&H.lock_actions)&&!Ze&&!fe&&(Y||$e||T?.reason==="base_behind"||T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"||me||Be||ae||ue&&!M),merge_label:oe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":me||Be?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!X&&!me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":T?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":T?.reason==="review_receipt_missing"||T?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ie?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:P?it.error?`\uD3D0\uAE30 \uC2E4\uD328: ${it.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${it.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:oe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":X?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${X.label}`:Be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Y?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,openDoc:d,doneRange:_,onDoneRangeChange:h}=t,w=r?Js(r,i):null,S=ro({transport:n,uiOrderStore:i}),F=null,z=[],V=Ob(),oe=null,M=null,D={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},q=Db(),K=_n(_)?_:qb(),T=new Map;function U(){let p=Wn.find(y=>y.value===K);return p?p.label:"\uC624\uB298"}let W=Bb(),we=!1,he=new Set,pe=new Set,H=new Set,Ce=new Set,Re=new Set,ue={},ie=null,Ae=0,$e=null,Y=[];function X(p){return ie===p?ue:{}}async function ye(){if(!n)return;let p=u?.()||"";if(ie===p||$e&&$e.key===p&&$e.generation===Ae)return;let y=++Ae;$e={key:p,generation:y};let f=null;try{f=await Promise.resolve(n("get-session-defaults",{}))}catch(C){if(y!==Ae)return;$e=null,xb("get-session-defaults failed: %o",C),We();return}y===Ae&&(ue=f&&typeof f.values=="object"&&f.values!==null?{...f.values}:{},ie=p,$e=null,We())}function me(){ie=null,Ae+=1,ye()}let Be=document.createElement("div");Be.className="worker-console";let ae=document.createElement("div");ae.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let P=document.createElement("div");P.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Ze.append(it,P,fe);let ve=document.createElement("div");ve.className="worker-lanes-host",Be.append(ae,Ze,ve),e.appendChild(Be);let Se=null,He=null,qe=Mr(P,{transport:n,sessionLogStore:a,onClose:()=>{Se=null,He=null,Ze.hidden=!0,We()}}),Ve=Sp(fe,{onClose:()=>{fe.hidden=!0,Ze.hidden=!0,We()}}),tt=bp({getWorkspacePath:u||(()=>"")}),$t=u&&u()||"",_t=yp({queueStore:s,transport:n,onChanged:()=>We(),onOpenScript:(p,y)=>{tt.open(p,y)}}),J=o?fp(Be,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(p,y)=>Me(p,y)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:sa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Le(){let p=Q(),y=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,f=Array.isArray(p.serial_lanes)?p.serial_lanes:[],C=[];for(let le of f){if(C.length>=y)break;!le||typeof le.id!="string"||!/^s[1-5]$/.test(le.id)||!Array.isArray(le.entries)||C.push({id:le.id,label:`\uC9C1\uB82C ${le.id.slice(1)}`,count:le.entries.length})}return C.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...C]}function Je(p){if(!oe||!p.some(f=>f.id===oe))return null;let y=Le();return y?{bead_id:oe,lanes:y}:null}function Ie(){let p=Q();return typeof p.revision=="number"?p.revision:0}function ke(p){p&&p.queue&&s&&s.set(p.queue)}function ze(){let p=Q().queue;return Array.isArray(p)?p.length:0}async function Qe(p,y,f){if(!n)return;let C=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},...f===void 0?{}:{index:f},expected_revision:Ie()}),E=await n("worker-queue-place",C());ke(E),E&&E.conflict&&await n("worker-queue-place",C()).then(ke)}async function st(p,y,f){if(!n)return;let C=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:f,expected_revision:Ie()}),E=await n("worker-queue-reorder",C());ke(E),E&&E.conflict&&await n("worker-queue-reorder",C()).then(ke)}async function nt(p){if(!n)return;let y=await n("worker-queue-remove",{bead_id:p,expected_revision:Ie()});ke(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Ie()}).then(ke)}async function mt(p){if(!n||!p)return;let y=await n("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function xt(p){if(!n||!p)return;let y=await Or();if(y===null)return;let f=async(E={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Ie(),...y!==""?{instructions:y}:{},...E}),C=await f();ke(C),C&&C.conflict&&(C=await f(),ke(C)),C=await Ln(C,(E,le)=>f({continuation:E,decision_token:le}),{onResult:ke,refresh:()=>f()}),C&&C.resumed===!1&&!C.conflict&&C.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}async function St(p){if(!n||!p)return;let y=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ie()});ke(y),y&&y.conflict&&(y=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ie()}),ke(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function kt(p,y,f=!0){if(!n)return null;let C=n,E=await C(p,{...y,expected_revision:Ie()});return ke(E),E&&E.conflict&&f&&(E=await C(p,{...y,expected_revision:Ie()}),ke(E)),E}async function Ot(p){if(!n||!p)return;let y=Q().merge_queue?.find(C=>C.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Ge(p,y.mismatch);return}he.add(p),We();let f;try{f=await kt("worker-merge-queue-add",{bead_id:p})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{he.delete(p),We()}if(!(!f||f.applied)){if(f.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(Vb(f.reason),"error",2400)}}async function bt(p){if(!(!n||!p||pe.has(p))){pe.add(p),We();try{let y=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Ie()});ke(y),y&&!y.retried&&!y.conflict&&y.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{pe.delete(p),We()}}}async function Ge(p,y){let f=await Ln({continuation_mismatch:y},(E,le)=>kt("worker-merge-queue-add",{bead_id:p,continuation:E,decision_token:le},!1)),C=f?.queue?.merge_queue?.find(E=>E.bead_id===p)?.continuation_action;if(f?.applied!==!0&&C?.continuation===null&&C.mismatch){await Ge(p,C.mismatch);return}f&&f.applied===!1&&!f.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function _e(p){if(!n)return;let y=await kt("worker-merge-auto-toggle",{on:p});!y||y.conflict||ce(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function I(p){if(!n||!p)return;let y=await kt("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await kt("worker-merge-queue-remove",{all:!0})}async function re(p,y=null,f="unmerged",C=null){if(!n||!p)return;let E=Ss(p,f);if(!(!!C||typeof globalThis.confirm!="function"||globalThis.confirm(E)))return;let Te=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...C?{operation_id:C}:{},expected_revision:Ie()});if(ke(Te),Te&&Te.conflict&&(Te=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...C?{operation_id:C}:{},expected_revision:Ie()}),ke(Te)),Te&&Te.discarded===!0){ce(Ho(Te),"success",5e3);return}if(Te&&Te.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${Te.reason}`,"error",2800);return}if(Te&&Te.accepted&&Te.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Te&&Te.accepted&&!Te.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${Te.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Te&&!Te.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function R(p,y,f){if(!(!n||!y||!f||Ce.has(y))){Ce.add(y),We();try{let C=await n(p,{bead_id:y,action_id:f,expected_revision:Ie()});ke(C),C?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!C?.ok&&C?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(C.reason)}`,"error",2800)}finally{Ce.delete(y),We()}}}async function G(p,y){if(!n||!y||H.has(y))return;H.add(y),We();let f;try{let C=async(E={})=>await n(p,{bead_id:y,expected_revision:Ie(),...E});f=await C(),ke(f),f&&f.conflict&&(f=await n(p,{bead_id:y,expected_revision:Ie()}),ke(f)),p==="worker-revise-fix"&&(f=await Ln(f,(E,le)=>C({continuation:E,decision_token:le}),{onResult:ke,refresh:()=>C()}))}finally{H.delete(y),We()}if(!(!f||f.conflict)){if(f.ok){ce(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${f.reason||""}`,"error",3e3)}}async function xe(p){if(!n)return;let y=await n("worker-automation-toggle",{on:p,expected_revision:Ie()});ke(y),y&&y.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Ie()}).then(ke)}async function A(p){if(!n||!p)return;let y=await n("worker-repo-operation-repair",{operation_id:p});if(ke(y),y&&y.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function g(p){if(!n||!p)return;let y=await n("worker-repo-operation-dismiss",{operation_id:p});ke(y),y&&y.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function k(p){if(!n||!Number.isFinite(p))return;let y=Math.max(sa,Math.floor(p)),f=await n("worker-queue-set-slots",{slots:y,expected_revision:Ie()});ke(f),f&&f.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Ie()}).then(ke)}async function j(p){if(!n||!Number.isInteger(p)||p<1||p>Ep)return;let y=Q(),f=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((le,Te)=>le+(Array.isArray(Te?.entries)?Te.entries.length:0),0),C=()=>({count:p,expected_revision:Ie()}),E=await n("worker-queue-set-serial-lane-count",C());ke(E),E&&E.conflict&&(E=await n("worker-queue-set-serial-lane-count",C()),ke(E)),E&&E.applied&&f>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${f}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let ne="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function te(p,y){let f=Ui(p,y.id,D);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:f.kind==="note"?{kind:"note",text:f.text}:f.kind==="disabled"?{kind:"disabled",label:ne,title:f.title}:{kind:"place",label:ne,title:f.title}}}function be(p,y){if(!M||M.bead_id!==p)return null;let f=M.counterpart_id,C=y.filter(E=>E.id===f);return C.length===0?null:{rows:C.map(E=>te(p,E))}}async function Ee(p,y){let f=Ui(p,y,D);if(M=null,f.kind!=="ops"){We();return}let C=Ie();for(let E of f.ops){let le=await et(E,C);if(le===null)break;C=le}We()}async function et(p,y){if(!n)return null;try{let f=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:y});if(ke(f),f&&f.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!f||f.applied!==!0)return ce(f&&typeof f.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${f.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let C=f.queue?f.queue.revision:void 0;return typeof C!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):C}catch(f){return ce(f instanceof Error&&f.message?f.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function dt(){let p=Q(),y=w?w.selectBoardColumn(Ab,"ready"):[],f=w?w.selectBoardColumn(Sb,"blocked"):[],C=w?w.selectBoardColumn(Cb,"closed"):[],E=w?w.selectBoardColumn(Eb,"in_progress"):[],le=w?w.selectBoardColumn(Tb,"resolved"):[],Te=to([...y,...f,...E,...le,...C]),Ue=new Map;for(let m of[...y,...f,...E])m&&m.id&&!Ue.has(m.id)&&Ue.set(m.id,m);let Xe={...X(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=p[m];typeof B=="string"&&(Xe[m]=B)}function Ke(m,B){let se=Ue.get(m);if(!se)return null;let je=se.metadata&&typeof se.metadata=="object"?se.metadata:{},at=se.workflow?.route,Tt=je.route,Pt=Cp(at)?at:Cp(Tt)?Tt:null;return nn({pin:je,global:Xe,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Pt,controller_runtime:B})}function vt(m){let B=m.runner||null,se=Ke(m.bead_id,B),je=Es(m),at=se?Qn(se,B):null;return je||at?{orchestration:je,worker:at}:null}let sn=new Map;function Hr(m){if(sn.has(m))return sn.get(m)??null;let B=Ke(m,null),se=null;if(B){let je=$n(p.runner_catalog??null,B.orchestration_model.value??""),at=je===null?B:Ke(m,je),Tt=_r(at,p.runner_catalog??null),Pt=Qn(at,je);se=Tt||Pt?{orchestration:Tt,worker:Pt}:null}return sn.set(m,se),se}function gr(m){let B=no(Te,m);return B.total===0?null:B}let Yi=p.bead_titles||{},Jt=new Map;for(let[m,B]of Object.entries(Yi))typeof B=="string"&&B.length>0&&Jt.set(m,B);for(let m of[...y,...f])Jt.set(m.id,m.title||m.id);let Gr=new Map;for(let m of[...y,...f,...E,...le,...C])m&&m.id&&typeof m.from_id=="string"&&Gr.set(m.id,m.from_id);let Sn=new Map;for(let m of[...y,...f,...E,...le,...C])m&&m.id&&typeof m.priority=="number"&&Sn.set(m.id,m.priority);let Is=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},er=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},jn=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},Bn=new Map;for(let[m,B]of Object.entries(er))Array.isArray(B)&&Bn.set(m,Fi(B));for(let m of[...y,...f]){let B=m.labels;Array.isArray(B)&&!Bn.has(m.id)&&Bn.set(m.id,Fi(B))}let hr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(Vr)?Vr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let B=m.members.map(je=>{let at=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Tt=>Tt.entries.some(Pt=>Pt.bead_id===je));return at?at.id:null});if(!(B.every(je=>je!==null)&&new Set(B).size===1))for(let je of m.members)hr.set(je,m.members.filter(at=>at!==je))}let Ps=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},br=new Map;for(let[m,B]of Object.entries(Is))B&&typeof B=="object"&&br.set(m,B);for(let m of[...y,...f])br.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let tr=m=>br.get(m)||{},Un=p.pr_wait||[],Kr=p.pr_observations||{},Fe=p.pr_activity||{},pt=p.cleanup_failed||{},on=Object.entries(pt).map(([m,B])=>({bead_id:m,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),aa=p.queue||[],Yp=new Set([...aa.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(B=>B.bead_id)),...Un.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),Zp=new Set(f.map(m=>m.id)),Qp=i?i.get()?.order||{}:{},Zi=new Set,Qi=[];for(let m of[...y,...f])Yp.has(m.id)||Zi.has(m.id)||zb(m)||(Zi.add(m.id),Qi.push(m));z=Wb(Qi,q,Qp);let Xp=p.admission||{},Xi=m=>{let B=Xp[m];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof B.reason=="string"?B.reason:"",je=se.indexOf(":");return je>0&&je<se.length-1?`\u26D4 ${se.slice(0,je)} (${se.slice(je+1)})`:`\u26D4 ${se}`},Jp=z.map(m=>{let B=Eo(m),se=B.path.length>0,je=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",at=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,Tt=Object.hasOwn(m,"labels")&&pp(m.labels),Pt=!Tt&&(je?at:se&&!B.conflict),ht=Zp.has(m.id),en=[];ht&&en.push(Hb(m)),je&&!at?en.push("missing_description"):!je&&B.conflict?en.push("spec_id_conflict"):!je&&!se&&en.push("spec \uC5C6\uC74C");let Us=Xi(m.id);return Us&&en.push(Us),{id:m.id,title:m.title||m.id,reason:en.join(" \xB7 "),draggable:Pt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:je,status:m.status,worker_ineligible:Tt,blocked:ht,has_spec:se,exec_chips:Hr(m.id),from_id:m.from_id||void 0,priority:Sn.get(m.id)}}),ia=Ib(Jp,V),la=ia.visible,ef=p.revise_parked||{},Ms=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ca=(m,B)=>m.map((se,je)=>{let at=B!=="done",Tt=B!=="done"&&B!=="queue",Pt=at?ef[se.bead_id]:null,ht=at?xn(Ms,se.bead_id):null,en=ht?.operation?ht:null,Us=at&&Bn.get(se.bead_id)===!0,Tl=Ps[se.bead_id]||[],ba=p.admission&&typeof p.admission=="object"?p.admission[se.bead_id]:null,ya=at?ed(ba,!!en||Ce.has(se.bead_id)):null,df=at&&!ya?Xi(se.bead_id):null,pf=at?[df]:[],Cl=at&&Tl.length>0&&typeof ba?.reason=="string"&&ba.reason.startsWith("not_ready")?[`\u23F8 ${Tl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],va=at?hr.get(se.bead_id):void 0;return va&&va.length>0&&Cl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${va.join(", ")}\uC640`),{id:se.bead_id,title:Jt.get(se.bead_id)||se.bead_id,reason:pf.filter(Boolean).join(" \xB7 "),draggable:at&&!en&&!ya,done:B==="done",lane:B,seq:Tt?je+1:void 0,worker_serial:Us,discard:en,stale_work:ya,badges:[...Cl,...Pt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...B==="done"?Uo(p.attempts||{},se.bead_id):[]],alert:!!Pt,revise_action:!!Pt,revise_enabled:!!Pt&&!en&&!H.has(se.bead_id),revise_title:Pt?Pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?mn(p.attempts||{},se.bead_id):null,work_ms:B==="done"?Wo(p.attempts||{},se.bead_id):null,done_at:B==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:at?Hr(se.bead_id):null,workflow:at&&jn[se.bead_id]||null,from_id:Gr.get(se.bead_id)||void 0,priority:Sn.get(se.bead_id),...tr(se.bead_id)}}),yr=p.attempts?Object.values(p.attempts).filter(Ur):[],ua=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&ua.add(m.resumed_from);let Ji=new Map;for(let m of yr)Ji.set(m.bead_id,m.attempt_id);let Yr=new Map;for(let m of yr)Yr.set(m.attempt_id,m);function da(m){let B=new Set,se=m;for(;se&&!B.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;B.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Yr.get(se.resumed_from)||null}return!1}let Ds=typeof p.declared_base=="string"?p.declared_base:null;function tf(m){let B=null;for(let se of yr)!se||se.bead_id!==m||da(se)||(B===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=se);return B&&typeof B.target_base=="string"?B.target_base:null}let pa=[],Ns=[],nf=dp(p),el=m=>{let B=typeof m.session_id=="string"&&m.session_id.length>0,se=ua.has(m.attempt_id);return{eligible:B&&!se,reason:B?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},bn=null;for(let m of yr){let B=m.status==="paused"&&!ua.has(m.attempt_id);if(m.status==="running"||B)Ns.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Jt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:B,conflict_resolution:da(m),base_exception:zi(Ds,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:xn(Ms,m.bead_id,{attempt_id:m.attempt_id}),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:mn(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:vt(m),...tr(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&nf(m)){let se=el(m);pa.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Jt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:xn(Ms,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:da(m),base_exception:zi(Ds,m.target_base),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:mn(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:vt(m),...tr(m.bead_id)}),bn=m}}let tl=new Set([...pa,...Ns].map(m=>m.bead_id));for(let m of Array.isArray(p.session_active)?p.session_active:[]){let B=m&&m.bead_id;typeof B!="string"||B.length===0||tl.has(B)||(tl.add(B),Ns.push({bead_id:B,attempt_id:null,kind:"session",title:m.title||Jt.get(B)||B,status:"in_progress",started_at:En(m.started_at)??En(m.updated_at),updated_at:En(m.updated_at),workflow:m.workflow||null,priority:Sn.get(B),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[...pa,...Ns].map(m=>{let B=Yr.get(m.attempt_id),se=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!se||typeof se!="object")return m;let je=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,at=Rs({bead_id:B.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:je?{step:se.cursor,reason:je}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return at?{...m,landing:at}:m}),nl=null;if(bn){let m=el(bn),B=bn.cause_detail;nl={bead_id:bn.bead_id,repo:bn.repo||"",reason:bn.cause||bn.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:bn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:xn(Ms,bn.bead_id,{attempt_id:bn.attempt_id})}}let rl=new Set(vr.map(m=>m.bead_id)),fa=Array.isArray(p.merge_queue)?p.merge_queue:[],sl=new Map,ol=new Map,al=new Map,il=new Map,ll=new Map;fa.forEach((m,B)=>{m&&typeof m.bead_id=="string"&&(sl.set(m.bead_id,B+1),ol.set(m.bead_id,m.resolution),al.set(m.bead_id,m.continuation_action||null),il.set(m.bead_id,m.head_review||null),ll.set(m.bead_id,m.authority||null))});let wr=p.merge_queue_state||{active:null,failures:{}},rf=wr.failures||{},cl=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,sf=p.auto_merge_skips||{},ul=m=>{let B=sf[m];if(!B)return null;let se=Kr[m],je=se&&se.pr?se.pr.head_sha:null;return je&&je===B.head_sha?B.reason||"":null},qs=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?qs.has(m.bead_id)||qs.set(m.bead_id,"paused"):qs.set(m.bead_id,"running"));let dl=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,pl=(p.workspace_info||{}).slots,fl=typeof pl=="number"?pl:typeof p.slots=="number"?p.slots:sa,of=dl>fl,Fs=ir(K),af=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>Fs===void 0||typeof m.added_at!="number"||m.added_at>=Fs).sort((m,B)=>(B.added_at||0)-(m.added_at||0)),Zr=ca(af,"done"),lf=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),_l=[],cf=u?.()||"";for(let m of C){let B=En(m.closed_at);if(typeof m.id!="string"||lf.has(m.id)||B===null||Fs!==void 0&&B<Fs||typeof m.comment_count!="number"||m.comment_count<=0)continue;let se=`${cf}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,je=T.get(se);je===void 0&&n&&(T.set(se,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(at=>{let Tt=Array.isArray(at)&&at.some(Pt=>To(typeof Pt?.text=="string"?Pt.text:"")?.lane==="session");T.set(se,Tt?"session":"not-session"),We()}).catch(()=>{T.set(se,"failed"),We()})),je==="session"&&_l.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:m.created_at,updated_at:m.updated_at})}Zr.push(..._l),Zr.sort((m,B)=>(B.done_at||0)-(m.done_at||0));let js={};for(let m of In)js[m]=0;let ml=!1,gl=0,_a=0,hl=0;for(let m of Zr){let B=m.usage;if(B&&typeof B=="object"){let se=!1;for(let je of In)Number.isFinite(B[je])&&(js[je]+=B[je],ml=!0,se=!0);se&&(_a+=1,Number.isFinite(B.total_cost_usd)&&(gl+=B.total_cost_usd,hl+=1))}}_a>0&&hl===_a&&(js.total_cost_usd=gl);let bl=Zr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),uf=bl.length>0?zt(fo(bl)):ml?Pn(js):null,yl=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},vl=Array.isArray(p.serial_lanes)?p.serial_lanes:[],wl=m=>{if(Un.some(je=>je.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=yr.filter(je=>je&&je.bead_id===m),se=B.length>0?B[B.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Bs=vl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,B)=>{let se=yl[m.id]||{},je=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter(ht=>ht&&typeof ht.bead_id=="string"&&typeof ht.after=="string").map(ht=>[ht.bead_id,ht.after])),at=ca(m.entries.filter(ht=>!rl.has(ht.bead_id)),m.id).map(ht=>je.has(ht.id)?{...ht,badges:[`\u{1F517} ${je.get(ht.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ht.badges]}:ht),Tt=Array.isArray(se.occupied_by)?se.occupied_by.filter(ht=>typeof ht=="string"):[],Pt=Tt.map(ht=>({id:ht,title:Jt.get(ht)||ht,draggable:!1,lane:m.id,ghost:!0,badges:[wl(ht)]}));return{id:m.id,index:B+1,rows:[...Pt,...at],occupied:Tt.length>0,badge:Tt.length>0?wl(Tt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),kl=typeof p.serial_lane_count=="number"?p.serial_lane_count:Bs.length,ma=ca(aa.filter(m=>!rl.has(m.bead_id)),"queue"),$l=new Map,xl=new Set;for(let[m,B]of Object.entries(yl)){if(!/^s[1-5]$/.test(m))continue;let se=B&&Array.isArray(B.occupied_by)?B.occupied_by:[];for(let je of se)typeof je=="string"&&$l.set(je,m);se.length>0&&xl.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:Jt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:$l.get(m.bead_id)??null});for(let m of Bs)for(let B of m.rows)B.ghost!==!0&&kr.push({id:B.id,title:B.title,location_label:`${m.id} #${B.seq??""}`.trim(),kind:"serial",lane_id:m.id});ma.forEach((m,B)=>{kr.push({id:m.id,title:m.title,location_label:`#${B+1}`,kind:"parallel",lane_id:null})});for(let m of la)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Al={};for(let m of vl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(Al[m.id]=m.entries.length);let ga=new Map;for(let m of kr)ga.has(m.id)||ga.set(m.id,m);D={members_by_id:ga,serial_raw_lengths:Al,serial_lane_count:kl,occupied_lanes:xl};let Sl=_p(p.bead_scope,kr),ha=(m,B)=>{let se=Sl.get(m.id);if(!se||se.overlaps.length===0&&!se.scope_missing)return m;let je=be(m.id,se.overlaps);return m.dependency_chips={...m.dependency_chips||{},...se.overlaps.length>0?{overlaps:se.overlaps}:{},...se.scope_missing&&B!=="running"?{scope_missing:!0}:{},...je?{popover:je}:{}},m};for(let m of ma)ha(m,"queue");for(let m of Bs)for(let B of m.rows)B.ghost!==!0&&ha(B,m.id);for(let m of la)ha(m,"candidate");let El=new Map;for(let m of vr){let B=typeof m.bead_id=="string"?m.bead_id:"";if(B.length===0)continue;let se=m.kind==="session",je=Sl.get(B),at=je&&je.overlaps.length>0?je.overlaps:null,Tt=typeof m.attempt_id=="string"&&m.attempt_id.length>0?Yr.get(m.attempt_id):void 0,Pt=Tt&&Tt.last_activity&&typeof Tt.last_activity=="object"?Tt.last_activity:null,ht=Tt&&Array.isArray(Tt.legs)?Tt.legs:[];if(!at&&!Pt&&ht.length===0&&!se)continue;let en=at?be(B,at):null;El.set(B,{...Pt?{last_activity:Pt}:{},...ht.length>0?{legs:ht}:{},...at?{dependency_chips:{overlaps:at,...en?{popover:en}:{}}}:{}})}return{queue:p,idToTitle:Jt,candidates:la,candidate_hidden:{blocked:ia.hidden_blocked,spec:ia.hidden_spec},running:vr,live_count:dl,slots:fl,over_cap:of,failure:nl,waiting:ma,serial_lanes:Bs,serial_lane_count:kl,running_overlays:El,pr_wait:Un.map(m=>ry(m.bead_id,Jt.get(m.bead_id)||m.bead_id,Kr,pt[m.bead_id]||null,mn(p.attempts||{},m.bead_id),Fe[m.bead_id]||(he.has(m.bead_id)||pe.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),qs.get(m.bead_id)||null,m.external===!0,{position:sl.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:rf[m.bead_id]||null,waiting:cl?.bead_id===m.bead_id?cl.reason:null,resolution:ol.get(m.bead_id),continuation_action:al.get(m.bead_id),head_review:il.get(m.bead_id)||null,authority:ll.get(m.bead_id)||null},m.wt_present!==!1,p.auto_merge===!0?ul(m.bead_id):null,zi(Ds,tf(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Yr.get(Ji.get(m.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(m=>({...m,workflow:jn[m.id]||null,priority:Sn.get(m.id),...tr(m.id)})),merge_queue_length:fa.length,merge_queue_running:fa.length>0,auto_excluded:Un.map(m=>m.bead_id).filter(m=>ul(m)!==null),declared_base:Ds,done:Zr,token_total:uf,cleanup_failures:on,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function De(){let y=!!o?.get()?.job,f=!y&&o?.isPending?.()===!0,C=y?"\uBD84\uC11D \uC911":f?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${C?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${C?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${C?c`<span class="worker-analysis-btn__badge">${C}</span>`:""}
    </button>`}function ot(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",f=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,C=Gt(p),E=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",le=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${p.done.length}</b></span
      >`,Te=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Ue=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${sa}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ep},(vt,sn)=>sn+1).map(vt=>c`<option
                value=${String(vt)}
                ?selected=${p.serial_lane_count===vt}
              >
                ${vt}
              </option>`)}
        </select>
      </label>
      ${o?De():""} `,Xe=id({failure:p.failure}),Ke=Ju(p.repo_operations,p.cleanup_failures);return we?c`<div class="worker-ribbon">
          ${f} ${C}
          <div class="worker-kpi worker-kpi--ribbon">${E}${le}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ue}</div>
          <div class="worker-kpi">${Te}</div>
        </div>
        ${Ke}${_t.template()}${Xe}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${f}${C}${Ue}</div>
        <div class="worker-kpi">
          ${E}${le}${Te}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(vt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${vt.tooltip}
                >${U()} 완료 · 누적 ${vt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Ke}${_t.template()}${Xe}`}function Lt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0);return c`<section
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
      ${p.running.length>0?Ai(p.running,Date.now(),Se,p.running_overlays):""}
      ${p.pr_wait.map(f=>Kn(f))}
    </section>`}function gt(p){let y=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${V.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Pb.map(f=>c`<button
              type="button"
              class="worker-filter__chip${V.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${V.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function pn(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${q}
    >
      ${Mb.map(p=>c`<option value=${p.value} ?selected=${q===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Bt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${K}
      >
        ${Wn.map(p=>c`<option value=${p.value} ?selected=${K===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function qt(p){let y=c`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,f=p.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return hn({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:f})}function Gt(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let f=new Set(p.auto_excluded),C=p.pr_wait.filter(E=>E.merge_action&&E.merge_enabled&&!f.has(E.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${C>0?` ${C}`:""}
    </button>`}function Ft(p){let y=hn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:pn(),controls:gt(p),place_menu:Je(p.candidates),onOpenDoc:d?(f,C)=>d(C):void 0});return we?c`<div class="worker-lanes worker-lanes--mobile">
        ${Lt(p)}
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:W.queue,preview:Rp(p.waiting)})}
        ${p.serial_lanes.map(f=>qt(f))}
        ${y}
        ${hn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Bt(),collapsible:!0,collapsed:W.done,preview:Array.isArray(p.token_total)?p.token_total.map(f=>f.label).join(" \xB7 "):p.token_total||Rp(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(f=>qt(f))}
      </div>
      ${hn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0),body:Ai(p.running,Date.now(),Se,p.running_overlays)})}
      ${hn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${hn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${p.done.length}`,items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Bt()})}
    </div>`}function Dt(p){W={...W,[p]:!W[p]},Ub(W),We()}function We(){let p=dt();Ye(ot(p),ae),Ye(Ft(p),ve)}function Xt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(jb);we=!!p.matches;let y=f=>{let C=!!(f&&typeof f.matches=="boolean"?f.matches:p.matches);C!==we&&(we=C,We())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),Y.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),Y.push(()=>p.removeListener(y)))}let Vt=null;function lt(p){Vt=p.target instanceof Element?p.target:null}function Ne(p){let f=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;if(Vt&&f.contains(Vt)&&Vt.closest("input, button, a")){p.preventDefault();return}let C=f.dataset.beadId||"",E=f.dataset.lane||"";F={bead_id:C,from_lane:E};try{p.dataTransfer?.setData("text/plain",C),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function L(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let f=y.dataset.lane||"";f!=="candidate"&&f!=="queue"&&!/^s[1-5]$/.test(f)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function de(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Pe(p,y){let f=z.find(Te=>Te.id===p);if(!f)return;let C=z.filter(Te=>Te.id!==p),E=C.length;if(y){let Te=y.dataset.beadId;if(Te===p)return;let Ue=C.findIndex(Xe=>Xe.id===Te);Ue>=0&&(E=Ue)}let le=C.slice();le.splice(E,0,f),S.applyReorder(p,le,E)}function ut(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let f=y.dataset.lane||"",C=F?.bead_id||p.dataTransfer?.getData("text/plain")||"",E=F?.from_lane||"";if(F=null,!C)return;let le=p.target?.closest?.(".worker-mini, .worker-card"),Te=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),Ue=Te.length;if(le){let Xe=Te.indexOf(le);Xe>=0&&(Ue=Xe)}if(Ue=Math.max(0,Ue-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(Ue=ze()),f==="candidate"){if(E==="candidate"){Pe(C,le);return}(E==="queue"||/^s[1-5]$/.test(E))&&nt(C);return}if(f==="queue"||/^s[1-5]$/.test(f)){let Xe=f==="queue"?"parallel":f;E===f?st(C,Xe,Ue):Qe(C,Xe)}}function Et(p){V=p,Lb(p),We()}function yt(p){q=p==="board"||p==="created"||p==="spec"?p:oa,Nb(q),We()}function v(p){K=_n(p)?p:an,Fb(K),h?.(K),We()}function b(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let Ue=Number.parseInt(y.value,10);Number.isFinite(Ue)&&j(Ue).then(We);return}let f=p.target?.closest?.(".worker-filter__blocked");if(f){Et({...V,show_blocked:f.checked});return}let C=p.target?.closest?.(".worker-done-range");if(C){v(C.value);return}let E=p.target?.closest?.(".worker-sort");if(E){yt(E.value||oa);return}let le=p.target?.closest?.(".worker-slots__input");if(!le)return;let Te=Number.parseInt(le.value,10);if(!Number.isFinite(Te)){We();return}k(Te).then(We)}function $(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function N(){let p=dt();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function ee(){Se&&qe.close(),fe.hidden=!1,Ze.hidden=!1,Ve.open(N()),We()}function ge(p){let y=Q(),f=y.attempts?y.attempts[p]:null;Se=p,He=null,Ve.close(),fe.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:p,meta:$(f)}),We()}function Me(p,y){Se=null,He=p,Ve.close(),fe.hidden=!0,Ze.hidden=!1,qe.open({attempt_id:p,meta:y,hide_prompt:!0}),We()}function rt(){if(Ve.isOpen()&&Ve.refresh(N()),He){let f=(o?.get()?.runs||[]).find(C=>C.run_id===He);f?qe.updateMeta(Bi(f)):qe.close();return}if(!Se)return;let p=Q(),y=p.attempts?p.attempts[Se]:null;if(y){qe.updateMeta($(y));return}qe.close()}function x(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;let f=y?.closest?.(".mon-overlap__chip");if(f){let Fe=f.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";if(pt){let on=f.getAttribute("data-overlap-id")||"";M=!!M&&M.bead_id===pt&&M.counterpart_id===on?null:{bead_id:pt,counterpart_id:on},We()}return}let C=y?.closest?.(".mon-overlap__place");if(C){let Fe=C.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";pt&&Ee(pt,C.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-analysis-btn")){J?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){ee();return}let E=y?.closest?.(".worker-repo-op__session");if(E){let Fe=E.dataset.attemptId;Fe&&ge(Fe);return}let le=y?.closest?.(".worker-repo-op__resolve");if(le){A(le.dataset.operationId||"");return}let Te=y?.closest?.(".worker-repo-op__dismiss");if(Te){g(Te.dataset.operationId||"");return}let Ue=y?.closest?.(".worker-cleanup__resume");if(Ue){let Fe=Ue.dataset.beadId;Fe&&bt(Fe);return}let Xe=y?.closest?.(".worker-banner__resume");if(Xe){let Fe=Xe.dataset.attemptId;Fe&&xt(Fe);return}let Ke=y?.closest?.(".worker-banner__discard");if(Ke){let Fe=Ke.dataset.confirmation==="merged"?"merged":"unmerged";re(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,Fe,Ke.dataset.operationId||null);return}let vt=y?.closest?.(".worker-banner__dismiss");if(vt){let Fe=vt.dataset.attemptId;Fe&&St(Fe);return}if(y?.closest?.(".worker-play")){xe(!Q().auto_advance);return}let sn=y?.closest?.(".worker-merge-all");if(sn){sn.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?_e(!1):Z():_e(!0);return}let Hr=y?.closest?.(".worker-pane__hd--toggle");if(Hr){let Fe=Hr.dataset.lane;(Fe==="queue"||Fe==="done")&&Dt(Fe);return}let gr=y?.closest?.(".worker-card__place-lane");if(gr){let Fe=gr.dataset.beadId,pt=gr.dataset.lane;Fe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(oe=null,We(),Qe(Fe,pt));return}if(y?.closest?.(".worker-card__place-cancel")){oe=null,We();return}let Jt=y?.closest?.(".worker-card__place");if(Jt){let Fe=Jt.dataset.beadId;Fe&&!Jt.disabled&&(Le()?(oe=Fe,We()):Qe(Fe,"parallel"));return}let Gr=y?.closest?.(".worker-filter__chip");if(Gr){let Fe=Gr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&Et({...V,spec:Fe});return}let Sn=y?.closest?.(".worker-mini__merge");if(Sn){let Fe=Sn.dataset.beadId||"";Q().cleanup_failed?.[Fe]?bt(Fe):Ot(Fe);return}let Is=y?.closest?.(".worker-mini__merge-cancel");if(Is){I(Is.dataset.beadId||"");return}let er=y?.closest?.(".worker-mini__discard");if(er){re(er.dataset.beadId||"",er.dataset.attemptId||null,er.dataset.discardMode==="merged"?"merged":"unmerged",er.dataset.operationId||null);return}let jn=y?.closest?.(".worker-mini__stale-continue");if(jn){R("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let Bn=y?.closest?.(".worker-mini__stale-backup");if(Bn){R("worker-stale-work-backup-fresh",Bn.dataset.beadId||"",Bn.dataset.actionId||"");return}let hr=y?.closest?.(".worker-mini__stale-recheck");if(hr){R("worker-stale-work-recheck",hr.dataset.beadId||"",hr.dataset.actionId||"");return}let Vr=y?.closest?.(".worker-mini__revise-fix");if(Vr){G("worker-revise-fix",Vr.dataset.beadId||"");return}let Ps=y?.closest?.(".worker-mini__revise-approve");if(Ps){G("worker-revise-approve",Ps.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Fe=y?.closest?.(".rtile"),pt=Fe?.dataset?.beadId,on=Fe?.dataset?.attemptId;pt&&re(pt,on||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&St(pt);return}if(y?.closest?.(".rtile__pause")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&mt(pt);return}if(y?.closest?.(".rtile__resume")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&xt(pt);return}if(y?.closest?.(".rtile__session")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&ge(pt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Ve.close(),qe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let br=y?.closest?.(".rtile .board-card__roll-toggle");if(br){let Fe=br.dataset.rollParent;Fe&&(Re.has(Fe)?Re.delete(Fe):Re.add(Fe),We());return}let tr=y?.closest?.(".rtile .board-card__roll-child");if(tr){let Fe=tr.dataset.childId;Fe&&l&&l(Fe);return}let Un=y?.closest?.(".rtile");if(Un){if(y?.closest?.(".rtile__id")){let pt=Un.dataset.beadId;pt&&cn(pt).then(on=>{on?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=Un.dataset.beadId;Fe&&l&&l(Fe);return}let Kr=y?.closest?.(".worker-mini, .worker-card");if(Kr){let Fe=Kr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&cn(Fe).then(on=>{on?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=y?.closest?.(".ctl-chip--from");if(pt){let on=pt.dataset.fromId;on&&l&&l(on);return}Fe&&l&&l(Fe)}}e.addEventListener("pointerdown",lt),e.addEventListener("dragstart",Ne),e.addEventListener("dragover",L),e.addEventListener("dragleave",de),e.addEventListener("drop",ut),e.addEventListener("click",x),e.addEventListener("change",b);function O(p){if(!M)return;let y=p.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(M=null,We())}function Oe(p){p.key!=="Escape"||!M||(M=null,We())}return document.addEventListener("click",O),document.addEventListener("keydown",Oe),Y.push(()=>{document.removeEventListener("click",O),document.removeEventListener("keydown",Oe)}),Xt(),w&&Y.push(w.subscribe(()=>{for(let[p,y]of T)y==="failed"&&T.delete(p);We()})),s&&Y.push(s.subscribe(()=>{let p=u&&u()||"";p!==$t&&($t=p,tt.close()),We(),rt()})),o&&typeof o.subscribe=="function"&&Y.push(o.subscribe(()=>{rt(),We()})),We(),{load(){ye(),We()},refreshSessionDefaults:me,destroy(){for(let p of Y.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",lt),e.removeEventListener("dragstart",Ne),e.removeEventListener("dragover",L),e.removeEventListener("dragleave",de),e.removeEventListener("drop",ut),e.removeEventListener("click",x),e.removeEventListener("change",b);try{qe.destroy()}catch{}Ze.hidden=!0;try{J?.destroy()}catch{}try{tt.destroy()}catch{}Ye(c``,e)}}}function Gi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Np(e,t,n,r=async()=>{},s=async()=>{}){let o=It("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(K){let U=K.target.value,we=t.getState().workspace?.current?.path||"";if(U&&U!==we){o("switching workspace to %s",U),i=!0,q();try{await n(U)}catch(he){o("workspace switch failed: %o",he)}finally{i=!1,q()}}}async function _(){let K=t.getState(),T=K.workspace?.current?.path||K.workspace?.available?.[0]?.path||"";if(!(!T||l)){o("git-pulling workspace %s",T),l=!0,q();try{await r(T)}catch(U){o("workspace git pull failed: %o",U)}finally{l=!1,q()}}}function h(K){let T=K.target;T&&e.contains(T)||F()}function w(K){K.key==="Escape"&&F()}function S(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),q())}function F(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),q())}function z(){u?F():S()}async function V(K){let T=K.target,U=T.value,W=T.checked;o("toggling visibility %s \u2192 %s",U,String(W));try{await s(U,W)}catch(we){o("workspace visibility toggle failed: %o",we)}}function oe(K){return K?c`
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
    `:c``}function M(K,T){return c`
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
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${K.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!T.has(U.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Gi(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let K=t.getState(),T=K.workspace?.current,U=K.workspace?.available||[],W=new Set(K.workspace?.hidden||[]),we=T?.path||U[0]?.path||"";if(U.length===0)return c``;let he=U.filter(pe=>!W.has(pe.path)||pe.path===we);if(he.length<=1){let pe=he[0]||U[0],H=Gi(pe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${pe.path}"
            >${H}</span
          >
          ${M(U,W)}
          ${oe(we)}
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
          ${he.map(pe=>c`
              <option
                value="${pe.path}"
                ?selected=${pe.path===we}
                title="${pe.path}"
              >
                ${Gi(pe.path)}
              </option>
            `)}
        </select>
        ${M(U,W)}
        ${oe(we)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Ye(D(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Ye(c``,e)}}}var qp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Vi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Fp(e,t,n=Vi()){return{id:n,type:e,payload:t}}function jp(e={}){let t=It("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],_=new Map,h=new Set;function w(D){for(let q of Array.from(h))try{q(D)}catch{}}function S(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let D=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*D,K=Math.max(0,Math.round(D+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",K,a+1),i=setTimeout(()=>{i=null,M()},K)}function F(D){try{s?.send(JSON.stringify(D))}catch(q){t("ws send failed",q)}}function z(){for(o="open",t("ws open"),w(o),a=0;d.length;){let D=d.shift();D&&F(D)}}function V(D){let q;try{q=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let T=u.get(q.id);u.delete(q.id),q.ok?T?.resolve(q.payload):T?.reject(q.error||new Error("ws error"));return}let K=_.get(q.type);if(K&&K.size>0)for(let T of Array.from(K))try{T(q.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",q.type)}function oe(){o="closed",t("ws closed"),w(o);for(let[D,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(D);a+=1,S()}function M(){if(!l)return;let D=r();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",w(o),s.addEventListener("open",z),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",oe)}catch(q){t("ws connect failed %o",q),S()}}return M(),{send(D,q){if(!qp.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let K=Vi(),T=Fp(D,q,K);return t("send %s id=%s",D,K),new Promise((U,W)=>{u.set(K,{resolve:U,reject:W,type:D}),s&&s.readyState===s.OPEN?F(T):(t("queue %s id=%s (state=%s)",D,K,o),d.push(T))})},on(D,q){_.has(D)||_.set(D,new Set);let K=_.get(D);return K?.add(q),()=>{K?.delete(q)}},onConnection(D){return h.add(D),()=>{h.delete(D)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,M()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function sy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function oy(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ki=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Bp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Xn="tab:worker:closed",ay="bdui.worker.done-range",Up=zd,Wp="worker:queue",zp="worker:parallel-analysis",Hp="ui:order",Gp="ui:display-policy",Vp="exec:presets",Jn="tab:board:closed",Kp="beads-ui.board.closed-range";function iy(e){let t=It("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ye(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&up(a),i&&l&&u&&d){let X=function(x,O){let Oe="Request failed",p="";if(x&&typeof x=="object"){let f=x;if(typeof f.message=="string"&&f.message.length>0&&(Oe=f.message),typeof f.details=="string")p=f.details;else if(f.details&&typeof f.details=="object")try{p=JSON.stringify(f.details,null,2)}catch{p=""}}else typeof x=="string"&&x.length>0&&(Oe=x);let y=O&&O.length>0?`Failed to load ${O}`:"Request failed";Y.open(y,Oe,p)},Je=function(x){return`${lt.getState().workspace.current?.path||""}\0${x}`},Ie=function(){qe&&(qe().catch(()=>{}),qe=null),Ve=null,tt=null},ze=function(x){$t=x;let O=()=>{$t!==x||lt.getState().selected_id!==x||($t=null,ke(x))};if(!Q){J.then(O);return}O()},mt=function(x,O,Oe,p,y){return Oe!==nt[O]?(y().catch(()=>{}),!1):(x.set(p,y),!0)},St=function(){let x=lt.getState();_e(x.view==="board"),xe(x.view==="worker"),ne(x.view==="monitor"),g(x.view==="board"||x.view==="worker"||xt||!!x.selected_id)},bt=function(){let x=ir(kt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},Ge=function(){let x=ir(Ot);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},_e=function(x){if(x)for(let[O,Oe]of Ki){if(Qe.has(O)||st.has(O))continue;let p=O===Jn?bt():{type:Oe};try{ae.register(O,p)}catch(C){t("register %s store failed: %o",O,C)}st.add(O);let y=nt.board,f=!1;Be.subscribeList(O,p).then(C=>{f=!mt(Qe,"board",y,O,C)}).catch(C=>{t("subscribe %s failed: %o",O,C),X(C,"board")}).finally(()=>{st.delete(O),f&&St()})}else re()},re=function(){nt.board+=1;for(let[x]of Ki){let O=Qe.get(x);O&&(O().catch(()=>{}),Qe.delete(x));try{ae.unregister(x)}catch(Oe){t("unregister %s failed: %o",x,Oe)}}},xe=function(x){if(!x){A();return}for(let[O,Oe]of Bp){if(R.has(O)||st.has(O))continue;let p=O===Xn?Ge():{type:Oe};try{ae.register(O,p)}catch(C){t("register %s store failed: %o",O,C)}st.add(O);let y=nt.worker,f=!1;Be.subscribeList(O,p).then(C=>{f=!mt(R,"worker",y,O,C)}).catch(C=>{t("subscribe %s failed: %o",O,C),X(C,"worker")}).finally(()=>{st.delete(O),f&&St()})}},A=function(){nt.worker+=1;for(let[x]of Bp){let O=R.get(x);O&&(O().catch(()=>{}),R.delete(x));try{ae.unregister(x)}catch(Oe){t("unregister %s failed: %o",x,Oe)}}},g=function(x){if(!x){k();return}G||(me("subscribe-worker-queue",{id:Wp}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),me("subscribe-worker-parallel-analysis",{id:zp}).catch(O=>{t("subscribe-worker-parallel-analysis failed: %o",O)}),G=()=>(me("unsubscribe-worker-parallel-analysis",{id:zp}),me("unsubscribe-worker-queue",{id:Wp})))},k=function(){G&&(G().catch(()=>{}),G=null),it.clear()},ne=function(x){if(!x){te();return}j||(me("subscribe-monitor-pipeline",{id:Up}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),j=()=>me("unsubscribe-monitor-pipeline",{id:Up}))},te=function(){j&&(j().catch(()=>{}),j=null)},Ee=function(){be||(me("subscribe-ui-order",{id:Hp}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),be=()=>me("unsubscribe-ui-order",{id:Hp}))},et=function(){be&&(be().catch(()=>{}),be=null),fe.clear()},De=function(){dt||(me("subscribe-display-policy",{id:Gp}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),dt=()=>me("unsubscribe-display-policy",{id:Gp}))},ot=function(){dt&&(dt().catch(()=>{}),dt=null),ve.clear()},gt=function(){Lt||(me("subscribe-impl-presets",{id:Vp}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Lt=()=>me("unsubscribe-impl-presets",{id:Vp}))},Dt=function(x){if(!x)return"Unknown";let O=x.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},b=function(x,O){v.open(x.path,{missing_state:x.missing_state,...O?{workspace:O}:{}})};var _=X,h=Je,w=Ie,S=ze,F=mt,z=St,V=bt,oe=Ge,M=_e,D=re,q=xe,K=A,T=g,U=k,W=ne,we=te,he=Ee,pe=et,H=De,Ce=ot,Re=gt,ue=Dt,ie=b;let Ae=document.getElementById("header-loading"),$e=pc(Ae),Y=Xu(e),ye=jp(),me=$e.wrapSend((x,O)=>ye.send(x,O)),Be=sc(me),ae=oc(),Ze=lc(),it=ic(),P=Wl(),fe=ac(),ve=Bl(),Se=Ul(),He=zl();ye.on("impl-presets-snapshot",x=>{let O=x;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&Se.set({revision:O.revision,presets:O.presets})}),ye.on("monitor-pipeline-snapshot",x=>{let O=x;if(!(!O||!Array.isArray(O.workspaces)))try{P.set(O.workspaces,O.workspaces_state)}catch{}}),ye.on("ui-order-snapshot",x=>{let O=x;if(O&&typeof O.revision=="number")try{fe.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),ye.on("display-policy-snapshot",x=>{let O=x;if(O&&O.policy&&typeof O.policy=="object")try{ve.set(O.policy)}catch{}}),ye.on("session-log-snapshot",x=>{let O=x;if(O&&typeof O.id=="string")try{He.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),ye.on("session-log-append",x=>{let O=x;if(O&&typeof O.id=="string")try{He.append(O.id,O.event)}catch{}}),ye.on("snapshot",x=>{let O=x,Oe=O&&typeof O.id=="string"?O.id:"",p=Oe?ae.getStore(Oe):null;if(p&&O&&O.type==="snapshot")try{p.applyPush(O)}catch{}}),ye.on("upsert",x=>{let O=x,Oe=O&&typeof O.id=="string"?O.id:"",p=Oe?ae.getStore(Oe):null;if(p&&O&&O.type==="upsert")try{p.applyPush(O)}catch{}}),ye.on("delete",x=>{let O=x,Oe=O&&typeof O.id=="string"?O.id:"",p=Oe?ae.getStore(Oe):null;if(p&&O&&O.type==="delete")try{p.applyPush(O)}catch{}});let qe=null,Ve=null,tt=null,$t=null,_t=()=>{},J=new Promise(x=>{_t=()=>x(void 0)}),Q=!1,Le=!1;async function ke(x){let O=Je(x);if(O===Ve||O===tt)return;tt=O;let Oe=`detail:${x}`,p={type:"issue-detail",params:{id:x}};try{ae.register(Oe,p)}catch(y){t("register detail store failed: %o",y)}try{let y=await Be.subscribeList(Oe,p);if(lt.getState().selected_id!==x||Je(x)!==O){await y().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=y,Ve=O}catch(y){t("detail subscribe failed: %o",y),X(y,"issue details")}finally{tt===O&&(tt=null)}}let Qe=new Map,st=new Set,nt={board:0,worker:0},xt=!1,kt=an;try{let x=window.localStorage.getItem(Kp);_n(x)&&(kt=x)}catch{}let Ot=an;try{let x=window.localStorage.getItem(ay);_n(x)&&(Ot=x)}catch{}async function I(x){if(!_n(x)||x===kt)return;kt=x;try{window.localStorage.setItem(Kp,x)}catch{}let O=Qe.get(Jn);if(!O)return;Qe.delete(Jn),await O().catch(()=>{});let Oe=bt();try{ae.register(Jn,Oe)}catch(p){t("register %s store failed: %o",Jn,p)}try{let p=await Be.subscribeList(Jn,Oe);Qe.set(Jn,p)}catch(p){t("re-subscribe %s failed: %o",Jn,p),X(p,"board")}}async function Z(x){if(!_n(x)||x===Ot)return;Ot=x;let O=R.get(Xn);if(!O)return;R.delete(Xn),await O().catch(()=>{});let Oe=Ge();try{ae.register(Xn,Oe)}catch(p){t("register %s store failed: %o",Xn,p)}try{let p=await Be.subscribeList(Xn,Oe);R.set(Xn,p)}catch(p){t("re-subscribe %s failed: %o",Xn,p),X(p,"worker")}}let R=new Map,G=null,j=null,be=null,dt=null,Lt=null;async function pn(){dt=null,ve.clear(),Lt=null,Se.clear(),G=null,j=null,Qe.clear(),R.clear(),nt.board+=1,nt.worker+=1,gt();let x=lt.getState().workspace.current?.path;if(x)try{await ye.send("set-workspace",{path:x})}catch(Oe){t("workspace restore after reconnect failed: %o",Oe);return}De();let O=lt.getState();_e(O.view==="board"),xe(O.view==="worker"),ne(O.view==="monitor"),g(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),re(),A(),k(),Ze.clear(),et(),Ee(),ot(),De(),Ie();let x=lt.getState();if(x.selected_id)try{ae.unregister(`detail:${x.selected_id}`)}catch{}let O=lt.getState();_e(O.view==="board"),xe(O.view==="worker"),ne(O.view==="monitor"),g(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&ze(O.selected_id)}async function qt(x){t("requesting workspace switch to %s",x),Le=!0;try{let O=await ye.send("set-workspace",{path:x});t("workspace switch result: %o",O),O&&O.workspace&&(lt.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),O.changed&&(await Bt(),ce("Switched to "+Dt(x),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),ce("Failed to switch workspace","error",3e3),O}finally{Le=!1}}async function Gt(x){t("requesting workspace git pull for %s",x);try{let O=await ye.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let Oe=O?.status;if(Oe==="up_to_date"){ce("Already up to date","success",2e3);return}if(Oe==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Dt(x),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let Oe=O?.code,p=O?.message;if(Oe==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Oe==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Oe==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let y=p?`: ${p}`:"";throw ce(`Git pull failed${y}`,"error",3e3),O}}async function Ft(x,O){t("setting workspace visibility %s \u2192 %s",x,String(O));try{await ye.send("set-workspace-visibility",{path:x,visible:O}),await We()}catch(Oe){t("workspace visibility update failed: %o",Oe),ce("Failed to update project visibility","error",3e3)}}async function We(){try{let x=await ye.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let O=x.workspaces.map(f=>({path:f.path,database:f.database,pid:f.pid,version:f.version})),Oe=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,p=Array.isArray(x.hidden)?x.hidden.filter(f=>typeof f=="string"):[];lt.setState({workspace:{current:Oe,available:O,hidden:p}});let y=window.localStorage.getItem("beads-ui.workspace");y&&(!O.some(C=>C.path===y)||p.includes(y)?window.localStorage.removeItem("beads-ui.workspace"):Oe&&y!==Oe.path&&(t("restoring saved workspace preference: %s",y),await qt(y)))}}catch(x){t("failed to load workspaces: %o",x)}}ye.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(lt.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),We(),Bt())});let Xt=!1;if(typeof ye.onConnection=="function"){let x=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(Xt=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&Xt&&(Xt=!1,ce("Reconnected","success",2200),oy(lt,(Oe,p)=>{t(`${Oe}: %o`,p)}),pn())};ye.onConnection(x)}let Vt="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(Vt=x)}catch(x){t("view parse error: %o",x)}let lt=dc({config:sy(),view:Vt});ye.on("worker-queue-snapshot",x=>{let O=x;if(!O||!O.queue)return;let Oe=lt.getState().workspace.current?.path;if(typeof Oe=="string"&&Oe.length>0&&O.root_dir!==Oe){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{Ze.set(O.queue)}catch{}}),ye.on("worker-parallel-analysis-snapshot",x=>{let O=x;if(!O)return;let Oe=lt.getState().workspace.current?.path;if(!(typeof Oe=="string"&&Oe.length>0&&typeof O.root_dir=="string"&&O.root_dir!==Oe))try{it.set({settings:O.settings,job:O.job??null,runs:Array.isArray(O.runs)?O.runs:[],last_good:O.last_good??null})}catch{}});let Ne=cc(lt);Ne.start();let L=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),de=async(x,O)=>{try{return await me(x,O)}catch(Oe){if(L.has(x))throw Oe;return[]}};Gd({global_element:r,repo_element:s},lt,Ne);let Pe=document.getElementById("workspace-picker");Pe&&Np(Pe,lt,qt,Gt,Ft);let ut=Zd(e,(x,O)=>me(x,O));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>ut.open())}catch{}let Et=ep(e,{policyStore:ve,queueStore:Ze,implPresetStore:Se,transport:(x,O)=>me(x,O),onOpenChange:x=>{let O=xt;xt=x,St(),O&&x===!1&&N.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[O]of Ki)for(let Oe of ae.snapshotFor(O)||[]){let p=Oe.labels;if(Array.isArray(p))for(let y of p)typeof y=="string"&&y.length>0&&x.add(y)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>Et.open()))}catch{}let yt=document.createElement("div");yt.className="md-viewer-root",document.body.appendChild(yt);let v=qo(yt,{getWorkspacePath:()=>lt.getState().workspace.current?.path}),$=Ac(i,{gotoIssue:x=>Ne.gotoIssue(x),issueStores:ae,transport:de,workerQueueStore:Ze,uiOrderStore:fe,displayPolicyStore:ve,closedRange:kt,onClosedRangeChange:x=>{I(x)},onNewIssue:()=>ut.open(),openDoc:b}),N=Hi(l,{transport:de,issueStores:ae,queueStore:Ze,analysisStore:it,sessionLogStore:He,uiOrderStore:fe,gotoIssue:x=>lt.setState({selected_id:x}),getWorkspacePath:()=>lt.getState().workspace.current?.path,openDoc:b,doneRange:Ot,onDoneRangeChange:x=>{Z(x)}}),ee=Hd(u,{transport:de,pipelineStore:P,execPresetStore:Se,sessionLogStore:He,router:Ne,gotoIssue:x=>Ne.gotoIssue(x),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:x=>qt(x),openDoc:b}),ge=Qu(d,{issueStores:ae,transport:de,queueStore:Ze,execPresetStore:Se,sessionLogStore:He,getWorkspacePath:()=>lt.getState().workspace.current?.path,mdViewer:v,onNavigate:x=>{lt.getState().view==="worker"?lt.setState({selected_id:x}):Ne.gotoIssue(x)},onClose:()=>{let x=lt.getState();lt.setState({selected_id:null});try{Ne.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{Et.open("execution")}}),Me=lt.getState().selected_id;Me&&(d.hidden=!1,ge.load(Me),ze(Me)),lt.subscribe(x=>{let O=x.selected_id;O?(d.hidden=!1,ge.load(O),Le||ze(O)):(ge.clear(),d.hidden=!0,Ie())});let rt=x=>{i.hidden=x.view!=="board",l.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",o&&o.classList.toggle("is-quiet",x.view==="monitor"),_e(x.view==="board"),xe(x.view==="worker"),ne(x.view==="monitor"),g(x.view==="board"||x.view==="worker"||xt||!!x.selected_id),!x.selected_id&&x.view==="board"&&$.load(),x.view==="worker"&&N.load(),x.view==="monitor"?ee.load():ee.pause(),window.localStorage.setItem("beads-ui.view",x.view)};lt.subscribe(rt),rt(lt.getState()),Ee(),De(),gt(),We().finally(()=>{Q=!0,_t()}),window.addEventListener("keydown",x=>{let O=x.ctrlKey||x.metaKey,Oe=String(x.key||"").toLowerCase(),p=x.target,y=p&&p.tagName?String(p.tagName).toLowerCase():"",f=y==="input"||y==="textarea"||y==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;O&&Oe==="n"&&(f||(x.preventDefault(),ut.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&iy(t)});export{iy as bootstrap,sy as readBootstrapConfig,oy as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
