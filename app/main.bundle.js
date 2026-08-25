var gf=Object.create;var ka=Object.defineProperty;var hf=Object.getOwnPropertyDescriptor;var bf=Object.getOwnPropertyNames;var yf=Object.getPrototypeOf,vf=Object.prototype.hasOwnProperty;var wf=(e,t,n)=>t in e?ka(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var $a=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var kf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of bf(t))!vf.call(e,s)&&s!==n&&ka(e,s,{get:()=>t[s],enumerable:!(r=hf(t,s))||r.enumerable});return e};var $f=(e,t,n)=>(n=e!=null?gf(yf(e)):{},kf(t||!e||!e.__esModule?ka(n,"default",{value:e,enumerable:!0}):n,e));var $t=(e,t,n)=>wf(e,typeof t!="symbol"?t+"":t,n);var Kl=$a((Ay,Vl)=>{var xr=1e3,Ar=xr*60,Sr=Ar*60,lr=Sr*24,Sf=lr*7,Ef=lr*365.25;Vl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Tf(e);if(n==="number"&&isFinite(e))return t.long?Rf(e):Cf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Tf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Ef;case"weeks":case"week":case"w":return n*Sf;case"days":case"day":case"d":return n*lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Sr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ar;case"seconds":case"second":case"secs":case"sec":case"s":return n*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Cf(e){var t=Math.abs(e);return t>=lr?Math.round(e/lr)+"d":t>=Sr?Math.round(e/Sr)+"h":t>=Ar?Math.round(e/Ar)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function Rf(e){var t=Math.abs(e);return t>=lr?Ys(e,t,lr,"day"):t>=Sr?Ys(e,t,Sr,"hour"):t>=Ar?Ys(e,t,Ar,"minute"):t>=xr?Ys(e,t,xr,"second"):e+" ms"}function Ys(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Zl=$a((Sy,Yl)=>{function Of(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Kl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,w,E;function F(...H){if(!F.enabled)return;let V=F,ae=Number(new Date),M=ae-(_||ae);V.diff=M,V.prev=_,V.curr=ae,_=ae,H[0]=n.coerce(H[0]),typeof H[0]!="string"&&H.unshift("%O");let D=0;H[0]=H[0].replace(/%([a-zA-Z%])/g,(K,R)=>{if(K==="%%")return"%";D++;let U=n.formatters[R];if(typeof U=="function"){let ne=H[D];K=U.call(V,ne),H.splice(D,1),D--}return K}),n.formatArgs.call(V,H),(V.log||n.log).apply(V,H)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==n.namespaces&&(w=n.namespaces,E=n.enabled(d)),E),set:H=>{h=H}}),typeof n.init=="function"&&n.init(F),F}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,w=0,E=-1,F=0;for(;h<d.length;)if(w<_.length&&(_[w]===d[h]||_[w]==="*"))_[w]==="*"?(E=w,F=h,w++):(h++,w++);else if(E!==-1)w=E+1,F++,h=F;else return!1;for(;w<_.length&&_[w]==="*";)w++;return w===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Yl.exports=Of});var Ql=$a((nn,Zs)=>{nn.formatArgs=If;nn.save=Pf;nn.load=Mf;nn.useColors=Lf;nn.storage=Df();nn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();nn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Lf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function If(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Zs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}nn.log=console.debug||console.log||(()=>{});function Pf(e){try{e?nn.storage.setItem("debug",e):nn.storage.removeItem("debug")}catch{}}function Mf(){let e;try{e=nn.storage.getItem("debug")||nn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Df(){try{return localStorage}catch{}}Zs.exports=Zl()(nn);var{formatters:Nf}=Zs.exports;Nf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ws=Xr.trustedTypes,Ll=Ws?Ws.createPolicy("lit-html",{createHTML:e=>e}):void 0,Aa="$lit$",Rn=`lit$${Math.random().toFixed(9).slice(2)}$`,Sa="?"+Rn,xf=`<${Sa}>`,sr=document,Jr=()=>sr.createComment(""),es=e=>e===null||typeof e!="object"&&typeof e!="function",Ea=Array.isArray,ql=e=>Ea(e)||typeof e?.[Symbol.iterator]=="function",xa=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Il=/-->/g,Pl=/>/g,nr=RegExp(`>|${xa}(?:([^\\s"'>=/]+)(${xa}*=${xa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ml=/'/g,Dl=/"/g,Fl=/^(?:script|style|textarea|title)$/i,Ta=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ta(1),ns=Ta(2),by=Ta(3),fn=Symbol.for("lit-noChange"),Nt=Symbol.for("lit-nothing"),Nl=new WeakMap,rr=sr.createTreeWalker(sr,129);function jl(e,t){if(!Ea(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ll!==void 0?Ll.createHTML(t):t}var Bl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let i=0;i<n;i++){let l=e[i],u,d,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===Qr?d[1]==="!--"?a=Il:d[1]!==void 0?a=Pl:d[2]!==void 0?(Fl.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=nr):d[3]!==void 0&&(a=nr):a===nr?d[0]===">"?(a=s??Qr,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?nr:d[3]==='"'?Dl:Ml):a===Dl||a===Ml?a=nr:a===Il||a===Pl?a=Qr:(a=nr,s=void 0);let w=a===nr&&e[i+1].startsWith("/>")?" ":"";o+=a===Qr?l+xf:_>=0?(r.push(u),l.slice(0,_)+Aa+l.slice(_)+Rn+w):l+Rn+(_===-2?i:w)}return[jl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ts=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Bl(t,n);if(this.el=e.createElement(u,r),rr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=rr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Aa)){let h=d[a++],w=s.getAttribute(_).split(Rn),E=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:E[2],strings:w,ctor:E[1]==="."?Hs:E[1]==="?"?Gs:E[1]==="@"?Vs:ar}),s.removeAttribute(_)}else _.startsWith(Rn)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Fl.test(s.tagName)){let _=s.textContent.split(Rn),h=_.length-1;if(h>0){s.textContent=Ws?Ws.emptyScript:"";for(let w=0;w<h;w++)s.append(_[w],Jr()),rr.nextNode(),l.push({type:2,index:++o});s.append(_[h],Jr())}}}else if(s.nodeType===8)if(s.data===Sa)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Rn,_+1))!==-1;)l.push({type:7,index:o}),_+=Rn.length-1}o++}}static createElement(t,n){let r=sr.createElement("template");return r.innerHTML=t,r}};function or(e,t,n=e,r){if(t===fn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=es(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=or(e,s._$AS(e,t.values),s,r)),t}var zs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??sr).importNode(n,!0);rr.currentNode=s;let o=rr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new $r(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new Ks(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=rr.nextNode(),a++)}return rr.currentNode=sr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Nt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=or(this,t,n),es(t)?t===Nt||t==null||t===""?(this._$AH!==Nt&&this._$AR(),this._$AH=Nt):t!==this._$AH&&t!==fn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ql(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Nt&&es(this._$AH)?this._$AA.nextSibling.data=t:this.T(sr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ts.createElement(jl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Nl.get(t.strings);return n===void 0&&Nl.set(t.strings,n=new ts(t)),n}k(t){Ea(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Jr()),this.O(Jr()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Nt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Nt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=or(this,t,n,0),a=!es(t)||t!==this._$AH&&t!==fn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=or(this,i[r+l],n,l),u===fn&&(u=this._$AH[l]),a||(a=!es(u)||u!==this._$AH[l]),u===Nt?t=Nt:t!==Nt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Hs=class extends ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Nt?void 0:t}},Gs=class extends ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Nt)}},Vs=class extends ar{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=or(this,t,n,0)??Nt)===fn)return;let r=this._$AH,s=t===Nt&&r!==Nt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Nt&&(r===Nt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ks=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){or(this,t)}},Ul={M:Aa,P:Rn,A:Sa,C:1,L:Bl,R:zs,D:ql,V:or,I:$r,H:ar,N:Gs,U:Vs,B:Hs,F:Ks},Af=Xr.litHtmlPolyfillSupport;Af?.(ts,$r),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(Jr(),o),o,void 0,n??{})}return s._$AI(e),s};var ln="today",Wn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function _n(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Wl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Hl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Gl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Xl=$f(Ql(),1);function Rt(e){return(0,Xl.default)(`beads-ui:${e}`)}function yn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cr(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function tc(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function nc(e,t){let n=yn(e.updated_at),r=yn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function rc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yn(e.created_at),o=yn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function sc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var qf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Jl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ec(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=qf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function oc(e,t){let n=Jl(e),r=Jl(t);if(n!==r)return n<r?-1:1;let s=ec(e),o=ec(t);if(s!==o)return s<o?-1:1;let a=yn(e&&e.created_at),i=yn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ca=2**20;function Er(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yn(e&&e.created_at)}function Qs(e){return(t,n)=>{let r=Er(t,e),s=Er(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Ra(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Er(i,n)-Ca};if(!i)return{rank:Er(a,n)+Ca};let l=Er(a,n),u=Er(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ca}))}}function Oa(e,t={}){let n=Rt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||cr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let w=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;r.clear();let E=Array.isArray(h.issues)?h.issues:[];for(let F of E)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=w,u();return}if(h.type==="upsert"){let E=h.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let F=r.get(E.id);if(!F)r.set(E.id,E);else{let H=Number.isFinite(F.updated_at)?F.updated_at:0,V=Number.isFinite(E.updated_at)?E.updated_at:0;if(H<=V){for(let ae of Object.keys(F))ae in E||delete F[ae];for(let[ae,M]of Object.entries(E))F[ae]=M}}d()}o=w,u()}else if(h.type==="delete"){let E=String(h.issue_id||"");E&&(r.delete(E),d()),o=w,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ac(e){let t=Rt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let w of Array.from(u)){let E=n.get(w);if(!E)continue;let F=E.itemsById;for(let H of d)typeof H=="string"&&H.length>0&&F.set(H,!0);for(let H of _)typeof H=="string"&&H.length>0&&F.set(H,!0);for(let H of h)typeof H=="string"&&H.length>0&&F.delete(H)}}async function o(i,l){let u=Xs(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=n.get(i)||null;if(h){let w=r.get(h.key);w&&(w.delete(i),w.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xs,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function ic(){let e=Rt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let _=u?Xs(u):"",h=n.get(l)||"",w=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),w&&h&&_&&h!==_){let E=t.get(l);if(E)try{E.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let H=Oa(l,d);t.set(l,H);let V=H.subscribe(()=>o());s.set(l,V)}else if(!w){let E=Oa(l,d);t.set(l,E);let F=E.subscribe(()=>o());s.set(l,F)}return n.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function cc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function uc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function La(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Ff(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function jf(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function dc(e){let t=Rt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Ff(r),a=jf(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=La(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?La(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Bf=Object.freeze({workspace_config:{default_workspace:null}});function pc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Bf.workspace_config.default_workspace}}}function fc(e={}){let t=Rt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:pc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?pc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function _c(e){let t=Rt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(_,h)=>{let w=s++,E=Date.now();r.set(w,{type:_,start_ts:E}),t("request start id=%d type=%s count=%d",w,_,n+1),a();let F=!1,H=()=>{F||(F=!0,r.delete(w),i())},V=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,_,Date.now()-E),H())},3e4);try{let ae=await u(_,h),M=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",w,_,M),ae}catch(ae){let M=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,_,M,ae),ae}finally{clearTimeout(V),H()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Js(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(sc),l;switch(i){case"created_desc":return l.sort(cr),l;case"created_asc":return l.sort(tc),l;case"updated_desc":return l.sort(nc),l;case"priority":return l.sort(rc),l;case"manual":default:{let u=n();return u?l.sort(Qs(u)):l.sort(cr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function En(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=En(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function cn(e,t){let n=En(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function mc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=En(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function eo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function to(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=eo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function no(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=mc(n);return{total:n.length,count:r,current:s,children:n}}function ro(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Ra(i,l,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let w=r(Ra(i,l,h.order),a);s(h,w);let E=await t("ui-order-set",{expected_revision:h.revision,entries:w});E&&E.applied&&n.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ia(e,t){return!t||typeof e!="string"||e.length===0||so(t.visible_labels).includes(e)?!0:so(t.hidden_labels).includes(e)?!1:!so(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function gc(e,t){return so(e).filter(n=>Ia(n,t))}function zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Uf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Wf(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function zf(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Uf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function oo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(oc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Wf(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>zf(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Hf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},bc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},hc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Gf={review:"\u2713",skip:"\u2298"},Hn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Vf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function yc(e){let t=e&&e.fill||"none";return t==="none"?Hn.none:e&&e.stale===!0?Hn.stale:t==="dim"?Hn.dim:e&&e.glyph==="review"?Hn.review:e&&e.glyph==="skip"?Hn.skip:Hn.done}function Kf(e){if(!e||e.fill==="none"||!e.approval_state)return yc(e);let t=[];return e.glyph==="review"?t.push(Hn.review):e.glyph==="skip"&&t.push(Hn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Yf(e,t,n,r){let s=Hf[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=Gf[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=bc[e]||e,h=r?vc(t):null;if(!h)return c`
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
      @click=${E=>{E.preventDefault(),E.stopPropagation(),r(E,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function vc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=hc[e.route]||hc.spec_backed,o=e.stages,a=Vf(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${bc[u]||u} ${u==="plan"?Kf(o[u]||{}):yc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>vc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>Yf(u,o[u]||{},u===a,r))}
    </div>
  `}function Zf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var wc=2;function Qf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,wc).join(", "),s=n.length-wc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Pa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function io(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function On(e){return`${e.kind}:${io(e)}@${e.sha}`}function lo(e,t){if(!e)return null;let n=Pa(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Pa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${On(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function kc(e,t){let n=lo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Xf(e){if(!e)return null;let t=Pa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${On(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Jf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&zn(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&zn(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&zn(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=kc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(i)}`}
        >${`exec ${i.kind==="delegated"?io(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of gc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&zn(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),zn(n,"blocked")&&s.push(...Qf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&zn(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function e_(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function t_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return oo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:e_(e),empty_label:"children \uC5C6\uC74C",childChips:Ma,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Ma(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return lo(t,n)?c`<span class="board-card__roll-child-chips">
    ${kc(t,n)}
    ${Xf(n)}
  </span>`:null}function co(e,t){let n=Zf(e.priority);return c`
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
      ${Jf(e,t)}
      ${e.workflow&&zn(t.policy||null,"stepper")?ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${t_(e,t)}
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
  `}function $c(e,t,n){return c`
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
  `}var n_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],r_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],s_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function o_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function xc(e,t,n){return c`
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
        ${n_.map(r=>c`<option
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
        ${r_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${o_(e,t,n)}
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
        ${s_.map(r=>c`<option
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
  `}var a_=200,i_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},l_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ac="beads-ui.board.sort",Sc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function c_(){try{let e=window.localStorage.getItem(Ac);if(e&&Sc.has(e))return e}catch{}return"created_desc"}function Ec(e,t){let n=Rt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||ln,w=s?Js(s,a):null,E=ro({transport:o,uiOrderStore:a}),F=[],H=[],V=[],ae=[],M=[],D=[],q=!1,K=0,R=c_(),U=new Map,ne=new Map,Te=new Map,Z=new Set,ce={search:"",priority:"",type:"",labels:[]},z=!1,Oe=null;function Se(O){return String(O.status||"open")==="open"}function me(O){let G=String(O.status||"open");return G==="open"||G==="blocked"}function le(O){let G=ce.search.trim().toLowerCase(),$e=ce.priority,S=ce.type,g=ce.labels;return O.filter(x=>{if(G){let j=String(x.id||"").toLowerCase(),te=String(x.title||"").toLowerCase();if(!j.includes(G)&&!te.includes(G))return!1}if($e!==""&&String(x.priority)!==$e||S!==""&&String(x.issue_type||"")!==S)return!1;if(g.length>0){let j=Array.isArray(x.labels)?x.labels:[];if(!g.some(te=>j.includes(te)))return!1}return!0})}function ve(){let O=new Set;for(let G of[F,H,V,ae,M,D])for(let $e of G){let S=Array.isArray($e.labels)?$e.labels:[];for(let g of S)typeof g=="string"&&g.length>0&&O.add(g)}return Array.from(O).sort()}function xe(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function Y(){try{if(w){let O=w.selectBoardColumn("tab:board:in-progress","in_progress",R),G=w.selectBoardColumn("tab:board:blocked","blocked",R).filter(me),$e=new Set(O.map(Le=>Le.id)),S=w.selectBoardColumn("tab:board:ready","ready",R).filter(Le=>Se(Le)&&!$e.has(Le.id)),g=w.selectBoardColumn("tab:board:resolved","resolved",R),x=w.selectBoardColumn("tab:board:deferred","deferred",R),j=w.selectBoardColumn("tab:board:closed","closed").slice(0,a_),te=[...G,...S,...O,...g,...j];X(te);let ee=new Set;for(let Le of te)Le&&Le.id&&!eo(Le)&&ee.add(Le.id);let ge=!xe();F=ge?rs(G,ee):G,H=ge?rs(S,ee):S,V=ge?rs(O,ee):O,ae=ge?rs(g,ee):g,M=x,K=x.length,D=ge?rs(j,ee):j,U=new Map;for(let Le of F)U.set(Le.id,"open");for(let Le of H)U.set(Le.id,"open");for(let Le of V)U.set(Le.id,"in_progress");for(let Le of ae)U.set(Le.id,"resolved");for(let Le of M)U.set(Le.id,"deferred");for(let Le of D)U.set(Le.id,"closed");ne=new Map;for(let Le of F)ne.set(Le.id,"blocked-col");for(let Le of H)ne.set(Le.id,"ready-col");for(let Le of V)ne.set(Le.id,"in-progress-col");for(let Le of ae)ne.set(Le.id,"resolved-col");for(let Le of D)ne.set(Le.id,"closed-col")}ft()}catch{F=[],H=[],V=[],ae=[],M=[],D=[],Te=new Map,ft()}}function X(O){Te=to(O)}function ye(O){return no(Te,O)}function _e(O){return!Z.has(O)}function je(O,G){O.preventDefault(),O.stopPropagation(),Z.has(G)?Z.delete(G):Z.add(G),ft()}function ie(O,G){O.preventDefault(),O.stopPropagation(),r(G)}function Ye(O,G){O.preventDefault(),O.stopPropagation(),r(G)}function st(O,G){Oe||r(G)}function P(O,G){O.preventDefault(),O.stopPropagation(),u_(G).then($e=>{$e&&de("\uBCF5\uC0AC\uB428","success",1200)})}function fe(O,G){Oe=G,O.dataTransfer&&(O.dataTransfer.setData("text/plain",G),O.dataTransfer.effectAllowed="move"),O.target.classList.add("board-card--dragging")}function we(O){O.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Oe=null},0)}function Ae(O){let G=String(O.target.value||"");!G||G===h||(h=G,u&&u(G),ft())}function Ge(){return i?i.get():null}function Ne(O){let G=l?l.get():null,$e=G?G.cleanup_failed:null;if(!$e||typeof $e!="object"||Array.isArray($e))return null;let S=$e[O];return!S||typeof S!="object"||Array.isArray(S)?null:S}let ze={onCardClick:st,onCopyId:P,onDragStart:fe,onDragEnd:we,onClosedRangeChange:Ae,rollupFor:ye,isExpanded:_e,onRollupToggle:je,onChildClick:ie,onFromChipClick:Ye,onOpenDoc:_?(O,G)=>_(G):void 0,cleanupFailureFor:Ne,get policy(){return Ge()}};function Je(O,G){Oe||(We(),r(G))}function wt(O,G){O.preventDefault(),O.stopPropagation(),We(),r(G)}let pt={...ze,onCardClick:Je,onChildClick:wt,onFromChipClick:wt,onOpenDoc:_?(O,G)=>{We(),_(G)}:void 0,get policy(){return Ge()}};function J(O){let G=O.target,$e=e.querySelector(".board-filter__labels");G&&$e&&$e.contains(G)||Xe()}function Q(O){O.key==="Escape"&&Xe()}function Me(){z||(z=!0,document.addEventListener("mousedown",J),document.addEventListener("keydown",Q),ft())}function Xe(){z&&(z=!1,document.removeEventListener("mousedown",J),document.removeEventListener("keydown",Q),ft())}function Re(O){O.key==="Escape"&&We()}function ke(){q||(q=!0,document.addEventListener("keydown",Re),ft())}function We(){q&&(q=!1,document.removeEventListener("keydown",Re),ft())}let Ze={onClose:We,onOverlayClick(O){O.target===O.currentTarget&&We()}},nt={onSearchInput(O){ce.search=String(O.target.value||""),Y()},onPriorityChange(O){ce.priority=String(O.target.value||""),Y()},onTypeChange(O){ce.type=String(O.target.value||""),Y()},onSortChange(O){let G=String(O.target.value||"");if(!(!Sc.has(G)||G===R)){R=G;try{window.localStorage.setItem(Ac,G)}catch{}Y()}},onDeferredToggle(){q?We():ke()},onLabelMenuToggle(){z?Xe():Me()},onLabelToggle(O){let G=ce.labels.indexOf(O);G===-1?ce.labels.push(O):ce.labels.splice(G,1),Y()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],Y())},onNewIssue(){d&&d()}};function tt(){return c`
      <div class="board-view">
        ${xc(ce,nt,{sort_mode:R,deferred_popup_open:q,deferred_count:K,label_options:ve(),label_menu_open:z})}
        <div class="board-root">
          ${Tr({title:"Blocked",id:"blocked-col",items:le(F)},ze)}
          ${Tr({title:"Ready",id:"ready-col",items:le(H)},ze)}
          ${Tr({title:"In progress",id:"in-progress-col",items:le(V)},ze)}
          ${Tr({title:"Resolved",id:"resolved-col",items:le(ae)},ze)}
          ${Tr({title:"Closed",id:"closed-col",items:le(D),is_closed:!0,closed_range:h},ze)}
        </div>
        ${q?$c({items:le(M),count:K},pt,Ze):""}
      </div>
    `}function ft(){Ke(tt(),e),kt()}function kt(){try{let O=e.querySelector("#deferred-popup");O&&!O.open&&(typeof O.showModal=="function"?O.showModal():O.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let $e of G)Array.from($e.querySelectorAll(".board-card")).forEach((g,x)=>{g.tabIndex=x===0?0:-1})}catch{}}async function xt(O,G){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:O,status:G}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch($e){n("update-status failed: %o",$e),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function vt(O){switch(O){case"blocked-col":return F;case"ready-col":return H;case"in-progress-col":return V;case"resolved-col":return ae;default:return[]}}function Ct(O,G,$e){if(!o||!a)return;let S=vt(O),g=S.find(ge=>ge.id===G);if(!g)return;let x=S.filter(ge=>ge.id!==G),j=$e.closest?$e.closest(".board-card"):null,te=x.length;if(j){let ge=j.getAttribute("data-issue-id");if(ge===G)return;let Le=x.findIndex(et=>et.id===ge);Le>=0&&(te=Le)}let ee=x.slice();ee.splice(te,0,g),E.applyReorder(G,ee,te)}function gt(){for(let O of Array.from(e.querySelectorAll(".board-column--drag-over")))O.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",O=>{O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move");let $e=O.target.closest(".board-column");$e&&$e!==He&&(He&&He.classList.remove("board-column--drag-over"),$e.classList.add("board-column--drag-over"),He=$e)}),e.addEventListener("dragleave",O=>{let G=O.relatedTarget;(!G||!e.contains(G))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",O=>{O.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let G=O.target,$e=G.closest(".board-column");if(!$e)return;let S=O.dataTransfer?.getData("text/plain")||"";if(!S)return;let g=$e.id,x=ne.get(S);if(x&&x===g){if(l_.has(g)){if(R!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ct(g,S,G)}return}let j=i_[g];if(!j){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(S)!==j&&xt(S,j)}),e.addEventListener("keydown",O=>{let G=O.target;if(!(G instanceof HTMLElement))return;let $e=String(G.tagName||"").toLowerCase();if($e==="input"||$e==="textarea"||$e==="select"||$e==="button"||$e==="a"||G.isContentEditable===!0)return;let S=G.closest(".board-card");if(!S)return;let g=String(O.key||"");if(g==="Enter"||g===" "){O.preventDefault();let ee=S.getAttribute("data-issue-id");ee&&r(ee);return}if(g!=="ArrowUp"&&g!=="ArrowDown"&&g!=="ArrowLeft"&&g!=="ArrowRight")return;O.preventDefault();let x=S.closest(".board-column");if(!x)return;let j=Array.from(x.querySelectorAll(".board-card")),te=j.indexOf(S);if(g==="ArrowDown"&&te<j.length-1){Ce(S,j[te+1]);return}if(g==="ArrowUp"&&te>0){Ce(S,j[te-1]);return}if(g==="ArrowLeft"||g==="ArrowRight"){let ee=Array.from(e.querySelectorAll(".board-column")),ge=ee.indexOf(x),Le=g==="ArrowRight"?1:-1,et=ge+Le;for(;et>=0&&et<ee.length;){let ot=ee[et].querySelector(".board-card");if(ot){Ce(S,ot);return}et+=Le}}});function Ce(O,G){try{O.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let I=null;w&&w.subscribe&&(I=w.subscribe(()=>{try{Y()}catch{}}));let W=null;i&&i.subscribe&&(W=i.subscribe(()=>{try{Y()}catch{}}));let se=null;return l&&l.subscribe&&(se=l.subscribe(()=>{ft()})),{async load(){n("load"),Y()},clear(){Xe(),We(),I&&(I(),I=null),W&&(W(),W=null),se&&(se(),se=null),e.replaceChildren(),F=[],H=[],V=[],ae=[],M=[],D=[],U=new Map,ne=new Map}}}function rs(e,t){return e.filter(n=>{let r=eo(n);return!(r&&t.has(r))})}async function u_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function un(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ur(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ss(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function d_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ur(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ur(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Ln(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await d_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var p_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Tc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},f_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Bt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Lt(e){return typeof e=="string"&&e.length>0?e:null}function Cr(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Rc(e,t,n){let r=Lt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Lt(n[e]);return s===null?null:{value:s,source:"global"}}function os(e,t,n,r){return Rc(e,t,n)||{value:r,source:"base"}}function Da(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Bt(s?.[t])){let a=Lt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Bt(s)){for(let a of Object.values(s))if(Bt(a)){let i=Lt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Lt(r?.runners?.[o]?.models?.[e]?.id)||e}function __(e,t){return Lt(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Cr(e):e;return Et(e,t,r,e,"explicit")}function Oc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Bt(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Bt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function m_(e,t){let n=[],r=e?.implementation?.model_catalog;Bt(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Bt(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function g_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of m_(t,n)){let o=Oc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Na(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Cc(e,t,n){let r=Rc(e,t,n);return r?Rr(r.value,r.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function rn(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Bt(r.session)?r.session:null,o=r?.supported===!0&&Bt(r.orchestration)?r.orchestration:null,a=Bt(e.runner_catalog)?e.runner_catalog:null,i=Lt(n.quick_fix_impl_model),l=g_(i,s,a),u={};if(s){let d=os("workflow_mode",t,n,Lt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Rr(d.value,d.source);for(let M of["spec_review","plan_review","impl_review"]){let D=`${M}_model`,q=Lt(M==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),K=os(D,t,n,q);if(K.value===null)u[D]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(K.value!=="self"&&K.value!=="skip"&&!Bt(s.review?.reviewers?.[K.value]))u[D]=Na(Et(K.value,K.source,"",null,"explicit"));else{let R=__(K.value,s);u[D]=Et(K.value,K.source,Cr(R),R,K.source==="base"?"default":"explicit")}}for(let[M,D]of Object.entries(Tc)){let q=u[D].value;if(q==="self"||q==="skip"){u[M]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let K=Lt(s.review?.reviewers?.[q||""]?.effort),R=os(M,t,n,K);u[M]=R.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(R.value,R.source,R.value,R.value,R.source==="base"?"default":"explicit")}let _=Bt(s.implementation?.default)?s.implementation.default:{},h=Lt(e.route),w=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),E=Bt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=w&&Bt(E[h])?E[h]:{};for(let M of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let D=os(M,t,n,M==="impl_dispatch"?Lt(F.dispatch)||Lt(_.dispatch):Lt(_[M.replace("impl_","")]));u[M]=D.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit")}let H=Lt(t.impl_runtime),V=H==="inherit"?Lt(e.controller_runtime):H,ae=h==="quick_fix"&&Lt(t.impl_dispatch)===null&&l.runtime!==null&&(H===null||V===l.runtime);if(ae){let M=l.runtime,D=i;u.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),H===null&&(u.impl_runtime=Et(M,"global",`${M} (\uC720\uB3C4)`,M,"explicit")),Lt(t.impl_model)===null&&(u.impl_model=Et(D,"global",D,D,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let M of["impl_runtime","impl_model","impl_effort","impl_speed"])u[M]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let M=u.impl_runtime.value==="inherit"?Lt(e.controller_runtime):u.impl_runtime.value,D=M?Oc(M,s,a):[];if(u.impl_model.value!=="auto"&&D.length>0&&!D.includes(u.impl_model.value))u.impl_model=Na(u.impl_model);else{let q=Da(u.impl_model.value,M,s,a);u.impl_model.display=Cr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let M=Lt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),D=M?Lt(s.implementation?.effort_by_transport?.[M]?.auto):null;D&&!f_.has(D)?(u.impl_effort.display=`${D} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=D,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",u.impl_speed.source))}}else for(let d of p_.filter(_=>!_.startsWith("orchestration_")))u[d]=Cc(d,t,n);if(!s){for(let[d,_]of Object.entries(Tc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Cc(d,t,n);continue}let _=d.replace("orchestration_",""),h=Lt(o[_]),w=os(d,t,n,h);if(d==="orchestration_effort"&&w.source==="base"){u[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){u[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let E=w.source==="base"?Lt(o.model_id)||w.value:Da(w.value,null,s,a);u[d]=Et(w.value,w.source,Cr(E),E,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){u[d]=w.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",w.source);continue}u[d]=Rr(w.value,w.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Cr(d)})`,null,"default")}else if(l.runtime!==null){let d=Da(i,l.runtime,s,a);u.quick_fix_impl_model=Et(i,"global",Cr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=Na(Et(i,"global","",null,"explicit")):u.quick_fix_impl_model=Rr(i,"global");return u}function h_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function uo(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return rn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Lt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:h_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Or(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Dc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],as=[...In,"reasoning_output_tokens"],b_={codex:["implementation","review-consult"],claude:["subagent"]};function qa(e){let t=0;for(let n of In)t+=Ut(e?.[n]);return t}function y_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function Lc(e){return!e||typeof e!="object"?!1:as.some(t=>Number.isFinite(e[t]))}function v_(e){let t={};for(let n of as)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ic(e){let t={};for(let n of as)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pc(e,t){return e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):qa(t)}function w_(e){return e==="claude"?"Claude":"Codex"}function k_(e){return`\u03C4 ${Nc(e)}`}function $_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Dc),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${w_(n)} ${k_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:$_(n,r)})}return t}function fo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of as)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Ut(i.breakdown[l])+Ut(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Fa(e){return!e||typeof e!="object"?null:mn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function x_(e){return e==="codex"?"codex":"claude"}function Tn(){return{subtotal:0,breakdown:v_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function po(e,t,n){e.subtotal+=t.subtotal;for(let r of as)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Mc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Nc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Lr(e){return y_(e)?`\u03C4 ${Nc(qa(e))}`:null}function Pn(e){let t=Lr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function is(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${qa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Dc),n.join(`
`)}function mn(e,t){let n={claude:Tn(),codex:Tn()},r={orchestrator:{claude:Tn(),codex:Tn()},implementation:{claude:Tn(),codex:Tn()},"review-consult":{claude:Tn(),codex:Tn()},subagent:{claude:Tn(),codex:Tn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Lc(l)){let d=x_(i.runner),_=Ic(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Pc(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),po(n[d],h,!0),po(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!b_[_].includes(d.role)||!Lc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let w=Ic(d.usage),E={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Pc(_,w)};E.receipt_id=h,typeof d.agent_type=="string"&&(E.agent_type=d.agent_type),typeof d.agent_id=="string"&&(E.agent_id=d.agent_id),typeof d.model=="string"&&(E.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(E.effort=d.effort),typeof d.session_id=="string"?E.session_id=d.session_id:typeof d.thread_id=="string"&&(E.session_id=d.thread_id),typeof d.turn_id=="string"&&(E.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(E.completed_at=d.completed_at),w.replayed===!0&&(E.replayed=!0),po(n[_],E,!1),po(r[E.role][_],E,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=Mc(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...Mc(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Gc,setPrototypeOf:qc,isFrozen:A_,getPrototypeOf:S_,getOwnPropertyDescriptor:E_}=Object,{freeze:Zt,seal:gn,create:Ga}=Object,{apply:Va,construct:Ka}=typeof Reflect<"u"&&Reflect;Zt||(Zt=function(t){return t});gn||(gn=function(t){return t});Va||(Va=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ka||(Ka=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var _o=Qt(Array.prototype.forEach),T_=Qt(Array.prototype.lastIndexOf),Fc=Qt(Array.prototype.pop),ls=Qt(Array.prototype.push),C_=Qt(Array.prototype.splice),go=Qt(String.prototype.toLowerCase),ja=Qt(String.prototype.toString),Ba=Qt(String.prototype.match),cs=Qt(String.prototype.replace),R_=Qt(String.prototype.indexOf),O_=Qt(String.prototype.trim),vn=Qt(Object.prototype.hasOwnProperty),Yt=Qt(RegExp.prototype.test),us=L_(TypeError);function Qt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Va(e,t,r)}}function L_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ka(e,n)}}function lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:go;qc&&qc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(A_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function I_(e){for(let t=0;t<e.length;t++)vn(e,t)||(e[t]=null);return e}function Mn(e){let t=Ga(null);for(let[n,r]of Gc(e))vn(e,n)&&(Array.isArray(r)?t[n]=I_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Mn(r):t[n]=r);return t}function ds(e,t){for(;e!==null;){let r=E_(e,t);if(r){if(r.get)return Qt(r.get);if(typeof r.value=="function")return Qt(r.value)}e=S_(e)}function n(){return null}return n}var jc=Zt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ua=Zt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Wa=Zt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),P_=Zt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),za=Zt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),M_=Zt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Bc=Zt(["#text"]),Uc=Zt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ha=Zt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wc=Zt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mo=Zt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),D_=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),N_=gn(/<%[\w\W]*|[\w\W]*%>/gm),q_=gn(/\$\{[\w\W]*/gm),F_=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),j_=gn(/^aria-[\-\w]+$/),Vc=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),B_=gn(/^(?:\w+script|data):/i),U_=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Kc=gn(/^html$/i),W_=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),zc=Object.freeze({__proto__:null,ARIA_ATTR:j_,ATTR_WHITESPACE:U_,CUSTOM_ELEMENT:W_,DATA_ATTR:F_,DOCTYPE_NAME:Kc,ERB_EXPR:N_,IS_ALLOWED_URI:Vc,IS_SCRIPT_OR_DATA:B_,MUSTACHE_EXPR:D_,TMPLIT_EXPR:q_}),ps={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},z_=function(){return typeof window>"u"?null:window},H_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Hc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Yc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:z_(),t=Ie=>Yc(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ps.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:w}=e,E=l.prototype,F=ds(E,"cloneNode"),H=ds(E,"remove"),V=ds(E,"nextSibling"),ae=ds(E,"childNodes"),M=ds(E,"parentNode");if(typeof a=="function"){let Ie=n.createElement("template");Ie.content&&Ie.content.ownerDocument&&(n=Ie.content.ownerDocument)}let D,q="",{implementation:K,createNodeIterator:R,createDocumentFragment:U,getElementsByTagName:ne}=n,{importNode:Te}=r,Z=Hc();t.isSupported=typeof Gc=="function"&&typeof M=="function"&&K&&K.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:z,TMPLIT_EXPR:Oe,DATA_ATTR:Se,ARIA_ATTR:me,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:xe}=zc,{IS_ALLOWED_URI:Y}=zc,X=null,ye=lt({},[...jc,...Ua,...Wa,...za,...Bc]),_e=null,je=lt({},[...Uc,...Ha,...Wc,...mo]),ie=Object.seal(Ga(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ye=null,st=null,P=Object.seal(Ga(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),fe=!0,we=!0,Ae=!1,Ge=!0,Ne=!1,ze=!0,Je=!1,wt=!1,pt=!1,J=!1,Q=!1,Me=!1,Xe=!0,Re=!1,ke="user-content-",We=!0,Ze=!1,nt={},tt=null,ft=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),kt=null,xt=lt({},["audio","video","img","source","image","track"]),vt=null,Ct=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gt="http://www.w3.org/1998/Math/MathML",He="http://www.w3.org/2000/svg",Ce="http://www.w3.org/1999/xhtml",I=Ce,W=!1,se=null,O=lt({},[gt,He,Ce],ja),G=lt({},["mi","mo","mn","ms","mtext"]),$e=lt({},["annotation-xml"]),S=lt({},["title","style","font","a","script"]),g=null,x=["application/xhtml+xml","text/html"],j="text/html",te=null,ee=null,ge=n.createElement("form"),Le=function(L){return L instanceof RegExp||L instanceof Function},et=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ee&&ee===L)){if((!L||typeof L!="object")&&(L={}),L=Mn(L),g=x.indexOf(L.PARSER_MEDIA_TYPE)===-1?j:L.PARSER_MEDIA_TYPE,te=g==="application/xhtml+xml"?ja:go,X=vn(L,"ALLOWED_TAGS")?lt({},L.ALLOWED_TAGS,te):ye,_e=vn(L,"ALLOWED_ATTR")?lt({},L.ALLOWED_ATTR,te):je,se=vn(L,"ALLOWED_NAMESPACES")?lt({},L.ALLOWED_NAMESPACES,ja):O,vt=vn(L,"ADD_URI_SAFE_ATTR")?lt(Mn(Ct),L.ADD_URI_SAFE_ATTR,te):Ct,kt=vn(L,"ADD_DATA_URI_TAGS")?lt(Mn(xt),L.ADD_DATA_URI_TAGS,te):xt,tt=vn(L,"FORBID_CONTENTS")?lt({},L.FORBID_CONTENTS,te):ft,Ye=vn(L,"FORBID_TAGS")?lt({},L.FORBID_TAGS,te):Mn({}),st=vn(L,"FORBID_ATTR")?lt({},L.FORBID_ATTR,te):Mn({}),nt=vn(L,"USE_PROFILES")?L.USE_PROFILES:!1,fe=L.ALLOW_ARIA_ATTR!==!1,we=L.ALLOW_DATA_ATTR!==!1,Ae=L.ALLOW_UNKNOWN_PROTOCOLS||!1,Ge=L.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=L.SAFE_FOR_TEMPLATES||!1,ze=L.SAFE_FOR_XML!==!1,Je=L.WHOLE_DOCUMENT||!1,J=L.RETURN_DOM||!1,Q=L.RETURN_DOM_FRAGMENT||!1,Me=L.RETURN_TRUSTED_TYPE||!1,pt=L.FORCE_BODY||!1,Xe=L.SANITIZE_DOM!==!1,Re=L.SANITIZE_NAMED_PROPS||!1,We=L.KEEP_CONTENT!==!1,Ze=L.IN_PLACE||!1,Y=L.ALLOWED_URI_REGEXP||Vc,I=L.NAMESPACE||Ce,G=L.MATHML_TEXT_INTEGRATION_POINTS||G,$e=L.HTML_INTEGRATION_POINTS||$e,ie=L.CUSTOM_ELEMENT_HANDLING||{},L.CUSTOM_ELEMENT_HANDLING&&Le(L.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=L.CUSTOM_ELEMENT_HANDLING.tagNameCheck),L.CUSTOM_ELEMENT_HANDLING&&Le(L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),L.CUSTOM_ELEMENT_HANDLING&&typeof L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(we=!1),Q&&(J=!0),nt&&(X=lt({},Bc),_e=[],nt.html===!0&&(lt(X,jc),lt(_e,Uc)),nt.svg===!0&&(lt(X,Ua),lt(_e,Ha),lt(_e,mo)),nt.svgFilters===!0&&(lt(X,Wa),lt(_e,Ha),lt(_e,mo)),nt.mathMl===!0&&(lt(X,za),lt(_e,Wc),lt(_e,mo))),L.ADD_TAGS&&(typeof L.ADD_TAGS=="function"?P.tagCheck=L.ADD_TAGS:(X===ye&&(X=Mn(X)),lt(X,L.ADD_TAGS,te))),L.ADD_ATTR&&(typeof L.ADD_ATTR=="function"?P.attributeCheck=L.ADD_ATTR:(_e===je&&(_e=Mn(_e)),lt(_e,L.ADD_ATTR,te))),L.ADD_URI_SAFE_ATTR&&lt(vt,L.ADD_URI_SAFE_ATTR,te),L.FORBID_CONTENTS&&(tt===ft&&(tt=Mn(tt)),lt(tt,L.FORBID_CONTENTS,te)),We&&(X["#text"]=!0),Je&&lt(X,["html","head","body"]),X.table&&(lt(X,["tbody"]),delete Ye.tbody),L.TRUSTED_TYPES_POLICY){if(typeof L.TRUSTED_TYPES_POLICY.createHTML!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof L.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=L.TRUSTED_TYPES_POLICY,q=D.createHTML("")}else D===void 0&&(D=H_(w,s)),D!==null&&typeof q=="string"&&(q=D.createHTML(""));Zt&&Zt(L),ee=L}},ot=lt({},[...Ua,...Wa,...P_]),De=lt({},[...za,...M_]),it=function(L){let pe=M(L);(!pe||!pe.tagName)&&(pe={namespaceURI:I,tagName:"template"});let Pe=go(L.tagName),ct=go(pe.tagName);return se[L.namespaceURI]?L.namespaceURI===He?pe.namespaceURI===Ce?Pe==="svg":pe.namespaceURI===gt?Pe==="svg"&&(ct==="annotation-xml"||G[ct]):!!ot[Pe]:L.namespaceURI===gt?pe.namespaceURI===Ce?Pe==="math":pe.namespaceURI===He?Pe==="math"&&$e[ct]:!!De[Pe]:L.namespaceURI===Ce?pe.namespaceURI===He&&!$e[ct]||pe.namespaceURI===gt&&!G[ct]?!1:!De[Pe]&&(S[Pe]||!ot[Pe]):!!(g==="application/xhtml+xml"&&se[L.namespaceURI]):!1},Pt=function(L){ls(t.removed,{element:L});try{M(L).removeChild(L)}catch{H(L)}},ht=function(L,pe){try{ls(t.removed,{attribute:pe.getAttributeNode(L),from:pe})}catch{ls(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(L),L==="is")if(J||Q)try{Pt(pe)}catch{}else try{pe.setAttribute(L,"")}catch{}},Vt=function(L){let pe=null,Pe=null;if(pt)L="<remove></remove>"+L;else{let _t=Ba(L,/^[\r\n\t ]+/);Pe=_t&&_t[0]}g==="application/xhtml+xml"&&I===Ce&&(L='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+L+"</body></html>");let ct=D?D.createHTML(L):L;if(I===Ce)try{pe=new h().parseFromString(ct,g)}catch{}if(!pe||!pe.documentElement){pe=K.createDocument(I,"template",null);try{pe.documentElement.innerHTML=W?q:ct}catch{}}let At=pe.body||pe.documentElement;return L&&Pe&&At.insertBefore(n.createTextNode(Pe),At.childNodes[0]||null),I===Ce?ne.call(pe,Je?"html":"body")[0]:Je?pe.documentElement:At},Mt=function(L){return R.call(L.ownerDocument||L,L,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},qt=function(L){return L instanceof _&&(typeof L.nodeName!="string"||typeof L.textContent!="string"||typeof L.removeChild!="function"||!(L.attributes instanceof d)||typeof L.removeAttribute!="function"||typeof L.setAttribute!="function"||typeof L.namespaceURI!="string"||typeof L.insertBefore!="function"||typeof L.hasChildNodes!="function")},Gt=function(L){return typeof i=="function"&&L instanceof i};function jt(Ie,L,pe){_o(Ie,Pe=>{Pe.call(t,L,pe,ee)})}let Dt=function(L){let pe=null;if(jt(Z.beforeSanitizeElements,L,null),qt(L))return Pt(L),!0;let Pe=te(L.nodeName);if(jt(Z.uponSanitizeElement,L,{tagName:Pe,allowedTags:X}),ze&&L.hasChildNodes()&&!Gt(L.firstElementChild)&&Yt(/<[/\w!]/g,L.innerHTML)&&Yt(/<[/\w!]/g,L.textContent)||L.nodeType===ps.progressingInstruction||ze&&L.nodeType===ps.comment&&Yt(/<[/\w]/g,L.data))return Pt(L),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(Pe))&&(!X[Pe]||Ye[Pe])){if(!Ye[Pe]&&Jt(Pe)&&(ie.tagNameCheck instanceof RegExp&&Yt(ie.tagNameCheck,Pe)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(Pe)))return!1;if(We&&!tt[Pe]){let ct=M(L)||L.parentNode,At=ae(L)||L.childNodes;if(At&&ct){let _t=At.length;for(let It=_t-1;It>=0;--It){let Ft=F(At[It],!0);Ft.__removalCount=(L.__removalCount||0)+1,ct.insertBefore(Ft,V(L))}}}return Pt(L),!0}return L instanceof l&&!it(L)||(Pe==="noscript"||Pe==="noembed"||Pe==="noframes")&&Yt(/<\/no(script|embed|frames)/i,L.innerHTML)?(Pt(L),!0):(Ne&&L.nodeType===ps.text&&(pe=L.textContent,_o([ce,z,Oe],ct=>{pe=cs(pe,ct," ")}),L.textContent!==pe&&(ls(t.removed,{element:L.cloneNode()}),L.textContent=pe)),jt(Z.afterSanitizeElements,L,null),!1)},Ue=function(L,pe,Pe){if(Xe&&(pe==="id"||pe==="name")&&(Pe in n||Pe in ge))return!1;if(!(we&&!st[pe]&&Yt(Se,pe))){if(!(fe&&Yt(me,pe))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(pe,L))){if(!_e[pe]||st[pe]){if(!(Jt(L)&&(ie.tagNameCheck instanceof RegExp&&Yt(ie.tagNameCheck,L)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(L))&&(ie.attributeNameCheck instanceof RegExp&&Yt(ie.attributeNameCheck,pe)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(pe,L))||pe==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&Yt(ie.tagNameCheck,Pe)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(Pe))))return!1}else if(!vt[pe]){if(!Yt(Y,cs(Pe,ve,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&L!=="script"&&R_(Pe,"data:")===0&&kt[L])){if(!(Ae&&!Yt(le,cs(Pe,ve,"")))){if(Pe)return!1}}}}}}}return!0},Jt=function(L){return L!=="annotation-xml"&&Ba(L,xe)},Kt=function(L){jt(Z.beforeSanitizeAttributes,L,null);let{attributes:pe}=L;if(!pe||qt(L))return;let Pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},ct=pe.length;for(;ct--;){let At=pe[ct],{name:_t,namespaceURI:It,value:Ft}=At,v=te(_t),y=Ft,$=_t==="value"?y:O_(y);if(Pe.attrName=v,Pe.attrValue=$,Pe.keepAttr=!0,Pe.forceKeepAttr=void 0,jt(Z.uponSanitizeAttribute,L,Pe),$=Pe.attrValue,Re&&(v==="id"||v==="name")&&(ht(_t,L),$=ke+$),ze&&Yt(/((--!?|])>)|<\/(style|title|textarea)/i,$)){ht(_t,L);continue}if(v==="attributename"&&Ba($,"href")){ht(_t,L);continue}if(Pe.forceKeepAttr)continue;if(!Pe.keepAttr){ht(_t,L);continue}if(!Ge&&Yt(/\/>/i,$)){ht(_t,L);continue}Ne&&_o([ce,z,Oe],re=>{$=cs($,re," ")});let N=te(L.nodeName);if(!Ue(N,v,$)){ht(_t,L);continue}if(D&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!It)switch(w.getAttributeType(N,v)){case"TrustedHTML":{$=D.createHTML($);break}case"TrustedScriptURL":{$=D.createScriptURL($);break}}if($!==y)try{It?L.setAttributeNS(It,_t,$):L.setAttribute(_t,$),qt(L)?Pt(L):Fc(t.removed)}catch{ht(_t,L)}}jt(Z.afterSanitizeAttributes,L,null)},at=function Ie(L){let pe=null,Pe=Mt(L);for(jt(Z.beforeSanitizeShadowDOM,L,null);pe=Pe.nextNode();)jt(Z.uponSanitizeShadowNode,pe,null),Dt(pe),Kt(pe),pe.content instanceof o&&Ie(pe.content);jt(Z.afterSanitizeShadowDOM,L,null)};return t.sanitize=function(Ie){let L=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Pe=null,ct=null,At=null;if(W=!Ie,W&&(Ie="<!-->"),typeof Ie!="string"&&!Gt(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw us("dirty is not a string, aborting")}else throw us("toString is not a function");if(!t.isSupported)return Ie;if(wt||et(L),t.removed=[],typeof Ie=="string"&&(Ze=!1),Ze){if(Ie.nodeName){let Ft=te(Ie.nodeName);if(!X[Ft]||Ye[Ft])throw us("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)pe=Vt("<!---->"),Pe=pe.ownerDocument.importNode(Ie,!0),Pe.nodeType===ps.element&&Pe.nodeName==="BODY"||Pe.nodeName==="HTML"?pe=Pe:pe.appendChild(Pe);else{if(!J&&!Ne&&!Je&&Ie.indexOf("<")===-1)return D&&Me?D.createHTML(Ie):Ie;if(pe=Vt(Ie),!pe)return J?null:Me?q:""}pe&&pt&&Pt(pe.firstChild);let _t=Mt(Ze?Ie:pe);for(;ct=_t.nextNode();)Dt(ct),Kt(ct),ct.content instanceof o&&at(ct.content);if(Ze)return Ie;if(J){if(Q)for(At=U.call(pe.ownerDocument);pe.firstChild;)At.appendChild(pe.firstChild);else At=pe;return(_e.shadowroot||_e.shadowrootmode)&&(At=Te.call(r,At,!0)),At}let It=Je?pe.outerHTML:pe.innerHTML;return Je&&X["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Yt(Kc,pe.ownerDocument.doctype.name)&&(It="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+It),Ne&&_o([ce,z,Oe],Ft=>{It=cs(It,Ft," ")}),D&&Me?D.createHTML(It):It},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(Ie),wt=!0},t.clearConfig=function(){ee=null,wt=!1},t.isValidAttribute=function(Ie,L,pe){ee||et({});let Pe=te(Ie),ct=te(L);return Ue(Pe,ct,pe)},t.addHook=function(Ie,L){typeof L=="function"&&ls(Z[Ie],L)},t.removeHook=function(Ie,L){if(L!==void 0){let pe=T_(Z[Ie],L);return pe===-1?void 0:C_(Z[Ie],pe,1)[0]}return Fc(Z[Ie])},t.removeHooks=function(Ie){Z[Ie]=[]},t.removeAllHooks=function(){Z=Hc()},t}var Zc=Yc();var Dn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ho=e=>(...t)=>({_$litDirective$:e,values:t}),Ir=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var fs=class extends Ir{constructor(t){if(super(t),this.it=Nt,t.type!==Dn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Nt||t==null)return this._t=void 0,this.it=t;if(t===fn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};fs.directiveName="unsafeHTML",fs.resultType=1;var Qc=ho(fs);function Xa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pr=Xa();function su(e){pr=e}var hs={exec:()=>null};function dt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Xt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var G_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},V_=/^(?:[ \t]*(?:\n|$))+/,K_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Y_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Z_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ja=/(?:[*+-]|\d{1,9}[.)])/,ou=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,au=dt(ou).replace(/bull/g,Ja).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Q_=dt(ou).replace(/bull/g,Ja).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ei=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,X_=/^[^\n]+/,ti=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,J_=dt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ti).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),em=dt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ja).getRegex(),$o="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ni=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,tm=dt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ni).replace("tag",$o).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),iu=dt(ei).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),nm=dt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",iu).getRegex(),ri={blockquote:nm,code:K_,def:J_,fences:Y_,heading:Z_,hr:bs,html:tm,lheading:au,list:em,newline:V_,paragraph:iu,table:hs,text:X_},Xc=dt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex(),rm={...ri,lheading:Q_,table:Xc,paragraph:dt(ei).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$o).getRegex()},sm={...ri,html:dt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ni).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:dt(ei).replace("hr",bs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",au).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},om=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,am=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,lu=/^( {2,}|\\)\n(?!\s*$)/,im=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xo=/[\p{P}\p{S}]/u,si=/[\s\p{P}\p{S}]/u,cu=/[^\s\p{P}\p{S}]/u,lm=dt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,si).getRegex(),uu=/(?!~)[\p{P}\p{S}]/u,cm=/(?!~)[\s\p{P}\p{S}]/u,um=/(?:[^\s\p{P}\p{S}]|~)/u,dm=dt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",G_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),du=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pm=dt(du,"u").replace(/punct/g,xo).getRegex(),fm=dt(du,"u").replace(/punct/g,uu).getRegex(),pu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",_m=dt(pu,"gu").replace(/notPunctSpace/g,cu).replace(/punctSpace/g,si).replace(/punct/g,xo).getRegex(),mm=dt(pu,"gu").replace(/notPunctSpace/g,um).replace(/punctSpace/g,cm).replace(/punct/g,uu).getRegex(),gm=dt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,cu).replace(/punctSpace/g,si).replace(/punct/g,xo).getRegex(),hm=dt(/\\(punct)/,"gu").replace(/punct/g,xo).getRegex(),bm=dt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ym=dt(ni).replace("(?:-->|$)","-->").getRegex(),vm=dt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ym).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,wm=dt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fu=dt(/^!?\[(label)\]\[(ref)\]/).replace("label",vo).replace("ref",ti).getRegex(),_u=dt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ti).getRegex(),km=dt("reflink|nolink(?!\\()","g").replace("reflink",fu).replace("nolink",_u).getRegex(),Jc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oi={_backpedal:hs,anyPunctuation:hm,autolink:bm,blockSkip:dm,br:lu,code:am,del:hs,emStrongLDelim:pm,emStrongRDelimAst:_m,emStrongRDelimUnd:gm,escape:om,link:wm,nolink:_u,punctuation:lm,reflink:fu,reflinkSearch:km,tag:vm,text:im,url:hs},$m={...oi,link:dt(/^!?\[(label)\]\((.*?)\)/).replace("label",vo).getRegex(),reflink:dt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vo).getRegex()},Ya={...oi,emStrongRDelimAst:mm,emStrongLDelim:fm,url:dt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Jc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:dt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Jc).getRegex()},xm={...Ya,br:dt(lu).replace("{2,}","*").getRegex(),text:dt(Ya.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},bo={normal:ri,gfm:rm,pedantic:sm},_s={normal:oi,gfm:Ya,breaks:xm,pedantic:$m},Am={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},eu=e=>Am[e];function Nn(e,t){if(t){if(Xt.escapeTest.test(e))return e.replace(Xt.escapeReplace,eu)}else if(Xt.escapeTestNoEncode.test(e))return e.replace(Xt.escapeReplaceNoEncode,eu);return e}function tu(e){try{e=encodeURI(e).replace(Xt.percentDecode,"%")}catch{return null}return e}function nu(e,t){let n=e.replace(Xt.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(Xt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Xt.slashPipe,"|");return r}function ms(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Sm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ru(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Em(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var wo=class{constructor(e){$t(this,"options");$t(this,"rules");$t(this,"lexer");this.options=e||pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ms(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Em(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ms(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ms(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ms(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,E=w.raw+`
`+n.join(`
`),F=this.blockquote(E);o[o.length-1]=F,r=r.substring(0,r.length-w.raw.length)+F.raw,s=s.substring(0,s.length-w.text.length)+F.text;break}else if(h?.type==="list"){let w=h,E=w.raw+`
`+n.join(`
`),F=this.list(E);o[o.length-1]=F,r=r.substring(0,r.length-h.raw.length)+F.raw,s=s.substring(0,s.length-w.raw.length)+F.raw,n=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],w=!_.trim(),E=0;if(this.options.pedantic?(E=2,d=_.trimStart()):w?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,d=_.slice(E),E+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(E),H=this.rules.other.hrRegex(E),V=this.rules.other.fencesBeginRegex(E),ae=this.rules.other.headingBeginRegex(E),M=this.rules.other.htmlBeginRegex(E);for(;e;){let D=e.split(`
`,1)[0],q;if(h=D,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),q=h):q=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||ae.test(h)||M.test(h)||F.test(h)||H.test(h))break;if(q.search(this.rules.other.nonSpaceChar)>=E||!h.trim())d+=`
`+q.slice(E);else{if(w||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||ae.test(_)||H.test(_))break;d+=`
`+h}!w&&!h.trim()&&(w=!0),u+=D+`
`,e=e.substring(D.length+1),_=q.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=nu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(nu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ms(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Sm(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ru(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return ru(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let w=_.slice(1,-1);return{type:"em",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},wn=class Za{constructor(t){$t(this,"tokens");$t(this,"options");$t(this,"state");$t(this,"inlineQueue");$t(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pr,this.options.tokenizer=this.options.tokenizer||new wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Xt,block:bo.normal,inline:_s.normal};this.options.pedantic?(n.block=bo.pedantic,n.inline=_s.pedantic):this.options.gfm&&(n.block=bo.gfm,this.options.breaks?n.inline=_s.breaks:n.inline=_s.gfm),this.tokenizer.rules=n}static get rules(){return{block:bo,inline:_s}}static lex(t,n){return new Za(n).lex(t)}static lexInline(t,n){return new Za(n).inlineTokens(t)}lex(t){t=t.replace(Xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Xt.tabCharGlobal,"    ").replace(Xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ko=class{constructor(e){$t(this,"options");$t(this,"parser");this.options=e||pr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Xt.notSpaceStart)?.[0],s=e.replace(Xt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Nn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=tu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Nn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=tu(e);if(s===null)return Nn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Nn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Nn(e.text)}},ai=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},kn=class Qa{constructor(t){$t(this,"options");$t(this,"renderer");$t(this,"textRenderer");this.options=t||pr,this.options.renderer=this.options.renderer||new ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ai}static parse(t,n){return new Qa(n).parse(t)}static parseInline(t,n){return new Qa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},yo,gs=(yo=class{constructor(e){$t(this,"options");$t(this,"block");this.options=e||pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?wn.lex:wn.lexInline}provideParser(){return this.block?kn.parse:kn.parseInline}},$t(yo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$t(yo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),yo),Tm=class{constructor(...e){$t(this,"defaults",Xa());$t(this,"options",this.setOptions);$t(this,"parse",this.parseMarkdown(!0));$t(this,"parseInline",this.parseMarkdown(!1));$t(this,"Parser",kn);$t(this,"Renderer",ko);$t(this,"TextRenderer",ai);$t(this,"Lexer",wn);$t(this,"Tokenizer",wo);$t(this,"Hooks",gs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new ko(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new gs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];gs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&gs.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return wn.lex(e,t??this.defaults)}parser(e,t){return kn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?wn.lex:wn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?kn.parse:kn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?wn.lex:wn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?kn.parse:kn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Nn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},dr=new Tm;function yt(e,t){return dr.parse(e,t)}yt.options=yt.setOptions=function(e){return dr.setOptions(e),yt.defaults=dr.defaults,su(yt.defaults),yt};yt.getDefaults=Xa;yt.defaults=pr;yt.use=function(...e){return dr.use(...e),yt.defaults=dr.defaults,su(yt.defaults),yt};yt.walkTokens=function(e,t){return dr.walkTokens(e,t)};yt.parseInline=dr.parseInline;yt.Parser=kn;yt.parser=kn.parse;yt.Renderer=ko;yt.TextRenderer=ai;yt.Lexer=wn;yt.lexer=wn.lex;yt.Tokenizer=wo;yt.Hooks=gs;yt.parse=yt;var Yv=yt.options,Zv=yt.setOptions,Qv=yt.use,Xv=yt.walkTokens,Jv=yt.parseInline;var ew=kn.parse,tw=wn.lex;function Gn(e){let t=yt.parse(e),n=Zc.sanitize(t);return Qc(n)}function qn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Pr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var gu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Cm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Rm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Om=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function ii(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function li(e,t){let n=ii(e),r=ii(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function hu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Cn(s)&&typeof s.text=="string"?s.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Lm(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:gu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ii(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=li(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=li(Cn(i)?i.old_string:"",Cn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ci(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ui(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Rm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Om.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Im(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Pm(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Cn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(ui(a.text));else if(a.type==="thinking"){let i=ci(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Lm(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?mu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Cn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=hu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?mu([s],n):[s]}return[]}function mu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Mm(e){let t=typeof e.command=="string"?e.command:"",n=hu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:gu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Dm(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ui(t.text)];if(t.type==="reasoning"){let n=ci(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Mm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Nm(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ui(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=ci(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Cm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function qm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Fm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function bu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Fm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Im(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Nm(o):qm(o)?Dm(o):Pm(o,n);return a.length>0&&(r.progress=null),a}}}function di(e){let t=[],n=bu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var jm=5,Bm=10,Um=/Task\s+#(\d+)/,Wm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,zm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function So(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Hm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Gm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Vm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Um.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Km(e){if(e.tool==="Bash"){let t=e.command||"";return Wm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":zm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ym(e){let t=e.filter(s=>s.kind==="tool").slice(-Bm),n=new Map;t.forEach((s,o)=>{let a=Km(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Zm(e){let t=Gm(e);if(t)return{text:t,guess:!1};let n=Vm(e);if(n)return{text:n,guess:!1};let r=Ym(e);return r?{text:r,guess:!0}:null}function Qm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:cn(e,t)}function Mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=!1,d={},_=!0,h=new Set,w=new Set,E=null,F=null,H=!1,V=!1,ae=!1,M=null,D=null;function q(){H=!1,V=!1,ae=!1,M=null,D=null}async function K(J){if(n){V=!0,ae=!1,ie();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...l?{root_dir:l}:{}}));if(o!==J)return;!Q||typeof Q!="object"||Array.isArray(Q)?ae=!0:(M=Q,D=J)}catch{o===J&&(ae=!0)}finally{o===J&&(V=!1,ie())}}}function R(){if(H=!H,H&&o&&D!==o){K(o);return}ie()}function U(){if(!H)return"";let J=Pr({loading:V,error:ae});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!M)return"";if(M.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ao(M.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function ne(){if(!i||!r)return[];let J=r.get(i);return di(J?J.lines:[])}function Te(){if(!i||!r)return null;let J=r.get(i),Q=J?J.last_event_at:null;return typeof Q=="number"?Q:null}function Z(){return d.status==="running"}function ce(){if(Z()&&o){F||(F=setInterval(()=>ie(),1e3));return}z()}function z(){F&&(clearInterval(F),F=null)}function Oe(J){let Q=[],Me=0;for(;Me<J.length;){let{idx:Xe,line:Re}=J[Me];if(Re.kind==="tool"){let ke=Me;for(;ke<J.length&&J[ke].line.kind==="tool"&&J[ke].line.tool===Re.tool;)ke+=1;if(ke-Me>=jm&&!w.has(Xe)){Q.push({kind:"group",idx:Xe,tool:Re.tool||"",lines:J.slice(Me,ke)}),Me=ke;continue}}Q.push({kind:"line",idx:Xe,line:Re}),Me+=1}return Q}function Se(J){let Q=[],Me=new Map;for(let ke=0;ke<J.length;ke+=1){let We=J[ke],Ze=We.parent_tool_use_id;if(typeof Ze=="string"&&Ze.length>0){let nt=Me.get(Ze);nt||(nt={kind:"subagent",idx:ke,launch_id:Ze,agent_type:null,header:null,lines:[]},Me.set(Ze,nt),Q.push(nt)),nt.lines.push({idx:ke,line:We});continue}if(We.kind==="tool"&&We.tool==="Agent"&&typeof We.launch_id=="string"&&We.launch_id.length>0){let nt=me(We),tt=Me.get(We.launch_id);if(tt){tt.header={idx:ke,line:We},tt.agent_type=nt;continue}let ft={kind:"subagent",idx:ke,launch_id:We.launch_id,agent_type:nt,header:{idx:ke,line:We},lines:[]};Me.set(We.launch_id,ft),Q.push(ft);continue}Q.push({kind:"entry",idx:ke,line:We})}let Xe=[],Re=0;for(;Re<Q.length;){if(Q[Re].kind!=="entry"){Xe.push(Q[Re]),Re+=1;continue}let ke=Re;for(;ke<Q.length&&Q[ke].kind==="entry";)ke+=1;Xe.push(...Oe(Q.slice(Re,ke))),Re=ke}return Xe}function me(J){let Q=J.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function le(J){for(let Q=J.length-1;Q>=0;Q-=1){let Me=J[Q];if(Me.kind==="result"||Me.kind==="error")return null;if(Me.kind==="tool"&&!Object.hasOwn(Me,"result"))return Me}return null}function ve(J){for(let Q=J.length-1;Q>=0;Q-=1)if(J[Q].kind==="thinking")return J[Q];return null}function xe(J,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Gn(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Me=h.has(J);return c`<div
        class="sv__think${Me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>st(J)}
      >
        <span class="sv__think-line">💭 ${So(Q.text)}</span>
        ${Me?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Me=h.has(J),Xe=Q.tool==="Bash"?Hm(Q.command):0,Re=Q.tool==="Bash"?Xe>1?So(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>st(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Re?c`<span class="sv__tool-detail">${Re}</span>`:""}
          ${Xe>1?c`<span class="sv__tool-more">⋯ ${Xe}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Me?c`<pre class="sv__tool-expand">${Y(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Gn(Q.text||"")}</div>`}function Y(J){let Q=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)Q.push(J.command);else if(J.input!==void 0)try{Q.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&Q.push(`output:
${J.output}`),Q.join(`

`)}function X(){if(!o)return c``;let J=ne(),Q=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Me=d.session_id||"",Xe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,Re=Z(),ke=Re?Qm(Te(),Date.now()):"",We=Re?le(J):null,Ze=Re?ve(J):null,nt=Zm(J);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${nt?c`<span
              class="sv__stage${nt.guess?" sv__stage--guess":""}"
              title=${nt.text}
              >${nt.text}</span
            >`:""}
        ${Re?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ke?c`<span class="sv__live-ago">${ke}</span>`:""}</span
            >`:""}
        ${Me?c`<button
              type="button"
              class="sv__session"
              title=${Me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Me}`}
              @click=${()=>fe(Me)}
            >
              ⧉ ${Me.slice(0,8)}
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${d.worktree?c`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":c`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${R}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${Xe}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${Xe}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>pt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":U()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Se(J).map(tt=>tt.kind==="subagent"?_e(tt):tt.kind==="group"?ye(tt):xe(tt.idx,tt.line))}
      </div>
      ${We||Ze?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${We?c`<span class="sv__now-icon">${We.icon}</span>
                  <span class="sv__now-name">${We.tool}</span>
                  <span class="sv__now-detail"
                    >${We.tool==="Bash"?So(We.command):We.path||We.command||""}</span
                  >`:""}
            ${Ze?c`<span class="sv__now-think"
                  >💭 ${So(Ze.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ye(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>je(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function _e(J){let Q=w.has(J.idx),Me=J.header?J.header.line:null,Xe=Me?Me.is_error===!0?"\u2717":typeof Me.result=="string"?"\u2713":"\u27F3":"",Re=Me&&Me.command?Me.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>je(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${Re?c`<span class="sv__sub-detail">${Re}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${Xe?c`<span class="sv__sub-state">${Xe}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Oe(J.lines).map(ke=>ke.kind==="group"?ye(ke):xe(ke.idx,ke.line))}
          </div>`:""}
    </div>`}function je(J){w.add(J),ie()}function ie(){Ke(X(),e),ce(),_&&Ye()}function Ye(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function st(J){h.has(J)?h.delete(J):h.add(J),ie()}function P(){_=!_,ie()}function fe(J){un(J).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function we(J){!o||!J||(d={...d,...J},ie())}function Ae(J){let Q=J.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&_&&(_=!1,ie())}e.addEventListener("scroll",Ae,!0);function Ge(J){let Q=J.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||pt()}let Ne=!1;function ze(){Ne||(document.addEventListener("mousedown",Ge),Ne=!0)}function Je(){Ne&&(document.removeEventListener("mousedown",Ge),Ne=!1)}function wt(J){let Q=J&&J.attempt_id;if(!Q)return;let Me=i;o=Q,a=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Me&&Me!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Me})).catch(()=>{}),l=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,d=J.meta||{},u=J.hide_prompt===!0,_=!0,h.clear(),w.clear(),q(),!E&&r&&(E=r.subscribe(ie)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...l?{root_dir:l}:{}})).catch(()=>{}),ze(),ie()}function pt(){let J=i;Je(),o=null,a=null,i=null,l=null,u=!1,h.clear(),w.clear(),q(),z(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),Ke(c``,e),s&&s()}return{open:wt,updateMeta:we,close:pt,isOpen(){return o!==null},destroy(){z(),Je(),E&&(E(),E=null),e.removeEventListener("scroll",Ae,!0),o=null,a=null,i=null,l=null,u=!1,Ke(c``,e)}}}function Eo(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=pi(t.spec_id),s=pi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function pi(e){return typeof e=="string"?e.trim():""}function yu(e){let t=Eo(e);if(t.path)return t;let n=pi(Xm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Xm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Jm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function eg(e){let t=e&&e.metadata||{},n=yu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Jm(t)?null:"plan_pending"}),r}function vu(e,t){let n=eg(e);return c`
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
  `}var tg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ng=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,rg=/^\*\*결론\*\* — (.+)$/;function To(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==tg)return null;let n=ng.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?rg.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var wu=20;function ku(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function sg(e){return e.length>wu?`${e.slice(0,wu)}\u2026`:e}function og(e,t,n,r){let s=`${t.lane} ${sg(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ku(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Gn(t.body)}
        </div>`:""}
  </div>`}function ag(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ku(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Gn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function $u(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=To(typeof l.text=="string"?l.text:"");return u?og(l,u,t,s.has(l.id)):ag(l)})}
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
  `}var{I:Dw}=Ul;var xu=e=>e.strings===void 0;var ig={},Au=(e,t=ig)=>e._$AH=t;var fr=ho(class extends Ir{constructor(e){if(super(e),e.type!==Dn.PROPERTY&&e.type!==Dn.ATTRIBUTE&&e.type!==Dn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!xu(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===fn||t===Nt)return t;let n=e.element,r=e.name;if(e.type===Dn.PROPERTY){if(t===n[r])return fn}else if(e.type===Dn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return fn}else if(e.type===Dn.ATTRIBUTE&&n.getAttribute(r)===t+"")return fn;return Au(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],_i=[...Co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Fn=["orchestration_model","orchestration_effort","orchestration_speed"],Ro=[...Co,...Fn],lg=_i.filter(e=>Ro.includes(e)),Su=["delegated","main"],Oo=["inherit","claude","codex"],ys=["default","fast"],vs=["standard","fast_track"],ws=["codex","opus","fable","self","skip"],Lo=["codex","fable","skip"],Io=["low","medium","high","xhigh"],pn="auto";function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Eu(e){if(!dn(e)||!dn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))dn(r)&&dn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Dr(e,t){let n=Eu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[pn,...r.flatMap(([,s])=>s)]}function Tu(e,t,n,r){if(!dn(e)||!dn(e.runners))return[pn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!dn(a)||!dn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==pn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[pn,...s]}function Nr(e,t,n){return Tu(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function mi(e,t,n){return Tu(e,t,n,(r,s)=>dn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:dn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ks(e,t){let n=Eu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Cu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Dr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Nr(t,s,r.impl_model||pn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var cg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},fi=[...lg,...Fn],ug=[...Ro,..._i].filter((e,t,n)=>n.indexOf(e)===t&&!fi.includes(e));function Ru(e,t){let n=dn(e)?e:{},r=dn(t)?t:{},s=[];for(let a of fi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:cg[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...ug,...Object.keys(r)])!fi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function gi(e,t,n,r,s,o){return uo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Ou(e,t){let n={};for(let r of _i){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Lu(e,t){let n={};for(let r of Fn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var hi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fn]}],Vn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function bi(e,t,n,r,s,o=null){let a=rn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Iu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of bi(e,t,n,r,s,o))a[i.source]+=1;return a}function Pu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Mu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Vw=[...Co,...Fn];var dg=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],yi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Du={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},pg={pin:"pin",global:"global",base:"base"};function fg(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${pg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function _g(e,t,n){switch(e){case"workflow_mode":return vs;case"spec_review_model":case"impl_review_model":return ws;case"plan_review_model":return Lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Io;case"impl_dispatch":return Su;case"impl_runtime":return Oo;case"impl_model":return Dr(n,t.impl_runtime);case"impl_effort":return Nr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ys;case"orchestration_model":return ks(n,null);case"orchestration_effort":return Nr(n,void 0,t.orchestration_model||pn).filter(r=>r!==pn);default:return[]}}function mg(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${fg(e.source)}
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
  </div>`}function Nu(e,t){let n=hi.flatMap(l=>l.keys),r=bi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Iu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${gg(o)}</span
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
          ${hi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=uo({key:u.key,choices:_g(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return mg(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function gg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function hg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function qu(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=hg(n.exec_receipt),l=i?On(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=lo(n.planned_execution,n.exec_receipt),_=n.chips?.pr?.number,h=typeof _=="number"?`PR #${_}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${h}</a
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
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${bg(s).map(w=>yg(w,t,r,{label:w.id==="pr"?h:w.label,href:w.id==="pr"?o:""}))}
    </div>
  </section>`}function bg(e){let n=typeof e=="string"&&Object.hasOwn(yi,e)&&yi[e]||yi.spec_backed;return dg.filter(r=>n.includes(r.id))}var Mo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function yg(e,t,n,r){let s=vg(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",_=u?Mo.stale:i?Mo.on:l?Mo.current:Mo.none,h=wg(e,n),w=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,E=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,F=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${E}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${w}
      >${F}</a
    >`:c`<span
    class=${E}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${w}
    >${F}</span
  >`}function vg(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function wg(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Du,n)?Du[n]:""}function Do(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fu(e){return Do(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function ju(e,t){let n=e&&e[t];if(!Do(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Fu),s=Fu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Wu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function No(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Wu(e)}${t}`}function qr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Wu(e)}`}function kg(e,t,n){if(n!==null){let s=e==="claude"?No:qr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:qr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Bu(e,t){if(!Do(e)||e.state!=="usable"||!Do(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Uu(e){let t=e.provider_key==="claude"?No:qr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${kg(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function zu({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Uu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:ju(t,"claude"),selected:s,workspace_default:Bu(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Uu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:ju(t,"codex"),selected:o,workspace_default:Bu(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Hu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function $s(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qo(e){if(!$s(e)||!$s(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>$s(n)&&$s(n.models));return t.length>0?t:null}function $n(e,t){let n=qo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Gu(e,t){return $s(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Vu(e,t){let n=qo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Gu(r,r.models[t]);return[]}function $g(e){let t=qo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Gu(r,s))n.includes(o)||n.push(o);return n}function xg(e,t){if(!t)return $g(e);let r=qo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Vu(e,o))s.includes(a)||s.push(a);return s}function Ku(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=$n(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Vu(t,r.impl_model):xg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ag(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Sg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),w())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ag(s)}</span
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
    `:c``}function _(){Ke(d(),e)}async function h(F,H={}){s=F,o="loading",a="",i=null,l="",_();let V=H.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ae="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(F);try{let M=await r(ae),D=await M.json().catch(()=>({}));if(!M.ok||!D||D.ok!==!0){if(D?.error==="not_found"&&H.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(D&&D.error||M.status)+")",_();return}let q=Sg(String(D.content||""));i=q.front,a=q.body,o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Ke(c``,e)}function E(){document.removeEventListener("keydown",u),w()}return{open:h,close:w,destroy:E}}var Eg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Qu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",jo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Tg=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Yu(e){return typeof e=="string"&&Tg.has(e)}var Cg=["running","done","failed","interrupted"],Rg={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Og(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Lg(e){let t=zt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Lr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Qu}
          >부분 집계</span
        >`:""}`}function Zu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ki(e){if(typeof e=="number")return Bo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Bo(t):""}function Ig(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Pg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function vi(e){return e===null||typeof e=="string"&&e.trim().length>0}function wi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Mg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!jo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?vi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||vi(t.effort))||!(!("agent_type"in t)||vi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Cg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!wi(t.started_at)||!wi(t.last_event_at)||!wi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Dg(e,t,n){let s=zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ki(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${ki(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Ng(e,t,n,r){let s=e.status==="running"?null:t,a=(s?zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Bo(e.last_event_at):s?ki(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Ig(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Pg(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Rg[e.status]}</span
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
  </button>`}function qg(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Fg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=Mg(d);!_||s.has(_.launch_id)||Yu(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of jo){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=jo.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:_}of jo){for(let h of r.filter(w=>w.role===d&&w.provider===_)){let w=i.find(E=>E.receipt_id===h.launch_id)||null;w&&!qg(h,w)||(w&&l.add(w.receipt_id),u.push(Ng(h,w,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Yu(h.agent_type)&&u.push(Dg(d,_,h))}return u}function jg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Eg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Og(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Qu}</span>`:""}
  </div>`}var Bg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Bo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ug(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Xu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),w=_&&!h,E=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!w}
      title=${E}
      @click=${F=>{F.stopPropagation(),w&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let d=Zu(Fa(u));if(zt(d).length===0&&!Lr(u.usage))return"";let _=s.has(u.attempt_id);return c`<button
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
      세션 이력${Lg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let d=Fa(u),_=Zu(d),h=zt(_);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Bg[u.status||""]||"\xB7"}</span
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
            <span class="detail-session__time">${Bo(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${Ug(u)}
          ${s.has(u.attempt_id)&&u.usage?jg(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Fg(u,d,t)}
        </div>`})}
    </div>
  `}function Ju(e,t={}){return c`
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
          ${Wg(e)}
        </div>`:""}
  `}function Wg(e){let t=Pr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?qn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ao(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var zg=["open","in_progress","deferred","resolved","closed"],Hg=[0,1,2,3,4];function ed(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},h="",w=!1,E=[],F=!1,H={},V={claude:null,codex:null},ae=null,M=null,D=0,q=!1,K=!1,R="",U="",ne="";function Te(){q=!1,K=!1,R="",U="",ne=""}function Z(){V={claude:null,codex:null},ae=null,M=null,D+=1}async function ce(){if(!s)return null;try{let f=await Promise.resolve(s("get-workspace-accounts",{}));return f&&typeof f.state=="string"?f:null}catch{return null}}async function z(f){try{let T=await fetch(f);if(!T.ok)return null;let C=await T.json();if(!C||typeof C!="object"||!Array.isArray(C.accounts))return null;let ue=C.accounts.filter(Ee=>Ee!==null&&typeof Ee=="object"&&!Array.isArray(Ee));return{accounts:ue,active:ue.find(Ee=>Ee.active===!0)||null}}catch{return null}}async function Oe(f){M=f;let T=++D,[C,ue,Ee]=await Promise.all([z("/api/claude-usage"),z("/api/codex-usage"),ce()]);T!==D||f!==u||(V={claude:C,codex:ue},ae=Ee,b())}let Se=[],me=null,le=null,ve=!1,xe="",Y=!1,X=0,ye=new Set;function _e(){Se=[],me=null,le=null,ve=!1,xe="",Y=!1,X+=1,ye.clear()}async function je(f){if(!s)return;let T=++X;try{let C=await Promise.resolve(s("get-comments",{id:f}));if(T!==X||f!==u)return;Se=Array.isArray(C)?C:[],ve=!1}catch{if(T!==X||f!==u)return;ve=!0}b()}function ie(){if(!s||!u)return;let f=d&&typeof d.comment_count=="number"?d.comment_count:null;if(me!==u){me=u,le=f,je(u);return}f!==null&&f!==le&&(le=f,je(u))}function Ye(f){ye.has(f)?ye.delete(f):ye.add(f),b()}function st(f){let T=xe.trim().length===0;xe=f,T!==(f.trim().length===0)&&b()}async function P(){let f=xe.trim();if(!s||!u||f.length===0||Y)return;let T=u;Y=!0,b();let C=!1;try{let ue=await Promise.resolve(s("add-comment",{id:T,text:f}));Array.isArray(ue)&&ue.length>0&&(C=!0,T===u&&(Se=ue,ve=!1,xe="",le=ue.length))}catch{C=!1}C||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),T===u&&(Y=!1),b()}let fe={onToggle:Ye,onDraftInput:st,onSubmit:P},we=t.mdViewer||null,Ae=null;we||(Ae=document.createElement("div"),Ae.className="md-viewer-root",document.body.appendChild(Ae));let Ge=we||Fo(Ae,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let ze=Mr(Ne,{transport:s?(f,T)=>Promise.resolve(s(f,T)):void 0,sessionLogStore:l}),Je=!1,wt=!1,pt=!1,J=null,Q=null,Me=0;function Xe(f){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}`}function Re(){Je=!1,wt=!1,pt=!1,J=null,Q=null,Me+=1}async function ke(f){if(!s)return;let T=++Me;wt=!0,pt=!1,b();try{let C=await Promise.resolve(s("get-bead-prompt",{bead_id:f}));if(T!==Me)return;!C||typeof C!="object"||Array.isArray(C)?pt=!0:(J=C,Q=Xe(f))}catch{T===Me&&(pt=!0)}finally{T===Me&&(wt=!1,b())}}function We(){if(Je=!Je,Je&&u&&Q!==Xe(u)){J=null,ke(u);return}b()}function Ze(){if(!a||!u)return[];let f=a.get();return(f&&f.attempts?Object.values(f.attempts):[]).filter(C=>C&&C.bead_id===u).sort((C,ue)=>(ue.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,effort:C.effort||C.observed_effort||null,speed:C.speed||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,continuation_mode:C.continuation_mode||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,exec_default_preset_id:typeof C.exec_default_preset_id=="string"?C.exec_default_preset_id:null,exec_default_preset_revision:typeof C.exec_default_preset_revision=="number"?C.exec_default_preset_revision:null,exec_values:C.exec_values&&typeof C.exec_values=="object"?C.exec_values:null,usage:C.usage||null,usage_legs:Array.isArray(C.usage_legs)?C.usage_legs:[],delegation_sessions:Array.isArray(C.delegation_sessions)?C.delegation_sessions:[]}))}function nt(){if(!a||!u)return null;let f=a.get();return mn(f&&f.attempts||{},u)}let tt=new Set;function ft(f){tt.has(f)?tt.delete(f):tt.add(f),b()}function kt(f){let T=a?a.get():null,C=T&&T.attempts?T.attempts[f]:null;ze.open({attempt_id:f,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}function xt(f,T){let C=a?a.get():null,ue=C&&C.attempts?C.attempts[f]:null,Be=(ue&&Array.isArray(ue.delegation_sessions)?ue.delegation_sessions:[]).find(Qe=>Qe&&typeof Qe=="object"&&Qe.launch_id===T);Be&&ze.open({attempt_id:f,launch_id:T,meta:{runner:Be.provider==="claude"?"claude":"codex",role:Be.role,...typeof Be.agent_type=="string"?{agent_type:Be.agent_type}:{},model:Be.model,effort:Be.effort,session_id:Be.session_id,status:Be.status}})}async function vt(f){if(!s||!f)return;let T=await Or();if(T===null)return;let C=()=>{let Qe=a?a.get():null;return Qe&&typeof Qe.revision=="number"?Qe.revision:0},ue=async(Qe={},Ve=C())=>await s("worker-attempt-resume",{attempt_id:f,expected_revision:Ve,...T!==""?{instructions:T}:{},...Qe}),Ee=Qe=>{Qe?.queue&&a?.set&&a.set(Qe.queue)},Be=await ue();if(Ee(Be),Be&&Be.conflict){let Qe=Be.queue&&typeof Be.queue.revision=="number"?Be.queue.revision:C();Be=await ue({},Qe),Ee(Be)}Be=await Ln(Be,(Qe,Ve)=>ue({continuation:Qe,decision_token:Ve}),{onResult:Ee,refresh:()=>ue()}),Be&&Be.resumed===!1&&!Be.conflict&&Be.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Be.reason}`,"error",2400)}let Ct={onOpen:kt,onOpenDelegation:xt,onResume:vt,onToggleUsage:ft};function gt(){let f=a?a.get():null,T={...H};for(let C of["orchestration_model","orchestration_effort","orchestration_speed"]){let ue=f&&f[C];typeof ue=="string"&&(T[C]=ue)}return T}async function He(){if(s){try{let f=await Promise.resolve(s("get-session-defaults",{}));H=f&&f.values&&typeof f.values=="object"?f.values:{}}catch{H={}}b()}}function Ce(){let f=a?a.get():null;return f&&f.runner_catalog||null}function I(){let f=a?a.get():null;return f&&typeof f.execution_defaults=="object"?f.execution_defaults:null}function W(){let f=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},C=rn({pin:{...f,..._},global:gt(),execution_defaults:I(),runner_catalog:Ce(),route:typeof f.route=="string"?f.route:null}).orchestration_model.value||"";return $n(Ce(),C)}function se(){let f=i?i.get():null;return!f||typeof f.revision!="number"?null:{revision:f.revision,presets:Array.isArray(f.presets)?f.presets:[]}}function O(f){return f?.compatible===!1}function G(f){i&&f&&typeof f.revision=="number"&&Array.isArray(f.presets)&&i.set({revision:f.revision,presets:f.presets})}async function $e(){let f=se(),T=f?.presets.find(C=>C.id===h);if(!(!s||!u||!f||!T||O(T)||w)){w=!0,E=[],b();try{let C=await Promise.resolve(s("apply-impl-preset",Mu(u,T.id,f.revision)));if(C&&C.conflict){G(C),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ue=C&&Array.isArray(C.issue)?C.issue[0]:C?.issue;if(C&&C.applied&&ue&&typeof ue=="object"){d=ue,E=Array.isArray(C.skipped_orchestration_keys)?C.skipped_orchestration_keys.filter(Ee=>typeof Ee=="string"):[];for(let Ee of Hu)delete _[Ee];de(E.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}C&&C.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(C){C&&typeof C=="object"&&C.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,b()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>te()));let g=null;a&&typeof a.subscribe=="function"&&(g=a.subscribe(()=>{u&&b()}));let x=null;i&&typeof i.subscribe=="function"&&(x=i.subscribe(()=>{u&&b()}));function j(f){f.key==="Escape"&&u&&(f.preventDefault(),r())}document.addEventListener("keydown",j);function te(){if(u){if(n&&typeof n.snapshotFor=="function"){let f=n.snapshotFor("detail:"+u)||[];d=f.find(C=>C&&C.id===u)||f[0]||d}ie(),b()}}function ee(f){un(f).then(T=>{T?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(f){f.preventDefault(),f.stopPropagation(),u&&ee(u)}function Le(f,T){f.preventDefault(),f.stopPropagation(),ee(T)}function et(f,T,C){f.preventDefault(),f.stopPropagation(),Ge.open(T,{missing_state:C})}function ot(f,T){_[f]=T,b(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Pu(u,f,T.length===0?null:T))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function De(f,T){let C=d||{},ue=C.metadata&&typeof C.metadata=="object"?C.metadata:{},Ee={};for(let Ve of["impl_runtime","impl_model","impl_effort"])Ee[Ve]=Object.hasOwn(_,Ve)?_[Ve]:typeof ue[Ve]=="string"?ue[Ve]:"";Ee[f]=T;let Be=Ku(Ee,Ce(),W()),Qe={};for(let Ve of["impl_runtime","impl_model","impl_effort"])Qe[Ve]=_[Ve],_[Ve]=Be[Ve]||"";b(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Be,orchestration_runtime:W()})).then(Ve=>{let bt=Array.isArray(Ve)?Ve[0]:Ve;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");d=bt;for(let on of["impl_runtime","impl_model","impl_effort"])delete _[on];b()}).catch(()=>{for(let Ve of["impl_runtime","impl_model","impl_effort"])Qe[Ve]===void 0?delete _[Ve]:_[Ve]=Qe[Ve];b(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function it(f,T,C){if(!s||!u)return!1;try{let ue=await Promise.resolve(s(f,T)),Ee=Array.isArray(ue)?ue[0]:ue;return Ee&&typeof Ee=="object"&&Ee.id?(d=Ee,!0):(de(C,"error"),!1)}catch{return de(C,"error"),!1}}function Pt(f){setTimeout(()=>{try{let T=e.querySelector(f);T&&typeof T.focus=="function"&&T.focus()}catch{}},0)}function ht(){q=!0,R=d&&d.title||"",b(),Pt('.detail-edit__input[data-edit="title"]')}function Vt(f){R=f.target.value}function Mt(){q=!1,R="",b()}function qt(){it("edit-text",{id:u,field:"title",value:R},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(q=!1,R=""),b()})}function Gt(){K=!0,U=d&&d.description||"",b(),Pt('.detail-edit__textarea[data-edit="description"]')}function jt(f){U=f.target.value}function Dt(){K=!1,U="",b()}function Ue(){it("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(T=>{T&&(K=!1,U=""),b()})}function Jt(f,T,C,ue){if(f.key==="Escape"){f.stopPropagation(),C();return}f.key==="Enter"&&(!ue||f.ctrlKey||f.metaKey)&&(f.preventDefault(),T())}function Kt(f){let T=f.target.value;it("update-status",{id:u,status:T},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function at(f){let T=Number(f.target.value);it("update-priority",{id:u,priority:T},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>b())}function Ie(f){ne=f.target.value}function L(){let f=ne.trim();f.length!==0&&it("label-add",{id:u,label:f},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(T=>{T&&(ne=""),b()})}function pe(f){if(f.key==="Escape"){f.stopPropagation(),ne="",b();return}f.key==="Enter"&&(f.preventDefault(),L())}function Pe(f){it("label-remove",{id:u,label:f},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>b())}let ct={onCopyPath:Le,onOpenDoc:et};function At(f){return typeof f=="string"?f:f&&typeof f=="object"?String(f.id||f.to||f.issue_id||f.depends_on||""):""}function _t(f){switch(f&&typeof f=="object"?String(f.dependency_type||f.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function It(f){let C=(Array.isArray(f.dependencies)?f.dependencies:[]).map(ue=>({id:At(ue),icon:_t(ue)})).filter(ue=>ue.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${C.map(ue=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ue.id)}
                  >
                    ${ue.icon?`${ue.icon} `:""}${ue.id}
                  </button>`:c`<span class="detail-dep"
                    >${ue.icon?`${ue.icon} `:""}${ue.id}</span
                  >`)}
          </div>`}
    `}function Ft(f){let T=f.metadata||{},C=f.workflow||{},ue=C.stages||{},Ee=ue.spec&&ue.spec.stale,Be=ue.impl&&ue.impl.stale,Qe=ue.plan||null,Ve=C.route_source==="derived",bt=C.route||T.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ve?" detail-kv__v--derived":""}"
          title=${Ve?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ve?"unset":bt}</span
        >
      </div>
      ${C.route!=="quick_fix"||Object.hasOwn(T,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${T.spec_review||"\uC5C6\uC74C"}${Ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${C.route!=="quick_fix"||Object.hasOwn(T,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${T.impl_review||"\uC5C6\uC74C"}${Be?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${C.planned_execution.kind}</span>
            </div>
            ${C.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${C.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${C.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${On(C.exec_receipt)}</span
            >
          </div>`:""}
      ${C.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${C.impl_entry.actor}@${C.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${T.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${T.pr_url}</span>
          </div>`:""}
    `}let v={route:["quick_fix","spec_backed","full_plan"]};async function y(f,T){let C=T.target.value;if(f==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){b();return}await it("update-workflow-meta",{id:u,key:f,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),b()}function $(f){let T=f.metadata||{};return c` ${((ue,Ee)=>{let Be=v[ue],Qe=typeof T[ue]=="string"?T[ue]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ue}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ue}
          data-edit=${`wfmeta-${ue}`}
          @change=${Ve=>y(ue,Ve)}
        >
          <option value="" ?selected=${!Be.includes(Qe)}>
            ${Ee}
          </option>
          ${Be.map(Ve=>c`<option value=${Ve} ?selected=${Qe===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function N(f,T){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${R}
            @input=${Vt}
            @keydown=${C=>Jt(C,qt,Mt,!1)}
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
              @click=${Mt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${f}</h2>
        ${zt(T).map(C=>c`<span class="detail-usage-total" title=${C.tooltip}
              >${C.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ht}
        >
          ✎
        </button>
      </div>
    `}function re(f){let T=Wt(f.created_at),C=Wt(f.updated_at);return!T&&!C?c``:c`
      ${T?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function he(f,T){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Kt}
        >
          ${zg.map(C=>c`<option value=${C} ?selected=${C===f}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${at}
        >
          ${Hg.map(C=>c`<option value=${String(C)} ?selected=${C===T}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function k(f){return c`
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
              @input=${jt}
              @keydown=${T=>Jt(T,Ue,Dt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ue}
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
    `}function A(f){let T=typeof f.notes=="string"?f.notes:"";return T.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${T}</div>
    `}function be(f){let T=Array.isArray(f.labels)?f.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${T.map(C=>c`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>Pe(C)}
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
            @input=${Ie}
            @keydown=${pe}
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
    `}function p(){if(!u)return c``;let f=d||{},T=String(f.id||u),C=f.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ue=nt(),Ee=f.status||"open",Be=typeof f.priority=="number"?Math.max(0,Math.min(4,f.priority)):"",Qe=f.description||"",Ve={...f,metadata:{...f.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ge}
            >
              ${T}
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
          ${N(C,ue)}
          ${qu(Ve)}
          ${Nu({metadata:Ve.metadata,workspace_values:gt(),catalog:Ce(),execution_defaults:I(),expanded:F,presets:se()?.presets||[],preset_id:h,preset_busy:w,skipped_orchestration_keys:E},{onToggle:bt=>{F=bt,b()},onEdit:(bt,on)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){De(bt,on??"");return}ot(bt,on??"")},onPresetSelect:bt=>{h=bt,E=[],b()},onPresetApply:()=>{$e()}})}
          ${zu({md:Ve.metadata,catalog:V,workspace_defaults:ae,handlers:{onExecChange:ot}})}
          ${he(Ee,Be)} ${re(f)}
          ${k(Qe)}
          ${$u(Se,fe,{expanded:ye,draft:xe,sending:Y,error:ve})}
          ${A(f)} ${be(f)} ${It(f)}
          ${Ft(f)} ${$(f)}
          ${vu(f,ct)}
          ${Ju({expanded:Je,loading:wt,error:pt,data:J},{onToggle:We})}
          ${Xu(Ze(),Ct,{total:ue,expanded:tt})}
        </div>
      </div>
    `}function b(){Ke(p(),e)}return{load(f){f!==u&&(_={},h="",E=[],F=!1,Te(),_e(),Re(),Z()),u=f,d=null,te(),He(),M!==f&&Oe(f)},clear(){u=null,d=null,_={},h="",w=!1,E=[],F=!1,Te(),_e(),Re(),Z(),Ge.close(),ze.close(),Ke(c``,e)},destroy(){S&&(S(),S=null),g&&(g(),g=null),x&&(x(),x=null),document.removeEventListener("keydown",j),we||(Ge.destroy(),Ae&&Ae.parentNode&&Ae.parentNode.removeChild(Ae)),ze.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,Z(),h="",w=!1,E=[],_e(),Re(),Ke(c``,e)}}}function td(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Uo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Wo(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function zo(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Gg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:Uo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function nd(e,t){let n=Gg(e,t);return n?c`<button
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
            >${Ho(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${As(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Fr(e){let t=cn(e.created_at),n=cn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Vg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ss(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Go(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function xn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Vg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function xs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Kg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function rd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Kg[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Vo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Yg(e){return c`<div
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
        >`)}${s.map(l=>c`<span class="worker-dep worker-dep--warn">${l}</span>`)}${i?Yg(i):""}
  </div>`}function Br(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function sd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ko(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Zg(e){let t=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),r=Pn(e.usage),s=cn(e.done_at);return c`<div
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
  </div>`}function Kn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Zg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),s=Pn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?cn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=e.lane==="done"?"":Br(e.workflow),F=sd(e.from_id),H=Ko(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,ae=e.pr_url&&e.pr_number?c`<a
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
          >`:"",R=o?c`<span
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
      </button>`:"",ne=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Te=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Z=e.discard,ce=Z?.action||e.discard_action?c`<button
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
        </button>`:"",z=e.stale_work||null,Oe=z?c`${z.can_resume||z.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${z.action_id}
            ?disabled=${z.locked}
          >
            기존 작업 이어가기
          </button>`:""}${z.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${z.action_id}
            ?disabled=${z.locked}
          >
            백업 후 새로 시작
          </button>`:""}${z.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${z.action_id}
            ?disabled=${z.locked}
          >
            다시 확인
          </button>`:""}`:"",Se=z?c`<div class="worker-mini__stale">
        <strong>${z.title}</strong>
        <span>${z.summary}</span>
        <span>${z.cause}</span>
        ${z.can_backup_fresh?c`<small
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
        </button>`:"",le=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Vo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",ve=jr(e.dependency_chips,{lane:e.lane}),xe=xs(e),Y=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Z?.operation||e.revise_action||z);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${w}${H}${F}${V}
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
                >`:""}${D}${R}
            <span class="worker-mini__actions"
              >${U}${ne}${Te}${ce}</span
            >
            ${Fr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${h}${w}${H}${E}${F}${ae}${M}${D}${_}${q}
            </div>
            <div class="worker-mini__body">${V}${Se}</div>
            ${ve}${le}${Y?c`<div class="worker-mini__foot">
                  ${K}${R}
                  <span class="worker-mini__actions"
                    >${U}${ne}${Te}${ce}${me}${Oe}</span
                  >
                  ${xs(e)}
                </div>`:""}
            ${Fr(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${h}${w}${H}${E}${F}${V}${ae}${M}${D}${_}${q}${K}${R}${U}${ne}${Te}${ce}
            </div>
            ${ve}${le}${xe} ${Fr(e)}`}
  </div>`}function $i(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=jr(e.dependency_chips,{lane:e.lane});return c`<div
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
      >${Ko(e.priority)}
      ${Br(a)}${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${sd(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?ao(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?c`<div class="worker-mini__exec">
          ${Vo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?$i(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Kn(r))}
          </div>`}
  </section>`}var od={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ad={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function id(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function xi(e){for(let t of id(e))if(Object.hasOwn(od,t))return od[t];return null}function Ai(e){let t=null;for(let n of id(e))Object.hasOwn(ad,n)&&(t=ad[n]);return t}function Yo(e){let t=xi(e),n=Ai(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function ld(e,t){let n=xi(e)??xi(t),r=Ai(t)??Ai(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var cd=160;function Qg(e){return e.length>cd?`${e.slice(0,cd)}\u2026`:e}function Xg(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Qg(e.command)}</code>`:""}
  </div>`}function Jg(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function eh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function ud(e){let t=e.failure?Yo(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Xg(e.failure.cause_detail)}
          ${Jg(e.failure.reason)}
          ${xs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function th(e){return e?c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var nh=new Set(["codex-runner"]);function rh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&nh.has(h.agent_type))),l=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),d=jr(e.dependency_chips,{lane:"running"}),_=r?cn(r.updated_at,t):"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${cn(a,t)}</span
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
      </div>`:""}${d}`}function Si(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?eh(t-e.started_at):"\u2014",l=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ss(e),d=zt(e.usage),_=Pn(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,E=e.landing,F=e.attempt_id&&e.attempt_id===n,H=r.monitor||null,V=th(H),ae=rh(H,t,a,s?{updated_at:e.updated_at??null}:null),M=s&&e.workflow?.chips?.exec_receipt||null,D=Br(e.workflow),q=M?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(M)}`}
        >${`${M.kind}:${io(M)}`}</span
      >`:"",K=D||q?c`<div class="rtile__meta">
          ${D}${q}
        </div>`:"",R=s?"":Fr(e),U=e.discard?.action?c`<button
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
      ${Ko(e.priority)}${V}${u?c`<span class="rtile__resumed" title=${u}>↻</span>`:""}
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
    ${ae}${e.rollup?oo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ma}):""}
    ${E?c`<div class="rtile__landing">
          <span
            class="merge-step${E.failed?" merge-step--failed":""}"
            style=${`--progress: ${E.percent}%`}
            >${E.label}${E.index>0?c`<span class="merge-step__n"
                  >${E.index}/${E.total}</span
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
            ${Vo(e.exec_chips)}
            ${d.length>0?d.map(ne=>c`<span class="worker-usage" title=${ne.tooltip}
                      >${ne.label}</span
                    >`):_?c`<span
                    class="worker-usage"
                    title=${is(e.usage)}
                    >${_}</span
                  >`:""}
          </div>`:""}
    ${R} ${xs(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ei(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Si(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ti=new Set(["unavailable","not_applicable"]);function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function dd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Zn(e,t){return t===null?null:`${Vn[e]}: ${t.display} (${Po[t.source]})`}function Ci(e){return e.filter(t=>t!==null).join(`
`)}function Es(e){if(typeof e!="object"||e===null)return null;let t=ur(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ci(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Vn.orchestration_model,e.model),n(Vn.orchestration_effort,e.effort),n(Vn.orchestration_speed,e.speed)])}}function _r(e,t){let n=Yn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Yn(e,"orchestration_effort"),s=Yn(e,"orchestration_speed"),o=dd([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ci(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Zn("orchestration_model",n),Zn("orchestration_effort",r),Zn("orchestration_speed",s)])}}function sh(e,t){return e===null||e.value===null||Ti.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function oh(e){return e===null||Ti.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function ah(e){return e===null?null:e.value==="auto"?"auto":Ti.has(e.resolution)?null:e.display}function Qn(e,t){if(typeof e!="object"||e===null)return null;let n=Yn(e,"impl_dispatch"),r=Yn(e,"impl_runtime"),s=Yn(e,"impl_model"),o=Yn(e,"impl_effort"),a=Yn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":dd([sh(r,t??null),oh(s),ah(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ci(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Zn("impl_dispatch",n),Zn("impl_runtime",r),Zn("impl_model",s),Zn("impl_effort",o),Zn("impl_speed",a)])}}var Ht="",ih=["impl_runtime","impl_model","impl_effort"],lh=["claude_account","codex_account"],ch=5,Zo=1;function sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Qo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(I=>de(I,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),w={claude:null,codex:null},E=!1,F=null,H={},V="",ae="",M=!1,D=!1,q=!1,K=null,R=!1;function U(){let I=t.queue?t.queue():null;return sn(I)?I:null}function ne(){let I=U();return I?I.runner_catalog:null}function Te(){let I=U();return I&&sn(I.execution_defaults)?I.execution_defaults:null}function Z(){let I=t.implPresetStore?.get();return sn(I)&&Array.isArray(I.presets)?I:null}function ce(){return r===null?{}:{root_dir:r}}async function z(I,W){return R||!n?null:await n(I,W)}function Oe(I){I&&sn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function Se(I,W){let se=U();if(!se||R)return null;let O=await z(I,{...W,...ce(),expected_revision:se.revision});if(Oe(O),r!==null&&O&&O.conflict){let G=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:U()?.revision??se.revision;O=await z(I,{...W,...ce(),expected_revision:G}),Oe(O)}return O}async function me(){l=!0,Ce();try{let I=await z("get-session-defaults",{...ce()});o=sn(I?.values)?{...I.values}:{},a={...o},i=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{l=!1,Ce()}}async function le(){let I=Ou(o,a);if(Object.keys(I).length!==0){try{let W=await z("set-session-defaults",{values:I,...ce()});o=sn(W?.values)?{...W.values}:{},a={...o},i=Array.isArray(W?.warnings)?W.warnings:[]}catch(W){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ce()}}function ve(I,W){if(!sn(I))return;let se=I.state;u={state:se==="usable"||se==="unusable"||se==="absent"?se:"absent",values:sn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},_={...u.values},W&&(d={..._})}async function xe(){try{ve(await z("get-workspace-accounts",{...ce()}),!0)}catch(I){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}Ce()}async function Y(I){try{let W=await fetch(I);if(!W.ok)return null;let se=await W.json();if(!sn(se)||!Array.isArray(se.accounts))return null;let O=se.accounts.filter(G=>sn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:O,active:O.find(G=>G.active===!0)||null}}catch{return null}}async function X(){E=!0;let[I,W]=await Promise.all([Y("/api/claude-usage"),Y("/api/codex-usage")]);R||(w={claude:I,codex:W},Ce())}function ye(){let I={};for(let W of lh){let se=Object.hasOwn(d,W)?d[W]:null,O=Object.hasOwn(_,W)?_[W]:null;se!==O&&(I[W]=se)}return I}async function _e(){let I=ye();if(Object.keys(I).length!==0){try{ve(await z("set-workspace-accounts",{values:I,...ce()}),!1)}catch(W){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ce()}}function je(I,W){W===Ht?delete d[I]:d[I]=W,Ce(),h=h.then(()=>_e())}function ie(I,W){if(ih.includes(I)){P(I,W);return}W===Ht?delete a[I]:a[I]=W,Ce(),le()}function Ye(){let I=gt().orchestration_model,W=rn({global:{orchestration_model:I??void 0},execution_defaults:Te(),runner_catalog:ne()}).orchestration_model.value;return W?$n(ne(),W):null}function st(I,W){typeof W=="string"&&W.length>0?a[I]=W:delete a[I]}function P(I,W){let se=W===Ht?void 0:W,O=Cu({impl_runtime:I==="impl_runtime"?se:a.impl_runtime,impl_model:I==="impl_model"?se:a.impl_model,impl_effort:I==="impl_effort"?se:a.impl_effort},ne(),Ye());st("impl_runtime",O.impl_runtime),st("impl_model",O.impl_model),st("impl_effort",O.impl_effort),Ce(),le()}async function fe(){let I=U();if(!I)return;let W={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},se=Lu(W,{...W,...H});if(Object.keys(se).length!==0){try{let O=await Se("worker-queue-set-orchestration-defaults",{values:se});if(O&&O.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}H={}}catch(O){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ce()}}function we(I,W){H[I]=W===Ht?null:W,Ce(),fe()}function Ae(I){if(F=I,!I){Ce();return}let W=ne(),se=gt(),O=se.orchestration_model;O&&!ks(W,I).includes(O)&&(H.orchestration_model=null,O=null);let G=se.orchestration_effort;G&&!mi(W,I,O||pn).includes(G)&&(H.orchestration_effort=null),Ce(),fe()}async function Ge(I){if(!(!U()||I<Zo)){try{await Se("worker-queue-set-slots",{slots:I})}catch(W){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ce()}}async function Ne(I){if(!(!U()||I<Zo||I>ch)){try{await Se("worker-queue-set-serial-lane-count",{count:I})}catch(W){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ce()}}async function ze(I,W){let se=I==="auto_advance"?"worker-automation-toggle":I==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Se(se,{on:W})}catch(O){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ce()}function Je(){let I={},W=gt();for(let se of Ro){let O=Fn.includes(se)?W[se]:a[se];typeof O=="string"&&O.length>0&&(I[se]=O)}return I}async function wt(){let I=Z();if(!I)return;let W=Je();if(Object.keys(W).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let se=(I.presets||[]).find(G=>G.id===V),O=ae.trim()||(se?se.name:"");if(!O){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=se?await z("impl-preset-update",{expected_revision:I.revision,id:se.id,name:O,settings:W}):await z("impl-preset-create",{expected_revision:I.revision,name:O,settings:W});if(G&&G.applied){if(ae="",!se&&Array.isArray(G.presets)){let $e=G.presets.find(S=>S.name===O);V=$e?$e.id:V}Ce()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function pt(){let I=Z();if(!(!I||V.length===0))try{let W=await z("impl-preset-delete",{expected_revision:I.revision,id:V});W&&W.applied?(V="",Ce()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce())}catch(W){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}}function J(I){o=sn(I.values)?{...I.values}:{},a={...o},i=Array.isArray(I.warnings)?I.warnings:[],sn(I.queue)&&(t.onQueueAdopt?.(I.queue),H={})}async function Q(){let I=Z(),W=U();if(!I||!W||V.length===0)return;let se=O=>({preset_id:V,expected_revision:I.revision,expected_queue_revision:O,...ce()});try{let O=await z("apply-impl-preset-global",se(W.revision));if(O&&O.applied&&J(O),r!==null&&O&&O.queue_applied===!1){let G=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:U()?.revision??W.revision;O=await z("apply-impl-preset-global",se(G)),O&&O.applied&&J(O)}O&&O.applied?O.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):O&&O.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(O){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ce()}async function Me(){D=!0,q=!1,Ce();try{let I=await z("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?q=!0:K=I}catch{q=!0}finally{D=!1,Ce()}}function Xe(){if(M=!M,M&&!K){Me();return}Ce()}function Re(){let I=Pr({loading:D,error:q});if(I)return I;if(!K)return"";let W=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${W.map(se=>c`<div class="settings-dialog__sp-variant" data-variant=${se.key}>
            <div class="settings-dialog__sp-cond">${se.condition}</div>
            ${qn(se.label,se.system_prompt)}
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
        @click=${Xe}
      >
        ${M?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${M?Re():""}
    </section>`}function We(I,W,se,O,G,$e,S){let g=G[I]??Ht,x=gi(I,se,G,Te(),ne(),S),j=x.options.find(ee=>ee.value===g),te=g===Ht?x.full_value:j?.full_value;return c`<select
        class=${g===Ht?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${W}
        title=${te||""}
        ?disabled=${$e===!0||x.disabled}
        .value=${fr(String(g))}
        @change=${ee=>O(I,String(ee.target.value))}
      >
        <option value=${Ht} ?selected=${g===Ht}>
          ${x.unset_label}
        </option>
        ${x.options.map(ee=>c`<option
              value=${ee.value}
              title=${ee.full_value||""}
              ?selected=${ee.value===g}
            >
              ${ee.label}
            </option>`)}
      </select>
      ${g===Ht?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ze(I,W,se,O,G,$e=!1,S){return c`<div
      class=${`settings-dialog__row${$e?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${W}</span>
      <span class="settings-dialog__controls">
        ${We(I,W,se,O,G,$e,S)}
      </span>
    </div>`}function nt(I,W){let se=W?W.active:null;return sn(se)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?se.email:qr({...se,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function tt(I,W,se){let O=w[se],G=Object.hasOwn(d,I)?d[I]:Ht,$e=se==="claude"?No:qr,S=!!O?.accounts.some(g=>g.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${W}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${W}
          data-account-key=${I}
          @change=${g=>je(I,String(g.target.value))}
        >
          <option value=${Ht} ?selected=${G.length===0}>
            ${nt(se,O)}
          </option>
          ${G.length>0&&!S?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${O?.accounts.map(g=>c`<option value=${g.key} ?selected=${g.key===G}>
                ${$e(g)}
              </option>`)||""}
        </select>
        ${O?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ft(){let I=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function kt(I,W,se,O,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${W}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${We(se,`${I} \uBAA8\uB378`,O,ie,a,!1)}
        ${We(G,`${I} effort`,Io,ie,a,!1)}
      </span>
    </div>`}function xt(I,W,se,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${W}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${O?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${O?"true":"false"}
          aria-label=${W}
          @click=${()=>ze(I,!O)}
        >
          ${O?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${se}</span>
      </span>
    </div>`}function vt(I,W,se,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${W}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${W} \uAC10\uC18C`}
            @click=${()=>O(se-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${se}</span>
          <button
            type="button"
            aria-label=${`${W} \uC99D\uAC00`}
            @click=${()=>O(se+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ct(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(W=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${W.kind}
          >
            <span class="settings-dialog__preset-diff-label">${W.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${W.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${W.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function gt(){let I=U(),W={};for(let se of Fn)W[se]=Object.prototype.hasOwnProperty.call(H,se)?H[se]:I&&typeof I[se]=="string"?I[se]:null;return W}function He(){let I=ne(),W=a.impl_runtime,se=a.impl_model,O=Z(),G=U(),$e=gt(),S=ks(I,F),g=Dr(I,void 0).filter(De=>De!==pn),x=mi(I,F,$e.orchestration_model||pn).filter(De=>De!==pn),j=V?(O?.presets||[]).find(De=>De.id===V):null,te=j?Ru(Je(),sn(j.settings)?j.settings:{}):null,ee=G&&typeof G.slots=="number"?G.slots:Zo+1,ge=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Zo,Le=Te()?.supported===!0,et=ft(),ot=gi("workflow_mode",vs,a,Te(),I);return c`
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
      ${Le?"":c`<div
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
                @change=${De=>{V=String(De.target.value),Ce()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(O?.presets||[]).map(De=>c`<option
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
                ?disabled=${!te||te.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${fr(ae)}
                @input=${De=>{ae=String(De.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${wt}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${pt}
              >
                삭제
              </button>
            </div>
            ${te?Ct(te):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${fr(F||Ht)}
                    @change=${De=>{let it=String(De.target.value);Ae(it===Ht?null:it)}}
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
              ${Ze("orchestration_model","\uBAA8\uB378",S,we,$e)}
              ${Ze("orchestration_effort","effort",x,we,$e)}
              ${Ze("orchestration_speed","\uC18D\uB3C4",ys,we,$e)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${tt("claude_account","Claude","claude")}
              ${tt("codex_account","Codex","codex")}
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
                      @click=${()=>ie("workflow_mode",Ht)}
                    >
                      ${ot.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${vs.map(De=>c`<button
                          type="button"
                          data-mode=${De}
                          aria-pressed=${String(a.workflow_mode===De)}
                          @click=${()=>ie("workflow_mode",De)}
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
              ${kt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ws,"spec_review_effort")}
              ${kt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Lo,"plan_review_effort")}
              ${kt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ws,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ze("impl_runtime","\uC704\uC784 \uB300\uC0C1",Oo,ie,a)}
              ${Ze("impl_model","\uBAA8\uB378",Dr(I,W),ie,a)}
              ${Ze("impl_effort","effort",Nr(I,W,se),ie,a)}
              ${Ze("impl_speed","\uC18D\uB3C4",ys,ie,a)}
              ${Ze("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",g,ie,a,!1,{...a,...$e})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${xt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${xt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${xt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${vt("slots","\uB3D9\uC2DC \uC2E4\uD589",ee,De=>Ge(De))}
              ${vt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ge,De=>Ne(De))}
            </div>
            ${ke()}
          `}
    `}function Ce(){R||Ke(He(),e)}return{load(){H={};let I=[me(),xe()];return E||I.push(X()),Promise.all(I).then(()=>{})},render:Ce,sessionDraft:()=>({...a}),destroy(){R=!0,Ke(c``,e)}}}function Xo(e){return c`<svg
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
  </svg>`}function pd(){return Xo(ns`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function fd(){return Xo(ns`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function _d(){return Xo(ns`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function md(){return Xo(ns`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function gd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function hd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(fo(t));let n={};for(let i of In)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of In){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Pn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ri(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function uh(e,t){if(!An(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function dh(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=rn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),s=_r(n,e.runner_catalog),o=Qn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function bd(e,t){let n=t.notify||(Y=>de(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function w(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(X=>An(X)):[]}function E(Y){return w().find(X=>X.root_dir===Y)||null}function F(Y){return uh(E(Y),h.get(Y))}function H(){for(let Y of w()){let X=h.get(Y.root_dir);X&&typeof X.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=X.revision&&h.delete(Y.root_dir)}}async function V(Y,X,ye){let _e=t.transport,je=F(X);if(!(!_e||!An(je))){try{let ie=await _e(Y,{...ye,root_dir:X,expected_revision:je.revision});if(An(ie?.queue)&&h.set(X,ie.queue),ie&&ie.conflict){let Ye=An(ie.queue)&&typeof ie.queue.revision=="number"?ie.queue.revision:F(X)?.revision;ie=await _e(Y,{...ye,root_dir:X,expected_revision:Ye}),An(ie?.queue)&&h.set(X,ie.queue)}}catch(ie){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}le()}}function ae(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),le())}function M(Y){ae(u===Y?null:Y)}function D(Y){if(d===Y){K();return}q(),d=Y;let X=E(Y);a.textContent=`${X?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Qo(l,{root_dir:Y,queue:()=>F(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{h.set(Y,ye),le()}}),_.load(),le()}function q(){_?.destroy(),_=null}function K(Y){q(),d=null,s.hidden=!0,a.textContent="",Y!==!0&&le()}let R=()=>K();i.addEventListener("click",R);function U(Y){Y.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",U);function ne(Y,X){let ye=Math.max(X,Y,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${X}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(_e,je)=>je<Y?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Te(Y){let X=Y.auto_advance===!0,ye=Y.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${X?" is-on":""}`}
        data-act="auto"
        aria-pressed=${X?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${X?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${X?fd():pd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${_d()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${md()}
      </button>`}function Z(Y){let X=dh(Y);return X?c`<div class="mon2-deck__chips">
      ${X.orchestration?c`<span class="mon2-deck__chip" title=${X.orchestration.title}
            >오케 ${X.orchestration.text}</span
          >`:""}
      ${X.worker?c`<span class="mon2-deck__chip" title=${X.worker.title}
            >워커 ${X.worker.text}</span
          >`:""}
    </div>`:""}function ce(Y){let X=[];for(let[ye,_e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let je=Ri(Y,ye);je>0&&X.push(`${_e} ${je}`)}return X.join(" \xB7 ")}function z(Y){let X=Ri(Y,"running"),ye=typeof Y.slots=="number"?Y.slots:1;return c`<div
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
          ${ne(X,ye)}
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
        <div class="mon2-deck__ops">${Te(Y)}</div>
        <span class="mon2-deck__counts">${ce(Y)}</span>
        ${Z(Y)}
      </div>
    </div>`}function Oe(Y){let X=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",_e=hd(Array.isArray(X)?X:[]),je=ie=>Y.reduce((Ye,st)=>Ye+Ri(st,ie),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${je("running")} · 대기 ${je("queue")} · PR
        ${je("pr_wait")}${je("session_active")>0?` \xB7 \uC138\uC158 ${je("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(X)?X.length:0}</span
      >
      ${_e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof _e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${gd(ye)}
                  >${_e}</span
                >`:_e.map(ie=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ie.provider}
                      title=${ie.tooltip}
                      >${ie.label}</span
                    >`)}
          </span>`}
    </div>`}function Se(){let Y=w();return Y.length===0?"":c`${Oe(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(X=>z(X))}
      </div>`}function me(){u!==null&&!E(u)&&(u=null,t.onFocusChange?.(null))}function le(){H(),me(),d!==null&&!E(d)&&K(!0),Ke(Se(),r),_?.render()}function ve(Y){let X=Y.target;if(!X||typeof X.closest!="function")return;let ye=X.closest("[data-root-dir]");if(!ye)return;let _e=ye.getAttribute("data-root-dir")||"",je=X.closest("[data-act]")?.getAttribute("data-act");if(je==="worker"){t.gotoWorkerTab?.(_e);return}if(je==="auto"){V("worker-automation-toggle",_e,{on:F(_e)?.auto_advance!==!0});return}if(je==="merge"){V("worker-merge-auto-toggle",_e,{on:F(_e)?.auto_merge!==!0});return}if(je==="gear"){D(_e);return}M(_e)}function xe(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let X=Y.target;if(!X||typeof X.closest!="function")return;let ye=X.closest('[data-root-dir][role="button"]');!ye||ye!==X||(Y.preventDefault(),M(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ve),r.addEventListener("keydown",xe),{render:le,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",ve),r.removeEventListener("keydown",xe),i.removeEventListener("click",R),q(),Ke(c``,r),e.replaceChildren()}}}var ph="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",fh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Oi(e,t){return`${e}\0${t}`}function _h(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function mh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function gh(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function hh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let l=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&n.has(u))));r.set(i,l.length);for(let u of l){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let l of(s.get(i)||[]).slice().sort()){let u=(r.get(l)||0)-1;r.set(l,u),u===0&&a.push(l)}}for(let i of t)o.includes(i)||o.push(i);return o}function bh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Oi(a,l));let r=new Map,s=new Map;for(let a of e){let i=Oi(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Oi(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function yh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function vh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Li(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function yd(e,t,n){let r=mh(n.blocked_by_map),s=[],o=null,a=w=>{let E=n.owner_of.get(w);return typeof E!="string"||E.length===0?(o=_h(w),null):E},i=(w,E)=>{if(o!==null||w===E)return;let F=r.get(w)||[];if(!F.includes(E))return;let H=a(w);H!==null&&(r.set(w,F.filter(V=>V!==E)),s.push({type:"dep-remove",a:w,b:E,root_dir:H}))},l=(w,E)=>{if(o!==null||w===E)return;let F=r.get(w)||[];if(F.includes(E))return;let H=a(w);if(H!==null){if(gh(r,E,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${E}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...F,E]),s.push({type:"dep-add",a:w,b:E,root_dir:H})}},u=()=>{let w=n.lane_order.get(e.lane_id||"")||[],E=new Set(w),F=(r.get(e.bead_id)||[]).filter(V=>E.has(V)),H=w.filter(V=>(r.get(V)||[]).includes(e.bead_id));for(let V of F)i(e.bead_id,V);for(let V of H)i(V,e.bead_id);for(let V of F)for(let ae of H)l(ae,V);return w.filter(V=>V!==e.bead_id)},d=(w,E)=>{let F=n.lane_order.get(w)||[],H=F.indexOf(e.bead_id),V=hh(r,F.filter(q=>q!==e.bead_id)),ae=w.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,H>=0&&E>H?E-1:E)),M=ae>0?V[ae-1]:null,D=ae<V.length?V[ae]:null;if(M===null){D!==null&&l(D,e.bead_id);return}l(e.bead_id,M),D!==null&&(r.get(D)||[]).includes(M)&&(i(D,M),l(D,e.bead_id))},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ph};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:fh};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let h=[];if(t.kind==="candidate")e.kind!=="candidate"&&h.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=yh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")h.push(Li(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let E=n.parallel_rows,F=E[Math.max(0,Math.min(E.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&vh(n,e.root_dir)&&_!==void 0){let V=_>w?w:w-1;V>=0&&V!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&h.push(Li(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else h.push(Li(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...bh(s,n.blocked_by_map),...h]}}var vd={running:3,paused:2,failed:1};function Ur(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function wd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function kd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Ur(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Ur(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=vd[u.run_state],_=vd[i];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}function Jo(e){return e.replace(/\/+$/,"")}function wh(e,t){let n=Jo(e),r=Jo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ea(e,t){let n=new Set;for(let r of e)for(let s of t){if(!wh(r,s))continue;let o=Jo(r),a=Jo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var $d=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ts=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ta(e,t){let n=$d.find(s=>s.step===e);if(!n)return null;let r=$d.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function xd(e){let t=Ts.findIndex(n=>n.step===e);return Ts.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function mr(e){let t=Ts.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function kh(e){let t=Ts.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ts.length}}function na(e){let t=kh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Pi=new Set(["queued","running","retry_pending","repairing"]),Ad=new Set(["failed","succeeded"]),$h={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Cs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},xh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Cs.base_containment,child_sweep:Cs.child_sweep,branch_cleanup:Cs.branch_cleanup,parent_close:Cs.parent_close};function Ah(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Sh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Pi,...Ad].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Eh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function Ii(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=$h[s];if(!o)return null;let a=ta(n,`${r} ${o}`);return a?{...a,active:Pi.has(s),failed:s==="failed"}:null}function Th(e){return!e||typeof e!="object"?null:xh[e.step]||null}function Rs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Th(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Ah(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&Sh(E,t,i)).sort(Eh):[],u=a?l:[],d=u.find(E=>Pi.has(E.state));if(d)return Ii(d);if(s)return s.step==="repo_operations"&&l[0]?Ii(l[0],!0):null;let _=u.find(E=>Ad.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Ii(_);if(r){let E=ta(r.step,r.label);return E?{...E,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Cs[e.cleanup_cursor]:null;if(!h)return null;let w=ta(h.step,h.label);return w?{...w,active:!0,failed:!1}:null}function ra(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Mi(e,t){return`${e}\0${t}`}function Sd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Di(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ch(e,t){return e==="internal"&&t===void 0}function Wr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ed(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Wr(s)})`,location_label:Wr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Di(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Ch(a,s)}}function Td(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Mi(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Mi(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],w=s.get(u);if(w)for(let E of h){let F=r.get(E);F&&F!==u&&!w.includes(F)&&w.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function Cd(e,t){return Mi(e,t)}var Rd=1,Os=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],qi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zr={show_blocked:!0,spec:"all"},Od={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Rh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Ur(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Oh(e,t){let{winners:n,resumed_from_ids:r}=kd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:mn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Ld(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Tt(e){return e&&typeof e=="object"?e:{}}function Lh(e,t,n){let r=Tt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>rn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Id(_r(l,o),_r(u,o)),_=Id(Qn(l,null),Qn(u,null));return d||_?{orchestration:d,worker:_}:null}function Id(e,t){return!e||t&&t.text===e.text?null:e}function Ih(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Ph(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Wr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Mh(e,t,n){let r=new Map;for(let l of e)r.set(l,Array.from(n.get(l)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(l=>(r.get(l)||0)===0).sort();for(let l of a)o.set(l,0);let i=[...a];for(;i.length>0;){let l=i.shift();s.push(l);let u=Array.from(t.get(l)||[]).filter(_=>e.includes(_)).sort(),d=(o.get(l)||0)+(u.length>1?1:0);for(let _ of u){let h=(r.get(_)||0)-1;r.set(_,h);let w=o.get(_);o.set(_,w===void 0?d:Math.min(w,d)),h===0&&i.push(_)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Dh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(d,_,h)=>{let w=d.get(_);w?w.add(h):d.set(_,new Set([h]))},i=d=>t.get(d)?.lane==="done";for(let[d,_]of e)if(!i(d))for(let h of _)h===d||i(h)||(o.add(h),o.add(d),a(r,h,d),a(s,d,h));let l=new Set,u=[];for(let d of Array.from(o).sort()){if(l.has(d))continue;let _=[],h=[d];for(l.add(d);h.length>0;){let M=h.pop();_.push(M);for(let D of[...r.get(M)||[],...s.get(M)||[]])l.has(D)||(l.add(D),h.push(D))}if(_.length<2)continue;let w=_.map(M=>t.get(M));if(w.every(M=>!!M&&/^s[1-5]$/.test(M.lane||""))&&w.every(M=>M&&w[0]&&M.root_dir===w[0].root_dir&&M.lane===w[0].lane))continue;let{order:F,indent:H,cycle:V}=Mh(_.slice().sort(),r,s),ae=V?_.slice().sort():F;u.push({key:_.slice().sort().join("\0"),cycle:V,nodes:ae.map(M=>{let D=t.get(M);return{id:M,workspace_name:D?D.workspace_name:"",root_dir:D?D.root_dir:"",location_label:D?Wr(D):Pd(M,n),indent:V?0:H.get(M)||0}})})}return u}function Pd(e,t){let n=Di(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Md(e,t,n){let r=t.get(e);if(!r)return Pd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Wr(r)}function Nh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function qh(e,t,n,r,s,o,a){let i=(_,h,w,E,F=!1)=>{let H=r.get(_),V=H&&H.lane==="parallel"&&typeof H.position=="number"?H.position-1:null;return{id:_,title:o.get(_)||_,workflow:a.get(_)||null,root_dir:H?H.root_dir:"",workspace_name:H?H.workspace_name:"",seq:h,indent:w,predecessors:E,location_label:Md(_,r,s),draggable:!F&&V!==null,...V!==null?{queue_index:V}:{}}},l=[];for(let _ of e.slice().sort((h,w)=>h.key<w.key?-1:1)){let h=new Set(_.nodes.map(w=>w.id));l.push({lane_id:`chain:${_.key}`,label:"",pending:!1,cycle:_.cycle,rows:_.nodes.map((w,E)=>i(w.id,E+1,_.cycle?0:w.indent,_.cycle?[]:Nh(w.id,h,n),_.cycle))})}let u=new Set;for(let _ of l)for(let h of _.rows)u.add(h.id);let d=[];return t.forEach((_,h)=>{let w=_&&typeof _.seed=="string"&&_.seed.length>0?_.seed:null;w!==null&&u.has(w)||(d.push(h),l.push({lane_id:`pending:${h}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),l.forEach((_,h)=>{_.label=`\uC5F0\uACB0 ${h+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:l,pending_lanes_kept:d}}function Fh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function jh(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:l,state:u}=Fh(i,t,n);if(u!==void 0&&(i.scope_state=u),l.length===0)continue;let d=o.get(i.root_dir);d?d.push({item:i,scope:l}):o.set(i.root_dir,[{item:i,scope:l}])}let a=(i,l,u)=>{let d={id:l.id,title:l.title,location_label:Md(l.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(d):i.overlap_chips=[d]};for(let i of o.values())for(let l=0;l<i.length;l+=1)for(let u=l+1;u<i.length;u+=1){let d=ea(i[l].scope,i[u].scope);d.length!==0&&(a(i[l].item,i[u].item,d),a(i[u].item,i[l].item,d))}}function Ni(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function sa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...zr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Os.some(P=>P.value===n.candidate_sort)?n.candidate_sort:"repo_spec",l=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&l.set(P.root_dir,P);let u=[],d=[],_=[],h=[],w=[],E=[],F=new Map,H=new Map,V=new Map,ae=new Map,M=new Map,D=new Map,q=new Map,K=new Map,R=new Map;for(let P of r){if(!P||typeof P.root_dir!="string")continue;let fe=P.root_dir,we=P.name||fe,Ae=l.get(fe),Ge=Ae&&typeof Ae.revision=="number"?Ae.revision:typeof P.revision=="number"?P.revision:0,Ne=Tt(P.attempts),ze=Tt(P.bead_titles);for(let[g,x]of Object.entries(ze))typeof x=="string"&&x.length>0&&K.set(g,x);let Je=Tt(P.bead_times),wt=Tt(P.pr_observations),pt=Tt(P.admission),J=Tt(P.revise_parked),Q=Tt(P.merge_queue_state),Me=Tt(P.cleanup_failed),Xe=Tt(P.discard_operations),Re=Tt(P.bead_blocked_by);Object.hasOwn(P,"bead_scope")&&D.set(fe,Tt(P.bead_scope));let ke=Tt(P.bead_workflow);for(let[g,x]of Object.entries(ke))x&&typeof x=="object"&&R.set(g,x);let We=Tt(P.pr_activity),Ze=Array.isArray(P.repo_operations)?P.repo_operations:[],nt=Array.isArray(P.merge_queue)?P.merge_queue:[],tt=new Set(nt.filter(g=>g&&typeof g.bead_id=="string").map(g=>g.bead_id)),ft=new Map(nt.filter(g=>g&&typeof g.bead_id=="string").map(g=>[g.bead_id,g])),kt=Array.isArray(P.queue)?P.queue:[],xt=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).filter(g=>g&&/^s[1-5]$/.test(g.id)&&Array.isArray(g.entries)),vt=Tt(P.lane_states),Ct=typeof P.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(P.serial_lane_count))):Math.min(5,xt.length);V.set(fe,Ct),ae.set(fe,kt.length);let gt=new Map(xt.map(g=>[g.id,g])),He=new Map;for(let g of xt)for(let x of g.entries)x&&typeof x.bead_id=="string"&&He.set(x.bead_id,g.id);for(let[g,x]of Object.entries(Re))Array.isArray(x)&&M.set(g,x.filter(j=>typeof j=="string"&&j.length>0));let Ce=Array.isArray(P.done)?P.done:[];for(let g of Ce)g&&typeof g.bead_id=="string"&&E.push({id:g.bead_id,root_dir:fe,workspace_name:we});let I=new Map;for(let g of Ce)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&I.set(g.bead_id,g.added_at);let W=g=>({id:g,title:ze[g]||g,root_dir:fe,workspace_name:we,expected_revision:Ge,draggable:!1,...Tt(Je[g]).created_at?{created_at:Tt(Je[g]).created_at}:{},...Tt(Je[g]).updated_at?{updated_at:Tt(Je[g]).updated_at}:{}}),se=new Set;for(let[g,x]of Oh(Ne,I))se.add(g),d.push({...W(g),lane:"running",...He.has(g)?{serial_lane_id:He.get(g)}:{},attempt_id:x.attempt_id,run_state:x.run_state,status:x.status||void 0,workflow:ke[g]||null,can_pause:x.can_pause,can_resume:x.can_resume,started_at:x.started_at,last_event_at:x.last_event_at,last_activity:x.last_activity,legs:x.legs,runner:x.runner,model:x.model,effort:x.effort,speed:x.speed,resumed_from:x.resumed_from,continuation_mode:x.continuation_mode,usage:x.usage,exec_chips:{orchestration:Es(x),worker:null},discard:xn(Xe,g,{attempt_id:x.attempt_id}),badges:x.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:x.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:x.run_state==="failed"});for(let[g,x]of wd(Ne)){if(d.some(ee=>ee.id===g))continue;let j=x.attempt,te=x.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";d.push({...W(g),lane:"running",kind:"session",attempt_id:typeof j.attempt_id=="string"?j.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ke[g]||null,can_pause:!1,can_resume:!1,started_at:x.started_at,last_event_at:typeof j.last_event_at=="number"?j.last_event_at:null,last_activity:j.last_activity&&typeof j.last_activity=="object"?j.last_activity:null,legs:Array.isArray(j.legs)?j.legs:[],runner:typeof j.runner=="string"?j.runner:null,model:typeof j.model=="string"?j.model:null,effort:typeof j.effort=="string"?j.effort:null,speed:typeof j.speed=="string"?j.speed:null,resumed_from:null,continuation_mode:null,usage:j.usage&&typeof j.usage=="object"?j.usage:null,exec_chips:{orchestration:Es(j),worker:null},discard:xn(Xe,g,{merge_queued:!0}),badges:[x.origin==="auto"?`${te} \xB7 \uC790\uB3D9`:te],alert:!1})}for(let g of Array.isArray(P.session_active)?P.session_active:[]){let x=g&&g.bead_id;typeof x!="string"||se.has(x)||(se.add(x),Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&M.set(x,g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)),typeof g.title=="string"&&g.title.length>0&&K.set(x,g.title),g.workflow&&typeof g.workflow=="object"&&R.set(x,g.workflow),d.push({...W(x),title:g.title||ze[x]||x,lane:"running",kind:"session",status:"in_progress",started_at:Ni(g.started_at)??Ni(g.updated_at)??void 0,updated_at:Ni(g.updated_at)??void 0,workflow:g.workflow||null,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let g of Array.isArray(P.pr_wait)?P.pr_wait:[]){let x=g&&g.bead_id;if(typeof x!="string"||se.has(x))continue;se.add(x);let j=Tt(wt[x]),te=Tt(j.pr),ee=j.gate?Tt(j.gate):null,ge=tt.has(x),Le=ft.get(x)?.continuation_action||null,et=!!Le&&Le.continuation===null,ot=Q.active===x,De=g.external===!0,it=Me[x]||null,Pt=Tt(We[x]),ht=Rs({bead_id:x,merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,merge_progress:Pt.merge_progress||null,cleanup_failed:it,repo_operations:Ze}),Vt=ra(ht),Mt=!!ee&&ee.base_badge==="\uCDA9\uB3CC",qt=!!it&&["child_sweep","branch_cleanup","parent_close"].includes(it.step)&&!!ee&&ee.tier==="merged",Gt=De&&!!it&&!!ee&&ee.tier==="merged",jt=!!ee&&["closed_unmerged","review","undecidable"].includes(ee.tier),Dt=xn(Xe,x,{external:De,merge_active:ot||ht?.step==="merge",merge_queued:ge,cleanup_active:Vt,merged:!!it||ee?.tier==="merged"}),Ue=!!Dt.operation;_.push({...W(x),lane:"pr_wait",workflow:ke[x]||null,pr_number:typeof te.number=="number"?te.number:null,pr_url:typeof te.url=="string"?te.url:void 0,external:De,usage:mn(Ne,x),merge_step:ht,badges:et?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ht?[ee?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:it?[mr(it.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${mr(it.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ee?.gate_badge=="string"&&ee.gate_badge.length>0?[ee.gate_badge]:[],alert:ht?ht.failed===!0:!!it||jt,reason:it&&ht?.active!==!0?na(it.step):"PR \uB300\uAE30",merge_action:ee?.tier==="merged"&&!qt&&!Gt?!1:!ge||et,merge_enabled:!Ue&&(et||ee?.enabled===!0||Mt||qt||Gt),merge_label:et?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Gt||qt?"\uC815\uB9AC \uC7AC\uAC1C":Mt&&!qt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:et?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ue?Dt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Dt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Dt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Gt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Mt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ee?.enabled===!0?`\uBA38\uC9C0 (${ee.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ee?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge&&!et,cancel_enabled:!ot,continuation_mismatch:Le?.mismatch||null,discard:Dt,discard_action:Dt.action,discard_enabled:Dt.enabled,discard_title:Dt.title})}let O=(g,x,j,te)=>{let ee=g&&g.bead_id;if(typeof ee!="string"||se.has(ee))return null;se.add(ee);let ge=J[ee],Le=xn(Xe,ee),et=Le.operation?Le:null,ot={...W(ee),lane:x,workflow:ke[ee]||null,draggable:!et,discard:et||void 0,reason:Ld(pt,ee),seq:j+1,queue_position:j+1,queue_index:j,queue_length:te,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!et,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Re,ee)&&(ot.blocked_by=Array.isArray(Re[ee])?Re[ee].filter(De=>typeof De=="string"&&De.length>0):[]),ot};for(let g=0;g<kt.length;g++){let x=O(kt[g],"queue",g,kt.length);if(!x)continue;h.push(x);let j=F.get(fe);j?j.push(x):F.set(fe,[x])}let G=g=>{let x=_.find(ee=>ee.id===g&&ee.root_dir===fe);if(x)return{id:g,title:x.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let j=d.find(ee=>ee.id===g&&ee.root_dir===fe),te=j&&j.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":j&&j.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:g,title:j?j.title:W(g).title,badge:te}},$e=[];for(let g=0;g<Math.max(Ct,xt.length);g++){let x=`s${g+1}`,j=gt.get(x),te=j&&Array.isArray(j.entries)?j.entries:[],ee=[];for(let et=0;et<te.length;et++){let ot=O(te[et],x,et,te.length);ot&&(ee.push(ot),h.push(ot))}let ge=Tt(vt[x]),Le=Array.isArray(ge.occupied_by)?ge.occupied_by.filter(et=>typeof et=="string"):[];ee.length===0&&Le.length===0&&(Ct<=1||g>=Ct)||$e.push({id:x,index:g,items:ee,raw_length:te.length,occupied_by:Le,occupants:Le.map(et=>G(et)),corrections:Array.isArray(ge.corrections)?ge.corrections.length:0,cycle:ge.cycle===!0,...ee.length===0&&Le.length===0?{empty:!0}:{}})}H.set(fe,$e);let S=Array.from({length:Ct},(g,x)=>{let j=`s${x+1}`,te=gt.get(j),ee=te&&Array.isArray(te.entries)?te.entries:[],ge=Tt(vt[j]);return{id:j,index:ee.length,length:ee.length,occupied_by:Array.isArray(ge.occupied_by)?ge.occupied_by.filter(Le=>typeof Le=="string"):[]}});for(let g of Array.isArray(P.runnable)?P.runnable:[]){let x=g&&g.bead_id;if(typeof x!="string"||se.has(x))continue;se.add(x);let j=g.workflow&&typeof g.workflow=="object"?g.workflow:null,te=j&&typeof j.route=="string"&&j.route||(typeof g.route=="string"?g.route:null),ee=Lh(Tt(Ae),g.exec_pins,te);Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&M.set(x,g.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)),typeof g.title=="string"&&g.title.length>0&&K.set(x,g.title),j&&R.set(x,j),Array.isArray(g.scope)&&q.set(x,g.scope.filter(ge=>typeof ge=="string"&&ge.length>0)),u.push({...W(x),title:g.title||ze[x]||x,lane:"runnable",draggable:!0,reason:Ld(pt,x),created_at:g.created_at??void 0,updated_at:g.updated_at??void 0,status:typeof g.status=="string"?g.status:void 0,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",workflow:j||(te?{route:te,chips:{route:te}}:null),...ee?{exec_chips:ee}:{},blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)}:{},place_index:kt.length,place_lanes:S})}for(let g of Ce){let x=g&&g.bead_id;if(typeof x!="string"||se.has(x)||(se.add(x),o!==void 0&&typeof g.added_at=="number"&&g.added_at<o))continue;let j=Rh(Ne,x),te=j&&typeof j.done_kind=="string"?j.done_kind:null;w.push({...W(x),lane:"done",done:!0,done_layout:"three_line",usage:mn(Ne,x),work_ms:zo(Ne,x),done_at:typeof g.added_at=="number"?g.added_at:void 0,done_kind:te,badges:[...te&&Od[te]?[Od[te]]:[],...Wo(Ne,x)]})}}let U=new Map;s.forEach((P,fe)=>{P&&typeof P.root_dir=="string"&&U.set(P.root_dir,fe)});let ne=n&&n.running_sort==="repo"?"repo":"started";d.sort((P,fe)=>{let we=P.kind==="session",Ae=fe.kind==="session";if(we!==Ae)return we?1:-1;if(we&&Ae){let ze=sa(fe.updated_at)-sa(P.updated_at);return ze!==0?ze:P.id.localeCompare(fe.id)}if(ne==="repo"){let ze=U.get(P.root_dir)??Number.MAX_SAFE_INTEGER,Je=U.get(fe.root_dir)??Number.MAX_SAFE_INTEGER;if(ze!==Je)return ze-Je}let Ge=typeof P.started_at=="number"&&Number.isFinite(P.started_at)?P.started_at:null,Ne=typeof fe.started_at=="number"&&Number.isFinite(fe.started_at)?fe.started_at:null;return Ge!==null&&Ne!==null&&Ge!==Ne?Ge-Ne:Ge===null&&Ne!==null?1:Ge!==null&&Ne===null?-1:P.id.localeCompare(fe.id)}),w.sort((P,fe)=>(fe.done_at??0)-(P.done_at??0));let Te=s.length>0?s:r.map(P=>({root_dir:P&&P.root_dir,name:P&&P.name,auto_advance:P&&P.auto_advance,auto_merge:P&&P.auto_merge,slots:P&&P.slots,revision:P&&P.revision,runner_catalog:P&&P.runner_catalog})),Z=new Set(u.map(P=>P.root_dir)),ce=[];for(let P of Te){if(!P||typeof P.root_dir!="string")continue;let fe=F.get(P.root_dir)||[],we=H.get(P.root_dir)||[];!(fe.length>0||we.some(Ge=>Ge.items.length>0||Ge.occupied_by.length>0))&&!Z.has(P.root_dir)||ce.push({root_dir:P.root_dir,name:P.name||P.root_dir,auto_advance:P.auto_advance===!0,auto_merge:P.auto_merge===!0,slots:typeof P.slots=="number"&&P.slots>=Rd?P.slots:Rd,revision:typeof P.revision=="number"?P.revision:0,runner_catalog:Tt(P.runner_catalog),items:fe,sublanes:{parallel:fe,serial:we},serial_lane_count:V.get(P.root_dir)||0,raw_queue_length:ae.get(P.root_dir)||0})}let z={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:h,queue_groups:ce,running:d,pr_wait:_,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(ae),owner_of:{},pending_lanes_kept:[]},Oe=Sd(z);for(let P of E)Oe.has(P.id)||Oe.set(P.id,{root_dir:P.root_dir,workspace_name:P.workspace_name,lane:"done",state:"done"});let Se=new Map;for(let[P,fe]of M)for(let we of fe){let Ae=Se.get(we);Ae?Ae.includes(P)||Ae.push(P):Se.set(we,[P])}for(let P of[...z.queue,...z.runnable]){if(!Object.hasOwn(P,"blocked_by"))continue;let fe=Oe.get(P.id);P.blockers=(P.blocked_by||[]).map(we=>Ed(we,fe,Oe,s)),P.blocker_warnings=P.blockers.filter(we=>we.missing_internal).map(we=>`\u26A0 \uC120\uD589 ${we.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),P.blocker_warnings.length>0&&(P.alert=!0)}for(let P of[...z.queue,...z.runnable,...z.running,...z.pr_wait]){let fe=P.lane==="running"||P.lane==="pr_wait"?[]:(P.blockers||[]).map(Ih),we=[];for(let Ne of Se.get(P.id)||[]){let ze=Ph(Ne,Oe);ze&&we.push(ze)}let Ae=P.lane==="running"||P.lane==="pr_wait"?[]:P.blocker_warnings||[];if(fe.length===0&&we.length===0&&Ae.length===0)continue;let Ge={predecessors:fe,successors:we,warnings:Ae};P.dependency_chips=Ge}jh(z,D,q,Oe,s),z.chains=Dh(M,Oe,s);let me=Td(z.queue_groups);for(let P of z.queue_groups)for(let fe of P.sublanes.serial){let we=me.get(Cd(P.root_dir,fe.id));we&&(fe.cross_wait_peers=we)}let le=qh(z.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],M,Oe,s,K,R);z.chain_lanes=le.chain_lanes,z.pending_lanes_kept=le.pending_lanes_kept;let ve=new Map;for(let P of[...z.running,...z.queue,...z.runnable])ve.has(P.id)||ve.set(P.id,P);let xe=new Set;for(let P of z.chain_lanes)for(let fe of P.rows){xe.add(fe.id);let we=ve.get(fe.id);we&&(we.overlap_chips&&(fe.overlap_chips=we.overlap_chips),we.scope_state&&(fe.scope_state=we.scope_state))}let Y=[];for(let P of F.values())for(let fe of P)xe.has(fe.id)||Y.push(fe);Y.sort((P,fe)=>{let we=P.workspace_name.localeCompare(fe.workspace_name);return we!==0?we:(P.queue_index??0)-(fe.queue_index??0)}),z.parallel_rows=Y;let X={};for(let[P,fe]of Oe)typeof fe.root_dir=="string"&&fe.root_dir.length>0&&(X[P]=fe.root_dir);z.owner_of=X;let ye=z.runnable.length,_e=z.runnable;a.show_blocked||(_e=_e.filter(P=>P.blocked!==!0));let je=_e.length;a.spec==="with"?_e=_e.filter(P=>!!P.spec_id):a.spec==="without"&&(_e=_e.filter(P=>!P.spec_id)),z.runnable_hidden={blocked:ye-je,spec:je-_e.length};let ie=(P,fe)=>{let we=sa(fe.updated_at)-sa(P.updated_at);return we!==0?we:P.id.localeCompare(fe.id)},st=i==="repo_spec"?(P,fe)=>{let we=P.spec_id?0:1,Ae=fe.spec_id?0:1;return we!==Ae?we-Ae:ie(P,fe)}:ie;if(i==="updated_flat")z.runnable=_e.slice().sort(ie),z.runnable_sections=[];else{let P=new Map;for(let Ae of _e){let Ge=P.get(Ae.root_dir);Ge?Ge.push(Ae):P.set(Ae.root_dir,[Ae])}let fe=[],we=[];for(let Ae of Te){if(!Ae||typeof Ae.root_dir!="string")continue;let Ge=(P.get(Ae.root_dir)||[]).slice().sort(st);P.delete(Ae.root_dir),Ge.length!==0&&(fe.push({root_dir:Ae.root_dir,name:Ae.name||Ae.root_dir,items:Ge.map(Ne=>({...Ne,workspace_name:""}))}),we.push(...Ge))}for(let[Ae,Ge]of P){let Ne=Ge.slice().sort(st);fe.push({root_dir:Ae,name:Ne[0]?.workspace_name||Ae,items:Ne.map(ze=>({...ze,workspace_name:""}))}),we.push(...Ne)}z.runnable=we,z.runnable_sections=fe}return z}var Dd="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Nd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function qd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Ud="bdui.monitor.done-range",Wd="bdui.monitor.running_sort",zd="bdui.monitor.candidate_sort",Hd="beads-ui.monitor.candidate-filter",Gd="beads-ui.monitor.sections";function Bh(){try{let e=window.localStorage.getItem(Hd);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:zr.show_blocked,spec:qi.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...zr}}}function Fd(e){try{window.localStorage.setItem(Hd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Uh(){try{let e=window.localStorage.getItem(zd);return Os.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Wh(e){try{window.localStorage.setItem(zd,e)}catch{}}function zh(){try{let e=window.localStorage.getItem(Gd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function jd(e){try{window.localStorage.setItem(Gd,JSON.stringify(e))}catch{}}function Hh(){try{let e=window.localStorage.getItem(Ud);return _n(e)?e:ln}catch{return ln}}function Gh(e){try{window.localStorage.setItem(Ud,e)}catch{}}function Vh(){try{return window.localStorage.getItem(Wd)==="repo"?"repo":"started"}catch{return"started"}}function Kh(e){try{window.localStorage.setItem(Wd,e)}catch{}}var Vd="tab:monitor:pipeline",Yh=1e3,Zh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Bd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Qh(e){return e>=1&&e<=Bd.length?Bd[e-1]:`(${e})`}function Kd(e,t){let n=Rt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),h=Hh(),w=Vh(),E=Bh(),F=Uh(),H=zh(),V=null,ae=null,M=null,D=[],q=null;function K(){let v=Wn.find(y=>y.value===h);return v?v.label:""}let R=document.createElement("div");R.className="mon",e.appendChild(R);let U=document.createElement("div");U.className="worker-drawer-overlay",U.hidden=!0;let ne=document.createElement("div");ne.className="worker-drawer-overlay__backdrop";let Te=document.createElement("div");Te.className="worker-drawer-host mon2-drawer",U.append(ne,Te),e.appendChild(U);let Z=Fi(null,null),ce=new Map,z=new Map,Oe=null,Se=null,me=null,le=Mr(Te,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{V=null,U.hidden=!0,W()}});async function ve(v,y,$,N,re=!0){if(!o||!$)return null;let he=await o(v,{...y,root_dir:$,expected_revision:N});if(he&&he.conflict&&re){he.queue&&z.set($,he.queue);let k=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:N;he=await o(v,{...y,root_dir:$,expected_revision:k})}return he&&he.queue&&$&&z.set($,he.queue),he}function xe(v,y){let $=z.get(v),N=s&&s.get?s.get():null,re=(Array.isArray(N)?N:[]).find(k=>k?.root_dir===v);return($||re)?.merge_queue?.find(k=>k.bead_id===y)?.continuation_action}async function Y(v,y,$,N){let re=await ve(v,y,$,N),he=z.get($)?.revision??re?.queue?.revision??N;return Ln(re,(k,A)=>ve(v,{...y,continuation:k,decision_token:A},$,he,!1),{refresh:k=>ve(v,y,$,k?.queue?.revision??z.get($)?.revision??he,!1)})}async function X(v,y,$,N){let re=await Ln({continuation_mismatch:N},(k,A)=>ve("worker-merge-queue-add",{bead_id:y,continuation:k,decision_token:A},v,$,!1)),he=re?.queue?.merge_queue?.find(k=>k.bead_id===y)?.continuation_action;re?.applied!==!0&&he?.continuation===null&&he.mismatch&&await X(v,y,re.queue.revision,he.mismatch)}async function ye(v,y,$){let N=await ve("worker-discard",v,y,$);if(N&&N.discarded===!0){de(Go(N),"success",5e3);return}if(N&&N.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${N.reason}`,"error");return}if(N&&N.accepted&&N.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(N&&N.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${N.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}N&&!N.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function _e(v,y,$){return!o||!$?null:await o(v,{...y,root_dir:$})}async function je(){let v=new Map;for(let y of Z.pr_wait)v.has(y.root_dir)||v.set(y.root_dir,y.expected_revision);for(let[y,$]of v)await ve("worker-merge-queue-add-all",{},y,$)}function ie(v){let y=H[v];return!!(y&&y.runnable===!0)}function Ye(v){let y={...H[v]||{}};y.runnable=!y.runnable,H={...H,[v]:y},jd(H),W()}function st(v){return H[v]===!0}function P(v){H={...H,[v]:H[v]!==!0},jd(H),W()}function fe(v){let y=Z.queue_groups.find($=>$.root_dir===v);if(!y)return null;for(let $=0;$<y.serial_lane_count;$+=1){let N=`s${$+1}`,re=y.sublanes.serial.find(he=>he.id===N);if(!re||re.raw_length===0&&re.occupied_by.length===0)return N}return null}function we(v,y){let $=Z.queue_groups.find(re=>re.root_dir===v),N=$?$.sublanes.serial.find(re=>re.id===y):void 0;return N?N.raw_length:0}function Ae(v,y){let $=ce.get(v),N=ce.get(y);if(!$||!N)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let re=Nd($),he=Nd(N);if(re!==null&&re===he&&$.root_dir===N.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let k=qd($),A=qd(N);if(k&&he!==null){let be=he;return{kind:"ops",title:`${be} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:N.root_dir,ops:[{bead_id:v,lane:be,index:we(N.root_dir,be)}]}}if(re!==null&&A&&he===null){let be=re;return{kind:"ops",title:`${be} \uB05D\uC5D0 ${y}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:y,lane:be,index:we($.root_dir,be)}]}}if(k&&re===null&&A&&he===null){let be=fe($.root_dir);return be===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${be} \uB808\uC778\uC5D0 ${y} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:y,lane:be,index:0},{bead_id:v,lane:be,index:1}]}}return!k&&!A?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:k?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function Ge(v,y){let $=Ae(v,y.id);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:$.kind==="note"?{kind:"note",text:$.text}:$.kind==="disabled"?{kind:"disabled",label:Dd,title:$.title}:{kind:"place",label:Dd,title:$.title}}}function Ne(v,y){if(!M||M.bead_id!==v)return null;let $=M.counterpart_id,N=y.filter(re=>re.id===$);return N.length===0?null:{rows:N.map(re=>Ge(v,re))}}function ze(v){let y=v.dependency_chips||null,$=v.overlap_chips||[],N=v.scope_state==="missing";if(!y&&$.length===0&&!N)return null;let re=Ne(v.id,$);return{...y||{},...$.length>0?{overlaps:$}:{},...N?{scope_missing:!0}:{},...re?{popover:re}:{}}}function Je(v){let y=ze(v);return y?{...v,dependency_chips:y}:v}async function wt(v,y){let $=Ae(v,y);if(M=null,$.kind!=="ops"){W();return}let N=Le($.root_dir,$.ops[0].bead_id);for(let re of $.ops){let he=await pt(re,$.root_dir,N);if(he===null)break;N=he}W()}async function pt(v,y,$){try{let N=await ve("worker-queue-place",v,y,$,!1);if(N&&N.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!N||N.applied!==!0)return de(N&&typeof N.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${N.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let re=N.queue?N.queue.revision:void 0;return typeof re!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):re}catch(N){return de(j(N),"error"),null}}function J(v){let y=ie(v.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${y?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${y?"\u25B8":"\u25BE"}
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
    </header>`}function Q(v,y){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${y}
    </div>`}function Me(v){if(ae!==v.id)return null;let y=Z.queue_groups.find(N=>N.root_dir===v.root_dir),$=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...Z.chain_lanes.map((N,re)=>({id:`lane:${re}`,label:`\uC5F0\uACB0 ${re+1} \uB05D\uC5D0`,count:N.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...$.map(N=>({id:`serial:${N.id}`,label:`${y?y.name:""} \uC9C1\uB82C ${Number(N.id.slice(1))}`,count:N.length}))]}}function Xe(v){return Q(v,$i(Je(v),Me(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(y,$)=>i($,v.root_dir):void 0}))}function Re(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(v=>Xe(v))}
      </div>`:c`${Z.runnable_sections.map(v=>{let y=ie(v.root_dir);return c`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${J({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${y?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map($=>Xe($))}
            </div>`}
      </section>`})}`}function ke(v,y){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${y}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Kn(Je(v))}
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
    </div>`}function We(){let v=st("parallel");return c`<section
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
        <span class="mon2-area__count">${Z.parallel_rows.length}</span>
      </header>
      ${v?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${Z.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:Z.parallel_rows.map((y,$)=>ke(y,$))}
          </div>`}
    </section>`}function Ze(v,y,$){return c`<div
      class="mon2-crow"
      style=${`--indent: ${y.indent}`}
      draggable=${y.draggable?"true":"false"}
      data-bead-id=${y.id}
      data-drag-kind="chain"
      data-root-dir=${y.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${$}
      data-queue-index=${typeof y.queue_index=="number"?String(y.queue_index):""}
    >
      ${v.cycle?"":c`<span class="mon2-crow__seq" aria-hidden="true"
            >${Qh(y.seq)}</span
          >`}
      ${y.workspace_name?c`<span class="worker-mini__repo" title=${y.root_dir}
            >${y.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${y.id}</span>
      ${Br(y.workflow)}
      <span class="mon2-crow__title">${y.title}</span>
      ${y.predecessors.map(N=>c`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${N}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${y.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${y.location_label}`:y.location_label}</span
      >
      ${y.draggable?c`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${y.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${jr(ze(y),{lane:ce.get(y.id)?.lane})}
    </div>`}function nt(v){return c`<div class="mon2-clane" data-lane-id=${v.lane_id}>
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
            </div>`:v.rows.map((y,$)=>Ze(v,y,$))}
      </div>
    </div>`}function tt(v,y,$){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="repo-serial"
      data-root-dir=${y.root_dir}
      data-lane-id=${v.id}
      data-row-index=${$}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Kn(Je(y))}
    </div>`}function ft(v){if(v.length===0)return"";let y=v.length-1;return`${v[0].id} \uC810\uC720${y>0?` +${y}`:""}`}function kt(v){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Kn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function xt(v,y){return c`<div
      class="mon2-lane${y.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(y.raw_length)}
    >
      ${hn({id:"",lane:y.id,title:`${v.name} \xB7 \uC9C1\uB82C ${y.index+1}`,items:y.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${y.id}
          data-lane-length=${String(y.raw_length)}
        >
          ${y.occupants.map($=>kt($))}
          ${y.items.length>0?y.items.map(($,N)=>tt(y,$,N)):y.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${y.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${y.occupants.length>0?y.occupants.map($=>`${$.id} \u2014 ${$.badge}`).join(`
`):""}
            >${ft(y.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${y.empty?c`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${y.index+1} 비어 있음
          </div>`:""}
      ${y.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(y.cross_wait_peers||[]).map($=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${$.workspace_name}·${$.lane}과 교차 대기
          </div>`)}
    </div>`}function vt(){let v=st("serial"),y=Z.chain_lanes.some($=>$.pending&&$.rows.length===0);return c`<section
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
          ?disabled=${y}
          title=${y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${v?"":c`<div class="mon2-area__body">
            ${Z.chain_lanes.map($=>nt($))}
            ${Z.queue_groups.map($=>$.sublanes.serial.map(N=>xt($,N)))}
          </div>`}
    </section>`}function Ct(){return c`<div class="mon2-wait">${We()}${vt()}</div>`}function gt(v){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(y=>Si({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,kind:y.kind,...y.kind==="session"?{updated_at:y.updated_at}:{},workflow:y.workflow||null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},v,V,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:ze(y)}}))}
    </div>`}function He(v){let y={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Zh.map($=>{let N=y[$.lane],re=$.lane==="runnable"?Z.runnable_flat?N.length>0?Re():void 0:Z.runnable_sections.length>0?Re():void 0:$.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Ct():void 0:$.lane==="running"?gt(v):N.length>0?c`${N.map(he=>Kn(he))}`:void 0;return hn({id:`monitor-${$.lane}`,lane:$.pane,title:$.lane==="done"?`\uC644\uB8CC\xB7${K()}`:$.title,items:N,empty:$.empty,body:re,live:$.lane==="running"&&N.length>0,controls:$.lane==="runnable"?Ce():void 0,header_control:I($.lane,N.length)})})}
      </div>`}function Ce(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${E.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${qi.map(v=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${E.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${E.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function I(v,y){return v==="runnable"?c`<select
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
      </select>`:v==="pr_wait"&&y>0?c`<button
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
      </select>`:""}function W(){let v=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=d(),N=()=>Fi(v,y,{done_since:ir(h,$),running_sort:w,candidate_filter:E,candidate_sort:F,pending_lanes:D});Z=N(),Z.pending_lanes_kept.length!==D.length&&(D=Z.pending_lanes_kept.map(re=>D[re]),Z=N()),ce=new Map;for(let re of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!re.non_occupying&&!ce.has(re.id)&&ce.set(re.id,re);Ke(He($),R),O()?.render(),se(),G()}function se(){let v=new Map;for(let y of Z.queue_groups)v.set(y.root_dir,y.auto_advance);for(let y of Array.from(R.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let $=y.closest(".mon2-item")?.getAttribute("data-root-dir")||"",N=v.get($);typeof N=="boolean"&&y.setAttribute("title",`${y.textContent||""} \xB7 ${N?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function O(){if(me)return me;let v=R.querySelector(".mon2-deck");return v?(me=bd(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:K,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:S,onFocusChange:y=>{q=y,G()}}),me):null}function G(){R.classList.toggle("has-focus",q!==null);for(let v of Array.from(R.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q);for(let v of Array.from(R.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=ce.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",q!==null&&!!y&&y.root_dir===q)}for(let v of Array.from(R.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q)}function $e(v,y){let $=a?a():void 0;if(!y||!$||y===$||!l){r(v);return}l(y).then(()=>{r(v)}).catch(N=>{n("workspace switch for %s failed: %o",y,N)})}function S(v){if(!v)return;let y=a?a():void 0,$=()=>{try{u?.gotoView("worker")}catch(N){n("gotoView(worker) failed: %o",N)}};if(!l||y&&y===v){$();return}l(v).then($).catch(N=>{n("workspace switch for %s failed: %o",v,N),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function g(v){un(v).then(y=>{de(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function x(v){let y=ce.get(v)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function j(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let y=v;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function te(v,y,$){let{root_dir:N}=x(y);if(!(!y||!$||$===y))try{await _e(v,{a:y,b:$},N)}catch(re){de(j(re),"error")}}function ee(){let v=new Map,y=s&&s.get?s.get():null,$=N=>Array.isArray(N)?N.filter(re=>typeof re=="string"&&re.length>0):[];for(let N of Array.isArray(y)?y:[]){if(!N||typeof N!="object")continue;let re=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[he,k]of Object.entries(re))Array.isArray(k)&&v.set(he,$(k));for(let he of[...Array.isArray(N.runnable)?N.runnable:[],...Array.isArray(N.session_active)?N.session_active:[]])he&&typeof he.bead_id=="string"&&Array.isArray(he.blocked_by)&&he.blocked_by.length>0&&v.set(he.bead_id,$(he.blocked_by))}return v}function ge(){let v=new Map;for(let $ of Z.chain_lanes)v.set($.lane_id,$.rows.map(N=>N.id));let y=new Map;for(let $ of Z.parallel_rows)typeof $.queue_index=="number"&&y.set($.id,$.queue_index);for(let $ of Z.queue_groups)for(let N of $.sublanes.serial)for(let re of N.items)typeof re.queue_index=="number"&&y.set(re.id,re.queue_index);return{blocked_by_map:ee(),owner_of:new Map(Object.entries(Z.owner_of)),lane_order:v,parallel_rows:Z.parallel_rows.map($=>({bead_id:$.id,root_dir:$.root_dir,queue_index:$.queue_index??0})),parallel_raw_length:new Map(Object.entries(Z.parallel_raw_length)),queue_index_of:y}}function Le(v,y){let $=ce.get(y);if($&&$.root_dir===v)return $.expected_revision;let N=Z.queue_groups.find(re=>re.root_dir===v);return N?N.revision:0}async function et(v,y){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let $=await ve(v.type,v.payload,v.root_dir,Le(v.root_dir,y));return $&&$.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):$&&$.applied===!1?(de($.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await _e(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch($){return de(j($),"error"),!1}}async function ot(v,y){let $=yd(v,y,ge());if("refused"in $){de($.refused,"error");return}if(y.kind==="chain"){let N=Z.chain_lanes.find(he=>he.lane_id===y.lane_id),re=N&&N.pending&&N.rows.length===0?Number(N.lane_id.slice(8)):-1;re>=0&&D[re]&&(D=D.map((he,k)=>k===re?{seed:v.bead_id}:he))}for(let N of $.ops)if(!await et(N,v.bead_id))break;W()}async function De(v,y){let $=ce.get(v);if(!$){W();return}let N={kind:"candidate",bead_id:v,root_dir:$.root_dir};if(y==="new-lane"){D.some(he=>he.seed===null)||(D=[...D,{seed:null}]),W();let re=Z.chain_lanes.find(he=>he.pending&&he.rows.length===0);if(!re)return;await ot(N,{kind:"chain",lane_id:re.lane_id,marker_index:0});return}if(y.startsWith("lane:")){let re=Z.chain_lanes[Number(y.slice(5))];if(!re){W();return}await ot(N,{kind:"chain",lane_id:re.lane_id,marker_index:re.rows.length});return}if(y.startsWith("serial:")){let re=y.slice(7),he=($.place_lanes||[]).find(k=>k.id===re);await ot(N,{kind:"repo-serial",root_dir:$.root_dir,lane_id:re,index:he?he.index:0});return}await ot(N,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function it(v,y){let $=Z.parallel_rows,N=$.findIndex(p=>p.id===v);if(N<0)return;let re=$[N].root_dir,he=[];$.forEach((p,b)=>{p.root_dir===re&&he.push(b)});let k=he.indexOf(N),A=he[k+y];if(typeof A!="number")return;let be=y===-1?A:he[k+2]??Math.min($.length,A+1);await ot({kind:"parallel",bead_id:v,root_dir:re,queue_index:$[N].queue_index??0},{kind:"parallel",marker_index:be})}async function Pt(v){for(let y of Z.chain_lanes){let $=y.rows.find(N=>N.id===v);if(!(!$||!$.draggable)){await ot({kind:"chain",bead_id:v,root_dir:$.root_dir,lane_id:y.lane_id,...typeof $.queue_index=="number"?{queue_index:$.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let ht=null,Vt=!1,Mt=null;function qt(){Mt!==null&&clearTimeout(Mt),Mt=setTimeout(()=>{Mt=null,Vt=!1},0)}function Gt(v,y){let $=y&&typeof y.closest=="function"?y.closest("[data-row-index]"):null;if($&&v.contains($)){let N=Number($.getAttribute("data-row-index"));return Number.isFinite(N)?N:0}return v.querySelectorAll("[data-row-index]").length}function jt(v){let y=v.target,$=typeof y?.closest=="function"?y.closest("[data-drop]"):null;if(!$||!ht)return null;let N=$.getAttribute("data-drop");if(N==="candidate")return{zone:$,target:{kind:"candidate"}};if(N==="parallel")return{zone:$,target:{kind:"parallel",marker_index:Gt($,y)}};if(N==="chain")return{zone:$,target:{kind:"chain",lane_id:$.getAttribute("data-lane-id")||"",marker_index:Gt($,y)}};if(N==="repo-serial"){let re=$.getAttribute("data-root-dir")||"";if(re!==ht.root_dir)return null;let he=typeof y?.closest=="function"?y.closest("[data-queue-index]"):null,k=he&&$.contains(he)?he.getAttribute("data-queue-index"):$.getAttribute("data-lane-length"),A=Number(k);return{zone:$,target:{kind:"repo-serial",root_dir:re,lane_id:$.getAttribute("data-lane-id")||"",index:Number.isFinite(A)?A:0}}}return null}function Dt(){for(let v of Array.from(R.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function Ue(v){let y=v.target,$=typeof y?.closest=="function"?y.closest('[draggable="true"][data-bead-id]'):null,N=$?$.closest("[data-drag-kind]"):null;if(!N)return;let re=N.getAttribute("data-bead-id")||"",he=N.getAttribute("data-drag-kind")||"",k=N.getAttribute("data-root-dir")||"";if(!re||!he||!k)return;let A=N.getAttribute("data-queue-index")||"",be=Number(A),p=N.getAttribute("data-lane-id")||"";ht={kind:he,bead_id:re,root_dir:k,...A!==""&&Number.isFinite(be)?{queue_index:be}:{},...p?{lane_id:p}:{}},Vt=!0,ae=null,R.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",re),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function Jt(v){let y=jt(v);y&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),y.zone.classList.add("is-drop-over"))}function Kt(v){let y=v.target;typeof y?.closest=="function"&&y.closest("[data-drop]")?.classList.remove("is-drop-over")}function at(){ht=null,Dt(),R.classList.remove("is-dragging"),qt()}function Ie(v){let y=jt(v),$=ht;ht=null,Dt(),R.classList.remove("is-dragging"),!(!y||!$)&&(v.preventDefault(),ot($,y.target))}function L(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function pe(v,y){let{item:$,root_dir:N,revision:re}=x(y),he=$?.attempt_id||"",k=v.classList;if(k.contains("worker-dep__remove")){te("dep-remove",y,v.dataset.blockerId||"");return}if(k.contains("mon2-rowops__up")||k.contains("mon2-rowops__down")){it(y,k.contains("mon2-rowops__up")?-1:1);return}if(k.contains("mon2-rowops__remove")){ve("worker-queue-remove",{bead_id:y},N,re);return}if(k.contains("mon2-crow__detach")){Pt(y);return}if(k.contains("mon-overlap__chip")){let A=v.getAttribute("data-overlap-id")||"";M=!!M&&M.bead_id===y&&M.counterpart_id===A?null:{bead_id:y,counterpart_id:A},W();return}if(k.contains("mon-overlap__place")){wt(y,v.getAttribute("data-counterpart-id")||"");return}if(k.contains("worker-card__place")){ae=ae===y?null:y,W();return}if(k.contains("worker-card__place-cancel")){ae=null,W();return}if(k.contains("worker-card__place-lane")){let A=v.getAttribute("data-lane")||"parallel";ae=null,De(y,A);return}if(k.contains("rtile__session")){V=he,he&&$&&(U.hidden=!1,le.open({attempt_id:he,root_dir:N,meta:L($)})),W();return}if(k.contains("rtile__pause")){_e("worker-attempt-pause",{attempt_id:he},N);return}if(k.contains("rtile__resume")){Or().then(A=>{if(A!==null)return Y("worker-attempt-resume",{attempt_id:he,...A!==""?{instructions:A}:{}},N,re)});return}if(k.contains("rtile__dismiss")){ve("worker-attempt-dismiss",{attempt_id:he},N,re);return}if(k.contains("rtile__discard")){if(!_(Ss(y,"unmerged")))return;ye({bead_id:y,...he?{attempt_id:he}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},N,re);return}if(k.contains("worker-mini__merge")){let A=xe(N,y);A?.mismatch&&A.continuation===null?X(N,y,re,A.mismatch):ve("worker-merge-queue-add",{bead_id:y},N,re);return}if(k.contains("worker-mini__merge-cancel")){ve("worker-merge-queue-remove",{bead_id:y},N,re);return}if(k.contains("worker-mini__discard")){let A=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ss(y,A)))return;ye({bead_id:y,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},N,re);return}if(k.contains("worker-mini__revise-fix")){Y("worker-revise-fix",{bead_id:y},N,re);return}k.contains("worker-mini__revise-approve")&&ve("worker-revise-approve",{bead_id:y},N,re)}function Pe(v){let y=Vt;Vt=!1;let $=v.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest(".worker-drawer-overlay")||$.closest("a"))return;let N=$.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(N){v.preventDefault();let T=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||N.textContent?.trim()||"";T&&g(T);return}let re=$.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(re){v.preventDefault();let f=re.getAttribute("data-root-dir")||ce.get($.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||re.getAttribute("title")||"";S(f);return}let he=$.closest(".mon2-sec__toggle");if(he){v.preventDefault(),Ye(he.getAttribute("data-root-dir")||"");return}let k=$.closest(".mon2-area__toggle");if(k){v.preventDefault(),P(k.getAttribute("data-area")||"parallel");return}if($.closest(".mon2-newlane")){v.preventDefault(),D=[...D,{seed:null}],W();return}if($.closest(".mon-merge-all")){v.preventDefault(),je();return}let A=$.closest(".mon-filter__spec");if(A){v.preventDefault(),E={...E,spec:A.getAttribute("data-spec")||"all"},Fd(E),W();return}let be=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!be)return;let p=be.getAttribute("data-bead-id")||"",b=$.closest("button");if(b){v.preventDefault(),pe(b,p);return}p&&!y&&(v.preventDefault(),$e(p,be.getAttribute("data-root-dir")||x(p).root_dir))}function ct(v){let y=v.target;if(!y||typeof y.closest!="function")return;let $=y.closest(".mon-filter__blocked");if($){E={...E,show_blocked:$.checked},Fd(E),W();return}let N=y.closest(".mon-candidate-sort");if(N){F=Os.some(k=>k.value===N.value)?N.value:"repo_spec",Wh(F),W();return}let re=y.closest(".mon-running-sort");if(re){w=re.value==="repo"?"repo":"started",Kh(w),W();return}let he=y.closest(".mon-done-range");he&&(h=_n(he.value)?he.value:ln,Gh(h),W())}function At(v){if(!M)return;let y=v.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(M=null,W())}function _t(v){v.key!=="Escape"||!M||(M=null,W())}e.addEventListener("click",Pe),e.addEventListener("change",ct),document.addEventListener("click",At),document.addEventListener("keydown",_t),e.addEventListener("dragstart",Ue),e.addEventListener("dragover",Jt),e.addEventListener("dragleave",Kt),e.addEventListener("drop",Ie),e.addEventListener("dragend",at),s&&typeof s.subscribe=="function"&&(Oe=s.subscribe(()=>{try{z.clear(),W()}catch{}}));function It(){Se!==null&&(clearInterval(Se),Se=null)}function Ft(){Mt!==null&&(clearTimeout(Mt),Mt=null)}return{load(){n("load"),W(),Se===null&&(Se=setInterval(()=>{try{W()}catch{}},Yh))},pause(){It()},clear(){It(),Ft(),Oe&&(Oe(),Oe=null),le.destroy(),U.hidden=!0,me?.destroy(),me=null,e.removeEventListener("click",Pe),e.removeEventListener("change",ct),document.removeEventListener("click",At),document.removeEventListener("keydown",_t),e.removeEventListener("dragstart",Ue),e.removeEventListener("dragover",Jt),e.removeEventListener("dragleave",Kt),e.removeEventListener("drop",Ie),e.removeEventListener("dragend",at),e.replaceChildren()}}}function Yd(e,t,n){let r=Rt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return w=>{w.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function _(){s&&Ke(u(),s),o&&Ke(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ke(c``,s),o&&Ke(c``,o)}}}var Zd=["bug","feature","task","epic","chore"];function Qd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xd=["Critical","High","Medium","Low","Backlog"];function Jd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let K of Zd){let R=document.createElement("option");R.value=K,R.textContent=Qd(K),o.appendChild(R)}a.replaceChildren();for(let K=0;K<=4;K+=1){let R=document.createElement("option");R.value=String(K);let U=Xd[K]||"Medium";R.textContent=`${K} \u2013 ${U}`,a.appendChild(R)}}w();function E(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,l.disabled=q,d.disabled=q,_.disabled=q,_.textContent=q?"Creating\u2026":"Create"}function H(){u.textContent=""}function V(q){u.textContent=q}function ae(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let K=window.localStorage.getItem("beads-ui.new.priority");K&&/^\d$/.test(K)?a.value=K:a.value="2"}catch{o.value="",a.value="2"}}function M(){let q=o.value||"",K=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),K.length>0&&window.localStorage.setItem("beads-ui.new.priority",K)}async function D(){H();let q=String(s.value||"").trim();if(q.length===0){V("Title is required"),s.focus();return}let K=Number(a.value||"2");if(!(K>=0&&K<=4)){V("Priority must be 0..4"),a.focus();return}let R=String(o.value||""),U=String(l.value||""),ne={title:q};R.length>0&&(ne.type=R),String(K).length>0&&(ne.priority=K),U.length>0&&(ne.description=U),F(!0);try{await t("create-issue",ne)}catch{F(!1),V("Failed to create issue");return}M(),F(!1),E()}return n.addEventListener("cancel",q=>{q.preventDefault(),E()}),h.addEventListener("click",()=>E()),d.addEventListener("click",()=>E()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),D())}),r.addEventListener("submit",q=>{q.preventDefault(),D()}),{open(){r.reset(),H(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var Xh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Jh(e,t){return Ia(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ep(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Jh(r,e);return c`<button
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
  `}function tp(e,t,n){return c`
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
  `}function np(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Xh.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var eb=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function rp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(z=>de(z,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function _(){if(d)return d;let z=a.querySelector('[data-pane="execution"]');return z?(d=Qo(z,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Oe=>t.queueStore?.set?.(Oe)}),d):null}function h(){return c`
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
    `}function w(){let z=r.get();return c`
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
        ${z?c`
              ${ep(z,s(),V)}
              ${tp(z,u,{onDraft:Oe=>{u=Oe},onAdd:ae,onRemove:M})}
              ${np(z,D)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function E(z){let Oe=r.get();if(Oe)try{let Se=await n("display-policy-set",{expected_revision:Oe.revision,policy:z(Oe)});F(Se),Se&&Se.conflict&&Se.policy&&(Se=await n("display-policy-set",{expected_revision:Se.policy.revision,policy:z(Se.policy)}),F(Se)),Se&&Se.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(z){z&&z.policy&&typeof z.policy=="object"&&r.set(z.policy)}function H(z){E(z)}function V(z){let Oe=r.get();if(!Oe)return;let Se=!tb(z,Oe);H(me=>nb(z,me,Se))}function ae(){let z=u.trim();z.length!==0&&(u="",H(Oe=>Oe.hidden_prefixes.includes(z)?{hidden_prefixes:Oe.hidden_prefixes}:{hidden_prefixes:[...Oe.hidden_prefixes,z]}),q())}function M(z){H(Oe=>({hidden_prefixes:Oe.hidden_prefixes.filter(Se=>Se!==z)}))}function D(z){let Oe=r.get();if(!Oe)return;let Se=Oe.chips[z]===!1;H(()=>({chips:{[z]:Se}}))}function q(){Ke(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${eb.map(z=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${z.id}
                  aria-selected=${String(i===z.id)}
                  aria-controls=${`settings-pane-${z.id}`}
                  @click=${()=>K(z.id)}
                >
                  <span class="settings-dialog__glyph">${z.glyph}</span>
                  ${z.label}
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
            ${h()} ${w()}
          </div>
        </div>
      `,a),_()}function K(z){i=z,q()}let R=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",R),a.addEventListener("cancel",R);let U=z=>{z.target===a&&ce()};a.addEventListener("click",U);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{l&&q()}));let Te=null;t.implPresetStore?.subscribe&&(Te=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function Z(z="execution"){l||(l=!0,t.onOpenChange?.(!0),i=z,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function ce(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Z,close:ce,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",R),a.removeEventListener("cancel",R),a.removeEventListener("click",U),ne&&(ne(),ne=null),Te&&(Te(),Te=null),d?.destroy(),d=null,a.remove()}}}function tb(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function nb(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var rb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],sp="usage-meter-card",sb="usage-meter-layer",op=600,ob=["token_expired","relogin_required"];function ap(e){return String(e).padStart(2,"0")}function ab(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ip(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${ap(r.getHours())}:${ap(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${rb[r.getMonth()]} ${r.getDate()} ${o}`;return`${ab(n,t)} \xB7 ${i}`}function ib(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function lp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function cp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var up=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function pp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function lb(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:pp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function cb(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=lb(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?pp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function dp(e,t){return`${e}:${t}`}function fp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){Ke(c``,e),e.hidden=!0,_()}function d(){if(l===null){let me=e.ownerDocument;l=me.createElement("div"),l.id=sb,l.className="usage-meter__layer",me.body.appendChild(l)}return l}function _(){l!==null&&(Ke(c``,l),l.remove(),l=null)}function h(me){n!==me&&(n===null&&(document.addEventListener("mousedown",E),document.addEventListener("keydown",H),window.addEventListener("resize",F)),n=me)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",E),document.removeEventListener("keydown",H),window.removeEventListener("resize",F))}function E(me){let le=me.target;le&&(e.contains(le)||l!==null&&l.contains(le))||(w(),ce())}function F(){ce()}function H(me){me.key==="Escape"&&(w(),ce())}function V(me){n===me?w():h(me),ce()}function ae(){w(),ce()}async function M(me,le){if(r.has(me.key))return;let ve=dp(me.key,le);r.set(me.key,le),a.delete(ve),ce();let xe=null;try{xe=await(await fetch(me.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:le})})).json()}catch{xe=null}if(t)return;if(r.delete(me.key),!xe||xe.ok!==!0){let X=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";a.set(ve,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${X}`}),ce();return}let Y=Array.isArray(xe.warnings)?xe.warnings.filter(X=>typeof X=="string"&&X.length>0):[];Y.length>0&&a.set(ve,{kind:"warn",text:Y.join(" \xB7 ")}),ce(),await Se()}function D(me,le,ve,xe){let Y=cp(me.pct),ye=`resets ${ip(me.resetsAt,xe)}${le?` \xB7 ${ve}`:""}`;return c`<span
      class="usage-meter__window ${lp(Y)}"
      style=${`--progress: ${Y}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${me.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function q(me,le,ve){let xe=le.available&&typeof le.ageSeconds=="number"&&le.ageSeconds>op,Y=xe&&typeof le.ageSeconds=="number"?`${Math.floor(le.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",X=le.accounts.filter(ie=>!ie.active).length,ye=`usage-meter__group${xe?" usage-meter__group--stale":""}`,_e=c`<span class="usage-meter__provider"
        >${me.label}</span
      >
      ${le.available?le.windows.map(ie=>D(ie,xe,Y,ve)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${X>0?c`<span class="usage-meter__badge">+${X}</span>`:""}`;if(le.accounts.length===0)return c`<span
        class=${ye}
        aria-label=${`${me.label} usage`}
        >${_e}</span
      >`;let je=n===me.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${me.label} usage`}
      aria-expanded=${je?"true":"false"}
      aria-controls=${sp}
      @click=${()=>V(me.key)}
    >
      ${_e}
    </button>`}function K(me,le){return c`<span class="usage-meter" aria-label="Usage">
      ${me.map(ve=>q(ve.provider,ve.snapshot,le))}
    </span>`}function R(me,le){let ve=cp(me.pct),xe=ip(me.resetsAt,le);return c`<span
      class="usage-meter__account-window ${lp(ve)}"
      style=${`--progress: ${ve}%`}
    >
      <span class="usage-meter__account-key">${me.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ve}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function U(me,le){return ob.includes(le)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${me.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(me,le,ve){let xe=le.status==="ok",Y=typeof le.ageSeconds=="number"&&le.ageSeconds>op,X=a.get(dp(me.key,le.number)),ye=r.get(me.key),_e=ye!==void 0,je=ye===le.number,ie=["usage-meter__account"];return le.active&&ie.push("usage-meter__account--active"),xe||ie.push("usage-meter__account--unavailable"),Y&&ie.push("usage-meter__account--stale"),c`<div class=${ie.join(" ")}>
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
              >${ib(le.ageSeconds)}</span
            >`}
        ${le.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${_e}
              @click=${()=>{M(me,le.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${le.windows.map(Ye=>R(Ye,ve))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(me,le.status)}
          </div>`}
      ${X===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${X.kind}"
          >
            ${X.text}
          </div>`}
    </div>`}function Te(me,le,ve){let xe=le.accounts.filter(Y=>Y.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${me.label} · 활성 ${xe} / 전체
        ${le.accounts.length}
      </h2>
      ${le.accounts.map(Y=>ne(me,Y,ve))}
    </section>`}function Z(me,le){return c`<div
      class="usage-meter__card"
      id=${sp}
      role="dialog"
      aria-label=${`${me.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Te(me.provider,me.snapshot,le)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let me=[];for(let xe of up){let Y=o.get(xe.key);Y&&me.push({provider:xe,snapshot:Y})}if(me.length===0){w(),u();return}let le=me.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);le||w();let ve=Date.now();Ke(K(me,ve),e),e.hidden=!1,le?z(le,ve):_()}function z(me,le){let ve=d(),xe=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;ve.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),ve.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-xe.right)}px`),Ke(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${Z(me,le)}`,ve)}async function Oe(me){try{let le=await fetch(me.endpoint);return le.ok?cb(await le.json()):null}catch{return null}}async function Se(){i+=1;let me=i,le=await Promise.all(up.map(async ve=>({provider:ve,snapshot:await Oe(ve)})));if(!(t||me!==i)){for(let ve of le)ve.snapshot?o.set(ve.provider.key,ve.snapshot):o.delete(ve.provider.key);ce()}}return u(),Se(),s=setInterval(()=>{Se()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),u()}}}function _p(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var ub="worker-ineligible";function ji(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function mp(e){return ji(e).includes(ub)}var db="worker-serial";function Bi(e){return ji(e).includes(db)}function Ui(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var pb=new Set(["done","failed","orphaned","stopped","discarded"]),fb={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},_b={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},mb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Wi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:mb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function gp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,_=null,h=null,w=null,E=new Set,F=!1,H=0,V=null,ae=new Set;function M(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function D(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function K(){if(!s)return;let S=++H;F=!0,w=null,E.clear(),He();try{let g=await s("worker-parallel-analysis-targets",{root_dir:q()});if(S!==H||!Ce)return;let x=Array.isArray(g?.qualified)?g.qualified:[],j=Array.isArray(g?.excluded)?g.excluded:[];w={qualified:x,excluded:j};for(let te of x)te&&typeof te.id=="string"&&E.add(te.id)}catch{S===H&&Ce&&(w={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===H&&(F=!1,Ce&&He())}}function R(S){return Array.isArray(S.runs)?S.runs:[]}function U(){let S=M(),g=new Set;for(let x of Object.values(S.attempts||{})){let j=x;j&&typeof j.bead_id=="string"&&!pb.has(j.status)&&g.add(j.bead_id)}for(let x of Array.isArray(S.pr_wait)?S.pr_wait:[])x&&typeof x.bead_id=="string"&&g.add(x.bead_id);for(let x of Object.values(S.discard_operations||{})){let j=x;j&&j.phase!=="done"&&typeof j.bead_id=="string"&&g.add(j.bead_id)}return g}function ne(S){return S.filter(g=>Te(g)===null)}function Te(S){let g=M();for(let x of Array.isArray(g.serial_lanes)?g.serial_lanes:[])if(Array.isArray(x?.entries)&&x.entries.some(j=>j.bead_id===S))return x.id;return(Array.isArray(g.queue)?g.queue:[]).some(x=>x.bead_id===S)?"parallel":null}function Z(S,g){let x=l.get(S);return x||[...g.order]}function ce(S){if(S.length<2)return!1;let g=Te(S[0]);if(!g||g==="parallel")return!1;let x=M(),j=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).find(ee=>ee.id===g)?.entries.map(ee=>ee.bead_id);if(!Array.isArray(j))return!1;let te=S.map(ee=>j.indexOf(ee));return te.every(ee=>ee>=0)&&te.every((ee,ge)=>ge===0||ee>te[ge-1])}function z(){let S=M(),g=Array.isArray(S.serial_lanes)?S.serial_lanes:[],x=g.find(j=>Array.isArray(j.entries)&&j.entries.length===0);return x?x.id:g[0]?.id||"s1"}function Oe(S){let g=M().bead_titles||{};return typeof g[S]=="string"?g[S]:S}async function Se(S,g){if(!s||d)return null;d=!0,He();try{return await s(S,g)}finally{d=!1,He()}}async function me(S){r?.setPending?.(!0);try{let g=await Se("worker-parallel-analysis-start",{force:S,target_ids:Array.from(E)});g&&g.applied===!1&&g.reason&&(g.reason==="target_not_qualified"&&Array.isArray(g.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${g.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${g.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function le(){let S=D().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function ve(S){if(!(!s||ae.has(S))){ae.add(S),He();try{let g=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:S});if(!Ce)return;if(g?.ok===!0&&typeof g.prompt=="string"){V={run_id:S,prompt:g.prompt};return}de(g?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ae.delete(S),He()}}}function xe(){V=null,He()}async function Y(){if(!V)return;let S=await un(V.prompt);de(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function X(S,g){a&&a(S,Wi(g))}function ye(){return M().runner_catalog}function _e(S){return Object.keys(ye()?.runners?.[S]?.models||{})}function je(S){let g=_e(S),x=ye()?.runners?.[S]?.default_model;return typeof x=="string"&&g.includes(x)?x:g[0]||""}function ie(){let S=D().settings,g=_||S.runner||"claude",x=_e(g),j=_?je(g):S.model||x[0]||"",te=Ui(ye(),g,j),ee=S.effort||"",ge=te.includes(ee)?ee:te[0]||"";return{runner:g,model:j,effort:ge,models:x,efforts:te}}async function Ye(S){let g=D().settings,x=await Se("worker-parallel-analysis-settings-update",{expected_revision:g.revision,runner:S.runner,model:S.model,effort:S.effort});(!x||x.applied!==!0)&&(_=null,He(),x&&x.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${x.reason}`,"error",2800))}function st(S){_=S,He();let g=ie();Ye({runner:S,model:g.model,effort:g.effort})}function P(S){let g=ie(),x=Ui(ye(),g.runner,S);Ye({runner:g.runner,model:S,effort:x.includes(g.effort)?g.effort:x[0]||""})}function fe(S){let g=ie();Ye({runner:g.runner,model:g.model,effort:S})}async function we(S,g){if(!s||d)return;let x=Z(S,g),j=D();if(x.length<2||!j.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let te=u.get(S)||z(),ee=()=>({snapshot_digest:j.last_good.identity_digest,group_index:S,lane:te,ordered_bead_ids:x,expected_revision:M().revision});d=!0,He();try{let ge=await s("worker-parallel-analysis-submit",ee());ge&&ge.queue&&n&&n.set(ge.queue),ge&&ge.applied!==!0&&ge.conflict===!0&&(ge=await s("worker-parallel-analysis-submit",ee()),ge&&ge.queue&&n&&n.set(ge.queue)),ge&&ge.applied===!0?(l.delete(S),de(`\uC9C1\uB82C \uB808\uC778 ${te}\uC5D0 ${x.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${ge?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,He()}}function Ae(S,g,x){l.set(S,Z(S,g).filter(j=>j!==x)),He()}function Ge(S){l.delete(S),He()}function Ne(S,g,x,j){let te=[...Z(S,g)],ee=te.indexOf(x),ge=ee+j;ee<0||ge<0||ge>=te.length||(te.splice(ge,0,...te.splice(ee,1)),l.set(S,te),He())}function ze(){let S=D().settings,g=Object.keys(ye()?.runners||{}),x=ie();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${j=>st(j.target.value)}
        >
          ${g.map(j=>c`<option
                value=${j}
                ?selected=${x.runner===j}
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
          ${x.models.map(j=>c`<option
                value=${j}
                ?selected=${x.model===j}
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
          ${x.efforts.map(j=>c`<option
                value=${j}
                ?selected=${x.effort===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      ${Je(S)}
    </div>`}function Je(S){return!pt(S)||wt(S)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function wt(S){return S.is_default===!0&&S.compatible===!1}function pt(S){return!!(S.runner&&S.model&&S.effort)}function J(S){return pt(S)&&S.compatible!==!1}function Q(S){let g=Math.max(0,Math.floor(S/1e3)),x=Math.floor(g/60),j=g%60;return`${x}:${String(j).padStart(2,"0")}`}function Me(S){let g=S.job;if(g){let x=typeof g.started_at=="number"?g.started_at:0,j=`${g.runner||"?"}/${g.model||"?"}`,te=x?` \xB7 \uACBD\uACFC ${Q(Date.now()-x)}`:"",ee=typeof g.session_id=="string"?g.session_id:"",ge=R(S).find(Le=>Le.run_id===g.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${j} · effort ${g.effort||"?"}${te}</span
        >
        ${ee?c`<code class="pa-session-id" title=${ee}
              >${ee.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>X(g.job_id,ge||g)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ge?.prompt_saved!==!0||ae.has(g.job_id)}
          @click=${()=>{ve(g.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Re()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Xe(S){let g=Me(S);return g===""?"":c`<div class="pa__strip">${g}</div>`}function Re(){return r?.isPending?.()===!0}function ke(S){let g=!!S.job,x=J(S.settings),j=w!==null&&E.size===0,te=g||d||Re()||F;return c`<div class="pa-meta">
      ${S.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!x||te||j}
        @click=${()=>{me(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!x||te||j}
        @click=${()=>{me(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!g}
        @click=${()=>{le()}}
      >
        취소
      </button>
    </div>`}function We(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function Ze(S,g){g?E.add(S):E.delete(S),He()}function nt(S){let g=Array.isArray(S.scope)?S.scope:[],x=Array.isArray(S.overlaps)?S.overlaps:[];return g.length===0&&x.length===0?c``:c`<span class="pa-target__signals">
      ${g.length>0?c`<details class="pa-target__scope" title=${g.join(`
`)}>
            <summary>scope ${g.length}</summary>
            <ul>
              ${g.map(j=>c`<li><code>${j}</code></li>`)}
            </ul>
          </details>`:""}
      ${x.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${x.join(", ")}`}
            >겹침 ${x.join(", ")}</span
          >`:""}
    </span>`}function tt(){let S=w?.qualified||[],g=w?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${g.length}`}</span
        >
      </header>
      ${w&&S.length>0?c`<ul class="pa-targets__list">
            ${S.map(x=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${x.id}
                      .checked=${E.has(x.id)}
                      @change=${j=>Ze(x.id,j.target.checked)}
                    />
                    <span class="pa-target__title">${x.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${nt(x)}
                    <span class="pa-target__route">${x.route}</span>
                    <span class="pa-target__lane"
                      >${We(x.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&S.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&g.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${g.length}</summary>
            <ul class="pa-targets__list">
              ${g.map(x=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${x.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${fb[x.reason]||x.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${We(x.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function ft(S){let g=typeof S.session_id=="string"&&S.session_id.length>0,x=g?S.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${_b[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${g?c`<code class="pa-session-id" title=${x}
            >${x.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?c`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>X(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||ae.has(S.run_id)}
          @click=${()=>{ve(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function kt(S){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?c`<ul class="pa-runs__list">
            ${S.map(g=>ft(g))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function xt(){return V?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${xe}></div>
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
              @click=${xe}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function vt(S,g){let x=Z(S,g),j=U(),te=x.filter(De=>j.has(De)),ee=ne(x),ge=ce(x),Le=Array.isArray(M().serial_lanes)?M().serial_lanes:[],et=u.get(S)||z(),ot=g.eligible!==!0||x.length<2||te.length>0||ee.length>0||ge||d;return c`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${g.confidence}</span>
        ${g.categories.map(De=>c`<span class="pa-group__category">${De}</span>`)}
        ${ge?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${g.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ee.length>0?c`<span class="pa-group__stale"
              >stale — ${ee.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${g.reason}</p>
      <ol class="pa-group__members">
        ${x.map((De,it)=>c`<li class="pa-member" data-bead-id=${De}>
              <span class="pa-member__seq">${it+1}</span>
              <span class="pa-member__title">${Oe(De)}</span>
              ${j.has(De)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${De}
                ?disabled=${it===0}
                aria-label=${`${De} \uC704\uB85C`}
                @click=${()=>Ne(S,g,De,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${De}
                ?disabled=${it===x.length-1}
                aria-label=${`${De} \uC544\uB798\uB85C`}
                @click=${()=>Ne(S,g,De,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${De}
                aria-label=${`${De} \uC81C\uC678`}
                @click=${()=>Ae(S,g,De)}
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
          @click=${()=>Ge(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${De=>{u.set(S,De.target.value),He()}}
          >
            ${Le.map((De,it)=>c`<option
                  value=${De.id}
                  ?selected=${et===De.id}
                >
                  직렬 ${it+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ot}
          @click=${()=>{we(S,g)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ct(S){let g=Array.isArray(S.issues)?S.issues:[],x=g.filter(te=>te.verdict==="parallel_ok").length,j=g.filter(te=>te.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${x}</span>
      <span>uncertain ${j}</span>
    </div>`}function gt(){let S=Ce&&!!D().job;if(S&&h===null){h=setInterval(()=>He(),1e3);return}!S&&h!==null&&(clearInterval(h),h=null)}function He(){let S=D();_&&S.settings.runner===_&&(_=null);let g=S.last_good?.result;gt(),Ke(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${$e}
            >
              ×
            </button>
          </header>
          ${Xe(S)}
          <div class="pa__body">
            ${ze()} ${ke(S)} ${tt()}
            ${g?c`${g.groups.map((x,j)=>vt(j,x))}
                ${g.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ct(g)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${kt(R(S))}
          </div>
        </div>
        ${xt()}
      `,i)}let Ce=!1,I=()=>{Ce=!1,V=null,H+=1,gt()},W=S=>{S.target===S.currentTarget&&$e()};i.addEventListener("close",I),i.addEventListener("cancel",I),i.addEventListener("click",W);let se=null;n&&n.subscribe&&(se=n.subscribe(()=>{Ce&&He()}));let O=null;r&&r.subscribe&&(O=r.subscribe(()=>{Ce&&He()}));function G(){Ce||(Ce=!0,He(),K(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function $e(){Ce&&(Ce=!1,V=null,H+=1,gt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:$e,destroy(){Ce=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",I),i.removeEventListener("cancel",I),i.removeEventListener("click",W),se&&(se(),se=null),O&&(O(),O=null),i.remove()}}}function hp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ea(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}function zi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",l=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=gb(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function gb(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var bp=new Set(["sh","bash","zsh","dash","ksh"]),yp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function vp(e){let t=e.split("/");return t[t.length-1]||""}function hb(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=vp(n[0]);if(r!=="env")return bp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&bp.has(vp(s))}function bb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function yb(e){let t=[],n=0;yp.lastIndex=0;for(let r of e.matchAll(yp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:bb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function vb(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function wp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function _(q,K){return K?yb(q).map(R=>R.kind==="plain"?R.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${R.kind}"
            >${R.text}</span
          >`):q}function h(){if(!s)return c``;let q=o==="ready"&&hb(a),K=o==="ready"?a.split(`
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
              @click=${()=>{E()}}
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
                  ${K.map((R,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(R,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Ke(h(),r)}async function E(){if(o!=="ready")return;let q=await un(a);de(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function F(q){q.key==="Escape"&&s&&(q.preventDefault(),M())}function H(){d||(document.addEventListener("keydown",F),d=!0)}function V(){d&&(document.removeEventListener("keydown",F),d=!1)}async function ae(q,K=null){let R=++l;H(),s={...q},u=K||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let Te="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let Z=await n(Te),ce=await Z.json().catch(()=>({}));if(R!==l)return;if((t?t():"")!==ne){M();return}if(!Z.ok||!ce||ce.ok!==!0){o="error",i=vb(ce&&typeof ce.error=="string"?ce.error:""),w();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},a=String(ce.content),o="ready",w()}catch{if(R!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function M(){l+=1,V(),s=null,a="",w();let q=u;u=null,q?.isConnected&&q.focus()}function D(){M(),r.remove()}return{open:ae,close:M,destroy:D}}function kp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let R=o();return typeof R.revision=="number"?R.revision:0}function i(R){t&&R&&R.queue&&typeof R.queue=="object"&&t.set(R.queue)}function l(){let R=o().workspace_info;return R&&typeof R=="object"?R:{}}function u(R,U){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${R}"
      >${U}</span
    >`}function d(R){if(typeof R!="number"||!Number.isFinite(R))return"";let U=R/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(R/1e3)}\uCD08`}function _(R){let U=d(R);return U?u("config",U):""}function h(R,U,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${Te=>{s&&s({lane:R,base_sha:U.base_sha,path:ne.script,base_ref:U.base_ref},Te.currentTarget)}}
    ></button>`}function w(){let R=o().repo_ops_opt_out;return{verify:R?.verify===!0,deploy:R?.deploy===!0}}function E(R,U){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${ne=>{ae(R,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(R){let U=typeof R.base_sha=="string"?R.base_sha:"",ne=`${R.source_path||"repo-ops/config.toml"} @ ${R.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,Te=w(),Z=!!R.verify&&Te.verify,ce=!!R.deploy&&Te.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Z?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${R.verify?c`${h("verify",R,R.verify)}
              ${_(R.verify.timeout_ms)}
              ${Z?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Z?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":R.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${R.verify?E("verify",Te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${R.deploy?c`${h("deploy",R,R.deploy)}
              ${_(R.deploy.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":R.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${R.deploy?E("deploy",Te.deploy):""}
      </div>
    </section>`}function H(R){let U=R.repo_ops&&typeof R.repo_ops=="object"?R.repo_ops:null;return U&&(U.status==="resolved"||U.status==="absent")?F(U):U&&(U.status==="pending"||U.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function V(R){if(!n)return;let U=await n("worker-auto-repair-toggle",{on:R,expected_revision:a()});if(i(U),U&&U.conflict){let ne=await n("worker-auto-repair-toggle",{on:R,expected_revision:a()});i(ne)}r()}async function ae(R,U){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:R,opted_out:U,expected_revision:a()});if(i(ne),ne&&ne.conflict){let Te=await n("worker-repo-ops-opt-out-toggle",{kind:R,opted_out:U,expected_revision:a()});i(Te)}r()}let M={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function D(R,U,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${R}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(Te=>c`<li data-token=${Te}>
              ${M[Te]||Te}
            </li>`)}
      </ul>
    </div>`}function q(R){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${R.map(U=>{let ne=[M[U.trigger]||U.trigger];return Number.isInteger(U.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${U.attempts_per_operation_attempt}\uD68C`):Number.isInteger(U.attempts)?ne.push(`${M[U.budget]||U.budget} ${U.attempts}\uD68C`):Number.isInteger(U.sessions_per_user_action)&&ne.push(`${U.sessions_per_user_action}\uD68C`,M[U.user_actions]||U.user_actions),U.applies_when&&ne.push(M[U.applies_when]||U.applies_when),c`<li data-token=${U.id}>
            <strong>${M[U.id]||U.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function K(){let R=o(),U=R.auto_repair!==!1,ne=R.repo_operation_policy&&typeof R.repo_operation_policy=="object"?R.repo_operation_policy:null,Te=Array.isArray(R.repo_operations)?R.repo_operations:[],Z=Te.find(Se=>Se.state==="repairing"),ce=Te.filter(Se=>Se.state==="failed"||Se.state==="repairing"),z=ce.length?Math.min(...ce.map(Se=>typeof Se.repair?.remaining=="number"?Se.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(Se=>Se.id==="auto_repair_session")?.attempts??1,Oe=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${Se=>{V(Se.target.checked)}}
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
          >남은 자동 해결 ${z}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Z?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Z.repair?.owner_bead||Z.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${Oe.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${D("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:q(Oe)}
            ${D("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${H(l())} ${K()}
      </details>`}}}var Sp=20,wb=5,kb=new Set(["failed","repairing","running","queued","retry_pending"]),$p={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},xp={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function $b(e,t,n=Sp){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function xb(e){if(e.type==="cleanup")return!0;let t=e.operation;return kb.has(t.state)&&!t.dismissed&&!t.superseded_by}function Ab(e,t,n={}){let r=$b(e,t,1/0),s=n.expanded===!0?Sp:wb,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||xb(i));return{visible:a,hidden:r.length-a.length}}function Ap(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Sb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ep(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Tp(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Eb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(xp,r)?xp[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Tb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ho(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ap(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn($p,t.kind)?$p[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Uo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${As(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ap(e)}"
          >${Sb(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Tp(ld(t.failure_kind,r)):""}
      ${Eb(t)}
      ${Ep([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Uo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Cb(e){let t=e.cleanup,n=mr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ho(e.at)||"\u2014"}</span
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
        ${xd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Tp(Yo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Ep([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Rb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Cb(r):Tb(r))}
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
  </section>`}function Cp(e,t={}){let n=null;function r(){if(n===null){Ke(c``,e);return}let a=Ab(n.operations,n.cleanup_failures,{expanded:n.expanded});Ke(Rb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Ob=Rt("views:worker"),Lb="tab:worker:ready",Ib="tab:worker:blocked",Pb="tab:worker:in-progress",Mb="tab:worker:resolved",Db="tab:worker:closed",oa=1,Rp=5;function Op(e){return Eo(e).path.length>0}var Nb=new Set(["quick_fix","spec_backed","full_plan"]);function Lp(e){return typeof e=="string"&&Nb.has(e)}var Dp="beads-ui.worker.candidate-filter",Hi={show_blocked:!1,spec:"all"};function qb(){try{let e=window.localStorage.getItem(Dp);if(!e)return{...Hi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Hi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Hi}}}function Fb(e){try{window.localStorage.setItem(Dp,JSON.stringify(e))}catch{}}function jb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Bb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Np="bdui.worker.candidate_sort",Ub=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],aa="spec";function Wb(){try{let e=window.localStorage.getItem(Np);return e==="board"||e==="created"||e==="spec"?e:aa}catch{return aa}}function zb(e){try{window.localStorage.setItem(Np,e)}catch{}}var qp="bdui.worker.done-range";function Hb(){try{let e=window.localStorage.getItem(qp);return _n(e)?e:ln}catch{return ln}}function Gb(e){try{window.localStorage.setItem(qp,e)}catch{}}var Vb="(max-width: 640px)",Fp="beads-ui.worker.lane-collapsed",Ls={queue:!0,done:!0};function Kb(){try{let e=window.localStorage.getItem(Fp);if(!e)return{...Ls};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ls}:{queue:typeof t.queue=="boolean"?t.queue:Ls.queue,done:typeof t.done=="boolean"?t.done:Ls.done}}catch{return{...Ls}}}function Yb(e){try{window.localStorage.setItem(Fp,JSON.stringify(e))}catch{}}function Ip(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Zb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(cr):(r.sort(Qs(n)),t==="board"?r:[...r.filter(Op),...r.filter(s=>!Op(s))])}function Qb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Xb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Pp(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function ey(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ty(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function ny(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function ry(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Gi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var sy=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),oy=new Set(["waiting_metadata","reviewing","retrying"]);function ay(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Wt(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function iy(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ly(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=iy(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!sy.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Mp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function cy(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Mp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Mp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Jb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Pp(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Pp(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function uy(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,_=null,h=null,w={},E=!1,F=!1,H={}){let V=!!l&&l.position>0,ae=!!l?.continuation_action&&l.continuation_action.continuation===null,M=!!l&&l.active===!0,D=l&&l.failure||null,q=ty(l?l.waiting:null,h),K=n[e]||null,R=K&&K.gate?K.gate:null,U=K&&K.pr?K.pr:null,ne=ny(l?l.resolution:null),Te=ry(l?l.head_review:null),Z=l&&l.head_review||null,ce=ay(h,Z),z=ly(h,ce),Oe=l&&l.authority||null,Se=!!Z&&["pending","reviewing","revising"].includes(Z.state),me=!!h&&typeof h=="object"&&oy.has(h.phase),le=V&&!M&&(Z?.state==="failed"||!Oe||me||Oe.source==="automatic"&&!F),ve=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ne?ne.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,xe=!!R&&R.base_badge==="\uCDA9\uB3CC",Y=!!R&&R.enabled===!0,X=Rs({bead_id:e,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:H.repo_operations}),ye=ra(X),_e=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!R&&R.tier==="merged",je=i&&!!r&&!!R&&R.tier==="merged",ie=le&&(Y||xe||R?.reason==="base_behind"||R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"||_e||je),Ye=i&&xe&&u===!1,st=xn(w,e,{external:i,merge_active:M||X?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:ye,merged:!!r||R?.tier==="merged"}),P=!!st.operation,fe=!_e&&!!r&&r.step==="repo_operations",we=cy({continuation_required:ae,merge_step:X,conflict_badge:ve,conflict_live:ne?.live===!0||a==="running",head_review:Z&&Te?{...Te,state:Z.state,failure_reason:Z.failure_reason}:null,auto_resolution:ce,recovery:z,cleanup_failed:r,cleanup_label:r?mr(r.step):null,base_exception:_,conflicting:xe,gate:R,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:D,auto_skip:d,queued:V,queue_active:M,queue_position:l?l.position:0,activity:ve?null:o&&o.activity||null}),Ae=we?.live===!0&&we.title?c`<span title=${we.title}>${we.label}</span>`:we?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&X?.active!==!0?na(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:we?.live!==!0&&we?.title?we.label:null,completion_title:we?.title||"",completion_repair_pr_url:z?z.repair_pr_url:"",completion_repair_pr_number:z?z.repair_pr_number:null,badges:Ae?[Ae]:[],live_badge:we?.live===!0?Ae:null,usage:s,alert:we?.alert===!0,merge_action:R?.tier==="merged"&&!_e&&!je||fe?!1:!V||ae||le,timeline_action:fe,cancel_action:V&&!ae,cancel_enabled:(!M||Se)&&!(z&&z.lock_actions),cancel_title:z&&z.lock_actions?`${z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M&&!Se?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Se?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:st,discard_action:st.action,merge_step:X,discard_enabled:st.enabled,discard_title:st.title,merge_enabled:!X&&!a&&!P&&!_&&!(z&&z.lock_actions)&&!Ye&&!fe&&(Y||xe||R?.reason==="base_behind"||R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"||_e||je||ie||me&&!M),merge_label:ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||je?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!X&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":R?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":le?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:P?st.error?`\uD3D0\uAE30 \uC2E4\uD328: ${st.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${st.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":X?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${X.label}`:je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ye?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Y?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Vi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,openDoc:d,doneRange:_,onDoneRangeChange:h}=t,w=r?Js(r,i):null,E=ro({transport:n,uiOrderStore:i}),F=null,H=[],V=qb(),ae=null,M=null,D={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},q=Wb(),K=_n(_)?_:Hb(),R=new Map;function U(){let p=Wn.find(b=>b.value===K);return p?p.label:"\uC624\uB298"}let ne=Kb(),Te=!1,Z=new Set,ce=new Set,z=new Set,Oe=new Set,Se=new Set,me={},le=null,ve=0,xe=null,Y=[];function X(p){return le===p?me:{}}async function ye(){if(!n)return;let p=u?.()||"";if(le===p||xe&&xe.key===p&&xe.generation===ve)return;let b=++ve;xe={key:p,generation:b};let f=null;try{f=await Promise.resolve(n("get-session-defaults",{}))}catch(T){if(b!==ve)return;xe=null,Ob("get-session-defaults failed: %o",T),Ue();return}b===ve&&(me=f&&typeof f.values=="object"&&f.values!==null?{...f.values}:{},le=p,xe=null,Ue())}function _e(){le=null,ve+=1,ye()}let je=document.createElement("div");je.className="worker-console";let ie=document.createElement("div");ie.className="worker-top";let Ye=document.createElement("div");Ye.className="worker-drawer-overlay",Ye.hidden=!0;let st=document.createElement("div");st.className="worker-drawer-overlay__backdrop";let P=document.createElement("div");P.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Ye.append(st,P,fe);let we=document.createElement("div");we.className="worker-lanes-host",je.append(ie,Ye,we),e.appendChild(je);let Ae=null,Ge=null,Ne=Mr(P,{transport:n,sessionLogStore:a,onClose:()=>{Ae=null,Ge=null,Ye.hidden=!0,Ue()}}),ze=Cp(fe,{onClose:()=>{fe.hidden=!0,Ye.hidden=!0,Ue()}}),Je=wp({getWorkspacePath:u||(()=>"")}),wt=u&&u()||"",pt=kp({queueStore:s,transport:n,onChanged:()=>Ue(),onOpenScript:(p,b)=>{Je.open(p,b)}}),J=o?gp(je,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(p,b)=>re(p,b)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Me(){let p=Q(),b=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,f=Array.isArray(p.serial_lanes)?p.serial_lanes:[],T=[];for(let ue of f){if(T.length>=b)break;!ue||typeof ue.id!="string"||!/^s[1-5]$/.test(ue.id)||!Array.isArray(ue.entries)||T.push({id:ue.id,label:`\uC9C1\uB82C ${ue.id.slice(1)}`,count:ue.entries.length})}return T.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...T]}function Xe(p){if(!ae||!p.some(f=>f.id===ae))return null;let b=Me();return b?{bead_id:ae,lanes:b}:null}function Re(){let p=Q();return typeof p.revision=="number"?p.revision:0}function ke(p){p&&p.queue&&s&&s.set(p.queue)}function We(){let p=Q().queue;return Array.isArray(p)?p.length:0}async function Ze(p,b,f){if(!n)return;let T=()=>({bead_id:p,...b==="parallel"?{}:{lane:b},...f===void 0?{}:{index:f},expected_revision:Re()}),C=await n("worker-queue-place",T());ke(C),C&&C.conflict&&await n("worker-queue-place",T()).then(ke)}async function nt(p,b,f){if(!n)return;let T=()=>({bead_id:p,...b==="parallel"?{}:{lane:b},to_index:f,expected_revision:Re()}),C=await n("worker-queue-reorder",T());ke(C),C&&C.conflict&&await n("worker-queue-reorder",T()).then(ke)}async function tt(p){if(!n)return;let b=await n("worker-queue-remove",{bead_id:p,expected_revision:Re()});ke(b),b&&b.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Re()}).then(ke)}async function ft(p){if(!n||!p)return;let b=await n("worker-attempt-pause",{attempt_id:p});b&&b.paused===!1&&b.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function kt(p){if(!n||!p)return;let b=await Or();if(b===null)return;let f=async(C={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Re(),...b!==""?{instructions:b}:{},...C}),T=await f();ke(T),T&&T.conflict&&(T=await f(),ke(T)),T=await Ln(T,(C,ue)=>f({continuation:C,decision_token:ue}),{onResult:ke,refresh:()=>f()}),T&&T.resumed===!1&&!T.conflict&&T.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${T.reason}`,"error",2400)}async function xt(p){if(!n||!p)return;let b=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Re()});ke(b),b&&b.conflict&&(b=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Re()}),ke(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function vt(p,b,f=!0){if(!n)return null;let T=n,C=await T(p,{...b,expected_revision:Re()});return ke(C),C&&C.conflict&&f&&(C=await T(p,{...b,expected_revision:Re()}),ke(C)),C}async function Ct(p){if(!n||!p)return;let b=Q().merge_queue?.find(T=>T.bead_id===p)?.continuation_action;if(b?.mismatch&&b.continuation===null){await He(p,b.mismatch);return}Z.add(p),Ue();let f;try{f=await vt("worker-merge-queue-add",{bead_id:p})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Z.delete(p),Ue()}if(!(!f||f.applied)){if(f.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(ey(f.reason),"error",2400)}}async function gt(p){if(!(!n||!p||ce.has(p))){ce.add(p),Ue();try{let b=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Re()});ke(b),b&&!b.retried&&!b.conflict&&b.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{ce.delete(p),Ue()}}}async function He(p,b){let f=await Ln({continuation_mismatch:b},(C,ue)=>vt("worker-merge-queue-add",{bead_id:p,continuation:C,decision_token:ue},!1)),T=f?.queue?.merge_queue?.find(C=>C.bead_id===p)?.continuation_action;if(f?.applied!==!0&&T?.continuation===null&&T.mismatch){await He(p,T.mismatch);return}f&&f.applied===!1&&!f.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ce(p){if(!n)return;let b=await vt("worker-merge-auto-toggle",{on:p});!b||b.conflict||de(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function I(p){if(!n||!p)return;let b=await vt("worker-merge-queue-remove",{bead_id:p});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function W(){await vt("worker-merge-queue-remove",{all:!0})}async function se(p,b=null,f="unmerged",T=null){if(!n||!p)return;let C=Ss(p,f);if(!(!!T||typeof globalThis.confirm!="function"||globalThis.confirm(C)))return;let Ee=await n("worker-discard",{bead_id:p,...b?{attempt_id:b}:{},...T?{operation_id:T}:{},expected_revision:Re()});if(ke(Ee),Ee&&Ee.conflict&&(Ee=await n("worker-discard",{bead_id:p,...b?{attempt_id:b}:{},...T?{operation_id:T}:{},expected_revision:Re()}),ke(Ee)),Ee&&Ee.discarded===!0){de(Go(Ee),"success",5e3);return}if(Ee&&Ee.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.reason}`,"error",2800);return}if(Ee&&Ee.accepted&&Ee.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ee&&Ee.accepted&&!Ee.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Ee.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ee&&!Ee.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function O(p,b,f){if(!(!n||!b||!f||Oe.has(b))){Oe.add(b),Ue();try{let T=await n(p,{bead_id:b,action_id:f,expected_revision:Re()});ke(T),T?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!T?.ok&&T?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(T.reason)}`,"error",2800)}finally{Oe.delete(b),Ue()}}}async function G(p,b){if(!n||!b||z.has(b))return;z.add(b),Ue();let f;try{let T=async(C={})=>await n(p,{bead_id:b,expected_revision:Re(),...C});f=await T(),ke(f),f&&f.conflict&&(f=await n(p,{bead_id:b,expected_revision:Re()}),ke(f)),p==="worker-revise-fix"&&(f=await Ln(f,(C,ue)=>T({continuation:C,decision_token:ue}),{onResult:ke,refresh:()=>T()}))}finally{z.delete(b),Ue()}if(!(!f||f.conflict)){if(f.ok){de(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${f.reason||""}`,"error",3e3)}}async function $e(p){if(!n)return;let b=await n("worker-automation-toggle",{on:p,expected_revision:Re()});ke(b),b&&b.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Re()}).then(ke)}async function S(p){if(!n||!p)return;let b=await n("worker-repo-operation-repair",{operation_id:p});if(ke(b),b&&b.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${b.reason||""}`,"error",3e3);return}b&&b.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function g(p){if(!n||!p)return;let b=await n("worker-repo-operation-dismiss",{operation_id:p});ke(b),b&&b.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function x(p){if(!n||!Number.isFinite(p))return;let b=Math.max(oa,Math.floor(p)),f=await n("worker-queue-set-slots",{slots:b,expected_revision:Re()});ke(f),f&&f.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:Re()}).then(ke)}async function j(p){if(!n||!Number.isInteger(p)||p<1||p>Rp)return;let b=Q(),f=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(p).reduce((ue,Ee)=>ue+(Array.isArray(Ee?.entries)?Ee.entries.length:0),0),T=()=>({count:p,expected_revision:Re()}),C=await n("worker-queue-set-serial-lane-count",T());ke(C),C&&C.conflict&&(C=await n("worker-queue-set-serial-lane-count",T()),ke(C)),C&&C.applied&&f>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${f}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let te="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ee(p,b){let f=zi(p,b.id,D);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:f.kind==="note"?{kind:"note",text:f.text}:f.kind==="disabled"?{kind:"disabled",label:te,title:f.title}:{kind:"place",label:te,title:f.title}}}function ge(p,b){if(!M||M.bead_id!==p)return null;let f=M.counterpart_id,T=b.filter(C=>C.id===f);return T.length===0?null:{rows:T.map(C=>ee(p,C))}}async function Le(p,b){let f=zi(p,b,D);if(M=null,f.kind!=="ops"){Ue();return}let T=Re();for(let C of f.ops){let ue=await et(C,T);if(ue===null)break;T=ue}Ue()}async function et(p,b){if(!n)return null;try{let f=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:b});if(ke(f),f&&f.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!f||f.applied!==!0)return de(f&&typeof f.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${f.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let T=f.queue?f.queue.revision:void 0;return typeof T!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):T}catch(f){return de(f instanceof Error&&f.message?f.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function ot(){let p=Q(),b=w?w.selectBoardColumn(Lb,"ready"):[],f=w?w.selectBoardColumn(Ib,"blocked"):[],T=w?w.selectBoardColumn(Db,"closed"):[],C=w?w.selectBoardColumn(Pb,"in_progress"):[],ue=w?w.selectBoardColumn(Mb,"resolved"):[],Ee=to([...b,...f,...C,...ue,...T]),Be=new Map;for(let m of[...b,...f,...C])m&&m.id&&!Be.has(m.id)&&Be.set(m.id,m);let Qe={...X(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=p[m];typeof B=="string"&&(Qe[m]=B)}function Ve(m,B){let oe=Be.get(m);if(!oe)return null;let Fe=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},rt=oe.workflow?.route,St=Fe.route,Ot=Lp(rt)?rt:Lp(St)?St:null;return rn({pin:Fe,global:Qe,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Ot,controller_runtime:B})}function bt(m){let B=m.runner||null,oe=Ve(m.bead_id,B),Fe=Es(m),rt=oe?Qn(oe,B):null;return Fe||rt?{orchestration:Fe,worker:rt}:null}let on=new Map;function Hr(m){if(on.has(m))return on.get(m)??null;let B=Ve(m,null),oe=null;if(B){let Fe=$n(p.runner_catalog??null,B.orchestration_model.value??""),rt=Fe===null?B:Ve(m,Fe),St=_r(rt,p.runner_catalog??null),Ot=Qn(rt,Fe);oe=St||Ot?{orchestration:St,worker:Ot}:null}return on.set(m,oe),oe}function gr(m){let B=no(Ee,m);return B.total===0?null:B}let Qi=p.bead_titles||{},en=new Map;for(let[m,B]of Object.entries(Qi))typeof B=="string"&&B.length>0&&en.set(m,B);for(let m of[...b,...f])en.set(m.id,m.title||m.id);let Gr=new Map;for(let m of[...b,...f,...C,...ue,...T])m&&m.id&&typeof m.from_id=="string"&&Gr.set(m.id,m.from_id);let Sn=new Map;for(let m of[...b,...f,...C,...ue,...T])m&&m.id&&typeof m.priority=="number"&&Sn.set(m.id,m.priority);let Is=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},er=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},jn=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},Bn=new Map;for(let[m,B]of Object.entries(er))Array.isArray(B)&&Bn.set(m,Bi(B));for(let m of[...b,...f]){let B=m.labels;Array.isArray(B)&&!Bn.has(m.id)&&Bn.set(m.id,Bi(B))}let hr=new Map,Vr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(Vr)?Vr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let B=m.members.map(Fe=>{let rt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(St=>St.entries.some(Ot=>Ot.bead_id===Fe));return rt?rt.id:null});if(!(B.every(Fe=>Fe!==null)&&new Set(B).size===1))for(let Fe of m.members)hr.set(Fe,m.members.filter(rt=>rt!==Fe))}let Ps=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},br=new Map;for(let[m,B]of Object.entries(Is))B&&typeof B=="object"&&br.set(m,B);for(let m of[...b,...f])br.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let tr=m=>br.get(m)||{},Un=p.pr_wait||[],Kr=p.pr_observations||{},qe=p.pr_activity||{},ut=p.cleanup_failed||{},an=Object.entries(ut).map(([m,B])=>({bead_id:m,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),ia=p.queue||[],Xp=new Set([...ia.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(B=>B.bead_id)),...Un.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),Jp=new Set(f.map(m=>m.id)),ef=i?i.get()?.order||{}:{},Xi=new Set,Ji=[];for(let m of[...b,...f])Xp.has(m.id)||Xi.has(m.id)||Qb(m)||(Xi.add(m.id),Ji.push(m));H=Zb(Ji,q,ef);let tf=p.admission||{},el=m=>{let B=tf[m];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof B.reason=="string"?B.reason:"",Fe=oe.indexOf(":");return Fe>0&&Fe<oe.length-1?`\u26D4 ${oe.slice(0,Fe)} (${oe.slice(Fe+1)})`:`\u26D4 ${oe}`},nf=H.map(m=>{let B=Eo(m),oe=B.path.length>0,Fe=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",rt=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,St=Object.hasOwn(m,"labels")&&mp(m.labels),Ot=!St&&(Fe?rt:oe&&!B.conflict),mt=Jp.has(m.id),tn=[];mt&&tn.push(Xb(m)),Fe&&!rt?tn.push("missing_description"):!Fe&&B.conflict?tn.push("spec_id_conflict"):!Fe&&!oe&&tn.push("spec \uC5C6\uC74C");let Us=el(m.id);return Us&&tn.push(Us),{id:m.id,title:m.title||m.id,reason:tn.join(" \xB7 "),draggable:Ot,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:Fe,status:m.status,worker_ineligible:St,blocked:mt,has_spec:oe,exec_chips:Hr(m.id),from_id:m.from_id||void 0,priority:Sn.get(m.id)}}),la=jb(nf,V),ca=la.visible,rf=p.revise_parked||{},Ms=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ua=(m,B)=>m.map((oe,Fe)=>{let rt=B!=="done",St=B!=="done"&&B!=="queue",Ot=rt?rf[oe.bead_id]:null,mt=rt?xn(Ms,oe.bead_id):null,tn=mt?.operation?mt:null,Us=rt&&Bn.get(oe.bead_id)===!0,Rl=Ps[oe.bead_id]||[],ya=p.admission&&typeof p.admission=="object"?p.admission[oe.bead_id]:null,va=rt?rd(ya,!!tn||Oe.has(oe.bead_id)):null,_f=rt&&!va?el(oe.bead_id):null,mf=rt?[_f]:[],Ol=rt&&Rl.length>0&&typeof ya?.reason=="string"&&ya.reason.startsWith("not_ready")?[`\u23F8 ${Rl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],wa=rt?hr.get(oe.bead_id):void 0;return wa&&wa.length>0&&Ol.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${wa.join(", ")}\uC640`),{id:oe.bead_id,title:en.get(oe.bead_id)||oe.bead_id,reason:mf.filter(Boolean).join(" \xB7 "),draggable:rt&&!tn&&!va,done:B==="done",lane:B,seq:St?Fe+1:void 0,worker_serial:Us,discard:tn,stale_work:va,badges:[...Ol,...Ot?["\u23F8 REVISE \uD30C\uD0B9"]:[],...B==="done"?Wo(p.attempts||{},oe.bead_id):[]],alert:!!Ot,revise_action:!!Ot,revise_enabled:!!Ot&&!tn&&!z.has(oe.bead_id),revise_title:Ot?Ot.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ot.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?mn(p.attempts||{},oe.bead_id):null,work_ms:B==="done"?zo(p.attempts||{},oe.bead_id):null,done_at:B==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:rt?Hr(oe.bead_id):null,workflow:rt&&jn[oe.bead_id]||null,from_id:Gr.get(oe.bead_id)||void 0,priority:Sn.get(oe.bead_id),...tr(oe.bead_id)}}),yr=p.attempts?Object.values(p.attempts).filter(Ur):[],da=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&da.add(m.resumed_from);let tl=new Map;for(let m of yr)tl.set(m.bead_id,m.attempt_id);let Yr=new Map;for(let m of yr)Yr.set(m.attempt_id,m);function pa(m){let B=new Set,oe=m;for(;oe&&!B.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;B.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Yr.get(oe.resumed_from)||null}return!1}let Ds=typeof p.declared_base=="string"?p.declared_base:null;function sf(m){let B=null;for(let oe of yr)!oe||oe.bead_id!==m||pa(oe)||(B===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=oe);return B&&typeof B.target_base=="string"?B.target_base:null}let fa=[],Ns=[],of=_p(p),nl=m=>{let B=typeof m.session_id=="string"&&m.session_id.length>0,oe=da.has(m.attempt_id);return{eligible:B&&!oe,reason:B?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},bn=null;for(let m of yr){let B=m.status==="paused"&&!da.has(m.attempt_id);if(m.status==="running"||B)Ns.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:en.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:B,conflict_resolution:pa(m),base_exception:Gi(Ds,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:xn(Ms,m.bead_id,{attempt_id:m.attempt_id}),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:mn(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Se.has(m.bead_id),exec_chips:bt(m),...tr(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&of(m)){let oe=nl(m);fa.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:en.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:xn(Ms,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:pa(m),base_exception:Gi(Ds,m.target_base),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:mn(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Se.has(m.bead_id),exec_chips:bt(m),...tr(m.bead_id)}),bn=m}}let rl=new Set([...fa,...Ns].map(m=>m.bead_id));for(let m of Array.isArray(p.session_active)?p.session_active:[]){let B=m&&m.bead_id;typeof B!="string"||B.length===0||rl.has(B)||(rl.add(B),Ns.push({bead_id:B,attempt_id:null,kind:"session",title:m.title||en.get(B)||B,status:"in_progress",started_at:En(m.started_at)??En(m.updated_at),updated_at:En(m.updated_at),workflow:m.workflow||null,priority:Sn.get(B),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[...fa,...Ns].map(m=>{let B=Yr.get(m.attempt_id),oe=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!oe||typeof oe!="object")return m;let Fe=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,rt=Rs({bead_id:B.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:Fe?{step:oe.cursor,reason:Fe}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return rt?{...m,landing:rt}:m}),sl=null;if(bn){let m=nl(bn),B=bn.cause_detail;sl={bead_id:bn.bead_id,repo:bn.repo||"",reason:bn.cause||bn.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:bn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:xn(Ms,bn.bead_id,{attempt_id:bn.attempt_id})}}let ol=new Set(vr.map(m=>m.bead_id)),_a=Array.isArray(p.merge_queue)?p.merge_queue:[],al=new Map,il=new Map,ll=new Map,cl=new Map,ul=new Map;_a.forEach((m,B)=>{m&&typeof m.bead_id=="string"&&(al.set(m.bead_id,B+1),il.set(m.bead_id,m.resolution),ll.set(m.bead_id,m.continuation_action||null),cl.set(m.bead_id,m.head_review||null),ul.set(m.bead_id,m.authority||null))});let wr=p.merge_queue_state||{active:null,failures:{}},af=wr.failures||{},dl=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,lf=p.auto_merge_skips||{},pl=m=>{let B=lf[m];if(!B)return null;let oe=Kr[m],Fe=oe&&oe.pr?oe.pr.head_sha:null;return Fe&&Fe===B.head_sha?B.reason||"":null},qs=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?qs.has(m.bead_id)||qs.set(m.bead_id,"paused"):qs.set(m.bead_id,"running"));let fl=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,_l=(p.workspace_info||{}).slots,ml=typeof _l=="number"?_l:typeof p.slots=="number"?p.slots:oa,cf=fl>ml,Fs=ir(K),uf=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>Fs===void 0||typeof m.added_at!="number"||m.added_at>=Fs).sort((m,B)=>(B.added_at||0)-(m.added_at||0)),Zr=ua(uf,"done"),df=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),gl=[],pf=u?.()||"";for(let m of T){let B=En(m.closed_at);if(typeof m.id!="string"||df.has(m.id)||B===null||Fs!==void 0&&B<Fs||typeof m.comment_count!="number"||m.comment_count<=0)continue;let oe=`${pf}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,Fe=R.get(oe);Fe===void 0&&n&&(R.set(oe,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(rt=>{let St=Array.isArray(rt)&&rt.some(Ot=>To(typeof Ot?.text=="string"?Ot.text:"")?.lane==="session");R.set(oe,St?"session":"not-session"),Ue()}).catch(()=>{R.set(oe,"failed"),Ue()})),Fe==="session"&&gl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:m.created_at,updated_at:m.updated_at})}Zr.push(...gl),Zr.sort((m,B)=>(B.done_at||0)-(m.done_at||0));let js={};for(let m of In)js[m]=0;let hl=!1,bl=0,ma=0,yl=0;for(let m of Zr){let B=m.usage;if(B&&typeof B=="object"){let oe=!1;for(let Fe of In)Number.isFinite(B[Fe])&&(js[Fe]+=B[Fe],hl=!0,oe=!0);oe&&(ma+=1,Number.isFinite(B.total_cost_usd)&&(bl+=B.total_cost_usd,yl+=1))}}ma>0&&yl===ma&&(js.total_cost_usd=bl);let vl=Zr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),ff=vl.length>0?zt(fo(vl)):hl?Pn(js):null,wl=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},kl=Array.isArray(p.serial_lanes)?p.serial_lanes:[],$l=m=>{if(Un.some(Fe=>Fe.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=yr.filter(Fe=>Fe&&Fe.bead_id===m),oe=B.length>0?B[B.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Bs=kl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,B)=>{let oe=wl[m.id]||{},Fe=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(mt=>mt&&typeof mt.bead_id=="string"&&typeof mt.after=="string").map(mt=>[mt.bead_id,mt.after])),rt=ua(m.entries.filter(mt=>!ol.has(mt.bead_id)),m.id).map(mt=>Fe.has(mt.id)?{...mt,badges:[`\u{1F517} ${Fe.get(mt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...mt.badges]}:mt),St=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(mt=>typeof mt=="string"):[],Ot=St.map(mt=>({id:mt,title:en.get(mt)||mt,draggable:!1,lane:m.id,ghost:!0,badges:[$l(mt)]}));return{id:m.id,index:B+1,rows:[...Ot,...rt],occupied:St.length>0,badge:St.length>0?$l(St[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),xl=typeof p.serial_lane_count=="number"?p.serial_lane_count:Bs.length,ga=ua(ia.filter(m=>!ol.has(m.bead_id)),"queue"),Al=new Map,Sl=new Set;for(let[m,B]of Object.entries(wl)){if(!/^s[1-5]$/.test(m))continue;let oe=B&&Array.isArray(B.occupied_by)?B.occupied_by:[];for(let Fe of oe)typeof Fe=="string"&&Al.set(Fe,m);oe.length>0&&Sl.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:en.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Al.get(m.bead_id)??null});for(let m of Bs)for(let B of m.rows)B.ghost!==!0&&kr.push({id:B.id,title:B.title,location_label:`${m.id} #${B.seq??""}`.trim(),kind:"serial",lane_id:m.id});ga.forEach((m,B)=>{kr.push({id:m.id,title:m.title,location_label:`#${B+1}`,kind:"parallel",lane_id:null})});for(let m of ca)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let El={};for(let m of kl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(El[m.id]=m.entries.length);let ha=new Map;for(let m of kr)ha.has(m.id)||ha.set(m.id,m);D={members_by_id:ha,serial_raw_lengths:El,serial_lane_count:xl,occupied_lanes:Sl};let Tl=hp(p.bead_scope,kr),ba=(m,B)=>{let oe=Tl.get(m.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return m;let Fe=ge(m.id,oe.overlaps);return m.dependency_chips={...m.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&B!=="running"?{scope_missing:!0}:{},...Fe?{popover:Fe}:{}},m};for(let m of ga)ba(m,"queue");for(let m of Bs)for(let B of m.rows)B.ghost!==!0&&ba(B,m.id);for(let m of ca)ba(m,"candidate");let Cl=new Map;for(let m of vr){let B=typeof m.bead_id=="string"?m.bead_id:"";if(B.length===0)continue;let oe=m.kind==="session",Fe=Tl.get(B),rt=Fe&&Fe.overlaps.length>0?Fe.overlaps:null,St=typeof m.attempt_id=="string"&&m.attempt_id.length>0?Yr.get(m.attempt_id):void 0,Ot=St&&St.last_activity&&typeof St.last_activity=="object"?St.last_activity:null,mt=St&&Array.isArray(St.legs)?St.legs:[];if(!rt&&!Ot&&mt.length===0&&!oe)continue;let tn=rt?ge(B,rt):null;Cl.set(B,{...Ot?{last_activity:Ot}:{},...mt.length>0?{legs:mt}:{},...rt?{dependency_chips:{overlaps:rt,...tn?{popover:tn}:{}}}:{}})}return{queue:p,idToTitle:en,candidates:ca,candidate_hidden:{blocked:la.hidden_blocked,spec:la.hidden_spec},running:vr,live_count:fl,slots:ml,over_cap:cf,failure:sl,waiting:ga,serial_lanes:Bs,serial_lane_count:xl,running_overlays:Cl,pr_wait:Un.map(m=>uy(m.bead_id,en.get(m.bead_id)||m.bead_id,Kr,ut[m.bead_id]||null,mn(p.attempts||{},m.bead_id),qe[m.bead_id]||(Z.has(m.bead_id)||ce.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),qs.get(m.bead_id)||null,m.external===!0,{position:al.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:af[m.bead_id]||null,waiting:dl?.bead_id===m.bead_id?dl.reason:null,resolution:il.get(m.bead_id),continuation_action:ll.get(m.bead_id),head_review:cl.get(m.bead_id)||null,authority:ul.get(m.bead_id)||null},m.wt_present!==!1,p.auto_merge===!0?pl(m.bead_id):null,Gi(Ds,sf(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Yr.get(tl.get(m.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(m=>({...m,workflow:jn[m.id]||null,priority:Sn.get(m.id),...tr(m.id)})),merge_queue_length:_a.length,merge_queue_running:_a.length>0,auto_excluded:Un.map(m=>m.bead_id).filter(m=>pl(m)!==null),declared_base:Ds,done:Zr,token_total:ff,cleanup_failures:an,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function De(){let b=!!o?.get()?.job,f=!b&&o?.isPending?.()===!0,T=b?"\uBD84\uC11D \uC911":f?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${T?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${T?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${T?c`<span class="worker-analysis-btn__badge">${T}</span>`:""}
    </button>`}function it(p){let b=p.waiting.length>0?p.waiting[0].id:"\u2014",f=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,T=Gt(p),C=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ue=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${p.done.length}</b></span
      >`,Ee=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Be=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oa}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Rp},(bt,on)=>on+1).map(bt=>c`<option
                value=${String(bt)}
                ?selected=${p.serial_lane_count===bt}
              >
                ${bt}
              </option>`)}
        </select>
      </label>
      ${o?De():""} `,Qe=ud({failure:p.failure}),Ve=nd(p.repo_operations,p.cleanup_failures);return Te?c`<div class="worker-ribbon">
          ${f} ${T}
          <div class="worker-kpi worker-kpi--ribbon">${C}${ue}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Be}</div>
          <div class="worker-kpi">${Ee}</div>
        </div>
        ${Ve}${pt.template()}${Qe}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${f}${T}${Be}</div>
        <div class="worker-kpi">
          ${C}${ue}${Ee}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(bt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${bt.tooltip}
                >${U()} 완료 · 누적 ${bt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${Ve}${pt.template()}${Qe}`}function Pt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let b=p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0);return c`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Ei(p.running,Date.now(),Ae,p.running_overlays):""}
      ${p.pr_wait.map(f=>Kn(f))}
    </section>`}function ht(p){let b=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${V.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Bb.map(f=>c`<button
              type="button"
              class="worker-filter__chip${V.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${V.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function Vt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${q}
    >
      ${Ub.map(p=>c`<option value=${p.value} ?selected=${q===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Mt(){return c`<div class="worker-done-controls">
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
    </div>`}function qt(p){let b=c`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,f=p.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return hn({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:b,controls:f})}function Gt(p){let b=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(b)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let f=new Set(p.auto_excluded),T=p.pr_wait.filter(C=>C.merge_action&&C.merge_enabled&&!f.has(C.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${T>0?` ${T}`:""}
    </button>`}function jt(p){let b=hn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Vt(),controls:ht(p),place_menu:Xe(p.candidates),onOpenDoc:d?(f,T)=>d(T):void 0});return Te?c`<div class="worker-lanes worker-lanes--mobile">
        ${Pt(p)}
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ne.queue,preview:Ip(p.waiting)})}
        ${p.serial_lanes.map(f=>qt(f))}
        ${b}
        ${hn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Mt(),collapsible:!0,collapsed:ne.done,preview:Array.isArray(p.token_total)?p.token_total.map(f=>f.label).join(" \xB7 "):p.token_total||Ip(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${b}
      <div class="worker-wait">
        ${hn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(f=>qt(f))}
      </div>
      ${hn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0),body:Ei(p.running,Date.now(),Ae,p.running_overlays)})}
      ${hn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${hn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${U()} ${p.done.length}`,items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,controls:Mt()})}
    </div>`}function Dt(p){ne={...ne,[p]:!ne[p]},Yb(ne),Ue()}function Ue(){let p=ot();Ke(it(p),ie),Ke(jt(p),we)}function Jt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Vb);Te=!!p.matches;let b=f=>{let T=!!(f&&typeof f.matches=="boolean"?f.matches:p.matches);T!==Te&&(Te=T,Ue())};typeof p.addEventListener=="function"?(p.addEventListener("change",b),Y.push(()=>p.removeEventListener("change",b))):typeof p.addListener=="function"&&(p.addListener(b),Y.push(()=>p.removeListener(b)))}let Kt=null;function at(p){Kt=p.target instanceof Element?p.target:null}function Ie(p){let f=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;if(Kt&&f.contains(Kt)&&Kt.closest("input, button, a")){p.preventDefault();return}let T=f.dataset.beadId||"",C=f.dataset.lane||"";F={bead_id:T,from_lane:C};try{p.dataTransfer?.setData("text/plain",T),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function L(p){let b=p.target?.closest?.(".worker-pane");if(!b)return;let f=b.dataset.lane||"";f!=="candidate"&&f!=="queue"&&!/^s[1-5]$/.test(f)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function pe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Pe(p,b){let f=H.find(Ee=>Ee.id===p);if(!f)return;let T=H.filter(Ee=>Ee.id!==p),C=T.length;if(b){let Ee=b.dataset.beadId;if(Ee===p)return;let Be=T.findIndex(Qe=>Qe.id===Ee);Be>=0&&(C=Be)}let ue=T.slice();ue.splice(C,0,f),E.applyReorder(p,ue,C)}function ct(p){let b=p.target?.closest?.(".worker-pane");if(!b)return;p.preventDefault(),b.classList.remove("worker-pane--drag-over");let f=b.dataset.lane||"",T=F?.bead_id||p.dataTransfer?.getData("text/plain")||"",C=F?.from_lane||"";if(F=null,!T)return;let ue=p.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Be=Ee.length;if(ue){let Qe=Ee.indexOf(ue);Qe>=0&&(Be=Qe)}if(Be=Math.max(0,Be-b.querySelectorAll(".worker-mini--ghost").length),b.classList.contains("worker-pane--collapsed")&&(Be=We()),f==="candidate"){if(C==="candidate"){Pe(T,ue);return}(C==="queue"||/^s[1-5]$/.test(C))&&tt(T);return}if(f==="queue"||/^s[1-5]$/.test(f)){let Qe=f==="queue"?"parallel":f;C===f?nt(T,Qe,Be):Ze(T,Qe)}}function At(p){V=p,Fb(p),Ue()}function _t(p){q=p==="board"||p==="created"||p==="spec"?p:aa,zb(q),Ue()}function It(p){K=_n(p)?p:ln,Gb(K),h?.(K),Ue()}function Ft(p){let b=p.target?.closest?.(".worker-serial-lane-count");if(b){let Be=Number.parseInt(b.value,10);Number.isFinite(Be)&&j(Be).then(Ue);return}let f=p.target?.closest?.(".worker-filter__blocked");if(f){At({...V,show_blocked:f.checked});return}let T=p.target?.closest?.(".worker-done-range");if(T){It(T.value);return}let C=p.target?.closest?.(".worker-sort");if(C){_t(C.value||aa);return}let ue=p.target?.closest?.(".worker-slots__input");if(!ue)return;let Ee=Number.parseInt(ue.value,10);if(!Number.isFinite(Ee)){Ue();return}x(Ee).then(Ue)}function v(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function y(){let p=ot();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function $(){Ae&&Ne.close(),fe.hidden=!1,Ye.hidden=!1,ze.open(y()),Ue()}function N(p){let b=Q(),f=b.attempts?b.attempts[p]:null;Ae=p,Ge=null,ze.close(),fe.hidden=!0,Ye.hidden=!1,Ne.open({attempt_id:p,meta:v(f)}),Ue()}function re(p,b){Ae=null,Ge=p,ze.close(),fe.hidden=!0,Ye.hidden=!1,Ne.open({attempt_id:p,meta:b,hide_prompt:!0}),Ue()}function he(){if(ze.isOpen()&&ze.refresh(y()),Ge){let f=(o?.get()?.runs||[]).find(T=>T.run_id===Ge);f?Ne.updateMeta(Wi(f)):Ne.close();return}if(!Ae)return;let p=Q(),b=p.attempts?p.attempts[Ae]:null;if(b){Ne.updateMeta(v(b));return}Ne.close()}function k(p){let b=p.target;if(b?.closest?.(".worker-mini__serial, .worker-mini__grip")||b?.closest?.("#worker-parallel-analysis-dialog"))return;let f=b?.closest?.(".mon-overlap__chip");if(f){let qe=f.closest("[data-bead-id]"),ut=qe&&qe.getAttribute("data-bead-id")||"";if(ut){let an=f.getAttribute("data-overlap-id")||"";M=!!M&&M.bead_id===ut&&M.counterpart_id===an?null:{bead_id:ut,counterpart_id:an},Ue()}return}let T=b?.closest?.(".mon-overlap__place");if(T){let qe=T.closest("[data-bead-id]"),ut=qe&&qe.getAttribute("data-bead-id")||"";ut&&Le(ut,T.getAttribute("data-counterpart-id")||"");return}if(b?.closest?.(".mon-overlap__popover"))return;if(b?.closest?.(".worker-analysis-btn")){J?.open();return}if(b?.closest?.(".worker-repo-strip")||b?.closest?.(".worker-mini__timeline")){$();return}let C=b?.closest?.(".worker-repo-op__session");if(C){let qe=C.dataset.attemptId;qe&&N(qe);return}let ue=b?.closest?.(".worker-repo-op__resolve");if(ue){S(ue.dataset.operationId||"");return}let Ee=b?.closest?.(".worker-repo-op__dismiss");if(Ee){g(Ee.dataset.operationId||"");return}let Be=b?.closest?.(".worker-cleanup__resume");if(Be){let qe=Be.dataset.beadId;qe&&gt(qe);return}let Qe=b?.closest?.(".worker-banner__resume");if(Qe){let qe=Qe.dataset.attemptId;qe&&kt(qe);return}let Ve=b?.closest?.(".worker-banner__discard");if(Ve){let qe=Ve.dataset.confirmation==="merged"?"merged":"unmerged";se(Ve.dataset.beadId||"",Ve.dataset.attemptId||null,qe,Ve.dataset.operationId||null);return}let bt=b?.closest?.(".worker-banner__dismiss");if(bt){let qe=bt.dataset.attemptId;qe&&xt(qe);return}if(b?.closest?.(".worker-play")){$e(!Q().auto_advance);return}let on=b?.closest?.(".worker-merge-all");if(on){on.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?Ce(!1):W():Ce(!0);return}let Hr=b?.closest?.(".worker-pane__hd--toggle");if(Hr){let qe=Hr.dataset.lane;(qe==="queue"||qe==="done")&&Dt(qe);return}let gr=b?.closest?.(".worker-card__place-lane");if(gr){let qe=gr.dataset.beadId,ut=gr.dataset.lane;qe&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(ae=null,Ue(),Ze(qe,ut));return}if(b?.closest?.(".worker-card__place-cancel")){ae=null,Ue();return}let en=b?.closest?.(".worker-card__place");if(en){let qe=en.dataset.beadId;qe&&!en.disabled&&(Me()?(ae=qe,Ue()):Ze(qe,"parallel"));return}let Gr=b?.closest?.(".worker-filter__chip");if(Gr){let qe=Gr.dataset.spec;(qe==="all"||qe==="with"||qe==="without")&&At({...V,spec:qe});return}let Sn=b?.closest?.(".worker-mini__merge");if(Sn){let qe=Sn.dataset.beadId||"";Q().cleanup_failed?.[qe]?gt(qe):Ct(qe);return}let Is=b?.closest?.(".worker-mini__merge-cancel");if(Is){I(Is.dataset.beadId||"");return}let er=b?.closest?.(".worker-mini__discard");if(er){se(er.dataset.beadId||"",er.dataset.attemptId||null,er.dataset.discardMode==="merged"?"merged":"unmerged",er.dataset.operationId||null);return}let jn=b?.closest?.(".worker-mini__stale-continue");if(jn){O("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let Bn=b?.closest?.(".worker-mini__stale-backup");if(Bn){O("worker-stale-work-backup-fresh",Bn.dataset.beadId||"",Bn.dataset.actionId||"");return}let hr=b?.closest?.(".worker-mini__stale-recheck");if(hr){O("worker-stale-work-recheck",hr.dataset.beadId||"",hr.dataset.actionId||"");return}let Vr=b?.closest?.(".worker-mini__revise-fix");if(Vr){G("worker-revise-fix",Vr.dataset.beadId||"");return}let Ps=b?.closest?.(".worker-mini__revise-approve");if(Ps){G("worker-revise-approve",Ps.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__discard")){let qe=b?.closest?.(".rtile"),ut=qe?.dataset?.beadId,an=qe?.dataset?.attemptId;ut&&se(ut,an||null,"unmerged",b?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(b?.closest?.(".rtile__dismiss")){let ut=b?.closest?.(".rtile")?.dataset?.attemptId;ut&&xt(ut);return}if(b?.closest?.(".rtile__pause")){let ut=b?.closest?.(".rtile")?.dataset?.attemptId;ut&&ft(ut);return}if(b?.closest?.(".rtile__resume")){let ut=b?.closest?.(".rtile")?.dataset?.attemptId;ut&&kt(ut);return}if(b?.closest?.(".rtile__session")){let ut=b?.closest?.(".rtile")?.dataset?.attemptId;ut&&N(ut);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){ze.close(),Ne.close();return}if(b?.closest?.(".worker-drawer-host"))return;let br=b?.closest?.(".rtile .board-card__roll-toggle");if(br){let qe=br.dataset.rollParent;qe&&(Se.has(qe)?Se.delete(qe):Se.add(qe),Ue());return}let tr=b?.closest?.(".rtile .board-card__roll-child");if(tr){let qe=tr.dataset.childId;qe&&l&&l(qe);return}let Un=b?.closest?.(".rtile");if(Un){if(b?.closest?.(".rtile__id")){let ut=Un.dataset.beadId;ut&&un(ut).then(an=>{an?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let qe=Un.dataset.beadId;qe&&l&&l(qe);return}let Kr=b?.closest?.(".worker-mini, .worker-card");if(Kr){let qe=Kr.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){qe&&un(qe).then(an=>{an?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=b?.closest?.(".ctl-chip--from");if(ut){let an=ut.dataset.fromId;an&&l&&l(an);return}qe&&l&&l(qe)}}e.addEventListener("pointerdown",at),e.addEventListener("dragstart",Ie),e.addEventListener("dragover",L),e.addEventListener("dragleave",pe),e.addEventListener("drop",ct),e.addEventListener("click",k),e.addEventListener("change",Ft);function A(p){if(!M)return;let b=p.target;b&&typeof b.closest=="function"&&b.closest(".mon-overlap__popover, .mon-overlap__chip")||(M=null,Ue())}function be(p){p.key!=="Escape"||!M||(M=null,Ue())}return document.addEventListener("click",A),document.addEventListener("keydown",be),Y.push(()=>{document.removeEventListener("click",A),document.removeEventListener("keydown",be)}),Jt(),w&&Y.push(w.subscribe(()=>{for(let[p,b]of R)b==="failed"&&R.delete(p);Ue()})),s&&Y.push(s.subscribe(()=>{let p=u&&u()||"";p!==wt&&(wt=p,Je.close()),Ue(),he()})),o&&typeof o.subscribe=="function"&&Y.push(o.subscribe(()=>{he(),Ue()})),Ue(),{load(){ye(),Ue()},refreshSessionDefaults:_e,destroy(){for(let p of Y.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",at),e.removeEventListener("dragstart",Ie),e.removeEventListener("dragover",L),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",ct),e.removeEventListener("click",k),e.removeEventListener("change",Ft);try{Ne.destroy()}catch{}Ye.hidden=!0;try{J?.destroy()}catch{}try{Je.destroy()}catch{}Ke(c``,e)}}}function Ki(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function jp(e,t,n,r=async()=>{},s=async()=>{}){let o=Rt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(K){let U=K.target.value,Te=t.getState().workspace?.current?.path||"";if(U&&U!==Te){o("switching workspace to %s",U),i=!0,q();try{await n(U)}catch(Z){o("workspace switch failed: %o",Z)}finally{i=!1,q()}}}async function _(){let K=t.getState(),R=K.workspace?.current?.path||K.workspace?.available?.[0]?.path||"";if(!(!R||l)){o("git-pulling workspace %s",R),l=!0,q();try{await r(R)}catch(U){o("workspace git pull failed: %o",U)}finally{l=!1,q()}}}function h(K){let R=K.target;R&&e.contains(R)||F()}function w(K){K.key==="Escape"&&F()}function E(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),q())}function F(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),q())}function H(){u?F():E()}async function V(K){let R=K.target,U=R.value,ne=R.checked;o("toggling visibility %s \u2192 %s",U,String(ne));try{await s(U,ne)}catch(Te){o("workspace visibility toggle failed: %o",Te)}}function ae(K){return K?c`
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
    `:c``}function M(K,R){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${H}
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
                        .checked=${!R.has(U.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ki(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let K=t.getState(),R=K.workspace?.current,U=K.workspace?.available||[],ne=new Set(K.workspace?.hidden||[]),Te=R?.path||U[0]?.path||"";if(U.length===0)return c``;let Z=U.filter(ce=>!ne.has(ce.path)||ce.path===Te);if(Z.length<=1){let ce=Z[0]||U[0],z=Ki(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${z}</span
          >
          ${M(U,ne)}
          ${ae(Te)}
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
          ${Z.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===Te}
                title="${ce.path}"
              >
                ${Ki(ce.path)}
              </option>
            `)}
        </select>
        ${M(U,ne)}
        ${ae(Te)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Ke(D(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Ke(c``,e)}}}var Bp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Yi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Up(e,t,n=Yi()){return{id:n,type:e,payload:t}}function Wp(e={}){let t=Rt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],_=new Map,h=new Set;function w(D){for(let q of Array.from(h))try{q(D)}catch{}}function E(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let D=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*D,K=Math.max(0,Math.round(D+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",K,a+1),i=setTimeout(()=>{i=null,M()},K)}function F(D){try{s?.send(JSON.stringify(D))}catch(q){t("ws send failed",q)}}function H(){for(o="open",t("ws open"),w(o),a=0;d.length;){let D=d.shift();D&&F(D)}}function V(D){let q;try{q=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let R=u.get(q.id);u.delete(q.id),q.ok?R?.resolve(q.payload):R?.reject(q.error||new Error("ws error"));return}let K=_.get(q.type);if(K&&K.size>0)for(let R of Array.from(K))try{R(q.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",q.type)}function ae(){o="closed",t("ws closed"),w(o);for(let[D,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(D);a+=1,E()}function M(){if(!l)return;let D=r();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",w(o),s.addEventListener("open",H),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(q){t("ws connect failed %o",q),E()}}return M(),{send(D,q){if(!Bp.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let K=Yi(),R=Up(D,q,K);return t("send %s id=%s",D,K),new Promise((U,ne)=>{u.set(K,{resolve:U,reject:ne,type:D}),s&&s.readyState===s.OPEN?F(R):(t("queue %s id=%s (state=%s)",D,K,o),d.push(R))})},on(D,q){_.has(D)||_.set(D,new Set);let K=_.get(D);return K?.add(q),()=>{K?.delete(q)}},onConnection(D){return h.add(D),()=>{h.delete(D)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,M()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function dy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function py(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Zi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],zp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Xn="tab:worker:closed",fy="bdui.worker.done-range",Hp=Vd,Gp="worker:queue",Vp="worker:parallel-analysis",Kp="ui:order",Yp="ui:display-policy",Zp="exec:presets",Jn="tab:board:closed",Qp="beads-ui.board.closed-range";function _y(e){let t=Rt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&fp(a),i&&l&&u&&d){let X=function(k,A){let be="Request failed",p="";if(k&&typeof k=="object"){let f=k;if(typeof f.message=="string"&&f.message.length>0&&(be=f.message),typeof f.details=="string")p=f.details;else if(f.details&&typeof f.details=="object")try{p=JSON.stringify(f.details,null,2)}catch{p=""}}else typeof k=="string"&&k.length>0&&(be=k);let b=A&&A.length>0?`Failed to load ${A}`:"Request failed";Y.open(b,be,p)},Xe=function(k){return`${at.getState().workspace.current?.path||""}\0${k}`},Re=function(){Ne&&(Ne().catch(()=>{}),Ne=null),ze=null,Je=null},We=function(k){wt=k;let A=()=>{wt!==k||at.getState().selected_id!==k||(wt=null,ke(k))};if(!Q){J.then(A);return}A()},ft=function(k,A,be,p,b){return be!==tt[A]?(b().catch(()=>{}),!1):(k.set(p,b),!0)},xt=function(){let k=at.getState();Ce(k.view==="board"),$e(k.view==="worker"),te(k.view==="monitor"),g(k.view==="board"||k.view==="worker"||kt||!!k.selected_id)},gt=function(){let k=ir(vt);return k===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:k}}},He=function(){let k=ir(Ct);return k===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:k}}},Ce=function(k){if(k)for(let[A,be]of Zi){if(Ze.has(A)||nt.has(A))continue;let p=A===Jn?gt():{type:be};try{ie.register(A,p)}catch(T){t("register %s store failed: %o",A,T)}nt.add(A);let b=tt.board,f=!1;je.subscribeList(A,p).then(T=>{f=!ft(Ze,"board",b,A,T)}).catch(T=>{t("subscribe %s failed: %o",A,T),X(T,"board")}).finally(()=>{nt.delete(A),f&&xt()})}else se()},se=function(){tt.board+=1;for(let[k]of Zi){let A=Ze.get(k);A&&(A().catch(()=>{}),Ze.delete(k));try{ie.unregister(k)}catch(be){t("unregister %s failed: %o",k,be)}}},$e=function(k){if(!k){S();return}for(let[A,be]of zp){if(O.has(A)||nt.has(A))continue;let p=A===Xn?He():{type:be};try{ie.register(A,p)}catch(T){t("register %s store failed: %o",A,T)}nt.add(A);let b=tt.worker,f=!1;je.subscribeList(A,p).then(T=>{f=!ft(O,"worker",b,A,T)}).catch(T=>{t("subscribe %s failed: %o",A,T),X(T,"worker")}).finally(()=>{nt.delete(A),f&&xt()})}},S=function(){tt.worker+=1;for(let[k]of zp){let A=O.get(k);A&&(A().catch(()=>{}),O.delete(k));try{ie.unregister(k)}catch(be){t("unregister %s failed: %o",k,be)}}},g=function(k){if(!k){x();return}G||(_e("subscribe-worker-queue",{id:Gp}).catch(A=>{t("subscribe-worker-queue failed: %o",A)}),_e("subscribe-worker-parallel-analysis",{id:Vp}).catch(A=>{t("subscribe-worker-parallel-analysis failed: %o",A)}),G=()=>(_e("unsubscribe-worker-parallel-analysis",{id:Vp}),_e("unsubscribe-worker-queue",{id:Gp})))},x=function(){G&&(G().catch(()=>{}),G=null),st.clear()},te=function(k){if(!k){ee();return}j||(_e("subscribe-monitor-pipeline",{id:Hp}).catch(A=>{t("subscribe-monitor-pipeline failed: %o",A)}),j=()=>_e("unsubscribe-monitor-pipeline",{id:Hp}))},ee=function(){j&&(j().catch(()=>{}),j=null)},Le=function(){ge||(_e("subscribe-ui-order",{id:Kp}).catch(k=>{t("subscribe-ui-order failed: %o",k)}),ge=()=>_e("unsubscribe-ui-order",{id:Kp}))},et=function(){ge&&(ge().catch(()=>{}),ge=null),fe.clear()},De=function(){ot||(_e("subscribe-display-policy",{id:Yp}).catch(k=>{t("subscribe-display-policy failed: %o",k)}),ot=()=>_e("unsubscribe-display-policy",{id:Yp}))},it=function(){ot&&(ot().catch(()=>{}),ot=null),we.clear()},ht=function(){Pt||(_e("subscribe-impl-presets",{id:Zp}).catch(k=>{t("subscribe-impl-presets failed: %o",k)}),Pt=()=>_e("unsubscribe-impl-presets",{id:Zp}))},Dt=function(k){if(!k)return"Unknown";let A=k.split("/").filter(Boolean);return A.length>0?A[A.length-1]:"Unknown"},Ft=function(k,A){It.open(k.path,{missing_state:k.missing_state,...A?{workspace:A}:{}})};var _=X,h=Xe,w=Re,E=We,F=ft,H=xt,V=gt,ae=He,M=Ce,D=se,q=$e,K=S,R=g,U=x,ne=te,Te=ee,Z=Le,ce=et,z=De,Oe=it,Se=ht,me=Dt,le=Ft;let ve=document.getElementById("header-loading"),xe=_c(ve),Y=td(e),ye=Wp(),_e=xe.wrapSend((k,A)=>ye.send(k,A)),je=ac(_e),ie=ic(),Ye=uc(),st=cc(),P=Hl(),fe=lc(),we=Wl(),Ae=zl(),Ge=Gl();ye.on("impl-presets-snapshot",k=>{let A=k;A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&Ae.set({revision:A.revision,presets:A.presets})}),ye.on("monitor-pipeline-snapshot",k=>{let A=k;if(!(!A||!Array.isArray(A.workspaces)))try{P.set(A.workspaces,A.workspaces_state)}catch{}}),ye.on("ui-order-snapshot",k=>{let A=k;if(A&&typeof A.revision=="number")try{fe.set({revision:A.revision,order:A.order&&typeof A.order=="object"?A.order:{}})}catch{}}),ye.on("display-policy-snapshot",k=>{let A=k;if(A&&A.policy&&typeof A.policy=="object")try{we.set(A.policy)}catch{}}),ye.on("session-log-snapshot",k=>{let A=k;if(A&&typeof A.id=="string")try{Ge.set(A.id,Array.isArray(A.lines)?A.lines:[],typeof A.last_event_at=="number"?A.last_event_at:null)}catch{}}),ye.on("session-log-append",k=>{let A=k;if(A&&typeof A.id=="string")try{Ge.append(A.id,A.event)}catch{}}),ye.on("snapshot",k=>{let A=k,be=A&&typeof A.id=="string"?A.id:"",p=be?ie.getStore(be):null;if(p&&A&&A.type==="snapshot")try{p.applyPush(A)}catch{}}),ye.on("upsert",k=>{let A=k,be=A&&typeof A.id=="string"?A.id:"",p=be?ie.getStore(be):null;if(p&&A&&A.type==="upsert")try{p.applyPush(A)}catch{}}),ye.on("delete",k=>{let A=k,be=A&&typeof A.id=="string"?A.id:"",p=be?ie.getStore(be):null;if(p&&A&&A.type==="delete")try{p.applyPush(A)}catch{}});let Ne=null,ze=null,Je=null,wt=null,pt=()=>{},J=new Promise(k=>{pt=()=>k(void 0)}),Q=!1,Me=!1;async function ke(k){let A=Xe(k);if(A===ze||A===Je)return;Je=A;let be=`detail:${k}`,p={type:"issue-detail",params:{id:k}};try{ie.register(be,p)}catch(b){t("register detail store failed: %o",b)}try{let b=await je.subscribeList(be,p);if(at.getState().selected_id!==k||Xe(k)!==A){await b().catch(()=>{});return}Ne&&await Ne().catch(()=>{}),Ne=b,ze=A}catch(b){t("detail subscribe failed: %o",b),X(b,"issue details")}finally{Je===A&&(Je=null)}}let Ze=new Map,nt=new Set,tt={board:0,worker:0},kt=!1,vt=ln;try{let k=window.localStorage.getItem(Qp);_n(k)&&(vt=k)}catch{}let Ct=ln;try{let k=window.localStorage.getItem(fy);_n(k)&&(Ct=k)}catch{}async function I(k){if(!_n(k)||k===vt)return;vt=k;try{window.localStorage.setItem(Qp,k)}catch{}let A=Ze.get(Jn);if(!A)return;Ze.delete(Jn),await A().catch(()=>{});let be=gt();try{ie.register(Jn,be)}catch(p){t("register %s store failed: %o",Jn,p)}try{let p=await je.subscribeList(Jn,be);Ze.set(Jn,p)}catch(p){t("re-subscribe %s failed: %o",Jn,p),X(p,"board")}}async function W(k){if(!_n(k)||k===Ct)return;Ct=k;let A=O.get(Xn);if(!A)return;O.delete(Xn),await A().catch(()=>{});let be=He();try{ie.register(Xn,be)}catch(p){t("register %s store failed: %o",Xn,p)}try{let p=await je.subscribeList(Xn,be);O.set(Xn,p)}catch(p){t("re-subscribe %s failed: %o",Xn,p),X(p,"worker")}}let O=new Map,G=null,j=null,ge=null,ot=null,Pt=null;async function Vt(){ot=null,we.clear(),Pt=null,Ae.clear(),G=null,j=null,Ze.clear(),O.clear(),tt.board+=1,tt.worker+=1,ht();let k=at.getState().workspace.current?.path;if(k)try{await ye.send("set-workspace",{path:k})}catch(be){t("workspace restore after reconnect failed: %o",be);return}De();let A=at.getState();Ce(A.view==="board"),$e(A.view==="worker"),te(A.view==="monitor"),g(A.view==="board"||A.view==="worker"||!!A.selected_id)}async function Mt(){t("clearing all subscriptions for workspace switch"),se(),S(),x(),Ye.clear(),et(),Le(),it(),De(),Re();let k=at.getState();if(k.selected_id)try{ie.unregister(`detail:${k.selected_id}`)}catch{}let A=at.getState();Ce(A.view==="board"),$e(A.view==="worker"),te(A.view==="monitor"),g(A.view==="board"||A.view==="worker"||!!A.selected_id),A.selected_id&&We(A.selected_id)}async function qt(k){t("requesting workspace switch to %s",k),Me=!0;try{let A=await ye.send("set-workspace",{path:k});t("workspace switch result: %o",A),A&&A.workspace&&(at.setState({workspace:{current:{path:A.workspace.root_dir,database:A.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",k),A.changed&&(await Mt(),de("Switched to "+Dt(k),"success",2e3)))}catch(A){throw t("workspace switch failed: %o",A),de("Failed to switch workspace","error",3e3),A}finally{Me=!1}}async function Gt(k){t("requesting workspace git pull for %s",k);try{let A=await ye.send("git-pull-workspace",{});t("workspace git pull result: %o",A);let be=A?.status;if(be==="up_to_date"){de("Already up to date","success",2e3);return}if(be==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Dt(k),"success",2e3)}catch(A){t("workspace git pull failed: %o",A);let be=A?.code,p=A?.message;if(be==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(be==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(be==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let b=p?`: ${p}`:"";throw de(`Git pull failed${b}`,"error",3e3),A}}async function jt(k,A){t("setting workspace visibility %s \u2192 %s",k,String(A));try{await ye.send("set-workspace-visibility",{path:k,visible:A}),await Ue()}catch(be){t("workspace visibility update failed: %o",be),de("Failed to update project visibility","error",3e3)}}async function Ue(){try{let k=await ye.send("list-workspaces",{});if(t("workspaces loaded: %o",k),k&&Array.isArray(k.workspaces)){let A=k.workspaces.map(f=>({path:f.path,database:f.database,pid:f.pid,version:f.version})),be=k.current?{path:k.current.root_dir,database:k.current.db_path}:null,p=Array.isArray(k.hidden)?k.hidden.filter(f=>typeof f=="string"):[];at.setState({workspace:{current:be,available:A,hidden:p}});let b=window.localStorage.getItem("beads-ui.workspace");b&&(!A.some(T=>T.path===b)||p.includes(b)?window.localStorage.removeItem("beads-ui.workspace"):be&&b!==be.path&&(t("restoring saved workspace preference: %s",b),await qt(b)))}}catch(k){t("failed to load workspaces: %o",k)}}ye.on("workspace-changed",k=>{t("workspace-changed event: %o",k),k&&k.root_dir&&(at.setState({workspace:{current:{path:k.root_dir,database:k.db_path}}}),Ue(),Mt())});let Jt=!1;if(typeof ye.onConnection=="function"){let k=A=>{t("ws state %s",A),A==="reconnecting"||A==="closed"?(Jt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):A==="open"&&Jt&&(Jt=!1,de("Reconnected","success",2200),py(at,(be,p)=>{t(`${be}: %o`,p)}),Vt())};ye.onConnection(k)}let Kt="board";try{let k=window.localStorage.getItem("beads-ui.view");(k==="board"||k==="worker"||k==="monitor")&&(Kt=k)}catch(k){t("view parse error: %o",k)}let at=fc({config:dy(),view:Kt});ye.on("worker-queue-snapshot",k=>{let A=k;if(!A||!A.queue)return;let be=at.getState().workspace.current?.path;if(typeof be=="string"&&be.length>0&&A.root_dir!==be){t("dropping worker-queue snapshot for %s",String(A.root_dir));return}try{Ye.set(A.queue)}catch{}}),ye.on("worker-parallel-analysis-snapshot",k=>{let A=k;if(!A)return;let be=at.getState().workspace.current?.path;if(!(typeof be=="string"&&be.length>0&&typeof A.root_dir=="string"&&A.root_dir!==be))try{st.set({settings:A.settings,job:A.job??null,runs:Array.isArray(A.runs)?A.runs:[],last_good:A.last_good??null})}catch{}});let Ie=dc(at);Ie.start();let L=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),pe=async(k,A)=>{try{return await _e(k,A)}catch(be){if(L.has(k))throw be;return[]}};Yd({global_element:r,repo_element:s},at,Ie);let Pe=document.getElementById("workspace-picker");Pe&&jp(Pe,at,qt,Gt,jt);let ct=Jd(e,(k,A)=>_e(k,A));try{let k=document.getElementById("new-issue-btn");k&&k.addEventListener("click",()=>ct.open())}catch{}let At=rp(e,{policyStore:we,queueStore:Ye,implPresetStore:Ae,transport:(k,A)=>_e(k,A),onOpenChange:k=>{let A=kt;kt=k,xt(),A&&k===!1&&y.refreshSessionDefaults()},labelOptions:()=>{let k=new Set;for(let[A]of Zi)for(let be of ie.snapshotFor(A)||[]){let p=be.labels;if(Array.isArray(p))for(let b of p)typeof b=="string"&&b.length>0&&k.add(b)}return Array.from(k).sort()}});try{let k=document.getElementById("display-settings-btn");k&&(k.setAttribute("aria-label","\uC124\uC815"),k.setAttribute("title","\uC124\uC815"),k.addEventListener("click",()=>At.open()))}catch{}let _t=document.createElement("div");_t.className="md-viewer-root",document.body.appendChild(_t);let It=Fo(_t,{getWorkspacePath:()=>at.getState().workspace.current?.path}),v=Ec(i,{gotoIssue:k=>Ie.gotoIssue(k),issueStores:ie,transport:pe,workerQueueStore:Ye,uiOrderStore:fe,displayPolicyStore:we,closedRange:vt,onClosedRangeChange:k=>{I(k)},onNewIssue:()=>ct.open(),openDoc:Ft}),y=Vi(l,{transport:pe,issueStores:ie,queueStore:Ye,analysisStore:st,sessionLogStore:Ge,uiOrderStore:fe,gotoIssue:k=>at.setState({selected_id:k}),getWorkspacePath:()=>at.getState().workspace.current?.path,openDoc:Ft,doneRange:Ct,onDoneRangeChange:k=>{W(k)}}),$=Kd(u,{transport:pe,pipelineStore:P,execPresetStore:Ae,sessionLogStore:Ge,router:Ie,gotoIssue:k=>Ie.gotoIssue(k),getWorkspacePath:()=>at.getState().workspace.current?.path,switchWorkspace:k=>qt(k),openDoc:Ft}),N=ed(d,{issueStores:ie,transport:pe,queueStore:Ye,execPresetStore:Ae,sessionLogStore:Ge,getWorkspacePath:()=>at.getState().workspace.current?.path,mdViewer:It,onNavigate:k=>{at.getState().view==="worker"?at.setState({selected_id:k}):Ie.gotoIssue(k)},onClose:()=>{let k=at.getState();at.setState({selected_id:null});try{Ie.gotoView(k.view==="worker"||k.view==="monitor"?k.view:"board")}catch{}},onOpenExecPresets:()=>{At.open("execution")}}),re=at.getState().selected_id;re&&(d.hidden=!1,N.load(re),We(re)),at.subscribe(k=>{let A=k.selected_id;A?(d.hidden=!1,N.load(A),Me||We(A)):(N.clear(),d.hidden=!0,Re())});let he=k=>{i.hidden=k.view!=="board",l.hidden=k.view!=="worker",u.hidden=k.view!=="monitor",o&&o.classList.toggle("is-quiet",k.view==="monitor"),Ce(k.view==="board"),$e(k.view==="worker"),te(k.view==="monitor"),g(k.view==="board"||k.view==="worker"||kt||!!k.selected_id),!k.selected_id&&k.view==="board"&&v.load(),k.view==="worker"&&y.load(),k.view==="monitor"?$.load():$.pause(),window.localStorage.setItem("beads-ui.view",k.view)};at.subscribe(he),he(at.getState()),Le(),De(),ht(),Ue().finally(()=>{Q=!0,pt()}),window.addEventListener("keydown",k=>{let A=k.ctrlKey||k.metaKey,be=String(k.key||"").toLowerCase(),p=k.target,b=p&&p.tagName?String(p.tagName).toLowerCase():"",f=b==="input"||b==="textarea"||b==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;A&&be==="n"&&(f||(k.preventDefault(),ct.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&_y(t)});export{_y as bootstrap,dy as readBootstrapConfig,py as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
