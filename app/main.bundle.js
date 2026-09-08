var vg=Object.create;var Ja=Object.defineProperty;var kg=Object.getOwnPropertyDescriptor;var wg=Object.getOwnPropertyNames;var $g=Object.getPrototypeOf,xg=Object.prototype.hasOwnProperty;var Ag=(e,t,n)=>t in e?Ja(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var el=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Sg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of wg(t))!xg.call(e,o)&&o!==n&&Ja(e,o,{get:()=>t[o],enumerable:!(r=kg(t,o))||r.enumerable});return e};var Eg=(e,t,n)=>(n=e!=null?vg($g(e)):{},Sg(t||!e||!e.__esModule?Ja(n,"default",{value:e,enumerable:!0}):n,e));var Vt=(e,t,n)=>Ag(e,typeof t!="symbol"?t+"":t,n);var Au=el((Ox,xu)=>{var _o=1e3,mo=_o*60,go=mo*60,Kr=go*24,Cg=Kr*7,Og=Kr*365.25;xu.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Ig(e);if(n==="number"&&isFinite(e))return t.long?Dg(e):Lg(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Ig(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Og;case"weeks":case"week":case"w":return n*Cg;case"days":case"day":case"d":return n*Kr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*go;case"minutes":case"minute":case"mins":case"min":case"m":return n*mo;case"seconds":case"second":case"secs":case"sec":case"s":return n*_o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Lg(e){var t=Math.abs(e);return t>=Kr?Math.round(e/Kr)+"d":t>=go?Math.round(e/go)+"h":t>=mo?Math.round(e/mo)+"m":t>=_o?Math.round(e/_o)+"s":e+"ms"}function Dg(e){var t=Math.abs(e);return t>=Kr?di(e,t,Kr,"day"):t>=go?di(e,t,go,"hour"):t>=mo?di(e,t,mo,"minute"):t>=_o?di(e,t,_o,"second"):e+" ms"}function di(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Eu=el((Ix,Su)=>{function Pg(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Au(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let _=0;_<p.length;_++)f=(f<<5)-f+p.charCodeAt(_),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,_=null,b,g;function T(...w){if(!T.enabled)return;let Q=T,re=Number(new Date),W=re-(f||re);Q.diff=W,Q.prev=f,Q.curr=re,f=re,w[0]=n.coerce(w[0]),typeof w[0]!="string"&&w.unshift("%O");let q=0;w[0]=w[0].replace(/%([a-zA-Z%])/g,(M,F)=>{if(M==="%%")return"%";q++;let K=n.formatters[F];if(typeof K=="function"){let D=w[q];M=K.call(Q,D),w.splice(q,1),q--}return M}),n.formatArgs.call(Q,w),(Q.log||n.log).apply(Q,w)}return T.namespace=p,T.useColors=n.useColors(),T.color=n.selectColor(p),T.extend=r,T.destroy=n.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(b!==n.namespaces&&(b=n.namespaces,g=n.enabled(p)),g),set:w=>{_=w}}),typeof n.init=="function"&&n.init(T),T}function r(p,f){let _=n(this.namespace+(typeof f>"u"?":":f)+p);return _.log=this.log,_}function o(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(p,f){let _=0,b=0,g=-1,T=0;for(;_<p.length;)if(b<f.length&&(f[b]===p[_]||f[b]==="*"))f[b]==="*"?(g=b,T=_,b++):(_++,b++);else if(g!==-1)b=g+1,T++,_=T;else return!1;for(;b<f.length&&f[b]==="*";)b++;return b===f.length}function s(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function l(p){for(let f of n.skips)if(i(p,f))return!1;for(let f of n.names)if(i(p,f))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Su.exports=Pg});var Tu=el((Rn,pi)=>{Rn.formatArgs=Mg;Rn.save=qg;Rn.load=jg;Rn.useColors=Ng;Rn.storage=Fg();Rn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Rn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ng(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Mg(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+pi.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}Rn.log=console.debug||console.log||(()=>{});function qg(e){try{e?Rn.storage.setItem("debug",e):Rn.storage.removeItem("debug")}catch{}}function jg(){let e;try{e=Rn.storage.getItem("debug")||Rn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Fg(){try{return localStorage}catch{}}pi.exports=Eu()(Rn);var{formatters:Bg}=pi.exports;Bg.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jo=globalThis,ri=Jo.trustedTypes,cu=ri?ri.createPolicy("lit-html",{createHTML:e=>e}):void 0,nl="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,rl="?"+cr,Tg=`<${rl}>`,Ur=document,es=()=>Ur.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",ol=Array.isArray,mu=e=>ol(e)||typeof e?.[Symbol.iterator]=="function",tl=`[ 	
\f\r]`,Zo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,uu=/-->/g,du=/>/g,Fr=RegExp(`>|${tl}(?:([^\\s"'>=/]+)(${tl}*=${tl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pu=/'/g,fu=/"/g,gu=/^(?:script|style|textarea|title)$/i,sl=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=sl(1),rs=sl(2),xx=sl(3),Dn=Symbol.for("lit-noChange"),Jt=Symbol.for("lit-nothing"),_u=new WeakMap,Br=Ur.createTreeWalker(Ur,129);function hu(e,t){if(!ol(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return cu!==void 0?cu.createHTML(t):t}var bu=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Zo;for(let l=0;l<n;l++){let a=e[l],u,p,f=-1,_=0;for(;_<a.length&&(s.lastIndex=_,p=s.exec(a),p!==null);)_=s.lastIndex,s===Zo?p[1]==="!--"?s=uu:p[1]!==void 0?s=du:p[2]!==void 0?(gu.test(p[2])&&(o=RegExp("</"+p[2],"g")),s=Fr):p[3]!==void 0&&(s=Fr):s===Fr?p[0]===">"?(s=o??Zo,f=-1):p[1]===void 0?f=-2:(f=s.lastIndex-p[2].length,u=p[1],s=p[3]===void 0?Fr:p[3]==='"'?fu:pu):s===fu||s===pu?s=Fr:s===uu||s===du?s=Zo:(s=Fr,o=void 0);let b=s===Fr&&e[l+1].startsWith("/>")?" ":"";i+=s===Zo?a+Tg:f>=0?(r.push(u),a.slice(0,f)+nl+a.slice(f)+cr+b):a+cr+(f===-2?l:b)}return[hu(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,p]=bu(t,n);if(this.el=e.createElement(u,r),Br.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Br.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(nl)){let _=p[s++],b=o.getAttribute(f).split(cr),g=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:g[2],strings:b,ctor:g[1]==="."?si:g[1]==="?"?ii:g[1]==="@"?ai:Hr}),o.removeAttribute(f)}else f.startsWith(cr)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(gu.test(o.tagName)){let f=o.textContent.split(cr),_=f.length-1;if(_>0){o.textContent=ri?ri.emptyScript:"";for(let b=0;b<_;b++)o.append(f[b],es()),Br.nextNode(),a.push({type:2,index:++i});o.append(f[_],es())}}}else if(o.nodeType===8)if(o.data===rl)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(cr,f+1))!==-1;)a.push({type:7,index:i}),f+=cr.length-1}i++}}static createElement(t,n){let r=Ur.createElement("template");return r.innerHTML=t,r}};function Wr(e,t,n=e,r){if(t===Dn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=ts(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Wr(e,o._$AS(e,t.values),o,r)),t}var oi=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Ur).importNode(n,!0);Br.currentNode=o;let i=Br.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new po(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new li(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Br.nextNode(),s++)}return Br.currentNode=Ur,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},po=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Wr(this,t,n),ts(t)?t===Jt||t==null||t===""?(this._$AH!==Jt&&this._$AR(),this._$AH=Jt):t!==this._$AH&&t!==Dn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mu(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Jt&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ur.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(hu(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new oi(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=_u.get(t.strings);return n===void 0&&_u.set(t.strings,n=new ns(t)),n}k(t){ol(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Jt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Wr(this,t,n,0),s=!ts(t)||t!==this._$AH&&t!==Dn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Wr(this,l[r+a],n,a),u===Dn&&(u=this._$AH[a]),s||(s=!ts(u)||u!==this._$AH[a]),u===Jt?t=Jt:t!==Jt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},si=class extends Hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Jt?void 0:t}},ii=class extends Hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Jt)}},ai=class extends Hr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Wr(this,t,n,0)??Jt)===Dn)return;let r=this._$AH,o=t===Jt&&r!==Jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Jt&&(r===Jt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},li=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Wr(this,t)}},yu={M:nl,P:cr,A:rl,C:1,L:bu,R:oi,D:mu,V:Wr,I:po,H:Hr,N:ii,U:ai,B:si,F:li},Rg=Jo.litHtmlPolyfillSupport;Rg?.(ns,po),(Jo.litHtmlVersions??(Jo.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new po(t.insertBefore(es(),i),i,void 0,n??{})}return o._$AI(e),o};var ci="today",ui=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],fo=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Xn(e){return e==="today"?"today":"7d"}function il(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function zr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ku(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wu(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function $u(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Ru=Eg(Tu(),1);function Ht(e){return(0,Ru.default)(`beads-ui:${e}`)}function Ug(e){let n=Cu((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Cu(e){return typeof e=="string"?e.trim():""}function Wg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Hg=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ho(e){let t=Ug(e),n=Cu(Wg(e).spec_review),r=Hg.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function qn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function os(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Nu(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Mu(e,t){let n=qn(e.updated_at),r=qn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function qu(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=qn(e.created_at),i=qn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function ju(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var fi=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function zg(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(fi,e)}function ll(e){if(!e||typeof e!="object")return!1;let t=e;return zg(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Ou(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Iu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ho(e).evidence==="published"?1:0;case"created":return Ou(e.created_at);case"updated":return Ou(e.updated_at);default:return null}}function Lu(e,t,n){let r=Iu(e,n.key),o=Iu(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Fu(e){let t=Array.isArray(e)?e.filter(ll):[];return(n,r)=>{for(let l of t){let a=Lu(n,r,l);if(a!==0)return a}let o=Lu(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var Kg=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Du(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Pu(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Kg.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Bu(e,t){let n=Du(e),r=Du(t);if(n!==r)return n<r?-1:1;let o=Pu(e),i=Pu(t);if(o!==i)return o<i?-1:1;let s=qn(e&&e.created_at),l=qn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var al=2**20;function bo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-qn(e&&e.created_at)}function Uu(e){return(t,n)=>{let r=bo(t,e),o=bo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function cl(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:bo(l,n)-al};if(!l)return{rank:bo(s,n)+al};let a=bo(s,n),u=bo(l,n),p=(a+u)/2;return a<p&&p<u?{rank:p}:{renormalize:r.map((f,_)=>({bead_id:f.id,rank:_*al}))}}function ul(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||os;function u(){for(let _ of Array.from(s))try{_()}catch{}}function p(){o=Array.from(r.values()).sort(a)}function f(_){if(l||!_||_.id!==e)return;let b=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,b),!(b<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(b<=i)return;r.clear();let g=Array.isArray(_.issues)?_.issues:[];for(let T of g)T&&typeof T.id=="string"&&T.id.length>0&&r.set(T.id,T);p(),i=b,u();return}if(_.type==="upsert"){let g=_.issue;if(g&&typeof g.id=="string"&&g.id.length>0){let T=r.get(g.id);if(!T)r.set(g.id,g);else{let w=Number.isFinite(T.updated_at)?T.updated_at:0,Q=Number.isFinite(g.updated_at)?g.updated_at:0;if(w<=Q){for(let re of Object.keys(T))re in g||delete T[re];for(let[re,W]of Object.entries(g))T[re]=W}}p()}i=b,u()}else if(_.type==="delete"){let g=String(_.issue_id||"");g&&(r.delete(g),p()),i=b,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function _i(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Wu(e){let t=Ht("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let p=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let b of Array.from(u)){let g=n.get(b);if(!g)continue;let T=g.itemsById;for(let w of p)typeof w=="string"&&w.length>0&&T.set(w,!0);for(let w of f)typeof w=="string"&&w.length>0&&T.set(w,!0);for(let w of _)typeof w=="string"&&w.length>0&&T.delete(w)}}async function i(l,a){let u=_i(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=n.get(l)||null;if(_){let b=r.get(_.key);b&&(b.delete(l),b.size===0&&r.delete(_.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:_i,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let p of a.itemsById.keys())u[p]=!0;return u}}}}function Hu(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,p){let f=u?_i(u):"",_=n.get(a)||"",b=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,_),b&&_&&f&&_!==f){let g=t.get(a);if(g)try{g.dispose()}catch{}let T=o.get(a);if(T){try{T()}catch{}o.delete(a)}let w=ul(a,p);t.set(a,w);let Q=w.subscribe(()=>i());o.set(a,Q)}else if(!b){let g=ul(a,p);t.set(a,g);let T=g.subscribe(()=>i());o.set(a,T)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let p=o.get(a);if(p){try{p()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function zu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ku(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function dl(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"||e==="adr"?e:"board"}?issue=${encodeURIComponent(t)}`}function Gg(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Vg(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":/^#\/adr(\b|\/|$)/.test(t)?"adr":"board"}function Gu(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):Gg(r),s=Vg(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"||o.view==="compare"||o.view==="adr"?o.view:"board",s=dl(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?dl(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Yg=Object.freeze({workspace_config:{default_workspace:null}});function Vu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Yg.workspace_config.default_workspace}}}function Yu(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Vu(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Vu(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Xu(e){let t=Ht("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,_)=>{let b=o++,g=Date.now();r.set(b,{type:f,start_ts:g}),t("request start id=%d type=%s count=%d",b,f,n+1),s();let T=!1,w=()=>{T||(T=!0,r.delete(b),l())},Q=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,f,Date.now()-g),w())},3e4);try{let re=await u(f,_),W=Date.now()-g;return t("request done id=%d type=%s elapsed=%dms",b,f,W),re}catch(re){let W=Date.now()-g;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,f,W,re),re}finally{clearTimeout(Q),w()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ve(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}var ml="adr:snapshot",pl=["missing","retired"],fl=["adr_missing","supersede_unapplied"],_l="token_missing",mi="section_missing",gi="usage",Ju=["adr_status"],Xg=[...fl,_l,mi,gi,...Ju];function Qu(e,t){return t.includes(e)?e:"\uAE30\uD0C0"}function Qg(e){return typeof e=="string"&&e.startsWith("docs/")}function Zg(e){return new Date(e).toTimeString().slice(0,8)}function Jg(e){let t=e.citations_stale||[],n=e.candidates||[],r=[];for(let u of n)for(let p of u.errors||[])r.push(p);let o=t.filter(u=>pl.includes(u.kind)),i=r.filter(u=>fl.includes(u.kind)),s=r.filter(u=>u.kind===_l),l=r.filter(u=>u.kind===mi),a=[...t.filter(u=>!pl.includes(u.kind)),...r.filter(u=>Ju.includes(u.kind)||!fl.includes(u.kind)&&u.kind!==_l&&u.kind!==mi&&u.kind!==gi)];return{current:(e.current||[]).length,drift:!!(e.index_drift&&e.index_drift.ok===!1),citation_stale:o.length,unresolved:i.length,token_missing:s.length,pending:l.length,other:a.length,cross:(e.cross_citations||[]).length}}function eh(e,t,n){let r=[],o=(e.citations_stale||[]).filter(a=>a.kind==="retired"&&a.adr===t.id);o.length>0&&r.push({key:"cite",text:`\uC778\uC6A9 stale ${o.length}`});let i=0;for(let a of e.candidates||[])for(let u of a.errors||[])u.adr===t.id&&(i+=1);i>0&&r.push({key:"cand",text:`\uD6C4\uBCF4 ${i}`}),(e.frontmatter_errors||[]).filter(a=>a.file===t.file).length>0&&r.push({key:"fm",text:"frontmatter \uC624\uB958"});let l=0;for(let a of n)if(a.root_dir!==e.root_dir)for(let u of a.cross_citations||[])u.adr===t.id&&u.target?.root_dir===e.root_dir&&(l+=1);return l>0&&r.push({key:"cross",text:`\uD53C\uC778\uC6A9 ${l}`}),r}function Zu(e,t){return t?[String(e.id),e.title||"",e.summary||"",e.spec||"",e.bead||""].join(`
`).toLowerCase().includes(t):!0}function th(e){return e?{tone:e.status==="accepted"?"ok":"warn",text:e.status}:{tone:"unknown",text:"\uBBF8\uD655\uC778"}}function ed(e,t={}){let n=Ht("views:adr"),r=t.adrStore,o=t.gotoIssue,i=t.getWorkspacePath,s=t.switchWorkspace,l=t.openDoc,a={repo:"",query:"",stale_first:!0},u=null;function p(){let D=r?r.get():null;return D&&Array.isArray(D.workspaces)?D.workspaces:[]}function f(D,A,C){let R=C||D;return!Qg(D)||!l?c`<span class="adr-doc adr-doc--plain">${R}</span>`:c`<button
      type="button"
      class="adr-doc adr-doc--link"
      @click=${()=>l({path:D,missing_state:null},A)}
    >
      ${R}
    </button>`}function _(D,A){return c`<button
      type="button"
      class="adr-bead"
      @click=${async()=>{let C=i?i():void 0;if(s&&A&&A!==C)try{await s(A)}catch(R){n("switch workspace failed: %o",R);return}o&&o(D)}}
    >
      ${D}
    </button>`}function b(D,A){let C=a.query.trim().toLowerCase(),R=(D.current||[]).filter(fe=>Zu(fe,C));if(R.length===0)return c``;let oe=R.map(fe=>({adr:fe,chips:eh(D,fe,A)}));return oe.sort((fe,be)=>{if(a.stale_first){let H=fe.chips.length>0?1:0,ee=be.chips.length>0?1:0;if(H!==ee)return ee-H}return be.adr.id-fe.adr.id}),c`
      <div class="adr-tablewrap">
        <table class="adr-table adr-table--current">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
              <th>summary</th>
              <th>spec</th>
              <th>bead</th>
              <th>신호</th>
            </tr>
          </thead>
          <tbody>
            ${oe.map(({adr:fe,chips:be})=>c`
                <tr data-adr=${String(fe.id)}>
                  <td class="adr-num">${fe.id}</td>
                  <td>
                    ${f(`docs/adr/${fe.file}`,D.root_dir,fe.title||fe.file)}
                  </td>
                  <td class="adr-date">${fe.date||""}</td>
                  <td class="adr-summary">${fe.summary||""}</td>
                  <td>${fe.spec?f(fe.spec,D.root_dir):c``}</td>
                  <td>
                    ${fe.bead?_(fe.bead,D.root_dir):c``}
                  </td>
                  <td class="adr-signals">
                    ${be.map(H=>c`<span class="adr-chip adr-chip--signal"
                          >${H.text}</span
                        >`)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}function g(D){let A=a.query.trim().toLowerCase(),C=(D.history||[]).filter(R=>Zu(R,A)).slice().sort((R,oe)=>oe.id-R.id);return C.length===0?c``:c`
      <details class="adr-history">
        <summary>이력 ${C.length}</summary>
        <div class="adr-tablewrap">
          <table class="adr-table adr-table--history">
            <tbody>
              ${C.map(R=>c`
                  <tr data-adr=${String(R.id)}>
                    <td class="adr-num">${R.id}</td>
                    <td>${R.title||R.file}</td>
                    <td class="adr-status">${R.status}</td>
                    <td class="adr-superseded">
                      ${R.superseded_by===null||R.superseded_by===void 0?"":`\u2192 ${R.superseded_by}`}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </details>
    `}function T(D){return c`<p class="adr-env">환경 · ${D}</p>`}function w(D){let A=D.env_errors?.index;if(A)return c`<section class="adr-sec adr-sec--drift">
        ${T(A)}
      </section>`;let C=D.index_drift;return!C||C.ok!==!1?c``:c`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${C.detail||"\uC778\uB371\uC2A4\uAC00 ADR\uACFC \uC5B4\uAE0B\uB09C\uB2E4"}</p>
    </section>`}function Q(D){let A=D.env_errors?.citations;if(A)return c`<section class="adr-sec adr-sec--cite">
        ${T(A)}
      </section>`;let C=D.citations_stale||[];return C.length===0?c``:c`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${C.length}</h3>
      <ul class="adr-rows">
        ${C.map(R=>c`
            <li class="adr-row">
              ${R.file?f(R.file,D.root_dir,`${R.file}${R.line===null||R.line===void 0?"":`:${R.line}`}`):c``}
              <span class="adr-row__mid"
                >${R.adr===null||R.adr===void 0?"":`ADR ${R.adr}`}</span
              >
              <span class="adr-chip adr-chip--kind"
                >${Qu(R.kind,pl)}</span
              >
              <span class="adr-row__detail">${R.detail||""}</span>
            </li>
          `)}
      </ul>
    </section>`}function re(D){let A=D.env_errors?.candidates;if(A)return c`<section class="adr-sec adr-sec--cand">
        ${T(A)}
      </section>`;let C=(D.candidates||[]).filter(fe=>(fe.errors||[]).length>0),R=[],oe=[];for(let fe of C){let be=fe.errors||[],H=be.filter(de=>de.kind!==mi&&de.kind!==gi),ee=be.some(de=>de.kind===gi);if(H.length===0&&!ee){oe.push(fe.spec);continue}R.push({spec:fe.spec,errors:H,env:ee})}return R.length===0&&oe.length===0?c``:c`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${R.map(fe=>c`
          <div class="adr-candspec" data-spec=${fe.spec}>
            <div class="adr-candspec__hd">
              ${f(fe.spec,D.root_dir)}
              ${fe.env?c`<span class="adr-chip adr-chip--env">환경</span>`:c``}
            </div>
            <ul class="adr-rows">
              ${fe.errors.map(be=>c`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind"
                      >${Qu(be.kind,Xg)}</span
                    >
                    <span class="adr-row__mid"
                      >${be.adr===null||be.adr===void 0?"":`ADR ${be.adr}`}</span
                    >
                    <span class="adr-row__detail">${be.detail||""}</span>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      ${oe.length>0?c`<details class="adr-pending">
            <summary>이행 전 스펙 ${oe.length}</summary>
            <ul class="adr-rows">
              ${oe.map(fe=>c`<li class="adr-row">${f(fe,D.root_dir)}</li>`)}
            </ul>
          </details>`:c``}
    </section>`}function W(D){let A=D.cross_citations||[];return A.length===0?c``:c`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${A.length}</h3>
      <ul class="adr-rows">
        ${A.map(C=>{let R=th(C.target);return c`
            <li class="adr-row">
              ${f(C.file,D.root_dir,`${C.file}:${C.line}`)}
              <span class="adr-row__mid"
                >→ ADR ${C.repo}/${String(C.adr).padStart(4,"0")}</span
              >
              <span class="adr-chip adr-chip--cross is-${R.tone}"
                >${R.text}</span
              >
            </li>
          `})}
      </ul>
    </section>`}function q(D){let A=Jg(D),C=[];return A.current>0&&C.push({key:"current",text:`\uD604\uC7AC \uC720\uD6A8 ${A.current}`}),A.drift&&C.push({key:"drift",text:"\uC778\uB371\uC2A4 drift"}),A.citation_stale>0&&C.push({key:"cite",text:`\uC778\uC6A9 stale ${A.citation_stale}`}),A.unresolved>0&&C.push({key:"cand",text:`\uD6C4\uBCF4 \uBBF8\uC2E4\uCCB4\uD654 ${A.unresolved}`}),A.token_missing>0&&C.push({key:"token",text:`\uD1A0\uD070 \uC5C6\uC74C ${A.token_missing}`}),A.pending>0&&C.push({key:"pending",text:`\uC774\uD589 \uC804 \uC2A4\uD399 ${A.pending}`}),A.other>0&&C.push({key:"other",text:`\uAE30\uD0C0 ${A.other}`}),A.cross>0&&C.push({key:"cross",text:`\uAD50\uCC28 \uC778\uC6A9 ${A.cross}`}),D.computing?C.push({key:"computing",text:"\uACC4\uC0B0 \uC911"}):typeof D.computed_at=="number"&&D.computed_at>0&&C.push({key:"computed",text:`\uAC31\uC2E0 ${Zg(D.computed_at)}`}),c`<div class="adr-counts">
      ${C.map(R=>c`<span class="adr-chip adr-chip--count adr-count--${R.key}"
            >${R.text}</span
          >`)}
    </div>`}function N(D,A){let C=D.adr_dir_missing===!0;return c`
      <section class="adr-ws" data-repo=${D.root_dir}>
        <header class="adr-ws__hd">
          <h2>${D.name}</h2>
          ${D.name_duplicate?c`<span class="adr-chip adr-chip--dup">이름 중복</span>`:c``}
        </header>
        ${q(D)} ${b(D,A)} ${g(D)}
        ${C?c``:w(D)}
        ${C?c``:Q(D)}
        ${C?c``:re(D)}
        ${C?c``:W(D)}
      </section>
    `}function M(D){return c`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${a.repo===""?"true":"false"}
            @click=${()=>{a.repo="",K()}}
          >
            전체
          </button>
          ${D.map(A=>c`
              <button
                type="button"
                class="adr-filter"
                data-repo=${A.root_dir}
                aria-pressed=${a.repo===A.root_dir?"true":"false"}
                @click=${()=>{a.repo=A.root_dir,K()}}
              >
                ${A.name}
              </button>
            `)}
        </div>
        <input
          type="search"
          class="adr-search"
          placeholder="번호·제목·summary·spec·bead"
          aria-label="ADR 검색"
          .value=${a.query}
          @input=${A=>{a.query=A.target.value,K()}}
        />
        <button
          type="button"
          class="adr-sort"
          aria-pressed=${a.stale_first?"true":"false"}
          @click=${()=>{a.stale_first=!a.stale_first,K()}}
        >
          stale 우선
        </button>
      </div>
    `}function F(){let D=p(),A=a.repo?D.filter(C=>C.root_dir===a.repo):D;return c`
      ${M(D)}
      <div class="adr-body">
        ${A.map(C=>N(C,D))}
      </div>
    `}function K(){lt(F(),e)}return K(),r&&typeof r.subscribe=="function"&&(u=r.subscribe(()=>K())),{destroy(){u&&(u(),u=null),lt(c``,e)}}}function yo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(ju),a;switch(l){case"created_desc":return a.sort(os),a;case"created_asc":return a.sort(Nu),a;case"updated_desc":return a.sort(Mu),a;case"priority":return a.sort(qu),a;case"manual":default:{let u=n();return u?a.sort(Uu(u)):a.sort(os),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function $r(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=$r(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=$r(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function td(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=$r(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hi(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function yi(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=td(n);return{total:n.length,count:r,current:o,children:n}}function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gl(e,t){return!t||typeof e!="string"||e.length===0||vo(t.visible_labels).includes(e)?!0:vo(t.hidden_labels).includes(e)?!1:!vo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function nd(e,t){return vo(e).filter(n=>gl(n,t))}function xr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var rd="bench";function od(e){let t=e&&typeof e=="object"?e.labels:null;return vo(t).includes(rd)}function sd(e){return!!e&&vo(e.visible_labels).includes(rd)}function id(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(cl(l,a,u.order),s);o(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(_);let b=r(cl(l,a,_.order),s);o(_,b);let g=await t("ui-order-set",{expected_revision:_.revision,entries:b});g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function ad(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Qn(e,t){let n=ad(e),r=ad(t);return n.length===0||r.length===0?!1:n!==r}function nh(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function rh(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function oh(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${nh(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function vi(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Bu):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?rh(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>oh(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var sh={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},cd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ld={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ih={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ah(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function ud(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function lh(e){if(!e||e.fill==="none"||!e.approval_state)return ud(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ch(e,t,n,r){let o=sh[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=ih[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,p=n?`color: var(--stage-${o}-on)`:"",f=cd[e]||e,_=r?dd(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${p}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let b=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${_.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${g=>{g.preventDefault(),g.stopPropagation(),r(g,_,e)}}
    >
      <div class=${a} style=${p}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function dd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ki(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=ld[e.route]||ld.spec_backed,i=e.stages,s=ah(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${cd[u]||u} ${u==="plan"?lh(i[u]||{}):ud(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>dd(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>ch(u,i[u]||{},u===s,r))}
    </div>
  `}function uh(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var pd=2;function fd(e){let t=e.slice(0,pd).join(", "),n=e.length-pd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function dh(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Qn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${fd(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${fd(i)}</span
      >`),n}function ph(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function hl(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function wi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function ur(e){return`${e.kind}:${wi(e)}@${e.sha}`}function $i(e,t){if(!e)return null;let n=hl(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=hl(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${ur(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function _d(e,t){let n=$i(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function fh(e){if(!e)return null;let t=hl(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${ur(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function _h(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&xr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&xr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&xr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=_d(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(l)}`}
        >${`exec ${l.kind==="delegated"?wi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of nd(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&xr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(n,"blocked")){let l=ph(e.metadata);l&&o.push(l),o.push(...dh(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function mh(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function gh(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return vi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:mh(e),empty_label:"children \uC5C6\uC74C",childChips:bl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function bl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return $i(t,n)?c`<span class="board-card__roll-child-chips">
    ${_d(t,n)}
    ${fh(n)}
  </span>`:null}function xi(e,t){let n=uh(e.priority);return c`
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
      ${_h(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?ki(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${gh(e,t)}
    </article>
  `}function ko(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${ui.map(i=>c`<option
                    value=${i.value}
                    ?selected=${i.value===e.closed_range}
                  >
                    ${i.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(i=>xi(i,t))}
      </div>
    </section>
  `}function md(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>xi(r,t))}
        </div>
      </div>
    </dialog>
  `}var hh=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],bh=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],yh=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function vh(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${o} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(i=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(i)}
                        @change=${()=>t.onLabelToggle(i)}
                      />
                      <span>${i}</span>
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
  `}function gd(e,t,n){return c`
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
        ${hh.map(r=>c`<option
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
        ${bh.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${vh(e,t,n)}
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
        ${yh.map(r=>c`<option
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
  `}var kh=200,wh={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},$h=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),hd="beads-ui.board.sort",bd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function xh(){try{let e=window.localStorage.getItem(hd);if(e&&bd.has(e))return e}catch{}return"created_desc"}function yd(e,t){let n=Ht("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.openDoc,_=t.closedRange||ci,b=o?yo(o,s):null,g=id({transport:i,uiOrderStore:s}),T=[],w=[],Q=[],re=[],W=[],q=[],N=!1,M=0,F=xh(),K=new Map,D=new Map,A=new Map,C=new Set,R={search:"",priority:"",type:"",labels:[]},oe=!1,fe=null;function be(_e){return String(_e.status||"open")==="open"}function H(_e){return String(_e.status||"open")==="open"}function ee(_e){let Ae=R.search.trim().toLowerCase(),Ze=R.priority,bt=R.type,it=R.labels,ct=sd(V());return _e.filter(vt=>{if(!ct&&od(vt))return!1;if(Ae){let rt=String(vt.id||"").toLowerCase(),We=String(vt.title||"").toLowerCase();if(!rt.includes(Ae)&&!We.includes(Ae))return!1}if(Ze!==""&&String(vt.priority)!==Ze||bt!==""&&String(vt.issue_type||"")!==bt)return!1;if(it.length>0){let rt=Array.isArray(vt.labels)?vt.labels:[];if(!it.some(We=>rt.includes(We)))return!1}return!0})}function de(){let _e=new Set;for(let Ae of[T,w,Q,re,W,q])for(let Ze of Ae){let bt=Array.isArray(Ze.labels)?Ze.labels:[];for(let it of bt)typeof it=="string"&&it.length>0&&_e.add(it)}return Array.from(_e).sort()}function Oe(){return R.search.trim()!==""||R.priority!==""||R.type!==""||R.labels.length>0}function Z(){try{if(b){let _e=b.selectBoardColumn("tab:board:in-progress","in_progress",F),Ae=b.selectBoardColumn("tab:board:blocked","blocked",F).filter(H),Ze=new Set(_e.map(U=>U.id)),bt=b.selectBoardColumn("tab:board:ready","ready",F).filter(U=>be(U)&&!Ze.has(U.id)),it=b.selectBoardColumn("tab:board:resolved","resolved",F),ct=b.selectBoardColumn("tab:board:deferred","deferred",F),vt=b.selectBoardColumn("tab:board:closed","closed").slice(0,kh),rt=[...Ae,...bt,..._e,...it,...vt];ae(rt);let We=new Set;for(let U of rt)U&&U.id&&!hi(U)&&We.add(U.id);let E=!Oe();T=E?ss(Ae,We):Ae,w=E?ss(bt,We):bt,Q=E?ss(_e,We):_e,re=E?ss(it,We):it,W=ct,M=ct.length,q=E?ss(vt,We):vt,K=new Map;for(let U of T)K.set(U.id,"open");for(let U of w)K.set(U.id,"open");for(let U of Q)K.set(U.id,"in_progress");for(let U of re)K.set(U.id,"resolved");for(let U of W)K.set(U.id,"deferred");for(let U of q)K.set(U.id,"closed");D=new Map;for(let U of T)D.set(U.id,"blocked-col");for(let U of w)D.set(U.id,"ready-col");for(let U of Q)D.set(U.id,"in-progress-col");for(let U of re)D.set(U.id,"resolved-col");for(let U of q)D.set(U.id,"closed-col")}ot()}catch{T=[],w=[],Q=[],re=[],W=[],q=[],A=new Map,ot()}}function ae(_e){A=bi(_e)}function le(_e){return yi(A,_e)}function P(_e){return!C.has(_e)}function se(_e,Ae){_e.preventDefault(),_e.stopPropagation(),C.has(Ae)?C.delete(Ae):C.add(Ae),ot()}function ie(_e,Ae){_e.preventDefault(),_e.stopPropagation(),r(Ae)}function ye(_e,Ae){_e.preventDefault(),_e.stopPropagation(),r(Ae)}function ke(_e,Ae){fe||r(Ae)}function Xe(_e,Ae){_e.preventDefault(),_e.stopPropagation(),Ah(Ae).then(Ze=>{Ze&&ve("\uBCF5\uC0AC\uB428","success",1200)})}function X(_e,Ae){fe=Ae,_e.dataTransfer&&(_e.dataTransfer.setData("text/plain",Ae),_e.dataTransfer.effectAllowed="move"),_e.target.classList.add("board-card--dragging")}function pe(_e){_e.target.classList.remove("board-card--dragging"),Me(),setTimeout(()=>{fe=null},0)}function ce(_e){let Ae=String(_e.target.value||"");!Ae||Ae===_||(_=Ae,u&&u(Ae),ot())}function V(){return l?l.get():null}function Ce(_e){let Ae=a?a.get():null,Ze=Ae?Ae.cleanup_failed:null;if(!Ze||typeof Ze!="object"||Array.isArray(Ze))return null;let bt=Ze[_e];return!bt||typeof bt!="object"||Array.isArray(bt)?null:bt}let he={onCardClick:ke,onCopyId:Xe,onDragStart:X,onDragEnd:pe,onClosedRangeChange:ce,rollupFor:le,isExpanded:P,onRollupToggle:se,onChildClick:ie,onFromChipClick:ye,onOpenDoc:f?(_e,Ae)=>f(Ae):void 0,cleanupFailureFor:Ce,get policy(){return V()}};function De(_e,Ae){fe||(Qe(),r(Ae))}function qe(_e,Ae){_e.preventDefault(),_e.stopPropagation(),Qe(),r(Ae)}let Je={...he,onCardClick:De,onChildClick:qe,onFromChipClick:qe,onOpenDoc:f?(_e,Ae)=>{Qe(),f(Ae)}:void 0,get policy(){return V()}};function Ue(_e){let Ae=_e.target,Ze=e.querySelector(".board-filter__labels");Ae&&Ze&&Ze.contains(Ae)||Re()}function ne(_e){_e.key==="Escape"&&Re()}function G(){oe||(oe=!0,document.addEventListener("mousedown",Ue),document.addEventListener("keydown",ne),ot())}function Re(){oe&&(oe=!1,document.removeEventListener("mousedown",Ue),document.removeEventListener("keydown",ne),ot())}function et(_e){_e.key==="Escape"&&Qe()}function pt(){N||(N=!0,document.addEventListener("keydown",et),ot())}function Qe(){N&&(N=!1,document.removeEventListener("keydown",et),ot())}let mt={onClose:Qe,onOverlayClick(_e){_e.target===_e.currentTarget&&Qe()}},Dt={onSearchInput(_e){R.search=String(_e.target.value||""),Z()},onPriorityChange(_e){R.priority=String(_e.target.value||""),Z()},onTypeChange(_e){R.type=String(_e.target.value||""),Z()},onSortChange(_e){let Ae=String(_e.target.value||"");if(!(!bd.has(Ae)||Ae===F)){F=Ae;try{window.localStorage.setItem(hd,Ae)}catch{}Z()}},onDeferredToggle(){N?Qe():pt()},onLabelMenuToggle(){oe?Re():G()},onLabelToggle(_e){let Ae=R.labels.indexOf(_e);Ae===-1?R.labels.push(_e):R.labels.splice(Ae,1),Z()},onLabelClear(){R.labels.length!==0&&(R.labels=[],Z())},onNewIssue(){p&&p()}};function Et(){return c`
      <div class="board-view">
        ${gd(R,Dt,{sort_mode:F,deferred_popup_open:N,deferred_count:M,label_options:de(),label_menu_open:oe})}
        <div class="board-root">
          ${ko({title:"Blocked",id:"blocked-col",items:ee(T)},he)}
          ${ko({title:"Ready",id:"ready-col",items:ee(w)},he)}
          ${ko({title:"In progress",id:"in-progress-col",items:ee(Q)},he)}
          ${ko({title:"Resolved",id:"resolved-col",items:ee(re)},he)}
          ${ko({title:"Closed",id:"closed-col",items:ee(q),is_closed:!0,closed_range:_},he)}
        </div>
        ${N?md({items:ee(W),count:M},Je,mt):""}
      </div>
    `}function ot(){lt(Et(),e),ht()}function ht(){try{let _e=e.querySelector("#deferred-popup");_e&&!_e.open&&(typeof _e.showModal=="function"?_e.showModal():_e.setAttribute("open",""));let Ae=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ze of Ae)Array.from(Ze.querySelectorAll(".board-card")).forEach((it,ct)=>{it.tabIndex=ct===0?0:-1})}catch{}}async function Zt(_e,Ae){if(!i){ve("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:_e,status:Ae}),ve("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ze){n("update-status failed: %o",Ze),ve("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function x(_e){switch(_e){case"blocked-col":return T;case"ready-col":return w;case"in-progress-col":return Q;case"resolved-col":return re;default:return[]}}function te(_e,Ae,Ze){if(!i||!s)return;let bt=x(_e),it=bt.find(E=>E.id===Ae);if(!it)return;let ct=bt.filter(E=>E.id!==Ae),vt=Ze.closest?Ze.closest(".board-card"):null,rt=ct.length;if(vt){let E=vt.getAttribute("data-issue-id");if(E===Ae)return;let U=ct.findIndex(z=>z.id===E);U>=0&&(rt=U)}let We=ct.slice();We.splice(rt,0,it),g.applyReorder(Ae,We,rt)}function Me(){for(let _e of Array.from(e.querySelectorAll(".board-column--drag-over")))_e.classList.remove("board-column--drag-over")}let Ee=null;e.addEventListener("dragover",_e=>{_e.preventDefault(),_e.dataTransfer&&(_e.dataTransfer.dropEffect="move");let Ze=_e.target.closest(".board-column");Ze&&Ze!==Ee&&(Ee&&Ee.classList.remove("board-column--drag-over"),Ze.classList.add("board-column--drag-over"),Ee=Ze)}),e.addEventListener("dragleave",_e=>{let Ae=_e.relatedTarget;(!Ae||!e.contains(Ae))&&Ee&&(Ee.classList.remove("board-column--drag-over"),Ee=null)}),e.addEventListener("drop",_e=>{_e.preventDefault(),Ee&&(Ee.classList.remove("board-column--drag-over"),Ee=null);let Ae=_e.target,Ze=Ae.closest(".board-column");if(!Ze)return;let bt=_e.dataTransfer?.getData("text/plain")||"";if(!bt)return;let it=Ze.id,ct=D.get(bt);if(ct&&ct===it){if($h.has(it)){if(F!=="manual"){ve("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}te(it,bt,Ae)}return}let vt=wh[it];if(!vt){ve("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(bt)!==vt&&Zt(bt,vt)}),e.addEventListener("keydown",_e=>{let Ae=_e.target;if(!(Ae instanceof HTMLElement))return;let Ze=String(Ae.tagName||"").toLowerCase();if(Ze==="input"||Ze==="textarea"||Ze==="select"||Ze==="button"||Ze==="a"||Ae.isContentEditable===!0)return;let bt=Ae.closest(".board-card");if(!bt)return;let it=String(_e.key||"");if(it==="Enter"||it===" "){_e.preventDefault();let We=bt.getAttribute("data-issue-id");We&&r(We);return}if(it!=="ArrowUp"&&it!=="ArrowDown"&&it!=="ArrowLeft"&&it!=="ArrowRight")return;_e.preventDefault();let ct=bt.closest(".board-column");if(!ct)return;let vt=Array.from(ct.querySelectorAll(".board-card")),rt=vt.indexOf(bt);if(it==="ArrowDown"&&rt<vt.length-1){Pe(bt,vt[rt+1]);return}if(it==="ArrowUp"&&rt>0){Pe(bt,vt[rt-1]);return}if(it==="ArrowLeft"||it==="ArrowRight"){let We=Array.from(e.querySelectorAll(".board-column")),E=We.indexOf(ct),U=it==="ArrowRight"?1:-1,z=E+U;for(;z>=0&&z<We.length;){let we=We[z].querySelector(".board-card");if(we){Pe(bt,we);return}z+=U}}});function Pe(_e,Ae){try{_e.tabIndex=-1,Ae.tabIndex=0,Ae.focus()}catch{}}let Be=null;b&&b.subscribe&&(Be=b.subscribe(()=>{try{Z()}catch{}}));let tt=null;l&&l.subscribe&&(tt=l.subscribe(()=>{try{Z()}catch{}}));let Ot=null;return a&&a.subscribe&&(Ot=a.subscribe(()=>{ot()})),{async load(){n("load"),Z()},clear(){Re(),Qe(),Be&&(Be(),Be=null),tt&&(tt(),tt=null),Ot&&(Ot(),Ot=null),e.replaceChildren(),T=[],w=[],Q=[],re=[],W=[],q=[],K=new Map,D=new Map}}}function ss(e,t){return e.filter(n=>{let r=hi(n);return!(r&&t.has(r))})}async function Ah(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Ai=["bug","feature","task","epic","chore"];function vd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var kd=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var is={usd:null,basis:"none"};function Gr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wo(e){return typeof e=="number"&&Number.isFinite(e)}function Sh(e,t){if(!e||typeof t!="string"||t.length===0||!Gr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Gr(r?.models));for(let r of n){let o=r.models[t];if(Gr(o))return Gr(o.price)?o.price:null}for(let r of n)for(let o of Object.values(r.models))if(Gr(o)&&o.id===t)return Gr(o.price)?o.price:null;return null}function wd(e,t,n){if(!Gr(e))return is;if(wo(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=Sh(n,t);if(!r)return is;if(kd.some(([i])=>wo(e[i]))){let i=0;for(let[s,l]of kd){let a=wo(e[s])?e[s]:0;if(a<=0)continue;let u=r[l];if(!wo(u))return is;i+=a*u/1e6}return{usd:i,basis:"computed"}}return wo(e.total_tokens)&&wo(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:is}var yl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Eh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",$d="\uBD84\uD574 \uC5C6\uB294 leg",Th="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",Rh="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",vl={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function Ei(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Qt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function $o(e){let t=Ei(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(Th),n.push(Rh),n}function Qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xo=[...Jn,"reasoning_output_tokens"],Ch={codex:["implementation","review-consult"],claude:["subagent"]};function kl(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Jn.some(t=>Number.isFinite(e[t]))}function Oh(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))}function wl(e){let t=0;for(let n of Jn)t+=Qt(e?.[n]);return t}function Ih(e){return!e||typeof e!="object"?!1:Jn.some(t=>Number.isFinite(e[t]))}function xd(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Lh(e){let t={};for(let n of xo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ad(e){let t={};for(let n of xo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Sd(e,t){return kl(t)?Qt(t.total_tokens):e==="codex"?Qt(t.input_tokens)+Qt(t.output_tokens):wl(t)}function Dh(e){return e==="claude"?"Claude":"Codex"}function Ph(e){return`\u03C4 ${Rd(e)}`}function Nh(e,t){let n=t.breakdown||{},r=Qt(t.total_only_subtotal);if(kl(n)||r>0&&!Oh(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Eh,...$o(t)];return t.replayed&&u.push(yl),u.join(`
`)}let o=[`\uC785\uB825 ${Qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Qt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${$d} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${$d}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return a.push(...$o(t)),t.replayed&&a.push(yl),a.join(`
`)}function hn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let o=Ei(r);t.push({provider:n,label:`${Dh(n)} ${Ph(r.subtotal)}${o?` \xB7 ${o}`:""}`,tooltip:Nh(n,r)})}return t}function Ti(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Qt(l.total_only_subtotal)+Qt(s.total_only_subtotal));for(let a of xo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Qt(l.breakdown[a])+Qt(s.breakdown[a]));s.replayed&&(l.replayed=!0),typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)&&(n[i]+=s.total_cost_usd,r[i]=!0,s.cost_estimated===!0&&(l.cost_estimated=!0)),Number.isFinite(s.unpriced_leg_count)&&(l.unpriced_leg_count=Qt(l.unpriced_leg_count)+Qt(s.unpriced_leg_count))}for(let o of["claude","codex"]){let i=t[o];i&&r[o]&&(i.total_cost_usd=n[o])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function $l(e,t=null){return!e||typeof e!="object"?null:pr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function Ed(e,t){let n=wd(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function Mh(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function qh(e){return e==="codex"?"codex":"claude"}function Zn(){return{subtotal:0,breakdown:Lh(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function Si(e,t){e.subtotal+=t.subtotal,kl(t.usage)&&(e.total_only+=t.subtotal);for(let n of xo)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Qt(e.breakdown[n])+Qt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Qt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function Td(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Rd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ao(e){return Ih(e)?`\u03C4 ${Rd(wl(e))}`:null}function dr(e){let t=Ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function as(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${wl(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(yl),n.join(`
`)}function pr(e,t,n=null){let r={claude:Zn(),codex:Zn()},o={orchestrator:{claude:Zn(),codex:Zn()},implementation:{claude:Zn(),codex:Zn()},"review-consult":{claude:Zn(),codex:Zn()},subagent:{claude:Zn(),codex:Zn()}},i=new Set,s=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let p=u.usage;if(xd(p)){let _=qh(u.runner),b=Ad(p),g={provider:_,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:b,subtotal:Sd(_,b)};b.replayed===!0&&(g.replayed=!0),typeof u.model=="string"&&(g.model=u.model),typeof u.session_id=="string"&&(g.session_id=u.session_id),Ed(g,n),s.push(g),Si(r[_],g),Si(o.orchestrator[_],g)}let f=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let _ of f){let b=_&&_.provider==="claude"?"claude":"codex";if(!_||_.provider!=="codex"&&_.provider!=="claude"||!Ch[b].includes(_.role)||!xd(_.usage))continue;let g=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!g||i.has(g))continue;i.add(g);let T=Ad(_.usage),w={provider:b,role:_.role,attempt_id:String(u.attempt_id||""),usage:T,subtotal:Sd(b,T)};w.receipt_id=g,typeof _.agent_type=="string"&&(w.agent_type=_.agent_type),typeof _.agent_id=="string"&&(w.agent_id=_.agent_id),typeof _.model=="string"&&(w.model=_.model),typeof _.effort=="string"&&_.effort.trim().length>0&&(w.effort=_.effort),typeof _.session_id=="string"?w.session_id=_.session_id:typeof _.thread_id=="string"&&(w.session_id=_.thread_id),typeof _.turn_id=="string"&&(w.turn_id=_.turn_id),(typeof _.completed_at=="string"||typeof _.completed_at=="number"&&Number.isFinite(_.completed_at))&&(w.completed_at=_.completed_at),T.replayed===!0&&(w.replayed=!0),Ed(w,n),s.push(w),Si(r[b],w),Si(o[w.role][b],w)}}Mh(s);let l={};for(let u of["claude","codex"]){let p=r[u];p.legs.length!==0&&(l[u]=Td(p,!1))}if(Object.keys(l).length===0)return null;let a={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let p={};for(let f of["claude","codex"]){let _=o[u][f];_.legs.length>0&&(p[f]={...Td(_,!0),legs:_.legs})}Object.keys(p).length>0&&(a[u]=p)}return{providers:l,roles:a}}var Cd={running:3,paused:2,failed:1};function fr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Od(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Id(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),fr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!fr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let p=t.get(s.bead_id),f=typeof p=="number"&&p>0&&typeof s.finished_at=="number"&&p>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let p=Cd[u.run_state],f=Cd[l];if(p>f||p===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var jh=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Sl=Object.freeze({codex:"Codex \xB7 Sol",astra:"Codex \xB7 Astra"}),Pd=["orchestration_model","orchestration_effort","orchestration_speed"],Nd=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Fh=[...Pd,...Nd],Ld={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},El={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Dd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Bh=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","orchestrator-or-runtime-model-default","actual-effort"]);function cn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function So(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Md(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Pt(n[e]);return o===null?null:{value:o,source:"global"}}function Sr(e,t,n,r){return Md(e,t,n)||{value:r,source:"base"}}function xl(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&cn(o?.[t])){let s=Pt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&cn(o)){for(let s of Object.values(o))if(cn(s)){let l=Pt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Pt(r?.runners?.[i]?.models?.[e]?.id)||e}function Uh(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function jn(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?So(e):e;return Tt(e,t,r,e,"explicit")}function qd(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];cn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(cn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Wh(e,t){let n=[],r=e?.implementation?.model_catalog;cn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(cn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Hh(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Wh(t,n)){let i=qd(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Ri(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Al(e,t,n){let r=Md(e,t,n);return r?jn(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function In(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&cn(r.session)?r.session:null,i=r?.supported===!0&&cn(r.orchestration)?r.orchestration:null,s=cn(e.runner_catalog)?e.runner_catalog:null,l=Pt(n.quick_fix_impl_model),a=Hh(l,o,s),u={};if(o){let p=Sr("workflow_mode",t,n,Pt(o.workflow_mode_default));u.workflow_mode=p.source==="base"?Tt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):jn(p.value,p.source);for(let W of["spec_review","plan_review","impl_review"]){let q=`${W}_model`,N=Pt(W==="plan_review"?p.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=Sr(q,t,n,N);if(M.value===null)u[q]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!cn(o.review?.reviewers?.[M.value]))u[q]=Ri(Tt(M.value,M.source,"",null,"explicit"));else{let F=Uh(M.value,o);u[q]=Tt(M.value,M.source,So(F),F,M.source==="base"?"default":"explicit")}}for(let[W,q]of Object.entries(El)){let N=u[q].value;if(N==="self"||N==="skip"){u[W]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Pt(o.review?.reviewers?.[N||""]?.effort),F=Sr(W,t,n,M);u[W]=F.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[W,q]of Object.entries(Dd)){let N=u[q];if(N.resolution==="incompatible"||N.value==="self"||N.value==="skip"){u[W]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(N.resolution==="unavailable"){u[W]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=Sr(W,t,n,"default");u[W]=M.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jn(M.value,M.source)}let f=cn(o.implementation?.default)?o.implementation.default:{},_=Pt(e.route),b=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),g=cn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},T=b&&cn(g[_])?g[_]:{},w={},Q=!1;if(_==="quick_fix"){let W=Pt(t.impl_runtime),q=Pt(n.quick_fix_impl_runtime),N=W||q,M=N==="inherit"?Pt(e.controller_runtime):N;Q=l!==null&&a.runtime!==null&&(N===null||M===a.runtime);let F=Pt(t.impl_dispatch),K=Pt(n.quick_fix_impl_dispatch);if(F!==null)u.impl_dispatch=jn(F,"pin"),w.impl_dispatch="pin";else if(K!==null)u.impl_dispatch=jn(K,"global"),w.impl_dispatch="quick_fix";else if(Q)u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),w.impl_dispatch="implied";else{let D=Pt(T.dispatch)||Pt(f.dispatch);u.impl_dispatch=D?Tt(D,"base",D,D,"default"):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),w.impl_dispatch="base"}if(W!==null)u.impl_runtime=jn(W,"pin"),w.impl_runtime="pin";else if(q!==null)u.impl_runtime=jn(q,"global"),w.impl_runtime="quick_fix";else if(Q){let D=a.runtime;u.impl_runtime=Tt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit"),w.impl_runtime="derived"}else{let D=Sr("impl_runtime",{},n,Pt(f.runtime));u.impl_runtime=D.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit"),w.impl_runtime=D.source}for(let D of["impl_model","impl_effort","impl_speed"]){let A=Pt(t[D]),C=Pt(n[`quick_fix_${D}`]),R;A!==null?(R={value:A,source:"pin"},w[D]="pin"):D==="impl_model"&&Q&&l!==null?(R={value:l,source:"global"},w[D]="quick_fix"):D!=="impl_model"&&C!==null?(R={value:C,source:"global"},w[D]="quick_fix"):(R=Sr(D,{},n,Pt(f[D.replace("impl_","")])),w[D]=R.source),u[D]=R.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(R.value,R.source,R.value,R.value,R.source==="base"?"default":"explicit")}}else for(let W of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Sr(W,t,n,W==="impl_dispatch"?Pt(T.dispatch)||Pt(f.dispatch):Pt(f[W.replace("impl_","")]));u[W]=q.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let re=u.impl_dispatch.value==="main";if(re?u.impl_dispatch.display=w.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(w.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":w.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let W=u.impl_runtime.value==="inherit"?Pt(e.controller_runtime):u.impl_runtime.value,q=W?qd(W,o,s):[];_==="quick_fix"&&w.impl_model==="base"&&w.impl_runtime!=="base"&&q.length>0&&!q.includes(u.impl_model.value)&&(u.impl_model=Tt("auto","base","auto","auto","default"));let N=u.impl_model.value;if(N!=="auto"&&q.length>0&&!q.includes(N))u.impl_model=Ri(u.impl_model);else{let M=xl(N,W,o,s);u.impl_model.display=So(M),u.impl_model.full_value=M,w.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let W=Pt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=W?Pt(o.implementation?.effort_by_transport?.[W]?.auto):null;q&&!Bh.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}w.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=Tt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=w.impl_speed==="quick_fix"?Tt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jn("default",u.impl_speed.source));for(let W of["impl_runtime","impl_effort","impl_speed"])w[W]==="quick_fix"&&u[W].value!==null&&!u[W].display.endsWith("(quick_fix)")&&(u[W].display=`${u[W].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!Q&&a.offered&&(u.quick_fix_impl_model=Ri(Tt(l,"global","",l,"explicit")));for(let[W,q]of Object.entries(Ld))!W.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,W)&&(u[W]={...u[q]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=Tt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(re)for(let W of["impl_runtime","impl_model","impl_effort","impl_speed"])u[W]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let p of jh.filter(f=>!Fh.includes(f)))u[p]=Al(p,t,n);if(!o){for(let[p,f]of Object.entries(El))(u[f].value==="self"||u[f].value==="skip")&&(u[p]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[p,f]of Object.entries(Dd))(u[f].value==="self"||u[f].value==="skip")&&(u[p]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of Pd){if(!i){u[p]=Al(p,t,n);continue}let f=p.replace("orchestration_",""),_=Pt(i[f]),b=`quick_fix_${p}`,g=e.route==="quick_fix"?Pt(n[b]):null,T=Pt(t[p]),w=T!==null?{value:T,source:"pin"}:g!==null?{value:g,source:"global"}:Sr(p,{},n,_),Q=T===null&&g!==null;if(p==="orchestration_effort"&&w.source==="base"){u[p]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){u[p]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let re=w.source==="base"?Pt(i.model_id)||w.value:xl(w.value,null,o,s);u[p]=Tt(w.value,w.source,`${So(re)}${Q?" (quick_fix)":""}`,re,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){u[p]=Q?Tt("default","global","default (quick_fix)","default","explicit"):w.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jn("default",w.source);continue}u[p]=Q?Tt(w.value,"global",`${w.value} (quick_fix)`,w.value,"explicit"):jn(w.value,w.source)}for(let p of Nd){let f=Ld[p];u[p]=u[f]?{...u[f]}:Al(p,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${So(p)})`,null,"default")}else if(a.runtime!==null){let p=xl(l,a.runtime,o,s);u.quick_fix_impl_model=Tt(l,"global",So(p),p,"explicit")}else a.offered?u.quick_fix_impl_model=Ri(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=jn(l,"global");return u}function zh(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ci(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let _={...r,...f};return In({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Pt(i[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:zh(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:p.map(f=>{let _=o({...i,[e.key]:f})[e.key],b=Object.values(El).includes(e.key)&&_.resolution!=="incompatible"&&Object.hasOwn(Sl,f)?Sl[f]:_.display;return{value:f,label:b,full_value:_.full_value}})}}var Oi=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Kh=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],ls=[...Oi.filter(e=>e!=="impl_dispatch"),...Kh,"base_sync_accept_local_commits","bdui_url"],jd=["base_sync_accept_local_commits"],cs="true";function Ii(e){let t={};if(!vn(e))return t;for(let[n,r]of Object.entries(e)){if(jd.includes(n)){r===!0&&(t[n]=cs);continue}typeof r=="string"&&(t[n]=r)}return t}function Fd(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Fn=["orchestration_model","orchestration_effort","orchestration_speed"],Eo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Tl=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),To=[...Oi,...Fn],Gh=ls.filter(e=>To.includes(e));function Vh(e,t){let n={},r=[];for(let[i,s]of Object.entries(Tl)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Tl,i));return{values:n,warnings:r,skipped_keys:o}}var us=["delegated","main"],Li=["inherit","claude","codex"],er=["default","fast"],ds=["standard","fast_track"],ps=["codex","astra","opus","fable","self","skip"],Di=["codex","astra","fable","skip"],Pi=["low","medium","high","xhigh"],Bd=["default","fast"],Cn="auto";function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ud(e){if(!vn(e)||!vn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))vn(r)&&vn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ro(e,t){let n=Ud(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Cn,...r.flatMap(([,o])=>o)]}function Wd(e,t,n,r){if(!vn(e)||!vn(e.runners))return[Cn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!vn(s)||!vn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==Cn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!o.includes(p)&&o.push(p)}return[Cn,...o]}function Vr(e,t,n){return Wd(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ni(e,t,n){return Wd(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Co(e,t){let n=Ud(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Hd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Ro(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,o,r.impl_model||Cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Yh={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Xh={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Rl=[...Gh,...Fn],Qh=[...To,...ls].filter((e,t,n)=>n.indexOf(e)===t&&!Rl.includes(e));function zd(e,t){let n=vn(e)?e:{},r=vn(t)?t:{},o=[];for(let s of Rl){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:Yh[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...Qh,...Object.keys(r)])!Rl.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Kd(e,t,n){let r=vn(e)?e:{},o=Vh(vn(t)?t:{},n),i=[];for(let s of Object.values(Tl)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:Xh[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Cl(e,t,n,r,o,i,s=null){return Ci({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Gd(e,t){let n={};for(let r of ls){let o=e?.[r],i=t?.[r];if(o!==i){if(jd.includes(r)){n[r]=i===cs?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Vd(e,t){let n={};for(let r of[...Fn,...Eo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Ol=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fn]}],tr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Mi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Il(e,t,n,r,o,i=null){let s=In({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Yd(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Il(e,t,n,r,o,i))s[l.source]+=1;return s}function Xd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Qd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var iA=[...Oi,...Fn];var Zd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function fs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qi(e){if(!fs(e)||!fs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>fs(n)&&fs(n.models));return t.length>0?t:null}function Bn(e,t){let n=qi(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Jd(e,t){return fs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ep(e,t){let n=qi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Jd(r,r.models[t]);return[]}function Zh(e){let t=qi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Jd(r,o))n.includes(i)||n.push(i);return n}function Jh(e,t){if(!t)return Zh(e);let r=qi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of ep(e,i))o.includes(s)||o.push(s);return o}function tp(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Bn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?ep(t,r.impl_model):Jh(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ln(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function _s(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var Ll=new Set(["unavailable","not_applicable"]);function Er(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Dl(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Tr(e,t){return t===null?null:`${tr[e]}: ${t.display} (${Mi[t.source]})`}function ms(e){return e.filter(t=>t!==null).join(`
`)}function ji(e){if(typeof e!="object"||e===null)return null;let t=Ln(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ms(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(tr.orchestration_model,e.model),n(tr.orchestration_effort,e.effort),n(tr.orchestration_speed,e.speed)])}}function Oo(e,t){let n=Er(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Er(e,"orchestration_effort"),o=Er(e,"orchestration_speed"),i=Dl([Bn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ms(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Tr("orchestration_model",n),Tr("orchestration_effort",r),Tr("orchestration_speed",o)])}}function eb(e,t){return e===null||e.value===null||Ll.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function tb(e){return e===null||Ll.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function nb(e){return e===null?null:e.value==="auto"?"auto":Ll.has(e.resolution)?null:e.display}function Yr(e,t){if(typeof e!="object"||e===null)return null;let n=Er(e,"impl_dispatch"),r=Er(e,"impl_runtime"),o=Er(e,"impl_model"),i=Er(e,"impl_effort"),s=Er(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Dl([eb(r,t??null),tb(o),nb(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Tr("impl_dispatch",n),Tr("impl_runtime",r),Tr("impl_model",o),Tr("impl_effort",i),Tr("impl_speed",s)])}}function np(e){if(typeof e!="object"||e===null)return null;if(e.kind==="main")return{text:"\uBA54\uC778",title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4","\uAD6C\uD604: \uCEE8\uD2B8\uB864\uB7EC \uC9C1\uC811(main)"])};if(e.kind!=="delegated")return null;let t=typeof e.model=="string"?e.model:null,n=typeof e.effort=="string"?e.effort:null,r=Dl([t,n]);return r===""?null:{text:r,title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4",t===null?null:`${tr.impl_model}: ${t}`,n===null?null:`${tr.impl_effort}: ${n}`])}}var rb=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),ob=Object.freeze(["delivery_unproven:"]);function Io(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||rb.has(t))return"session";for(let n of ob)if(t.startsWith(n))return"session";return"settlement"}var sb=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var ib={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Pl(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>ib[n]||"").filter(n=>n.length>0)}var rp={orchestration_model:["fable"],impl_runtime:["claude"]},Nl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function op(e){return typeof e=="object"&&e!==null?e:null}function sp(e,t){return typeof e=="string"&&t.includes(e)?e:""}function ab(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>sb.includes(t))}function gs(e,t=e){let n=op(e);if(!n)return null;let r=sp(n.rec_orchestration_model,rp.orchestration_model);if(r.length===0)return null;let o=sp(n.rec_impl_runtime,rp.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=op(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let _=s[f];typeof _=="string"&&_.length>0&&(a+=1,_===i[f]&&(u+=1))}let p=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:ab(n.rec_reason),rec:i,state:p}}function Fi(e){if(!e||typeof e!="object")return"";let t=Pl(e),n=Nl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Bi(e){return e.replace(/\/+$/,"")}function lb(e,t){let n=Bi(e),r=Bi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ui(e,t){let n=new Set;for(let r of e)for(let o of t){if(!lb(r,o))continue;let i=Bi(r),s=Bi(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ml(e,t){return`${e}\0${t}`}function ip(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function bs(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function hs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function ap(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${hs(o)})`,location_label:hs(o),scope:null,same_lane_ahead:!1};let s=bs(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function lp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ml(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let p of Array.isArray(a.items)?a.items:[])r.set(p.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ml(l.root_dir,a.id),p=Array.isArray(a.items)?a.items[0]:null,_=!!p&&p.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],b=o.get(u);if(b)for(let g of _){let T=r.get(g);T&&T!==u&&!b.includes(T)&&b.push(T)}}let i=(l,a)=>{let u=new Set,p=[l];for(;p.length>0;){let f=p.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),p.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let p of a){let f=n.get(p);i(p,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function cp(e,t){return Ml(e,t)}var un=e=>e??Jt;var cb=Object.freeze(["done","abandoned"]);function up(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!cb.includes(e.phase)}var ub=".chip-popover, .judgement-chip";function Lo(e){let t=null,n=!1;function r(p){return t!==null&&t.bead_id===p.bead_id&&t.chip_key===p.chip_key}function o(p){t=r(p)?null:{...p},e()}function i(){t!==null&&(t=null,e())}function s(p){let f=p.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(ub)||i())}function l(p){p.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function Do(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function $n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function db(e){let t=await $n(e);ve(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Xr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{db(e)}}
    >
      ⧉
    </button></span
  >`}var dp=Object.freeze(["spec_backed","full_plan","quick_fix"]);var pb="worker-ineligible";function ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function pp(e){return ys(e).includes(pb)}var fb=new Set(dp),fp=new WeakMap;function Po(e){return e&&typeof e=="object"?e:{}}function _b(e){let t=fp.get(e);if(t)return t;let n=mp(e);return fp.set(e,n),n}function Wi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function mb(e,t){if(e.length===0)return null;if(_b(t).has(e))return{lane:"running"};if(Wi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Wi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=Wi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return Wi(t.done,e)>=0?{lane:"done"}:null}function ql(e,t){let n=fb.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function vs(e,t){let n=Po(e),r=Po(t),o=ho(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Po(n.metadata).route=="string"?Po(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&pp(n.labels),u=Object.hasOwn(Po(n.metadata),"awaiting_user"),p=mb(typeof n.id=="string"?n.id:"",r);return ql({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},p)}function Qr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function ks(e){let t=Po(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function _p(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ki(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function bp(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Zr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function yp(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function gp(e){return e==="auto"||e==="click"?e:null}function vp(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=gp(u.origin));continue}if(u.status!=="failed")continue;let p=typeof u.finished_at=="number"?u.finished_at:0;p>=l&&(l=p,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=gp(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function kp(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Gi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function gb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ki(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function wp(e,t){let n=gb(e,t);return n?c`<button
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
            title=${n.deploy.at?rn(n.deploy.at):""}
            >${Gi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Zr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function No(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function hb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $s(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function xs(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Yi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function $p(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function _r(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&up(_)).sort((_,b)=>(_.requested_at||0)-(b.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?hb(o.phase):null,u=o?.kind==="stale_work_backup_fresh",p=$p(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?p?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${p}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function xp(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function zi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=$p(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var bb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ap(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.action_id;if(typeof o!="string"||o.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(p){return Number.isInteger(l[p])?Number(l[p]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:s,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:bb[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:o,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Jr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function ws(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function yb(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function jl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function vb(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Sp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Qr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function kb(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Xi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=jl(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=jl(e.dependents),i=jl(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(p=>ws(p,"pred"))}${t}${o.map(p=>ws(p,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(p=>ws(p,"released"))}${i.map(p=>ws(yb(p),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Ep(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>ws({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Qi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function eo(e){let t=sa(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    data-route=${t}
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function Zi(e,t){let n=sa(e);return{route:n===null?void 0:n,tinted:n!==null&&t===!0}}function wb(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Tp(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ji(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Fi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var $b={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function xb(e,t=!1){let n=Rp(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Rp(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ab(e,t){if(typeof e!="string"||e.length===0||!Number.isInteger(t)||t<=0)return!1;try{let n=new URL(e).protocol;return n==="https:"||n==="http:"}catch{return!1}}function Cp(e,t){return Ab(e,t)?c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`:""}function ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Sb(e){let t=Array.isArray(e.badges)?e.badges:[],n=hn(e.usage),r=dr(e.usage),o=wn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${Cp(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${rn(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${Ep(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${eo(e.workflow)}${e.exec_chips?Jr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${as(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${bp(e.work_kind)}
            >작업 ${Zr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ta(e,t){return typeof e=="number"?e+Ip-t:0}function Bl(e,t=Date.now()){let n=ta(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function Ul(e,t=Date.now()){return ta(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function Mo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${Ul(e)}${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function Un(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Sb(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=hn(e.usage),i=dr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?wn(e.done_at):"",p=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=eo(e.workflow),T=e.lane==="done"?"":Tp(e.from_id),w=ea(e.priority),Q=c`<span class="worker-mini__title">${e.title}</span>`,re=Cp(e.pr_url,e.pr_number),W=e.foreign_repo?c`<span
        class="worker-mini__foreign-pr"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${e.foreign_repo}</span
      >`:"",q=r.map(ce=>ce===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ce}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ce===e.completion_badge&&e.completion_title||""}
          >${ce}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",M=o.length>0?o.map(ce=>c`<span class="worker-usage" title=${ce.tooltip}
              >${ce.label}</span
            >`):i?c`<span class="worker-usage" title=${as(e.usage)}
            >${i}</span
          >`:"",F=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",K=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",D=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",A=e.discard,C=A?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${A?.attempt_id||""}
          data-operation-id=${A?.operation?.operation_id||""}
          data-discard-mode=${A?.confirmation||"unmerged"}
          ?disabled=${A?!A.enabled:e.discard_enabled===!1}
          title=${A?A.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${A?.label||"\uD3D0\uAE30"}
        </button>`:"",R=A?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${A.operation.operation_id}
        data-operation-kind=${A.operation.kind||""}
        data-last-error=${A.error||""}
        title=${A.abandon.title}
      >
        ${A.abandon.label}
      </button>`:"",oe=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",fe=A?.abandon.action?c`${C}${R}${oe}`:c`${oe}${C}`,be=e.stale_work||null,H=be?c`${be.can_resume||be.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            기존 작업 이어가기
          </button>`:""}${be.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            백업 후 새로 시작
          </button>`:""}${be.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            다시 확인
          </button>`:""}`:"",ee=be?c`<div class="worker-mini__stale">
        <strong>${be.title}</strong>
        <span>${be.summary}</span>
        <span>${be.cause}</span>
        ${be.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?c`<button
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
        </button>`:"",Oe=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=Oe?Jr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",ae=Ji(e.rec,Rr(e,"rec")),le=xb(e,Rr(e,"receipt")),P=Qi(e.cross_lane_chip),se=Xr(e.log_path),ie=_||P||g||T||Oe||ae||le||M||se?c`<div class="worker-chips">
          ${_}${P}${g}${T}${Z}${ae}${le}${M}${se}${Hi(e)}
        </div>`:"",ye=Xi(e.dependency_chips,Bl(e.added_at)),ke=zi(e),Xe=t.actions?t.actions:"",X=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||A?.operation||e.revise_action||be),pe=Zi(e.workflow,!s&&e.external!==!0&&e.ghost!==!0);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${pe.tinted?" worker-mini--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${un(pe.route)}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${b}${w}${T}${re}${W}${Q}${Xe}
          </div>
          ${Ep(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${g}${Z}${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${bp(e.work_kind)}
                  >작업 ${Zr(e.work_ms)}</span
                >`:""}${q}${F}
            <span class="worker-mini__actions"
              >${K}${D}${fe}</span
            >
            ${No(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${p}${f}${b}${w}${re}${W}${q}${N}${Xe}
            </div>
            <div class="worker-mini__body">${Q}${ee}</div>
            ${ye}${ie}${X?c`<div class="worker-mini__foot">
                  ${F}
                  <span class="worker-mini__actions"
                    >${K}${D}${fe}${de}${H}</span
                  >
                  ${zi(e)}
                </div>`:""}
            ${No(e)}`:c`<div class="worker-mini__line">
              ${p}${f}${b}${w}${Q}${re}${W}${q}${N}${F}${K}${D}${fe}${Xe}
            </div>
            ${ye}${ie}${ke} ${No(e)}`}
  </div>`}function Wl(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Op={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Hl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Nl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Pl(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Op[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=Sp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Rp(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>$b[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Eb=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function na(e,t){for(let n of Eb){if(!t(n))continue;let r=Hl(e,n);return r?{chip_key:n,content:r}:null}return null}function Hi(e){return e.chip_popover?Do(e.chip_popover.content):""}function Rr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var zl="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Kl(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Op[e.session_preferred_reason||""]||"",u=e.workflow,p=e.missing_description===!0,f=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),b=Rr(e,"spec_after_blocker"),g=vb(e.spec_after_blocker===!0,b),T=Sp(e),w=Rr(e,"readiness"),Q=kb(T,w),re=c`${g}${b?Hi(e):""}${Q}${w?Hi(e):""}`,W=Xi(e.dependency_chips,g===""&&Q===""?"":re),q=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",N=Qi(e.cross_lane_chip),M=eo(u),F=Tp(e.from_id),K=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),D=!r&&(e.blocked===!0||e.queue_placeable===!1),A=Zi(u,!r);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${D?" worker-card--blocked":""}${A.tinted?" worker-card--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${un(A.route)}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ea(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Rr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Rr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Ji(e.rec,Rr(e,"rec"))}${wb(u,Rr(e,"qfr"))}
      ${b||w?"":Hi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ki(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${W}
    ${q||N||M||F||K?c`<div class="worker-chips">
          ${q}${N}${M}${F}${Jr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Wl(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${_?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${Qr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:p,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${No(e)}
  </div>`}function nr(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${un(e.id||void 0)}
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
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?Kl(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Un(o))}
          </div>`}
  </section>`}function hp(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ra(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${hp("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${un(r.drop)}
            data-root-dir=${un(r.root_dir)}
            data-lane-id=${un(r.lane_id)}
            data-lane-length=${un(r.lane_length)}
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
        ${hp("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Tb(o))}
          </div>`}
    </section>
  </div>`}function Tb(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${nr({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${un(t.drop)}
        data-root-dir=${un(t.root_dir)}
        data-lane-id=${un(t.lane_id)}
        data-lane-length=${un(t.lane_length)}
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
  </div>`}function oa(e){return e.count?c`<section
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
  </section>`:""}var Lp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],As=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ia(e,t){let n=Lp.find(o=>o.step===e);if(!n)return null;let r=Lp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Dp(e){let t=As.findIndex(n=>n.step===e);return As.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function to(e){let t=As.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Rb(e){let t=As.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:As.length}}function aa(e){let t=Rb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Vl=new Set(["queued","running","retry_pending"]),Pp=new Set(["failed","succeeded"]),Cb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Ss={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ob={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ss.base_containment,child_sweep:Ss.child_sweep,branch_cleanup:Ss.branch_cleanup,parent_close:Ss.parent_close};function Ib(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Lb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Vl,...Pp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Db(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Gl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Cb[o];if(!i)return null;let s=ia(n,`${r} ${i}`);return s?{...s,active:Vl.has(o),failed:o==="failed"}:null}function Pb(e){return!e||typeof e!="object"?null:Ob[e.step]||null}function Es(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Pb(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Ib(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(g=>g&&typeof g=="object"&&Lb(g,t,l)).sort(Db):[],u=s?a:[],p=u.find(g=>Vl.has(g.state));if(p)return Gl(p);if(o)return o.step==="repo_operations"&&a[0]?Gl(a[0],!0):null;let f=u.find(g=>Pp.has(g.state)?g.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Gl(f);if(r){let g=ia(r.step,r.label);return g?{...g,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Ss[e.cleanup_cursor]:null;if(!_)return null;let b=ia(_.step,_.label);return b?{...b,active:!0,failed:!1}:null}function la(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Nb="\uBBF8\uC801\uC7AC";function Yl(e,t){return`${e} ${t}`}function Xl(e,t,n,r){if(!n)return`${e} \u2014 ${t}`;let o=typeof r=="string"&&r.length>0?`\uB2E4\uB978 \uC800\uC7A5\uC18C(${r})`:"\uB2E4\uB978 \uC800\uC7A5\uC18C";return`${e} \u2014 ${t} \xB7 ${o}\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4`}function Mb(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Ql(e,t){let n=Qn(e,t.id),r=Yl("\u26D3",t.id);return{id:t.id,label:r,title:Xl(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n,t.workspace_name),...n?{foreign:!0}:{}}}var qb=10080*60*1e3;function Np(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-qb)return null;let o=Qn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s=Yl("\u{1F513}",t.id),l={id:t.id,label:s,title:Xl(s,`\uD574\uC81C \u2014 ${rn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,o,t.workspace_name),...o?{foreign:!0}:{}};return o?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function Mp(e,t,n,r){let o=Qn(e,t),i=Yl("\u{1F513}",t),s={id:t,label:i,title:Xl(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",o,n),...o?{foreign:!0}:{}};return o?typeof r=="string"&&r.length>0&&(s.openable=!0,s.root_dir=r):s.openable=!0,s}function qp(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Qn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function jp(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],p=Mb(u),f=Ql(i,{id:a,location_label:o.get(a)||Nb,...p?{workspace_name:p}:{}});f.foreign!==!0?f.openable=!0:typeof u=="string"&&u.length>0&&(f.openable=!0,f.root_dir=u),l.push(f)}l.length>0&&r.set(i,l)}return r}var da=1,Ip=2e4,Ts=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Rs=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ro=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function no(e){if(!Array.isArray(e))return[];let t=new Set(ro.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function pa(e,t){let n=no(e);return n.includes(t)?n.filter(r=>r!==t):no([...n,t])}var qo={show_blocked:!0,readiness:"all",routes:[]},Fp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function jb(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!fr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Fb(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!fr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function mp(e){let t=Ye(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Gp(Ye(t.attempts),n).keys())}function Gp(e,t,n={}){let{winners:r,resumed_from_ids:o}=Id(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Yp(a))continue;let p=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,b=Io(a.quickfix_landing)==="session",g=u!=="running"&&(f||!b)&&!o.has(a.attempt_id),T=!f&&b?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,w=Ye(n.observations?.[s]),Q=Ye(w.pr),re=typeof a.merge_sha=="string"&&a.merge_sha.length>0||Q.state==="MERGED",W=_r(n.discard_operations,s,{attempt_id:a.attempt_id,merged:re}),q=u==="failed"?Up(a,{resume_eligible:g,resume_reason:T,confirmation:W.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Bp(a,e,u,n.runner_catalog),started_at:p,...q?{failure:q}:{},can_pause:u==="running"&&f,can_resume:g})}for(let[s,l]of Vb(e,t)){if(i.has(s)||l.run_state==="waiting"&&Qp(n.admission,s))continue;let a=l.attempt,u=_r(n.discard_operations,s,{attempt_id:a.attempt_id}),p=Xp(a),f=l.run_state==="provider_hold"?Kb(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Bp(a,e,l.run_state,n.runner_catalog),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Up(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Bb(a)}:{},...f?{hold:f}:{},...p?{retry:p}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Bp(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:pr(t,e.bead_id,r)}}function Up(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Xp(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:xp(e),confirmation:t.confirmation,...Vp(t.history)}}function Vp(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Bb(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Yp(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Ub(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Ye(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Wb(e,t){if(e===null)return null;let n=Ye(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Hb(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function zb(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Hb(e,r.attempts)?"disarmed":null}function Kb(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Ub(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=zb(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,p=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=Wb(s,t.account_catalog),_=Vp(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...p===null?{}:{next_probe_at:p},..._.log_path?{log_path:_.log_path}:{}}}function Xp(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Gb=new Set(["parked","retry_wait","waiting"]);function Vb(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&fr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Yp(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!fr(s)||!Gb.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Wp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Qp(e,t){let n=Ye(Ye(e)[t]),r=Ye(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Ye(e){return e&&typeof e=="object"?e:{}}function ec(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Yb(e){let t=Ye(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Xb(e,t,n){let r=Ye(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>In({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let p=Hp(Oo(a,i),Oo(u,i)),f=Hp(Yr(a,null),Yr(u,null));return p||f?{orchestration:p,worker:f}:null}function Hp(e,t){return!e||t&&t.text===e.text?null:e}function Qb(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=typeof s.workspace_name=="string"&&s.workspace_name.length>0?s.workspace_name:ec(s.root_dir),a=Np(e,{...s,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function nc(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Zb=new Set(["quick_fix","spec_backed","full_plan"]);function zp(e){return typeof e=="string"&&Zb.has(e)}function Jb(e){let t={...Ye(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Kp(e,t,n){let r=e.runner_catalog??null,o=tc(e,t,n,null);if(!o)return null;let i=Bn(r,o.orchestration_model.value??""),s=i===null?o:tc(e,t,n,i)||o,l=Oo(s,r),a=Yr(s,i);return l||a?{orchestration:l,worker:a}:null}function tc(e,t,n,r){let o=zp(n)?n:zp(t.route)?t.route:null;try{return In({pin:t,global:Jb(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function ey(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Yr(tc(e,Ye(t.metadata),t.route,n),n)}function ty(e){if(!e)return null;let t=ji(e),n=np(e.impl_actor);return t||n?{orchestration:t,worker:n}:null}function sa(e){if(!e)return null;let t=Ye(e),n=Ye(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function ny(e){return sa(e.workflow)??"unset"}function rc(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ry(e){let t={};for(let l of Jn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let p of Jn)Number.isFinite(a[p])&&(t[p]+=a[p],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?hn(Ti(s)):n?dr(t):null}function Zp(e,t){let n=bs(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function oy(e,t,n){let r=t.get(e);if(!r)return Zp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return hs(r)}function sy(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&bs(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Zp(e,n),title:""};if(s.state==="runnable"&&i&&bs(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,p=o.get(e);return{label:!!p&&p.reason==="prerequisite_unmet"&&Array.isArray(p.blockers)&&p.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":hs(s),title:""}}function iy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function ay(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ua(e,t){return`${typeof e=="string"?e:""}\0${t}`}function ly(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((p,f)=>{let _=typeof p.id=="string"?p.id:"";if(_.length===0)return;let b=p.status==="confirmed"?"confirmed":"draft",g=Array.isArray(p.entries)?p.entries:[],T=[];g.forEach((W,q)=>{let N=W&&typeof W.bead_id=="string"?W.bead_id:"";if(N.length===0)return;let M=W&&typeof W.root_dir=="string"?W.root_dir:"",F=n.get(N),K=F?F.state:void 0,D=K==="running"||K==="pr_wait"||K==="done",A=!F||K==="runnable",C=F&&F.lane==="parallel"&&typeof F.position=="number"?F.position-1:null,R=sy(N,n,r,t,l,b==="confirmed"),oe=T.length>0?T[T.length-1]:null,fe=b==="confirmed"&&oe!==null&&!oe.done&&!(t.get(N)||[]).includes(oe.id),be=a.get(ua(M.length>0||!F?M:F.root_dir,N))||null;T.push({id:N,title:o.get(N)||N,route:be?be.route:null,route_source:be?be.route_source:null,exec_chips:be?be.exec_chips:null,added_at:be?be.added_at:null,root_dir:F?F.root_dir:M,workspace_name:F?F.workspace_name:i.get(M)||"",seq:q+1,location_label:R.label,location_title:R.title,draggable:!D,fixed:D,done:K==="done",unplaced:A,mismatch:fe,...C!==null?{queue_index:C}:{}})}),T.forEach((W,q)=>{W.seq=q+1});let w=T.length>0&&T.every(W=>W.done),Q=T.filter(W=>!W.fixed&&s.armed_by_bead.get(W.id)!==_).map(W=>W.id),re=ay(_,b,T,w,Q,s);u.push({lane_id:_,status:b,draft:b==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:T,all_done:w,can_confirm:b==="draft"&&T.length>=2,has_mismatch:b==="confirmed"&&T.some(W=>W.mismatch),unlaunched:Q,...re})}),u}function cy(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function uy(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,p=i.get(u);if(p){p.cards.push(a);continue}let{scope:f,state:_}=cy(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let p=a.cards[0].root_dir,f=s.get(p);f?f.push(a):s.set(p,[a])}let l=(a,u,p)=>{let f=u.cards[0],_={id:f.id,title:f.title,location_label:oy(f.id,r,o),prefixes:p,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let b of a.cards)b.overlap_chips?b.overlap_chips.push(_):b.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let p=u+1;p<a.length;p+=1){let f=Ui(a[u].scope,a[p].scope);f.length!==0&&(l(a[u],a[p],f),l(a[p],a[u],f))}}function Zl(e,t,n,r){let o=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,s=!Qn(e.id,t),l=typeof e.root_dir=="string"?e.root_dir:"",a=typeof o=="string"&&o.length>0?o:typeof i=="string"&&i.length>0?i:s&&l.length>0?l:"";return a.length>0?{openable:!0,root_dir:a}:s?{openable:!0}:{}}function dy(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Qn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function Jl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ca(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function py(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function fy(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function Cr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...qo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Ts.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",p=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),_=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x);let b=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&b.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&b.set(x.root_dir,x.name||x.root_dir);let g=[],T=[],w=[],Q=[],re=[],W=[],q=new Map,N=new Map,M=new Map,F=new Map,K=new Map,D=new Map,A=new Map,C=new Map,R=new Map,oe=new Map,fe=new Map,be=new Map,H=new Map,ee=new Map,de=new Map,Oe=new Map,Z=new Set,ae=new Map,le=new Map,P=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let te=x.root_dir,Me=x.name||te,Ee=_.get(te),Pe=Ee&&typeof Ee.revision=="number"?Ee.revision:typeof x.revision=="number"?x.revision:0,Be=Ye(x.attempts),tt=Ee&&Ee.runner_catalog||x.runner_catalog||null,Ot=Ye(x.bead_titles);for(let[d,m]of Object.entries(Ot))typeof m=="string"&&m.length>0&&P.set(d,m);let _e=Ye(x.bead_times),Ae=Ye(x.pr_observations),Ze=Ye(x.admission),bt=Ye(x.blocker_workspaces);be.set(te,bt);for(let[d,m]of Object.entries(Ze))m&&typeof m=="object"&&fe.set(d,m);let it=Ye(x.revise_parked),ct=Ye(x.merge_queue_state),vt=Ye(x.cleanup_failed),rt=Ye(x.discard_operations),We=Ye(x.bead_timelines),E=Ye(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&ae.set(te,Ye(x.bead_scope));let U=Ye(x.bead_workflow),z=Ye(x.pr_activity),we=Array.isArray(x.repo_operations)?x.repo_operations:[];C.set(te,we);let Te=typeof x.declared_base=="string"?x.declared_base:null;A.set(te,Te),D.set(te,Object.entries(vt).map(([d,m])=>({bead_id:d,step:m&&m.step?m.step:"",reason:m&&m.reason?m.reason:"",at:m&&typeof m.at=="number"?m.at:null,detail:m&&typeof m.detail=="string"?m.detail:null,output_tail:m&&typeof m.output_tail=="string"&&m.output_tail?m.output_tail:void 0,log_path:m&&typeof m.log_path=="string"&&m.log_path?m.log_path:void 0,retry_count:m&&typeof m.retry_count=="number"&&Number.isInteger(m.retry_count)&&m.retry_count>0?m.retry_count:0,failure_code:m&&typeof m.failure_code=="string"?m.failure_code:void 0})));for(let[d,m]of Object.entries(Ye(x.bead_overlay)))m&&typeof m=="object"&&R.set(`${te}\0${d}`,m);let $t=new Map;for(let d of Object.values(Be))d&&typeof d.attempt_id=="string"&&$t.set(d.attempt_id,d);let kt=Array.isArray(x.merge_queue)?x.merge_queue:[],Rt=new Set(kt.filter(d=>d&&typeof d.bead_id=="string").map(d=>d.bead_id)),qt=new Map(kt.filter(d=>d&&typeof d.bead_id=="string").map(d=>[d.bead_id,d])),Wt=new Map,Xt=new Map,sn=new Map,xt=new Map;kt.forEach((d,m)=>{d&&typeof d.bead_id=="string"&&(Wt.set(d.bead_id,m+1),Xt.set(d.bead_id,d.resolution),sn.set(d.bead_id,d.continuation_action||null),xt.set(d.bead_id,d.authority||null))});let tn=Ye(x.auto_merge_skips),fn=d=>{let m=tn[d];if(!m)return null;let $=Ye(Ye(Ae[d]).pr).head_sha;return $&&$===m.head_sha?m.reason||"":null};K.set(te,{positions:Wt,resolutions:Xt,continuations:sn,authorities:xt,state:{active:typeof ct.active=="string"?ct.active:null,failures:Ye(ct.failures),waiting:ct.waiting&&typeof ct.waiting.bead_id=="string"&&typeof ct.waiting.reason=="string"?ct.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(d=>d&&d.bead_id).filter(d=>typeof d=="string"&&fn(d)!==null),running:kt.length>0});let Ft=Array.isArray(x.queue)?x.queue:[];for(let d of[...Ft,...(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).flatMap(m=>Array.isArray(m?.entries)?m.entries:[]),...Array.isArray(x.pr_wait)?x.pr_wait:[]])d&&typeof d.bead_id=="string"&&typeof d.armed_by_lane=="string"&&d.armed_by_lane.length>0&&de.set(d.bead_id,d.armed_by_lane);for(let d of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof d=="string"&&d.length>0&&Z.add(d);let Gt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(d=>d&&/^s[1-5]$/.test(d.id)&&Array.isArray(d.entries)),on=Ye(x.lane_states),He=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Gt.length);M.set(te,He),F.set(te,Ft.length);let I=new Map(Gt.map(d=>[d.id,d])),$e=new Map;for(let d of Gt)for(let m of d.entries)m&&typeof m.bead_id=="string"&&$e.set(m.bead_id,d.id);for(let[d,m]of Object.entries(Ye(x.bead_dependents))){let $=Array.isArray(m?.ids)?m.ids:[],Y=Ye(m?.root_dirs),J=ee.get(d)||{ids:new Set,root_dirs:{}};for(let me of $)typeof me=="string"&&me.length>0&&J.ids.add(me);for(let[me,Ne]of Object.entries(Y))typeof Ne=="string"&&Ne.length>0&&(J.root_dirs[me]=Ne);ee.set(d,J)}for(let[d,m]of Object.entries(E))Array.isArray(m)&&oe.set(d,m.filter($=>typeof $=="string"&&$.length>0));let je=Array.isArray(x.done)?x.done:[];for(let d of je)d&&typeof d.bead_id=="string"&&W.push({id:d.bead_id,root_dir:te,workspace_name:Me});let At=new Map;for(let d of je)d&&typeof d.bead_id=="string"&&typeof d.added_at=="number"&&At.set(d.bead_id,d.added_at);let Ke=d=>({id:d,title:Ot[d]||d,root_dir:te,workspace_name:Me,expected_revision:Pe,draggable:!1,...Ye(_e[d]).created_at?{created_at:Ye(_e[d]).created_at}:{},...Ye(_e[d]).updated_at?{updated_at:Ye(_e[d]).updated_at}:{}}),Lt=d=>{let m=U[d]?.chips?.pr;return m&&typeof m.number=="number"&&typeof m.url=="string"?{pr_number:m.number,pr_url:m.url}:{}},Bt=d=>Object.hasOwn(E,d)?{blocked_by:Array.isArray(E[d])?E[d].filter(m=>typeof m=="string"&&m.length>0):[]}:{},st=(d,m)=>{let $=Bt(d),Y=Ze[d],J=Y&&Y.reason==="prerequisite_unmet"&&Array.isArray(Y.blockers)?Y.blockers:[],me=(m?.blockers||[]).map(Ge=>Ge.id).filter(Ge=>typeof Ge=="string"&&Ge.length>0);if(m&&Object.hasOwn(E,d)){let Ge=$.blocked_by||[],yt=me.filter(Ut=>!Ge.includes(Ut));return yt.length>0&&H.set(`${te}\0${d}`,yt),{blocked_by:Ge,wait:{...m,returning:Ge.length===0}}}let Ne=[...me,...J.map(Ge=>Ge.id)].filter(Ge=>typeof Ge=="string"&&Ge.length>0);if(Ne.length===0)return m?{...$,wait:{...m,returning:!1}}:$;let wt=[...$.blocked_by||[]];for(let Ge of Ne)wt.includes(Ge)||wt.push(Ge);return{blocked_by:wt,...m?{wait:{...m,returning:!1}}:{}}},Ct=new Set;for(let[d,m]of Gp(Be,At,{discard_operations:rt,observations:Ae,bead_timelines:We,provider_hold:Ye(x.provider_hold),auto_resume_pending:Array.isArray(x.auto_resume_pending)?x.auto_resume_pending:[],account_catalog:Ye(x.account_catalog),runner_catalog:tt,admission:Ze})){Ct.add(d);let $=m.run_state==="failed"?iy(Be,m.attempt_id):null;$!==null&&Oe.set(d,$);let Y=$t.get(m.attempt_id)||null,J=R.get(`${te}\0${d}`),me=J&&J.rollup?J.rollup:null,Ne=nc(Te,Y?Y.target_base:null),wt=Y?rc(Y,$t):!1,Ge=Y&&Y.quickfix_lane===!0&&Y.quickfix_landing&&typeof Y.quickfix_landing=="object"?Y.quickfix_landing:null,yt=Ge&&typeof Ge.reason=="string"&&Ge.reason.length>0?Ge.reason:null,Ut=Ge?Es({bead_id:d,merge_sha:Ge.head_sha,cleanup_cursor:Ge.cursor,cleanup_failed:yt?{step:Ge.cursor,reason:yt}:null,repo_operations:we}):null,S=st(d,m.wait);T.push({...Ke(d),lane:"running",...S,...$e.has(d)?{serial_lane_id:$e.get(d)}:{},attempt_id:m.attempt_id,run_state:m.run_state,status:m.status||void 0,workflow:U[d]||null,can_pause:m.can_pause,can_resume:m.can_resume,started_at:m.started_at,last_event_at:m.last_event_at,last_activity:m.last_activity,legs:m.legs,runner:m.runner,model:m.model,effort:m.effort,speed:m.speed,resumed_from:m.resumed_from,continuation_mode:m.continuation_mode,usage:m.usage,failure:m.failure||null,hold:m.hold||null,wait:S.wait||m.wait||null,retry:m.retry||null,exec_chips:{orchestration:ji(m),worker:ey(Ye(Ee),J,m.runner||null)},discard:_r(rt,d,{attempt_id:m.attempt_id,merged:m.failure?.confirmation==="merged"||Ye(Ae[d]).pr?.state==="MERGED"}),...me?{rollup:me}:{},...wt?{conflict_resolution:!0}:{},...Ne?{base_exception:Ne}:{},...Ut?{landing:Ut}:{},badges:m.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:m.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:m.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:m.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:m.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:m.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:m.run_state==="failed"})}for(let[d,m]of Od(Be)){if(T.some(Y=>Y.id===d))continue;let $=m.attempt;T.push({...Ke(d),lane:"running",kind:"session",...Bt(d),attempt_id:typeof $.attempt_id=="string"?$.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:U[d]||null,can_pause:!1,can_resume:!1,started_at:m.started_at,last_event_at:typeof $.last_event_at=="number"?$.last_event_at:null,last_activity:$.last_activity&&typeof $.last_activity=="object"?$.last_activity:null,legs:Array.isArray($.legs)?$.legs:[],runner:typeof $.runner=="string"?$.runner:null,model:typeof $.model=="string"?$.model:null,effort:typeof $.effort=="string"?$.effort:null,speed:typeof $.speed=="string"?$.speed:null,resumed_from:null,continuation_mode:null,usage:$.usage&&typeof $.usage=="object"?$.usage:null,exec_chips:{orchestration:ji($),worker:null},discard:_r(rt,d,{merge_queued:!0}),badges:[m.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let d of Array.isArray(x.session_active)?x.session_active:[]){let m=d&&d.bead_id;typeof m!="string"||Ct.has(m)||(Ct.add(m),Array.isArray(d.blocked_by)&&d.blocked_by.length>0&&oe.set(m,d.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof d.title=="string"&&d.title.length>0&&P.set(m,d.title),T.push({...Ke(m),title:d.title||Ot[m]||m,lane:"running",kind:"session",status:"in_progress",started_at:Jl(d.started_at)??Jl(d.updated_at)??void 0,updated_at:Jl(d.updated_at)??void 0,workflow:d.workflow||null,labels:Array.isArray(d.labels)?d.labels:[],spec_id:typeof d.spec_id=="string"?d.spec_id:"",blocked:d.blocked===!0,...Array.isArray(d.blocked_by)?{blocked_by:d.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(d.session_refs)?d.session_refs:[],badges:[],alert:!1}))}for(let d of Array.isArray(x.pr_wait)?x.pr_wait:[]){let m=d&&d.bead_id;if(typeof m!="string"||Ct.has(m))continue;Ct.add(m);let $=Ye(Ae[m]),Y=Ye($.pr),J=$.gate?Ye($.gate):null,me=Rt.has(m),Ne=qt.get(m)?.continuation_action||null,wt=!!Ne&&Ne.continuation===null,Ge=ct.active===m,yt=d.external===!0,Ut=d.foreign===!0,S=Ut&&typeof d.repo_slug=="string"?d.repo_slug:"",L=Ut&&typeof d.pr_url=="string"?d.pr_url:"",Le=Ut&&typeof d.pr_number=="number"?d.pr_number:null,Ie=vt[m]||null,ft=Ye(z[m]),dt=Es({bead_id:m,merge_sha:d.merge_sha,cleanup_cursor:d.cleanup_cursor,merge_progress:ft.merge_progress||null,cleanup_failed:Ie,repo_operations:we}),nn=la(dt),Mr=!!J&&J.base_badge==="\uCDA9\uB3CC",Vn=!!Ie&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(Ie.step)&&!!J&&J.tier==="merged",or=yt&&!!Ie&&!!J&&J.tier==="merged",k=!!J&&["closed_unmerged","review","undecidable"].includes(J.tier),h=_r(rt,m,{external:yt,merge_active:Ge||dt?.step==="merge",merge_queued:me,cleanup_active:nn,merged:!!Ie||J?.tier==="merged"}),O=!!h.operation,ue=Yb($.receipt_check);w.push({...Ke(m),lane:"pr_wait",...Bt(m),...ue.length>0?{receipt_badge:{codes:ue}}:{},workflow:U[m]||null,pr_number:Le??(typeof Y.number=="number"?Y.number:null),pr_url:L||(typeof Y.url=="string"?Y.url:void 0),external:yt,...S?{foreign_repo:S}:{},usage:pr(Be,m,tt),merge_step:dt,badges:wt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:dt?[J?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ie?[to(Ie.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${to(Ie.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:J?.reason==="pr_repo_foreign"?["\uC678\uBD80 \uC800\uC7A5\uC18C PR"]:typeof J?.gate_badge=="string"&&J.gate_badge.length>0?[J.gate_badge]:[],alert:dt?dt.failed===!0:!!Ie||k,reason:Ie&&dt?.active!==!0?aa(Ie.step):"PR \uB300\uAE30",merge_action:J?.tier==="merged"&&!Vn&&!or?!1:!me||wt,merge_enabled:!O&&(wt||J?.enabled===!0||Mr||Vn||or),merge_label:wt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":or||Vn?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":Mr&&!Vn?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:wt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":O?h.error?`\uD3D0\uAE30 \uC2E4\uD328: ${h.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${h.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:or?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Vn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Mr?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":J?.enabled===!0?`\uBA38\uC9C0 (${J.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${J?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:me&&!wt,cancel_enabled:!Ge,continuation_mismatch:Ne?.mismatch||null,discard:h,discard_action:h.action,discard_enabled:h.enabled,discard_title:h.title})}let yn=(d,m,$,Y)=>{let J=d&&d.bead_id;if(typeof J!="string"||Ct.has(J))return null;Ct.add(J);let me=it[J],Ne=_r(rt,J),wt=Ne.operation?Ne:null,Ge={...Ke(J),lane:m,...typeof d.added_at=="number"?{added_at:d.added_at}:{},workflow:U[J]||null,draggable:!wt,discard:wt||void 0,reason:Wp(Ze,J),seq:$+1,queue_position:$+1,queue_index:$,queue_length:Y,badges:me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!me,revise_action:!!me,revise_enabled:!!me&&!wt,revise_title:me?me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},yt=st(J,null);return Object.hasOwn(yt,"blocked_by")&&(Ge.blocked_by=yt.blocked_by),Ge};for(let d=0;d<Ft.length;d++){let m=yn(Ft[d],"queue",d,Ft.length);if(!m)continue;Q.push(m);let $=q.get(te);$?$.push(m):q.set(te,[m])}let Nt=d=>{let m=w.find(me=>me.id===d&&me.root_dir===te);if(m)return{id:d,title:m.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $=T.find(me=>me.id===d&&me.root_dir===te),Y=$?$.run_state:jb(Be,d),J=Y==="failed"||Y==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Y==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:d,title:$?$.title:Ke(d).title,badge:J}},kn=[];for(let d=0;d<Math.max(He,Gt.length);d++){let m=`s${d+1}`,$=I.get(m),Y=$&&Array.isArray($.entries)?$.entries:[],J=Ye(on[m]),me=Array.isArray(J.occupied_by)?J.occupied_by.filter(yt=>typeof yt=="string"):[],Ne=new Set(me),wt=new Set(Y.map(yt=>yt?.bead_id).filter(yt=>typeof yt=="string"&&Ne.has(yt)&&Qp(Ze,yt))),Ge=[];for(let yt=0;yt<Y.length;yt++){let Ut=Y[yt]&&Y[yt].bead_id;if(typeof Ut=="string"&&Ne.has(Ut)&&!wt.has(Ut)){Ct.add(Ut);continue}let S=yn(Y[yt],m,yt,Y.length);S&&(typeof Ut=="string"&&wt.has(Ut)&&(S.badges=[Nt(Ut).badge,...S.badges||[]]),Ge.push(S),Q.push(S))}Ge.length===0&&me.length===0&&(He<=1||d>=He)||kn.push({id:m,index:d,items:Ge,raw_length:Y.length,occupied_by:me,occupants:me.filter(yt=>!wt.has(yt)).map(yt=>Nt(yt)),corrections:Array.isArray(J.corrections)?J.corrections.length:0,cycle:J.cycle===!0,...Ge.length===0&&me.length===0?{empty:!0}:{}})}N.set(te,kn);let y=Array.from({length:He},(d,m)=>{let $=`s${m+1}`,Y=I.get($),J=Y&&Array.isArray(Y.entries)?Y.entries:[],me=Ye(on[$]);return{id:$,index:J.length,length:J.length,occupied_by:Array.isArray(me.occupied_by)?me.occupied_by.filter(Ne=>typeof Ne=="string"):[]}});for(let d of Array.isArray(x.runnable)?x.runnable:[]){let m=d&&d.bead_id;if(typeof m!="string"||Ct.has(m))continue;Ct.add(m);let $=d.workflow&&typeof d.workflow=="object"?d.workflow:null,Y=$&&typeof $.route=="string"&&$.route||(typeof d.route=="string"?d.route:null),J=Xb(Ye(Ee),d.exec_pins,Y),me=gs(d.rec,d.exec_pins);Array.isArray(d.blocked_by)&&d.blocked_by.length>0&&oe.set(m,d.blocked_by.filter(dt=>typeof dt=="string"&&dt.length>0)),typeof d.title=="string"&&d.title.length>0&&P.set(m,d.title),Array.isArray(d.scope)&&le.set(m,d.scope.filter(dt=>typeof dt=="string"&&dt.length>0));let Ne=Object.hasOwn(d,"eligible"),Ge=!Ne&&Object.hasOwn(d,"route")&&Object.hasOwn(d,"spec_state")&&Object.hasOwn(d,"has_description")&&Object.hasOwn(d,"awaiting_user")&&Object.hasOwn(d,"worker_ineligible")?ql({route:typeof d.route=="string"?d.route:"",spec:d.spec_state,has_description:d.has_description===!0,awaiting_user:d.awaiting_user===!0,worker_ineligible:d.worker_ineligible===!0},null):null,yt=Ne?d.eligible!==!1:Ge?Ge.placeable:!0,Ut=Ge?Ge.worker_ineligible:d.worker_ineligible===!0,S=yt&&!Ut,L=Ge?{route_ok:Ge.route_ok,awaiting_user:Ge.awaiting_user,missing_description:Ge.missing_description,placement_spec:Ge.spec}:Object.hasOwn(d,"route_ok")?{route_ok:d.route_ok===!0,awaiting_user:d.awaiting_user===!0,missing_description:d.missing_description===!0,placement_spec:d.placement_spec}:null,Le=[];!Ne&&Ge&&!Ge.placeable&&Le.push(Qr(Ge)),typeof d.reason=="string"&&d.reason.length>0&&Le.push(d.reason);let Ie=Wp(Ze,m);Ie&&Le.push(Ie);let ft=Qb(m,d.release_info,f)?.map(dt=>({...dt,...Zl({id:m,root_dir:te},dt.id)}));g.push({...Ke(m),title:d.title||Ot[m]||m,lane:"runnable",draggable:!Ne&&S,queue_placeable:S,...L||{},...Ut?{worker_ineligible:!0}:{},...d.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof d.session_preferred_reason=="string"?d.session_preferred_reason:""}:{},...d.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...ft?{dependency_chips:{released:ft}}:{},...d.dependents_info&&typeof d.dependents_info=="object"?{dependents_info:d.dependents_info}:{},reason:Le.join(" \xB7 "),created_at:d.created_at??void 0,updated_at:d.updated_at??void 0,status:typeof d.status=="string"?d.status:void 0,labels:Array.isArray(d.labels)?d.labels:[],spec_id:typeof d.spec_id=="string"?d.spec_id:"",published:d.published===!0,workflow:$||(Y?{route:Y,chips:{route:Y}}:null),...J?{exec_chips:J}:{},...me?{rec:me}:{},blocked:d.blocked===!0,...Array.isArray(d.blocked_by)?{blocked_by:d.blocked_by.filter(dt=>typeof dt=="string"&&dt.length>0)}:{},place_index:Ft.length,place_lanes:y})}for(let d of je){let m=d&&d.bead_id;if(typeof m!="string"||Ct.has(m)||(Ct.add(m),i!==void 0&&typeof d.added_at=="number"&&d.added_at<i))continue;let $=Fb(Be,m),Y=$&&typeof $.done_kind=="string"?$.done_kind:null,J=ty($);re.push({...Ke(m),lane:"done",done:!0,workflow:U[m]||null,...J?{exec_chips:J}:{},done_layout:"three_line",usage:pr(Be,m,tt),work_ms:kp(Be,m),done_at:typeof d.added_at=="number"?d.added_at:void 0,done_kind:Y,...Lt(m),badges:[...Y&&Fp[Y]?[Fp[Y]]:[],...yp(Be,m)]})}for(let d of Array.isArray(x.session_done)?x.session_done:[]){let m=d&&(d.id||d.bead_id);typeof m!="string"||Ct.has(m)||(Ct.add(m),re.push({...Ke(m),...d,id:m,root_dir:te,workspace_name:Me,expected_revision:Pe,lane:"done",done:!0}))}}if(R.size>0)for(let x of[...g,...Q,...T,...w,...re]){let te=R.get(`${x.root_dir}\0${x.id}`);if(!te)continue;typeof te.priority=="number"&&(x.priority=te.priority),typeof te.from_id=="string"&&te.from_id.length>0&&(x.from_id=te.from_id),x.lane==="done"&&Array.isArray(te.carried_to)&&te.carried_to.length>0&&(x.carried_to=te.carried_to);let Me=Ye(x.workflow),Ee=Ye(Me.chips);if(!Ee.route&&!Me.route&&typeof te.route=="string"&&te.route.length>0&&(x.workflow={...Me,route:te.route,chips:{...Ee,route:te.route}}),!Object.hasOwn(te,"metadata"))continue;let Pe=Ye(te.metadata);if(x.rec=gs(Pe),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let Be=Kp(Ye(_.get(x.root_dir)),Pe,typeof te.route=="string"&&te.route.length>0?te.route:Ye(x.workflow).route);Be&&(x.exec_chips=Be)}}let se=new Map;o.forEach((x,te)=>{x&&typeof x.root_dir=="string"&&se.set(x.root_dir,te)});let ie=n&&n.running_sort==="repo"?"repo":"started";T.sort((x,te)=>{let Me=x.kind==="session",Ee=te.kind==="session";if(Me!==Ee)return Me?1:-1;if(Me&&Ee){let tt=ca(te.updated_at)-ca(x.updated_at);return tt!==0?tt:x.id.localeCompare(te.id)}if(ie==="repo"){let tt=se.get(x.root_dir)??Number.MAX_SAFE_INTEGER,Ot=se.get(te.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==Ot)return tt-Ot}let Pe=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Be=typeof te.started_at=="number"&&Number.isFinite(te.started_at)?te.started_at:null;return Pe!==null&&Be!==null&&Pe!==Be?Pe-Be:Pe===null&&Be!==null?1:Pe!==null&&Be===null?-1:x.id.localeCompare(te.id)}),re.sort((x,te)=>(te.done_at??0)-(x.done_at??0));let ye=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),ke=new Set(g.map(x=>x.root_dir)),Xe=new Map;for(let x of T)x.kind==="session"||x.run_state!=="running"||Xe.set(x.root_dir,(Xe.get(x.root_dir)||0)+1);let X=new Map;for(let x of re){let te=X.get(x.root_dir);te?te.push(x):X.set(x.root_dir,[x])}let pe={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ce=[];for(let x of ye){if(!x||typeof x.root_dir!="string")continue;let te=q.get(x.root_dir)||[],Me=N.get(x.root_dir)||[],Ee=te.length>0||Me.some(tt=>tt.items.length>0||tt.occupied_by.length>0);if(u!=="all"&&!Ee&&!ke.has(x.root_dir))continue;let Pe=typeof x.slots=="number"&&x.slots>=da?x.slots:da,Be=Xe.get(x.root_dir)||0;ce.push({live_count:Be,over_cap:Be>Pe,merge:K.get(x.root_dir)||pe,token_total:ry(X.get(x.root_dir)||[]),cleanup_failures:D.get(x.root_dir)||[],declared_base:A.get(x.root_dir)??null,repo_operations:C.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:Pe,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:Ye(x.runner_catalog),items:te,sublanes:{parallel:te,serial:Me},serial_lane_count:M.get(x.root_dir)||0,raw_queue_length:F.get(x.root_dir)||0})}let V={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:Q,queue_groups:ce,running:T,pr_wait:w,done:re,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},Ce=ip(V);for(let x of W)Ce.has(x.id)||Ce.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...V.queue,...V.runnable,...V.running,...V.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let te=Ce.get(x.id),Me=be.get(x.root_dir)||{};x.blockers=(x.blocked_by||[]).map(Ee=>{let Pe=Ce.get(Ee)?.workspace_name||ec(Me[Ee]);return{...ap(Ee,te,Ce,o),...Pe?{workspace_name:Pe}:{}}})}for(let x of[...V.queue,...V.runnable,...V.running,...V.pr_wait]){let te=be.get(x.root_dir)||{},Me=(x.blockers||[]).map(tt=>({...Ql(x.id,tt),...Zl(x,tt.id,Ce,te)})),Ee=(H.get(`${x.root_dir}\0${x.id}`)||[]).map(tt=>{let Ot=Ce.get(tt),_e=Ot?.root_dir||te[tt];return{...Mp(x.id,tt,Ot?.workspace_name||ec(_e),_e),...Zl(x,tt,Ce,te)}}),Pe=qp(x.id,dy(ee.get(x.id),x.dependents_info,x,Ce));if(Me.length===0&&Ee.length===0&&Pe.length===0)continue;let Be={...x.dependency_chips||{},...Me.length>0?{predecessors:Me}:{},...Ee.length>0?{released:Ee}:{},...Pe.length>0?{dependents:Pe}:{}};x.dependency_chips=Be}uy(V,ae,le,Ce,o);let he=lp(V.queue_groups);for(let x of V.queue_groups)for(let te of x.sublanes.serial){let Me=he.get(cp(x.root_dir,te.id));Me&&(te.cross_wait_peers=Me)}let De=new Map;for(let x of[...V.queue,...V.running,...V.pr_wait,...V.done,...V.runnable]){let te=ua(x.root_dir,x.id);if(De.has(te))continue;let Me=Ye(x.workflow),Ee=Ye(Me.chips),Pe=R.get(`${x.root_dir}\0${x.id}`),Be=(typeof Ee.route=="string"&&Ee.route.length>0?Ee.route:typeof Me.route=="string"&&Me.route.length>0?Me.route:Pe&&typeof Pe.route=="string"&&Pe.route.length>0?Pe.route:null)||null,tt=typeof Ee.route_source=="string"?Ee.route_source:typeof Me.route_source=="string"?Me.route_source:null;De.set(te,{route:Be,route_source:tt,exec_chips:x.exec_chips||null,added_at:typeof x.added_at=="number"?x.added_at:null})}for(let x of l&&Array.isArray(l.lanes)?l.lanes:[])for(let te of Array.isArray(x?.entries)?x.entries:[]){let Me=te&&typeof te.bead_id=="string"?te.bead_id:"",Ee=te&&typeof te.root_dir=="string"?te.root_dir:"";if(Me.length===0||De.has(ua(Ee,Me)))continue;let Pe=R.get(`${Ee}\0${Me}`);if(!Pe)continue;let Be=typeof Pe.route=="string"&&Pe.route.length>0?Pe.route:null,tt=Object.hasOwn(Pe,"metadata")?Kp(Ye(_.get(Ee)),Ye(Pe.metadata),Be):null;Be===null&&tt===null||De.set(ua(Ee,Me),{route:Be,route_source:null,exec_chips:tt,added_at:null})}V.chain_lanes=ly(l&&Array.isArray(l.lanes)?l.lanes:[],oe,Ce,o,P,b,{armed_by_bead:de,failed_by_bead:Oe,disarmed_lanes:Z},fe,De);let qe=new Map;for(let x of[...V.queue,...V.runnable])qe.has(x.id)||qe.set(x.id,x);let Je=new Set;for(let x of V.chain_lanes)for(let te of x.rows){if(x.status==="confirmed"&&!te.unplaced&&!te.fixed&&Je.add(te.id),!x.draft&&!te.unplaced)continue;let Me=qe.get(te.id);Me&&(Me.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let Ue=new Map(V.chain_lanes.map(x=>[x.lane_id,x]));for(let x of[...V.queue,...V.running]){let te=de.get(x.id);if(typeof te!="string"||te.length===0)continue;let Me=Ue.get(te);x.armed_lane_chip=Me===void 0||Me.status==="draft"?{lane_id:te,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:te,label:`\u25B6 \uC5F0\uACB0 ${Me.number}`,orphan:!1}}let ne=[];for(let x of q.values())for(let te of x)Je.has(te.id)||ne.push(te);ne.sort((x,te)=>{let Me=x.workspace_name.localeCompare(te.workspace_name);return Me!==0?Me:(x.queue_index??0)-(te.queue_index??0)}),V.parallel_rows=ne;let G={};for(let[x,te]of Ce)typeof te.root_dir=="string"&&te.root_dir.length>0&&(G[x]=te.root_dir);for(let x of V.chain_lanes)for(let te of x.rows)!Object.hasOwn(G,te.id)&&te.root_dir.length>0&&b.has(te.root_dir)&&(G[te.id]=te.root_dir);V.owner_of=G;let Re=V.runnable.length;V.runnable_all=V.runnable.slice();let et=V.runnable,pt=x=>s.show_blocked||x.blocked!==!0,Qe=x=>s.readiness==="all"||(s.readiness==="ready"?x.queue_placeable===!0:x.queue_placeable!==!0),mt=no(s.routes),Dt=x=>mt.length===0||mt.includes(ny(x));if(p==="per_control"){let x=[],te=0,Me=0,Ee=0;for(let Pe of et){let Be=pt(Pe),tt=Qe(Pe),Ot=Dt(Pe);if(Be&&tt&&Ot){x.push(Pe);continue}(Be?0:1)+(tt?0:1)+(Ot?0:1)>1||(Be?tt?Ee+=1:Me+=1:te+=1)}et=x,V.runnable_hidden={blocked:te,readiness:Me,route:Ee}}else{et=et.filter(pt);let x=et.length;et=et.filter(Qe);let te=et.length;et=et.filter(Dt),V.runnable_hidden={blocked:Re-x,readiness:x-te,route:te-et.length}}let Et=(x,te)=>{let Me=ca(te.updated_at)-ca(x.updated_at);return Me!==0?Me:x.id.localeCompare(te.id)},ht=a==="repo_spec"?(x,te)=>{let Me=x.queue_placeable===!0?0:1,Ee=te.queue_placeable===!0?0:1;if(Me!==Ee)return Me-Ee;let Pe=x.published===!0?0:1,Be=te.published===!0?0:1;return Pe!==Be?Pe-Be:Et(x,te)}:Et;if(a==="as_given")V.runnable=et,V.runnable_sections=[];else if(a==="updated_flat")V.runnable=et.slice().sort(Et),V.runnable_sections=[];else{let x=new Map;for(let Ee of et){let Pe=x.get(Ee.root_dir);Pe?Pe.push(Ee):x.set(Ee.root_dir,[Ee])}let te=[],Me=[];for(let Ee of ye){if(!Ee||typeof Ee.root_dir!="string")continue;let Pe=(x.get(Ee.root_dir)||[]).slice().sort(ht);x.delete(Ee.root_dir),Pe.length!==0&&(te.push({root_dir:Ee.root_dir,name:Ee.name||Ee.root_dir,items:Pe.map(Be=>({...Be,workspace_name:""}))}),Me.push(...Pe))}for(let[Ee,Pe]of x){let Be=Pe.slice().sort(ht);te.push({root_dir:Ee,name:Be[0]?.workspace_name||Ee,items:Be.map(tt=>({...tt,workspace_name:""}))}),Me.push(...Be)}V.runnable=Me,V.runnable_sections=te}let Zt=py(n?n.search:void 0);return Zt&&fy(V,Zt),V}var fa=["impl_review_model","impl_review_effort","impl_review_speed"],_y=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function oo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function mr(e){return typeof e=="string"&&e.length>0?e:null}function sc(e){let t=oo(e)&&oo(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:mr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function Jp(e,t,n=20){let r=String(t||"").trim().toLowerCase(),o=[],i=new Set;for(let s of Array.isArray(e)?e:[]){let l=mr(oo(s)?s.id:null);if(l===null||i.has(l))continue;let a=mr(s.title)??"";if(r.length>0&&!l.toLowerCase().includes(r)&&!a.toLowerCase().includes(r))continue;i.add(l);let u=sc(s);if(o.push({id:l,title:a,eligible:u.eligible,reason:u.reason}),o.length>=n)break}return o.sort((s,l)=>s.eligible===l.eligible?0:s.eligible?-1:1)}function ic(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function _a(e){for(let t of Array.isArray(e)?e:[]){let n=oo(t)&&oo(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},o=!0;for(let i of fa){let s=mr(n[i]);if(s===null){o=!1;break}r[i]=s}if(o)return r}return{..._y}}function ef(e){return mr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||ic(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?fa.every(t=>mr(e.reviewer?.[t])!==null):!0}var oc=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function tf(e){if(typeof e=="string")return oc[e]??e;if(!oo(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=mr(e.code)??mr(e.error)??"",n=mr(e.message)??"",r=oc[t]??(n.length>0?n:t),o=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&oc[t]&&o.push(`(${n})`);let i=oo(e.details)?e.details:{},s=Array.isArray(i.aborted)?i.aborted.filter(l=>typeof l=="string"&&l.length>0):[];return s.length>0&&o.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${s.join(", ")}`),o.join(" ")}function ac(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Or(e){return typeof e=="string"&&e.length>0?e:null}var my=new Set(["failed","orphaned"]);function nf(e){if(!ac(e))return null;let t=Pn(e.cell_count),n=Pn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function jo(e){let t=e.map(i=>Pn(i)).filter(i=>i!==null).sort((i,s)=>i-s),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function gy(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function hy(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=ac(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function rf(e,t){if(!ac(e))return[];let n=new Map;for(let s of Array.isArray(t)?t:[]){let l=Or(s?.attempt_id);l!==null&&n.set(l,s)}let r=Array.isArray(e.cells)?e.cells:[],o=Array.isArray(e.presets)?e.presets:[],i=[];for(let s of o){let l=Or(s?.id);if(l===null)continue;let u=r.filter(_=>_?.preset_id===l).sort((_,b)=>(Pn(_?.k)??0)-(Pn(b?.k)??0)).map(_=>{let b=Or(_.attempt_id),g=b===null?null:n.get(b)??null,T=hy(_,g);return{...g??{},bead_id:Or(_.bead_id)??"",attempt_id:b,cell_k:Pn(_.k),status:Or(g?.status)??Or(_.status),failed:g?.failed===!0||my.has(String(_.status??"")),verify:T,workspace_name:_.k===null?"":`#${_.k}`}}),p=u.filter(_=>_.verify==="pass"||_.verify==="fail"),f=p.filter(_=>_.verify==="pass"&&_.status==="done");i.push({key:`${Or(e.run_id)??""}:${l}`,name:Or(s?.name)??l,n:u.length,success_rate:p.length===0?null:f.length/p.length,success_sample:p.length,unknown_count:u.length-p.length,pass_caret:gy(u.map(_=>_.verify)),failed_count:u.filter(_=>_.failed===!0).length,retry_count:u.filter(_=>_.is_retry===!0).length,duration_ms:jo(u.map(_=>Pn(_.duration_ms))),tokens:jo(u.map(_=>Pn(_.usage?.tokens))),cost_usd:jo(u.map(_=>Pn(_.usage?.total_cost_usd))),blocking:jo(u.map(_=>Pn(_.review?.blocking))),minor:jo(u.map(_=>Pn(_.review?.minor))),round:jo(u.map(_=>Pn(_.review?.round))),rows:u})}return i}var dn="\u2014";function rr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function ma(e){let t=rr(e);if(t===null||t<0)return dn;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function ga(e){let t=rr(e);return t===null||t<=0?dn:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function of(e){return!e||rr(e.total_cost_usd)===null?dn:Ei({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??dn}function lc(e){let t=rr(e);return t===null?dn:`$${t.toFixed(2)}`}function sf(e){let t=rr(e?.sample)??0,n=rr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function cc(e){let t=rr(e);return t===null?dn:`${Math.round(t*100)}%`}function af(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function lf(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?dn:t.join(" \xB7 ")}function cf(e){if(!e)return dn;let t=rr(e.blocking),n=rr(e.minor),r=rr(e.round);if(t===null&&n===null&&r===null)return dn;let o=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[o,i].filter(s=>s!==null).join(" \xB7 ")}var by="30d";function uf(e,t={}){let n=Ht("views:compare"),r=t.transport,o=t.gotoIssue,i=t.execPresetStore,s=t.sourceCandidates,l={range:by,root_dir:"",issue_type:"",route:"",include_bench:!1},a={rows:[],groups:[],workspaces:[]},u=new Set,p=!1,f=null,_=!1,b=0,g={runs:[],selected:null,rows:[]},T=new Set,w={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:_a([]),error:null,submitting:!1};async function Q(){if(!r)return;let P=b+=1;p=!0,f=null,ae();try{let se=await r("get-compare",{range:l.range,root_dirs:l.root_dir?[l.root_dir]:[],issue_types:l.issue_type?[l.issue_type]:[],routes:l.route?[l.route]:[],include_bench:l.include_bench});if(P!==b)return;let ie=se&&se.payload?se.payload:se;a={rows:Array.isArray(ie?.rows)?ie.rows:[],groups:Array.isArray(ie?.groups)?ie.groups:[],workspaces:Array.isArray(ie?.workspaces)?ie.workspaces:a.workspaces},g.runs=Array.isArray(ie?.runs)?ie.runs:[],g.rows=Array.isArray(ie?.bench_rows)?ie.bench_rows:[],g.selected!==null&&!g.runs.some(ye=>ye.run_id===g.selected)&&(g.selected=null),w.open||(w.reviewer=_a(g.runs)),_=!0}catch(se){if(P!==b)return;n("get-compare failed: %o",se),f=se instanceof Error?se.message:String(se)}finally{P===b&&(p=!1,ae())}}function re(P){g.selected=g.selected===P?null:P,ae()}function W(){let P=N(w.source_id);return ef({source_id:w.source_id,source_eligible:P===null?!1:sc(P).eligible,preset_ids:w.preset_ids,repeats:w.repeats,reviewer_mode:w.reviewer_mode,reviewer:w.reviewer})}async function q(){if(!(!r||w.submitting||!W())){w.submitting=!0,w.error=null,ae();try{let P=await r("bench-run-create",{source_id:w.source_id,preset_ids:[...w.preset_ids],repeats:w.repeats,reviewer_mode:w.reviewer_mode,...w.reviewer_mode==="fixed"?{reviewer:w.reviewer}:{}}),se=P&&P.payload?P.payload:P,ie=se&&se.run&&typeof se.run.run_id=="string"?se.run.run_id:null;w.open=!1,w.error=null,await Q(),ie!==null&&g.selected!==ie&&re(ie)}catch(P){n("bench-run-create failed: %o",P),w.error=tf(P)}finally{w.submitting=!1,ae()}}}function N(P){if(!s||P.length===0)return null;for(let se of s())if(se&&se.id===P)return se;return null}function M(P,se){l[P]=se,Q()}function F(P){u.has(P)?u.delete(P):u.add(P),ae()}function K(P,se,ie,ye){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${P}</span>
        <select
          class="cmp-filter__select"
          .value=${se}
          @change=${ke=>ye(ke.target.value)}
        >
          ${ie.map(ke=>c`<option
                value=${ke.value}
                ?selected=${ke.value===se}
              >
                ${ke.label}
              </option>`)}
        </select>
      </label>
    `}function D(){let P=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...a.workspaces.map(se=>({value:se.root_dir,label:se.name}))];return c`
      <div class="cmp-filters">
        ${K("\uAE30\uAC04",l.range,ui.map(se=>({value:se.value,label:se.label})),se=>M("range",se))}
        ${K("\uC800\uC7A5\uC18C",l.root_dir,P,se=>M("root_dir",se))}
        ${K("\uC720\uD615",l.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...Ai.map(se=>({value:se,label:se}))],se=>M("issue_type",se))}
        ${K("route",l.route,[{value:"",label:"\uC804\uCCB4 route"},...ro.filter(se=>se.value!=="unset").map(se=>({value:se.value,label:se.label}))],se=>M("route",se))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${l.include_bench}
            @change=${se=>{l.include_bench=se.target.checked,Q()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${p}
          @click=${()=>{Q()}}
        >
          새로고침
        </button>
      </div>
    `}function A(P){let se=cc(P.success_rate),ie=typeof P.unknown_count=="number"&&P.unknown_count>0?c`<span class="cmp-note">미상 ${P.unknown_count}</span>`:null,ye=P.pass_caret?c`<span class="cmp-note"
          >pass^${P.pass_caret.k}
          ${cc(P.pass_caret.value)}</span
        >`:null,ke=typeof P.success_sample=="number"&&P.success_sample!==P.n?c`<span class="cmp-note"
            >n=${P.success_sample}/${P.n}</span
          >`:null;return c`${se} ${ke} ${ye} ${ie}`}function C(P,se){let ie=sf(P);return c`${se(P?.median)}
    ${ie?c`<span class="cmp-note">${ie}</span>`:null}`}function R(P){let se=$o(P.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>o&&o(P.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${P.bead_id}</span>
          <span class="cmp-issue-title">${P.title||""}</span>
          <span class="cmp-note">${P.workspace_name}</span>
        </td>
        <td class="cmp-cell">${ma(P.duration_ms)}</td>
        <td class="cmp-cell">${lf(P)}</td>
        <td class="cmp-cell">${af(P.verify)}</td>
        <td class="cmp-cell">${cf(P.review)}</td>
        <td class="cmp-cell">${ga(P.usage?.tokens)}</td>
        <td class="cmp-cell" title=${se}>${of(P.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${P.finished_at?rn(P.finished_at):dn}
        </td>
      </tr>
    `}function oe(P){let se=u.has(P.key),ie=new Set(P.attempt_ids||[]),ye=se?a.rows.filter(ke=>ie.has(ke.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${se?"is-open":""}"
        @click=${()=>F(P.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${se?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${P.name}</span>
          <span class="cmp-note">${P.n}건</span>
        </td>
        <td class="cmp-cell">
          ${C(P.duration_ms,ma)}
        </td>
        <td class="cmp-cell">
          실패 ${P.failed_count} · 재시도 ${P.retry_count}
        </td>
        <td class="cmp-cell">${A(P)}</td>
        <td class="cmp-cell">
          ${C(P.blocking,ke=>typeof ke=="number"?`b${ke}`:dn)}
          ${C(P.minor,ke=>typeof ke=="number"?`m${ke}`:dn)}
          ${C(P.round,ke=>typeof ke=="number"?`r${ke}`:dn)}
        </td>
        <td class="cmp-cell">${C(P.tokens,ga)}</td>
        <td class="cmp-cell">
          ${C(P.cost_usd,lc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${ye.map(ke=>R(ke))}
    `}function fe(P){let se=g.selected===P.run_id,ie=N(String(P.source_bead_id||"")),ye=ie&&typeof ie.title=="string"&&ie.title.length>0?ie.title:String(P.source_bead_id||""),ke=nf(P),Xe=Array.isArray(P.presets)?P.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${se?"is-selected":""}"
        data-run-id=${P.run_id}
        @click=${()=>re(String(P.run_id))}
      >
        <span class="cmp-run__title">${ye}</span>
        <span class="cmp-note">프리셋 ${Xe}</span>
        <span class="cmp-note">반복 ${P.repeats??dn}</span>
        <span class="cmp-note"
          >${typeof P.created_at=="number"?rn(P.created_at):dn}</span
        >
        <span class="cmp-run__progress"
          >${ke===null?dn:ke.text}</span
        >
      </button>
    `}function be(P){let se=T.has(P.key);return c`
      <tr
        class="cmp-row cmp-row--group ${se?"is-open":""}"
        @click=${()=>{T.has(P.key)?T.delete(P.key):T.add(P.key),ae()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${se?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${P.name}</span>
          <span class="cmp-note">${P.n}건</span>
        </td>
        <td class="cmp-cell">
          ${C(P.duration_ms,ma)}
        </td>
        <td class="cmp-cell">
          실패 ${P.failed_count} · 재시도 ${P.retry_count}
        </td>
        <td class="cmp-cell">${A(P)}</td>
        <td class="cmp-cell">
          ${C(P.blocking,ie=>typeof ie=="number"?`b${ie}`:dn)}
          ${C(P.minor,ie=>typeof ie=="number"?`m${ie}`:dn)}
          ${C(P.round,ie=>typeof ie=="number"?`r${ie}`:dn)}
        </td>
        <td class="cmp-cell">${C(P.tokens,ga)}</td>
        <td class="cmp-cell">
          ${C(P.cost_usd,lc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${se?(P.rows||[]).map(ie=>R(ie)):null}
    `}function H(P){let se=rf(P,g.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${P.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(P.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${se.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
              <thead>
                <tr>
                  <th scope="col">프리셋</th>
                  <th scope="col">시간</th>
                  <th scope="col">실패 · 재시도</th>
                  <th scope="col">검증</th>
                  <th scope="col">리뷰 지적 · 라운드</th>
                  <th scope="col">토큰</th>
                  <th scope="col">가격</th>
                  <th scope="col">종료</th>
                </tr>
              </thead>
              <tbody>
                ${se.map(ie=>be(ie))}
              </tbody>
            </table>`}
      </div>
    `}function ee(){let P=i?i.get():null,se=Array.isArray(P?.presets)?P.presets:[],ie=Jp(s?s():[],w.query);return c`
      <form
        class="cmp-form"
        @submit=${ye=>{ye.preventDefault(),q()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${w.query}
            @input=${ye=>{w.query=String(ye.target.value||""),ae()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${ie.length===0?c`<div class="cmp-empty">후보 없음</div>`:ie.map(ye=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${w.source_id===ye.id?"is-selected":""}"
                    data-source-id=${ye.id}
                    ?disabled=${!ye.eligible}
                    title=${ye.reason}
                    @click=${()=>{w.source_id=ye.id,ae()}}
                  >
                    <span class="cmp-candidate__id">${ye.id}</span>
                    <span class="cmp-candidate__title">${ye.title}</span>
                    ${ye.eligible?null:c`<span class="cmp-candidate__reason"
                          >${ye.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${se.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:se.map(ye=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${ye.id}
                        .checked=${w.preset_ids.includes(ye.id)}
                        @change=${ke=>{let Xe=ke.target.checked;w.preset_ids=Xe?[...w.preset_ids,ye.id]:w.preset_ids.filter(X=>X!==ye.id),ae()}}
                      />
                      <span>${ye.name}</span>
                    </label>
                  `)}
          </div>
        </div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">반복</span>
          <input
            type="number"
            class="cmp-form__input cmp-form__input--repeats"
            min="1"
            max="5"
            .value=${String(w.repeats)}
            @change=${ye=>{let ke=ye.target;w.repeats=ic(ke.value),ke.value=String(w.repeats),ae()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(ye=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${ye.value}
                    .checked=${w.reviewer_mode===ye.value}
                    @change=${()=>{w.reviewer_mode=ye.value,ae()}}
                  />
                  <span>${ye.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${w.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${fa.map(ye=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${ye}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${ye}
                      .value=${w.reviewer[ye]||""}
                      @input=${ke=>{w.reviewer={...w.reviewer,[ye]:String(ke.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${w.error!==null?c`<div class="cmp-error" role="alert">${w.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${w.submitting||!W()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{w.open=!1,w.error=null,ae()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function de(){let P=g.selected===null?null:g.runs.find(se=>se.run_id===g.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{w.open=!w.open,w.open&&(w.error=null,w.reviewer=_a(g.runs)),ae()}}
          >
            새 실험
          </button>
        </div>
        ${w.open?ee():null}
        ${g.runs.length===0?c`<div class="cmp-empty">
              ${p?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${g.runs.map(se=>fe(se))}
            </div>`}
        ${P===null?null:H(P)}
      </section>
    `}function Oe(){return f!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${f}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{Q()}}
          >
            새로고침
          </button>
        </div>
      `:_?a.groups.length===0?c`<div class="cmp-empty">
        해당 조건의 실행 기록이 없습니다
      </div>`:c`
      <table class="cmp-table">
        <thead>
          <tr>
            <th scope="col">프리셋 · 서명</th>
            <th scope="col">시간</th>
            <th scope="col">실패 · 재시도</th>
            <th scope="col">검증</th>
            <th scope="col">리뷰 지적 · 라운드</th>
            <th scope="col">토큰</th>
            <th scope="col">가격</th>
            <th scope="col">종료</th>
          </tr>
        </thead>
        <tbody>
          ${a.groups.map(P=>oe(P))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${p?"\uC77D\uB294 \uC911\u2026":""}</div>`}function Z(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${D()}
        </header>
        ${de()} ${Oe()}
      </div>
    `}function ae(){lt(Z(),e)}let le=null;return i&&i.subscribe&&(le=i.subscribe(()=>{w.open&&ae()})),ae(),{load(){p||Q()},pause(){b+=1,p=!1},refresh(){return Q()},destroy(){le&&(le(),le=null),lt(c``,e)}}}function yy(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ln(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ln(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let p=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>p("prior_session")),o.addEventListener("click",()=>p("fresh_current")),i.addEventListener("click",()=>p(null)),n.addEventListener("cancel",f=>{f.preventDefault(),p(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Ir(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await yy(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function df(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(p=>typeof p=="string"&&p!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let p=t.createElement("p");p.className="resume-instructions-dialog__target",p.textContent=u,r.append(p)}return r.append(i,s),t.body.append(r),new Promise(p=>{let f=!1,_=g=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),p(g))},b=()=>_(i.value.trim());l.addEventListener("click",b),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),b())}),r.addEventListener("cancel",g=>{g.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function Fo(e){let{context:t,transport:n,adopt:r}=e,o=await df(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await Ir(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30";ve(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function uc(e){return`session:${e.provider}:${e.session_id}`}function Cs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function vy(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Bo(e,t,n,r){return{attempt_id:uc(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Cs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:vy(e,n)}}}function pf(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let p of r.get(u))if(!o.has(p))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let p of r.get(a)){let f=Number(n.get(a))<Number(n.get(p)),_=Number(l.get(a))>Number(l.get(p));f&&_&&(u===null||Number(l.get(p))>Number(l.get(u)))&&(u=p)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var ky="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ha="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",wy="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",$y="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Uo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Os(e,t){return`${e}\0${t}`}function xy(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Ay(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ds(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=xy(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,_]of o)for(let b of _)i.push({blocker:b,blockee:f});let s=Ay(e,t),l=new Map(r.map((f,_)=>[f,_])),a=r.slice(0,s).filter(f=>o.get(f).some(_=>Number(l.get(_))>Number(l.get(f)))),u=pf(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let p=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>p.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function _f(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ds(n,t)}function Sy(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ey(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ty(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function dc(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Ry(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Os(s,a));let r=new Map,o=new Map;for(let s of e){let l=Os(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Os(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Cy(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Oy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ff(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function pc(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ps(e){let t=Ty(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let p=e.owner_of.get(u);return typeof p!="string"||p.length===0?(o.refusal=Ey(u),null):p};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,p,f)=>{if(o.refusal!==null||u===p)return;let _=t.get(u)||[];if(_.includes(p))return;let b=i(u);if(b!==null){if(dc(t,p,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${p}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,p]),f!==void 0&&r.add(Os(u,p)),n.push({type:"dep-add",a:u,b:p,root_dir:b,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,p)=>{if(o.refusal!==null||u===p)return;let f=t.get(u)||[];if(!f.includes(p))return;let _=i(u);_!==null&&(t.set(u,f.filter(b=>b!==p)),n.push({type:"dep-remove",a:u,b:p,root_dir:_}))},laneCreated:(u,p)=>r.has(Os(u,p))}}function Ns(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Ry(e.dep_ops,t.blocked_by_map),s=i.filter(p=>p.type==="dep-remove"),l=i.filter(p=>p.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Sy(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function mf(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Is(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function gf(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function Ls(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ba(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ya(e,t,n){let r=Ps(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,p=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ky};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:wy};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pc(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Uo}}if(e.kind==="chain"&&p===void 0)return{refused:Uo};let f=()=>{if(p===void 0||p.status!=="confirmed")return;let g=p.entries.findIndex(W=>W.bead_id===e.bead_id);if(g<0)return;let T=g>0?p.entries[g-1]:null,w=g+1<p.entries.length?p.entries[g+1]:null,Q=Is(p,g),re=w!==null&&Is(p,g+1);Q&&T!==null&&r.removeDep(e.bead_id,T.bead_id),re&&w!==null&&r.removeDep(w.bead_id,e.bead_id),(Q||re)&&T!==null&&w!==null&&r.addDep(w.bead_id,T.bead_id,u)},_=(g,T)=>{let w=n.cross_lanes.get(g),Q=w.entries.findIndex(A=>A.bead_id===e.bead_id),re=w.entries.filter(A=>A.bead_id!==e.bead_id),W=Math.max(0,Math.min(re.length,Q>=0&&T>Q?T-1:T)),q=-1;if(re.forEach((A,C)=>{n.fixed_members.has(A.bead_id)&&(q=C)}),W<=q){r.state.refusal=$y;return}let N=Q>=0?w.entries[Q]:p?.entries.find(A=>A.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Ds({status:w.status,entries:[...re.slice(0,W),N,...re.slice(W)]},n);let M=l.entries;if(ba(M,w.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:g,entries:Ls(M)}}),w.status!=="confirmed")return;let F=M.findIndex(A=>A.bead_id===e.bead_id),K=F>0?M[F-1].bead_id:null,D=F+1<M.length?M[F+1].bead_id:null;if(K===null){D!==null&&r.addDep(D,e.bead_id,g);return}if(r.addDep(e.bead_id,K,g),D!==null&&(r.graph.get(D)||[]).includes(K)){let A=w.entries.findIndex(C=>C.bead_id===D);(r.laneCreated(D,K)||A>0&&w.entries[A-1].bead_id===K&&Is(w,A))&&r.removeDep(D,K),r.addDep(D,e.bead_id,g)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),p!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let g=p.entries.filter(w=>w.bead_id!==e.bead_id),T=p.status==="confirmed"&&g.length<2?p.entries:p.entries.filter(w=>w.bead_id===e.bead_id);s.push(...gf(n,p,u,T)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ls(g)}})}if(t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let g=Cy(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(ff(e.bead_id,e.root_dir,g));else if(e.kind==="parallel"){let T=n.parallel_rows,w=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!w&&w.bead_id===e.bead_id)&&Oy(n,e.root_dir)&&b!==void 0){let re=b>g?g:g-1;re>=0&&re!==b&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:re},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let g=b>t.index?t.index:t.index-1;g>=0&&g!==b&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:g},root_dir:e.root_dir})}}else i.push(ff(e.bead_id,e.root_dir,t.index,t.lane_id));return Ns(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function hf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ds(n,t);if(r.held)return{refused:ha};let o=r.entries,i=Ps(t),s=[];mf(i,o,e);let l=ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ns(i,t,l,s,{lane_id:e,correction:r})}function bf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ds(n,t),o=r.entries,i=Ps(t),s=[];mf(i,o,e);let l=ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}];return Ns(i,t,l,s,{lane_id:e,correction:r})}function yf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ds(n,t),o=r.entries;return Ns(Ps(t),t,ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}],[],{lane_id:e,correction:r})}function vf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ps(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Is(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ns(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:gf(t,n,e,n.entries)})}function kf(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;Is(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${pc(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function wf(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function $f(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function fc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pc(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Iy="\uC0AC\uC774\uD074";function Ly(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function _c(e,t,n){let r=Cr(e,t),o=[],i=new Set,s=(a,u)=>{for(let p of a)i.has(p.id)||(i.add(p.id),o.push({bead_id:p.id,root_dir:p.root_dir,workspace_name:p.workspace_name,title:p.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Ly(e)}}function xf(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=dc(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Iy}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Af(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Dy=/^\S+-\S+$/;function Sf(e){return Dy.test(e.trim())}var{entries:Pf,setPrototypeOf:Ef,isFrozen:Py,getPrototypeOf:Ny,getOwnPropertyDescriptor:My}=Object,{freeze:An,seal:Nn,create:kc}=Object,{apply:wc,construct:$c}=typeof Reflect<"u"&&Reflect;An||(An=function(t){return t});Nn||(Nn=function(t){return t});wc||(wc=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});$c||($c=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var va=Sn(Array.prototype.forEach),qy=Sn(Array.prototype.lastIndexOf),Tf=Sn(Array.prototype.pop),Ms=Sn(Array.prototype.push),jy=Sn(Array.prototype.splice),wa=Sn(String.prototype.toLowerCase),mc=Sn(String.prototype.toString),gc=Sn(String.prototype.match),qs=Sn(String.prototype.replace),Fy=Sn(String.prototype.indexOf),By=Sn(String.prototype.trim),Wn=Sn(Object.prototype.hasOwnProperty),xn=Sn(RegExp.prototype.test),js=Uy(TypeError);function Sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return wc(e,t,r)}}function Uy(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return $c(e,n)}}function It(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wa;Ef&&Ef(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Py(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Wy(e){for(let t=0;t<e.length;t++)Wn(e,t)||(e[t]=null);return e}function gr(e){let t=kc(null);for(let[n,r]of Pf(e))Wn(e,n)&&(Array.isArray(r)?t[n]=Wy(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=gr(r):t[n]=r);return t}function Fs(e,t){for(;e!==null;){let r=My(e,t);if(r){if(r.get)return Sn(r.get);if(typeof r.value=="function")return Sn(r.value)}e=Ny(e)}function n(){return null}return n}var Rf=An(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hc=An(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bc=An(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hy=An(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yc=An(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zy=An(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Cf=An(["#text"]),Of=An(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vc=An(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),If=An(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ka=An(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ky=Nn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Gy=Nn(/<%[\w\W]*|[\w\W]*%>/gm),Vy=Nn(/\$\{[\w\W]*/gm),Yy=Nn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xy=Nn(/^aria-[\-\w]+$/),Nf=Nn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qy=Nn(/^(?:\w+script|data):/i),Zy=Nn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Mf=Nn(/^html$/i),Jy=Nn(/^[a-z][.\w]*(-[.\w]+)+$/i),Lf=Object.freeze({__proto__:null,ARIA_ATTR:Xy,ATTR_WHITESPACE:Zy,CUSTOM_ELEMENT:Jy,DATA_ATTR:Yy,DOCTYPE_NAME:Mf,ERB_EXPR:Gy,IS_ALLOWED_URI:Nf,IS_SCRIPT_OR_DATA:Qy,MUSTACHE_EXPR:Ky,TMPLIT_EXPR:Vy}),Bs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ev=function(){return typeof window>"u"?null:window},tv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Df=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ev(),t=He=>qf(He);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Bs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:b}=e,g=a.prototype,T=Fs(g,"cloneNode"),w=Fs(g,"remove"),Q=Fs(g,"nextSibling"),re=Fs(g,"childNodes"),W=Fs(g,"parentNode");if(typeof s=="function"){let He=n.createElement("template");He.content&&He.content.ownerDocument&&(n=He.content.ownerDocument)}let q,N="",{implementation:M,createNodeIterator:F,createDocumentFragment:K,getElementsByTagName:D}=n,{importNode:A}=r,C=Df();t.isSupported=typeof Pf=="function"&&typeof W=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:R,ERB_EXPR:oe,TMPLIT_EXPR:fe,DATA_ATTR:be,ARIA_ATTR:H,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:de,CUSTOM_ELEMENT:Oe}=Lf,{IS_ALLOWED_URI:Z}=Lf,ae=null,le=It({},[...Rf,...hc,...bc,...yc,...Cf]),P=null,se=It({},[...Of,...vc,...If,...ka]),ie=Object.seal(kc(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ye=null,ke=null,Xe=Object.seal(kc(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),X=!0,pe=!0,ce=!1,V=!0,Ce=!1,he=!0,De=!1,qe=!1,Je=!1,Ue=!1,ne=!1,G=!1,Re=!0,et=!1,pt="user-content-",Qe=!0,mt=!1,Dt={},Et=null,ot=It({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,Zt=It({},["audio","video","img","source","image","track"]),x=null,te=It({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Me="http://www.w3.org/1998/Math/MathML",Ee="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",Be=Pe,tt=!1,Ot=null,_e=It({},[Me,Ee,Pe],mc),Ae=It({},["mi","mo","mn","ms","mtext"]),Ze=It({},["annotation-xml"]),bt=It({},["title","style","font","a","script"]),it=null,ct=["application/xhtml+xml","text/html"],vt="text/html",rt=null,We=null,E=n.createElement("form"),U=function(I){return I instanceof RegExp||I instanceof Function},z=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(We&&We===I)){if((!I||typeof I!="object")&&(I={}),I=gr(I),it=ct.indexOf(I.PARSER_MEDIA_TYPE)===-1?vt:I.PARSER_MEDIA_TYPE,rt=it==="application/xhtml+xml"?mc:wa,ae=Wn(I,"ALLOWED_TAGS")?It({},I.ALLOWED_TAGS,rt):le,P=Wn(I,"ALLOWED_ATTR")?It({},I.ALLOWED_ATTR,rt):se,Ot=Wn(I,"ALLOWED_NAMESPACES")?It({},I.ALLOWED_NAMESPACES,mc):_e,x=Wn(I,"ADD_URI_SAFE_ATTR")?It(gr(te),I.ADD_URI_SAFE_ATTR,rt):te,ht=Wn(I,"ADD_DATA_URI_TAGS")?It(gr(Zt),I.ADD_DATA_URI_TAGS,rt):Zt,Et=Wn(I,"FORBID_CONTENTS")?It({},I.FORBID_CONTENTS,rt):ot,ye=Wn(I,"FORBID_TAGS")?It({},I.FORBID_TAGS,rt):gr({}),ke=Wn(I,"FORBID_ATTR")?It({},I.FORBID_ATTR,rt):gr({}),Dt=Wn(I,"USE_PROFILES")?I.USE_PROFILES:!1,X=I.ALLOW_ARIA_ATTR!==!1,pe=I.ALLOW_DATA_ATTR!==!1,ce=I.ALLOW_UNKNOWN_PROTOCOLS||!1,V=I.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=I.SAFE_FOR_TEMPLATES||!1,he=I.SAFE_FOR_XML!==!1,De=I.WHOLE_DOCUMENT||!1,Ue=I.RETURN_DOM||!1,ne=I.RETURN_DOM_FRAGMENT||!1,G=I.RETURN_TRUSTED_TYPE||!1,Je=I.FORCE_BODY||!1,Re=I.SANITIZE_DOM!==!1,et=I.SANITIZE_NAMED_PROPS||!1,Qe=I.KEEP_CONTENT!==!1,mt=I.IN_PLACE||!1,Z=I.ALLOWED_URI_REGEXP||Nf,Be=I.NAMESPACE||Pe,Ae=I.MATHML_TEXT_INTEGRATION_POINTS||Ae,Ze=I.HTML_INTEGRATION_POINTS||Ze,ie=I.CUSTOM_ELEMENT_HANDLING||{},I.CUSTOM_ELEMENT_HANDLING&&U(I.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=I.CUSTOM_ELEMENT_HANDLING.tagNameCheck),I.CUSTOM_ELEMENT_HANDLING&&U(I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),I.CUSTOM_ELEMENT_HANDLING&&typeof I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(pe=!1),ne&&(Ue=!0),Dt&&(ae=It({},Cf),P=[],Dt.html===!0&&(It(ae,Rf),It(P,Of)),Dt.svg===!0&&(It(ae,hc),It(P,vc),It(P,ka)),Dt.svgFilters===!0&&(It(ae,bc),It(P,vc),It(P,ka)),Dt.mathMl===!0&&(It(ae,yc),It(P,If),It(P,ka))),I.ADD_TAGS&&(typeof I.ADD_TAGS=="function"?Xe.tagCheck=I.ADD_TAGS:(ae===le&&(ae=gr(ae)),It(ae,I.ADD_TAGS,rt))),I.ADD_ATTR&&(typeof I.ADD_ATTR=="function"?Xe.attributeCheck=I.ADD_ATTR:(P===se&&(P=gr(P)),It(P,I.ADD_ATTR,rt))),I.ADD_URI_SAFE_ATTR&&It(x,I.ADD_URI_SAFE_ATTR,rt),I.FORBID_CONTENTS&&(Et===ot&&(Et=gr(Et)),It(Et,I.FORBID_CONTENTS,rt)),Qe&&(ae["#text"]=!0),De&&It(ae,["html","head","body"]),ae.table&&(It(ae,["tbody"]),delete ye.tbody),I.TRUSTED_TYPES_POLICY){if(typeof I.TRUSTED_TYPES_POLICY.createHTML!="function")throw js('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof I.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw js('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=I.TRUSTED_TYPES_POLICY,N=q.createHTML("")}else q===void 0&&(q=tv(b,o)),q!==null&&typeof N=="string"&&(N=q.createHTML(""));An&&An(I),We=I}},we=It({},[...hc,...bc,...Hy]),Te=It({},[...yc,...zy]),$t=function(I){let $e=W(I);(!$e||!$e.tagName)&&($e={namespaceURI:Be,tagName:"template"});let je=wa(I.tagName),At=wa($e.tagName);return Ot[I.namespaceURI]?I.namespaceURI===Ee?$e.namespaceURI===Pe?je==="svg":$e.namespaceURI===Me?je==="svg"&&(At==="annotation-xml"||Ae[At]):!!we[je]:I.namespaceURI===Me?$e.namespaceURI===Pe?je==="math":$e.namespaceURI===Ee?je==="math"&&Ze[At]:!!Te[je]:I.namespaceURI===Pe?$e.namespaceURI===Ee&&!Ze[At]||$e.namespaceURI===Me&&!Ae[At]?!1:!Te[je]&&(bt[je]||!we[je]):!!(it==="application/xhtml+xml"&&Ot[I.namespaceURI]):!1},kt=function(I){Ms(t.removed,{element:I});try{W(I).removeChild(I)}catch{w(I)}},Rt=function(I,$e){try{Ms(t.removed,{attribute:$e.getAttributeNode(I),from:$e})}catch{Ms(t.removed,{attribute:null,from:$e})}if($e.removeAttribute(I),I==="is")if(Ue||ne)try{kt($e)}catch{}else try{$e.setAttribute(I,"")}catch{}},qt=function(I){let $e=null,je=null;if(Je)I="<remove></remove>"+I;else{let Lt=gc(I,/^[\r\n\t ]+/);je=Lt&&Lt[0]}it==="application/xhtml+xml"&&Be===Pe&&(I='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+I+"</body></html>");let At=q?q.createHTML(I):I;if(Be===Pe)try{$e=new _().parseFromString(At,it)}catch{}if(!$e||!$e.documentElement){$e=M.createDocument(Be,"template",null);try{$e.documentElement.innerHTML=tt?N:At}catch{}}let Ke=$e.body||$e.documentElement;return I&&je&&Ke.insertBefore(n.createTextNode(je),Ke.childNodes[0]||null),Be===Pe?D.call($e,De?"html":"body")[0]:De?$e.documentElement:Ke},Wt=function(I){return F.call(I.ownerDocument||I,I,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Xt=function(I){return I instanceof f&&(typeof I.nodeName!="string"||typeof I.textContent!="string"||typeof I.removeChild!="function"||!(I.attributes instanceof p)||typeof I.removeAttribute!="function"||typeof I.setAttribute!="function"||typeof I.namespaceURI!="string"||typeof I.insertBefore!="function"||typeof I.hasChildNodes!="function")},sn=function(I){return typeof l=="function"&&I instanceof l};function xt(He,I,$e){va(He,je=>{je.call(t,I,$e,We)})}let tn=function(I){let $e=null;if(xt(C.beforeSanitizeElements,I,null),Xt(I))return kt(I),!0;let je=rt(I.nodeName);if(xt(C.uponSanitizeElement,I,{tagName:je,allowedTags:ae}),he&&I.hasChildNodes()&&!sn(I.firstElementChild)&&xn(/<[/\w!]/g,I.innerHTML)&&xn(/<[/\w!]/g,I.textContent)||I.nodeType===Bs.progressingInstruction||he&&I.nodeType===Bs.comment&&xn(/<[/\w]/g,I.data))return kt(I),!0;if(!(Xe.tagCheck instanceof Function&&Xe.tagCheck(je))&&(!ae[je]||ye[je])){if(!ye[je]&&Ft(je)&&(ie.tagNameCheck instanceof RegExp&&xn(ie.tagNameCheck,je)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(je)))return!1;if(Qe&&!Et[je]){let At=W(I)||I.parentNode,Ke=re(I)||I.childNodes;if(Ke&&At){let Lt=Ke.length;for(let Bt=Lt-1;Bt>=0;--Bt){let st=T(Ke[Bt],!0);st.__removalCount=(I.__removalCount||0)+1,At.insertBefore(st,Q(I))}}}return kt(I),!0}return I instanceof a&&!$t(I)||(je==="noscript"||je==="noembed"||je==="noframes")&&xn(/<\/no(script|embed|frames)/i,I.innerHTML)?(kt(I),!0):(Ce&&I.nodeType===Bs.text&&($e=I.textContent,va([R,oe,fe],At=>{$e=qs($e,At," ")}),I.textContent!==$e&&(Ms(t.removed,{element:I.cloneNode()}),I.textContent=$e)),xt(C.afterSanitizeElements,I,null),!1)},fn=function(I,$e,je){if(Re&&($e==="id"||$e==="name")&&(je in n||je in E))return!1;if(!(pe&&!ke[$e]&&xn(be,$e))){if(!(X&&xn(H,$e))){if(!(Xe.attributeCheck instanceof Function&&Xe.attributeCheck($e,I))){if(!P[$e]||ke[$e]){if(!(Ft(I)&&(ie.tagNameCheck instanceof RegExp&&xn(ie.tagNameCheck,I)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(I))&&(ie.attributeNameCheck instanceof RegExp&&xn(ie.attributeNameCheck,$e)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck($e,I))||$e==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&xn(ie.tagNameCheck,je)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(je))))return!1}else if(!x[$e]){if(!xn(Z,qs(je,de,""))){if(!(($e==="src"||$e==="xlink:href"||$e==="href")&&I!=="script"&&Fy(je,"data:")===0&&ht[I])){if(!(ce&&!xn(ee,qs(je,de,"")))){if(je)return!1}}}}}}}return!0},Ft=function(I){return I!=="annotation-xml"&&gc(I,Oe)},Gt=function(I){xt(C.beforeSanitizeAttributes,I,null);let{attributes:$e}=I;if(!$e||Xt(I))return;let je={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:P,forceKeepAttr:void 0},At=$e.length;for(;At--;){let Ke=$e[At],{name:Lt,namespaceURI:Bt,value:st}=Ke,Ct=rt(Lt),yn=st,Nt=Lt==="value"?yn:By(yn);if(je.attrName=Ct,je.attrValue=Nt,je.keepAttr=!0,je.forceKeepAttr=void 0,xt(C.uponSanitizeAttribute,I,je),Nt=je.attrValue,et&&(Ct==="id"||Ct==="name")&&(Rt(Lt,I),Nt=pt+Nt),he&&xn(/((--!?|])>)|<\/(style|title|textarea)/i,Nt)){Rt(Lt,I);continue}if(Ct==="attributename"&&gc(Nt,"href")){Rt(Lt,I);continue}if(je.forceKeepAttr)continue;if(!je.keepAttr){Rt(Lt,I);continue}if(!V&&xn(/\/>/i,Nt)){Rt(Lt,I);continue}Ce&&va([R,oe,fe],y=>{Nt=qs(Nt,y," ")});let kn=rt(I.nodeName);if(!fn(kn,Ct,Nt)){Rt(Lt,I);continue}if(q&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(kn,Ct)){case"TrustedHTML":{Nt=q.createHTML(Nt);break}case"TrustedScriptURL":{Nt=q.createScriptURL(Nt);break}}if(Nt!==yn)try{Bt?I.setAttributeNS(Bt,Lt,Nt):I.setAttribute(Lt,Nt),Xt(I)?kt(I):Tf(t.removed)}catch{Rt(Lt,I)}}xt(C.afterSanitizeAttributes,I,null)},on=function He(I){let $e=null,je=Wt(I);for(xt(C.beforeSanitizeShadowDOM,I,null);$e=je.nextNode();)xt(C.uponSanitizeShadowNode,$e,null),tn($e),Gt($e),$e.content instanceof i&&He($e.content);xt(C.afterSanitizeShadowDOM,I,null)};return t.sanitize=function(He){let I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$e=null,je=null,At=null,Ke=null;if(tt=!He,tt&&(He="<!-->"),typeof He!="string"&&!sn(He))if(typeof He.toString=="function"){if(He=He.toString(),typeof He!="string")throw js("dirty is not a string, aborting")}else throw js("toString is not a function");if(!t.isSupported)return He;if(qe||z(I),t.removed=[],typeof He=="string"&&(mt=!1),mt){if(He.nodeName){let st=rt(He.nodeName);if(!ae[st]||ye[st])throw js("root node is forbidden and cannot be sanitized in-place")}}else if(He instanceof l)$e=qt("<!---->"),je=$e.ownerDocument.importNode(He,!0),je.nodeType===Bs.element&&je.nodeName==="BODY"||je.nodeName==="HTML"?$e=je:$e.appendChild(je);else{if(!Ue&&!Ce&&!De&&He.indexOf("<")===-1)return q&&G?q.createHTML(He):He;if($e=qt(He),!$e)return Ue?null:G?N:""}$e&&Je&&kt($e.firstChild);let Lt=Wt(mt?He:$e);for(;At=Lt.nextNode();)tn(At),Gt(At),At.content instanceof i&&on(At.content);if(mt)return He;if(Ue){if(ne)for(Ke=K.call($e.ownerDocument);$e.firstChild;)Ke.appendChild($e.firstChild);else Ke=$e;return(P.shadowroot||P.shadowrootmode)&&(Ke=A.call(r,Ke,!0)),Ke}let Bt=De?$e.outerHTML:$e.innerHTML;return De&&ae["!doctype"]&&$e.ownerDocument&&$e.ownerDocument.doctype&&$e.ownerDocument.doctype.name&&xn(Mf,$e.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+$e.ownerDocument.doctype.name+`>
`+Bt),Ce&&va([R,oe,fe],st=>{Bt=qs(Bt,st," ")}),q&&G?q.createHTML(Bt):Bt},t.setConfig=function(){let He=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};z(He),qe=!0},t.clearConfig=function(){We=null,qe=!1},t.isValidAttribute=function(He,I,$e){We||z({});let je=rt(He),At=rt(I);return fn(je,At,$e)},t.addHook=function(He,I){typeof I=="function"&&Ms(C[He],I)},t.removeHook=function(He,I){if(I!==void 0){let $e=qy(C[He],I);return $e===-1?void 0:jy(C[He],$e,1)[0]}return Tf(C[He])},t.removeHooks=function(He){C[He]=[]},t.removeAllHooks=function(){C=Df()},t}var jf=qf();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$a=e=>(...t)=>({_$litDirective$:e,values:t}),Wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Us=class extends Wo{constructor(t){if(super(t),this.it=Jt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Jt||t==null)return this._t=void 0,this.it=t;if(t===Dn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Us.directiveName="unsafeHTML",Us.resultType=1;var Ff=$a(Us);function Ec(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var io=Ec();function Gf(e){io=e}var Ks={exec:()=>null};function jt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(En.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var nv=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),En={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rv=/^(?:[ \t]*(?:\n|$))+/,ov=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,sv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,iv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Tc=/(?:[*+-]|\d{1,9}[.)])/,Vf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yf=jt(Vf).replace(/bull/g,Tc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),av=jt(Vf).replace(/bull/g,Tc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lv=/^[^\n]+/,Cc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cv=jt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Cc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),uv=jt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Tc).getRegex(),Ra="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,dv=jt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oc).replace("tag",Ra).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Xf=jt(Rc).replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex(),pv=jt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Xf).getRegex(),Ic={blockquote:pv,code:ov,def:cv,fences:sv,heading:iv,hr:Gs,html:dv,lheading:Yf,list:uv,newline:rv,paragraph:Xf,table:Ks,text:lv},Bf=jt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex(),fv={...Ic,lheading:av,table:Bf,paragraph:jt(Rc).replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Bf).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex()},_v={...Ic,html:jt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ks,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:jt(Rc).replace("hr",Gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Qf=/^( {2,}|\\)\n(?!\s*$)/,hv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ca=/[\p{P}\p{S}]/u,Lc=/[\s\p{P}\p{S}]/u,Zf=/[^\s\p{P}\p{S}]/u,bv=jt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Lc).getRegex(),Jf=/(?!~)[\p{P}\p{S}]/u,yv=/(?!~)[\s\p{P}\p{S}]/u,vv=/(?:[^\s\p{P}\p{S}]|~)/u,kv=jt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nv?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),e_=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wv=jt(e_,"u").replace(/punct/g,Ca).getRegex(),$v=jt(e_,"u").replace(/punct/g,Jf).getRegex(),t_="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xv=jt(t_,"gu").replace(/notPunctSpace/g,Zf).replace(/punctSpace/g,Lc).replace(/punct/g,Ca).getRegex(),Av=jt(t_,"gu").replace(/notPunctSpace/g,vv).replace(/punctSpace/g,yv).replace(/punct/g,Jf).getRegex(),Sv=jt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zf).replace(/punctSpace/g,Lc).replace(/punct/g,Ca).getRegex(),Ev=jt(/\\(punct)/,"gu").replace(/punct/g,Ca).getRegex(),Tv=jt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rv=jt(Oc).replace("(?:-->|$)","-->").getRegex(),Cv=jt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Sa=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ov=jt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Sa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),n_=jt(/^!?\[(label)\]\[(ref)\]/).replace("label",Sa).replace("ref",Cc).getRegex(),r_=jt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cc).getRegex(),Iv=jt("reflink|nolink(?!\\()","g").replace("reflink",n_).replace("nolink",r_).getRegex(),Uf=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Dc={_backpedal:Ks,anyPunctuation:Ev,autolink:Tv,blockSkip:kv,br:Qf,code:gv,del:Ks,emStrongLDelim:wv,emStrongRDelimAst:xv,emStrongRDelimUnd:Sv,escape:mv,link:Ov,nolink:r_,punctuation:bv,reflink:n_,reflinkSearch:Iv,tag:Cv,text:hv,url:Ks},Lv={...Dc,link:jt(/^!?\[(label)\]\((.*?)\)/).replace("label",Sa).getRegex(),reflink:jt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Sa).getRegex()},xc={...Dc,emStrongRDelimAst:Av,emStrongLDelim:$v,url:jt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Uf).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:jt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Uf).getRegex()},Dv={...xc,br:jt(Qf).replace("{2,}","*").getRegex(),text:jt(xc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xa={normal:Ic,gfm:fv,pedantic:_v},Ws={normal:Dc,gfm:xc,breaks:Dv,pedantic:Lv},Pv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wf=e=>Pv[e];function br(e,t){if(t){if(En.escapeTest.test(e))return e.replace(En.escapeReplace,Wf)}else if(En.escapeTestNoEncode.test(e))return e.replace(En.escapeReplaceNoEncode,Wf);return e}function Hf(e){try{e=encodeURI(e).replace(En.percentDecode,"%")}catch{return null}return e}function zf(e,t){let n=e.replace(En.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(En.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(En.slashPipe,"|");return r}function Hs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Nv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Kf(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Mv(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Ea=class{constructor(e){Vt(this,"options");Vt(this,"rules");Vt(this,"lexer");this.options=e||io}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Hs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Mv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Hs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Hs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Hs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=f,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let b=_,g=b.raw+`
`+n.join(`
`),T=this.blockquote(g);i[i.length-1]=T,r=r.substring(0,r.length-b.raw.length)+T.raw,o=o.substring(0,o.length-b.text.length)+T.text;break}else if(_?.type==="list"){let b=_,g=b.raw+`
`+n.join(`
`),T=this.list(g);i[i.length-1]=T,r=r.substring(0,r.length-_.raw.length)+T.raw,o=o.substring(0,o.length-b.raw.length)+T.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",p="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),_=e.split(`
`,1)[0],b=!f.trim(),g=0;if(this.options.pedantic?(g=2,p=f.trimStart()):b?g=t[1].length+1:(g=t[2].search(this.rules.other.nonSpaceChar),g=g>4?1:g,p=f.slice(g),g+=t[1].length),b&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(g),w=this.rules.other.hrRegex(g),Q=this.rules.other.fencesBeginRegex(g),re=this.rules.other.headingBeginRegex(g),W=this.rules.other.htmlBeginRegex(g);for(;e;){let q=e.split(`
`,1)[0],N;if(_=q,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),N=_):N=_.replace(this.rules.other.tabCharGlobal,"    "),Q.test(_)||re.test(_)||W.test(_)||T.test(_)||w.test(_))break;if(N.search(this.rules.other.nonSpaceChar)>=g||!_.trim())p+=`
`+N.slice(g);else{if(b||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Q.test(f)||re.test(f)||w.test(f))break;p+=`
`+_}!b&&!_.trim()&&(b=!0),u+=q+`
`,e=e.substring(q.length+1),f=N.slice(g)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=p.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=p}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=zf(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(zf(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Hs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Nv(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Kf(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Kf(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let p=[...r[0]][0].length,f=e.slice(0,o+r.index+p+s);if(Math.min(o,s)%2){let b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Hn=class Ac{constructor(t){Vt(this,"tokens");Vt(this,"options");Vt(this,"state");Vt(this,"inlineQueue");Vt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||io,this.options.tokenizer=this.options.tokenizer||new Ea,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:En,block:xa.normal,inline:Ws.normal};this.options.pedantic?(n.block=xa.pedantic,n.inline=Ws.pedantic):this.options.gfm&&(n.block=xa.gfm,this.options.breaks?n.inline=Ws.breaks:n.inline=Ws.gfm),this.tokenizer.rules=n}static get rules(){return{block:xa,inline:Ws}}static lex(t,n){return new Ac(n).lex(t)}static lexInline(t,n){return new Ac(n).inlineTokens(t)}lex(t){t=t.replace(En.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(En.tabCharGlobal,"    ").replace(En.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let i=t;if(this.options.extensions?.startBlock){let s=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(s=Math.min(s,a))}),s<1/0&&s>=0&&(i=t.substring(0,s+1))}if(this.state.top&&(o=this.tokenizer.paragraph(i))){let s=n.at(-1);r&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o),r=i.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=n.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),_;this.options.extensions.startInline.forEach(b=>{_=b.call({lexer:this},f),typeof _=="number"&&_>=0&&(p=Math.min(p,_))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Ta=class{constructor(e){Vt(this,"options");Vt(this,"parser");this.options=e||io}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(En.notSpaceStart)?.[0],o=e.replace(En.endingNewline,"")+`
`;return r?'<pre><code class="language-'+br(r)+'">'+(n?o:br(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:br(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let s=0;s<e.items.length;s++){let l=e.items[s];r+=this.listitem(l)}let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];n="";for(let s=0;s<i.length;s++)n+=this.tablecell(i[s]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Hf(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+br(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Hf(e);if(o===null)return br(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${br(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Pc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},zn=class Sc{constructor(t){Vt(this,"options");Vt(this,"renderer");Vt(this,"textRenderer");this.options=t||io,this.options.renderer=this.options.renderer||new Ta,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pc}static parse(t,n){return new Sc(n).parse(t)}static parseInline(t,n){return new Sc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Aa,zs=(Aa=class{constructor(e){Vt(this,"options");Vt(this,"block");this.options=e||io}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Hn.lex:Hn.lexInline}provideParser(){return this.block?zn.parse:zn.parseInline}},Vt(Aa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Vt(Aa,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Aa),qv=class{constructor(...e){Vt(this,"defaults",Ec());Vt(this,"options",this.setOptions);Vt(this,"parse",this.parseMarkdown(!0));Vt(this,"parseInline",this.parseMarkdown(!1));Vt(this,"Parser",zn);Vt(this,"Renderer",Ta);Vt(this,"TextRenderer",Pc);Vt(this,"Lexer",Hn);Vt(this,"Tokenizer",Ea);Vt(this,"Hooks",zs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ta(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ea(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new zs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];zs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&zs.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let p=l.call(o,u);return a.call(o,p)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Hn.lex(e,t??this.defaults)}parser(e,t){return zn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Hn.lex:Hn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?zn.parse:zn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Hn.lex:Hn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?zn.parse:zn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+br(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},so=new qv;function zt(e,t){return so.parse(e,t)}zt.options=zt.setOptions=function(e){return so.setOptions(e),zt.defaults=so.defaults,Gf(zt.defaults),zt};zt.getDefaults=Ec;zt.defaults=io;zt.use=function(...e){return so.use(...e),zt.defaults=so.defaults,Gf(zt.defaults),zt};zt.walkTokens=function(e,t){return so.walkTokens(e,t)};zt.parseInline=so.parseInline;zt.Parser=zn;zt.parser=zn.parse;zt.Renderer=Ta;zt.TextRenderer=Pc;zt.Lexer=Hn;zt.lexer=Hn.lex;zt.Tokenizer=Ea;zt.Hooks=zs;zt.parse=zt;var QS=zt.options,ZS=zt.setOptions,JS=zt.use,eE=zt.walkTokens,tE=zt.parseInline;var nE=zn.parse,rE=Hn.lex;function yr(e){let t=zt.parse(e),n=jf.sanitize(t);return Ff(n)}function vr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ho(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Oa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var s_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},jv={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Fv=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Bv=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Kn(e){return!!e&&typeof e=="object"}function Nc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Mc(e,t){let n=Nc(e),r=Nc(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function i_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Kn(o)&&typeof o.text=="string"?o.text:"").join(""):Kn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Uv(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:s_[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Nc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Mc(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Mc(Kn(l)?l.old_string:"",Kn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function qc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Wv=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function a_(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Kn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Wv,"").trim();return n.length>0?{kind:"user",text:n}:null}function jc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Fv.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Bv.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hv(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function zv(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Kn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(jc(s.text));else if(s.type==="thinking"){let l=qc(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Uv(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?o_(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Kn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=i_(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=a_(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?o_([o],n):[o]}return[]}function o_(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Kv(e){let t=typeof e.command=="string"?e.command:"",n=i_(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:s_.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Gv(e){if(e.type==="item.completed"&&Kn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[jc(t.text)];if(t.type==="user_message"){let n=a_(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=qc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Kv(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vv(e){if(e.schema!=="codex-delegation-monitor-v1"||!Kn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Kn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[jc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=qc(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=jv[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Yv(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xv(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Kn(t)?t:null}function l_(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Xv(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Hv(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Vv(i):Yv(i)?Gv(i):zv(i,n);return s.length>0&&(r.progress=null),s}}}function Fc(e){let t=[],n=l_(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Qv=5,Zv=10,Jv=/Task\s+#(\d+)/,ek=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,tk=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function nk(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function rk(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ok(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Jv.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function sk(e){if(e.tool==="Bash"){let t=e.command||"";return ek.test(t)?"~ PR/\uAC8C\uC2DC \uC911":tk.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ik(e){let t=e.filter(o=>o.kind==="tool").slice(-Zv),n=new Map;t.forEach((o,i)=>{let s=sk(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function ak(e){let t=rk(e);if(t)return{text:t,guess:!1};let n=ok(e);if(n)return{text:n,guess:!1};let r=ik(e);return r?{text:r,guess:!0}:null}function lk(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function zo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,p=!1,f={},_=!0,b=new Set,g=new Set,T=null,w=null,Q=!1,re=!1,W=!1,q=null,N=null;function M(){Q=!1,re=!1,W=!1,q=null,N=null}async function F(ne){if(n){re=!0,W=!1,ye();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ne,...u?{root_dir:u}:{}}));if(i!==ne)return;!G||typeof G!="object"||Array.isArray(G)?W=!0:(q=G,N=ne)}catch{i===ne&&(W=!0)}finally{i===ne&&(re=!1,ye())}}}function K(){if(Q=!Q,Q&&i&&N!==i){F(i);return}ye()}function D(){if(!Q)return"";let ne=Ho({loading:re,error:W});if(ne)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ne}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=Oa(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function A(){if(!a||!r)return[];let ne=r.get(a);return Fc(ne?ne.lines:[])}function C(){if(!a||!r)return null;let ne=r.get(a),G=ne?ne.last_event_at:null;return typeof G=="number"?G:null}function R(){return f.status==="running"}function oe(){if(R()&&i){w||(w=setInterval(()=>ye(),1e3));return}fe()}function fe(){w&&(clearInterval(w),w=null)}function be(ne){let G=[],Re=0;for(;Re<ne.length;){let{idx:et,line:pt}=ne[Re];if(pt.kind==="tool"){let Qe=Re;for(;Qe<ne.length&&ne[Qe].line.kind==="tool"&&ne[Qe].line.tool===pt.tool;)Qe+=1;if(Qe-Re>=Qv&&!g.has(et)){G.push({kind:"group",idx:et,tool:pt.tool||"",lines:ne.slice(Re,Qe)}),Re=Qe;continue}}G.push({kind:"line",idx:et,line:pt}),Re+=1}return G}function H(ne){let G=[],Re=new Map;for(let Qe=0;Qe<ne.length;Qe+=1){let mt=ne[Qe],Dt=mt.parent_tool_use_id;if(typeof Dt=="string"&&Dt.length>0){let Et=Re.get(Dt);Et||(Et={kind:"subagent",idx:Qe,launch_id:Dt,agent_type:null,header:null,lines:[]},Re.set(Dt,Et),G.push(Et)),Et.lines.push({idx:Qe,line:mt});continue}if(mt.kind==="tool"&&mt.tool==="Agent"&&typeof mt.launch_id=="string"&&mt.launch_id.length>0){let Et=ee(mt),ot=Re.get(mt.launch_id);if(ot){ot.header={idx:Qe,line:mt},ot.agent_type=Et;continue}let ht={kind:"subagent",idx:Qe,launch_id:mt.launch_id,agent_type:Et,header:{idx:Qe,line:mt},lines:[]};Re.set(mt.launch_id,ht),G.push(ht);continue}G.push({kind:"entry",idx:Qe,line:mt})}let et=[],pt=0;for(;pt<G.length;){if(G[pt].kind!=="entry"){et.push(G[pt]),pt+=1;continue}let Qe=pt;for(;Qe<G.length&&G[Qe].kind==="entry";)Qe+=1;et.push(...be(G.slice(pt,Qe))),pt=Qe}return et}function ee(ne){let G=ne.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function de(ne){for(let G=ne.length-1;G>=0;G-=1){let Re=ne[G];if(Re.kind==="result"||Re.kind==="error")return null;if(Re.kind==="tool"&&!Object.hasOwn(Re,"result"))return Re}return null}function Oe(ne){for(let G=ne.length-1;G>=0;G-=1)if(ne[G].kind==="thinking")return ne[G];return null}function Z(ne,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let Re=b.has(ne);return c`<div
        class="sv__think${Re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Xe(ne)}
      >
        <span class="sv__think-line">💭 ${Vs(G.text)}</span>
        ${Re?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let Re=b.has(ne);return c`<div
        class="sv__line sv__line--user${Re?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Xe(ne)}
      >
        <span class="sv__user-line">▷ ${Vs(G.text)}</span>
        ${Re?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let Re=b.has(ne),et=G.tool==="Bash"?nk(G.command):0,pt=G.tool==="Bash"?et>1?Vs(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${Re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Xe(ne)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${pt?c`<span class="sv__tool-detail">${pt}</span>`:""}
          ${et>1?c`<span class="sv__tool-more">⋯ ${et}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${Re?c`<pre class="sv__tool-expand">${ae(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${yr(G.text||"")}</div>`}function ae(ne){let G=[];if(ne.tool==="Bash"&&typeof ne.command=="string"&&ne.command.length>0)G.push(ne.command);else if(ne.input!==void 0)try{G.push(`input: ${JSON.stringify(ne.input,null,2)}`)}catch{}return typeof ne.output=="string"&&ne.output.length>0&&G.push(`output:
${ne.output}`),G.join(`

`)}function le(){if(!i)return c``;let ne=A(),G=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Re=f.session_id||"",et=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,pt=R(),Qe=pt?lk(C(),Date.now()):"",mt=pt?de(ne):null,Dt=pt?Oe(ne):null,Et=ak(ne);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${Et?c`<span
              class="sv__stage${Et.guess?" sv__stage--guess":""}"
              title=${Et.text}
              >${Et.text}</span
            >`:""}
        ${pt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Qe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Qe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Qe?c`<span class="sv__live-ago">${Qe}</span>`:""}</span
            >`:""}
        ${Re?c`<button
              type="button"
              class="sv__session"
              title=${Re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Re}`}
              @click=${()=>pe(Re)}
            >
              ⧉ ${Re.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>pe(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||p?"":c`<button
              type="button"
              class="sv__prompt-toggle${Q?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Q?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${K}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${et}
          @click=${X}
        >
          <span class="sv__follow-full">⇣ ${et}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ue()}
        >
          ✕
        </button>
      </div>
      ${s||p?"":D()}
      <div class="sv__body">
        ${ne.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:H(ne).map(ot=>ot.kind==="subagent"?se(ot):ot.kind==="group"?P(ot):Z(ot.idx,ot.line))}
      </div>
      ${mt||Dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${mt?c`<span class="sv__now-icon">${mt.icon}</span>
                  <span class="sv__now-name">${mt.tool}</span>
                  <span class="sv__now-detail"
                    >${mt.tool==="Bash"?Vs(mt.command):mt.path||mt.command||""}</span
                  >`:""}
            ${Dt?c`<span class="sv__now-think"
                  >💭 ${Vs(Dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function P(ne){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ie(ne.idx)}
    >
      <span class="sv__group-icon">${ne.lines[0].line.icon}</span>
      <span class="sv__group-name">${ne.tool}</span>
      <span class="sv__group-count">${ne.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function se(ne){let G=g.has(ne.idx),Re=ne.header?ne.header.line:null,et=Re?Re.is_error===!0?"\u2717":typeof Re.result=="string"?"\u2713":"\u27F3":"",pt=Re&&Re.command?Re.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ie(ne.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ne.agent_type||"subagent"}</span>
        ${pt?c`<span class="sv__sub-detail">${pt}</span>`:""}
        <span class="sv__sub-count">${ne.lines.length}줄</span>
        ${et?c`<span class="sv__sub-state">${et}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${be(ne.lines).map(Qe=>Qe.kind==="group"?P(Qe):Z(Qe.idx,Qe.line))}
          </div>`:""}
    </div>`}function ie(ne){g.add(ne),ye()}function ye(){lt(le(),e),oe(),_&&ke()}function ke(){let ne=e.querySelector(".sv__body");ne&&(ne.scrollTop=ne.scrollHeight)}function Xe(ne){b.has(ne)?b.delete(ne):b.add(ne),ye()}function X(){_=!_,ye()}function pe(ne){$n(ne).then(G=>{G?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ce(ne){!i||!ne||(f={...f,...ne},ye())}function V(ne){let G=ne.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&_&&(_=!1,ye())}e.addEventListener("scroll",V,!0);function Ce(ne){let G=ne.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||Ue()}let he=!1;function De(){he||(document.addEventListener("mousedown",Ce),he=!0)}function qe(){he&&(document.removeEventListener("mousedown",Ce),he=!1)}function Je(ne){let G=ne&&ne.attempt_id;if(!G)return;let Re=typeof ne.launch_id=="string"&&ne.launch_id.length>0?ne.launch_id:null,et=ne.session_ref&&typeof ne.session_ref=="object"?ne.session_ref:null;if(Re&&et)return;let pt=a;i=G,s=Re,l=et,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&pt&&pt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:pt})).catch(()=>{}),u=typeof ne.root_dir=="string"&&ne.root_dir.length>0?ne.root_dir:null,f=ne.meta||{},p=ne.hide_prompt===!0,_=!0,b.clear(),g.clear(),M(),!T&&r&&(T=r.subscribe(ye)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),ye()}function Ue(){let ne=a;qe(),i=null,s=null,l=null,a=null,u=null,p=!1,b.clear(),g.clear(),M(),fe(),n&&ne&&Promise.resolve(n("unsubscribe-session-log",{id:ne})).catch(()=>{}),lt(c``,e),o&&o()}return{open:Je,updateMeta:ce,close:Ue,isOpen(){return i!==null},destroy(){fe(),qe(),T&&(T(),T=null),e.removeEventListener("scroll",V,!0),i=null,s=null,l=null,a=null,u=null,p=!1,lt(c``,e)}}}function ck(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function c_(e,t){let n=ck(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${o=>t.onOpenDoc(o,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var uk="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",dk=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,pk=/^\*\*결론\*\* — (.+)$/;function Ia(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==uk)return null;let n=dk.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?pk.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var fk=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,_k=/^VERDICT: (APPROVE|REVISE)$/,mk=/^anchor: ([0-9a-fA-F]+)$/,gk=/^[0-9]+\. /,hk="- \uC9C0\uC801 \uC5C6\uC74C",bk={spec:40,impl:40,plan:12};function u_(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=fk.exec(t[0]||"");if(!n)return null;let r=_k.exec(t[1]||""),o=mk.exec(t[2]||"");if(!r||!o)return null;let i=n[1],s=o[1];if(s.length!==bk[i])return null;let l=t.slice(3),a=0,u=!1;for(let p of l)gk.test(p)?a+=1:p.trim()===hk&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:s,points:a>0?a:u?0:null,body:l.join(`
`).trim()}}var d_=20;function Bc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function yk(e){return e.length>d_?`${e.slice(0,d_)}\u2026`:e}function vk(e,t,n,r){let o=`${t.lane} ${yk(t.identifier)}`;return c`<div class="detail-report">
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
          >${o}</span
        >
        <span class="detail-report__time">${Bc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}var p_=12;function kk(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function wk(e,t,n,r){let o=t.anchor.length>p_?`${t.anchor.slice(0,p_)}\u2026`:t.anchor,i=kk(t);return c`<div class="detail-report detail-report--review">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🔎</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">리뷰 결과</span>
        <span class="detail-report__lane"
          >${t.step} · r${t.round}</span
        >
        <span class="detail-report__anchor" title=${t.anchor}
          >${o}</span
        >
        <span class="detail-report__time"
          >${Bc(e.created_at)}</span
        >
      </span>
      <span class="detail-report__concl">
        <span
          class="detail-report__verdict detail-report__verdict--${t.verdict==="APPROVE"?"approve":"revise"}"
          >${t.verdict}</span
        >${i?c`<span class="detail-report__points">${i}</span>`:""}
      </span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}function $k(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function f_(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=typeof a.text=="string"?a.text:"",p=Ia(u);if(p)return vk(a,p,t,o.has(a.id));let f=u_(u);return f?wk(a,f,t,o.has(a.id)):$k(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${s}
        .value=${i}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${s||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:NE}=yu;var __=e=>e.strings===void 0;var xk={},m_=(e,t=xk)=>e._$AH=t;var Lr=$a(class extends Wo{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!__(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Dn||t===Jt)return t;let n=e.element,r=e.name;if(e.type===hr.PROPERTY){if(t===n[r])return Dn}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Dn}else if(e.type===hr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Dn;return m_(e),t}});var Ak=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Uc={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},g_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Sk={pin:"pin",global:"global",base:"base"};function Ek(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Sk[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Tk(e,t,n){switch(e){case"workflow_mode":return ds;case"spec_review_model":case"impl_review_model":return ps;case"plan_review_model":return Di;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Pi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return er;case"impl_dispatch":return us;case"impl_runtime":return Li;case"impl_model":return Ro(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return er;case"orchestration_model":return Co(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||Cn).filter(r=>r!==Cn);default:return[]}}function Rk(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Ek(e.source)}
    <span class="detail-effective__k"
      >${tr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Mi[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${tr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function h_(e,t){let n=Ol.flatMap(a=>a.keys),r=Il(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Yd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Ck(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${o.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${o.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${o.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Ol.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let p=Ci({key:u.key,choices:Tk(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Rk(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Lr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Ck(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ok(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function b_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ok(r.exec_receipt),u=a?ur(a):l,p=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=$i(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,b=typeof _=="number"?`PR #${_}`:"PR",g=gs(n),T=g!==null&&t.isChipOpen?.("rec")===!0,w=T?Hl({rec:g},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${i?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${i}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${s?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${s}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${f?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${p}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${g?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${g.state}
            aria-expanded=${T?"true":"false"}
            title=${Fi(g)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${w?Do(w):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Ik(i).map(Q=>Lk(Q,n,o,{label:Q.id==="pr"?b:Q.label,href:Q.id==="pr"?s:""}))}
    </div>
  </section>`}function Ik(e){let n=typeof e=="string"&&Object.hasOwn(Uc,e)&&Uc[e]||Uc.spec_backed;return Ak.filter(r=>n.includes(r.id))}var La={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Lk(e,t,n,r){let o=Dk(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=o&&o.split("@")[1]?.slice(0,7)||"",f=u?La.stale:l?La.on:a?La.current:La.none,_=Pk(e,n),b=`${r.label} \xB7 ${f}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,g=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,T=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${p}</span>`;return r.href?c`<a
      class=${g}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${T}</a
    >`:c`<span
    class=${g}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${T}</span
  >`}function Dk(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Pk(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(g_,n)?g_[n]:""}function Da(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function y_(e){return Da(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function v_(e,t){let n=e&&e[t];if(!Da(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(y_),o=y_(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function $_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Pa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${$_(e)}${t}`}function Ko(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${$_(e)}`}function Nk(e,t,n){if(n!==null){let o=e==="claude"?Pa:Ko,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ko({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function k_(e,t){if(!Da(e)||e.state!=="usable"||!Da(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function w_(e){let t=e.provider_key==="claude"?Pa:Ko,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Nk(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function x_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${w_({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:v_(t,"claude"),selected:o,workspace_default:k_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${w_({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:v_(t,"codex"),selected:i,workspace_default:k_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Mk(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qk(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Na(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(T){T.key==="Escape"&&o&&(T.preventDefault(),b())}document.addEventListener("keydown",u);function p(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Mk(o)}</span
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
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${yr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){lt(p(),e)}async function _(T,w={}){o=T,i="loading",s="",l=null,a="",f();let Q=w.workspace||(n?n():"");if(!Q){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let re="/api/doc?workspace="+encodeURIComponent(Q)+"&path="+encodeURIComponent(T);try{let W=await r(re),q=await W.json().catch(()=>({}));if(!W.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&w.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||W.status)+")",f();return}let N=qk(String(q.content||""));l=N.front,s=N.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){o=null,lt(c``,e)}function g(){document.removeEventListener("keydown",u),b()}return{open:_,close:b,destroy:g}}function E_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in vl))return"";let n=vl[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=$o({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var jk=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],T_="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ma=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Fk=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function A_(e){return typeof e=="string"&&Fk.has(e)}var Bk=["running","done","failed","interrupted"],Uk={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wk(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Hk(e){let t=hn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${T_}
          >부분 집계</span
        >`:""}`}function S_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function zc(e){if(typeof e=="number")return Ys(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ys(t):""}function zk(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function R_(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function C_(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function Wc(e){return e===null||typeof e=="string"&&e.trim().length>0}function Hc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Kk(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ma.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Wc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Wc(t.effort))||!(!("agent_type"in t)||Wc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Bk.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Hc(t.started_at)||!Hc(t.last_event_at)||!Hc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Gk(e,t,n,r){let i=hn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=R_({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${s.title}
      >${s.text}</span
    >
    ${C_(s.thread)}
    ${zc(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${zc(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${E_(n)}
  </div>`}function Vk(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?hn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ys(e.last_event_at):i?zc(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,zk(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),p=R_(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Uk[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${p.title}
      >${p.text}</span
    >
    ${C_(p.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}${E_(i)}
  </button>`}function Yk(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xk(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let _=Kk(f);!_||o.has(_.launch_id)||A_(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((f,_)=>(f.started_at||0)-(_.started_at||0));let s={};for(let{role:f,provider:_}of Ma){let b=t?t.roles[f]?.[_]:null;s[f]=b?[...b.legs]:[]}let l=Ma.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,p=[];for(let{role:f,provider:_}of Ma){for(let b of r.filter(g=>g.role===f&&g.provider===_)){let g=l.find(w=>w.receipt_id===b.launch_id)||null;if(g&&!Yk(b,g))continue;g&&a.add(g.receipt_id);let T=_==="codex"&&u.has(b.session_id);p.push(Vk(b,g,e.attempt_id,n,T)),_==="codex"&&u.add(b.session_id)}for(let b of s[f])if(!a.has(b.receipt_id)&&!A_(b.agent_type)){let g=typeof b.session_id=="string"&&b.session_id.length>0?b.session_id:null,T=_==="codex"&&g!==null&&u.has(g);p.push(Gk(f,_,b,T)),_==="codex"&&g!==null&&u.add(g)}}return p}function Qk(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...jk,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Wk(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${T_}</span>`:""}
  </div>`}var Zk={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ys(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Jk(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var ew={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function tw(e,t){let n=ew[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${uc(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Cs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ys(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function O_(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,T)=>T.index-g.index)],l=s.map(g=>tw(g,t)),a=n.expanded||new Set,u=n.catalog||null;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let p=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&p.add(g.resumed_from);let f=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let w=typeof g.session_id=="string"&&g.session_id.length>0,Q=p.has(g.attempt_id),re=w&&!Q,W=w?Q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!re}
      title=${W}
      @click=${q=>{q.stopPropagation(),re&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let w=g.cause_detail,Q=w&&typeof w.reason=="string"&&w.reason.length>0?typeof w.command=="string"&&w.command.length>0?`${w.reason} \xB7 ${w.command}`:w.reason:g.cause;return c`<div class="detail-session__cause" title=${Q}>
      ${g.cause}
    </div>`},b=g=>{let T=S_($l(g,u));if(hn(T).length===0&&!Ao(g.usage))return"";let w=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${w?"true":"false"}
      title=${w?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${Q=>{Q.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Hk(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let T=$l(g,u),w=S_(T),Q=hn(w);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Zk[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${_s(g)?c`<span
                  class="detail-session__resumed"
                  title=${_s(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ln(g)}</span>
            ${Q.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${Q.length>0?Q.map(re=>c`<span
                      class="detail-session__usage"
                      title=${re.tooltip}
                      >${re.label}</span
                    >`):Ao(g.usage)?c`<span class="detail-session__usage"
                    >${Ao(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ys(g.started_at)}</span>
          </button>
          ${b(g)} ${f(g)} ${_(g)} ${Jk(g)}
          ${a.has(g.attempt_id)&&g.usage?Qk(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${Xk(g,T,t)}
        </div>`})}
    </div>
  `}function I_(e,t={}){return c`
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
          ${nw(e)}
        </div>`:""}
  `}function nw(e){let t=Ho(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Oa(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ao=10;function L_(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function D_(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:ao,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${L_(l.at)?c`<span class="detail-timeline__at"
                  >${L_(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${s>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${s})
        </button>`:""}
  `}var rw=["open","in_progress","deferred","resolved","closed"],ow=[0,1,2,3,4];function P_(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,p=null,f={},_="",b=!1,g=[],T=!1,w=!1,Q={},re={claude:null,codex:null},W=null,q=null,N=0,M=!1,F=!1,K="",D="",A="",C="",R=!1;function oe(){M=!1,F=!1,K="",D="",A="",C="",R=!1}function fe(){re={claude:null,codex:null},W=null,q=null,N+=1}async function be(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function H(v){try{let j=await fetch(v);if(!j.ok)return null;let B=await j.json();if(!B||typeof B!="object"||!Array.isArray(B.accounts))return null;let xe=B.accounts.filter(Ve=>Ve!==null&&typeof Ve=="object"&&!Array.isArray(Ve));return{accounts:xe,active:xe.find(Ve=>Ve.active===!0)||null}}catch{return null}}async function ee(v){q=v;let j=++N,[B,xe,Ve]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage"),be()]);j!==N||v!==u||(re={claude:B,codex:xe},W=Ve,at())}let de=[],Oe=null,Z=null,ae=!1,le="",P=!1,se=0,ie=new Set;function ye(){de=[],Oe=null,Z=null,ae=!1,le="",P=!1,se+=1,ie.clear()}async function ke(v){if(!o)return;let j=++se;try{let B=await Promise.resolve(o("get-comments",{id:v}));if(j!==se||v!==u)return;de=Array.isArray(B)?B:[],ae=!1}catch{if(j!==se||v!==u)return;ae=!0}at()}function Xe(){if(!o||!u)return;let v=p&&typeof p.comment_count=="number"?p.comment_count:null;if(Oe!==u){Oe=u,Z=v,ke(u);return}v!==null&&v!==Z&&(Z=v,ke(u))}function X(v){ie.has(v)?ie.delete(v):ie.add(v),at()}function pe(v){let j=le.trim().length===0;le=v,j!==(v.trim().length===0)&&at()}async function ce(){let v=le.trim();if(!o||!u||v.length===0||P)return;let j=u;P=!0,at();let B=!1;try{let xe=await Promise.resolve(o("add-comment",{id:j,text:v}));Array.isArray(xe)&&xe.length>0&&(B=!0,j===u&&(de=xe,ae=!1,le="",Z=xe.length))}catch{B=!1}B||ve("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),j===u&&(P=!1),at()}let V={onToggle:X,onDraftInput:pe,onSubmit:ce},Ce=t.mdViewer||null,he=null;Ce||(he=document.createElement("div"),he.className="md-viewer-root",document.body.appendChild(he));let De=Ce||Na(he,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Je=zo(qe,{transport:o?(v,j)=>Promise.resolve(o(v,j)):void 0,sessionLogStore:a}),Ue=!1,ne=!1,G=!1,Re=null,et=null,pt=0;function Qe(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function mt(){Ue=!1,ne=!1,G=!1,Re=null,et=null,pt+=1}async function Dt(v){if(!o)return;let j=++pt;ne=!0,G=!1,at();try{let B=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(j!==pt)return;!B||typeof B!="object"||Array.isArray(B)?G=!0:(Re=B,et=Qe(v))}catch{j===pt&&(G=!0)}finally{j===pt&&(ne=!1,at())}}let Et=[],ot=null,ht=0;function Zt(v,j){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${j}`}function x(){Et=[],ot=null,ht+=1}async function te(v,j){if(!o)return;let B=++ht,xe;try{xe=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{xe=null}B!==ht||j!==ot||(Et=xe&&Array.isArray(xe.sessions)?xe.sessions:[],at())}function Me(){if(!o||!u)return;let v=p&&p.metadata,j=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(j===null){x();return}let B=Zt(u,j);ot!==B&&(Et=[],ot=B,te(u,B))}let Ee=[],Pe=[],Be=ao,tt=null,Ot=0;function _e(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function Ae(){Ee=[],Pe=[],Be=ao,tt=null,Ot+=1}async function Ze(v,j){if(!o)return;let B=++Ot,xe;try{xe=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{xe=null}B!==Ot||j!==tt||(Ee=xe&&Array.isArray(xe.events)?xe.events:[],Pe=xe&&Array.isArray(xe.attempts)?xe.attempts:[],Be=ao,at())}function bt(){if(!o||!u)return;let v=_e(u);tt!==v&&(Ee=[],Pe=[],Be=ao,tt=v,Ze(u,v))}function it(){Be+=ao,at()}function ct(){if(Ue=!Ue,Ue&&u&&et!==Qe(u)){Re=null,Dt(u);return}at()}function vt(){let v={};for(let B of Pe)B&&typeof B=="object"&&B.bead_id===u&&(v[String(B.attempt_id)]=B);let j=s?s.get():null;for(let B of j&&j.attempts?Object.values(j.attempts):[]){let xe=B;xe&&xe.bead_id===u&&(v[String(xe.attempt_id)]=xe)}return v}function rt(){return u?Object.values(vt()).sort((j,B)=>(B.started_at||0)-(j.started_at||0)).map(j=>({attempt_id:j.attempt_id,bead_id:j.bead_id,status:j.status,started_at:typeof j.started_at=="number"?j.started_at:null,runner:j.runner||null,model:j.model||null,effort:j.effort||j.observed_effort||null,speed:j.speed||null,session_id:j.session_id||null,resumed_from:j.resumed_from||null,continuation_mode:j.continuation_mode||null,dismissed_at:typeof j.dismissed_at=="number"?j.dismissed_at:null,cause:typeof j.cause=="string"?j.cause:null,cause_detail:j.cause_detail||null,exec_default_preset_id:typeof j.exec_default_preset_id=="string"?j.exec_default_preset_id:null,exec_default_preset_revision:typeof j.exec_default_preset_revision=="number"?j.exec_default_preset_revision:null,exec_values:j.exec_values&&typeof j.exec_values=="object"?j.exec_values:null,usage:j.usage||null,usage_legs:Array.isArray(j.usage_legs)?j.usage_legs:[],delegation_sessions:Array.isArray(j.delegation_sessions)?j.delegation_sessions:[]})):[]}function We(){return u?pr(vt(),u,xt()):null}let E=new Set;function U(v){E.has(v)?E.delete(v):E.add(v),at()}function z(v){let j=s?s.get():null,B=j&&j.attempts?j.attempts[v]:null;Je.open({attempt_id:v,meta:B?{runner:B.runner||void 0,model:B.model||void 0,effort:B.effort||void 0,status:B.status||void 0,session_id:B.session_id||void 0}:{}})}function we(v,j){let B=s?s.get():null,xe=B&&B.attempts?B.attempts[v]:null,_t=(xe&&Array.isArray(xe.delegation_sessions)?xe.delegation_sessions:[]).find(Kt=>Kt&&typeof Kt=="object"&&Kt.launch_id===j);_t&&Je.open({attempt_id:v,launch_id:j,meta:{runner:_t.provider==="claude"?"claude":"codex",role:_t.role,...typeof _t.agent_type=="string"?{agent_type:_t.agent_type}:{},model:_t.model,effort:_t.effort,session_id:_t.session_id,status:_t.status}})}async function Te(v){if(!o||!v)return;let j=o,B=()=>{let Ve=s?s.get():null;return Ve&&typeof Ve.revision=="number"?Ve.revision:0},xe=s?.get()?.attempts?.[v]||null;await Fo({context:{bead_id:xe?.bead_id||u||"",kind:"session",tuple:xe?Ln(xe):""},transport:Ve=>j("worker-attempt-resume",{attempt_id:v,expected_revision:B(),...Ve}),adopt:Ve=>{Ve?.queue&&s?.set&&s.set(Ve.queue)}})}async function $t(v,j){if(!o||!v)return;let B=o,xe=()=>{let St=s?s.get():null;return{bead_id:v,...j==="parallel"?{}:{lane:j},expected_revision:St&&typeof St.revision=="number"?St.revision:0}},Ve=St=>{St?.queue&&s?.set&&s.set(St.queue)},_t=await Promise.resolve(B("worker-queue-place",xe()));if(Ve(_t),_t&&_t.conflict&&(_t=await Promise.resolve(B("worker-queue-place",xe())),Ve(_t)),at(),!_t)return;if(_t.applied===!1&&typeof _t.admission_reason=="string"){ve(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${_t.admission_reason}`,"error",2400);return}if(_t.reason==="rejected"){ve("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(_t.applied===!1)return;let Kt=_t.queue?vs({id:v},_t.queue).location:null;Kt&&"index"in Kt&&ve(`${_p(Kt.lane)} \uB300\uAE30 #${Kt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(v,j){if(j){w=!0,at();return}$t(v,"parallel")}function Rt(v,j){let Ve=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ve&&(Ve!=="parallel"&&!/^s[1-5]$/.test(Ve)||(w=!1,at(),$t(j,Ve)))}function qt(v){!v||!u||Je.open(Bo(v,u,p&&p.status))}let Wt={onOpen:z,onOpenDelegation:we,onResume:Te,onToggleUsage:U,onOpenSessionRef:qt,onCopyResumeCommand:Ct};function Xt(){let v=s?s.get():null,j={...Q};for(let B of[...Fn,...Eo]){let xe=v&&v[B];typeof xe=="string"&&(j[B]=xe)}return j}async function sn(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));Q=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{Q={}}at()}}function xt(){let v=s?s.get():null;return v&&v.runner_catalog||null}function tn(){let v=s?s.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function fn(){let v=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},B=In({pin:{...v,...f},global:Xt(),execution_defaults:tn(),runner_catalog:xt(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Bn(xt(),B)}function Ft(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Gt(v){return v?.compatible===!1}function on(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function He(){let v=Ft(),j=v?.presets.find(B=>B.id===_);if(!(!o||!u||!v||!j||Gt(j)||b)){b=!0,g=[],at();try{let B=await Promise.resolve(o("apply-impl-preset",Qd(u,j.id,v.revision)));if(B&&B.conflict){on(B),ve("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let xe=B&&Array.isArray(B.issue)?B.issue[0]:B?.issue;if(B&&B.applied&&xe&&typeof xe=="object"){p=xe,g=Array.isArray(B.skipped_orchestration_keys)?B.skipped_orchestration_keys.filter(Ve=>typeof Ve=="string"):[];for(let Ve of Zd)delete f[Ve];ve(g.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}B&&B.error==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(B){B&&typeof B=="object"&&B.code==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,at()}}}let I=null;n&&n.subscribe&&(I=n.subscribe(()=>st()));let $e=null;s&&typeof s.subscribe=="function"&&($e=s.subscribe(()=>{u&&at()}));let je=null,At=null;function Ke(){At&&(At(),At=null)}l&&typeof l.subscribe=="function"&&(je=l.subscribe(()=>{u&&at()}));function Lt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Lt);let Bt=Lo(()=>at());Bt.attach();function st(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];p=v.find(B=>B&&B.id===u)||v[0]||p}Xe(),Me(),bt(),at()}}function Ct(v){$n(v).then(j=>{j?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function yn(v){v.preventDefault(),v.stopPropagation(),u&&Ct(u)}function Nt(v,j){v.preventDefault(),v.stopPropagation(),Ct(j)}function kn(v,j,B){v.preventDefault(),v.stopPropagation(),De.open(j,{missing_state:B})}async function y(v,j){let B=Object.hasOwn(f,v),xe=f[v];if(f[v]=j,at(),!(!o||!u))try{let Ve=await Promise.resolve(o("update-exec-settings",Xd(u,v,j.length===0?null:j))),_t=Array.isArray(Ve)?Ve[0]:Ve;if(!_t||typeof _t!="object"||!_t.id)throw new Error("exec settings readback failed");p=_t,delete f[v],at()}catch(Ve){throw B?f[v]=xe:delete f[v],at(),ve("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ve}}function d(v){v.catch(()=>{})}async function m(v,j){let B=p||{},xe=B.metadata&&typeof B.metadata=="object"?B.metadata:{},Ve={};for(let St of["impl_runtime","impl_model","impl_effort"])Ve[St]=Object.hasOwn(f,St)?f[St]:typeof xe[St]=="string"?xe[St]:"";Ve[v]=j;let _t=tp(Ve,xt(),fn()),Kt={};for(let St of["impl_runtime","impl_model","impl_effort"])Kt[St]=f[St],f[St]=_t[St]||"";if(at(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,..._t,orchestration_runtime:fn()})).then(St=>{let ge=Array.isArray(St)?St[0]:St;if(!ge||typeof ge!="object"||!ge.id)throw new Error("implementation target readback failed");p=ge;for(let ut of["impl_runtime","impl_model","impl_effort"])delete f[ut];at()}).catch(St=>{for(let ge of["impl_runtime","impl_model","impl_effort"])Kt[ge]===void 0?delete f[ge]:f[ge]=Kt[ge];throw at(),ve("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),St})}async function $(v,j,B){if(!o||!u)return!1;try{let xe=await Promise.resolve(o(v,j)),Ve=Array.isArray(xe)?xe[0]:xe;return Ve&&typeof Ve=="object"&&Ve.id?(p=Ve,!0):(ve(B,"error"),!1)}catch(xe){return xe&&typeof xe=="object"&&xe.code==="bd_readback_failed"?(ve("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ve(Y(B,xe),"error"),!1)}}function Y(v,j){let B=j&&typeof j=="object"&&typeof j.message=="string"?j.message.trim():"";return B.length>0?`${v} \u2014 ${B}`:v}function J(v){setTimeout(()=>{try{let j=e.querySelector(v);j&&typeof j.focus=="function"&&j.focus()}catch{}},0)}function me(){M=!0,K=p&&p.title||"",at(),J('.detail-edit__input[data-edit="title"]')}function Ne(v){K=v.target.value}function wt(){M=!1,K="",at()}function Ge(){$("edit-text",{id:u,field:"title",value:K},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(M=!1,K=""),at()})}function yt(){F=!0,D=p&&p.description||"",at(),J('.detail-edit__textarea[data-edit="description"]')}function Ut(v){D=v.target.value}function S(){F=!1,D="",at()}function L(){$("edit-text",{id:u,field:"description",value:D},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(F=!1,D=""),at()})}function Le(v,j,B,xe){if(v.key==="Escape"){v.stopPropagation(),B();return}v.key==="Enter"&&(!xe||v.ctrlKey||v.metaKey)&&(v.preventDefault(),j())}function Ie(v){let j=v.target.value;$("update-status",{id:u,status:j},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function ft(v){let j=Number(v.target.value);$("update-priority",{id:u,priority:j},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function dt(v){A=v.target.value}function nn(){let v=A.trim();v.length!==0&&$("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(j=>{j===!0&&(A=""),at()})}function Mr(v){if(v.key==="Escape"){v.stopPropagation(),A="",at();return}v.key==="Enter"&&(v.preventDefault(),nn())}function Vn(v){$("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>at())}let or={onCopyPath:Nt,onOpenDoc:kn};function k(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function h(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function O(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function ue(v,j){let B=Se(j),xe=[];return v.length>0&&xe.push(v),B&&xe.push(B),xe.length>0?xe.join(`
`):void 0}function Se(v){if(!v||typeof v!="object")return;let j=typeof v.status=="string"?v.status:"",B=typeof v.title=="string"?v.title:"";return j.length>0&&B.length>0?`${j} \xB7 ${B}`:void 0}function Fe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function nt(){return t.depCandidates?t.depCandidates():null}async function Mt(v,j,B){let xe=Fe(),Ve=u;if(!Ve)return;if(xe.length===0){ve("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let _t=await $(v,{a:Ve,b:j,view_id:Ve,root_dir:xe},B),Kt=_t===!0||_t!==!1&&_t.saved===!0;Kt&&t.onDepChanged&&t.onDepChanged({type:v,a:Ve,b:j}),v==="dep-add"&&Kt&&(C="",R=!1),at()}function an(v){if(!u)return;let j=globalThis.confirm;typeof j=="function"&&!j(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Mt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function gt(v){v.disabled||gn(v.bead_id)}function gn(v){Mt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Tn(v,j){let B=C.trim();return!Sf(B)||B===u||j.includes(B)||v.some(xe=>xe.bead_id===B)?null:B}function qr(v){C=v.target.value,R=!0,at()}function Yn(){R||(R=!0,at())}function sr(v,j,B){if(v.key==="Escape"){v.stopPropagation(),C="",R=!1,at();return}v.key==="Enter"&&(v.preventDefault(),j.length===1&&!j[0].disabled?gt(j[0]):B!==null&&gn(B))}function ir(v,j){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${C}
        @focus=${Yn}
        @input=${qr}
        @keydown=${B=>sr(B,v,j)}
      />
      ${R||C.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&j===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(B=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${B.bead_id}
                      ?disabled=${B.disabled}
                      title=${un(B.reason)}
                      @click=${()=>gt(B)}
                    >
                      <span class="detail-dep-add__repo"
                        >${B.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${B.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${B.title}</span
                      >
                    </button>`)}
            ${j===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${j}
                  data-dep-direct="1"
                  @click=${()=>gn(j)}
                >
                  <span class="detail-dep-add__id">${j}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function ar(v,j){let B=j.get(v.id),xe=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${un(v.title)}
          @click=${()=>B===void 0?i(v.id):i(v.id,B)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${un(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${xe}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>an(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function mn(v){let j=Array.isArray(v.dependencies)?v.dependencies:[],B=Array.isArray(v.dependents)?v.dependents:[],xe=[];for(let ge of j){let ut=k(ge);ut.length>0&&h(ge)==="blocks"&&xe.push({id:ut,label:`\u26D3 ${ut}`,kind:"pred",title:ue("\uB9C9\uB294",ge)})}for(let ge of B){let ut=k(ge);ut.length>0&&h(ge)==="blocks"&&xe.push({id:ut,label:`\u2192 ${ut}`,kind:"succ",title:ue("\uB9C9\uD788\uB294",ge)})}for(let ge of j){let ut=k(ge),en=h(ge);if(ut.length>0&&en!=="blocks"){let ln=O(en);xe.push({id:ut,label:`${ln.glyph}${ut}`,kind:"other",title:ue(ln.relation,ge)})}}let Ve=nt(),_t=new Map;if(Ve)for(let ge of Ve.issues)_t.has(ge.bead_id)||_t.set(ge.bead_id,ge.root_dir);let Kt=Ve&&u?Af(xf(u,Ve),C):[],St=Tn(Kt,xe.filter(ge=>ge.kind==="pred").map(ge=>ge.id));return c`
      <div class="detail-section-label">의존성</div>
      ${xe.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${xe.map(ge=>ar(ge,_t))}
          </div>`}
      ${Ve===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ir(Kt,St)}
    `}function lr(v){let j=v.metadata||{},B=v.workflow||{},xe=B.stages||{},Ve=xe.spec&&xe.spec.stale,_t=xe.impl&&xe.impl.stale,Kt=B.quick_fix_review?.state==="stale",St=xe.plan||null,ge=B.route_source==="derived",ut=B.route||j.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ge?" detail-kv__v--derived":""}"
          title=${ge?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ge?"unset":ut}</span
        >
      </div>
      ${B.route!=="quick_fix"||Object.hasOwn(j,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${j.spec_review||"\uC5C6\uC74C"}${Ve?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${B.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${St?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${St?.approval_receipt||"\uC5C6\uC74C"}${St?.approval_state==="stale"?" \xB7 stale":St?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${B.route!=="quick_fix"||Object.hasOwn(j,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${j.impl_review||"\uC5C6\uC74C"}${_t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${B.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${B.resolver.attempt} \xB7 ${B.resolver.prior_sha} \u2192 ${B.resolver.sha}`}
              >${`${B.resolver.prior_sha.slice(0,7)} \u2192 ${B.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${B.route==="quick_fix"||Object.hasOwn(j,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${j.quick_fix_review||"\uC5C6\uC74C"}${Kt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${B.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${B.planned_execution.kind}</span>
            </div>
            ${B.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${B.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${B.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${ur(B.exec_receipt)}</span
            >
          </div>`:""}
      ${B.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${B.impl_entry.actor}@${B.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${j.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${j.pr_url}</span>
          </div>`:""}
    `}let kr={route:["quick_fix","spec_backed","full_plan"]};async function wr(v,j){let B=j.target.value;if(v==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&B!=="full_plan"&&!window.confirm(`full_plan \u2192 ${B||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){at();return}await $("update-workflow-meta",{id:u,key:v,value:B},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),at()}function jr(v){let j=v.metadata||{};return c` ${((xe,Ve)=>{let _t=kr[xe],Kt=typeof j[xe]=="string"?j[xe]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${xe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${xe}
          data-edit=${`wfmeta-${xe}`}
          @change=${St=>wr(xe,St)}
        >
          <option value="" ?selected=${!_t.includes(Kt)}>
            ${Ve}
          </option>
          ${_t.map(St=>c`<option value=${St} ?selected=${Kt===St}>${St}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ze(v,j){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${K}
            @input=${Ne}
            @keydown=${B=>Le(B,Ge,wt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ge}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${wt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${hn(j).map(B=>c`<span class="detail-usage-total" title=${B.tooltip}
              >${B.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${me}
        >
          ✎
        </button>
      </div>
    `}function Yt(v){let j=rn(v.created_at),B=rn(v.updated_at);return!j&&!B?c``:c`
      ${j?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${j}</span>
          </div>`:""}
      ${B?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${B}</span>
          </div>`:""}
    `}function On(v,j){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ie}
        >
          ${rw.map(B=>c`<option value=${B} ?selected=${B===v}>${B}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ft}
        >
          ${ow.map(B=>c`<option value=${String(B)} ?selected=${B===j}>
                P${B}
              </option>`)}
        </select>
      </div>
    `}function Xo(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${yt}
            >
              ✎
            </button>`}
      </div>
      ${F?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${D}
              @input=${Ut}
              @keydown=${j=>Le(j,L,S,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${L}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${S}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Qo(v){let j=typeof v.notes=="string"?v.notes:"";return j.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${j}</div>
    `}function ei(v){let j=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${j.map(B=>c`<span class="detail-label-chip"
              >${B}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${B}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+B}
                @click=${()=>Vn(B)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${A}
            @input=${dt}
            @keydown=${Mr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nn}
          >
            추가
          </button>
        </span>
      </div>
    `}function ti(){if(!u)return c``;let v=p||{},j=String(v.id||u),B=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",xe=We(),Ve=v.status||"open",_t=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Kt=v.description||"",St=s?s.get():null,ge=St&&Ve!=="closed"?vs({...v,id:j},St):null,ut=St?ks(St):null,en={...v,metadata:{...v.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${yn}
            >
              ${j}
            </button>
            ${ge?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${j}
                  ?disabled=${!ge.placeable}
                  title=${Qr(ge)}
                  @click=${()=>kt(j,ut)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${ge&&w&&ut?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${ln=>Rt(ln,j)}
              >
                ${Wl(ut,j)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${j}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{w=!1,at()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${ze(B,xe)}
          ${b_(en,{onChipToggle:ln=>Bt.toggle({bead_id:j,chip_key:ln}),isChipOpen:ln=>Bt.isOpen({bead_id:j,chip_key:ln})})}
          ${h_({metadata:en.metadata,workspace_values:Xt(),catalog:xt(),execution_defaults:tn(),expanded:T,presets:Ft()?.presets||[],preset_id:_,preset_busy:b,skipped_orchestration_keys:g},{onToggle:ln=>{T=ln,at()},onEdit:(ln,ni)=>{if(ln==="impl_runtime"||ln==="impl_model"||ln==="impl_effort"){d(m(ln,ni??""));return}d(y(ln,ni??""))},onPresetSelect:ln=>{_=ln,g=[],at()},onPresetApply:()=>{He()}})}
          ${x_({md:en.metadata,catalog:re,workspace_defaults:W,handlers:{onExecChange:(ln,ni)=>d(y(ln,ni))}})}
          ${On(Ve,_t)} ${Yt(v)}
          ${Xo(Kt)}
          ${f_(de,V,{expanded:ie,draft:le,sending:P,error:ae})}
          ${Qo(v)} ${ei(v)} ${mn(v)}
          ${lr(v)} ${jr(v)}
          ${c_(v,or)}
          ${I_({expanded:Ue,loading:ne,error:G,data:Re},{onToggle:ct})}
          ${O_(rt(),Wt,{total:xe,expanded:E,catalog:xt()},Et)}
          ${D_({events:Ee,shown:Be},{onMore:it})}
        </div>
      </div>
    `}function at(){lt(ti(),e)}return{load(v){v!==u&&(f={},w=!1,_="",g=[],T=!1,oe(),ye(),mt(),x(),Ae(),fe()),u=v,p=null,!At&&t.subscribeCandidates&&(At=t.subscribeCandidates(()=>{u&&at()})),st(),sn(),q!==v&&ee(v)},clear(){u=null,p=null,f={},w=!1,_="",b=!1,g=[],T=!1,oe(),ye(),mt(),x(),Ae(),fe(),Ke(),De.close(),Je.close(),lt(c``,e)},destroy(){I&&(I(),I=null),$e&&($e(),$e=null),je&&(je(),je=null),Ke(),document.removeEventListener("keydown",Lt),Bt.detach(),Ce||(De.destroy(),he&&he.parentNode&&he.parentNode.removeChild(he)),Je.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,p=null,fe(),_="",b=!1,g=[],ye(),mt(),x(),Ae(),lt(c``,e)}}}function N_(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,p,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var sw="(max-width: 640px)";function qa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(sw),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function iw(){return{lanes:{done:!0},areas:{}}}function Xs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function aw(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Xs(r.lanes),areas:Xs(r.areas)}:{lanes:Xs(r),areas:{}}}catch{return null}}function M_(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ja(e,t=iw()){let n={lanes:Xs(t.lanes),areas:Xs(t.areas)},r=aw(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},M_(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},M_(e,o),s}}}function Kc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Fa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ba(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:p,onDragBegin:f,candidate_drop:_}=e,b=[],g=null,T=!1,w=null,Q=null,re=null;function W(){w!==null&&clearTimeout(w),w=setTimeout(()=>{w=null,T=!1},0)}function q(){return i()??null}function N(){let X=new Map,pe=o();for(let ce of Array.isArray(pe)?pe:[]){if(!ce||typeof ce!="object")continue;let V=ce.bead_blocked_by&&typeof ce.bead_blocked_by=="object"?ce.bead_blocked_by:{};for(let[Ce,he]of Object.entries(V))Array.isArray(he)&&X.set(Ce,Fa(he));for(let Ce of[...Array.isArray(ce.runnable)?ce.runnable:[],...Array.isArray(ce.session_active)?ce.session_active:[]])Ce&&typeof Ce.bead_id=="string"&&Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&X.set(Ce.bead_id,Fa(Ce.blocked_by))}return X}function M(){let X=new Map,pe=new Map,ce=o();for(let V of Array.isArray(ce)?ce:[]){if(!V||typeof V!="object")continue;let Ce=V.bead_blocked_by&&typeof V.bead_blocked_by=="object"?V.bead_blocked_by:{};for(let[he,De]of Object.entries(Ce))Array.isArray(De)&&X.set(he,Fa(De));for(let he of Array.isArray(V.runnable)?V.runnable:[])he&&typeof he.bead_id=="string"&&Array.isArray(he.blocked_by)&&pe.set(he.bead_id,Fa(he.blocked_by))}for(let V of b)for(let Ce of[X,pe]){let he=Ce.get(V.a);he!==void 0&&Ce.set(V.a,V.type==="dep-remove"?he.filter(De=>De!==V.b):he.includes(V.b)?he:[...he,V.b])}return{snapshot:X,runnable:pe}}function F(){let X=N();for(let pe of b){let ce=(X.get(pe.a)||[]).slice();pe.type==="dep-remove"?X.set(pe.a,ce.filter(V=>V!==pe.b)):ce.includes(pe.b)||X.set(pe.a,[...ce,pe.b])}return X}function K(X=r(),pe=q()){let ce=new Map;for(let Ue of Array.isArray(pe?.lanes)?pe.lanes:[]){let ne=new Map;for(let G of Array.isArray(Ue?.entries)?Ue.entries:[])G&&typeof G.bead_id=="string"&&ne.set(G.bead_id,G.dep_created_by_lane===!0);ce.set(typeof Ue?.id=="string"?Ue.id:"",ne)}let V=new Map,Ce=new Map,he=new Set,De=new Set;for(let Ue of X.chain_lanes){let ne=ce.get(Ue.lane_id);V.set(Ue.lane_id,{status:Ue.status,entries:Ue.rows.map((G,Re)=>({bead_id:G.id,root_dir:G.root_dir,...Re===0?{}:{dep_created_by_lane:ne?.get(G.id)===!0}}))});for(let G of Ue.rows)Ce.set(G.id,Ue.lane_id),G.fixed&&he.add(G.id),G.unplaced||De.add(G.id)}let qe=new Map;for(let Ue of X.parallel_rows)typeof Ue.queue_index=="number"&&qe.set(Ue.id,Ue.queue_index);for(let Ue of X.queue_groups)for(let ne of Ue.sublanes.serial)for(let G of ne.items)typeof G.queue_index=="number"&&qe.set(G.id,G.queue_index);let Je=M();return{blocked_by_map:F(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(X.owner_of)),cross_lanes:V,owner_lane_of:Ce,fixed_members:he,placed_members:De,parallel_rows:X.parallel_rows.map(Ue=>({bead_id:Ue.id,root_dir:Ue.root_dir,queue_index:Ue.queue_index??0})),parallel_raw_length:new Map(Object.entries(X.parallel_raw_length)),queue_index_of:qe}}function D(X,pe){let ce=r();for(let Ce of[...ce.runnable,...ce.queue,...ce.running,...ce.pr_wait,...ce.done])if(!(Ce.non_occupying||Ce.id!==pe)){if(Ce.root_dir===X)return Ce.expected_revision;break}let V=ce.queue_groups.find(Ce=>Ce.root_dir===X);return V?V.revision:0}async function A(X,pe,ce,V){if(!t)return null;let he=await t(X,{...pe,...ce?{root_dir:ce}:{},expected_revision:V});if(he&&he.conflict){he.queue&&p?.(ce,he.queue);let De=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:V;he=await t(X,{...pe,...ce?{root_dir:ce}:{},expected_revision:De})}return he&&he.queue&&p?.(ce,he.queue),he}async function C(X,pe,ce,V,Ce){try{let he=await A(X,pe,ce,V.get(ce)??D(ce,Ce.bead_id));return!he||typeof he.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(he.queue&&typeof he.queue.revision=="number"&&V.set(ce,he.queue.revision),he.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):he.applied===!1?(a(he.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${he.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):he.queue&&typeof he.queue.revision=="number"?he.queue.revision:V.get(ce)??0)}catch(he){return a(Kc(he),"error"),null}}async function R(X,pe,ce=new Map){if(X.type==="worker-queue-disarm"){try{let V=await A(X.type,X.payload,X.root_dir,ce.get(X.root_dir)??D(X.root_dir,pe));V&&V.queue&&typeof V.queue.revision=="number"&&ce.set(X.root_dir,V.queue.revision)}catch{}return!0}if(X.type==="worker-queue-place"||X.type==="worker-queue-reorder"||X.type==="worker-queue-remove")return await C(X.type,X.payload,X.root_dir,ce,{bead_id:pe})!==null;try{return(X.type==="dep-add"||X.type==="dep-remove")&&t&&await t(X.type,{a:X.a,b:X.b,...X.root_dir?{root_dir:X.root_dir}:{}}),!0}catch(V){return a(Kc(V),"error"),!1}}function oe(X){(X.type==="dep-add"||X.type==="dep-remove")&&(b=[...b,{type:X.type,a:X.a,b:X.b}])}async function fe(X,pe){if(!t)return{ok:!1};try{let ce=await t(X.type,{...X.payload,expected_revision:pe});return!ce||typeof ce.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ce.revision}}catch(ce){let V=ce,Ce=V&&V.code==="conflict"?V.details?.cross_lanes:null;return Ce&&typeof Ce.revision=="number"&&Array.isArray(Ce.lanes)?{ok:!1,conflict:Ce}:(a(Kc(ce),"error"),{ok:!1})}}async function be(X,pe,ce){let V=new Map,Ce=[],he=X.ops.slice(0,X.lane_op_index),De=X.ops.slice(X.lane_op_index);for(let Je of he){if(!await R(Je,ce,V))return{done:!0};oe(Je)}let qe=pe;for(let Je of X.lane_ops){if(qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Ue=await fe(Je,qe);if(!Ue.ok)return Ue.conflict?{done:!1,conflict:Ue.conflict}:{done:!0};qe=Ue.revision}for(let Je of De){if(!await R(Je,ce,V))return{done:!0};oe(Je),Je.type==="dep-add"&&Ce.push(Je)}for(let Je of wf(Ce))qe=await H(Je,qe);return{done:!0}}async function H(X,pe){if(pe===null||!t)return pe;let ce=X.pairs,V=pe;for(let Ce=0;Ce<2;Ce+=1){if(ce.length===0)return V;try{let he=await t("monitor-lane-provenance",{lane_id:X.lane_id,pairs:ce.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:V});return he&&typeof he.revision=="number"?he.revision:V}catch(he){let De=he,qe=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!qe||typeof qe.revision!="number"||!Array.isArray(qe.lanes))return V;let Je=qe.lanes.find(Ue=>Ue&&Ue.id===X.lane_id);ce=$f(Array.isArray(Je?.entries)?Je.entries:[],ce),V=qe.revision}}return V}async function ee(X,pe,ce=[]){b=ce,l("",0);let V=r(),Ce=q();for(let he=0;;he+=1){let De=X(K(V,Ce));if("refused"in De){a(De.refused,"error");break}let qe=await be(De,V.cross_lanes_revision,pe);if(qe.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(he>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=s(qe.conflict);V=Je.lanes,Ce=Je.raw_lanes}b=[],u()}async function de(X,pe){await ee(ce=>ya(X,pe,ce),X.bead_id)}function Oe(X,pe){let ce=pe&&typeof pe.closest=="function"?pe.closest("[data-row-index]"):null;if(ce&&X.contains(ce)){let V=Number(ce.getAttribute("data-row-index"));return Number.isFinite(V)?V:0}return X.querySelectorAll("[data-row-index]").length}function Z(X){let pe=typeof X?.closest=="function"?X.closest(".worker-pane--collapsed[data-lane]"):null;if(!pe)return null;let ce=pe.getAttribute("data-lane");return ce==="queue"?{zone:pe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ce==="candidate"&&_===!0?{zone:pe,target:{kind:"candidate"}}:null}function ae(X){let pe=X.target;if(!g)return null;let ce=typeof pe?.closest=="function"?pe.closest("[data-drop]"):null;if(!ce)return Z(pe);let V=ce.getAttribute("data-drop");if(V==="candidate")return{zone:ce,target:{kind:"candidate"}};if(V==="parallel")return{zone:ce,target:{kind:"parallel",marker_index:Oe(ce,pe)}};if(V==="chain")return{zone:ce,target:{kind:"chain",lane_id:ce.getAttribute("data-lane-id")||"",marker_index:Oe(ce,pe)}};if(V==="repo-serial"){let Ce=ce.getAttribute("data-root-dir")||"";if(Ce!==g.root_dir)return null;let he=typeof pe?.closest=="function"?pe.closest("[data-queue-index]"):null,De=he&&ce.contains(he)?he.getAttribute("data-queue-index"):ce.getAttribute("data-lane-length"),qe=Number(De);return{zone:ce,target:{kind:"repo-serial",root_dir:Ce,lane_id:ce.getAttribute("data-lane-id")||"",index:Number.isFinite(qe)?qe:0}}}return null}function le(){for(let X of Array.from(n.querySelectorAll(".is-drop-over")))X.classList.remove("is-drop-over")}function P(X){Q=X.target instanceof Element?X.target:null}function se(X){let pe=X.target,ce=typeof pe?.closest=="function"?pe.closest('[draggable="true"][data-bead-id]'):null,V=ce?ce.closest("[data-drag-kind]"):null;if(!V)return;if(ce&&Q&&ce.contains(Q)&&typeof Q.closest=="function"&&Q.closest("input, button, a")){X.preventDefault();return}let Ce=V.getAttribute("data-bead-id")||"",he=V.getAttribute("data-drag-kind")||"",De=V.getAttribute("data-root-dir")||"";if(!Ce||!he)return;let qe=V.getAttribute("data-queue-index")||"",Je=Number(qe),Ue=V.getAttribute("data-lane-id")||"";g={kind:he,bead_id:Ce,root_dir:De,...qe!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...Ue?{lane_id:Ue}:{}},T=!0,f?.(),n.classList.add("is-dragging");try{X.dataTransfer?.setData("text/plain",Ce),X.dataTransfer&&(X.dataTransfer.effectAllowed="move")}catch{}}function ie(X){let pe=ae(X);pe&&(X.preventDefault(),X.dataTransfer&&(X.dataTransfer.dropEffect="move"),pe.zone.classList.add("is-drop-over"))}function ye(X){let pe=X.target;typeof pe?.closest=="function"&&(pe.closest("[data-drop]")?.classList.remove("is-drop-over"),pe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ke(){g=null,le(),n.classList.remove("is-dragging"),W()}function Xe(X){let pe=ae(X),ce=g;g=null,le(),n.classList.remove("is-dragging"),!(!pe||!ce)&&(X.preventDefault(),de(ce,pe.target))}return{attach(X){re||(re=X,X.addEventListener("pointerdown",P),X.addEventListener("dragstart",se),X.addEventListener("dragover",ie),X.addEventListener("dragleave",ye),X.addEventListener("drop",Xe),X.addEventListener("dragend",ke))},detach(){w!==null&&(clearTimeout(w),w=null);let X=re;re=null,X&&(X.removeEventListener("pointerdown",P),X.removeEventListener("dragstart",se),X.removeEventListener("dragover",ie),X.removeEventListener("dragleave",ye),X.removeEventListener("drop",Xe),X.removeEventListener("dragend",ke))},isDragging(){return g!==null},consumeClickSuppression(){let X=T;return T=!1,X},applyDrop:de,runPlanned:ee,dropModel:K,sendOp:R,sendQueueCas:C,rememberDep:oe}}function pn(e){return e&&typeof e=="object"?e:{}}function lw(e,t){for(let n of Object.values(pn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function cw(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ua(e,t){let n=pn(pn(t).attempts)[e];if(!n)return null;let r=pn(pn(t).runner_catalog),o=pn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=pn(o[i]),l=pn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=lw(e,pn(t)),p=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:p,fresh_current:!1}}function Wa(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=pn(pn(pn(n).runner_catalog).runners),a=pn(l[r.value]),u=Object.keys(pn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function Ha(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Go(e,t){if(!e)return"";let n=pn(pn(pn(t).runner_catalog).runners),r=pn(pn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(n).map(s=>c`<option value=${s} ?selected=${s===e.runner}>
                ${s}
              </option>`)}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(n).map(([s,l])=>c`<optgroup label=${s}>
                ${Object.keys(pn(l?.models)).map(a=>c`<option
                      value=${JSON.stringify([s,a])}
                      ?selected=${s===e.runner&&a===e.model}
                    >
                      ${a}
                    </option>`)}
              </optgroup>`)}
        </select>
      </label>
      ${e.runner==="claude"?c`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${e.account?"":c`<option value="" selected>계정 선택</option>`}
              ${e.account&&!o.some(s=>s?.email===e.account)?c`<option value=${e.account} selected>
                    ${e.account} (목록에 없음)
                  </option>`:""}
              ${o.map(s=>{let l=cw(s),a=s.alias||s.email;return c`<option
                  value=${s.email}
                  ?selected=${s.email===e.account}
                  ?disabled=${!l.eligible}
                  title=${l.reason}
                >
                  ${a}${l.reason?` \u2014 ${l.reason}`:""}
                </option>`})}
            </select>
          </label>`:""}
      <label class="provider-resume-dialog__fresh">
        <input
          type="checkbox"
          class="provider-resume-dialog__fresh-input"
          .checked=${e.fresh_current}
        />
        새 세션으로
      </label>
    </div>
    ${i||e.fresh_current?c`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`:""}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${e.runner==="claude"&&!e.account}
        title=${e.runner==="claude"&&!e.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
      >
        이어하기
      </button>
    </div>
  </dialog>`}function za(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Gc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."}),Vc=Object.freeze({verify_cmd_failed:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deploy_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_red:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",gh_observation_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ref_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",merge_sha_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_rev_unavailable:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ff_diverged:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",deployment_target_not_covering_merge:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",repo_ops_worktree_unowned:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",manual_target_missing:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",base_unresolved:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",bootstrap_not_approved:"Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",foreign_landing_unpinned:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_checkout_unavailable:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_deploy_unsupported:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",interrupted_without_terminal_exit:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",cleanup_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",retry_exhausted:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",conflict_unresolved:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",internal_record_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",repair_lane_retired:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694."}),Yc=Object.freeze({revision_conflict:"\uC791\uC5C5 \uBAA9\uB85D\uC774 \uAC31\uC2E0\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC0C1\uD0DC\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",stale_work_conflict:"\uC774\uC804 \uC791\uC5C5\uC758 \uD655\uC778 \uACB0\uACFC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD45C\uC2DC\uB41C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",waiting_lane_changed:"\uB300\uAE30\uC5F4 \uBC30\uCE58\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC704\uCE58\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",discard_in_progress:"\uC774 \uC791\uC5C5\uC758 \uD3D0\uAE30\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",action_in_flight:"\uB2E4\uB978 \uC791\uC5C5 \uCC98\uB9AC\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",bead_running:"\uC774 \uC774\uC288\uC758 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC2E4\uD589 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",external_pr_owner:"\uB2E4\uB978 \uC138\uC158\uC774 \uAD00\uB9AC\uD558\uB294 PR\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 PR\uACFC \uC138\uC158 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",remote_branch_owner:"\uC6D0\uACA9 \uBE0C\uB79C\uCE58\uAC00 \uB0A8\uC544 \uC788\uC5B4 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBE0C\uB79C\uCE58\uC640 PR \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",base_identity_changed:"\uAE30\uC900 \uBE0C\uB79C\uCE58\uC758 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uAE30\uC900 \uBE0C\uB79C\uCE58\uB97C \uD655\uC778\uD558\uC138\uC694.",worktree_identity_changed:"\uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uC758 \uC2DD\uBCC4 \uC815\uBCF4\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB97C \uD655\uC778\uD558\uC138\uC694.",remote_ref_observe_failed:"\uC6D0\uACA9 PR\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0\uACFC \uC811\uADFC \uAD8C\uD55C\uC744 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694."});var q_={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},j_={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},F_={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function uw(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function dw(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=uw(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(j_,n))return j_[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Qs(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of Qs(e)){if(Object.hasOwn(q_,t))return q_[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function U_(e){return Qs(e).length===0?null:Ka(e)||"\uC2E4\uD328"}function lo(e){let t=null;for(let n of Qs(e))Object.hasOwn(Gc,n)&&(t=Gc[n]);return t}function W_(e){let t=null;for(let n of Qs(e))Object.hasOwn(Vc,n)&&(t=Vc[n]);return t}function Dr(e,t){if(typeof e=="string"&&Object.hasOwn(F_,e))return F_[e];let n=dw(e,t);if(n!==null)return n;let r=Ka(e),o=lo(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function H_(e,t){let n=Ka(e)??Ka(t),r=lo(t)??lo(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var pw=new Set(["repo_operation_timeout_unresolved"]);function fw(e){for(let t of Qs(e))if(pw.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function _w(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function z_(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||fw(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(_w(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Zr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var B_={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function K_(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(B_,t.blocked_reason)?B_[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Dr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Dr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function mw(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var G_=200;function gw(e){return typeof e!="string"||e.length===0?"":e.length>G_?`${e.slice(0,G_)}\u2026`:e}function hw(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Xc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function bw(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Xc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Xc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Y_(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${V_(i.at)?c`<span class="rtile__history-at"
                    >${V_(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${o?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${Xr(n)}
          </p>`:""}`}function V_(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}var X_=Object.freeze({settlement:"\uC815\uB9AC \uC7AC\uC2DC\uB3C4",session:"\uC774\uC5B4\uD558\uAE30"});function yw(e){let t=W_(e.cause);if(!t)return"";let n=Io(e.quickfix_landing);if(e.resume_eligible!==!1)return`${t} ${n==="settlement"?"\uC544\uB798 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB20C\uB7EC \uC2E4\uD328\uD55C \uCC29\uC9C0 \uD6C4 \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.":"\uC6D0\uC778\uC744 \uD655\uC778\uD55C \uB4A4 \uC544\uB798 [\uC774\uC5B4\uD558\uAE30]\uB85C \uAC19\uC740 \uC138\uC158\uC5D0\uC11C \uC791\uC5C5\uC744 \uACC4\uC18D\uD558\uC138\uC694."}`;let r=typeof e.resume_reason=="string"&&e.resume_reason.length>0?e.resume_reason:"";return e.attempt_id?[t,r,"\uC138\uC158 \uAE30\uB85D\uC744 \uC5F4\uC5B4 \uC6D0\uC778\uC744 \uD655\uC778\uD558\uC138\uC694."].filter(o=>o.length>0).join(" "):[t,r].filter(o=>o.length>0).join(" ")}function vw(e,t){if(!e||e.open!==!0)return"";let n=lo(e.cause)||Dr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${wn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,p=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=Y_(e),_=yw(e),b=X_[Io(e.quickfix_landing)];return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${f?c`<div>
            <dt>이력</dt>
            <dd>${f}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${_?c`<div>
            <dt>다음</dt>
            <dd>${_}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${s?c`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?c`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${p?c`<div>
            <dt>비용</dt>
            <dd>${p}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?`${b} \uAC00\uB2A5`:e.resume_reason||`${b} \uBD88\uAC00`}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — ${b}로 배포·정리를 재개
        </p>`:""}
  </div>`}function kw(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function ww(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function $w(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Xc(e.resets_at),r=kw(e.auto_resume),o=ww(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${o?c`<div>
            <dt>계정 전환</dt>
            <dd>${o}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Xr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function xw(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Aw=new Set(["codex-runner"]);function Sw(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Aw.has(b.agent_type))),a=l.filter(b=>b&&b.state==="live"),u=l.filter(b=>b&&b.state!=="live"),p=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",f=r?wn(r.updated_at,t):"",_=p?`\uCD5C\uADFC \uD65C\uB3D9 ${p}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${wn(s,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${_}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Ew={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Tw(e){if(!e)return"";let t=Ew[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Rw(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=gw(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=Y_(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function Qc(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(he=>he&&he.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,p=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!p,_=a&&e.failure||null,b=p&&e.wait||null,g=f&&e.hold||null,T=a||u||p||f,w=!!e.paused,Q=s||T?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):w?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?mw(t-e.started_at):"\u2014",re=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,W=_s(e),q=hn(e.usage),N=dr(e.usage),M=e.conflict_resolution?w?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,F=e.base_exception||null,K=e.landing,D=e.attempt_id&&e.attempt_id===n,A=r.monitor||null,C=xw(A),R=Qi(A?.cross_lane_chip),oe=A?Xi(A.dependency_chips):"",fe=Sw(A,t,w,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),be=o&&e.workflow?.chips?.exec_receipt||null,H=eo(e.workflow),ee=Ji(e.rec,e.chip_popover?.chip_key==="rec"),de=e.chip_popover?Do(e.chip_popover.content):"",Oe=be?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(be)}`}
        >${`${be.kind}:${wi(be)}`}</span
      >`:"",Z=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Cs(i)}</span
      >`:"",ae=C||R||H||Z||Oe||ee?c`<div class="rtile__meta">
          ${C}${R}${H}${Z}${Oe}${ee}${de}
        </div>`:"",le=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${U_(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",P=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${hw(e.retry)}</span
        >`:p?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:f&&g?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${g.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${bw(g)}
            </button>`:"",se=c`${M?c`<span class="worker-mini__badge">${M}</span>`:""}${F?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${F}</span
      >`:""}${le}${P}`,ie=o?"":No(e),ye=Io(l?.quickfix_landing),ke=X_[ye],Xe=ye==="settlement"?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589 (\uC138\uC158\uC744 \uC5F4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",X=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",pe=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",ce=pe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",V=ce?c`${pe}${ce}`:pe,Ce=Zi(e.workflow,!1);return c`<div
    class="rtile${D?" rtile--sel":""}${w?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${T?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${p?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
    data-route=${un(Ce.route)}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ea(e.priority)}${W?c`<span class="rtile__resumed" title=${W}>↻</span>`:""}${se}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${Q}</span>`:""}${Tw(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${Q}</span>`}
        ${o||T?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${ye}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ke} \uBD88\uAC00`:Xe}
                  aria-label=${ke}
                >
                  ↻ ${ke}
                </button>
                ${V}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${w?c`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${V}`}${a?"":X}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${T?Rw(a?"parked":u?"retry_wait":p?"waiting":"provider_hold",a?_:p?b:g,V,p?oe:"",a?X:"",a&&!!e.discard?.error):s?"":c`${fe}${e.rollup?vi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:bl}):""}
            ${K?c`<div class="rtile__landing">
                  <span
                    class="merge-step${K.failed?" merge-step--failed":""}"
                    style=${`--progress: ${K.percent}%`}
                    >${K.label}${K.index>0?c`<span class="merge-step__n"
                          >${K.index}/${K.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${oe}
            ${o?ae:C||R||H||re||ee||q.length>0||N?c`<div class="rtile__meta">
                    ${C}${R}${H}${Jr(e.exec_chips)}${ee}
                    ${q.length>0?q.map(he=>c`<span
                              class="worker-usage"
                              title=${he.tooltip}
                              >${he.label}</span
                            >`):N?c`<span
                            class="worker-usage"
                            title=${as(e.usage)}
                            >${N}</span
                          >`:""}${de}
                  </div>`:""}
            ${zi(e)} ${ie}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||w?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${vw(l,t)}${$w(g)}
  </div>`}function Cw(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Q_(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Qc(o,t,n,{monitor:Cw(o)}))}
  </div>`}function Vo(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var _n="",Ow=["impl_runtime","impl_model","impl_effort"],Z_=["claude","codex"],Iw=["claude_account","codex_account"],Lw=5,Ga=1;function Mn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Va(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>ve(E,"error",4e3)),i={},s={},l={},a={},u=[],p=!1,f={state:"absent",values:{},warnings:[]},_={},b={},g=Promise.resolve(),T=Promise.resolve(),w={claude:null,codex:null},Q=!1,re=null,W={},q="",N="general",M="",F=!1,K=!1,D=!1,A=null,C=!1;function R(){let E=t.queue?t.queue():null;return Mn(E)?E:null}function oe(){let E=R();return E?E.runner_catalog:null}function fe(){let E=R();return E&&Mn(E.execution_defaults)?E.execution_defaults:null}function be(){let E=R();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function H(){let E=t.implPresetStore?.get();return Mn(E)&&Array.isArray(E.presets)?E:null}function ee(){return r===null?{}:{root_dir:r}}async function de(E,U){return C||!n?null:await n(E,U)}function Oe(E){E&&Mn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function Z(E,U){let z=R();if(!z||C)return null;let we=await de(E,{...U,...ee(),expected_revision:z.revision});if(Oe(we),r!==null&&we&&we.conflict){let Te=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:R()?.revision??z.revision;we=await de(E,{...U,...ee(),expected_revision:Te}),Oe(we)}return we}async function ae(){p=!0,We();try{let E=await de("get-session-defaults",{...ee()});i=Ii(E?.values),s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{p=!1,We()}}function le(E,U){let z={...U};for(let we of ls){let Te=s[we];Te!==E[we]&&(typeof Te=="string"?z[we]=Te:delete z[we])}return z}function P(){T=T.then(()=>se())}async function se(){let E=Gd(i,s);if(Object.keys(E).length===0)return;let U={...s};try{let z=await de("set-session-defaults",{values:E,...ee()});i=Ii(z?.values),s=le(U,i),u=Array.isArray(z?.warnings)?z.warnings:[]}catch(z){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}We()}function ie(E,U){if(!Mn(E))return;let z=E.state;f={state:z==="usable"||z==="unusable"||z==="absent"?z:"absent",values:Mn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},b={...f.values},U&&(_={...b})}async function ye(){try{ie(await de("get-workspace-accounts",{...ee()}),!0)}catch(E){f={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}We()}async function ke(E){try{let U=await fetch(E);if(!U.ok)return null;let z=await U.json();if(!Mn(z)||!Array.isArray(z.accounts))return null;let we=z.accounts.filter(Te=>Mn(Te)&&typeof Te.key=="string"&&Te.key.length>0&&typeof Te.email=="string"&&Te.email.length>0);return{accounts:we,active:we.find(Te=>Te.active===!0)||null}}catch{return null}}async function Xe(){Q=!0;let[E,U]=await Promise.all([ke("/api/claude-usage"),ke("/api/codex-usage")]);C||(w={claude:E,codex:U},We())}function X(){let E={};for(let U of Iw){let z=Object.hasOwn(_,U)?_[U]:null,we=Object.hasOwn(b,U)?b[U]:null;z!==we&&(E[U]=z)}return E}async function pe(){let E=X();if(Object.keys(E).length!==0){try{ie(await de("set-workspace-accounts",{values:E,...ee()}),!1)}catch(U){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}We()}}function ce(E,U){U===_n?delete _[E]:_[E]=U,We(),g=g.then(()=>pe())}function V(E,U){if(Ow.includes(E)){Je(E,U);return}U===_n?delete s[E]:s[E]=U,We(),P()}function Ce(E,U){l[E]=U,delete a[E]}function he(E,U,z){if(l[E]=U,U.length>0&&!z(U)){a[E]=!0,We();return}delete l[E],delete a[E],U.length===0?delete s[E]:s[E]=U,We(),P()}function De(){let E=ct().orchestration_model,U=In({global:{orchestration_model:E??void 0},execution_defaults:fe(),runner_catalog:oe()}).orchestration_model.value;return U?Bn(oe(),U):null}function qe(E,U){typeof U=="string"&&U.length>0?s[E]=U:delete s[E]}function Je(E,U){let z=U===_n?void 0:U,we=Hd({impl_runtime:E==="impl_runtime"?z:s.impl_runtime,impl_model:E==="impl_model"?z:s.impl_model,impl_effort:E==="impl_effort"?z:s.impl_effort},oe(),De());qe("impl_runtime",we.impl_runtime),qe("impl_model",we.impl_model),qe("impl_effort",we.impl_effort),We(),P()}async function Ue(){let E=R();if(!E)return;let U={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},z=Vd(U,{...U,...W});if(Object.keys(z).length!==0){try{let we=await Z("worker-queue-set-orchestration-defaults",{values:z});if(we&&we.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(we){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}We()}}function ne(E,U){W[E]=U===_n?null:U,We(),Ue()}function G(E){if(re=E,!E){We();return}let U=oe(),z=ct(),we=z.orchestration_model;we&&!Co(U,E).includes(we)&&(W.orchestration_model=null,we=null);let Te=z.orchestration_effort;Te&&!Ni(U,E,we||Cn).includes(Te)&&(W.orchestration_effort=null),We(),Ue()}async function Re(E){if(!(!R()||E<Ga)){try{await Z("worker-queue-set-slots",{slots:E})}catch(U){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}We()}}async function et(E){if(!(!R()||E<Ga||E>Lw)){try{await Z("worker-queue-set-serial-lane-count",{count:E})}catch(U){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}We()}}async function pt(E,U){let z=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Z(z,{on:U})}catch(we){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}We()}function Qe(){let E={},U=ct();for(let z of To){let we=Fn.includes(z)?U[z]:s[z];typeof we=="string"&&we.length>0&&(E[z]=we)}return E}async function mt(){let E=H();if(!E)return;let U=Qe();if(Object.keys(U).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let z=(E.presets||[]).find(Te=>Te.id===q),we=M.trim()||(z?z.name:"");if(!we){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Te=z?await de("impl-preset-update",{expected_revision:E.revision,id:z.id,name:we,settings:U}):await de("impl-preset-create",{expected_revision:E.revision,name:we,settings:U});if(Te&&Te.applied){if(M="",!z&&Array.isArray(Te.presets)){let $t=Te.presets.find(kt=>kt.name===we);q=$t?$t.id:q}We()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(Te){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Te instanceof Error?Te.message:String(Te)}`)}}async function Dt(){let E=H();if(!(!E||q.length===0))try{let U=await de("impl-preset-delete",{expected_revision:E.revision,id:q});U&&U.applied?(q="",We()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(U){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}}function Et(E){i=Ii(E.values),s={...i},u=Array.isArray(E.warnings)?E.warnings:[],Mn(E.queue)&&(t.onQueueAdopt?.(E.queue),W={})}async function ot(E){let U=H(),z=R();if(!U||!z||q.length===0||E==="quick_fix"&&!be())return;let we=Te=>({preset_id:q,expected_revision:U.revision,expected_queue_revision:Te,...E==="quick_fix"?{lane:"quick_fix"}:{},...ee()});try{let Te=await de("apply-impl-preset-global",we(z.revision));if(E==="quick_fix"&&Te&&Te.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),We();return}if(Te&&Te.applied&&Et(Te),r!==null&&Te&&Te.queue_applied===!1){let $t=Te.queue&&typeof Te.queue.revision=="number"?Te.queue.revision:R()?.revision??z.revision;if(Te=await de("apply-impl-preset-global",we($t)),E==="quick_fix"&&Te&&Te.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),We();return}Te&&Te.applied&&Et(Te)}Te&&Te.applied?Te.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):Te&&Te.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(Te){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${Te instanceof Error?Te.message:String(Te)}`)}We()}async function ht(){K=!0,D=!1,We();try{let E=await de("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?D=!0:A=E}catch{D=!0}finally{K=!1,We()}}function Zt(){if(F=!F,F&&!A){ht();return}We()}function x(){let E=Ho({loading:K,error:D});if(E)return E;if(!A)return"";let U=Array.isArray(A.variants)?A.variants:[];return c`<div class="settings-dialog__sp-body">
      ${A.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${U.map(z=>c`<div class="settings-dialog__sp-variant" data-variant=${z.key}>
            <div class="settings-dialog__sp-cond">${z.condition}</div>
            ${vr(z.label,z.system_prompt)}
          </div>`)}
    </div>`}function te(){return c`<section
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
        aria-expanded=${F?"true":"false"}
        @click=${Zt}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?x():""}
    </section>`}function Me(E,U,z,we,Te,$t,kt,Rt){let qt=Te[E]??_n,Wt=Cl(E,z,Te,fe(),oe(),kt,Rt),Xt=Wt.options.find(xt=>xt.value===qt),sn=qt===_n?Wt.full_value:Xt?.full_value;return c`<select
        class=${qt===_n?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${U}
        title=${sn||""}
        ?disabled=${$t===!0||Rt!=="quick_fix"&&Wt.disabled}
        .value=${Lr(String(qt))}
        @change=${xt=>we(E,String(xt.target.value))}
      >
        <option value=${_n} ?selected=${qt===_n}>
          ${Wt.unset_label}
        </option>
        ${Wt.options.map(xt=>c`<option
              value=${xt.value}
              title=${xt.full_value||""}
              ?selected=${xt.value===qt}
            >
              ${xt.label}
            </option>`)}
      </select>
      ${qt===_n?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ee(E,U,z,we,Te,$t=!1,kt,Rt=null,qt=null){return c`<div
      class=${`settings-dialog__row${$t?" settings-dialog__row--off":""}`}
      title=${$t&&qt?qt:""}
    >
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        ${Me(E,U,z,we,Te,$t,kt,Rt)}
      </span>
    </div>`}function Pe(E,U,z,we,Te,$t){let kt=Object.hasOwn(a,E),Rt=l[E]??s[E]??_n;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${U}
          aria-invalid=${String(kt)}
          placeholder=${z}
          .value=${Lr(Rt)}
          @input=${qt=>Ce(E,String(qt.target.value))}
          @change=${qt=>he(E,String(qt.target.value).trim(),$t)}
        />
        ${Rt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${kt?Te:we}</span
        >
      </span>
    </div>`}function Be(E,U,z,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${E}
            .checked=${s[E]===cs}
            @change=${Te=>V(E,Te.target.checked?cs:_n)}
          />
          ${z}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${E}>${we}</span>
      </span>
    </div>`}function tt(E,U){let z=U?U.active:null;return Mn(z)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?z.email:Ko({...z,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ot(E,U,z){let we=w[z],Te=Object.hasOwn(_,E)?_[E]:_n,$t=z==="claude"?Pa:Ko,kt=!!we?.accounts.some(Rt=>Rt.key===Te);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${U}
          data-account-key=${E}
          @change=${Rt=>ce(E,String(Rt.target.value))}
        >
          <option value=${_n} ?selected=${Te.length===0}>
            ${tt(z,we)}
          </option>
          ${Te.length>0&&!kt?c`<option value=${Te} selected>
                ${Te} (목록에 없음)
              </option>`:""}
          ${we?.accounts.map(Rt=>c`<option value=${Rt.key} ?selected=${Rt.key===Te}>
                ${$t(Rt)}
              </option>`)||""}
        </select>
        ${we?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _e(){let E=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function Ae(E,U,z,we,Te,$t){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${U}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${Me(z,`${E} \uBAA8\uB378`,we,V,s,!1)}
        ${Me(Te,`${E} effort`,Pi,V,s,!1)}
        ${Me($t,`${E} \uC18D\uB3C4`,Bd,V,s,!1)}
      </span>
    </div>`}function Ze(E,U,z,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${we?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${we?"true":"false"}
          aria-label=${U}
          @click=${()=>pt(E,!we)}
        >
          ${we?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${z}</span>
      </span>
    </div>`}function bt(E,U,z,we){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${U} \uAC10\uC18C`}
            @click=${()=>we(z-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${z}</span>
          <button
            type="button"
            aria-label=${`${U} \uC99D\uAC00`}
            @click=${()=>we(z+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function it(E,U){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(z=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${z.after??(U==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${U==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ct(){let E=R(),U={};for(let z of[...Fn,...Eo])U[z]=Object.prototype.hasOwnProperty.call(W,z)?W[z]:E&&typeof E[z]=="string"?E[z]:null;return U}function vt(){let E=ct(),U={};for(let z of Eo)U[z]=E[z]??null;for(let z of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])U[z]=s[z]??null;return U}function rt(){let E=oe(),U=s.impl_runtime,z=s.impl_model,we=H(),Te=R(),$t=ct(),kt=Co(E,re),Rt=Ro(E,void 0).filter(Ke=>Ke!==Cn),qt=Vr(E,void 0,void 0),Wt=Ni(E,re,$t.orchestration_model||Cn).filter(Ke=>Ke!==Cn),Xt=q?(we?.presets||[]).find(Ke=>Ke.id===q):null,sn=Xt?zd(Qe(),Mn(Xt.settings)?Xt.settings:{}):null,xt={quick_fix_orchestration_model:Co(E,null),quick_fix_orchestration_effort:Ni(E,null,null).filter(Ke=>Ke!==Cn),quick_fix_orchestration_speed:er,quick_fix_impl_dispatch:us,quick_fix_impl_runtime:Z_,quick_fix_impl_model:Rt,quick_fix_impl_effort:qt,quick_fix_impl_speed:er},tn=Xt?Kd(vt(),Mn(Xt.settings)?Xt.settings:{},xt):null,fn=N==="quick_fix"?tn:sn,Ft=be(),Gt=Ft?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",on={...s,...$t},He=Te&&typeof Te.slots=="number"?Te.slots:Ga+1,I=Te&&typeof Te.serial_lane_count=="number"?Te.serial_lane_count:Ga,$e=fe()?.supported===!0,je=_e(),At=Cl("workflow_mode",ds,s,fe(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${je?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${je}
          </div>`:""}
      ${$e?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${p?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Lr(q)}
                @change=${Ke=>{q=String(Ke.target.value),We()}}
              >
                <option value="" ?selected=${q===""}>
                  실행 프리셋…
                </option>
                ${(we?.presets||[]).map(Ke=>c`<option
                      value=${Ke.id}
                      ?selected=${Ke.id===q}
                    >
                      ${Ke.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!sn||sn.rows.length===0}
                @click=${()=>ot("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Gt||""}
                ?disabled=${!Ft||!tn||tn.rows.length===0}
                @click=${()=>ot("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Lr(M)}
                @input=${Ke=>{M=String(Ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${q?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${mt}
              >
                ${q?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${q.length===0}
                @click=${Dt}
              >
                삭제
              </button>
            </div>
            <div
              class="settings-dialog__seg"
              role="group"
              aria-label="프리셋 적용 레인"
              data-preset-lane-tabs
            >
              <button
                type="button"
                data-preset-lane="general"
                aria-pressed=${String(N==="general")}
                @click=${()=>{N="general",We()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(N==="quick_fix")}
                @click=${()=>{N="quick_fix",We()}}
              >
                quick_fix
              </button>
            </div>
            ${fn?it(fn,N):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Lr(re||_n)}
                    @change=${Ke=>{let Lt=String(Ke.target.value);G(Lt===_n?null:Lt)}}
                  >
                    <option value=${_n} ?selected=${!re}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${re==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${re==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ee("orchestration_model","\uBAA8\uB378",kt,ne,$t)}
              ${Ee("orchestration_effort","effort",Wt,ne,$t)}
              ${Ee("orchestration_speed","\uC18D\uB3C4",er,ne,$t)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ot("claude_account","Claude","claude")}
              ${Ot("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${Te?.provider_auto_switch!==!1}
                      @change=${Ke=>pt("provider_auto_switch",Ke.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
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
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>V("workflow_mode",_n)}
                    >
                      ${At.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ds.map(Ke=>c`<button
                          type="button"
                          data-mode=${Ke}
                          aria-pressed=${String(s.workflow_mode===Ke)}
                          @click=${()=>V("workflow_mode",Ke)}
                        >
                          ${Ke}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Pe("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Fd)}
              ${Be("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${Ae("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ps,"spec_review_effort","spec_review_speed")}
              ${Ae("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Di,"plan_review_effort","plan_review_speed")}
              ${Ae("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ps,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",Li,V,s)}
              ${Ee("impl_model","\uBAA8\uB378",Ro(E,U),V,s)}
              ${Ee("impl_effort","effort",Vr(E,U,z),V,s)}
              ${Ee("impl_speed","\uC18D\uB3C4",er,V,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Gt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Ee("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",xt.quick_fix_orchestration_model,ne,$t,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",xt.quick_fix_orchestration_effort,ne,$t,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",er,ne,$t,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",us,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",Z_,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_impl_model","\uBAA8\uB378",Rt,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_impl_effort","effort",qt,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ee("quick_fix_impl_speed","\uC18D\uB3C4",er,V,s,!Ft,on,"quick_fix",Gt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ze("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Te?.auto_advance===!0)}
              ${Ze("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Te?.auto_merge===!0)}
              ${bt("slots","\uB3D9\uC2DC \uC2E4\uD589",He,Ke=>Re(Ke))}
              ${bt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",I,Ke=>et(Ke))}
            </div>
            ${te()}
          `}
    `}function We(){C||lt(rt(),e)}return{load(){W={},N="general",l={},a={};let E=[ae(),ye()];return Q||E.push(Xe()),Promise.all(E).then(()=>{})},render:We,sessionDraft:()=>({...s}),destroy(){C=!0,lt(c``,e)}}}function Ya(e){return c`<svg
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
  </svg>`}function J_(){return Ya(rs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function em(){return Ya(rs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function tm(){return Ya(rs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function nm(){return Ya(rs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function rm(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function om(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return hn(Ti(t));let n={};for(let l of Jn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let p of Jn){let f=a[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,u=!0)}if(u){i+=1;let p=a.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(o+=p,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?dr(n):null}function Gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zc(e,t){let n=Gn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Dw(e,t){if(!Gn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Pw(e){if(!Gn(e)||!Gn(e.execution_defaults)||!Gn(e.runner_catalog)||!Gn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=In({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Bn(e.runner_catalog,n.orchestration_model.value??""),o=Oo(n,e.runner_catalog),i=Yr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function sm(e,t){let n=t.notify||(Z=>ve(Z,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,p=null,f=null,_=new Map;function b(){let Z=t.workspacesState?t.workspacesState():[];return Array.isArray(Z)?Z.filter(ae=>Gn(ae)):[]}function g(Z){return b().find(ae=>ae.root_dir===Z)||null}function T(Z){return Dw(g(Z),_.get(Z))}function w(){for(let Z of b()){let ae=_.get(Z.root_dir);ae&&typeof ae.revision=="number"&&typeof Z.revision=="number"&&Z.revision>=ae.revision&&_.delete(Z.root_dir)}}async function Q(Z,ae,le){let P=t.transport,se=T(ae);if(!(!P||!Gn(se))){try{let ie=await P(Z,{...le,root_dir:ae,expected_revision:se.revision});if(Gn(ie?.queue)&&_.set(ae,ie.queue),ie&&ie.conflict){let ye=Gn(ie.queue)&&typeof ie.queue.revision=="number"?ie.queue.revision:T(ae)?.revision;ie=await P(Z,{...le,root_dir:ae,expected_revision:ye}),Gn(ie?.queue)&&_.set(ae,ie.queue)}}catch(ie){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}ee()}}function re(Z){u!==Z&&(u=Z,t.onFocusChange?.(u),ee())}function W(Z){re(u===Z?null:Z)}function q(Z){if(p===Z){M();return}N(),p=Z;let ae=g(Z);s.textContent=`${ae?.name||Z} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Va(a,{root_dir:Z,queue:()=>T(Z),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:le=>{_.set(Z,le),ee()}}),f.load(),ee()}function N(){f?.destroy(),f=null}function M(Z){N(),p=null,o.hidden=!0,s.textContent="",Z!==!0&&ee()}let F=()=>M();l.addEventListener("click",F);function K(Z){Z.key==="Escape"&&u!==null&&re(null)}document.addEventListener("keydown",K);function D(Z,ae){let le=Math.max(ae,Z,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ae}\uAC1C \uC911 ${Z}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:le},(P,se)=>se<Z?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function A(Z){let ae=Z.auto_advance===!0,le=Z.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ae?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${Z.name} \uC790\uB3D9\uD654`}
        title=${ae?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ae?em():J_()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${le?" is-on":""}`}
        data-act="merge"
        aria-pressed=${le?"true":"false"}
        aria-label=${`${Z.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${le?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${tm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===Z.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===Z.root_dir?"true":"false"}
        aria-label=${`${Z.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${nm()}
      </button>`}function C(Z){let ae=Pw(Z);return ae?c`<div class="mon2-deck__chips">
      ${ae.orchestration?c`<span class="mon2-deck__chip" title=${ae.orchestration.title}
            >오케 ${ae.orchestration.text}</span
          >`:""}
      ${ae.worker?c`<span class="mon2-deck__chip" title=${ae.worker.title}
            >워커 ${ae.worker.text}</span
          >`:""}
    </div>`:""}function R(Z){let ae=[];for(let[le,P]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let se=Zc(Z,le);se>0&&ae.push(`${P} ${se}`)}return ae.join(" \xB7 ")}function oe(Z){let ae=Zc(Z,"running"),le=typeof Z.slots=="number"?Z.slots:1;return c`<div
      class=${`mon2-deck__tile${u===Z.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Z.root_dir}
      aria-pressed=${u===Z.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Z.root_dir}>${Z.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${le}\uAC1C \uC911 ${ae}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ae}/${le}</span>
          ${D(ae,le)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Z.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${A(Z)}</div>
        <span class="mon2-deck__counts">${R(Z)}</span>
        ${C(Z)}
      </div>
    </div>`}function fe(Z){let ae=t.doneItems?t.doneItems():[],le=t.rangeLabel?t.rangeLabel():"",P=om(Array.isArray(ae)?ae:[]),se=ie=>Z.reduce((ye,ke)=>ye+Zc(ke,ie),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Z.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${le}`}
        >실행 ${se("running")} · 대기 ${se("queue")} · PR
        ${se("pr_wait")}${se("session_active")>0?` \xB7 \uC138\uC158 ${se("session_active")}`:""}
        · ${le} 완료
        ${Array.isArray(ae)?ae.length:0}</span
      >
      ${P===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof P=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${rm(le)}
                  >${P}</span
                >`:P.map(ie=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ie.provider}
                      title=${ie.tooltip}
                      >${ie.label}</span
                    >`)}
          </span>`}
    </div>`}function be(){let Z=b();return Z.length===0?"":c`${fe(Z)}
      <div class="mon2-deck__strip">
        ${Z.map(ae=>oe(ae))}
      </div>`}function H(){u!==null&&!g(u)&&(u=null,t.onFocusChange?.(null))}function ee(){w(),H(),p!==null&&!g(p)&&M(!0),lt(be(),r),f?.render()}function de(Z){let ae=Z.target;if(!ae||typeof ae.closest!="function")return;let le=ae.closest("[data-root-dir]");if(!le)return;let P=le.getAttribute("data-root-dir")||"",se=ae.closest("[data-act]")?.getAttribute("data-act");if(se==="worker"){t.gotoWorkerTab?.(P);return}if(se==="auto"){Q("worker-automation-toggle",P,{on:T(P)?.auto_advance!==!0});return}if(se==="merge"){Q("worker-merge-auto-toggle",P,{on:T(P)?.auto_merge!==!0});return}if(se==="gear"){q(P);return}W(P)}function Oe(Z){if(Z.key!=="Enter"&&Z.key!==" ")return;let ae=Z.target;if(!ae||typeof ae.closest!="function")return;let le=ae.closest('[data-root-dir][role="button"]');!le||le!==ae||(Z.preventDefault(),W(le.getAttribute("data-root-dir")||""))}return r.addEventListener("click",de),r.addEventListener("keydown",Oe),{render:ee,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",de),r.removeEventListener("keydown",Oe),l.removeEventListener("click",F),N(),lt(c``,r),e.replaceChildren()}}}var Nw=1e4,lm="bdui.monitor.done-range",cm="bdui.monitor.running_sort",um="bdui.monitor.candidate_sort",dm="beads-ui.monitor.candidate-filter",pm="beads-ui.monitor.sections";function Mw(){try{let e=window.localStorage.getItem(dm);if(!e)return{...qo};let t=JSON.parse(e);return!t||typeof t!="object"?{...qo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:qo.show_blocked,readiness:Rs.some(n=>n.value===t.readiness)?t.readiness:"all",routes:no(t.routes)}}catch{return{...qo}}}function Jc(e){try{window.localStorage.setItem(dm,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function qw(){try{let e=window.localStorage.getItem(um);return Ts.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function jw(e){try{window.localStorage.setItem(um,e)}catch{}}function Fw(){try{let e=window.localStorage.getItem(pm);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Bw(e){try{window.localStorage.setItem(pm,JSON.stringify(e))}catch{}}function Uw(){try{let e=window.localStorage.getItem(lm);return e===null?"today":Xn(e)}catch{return"today"}}function Ww(e){try{window.localStorage.setItem(lm,e)}catch{}}function Hw(){try{return window.localStorage.getItem(cm)==="repo"?"repo":"started"}catch{return"started"}}function zw(e){try{window.localStorage.setItem(cm,e)}catch{}}var fm="tab:monitor:pipeline",Kw=1e3,im=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Gw=["queue","runnable","done"],am="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Vw(e){return e>=1&&e<=am.length?am[e-1]:`(${e})`}function _m(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),_=Uw(),b=Hw(),g=Mw(),T=qw(),w=Fw(),Q=ja("beads-ui.monitor.lane-collapsed"),re=!1,W=null,q=null,N=null,M=null,F=null,K=null,D=Lo(()=>z()),A=null,C=null,R=null,oe=null;function fe(y){return oe===null&&(oe=V()),_f(y,oe)}function be(y,d){H(),!(d<=0)&&(C={lane_id:y,corrected:d},R=setTimeout(()=>{R=null,C=null,z()},Nw))}function H(){R!==null&&(clearTimeout(R),R=null),C=null}function ee(){let y=fo.find(d=>d.value===_);return y?y.label:""}let de=document.createElement("div");de.className="mon",e.appendChild(de);let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let Z=document.createElement("div");Z.className="worker-drawer-overlay__backdrop";let ae=document.createElement("div");ae.className="worker-drawer-host mon2-drawer",Oe.append(Z,ae),e.appendChild(Oe);let le=Cr(null,null),P=new Map,se=new Map,ie=new Set,ye=null,ke=null,Xe=null,X=zo(ae,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,Oe.hidden=!0,z()}}),pe=Ba({transport:i,console_el:de,getLanes:()=>le,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:sn,reproject:y=>({lanes:U(y),raw_lanes:y}),onCorrection:be,showToast:ve,requestRender:()=>z(),adoptQueue:(y,d)=>{se.set(y,d)},onDragBegin:()=>{N=null},candidate_drop:!0}),{applyDrop:ce,dropModel:V,runPlanned:Ce,sendQueueCas:he}=pe;async function De(y,d,m,$,Y=!0){if(!i||!m)return null;let J=await i(y,{...d,root_dir:m,expected_revision:$});if(J&&J.conflict&&Y){J.queue&&se.set(m,J.queue);let me=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:$;J=await i(y,{...d,root_dir:m,expected_revision:me})}return J&&J.queue&&m&&se.set(m,J.queue),J}function qe(y){let d=se.get(y);if(d)return d;let m=o&&o.get?o.get():null;return(Array.isArray(m)?m:[]).find($=>$?.root_dir===y)||{}}function Je(y,d){return qe(y)?.merge_queue?.find($=>$.bead_id===d)?.continuation_action}async function Ue(y,d,m,$){let Y=await De(y,d,m,$),J=se.get(m)?.revision??Y?.queue?.revision??$;return Ir(Y,(me,Ne)=>De(y,{...d,continuation:me,decision_token:Ne},m,J,!1),{refresh:me=>De(y,d,m,me?.queue?.revision??se.get(m)?.revision??J,!1)})}async function ne(y,d,m,$){let Y=await Ir({continuation_mismatch:$},(me,Ne)=>De("worker-merge-queue-add",{bead_id:d,continuation:me,decision_token:Ne},y,m,!1)),J=Y?.queue?.merge_queue?.find(me=>me.bead_id===d)?.continuation_action;Y?.applied!==!0&&J?.continuation===null&&J.mismatch&&await ne(y,d,Y.queue.revision,J.mismatch)}async function G(y,d,m){let $=await De("worker-discard",y,d,m);if($&&$.discarded===!0){ve(Yi($),"success",5e3);return}if($&&$.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Re(y,d,m,$){let Y=await De("worker-discard-abandon",y,d,m);if(Y&&Y.abandoned===!0){ve(Vi($),"success",5e3);return}if(Y&&Y.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${Y.reason}`,"error");return}Y&&!Y.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function et(y,d,m){return!i||!m?null:await i(y,{...d,root_dir:m})}async function pt(y,d,m){if(!ie.has(y)){ie.add(y),z();try{let $=await De("worker-resolve-in-session",{bead_id:y},d,m,!1);$?.session==="already_running"?ve(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${$.tmux_window||"?"}`,"error"):$?.launched!==!0?ve(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${$?.reason||"unknown"}`,"error"):$.mode!=="fork"&&ve(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${$.fallback_reason||"unknown"})`,"success")}finally{ie.delete(y),z()}}}async function Qe(){let y=new Map;for(let d of le.pr_wait)y.has(d.root_dir)||y.set(d.root_dir,d.expected_revision);for(let[d,m]of y)await De("worker-merge-queue-add-all",{},d,m)}function mt(y){let d=w[y];return!!(d&&d.runnable===!0)}function Dt(y){let d={...w[y]||{}};d.runnable=!d.runnable,w={...w,[y]:d},Bw(w),z()}function Et(y){Q.toggle(y),z()}function ot(y){Q.toggleArea(y),z()}function ht(y){let d=y.dependency_chips||null,m=y.overlap_chips||[],$=y.scope_state==="missing",Y=y.armed_lane_chip;return!d&&m.length===0&&!$&&!Y?null:{...d||{},...m.length>0?{overlaps:m}:{},...$?{scope_missing:!0}:{},...Y?{armed_lane:Y}:{}}}function Zt(y){return na(y,d=>D.isOpen({bead_id:y.id,chip_key:d}))}function x(y){let d=ht(y),m=Zt(y);return d||m?{...y,...d?{dependency_chips:d}:{},...m?{chip_popover:m}:{}}:y}function te(y){let d=mt(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${d?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${d?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${d?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${y.root_dir}>${y.name}</span>
      <span class="mon2-sec__count">${y.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Me(y,d){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${d}
    </div>`}function Ee(y){if(N!==y.id)return null;let d=le.queue_groups.find(J=>J.root_dir===y.root_dir),m=y.place_lanes||[],$=le.cross_lanes_revision!==null,Y=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let J of le.chain_lanes)Y.push({id:`lane:${J.lane_id}`,label:`\uC5F0\uACB0 ${J.number} (${J.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:J.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});Y.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let J of m)Y.push({id:`serial:${J.id}`,label:`\uC9C1\uB82C ${Number(J.id.slice(1))}`,count:J.length,group:`${d?d.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:Y}}function Pe(y){return Me(y,c`${Kl(x(y),Ee(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(d,m)=>l(m,y.root_dir):void 0})}`)}function Be(){return le.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${le.runnable.map(y=>Pe(y))}
      </div>`:c`${le.runnable_sections.map(y=>{let d=mt(y.root_dir);return c`<section
        class="mon2-sec${d?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${te({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${d?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(m=>Pe(m))}
            </div>`}
      </section>`})}`}function tt(y,d){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${d}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Un(x(y),{actions:Mo(y,{nudgeable:!0})})}
    </div>`}function Ot(y,d,m,$){return c`<div
      class="mon2-crow${d.fixed?" mon2-crow--fixed":""}"
      draggable=${d.draggable?"true":"false"}
      data-bead-id=${d.id}
      data-drag-kind="chain"
      data-root-dir=${d.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${m}
      data-queue-index=${typeof d.queue_index=="number"?String(d.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Vw(d.seq)}</span
      >
      ${d.workspace_name?c`<span class="worker-mini__repo" title=${d.root_dir}
            >${d.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${d.id}</span>
      <span class="mon2-crow__title">${d.title}</span>
      ${d.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(d.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${d.location_title}
        >${d.location_label}</span
      >
      ${eo(d.route?{route:d.route,route_source:d.route_source??void 0}:null)}${d.exec_chips?Jr(d.exec_chips):""}
      ${Bl(d.added_at)}
      ${Ul({id:d.id,...typeof d.added_at=="number"?{added_at:d.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${d.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function _e(y){let d=le.cross_lanes_revision!==null,m=fe(y.lane_id),$=m?.held===!0,Y=m?.cycle===!0,J=m?m.mismatched:[],me=C&&C.lane_id===y.lane_id?C.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${me>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${me}건 자동 교정</span
            >`:""}
        ${Y?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ha}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!d||!y.can_confirm||$}
              title=${$?ha:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!d}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!d}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!d}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!d}
          title=${y.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((Ne,wt)=>Ot(y,Ne,wt,J))}
      </div>
    </div>`}function Ae(y,d,m){return c`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="repo-serial"
      data-root-dir=${d.root_dir}
      data-lane-id=${y.id}
      data-row-index=${m}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Un(x(d),{actions:Mo(d)})}
    </div>`}function Ze(y){if(y.length===0)return"";let d=y.length-1;return`${y[0].id} \uC810\uC720${d>0?` +${d}`:""}`}function bt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Un({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function it(y,d){let m=d.occupants,$=d.cross_wait_peers||[];return{id:d.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${d.index+1}`,rows:[...m.map(Y=>bt(Y)),...d.items.map((Y,J)=>Ae(d,Y,J))],count:d.items.length,empty:d.empty===!0,...m.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${m.map(Y=>`${Y.id} \u2014 ${Y.badge}`).join(`
`)}
              >${Ze(m)}</span
            >`,held:!0}:{},cycle:d.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(Y=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Y.workspace_name}·${Y.lane}과 교차 대기
                </div>`)}`}:{}}}function ct(){let y=le.cross_lanes_revision!==null,d=le.chain_lanes.some(m=>m.draft&&m.rows.length===0);return ra({parallel:{rows:le.parallel_rows.map((m,$)=>tt(m,$)),count:le.parallel_rows.length,collapsed:Q.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:le.queue_groups.flatMap(m=>m.sublanes.serial.map($=>({...it(m,$),drop:{drop:"repo-serial",root_dir:m.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Q.isAreaCollapsed("serial"),extra_panes:le.chain_lanes.map(m=>_e(m)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${d||!y}
          title=${y?d?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...le.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function vt(y){return c`<div class="worker-rungrid">
      ${le.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:le.running.map(d=>Qc({bead_id:d.id,attempt_id:d.attempt_id||"",title:d.title,runner:d.runner??null,model:d.model??null,effort:d.effort??null,speed:d.speed??null,started_at:d.started_at??null,kind:d.kind,...d.kind==="session"?{updated_at:d.updated_at,session_refs:d.session_refs||[]}:{},workflow:d.workflow||null,resumed_from:d.resumed_from??null,continuation_mode:d.continuation_mode??null,paused:d.run_state==="paused",failed:d.run_state==="failed",parked:d.run_state==="parked",retry_wait:d.run_state==="retry_wait",waiting:d.run_state==="waiting",wait:d.wait||null,provider_hold:d.run_state==="provider_hold",hold:d.hold?{...d.hold,open:F===d.attempt_id}:null,retry:d.retry||null,status:d.status,status_label:d.run_state==="failed"?"\uC2E4\uD328":d.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":d.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":d.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:d.can_pause!==!1,exec_chips:d.exec_chips||null,usage:d.usage||null,chip_popover:Zt(d),discard:d.discard,failure:d.failure?{...d.failure,open:M===d.attempt_id}:null,...Vo(d.id,{discard:d.discard,parked:d.run_state==="parked"},ie.has(d.id))},y,q,{monitor:{repo:d.workspace_name,root_dir:d.root_dir,serial_lane_id:d.serial_lane_id,cross_lane_chip:d.cross_lane_chip||null,last_activity:d.last_activity||null,legs:d.legs||[],dependency_chips:ht(d)}}))}
    </div>`}function rt(y){let d={runnable:le.runnable,queue:le.queue,running:le.running,pr_wait:le.pr_wait,done:le.done},m=$=>{let Y=d[$.lane],J=$.lane==="runnable"?le.runnable_flat?Y.length>0?Be():void 0:le.runnable_sections.length>0?Be():void 0:$.lane==="queue"?le.queue_groups.length>0||le.chain_lanes.length>0||le.parallel_rows.length>0||le.cross_lanes_unreadable?ct():void 0:$.lane==="running"?vt(y):Y.length>0?c`${Y.map(me=>Un(x(me)))}`:void 0;return nr({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:Y,count:Y.length,src:$.lane==="runnable",empty:$.empty,body:J,live:$.lane==="running"&&Y.length>0,collapsible:!0,collapsed:Q.isCollapsed($.pane),controls:$.lane==="runnable"?We():void 0,header_control:E($.lane,Y.length)})};if(re){let $=Gw.map(Y=>im.find(J=>J.lane===Y)).filter(Y=>Y!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${oa({live:le.running.length>0,running_body:le.running.length>0?vt(y):"",pr_wait_rows:le.pr_wait.map(Y=>Un(x(Y))),count:le.running.length+le.pr_wait.length})}
            ${$.map(Y=>m(Y))}
          </div>
        </div>
        ${Go(K?.draft||null,K?qe(K.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${im.map($=>m($))}
        </div>
      </div>
      ${Go(K?.draft||null,K?qe(K.root_dir):{})}`}function We(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒
        blocked${le.runnable_hidden.blocked>0?` ${le.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Rs.map(y=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${g.readiness===y.value?" is-active":""}"
              data-readiness=${y.value}
              aria-pressed=${g.readiness===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${le.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${le.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ro.map(y=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${g.routes.includes(y.value)?" is-active":""}"
              data-route=${y.value}
              aria-pressed=${g.routes.includes(y.value)?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${le.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${le.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function E(y,d){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${Ts.map(m=>c`<option
              value=${m.value}
              ?selected=${T===m.value}
            >
              ${m.label}
            </option>`)}
      </select>`:y==="running"?c`<select
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
      </select>`:y==="pr_wait"&&d>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${fo.map(m=>c`<option value=${m.value} ?selected=${_===m.value}>
              ${m.label}
            </option>`)}
      </select>`:""}function U(y){let d=o&&o.get?o.get():null,m=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,Y={done_since:zr(_,p()),running_sort:b,candidate_filter:g,candidate_sort:T};return $!==void 0&&(Y.cross_lanes=$),Cr(d,m,Y)}function z(){let y=p();le=U(),oe=null,P=new Map;for(let d of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])!d.non_occupying&&!P.has(d.id)&&P.set(d.id,d);lt(rt(y),de),za(de),Te()?.render(),we(),$t()}function we(){let y=new Map;for(let d of le.queue_groups)y.set(d.root_dir,d.auto_advance);for(let d of Array.from(de.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let m=d.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=y.get(m);typeof $=="boolean"&&d.setAttribute("title",`${d.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Te(){if(Xe)return Xe;let y=de.querySelector(".mon2-deck");return y?(Xe=sm(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>le.done,rangeLabel:ee,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:Rt,onFocusChange:d=>{A=d,$t()}}),Xe):null}function $t(){de.classList.toggle("has-focus",A!==null);for(let y of Array.from(de.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",A!==null&&y.getAttribute("data-root-dir")===A);for(let y of Array.from(de.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let d=P.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",A!==null&&!!d&&d.root_dir===A)}for(let y of Array.from(de.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",A!==null&&y.getAttribute("data-root-dir")===A)}function kt(y,d){let m=s?s():void 0;if(!d||!m||d===m||!a){r(y);return}a(d).then(()=>{r(y)}).catch($=>{n("workspace switch for %s failed: %o",d,$)})}function Rt(y){if(!y)return;let d=s?s():void 0,m=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||d&&d===y){m();return}a(y).then(m).catch($=>{n("workspace switch for %s failed: %o",y,$),ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(y){$n(y).then(d=>{ve(d?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",d?"success":"error",1400)})}function Wt(y){let d=P.get(y)||null;return{item:d,root_dir:d?d.root_dir:"",revision:d?d.expected_revision:0}}async function Xt(y,d,m){if(y!=="dep-add")return;let $=le.chain_lanes.find(Y=>Y.rows.some(J=>J.id===d));!$||!$.rows.some(Y=>Y.id===m)||await Ce(Y=>yf($.lane_id,Y),"",[{type:y,a:d,b:m}])}function sn(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function xt(y,d){if(y==="run"){await fn(d);return}if(y==="stop"){await Ft(d);return}if(y==="create"){await Ce(m=>fc(null,m),"");return}if(y==="remove"){let m=kf(d,V());if(m!==null&&!f(m))return;await Ce($=>vf(d,$),"");return}await Ce(m=>y==="confirm"?hf(d,m):bf(d,m),"")}function tn(y){let d=new Map;for(let m of y.rows){let $=le.owner_of[m.id]||m.root_dir;typeof $!="string"||$.length===0||d.set($,[...d.get($)||[],m.id])}return d}async function fn(y){let d=le.chain_lanes.find(J=>J.lane_id===y);if(!d||le.cross_lanes_revision===null){z();return}H();let m=new Map,$=new Map,Y=tn(d);for(let J of d.rows){if(J.fixed||!J.unplaced)continue;let me=le.owner_of[J.id]||J.root_dir;if(typeof me!="string"||me.length===0){ve(`${J.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),z();return}let Ne=$.get(me)??0;if(await he("worker-queue-place",{bead_id:J.id,lane:"parallel",index:(le.parallel_raw_length[me]??0)+Ne},me,m,{bead_id:J.id})===null){z();return}$.set(me,Ne+1)}for(let[J,me]of Y)if(await he("worker-queue-arm",{bead_ids:me,lane_id:y},J,m,{bead_id:me[0]})===null){ve("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),z();return}z()}async function Ft(y){let d=le.chain_lanes.find($=>$.lane_id===y);if(!d||le.cross_lanes_revision===null){z();return}H();let m=new Map;for(let[$,Y]of tn(d))if(await he("worker-queue-disarm",{lane_id:y},$,m,{bead_id:Y[0]})===null)break;z()}async function Gt(y,d){if(!i||!y||d.length===0){z();return}let m=await i("worker-queue-start-now",{bead_id:y,root_dir:d});m&&m.queue&&se.set(d,m.queue),m&&m.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${m.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":m.reason||""}`,"error",2800),z()}async function on(y,d){let{root_dir:m,revision:$}=Wt(y);if(m.length===0){z();return}await he("worker-queue-disarm",{bead_ids:[y],lane_id:d},m,new Map([[m,$]]),{bead_id:y}),z()}async function He(y,d){let m=P.get(y);if(!m){z();return}let $={kind:"candidate",bead_id:y,root_dir:m.root_dir};if(d==="new-lane"){await Ce(Y=>fc({bead_id:y,root_dir:m.root_dir},Y),y);return}if(d.startsWith("lane:")){let Y=d.slice(5);if(!le.chain_lanes.find(me=>me.lane_id===Y)){z();return}await Ce(me=>ya($,{kind:"chain",lane_id:Y,marker_index:(me.cross_lanes.get(Y)?.entries??[]).length},me),y);return}if(d.startsWith("serial:")){let Y=d.slice(7),J=(m.place_lanes||[]).find(me=>me.id===Y);await ce($,{kind:"repo-serial",root_dir:m.root_dir,lane_id:Y,index:J?J.index:0});return}await ce($,{kind:"parallel",marker_index:le.parallel_rows.length})}async function I(y,d){let m=le.parallel_rows,$=m.findIndex(Ge=>Ge.id===y);if($<0)return;let Y=m[$].root_dir,J=[];m.forEach((Ge,yt)=>{Ge.root_dir===Y&&J.push(yt)});let me=J.indexOf($),Ne=J[me+d];if(typeof Ne!="number")return;let wt=d===-1?Ne:J[me+2]??Math.min(m.length,Ne+1);await ce({kind:"parallel",bead_id:y,root_dir:Y,queue_index:m[$].queue_index??0},{kind:"parallel",marker_index:wt})}async function $e(y){for(let d of le.chain_lanes){let m=d.rows.find($=>$.id===y);if(m){await ce({kind:"chain",bead_id:y,root_dir:m.root_dir,lane_id:d.lane_id,...typeof m.queue_index=="number"?{queue_index:m.queue_index}:{}},{kind:"parallel",marker_index:le.parallel_rows.length});return}}}function je(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function At(y,d,m,$,Y={}){let J=P.get(y)||null;Fo({context:{bead_id:y,kind:$,tuple:J?Ln(J):""},transport:me=>De("worker-attempt-resume",{attempt_id:d,...Y,...me},m,se.get(m)?.revision??Wt(y).revision,!1)})}function Ke(){K=null,z()}function Lt(){let y=K,d=y?Ha(y.draft):null;!y||!d||(K=null,z(),At(y.bead_id,d.attempt_id,y.root_dir,"session",d.payload))}function Bt(y,d){let{item:m,root_dir:$,revision:Y}=Wt(d),J=m?.attempt_id||"",me=y.classList;if(me.contains("worker-mini__rowops-up")||me.contains("worker-mini__rowops-down")){I(d,me.contains("worker-mini__rowops-up")?-1:1);return}if(me.contains("worker-mini__rowops-remove")){De("worker-queue-remove",{bead_id:d},$,Y);return}if(me.contains("worker-mini__start-now")){Gt(d,$);return}if(me.contains("mon2-crow__detach")){$e(d);return}if(me.contains("worker-dep__open")){kt(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(me.contains("mon2-arm__release")){on(d,y.getAttribute("data-lane-id")||"");return}if(me.contains("mon-lane__chip")){let Ne=y.getAttribute("data-lane-id")||"";de.querySelector(`.mon2-clane[data-lane-id="${Ne}"]`)?.scrollIntoView({block:"nearest"});return}if(me.contains("judgement-chip")){let Ne=y.getAttribute("data-chip-key")||"";Ne&&D.toggle({bead_id:d,chip_key:Ne});return}if(me.contains("rtile__failure-badge")){M=M===J?null:J,z();return}if(me.contains("rtile__provider-hold-badge")){F=F===J?null:J,z();return}if(me.contains("rtile__attempt-copy")){let Ne=y.getAttribute("data-attempt-id")||"";Ne&&$n(Ne).then(wt=>{ve(wt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",wt?"success":"error",1400)});return}if(me.contains("worker-card__place")){N=N===d?null:d,z();return}if(me.contains("worker-card__place-cancel")){N=null,z();return}if(me.contains("worker-card__place-lane")){let Ne=y.getAttribute("data-lane")||"parallel";N=null,He(d,Ne);return}if(me.contains("rtile__session")){if(m&&m.kind==="session"){let Ne=(m.session_refs||[]).find(wt=>wt&&wt.current===!0);Ne&&(Oe.hidden=!1,X.open(Bo(Ne,d,"in_progress",$)),z());return}q=J,J&&m&&(Oe.hidden=!1,X.open({attempt_id:J,root_dir:$,meta:je(m)})),z();return}if(me.contains("rtile__pause")){et("worker-attempt-pause",{attempt_id:J},$);return}if(me.contains("rtile__resume-alternate")){let Ne=Ua(J,qe($));Ne&&(K={root_dir:$,bead_id:d,draft:Ne},z());return}if(me.contains("rtile__resume")){At(d,J,$,y.dataset.resumeKind==="settlement"?"settlement":"session");return}if(me.contains("rtile__resolve")){pt(d,$,se.get($)?.revision??Wt(d).revision);return}if(me.contains("rtile__discard-abandon")){let Ne={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(xs(d,Ne)))return;Re({bead_id:d,operation_id:y.dataset.operationId||""},$,Y,Ne);return}if(me.contains("rtile__discard")){let Ne=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f($s(d,Ne)))return;G({bead_id:d,...J?{attempt_id:J}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},$,Y);return}if(me.contains("worker-mini__merge")){let Ne=Je($,d);Ne?.mismatch&&Ne.continuation===null?ne($,d,Y,Ne.mismatch):De("worker-merge-queue-add",{bead_id:d},$,Y);return}if(me.contains("worker-mini__merge-cancel")){De("worker-merge-queue-remove",{bead_id:d},$,Y);return}if(me.contains("worker-mini__discard-abandon")){let Ne={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(xs(d,Ne)))return;Re({bead_id:d,operation_id:y.dataset.operationId||""},$,Y,Ne);return}if(me.contains("worker-mini__discard")){let Ne=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f($s(d,Ne)))return;G({bead_id:d,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},$,Y);return}if(me.contains("worker-mini__revise-fix")){Ue("worker-revise-fix",{bead_id:d},$,Y);return}me.contains("worker-mini__revise-approve")&&De("worker-revise-approve",{bead_id:d},$,Y)}function st(y){let d=pe.consumeClickSuppression(),m=y.target;if(!m||typeof m.closest!="function")return;if(m.closest(".provider-resume-dialog__cancel")){Ke();return}if(m.closest(".provider-resume-dialog__confirm")){Lt();return}if(m.closest("dialog")||m.closest(".worker-drawer-overlay")||m.closest("a"))return;let $=m.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){y.preventDefault();let Ie=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";Ie&&qt(Ie);return}let Y=m.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Y){y.preventDefault();let Le=Y.getAttribute("data-root-dir")||P.get(m.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Y.getAttribute("title")||"";Rt(Le);return}let J=m.closest(".mon2-sec__toggle");if(J){y.preventDefault(),Dt(J.getAttribute("data-root-dir")||"");return}let me=m.closest(".worker-pane__toggle[data-lane]");if(me){y.preventDefault();let Le=me.getAttribute("data-lane")||"";(Le==="candidate"||Le==="queue"||Le==="running"||Le==="pr_wait"||Le==="done")&&Et(Le);return}let Ne=m.closest(".worker-wait__area-toggle[data-area]");if(Ne){y.preventDefault(),ot(Ne.getAttribute("data-area")||"parallel");return}if(m.closest(".mon2-newlane")){y.preventDefault(),xt("create","");return}let wt=m.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(wt){y.preventDefault();let Le=wt.getAttribute("data-lane-id")||"",Ie=wt.classList;xt(Ie.contains("mon2-clane__confirm")?"confirm":Ie.contains("mon2-clane__reapply")?"reapply":Ie.contains("mon2-clane__run")?"run":Ie.contains("mon2-clane__stop")?"stop":"remove",Le);return}if(m.closest(".mon-merge-all")){y.preventDefault(),Qe();return}let Ge=m.closest(".mon-filter__route");if(Ge){y.preventDefault(),g={...g,routes:pa(g.routes,Ge.getAttribute("data-route")||"")},Jc(g),z();return}let yt=m.closest(".mon-filter__readiness");if(yt){y.preventDefault(),g={...g,readiness:yt.getAttribute("data-readiness")||"all"},Jc(g),z();return}let Ut=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ut)return;let S=Ut.getAttribute("data-bead-id")||"",L=m.closest("button");if(L){y.preventDefault(),Bt(L,S);return}m.closest(".rtile__failure-pop, .chip-popover")||S&&!d&&(y.preventDefault(),kt(S,Ut.getAttribute("data-root-dir")||Wt(S).root_dir))}function Ct(y){let d=y.target;if(!d||typeof d.closest!="function")return;if(K){let me=Wa(K.draft,d,qe(K.root_dir));if(me){me!==K.draft&&(K={...K,draft:me},z());return}}let m=d.closest(".mon-filter__blocked");if(m){g={...g,show_blocked:m.checked},Jc(g),z();return}let $=d.closest(".mon-candidate-sort");if($){T=Ts.some(me=>me.value===$.value)?$.value:"repo_spec",jw(T),z();return}let Y=d.closest(".mon-running-sort");if(Y){b=Y.value==="repo"?"repo":"started",zw(b),z();return}let J=d.closest(".mon-done-range");J&&(_=Xn(J.value),Ww(_),z())}function yn(y){let d=y.target,m=d&&typeof d.closest=="function"?Y=>d.closest(Y):()=>null,$=!1;M&&!m(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,$=!0),F&&!m(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(F=null,$=!0),$&&z()}function Nt(y){y.key==="Escape"&&(M===null&&F===null&&K===null||(M=null,F=null,K=null,z()))}e.addEventListener("click",st),e.addEventListener("change",Ct),document.addEventListener("click",yn),document.addEventListener("keydown",Nt),D.attach(),pe.attach(e);{let y=!0;W=qa(d=>{if(re=d,y){y=!1;return}z()})}o&&typeof o.subscribe=="function"&&(ye=o.subscribe(()=>{try{se.clear(),z()}catch{}}));function kn(){ke!==null&&(clearInterval(ke),ke=null)}return{recorrectSharedLane:Xt,load(){n("load"),z(),ke===null&&(ke=setInterval(()=>{try{z()}catch{}},Kw))},pause(){kn()},clear(){kn(),pe.detach(),ye&&(ye(),ye=null),W&&(W(),W=null),X.destroy(),Oe.hidden=!0,Xe?.destroy(),Xe=null,e.removeEventListener("click",st),e.removeEventListener("change",Ct),document.removeEventListener("click",yn),document.removeEventListener("keydown",Nt),D.detach(),e.replaceChildren()}}}var Yw=["board","worker","monitor","compare","adr"];function mm(e,t,n){let r=Ht("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return b=>{b.preventDefault();let g=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",g),n.gotoView(g)}}function a(){let _=t.getState();return Yw.includes(_.view)?_.view:"board"}function u(){let _=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/monitor"
          class="ctl-tab ctl-tab--monitor ${_==="monitor"?"is-active":""}"
          @click=${l("monitor")}
        >
          <span class="ctl-tab__dots" aria-hidden="true"
            ><i></i><i></i><i></i><i></i
          ></span>
          Monitor
        </a>
        <a
          href="#/compare"
          class="ctl-tab ctl-tab--compare ${_==="compare"?"is-active":""}"
          @click=${l("compare")}
          >비교</a
        >
        <a
          href="#/adr"
          class="ctl-tab ctl-tab--adr ${_==="adr"?"is-active":""}"
          @click=${l("adr")}
          >ADR</a
        >
      </div>
    `}function p(){let _=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${_==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${_==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&lt(u(),o),i&&lt(p(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&lt(c``,o),i&&lt(c``,i)}}}var gm=["Critical","High","Medium","Low","Backlog"];function hm(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function b(){i.replaceChildren();let N=document.createElement("option");N.value="",N.textContent="\u2014 Select \u2014",i.appendChild(N);for(let M of Ai){let F=document.createElement("option");F.value=M,F.textContent=vd(M),i.appendChild(F)}s.replaceChildren();for(let M=0;M<=4;M+=1){let F=document.createElement("option");F.value=String(M);let K=gm[M]||"Medium";F.textContent=`${M} \u2013 ${K}`,s.appendChild(F)}}b();function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(N){o.disabled=N,i.disabled=N,s.disabled=N,l.disabled=N,a.disabled=N,p.disabled=N,f.disabled=N,f.textContent=N?"Creating\u2026":"Create"}function w(){u.textContent=""}function Q(N){u.textContent=N}function re(){try{let N=window.localStorage.getItem("beads-ui.new.type");N?i.value=N:i.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?s.value=M:s.value="2"}catch{i.value="",s.value="2"}}function W(){let N=i.value||"",M=s.value||"";N.length>0&&window.localStorage.setItem("beads-ui.new.type",N),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function q(){w();let N=String(o.value||"").trim();if(N.length===0){Q("Title is required"),o.focus();return}let M=Number(s.value||"2");if(!(M>=0&&M<=4)){Q("Priority must be 0..4"),s.focus();return}let F=String(i.value||""),K=String(a.value||""),D={title:N};F.length>0&&(D.type=F),String(M).length>0&&(D.priority=M),K.length>0&&(D.description=K),T(!0);try{await t("create-issue",D)}catch{T(!1),Q("Failed to create issue");return}W(),T(!1),g()}return n.addEventListener("cancel",N=>{N.preventDefault(),g()}),_.addEventListener("click",()=>g()),p.addEventListener("click",()=>g()),n.addEventListener("keydown",N=>{N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&(N.preventDefault(),q())}),r.addEventListener("submit",N=>{N.preventDefault(),q()}),{open(){r.reset(),w(),re();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){g()}}}var Xw=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Qw(e,t){return gl(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Qw(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${o}`}
                data-label=${r}
                data-state=${o}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function ym(e,t,n){return c`
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
  `}function vm(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Xw.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Zw=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function km(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(oe=>ve(oe,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",p=null;function f(){if(p)return p;let oe=s.querySelector('[data-pane="execution"]');return oe?(p=Va(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),p):null}function _(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function b(){let oe=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${oe?c`
              ${bm(oe,o(),Q)}
              ${ym(oe,u,{onDraft:fe=>{u=fe},onAdd:re,onRemove:W})}
              ${vm(oe,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function g(oe){let fe=r.get();if(fe)try{let be=await n("display-policy-set",{expected_revision:fe.revision,policy:oe(fe)});T(be),be&&be.conflict&&be.policy&&(be=await n("display-policy-set",{expected_revision:be.policy.revision,policy:oe(be.policy)}),T(be)),be&&be.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function T(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function w(oe){g(oe)}function Q(oe){let fe=r.get();if(!fe)return;let be=!Jw(oe,fe);w(H=>e$(oe,H,be))}function re(){let oe=u.trim();oe.length!==0&&(u="",w(fe=>fe.hidden_prefixes.includes(oe)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,oe]}),N())}function W(oe){w(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(be=>be!==oe)}))}function q(oe){let fe=r.get();if(!fe)return;let be=fe.chips[oe]===!1;w(()=>({chips:{[oe]:be}}))}function N(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Zw.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(l===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>M(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${R}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${b()}
          </div>
        </div>
      `,s),f()}function M(oe){l=oe,N()}let F=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",F),s.addEventListener("cancel",F);let K=oe=>{oe.target===s&&R()};s.addEventListener("click",K);let D=null;r.subscribe&&(D=r.subscribe(()=>{a&&N()}));let A=null;t.implPresetStore?.subscribe&&(A=t.implPresetStore.subscribe(()=>{a&&p?.render()}));function C(oe="execution"){a||(a=!0,t.onOpenChange?.(!0),l=oe,u="",N(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function R(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:C,close:R,sessionDraft:()=>p?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",F),s.removeEventListener("cancel",F),s.removeEventListener("click",K),D&&(D(),D=null),A&&(A(),A=null),p?.destroy(),p=null,s.remove()}}}function Jw(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function e$(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var t$=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wm="usage-meter-card",n$="usage-meter-layer",eu=600,r$=["token_expired","relogin_required"];function $m(e){return String(e).padStart(2,"0")}function o$(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function xm(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${$m(r.getHours())}:${$m(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${t$[r.getMonth()]} ${r.getDate()} ${i}`;return`${o$(n,t)} \xB7 ${l}`}function s$(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Am(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Sm(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Em=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Rm(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function i$(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Rm(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function a$(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=i$(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Rm(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function l$(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=a$(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Cm(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function c$(e,t){return!e.held||Cm(e,t)<=eu?e:{...e,available:!1,windows:[],accounts:[]}}function Tm(e,t){return`${e}:${t}`}function Om(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){lt(c``,e),e.hidden=!0,f()}function p(){if(a===null){let H=e.ownerDocument;a=H.createElement("div"),a.id=n$,a.className="usage-meter__layer",H.body.appendChild(a)}return a}function f(){a!==null&&(lt(c``,a),a.remove(),a=null)}function _(H){n!==H&&(n===null&&(document.addEventListener("mousedown",g),document.addEventListener("keydown",w),window.addEventListener("resize",T)),n=H)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",w),window.removeEventListener("resize",T))}function g(H){let ee=H.target;ee&&(e.contains(ee)||a!==null&&a.contains(ee))||(b(),R())}function T(){R()}function w(H){H.key==="Escape"&&(b(),R())}function Q(H){n===H?b():_(H),R()}function re(){b(),R()}async function W(H,ee){if(r.has(H.key))return;let de=Tm(H.key,ee);r.set(H.key,ee),s.delete(de),R();let Oe=null;try{Oe=await(await fetch(H.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Oe=null}if(t)return;if(r.delete(H.key),!Oe||Oe.ok!==!0){let ae=Oe&&typeof Oe.error=="string"&&Oe.error.length>0?Oe.error:"network_error";s.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),R();return}let Z=Array.isArray(Oe.warnings)?Oe.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];Z.length>0&&s.set(de,{kind:"warn",text:Z.join(" \xB7 ")}),R(),await be()}function q(H,ee,de,Oe){let Z=Sm(H.pct),le=`resets ${xm(H.resetsAt,Oe)}${ee?` \xB7 ${de}`:""}`;return c`<span
      class="usage-meter__window ${Am(Z)}"
      style=${`--progress: ${Z}%`}
      title=${le}
    >
      <span class="usage-meter__label">${H.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Z}%</span>
    </span>`}function N(H,ee,de){let Oe=Cm(ee,de),Z=ee.available&&(ee.held||Oe>eu),ae=Z?`${Math.floor(Oe/60)}\uBD84 \uC804 \uCE21\uC815`:"",le=ee.accounts.filter(ye=>!ye.active).length,P=`usage-meter__group${Z?" usage-meter__group--stale":""}`,se=c`<span class="usage-meter__provider"
        >${H.label}</span
      >
      ${ee.available?ee.windows.map(ye=>q(ye,Z,ae,de)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${le>0?c`<span class="usage-meter__badge">+${le}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${P}
        aria-label=${`${H.label} usage`}
        >${se}</span
      >`;let ie=n===H.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${P}`}
      aria-label=${`${H.label} usage`}
      aria-expanded=${ie?"true":"false"}
      aria-controls=${wm}
      @click=${()=>Q(H.key)}
    >
      ${se}
    </button>`}function M(H,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${H.map(de=>N(de.provider,de.snapshot,ee))}
    </span>`}function F(H,ee){let de=Sm(H.pct),Oe=xm(H.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${Am(de)}"
      style=${`--progress: ${de}%`}
    >
      <span class="usage-meter__account-key">${H.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${de}%</span>
      <span class="usage-meter__account-reset"
        >${Oe.length>0?`\u21BB ${Oe}`:""}</span
      >
    </span>`}function K(H,ee){return r$.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${H.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function D(H,ee,de){let Oe=ee.status==="ok",Z=typeof ee.ageSeconds=="number"&&ee.ageSeconds>eu,ae=s.get(Tm(H.key,ee.number)),le=r.get(H.key),P=le!==void 0,se=le===ee.number,ie=["usage-meter__account"];return ee.active&&ie.push("usage-meter__account--active"),Oe||ie.push("usage-meter__account--unavailable"),Z&&ie.push("usage-meter__account--stale"),c`<div class=${ie.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ee.email}
          >${ee.alias===null?ee.email:ee.alias}</span
        >
        ${ee.plan===null?"":c`<span class="usage-meter__account-tag">${ee.plan}</span>`}
        ${ee.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ee.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${s$(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${P}
              @click=${()=>{W(H,ee.number)}}
            >
              ${se?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Oe?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(ye=>F(ye,de))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(H,ee.status)}
          </div>`}
      ${ae===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function A(H,ee,de){let Oe=ee.accounts.filter(Z=>Z.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${H.label} · 활성 ${Oe} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(Z=>D(H,Z,de))}
    </section>`}function C(H,ee){return c`<div
      class="usage-meter__card"
      id=${wm}
      role="dialog"
      aria-label=${`${H.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${A(H.provider,H.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function R(){let H=Date.now(),ee=[];for(let Oe of Em){let Z=i.get(Oe.key);Z&&ee.push({provider:Oe,snapshot:c$(Z,H)})}if(ee.length===0){b(),u();return}let de=ee.find(Oe=>Oe.provider.key===n&&Oe.snapshot.accounts.length>0);de||b(),lt(M(ee,H),e),e.hidden=!1,de?oe(de,H):f()}function oe(H,ee){let de=p(),Oe=e.getBoundingClientRect(),Z=e.ownerDocument.documentElement.clientWidth;de.style.setProperty("--usage-meter-anchor-top",`${Oe.bottom}px`),de.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Z-Oe.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${re}
        ></div>
        ${C(H,ee)}`,de)}async function fe(H){try{let ee=await fetch(H.endpoint);return ee.ok?l$(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function be(){l+=1;let H=l,ee=await Promise.all(Em.map(async de=>({provider:de,read:await fe(de)})));if(!(t||H!==l)){for(let de of ee){let Oe=de.provider.key;if(de.read.kind==="ok"){i.set(Oe,de.read.snapshot);continue}if(de.read.kind==="empty"){i.delete(Oe);continue}let Z=i.get(Oe);Z!==void 0&&!Z.held&&i.set(Oe,{...Z,held:!0})}R()}}return u(),be(),o=setInterval(()=>{be()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),b(),u()}}}function Yo(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Dm="bdui.worker.candidate_sort",Zs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Xa=Object.freeze({preset:"spec"}),Pm=3,Nm=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Im(e){return Zs.some(t=>t.id===e)}function Lm(e){let t=Zs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function u$(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Js(e){return e&&"preset"in e?Lm(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Lm("spec")}function tu(e){return e&&"preset"in e?e.preset:null}function co(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Im(e)?{preset:e}:Xa}return co(i)}if(!e||typeof e!="object")return Xa;let t=e;if(Im(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Pm||!n.every(ll))return Xa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Zs.find(i=>u$(i.chain,r));return o?{preset:o.id}:{chain:r}}function Mm(){try{return co(window.localStorage.getItem(Dm))}catch{return Xa}}function nu(e){try{window.localStorage.setItem(Dm,JSON.stringify(e))}catch{}}function qm(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(fi,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:fi[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,Pm)}function jm(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function d$(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Yo(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let p=r.get(u);p?p.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function Fm(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Fu(Js(t))),d$(n)}function Bm(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=Ui(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,p=o[l].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:a}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Um=new Set(["sh","bash","zsh","dash","ksh"]),Wm=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Hm(e){let t=e.split("/");return t[t.length-1]||""}function p$(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Hm(n[0]);if(r!=="env")return Um.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&Um.has(Hm(o))}function f$(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function _$(e){let t=[],n=0;Wm.lastIndex=0;for(let r of e.matchAll(Wm)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:f$(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function m$(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function zm(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,p=!1;function f(N,M){return M?_$(N).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):N}function _(){if(!o)return c``;let N=i==="ready"&&p$(s),M=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>W()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${o.path}
              >${o.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${o.base_ref}@${o.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{g()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>W()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${M.map((F,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,N)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){lt(_(),r)}async function g(){if(i!=="ready")return;let N=await $n(s);ve(N?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",N?"success":"error")}function T(N){N.key==="Escape"&&o&&(N.preventDefault(),W())}function w(){p||(document.addEventListener("keydown",T),p=!0)}function Q(){p&&(document.removeEventListener("keydown",T),p=!1)}async function re(N,M=null){let F=++a;w(),o={...N},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let D=t?t():"";if(!D){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let A="/api/repo-ops-script?workspace="+encodeURIComponent(D)+"&lane="+encodeURIComponent(N.lane)+"&base_sha="+encodeURIComponent(N.base_sha);try{let C=await n(A),R=await C.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==D){W();return}if(!C.ok||!R||R.ok!==!0){i="error",l=m$(R&&typeof R.error=="string"?R.error:""),b();return}o={lane:R.lane,base_sha:R.base_sha,path:R.path,base_ref:R.base_ref},s=String(R.content),i="ready",b()}catch{if(F!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function W(){a+=1,Q(),o=null,s="",b();let N=u;u=null,N?.isConnected&&N.focus()}function q(){W(),r.remove()}return{open:re,close:W,destroy:q}}var Km={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},g$=new Set(["queued","running","retry_pending"]);function Gm(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let A=i();return typeof A.revision=="number"?A.revision:0}function l(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function a(){let A=i().workspace_info;return A&&typeof A=="object"?A:{}}function u(A,C){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${C}</span
    >`}function p(A){if(typeof A!="number"||!Number.isFinite(A))return"";let C=A/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function f(A){let C=p(A);return C?u("config",C):""}function _(A,C,R){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${oe=>{o&&o({lane:A,base_sha:C.base_sha,path:R.script,base_ref:C.base_ref},oe.currentTarget)}}
    ></button>`}function b(){let A=i().repo_operations;return Array.isArray(A)?A:[]}function g(){let A=a().repo_ops,C=A&&typeof A=="object"?A.repo_id:null;return typeof C=="string"&&C?C:null}function T(){return b().some(A=>A&&A.kind==="deploy"&&g$.has(A.state))}function w(){let A=T(),C=g()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${A||C}
      title=${A?"\uBC30\uD3EC \uC9C4\uD589 \uC911":C?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function Q(){let A=i().repo_ops_opt_out;return{verify:A?.verify===!0,deploy:A?.deploy===!0}}function re(A,C){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!C}
        @change=${R=>{N(A,!R.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function W(A){let C=typeof A.base_sha=="string"?A.base_sha:"",R=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`,oe=Q(),fe=!!A.verify&&oe.verify,be=!!A.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${_("verify",A,A.verify)}
              ${f(A.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${A.verify?re("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${_("deploy",A,A.deploy)}
              ${f(A.deploy.timeout_ms)}
              ${be?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):w()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${A.deploy?re("deploy",oe.deploy):""}
      </div>
    </section>`}function q(A){let C=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?W(C):C&&(C.status==="pending"||C.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${C.error_code?c` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function N(A,C){if(!n)return;let R=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:C,expected_revision:s()});if(l(R),R&&R.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:C,expected_revision:s()});l(oe)}r()}async function M(){let A=g();if(!n||A===null)return;let C=await n("worker-repo-operation-deploy-run",{repo_id:A});if(l(C),!C||C.ok!==!0){let R=C&&typeof C.reason=="string"?C.reason:"",oe=Object.hasOwn(Km,R)?Km[R]:R||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ve(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else ve("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(A,C,R){return c`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${C.map(oe=>c`<li data-token=${oe}>
              ${F[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function D(){let A=i(),C=A.repo_operation_policy&&typeof A.repo_operation_policy=="object"?A.repo_operation_policy:null;return C?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(C.worker_automatic||[]).length} · 금지
            ${(C.never_automatic||[]).length}</span
          >
        </summary>
        ${C.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${C.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",C.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",C.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${D()}
      </details>`}}}var Xm=20,h$=5,b$=new Set(["failed","running","queued","retry_pending"]),ru={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Vm={verify:"verify",deploy:"deploy",job:"deploy"};function y$(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function v$(e){return!e||typeof e!="object"?"":e.kind==="job"?y$(e.script_path)||ru.job:Object.hasOwn(ru,e.kind)?ru[e.kind]:e.kind}function k$(e,t,n=Xm){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function w$(e){if(e.type==="cleanup")return!0;let t=e.operation;return b$.has(t.state)&&!t.dismissed&&!t.superseded_by}function $$(e,t,n={}){let r=k$(e,t,1/0),o=n.expanded===!0?Xm:h$,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||w$(l));return{visible:s,hidden:r.length-s.length}}function Ym(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function x$(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Qm(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Xr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Zm(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function A$(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Vm,n))return;let r=e[Vm[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function S$(e,t){let n=z_(e,t),r=K_(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function E$(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function T$(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${Gi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ym(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${v$(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ki(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Zr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ym(e)}"
          >${x$(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Zm(H_(n.failure_kind,o)):""}
      ${S$(n,A$(t,n))}
      ${E$(n)}
      ${Qm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ki(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function R$(e){let t=e.cleanup,n=to(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${Gi(e.at)||"\u2014"}</span
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
        ${Dp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Zm(Dr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${Qm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function C$(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?R$(r):T$(r,e.repo_ops))}
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
  </section>`}function Jm(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let s=$$(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(C$({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}function O$(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:{}}function eg(e){let t=new Map;for(let r of Array.isArray(e)?e:[]){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=O$(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Yo({dependencies:r.dependencies})){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}var I$="session-preferred",L$=["external_roundtrip","user_feedback_loop"];function tg(e,t){if(!ys(e).includes(I$)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&L$.includes(n)?n:""}var D$="spec-after-blocker";function ng(e,t){return ys(e).includes(D$)&&Array.isArray(t)&&t.length>0}var P$=Ht("views:worker:adapter"),N$="tab:worker:ready",M$="tab:worker:blocked",q$="tab:worker:in-progress",j$="tab:worker:resolved",F$="tab:worker:closed",B$="\u{1F512} blocked",U$={revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},W$=["claude_account","codex_account"],H$=[...To,...W$];function z$(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function K$(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${zl}: ${n}`:zl}function uo(e){return e&&typeof e=="object"?e:{}}function G$(e){let t={};for(let n of H$){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function V$(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function rg(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?yo(n):null,l=new Map,a={},u=null,p=0,f=null,_=!1;function b(){_||!i||i()}function g(M){return u===M?a:{}}async function T(){if(!r||_)return;let M=o?.()||"";if(u===M||f&&f.key===M&&f.generation===p)return;let F=++p;f={key:M,generation:F};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(D){if(F!==p)return;f=null,P$("get-session-defaults failed: %o",D),b();return}F===p&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=M,f=null,b())}function w(){u=null,p+=1,T()}function Q(){for(let[M,F]of l)F==="failed"&&l.delete(M)}function re(M,F){return s?s.selectBoardColumn(M,F):[]}function W(M,F,K,D){let A=new Set(K.map(H=>H.id)),C=new Set,R=new Map,oe=[];for(let H of[...F,...K]){if(C.has(H.id)||z$(H))continue;let ee=vs(H,M);ee.location===null&&(C.add(H.id),R.set(H.id,ee),oe.push(H))}let fe=Fm(oe,co(D)),be=uo(M.bead_scope);return fe.map(H=>{let ee=R.get(H.id),de=ho(H),Oe=de.evidence==="published",Z=typeof H.workflow?.route=="string"&&H.workflow.route||(H.metadata&&typeof H.metadata.route=="string"?H.metadata.route:""),ae=ee.worker_ineligible,le=ae||!Object.hasOwn(H,"labels")?"":tg(H.labels,H.metadata),P=A.has(H.id),se=P?Yo(H):[],ie=[];P&&se.length===0&&ie.push(B$),ee.awaiting_user&&ie.push(K$(H.metadata)),ee.missing_description?ie.push("missing_description"):ee.spec==="conflict"?ie.push("spec_id_conflict"):ee.spec==="none"?ie.push("spec \uC5C6\uC74C"):ee.spec==="draft"&&ie.push("spec \uBBF8\uBC1C\uD589(draft)");let ye=be[H.id];return{bead_id:H.id,title:H.title||H.id,route:Z,spec_id:de.conflict?"":de.path,published:Oe,blocked:P,blocked_by:se,labels:Array.isArray(H.labels)?H.labels:[],created_at:H.created_at,updated_at:H.updated_at,status:H.status,workflow:H.workflow||null,exec_pins:G$(uo(H.metadata)),rec:null,...ye&&Array.isArray(ye.scope)?{scope:ye.scope}:{},eligible:ee.placeable,route_ok:ee.route_ok,awaiting_user:ee.awaiting_user,missing_description:ee.missing_description,placement_spec:ee.spec,reason:ie.join(" \xB7 "),worker_ineligible:ae,session_preferred:le.length>0,session_preferred_reason:le,spec_after_blocker:ng(H.labels,se),release_info:H.release_info,dependents_info:H.dependents_info}})}function q(M){let[F,K,D,A,C]=M,R=bi([...F,...K,...D,...A,...C]),oe=eg([...F,...K,...D,...A]),fe={},be=(H,ee)=>{if(!H||typeof H.id!="string"||H.id.length===0)return;let de=fe[H.id]||(fe[H.id]={});if(typeof H.priority=="number"&&!("priority"in de)&&(de.priority=H.priority),typeof H.from_id=="string"&&!("from_id"in de)&&(de.from_id=H.from_id),ee&&!("metadata"in de)){de.metadata=uo(H.metadata);let Oe=uo(H.workflow).route;typeof Oe=="string"&&Oe.length>0&&(de.route=Oe)}};for(let H of[...F,...K,...D])be(H,!0);for(let H of[...A,...C])be(H,!1);for(let H of new Set([...Object.keys(fe),...R.keys()])){let ee=yi(R,H);if(ee.total>0){let de=fe[H]||(fe[H]={});de.rollup=ee}}for(let[H,ee]of oe){let de=fe[H]||(fe[H]={});de.carried_to=ee}return fe}function N(M,F,K,D){let A=new Set((Array.isArray(M.done)?M.done:[]).map(R=>R?.bead_id).filter(R=>typeof R=="string")),C=[];for(let R of F){let oe=$r(R.closed_at);if(typeof R.id!="string"||A.has(R.id)||oe===null||D!==void 0&&oe<D||typeof R.comment_count!="number"||R.comment_count<=0)continue;let fe=`${K}\0${R.id}\0${String(R.updated_at)}\0${R.comment_count}`,be=l.get(fe);if(be===void 0&&r&&(l.set(fe,"pending"),Promise.resolve(r("get-comments",{id:R.id})).then(ee=>{let de=Array.isArray(ee)&&ee.some(Oe=>Ia(typeof Oe?.text=="string"?Oe.text:"")?.lane==="session");l.set(fe,de?"session":"not-session"),b()}).catch(()=>{l.set(fe,"failed"),b()})),be!=="session")continue;let H=$r(R.started_at);C.push({id:R.id,title:R.title||R.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:H!==null&&oe>=H?oe-H:null,work_kind:"session",done_at:oe,created_at:R.created_at,updated_at:R.updated_at})}return C}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||U$,K=o?.()||"",D=M&&typeof M.done_since=="number"?M.done_since:void 0,A=re(N$,"ready"),C=re(M$,"blocked"),R=re(q$,"in_progress"),oe=re(j$,"resolved"),fe=re(F$,"closed");return{workspaces:[{...F,bead_titles:{...uo(F.bead_titles),...Object.fromEntries([...A,...C].filter(be=>be&&typeof be.id=="string").map(be=>[be.id,be.title||be.id]))},root_dir:K,name:V$(K),runnable:W(F,A,C,M?M.candidate_sort:void 0),session_done:N(F,fe,K,D),bead_overlay:q([A,C,R,oe,fe])}],workspaces_state:[{root_dir:K,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof uo(F.workspace_info).slots=="number"?uo(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:g(K),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,quick_fix_orchestration_model:F.quick_fix_orchestration_model,quick_fix_orchestration_effort:F.quick_fix_orchestration_effort,quick_fix_orchestration_speed:F.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){T()},refreshSessionDefaults:w,notifyIssuesChanged:Q,destroy(){_=!0,p+=1,f=null,l.clear()}}}var Qa=1,og=5,Y$={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Qa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function bn(e){return e&&typeof e=="object"?e:{}}var ag="beads-ui.worker.candidate-filter",ou={show_blocked:!1,readiness:"all",routes:[]},X$=1e3;function Q$(){try{let e=window.localStorage.getItem(ag);if(!e)return{...ou};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ou};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:no(t.routes)}}catch{return{...ou}}}function Z$(e){try{window.localStorage.setItem(ag,JSON.stringify(e))}catch{}}var lg="bdui.worker.done-range";function J$(){try{let e=window.localStorage.getItem(lg);return e===null?"today":Xn(e)}catch{return"today"}}function ex(e){try{window.localStorage.setItem(lg,e)}catch{}}function sg(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function tx(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function ig(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function nx(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function rx(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function ox(e){return e&&e.launched===!0?"success":"error"}function sx(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function ix(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var ax=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),lx=new Set(["waiting_metadata","reviewing","retrying"]),su=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function cx(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":{let o=typeof n.origin_reason=="string"&&n.origin_reason.startsWith("receipt_unbacked:")?n.origin_reason.slice(17):null;return o!==null?{label:`\uC601\uC218\uC99D \uB300\uAE30 \u2014 ${o}`,details:[r,"\uC0C8 \uCEE4\uBC0B\xB7\uC0C8 \uC601\uC218\uC99D\xB7\uC7AC\uAD00\uCE21\uC774 \uC624\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}:{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}}case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?rn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ux(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function dx(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=ux(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?lo(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!ax.has(e.phase)}}function px(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function fx(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function _x(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=px(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(su.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${tx(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ig(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ig(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.reason==="pr_repo_foreign"?n("\uC678\uBD80 \uC800\uC7A5\uC18C PR",{title:"\uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 PR\uC785\uB2C8\uB2E4. \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C\uB294 \uC0C1\uD0DC\uB97C \uAD00\uCE21\xB7\uBA38\uC9C0\xB7\uC815\uB9AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function mx(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,p=null,f=null,_=null,b={},g=!1,T={},w=null,Q={active:!1,failure:null,origin:null},re=!1,W={}){let q=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,M=!!a&&a.active===!0,F=a&&a.failure||null,K=sx(a?a.waiting:null),D=n[e]||null,A=D&&D.gate?D.gate:null,C=D&&D.pr?D.pr:null,R=W.foreign===!0,oe=R&&typeof W.repo_slug=="string"?W.repo_slug:"",fe=R&&typeof W.pr_url=="string"?W.pr_url:"",be=R&&typeof W.pr_number=="number"?W.pr_number:null,H=ix(a?a.resolution:null),ee=cx(_),de=dx(_,ee),Oe=a&&a.authority||null,Z=a&&a.review_dispatch||null,ae=a?.hold?.auto_review_wait==="slot"?"slot":null,le=!!_&&typeof _=="object"&&lx.has(_.phase),P=q&&!M&&(!Oe||le||Oe.source==="automatic"&&!g),se=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":K,ie=!!A&&A.base_badge==="\uCDA9\uB3CC",ye=!!A&&A.enabled===!0,ke=Es({bead_id:e,merge_sha:T.merge_sha,cleanup_cursor:T.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:T.repo_operations}),Xe=la(ke),X=i&&!ke&&(i.queueing??null)?i.queueing:null,pe=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!A&&A.tier==="merged",ce=r&&r.step==="repo_operations"&&ke?.failed===!0&&(ke.step==="deploy"||ke.step==="verify")?ke.step:null,V=l&&!!r&&!!A&&A.tier==="merged",Ce=P&&(ye||ie||A?.reason==="base_behind"||su.has(A?.reason)||pe||V),he=su.has(A?.reason),De=l&&ie&&u===!1,qe=_r(b,e,{external:l,merge_active:M||ke?.step==="merge",merge_queued:q,conflict_active:!!s,cleanup_active:Xe,merged:!!r||A?.tier==="merged"}),Je=!!qe.operation,Ue=!!r||_?.phase==="needs_human"||!!qe.error,ne=q&&!F&&!N&&!pe&&!(de&&de.lock_actions),G=_x({auto_pending:ne,continuation_required:N,queueing:X,merge_step:ke,conflict_badge:se,conflict_live:H?.live===!0||s==="running",auto_resolution:ee,recovery:de,cleanup_failed:r,cleanup_label:r?to(r.step):null,base_exception:f,conflicting:ie,gate:A,receipt_check:D&&D.receipt_check?D.receipt_check:null,queue_failure:F,auto_skip:p,queued:q,queue_active:M,queue_position:a?a.position:0,review_session:Q,review_dispatch:Z,auto_review_wait:ae,activity:se?null:i&&i.activity||null}),Re=G?.live===!0&&G.title?c`<span title=${G.title}>${G.label}</span>`:G?.label||null,et=fx(D&&D.receipt_check?D.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ke?.active!==!0?aa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...w?{dependency_chips:w}:{},external:l,pr_number:be??(C&&typeof C.number=="number"?C.number:null),pr_url:fe||(C&&typeof C.url=="string"?C.url:""),...oe?{foreign_repo:oe}:{},completion_badge:G?.live!==!0&&G?.title?G.label:null,completion_title:G?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...et.length>0?{receipt_badge:{codes:et}}:{},badges:Re?[Re]:[],live_badge:G?.live===!0?Re:null,usage:o,alert:G?.alert===!0,merge_action:A?.tier==="merged"&&!pe&&!V?!1:!q||N||P||he,cancel_action:q&&!N,cancel_enabled:!M&&!(de&&de.lock_actions),cancel_title:de&&de.lock_actions?`${de.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:qe,discard_action:qe.action,resolve_action:Ue,resolve_enabled:!re,resolve_title:re?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ke,discard_enabled:qe.enabled,discard_title:qe.title,merge_enabled:!ke&&!X&&!s&&!Je&&!f&&!(de&&de.lock_actions)&&!De&&Q.active!==!0&&(ye||ie||A?.reason==="base_behind"||he||pe||V||Ce||le&&!M),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":pe||V?ce==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":ce==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":ie&&!ke&&!pe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":he?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":P?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Je?qe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${qe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${qe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":X?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:ce?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${ce==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:V?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":De?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ie?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q.active===!0?Q.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ye?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function iu(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:p,onDoneRangeChange:f}=t,_=r?yo(r):null,b=Q$(),g=null,T=null,w=null,Q=null,re=null,W=Lo(()=>$()),q=new Map,N=new Map,M=Mm(),F=tu(M)===null,K=p?Xn(p):J$();function D(){let k=fo.find(h=>h.value===K);return k?k.label:"\uC624\uB298"}let A=ja("beads-ui.worker.lane-collapsed"),C=!1,R="";function oe(){return R.trim().length>0}function fe(k){return oe()?k.filter(h=>h.search_match===!0).length:void 0}let be=new Set,H=new Set,ee=new Set,de=new Set,Oe=new Set,Z=new Set,ae=null,le=[],P=rg({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function se(){P.refreshSessionDefaults()}let ie=document.createElement("div");ie.className="worker-console";let ye=document.createElement("div");ye.className="worker-top";let ke=document.createElement("div");ke.className="worker-drawer-overlay",ke.hidden=!0;let Xe=document.createElement("div");Xe.className="worker-drawer-overlay__backdrop";let X=document.createElement("div");X.className="worker-drawer-host";let pe=document.createElement("div");pe.className="worker-drawer-host",pe.hidden=!0,ke.append(Xe,X,pe);let ce=document.createElement("div");ce.className="worker-lanes-host",ie.append(ye,ke,ce),e.appendChild(ie);let V=Cr(null,null),Ce=[],he=Ba({transport:n,console_el:ie,getLanes:()=>V,getWorkspaces:()=>Ce,getCrossLanes:()=>null,reproject:()=>({lanes:z(),raw_lanes:null}),onCorrection:()=>{},showToast:ve,requestRender:()=>$(),adoptQueue:(k,h)=>{o&&o.set(h)},onDragBegin:()=>{T=null}}),De=null,qe=zo(X,{transport:n,sessionLogStore:i,onClose:()=>{De=null,ke.hidden=!0,$()}}),Je=Jm(pe,{onClose:()=>{pe.hidden=!0,ke.hidden=!0,$()}}),Ue=zm({getWorkspacePath:l||(()=>"")}),ne=l&&l()||"",G=Gm({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(k,h)=>{Ue.open(k,h)}});function Re(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Qa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(k){let h=Ua(k,Re());h&&(re=h,$())}function pt(){re=null,$()}function Qe(){let k=Ha(re);k&&(re=null,$(),x(k.attempt_id,"session",k.payload))}function mt(k){if(!T||!k.some(O=>O.id===T))return null;let h=ks(Re());return h?{bead_id:T,lanes:h}:null}function Dt(){return l&&l()||""}async function Et(k,h){await he.sendOp({type:"worker-queue-place",payload:{bead_id:k,...h==="parallel"?{}:{lane:h}},root_dir:Dt()},k)}function ot(){let k=Re();return typeof k.revision=="number"?k.revision:0}function ht(k){k&&k.queue&&o&&o.set(k.queue)}async function Zt(k){if(!n||!k)return;let h=await n("worker-attempt-pause",{attempt_id:k});h&&h.paused===!1&&h.reason&&ve(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function x(k,h="session",O={}){if(!n||!k)return;let ue=n,Se=Re().attempts?.[k]||null;await Fo({context:{bead_id:Se?.bead_id||"",kind:h,tuple:Se?Ln(Se):""},transport:Fe=>ue("worker-attempt-resume",{attempt_id:k,expected_revision:ot(),...O,...Fe}),adopt:ht})}async function te(k,h,O=!0){if(!n)return null;let ue=n,Se=await ue(k,{...h,expected_revision:ot()});return ht(Se),Se&&Se.conflict&&O&&(Se=await ue(k,{...h,expected_revision:ot()}),ht(Se)),Se}async function Me(k){if(!n||!k)return;let h=Re().merge_queue?.find(ue=>ue.bead_id===k)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ot(k,h.mismatch);return}be.add(k),$();let O;try{O=await te("worker-merge-queue-add",{bead_id:k})}catch{ve("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{be.delete(k),$()}if(!(!O||O.applied)){if(O.conflict){ve("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ve(nx(O.reason),"error",2400)}}async function Ee(k){if(!(!n||!k||H.has(k))){H.add(k),$();try{let h=await n("worker-cleanup-retry",{bead_id:k,expected_revision:ot()});ht(h),h&&!h.retried&&!h.conflict&&h.reason&&ve(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{H.delete(k),$()}}}async function Pe(k){if(!(!n||!k||ee.has(k))){ee.add(k),$();try{let h=await n("worker-resolve-in-session",{bead_id:k,expected_revision:ot()});ht(h);let O=rx(h);O!==null&&ve(O,ox(h),4e3)}finally{ee.delete(k),$()}}}async function Be(k,h){let O=Re().hold;if(!n||!O||typeof O.since!="number")return;let ue=await n(k,{since:O.since});ht(ue),ue&&ue.ok===!1&&ve(`${h}: ${ue.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ue.reason||""}`,"error",2800)}async function tt(k){if(!n||!k)return;let h=await n("worker-queue-start-now",{bead_id:k});ht(h),h&&h.ok===!1&&ve(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${h.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":h.reason||""}`,"error",2800)}async function Ot(k,h){let O=await Ir({continuation_mismatch:h},(Se,Fe)=>te("worker-merge-queue-add",{bead_id:k,continuation:Se,decision_token:Fe},!1)),ue=O?.queue?.merge_queue?.find(Se=>Se.bead_id===k)?.continuation_action;if(O?.applied!==!0&&ue?.continuation===null&&ue.mismatch){await Ot(k,ue.mismatch);return}O&&O.applied===!1&&!O.conflict&&ve("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function _e(k){if(!n)return;let h=await te("worker-merge-auto-toggle",{on:k});!h||h.conflict||ve(k?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",k?"success":"info",2400)}async function Ae(k){if(!n||!k)return;let h=await te("worker-merge-queue-remove",{bead_id:k});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ve("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ze(){await te("worker-merge-queue-remove",{all:!0})}async function bt(k,h=null,O="unmerged",ue=null){if(!n||!k)return;let Se=$s(k,O);if(!(!!ue||typeof globalThis.confirm!="function"||globalThis.confirm(Se)))return;let nt=await n("worker-discard",{bead_id:k,...h?{attempt_id:h}:{},...ue?{operation_id:ue}:{},expected_revision:ot()});if(ht(nt),nt&&nt.conflict&&(nt=await n("worker-discard",{bead_id:k,...h?{attempt_id:h}:{},...ue?{operation_id:ue}:{},expected_revision:ot()}),ht(nt)),nt&&nt.discarded===!0){ve(Yi(nt),"success",5e3);return}if(nt&&nt.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${nt.reason}`,"error",2800);return}if(nt&&nt.accepted&&nt.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(nt&&nt.accepted&&!nt.discarded){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${nt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}nt&&!nt.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function it(k,h,O){if(!n||!k||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(xs(k,O)))return;let ue=await n("worker-discard-abandon",{bead_id:k,operation_id:h,expected_revision:ot()});if(ht(ue),ue&&ue.conflict&&(ue=await n("worker-discard-abandon",{bead_id:k,operation_id:h,expected_revision:ot()}),ht(ue)),ue&&ue.abandoned===!0){ve(Vi(O),"success",5e3);return}if(ue&&ue.reason){ve(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ue.reason}`,"error",2800);return}ue&&!ue.conflict&&ve("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ct(k,h,O){if(!(!n||!h||!O||Oe.has(h))){Oe.add(h),$();try{let ue=await n(k,{bead_id:h,action_id:O,expected_revision:ot()});ht(ue);let Se=typeof ue?.reason=="string"&&ue.reason.length>0?ue.reason:"",Fe=Object.hasOwn(Yc,Se)?Yc[Se]:"";Fe.length>0?ve(Fe,"error",2800):ue?.conflict?ve("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ue?.ok&&Se.length>0&&ve(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${Se}`,"error",2800)}finally{Oe.delete(h),$()}}}async function vt(k,h){if(!n||!h||de.has(h))return;de.add(h),$();let O;try{let ue=async(Se={})=>await n(k,{bead_id:h,expected_revision:ot(),...Se});O=await ue(),ht(O),O&&O.conflict&&(O=await n(k,{bead_id:h,expected_revision:ot()}),ht(O)),k==="worker-revise-fix"&&(O=await Ir(O,(Se,Fe)=>ue({continuation:Se,decision_token:Fe}),{onResult:ht,refresh:()=>ue()}))}finally{de.delete(h),$()}if(!(!O||O.conflict)){if(O.ok){ve(k==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ve(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function rt(k){if(!n)return;let h=await n("worker-automation-toggle",{on:k,expected_revision:ot()});ht(h),h&&h.conflict&&await n("worker-automation-toggle",{on:k,expected_revision:ot()}).then(ht)}async function We(k){if(!n||!k)return;let h=await n("worker-repo-operation-dismiss",{operation_id:k});ht(h),h&&h.ok===!1&&ve(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function E(k){if(!n||!Number.isFinite(k))return;let h=Math.max(Qa,Math.floor(k)),O=await n("worker-queue-set-slots",{slots:h,expected_revision:ot()});ht(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:ot()}).then(ht)}async function U(k){if(!n||!Number.isInteger(k)||k<1||k>og)return;let h=Re(),O=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(k).reduce((Fe,nt)=>Fe+(Array.isArray(nt?.entries)?nt.entries.length:0),0),ue=()=>({count:k,expected_revision:ot()}),Se=await n("worker-queue-set-serial-lane-count",ue());ht(Se),Se&&Se.conflict&&(Se=await n("worker-queue-set-serial-lane-count",ue()),ht(Se)),Se&&Se.applied&&O>0&&ve(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function z(){let k=zr(K),h=P.read({candidate_sort:M,done_since:k});return Ce=h.workspaces,V=Cr(h.workspaces,h.workspaces_state,{done_since:k,candidate_filter:b,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:R}),V}function we(k){return k.queue_groups[0]||Y$}function Te(k){let h=k.dependency_chips||null,O={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},ue=q.get(k.id),Se=N.get(k.id)||null,Fe=ue&&ue.overlaps.length>0?ue.overlaps:null,nt=!!ue&&ue.scope_missing;return!Se&&!Fe&&!nt&&Object.keys(O).length===0?null:{...O,...Se?{predecessors:Se}:{},...Fe?{overlaps:Fe}:{},...nt?{scope_missing:!0}:{}}}function $t(k){return{...k,workspace_name:"",done_layout:void 0,dependency_chips:Te(k)||void 0,chip_popover:kt(k)}}function kt(k){return na(k,h=>W.isOpen({bead_id:k.id,chip_key:h}))}function Rt(){let k=Re(),h=new Map;for(let O of Object.values(bn(k.lane_states))){let ue=Array.isArray(O?.corrections)?O.corrections:[];for(let Se of ue)Se&&typeof Se.bead_id=="string"&&typeof Se.after=="string"&&h.set(Se.bead_id,Se.after)}return{admission:bn(k.admission),correction_after:h}}function qt(k,h){let O=$t(k),ue=Ap(h.admission[k.id]||null,!!k.discard||Oe.has(k.id)),Se=h.correction_after.get(k.id);return{...O,draggable:O.draggable===!0&&!ue,stale_work:ue,reason:ue?"":O.reason,badges:Se?[`\u{1F517} ${Se} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!de.has(k.id)}}function Wt(k){let h=Rt();return we(k).sublanes.parallel.map(O=>qt(O,h))}function Xt(k){let h=Rt();return we(k).sublanes.serial.map(O=>{let ue=O.occupants.map(Se=>({id:Se.id,title:Se.title,draggable:!1,lane:O.id,ghost:!0,badges:[Se.badge],...typeof Se.search_match=="boolean"?{search_match:Se.search_match}:{}}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:ue,items:O.items.map(Se=>qt(Se,h)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function sn(k){return k.runnable.map(h=>$t(h))}function xt(k){return k.done.map(h=>$t(h))}function tn(k){let h=k.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,provider_hold:O.run_state==="provider_hold",hold:O.hold?{...O.hold,open:Q===O.attempt_id}:null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":O.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:Te(O)||void 0,chip_popover:kt(O),rollup_expanded:Z.has(O.id),failure:O.failure?{...O.failure,open:w===O.attempt_id}:null,...Vo(O.id,{discard:O.discard,parked:O.run_state==="parked"},ee.has(O.id))}));return[...h.filter(O=>O.failed===!0),...h.filter(O=>O.failed!==!0&&O.parked===!0),...h.filter(O=>O.failed!==!0&&O.parked!==!0)]}function fn(k){return Ft(k).map(h=>({...h,chip_popover:kt(h)}))}function Ft(k){if(ae&&ae.model===k)return ae.rows;let h=Re(),O=we(k),ue=bn(h.attempts),Se=Object.values(ue).filter(fr),Fe=new Map;for(let ze of Se)Fe.set(ze.attempt_id,ze);let nt=new Map;for(let ze of Se)nt.set(ze.bead_id,ze);let Mt=new Map;for(let ze of[...k.pr_wait,...k.running,...k.queue,...k.runnable,...k.done])Mt.has(ze.id)||Mt.set(ze.id,ze);let an=ze=>{let Yt=null;for(let On of Se)!On||On.bead_id!==ze||rc(On,Fe)||(Yt===null||(typeof On.started_at=="number"?On.started_at:0)>=(typeof Yt.started_at=="number"?Yt.started_at:0))&&(Yt=On);return Yt&&typeof Yt.target_base=="string"?Yt.target_base:null},gt=new Map;for(let ze of k.running)ze.run_state==="failed"||ze.conflict_resolution!==!0||(ze.run_state!=="paused"?gt.set(ze.id,"running"):gt.has(ze.id)||gt.set(ze.id,"paused"));let gn=bn(h.auto_merge_skips),Tn=new Set(O.merge.auto_excluded),qr=bn(h.pr_observations),Yn=bn(h.pr_activity),sr=bn(h.cleanup_failed),ir=bn(h.discard_operations),ar=bn(h.bead_workflow),mn=bn(h.bead_titles),lr=h.merge_queue_state||{active:null,failures:{}},kr=O.merge.state.waiting,wr=new Map;for(let ze of Array.isArray(h.merge_queue)?h.merge_queue:[])ze&&typeof ze=="object"&&ze.bead_id&&wr.set(ze.bead_id,ze);let jr=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(ze=>{let Yt=Mt.get(ze.bead_id);return{...mx(ze.bead_id,Yt?.title||mn[ze.bead_id]||ze.bead_id,qr,sr[ze.bead_id]||null,pr(ue,ze.bead_id,O.runner_catalog||null),Yn[ze.bead_id]||(be.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:H.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),gt.get(ze.bead_id)||null,ze.external===!0,{position:O.merge.positions.get(ze.bead_id)||0,active:lr.active===ze.bead_id,failure:bn(lr.failures)[ze.bead_id]||null,waiting:kr&&kr.bead_id===ze.bead_id?kr.reason:null,resolution:O.merge.resolutions.get(ze.bead_id),continuation_action:O.merge.continuations.get(ze.bead_id),authority:O.merge.authorities.get(ze.bead_id)||null,hold:wr.get(ze.bead_id)?.hold||null,review_dispatch:wr.get(ze.bead_id)?.review_dispatch||null},ze.wt_present!==!1,h.auto_merge===!0&&Tn.has(ze.bead_id)?gn[ze.bead_id]?.reason||"":null,nc(O.declared_base,an(ze.bead_id)),bn(h.completion_status)[ze.bead_id]||null,ir,h.auto_merge===!0,{merge_sha:ze.merge_sha,cleanup_cursor:ze.cleanup_cursor,repo_operations:O.repo_operations},Yt?Te(Yt):null,vp(ue,ze.bead_id),ee.has(ze.bead_id),{...ze.foreign===!0?{foreign:!0}:{},...typeof ze.repo_slug=="string"?{repo_slug:ze.repo_slug}:{},...typeof ze.pr_url=="string"?{pr_url:ze.pr_url}:{},...typeof ze.pr_number=="number"?{pr_number:ze.pr_number}:{}}),...Yt?.search_match===void 0?{}:{search_match:Yt.search_match},workflow:ar[ze.bead_id]||null,priority:Yt?.priority,from_id:Yt?.from_id,...Yt?.created_at===void 0?{}:{created_at:Yt.created_at},...Yt?.updated_at===void 0?{}:{updated_at:Yt.updated_at}}});return ae={model:k,rows:jr},jr}function Gt(k){let h=we(k),O=[];for(let Fe of k.running)Fe.non_occupying!==!0&&O.push({id:Fe.id,title:Fe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Fe.serial_lane_id??null});for(let Fe of k.pr_wait)O.push({id:Fe.id,title:Fe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Fe of h.sublanes.serial)Fe.items.forEach((nt,Mt)=>{O.push({id:nt.id,title:nt.title,location_label:`${Fe.id} #${Mt+1}`,kind:"serial",lane_id:Fe.id})});h.sublanes.parallel.forEach((Fe,nt)=>{O.push({id:Fe.id,title:Fe.title,location_label:`#${nt+1}`,kind:"parallel",lane_id:null})});for(let Fe of k.runnable)O.push({id:Fe.id,title:Fe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Fe.queue_placeable===!0});let ue=Re();q=Bm(ue.bead_scope,O);let Se=new Map;for(let Fe of[...k.running,...k.runnable])Array.isArray(Fe.blocked_by)&&Fe.blocked_by.length>0&&Se.set(Fe.id,Fe.blocked_by);for(let[Fe,nt]of Object.entries(bn(ue.bead_blocked_by)))Array.isArray(nt)&&Se.set(Fe,nt.filter(Mt=>typeof Mt=="string"&&Mt.length>0));N=jp(Se,O,bn(ue.blocker_workspaces))}function on(k){let h=k.hold&&typeof k.hold=="object"?k.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let O=Dr(h.cause)||String(h.cause||""),ue=Array.isArray(k.lineages)?k.lineages:[];if(h.kind==="env"){let Fe=ue.map(Mt=>Mt&&Mt.next_at).filter(Mt=>typeof Mt=="number").sort((Mt,an)=>Mt-an)[0],nt=typeof Fe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Fe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${O} — 재시도 대기${nt}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let Se=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Fe=>typeof Fe=="string"&&Fe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${O}${Se.length>0?` \u2014 bead ${Se.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function He(k){let h=[];for(let[gt,gn]of Object.entries(bn(k.provider_hold)))for(let Tn of Array.isArray(gn?.targets)?gn.targets:[])h.push({runner:gt,target:Tn});if(h.length===0)return"";let O=h.find(gt=>gt.target?.kind==="outage");if(O){let gt=typeof O.target.next_probe_at=="number"?new Date(O.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${O.runner} 공급자 장애 — 신규 디스패치
        보류${gt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${gt}`:""}
      </div>`}let ue=Array.isArray(bn(k.account_catalog).claude)?bn(k.account_catalog).claude:[],Se=gt=>ue.find(Tn=>Tn?.email===gt)?.alias||gt,Fe=h.find(gt=>typeof gt.target?.account!="string"),nt=gt=>typeof gt?.resets_at=="number"?new Date(gt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Fe){let gt=nt(Fe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Fe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${gt?`, \uB9AC\uC14B ${gt}`:""}
      </div>`}let Mt=[...new Set(h.map(gt=>Se(String(gt.target.account))))],an=nt(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Mt.join(", ")} 사용 한도 —
      ${Mt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${an?`, \uB9AC\uC14B ${an}`:""}
    </div>`}function I(k){let h=Re(),O=we(k),ue=O.sublanes.parallel,Se=ue.length>0?ue[0].id:"\u2014",Fe=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,nt=Lt(k),Mt=O.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",an=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(mn=>mn&&typeof mn.armed_by_lane=="string"&&mn.armed_by_lane.length>0).length,gt=an>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${an}건 진행 중</span
          >`:"",gn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${fn(k).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${D()} 완료 <b>${k.done.length}</b></span
      >`,Tn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,qr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Qa}
          step="1"
          .value=${String(O.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:og},(mn,lr)=>lr+1).map(mn=>c`<option
                value=${String(mn)}
                ?selected=${O.serial_lane_count===mn}
              >
                ${mn}
              </option>`)}
        </select>
      </label> `,Yn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${R}
    />`,sr=wp(O.repo_operations,O.cleanup_failures),ir=on(h),ar=He(h);return C?c`<div class="worker-ribbon">
          ${Fe} ${nt}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Mt}${gt}${gn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qr}${Yn}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${ar}${ir}${sr}${G.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Fe}${nt}${qr}${Yn}
        </div>
        <div class="worker-kpi">
          ${Mt}${gt}${gn}${Tn}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${D()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(mn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${mn.tooltip}
                >${D()} 완료 · 누적 ${mn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${Se}</b></span
          >
        </div>
      </div>
      ${ar}${ir}${sr}${G.template()}`}function $e(k){let h=k.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${b.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Rs.map(O=>c`<button
              type="button"
              class="worker-filter__chip${b.readiness===O.value?" is-active":""}"
              data-readiness=${O.value}
              aria-pressed=${b.readiness===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${h.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ro.map(O=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${b.routes.includes(O.value)?" is-active":""}"
              data-route=${O.value}
              aria-pressed=${b.routes.includes(O.value)?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${h.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.route}</span
            >`:""}
      </div>
    </div>`}function je(){let k=F?"custom":tu(M)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${k}
    >
      ${Zs.map(h=>c`<option value=${h.id} ?selected=${k===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${k==="custom"}>
        사용자 지정…
      </option>
    </select>`}function At(){let k=Js(M);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let O=k[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${Nm.map(ue=>c`<option
                  value=${ue.key}
                  ?selected=${!!O&&O.key===ue.key}
                >
                  ${ue.label}
                </option>`)}
          </select>
          ${O?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Ke(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${K}
      >
        ${fo.map(k=>c`<option value=${k.value} ?selected=${K===k.value}>
              ${k.label}
            </option>`)}
      </select>
    </div>`}function Lt(k){let h=we(k).merge,O=Re().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(O)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ue=new Set(h.auto_excluded),Se=fn(k).filter(Fe=>Fe.merge_action&&Fe.merge_enabled&&!ue.has(Fe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Se>0?` ${Se}`:""}
    </button>`}function Bt(k,h){return c`<div
      data-bead-id=${k.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${un(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(k.queue_index??0)}
    >
      ${Un({...k,...Vo(k.id,{discard:k.discard,parked:!1},ee.has(k.id))},{actions:Mo(k)})}
    </div>`}function st(k){let h=Wt(k),O=Dt();return ra({parallel:{rows:h.map((ue,Se)=>Bt(ue,{kind:"parallel",root_dir:O,row_index:Se})),count:h.length,collapsed:A.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:Xt(k).map(ue=>({id:ue.id,title:`\uC9C1\uB82C ${ue.index}`,rows:[...ue.ghosts.map(Se=>Un({...Se,...Vo(Se.id,{discard:Se.discard,parked:!1},ee.has(Se.id))},{actions:Mo(Se)})),...ue.items.map((Se,Fe)=>Bt(Se,{kind:"repo-serial",root_dir:O,row_index:Fe,lane_id:ue.id}))],count:ue.ghosts.length+ue.items.length,match_count:fe([...ue.ghosts,...ue.items]),empty:ue.ghosts.length+ue.items.length===0,badge:ue.badge,held:ue.occupied,cycle:ue.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:ue.id,lane_length:String(ue.raw_length)}})),collapsed:A.isAreaCollapsed("serial")}})}function Ct(k){return Q_(tn(k),Date.now(),De)}function yn(k){return k.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function Nt(k){let h=we(k),O=sn(k),ue=Wt(k),Se=xt(k),Fe=fn(k),nt=tn(k),Mt=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,match_count:fe(O),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:je(),header_row:F?At():void 0,controls:$e(k),collapsible:!0,collapsed:A.isCollapsed("candidate"),place_menu:mt(O),onOpenDoc:u?(gt,gn)=>u(gn):void 0}),an=nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:Se,match_count:fe(Se),empty:`${D()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ke(),collapsible:!0,collapsed:A.isCollapsed("done"),preview:C?Array.isArray(h.token_total)?h.token_total.map(gt=>gt.label).join(" \xB7 "):h.token_total||sg(Se):void 0});return C?c`<div class="worker-lanes worker-lanes--mobile">
          ${oa({live:yn(k),running_body:nt.length>0?Ct(k):"",pr_wait_rows:Fe.map(gt=>Un(gt)),count:nt.length+Fe.length})}
          ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:fe(ue),collapsible:!0,collapsed:A.isCollapsed("queue"),preview:sg(ue),body:st(k)})}
          ${Mt} ${an}
        </div>
        ${Go(re,Re())}`:c`<div class="worker-lanes">
        ${Mt}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:fe(ue),collapsible:!0,collapsed:A.isCollapsed("queue"),body:st(k)})}
        ${nr({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:nt,match_count:fe(nt),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:yn(k),collapsible:!0,collapsed:A.isCollapsed("running"),body:Ct(k)})}
        ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Fe,match_count:fe(Fe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:A.isCollapsed("pr_wait")})}
        ${an}
      </div>
      ${Go(re,Re())}`}function kn(k){A.toggle(k),$()}function y(k){A.toggleArea(k),$()}function d(k){let h=Date.now();if(!k.queue.some(ue=>ta(ue.added_at,h)>0)){m();return}g===null&&(g=window.setInterval(()=>{try{$()}catch{}},X$))}function m(){g!==null&&(window.clearInterval(g),g=null)}function $(){let k=z();d(k),Gt(k),lt(I(k),ye),lt(Nt(k),ce),za(ce)}function Y(){let k=!0,h=qa(O=>{if(C=O,k){k=!1;return}$()});le.push(h)}function J(k){b=k,Z$(k),$()}function me(k){if(k==="custom"){F=!0,$();return}M=co(k),nu(M),F=!1,$()}function Ne(k){M=co({chain:k}),nu(M),$()}function wt(k){K=Xn(k),ex(K),f?.(K),$()}function Ge(k){let h=k.target;if(re){let gt=Wa(re,h,Re());if(gt){gt!==re&&(re=gt,$());return}}let O=h?.closest?.(".worker-serial-lane-count");if(O){let gt=Number.parseInt(O.value,10);Number.isFinite(gt)&&U(gt).then($);return}let ue=k.target?.closest?.(".worker-filter__blocked");if(ue){J({...b,show_blocked:ue.checked});return}let Se=k.target?.closest?.(".worker-sort-chain__key");if(Se){let gt=Number.parseInt(Se.getAttribute("data-step")||"",10);Number.isFinite(gt)&&Ne(qm(Js(M),gt,Se.value));return}let Fe=k.target?.closest?.(".worker-done-range");if(Fe){wt(Fe.value);return}let nt=k.target?.closest?.(".worker-sort");if(nt){me(nt.value);return}let Mt=k.target?.closest?.(".worker-slots__input");if(!Mt)return;let an=Number.parseInt(Mt.value,10);if(!Number.isFinite(an)){$();return}E(an).then($)}function yt(k){return k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,worktree:k.worktree||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}}function Ut(){let k=we(z()),h=Re().workspace_info,O=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:k.repo_operations,cleanup_failures:k.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function S(){De&&qe.close(),pe.hidden=!1,ke.hidden=!1,Je.open(Ut()),$()}function L(k){let h=Re(),O=h.attempts?h.attempts[k]:null;De=k,Je.close(),pe.hidden=!0,ke.hidden=!1,qe.open({attempt_id:k,meta:yt(O)}),$()}function Le(k){let h=Re(),O=(Array.isArray(h.session_active)?h.session_active:[]).find(Se=>Se&&Se.bead_id===k),ue=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(Se=>Se&&Se.current===!0);ue&&(Je.close(),pe.hidden=!0,ke.hidden=!1,qe.open(Bo(ue,k,"in_progress")),$())}function Ie(){if(Je.isOpen()&&Je.refresh(Ut()),!De)return;let k=Re(),h=k.attempts?k.attempts[De]:null;if(h){qe.updateMeta(yt(h));return}qe.close()}function ft(k,h){if(k.length===0||!s)return;let O=l?l():void 0;if(h.length===0||!O||h===O||!a){s(k);return}Promise.resolve(a(h)).then(()=>{s(k)}).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function dt(k){let h=k.target;if(h?.closest?.(".provider-resume-dialog__cancel")){pt();return}if(h?.closest?.(".provider-resume-dialog__confirm")){Qe();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let O=h?.closest?.(".worker-sort-chain__dir");if(O){let ge=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(ge)&&Ne(jm(Js(M),ge));return}let ue=h?.closest?.(".worker-dep__open");if(ue){ft(ue.getAttribute("data-dep-id")||"",ue.getAttribute("data-root-dir")||"");return}let Se=h?.closest?.(".judgement-chip");if(Se){let ge=Se.closest("[data-bead-id]"),ut=ge&&ge.getAttribute("data-bead-id")||"",en=Se.getAttribute("data-chip-key")||"";ut&&en&&W.toggle({bead_id:ut,chip_key:en});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){S();return}let Fe=h?.closest?.(".worker-repo-op__dismiss");if(Fe){We(Fe.dataset.operationId||"");return}let nt=h?.closest?.(".worker-cleanup__resume");if(nt){let ge=nt.dataset.beadId;ge&&Ee(ge);return}let Mt=h?.closest?.(".worker-cleanup__resolve");if(Mt){let ge=Mt.dataset.beadId;ge&&Pe(ge);return}if(h?.closest?.(".worker-hold__retry")){Be("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){Be("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){rt(!Re().auto_advance);return}let an=h?.closest?.(".worker-merge-all");if(an){an.classList.contains("worker-merge-all--stop")?Re().auto_merge===!0?_e(!1):Ze():_e(!0);return}let gt=h?.closest?.(".worker-pane__toggle[data-lane]");if(gt){let ge=gt.dataset.lane;(ge==="candidate"||ge==="queue"||ge==="running"||ge==="pr_wait"||ge==="done")&&kn(ge);return}let gn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(gn){let ge=gn.dataset.area;(ge==="parallel"||ge==="serial")&&y(ge);return}let Tn=h?.closest?.(".worker-card__place-lane");if(Tn){let ge=Tn.dataset.beadId,ut=Tn.dataset.lane;ge&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(T=null,$(),Et(ge,ut));return}if(h?.closest?.(".worker-card__place-cancel")){T=null,$();return}let Yn=h?.closest?.(".worker-card__place");if(Yn){let ge=Yn.dataset.beadId;ge&&!Yn.disabled&&(ks(Re())?(T=ge,$()):Et(ge,"parallel"));return}let sr=h?.closest?.(".worker-filter__route");if(sr){let ge=sr.dataset.route||"";ge&&J({...b,routes:pa(b.routes,ge)});return}let ir=h?.closest?.(".worker-filter__chip");if(ir){let ge=ir.dataset.readiness;(ge==="all"||ge==="ready"||ge==="not_ready")&&J({...b,readiness:ge});return}let ar=h?.closest?.('[data-action="queue-start-now"]');if(ar){tt(ar.dataset.beadId||"");return}let mn=h?.closest?.('[data-action="queue-remove"]');if(mn){let ge=mn.dataset.beadId||"";ge&&he.sendOp({type:"worker-queue-remove",payload:{bead_id:ge},root_dir:Dt()},ge);return}let lr=h?.closest?.(".worker-mini__merge");if(lr){let ge=lr.dataset.beadId||"";Re().cleanup_failed?.[ge]?Ee(ge):Me(ge);return}let kr=h?.closest?.(".worker-mini__merge-cancel");if(kr){Ae(kr.dataset.beadId||"");return}let wr=h?.closest?.(".worker-mini__resolve");if(wr){Pe(wr.dataset.beadId||"");return}let jr=h?.closest?.(".rtile__resolve");if(jr){let ge=jr.closest(".rtile");Pe(ge?.dataset.beadId||"");return}let ze=h?.closest?.(".worker-mini__discard"),Yt=h?.closest?.(".worker-mini__discard-abandon");if(Yt){it(Yt.dataset.beadId||"",Yt.dataset.operationId||"",{kind:Yt.dataset.operationKind||"",last_error:Yt.dataset.lastError||""});return}if(ze){bt(ze.dataset.beadId||"",ze.dataset.attemptId||null,ze.dataset.discardMode==="merged"?"merged":"unmerged",ze.dataset.operationId||null);return}let On=h?.closest?.(".worker-mini__stale-continue");if(On){ct("worker-stale-work-continue",On.dataset.beadId||"",On.dataset.actionId||"");return}let Xo=h?.closest?.(".worker-mini__stale-backup");if(Xo){ct("worker-stale-work-backup-fresh",Xo.dataset.beadId||"",Xo.dataset.actionId||"");return}let Qo=h?.closest?.(".worker-mini__stale-recheck");if(Qo){ct("worker-stale-work-recheck",Qo.dataset.beadId||"",Qo.dataset.actionId||"");return}let ei=h?.closest?.(".worker-mini__revise-fix");if(ei){vt("worker-revise-fix",ei.dataset.beadId||"");return}let ti=h?.closest?.(".worker-mini__revise-approve");if(ti){vt("worker-revise-approve",ti.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let at=h?.closest?.(".rtile__failure-badge");if(at){let ge=at.dataset.attemptId||"";w=w===ge?null:ge,$();return}let v=h?.closest?.(".rtile__provider-hold-badge");if(v){let ge=v.dataset.attemptId||"";Q=Q===ge?null:ge,$();return}let j=h?.closest?.(".rtile__attempt-copy");if(j){let ge=j.dataset.attemptId||"";ge&&$n(ge).then(ut=>{ve(ut?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ut?"success":"error",1400)});return}let B=h?.closest?.(".rtile__discard-abandon");if(B){let ut=h?.closest?.(".rtile")?.dataset?.beadId;ut&&it(ut,B.dataset.operationId||"",{kind:B.dataset.operationKind||"",last_error:B.dataset.lastError||""});return}let xe=h?.closest?.(".rtile__discard");if(xe){let ge=h?.closest?.(".rtile"),ut=ge?.dataset?.beadId,en=ge?.dataset?.attemptId;ut&&bt(ut,en||null,xe.dataset.confirmation==="merged"?"merged":"unmerged",xe.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let ut=h?.closest?.(".rtile")?.dataset?.attemptId;ut&&Zt(ut);return}if(h?.closest?.(".rtile__resume-alternate")){let ut=h?.closest?.(".rtile")?.dataset?.attemptId;ut&&et(ut);return}if(h?.closest?.(".rtile__resume")){let ge=h?.closest?.(".rtile__resume"),en=h?.closest?.(".rtile")?.dataset?.attemptId;en&&x(en,ge?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let ge=h?.closest?.(".rtile"),ut=ge?.dataset?.attemptId;if(ut){L(ut);return}let en=ge?.dataset?.beadId;en&&Le(en);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),qe.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Ve=h?.closest?.(".rtile .board-card__roll-toggle");if(Ve){let ge=Ve.dataset.rollParent;ge&&(Z.has(ge)?Z.delete(ge):Z.add(ge),$());return}let _t=h?.closest?.(".rtile .board-card__roll-child");if(_t){let ge=_t.dataset.childId;ge&&s&&s(ge);return}let Kt=h?.closest?.(".rtile");if(Kt){if(h?.closest?.(".rtile__id")){let ut=Kt.dataset.beadId;ut&&$n(ut).then(en=>{en?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ge=Kt.dataset.beadId;ge&&s&&s(ge);return}let St=h?.closest?.(".worker-mini, .worker-card");if(St){let ge=St.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){ge&&$n(ge).then(en=>{en?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=h?.closest?.(".ctl-chip--from");if(ut){let en=ut.dataset.fromId;en&&s&&s(en);return}ge&&s&&s(ge)}}function nn(k){let h=k.target;h?.closest?.(".worker-search")&&(R=h.value,$())}function Mr(k){let h=k.target;k.key!=="Escape"||!h?.closest?.(".worker-search")||R.length===0||(R="",$())}he.attach(e),e.addEventListener("click",dt),e.addEventListener("change",Ge),e.addEventListener("input",nn),e.addEventListener("keydown",Mr);function Vn(k){let h=k.target,O=h&&typeof h.closest=="function"?Se=>h.closest(Se):()=>null,ue=!1;w&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(w=null,ue=!0),Q&&!O(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(Q=null,ue=!0),ue&&$()}function or(k){k.key==="Escape"&&(w===null&&Q===null&&re===null||(w=null,Q=null,re=null,$()))}return document.addEventListener("click",Vn),document.addEventListener("keydown",or),W.attach(),le.push(()=>{document.removeEventListener("click",Vn),document.removeEventListener("keydown",or),W.detach()}),Y(),_&&le.push(_.subscribe(()=>{P.notifyIssuesChanged(),$()})),o&&le.push(o.subscribe(()=>{let k=l&&l()||"";k!==ne&&(ne=k,Ue.close()),$(),Ie()})),$(),{load(){P.ensureSessionDefaults(),$()},refreshSessionDefaults:se,destroy(){m();for(let k of le.splice(0))try{k()}catch{}he.detach(),e.removeEventListener("click",dt),e.removeEventListener("change",Ge),P.destroy();try{qe.destroy()}catch{}ke.hidden=!0;try{Ue.destroy()}catch{}lt(c``,e)}}}function au(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function cg(e,t,n,r=async()=>{},o=async()=>{}){let i=Ht("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function p(M){let K=M.target.value,A=t.getState().workspace?.current?.path||"";if(K&&K!==A){i("switching workspace to %s",K),l=!0,N();try{await n(K)}catch(C){i("workspace switch failed: %o",C)}finally{l=!1,N()}}}async function f(){let M=t.getState(),F=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!F||a)){i("git-pulling workspace %s",F),a=!0,N();try{await r(F)}catch(K){i("workspace git pull failed: %o",K)}finally{a=!1,N()}}}function _(M){let F=M.target;F&&e.contains(F)||T()}function b(M){M.key==="Escape"&&T()}function g(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",b),N())}function T(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),N())}function w(){u?T():g()}async function Q(M){let F=M.target,K=F.value,D=F.checked;i("toggling visibility %s \u2192 %s",K,String(D));try{await o(K,D)}catch(A){i("workspace visibility toggle failed: %o",A)}}function re(M){return M?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function W(M,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${w}
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
                ${M.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!F.has(K.path)}
                        @change=${Q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${au(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let M=t.getState(),F=M.workspace?.current,K=M.workspace?.available||[],D=new Set(M.workspace?.hidden||[]),A=F?.path||K[0]?.path||"";if(K.length===0)return c``;let C=K.filter(R=>!D.has(R.path)||R.path===A);if(C.length<=1){let R=C[0]||K[0],oe=au(R.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${R.path}"
            >${oe}</span
          >
          ${W(K,D)}
          ${re(A)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${C.map(R=>c`
              <option
                value="${R.path}"
                ?selected=${R.path===A}
                title="${R.path}"
              >
                ${au(R.path)}
              </option>
            `)}
        </select>
        ${W(K,D)}
        ${re(A)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function N(){lt(q(),e)}return N(),s=t.subscribe(()=>N()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),lt(c``,e)}}}var ug=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-adr","unsubscribe-adr","adr-snapshot","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create"];function lu(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function dg(e,t,n=lu()){return{id:n,type:e,payload:t}}function pg(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,p=[],f=new Map,_=new Set;function b(q){for(let N of Array.from(_))try{N(q)}catch{}}function g(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),b(i);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),N=(n.jitterRatio||0)*q,M=Math.max(0,Math.round(q+(Math.random()*2-1)*N));t("ws retry in %d ms (attempt %d)",M,s+1),l=setTimeout(()=>{l=null,W()},M)}function T(q){try{o?.send(JSON.stringify(q))}catch(N){t("ws send failed",N)}}function w(){for(i="open",t("ws open"),b(i),s=0;p.length;){let q=p.shift();q&&T(q)}}function Q(q){let N;try{N=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){t("ws received invalid envelope");return}if(u.has(N.id)){let F=u.get(N.id);u.delete(N.id),N.ok?F?.resolve(N.payload):F?.reject(N.error||new Error("ws error"));return}let M=f.get(N.type);if(M&&M.size>0)for(let F of Array.from(M))try{F(N.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",N.type)}function re(){i="closed",t("ws closed"),b(i);for(let[q,N]of u.entries())N.reject(new Error("ws disconnected")),u.delete(q);s+=1,g()}function W(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),i="connecting",b(i),o.addEventListener("open",w),o.addEventListener("message",Q),o.addEventListener("error",()=>{}),o.addEventListener("close",re)}catch(N){t("ws connect failed %o",N),g()}}return W(),{send(q,N){if(!ug.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let M=lu(),F=dg(q,N,M);return t("send %s id=%s",q,M),new Promise((K,D)=>{u.set(M,{resolve:K,reject:D,type:q}),o&&o.readyState===o.OPEN?T(F):(t("queue %s id=%s (state=%s)",q,M,i),p.push(F))})},on(q,N){f.has(q)||f.set(q,new Set);let M=f.get(q);return M?.add(N),()=>{M?.delete(N)}},onConnection(q){return _.add(q),()=>{_.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function gx(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function hx(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Za=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],fg=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Pr="tab:worker:closed",bx="bdui.worker.done-range",_g=fm,mg="worker:queue",gg="ui:order",hg="ui:display-policy",bg="exec:presets",Nr="tab:board:closed",yg="beads-ui.board.closed-range";function yx(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+vx(e))});return n.observe(e),()=>n.disconnect()}function vx(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function kx(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let r of t)try{r()}catch{}},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wx(e){let t=Ht("main");t("bootstrap start"),yx(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("compare-root"),f=document.getElementById("adr-root"),_=document.getElementById("detail-panel");if(s&&Om(s),l&&a&&u&&p&&f&&_){let ye=function(S,L){let Le="Request failed",Ie="";if(S&&typeof S=="object"){let dt=S;if(typeof dt.message=="string"&&dt.message.length>0&&(Le=dt.message),typeof dt.details=="string")Ie=dt.details;else if(dt.details&&typeof dt.details=="object")try{Ie=JSON.stringify(dt.details,null,2)}catch{Ie=""}}else typeof S=="string"&&S.length>0&&(Le=S);let ft=L&&L.length>0?`Failed to load ${L}`:"Request failed";ie.open(ft,Le,Ie)},Dt=function(S){return`${st.getState().workspace.current?.path||""}\0${S}`},Et=function(){Ue&&(Ue().catch(()=>{}),Ue=null),ne=null,G=null},ht=function(S){Re=S;let L=()=>{Re!==S||st.getState().selected_id!==S||(Re=null,ot(S))};if(!Qe){pt.then(L);return}L()},Me=function(S,L,Le,Ie,ft){return Le!==te[L]?(ft().catch(()=>{}),!1):(S.set(Ie,ft),!0)},Pe=function(){let S=st.getState();Ae(S.view==="board"),rt(S.view==="worker"),Te(we(S)),Rt(S.view==="adr"),E(S.view==="board"||S.view==="worker"||Ee||!!S.selected_id)},Ot=function(){let S=zr(Be);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},_e=function(){let S=zr(tt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},Ae=function(S){if(S)for(let[L,Le]of Za){if(Zt.has(L)||x.has(L))continue;let Ie=L===Nr?Ot():{type:Le};try{pe.register(L,Ie)}catch(nn){t("register %s store failed: %o",L,nn)}x.add(L);let ft=te.board,dt=!1;X.subscribeList(L,Ie).then(nn=>{dt=!Me(Zt,"board",ft,L,nn)}).catch(nn=>{t("subscribe %s failed: %o",L,nn),ye(nn,"board")}).finally(()=>{x.delete(L),dt&&Pe()})}else it()},it=function(){te.board+=1;for(let[S]of Za){let L=Zt.get(S);L&&(L().catch(()=>{}),Zt.delete(S));try{pe.unregister(S)}catch(Le){t("unregister %s failed: %o",S,Le)}}},rt=function(S){if(!S){We();return}for(let[L,Le]of fg){if(ct.has(L)||x.has(L))continue;let Ie=L===Pr?_e():{type:Le};try{pe.register(L,Ie)}catch(nn){t("register %s store failed: %o",L,nn)}x.add(L);let ft=te.worker,dt=!1;X.subscribeList(L,Ie).then(nn=>{dt=!Me(ct,"worker",ft,L,nn)}).catch(nn=>{t("subscribe %s failed: %o",L,nn),ye(nn,"worker")}).finally(()=>{x.delete(L),dt&&Pe()})}},We=function(){te.worker+=1;for(let[S]of fg){let L=ct.get(S);L&&(L().catch(()=>{}),ct.delete(S));try{pe.unregister(S)}catch(Le){t("unregister %s failed: %o",S,Le)}}},E=function(S){if(!S){U();return}vt||(Xe("subscribe-worker-queue",{id:mg}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),vt=()=>Xe("unsubscribe-worker-queue",{id:mg}))},U=function(){vt&&(vt().catch(()=>{}),vt=null)},we=function(S){return S.view==="monitor"||S.selected_id!=null},Te=function(S){if(!S){$t();return}z||(Xe("subscribe-monitor-pipeline",{id:_g}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),z=()=>Xe("unsubscribe-monitor-pipeline",{id:_g}))},$t=function(){z&&(z().catch(()=>{}),z=null)},Rt=function(S){if(!S){qt();return}kt||(Xe("subscribe-adr",{id:ml}).catch(L=>{t("subscribe-adr failed: %o",L)}),kt=()=>Xe("unsubscribe-adr",{id:ml}))},qt=function(){kt&&(kt().catch(()=>{}),kt=null)},Xt=function(){Wt||(Xe("subscribe-ui-order",{id:gg}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),Wt=()=>Xe("unsubscribe-ui-order",{id:gg}))},sn=function(){Wt&&(Wt().catch(()=>{}),Wt=null),Ce.clear()},tn=function(){xt||(Xe("subscribe-display-policy",{id:hg}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),xt=()=>Xe("unsubscribe-display-policy",{id:hg}))},fn=function(){xt&&(xt().catch(()=>{}),xt=null),he.clear()},Gt=function(){Ft||(Xe("subscribe-impl-presets",{id:bg}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Ft=()=>Xe("unsubscribe-impl-presets",{id:bg}))},At=function(S){if(!S)return"Unknown";let L=S.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},Y=function(S,L){$.open(S.path,{missing_state:S.missing_state,...L?{workspace:L}:{}})};var b=ye,g=Dt,T=Et,w=ht,Q=Me,re=Pe,W=Ot,q=_e,N=Ae,M=it,F=rt,K=We,D=E,A=U,C=we,R=Te,oe=$t,fe=Rt,be=qt,H=Xt,ee=sn,de=tn,Oe=fn,Z=Gt,ae=At,le=Y;let P=document.getElementById("header-loading"),se=Xu(P),ie=N_(e),ke=pg(),Xe=se.wrapSend((S,L)=>ke.send(S,L)),X=Wu(Xe),pe=Hu(),ce=Ku(),V=wu(),Ce=zu(),he=vu(),De=ku(),qe=$u(),Je=kx();ke.on("impl-presets-snapshot",S=>{let L=S;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&De.set({revision:L.revision,presets:L.presets})}),ke.on("adr-snapshot",S=>{let L=S;!L||!Array.isArray(L.workspaces)||Je.set({workspaces:L.workspaces})}),ke.on("monitor-pipeline-snapshot",S=>{let L=S;if(!(!L||!Array.isArray(L.workspaces)))try{V.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),ke.on("ui-order-snapshot",S=>{let L=S;if(L&&typeof L.revision=="number")try{Ce.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),ke.on("display-policy-snapshot",S=>{let L=S;if(L&&L.policy&&typeof L.policy=="object")try{he.set(L.policy)}catch{}}),ke.on("session-log-snapshot",S=>{let L=S;if(L&&typeof L.id=="string")try{qe.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),ke.on("session-log-append",S=>{let L=S;if(L&&typeof L.id=="string")try{qe.append(L.id,L.event)}catch{}}),ke.on("snapshot",S=>{let L=S,Le=L&&typeof L.id=="string"?L.id:"",Ie=Le?pe.getStore(Le):null;if(Ie&&L&&L.type==="snapshot")try{Ie.applyPush(L)}catch{}}),ke.on("upsert",S=>{let L=S,Le=L&&typeof L.id=="string"?L.id:"",Ie=Le?pe.getStore(Le):null;if(Ie&&L&&L.type==="upsert")try{Ie.applyPush(L)}catch{}}),ke.on("delete",S=>{let L=S,Le=L&&typeof L.id=="string"?L.id:"",Ie=Le?pe.getStore(Le):null;if(Ie&&L&&L.type==="delete")try{Ie.applyPush(L)}catch{}});let Ue=null,ne=null,G=null,Re=null,et=()=>{},pt=new Promise(S=>{et=()=>S(void 0)}),Qe=!1,mt=!1;async function ot(S){let L=Dt(S);if(L===ne||L===G)return;G=L;let Le=`detail:${S}`,Ie={type:"issue-detail",params:{id:S}};try{pe.register(Le,Ie)}catch(ft){t("register detail store failed: %o",ft)}try{let ft=await X.subscribeList(Le,Ie);if(st.getState().selected_id!==S||Dt(S)!==L){await ft().catch(()=>{});return}Ue&&await Ue().catch(()=>{}),Ue=ft,ne=L}catch(ft){t("detail subscribe failed: %o",ft),ye(ft,"issue details")}finally{G===L&&(G=null)}}let Zt=new Map,x=new Set,te={board:0,worker:0},Ee=!1,Be=ci;try{let S=window.localStorage.getItem(yg);il(S)&&(Be=S)}catch{}let tt="today";try{let S=window.localStorage.getItem(bx);S!==null&&(tt=Xn(S))}catch{}async function Ze(S){if(!il(S)||S===Be)return;Be=S;try{window.localStorage.setItem(yg,S)}catch{}let L=Zt.get(Nr);if(!L)return;Zt.delete(Nr),await L().catch(()=>{});let Le=Ot();try{pe.register(Nr,Le)}catch(Ie){t("register %s store failed: %o",Nr,Ie)}try{let Ie=await X.subscribeList(Nr,Le);Zt.set(Nr,Ie)}catch(Ie){t("re-subscribe %s failed: %o",Nr,Ie),ye(Ie,"board")}}async function bt(S){let L=Xn(S);if(L===tt)return;tt=L;let Le=ct.get(Pr);if(!Le)return;ct.delete(Pr),await Le().catch(()=>{});let Ie=_e();try{pe.register(Pr,Ie)}catch(ft){t("register %s store failed: %o",Pr,ft)}try{let ft=await X.subscribeList(Pr,Ie);ct.set(Pr,ft)}catch(ft){t("re-subscribe %s failed: %o",Pr,ft),ye(ft,"worker")}}let ct=new Map,vt=null,z=null,kt=null,Wt=null,xt=null,Ft=null;async function on(){xt=null,he.clear(),Ft=null,De.clear(),vt=null,z=null,kt=null,Zt.clear(),ct.clear(),te.board+=1,te.worker+=1,Gt();let S=st.getState().workspace.current?.path;if(S)try{await ke.send("set-workspace",{path:S})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}tn();let L=st.getState();Ae(L.view==="board"),rt(L.view==="worker"),Te(we(L)),Rt(L.view==="adr"),E(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function He(){t("clearing all subscriptions for workspace switch"),it(),We(),U(),ce.clear(),sn(),Xt(),fn(),tn(),Et();let S=st.getState();if(S.selected_id)try{pe.unregister(`detail:${S.selected_id}`)}catch{}let L=st.getState();Ae(L.view==="board"),rt(L.view==="worker"),Te(we(L)),E(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&ht(L.selected_id)}async function I(S){t("requesting workspace switch to %s",S),mt=!0;try{let L=await ke.send("set-workspace",{path:S});t("workspace switch result: %o",L),L&&L.workspace&&(st.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),L.changed&&(await He(),ve("Switched to "+At(S),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ve("Failed to switch workspace","error",3e3),L}finally{mt=!1}}async function $e(S){t("requesting workspace git pull for %s",S);try{let L=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let Le=L?.status;if(Le==="up_to_date"){ve("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){ve("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ve("Git pulled "+At(S),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let Le=L?.code,Ie=L?.message;if(Le==="rebase_conflict"){ve("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){ve("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){ve("Git pull skipped: another operation is running","warning",3e3);return}let ft=Ie?`: ${Ie}`:"";throw ve(`Git pull failed${ft}`,"error",3e3),L}}async function je(S,L){t("setting workspace visibility %s \u2192 %s",S,String(L));try{await ke.send("set-workspace-visibility",{path:S,visible:L}),await Ke()}catch(Le){t("workspace visibility update failed: %o",Le),ve("Failed to update project visibility","error",3e3)}}async function Ke(){try{let S=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let L=S.workspaces.map(dt=>({path:dt.path,database:dt.database,pid:dt.pid,version:dt.version})),Le=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,Ie=Array.isArray(S.hidden)?S.hidden.filter(dt=>typeof dt=="string"):[];st.setState({workspace:{current:Le,available:L,hidden:Ie}});let ft=window.localStorage.getItem("beads-ui.workspace");ft&&(!L.some(nn=>nn.path===ft)||Ie.includes(ft)?window.localStorage.removeItem("beads-ui.workspace"):Le&&ft!==Le.path&&(t("restoring saved workspace preference: %s",ft),await I(ft)))}}catch(S){t("failed to load workspaces: %o",S)}}ke.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(st.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),Ke(),He())});let Lt=!1;if(typeof ke.onConnection=="function"){let S=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Lt=!0,ve("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Lt&&(Lt=!1,ve("Reconnected","success",2200),hx(st,(Le,Ie)=>{t(`${Le}: %o`,Ie)}),on())};ke.onConnection(S)}let Bt="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor"||S==="compare"||S==="adr")&&(Bt=S)}catch(S){t("view parse error: %o",S)}let st=Yu({config:gx(),view:Bt});ke.on("worker-queue-snapshot",S=>{let L=S;if(!L||!L.queue)return;let Le=st.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&L.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{ce.set(L.queue)}catch{}});let Ct=Gu(st);Ct.start();let yn=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Nt=async(S,L)=>{try{return await Xe(S,L)}catch(Le){if(yn.has(S))throw Le;return[]}};mm({global_element:r,repo_element:o},st,Ct);let kn=document.getElementById("workspace-picker");kn&&cg(kn,st,I,$e,je);let y=hm(e,(S,L)=>Xe(S,L));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>y.open())}catch{}let d=km(e,{policyStore:he,queueStore:ce,implPresetStore:De,transport:(S,L)=>Xe(S,L),onOpenChange:S=>{let L=Ee;Ee=S,Pe(),L&&S===!1&&me.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[L]of Za)for(let Le of pe.snapshotFor(L)||[]){let Ie=Le.labels;if(Array.isArray(Ie))for(let ft of Ie)typeof ft=="string"&&ft.length>0&&S.add(ft)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>d.open()))}catch{}let m=document.createElement("div");m.className="md-viewer-root",document.body.appendChild(m);let $=Na(m,{getWorkspacePath:()=>st.getState().workspace.current?.path}),J=yd(l,{gotoIssue:S=>Ct.gotoIssue(S),issueStores:pe,transport:Nt,workerQueueStore:ce,uiOrderStore:Ce,displayPolicyStore:he,closedRange:Be,onClosedRangeChange:S=>{Ze(S)},onNewIssue:()=>y.open(),openDoc:Y}),me=iu(a,{transport:Nt,issueStores:pe,queueStore:ce,sessionLogStore:qe,gotoIssue:S=>st.setState({selected_id:S}),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:Y,doneRange:tt,onDoneRangeChange:S=>{bt(S)}}),Ne=_m(u,{transport:Nt,pipelineStore:V,execPresetStore:De,sessionLogStore:qe,router:Ct,gotoIssue:S=>Ct.gotoIssue(S),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:Y}),wt=uf(p,{transport:Nt,gotoIssue:S=>Ct.gotoIssue(S),execPresetStore:De,sourceCandidates:()=>{let S=new Map;for(let[L]of Za)for(let Le of pe.snapshotFor(L)||[]){let Ie=Le?.id;typeof Ie=="string"&&Ie.length>0&&!S.has(Ie)&&S.set(Ie,Le)}return Array.from(S.values())}});ed(f,{adrStore:Je,gotoIssue:S=>Ct.gotoIssue(S),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:Y});let Ge=P_(_,{issueStores:pe,transport:Nt,queueStore:ce,execPresetStore:De,sessionLogStore:qe,getWorkspacePath:()=>st.getState().workspace.current?.path,mdViewer:$,depCandidates:()=>{let S=V.get();if(S===null)return null;let L=V.getWorkspacesState(),Le=st.getState();if(Le.view==="monitor")return _c(S,L);let Ie=Le.workspace.current?.path;return Ie?_c(S,L,{root_dir:Ie}):null},subscribeCandidates:S=>V.subscribe(S),onDepChanged:({type:S,a:L,b:Le})=>{let Ie=Ne;S==="dep-add"&&Ie&&typeof Ie.recorrectSharedLane=="function"&&Ie.recorrectSharedLane(S,L,Le)},onNavigate:(S,L)=>{let Le=()=>{st.getState().view==="worker"?st.setState({selected_id:S}):Ct.gotoIssue(S)},Ie=st.getState().workspace.current?.path;if(typeof L!="string"||L.length===0||!Ie||L===Ie){Le();return}Promise.resolve(I(L)).then(Le).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=st.getState();st.setState({selected_id:null});try{Ct.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{d.open("execution")}}),yt=st.getState().selected_id;yt&&(_.hidden=!1,Ge.load(yt),ht(yt)),st.subscribe(S=>{let L=S.selected_id;L?(_.hidden=!1,Ge.load(L),mt||ht(L)):(Ge.clear(),_.hidden=!0,Et())});let Ut=S=>{l.hidden=S.view!=="board",a.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",p.hidden=S.view!=="compare",f.hidden=S.view!=="adr",i&&i.classList.toggle("is-quiet",S.view==="monitor"||S.view==="compare"||S.view==="adr"),Ae(S.view==="board"),rt(S.view==="worker"),Te(we(S)),Rt(S.view==="adr"),E(S.view==="board"||S.view==="worker"||Ee||!!S.selected_id),!S.selected_id&&S.view==="board"&&J.load(),S.view==="worker"&&me.load(),S.view==="monitor"?Ne.load():Ne.pause(),S.view==="compare"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",S.view)};st.subscribe(Ut),Ut(st.getState()),Xt(),tn(),Gt(),Ke().finally(()=>{Qe=!0,et()}),window.addEventListener("keydown",S=>{let L=S.ctrlKey||S.metaKey,Le=String(S.key||"").toLowerCase(),Ie=S.target,ft=Ie&&Ie.tagName?String(Ie.tagName).toLowerCase():"",dt=ft==="input"||ft==="textarea"||ft==="select"||Ie&&typeof Ie.isContentEditable=="boolean"&&Ie.isContentEditable;L&&Le==="n"&&(dt||(S.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&wx(t)});export{wx as bootstrap,gx as readBootstrapConfig,hx as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
