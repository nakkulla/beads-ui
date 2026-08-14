var dc=Object.create;var ms=Object.defineProperty;var uc=Object.getOwnPropertyDescriptor;var pc=Object.getOwnPropertyNames;var fc=Object.getPrototypeOf,_c=Object.prototype.hasOwnProperty;var mc=(e,t,r)=>t in e?ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var gs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var gc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of pc(t))!_c.call(e,s)&&s!==r&&ms(e,s,{get:()=>t[s],enumerable:!(n=uc(t,s))||n.enumerable});return e};var hc=(e,t,r)=>(r=e!=null?dc(fc(e)):{},gc(t||!e||!e.__esModule?ms(r,"default",{value:e,enumerable:!0}):r,e));var Xe=(e,t,r)=>mc(e,typeof t!="symbol"?t+"":t,r);var ca=gs((Ff,la)=>{var Lr=1e3,Or=Lr*60,Dr=Or*60,$r=Dr*24,kc=$r*7,$c=$r*365.25;la.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return xc(e);if(r==="number"&&isFinite(e))return t.long?Ac(e):Sc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function xc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*$c;case"weeks":case"week":case"w":return r*kc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Dr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Or;case"seconds":case"second":case"secs":case"sec":case"s":return r*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Sc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Dr?Math.round(e/Dr)+"h":t>=Or?Math.round(e/Or)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function Ac(e){var t=Math.abs(e);return t>=$r?En(e,t,$r,"day"):t>=Dr?En(e,t,Dr,"hour"):t>=Or?En(e,t,Or,"minute"):t>=Lr?En(e,t,Lr,"second"):e+" ms"}function En(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ua=gs((qf,da)=>{function Tc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=ca(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let y=0;y<f.length;y++)_=(_<<5)-_+f.charCodeAt(y),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,y=null,A,$;function T(...j){if(!T.enabled)return;let x=T,V=Number(new Date),J=V-(_||V);x.diff=J,x.prev=_,x.curr=V,_=V,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let z=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(S,P)=>{if(S==="%%")return"%";z++;let C=r.formatters[P];if(typeof C=="function"){let le=j[z];S=C.call(x,le),j.splice(z,1),z--}return S}),r.formatArgs.call(x,j),(x.log||r.log).apply(x,j)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(f)),$),set:j=>{y=j}}),typeof r.init=="function"&&r.init(T),T}function n(f,_){let y=r(this.namespace+(typeof _>"u"?":":_)+f);return y.log=this.log,y}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of _)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(f,_){let y=0,A=0,$=-1,T=0;for(;y<f.length;)if(A<_.length&&(_[A]===f[y]||_[A]==="*"))_[A]==="*"?($=A,T=y,A++):(y++,A++);else if($!==-1)A=$+1,T++,y=T;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}da.exports=Tc});var pa=gs((St,Cn)=>{St.formatArgs=Cc;St.save=Rc;St.load=Ic;St.useColors=Ec;St.storage=Lc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ec(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Cc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Cn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Rc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Ic(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Lc(){try{return localStorage}catch{}}Cn.exports=ua()(St);var{formatters:Oc}=Cn.exports;Oc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,Tn=Yr.trustedTypes,Vo=Tn?Tn.createPolicy("lit-html",{createHTML:e=>e}):void 0,ea="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ta="?"+ir,bc=`<${ta}>`,vr=document,Vr=()=>vr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",$s=Array.isArray,yc=e=>$s(e)||typeof e?.[Symbol.iterator]=="function",hs=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ko=/-->/g,Zo=/>/g,br=RegExp(`>|${hs}(?:([^\\s"'>=/]+)(${hs}*=${hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xo=/'/g,Qo=/"/g,ra=/^(?:script|style|textarea|title)$/i,xs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=xs(1),Qt=xs(2),If=xs(3),wr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),Jo=new WeakMap,yr=vr.createTreeWalker(vr,129);function na(e,t){if(!$s(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vo!==void 0?Vo.createHTML(t):t}var vc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let l=0;l<r;l++){let c=e[l],u,f,_=-1,y=0;for(;y<c.length&&(a.lastIndex=y,f=a.exec(c),f!==null);)y=a.lastIndex,a===Gr?f[1]==="!--"?a=Ko:f[1]!==void 0?a=Zo:f[2]!==void 0?(ra.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Gr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?Qo:Xo):a===Qo||a===Xo?a=br:a===Ko||a===Zo?a=Gr:(a=br,s=void 0);let A=a===br&&e[l+1].startsWith("/>")?" ":"";o+=a===Gr?c+bc:_>=0?(n.push(u),c.slice(0,_)+ea+c.slice(_)+ir+A):c+ir+(_===-2?l:A)}return[na(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=vc(t,r);if(this.el=e.createElement(u,n),yr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=yr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ea)){let y=f[a++],A=s.getAttribute(_).split(ir),$=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?ys:$[1]==="?"?vs:$[1]==="@"?ws:Ir}),s.removeAttribute(_)}else _.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(ra.test(s.tagName)){let _=s.textContent.split(ir),y=_.length-1;if(y>0){s.textContent=Tn?Tn.emptyScript:"";for(let A=0;A<y;A++)s.append(_[A],Vr()),yr.nextNode(),c.push({type:2,index:++o});s.append(_[y],Vr())}}}else if(s.nodeType===8)if(s.data===ta)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)c.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=vr.createElement("template");return n.innerHTML=t,n}};function Rr(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Rr(e,s._$AS(e,t.values),s,n)),t}var bs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??vr).importNode(r,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Xr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new ks(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Rr(this,t,r),Kr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(na(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Jo.get(t.strings);return r===void 0&&Jo.set(t.strings,r=new Zr(t)),r}k(t){$s(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Rr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Rr(this,l[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Kr(u)||u!==this._$AH[c]),u===dt?t=dt:t!==dt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ys=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},vs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},ws=class extends Ir{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Rr(this,t,r,0)??dt)===wr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ks=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}};var wc=Yr.litHtmlPolyfillSupport;wc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Tt="today",Wt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Lt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function sa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function aa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ia(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var fa=hc(pa(),1);function it(e){return(0,fa.default)(`beads-ui:${e}`)}function Pt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ga(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ha(e,t){let r=Pt(e.updated_at),n=Pt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ba(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Pt(e.created_at),o=Pt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ya(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Dc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function _a(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ma(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Dc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function va(e,t){let r=_a(e),n=_a(t);if(r!==n)return r<n?-1:1;let s=ma(e),o=ma(t);if(s!==o)return s<o?-1:1;let a=Pt(e&&e.created_at),l=Pt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ss=2**20;function Mr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Pt(e&&e.created_at)}function Rn(e){return(t,r)=>{let n=Mr(t,e),s=Mr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function As(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:Mr(l,r)-Ss};if(!l)return{rank:Mr(a,r)+Ss};let c=Mr(a,r),u=Mr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,y)=>({bead_id:_.id,rank:y*Ss}))}}function Ts(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||xr;function u(){for(let y of Array.from(a))try{y()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(y){if(l||!y||y.id!==e)return;let A=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,A),!(A<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(y.issues)?y.issues:[];for(let T of $)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=A,u();return}if(y.type==="upsert"){let $=y.issue;if($&&typeof $.id=="string"&&$.id.length>0){let T=n.get($.id);if(!T)n.set($.id,$);else{let j=Number.isFinite(T.updated_at)?T.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=x){for(let V of Object.keys(T))V in $||delete T[V];for(let[V,J]of Object.entries($))T[V]=J}}f()}o=A,u()}else if(y.type==="delete"){let $=String(y.issue_id||"");$&&(n.delete($),f()),o=A,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function In(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function wa(e){let t=it("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],y=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(u)){let $=r.get(A);if(!$)continue;let T=$.itemsById;for(let j of f)typeof j=="string"&&j.length>0&&T.set(j,!0);for(let j of _)typeof j=="string"&&j.length>0&&T.set(j,!0);for(let j of y)typeof j=="string"&&j.length>0&&T.delete(j)}}async function o(l,c){let u=In(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==u){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(_){let y=r.get(l)||null;if(y){let A=n.get(y.key);A&&(A.delete(l),A.size===0&&n.delete(y.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let y=n.get(_.key);y&&(y.delete(l),y.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:In,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function ka(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?In(u):"",y=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,y),A&&y&&_&&y!==_){let $=t.get(c);if($)try{$.dispose()}catch{}let T=s.get(c);if(T){try{T()}catch{}s.delete(c)}let j=Ts(c,f);t.set(c,j);let x=j.subscribe(()=>o());s.set(c,x)}else if(!A){let $=Ts(c,f);t.set(c,$);let T=$.subscribe(()=>o());s.set(c,T)}return r.set(c,_),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function $a(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function xa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Es(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Mc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Pc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Sa(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Mc(n),a=Pc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Es(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Es(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Nc=Object.freeze({workspace_config:{default_workspace:null}});function Aa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Nc.workspace_config.default_workspace}}}function Ta(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Aa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Aa(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ea(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,y)=>{let A=s++,$=Date.now();n.set(A,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",A,_,r+1),a();let T=!1,j=()=>{T||(T=!0,n.delete(A),l())},x=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-$),j())},3e4);try{let V=await u(_,y),J=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,_,J),V}catch(V){let J=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,J,V),V}finally{clearTimeout(x),j()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function Q(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}var Cs=new Set;function Ca(e,t,r="info",n=2800){if(typeof e!="string"||e.length===0)return!1;let s=`beads-ui.toast.${e}`;if(Cs.has(s))return!1;try{if(window.sessionStorage.getItem(s)==="1")return Cs.add(s),!1;window.sessionStorage.setItem(s,"1")}catch{}return Cs.add(s),Q(t,r,n),!0}function Ln(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ya),c;switch(l){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(ga),c;case"updated_desc":return c.sort(ha),c;case"priority":return c.sort(ba),c;case"manual":default:{let u=r();return u?c.sort(Rn(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Jt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function At(e){let t=Jt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Et(e,t){let r=Jt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function On(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Jt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Dn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(As(l,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let y={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(y);let A=n(As(l,c,y.order),a);s(y,A);let $=await t("ui-order-set",{expected_revision:y.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Mn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Rs(e,t){return!t||typeof e!="string"||e.length===0||Mn(t.visible_labels).includes(e)?!0:Mn(t.hidden_labels).includes(e)?!1:!Mn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Pn(e,t){return Mn(e).filter(r=>Rs(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Fc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ia={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ra={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},qc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Bc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function La(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Uc(e){if(!e||e.fill==="none"||!e.approval_state)return La(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function jc(e,t,r){let n=Fc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=qc[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Ia[e]||e}
      </div>
    </div>
  `}function Nn(e,t){if(!e||!e.stages)return"";let r=Ra[e.route]||Ra.spec_backed,n=e.stages,s=Bc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ia[a]||a} ${a==="plan"?Uc(n[a]||{}):La(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>jc(a,n[a]||{},a===s))}
    </div>
  `}function zc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Oa=2;function Hc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Oa).join(", "),s=r.length-Oa,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Wc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Pn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...Hc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Gc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Yc(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${At(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${At(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Vc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(va):r.children;return i`
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
        ${Yc(e)}
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
                  <span class=${Gc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Fn(e,t){let r=zc(e.priority);return i`
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
      ${Wc(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Nn(e.workflow,e.status):""}
      ${Vc(e,t)}
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
              ${Wt.map(o=>i`<option
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
        ${e.items.map(o=>Fn(o,t))}
      </div>
    </section>
  `}function Da(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Fn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Kc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Zc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Xc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Qc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Ma(e,t,r){return i`
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
        ${Kc.map(n=>i`<option
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
        ${Zc.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Qc(e,t,r)}
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
        ${Xc.map(n=>i`<option
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
  `}var Jc=200,ed={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},td=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Pa="beads-ui.board.sort",Na=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function rd(){try{let e=window.localStorage.getItem(Pa);if(e&&Na.has(e))return e}catch{}return"created_desc"}function Fa(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Tt,y=s?Ln(s,a):null,A=Dn({transport:o,uiOrderStore:a}),$=[],T=[],j=[],x=[],V=[],J=[],z=!1,O=0,S=rd(),P=new Map,C=new Map,le=new Map,be=new Set,se={search:"",priority:"",type:"",labels:[]},_e=!1,Pe=null;function tt(I){return String(I.status||"open")==="open"}function Ve(I){let Z=String(I.status||"open");return Z==="open"||Z==="blocked"}function Ce(I){let Z=se.search.trim().toLowerCase(),oe=se.priority,ue=se.type,$e=se.labels;return I.filter(Te=>{if(Z){let We=String(Te.id||"").toLowerCase(),Je=String(Te.title||"").toLowerCase();if(!We.includes(Z)&&!Je.includes(Z))return!1}if(oe!==""&&String(Te.priority)!==oe||ue!==""&&String(Te.issue_type||"")!==ue)return!1;if($e.length>0){let We=Array.isArray(Te.labels)?Te.labels:[];if(!$e.some(Je=>We.includes(Je)))return!1}return!0})}function Ke(){let I=new Set;for(let Z of[$,T,j,x,V,J])for(let oe of Z){let ue=Array.isArray(oe.labels)?oe.labels:[];for(let $e of ue)typeof $e=="string"&&$e.length>0&&I.add($e)}return Array.from(I).sort()}function ye(){return se.search.trim()!==""||se.priority!==""||se.type!==""||se.labels.length>0}function pe(){try{if(y){let I=y.selectBoardColumn("tab:board:in-progress","in_progress",S),Z=y.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ve),oe=new Set(I.map(Ae=>Ae.id)),ue=y.selectBoardColumn("tab:board:ready","ready",S).filter(Ae=>tt(Ae)&&!oe.has(Ae.id)),$e=y.selectBoardColumn("tab:board:resolved","resolved",S),Te=y.selectBoardColumn("tab:board:deferred","deferred",S),We=y.selectBoardColumn("tab:board:closed","closed").slice(0,Jc),Je=[...Z,...ue,...I,...$e,...We];ve(Je);let Se=new Set;for(let Ae of Je)Ae&&Ae.id&&!Is(Ae)&&Se.add(Ae.id);let Ge=!ye();$=Ge?Qr(Z,Se):Z,T=Ge?Qr(ue,Se):ue,j=Ge?Qr(I,Se):I,x=Ge?Qr($e,Se):$e,V=Te,O=Te.length,J=Ge?Qr(We,Se):We,P=new Map;for(let Ae of $)P.set(Ae.id,"open");for(let Ae of T)P.set(Ae.id,"open");for(let Ae of j)P.set(Ae.id,"in_progress");for(let Ae of x)P.set(Ae.id,"resolved");for(let Ae of V)P.set(Ae.id,"deferred");for(let Ae of J)P.set(Ae.id,"closed");C=new Map;for(let Ae of $)C.set(Ae.id,"blocked-col");for(let Ae of T)C.set(Ae.id,"ready-col");for(let Ae of j)C.set(Ae.id,"in-progress-col");for(let Ae of x)C.set(Ae.id,"resolved-col");for(let Ae of J)C.set(Ae.id,"closed-col")}Be()}catch{$=[],T=[],j=[],x=[],V=[],J=[],le=new Map,Be()}}function ve(I){let Z=new Map;for(let ue of I)ue&&ue.id&&!Z.has(ue.id)&&Z.set(ue.id,ue);let oe=new Map;for(let ue of Z.values()){let $e=Is(ue);if(!$e)continue;let Te=oe.get($e);Te||(Te=[],oe.set($e,Te)),Te.push({id:ue.id,title:ue.title,status:ue.status,metadata:ue.metadata,created_at:ue.created_at,updated_at:ue.updated_at})}le=oe}function ce(I){let Z=le.get(I)||[],oe=0;for(let $e of Z)($e.status==="resolved"||$e.status==="closed")&&(oe+=1);let ue=On(Z);return{total:Z.length,count:oe,current:ue,children:Z}}function K(I){return!be.has(I)}function G(I,Z){I.preventDefault(),I.stopPropagation(),be.has(Z)?be.delete(Z):be.add(Z),Be()}function fe(I,Z){I.preventDefault(),I.stopPropagation(),n(Z)}function X(I,Z){I.preventDefault(),I.stopPropagation(),n(Z)}function ke(I,Z){Pe||n(Z)}function B(I,Z){I.preventDefault(),I.stopPropagation(),nd(Z).then(oe=>{oe&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function N(I,Z){Pe=Z,I.dataTransfer&&(I.dataTransfer.setData("text/plain",Z),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function ie(I){I.target.classList.remove("board-card--dragging"),Rt(),setTimeout(()=>{Pe=null},0)}function Fe(I){let Z=String(I.target.value||"");!Z||Z===_||(_=Z,u&&u(Z),Be())}function me(){return l?l.get():null}function Oe(I){let Z=c?c.get():null,oe=Z?Z.cleanup_failed:null;if(!oe||typeof oe!="object"||Array.isArray(oe))return null;let ue=oe[I];return!ue||typeof ue!="object"||Array.isArray(ue)?null:ue}let Ee={onCardClick:ke,onCopyId:B,onDragStart:N,onDragEnd:ie,onClosedRangeChange:Fe,rollupFor:ce,isExpanded:K,onRollupToggle:G,onChildClick:fe,onFromChipClick:X,cleanupFailureFor:Oe,get policy(){return me()}};function Ze(I,Z){Pe||(q(),n(Z))}function Re(I,Z){I.preventDefault(),I.stopPropagation(),q(),n(Z)}let Qe={...Ee,onCardClick:Ze,onChildClick:Re,onFromChipClick:Re,get policy(){return me()}};function D(I){let Z=I.target,oe=e.querySelector(".board-filter__labels");Z&&oe&&oe.contains(Z)||L()}function U(I){I.key==="Escape"&&L()}function h(){_e||(_e=!0,document.addEventListener("mousedown",D),document.addEventListener("keydown",U),Be())}function L(){_e&&(_e=!1,document.removeEventListener("mousedown",D),document.removeEventListener("keydown",U),Be())}function M(I){I.key==="Escape"&&q()}function H(){z||(z=!0,document.addEventListener("keydown",M),Be())}function q(){z&&(z=!1,document.removeEventListener("keydown",M),Be())}let ge={onClose:q,onOverlayClick(I){I.target===I.currentTarget&&q()}},we={onSearchInput(I){se.search=String(I.target.value||""),pe()},onPriorityChange(I){se.priority=String(I.target.value||""),pe()},onTypeChange(I){se.type=String(I.target.value||""),pe()},onSortChange(I){let Z=String(I.target.value||"");if(!(!Na.has(Z)||Z===S)){S=Z;try{window.localStorage.setItem(Pa,Z)}catch{}pe()}},onDeferredToggle(){z?q():H()},onLabelMenuToggle(){_e?L():h()},onLabelToggle(I){let Z=se.labels.indexOf(I);Z===-1?se.labels.push(I):se.labels.splice(Z,1),pe()},onLabelClear(){se.labels.length!==0&&(se.labels=[],pe())},onNewIssue(){f&&f()}};function Ie(){return i`
      <div class="board-view">
        ${Ma(se,we,{sort_mode:S,deferred_popup_open:z,deferred_count:O,label_options:Ke(),label_menu_open:_e})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:Ce($)},Ee)}
          ${Pr({title:"Ready",id:"ready-col",items:Ce(T)},Ee)}
          ${Pr({title:"In progress",id:"in-progress-col",items:Ce(j)},Ee)}
          ${Pr({title:"Resolved",id:"resolved-col",items:Ce(x)},Ee)}
          ${Pr({title:"Closed",id:"closed-col",items:Ce(J),is_closed:!0,closed_range:_},Ee)}
        </div>
        ${z?Da({items:Ce(V),count:O},Qe,ge):""}
      </div>
    `}function Be(){qe(Ie(),e),pt()}function pt(){try{let I=e.querySelector("#deferred-popup");I&&!I.open&&(typeof I.showModal=="function"?I.showModal():I.setAttribute("open",""));let Z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let oe of Z)Array.from(oe.querySelectorAll(".board-card")).forEach(($e,Te)=>{$e.tabIndex=Te===0?0:-1})}catch{}}async function rt(I,Z){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:Z}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){r("update-status failed: %o",oe),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function at(I){switch(I){case"blocked-col":return $;case"ready-col":return T;case"in-progress-col":return j;case"resolved-col":return x;default:return[]}}function mt(I,Z,oe){if(!o||!a)return;let ue=at(I),$e=ue.find(Ge=>Ge.id===Z);if(!$e)return;let Te=ue.filter(Ge=>Ge.id!==Z),We=oe.closest?oe.closest(".board-card"):null,Je=Te.length;if(We){let Ge=We.getAttribute("data-issue-id");if(Ge===Z)return;let Ae=Te.findIndex(ut=>ut.id===Ge);Ae>=0&&(Je=Ae)}let Se=Te.slice();Se.splice(Je,0,$e),A.applyReorder(Z,Se,Je)}function Rt(){for(let I of Array.from(e.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let nt=null;e.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let oe=I.target.closest(".board-column");oe&&oe!==nt&&(nt&&nt.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),nt=oe)}),e.addEventListener("dragleave",I=>{let Z=I.relatedTarget;(!Z||!e.contains(Z))&&nt&&(nt.classList.remove("board-column--drag-over"),nt=null)}),e.addEventListener("drop",I=>{I.preventDefault(),nt&&(nt.classList.remove("board-column--drag-over"),nt=null);let Z=I.target,oe=Z.closest(".board-column");if(!oe)return;let ue=I.dataTransfer?.getData("text/plain")||"";if(!ue)return;let $e=oe.id,Te=C.get(ue);if(Te&&Te===$e){if(td.has($e)){if(S!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}mt($e,ue,Z)}return}let We=ed[$e];if(!We){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}P.get(ue)!==We&&rt(ue,We)}),e.addEventListener("keydown",I=>{let Z=I.target;if(!(Z instanceof HTMLElement))return;let oe=String(Z.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||Z.isContentEditable===!0)return;let ue=Z.closest(".board-card");if(!ue)return;let $e=String(I.key||"");if($e==="Enter"||$e===" "){I.preventDefault();let Se=ue.getAttribute("data-issue-id");Se&&n(Se);return}if($e!=="ArrowUp"&&$e!=="ArrowDown"&&$e!=="ArrowLeft"&&$e!=="ArrowRight")return;I.preventDefault();let Te=ue.closest(".board-column");if(!Te)return;let We=Array.from(Te.querySelectorAll(".board-card")),Je=We.indexOf(ue);if($e==="ArrowDown"&&Je<We.length-1){lt(ue,We[Je+1]);return}if($e==="ArrowUp"&&Je>0){lt(ue,We[Je-1]);return}if($e==="ArrowLeft"||$e==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),Ge=Se.indexOf(Te),Ae=$e==="ArrowRight"?1:-1,ut=Ge+Ae;for(;ut>=0&&ut<Se.length;){let yt=Se[ut].querySelector(".board-card");if(yt){lt(ue,yt);return}ut+=Ae}}});function lt(I,Z){try{I.tabIndex=-1,Z.tabIndex=0,Z.focus()}catch{}}let st=null;y&&y.subscribe&&(st=y.subscribe(()=>{try{pe()}catch{}}));let ct=null;l&&l.subscribe&&(ct=l.subscribe(()=>{try{pe()}catch{}}));let bt=null;return c&&c.subscribe&&(bt=c.subscribe(()=>{Be()})),{async load(){r("load"),pe()},clear(){L(),q(),st&&(st(),st=null),ct&&(ct(),ct=null),bt&&(bt(),bt=null),e.replaceChildren(),$=[],T=[],j=[],x=[],V=[],J=[],P=new Map,C=new Map}}}function Is(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Is(r);return!(n&&t.has(n))})}async function nd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Gt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function sd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Gt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Gt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Yt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await sd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var za="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var er=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...er,"reasoning_output_tokens"],od=["implementation","review-consult"];function Ls(e){let t=0;for(let r of er)t+=_t(e?.[r]);return t}function ad(e){return!e||typeof e!="object"?!1:er.some(t=>Number.isFinite(e[t]))}function qa(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function id(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ba(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ua(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):Ls(t)}function ld(e){return e==="claude"?"Claude":"Codex"}function cd(e){return`\u03C4 ${Ha(e)}`}function dd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(za),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${ld(r)} ${cd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:dd(r,n)})}return t}function Bn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of Jr)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=_t(l.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Os(e){return!e||typeof e!="object"?null:Ot({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function ud(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:id(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function qn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ja(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ha(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Nr(e){return ad(e)?`\u03C4 ${Ha(Ls(e))}`:null}function Nt(e){let t=Nr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Fr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ls(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(za),r.join(`
`)}function Ot(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(qa(c)){let f=ud(l.runner),_=Ba(c),y={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Ua(f,_)};_.replayed===!0&&(y.replayed=!0),typeof l.model=="string"&&(y.model=l.model),typeof l.session_id=="string"&&(y.session_id=l.session_id),qn(r[f],y,!0),qn(n.orchestrator[f],y,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!od.includes(f.role)||!qa(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let y=Ba(f.usage),A={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:y,subtotal:Ua("codex",y)};A.receipt_id=_,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),y.replayed===!0&&(A.replayed=!0),qn(r.codex,A,!1),qn(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=ja(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...ja(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Ja,setPrototypeOf:Wa,isFrozen:pd,getPrototypeOf:fd,getOwnPropertyDescriptor:_d}=Object,{freeze:kt,seal:Dt,create:Bs}=Object,{apply:Us,construct:js}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Dt||(Dt=function(t){return t});Us||(Us=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});js||(js=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Un=$t(Array.prototype.forEach),md=$t(Array.prototype.lastIndexOf),Ga=$t(Array.prototype.pop),en=$t(Array.prototype.push),gd=$t(Array.prototype.splice),zn=$t(String.prototype.toLowerCase),Ds=$t(String.prototype.toString),Ms=$t(String.prototype.match),tn=$t(String.prototype.replace),hd=$t(String.prototype.indexOf),bd=$t(String.prototype.trim),Ft=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),rn=yd(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Us(e,t,n)}}function yd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return js(e,r)}}function Ne(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zn;Wa&&Wa(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(pd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function vd(e){for(let t=0;t<e.length;t++)Ft(e,t)||(e[t]=null);return e}function tr(e){let t=Bs(null);for(let[r,n]of Ja(e))Ft(e,r)&&(Array.isArray(n)?t[r]=vd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=tr(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=_d(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=fd(e)}function r(){return null}return r}var Ya=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ps=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ns=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),wd=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fs=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),kd=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Va=kt(["#text"]),Ka=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qs=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Za=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),jn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$d=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),xd=Dt(/<%[\w\W]*|[\w\W]*%>/gm),Sd=Dt(/\$\{[\w\W]*/gm),Ad=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Td=Dt(/^aria-[\-\w]+$/),ei=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ed=Dt(/^(?:\w+script|data):/i),Cd=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ti=Dt(/^html$/i),Rd=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),Xa=Object.freeze({__proto__:null,ARIA_ATTR:Td,ATTR_WHITESPACE:Cd,CUSTOM_ELEMENT:Rd,DATA_ATTR:Ad,DOCTYPE_NAME:ti,ERB_EXPR:xd,IS_ALLOWED_URI:ei,IS_SCRIPT_OR_DATA:Ed,MUSTACHE_EXPR:$d,TMPLIT_EXPR:Sd}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Id=function(){return typeof window>"u"?null:window},Ld=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Qa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ri(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Id(),t=ae=>ri(ae);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:y,trustedTypes:A}=e,$=c.prototype,T=nn($,"cloneNode"),j=nn($,"remove"),x=nn($,"nextSibling"),V=nn($,"childNodes"),J=nn($,"parentNode");if(typeof a=="function"){let ae=r.createElement("template");ae.content&&ae.content.ownerDocument&&(r=ae.content.ownerDocument)}let z,O="",{implementation:S,createNodeIterator:P,createDocumentFragment:C,getElementsByTagName:le}=r,{importNode:be}=n,se=Qa();t.isSupported=typeof Ja=="function"&&typeof J=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:Pe,TMPLIT_EXPR:tt,DATA_ATTR:Ve,ARIA_ATTR:Ce,IS_SCRIPT_OR_DATA:Ke,ATTR_WHITESPACE:ye,CUSTOM_ELEMENT:pe}=Xa,{IS_ALLOWED_URI:ve}=Xa,ce=null,K=Ne({},[...Ya,...Ps,...Ns,...Fs,...Va]),G=null,fe=Ne({},[...Ka,...qs,...Za,...jn]),X=Object.seal(Bs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,B=null,N=Object.seal(Bs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,Fe=!0,me=!1,Oe=!0,Ee=!1,Ze=!0,Re=!1,Qe=!1,D=!1,U=!1,h=!1,L=!1,M=!0,H=!1,q="user-content-",ge=!0,we=!1,Ie={},Be=null,pt=Ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),rt=null,at=Ne({},["audio","video","img","source","image","track"]),mt=null,Rt=Ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",ct=st,bt=!1,I=null,Z=Ne({},[nt,lt,st],Ds),oe=Ne({},["mi","mo","mn","ms","mtext"]),ue=Ne({},["annotation-xml"]),$e=Ne({},["title","style","font","a","script"]),Te=null,We=["application/xhtml+xml","text/html"],Je="text/html",Se=null,Ge=null,Ae=r.createElement("form"),ut=function(w){return w instanceof RegExp||w instanceof Function},yt=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ge&&Ge===w)){if((!w||typeof w!="object")&&(w={}),w=tr(w),Te=We.indexOf(w.PARSER_MEDIA_TYPE)===-1?Je:w.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?Ds:zn,ce=Ft(w,"ALLOWED_TAGS")?Ne({},w.ALLOWED_TAGS,Se):K,G=Ft(w,"ALLOWED_ATTR")?Ne({},w.ALLOWED_ATTR,Se):fe,I=Ft(w,"ALLOWED_NAMESPACES")?Ne({},w.ALLOWED_NAMESPACES,Ds):Z,mt=Ft(w,"ADD_URI_SAFE_ATTR")?Ne(tr(Rt),w.ADD_URI_SAFE_ATTR,Se):Rt,rt=Ft(w,"ADD_DATA_URI_TAGS")?Ne(tr(at),w.ADD_DATA_URI_TAGS,Se):at,Be=Ft(w,"FORBID_CONTENTS")?Ne({},w.FORBID_CONTENTS,Se):pt,ke=Ft(w,"FORBID_TAGS")?Ne({},w.FORBID_TAGS,Se):tr({}),B=Ft(w,"FORBID_ATTR")?Ne({},w.FORBID_ATTR,Se):tr({}),Ie=Ft(w,"USE_PROFILES")?w.USE_PROFILES:!1,ie=w.ALLOW_ARIA_ATTR!==!1,Fe=w.ALLOW_DATA_ATTR!==!1,me=w.ALLOW_UNKNOWN_PROTOCOLS||!1,Oe=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=w.SAFE_FOR_TEMPLATES||!1,Ze=w.SAFE_FOR_XML!==!1,Re=w.WHOLE_DOCUMENT||!1,U=w.RETURN_DOM||!1,h=w.RETURN_DOM_FRAGMENT||!1,L=w.RETURN_TRUSTED_TYPE||!1,D=w.FORCE_BODY||!1,M=w.SANITIZE_DOM!==!1,H=w.SANITIZE_NAMED_PROPS||!1,ge=w.KEEP_CONTENT!==!1,we=w.IN_PLACE||!1,ve=w.ALLOWED_URI_REGEXP||ei,ct=w.NAMESPACE||st,oe=w.MATHML_TEXT_INTEGRATION_POINTS||oe,ue=w.HTML_INTEGRATION_POINTS||ue,X=w.CUSTOM_ELEMENT_HANDLING||{},w.CUSTOM_ELEMENT_HANDLING&&ut(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(X.tagNameCheck=w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),w.CUSTOM_ELEMENT_HANDLING&&ut(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(X.attributeNameCheck=w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),w.CUSTOM_ELEMENT_HANDLING&&typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(X.allowCustomizedBuiltInElements=w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(Fe=!1),h&&(U=!0),Ie&&(ce=Ne({},Va),G=[],Ie.html===!0&&(Ne(ce,Ya),Ne(G,Ka)),Ie.svg===!0&&(Ne(ce,Ps),Ne(G,qs),Ne(G,jn)),Ie.svgFilters===!0&&(Ne(ce,Ns),Ne(G,qs),Ne(G,jn)),Ie.mathMl===!0&&(Ne(ce,Fs),Ne(G,Za),Ne(G,jn))),w.ADD_TAGS&&(typeof w.ADD_TAGS=="function"?N.tagCheck=w.ADD_TAGS:(ce===K&&(ce=tr(ce)),Ne(ce,w.ADD_TAGS,Se))),w.ADD_ATTR&&(typeof w.ADD_ATTR=="function"?N.attributeCheck=w.ADD_ATTR:(G===fe&&(G=tr(G)),Ne(G,w.ADD_ATTR,Se))),w.ADD_URI_SAFE_ATTR&&Ne(mt,w.ADD_URI_SAFE_ATTR,Se),w.FORBID_CONTENTS&&(Be===pt&&(Be=tr(Be)),Ne(Be,w.FORBID_CONTENTS,Se)),ge&&(ce["#text"]=!0),Re&&Ne(ce,["html","head","body"]),ce.table&&(Ne(ce,["tbody"]),delete ke.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');z=w.TRUSTED_TYPES_POLICY,O=z.createHTML("")}else z===void 0&&(z=Ld(A,s)),z!==null&&typeof O=="string"&&(O=z.createHTML(""));kt&&kt(w),Ge=w}},Ut=Ne({},[...Ps,...Ns,...wd]),Zt=Ne({},[...Fs,...kd]),jt=function(w){let W=J(w);(!W||!W.tagName)&&(W={namespaceURI:ct,tagName:"template"});let ne=zn(w.tagName),Le=zn(W.tagName);return I[w.namespaceURI]?w.namespaceURI===lt?W.namespaceURI===st?ne==="svg":W.namespaceURI===nt?ne==="svg"&&(Le==="annotation-xml"||oe[Le]):!!Ut[ne]:w.namespaceURI===nt?W.namespaceURI===st?ne==="math":W.namespaceURI===lt?ne==="math"&&ue[Le]:!!Zt[ne]:w.namespaceURI===st?W.namespaceURI===lt&&!ue[Le]||W.namespaceURI===nt&&!oe[Le]?!1:!Zt[ne]&&($e[ne]||!Ut[ne]):!!(Te==="application/xhtml+xml"&&I[w.namespaceURI]):!1},p=function(w){en(t.removed,{element:w});try{J(w).removeChild(w)}catch{j(w)}},k=function(w,W){try{en(t.removed,{attribute:W.getAttributeNode(w),from:W})}catch{en(t.removed,{attribute:null,from:W})}if(W.removeAttribute(w),w==="is")if(U||h)try{p(W)}catch{}else try{W.setAttribute(w,"")}catch{}},E=function(w){let W=null,ne=null;if(D)w="<remove></remove>"+w;else{let je=Ms(w,/^[\r\n\t ]+/);ne=je&&je[0]}Te==="application/xhtml+xml"&&ct===st&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");let Le=z?z.createHTML(w):w;if(ct===st)try{W=new y().parseFromString(Le,Te)}catch{}if(!W||!W.documentElement){W=S.createDocument(ct,"template",null);try{W.documentElement.innerHTML=bt?O:Le}catch{}}let et=W.body||W.documentElement;return w&&ne&&et.insertBefore(r.createTextNode(ne),et.childNodes[0]||null),ct===st?le.call(W,Re?"html":"body")[0]:Re?W.documentElement:et},ee=function(w){return P.call(w.ownerDocument||w,w,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},de=function(w){return w instanceof _&&(typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||!(w.attributes instanceof f)||typeof w.removeAttribute!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function")},he=function(w){return typeof l=="function"&&w instanceof l};function Y(ae,w,W){Un(ae,ne=>{ne.call(t,w,W,Ge)})}let De=function(w){let W=null;if(Y(se.beforeSanitizeElements,w,null),de(w))return p(w),!0;let ne=Se(w.nodeName);if(Y(se.uponSanitizeElement,w,{tagName:ne,allowedTags:ce}),Ze&&w.hasChildNodes()&&!he(w.firstElementChild)&&wt(/<[/\w!]/g,w.innerHTML)&&wt(/<[/\w!]/g,w.textContent)||w.nodeType===sn.progressingInstruction||Ze&&w.nodeType===sn.comment&&wt(/<[/\w]/g,w.data))return p(w),!0;if(!(N.tagCheck instanceof Function&&N.tagCheck(ne))&&(!ce[ne]||ke[ne])){if(!ke[ne]&&ot(ne)&&(X.tagNameCheck instanceof RegExp&&wt(X.tagNameCheck,ne)||X.tagNameCheck instanceof Function&&X.tagNameCheck(ne)))return!1;if(ge&&!Be[ne]){let Le=J(w)||w.parentNode,et=V(w)||w.childNodes;if(et&&Le){let je=et.length;for(let m=je-1;m>=0;--m){let d=T(et[m],!0);d.__removalCount=(w.__removalCount||0)+1,Le.insertBefore(d,x(w))}}}return p(w),!0}return w instanceof c&&!jt(w)||(ne==="noscript"||ne==="noembed"||ne==="noframes")&&wt(/<\/no(script|embed|frames)/i,w.innerHTML)?(p(w),!0):(Ee&&w.nodeType===sn.text&&(W=w.textContent,Un([_e,Pe,tt],Le=>{W=tn(W,Le," ")}),w.textContent!==W&&(en(t.removed,{element:w.cloneNode()}),w.textContent=W)),Y(se.afterSanitizeElements,w,null),!1)},Me=function(w,W,ne){if(M&&(W==="id"||W==="name")&&(ne in r||ne in Ae))return!1;if(!(Fe&&!B[W]&&wt(Ve,W))){if(!(ie&&wt(Ce,W))){if(!(N.attributeCheck instanceof Function&&N.attributeCheck(W,w))){if(!G[W]||B[W]){if(!(ot(w)&&(X.tagNameCheck instanceof RegExp&&wt(X.tagNameCheck,w)||X.tagNameCheck instanceof Function&&X.tagNameCheck(w))&&(X.attributeNameCheck instanceof RegExp&&wt(X.attributeNameCheck,W)||X.attributeNameCheck instanceof Function&&X.attributeNameCheck(W,w))||W==="is"&&X.allowCustomizedBuiltInElements&&(X.tagNameCheck instanceof RegExp&&wt(X.tagNameCheck,ne)||X.tagNameCheck instanceof Function&&X.tagNameCheck(ne))))return!1}else if(!mt[W]){if(!wt(ve,tn(ne,ye,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&w!=="script"&&hd(ne,"data:")===0&&rt[w])){if(!(me&&!wt(Ke,tn(ne,ye,"")))){if(ne)return!1}}}}}}}return!0},ot=function(w){return w!=="annotation-xml"&&Ms(w,pe)},vt=function(w){Y(se.beforeSanitizeAttributes,w,null);let{attributes:W}=w;if(!W||de(w))return;let ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:G,forceKeepAttr:void 0},Le=W.length;for(;Le--;){let et=W[Le],{name:je,namespaceURI:m,value:d}=et,v=Se(je),b=d,R=je==="value"?b:bd(b);if(ne.attrName=v,ne.attrValue=R,ne.keepAttr=!0,ne.forceKeepAttr=void 0,Y(se.uponSanitizeAttribute,w,ne),R=ne.attrValue,H&&(v==="id"||v==="name")&&(k(je,w),R=q+R),Ze&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,R)){k(je,w);continue}if(v==="attributename"&&Ms(R,"href")){k(je,w);continue}if(ne.forceKeepAttr)continue;if(!ne.keepAttr){k(je,w);continue}if(!Oe&&wt(/\/>/i,R)){k(je,w);continue}Ee&&Un([_e,Pe,tt],xe=>{R=tn(R,xe," ")});let te=Se(w.nodeName);if(!Me(te,v,R)){k(je,w);continue}if(z&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!m)switch(A.getAttributeType(te,v)){case"TrustedHTML":{R=z.createHTML(R);break}case"TrustedScriptURL":{R=z.createScriptURL(R);break}}if(R!==b)try{m?w.setAttributeNS(m,je,R):w.setAttribute(je,R),de(w)?p(w):Ga(t.removed)}catch{k(je,w)}}Y(se.afterSanitizeAttributes,w,null)},gt=function ae(w){let W=null,ne=ee(w);for(Y(se.beforeSanitizeShadowDOM,w,null);W=ne.nextNode();)Y(se.uponSanitizeShadowNode,W,null),De(W),vt(W),W.content instanceof o&&ae(W.content);Y(se.afterSanitizeShadowDOM,w,null)};return t.sanitize=function(ae){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,ne=null,Le=null,et=null;if(bt=!ae,bt&&(ae="<!-->"),typeof ae!="string"&&!he(ae))if(typeof ae.toString=="function"){if(ae=ae.toString(),typeof ae!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return ae;if(Qe||yt(w),t.removed=[],typeof ae=="string"&&(we=!1),we){if(ae.nodeName){let d=Se(ae.nodeName);if(!ce[d]||ke[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(ae instanceof l)W=E("<!---->"),ne=W.ownerDocument.importNode(ae,!0),ne.nodeType===sn.element&&ne.nodeName==="BODY"||ne.nodeName==="HTML"?W=ne:W.appendChild(ne);else{if(!U&&!Ee&&!Re&&ae.indexOf("<")===-1)return z&&L?z.createHTML(ae):ae;if(W=E(ae),!W)return U?null:L?O:""}W&&D&&p(W.firstChild);let je=ee(we?ae:W);for(;Le=je.nextNode();)De(Le),vt(Le),Le.content instanceof o&&gt(Le.content);if(we)return ae;if(U){if(h)for(et=C.call(W.ownerDocument);W.firstChild;)et.appendChild(W.firstChild);else et=W;return(G.shadowroot||G.shadowrootmode)&&(et=be.call(n,et,!0)),et}let m=Re?W.outerHTML:W.innerHTML;return Re&&ce["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&wt(ti,W.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+m),Ee&&Un([_e,Pe,tt],d=>{m=tn(m,d," ")}),z&&L?z.createHTML(m):m},t.setConfig=function(){let ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(ae),Qe=!0},t.clearConfig=function(){Ge=null,Qe=!1},t.isValidAttribute=function(ae,w,W){Ge||yt({});let ne=Se(ae),Le=Se(w);return Me(ne,Le,W)},t.addHook=function(ae,w){typeof w=="function"&&en(se[ae],w)},t.removeHook=function(ae,w){if(w!==void 0){let W=md(se[ae],w);return W===-1?void 0:gd(se[ae],W,1)[0]}return Ga(se[ae])},t.removeHooks=function(ae){se[ae]=[]},t.removeAllHooks=function(){se=Qa()},t}var ni=ri();var si={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},oi=e=>(...t)=>({_$litDirective$:e,values:t}),Hn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends Hn{constructor(t){if(super(t),this.it=dt,t.type!==si.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var ai=oi(on);function Gs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Gs();function fi(e){Tr=e}var dn={exec:()=>null};function ze(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(xt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Od=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Dd=/^(?:[ \t]*(?:\n|$))+/,Md=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Pd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Nd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ys=/(?:[*+-]|\d{1,9}[.)])/,_i=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,mi=ze(_i).replace(/bull/g,Ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fd=ze(_i).replace(/bull/g,Ys).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qd=/^[^\n]+/,Ks=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Bd=ze(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ks).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ud=ze(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ys).getRegex(),Zn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jd=ze("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Zs).replace("tag",Zn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),gi=ze(Vs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),zd=ze(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",gi).getRegex(),Xs={blockquote:zd,code:Md,def:Bd,fences:Pd,heading:Nd,hr:un,html:jd,lheading:mi,list:Ud,newline:Dd,paragraph:gi,table:dn,text:qd},ii=ze("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),Hd={...Xs,lheading:Fd,table:ii,paragraph:ze(Vs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ii).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex()},Wd={...Xs,html:ze(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Zs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ze(Vs).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",mi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Gd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Yd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,hi=/^( {2,}|\\)\n(?!\s*$)/,Vd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xn=/[\p{P}\p{S}]/u,Qs=/[\s\p{P}\p{S}]/u,bi=/[^\s\p{P}\p{S}]/u,Kd=ze(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qs).getRegex(),yi=/(?!~)[\p{P}\p{S}]/u,Zd=/(?!~)[\s\p{P}\p{S}]/u,Xd=/(?:[^\s\p{P}\p{S}]|~)/u,Qd=ze(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Od?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),vi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Jd=ze(vi,"u").replace(/punct/g,Xn).getRegex(),eu=ze(vi,"u").replace(/punct/g,yi).getRegex(),wi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tu=ze(wi,"gu").replace(/notPunctSpace/g,bi).replace(/punctSpace/g,Qs).replace(/punct/g,Xn).getRegex(),ru=ze(wi,"gu").replace(/notPunctSpace/g,Xd).replace(/punctSpace/g,Zd).replace(/punct/g,yi).getRegex(),nu=ze("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bi).replace(/punctSpace/g,Qs).replace(/punct/g,Xn).getRegex(),su=ze(/\\(punct)/,"gu").replace(/punct/g,Xn).getRegex(),ou=ze(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),au=ze(Zs).replace("(?:-->|$)","-->").getRegex(),iu=ze("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",au).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,lu=ze(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ki=ze(/^!?\[(label)\]\[(ref)\]/).replace("label",Yn).replace("ref",Ks).getRegex(),$i=ze(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ks).getRegex(),cu=ze("reflink|nolink(?!\\()","g").replace("reflink",ki).replace("nolink",$i).getRegex(),li=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Js={_backpedal:dn,anyPunctuation:su,autolink:ou,blockSkip:Qd,br:hi,code:Yd,del:dn,emStrongLDelim:Jd,emStrongRDelimAst:tu,emStrongRDelimUnd:nu,escape:Gd,link:lu,nolink:$i,punctuation:Kd,reflink:ki,reflinkSearch:cu,tag:iu,text:Vd,url:dn},du={...Js,link:ze(/^!?\[(label)\]\((.*?)\)/).replace("label",Yn).getRegex(),reflink:ze(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yn).getRegex()},zs={...Js,emStrongRDelimAst:ru,emStrongLDelim:eu,url:ze(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",li).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ze(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",li).getRegex()},uu={...zs,br:ze(hi).replace("{2,}","*").getRegex(),text:ze(zs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wn={normal:Xs,gfm:Hd,pedantic:Wd},an={normal:Js,gfm:zs,breaks:uu,pedantic:du},pu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ci=e=>pu[e];function rr(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,ci)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,ci);return e}function di(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function ui(e,t){let r=e.replace(xt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function fu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function pi(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function _u(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Vn=class{constructor(e){Xe(this,"options");Xe(this,"rules");Xe(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=_u(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let A=y,$=A.raw+`
`+r.join(`
`),T=this.blockquote($);o[o.length-1]=T,n=n.substring(0,n.length-A.raw.length)+T.raw,s=s.substring(0,s.length-A.text.length)+T.text;break}else if(y?.type==="list"){let A=y,$=A.raw+`
`+r.join(`
`),T=this.list($);o[o.length-1]=T,n=n.substring(0,n.length-y.raw.length)+T.raw,s=s.substring(0,s.length-A.raw.length)+T.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),y=e.split(`
`,1)[0],A=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),V=this.rules.other.headingBeginRegex($),J=this.rules.other.htmlBeginRegex($);for(;e;){let z=e.split(`
`,1)[0],O;if(y=z,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),O=y):O=y.replace(this.rules.other.tabCharGlobal,"    "),x.test(y)||V.test(y)||J.test(y)||T.test(y)||j.test(y))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!y.trim())f+=`
`+O.slice($);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(_)||V.test(_)||j.test(_))break;f+=`
`+y}!A&&!y.trim()&&(A=!0),u+=z+`
`,e=e.substring(z.length+1),_=O.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=ui(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ui(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=fu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),pi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return pi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let y=_.slice(2,-2);return{type:"strong",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},qt=class Hs{constructor(t){Xe(this,"tokens");Xe(this,"options");Xe(this,"state");Xe(this,"inlineQueue");Xe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Vn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Wn.normal,inline:an.normal};this.options.pedantic?(r.block=Wn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Wn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Wn,inline:an}}static lex(t,r){return new Hs(r).lex(t)}static lexInline(t,r){return new Hs(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),y;this.options.extensions.startInline.forEach(A=>{y=A.call({lexer:this},_),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Kn=class{constructor(e){Xe(this,"options");Xe(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=di(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=di(e);if(s===null)return rr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},eo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Bt=class Ws{constructor(t){Xe(this,"options");Xe(this,"renderer");Xe(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new eo}static parse(t,r){return new Ws(r).parse(t)}static parseInline(t,r){return new Ws(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Gn,cn=(Gn=class{constructor(e){Xe(this,"options");Xe(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?qt.lex:qt.lexInline}provideParser(){return this.block?Bt.parse:Bt.parseInline}},Xe(Gn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Xe(Gn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Gn),mu=class{constructor(...e){Xe(this,"defaults",Gs());Xe(this,"options",this.setOptions);Xe(this,"parse",this.parseMarkdown(!0));Xe(this,"parseInline",this.parseMarkdown(!1));Xe(this,"Parser",Bt);Xe(this,"Renderer",Kn);Xe(this,"TextRenderer",eo);Xe(this,"Lexer",qt);Xe(this,"Tokenizer",Vn);Xe(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Kn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Vn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,u);return c.call(s,_)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return qt.lex(e,t??this.defaults)}parser(e,t){return Bt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?qt.lex:qt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Bt.parse:Bt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?qt.lex:qt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Bt.parse:Bt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+rr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new mu;function Ye(e,t){return Ar.parse(e,t)}Ye.options=Ye.setOptions=function(e){return Ar.setOptions(e),Ye.defaults=Ar.defaults,fi(Ye.defaults),Ye};Ye.getDefaults=Gs;Ye.defaults=Tr;Ye.use=function(...e){return Ar.use(...e),Ye.defaults=Ar.defaults,fi(Ye.defaults),Ye};Ye.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Ye.parseInline=Ar.parseInline;Ye.Parser=Bt;Ye.parser=Bt.parse;Ye.Renderer=Kn;Ye.TextRenderer=eo;Ye.Lexer=qt;Ye.lexer=qt.lex;Ye.Tokenizer=Vn;Ye.Hooks=cn;Ye.parse=Ye;var em=Ye.options,tm=Ye.setOptions,rm=Ye.use,nm=Ye.walkTokens,sm=Ye.parseInline;var om=Bt.parse,am=qt.lex;function pr(e){let t=Ye.parse(e),r=ni.sanitize(t);return ai(r)}function nr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Qn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var gu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},hu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,bu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function to(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function xi(e,t){let r=to(e),n=to(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function yu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function vu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:gu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=to(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=xi(fr(l)?l.old_string:"",fr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Si(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ai(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=hu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:bu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function wu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ai(o.text));else if(o.type==="thinking"){let a=Si(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=vu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=yu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ku(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ai(t.text)];if(t.type==="reasoning"){let r=Si(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function $u(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ti(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!fr(o))continue;let a=$u(o)?ku(o):wu(o,r);for(let l of a)t.push(l)}return t}var xu=5,Su=10,Au=/Task\s+#(\d+)/,Tu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Eu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Jn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Cu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ru(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Iu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Au.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Lu(e){if(e.tool==="Bash"){let t=e.command||"";return Tu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Eu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ou(e){let t=e.filter(s=>s.kind==="tool").slice(-Su),r=new Map;t.forEach((s,o)=>{let a=Lu(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Du(e){let t=Ru(e);if(t)return{text:t,guess:!1};let r=Iu(e);if(r)return{text:r,guess:!1};let n=Ou(e);return n?{text:n,guess:!0}:null}function Mu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Et(e,t)}function es(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,u=new Set,f=null,_=null,y=!1,A=!1,$=!1,T=null,j=null;function x(){y=!1,A=!1,$=!1,T=null,j=null}async function V(B){if(r){A=!0,$=!1,ye();try{let N=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!N||typeof N!="object"||Array.isArray(N)?$=!0:(T=N,j=B)}catch{o===B&&($=!0)}finally{o===B&&(A=!1,ye())}}}function J(){if(y=!y,y&&o&&j!==o){V(o);return}ye()}function z(){if(!y)return"";let B=qr({loading:A,error:$});if(B)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!T)return"";if(T.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let N=Qn(T.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${N?i`<div class="prompt-block__meta">${N} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let B=n.get(o);return Ti(B?B.lines:[])}function S(){if(!o||!n)return null;let B=n.get(o),N=B?B.last_event_at:null;return typeof N=="number"?N:null}function P(){return a.status==="running"}function C(){if(P()&&o){_||(_=setInterval(()=>ye(),1e3));return}le()}function le(){_&&(clearInterval(_),_=null)}function be(B){let N=[],ie=0;for(;ie<B.length;){let Fe=B[ie];if(Fe.kind==="tool"){let me=ie;for(;me<B.length&&B[me].kind==="tool"&&B[me].tool===Fe.tool;)me+=1;if(me-ie>=xu&&!u.has(ie)){N.push({kind:"group",idx:ie,tool:Fe.tool||"",lines:B.slice(ie,me).map((Oe,Ee)=>({idx:ie+Ee,line:Oe}))}),ie=me;continue}}N.push({kind:"line",idx:ie,line:Fe}),ie+=1}return N}function se(B){for(let N=B.length-1;N>=0;N-=1){let ie=B[N];if(ie.kind==="result"||ie.kind==="error")return null;if(ie.kind==="tool"&&!Object.hasOwn(ie,"result"))return ie}return null}function _e(B){for(let N=B.length-1;N>=0;N-=1)if(B[N].kind==="thinking")return B[N];return null}function Pe(B,N){if(N.kind==="gate")return i`<div class="sv__gate">${N.text}</div>`;if(N.kind==="phase")return i`<div class="sv__phase">${N.text}</div>`;if(N.kind==="result")return i`<div
        class="sv__result${N.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${N.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(N.text||(N.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(N.kind==="thinking"){let ie=c.has(B);return i`<div
        class="sv__think${ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(B)}
      >
        <span class="sv__think-line">💭 ${Jn(N.text)}</span>
        ${ie?i`<pre class="sv__think-expand">${N.text}</pre>`:""}
      </div>`}if(N.kind==="error")return i`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="blocker")return i`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="tool"){let ie=c.has(B),Fe=N.tool==="Bash"?Cu(N.command):0,me=N.tool==="Bash"?Fe>1?Jn(N.command):N.command:N.path||N.command||"";return i`<div
        class="sv__tool${ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${N.icon}</span>
          <span class="sv__tool-name">${N.tool}</span>
          ${me?i`<span class="sv__tool-detail">${me}</span>`:""}
          ${Fe>1?i`<span class="sv__tool-more">⋯ ${Fe}줄</span>`:""}
          ${typeof N.added=="number"?i`<span class="sv__diff-add">+${N.added}</span>`:""}
          ${typeof N.removed=="number"?i`<span class="sv__diff-del">−${N.removed}</span>`:""}
          ${N.result?i`<span class="sv__tool-ok">→ ${N.result}</span>`:""}
        </span>
        ${ie?i`<pre class="sv__tool-expand">${tt(N)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${pr(N.text||"")}</div>`}function tt(B){let N=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)N.push(B.command);else if(B.input!==void 0)try{N.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&N.push(`output:
${B.output}`),N.join(`

`)}function Ve(){if(!o)return i``;let B=O(),N=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ie=a.session_id||"",Fe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,me=P(),Oe=me?Mu(S(),Date.now()):"",Ee=me?se(B):null,Ze=me?_e(B):null,Re=Du(B);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Re?i`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${me?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Oe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Oe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Oe?i`<span class="sv__live-ago">${Oe}</span>`:""}</span
            >`:""}
        ${ie?i`<button
              type="button"
              class="sv__session"
              title=${ie}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ie}`}
              @click=${()=>K(ie)}
            >
              ⧉ ${ie.slice(0,8)}
            </button>`:""}
        ${N?i`<span class="sv__meta">${N}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${y?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${y?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${J}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Fe}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${Fe}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ke()}
        >
          ✕
        </button>
      </div>
      ${z()}
      <div class="sv__body">
        ${B.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:be(B).map(Qe=>Qe.kind==="group"?Ce(Qe):Pe(Qe.idx,Qe.line))}
      </div>
      ${Ee||Ze?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ee?i`<span class="sv__now-icon">${Ee.icon}</span>
                  <span class="sv__now-name">${Ee.tool}</span>
                  <span class="sv__now-detail"
                    >${Ee.tool==="Bash"?Jn(Ee.command):Ee.path||Ee.command||""}</span
                  >`:""}
            ${Ze?i`<span class="sv__now-think"
                  >💭 ${Jn(Ze.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ce(B){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ke(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ke(B){u.add(B),ye()}function ye(){qe(Ve(),e),C(),l&&pe()}function pe(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function ve(B){c.has(B)?c.delete(B):c.add(B),ye()}function ce(){l=!l,ye()}function K(B){Sr(B).then(N=>{N?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(B){!o||!B||(a={...a,...B},ye())}function fe(B){let N=B.target;if(!N||!N.classList||!N.classList.contains("sv__body"))return;!(N.scrollHeight-N.scrollTop-N.clientHeight<=4)&&l&&(l=!1,ye())}e.addEventListener("scroll",fe,!0);function X(B){let N=B&&B.attempt_id;N&&(o=N,a=B.meta||{},l=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(ye)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),ye())}function ke(){let B=o;o=null,c.clear(),u.clear(),x(),le(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),qe(i``,e),s&&s()}return{open:X,updateMeta:G,close:ke,isOpen(){return o!==null},destroy(){le(),f&&(f(),f=null),e.removeEventListener("scroll",fe,!0),o=null,qe(i``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ei(t.spec_id),s=Ei(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ei(e){return typeof e=="string"?e.trim():""}function Pu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Nu(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Pu(t)?null:"plan_pending"}),n}function Ci(e,t){let r=Nu(e);return i`
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
  `}var Fu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",qu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Bu=/^\*\*결론\*\* — (.+)$/;function ts(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Fu)return null;let r=qu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?Bu.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Ri=20;function Ii(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Uu(e){return e.length>Ri?`${e.slice(0,Ri)}\u2026`:e}function ju(e,t,r,n){let s=`${t.lane} ${Uu(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Ii(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function zu(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ii(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Li(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=ts(typeof c.text=="string"?c.text:"");return u?ju(c,u,t,s.has(c.id)):zu(c)})}
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
  `}var Hu=["codex","opus","fable","self","skip"],Wu=["codex","fable","skip"],Gu=["low","medium","high","xhigh"],Yu=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],no=["impl_runtime","orchestration_model"],fn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],so={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Oi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Vu=["self","skip"],Ku="opus",oo={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function ao(e){let t=so[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Zu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:oo[e]||"(\uAE30\uBCF8)"}function Br(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Br(e)||!Br(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Br(r)&&Br(r.models));return t.length>0?t:null}function ro(e){return{value:e,label:e}}function io(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Di(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[ro(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,l])=>({label:a,options:Object.keys(l.models).map(ro)})),o=s.some(a=>a.options.some(l=>l.value===t));return t&&!o?[io(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(ro)};return t&&!e.includes(t)?[io(t),r]:[r]}function sr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function lo(e,t){return Br(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Xu(e,t){return Br(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():lo(e,t)}function Qu(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Xu(n,n.models[t]);return[]}function Ju(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function co(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return lo(n,n.models[t]);return[]}function Ni(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of lo(n,s))r.includes(o)||r.push(o);return r}function Fi(e,t){if(!t)return Ni(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of co(e,o))s.includes(a)||s.push(a);return s}function ns(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=sr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?co(t,n.impl_model):Fi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Ku,a=r("impl_model"),l=r("impl_runtime"),c=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?sr(n,o):s:null;return Er.map(u=>{let f=t(u),_,y=!1;return u==="orchestration_model"?_=Di(n,f):u==="impl_runtime"?_=_r(["inherit","claude","codex"],f):u==="impl_model"?(_=c?Di(n,f,c):f?[io(f)]:[],y=l==="inherit"&&c===null):u==="orchestration_effort"?_=_r(Qu(n,o),f):u==="orchestration_speed"?_=ep(Ju(n,o),f):u==="impl_effort"?(_=_r(a?co(n,a):c?Fi(n,c):Ni(n),f),y=l==="inherit"&&c===null):u==="plan_review_model"?_=_r(Wu,f):Object.hasOwn(Oi,u)?(_=_r(Gu,f),y=Vu.includes(r(Oi[u]))):_=_r(Hu,f),{key:u,groups:_,selected:f,disabled:y,runner:u==="orchestration_model"?sr(n,o):null}})}function rs(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Mi(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Mi(s,t))}
          </optgroup>`)}
  `}function ep(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Mi(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Pi(e,t,r,n,s,o,a){return i`
    <div class="detail-kv">
      <span class="detail-kv__k">${ao(e)}</span>
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
  `}function tp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function rp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,l=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,_])=>{let y=t(f)||"codex",A=t(_);return`${u} ${y}${A?`/${A}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:l.join(" \xB7 ")}];return i`<section
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
              >${tp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function qi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},l=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let T=l($);return T||(typeof a[$]=="string"?a[$]:"")},u=Ur({selectedOf:l,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",_=new Map(u.map($=>[$.key,$])),y=fn.flatMap($=>$.keys).filter($=>l($)).length,A=$=>{let T=_.get($);return T?Pi(T.key,rs(T.groups,T.selected,Zu(T.key,a,s)),T.selected,!!T.selected,T.disabled,T.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${rp(l,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Pi("workflow_mode",rs(_r(Yu,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${no.map(A)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${y}개 변경됨</summary>
      ${fn.map($=>i`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(A)}
          </section>`)}
    </details>
  `}function np(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Bi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c($){$.key==="Escape"&&s&&($.preventDefault(),y())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${np(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
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
    `:i``}function f(){qe(u(),e)}async function _($,T={}){s=$,o="loading",a="",l="",f();let j=r?r():"";if(!j){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(j)+"&path="+encodeURIComponent($);try{let V=await n(x),J=await V.json().catch(()=>({}));if(!V.ok||!J||J.ok!==!0){if(J?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(J&&J.error||V.status)+")",f();return}a=String(J.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function y(){s=null,qe(i``,e)}function A(){document.removeEventListener("keydown",c),y()}return{open:_,close:y,destroy:A}}var sp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],zi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function op(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ap(e){let t=ht(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Nr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${zi}
          >부분 집계</span
        >`:""}`}function Ui(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ji(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Hi(t):""}function ip(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${ji(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${ji(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function lp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...sp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${op(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${zi}</span>`:""}
  </div>`}var cp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Hi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function dp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Wi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,y=o.has(u.attempt_id),A=_&&!y,$=_?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${T=>{T.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,y=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return i`<div class="detail-session__cause" title=${y}>
      ${u.cause}
    </div>`},c=u=>{let f=Ui(Os(u));if(ht(f).length===0&&!Nr(u.usage))return"";let _=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${y=>{y.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${ap(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Os(u),_=Ui(f),y=ht(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${cp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?i`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Gt(u)}</span>
            ${y.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${y.length>0?y.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Nr(u.usage)?i`<span class="detail-session__usage"
                    >${Nr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Hi(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${dp(u)}
          ${s.has(u.attempt_id)&&u.usage?lp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${ip(f)}
        </div>`})}
    </div>
  `}function Gi(e,t={}){return i`
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
          ${up(e)}
        </div>`:""}
  `}function up(e){let t=qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Qn(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var pp=["open","in_progress","deferred","resolved","closed"],fp=[0,1,2,3,4];function Yi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},y="",A=!1,$=!1,T=!1,j="",x="",V="";function J(){$=!1,T=!1,j="",x="",V=""}let z=[],O=null,S=null,P=!1,C="",le=!1,be=0,se=new Set;function _e(){z=[],O=null,S=null,P=!1,C="",le=!1,be+=1,se.clear()}async function Pe(d){if(!s)return;let v=++be;try{let b=await Promise.resolve(s("get-comments",{id:d}));if(v!==be||d!==u)return;z=Array.isArray(b)?b:[],P=!1}catch{if(v!==be||d!==u)return;P=!0}m()}function tt(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(O!==u){O=u,S=d,Pe(u);return}d!==null&&d!==S&&(S=d,Pe(u))}function Ve(d){se.has(d)?se.delete(d):se.add(d),m()}function Ce(d){let v=C.trim().length===0;C=d,v!==(d.trim().length===0)&&m()}async function Ke(){let d=C.trim();if(!s||!u||d.length===0||le)return;let v=u;le=!0,m();let b=!1;try{let R=await Promise.resolve(s("add-comment",{id:v,text:d}));Array.isArray(R)&&R.length>0&&(b=!0,v===u&&(z=R,P=!1,C="",S=R.length))}catch{b=!1}b||Q("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),v===u&&(le=!1),m()}let ye={onToggle:Ve,onDraftInput:Ce,onSubmit:Ke},pe=document.createElement("div");pe.className="md-viewer-root",document.body.appendChild(pe);let ve=Bi(pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ce=document.createElement("div");ce.className="session-log-root",document.body.appendChild(ce);let K=es(ce,{transport:s?(d,v)=>Promise.resolve(s(d,v)):void 0,sessionLogStore:c}),G=!1,fe=!1,X=!1,ke=null,B=null,N=0;function ie(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Fe(){G=!1,fe=!1,X=!1,ke=null,B=null,N+=1}async function me(d){if(!s)return;let v=++N;fe=!0,X=!1,m();try{let b=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(v!==N)return;!b||typeof b!="object"||Array.isArray(b)?X=!0:(ke=b,B=ie(d))}catch{v===N&&(X=!0)}finally{v===N&&(fe=!1,m())}}function Oe(){if(G=!G,G&&u&&B!==ie(u)){ke=null,me(u);return}m()}function Ee(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(b=>b&&b.bead_id===u).sort((b,R)=>(R.started_at||0)-(b.started_at||0)).map(b=>({attempt_id:b.attempt_id,bead_id:b.bead_id,status:b.status,started_at:typeof b.started_at=="number"?b.started_at:null,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,session_id:b.session_id||null,resumed_from:b.resumed_from||null,continuation_mode:b.continuation_mode||null,dismissed_at:typeof b.dismissed_at=="number"?b.dismissed_at:null,cause:typeof b.cause=="string"?b.cause:null,cause_detail:b.cause_detail||null,exec_default_preset_id:typeof b.exec_default_preset_id=="string"?b.exec_default_preset_id:null,exec_default_preset_revision:typeof b.exec_default_preset_revision=="number"?b.exec_default_preset_revision:null,exec_values:b.exec_values&&typeof b.exec_values=="object"?b.exec_values:null,usage:b.usage||null,usage_legs:Array.isArray(b.usage_legs)?b.usage_legs:[]}))}function Ze(){if(!a||!u)return null;let d=a.get();return Ot(d&&d.attempts||{},u)}let Re=new Set;function Qe(d){Re.has(d)?Re.delete(d):Re.add(d),m()}function D(d){let v=a?a.get():null,b=v&&v.attempts?v.attempts[d]:null;K.open({attempt_id:d,meta:b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}})}async function U(d){if(!s||!d)return;let v=()=>{let xe=a?a.get():null;return xe&&typeof xe.revision=="number"?xe.revision:0},b=async(xe={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:v(),...xe}),R=xe=>{xe?.queue&&a?.set&&a.set(xe.queue)},te=await b();if(R(te),te&&te.conflict){let xe=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:v();te=await s("worker-attempt-resume",{attempt_id:d,expected_revision:xe}),R(te)}te=await Yt(te,(xe,ft)=>b({continuation:xe,decision_token:ft}),{onResult:R,refresh:()=>b()}),te&&te.resumed===!1&&!te.conflict&&te.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${te.reason}`,"error",2400)}let h={onOpen:D,onResume:U,onToggleUsage:Qe};function L(){let d=a?a.get():null,v=d&&d.default_exec_preset_id,b=typeof v=="string"?ge()?.presets.find(R=>R.id===v):null;return b&&b.compatible!==!1&&b.settings?b.settings:{}}function M(){let d=a?a.get():null,v=d&&d.default_exec_preset_id,b=typeof v=="string"?ge()?.presets.find(R=>R.id===v):null;return b&&b.compatible!==!1&&typeof b.name=="string"?b.name:""}function H(){let d=a?a.get():null;return d&&d.runner_catalog||null}function q(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},b=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof L().orchestration_model=="string"?L().orchestration_model:"")||"opus";return sr(H(),b)}function ge(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function we(d){let v=d&&d.settings&&typeof d.settings=="object"?d.settings:{},b=R=>typeof v[R]=="string"?v[R]:R==="impl_runtime"&&typeof v.impl_model=="string"&&sr(H(),v.impl_model)||"";return Ur({selectedOf:b,effectiveOf:b,runner_catalog:H()}).some(R=>R.groups.some(te=>te.options.some(xe=>xe.value===R.selected&&xe.label.endsWith("(\uBE44\uD638\uD658)"))))}function Ie(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function Be(){let d=ge(),v=d?.presets.find(b=>b.id===y);if(!(!s||!u||!d||!v||we(v)||A)){A=!0,m();try{let b=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:v.id,expected_revision:d.revision}));if(b&&b.conflict){Ie(b),Q("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let R=b&&Array.isArray(b.issue)?b.issue[0]:b?.issue;if(b&&b.applied&&R&&typeof R=="object"){f=R;for(let te of Er)delete _[te];Q("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}b&&b.error==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(b){b&&typeof b=="object"&&b.code==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,m()}}}function pt(){let d=ge();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let v=d?d.presets:[],b=v.find(te=>te.id===y),R=b?we(b):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||A}
          @change=${te=>{y=te.target.value,m()}}
        >
          <option value="" ?selected=${y===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${v.map(te=>{let xe=we(te);return i`<option
              value=${te.id}
              ?selected=${te.id===y}
            >
              ${te.name}${xe?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!b||R||A}
          @click=${()=>{Be()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let rt=null;r&&r.subscribe&&(rt=r.subscribe(()=>nt()));let at=null;a&&typeof a.subscribe=="function"&&(at=a.subscribe(()=>{u&&m()}));let mt=null;l&&typeof l.subscribe=="function"&&(mt=l.subscribe(()=>{u&&m()}));function Rt(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",Rt);function nt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(b=>b&&b.id===u)||d[0]||f}tt(),m()}}function lt(d){Sr(d).then(v=>{v?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(d){d.preventDefault(),d.stopPropagation(),u&&lt(u)}function ct(d,v){d.preventDefault(),d.stopPropagation(),lt(v)}function bt(d,v,b){d.preventDefault(),d.stopPropagation(),ve.open(v,{missing_state:b})}function I(d,v){_[d]=v,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:v})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Z(d,v){let b=f||{},R=b.metadata&&typeof b.metadata=="object"?b.metadata:{},te={};for(let Ue of["impl_runtime","impl_model","impl_effort"])te[Ue]=Object.hasOwn(_,Ue)?_[Ue]:typeof R[Ue]=="string"?R[Ue]:"";te[d]=v;let xe=ns(te,H(),q()),ft={};for(let Ue of["impl_runtime","impl_model","impl_effort"])ft[Ue]=_[Ue],_[Ue]=xe[Ue]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...xe,orchestration_runtime:q()})).then(Ue=>{let zt=Array.isArray(Ue)?Ue[0]:Ue;if(!zt||typeof zt!="object"||!zt.id)throw new Error("implementation target readback failed");f=zt;for(let ls of["impl_runtime","impl_model","impl_effort"])delete _[ls];m()}).catch(()=>{for(let Ue of["impl_runtime","impl_model","impl_effort"])ft[Ue]===void 0?delete _[Ue]:_[Ue]=ft[Ue];m(),Q("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,v,b){if(!s||!u)return!1;try{let R=await Promise.resolve(s(d,v)),te=Array.isArray(R)?R[0]:R;return te&&typeof te=="object"&&te.id?(f=te,!0):(Q(b,"error"),!1)}catch{return Q(b,"error"),!1}}function ue(d){setTimeout(()=>{try{let v=e.querySelector(d);v&&typeof v.focus=="function"&&v.focus()}catch{}},0)}function $e(){$=!0,j=f&&f.title||"",m(),ue('.detail-edit__input[data-edit="title"]')}function Te(d){j=d.target.value}function We(){$=!1,j="",m()}function Je(){oe("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&($=!1,j=""),m()})}function Se(){T=!0,x=f&&f.description||"",m(),ue('.detail-edit__textarea[data-edit="description"]')}function Ge(d){x=d.target.value}function Ae(){T=!1,x="",m()}function ut(){oe("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(v=>{v&&(T=!1,x=""),m()})}function yt(d,v,b,R){if(d.key==="Escape"){d.stopPropagation(),b();return}d.key==="Enter"&&(!R||d.ctrlKey||d.metaKey)&&(d.preventDefault(),v())}function Ut(d){let v=d.target.value;oe("update-status",{id:u,status:v},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Zt(d){let v=Number(d.target.value);oe("update-priority",{id:u,priority:v},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function jt(d){V=d.target.value}function p(){let d=V.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(v=>{v&&(V=""),m()})}function k(d){if(d.key==="Escape"){d.stopPropagation(),V="",m();return}d.key==="Enter"&&(d.preventDefault(),p())}function E(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let ee={onCopyPath:ct,onOpenDoc:bt},de={onChange:I,onImplTargetChange:Z};function he(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Y(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function De(d){let b=(Array.isArray(d.dependencies)?d.dependencies:[]).map(R=>({id:he(R),icon:Y(R)})).filter(R=>R.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${b.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${b.map(R=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:i`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function Me(d){let v=d.metadata||{},b=d.workflow||{},R=b.stages||{},te=R.spec&&R.spec.stale,xe=R.impl&&R.impl.stale,ft=R.plan||null,Ue=b.route_source==="derived",zt=b.route||v.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ue?" detail-kv__v--derived":""}"
          title=${Ue?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ue?"unset":zt}</span
        >
      </div>
      ${b.route!=="quick_fix"||Object.hasOwn(v,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${v.spec_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ft?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ft?.approval_receipt||"\uC5C6\uC74C"}${ft?.approval_state==="stale"?" \xB7 stale":ft?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${b.route!=="quick_fix"||Object.hasOwn(v,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${v.impl_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${v.pr_url}</span>
          </div>`:""}
    `}let ot={route:["quick_fix","spec_backed","full_plan"]};async function vt(d,v){let b=v.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&b!=="full_plan"&&!window.confirm(`full_plan \u2192 ${b||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await oe("update-workflow-meta",{id:u,key:d,value:b},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function gt(d){let v=d.metadata||{};return i` ${((R,te)=>{let xe=ot[R],ft=typeof v[R]=="string"?v[R]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${Ue=>vt(R,Ue)}
        >
          <option value="" ?selected=${!xe.includes(ft)}>
            ${te}
          </option>
          ${xe.map(Ue=>i`<option value=${Ue} ?selected=${ft===Ue}>${Ue}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ae(d,v){return $?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${Te}
            @keydown=${b=>yt(b,Je,We,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Je}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${We}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${ht(v).map(b=>i`<span class="detail-usage-total" title=${b.tooltip}
              >${b.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${$e}
        >
          ✎
        </button>
      </div>
    `}function w(d){let v=At(d.created_at),b=At(d.updated_at);return!v&&!b?i``:i`
      ${v?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
      ${b?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${b}</span>
          </div>`:""}
    `}function W(d,v){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ut}
        >
          ${pp.map(b=>i`<option value=${b} ?selected=${b===d}>${b}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Zt}
        >
          ${fp.map(b=>i`<option value=${String(b)} ?selected=${b===v}>
                P${b}
              </option>`)}
        </select>
      </div>
    `}function ne(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
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
              @input=${Ge}
              @keydown=${v=>yt(v,ut,Ae,!0)}
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
                @click=${Ae}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Le(d){let v=typeof d.notes=="string"?d.notes:"";return v.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${v}</div>
    `}function et(d){let v=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${v.map(b=>i`<span class="detail-label-chip"
              >${b}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${b}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+b}
                @click=${()=>E(b)}
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
            @input=${jt}
            @keydown=${k}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${p}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!u)return i``;let d=f||{},v=String(d.id||u),b=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=Ze(),te=d.status||"open",xe=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",ft=d.description||"",Ue={...d,metadata:{...d.metadata||{},..._}};return i`
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
            ${v}
          </button>
          ${ae(b,R)}
          ${W(te,xe)} ${w(d)}
          ${ne(ft)}
          ${Li(z,ye,{expanded:se,draft:C,sending:le,error:P})}
          ${Le(d)} ${et(d)} ${De(d)}
          ${Me(d)} ${gt(d)}
          ${Ci(d,ee)}
          ${pt()}
          ${qi(Ue,de,L(),H(),M())}
          ${Gi({expanded:G,loading:fe,error:X,data:ke},{onToggle:Oe})}
          ${Wi(Ee(),h,{total:R,expanded:Re})}
        </div>
      </div>
    `}function m(){qe(je(),e)}return{load(d){d!==u&&(_={},y="",J(),_e(),Fe()),u=d,f=null,nt()},clear(){u=null,f=null,_={},y="",A=!1,J(),_e(),Fe(),ve.close(),K.close(),qe(i``,e)},destroy(){rt&&(rt(),rt=null),at&&(at(),at=null),mt&&(mt(),mt=null),document.removeEventListener("keydown",Rt),ve.destroy(),pe.parentNode&&pe.parentNode.removeChild(pe),K.destroy(),ce.parentNode&&ce.parentNode.removeChild(ce),u=null,f=null,y="",A=!1,_e(),Fe(),qe(i``,e)}}}var _p=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Vi(e,t){return Rs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function mp(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Ki(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let P=r.get();if(P)try{let C=await n("display-policy-set",{expected_revision:P.revision,policy:S(P)});c(C),C&&C.conflict&&C.policy&&(C=await n("display-policy-set",{expected_revision:C.policy.revision,policy:S(C.policy)}),c(C)),C&&C.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let P=r.get();if(!P)return;let C=Vi(S,P)!=="shown";l(le=>mp(S,le,C))}function f(){let S=a.trim();S.length!==0&&(a="",l(P=>P.hidden_prefixes.includes(S)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,S]}),j())}function _(S){l(P=>({hidden_prefixes:P.hidden_prefixes.filter(C=>C!==S)}))}function y(S){let P=r.get();if(!P)return;let C=P.chips[S]===!1;l(()=>({chips:{[S]:C}}))}function A(S){let P=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${P.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${P.map(C=>{let le=Vi(C,S);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${le}`}
                  data-label=${C}
                  data-state=${le}
                  @click=${()=>u(C)}
                >
                  ${C}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(P=>i`<span class="display-settings__prefix">
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
    `}function T(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${_p.map(([P,C])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${P}
                  .checked=${S.chips[P]!==!1}
                  @change=${()=>y(P)}
                />
                <span>${C}</span>
              </label>`)}
        </div>
      </section>
    `}function j(){let S=r.get();qe(i`
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
            ${S?i`${A(S)} ${$(S)}
                ${T(S)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,V=()=>{x=!1};o.addEventListener("close",V),o.addEventListener("cancel",V);let J=null;r.subscribe&&(J=r.subscribe(()=>{x&&j()}));function z(){x||(a="",x=!0,j(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:z,close:O,destroy(){x=!1,o.removeEventListener("close",V),o.removeEventListener("cancel",V),J&&(J(),J=null),o.remove()}}}function Zi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let y=typeof _=="string"?_.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Xi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Qi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function ss(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let l=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let h=u();return typeof h.revision=="number"?h.revision:0}function _(){let h=n?n.get():null;return!h||typeof h.revision!="number"?null:{revision:h.revision,presets:Array.isArray(h.presets)?h.presets:[]}}function y(h){n&&h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&n.set({revision:h.revision,presets:h.presets})}function A(h){h&&h.queue&&r&&r.set(h.queue)}function $(){return u().runner_catalog??null}let T=null;function j(){if(T!==null)return T;let h=u().default_exec_preset_id;return typeof h=="string"&&h.length>0?h:null}async function x(h){if(!s)return;let L=_();if(!L)return;T=h||"";let M=O(h);if(me(),!M.viable){Q(M.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),T=null,me();return}try{let H=await s("worker-queue-set-default-exec-preset",{preset_id:h||null,expected_queue_revision:f(),expected_preset_revision:L.revision});A(H),H&&H.presets&&n&&n.set(H.presets),H&&H.conflict?Q("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):H&&H.applied||Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}T=null,me()}function V(h){l={id:h.id,name:h.name,settings:{...h.settings||{}}},P(),c=!1,me()}function J(){l={id:null,name:"",settings:{}},c=!1,me()}function z(h){let L=h&&h.settings&&typeof h.settings=="object"?h.settings:{},M=H=>typeof L[H]=="string"?L[H]:H==="impl_runtime"&&typeof L.impl_model=="string"&&sr($(),L.impl_model)||"";return Ur({selectedOf:M,effectiveOf:M,runner_catalog:$()}).some(H=>H.groups.some(q=>q.options.some(ge=>ge.value===H.selected&&ge.label.endsWith("(\uBE44\uD638\uD658)"))))}function O(h){if(!h)return{viable:!0,missing:!1,incompatible:!1,preset:null};let M=_()?.presets.find(q=>q.id===h);if(!M||M.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let H=M.compatible===!1||z(M);return{viable:!H,missing:!1,incompatible:H,preset:M}}function S(){let h=l?.settings.orchestration_model;return typeof h!="string"?null:sr($(),h)}function P(){if(!l)return;let h=ns({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},$(),S());for(let L of["impl_runtime","impl_model","impl_effort"])h[L]?l.settings[L]=h[L]:delete l.settings[L]}function C(h){let L=h&&h.settings&&typeof h.settings=="object"?h.settings:{},M=Er.filter(q=>typeof L[q]=="string").length,H=Er.filter(q=>typeof L[q]=="string").map(q=>`${so[q]?.title||q}: ${L[q]}`);return{count:`${M}/12 \uC9C0\uC815`,choices:H.length>0?H.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function le(h){if(!s||!window.confirm(`\u201C${h.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let L=_();if(L)try{let M=await s("exec-preset-delete",{expected_revision:L.revision,id:h.id});y(M),M&&M.conflict&&Q("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function be(h=!1){if(!s||!l)return;let L=_();if(!L)return;let M=h||l.id===null,H={expected_revision:L.revision,...M?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let q=await s(M?"exec-preset-create":"exec-preset-update",H);if(y(q),q&&q.conflict){c=!0,me();return}if(q&&q.applied){l=null,c=!1,me();return}Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function se(h){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${ao(h.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${h.key}
        ?disabled=${h.disabled}
        @change=${L=>{if(!l)return;let M=L.target.value;M?l.settings[h.key]=M:delete l.settings[h.key],(h.key==="impl_runtime"||h.key==="impl_model"||h.key==="impl_effort"||h.key==="orchestration_model")&&P(),c=!1,me()}}
      >
        ${rs(h.groups,h.selected,oo[h.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function _e(){if(!l)return"";let h=we=>typeof l?.settings[we]=="string"?l.settings[we]:"",L=Ur({selectedOf:h,effectiveOf:h,runner_catalog:$(),controller_runtime:S()}),M=fn.flatMap(we=>we.keys).filter(we=>typeof l?.settings[we]=="string").length,H=we=>{let Ie=L.find(Be=>Be.key===we);return Ie?se(Ie):""},q=_(),ge=l.id!==null&&q!==null&&!q.presets.some(we=>we.id===l?.id);return i`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${we=>{l&&(l.name=we.target.value,c=!1)}}
        />
      </label>
      ${c?i`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${ge?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${no.map(H)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${M}개 변경됨</summary>
        ${fn.map(we=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${we.id}
            >
              <h4>${we.label}</h4>
              ${we.keys.map(H)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${ge?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{be(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{be(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{l=null,c=!1,me()}}
        >
          취소
        </button>
      </div>
    </div>`}function Pe(){let h=_(),L=h?h.presets.filter(q=>q?.migration_pending!==!0):[],M=j()||"",H=O(M);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${J}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${h===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:L.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:L.map(q=>{let ge=C(q),we=O(q.id),Ie=q.id===M,Be=we.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":we.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",pt=typeof q.reference_count=="number",rt=pt?q.reference_count:null,at=Array.isArray(q.reference_summary)?q.reference_summary.map(mt=>mt?.display_name||mt?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${q.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${q.name}</strong>
                  ${Ie?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${ge.count}</span>
                  <span data-preset-references=${q.id}
                    >${pt?`\uCC38\uC870 ${rt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${we.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${ge.choices}</small>
                  ${at?i`<small data-preset-impact=${q.id}
                        >업데이트 영향: ${at}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Ie?i`<button
                        type="button"
                        data-workspace-preset-release=${q.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:i`<button
                        type="button"
                        data-workspace-preset-assign=${q.id}
                        ?disabled=${!we.viable}
                        title=${Be}
                        @click=${()=>{x(q.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${q.id}
                    @click=${()=>V(q)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${q.id}
                    ?disabled=${rt===null||rt>0||q.reference_scan_complete===!1}
                    title=${rt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":rt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":q.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{le(q)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${h!==null&&M&&H.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${M} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${M}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${_e()}
    </section>`}function tt(){let h=u().workspace_info;return h&&typeof h=="object"?h:{}}function Ve(h,L){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${h}"
      >${L}</span
    >`}function Ce(h){let L=h?Qi(h.cmd):"",M=h?Xi(h.timeout_ms):"",H=o&&o()||"<workspace \uACBD\uB85C>";return i`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${L?i`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${L}</span>
            ${Ve("config","config")}
            ${M?i`<span class="exec-defaults__vd-meta"
                  >timeout ${M}</span
                >`:""}
          </div>`:i`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${Ve("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${H}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Ke(h){let L=h?Qi(h.cmd):"",M=h?Xi(h.timeout_ms):"",H=M?`timeout ${M} \xB7 external deployer \uC2E4\uD589`:"external deployer \uC2E4\uD589";return i`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${L?i`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${L}</span>
            ${Ve("deployer","external")}
            <span class="exec-defaults__vd-meta">${H}</span>
          </div>`:i`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${Ve("absent","\uC548 \uD568")} 배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >docs/agents/repo-ops.toml [deploy]</span
            >
            선언으로 정의
          </div>`}
    </div>`}let ye=!1,pe=!1,ve=!1,ce=null;async function K(){if(s){pe=!0,ve=!1,me();try{let h=await Promise.resolve(s("get-worker-system-prompt",{}));!h||typeof h!="object"||Array.isArray(h)?ve=!0:ce=h}catch{ve=!0}finally{pe=!1,me()}}}function G(){if(ye=!ye,ye&&!ce){K();return}me()}function fe(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${ye?"true":"false"}
          @click=${G}
        >
          ${ye?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${ye?X():""}
    </section>`}function X(){let h=qr({loading:pe,error:ve});if(h)return h;if(!ce)return"";let L=Array.isArray(ce.variants)?ce.variants:[];return i`<div class="exec-defaults__sp-body">
      ${ce.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${ce.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${L.map(M=>i`<div class="exec-defaults__sp-variant" data-variant=${M.key}>
            <div class="exec-defaults__sp-cond">${M.condition}</div>
            ${nr(M.label,M.system_prompt)}
          </div>`)}
    </div>`}function ke(h){return i`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — repo 선언/config에서 정의</span
        >
      </p>
      ${Ce(h.verify_cmd)} ${Ke(h.deploy_cmd)}
    </section>`}async function B(h){if(!s)return;let L=await s("worker-auto-repair-toggle",{on:h,expected_revision:f()});if(A(L),L&&L.conflict){let M=await s("worker-auto-repair-toggle",{on:h,expected_revision:f()});A(M)}me()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5",whole_command_retry:"\uBA85\uB839 \uD1B5\uC9F8 \uC7AC\uC2DC\uB3C4",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ie(h,L,M){return i`<div class="exec-defaults__policy-group" data-policy=${M}>
      <div class="exec-defaults__policy-label">${h}</div>
      <ul class="exec-defaults__policy-list">
        ${L.map(H=>i`<li data-token=${H}>
              ${N[H]||H}
            </li>`)}
      </ul>
    </div>`}function Fe(){let h=u(),L=h.auto_repair!==!1,M=h.repo_operation_policy&&typeof h.repo_operation_policy=="object"?h.repo_operation_policy:null,H=Array.isArray(h.repo_operations)?h.repo_operations:[],q=H.find(Ie=>Ie.state==="repairing"),ge=H.filter(Ie=>Ie.state==="failed"||Ie.state==="repairing"),we=ge.length?Math.min(...ge.map(Ie=>typeof Ie.repair?.remaining=="number"?Ie.repair.remaining:0)):M?.auto_repair?.budget_per_completion_chain??1;return i`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          .checked=${L}
          @change=${Ie=>{B(Ie.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${L?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${we}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${q?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${q.repair?.owner_bead||q.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${M?i`<div class="exec-defaults__policy">
            ${ie("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",M.worker_automatic||[],"worker-automatic")}
            ${ie(`\uC790\uB3D9 \uD574\uACB0 \uC138\uC158 (\uC644\uB8CC \uCCB4\uC778\uB2F9 \uCD5C\uB300 ${M.auto_repair?.budget_per_completion_chain??1}\uD68C)`,M.auto_repair?.eligible||[],"auto-repair-eligible")}
            ${ie("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",M.never_automatic||[],"never-automatic")}
          </div>`:""}
    </section>`}function me(){qe(i`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${U}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Pe()} ${ke(tt())}
            ${Fe()} ${fe()}
          </div>
        </div>
      `,a)}let Oe=!1,Ee=()=>{Oe=!1},Ze=h=>{h.target===h.currentTarget&&U()};a.addEventListener("close",Ee),a.addEventListener("cancel",Ee),a.addEventListener("click",Ze);let Re=null;r&&r.subscribe&&(Re=r.subscribe(()=>{Oe&&me()}));let Qe=null;n&&n.subscribe&&(Qe=n.subscribe(()=>{Oe&&me()}));function D(){Oe||(Oe=!0,me(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function U(){Oe&&(Oe=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:D,close:U,destroy(){Oe=!1,a.removeEventListener("close",Ee),a.removeEventListener("cancel",Ee),a.removeEventListener("click",Ze),Re&&(Re(),Re=null),Qe&&(Qe(),Qe=null),a.remove()}}}function gp(e){return{deployment_requested:"\uBC30\uD3EC \uC694\uCCAD",provider_attempt:"\uC678\uBD80 \uBC30\uD3EC \uD655\uC778",automatic_retry:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4",recovery_prepared:"\uBCF5\uAD6C \uC900\uBE44",recovery_session:"\uBCF5\uAD6C \uC138\uC158",confirmation_required:"\uC2B9\uC778 \uB300\uAE30",deployment_succeeded:"\uC131\uACF5 \uAD00\uCE21"}[e]||"\uBC30\uD3EC \uAC31\uC2E0"}var hp={queued:"\uB300\uAE30",running:"\uC2E4\uD589 \uC911",succeeded:"\uC131\uACF5",failed:"\uC2E4\uD328",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911"},Ji={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8",other:"\uC2E4\uD328 \uD574\uACB0"};function uo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function bp(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function yp(e){let t=e.failure||null,r=e.repair||{},n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"other";return i`<article
    class="worker-repo-op"
    data-operation-id=${e.operation_id}
    data-state=${e.state}
    data-kind=${e.kind}
  >
    <div class="worker-repo-op__head">
      <span class="worker-repo-op__kind">${e.kind}</span>
      <span class="worker-repo-op__state"
        >${hp[e.state]||e.state}</span
      >
      <code class="worker-repo-op__target" title=${e.target_sha||""}
        >${e.target_base}@${uo(e.target_sha)}</code
      >
      <code class="worker-repo-op__tree" title="target tree"
        >tree ${uo(e.target_tree)}</code
      >
      <span class="worker-repo-op__elapsed"
        >${bp(e.elapsed_ms)}</span
      >
    </div>
    <div class="worker-repo-op__meta">
      <code class="worker-repo-op__script"
        >${e.script_path||"(\uACBD\uB85C \uBBF8\uAE30\uB85D)"}</code
      >
      <code class="worker-repo-op__blob"
        >blob ${uo(e.script_blob_sha)}</code
      >
      ${Number.isInteger(e.exit_code)?i`<span class="worker-repo-op__exit"
            >exit ${e.exit_code}</span
          >`:""}
      ${e.signal?i`<span class="worker-repo-op__signal"
            >signal ${e.signal}</span
          >`:""}
    </div>
    ${t?i`<div class="worker-repo-op__failure">
          <code>${t.code}</code>
          ${t.detail?i`<span class="worker-repo-op__detail"
                >${t.detail}</span
              >`:""}
        </div>`:""}
    ${e.output_tail?i`<details class="worker-repo-op__output">
          <summary>출력 마지막 부분</summary>
          <pre>${e.output_tail}</pre>
        </details>`:""}
    ${e.log_path?i`<div class="worker-repo-op__log">
          전체 로그 <code>${e.log_path}</code>
        </div>`:""}
    <div class="worker-repo-op__actions">
      <span class="worker-repo-op__budget"
        >자동 해결 남음
        ${r.remaining??0}/${r.auto_budget??1}</span
      >
      ${r.attempt_id?i`<button
            type="button"
            class="worker-repo-op__session"
            data-attempt-id=${r.attempt_id}
          >
            해결 세션 보기
          </button>`:""}
      ${e.state==="failed"?i`<button
            type="button"
            class="worker-repo-op__resolve"
            data-operation-id=${e.operation_id}
            data-failure-kind=${e.failure_kind||"other"}
          >
            ${Ji[n]||Ji.other}
          </button>`:""}
    </div>
  </article>`}function el(e){let t=Array.isArray(e)?e:[];if(t.length===0)return"";let r=t.filter(n=>n.state==="failed"||n.state==="repairing").length;return i`<details
    class="worker-repo-ops"
    aria-label="레포 오퍼레이션"
    ?open=${r>0}
  >
    <summary class="worker-repo-ops__summary">
      <b>레포 오퍼레이션</b>
      <span class="worker-repo-ops__count">${t.length}건</span>
      ${r>0?i`<span class="worker-repo-ops__failing"
            >해결 필요 ${r}</span
          >`:""}
    </summary>
    <div class="worker-repo-ops__list">
      ${t.map(n=>yp(n))}
    </div>
  </details>`}function tl(e){if(!e||typeof e!="object"||typeof e.state!="string"||typeof e.repo!="string"||typeof e.desired_sha!="string")return"";let t=Array.isArray(e.timeline)?e.timeline.slice(0,5):[],r=e.recovery&&typeof e.recovery=="object"?e.recovery:null,n=Array.isArray(e.actions)?e.actions:[],s=n.find(a=>a?.kind==="view_session"&&typeof a.attempt_id=="string"),o=n.find(a=>a?.kind==="continue_recovery"&&typeof a.attempt_id=="string");return i`<details
    class="worker-deployment-strip"
    aria-label="레포 배포 상태"
    data-deployment-state=${e.state}
  >
    <summary class="worker-deployment-strip__summary">
      <span class="worker-deployment-strip__dot" aria-hidden="true"></span>
      <b>${e.state}</b>
      <span class="worker-deployment-strip__repo">${e.repo}</span>
      <code class="worker-deployment-strip__sha"
        >${e.desired_sha}</code
      >
      <span class="worker-deployment-strip__description"
        >${e.description||""}</span
      >
      <span class="worker-deployment-strip__count"
        >merge
        ${Number.isInteger(e.included_merge_count)?e.included_merge_count:0}</span
      >
      <span class="worker-deployment-strip__caret" aria-hidden="true">›</span>
    </summary>
    <div class="worker-deployment-strip__detail">
      ${t.length>0?i`<ol class="worker-deployment-strip__timeline">
            ${t.map(a=>i`<li>
                  ${gp(String(a?.kind||""))}
                </li>`)}
          </ol>`:""}
      ${r?i`<div class="worker-deployment-strip__recovery">
            ${r.bead_id?i`<code>${r.bead_id}</code>`:""}
            ${r.session_id?i`<code>${r.session_id}</code>`:""}
            ${r.attempt_id?i`<code>${r.attempt_id}</code>`:""}
            ${r.runner||r.model||r.effort?i`<span
                  >${[r.runner,r.model,r.effort].filter(Boolean).join(" \xB7 ")}</span
                >`:""}
            ${r.recent_update?i`<span class="worker-deployment-strip__update"
                  >${r.recent_update}</span
                >`:""}
            ${r.confirmation_reason?i`<details class="worker-deployment-strip__confirmation">
                  <summary>확인 내용 보기</summary>
                  <code>${r.confirmation_reason}</code>
                </details>`:""}
          </div>`:""}
      ${e.log?i`<details class="worker-deployment-strip__log">
            <summary>배포 로그 보기</summary>
            <code>${e.log.reference}</code>
          </details>`:""}
      ${n.some(a=>a?.kind==="retry")?i`<button type="button" class="worker-deployment-retry">
            지금 재시도
          </button>`:""}
      ${s?i`<button
            type="button"
            class="worker-deployment-session"
            data-attempt-id=${s.attempt_id}
          >
            세션 보기
          </button>`:""}
      ${o?i`<button
            type="button"
            class="worker-deployment-continue"
            data-attempt-id=${o.attempt_id}
          >
            복구 이어가기
          </button>`:""}
    </div>
  </details>`}function jr(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${At(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${At(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function vp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function _n(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?vp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:u}}function or(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function po(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=ht(e.usage),o=Nt(e.usage),a=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!l,u=c?Et(e.done_at):"",f=e.selectable?i`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",_=r?i`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",y=e.worker_serial===!0?i`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?i`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",A=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=i`<span class="worker-mini__title">${e.title}</span>`,j=e.pr_url&&e.pr_number?i`<a
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
        >`:"",V=n.map(_e=>_e===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${_e}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${_e===e.completion_badge&&e.completion_title||""}
          >${_e}</span
        >`),J=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",z=s.length>0?s.map(_e=>i`<span class="worker-usage" title=${_e.tooltip}
              >${_e.label}</span
            >`):o?i`<span class="worker-usage" title=${Fr(e.usage)}
            >${o}</span
          >`:"",O=a?i`<span class="merge-step"
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
      </button>`:"",P=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",C=e.discard,le=C?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${C?.attempt_id||""}
          data-operation-id=${C?.operation?.operation_id||""}
          data-discard-mode=${C?.confirmation||"unmerged"}
          ?disabled=${C?!C.enabled:e.discard_enabled===!1}
          title=${C?C.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${C?.label||"\uD3D0\uAE30"}
        </button>`:"",be=e.revise_action?i`<button
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
        </button>`:"",se=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||C?.operation||e.revise_action);return i`<div
    class="worker-mini${l?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${A}${$}${T}</div>
          <div class="worker-mini__row2">
            ${z}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${At(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${V}${O}
            <span class="worker-mini__actions"
              >${S}${P}${le}</span
            >
            ${jr(e)}
          </div>`:l?i`<div class="worker-mini__head">
              ${f}${_}${A}${$}${j}${x}${V}${y}${J}
            </div>
            <div class="worker-mini__body">${T}</div>
            ${se?i`<div class="worker-mini__foot">
                  ${z}${O}
                  <span class="worker-mini__actions"
                    >${S}${P}${le}${be}</span
                  >
                  ${or(e)}
                </div>`:""}
            ${jr(e)}`:i`<div class="worker-mini__line">
              ${f}${_}${A}${$}${T}${j}${x}${V}${y}${J}${z}${O}${S}${P}${le}
            </div>
            ${or(e)} ${jr(e)}`}
  </div>`}function wp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?Nn(r,e.status):""}
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
    ${jr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?wp(n):po(n))}
          </div>`}
  </section>`}var rl=160;function nl(e){return e.length>rl?`${e.slice(0,rl)}\u2026`:e}function kp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${nl(e.command)}</code>`:""}
  </div>`}function $p(e){return e?i`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function xp(e){return e?i`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function fo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function sl(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
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
          ${kp(e.failure.cause_detail)}
          ${or({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>i`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?i`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?i`<div class="worker-banner__detail">
                <code>${nl(r.detail)}</code>
              </div>`:""}
          ${xp(r.log_path)} ${$p(r.output_tail)}
        </div>`)}
  </div>`}function Sp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fo(t-e.started_at):"\u2014",a=Gt(e),l=dr(e),c=ht(e.usage),u=Nt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,y=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${y?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
    ${a||c.length>0||u||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>i`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Fr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${or(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function _o(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Sp(s,t,r))}
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
  </svg>`}function mo(){return mr(Qt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function go(){return mr(Qt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ol(){return mr(Qt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function al(){return mr(Qt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function il(){return mr(Qt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ll(){return mr(Qt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function cl(){return mr(Qt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function dl(){return mr(Qt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var mn=1,Ap=6e4,Tp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Ep=new Set(["auto_merge","merged","merge","done"]),ul={running:3,paused:2,failed:1};function Cp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Rp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),y=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!y&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=ul[u.run_state],y=ul[l];if(_>y||_===y&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ot(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function pl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function ho(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let l=[],c=[],u=[],f=[],_=[],y=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let V=x.root_dir,J=x.name||V,z=a.get(V),O=z&&typeof z.revision=="number"?z.revision:typeof x.revision=="number"?x.revision:0,S=Ct(x.attempts),P=Ct(x.bead_titles),C=Ct(x.pr_observations),le=Ct(x.admission),be=Ct(x.revise_parked),se=Ct(x.merge_queue_state),_e=Ct(x.cleanup_failed),Pe=Ct(x.discard_operations),tt=Array.isArray(x.merge_queue)?x.merge_queue:[],Ve=new Set(tt.filter(K=>K&&typeof K.bead_id=="string").map(K=>K.bead_id)),Ce=new Map(tt.filter(K=>K&&typeof K.bead_id=="string").map(K=>[K.bead_id,K])),Ke=Array.isArray(x.queue)?x.queue:[],ye=Array.isArray(x.done)?x.done:[],pe=new Map;for(let K of ye)K&&typeof K.bead_id=="string"&&typeof K.added_at=="number"&&pe.set(K.bead_id,K.added_at);let ve=K=>({id:K,title:P[K]||K,root_dir:V,workspace_name:J,expected_revision:O,draggable:!1}),ce=new Set;for(let[K,G]of Rp(S,pe))ce.add(K),c.push({...ve(K),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:Vt(Pe,K,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let K of Array.isArray(x.pr_wait)?x.pr_wait:[]){let G=K&&K.bead_id;if(typeof G!="string"||ce.has(G))continue;ce.add(G);let fe=Ct(C[G]),X=Ct(fe.pr),ke=fe.gate?Ct(fe.gate):null,B=Ve.has(G),N=Ce.get(G)?.continuation_action||null,ie=!!N&&N.continuation===null,Fe=se.active===G,me=K.external===!0,Oe=_e[G]||null,Ee=!!ke&&ke.base_badge==="\uCDA9\uB3CC",Ze=!!Oe&&["child_sweep","branch_cleanup","parent_close"].includes(Oe.step)&&!!ke&&ke.tier==="merged",Re=me&&!!ke&&ke.tier==="merged",Qe=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier),D=Vt(Pe,G,{external:me,merge_active:Fe,merge_queued:B,merged:!!Oe||ke?.tier==="merged"}),U=!!D.operation;u.push({...ve(G),lane:"pr_wait",pr_number:typeof X.number=="number"?X.number:null,pr_url:typeof X.url=="string"?X.url:void 0,external:me,usage:Ot(S,G),badges:ie?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Oe?["\uC815\uB9AC \uC2E4\uD328"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:!!Oe||Qe,reason:Oe?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!B||ie,merge_enabled:!U&&(ie||ke?.enabled===!0||Ee||Ze||Re),merge_label:ie?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||Ze?"\uC815\uB9AC":Ee&&!Ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ie?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?D.error?`\uD3D0\uAE30 \uC2E4\uD328: ${D.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${D.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Re?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ee?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:B&&!ie,cancel_enabled:!Fe,continuation_mismatch:N?.mismatch||null,discard:D,discard_action:D.action,discard_enabled:D.enabled,discard_title:D.title})}for(let K=0;K<Ke.length;K++){let G=Ke[K],fe=G&&G.bead_id;if(typeof fe!="string"||ce.has(fe))continue;ce.add(fe);let X=be[fe],ke=Vt(Pe,fe),B=ke.operation?ke:null,N={...ve(fe),lane:"queue",draggable:!B,discard:B||void 0,reason:pl(le,fe),queue_position:K+1,queue_index:K,queue_length:Ke.length,badges:X?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!X,revise_action:!!X,revise_enabled:!!X&&!B,revise_title:X?X.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${X.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(N);let ie=y.get(V);ie?ie.push(N):y.set(V,[N])}for(let K of Array.isArray(x.runnable)?x.runnable:[]){let G=K&&K.bead_id;typeof G!="string"||ce.has(G)||(ce.add(G),l.push({...ve(G),title:K.title||P[G]||G,lane:"runnable",draggable:!0,reason:pl(le,G),created_at:K.created_at??void 0,updated_at:K.updated_at??void 0,labels:Array.isArray(K.labels)?K.labels:[],spec_reviewer:typeof K.spec_reviewer=="string"?K.spec_reviewer:void 0,plan_state:K.plan_state==="approved"||K.plan_state==="authored"?K.plan_state:"none",workflow:K.route?{route:K.route,chips:{route:K.route}}:null,place_index:Ke.length}))}for(let K of ye){let G=K&&K.bead_id;if(typeof G!="string"||ce.has(G)||(ce.add(G),o!==void 0&&typeof K.added_at=="number"&&K.added_at<o))continue;let fe=Cp(S,G);_.push({...ve(G),lane:"done",done:!0,usage:Ot(S,G),done_at:typeof K.added_at=="number"?K.added_at:void 0,done_kind:fe&&typeof fe.done_kind=="string"?fe.done_kind:null})}}let A=new Map;s.forEach((x,V)=>{x&&typeof x.root_dir=="string"&&A.set(x.root_dir,V)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,V)=>{if($==="repo"){let O=A.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=A.get(V.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==S)return O-S}let J=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,z=typeof V.started_at=="number"&&Number.isFinite(V.started_at)?V.started_at:null;return J!==null&&z!==null&&J!==z?J-z:J===null&&z!==null?1:J!==null&&z===null?-1:x.id.localeCompare(V.id)}),_.sort((x,V)=>(V.done_at??0)-(x.done_at??0));let T=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),j=[];for(let x of T)!x||typeof x.root_dir!="string"||j.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=mn?x.slots:mn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Ct(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Ct(x.runner_catalog),items:y.get(x.root_dir)||[]});return{runnable:l,queue:f,queue_groups:j,running:c,pr_wait:u,done:_,automation:{total:j.length,both_on:j.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Ip(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Ap;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${At(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Et(e,t)}</span
        >`}</span
  >`}function gn(e){return i`<div class="mon-c__title">${e.title}</div>`}function hn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function as(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function bo(e){let t=ht(e.usage),r=Nt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Fr(e.usage)}
        >${r}</span
      >`:""}function yo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Lp(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${go()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${mo()}
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
          ${al()}
        </button>`:""}
  </span>`}function Op(e,t){let r=typeof e.started_at=="number"?fo(t-e.started_at):"";return i`${gn(e)}
    <div class="mon-c__meta">
      ${yo(e)}${Ip(e.last_event_at,t)}${hn(e)}${as(e)}
      ${Gt(e)?i`<span class="mon-c__model">${Gt(e)}</span>`:""}
      ${dr(e)?i`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${bo(e)}${Lp(e)}${or(e)}
    </div>`}function Dp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Et(e.updated_at);return i`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${hn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Pn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${as(e)}
      ${l?i`<span title=${`\uC218\uC815 ${At(e.updated_at)}`}
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
    </div>`}function Mp(e){let t=!!e.discard?.operation;return i`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${hn(e)}
      ${yo(e)}
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
        </div>`:""}`}function Pp(e){let t=!!(Nt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${yo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${bo(e)}
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
        </div>`:""}`}function Np(e,t){let r=e.done_kind||"",n=r?Tp[r]||r:"",s=Et(e.done_at,t);return i`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${n?i`<span
            class="mon-live__kind${Ep.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${bo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${At(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function fl(e,t){return e.lane==="running"?Op(e,t):e.lane==="runnable"?Dp(e):e.lane==="queue"?Mp(e):e.lane==="pr_wait"?Pp(e):Np(e,t)}function _l(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?go():mo()}
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
        ${il()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ll()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${mn}
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
        ${cl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ml(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Wt.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ol():dl()}
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
        ${Wt.map(l=>i`<option
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
  </div>`}function gl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function hl(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return ht(Bn(t));let r={};for(let l of er)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of er){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Nt(r):null}var yl="bdui.monitor.done-range",vl="bdui.monitor.running_sort";function Fp(){try{let e=window.localStorage.getItem(yl);return Lt(e)?e:Tt}catch{return Tt}}function qp(e){try{window.localStorage.setItem(yl,e)}catch{}}function Bp(){try{return window.localStorage.getItem(vl)==="repo"?"repo":"started"}catch{return"started"}}function Up(e){try{window.localStorage.setItem(vl,e)}catch{}}var wl="tab:monitor:pipeline",jp=1e3,zp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function bl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${fl(e,t)}
  </div>`}function kl(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),_=Fp(),y=Bp();function A(){let D=Wt.find(U=>U.value===_);return D?D.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let T=ho(null,null),j=null,x=new Map,V=new Set;function J(D){return T.queue_groups.find(U=>U.root_dir===D)||null}let O=ss(e,{queueStore:{get(){if(!j)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let D=x.get(j);if(D)return D;let U=J(j),h=s&&s.get?s.get():null,L=(Array.isArray(h)?h:[]).find(M=>M&&M.root_dir===j);return{revision:U?U.revision:0,exec_defaults:U?U.exec_defaults:{},default_exec_preset_id:U?U.default_exec_preset_id:null,runner_catalog:U?U.runner_catalog:null,workspace_info:L?L.workspace_info:void 0}},set(D){j&&x.set(j,D);for(let U of Array.from(V))U()},subscribe(D){return V.add(D),()=>V.delete(D)}},presetStore:a,transport:o?(D,U)=>o(D,D==="worker-queue-set-default-exec-preset"||D==="get-worker-system-prompt"?{...U||{},root_dir:j}:U):void 0,getWorkspacePath:()=>j||void 0}),S=null,P=null;async function C(D,U,h,L,M=!0){if(!o||!h)return null;let H=await o(D,{...U,root_dir:h,expected_revision:L});if(H&&H.conflict&&M){H.queue&&x.set(h,H.queue);let q=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:L;H=await o(D,{...U,root_dir:h,expected_revision:q})}return H&&H.queue&&h&&x.set(h,H.queue),H}function le(D,U){let h=x.get(D),L=s&&s.get?s.get():null,M=(Array.isArray(L)?L:[]).find(q=>q?.root_dir===D);return(h||M)?.merge_queue?.find(q=>q.bead_id===U)?.continuation_action}async function be(D,U,h,L){let M=await C(D,U,h,L),H=x.get(h)?.revision??M?.queue?.revision??L;return Yt(M,(q,ge)=>C(D,{...U,continuation:q,decision_token:ge},h,H,!1),{refresh:q=>C(D,U,h,q?.queue?.revision??x.get(h)?.revision??H,!1)})}async function se(D,U,h,L){let M=await Yt({continuation_mismatch:L},(q,ge)=>C("worker-merge-queue-add",{bead_id:U,continuation:q,decision_token:ge},D,h,!1)),H=M?.queue?.merge_queue?.find(q=>q.bead_id===U)?.continuation_action;M?.applied!==!0&&H?.continuation===null&&H.mismatch&&await se(D,U,M.queue.revision,H.mismatch)}async function _e(D,U,h){let L=await C("worker-discard",D,U,h);if(L&&L.discarded===!0){Q(os(L),"success",5e3);return}if(L&&L.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${L.reason}`,"error");return}if(L&&L.accepted&&L.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(L&&L.accepted){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${L.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}L&&!L.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Pe(D,U,h){return!o||!h?null:await o(D,{...U,root_dir:h})}async function tt(D){if(!o||!D&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let U=await o("monitor-auto-toggle",{on:D}),h=U&&Array.isArray(U.failed)?U.failed:[];h.length>0&&Q(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${h.map(L=>L.root_dir).join(", ")}`,"error",3200)}async function Ve(){let D=new Map;for(let U of T.pr_wait)D.has(U.root_dir)||D.set(U.root_dir,U.expected_revision);for(let[U,h]of D)await C("worker-merge-queue-add-all",{},U,h)}let Ce=null,Ke=!1,ye=null;function pe(){ye!==null&&clearTimeout(ye),ye=setTimeout(()=>{ye=null,Ke=!1},0)}function ve(D){let U=D.target;return typeof U?.closest=="function"?U.closest(".mon-group"):null}function ce(D){let U=ve(D);return!U||!Ce?null:(U.getAttribute("data-root-dir")||"")===Ce.root_dir?U:null}function K(){for(let D of Array.from($.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function G(D){let U=D.target,h=typeof U?.closest=="function"?U.closest('.mon-card[draggable="true"]'):null;if(h){Ce={bead_id:h.getAttribute("data-issue-id")||"",lane:h.getAttribute("data-lane")||"",root_dir:h.getAttribute("data-root-dir")||"",revision:Number(h.getAttribute("data-revision")||0)||0,queue_index:Number(h.getAttribute("data-queue-index")),queue_length:Number(h.getAttribute("data-queue-length")),place_index:Number(h.getAttribute("data-place-index"))},Ke=!0;try{D.dataTransfer?.setData("text/plain",Ce.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function fe(D){let U=ce(D);U&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),U.classList.add("mon-group--drag-over"))}function X(D){ve(D)?.classList.remove("mon-group--drag-over")}function ke(){Ce=null,K(),pe()}function B(D){let U=ce(D),h=Ce;if(Ce=null,K(),!U||!h||!h.bead_id)return;D.preventDefault();let L=D.target,M=typeof L?.closest=="function"?L.closest('.mon-card[data-lane="queue"]'):null,H=M&&U.contains(M)?Number(M.getAttribute("data-queue-index")):NaN;if(h.lane==="runnable"){let we=Number.isFinite(H)?H:h.place_index;if(!Number.isFinite(we))return;C("worker-queue-place",{bead_id:h.bead_id,index:we},h.root_dir,h.revision);return}if(h.lane!=="queue"||M&&M.getAttribute("data-issue-id")===h.bead_id)return;let q=h.queue_index,ge=Number.isFinite(H)?q>H?H:H-1:h.queue_length-1;!Number.isFinite(ge)||ge<0||ge===q||C("worker-queue-reorder",{bead_id:h.bead_id,to_index:ge},h.root_dir,h.revision)}function N(D){let U={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return i`${ml({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:y,done_range:_,token_total:hl(T.done),token_tooltip:gl(A())})}
      <div class="worker-lanes mon-lanes">
        ${zp.map(h=>{let L=U[h.lane],M=h.lane==="queue"?T.queue_groups.length>0?i`${T.queue_groups.map(H=>i`<div
                        class="mon-group"
                        data-root-dir=${H.root_dir}
                      >
                        ${_l(H)}
                        <div class="mon-group__list">
                          ${H.items.map(q=>bl(q,D))}
                        </div>
                      </div>`)}`:void 0:L.length>0?i`${L.map(H=>bl(H,D))}`:void 0;return Kt({id:`monitor-${h.lane}`,lane:h.pane,title:h.lane==="done"?`\uC644\uB8CC\xB7${A()}`:h.title,items:L,empty:h.empty,body:M,live:h.lane==="running"&&L.length>0,header_control:h.lane==="pr_wait"&&L.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ie(){let D=s&&s.get?s.get():null,U=s&&s.getWorkspacesState?s.getWorkspacesState():[],h=u();T=ho(D,U,{done_since:kr(_,h),running_sort:y}),qe(N(h),$)}function Fe(D,U){let h=l?l():void 0;if(!U||!h||U===h||!c){n(D);return}c(U).then(()=>{n(D)}).catch(L=>{r("workspace switch for %s failed: %o",U,L)})}function me(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function Oe(D,U){let{root_dir:h,revision:L}=me(D),M=D.getAttribute("data-issue-id")||"",H=U.dataset.attemptId||D.getAttribute("data-attempt-id")||"",q=U.classList;if(q.contains("worker-card__place")){C("worker-queue-place",{bead_id:M,index:Number(D.getAttribute("data-place-index")||0)||0},h,L);return}if(q.contains("mon-op--up")||q.contains("mon-op--down")){let ge=Number(D.getAttribute("data-queue-index")||0)||0,we=q.contains("mon-op--up")?ge-1:ge+1;if(we<0)return;C("worker-queue-reorder",{bead_id:M,to_index:we},h,L);return}if(q.contains("mon-op--remove")){C("worker-queue-remove",{bead_id:M},h,L);return}if(q.contains("mon-op--pause")){Pe("worker-attempt-pause",{attempt_id:H},h);return}if(q.contains("mon-op--discard")){if(!f(_n(M,"unmerged")))return;_e({bead_id:M,...H?{attempt_id:H}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},h,L);return}if(q.contains("mon-op--resume")){be("worker-attempt-resume",{attempt_id:H},h,L);return}if(q.contains("mon-op--dismiss")){C("worker-attempt-dismiss",{attempt_id:H},h,L);return}if(q.contains("worker-mini__merge")){let ge=le(h,M);ge?.mismatch&&ge.continuation===null?se(h,M,L,ge.mismatch):C("worker-merge-queue-add",{bead_id:M},h,L);return}if(q.contains("worker-mini__merge-cancel")){C("worker-merge-queue-remove",{bead_id:M},h,L);return}if(q.contains("worker-mini__discard")){let ge=U.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(_n(M,ge)))return;_e({bead_id:M,...H?{attempt_id:H}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},h,L);return}if(q.contains("worker-mini__revise-fix")){be("worker-revise-fix",{bead_id:M},h,L);return}q.contains("worker-mini__revise-approve")&&C("worker-revise-approve",{bead_id:M},h,L)}function Ee(D){let U=Ke;Ke=!1;let h=D.target;if(!h||typeof h.closest!="function"||h.closest("dialog")||h.closest("a"))return;let L=h.closest(".mon-running-sort");if(L){D.preventDefault(),y=L.getAttribute("data-sort")==="repo"?"repo":"started",Up(y),ie();return}let M=h.closest(".mon-auto-all");if(M){D.preventDefault(),tt(M.getAttribute("data-on")==="true");return}if(h.closest(".mon-merge-all")){D.preventDefault(),Ve();return}let q=h.closest(".mon-ctl--advance");if(q){D.preventDefault();let{root_dir:rt,revision:at}=me(q);C("worker-automation-toggle",{on:q.getAttribute("data-on")==="true"},rt,at);return}let ge=h.closest(".mon-ctl--merge-auto");if(ge){D.preventDefault();let{root_dir:rt,revision:at}=me(ge);C("worker-merge-auto-toggle",{on:ge.getAttribute("data-on")==="true"},rt,at);return}let we=h.closest(".mon-ctl--exec");if(we){D.preventDefault(),j=we.getAttribute("data-root-dir")||null,x.delete(j||""),O.open();return}let Ie=h.closest(".mon-card");if(!Ie)return;let Be=h.closest("button");if(Be){D.preventDefault(),Oe(Ie,Be);return}let pt=Ie.getAttribute("data-issue-id");pt&&!U&&(D.preventDefault(),Fe(pt,Ie.getAttribute("data-root-dir")||""))}function Ze(D){let U=D.target;if(!U||typeof U.closest!="function")return;let h=U.closest(".mon-done-range");if(h){_=Lt(h.value)?h.value:Tt,qp(_),ie();return}let L=U.closest(".mon-slots__input");if(!L)return;let{root_dir:M,revision:H}=me(L),q=Number(L.value);if(!Number.isFinite(q))return;let ge=Math.max(mn,Math.floor(q));C("worker-queue-set-slots",{slots:ge},M,H)}e.addEventListener("click",Ee),e.addEventListener("change",Ze),e.addEventListener("dragstart",G),e.addEventListener("dragover",fe),e.addEventListener("dragleave",X),e.addEventListener("drop",B),e.addEventListener("dragend",ke),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),ie();for(let D of Array.from(V))D()}catch{}}));function Re(){P!==null&&(clearInterval(P),P=null)}function Qe(){ye!==null&&(clearTimeout(ye),ye=null)}return{load(){r("load"),ie(),P===null&&(P=setInterval(()=>{try{ie()}catch{}},jp))},pause(){Re()},clear(){Re(),Qe(),S&&(S(),S=null),e.removeEventListener("click",Ee),e.removeEventListener("change",Ze),e.removeEventListener("dragstart",G),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",X),e.removeEventListener("drop",B),e.removeEventListener("dragend",ke),O.destroy(),V.clear(),e.replaceChildren()}}}function $l(e,t,r){let n=it("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){qe(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),qe(i``,e)}}}var xl=["bug","feature","task","epic","chore"];function Sl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Al=["Critical","High","Medium","Low","Backlog"];function Tl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let S of xl){let P=document.createElement("option");P.value=S,P.textContent=Sl(S),o.appendChild(P)}a.replaceChildren();for(let S=0;S<=4;S+=1){let P=document.createElement("option");P.value=String(S);let C=Al[S]||"Medium";P.textContent=`${S} \u2013 ${C}`,a.appendChild(P)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(O){s.disabled=O,o.disabled=O,a.disabled=O,l.disabled=O,c.disabled=O,f.disabled=O,_.disabled=O,_.textContent=O?"Creating\u2026":"Create"}function j(){u.textContent=""}function x(O){u.textContent=O}function V(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function J(){let O=o.value||"",S=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function z(){j();let O=String(s.value||"").trim();if(O.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let P=String(o.value||""),C=String(c.value||""),le={title:O};P.length>0&&(le.type=P),String(S).length>0&&(le.priority=S),C.length>0&&(le.description=C),T(!0);try{await t("create-issue",le)}catch{T(!1),x("Failed to create issue");return}J(),T(!1),$()}return r.addEventListener("cancel",O=>{O.preventDefault(),$()}),y.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),z())}),n.addEventListener("submit",O=>{O.preventDefault(),z()}),{open(){n.reset(),j(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Hp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function El(e){return String(e).padStart(2,"0")}function Wp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Gp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${El(n.getHours())}:${El(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Hp[n.getMonth()]} ${n.getDate()} ${o}`;return`${Wp(r,t)} \xB7 ${l}`}function Yp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Cl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Rl(e){let t=!1,r=null,n=new Map;function s(){qe(i``,e),e.hidden=!0}function o(){let c=Cl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();qe(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),y=typeof _.ageSeconds=="number"&&_.ageSeconds>600,A=y?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${y?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map($=>{let T=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,j=Math.min(100,Math.max(0,T)),V=`resets ${Gp($.resetsAt,u)}${y?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${Yp(j)}"
                style=${`--progress: ${j}%`}
                title=${V}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${j}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Cl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Vp="worker-ineligible";function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Il(e){return vo(e).includes(Vp)}var wo="worker-serial";function bn(e){return vo(e).includes(wo)}var Kp="tab:worker:ready",Zp="tab:worker:blocked",Xp="tab:worker:in-progress",Qp="tab:worker:closed",yn=1,Jp=new Set(["done","failed","orphaned","stopped","discarded"]);function Ll(e){return pn(e).path.length>0}var Ml="beads-ui.worker.candidate-filter",ko={show_blocked:!1,spec:"all"};function ef(){try{let e=window.localStorage.getItem(Ml);if(!e)return{...ko};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ko};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ko}}}function tf(e){try{window.localStorage.setItem(Ml,JSON.stringify(e))}catch{}}function rf(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var nf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Pl="bdui.worker.candidate_sort",sf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],is="spec";function of(){try{let e=window.localStorage.getItem(Pl);return e==="board"||e==="created"||e==="spec"?e:is}catch{return is}}function af(e){try{window.localStorage.setItem(Pl,e)}catch{}}var Nl="bdui.worker.done-range";function lf(){try{let e=window.localStorage.getItem(Nl);return Lt(e)?e:Tt}catch{return Tt}}function cf(e){try{window.localStorage.setItem(Nl,e)}catch{}}var df="(max-width: 640px)",Fl="beads-ui.worker.lane-collapsed",vn={queue:!0,done:!0};function uf(){try{let e=window.localStorage.getItem(Fl);if(!e)return{...vn};let t=JSON.parse(e);return!t||typeof t!="object"?{...vn}:{queue:typeof t.queue=="boolean"?t.queue:vn.queue,done:typeof t.done=="boolean"?t.done:vn.done}}catch{return{...vn}}}function pf(e){try{window.localStorage.setItem(Fl,JSON.stringify(e))}catch{}}function Ol(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function ff(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Rn(r)),t==="board"?n:[...n.filter(Ll),...n.filter(s=>!Ll(s))])}function _f(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function mf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function gf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var hf=["closed_unmerged","review","undecidable"],bf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function yf(e,t){for(let r of bf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var vf=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}];function wf(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=vf.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Dl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function kf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function $o(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function $f(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function xf(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,_=null,y=null,A={},$=!1,T=null,j=null){let x=!!c&&c.position>0,V=!!c?.continuation_action&&c.continuation_action.continuation===null,J=!!c&&c.active===!0,z=c&&c.failure||null,O=r[e]||null,S=O&&O.gate?O.gate:null,P=O&&O.pr?O.pr:null,C=$f(y),le=kf(c?c.resolution:null),be=[];l&&be.push("\uC138\uC158");let se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":le?le.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,_e=yf(l&&S&&S.tier==="closed_unmerged"?"\uB2EB\uD798":S&&S.gate_badge||"",se?null:o&&o.activity||null);se&&be.push(se),_e.label&&be.push(_e.label),S&&S.base_badge&&S.base_badge!==S.gate_badge&&be.push(S.base_badge),_&&be.push(_),n&&be.push("\uC815\uB9AC \uC2E4\uD328"),C&&be.push(C.badge),x&&!J&&be.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),z&&be.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Dl(z)}`),V&&be.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&be.push(`\uC790\uB3D9 \uC81C\uC678: ${Dl(f)}`);let Pe=!!S&&S.base_badge==="\uCDA9\uB3CC",tt=!!S&&S.enabled===!0,Ve=wf(o&&o.merge_progress?o.merge_progress.step:null),Ce=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",Ke=l&&!!S&&S.tier==="merged",ye=l&&Pe&&u===!1,pe=Vt(A,e,{external:l,merge_active:J||!!Ve,merge_queued:x,conflict_active:!!a,cleanup_active:!1,merged:!!n||S?.tier==="merged"}),ve=!!pe.operation,ce=T==="pending"||T==="failed"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uB300\uAE30":T==="running"&&typeof j=="string"?`\uBA38\uC9C0\uB428 \xB7 ${j.slice(0,8)} \uBC30\uD3EC\uC5D0 \uD3EC\uD568\uB428`:T==="succeeded"?"\uBA38\uC9C0\uB428 \xB7 \uBC30\uD3EC \uC644\uB8CC":null,K=!!n&&["repo_operations","deployment_request","deploy"].includes(n.step),G=!Ce&&(ce!==null||K);return{id:e,title:t,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":ce||(n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30"),draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:C?C.badge:null,completion_title:C?C.title:"",completion_repair_pr_url:C?C.repair_pr_url:"",completion_repair_pr_number:C?C.repair_pr_number:null,badges:be,live_badge:a==="paused"?null:le?.live||a==="running"?se:_e.live?_e.label:null,usage:s,alert:!!S&&hf.includes(S.tier)||!!n||!!z||!!(C&&C.alert),merge_action:G?!1:!x||V,cancel_action:x&&!V,cancel_enabled:!J&&!(C&&C.lock_actions),cancel_title:C&&C.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":J?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:pe,discard_action:pe.action,merge_step:Ve,discard_enabled:pe.enabled,discard_title:pe.title,merge_enabled:!Ve&&!a&&!ve&&!(C&&C.lock_actions)&&!ye&&!G&&(tt||Pe||Ce||Ke),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ce||Ke?"\uC815\uB9AC":Pe&&!Ve&&!Ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?pe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${pe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${pe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ve?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ve.label}`:Ke?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ye?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":tt?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,y=n?Ln(n,l):null,A=Dn({transport:r,uiOrderStore:l}),$=null,T=[],j=ef(),x=of(),V=Lt(f)?f:lf(),J=new Map;function z(){let p=Wt.find(k=>k.value===V);return p?p.label:"\uC624\uB298"}let O=uf(),S=!1,P=new Set,C=new Set,le=new Set,be="ordinary",se=!1,_e=new Map,Pe=[],tt=document.createElement("div");tt.className="worker-console";let Ve=document.createElement("div");Ve.className="worker-top";let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let Ke=document.createElement("div");Ke.className="worker-drawer-overlay__backdrop";let ye=document.createElement("div");ye.className="worker-drawer-host",Ce.append(Ke,ye);let pe=document.createElement("div");pe.className="worker-lanes-host",tt.append(Ve,Ce,pe),e.appendChild(tt);let ve=null,ce=es(ye,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Ce.hidden=!0,I()}}),K=ss(tt,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function G(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:yn,queue:[],pr_wait:[],done:[]}}function fe(){let p=G();return typeof p.revision=="number"?p.revision:0}function X(p){p&&p.queue&&s&&s.set(p.queue)}function ke(){let p=G().queue;return Array.isArray(p)?p.length:0}async function B(p,k){if(!r)return;let E=await r("worker-queue-place",{bead_id:p,index:k,expected_revision:fe()});X(E),E&&E.conflict&&await r("worker-queue-place",{bead_id:p,index:k,expected_revision:fe()}).then(X)}async function N(p,k){if(!r)return;let E=await r("worker-queue-reorder",{bead_id:p,to_index:k,expected_revision:fe()});X(E),E&&E.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:k,expected_revision:fe()}).then(X)}async function ie(p){if(!r)return;let k=await r("worker-queue-remove",{bead_id:p,expected_revision:fe()});X(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:fe()}).then(X)}async function Fe(){if(!r||se)return;let k=(Array.isArray(G().queue)?G().queue:[]).map(Y=>Y.bead_id).filter(Y=>le.has(Y));if(k.length===0)return;if(k.some(Y=>{let De=_e.get(Y);return De!==!0&&De!==!1})){Q("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let E=be==="serial",ee=k.filter(Y=>_e.get(Y)!==E);if(ee.length===0){le.clear(),I(),Q("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}se=!0,I();let de=[],he=0;try{for(let Y of ee){let De=await Promise.resolve(r(E?"label-add":"label-remove",{id:Y,label:wo})).catch(()=>[]),Me=Array.isArray(De)?De[0]:De,ot=Me&&typeof Me=="object"?Me.labels:null;Me&&typeof Me=="object"&&Me.id===Y&&Array.isArray(ot)&&bn(ot)===E?he+=1:de.push(Y)}if(de.length===0){le.clear(),Q(`${he}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}le.clear();for(let Y of de)le.add(Y);Q(`${ee.length}\uAC1C \uC911 ${he}\uAC1C \uBCC0\uACBD \xB7 ${de.length}\uAC1C \uC2E4\uD328 (${de.join(", ")})`,"error")}finally{se=!1,I()}}async function me(p){if(!r||!p)return;let k=await r("worker-attempt-pause",{attempt_id:p});k&&k.paused===!1&&k.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Oe(p){if(!r||!p)return;let k=async(ee={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:fe(),...ee}),E=await k();X(E),E&&E.conflict&&(E=await r("worker-attempt-resume",{attempt_id:p,expected_revision:fe()}),X(E)),E=await Yt(E,(ee,de)=>k({continuation:ee,decision_token:de}),{onResult:X,refresh:()=>k()}),E&&E.resumed===!1&&!E.conflict&&E.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}async function Ee(p){if(!r||!p)return;let k=async(ee={})=>await r("worker-deployment-recovery-continue",{attempt_id:p,expected_revision:fe(),...ee}),E=await k();X(E),E&&E.conflict&&(E=await k(),X(E)),E=await Yt(E,(ee,de)=>k({continuation:ee,decision_token:de}),{onResult:X,refresh:()=>k()}),E&&E.resumed===!1&&!E.conflict&&E.reason&&Q(`\uBCF5\uAD6C \uC774\uC5B4\uAC00\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}async function Ze(p){if(!r||!p)return;let k=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:fe()});X(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:fe()}),X(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Re(p,k,E=!0){if(!r)return null;let ee=r,de=await ee(p,{...k,expected_revision:fe()});return X(de),de&&de.conflict&&E&&(de=await ee(p,{...k,expected_revision:fe()}),X(de)),de}async function Qe(p){if(!r||!p)return;let k=G().merge_queue?.find(ee=>ee.bead_id===p)?.continuation_action;if(k?.mismatch&&k.continuation===null){await D(p,k.mismatch);return}P.add(p),I();let E;try{E=await Re("worker-merge-queue-add",{bead_id:p})}finally{P.delete(p),I()}!E||E.conflict||E.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function D(p,k){let E=await Yt({continuation_mismatch:k},(de,he)=>Re("worker-merge-queue-add",{bead_id:p,continuation:de,decision_token:he},!1)),ee=E?.queue?.merge_queue?.find(de=>de.bead_id===p)?.continuation_action;if(E?.applied!==!0&&ee?.continuation===null&&ee.mismatch){await D(p,ee.mismatch);return}E&&E.applied===!1&&!E.conflict&&Q("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function U(p){if(!r)return;let k=await Re("worker-merge-auto-toggle",{on:p});!k||k.conflict||Q(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function h(p){if(!r||!p)return;let k=await Re("worker-merge-queue-remove",{bead_id:p});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function L(){await Re("worker-merge-queue-remove",{all:!0})}async function M(p,k=null,E="unmerged",ee=null){if(!r||!p)return;let de=_n(p,E);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(de)))return;let Y=await r("worker-discard",{bead_id:p,...k?{attempt_id:k}:{},...ee?{operation_id:ee}:{},expected_revision:fe()});if(X(Y),Y&&Y.conflict&&(Y=await r("worker-discard",{bead_id:p,...k?{attempt_id:k}:{},...ee?{operation_id:ee}:{},expected_revision:fe()}),X(Y)),Y&&Y.discarded===!0){Q(os(Y),"success",5e3);return}if(Y&&Y.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${Y.reason}`,"error",2800);return}if(Y&&Y.accepted&&Y.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Y&&Y.accepted&&!Y.discarded){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${Y.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Y&&!Y.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(p,k){if(!r||!k||C.has(k))return;C.add(k),I();let E;try{let ee=async(de={})=>await r(p,{bead_id:k,expected_revision:fe(),...de});E=await ee(),X(E),E&&E.conflict&&(E=await r(p,{bead_id:k,expected_revision:fe()}),X(E)),p==="worker-revise-fix"&&(E=await Yt(E,(de,he)=>ee({continuation:de,decision_token:he}),{onResult:X,refresh:()=>ee()}))}finally{C.delete(k),I()}if(!(!E||E.conflict)){if(E.ok){Q(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function q(p){if(!r)return;let k=await r("worker-automation-toggle",{on:p,expected_revision:fe()});X(k),k&&k.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:fe()}).then(X)}async function ge(p){if(!r||!p)return;let k=await r("worker-repo-operation-repair",{operation_id:p});if(X(k),k&&k.ok===!1){Q(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&Q("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function we(p){if(!r||!Number.isFinite(p))return;let k=Math.max(yn,Math.floor(p)),E=await r("worker-queue-set-slots",{slots:k,expected_revision:fe()});X(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:fe()}).then(X)}async function Ie(p){if(!r)return;let k=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:fe()});X(k),k&&k.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:fe()}).then(X)}function Be(){let p=G(),k=y?y.selectBoardColumn(Kp,"ready"):[],E=y?y.selectBoardColumn(Zp,"blocked"):[],ee=y?y.selectBoardColumn(Qp,"closed"):[],de=y?y.selectBoardColumn(Xp,"in_progress"):[],he=new Map;for(let g of de){let F=mf(g);if(!F)continue;let re=he.get(F);re?re.push(g):he.set(F,[g])}let Y=g=>{let F=On(he.get(g)||[]);return F?F.title||F.id:null},De=p.bead_titles||{},Me=new Map;for(let[g,F]of Object.entries(De))typeof F=="string"&&F.length>0&&Me.set(g,F);for(let g of[...k,...E])Me.set(g.id,g.title||g.id);_e.clear();let ot=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},vt=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,F]of Object.entries(vt))Array.isArray(F)&&_e.set(g,bn(F));for(let g of[...k,...E]){let F=g.labels;if(!Array.isArray(F))continue;if(!_e.has(g.id)){_e.set(g.id,bn(F));continue}let re=ot[g.id],He=Jt(re&&typeof re=="object"?re.updated_at:null),Ht=Jt(g.updated_at);Ht!==null&&He!==null&&Ht>He&&_e.set(g.id,bn(F))}let gt=new Map;for(let[g,F]of Object.entries(ot))F&&typeof F=="object"&&gt.set(g,F);for(let g of[...k,...E])gt.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let ae=g=>gt.get(g)||{},w=p.pr_wait||[],W=p.pr_observations||{},ne=p.pr_activity||{},Le=p.cleanup_failed||{},et=Object.entries(Le).map(([g,F])=>({bead_id:g,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0})),je=p.queue||[],m=new Set(je.map(g=>g.bead_id));for(let g of le)m.has(g)||le.delete(g);let d=new Set([...je.map(g=>g.bead_id),...w.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),v=new Set(E.map(g=>g.id)),b=l?l.get()?.order||{}:{},R=new Set,te=[];for(let g of[...k,...E])d.has(g.id)||R.has(g.id)||_f(g)||Il(g.labels)||(R.add(g.id),te.push(g));T=ff(te,x,b);let xe=p.admission||{},ft=g=>{let F=xe[g];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let re=typeof F.reason=="string"?F.reason:"",He=re.indexOf(":");return He>0&&He<re.length-1?`\u26D4 ${re.slice(0,He)} (${re.slice(He+1)})`:`\u26D4 ${re}`},Ue=T.map(g=>{let F=pn(g),re=F.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",Ht=!He&&re&&!F.conflict,ar=v.has(g.id),It=[];ar&&It.push(gf(g)),He?It.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):F.conflict?It.push("spec_id_conflict"):re||It.push("spec \uC5C6\uC74C");let An=ft(g.id);return An&&It.push(An),{id:g.id,title:g.title||g.id,reason:It.join(" \xB7 "),draggable:Ht,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,blocked:ar,has_spec:re}}),zt=rf(Ue,j),ls=zt.visible,Zl=p.revise_parked||{},zr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Eo=(g,F)=>g.map(re=>{let He=F==="queue"?Zl[re.bead_id]:null,Ht=F==="queue"?Vt(zr,re.bead_id):null,ar=Ht?.operation?Ht:null,It=F==="queue"?_e.has(re.bead_id)?_e.get(re.bead_id)||!1:null:!1,An=It===!0&&(Object.values(p.attempts||{}).some(Xt=>Xt&&Xt.bead_id!==re.bead_id&&!Jp.has(Xt.status))||w.some(Xt=>Xt.bead_id!==re.bead_id)||Object.values(zr).some(Xt=>Xt&&Xt.bead_id!==re.bead_id&&Xt.phase!=="done")),Yo=F==="done"?[]:[ft(re.bead_id)];return An&&Yo.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:re.bead_id,title:Me.get(re.bead_id)||re.bead_id,reason:Yo.filter(Boolean).join(" \xB7 "),draggable:F!=="done"&&!ar,done:F==="done",lane:F,selectable:F==="queue",selected:F==="queue"&&le.has(re.bead_id),worker_serial:It,discard:ar,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!ar&&!C.has(re.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?Ot(p.attempts||{},re.bead_id):null,done_at:F==="done"&&typeof re.added_at=="number"?re.added_at:void 0,...ae(re.bead_id)}}),Co=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Co.set(g.bead_id,g.added_at);let Hr=p.attempts?Object.values(p.attempts):[],cs=new Set;for(let g of Hr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&cs.add(g.resumed_from);let ds=new Map;for(let g of Hr)ds.set(g.bead_id,g.attempt_id);let us=new Map;for(let g of Hr)us.set(g.attempt_id,g);function ps(g){let F=new Set,re=g;for(;re&&!F.has(re.attempt_id);){if(re.conflict_resolution===!0)return!0;F.add(re.attempt_id),re=typeof re.resumed_from=="string"&&re.resumed_from.length>0&&us.get(re.resumed_from)||null}return!1}let wn=typeof p.declared_base=="string"?p.declared_base:null;function Xl(g){let F=null;for(let re of Hr)!re||re.bead_id!==g||ps(re)||(F===null||(typeof re.started_at=="number"?re.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=re);return F&&typeof F.target_base=="string"?F.target_base:null}let Ro=[],Io=[],Ql=g=>{let F=ds.get(g.bead_id)!==g.attempt_id,re=Co.get(g.bead_id),He=typeof re=="number"&&re>0&&typeof g.finished_at=="number"&&re>=g.finished_at;return!F&&!He&&typeof g.dismissed_at!="number"},Lo=g=>{let F=typeof g.session_id=="string"&&g.session_id.length>0,re=cs.has(g.attempt_id);return{eligible:F&&!re,reason:F?re?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Mt=null;for(let g of Hr){let F=g.status==="paused"&&!cs.has(g.attempt_id);if(g.status==="running"||F)Io.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Me.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:F,conflict_resolution:ps(g),base_exception:$o(wn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Vt(zr,g.bead_id,{attempt_id:g.attempt_id}),usage:Ot(p.attempts||{},g.bead_id),current_child:Y(g.bead_id),...ae(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Ql(g)){let re=Lo(g);Ro.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Me.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Vt(zr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:re.eligible,resume_reason:re.reason,conflict_resolution:ps(g),base_exception:$o(wn,g.target_base),usage:Ot(p.attempts||{},g.bead_id),current_child:Y(g.bead_id),...ae(g.bead_id)}),Mt=g}}let kn=[...Ro,...Io],Oo=null;if(Mt){let g=Lo(Mt),F=Mt.cause_detail;Oo={bead_id:Mt.bead_id,repo:Mt.repo||"",reason:Mt.cause||Mt.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:Mt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Vt(zr,Mt.bead_id,{attempt_id:Mt.attempt_id})}}let Jl=new Set(kn.map(g=>g.bead_id)),fs=Array.isArray(p.merge_queue)?p.merge_queue:[],Do=new Map,Mo=new Map,Po=new Map;fs.forEach((g,F)=>{g&&typeof g.bead_id=="string"&&(Do.set(g.bead_id,F+1),Mo.set(g.bead_id,g.resolution),Po.set(g.bead_id,g.continuation_action||null))});let No=p.merge_queue_state||{active:null,failures:{}},ec=No.failures||{},tc=p.deployment_coverage&&typeof p.deployment_coverage=="object"&&!Array.isArray(p.deployment_coverage)?p.deployment_coverage:{},rc=p.deployment&&typeof p.deployment.desired_sha=="string"?p.deployment.desired_sha:null,nc=p.auto_merge_skips||{},Fo=g=>{let F=nc[g];if(!F)return null;let re=W[g],He=re&&re.pr?re.pr.head_sha:null;return He&&He===F.head_sha?F.reason||"":null},$n=new Map;for(let g of kn)g.failed!==!0&&g.conflict_resolution&&(g.paused?$n.has(g.bead_id)||$n.set(g.bead_id,"paused"):$n.set(g.bead_id,"running"));let qo=kn.filter(g=>!g.paused&&g.failed!==!0).length,Bo=(p.workspace_info||{}).slots,sc=typeof Bo=="number"?Bo:typeof p.slots=="number"?p.slots:yn,Uo=p.pr_wait_holds_slot===!0?yn:sc,oc=qo>Uo,xn=kr(V),ac=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>xn===void 0||typeof g.added_at!="number"||g.added_at>=xn).sort((g,F)=>(F.added_at||0)-(g.added_at||0)),Wr=Eo(ac,"done"),ic=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),jo=[],lc=u?.()||"";for(let g of ee){let F=Jt(g.closed_at);if(typeof g.id!="string"||ic.has(g.id)||F===null||xn!==void 0&&F<xn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let re=`${lc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=J.get(re);He===void 0&&r&&(J.set(re,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(Ht=>{let ar=Array.isArray(Ht)&&Ht.some(It=>ts(typeof It?.text=="string"?It.text:"")?.lane==="session");J.set(re,ar?"session":"not-session"),I()}).catch(()=>{J.set(re,"failed"),I()})),He==="session"&&jo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:F,created_at:g.created_at,updated_at:g.updated_at})}Wr.push(...jo),Wr.sort((g,F)=>(F.done_at||0)-(g.done_at||0));let Sn={};for(let g of er)Sn[g]=0;let zo=!1,Ho=0,_s=0,Wo=0;for(let g of Wr){let F=g.usage;if(F&&typeof F=="object"){let re=!1;for(let He of er)Number.isFinite(F[He])&&(Sn[He]+=F[He],zo=!0,re=!0);re&&(_s+=1,Number.isFinite(F.total_cost_usd)&&(Ho+=F.total_cost_usd,Wo+=1))}}_s>0&&Wo===_s&&(Sn.total_cost_usd=Ho);let Go=Wr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),cc=Go.length>0?ht(Bn(Go)):zo?Nt(Sn):null;return{queue:p,idToTitle:Me,candidates:ls,candidate_hidden:{blocked:zt.hidden_blocked,spec:zt.hidden_spec},running:kn,live_count:qo,slots:Uo,over_cap:oc,failure:Oo,waiting:Eo(je.filter(g=>!Jl.has(g.bead_id)),"queue"),pr_wait:w.map(g=>xf(g.bead_id,Me.get(g.bead_id)||g.bead_id,W,Le[g.bead_id]||null,Ot(p.attempts||{},g.bead_id),ne[g.bead_id]||(P.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$n.get(g.bead_id)||null,g.external===!0,{position:Do.get(g.bead_id)||0,active:No.active===g.bead_id,failure:ec[g.bead_id]||null,resolution:Mo.get(g.bead_id),continuation_action:Po.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Fo(g.bead_id):null,$o(wn,Xl(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},us.get(ds.get(g.bead_id)||"")?.worker_serial===!0,tc[g.bead_id]||null,rc)).map(g=>({...g,...ae(g.id)})),merge_queue_length:fs.length,merge_queue_running:fs.length>0,auto_excluded:w.map(g=>g.bead_id).filter(g=>Fo(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:wn,done:Wr,token_total:cc,cleanup_failures:et,deployment:p.deployment||null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function pt(p){let k=p.waiting.length>0?p.waiting[0].id:"\u2014",E=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ee=st(p),de=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",he=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${z()} 완료 <b>${p.done.length}</b></span
      >`,Y=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,De=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${yn}
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
      </button>`,Me=sl({failure:p.failure,cleanupFailures:p.cleanup_failures}),ot=tl(p.deployment),vt=el(p.repo_operations);return S?i`<div class="worker-ribbon">
          ${E} ${ee}
          <div class="worker-kpi worker-kpi--ribbon">${de}${he}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${De}</div>
          <div class="worker-kpi">${Y}</div>
        </div>
        ${ot}${vt}${Me}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${ee}${De}</div>
        <div class="worker-kpi">
          ${de}${he}${Y}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${z()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(gt=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${gt.tooltip}
                >${z()} 완료 · 누적 ${gt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${ot}${vt}${Me}`}function rt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let k=p.running.some(E=>!E.paused&&E.failed!==!0);return i`<section
      class="worker-now${k?" worker-pane--live":""}"
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
      ${p.running.length>0?_o(p.running,Date.now(),ve):""}
      ${p.pr_wait.map(E=>po(E))}
    </section>`}function at(p){let k=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${nf.map(E=>i`<button
              type="button"
              class="worker-filter__chip${j.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${j.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${k.spec>0?i`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function mt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${sf.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Rt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${V}
      >
        ${Wt.map(p=>i`<option value=${p.value} ?selected=${V===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function nt(){if(le.size===0)return"";let p=Array.from(le),k=p.some(E=>{let ee=_e.get(E);return ee!==!0&&ee!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${be}
        ?disabled=${se}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${k||se}
        title=${k?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":se?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function lt(p){let k=(p.queue.pr_wait||[]).filter(he=>he&&he.external!==!0&&typeof he.bead_id=="string"),E=new Set(p.running.filter(he=>!he.paused&&he.failed!==!0).map(he=>he.bead_id));for(let he of k)E.add(he.bead_id);let ee=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||k.length===0||p.waiting.length===0||E.size<p.slots),de=p.pr_wait.some(he=>he.worker_serial===!0);if(!(!ee&&!(de&&p.queue.auto_merge!==!0)))return i`${ee?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${de&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function st(p){let k=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(k)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(p.auto_excluded),ee=p.pr_wait.filter(de=>de.merge_action&&de.merge_enabled&&!E.has(de.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function ct(p){let k=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:mt(),controls:at(p)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${rt(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${nt()}${lt(p)}`,collapsible:!0,collapsed:O.queue,preview:Ol(p.waiting)})}
        ${k}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${z()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt(),collapsible:!0,collapsed:O.done,preview:Array.isArray(p.token_total)?p.token_total.map(E=>E.label).join(" \xB7 "):p.token_total||Ol(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${k}
      ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${nt()}${lt(p)}`})}
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(E=>!E.paused&&E.failed!==!0),body:_o(p.running,Date.now(),ve)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${z()} ${p.done.length}`,items:p.done,empty:`${z()} \uC644\uB8CC \uC5C6\uC74C`,controls:Rt()})}
    </div>`}function bt(p){O={...O,[p]:!O[p]},pf(O),I()}function I(){let p=Be();qe(pt(p),Ve),qe(ct(p),pe)}function Z(){let p=document.querySelector(".app-header");if(!p)return;let k=()=>{let E=Math.round(p.getBoundingClientRect().height);tt.style.setProperty("--worker-ribbon-top",`${E}px`)};if(k(),typeof ResizeObserver=="function"){let E=new ResizeObserver(k);E.observe(p),Pe.push(()=>E.disconnect())}else window.addEventListener("resize",k),Pe.push(()=>window.removeEventListener("resize",k))}function oe(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(df);S=!!p.matches;let k=E=>{let ee=!!(E&&typeof E.matches=="boolean"?E.matches:p.matches);ee!==S&&(S=ee,I())};typeof p.addEventListener=="function"?(p.addEventListener("change",k),Pe.push(()=>p.removeEventListener("change",k))):typeof p.addListener=="function"&&(p.addListener(k),Pe.push(()=>p.removeListener(k)))}function ue(p){let k=p.target,E=k?.closest?.(".worker-mini__grip"),ee=E?E.closest('.worker-mini[data-lane="queue"]'):k?.closest?.('.worker-card[draggable="true"]');if(!ee)return;let de=ee.dataset.beadId||"",he=ee.dataset.lane||"";$={bead_id:de,from_lane:he};try{p.dataTransfer?.setData("text/plain",de),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function $e(p){let k=p.target?.closest?.(".worker-pane");if(!k)return;let E=k.dataset.lane||"";E!=="candidate"&&E!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function Te(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function We(p,k){let E=T.find(Y=>Y.id===p);if(!E)return;let ee=T.filter(Y=>Y.id!==p),de=ee.length;if(k){let Y=k.dataset.beadId;if(Y===p)return;let De=ee.findIndex(Me=>Me.id===Y);De>=0&&(de=De)}let he=ee.slice();he.splice(de,0,E),A.applyReorder(p,he,de)}function Je(p){let k=p.target?.closest?.(".worker-pane");if(!k)return;p.preventDefault(),k.classList.remove("worker-pane--drag-over");let E=k.dataset.lane||"",ee=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",de=$?.from_lane||"";if($=null,!ee)return;let he=p.target?.closest?.(".worker-mini, .worker-card"),Y=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),De=Y.length;if(he){let Me=Y.indexOf(he);Me>=0&&(De=Me)}if(k.classList.contains("worker-pane--collapsed")&&(De=ke()),E==="candidate"){if(de==="candidate"){We(ee,he);return}de==="queue"&&ie(ee);return}E==="queue"&&(de==="queue"?N(ee,De):B(ee,De))}function Se(p){j=p,tf(p),I()}function Ge(p){x=p==="board"||p==="created"||p==="spec"?p:is,af(x),I()}function Ae(p){V=Lt(p)?p:Tt,cf(V),_?.(V),I()}function ut(p){let k=p.target?.closest?.(".worker-mini__select");if(k){let ot=k.dataset.beadId||"";ot&&(k.checked?le.add(ot):le.delete(ot),I());return}let E=p.target?.closest?.(".worker-bulk__mode");if(E){be=E.value==="serial"?"serial":"ordinary";return}let ee=p.target?.closest?.(".worker-filter__blocked");if(ee){Se({...j,show_blocked:ee.checked});return}let de=p.target?.closest?.(".worker-done-range");if(de){Ae(de.value);return}let he=p.target?.closest?.(".worker-sort");if(he){Ge(he.value||is);return}let Y=p.target?.closest?.(".worker-pr-wait-hold");if(Y){Ie(Y.checked);return}let De=p.target?.closest?.(".worker-slots__input");if(!De)return;let Me=Number.parseInt(De.value,10);if(!Number.isFinite(Me)){I();return}we(Me).then(I)}function yt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ut(p){let k=G(),E=k.attempts?k.attempts[p]:null;ve=p,Ce.hidden=!1,ce.open({attempt_id:p,meta:yt(E)}),I()}function Zt(){if(!ve)return;let p=G(),k=p.attempts?p.attempts[ve]:null;if(k){ce.updateMeta(yt(k));return}ce.close()}function jt(p){let k=p.target,E=k?.closest?.(".worker-bulk__apply");if(E){E.disabled||Fe();return}if(k?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){K.open();return}if(k?.closest?.(".worker-deployment-retry")){r&&Promise.resolve(r("worker-deployment-retry",{})).then(X);return}let ee=k?.closest?.(".worker-deployment-session");if(ee){let v=ee.dataset.attemptId;v&&Ut(v);return}let de=k?.closest?.(".worker-repo-op__session");if(de){let v=de.dataset.attemptId;v&&Ut(v);return}let he=k?.closest?.(".worker-repo-op__resolve");if(he){ge(he.dataset.operationId||"");return}let Y=k?.closest?.(".worker-deployment-continue");if(Y){let v=Y.dataset.attemptId;v&&Ee(v);return}let De=k?.closest?.(".worker-banner__resume");if(De){let v=De.dataset.attemptId;v&&Oe(v);return}let Me=k?.closest?.(".worker-banner__discard");if(Me){let v=Me.dataset.confirmation==="merged"?"merged":"unmerged";M(Me.dataset.beadId||"",Me.dataset.attemptId||null,v,Me.dataset.operationId||null);return}let ot=k?.closest?.(".worker-banner__dismiss");if(ot){let v=ot.dataset.attemptId;v&&Ze(v);return}if(k?.closest?.(".worker-play")){q(!G().auto_advance);return}let vt=k?.closest?.(".worker-merge-all");if(vt){vt.classList.contains("worker-merge-all--stop")?G().auto_merge===!0?U(!1):L():U(!0);return}let gt=k?.closest?.(".worker-pane__hd--toggle");if(gt){let v=gt.dataset.lane;(v==="queue"||v==="done")&&bt(v);return}let ae=k?.closest?.(".worker-card__place");if(ae){let v=ae.dataset.beadId;v&&!ae.disabled&&B(v,ke());return}let w=k?.closest?.(".worker-filter__chip");if(w){let v=w.dataset.spec;(v==="all"||v==="with"||v==="without")&&Se({...j,spec:v});return}let W=k?.closest?.(".worker-mini__merge");if(W){Qe(W.dataset.beadId||"");return}let ne=k?.closest?.(".worker-mini__merge-cancel");if(ne){h(ne.dataset.beadId||"");return}let Le=k?.closest?.(".worker-mini__discard");if(Le){M(Le.dataset.beadId||"",Le.dataset.attemptId||null,Le.dataset.discardMode==="merged"?"merged":"unmerged",Le.dataset.operationId||null);return}let et=k?.closest?.(".worker-mini__revise-fix");if(et){H("worker-revise-fix",et.dataset.beadId||"");return}let je=k?.closest?.(".worker-mini__revise-approve");if(je){H("worker-revise-approve",je.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let v=k?.closest?.(".rtile"),b=v?.dataset?.beadId,R=v?.dataset?.attemptId;b&&M(b,R||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let b=k?.closest?.(".rtile")?.dataset?.attemptId;b&&Ze(b);return}if(k?.closest?.(".rtile__pause")){let b=k?.closest?.(".rtile")?.dataset?.attemptId;b&&me(b);return}if(k?.closest?.(".rtile__resume")){let b=k?.closest?.(".rtile")?.dataset?.attemptId;b&&Oe(b);return}if(k?.closest?.(".rtile__session")){let b=k?.closest?.(".rtile")?.dataset?.attemptId;b&&Ut(b);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){ce.close();return}if(k?.closest?.(".worker-drawer-host"))return;let m=k?.closest?.(".rtile");if(m){if(k?.closest?.(".rtile__id")){let b=m.dataset.beadId;b&&Sr(b).then(R=>{R?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let v=m.dataset.beadId;v&&c&&c(v);return}let d=k?.closest?.(".worker-mini, .worker-card");if(d){let v=d.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){v&&Sr(v).then(b=>{b?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}v&&c&&c(v)}}return e.addEventListener("dragstart",ue),e.addEventListener("dragover",$e),e.addEventListener("dragleave",Te),e.addEventListener("drop",Je),e.addEventListener("click",jt),e.addEventListener("change",ut),oe(),Z(),y&&Pe.push(y.subscribe(()=>{for(let[p,k]of J)k==="failed"&&J.delete(p);I()})),s&&Pe.push(s.subscribe(()=>{I(),Zt()})),I(),{load(){I()},openExecDefaults(){K.open()},destroy(){for(let p of Pe.splice(0))try{p()}catch{}e.removeEventListener("dragstart",ue),e.removeEventListener("dragover",$e),e.removeEventListener("dragleave",Te),e.removeEventListener("drop",Je),e.removeEventListener("click",jt),e.removeEventListener("change",ut);try{ce.destroy()}catch{}Ce.hidden=!0;try{K.destroy()}catch{}qe(i``,e)}}}function So(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ql(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(S){let C=S.target.value,be=t.getState().workspace?.current?.path||"";if(C&&C!==be){o("switching workspace to %s",C),l=!0,O();try{await r(C)}catch(se){o("workspace switch failed: %o",se)}finally{l=!1,O()}}}async function _(){let S=t.getState(),P=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!P||c)){o("git-pulling workspace %s",P),c=!0,O();try{await n(P)}catch(C){o("workspace git pull failed: %o",C)}finally{c=!1,O()}}}function y(S){let P=S.target;P&&e.contains(P)||T()}function A(S){S.key==="Escape"&&T()}function $(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",A),O())}function T(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),O())}function j(){u?T():$()}async function x(S){let P=S.target,C=P.value,le=P.checked;o("toggling visibility %s \u2192 %s",C,String(le));try{await s(C,le)}catch(be){o("workspace visibility toggle failed: %o",be)}}function V(S){return S?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function J(S,P){return i`
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
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(C=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${C.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${C.path}"
                        .checked=${!P.has(C.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${So(C.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function z(){let S=t.getState(),P=S.workspace?.current,C=S.workspace?.available||[],le=new Set(S.workspace?.hidden||[]),be=P?.path||C[0]?.path||"";if(C.length===0)return i``;let se=C.filter(_e=>!le.has(_e.path)||_e.path===be);if(se.length<=1){let _e=se[0]||C[0],Pe=So(_e.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${Pe}</span
          >
          ${J(C,le)}
          ${V(be)}
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
          ${se.map(_e=>i`
              <option
                value="${_e.path}"
                ?selected=${_e.path===be}
                title="${_e.path}"
              >
                ${So(_e.path)}
              </option>
            `)}
        </select>
        ${J(C,le)}
        ${V(be)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){qe(z(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",A),qe(i``,e)}}}var Bl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-queue-set-slots","worker-deployment-retry","worker-deployment-recovery-continue","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Ao(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ul(e,t,r=Ao()){return{id:r,type:e,payload:t}}function jl(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],_=new Map,y=new Set;function A(z){for(let O of Array.from(y))try{O(z)}catch{}}function $(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let z=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*z,S=Math.max(0,Math.round(z+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,J()},S)}function T(z){try{s?.send(JSON.stringify(z))}catch(O){t("ws send failed",O)}}function j(){for(o="open",t("ws open"),A(o),a=0;f.length;){let z=f.shift();z&&T(z)}}function x(z){let O;try{O=JSON.parse(String(z.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let P=u.get(O.id);u.delete(O.id),O.ok?P?.resolve(O.payload):P?.reject(O.error||new Error("ws error"));return}let S=_.get(O.type);if(S&&S.size>0)for(let P of Array.from(S))try{P(O.payload)}catch(C){t("ws event handler error",C)}else t("ws received unhandled message type: %s",O.type)}function V(){o="closed",t("ws closed"),A(o);for(let[z,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(z);a+=1,$()}function J(){if(!c)return;let z=n();try{s=new WebSocket(z),t("ws connecting %s",z),o="connecting",A(o),s.addEventListener("open",j),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(O){t("ws connect failed %o",O),$()}}return J(),{send(z,O){if(!Bl.includes(z))return Promise.reject(new Error(`unknown message type: ${z}`));let S=Ao(),P=Ul(z,O,S);return t("send %s id=%s",z,S),new Promise((C,le)=>{u.set(S,{resolve:C,reject:le,type:z}),s&&s.readyState===s.OPEN?T(P):(t("queue %s id=%s (state=%s)",z,S,o),f.push(P))})},on(z,O){_.has(z)||_.set(z,new Set);let S=_.get(z);return S?.add(O),()=>{S?.delete(O)}},onConnection(z){return y.add(z),()=>{y.delete(z)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,J()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Sf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Af(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var To=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],zl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Tf="bdui.worker.done-range",Hl=wl,Wl="worker:queue",Gl="ui:order",Yl="ui:display-policy",Vl="exec:presets",hr="tab:board:closed",Kl="beads-ui.board.closed-range";function Ef(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Rl(s),o&&a&&l&&c){let ye=function(m,d){let v="Request failed",b="";if(m&&typeof m=="object"){let te=m;if(typeof te.message=="string"&&te.message.length>0&&(v=te.message),typeof te.details=="string")b=te.details;else if(te.details&&typeof te.details=="object")try{b=JSON.stringify(te.details,null,2)}catch{b=""}}else typeof m=="string"&&m.length>0&&(v=m);let R=d&&d.length>0?`Failed to load ${d}`:"Request failed";Ke.open(R,v,b)},D=function(m){return`${Y.getState().workspace.current?.path||""}\0${m}`},U=function(){ie&&(ie().catch(()=>{}),ie=null),Fe=null,me=null},L=function(m){Oe=m;let d=()=>{Oe!==m||Y.getState().selected_id!==m||(Oe=null,h(m))};if(!Re){Ze.then(d);return}d()},ge=function(m,d,v,b,R){return v!==q[d]?(R().catch(()=>{}),!1):(m.set(b,R),!0)},we=function(){let m=Y.getState();at(m.view==="board"),ct(m.view==="worker"),ue(m.view==="monitor"),I(m.view==="board"||m.view==="worker"||!!m.selected_id)},pt=function(){let m=kr(Ie);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},rt=function(){let m=kr(Be);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},at=function(m){if(m)for(let[d,v]of To){if(M.has(d)||H.has(d))continue;let b=d===hr?pt():{type:v};try{K.register(d,b)}catch(xe){t("register %s store failed: %o",d,xe)}H.add(d);let R=q.board,te=!1;ce.subscribeList(d,b).then(xe=>{te=!ge(M,"board",R,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),ye(xe,"board")}).finally(()=>{H.delete(d),te&&we()})}else nt()},nt=function(){q.board+=1;for(let[m]of To){let d=M.get(m);d&&(d().catch(()=>{}),M.delete(m));try{K.unregister(m)}catch(v){t("unregister %s failed: %o",m,v)}}},ct=function(m){if(!m){bt();return}for(let[d,v]of zl){if(lt.has(d)||H.has(d))continue;let b=d===gr?rt():{type:v};try{K.register(d,b)}catch(xe){t("register %s store failed: %o",d,xe)}H.add(d);let R=q.worker,te=!1;ce.subscribeList(d,b).then(xe=>{te=!ge(lt,"worker",R,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),ye(xe,"worker")}).finally(()=>{H.delete(d),te&&we()})}},bt=function(){q.worker+=1;for(let[m]of zl){let d=lt.get(m);d&&(d().catch(()=>{}),lt.delete(m));try{K.unregister(m)}catch(v){t("unregister %s failed: %o",m,v)}}},I=function(m){if(!m){Z();return}st||(ve("subscribe-worker-queue",{id:Wl}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),st=()=>ve("unsubscribe-worker-queue",{id:Wl}))},Z=function(){st&&(st().catch(()=>{}),st=null)},ue=function(m){if(!m){$e();return}oe||(ve("subscribe-monitor-pipeline",{id:Hl}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),oe=()=>ve("unsubscribe-monitor-pipeline",{id:Hl}))},$e=function(){oe&&(oe().catch(()=>{}),oe=null)},We=function(){Te||(ve("subscribe-ui-order",{id:Gl}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Te=()=>ve("unsubscribe-ui-order",{id:Gl}))},Je=function(){Te&&(Te().catch(()=>{}),Te=null),X.clear()},Ge=function(){Se||(ve("subscribe-display-policy",{id:Yl}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),Se=()=>ve("unsubscribe-display-policy",{id:Yl}))},Ae=function(){Se&&(Se().catch(()=>{}),Se=null),ke.clear()},yt=function(){ut||(ve("subscribe-exec-presets",{id:Vl}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),ut=()=>ve("unsubscribe-exec-presets",{id:Vl}))},E=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=ye,f=D,_=U,y=L,A=ge,$=we,T=pt,j=rt,x=at,V=nt,J=ct,z=bt,O=I,S=Z,P=ue,C=$e,le=We,be=Je,se=Ge,_e=Ae,Pe=yt,tt=E;let Ve=document.getElementById("header-loading"),Ce=Ea(Ve),Ke=Zi(e),pe=jl(),ve=Ce.wrapSend((m,d)=>pe.send(m,d)),ce=wa(ve),K=ka(),G=xa(),fe=aa(),X=$a(),ke=sa(),B=oa(),N=ia();pe.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&B.set({revision:d.revision,presets:d.presets})}),pe.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{fe.set(d.workspaces,d.workspaces_state)}catch{}}),pe.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{X.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),pe.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{ke.set(d.policy)}catch{}}),pe.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{N.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),pe.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{N.append(d.attempt_id,d.event)}catch{}}),pe.on("snapshot",m=>{let d=m,v=d&&typeof d.id=="string"?d.id:"",b=v?K.getStore(v):null;if(b&&d&&d.type==="snapshot")try{b.applyPush(d)}catch{}}),pe.on("upsert",m=>{let d=m,v=d&&typeof d.id=="string"?d.id:"",b=v?K.getStore(v):null;if(b&&d&&d.type==="upsert")try{b.applyPush(d)}catch{}}),pe.on("delete",m=>{let d=m,v=d&&typeof d.id=="string"?d.id:"",b=v?K.getStore(v):null;if(b&&d&&d.type==="delete")try{b.applyPush(d)}catch{}});let ie=null,Fe=null,me=null,Oe=null,Ee=()=>{},Ze=new Promise(m=>{Ee=()=>m(void 0)}),Re=!1,Qe=!1;async function h(m){let d=D(m);if(d===Fe||d===me)return;me=d;let v=`detail:${m}`,b={type:"issue-detail",params:{id:m}};try{K.register(v,b)}catch(R){t("register detail store failed: %o",R)}try{let R=await ce.subscribeList(v,b);if(Y.getState().selected_id!==m||D(m)!==d){await R().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=R,Fe=d}catch(R){t("detail subscribe failed: %o",R),ye(R,"issue details")}finally{me===d&&(me=null)}}let M=new Map,H=new Set,q={board:0,worker:0},Ie=Tt;try{let m=window.localStorage.getItem(Kl);Lt(m)&&(Ie=m)}catch{}let Be=Tt;try{let m=window.localStorage.getItem(Tf);Lt(m)&&(Be=m)}catch{}async function mt(m){if(!Lt(m)||m===Ie)return;Ie=m;try{window.localStorage.setItem(Kl,m)}catch{}let d=M.get(hr);if(!d)return;M.delete(hr),await d().catch(()=>{});let v=pt();try{K.register(hr,v)}catch(b){t("register %s store failed: %o",hr,b)}try{let b=await ce.subscribeList(hr,v);M.set(hr,b)}catch(b){t("re-subscribe %s failed: %o",hr,b),ye(b,"board")}}async function Rt(m){if(!Lt(m)||m===Be)return;Be=m;let d=lt.get(gr);if(!d)return;lt.delete(gr),await d().catch(()=>{});let v=rt();try{K.register(gr,v)}catch(b){t("register %s store failed: %o",gr,b)}try{let b=await ce.subscribeList(gr,v);lt.set(gr,b)}catch(b){t("re-subscribe %s failed: %o",gr,b),ye(b,"worker")}}let lt=new Map,st=null,oe=null,Te=null,Se=null,ut=null;async function Ut(){Se=null,ke.clear(),ut=null,B.clear(),st=null,oe=null,M.clear(),lt.clear(),q.board+=1,q.worker+=1,yt();let m=Y.getState().workspace.current?.path;if(m)try{await pe.send("set-workspace",{path:m})}catch(v){t("workspace restore after reconnect failed: %o",v);return}Ge();let d=Y.getState();at(d.view==="board"),ct(d.view==="worker"),ue(d.view==="monitor"),I(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Zt(){t("clearing all subscriptions for workspace switch"),nt(),bt(),Z(),G.clear(),Je(),We(),Ae(),Ge(),U();let m=Y.getState();if(m.selected_id)try{K.unregister(`detail:${m.selected_id}`)}catch{}let d=Y.getState();at(d.view==="board"),ct(d.view==="worker"),ue(d.view==="monitor"),I(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&L(d.selected_id)}async function jt(m){t("requesting workspace switch to %s",m),Qe=!0;try{let d=await pe.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(Y.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await Zt(),Q("Switched to "+E(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Q("Failed to switch workspace","error",3e3),d}finally{Qe=!1}}async function p(m){t("requesting workspace git pull for %s",m);try{let d=await pe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let v=d?.status;if(v==="up_to_date"){Q("Already up to date","success",2e3);return}if(v==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+E(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let v=d?.code,b=d?.message;if(v==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(v==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(v==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let R=b?`: ${b}`:"";throw Q(`Git pull failed${R}`,"error",3e3),d}}async function k(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await pe.send("set-workspace-visibility",{path:m,visible:d}),await ee()}catch(v){t("workspace visibility update failed: %o",v),Q("Failed to update project visibility","error",3e3)}}async function ee(){try{let m=await pe.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(te=>({path:te.path,database:te.database,pid:te.pid,version:te.version})),v=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,b=Array.isArray(m.hidden)?m.hidden.filter(te=>typeof te=="string"):[];Y.setState({workspace:{current:v,available:d,hidden:b}});let R=window.localStorage.getItem("beads-ui.workspace");R&&(!d.some(xe=>xe.path===R)||b.includes(R)?window.localStorage.removeItem("beads-ui.workspace"):v&&R!==v.path&&(t("restoring saved workspace preference: %s",R),await jt(R)))}}catch(m){t("failed to load workspaces: %o",m)}}pe.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(Y.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),ee(),Zt())});let de=!1;if(typeof pe.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(de=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&de&&(de=!1,Q("Reconnected","success",2200),Af(Y,(v,b)=>{t(`${v}: %o`,b)}),Ut())};pe.onConnection(m)}let he="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(he=m)}catch(m){t("view parse error: %o",m)}let Y=Ta({config:Sf(),view:he});pe.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let v=Y.getState().workspace.current?.path;if(typeof v=="string"&&v.length>0&&d.root_dir!==v){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{let b=d.queue?.deployment?.notifications;if(Array.isArray(b))for(let R of b)R&&typeof R.key=="string"&&typeof R.text=="string"&&(R.variant==="success"||R.variant==="warning"||R.variant==="info")&&Ca(R.key,R.text,R.variant);G.set(d.queue)}catch{}});let De=Sa(Y);De.start();let Me=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ot=async(m,d)=>{try{return await ve(m,d)}catch(v){if(Me.has(m))throw v;return[]}};n&&$l(n,Y,De);let vt=document.getElementById("workspace-picker");vt&&ql(vt,Y,jt,p,k);let gt=Tl(e,(m,d)=>ve(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>gt.open())}catch{}let ae=Ki(e,{policyStore:ke,transport:(m,d)=>ve(m,d),labelOptions:()=>{let m=new Set;for(let[d]of To)for(let v of K.snapshotFor(d)||[]){let b=v.labels;if(Array.isArray(b))for(let R of b)typeof R=="string"&&R.length>0&&m.add(R)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>ae.open())}catch{}let w=Fa(o,{gotoIssue:m=>De.gotoIssue(m),issueStores:K,transport:ot,workerQueueStore:G,uiOrderStore:X,displayPolicyStore:ke,closedRange:Ie,onClosedRangeChange:m=>{mt(m)},onNewIssue:()=>gt.open()}),W=xo(a,{transport:ot,issueStores:K,queueStore:G,execPresetStore:B,sessionLogStore:N,uiOrderStore:X,gotoIssue:m=>Y.setState({selected_id:m}),getWorkspacePath:()=>Y.getState().workspace.current?.path,doneRange:Be,onDoneRangeChange:m=>{Rt(m)}}),ne=kl(l,{transport:ot,pipelineStore:fe,execPresetStore:B,gotoIssue:m=>De.gotoIssue(m),getWorkspacePath:()=>Y.getState().workspace.current?.path,switchWorkspace:m=>jt(m)}),Le=Yi(c,{issueStores:K,transport:ot,queueStore:G,execPresetStore:B,sessionLogStore:N,getWorkspacePath:()=>Y.getState().workspace.current?.path,onNavigate:m=>{Y.getState().view==="worker"?Y.setState({selected_id:m}):De.gotoIssue(m)},onClose:()=>{let m=Y.getState();Y.setState({selected_id:null});try{De.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{Y.setState({selected_id:null}),De.gotoView("worker"),W.openExecDefaults()}}),et=Y.getState().selected_id;et&&(c.hidden=!1,Le.load(et),L(et)),Y.subscribe(m=>{let d=m.selected_id;d?(c.hidden=!1,Le.load(d),Qe||L(d)):(Le.clear(),c.hidden=!0,U())});let je=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",l.hidden=m.view!=="monitor",at(m.view==="board"),ct(m.view==="worker"),ue(m.view==="monitor"),I(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&w.load(),m.view==="worker"&&W.load(),m.view==="monitor"?ne.load():ne.pause(),window.localStorage.setItem("beads-ui.view",m.view)};Y.subscribe(je),je(Y.getState()),We(),Ge(),yt(),ee().finally(()=>{Re=!0,Ee()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,v=String(m.key||"").toLowerCase(),b=m.target,R=b&&b.tagName?String(b.tagName).toLowerCase():"",te=R==="input"||R==="textarea"||R==="select"||b&&typeof b.isContentEditable=="boolean"&&b.isContentEditable;d&&v==="n"&&(te||(m.preventDefault(),gt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Ef(t)});export{Ef as bootstrap,Sf as readBootstrapConfig,Af as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
