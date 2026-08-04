var ki=Object.create;var Sr=Object.defineProperty;var yi=Object.getOwnPropertyDescriptor;var $i=Object.getOwnPropertyNames;var xi=Object.getPrototypeOf,Si=Object.prototype.hasOwnProperty;var Ai=(e,t,n)=>t in e?Sr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ar=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ti=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of $i(t))!Si.call(e,s)&&s!==n&&Sr(e,s,{get:()=>t[s],enumerable:!(r=yi(t,s))||r.enumerable});return e};var Ei=(e,t,n)=>(n=e!=null?ki(xi(e)):{},Ti(t||!e||!e.__esModule?Sr(n,"default",{value:e,enumerable:!0}):n,e));var qe=(e,t,n)=>Ai(e,typeof t!="symbol"?t+"":t,n);var ro=Ar((iu,no)=>{var dn=1e3,un=dn*60,pn=un*60,Zt=pn*24,Di=Zt*7,Oi=Zt*365.25;no.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Mi(e);if(n==="number"&&isFinite(e))return t.long?Pi(e):Ni(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Mi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Oi;case"weeks":case"week":case"w":return n*Di;case"days":case"day":case"d":return n*Zt;case"hours":case"hour":case"hrs":case"hr":case"h":return n*pn;case"minutes":case"minute":case"mins":case"min":case"m":return n*un;case"seconds":case"second":case"secs":case"sec":case"s":return n*dn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ni(e){var t=Math.abs(e);return t>=Zt?Math.round(e/Zt)+"d":t>=pn?Math.round(e/pn)+"h":t>=un?Math.round(e/un)+"m":t>=dn?Math.round(e/dn)+"s":e+"ms"}function Pi(e){var t=Math.abs(e);return t>=Zt?Zn(e,t,Zt,"day"):t>=pn?Zn(e,t,pn,"hour"):t>=un?Zn(e,t,un,"minute"):t>=dn?Zn(e,t,dn,"second"):e+" ms"}function Zn(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var oo=Ar((lu,so)=>{function Fi(e){n.debug=n,n.default=n,n.coerce=i,n.disable=a,n.enable=s,n.enabled=l,n.humanize=ro(),n.destroy=d,Object.keys(e).forEach(f=>{n[f]=e[f]}),n.names=[],n.skips=[],n.formatters={};function t(f){let _=0;for(let m=0;m<f.length;m++)_=(_<<5)-_+f.charCodeAt(m),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(f){let _,m=null,y,$;function g(...L){if(!g.enabled)return;let z=g,H=Number(new Date),j=H-(_||H);z.diff=j,z.prev=_,z.curr=H,_=H,L[0]=n.coerce(L[0]),typeof L[0]!="string"&&L.unshift("%O");let P=0;L[0]=L[0].replace(/%([a-zA-Z%])/g,(S,O)=>{if(S==="%%")return"%";P++;let x=n.formatters[O];if(typeof x=="function"){let G=L[P];S=x.call(z,G),L.splice(P,1),P--}return S}),n.formatArgs.call(z,L),(z.log||n.log).apply(z,L)}return g.namespace=f,g.useColors=n.useColors(),g.color=n.selectColor(f),g.extend=r,g.destroy=n.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(y!==n.namespaces&&(y=n.namespaces,$=n.enabled(f)),$),set:L=>{m=L}}),typeof n.init=="function"&&n.init(g),g}function r(f,_){let m=n(this.namespace+(typeof _>"u"?":":_)+f);return m.log=this.log,m}function s(f){n.save(f),n.namespaces=f,n.names=[],n.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of _)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function o(f,_){let m=0,y=0,$=-1,g=0;for(;m<f.length;)if(y<_.length&&(_[y]===f[m]||_[y]==="*"))_[y]==="*"?($=y,g=m,y++):(m++,y++);else if($!==-1)y=$+1,g++,m=g;else return!1;for(;y<_.length&&_[y]==="*";)y++;return y===_.length}function a(){let f=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),f}function l(f){for(let _ of n.skips)if(o(f,_))return!1;for(let _ of n.names)if(o(f,_))return!0;return!1}function i(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}so.exports=Fi});var ao=Ar((gt,Xn)=>{gt.formatArgs=Bi;gt.save=Ui;gt.load=zi;gt.useColors=qi;gt.storage=Hi();gt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();gt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function qi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Bi(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Xn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}gt.log=console.debug||console.log||(()=>{});function Ui(e){try{e?gt.storage.setItem("debug",e):gt.storage.removeItem("debug")}catch{}}function zi(){let e;try{e=gt.storage.getItem("debug")||gt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Hi(){try{return localStorage}catch{}}Xn.exports=oo()(gt);var{formatters:Wi}=Xn.exports;Wi.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var kn=globalThis,Kn=kn.trustedTypes,Hs=Kn?Kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ks="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Zs="?"+Ut,Ci=`<${Zs}>`,Vt=document,yn=()=>Vt.createComment(""),$n=e=>e===null||typeof e!="object"&&typeof e!="function",Dr=Array.isArray,Ri=e=>Dr(e)||typeof e?.[Symbol.iterator]=="function",Tr=`[ 	
\f\r]`,wn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ws=/-->/g,Gs=/>/g,jt=RegExp(`>|${Tr}(?:([^\\s"'>=/]+)(${Tr}*=${Tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),js=/'/g,Ys=/"/g,Xs=/^(?:script|style|textarea|title)$/i,Or=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Or(1),Ot=Or(2),tu=Or(3),Kt=Symbol.for("lit-noChange"),Ve=Symbol.for("lit-nothing"),Vs=new WeakMap,Yt=Vt.createTreeWalker(Vt,129);function Qs(e,t){if(!Dr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Hs!==void 0?Hs.createHTML(t):t}var Li=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=wn;for(let l=0;l<n;l++){let i=e[l],d,f,_=-1,m=0;for(;m<i.length&&(a.lastIndex=m,f=a.exec(i),f!==null);)m=a.lastIndex,a===wn?f[1]==="!--"?a=Ws:f[1]!==void 0?a=Gs:f[2]!==void 0?(Xs.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=jt):f[3]!==void 0&&(a=jt):a===jt?f[0]===">"?(a=s??wn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?jt:f[3]==='"'?Ys:js):a===Ys||a===js?a=jt:a===Ws||a===Gs?a=wn:(a=jt,s=void 0);let y=a===jt&&e[l+1].startsWith("/>")?" ":"";o+=a===wn?i+Ci:_>=0?(r.push(d),i.slice(0,_)+Ks+i.slice(_)+Ut+y):i+Ut+(_===-2?l:y)}return[Qs(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},xn=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,l=t.length-1,i=this.parts,[d,f]=Li(t,n);if(this.el=e.createElement(d,r),Yt.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Yt.nextNode())!==null&&i.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Ks)){let m=f[a++],y=s.getAttribute(_).split(Ut),$=/([.?@])?(.*)/.exec(m);i.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Cr:$[1]==="?"?Rr:$[1]==="@"?Lr:ln}),s.removeAttribute(_)}else _.startsWith(Ut)&&(i.push({type:6,index:o}),s.removeAttribute(_));if(Xs.test(s.tagName)){let _=s.textContent.split(Ut),m=_.length-1;if(m>0){s.textContent=Kn?Kn.emptyScript:"";for(let y=0;y<m;y++)s.append(_[y],yn()),Yt.nextNode(),i.push({type:2,index:++o});s.append(_[m],yn())}}}else if(s.nodeType===8)if(s.data===Zs)i.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Ut,_+1))!==-1;)i.push({type:7,index:o}),_+=Ut.length-1}o++}}static createElement(t,n){let r=Vt.createElement("template");return r.innerHTML=t,r}};function an(e,t,n=e,r){if(t===Kt)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=$n(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=an(e,s._$AS(e,t.values),s,r)),t}var Er=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Vt).importNode(n,!0);Yt.currentNode=s;let o=Yt.nextNode(),a=0,l=0,i=r[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Sn(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Ir(o,this,t)),this._$AV.push(d),i=r[++l]}a!==i?.index&&(o=Yt.nextNode(),a++)}return Yt.currentNode=Vt,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ve,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=an(this,t,n),$n(t)?t===Ve||t==null||t===""?(this._$AH!==Ve&&this._$AR(),this._$AH=Ve):t!==this._$AH&&t!==Kt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ri(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ve&&$n(this._$AH)?this._$AA.nextSibling.data=t:this.T(Vt.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=xn.createElement(Qs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Er(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Vs.get(t.strings);return n===void 0&&Vs.set(t.strings,n=new xn(t)),n}k(t){Dr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(yn()),this.O(yn()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ln=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ve,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ve}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=an(this,t,n,0),a=!$n(t)||t!==this._$AH&&t!==Kt,a&&(this._$AH=t);else{let l=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=an(this,l[r+i],n,i),d===Kt&&(d=this._$AH[i]),a||(a=!$n(d)||d!==this._$AH[i]),d===Ve?t=Ve:t!==Ve&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Cr=class extends ln{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ve?void 0:t}},Rr=class extends ln{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ve)}},Lr=class extends ln{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=an(this,t,n,0)??Ve)===Kt)return;let r=this._$AH,s=t===Ve&&r!==Ve||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ve&&(r===Ve||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ir=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){an(this,t)}};var Ii=kn.litHtmlPolyfillSupport;Ii?.(xn,Sn),(kn.litHtmlVersions??(kn.litHtmlVersions=[])).push("3.3.1");var Le=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Sn(t.insertBefore(yn(),o),o,void 0,n??{})}return s._$AI(e),s};var wt="today",Ct=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function cn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Js(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function eo(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function to(){let e=new Map,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{set(r,s,o=null){e.set(r,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),n()},append(r,s){let o=e.get(r)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(r,o),n()},get(r){return e.get(r)||null},clear(r){typeof r=="string"?e.delete(r):e.clear(),n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}var io=Ei(ao(),1);function Ge(e){return(0,io.default)(`beads-ui:${e}`)}function yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Xt(e,t){let n=yt(e.created_at),r=yt(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function uo(e,t){let n=yt(e.created_at),r=yt(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function po(e,t){let n=yt(e.updated_at),r=yt(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function fo(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yt(e.created_at),o=yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function _o(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Gi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function lo(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function co(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Gi.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ho(e,t){let n=lo(e),r=lo(t);if(n!==r)return n<r?-1:1;let s=co(e),o=co(t);if(s!==o)return s<o?-1:1;let a=yt(e&&e.created_at),l=yt(t&&t.created_at);if(a!==l)return a<l?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Mr=2**20;function fn(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yt(e&&e.created_at)}function Qn(e){return(t,n)=>{let r=fn(t,e),s=fn(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Nr(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,l=o+1<s?r[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:fn(l,n)-Mr};if(!l)return{rank:fn(a,n)+Mr};let i=fn(a,n),d=fn(l,n),f=(i+d)/2;return i<f&&f<d?{rank:f}:{renormalize:r.map((_,m)=>({bead_id:_.id,rank:m*Mr}))}}function Pr(e,t={}){let n=Ge(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,l=!1,i=t.sort||Xt;function d(){for(let m of Array.from(a))try{m()}catch{}}function f(){s=Array.from(r.values()).sort(i)}function _(m){if(l||!m||m.id!==e)return;let y=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,y),!(y<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if(y<=o)return;r.clear();let $=Array.isArray(m.issues)?m.issues:[];for(let g of $)g&&typeof g.id=="string"&&g.id.length>0&&r.set(g.id,g);f(),o=y,d();return}if(m.type==="upsert"){let $=m.issue;if($&&typeof $.id=="string"&&$.id.length>0){let g=r.get($.id);if(!g)r.set($.id,$);else{let L=Number.isFinite(g.updated_at)?g.updated_at:0,z=Number.isFinite($.updated_at)?$.updated_at:0;if(L<=z){for(let H of Object.keys(g))H in $||delete g[H];for(let[H,j]of Object.entries($))g[H]=j}}f()}o=y,d()}else if(m.type==="delete"){let $=String(m.issue_id||"");$&&(r.delete($),f()),o=y,d()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),s=[],a.clear(),o=0}}}function Jn(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function go(e){let t=Ge("subs"),n=new Map,r=new Map;function s(l,i){t("applyDelta %s +%d ~%d -%d",l,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=r.get(l);if(!d||d.size===0)return;let f=Array.isArray(i.added)?i.added:[],_=Array.isArray(i.updated)?i.updated:[],m=Array.isArray(i.removed)?i.removed:[];for(let y of Array.from(d)){let $=n.get(y);if(!$)continue;let g=$.itemsById;for(let L of f)typeof L=="string"&&L.length>0&&g.set(L,!0);for(let L of _)typeof L=="string"&&L.length>0&&g.set(L,!0);for(let L of m)typeof L=="string"&&L.length>0&&g.delete(L)}}async function o(l,i){let d=Jn(i);if(t("subscribe %s key=%s",l,d),!n.has(l))n.set(l,{key:d,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==d){let m=r.get(_.key);m&&(m.delete(l),m.size===0&&r.delete(_.key)),n.set(l,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let f=r.get(d);f&&f.add(l);try{await e("subscribe-list",{id:l,type:i.type,params:i.params})}catch(_){let m=n.get(l)||null;if(m){let y=r.get(m.key);y&&(y.delete(l),y.size===0&&r.delete(m.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let m=r.get(_.key);m&&(m.delete(l),m.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Jn,selectors:{getIds(l){let i=n.get(l);return i?Array.from(i.itemsById.keys()):[]},has(l,i){let d=n.get(l);return d?d.itemsById.has(i):!1},count(l){let i=n.get(l);return i?i.itemsById.size:0},getItemsById(l){let i=n.get(l),d={};if(!i)return d;for(let f of i.itemsById.keys())d[f]=!0;return d}}}}function mo(){let e=Ge("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let i of Array.from(r))try{i()}catch{}}function a(i,d,f){let _=d?Jn(d):"",m=n.get(i)||"",y=t.has(i);if(e("register %s key=%s (prev=%s)",i,_,m),y&&m&&_&&m!==_){let $=t.get(i);if($)try{$.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let L=Pr(i,f);t.set(i,L);let z=L.subscribe(()=>o());s.set(i,z)}else if(!y){let $=Pr(i,f);t.set(i,$);let g=$.subscribe(()=>o());s.set(i,g)}return n.set(i,_),()=>l(i)}function l(i){e("unregister %s",i),n.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let f=s.get(i);if(f){try{f()}catch{}s.delete(i)}}return{register:a,unregister:l,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return r.add(i),()=>r.delete(i)}}}function bo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fr(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function ji(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Yi(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function wo(e){let t=Ge("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):ji(r),a=Yi(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Fr(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Fr(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Vi=Object.freeze({workspace_config:{default_workspace:null}});function ko(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Vi.workspace_config.default_workspace}}}function yo(e={}){let t=Ge("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today",show_deferred_column:e.board?.show_deferred_column===!0},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ko(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?ko(o.config):n.config},l=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==n.workspace.hidden[f]),i=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.board.show_deferred_column===n.board.show_deferred_column&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===n.worker.show_closed_children[f])&&!l&&!i||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function $o(e){let t=Ge("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function l(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function i(d){return async(_,m)=>{let y=s++,$=Date.now();r.set(y,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",y,_,n+1),a();let g=!1,L=()=>{g||(g=!0,r.delete(y),l())},z=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",y,_,Date.now()-$),L())},3e4);try{let H=await d(_,m),j=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",y,_,j),H}catch(H){let j=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",y,_,j,H),H}finally{clearTimeout(z),L()}}}return o(),{wrapSend:i,start:a,done:l,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function le(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function er(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,l){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(_o),i;switch(l){case"created_desc":return i.sort(Xt),i;case"created_asc":return i.sort(uo),i;case"updated_desc":return i.sort(po),i;case"priority":return i.sort(fo),i;case"manual":default:{let d=n();return d?i.sort(Qn(d)):i.sort(Xt),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function An(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function dt(e){let t=An(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function bt(e,t){let n=An(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let i=Math.floor(l/7);if(l<30)return`${i}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function tr(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=An(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function nr(e){let t=e.transport,n=e.uiOrderStore;function r(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let i={...a.order};for(let d of l)i[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:i})}async function o(a,l,i){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},f=r(Nr(l,i,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let m={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(m);let y=r(Nr(l,i,m.order),a);s(m,y);let $=await t("ui-order-set",{expected_revision:m.revision,entries:y});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function rr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qr(e,t){return!t||typeof e!="string"||e.length===0||rr(t.visible_labels).includes(e)?!0:rr(t.hidden_labels).includes(e)?!1:!rr(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function xo(e,t){return rr(e).filter(n=>qr(n,t))}function Qt(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Ki={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},So={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Zi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Xi={review:"\u2713",skip:"\u2298"},_n={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Qi(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ji(e){let t=e&&e.fill||"none";return t==="none"?_n.none:e&&e.stale===!0?_n.stale:t==="dim"?_n.dim:e&&e.glyph==="review"?_n.review:e&&e.glyph==="skip"?_n.skip:_n.done}function el(e,t,n){let r=Ki[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Xi[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${r} dim`:s==="full"&&(l+=` b-${r} full`),o&&(l+=" stale"),n&&(l+=" cur");let i=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${i}>
        ${So[e]||e}
      </div>
    </div>
  `}function sr(e,t){if(!e||!e.stages)return"";let n=e.route==="full_plan"?"full_plan":"spec_backed",r=Zi[n],s=e.stages,o=Qi(r,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(l=>`${So[l]||l} ${Ji(s[l]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${a}>
      ${r.map(l=>el(l,s[l]||{},l===o))}
    </div>
  `}function tl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ao=2;function nl(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Ao).join(", "),s=n.length-Ao,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function rl(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Qt(n,"route")){let o=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${r.route} ?`:r.route}</span
      >`)}if(r.fast_track&&Qt(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Qt(n,"pr")){let o=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of xo(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&Qt(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Qt(n,"blocked")&&s.push(...nl(e.blocked_info)),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function sl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ol(e){let t=bt(e.created_at),n=bt(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function al(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},r=n.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=r>0?n.children.slice().sort(ho):n.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${n.count}/${r} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${ol(e)}
      </div>
      ${r>0&&n.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${n.current.title||n.current.id}</span
            >
          </div>`:""}
      ${s&&r>0?c`<div class="board-card__roll-list">
            ${o.map((a,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${sl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function To(e,t){let n=tl(e.priority);return c`
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
      ${rl(e,t)}
      ${e.workflow&&Qt(t.policy||null,"stepper")?sr(e.workflow,e.status):""}
      ${al(e,t)}
    </article>
  `}function Jt(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Ct.map(o=>c`<option
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
        ${e.items.map(o=>To(o,t))}
      </div>
    </section>
  `}var il=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ll=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],cl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function dl(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Eo(e,t,n){return c`
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
        ${il.map(r=>c`<option
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
        ${ll.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${dl(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${n.show_deferred?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${cl.map(r=>c`<option
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
  `}var ul=200,pl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},fl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Co="beads-ui.board.sort",Ro=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function _l(){try{let e=window.localStorage.getItem(Co);if(e&&Ro.has(e))return e}catch{}return"created_desc"}function Lo(e,t){let n=Ge("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||wt,_=s?er(s,a):null,m=nr({transport:o,uiOrderStore:a}),y=[],$=[],g=[],L=[],z=[],H=[],j=!1,P=0,E=_l(),S=new Map,O=new Map,x=new Map,G=new Set,V={search:"",priority:"",type:"",labels:[]},K=!1,ce=null;function xe(N){return String(N.status||"open")==="open"}function ze(N){let B=String(N.status||"open");return B==="open"||B==="blocked"}function $e(N){let B=V.search.trim().toLowerCase(),oe=V.priority,ne=V.type,ae=V.labels;return N.filter(we=>{if(B){let ye=String(we.id||"").toLowerCase(),Ee=String(we.title||"").toLowerCase();if(!ye.includes(B)&&!Ee.includes(B))return!1}if(oe!==""&&String(we.priority)!==oe||ne!==""&&String(we.issue_type||"")!==ne)return!1;if(ae.length>0){let ye=Array.isArray(we.labels)?we.labels:[];if(!ae.some(Ee=>ye.includes(Ee)))return!1}return!0})}function Q(){let N=new Set;for(let B of[y,$,g,L,z,H])for(let oe of B){let ne=Array.isArray(oe.labels)?oe.labels:[];for(let ae of ne)typeof ae=="string"&&ae.length>0&&N.add(ae)}return Array.from(N).sort()}function J(){return V.search.trim()!==""||V.priority!==""||V.type!==""||V.labels.length>0}function A(){try{if(_){let N=_.selectBoardColumn("tab:board:in-progress","in_progress",E),B=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(ze),oe=new Set(N.map(C=>C.id)),ne=_.selectBoardColumn("tab:board:ready","ready",E).filter(C=>xe(C)&&!oe.has(C.id)),ae=_.selectBoardColumn("tab:board:resolved","resolved",E),we=_.selectBoardColumn("tab:board:deferred","deferred",E),ye=j?we:[],Ee=_.selectBoardColumn("tab:board:closed","closed").slice(0,ul),_e=[...B,...ne,...N,...ae,...ye,...Ee];T(_e);let w=new Set;for(let C of _e)C&&C.id&&!Br(C)&&w.add(C.id);let q=!J();y=q?hn(B,w):B,$=q?hn(ne,w):ne,g=q?hn(N,w):N,L=q?hn(ae,w):ae,z=q?hn(ye,w):ye,P=we.length,H=q?hn(Ee,w):Ee,S=new Map;for(let C of y)S.set(C.id,"open");for(let C of $)S.set(C.id,"open");for(let C of g)S.set(C.id,"in_progress");for(let C of L)S.set(C.id,"resolved");for(let C of z)S.set(C.id,"deferred");for(let C of H)S.set(C.id,"closed");O=new Map;for(let C of y)O.set(C.id,"blocked-col");for(let C of $)O.set(C.id,"ready-col");for(let C of g)O.set(C.id,"in-progress-col");for(let C of L)O.set(C.id,"resolved-col");for(let C of z)O.set(C.id,"deferred-col");for(let C of H)O.set(C.id,"closed-col")}pe()}catch{y=[],$=[],g=[],L=[],z=[],H=[],x=new Map,pe()}}function T(N){let B=new Map;for(let ne of N)ne&&ne.id&&!B.has(ne.id)&&B.set(ne.id,ne);let oe=new Map;for(let ne of B.values()){let ae=Br(ne);if(!ae)continue;let we=oe.get(ae);we||(we=[],oe.set(ae,we)),we.push({id:ne.id,title:ne.title,status:ne.status,metadata:ne.metadata,created_at:ne.created_at,updated_at:ne.updated_at})}x=oe}function Z(N){let B=x.get(N)||[],oe=0;for(let ae of B)(ae.status==="resolved"||ae.status==="closed")&&(oe+=1);let ne=tr(B);return{total:B.length,count:oe,current:ne,children:B}}function te(N){return!G.has(N)}function re(N,B){N.preventDefault(),N.stopPropagation(),G.has(B)?G.delete(B):G.add(B),pe()}function de(N,B){N.preventDefault(),N.stopPropagation(),r(B)}function Ie(N,B){N.preventDefault(),N.stopPropagation(),r(B)}function fe(N,B){ce||r(B)}function Se(N,B){N.preventDefault(),N.stopPropagation(),hl(B).then(oe=>{oe&&le("\uBCF5\uC0AC\uB428","success",1200)})}function Ne(N,B){ce=B,N.dataTransfer&&(N.dataTransfer.setData("text/plain",B),N.dataTransfer.effectAllowed="move"),N.target.classList.add("board-card--dragging")}function He(N){N.target.classList.remove("board-card--dragging"),Qe(),setTimeout(()=>{ce=null},0)}function rt(N){let B=String(N.target.value||"");!B||B===f||(f=B,i&&i(B),pe())}let Xe={onCardClick:fe,onCopyId:Se,onDragStart:Ne,onDragEnd:He,onClosedRangeChange:rt,rollupFor:Z,isExpanded:te,onRollupToggle:re,onChildClick:de,onFromChipClick:Ie,get policy(){return l?l.get():null}};function F(N){let B=N.target,oe=e.querySelector(".board-filter__labels");B&&oe&&oe.contains(B)||se()}function W(N){N.key==="Escape"&&se()}function M(){K||(K=!0,document.addEventListener("mousedown",F),document.addEventListener("keydown",W),pe())}function se(){K&&(K=!1,document.removeEventListener("mousedown",F),document.removeEventListener("keydown",W),pe())}let ue={onSearchInput(N){V.search=String(N.target.value||""),A()},onPriorityChange(N){V.priority=String(N.target.value||""),A()},onTypeChange(N){V.type=String(N.target.value||""),A()},onSortChange(N){let B=String(N.target.value||"");if(!(!Ro.has(B)||B===E)){E=B;try{window.localStorage.setItem(Co,B)}catch{}A()}},onDeferredToggle(){j=!j,A()},onLabelMenuToggle(){K?se():M()},onLabelToggle(N){let B=V.labels.indexOf(N);B===-1?V.labels.push(N):V.labels.splice(B,1),A()},onLabelClear(){V.labels.length!==0&&(V.labels=[],A())},onNewIssue(){d&&d()}};function ge(){let N=j?"board-root board-root--deferred":"board-root";return c`
      <div class="board-view">
        ${Eo(V,ue,{sort_mode:E,show_deferred:j,deferred_count:P,label_options:Q(),label_menu_open:K})}
        <div class=${N}>
          ${Jt({title:"Blocked",id:"blocked-col",items:$e(y)},Xe)}
          ${Jt({title:"Ready",id:"ready-col",items:$e($)},Xe)}
          ${Jt({title:"In progress",id:"in-progress-col",items:$e(g)},Xe)}
          ${Jt({title:"Resolved",id:"resolved-col",items:$e(L)},Xe)}
          ${j?Jt({title:"Deferred",id:"deferred-col",items:$e(z)},Xe):""}
          ${Jt({title:"Closed",id:"closed-col",items:$e(H),is_closed:!0,closed_range:f},Xe)}
        </div>
      </div>
    `}function pe(){Le(ge(),e),Ae()}function Ae(){try{let N=Array.from(e.querySelectorAll(".board-column"));for(let B of N)Array.from(B.querySelectorAll(".board-card")).forEach((ne,ae)=>{ne.tabIndex=ae===0?0:-1})}catch{}}async function Oe(N,B){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:N,status:B}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){n("update-status failed: %o",oe),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(N){switch(N){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return g;case"resolved-col":return L;case"deferred-col":return z;default:return[]}}function it(N,B,oe){if(!o||!a)return;let ne=st(N),ae=ne.find(w=>w.id===B);if(!ae)return;let we=ne.filter(w=>w.id!==B),ye=oe.closest?oe.closest(".board-card"):null,Ee=we.length;if(ye){let w=ye.getAttribute("data-issue-id");if(w===B)return;let q=we.findIndex(C=>C.id===w);q>=0&&(Ee=q)}let _e=we.slice();_e.splice(Ee,0,ae),m.applyReorder(B,_e,Ee)}function Qe(){for(let N of Array.from(e.querySelectorAll(".board-column--drag-over")))N.classList.remove("board-column--drag-over")}let We=null;e.addEventListener("dragover",N=>{N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move");let oe=N.target.closest(".board-column");oe&&oe!==We&&(We&&We.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),We=oe)}),e.addEventListener("dragleave",N=>{let B=N.relatedTarget;(!B||!e.contains(B))&&We&&(We.classList.remove("board-column--drag-over"),We=null)}),e.addEventListener("drop",N=>{N.preventDefault(),We&&(We.classList.remove("board-column--drag-over"),We=null);let B=N.target,oe=B.closest(".board-column");if(!oe)return;let ne=N.dataTransfer?.getData("text/plain")||"";if(!ne)return;let ae=oe.id,we=O.get(ne);if(we&&we===ae){if(fl.has(ae)){if(E!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(ae,ne,B)}return}let ye=pl[ae];if(!ye){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(ne)!==ye&&Oe(ne,ye)}),e.addEventListener("keydown",N=>{let B=N.target;if(!(B instanceof HTMLElement))return;let oe=String(B.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||B.isContentEditable===!0)return;let ne=B.closest(".board-card");if(!ne)return;let ae=String(N.key||"");if(ae==="Enter"||ae===" "){N.preventDefault();let _e=ne.getAttribute("data-issue-id");_e&&r(_e);return}if(ae!=="ArrowUp"&&ae!=="ArrowDown"&&ae!=="ArrowLeft"&&ae!=="ArrowRight")return;N.preventDefault();let we=ne.closest(".board-column");if(!we)return;let ye=Array.from(we.querySelectorAll(".board-card")),Ee=ye.indexOf(ne);if(ae==="ArrowDown"&&Ee<ye.length-1){ot(ne,ye[Ee+1]);return}if(ae==="ArrowUp"&&Ee>0){ot(ne,ye[Ee-1]);return}if(ae==="ArrowLeft"||ae==="ArrowRight"){let _e=Array.from(e.querySelectorAll(".board-column")),w=_e.indexOf(we),q=ae==="ArrowRight"?1:-1,C=w+q;for(;C>=0&&C<_e.length;){let ee=_e[C].querySelector(".board-card");if(ee){ot(ne,ee);return}C+=q}}});function ot(N,B){try{N.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let Te=null;_&&_.subscribe&&(Te=_.subscribe(()=>{try{A()}catch{}}));let Je=null;return l&&l.subscribe&&(Je=l.subscribe(()=>{try{A()}catch{}})),{async load(){n("load"),A()},clear(){se(),Te&&(Te(),Te=null),Je&&(Je(),Je=null),e.replaceChildren(),y=[],$=[],g=[],L=[],z=[],H=[],S=new Map,O=new Map}}}function Br(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function hn(e,t){return e.filter(n=>{let r=Br(n);return!(r&&t.has(r))})}async function hl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function en(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var gl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function tn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Io(e){let t=0;for(let n of Nt)t+=tn(e?.[n]);return t}function Do(e){return!e||typeof e!="object"?!1:Nt.some(t=>Number.isFinite(e[t]))}function ml(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function gn(e){return Do(e)?`\u03C4 ${ml(Io(e))}`:null}function $t(e){let t=gn(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function mn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${tn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${tn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${tn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${tn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Io(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(gl),n.join(`
`)}function Rt(e,t){let n={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},r=0,s=0,o=0,a=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let i=l.usage;if(Do(i)){r+=1;for(let d of Nt)n[d]=tn(n[d])+tn(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return r===0?null:(o===r&&(n.total_cost_usd=s),a&&(n.replayed=!0),n)}var{entries:zo,setPrototypeOf:Oo,isFrozen:bl,getPrototypeOf:vl,getOwnPropertyDescriptor:wl}=Object,{freeze:ft,seal:kt,create:Yr}=Object,{apply:Vr,construct:Kr}=typeof Reflect<"u"&&Reflect;ft||(ft=function(t){return t});kt||(kt=function(t){return t});Vr||(Vr=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Kr||(Kr=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var or=_t(Array.prototype.forEach),kl=_t(Array.prototype.lastIndexOf),Mo=_t(Array.prototype.pop),Tn=_t(Array.prototype.push),yl=_t(Array.prototype.splice),ir=_t(String.prototype.toLowerCase),Ur=_t(String.prototype.toString),zr=_t(String.prototype.match),En=_t(String.prototype.replace),$l=_t(String.prototype.indexOf),xl=_t(String.prototype.trim),xt=_t(Object.prototype.hasOwnProperty),pt=_t(RegExp.prototype.test),Cn=Sl(TypeError);function _t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Vr(e,t,r)}}function Sl(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Kr(e,n)}}function ke(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ir;Oo&&Oo(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(bl(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Al(e){for(let t=0;t<e.length;t++)xt(e,t)||(e[t]=null);return e}function Pt(e){let t=Yr(null);for(let[n,r]of zo(e))xt(e,n)&&(Array.isArray(r)?t[n]=Al(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Pt(r):t[n]=r);return t}function Rn(e,t){for(;e!==null;){let r=wl(e,t);if(r){if(r.get)return _t(r.get);if(typeof r.value=="function")return _t(r.value)}e=vl(e)}function n(){return null}return n}var No=ft(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hr=ft(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Wr=ft(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Tl=ft(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gr=ft(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),El=ft(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Po=ft(["#text"]),Fo=ft(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jr=ft(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qo=ft(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ar=ft(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cl=kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Rl=kt(/<%[\w\W]*|[\w\W]*%>/gm),Ll=kt(/\$\{[\w\W]*/gm),Il=kt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Dl=kt(/^aria-[\-\w]+$/),Ho=kt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ol=kt(/^(?:\w+script|data):/i),Ml=kt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wo=kt(/^html$/i),Nl=kt(/^[a-z][.\w]*(-[.\w]+)+$/i),Bo=Object.freeze({__proto__:null,ARIA_ATTR:Dl,ATTR_WHITESPACE:Ml,CUSTOM_ELEMENT:Nl,DATA_ATTR:Il,DOCTYPE_NAME:Wo,ERB_EXPR:Rl,IS_ALLOWED_URI:Ho,IS_SCRIPT_OR_DATA:Ol,MUSTACHE_EXPR:Cl,TMPLIT_EXPR:Ll}),Ln={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Pl=function(){return typeof window>"u"?null:window},Fl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Uo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Go(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pl(),t=I=>Go(I);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ln.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:i,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:m,trustedTypes:y}=e,$=i.prototype,g=Rn($,"cloneNode"),L=Rn($,"remove"),z=Rn($,"nextSibling"),H=Rn($,"childNodes"),j=Rn($,"parentNode");if(typeof a=="function"){let I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let P,E="",{implementation:S,createNodeIterator:O,createDocumentFragment:x,getElementsByTagName:G}=n,{importNode:V}=r,K=Uo();t.isSupported=typeof zo=="function"&&typeof j=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:xe,TMPLIT_EXPR:ze,DATA_ATTR:$e,ARIA_ATTR:Q,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:A,CUSTOM_ELEMENT:T}=Bo,{IS_ALLOWED_URI:Z}=Bo,te=null,re=ke({},[...No,...Hr,...Wr,...Gr,...Po]),de=null,Ie=ke({},[...Fo,...jr,...qo,...ar]),fe=Object.seal(Yr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,Ne=null,He=Object.seal(Yr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),rt=!0,Xe=!0,F=!1,W=!0,M=!1,se=!0,ue=!1,ge=!1,pe=!1,Ae=!1,Oe=!1,st=!1,it=!0,Qe=!1,We="user-content-",ot=!0,Te=!1,Je={},N=null,B=ke({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),oe=null,ne=ke({},["audio","video","img","source","image","track"]),ae=null,we=ke({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ye="http://www.w3.org/1998/Math/MathML",Ee="http://www.w3.org/2000/svg",_e="http://www.w3.org/1999/xhtml",w=_e,q=!1,C=null,ee=ke({},[ye,Ee,_e],Ur),je=ke({},["mi","mo","mn","ms","mtext"]),u=ke({},["annotation-xml"]),v=ke({},["title","style","font","a","script"]),D=null,he=["application/xhtml+xml","text/html"],Pe="text/html",be=null,Me=null,Be=n.createElement("form"),et=function(p){return p instanceof RegExp||p instanceof Function},lt=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Me&&Me===p)){if((!p||typeof p!="object")&&(p={}),p=Pt(p),D=he.indexOf(p.PARSER_MEDIA_TYPE)===-1?Pe:p.PARSER_MEDIA_TYPE,be=D==="application/xhtml+xml"?Ur:ir,te=xt(p,"ALLOWED_TAGS")?ke({},p.ALLOWED_TAGS,be):re,de=xt(p,"ALLOWED_ATTR")?ke({},p.ALLOWED_ATTR,be):Ie,C=xt(p,"ALLOWED_NAMESPACES")?ke({},p.ALLOWED_NAMESPACES,Ur):ee,ae=xt(p,"ADD_URI_SAFE_ATTR")?ke(Pt(we),p.ADD_URI_SAFE_ATTR,be):we,oe=xt(p,"ADD_DATA_URI_TAGS")?ke(Pt(ne),p.ADD_DATA_URI_TAGS,be):ne,N=xt(p,"FORBID_CONTENTS")?ke({},p.FORBID_CONTENTS,be):B,Se=xt(p,"FORBID_TAGS")?ke({},p.FORBID_TAGS,be):Pt({}),Ne=xt(p,"FORBID_ATTR")?ke({},p.FORBID_ATTR,be):Pt({}),Je=xt(p,"USE_PROFILES")?p.USE_PROFILES:!1,rt=p.ALLOW_ARIA_ATTR!==!1,Xe=p.ALLOW_DATA_ATTR!==!1,F=p.ALLOW_UNKNOWN_PROTOCOLS||!1,W=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,M=p.SAFE_FOR_TEMPLATES||!1,se=p.SAFE_FOR_XML!==!1,ue=p.WHOLE_DOCUMENT||!1,Ae=p.RETURN_DOM||!1,Oe=p.RETURN_DOM_FRAGMENT||!1,st=p.RETURN_TRUSTED_TYPE||!1,pe=p.FORCE_BODY||!1,it=p.SANITIZE_DOM!==!1,Qe=p.SANITIZE_NAMED_PROPS||!1,ot=p.KEEP_CONTENT!==!1,Te=p.IN_PLACE||!1,Z=p.ALLOWED_URI_REGEXP||Ho,w=p.NAMESPACE||_e,je=p.MATHML_TEXT_INTEGRATION_POINTS||je,u=p.HTML_INTEGRATION_POINTS||u,fe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&et(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&et(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(fe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),M&&(Xe=!1),Oe&&(Ae=!0),Je&&(te=ke({},Po),de=[],Je.html===!0&&(ke(te,No),ke(de,Fo)),Je.svg===!0&&(ke(te,Hr),ke(de,jr),ke(de,ar)),Je.svgFilters===!0&&(ke(te,Wr),ke(de,jr),ke(de,ar)),Je.mathMl===!0&&(ke(te,Gr),ke(de,qo),ke(de,ar))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?He.tagCheck=p.ADD_TAGS:(te===re&&(te=Pt(te)),ke(te,p.ADD_TAGS,be))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?He.attributeCheck=p.ADD_ATTR:(de===Ie&&(de=Pt(de)),ke(de,p.ADD_ATTR,be))),p.ADD_URI_SAFE_ATTR&&ke(ae,p.ADD_URI_SAFE_ATTR,be),p.FORBID_CONTENTS&&(N===B&&(N=Pt(N)),ke(N,p.FORBID_CONTENTS,be)),ot&&(te["#text"]=!0),ue&&ke(te,["html","head","body"]),te.table&&(ke(te,["tbody"]),delete Se.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Cn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Cn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,E=P.createHTML("")}else P===void 0&&(P=Fl(y,s)),P!==null&&typeof E=="string"&&(E=P.createHTML(""));ft&&ft(p),Me=p}},ve=ke({},[...Hr,...Wr,...Tl]),ct=ke({},[...Gr,...El]),vt=function(p){let R=j(p);(!R||!R.tagName)&&(R={namespaceURI:w,tagName:"template"});let Y=ir(p.tagName),Ue=ir(R.tagName);return C[p.namespaceURI]?p.namespaceURI===Ee?R.namespaceURI===_e?Y==="svg":R.namespaceURI===ye?Y==="svg"&&(Ue==="annotation-xml"||je[Ue]):!!ve[Y]:p.namespaceURI===ye?R.namespaceURI===_e?Y==="math":R.namespaceURI===Ee?Y==="math"&&u[Ue]:!!ct[Y]:p.namespaceURI===_e?R.namespaceURI===Ee&&!u[Ue]||R.namespaceURI===ye&&!je[Ue]?!1:!ct[Y]&&(v[Y]||!ve[Y]):!!(D==="application/xhtml+xml"&&C[p.namespaceURI]):!1},tt=function(p){Tn(t.removed,{element:p});try{j(p).removeChild(p)}catch{L(p)}},at=function(p,R){try{Tn(t.removed,{attribute:R.getAttributeNode(p),from:R})}catch{Tn(t.removed,{attribute:null,from:R})}if(R.removeAttribute(p),p==="is")if(Ae||Oe)try{tt(R)}catch{}else try{R.setAttribute(p,"")}catch{}},me=function(p){let R=null,Y=null;if(pe)p="<remove></remove>"+p;else{let Ye=zr(p,/^[\r\n\t ]+/);Y=Ye&&Ye[0]}D==="application/xhtml+xml"&&w===_e&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Ue=P?P.createHTML(p):p;if(w===_e)try{R=new m().parseFromString(Ue,D)}catch{}if(!R||!R.documentElement){R=S.createDocument(w,"template",null);try{R.documentElement.innerHTML=q?E:Ue}catch{}}let nt=R.body||R.documentElement;return p&&Y&&nt.insertBefore(n.createTextNode(Y),nt.childNodes[0]||null),w===_e?G.call(R,ue?"html":"body")[0]:ue?R.documentElement:nt},Ce=function(p){return O.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},It=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},qt=function(p){return typeof l=="function"&&p instanceof l};function ut(I,p,R){or(I,Y=>{Y.call(t,p,R,Me)})}let Bt=function(p){let R=null;if(ut(K.beforeSanitizeElements,p,null),It(p))return tt(p),!0;let Y=be(p.nodeName);if(ut(K.uponSanitizeElement,p,{tagName:Y,allowedTags:te}),se&&p.hasChildNodes()&&!qt(p.firstElementChild)&&pt(/<[/\w!]/g,p.innerHTML)&&pt(/<[/\w!]/g,p.textContent)||p.nodeType===Ln.progressingInstruction||se&&p.nodeType===Ln.comment&&pt(/<[/\w]/g,p.data))return tt(p),!0;if(!(He.tagCheck instanceof Function&&He.tagCheck(Y))&&(!te[Y]||Se[Y])){if(!Se[Y]&&h(Y)&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,Y)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Y)))return!1;if(ot&&!N[Y]){let Ue=j(p)||p.parentNode,nt=H(p)||p.childNodes;if(nt&&Ue){let Ye=nt.length;for(let Ke=Ye-1;Ke>=0;--Ke){let mt=g(nt[Ke],!0);mt.__removalCount=(p.__removalCount||0)+1,Ue.insertBefore(mt,z(p))}}}return tt(p),!0}return p instanceof i&&!vt(p)||(Y==="noscript"||Y==="noembed"||Y==="noframes")&&pt(/<\/no(script|embed|frames)/i,p.innerHTML)?(tt(p),!0):(M&&p.nodeType===Ln.text&&(R=p.textContent,or([ce,xe,ze],Ue=>{R=En(R,Ue," ")}),p.textContent!==R&&(Tn(t.removed,{element:p.cloneNode()}),p.textContent=R)),ut(K.afterSanitizeElements,p,null),!1)},Gt=function(p,R,Y){if(it&&(R==="id"||R==="name")&&(Y in n||Y in Be))return!1;if(!(Xe&&!Ne[R]&&pt($e,R))){if(!(rt&&pt(Q,R))){if(!(He.attributeCheck instanceof Function&&He.attributeCheck(R,p))){if(!de[R]||Ne[R]){if(!(h(p)&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,p)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(p))&&(fe.attributeNameCheck instanceof RegExp&&pt(fe.attributeNameCheck,R)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(R,p))||R==="is"&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,Y)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Y))))return!1}else if(!ae[R]){if(!pt(Z,En(Y,A,""))){if(!((R==="src"||R==="xlink:href"||R==="href")&&p!=="script"&&$l(Y,"data:")===0&&oe[p])){if(!(F&&!pt(J,En(Y,A,"")))){if(Y)return!1}}}}}}}return!0},h=function(p){return p!=="annotation-xml"&&zr(p,T)},b=function(p){ut(K.beforeSanitizeAttributes,p,null);let{attributes:R}=p;if(!R||It(p))return;let Y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},Ue=R.length;for(;Ue--;){let nt=R[Ue],{name:Ye,namespaceURI:Ke,value:mt}=nt,Dt=be(Ye),sn=mt,Ze=Ye==="value"?sn:xl(sn);if(Y.attrName=Dt,Y.attrValue=Ze,Y.keepAttr=!0,Y.forceKeepAttr=void 0,ut(K.uponSanitizeAttribute,p,Y),Ze=Y.attrValue,Qe&&(Dt==="id"||Dt==="name")&&(at(Ye,p),Ze=We+Ze),se&&pt(/((--!?|])>)|<\/(style|title|textarea)/i,Ze)){at(Ye,p);continue}if(Dt==="attributename"&&zr(Ze,"href")){at(Ye,p);continue}if(Y.forceKeepAttr)continue;if(!Y.keepAttr){at(Ye,p);continue}if(!W&&pt(/\/>/i,Ze)){at(Ye,p);continue}M&&or([ce,xe,ze],Gn=>{Ze=En(Ze,Gn," ")});let on=be(p.nodeName);if(!Gt(on,Dt,Ze)){at(Ye,p);continue}if(P&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ke)switch(y.getAttributeType(on,Dt)){case"TrustedHTML":{Ze=P.createHTML(Ze);break}case"TrustedScriptURL":{Ze=P.createScriptURL(Ze);break}}if(Ze!==sn)try{Ke?p.setAttributeNS(Ke,Ye,Ze):p.setAttribute(Ye,Ze),It(p)?tt(p):Mo(t.removed)}catch{at(Ye,p)}}ut(K.afterSanitizeAttributes,p,null)},X=function I(p){let R=null,Y=Ce(p);for(ut(K.beforeSanitizeShadowDOM,p,null);R=Y.nextNode();)ut(K.uponSanitizeShadowNode,R,null),Bt(R),b(R),R.content instanceof o&&I(R.content);ut(K.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(I){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=null,Y=null,Ue=null,nt=null;if(q=!I,q&&(I="<!-->"),typeof I!="string"&&!qt(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw Cn("dirty is not a string, aborting")}else throw Cn("toString is not a function");if(!t.isSupported)return I;if(ge||lt(p),t.removed=[],typeof I=="string"&&(Te=!1),Te){if(I.nodeName){let mt=be(I.nodeName);if(!te[mt]||Se[mt])throw Cn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof l)R=me("<!---->"),Y=R.ownerDocument.importNode(I,!0),Y.nodeType===Ln.element&&Y.nodeName==="BODY"||Y.nodeName==="HTML"?R=Y:R.appendChild(Y);else{if(!Ae&&!M&&!ue&&I.indexOf("<")===-1)return P&&st?P.createHTML(I):I;if(R=me(I),!R)return Ae?null:st?E:""}R&&pe&&tt(R.firstChild);let Ye=Ce(Te?I:R);for(;Ue=Ye.nextNode();)Bt(Ue),b(Ue),Ue.content instanceof o&&X(Ue.content);if(Te)return I;if(Ae){if(Oe)for(nt=x.call(R.ownerDocument);R.firstChild;)nt.appendChild(R.firstChild);else nt=R;return(de.shadowroot||de.shadowrootmode)&&(nt=V.call(r,nt,!0)),nt}let Ke=ue?R.outerHTML:R.innerHTML;return ue&&te["!doctype"]&&R.ownerDocument&&R.ownerDocument.doctype&&R.ownerDocument.doctype.name&&pt(Wo,R.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+R.ownerDocument.doctype.name+`>
`+Ke),M&&or([ce,xe,ze],mt=>{Ke=En(Ke,mt," ")}),P&&st?P.createHTML(Ke):Ke},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};lt(I),ge=!0},t.clearConfig=function(){Me=null,ge=!1},t.isValidAttribute=function(I,p,R){Me||lt({});let Y=be(I),Ue=be(p);return Gt(Y,Ue,R)},t.addHook=function(I,p){typeof p=="function"&&Tn(K[I],p)},t.removeHook=function(I,p){if(p!==void 0){let R=kl(K[I],p);return R===-1?void 0:yl(K[I],R,1)[0]}return Mo(K[I])},t.removeHooks=function(I){K[I]=[]},t.removeAllHooks=function(){K=Uo()},t}var jo=Go();var Yo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vo=e=>(...t)=>({_$litDirective$:e,values:t}),lr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var In=class extends lr{constructor(t){if(super(t),this.it=Ve,t.type!==Yo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ve||t==null)return this._t=void 0,this.it=t;if(t===Kt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};In.directiveName="unsafeHTML",In.resultType=1;var Ko=Vo(In);function Jr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var rn=Jr();function na(e){rn=e}var Nn={exec:()=>null};function Re(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(ht.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var ql=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ht={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Bl=/^(?:[ \t]*(?:\n|$))+/,Ul=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,zl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,es=/(?:[*+-]|\d{1,9}[.)])/,ra=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,sa=Re(ra).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Wl=Re(ra).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ts=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Gl=/^[^\n]+/,ns=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,jl=Re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ns).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Yl=Re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,es).getRegex(),_r="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",rs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Vl=Re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",rs).replace("tag",_r).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),oa=Re(ts).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex(),Kl=Re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",oa).getRegex(),ss={blockquote:Kl,code:Ul,def:jl,fences:zl,heading:Hl,hr:Pn,html:Vl,lheading:sa,list:Yl,newline:Bl,paragraph:oa,table:Nn,text:Gl},Zo=Re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex(),Zl={...ss,lheading:Wl,table:Zo,paragraph:Re(ts).replace("hr",Pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex()},Xl={...ss,html:Re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",rs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Re(ts).replace("hr",Pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",sa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ql=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Jl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,aa=/^( {2,}|\\)\n(?!\s*$)/,ec=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,hr=/[\p{P}\p{S}]/u,os=/[\s\p{P}\p{S}]/u,ia=/[^\s\p{P}\p{S}]/u,tc=Re(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,os).getRegex(),la=/(?!~)[\p{P}\p{S}]/u,nc=/(?!~)[\s\p{P}\p{S}]/u,rc=/(?:[^\s\p{P}\p{S}]|~)/u,sc=Re(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ql?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ca=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,oc=Re(ca,"u").replace(/punct/g,hr).getRegex(),ac=Re(ca,"u").replace(/punct/g,la).getRegex(),da="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ic=Re(da,"gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,os).replace(/punct/g,hr).getRegex(),lc=Re(da,"gu").replace(/notPunctSpace/g,rc).replace(/punctSpace/g,nc).replace(/punct/g,la).getRegex(),cc=Re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,os).replace(/punct/g,hr).getRegex(),dc=Re(/\\(punct)/,"gu").replace(/punct/g,hr).getRegex(),uc=Re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pc=Re(rs).replace("(?:-->|$)","-->").getRegex(),fc=Re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ur=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,_c=Re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ur).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ua=Re(/^!?\[(label)\]\[(ref)\]/).replace("label",ur).replace("ref",ns).getRegex(),pa=Re(/^!?\[(ref)\](?:\[\])?/).replace("ref",ns).getRegex(),hc=Re("reflink|nolink(?!\\()","g").replace("reflink",ua).replace("nolink",pa).getRegex(),Xo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,as={_backpedal:Nn,anyPunctuation:dc,autolink:uc,blockSkip:sc,br:aa,code:Jl,del:Nn,emStrongLDelim:oc,emStrongRDelimAst:ic,emStrongRDelimUnd:cc,escape:Ql,link:_c,nolink:pa,punctuation:tc,reflink:ua,reflinkSearch:hc,tag:fc,text:ec,url:Nn},gc={...as,link:Re(/^!?\[(label)\]\((.*?)\)/).replace("label",ur).getRegex(),reflink:Re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ur).getRegex()},Zr={...as,emStrongRDelimAst:lc,emStrongLDelim:ac,url:Re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xo).getRegex()},mc={...Zr,br:Re(aa).replace("{2,}","*").getRegex(),text:Re(Zr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},cr={normal:ss,gfm:Zl,pedantic:Xl},Dn={normal:as,gfm:Zr,breaks:mc,pedantic:gc},bc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Qo=e=>bc[e];function Ft(e,t){if(t){if(ht.escapeTest.test(e))return e.replace(ht.escapeReplace,Qo)}else if(ht.escapeTestNoEncode.test(e))return e.replace(ht.escapeReplaceNoEncode,Qo);return e}function Jo(e){try{e=encodeURI(e).replace(ht.percentDecode,"%")}catch{return null}return e}function ea(e,t){let n=e.replace(ht.findPipe,(o,a,l)=>{let i=!1,d=a;for(;--d>=0&&l[d]==="\\";)i=!i;return i?"|":" |"}),r=n.split(ht.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(ht.slashPipe,"|");return r}function On(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function vc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ta(e,t,n,r,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,i}function wc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var pr=class{constructor(e){qe(this,"options");qe(this,"rules");qe(this,"lexer");this.options=e||rn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:On(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=wc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=On(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:On(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=On(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,l=[],i;for(i=0;i<n.length;i++)if(this.rules.other.blockquoteStart.test(n[i]))l.push(n[i]),a=!0;else if(!a)l.push(n[i]);else break;n=n.slice(i);let d=l.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,n.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let y=m,$=y.raw+`
`+n.join(`
`),g=this.blockquote($);o[o.length-1]=g,r=r.substring(0,r.length-y.raw.length)+g.raw,s=s.substring(0,s.length-y.text.length)+g.text;break}else if(m?.type==="list"){let y=m,$=y.raw+`
`+n.join(`
`),g=this.list($);o[o.length-1]=g,r=r.substring(0,r.length-m.raw.length)+g.raw,s=s.substring(0,s.length-y.raw.length)+g.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let i=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),m=e.split(`
`,1)[0],y=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):y?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),y&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,e=e.substring(m.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex($),L=this.rules.other.hrRegex($),z=this.rules.other.fencesBeginRegex($),H=this.rules.other.headingBeginRegex($),j=this.rules.other.htmlBeginRegex($);for(;e;){let P=e.split(`
`,1)[0],E;if(m=P,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),E=m):E=m.replace(this.rules.other.tabCharGlobal,"    "),z.test(m)||H.test(m)||j.test(m)||g.test(m)||L.test(m))break;if(E.search(this.rules.other.nonSpaceChar)>=$||!m.trim())f+=`
`+E.slice($);else{if(y||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||z.test(_)||H.test(_)||L.test(_))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),d+=P+`
`,e=e.substring(P.length+1),_=E.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=f.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=f.raw+i.tokens[0].raw,i.tokens[0].text=f.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(f)):i.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):i.tokens.unshift(f)}}if(!s.loose){let d=i.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ea(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ea(a,o.header.length).map((l,i)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=On(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=vc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ta(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return ta(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,l=s,i=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){l+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+i);let f=[...r[0]][0].length,_=e.slice(0,s+r.index+f+a);if(Math.min(s,a)%2){let y=_.slice(1,-1);return{type:"em",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}let m=_.slice(2,-2);return{type:"strong",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},St=class Xr{constructor(t){qe(this,"tokens");qe(this,"options");qe(this,"state");qe(this,"inlineQueue");qe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||rn,this.options.tokenizer=this.options.tokenizer||new pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ht,block:cr.normal,inline:Dn.normal};this.options.pedantic?(n.block=cr.pedantic,n.inline=Dn.pedantic):this.options.gfm&&(n.block=cr.gfm,this.options.breaks?n.inline=Dn.breaks:n.inline=Dn.gfm),this.tokenizer.rules=n}static get rules(){return{block:cr,inline:Dn}}static lex(t,n){return new Xr(n).lex(t)}static lexInline(t,n){return new Xr(n).inlineTokens(t)}lex(t){t=t.replace(ht.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ht.tabCharGlobal,"    ").replace(ht.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},l),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,l="";for(;t;){a||(l=""),a=!1;let i;if(this.options.extensions?.inline?.some(f=>(i=f.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let f=n.at(-1);i.type==="text"&&f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(i=this.tokenizer.emStrong(t,r,l)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),n.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),n.push(i);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),m;this.options.extensions.startInline.forEach(y=>{m=y.call({lexer:this},_),typeof m=="number"&&m>=0&&(f=Math.min(f,m))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(l=i.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},fr=class{constructor(e){qe(this,"options");qe(this,"parser");this.options=e||rn}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ht.notSpaceStart)?.[0],s=e.replace(ht.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Ft(r)+'">'+(n?s:Ft(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ft(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let l=e.items[a];r+=this.listitem(l)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ft(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Jo(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ft(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Jo(e);if(s===null)return Ft(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Ft(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ft(e.text)}},is=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},At=class Qr{constructor(t){qe(this,"options");qe(this,"renderer");qe(this,"textRenderer");this.options=t||rn,this.options.renderer=this.options.renderer||new fr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new is}static parse(t,n){return new Qr(n).parse(t)}static parseInline(t,n){return new Qr(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=l||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=l||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},dr,Mn=(dr=class{constructor(e){qe(this,"options");qe(this,"block");this.options=e||rn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?St.lex:St.lexInline}provideParser(){return this.block?At.parse:At.parseInline}},qe(dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qe(dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),dr),kc=class{constructor(...e){qe(this,"defaults",Jr());qe(this,"options",this.setOptions);qe(this,"parse",this.parseMarkdown(!0));qe(this,"parseInline",this.parseMarkdown(!1));qe(this,"Parser",At);qe(this,"Renderer",fr);qe(this,"TextRenderer",is);qe(this,"Lexer",St);qe(this,"Tokenizer",pr);qe(this,"Hooks",Mn);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new fr(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=n.renderer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new pr(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=n.tokenizer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Mn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=n.hooks[a],i=s[a];Mn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Mn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return i.call(s,_)})();let f=l.call(s,d);return i.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await i.apply(s,d)),_})();let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return St.lex(e,t??this.defaults)}parser(e,t){return At.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?St.lex:St.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?At.parse:At.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?St.lex:St.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?At.parse:At.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Ft(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},nn=new kc;function De(e,t){return nn.parse(e,t)}De.options=De.setOptions=function(e){return nn.setOptions(e),De.defaults=nn.defaults,na(De.defaults),De};De.getDefaults=Jr;De.defaults=rn;De.use=function(...e){return nn.use(...e),De.defaults=nn.defaults,na(De.defaults),De};De.walkTokens=function(e,t){return nn.walkTokens(e,t)};De.parseInline=nn.parseInline;De.Parser=At;De.parser=At.parse;De.Renderer=fr;De.TextRenderer=is;De.Lexer=St;De.lexer=St.lex;De.Tokenizer=pr;De.Hooks=Mn;De.parse=De;var gp=De.options,mp=De.setOptions,bp=De.use,vp=De.walkTokens,wp=De.parseInline;var kp=At.parse,yp=St.lex;function Fn(e){let t=De.parse(e),n=jo.sanitize(t);return Ko(n)}var yc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},$c=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,xc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function zt(e){return!!e&&typeof e=="object"}function ls(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function fa(e,t){let n=ls(e),r=ls(t),s=new Map;for(let l of n)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of r){let i=s.get(l)||0;i>0?s.set(l,i-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Sc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>zt(s)&&typeof s.text=="string"?s.text:"").join(""):zt(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ac(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:yc[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ls(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=fa(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let l of a){let i=fa(zt(l)?l.old_string:"",zt(l)?l.new_string:"");s+=i.added,o+=i.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),r}function _a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ha(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=$c.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:xc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Tc(e,t){if(e.type==="assistant"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[],s=[];for(let o of r)if(zt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ha(o.text));else if(o.type==="thinking"){let a=_a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Ac(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[];for(let s of r)if(zt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Sc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""}]}return[]}function Ec(e){if(e.type==="item.completed"&&zt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ha(t.text)];if(t.type==="reasoning"){let n=_a(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Cc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ga(e){let t=[],n=new Map,r=Array.isArray(e)?e:[];for(let s of r){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!zt(o))continue;let a=Cc(o)?Ec(o):Tc(o,n);for(let l of a)t.push(l)}return t}var Rc=5,Lc=10,Ic=/Task\s+#(\d+)/,Dc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Oc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function gr(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Mc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Nc(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Pc(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=Ic.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Fc(e){if(e.tool==="Bash"){let t=e.command||"";return Dc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Oc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function qc(e){let t=e.filter(s=>s.kind==="tool").slice(-Lc),n=new Map;t.forEach((s,o)=>{let a=Fc(s);if(!a)return;let l=n.get(a)||{count:0,last:-1};l.count+=1,l.last=o,n.set(a,l)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Bc(e){let t=Nc(e);if(t)return{text:t,guess:!1};let n=Pc(e);if(n)return{text:n,guess:!1};let r=qc(e);return r?{text:r,guess:!0}:null}function Uc(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:bt(e,t)}function mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a={},l=!0,i=new Set,d=new Set,f=null,_=null;function m(){if(!o||!r)return[];let A=r.get(o);return ga(A?A.lines:[])}function y(){if(!o||!r)return null;let A=r.get(o),T=A?A.last_event_at:null;return typeof T=="number"?T:null}function $(){return a.status==="running"}function g(){if($()&&o){_||(_=setInterval(()=>G(),1e3));return}L()}function L(){_&&(clearInterval(_),_=null)}function z(A){let T=[],Z=0;for(;Z<A.length;){let te=A[Z];if(te.kind==="tool"){let re=Z;for(;re<A.length&&A[re].kind==="tool"&&A[re].tool===te.tool;)re+=1;if(re-Z>=Rc&&!d.has(Z)){T.push({kind:"group",idx:Z,tool:te.tool||"",lines:A.slice(Z,re).map((de,Ie)=>({idx:Z+Ie,line:de}))}),Z=re;continue}}T.push({kind:"line",idx:Z,line:te}),Z+=1}return T}function H(A){for(let T=A.length-1;T>=0;T-=1){let Z=A[T];if(Z.kind==="result"||Z.kind==="error")return null;if(Z.kind==="tool"&&!Object.hasOwn(Z,"result"))return Z}return null}function j(A){for(let T=A.length-1;T>=0;T-=1)if(A[T].kind==="thinking")return A[T];return null}function P(A,T){if(T.kind==="gate")return c`<div class="sv__gate">${T.text}</div>`;if(T.kind==="phase")return c`<div class="sv__phase">${T.text}</div>`;if(T.kind==="result")return c`<div
        class="sv__result${T.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${T.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Fn(T.text||(T.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(T.kind==="thinking"){let Z=i.has(A);return c`<div
        class="sv__think${Z?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>K(A)}
      >
        <span class="sv__think-line">💭 ${gr(T.text)}</span>
        ${Z?c`<pre class="sv__think-expand">${T.text}</pre>`:""}
      </div>`}if(T.kind==="error")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="blocker")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="tool"){let Z=i.has(A),te=T.tool==="Bash"?Mc(T.command):0,re=T.tool==="Bash"?te>1?gr(T.command):T.command:T.path||T.command||"";return c`<div
        class="sv__tool${Z?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>K(A)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${T.icon}</span>
          <span class="sv__tool-name">${T.tool}</span>
          ${re?c`<span class="sv__tool-detail">${re}</span>`:""}
          ${te>1?c`<span class="sv__tool-more">⋯ ${te}줄</span>`:""}
          ${typeof T.added=="number"?c`<span class="sv__diff-add">+${T.added}</span>`:""}
          ${typeof T.removed=="number"?c`<span class="sv__diff-del">−${T.removed}</span>`:""}
          ${T.result?c`<span class="sv__tool-ok">→ ${T.result}</span>`:""}
        </span>
        ${Z?c`<pre class="sv__tool-expand">${E(T)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Fn(T.text||"")}</div>`}function E(A){let T=[];if(A.tool==="Bash"&&typeof A.command=="string"&&A.command.length>0)T.push(A.command);else if(A.input!==void 0)try{T.push(`input: ${JSON.stringify(A.input,null,2)}`)}catch{}return typeof A.output=="string"&&A.output.length>0&&T.push(`output:
${A.output}`),T.join(`

`)}function S(){if(!o)return c``;let A=m(),T=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),Z=a.session_id||"",te=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,re=$(),de=re?Uc(y(),Date.now()):"",Ie=re?H(A):null,fe=re?j(A):null,Se=Bc(A);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Se?c`<span
              class="sv__stage${Se.guess?" sv__stage--guess":""}"
              title=${Se.text}
              >${Se.text}</span
            >`:""}
        ${re?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${de?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${de}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${de?c`<span class="sv__live-ago">${de}</span>`:""}</span
            >`:""}
        ${Z?c`<button
              type="button"
              class="sv__session"
              title=${Z}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Z}`}
              @click=${()=>xe(Z)}
            >
              ⧉ ${Z.slice(0,8)}
            </button>`:""}
        ${T?c`<span class="sv__meta">${T}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${te}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${te}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>J()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${A.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:z(A).map(Ne=>Ne.kind==="group"?O(Ne):P(Ne.idx,Ne.line))}
      </div>
      ${Ie||fe?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ie?c`<span class="sv__now-icon">${Ie.icon}</span>
                  <span class="sv__now-name">${Ie.tool}</span>
                  <span class="sv__now-detail"
                    >${Ie.tool==="Bash"?gr(Ie.command):Ie.path||Ie.command||""}</span
                  >`:""}
            ${fe?c`<span class="sv__now-think"
                  >💭 ${gr(fe.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function O(A){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>x(A.idx)}
    >
      <span class="sv__group-icon">${A.lines[0].line.icon}</span>
      <span class="sv__group-name">${A.tool}</span>
      <span class="sv__group-count">${A.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function x(A){d.add(A),G()}function G(){Le(S(),e),g(),l&&V()}function V(){let A=e.querySelector(".sv__body");A&&(A.scrollTop=A.scrollHeight)}function K(A){i.has(A)?i.delete(A):i.add(A),G()}function ce(){l=!l,G()}function xe(A){en(A).then(T=>{T?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ze(A){!o||!A||(a={...a,...A},G())}function $e(A){let T=A.target;if(!T||!T.classList||!T.classList.contains("sv__body"))return;!(T.scrollHeight-T.scrollTop-T.clientHeight<=4)&&l&&(l=!1,G())}e.addEventListener("scroll",$e,!0);function Q(A){let T=A&&A.attempt_id;T&&(o=T,a=A.meta||{},l=!0,i.clear(),d.clear(),!f&&r&&(f=r.subscribe(G)),n&&Promise.resolve(n("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),G())}function J(){let A=o;o=null,i.clear(),d.clear(),L(),n&&A&&Promise.resolve(n("unsubscribe-session-log",{id:`session-log:${A}`})).catch(()=>{}),Le(c``,e),s&&s()}return{open:Q,updateMeta:ze,close:J,isOpen(){return o!==null},destroy(){L(),f&&(f(),f=null),e.removeEventListener("scroll",$e,!0),o=null,Le(c``,e)}}}function zc(e){let t=e&&e.metadata||{},n=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&n.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim()}),n}function ma(e,t){let n=zc(e);return c`
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
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var cs=["opus","sonnet","haiku","fable"],ds=["low","medium","high","xhigh"],us=["codex","opus","fable","self","skip"],ps=["opus","fable","sonnet","haiku"],Hc=["standard","fast_track"],fs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function br(e,t){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 \uC804\uC5ED)`:fs[e]||"(\uAE30\uBCF8)"}function qn(e,t,n,r,s,o){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${n.map(a=>c`<option value=${a.value} ?selected=${a.value===r}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Bn(e,t){let n=e.map(r=>({value:r,label:r}));return typeof t=="string"?[{value:"",label:t},...n]:n}function ba(e,t,n){let r=e&&e.metadata||{},s=n&&typeof n=="object"?n:{},o=r.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${qn("orchestration_model","orchestration_model",Bn(cs,br("orchestration_model",s)),r.orchestration_model||"",!1,t)}
    ${qn("orchestration_effort","orchestration_effort",Bn(ds,br("orchestration_effort",s)),r.orchestration_effort||"",!1,t)}
    ${qn("review_model","review_model",Bn(us,br("review_model",s)),r.review_model||"",!1,t)}
    ${qn("impl_model","impl_model",Bn(ps,br("impl_model",s)),r.impl_model||"",!1,t)}
    ${qn("workflow_mode","workflow_mode",Bn(Hc),o,r.workflow_mode==="fast_track",t)}
  `}function Wc(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function va(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function i($){$.key==="Escape"&&s&&($.preventDefault(),m())}document.addEventListener("keydown",i);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wc(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>m()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Fn(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Le(d(),e)}async function _($){s=$,o="loading",a="",l="",f();let g=n?n():"";if(!g){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let L="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent($);try{let z=await r(L),H=await z.json().catch(()=>({}));if(!z.ok||!H||H.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(H&&H.error||z.status)+")",f();return}a=String(H.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){s=null,Le(c``,e)}function y(){document.removeEventListener("keydown",i),m()}return{open:_,close:m,destroy:y}}var Gc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],wa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function jc(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Yc(e){let t=gn(e);if(!t||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${wa}
          >부분 집계</span
        >`:""}`}function Vc(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${Gc.map(n=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${n.label}</span
          ><span class="detail-session__usage-value"
            >${jc(e[n.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${wa}</span>`:""}
  </div>`}var Kc={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Zc(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function ka(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,m=o.has(d.attempt_id),y=_&&!m,$=_?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!y}
      title=${$}
      @click=${g=>{g.stopPropagation(),y&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,m=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${m}>
      ${d.cause}
    </div>`},i=d=>{if(!gn(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Yc(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>c`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Kc[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?c`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${gn(d.usage)?c`<span class="detail-session__usage"
                    >${gn(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Zc(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${l(d)}
            ${s.has(d.attempt_id)&&d.usage?Vc(d.usage):""}
          </div>`)}
    </div>
  `}var Xc=["open","in_progress","deferred","resolved","closed"],Qc=[0,1,2,3,4];function ya(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.sessionLogStore,i=null,d=null,f={},_=!1,m=!1,y="",$="",g="";function L(){_=!1,m=!1,y="",$="",g=""}let z=document.createElement("div");z.className="md-viewer-root",document.body.appendChild(z);let H=va(z,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),j=document.createElement("div");j.className="session-log-root",document.body.appendChild(j);let P=mr(j,{transport:s?(w,q)=>Promise.resolve(s(w,q)):void 0,sessionLogStore:l});function E(){if(!a||!i)return[];let w=a.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(C=>C&&C.bead_id===i).sort((C,ee)=>(ee.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,usage:C.usage||null}))}function S(){if(!a||!i)return null;let w=a.get();return Rt(w&&w.attempts||{},i)}let O=new Set;function x(w){O.has(w)?O.delete(w):O.add(w),_e()}function G(w){let q=a?a.get():null,C=q&&q.attempts?q.attempts[w]:null;P.open({attempt_id:w,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}async function V(w){if(!s||!w)return;let q=()=>{let ee=a?a.get():null;return ee&&typeof ee.revision=="number"?ee.revision:0},C=await s("worker-attempt-resume",{attempt_id:w,expected_revision:q()});if(C&&C.conflict){let ee=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:q();C=await s("worker-attempt-resume",{attempt_id:w,expected_revision:ee})}C&&C.resumed===!1&&!C.conflict&&C.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}let K={onOpen:G,onResume:V,onToggleUsage:x};function ce(){let w=a?a.get():null,q=w&&w.exec_defaults;return q&&typeof q=="object"?q:{}}let xe=null;n&&n.subscribe&&(xe=n.subscribe(()=>Q()));let ze=null;a&&typeof a.subscribe=="function"&&(ze=a.subscribe(()=>{i&&_e()}));function $e(w){w.key==="Escape"&&i&&(w.preventDefault(),r())}document.addEventListener("keydown",$e);function Q(){if(i){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+i)||[];d=w.find(C=>C&&C.id===i)||w[0]||d}_e()}}function J(w){en(w).then(q=>{q?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function A(w){w.preventDefault(),w.stopPropagation(),i&&J(i)}function T(w,q){w.preventDefault(),w.stopPropagation(),J(q)}function Z(w,q){w.preventDefault(),w.stopPropagation(),H.open(q)}function te(w,q){f[w]=q,_e(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:w,value:q})).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function re(w,q,C){if(!s||!i)return!1;try{let ee=await Promise.resolve(s(w,q)),je=Array.isArray(ee)?ee[0]:ee;return je&&typeof je=="object"&&je.id?(d=je,!0):(le(C,"error"),!1)}catch{return le(C,"error"),!1}}function de(w){setTimeout(()=>{try{let q=e.querySelector(w);q&&typeof q.focus=="function"&&q.focus()}catch{}},0)}function Ie(){_=!0,y=d&&d.title||"",_e(),de('.detail-edit__input[data-edit="title"]')}function fe(w){y=w.target.value}function Se(){_=!1,y="",_e()}function Ne(){re("edit-text",{id:i,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(_=!1,y=""),_e()})}function He(){m=!0,$=d&&d.description||"",_e(),de('.detail-edit__textarea[data-edit="description"]')}function rt(w){$=w.target.value}function Xe(){m=!1,$="",_e()}function F(){re("edit-text",{id:i,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(m=!1,$=""),_e()})}function W(w,q,C,ee){if(w.key==="Escape"){w.stopPropagation(),C();return}w.key==="Enter"&&(!ee||w.ctrlKey||w.metaKey)&&(w.preventDefault(),q())}function M(w){let q=w.target.value;re("update-status",{id:i,status:q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_e())}function se(w){let q=Number(w.target.value);re("update-priority",{id:i,priority:q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_e())}function ue(w){g=w.target.value}function ge(){let w=g.trim();w.length!==0&&re("label-add",{id:i,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(q=>{q&&(g=""),_e()})}function pe(w){if(w.key==="Escape"){w.stopPropagation(),g="",_e();return}w.key==="Enter"&&(w.preventDefault(),ge())}function Ae(w){re("label-remove",{id:i,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_e())}let Oe={onCopyPath:T,onOpenDoc:Z},st={onChange:te};function it(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Qe(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function We(w){let C=(Array.isArray(w.dependencies)?w.dependencies:[]).map(ee=>({id:it(ee),icon:Qe(ee)})).filter(ee=>ee.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${C.map(ee=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ee.id)}
                  >
                    ${ee.icon?`${ee.icon} `:""}${ee.id}
                  </button>`:c`<span class="detail-dep"
                    >${ee.icon?`${ee.icon} `:""}${ee.id}</span
                  >`)}
          </div>`}
    `}function ot(w){let q=w.metadata||{},C=w.workflow||{},ee=C.stages||{},je=ee.spec&&ee.spec.stale,u=ee.impl&&ee.impl.stale,v=C.route_source==="derived",D=C.route||q.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${v?" detail-kv__v--derived":""}"
          title=${v?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${v&&C.route?`${D} ? (\uCD94\uB860)`:D}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${q.spec_review||"\uC5C6\uC74C"}${je?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${q.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${q.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${q.pr_url}</span>
          </div>`:""}
    `}let Te={route:["spec_backed","full_plan"]};async function Je(w,q){let C=q.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_e();return}await re("update-workflow-meta",{id:i,key:w,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_e()}function N(w){let q=w.metadata||{};return c` ${((ee,je)=>{let u=Te[ee],v=typeof q[ee]=="string"?q[ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ee}
          data-edit=${`wfmeta-${ee}`}
          @change=${D=>Je(ee,D)}
        >
          <option value="" ?selected=${!u.includes(v)}>
            ${je}
          </option>
          ${u.map(D=>c`<option value=${D} ?selected=${v===D}>${D}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function B(w){return _?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${fe}
            @keydown=${q=>W(q,Ne,Se,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ne}
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
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ie}
        >
          ✎
        </button>
      </div>
    `}function oe(w){let q=dt(w.created_at),C=dt(w.updated_at);return!q&&!C?c``:c`
      ${q?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function ne(w,q){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${M}
        >
          ${Xc.map(C=>c`<option value=${C} ?selected=${C===w}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${se}
        >
          ${Qc.map(C=>c`<option value=${String(C)} ?selected=${C===q}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function ae(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${m?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${He}
            >
              ✎
            </button>`}
      </div>
      ${m?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${rt}
              @keydown=${q=>W(q,F,Xe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${F}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Xe}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function we(w){let q=typeof w.notes=="string"?w.notes:"";return q.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${q}</div>
    `}function ye(w){let q=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${q.map(C=>c`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>Ae(C)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${g}
            @input=${ue}
            @keydown=${pe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ee(){if(!i)return c``;let w=d||{},q=String(w.id||i),C=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ee=w.status||"open",je=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",u=w.description||"",v={...w,metadata:{...w.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>r()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${A}
          >
            ${q}
          </button>
          ${B(C)} ${ne(ee,je)}
          ${oe(w)} ${ae(u)}
          ${we(w)} ${ye(w)} ${We(w)}
          ${ot(w)} ${N(w)}
          ${ma(w,Oe)}
          ${ba(v,st,ce())}
          ${ka(E(),K,{total:S(),expanded:O})}
        </div>
      </div>
    `}function _e(){Le(Ee(),e)}return{load(w){w!==i&&(f={},L()),i=w,d=null,Q()},clear(){i=null,d=null,f={},L(),H.close(),P.close(),Le(c``,e)},destroy(){xe&&(xe(),xe=null),ze&&(ze(),ze=null),document.removeEventListener("keydown",$e),H.destroy(),z.parentNode&&z.parentNode.removeChild(z),P.destroy(),j.parentNode&&j.parentNode.removeChild(j),i=null,d=null,Le(c``,e)}}}var Jc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $a(e,t){return qr(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ed(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}function xa(e,t){let{policyStore:n,transport:r,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let O=n.get();if(O)try{let x=await r("display-policy-set",{expected_revision:O.revision,policy:S(O)});i(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:S(x.policy)}),i(x)),x&&x.conflict&&le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{le("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(S){S&&S.policy&&typeof S.policy=="object"&&n.set(S.policy)}function d(S){let O=n.get();if(!O)return;let x=$a(S,O)!=="shown";l(G=>ed(S,G,x))}function f(){let S=a.trim();S.length!==0&&(a="",l(O=>O.hidden_prefixes.includes(S)?{hidden_prefixes:O.hidden_prefixes}:{hidden_prefixes:[...O.hidden_prefixes,S]}),L())}function _(S){l(O=>({hidden_prefixes:O.hidden_prefixes.filter(x=>x!==S)}))}function m(S){let O=n.get();if(!O)return;let x=O.chips[S]===!1;l(()=>({chips:{[S]:x}}))}function y(S){let O=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${O.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${O.map(x=>{let G=$a(x,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${G}`}
                  data-label=${x}
                  data-state=${G}
                  @click=${()=>d(x)}
                >
                  ${x}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(O=>c`<span class="display-settings__prefix">
                ${O}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${O} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(O)}
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
            @input=${O=>{a=String(O.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function g(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Jc.map(([O,x])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${O}
                  .checked=${S.chips[O]!==!1}
                  @change=${()=>m(O)}
                />
                <span>${x}</span>
              </label>`)}
        </div>
      </section>
    `}function L(){let S=n.get();Le(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${E}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${y(S)} ${$(S)}
                ${g(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let z=!1,H=()=>{z=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let j=null;n.subscribe&&(j=n.subscribe(()=>{z&&L()}));function P(){z||(a="",z=!0,L(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){z&&(z=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:E,destroy(){z=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),j&&(j(),j=null),o.remove()}}}function Sa(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,f,_="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=f||"An unrecoverable error occurred.");let m=typeof _=="string"?_.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:i,close:l,getElement(){return t}}}function Aa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ta(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var td={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ea=160;function nd(e){return e.length>Ea?`${e.slice(0,Ea)}\u2026`:e}var rd=[{key:"orchestration_model",values:()=>cs},{key:"orchestration_effort",values:()=>ds},{key:"review_model",values:()=>us},{key:"impl_model",values:()=>ps}];function vr(e,t){let{queueStore:n,transport:r,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return n&&n.get()||{revision:0,exec_defaults:{}}}function l(){let x=a();return typeof x.revision=="number"?x.revision:0}function i(){let x=a().exec_defaults;return x&&typeof x=="object"?x:{}}function d(x){x&&x.queue&&n&&n.set(x.queue)}async function f(x,G){if(!r)return;let V={key:x,value:G||null};try{let K=await r("worker-queue-set-exec-default",{...V,expected_revision:l()});d(K),K&&K.conflict&&(K=await r("worker-queue-set-exec-default",{...V,expected_revision:l()}),d(K)),K&&K.conflict&&le("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{le("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(x,G,V){let K=!!V&&!G.includes(V);return c`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${x}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${x}`}
        data-key=${x}
        @change=${ce=>{f(x,ce.target.value)}}
      >
        <option value="" ?selected=${!V}>
          ${fs[x]||"(\uAE30\uBCF8)"}
        </option>
        ${K?c`<option value=${V} ?selected=${!0}>
              ${V} (비호환)
            </option>`:""}
        ${G.map(ce=>c`<option value=${ce} ?selected=${V===ce}>${ce}</option>`)}
      </select>
    </div>`}function m(){let x=a().workspace_info;return x&&typeof x=="object"?x:{}}function y(x,G){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${x}"
      >${G}</span
    >`}function $(x){let G=x?Ta(x.cmd):"",V=x?Aa(x.timeout_ms):"",K=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${y("config","config")}
            ${V?c`<span class="exec-defaults__vd-meta"
                  >timeout ${V}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(x){let G=x?Ta(x.cmd):"",V=x?Aa(x.timeout_ms):"",K=V?`timeout ${V} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ce=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${y("config","config")}
            ${x.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${K}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ce}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function L(x){if(!x||typeof x!="object")return"";let G=td[String(x.outcome)];if(!G)return"";let V=x.outcome==="failed"&&x.reason?`${G.label} \xB7 ${x.reason}`:G.label,K=[dt(x.at),typeof x.bead_id=="string"?x.bead_id:"",typeof x.base_sha=="string"?x.base_sha.slice(0,7):""].filter(ze=>ze.length>0).join(" \xB7 "),ce=typeof x.detail=="string"&&x.detail.length>0?nd(x.detail):"",xe=typeof x.log_path=="string"&&x.log_path.length>0?x.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(G.modifier,V)}
        ${K?c`<span class="exec-defaults__vd-meta">${K}</span>`:""}
      </div>
      ${ce?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ce}</code>
          </div>`:""}
      ${xe?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${xe}</code>
          </div>`:""}
    </div>`}function z(x){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(x.verify_cmd)} ${g(x.deploy_cmd)}
      ${L(x.last_deploy)}
    </section>`}function H(){let x=i();Le(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${rd.map(G=>_(G.key,G.values(),x[G.key]||""))}
            ${z(m())}
          </div>
        </div>
      `,o)}let j=!1,P=()=>{j=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let E=null;n&&n.subscribe&&(E=n.subscribe(()=>{j&&H()}));function S(){j||(j=!0,H(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:O,destroy(){j=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),E&&(E(),E=null),o.remove()}}}function bn(e){let t=bt(e.created_at),n=bt(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function _s(e){let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=$t(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,l=a?bt(e.done_at):"",i=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=c`<span class="worker-mini__title">${e.title}</span>`,m=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",y=n.map(S=>S===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),$=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",g=r?c`<span class="worker-usage" title=${mn(e.usage)}
        >${r}</span
      >`:"",L=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",z=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",j=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=e.revise_action?c`<button
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
        </button>`:"",E=!!(r||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">${d}${f}${_}</div>
          <div class="worker-mini__row2">
            ${g}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${dt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${y}${L}
            <span class="worker-mini__actions"
              >${z}${H}${j}</span
            >
            ${bn(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${i}${d}${f}${m}${y}${$}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${E?c`<div class="worker-mini__foot">
                  ${g}${L}
                  <span class="worker-mini__actions"
                    >${z}${H}${j}${P}</span
                  >
                </div>`:""}
            ${bn(e)}`:c`<div class="worker-mini__line">
              ${i}${d}${f}${_}${m}${y}${$}${g}${L}${z}${H}${j}
            </div>
            ${bn(e)}`}
  </div>`}function sd(e){let t=e.draggable&&!e.done,n=e.workflow,r=n&&n.chips||{},s=r.route||n&&n.route,o=r.route_source==="derived"||!!(n&&n.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
      ${n&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${n?sr(n,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${a?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${bn(e)}
  </div>`}function Lt(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?sd(r):_s(r))}
          </div>`}
  </section>`}var Ca=160;function hs(e){return e.length>Ca?`${e.slice(0,Ca)}\u2026`:e}function od(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${hs(e.command)}</code>`:""}
  </div>`}function ad(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function id(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function gs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function ld(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return c`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?c`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:c`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?c`<div class="worker-banner__detail">
          남은 작업: <code>${hs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?c`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:c`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?c`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function Ra(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${od(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(n=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${n.bead_id}
        >
          ⚠ ${n.bead_id} 머지 완료 — 머지 후 정리가 <b>${n.step}</b> 단계에서
          멈췄습니다 (${n.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${n.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${n.detail?c`<div class="worker-banner__detail">
                <code>${hs(n.detail)}</code>
              </div>`:""}
          ${id(n.log_path)} ${ad(n.output_tail)}
        </div>`)}
    ${ld(e.shipFailure)}
  </div>`}function cd(e,t,n=null){let r=!!e.paused,s=r?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?gs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=$t(e.usage),l=e.conflict_resolution?r?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===n;return c`<div
    class="rtile${d?" rtile--sel":""}${r?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${r?c`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||l||i?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${i?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${a?c`<span class="worker-usage" title=${mn(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${bn(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${r?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ms(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>cd(s,t,n))}
  </div>`}function Ht(e){return c`<svg
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
  </svg>`}function bs(){return Ht(Ot`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function vs(){return Ht(Ot`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ws(){return Ht(Ot`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function La(){return Ht(Ot`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ia(){return Ht(Ot`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Da(){return Ht(Ot`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Oa(){return Ht(Ot`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ma(){return Ht(Ot`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Un=1,dd=6e4,ud={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},pd=new Set(["auto_merge","merged","merge","done"]),Na={running:3,paused:2,failed:1};function fd(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function _d(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!r.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),m=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Na[d.run_state],m=Na[l];if(_>m||_===m&&(d.started_at??0)>(i??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Rt(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!r.has(a.attempt_id)})}return o}function Pa(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Tt(e){return e&&typeof e=="object"?e:{}}function ks(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let l=[],i=[],d=[],f=[],_=[],m=new Map;for(let g of r){if(!g||typeof g.root_dir!="string")continue;let L=g.root_dir,z=g.name||L,H=a.get(L),j=H&&typeof H.revision=="number"?H.revision:typeof g.revision=="number"?g.revision:0,P=Tt(g.attempts),E=Tt(g.bead_titles),S=Tt(g.pr_observations),O=Tt(g.admission),x=Tt(g.revise_parked),G=Tt(g.merge_queue_state),V=Tt(g.cleanup_failed),K=Array.isArray(g.merge_queue)?g.merge_queue:[],ce=new Set(K.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),xe=Array.isArray(g.queue)?g.queue:[],ze=Array.isArray(g.done)?g.done:[],$e=new Map;for(let A of ze)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&$e.set(A.bead_id,A.added_at);let Q=A=>({id:A,title:E[A]||A,root_dir:L,workspace_name:z,expected_revision:j,draggable:!1}),J=new Set;for(let[A,T]of _d(P,$e))J.add(A),i.push({...Q(A),lane:"running",attempt_id:T.attempt_id,run_state:T.run_state,can_pause:T.can_pause,can_resume:T.can_resume,started_at:T.started_at,last_event_at:T.last_event_at,model:T.model,usage:T.usage,badges:T.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:T.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:T.run_state==="failed"});for(let A of Array.isArray(g.pr_wait)?g.pr_wait:[]){let T=A&&A.bead_id;if(typeof T!="string"||J.has(T))continue;J.add(T);let Z=Tt(S[T]),te=Tt(Z.pr),re=Z.gate?Tt(Z.gate):null,de=ce.has(T),Ie=G.active===T,fe=A.external===!0,Se=V[T]||null,Ne=!!re&&re.base_badge==="\uCDA9\uB3CC",He=!!Se&&!!re&&re.tier==="merged",rt=fe&&!!re&&re.tier==="merged";d.push({...Q(T),lane:"pr_wait",pr_number:typeof te.number=="number"?te.number:null,pr_url:typeof te.url=="string"?te.url:void 0,external:fe,usage:Rt(P,T),badges:Se?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Se,reason:Se?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!de,merge_enabled:re?.enabled===!0||Ne||He||rt,merge_label:rt?"\uC815\uB9AC":Ne&&!He?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:rt?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":He?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ne?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.enabled===!0?`\uBA38\uC9C0 (${re.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${re?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:de,cancel_enabled:!Ie,discard_action:!fe&&!Se&&!(re&&re.tier==="merged"),discard_enabled:!Ie&&!de,discard_title:de?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let A=0;A<xe.length;A++){let T=xe[A],Z=T&&T.bead_id;if(typeof Z!="string"||J.has(Z))continue;J.add(Z);let te=x[Z],re={...Q(Z),lane:"queue",reason:Pa(O,Z),queue_position:A+1,queue_index:A,queue_length:xe.length,badges:te?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!te,revise_action:!!te,revise_enabled:!!te,revise_title:te?te.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${te.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(re);let de=m.get(L);de?de.push(re):m.set(L,[re])}for(let A of Array.isArray(g.runnable)?g.runnable:[]){let T=A&&A.bead_id;typeof T!="string"||J.has(T)||(J.add(T),l.push({...Q(T),title:A.title||E[T]||T,lane:"runnable",draggable:!0,reason:Pa(O,T),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,workflow:A.route?{route:A.route,chips:{route:A.route}}:null,place_index:xe.length}))}for(let A of ze){let T=A&&A.bead_id;if(typeof T!="string"||J.has(T)||(J.add(T),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let Z=fd(P,T);_.push({...Q(T),lane:"done",done:!0,usage:Rt(P,T),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Z&&typeof Z.done_kind=="string"?Z.done_kind:null})}}i.sort((g,L)=>(L.last_event_at??0)-(g.last_event_at??0)),_.sort((g,L)=>(L.done_at??0)-(g.done_at??0));let y=s.length>0?s:r.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),$=[];for(let g of y)!g||typeof g.root_dir!="string"||$.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=Un?g.slots:Un,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:Tt(g.exec_defaults),items:m.get(g.root_dir)||[]});return{runnable:l,queue:f,queue_groups:$,running:i,pr_wait:d,done:_,automation:{total:$.length,both_on:$.filter(g=>g.auto_advance&&g.auto_merge).length}}}function hd(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let r=t-e<dd;return c`<span
    class="mon-beat${r?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${r?"":c`<span class="mon-beat__age"
          >${bt(e,t)}</span
        >`}</span
  >`}function zn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function wr(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ys(e){let t=$t(e.usage);return t?c`<span class="mon-c__usage" title=${mn(e.usage)}
        >${t}</span
      >`:""}function $s(e){return(Array.isArray(e.badges)?e.badges:[]).map(n=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${n}</span
      >`)}function gd(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${vs()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${bs()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${ws()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${La()}
        </button>`:""}
  </span>`}function md(e,t){let n=typeof e.started_at=="number"?gs(t-e.started_at):"";return c`${zn(e)}
    <div class="mon-c__meta">
      ${$s(e)}${hd(e.last_event_at,t)}${Hn(e)}${wr(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${n?c`<span class="mon-live__elapsed">${n}</span>`:""}
      ${ys(e)}${gd(e)}
    </div>`}function bd(e){let t=e.workflow,r=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=bt(e.updated_at);return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${r?c`<span class="ctl-chip ctl-chip--route">${r}</span>`:""}
      ${wr(e)}
      ${o?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function vd(e){return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${$s(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
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
        </div>`:""}`}function wd(e){let t=!!($t(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${wr(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${$s(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${ys(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function kd(e,t){let n=e.done_kind||"",r=n?ud[n]||n:"",s=bt(e.done_at,t);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${wr(e)}
      ${r?c`<span
            class="mon-live__kind${pd.has(n)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${r}</span
          >`:""}
      ${ys(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${dt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Fa(e,t){return e.lane==="running"?md(e,t):e.lane==="runnable"?bd(e):e.lane==="queue"?vd(e):e.lane==="pr_wait"?wd(e):kd(e,t)}function qa(e){let t=String(e.revision);return c`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?vs():bs()}
        <span class="mon-ctl__label">진행</span>
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
        ${Ia()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Da()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Un}
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
        ${Oa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Ba(e){let{total:t,both_on:n}=e.automation,r=t>0&&n===t,s=Ct.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${r?" is-active":""}"
      data-on=${r?"false":"true"}
      aria-pressed=${r?"true":"false"}
      ?disabled=${t===0}
      title=${r?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${r?ws():Ma()}
      <span class="mon-auto-all__label"
        >${r?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${n}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
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
        ${Ct.map(o=>c`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function Ua(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function za(e){let t={};for(let a of Nt)t[a]=0;let n=!1,r=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let i=!1;for(let d of Nt){let f=l[d];typeof f=="number"&&Number.isFinite(f)&&(t[d]+=f,n=!0,i=!0)}if(i){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(r+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=r),n?$t(t):null}var Wa="bdui.monitor.done-range";function yd(){try{let e=window.localStorage.getItem(Wa);return Mt(e)?e:wt}catch{return wt}}function $d(e){try{window.localStorage.setItem(Wa,e)}catch{}}var Ga="tab:monitor:pipeline",xd=1e3,Sd=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ha(e,t){let n=e.lane==="runnable"||e.lane==="queue";return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${n?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${Fa(e,t)}
  </div>`}function ja(e,t){let n=Ge("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(F=>typeof globalThis.confirm!="function"||globalThis.confirm(F)),f=yd();function _(){let F=Ct.find(W=>W.value===f);return F?F.label:""}let m=document.createElement("div");m.className="mon",e.appendChild(m);let y=ks(null,null),$=null,g=new Map,L=new Set;function z(F){return y.queue_groups.find(W=>W.root_dir===F)||null}let j=vr(e,{queueStore:{get(){if(!$)return{revision:0,exec_defaults:{}};let F=g.get($);if(F)return F;let W=z($),M=s&&s.get?s.get():null,se=(Array.isArray(M)?M:[]).find(ue=>ue&&ue.root_dir===$);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},workspace_info:se?se.workspace_info:void 0}},set(F){$&&g.set($,F);for(let W of Array.from(L))W()},subscribe(F){return L.add(F),()=>L.delete(F)}},transport:o?(F,W)=>o(F,{...W||{},root_dir:$}):void 0,getWorkspacePath:()=>$||void 0}),P=null,E=null;async function S(F,W,M,se){if(!o||!M)return null;let ue=await o(F,{...W,root_dir:M,expected_revision:se});if(ue&&ue.conflict){let ge=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:se;ue=await o(F,{...W,root_dir:M,expected_revision:ge})}return ue&&ue.queue&&M&&g.set(M,ue.queue),ue}async function O(F,W,M){return!o||!M?null:await o(F,{...W,root_dir:M})}async function x(F){if(!o||!F&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:F}),M=W&&Array.isArray(W.failed)?W.failed:[];M.length>0&&le(`\uC790\uB3D9\uD654 ${F?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(se=>se.root_dir).join(", ")}`,"error",3200)}async function G(){let F=new Map;for(let W of y.pr_wait)F.has(W.root_dir)||F.set(W.root_dir,W.expected_revision);for(let[W,M]of F)await S("worker-merge-queue-add-all",{},W,M)}let V=null,K=!1,ce=null;function xe(){ce!==null&&clearTimeout(ce),ce=setTimeout(()=>{ce=null,K=!1},0)}function ze(F){let W=F.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function $e(F){let W=ze(F);return!W||!V?null:(W.getAttribute("data-root-dir")||"")===V.root_dir?W:null}function Q(){for(let F of Array.from(m.querySelectorAll(".mon-group--drag-over")))F.classList.remove("mon-group--drag-over")}function J(F){let W=F.target,M=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(M){V={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},K=!0;try{F.dataTransfer?.setData("text/plain",V.bead_id),F.dataTransfer&&(F.dataTransfer.effectAllowed="move")}catch{}}}function A(F){let W=$e(F);W&&(F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function T(F){ze(F)?.classList.remove("mon-group--drag-over")}function Z(){V=null,Q(),xe()}function te(F){let W=$e(F),M=V;if(V=null,Q(),!W||!M||!M.bead_id)return;F.preventDefault();let se=F.target,ue=typeof se?.closest=="function"?se.closest('.mon-card[data-lane="queue"]'):null,ge=ue&&W.contains(ue)?Number(ue.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let Oe=Number.isFinite(ge)?ge:M.place_index;if(!Number.isFinite(Oe))return;S("worker-queue-place",{bead_id:M.bead_id,index:Oe},M.root_dir,M.revision);return}if(M.lane!=="queue"||ue&&ue.getAttribute("data-issue-id")===M.bead_id)return;let pe=M.queue_index,Ae=Number.isFinite(ge)?pe>ge?ge:ge-1:M.queue_length-1;!Number.isFinite(Ae)||Ae<0||Ae===pe||S("worker-queue-reorder",{bead_id:M.bead_id,to_index:Ae},M.root_dir,M.revision)}function re(F){let W={runnable:y.runnable,queue:y.queue,running:y.running,pr_wait:y.pr_wait,done:y.done};return c`${Ba({automation:y.automation,counts:{running:y.running.length,queue:y.queue.length,pr_wait:y.pr_wait.length},done_range:f,token_total:za(y.done),token_tooltip:Ua(_())})}
      <div class="worker-lanes mon-lanes">
        ${Sd.map(M=>{let se=W[M.lane],ue=M.lane==="queue"?y.queue_groups.length>0?c`${y.queue_groups.map(ge=>c`<div
                        class="mon-group"
                        data-root-dir=${ge.root_dir}
                      >
                        ${qa(ge)}
                        <div class="mon-group__list">
                          ${ge.items.map(pe=>Ha(pe,F))}
                        </div>
                      </div>`)}`:void 0:se.length>0?c`${se.map(ge=>Ha(ge,F))}`:void 0;return Lt({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${_()}`:M.title,items:se,empty:M.empty,body:ue,live:M.lane==="running"&&se.length>0,header_control:M.lane==="pr_wait"&&se.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function de(){let F=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=i();y=ks(F,W,{done_since:cn(f,M)}),Le(re(M),m)}function Ie(F,W){let M=a?a():void 0;if(!W||!M||W===M||!l){r(F);return}l(W).then(()=>{r(F)}).catch(se=>{n("workspace switch for %s failed: %o",W,se)})}function fe(F){return{root_dir:F.getAttribute("data-root-dir")||"",revision:Number(F.getAttribute("data-revision")||0)||0}}function Se(F,W){let{root_dir:M,revision:se}=fe(F),ue=F.getAttribute("data-issue-id")||"",ge=F.getAttribute("data-attempt-id")||"",pe=W.classList;if(pe.contains("worker-card__place")){S("worker-queue-place",{bead_id:ue,index:Number(F.getAttribute("data-place-index")||0)||0},M,se);return}if(pe.contains("mon-op--up")||pe.contains("mon-op--down")){let Ae=Number(F.getAttribute("data-queue-index")||0)||0,Oe=pe.contains("mon-op--up")?Ae-1:Ae+1;if(Oe<0)return;S("worker-queue-reorder",{bead_id:ue,to_index:Oe},M,se);return}if(pe.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:ue},M,se);return}if(pe.contains("mon-op--pause")){O("worker-attempt-pause",{attempt_id:ge},M);return}if(pe.contains("mon-op--stop")){O("worker-attempt-stop",{attempt_id:ge},M);return}if(pe.contains("mon-op--resume")){S("worker-attempt-resume",{attempt_id:ge},M,se);return}if(pe.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:ge},M,se);return}if(pe.contains("worker-mini__merge")){S("worker-merge-queue-add",{bead_id:ue},M,se);return}if(pe.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:ue},M,se);return}if(pe.contains("worker-mini__discard")){if(!d(`${ue}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;S("worker-pr-discard",{bead_id:ue},M,se);return}if(pe.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:ue},M,se);return}pe.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:ue},M,se)}function Ne(F){let W=K;K=!1;let M=F.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let se=M.closest(".mon-auto-all");if(se){F.preventDefault(),x(se.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){F.preventDefault(),G();return}let ge=M.closest(".mon-ctl--advance");if(ge){F.preventDefault();let{root_dir:Qe,revision:We}=fe(ge);S("worker-queue-toggle",{on:ge.getAttribute("data-on")==="true"},Qe,We);return}let pe=M.closest(".mon-ctl--merge-auto");if(pe){F.preventDefault();let{root_dir:Qe,revision:We}=fe(pe);S("worker-merge-auto-toggle",{on:pe.getAttribute("data-on")==="true"},Qe,We);return}let Ae=M.closest(".mon-ctl--exec");if(Ae){F.preventDefault(),$=Ae.getAttribute("data-root-dir")||null,g.delete($||""),j.open();return}let Oe=M.closest(".mon-card");if(!Oe)return;let st=M.closest("button");if(st){F.preventDefault(),Se(Oe,st);return}let it=Oe.getAttribute("data-issue-id");it&&!W&&(F.preventDefault(),Ie(it,Oe.getAttribute("data-root-dir")||""))}function He(F){let W=F.target;if(!W||typeof W.closest!="function")return;let M=W.closest(".mon-done-range");if(M){f=Mt(M.value)?M.value:wt,$d(f),de();return}let se=W.closest(".mon-slots__input");if(!se)return;let{root_dir:ue,revision:ge}=fe(se),pe=Number(se.value);if(!Number.isFinite(pe))return;let Ae=Math.max(Un,Math.floor(pe));S("worker-queue-set-slots",{slots:Ae},ue,ge)}e.addEventListener("click",Ne),e.addEventListener("change",He),e.addEventListener("dragstart",J),e.addEventListener("dragover",A),e.addEventListener("dragleave",T),e.addEventListener("drop",te),e.addEventListener("dragend",Z),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{g.clear(),de();for(let F of Array.from(L))F()}catch{}}));function rt(){E!==null&&(clearInterval(E),E=null)}function Xe(){ce!==null&&(clearTimeout(ce),ce=null)}return{load(){n("load"),de(),E===null&&(E=setInterval(()=>{try{de()}catch{}},xd))},pause(){rt()},clear(){rt(),Xe(),P&&(P(),P=null),e.removeEventListener("click",Ne),e.removeEventListener("change",He),e.removeEventListener("dragstart",J),e.removeEventListener("dragover",A),e.removeEventListener("dragleave",T),e.removeEventListener("drop",te),e.removeEventListener("dragend",Z),j.destroy(),L.clear(),e.replaceChildren()}}}function Ya(e,t,n){let r=Ge("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),r("click tab %s",i),n.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return c`
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
    `}function l(){Le(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Le(c``,e)}}}var Va=["bug","feature","task","epic","chore"];function Ka(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Za=["Critical","High","Medium","Low","Backlog"];function Xa(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),i=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),f=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function y(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of Va){let O=document.createElement("option");O.value=S,O.textContent=Ka(S),o.appendChild(O)}a.replaceChildren();for(let S=0;S<=4;S+=1){let O=document.createElement("option");O.value=String(S);let x=Za[S]||"Medium";O.textContent=`${S} \u2013 ${x}`,a.appendChild(O)}}y();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function g(E){s.disabled=E,o.disabled=E,a.disabled=E,l.disabled=E,i.disabled=E,f.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function L(){d.textContent=""}function z(E){d.textContent=E}function H(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function j(){let E=o.value||"",S=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function P(){L();let E=String(s.value||"").trim();if(E.length===0){z("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){z("Priority must be 0..4"),a.focus();return}let O=String(o.value||""),x=String(i.value||""),G={title:E};O.length>0&&(G.type=O),String(S).length>0&&(G.priority=S),x.length>0&&(G.description=x),g(!0);try{await t("create-issue",G)}catch{g(!1),z("Failed to create issue");return}j(),g(!1),$()}return n.addEventListener("cancel",E=>{E.preventDefault(),$()}),m.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),n.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),P())}),r.addEventListener("submit",E=>{E.preventDefault(),P()}),{open(){r.reset(),L(),H();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Ad="tab:worker:ready",Td="tab:worker:blocked",Ed="tab:worker:in-progress",kr=1;function As(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var ti="beads-ui.worker.candidate-filter",xs={show_blocked:!1,spec:"all"};function Cd(){try{let e=window.localStorage.getItem(ti);if(!e)return{...xs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...xs};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...xs}}}function Rd(e){try{window.localStorage.setItem(ti,JSON.stringify(e))}catch{}}function Ld(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let i=n(l),d=r(l);i&&d?s.push(l):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Id=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ni="bdui.worker.candidate_sort",Dd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],yr="spec";function Od(){try{let e=window.localStorage.getItem(ni);return e==="board"||e==="created"||e==="spec"?e:yr}catch{return yr}}function Md(e){try{window.localStorage.setItem(ni,e)}catch{}}var ri="bdui.worker.done-range";function Nd(){try{let e=window.localStorage.getItem(ri);return Mt(e)?e:wt}catch{return wt}}function Pd(e){try{window.localStorage.setItem(ri,e)}catch{}}var Fd="(max-width: 640px)",si="beads-ui.worker.lane-collapsed",Wn={queue:!0,done:!0};function qd(){try{let e=window.localStorage.getItem(si);if(!e)return{...Wn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wn}:{queue:typeof t.queue=="boolean"?t.queue:Wn.queue,done:typeof t.done=="boolean"?t.done:Wn.done}}catch{return{...Wn}}}function Bd(e){try{window.localStorage.setItem(si,JSON.stringify(e))}catch{}}function Qa(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Ud(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Xt):(r.sort(Qn(n)),t==="board"?r:[...r.filter(As),...r.filter(s=>!As(s))])}function zd(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Hd(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Wd(e){let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>typeof r=="string"?r:r&&r.id).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}var Gd=["closed_unmerged","undecidable"],jd=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Yd(e,t){for(let n of jd)if(e===n.from&&t===n.activity)return{label:n.to,live:!0};return{label:e,live:!1}}var Ss=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Vd(e){if(typeof e!="string"||e.length===0)return null;let t=Ss.length,n=Ss.findIndex(r=>r.step===e);return n<0?{label:e,index:0,total:t,percent:0}:{label:Ss[n].label,index:n+1,total:t,percent:Math.round((n+1)/t*100)}}function Ja(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function ei(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Kd(e,t,n,r,s=null,o=null,a=null,l=!1,i=null,d=!0,f=null,_=null){let m=!!i&&i.position>0,y=!!i&&i.active===!0,$=i&&i.failure||null,g=n[e]||null,L=g&&g.gate?g.gate:null,z=g&&g.pr?g.pr:null,H=[];l&&H.push("\uC138\uC158");let j=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=Yd(l&&L&&L.tier==="closed_unmerged"?"\uB2EB\uD798":L&&L.gate_badge||"",j?null:o&&o.activity||null);j&&H.push(j),P.label&&H.push(P.label),L&&L.base_badge&&L.base_badge!==L.gate_badge&&H.push(L.base_badge),_&&H.push(_),r&&H.push("\uC815\uB9AC \uC2E4\uD328"),m&&!y&&H.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),$&&H.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Ja($)}`),f&&H.push(`\uC790\uB3D9 \uC81C\uC678: ${Ja(f)}`);let E=!!L&&L.base_badge==="\uCDA9\uB3CC",S=!!L&&L.enabled===!0,O=Vd(o&&o.merge_progress?o.merge_progress.step:null),x=!!r&&!!L&&L.tier==="merged",G=l&&!!L&&L.tier==="merged",V=l&&E&&d===!1;return{id:e,title:t,reason:r?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:z&&typeof z.number=="number"?z.number:null,pr_url:z&&typeof z.url=="string"?z.url:"",badges:H,live_badge:a==="running"?j:j?null:P.live?P.label:null,usage:s,alert:!!L&&Gd.includes(L.tier)||!!r||!!$,merge_action:!m,cancel_action:m,cancel_enabled:!y,cancel_title:y?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!r&&!(L&&L.tier==="merged"),merge_step:O,discard_enabled:!O&&!a&&!m,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":m?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!O&&!a&&!V&&(S||E||x||G),merge_label:G?"\uC815\uB9AC":E&&!O&&!x?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:O?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${O.label}`:G?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":V?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:L&&L.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${L&&L.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ts(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:l,getWorkspacePath:i}=t,d=r?er(r,a):null,f=nr({transport:n,uiOrderStore:a}),_=null,m=[],y=Cd(),$=Od(),g=Nd();function L(){let u=Ct.find(v=>v.value===g);return u?u.label:"\uC624\uB298"}let z=qd(),H=!1,j=new Set,P=new Set,E=[],S=document.createElement("div");S.className="worker-console";let O=document.createElement("div");O.className="worker-top";let x=document.createElement("div");x.className="worker-drawer-overlay",x.hidden=!0;let G=document.createElement("div");G.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host",x.append(G,V);let K=document.createElement("div");K.className="worker-lanes-host",S.append(O,x,K),e.appendChild(S);let ce=null,xe=mr(V,{transport:n,sessionLogStore:o,onClose:()=>{ce=null,x.hidden=!0,Te()}}),ze=vr(S,{queueStore:s,transport:n,getWorkspacePath:i});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:kr,queue:[],pr_wait:[],done:[]}}function Q(){let u=$e();return typeof u.revision=="number"?u.revision:0}function J(u){u&&u.queue&&s&&s.set(u.queue)}function A(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function T(u,v){if(!n)return;let D=await n("worker-queue-place",{bead_id:u,index:v,expected_revision:Q()});J(D),D&&D.conflict&&await n("worker-queue-place",{bead_id:u,index:v,expected_revision:Q()}).then(J)}async function Z(u,v){if(!n)return;let D=await n("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:Q()});J(D),D&&D.conflict&&await n("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:Q()}).then(J)}async function te(u){if(!n)return;let v=await n("worker-queue-remove",{bead_id:u,expected_revision:Q()});J(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:Q()}).then(J)}async function re(u){!n||!u||await n("worker-attempt-stop",{attempt_id:u})}async function de(u){if(!n||!u)return;let v=await n("worker-attempt-pause",{attempt_id:u});v&&v.paused===!1&&v.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ie(u){if(!n||!u)return;let v=await n("worker-attempt-resume",{attempt_id:u,expected_revision:Q()});J(v),v&&v.conflict&&(v=await n("worker-attempt-resume",{attempt_id:u,expected_revision:Q()}),J(v)),v&&v.resumed===!1&&!v.conflict&&v.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function fe(u){if(!n||!u)return;let v=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:Q()});J(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:Q()}),J(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Se(u,v){if(!n)return null;let D=n,he=await D(u,{...v,expected_revision:Q()});return J(he),he&&he.conflict&&(he=await D(u,{...v,expected_revision:Q()}),J(he)),he}async function Ne(u){if(!n||!u)return;j.add(u),Te();let v;try{v=await Se("worker-merge-queue-add",{bead_id:u})}finally{j.delete(u),Te()}!v||v.conflict||v.applied||le("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function He(u){if(!n)return;let v=await Se("worker-merge-auto-toggle",{on:u});!v||v.conflict||le(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function rt(u){if(!n||!u)return;let v=await Se("worker-merge-queue-remove",{bead_id:u});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Xe(){await Se("worker-merge-queue-remove",{all:!0})}async function F(u){if(!n||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let D=await n("worker-pr-discard",{bead_id:u,expected_revision:Q()});if(J(D),D&&D.conflict&&(D=await n("worker-pr-discard",{bead_id:u,expected_revision:Q()}),J(D)),D&&D.discarded===!0){le("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}D&&D.discarded===!1&&!D.conflict&&le(`\uD3D0\uAE30 \uAC70\uBD80: ${D.reason||""}`,"error",2800)}async function W(u,v){if(!n||!v||P.has(v))return;P.add(v),Te();let D;try{D=await n(u,{bead_id:v,expected_revision:Q()}),J(D),D&&D.conflict&&(D=await n(u,{bead_id:v,expected_revision:Q()}),J(D))}finally{P.delete(v),Te()}if(!(!D||D.conflict)){if(D.ok){le(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function M(u){if(!n)return;let v=await n("worker-queue-toggle",{on:u,expected_revision:Q()});J(v),v&&v.conflict&&await n("worker-queue-toggle",{on:u,expected_revision:Q()}).then(J)}async function se(u){await M(u),await He(u)}async function ue(u){if(!n||!Number.isFinite(u))return;let v=Math.max(kr,Math.floor(u)),D=await n("worker-queue-set-slots",{slots:v,expected_revision:Q()});J(D),D&&D.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:Q()}).then(J)}function ge(){let u=$e(),v=d?d.selectBoardColumn(Ad,"ready"):[],D=d?d.selectBoardColumn(Td,"blocked"):[],he=d?d.selectBoardColumn(Ed,"in_progress"):[],Pe=new Map;for(let k of he){let U=Hd(k);if(!U)continue;let ie=Pe.get(U);ie?ie.push(k):Pe.set(U,[k])}let be=k=>{let U=tr(Pe.get(k)||[]);return U?U.title||U.id:null},Me=u.bead_titles||{},Be=new Map;for(let[k,U]of Object.entries(Me))typeof U=="string"&&U.length>0&&Be.set(k,U);for(let k of[...v,...D])Be.set(k.id,k.title||k.id);let et=u.bead_times||{},lt=new Map;for(let[k,U]of Object.entries(et))U&&typeof U=="object"&&lt.set(k,U);for(let k of[...v,...D])lt.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let ve=k=>lt.get(k)||{},ct=u.pr_wait||[],vt=u.pr_observations||{},tt=u.pr_activity||{},at=u.cleanup_failed||{},me=Object.entries(at).map(([k,U])=>({bead_id:k,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0})),Ce=u.ship_failure||null,It=Ce&&typeof Ce.reason=="string"&&Ce.reason?{bead_id:typeof Ce.bead_id=="string"?Ce.bead_id:"",reason:Ce.reason,detail:typeof Ce.detail=="string"?Ce.detail:null,pr_url:typeof Ce.pr_url=="string"?Ce.pr_url:null}:null,qt=u.queue||[],ut=new Set([...qt.map(k=>k.bead_id),...ct.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Bt=new Set(D.map(k=>k.id)),Gt=a?a.get()?.order||{}:{},h=new Set,b=[];for(let k of[...v,...D])ut.has(k.id)||h.has(k.id)||zd(k)||(h.add(k.id),b.push(k));m=Ud(b,$,Gt);let X=u.admission||{},I=k=>{let U=X[k];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof U.reason=="string"?U.reason:"",Fe=ie.indexOf(":");return Fe>0&&Fe<ie.length-1?`\u26D4 ${ie.slice(0,Fe)} (${ie.slice(Fe+1)})`:`\u26D4 ${ie}`},p=m.map(k=>{let U=As(k),ie=Bt.has(k.id),Fe=[];ie&&Fe.push(Wd(k)),U||Fe.push("spec \uC5C6\uC74C");let Vn=I(k.id);return Vn&&Fe.push(Vn),{id:k.id,title:k.title||k.id,reason:Fe.join(" \xB7 "),draggable:U,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:ie,has_spec:U}}),R=Ld(p,y),Y=R.visible,Ue=u.revise_parked||{},nt=(k,U)=>k.map(ie=>{let Fe=U==="queue"?Ue[ie.bead_id]:null;return{id:ie.bead_id,title:Be.get(ie.bead_id)||ie.bead_id,reason:U==="done"?"":I(ie.bead_id),draggable:U!=="done",done:U==="done",lane:U,badges:Fe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Fe,revise_action:!!Fe,revise_enabled:!!Fe&&!P.has(ie.bead_id),revise_title:Fe?Fe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Fe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?Rt(u.attempts||{},ie.bead_id):null,done_at:U==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...ve(ie.bead_id)}}),Ye=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Ye.set(k.bead_id,k.added_at);let Ke=u.attempts?Object.values(u.attempts):[],mt=new Set;for(let k of Ke)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&mt.add(k.resumed_from);let Dt=new Map;for(let k of Ke)Dt.set(k.bead_id,k.attempt_id);let sn=new Map;for(let k of Ke)sn.set(k.attempt_id,k);function Ze(k){let U=new Set,ie=k;for(;ie&&!U.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;U.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&sn.get(ie.resumed_from)||null}return!1}let on=typeof u.declared_base=="string"?u.declared_base:null;function Gn(k){let U=null;for(let ie of Ke)!ie||ie.bead_id!==k||Ze(ie)||(U===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=ie);return U&&typeof U.target_base=="string"?U.target_base:null}let vn=[],Et=null;for(let k of Ke){let U=k.status==="paused"&&!mt.has(k.attempt_id);if(k.status==="running"||U)vn.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Be.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:U,conflict_resolution:Ze(k),base_exception:ei(on,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Rt(u.attempts||{},k.bead_id),current_child:be(k.bead_id),...ve(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ie=Dt.get(k.bead_id)!==k.attempt_id,Fe=Ye.get(k.bead_id),Vn=typeof Fe=="number"&&Fe>0&&typeof k.finished_at=="number"&&Fe>=k.finished_at;!ie&&!Vn&&typeof k.dismissed_at!="number"&&(Et=k)}}let Ls=null;if(Et){let k=typeof Et.session_id=="string"&&Et.session_id.length>0,U=mt.has(Et.attempt_id),ie=Et.cause_detail;Ls={repo:Et.repo||"",reason:Et.cause||Et.status,cause_detail:ie&&typeof ie.reason=="string"?{reason:ie.reason,command:typeof ie.command=="string"?ie.command:null}:null,resume_attempt_id:Et.attempt_id,resume_eligible:k&&!U,resume_reason:k?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let hi=new Set(vn.map(k=>k.bead_id)),$r=Array.isArray(u.merge_queue)?u.merge_queue:[],Is=new Map;$r.forEach((k,U)=>{k&&typeof k.bead_id=="string"&&Is.set(k.bead_id,U+1)});let Ds=u.merge_queue_state||{active:null,failures:{}},gi=Ds.failures||{},mi=u.auto_merge_skips||{},Os=k=>{let U=mi[k];if(!U)return null;let ie=vt[k],Fe=ie&&ie.pr?ie.pr.head_sha:null;return Fe&&Fe===U.head_sha?U.reason||"":null},jn=new Map;for(let k of vn)k.conflict_resolution&&(k.paused?jn.has(k.bead_id)||jn.set(k.bead_id,"paused"):jn.set(k.bead_id,"running"));let Ms=vn.filter(k=>!k.paused).length,Ns=(u.workspace_info||{}).slots,Ps=typeof Ns=="number"?Ns:typeof u.slots=="number"?u.slots:kr,bi=Ms>Ps,Fs=cn(g),vi=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Fs===void 0||typeof k.added_at!="number"||k.added_at>=Fs).sort((k,U)=>(U.added_at||0)-(k.added_at||0)),qs=nt(vi,"done"),Yn={};for(let k of Nt)Yn[k]=0;let Bs=!1,Us=0,xr=0,zs=0;for(let k of qs){let U=k.usage;if(U&&typeof U=="object"){let ie=!1;for(let Fe of Nt)Number.isFinite(U[Fe])&&(Yn[Fe]+=U[Fe],Bs=!0,ie=!0);ie&&(xr+=1,Number.isFinite(U.total_cost_usd)&&(Us+=U.total_cost_usd,zs+=1))}}xr>0&&zs===xr&&(Yn.total_cost_usd=Us);let wi=Bs?$t(Yn):null;return{queue:u,idToTitle:Be,candidates:Y,candidate_hidden:{blocked:R.hidden_blocked,spec:R.hidden_spec},running:vn,live_count:Ms,slots:Ps,over_cap:bi,failure:Ls,waiting:nt(qt.filter(k=>!hi.has(k.bead_id)),"queue"),pr_wait:ct.map(k=>Kd(k.bead_id,Be.get(k.bead_id)||k.bead_id,vt,at[k.bead_id]||null,Rt(u.attempts||{},k.bead_id),tt[k.bead_id]||(j.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),jn.get(k.bead_id)||null,k.external===!0,{position:Is.get(k.bead_id)||0,active:Ds.active===k.bead_id,failure:gi[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?Os(k.bead_id):null,ei(on,Gn(k.bead_id)))).map(k=>({...k,...ve(k.id)})),merge_queue_length:$r.length,merge_queue_running:$r.length>0,auto_excluded:ct.map(k=>k.bead_id).filter(k=>Os(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:on,done:qs,token_total:wi,cleanup_failures:me,ship_failure:It}}function pe(u){let v=u.waiting.length>0?u.waiting[0].id:"\u2014",D=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,he=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Pe=c`<button
      type="button"
      class="worker-auto-all${he?" is-active":""}"
      title=${he?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${he?"true":"false"}
    >
      ${he?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,be=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Me=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${u.done.length}</b></span
      >`,Be=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,et=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${kr}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,lt=Ra({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return H?c`<div class="worker-ribbon">
          ${D}
          <div class="worker-kpi worker-kpi--ribbon">${be}${Me}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Pe}${et}</div>
          <div class="worker-kpi">${Be}</div>
        </div>
        ${lt}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${Pe}${et}</div>
        <div class="worker-kpi">
          ${be}${Me}${Be}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${L()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${lt}`}function Ae(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let v=u.running.some(D=>!D.paused);return c`<section
      class="worker-now${v?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${u.running.length+u.pr_wait.length}</span
        >
        ${Qe(u)}
      </header>
      ${u.running.length>0?ms(u.running,Date.now(),ce):""}
      ${u.pr_wait.map(D=>_s(D))}
    </section>`}function Oe(u){let v=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Id.map(D=>c`<button
              type="button"
              class="worker-filter__chip${y.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${y.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function st(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Dd.map(u=>c`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function it(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Ct.map(u=>c`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Qe(u){let v=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(v)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let D=new Set(u.auto_excluded),he=u.pr_wait.filter(Pe=>Pe.merge_action&&Pe.merge_enabled&&!D.has(Pe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${he>0?` ${he}`:""}
    </button>`}function We(u){let v=Lt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:Oe(u)});return H?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ae(u)}
        ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:z.queue,preview:Qa(u.waiting)})}
        ${v}
        ${Lt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:z.done,preview:u.token_total||Qa(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Lt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(D=>!D.paused),body:ms(u.running,Date.now(),ce)})}
      ${Lt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Qe(u)})}
      ${Lt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${u.done.length}`,items:u.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function ot(u){z={...z,[u]:!z[u]},Bd(z),Te()}function Te(){let u=ge();Le(pe(u),O),Le(We(u),K)}function Je(){let u=document.querySelector(".app-header");if(!u)return;let v=()=>{let D=Math.round(u.getBoundingClientRect().height);S.style.setProperty("--worker-ribbon-top",`${D}px`)};if(v(),typeof ResizeObserver=="function"){let D=new ResizeObserver(v);D.observe(u),E.push(()=>D.disconnect())}else window.addEventListener("resize",v),E.push(()=>window.removeEventListener("resize",v))}function N(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Fd);H=!!u.matches;let v=D=>{let he=!!(D&&typeof D.matches=="boolean"?D.matches:u.matches);he!==H&&(H=he,Te())};typeof u.addEventListener=="function"?(u.addEventListener("change",v),E.push(()=>u.removeEventListener("change",v))):typeof u.addListener=="function"&&(u.addListener(v),E.push(()=>u.removeListener(v)))}function B(u){let v=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;let D=v.dataset.beadId||"",he=v.dataset.lane||"";_={bead_id:D,from_lane:he};try{u.dataTransfer?.setData("text/plain",D),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function oe(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;let D=v.dataset.lane||"";D!=="candidate"&&D!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ne(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ae(u,v){let D=m.find(Me=>Me.id===u);if(!D)return;let he=m.filter(Me=>Me.id!==u),Pe=he.length;if(v){let Me=v.dataset.beadId;if(Me===u)return;let Be=he.findIndex(et=>et.id===Me);Be>=0&&(Pe=Be)}let be=he.slice();be.splice(Pe,0,D),f.applyReorder(u,be,Pe)}function we(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;u.preventDefault(),v.classList.remove("worker-pane--drag-over");let D=v.dataset.lane||"",he=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",Pe=_?.from_lane||"";if(_=null,!he)return;let be=u.target?.closest?.(".worker-mini, .worker-card"),Me=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Be=Me.length;if(be){let et=Me.indexOf(be);et>=0&&(Be=et)}if(v.classList.contains("worker-pane--collapsed")&&(Be=A()),D==="candidate"){if(Pe==="candidate"){ae(he,be);return}Pe==="queue"&&te(he);return}D==="queue"&&(Pe==="queue"?Z(he,Be):T(he,Be))}function ye(u){y=u,Rd(u),Te()}function Ee(u){$=u==="board"||u==="created"||u==="spec"?u:yr,Md($),Te()}function _e(u){g=Mt(u)?u:wt,Pd(g),Te()}function w(u){let v=u.target?.closest?.(".worker-filter__blocked");if(v){ye({...y,show_blocked:v.checked});return}let D=u.target?.closest?.(".worker-done-range");if(D){_e(D.value);return}let he=u.target?.closest?.(".worker-sort");if(he){Ee(he.value||yr);return}let Pe=u.target?.closest?.(".worker-slots__input");if(!Pe)return;let be=Number.parseInt(Pe.value,10);if(!Number.isFinite(be)){Te();return}ue(be).then(Te)}function q(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function C(u){let v=$e(),D=v.attempts?v.attempts[u]:null;ce=u,x.hidden=!1,xe.open({attempt_id:u,meta:q(D)}),Te()}function ee(){if(!ce)return;let u=$e(),v=u.attempts?u.attempts[ce]:null;if(v){xe.updateMeta(q(v));return}xe.close()}function je(u){let v=u.target;if(v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){ze.open();return}let D=v?.closest?.(".worker-banner__resume");if(D){let me=D.dataset.attemptId;me&&Ie(me);return}let he=v?.closest?.(".worker-banner__dismiss");if(he){let me=he.dataset.attemptId;me&&fe(me);return}if(v?.closest?.(".worker-play")){M(!$e().auto_advance);return}if(v?.closest?.(".worker-auto-all")){let me=$e();se(!(me.auto_advance===!0&&me.auto_merge===!0));return}let Pe=v?.closest?.(".worker-merge-all");if(Pe){Pe.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?He(!1):Xe():He(!0);return}let be=v?.closest?.(".worker-pane__hd--toggle");if(be){let me=be.dataset.lane;(me==="queue"||me==="done")&&ot(me);return}let Me=v?.closest?.(".worker-card__place");if(Me){let me=Me.dataset.beadId;me&&!Me.disabled&&T(me,A());return}let Be=v?.closest?.(".worker-filter__chip");if(Be){let me=Be.dataset.spec;(me==="all"||me==="with"||me==="without")&&ye({...y,spec:me});return}let et=v?.closest?.(".worker-mini__merge");if(et){Ne(et.dataset.beadId||"");return}let lt=v?.closest?.(".worker-mini__merge-cancel");if(lt){rt(lt.dataset.beadId||"");return}let ve=v?.closest?.(".worker-mini__discard");if(ve){F(ve.dataset.beadId||"");return}let ct=v?.closest?.(".worker-mini__revise-fix");if(ct){W("worker-revise-fix",ct.dataset.beadId||"");return}let vt=v?.closest?.(".worker-mini__revise-approve");if(vt){W("worker-revise-approve",vt.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__stop")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&re(Ce);return}if(v?.closest?.(".rtile__pause")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&de(Ce);return}if(v?.closest?.(".rtile__resume")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&Ie(Ce);return}if(v?.closest?.(".rtile__session")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&C(Ce);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){xe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let tt=v?.closest?.(".rtile");if(tt){if(v?.closest?.(".rtile__id")){let Ce=tt.dataset.beadId;Ce&&en(Ce).then(It=>{It?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=tt.dataset.beadId;me&&l&&l(me);return}let at=v?.closest?.(".worker-mini, .worker-card");if(at){let me=at.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){me&&en(me).then(Ce=>{Ce?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}me&&l&&l(me)}}return e.addEventListener("dragstart",B),e.addEventListener("dragover",oe),e.addEventListener("dragleave",ne),e.addEventListener("drop",we),e.addEventListener("click",je),e.addEventListener("change",w),N(),Je(),d&&E.push(d.subscribe(Te)),s&&E.push(s.subscribe(()=>{Te(),ee()})),Te(),{load(){Te()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",B),e.removeEventListener("dragover",oe),e.removeEventListener("dragleave",ne),e.removeEventListener("drop",we),e.removeEventListener("click",je),e.removeEventListener("change",w);try{xe.destroy()}catch{}x.hidden=!0;try{ze.destroy()}catch{}Le(c``,e)}}}function Es(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function oi(e,t,n,r=async()=>{},s=async()=>{}){let o=Ge("views:workspace-picker"),a=null,l=!1,i=!1,d=!1;async function f(S){let x=S.target.value,V=t.getState().workspace?.current?.path||"";if(x&&x!==V){o("switching workspace to %s",x),l=!0,E();try{await n(x)}catch(K){o("workspace switch failed: %o",K)}finally{l=!1,E()}}}async function _(){let S=t.getState(),O=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!O||i)){o("git-pulling workspace %s",O),i=!0,E();try{await r(O)}catch(x){o("workspace git pull failed: %o",x)}finally{i=!1,E()}}}function m(S){let O=S.target;O&&e.contains(O)||g()}function y(S){S.key==="Escape"&&g()}function $(){d||(d=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",y),E())}function g(){d&&(d=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",y),E())}function L(){d?g():$()}async function z(S){let O=S.target,x=O.value,G=O.checked;o("toggling visibility %s \u2192 %s",x,String(G));try{await s(x,G)}catch(V){o("workspace visibility toggle failed: %o",V)}}function H(S){return S?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function j(S,O){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${L}
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
                ${S.map(x=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${x.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${x.path}"
                        .checked=${!O.has(x.path)}
                        @change=${z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Es(x.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let S=t.getState(),O=S.workspace?.current,x=S.workspace?.available||[],G=new Set(S.workspace?.hidden||[]),V=O?.path||x[0]?.path||"";if(x.length===0)return c``;let K=x.filter(ce=>!G.has(ce.path)||ce.path===V);if(K.length<=1){let ce=K[0]||x[0],xe=Es(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${xe}</span
          >
          ${j(x,G)}
          ${H(V)}
          ${i?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||i}
          aria-label="Select project workspace"
        >
          ${K.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===V}
                title="${ce.path}"
              >
                ${Es(ce.path)}
              </option>
            `)}
        </select>
        ${j(x,G)}
        ${H(V)}
        ${l||i?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){Le(P(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",y),Le(c``,e)}}}var ai=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Cs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ii(e,t,n=Cs()){return{id:n,type:e,payload:t}}function li(e={}){let t=Ge("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,i=!0,d=new Map,f=[],_=new Map,m=new Set;function y(P){for(let E of Array.from(m))try{E(P)}catch{}}function $(){if(!i||l)return;o="reconnecting",t("ws reconnecting\u2026"),y(o);let P=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),E=(n.jitterRatio||0)*P,S=Math.max(0,Math.round(P+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,j()},S)}function g(P){try{s?.send(JSON.stringify(P))}catch(E){t("ws send failed",E)}}function L(){for(o="open",t("ws open"),y(o),a=0;f.length;){let P=f.shift();P&&g(P)}}function z(P){let E;try{E=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let O=d.get(E.id);d.delete(E.id),E.ok?O?.resolve(E.payload):O?.reject(E.error||new Error("ws error"));return}let S=_.get(E.type);if(S&&S.size>0)for(let O of Array.from(S))try{O(E.payload)}catch(x){t("ws event handler error",x)}else t("ws received unhandled message type: %s",E.type)}function H(){o="closed",t("ws closed"),y(o);for(let[P,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(P);a+=1,$()}function j(){if(!i)return;let P=r();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",y(o),s.addEventListener("open",L),s.addEventListener("message",z),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(E){t("ws connect failed %o",E),$()}}return j(),{send(P,E){if(!ai.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let S=Cs(),O=ii(P,E,S);return t("send %s id=%s",P,S),new Promise((x,G)=>{d.set(S,{resolve:x,reject:G,type:P}),s&&s.readyState===s.OPEN?g(O):(t("queue %s id=%s (state=%s)",P,S,o),f.push(O))})},on(P,E){_.has(P)||_.set(P,new Set);let S=_.get(P);return S?.add(E),()=>{S?.delete(E)}},onConnection(P){return m.add(P),()=>{m.delete(P)}},reconnect(){i=!0,l&&(clearTimeout(l),l=null),a=0,j()},close(){i=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Zd(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Xd(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Rs=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ci=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],di=Ga,ui="worker:queue",pi="ui:order",fi="ui:display-policy",Wt="tab:board:closed",_i="beads-ui.board.closed-range";function Qd(e){let t=Ge("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Le(n,e);let r=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&a&&l){let $e=function(h,b){let X="Request failed",I="";if(h&&typeof h=="object"){let R=h;if(typeof R.message=="string"&&R.message.length>0&&(X=R.message),typeof R.details=="string")I=R.details;else if(R.details&&typeof R.details=="object")try{I=JSON.stringify(R.details,null,2)}catch{I=""}}else typeof h=="string"&&h.length>0&&(X=h);let p=b&&b.length>0?`Failed to load ${b}`:"Request failed";ze.open(p,X,I)},M=function(h){return`${ve.getState().workspace.current?.path||""}\0${h}`},se=function(){fe&&(fe().catch(()=>{}),fe=null),Se=null,Ne=null},ge=function(h){He=h;let b=()=>{He!==h||ve.getState().selected_id!==h||(He=null,ue(h))};if(!F){Xe.then(b);return}b()},st=function(h,b,X,I,p){return X!==Oe[b]?(p().catch(()=>{}),!1):(h.set(I,p),!0)},it=function(){let h=ve.getState().view;ot(h==="board"),oe(h==="worker"),Ee(h==="monitor"),ae(h==="worker")},We=function(){let h=cn(Qe);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},ot=function(h){if(h)for(let[b,X]of Rs){if(pe.has(b)||Ae.has(b))continue;let I=b===Wt?We():{type:X};try{T.register(b,I)}catch(Y){t("register %s store failed: %o",b,Y)}Ae.add(b);let p=Oe.board,R=!1;A.subscribeList(b,I).then(Y=>{R=!st(pe,"board",p,b,Y)}).catch(Y=>{t("subscribe %s failed: %o",b,Y),$e(Y,"board")}).finally(()=>{Ae.delete(b),R&&it()})}else Je()},Je=function(){Oe.board+=1;for(let[h]of Rs){let b=pe.get(h);b&&(b().catch(()=>{}),pe.delete(h));try{T.unregister(h)}catch(X){t("unregister %s failed: %o",h,X)}}},oe=function(h){if(!h){ne();return}for(let[b,X]of ci){if(N.has(b)||Ae.has(b))continue;try{T.register(b,{type:X})}catch(R){t("register %s store failed: %o",b,R)}Ae.add(b);let I=Oe.worker,p=!1;A.subscribeList(b,{type:X}).then(R=>{p=!st(N,"worker",I,b,R)}).catch(R=>{t("subscribe %s failed: %o",b,R),$e(R,"worker")}).finally(()=>{Ae.delete(b),p&&it()})}},ne=function(){Oe.worker+=1;for(let[h]of ci){let b=N.get(h);b&&(b().catch(()=>{}),N.delete(h));try{T.unregister(h)}catch(X){t("unregister %s failed: %o",h,X)}}},ae=function(h){if(!h){we();return}B||(J("subscribe-worker-queue",{id:ui}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),B=()=>J("unsubscribe-worker-queue",{id:ui}))},we=function(){B&&(B().catch(()=>{}),B=null)},Ee=function(h){if(!h){_e();return}ye||(J("subscribe-monitor-pipeline",{id:di}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),ye=()=>J("unsubscribe-monitor-pipeline",{id:di}))},_e=function(){ye&&(ye().catch(()=>{}),ye=null)},q=function(){w||(J("subscribe-ui-order",{id:pi}).catch(h=>{t("subscribe-ui-order failed: %o",h)}),w=()=>J("unsubscribe-ui-order",{id:pi}))},C=function(){w&&(w().catch(()=>{}),w=null),re.clear()},je=function(){ee||(J("subscribe-display-policy",{id:fi}).catch(h=>{t("subscribe-display-policy failed: %o",h)}),ee=()=>J("unsubscribe-display-policy",{id:fi}))},u=function(){ee&&(ee().catch(()=>{}),ee=null),de.clear()},Me=function(h){if(!h)return"Unknown";let b=h.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var i=$e,d=M,f=se,_=ge,m=st,y=it,$=We,g=ot,L=Je,z=oe,H=ne,j=ae,P=we,E=Ee,S=_e,O=q,x=C,G=je,V=u,K=Me;let ce=document.getElementById("header-loading"),xe=$o(ce),ze=Sa(e),Q=li(),J=xe.wrapSend((h,b)=>Q.send(h,b)),A=go(J),T=mo(),Z=vo(),te=eo(),re=bo(),de=Js(),Ie=to();Q.on("monitor-pipeline-snapshot",h=>{let b=h;if(!(!b||!Array.isArray(b.workspaces)))try{te.set(b.workspaces,b.workspaces_state)}catch{}}),Q.on("ui-order-snapshot",h=>{let b=h;if(b&&typeof b.revision=="number")try{re.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),Q.on("display-policy-snapshot",h=>{let b=h;if(b&&b.policy&&typeof b.policy=="object")try{de.set(b.policy)}catch{}}),Q.on("session-log-snapshot",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{Ie.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),Q.on("session-log-append",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{Ie.append(b.attempt_id,b.event)}catch{}}),Q.on("snapshot",h=>{let b=h,X=b&&typeof b.id=="string"?b.id:"",I=X?T.getStore(X):null;if(I&&b&&b.type==="snapshot")try{I.applyPush(b)}catch{}}),Q.on("upsert",h=>{let b=h,X=b&&typeof b.id=="string"?b.id:"",I=X?T.getStore(X):null;if(I&&b&&b.type==="upsert")try{I.applyPush(b)}catch{}}),Q.on("delete",h=>{let b=h,X=b&&typeof b.id=="string"?b.id:"",I=X?T.getStore(X):null;if(I&&b&&b.type==="delete")try{I.applyPush(b)}catch{}});let fe=null,Se=null,Ne=null,He=null,rt=()=>{},Xe=new Promise(h=>{rt=()=>h(void 0)}),F=!1,W=!1;async function ue(h){let b=M(h);if(b===Se||b===Ne)return;Ne=b;let X=`detail:${h}`,I={type:"issue-detail",params:{id:h}};try{T.register(X,I)}catch(p){t("register detail store failed: %o",p)}try{let p=await A.subscribeList(X,I);if(ve.getState().selected_id!==h||M(h)!==b){await p().catch(()=>{});return}fe&&await fe().catch(()=>{}),fe=p,Se=b}catch(p){t("detail subscribe failed: %o",p),$e(p,"issue details")}finally{Ne===b&&(Ne=null)}}let pe=new Map,Ae=new Set,Oe={board:0,worker:0},Qe=wt;try{let h=window.localStorage.getItem(_i);Mt(h)&&(Qe=h)}catch{}async function Te(h){if(!Mt(h)||h===Qe)return;Qe=h;try{window.localStorage.setItem(_i,h)}catch{}let b=pe.get(Wt);if(!b)return;pe.delete(Wt),await b().catch(()=>{});let X=We();try{T.register(Wt,X)}catch(I){t("register %s store failed: %o",Wt,I)}try{let I=await A.subscribeList(Wt,X);pe.set(Wt,I)}catch(I){t("re-subscribe %s failed: %o",Wt,I),$e(I,"board")}}let N=new Map,B=null,ye=null,w=null,ee=null;async function v(){ee=null,de.clear(),B=null,ye=null,pe.clear(),N.clear(),Oe.board+=1,Oe.worker+=1;let h=ve.getState().workspace.current?.path;if(h)try{await Q.send("set-workspace",{path:h})}catch(X){t("workspace restore after reconnect failed: %o",X);return}je();let b=ve.getState().view;ot(b==="board"),oe(b==="worker"),Ee(b==="monitor"),ae(b==="worker")}async function D(){t("clearing all subscriptions for workspace switch"),Je(),ne(),we(),Z.clear(),C(),q(),u(),je(),se();let h=ve.getState();if(h.selected_id)try{T.unregister(`detail:${h.selected_id}`)}catch{}let b=ve.getState();ot(b.view==="board"),oe(b.view==="worker"),Ee(b.view==="monitor"),ae(b.view==="worker"),b.selected_id&&ge(b.selected_id)}async function he(h){t("requesting workspace switch to %s",h),W=!0;try{let b=await Q.send("set-workspace",{path:h});t("workspace switch result: %o",b),b&&b.workspace&&(ve.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),b.changed&&(await D(),le("Switched to "+Me(h),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),le("Failed to switch workspace","error",3e3),b}finally{W=!1}}async function Pe(h){t("requesting workspace git pull for %s",h);try{let b=await Q.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let X=b?.status;if(X==="up_to_date"){le("Already up to date","success",2e3);return}if(X==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+Me(h),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let X=b?.code,I=b?.message;if(X==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(X==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(X==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let p=I?`: ${I}`:"";throw le(`Git pull failed${p}`,"error",3e3),b}}async function be(h,b){t("setting workspace visibility %s \u2192 %s",h,String(b));try{await Q.send("set-workspace-visibility",{path:h,visible:b}),await Be()}catch(X){t("workspace visibility update failed: %o",X),le("Failed to update project visibility","error",3e3)}}async function Be(){try{let h=await Q.send("list-workspaces",{});if(t("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let b=h.workspaces.map(R=>({path:R.path,database:R.database,pid:R.pid,version:R.version})),X=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,I=Array.isArray(h.hidden)?h.hidden.filter(R=>typeof R=="string"):[];ve.setState({workspace:{current:X,available:b,hidden:I}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!b.some(Y=>Y.path===p)||I.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):X&&p!==X.path&&(t("restoring saved workspace preference: %s",p),await he(p)))}}catch(h){t("failed to load workspaces: %o",h)}}Q.on("workspace-changed",h=>{t("workspace-changed event: %o",h),h&&h.root_dir&&(ve.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),Be(),D())});let et=!1;if(typeof Q.onConnection=="function"){let h=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(et=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&et&&(et=!1,le("Reconnected","success",2200),Xd(ve,(X,I)=>{t(`${X}: %o`,I)}),v())};Q.onConnection(h)}let lt="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker"||h==="monitor")&&(lt=h)}catch(h){t("view parse error: %o",h)}let ve=yo({config:Zd(),view:lt});Q.on("worker-queue-snapshot",h=>{let b=h;if(!b||!b.queue)return;let X=ve.getState().workspace.current?.path;if(typeof X=="string"&&X.length>0&&b.root_dir!==X){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{Z.set(b.queue)}catch{}});let ct=wo(ve);ct.start();let vt=async(h,b)=>{try{return await J(h,b)}catch{return[]}};r&&Ya(r,ve,ct);let tt=document.getElementById("workspace-picker");tt&&oi(tt,ve,he,Pe,be);let at=Xa(e,(h,b)=>J(h,b));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>at.open())}catch{}let me=xa(e,{policyStore:de,transport:(h,b)=>J(h,b),labelOptions:()=>{let h=new Set;for(let[b]of Rs)for(let X of T.snapshotFor(b)||[]){let I=X.labels;if(Array.isArray(I))for(let p of I)typeof p=="string"&&p.length>0&&h.add(p)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>me.open())}catch{}let Ce=Lo(s,{gotoIssue:h=>ct.gotoIssue(h),issueStores:T,transport:vt,uiOrderStore:re,displayPolicyStore:de,closedRange:Qe,onClosedRangeChange:h=>{Te(h)},onNewIssue:()=>at.open()}),It=Ts(o,{transport:vt,issueStores:T,queueStore:Z,sessionLogStore:Ie,uiOrderStore:re,gotoIssue:h=>ve.setState({selected_id:h}),getWorkspacePath:()=>ve.getState().workspace.current?.path}),qt=ja(a,{transport:vt,pipelineStore:te,gotoIssue:h=>ct.gotoIssue(h),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:h=>he(h)}),ut=ya(l,{issueStores:T,transport:vt,queueStore:Z,sessionLogStore:Ie,getWorkspacePath:()=>ve.getState().workspace.current?.path,onNavigate:h=>{ve.getState().view==="worker"?ve.setState({selected_id:h}):ct.gotoIssue(h)},onClose:()=>{let h=ve.getState();ve.setState({selected_id:null});try{ct.gotoView(h.view==="worker"||h.view==="monitor"?h.view:"board")}catch{}}}),Bt=ve.getState().selected_id;Bt&&(l.hidden=!1,ut.load(Bt),ge(Bt)),ve.subscribe(h=>{let b=h.selected_id;b?(l.hidden=!1,ut.load(b),W||ge(b)):(ut.clear(),l.hidden=!0,se())});let Gt=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",a.hidden=h.view!=="monitor",ot(h.view==="board"),oe(h.view==="worker"),Ee(h.view==="monitor"),ae(h.view==="worker"),!h.selected_id&&h.view==="board"&&Ce.load(),h.view==="worker"&&It.load(),h.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",h.view)};ve.subscribe(Gt),Gt(ve.getState()),q(),je(),Be().finally(()=>{F=!0,rt()}),window.addEventListener("keydown",h=>{let b=h.ctrlKey||h.metaKey,X=String(h.key||"").toLowerCase(),I=h.target,p=I&&I.tagName?String(I.tagName).toLowerCase():"",R=p==="input"||p==="textarea"||p==="select"||I&&typeof I.isContentEditable=="boolean"&&I.isContentEditable;b&&X==="n"&&(R||(h.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Qd(t)});export{Qd as bootstrap,Zd as readBootstrapConfig,Xd as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
